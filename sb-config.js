// ════════ SUPABASE CONNECTION ════════
// Fill these in to turn on accounts and cloud sync. Leave them empty and the
// app still works: everything is stored on the device, and the only thing you
// lose is signing in and syncing between devices.
//
// Both index.html and admin.html load this file before anything that needs
// it, so the connection lives in one place and rotating the key is one edit.
//
// Where to find them:
//   Supabase dashboard → your project → Settings → API
//     • Project URL      → SB_URL
//     • anon / public key → SB_ANON
//
// The anon key belongs here. It ships in the page either way, and row level
// security is what actually protects the data, which schema.sql sets up on
// every table. The service_role key is the one that must NEVER be in this
// file, or in any file the browser downloads. It goes in a server environment
// variable; see .env.example.
window.SB_URL = '';
window.SB_ANON = '';
