// ════════════════════════════════════════════════════════════════════════
// WHERE THE KEYS LIVE, AND WHO GETS TO SEE THEM
// ════════════════════════════════════════════════════════════════════════
// In the `ai_providers` table, read here with the SERVICE ROLE key, which is
// the one credential that stays an environment variable because it is the one
// that unlocks everything else.
//
// This matters more than it looks. Supabase's anon key ships inside
// supabase.js and is public by design: RLS is what protects the rows, not the
// key. So a table the browser can SELECT is a table the whole internet can
// SELECT. `ai_providers` denies every client policy, and only this module,
// running on the server, ever reads it.
//
// Falls back to environment variables so an install that has not run the
// schema yet, or a local checkout with no database at all, still works.

const { PROVIDER_IDS } = require('./_providers.js');

const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const SERVICE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

// One fetch per warm lambda rather than one per request. 60s is short enough
// that a key changed in the admin page takes effect almost at once, and long
// enough that a burst of questions does not become a burst of DB reads.
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

// The database wins where it has a row; the environment fills the gaps. That
// way moving a key into the admin page is a one-way door you can walk back
// through, and nothing breaks in between.
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
      // A row with no key falls back to the environment's key rather than
      // silently disabling a provider that was working a minute ago.
      merged[id] = { ...(merged[id] || {}), ...row,
        apiKey: row.apiKey || (env[id] && env[id].apiKey) || '' };
    });
    cache = merged; cacheAt = Date.now(); inflight = null;
    return merged;
  })();
  return inflight;
}
function invalidate() { cache = null; cacheAt = 0; }

// ── Which provider answers this one ────────────────────────────────────
// Not a fixed primary and a fallback. Each provider is scored for the JOB in
// front of it, so the assistant's long snapshot goes to the one with the
// context window and a one-word tagging call goes to the fastest, and the two
// therefore spend different keys.
//
// A little jitter on top, so two people asking at the same second do not
// deterministically land on the same key and burn one quota while six sit
// idle. That is the whole of the "spread the load" idea: no session tracking,
// which a stateless function could not do honestly anyway.
const { PROVIDERS } = require('./_providers.js');

const FAIL_COOLDOWN_MS = 5 * 60_000;
const failures = new Map();          // `${provider}` -> until-timestamp

function markFailed(id, status) {
  // A rate limit or an outage means the next request should not bother. A
  // bad request was our fault and says nothing about the provider.
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
    // An explicit per-provider score from the admin page overrides the
    // built-in one; 0 means "never use this provider for this job".
    const custom = cfg.jobs && cfg.jobs[job];
    const base = custom == null ? (pv.jobs[job] || 0) : Number(custom);
    if (!(base > 0)) return;
    const models = (cfg.models && cfg.models.length) ? cfg.models : pv.suggest;
    if (!models.length) return;
    // Priority from the admin page is a deliberate thumb on the scale: each
    // step doubles or halves how often this provider is picked first.
    const weight = base * Math.pow(2, Number(cfg.priority) || 0);
    rows.push({ id, cfg, models, weight, cooling: coolingDown(id) });
  });

  // WEIGHTED, NOT RANKED.
  //
  // Sorting by score with a little jitter looked like spreading load and was
  // not: with Groq at 100 and Mistral at 70, a plus-or-minus 12% wobble never
  // closes a 30-point gap, so Groq served 200 out of 200 requests in testing
  // and six keys sat idle while one hit its ceiling.
  //
  // Drawing without replacement, weighted by fitness, actually spreads them.
  // The provider best suited to the job still wins most of the time, in
  // proportion to how much better it is, and every other key takes a real
  // share instead of none. Two people asking at the same moment genuinely
  // land on different providers, which is the point.
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
  // Anything in cooldown goes last rather than being dropped: if every
  // provider is rate limited, one of them is still better than an error.
  cold.sort((a, b) => b.weight - a.weight);
  return order.concat(cold);
}

module.exports = { loadConfig, invalidate, planFor, markFailed, markOk, coolingDown,
  hasDatabase: () => !!(SUPABASE_URL && SERVICE_KEY) };
