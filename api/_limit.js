// Per-client request limits, shared by every API route.
// Counts live in this instance's memory, so they cap bursts from one client rather
// than enforce a global quota across Vercel's instances.

const buckets = new Map();
const MAX_KEYS = 5000;

// Vercel sets x-real-ip / x-forwarded-for at its edge; the client cannot choose them.
function clientIp(req) {
  const h = req.headers || {};
  const real = String(h['x-real-ip'] || '').trim();
  if (real) return real;
  const fwd = String(h['x-forwarded-for'] || '').split(',')[0].trim();
  return fwd || (req.socket && req.socket.remoteAddress) || 'unknown';
}

function bucket(req, name, windowMs) {
  const now = Date.now();
  const key = name + '|' + clientIp(req);
  let b = buckets.get(key);
  if (!b || now - b.start >= windowMs) {
    b = { start: now, n: 0 };
    buckets.set(key, b);
  }
  if (buckets.size > MAX_KEYS) {
    for (const [k, v] of buckets) if (now - v.start >= windowMs) buckets.delete(k);
    if (buckets.size > MAX_KEYS) buckets.clear();
  }
  return b;
}

function refuse(res, b, max, windowMs) {
  if (b.n <= max) return false;
  res.setHeader('Retry-After', String(Math.max(1, Math.ceil((b.start + windowMs - Date.now()) / 1000))));
  res.status(429).json({ error: 'Too many requests. Try again in a minute.' });
  return true;
}

// Counts this request; true (with a 429 sent) once `max` is exceeded in the window.
function limited(req, res, name, max, windowMs = 60_000) {
  const b = bucket(req, name, windowMs);
  b.n += 1;
  return refuse(res, b, max, windowMs);
}

// For secrets: only failures count, and once over the limit every attempt is refused,
// right or wrong, so guessing gains nothing.
function blocked(req, res, name, max, windowMs = 60_000) {
  const b = bucket(req, name, windowMs);
  return refuse(res, b, max - 1, windowMs);
}
function failed(req, name, windowMs = 60_000) {
  bucket(req, name, windowMs).n += 1;
}

module.exports = { limited, blocked, failed, clientIp };
