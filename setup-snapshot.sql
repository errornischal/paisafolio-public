-- ═══════════════════════════════════════════════════════════════════════
-- PAISAFOLIO — turn on snapshots while the app is closed
-- ═══════════════════════════════════════════════════════════════════════
--
-- Run this ONCE, in the Supabase SQL Editor. It is separate from schema.sql
-- on purpose: schema.sql is safe to re-run any time, and this is not
-- something you want re-pointed at a different deployment by accident.
--
-- BEFORE YOU RUN IT
--   1. Supabase → Database → Extensions: enable `pg_cron` and `pg_net`
--   2. schema.sql has been re-run (so `valuation_recipes` exists)
--   3. Vercel → Settings → Environment Variables: CRON_SECRET is set to a
--      long random string, and the project has been REDEPLOYED since.
--      `openssl rand -hex 32` is a command that PRINTS a random string —
--      it is not the string. If you pasted those words in as the value,
--      go back and replace them, because that value is in this repo and
--      anyone reading it could run your snapshot job.
--      No terminal handy? Open your deployed site, press F12, and run
--      this in the Console:
--         [...crypto.getRandomValues(new Uint8Array(32))]
--           .map(b => b.toString(16).padStart(2,'0')).join('')
--      Copy what it prints. That is your CRON_SECRET.
--
-- THEN: fill in the two lines marked ← and run the whole file.
-- ═══════════════════════════════════════════════════════════════════════

create extension if not exists pg_cron;
create extension if not exists pg_net;

-- ── the two lines to fill in ───────────────────────────────────────────
-- Your deployed address, with /api/snapshot on the end. No trailing slash.
alter database postgres
  set app.snapshot_url = 'https://YOUR-APP.vercel.app/api/snapshot';   -- ←

-- The SAME value you put in Vercel as CRON_SECRET. Character for character.
alter database postgres
  set app.snapshot_secret = 'PASTE-YOUR-CRON-SECRET-HERE';             -- ←
-- ───────────────────────────────────────────────────────────────────────

-- Re-running this file replaces the old schedule rather than adding a
-- second one that would double every reading.
select cron.unschedule('paisafolio-snapshot')
  where exists (select 1 from cron.job where jobname = 'paisafolio-snapshot');

select cron.schedule(
  'paisafolio-snapshot',
  '0 */2 * * *',                        -- on the hour, every two hours, UTC
  $$
  select net.http_post(
    url     := current_setting('app.snapshot_url'),
    headers := jsonb_build_object(
                 'Content-Type',  'application/json',
                 'Authorization', 'Bearer ' || current_setting('app.snapshot_secret')),
    body    := '{}'::jsonb,
    timeout_milliseconds := 55000
  );
  $$
);

-- Nepal is UTC+05:45, so this lands at 05:45, 07:45, 09:45 and so on local
-- time. The app records into two-hour buckets of absolute time, so the two
-- interleave rather than fight: whichever writes a bucket last is the one
-- that stands.


-- ═══════════════════════════════════════════════════════════════════════
-- CHECKING IT
-- ═══════════════════════════════════════════════════════════════════════
--
-- Is it scheduled?
--   select jobid, jobname, schedule, active from cron.job;
--
-- Has it run, and did it work? (run this a couple of hours later)
--   select status, return_message, start_time
--     from cron.job_run_details
--    where jobname = 'paisafolio-snapshot'
--    order by start_time desc limit 10;
--
-- Did the app leave it anything to work with? One row per synced account.
-- If this is empty, open the app and let it sync once.
--   select user_id, base_ccy, jsonb_array_length(legs) as holdings, captured_at
--     from public.valuation_recipes;
--
-- Are readings actually landing? `src` is "cron" for the ones taken while
-- the app was closed.
--   select snapshot_date, net_worth, data->>'src' as written_by,
--          jsonb_array_length(data->'intraday') as readings_today
--     from public.networth_history
--    order by snapshot_date desc limit 5;
--
-- The app says the same thing in plainer words: Settings → Sync Center,
-- under WHILE THE APP IS CLOSED.
--
-- Don't want to wait two hours to know? Fire one run by hand from a
-- terminal (same secret):
--   curl -i -X POST https://YOUR-APP.vercel.app/api/snapshot \
--        -H "Authorization: Bearer YOUR-CRON-SECRET"
--   200 with {"ok":true,...}  → working
--   401                       → the secret here and in Vercel differ
--   503                       → CRON_SECRET missing in Vercel, or no redeploy
--
-- ═══════════════════════════════════════════════════════════════════════
-- TO STOP IT
--   select cron.unschedule('paisafolio-snapshot');
-- ═══════════════════════════════════════════════════════════════════════
