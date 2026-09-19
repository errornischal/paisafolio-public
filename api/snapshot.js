// api/snapshot.js — Vercel Serverless Function, run on a schedule
//
// WHAT THIS IS FOR
// The app records net worth whenever prices refresh, which only happens while
// it is open. A day the app was never opened had no reading at all, so the
// chart ran a straight line across it and the Daily P&L calendar had nothing
// to show. This closes that gap: every two hours, with nobody looking, each
// account's holdings are re-priced and a reading is written.
//
// HOW IT VALUES A PORTFOLIO WITHOUT RE-IMPLEMENTING THE APP
// It does not know what a tola is, or how a savings account accrues, or which
// currency anybody keeps their books in — and it must not have to, because a
// second copy of that arithmetic would drift from the first and quietly draw
// a wrong chart.
//
// Instead the app leaves it a recipe (public.valuation_recipes, written on
// every sync). Each priced holding is one leg: the exact feed reading the app
// last used (`p`) and what that holding was worth at that reading (`v`). The
// job re-reads the same feed and scales:
//
//     new value = v x (new price / p)
//
// The ratio cancels every constant between the feed and the figure —
// quantity, unit conversion, the exchange rate into the base currency, the
// Nepali retail tola rate — so the answer is right without the job knowing
// any of them. A leg with no `k` has no live price behind it (a bank balance,
// land, a hand-typed price) and carries its value unchanged. `fixed` is
// everything the legs do not cover, which is mostly debts.
//
// The app corrects the day's row the moment it is next opened, so any drift
// in what the job cannot see (interest accruing, a holding sold on another
// device) lives at most until then.
//
// WHAT IT IS ALLOWED TO TOUCH
// The service role bypasses RLS, so this is the one thing in the project that
// reads rows belonging to somebody other than the caller. It reads exactly
// two tables — valuation_recipes, and its own last networth_history row — and
// neither holds a name, a note, a transaction or a category. It writes one
// row per user per day. It answers with counts and nothing else: no figure
// belonging to any account ever appears in the response.
//
// HOW TO RUN IT
// Set CRON_SECRET in the Vercel project, then have something call this every
// two hours with `Authorization: Bearer <that secret>`. The bottom of
// schema.sql has the pg_cron block that does it from Supabase, which is what
// this project uses — Vercel's own cron is limited to one run a day on the
// Hobby plan, and one a day is the problem, not the fix.

const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const SERVICE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
// Quotes around the value are the single most common way this is pasted
// wrong: a lot of people wrap an environment variable in them out of habit,
// and Vercel stores them as part of the value. Strip them here and on the way
// in, so a secret that is right apart from its punctuation still works.
function tidySecret(v) {
  return String(v || '').trim().replace(/^["']|["']$/g, '').trim();
}
const CRON_SECRET = tidySecret(process.env.CRON_SECRET);

// Which commit this deployment was built from, and when. It rides along on
// every refusal, because the first question when a call is refused is not
// "is the secret wrong" but "is this deployment even the one I just fixed".
// A stale deployment also carries a stale environment variable, so the two
// look identical from the outside: both say Unauthorized. Without this there
// is no way to tell them apart from a phone.
const BUILD = { commit: (process.env.VERCEL_GIT_COMMIT_SHA || '').slice(0, 7) || 'unknown' };

// A recipe older than this describes holdings that may be nothing like what
// is actually held now, and re-pricing it would draw a confident line about a
// portfolio that no longer exists. Open the app and it refreshes.
const RECIPE_MAX_AGE_DAYS = 21;
// Two hours, matching the buckets the app itself records into, so the two
// interleave instead of fighting over slots.
const SLOT_MS = 2 * 3600 * 1000;
const KEEP_MS = 48 * 3600 * 1000;
// One run should not be able to melt the upstream price feeds or run past the
// function timeout, so a run covers at most this many accounts. They are
// taken oldest-snapshot-first, so nobody is starved across runs.
const MAX_USERS = 400;
// A ratio outside this band is a feed glitch, not a market move: a price feed
// that answers 0, or answers in a different unit after an upstream change,
// would otherwise wipe out or multiply somebody's net worth. Legs outside it
// are left at their last known value.
const RATIO_MIN = 0.02;
const RATIO_MAX = 50;

function sbBase() { return SUPABASE_URL.replace(/\/+$/, ''); }
function configured() { return !!(SUPABASE_URL && SERVICE_KEY && CRON_SECRET); }

// Constant-time compare, so a wrong secret cannot be found a character at a
// time by timing the refusals.
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

// ── the price feeds ──────────────────────────────────────────────────────
// Read through this deployment's own /api routes rather than going upstream
// directly, so caching, fallbacks and the scraping defences in those files
// all apply here too, and there is one place that knows how to talk to each
// provider. They are called once per run, not once per user.
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

// Every leg names its feed, its instrument and the exact field the app read,
// as `coin:bitcoin:usd` or `nepse:NABIL:price`. Collect the instruments the
// recipes actually mention, ask for those, and build one lookup table.
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
    // Metals come from the same /api/metals overlay the app applies on top of
    // CoinGecko, and under the same ids the app files them under. These are
    // Nepali retail rates in NPR, which is a different number from the spot
    // price and the one a Nepali ledger is actually marked at.
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
      // A stale exchange feed is the ordinary state of it outside trading
      // hours: yesterday's close is the correct mark for a share right now,
      // so it is used, not skipped.
      for (const [sym, q] of Object.entries(d.prices)) {
        const px = q && Number(q.price);
        if (px > 0) prices['nepse:' + String(sym).toUpperCase() + ':price'] = px;
      }
    })());
  }

  await Promise.all(tasks);
  return prices;
}

// ── re-pricing one recipe ────────────────────────────────────────────────
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

// Fold a reading into the two-hourly ring the 1D view is drawn from. A run
// inside a bucket that already has a reading replaces it, exactly as the app
// does, so a bucket holds one value however many times it is written.
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

// Exported so the pure parts can be tested directly. Vercel only looks at
// the default export; this costs nothing at runtime.
export const __test = { revalue, foldIntraday, wantedInstruments, secretMatches };

export default async function handler(req, res) {
  // Nothing here is for a browser: no CORS headers, and the only caller that
  // can get past this line holds a secret that never leaves the server.
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!configured()) {
    const missing = [
      !SUPABASE_URL && 'SUPABASE_URL',
      !SERVICE_KEY && 'SUPABASE_SERVICE_ROLE_KEY',
      !CRON_SECRET && 'CRON_SECRET',
    ].filter(Boolean);
    return res.status(503).json({
      error: 'Not configured',
      missing,
      build: BUILD.commit,
      detail: 'Add ' + missing.join(' and ') + ' to the Vercel project (Production), then REDEPLOY. ' +
        'A new environment variable does not reach a deployment that is already running.',
    });
  }
  const auth = String(req.headers.authorization || '');
  const bearer = /^Bearer\s+(.+)$/i.exec(auth);
  if (!bearer || !secretMatches(bearer[1])) {
    // Say enough to find the mistake, and nothing else. Lengths and a short
    // hash prefix cannot be worked backwards into the secret, and between
    // them they name every ordinary cause: a character lost on the way
    // through a copy, a trailing space, a value that was never updated on
    // one of the two sides.
    const got = bearer ? tidySecret(bearer[1]) : '';
    const fp = async (v) => {
      if (!v) return '-';
      const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(v));
      return [...new Uint8Array(h)].slice(0, 3).map(b => b.toString(16).padStart(2, '0')).join('');
    };
    let hint;
    try {
      const [a, b] = await Promise.all([fp(CRON_SECRET), fp(got)]);
      hint = !bearer
        ? (auth
            ? 'An Authorization header arrived but does not start with "Bearer ". It must read exactly: Bearer <your secret>'
            : 'No Authorization header arrived. `got` lists the header names that did, so you can see whether it was '
              + 'dropped on the way or never sent. A redirect between the address you called and this function will '
              + 'drop it; call the deployment directly, with no trailing slash.')
        : got.length !== CRON_SECRET.length
          ? 'Length differs: this deployment holds ' + CRON_SECRET.length +
            ' characters, you sent ' + got.length + '. Check for a missing character or a trailing space.'
          : 'Same length, different value. This deployment holds a secret starting ' + a +
            '…; you sent one starting ' + b + '… (first bytes of their hashes, not the secrets). ' +
            'Update CRON_SECRET in Vercel and redeploy, or use the value this deployment already has.';
    } catch (e) {
      hint = 'Secret does not match the one this deployment was built with.';
    }
    // Header NAMES only, never their values: enough to tell "it never left"
    // from "something ate it in transit", which are different problems with
    // different fixes, and nothing that is worth keeping secret.
    const arrived = Object.keys(req.headers || {}).sort().slice(0, 40);
    return res.status(401).json({ error: 'Unauthorized', hint, got: arrived, build: BUILD.commit });
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
    // Asked and got nothing back: writing a reading now would record "nothing
    // moved" as a fact when the truth is that nobody could see. Skip the run;
    // the next one is two hours away and the app corrects the day when it
    // opens. Asking for nothing is a different thing entirely - a portfolio
    // of bank balances and land has no feed behind it and never did, and it
    // still deserves its reading.
    if (asked && !feedsUp) {
      return res.status(200).json({ ok: false, reason: 'no price feed answered', users: recipes.length, written: 0, ms: Date.now() - started });
    }

    const today = ymd(new Date(started));
    // One read of today's rows for everybody, so the intraday ring can be
    // extended rather than replaced.
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
