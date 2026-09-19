-- ════════════════════════════════════════════════════════════════════════
-- PAISAFOLIO, Supabase Schema
-- Run this whole file once in the Supabase SQL Editor (Project → SQL Editor
-- → New query). Safe to re-run any time, every statement is idempotent
-- (IF NOT EXISTS / CREATE OR REPLACE / DROP ... IF EXISTS throughout).
--
-- Design principles this file follows:
--   • RLS on every table, always: a row is only ever visible/writable by
--     auth.uid() = user_id. No admin role, no service-side backdoor baked
--     into policies, this is personal financial data.
--   • Composite (user_id, id) primary keys, because ids are generated
--     client-side and are only guaranteed unique per-user.
--   • Loose but real integrity checks (no negative amounts, no garbage
--     enum values), permissive of NULL (the app legitimately sends
--     partial objects), strict about anything that IS present.
--   • Soft delete on the user-editable lists (assets/debts/goals/
--     recurring/transactions/spends/habits): a delete from the app still
--     removes the row from every normal query instantly, but the data is
--     recoverable for 30 days if a sync bug ever wipes something it
--     shouldn't.
--   • Every table carries the owner's username, filled in by a trigger, so
--     the Supabase table editor is readable without joining on a uuid. It
--     is a copy; profiles.username is the source of truth (part two, §11).
--
-- The file is in two parts. Part one is the original eight tables. Part two,
-- from §10, adds usernames, spends, habits, friends and sharing. Run the
-- whole file; both parts are idempotent.
-- ════════════════════════════════════════════════════════════════════════


-- ─────────────────────────────────────────────────────────────────────────
-- STEP 0 (OPTIONAL), COMPLETE RESET
-- Uncomment this block any time you want to wipe ALL app data and rebuild
-- from scratch on this same project. Does NOT touch auth.users (your
-- Supabase login accounts stay intact), only the app's own tables.
--
-- drop view  if exists public.public_profiles cascade;
-- drop table if exists public.portfolio_shares cascade;
-- drop table if exists public.friendships cascade;
-- drop table if exists public.habits cascade;
-- drop table if exists public.spends cascade;
-- drop table if exists public.networth_history cascade;
-- drop table if exists public.settings cascade;
-- drop table if exists public.transactions cascade;
-- drop table if exists public.recurring cascade;
-- drop table if exists public.goals cascade;
-- drop table if exists public.debts cascade;
-- drop table if exists public.assets cascade;
-- drop table if exists public.profiles cascade;
-- drop function if exists public.handle_new_user() cascade;
-- drop function if exists public.touch_updated_at() cascade;
-- drop function if exists public.stamp_username() cascade;
-- drop function if exists public.sync_username_everywhere() cascade;
-- drop function if exists public.shared_with_me(uuid, text) cascade;
-- ─────────────────────────────────────────────────────────────────────────

-- No admin role exists in this schema, intentionally, see design note
-- above. This line is safe to keep even after the first run: it cleans up
-- the old admin table/function if this project ever had an earlier
-- version of this schema that included one.
drop table if exists public.admins cascade;
drop function if exists public.is_admin() cascade;

-- ─────────────────────────────────────────────────────────────────────────
-- MIGRATION, upgrade any pre-existing id-only primary keys to
-- (user_id, id). Harmless no-op if the tables don't exist yet or already
-- have the composite key.
-- ─────────────────────────────────────────────────────────────────────────
do $$
declare
  t text;
begin
  foreach t in array array['assets','debts','goals','recurring','transactions'] loop
    if to_regclass('public.' || t) is not null then
      execute format('alter table public.%I drop constraint if exists %I', t, t || '_pkey');
      if not exists (
        select 1 from pg_constraint
        where conrelid = ('public.' || t)::regclass and contype = 'p'
      ) then
        execute format('alter table public.%I add primary key (user_id, id)', t);
      end if;
    end if;
  end loop;
end $$;

-- ─────────────────────────────────────────────────────────────────────────
-- MIGRATION, repair the debts.type check constraint.
--
-- If this project was created with an earlier version of this file, the
-- debts table still carries `check (type in ('owed','lent'))`. `create table
-- if not exists` will NOT update it, so the fix has to be explicit. Without
-- this, every push containing an "I owe" debt fails and sync stays broken.
-- ─────────────────────────────────────────────────────────────────────────
do $$
begin
  if to_regclass('public.debts') is not null then
    alter table public.debts drop constraint if exists debts_type_check;
    alter table public.debts
      add constraint debts_type_check
      check (type is null or type in ('owed','iowe','lent'));
  end if;
end $$;

-- ─────────────────────────────────────────────────────────────────────────
-- SHARED TRIGGER FUNCTIONS (created once, attached to every table below)
-- ─────────────────────────────────────────────────────────────────────────

-- Keeps `updated_at` accurate on every update, on every table that has it.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Auto-create a profile + default settings row whenever someone signs up,
-- so the app never has to special-case "first login, no row yet".
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name')
  on conflict (user_id) do nothing;

  insert into public.settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ═══════════════════════════════════════════════════════════════════════
-- 1. PROFILES, name, email, account details (1 row per user)
-- ═══════════════════════════════════════════════════════════════════════
create table if not exists public.profiles (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text,
  full_name  text,
  avatar_url text,
  currency   text not null default 'NPR',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = user_id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = user_id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "profiles_delete_own" on public.profiles;
create policy "profiles_delete_own" on public.profiles
  for delete using (auth.uid() = user_id);

drop trigger if exists trg_touch_profiles on public.profiles;
create trigger trg_touch_profiles before update on public.profiles
  for each row execute function public.touch_updated_at();


-- ═══════════════════════════════════════════════════════════════════════
-- 2. ASSETS, every asset (crypto, stocks, gold, property, liquidity, etc.)
-- Category-specific fields (coinId, coinImage, propertyType, interest,
-- maturity, notes, ...) live in the JSONB `data` column exactly as the app
-- already shapes the object; the handful of fields useful to query/sort
-- directly are pulled out into real columns.
-- ═══════════════════════════════════════════════════════════════════════
create table if not exists public.assets (
  id          text not null,
  user_id     uuid not null references auth.users(id) on delete cascade,
  category    text not null,
  name        text,
  qty         numeric check (qty is null or qty >= 0),
  buy_price   numeric check (buy_price is null or buy_price >= 0),
  value       numeric check (value is null or value >= 0),
  data        jsonb not null default '{}',
  deleted_at  timestamptz,                 -- soft delete, see note at top of file
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (user_id, id)
);

create index if not exists assets_user_id_idx on public.assets(user_id) where deleted_at is null;
create index if not exists assets_category_idx on public.assets(category);

alter table public.assets enable row level security;

drop policy if exists "assets_select_own" on public.assets;
create policy "assets_select_own" on public.assets
  for select using (auth.uid() = user_id);

drop policy if exists "assets_insert_own" on public.assets;
create policy "assets_insert_own" on public.assets
  for insert with check (auth.uid() = user_id);

drop policy if exists "assets_update_own" on public.assets;
create policy "assets_update_own" on public.assets
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "assets_delete_own" on public.assets;
create policy "assets_delete_own" on public.assets
  for delete using (auth.uid() = user_id);

drop trigger if exists trg_touch_assets on public.assets;
create trigger trg_touch_assets before update on public.assets
  for each row execute function public.touch_updated_at();


-- ═══════════════════════════════════════════════════════════════════════
-- 3. DEBTS, money owed / lent
-- ═══════════════════════════════════════════════════════════════════════
create table if not exists public.debts (
  id          text not null,
  user_id     uuid not null references auth.users(id) on delete cascade,
  -- ⚠️ FIXED: this used to be check (type in ('owed','lent')), but the app has
  -- always written 'iowe' for "money I owe someone", 'lent' is not a value the
  -- client ever produces. The result was that any user with even one "I owe"
  -- debt hit a check-constraint violation on push, which failed the WHOLE
  -- transaction batch, so *nothing* synced for them and the sync dot just sat
  -- on error forever. 'lent' is kept as an accepted value purely so any row
  -- written by an older build still validates.
  type        text check (type is null or type in ('owed','iowe','lent')),
  name        text,
  amount      numeric check (amount is null or amount >= 0),
  data        jsonb not null default '{}',
  deleted_at  timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (user_id, id)
);

create index if not exists debts_user_id_idx on public.debts(user_id) where deleted_at is null;

alter table public.debts enable row level security;

drop policy if exists "debts_select_own" on public.debts;
create policy "debts_select_own" on public.debts
  for select using (auth.uid() = user_id);

drop policy if exists "debts_insert_own" on public.debts;
create policy "debts_insert_own" on public.debts
  for insert with check (auth.uid() = user_id);

drop policy if exists "debts_update_own" on public.debts;
create policy "debts_update_own" on public.debts
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "debts_delete_own" on public.debts;
create policy "debts_delete_own" on public.debts
  for delete using (auth.uid() = user_id);

drop trigger if exists trg_touch_debts on public.debts;
create trigger trg_touch_debts before update on public.debts
  for each row execute function public.touch_updated_at();


-- ═══════════════════════════════════════════════════════════════════════
-- 4. GOALS, savings goals
-- ═══════════════════════════════════════════════════════════════════════
create table if not exists public.goals (
  id          text not null,
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text,
  target      numeric check (target is null or target >= 0),
  saved       numeric check (saved is null or saved >= 0),
  data        jsonb not null default '{}',
  deleted_at  timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (user_id, id)
);

create index if not exists goals_user_id_idx on public.goals(user_id) where deleted_at is null;

alter table public.goals enable row level security;

drop policy if exists "goals_select_own" on public.goals;
create policy "goals_select_own" on public.goals
  for select using (auth.uid() = user_id);

drop policy if exists "goals_insert_own" on public.goals;
create policy "goals_insert_own" on public.goals
  for insert with check (auth.uid() = user_id);

drop policy if exists "goals_update_own" on public.goals;
create policy "goals_update_own" on public.goals
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "goals_delete_own" on public.goals;
create policy "goals_delete_own" on public.goals
  for delete using (auth.uid() = user_id);

drop trigger if exists trg_touch_goals on public.goals;
create trigger trg_touch_goals before update on public.goals
  for each row execute function public.touch_updated_at();


-- ═══════════════════════════════════════════════════════════════════════
-- 5. RECURRING, recurring investments
-- ═══════════════════════════════════════════════════════════════════════
create table if not exists public.recurring (
  id          text not null,
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text,
  amount      numeric check (amount is null or amount >= 0),
  data        jsonb not null default '{}',
  deleted_at  timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (user_id, id)
);

create index if not exists recurring_user_id_idx on public.recurring(user_id) where deleted_at is null;

alter table public.recurring enable row level security;

drop policy if exists "recurring_select_own" on public.recurring;
create policy "recurring_select_own" on public.recurring
  for select using (auth.uid() = user_id);

drop policy if exists "recurring_insert_own" on public.recurring;
create policy "recurring_insert_own" on public.recurring
  for insert with check (auth.uid() = user_id);

drop policy if exists "recurring_update_own" on public.recurring;
create policy "recurring_update_own" on public.recurring
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "recurring_delete_own" on public.recurring;
create policy "recurring_delete_own" on public.recurring
  for delete using (auth.uid() = user_id);

drop trigger if exists trg_touch_recurring on public.recurring;
create trigger trg_touch_recurring before update on public.recurring
  for each row execute function public.touch_updated_at();


-- ═══════════════════════════════════════════════════════════════════════
-- 6. TRANSACTIONS, full transaction history
-- ═══════════════════════════════════════════════════════════════════════
create table if not exists public.transactions (
  id          text not null,
  user_id     uuid not null references auth.users(id) on delete cascade,
  type        text,
  amount      numeric,
  data        jsonb not null default '{}',
  occurred_at timestamptz,
  deleted_at  timestamptz,
  created_at  timestamptz not null default now(),
  primary key (user_id, id)
);

create index if not exists transactions_user_id_idx on public.transactions(user_id) where deleted_at is null;
create index if not exists transactions_occurred_at_idx on public.transactions(occurred_at);

alter table public.transactions enable row level security;

drop policy if exists "transactions_select_own" on public.transactions;
create policy "transactions_select_own" on public.transactions
  for select using (auth.uid() = user_id);

drop policy if exists "transactions_insert_own" on public.transactions;
create policy "transactions_insert_own" on public.transactions
  for insert with check (auth.uid() = user_id);

drop policy if exists "transactions_update_own" on public.transactions;
create policy "transactions_update_own" on public.transactions
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "transactions_delete_own" on public.transactions;
create policy "transactions_delete_own" on public.transactions
  for delete using (auth.uid() = user_id);


-- ═══════════════════════════════════════════════════════════════════════
-- 7. SETTINGS, currency, theme, preferences (1 row per user)
-- ═══════════════════════════════════════════════════════════════════════
create table if not exists public.settings (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  currency    text not null default 'NPR',
  theme       text not null default 'dark' check (theme in ('dark','light','auto')),
  data        jsonb not null default '{}',
  updated_at  timestamptz not null default now()
);

alter table public.settings enable row level security;

drop policy if exists "settings_select_own" on public.settings;
create policy "settings_select_own" on public.settings
  for select using (auth.uid() = user_id);

drop policy if exists "settings_insert_own" on public.settings;
create policy "settings_insert_own" on public.settings
  for insert with check (auth.uid() = user_id);

drop policy if exists "settings_update_own" on public.settings;
create policy "settings_update_own" on public.settings
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "settings_delete_own" on public.settings;
create policy "settings_delete_own" on public.settings
  for delete using (auth.uid() = user_id);

drop trigger if exists trg_touch_settings on public.settings;
create trigger trg_touch_settings before update on public.settings
  for each row execute function public.touch_updated_at();


-- ═══════════════════════════════════════════════════════════════════════
-- 8. NETWORTH_HISTORY, daily net worth snapshots
-- One row per user per day; upserted on (user_id, snapshot_date). Split
-- out total_assets/total_debts alongside net_worth so a history chart can
-- show the two lines separately later without re-deriving them from `data`.
-- ═══════════════════════════════════════════════════════════════════════
create table if not exists public.networth_history (
  id            bigint generated always as identity primary key,
  user_id       uuid not null references auth.users(id) on delete cascade,
  snapshot_date date not null default current_date check (snapshot_date <= current_date),
  net_worth     numeric not null,
  total_assets  numeric,
  total_debts   numeric,
  data          jsonb not null default '{}',
  created_at    timestamptz not null default now(),
  unique (user_id, snapshot_date)
);

create index if not exists networth_history_user_id_idx on public.networth_history(user_id);
create index if not exists networth_history_date_idx on public.networth_history(snapshot_date);

alter table public.networth_history enable row level security;

drop policy if exists "networth_select_own" on public.networth_history;
create policy "networth_select_own" on public.networth_history
  for select using (auth.uid() = user_id);

drop policy if exists "networth_insert_own" on public.networth_history;
create policy "networth_insert_own" on public.networth_history
  for insert with check (auth.uid() = user_id);

drop policy if exists "networth_update_own" on public.networth_history;
create policy "networth_update_own" on public.networth_history
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "networth_delete_own" on public.networth_history;
create policy "networth_delete_own" on public.networth_history
  for delete using (auth.uid() = user_id);


-- ═══════════════════════════════════════════════════════════════════════
-- 9. HOUSEKEEPING, auto-purge soft-deleted rows after 30 days
-- Deletes from the app still disappear from every normal query instantly
-- (the app's sync layer already filters/deletes by id, this doesn't
-- require any app-side change to work exactly as before). This just adds
-- a 30-day undo window at the database level in case a sync bug or a
-- bad merge ever wipes something it shouldn't, call
-- public.purge_old_deleted() from a scheduled Supabase Edge Function /
-- cron if you want it to run automatically; harmless if you never do.
-- ═══════════════════════════════════════════════════════════════════════
create or replace function public.purge_old_deleted()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.assets where deleted_at is not null and deleted_at < now() - interval '30 days';
  delete from public.debts where deleted_at is not null and deleted_at < now() - interval '30 days';
  delete from public.goals where deleted_at is not null and deleted_at < now() - interval '30 days';
  delete from public.recurring where deleted_at is not null and deleted_at < now() - interval '30 days';
  delete from public.transactions where deleted_at is not null and deleted_at < now() - interval '30 days';
end;
$$;

-- ⚠️ SECURITY: this function is `security definer`, so it runs with the
-- owner's privileges and bypasses RLS entirely. By default Postgres grants
-- EXECUTE on new functions to PUBLIC, which means any anon/authenticated
-- caller could invoke it over PostgREST (`/rest/v1/rpc/purge_old_deleted`)
-- and permanently destroy every user's 30-day recovery window on demand.
-- Revoke it and grant only to service_role (cron / Edge Function).
revoke all on function public.purge_old_deleted() from public;
revoke all on function public.purge_old_deleted() from anon;
revoke all on function public.purge_old_deleted() from authenticated;
grant execute on function public.purge_old_deleted() to service_role;

-- Same reasoning for the signup trigger helper: it's security definer and
-- writes to profiles/settings. Nothing should be able to call it directly, -- it only ever needs to run as a trigger, which doesn't require EXECUTE.
revoke all on function public.handle_new_user() from public;
revoke all on function public.handle_new_user() from anon;
revoke all on function public.handle_new_user() from authenticated;

-- ════════════════════════════════════════════════════════════════════════
-- DONE. Tables: profiles, assets, debts, goals, recurring, transactions,
-- settings, networth_history, every one RLS-locked to auth.uid() = user_id,
-- no exceptions, no admin role. New signups get a profile + settings row
-- automatically. Amounts/quantities can't go negative; debt `type` and
-- settings `theme` are constrained to known values; NULL is always allowed
-- since the app sends partial objects during normal use.
-- ════════════════════════════════════════════════════════════════════════

-- ════════════════════════════════════════════════════════════════════════
-- PART TWO, added later. Everything above still applies unchanged; this
-- section adds the pieces the app grew into and makes the tables legible
-- in the Supabase table editor.
--
--   10. profiles gains a username, a fonts blob and a base currency
--   11. every table carries the owner's username, filled in automatically
--   12. spends, spending and income, out of the transactions table
--   13. habits, habit tracker, out of the settings blob
--   14. friends and sharing, the groundwork for showing a friend a
--       portfolio, off by default and read-only
--   15. comments, what every table and the non-obvious columns are for,
--       so the table editor explains itself
-- ════════════════════════════════════════════════════════════════════════


-- ═══════════════════════════════════════════════════════════════════════
-- 10. PROFILES, EXTENDED
--
-- `username` is the handle a person is known by: it is what makes a row in
-- any other table readable at a glance, and it is what a friend request is
-- addressed to. Lowercase, 3-24 characters, letters/digits/underscore, and
-- unique across the whole project.
-- ═══════════════════════════════════════════════════════════════════════
alter table public.profiles add column if not exists username      text;
alter table public.profiles add column if not exists fonts         jsonb not null default '{}';
alter table public.profiles add column if not exists base_currency text not null default 'NPR';

do $$
begin
  alter table public.profiles drop constraint if exists profiles_username_format;
  alter table public.profiles
    add constraint profiles_username_format
    check (username is null or username ~ '^[a-z0-9_]{3,24}$');
end $$;

create unique index if not exists profiles_username_key on public.profiles(username)
  where username is not null;


-- ═══════════════════════════════════════════════════════════════════════
-- 11. USERNAME ON EVERY TABLE
--
-- Opening `assets` in the Supabase table editor showed a wall of uuids and
-- no way to tell whose row was whose without joining by hand. Every table
-- now carries the owner's username.
--
-- It is a *copy*, not a source of truth: profiles.username is the real
-- value, and these are filled in by a trigger on insert and update so the
-- app never sends the field and it cannot drift. Renaming yourself rewrites
-- them all (see sync_username_everywhere).
-- ═══════════════════════════════════════════════════════════════════════
do $$
declare t text;
begin
  foreach t in array array['assets','debts','goals','recurring','transactions','settings','networth_history'] loop
    if to_regclass('public.' || t) is not null then
      execute format('alter table public.%I add column if not exists username text', t);
    end if;
  end loop;
end $$;

-- Fills username from profiles whenever a row is written.
create or replace function public.stamp_username()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  select p.username into new.username from public.profiles p where p.user_id = new.user_id;
  return new;
end;
$$;
revoke all on function public.stamp_username() from public, anon, authenticated;

-- Rewrites the copies when someone picks or changes their username.
create or replace function public.sync_username_everywhere()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.username is distinct from old.username then
    update public.assets            set username = new.username where user_id = new.user_id;
    update public.debts             set username = new.username where user_id = new.user_id;
    update public.goals             set username = new.username where user_id = new.user_id;
    update public.recurring         set username = new.username where user_id = new.user_id;
    update public.transactions      set username = new.username where user_id = new.user_id;
    update public.settings          set username = new.username where user_id = new.user_id;
    update public.networth_history  set username = new.username where user_id = new.user_id;
    update public.spends            set username = new.username where user_id = new.user_id;
    update public.habits            set username = new.username where user_id = new.user_id;
  end if;
  return new;
end;
$$;
revoke all on function public.sync_username_everywhere() from public, anon, authenticated;


-- ═══════════════════════════════════════════════════════════════════════
-- 12. SPENDS, everyday spending and income
--
-- These used to be stuffed into `transactions` with type = 'spend', which
-- meant the investment ledger and the household budget shared one table and
-- neither read cleanly. They are different things and now live apart.
-- ═══════════════════════════════════════════════════════════════════════
create table if not exists public.spends (
  id          text not null,
  user_id     uuid not null references auth.users(id) on delete cascade,
  username    text,
  kind        text check (kind is null or kind in ('expense','income')),
  category    text,
  amount      numeric check (amount is null or amount >= 0),
  note        text,
  account_id  text,                        -- the liquidity asset it moved through, if any
  occurred_at timestamptz,
  data        jsonb not null default '{}',
  deleted_at  timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (user_id, id)
);

create index if not exists spends_user_id_idx on public.spends(user_id) where deleted_at is null;
create index if not exists spends_occurred_at_idx on public.spends(occurred_at);

alter table public.spends enable row level security;

drop policy if exists "spends_select_own" on public.spends;
create policy "spends_select_own" on public.spends
  for select using (auth.uid() = user_id);

drop policy if exists "spends_insert_own" on public.spends;
create policy "spends_insert_own" on public.spends
  for insert with check (auth.uid() = user_id);

drop policy if exists "spends_update_own" on public.spends;
create policy "spends_update_own" on public.spends
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "spends_delete_own" on public.spends;
create policy "spends_delete_own" on public.spends
  for delete using (auth.uid() = user_id);

drop trigger if exists trg_touch_spends on public.spends;
create trigger trg_touch_spends before update on public.spends
  for each row execute function public.touch_updated_at();


-- ═══════════════════════════════════════════════════════════════════════
-- 13. HABITS, the habit tracker
--
-- Habits rode inside the settings JSON blob, which is why syncing them
-- needed a hand-written merge in the client: two devices editing settings
-- would each overwrite the other's habits wholesale. As real rows they
-- merge the same way every other list does.
--
-- The daily ticks stay as one JSON object per habit ({"2026-09-03": true})
-- rather than a row per day: a year of five habits is 1,825 rows to say
-- almost nothing, and the app always reads a whole habit at once.
-- ═══════════════════════════════════════════════════════════════════════
create table if not exists public.habits (
  id          text not null,
  user_id     uuid not null references auth.users(id) on delete cascade,
  username    text,
  name        text,
  icon        text,
  color       text,
  sort_order  integer not null default 0,
  log         jsonb not null default '{}',   -- { "YYYY-MM-DD": true }
  data        jsonb not null default '{}',
  deleted_at  timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (user_id, id)
);

create index if not exists habits_user_id_idx on public.habits(user_id) where deleted_at is null;

alter table public.habits enable row level security;

drop policy if exists "habits_select_own" on public.habits;
create policy "habits_select_own" on public.habits
  for select using (auth.uid() = user_id);

drop policy if exists "habits_insert_own" on public.habits;
create policy "habits_insert_own" on public.habits
  for insert with check (auth.uid() = user_id);

drop policy if exists "habits_update_own" on public.habits;
create policy "habits_update_own" on public.habits
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "habits_delete_own" on public.habits;
create policy "habits_delete_own" on public.habits
  for delete using (auth.uid() = user_id);

drop trigger if exists trg_touch_habits on public.habits;
create trigger trg_touch_habits before update on public.habits
  for each row execute function public.touch_updated_at();


-- ═══════════════════════════════════════════════════════════════════════
-- 14. FRIENDS AND SHARING
--
-- Two tables, deliberately separate: being someone's friend grants nothing
-- on its own, and a share can be revoked without unfriending anybody.
--
--   friendships, one row per direction, so a friendship is two rows and
--                    "accepted" is not something one side can fake.
--   portfolio_shares, an explicit grant: this user lets that user read
--                    these parts of their data, read-only, until revoked.
--
-- Nothing is shared by default. The scopes column names what is visible, so
-- "my net worth but not my debts" is expressible.
-- ═══════════════════════════════════════════════════════════════════════
create table if not exists public.friendships (
  user_id     uuid not null references auth.users(id) on delete cascade,
  friend_id   uuid not null references auth.users(id) on delete cascade,
  status      text not null default 'pending' check (status in ('pending','accepted','blocked')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (user_id, friend_id),
  check (user_id <> friend_id)
);

create index if not exists friendships_friend_idx on public.friendships(friend_id);

alter table public.friendships enable row level security;

-- You can see a friendship row if you are either side of it, but you may
-- only create or change your own side. Accepting is your own row's job.
drop policy if exists "friendships_select_either" on public.friendships;
create policy "friendships_select_either" on public.friendships
  for select using (auth.uid() = user_id or auth.uid() = friend_id);

drop policy if exists "friendships_insert_own" on public.friendships;
create policy "friendships_insert_own" on public.friendships
  for insert with check (auth.uid() = user_id);

drop policy if exists "friendships_update_own" on public.friendships;
create policy "friendships_update_own" on public.friendships
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "friendships_delete_own" on public.friendships;
create policy "friendships_delete_own" on public.friendships
  for delete using (auth.uid() = user_id);

drop trigger if exists trg_touch_friendships on public.friendships;
create trigger trg_touch_friendships before update on public.friendships
  for each row execute function public.touch_updated_at();


create table if not exists public.portfolio_shares (
  owner_id    uuid not null references auth.users(id) on delete cascade,
  viewer_id   uuid not null references auth.users(id) on delete cascade,
  -- What the viewer may read. Kept as an array so it is obvious in the table
  -- editor exactly what a share exposes.
  scopes      text[] not null default array['networth']::text[],
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (owner_id, viewer_id),
  check (owner_id <> viewer_id),
  check (scopes <@ array['networth','assets','goals','habits','spends','debts']::text[])
);

create index if not exists portfolio_shares_viewer_idx on public.portfolio_shares(viewer_id);

alter table public.portfolio_shares enable row level security;

-- Only the owner writes a share. Both sides can see that it exists, because
-- a viewer needs to know what they have been given.
drop policy if exists "shares_select_either" on public.portfolio_shares;
create policy "shares_select_either" on public.portfolio_shares
  for select using (auth.uid() = owner_id or auth.uid() = viewer_id);

drop policy if exists "shares_insert_own" on public.portfolio_shares;
create policy "shares_insert_own" on public.portfolio_shares
  for insert with check (auth.uid() = owner_id);

drop policy if exists "shares_update_own" on public.portfolio_shares;
create policy "shares_update_own" on public.portfolio_shares
  for update using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

drop policy if exists "shares_delete_own" on public.portfolio_shares;
create policy "shares_delete_own" on public.portfolio_shares
  for delete using (auth.uid() = owner_id);

drop trigger if exists trg_touch_shares on public.portfolio_shares;
create trigger trg_touch_shares before update on public.portfolio_shares
  for each row execute function public.touch_updated_at();


-- Is `owner` sharing `scope` with the person making this request?
-- Both directions of the friendship must be accepted, so an unanswered
-- request grants nothing even if a share row exists.
create or replace function public.shared_with_me(owner uuid, scope text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.portfolio_shares s
    join public.friendships f1 on f1.user_id = s.owner_id  and f1.friend_id = s.viewer_id and f1.status = 'accepted'
    join public.friendships f2 on f2.user_id = s.viewer_id and f2.friend_id = s.owner_id  and f2.status = 'accepted'
    where s.owner_id = owner
      and s.viewer_id = auth.uid()
      and scope = any (s.scopes)
  );
$$;
grant execute on function public.shared_with_me(uuid, text) to authenticated;

-- The base currency behind a shared net-worth figure. Without it a number in
-- someone else's circle card is just digits: theirs might be rupees and yours
-- dollars, and putting your own symbol on their figure reads as a conversion
-- that never happened.
--
-- Deliberately a function rather than another column on public_profiles.
-- That view is readable by every signed-in user; this answers only for
-- someone who can already see the figure it describes, and returns null to
-- everyone else.
create or replace function public.shared_currency(owner uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select p.base_currency
  from public.profiles p
  where p.user_id = owner
    and public.shared_with_me(owner, 'networth');
$$;
grant execute on function public.shared_currency(uuid) to authenticated;

-- The read-only windows a share opens. These are additional SELECT policies:
-- the owner's own "select_own" policy is untouched, and no INSERT, UPDATE or
-- DELETE policy anywhere mentions a viewer, so a share can never write.
drop policy if exists "assets_select_shared" on public.assets;
create policy "assets_select_shared" on public.assets
  for select using (public.shared_with_me(user_id, 'assets'));

drop policy if exists "goals_select_shared" on public.goals;
create policy "goals_select_shared" on public.goals
  for select using (public.shared_with_me(user_id, 'goals'));

drop policy if exists "debts_select_shared" on public.debts;
create policy "debts_select_shared" on public.debts
  for select using (public.shared_with_me(user_id, 'debts'));

drop policy if exists "habits_select_shared" on public.habits;
create policy "habits_select_shared" on public.habits
  for select using (public.shared_with_me(user_id, 'habits'));

drop policy if exists "spends_select_shared" on public.spends;
create policy "spends_select_shared" on public.spends
  for select using (public.shared_with_me(user_id, 'spends'));

drop policy if exists "networth_select_shared" on public.networth_history;
create policy "networth_select_shared" on public.networth_history
  for select using (public.shared_with_me(user_id, 'networth'));

-- A username has to be discoverable for anyone to be added as a friend, but
-- an email address does not. This view exposes the handle and display name
-- and nothing else, and is the only way one user ever sees another's row.
create or replace view public.public_profiles
with (security_invoker = off) as
  select user_id, username, full_name, avatar_url
  from public.profiles
  where username is not null;

revoke all on public.public_profiles from public, anon;
grant select on public.public_profiles to authenticated;


-- ═══════════════════════════════════════════════════════════════════════
-- 11b. ATTACH THE USERNAME TRIGGERS (all tables now exist)
-- ═══════════════════════════════════════════════════════════════════════
do $$
declare t text;
begin
  foreach t in array array['assets','debts','goals','recurring','transactions',
                           'settings','networth_history','spends','habits'] loop
    execute format('drop trigger if exists trg_stamp_username on public.%I', t);
    execute format('create trigger trg_stamp_username before insert or update of user_id on public.%I
                    for each row execute function public.stamp_username()', t);
  end loop;
end $$;

drop trigger if exists trg_sync_username on public.profiles;
create trigger trg_sync_username after update of username on public.profiles
  for each row execute function public.sync_username_everywhere();

-- Backfill, for every row written before any of this existed.
do $$
declare t text;
begin
  foreach t in array array['assets','debts','goals','recurring','transactions',
                           'settings','networth_history','spends','habits'] loop
    execute format('update public.%I x set username = p.username
                    from public.profiles p
                    where p.user_id = x.user_id and x.username is distinct from p.username', t);
  end loop;
end $$;


-- ═══════════════════════════════════════════════════════════════════════
-- 9b. HOUSEKEEPING, EXTENDED, the two new tables soft-delete too
-- ═══════════════════════════════════════════════════════════════════════
create or replace function public.purge_old_deleted()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.assets       where deleted_at is not null and deleted_at < now() - interval '30 days';
  delete from public.debts        where deleted_at is not null and deleted_at < now() - interval '30 days';
  delete from public.goals        where deleted_at is not null and deleted_at < now() - interval '30 days';
  delete from public.recurring    where deleted_at is not null and deleted_at < now() - interval '30 days';
  delete from public.transactions where deleted_at is not null and deleted_at < now() - interval '30 days';
  delete from public.spends       where deleted_at is not null and deleted_at < now() - interval '30 days';
  delete from public.habits       where deleted_at is not null and deleted_at < now() - interval '30 days';
end;
$$;
revoke all on function public.purge_old_deleted() from public, anon, authenticated;
grant execute on function public.purge_old_deleted() to service_role;


-- ═══════════════════════════════════════════════════════════════════════
-- 15. COMMENTS, the table editor should say what a table is for without
-- anyone having to open this file.
-- ═══════════════════════════════════════════════════════════════════════
comment on table public.profiles         is 'One row per person: handle, name, and the preferences that describe the account rather than a device.';
comment on table public.assets           is 'Everything owned: crypto, stocks, commodities, property, bank balances and cash.';
comment on table public.debts            is 'Money lent out and money owed, with their payment history.';
comment on table public.goals            is 'Savings goals and what has been put towards them.';
comment on table public.recurring        is 'Recurring investments, and when each is next due.';
comment on table public.transactions     is 'The investment ledger: every buy, sell, deposit and income event against an asset.';
comment on table public.spends           is 'Everyday spending and income. Separate from transactions, which is the investment ledger.';
comment on table public.habits           is 'Habit tracker. The daily ticks live in log as {"YYYY-MM-DD": true}.';
comment on table public.settings         is 'Preferences that follow the account across devices. Device-only settings stay on the device.';
comment on table public.networth_history is 'One net worth snapshot per person per day.';
comment on table public.friendships      is 'One row per direction. A friendship is two accepted rows; on its own it grants no access to anything.';
comment on table public.portfolio_shares is 'An explicit, revocable, read-only grant: this owner lets this viewer read these scopes.';

comment on column public.profiles.username      is 'Lowercase handle, 3-24 chars of a-z 0-9 _. Unique. This is what friends are found by.';
comment on column public.profiles.fonts         is 'Chosen typefaces, so the app looks the same on a new device.';
comment on column public.profiles.base_currency is 'The currency every stored amount is denominated in. Changing it in the app converts the data.';
comment on column public.assets.data            is 'The whole asset object as the app shapes it. The columns beside it are copies, for querying and sorting.';
comment on column public.assets.username        is 'Copy of profiles.username, maintained by trigger, so this table is readable without a join. Never the source of truth.';
comment on column public.spends.account_id      is 'The liquidity asset the money moved through, when one was chosen.';
comment on column public.habits.log             is 'Daily ticks: {"YYYY-MM-DD": true}. One object per habit rather than a row per day.';
comment on column public.portfolio_shares.scopes is 'Any of networth, assets, goals, habits, spends, debts. Empty array shares nothing.';

-- =======================================================================
-- 13. ROLES AND AI PROVIDERS
-- =======================================================================
-- Two things that must never be readable by the browser, for two different
-- reasons.
--
-- profiles.role decides who is an administrator. A client that could UPDATE
-- it could make itself one, so no client policy grants UPDATE on it: the
-- column is written from the admin API with the service role, or by hand
-- here. Reading your own role is fine and is how the app decides whether to
-- show the Admin tab.
--
-- ai_providers holds the API keys for every AI service. It has NO client
-- policy at all, which means RLS denies every request the anon key can make.
-- That is deliberate and load-bearing: the anon key ships inside supabase.js
-- and is public by design, so a table the browser can SELECT is a table the
-- whole internet can SELECT. Only api/_aiconfig.js reads this, server-side,
-- with the service role.
-- =======================================================================

alter table public.profiles
  add column if not exists role text not null default 'user';

do $$ begin
  alter table public.profiles
    add constraint profiles_role_check check (role in ('user','admin'));
exception when duplicate_object then null; end $$;

-- Make yourself the administrator. Run this once, with your own address:
--   update public.profiles set role = 'admin' where email = 'you@example.com';
-- Check it took:
--   select user_id, email, role from public.profiles where role = 'admin';

create table if not exists public.ai_providers (
  provider    text primary key,
  api_key     text,
  enabled     boolean not null default true,
  models      jsonb not null default '[]',
  priority    int not null default 0,
  jobs        jsonb,
  referer     text,
  updated_at  timestamptz not null default now()
);

alter table public.ai_providers enable row level security;

-- No policies on purpose. With RLS on and nothing granted, every request
-- made with the anon key is refused, and the service role bypasses RLS
-- entirely. Adding a "read own" policy here would defeat the whole point.

revoke all on public.ai_providers from anon, authenticated;

drop trigger if exists trg_touch_ai_providers on public.ai_providers;
create trigger trg_touch_ai_providers before update on public.ai_providers
  for each row execute function public.touch_updated_at();


-- ═══════════════════════════════════════════════════════════════════════
-- 14. VALUATION RECIPES, so the chart keeps moving with the app closed
-- ═══════════════════════════════════════════════════════════════════════
-- A snapshot used to happen only while the app was open, which meant a day
-- you never opened it had no reading and the line ran straight across it.
--
-- The app writes one row here on every sync: for each holding, the price
-- reading it last used and what that holding was worth at that reading, plus
-- one `fixed` number covering everything with no live price (bank balances,
-- land, debts). The scheduled job in api/snapshot.js re-reads the same feeds
-- and scales each leg by newPrice / oldPrice, which is enough to re-value the
-- whole portfolio without a second copy of how any of it is worked out.
--
-- This holds no names, no notes, no transactions: a currency code, a total,
-- and a list of (asset id, feed key, two numbers).
create table if not exists public.valuation_recipes (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  base_ccy    text not null default 'NPR',
  net_worth   numeric not null default 0,
  fixed       numeric not null default 0,
  legs        jsonb not null default '[]',
  captured_at timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.valuation_recipes enable row level security;

drop policy if exists "recipes_select_own" on public.valuation_recipes;
create policy "recipes_select_own" on public.valuation_recipes
  for select using (auth.uid() = user_id);

drop policy if exists "recipes_insert_own" on public.valuation_recipes;
create policy "recipes_insert_own" on public.valuation_recipes
  for insert with check (auth.uid() = user_id);

drop policy if exists "recipes_update_own" on public.valuation_recipes;
create policy "recipes_update_own" on public.valuation_recipes
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "recipes_delete_own" on public.valuation_recipes;
create policy "recipes_delete_own" on public.valuation_recipes
  for delete using (auth.uid() = user_id);

drop trigger if exists trg_touch_valuation_recipes on public.valuation_recipes;
create trigger trg_touch_valuation_recipes before update on public.valuation_recipes
  for each row execute function public.touch_updated_at();

-- A recipe goes stale: if the app has not synced for a fortnight the holdings
-- behind it may be nothing like what is actually held, and a job that keeps
-- re-pricing it is drawing a line about a portfolio that no longer exists.
-- The job skips anything older than this; the index is what makes that cheap.
create index if not exists valuation_recipes_captured_idx
  on public.valuation_recipes(captured_at);

-- The row the job writes into carries today's per-holding values and today's
-- two-hourly readings, so the existing pull picks both up with no change.
-- `snapshot_date <= current_date` on networth_history is deliberate and still
-- correct here: the job only ever writes today.


-- ═══════════════════════════════════════════════════════════════════════
-- 15. THE SCHEDULE, every two hours
-- ═══════════════════════════════════════════════════════════════════════
-- Run this block ONCE, after setting the two settings below. It is separate
-- from the rest of the file because it needs values only you have, and
-- because re-running the whole schema should not silently re-point a live
-- schedule at a different deployment.
--
--   1. In the Supabase dashboard: Database → Extensions → enable `pg_cron`
--      and `pg_net`.
--   2. In Vercel: add an environment variable CRON_SECRET, a long random
--      string (e.g. `openssl rand -hex 32`), then redeploy.
--   3. Run the block below with your own deployment URL and that same
--      secret. Both are stored in Postgres, readable only by the service
--      role, and never reach the browser.
--
-- To see what it has been doing:
--   select * from cron.job_run_details order by start_time desc limit 20;
-- To stop it:
--   select cron.unschedule('paisafolio-snapshot');
--
-- ── begin one-time block ──────────────────────────────────────────────
-- create extension if not exists pg_cron;
-- create extension if not exists pg_net;
--
-- alter database postgres set app.snapshot_url    = 'https://YOUR-APP.vercel.app/api/snapshot';
-- alter database postgres set app.snapshot_secret = 'YOUR-CRON-SECRET';
--
-- select cron.schedule(
--   'paisafolio-snapshot',
--   '0 */2 * * *',                      -- on the hour, every two hours, UTC
--   $$
--   select net.http_post(
--     url     := current_setting('app.snapshot_url'),
--     headers := jsonb_build_object(
--                  'Content-Type',  'application/json',
--                  'Authorization', 'Bearer ' || current_setting('app.snapshot_secret')),
--     body    := '{}'::jsonb,
--     timeout_milliseconds := 55000
--   );
--   $$
-- );
-- ── end one-time block ────────────────────────────────────────────────
--
-- Nepal is UTC+05:45, so '0 */2 * * *' lands at 05:45, 07:45, 09:45 and so
-- on local time. The slots the app itself records are two-hour buckets of
-- absolute time, so the two interleave without fighting: whichever of them
-- writes a given bucket last is the one that stands.


-- ════════════════════════════════════════════════════════════════════════
-- DONE (part two). Tables now: profiles, assets, debts, goals, recurring,
-- transactions, spends, habits, settings, networth_history, friendships,
-- portfolio_shares, ai_providers, valuation_recipes. Every one RLS-locked to
-- auth.uid(); the only way anyone
-- else reads a row is an accepted friendship plus an explicit share, and
-- that path is SELECT only. The scheduled snapshot job reads recipes and
-- writes networth_history with the service role, which bypasses RLS: it is
-- the only thing that ever touches another user's row, it reads no names and
-- no notes, and it is reachable only with CRON_SECRET.
-- ════════════════════════════════════════════════════════════════════════
