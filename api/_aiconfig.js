// Provider keys live in `ai_providers`, which no client policy can read; only this
// server module reads it, with the service role. Env vars fill any gaps.

const { PROVIDER_IDS } = require('./_providers.js');

const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const SERVICE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

// Cached per warm lambda; admin edits apply within a minute.
const TTL_MS = 60_000;
let cache = null, cacheAt = 0, inflight = null;

function envKeyFor(id) {
  // GEMINI_API_KEY, GROQ_API_KEY, ... plus the original name for Gemini.
  return (process.env[id.toUpperCase() + '_API_KEY'] || '').trim();
}

function fromEnv() {
  const out = {};
  PROVIDER_IDS.forEach((id) => {
    const key = envKeyFor(id);
    if (!key) return;
    out[id] = { id, apiKey: key, enabled: true, models: [], priority: 0,
      jobs: null, source: 'env' };
  });
  return out;
}

async function fromDatabase() {
  if (!SUPABASE_URL || !SERVICE_KEY) return null;
  const res = await fetch(SUPABASE_URL.replace(/\/+$/, '') + '/rest/v1/ai_providers?select=*', {
    headers: { apikey: SERVICE_KEY, Authorization: 'Bearer ' + SERVICE_KEY },
  });
  if (!res.ok) return null;
  const rows = await res.json();
  if (!Array.isArray(rows)) return null;
  const out = {};
  rows.forEach((r) => {
    if (!r || !r.provider || PROVIDER_IDS.indexOf(r.provider) < 0) return;
    out[r.provider] = {
      id: r.provider,
      apiKey: (r.api_key || '').trim(),
      enabled: r.enabled !== false,
      models: Array.isArray(r.models) ? r.models.filter(Boolean).map(String) : [],
      priority: Number(r.priority) || 0,
      jobs: (r.jobs && typeof r.jobs === 'object') ? r.jobs : null,
      referer: r.referer || null,
      source: 'db',
    };
  });
  return out;
}

// Database rows win; env vars fill the gaps.
async function loadConfig(force) {
  const now = Date.now();
  if (!force && cache && (now - cacheAt) < TTL_MS) return cache;
  if (inflight) return inflight;
  inflight = (async () => {
    const env = fromEnv();
    let db = null;
    try { db = await fromDatabase(); } catch (e) { console.warn('[ai] provider table unreadable:', e.message); }
    const merged = { ...env };
    if (db) Object.keys(db).forEach((id) => {
      const row = db[id];
      // No key in the row: fall back to the env key.
      merged[id] = { ...(merged[id] || {}), ...row,
        apiKey: row.apiKey || (env[id] && env[id].apiKey) || '' };
    });
    cache = merged; cacheAt = Date.now(); inflight = null;
    return merged;
  })();
  return inflight;
}
function invalidate() { cache = null; cacheAt = 0; }

// Routing: each provider is scored for the job (chat vs quick), then picked by weighted draw.
const { PROVIDERS } = require('./_providers.js');

const FAIL_COOLDOWN_MS = 5 * 60_000;
const failures = new Map();          // `${provider}` -> until-timestamp

function markFailed(id, status) {
  // Rate limits and outages cool a provider down; our own bad request does not.
  if (status === 429 || status === 408 || status >= 500 || status === 401 || status === 403) {
    failures.set(id, Date.now() + FAIL_COOLDOWN_MS);
  }
}
function markOk(id) { failures.delete(id); }
function coolingDown(id) {
  const until = failures.get(id);
  if (!until) return false;
  if (Date.now() > until) { failures.delete(id); return false; }
  return true;
}

function planFor(job, config) {
  const rows = [];
  PROVIDER_IDS.forEach((id) => {
    const cfg = config[id];
    if (!cfg || !cfg.apiKey || cfg.enabled === false) return;
    const pv = PROVIDERS[id];
    // Admin per-job score overrides the default; 0 means never.
    const custom = cfg.jobs && cfg.jobs[job];
    const base = custom == null ? (pv.jobs[job] || 0) : Number(custom);
    if (!(base > 0)) return;
    const models = (cfg.models && cfg.models.length) ? cfg.models : pv.suggest;
    if (!models.length) return;
    // Each priority step doubles or halves the weight.
    const weight = base * Math.pow(2, Number(cfg.priority) || 0);
    rows.push({ id, cfg, models, weight, cooling: coolingDown(id) });
  });

  // Weighted draw without replacement, not a sort: sorting let one key serve every
  // request while the rest sat idle.
  const hot = rows.filter((r) => !r.cooling);
  const cold = rows.filter((r) => r.cooling);
  const order = [];
  const pool = hot.slice();
  while (pool.length) {
    let total = 0;
    pool.forEach((r) => { total += r.weight; });
    let pick = Math.random() * total, idx = 0;
    for (let i = 0; i < pool.length; i++) {
      pick -= pool[i].weight;
      if (pick <= 0) { idx = i; break; }
      idx = i;
    }
    order.push(pool.splice(idx, 1)[0]);
  }
  // Cooling providers go last, not away: one is still better than an error.
  cold.sort((a, b) => b.weight - a.weight);
  return order.concat(cold);
}

module.exports = { loadConfig, invalidate, planFor, markFailed, markOk, coolingDown,
  hasDatabase: () => !!(SUPABASE_URL && SERVICE_KEY) };
