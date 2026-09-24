// Supabase auth and cloud sync. Reads/writes the app's global `state`, split across
// the tables in schema.sql. Wrapped in a guard so a second load is a no-op.
if (window.__paisafolioSupabaseLoaded) {
  console.warn('supabase.js loaded more than once, skipping duplicate execution. ' +
    'This usually means a stale cached copy is being served; a hard refresh (Ctrl/Cmd+Shift+R) will fix it.');
} else {
window.__paisafolioSupabaseLoaded = true;

// From sb-config.js; empty means local-only (no sign-in or sync).
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


// Per-row "not synced yet" ids, cleared when the push that carried them lands.
window.pendingSyncIds = { assets: new Set(), debts: new Set(), goals: new Set(), recurs: new Set(), transactions: new Set(), spends: new Set() };
window.lastSyncError = null;

// Only a real sign-in (password, OAuth redirect, email-confirm link) may show the
// merge prompt; a restored session may not. localStorage so the confirm link's new
// tab sees it; timestamped so a stale flag expires.
const INTERACTIVE_SIGNIN_KEY = 'pf_interactive_signin';
const INTERACTIVE_SIGNIN_MAX_AGE_MS = 15 * 60 * 1000; // 15 minutes
window.markInteractiveSignIn = function () {
  try { localStorage.setItem(INTERACTIVE_SIGNIN_KEY, String(Date.now())); } catch (e) {}
};
// Lets doLogin/doRegister await the pulled data, not just the auth handshake.
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

// Row fingerprints at the last push/pull: { kind: Map(id -> json) }.
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

// Mark only rows that changed since the last sync.
function snapshotPendingSync() {
  if (!supabaseUser) return;
  SYNC_KINDS.forEach(kind => {
    const known = fingerprintsFor(kind);
    (state[kind] || []).forEach(item => {
      if (!item || item.id == null) return;
      // No baseline yet: everything is pending.
      if (!known) { pendingSyncIds[kind].add(item.id); return; }
      const prev = known.get(item.id);
      if (prev === undefined || prev !== JSON.stringify(item)) pendingSyncIds[kind].add(item.id);
      else pendingSyncIds[kind].delete(item.id);
    });
    // Deleted locally: the delete itself is pending.
  });
  refreshPendingSyncUI();
}
// Use the snapshot taken when the push began, not current `state`: edits made during
// the round trip must stay pending. Re-sending a row is harmless; losing one is not.
function markAllSynced(sentSnapshot) {
  if (sentSnapshot) syncedFingerprints = sentSnapshot;
  else captureSyncedFingerprints();
  clearAllPendingSync();
  // Re-queue edits made mid-push.
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
// Toggle badges in place; only a changed row count needs a full renderAll().
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
const PENDING_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" '
  + 'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
  + '<path d="M20 16.6A4.5 4.5 0 0 0 17.5 8h-1.3A7 7 0 1 0 4 14.9"/>'
  + '<polyline points="9 15 12 12 15 15"/><line x1="12" y1="12" x2="12" y2="21"/></svg>';
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
    // The library did not load; the app still works fully offline.
    console.warn('Supabase library unavailable (vendor/supabase-js.umd.js did not load), running local-only.');
    updateSyncDot('offline');
    window.__paisafolioSbLoadFailed = true;
    return;
  }
  try {
    sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Tells the getSession() fallback that the listener already took this session.
    let authListenerHandledInitialSession = false;

    sbClient.auth.onAuthStateChange(async (event, session) => {
      const prevUser = supabaseUser;
      supabaseUser = session?.user || null;
      updateAuthUI();
      try { if (typeof refreshAdminRole === 'function') refreshAdminRole(); } catch (e) {}
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && supabaseUser && !prevUser) {
        authListenerHandledInitialSession = true;
        // Only a user-initiated sign-in may prompt.
        const isInteractive = consumeInteractiveSignIn();
        loadCloudCache(supabaseUser.id);
        renderAll();
        // OAuth sign-ins land here too, so close the auth modal here.
        authRequired = false;
        try { closeAuthModal(); } catch (e) {}
        if (isInteractive) toast('Signed in! Syncing data…', 'success');

        // No prompt here: the account's own cache is this device's offline copy, and the
        // guest key is never touched by a signed-in flow.
        await pullFromCloud(isInteractive);
        renderAll();
        renderSettings();
        if (window._signInReadyResolve) { window._signInReadyResolve(); window._signInReadyResolve = null; }
      } else if (event === 'PASSWORD_RECOVERY') {
        // Recovery links sign the user in; open the new-password sheet.
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
      // onAuthStateChange is the source of truth and may already have run with a newer
      // session; only adopt getSession()'s result if it agrees or we have none.
      if (!supabaseUser || !session || session.user?.id === supabaseUser.id) {
        supabaseUser = session?.user || supabaseUser || null;
      }
      updateAuthUI();
      try { if (typeof refreshAdminRole === 'function') refreshAdminRole(); } catch (e) {}
      // Yield once so an in-flight auth callback can claim this sign-in; pulling twice
      // would skip the merge prompt.
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
    // Device prefs come from their own store, not the guest blob.
    if (typeof loadDevicePrefs === 'function') loadDevicePrefs();
    state.settings.onboarded = true;
  } catch (e) {}
}

// Rows keep a few queryable columns plus the app object as-is in `data`.

function assetToRow(a, userId) {
  return {
    id: a.id, user_id: userId, category: a.category || null,
    name: a.name || null, qty: a.qty ?? null, buy_price: a.buyPrice ?? null,
    value: a.value ?? null, data: a,
  };
}
function rowToAsset(r) { return { ...r.data, id: r.id }; }

// Unknown debt types go up as NULL rather than failing the batch on the check constraint.
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

// Spending has its own table; old builds wrote it to transactions, still read for migration.
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
// Habits' source of truth is the settings blob; this table is a write-only mirror.
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

// Diff-based sync per table. Deletes are soft (deleted_at), recoverable for 30 days.
async function syncTable(table, userId, items, toRow, bypassWipeGuard = false) {
  const { data: existingRows, error: fetchErr } = await sbClient
    .from(table).select('id').eq('user_id', userId).is('deleted_at', null);
  if (fetchErr) throw fetchErr;

  const existingIds = new Set((existingRows || []).map(r => r.id));
  const currentIds = new Set(items.map(i => i.id));

  // Refuse a push that empties a table that had 3+ rows: that is usually clobbered
  // local state, not deliberate deletes. Clear All Data bypasses it.
  const WIPE_GUARD_MIN_ROWS = 3;
  if (!bypassWipeGuard && items.length === 0 && existingIds.size >= WIPE_GUARD_MIN_ROWS) {
    console.warn(
      `[sync] Refusing to clear all ${existingIds.size} "${table}" rows: local list is empty ` +
      `but the server has ${existingIds.size} (>= ${WIPE_GUARD_MIN_ROWS}). This is treated as a ` +
      `local-state fault, not a delete. Nothing was removed.`
    );
    throw new Error(`Sync stopped: local "${table}" was unexpectedly empty while the cloud still had ${existingIds.size} item(s). Your cloud data was left untouched, try Sync Now again once your data is back, or use Sync Center to overwrite the cloud copy on purpose.`);
  }

  // Large deletions are logged, not blocked.
  if (existingIds.size >= 5) {
    const deletingCount = [...existingIds].filter(id => !currentIds.has(id)).length;
    if (deletingCount / existingIds.size > 0.6) {
      console.warn(`[sync] Large delete detected on "${table}": ${deletingCount}/${existingIds.size} rows.`);
    }
  }

  const toDelete = [...existingIds].filter(id => !currentIds.has(id));

  // Drop rows without an id and clamp columns the schema requires >= 0, so one bad
  // row cannot stall the batch.
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
        // Sells are negative amounts.
        if (col === 'amount' && table === 'transactions') continue;
        if (col in row) row[col] = clampNonNeg(row[col]);
      }
      return row;
    });

  if (rows.length !== items.length) {
    console.warn(`[sync] Skipped ${items.length - rows.length} "${table}" item(s) with a missing id.`);
  }

  // Skip rows whose fingerprint matches the last sync.
  const known = (typeof fingerprintsFor === 'function') ? fingerprintsFor(kindForTable(table)) : null;
  // Index once instead of items.find() per row.
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
  // Also checked here: a timer can fire after pauseSync() cleared it.
  if (window.syncPaused && !bypassWipeGuard) return;
  if (pushInFlight) {
    // One push at a time; run again when this one finishes.
    pushQueuedAgain = true;
    return;
  }
  pushInFlight = true;
  updateSyncDot('syncing');
  // Before the first await; see markAllSynced().
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
    // A mirror; its failure must not fail the push.
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
          // Only this day's per-holding values.
          data: {
            assets: (((state.pnlHistory || []).find(x => x && x.date === today) || {}).assets) || {},
            // Includes the job's readings from the last pull.
            intraday: (state.intraday || []).filter(x => x && Number(x.t) > 0),
          },
        }, { onConflict: 'user_id,snapshot_date' });
      if (nwErr) throw nwErr;
    }

    // The recipe api/snapshot.js re-prices while the app is closed. Optional: failure
    // only costs the background readings.
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

    // Account-level choices that follow the user across devices.
    const st = state.settings || {};
    const profileRow = {
      user_id: uid, email: supabaseUser.email || null,
      currency: st.currency || 'NPR',
      base_currency: st.baseCurrency || 'NPR',
      fonts: { text: st.fontText || null, numbers: st.fontNum || null },
      updated_at: new Date().toISOString(),
    };
    if ((st.displayName || '').trim()) profileRow.full_name = st.displayName.trim().slice(0, 80);
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

// Null skips the snapshot row.
function computeNetWorthForSync() {
  try {
    if (typeof getNetWorth === 'function') return getNetWorth();
    if (typeof calcNetWorth === 'function') return calcNetWorth();
  } catch (e) {}
  return null;
}

// Null: the scheduled job has never written for this account.
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

// Union of the last two days' cloud readings with this device's; newest write per slot wins.
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
    // Older schemas have no spends table; fall back to transactions.
    if (spendRes.error) console.warn('[sync] spends table unavailable, reading spending from transactions:', spendRes.error.message || spendRes.error);
    // Legacy spends in transactions move to spends on the next push.
    const legacySpends = (txRes.data || []).map(rowToTx).filter(t => t._k === SPEND_MARK);
    const cloudSpends = (!spendRes.error && (spendRes.data || []).length)
      ? (spendRes.data || []).map(rowToSpend)
      : legacySpends;
    // settings: PGRST116 = no row yet, not a real error
    if (settingsRes.error && settingsRes.error.code !== 'PGRST116') throw settingsRes.error;

    // Real records only. The settings row exists forever once synced, so counting it
    // would make every account look non-empty.
    const hasCloudData = (assetsRes.data?.length || 0) > 0
      || (debtsRes.data?.length || 0) > 0
      || (goalsRes.data?.length || 0) > 0
      || (recurRes.data?.length || 0) > 0
      || (txRes.data?.length || 0) > 0
      || (spendRes.data?.length || 0) > 0;

    if (hasCloudData) {
      // Cloud has data: it becomes the session; guest storage is left alone.
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
        // Per-holding values, so a new device has Daily P&L history.
        pnlHistory: (nwRes.data || []).map(r => {
          const pt = { date: r.snapshot_date, netWorth: r.net_worth };
          const av = r.data && r.data.assets;
          if (av && typeof av === 'object' && Object.keys(av).length) pt.assets = av;
          return pt;
        }),
        // The 1D view; mostly the scheduled job's readings.
        intraday: cloudIntraday(nwRes.data),
        // For the Sync Center's background-job status.
        cronSeenAt: lastCronAt(nwRes.data),
        settings: settingsRes.data ? { ...settingsRes.data.data } : state.settings,
        lastUpdated: new Date().toISOString(),
      };
      // Same list as loadCloudCache: never adopt another device's view prefs.
      const keepLocal = {};
      const keys = (typeof DEVICE_PREF_KEYS !== 'undefined' && DEVICE_PREF_KEYS)
        || ['theme','hideBalance','haptics','reduceMotion'];
      keys.forEach(k => { if (localSettings[k] !== undefined) keepLocal[k] = localSettings[k]; });
      state.settings = { ...state.settings, ...keepLocal, onboarded: true };
      if (typeof adoptViewPrefs === 'function') adoptViewPrefs();

      // Habits are merged by union, check-ins OR'd, so neither device loses a tick.
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
      // Empty account: still apply saved preferences so sign-in keeps currency/theme.
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
      // Read the guest key directly: `state` already holds this account's cache.
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
        // `state` may still be guest data here; freeze sync until the user decides.
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
          // Declined: clear `state` so the guest data is not pushed. The guest key stays.
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

// Legacy no-op; openSyncConfirm handles this now.
function showImportLocalPrompt() {}
async function importLocalToCloud() { await pushToCloud(); toast('Local data imported to your account!', 'success'); }
async function discardLocalStartFresh() { /* no-op: cancel now just leaves things as they are */ }

// True while a sign-in decision is pending, so guest data is not uploaded unasked.
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

// Redirect OAuth; onAuthStateChange picks up the session on return.
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
        // Return to this origin; it must be in Supabase's redirect allowlist.
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
  // Offline is not an error.
  if (!navigator.onLine) {
    updateSyncDot('offline');
    const n = (typeof pendingSyncCount === 'function') ? pendingSyncCount() : 0;
    toast(n ? ('You are offline. ' + n + ' change' + (n === 1 ? '' : 's') + ' will go up when you reconnect.')
            : 'You are offline. Everything is saved on this device.', 'error');
    return;
  }
  // Push first so a just-made edit is not overwritten by the pull.
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

// tick = synced, arrows = syncing, slashed cloud = offline, ! = failed, up-arrow = pending.
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

  // Offline reads as pending, not error.
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

// Async functions declared in a block are not hoisted to window (Annex B covers only
// plain functions), so export the public API explicitly. Keep this list complete; the
// check below warns if index.html's fallback stub would take over.
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