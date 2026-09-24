// Network-first for the app shell, cache-first for fonts, network-only for live APIs. Bump VERSION on every deploy.

const VERSION = 'paisafolio-v5.65.0';
const SHELL = VERSION + '-shell';
const RUNTIME = VERSION + '-runtime';

// Network-first so a deploy always wins over the cache.
const SHELL_PATHS = new Set([
  '/', '/index.html', '/styles.css', '/app.js', '/supabase.js', '/sb-config.js',
  '/admin.html', '/admin.js',
  '/manifest.webmanifest', '/icon.svg', '/icon-maskable.svg',
]);
// Network-first like the shell, but not precached: almost nobody opens it.
const SHELL_URLS = ['./', './index.html', './styles.css', './app.js', './supabase.js', './sb-config.js', './manifest.webmanifest', './icon.svg', './icon-maskable.svg'];

// Self-hosted, precached and served cache-first: the bytes never change for a given filename.
const FONT_URLS = [
  './fonts/poppins-400-latin.woff2', './fonts/poppins-400-latin-ext.woff2',
  './fonts/poppins-500-latin.woff2', './fonts/poppins-500-latin-ext.woff2',
  './fonts/poppins-600-latin.woff2', './fonts/poppins-600-latin-ext.woff2',
  './fonts/poppins-700-latin.woff2', './fonts/poppins-700-latin-ext.woff2',
  './fonts/poppins-800-latin.woff2', './fonts/poppins-800-latin-ext.woff2',
];

// Vendored so a blocked CDN cannot take out charts or sign-in.
const VENDOR_URLS = ['./vendor/chart.umd.js', './vendor/supabase-js.umd.js'];

// No third-party origins left to cache, every runtime dependency is ours.
const CDN_ORIGINS = new Set();

// Live data, never cached, always straight to network.
const API_HOSTS = new Set(['api.coingecko.com', 'open.er-api.com', 'coin-images.coingecko.com', 'api.gold-api.com']);
const SKIP_HINTS = ['hot-update', 'sockjs-node', '__webpack'];

const RUNTIME_MAX_ENTRIES = 60;

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(SHELL)
      // One by one: a single 404 in addAll() would reject the whole batch.
      .then((c) => Promise.all([
        c.addAll(SHELL_URLS).catch(() => {}),
        ...FONT_URLS.map((u) => c.add(u).catch(() => {})),
        ...VENDOR_URLS.map((u) => c.add(u).catch(() => {})),
      ]))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window', includeUncontrolled: true }))
      .then((clients) => {
        clients.forEach((client) => client.postMessage({ type: 'SW_UPDATED', version: VERSION }));
      })
  );
});

self.addEventListener('message', (e) => {
  if (e.data === 'skipWaiting' || (e.data && e.data.type === 'SKIP_WAITING')) self.skipWaiting();
});

// Keep a cache from growing without bound. Caches are FIFO by insertion order.
async function trimCache(cacheName, maxEntries) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length <= maxEntries) return;
    await Promise.all(keys.slice(0, keys.length - maxEntries).map((k) => cache.delete(k)));
  } catch (_) { /* cache API unavailable, nothing to trim */ }
}

const OFFLINE_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Paisafolio, Offline</title>
<style>
  :root{color-scheme:dark}
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0e0e0e;color:#e8e8e8;
       font:400 15px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:24px;text-align:center}
  .w{max-width:340px}
  h1{font-size:19px;font-weight:700;margin:0 0 8px}
  p{color:#9a9a9a;font-size:13.5px;margin:0 0 20px}
  button{background:#f5a623;color:#151515;border:0;border-radius:12px;padding:12px 22px;
         font-size:14px;font-weight:700;cursor:pointer;font-family:inherit}
  .d{width:44px;height:44px;border-radius:50%;background:rgba(245,166,35,.12);
     display:grid;place-items:center;margin:0 auto 16px;font-size:20px}
</style></head><body><div class="w">
<div class="d">&#9888;</div>
<h1>You're offline</h1>
<p>Paisafolio couldn't load because there's no connection and nothing cached yet. Your saved data is safe on this device.</p>
<button onclick="location.reload()">Try again</button>
</div></body></html>`;

function offlineResponse() {
  return new Response(OFFLINE_HTML, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
  if (SKIP_HINTS.some((h) => url.href.includes(h))) return;

  const sameOrigin = url.origin === self.location.origin;

  // Live data APIs and our own /api/* proxies, always network, never cached.
  if (API_HOSTS.has(url.hostname) || (sameOrigin && url.pathname.startsWith('/api/'))) return;

  // Supabase traffic must never be intercepted (auth tokens, realtime sockets).
  if (url.hostname.endsWith('.supabase.co')) return;

  // Anything not same-origin and not on the CDN allowlist: leave alone.
  if (!sameOrigin && !CDN_ORIGINS.has(url.origin)) return;

  // Fonts + vendored libs: cache-first
  if (sameOrigin && (url.pathname.startsWith('/fonts/') || url.pathname.startsWith('/vendor/'))) {
    e.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(SHELL).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      }))
    );
    return;
  }

  // Navigations + app shell: network-first, fall back to cache
  const isShell = sameOrigin && SHELL_PATHS.has(url.pathname);
  if (req.mode === 'navigate' || isShell) {
    e.respondWith(
      fetch(req, { cache: 'no-store' })
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(SHELL).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() =>
          caches.match(req)
            .then((r) => r || caches.match('./index.html'))
            .then((r) => r || caches.match('./'))
            .then((r) => r || (req.mode === 'navigate' ? offlineResponse() : Response.error()))
        )
    );
    return;
  }

  // Everything else (fonts, CDN libs): stale-while-revalidate
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req).then((res) => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(RUNTIME)
            .then((c) => c.put(req, copy))
            .then(() => trimCache(RUNTIME, RUNTIME_MAX_ENTRIES))
            .catch(() => {});
        }
        return res;
      }).catch(() => cached || Response.error());
      return cached || network;
    })
  );
});