// ════════════════════════════════════════════════════════════════════════
// PROVING SOMEONE IS THE ADMIN
// ════════════════════════════════════════════════════════════════════════
// The browser sends its Supabase access token. This asks Supabase who that
// token belongs to, then reads that person's row with the service role to see
// whether they are an admin.
//
// Two things it deliberately does NOT do:
//
//  - trust anything the client says about itself. A `role` sent in the body,
//    or read from a table the client can write, is a request, not a fact.
//  - decode the JWT locally. Supabase's own /auth/v1/user endpoint is the
//    only thing that can tell us the token is real and unexpired.
//
// So the admin flag lives in `profiles.role`, a column no client policy can
// UPDATE, and is only ever read here.

const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const SERVICE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
const ANON_KEY = (process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

function base() { return SUPABASE_URL.replace(/\/+$/, ''); }
function configured() { return !!(SUPABASE_URL && SERVICE_KEY); }

function bearerFrom(req) {
  const h = req.headers.authorization || req.headers.Authorization || '';
  const m = /^Bearer\s+(.+)$/i.exec(String(h).trim());
  return m ? m[1].trim() : '';
}

async function whoIs(token) {
  const res = await fetch(base() + '/auth/v1/user', {
    headers: { apikey: ANON_KEY || SERVICE_KEY, Authorization: 'Bearer ' + token },
  });
  if (!res.ok) return null;
  const u = await res.json();
  return (u && u.id) ? { id: u.id, email: u.email || '' } : null;
}

async function roleOf(userId) {
  const res = await fetch(base() + '/rest/v1/profiles?select=role&user_id=eq.' + encodeURIComponent(userId), {
    headers: { apikey: SERVICE_KEY, Authorization: 'Bearer ' + SERVICE_KEY },
  });
  if (!res.ok) return null;
  const rows = await res.json();
  return (Array.isArray(rows) && rows[0] && rows[0].role) || 'user';
}

// Returns { ok:true, user } or { ok:false, status, error }.
async function requireAdmin(req) {
  if (!configured()) {
    return { ok: false, status: 503, error: 'Admin is not set up on this deployment.',
      detail: 'Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the Vercel project, then redeploy.' };
  }
  const token = bearerFrom(req);
  if (!token) return { ok: false, status: 401, error: 'Sign in first.' };
  let user = null;
  try { user = await whoIs(token); } catch (e) { return { ok: false, status: 502, error: 'Could not verify the session.' }; }
  if (!user) return { ok: false, status: 401, error: 'That session is not valid any more.' };
  let role = 'user';
  try { role = await roleOf(user.id); } catch (e) { return { ok: false, status: 502, error: 'Could not read your role.' }; }
  if (role !== 'admin') return { ok: false, status: 403, error: 'This area is for administrators.' };
  return { ok: true, user: { ...user, role } };
}

// Service-role REST helper, for the admin endpoint only.
async function sql(path, init) {
  const res = await fetch(base() + '/rest/v1/' + path, {
    ...init,
    headers: {
      apikey: SERVICE_KEY, Authorization: 'Bearer ' + SERVICE_KEY,
      'Content-Type': 'application/json',
      ...((init && init.headers) || {}),
    },
  });
  return res;
}

// Never send a key back to a browser, not even to the admin's. The last four
// characters are enough to tell two keys apart when swapping one out.
function maskKey(k) {
  const s = String(k || '');
  if (!s) return '';
  if (s.length <= 8) return '****';
  return s.slice(0, 3) + '…' + s.slice(-4);
}

module.exports = { requireAdmin, sql, maskKey, configured, base };
