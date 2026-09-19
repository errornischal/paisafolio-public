# Paisafolio

A personal finance tracker that keeps everything on your device by default.
Net worth, crypto, shares, gold, property, bank balances, debts, goals,
recurring investments and month-by-month spending, in one place.

Vanilla JavaScript. No build step, no framework, no bundler. Clone it, serve
the folder, and it runs.

---

## Table of contents

- [Try it in 30 seconds](#try-it-in-30-seconds)
- [What you get without setting anything up](#what-you-get-without-setting-anything-up)
- [Setup](#setup)
  - [1. Deploy it](#1-deploy-it)
  - [2. Accounts and sync (optional)](#2-accounts-and-sync-optional)
  - [3. Snapshots while the app is closed (optional)](#3-snapshots-while-the-app-is-closed-optional)
  - [4. The assistant (optional)](#4-the-assistant-optional)
  - [5. Make yourself admin (optional)](#5-make-yourself-admin-optional)
  - [6. Nepal share prices (optional)](#6-nepal-share-prices-optional)
- [How the pieces fit](#how-the-pieces-fit)
- [Where your data actually lives](#where-your-data-actually-lives)
- [What is safe to put in which file](#what-is-safe-to-put-in-which-file)
- [Troubleshooting](#troubleshooting)
- [Licence](#licence)

---

## Try it in 30 seconds

```bash
git clone <your fork> paisafolio
cd paisafolio
python3 -m http.server 8080
```

Open <http://localhost:8080>. That is the whole thing working.

It has to be served over http, not opened as a `file://` path. Service
workers and modules do not run from the filesystem.

---

## What you get without setting anything up

Everything except the four things that need a server:

| Works immediately | Needs setup |
| --- | --- |
| Every page, every feature | Signing in |
| Assets, debts, goals, spending, habits | Syncing between devices |
| Budgets, reports, net worth history | The assistant |
| Live crypto, metal and currency prices | Nepal share prices |
| Import and export your data as JSON | The admin page |
| Installing it as an app (PWA, offline) | |

The app is local-first on purpose. Sync is something you turn on, not
something you have to arrange before you can use it.

---

## Setup

Each step is independent. Do the ones you want.

### 1. Deploy it

Any static host works. Vercel is the path of least resistance because the
four functions in `api/` (prices, metal rates, coin images, the assistant)
run there with no configuration.

1. Push your fork to GitHub
2. [vercel.com/new](https://vercel.com/new) → import the repository
3. Framework preset: **Other**. No build command, no output directory.
   `vercel.json` already says so.
4. Deploy

On a host with no serverless functions, the app still runs; the `api/` routes
just do not answer, so live crypto and metal prices fall back to the last
values seen and the assistant stays off.

### 2. Accounts and sync (optional)

This is what lets you sign in and have the same data on your phone and your
laptop. It needs a Supabase project, which is free.

1. Create a project at [supabase.com](https://supabase.com)
2. Open **SQL Editor → New query**, paste the whole of [`schema.sql`](schema.sql),
   run it. It builds every table, every row level security policy, and the
   triggers. It is idempotent, so running it again later is safe and is how
   you pick up schema changes.
3. **Settings → API**, copy two values into [`sb-config.js`](sb-config.js):

   ```js
   window.SB_URL  = 'https://your-project.supabase.co';  // Project URL
   window.SB_ANON = 'eyJhbGciOi...';                     // anon / public key
   ```

4. **Authentication → URL Configuration**: set **Site URL** to your deployed
   address, and add it under **Redirect URLs** too. Without this, the
   confirmation and password-reset links land on the wrong place.
5. Commit `sb-config.js` and redeploy.

Optional, under **Authentication → Sign In / Providers → Email**: turn
**Confirm email** off and new accounts work immediately, with the app showing
an unverified-email warning until the link is clicked. Leave it on and an
account cannot be used until the link is clicked. The app handles both.

### 3. Snapshots while the app is closed (optional)

A reading of your net worth is taken whenever prices refresh, and prices only
refresh while the app is open. On its own that means a day you never opened it
has no reading at all: the chart draws a straight line across it and the Daily
P&L calendar has nothing for it.

[`api/snapshot.js`](api/snapshot.js) closes that gap. Every two hours it
re-prices every account and writes a reading, with nobody looking.

It does not carry a second copy of how a holding is valued — that would drift
from the first and quietly draw a wrong chart. The app leaves it a recipe in
`valuation_recipes` on every sync: per holding, the exact price-feed reading
the app last used and what that holding was worth at that reading. The job
re-reads the same feed and scales by `newPrice / oldPrice`, and that ratio
cancels quantity, unit conversion, the rate into your base currency and the
Nepali retail tola rate all at once. Anything with no live price behind it — a
bank balance, land, a hand-typed price — carries its value unchanged.

1. Supabase, **Database → Extensions**: enable `pg_cron` and `pg_net`
2. Re-run [`schema.sql`](schema.sql) so `valuation_recipes` exists
3. Vercel, **Settings → Environment Variables**: add `CRON_SECRET`, a long
   random string (`openssl rand -hex 32`), apply to Production, redeploy
4. Open `setup-snapshot.sql`, fill in the two lines marked `←` (your
   deployment URL and that same secret) and run it in the Supabase SQL editor

The Sync Center then says whether readings are actually being taken, so a
setup that silently does nothing shows up there rather than as a flat line
weeks later.

Vercel's own cron is not used: on the Hobby plan it runs at most once a day,
and once a day is the problem rather than the fix. The schedule lives in
Postgres instead, which is free and runs as often as you like.

`/api/snapshot` sends no CORS headers and is not reachable from the app.
`CRON_SECRET` is the only thing that may run it; without one the route answers
503 and never touches the database. It reads two tables — the recipes, and its
own last row per user — neither of which holds a name, a note, a transaction
or a category, and it answers with counts only.

### 4. The assistant (optional)

The Assistant button is disabled until at least one AI provider has a key.
Keys go in environment variables, never in the app files. See
[`.env.example`](.env.example) for the full list and where each one comes
from; all of them have a free tier.

The shortest version: get a key from
[Google AI Studio](https://aistudio.google.com/apikey), add it on Vercel as
`GEMINI_API_KEY` under **Settings → Environment Variables** for Production and
Preview, redeploy.

Add more than one provider and requests are spread across them, weighted by
how well each one suits the job, so hitting a free-tier limit on one does not
take the feature down.

The assistant also does the category-picking on the spending page. Without a
key that still works, using an offline keyword table instead, and the category
field becomes a dropdown you choose from.

### 5. Make yourself admin (optional)

The admin page at `/admin.html` manages AI providers and their keys, lists
users, and shows what is in the database. It is not linked from anywhere and
is invisible to normal accounts.

1. Sign in to your deployed app once, so the account exists
2. Supabase → **SQL Editor**, with your own address:

   ```sql
   update public.profiles set role = 'admin' where email = 'you@example.com';
   ```

3. For it to do anything, the server needs `SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY` set as environment variables
   (**Settings → API → service_role**). That key bypasses row level security,
   so it belongs in an environment variable and nowhere else, ever.
4. Reload. A row appears at the bottom of Settings.

### 6. Nepal share prices (optional)

Only if you track NEPSE-listed shares. Set `NEPSE_API_URL` or
`NEPSE_SCRAPE_URL` to a source you have access to. Without them you type
those prices in yourself; crypto, metals and currencies need nothing.

---

## How the pieces fit

```
index.html ─┬─ sb-config.js     your Supabase URL + anon key
            ├─ supabase.js      auth, sync, offline cache
            ├─ app.js           the entire app
            └─ styles.css

admin.html ─┬─ sb-config.js     same two values
            └─ admin.js         standalone, never loads app.js

api/  ai.js        the assistant + category picking
      admin.js     admin actions, service_role only
      crypto.js    CoinGecko proxy
      metals.js    gold and silver
      nepse.js     Nepal share prices
      coinimage.js coin logos

schema.sql         the whole database, idempotent
sw.js              service worker, offline shell
```

No build step anywhere. What is in the repository is what runs.

---

## Where your data actually lives

- **Always**: your browser's `localStorage`, under `paisafolio_local`. This is
  the real copy. Clearing site data clears it, so use **Settings → Export** to
  keep a backup.
- **Signed in**: also in your Supabase project, in tables only you can read.
  Row level security is enforced per row against your user id, and `schema.sql`
  turns it on for every table with no exceptions and no admin backdoor.
- **Never**: anywhere else. There is no telemetry, no analytics, and no third
  party in the middle. The only outbound calls are price feeds, and the
  assistant when you use it.

---

## What is safe to put in which file

| Value | Where | Why |
| --- | --- | --- |
| Supabase URL | `sb-config.js` | Public; the browser has to know where to connect |
| Supabase **anon** key | `sb-config.js` | Public by design; row level security is the protection |
| Supabase **service_role** key | environment variable | Bypasses row level security. Treat it like a password |
| AI provider keys | environment variable, or the admin page | Would be readable in the page otherwise |

If it ends up in a file the browser downloads, assume everyone can read it.
Anything in `sb-config.js` is in that category, which is why only those two
values are there.

---

## Troubleshooting

**"This copy has no Supabase project connected yet"** when you tap Sign In.
Expected until step 2 is done. Everything is being saved on the device.

**Sign-in does nothing, or the confirmation link goes somewhere odd.**
Supabase → **Authentication → URL Configuration**. Site URL and Redirect URLs
have to match where the app is actually served from.

**The assistant says it is not configured.** No provider key is reaching the
server. On Vercel, check the variable is applied to the right environment and
that you redeployed after adding it.

**The admin page says "Not for this account".** The `profiles` row for that
account does not say `admin`. Re-run the update in step 4, and check the email
matches exactly.

**Prices are not updating.** The `api/` routes need a host that runs
serverless functions. On a plain static host they will not answer, and prices
fall back to the last values seen.

**A change did not show up after deploying.** The service worker caches the
shell. Bump `VERSION` in `sw.js`, or hard-reload.

---

## Licence

[MIT](LICENSE). Use it, change it, run it, sell it; keep the copyright notice.
