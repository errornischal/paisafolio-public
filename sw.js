// Paisafolio service worker, offline app shell + smart caching.
//
// Strategy: cache-first for self-hosted fonts, network-first for navigations +
// shell (so updates always flow), stale-while-revalidate for CDN libs,
// network-only for live APIs.
//
// ⚠️  BUMP `VERSION` ON EVERY DEPLOY so old caches are evicted.
//
// FIXES IN v4.3.0
//  • Shell matching was `SHELL_URLS.some(u => url.pathname.endsWith(u.replace('./','/')))`.
//    Because './' becomes '/', that test was `pathname.endsWith('/')`, true for
//    *any* directory-style URL on *any* origin. Google Fonts, CDN paths and
//    every third-party root got pulled into the network-first shell branch and
//    written into the shell cache. Now matched against an exact same-origin set.
//  • The worker intercepted cross-origin requests indiscriminately. It now only
//    handles same-origin plus an explicit CDN allowlist; everything else falls
//    through to the network untouched.
//  • Runtime cache had no bound and grew forever. Now trimmed to a max entry
//    count after each write.
//  • Added a real offline fallback for navigations when nothing is cached.
//
// CHANGES IN v4.8.0
//  • Poppins is self-hosted and precached, so the app keeps its typeface
//    offline and on networks that can't reach Google Fonts.
//  • /fonts/* is served cache-first instead of network-first.
//
// CHANGES IN v4.9.0
//  • Chart.js and supabase-js are vendored and precached too, so a blocked
//    cdn.jsdelivr.net no longer breaks charts or sign-in. No third-party
//    origin is fetched at runtime any more.
//
// CHANGES IN v5.0.0
//  • index.html's inline <style> and <script> now live in styles.css and
//    app.js. Both join the shell.
//
// CHANGES IN v5.1.0
//  • Version bump only, so a deploy evicts the previous shell. Nothing about
//    the caching strategy changed.

const VERSION = 'paisafolio-v5.43.0';
const SHELL = VERSION + '-shell';
const RUNTIME = VERSION + '-runtime';

// styles.css and app.js were extracted out of index.html; they are part of the
// shell and must be network-first like it, so a deploy always wins over cache.
const SHELL_PATHS = new Set([
  '/', '/index.html', '/styles.css', '/app.js', '/supabase.js', '/sb-config.js',
  '/admin.html', '/admin.js',
  '/manifest.webmanifest', '/icon.svg', '/icon-maskable.svg',
]);
// admin.html is network-first like the rest of the shell but deliberately NOT
// precached: it is a page almost nobody opens, and making every install
// download it on first run is the cost this file was split out to avoid.
const SHELL_URLS = ['./', './index.html', './styles.css', './app.js', './supabase.js', './sb-config.js', './manifest.webmanifest', './icon.svg', './icon-maskable.svg'];

// Self-hosted Poppins. These are part of the offline shell now: previously the
// typeface came from fonts.googleapis.com, so any launch without a working
// connection to Google rendered the whole app in the system sans-serif.
// Precached on install and served cache-first (the bytes never change for a
// given filename, so there is nothing to revalidate).
const FONT_URLS = [
  './fonts/poppins-400-latin.woff2', './fonts/poppins-400-latin-ext.woff2',
  './fonts/poppins-500-latin.woff2', './fonts/poppins-500-latin-ext.woff2',
  './fonts/poppins-600-latin.woff2', './fonts/poppins-600-latin-ext.woff2',
  './fonts/poppins-700-latin.woff2', './fonts/poppins-700-latin-ext.woff2',
  './fonts/poppins-800-latin.woff2', './fonts/poppins-800-latin-ext.woff2',
];

// Vendored libraries. Chart.js and supabase-js used to come from
// cdn.jsdelivr.net, which meant a blocked CDN took out charts and sign-in
// entirely. They are first-party files now, precached with the shell.
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
      // Fonts are added individually: one 404 in an addAll() batch rejects the
      // whole batch, which would leave the shell entirely uncached.
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

  // ── Fonts + vendored libs: cache-first ────────────────────────────────
  // Immutable content behind a stable filename. Going to the network first
  // would put a round trip in front of first paint on every single launch.
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

  // ── Navigations + app shell: network-first, fall back to cache ──────────
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

  // ── Everything else (fonts, CDN libs): stale-while-revalidate ──────────
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