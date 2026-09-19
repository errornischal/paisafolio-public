-- ═══════════════════════════════════════════════════════════════════════
-- PAISAFOLIO — snapshots while the app is closed
--
-- Everything here is done from a phone, in the Supabase SQL editor, except
-- one paste into Vercel. Run the numbered steps in order. Each step is one
-- paste: select it, paste it into a new query, press Run, read what comes
-- back, then move to the next.
--
-- If a step errors, stop there and fix that step. Later steps depend on it.
-- ═══════════════════════════════════════════════════════════════════════


-- ═══ STEP 1 ════════════════════════════════════════════════════════════
-- Make a secret. Run this and copy the 64 characters it prints.
--
-- Keep it to yourself. If it ever gets read out loud, pasted into a chat,
-- or committed anywhere, run this again and use the new one: whoever has
-- it can run your snapshot job.

create extension if not exists pgcrypto;
select encode(gen_random_bytes(32), 'hex') as your_cron_secret;


-- ═══ STEP 2 ════════════════════════════════════════════════════════════
-- Not SQL. In Vercel (the app or vercel.com):
--
--   your project → Settings → Environment Variables
--     Name:          CRON_SECRET
--     Value:         the 64 characters from step 1
--     Environments:  Production
--   Save.
--
--   Then: Deployments → the newest one → the ⋯ menu → Redeploy.
--
-- The redeploy is not optional. A new environment variable does not reach
-- the deployment that is already running, so without it every call comes
-- back 503 no matter what else is correct.


-- ═══ STEP 3 ════════════════════════════════════════════════════════════
-- Prove it works, before scheduling anything.
--
-- Change the two lines marked ← to YOUR values, then run the whole block.
--   • the address is your site with /api/snapshot on the end
--   • the secret is the same 64 characters you just saved in Vercel

create extension if not exists pg_net;

select net.http_post(
  url     := 'https://YOUR-APP.vercel.app/api/snapshot',                -- ← change
  headers := jsonb_build_object(
               'Content-Type',  'application/json',
               'Authorization', 'Bearer PASTE-THE-64-CHARACTERS-HERE'), -- ← change
  body    := '{}'::jsonb,
  timeout_milliseconds := 55000
) as request_id;

-- It answers instantly with a number. That number is not the result — it
-- only means "the request has been sent". Count to ten, then run this in a
-- new query to see what actually came back:

select status_code, content
  from net._http_response
 order by created desc
 limit 3;

-- WHAT YOU WILL SEE
--
--   200  {"ok":true,"users":1,"written":1,...}
--        Working. Go to step 4.
--
--   200  {"ok":true,"users":0,"written":0,...}
--        Reachable and the secret is right, but the app has never left it
--        anything to re-price. Open Paisafolio, wait for it to sync, then
--        run step 3 again. Once `users` is 1, go to step 4.
--
--   401  {"error":"Unauthorized"}
--        The secret above and the one in Vercel are not identical. A
--        trailing space or one missing character is enough. Copy both
--        again carefully.
--
--   503  {"error":"Not configured"}
--        CRON_SECRET is missing in Vercel, or you have not redeployed
--        since adding it. Do step 2 again, including the redeploy.
--
--   404 / an HTML page
--        The address is wrong, or that deployment is older than
--        api/snapshot.js. Check the URL, and redeploy from the newest
--        commit.
--
--   nothing at all in the table
--        pg_net did not send it. Supabase → Database → Extensions, make
--        sure `pg_net` is enabled, then run step 3 again.


-- ═══ STEP 4 ════════════════════════════════════════════════════════════
-- Only once step 3 gave you a 200. Now put the same call on a timer.
--
-- Change the SAME two lines again — they have to be typed in here too,
-- because Supabase does not let a project set database-wide settings, so
-- there is nowhere else to keep them. (This is why the earlier version of
-- this file failed with `permission denied to set parameter`.)

create extension if not exists pg_cron;

-- Clears any earlier copy of the schedule, so running this file twice
-- cannot leave two jobs doubling every reading. It is fine for this to do
-- nothing the first time.
do $$
begin
  perform cron.unschedule('paisafolio-snapshot');
exception when others then
  null;
end $$;

select cron.schedule(
  'paisafolio-snapshot',
  '0 */2 * * *',                         -- every two hours, on the hour, UTC
  $job$
  select net.http_post(
    url     := 'https://YOUR-APP.vercel.app/api/snapshot',                -- ← change
    headers := jsonb_build_object(
                 'Content-Type',  'application/json',
                 'Authorization', 'Bearer PASTE-THE-64-CHARACTERS-HERE'), -- ← change
    body    := '{}'::jsonb,
    timeout_milliseconds := 55000
  );
  $job$
);

-- It prints a job id. That is all it does — it does not run the job now.
-- Nepal is UTC+05:45, so it fires at 05:45, 07:45, 09:45 and so on, local
-- time. The app records into two-hour buckets of absolute time, so the two
-- interleave rather than fight: whichever writes a bucket last stands.


-- ═══ STEP 5 ════════════════════════════════════════════════════════════
-- Check the schedule exists and is switched on. Should be one row, active.

select jobname, schedule, active from cron.job;

-- That is the whole setup. Nothing else to do.


-- ═══════════════════════════════════════════════════════════════════════
-- LOOKING IN ON IT LATER
-- ═══════════════════════════════════════════════════════════════════════
--
-- Easiest: open Paisafolio → Settings → Sync Center. Under WHILE THE APP
-- IS CLOSED it says whether readings are being taken and when the last one
-- was. Nothing to type.
--
-- Or, in SQL:
--
-- Has the job been firing? (nothing until the next even hour UTC)
--   select status, return_message, start_time
--     from cron.job_run_details
--    where jobname = 'paisafolio-snapshot'
--    order by start_time desc limit 10;
--
-- What did the server answer each time?
--   select status_code, content, created
--     from net._http_response order by created desc limit 10;
--
-- Has the app left it anything to work with? One row per synced account.
-- Empty means: open the app and let it sync.
--   select user_id, base_ccy, jsonb_array_length(legs) as holdings, captured_at
--     from public.valuation_recipes;
--
-- Are readings landing? `written_by` is "cron" for ones taken while the
-- app was closed.
--   select snapshot_date, net_worth, data->>'src' as written_by,
--          jsonb_array_length(data->'intraday') as readings_today
--     from public.networth_history
--    order by snapshot_date desc limit 5;
--
--
-- CHANGING THE SECRET LATER
--   Update it in Vercel, redeploy, then run step 4 again with the new one.
--
-- TURNING IT OFF
--   select cron.unschedule('paisafolio-snapshot');
-- ═══════════════════════════════════════════════════════════════════════
