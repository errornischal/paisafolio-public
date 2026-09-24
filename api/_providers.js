// AI providers: seven free tiers behind one interface. Model ids come from each
// provider's models endpoint via the admin page, since hard-coded ids keep being
// retired. Keys live in the ai_providers table, read server-side only.

const OPENAI_SHAPE = 'openai';
const GOOGLE_SHAPE = 'google';
const COHERE_SHAPE = 'cohere';

// `jobs`: chat = long context and reasoning; quick = lowest latency.
const PROVIDERS = {
  gemini: {
    label: 'Google Gemini',
    shape: GOOGLE_SHAPE,
    base: 'https://generativelanguage.googleapis.com/v1beta',
    console: 'https://aistudio.google.com/app/apikey',
    docs: 'https://ai.google.dev/gemini-api/docs',
    note: 'Largest free context. Best for the assistant reading a whole snapshot.',
    jobs: { chat: 100, quick: 40 },
    suggest: ['gemini-flash-latest', 'gemini-3.5-flash', 'gemini-3-flash-preview'],
  },
  groq: {
    label: 'Groq',
    shape: OPENAI_SHAPE,
    base: 'https://api.groq.com/openai/v1',
    console: 'https://console.groq.com/keys',
    docs: 'https://console.groq.com/docs/models',
    note: 'Fastest responses by a wide margin. Best for tagging as you type.',
    jobs: { chat: 70, quick: 100 },
    suggest: ['openai/gpt-oss-20b', 'openai/gpt-oss-120b'],
  },
  cerebras: {
    label: 'Cerebras',
    shape: OPENAI_SHAPE,
    base: 'https://api.cerebras.ai/v1',
    console: 'https://cloud.cerebras.ai/platform/',
    docs: 'https://inference-docs.cerebras.ai/',
    note: 'Also very fast. A good second pair of hands for quick jobs.',
    jobs: { chat: 60, quick: 90 },
    suggest: [],
  },
  mistral: {
    label: 'Mistral',
    shape: OPENAI_SHAPE,
    base: 'https://api.mistral.ai/v1',
    console: 'https://console.mistral.ai/api-keys/',
    docs: 'https://docs.mistral.ai/getting-started/models/models_overview/',
    note: 'Strong general text, good at languages other than English.',
    jobs: { chat: 80, quick: 70 },
    suggest: ['mistral-small-latest'],
  },
  openrouter: {
    label: 'OpenRouter',
    shape: OPENAI_SHAPE,
    base: 'https://openrouter.ai/api/v1',
    console: 'https://openrouter.ai/keys',
    docs: 'https://openrouter.ai/models?max_price=0',
    note: 'One key, many models. Free ones end in :free. Useful as a catch-all.',
    jobs: { chat: 50, quick: 50 },
    suggest: [],
    // OpenRouter asks callers to identify themselves.
    extraHeaders: (cfg) => ({
      // OpenRouter wants to know which site the request is for. Yours, not
      // the one this code happened to be written on: Vercel sets the project
      // URL at build time, and the admin page can override it per provider.
      'HTTP-Referer': cfg.referer
        || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL : 'http://localhost:3000'),
      'X-Title': 'Paisafolio',
    }),
  },
  together: {
    label: 'Together AI',
    shape: OPENAI_SHAPE,
    base: 'https://api.together.xyz/v1',
    console: 'https://api.together.ai/settings/api-keys',
    docs: 'https://docs.together.ai/docs/serverless-models',
    note: 'Signup credits rather than a standing free tier. Keep it last.',
    jobs: { chat: 40, quick: 40 },
    suggest: [],
  },
  cohere: {
    label: 'Cohere',
    shape: COHERE_SHAPE,
    base: 'https://api.cohere.com',
    console: 'https://dashboard.cohere.com/api-keys',
    docs: 'https://docs.cohere.com/v2/docs/models',
    note: 'Trial keys are rate limited but steady. Structured replies are its strength.',
    jobs: { chat: 45, quick: 60 },
    suggest: ['command-a-03-2025', 'command-r7b-12-2024'],
  },
};
const PROVIDER_IDS = Object.keys(PROVIDERS);

// Adapters: { system, turns, maxTokens, temperature } -> { text } or throw { status, retriable, message }.

function httpError(status, message) {
  const e = new Error(message || ('HTTP ' + status));
  e.status = status;
  // Gone, busy, rate limited or refused: try the next provider.
  e.retriable = status === 404 || status === 408 || status === 409 ||
    status === 429 || status === 401 || status === 403 || status >= 500;
  return e;
}

async function callOpenAIShape(pv, cfg, model, req, signal) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cfg.apiKey,
    ...(pv.extraHeaders ? pv.extraHeaders(cfg) : {}),
  };
  const messages = [];
  if (req.system) messages.push({ role: 'system', content: req.system });
  (req.turns || []).forEach((t) => {
    messages.push({ role: t.role === 'model' ? 'assistant' : 'user', content: t.text });
  });
  const res = await fetch(pv.base + '/chat/completions', {
    method: 'POST', headers, signal,
    body: JSON.stringify({
      model, messages,
      max_tokens: req.maxTokens || 1200,
      temperature: req.temperature == null ? 0.7 : req.temperature,
      stream: false,
    }),
  });
  if (!res.ok) {
    let detail = '';
    try { detail = (await res.text()).slice(0, 300); } catch { /* body already gone */ }
    throw httpError(res.status, detail);
  }
  const data = await res.json();
  const text = data && data.choices && data.choices[0] &&
    data.choices[0].message && data.choices[0].message.content;
  if (!text || !String(text).trim()) throw httpError(502, 'Empty reply');
  return { text: String(text).trim() };
}

async function callGoogleShape(pv, cfg, model, req, signal) {
  const contents = (req.turns || []).map((t) => ({
    role: t.role === 'model' ? 'model' : 'user',
    parts: [{ text: t.text }],
  }));
  const body = {
    contents,
    generationConfig: {
      temperature: req.temperature == null ? 0.7 : req.temperature,
      // Also covers the flash models' thinking tokens.
      maxOutputTokens: req.maxTokens || 1200,
    },
  };
  if (req.system) body.systemInstruction = { parts: [{ text: req.system }] };
  const url = pv.base + '/models/' + encodeURIComponent(model) + ':generateContent';
  const res = await fetch(url, {
    method: 'POST', signal,
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': cfg.apiKey },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let detail = '';
    try { detail = (await res.text()).slice(0, 300); } catch { /* body already gone */ }
    throw httpError(res.status, detail);
  }
  const data = await res.json();
  const cand = data && data.candidates && data.candidates[0];
  const parts = (cand && cand.content && cand.content.parts) || [];
  const text = parts.map((p) => p && p.text).filter(Boolean).join('').trim();
  // A truncated thinking budget returns no text; retry elsewhere.
  if (!text) throw httpError(502, 'Empty reply (' + ((cand && cand.finishReason) || 'no reason') + ')');
  return { text };
}

async function callCohereShape(pv, cfg, model, req, signal) {
  const messages = [];
  if (req.system) messages.push({ role: 'system', content: req.system });
  (req.turns || []).forEach((t) => {
    messages.push({ role: t.role === 'model' ? 'assistant' : 'user', content: t.text });
  });
  const res = await fetch(pv.base + '/v2/chat', {
    method: 'POST', signal,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'bearer ' + cfg.apiKey,
    },
    body: JSON.stringify({
      model, messages,
      max_tokens: req.maxTokens || 1200,
      temperature: req.temperature == null ? 0.7 : req.temperature,
    }),
  });
  if (!res.ok) {
    let detail = '';
    try { detail = (await res.text()).slice(0, 300); } catch { /* body already gone */ }
    throw httpError(res.status, detail);
  }
  const data = await res.json();
  // v2 returns message.content as a list of typed blocks.
  const blocks = (data && data.message && data.message.content) || [];
  const text = (Array.isArray(blocks) ? blocks : [blocks])
    .map((b) => (typeof b === 'string' ? b : b && b.text)).filter(Boolean).join('').trim();
  if (!text) throw httpError(502, 'Empty reply');
  return { text };
}

const SHAPES = {
  [OPENAI_SHAPE]: callOpenAIShape,
  [GOOGLE_SHAPE]: callGoogleShape,
  [COHERE_SHAPE]: callCohereShape,
};

async function callProvider(providerId, cfg, model, req, timeoutMs) {
  const pv = PROVIDERS[providerId];
  if (!pv) throw httpError(400, 'Unknown provider ' + providerId);
  if (!cfg || !cfg.apiKey) throw httpError(401, 'No API key for ' + providerId);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs || 20000);
  try {
    return await SHAPES[pv.shape](pv, cfg, model, req, ctrl.signal);
  } catch (e) {
    if (e && e.name === 'AbortError') throw httpError(408, 'Timed out');
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

// Asking a provider what it can actually run
async function listModels(providerId, cfg) {
  const pv = PROVIDERS[providerId];
  if (!pv) throw httpError(400, 'Unknown provider');
  if (!cfg || !cfg.apiKey) throw httpError(401, 'No API key');
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    let url, headers = {};
    if (pv.shape === GOOGLE_SHAPE) {
      url = pv.base + '/models';
      headers = { 'x-goog-api-key': cfg.apiKey };
    } else if (pv.shape === COHERE_SHAPE) {
      url = pv.base + '/v1/models?page_size=200';
      headers = { Authorization: 'bearer ' + cfg.apiKey };
    } else {
      url = pv.base + '/models';
      headers = { Authorization: 'Bearer ' + cfg.apiKey,
        ...(pv.extraHeaders ? pv.extraHeaders(cfg) : {}) };
    }
    const res = await fetch(url, { headers, signal: ctrl.signal });
    if (!res.ok) throw httpError(res.status, (await res.text()).slice(0, 200));
    const data = await res.json();
    return normaliseModels(providerId, pv, data);
  } finally {
    clearTimeout(timer);
  }
}

// Normalise every provider's list to { id, label, free, context }.
function normaliseModels(providerId, pv, data) {
  let raw = [];
  if (pv.shape === GOOGLE_SHAPE) raw = (data && data.models) || [];
  else if (pv.shape === COHERE_SHAPE) raw = (data && data.models) || [];
  else raw = (data && data.data) || [];
  const out = [];
  (Array.isArray(raw) ? raw : []).forEach((m) => {
    if (!m) return;
    let id = m.id || m.name || m.model;
    if (!id) return;
    id = String(id);
    // Google returns "models/<id>".
    if (pv.shape === GOOGLE_SHAPE) id = id.replace(/^models\//, '');
    const entry = { id, label: m.display_name || m.displayName || id };
    const ctx = m.context_length || m.context_window || m.inputTokenLimit ||
      (m.context_length_tokens) || null;
    if (ctx) entry.context = ctx;
    // Only mark free where the API says so.
    if (providerId === 'openrouter') {
      const pr = m.pricing || {};
      entry.free = /:free$/.test(id) ||
        (Number(pr.prompt) === 0 && Number(pr.completion) === 0);
    }
    if (pv.shape === GOOGLE_SHAPE) {
      const methods = m.supportedGenerationMethods || m.supported_generation_methods || [];
      // Embedding and image models cannot answer a chat request.
      if (methods.length && !methods.includes('generateContent')) return;
    }
    if (pv.shape === COHERE_SHAPE) {
      const eps = m.endpoints || [];
      if (eps.length && !eps.includes('chat')) return;
    }
    out.push(entry);
  });
  out.sort((a, b) => a.id.localeCompare(b.id));
  return out;
}

module.exports = { PROVIDERS, PROVIDER_IDS, callProvider, listModels, httpError };
