// Nepal gold and silver in NPR per tola: scraped from arthakendra, with spot x USD/NPR as the fallback.

const TOLA_IN_GRAMS = 11.6638;
const OZ_IN_GRAMS = 31.1035;

const DEFAULT_ORIGINS = [
  'https://nepbytebazaar.kesug.com',
  'http://nepbytebazaar.kesug.com',
];
// Only this project's own *.vercel.app deployments, not every project on the platform.
function projectPreviewHost(host) {
  const prod = (process.env.VERCEL_PROJECT_PRODUCTION_URL || '').trim().toLowerCase();
  if (!host.endsWith('.vercel.app')) return false;
  // No project URL (local dev): refuse cross-origin *.vercel.app.
  if (!prod) return false;
  if (host === prod) return true;
  const project = prod.replace(/\.vercel\.app$/, '');
  // Preview deployments look like <project>-<hash>-<scope>.vercel.app
  return host.startsWith(project + '-');
}
function isAllowedOrigin(origin) {
  if (!origin) return false;
  const extra = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  if ([...DEFAULT_ORIGINS, ...extra].includes(origin)) return true;
  try { return projectPreviewHost(new URL(origin).hostname.toLowerCase()); } catch (_) { return false; }
}

// Last good result, so a failed scrape serves a slightly stale price rather than none.
let lastGood = null; // { data, ts }
const STALE_OK_MS = 6 * 60 * 60 * 1000; // serve up to 6h old on total failure

async function fetchWithTimeout(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(tid);
  }
}

// Wide on purpose: this catches a misparsed number, not a real market move.
function ratesLookSane(goldTola, silverTola) {
  if (!Number.isFinite(goldTola) || !Number.isFinite(silverTola)) return false;
  if (goldTola < 50_000 || goldTola > 5_000_000) return false;
  if (silverTola < 500 || silverTola > 200_000) return false;
  // Gold has been between roughly 30× and 150× silver by weight for decades.
  const ratio = goldTola / silverTola;
  return ratio > 20 && ratio < 200;
}

async function fetchNepalRates() {
  const res = await fetchWithTimeout('https://arthakendra.com/gold-silver-price-in-nepal', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Paisafolio/1.0)',
      Accept: 'text/html',
    },
  });
  if (!res.ok) throw new Error(`arthakendra HTTP ${res.status}`);
  const html = await res.text();

  const parseNum = (s) => parseFloat(String(s).replace(/,/g, ''));

  // The price nearest the word, rather than trusting the order things appear on the page.
  function nearKeyword(keyword) {
    const re = new RegExp(keyword, 'gi');
    let m;
    while ((m = re.exec(html)) !== null) {
      const window = html.slice(m.index, m.index + 600);
      const price = window.match(/Rs\.?\s*([0-9][0-9,]{2,})\s*\/?-?/);
      if (price) {
        const n = parseNum(price[1]);
        if (Number.isFinite(n) && n > 100) return n;
      }
    }
    return null;
  }

  let goldTola = nearKeyword('hallmark|fine gold|gold');
  let silverTola = nearKeyword('silver');

  // Positional fallback, accepted only if it passes the sanity check.
  if (!goldTola || !silverTola) {
    const all = [...html.matchAll(/Rs\.?\s*([0-9][0-9,]{2,})\s*\/-/g)].map((x) => parseNum(x[1]));
    if (all.length >= 2) { goldTola = goldTola || all[0]; silverTola = silverTola || all[1]; }
  }

  if (!ratesLookSane(goldTola, silverTola)) {
    throw new Error(`Parsed prices failed sanity check: gold=${goldTola} silver=${silverTola}`);
  }

  return {
    gold_tola_npr: goldTola,
    silver_tola_npr: silverTola,
    gold_gram_npr: goldTola / TOLA_IN_GRAMS,
    silver_gram_npr: silverTola / TOLA_IN_GRAMS,
    source: 'FENEGOSIDA via arthakendra.com',
    strategy: 'nepal-official',
  };
}

async function fetchFallbackRates() {
  const fxRes = await fetchWithTimeout('https://open.er-api.com/v6/latest/USD');
  if (!fxRes.ok) throw new Error('FX fetch failed');
  const fx = await fxRes.json();
  const nprPerUsd = fx?.rates?.NPR;
  if (!nprPerUsd || nprPerUsd < 50 || nprPerUsd > 500) throw new Error('NPR rate missing or implausible');

  const [goldRes, silverRes, platRes] = await Promise.all([
    fetchWithTimeout('https://api.gold-api.com/price/XAU'),
    fetchWithTimeout('https://api.gold-api.com/price/XAG'),
    fetchWithTimeout('https://api.gold-api.com/price/XPT'),
  ]);

  const gold = goldRes.ok ? await goldRes.json() : null;
  const silver = silverRes.ok ? await silverRes.json() : null;
  const plat = platRes.ok ? await platRes.json() : null;

  const goldUsd = gold?.price;
  const silverUsd = silver?.price;
  if (!goldUsd || !silverUsd) throw new Error('Metal prices missing');

  const usdOzToNprTola = (usdPerOz) => (usdPerOz / OZ_IN_GRAMS) * TOLA_IN_GRAMS * nprPerUsd;

  const goldTola = Math.round(usdOzToNprTola(goldUsd));
  const silverTola = Math.round(usdOzToNprTola(silverUsd));
  if (!ratesLookSane(goldTola, silverTola)) {
    throw new Error(`Fallback prices failed sanity check: gold=${goldTola} silver=${silverTola}`);
  }

  return {
    gold_tola_npr: goldTola,
    silver_tola_npr: silverTola,
    gold_gram_npr: (goldUsd / OZ_IN_GRAMS) * nprPerUsd,
    silver_gram_npr: (silverUsd / OZ_IN_GRAMS) * nprPerUsd,
    platinum_tola_npr: plat?.price ? Math.round(usdOzToNprTola(plat.price)) : null,
    platinum_gram_npr: plat?.price ? (plat.price / OZ_IN_GRAMS) * nprPerUsd : null,
    usd_npr: nprPerUsd,
    gold_usd_oz: goldUsd,
    silver_usd_oz: silverUsd,
    source: 'gold-api.com + open.er-api.com (international spot)',
    strategy: 'international-spot',
  };
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (origin) {
    if (!isAllowedOrigin(origin)) return res.status(403).json({ error: 'Origin not allowed' });
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=600, stale-while-revalidate=3600');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    return res.status(204).end();
  }
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  let result = null;
  const errors = [];

  try {
    result = await fetchNepalRates();
  } catch (e) {
    errors.push(`Primary (arthakendra): ${e.message}`);
    console.warn('[metals] Primary failed:', e.message);
  }

  if (!result) {
    try {
      result = await fetchFallbackRates();
    } catch (e) {
      errors.push(`Fallback: ${e.message}`);
      console.error('[metals] Fallback also failed:', e.message);
    }
  }

  // Both live strategies failed — serve last known good if it's recent enough.
  if (!result && lastGood && Date.now() - lastGood.ts < STALE_OK_MS) {
    return res.status(200).json({
      ...lastGood.data,
      stale: true,
      age_seconds: Math.round((Date.now() - lastGood.ts) / 1000),
      updated_at: new Date(lastGood.ts).toISOString(),
      errors,
    });
  }

  if (!result) {
    return res.status(502).json({ error: 'All sources failed', details: errors });
  }

  lastGood = { data: result, ts: Date.now() };
  return res.status(200).json({
    ...result,
    stale: false,
    updated_at: new Date().toISOString(),
    errors: errors.length ? errors : undefined,
  });
}
