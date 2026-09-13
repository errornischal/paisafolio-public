// api/nepse.js — Vercel Serverless Function
// Returns last traded prices for NEPSE-listed shares, in NPR.
//
// WHY THIS EXISTS AT ALL, rather than fetching from app.js:
// Crypto works from the browser because CoinGecko answers with
// `Access-Control-Allow-Origin: *`. Nothing that carries NEPSE prices does.
// NEPSE's own JSON backend sends no CORS headers, rejects non-browser
// clients, and gates its endpoints behind a token computed in WebAssembly;
// every third party (broker portals, aggregators) is an HTML page with no
// CORS either. A static PWA cannot read any of them. A server can, because
// the same-origin policy is a browser rule and this is not a browser.
//
// WHERE THE PRICES COME FROM:
// There is no official public NEPSE API, so this reads a public page that
// prints the day's prices in a table, the same way api/metals.js reads gold
// and silver rates. The sources are below, in the file, because none of this
// is secret: they are public URLs anyone can open. A Vercel environment
// variable would be the right home for a key, and the wrong home for this,
// since changing one needs a redeploy anyway and a line of code at least
// leaves a trace in the history of what changed and when.
//
// Tried in order. These sites are unofficial and they do go down; a second
// one costs nothing and means a bad afternoon at one is not a bad afternoon
// for the app.
const DEFAULT_SCRAPE_URLS = [
  'https://merolagani.com/LatestMarket.aspx',
  'https://www.sharesansar.com/today-share-price',
];
// Overrides, for pointing this somewhere else without editing the file. All
// optional, and all of them empty is the normal case.
//   NEPSE_SCRAPE_URL   page(s) to read instead of the two above, comma-separated
//   NEPSE_API_URL      a JSON endpoint, if a working one ever turns up
//   NEPSE_API_HEADERS  JSON, auth for that endpoint: {"Authorization":"Bearer ..."}
//   NEPSE_API_MAP      JSON, when its field names cannot be guessed:
//                      {"list":"data","symbol":"symbol",
//                       "price":"lastTradedPrice","change":"percentChange"}

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

// The shape of the answer is not knowable in advance, so rather than demand
// one, look for the fields under the names they are usually given. Checked
// in order, so the more specific name wins over the vaguer one.
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
// "1,234.50" and "1234.5" and 1234.5 all mean the same thing. A percentage
// may arrive as "-2.35%" or as a bare number.
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
    // A symbol is letters and digits. Anything else is a header row, a total,
    // or a field that only looked like a symbol.
    if (!sym || !/^[A-Z0-9._-]{1,20}$/.test(sym)) continue;
    const price = toNum(map.price ? row[map.price] : pick(row, PRICE_KEYS));
    // Zero is what an untraded scrip reports, and it is not a price. Carrying
    // it through would mark a holding as worthless.
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

// ── Reading a page instead of an API ─────────────────────────────────
// There is no free official NEPSE API. What there is: public pages that
// print the day's prices in an ordinary HTML table. Reading one server-side
// is the same thing api/metals.js already does for gold and silver, it needs
// no key, no third service and no account, and it is free for as long as the
// page exists.
//
// The parser is deliberately generic. Rather than match one site's markup,
// which would break the first time they touch their template, it looks at
// every table on the page, works out which columns are the symbol and the
// price from the header row, and reads the rows under them. That survives a
// redesign and works on more than one site without a rewrite.
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
// Ranked, not first-match. ShareSansar's table carries Close at column 6 and
// LTP at column 7; taking whichever appeared first meant reading the closing
// price while the market was still open. The last traded price is the live
// one, so it wins wherever both are offered.
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
// `diag`, when passed, comes back describing which table was chosen and which
// column was read as what. Guessing a column is the one way this can be
// confidently wrong, so it has to be checkable before anyone trusts it.
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
      // A price of zero is an untraded scrip. Anything above a crore per share
      // is a parse that has picked up the wrong column, not a share price.
      if (price === null || price <= 0 || price > 1e7) continue;
      const change = iChg >= 0 ? toNum(cells[iChg]) : null;
      out[sym] = { price, change: change === null ? 0 : change };
    }
    // A real day's table is hundreds of rows. A handful means the wrong table
    // was picked, and a wrong price is worse than no price.
    if (Object.keys(out).length >= 20 && (!best || Object.keys(out).length > Object.keys(best).length)) {
      best = out;
      bestDiag = { header: rows[hi], columns: { symbol: iSym, price: iPrice, change: iChg },
                   firstDataRows: rows.slice(hi + 1, hi + 4) };
    }
  }
  if (diag) diag.picked = bestDiag;
  return best;
}

// Last good answer, so one bad minute upstream serves a slightly old price
// rather than none. The app is told how old it is and says so.
let lastGood = null;             // { prices, ts }
const FRESH_MS = 60 * 1000;      // reuse within a minute rather than refetch
const STALE_OK_MS = 24 * 60 * 60 * 1000;

// Shared across everything this instance serves. Not a real rate limiter,
// serverless spreads requests over many instances, but it keeps one page from
// hammering the upstream.
const hits = new Map();
function overLimit(ip) {
  const now = Date.now(), win = 60_000, max = 30;
  const rec = hits.get(ip) || { n: 0, t: now };
  if (now - rec.t > win) { rec.n = 0; rec.t = now; }
  rec.n += 1; hits.set(ip, rec);
  if (hits.size > 500) for (const [k, v] of hits) if (now - v.t > win) hits.delete(k);
  return rec.n > max;
}

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

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'anon';
  if (overLimit(ip)) return res.status(429).json({ error: 'Too many requests.' });

  const url = (process.env.NEPSE_API_URL || '').trim();
  // Unset means the built-in sources. "off" means off, so there is a way to
  // stop it reaching out at all without editing the file.
  const scrapeEnv = (process.env.NEPSE_SCRAPE_URL || '').trim();
  const scrapeOff = /^(off|none|false|0)$/i.test(scrapeEnv);
  const scrapeUrl = scrapeOff ? '' : (scrapeEnv || DEFAULT_SCRAPE_URLS.join(','));

  // A look at what a candidate source actually returns, so a page can be
  // checked from a phone without deploying anything. Restricted to the hosts
  // that carry this data: an endpoint that will fetch any URL you hand it is
  // a way to make this server knock on doors on someone else's behalf.
  if (req.query && req.query.probe) {
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
    // Only reachable if someone deliberately blanks the sources. The app asks
    // on every price refresh, and a feature switched off is not a failure to
    // report.
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
  // A comma-separated list is allowed, tried in order. These sources are
  // unofficial and go down; a second one costs nothing to name and means a
  // bad afternoon at one site is not a bad afternoon for the app.
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
    // A page served to a browser, asked for the way a browser asks. Sites that
    // return a stub to anything else are not being difficult, they are being
    // asked the wrong question.
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
            // An HTML page, which is what an expired endpoint serves. Not
            // something to parse hopefully and guess at. If a page is what
            // you meant, it goes in NEPSE_SCRAPE_URL instead.
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

// A day-old last traded price is worth more than nothing, as long as the app
// is told how old it is and can say so on screen.
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
