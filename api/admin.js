// Admin API. Every call is re-checked server-side against profiles.role.
// Provider keys are write-only: stored, never returned.

const { requireAdmin, sql, maskKey, configured } = require('./_adminAuth.js');
const { PROVIDERS, PROVIDER_IDS, listModels, callProvider } = require('./_providers.js');
const { loadConfig, invalidate, planFor } = require('./_aiconfig.js');

const DEFAULT_ORIGINS = [];
function projectPreviewHost(host) {
  const prod = (process.env.VERCEL_PROJECT_PRODUCTION_URL || '').trim().toLowerCase();
  if (!host.endsWith('.vercel.app') || !prod) return false;
  if (host === prod) return true;
  return host.startsWith(prod.replace(/\.vercel\.app$/, '') + '-');
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

async function rows(path) {
  const r = await sql(path, { method: 'GET' });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

// the actions
const ACTIONS = {
  // Everything the admin page needs to draw itself, in one round trip.
  async overview() {
    const config = await loadConfig(true);
    const providers = PROVIDER_IDS.map((id) => {
      const pv = PROVIDERS[id], cfg = config[id] || {};
      return {
        id, label: pv.label, note: pv.note, console: pv.console, docs: pv.docs,
        suggest: pv.suggest, defaultJobs: pv.jobs,
        configured: !!cfg.apiKey,
        keyMask: maskKey(cfg.apiKey),
        keySource: cfg.source || null,
        enabled: cfg.enabled !== false,
        models: cfg.models || [],
        priority: cfg.priority || 0,
        jobs: cfg.jobs || null,
      };
    });
    // Which provider would serve the next request of each kind.
    const plan = {};
    ['chat', 'quick'].forEach((job) => {
      plan[job] = planFor(job, config).map((r) => ({
        id: r.id, models: r.models, cooling: r.cooling, score: Math.round(r.score),
      }));
    });
    return { providers, plan, storage: configured() ? 'database' : 'environment' };
  },

  // An empty api_key keeps the stored one.
  async saveProvider(body) {
    const id = String(body.provider || '');
    if (PROVIDER_IDS.indexOf(id) < 0) throw Object.assign(new Error('Unknown provider'), { status: 400 });
    const patch = { provider: id };
    if (typeof body.enabled === 'boolean') patch.enabled = body.enabled;
    if (Array.isArray(body.models)) patch.models = body.models.map(String).filter(Boolean).slice(0, 12);
    if (body.priority != null) patch.priority = Math.max(-5, Math.min(5, Number(body.priority) || 0));
    if (body.jobs && typeof body.jobs === 'object') {
      const j = {};
      ['chat', 'quick'].forEach((k) => { if (body.jobs[k] != null) j[k] = Math.max(0, Math.min(100, Number(body.jobs[k]) || 0)); });
      patch.jobs = j;
    }
    if (typeof body.referer === 'string') patch.referer = body.referer.slice(0, 200) || null;
    const key = typeof body.apiKey === 'string' ? body.apiKey.trim() : '';
    if (key) patch.api_key = key;
    patch.updated_at = new Date().toISOString();
    const r = await sql('ai_providers?on_conflict=provider', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
      body: JSON.stringify([patch]),
    });
    if (!r.ok) throw Object.assign(new Error(await r.text()), { status: 502 });
    invalidate();
    return { saved: id };
  },

  async clearKey(body) {
    const id = String(body.provider || '');
    if (PROVIDER_IDS.indexOf(id) < 0) throw Object.assign(new Error('Unknown provider'), { status: 400 });
    const r = await sql('ai_providers?provider=eq.' + encodeURIComponent(id), {
      method: 'PATCH', body: JSON.stringify({ api_key: null, enabled: false }),
    });
    if (!r.ok) throw Object.assign(new Error(await r.text()), { status: 502 });
    invalidate();
    return { cleared: id };
  },

  // Live model list for this key.
  async models(body) {
    const id = String(body.provider || '');
    const config = await loadConfig(true);
    const cfg = config[id];
    if (!cfg || !cfg.apiKey) throw Object.assign(new Error('No key saved for that provider yet.'), { status: 400 });
    const list = await listModels(id, cfg);
    return { provider: id, models: list, count: list.length };
  },

  // One real request through one provider.
  async test(body) {
    const id = String(body.provider || '');
    const config = await loadConfig(true);
    const cfg = config[id];
    if (!cfg || !cfg.apiKey) throw Object.assign(new Error('No key saved for that provider yet.'), { status: 400 });
    const model = String(body.model || '') || (cfg.models && cfg.models[0]) || (PROVIDERS[id].suggest || [])[0];
    if (!model) throw Object.assign(new Error('Pick a model to test.'), { status: 400 });
    const started = Date.now();
    try {
      const out = await callProvider(id, cfg, model, {
        system: 'Reply with exactly one word: OK',
        turns: [{ role: 'user', text: 'Say OK.' }],
        maxTokens: 200, temperature: 0,
      }, 15_000);
      return { ok: true, provider: id, model, ms: Date.now() - started, reply: out.text.slice(0, 120) };
    } catch (e) {
      return { ok: false, provider: id, model, ms: Date.now() - started,
        status: e.status || 0, error: String(e.message || '').slice(0, 300) };
    }
  },

  // Roster and counts only, never anyone's figures.
  async users() {
    const list = await rows('profiles?select=user_id,email,full_name,username,role,currency,created_at,updated_at&order=created_at.desc&limit=500');
    return { users: list, count: list.length };
  },

  async setRole(body) {
    const id = String(body.userId || '');
    const role = String(body.role || 'user');
    if (!id) throw Object.assign(new Error('Which user?'), { status: 400 });
    if (['user', 'admin'].indexOf(role) < 0) throw Object.assign(new Error('Unknown role'), { status: 400 });
    const r = await sql('profiles?user_id=eq.' + encodeURIComponent(id), {
      method: 'PATCH', body: JSON.stringify({ role }),
    });
    if (!r.ok) throw Object.assign(new Error(await r.text()), { status: 502 });
    return { userId: id, role };
  },

  // Row counts per table, never contents.
  async stats() {
    const tables = ['profiles', 'assets', 'transactions', 'spends', 'debts', 'goals', 'recurring', 'habits'];
    const out = {};
    await Promise.all(tables.map(async (t) => {
      try {
        const r = await sql(t + '?select=*', { method: 'HEAD', headers: { Prefer: 'count=exact' } });
        const range = r.headers.get('content-range') || '';
        out[t] = Number(range.split('/')[1]) || 0;
      } catch { out[t] = null; }
    }));
    return { counts: out };
  },
};

module.exports = async function handler(req, res) {
  const origin = allowedOrigin(req.headers.origin);
  if (origin) { res.setHeader('Access-Control-Allow-Origin', origin); res.setHeader('Vary', 'Origin'); }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' });
  if (req.headers.origin && !origin) return res.status(403).json({ error: 'Origin not allowed.' });

  const gate = await requireAdmin(req);
  if (!gate.ok) return res.status(gate.status).json({ error: gate.error, detail: gate.detail });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = null; } }
  if (!body || typeof body !== 'object') return res.status(400).json({ error: 'Bad request body.' });

  const action = String(body.action || '');
  const fn = ACTIONS[action];
  if (!fn) return res.status(400).json({ error: 'Unknown action.' });
  try {
    const out = await fn(body);
    return res.status(200).json({ ok: true, ...out });
  } catch (e) {
    console.error('[admin]', action, e && e.message);
    return res.status(e.status || 500).json({ error: String(e.message || 'Failed').slice(0, 300) });
  }
};
