// Last traded NEPSE prices in NPR, read server-side: no NEPSE source sends CORS headers, so the browser cannot. Sources are tried in order.
const { limited } = require('./_limit.js');

const DEFAULT_SCRAPE_URLS = [
  'https://merolagani.com/LatestMarket.aspx',
  'https://www.sharesansar.com/today-share-price',
];
// Optional overrides: NEPSE_SCRAPE_URL, NEPSE_API_URL, NEPSE_API_HEADERS (JSON), NEPSE_API_MAP (JSON field names).

const DEFAULT_ORIGINS = [
  'https://nepbytebazaar.kesug.com',
  'http://nepbytebazaar.kesug.com',
];

function projectPreviewHost(host) {
  const prod = (process.env.VERCEL_PROJECT_PRODUCTION_URL || '').trim().toLowerCase();
  if (!host.endsWith('.vercel.app')) return false;
  if (!prod) return false;
  if (host === prod) return true;
  const project = prod.replace(/\.vercel\.app$/, '');
  return host.startsWith(project + '-');
}
function allowedOrigin(origin) {
  if (!origin) return null;
  let host;
  try { host = new URL(origin).hostname.toLowerCase(); } catch { return null; }
  if (host === 'localhost' || host === '127.0.0.1') return origin;
  if (DEFAULT_ORIGINS.some((o) => { try { return new URL(o).hostname === host; } catch { return false; } })) return origin;
  if (projectPreviewHost(host)) return origin;
  const extra = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (extra.some((o) => { try { return new URL(o).hostname.toLowerCase() === host; } catch { return false; } })) return origin;
  return null;
}

// Field names are guessed; more specific names come first.
const SYMBOL_KEYS = ['symbol', 'sym', 'ticker', 'scrip', 'stockSymbol', 'securitySymbol', 'securityId', 'code'];
const PRICE_KEYS = ['lastTradedPrice', 'lasttradedprice', 'ltp', 'lastPrice', 'closePrice',
  'close', 'lastTradedPriceValue', 'currentPrice', 'price', 'marketPrice'];
const CHANGE_KEYS = ['percentageChange', 'percentChange', 'perChange', 'pointChangePercent',
  'changePercent', 'percent_change', 'differencePercent', 'change'];
const NAME_KEYS = ['securityName', 'companyName', 'name', 'stockName', 'scripName'];
// Where a list tends to hide when the answer is an object rather than an array.
const LIST_KEYS = ['data', 'content', 'payload', 'result', 'results', 'items', 'stocks',
  'prices', 'securities', 'todaysPrice', 'livemarket'];

function pick(row, keys) {
  for (const k of keys) {
    if (row[k] !== undefined && row[k] !== null && row[k] !== '') return row[k];
    // Answers are inconsistent about case; try a case-insensitive match once.
    const hit = Object.keys(row).find((rk) => rk.toLowerCase() === k.toLowerCase());
    if (hit && row[hit] !== undefined && row[hit] !== null && row[hit] !== '') return row[hit];
  }
  return undefined;
}
function toNum(v) {
  if (typeof v === 'number') return isFinite(v) ? v : null;
  if (typeof v !== 'string') return null;
  const n = parseFloat(v.replace(/[,\s%]/g, ''));
  return isFinite(n) ? n : null;
}

function findList(body, mapped) {
  if (mapped) {
    const v = body && body[mapped];
    return Array.isArray(v) ? v : null;
  }
  if (Array.isArray(body)) return body;
  if (!body || typeof body !== 'object') return null;
  for (const k of LIST_KEYS) {
    if (Array.isArray(body[k])) return body[k];
    // One level deeper, e.g. { data: { content: [...] } }
    if (body[k] && typeof body[k] === 'object') {
      for (const k2 of LIST_KEYS) if (Array.isArray(body[k][k2])) return body[k][k2];
    }
  }
  // An object keyed by symbol: { NABIL: {...}, NICA: {...} }
  const vals = Object.values(body);
  if (vals.length && vals.every((v) => v && typeof v === 'object' && !Array.isArray(v))) {
    return Object.entries(body).map(([k, v]) => ({ __key: k, ...v }));
  }
  return null;
}

// Nothing downstream should ever see a shape this file did not produce.
function normalise(body, map) {
  const list = findList(body, map.list);
  if (!list) return null;
  const out = {};
  for (const row of list) {
    if (!row || typeof row !== 'object') continue;
    const symRaw = map.symbol ? row[map.symbol] : (pick(row, SYMBOL_KEYS) ?? row.__key);
    const sym = String(symRaw || '').trim().toUpperCase();
    if (!sym || !/^[A-Z0-9._-]{1,20}$/.test(sym)) continue;
    const price = toNum(map.price ? row[map.price] : pick(row, PRICE_KEYS));
    // Zero is an untraded scrip, not a price.
    if (price === null || price <= 0) continue;
    const change = toNum(map.change ? row[map.change] : pick(row, CHANGE_KEYS));
    const name = map.name ? row[map.name] : pick(row, NAME_KEYS);
    out[sym] = {
      price,
      change: change === null ? 0 : change,
      ...(name ? { name: String(name).slice(0, 80) } : {}),
    };
  }
  return Object.keys(out).length ? out : null;
}

// Generic table reader: finds symbol/price columns from each table's header row, so it survives redesigns.
const SCRAPE_HOSTS = [
  'merolagani.com', 'www.merolagani.com',
  'sharesansar.com', 'www.sharesansar.com',
  'nepalipaisa.com', 'www.nepalipaisa.com',
  'nepsealpha.com', 'www.nepsealpha.com',
  'nepalstock.com', 'www.nepalstock.com', 'newweb.nepalstock.com',
  'systemxlite.com',
];
function scrapeHostAllowed(u) {
  try {
    const h = new URL(u).hostname.toLowerCase();
    return SCRAPE_HOSTS.includes(h);
  } catch { return false; }
}
const decodeEntities = (t) => String(t)
  .replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>').replace(/&quot;/gi, '"').replace(/&#3(?:9|4);/g, "'")
  .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d));
const cellText = (html) => decodeEntities(String(html).replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();

// Column headers, as the sites that carry this data tend to word them.
const H_SYMBOL = /^(symbol|scrip|stock|company|securities?|traded companies)$/i;
// Ranked: LTP beats Close, which is stale while the market is open.
const H_PRICE_RANK = [
  /^ltp$/i, /last\s*traded\s*price/i, /^last\s*price$/i,
  /^close$/i, /clos(e|ing)\s*price/i, /market\s*price/i,
];
const H_CHANGE = /(%\s*change|per(cent|centage)?\s*change|change\s*%|diff\s*%)/i;
function bestColumn(cells, ranked) {
  for (const re of ranked) {
    const i = cells.findIndex((x) => re.test(x));
    if (i >= 0) return i;
  }
  return -1;
}

function parseRows(tableHtml) {
  const rows = [];
  const rowRe = /<tr\b[^>]*>([\s\S]*?)<\/tr>/gi;
  let m;
  while ((m = rowRe.exec(tableHtml))) {
    const cells = [];
    const cellRe = /<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi;
    let c;
    while ((c = cellRe.exec(m[1]))) cells.push(cellText(c[1]));
    if (cells.length) rows.push(cells);
  }
  return rows;
}
// `diag` reports which table and columns were chosen, so a guess can be checked.
function scrapePrices(html, diag) {
  let bestDiag = null;
  const clean = String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const tableRe = /<table\b[^>]*>([\s\S]*?)<\/table>/gi;
  let t, best = null;
  while ((t = tableRe.exec(clean))) {
    const rows = parseRows(t[0]);
    if (rows.length < 5) continue;
    // The header is the first row that names a symbol column and a price one.
    let hi = -1, iSym = -1, iPrice = -1, iChg = -1;
    for (let r = 0; r < Math.min(4, rows.length); r++) {
      const cells = rows[r];
      const sym = cells.findIndex((x) => H_SYMBOL.test(x));
      const price = bestColumn(cells, H_PRICE_RANK);
      if (sym >= 0 && price >= 0) {
        hi = r; iSym = sym; iPrice = price;
        iChg = cells.findIndex((x) => H_CHANGE.test(x));
        break;
      }
    }
    if (hi < 0) continue;
    const out = {};
    for (let r = hi + 1; r < rows.length; r++) {
      const cells = rows[r];
      if (cells.length <= Math.max(iSym, iPrice)) continue;
      const sym = String(cells[iSym] || '').trim().toUpperCase();
      if (!/^[A-Z0-9._-]{2,20}$/.test(sym)) continue;
      const price = toNum(cells[iPrice]);
      // Zero is untraded; above a crore is the wrong column.
      if (price === null || price <= 0 || price > 1e7) continue;
      const change = iChg >= 0 ? toNum(cells[iChg]) : null;
      out[sym] = { price, change: change === null ? 0 : change };
    }
    // A real day's table is hundreds of rows; a handful means the wrong table.
    if (Object.keys(out).length >= 20 && (!best || Object.keys(out).length > Object.keys(best).length)) {
      best = out;
      bestDiag = { header: rows[hi], columns: { symbol: iSym, price: iPrice, change: iChg },
                   firstDataRows: rows.slice(hi + 1, hi + 4) };
    }
  }
  if (diag) diag.picked = bestDiag;
  return best;
}

// Served when upstream fails, with its age.
let lastGood = null;             // { prices, ts }
const FRESH_MS = 60 * 1000;      // reuse within a minute rather than refetch
const STALE_OK_MS = 24 * 60 * 60 * 1000;

function parseJsonEnv(name) {
  const raw = (process.env[name] || '').trim();
  if (!raw) return {};
  try {
    const v = JSON.parse(raw);
    return (v && typeof v === 'object' && !Array.isArray(v)) ? v : {};
  } catch {
    console.error('[nepse] ' + name + ' is not valid JSON, ignoring it');
    return {};
  }
}

module.exports = async (req, res) => {
  const origin = req.headers.origin;
  const allow = allowedOrigin(origin);
  if (allow) {
    res.setHeader('Access-Control-Allow-Origin', allow);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Use GET.' });
  if (origin && !allow) return res.status(403).json({ error: 'Origin not allowed.' });

  if (limited(req, res, 'nepse', 30)) return;

  const url = (process.env.NEPSE_API_URL || '').trim();
  // Unset uses the built-in sources; "off" disables.
  const scrapeEnv = (process.env.NEPSE_SCRAPE_URL || '').trim();
  const scrapeOff = /^(off|none|false|0)$/i.test(scrapeEnv);
  const scrapeUrl = scrapeOff ? '' : (scrapeEnv || DEFAULT_SCRAPE_URLS.join(','));

  // Diagnostic probe for setting up a price source; off unless NEPSE_PROBE=on.
  // Limited to known hosts so it cannot fetch arbitrary URLs.
  if (req.query && req.query.probe && /^on$/i.test(process.env.NEPSE_PROBE || '')) {
    const target = String(req.query.probe);
    if (!scrapeHostAllowed(target)) {
      return res.status(400).json({ error: 'Not one of the known price sites.', allowed: SCRAPE_HOSTS });
    }
    try {
      const r = await fetch(target, { headers: { 'user-agent': 'Mozilla/5.0', accept: 'text/html,application/json' } });
      const body = await r.text();
      const ct = r.headers.get('content-type') || '';
      let shape = null, found = null;
      if (/json/i.test(ct) || /^[\s]*[[{]/.test(body)) {
        try {
          const j = JSON.parse(body);
          shape = { kind: 'json', topKeys: Object.keys(j && typeof j === 'object' ? j : {}).slice(0, 25) };
          const norm = normalise(j, {});
          if (norm) found = { count: Object.keys(norm).length, sample: Object.entries(norm).slice(0, 3) };
        } catch { shape = { kind: 'not-json-after-all' }; }
      } else {
        const tables = (body.match(/<table\b/gi) || []).length;
        shape = { kind: 'html', tables, bytes: body.length };
        const d = {};
        const sc = scrapePrices(body, d);
        if (sc) found = { count: Object.keys(sc).length, sample: Object.entries(sc).slice(0, 6),
                          readAs: d.picked || null };
      }
      return res.status(200).json({
        probe: target, status: r.status, contentType: ct, shape, found,
        head: body.slice(0, 400),
      });
    } catch (e) {
      return res.status(200).json({ probe: target, error: String((e && e.message) || e) });
    }
  }

  if (!url && !scrapeUrl) {
    return res.status(200).json({ configured: false, prices: {}, asOf: null });
  }

  const fresh = lastGood && (Date.now() - lastGood.ts) < FRESH_MS;
  if (fresh) {
    return res.status(200).json({
      configured: true, prices: lastGood.prices, count: Object.keys(lastGood.prices).length,
      asOf: new Date(lastGood.ts).toISOString(), ageMs: Date.now() - lastGood.ts, cached: true,
    });
  }

  const map = parseJsonEnv('NEPSE_API_MAP');
  const scraping = !url;
  const targets = scraping
    ? scrapeUrl.split(',').map((x) => x.trim()).filter(Boolean)
    : [url];
  if (scraping) {
    const bad = targets.filter((t) => !scrapeHostAllowed(t));
    if (bad.length) {
      return res.status(500).json({ configured: true,
        error: 'NEPSE_SCRAPE_URL names a site this does not know: ' + bad.join(', ') });
    }
  }
  const headers = scraping
    // Some sites serve a stub to non-browser user agents.
    ? { 'user-agent': 'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36',
        accept: 'text/html,application/xhtml+xml' }
    : { accept: 'application/json', ...parseJsonEnv('NEPSE_API_HEADERS') };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  const troubles = [];
  try {
    for (const target of targets) {
      let prices = null;
      try {
        const upstream = await fetch(target, { headers, signal: controller.signal });
        const text = await upstream.text();
        if (!upstream.ok) {
          console.error('[nepse]', target, upstream.status, text.slice(0, 200));
          troubles.push(target + ' answered ' + upstream.status);
          continue;
        }
        if (scraping) {
          prices = scrapePrices(text);
          if (!prices) {
            console.error('[nepse] no price table at', target, 'bytes:', text.length);
            troubles.push('no price table on ' + target);
            continue;
          }
        } else {
          let body = null;
          try { body = JSON.parse(text); } catch {
            console.error('[nepse] not JSON:', text.slice(0, 120));
            troubles.push('that is a page, not a JSON endpoint, put it in NEPSE_SCRAPE_URL');
            continue;
          }
          prices = normalise(body, map);
          if (!prices) { troubles.push('unfamiliar shape, set NEPSE_API_MAP'); continue; }
        }
      } catch (e) {
        const aborted = e && (e.name === 'AbortError' || e.code === 'ABORT_ERR');
        troubles.push(target + (aborted ? ' timed out' : ': ' + ((e && e.message) || 'unreachable')));
        if (aborted) break;             // the clock is shared; the next one has no time either
        continue;
      }
      lastGood = { prices, ts: Date.now() };
      return res.status(200).json({
        configured: true, prices, count: Object.keys(prices).length,
        via: scraping ? 'page' : 'api', source: target,
        asOf: new Date(lastGood.ts).toISOString(), ageMs: 0, cached: false,
      });
    }
    return serveStaleOrFail(res, troubles.join('; ') || 'Could not reach the price source.');
  } finally {
    clearTimeout(timer);
  }
};

// A day-old price beats none, as long as the app is told its age.
function serveStaleOrFail(res, reason) {
  if (lastGood && (Date.now() - lastGood.ts) < STALE_OK_MS) {
    return res.status(200).json({
      configured: true, prices: lastGood.prices, count: Object.keys(lastGood.prices).length,
      asOf: new Date(lastGood.ts).toISOString(), ageMs: Date.now() - lastGood.ts,
      stale: true, reason,
    });
  }
  return res.status(502).json({ configured: true, error: reason });
}
