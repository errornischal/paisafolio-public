// api/crypto.js — Vercel Serverless Function
// Proxies CoinGecko so Nepal IPs aren't blocked.
//
// HARDENING NOTES (v2):
//  • Cache is now bounded (LRU, 300 entries). Previously every distinct
//    `ids`/`query` string created a permanent map entry — anyone could grow
//    the lambda's heap without limit just by sending random query strings.
//  • `days` and `date` were interpolated raw into the upstream URL, letting a
//    caller append arbitrary CoinGecko query params (`?days=7&vs_currency=btc`).
//    Both are now strictly validated against a whitelist/format.
//  • CORS is restricted to our own deployments instead of `*`, so this stops
//    being a free public CoinGecko proxy burning our rate limit.
//  • (v3) That allowlist accepted *any* *.vercel.app host, i.e. every project
//    on the platform. Now scoped to this project's own deployments.
//  • Every upstream call has a hard timeout so a slow CoinGecko can't pin the
//    function open until Vercel kills it.

const CG = 'https://api.coingecko.com/api/v3';
// Binance's public market-data endpoints need no key and serve real OHLC at
// every interval, as far back as the pair has traded. CoinGecko's free tier
// gives 30-minute data for a single day, which is not a chart you can scroll.
//
// data-api.binance.vision is Binance's own market-data-only mirror and is not
// geo-restricted the way the main host is in some regions; api.binance.com is
// kept as a second try. Either way a failure here just means the caller falls
// back to CoinGecko.
const BINANCE_HOSTS = [
  'https://data-api.binance.vision/api/v3',
  'https://api.binance.com/api/v3',
];
const TTL_MS = 60_000;
const MAX_CACHE_ENTRIES = 300;
const UPSTREAM_TIMEOUT_MS = 8000;

// Origins allowed to call this endpoint. Set ALLOWED_ORIGINS in Vercel
// (comma-separated) to add your own domains without editing this file.
const DEFAULT_ORIGINS = [
  'https://nepbytebazaar.kesug.com',
  'http://nepbytebazaar.kesug.com',
];
function allowedOrigins() {
  const fromEnv = (process.env.ALLOWED_ORIGINS || '')
    .split(',').map((s) => s.trim()).filter(Boolean);
  return [...DEFAULT_ORIGINS, ...fromEnv];
}
// Vercel gives every deployment of every project a *.vercel.app hostname, so
// `hostname.endsWith('.vercel.app')` allowed the entire platform — anyone could
// host a page on their own *.vercel.app and spend this project's upstream rate
// limit. Scope it to this project's own deployments: Vercel sets
// VERCEL_PROJECT_PRODUCTION_URL (e.g. your-app.vercel.app) at build time, and
// preview URLs are that project name with a deployment suffix.
function projectPreviewHost(host) {
  const prod = (process.env.VERCEL_PROJECT_PRODUCTION_URL || '').trim().toLowerCase();
  if (!host.endsWith('.vercel.app')) return false;
  // No project URL available (local dev, self-hosted): fall back to refusing
  // cross-origin *.vercel.app rather than accepting all of it.
  if (!prod) return false;
  if (host === prod) return true;
  const project = prod.replace(/\.vercel\.app$/, '');
  // Preview deployments look like <project>-<hash>-<scope>.vercel.app
  return host.startsWith(project + '-');
}
function isAllowedOrigin(origin) {
  if (!origin) return false;
  if (allowedOrigins().includes(origin)) return true;
  try {
    return projectPreviewHost(new URL(origin).hostname.toLowerCase());
  } catch (_) { return false; }
}

// ── Bounded LRU cache ───────────────────────────────────────────────────
// Map preserves insertion order, so the first key is always the oldest.
const cache = new Map();
function cacheGet(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > TTL_MS) { cache.delete(key); return null; }
  cache.delete(key); cache.set(key, entry); // refresh recency
  return entry.data;
}
function cacheSet(key, data) {
  cache.set(key, { ts: Date.now(), data });
  while (cache.size > MAX_CACHE_ENTRIES) cache.delete(cache.keys().next().value);
}

async function cgFetch(path) { return upstream(`${CG}${path}`); }
async function bnFetch(path) {
  let last;
  for (const host of BINANCE_HOSTS) {
    try { return await upstream(`${host}${path}`); } catch (e) { last = e; }
  }
  throw last || new Error('binance unavailable');
}
async function upstream(url) {
  const cached = cacheGet(url);
  if (cached) return cached;

  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const data = await res.json();
    cacheSet(url, data);
    return data;
  } catch (e) {
    if (e.name === 'AbortError') throw new Error('upstream timed out');
    throw e;
  } finally {
    clearTimeout(tid);
  }
}

// ── Input validation ────────────────────────────────────────────────────
// Query params arrive as string | string[] depending on how many times the
// key appears. Always collapse to a single string before touching it.
function one(v) { return Array.isArray(v) ? v[0] : v; }

// CoinGecko ids are lowercase slugs. Cap the list so nobody can push a
// megabyte of ids through us.
const ID_RE = /^[a-z0-9-]{1,64}$/;
function cleanIds(raw, fallback) {
  const s = one(raw);
  if (!s || typeof s !== 'string') return fallback;
  const ids = s.split(',').map((x) => x.trim().toLowerCase())
    .filter((x) => ID_RE.test(x)).slice(0, 100);
  return ids.length ? ids.join(',') : fallback;
}
function cleanId(raw) {
  const s = (one(raw) || '').trim().toLowerCase();
  return ID_RE.test(s) ? s : null;
}
// CoinGecko only honours a fixed set of `days` values for OHLC.
const ALLOWED_DAYS = new Set(['1', '7', '14', '30', '90', '180', '365', 'max']);
function cleanDays(raw) {
  const s = String(one(raw) ?? '7').trim();
  return ALLOWED_DAYS.has(s) ? s : '7';
}
// market_chart takes any positive day count, or 'max'. Bounded so a caller
// cannot ask for something absurd.
function cleanChartDays(raw) {
  const s = String(one(raw) ?? '90').trim();
  if (s === 'max') return 'max';
  const n = parseInt(s, 10);
  if (!Number.isFinite(n) || n < 1) return '90';
  return String(Math.min(n, 3650));
}
// Binance pair symbols are uppercase alphanumerics, e.g. BTCUSDT.
const SYMBOL_RE = /^[A-Z0-9]{4,20}$/;
function cleanSymbol(raw) {
  const v = (one(raw) || '').trim().toUpperCase();
  return SYMBOL_RE.test(v) ? v : null;
}
const KLINE_INTERVALS = new Set(['1m','3m','5m','15m','30m','1h','2h','4h','6h','8h','12h','1d','3d','1w','1M']);
function cleanInterval(raw) {
  const v = (one(raw) || '').trim();
  return KLINE_INTERVALS.has(v) ? v : '1h';
}
function cleanLimit(raw) {
  const n = parseInt(String(one(raw) ?? '1000'), 10);
  if (!Number.isFinite(n) || n < 1) return 1000;
  return Math.min(n, 1000);
}
// Milliseconds since the epoch, used to page backwards through history.
function cleanMs(raw) {
  const s = one(raw);
  if (s == null || s === '') return null;
  const n = parseInt(String(s), 10);
  if (!Number.isFinite(n) || n < 0 || n > 4102444800000) return null;
  return n;
}
// CoinGecko /history wants strictly dd-mm-yyyy.
function cleanDate(raw) {
  const s = (one(raw) || '').trim();
  if (!/^\d{2}-\d{2}-\d{4}$/.test(s)) return null;
  const [d, m, y] = s.split('-').map(Number);
  if (m < 1 || m > 12 || d < 1 || d > 31 || y < 2009 || y > 2100) return null;
  return s;
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  // Same-origin browser requests send no Origin header at all — those are
  // always fine. Cross-origin ones must be on the allowlist.
  if (origin) {
    if (!isAllowedOrigin(origin)) {
      return res.status(403).json({ error: 'Origin not allowed' });
    }
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Max-Age', '86400');
    return res.status(204).end();
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const params = req.query || {};
  const action = one(params.action) || 'prices';

  try {
    let data;
    if (action === 'prices') {
      const ids = cleanIds(params.ids, 'bitcoin,ethereum');
      data = await cgFetch(`/simple/price?ids=${encodeURIComponent(ids)}&vs_currencies=usd&include_24hr_change=true`);
    } else if (action === 'search') {
      const q = (one(params.query) || '').trim().slice(0, 80);
      if (!q) return res.status(400).json({ error: 'query required' });
      data = await cgFetch(`/search?query=${encodeURIComponent(q)}`);
    } else if (action === 'coin') {
      const id = cleanId(params.id);
      if (!id) return res.status(400).json({ error: 'valid id required' });
      data = await cgFetch(`/simple/price?ids=${encodeURIComponent(id)}&vs_currencies=usd&include_24hr_change=true`);
    } else if (action === 'ohlc') {
      const id = cleanId(params.id) || 'bitcoin';
      const days = cleanDays(params.days);
      data = await cgFetch(`/coins/${encodeURIComponent(id)}/ohlc?vs_currency=usd&days=${encodeURIComponent(days)}`);
    } else if (action === 'chart') {
      // market_chart returns a price SERIES rather than candles, and it goes
      // much further back at a usable resolution than /ohlc does: 5-minutely
      // for a day, hourly up to 90 days, daily beyond that, and 'max' for the
      // coin's whole life. The client builds candles from it, which is how you
      // get 1H candles covering three months instead of /ohlc's single day.
      const id = cleanId(params.id) || 'bitcoin';
      const days = cleanChartDays(params.days);
      const iv = one(params.interval);
      const suffix = iv === 'daily' ? '&interval=daily' : '';
      data = await cgFetch(`/coins/${encodeURIComponent(id)}/market_chart?vs_currency=usd&days=${encodeURIComponent(days)}${suffix}`);
    } else if (action === 'klines') {
      // Real candles, and pageable: pass endTime to walk backwards, which is
      // what lets the chart keep loading history as you scroll left.
      const symbol = cleanSymbol(params.symbol);
      if (!symbol) return res.status(400).json({ error: 'valid symbol required' });
      const interval = cleanInterval(params.interval);
      const limit = cleanLimit(params.limit);
      const endTime = cleanMs(params.endTime);
      let q = `symbol=${symbol}&interval=${encodeURIComponent(interval)}&limit=${limit}`;
      if (endTime != null) q += `&endTime=${endTime}`;
      data = await bnFetch(`/klines?${q}`);
    } else if (action === 'history') {
      const id = cleanId(params.id) || 'bitcoin';
      const date = cleanDate(params.date);
      if (!date) return res.status(400).json({ error: 'date required as dd-mm-yyyy' });
      data = await cgFetch(`/coins/${encodeURIComponent(id)}/history?date=${encodeURIComponent(date)}&localization=false`);
    } else {
      return res.status(400).json({ error: 'Unknown action' });
    }
    return res.status(200).json(data);
  } catch (err) {
    console.error('[crypto]', err.message);
    // Don't leak upstream internals to the caller.
    return res.status(502).json({ error: 'Upstream price service unavailable' });
  }
}
