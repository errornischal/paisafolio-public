// ════════════════════════════════════════════════════════════════════════
// PAISAFOLIO, supabase.js
// All Supabase config + cloud sync logic lives here.
// index.html only needs:  <script src="supabase.js"></script>  (after the
// supabase-js CDN script, before the closing </body>, same spot the old
// inline block used to live).
//
// Public functions called from index.html (unchanged names/signatures):
//   initSupabase(), pushToCloud(), pullFromCloud(fromSignIn), schedulePush(),
//   manualSync(), loadCloudCache(userId), updateSyncDot(status),
//   updateSyncLabels(), importLocalToCloud(), discardLocalStartFresh(),
//   showImportLocalPrompt()
//
// These all read/write the SAME global `state` object the rest of the app
// uses (assets, debts, goals, recurs, transactions, settings, pnlHistory).
// The only thing that changed is WHERE that state is stored in Supabase:
// instead of one big JSON blob in `paisafolio_data`, it's now split across
// proper tables (profiles, assets, debts, goals, recurring, transactions,
// settings, networth_history) as set up by schema.sql.
//
// GUARD: this whole file is wrapped so that if it's ever accidentally
// loaded twice (e.g. a duplicate <script> tag, or a service worker layering
// a stale cached copy over a fresh fetch), the second execution is a silent
// no-op instead of throwing "Identifier 'X' has already been declared" and
// breaking the entire page. window.__paisafolioSupabaseLoaded is the flag.
// ════════════════════════════════════════════════════════════════════════
if (window.__paisafolioSupabaseLoaded) {
  console.warn('supabase.js loaded more than once, skipping duplicate execution. ' +
    'This usually means a stale cached copy is being served; a hard refresh (Ctrl/Cmd+Shift+R) will fix it.');
} else {
window.__paisafolioSupabaseLoaded = true;

// ════════ SUPABASE CONFIG ════════
// Read from sb-config.js, which admin.html shares, so the connection lives in
// one place. Left empty there, the app runs entirely on this device: no
// sign-in, no sync, everything else exactly the same.
const SUPABASE_URL = (window.SB_URL || '').trim();
const SUPABASE_ANON_KEY = (window.SB_ANON || '').trim();

var sbClient = null;
window.supabaseUser = window.supabaseUser || null;
let syncDebounceTimer = null;
window.lastSyncTime = window.lastSyncTime || null;
window.syncStatus = window.syncStatus || 'offline'; // 'offline' | 'syncing' | 'synced' | 'error'
window.authRequired = window.authRequired || false;

window.STORE_KEY = 'paisafolio_local';          // local-only key, never touched by auth
window.cloudKey = uid => ('paisafolio_cloud_' + uid); // per-user offline cache key


// ════════ PENDING-SYNC TRACKING ════════
// Whenever a local edit happens (schedulePush is called) while signed in, we
// snapshot which item ids exist right now per list. Once that push actually
// lands on the server, those ids are cleared. This gives accurate per-card
// "not synced yet" badges and a real list for the sync center, without having
// to touch every single add/edit/delete function across the app individually.
window.pendingSyncIds = { assets: new Set(), debts: new Set(), goals: new Set(), recurs: new Set(), transactions: new Set(), spends: new Set() };
window.lastSyncError = null;

// ════════ INTERACTIVE-SIGN-IN FLAG ════════
// onAuthStateChange fires SIGNED_IN in three situations that all need very
// different behaviour, and only one of them may ever trigger the
// local-vs-cloud merge prompt:
//  1. Typing a password and hitting Sign In (same tab)              -> prompt OK
//  2. Google OAuth redirect (same tab navigates away and back)      -> prompt OK
//  3. Clicking an email "confirm your account" link, which very     -> prompt OK,
//     often opens in a BRAND NEW tab/window, not the original one      but needs
//                                                                       to survive that
//  4. supabase-js silently restoring a saved session on page load   -> NO prompt
// Case 3 is why this can't live in sessionStorage: a new tab does not
// inherit the original tab's sessionStorage, so the flag would silently
// vanish and case 3 would get treated as case 4 (no prompt shown even
// though the person just deliberately signed up on a device with real
// guest data). localStorage IS shared across tabs on the same origin, so
// it survives all three real sign-in paths. To keep a stale flag from
// lingering indefinitely (e.g. sign-up started, never confirmed, then a
// totally unrelated session gets silently restored days later), it's
// timestamped and only honored for a few minutes.
const INTERACTIVE_SIGNIN_KEY = 'pf_interactive_signin';
const INTERACTIVE_SIGNIN_MAX_AGE_MS = 15 * 60 * 1000; // 15 minutes
window.markInteractiveSignIn = function () {
  try { localStorage.setItem(INTERACTIVE_SIGNIN_KEY, String(Date.now())); } catch (e) {}
};
// doLogin()/doRegister() call sbClient.auth.signInWithPassword() and get a
// resolved promise the instant the AUTH request succeeds, well before the
// separate onAuthStateChange listener (below) has pulled cloud data and
// re-rendered. Without this, the login modal closes and the dashboard is
// shown still holding stale/empty data for a beat, which reads as "nothing
// happened" until the next manual refresh. This lets callers await the
// actual data-ready point instead of just the auth handshake.
window._signInReadyResolve = null;
window.signInReadyPromise = function () {
  return new Promise((resolve) => { window._signInReadyResolve = resolve; });
};
window.consumeInteractiveSignIn = function () {
  try {
    const raw = localStorage.getItem(INTERACTIVE_SIGNIN_KEY);
    localStorage.removeItem(INTERACTIVE_SIGNIN_KEY);
    if (!raw) return false;
    const age = Date.now() - Number(raw);
    return Number.isFinite(age) && age >= 0 && age <= INTERACTIVE_SIGNIN_MAX_AGE_MS;
  } catch (e) { return false; }
};

// Fingerprint of every row as it existed at the last successful push/pull, so
// we can tell what genuinely changed instead of re-sending the whole account.
// Shape: { assets: Map(id -> json), debts: Map(...), ... }
const SYNC_KINDS = ['assets', 'debts', 'goals', 'recurs', 'transactions', 'spends'];
// Supabase table name -> the state key that holds those items.
const TABLE_TO_KIND = { assets:'assets', debts:'debts', goals:'goals', recurring:'recurs', transactions:'transactions' };
function kindForTable(t){ return TABLE_TO_KIND[t] || t; }
let syncedFingerprints = null;
function fingerprintKind(kind) {
  const m = new Map();
  (state[kind] || []).forEach(item => { if (item && item.id != null) m.set(item.id, JSON.stringify(item)); });
  return m;
}
function captureSyncedFingerprints() {
  syncedFingerprints = {};
  SYNC_KINDS.forEach(k => { syncedFingerprints[k] = fingerprintKind(k); });
}
function fingerprintsFor(kind) {
  return (syncedFingerprints && syncedFingerprints[kind]) || null;
}

// Was: marked EVERY item in EVERY table as pending on every single save, so a
// one-character edit lit up the whole account as "waiting to sync" and the
// Sync Center listed the same thing under several kinds at once. Now only
// genuinely-changed rows are marked.
function snapshotPendingSync() {
  if (!supabaseUser) return;
  SYNC_KINDS.forEach(kind => {
    const known = fingerprintsFor(kind);
    (state[kind] || []).forEach(item => {
      if (!item || item.id == null) return;
      // No baseline yet (first sync of the session) => treat everything as
      // pending, which is correct: nothing is known to be on the server.
      if (!known) { pendingSyncIds[kind].add(item.id); return; }
      const prev = known.get(item.id);
      if (prev === undefined || prev !== JSON.stringify(item)) pendingSyncIds[kind].add(item.id);
      else pendingSyncIds[kind].delete(item.id);
    });
    // Anything queued that no longer exists locally was deleted; the delete
    // itself is the pending change, so keep it queued until the push lands.
  });
  refreshPendingSyncUI();
}
// Everything queued is now on the server: record the new "known synced"
// baseline, then re-derive what is still outstanding.
//
// `sentSnapshot` is the fingerprint set captured at the moment the push began.
// It must be used in preference to re-reading `state` here, because `state`
// can have moved on during the network round trip. Re-reading it marked
// edits made mid-push as already-synced, so the follow-up push filtered them
// out as unchanged and they never reached the cloud, while the UI happily
// reported "0 pending". Local kept the edit, the cloud never saw it, and
// another device would never show it.
//
// Biasing to the send-time snapshot can at worst re-upload a row that did
// make it (upserts are idempotent, so that is free). The opposite bias
// silently loses data, which is why this errs that way deliberately.
function markAllSynced(sentSnapshot) {
  if (sentSnapshot) syncedFingerprints = sentSnapshot;
  else captureSyncedFingerprints();
  clearAllPendingSync();
  // Anything edited while the push was in flight is absent from the baseline,
  // so this re-queues it instead of dropping it.
  snapshotPendingSync();
}
// Fingerprint every synced list right now, for use as a send-time snapshot.
function captureFingerprintSnapshot() {
  const snap = {};
  SYNC_KINDS.forEach(k => { snap[k] = fingerprintKind(k); });
  return snap;
}

function clearAllPendingSync() {
  SYNC_KINDS.forEach(kind => pendingSyncIds[kind].clear());
}
function pendingSyncCount() {
  return Object.values(pendingSyncIds).reduce((s, set) => s + set.size, 0);
}
function isPendingSync(kind, id) {
  return !!supabaseUser && !!(pendingSyncIds[kind] && pendingSyncIds[kind].has(id));
}
// Re-render whatever's currently on screen so badges/sync-center update live.
// Debounced lightly via rAF-style microtask batching isn't needed here since
// callers already debounce (schedulePush) or only fire once (push finish).
// A sync badge appearing on one row does not need the whole app rebuilt.
// This used to call renderAll(), so a single save painted three times: once
// for the action, once when the push was queued, once when it landed. Each
// rebuild replayed every entrance animation, which is what made an ordinary
// edit look like the screen was refreshing over and over.
//
// Badges are added and removed in place instead. renderAll() stays as the
// fallback for the one case that genuinely changes structure: a row count
// that no longer matches what is on screen.
function refreshPendingSyncUI() {
  try { paintPendingBadges(); } catch (e) {
    try { if (typeof renderAll === 'function') renderAll(); } catch (e2) {}
  }
  try { updateSyncLabels(); } catch (e) {}
  try { if (typeof renderSyncCenter === 'function') renderSyncCenter(); } catch (e) {}
}
// Which on-screen collections carry a pending badge, and where their id lives.
const PENDING_SELECTORS = [
  { kind: 'assets', sel: '[data-asset-id]', attr: 'assetId' },
  { kind: 'debts',  sel: '[data-debt-id]',  attr: 'debtId'  },
  { kind: 'goals',  sel: '[data-goal-id]',  attr: 'goalId'  },
  { kind: 'spends', sel: '[data-spend-id]', attr: 'spendId' },
  { kind: 'recurs', sel: '[data-recur-id]', attr: 'recurId' },
];
// A cloud with an up-arrow: this is queued to go up, not broken. The struck
// -through cloud that was here before reads as "sync is off".
const PENDING_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" '
  + 'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
  + '<path d="M20 16.6A4.5 4.5 0 0 0 17.5 8h-1.3A7 7 0 1 0 4 14.9"/>'
  + '<polyline points="9 15 12 12 15 15"/><line x1="12" y1="12" x2="12" y2="21"/></svg>';
// The cloud alone asks people to learn what it means. The words under it
// do not, and at 15% opacity behind the content they cost nothing.
const PENDING_BADGE = '<span class="unsynced-badge" title="Waiting to sync" aria-label="Waiting to sync">'
  + PENDING_ICON + '<span class="unsynced-badge-lbl">Not synced</span></span>';
window.PENDING_ICON = PENDING_ICON;
window.PENDING_BADGE = PENDING_BADGE;
function paintPendingBadges() {
  PENDING_SELECTORS.forEach(({ kind, sel, attr }) => {
    document.querySelectorAll(sel).forEach(node => {
      const id = node.dataset[attr];
      if (!id) return;
      const want = isPendingSync(kind, id);
      const has = node.classList.contains('unsynced');
      if (want === has) return;
      node.classList.toggle('unsynced', want);
      const existing = node.querySelector(':scope > .unsynced-badge');
      if (want && !existing) node.insertAdjacentHTML('afterbegin', PENDING_BADGE);
      else if (!want && existing) existing.remove();
    });
  });
}

function initSupabase() {
  // Nothing configured. That is a normal way to run this app, not an error:
  // it is local-first, and sync is the part you opt into by filling in
  // sb-config.js. Say so once, quietly, and carry on.
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.info('Paisafolio: no Supabase connection configured, running on this device only. ' +
      'Fill in sb-config.js to turn on accounts and sync. See README.md.');
    updateSyncDot('offline');
    window.__paisafolioSbUnconfigured = true;
    return;
  }
  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    // CDN blocked/offline/failed to load, app must still work fully offline.
    console.warn('Supabase library unavailable, running in offline/local-only mode. ' +
      'This usually means https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2 failed to load ' +
      '(blocked by host/firewall, ad-blocker, or no internet).');
    updateSyncDot('offline');
    window.__paisafolioSbLoadFailed = true;
    return;
  }
  try {
    sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Set the instant onAuthStateChange (above) starts handling a session on
    // this page load, so the getSession() fallback below knows not to also
    // independently pull, see the note in that block for why that mattered.
    let authListenerHandledInitialSession = false;

    sbClient.auth.onAuthStateChange(async (event, session) => {
      const prevUser = supabaseUser;
      supabaseUser = session?.user || null;
      updateAuthUI();
      try { if (typeof refreshAdminRole === 'function') refreshAdminRole(); } catch (e) {}
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && supabaseUser && !prevUser) {
        authListenerHandledInitialSession = true;
        // Was this a real sign-in the user just performed, or just supabase-js
        // restoring a saved session on page load? Only the former may prompt.
        const isInteractive = consumeInteractiveSignIn();
        loadCloudCache(supabaseUser.id);
        renderAll();
        // Close the auth modal on ANY successful sign-in, not just email/
        // password. Google (and any other OAuth provider) completes here,
        // via a page redirect back into this same onAuthStateChange handler
        //, previously only doLogin()/doRegister() called closeAuthModal(),
        // so a Google sign-in left the modal sitting open on top of an
        // already-logged-in app.
        authRequired = false;
        try { closeAuthModal(); } catch (e) {}
        if (isInteractive) toast('Signed in! Syncing data…', 'success');

        // NOTE: there is intentionally no "copy cloud to local" prompt here.
        // saveState() already writes every signed-in edit straight into this
        // account's own offline cache (cloudKey(uid)), and pullFromCloud()
        // below fills that same cache from the server. That cache IS this
        // device's offline backup for this account, nothing else needs to
        // happen. The plain guest key (STORE_KEY) is a completely separate
        // space for signed-out use and must never be touched by a signed-in
        // flow, silently or via a prompt.
        await pullFromCloud(isInteractive);
        renderAll();
        renderSettings();
        if (window._signInReadyResolve) { window._signInReadyResolve(); window._signInReadyResolve = null; }
      } else if (event === 'PASSWORD_RECOVERY') {
        // The reset link signs the person in so a new password can be set.
        // Without this the sign-in was the whole visible effect of the link.
        if (typeof openRecoveryModal === 'function') openRecoveryModal();
      } else if (event === 'SIGNED_OUT') {
        clearAllPendingSync();
        syncedFingerprints = null; // next account starts with no baseline
        updateSyncDot('offline');
      } else if (event === 'TOKEN_REFRESHED' && supabaseUser) {
        updateSyncDot('synced');
      }
    });

    sbClient.auth.getSession().then(async ({ data: { session } }) => {
      // Don't blindly overwrite supabaseUser here. onAuthStateChange (above)
      // is the source of truth and can already have fired, e.g. right after
      // an OAuth redirect (Google) or an email-confirmation link, Supabase
      // parses the token from the URL and fires SIGNED_IN/INITIAL_SESSION
      // essentially immediately, but this getSession() call was kicked off
      // in parallel and can resolve slightly *after* it, sometimes still
      // returning a stale/null session for that first tick. Only apply what
      // getSession() found if we don't already have a signed-in user, or if
      // it agrees with (or actively updates) the one we have.
      if (!supabaseUser || !session || session.user?.id === supabaseUser.id) {
        supabaseUser = session?.user || supabaseUser || null;
      }
      updateAuthUI();
      try { if (typeof refreshAdminRole === 'function') refreshAdminRole(); } catch (e) {}
      // IMPORTANT: if the listener above already claimed (or is about to
      // claim) this exact sign-in, do NOT also call pullFromCloud() here.
      // Both used to fire independently on the same page load, e.g. right
      // after clicking an email confirmation link, and this unconditional
      // call (fromSignIn defaults to false) could win the race and quietly
      // run first, which skips the local-vs-cloud merge prompt entirely and
      // silently leaves guest data untouched with no feedback at all. Wait
      // one microtask so an already-in-flight onAuthStateChange callback has
      // a chance to set the flag before this checks it, closes the last
      // sliver of the race instead of just narrowing it.
      await Promise.resolve();
      if (supabaseUser && !authListenerHandledInitialSession) {
        loadCloudCache(supabaseUser.id);
        restorePage();
        renderAll();
        pullFromCloud().then(() => { restorePage(); renderAll(); });
      }
    });
  } catch (e) {
    console.warn('Supabase init failed:', e);
  }
}

// Load a user's cloud cache key into state (for instant display before server responds)
function loadCloudCache(userId) {
  try {
    const s = localStorage.getItem(cloudKey(userId));
    if (!s) return;
    const cached = JSON.parse(s);
    // Whatever this device decided stays this device's, including grid-or-list.
    const devicePrefs = (typeof captureDevicePrefs === 'function')
      ? captureDevicePrefs()
      : { theme: state.settings.theme, hideBalance: state.settings.hideBalance,
          haptics: state.settings.haptics, reduceMotion: state.settings.reduceMotion };
    state = { ...state, ...cached };
    state.settings = { ...state.settings, ...devicePrefs };
    // state was just replaced, so the view variables read at boot are stale.
    if (typeof adoptViewPrefs === 'function') adoptViewPrefs();
    // Re-read from the device-scoped store rather than trusting whichever blob
    // happened to load first. Before that store existed, `devicePrefs` above was
    // captured from the guest blob, which a signed-in user never writes to, so
    // a theme chosen while signed in was overwritten by a stale value on every
    // launch, and no amount of re-picking it could stick.
    if (typeof loadDevicePrefs === 'function') loadDevicePrefs();
    state.settings.onboarded = true;
  } catch (e) {}
}

// ════════ ROW <-> APP-OBJECT MAPPERS ════════
// Each table stores the bits we want to query directly (id, user_id, a couple
// of headline columns) plus a `data` JSONB column holding the rest of the
// object exactly as the app already shapes it. This keeps the multi-table
// structure clean for admins/SQL while not requiring the rest of index.html
// (which builds these objects in many different places) to change at all.

function assetToRow(a, userId) {
  return {
    id: a.id, user_id: userId, category: a.category || null,
    name: a.name || null, qty: a.qty ?? null, buy_price: a.buyPrice ?? null,
    value: a.value ?? null, data: a,
  };
}
function rowToAsset(r) { return { ...r.data, id: r.id }; }

// The debts table has a check constraint on `type`. The app writes 'owed' or
// 'iowe'; anything else (a hand-edited backup, a future value) would fail the
// whole batch, so unknown values are sent as NULL, which the constraint
// explicitly permits, rather than blowing up the entire sync.
const VALID_DEBT_TYPES = new Set(['owed', 'iowe', 'lent']);
function debtToRow(d, userId) {
  const type = VALID_DEBT_TYPES.has(d.type) ? d.type : null;
  return { id: d.id, user_id: userId, type, name: d.name || null, amount: d.amount ?? null, data: d };
}
function rowToDebt(r) { return { ...r.data, id: r.id }; }

function goalToRow(g, userId) {
  return { id: g.id, user_id: userId, name: g.name || null, target: g.target ?? null, saved: g.saved ?? null, data: g };
}
function rowToGoal(r) { return { ...r.data, id: r.id }; }

function recurToRow(rc, userId) {
  return { id: rc.id, user_id: userId, name: rc.name || null, amount: rc.amount ?? null, data: rc };
}
function rowToRecur(r) { return { ...r.data, id: r.id }; }

// Spending used to be pushed into the transactions table with type='spend',
// so the investment ledger and the household budget shared one table and
// neither read cleanly. Spending has its own table now. The marker is still
// recognised on the way IN, because rows written by older builds are still
// sitting in transactions and have to be migrated across (see pullFromCloud).
const SPEND_MARK = 'spend';
function combinedLedger() {
  return (state.transactions || []).map(t => ({ ...t, _k: 'tx' }));
}
function spendToRow(x, userId) {
  return {
    id: x.id, user_id: userId,
    kind: (x.kind === 'income' || x.kind === 'expense') ? x.kind : null,
    category: x.category || null,
    amount: x.amount ?? null,
    note: x.note || null,
    account_id: x.account || null,
    occurred_at: x.date || null,
    data: x,
  };
}
function rowToSpend(r) { return { ...r.data, id: r.id }; }
// Habits still live in the settings blob, which is where the two-way merge
// that protects a streak is written. This mirrors them into a real table so
// they are legible and queryable in Supabase; the blob stays the source of
// truth and the mirror is never read back.
function habitToRow(h, userId) {
  const log = (state.settings && state.settings.habitLog && state.settings.habitLog[h.id]) || {};
  return {
    id: h.id, user_id: userId,
    name: h.name || null, icon: h.icon || null, color: h.color || null,
    sort_order: Number.isFinite(h.order) ? h.order : 0,
    log, data: h,
  };
}
function txToRow(t, userId) {
  return {
    id: t.id, user_id: userId,
    type: t._k === SPEND_MARK ? SPEND_MARK : (t.type || null),
    amount: t.amount ?? null,
    occurred_at: t.date || t.occurredAt || null, data: t,
  };
}
function rowToTx(r) { return { ...r.data, id: r.id }; }

// ════════ CLOUD SYNC ════════
// Replace-style sync: on push we diff each list against what's already on
// the server for this user (by id) and insert/update/delete just the rows
// that changed, rather than wiping every table on every save. This keeps
// writes cheap and avoids any "delete everything then re-insert" race.
//
// Deletes are SOFT deletes (deleted_at = now()) on tables that support it
// (assets/debts/goals/recurring/transactions), not a hard DELETE. This is
// a safety net, not a behavior change: rows with deleted_at set are
// filtered out below exactly like they'd been actually deleted, so the
// app looks and behaves identically. The only difference is that if a
// sync bug or a bad merge ever makes `items` empty when it shouldn't be,
// the data is recoverable for 30 days (see purge_old_deleted() in
// schema.sql) instead of being gone the instant it happens.
async function syncTable(table, userId, items, toRow, bypassWipeGuard = false) {
  const { data: existingRows, error: fetchErr } = await sbClient
    .from(table).select('id').eq('user_id', userId).is('deleted_at', null);
  if (fetchErr) throw fetchErr;

  const existingIds = new Set((existingRows || []).map(r => r.id));
  const currentIds = new Set(items.map(i => i.id));

  // ── WIPE GUARD ────────────────────────────────────────────────────────
  // Only refuse a full wipe when the server side had a MEANINGFUL amount of
  // data (currently: 3+ rows). Deleting your one and only asset, or your
  // last couple of transactions, is completely normal, everyday use, local
  // legitimately going to zero from 1 or 2 items is not a red flag and must
  // sync through without any friction.
  // A jump from many rows straight to zero is a different story: that
  // pattern basically never happens from someone manually deleting one item
  // at a time, so it's far more likely local `state` got clobbered (failed
  // pull, bad import, storage error, a race during sign-in). Refuse only
  // that case, and let the next pull restore local instead.
  // bypassWipeGuard is set by explicit, already-confirmed full-wipe actions
  // (Settings → Clear All Data) that have their own "type to confirm"-style
  // dialog, those are genuine, deliberate deletes, not the ambiguous
  // silent-empty-state case this guard exists to catch, so they must be
  // allowed straight through.
  const WIPE_GUARD_MIN_ROWS = 3;
  if (!bypassWipeGuard && items.length === 0 && existingIds.size >= WIPE_GUARD_MIN_ROWS) {
    console.warn(
      `[sync] Refusing to clear all ${existingIds.size} "${table}" rows: local list is empty ` +
      `but the server has ${existingIds.size} (>= ${WIPE_GUARD_MIN_ROWS}). This is treated as a ` +
      `local-state fault, not a delete. Nothing was removed.`
    );
    throw new Error(`Sync stopped: local "${table}" was unexpectedly empty while the cloud still had ${existingIds.size} item(s). Your cloud data was left untouched, try Sync Now again once your data is back, or use Sync Center to overwrite the cloud copy on purpose.`);
  }

  // A softer signal, not a guard: a push that removes more than 60% of a
  // non-trivial table is noted in the console and then allowed. Blocking it
  // would turn a deliberate clear-out into a sync that keeps failing, and the
  // empty-list case above already covers the shape that means local broke.
  if (existingIds.size >= 5) {
    const deletingCount = [...existingIds].filter(id => !currentIds.has(id)).length;
    if (deletingCount / existingIds.size > 0.6) {
      console.warn(`[sync] Large delete detected on "${table}": ${deletingCount}/${existingIds.size} rows.`);
    }
  }

  const toDelete = [...existingIds].filter(id => !currentIds.has(id));

  // Drop anything that can't satisfy the composite primary key, and clamp the
  // numeric columns the schema guards with `>= 0` checks. A single bad row
  // (missing id, negative qty from a hand-edited backup) would otherwise
  // reject the entire batch and stall sync permanently.
  const clampNonNeg = (v) => {
    if (v === null || v === undefined || v === '') return null;
    const n = Number(v);
    if (!Number.isFinite(n)) return null;
    return n < 0 ? 0 : n;
  };
  const NON_NEG_COLS = ['qty', 'buy_price', 'value', 'amount', 'target', 'saved'];
  const rows = items
    .filter(i => i && i.id != null && i.id !== '')
    .map(i => {
      const row = { ...toRow(i, userId), deleted_at: null };
      for (const col of NON_NEG_COLS) {
        // `transactions.amount` is intentionally unconstrained (sells are
        // recorded as negatives), so leave that table's amounts alone.
        if (col === 'amount' && table === 'transactions') continue;
        if (col in row) row[col] = clampNonNeg(row[col]);
      }
      return row;
    });

  if (rows.length !== items.length) {
    console.warn(`[sync] Skipped ${items.length - rows.length} "${table}" item(s) with a missing id.`);
  }

  // Only send what actually changed. Previously every push re-uploaded the
  // entire account, every asset, every transaction, even for a one-field
  // edit, which is slow, burns mobile data, and is what made sync feel like
  // it was "resyncing everything all again". Rows whose fingerprint matches
  // the last successful sync are skipped entirely.
  const known = (typeof fingerprintsFor === 'function') ? fingerprintsFor(kindForTable(table)) : null;
  // Index the source items once. This used to run items.find() for every row,
  // i.e. O(rows x items), on a few thousand transactions that is millions of
  // comparisons on every single push, on the main thread.
  const byId = new Map();
  for (const i of items) { if (i && i.id != null) byId.set(i.id, i); }
  const changedRows = known
    ? rows.filter(r => {
        const src = byId.get(r.id);
        if (!src) return true;
        const prev = known.get(r.id);
        return prev === undefined || prev !== JSON.stringify(src);
      })
    : rows;

  if (changedRows.length !== rows.length) {
    console.info(`[sync] "${table}": ${changedRows.length}/${rows.length} row(s) changed, skipping the rest.`);
  }

  // Chunk so a large portfolio doesn't hit PostgREST's request size limit.
  const CHUNK = 500;
  for (let i = 0; i < changedRows.length; i += CHUNK) {
    const { error } = await sbClient
      .from(table).upsert(changedRows.slice(i, i + CHUNK), { onConflict: 'user_id,id' });
    if (error) throw error;
  }
  if (toDelete.length) {
    const { error } = await sbClient.from(table)
      .update({ deleted_at: new Date().toISOString() })
      .eq('user_id', userId).in('id', toDelete);
    if (error) throw error;
  }
}

let pushInFlight = false;
let pushQueuedAgain = false;

async function pushToCloud(bypassWipeGuard = false) {
  if (!supabaseUser || !sbClient) return;
  // Hard stop while a sign-in decision is pending, see pauseSync() above.
  // An already-scheduled debounce timer can still fire after pauseSync()
  // cleared it (if it was mid-flight), so this second check is the one that
  // actually guarantees nothing uploads before the person has chosen.
  if (window.syncPaused && !bypassWipeGuard) return;
  if (pushInFlight) {
    // A push is already running, don't start a second one concurrently
    // (that could race on the same tables and clobber/undo changes).
    // Just remember to run once more right after this one finishes.
    pushQueuedAgain = true;
    return;
  }
  pushInFlight = true;
  updateSyncDot('syncing');
  // Snapshot BEFORE the first await: this is the version of the data this
  // push is responsible for. See markAllSynced().
  const sentSnapshot = captureFingerprintSnapshot();
  try {
    const uid = supabaseUser.id;

    await Promise.all([
      syncTable('assets', uid, state.assets || [], assetToRow, bypassWipeGuard),
      syncTable('debts', uid, state.debts || [], debtToRow, bypassWipeGuard),
      syncTable('goals', uid, state.goals || [], goalToRow, bypassWipeGuard),
      syncTable('recurring', uid, state.recurs || [], recurToRow, bypassWipeGuard),
      syncTable('transactions', uid, combinedLedger(), txToRow, bypassWipeGuard),
      syncTable('spends', uid, state.spends || [], spendToRow, bypassWipeGuard),
    ]);
    // A mirror, not a sync: a failure here must never fail the push, because
    // the habits themselves went up inside settings a moment ago.
    try {
      await syncTable('habits', uid, (state.settings && state.settings.habits) || [], habitToRow, bypassWipeGuard);
    } catch (e) { console.warn('[sync] habit mirror failed (habits are safe in settings):', e); }

    // settings, single row per user
    const { error: settingsErr } = await sbClient
      .from('settings')
      .upsert({
        user_id: uid,
        currency: state.settings?.currency || 'NPR',
        theme: state.settings?.theme || 'dark',
        data: state.settings || {},
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });
    if (settingsErr) throw settingsErr;

    // networth_history, today's snapshot (upserted, so re-syncing same day just updates it)
    const netWorth = computeNetWorthForSync();
    if (netWorth !== null) {
      const today = new Date().toISOString().split('T')[0];
      const { error: nwErr } = await sbClient
        .from('networth_history')
        .upsert({
          user_id: uid,
          snapshot_date: today,
          net_worth: netWorth,
          // A day's per-holding values live on that day's own row. This used
          // to write the WHOLE history into today's row on every sync, which
          // nothing ever read back (the pull selects two columns and has
          // never asked for `data`), so it was a growing write-only blob:
          // harmless while it held one number per day, several hundred
          // kilobytes per sync once each day carries a value per holding.
          data: {
            assets: (((state.pnlHistory || []).find(x => x && x.date === today) || {}).assets) || {},
            // The two-hourly readings for today, from both sides: a pull put
            // the job's slots into state.intraday, so writing it back keeps
            // them. Older slots have already aged out of the ring.
            intraday: (state.intraday || []).filter(x => x && Number(x.t) > 0),
          },
        }, { onConflict: 'user_id,snapshot_date' });
      if (nwErr) throw nwErr;
    }

    // What the scheduled snapshot job re-prices while the app is closed: the
    // feed reading behind each holding and what it was worth at that reading.
    // See valuationRecipe() in app.js and api/snapshot.js for why that is
    // enough. A failure here must not fail the sync - it costs the two-hourly
    // readings until the next push, not any of the data above.
    try {
      if (typeof valuationRecipe === 'function') {
        const recipe = valuationRecipe();
        if (recipe && Array.isArray(recipe.legs)) {
          const { error: recErr } = await sbClient
            .from('valuation_recipes')
            .upsert({
              user_id: uid,
              base_ccy: recipe.base || 'NPR',
              net_worth: recipe.nw,
              fixed: recipe.fixed,
              legs: recipe.legs,
              captured_at: recipe.at,
            }, { onConflict: 'user_id' });
          if (recErr) throw recErr;
        }
      }
    } catch (e) {
      console.warn('[sync] valuation recipe not stored, snapshots while closed will pause:', e && e.message ? e.message : e);
    }

    // The profile is the account-level record: who you are, and the choices
    // that should follow you to a new device rather than staying on this one.
    const st = state.settings || {};
    const profileRow = {
      user_id: uid, email: supabaseUser.email || null,
      currency: st.currency || 'NPR',
      base_currency: st.baseCurrency || 'NPR',
      fonts: { text: st.fontText || null, numbers: st.fontNum || null },
      updated_at: new Date().toISOString(),
    };
    if ((st.displayName || '').trim()) profileRow.full_name = st.displayName.trim();
    if ((st.username || '').trim()) profileRow.username = st.username.trim().toLowerCase();
    const { error: profErr } = await sbClient.from('profiles').upsert(profileRow, { onConflict: 'user_id' });
    // A taken username must not stall everything else that just synced fine.
    if (profErr) console.warn('[sync] profile upsert failed:', profErr.message || profErr);

    lastSyncTime = new Date();
    lastSyncError = null;
    markAllSynced(sentSnapshot);
    updateSyncDot('synced');
    updateSyncLabels();
  } catch (e) {
    console.warn('Sync push failed:', e);
    lastSyncError = (e && (e.message || e.error_description)) || 'Unknown error';
    updateSyncDot('error');
  } finally {
    pushInFlight = false;
    if (pushQueuedAgain) {
      pushQueuedAgain = false;
      pushToCloud(); // run once more to pick up whatever changed while we were busy
    }
  }
}

// Best-effort net worth number for the snapshot row; falls back to null
// (which skips the snapshot) if the app's own calculator isn't available.
function computeNetWorthForSync() {
  try {
    if (typeof getNetWorth === 'function') return getNetWorth();
    if (typeof calcNetWorth === 'function') return calcNetWorth();
  } catch (e) {}
  return null;
}

// The most recent reading the scheduled job took. Null means it has never
// written for this account: either it is not set up, or it has not run yet.
function lastCronAt(rows) {
  let best = null;
  for (const r of (rows || []).slice(-4)) {
    const d = r && r.data;
    if (!d || d.src !== 'cron') continue;
    const t = Date.parse(d.at || '');
    if (Number.isFinite(t) && (best === null || t > best)) best = t;
  }
  return best ? new Date(best).toISOString() : null;
}

// The two-hourly readings live on the day they belong to, so the last two
// days of rows are where the 48-hour ring is. Union them with whatever this
// device recorded for itself, newest write per slot winning, because both
// sides are writing into the same absolute two-hour buckets.
function cloudIntraday(rows) {
  const KEEP = 48 * 3600 * 1000;
  const floor = Date.now() - KEEP;
  const bySlot = new Map();
  for (const x of (typeof state !== 'undefined' && Array.isArray(state.intraday) ? state.intraday : [])) {
    const t = x && Number(x.t);
    if (Number.isFinite(t) && t >= floor) bySlot.set(t, Number(x.v) || 0);
  }
  for (const r of (rows || []).slice(-3)) {
    const list = r && r.data && r.data.intraday;
    if (!Array.isArray(list)) continue;
    for (const x of list) {
      const t = x && Number(x.t);
      if (Number.isFinite(t) && t >= floor) bySlot.set(t, Number(x.v) || 0);
    }
  }
  return [...bySlot.entries()].sort((a, b) => a[0] - b[0]).map(([t, v]) => ({ t, v }));
}

async function pullFromCloud(fromSignIn = false) {
  if (!supabaseUser || !sbClient) return;
  updateSyncDot('syncing');
  try {
    const uid = supabaseUser.id;

    const [assetsRes, debtsRes, goalsRes, recurRes, txRes, spendRes, settingsRes, nwRes] = await Promise.all([
      sbClient.from('assets').select('*').eq('user_id', uid).is('deleted_at', null),
      sbClient.from('debts').select('*').eq('user_id', uid).is('deleted_at', null),
      sbClient.from('goals').select('*').eq('user_id', uid).is('deleted_at', null),
      sbClient.from('recurring').select('*').eq('user_id', uid).is('deleted_at', null),
      sbClient.from('transactions').select('*').eq('user_id', uid).is('deleted_at', null).order('occurred_at', { ascending: true }),
      sbClient.from('spends').select('*').eq('user_id', uid).is('deleted_at', null).order('occurred_at', { ascending: true }),
      sbClient.from('settings').select('*').eq('user_id', uid).single(),
      sbClient.from('networth_history').select('snapshot_date, net_worth, data').eq('user_id', uid).order('snapshot_date', { ascending: true }),
    ]);

    for (const r of [assetsRes, debtsRes, goalsRes, recurRes, txRes, nwRes]) {
      if (r.error) throw r.error;
    }
    // The spends table is new. A project whose schema.sql has not been re-run
    // yet answers with an error here, and that must not take the whole pull
    // down: fall back to the spend-marked rows still in transactions.
    if (spendRes.error) console.warn('[sync] spends table unavailable, reading spending from transactions:', spendRes.error.message || spendRes.error);
    // Spending written by an older build is still sitting in transactions.
    // Read it from wherever it actually is; the next push writes it to the
    // spends table and, because combinedLedger() no longer includes it, drops
    // it from transactions. One pull-then-push and the move is done.
    const legacySpends = (txRes.data || []).map(rowToTx).filter(t => t._k === SPEND_MARK);
    const cloudSpends = (!spendRes.error && (spendRes.data || []).length)
      ? (spendRes.data || []).map(rowToSpend)
      : legacySpends;
    // settings: PGRST116 = no row yet, not a real error
    if (settingsRes.error && settingsRes.error.code !== 'PGRST116') throw settingsRes.error;

    // "Does this account actually have DATA in the cloud?" must mean real
    // user records only, assets, debts, goals, recurring, transactions.
    //
    // It must NOT include settingsRes.data. The settings row is preferences
    // (currency/theme/etc), it's upserted on EVERY pushToCloud(), and nothing
    // ever deletes it, not clearAllData(), not syncTable() (which only
    // handles the five data tables above). So once an account has synced even
    // once, that row exists forever. Including it here made hasCloudData
    // permanently true for any previously-used account, which sent every
    // sign-in down the "account has cloud data" branch and made the
    // import-to-empty-cloud prompt in the else branch literally unreachable -
    // even after the person deleted every asset or used Clear All Data.
    const hasCloudData = (assetsRes.data?.length || 0) > 0
      || (debtsRes.data?.length || 0) > 0
      || (goalsRes.data?.length || 0) > 0
      || (recurRes.data?.length || 0) > 0
      || (txRes.data?.length || 0) > 0
      || (spendRes.data?.length || 0) > 0;

    if (hasCloudData) {
      // ─── ACCOUNT HAS CLOUD DATA ───────────────────────────────────────
      // Never prompts here, regardless of guest storage state. Cloud data
      // just becomes the active session; guest storage (whatever it holds,
      // even if empty) is left completely untouched, in its own separate
      // space. The only sign-in prompt in this whole flow is the opposite
      // case, below: guest has data AND cloud is empty.
      const localSettings = { ...state.settings }; // keep device-level UI prefs
      // Snapshot habits BEFORE state.settings is overwritten by the cloud copy.
      const localHabits = JSON.parse(JSON.stringify(state.settings.habits || []));
      const localLog    = JSON.parse(JSON.stringify(state.settings.habitLog || {}));

      state = {
        ...state,
        assets: (assetsRes.data || []).map(rowToAsset),
        debts: (debtsRes.data || []).map(rowToDebt),
        goals: (goalsRes.data || []).map(rowToGoal),
        recurs: (recurRes.data || []).map(rowToRecur),
        transactions: (txRes.data || []).map(rowToTx).filter(t => t._k !== SPEND_MARK),
        spends: cloudSpends,
        // Carry each day's per-holding values across with it. Without them a
        // new device gets the net-worth line and a Daily P&L card with
        // nothing in it, for every day recorded before that device existed.
        pnlHistory: (nwRes.data || []).map(r => {
          const pt = { date: r.snapshot_date, netWorth: r.net_worth };
          const av = r.data && r.data.assets;
          if (av && typeof av === 'object' && Object.keys(av).length) pt.assets = av;
          return pt;
        }),
        // The 1D view is drawn from these. Most of them were taken by the
        // scheduled job, at hours this device was not running.
        intraday: cloudIntraday(nwRes.data),
        // When that job last wrote anything, so the Sync Center can say
        // whether it is running at all rather than leaving it a mystery.
        cronSeenAt: lastCronAt(nwRes.data),
        settings: settingsRes.data ? { ...settingsRes.data.data } : state.settings,
        lastUpdated: new Date().toISOString(),
      };
      // Same list as loadCloudCache, from the same place: a pull must not hand
      // this device another device's view preferences.
      // (cloudIntraday is defined below, beside the other row readers.)
      const keepLocal = {};
      const keys = (typeof DEVICE_PREF_KEYS !== 'undefined' && DEVICE_PREF_KEYS)
        || ['theme','hideBalance','haptics','reduceMotion'];
      keys.forEach(k => { if (localSettings[k] !== undefined) keepLocal[k] = localSettings[k]; });
      state.settings = { ...state.settings, ...keepLocal, onboarded: true };
      if (typeof adoptViewPrefs === 'function') adoptViewPrefs();

      // Habits ride inside the settings blob, but unlike theme/currency they
      // are real user data, a pull replacing settings wholesale would destroy
      // habits created on this device that hadn't been pushed yet. Merge by
      // union: keep every habit from both sides, and OR the check-in logs
      // together so a tick made on either device survives.
      try {
        const cloudHabits = (settingsRes.data && settingsRes.data.data && settingsRes.data.data.habits) || [];
        const cloudLog    = (settingsRes.data && settingsRes.data.data && settingsRes.data.data.habitLog) || {};
        const mergedById = new Map();
        [...cloudHabits, ...localHabits].forEach(h => { if (h && h.id) mergedById.set(h.id, h); });
        state.settings.habits = [...mergedById.values()];
        const mergedLog = {};
        [...new Set([...Object.keys(cloudLog), ...Object.keys(localLog)])].forEach(hid => {
          mergedLog[hid] = { ...(cloudLog[hid] || {}), ...(localLog[hid] || {}) };
        });
        state.settings.habitLog = mergedLog;
      } catch (e) { console.warn('[sync] habit merge failed:', e); }

      if (typeof adoptViewPrefs === 'function') adoptViewPrefs();
      try { localStorage.setItem(cloudKey(uid), JSON.stringify(state)); } catch (e) {}
      lastSyncTime = new Date();
      lastSyncError = null;
      markAllSynced();
      updateSyncDot('synced');
      updateSyncLabels();

    } else {
      // ─── EMPTY ACCOUNT (no user data in the cloud yet) ─────────────────
      // Reachable both for a brand-new account and for an existing one whose
      // data was all deleted. In the latter case a settings row can still
      // exist (it's never deleted), so apply those saved preferences here -
      // otherwise signing in would silently reset currency/theme.
      if (settingsRes.data) {
        const devicePrefs = { ...state.settings };
        state.settings = {
          ...state.settings,
          ...settingsRes.data.data,
          theme: devicePrefs.theme,
          hideBalance: devicePrefs.hideBalance,
          haptics: devicePrefs.haptics,
          reduceMotion: devicePrefs.reduceMotion,
          onboarded: true,
        };
      }
      // Must read the guest key directly here, loadCloudCache() (called
      // just before pullFromCloud during sign-in) already overwrote in-memory
      // `state` with this account's own (empty) cloud cache, so `state` no
      // longer reflects guest storage by this point.
      const guestRaw = (() => {
        if (typeof flushSave === 'function') flushSave();   // debounced write may be pending
        try { const s = localStorage.getItem(STORE_KEY); return s ? JSON.parse(s) : null; } catch (e) { return null; }
      })();
      const hasLocalData = guestRaw && (
        (guestRaw.assets && guestRaw.assets.length > 0) ||
        (guestRaw.debts && guestRaw.debts.length > 0) ||
        (guestRaw.goals && guestRaw.goals.length > 0)
      );
      if (hasLocalData && fromSignIn) {
        // CRITICAL: at this point `state` can still be holding the GUEST data.
        // loadCloudCache() bails out early when this device has no cache for
        // this account yet (brand-new account), leaving whatever loadState()
        // put there, the guest data, in place. Since supabaseUser is already
        // set, any saveState() (restorePage/setPage call one immediately after
        // sign-in) would schedule a push and upload it while this modal is
        // still open. Freeze all syncing until there's an actual answer.
        pauseSync();
        let choice;
        try {
          choice = await new Promise(resolve => openSyncConfirm('import-to-empty-cloud', resolve));
        } finally {
          resumeSync();
        }
        if (choice === 'import') {
          const localSettings = { ...state.settings };
          state = {
            assets: guestRaw.assets || [], debts: guestRaw.debts || [],
            goals: guestRaw.goals || [], recurs: guestRaw.recurs || [],
            transactions: guestRaw.transactions || [], pnlHistory: guestRaw.pnlHistory || [],
            settings: { ...(guestRaw.settings || {}), ...localSettings, onboarded: true },
            lastUpdated: new Date().toISOString(),
          };
          await pushToCloud();
          try { localStorage.setItem(cloudKey(uid), JSON.stringify(state)); } catch (e) {}
          toast('Local data imported to your account!', 'success');
        } else {
          // Declined. `state` is still the guest data, so it MUST be cleared -
          // otherwise the very next saveState() pushes it up anyway, which is
          // the exact opposite of what was just asked for. The signed-in
          // session now correctly shows this empty account; the guest key on
          // disk is untouched and still holds everything.
          const devicePrefs = { ...state.settings };
          state = {
            assets: [], debts: [], goals: [], recurs: [], transactions: [], pnlHistory: [],
            settings: { ...devicePrefs, onboarded: true },
            lastUpdated: new Date().toISOString(),
          };
          try { localStorage.setItem(cloudKey(uid), JSON.stringify(state)); } catch (e) {}
          try { renderAll(); } catch (e) {}
        }
      } else {
        await pushToCloud();
      }
      updateSyncDot('synced');
    }
  } catch (e) {
    console.warn('Sync pull failed:', e);
    updateSyncDot('error');
  }
}

// Legacy entry points kept so any stray references don't hard-crash; the
// flow above (openSyncConfirm) is now the actual UI for this decision.
function showImportLocalPrompt() {}
async function importLocalToCloud() { await pushToCloud(); toast('Local data imported to your account!', 'success'); }
async function discardLocalStartFresh() { /* no-op: cancel now just leaves things as they are */ }

// While a sign-in decision modal is open, `state` may still hold GUEST data
// that the person has not yet agreed to upload. Any auto-push during that
// window would silently import it behind their back, which is exactly what
// happened: restorePage()/setPage() call saveState() right after sign-in,
// schedulePush() fired on a 1.5s debounce, and the upload completed while
// the "Import local data?" modal was still waiting for an answer. Pausing
// blocks both the debounce and the push itself until a choice is made.
window.syncPaused = false;
function pauseSync() { window.syncPaused = true; clearTimeout(syncDebounceTimer); }
function resumeSync() { window.syncPaused = false; }

function schedulePush() {
  if (!supabaseUser) return;
  if (window.syncPaused) return;
  snapshotPendingSync(); // mark current items as "waiting to sync" right away
  clearTimeout(syncDebounceTimer);
  syncDebounceTimer = setTimeout(pushToCloud, 1500); // 1.5s debounce
}

// ════════ GOOGLE SIGN-IN ════════
// Redirect-based OAuth: Supabase sends the browser to Google, Google sends it
// back to this same page with a token in the URL, and onAuthStateChange
// (already wired above) picks up the resulting session automatically, no
// separate callback page needed.
async function signInWithGoogle() {
  if (!sbClient) {
    toast(sbClientMissingMsg ? sbClientMissingMsg() : 'Cloud sign-in unavailable in this preview', 'error');
    return;
  }
  const btn = document.getElementById('authGoogleBtn');
  if (btn) { btn.disabled = true; }
  markInteractiveSignIn();
  try {
    const { error } = await sbClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Send the browser back to wherever it is right now (works whether
        // you're on the Vercel domain, the kesug mirror, or localhost) -
        // as long as that exact origin is in Supabase's redirect URL allowlist.
        redirectTo: window.location.origin + window.location.pathname,
      },
    });
    if (error) {
      toast('Google sign-in failed: ' + error.message, 'error');
      if (btn) btn.disabled = false;
    }
    // On success the page navigates away to Google, so nothing else to do here.
  } catch (e) {
    toast('Google sign-in failed', 'error');
    if (btn) btn.disabled = false;
  }
}
if (typeof window.signInWithGoogle === 'undefined') window.signInWithGoogle = signInWithGoogle;

async function manualSync() {
  if (!supabaseUser) { openAuthModal(); return; }
  // Being offline is not a sync error, it is the reason there cannot be one
  // yet. "Sync error: Failed to fetch" describes the plumbing; this describes
  // the situation, and says what happens next without the user asking.
  if (!navigator.onLine) {
    updateSyncDot('offline');
    const n = (typeof pendingSyncCount === 'function') ? pendingSyncCount() : 0;
    toast(n ? ('You are offline. ' + n + ' change' + (n === 1 ? '' : 's') + ' will go up when you reconnect.')
            : 'You are offline. Everything is saved on this device.', 'error');
    return;
  }
  // Push first so any local edit made just before tapping "Sync" (within the
  // 1.5s debounce window) isn't immediately overwritten by the pull below.
  clearTimeout(syncDebounceTimer);
  const TIMEOUT_MS = 15000;
  const withTimeout = (p, label) => Promise.race([
    p,
    new Promise((_, reject) => setTimeout(() => reject(new Error(label + ' timed out after 15s, check your connection or Supabase project status')), TIMEOUT_MS)),
  ]);
  try {
    await withTimeout(pushToCloud(), 'Push');
    await withTimeout(pullFromCloud(), 'Pull');
    renderAll();
    toast(lastSyncError ? 'Sync finished with an error' : 'Synced!', lastSyncError ? 'error' : 'success');
  } catch (e) {
    if (!navigator.onLine) {
      updateSyncDot('offline');
      toast('You went offline mid-sync. It will finish when you reconnect.', 'error');
      return;
    }
    console.error('Manual sync failed:', e);
    lastSyncError = (e && e.message) || 'Unknown error';
    updateSyncDot('error');
    toast('Sync failed: ' + lastSyncError, 'error');
  }
}

// A bare coloured dot can't say WHAT it means, green and grey look like
// decoration. These are real glyphs: tick = everything is on the server,
// arrows = uploading right now, cloud-with-slash = offline so edits are held
// locally, "!" = the last sync actually failed. Pending-but-online gets its
// own up-arrow so "not sent yet" reads differently from "can't send".
const SYNC_ICONS = {
  synced:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  syncing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-6.2-8.6"/></svg>',
  pending: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
  offline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.3A8 8 0 0 0 9 4"/><path d="M3 3l18 18"/><path d="M6.7 8A8 8 0 0 0 9 20h9a5 5 0 0 0 3.6-8.5"/></svg>',
  error:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><line x1="12" y1="7" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
};
const SYNC_TITLES = {
  synced:  'All changes saved to your account',
  syncing: 'Syncing…',
  pending: 'Changes waiting to upload',
  offline: 'Offline, changes are saved on this device',
  error:   'Sync failed, changes are safe on this device',
};

function updateSyncDot(status) {
  syncStatus = status;
  const dot = el('syncDot');
  if (!dot) return;
  if (!supabaseUser) { dot.style.display = 'none'; return; }
  dot.style.display = 'flex';

  // Offline beats everything except an in-flight sync: if there's no
  // connection, "pending" is the honest state, not an error.
  let visual = status;
  if (status !== 'syncing') {
    if (!navigator.onLine) visual = 'offline';
    else if (status === 'synced' && pendingSyncCount() > 0) visual = 'pending';
  }
  dot.className = 'sync-dot ' + visual;
  dot.innerHTML = SYNC_ICONS[visual] || SYNC_ICONS.synced;
  dot.setAttribute('title', SYNC_TITLES[visual] || '');
  dot.setAttribute('aria-label', SYNC_TITLES[visual] || '');
  updateSyncLabels();
}
// Reflect connection changes immediately instead of waiting for the next sync.
window.addEventListener('online',  () => updateSyncDot(syncStatus));
window.addEventListener('offline', () => updateSyncDot(syncStatus));

function updateSyncLabels() {
  const lbl = lastSyncTime
    ? 'Last synced: ' + lastSyncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'Last synced: never';
  if (el('acctLastSync')) el('acctLastSync').textContent = lbl;
  const timeEl = el('syncCenterTime');
  if (timeEl) timeEl.textContent = lastSyncTime ? lastSyncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'never';
  const subEl = el('settingsSyncSub');
  const btn = el('settingsSyncBtn');
  const isOnline = !!supabaseUser;
  const pending = pendingSyncCount();
  if (subEl) {
    const statusWord = !isOnline ? 'Offline' : syncStatus === 'error' ? 'Sync error' : syncStatus === 'syncing' ? 'Syncing…' : pending > 0 ? pending + ' pending' : 'Synced';
    const timeTxt = lastSyncTime ? lastSyncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'never';
    subEl.innerHTML = statusWord + (statusWord === 'Synced' || statusWord === 'Syncing…' ? ', ' + timeTxt : '');
    subEl.style.color = !isOnline ? 'var(--text3)' : syncStatus === 'error' ? 'var(--red)' : pending > 0 ? 'var(--accent)' : 'var(--text3)';
  }
  if (btn) btn.classList.toggle('ico-spin', syncStatus === 'syncing');
  const pillEl = el('syncCenterPendingPill');
  if (pillEl) {
    if (pending > 0) { pillEl.style.display = 'inline-flex'; pillEl.textContent = pending + ' pending'; }
    else pillEl.style.display = 'none';
  }
}

// ════════ PUBLIC API EXPORT ════════
// Everything above is declared inside the `else { ... }` block of the
// double-load guard. Plain `function foo()` declarations still reach the
// global object from inside a block, via Annex B web-compat hoisting, but
// that hoisting covers FunctionDeclaration ONLY. It does NOT cover
// AsyncFunctionDeclaration. So every `async function` here stayed
// block-scoped and never became a window property, while every plain one did.
//
// index.html then runs its offline fallback shim, sees `typeof
// window.pushToCloud !== 'function'`, and installs a no-op in its place.
// The result was that the async half of this module was silently replaced by
// stubs for every caller outside this file:
//
//   • "Sync Now" called the stub and answered "Cloud sync unavailable in
//     this preview", the button could never work.
//   • The Refresh button's pullFromCloud() did nothing, so a refresh never
//     picked up changes made on another device.
//   • The beforeunload flush did nothing, so edits made in the last 1.5s
//     before closing the tab were never pushed.
//   • Clear All Data never cleared the cloud copy.
//
// Calls made *within* this file resolved to the real block-scoped functions,
// which is why automatic debounced push and the post-sign-in pull kept
// working, and why the breakage was invisible from the outside.
//
// Assigning the public surface explicitly is hoisting-independent and matches
// the contract stated at the top of this file. Keep this list in sync when
// adding a public function; the check below fails loudly in the console
// rather than silently degrading to a stub.
Object.assign(window, {
  paintPendingBadges,
  initSupabase, pushToCloud, pullFromCloud, schedulePush, manualSync,
  loadCloudCache, updateSyncDot, updateSyncLabels, importLocalToCloud,
  discardLocalStartFresh, showImportLocalPrompt, signInWithGoogle,
  pendingSyncCount, isPendingSync, pauseSync, resumeSync,
});
(function verifyExports() {
  const missing = ['initSupabase','pushToCloud','pullFromCloud','schedulePush','manualSync',
    'signInWithGoogle','importLocalToCloud','pendingSyncCount','isPendingSync']
    .filter(n => typeof window[n] !== 'function' || /^\s*(async\s+)?function\s*\(\s*\)\s*\{\s*\}\s*$/.test(String(window[n])));
  if (missing.length) console.error('[sync] Public API not exported correctly:', missing);
})();

} // end window.__paisafolioSupabaseLoaded guard