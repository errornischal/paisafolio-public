// Proxies coin images, which are blocked from Nepal. The host is matched exactly, redirects are not followed, and only image types are served.

const ALLOWED_HOST = 'coin-images.coingecko.com';
const TIMEOUT_MS = 8000;
const MAX_BYTES = 2 * 1024 * 1024; // 2 MB — coin icons are a few KB
const ALLOWED_TYPES = new Set([
  'image/png', 'image/jpeg', 'image/jpg', 'image/gif',
  'image/webp', 'image/svg+xml', 'image/avif',
]);

function one(v) { return Array.isArray(v) ? v[0] : v; }

export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    return res.status(204).end();
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const raw = one(req.query && req.query.url);
  if (!raw || typeof raw !== 'string') {
    return res.status(400).json({ error: 'Invalid image URL' });
  }

  // Parse properly rather than prefix-matching the string.
  let parsed;
  try {
    parsed = new URL(raw);
  } catch (_) {
    return res.status(400).json({ error: 'Invalid image URL' });
  }
  if (parsed.protocol !== 'https:' || parsed.hostname !== ALLOWED_HOST) {
    return res.status(400).json({ error: 'Invalid image URL' });
  }

  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const upstream = await fetch(parsed.toString(), {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Paisafolio/1.0)' },
      redirect: 'manual', // never chase a redirect off the allowed host
      signal: controller.signal,
    });

    if (upstream.status >= 300 && upstream.status < 400) {
      return res.status(502).json({ error: 'Upstream redirect refused' });
    }
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: 'Upstream error' });
    }

    const rawType = (upstream.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
    if (!ALLOWED_TYPES.has(rawType)) {
      return res.status(415).json({ error: 'Upstream did not return an image' });
    }

    const declared = Number(upstream.headers.get('content-length') || 0);
    if (declared && declared > MAX_BYTES) {
      return res.status(413).json({ error: 'Image too large' });
    }

    const buffer = Buffer.from(await upstream.arrayBuffer());
    if (buffer.length > MAX_BYTES) {
      return res.status(413).json({ error: 'Image too large' });
    }

    res.setHeader('Content-Type', rawType);
    res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
    res.setHeader('Access-Control-Allow-Origin', '*');
    // SVG icons can carry script; make sure nothing executes if one is served.
    res.setHeader('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'; sandbox");
    return res.status(200).send(buffer);
  } catch (e) {
    const msg = e.name === 'AbortError' ? 'Upstream timed out' : 'Upstream fetch failed';
    return res.status(502).json({ error: msg });
  } finally {
    clearTimeout(tid);
  }
}
