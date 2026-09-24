// Scheduled job: every two hours, re-price each account from the recipe the app left
// (public.valuation_recipes) and write a net-worth reading, so days the app
// was closed still have data.
// 
// Each leg stores the feed price the app used (p) and the holding's value then (v);
// new value = v × newPrice / p, which cancels quantity, units and FX without
// re-implementing them. Legs without a feed, and `fixed` (mostly debts), carry over.
// 
// Uses the service role, reads only valuation_recipes and networth_history, and
// responds with counts only. Called by pg_cron with `Authorization: Bearer CRON_SECRET`
// (see setup-snapshot.sql); Vercel Hobby cron is limited to once a day.

import limit from './_limit.js';

const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const SERVICE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
// Vercel keeps pasted quotes as part of the value; strip them on both sides.
function tidySecret(v) {
  return String(v || '').trim().replace(/^["']|["']$/g, '').trim();
}
const CRON_SECRET = tidySecret(process.env.CRON_SECRET);

// Older recipes may describe holdings that no longer exist.
const RECIPE_MAX_AGE_DAYS = 21;
// Same two-hour buckets the app records into.
const SLOT_MS = 2 * 3600 * 1000;
const KEEP_MS = 48 * 3600 * 1000;
// Caps a run to protect the feeds and the timeout; oldest first, so nobody starves.
const MAX_USERS = 400;
// Outside this band is a feed glitch, not a market move; keep the last value.
const RATIO_MIN = 0.02;
const RATIO_MAX = 50;

function sbBase() { return SUPABASE_URL.replace(/\/+$/, ''); }
function configured() { return !!(SUPABASE_URL && SERVICE_KEY && CRON_SECRET); }

// Constant-time, so the secret cannot be found by timing.
function secretMatches(given) {
  const a = Buffer.from(tidySecret(given), 'utf8');
  const b = Buffer.from(CRON_SECRET, 'utf8');
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function sbFetch(path, init) {
  const res = await fetch(sbBase() + '/rest/v1/' + path, {
    ...init,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: 'Bearer ' + SERVICE_KEY,
      'Content-Type': 'application/json',
      ...(init && init.headers),
    },
  });
  const text = await res.text();
  let body = null;
  try { body = text ? JSON.parse(text) : null; } catch (e) { body = null; }
  if (!res.ok) {
    const err = new Error('supabase ' + res.status + ': ' + String(text).slice(0, 200));
    err.status = res.status;
    throw err;
  }
  return body;
}

// Prices come through this deployment's own /api routes, so their caching and fallbacks apply.
function selfOrigin(req) {
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim();
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0].trim();
  return host ? proto + '://' + host : '';
}

async function getJSON(url, ms) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms || 12000);
  try {
    const res = await fetch(url, { signal: ctl.signal, headers: { Accept: 'application/json' } });
    if (!res.ok) return null;
    const ct = String(res.headers.get('content-type') || '');
    if (!/json/i.test(ct)) return null;
    return await res.json();
  } catch (e) {
    return null;
  } finally {
    clearTimeout(t);
  }
}

// Legs name their feed as `coin:bitcoin:usd` or `nepse:NABIL:price`; fetch only those.
function wantedInstruments(recipes) {
  const coins = new Set(), nepse = new Set();
  for (const r of recipes) {
    for (const leg of (Array.isArray(r.legs) ? r.legs : [])) {
      if (!leg || typeof leg.k !== 'string') continue;
      const parts = leg.k.split(':');
      if (parts.length !== 3) continue;
      if (parts[0] === 'coin' && /^[a-z0-9-]{1,64}$/i.test(parts[1])) coins.add(parts[1]);
      else if (parts[0] === 'nepse' && /^[A-Z0-9.*-]{1,20}$/i.test(parts[1])) nepse.add(parts[1].toUpperCase());
    }
  }
  return { coins: [...coins], nepse: [...nepse] };
}

async function readFeeds(origin, want) {
  const prices = Object.create(null);   // 'coin:bitcoin:usd' -> number
  const tasks = [];

  if (want.coins.length) {
    tasks.push((async () => {
      const d = await getJSON(origin + '/api/crypto?action=prices&ids=' + encodeURIComponent(want.coins.join(',')), 15000);
      if (!d || typeof d !== 'object') return;
      for (const [id, v] of Object.entries(d)) {
        if (v && typeof v.usd === 'number' && v.usd > 0) prices['coin:' + id + ':usd'] = v.usd;
      }
    })());
    // Nepali retail metal rates in NPR, under the ids the app uses.
    tasks.push((async () => {
      const d = await getJSON(origin + '/api/metals', 15000);
      if (!d || typeof d !== 'object') return;
      const put = (ids, tola, gram) => {
        for (const id of ids) {
          if (Number(tola) > 0) prices['coin:' + id + ':nepalTolaNpr'] = Number(tola);
          if (Number(gram) > 0) prices['coin:' + id + ':nepalGramNpr'] = Number(gram);
        }
      };
      put(['tether-gold', 'kinesis-gold'], d.gold_tola_npr, d.gold_gram_npr);
      put(['silver', 'kinesis-silver'], d.silver_tola_npr, d.silver_gram_npr);
      put(['platinum'], d.platinum_tola_npr, d.platinum_gram_npr);
    })());
  }

  if (want.nepse.length) {
    tasks.push((async () => {
      const d = await getJSON(origin + '/api/nepse', 20000);
      if (!d || !d.prices || typeof d.prices !== 'object') return;
      // Outside trading hours yesterday's close is the right mark.
      for (const [sym, q] of Object.entries(d.prices)) {
        const px = q && Number(q.price);
        if (px > 0) prices['nepse:' + String(sym).toUpperCase() + ':price'] = px;
      }
    })());
  }

  await Promise.all(tasks);
  return prices;
}

// re-pricing one recipe
function revalue(recipe, prices) {
  const legs = Array.isArray(recipe.legs) ? recipe.legs : [];
  const assets = Object.create(null);
  let total = 0, moved = 0, priced = 0;

  for (const leg of legs) {
    if (!leg || typeof leg !== 'object') continue;
    const was = Number(leg.v);
    if (!Number.isFinite(was)) continue;
    let now = was;
    if (typeof leg.k === 'string') {
      const then = Number(leg.p);
      const px = prices[leg.k];
      if (Number.isFinite(then) && then > 0 && Number.isFinite(px) && px > 0) {
        const ratio = px / then;
        if (ratio >= RATIO_MIN && ratio <= RATIO_MAX) {
          now = was * ratio;
          priced++;
          if (ratio !== 1) moved++;
        }
      }
    }
    total += now;
    if (leg.id) assets[leg.id] = Math.round(now);
  }

  const fixed = Number(recipe.fixed);
  const netWorth = total + (Number.isFinite(fixed) ? fixed : 0);
  return { netWorth: Math.round(netWorth), assets, moved, priced, legs: legs.length };
}

// One value per two-hour bucket, like the app.
function foldIntraday(existing, now, value) {
  const slot = Math.floor(now / SLOT_MS) * SLOT_MS;
  const floor = now - KEEP_MS;
  const out = [];
  let seen = false;
  for (const x of (Array.isArray(existing) ? existing : [])) {
    const t = x && Number(x.t);
    if (!Number.isFinite(t) || t < floor) continue;
    if (t === slot) { out.push({ t, v: value }); seen = true; }
    else out.push({ t, v: Number(x.v) || 0 });
  }
  if (!seen) out.push({ t: slot, v: value });
  out.sort((a, b) => a.t - b.t);
  return out;
}

function ymd(d) {
  return d.getUTCFullYear() + '-' +
    String(d.getUTCMonth() + 1).padStart(2, '0') + '-' +
    String(d.getUTCDate()).padStart(2, '0');
}

// For tests only; Vercel uses the default export.
export const __test = { revalue, foldIntraday, wantedInstruments, secretMatches };

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (limit.blocked(req, res, 'snapshot-auth', 10)) return;
  if (!configured()) return res.status(503).json({ error: 'Not configured' });
  const auth = String(req.headers.authorization || '');
  const bearer = /^Bearer\s+(.+)$/i.exec(auth);
  if (!bearer || !secretMatches(bearer[1])) {
    limit.failed(req, 'snapshot-auth');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const started = Date.now();
  try {
    const cutoff = new Date(started - RECIPE_MAX_AGE_DAYS * 86400000).toISOString();
    const recipes = await sbFetch(
      'valuation_recipes?select=user_id,base_ccy,net_worth,fixed,legs,captured_at' +
      '&captured_at=gte.' + encodeURIComponent(cutoff) +
      '&order=captured_at.desc&limit=' + MAX_USERS);

    if (!Array.isArray(recipes) || !recipes.length) {
      return res.status(200).json({ ok: true, users: 0, written: 0, ms: Date.now() - started });
    }

    const origin = selfOrigin(req);
    if (!origin) return res.status(500).json({ error: 'Cannot determine own origin' });
    const want = wantedInstruments(recipes);
    const asked = want.coins.length + want.nepse.length;
    const prices = await readFeeds(origin, want);
    const feedsUp = Object.keys(prices).length;
    // Feeds were asked and none answered: skip rather than record "nothing moved".
    // Asking for nothing (bank balances, land) still gets a reading.
    if (asked && !feedsUp) {
      return res.status(200).json({ ok: false, reason: 'no price feed answered', users: recipes.length, written: 0, ms: Date.now() - started });
    }

    const today = ymd(new Date(started));
    // Today's rows for everyone in one read, so the intraday ring is extended.
    const ids = recipes.map(r => r.user_id).filter(Boolean);
    let existing = [];
    if (ids.length) {
      existing = await sbFetch('networth_history?select=user_id,data&snapshot_date=eq.' + today +
        '&user_id=in.(' + ids.map(encodeURIComponent).join(',') + ')') || [];
    }
    const priorById = Object.create(null);
    for (const row of existing) priorById[row.user_id] = (row.data && row.data.intraday) || [];

    const rows = [];
    let moved = 0;
    for (const r of recipes) {
      if (!r || !r.user_id) continue;
      const v = revalue(r, prices);
      if (!Number.isFinite(v.netWorth)) continue;
      if (v.moved) moved++;
      rows.push({
        user_id: r.user_id,
        snapshot_date: today,
        net_worth: v.netWorth,
        data: {
          assets: v.assets,
          intraday: foldIntraday(priorById[r.user_id], started, v.netWorth),
          src: 'cron',
          at: new Date(started).toISOString(),
        },
      });
    }

    let written = 0;
    // Chunked so one oversized request cannot fail the whole run.
    for (let i = 0; i < rows.length; i += 100) {
      const chunk = rows.slice(i, i + 100);
      await sbFetch('networth_history?on_conflict=user_id,snapshot_date', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify(chunk),
      });
      written += chunk.length;
    }

    // Counts only. Nothing here identifies an account or names a figure.
    return res.status(200).json({
      ok: true,
      users: recipes.length,
      written,
      movedFor: moved,
      feeds: feedsUp,
      date: today,
      ms: Date.now() - started,
    });
  } catch (e) {
    console.error('[snapshot]', e && e.message);
    return res.status(500).json({ error: 'Snapshot run failed' });
  }
}
