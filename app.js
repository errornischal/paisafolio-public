// Paisafolio app script. A classic script, not a module: inline onclick= handlers need globals.
// ICONS
const ICONS={
  search:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  bitcoin:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.858 4.873m1.220-11.867c4.924.868 6.140-6.026 1.216-6.894m-1.216 6.894L4.641 9.132m7.126 4.055-.858-4.873"/></svg>`,
  coins:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>`,
  trending:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  gold:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  home:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  banknote:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>`,
  building:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>`,
  land:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
  car:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-3"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>`,
  laptop:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>`,
  piggy:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h0"/></svg>`,
  shield:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  trophy:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>`,
  leaf:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  gift:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"/><rect width="20" height="5" x="2" y="7"/><line x1="12" x2="12" y1="22" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`,
  heart:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  rocket:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  diamond:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>`,
  zap:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  target:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  briefcase:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  wallet:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>`,
  chartline:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  graduation:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  sun:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`,
  box:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
  clock:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  alert:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9.25"/><line x1="12" y1="7.25" x2="12" y2="13"/><circle cx="12" cy="16.9" r="1.15" fill="currentColor" stroke="none"/></svg>`,
};
const ICON_KEYS=Object.keys(ICONS);
const ASSET_TYPES=[
  {id:'crypto',label:'Crypto',color:'#f5a623',bg:'rgba(245,166,35,.12)',svg:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>`},
  {id:'stock',label:'Stocks',color:'#4a9eff',bg:'rgba(74,158,255,.12)',svg:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`},
  {id:'commodity',label:'Commodity',color:'#ffd700',bg:'rgba(255,215,0,.12)',svg:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`},
  {id:'liquidity',label:'Liquidity',color:'#00c896',bg:'rgba(0,200,150,.12)',svg:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>`},
  {id:'property',label:'Property',color:'#a78bfa',bg:'rgba(167,139,250,.12)',svg:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`},
  {id:'other',label:'Other',color:'#ff7b3a',bg:'rgba(255,123,58,.12)',svg:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`},
];
const PROPERTY_TYPES=[{id:'house',label:'House',icon:'home'},{id:'flat',label:'Flat/Apt',icon:'building'},{id:'land',label:'Land/Plot',icon:'land'},{id:'commercial',label:'Commercial',icon:'briefcase'}];
const COMMODITIES=[
  {id:'gold',label:'Gold',coinGeckoId:'tether-gold',unitOptions:['troy oz','gram','tola','kg'],defaultUnit:'gram'},
  {id:'silver',label:'Silver',coinGeckoId:'silver',unitOptions:['troy oz','gram','tola','kg'],defaultUnit:'gram'},
  {id:'oil',label:'Crude Oil',coinGeckoId:null,unitOptions:['barrel','litre'],defaultUnit:'barrel'},
  {id:'platinum',label:'Platinum',coinGeckoId:'platinum',unitOptions:['troy oz','gram'],defaultUnit:'gram'},
];
const UNIT_LABELS={'troy oz':'TROY OUNCES','gram':'GRAMS','tola':'TOLA','kg':'KILOGRAMS','barrel':'BARRELS','litre':'LITRES'};
function unitQtyLabel(u){return UNIT_LABELS[u]||String(u||'').toUpperCase();}
const UNIT_CONVERSIONS={'gram':{'troy oz':1/31.1035,'gram':1,'tola':1/11.664,'kg':0.001},'troy oz':{'troy oz':1,'gram':31.1035,'tola':31.1035/11.664,'kg':0.0311035},'tola':{'troy oz':11.664/31.1035,'gram':11.664,'tola':1,'kg':0.011664},'kg':{'troy oz':1000/31.1035,'gram':1000,'tola':1000/11.664,'kg':1}};

// STORAGE KEYS
let authCurrentTab = 'login';

function openAuthModal(required) {
  authRequired = !!required;
  el('authSkipWrap').style.display = required ? 'none' : 'block';
  switchAuthTab('login');
  clearAuthErrors();
  const m = el('authModal');
  m.classList.add('open');
  m.setAttribute('aria-hidden', 'false');
  syncBodyScrollLock();
  if(!required)pushModalHistory();
  setTimeout(() => { const f = el('authLoginEmail'); if(f) f.focus(); }, 180);
  warnIfFileProtocol();
}

// Auth needs fetch() to Supabase, which browsers block from file:// pages.
let _fileProtoWarned = false;
function warnIfFileProtocol(){
  if (location.protocol !== 'file:' || _fileProtoWarned) return;
  _fileProtoWarned = true;
  const box = el('authLoginErr') || el('authRegErr');
  if (box) {
    box.className = 'auth-err show';
    box.textContent = 'You\u2019re opening this file directly (file://), sign-in can\u2019t work from here. Serve this folder over http(s) (Vercel, a static host, or run a local server) and reload.';
  }
  toast('Auth needs the site served over http(s), not opened as a file', 'error');
}

// Supabase client missing: CDN blocked, supabase.js not loaded, or opened from file://.
function sbClientMissingMsg(){
  // A fresh copy of this app has no Supabase project behind it yet. That is
  // not a fault to apologise for, it is a setup step nobody has done, so say
  // which one.
  if (window.__paisafolioSbUnconfigured) {
    return 'This copy has no Supabase project connected yet, so there is nothing to sign in to. Everything you enter is saved on this device. To turn on accounts and sync, fill in sb-config.js, see README.md.';
  }
  if (location.protocol === 'file:') {
    return 'Sign-in can\u2019t work when the page is opened as a local file. Serve this site over http(s) and reload.';
  }
  if (!window.supabase) {
    return 'Couldn\u2019t load the sign-in library. Reload the page, if it keeps happening, the app files may not have finished downloading.';
  }
  return 'Sign-in isn\u2019t available right now, please reload the page.';
}

function closeAuthModal() {
  if (authRequired) return;
  const m = el('authModal');
  m.classList.remove('open');
  m.setAttribute('aria-hidden', 'true');
  syncBodyScrollLock();
  popModalHistoryIfNeeded();
}

function displayName(){
  const custom = (state.settings && state.settings.displayName || '').trim();
  if (custom) return custom;
  // Google sign-in supplies a name; fall back to the local part of the email.
  const meta = (supabaseUser && supabaseUser.user_metadata) || {};
  const fromProvider = (meta.full_name || meta.name || '').trim();
  if (fromProvider) return fromProvider;
  const email = (supabaseUser && supabaseUser.email) || '';
  return email ? email.split('@')[0] : 'Your account';
}
function openSyncCenter(){renderSyncCenter();openModal('syncCenterModal');}

function authIdentities(){
  const ids=(supabaseUser&&supabaseUser.identities)||[];
  return Array.isArray(ids)?ids:[];
}
function hasIdentity(provider){return authIdentities().some(i=>i&&i.provider===provider);}
function hasPasswordLogin(){
  // Supabase calls an email/password login an 'email' identity.
  return hasIdentity('email');
}
async function linkGoogle(){
  if(!sbClient||!supabaseUser){toast('Sign in first','error');return;}
  if(!navigator.onLine){toast('You are offline','error');return;}
  if(hasIdentity('google')){toast('Google is already connected','success');return;}
  try{
    const {error}=await sbClient.auth.linkIdentity({provider:'google',
      options:{redirectTo:window.location.origin+window.location.pathname}});
    if(error)throw error;
    // On success the browser leaves for Google and comes back signed in.
  }catch(e){
    const m=(e&&e.message)||'';
    toast(/manual linking|not enabled/i.test(m)
      ? 'Turn on Manual Linking in the Supabase auth settings first'
      : ('Could not connect Google: '+(m||'unknown error')),'error');
  }
}
async function unlinkGoogle(){
  if(!sbClient||!supabaseUser)return;
  const ids=authIdentities();
  const google=ids.find(i=>i&&i.provider==='google');
  if(!google){toast('Google is not connected','error');return;}
  if(ids.length<2||!hasPasswordLogin()){
    toast('Set a password first, or you would have no way back in','error');return;
  }
  if(!await askConfirm({title:'Disconnect Google?',
    message:'You will sign in with your email and password from then on.',
    confirmText:'Disconnect'}))return;
  try{
    const {error}=await sbClient.auth.unlinkIdentity(google);
    if(error)throw error;
    const {data}=await sbClient.auth.getUser();
    if(data&&data.user)supabaseUser=data.user;
    renderProfile();haptic('success');toast('Google disconnected','success');
  }catch(e){toast('Could not disconnect Google','error');}
}
function toggleGoogleLink(){hasIdentity('google')?unlinkGoogle():linkGoogle();}
let credMode=null;   // 'email' | 'password' | 'username'
// Lowercase handle, the only thing other users see.
function normalizeUsername(v){return (v||'').trim().toLowerCase().replace(/[^a-z0-9_]/g,'');}
function usernameProblem(v){
  if(v.length<3)return 'At least 3 characters.';
  if(v.length>24)return 'At most 24 characters.';
  if(!/^[a-z0-9_]+$/.test(v))return 'Letters, numbers and underscores only.';
  return null;
}
function openChangeUsername(){
  credMode='username';
  const changing=!!state.settings.username;
  el('credTitle').textContent=(changing?'Change Username':'Pick a Username');
  el('credNewLbl').textContent='USERNAME';
  el('credNew').type='text';
  el('credNew').maxLength=24;
  el('credNew').placeholder='lowercase, 3-24 characters';
  el('credNew').value=state.settings.username||'';
  el('credConfirmRow').style.display='none';
  // Changing an existing handle needs the password, like changing email.
  const needPw=changing&&hasPasswordLogin();
  const row=el('credPassRow');if(row)row.style.display=needPw?'':'none';
  el('credNote').textContent=needPw
    ? 'This is how you appear to anyone you share a portfolio with. Your password is checked first, because the handle you give up becomes free for anyone to take.'
    : 'This is how you appear to anyone you share a portfolio with, and how a friend finds you. Letters, numbers and underscores.';
  el('credPass').value='';el('credError').style.display='none';
  el('credSubmit').textContent='Save username';
  openModal('credModal');
}
async function saveUsername(){
  el('credError').style.display='none';
  const next=normalizeUsername(el('credNew').value);
  const bad=usernameProblem(next);
  if(bad){credFail(bad);return;}
  if(next===(state.settings.username||'')){closeModal('credModal');return;}
  const btn=el('credSubmit');
  const needPw=!!state.settings.username&&hasPasswordLogin();
  if(needPw){
    const pw=el('credPass').value||'';
    if(!pw){credFail('Enter your password.');return;}
    if(!sbClient||!supabaseUser){credFail('You are not signed in.');return;}
    if(!navigator.onLine){credFail('You are offline. Changing a handle needs a connection.');return;}
    btn.disabled=true;btn.textContent='Checking…';
    try{
      const {error}=await sbClient.auth.signInWithPassword({email:supabaseUser.email,password:pw});
      if(error){credFail('That password is not right.');return;}
    }catch(e){credFail('Could not check that password.');return;}
    finally{btn.disabled=false;btn.textContent='Save username';}
  }
  btn.disabled=true;btn.textContent='Checking…';
  // Could not check because offline is not a rejection.
  const offlineish=e=>!navigator.onLine||/fetch|network|timeout|connection/i.test((e&&e.message)||'');
  let unchecked=false;
  try{
    if(sbClient&&supabaseUser){
      const {data,error:qErr}=await sbClient.from('public_profiles')
        .select('user_id').eq('username',next).maybeSingle();
      if(qErr&&!offlineish(qErr))throw qErr;
      if(qErr)unchecked=true;
      else if(data&&data.user_id!==supabaseUser.id){credFail('That one is taken. Try another.');return;}
      if(!unchecked){
        const {error}=await sbClient.from('profiles')
          .upsert({user_id:supabaseUser.id,username:next,updated_at:new Date().toISOString()},{onConflict:'user_id'});
        if(error){
          if(/duplicate|unique/i.test(error.message||'')){credFail('That one is taken. Try another.');return;}
          if(!offlineish(error))throw error;
          unchecked=true;
        }
      }
    }else unchecked=true;
    state.settings.username=next;
    saveState();closeModal('credModal');haptic('success');
    // pushToCloud sends the username, so an unchecked name still reaches the server.
    toast(unchecked?('Saved as @'+next+'. It will sync when you are back online.'):('You are @'+next),'success');
    renderProfile();
  }catch(e){
    credFail('Could not save that username.');
  }finally{btn.disabled=false;btn.textContent='Save username';}
}
function openChangeEmail(){
  credMode='email';
  el('credTitle').textContent='Change Email';
  el('credNewLbl').textContent='NEW EMAIL';
  el('credNew').type='email';
  el('credNew').placeholder='you@example.com';
  el('credNew').value='';
  el('credConfirmRow').style.display='none';
  const row=el('credPassRow');if(row)row.style.display='';
  el('credNote').textContent='We send a confirmation link to the new address. The change only takes effect once you open it, so the old address keeps working until then.';
  el('credPass').value='';el('credError').style.display='none';
  el('credSubmit').textContent='Send confirmation';
  openModal('credModal');
}
function openChangePassword(){
  credMode='password';
  // Google-only accounts have no old password to confirm.
  const adding=!hasPasswordLogin();
  el('credTitle').textContent=adding?'Add a Password':'Change Password';
  el('credNewLbl').textContent=adding?'PASSWORD':'NEW PASSWORD';
  el('credNew').type='password';
  el('credNew').placeholder='At least 8 characters';
  el('credNew').value='';
  el('credConfirmRow').style.display='';
  el('credConfirm').value='';
  el('credNote').textContent=adding
    ? 'You signed up with Google, so this account has no password yet. Adding one lets you sign in either way.'
    : 'Your current password is checked first, so a signed-in phone left on a table cannot be used to lock you out of your own account.';
  const row=el('credPassRow');if(row)row.style.display=adding?'none':'';
  el('credPass').value='';el('credError').style.display='none';
  el('credSubmit').textContent=adding?'Add password':'Change password';
  openModal('credModal');
}
function credFail(msg){const e=el('credError');e.textContent=msg;e.style.display='';haptic('error');}
async function submitCredChange(){
  if(credMode==='name'){return saveDisplayNameFromSheet();}
  if(credMode==='username'){return saveUsername();}
  if(!sbClient||!supabaseUser){credFail('You are not signed in.');return;}
  if(!navigator.onLine){credFail('You are offline. This one needs a connection.');return;}
  const next=(el('credNew').value||'').trim();
  const pass=el('credPass').value||'';
  const btn=el('credSubmit');
  el('credError').style.display='none';
  if(!next){credFail(credMode==='email'?'Enter the new email.':'Enter the new password.');return;}
  if(credMode==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(next)){credFail('That does not look like an email address.');return;}
  if(credMode==='password'){
    if(next.length<8){credFail('Use at least 8 characters.');return;}
    if(next!==el('credConfirm').value){credFail('The two passwords do not match.');return;}
    if(pass&&next===pass){credFail('That is the password you already have.');return;}
  }
  const addingFirstPassword=(credMode==='password'&&!hasPasswordLogin());
  if(!pass&&!addingFirstPassword){credFail('Enter your current password.');return;}
  btn.disabled=true;btn.textContent='Checking…';
  try{
    // Re-authenticate first; Supabase would otherwise change email/password on any live session.
    if(!addingFirstPassword){
      const {error:authErr}=await sbClient.auth.signInWithPassword({email:supabaseUser.email,password:pass});
      if(authErr){credFail('That password is not right.');return;}
    }
    const payload=credMode==='email'?{email:next}:{password:next};
    const {error}=await sbClient.auth.updateUser(payload);
    if(error){credFail(error.message||'That did not work.');return;}
    closeModal('credModal');
    haptic('success');
    if(credMode==='email')toast('Check '+next+' for the confirmation link','success');
    else toast(addingFirstPassword?'Password added':'Password changed','success');
    if(addingFirstPassword){const {data}=await sbClient.auth.getUser();if(data&&data.user)supabaseUser=data.user;}
    renderProfile();
  }catch(e){
    credFail(navigator.onLine?'Could not reach the server.':'You are offline.');
  }finally{
    btn.disabled=false;
    btn.textContent=credMode==='email'?'Send confirmation':'Change password';
  }
}
// CIRCLE
// A connection is two rows, one per person; both must say 'accepted' before anything
// is visible, and either side can end it. What each person shares is a separate row,
// written by the data owner, starting empty. Enforced by RLS.
const CIRCLE_SCOPES=[
  {k:'networth',label:'Net worth',sub:'The single figure, and how it has moved'},
  {k:'goals',   label:'Goals',    sub:'What you are saving for and how far along'},
  {k:'habits',  label:'Habits',   sub:'Which habits you keep and your streaks'},
];
let circleState={links:[],shares:[],people:{},loaded:false,busy:false,found:null,err:''};
function circleId(){return supabaseUser&&supabaseUser.id;}
function circleReady(){return !!(sbClient&&circleId());}
// My row about them, and their row about me.
function circleMine(id){return circleState.links.find(l=>l.user_id===circleId()&&l.friend_id===id)||null;}
function circleTheirs(id){return circleState.links.find(l=>l.user_id===id&&l.friend_id===circleId())||null;}
function circleStatus(id){
  const m=circleMine(id),t=circleTheirs(id);
  if(m&&m.status==='blocked')return 'declined';
  const mOk=!!(m&&m.status==='accepted'), tOk=!!(t&&t.status==='accepted');
  if(mOk&&tOk)return 'friend';
  if(tOk&&!mOk)return 'incoming';
  if(mOk&&!tOk)return 'outgoing';
  return 'none';
}
function circleScopesFor(id){
  const r=circleState.shares.find(x=>x.owner_id===circleId()&&x.viewer_id===id);
  return (r&&Array.isArray(r.scopes))?r.scopes:[];
}
function circleTheirScopes(id){
  const r=circleState.shares.find(x=>x.owner_id===id&&x.viewer_id===circleId());
  return (r&&Array.isArray(r.scopes))?r.scopes:[];
}
function circlePerson(id){return circleState.people[id]||{user_id:id,username:null,full_name:null};}
function circleName(id){const p=circlePerson(id);return p.full_name||(p.username?'@'+p.username:'Someone');}

async function circleLoad(force){
  if(!circleReady())return;
  if(circleState.loaded&&!force)return;
  circleState.busy=true;circleState.err='';
  try{
    const uid=circleId();
    const [linkRes,shareRes]=await Promise.all([
      sbClient.from('friendships').select('user_id,friend_id,status,updated_at')
        .or('user_id.eq.'+uid+',friend_id.eq.'+uid),
      sbClient.from('portfolio_shares').select('owner_id,viewer_id,scopes')
        .or('owner_id.eq.'+uid+',viewer_id.eq.'+uid),
    ]);
    if(linkRes.error)throw linkRes.error;
    circleState.links=linkRes.data||[];
    // Older deployments lack the shares table; treat an error as no shares.
    circleState.shares=shareRes.error?[]:(shareRes.data||[]);
    const ids=[...new Set(circleState.links.map(l=>l.user_id===uid?l.friend_id:l.user_id))];
    if(ids.length){
      const {data,error}=await sbClient.from('public_profiles')
        .select('user_id,username,full_name,avatar_url').in('user_id',ids);
      if(!error)(data||[]).forEach(pr=>{circleState.people[pr.user_id]=pr;});
    }
    circleState.loaded=true;
  }catch(e){
    circleState.err=circleErr(e);
  }finally{ circleState.busy=false; }
}
// Missing tables means schema.sql has not been re-run.
function circleErr(e){
  const m=String((e&&(e.message||e.error_description))||e||'');
  if(/does not exist|schema cache|relation/i.test(m))
    return 'Circle is not set up on your database yet. Run schema.sql in Supabase and try again.';
  return m||'Something went wrong.';
}

async function circleSearch(){
  const inp=el('circleSearchInput');if(!inp)return;
  const q=String(inp.value||'').trim().replace(/^@/,'').toLowerCase();
  circleState.found=null;circleState.err='';
  if(!q){renderCircle();return;}
  if(!circleReady()){circleState.err='Sign in first.';renderCircle();return;}
  circleState.busy=true;renderCircle();
  try{
    const {data,error}=await sbClient.from('public_profiles')
      .select('user_id,username,full_name,avatar_url').eq('username',q).limit(1);
    if(error)throw error;
    const hit=(data||[])[0]||null;
    if(hit&&hit.user_id===circleId()){circleState.err='That is you.';}
    else if(!hit){circleState.err='No one is using @'+esc(q)+'.';}
    else{circleState.people[hit.user_id]=hit;circleState.found=hit;}
  }catch(e){ circleState.err=circleErr(e); }
  finally{ circleState.busy=false; renderCircle(); }
}
// Request and accept are the same write; which it is depends on their row.
async function circleSay(id,status){
  if(!circleReady())return false;
  try{
    const {error}=await sbClient.from('friendships')
      .upsert({user_id:circleId(),friend_id:id,status,updated_at:new Date().toISOString()},
        {onConflict:'user_id,friend_id'});
    if(error)throw error;
    await circleLoad(true);
    return true;
  }catch(e){ circleState.err=circleErr(e); renderCircle(); return false; }
}
async function circleAdd(id){
  const already=circleStatus(id);
  const ok=await circleSay(id,'accepted');
  if(ok){haptic('success');toast(already==='incoming'?'You are connected':'Request sent','success');
    circleState.found=null;const i=el('circleSearchInput');if(i)i.value='';
    // Net worth is shared by default; one tap turns it off.
    await circleShareDefault(id);}
  renderCircle();
}
// Only when no share row exists, so an explicit "off" stays off.
async function circleShareDefault(id){
  if(!circleReady())return;
  const row=circleState.shares.find(x=>x.owner_id===circleId()&&x.viewer_id===id);
  if(row)return;
  try{
    const scopes=['networth'];
    const {error}=await sbClient.from('portfolio_shares')
      .upsert({owner_id:circleId(),viewer_id:id,scopes,updated_at:new Date().toISOString()},
        {onConflict:'owner_id,viewer_id'});
    if(error)throw error;
    circleState.shares.push({owner_id:circleId(),viewer_id:id,scopes});
  }catch(e){ }
}
async function circleDecline(id){
  const ok=await circleSay(id,'blocked');
  if(ok){haptic('tap');toast('Request declined','success');}
  renderCircle();
}
// Leaving a live connection writes a no (so they don't see a new request); cancelling an
// unanswered request deletes the row.
async function circleRemove(id){
  const live=circleStatus(id)==='friend';
  if(!await askConfirm({title:live?('Remove '+esc(circleName(id))+'?'):'Cancel that request?',
    message:live?'They stop seeing anything of yours straight away. You can add them again whenever you like.'
      :'They will not see that you asked.',
    confirmText:live?'Remove':'Cancel request'}))return;
  if(!circleReady())return;
  try{
    const uid=circleId();
    await sbClient.from('portfolio_shares').delete().eq('owner_id',uid).eq('viewer_id',id);
    if(live){
      const {error}=await sbClient.from('friendships')
        .upsert({user_id:uid,friend_id:id,status:'blocked',updated_at:new Date().toISOString()},
          {onConflict:'user_id,friend_id'});
      if(error)throw error;
    }else{
      const {error}=await sbClient.from('friendships').delete().eq('user_id',uid).eq('friend_id',id);
      if(error)throw error;
    }
    await circleLoad(true);
    haptic('tap');toast('Removed from your circle','success');
    closeModal('circleFriendModal');
  }catch(e){ circleState.err=circleErr(e); toast(circleState.err,'error'); }
  renderCircle();
}
async function circleToggleScope(id,scope){
  if(!circleReady())return;
  const cur=circleScopesFor(id).slice();
  const i=cur.indexOf(scope);
  if(i>=0)cur.splice(i,1); else cur.push(scope);
  try{
    const {error}=await sbClient.from('portfolio_shares')
      .upsert({owner_id:circleId(),viewer_id:id,scopes:cur,updated_at:new Date().toISOString()},
        {onConflict:'owner_id,viewer_id'});
    if(error)throw error;
    const row=circleState.shares.find(x=>x.owner_id===circleId()&&x.viewer_id===id);
    if(row)row.scopes=cur; else circleState.shares.push({owner_id:circleId(),viewer_id:id,scopes:cur});
    haptic('tap');
    renderCircleFriend(id);
  }catch(e){ toast(circleErr(e),'error'); }
}

// RLS returns rows only if their share row and both connection rows allow it.
async function circleFetchShared(id){
  const out={networth:null,goals:null,habits:null,ccy:null,err:''};
  if(!circleReady())return out;
  const scopes=circleTheirScopes(id);
  try{
    const jobs=[];
    if(scopes.includes('networth')){
      jobs.push(sbClient.from('networth_history')
        .select('snapshot_date,net_worth').eq('user_id',id).order('snapshot_date',{ascending:true}).limit(400)
        .then(r=>{out.networth=r.error?null:(r.data||[]);}));
      // RPC answers only for someone allowed to see the figure; older databases lack it.
      if(sbClient.rpc)jobs.push(Promise.resolve(sbClient.rpc('shared_currency',{owner:id}))
        .then(r=>{out.ccy=(r&&!r.error&&r.data)?String(r.data):null;}).catch(()=>{}));
    }
    if(scopes.includes('goals'))jobs.push(sbClient.from('goals')
      .select('id,name,target,saved,data').eq('user_id',id).is('deleted_at',null)
      .then(r=>{out.goals=r.error?null:(r.data||[]);}));
    if(scopes.includes('habits'))jobs.push(sbClient.from('habits')
      .select('id,name,color,log').eq('user_id',id).is('deleted_at',null)
      .then(r=>{out.habits=r.error?null:(r.data||[]);}));
    await Promise.all(jobs);
  }catch(e){ out.err=circleErr(e); }
  return out;
}

// the sheets
function openCircle(){
  renderCircle();
  openModal('circleModal');
  circleLoad(true).then(renderCircle);
}
function circleAvatar(id,size){
  const p=circlePerson(id);
  const cls=size==='lg'?'acct-avatar-lg':'acct-avatar';
  const letter=esc((circleName(id)||'?').trim()[0].toUpperCase()||'?');
  if(!p.avatar_url)return `<span class="${cls}">${letter}</span>`;
  return `<span class="${cls} has-photo" role="button" tabindex="0" title="View photo"
    onclick="event.stopPropagation();openPhotoView('${jsAttr(p.avatar_url)}','${jsAttr(circleName(id))}')"><img alt="" src="${esc(p.avatar_url)}"/></span>`;
}
// Seeing a picture at the size it was taken
function openPhotoView(url,who){
  if(!url)return;
  const ov=el('photoView');if(!ov)return;
  const img=el('photoViewImg');
  if(img){img.src=url;img.alt=who?(who+'\u2019s photo'):'Photo';}
  const cap=el('photoViewName');if(cap)cap.textContent=who||'';
  openModal('photoView');
}
function closePhotoView(){
  closeModal('photoView');
  const img=el('photoViewImg');
  // Free the full-size image once the viewer closes.
  setTimeout(()=>{if(img&&!el('photoView').classList.contains('open'))img.removeAttribute('src');},320);
}
// A div: rows can contain Accept/Decline buttons.
function circlePersonRow(id,right,onclick){
  const p=circlePerson(id);
  const act=onclick?` role="button" tabindex="0" onclick="${onclick}"`:' style="cursor:default"';
  return `<div class="s-item circle-row"${act}>
    <span class="circle-ava">${circleAvatar(id)}</span>
    <span class="s-item-info"><span class="s-item-name">${esc(circleName(id))}</span>
    <span class="s-item-sub">${p.username?'@'+esc(p.username):'No handle yet'}</span></span>
    <span class="s-item-right">${right||''}</span></div>`;
}
function renderCircle(){
  const box=el('circleBody');if(!box)return;
  const uid=circleId();
  if(!uid){
    box.innerHTML='<div class="empty-state" style="padding:26px"><h3>Sign in first</h3>'
      +'<p>A circle needs an account on both sides. Everything else in Paisafolio works without one.</p></div>';
    return;
  }
  const meHandle=(state.settings&&state.settings.username)||'';
  let html='';
  // Without a handle nobody can find you, so that is the first thing to fix.
  if(!meHandle){
    html+='<div class="circle-note">'
      +'<b>Pick a username first.</b> It is how someone adds you, and the only '
      +'thing about you they can look up.'
      +'<button class="wiz-btn primary" style="margin-top:10px;width:100%" onclick="closeModal(\'circleModal\');setTimeout(openChangeUsername,220)">Pick a username</button></div>';
  }else{
    html+='<div class="circle-note">You are <b>@'+esc(meHandle)+'</b>. Share that and someone can add you.</div>';
  }
  html+=`<div class="circle-search">
    <input class="form-input" id="circleSearchInput" placeholder="Add someone by @username" autocomplete="off"
      onkeydown="if(event.key==='Enter'){event.preventDefault();circleSearch();}"/>
    <button class="wiz-btn primary" onclick="circleSearch()">Find</button></div>`;
  if(circleState.err)html+='<div class="circle-err">'+esc(circleState.err)+'</div>';
  if(circleState.found){
    const f=circleState.found;const st=circleStatus(f.user_id);
    const action=st==='friend'?'<span class="s-badge">In your circle</span>'
      :st==='outgoing'?'<span class="s-badge">Asked</span>'
      :`<button class="wiz-btn primary" style="padding:7px 13px" onclick="circleAdd('${esc(f.user_id)}')">${st==='incoming'?'Accept':'Add'}</button>`;
    html+='<div class="settings-sec-lbl" style="margin:14px 2px 6px">FOUND</div>'+circlePersonRow(f.user_id,action);
  }
  const others=[...new Set(circleState.links.map(l=>l.user_id===uid?l.friend_id:l.user_id))];
  const group=k=>others.filter(id=>circleStatus(id)===k);
  const incoming=group('incoming'),friends=group('friend'),outgoing=group('outgoing');
  if(incoming.length){
    html+='<div class="settings-sec-lbl" style="margin:16px 2px 6px">WANTS TO CONNECT</div>';
    html+=incoming.map(id=>circlePersonRow(id,
      `<span class="circle-acts"><button class="wiz-btn ghost" onclick="event.stopPropagation();circleDecline('${esc(id)}')">No</button>`
      +`<button class="wiz-btn primary" onclick="event.stopPropagation();circleAdd('${esc(id)}')">Accept</button></span>`)).join('');
  }
  html+='<div class="settings-sec-lbl" style="margin:16px 2px 6px">YOUR CIRCLE</div>';
  if(!friends.length){
    html+='<div class="empty-state" style="padding:20px"><p>No one yet. Add someone by their username and they will see it next time they open Paisafolio.</p></div>';
  }else{
    html+=friends.map(id=>{
      const mine=circleScopesFor(id).length;
      const sub=`<span class="circle-meta">${mine?'Sharing '+plural(mine,'thing','things'):'Sharing nothing'}</span>`;
      return circlePersonRow(id,sub+'<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>',
        `openCircleFriend('${esc(id)}')`);
    }).join('');
  }
  if(outgoing.length){
    html+='<div class="settings-sec-lbl" style="margin:16px 2px 6px">WAITING ON THEM</div>';
    html+=outgoing.map(id=>circlePersonRow(id,
      `<button class="wiz-btn ghost" onclick="event.stopPropagation();circleRemove('${esc(id)}')">Cancel</button>`)).join('');
  }
  if(circleState.busy)html+='<div class="circle-meta" style="text-align:center;padding:12px">Working…</div>';
  box.innerHTML=html;
  syncCircleBadge();
}
function syncCircleBadge(){
  const uid=circleId();
  const others=uid?[...new Set(circleState.links.map(l=>l.user_id===uid?l.friend_id:l.user_id))]:[];
  const n=others.filter(id=>circleStatus(id)==='incoming').length;
  const b=el('circleReqBadge');
  if(b){b.hidden=!n;b.textContent=String(n);}
  const sub=el('profCircleSub');
  if(sub)sub.textContent=n?plural(n,'person','people')+' waiting to connect'
    :(others.filter(id=>circleStatus(id)==='friend').length
      ?plural(others.filter(id=>circleStatus(id)==='friend').length,'person','people')+' in your circle'
      :'People you share with');
}
let circleViewId=null;
function openCircleFriend(id){
  circleViewId=id;
  el('circleFriendTitle').textContent=circleName(id);
  renderCircleFriend(id);
  openModal('circleFriendModal');   // the list stays behind it, to come back to
  circleFetchShared(id).then(d=>{ if(circleViewId===id)renderCircleFriend(id,d); });
}
function renderCircleFriend(id,shared){
  const box=el('circleFriendBody');if(!box)return;
  const theirs=circleTheirScopes(id);
  let html='<div style="display:flex;flex-direction:column;align-items:center;gap:8px;margin:2px 0 16px">'
    +circleAvatar(id,'lg')
    +'<div style="font-size:15px;font-weight:800;color:var(--text)">'+esc(circleName(id))+'</div>'
    +(circlePerson(id).username?'<div class="circle-meta">@'+esc(circlePerson(id).username)+'</div>':'')
    +'</div>';
  // From what actually came back, so a revoked scope is not shown.
  html+='<div class="settings-sec-lbl" style="margin:2px 2px 6px">WHAT THEY SHARE</div>';
  if(!theirs.length){
    html+='<div class="empty-state" style="padding:18px"><p>'+esc(circleName(id))+' is not sharing anything with you yet.</p></div>';
  }else if(!shared){
    html+='<div class="circle-card">'+skelLines(2,{h:14,widths:['46%','72%']})+skelSpark(54)+'</div>';
  }else{
    html+=circleSharedHtml(id,shared);
  }
  html+='<div class="settings-sec-lbl" style="margin:18px 2px 6px">WHAT THEY CAN SEE OF YOURS</div>';
  const mine=circleScopesFor(id);
  html+=CIRCLE_SCOPES.map(sc=>`<button class="s-item" onclick="circleToggleScope('${esc(id)}','${sc.k}')">
    <span class="s-item-info"><span class="s-item-name">${sc.label}</span><span class="s-item-sub">${sc.sub}</span></span>
    <span class="toggle${mine.includes(sc.k)?' on':''}" role="switch" aria-checked="${mine.includes(sc.k)}"></span></button>`).join('');
  html+='<button class="danger-btn" style="margin-top:16px" onclick="circleRemove(\''+esc(id)+'\')">Remove from circle</button>';
  box.innerHTML=html;
  syncSwitchRows(box);
}
function circleSharedHtml(id,d){
  const theirs=circleTheirScopes(id);
  let html='';
  if(theirs.includes('networth')){
    const rows=d.networth||[];
    const last=rows.length?num(rows[rows.length-1].net_worth):null;
    const first=rows.length?num(rows[0].net_worth):null;
    const chg=(last!=null&&first!=null&&first!==0)?((last-first)/Math.abs(first)*100):null;
    // Labelled in their own base currency; no symbol if the database cannot say which.
    const cc=d.ccy?String(d.ccy).toUpperCase():'';
    const cur=CURRENCIES.find(c=>c.code===cc);
    const amount=last==null?'Not shared yet'
      :((cur?cur.sym:(cc?cc+' ':''))+Math.round(last).toLocaleString());
    html+='<div class="circle-card"><div class="circle-card-lbl">NET WORTH</div>'
      +'<div class="circle-card-val">'+amount+'</div>'
      +((last!=null&&!cur)?'<div class="circle-meta">'+(cc?esc(cc):'in their own currency')+'</div>':'')
      +(chg!=null?'<div class="circle-meta" style="margin-top:4px;color:'+(chg>=0?'var(--green)':'var(--red)')+'">'
        +(chg>=0?'+':'')+chg.toFixed(1)+'% over '+plural(rows.length,'day','days')+'</div>':'')
      +(rows.length?circleSpark(rows.map(r=>num(r.net_worth))):'')
      +'</div>';
  }
  if(theirs.includes('goals')){
    const gs=d.goals||[];
    html+='<div class="circle-card"><div class="circle-card-lbl">GOALS</div>';
    html+=gs.length?gs.slice(0,8).map(g=>{
      const t=num(g.target),sv=num(g.saved);
      const pct=t>0?Math.min(100,sv/t*100):0;
      return `<div class="circle-goal"><div class="circle-goal-top"><span>${esc(g.name||'Goal')}</span>
        <span class="circle-meta">${Math.round(pct)}%</span></div>
        <div class="hb-prog-bar"><div class="hb-prog-fill" style="width:${pct}%;background:var(--accent)"></div></div></div>`;
    }).join(''):'<div class="circle-meta">Nothing yet.</div>';
    html+='</div>';
  }
  if(theirs.includes('habits')){
    html+='<div class="circle-card"><div class="circle-card-lbl">HABITS</div>'
      +circleHabitChart(d.habits||[])+'</div>';
  }
  return html||'<div class="circle-meta" style="padding:8px 2px">Nothing came back.</div>';
}
const CIRCLE_HB_DAYS=30;
function circleHabitChart(hs){
  const list=(hs||[]).slice(0,12);
  if(!list.length)return '<div class="circle-meta">Nothing yet.</div>';
  const d0=new Date();d0.setHours(12,0,0,0);
  const days=[];
  for(let i=CIRCLE_HB_DAYS-1;i>=0;i--){const dd=new Date(d0);dd.setDate(dd.getDate()-i);days.push(dayKey(dd));}
  const perDay=days.map(k=>list.reduce((n,h)=>n+((h&&h.log&&h.log[k])?1:0),0));
  const maxV=Math.max(1,...perDay);
  const kept=perDay.reduce((a,b)=>a+b,0);
  const possible=list.length*CIRCLE_HB_DAYS;
  const today=perDay[perDay.length-1];
  // Longest run any one of them is on, which is the fact a streak is for.
  let best=0;
  list.forEach(h=>{
    const log=(h&&h.log)||{};
    let n=0;const dd=new Date(d0);
    if(!log[dayKey(dd)])dd.setDate(dd.getDate()-1);
    while(log[dayKey(dd)]){n++;dd.setDate(dd.getDate()-1);}
    if(n>best)best=n;
  });
  const W=300,H=58;
  const path=hbSmoothPath(perDay,W,H,maxV);
  const area=path?path+`L${W},${H}L0,${H}Z`:'';
  const gid='chb'+Math.random().toString(36).slice(2,8);
  const legend=list.map(h=>`<span class="circle-hb-key"><i style="background:${esc(h.color||'#f5a623')}"></i>${esc(h.name||'Habit')}</span>`).join('');
  return `<div class="circle-hb-top">
      <div><b>${today}</b><span>of ${list.length} today</span></div>
      <div><b>${best}</b><span>day streak</span></div>
      <div><b>${possible?Math.round(kept/possible*100):0}%</b><span>kept, 30 days</span></div>
    </div>
    <svg class="circle-hb-chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-label="Habits kept each day over the last 30 days">
      <defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--accent)" stop-opacity=".30"/>
        <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
      </linearGradient></defs>
      ${area?`<path d="${area}" fill="url(#${gid})"/>`:''}
      ${path?`<path d="${path}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`:''}
    </svg>
    <div class="circle-hb-cap"><span>30 days ago</span><span>peak ${maxV} of ${list.length}</span><span>today</span></div>
    <div class="circle-hb-keys">${legend}</div>`;
}
function circleSpark(vals){
  if(!vals||vals.length<2)return '';
  const w=260,h=54,lo=Math.min(...vals),hi=Math.max(...vals),rng=(hi-lo)||1;
  const pts=vals.map((v,i)=>[(i/(vals.length-1))*w,h-((v-lo)/rng)*(h-10)-5]);
  const up=vals[vals.length-1]>=vals[0];
  const col=up?'var(--green)':'var(--red)';
  const gid='cs'+Math.random().toString(36).slice(2,8);
  const d=smoothPath(pts);
  const area=d+` L ${w} ${h} L 0 ${h} Z`;
  return `<svg class="circle-spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">`
    +`<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">`
    +`<stop offset="0" stop-color="${up?'rgb(22,214,164)':'rgb(255,91,117)'}" stop-opacity=".26"/>`
    +`<stop offset="1" stop-color="${up?'rgb(22,214,164)':'rgb(255,91,117)'}" stop-opacity="0"/>`
    +`</linearGradient></defs>`
    +`<path d="${area}" fill="url(#${gid})" stroke="none"/>`
    +`<path d="${d}" fill="none" stroke="${col}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>`;
}
// Catmull-Rom through the points, as cubic beziers.
function smoothPath(pts){
  if(pts.length<2)return '';
  if(pts.length===2)return `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)} L ${pts[1][0].toFixed(1)} ${pts[1][1].toFixed(1)}`;
  let d=`M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for(let i=0;i<pts.length-1;i++){
    const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||pts[i+1];
    const t=0.2;
    const c1=[p1[0]+(p2[0]-p0[0])*t,p1[1]+(p2[1]-p0[1])*t];
    const c2=[p2[0]-(p3[0]-p1[0])*t,p2[1]-(p3[1]-p1[1])*t];
    d+=` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

// PROFILE PHOTO
// Under 10KB is a generated initial tile, not a photo.
const AVATAR_MIN_BYTES=10*1024;
const AVATAR_PX=192;
let _avatarTried=false;
// Ask for a real size; the default =s96 thumbnail would fail the 10KB test.
function googleAvatarUrl(px){
  const meta=(supabaseUser&&supabaseUser.user_metadata)||{};
  const raw=String(meta.avatar_url||meta.picture||'').trim();
  if(!/^https:\/\//i.test(raw))return '';
  return raw.replace(/=s\d+(-c)?$/i,'=s'+(px||256)+'-c');
}
function hasGoogleAvatar(){return !!googleAvatarUrl(96);}
function avatarSrc(){return (state.settings&&state.settings.avatar)||'';}
// Re-encode small so it lives in settings and works offline.
async function shrinkImage(blob,px){
  try{
    const bmp=await createImageBitmap(blob);
    const side=Math.min(bmp.width,bmp.height);
    const c=document.createElement('canvas');
    c.width=c.height=px;
    const g=c.getContext('2d');
    g.imageSmoothingQuality='high';
    g.drawImage(bmp,(bmp.width-side)/2,(bmp.height-side)/2,side,side,0,0,px,px);
    if(bmp.close)bmp.close();
    return c.toDataURL('image/jpeg',0.82);
  }catch(e){return '';}
}
async function adoptGoogleAvatar(force){
  if(!supabaseUser)return false;
  if(!force){
    if(_avatarTried)return false;
    if(avatarSrc())return false;
    // Removed on purpose; don't re-adopt.
    if(state.settings.avatarOff)return false;
  }
  _avatarTried=true;
  const url=googleAvatarUrl(256);
  if(!url)return false;
  try{
    const res=await fetch(url,{mode:'cors',cache:'no-cache'});
    if(!res.ok)return false;
    const blob=await res.blob();
    if(!/^image\//.test(blob.type||''))return false;
    if(blob.size<=AVATAR_MIN_BYTES)return false;
    const data=await shrinkImage(blob,AVATAR_PX);
    if(!data||data.length<200)return false;
    state.settings.avatar=data;
    state.settings.avatarOff=false;
    saveState();
    updateAuthUI();renderProfile();renderSettings();
    return true;
  }catch(e){return false;}   // offline, blocked, an expired URL: keep the initial
}
// Only the Account and Profile Photo sheets open the full-size preview (tap==='view').
function paintAvatarInto(node,letter,tap){
  if(!node)return;
  const src=avatarSrc();
  node.classList.toggle('has-photo',!!src);
  if(src){
    const img=node.querySelector('img');
    if(img){if(img.src!==src)img.src=src;}
    else node.innerHTML='<img alt="" src="'+esc(src)+'"/>';
  }else{
    node.textContent=(letter||'?');
  }
  if(src&&tap==='view'){
    node.setAttribute('role','button');
    node.setAttribute('tabindex','0');
    node.setAttribute('title','View photo');
    node.onclick=(e)=>{e.stopPropagation();openPhotoView(avatarSrc(),displayName());};
  }else{
    // No handler of its own: the click belongs to whatever this sits inside.
    node.removeAttribute('role');node.removeAttribute('tabindex');node.removeAttribute('title');
    node.onclick=null;
  }
}
// Uploads have no size floor; the 10KB test is only for auto-adopted photos.
const AVATAR_MAX_UPLOAD=12*1024*1024;
function profilePhotoAction(){
  const body=el('photoModalBody');if(!body)return;
  const has=!!avatarSrc();
  const g=hasGoogleAvatar();
  const row=(fn,ico,name,sub,danger)=>`<button class="s-item" onclick="${fn}">
    <span class="s-item-ico" style="color:${danger?'var(--red)':'var(--accent)'}">${ico}</span>
    <span class="s-item-info"><span class="s-item-name"${danger?' style="color:var(--red)"':''}>${name}</span>
    <span class="s-item-sub">${sub}</span></span></button>`;
  const camera='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.2"/><path d="M8.5 6l1.2-2h4.6l1.2 2"/></svg>';
  const goog='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>';
  const bin='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>';
  let html='<div style="display:flex;justify-content:center;margin:2px 0 14px">'
    +'<div class="acct-avatar-lg" id="photoModalAvatar" style="width:72px;height:72px;font-size:26px"></div></div>';
  html+=row('pickAvatarFile()',camera,has?'Choose a different photo':'Upload a photo','From this device');
  if(g)html+=row('useGoogleAvatar()',goog,'Use my Google photo','The picture on your Google account');
  if(has)html+=row('removeAvatar()',bin,'Remove photo','Go back to your initial',true);
  body.innerHTML=html;
  paintAvatarInto(el('photoModalAvatar'),(displayName()||'?').trim()[0].toUpperCase()||'?','view');
  openModal('photoModal');
}
function pickAvatarFile(){const f=el('avatarFileInput');if(f){f.value='';f.click();}}
async function onAvatarPicked(e){
  const file=e&&e.target&&e.target.files&&e.target.files[0];
  if(!file)return;
  if(!/^image\//.test(file.type||'')){toast('That is not an image','error');return;}
  if(file.size>AVATAR_MAX_UPLOAD){toast('That image is too large','error');return;}
  // 192px square, same as Google's.
  const data=await shrinkImage(file,AVATAR_PX);
  if(!data){toast('Could not read that image','error');return;}
  state.settings.avatar=data;
  state.settings.avatarOff=false;
  saveState();updateAuthUI();renderProfile();renderSettings();
  const box=el('photoModalBody');
  if(box&&el('photoModal')&&el('photoModal').classList.contains('open'))profilePhotoAction();
  haptic('success');toast('Photo updated','success');
}
async function useGoogleAvatar(){
  const ok=await adoptGoogleAvatar(true);
  haptic(ok?'success':'error');
  toast(ok?'Photo updated':'No photo worth using on that account',ok?'success':'error');
  if(ok&&el('photoModal')&&el('photoModal').classList.contains('open'))profilePhotoAction();
}
async function removeAvatar(){
  if(!await askConfirm({title:'Remove your photo?',
    message:'Your initial goes back in its place. You can upload another, or take the Google one, whenever you like.',
    confirmText:'Remove'}))return;
  delete state.settings.avatar;
  state.settings.avatarOff=true;
  saveState();updateAuthUI();renderProfile();renderSettings();
  haptic('tap');toast('Photo removed','success');
  closeModal('photoModal');
}
function renderProfile(){
  // The Circle row lives in this sheet; refresh its subtitle and badge on open (cached after first load).
  try{
    syncCircleBadge();
    if(typeof circleLoad==='function')circleLoad().then(()=>{try{syncCircleBadge();}catch(e){}});
  }catch(e){}
  const email = (supabaseUser && supabaseUser.email) || '';
  const name = displayName();
  const av = el('acctAvatarLg');
  paintAvatarInto(av, (name || email || '?').trim()[0].toUpperCase() || '?', 'view');
  if (el('profPhotoSub')) el('profPhotoSub').textContent = avatarSrc()
    ? 'Set · tap to change or remove'
    : (hasGoogleAvatar() ? 'Upload one, or use your Google photo'
                         : 'Upload one from this device');
  if (el('acctNameDisplay')) el('acctNameDisplay').textContent = name;
  if (el('acctEmailDisplay')) el('acctEmailDisplay').textContent = email || 'Signed in';
  if (el('profNameSub')) el('profNameSub').textContent = name;
  if (el('profEmailSub')) el('profEmailSub').textContent = email || 'Not set';
  if (el('profUserSub')) el('profUserSub').textContent = state.settings.username
    ? '@' + state.settings.username : 'Not set · pick one';
  // Say which ways in this account actually has, and offer the missing one.
  const hasPw = hasPasswordLogin(), hasG = hasIdentity('google');
  if (el('profPassSub')) el('profPassSub').textContent = hasPw
    ? 'Change your password' : 'Not set yet · add one';
  if (el('profGoogleSub')) el('profGoogleSub').textContent = hasG
    ? (hasPw ? 'Connected · tap to disconnect' : 'Connected · your only way in')
    : 'Not connected · tap to connect';
  const pend = (typeof pendingChangeCount==='function') ? pendingChangeCount() : 0;
  if (el('profSyncSub')) el('profSyncSub').textContent = !navigator.onLine
    ? 'Offline' + (pend ? ', ' + pend + ' waiting' : '')
    : (pend ? pend + ' change' + (pend !== 1 ? 's' : '') + ' waiting' : 'Everything is synced');
  const badge = el('profSyncBadge');
  if (badge) { badge.textContent = pend || ''; badge.style.display = pend ? '' : 'none'; }

  // A few honest facts about the account, rather than a decorative header.
  const stats = el('profileStats');
  if (stats) {
    const assets = (state.assets || []).length;
    const debts = (state.debts || []).length;
    const goals = (state.goals || []).length;
    const txs = (state.transactions || []).length;
    const since = supabaseUser && supabaseUser.created_at ? new Date(supabaseUser.created_at) : null;
    const cells = [
      ['Assets', assets], ['Debts', debts], ['Goals', goals], ['Transactions', txs],
    ];
    stats.innerHTML = cells.map(([l, v]) =>
      `<div class="profile-stat"><span class="profile-stat-v">${v}</span><span class="profile-stat-l">${l}</span></div>`).join('')
      + (since && !isNaN(since) ? `<div class="profile-since">Member since ${since.toLocaleDateString('en', { month:'short', year:'numeric' })}</div>` : '');
  }
}
function openChangeDisplayName(){
  credMode='name';
  el('credTitle').textContent='Display Name';
  el('credNewLbl').textContent='NAME';
  el('credNew').type='text';
  el('credNew').maxLength=60;
  el('credNew').placeholder='Your name';
  el('credNew').value=(state.settings.displayName||'').trim()||displayName();
  el('credConfirmRow').style.display='none';
  const row=el('credPassRow');if(row)row.style.display='none';
  el('credNote').textContent='What the app calls you, and what anyone in your circle sees. Leave it empty to go back to your email name.';
  el('credPass').value='';el('credError').style.display='none';
  el('credSubmit').textContent='Save name';
  openModal('credModal');
}
function saveDisplayNameFromSheet(){
  const v=(el('credNew').value||'').trim().slice(0,60);
  state.settings.displayName=v||null;
  saveState();
  if(typeof schedulePush==='function')schedulePush();
  closeModal('credModal');renderProfile();haptic('success');
  toast(v?'Name updated':'Name cleared','success');
}

function openAuthOrAccount() {
  if (supabaseUser) {
    renderProfile();
    updateSyncLabels();
    if (typeof renderSyncCenter === 'function') renderSyncCenter();
    openModal('accountModal');
  } else {
    openAuthModal(false);
  }
}

function switchAuthTab(tab) {
  authCurrentTab = tab;
  el('authLoginForm').style.display = tab === 'login' ? 'flex' : 'none';
  el('authRegForm').style.display = tab === 'register' ? 'flex' : 'none';
  el('authForgotForm').style.display = tab === 'forgot' ? 'flex' : 'none';
  el('authTabs').style.display = tab === 'forgot' ? 'none' : 'flex';
  // Google sign-in doesn't apply to "forgot password", hide it there.
  if (el('authGoogleBtn')) el('authGoogleBtn').style.display = tab === 'forgot' ? 'none' : 'flex';
  if (el('authDivider')) el('authDivider').style.display = tab === 'forgot' ? 'none' : 'flex';
  el('authTabLogin').className = 'auth-tab' + (tab === 'login' ? ' active' : '');
  el('authTabReg').className = 'auth-tab' + (tab === 'register' ? ' active' : '');
  el('authSubText').textContent = tab === 'register'
    ? 'Create a free account to sync your data'
    : tab === 'forgot'
    ? 'Reset your password'
    : 'Sign in to sync your data across devices';
  clearAuthErrors();
  // Focus first input
  setTimeout(() => {
    const inputs = { login: 'authLoginEmail', register: 'authRegName', forgot: 'authForgotEmail' };
    const f = el(inputs[tab]); if(f) f.focus();
  }, 80);
}

function clearAuthErrors() {
  ['authLoginErr','authRegErr','authForgotErr','authForgotOk'].forEach(id => {
    const e = el(id); if(e) { e.className = e.id === 'authForgotOk' ? 'auth-ok' : 'auth-err'; e.textContent = ''; }
  });
  ['authLoginEmailErr','authLoginPassErr','authRegNameErr','authRegEmailErr','authRegPassErr','authRegPass2Err','authForgotEmailErr'].forEach(id => {
    const e = el(id); if(e) { e.className = 'auth-field-err'; e.textContent = ''; }
  });
  // Clear invalid states
  document.querySelectorAll('.auth-input.invalid,.auth-input.valid').forEach(i => i.classList.remove('invalid','valid'));
}

function showFieldErr(id, msg, input) {
  const e = el(id); if(!e) return;
  e.textContent = msg;
  e.className = 'auth-field-err show';
  if (input) input.classList.add('invalid');
}

function clearFieldErr(id, input) {
  const e = el(id); if(e) { e.className = 'auth-field-err'; e.textContent = ''; }
  if (input) input.classList.remove('invalid');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function mapAuthError(msg) {
  if (!msg) return null;
  const m = msg.toLowerCase();
  // Google-created accounts have no password, so this looks like bad credentials.
  if (m.includes('invalid login') || m.includes('invalid credentials')) return 'Incorrect email or password. If you signed up with Google, use the Google button instead.';
  if (m.includes('email not confirmed')) return 'Please verify your email first. Check your inbox.';
  if (m.includes('user already registered') || m.includes('already registered')) return 'An account with this email already exists. Try signing in instead.';
  if (m.includes('rate limit') || m.includes('too many')) return 'Too many attempts. Please wait a moment and try again.';
  if (m.includes('network') || m.includes('fetch')) return 'Connection error. Check your internet and try again.';
  return msg;
}

function togglePw(inputId, btn) {
  const inp = el(inputId); if (!inp) return;
  const isHidden = inp.type === 'password';
  inp.type = isHidden ? 'text' : 'password';
  // Swap icon: eye vs eye-off
  const iconId = inputId === 'authLoginPassword' ? 'authLoginPwIcon' : inputId === 'authRegPassword' ? 'authRegPwIcon' : 'authRegPw2Icon';
  const icon = el(iconId); if (icon) {
    if (isHidden) {
      icon.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`;
    } else {
      icon.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
    }
  }
  btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
  inp.focus();
}

function getPasswordStrength(pass) {
  if (!pass) return 0;
  let s = 0;
  if (pass.length >= 6) s++;
  if (pass.length >= 10) s++;
  if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) s++;
  if (/[0-9]/.test(pass)) s++;
  if (/[^A-Za-z0-9]/.test(pass)) s++;
  return Math.min(4, Math.ceil(s * 4/5));
}

function onRegPasswordInput(inp) {
  clearFieldErr('authRegPassErr', inp);
  const pass = inp.value;
  const strength = getPasswordStrength(pass);
  const bars = document.querySelectorAll('#pwStrengthBars .pw-strength-bar');
  const colors = ['var(--red)','var(--red)','var(--accent)','var(--green)','var(--green)'];
  const hints = ['','Too short','Fair, add numbers or symbols','Good password','Strong password!'];
  bars.forEach((b, i) => {
    b.style.background = i < strength ? (colors[strength-1] || 'var(--border2)') : 'var(--border2)';
  });
  const hint = el('pwStrengthHint');
  if (hint) { hint.textContent = pass.length > 0 ? (hints[strength] || '') : ''; hint.style.color = colors[strength-1] || 'var(--text3)'; }
  // also check confirm match live
  onConfirmPasswordInput(el('authRegPassword2'));
}

function onConfirmPasswordInput(inp) {
  if (!inp || !inp.value) return;
  clearFieldErr('authRegPass2Err', inp);
  const pass = el('authRegPassword')?.value || '';
  if (inp.value && inp.value !== pass) {
    inp.classList.add('invalid'); inp.classList.remove('valid');
  } else if (inp.value && inp.value === pass) {
    inp.classList.remove('invalid'); inp.classList.add('valid');
    clearFieldErr('authRegPass2Err', inp);
  }
}

function showAuthErr(id, msg) {
  const e = el(id); if(!e) return;
  e.textContent = msg;
  e.className = (id === 'authForgotOk' ? 'auth-ok' : 'auth-err') + ' show';
}

async function doLogin() {
  if (!sbClient) { showAuthErr('authLoginErr', sbClientMissingMsg()); return; }
  const email = el('authLoginEmail').value.trim();
  const pass = el('authLoginPassword').value;
  let hasErr = false;
  if (!email) { showFieldErr('authLoginEmailErr', 'Enter your email address', el('authLoginEmail')); hasErr = true; }
  else if (!isValidEmail(email)) { showFieldErr('authLoginEmailErr', 'Enter a valid email address', el('authLoginEmail')); hasErr = true; }
  if (!pass) { showFieldErr('authLoginPassErr', 'Enter your password', el('authLoginPassword')); hasErr = true; }
  if (hasErr) return;
  const btn = el('authLoginBtn');
  btn.disabled = true; btn.textContent = 'Signing in…';
  try {
    markInteractiveSignIn();
    const ready = signInReadyPromise();
    const { data, error } = await sbClient.auth.signInWithPassword({ email, password: pass });
    if (error) throw error;
    btn.textContent = 'Loading your data…';
    // Wait for the auth listener to pull and render (capped at 8s).
    await Promise.race([ready, new Promise((r) => setTimeout(r, 8000))]);
    closeAuthModal();
  } catch(e) {
    showAuthErr('authLoginErr', mapAuthError(e.message) || 'Sign in failed. Check your credentials.');
    // Shake the button
    btn.style.animation = 'shake .4s ease';
    setTimeout(() => btn.style.animation = '', 400);
  } finally {
    btn.disabled = false; btn.textContent = 'Sign In';
  }
}

async function doRegister() {
  if (!sbClient) { showAuthErr('authRegErr', sbClientMissingMsg()); return; }
  const fullName = el('authRegName').value.trim().replace(/\s+/g,' ');
  const email = el('authRegEmail').value.trim();
  const pass = el('authRegPassword').value;
  const pass2 = el('authRegPassword2').value;
  let hasErr = false;
  if (!fullName) { showFieldErr('authRegNameErr', 'Enter your name', el('authRegName')); hasErr = true; }
  else if (fullName.length < 2) { showFieldErr('authRegNameErr', 'That is a little short', el('authRegName')); hasErr = true; }
  if (!email) { showFieldErr('authRegEmailErr', 'Enter an email address', el('authRegEmail')); hasErr = true; }
  else if (!isValidEmail(email)) { showFieldErr('authRegEmailErr', 'Enter a valid email address', el('authRegEmail')); hasErr = true; }
  if (pass.length < 6) { showFieldErr('authRegPassErr', 'Password must be at least 6 characters', el('authRegPassword')); hasErr = true; }
  if (pass !== pass2) { showFieldErr('authRegPass2Err', 'Passwords do not match', el('authRegPassword2')); hasErr = true; }
  if (hasErr) return;
  const btn = el('authRegBtn');
  btn.disabled = true; btn.textContent = 'Creating account…';
  try {
    markInteractiveSignIn();
    // full_name is where Google puts it too.
    const { data, error } = await sbClient.auth.signUp({
      email, password: pass, options: { data: { full_name: fullName, name: fullName } }
    });
    if (error) throw error;
    // Locally too, before the confirmation email arrives.
    state.settings.displayName = fullName;
    saveState();
    closeAuthModal();
    // No session means email confirmation is required; handle both project settings.
    if (data && data.session) {
      _verifyBannerHidden = false;
      _verifyEmail = email;
      toast('Account created. Verify your email when you get a moment.', 'success');
      try { updateAuthUI(); } catch (e) {}
    } else {
      openVerifyModal(email);
    }
  } catch(e) {
    showAuthErr('authRegErr', mapAuthError(e.message) || 'Registration failed. Please try again.');
    btn.disabled = false; btn.textContent = 'Create Account';
  }
}

// EMAIL VERIFICATION
// Google addresses are verified; email sign-ups are until the link is clicked.
function emailVerified() {
  if (!supabaseUser) return true;
  return !!(supabaseUser.email_confirmed_at || supabaseUser.confirmed_at);
}
// Dismissed for this run only.
let _verifyBannerHidden = false;
function dismissVerifyBanner() { _verifyBannerHidden = true; syncVerifyUI(); haptic('tap'); }
function syncVerifyUI() {
  // Signing out resets the dismissal for the next account.
  if (!supabaseUser) { _verifyBannerHidden = false; _verifyResendAt = 0; }
  const unverified = !!supabaseUser && !emailVerified();
  const banner = el('verifyBanner');
  if (banner) banner.style.display = (unverified && !_verifyBannerHidden) ? '' : 'none';
  const row = el('verifySettingsRow');
  if (row) row.style.display = unverified ? '' : 'none';
}
// The link is clicked in another tab; re-check when this one regains focus.
let _verifyChecking = false;
async function recheckEmailVerified() {
  if (_verifyChecking || !sbClient || !supabaseUser || emailVerified()) return;
  _verifyChecking = true;
  try {
    const { data } = await sbClient.auth.refreshSession();
    const u = (data && (data.user || (data.session && data.session.user))) || null;
    if (u) supabaseUser = u;
    if (emailVerified()) {
      _verifyBannerHidden = false;
      toast('Email verified, your account is secured', 'success');
      updateAuthUI();
    }
  } catch (e) { /* offline or the refresh was refused: ask again next time */ }
  finally { _verifyChecking = false; syncVerifyUI(); }
}
// Shared by the banner and the settings row.
let _verifyResendAt = 0;
const VERIFY_RESEND_COOLDOWN = 60000;
async function resendVerifyEmail(btn) {
  if (!sbClient || !supabaseUser || !supabaseUser.email) return;
  const left = VERIFY_RESEND_COOLDOWN - (Date.now() - _verifyResendAt);
  if (left > 0) { toast('Just sent one. Try again in ' + Math.ceil(left / 1000) + 's', 'error'); return; }
  const isBtn = btn && btn.classList && btn.classList.contains('vb-act');
  const label = isBtn ? btn.textContent : null;
  if (isBtn) { btn.disabled = true; btn.textContent = 'Sending…'; }
  try {
    const { error } = await sbClient.auth.resend({ type: 'signup', email: supabaseUser.email });
    if (error) throw error;
    _verifyResendAt = Date.now();
    toast('Link sent to ' + supabaseUser.email, 'success');
    if (isBtn) btn.textContent = 'Sent ✓';
    const sub = el('verifySettingsSub');
    if (sub) sub.textContent = 'Link sent. Open it from your inbox, then come back.';
  } catch (e) {
    toast(mapAuthError(e.message) || 'Could not send the link. Try again.', 'error');
    if (isBtn) btn.textContent = label || 'Send link';
  } finally {
    if (isBtn) setTimeout(() => { btn.disabled = false; btn.textContent = 'Send link'; }, VERIFY_RESEND_COOLDOWN);
  }
}
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => { if (!document.hidden) recheckEmailVerified(); });
  window.addEventListener('focus', () => recheckEmailVerified());
}

// Email verify modal
let _verifyEmail = '';
function openVerifyModal(email) {
  _verifyEmail = email;
  if (el('verifyEmailDisplay')) el('verifyEmailDisplay').textContent = email;
  const m = el('verifyModal');
  m.classList.add('open');
  m.setAttribute('aria-hidden', 'false');
  const resendBtn = el('verifyResendBtn');
  if (resendBtn) { resendBtn.disabled = false; resendBtn.textContent = 'Didn\'t get it? Resend email'; }
}

function closeVerifyModal() {
  const m = el('verifyModal');
  m.classList.remove('open');
  m.setAttribute('aria-hidden', 'true');
  // Open sign-in tab
  openAuthModal(false);
  switchAuthTab('login');
  if (el('authLoginEmail')) el('authLoginEmail').value = _verifyEmail;
}

async function resendVerification() {
  if (!sbClient || !_verifyEmail) return;
  const btn = el('verifyResendBtn');
  btn.disabled = true; btn.textContent = 'Sending…';
  try {
    await sbClient.auth.resend({ type: 'signup', email: _verifyEmail });
    btn.textContent = 'Sent! Check your inbox ✓';
    setTimeout(() => { btn.disabled = false; btn.textContent = 'Didn\'t get it? Resend email'; }, 30000);
    toast('Verification email resent!', 'success');
  } catch(e) {
    btn.disabled = false; btn.textContent = 'Resend failed, try again';
  }
}

async function doForgot() {
  if (!sbClient) { showAuthErr('authForgotErr', sbClientMissingMsg()); return; }
  const email = el('authForgotEmail').value.trim();
  if (!email) { showFieldErr('authForgotEmailErr', 'Enter your email address', el('authForgotEmail')); return; }
  if (!isValidEmail(email)) { showFieldErr('authForgotEmailErr', 'Enter a valid email address', el('authForgotEmail')); return; }
  const btn = el('authForgotBtn');
  btn.disabled = true; btn.textContent = 'Sending…';
  try {
    // redirectTo this page so PASSWORD_RECOVERY has a UI to open.
    await sbClient.auth.resetPasswordForEmail(email,{
      redirectTo: window.location.origin + window.location.pathname,
    });
    // Always show success (security: don't reveal if email exists)
    el('authForgotErr').className = 'auth-err'; el('authForgotErr').textContent = '';
    const ok = el('authForgotOk');
    ok.textContent = "If an account with this email exists, you'll receive a password reset link shortly. Check your inbox (and spam folder).";
    ok.className = 'auth-ok show';
    btn.textContent = 'Email Sent ✓';
    btn.style.background = 'var(--green)';
    btn.style.boxShadow = '0 4px 16px rgba(22,214,164,.25)';
  } catch(e) {
    showAuthErr('authForgotErr', 'Something went wrong. Please try again.');
    btn.disabled = false; btn.textContent = 'Send Reset Link';
  }
}

// PASSWORD RECOVERY
// The emailed link creates a session so a new password can be set.
let _recoveryOpen=false;
function openRecoveryModal(){
  if(_recoveryOpen)return;
  _recoveryOpen=true;
  const n=el('recoveryNew'),c=el('recoveryConfirm');
  if(n)n.value='';if(c)c.value='';
  const e=el('recoveryError');if(e)e.style.display='none';
  try{closeAuthModal();}catch(err){}
  openModal('recoveryModal');
}
function skipRecovery(){_recoveryOpen=false;closeModal('recoveryModal');
  toast('Password unchanged. You are signed in.','success');}
function recoveryFail(msg){const e=el('recoveryError');if(!e)return;e.textContent=msg;e.style.display='';haptic('error');}
async function submitRecovery(){
  if(!sbClient){recoveryFail(sbClientMissingMsg());return;}
  const next=(el('recoveryNew').value||'');
  if(next.length<8){recoveryFail('Use at least 8 characters.');return;}
  if(next!==el('recoveryConfirm').value){recoveryFail('The two passwords do not match.');return;}
  const btn=el('recoverySubmit');
  btn.disabled=true;btn.textContent='Saving…';
  try{
    const {error}=await sbClient.auth.updateUser({password:next});
    if(error){recoveryFail(error.message||'That did not work.');return;}
    _recoveryOpen=false;
    closeModal('recoveryModal');
    haptic('success');toast('Password changed. You are signed in.','success');
    renderProfile();
  }catch(err){
    recoveryFail(navigator.onLine?'Could not reach the server.':'You are offline.');
  }finally{btn.disabled=false;btn.textContent='Set password';}
}
// Fallback when the recovery event fired before boot finished.
function checkRecoveryUrl(){
  const h=window.location.hash||'',q=window.location.search||'';
  if(/type=recovery/.test(h)||/type=recovery/.test(q))openRecoveryModal();
}
async function signOut() {
  if (!sbClient) return;
  // Confirm: signing out switches the app to guest storage.
  const waiting = typeof pendingChangeCount === 'function' ? pendingChangeCount() : 0;
  const who = (supabaseUser && supabaseUser.email) ? ' from ' + supabaseUser.email : '';
  const ok = await askConfirm({
    title: 'Sign out?',
    message: waiting
      ? plural(waiting, 'change has', 'changes have') + ' not reached the cloud yet. Signing out now leaves '
        + (waiting === 1 ? 'it' : 'them') + ' on this device only, and this device goes back to its guest data. '
        + 'Sync first if you want ' + (waiting === 1 ? 'it' : 'them') + ' on your other devices.'
      : 'This device goes back to the data it had before you signed in. Nothing in your account is deleted, '
        + 'and signing back in brings it all with you.',
    confirmText: 'Sign out' + (waiting ? ' anyway' : ''),
    cancelText: 'Stay signed in',
  });
  if (!ok) return;
  closeModal('accountModal');

  // Preserve device prefs from the current session
  const devicePrefs = {
    theme: state.settings.theme,
    hideBalance: state.settings.hideBalance,
    haptics: state.settings.haptics,
    hapticStrength: state.settings.hapticStrength,
    reduceMotion: state.settings.reduceMotion,
  };

  // Perform the actual Supabase sign-out
  await sbClient.auth.signOut();
  supabaseUser = null;
  _avatarTried = false;

  // Guest storage is never touched by sign-out; just switch back to it.
  let localState = { assets:[], debts:[], goals:[], recurs:[], transactions:[],
    pnlHistory:[], settings:{currency:'NPR',baseCurrency:'NPR',hideBalance:false,theme:'dark',
    haptics:true,hapticStrength:'medium',reduceMotion:false,onboarded:false}, lastUpdated:null };
  flushSave();   // the debounced write may still be pending
  try { const s = localStorage.getItem(STORE_KEY); if (s) localState = { ...localState, ...JSON.parse(s) }; } catch(e) {}

  // Merge device prefs back
  localState.settings = {
    ...localState.settings,
    theme: devicePrefs.theme,
    hideBalance: devicePrefs.hideBalance,
    haptics: devicePrefs.haptics,
    hapticStrength: devicePrefs.hapticStrength,
    reduceMotion: devicePrefs.reduceMotion,
  };
  state = localState;
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch(e) {}
  updateAuthUI();
  applyTheme(state.settings.theme);
  if(typeof syncFontSettingsLabel==='function')syncFontSettingsLabel();
  renderAll();
  renderSettings();
  toast('Signed out');
}

function updateAuthUI() {
  const acctBtn = el('acctBtn');
  const inner = el('acctBtnInner');
  if (!acctBtn || !inner) return;
  if (supabaseUser) {
    const initials = (supabaseUser.email || '?')[0].toUpperCase();
    let av = inner.querySelector('.acct-avatar');
    if (!av) { inner.innerHTML = '<div class="acct-avatar"></div>'; av = inner.querySelector('.acct-avatar'); }
    paintAvatarInto(av, initials);   // no preview: this button opens the Account sheet
    // Fire and forget; guards against running twice.
    adoptGoogleAvatar();
    acctBtn.title = supabaseUser.email;
    updateSyncDot('synced');
  } else {
    inner.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
    acctBtn.title = 'Sign in';
    updateSyncDot('offline');
  }
  // Update settings account sections
  const acctSection = el('settingsAccountSection');
  const signInSection = el('settingsSignInSection');
  if (acctSection && signInSection) {
    if (supabaseUser) {
      acctSection.style.display = 'block';
      signInSection.style.display = 'none';
      const email = supabaseUser.email || '';
      paintAvatarInto(el('settingsAcctAvatar'), email[0]?.toUpperCase() || '?');   // ditto
      if (el('settingsAcctEmail')) el('settingsAcctEmail').textContent = email;
    } else {
      acctSection.style.display = 'none';
      signInSection.style.display = 'block';
    }
  }
  syncVerifyUI();
}

// SYNC CONFIRM MODAL
// One dialog for every local-vs-cloud decision; resolves with the chosen string or 'cancel'.
let _syncConfirmResolve = null;
function syncConfirmRespond(choice) {
  closeModal('syncConfirmModal');
  const r = _syncConfirmResolve; _syncConfirmResolve = null;
  if (r) r(choice);
}
function openSyncConfirm(kind, resolve) {
  _syncConfirmResolve = resolve;
  const titleEl = el('syncConfirmTitle'), bodyEl = el('syncConfirmBody'), actEl = el('syncConfirmActions');
  flushSave();
  const localRaw = (() => { try { const s = localStorage.getItem(STORE_KEY); return s ? JSON.parse(s) : null; } catch(e){ return null; } })();
  const summarize = d => {
    if (!d) return '0 items';
    const parts = [
      d.assets?.length ? d.assets.length+' asset'+(d.assets.length!==1?'s':'') : '',
      d.debts?.length ? d.debts.length+' debt'+(d.debts.length!==1?'s':'') : '',
      d.goals?.length ? d.goals.length+' goal'+(d.goals.length!==1?'s':'') : '',
    ].filter(Boolean);
    return parts.length ? parts.join(', ') : '0 items';
  };
  const cloudSummary = summarize(state);
  const localSummary = summarize(localRaw);
  const ICO_CLOUD = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`;
  const ICO_PHONE = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>`;
  const ICO_X = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

  if (kind === 'import-to-empty-cloud') {
    titleEl.textContent = 'Import local data?';
    bodyEl.innerHTML = `<div style="font-size:12.5px;color:var(--text2);line-height:1.5;margin-bottom:4px">This account is new (or empty), and this device has <b style="color:var(--text)">${esc(localSummary)}</b> saved locally. Import it into your cloud account?</div>`;
    actEl.innerHTML = `
      <button class="sync-choice-btn primary" onclick="syncConfirmRespond('import')">
        <span class="sync-choice-ico">${ICO_CLOUD}</span>
        <span><span class="sync-choice-title">Import to cloud account</span><span class="sync-choice-sub" style="display:block">Your local data is uploaded and synced. It also stays saved locally on this device, in its own separate space.</span></span>
      </button>
      <button class="sync-choice-btn cancel" onclick="syncConfirmRespond('cancel')">
        <span class="sync-choice-ico">${ICO_X}</span>
        <span><span class="sync-choice-title">Don't import</span><span class="sync-choice-sub" style="display:block">Leave the cloud account empty. Your local data stays exactly as it is.</span></span>
      </button>`;
  } else if (kind === 'copy-to-local') {
    titleEl.textContent = 'Copy cloud data to this device?';
    bodyEl.innerHTML = `<div style="font-size:12.5px;color:var(--text2);line-height:1.5;margin-bottom:4px">This device's local storage is empty, but your account has <b style="color:var(--text)">${esc(cloudSummary)}</b> in the cloud. Also save a copy to this device's local storage, for offline use?</div>`;
    actEl.innerHTML = `
      <button class="sync-choice-btn primary" onclick="syncConfirmRespond('copy')">
        <span class="sync-choice-ico">${ICO_PHONE}</span>
        <span><span class="sync-choice-title">Copy to local storage</span><span class="sync-choice-sub" style="display:block">Keeps an offline copy on this device too.</span></span>
      </button>
      <button class="sync-choice-btn cancel" onclick="syncConfirmRespond('cancel')">
        <span class="sync-choice-ico">${ICO_X}</span>
        <span><span class="sync-choice-title">Not now</span><span class="sync-choice-sub" style="display:block">Local storage stays empty on this device. You're still signed in and synced.</span></span>
      </button>`;
  }
  openModal('syncConfirmModal');
}

// SYNC CENTER (rich account/sync sheet)
function manualSyncFromCenter() {
  const btn = el('syncCenterSyncBtn');
  if (btn) btn.classList.add('ico-spin');
  manualSync().finally(() => { if (btn) btn.classList.remove('ico-spin'); renderSyncCenter(); });
}
// Counts things the user changed, not rows written. The badge markup lives in supabase.js.
function pendingBadge(){return window.PENDING_BADGE||'';}
function pendingInline(){return '<span class="unsynced-inline" title="Waiting to sync" aria-label="Waiting to sync">'+(window.PENDING_ICON||'')+'</span>';}
function pendingChangeCount(){
  if(typeof pendingSyncIds!=='object'||!pendingSyncIds)return 0;
  let n=0,folded=0;
  Object.keys(pendingSyncIds).forEach(k=>{n+=pendingSyncIds[k].size;});
  (pendingSyncIds.transactions?[...pendingSyncIds.transactions]:[]).forEach(id=>{
    const t=(state.transactions||[]).find(x=>x.id===id);
    if(t&&t.assetId&&pendingSyncIds.assets&&pendingSyncIds.assets.has(t.assetId))folded++;
  });
  return Math.max(0,n-folded);
}
function renderSyncCenter() {
  const body = el('syncCenterBody');
  if (!body || !el('accountModal') || !el('accountModal').classList.contains('open')) {
    if (body) {} // still update status line below even if closed, cheap
  }
  const statusLine = el('syncCenterStatusLine');
  if (statusLine) {
    const pending = pendingSyncCount();
    const statusWord = syncStatus === 'error' ? 'Sync error' : syncStatus === 'syncing' ? 'Syncing…' : !navigator.onLine && pending > 0 ? 'Offline, '+pending+' waiting' : pending > 0 ? pendingChangeCount()+' change'+(pendingChangeCount()!==1?'s':'')+' pending' : 'All synced';
    statusLine.innerHTML = '<span style="color:'+(syncStatus==='error'?'var(--red)':pending>0?'var(--accent)':'var(--green)')+'">'+statusWord+'</span>';
  }
  if (!body) return;
  const pending = pendingSyncCount();
  let html = '';

  if (syncStatus === 'error') {
    html += `<div class="sync-center-row" style="border:1px solid rgba(255,77,106,.3);border-radius:12px;padding:10px;background:var(--red-bg);margin-bottom:4px">
      <span class="sync-center-row-ico" style="color:var(--red);background:transparent">${svgIcon('alert',16)}</span>
      <div><div class="sync-center-row-name" style="color:var(--red)">Last sync failed</div><div class="sync-center-row-sub">${esc(lastSyncError||'Check your connection and try again')}</div></div>
    </div>`;
  }

  if (pending > 0) {
    // Grouped by kind with a count each.
    const kindMeta = {
      assets:       ['wallet',   'Assets'],
      debts:        ['coins',    'Debts'],
      goals:        ['target',   'Goals'],
      recurs:       ['coins',    'Recurring'],
      spends:       ['banknote', 'Spendings'],
      transactions: ['clock',    'Transactions'],
    };
    // A queued transaction whose asset is also queued is folded into it.
    const foldedTx = new Set();
    (pendingSyncIds.transactions ? [...pendingSyncIds.transactions] : []).forEach(id => {
      const t = (state.transactions || []).find(x => x.id === id);
      if (t && t.assetId && pendingSyncIds.assets && pendingSyncIds.assets.has(t.assetId)) foldedTx.add(id);
    });
    const shownCount = pending - foldedTx.size;
    html += `<div class="sync-center-section-lbl">WAITING TO SYNC (${shownCount})</div>`;
    html += `<div class="sync-pending-list">`;
    ['assets','debts','goals','recurs','spends','transactions'].forEach(kind => {
      let ids = [...(pendingSyncIds[kind] || [])];
      if (kind === 'transactions') ids = ids.filter(id => !foldedTx.has(id));
      if (!ids.length) return;
      const [ico, groupLabel] = kindMeta[kind];
      const list = state[kind] || [];
      html += `<div class="sync-group">
        <div class="sync-group-head">
          <span class="sync-group-ico">${svgIcon(ico,13)}</span>
          <span class="sync-group-name">${groupLabel}</span>
          <span class="sync-group-count">${ids.length}</span>
        </div>
        <div class="sync-group-items">`;
      ids.slice(0, 6).forEach(id => {
        const item = list.find(x => x.id === id);
        const name = item ? (item.name || item.note || groupLabel) : 'Deleted item';
        let sub = item ? 'Edited or added' : 'Removal pending';
        if (item && kind === 'assets') {
          const n = [...foldedTx].filter(tid => {
            const t = (state.transactions || []).find(x => x.id === tid);
            return t && t.assetId === id;
          }).length;
          if (n) sub += ', with ' + n + ' transaction' + (n === 1 ? '' : 's');
        }
        html += `<div class="sync-group-item">
          <span class="sync-item-dot"></span>
          <span class="sync-item-name">${esc(name)}</span>
          <span class="sync-item-sub">${sub}</span>
        </div>`;
      });
      if (ids.length > 6) html += `<div class="sync-group-more">+ ${ids.length-6} more</div>`;
      html += `</div></div>`;
    });
    html += `</div>`;
  } else if (syncStatus !== 'error') {
    html += `<div class="sync-center-row" style="border:1px solid var(--border);border-radius:12px;padding:10px"><span class="sync-center-row-ico" style="color:var(--green)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span><div><div class="sync-center-row-name">Everything's synced</div><div class="sync-center-row-sub">All your data matches the cloud</div></div></div>`;
  }

  // Scheduled snapshot job status.
  html += `<div class="sync-center-section-lbl">WHILE THE APP IS CLOSED</div>`;
  html += snapshotJobRow();

  body.innerHTML = html;
  // Re-bind the scroll hint on the freshly built list.
  if (typeof bindScrollHints === 'function') bindScrollHints(body);
}

// Status of api/snapshot.js readings (set up via setup-snapshot.sql).
function snapshotJobRow() {
  const at = state.cronSeenAt ? Date.parse(state.cronSeenAt) : null;
  const fresh = Number.isFinite(at) && (Date.now() - at) < 6 * 3600 * 1000;
  const ok = Number.isFinite(at);
  const ico = fresh ? 'check' : ok ? 'clock' : 'alert';
  const col = fresh ? 'var(--green)' : ok ? 'var(--accent)' : 'var(--text3)';
  const name = fresh ? 'Snapshots are running'
    : ok ? 'Snapshots have paused' : 'Snapshots are not set up';
  const sub = fresh
    ? 'Every two hours, so a day you never open this still has a line. Last one ' + relTime(at) + '.'
    : ok ? ('Last one ' + relTime(at) + '. Until it runs again, only the times you open the app are recorded.')
         : 'Right now a reading is only taken while the app is open. Run setup-snapshot.sql to turn it on.';
  const svg = ico === 'check'
    ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>'
    : ico === 'clock'
    ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/></svg>'
    : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="13"/><line x1="12" y1="16" x2="12" y2="16.01"/></svg>';
  return `<div class="sync-center-row" style="border:1px solid var(--border);border-radius:12px;padding:10px">
    <span class="sync-center-row-ico" style="color:${col}">${svg}</span>
    <div><div class="sync-center-row-name">${name}</div>
    <div class="sync-center-row-sub">${sub}</div></div></div>`;
}

// Handle enter key in auth inputs
function setupAuthKeyListeners() {
  const authLoginEmail = el('authLoginEmail');
  const authLoginPassword = el('authLoginPassword');
  if (authLoginEmail) authLoginEmail.addEventListener('keydown', e => { if(e.key==='Enter') authLoginPassword?.focus(); });
  if (authLoginPassword) authLoginPassword.addEventListener('keydown', e => { if(e.key==='Enter') doLogin(); });
  const rn = el('authRegName'), re = el('authRegEmail'), rp = el('authRegPassword'), rp2 = el('authRegPassword2');
  if (rn) rn.addEventListener('keydown', e => { if(e.key==='Enter') re?.focus(); });
  if (re) re.addEventListener('keydown', e => { if(e.key==='Enter') rp?.focus(); });
  if (rp) rp.addEventListener('keydown', e => { if(e.key==='Enter') rp2?.focus(); });
  if (rp2) rp2.addEventListener('keydown', e => { if(e.key==='Enter') doRegister(); });
  const fe = el('authForgotEmail');
  if (fe) fe.addEventListener('keydown', e => { if(e.key==='Enter') doForgot(); });
}

// STATE
let state={assets:[],debts:[],goals:[],recurs:[],transactions:[],spends:[],settings:{currency:'NPR',baseCurrency:'NPR',hideBalance:false,theme:'dark',haptics:true,hapticStrength:'medium',reduceMotion:false,onboarded:false},lastUpdated:null,pnlHistory:[]};
const CURRENCIES=[{code:'NPR',sym:'Rs.',name:'Nepali Rupee'},{code:'INR',sym:'₹',name:'Indian Rupee'},{code:'USD',sym:'$',name:'US Dollar'},{code:'EUR',sym:'€',name:'Euro'},{code:'GBP',sym:'£',name:'British Pound'},{code:'AUD',sym:'A$',name:'Australian Dollar'},{code:'CAD',sym:'CA$',name:'Canadian Dollar'},{code:'JPY',sym:'¥',name:'Japanese Yen'},{code:'CNY',sym:'CN¥',name:'Chinese Yuan'},{code:'AED',sym:'AED',name:'UAE Dirham'},{code:'SAR',sym:'SAR',name:'Saudi Riyal'},{code:'QAR',sym:'QAR',name:'Qatari Riyal'},{code:'KWD',sym:'KWD',name:'Kuwaiti Dinar'},{code:'BHD',sym:'BHD',name:'Bahraini Dinar'},{code:'OMR',sym:'OMR',name:'Omani Rial'},{code:'MYR',sym:'RM',name:'Malaysian Ringgit'},{code:'SGD',sym:'S$',name:'Singapore Dollar'},{code:'KRW',sym:'₩',name:'South Korean Won'},{code:'HKD',sym:'HK$',name:'Hong Kong Dollar'},{code:'THB',sym:'฿',name:'Thai Baht'},{code:'CHF',sym:'CHF',name:'Swiss Franc'},{code:'NZD',sym:'NZ$',name:'New Zealand Dollar'},{code:'PKR',sym:'₨',name:'Pakistani Rupee'},{code:'LKR',sym:'Rs',name:'Sri Lankan Rupee'},{code:'BDT',sym:'৳',name:'Bangladeshi Taka'},{code:'CNH',sym:'CNH',name:'Chinese Yuan Offshore'},{code:'ZAR',sym:'R',name:'South African Rand'},{code:'RUB',sym:'₽',name:'Russian Ruble'},{code:'TRY',sym:'₺',name:'Turkish Lira'},{code:'BRL',sym:'R$',name:'Brazilian Real'},];
let livePrices={},fxRates={NPR:133.5,USD:1},currentCurrency=CURRENCIES[0];
let editingAssetId=null,editingDebtId=null,editingGoalId=null,goalLinkedAssetIds=[];
let buyPriceEntryCcy=null,liqValueEntryCcy=null,txPriceEntryCcy=null,currentPriceEntryCcy=null,isPricePerUnitMode=true,isTxPricePerUnitMode=true;
function buildCompactCcySelect(cid,activeCcy,onChange){
  const wrap=el(cid);if(!wrap)return;
  const cur=activeCcy||currentCurrency.code;
  // Build once; later calls only move the active mark. One delegated listener.
  if(wrap._built===CURRENCIES.length){
    const t=wrap.querySelector('.ccy-sel-trigger');
    if(t)t.firstChild.textContent=cur;
    wrap.querySelectorAll('.ccy-sel-opt').forEach(o=>o.classList.toggle('active',o.dataset.val===cur));
    wrap._onChange=onChange;
    return;
  }
  wrap.innerHTML=`<div class="ccy-sel-trigger" id="cst-${cid}" tabindex="0" role="button" aria-haspopup="listbox">${cur}<svg class="caret" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></div><div class="ccy-sel-dropdown" id="csd-${cid}" role="listbox">${CURRENCIES.map(c=>`<div class="ccy-sel-opt ${c.code===cur?'active':''}" data-val="${c.code}" role="option">${c.code}<span class="ccy-sel-name">${c.name}</span></div>`).join('')}</div>`;
  wrap._built=CURRENCIES.length;
  wrap._onChange=onChange;
  const trig=el('cst-'+cid),dd=el('csd-'+cid);
  trig.addEventListener('click',e=>{e.stopPropagation();
    document.querySelectorAll('.ccy-sel-trigger.open').forEach(t=>{if(t!==trig){t.classList.remove('open');const d=el('csd-'+t.id.replace('cst-',''));if(d){d.classList.remove('open');d.classList.remove('drop-up');}}});
    const opening=!trig.classList.contains('open');
    if(opening){const r=trig.getBoundingClientRect();const estH=Math.min(160,CURRENCIES.length*38+8);dd.classList.toggle('drop-up',r.bottom+estH>window.innerHeight-16&&r.top-estH>8);}
    trig.classList.toggle('open');dd.classList.toggle('open');});
  dd.addEventListener('click',e=>{
    const opt=e.target.closest('.ccy-sel-opt'); if(!opt) return;
    e.stopPropagation();
    const v=opt.dataset.val;
    trig.firstChild.textContent=v;
    dd.querySelectorAll('.ccy-sel-opt').forEach(o=>o.classList.remove('active'));
    opt.classList.add('active');
    trig.classList.remove('open');dd.classList.remove('open');
    if(wrap._onChange)wrap._onChange(v);
  });
}
// Money fields
// Per input id: the currency being typed in (null = display currency).
const moneyCcy={};
function moneyRate(id){return getCurrRate(moneyCcy[id]||currentCurrency.code);}
// Field value in base currency; NaN when empty.
function moneyBase(id){
  const inp=el(id);if(!inp)return NaN;
  const v=parseFloat(inp.value),r=moneyRate(id);
  return (isNaN(v)||!(r>0))?NaN:v/r;
}
// Write a base amount in the field's currency; <= 0 clears it.
function setMoneyField(id,base,dp){
  const inp=el(id);if(!inp)return;
  const r=moneyRate(id),v=num(base);
  inp.value=(v>0&&r>0)?(v*r).toFixed(dp==null?2:dp).replace(/\.00$/,''):'';
}
// `after` runs once the conversion is applied.
function bindMoneyCcy(id,wrapId,after){
  if(!(id in moneyCcy))moneyCcy[id]=null;
  buildCompactCcySelect(wrapId,moneyCcy[id]||null,v=>{
    const fromRate=moneyRate(id);
    moneyCcy[id]=(v===currentCurrency.code)?null:v;
    const toRate=moneyRate(id);
    const inp=el(id),val=parseFloat(inp&&inp.value);
    // Convert what is typed so it keeps meaning the same amount.
    if(inp&&val>0&&fromRate>0)inp.value=(val/fromRate*toRate).toFixed(2).replace(/\.00$/,'');
    haptic('tap');if(after)after();
  });
}
// Fresh forms start on the display currency.
function resetMoneyCcy(ids){ids.forEach(id=>{moneyCcy[id]=null;});}
function onBuyPriceCcyChange(v){
  const fromRate=getCurrRate(buyPriceEntryCcy||currentCurrency.code);
  buyPriceEntryCcy=(v===currentCurrency.code)?null:v;
  const toRate=getCurrRate(buyPriceEntryCcy||currentCurrency.code);
  const inp=el('assetBuyPrice');
  const val=parseFloat(inp&&inp.value);
  if(inp&&val>0&&fromRate>0){inp.value=(val/fromRate*toRate).toFixed(2);}
  updateBuyPriceHint();
  haptic('tap');
}
function onCurrentPriceCcyChange(v){
  const fromRate=getCurrRate(currentPriceEntryCcy||currentCurrency.code);
  currentPriceEntryCcy=(v===currentCurrency.code)?null:v;
  const toRate=getCurrRate(currentPriceEntryCcy||currentCurrency.code);
  const inp=el('assetCurrentPrice');
  const val=parseFloat(inp&&inp.value);
  if(inp&&val>0&&fromRate>0){inp.value=(val/fromRate*toRate).toFixed(2);}
  haptic('tap');
}
function onLiqValueCcyChange(v){
  const fromRate=getCurrRate(liqValueEntryCcy||currentCurrency.code);
  liqValueEntryCcy=(v===currentCurrency.code)?null:v;
  const toRate=getCurrRate(liqValueEntryCcy||currentCurrency.code);
  const inp=el('liquidityValue');
  const val=parseFloat(inp&&inp.value);
  if(inp&&val>0&&fromRate>0){inp.value=(val/fromRate*toRate).toFixed(2);}
  haptic('tap');
}
function onTxPriceCcyChange(v){
  txPriceEntryCcy=(v===currentCurrency.code)?null:v;
  haptic('tap');
  // Re-calc auto price with new currency
  autoFillTxPrice();
}
// Record Buy/Sell for an asset without a quantity.
let txNoQty=false;
// Auto-fill total price based on qty × live-price-per-unit
function autoFillTxPrice(){
  const a=state.assets.find(x=>x.id===detailAssetId);if(!a)return;
  if(assetNoQty(a))return;
  const qEntered=parseFloat(el('txQty')&&el('txQty').value)||0;
  const priceEl=el('txPrice');
  if(!qEntered||qEntered<=0){if(priceEl)priceEl.value='';return;}
  const unit=a.category==='commodity'?txUnit:null;
  const pricePerUnitNPR=getLivePricePerUnitNPR(a,unit);if(!pricePerUnitNPR)return;
  const rate=getCurrRate(txPriceEntryCcy||currentCurrency.code);
  const perUnitInDisplayCcy=pricePerUnitNPR*rate;
  const totalInDisplayCcy=perUnitInDisplayCcy*qEntered;
  if(priceEl)priceEl.value=(isTxPricePerUnitMode?perUnitInDisplayCcy:totalInDisplayCcy).toFixed(2);
}
function autoFillEditTxPrice(){
  const t=state.transactions.find(x=>x.id===editingTxId);if(!t)return;
  const a=state.assets.find(x=>x.id===t.assetId)||state.assets.find(x=>x.name===t.name&&x.category===t.category);if(!a)return;
  const qEntered=parseFloat(el('editTxQty')&&el('editTxQty').value)||0;
  const priceEl=el('editTxPrice');
  if(!qEntered||qEntered<=0){if(priceEl)priceEl.value='';return;}
  const unit=editTxUnit||t.enteredUnit||(a?a.unit:null);
  const pricePerUnitNPR=getLivePricePerUnitNPR(a,unit);if(!pricePerUnitNPR)return;
  const rate=getCurrRate(editTxPriceEntryCcy||currentCurrency.code);
  const perUnitInDisplayCcy=pricePerUnitNPR*rate;
  if(priceEl)priceEl.value=(isEditTxPerUnitMode?perUnitInDisplayCcy:perUnitInDisplayCcy*qEntered).toFixed(2);
}
let activeDebtTab='owed',activeCat='all';
let miniChartInst=null,donutChartInst=null,pnlChartInst=null,anCatChart=null,anAssetChart=null,anMonthChart=null,anForecastChart=null;
let selectedAssetType='crypto',selectedDebtType='owed',selectedGoalIcon='target',selGoalColor='acc';
let selectedCoinId=null,selectedCoinName=null,selectedCoinImage=null;
let selectedCommodityId='gold',selectedCommodityUnit='gram';
let selectedStockSym=null,selectedStockName=null,selectedStockIsNepse=false,selectedPropertyType='house';
let selectedLiquidityType='savings';
let recurFreqValue='monthly',recurCatValue='crypto';
let editingRecurId=null,recurCoinId=null,recurCoinName=null,recurCoinImage=null,recurActiveVal=true;
let interestEnabled=false,intType='flat',intFreq='month',intCompound=false;
let currentPnlRange='30d',customFromDate=null,customToDate=null;
let assetQuery='',assetSort='value',debtQuery='',debtSort='amount',allocMode='cat',assetView='cards';
// Open groups by category; null means untouched, so the default applies.
let assetGroups=null;
// Fewer assets than this: groups start open.
const GROUP_COLLAPSE_FROM=7;
function assetGroupOpen(cat,total){
  if(assetGroups&&Object.prototype.hasOwnProperty.call(assetGroups,cat))return !!assetGroups[cat];
  return total<GROUP_COLLAPSE_FROM;
}
function toggleAssetGroup(cat){
  const g=document.querySelector('.ag-group[data-cat="'+cat+'"]');
  if(!g)return;
  const willOpen=!g.classList.contains('open');
  g.classList.toggle('open',willOpen);
  const hd=g.querySelector('.ag-head');
  if(hd)hd.setAttribute('aria-expanded',willOpen?'true':'false');
  if(!assetGroups)assetGroups={};
  assetGroups[cat]=willOpen;
  state.settings.assetGroups=assetGroups;saveState();haptic('tap');
}
// Toggle each group's class so the CSS transition animates.
function setAllAssetGroups(open){
  const groups=[...document.querySelectorAll('.ag-group')];
  if(!groups.length)return;
  if(!assetGroups)assetGroups={};
  groups.forEach(g=>{
    g.classList.toggle('open',open);
    const hd=g.querySelector('.ag-head');
    if(hd)hd.setAttribute('aria-expanded',open?'true':'false');
    if(g.dataset.cat)assetGroups[g.dataset.cat]=open;
  });
  state.settings.assetGroups=assetGroups;saveState();haptic('tap');
}
let goalQuery='',goalSort='progress';
const GOAL_SORTS=['progress','target','saved','deadline','name'];
const GOAL_SORT_LBL={progress:'Progress',target:'Target',saved:'Saved',deadline:'Deadline',name:'Name'};
let deferredPrompt=null,csCache={},completedGoals=new Set();
let lastPriceTs=null,priceFailCount=0,fxFailCount=0,paletteSel=0,txMode=null,txUnit=null,txCashChoice=null;
const PRICE_KEY='paisafolio_prices_v1';
const GOAL_COLORS=[{name:'acc',hex:'#f5a623'},{name:'grn',hex:'#16d6a4'},{name:'blu',hex:'#5aa6ff'},{name:'pur',hex:'#b39bff'},{name:'red',hex:'#ff5b75'},{name:'org',hex:'#ff7b3a'}];
const SORTS=['value','name','pnl','recent'],SORT_LBL={value:'Value',name:'Name',pnl:'P&L %',recent:'Recent'};
// LOAD/SAVE
let _storageWarned=false;
// DEVICE PREFERENCES
// Theme, hidden balances, haptics, motion, fonts and view choices belong to the device,
// not the account. They get their own key, written in any sign-in state; index.html reads
// it before CSS so first paint is right.
// TYPEFACE CHOICE
// Self-hosted, unicode-range scoped; a face downloads only once selected.
const FONT_CHOICES = [
  { id:'poppins',  label:'Poppins',        stack:"'Poppins','Poppins Fallback',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif", note:'Default, geometric' },
  { id:'inter',    label:'Inter',          stack:"'Inter',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",                      note:'Neutral, very legible' },
  { id:'plex',     label:'IBM Plex Sans',  stack:"'IBM Plex Sans',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",              note:'Warm, slightly technical' },
  { id:'grotesk',  label:'Space Grotesk',  stack:"'Space Grotesk',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",              note:'Distinctive, wide' },
  { id:'mono',     label:'JetBrains Mono', stack:"'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace",                      note:'Monospaced, every digit aligns' },
  { id:'system',   label:'System',         stack:"system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif",       note:'Whatever your device uses' },
];
function fontStack(id){
  const f = FONT_CHOICES.find(x => x.id === id);
  return f ? f.stack : FONT_CHOICES[0].stack;
}
function applyFonts(){
  const root = document.documentElement;
  const textId = (state.settings && state.settings.fontText) || 'poppins';
  const numId  = (state.settings && state.settings.fontNum)  || '';
  root.style.setProperty('--font', fontStack(textId));
  // Empty means "same as text", which is the default and needs no override.
  if (numId) root.style.setProperty('--font-num', fontStack(numId));
  else root.style.removeProperty('--font-num');
}
function setFontChoice(which, id){
  state.settings[which === 'num' ? 'fontNum' : 'fontText'] = id || null;
  saveState(); applyFonts(); invalidateCharts(); haptic('tap');
  renderFontOptions();
  // Chart.js bakes the font into its own canvas text, so rebuild after a change.
  requestAnimationFrame(() => requestAnimationFrame(() => { try { renderAll(); } catch (e) {} }));
}
function syncFontSettingsLabel(){
  const sub = el('fontSettingsSub'); if (!sub) return;
  const t = FONT_CHOICES.find(f => f.id === ((state.settings && state.settings.fontText) || 'poppins'));
  const nId = state.settings && state.settings.fontNum;
  const n = nId ? FONT_CHOICES.find(f => f.id === nId) : null;
  sub.textContent = (t ? t.label : 'Poppins') + (n ? ', ' + n.label + ' for numbers' : '');
}
function renderFontOptions(){
  const mk = (which, current, includeSame) => {
    const opts = includeSame
      ? [{ id:'', label:'Same as text', note:'' }].concat(FONT_CHOICES)
      : FONT_CHOICES;
    return opts.map(f => `
      <button class="font-opt ${(current || '') === f.id ? 'active' : ''}"
              onclick="setFontChoice('${which}','${f.id}')"
              style="${f.id ? `font-family:${f.stack.replace(/"/g, '&quot;')}` : ''}">
        <span class="font-opt-name">${esc(f.label)}</span>
        <span class="font-opt-sample">${which === 'num' ? '1,234.50' : 'Aa'}</span>
        ${f.note ? `<span class="font-opt-note">${esc(f.note)}</span>` : ''}
      </button>`).join('');
  };
  const t = el('fontTextOptions');
  if (t) t.innerHTML = mk('text', (state.settings && state.settings.fontText) || 'poppins', false);
  const n = el('fontNumOptions');
  if (n) n.innerHTML = mk('num', (state.settings && state.settings.fontNum) || '', true);
  syncFontSettingsLabel();
}
function openFontSettings(){ renderFontOptions(); openModal('fontModal'); }
const DEVICE_PREFS_KEY = 'paisafolio_device_prefs';
// Device-only prefs. `currency` is the display currency; `baseCurrency` (what stored
// numbers mean) stays synced.
const DEVICE_PREF_KEYS = ['theme', 'hideBalance', 'haptics', 'hapticStrength', 'reduceMotion', 'fontText', 'fontNum',
  'currency',
  'assetView', 'assetSort', 'activeCat', 'assetGroups', 'activeDebtTab', 'debtSort', 'goalSort'];
// Captured for the sync layer to re-apply after it replaces state.
function captureDevicePrefs(){
  const out={};
  DEVICE_PREF_KEYS.forEach(k=>{ if(state.settings[k]!==undefined) out[k]=state.settings[k]; });
  return out;
}
if(typeof window!=='undefined'){window.captureDevicePrefs=captureDevicePrefs;window.DEVICE_PREF_KEYS=DEVICE_PREF_KEYS;}
function saveDevicePrefs(){
  try {
    const out = {};
    DEVICE_PREF_KEYS.forEach(k => { if (state.settings[k] !== undefined) out[k] = state.settings[k]; });
    localStorage.setItem(DEVICE_PREFS_KEY, JSON.stringify(out));
  } catch (e) { /* storage full or blocked, the in-memory setting still applies */ }
}
// Re-read view choices whenever state is replaced (boot reads the guest copy first).
function adoptViewPrefs(){
  const st=(state&&state.settings)||{};
  // Every formatter reads this; keep it in step with state.
  currentCurrency=CURRENCIES.find(c=>c.code===st.currency)||CURRENCIES[0];
  assetSort=st.assetSort||'value';
  assetView=st.assetView||'cards';
  activeCat=st.activeCat||'all';
  assetGroups=(st.assetGroups&&typeof st.assetGroups==='object')?st.assetGroups:null;
  activeDebtTab=st.activeDebtTab||'owed';
  debtSort=st.debtSort||'amount';
  goalSort=st.goalSort||'progress';
  selectedAssetType=st.lastAssetType||'crypto';
  selectedCommodityId=st.lastCommodityId||'gold';
  selectedCommodityUnit=st.lastCommodityUnit||'gram';
  selectedLiquidityType=st.lastLiquidityType||'savings';
  const cb=el('viewCardsBtn'),tb=el('viewTableBtn');
  if(cb)cb.classList.toggle('on',assetView==='cards');
  if(tb)tb.classList.toggle('on',assetView==='table');
  document.querySelectorAll('#catBar .cat-pill').forEach(p=>
    p.classList.toggle('active',p.dataset.cat===activeCat));
  const dO=el('dTabOwed'),dI=el('dTabIOwe');
  if(dO)dO.classList.toggle('active',activeDebtTab==='owed');
  if(dI)dI.classList.toggle('active',activeDebtTab==='iowe');
}
if(typeof window!=='undefined')window.adoptViewPrefs=adoptViewPrefs;
function loadDevicePrefs(){
  let prefs = null;
  try { const raw = localStorage.getItem(DEVICE_PREFS_KEY); if (raw) prefs = JSON.parse(raw); } catch (e) {}
  // No key yet (older install): adopt current values and save.
  if (!prefs || typeof prefs !== 'object') { saveDevicePrefs(); return; }
  DEVICE_PREF_KEYS.forEach(k => { if (prefs[k] !== undefined) state.settings[k] = prefs[k]; });
}
// Saves coalesce to the next idle moment; every page exit and any storage read flushes first.
let _saveTimer=null,_savePending=false;
const SAVE_DEBOUNCE_MS=250;
function saveState(){
  _savePending=true;
  if(_saveTimer)return;
  _saveTimer=setTimeout(()=>{_saveTimer=null;flushSave();},SAVE_DEBOUNCE_MS);
  schedulePush();
}
// Write now, whatever is pending. Safe to call when nothing is.
function flushSave(){
  if(!_savePending)return;
  _savePending=false;
  if(_saveTimer){clearTimeout(_saveTimer);_saveTimer=null;}
  writeStateNow();
}
if(typeof window!=='undefined'){
  // pagehide covers the iOS back-forward cache, where unload never fires.
  window.addEventListener('pagehide',flushSave);
  window.addEventListener('beforeunload',flushSave);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)flushSave();});
}
function writeStateNow(){
  try {
    if(supabaseUser){
      // Signed in: write ONLY to per-user cloud cache; never touch paisafolio_local
      localStorage.setItem(cloudKey(supabaseUser.id),JSON.stringify(state));
    } else {
      // Not signed in: write ONLY to local key; cloud keys are untouched
      localStorage.setItem(STORE_KEY,JSON.stringify(state));
    }
    saveDevicePrefs();
    _storageWarned=false;
  } catch(e) {
    // A failed save loses data on refresh; say so once.
    console.error('[storage] Save failed:',e);
    if(!_storageWarned){
      _storageWarned=true;
      const quota=e&&(e.name==='QuotaExceededError'||e.name==='NS_ERROR_DOM_QUOTA_REACHED'||e.code===22);
      try{
        toast(quota?'Storage full, changes are NOT being saved. Export a backup, then clear old data.'
                   :'Couldn\u2019t save to this device. In private browsing, changes are lost when you close the tab.','error');
      }catch(_){}
    }
  }
}
function loadState(){
  // Always load from the local key on startup, auth switching handled separately
  try{const s=localStorage.getItem(STORE_KEY);if(s)state={...state,...JSON.parse(s)};}catch(e){}
  state.settings=Object.assign({currency:'NPR',baseCurrency:'NPR',hideBalance:false,theme:'dark',haptics:true,hapticStrength:'medium',reduceMotion:false,onboarded:false,lastPage:'dash',lastAssetType:'crypto',lastCommodityId:'gold',lastCommodityUnit:'gram',lastLiquidityType:'savings',lastTxUnit:{},assetSort:'value',assetView:'cards',activeCat:'all',activeDebtTab:'owed',debtSort:'amount',goalSort:'progress',autoLockDelay:'5min'},state.settings||{});
  // Every list must be an array before anything iterates it.
  ['assets','debts','goals','recurs','transactions','pnlHistory'].forEach(k=>{
    if(!Array.isArray(state[k]))state[k]=[];
  });
  state.assets.forEach(a=>{if(a.category==='cash')a.category='liquidity';// Migrate old proxy coinImage URLs to direct URLs
    if(a.coinImage&&a.coinImage.startsWith('/api/coinimage?url=')){try{a.coinImage=decodeURIComponent(a.coinImage.replace('/api/coinimage?url=',''));}catch(e){}}
  });
  migrateDuplicateCommodityAssets();
  migrateTransactionAssetIds();
  migratePropertyTxQty();
  migrateDebtLedgers();
  state.transactions.forEach(t=>{if(t.coinImage&&t.coinImage.startsWith('/api/coinimage?url=')){try{t.coinImage=decodeURIComponent(t.coinImage.replace('/api/coinimage?url=',''));}catch(e){}}});
  if(!state.pnlHistory)state.pnlHistory=[];if(!state.transactions)state.transactions=[];
  state.goals.forEach(g=>{if((g.target>0)&&(g.saved||0)>=g.target)completedGoals.add(g.id);});
}
// Properties have no quantity; old entries recorded 1, which broke the ledger replay.
function migratePropertyTxQty(){
  const props=new Set((state.assets||[]).filter(a=>a.category==='property').map(a=>a.id));
  if(!props.size)return;
  (state.transactions||[]).forEach(t=>{
    if(t.transfer)return;
    if(!(props.has(t.assetId)||t.category==='property'))return;
    if(t.qty==null&&t.perUnit==null&&t.enteredQty==null)return;
    t.qty=null;t.perUnit=null;t.enteredQty=null;t.enteredUnit=null;
  });
}
// One-time: merge duplicate commodity holdings (same commodityId) into the oldest one's unit.
function migrateDuplicateCommodityAssets(){
  const byCommodity={};
  state.assets.forEach(a=>{if(a.category!=='commodity'||!a.commodityId)return;(byCommodity[a.commodityId]=byCommodity[a.commodityId]||[]).push(a);});
  Object.values(byCommodity).forEach(group=>{
    if(group.length<2)return;
    group.sort((a,b)=>new Date(a.date||0)-new Date(b.date||0));
    const keep=group[0],dupes=group.slice(1);
    dupes.forEach(dupe=>{
      const fromUnit=dupe.unit||keep.unit,toUnit=keep.unit||dupe.unit;
      const convQty=convertUnit(dupe.qty||0,fromUnit,toUnit);
      const convPerUnitCost=convQty?((dupe.buyPrice||0)*(dupe.qty||0))/convQty:dupe.buyPrice;
      const oldQty=keep.qty||0,oldCost=oldQty*(keep.buyPrice||0);
      const newQty=oldQty+convQty;
      keep.buyPrice=newQty>0?(oldCost+(convPerUnitCost||0)*convQty)/newQty:keep.buyPrice;
      keep.qty=newQty;
      if(dupe.currentPrice!=null&&keep.currentPrice==null)keep.currentPrice=dupe.currentPrice;
      state.assets=state.assets.filter(a=>a.id!==dupe.id);
    });
  });
}
// One-time: backfill assetId on transactions that were linked by name+category.
function migrateTransactionAssetIds(){
  let changed=false;
  (state.transactions||[]).forEach(t=>{
    if(t.assetId)return; // already linked
    const match=state.assets.find(a=>a.name===t.name&&a.category===t.category);
    if(match){t.assetId=match.id;changed=true;}
  });
  if(changed)saveState();
}
// Wording per asset kind: a bank buy is a deposit. Stored txType stays buy/sell.
function txTypeLabel(t){
  if(!t)return 'BUY';
  if(t.txType==='income')return (t.incomeKind||'income').toUpperCase();
  const isCash=t.category==='liquidity';
  if(t.transfer){
    if(!isCash)return t.txType==='buy'?'MONEY IN':'MONEY OUT';
    return t.txType==='buy'?'DEPOSIT':'WITHDRAW';
  }
  if(isCash)return t.txType==='sell'?'WITHDRAW':'DEPOSIT';
  return (t.txType||'buy').toUpperCase();
}
// All user-facing wording goes through these.
const TX_PAST={BUY:'Bought',SELL:'Sold',DEPOSIT:'Deposited into',WITHDRAW:'Withdrew from',
  'MONEY IN':'Money into','MONEY OUT':'Money out of'};
const TX_NOUN={BUY:'purchase',SELL:'sale',DEPOSIT:'deposit',WITHDRAW:'withdrawal',
  'MONEY IN':'transfer in','MONEY OUT':'transfer out'};
function titleWord(s){return s.charAt(0)+s.slice(1).toLowerCase();}
// 'Deposit', 'Withdraw', 'Buy', sentence case, for a label in a row.
function txTypeWord(t){return titleWord(txTypeLabel(t));}
// 'Bought Bitcoin', 'Deposited into Nabil Savings'.
function txTypePhrase(t){
  const lbl=txTypeLabel(t), name=txDisplayName(t);
  if(t&&t.txType==='income')return titleWord(lbl)+' from '+name;
  return (TX_PAST[lbl]||titleWord(lbl))+' '+name;
}
// 'purchase', 'deposit', for 'Bitcoin purchase deleted'.
function txTypeNoun(t){
  const lbl=txTypeLabel(t);
  if(t&&t.txType==='income')return lbl.toLowerCase();
  return TX_NOUN[lbl]||lbl.toLowerCase();
}
// Live asset name wins; the stored name is the fallback.
function txDisplayName(t){
  if(!t)return '';
  const a=t.assetId?(state.assets||[]).find(x=>x.id===t.assetId):null;
  return (a&&a.name)||t.name||'';
}
function txsForAsset(asset){
  if(!asset)return[];
  return (state.transactions||[]).filter(t=>t.assetId?t.assetId===asset.id:(t.name===asset.name&&t.category===asset.category));
}

function cssVar(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim();}
// Darken or lighten a palette colour until it meets contrast on the current theme.
let _inkCache={};
function readableInk(hex,min){
  const m=/^#?([0-9a-fA-F]{6})$/.exec(String(hex||'').trim());
  if(!m)return hex||'currentColor';
  const light=resolveTheme(state.settings.theme)==='light';
  // Slightly above 4.5 for translucent grounds.
  const need=min||4.7;
  const key=(light?'L':'D')+m[1].toLowerCase()+need;
  if(_inkCache[key])return _inkCache[key];
  const lin=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);};
  const lum=c=>0.2126*lin(c[0])+0.7152*lin(c[1])+0.0722*lin(c[2]);
  const bgL=light?1:lum([24,24,24]);
  const ratio=c=>{const a=Math.max(lum(c),bgL),b=Math.min(lum(c),bgL);return (a+0.05)/(b+0.05);};
  let out=[parseInt(m[1].slice(0,2),16),parseInt(m[1].slice(2,4),16),parseInt(m[1].slice(4,6),16)];
  let guard=0;
  while(ratio(out)<need&&guard++<40){
    out=out.map(v=>light?Math.max(0,Math.round(v*0.9)):Math.min(255,Math.round(v+(255-v)*0.12)));
  }
  const res='#'+out.map(v=>v.toString(16).padStart(2,'0')).join('');
  _inkCache[key]=res;
  return res;
}
function themeColors(){return{accent:cssVar('--accent'),red:cssVar('--red'),green:cssVar('--green'),text:cssVar('--text'),text2:cssVar('--text2'),text3:cssVar('--text3'),border:cssVar('--border2'),card:cssVar('--card')};}
function resolveTheme(t){if(t==='auto')return(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark';return t;}
function applyTheme(t){const resolved=resolveTheme(t);_inkCache={};const root=document.documentElement;if(root.dataset.theme&&root.dataset.theme!==resolved&&!state.settings.reduceMotion){root.classList.add('theme-anim');clearTimeout(applyTheme._t);applyTheme._t=setTimeout(()=>root.classList.remove('theme-anim'),400);}root.dataset.theme=resolved;const m=el('metaTheme');if(m)m.content=cssVar('--bg');const sun=ICONS.sun,moon=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;const tt=el('themeToggle');if(tt){tt.innerHTML=resolved==='dark'?sun.replace('<svg ','<svg width="15" height="15" '):moon;
  // The icon shows what a tap gives; the label must match.
  const nextLbl=resolved==='dark'?'Switch to the light theme':'Switch to the dark theme';
  tt.setAttribute('aria-label',nextLbl);tt.title=nextLbl;}
  el('themeOptAuto')&&el('themeOptAuto').classList.toggle('active',t==='auto');el('themeOptDark')&&el('themeOptDark').classList.toggle('active',t==='dark');el('themeOptLight')&&el('themeOptLight').classList.toggle('active',t==='light');}
function setTheme(t){state.settings.theme=t;saveState();haptic('tap');applyTheme(t);invalidateCharts();renderTicker();announce(t==='auto'?'Auto theme':(t==='dark'?'Dark theme':'Light theme')); // Chart.js reads CSS vars at paint time
// Schedule after two animation frames so CSS vars have settled
requestAnimationFrame(()=>requestAnimationFrame(()=>{renderMiniChart(calcNetWorth());renderDonut(state.assets.reduce((s,a)=>s+getAssetCurrentValue(a),0));if(currentPage==='plan')renderPnLChart();renderSettings();}));}
function toggleTheme(){setTheme(resolveTheme(state.settings.theme)==='dark'?'light':'dark');}
if(window.matchMedia){window.matchMedia('(prefers-color-scheme: light)').addEventListener('change',()=>{if(state.settings&&state.settings.theme==='auto')applyTheme('auto');});}
// CURRENCY
// Changing the base rewrites every stored money field; all of them must be listed here.
function convertStoredAmounts(f){
  const m=(o,k)=>{if(o&&o[k]!=null&&o[k]!==''&&!isNaN(o[k]))o[k]=num(o[k])*f;};
  (state.assets||[]).forEach(a=>['buyPrice','currentPrice','value'].forEach(k=>m(a,k)));
  (state.debts||[]).forEach(d=>{
    m(d,'amount');
    if(d.interest)m(d.interest,'flatAmount');
    (d.lendHistory||[]).forEach(h=>m(h,'amount'));
    (d.payments||[]).forEach(x=>m(x,'amount'));
  });
  (state.goals||[]).forEach(g=>['target','saved','monthly'].forEach(k=>m(g,k)));
  (state.recurs||[]).forEach(r=>m(r,'amount'));
  (state.spends||[]).forEach(x=>m(x,'amount'));
  // realized is money too.
  (state.transactions||[]).forEach(t=>['amount','perUnit','realized'].forEach(k=>m(t,k)));
  (state.pnlHistory||[]).forEach(x=>m(x,'netWorth'));
  const scaleMap=o=>{const out={};Object.keys(o||{}).forEach(k=>{const v=num(o[k]);if(v)out[k]=v*f;});return out;};
  if(state.settings.budgetDefaults)state.settings.budgetDefaults=scaleMap(state.settings.budgetDefaults);
  if(state.settings.budgets){const b={};Object.keys(state.settings.budgets).forEach(mo=>{b[mo]=scaleMap(state.settings.budgets[mo]);});state.settings.budgets=b;}
}
async function setBaseCurrency(code){
  const from=baseCode();
  if(code===from){closeModal('currencyModal');return;}
  const f=getCurrRate(code);   // units of `code` per 1 unit of the old base
  if(!(f>0)){toast('No rate for '+code+' yet. Refresh prices and try again.','error');return;}
  const ok=await askConfirm({
    title:'Store everything in '+code+'?',
    message:'Every amount you have saved is in '+from+'. They will be converted once, at '
      +'1 '+from+' = '+f.toFixed(f<1?4:2)+' '+code+', and '+code+' becomes what the app stores from now on. '
      +'Nothing is lost, but the numbers will read differently. Export your data first if you want a copy as it stands.',
    confirmText:'Convert to '+code,danger:false});
  if(!ok)return;
  convertStoredAmounts(f);
  // Rescale manual rates to the new base; drop the new base's own.
  const cr=customRates(),next={};
  Object.keys(cr).forEach(k=>{const v=num(cr[k]);if(v>0&&k!==code)next[k]=v*f;});
  state.settings.customRates=next;
  state.settings.baseCurrency=code;
  if(state.settings.currency===from&&!CURRENCIES.some(c=>c.code===from))state.settings.currency=code;
  saveState();invalidateCharts();renderCurrGrid();updateCurrLabels();renderAll();renderTicker();
  haptic('success');toast('Everything is now stored in '+code,'success');
  renderCurrList();closeModal('currencyModal');
}
function setCurrency(code){state.settings.currency=code;currentCurrency=CURRENCIES.find(c=>c.code===code)||CURRENCIES[0];saveState();haptic('tap');invalidateCharts();renderCurrGrid();updateCurrLabels();renderAll();renderTicker();}
function updateCurrLabels(){document.querySelectorAll('.curr-lbl-span').forEach(el=>el.textContent=currentCurrency.code);}
// Units of `code` per 1 base. Overrides are stored as base per unit (1 USD = 153) and inverted here.
function customRates(){return (state.settings&&state.settings.customRates)||{};}
function customRateFor(code){const v=num(customRates()[code]);return v>0?v:null;}
function hasCustomRate(code){return customRateFor(code)!==null;}
// The currency every stored amount is in.
function baseCode(){return (state.settings&&state.settings.baseCurrency)||'NPR';}
function baseCcy(){return CURRENCIES.find(c=>c.code===baseCode())||CURRENCIES[0];}
// USD per 1 unit of the base, for the fallback when FX has not loaded yet.
function fxOf(code){const v=fxRates[code];return (typeof v==='number'&&v>0)?v:(code==='NPR'?133.5:(code==='USD'?1:0));}
function getCurrRate(code){
  const base=baseCode();
  if(code===base)return 1;
  const manual=customRateFor(code);
  if(manual)return 1/manual;                 // base per unit -> unit per base
  const u=fxOf(base),t=fxOf(code);return (u>0&&t>0)?t/u:1;
}
// Market rate, ignoring overrides.
function liveRateFor(code){
  const base=baseCode();
  if(code===base)return 1;
  const u=fxOf(base),t=fxOf(code);return (u>0&&t>0)?t/u:0;
}
// Base units per 1 `code`.
function basePerUnit(code){const r=liveRateFor(code);return r>0?1/r:null;}
// Lakh/crore only for these; others get K/M/B.
const LAKH_CRORE_CCY=new Set(['NPR','INR','PKR','LKR','BDT']);
function fmt(valNPR){if(state.settings.hideBalance)return currentCurrency.sym+'••••';const r=getCurrRate(currentCurrency.code),v=num(valNPR)*r,sym=currentCurrency.sym,a=Math.abs(v),sign=v<0?'-':'';
  const S=(x,d=2)=>x.toFixed(d).replace(/\.00$/,'');
  if(LAKH_CRORE_CCY.has(currentCurrency.code)){
    if(a>=1e7)return sign+sym+S(a/1e7)+'Cr';
    if(a>=1e5)return sign+sym+S(a/1e5)+'L';
    if(a>=1e3)return sign+sym+S(a/1e3)+'K';
  }else{
    if(a>=1e9)return sign+sym+S(a/1e9)+'B';
    if(a>=1e6)return sign+sym+S(a/1e6)+'M';
    if(a>=1e3)return sign+sym+S(a/1e3)+'K';
  }
  // Under 1000: group thousands, keep 2dp, so small balances stay exact.
  return sign+sym+a.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});}
function usdToBase(usd){const b=fxOf(baseCode());return usd*(b>0?b:1);}
// Legacy name: into the base currency.
const usdToNpr=usdToBase;
// NEPSE quotes rupees, not dollars, so it needs the other direction.
function nprToBase(npr){const r=fxOf('NPR');return r>0?usdToBase(npr/r):npr;}
// APIS
// /api/* (Vercel) first; if it is not there, call public APIs from the browser.
const CG_PROXY='/api/crypto';
const TOLA_IN_GRAMS=11.6638;

// Remember for the session once /api/* is known to be missing.
let _vercelApiDown=false;

async function fetchFxRates(){try{const d=await fetchJSON('https://open.er-api.com/v6/latest/USD');if(d&&d.rates){fxRates=d.rates;fxRates['USD']=1;fxFailCount=0;persistPrices();}}catch(e){fxFailCount++;}}

// Direct-from-browser fallbacks (no Node/Vercel involved)
const CG_DIRECT='https://api.coingecko.com/api/v3';
async function directCryptoPrices(ids){return await fetchJSON(`${CG_DIRECT}/simple/price?ids=${encodeURIComponent(ids)}&vs_currencies=usd&include_24hr_change=true`,1);}
async function directCryptoSearch(q){return await fetchJSON(`${CG_DIRECT}/search?query=${encodeURIComponent(q)}`,1);}
async function directCryptoOHLC(id,days){return await fetchJSON(`${CG_DIRECT}/coins/${encodeURIComponent(id)}/ohlc?vs_currency=usd&days=${days}`,1);}
async function directCryptoChart(id,days,interval){return await fetchJSON(`${CG_DIRECT}/coins/${encodeURIComponent(id)}/market_chart?vs_currency=usd&days=${days}${interval==='daily'?'&interval=daily':''}`,1);}
async function directCryptoHistory(id,cgDate){return await fetchJSON(`${CG_DIRECT}/coins/${encodeURIComponent(id)}/history?date=${cgDate}&localization=false`,1);}
// Browser fallback for api/metals.js; the scrape usually fails on CORS, then spot × FX.
async function directMetals(){
  const fx=await fetchJSON('https://open.er-api.com/v6/latest/USD',1);
  const nprPerUsd=fx?.rates?.NPR;
  if(!nprPerUsd)throw new Error('NPR rate missing');
  const [gold,silver,plat]=await Promise.all([
    fetchJSON('https://api.gold-api.com/price/XAU',1).catch(()=>null),
    fetchJSON('https://api.gold-api.com/price/XAG',1).catch(()=>null),
    fetchJSON('https://api.gold-api.com/price/XPT',1).catch(()=>null),
  ]);
  const goldUsd=gold?.price,silverUsd=silver?.price;
  if(!goldUsd||!silverUsd)throw new Error('Metal prices missing');
  const usdOzToNprTola=usdPerOz=>(usdPerOz/31.1035)*TOLA_IN_GRAMS*nprPerUsd;
  return{
    gold_tola_npr:Math.round(usdOzToNprTola(goldUsd)),
    silver_tola_npr:Math.round(usdOzToNprTola(silverUsd)),
    gold_gram_npr:(goldUsd/31.1035)*nprPerUsd,
    silver_gram_npr:(silverUsd/31.1035)*nprPerUsd,
    platinum_tola_npr:plat?.price?Math.round(usdOzToNprTola(plat.price)):null,
    platinum_gram_npr:plat?.price?(plat.price/31.1035)*nprPerUsd:null,
    usd_npr:nprPerUsd,source:'gold-api.com + open.er-api.com (direct browser fallback)',
  };
}
// Nepal NPR metal rates via /api/metals, falling back to the browser.
async function fetchMetals(){
  let d=null;
  if(!_vercelApiDown){
    try{ d=await fetchJSON('/api/metals',1); }
    catch(e){ if(isVercelUnreachable(e)) _vercelApiDown=true; }
  }
  if(!d){
    try{ d=await directMetals(); }
    catch(e){ if(!window._metalsWarnShown){console.warn('fetchMetals:',e.message,'(further failures suppressed)');window._metalsWarnShown=true;} return; }
  }
  if(!d||!d.gold_tola_npr)return;
  const npr=fxRates['NPR']||133.5;
  const tolaToOz=31.1035/TOLA_IN_GRAMS;
  const goldUsdOz=(d.gold_tola_npr/npr)*tolaToOz;
  const silverUsdOz=(d.silver_tola_npr/npr)*tolaToOz;
  livePrices['tether-gold']={usd:goldUsdOz,change24h:livePrices['tether-gold']?.change24h||0,nepalTolaNpr:d.gold_tola_npr,nepalGramNpr:d.gold_gram_npr};
  livePrices['silver']={usd:silverUsdOz,change24h:livePrices['silver']?.change24h||0,nepalTolaNpr:d.silver_tola_npr,nepalGramNpr:d.silver_gram_npr};
  livePrices['kinesis-gold']={...livePrices['tether-gold']};
  livePrices['kinesis-silver']={...livePrices['silver']};
  if(d.platinum_tola_npr){const platUsdOz=(d.platinum_tola_npr/npr)*tolaToOz;livePrices['platinum']={usd:platUsdOz,change24h:livePrices['platinum']?.change24h||0};}
}
// NEPSE
// No NEPSE source allows browser reads, so this goes through /api/nepse. Failures are
// silent: the typed price stays.
const NEPSE_PROXY='/api/nepse';
let nepsePrices={},nepseAsOf=null,nepseStale=false,_nepseOff=false;
// Ticker, or the name for older holdings.
function nepseSym(a){return String((a&&(a.ticker||a.name))||'').trim().toUpperCase();}
// Listed means quoted by today's feed; the stored flag is not rewritten.
function isNepseListed(a){
  if(!a||a.category!=='stock'||!a.isNepse)return false;
  // Feed down: trust the flag.
  if(!Object.keys(nepsePrices).length)return true;
  return nepseKnows(a.ticker)||nepseKnows(a.name);
}
function nepseQuote(a){
  if(!a||a.category!=='stock'||!a.isNepse)return null;
  return nepsePrices[nepseSym(a)]||null;
}
async function fetchNepse(force){
  if(_nepseOff)return;
  // Skip when no NEPSE shares are held; `force` is for the search box.
  if(!force&&!(state.assets||[]).some(a=>a&&a.category==='stock'&&a.isNepse))return;
  try{
    const d=await fetchJSON(NEPSE_PROXY,1);
    // No /api here; stop asking.
    if(!d||typeof d!=='object'){_nepseOff=true;return;}
    if(d.configured===false){_nepseOff=true;return;}
    if(d.prices&&Object.keys(d.prices).length){
      nepsePrices=d.prices;nepseAsOf=d.asOf||null;nepseStale=!!d.stale;
    }
  }catch(e){ if(isVercelUnreachable(e))_nepseOff=true; }
}
async function fetchPrices(manual){const ids=new Set(['bitcoin','ethereum','binancecoin','solana','tether-gold','silver','kinesis-silver','kinesis-gold','ripple','cardano','platinum','polkadot']);state.assets.forEach(a=>{if(a.coinId)ids.add(a.coinId);});
  let cgOk=false;
  let data=null;
  if(!_vercelApiDown){
    try{ data=await fetchJSON(`${CG_PROXY}?action=prices&ids=${[...ids].join(',')}`); }
    catch(e){ if(isVercelUnreachable(e)) _vercelApiDown=true; }
  }
  if(!data && _vercelApiDown){
    try{ data=await directCryptoPrices([...ids].join(',')); }catch(e){}
  }
  if(data&&Object.keys(data).length){Object.entries(data).forEach(([id,v])=>{if(v&&typeof v.usd==='number')livePrices[id]={usd:v.usd,change24h:v.usd_24h_change||0};});cgOk=true;}
  // Always overlay accurate metal spot prices (works even if CoinGecko is down)
  await fetchMetals();
  await fetchNepse();
  if(cgOk||Object.keys(livePrices).length){state.lastUpdated=new Date().toISOString();lastPriceTs=Date.now();priceFailCount=0;persistPrices();trackPnLHistory();saveState();renderAll();renderTicker();updateSyncLabel();if(manual)toast('Prices updated','success');}
  else{priceFailCount++;updateSyncLabel();renderTicker();if(manual){toast('Price service busy, will retry shortly','error');}else if(priceFailCount<=4){clearTimeout(window._priceRetry);window._priceRetry=setTimeout(()=>fetchPrices(false),Math.min(30000,4000*priceFailCount));}}}
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}
// Fall back only when the function is missing (404/405, HTML, network), not on upstream errors.
function isVercelUnreachable(e){
  const msg=(e&&e.message)||'';
  return msg==='HTTP 404'||msg==='HTTP 405'||msg==='NOT_JSON'||/Failed to fetch|NetworkError|Load failed/i.test(msg);
}
const FETCH_TIMEOUT_MS=12000;
async function fetchJSON(url,retries=2){let err;for(let i=0;i<=retries;i++){try{
  // A stalled socket never rejects without a timeout.
  const ctrl=new AbortController();
  const tid=setTimeout(()=>ctrl.abort(),FETCH_TIMEOUT_MS);
  let r;
  try{ r=await fetch(url,{headers:{accept:'application/json'},signal:ctrl.signal}); }
  finally{ clearTimeout(tid); }
  if(r.status===429){await sleep(900*(i+1));err=new Error('429');continue;}
  if(!r.ok)throw new Error('HTTP '+r.status);
  // Static hosts answer 200 with HTML; detect it explicitly.
  const text=await r.text();
  try{return JSON.parse(text);}catch(parseErr){throw new Error('NOT_JSON');}
}catch(e){err=e;if(i<retries)await sleep(500*(i+1));}}throw err;}
function persistPrices(){try{localStorage.setItem(PRICE_KEY,JSON.stringify({livePrices,fxRates,nepsePrices,nepseAsOf,ts:lastPriceTs||Date.now()}));}catch(e){}}
function loadPriceCache(){try{const s=localStorage.getItem(PRICE_KEY);if(s){const d=JSON.parse(s);if(d.livePrices&&Object.keys(d.livePrices).length)livePrices=d.livePrices;if(d.fxRates&&Object.keys(d.fxRates).length)fxRates=d.fxRates;if(d.nepsePrices&&Object.keys(d.nepsePrices).length){nepsePrices=d.nepsePrices;nepseAsOf=d.nepseAsOf||null;}lastPriceTs=d.ts||null;}}catch(e){}}
function relTime(ts){if(!ts)return'never';const s=Math.floor((Date.now()-ts)/1000);if(s<8)return'just now';if(s<60)return s+'s ago';const m=Math.floor(s/60);if(m<60)return m+'m ago';const h=Math.floor(m/60);if(h<24)return h+'h ago';return Math.floor(h/24)+'d ago';}
function updateSyncLabel(){const lu=el('lastUpdated');if(lu)lu.textContent=lastPriceTs?'Synced '+relTime(lastPriceTs):(priceFailCount?'Service busy, retrying…':'Connecting…');const dot=document.querySelector('.live-dot');if(dot){const stale=!lastPriceTs||(Date.now()-lastPriceTs)>180000;dot.style.background=stale?'var(--text3)':'var(--green)';dot.title=lastPriceTs?'Live prices · synced '+relTime(lastPriceTs):'Connecting to live prices…';}updateConnBanner();}
function updateConnBanner(){
  const banner=el('connBanner');if(!banner)return;
  const icoBox=banner.querySelector('.conn-banner-ico'),msg=el('connBannerMsg'),retryBtn=el('connBannerRetry');
  if(!navigator.onLine){
    banner.style.display='flex';banner.className='conn-banner offline';
    icoBox.innerHTML=svgIcon('alert',15);
    msg.textContent="You're offline, showing last saved data. Prices won't update until you're back online.";
    retryBtn.style.display='none';
    return;
  }
  const staleMs=lastPriceTs?Date.now()-lastPriceTs:Infinity;
  const reallyStale=staleMs>600000||priceFailCount>=3; // 10 min stale or repeated failures
  if(reallyStale&&(state.assets||[]).some(a=>a.coinId)){
    banner.style.display='flex';banner.className='conn-banner stale';
    icoBox.innerHTML=svgIcon('clock',15);
    msg.textContent=lastPriceTs?'Live prices last updated '+relTime(lastPriceTs)+', values may be outdated.':'Couldn\u2019t reach the price service yet.';
    retryBtn.style.display='block';
    return;
  }
  banner.style.display='none';
}
function proxyImg(url){
  if(!url)return'';
  // Direct URL - /api/coinimage proxy breaks on static hosting
  return url;
}
async function searchCryptoWithImages(q){
  try{
    let d;
    if(!_vercelApiDown){ try{ d=await fetchJSON(`${CG_PROXY}?action=search&query=${encodeURIComponent(q)}`,1); }catch(e){ if(isVercelUnreachable(e)) _vercelApiDown=true; else throw e; } }
    if(!d && _vercelApiDown) d=await directCryptoSearch(q);
    return(d.coins||[]).slice(0,7).map(c=>({id:c.id,name:c.name,symbol:c.symbol,image:proxyImg(c.thumb||c.large||'')}));
  }catch(e){return[];}
}
async function fetchCoinPrice(id){
  try{
    let d;
    if(!_vercelApiDown){ try{ d=await fetchJSON(`${CG_PROXY}?action=coin&id=${id}`,1); }catch(e){ if(isVercelUnreachable(e)) _vercelApiDown=true; else throw e; } }
    if(!d && _vercelApiDown) d=await directCryptoPrices(id);
    const p=d[id];if(p){livePrices[id]={usd:p.usd,change24h:p.usd_24h_change||0};persistPrices();}return p?p.usd:null;
  }catch(e){return null;}
}
async function fetchHistoricalPrice(coinId,dateStr){// dateStr: YYYY-MM-DD
  const[y,mo,d]=dateStr.split('-');const cgDate=`${d}-${mo}-${y}`;// CoinGecko wants DD-MM-YYYY
  try{
    let data;
    if(!_vercelApiDown){ try{ data=await fetchJSON(`${CG_PROXY}?action=history&id=${coinId}&date=${cgDate}`,1); }catch(e){ if(isVercelUnreachable(e)) _vercelApiDown=true; else throw e; } }
    if(!data && _vercelApiDown) data=await directCryptoHistory(coinId,cgDate);
    const p=data?.market_data?.current_price?.usd;return p||null;
  }catch(e){return null;}
}
async function fetchOHLC(id,days){
  const key=id+'_'+days;if(csCache[key])return csCache[key];
  try{
    let d;
    if(!_vercelApiDown){ try{ d=await fetchJSON(`${CG_PROXY}?action=ohlc&id=${id}&days=${days}`,1); }catch(e){ if(isVercelUnreachable(e)) _vercelApiDown=true; else throw e; } }
    if(!d && _vercelApiDown) d=await directCryptoOHLC(id,days);
    if(Array.isArray(d)&&d.length)csCache[key]=d;return csCache[key]||null;
  }catch(e){return null;}
}
// market_chart reaches far further back than /ohlc; candles are built from it here.
async function fetchChartSeries(id,days,interval){
  const key='mc_'+id+'_'+days+'_'+(interval||'auto');
  if(csCache[key])return csCache[key];
  try{
    let d;
    if(!_vercelApiDown){ try{ d=await fetchJSON(`${CG_PROXY}?action=chart&id=${id}&days=${days}${interval?'&interval='+interval:''}`,1); }catch(e){ if(isVercelUnreachable(e)) _vercelApiDown=true; else throw e; } }
    if(!d && _vercelApiDown) d=await directCryptoChart(id,days,interval);
    const pr=d&&Array.isArray(d.prices)?d.prices:null;
    if(pr&&pr.length)csCache[key]=pr;
    return csCache[key]||null;
  }catch(e){return null;}
}
// Binance klines: keyless, real OHLC, pageable backwards. CoinGecko is the fallback.
const CS_PAIRS={bitcoin:'BTC',ethereum:'ETH',binancecoin:'BNB',solana:'SOL',
  ripple:'XRP',cardano:'ADA',polkadot:'DOT',dogecoin:'DOGE',tron:'TRX',
  'avalanche-2':'AVAX',chainlink:'LINK',litecoin:'LTC','matic-network':'MATIC',
  'shiba-inu':'SHIB',uniswap:'UNI',stellar:'XLM','bitcoin-cash':'BCH',
  'near':'NEAR',aptos:'APT',arbitrum:'ARB',optimism:'OP',cosmos:'ATOM',
  filecoin:'FIL',injective:'INJ',sui:'SUI','tether-gold':'PAXG'};
const _csPairCache={};
// Unknown coins: look up the ticker via CoinGecko search.
async function csPairFor(coinId){
  if(!coinId)return null;
  if(coinId in _csPairCache)return _csPairCache[coinId];
  let sym=CS_PAIRS[coinId]||null;
  if(!sym){
    try{
      const hits=await searchCryptoWithImages(coinId);
      const hit=hits.find(c=>c.id===coinId);
      if(hit&&hit.symbol)sym=String(hit.symbol).toUpperCase();
    }catch(e){}
  }
  const pair=sym&&/^[A-Z0-9]{2,15}$/.test(sym)?sym+'USDT':null;
  _csPairCache[coinId]=pair;
  return pair;
}
// One page of candles; endTime walks backwards. Returns [ts,o,h,l,c].
async function fetchKlines(pair,interval,limit,endTime){
  const key='kl_'+pair+'_'+interval+'_'+(limit||1000)+'_'+(endTime||'now');
  if(csCache[key])return csCache[key];
  let raw=null;
  const qs=`${CG_PROXY}?action=klines&symbol=${encodeURIComponent(pair)}`
    +`&interval=${encodeURIComponent(interval)}&limit=${limit||1000}`
    +(endTime?`&endTime=${endTime}`:'');
  try{ raw=await fetchJSON(qs,1); }
  catch(e){ if(isVercelUnreachable(e)) _vercelApiDown=true; return null; }
  if(!Array.isArray(raw)||!raw.length)return null;
  const out=[];
  for(const k of raw){
    const t=+k[0],o=+k[1],h=+k[2],l=+k[3],c=+k[4];
    if(!isFinite(t)||!isFinite(o)||!isFinite(c))continue;
    out.push([t,o,h,l,c]);
  }
  if(out.length)csCache[key]=out;
  return out.length?out:null;
}
// Series to candles on a fixed grid. Open is the previous close, so one-sample buckets
// (daily data) are not flat dojis.
function csCandlesFromSeries(series,bucketMs){
  if(!series||!series.length||!(bucketMs>0))return[];
  const out=[];let cur=null,curT=-1,prevClose=null;
  for(const pt of series){
    const t=+pt[0],v=+pt[1];
    if(!isFinite(t)||!isFinite(v))continue;
    const b=Math.floor(t/bucketMs)*bucketMs;
    if(b!==curT){
      if(cur){out.push(cur);prevClose=cur[4];}
      curT=b;
      const o=prevClose==null?v:prevClose;
      cur=[b,o,Math.max(o,v),Math.min(o,v),v];
      continue;
    }
    if(v>cur[2])cur[2]=v;
    if(v<cur[3])cur[3]=v;
    cur[4]=v;
  }
  if(cur)out.push(cur);
  return out;
}
// Per-holding values for the day, rounded, non-zero only. The scheduled job also writes
// these every two hours (api/snapshot.js).
function assetValueSnapshot(){
  const m={};
  (state.assets||[]).forEach(a=>{
    if(!a||!a.id)return;
    const v=Math.round(num(getAssetCurrentValue(a)));
    if(v)m[a.id]=v;
  });
  return m;
}
// Recipe for api/snapshot.js: each priced holding is a leg with the feed reading (`p`)
// and its value then (`v`); the job scales v × newP / p. Unpriced holdings carry over.
// Must mirror the branches in getAssetCurrentPrice().
function assetPriceLeg(a){
  if(!a)return null;
  if(a.coinId&&livePrices[a.coinId]){
    const lp=livePrices[a.coinId];
    if(a.category==='commodity'&&lp.nepalTolaNpr&&baseCode()==='NPR'){
      const u=a.unit||'troy oz';
      // Gram/kg use the per-gram rate when there is one.
      if((u==='gram'||u==='kg')&&lp.nepalGramNpr)
        return {k:'coin:'+a.coinId+':nepalGramNpr',p:num(lp.nepalGramNpr)};
      return {k:'coin:'+a.coinId+':nepalTolaNpr',p:num(lp.nepalTolaNpr)};
    }
    return {k:'coin:'+a.coinId+':usd',p:num(lp.usd)};
  }
  const q=nepseQuote(a);
  if(q&&num(q.price)>0)return {k:'nepse:'+nepseSym(a)+':price',p:num(q.price)};
  return null;
}
function valuationRecipe(){
  const legs=[];
  let priced=0;
  (state.assets||[]).forEach(a=>{
    if(!a||!a.id)return;
    const v=num(getAssetCurrentValue(a));
    const leg=assetPriceLeg(a);
    if(leg&&leg.p>0&&v){
      legs.push({id:a.id,k:leg.k,p:leg.p,v:Math.round(v*100)/100});
      priced+=v;
    }else if(v){
      // No feed behind it, so the job leaves it exactly as it is.
      legs.push({id:a.id,v:Math.round(v*100)/100});
      priced+=v;
    }
  });
  const nw=num(calcNetWorth());
  return {
    v:1,
    base:baseCode(),
    nw:Math.round(nw),
    // Everything the legs do not cover (debts, zero-value holdings).
    fixed:Math.round((nw-priced)*100)/100,
    legs,
    at:new Date().toISOString(),
  };
}
const PNL_HIST_DAYS=365;
// Today in two-hour readings, kept for two days. Written while the app is open and by
// the scheduled job.
const INTRADAY_SLOT_MS=2*3600*1000;
const INTRADAY_KEEP_MS=48*3600*1000;
function trackIntraday(){
  if(!state.intraday||!Array.isArray(state.intraday))state.intraday=[];
  const now=Date.now();
  const slot=Math.floor(now/INTRADAY_SLOT_MS)*INTRADAY_SLOT_MS;
  const nw=Math.round(calcNetWorth());
  const last=state.intraday[state.intraday.length-1];
  if(last&&last.t===slot)last.v=nw;
  else state.intraday.push({t:slot,v:nw});
  const floor=now-INTRADAY_KEEP_MS;
  state.intraday=state.intraday.filter(x=>x&&x.t>=floor);
}
function trackPnLHistory(){
  const nw=calcNetWorth(),today=todayStr();
  if(!state.pnlHistory)state.pnlHistory=[];
  const av=assetValueSnapshot();
  const last=state.pnlHistory[state.pnlHistory.length-1];
  if(last&&last.date===today){last.netWorth=nw;last.assets=av;}
  else{
    state.pnlHistory.push({date:today,netWorth:nw,assets:av});
    if(state.pnlHistory.length>PNL_HIST_DAYS)state.pnlHistory=state.pnlHistory.slice(-PNL_HIST_DAYS);
  }
  trackIntraday();
}
// PRICING
function getAssetCurrentPrice(a){
  if(a.coinId&&livePrices[a.coinId]){
    const lp=livePrices[a.coinId];
    // Nepal retail rates, which are the right mark only for an NPR ledger.
    if(a.category==='commodity'&&lp.nepalTolaNpr&&baseCode()==='NPR'){
      const u=a.unit||'troy oz';
      if(u==='tola')return lp.nepalTolaNpr;
      if(u==='gram')return lp.nepalGramNpr||lp.nepalTolaNpr/TOLA_IN_GRAMS;
      if(u==='troy oz')return lp.nepalTolaNpr/TOLA_IN_GRAMS*31.1035;
      if(u==='kg')return(lp.nepalGramNpr||lp.nepalTolaNpr/TOLA_IN_GRAMS)*1000;
    }
    // Standard path: convert USD into the base currency.
    let p=lp.usd;
    if(a.category==='commodity'&&a.unit&&a.unit!=='troy oz'){
      const u=a.unit;
      if(u==='gram')p=p/31.1035;
      else if(u==='tola')p=p/31.1035*TOLA_IN_GRAMS;
      else if(u==='kg')p=p/31.1035*1000;
    }
    return usdToNpr(p);
  }
  // Quoted in NPR.
  {const q=nepseQuote(a);if(q&&q.price>0)return nprToBase(q.price);}
  if(a.currentPrice!=null&&a.currentPrice!==''&&!isNaN(a.currentPrice))return a.currentPrice;return null;
}
// Live price-per-unit in the base currency for an asset and unit (handles commodity unit conversion)
function getLivePricePerUnitNPR(a, unit){
  const u = unit || a.unit || 'troy oz';
  if(a.coinId && livePrices[a.coinId]){
    const lp = livePrices[a.coinId];
    if(a.category === 'commodity' && lp.nepalTolaNpr && baseCode()==='NPR'){
      if(u === 'tola') return lp.nepalTolaNpr;
      if(u === 'gram') return lp.nepalGramNpr || lp.nepalTolaNpr / TOLA_IN_GRAMS;
      if(u === 'troy oz') return lp.nepalTolaNpr / TOLA_IN_GRAMS * 31.1035;
      if(u === 'kg') return (lp.nepalGramNpr || lp.nepalTolaNpr / TOLA_IN_GRAMS) * 1000;
    }
    let p = lp.usd;
    if(a.category === 'commodity'){
      if(u === 'gram') p = p / 31.1035;
      else if(u === 'tola') p = p / 31.1035 * TOLA_IN_GRAMS;
      else if(u === 'kg') p = p / 31.1035 * 1000;
    }
    return usdToNpr(p);
  }
  if(a.currentPrice != null && !isNaN(a.currentPrice)){
    // currentPrice is stored per asset's base unit; convert if needed
    const base = a.unit || 'troy oz';
    if(u === base) return a.currentPrice;
    const conv = UNIT_CONVERSIONS[u] && UNIT_CONVERSIONS[u][base];
    return conv ? a.currentPrice * conv : a.currentPrice;
  }
  return null;
}
function calcLiquidityAccrued(a){
  if(a.category!=='liquidity'||!a.interest||!a.interestSince)return 0;
  const rate=parseFloat(a.interest);if(!rate||rate<=0)return 0;
  const since=new Date(a.interestSince);const now=new Date();if(now<=since)return 0;
  const days=(now-since)/864e5;
  const principal=a.value||0;
  return principal*(Math.pow(1+rate/100/365,days)-1);
}
// qty null = no unit count (value in buyPrice, one unit); qty 0 = sold out, worth nothing.
function assetUnits(a){return (a&&a.qty==null)?1:num(a&&a.qty);}
// Decimals worth showing: until the last digit is worth about one rupee. Also hides float noise.
function qtyDecimals(pricePerUnit){
  const p=Math.abs(num(pricePerUnit));
  if(!(p>0))return 4;                       // nothing to reason from yet
  return Math.min(8,Math.max(0,Math.ceil(Math.log10(p))));
}
function fmtQty(qty,asset){
  const q=num(qty);
  if(!isFinite(q))return '0';
  if(q===0)return '0';
  const price=asset?(getAssetCurrentPrice(asset)||asset.buyPrice||0):0;
  let dp=qtyDecimals(price);
  // Tiny holdings keep enough places to stay within 0.5%.
  while(dp<8&&Math.abs(q-+q.toFixed(dp))>Math.abs(q)*0.005)dp++;
  let out=q.toFixed(dp);
  if(out.indexOf('.')>=0)out=out.replace(/0+$/,'').replace(/\.$/,'');
  return out;
}
// Quantity with its unit, shared by the list and the detail sheet.
function qtyWithUnit(a,qty){
  if(!a)return '';
  const q=qty==null?a.qty:qty;
  if(q==null)return '';
  const txt=fmtQty(q,a);
  const unit=a.unit?' '+a.unit:(a.ticker?' '+a.ticker:(+txt===1?' unit':' units'));
  return txt+unit;
}
function getAssetCurrentValue(a){if(a.category==='liquidity')return(a.value||0)+calcLiquidityAccrued(a);const cp=getAssetCurrentPrice(a),q=assetUnits(a);if(cp!==null)return cp*q;return(a.buyPrice||0)*q;}
// A bank balance's cost is the balance; its profit is the interest.
function assetCost(a){
  if(!a)return 0;
  if(a.category==='liquidity')return num(a.value);
  return num(a.buyPrice)*assetUnits(a);
}
function getAssetPnL(a){
  if(a.category==='liquidity'){
    // The deposit is not a gain; accrued interest is.
    const acc=calcLiquidityAccrued(a);
    return acc>0?acc:null;
  }
  const cp=getAssetCurrentPrice(a);if(cp===null)return null;
  const q=assetUnits(a);return(cp*q)-(num(a.buyPrice)*q);
}
// Portfolio P&L: current value vs cost, plus realised gains. Not tied to a date range,
// unlike the net-worth change.
function portfolioPnL(){
  let invested=0,current=0;
  (state.assets||[]).forEach(a=>{invested+=assetCost(a);current+=getAssetCurrentValue(a);});
  let realized=0;
  (state.transactions||[]).forEach(t=>{if(t&&t.txType==='sell'&&t.realized!=null)realized+=num(t.realized);});
  const pnl=(current-invested)+realized;
  return {invested,current,realized,pnl,pct:invested>0?(pnl/invested)*100:0};
}
function getAssetPnLPct(a){const cp=getAssetCurrentPrice(a);if(cp===null||!a.buyPrice)return null;return((cp-a.buyPrice)/a.buyPrice)*100;}
function debtRemaining(d){if(!d)return 0;const acc=num(calcAccrued(d)),paid=(d.payments||[]).reduce((s,p)=>s+num(p&&p.amount),0);return Math.max(0,num(d.amount)+acc-paid);}
// Debt remaining as of a past day, replayed from dated lends and repayments.
// Edits to a debt's amount rewrite its past.
function debtRemainingAsOf(d,key){
  if(!d)return 0;
  const cut=parseDay(key);
  if(isNaN(cut))return debtRemaining(d);
  const lentD=d.lentDate?parseDay(d.lentDate):new Date(d.date);
  // Same rule as calcAccrued: lendHistory counts only if it sums to the total.
  const lends=(d.lendHistory||[]).filter(h=>h&&num(h.amount)>0)
    .map(h=>({t:h.date?parseDay(h.date):lentD,amt:num(h.amount)}))
    .filter(h=>!isNaN(h.t));
  const lendSum=lends.reduce((x,h)=>x+h.amt,0);
  let principal;
  if(lends.length&&Math.abs(lendSum-num(d.amount))<0.01){
    principal=lends.filter(h=>h.t<=cut).reduce((x,h)=>x+h.amt,0);
  }else{
    principal=(!isNaN(lentD)&&lentD>cut)?0:num(d.amount);
  }
  if(principal<=0)return 0;
  const paid=(d.payments||[]).filter(pm=>{
    if(!pm||!(num(pm.amount)>0))return false;
    const t=pm.date?parseDay(pm.date):lentD;
    return !isNaN(t)&&t<=cut;
  }).reduce((x,pm)=>x+num(pm.amount),0);
  return Math.max(0,principal+num(calcAccrued(d,cut))-paid);
}
// What was owed to you and what you owed, on a given day.
function debtTotalsAsOf(key){
  let owed=0,iowe=0;
  (state.debts||[]).forEach(d=>{
    if(!d)return;
    const r=debtRemainingAsOf(d,key);
    if(d.type==='owed')owed+=r;else iowe+=r;
  });
  return {owed,iowe};
}
// Finite number or 0, so one bad field cannot turn a total into NaN.
function num(v){const n=typeof v==='number'?v:parseFloat(v);return Number.isFinite(n)?n:0;}
function calcNetWorth(){const ta=state.assets.reduce((s,a)=>s+getAssetCurrentValue(a),0),to=state.debts.filter(d=>d.type==='owed').reduce((s,d)=>s+debtRemaining(d),0),ti=state.debts.filter(d=>d.type==='iowe').reduce((s,d)=>s+debtRemaining(d),0);return ta+to-ti;}
// NAV
const PAGES=['dash','assets','spend','debts','plan','analytics','settings'];
let currentPage='dash';
// Tab order sets the page slide direction.
const PAGE_ORDER=['dash','assets','spend','debts','plan','analytics','settings'];
// Measured from the tab button itself, not computed from PAGE_ORDER.
function positionNavIndicator(page){
  const ind=el('navInd');
  if(!ind)return;
  const btn=el('nav-'+(page||currentPage));
  if(!btn||!btn.offsetParent)return;
  ind.style.setProperty('--ind-x',(btn.offsetLeft+(btn.offsetWidth-22)/2).toFixed(1)+'px');
}
window.addEventListener('resize',()=>positionNavIndicator(),{passive:true});
// Logo: back to the dashboard, top, sheets closed.
function goHome(){
  while(modalStack.length)closeModal(modalStack[modalStack.length-1]);
  if(currentPage==='dash'){window.scrollTo({top:0,behavior:'smooth'});playPageArrival('page-dash');}
  else goPage('dash');
  haptic('tap');
}
function goPage(p,dir){if(p===currentPage){window.scrollTo({top:0,behavior:'smooth'});return;}
  const from=PAGE_ORDER.indexOf(currentPage),to=PAGE_ORDER.indexOf(p);
  // An explicit dir (from a swipe) wins; otherwise infer it from tab order.
  const goingRight=dir?(dir==='left'):(from>=0&&to>=0?to>from:true);
  // Unknown page id (stale lastPage): bail before tearing down the current page.
  const np=el('page-'+p), nv=el('nav-'+p);
  if(!np||!nv)return;
  haptic('tap');const pages=document.querySelectorAll('.page');pages.forEach(e=>e.classList.remove('active','from-left','from-right'));
  document.querySelectorAll('.nav-item').forEach(e=>{e.classList.remove('active');e.setAttribute('aria-selected','false');});
  np.style.setProperty('--page-dx',(goingRight?14:-14)+'px');
  window.scrollTo(0,0);np.classList.add('active');
  nv.classList.add('active');nv.setAttribute('aria-selected','true');currentPage=p;
  positionNavIndicator(p);
  state.settings.lastPage=p;saveState();try{localStorage.setItem('paisafolio_lastpage',p);}catch(e){}
  renderAnimated(()=>{if(p==='dash')renderDashboard();if(p==='assets')renderAssets();if(p==='spend')renderSpend();if(p==='debts')renderDebts();if(p==='plan')renderPlan();if(p==='analytics')renderAnalytics();if(p==='settings')renderSettings();});playPageArrival('page-'+p);}
function restorePage(){let p;try{p=localStorage.getItem('paisafolio_lastpage');}catch(e){}if(!p)p=state.settings.lastPage;if(!p||p==='dash'||!el('page-'+p))return;
  document.querySelectorAll('.page').forEach(e=>e.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(e=>{e.classList.remove('active');e.setAttribute('aria-selected','false');});
  el('page-'+p).classList.add('active');const nv=el('nav-'+p);if(nv){nv.classList.add('active');nv.setAttribute('aria-selected','true');}
  currentPage=p;positionNavIndicator(p);}
// Only the visible page renders; goPage() renders on arrival.
function renderAllNow(){if(currentPage==='dash')renderDashboard();if(currentPage==='assets')renderAssets();if(currentPage==='spend')renderSpend();if(currentPage==='debts')renderDebts();if(currentPage==='plan')renderPlan();if(currentPage==='analytics')renderAnalytics();syncChartFallbacks();bindScrollHints();}
// Chart.js failed to load (offline/blocked CDN): collapse chart boxes and say why.
const CHART_CANVAS_IDS=['miniChart','pnlChart','catBarChart','assetBarChart','monthlyChart','forecastChart','compositionChart','debtTimeChart'];
function syncChartFallbacks(){
  const missing=!window.Chart;
  // Donut box is too small for a notice; let the legend take the row.
  const dw=document.querySelector('.donut-wrap');
  if(dw)dw.style.display=missing?'none':'';
  CHART_CANVAS_IDS.forEach(id=>{
    const c=el(id);if(!c)return;
    const box=c.parentElement;if(!box)return;
    const existing=box.querySelector(':scope > .chart-na');
    if(missing){
      c.style.display='none';
      box.classList.add('chart-na-host');
      if(!existing){
        const note=document.createElement('div');
        note.className='chart-na';
        note.textContent='Chart unavailable offline';
        box.appendChild(note);
      }
    }else{
      // Leave renderMiniChart's own empty state alone.
      const ownEmpty=box.querySelector(':scope > .chart-empty');
      if(!ownEmpty){c.style.display='';box.classList.remove('chart-na-host');}
      if(existing)existing.remove();
    }
  });
}
// Coalesce renderAll() calls into one frame; _renderNow() for synchronous repaints.
let _renderRaf=null;
// ENTRANCE ANIMATIONS
// Only when arriving at a view, not on every re-render.
let _animateEnter=true;
function enterCls(){ return _animateEnter?' enter':''; }
// Run one render with entrances on (arriving at a page, first paint).
function renderAnimated(fn){
  _animateEnter=true;
  try{ fn(); } finally { requestAnimationFrame(()=>{
    _animateEnter=false;
    // Re-measure scroll hints now the page has a width.
    try{ bindScrollHints(); }catch(e){}
  }); }
}
// Card arrival animation on page entry; the class is removed when done.
function playPageArrival(pageId){
  if(state.settings.reduceMotion)return;
  const page=el(pageId);if(!page)return;
  const targets=page.querySelectorAll('[data-arrive]');
  targets.forEach((n,i)=>{
    n.classList.remove('arrive');
    void n.offsetWidth;                      // restart the animation
    n.style.setProperty('--arrive-delay',(i*55)+'ms');
    n.classList.add('arrive');
    n.addEventListener('animationend',()=>n.classList.remove('arrive'),{once:true});
  });
}
function renderAll(){
  if(document.hidden)return;            // nothing to paint while backgrounded
  if(_renderRaf)return;                 // already queued for this frame
  _renderRaf=requestAnimationFrame(()=>{_renderRaf=null;renderAllNow();});
}
// PNL RANGE
function bindPnlPills(){document.querySelectorAll('.pnl-pill').forEach(p=>p.addEventListener('click',()=>{document.querySelectorAll('.pnl-pill').forEach(x=>x.classList.remove('active'));p.classList.add('active');currentPnlRange=p.dataset.range;haptic('tap');const cr=el('customRangeRow');if(cr)cr.style.display=currentPnlRange==='custom'?'block':'none';renderDashboard();}));}
function applyCustomRange(){customFromDate=el('customFrom').value;customToDate=el('customTo').value;renderMiniChart(calcNetWorth());}
// NET-WORTH HISTORY
// Reconstructed from the dated ledger at cost basis (no historical prices), anchored
// to real snapshots: a recorded snapshot wins for its date, today is live, and filled
// points are flagged `estimated`.
function ymdUTC(dt){
  return dt.getUTCFullYear() + '-' +
    String(dt.getUTCMonth() + 1).padStart(2, '0') + '-' +
    String(dt.getUTCDate()).padStart(2, '0');
}
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
function nwDayKey(v){ const s = String(v || '').split('T')[0]; return DATE_RE.test(s) ? s : null; }

// Every dated money movement, as a signed delta on net worth.
function netWorthEvents(){
  const ev = [];
  (state.transactions || []).forEach(t => {
    const k = nwDayKey(t && t.date); if (!k) return;
    // A sell removes (amount - realized) of cost. Income is skipped: its cash is counted elsewhere.
    if (t.txType === 'income') return;
    const v = t.txType === 'sell'
      ? -(num(t.amount) - num(t.realized))
      : num(t.amount);
    if (v) ev.push({ d: k, v });
  });
  (state.debts || []).forEach(dbt => {
    if (!dbt) return;
    const sign = dbt.type === 'owed' ? 1 : -1;   // owed to me is an asset
    const lends = (Array.isArray(dbt.lendHistory) && dbt.lendHistory.length)
      ? dbt.lendHistory
      : [{ amount: dbt.amount, date: dbt.lentDate || dbt.date }];
    lends.forEach(l => { const k = nwDayKey(l && l.date); if (k) ev.push({ d: k, v: sign * num(l.amount) }); });
    (dbt.payments || []).forEach(pm => { const k = nwDayKey(pm && pm.date); if (k) ev.push({ d: k, v: -sign * num(pm.amount) }); });
  });
  return ev.sort((a, b) => a.d < b.d ? -1 : a.d > b.d ? 1 : 0);
}

let _nwSeriesCache = null, _nwSeriesSig = '';
function buildNetWorthSeries(){
  const snaps = new Map();
  (state.pnlHistory || []).forEach(pt => { const k = nwDayKey(pt && pt.date); if (k) snaps.set(k, num(pt.netWorth)); });
  const events = netWorthEvents();
  const today = todayStr();
  // One recording plus today is already a line.
  if (!events.length && !snaps.size) return [];

  const sig = events.length + ':' + (events[0] ? events[0].d : '') + ':' + snaps.size + ':' + today
    + ':' + Math.round(calcNetWorth());
  if (_nwSeriesCache && _nwSeriesSig === sig) return _nwSeriesCache;

  const firstEvent = events.length ? events[0].d : null;
  const firstSnap = snaps.size ? [...snaps.keys()].sort()[0] : null;
  const startKey = (firstEvent && firstSnap) ? (firstEvent < firstSnap ? firstEvent : firstSnap)
                                             : (firstEvent || firstSnap);
  const DAY = 864e5;
  const start = new Date(startKey + 'T00:00:00Z');
  const end = new Date(today + 'T00:00:00Z');
  const days = Math.max(1, Math.round((end - start) / DAY) + 1);
  // One point per day; thinning is per range (nwStepForRange).
  const step = Math.max(1, Math.ceil(days / 2200));

  const out = [];
  let running = 0, ei = 0;
  // Between known figures, move by what the ledger did since the last one rather than
  // taking its absolute total, which misses holdings typed in by value.
  let anchorValue = null, anchorRunning = 0;
  for (let i = 0; i < days; i += step) {
    const key = ymdUTC(new Date(start.getTime() + i * DAY));
    while (ei < events.length && events[ei].d <= key) { running += events[ei].v; ei++; }
    const measured = snaps.get(key);
    if (measured !== undefined) {
      anchorValue = measured; anchorRunning = running;
      out.push({ date: key, netWorth: measured, estimated: false });
    } else {
      out.push({ date: key, netWorth: anchorValue === null ? running : anchorValue + (running - anchorRunning), estimated: true });
    }
  }
  // Today is always the live figure, never an estimate.
  const live = calcNetWorth();
  if (out.length && out[out.length - 1].date === today) out[out.length - 1] = { date: today, netWorth: live, estimated: false };
  else out.push({ date: today, netWorth: live, estimated: false });

  _nwSeriesCache = out; _nwSeriesSig = sig;
  return out;
}
// DAILY PROFIT AND LOSS
// pnl(day) = value(day) - value(day-1) - (bought - sold). Interest and dividends
// count as earnings. Days without a real reading are absent.
function pnlScopeAssets(scope){
  const all=state.assets||[];
  if(!scope||scope==='all')return all;
  if(scope.indexOf('asset:')===0){const id=scope.slice(6);return all.filter(a=>a&&a.id===id);}
  return all.filter(a=>a&&a.category===scope);
}
function pnlScopeLabel(scope){
  if(!scope||scope==='all')return 'Everything';
  if(scope.indexOf('asset:')===0){
    const a=(state.assets||[]).find(x=>x&&x.id===scope.slice(6));
    return a?stripParens(a.name):'Holding';
  }
  return catLabel(scope);
}
// Money in and out of a set of holdings, by day. Income is excluded.
function pnlFlowsByDay(ids){
  const flows={};
  (state.transactions||[]).forEach(t=>{
    // A transfer is a flow for each side; within one scope it cancels.
    if(!t)return;
    if(t.txType==='income')return;
    if(!ids.has(t.assetId))return;
    const k=nwDayKey(t.date);if(!k)return;
    flows[k]=(flows[k]||0)+(t.txType==='sell'?-num(t.amount):num(t.amount));
  });
  return flows;
}
// [{date, pnl, value}] for each pair of consecutive readings, oldest first.
function dailyPnlSeries(scope){
  const list=pnlScopeAssets(scope);
  if(!list.length)return [];
  const ids=new Set(list.map(a=>a.id));
  const isAll=!scope||scope==='all';
  // Older readings have only the net worth. For scope 'all' the holdings are recovered
  // as net worth - owed to you + what you owe, with debts replayed for that day.
  const valOf=p=>{
    if(p.assets){let v=0;ids.forEach(id=>{v+=num(p.assets[id]);});return v;}
    if(!isAll)return null;
    const k=nwDayKey(p.date);
    const t=debtTotalsAsOf(k);
    return num(p.netWorth)-t.owed+t.iowe;
  };
  const hist=(state.pnlHistory||[]).filter(p=>p&&nwDayKey(p.date)&&(p.assets||isAll))
    .slice().sort((a,b)=>a.date<b.date?-1:1);
  if(hist.length<2)return [];
  const flows=pnlFlowsByDay(ids);
  const out=[];
  for(let i=1;i<hist.length;i++){
    const k=nwDayKey(hist[i].date);
    const v=valOf(hist[i]),prev=valOf(hist[i-1]);
    if(v==null||prev==null)continue;
    out.push({date:k,pnl:v-prev-num(flows[k]),value:v});
  }
  return out;
}
// A month of it, keyed by day, for the calendar.
function pnlByDayMap(series){
  const m=new Map();
  (series||[]).forEach(p=>{if(p&&p.date)m.set(p.date,p);});
  return m;
}
// Compact, symbol-free figure for a ~40px calendar cell.
function pnlCellNum(v){
  if(state.settings.hideBalance)return '••';
  const a=Math.abs(num(v)*getCurrRate(currentCurrency.code));
  if(LAKH_CRORE_CCY.has(currentCurrency.code)){
    if(a>=1e7)return (a/1e7).toFixed(1)+'Cr';
    if(a>=1e5)return (a/1e5).toFixed(1)+'L';
  }else if(a>=1e6)return (a/1e6).toFixed(1)+'M';
  if(a>=1e3)return (a/1e3).toFixed(1)+'K';
  return a<10?a.toFixed(2):a.toFixed(0);
}
// The card: one component, three scopes (all, category, one holding), shown as a
// month calendar or daily bars.
let pnlCalView='cal';        // 'cal' | 'bar'
let pnlCalScope='all';
let pnlCalMonth=null;        // its own anchor, browsing here moves nothing else
let pnlCalPicked=null;
let pnlCalHost=null;         // which card is on screen: 'dash' or an asset id
function pnlCalAnchor(){
  if(!pnlCalMonth){const n=new Date();pnlCalMonth=new Date(n.getFullYear(),n.getMonth(),1);}
  return pnlCalMonth;
}
function setPnlCalView(v){
  pnlCalView=v==='bar'?'bar':'cal';
  try{localStorage.setItem('pf_pnlcal_view',pnlCalView);}catch(e){}
  haptic('tap');renderPnlCal();
}
function setPnlCalScope(sc){pnlCalScope=sc;pnlCalPicked=null;haptic('tap');renderPnlCal();}
function shiftPnlCal(delta){
  const a=pnlCalAnchor();
  pnlCalMonth=new Date(a.getFullYear(),a.getMonth()+delta,1);
  pnlCalPicked=null;haptic('tap');renderPnlCal();
}
function pickPnlDay(key){
  pnlCalPicked=(pnlCalPicked===key)?null:key;
  haptic('tap');renderPnlCal();
}
// Bars follow the page's range pills.
function pnlRangeDays(){
  const r=currentPnlRange||'1M';
  return {'1D':2,'1W':7,'1M':30,'3M':90,'6M':180,'1Y':365,'5Y':1825,'ALL':100000,'all':100000}[r]
    ||{'1d':2,'1w':7,'1m':30,'3m':90,'6m':180,'1y':365,'5y':1825}[String(r).toLowerCase()]||30;
}
// The card is one node moved between the dashboard and an asset sheet.
// Move it back before the sheet rebuilds, or it is destroyed with the markup.
function parkPnlCal(){
  const card=el('pnlCalCard'),home=el('pnlCalHome');
  if(!card||!home)return;
  if(card.parentElement!==home)home.appendChild(card);
  card.classList.remove('ad-pnl-cal');
  if(pnlCalHost!=='dash'){pnlCalHost='dash';pnlCalScope='all';pnlCalPicked=null;}
}
function mountPnlCal(where,assetId){
  const card=el('pnlCalCard');if(!card)return;
  if(where==='asset'){
    const slot=el('adPnlCalSlot');
    if(!slot){card.hidden=true;return;}
    if(card.parentElement!==slot)slot.appendChild(card);
    card.classList.add('ad-pnl-cal');
    if(pnlCalHost!==assetId){pnlCalHost=assetId;pnlCalPicked=null;}
    pnlCalScope='asset:'+assetId;
  }else{
    // Don't pull the card out of an open asset sheet.
    const m=el('assetDetailModal');
    if(m&&m.classList.contains('open')&&card.closest('#adPnlCalSlot'))return;
    parkPnlCal();
  }
  card.hidden=!(state.assets||[]).length;
  if(!card.hidden)renderPnlCal();
}
function renderPnlCal(){
  const card=el('pnlCalCard');if(!card||card.hidden)return;
  const scope=pnlCalScope;
  const series=dailyPnlSeries(scope);
  const byDay=pnlByDayMap(series);

  // Scope chips: everything, then each kind of holding that actually exists.
  const chips=el('pnlCalScopes');
  if(chips){
    const cats=CAT_ORDER.filter(c=>(state.assets||[]).some(a=>a&&a.category===c));
    chips.innerHTML=`<button class="pnl-scope${scope==='all'?' on':''}" onclick="setPnlCalScope('all')">Everything</button>`
      +cats.map(c=>`<button class="pnl-scope${scope===c?' on':''}" style="--sc:${CAT_COLORS[c]||'var(--accent)'}" onclick="setPnlCalScope('${esc(c)}')">${esc(catLabel(c))}</button>`).join('');
    chips.hidden=pnlCalHost!=='dash';
  }

  const segCal=el('pnlCalSegCal'),segBar=el('pnlCalSegBar');
  if(segCal)segCal.className=pnlCalView==='cal'?'on':'';
  if(segBar)segBar.className=pnlCalView==='bar'?'on':'';

  // The headline: the picked day, or the most recent one there is a reading for.
  const latest=series.length?series[series.length-1]:null;
  const shown=(pnlCalPicked&&byDay.get(pnlCalPicked))||latest;
  const dEl=el('pnlCalDate'),vEl=el('pnlCalVal');
  if(dEl)dEl.textContent=shown?formatDate(shown.date):'—';
  if(vEl){
    vEl.textContent=shown?((shown.pnl>=0?'+':'−')+fmt(Math.abs(shown.pnl))):'—';
    vEl.style.color=!shown?'var(--text3)':shown.pnl>0?'var(--green)':shown.pnl<0?'var(--red)':'var(--text)';
  }

  const calWrap=el('pnlCalGridWrap'),barWrap=el('pnlCalBarWrap');
  if(calWrap)calWrap.hidden=pnlCalView!=='cal';
  if(barWrap)barWrap.hidden=pnlCalView==='cal';

  const empty=el('pnlCalEmpty');
  if(!series.length){
    // Four distinct empty states: no history, no per-holding values, only one detailed
    // day, or no movement.
    const days=(state.pnlHistory||[]).length;
    const isAll=!scope||scope==='all';
    // 'all' works from net worth, so only days can be missing.
    const detailed=isAll?days
      :(state.pnlHistory||[]).filter(p=>p&&p.assets&&Object.keys(p.assets).length).length;
    if(empty){empty.hidden=false;
      empty.textContent=days<2
        ? 'Two days of readings and this fills in. One is taken every couple of hours the app is open, and in between if snapshots are set up.'
        : detailed<2
          ? (detailed===1
              ? 'One day so far carries a value for each holding, which is what this is worked out from. Tomorrow gives it something to compare against.'
              : 'This is worked out from a value per holding, which readings only started carrying recently. It fills in once two days have one.')
          : !pnlScopeAssets(scope).length
            ? 'You are not holding anything in '+pnlScopeLabel(scope)+'.'
            : 'Nothing moved in '+pnlScopeLabel(scope)+' on the days recorded so far.';}
    // Two dashes above an empty explanation is furniture, not information.
    const dEl0=el('pnlCalDate'),vEl0=el('pnlCalVal');
    if(dEl0)dEl0.textContent='';
    if(vEl0)vEl0.textContent='';
    if(calWrap)calWrap.hidden=true;
    if(barWrap)barWrap.hidden=true;
    return;
  }
  if(empty)empty.hidden=true;

  if(pnlCalView==='cal')renderPnlCalGrid(byDay);
  else renderPnlCalBars(series);
}
function renderPnlCalGrid(byDay){
  const grid=el('pnlCalGrid');if(!grid)return;
  const a=pnlCalAnchor(),y=a.getFullYear(),m=a.getMonth();
  const dim=new Date(y,m+1,0).getDate();
  const lead=new Date(y,m,1).getDay();
  const todayKey=todayStr();
  const lbl=el('pnlCalMonth');
  if(lbl)lbl.textContent=y+'-'+String(m+1).padStart(2,'0');
  const nx=el('pnlCalNext');
  if(nx){const now=new Date();const future=y>now.getFullYear()||(y===now.getFullYear()&&m>=now.getMonth());
    nx.disabled=future;nx.style.opacity=future?'.3':'';}

  // The month's biggest move sets the colour scale.
  let peak=0;
  for(let d=1;d<=dim;d++){const p=byDay.get(dayKey(new Date(y,m,d)));if(p)peak=Math.max(peak,Math.abs(p.pnl));}

  const DOW=['S','M','T','W','T','F','S'];
  let html='<div class="hcal-dow">'+DOW.map(d=>`<span>${d}</span>`).join('')+'</div><div class="hcal-days">';
  for(let i=0;i<lead;i++)html+='<div class="hcal-pad"></div>';
  let up=0,down=0,sum=0;
  for(let d=1;d<=dim;d++){
    const key=dayKey(new Date(y,m,d));
    const p=byDay.get(key);
    let cls='hcal-day pnl-day',style='';
    if(p){
      sum+=p.pnl;
      if(p.pnl>0)up++;else if(p.pnl<0)down++;
      const mag=peak>0?Math.min(1,Math.abs(p.pnl)/peak):0;
      if(Math.abs(p.pnl)>=0.005){
        cls+=' has '+(p.pnl>0?'up':'dn');
        style=`--fill:${(0.22+mag*0.78).toFixed(2)}`;
      }else cls+=' flat';
    }else cls+=' nodata';
    if(key===todayKey)cls+=' today';
    if(pnlCalPicked===key)cls+=' picked';
    const amt=p?((p.pnl>=0?'+':'−')+pnlCellNum(p.pnl)):'';
    const label=p?(key+' '+(p.pnl>=0?'up ':'down ')+fmt(Math.abs(p.pnl))):(key+', no reading');
    html+=`<button type="button" class="${cls}" style="${style}" data-key="${key}" ${p?'':'disabled'}
      onclick="pickPnlDay('${key}')" aria-label="${esc(label)}">
      <span class="hcal-n">${d}</span>
      ${p?`<span class="pnl-d-amt">${esc(amt)}</span>`:''}
    </button>`;
  }
  html+='</div>';
  grid.innerHTML=html;

  const foot=el('pnlCalFoot');
  if(foot){
    const col=sum>0?'var(--green)':sum<0?'var(--red)':'var(--text)';
    foot.innerHTML=`<div class="pnl-foot-cell"><b style="color:${col}">${sum>=0?'+':'−'}${fmt(Math.abs(sum))}</b><span>this month</span></div>`
      +`<div class="pnl-foot-cell"><b style="color:var(--green)">${up}</b><span>up ${up===1?'day':'days'}</span></div>`
      +`<div class="pnl-foot-cell"><b style="color:var(--red)">${down}</b><span>down ${down===1?'day':'days'}</span></div>`;
  }
}
let pnlCalChart=null;
function renderPnlCalBars(series){
  const c=el('pnlCalBarChart');if(!c||!window.Chart)return;
  const days=pnlRangeDays();
  const pts=series.slice(-Math.max(2,days));
  if(pnlCalChart){try{pnlCalChart.destroy();}catch(e){}pnlCalChart=null;}
  const css=getComputedStyle(document.documentElement);
  const green=css.getPropertyValue('--green').trim()||'#16d6a4';
  const red=css.getPropertyValue('--red').trim()||'#ff5b75';
  const grid=css.getPropertyValue('--border').trim()||'#262626';
  const text3=css.getPropertyValue('--text3').trim()||'#888';
  pnlCalChart=new Chart(c.getContext('2d'),{
    type:'bar',
    data:{labels:pts.map(p=>p.date),
      datasets:[{data:pts.map(p=>p.pnl),
        backgroundColor:pts.map(p=>p.pnl>=0?green:red),
        borderRadius:3,borderSkipped:false,barPercentage:.72,categoryPercentage:.9}]},
    options:{responsive:true,maintainAspectRatio:false,animation:{duration:260},
      plugins:{legend:{display:false},tooltip:{displayColors:false,
        callbacks:{title:it=>formatDate(it[0].label),
          label:it=>(it.raw>=0?'+':'−')+fmt(Math.abs(it.raw))}}},
      scales:{
        x:{grid:{display:false},border:{display:false},
          ticks:{color:text3,font:{size:9},maxRotation:0,autoSkip:true,maxTicksLimit:4,
            callback:function(v,i){const d=this.getLabelForValue(v);return String(d).slice(5);}}},
        y:{grid:{color:grid},border:{display:false},
          ticks:{color:text3,font:{size:9},maxTicksLimit:5,
            callback:v=>compactNum(num(v)*getCurrRate(currentCurrency.code))}}}}
  });
  const foot=el('pnlCalFoot');
  if(foot){
    const sum=pts.reduce((t,p)=>t+p.pnl,0);
    const up=pts.filter(p=>p.pnl>0).length,down=pts.filter(p=>p.pnl<0).length;
    const best=pts.reduce((b,p)=>!b||p.pnl>b.pnl?p:b,null);
    const col=sum>0?'var(--green)':sum<0?'var(--red)':'var(--text)';
    foot.innerHTML=`<div class="pnl-foot-cell"><b style="color:${col}">${sum>=0?'+':'−'}${fmt(Math.abs(sum))}</b><span>over ${plural(pts.length,'day')}</span></div>`
      +`<div class="pnl-foot-cell"><b style="color:var(--green)">${up}</b><span>up</span></div>`
      +`<div class="pnl-foot-cell"><b style="color:var(--red)">${down}</b><span>down</span></div>`
      +(best&&best.pnl>0?`<div class="pnl-foot-cell"><b style="color:var(--green)">+${pnlCellNum(best.pnl)}</b><span>best day</span></div>`:'');
  }
}
// Shared category colours for every report.
const CAT_COLORS = { crypto:'#f5a623', stock:'#4a9eff', commodity:'#ffd700',
                     liquidity:'#16d6a4', property:'#a78bfa', other:'#ff7b3a' };
const CAT_ORDER = ['crypto','stock','commodity','liquidity','property','other'];

// Running total per bucket, sampled to at most maxPoints dates, so reports align.
// events: [{ d:'YYYY-MM-DD', bucket, v }]
function accumulateByBucket(events, buckets, maxPoints){
  const today = todayStr();
  const dated = events.filter(e => e && e.d).sort((a,b) => a.d < b.d ? -1 : a.d > b.d ? 1 : 0);
  if (!dated.length) return null;
  const DAY = 864e5;
  const start = new Date(dated[0].d + 'T00:00:00Z');
  const end = new Date(today + 'T00:00:00Z');
  const days = Math.max(1, Math.round((end - start) / DAY) + 1);
  const step = Math.max(1, Math.ceil(days / (maxPoints || 90)));
  const running = {}; buckets.forEach(b => running[b] = 0);
  const dates = [], out = {}; buckets.forEach(b => out[b] = []);
  let ei = 0;
  for (let i = 0; i < days; i += step) {
    const key = ymdUTC(new Date(start.getTime() + i * DAY));
    while (ei < dated.length && dated[ei].d <= key) {
      const e = dated[ei++];
      if (e.bucket in running) running[e.bucket] += e.v;
    }
    dates.push(key);
    buckets.forEach(b => out[b].push(Math.max(0, running[b])));
  }
  // Always finish on today.
  if (dates[dates.length - 1] !== today) {
    while (ei < dated.length) { const e = dated[ei++]; if (e.bucket in running) running[e.bucket] += e.v; }
    dates.push(today);
    buckets.forEach(b => out[b].push(Math.max(0, running[b])));
  }
  return { dates, series: out };
}

// Portfolio mix over time at cost basis, from the ledger.
function buildCompositionSeries(){
  const ev = [];
  (state.transactions || []).forEach(t => {
    const k = nwDayKey(t && t.date); if (!k) return;
    if (t.txType === 'income') return;
    const bucket = CAT_ORDER.includes(t.category) ? t.category : 'other';
    const v = t.txType === 'sell' ? -(num(t.amount) - num(t.realized)) : num(t.amount);
    if (v) ev.push({ d: k, bucket, v });
  });
  const res = accumulateByBucket(ev, CAT_ORDER, 90);
  if (!res) return null;
  // Drop categories that never held anything, so the legend stays honest.
  const active = CAT_ORDER.filter(c => res.series[c].some(v => v > 0.005));
  return active.length ? { dates: res.dates, cats: active, series: res.series } : null;
}

// Principal owed to you vs owed by you over time (no interest).
function buildDebtSeries(){
  const ev = [];
  (state.debts || []).forEach(dbt => {
    if (!dbt) return;
    const bucket = dbt.type === 'owed' ? 'owed' : 'iowe';
    const lends = (Array.isArray(dbt.lendHistory) && dbt.lendHistory.length)
      ? dbt.lendHistory : [{ amount: dbt.amount, date: dbt.lentDate || dbt.date }];
    lends.forEach(l => { const k = nwDayKey(l && l.date); if (k) ev.push({ d: k, bucket, v: num(l.amount) }); });
    (dbt.payments || []).forEach(pm => { const k = nwDayKey(pm && pm.date); if (k) ev.push({ d: k, bucket, v: -num(pm.amount) }); });
  });
  const res = accumulateByBucket(ev, ['owed', 'iowe'], 90);
  if (!res) return null;
  const any = res.series.owed.some(v => v > 0.005) || res.series.iowe.some(v => v > 0.005);
  return any ? { dates: res.dates, series: res.series } : null;
}
// Window start, shared by the chart and its P&L figure. 'ytd' kept for devices that still have it selected.
const PNL_RANGES = ['1d','7d','30d','3m','6m','ytd','1y','5y','all','custom'];
function rangeCutDate(range){
  const now = new Date(), cut = new Date();
  switch (range) {
    case '1d':  cut.setDate(now.getDate() - 1); break;
    case '7d':  cut.setDate(now.getDate() - 7); break;
    case '30d': cut.setDate(now.getDate() - 30); break;
    case '3m':  cut.setMonth(now.getMonth() - 3); break;
    case '6m':  cut.setMonth(now.getMonth() - 6); break;
    case 'ytd': cut.setMonth(0); cut.setDate(1); break;
    case '1y':  cut.setFullYear(now.getFullYear() - 1); break;
    case '5y':  cut.setFullYear(now.getFullYear() - 5); break;
    case 'custom': return customFromDate ? new Date(customFromDate) : null;
    default: return null;   // 'all'
  }
  return cut;
}
// Human label for the window, for the caption under the headline number.
function rangeLabel(range){
  return { '1d':'today', '7d':'past week', '30d':'past 30 days', '3m':'past 3 months',
           '6m':'past 6 months', 'ytd':'year to date', '1y':'past year', '5y':'past 5 years',
           'all':'all time', 'custom':'selected range' }[range] || '';
}
// ALLOCATION TARGETS & REBALANCE
// Target weight per category; the plan only suggests buys, never sells.
function allocTargets(){ return (state.settings && state.settings.allocTargets) || {}; }
function setAllocTarget(cat, pct){
  if (!state.settings.allocTargets) state.settings.allocTargets = {};
  const v = Math.max(0, Math.min(100, num(pct)));
  if (v === 0) delete state.settings.allocTargets[cat];
  else state.settings.allocTargets[cat] = v;
  saveState();
}
function allocTargetTotal(){
  const t = allocTargets();
  return Object.keys(t).reduce((s, k) => s + num(t[k]), 0);
}

// Current value per category, at live prices.
function allocCurrentByCat(){
  const by = {};
  CAT_ORDER.forEach(c => by[c] = 0);
  (state.assets || []).forEach(a => {
    if (!a) return;
    const c = CAT_ORDER.includes(a.category) ? a.category : 'other';
    by[c] += num(getAssetCurrentValue(a));
  });
  return by;
}

// Per-category drift plus a buy-only plan; null when no targets are set.
function buildRebalancePlan(extraCash){
  const targets = allocTargets();
  const cats = Object.keys(targets).filter(c => num(targets[c]) > 0);
  if (!cats.length) return null;

  const by = allocCurrentByCat();
  const total = CAT_ORDER.reduce((s, c) => s + by[c], 0);
  if (total <= 0) return null;

  const targetSum = cats.reduce((s, c) => s + num(targets[c]), 0);
  const rows = cats.map(c => {
    // Normalise so targets need not total 100%.
    const targetPct = num(targets[c]) / targetSum * 100;
    const currentPct = by[c] / total * 100;
    return { cat: c, value: by[c], currentPct, targetPct, driftPct: currentPct - targetPct };
  }).sort((a, b) => b.driftPct - a.driftPct);

  const maxDrift = rows.reduce((m, r) => Math.max(m, Math.abs(r.driftPct)), 0);

  // How much of `cash` goes to each underweight category.
  const cash = Math.max(0, num(extraCash));
  const after = total + cash;
  const buys = [];
  if (cash > 0) {
    let remaining = cash;
    // Shortfall against the post-deployment total, largest first.
    const need = rows
      .map(r => ({ cat: r.cat, gap: (r.targetPct / 100) * after - r.value }))
      .filter(x => x.gap > 0)
      .sort((a, b) => b.gap - a.gap);
    const totalGap = need.reduce((s, x) => s + x.gap, 0);
    need.forEach(x => {
      // Proportional when the cash cannot cover every shortfall.
      const amt = totalGap > cash ? (x.gap / totalGap) * cash : x.gap;
      const give = Math.min(remaining, amt);
      if (give > 0.005) { buys.push({ cat: x.cat, amount: give }); remaining -= give; }
    });
  }

  // Drift after the plan is applied.
  const afterRows = rows.map(r => {
    const added = buys.reduce((s, b) => s + (b.cat === r.cat ? b.amount : 0), 0);
    const v = r.value + added;
    return { cat: r.cat, afterPct: after > 0 ? v / after * 100 : 0, targetPct: r.targetPct };
  });
  const maxDriftAfter = afterRows.reduce((m, r) => Math.max(m, Math.abs(r.afterPct - r.targetPct)), 0);

  return { rows, buys, total, cash, maxDrift, maxDriftAfter,
           targetSum, unallocatedPct: Math.max(0, 100 - targetSum) };
}
// REALISED vs UNREALISED P&L
function buildPnLSplit(){
  const sells = (state.transactions || []).filter(t => t && t.txType === 'sell' && t.realized != null);
  const realized = sells.reduce((s, t) => s + num(t.realized), 0);
  // Unpriced holdings are skipped, not counted as zero gain.
  let unrealized = 0, pricedCost = 0, priced = 0, unpriced = 0;
  (state.assets || []).forEach(a => {
    const p = getAssetPnL(a);
    if (p === null) { unpriced++; return; }
    priced++;
    unrealized += p;
    pricedCost += num(a.buyPrice) * assetUnits(a);
  });
  // Realised by month, so the chart can show when gains were actually taken.
  const byMonth = {};
  sells.forEach(t => {
    const k = nwDayKey(t.date); if (!k) return;
    const m = k.slice(0, 7);
    byMonth[m] = (byMonth[m] || 0) + num(t.realized);
  });
  const months = Object.keys(byMonth).sort().slice(-12);
  return {
    realized, unrealized, total: realized + unrealized,
    sellCount: sells.length, priced, unpriced,
    unrealizedPct: pricedCost > 0 ? (unrealized / pricedCost) * 100 : null,
    months, monthly: months.map(m => byMonth[m]),
  };
}

// RECEIVABLES AGEING
const AGE_BUCKETS = [
  { key:'0-30',  label:'Under 30d', max:30 },
  { key:'31-60', label:'31-60d',    max:60 },
  { key:'61-90', label:'61-90d',    max:90 },
  { key:'90+',   label:'Over 90d',  max:Infinity },
];
function buildDebtAgeing(type){
  const today = new Date(todayStr() + 'T00:00:00Z');
  const rows = (state.debts || [])
    .filter(d => d && d.type === type && debtRemaining(d) > 0.005)
    .map(d => {
      const startKey = nwDayKey(d.lentDate || d.date);
      const start = startKey ? new Date(startKey + 'T00:00:00Z') : null;
      const ageDays = start ? Math.max(0, Math.round((today - start) / 864e5)) : 0;
      const dueKey = nwDayKey(d.due);
      const overdueDays = dueKey
        ? Math.max(0, Math.round((today - new Date(dueKey + 'T00:00:00Z')) / 864e5))
        : 0;
      return { id:d.id, name:d.name || '-', amount:debtRemaining(d), ageDays,
               due:dueKey, overdueDays, hasDue:!!dueKey };
    })
    .sort((a, b) => b.overdueDays - a.overdueDays || b.ageDays - a.ageDays);
  if (!rows.length) return null;
  const buckets = AGE_BUCKETS.map(b => ({ ...b, total:0, count:0 }));
  rows.forEach(r => {
    const b = buckets.find(x => r.ageDays <= x.max) || buckets[buckets.length - 1];
    b.total += r.amount; b.count++;
  });
  const total = rows.reduce((s, r) => s + r.amount, 0);
  const overdue = rows.filter(r => r.hasDue && r.overdueDays > 0);
  return { rows, buckets, total,
           overdueTotal: overdue.reduce((s, r) => s + r.amount, 0),
           overdueCount: overdue.length,
           noDueCount: rows.filter(r => !r.hasDue).length };
}
// Days between points per range.
const NW_STEP_DAYS={'1d':1,'7d':1,'30d':2,'3m':3,'6m':4,'ytd':4,'1y':5,'5y':10};
function nwStepForRange(range,count){
  const fixed=NW_STEP_DAYS[range];
  if(fixed)return fixed;
  // All/custom: aim for about 120 points.
  return Math.max(1,Math.ceil(count/120));
}
// Thin to one point per step, preferring a real reading in each bucket over filler.
// The last point (today) is always kept.
function sampleForRange(arr,n){
  if(n<=1||arr.length<=2)return arr;
  // Today is appended separately so it cannot displace yesterday's reading.
  const body=arr.slice(0,-1),last=arr[arr.length-1];
  const out=[];
  for(let i=0;i<body.length;i+=n){
    const bucket=body.slice(i,i+n);
    let pick=null;
    for(let j=bucket.length-1;j>=0;j--){ if(bucket[j]&&bucket[j].estimated===false){pick=bucket[j];break;} }
    out.push(pick||bucket[bucket.length-1]);
  }
  out.push(last);
  return out;
}
function getFilteredHistory(){
  // 1D is drawn from the two-hourly readings.
  if(currentPnlRange==='1d'){
    const floor=Date.now()-26*3600*1000;
    const intra=(state.intraday||[]).filter(x=>x&&x.t>=floor);
    if(intra.length>=2)return intra.map(x=>({date:new Date(x.t).toISOString(),netWorth:num(x.v),estimated:false,intraday:true}));
  }
  const hist = buildNetWorthSeries();
  if (!hist.length) return [];
  const cut = rangeCutDate(currentPnlRange);
  const win = cut ? hist.filter(p => p.date >= ymdUTC(cut)) : hist;
  // One point is not a line; use the last two readings.
  const pts = win.length>=2 ? win : hist.slice(-2);
  return sampleForRange(pts, nwStepForRange(currentPnlRange, pts.length));
}
function nwYesterday(){if(!state.pnlHistory||state.pnlHistory.length<2)return null;const today=todayStr();const prev=[...state.pnlHistory].reverse().find(p=>p.date!==today);return prev?num(prev.netWorth):null;}
// COUNT-UP
const lastNum={};
const _numRaf={};
function animateNum(id,to,fmtFn){const e=el(id);if(!e)return;const f=fmtFn||fmt;
  // Cancel the previous count-up so renders don't stack loops.
  if(_numRaf[id]){cancelAnimationFrame(_numRaf[id]);_numRaf[id]=null;}
  if(state.settings.hideBalance||state.settings.reduceMotion){e.textContent=f(to);lastNum[id]=to;return;}
  const from=lastNum[id]||0;lastNum[id]=to;if(Math.abs(to-from)<0.5){e.textContent=f(to);return;}const dur=600,t0=performance.now();
  function step(t){const k=Math.min(1,(t-t0)/dur),e2=1-Math.pow(1-k,3),v=from+(to-from)*e2;e.textContent=f(v);if(k<1){_numRaf[id]=requestAnimationFrame(step);}else{_numRaf[id]=null;e.textContent=f(to);}}
  _numRaf[id]=requestAnimationFrame(step);}
// DASHBOARD
function renderDashboard(){
  const ta=state.assets.reduce((s,a)=>s+getAssetCurrentValue(a),0),to=state.debts.filter(d=>d.type==='owed').reduce((s,d)=>s+debtRemaining(d),0),ti=state.debts.filter(d=>d.type==='iowe').reduce((s,d)=>s+debtRemaining(d),0),nw=ta+to-ti;
  // Holding P&L (range-independent) and net-worth change (range-dependent, includes
  // deposits) are separate figures.
  const PL=portfolioPnL();
  // Same reconstructed series as the chart.
  const hist=buildNetWorthSeries();
  // Change over the window: now vs when it opened.
  let pnlBase=null;
  if(hist.length){
    if(currentPnlRange==='all'){pnlBase=num(hist[0].netWorth);}
    else{
      const cutD=rangeCutDate(currentPnlRange);
      const cutStr=cutD?ymdUTC(cutD):null;
      if(cutStr){const baseSnap=[...hist].filter(p=>p.date<=cutStr).pop();
        if(baseSnap)pnlBase=num(baseSnap.netWorth);}
    }
  }
  const rangeChange=pnlBase!==null?(nw-pnlBase):PL.pnl;
  // Relative to the window start.
  const badgePct=(pnlBase!==null&&pnlBase>0)?(rangeChange/pnlBase)*100:PL.pct;
  const pos=rangeChange>=0;
  animateNum('nwAmount',nw);el('nwAssets').textContent=fmt(ta);el('nwLiab').textContent=fmt(ti);
  {const note=el('nwTrendNote');if(note)note.textContent='';}
  const badge=el('nwBadge');badge.className='nw-badge '+(pos?'pos':'neg');badge.setAttribute('aria-label',(pos?'Up ':'Down ')+Math.abs(badgePct).toFixed(2)+'%, '+rangeLabel(currentPnlRange));badge.innerHTML=(pos?`<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`:`<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>`)+(pos?'+':'')+badgePct.toFixed(2)+'%';
  const chg=el('nwChange');
  chg.className='nw-change '+(pos?'pos':'neg');
  chg.textContent=state.settings.hideBalance?fmt(rangeChange):(pos?'+':'\u2212')+fmt(Math.abs(rangeChange));
  {const since=el('nwSince');
   if(since)since.textContent='Change in net worth, '+(rangeLabel(currentPnlRange)||'all time');}
  {const gain=PL.pnl, pnlEl=el('nwPnl'), wrap=el('nwPnlWrap'), dot=el('nwPnlDot');
   // Nothing bought or earning: hide the figure.
   const show=PL.invested>0&&(Math.abs(PL.pnl)>0.005||state.assets.some(a=>a.category!=='liquidity'));
   if(wrap)wrap.style.display=show?'':'none';
   if(dot)dot.style.display=show?'':'none';
   if(pnlEl&&show){pnlEl.textContent=(gain>=0?'+':'\u2212')+fmt(Math.abs(gain));
     pnlEl.style.color=gain>=0?'var(--green)':'var(--red)';}}
  let best=null,worst=null;state.assets.forEach(a=>{const p=getAssetPnLPct(a);if(p===null)return;if(best===null||p>best.pct)best={name:a.name,pct:p};if(worst===null||p<worst.pct)worst={name:a.name,pct:p};});
  animateNum('statAssets',ta);el('statAssetsCount').textContent=plural(state.assets.length,'asset');
  const toR=state.debts.filter(d=>d.type==='owed').reduce((s,d)=>s+debtRemaining(d),0);
  const tiR=state.debts.filter(d=>d.type==='iowe').reduce((s,d)=>s+debtRemaining(d),0);
  animateNum('statOwed',toR);el('statOwedCount').textContent=plural(state.debts.filter(d=>d.type==='owed').length,'person','people');
  animateNum('statIOwe',tiR);el('statIOweCount').textContent=plural(state.debts.filter(d=>d.type==='iowe').length,'person','people');
  const done=state.goals.filter(g=>(g.saved||0)>=(g.target||1)).length;el('statGoals').textContent=done+' / '+state.goals.length;
  renderNeedsAttention();renderMiniChart(nw);renderDonut(ta);renderBreakdown(ta,to,ti);renderRecentTx();renderTopMovers();renderInsights(ta,to,ti,nw,PL.pnl,PL.pct,best,worst);
  mountPnlCal('dash');
}
function renderTopMovers(){const card=el('moversCard'),sc=el('moversScroll');if(!card)return;
  const seen=new Set(),items=[];state.assets.forEach(a=>{if(a.coinId&&livePrices[a.coinId]&&!seen.has(a.coinId)){seen.add(a.coinId);const lp=livePrices[a.coinId];items.push({id:a.coinId,sym:stripParens(a.ticker||a.name),img:a.coinImage||'',price:usdToNpr(lp.usd*(a.category==='commodity'?1:1)),chg:lp.change24h});}});
  if(items.length<1){card.style.display='none';return;}
  items.sort((x,y)=>Math.abs(y.chg)-Math.abs(x.chg));card.style.display='block';
  sc.innerHTML=items.slice(0,10).map(m=>{const p=m.chg>=0;return `<div class="mover" role="button" tabindex="0"><div class="mover-top">${m.img?`<img src="${m.img}" onerror="this.onerror=null;this.style.display='none'" loading="lazy" decoding="async"/>`:''}<span class="mover-sym">${esc(m.sym)}</span></div><div class="mover-row"><span class="mover-price">${fmt(m.price)}</span><span class="mover-chg ${p?'green':'red'}">${p?'▲ +':'▼ '}${Math.abs(m.chg).toFixed(2)}%</span></div></div>`;}).join('');}
const sharedCrosshairPlugin={id:'crosshair',afterDraw(chart){if(chart._hoverX==null)return;const{ctx,chartArea:{top,bottom}}=chart;ctx.save();ctx.strokeStyle='rgba(128,128,128,.3)';ctx.lineWidth=1;ctx.setLineDash([4,3]);ctx.beginPath();ctx.moveTo(chart._hoverX,top);ctx.lineTo(chart._hoverX,bottom);ctx.stroke();ctx.restore();}};
// Fit the axis to the data with padding (sparklines only; bars keep zero).
function paddedYRange(values, padRatio){
  const nums = (values || []).filter(v => Number.isFinite(v));
  if (!nums.length) return {};
  let min = Math.min(...nums), max = Math.max(...nums);
  if (min === max) {
    // A perfectly flat line still needs somewhere to sit: centre it.
    const d = Math.abs(min) * 0.05 || 1;
    return { min: min - d, max: max + d };
  }
  const pad = (max - min) * (padRatio || 0.18);
  return { min: min - pad, max: max + pad };
}
function fmtTipDate(iso,withTime){
  const dte=new Date(iso);
  if(isNaN(dte))return String(iso||'');
  const day=dte.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});
  if(!withTime)return day;
  return day+' · '+dte.toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit'});
}
function buildHoverTooltip(ctx,tooltipElId,labelForIndex,opts){
  const t=el(tooltipElId);if(!t)return;
  const m=ctx.tooltip;
  if(m.opacity===0){t.classList.remove('show');return;}
  const p=m.dataPoints;if(!p||!p.length)return;
  const o=opts||{};
  const i=p[0].dataIndex,val=p[0].parsed.y;
  const raw=labelForIndex(i)||'';
  // Time of day only on 1D.
  const withTime=o.withTime!==undefined?o.withTime:(currentPnlRange==='1d');
  const series=o.series||[];
  const first=series.length?series[0]:null;
  const prev=i>0?series[i-1]:null;
  let rows='';
  // Flat days say so once instead of +0.00.
  if(prev!=null&&Number.isFinite(prev)&&Math.abs(val-prev)>=0.005){
    const dd=val-prev,pct=prev!==0?(dd/Math.abs(prev))*100:null;
    const up=dd>=0;
    rows+=`<div class="tip-row"><span>That day</span>`
      +`<b class="${up?'up':'dn'}">${up?'+':'\u2212'}${fmt(Math.abs(dd))}`
      +`${pct!==null?' ('+(up?'+':'\u2212')+Math.abs(pct).toFixed(2)+'%)':''}</b></div>`;
  }
  else if(prev!=null&&Number.isFinite(prev)){
    rows+='<div class="tip-row"><span>That day</span><b>no change</b></div>';
  }
  if(first!=null&&Number.isFinite(first)&&Math.abs(val-first)>=0.005&&i>0){
    const dd=val-first,pct=first!==0?(dd/Math.abs(first))*100:null;
    const up=dd>=0;
    rows+=`<div class="tip-row"><span>${esc(o.sinceLabel||'Since start')}</span>`
      +`<b class="${up?'up':'dn'}">${up?'+':'\u2212'}${fmt(Math.abs(dd))}`
      +`${pct!==null?' ('+(up?'+':'\u2212')+Math.abs(pct).toFixed(2)+'%)':''}</b></div>`;
  }
  t.innerHTML=`<div class="tip-val">${fmt(val)}</div>`
    +(raw?`<div class="tip-date">${esc(fmtTipDate(raw,withTime))}</div>`:'')
    +(rows?`<div class="tip-rows">${rows}</div>`:'');
  t.classList.add('show');
  // Above the point, clamped inside the chart; flips below when there is no room.
  const host=t.parentElement;if(!host)return;
  const hw=host.clientWidth,hh=host.clientHeight;
  const tw=t.offsetWidth||110,th=t.offsetHeight||30;
  t.style.left=Math.max(tw/2+4,Math.min(m.caretX,hw-tw/2-4))+'px';
  // May overflow the chart onto the card rather than clip.
  const card=host.closest('.card,.nw-card,.chart-card')||host;
  const room=host.getBoundingClientRect().top-card.getBoundingClientRect().top;
  const above=m.caretY-th-10;
  t.style.top=(above>=-room+4?above:Math.min(hh-th-2,m.caretY+12))+'px';
}
// Skip rebuilding a chart when its data has not changed.
const _chartSig={};
// Round before signing: accruing interest changes values every millisecond.
function chartSigNum(v){return Math.round(num(v));}
function chartUnchanged(key,sig){if(_chartSig[key]===sig)return true;_chartSig[key]=sig;return false;}
function invalidateCharts(){for(const k in _chartSig)delete _chartSig[k];_chartGen++;}

// DEFERRED CHARTS
// Charts build when their section nears the viewport (400px ahead), not all on page open.
let _chartGen=0;
const _deferSlots=new Map();
let _deferObserver=null;
function deferObserver(){
  if(_deferObserver||typeof IntersectionObserver==='undefined')return _deferObserver;
  _deferObserver=new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(!en.isIntersecting)return;
      const slot=_deferSlots.get(en.target);
      if(!slot||slot.gen===_chartGen)return;
      slot.gen=_chartGen;
      try{slot.fn();}catch(e){console.warn('[chart]',e);}
    });
  },{rootMargin:'400px 0px',threshold:0});
  return _deferObserver;
}
// Build now if on screen, else when close. `redraw` forces a rebuild of a chart
// destroyed while hidden.
function deferChart(node,fn,redraw){
  if(!node){try{fn();}catch(e){}return;}
  const ob=deferObserver();
  if(!ob){try{fn();}catch(e){}return;}      // no IntersectionObserver: just draw it
  const slot=_deferSlots.get(node);
  if(slot){slot.fn=fn;if(redraw)slot.gen=-1;}
  else{_deferSlots.set(node,{fn,gen:-1});ob.observe(node);}
}
// Draw registered charts on or near screen, after registration so they use current settings.
function drawVisibleDeferred(){
  if(!_deferObserver)return;
  _deferSlots.forEach((slot,node)=>{
    if(!node.isConnected){_deferSlots.delete(node);return;}
    // Rect check; the observer only fires on crossings.
    const r=node.getBoundingClientRect();
    if(slot.gen!==_chartGen&&r.bottom>-400&&r.top<(window.innerHeight||0)+400&&r.width>0){
      slot.gen=_chartGen;
      try{slot.fn();}catch(e){console.warn('[chart]',e);}
    }
  });
}
function renderMiniChart(nw){const c=el('miniChart');if(!c||!window.Chart)return;
  if(miniChartInst&&chartUnchanged('mini',getFilteredHistory().map(p=>chartSigNum(p.netWorth)).join(',')+'|'+chartSigNum(nw)+'|'+state.settings.theme))return;
  const hist=getFilteredHistory();
  // Draw from real points only (history plus today); flat if nothing moved, with a
  // caption when history is thin.
  const thin=hist.length<2;
  c.style.display='';
  {const box=c.parentElement;if(box){const n=box.querySelector(':scope > .chart-empty');if(n)n.remove();box.classList.remove('chart-na-host');}}
  // After the fixed-height chart box, not inside it.
  {const box=c.parentElement,host=box&&box.parentElement;
   if(host){
     let cap=host.querySelector(':scope > .chart-thin');
     if(thin){
       if(!cap){cap=document.createElement('div');cap.className='chart-note chart-thin';box.insertAdjacentElement('afterend',cap);}
       cap.textContent=hist.length?'Only one day recorded so far, the line fills in as you go':'No history yet, the line fills in as you go';
     }else if(cap)cap.remove();
   }}
  const pts=thin?[hist.length?hist[0].netWorth:nw,nw]:hist.map(p=>p.netWorth);
  if(miniChartInst){try{miniChartInst.destroy();}catch(e){}miniChartInst=null;}const pos=pts.length<2||pts[pts.length-1]>=pts[0],T=themeColors(),col=pos?T.accent:T.red;
  miniChartInst=new Chart(c,{type:'line',data:{labels:pts.map((_,i)=>i),datasets:[{data:pts,borderColor:col,borderWidth:2.2,tension:.4,fill:true,backgroundColor:ctx=>{const g=ctx.chart.ctx.createLinearGradient(0,0,0,84);g.addColorStop(0,hexA(col,.24));g.addColorStop(1,hexA(col,0));return g;},pointRadius:0,pointHoverRadius:6,pointHoverBackgroundColor:col,pointHoverBorderColor:T.card,pointHoverBorderWidth:2.5,pointStyle:'circle'}]},options:{responsive:true,maintainAspectRatio:false,animation:{duration:state.settings.reduceMotion?0:550},plugins:{legend:{display:false},tooltip:{enabled:false,external:ctx=>buildHoverTooltip(ctx,'chartTooltip',i=>(thin?(i===0&&hist.length?hist[0].date:new Date().toISOString()):(hist[i]?.date||'')),{series:pts,sinceLabel:rangeLabel(currentPnlRange)==='all time'?'All time':'Over '+rangeLabel(currentPnlRange)})}},scales:{x:{display:false},y:{display:false,...paddedYRange(pts)}},interaction:{intersect:false,mode:'index'},onHover:(e,els,chart)=>{const wrap=el('miniChartWrap');if(els&&els.length){const x=els[0].element.x;chart._hoverX=x;if(wrap)wrap.classList.add('hovering');const vl=el('chartVLine');if(vl)vl.style.left=x+'px';}else{chart._hoverX=null;if(wrap)wrap.classList.remove('hovering');}chart.draw();}},plugins:[sharedCrosshairPlugin]});}
function renderDonut(ta){
  if(donutChartInst&&chartUnchanged('donut',allocMode+'|'+state.settings.theme+'|'+state.assets.map(a=>a.id+':'+chartSigNum(getAssetCurrentValue(a))).join(','))) return;
  const catColors={crypto:'#f5a623',stock:'#4a9eff',commodity:'#ffd700',liquidity:'#16d6a4',property:'#a78bfa',other:'#ff7b3a'};const palette=['#f5a623','#4a9eff','#16d6a4','#a78bfa','#ff7b3a','#ffd700','#5aa6ff','#ff5b75','#00d4c8'];
  let entries=[],colors=[];
  if(allocMode==='asset'){const arr=state.assets.map(a=>({n:stripParens(a.name),v:getAssetCurrentValue(a)})).filter(x=>x.v>0).sort((a,b)=>b.v-a.v);arr.slice(0,6).forEach((x,i)=>{entries.push([x.n,x.v]);colors.push(palette[i%palette.length]);});if(arr.length>6){const rest=arr.slice(6).reduce((s,x)=>s+x.v,0);if(rest>0){entries.push(['Others',rest]);colors.push('#6f6f6f');}}}
  else{const m={};state.assets.forEach(a=>{const v=getAssetCurrentValue(a);m[a.category]=(m[a.category]||0)+v;});entries=Object.entries(m).filter(([,v])=>v>0);colors=entries.map(([k])=>catColors[k]||'#888');}
  const body=el('allocBody');if(!entries.length){body.innerHTML='<div class="empty-state" style="padding:18px 0"><p style="font-size:11px">Add assets to see allocation</p></div>';if(donutChartInst){donutChartInst.destroy();donutChartInst=null;}return;}
  body.innerHTML=`<div class="alloc-body"><div class="donut-wrap"><canvas id="donutChart" role="img" aria-label="Allocation chart"></canvas><div class="donut-center"><div class="dc-val">${entries.length}</div><div class="dc-lbl">${allocMode==='asset'?'assets':'types'}</div></div></div><div class="alloc-legend" id="allocLegend"></div></div>`;
  const c=el('donutChart');if(donutChartInst){try{donutChartInst.destroy();}catch(e){}donutChartInst=null;}
  el('allocLegend').innerHTML=entries.map(([k,v],i)=>`<div class="legend-item"><span class="legend-dot" style="background:${colors[i]}"></span><span class="legend-name">${esc(allocMode==='asset'?k:catLabel(k))}</span><span class="legend-pct">${ta>0?(v/ta*100).toFixed(1)+'%':'-'}</span></div>`).join('');
  // The legend is DOM; render it even without Chart.js.
  if(!window.Chart)return;
  donutChartInst=new Chart(c,{type:'doughnut',data:{labels:entries.map(([k])=>allocMode==='asset'?k:catLabel(k)),datasets:[{data:entries.map(([,v])=>v),backgroundColor:colors,borderWidth:0,hoverOffset:5}]},options:{responsive:false,cutout:'72%',animation:{duration:state.settings.reduceMotion?0:550},plugins:{legend:{display:false},tooltip:{enabled:false}}}});}
function setAllocMode(m){allocMode=m;haptic('tap');el('allocSegCat').classList.toggle('on',m==='cat');el('allocSegAsset').classList.toggle('on',m==='asset');renderDonut(state.assets.reduce((s,a)=>s+getAssetCurrentValue(a),0));}
function renderBreakdown(ta,to,ti){const rows=[{label:'Investments & Assets',val:ta,color:'var(--green)'},{label:'Owed to Me',val:to,color:'var(--accent)'},{label:'I Owe',val:ti,color:'var(--red)',neg:false}];
  el('breakdownList').innerHTML=rows.map(r=>`<div style="background:var(--card);border:1px solid var(--border);border-radius:11px;padding:10px 12px;display:flex;align-items:center;justify-content:space-between;margin-bottom:6px"><span style="font-size:11px;color:var(--text2)">${r.label}</span><span style="font-size:13px;font-weight:700;color:${readableInk(r.color)}">${r.neg?'-':''}${fmt(r.val)}</span></div>`).join('');}
function renderRecentTx(){const tx=el('recentTx'),recent=[...(state.transactions||[])].filter(t=>!t.transfer).reverse().slice(0,6);if(!recent.length){tx.innerHTML='<div class="empty-state" style="padding:20px"><p>No transactions yet</p></div>';return;}const tm={};ASSET_TYPES.forEach(t=>tm[t.id]=t);
  tx.innerHTML=recent.map((t,i)=>{const type=tm[t.category]||ASSET_TYPES[5],img=t.coinImage||'';let amtClass='neutral';if(t.txType==='sell'&&t.realized!=null)amtClass=t.realized>=0?'sell':'loss';return `<div class="tx-item${enterCls()}" style="animation-delay:${_animateEnter?i*40:0}ms"><div class="tx-icon" style="background:${type.bg}">${img?`<img src="${img}" onerror="this.style.display='none'" loading="lazy"/>`:`<div style="color:${readableInk(type.color)}">${svgIcon(t.icon||'coins',15)}</div>`}</div><div class="tx-info"><div class="tx-name">${esc(txDisplayName(t))}</div><div class="tx-date">${formatDate(t.date)}${t.notes?' · '+esc(t.notes):''}</div></div><div class="tx-vals"><div class="tx-amount ${amtClass}">${fmt(t.amount)}</div><div class="tx-type">${txTypeLabel(t)}${t.qty&&t.category!=='liquidity'?' · '+esc(fmtQty(t.qty,(state.assets||[]).find(x=>x.id===t.assetId)))+' units':''}</div></div></div>`;}).join('');}
// ASSETS
function onAssetSearch(){assetQuery=el('assetSearch').value.trim().toLowerCase();renderAssets();}
function cycleAssetSort(){const i=SORTS.indexOf(assetSort);assetSort=SORTS[(i+1)%SORTS.length];state.settings.assetSort=assetSort;saveState();el('assetSortLbl').textContent=SORT_LBL[assetSort];haptic('tap');renderAssets();}
function renderAssets(){const list=el('assetsList'),tw=el('assetsTableWrap'),sbarWrap=el('assetsSummaryBar'),isTable=assetView==='table';list.style.display=isTable?'none':'';tw.style.display=isTable?'block':'none';if(sbarWrap)sbarWrap.style.display=isTable?'none':'';const target=isTable?tw:list;let assets=state.assets.slice();
  if(activeCat!=='all')assets=assets.filter(a=>a.category===activeCat);
  if(assetQuery)assets=assets.filter(a=>(a.name||'').toLowerCase().includes(assetQuery)||(a.ticker||'').toLowerCase().includes(assetQuery)||catLabel(a.category).toLowerCase().includes(assetQuery)||(a.notes||'').toLowerCase().includes(assetQuery));
  if(assetSort==='value')assets.sort((a,b)=>getAssetCurrentValue(b)-getAssetCurrentValue(a));
  else if(assetSort==='name')assets.sort((a,b)=>(a.name||'').localeCompare(b.name||''));
  else if(assetSort==='pnl')assets.sort((a,b)=>(getAssetPnLPct(b)??-1e9)-(getAssetPnLPct(a)??-1e9));
  else if(assetSort==='recent')assets.sort((a,b)=>new Date(b.date||0)-new Date(a.date||0));
  if(!assets.length){target.innerHTML=state.assets.length&&(assetQuery||activeCat!=='all')?`<div class="empty-state"><div class="empty-ico">${svgIcon('wallet',30)}</div><h3>No matches</h3><p>Try a different search or category filter.</p><button class="empty-cta" onclick="clearAssetFilters()">Clear filters</button></div>`:`<div class="empty-state"><div class="empty-ico">${svgIcon('wallet',30)}</div><h3>No assets yet</h3><p>Start tracking your crypto, stocks, gold, bank balances & property in one place.</p><button class="empty-cta" onclick="openAddAsset()">${svgIcon('rocket',14)} Add your first asset</button></div>`;
    // Clear the summary bar on this early return too.
    if(sbarWrap){sbarWrap.innerHTML='';sbarWrap.style.display='none';}
    return;}
  if(isTable){renderAssetsTable(target,assets);return;}
  const tm={};ASSET_TYPES.forEach(t=>tm[t.id]=t);
  const renderRow=(a,i)=>{const type=tm[a.category]||ASSET_TYPES[5],cv=getAssetCurrentValue(a),pnl=getAssetPnL(a),pp=getAssetPnLPct(a),hasLive=a.coinId&&livePrices[a.coinId],nq=nepseQuote(a),img=a.coinImage||'';let sub='';
    if(a.category==='liquidity')sub=a.liquidityType||'Cash';else if(a.qty)sub=qtyWithUnit(a)+' · '+catLabel(a.category);else sub=catLabel(a.category);
    let badges='';if(isNepseListed(a))badges+=' <span class="nepse-badge">NEPSE</span>';
    // NEPSE day change uses the same badge as crypto 24h.
    let chg='';const c24=hasLive?livePrices[a.coinId].change24h:(nq?nq.change:null);
    if(c24!=null)chg=`<span style="font-size:9.5px;font-weight:700;color:${c24>=0?'var(--green)':'var(--red)'}">${c24>=0?'▲':'▼'}${Math.abs(c24).toFixed(1)}%</span>`;
    return `<div class="asset-item${enterCls()}${isPendingSync('assets',a.id)?' unsynced':''}" style="animation-delay:${_animateEnter?Math.min(i,12)*35:0}ms" role="button" tabindex="0" data-asset-id="${a.id}" onclick="openAssetDetail('${a.id}')" aria-label="${esc(a.name)}, ${fmt(cv)}">${isPendingSync('assets',a.id)?pendingBadge():''}<div class="asset-ico" style="background:${type.bg}">${img?`<img src="${img}" onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex'" decoding="async" loading="lazy"/><div style="display:none;color:${readableInk(type.color)}">${svgIcon(a.icon||'coins',18)}</div>`:`<div style="color:${readableInk(type.color)}">${svgIcon(a.icon||'coins',18)}</div>`}</div><div class="asset-info"><div class="asset-name">${esc(a.name)}</div><div class="asset-sub">${esc(sub)}${badges} ${chg}</div></div><div class="asset-vals"><div class="asset-val">${fmt(cv)}</div><div class="asset-pnl ${pnl===null?'neu':pnl>=0?'pos':'neg'}">${a.category==='liquidity'?'':(pnl===null?fmt((a.buyPrice||0)*assetUnits(a))+' cost':(pnl>=0?'▲+':'▼')+fmt(Math.abs(pnl))+(pp!==null?' ('+Math.abs(pp).toFixed(1)+'%)':''))}</div></div></div>`;};
  // Grouped by category on All; a single-category filter stays flat.
  const groupIds=CAT_ORDER.filter(c=>assets.some(a=>a.category===c))
    .concat(assets.some(a=>!CAT_ORDER.includes(a.category))?['__rest']:[]);
  const grouped=activeCat==='all'&&groupIds.length>1;
  list.classList.toggle('grouped',grouped);
  if(!grouped){list.innerHTML=assets.map(renderRow).join('');}
  else{
    const groups=groupIds.map(id=>{
      const inIt=id==='__rest'?assets.filter(a=>!CAT_ORDER.includes(a.category)):assets.filter(a=>a.category===id);
      let gv=0,gInv=0,gPnl=0,gHasPnl=false;
      inIt.forEach(a=>{gv+=getAssetCurrentValue(a);
        gInv+=a.category==='liquidity'?(a.value||0):((a.buyPrice||0)*assetUnits(a));
        const q=getAssetPnL(a);if(q!==null){gPnl+=q;gHasPnl=true;}});
      return {id,items:inIt,value:gv,inv:gInv,pnl:gPnl,hasPnl:gHasPnl};
    })
    // Biggest first.
    .sort((a,b)=>b.value-a.value);
    // Search opens matching groups without changing the stored choice.
    const forceOpen=!!assetQuery;
    let i0=0;
    list.innerHTML=groups.map(g=>{
      const type=tm[g.id]||ASSET_TYPES[ASSET_TYPES.length-1];
      const open=forceOpen||assetGroupOpen(g.id,assets.length);
      const pct=g.inv>0?(g.pnl/g.inv*100):null;
      const pnlTxt=g.hasPnl?`<span class="ag-pnl ${g.pnl>=0?'pos':'neg'}">${g.pnl>=0?'+':''}${fmt(g.pnl)}${pct!==null?' ('+(pct>=0?'+':'')+pct.toFixed(1)+'%)':''}</span>`:'';
      const label=g.id==='__rest'?'Other':catLabel(g.id);
      const body=g.items.map(a=>renderRow(a,i0++)).join('');
      // Rail in the category's colour.
      return `<section class="ag-group${open?' open':''}" data-cat="${esc(g.id)}" style="--ag-col:${type.color}">`
        +`<button type="button" class="ag-head" aria-expanded="${open?'true':'false'}" onclick="toggleAssetGroup('${esc(g.id)}')">`
        +`<span class="ag-ico" style="background:${type.bg};color:${readableInk(type.color)}">${type.svg||svgIcon('coins',16)}</span>`
        +`<span class="ag-txt"><span class="ag-name">${esc(label)}</span>`
        +`<span class="ag-meta">${plural(g.items.length,'asset')}${pnlTxt?' · ':''}${pnlTxt}</span></span>`
        +`<span class="ag-val">${fmt(g.value)}</span>`
        +`<svg class="ag-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`
        +`</button>`
        +`<div class="ag-body"><div class="ag-items">${body}</div></div></section>`;
    }).join('')
    +`<div class="ag-all"><button type="button" class="ag-all-btn" onclick="setAllAssetGroups(true)">Expand all</button>`
    +`<button type="button" class="ag-all-btn" onclick="setAllAssetGroups(false)">Collapse all</button></div>`;
  }
  // Totals bar sits outside the grid; scrolls sideways only when narrow.
  let tInv=0,tVal=0,tPnl=0,hasPnl=false;
  assets.forEach(a=>{const inv=a.category==='liquidity'?(a.value||0):((a.buyPrice||0)*assetUnits(a));const cv2=getAssetCurrentValue(a);const pnl2=getAssetPnL(a);tInv+=inv;tVal+=cv2;if(pnl2!==null){tPnl+=pnl2;hasPnl=true;}});
  const totPp=tInv>0?(tPnl/tInv*100):0;
  const pnlColor=tPnl>=0?'var(--green)':'var(--red)';
  const cells=[
    {label:'ASSETS',val:assets.length+' total'},
    {label:'INVESTED',val:fmt(tInv)},
    {label:'CURRENT VALUE',val:fmt(tVal)},
    {label:'P&L',val:hasPnl?(tPnl>=0?'+':'')+fmt(tPnl)+(' ('+(totPp>=0?'+':'')+totPp.toFixed(1)+'%)'):'N/A',color:hasPnl?pnlColor:null},
  ];
  const sbar=el('assetsSummaryBar');
  if(sbar)sbar.innerHTML=assets.length?`<div class="assets-summary-scroll"><div class="assets-summary-row">${cells.map(c=>`<div class="assets-summary-cell"><div class="assets-summary-lbl">${c.label}</div><div class="assets-summary-val" style="color:${c.color?readableInk(c.color):'var(--text)'}">${c.val}</div></div>`).join('')}</div></div>`:'';
  attachContextMenu(list,'.asset-item',openAssetContextMenu);}
function clearAssetFilters(){assetQuery='';activeCat='all';state.settings.activeCat='all';saveState();el('assetSearch').value='';document.querySelectorAll('.cat-pill').forEach(x=>x.classList.toggle('active',x.dataset.cat==='all'));renderAssets();}
function setAssetView(v){assetView=v;state.settings.assetView=v;saveState();el('viewCardsBtn').classList.toggle('on',v==='cards');el('viewTableBtn').classList.toggle('on',v==='table');haptic('tap');renderAssets();}
let ledgerFilter='all';
function openLedger(){ledgerFilter='all';el('ledgerSearch').value='';document.querySelectorAll('.ledger-pill').forEach(p=>p.classList.toggle('active',p.dataset.f==='all'));renderLedger();openModal('ledgerModal');}
// GLOBAL SEARCH
let globalSearchTimeout=null;
function openGlobalSearch(){
  el('globalSearchInput').value='';
  el('globalSearchResults').innerHTML='<div class="empty-state" style="padding:24px 12px"><p>Start typing to search across everything, assets, spending, debts, goals, bills, transactions, and notes.</p></div>';
  openModal('globalSearchModal');
  setTimeout(()=>{try{el('globalSearchInput').focus();}catch(e){}},250);
}
function onGlobalSearch(){
  clearTimeout(globalSearchTimeout);
  globalSearchTimeout=setTimeout(renderGlobalSearch,120);
}
function renderGlobalSearch(){
  const q=el('globalSearchInput').value.trim().toLowerCase();
  const box=el('globalSearchResults');
  if(!q){box.innerHTML='<div class="empty-state" style="padding:24px 12px"><p>Start typing to search across everything, assets, spending, debts, goals, bills, transactions, and notes.</p></div>';return;}
  const tm={};ASSET_TYPES.forEach(t=>tm[t.id]=t);
  const matches=s=>(s||'').toLowerCase().includes(q);

  const assets=state.assets.filter(a=>matches(a.name)||matches(a.notes)||matches(a.ticker));
  const debts=(state.debts||[]).filter(d=>matches(d.name)||matches(d.note));
  const goals=(state.goals||[]).filter(g=>matches(g.name));
  const txs=(state.transactions||[]).filter(t=>matches(txDisplayName(t))||matches(t.notes)).slice(-200).reverse(); // cap for performance on very large histories
  // Category and account names are searchable too.
  const acctName=id=>{const a=(state.assets||[]).find(x=>x.id===id);return a?a.name:'';};
  const spends=(state.spends||[]).filter(x=>x&&(matches(x.note)||matches(catOf(x).label)||matches(acctName(x.account))))
    .slice().sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,40);
  const bills=(state.recurs||[]).filter(r=>r&&(matches(r.name)
    ||matches(recurKind(r)==='bill'?spendCat(r.spendCat).label:catLabel(r.category))));

  const total=assets.length+spends.length+debts.length+goals.length+bills.length+txs.length;
  if(!total){box.innerHTML='<div class="empty-state" style="padding:24px 12px"><p>No matches for "'+esc(q)+'".</p></div>';return;}

  let html='';
  if(assets.length){
    html+='<div class="settings-sec-lbl">ASSETS</div>';
    html+=assets.map(a=>{const type=tm[a.category]||ASSET_TYPES[5];const cv=getAssetCurrentValue(a);
      return `<button class="s-item" onclick="closeModal('globalSearchModal');openAssetDetail('${a.id}')"><span class="s-item-ico" style="color:${readableInk(type.color)}">${a.coinImage?`<img src="${esc(a.coinImage)}" style="width:18px;height:18px;border-radius:50%" onerror="this.style.display='none'"/>`:(a.icon?svgIcon(a.icon,16):type.svg)}</span><span class="s-item-info"><span class="s-item-name">${esc(a.name)}</span><span class="s-item-sub">${esc(type.label||a.category)}${a.notes?' · '+esc(a.notes.slice(0,40)):''}</span></span><span class="s-item-right" style="font-weight:700;font-size:13px">${fmt(cv)}</span></button>`;
    }).join('');
  }
  if(spends.length){
    html+='<div class="settings-sec-lbl">SPENDING</div>';
    html+=spends.map(x=>{const c=catOf(x);const inc=x.kind==='income';
      return `<button class="s-item" onclick="closeModal('globalSearchModal');openSpendFromSearch('${jsAttr(x.id)}')">`
        +`<span class="s-item-ico" style="color:${esc(readableInk(c.color||'#888'))}">${svgIcon(c.icon||'box',16)}</span>`
        +`<span class="s-item-info"><span class="s-item-name">${esc(x.note||c.label)}</span>`
        +`<span class="s-item-sub">${esc(c.label)} · ${esc(formatDate(x.date))}</span></span>`
        +`<span class="s-item-right" style="font-weight:700;font-size:13px;color:${inc?'var(--green)':'var(--text)'}">${inc?'+':'−'}${fmt(x.amount)}</span></button>`;
    }).join('');
  }
  if(debts.length){
    html+='<div class="settings-sec-lbl">DEBTS</div>';
    html+=debts.map(d=>`<button class="s-item" onclick="closeModal('globalSearchModal');openDebtDetail('${d.id}')"><span class="s-item-ico">${svgIcon('wallet',16)}</span><span class="s-item-info"><span class="s-item-name">${esc(d.name)}</span><span class="s-item-sub">${d.type==='owed'?'Owed to you':'You owe'}${d.note?' · '+esc(d.note.slice(0,40)):''}</span></span><span class="s-item-right" style="font-weight:700;font-size:13px">${fmt(d.amount)}</span></button>`).join('');
  }
  if(goals.length){
    html+='<div class="settings-sec-lbl">GOALS</div>';
    html+=goals.map(g=>`<button class="s-item" onclick="closeModal('globalSearchModal');goPage('plan');setTimeout(()=>openGoalDetail&&openGoalDetail('${g.id}'),250)"><span class="s-item-ico">${svgIcon(g.icon||'target',16)}</span><span class="s-item-info"><span class="s-item-name">${esc(g.name)}</span><span class="s-item-sub">${fmt(g.saved||0)} of ${fmt(g.target||0)}</span></span></button>`).join('');
  }
  if(bills.length){
    html+='<div class="settings-sec-lbl">RECURRING</div>';
    html+=bills.map(r=>{const bill=recurKind(r)==='bill';const c=bill?spendCat(r.spendCat):null;
      return `<button class="s-item" onclick="closeModal('globalSearchModal');goPage('plan');setTimeout(()=>openEditRecur('${jsAttr(r.id)}'),250)">`
        +`<span class="s-item-ico" style="color:${esc(bill?(c.color||'#888'):'var(--accent)')}">${svgIcon(bill?(c.icon||'box'):'coins',16)}</span>`
        +`<span class="s-item-info"><span class="s-item-name">${esc(r.name)}</span>`
        +`<span class="s-item-sub">${bill?'Bill · '+esc(c.label):'Investment · '+esc(catLabel(r.category))} · ${esc(freqLabel(r.freq))}</span></span>`
        +`<span class="s-item-right" style="font-weight:700;font-size:13px">${fmt(r.amount)}</span></button>`;
    }).join('');
  }
  if(txs.length){
    html+='<div class="settings-sec-lbl">TRANSACTIONS</div>';
    html+=txs.slice(0,30).map(t=>{const isSell=t.txType==='sell';const type=tm[t.category]||ASSET_TYPES[5];
      const openFn=t.assetId?`openAssetDetail('${t.assetId}')`:`openLedger()`;
      return `<button class="s-item" onclick="closeModal('globalSearchModal');${openFn}"><span class="s-item-ico" style="color:${isSell?'var(--green)':'var(--blue)'}">${svgIcon(isSell?'trending':'trending',16)}</span><span class="s-item-info"><span class="s-item-name">${esc(txTypePhrase(t))}</span><span class="s-item-sub">${formatDate(t.date)}${t.notes?' · '+esc(t.notes.slice(0,40)):''}</span></span><span class="s-item-right" style="font-weight:700;font-size:13px">${fmt(t.amount)}</span></button>`;
    }).join('');
    if(txs.length>30)html+=`<div class="empty-state" style="padding:10px"><p>+${txs.length-30} more transaction matches, open Transactions to see all.</p></div>`;
  }
  box.innerHTML=html;
}

function setLedgerFilter(f){ledgerFilter=f;document.querySelectorAll('.ledger-pill').forEach(p=>p.classList.toggle('active',p.dataset.f===f));haptic('tap');renderLedger();}
function renderLedger(){
  const q=(el('ledgerSearch').value||'').trim().toLowerCase();
  const tm={};ASSET_TYPES.forEach(t=>tm[t.id]=t);
  let txs=(state.transactions||[]).slice();
  if(ledgerFilter==='buy')txs=txs.filter(t=>t.txType==='buy');
  else if(ledgerFilter==='sell')txs=txs.filter(t=>t.txType==='sell');
  else if(['crypto','stock','commodity','liquidity','property','other'].includes(ledgerFilter))txs=txs.filter(t=>t.category===ledgerFilter);
  if(q)txs=txs.filter(t=>txDisplayName(t).toLowerCase().includes(q));
  txs.sort((a,b)=>new Date(b.date)-new Date(a.date));
  const list=el('ledgerList'),summary=el('ledgerSummary');
  // Cash legs from trades are shown but not totalled.
  const real=txs.filter(t=>!t.transfer);
  // Deposits and withdrawals are not trades; total them separately.
  const isCash=t=>t.category==='liquidity';
  const sum=l=>l.reduce((s,t)=>s+(t.amount||0),0);
  const buys=real.filter(t=>t.txType==='buy'&&!isCash(t));
  const sells=real.filter(t=>t.txType==='sell'&&!isCash(t));
  const depos=real.filter(t=>t.txType==='buy'&&isCash(t));
  const draws=real.filter(t=>t.txType==='sell'&&isCash(t));
  const incomes=real.filter(t=>t.txType==='income');
  const realized=sells.reduce((s,t)=>s+(t.realized||0),0);
  const cells=[['Transactions',String(txs.length),null,null]];
  if(buys.length)cells.push(['Bought',fmt(sum(buys)),null,plural(buys.length,'purchase')]);
  if(sells.length)cells.push(['Sold',fmt(sum(sells)),null,plural(sells.length,'sale')]);
  // Realised = proceeds - cost; not Sold - Bought.
  if(sells.length)cells.push(['Realized P&L',(realized>=0?'+':'')+fmt(realized),
    realized>0?'var(--green)':realized<0?'var(--red)':null,'on what was sold']);
  if(depos.length)cells.push(['Money in',fmt(sum(depos)),'var(--green)',plural(depos.length,'deposit')]);
  if(draws.length)cells.push(['Money out',fmt(sum(draws)),'var(--red)',plural(draws.length,'withdrawal')]);
  if(incomes.length)cells.push(['Income',fmt(sum(incomes)),'var(--accent)',plural(incomes.length,'payment')]);
  summary.innerHTML=`<div class="tx-summary-grid">${cells.map(c=>
    `<div class="tx-sum-cell"><span class="tx-summary-lbl">${c[0]}</span>`
    +`<span class="tx-summary-val"${c[2]?` style="color:${c[2]}"`:''}>${c[1]}</span>`
    +(c[3]?`<span class="tx-summary-sub">${esc(c[3])}</span>`:'')
    +`</div>`).join('')}</div>`;
  if(!txs.length){list.innerHTML=`<div class="empty-state" style="padding:24px 12px"><p>${(state.transactions||[]).length?'No transactions match your filters.':'No transactions recorded yet.'}</p></div>`;return;}
  let html='',lastDateKey='';
  txs.forEach(t=>{
    const dateKey=formatDate(t.date);
    if(dateKey!==lastDateKey){html+=`<div class="ledger-date-hdr">${dateKey}</div>`;lastDateKey=dateKey;}
    const type=tm[t.category]||ASSET_TYPES[5];
    const isSell=t.txType==='sell';
    // Withdrawals from cash are red: green means money arriving.
    let amtClass='buy';
    // Income uses the accent colour.
    if(t.txType==='income')amtClass='income';
    else if(isCash(t))amtClass=t.txType==='sell'?'loss':'cashin';
    else if(isSell)amtClass=(t.realized==null||t.realized>=0)?'sell':'loss';
    const _la=(state.assets||[]).find(x=>x.id===t.assetId)||null;
    const qtyTxt=t.enteredQty!=null?(fmtQty(t.enteredQty,_la)+(t.enteredUnit?' '+t.enteredUnit:'')):(t.qty!=null?(fmtQty(t.qty,_la)+(type.id==='commodity'&&t.unit?' '+t.unit:'')):'');
    html+=`<div class="ledger-row"><div class="ledger-ico" style="background:${type.bg}">${t.coinImage?`<img src="${esc(t.coinImage)}" style="width:18px;height:18px;border-radius:50%" onerror="this.style.display='none'"/>`:`<div style="color:${readableInk(type.color)}">${svgIcon(t.icon||'coins',15)}</div>`}</div><div class="ledger-info"><div class="ledger-name">${esc(txDisplayName(t))}</div><div class="ledger-meta">${txTypeLabel(t)}${qtyTxt?' · '+esc(qtyTxt):''}${t.notes?' · <em>'+esc(t.notes)+'</em>':''}</div></div><div class="ledger-amt ${amtClass}">${fmt(t.amount)}</div></div>`;
  });
  list.innerHTML=html;
  // Summary width changes per filter; re-measure the edge fade.
  if(typeof bindScrollHints==='function')bindScrollHints(el('ledgerModal')||undefined);
}
// TRANSACTION REPLAY
// Recompute an asset's qty/buyPrice from its transactions. Quantities are read from
// enteredQty/enteredUnit so changing the holding's unit cannot rescale history.
// Bank accounts and property have no quantity: amounts only.
function assetNoQty(a){return !!(a&&(a.category==='liquidity'||a.category==='property'));}
// Cash specifically: deposit/withdraw wording and colours.
function assetIsCash(a){return !!(a&&a.category==='liquidity');}
function txQtyInBase(t,asset){
  const u=asset&&asset.unit;
  if(u&&t.enteredUnit&&t.enteredQty!=null){
    if(t.enteredUnit===u)return t.enteredQty;
    const c=convertUnit(t.enteredQty,t.enteredUnit,u);
    if(c!=null&&isFinite(c))return c;
  }
  return t.qty||0;
}
// `opts.emptied`: the last transaction was just deleted, so zero is correct (unlike a
// holding that never had any).
function recalcAssetFromTransactions(asset,opts){
  if(asset.category==='liquidity')return; // liquidity has no transaction-based qty model
  const txs=txsForAsset(asset).map((t,i)=>({t,i})).sort((a,b)=>(new Date(a.t.date)-new Date(b.t.date))||(a.i-b.i)).map(x=>x.t);
  // No quantity anywhere: cost is the money put in; skip the per-unit maths.
  const anyQty=txs.some(t=>t.txType!=='income'&&txQtyInBase(t,asset)>0);
  if(!anyQty){
    if(!txs.length){
      // Zero only when the caller says it was emptied.
      if(opts&&opts.emptied){
        if(asset.qty!=null)asset.qty=0;
        asset.buyPrice=0;
      }
      return;
    }
    let cost=0,sold=false;
    txs.forEach(t=>{ if(t.txType==='income')return; if(t.txType==='sell')sold=true; cost+=(t.txType==='sell'?-1:1)*(t.amount||0); });
    asset.buyPrice=Math.max(0,cost);
    // Held or sold, derived from the ledger so undoing a sale restores it.
    if(asset.category==='property'&&asset.qty!=null)asset.qty=sold?0:1;
    return;
  }
  let qty=0,avgCost=0;
  txs.forEach(t=>{
    // Income is a return, not more of the holding.
    if(t.txType==='income')return;
    const q=txQtyInBase(t,asset);
    if(t.txType==='sell'){
      t.realized=(t.amount||0)-avgCost*q; // recompute realized P&L at this point in the replay
      qty=Math.max(0,qty-q);
      // avgCost per unit stays the same on a sell, selling doesn't change the cost basis of what remains
    }else{
      const newQty=qty+q;
      avgCost=newQty>0?((avgCost*qty)+(t.amount||0))/newQty:avgCost;
      qty=newQty;
    }
  });
  // Round at the source: exports and sync see this value.
  asset.qty=+qty.toFixed(10);asset.buyPrice=avgCost;
}
let editingTxId=null;
let editTxPriceEntryCcy=null;
let isEditTxPerUnitMode=true;
// Shape of the open sheet.
let editTxNoQty=false,editTxIsCash=false;
// Accounts take an AMOUNT; property a whole buy/sell price.
function noQtyPriceLbl(type){return editTxIsCash?'AMOUNT':(type==='sell'?'SELL PRICE':'BUY PRICE');}
function setEditTxPriceEntryMode(perUnit){
  if(perUnit===isEditTxPerUnitMode)return;
  const inp=el('editTxPrice');
  const q=parseFloat(el('editTxQty')&&el('editTxQty').value)||0;
  const v=inp?parseFloat(inp.value):NaN;
  isEditTxPerUnitMode=perUnit;
  if(inp&&!isNaN(v)&&q>0) inp.value=(perUnit?v/q:v*q).toFixed(2);
  const _t=state.transactions.find(x=>x.id===editingTxId);
  syncEditTxPriceLbl(_t?(_t.txType||'buy'):'buy');
  syncEditTxLiveHint();
  haptic('tap');
}
function onEditTxPriceCcyChange(v){
  // Convert what is typed; the amount is unchanged.
  const fromRate=getCurrRate(editTxPriceEntryCcy||currentCurrency.code);
  editTxPriceEntryCcy=(v===currentCurrency.code)?null:v;
  const toRate=getCurrRate(editTxPriceEntryCcy||currentCurrency.code);
  const inp=el('editTxPrice'),val=parseFloat(inp&&inp.value);
  if(inp&&isFinite(val)&&val>0&&fromRate>0)inp.value=+(val/fromRate*toRate).toFixed(2);
  {const _t=state.transactions.find(x=>x.id===editingTxId);syncEditTxPriceLbl(_t?(_t.txType||'buy'):'buy');}
  syncEditTxLiveHint();
}
// Changing quantity keeps the per-unit price (total mode rescales the total).
let _editTxLastQty=null;
function onEditTxQtyChange(){
  const inp=el('editTxPrice'),q=parseFloat(el('editTxQty').value);
  if(!isEditTxPerUnitMode&&inp){
    const val=parseFloat(inp.value),prev=num(_editTxLastQty);
    if(isFinite(val)&&val>0&&prev>0&&isFinite(q)&&q>0)inp.value=+(val/prev*q).toFixed(2);
  }
  if(isFinite(q)&&q>0)_editTxLastQty=q;
  syncEditTxLiveHint();
}
// Today's price, on request.
function editTxLivePerUnit(){
  const t=state.transactions.find(x=>x.id===editingTxId);if(!t)return null;
  const a=state.assets.find(x=>x.id===t.assetId)||state.assets.find(x=>x.name===t.name&&x.category===t.category);
  if(!a)return null;
  const unit=editTxUnit||t.enteredUnit||a.unit||null;
  const per=getLivePricePerUnitNPR(a,unit);
  return per>0?per:null;
}
function syncEditTxLiveHint(){
  const row=el('editTxLiveRow');if(!row)return;
  const per=editTxLivePerUnit();
  if(per===null){row.style.display='none';return;}
  const q=parseFloat(el('editTxQty').value)||0;
  const rate=getCurrRate(editTxPriceEntryCcy||currentCurrency.code);
  const shown=(isEditTxPerUnitMode?per:per*(q>0?q:1))*rate;
  row.style.display='';
  const lbl=el('editTxLiveLbl');
  if(lbl)lbl.textContent='Today '+(currentCurrency.sym)+shown.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
}
function useLiveEditTxPrice(){
  const per=editTxLivePerUnit();if(per===null)return;
  const q=parseFloat(el('editTxQty').value)||0;
  const rate=getCurrRate(editTxPriceEntryCcy||currentCurrency.code);
  const inp=el('editTxPrice');
  if(inp)inp.value=((isEditTxPerUnitMode?per:per*(q>0?q:1))*rate).toFixed(2);
  haptic('tap');toast('Filled with today\u2019s price','success');
}
let editTxUnit=null;
function openEditTx(txId){
  const t=state.transactions.find(x=>x.id===txId);if(!t)return;
  editingTxId=txId;
  editTxPriceEntryCcy=null;
  // Reset to per-unit on every open.
  isEditTxPerUnitMode=true;
  // Cash and property: the transaction is an amount.
  {const _a0=state.assets.find(x=>x.id===t.assetId);
   const _noQty=assetNoQty(_a0);
   editTxNoQty=_noQty;editTxIsCash=assetIsCash(_a0);
   const qc=el('editTxQtyCol');if(qc)qc.style.display=_noQty?'none':'';
   const row=el('editTxQtyPriceRow');if(row)row.style.gridTemplateColumns=_noQty?'1fr':'';
   const seg=el('editTxPriceModeSeg');if(seg)seg.style.display=_noQty?'none':'';
   const pl=el('editTxPriceLbl');if(pl&&_noQty)pl.textContent=noQtyPriceLbl(t.txType||'buy');
   if(_noQty)isEditTxPerUnitMode=false;}
  const a=state.assets.find(x=>x.id===t.assetId)||state.assets.find(x=>x.name===t.name&&x.category===t.category);
  renderEditTxTypeBadge(t);
  el('editTxQty').value=t.enteredQty!=null?t.enteredQty:(t.qty||'');
  const _rate=getCurrRate(currentCurrency.code);
  // Price per entered unit = stored total / entered quantity; no unit conversion needed.
  {const _q=parseFloat(t.enteredQty!=null?t.enteredQty:t.qty)||0;let _pv='';
  const _totalNPR=num(t.amount);
  const _noQtyAsset=assetNoQty(a);
  if(_noQtyAsset){
    // No quantity: the amount is the price.
    if(_totalNPR>0)_pv=(_totalNPR*_rate).toFixed(2);
  }else if(_totalNPR>0&&_q>0){
    _pv=((isEditTxPerUnitMode?_totalNPR/_q:_totalNPR)*_rate).toFixed(2);
  }else if(a&&_q>0){
    // No stored total: use the live/last price, converted to the entered unit.
    const _u=t.enteredUnit||a.unit||null;
    const _perBase=a.coinId&&livePrices[a.coinId]
      ?usdToBase(livePrices[a.coinId].usd)
      :(a.currentPrice||a.buyPrice||0);
    const _perEntered=(_u&&a.unit&&_u!==a.unit)?_perBase*convertUnit(1,_u,a.unit):_perBase;
    if(_perEntered>0)_pv=((isEditTxPerUnitMode?_perEntered:_perEntered*_q)*_rate).toFixed(2);
  }
  el('editTxPrice').value=_pv;}
  el('editTxDate').value=t.date?t.date.split('T')[0]:'';
  el('editTxNotes').value=t.notes||'';
  // The unit is the label.
  el('editTxQtyLbl').textContent=unitQtyLabel(t.enteredUnit||(a&&a.unit)||'')||'QUANTITY';
  el('editTxHint').textContent=esc(txDisplayName(t))+' · editing this transaction '+(editTxNoQty?'recalculates what this has cost you.':'recalculates the asset\u2019s total holdings and average cost.')+' The buy/sell type can\u2019t be changed here, delete and re-add the transaction if you recorded it as the wrong type.';
  buildCompactCcySelect('editTxPriceCcyWrap',null,onEditTxPriceCcyChange);
  // Unit selector for commodities
  const unitRow=el('editTxUnitRow');
  editTxUnit=t.enteredUnit||(a?a.unit:null);
  if(a&&a.category==='commodity'){
    unitRow.style.display='block';
    const comm=COMMODITIES.find(c=>c.id===a.commodityId)||COMMODITIES[0];
    editTxUnit=editTxUnit||comm.defaultUnit;
    buildCustomSelect('editTxUnitWrap',comm.unitOptions.map(u=>({value:u,label:u})),editTxUnit,v=>{editTxUnit=v;const lbl=el('editTxQtyLbl');if(lbl)lbl.textContent=unitQtyLabel(v);syncEditTxLiveHint();});
  }else{unitRow.style.display='none';}
  closeModal('assetEditPickerModal',true);closeModal('ledgerModal',true);
  // The quantity the sheet opened on is the baseline a rescale measures from.
  {const _q0=parseFloat(el('editTxQty').value);_editTxLastQty=isFinite(_q0)&&_q0>0?_q0:null;}
  syncEditTxLiveHint();
  openModal('editTxModal');
}
function renderEditTxTypeBadge(tx){
  const badge=el('editTxTypeBadge');if(!badge)return;
  const t=(typeof tx==='string')?{txType:tx}:(tx||{});
  const type=t.txType||'buy';
  const isSell=type==='sell';
  badge.textContent=txTypeLabel(t);
  badge.style.color=isSell?'var(--green)':'var(--blue)';
  badge.style.background=isSell?'var(--green-bg)':'var(--blue-bg)';
  syncEditTxPriceLbl(type);
}
function syncEditTxPriceLbl(type){
  const lbl=el('editTxPriceLbl');
  const kind=type==='sell'?'SELL':'BUY';
  // No quantity: no per-unit wording.
  if(editTxNoQty){if(lbl)lbl.textContent=noQtyPriceLbl(type);return;}
  if(lbl)lbl.textContent=isEditTxPerUnitMode?(kind+' PRICE / UNIT'):('TOTAL '+kind+' PRICE');
  const u=el('editTxPriceModeSegUnit'),tt=el('editTxPriceModeSegTotal');
  if(u)u.classList.toggle('active',isEditTxPerUnitMode);
  if(tt)tt.classList.toggle('active',!isEditTxPerUnitMode);
}
function saveEditTx(){
  const t=state.transactions.find(x=>x.id===editingTxId);if(!t)return;
  const a=state.assets.find(x=>x.id===t.assetId)||state.assets.find(x=>x.name===t.name&&x.category===t.category);
  const qty=parseFloat(el('editTxQty').value)||0,priceEntered=parseFloat(el('editTxPrice').value)||0;
  const rate=getCurrRate(editTxPriceEntryCcy||currentCurrency.code);
  const type=t.txType||'buy'; // type is fixed at edit time, buy/sell can't be toggled here
  // No quantity required for amount-only assets.
  const noQty=assetNoQty(a);
  if(noQty){
    if(priceEntered<=0){toast(assetIsCash(a)?'Enter an amount':'Enter a price','error');return;}
    if(!t.assetId)t.assetId=a.id;
    t.txType=type;
    t.qty=null;t.enteredQty=null;t.enteredUnit=null;t.perUnit=null;
    const _newAmt=priceEntered/rate;
    t.date=el('editTxDate').value?dayToISO(el('editTxDate').value):t.date;
    {const err=resyncCashLegs(t,_newAmt);if(err){toast(err,'error');return;}}
    t.amount=_newAmt;
    t.notes=el('editTxNotes').value||null;
    recalcAssetFromTransactions(a);trackPnLHistory();
    saveState();closeModal('editTxModal');renderAll();openAssetDetail(a.id);
    haptic('success');toast('Transaction updated','success');
    return;
  }
  if(qty<=0){toast('Enter a quantity','error');return;}
  if(priceEntered<=0){toast('Enter a price','error');return;}
  // Entered in the entered unit; stored in the asset's base unit, as saveTx does.
  const enteredUnit=(a&&a.category==='commodity')?(editTxUnit||t.enteredUnit||a.unit||null):(t.enteredUnit||(a&&a.unit)||null);
  const baseQty=(a&&a.category==='commodity'&&a.unit&&enteredUnit&&enteredUnit!==a.unit)
    ?convertUnit(qty,enteredUnit,a.unit):qty;
  if(!(baseQty>0)){toast('That quantity does not convert','error');return;}
  // Derive per-unit from the total, which is unit-independent.
  const totalNPR=(isEditTxPerUnitMode?priceEntered*qty:priceEntered)/rate;
  t.txType=type;
  t.qty=baseQty;
  t.enteredQty=qty;
  if(enteredUnit)t.enteredUnit=enteredUnit;
  t.date=el('editTxDate').value?dayToISO(el('editTxDate').value):t.date;
  // Before writing, so a refusal leaves the transaction untouched.
  {const err=resyncCashLegs(t,totalNPR);if(err){toast(err,'error');return;}}
  t.amount=totalNPR;
  t.perUnit=totalNPR/baseQty;                 // per base unit, matching saveTx
  t.notes=el('editTxNotes').value||null;
  if(a){if(!t.assetId)t.assetId=a.id;recalcAssetFromTransactions(a);trackPnLHistory();}
  saveState();closeModal('editTxModal');renderAll();if(a)openAssetDetail(a.id);haptic('success');toast('Transaction updated','success');
}
// Keep a trade's cash leg equal to the trade. Returns an error string if it cannot.
function resyncCashLegs(t,newTotalNPR){
  if(!t||!t.linkId)return null;
  const legs=(state.transactions||[]).filter(x=>x.linkId===t.linkId&&x.transfer);
  if(!legs.length)return null;
  const plan=[];
  for(const leg of legs){
    const acct=(state.assets||[]).find(x=>x.id===leg.assetId);
    if(!acct)continue;
    const out=leg.txType==='sell'; // money leaving that account
    if(isStablecoin(acct)){
      const per=getAssetCurrentPrice(acct)||leg.perUnit||0;
      if(!(per>0))return 'No price for '+(acct.ticker||acct.name)+' right now, so this cannot be corrected yet';
      const units=+(newTotalNPR/per).toFixed(8);
      if(out){
        const after=(acct.qty||0)-units+(leg.qty||0);
        if(after<-1e-9)return (acct.ticker||acct.name)+' does not hold enough for that';
      }
      plan.push({leg,acct,units,per});
    }else{
      if(out){
        const after=(acct.value||0)+(leg.amount||0)-newTotalNPR;
        if(after<-1e-9)return acct.name+' only has '+fmt((acct.value||0)+(leg.amount||0));
      }
      plan.push({leg,acct});
    }
  }
  const replay=[];
  plan.forEach(({leg,acct,units,per})=>{
    const out=leg.txType==='sell';
    if(units!==undefined){
      leg.qty=units;leg.enteredQty=units;leg.perUnit=per;leg.amount=newTotalNPR;
      if(replay.indexOf(acct)<0)replay.push(acct);
    }else{
      acct.value=(acct.value||0)+(out?1:-1)*(leg.amount||0);   // take the old movement back out
      acct.value=(acct.value||0)+(out?-1:1)*newTotalNPR;       // and put the corrected one in
      leg.amount=newTotalNPR;leg.perUnit=newTotalNPR;
    }
    leg.date=t.date;
  });
  replay.forEach(acct=>recalcAssetFromTransactions(acct));
  return null;
}
async function deleteEditTx(){
  const t=state.transactions.find(x=>x.id===editingTxId);if(!t)return;
  // Warn when undoing the trade would overdraw its cash account.
  let _msg='This asset\u2019s quantity and average cost will be recalculated from the remaining transactions.';
  const _legs=t.linkId?state.transactions.filter(x=>x.linkId===t.linkId&&x.transfer):[];
  const _overdrawn=[];
  _legs.forEach(leg=>{
    const acct=state.assets.find(x=>x.id===leg.assetId);if(!acct)return;
    // Stablecoin legs are units, not a balance.
    if(isStablecoin(acct)){
      const units=(leg.txType==='buy'?-1:1)*(leg.qty||0);
      const after=(acct.qty||0)+units;
      const sym=acct.ticker||acct.name;
      if(after<-1e-9)_overdrawn.push(sym+' would go to '+(+after.toFixed(4))+' units');
      else _msg+=' '+sym+' goes back to '+(+after.toFixed(4))+'.';
      return;
    }
    const after=(acct.value||0)+(leg.txType==='buy'?-1:1)*(leg.amount||0);
    if(after<-1e-9)_overdrawn.push(acct.name+' would go to '+fmt(after));
    else _msg+=' '+acct.name+' goes back to '+fmt(after)+'.';
  });
  if(_overdrawn.length)_msg+=' '+_overdrawn.join(', ')+', because that money has already been spent.';
  if(!await askConfirm({title:'Delete transaction?',message:_msg,confirmText:'Delete'}))return;
  const a=state.assets.find(x=>x.id===t.assetId)||state.assets.find(x=>x.name===t.name&&x.category===t.category);
  // Undoable: deleting a transaction rewrites the asset's cost basis.
  const _txLabel=(txDisplayName(t)?txDisplayName(t)+' ':'')+txTypeNoun(t)+' deleted';
  withUndo(_txLabel,['transactions','assets'],()=>{
  // Delete the linked cash leg too and restore the balance.
  const _link=t.linkId;
  if(_link){
    const _touched=[];
    state.transactions.filter(x=>x.linkId===_link&&x.transfer).forEach(leg=>{
      const acct=state.assets.find(x=>x.id===leg.assetId);
      if(!acct)return;
      // Stablecoins replay from their own ledger.
      if(isStablecoin(acct)){_touched.push(acct);return;}
      acct.value=(acct.value||0)+(leg.txType==='buy'?-1:1)*(leg.amount||0);
    });
    state.transactions=state.transactions.filter(x=>!(x.linkId===_link&&x.transfer));
    _touched.forEach(acct=>recalcAssetFromTransactions(acct));
  }
  state.transactions=state.transactions.filter(x=>x.id!==editingTxId);
  if(a){recalcAssetFromTransactions(a,{emptied:!txsForAsset(a).length});trackPnLHistory();
    if(a.qty<=0&&!txsForAsset(a).length){
      // Keep a zero-qty record rather than deleting the asset.
    }
  }
  saveState();
  });
  closeModal('editTxModal');renderAll();haptic('tap');
}
function openAssetEditPicker(id){
  const a=state.assets.find(x=>x.id===id);if(!a)return;ctxAssetId=id;
  const txs=txsForAsset(a).slice().sort((x,y)=>new Date(y.date)-new Date(x.date));
  const list=el('assetEditPickerTxList');
  if(a.category==='liquidity'||!txs.length){list.innerHTML=a.category==='liquidity'?'':'<div class="empty-state" style="padding:16px"><p>No transactions yet for this asset.</p></div>';}
  else{
    list.innerHTML=txs.map(t=>{const isSell=t.txType==='sell';const q=fmtQty(t.enteredQty!=null?t.enteredQty:t.qty,a);const unitTxt=t.enteredUnit||a.unit||'';
      return `<button class="s-item" onclick="openEditTxFromPicker('${t.id}')"><span class="s-item-ico" style="color:${isSell?'var(--green)':'var(--blue)'}">${svgIcon(isSell?'trending':'trending',16)}</span><span class="s-item-info"><span class="s-item-name">${esc(txTypeWord(t))} ${q?q+(unitTxt?' '+esc(unitTxt):''):''}</span><span class="s-item-sub">${formatDate(t.date)} · ${fmt(t.amount)}</span></span><span class="s-item-right"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></span></button>`;}).join('');
  }
  const sec=document.querySelector('#assetEditPickerModal .settings-sec-lbl');if(sec)sec.style.display=(!txs.length||a.category==='liquidity')?'none':'block';
  const delBtn=el('deleteAllTxBtn');if(delBtn)delBtn.style.display=(!txs.length||a.category==='liquidity')?'none':'block';
  openModal('assetEditPickerModal');
}
function openEditTxFromPicker(txId){openEditTx(txId);}
function openEditAssetDetailsFromPicker(){const id=ctxAssetId;closeModal('assetEditPickerModal');setTimeout(()=>openEditAsset(id),200);}
async function deleteAllPickerTx(){const a=state.assets.find(x=>x.id===ctxAssetId);if(!a)return;const txs=txsForAsset(a);if(!txs.length){toast('No transactions to delete');return;}if(!await askConfirm({title:'Delete all transactions?',message:'All '+txs.length+' transaction'+(txs.length>1?'s':'')+' for '+a.name+'? The asset will remain with zero holdings.',confirmText:'Delete all'}))return;const txIds=new Set(txs.map(t=>t.id));
  // Undoable, like a single delete.
  withUndo(plural(txs.length,'transaction')+' deleted',['transactions','assets'],()=>{
    state.transactions=(state.transactions||[]).filter(t=>!txIds.has(t.id));
    recalcAssetFromTransactions(a,{emptied:!txsForAsset(a).length});
    trackPnLHistory();saveState();
  });
  closeModal('assetEditPickerModal');renderAll();haptic('tap');}
function buildTxTable(txs,a){const baseUnit=a.unit||'unit';
  // A bank account has no quantity or rate columns.
  const noQty=assetNoQty(a),isCash=assetIsCash(a);
let buyAmt=0,sellAmt=0,realizedPnl=0,totalBoughtQty=0,sellQtyTotal=0,incomeAmt=0;
  const isCommodity=!!a.commodityId;
  const rows=txs.map(t=>{const isSell=t.txType==='sell',isInc=t.txType==='income';const q=t.qty||0;const per=t.perUnit||(q?t.amount/q:0);if(isInc){incomeAmt+=t.amount||0;}else if(isSell){sellAmt+=t.amount;sellQtyTotal+=q;if(t.realized!=null)realizedPnl+=t.realized;}else{buyAmt+=t.amount;totalBoughtQty+=q;}
    const sellColor=t.realized==null?'var(--text)':(t.realized>0?'var(--green)':t.realized<0?'var(--red)':'var(--text)');
    const dispUnit=t.enteredUnit||baseUnit;
    const dispQty=t.enteredQty!=null?t.enteredQty:(q?q:null);
    // Qty column: plain number only (unit shown separately for commodities, or implied for others)
    const qtyDisp=dispQty!=null?fmtQty(dispQty,a):'';
    const unitCell=isCommodity?`<td>${dispUnit?esc(dispUnit):'<span class="muted">-</span>'}</td>`:'';
    // Amount/Qty column: plain rate value, no "/unit" suffix
    const perDisp=per?fmt(per):'';
    const costBasisPerUnit=(isSell&&t.realized!=null&&q)?((t.amount||0)-t.realized)/q:null;
    const realizedSub=(isSell&&t.realized!=null)?`<div style="font-size:9.5px;font-weight:600;color:${t.realized>0?'var(--green)':t.realized<0?'var(--red)':'var(--text3)'}">${t.realized>0?'+':''}${fmt(t.realized)} P&amp;L</div>`:'';
    const qtyCell=noQty?'':`<td>${qtyDisp?esc(qtyDisp):'<span class="muted">-</span>'}</td>`;
    const perSub=(isSell&&costBasisPerUnit!=null)?`<div style="font-size:8.5px;font-weight:500;color:var(--text3)">Avg buy price ${fmt(costBasisPerUnit)}</div>`:'';
    const perCell=noQty?'':`<td>${perDisp?perDisp:'<span class="muted">-</span>'}${perSub}</td>`;
    // Cash colours by direction (in green, out red); holdings by outcome.
    const chipCol=isInc?'var(--accent)':isCash?(isSell?'var(--red)':'var(--green)'):(isSell?'var(--green)':'var(--blue)');
    const chipBg=isInc?'var(--accent-glow)':isCash?(isSell?'var(--red-bg)':'var(--green-bg)'):(isSell?'var(--green-bg)':'var(--blue-bg)');
    return `<tr style="cursor:pointer" onclick="openEditTx('${t.id}')"><td>${formatDate(t.date)}</td><td><span class="atype-chip" style="color:${chipCol};background:${chipBg}">${txTypeLabel(t)}</span></td>${qtyCell}${unitCell}${perCell}<td style="font-weight:800;color:${isInc?'var(--accent)':isSell?sellColor:'var(--text)'}">${fmt(t.amount)}${realizedSub}</td><td class="tx-note-cell" title="${t.notes?esc(t.notes):''}">${t.notes?`<span class="tx-note">${esc(t.notes)}</span>`:'<span class="muted">-</span>'}</td><td style="text-align:center"><button class="tx-edit-btn" onclick="event.stopPropagation();openEditTx('${t.id}')" aria-label="Edit transaction"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg></button></td></tr>`;}).join('');
  // The asset's maintained qty; same-day transactions have no reliable order to replay here.
  const netQty=+((a.qty||0).toFixed(6));
  totalBoughtQty=+totalBoughtQty.toFixed(6);
  // Build unit options for held-qty toggle (tola, gram, etc)
  const comm=a.commodityId?COMMODITIES.find(c=>c.id===a.commodityId):null;
  const unitOpts=comm?comm.unitOptions:null;
  const totalHeldId='totalHeld_'+a.id,netHeldId='netHeld_'+a.id;
  function qtyCell(id,q){
    return`<span id="${id}" data-base-qty="${q}" data-asset="${a.id}">${fmtQty(q,a)} ${baseUnit}</span>`;
  }
  const totalHeldCell=qtyCell(totalHeldId,totalBoughtQty);
  const netHeldCell=qtyCell(netHeldId,netQty);
  if(unitOpts&&unitOpts.length>1){
    setTimeout(()=>{
      const cur=(state.settings.lastTxHistUnit&&state.settings.lastTxHistUnit[a.id])?state.settings.lastTxHistUnit[a.id]:baseUnit;
      buildCustomSelect('txHistUnitWrap_'+a.id,unitOpts.map(u=>({value:u,label:u})),cur,v=>{
        switchNetHeldUnit(totalHeldId,totalBoughtQty,baseUnit,v);
        switchNetHeldUnit(netHeldId,netQty,baseUnit,v);
        if(!state.settings.lastTxHistUnit)state.settings.lastTxHistUnit={};
        state.settings.lastTxHistUnit[a.id]=v;saveState();
      });
      if(cur!==baseUnit){
        switchNetHeldUnit(totalHeldId,totalBoughtQty,baseUnit,cur);
        switchNetHeldUnit(netHeldId,netQty,baseUnit,cur);
      }
    },0);
  }
  // Value at time of buying (total cost of everything ever bought) vs value of what's left now
  const curPriceEach=getAssetCurrentPrice(a);
  const heldValue=curPriceEach!==null?curPriceEach*netQty:null;
  const unitHeaderCell=isCommodity?'<th>Unit</th>':'';
  const table=`<table class="atable tx-history-table${noQty?' tx-narrow':''}"><thead><tr><th>Date</th><th>Type</th>${noQty?'':'<th>Qty</th>'}${unitHeaderCell}${noQty?'':'<th>Amount/Qty</th>'}<th>${noQty?'Amount':'Total Amount'}</th><th>Notes</th><th></th></tr></thead><tbody>${rows}</tbody></table>`;
  // Summary sits outside the table so it wraps to the sheet width. Three shapes: cash,
  // property, unit holdings.
  const cells=isCash?[
    `<div class="tx-sum-cell"><span class="tx-summary-lbl">Paid in</span><span class="tx-summary-val" style="color:var(--green)">+${fmt(buyAmt)}</span></div>`,
    `<div class="tx-sum-cell"><span class="tx-summary-lbl">Taken out</span><span class="tx-summary-val" style="color:var(--red)">${sellAmt?'-'+fmt(sellAmt):fmt(0)}</span></div>`,
    `<div class="tx-sum-cell"><span class="tx-summary-lbl">Balance now</span><span class="tx-summary-val">${fmt(getAssetCurrentValue(a))}</span>${incomeAmt>0?`<span class="tx-summary-sub" style="color:var(--accent)">Interest ${fmt(incomeAmt)}</span>`:''}</div>`
  ]:noQty?[
    `<div class="tx-sum-cell"><span class="tx-summary-lbl">Paid in</span><span class="tx-summary-val">${fmt(buyAmt)}</span>${incomeAmt>0?`<span class="tx-summary-sub" style="color:var(--accent)">+${fmt(incomeAmt)} income</span>`:''}</div>`,
    `<div class="tx-sum-cell"><span class="tx-summary-lbl">Value now</span><span class="tx-summary-val">${fmt(getAssetCurrentValue(a))}</span></div>`,
    `<div class="tx-sum-cell"><span class="tx-summary-lbl">Unrealized P&amp;L</span><span class="tx-summary-val" style="color:${(getAssetPnL(a)||0)>0?'var(--green)':(getAssetPnL(a)||0)<0?'var(--red)':'var(--text)'}">${getAssetPnL(a)!==null?((getAssetPnL(a)>0?'+':'')+fmt(getAssetPnL(a))):'<span class="muted">-</span>'}</span></div>`,
    ...(sellAmt>0?[`<div class="tx-sum-cell"><span class="tx-summary-lbl">Sold for</span><span class="tx-summary-val">${fmt(sellAmt)}</span><span class="tx-summary-sub" style="color:${realizedPnl>0?'var(--green)':realizedPnl<0?'var(--red)':'var(--text3)'}">${(realizedPnl>0?'+':'')+fmt(realizedPnl)} realized</span></div>`]:[])
  ]:[
    `<div class="tx-sum-cell"><span class="tx-summary-lbl">Total Held</span><span class="tx-summary-val">${totalHeldCell}</span></div>`,
    `<div class="tx-sum-cell"><span class="tx-summary-lbl">Holding Now</span><span class="tx-summary-val">${netHeldCell}</span></div>`,
    `<div class="tx-sum-cell"><span class="tx-summary-lbl">Value Then</span><span class="tx-summary-val">${fmt(buyAmt)}</span>${incomeAmt>0?`<span class="tx-summary-sub" style="color:var(--accent)">+${fmt(incomeAmt)} income</span>`:''}</div>`,
    `<div class="tx-sum-cell"><span class="tx-summary-lbl">Value Now</span><span class="tx-summary-val">${heldValue!==null?fmt(heldValue):'<span class="muted">-</span>'}</span></div>`,
    `<div class="tx-sum-cell"><span class="tx-summary-lbl">Realized P&amp;L</span><span class="tx-summary-val" style="color:${realizedPnl>0?'var(--green)':realizedPnl<0?'var(--red)':'var(--text)'}">${realizedPnl!==0?(realizedPnl>0?'+':'')+fmt(realizedPnl):fmt(0)}</span>${(a.buyPrice||sellQtyTotal>0)?`<span class="tx-summary-sub">Avg buy ${fmt(a.buyPrice||0)}${sellQtyTotal>0?` &middot; sell ${fmt(sellAmt/sellQtyTotal)}`:''}</span>`:''}</div>`
  ];
  return `<div class="assets-table-wrap" style="margin:0">${table}</div>`
    +`<div class="tx-summary"><div class="tx-summary-grid">${cells.join('')}</div></div>`;}
function switchNetHeldUnit(spanId,baseQty,fromUnit,toUnit,btn){
  const span=document.getElementById(spanId);if(!span)return;
  const converted=convertUnit(baseQty,fromUnit,toUnit);
  // Decimals follow the value of the unit being switched to.
  const a=(state.assets||[]).find(x=>x.id===span.dataset.asset);
  const asUnit=a?Object.assign({},a,{unit:toUnit}):null;
  span.textContent=fmtQty(converted!=null?converted:baseQty,asUnit)+' '+toUnit;
  if(btn&&btn.closest){btn.closest('td').querySelectorAll('.net-held-unit-btn').forEach(b=>b.classList.remove('active-unit'));btn.classList.add('active-unit');}
}
function renderAssetsTable(target,assets){const tm={};ASSET_TYPES.forEach(t=>tm[t.id]=t);let tInv=0,tVal=0,tPnl=0;
  const rows=assets.map(a=>{const type=tm[a.category]||ASSET_TYPES[5];const cv=getAssetCurrentValue(a),pnl=getAssetPnL(a),pp=getAssetPnLPct(a);const inv=a.category==='liquidity'?(a.value||0):((a.buyPrice||0)*assetUnits(a));const cur=getAssetCurrentPrice(a);tInv+=inv;tVal+=cv;if(pnl!==null)tPnl+=pnl;const img=a.coinImage||'';
    const hold=assetNoQty(a)?'<span class="muted">-</span>':(a.qty?esc(qtyWithUnit(a)):'<span class="muted">-</span>');
    const avg=assetNoQty(a)?'<span class="muted">-</span>':(a.buyPrice?fmt(a.buyPrice):'<span class="muted">-</span>');
    const curC=cur!==null?fmt(cur):'<span class="muted">-</span>';
    const pnlCell=pnl===null?'<span class="muted">-</span>':`<span class="${pnl>=0?'pos':'neg'}">${pnl>=0?'+':''}${fmt(pnl)}${pp!==null?'<br><span style="font-size:10px;font-weight:600">('+(pp>=0?'+':'')+pp.toFixed(1)+'%)</span>':''}</span>`;
    return `<tr onclick="openAssetDetail('${a.id}')" data-asset-id="${a.id}" class="${isPendingSync('assets',a.id)?'unsynced':''}"><td><div class="atname"><div class="ai" style="background:${type.bg}">${img?`<img src="${img}" onerror="this.style.display='none'"/>`:`<span style="color:${readableInk(type.color)}">${svgIcon(a.icon||'coins',15)}</span>`}</div><span class="nm">${esc(a.name)}</span></div></td><td><span class="atype-chip" style="color:${readableInk(type.color)};background:${type.bg}">${catLabel(a.category)}</span></td><td>${hold}</td><td>${avg}</td><td>${curC}</td><td>${fmt(inv)}</td><td style="font-weight:800">${fmt(cv)}</td><td>${pnlCell}</td></tr>`;}).join('');
  const totPp=tInv>0?(tPnl/tInv*100):0;
  target.innerHTML=`<table class="atable"><thead><tr><th>Asset</th><th>Type</th><th>Holdings</th><th>Avg Buy</th><th>Current</th><th>Invested</th><th>Value</th><th>P&amp;L</th></tr></thead><tbody>${rows}</tbody><tfoot><tr><td>Total · ${assets.length}</td><td></td><td></td><td></td><td></td><td>${fmt(tInv)}</td><td>${fmt(tVal)}</td><td class="${tPnl>=0?'pos':'neg'}">${tPnl>=0?'+':''}${fmt(tPnl)} (${totPp>=0?'+':''}${totPp.toFixed(1)}%)</td></tr></tfoot></table>`;
  requestAnimationFrame(()=>initTableScrollFade('assetsTableWrap','assetsTableFade'));
  attachContextMenu(target,'tr[data-asset-id]',openAssetContextMenu);}

// DEBT DETAIL & PAYMENTS
let viewingDebtId=null;
// DEBT LEDGER
// Every lend and repayment is an editable entry; the debt's amount is the sum of its lends.
function debtLedger(d){
  if(!d)return [];
  if(!Array.isArray(d.lendHistory)||!d.lendHistory.length){
    d.lendHistory=[{id:uid(),amount:num(d.amount),note:d.note||null,
      date:d.lentDate||(d.date?String(d.date).split('T')[0]:todayStr()),
      account:null,linkId:null}];
  }
  return d.lendHistory;
}
function recalcDebtAmount(d){
  if(!d||!Array.isArray(d.lendHistory)||!d.lendHistory.length)return;
  d.amount=d.lendHistory.reduce((s,h)=>s+num(h&&h.amount),0);
}
// Give every debt its opening entry. Idempotent.
function migrateDebtLedgers(){
  (state.debts||[]).forEach(d=>{ if(d&&!(Array.isArray(d.lendHistory)&&d.lendHistory.length))debtLedger(d); });
}
// Lending takes money out of the account, repayment brings it back; borrowing mirrors both.
function debtCashDir(isOwed,kind){
  return kind==='pay' ? (isOwed?'in':'out') : (isOwed?'out':'in');
}
function debtLegNote(d,kind){
  const owed=d&&d.type==='owed',who=(d&&d.name)||'someone';
  if(kind==='pay')return owed?(who+' repaid'):('Repaid '+who);
  return owed?('Lent to '+who):('Borrowed from '+who);
}
function applyDebtCash(d,entry,kind){
  if(!d||!entry||!entry.account)return;
  const acct=(state.assets||[]).find(x=>x.id===entry.account);if(!acct)return;
  const dir=debtCashDir(d.type==='owed',kind),amt=num(entry.amount);
  if(!amt)return;
  if(!entry.linkId)entry.linkId=uid();
  applyCashLegBalance(acct,amt,dir);
  pushCashLeg(acct,amt,dir,entry.date||todayStr(),entry.linkId,debtLegNote(d,kind));
}
// Shared check: does the account have the money, and can it carry a leg at all.
function debtCashError(d,acct,amtN,kind){
  const blk=cashLegBlocked(acct);
  if(blk)return blk;
  if(acct&&debtCashDir(d&&d.type==='owed',kind)==='out'){
    const have=isStablecoin(acct)?getAssetCurrentValue(acct):num(acct.value);
    if(have+1e-9<amtN)return acct.name+' only has '+fmt(have);
  }
  return null;
}
function reverseDebtCash(d,entry,kind){
  if(!d||!entry||!entry.account||!entry.linkId)return;
  const acct=(state.assets||[]).find(x=>x.id===entry.account);
  const dir=debtCashDir(d.type==='owed',kind);
  if(acct)applyCashLegBalance(acct,num(entry.amount),dir==='in'?'out':'in');
  state.transactions=(state.transactions||[]).filter(t=>!(t.linkId===entry.linkId&&t.transfer));
  // Stablecoin balances live in the quantity; replay after removing the leg.
  if(acct&&isStablecoin(acct))recalcAssetFromTransactions(acct);
}
function openDebtDetail(id){
  const d=state.debts.find(x=>x.id===id);if(!d)return;
  viewingDebtId=id;
  el('debtDetailTitle').textContent=d.name;
  debtAddOpen=false;debtPayOpen=false;debtAddAcct=null;debtPayAcct=null;
  renderDebtDetailBody();
  openModal('debtDetailModal');
}
function openDebtDetailEdit(){closeModal('debtDetailModal',true);setTimeout(()=>openDebtEdit(viewingDebtId),200);}
// Same initials and colour for a person everywhere, derived from the name.
function debtInitials(name){
  const parts=String(name||'').trim().split(/\s+/).filter(Boolean);
  if(!parts.length)return '?';
  return parts.map(w=>w[0]).join('').toUpperCase().slice(0,2);
}
function debtHue(name){
  const t=String(name||'').trim().toLowerCase();
  let h=0;for(let i=0;i<t.length;i++)h=(h*31+t.charCodeAt(i))>>>0;
  return h%360;
}
const DTX_OUT='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>';
const DTX_IN='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="17" y1="7" x2="7" y2="17"/><polyline points="17 17 7 17 7 7"/></svg>';
const DTX_WALLET='<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2"/><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H5a2 2 0 0 1-2-2z"/><circle cx="17" cy="14" r="1.2"/></svg>';
// Newest first; same-day entries by insertion order.
function debtEntriesNewestFirst(list){
  return (list||[]).map((e,i)=>({e,i}))
    .sort((A,B)=>{const c=String(B.e&&B.e.date||'').localeCompare(String(A.e&&A.e.date||''));return c||(B.i-A.i);})
    .map(x=>x.e);
}
// Forms start folded so the history stays in view.
let debtAddOpen=false,debtPayOpen=false;
function toggleDebtAddForm(){debtAddOpen=!debtAddOpen;debtPayOpen=false;renderDebtDetailBody();haptic('tap');if(debtAddOpen)setTimeout(()=>{const f=el('debtAddAmt');if(f)f.focus();},60);}
function toggleDebtPayForm(){debtPayOpen=!debtPayOpen;debtAddOpen=false;renderDebtDetailBody();haptic('tap');if(debtPayOpen)setTimeout(()=>{const f=el('debtPayAmt');if(f)f.focus();},60);}
function renderDebtDetailBody(){
  const d=state.debts.find(x=>x.id===viewingDebtId);if(!d)return;
  const isOwed=d.type==='owed';
  const acc=calcAccrued(d);
  const payments=d.payments||[];
  const lendHistory=debtLedger(d);
  const totalPaid=payments.reduce((s,p)=>s+num(p&&p.amount),0);
  const totalLent=lendHistory.reduce((s,h)=>s+num(h&&h.amount),0);
  const remaining=Math.max(0,d.amount+acc-totalPaid);
  const paidPct=d.amount>0?Math.min(100,(totalPaid/(d.amount+acc))*100):0;
  const statusColor=isOwed?'var(--green)':'var(--red)';

  const av=el('debtDetailAvatar');
  if(av){av.textContent=debtInitials(d.name);av.style.setProperty('--dav-h',debtHue(d.name));}
  const sub=el('debtDetailSub');
  if(sub)sub.textContent=isOwed?'Owes you':'You owe';

  const acctName=e=>{const a=e&&e.account?(state.assets||[]).find(x=>x.id===e.account):null;return a?a.name:null;};
  // Colour follows the money's direction, not the entry kind.
  const entryRow=(e,kind)=>{
    const inward=debtCashDir(isOwed,kind)==='in';
    const col=inward?'var(--green)':'var(--red)';
    const tint=inward?'rgba(0,200,150,.14)':'rgba(255,77,106,.14)';
    const word=kind==='pay'?(isOwed?'Received':'Repaid'):(isOwed?'Lent':'Borrowed');
    const an=acctName(e);
    return `<button type="button" class="dtx" onclick="openDebtEntry('${jsAttr(d.id)}','${kind}','${jsAttr(e.id)}')" aria-label="${word} ${fmt(e.amount)} on ${esc(formatDate(e.date))}, edit">
      <span class="dtx-ico" style="background:${tint};color:${col}">${inward?DTX_IN:DTX_OUT}</span>
      <span class="dtx-main">
        <span class="dtx-top"><span class="dtx-ttl">${word}</span><span class="dtx-amt" style="color:${col}">${inward?'+':'−'}${fmt(e.amount)}</span></span>
        <span class="dtx-bot"><span class="dtx-date">${formatDate(e.date)}</span>${an?`<span class="dtx-acct">${DTX_WALLET}${esc(an)}</span>`:''}</span>
        ${e.note?`<span class="dtx-note">${esc(e.note)}</span>`:''}
      </span>
    </button>`;
  };
  const lendRows=debtEntriesNewestFirst(lendHistory).map(h=>entryRow(h,'lend')).join('');
  const payRows=debtEntriesNewestFirst(payments).map(p=>entryRow(p,'pay')).join('');

  const ICO_NOTE='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';
  const ICO_CAL='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
  const ICO_BOLT='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
  const _mid=new Date();_mid.setHours(0,0,0,0);
  const overdue=!!(d.due&&parseDay(d.due)<_mid);
  const chips=[];
  if(d.note)chips.push(`<span class="dmeta-chip">${ICO_NOTE}<span>${esc(d.note)}</span></span>`);
  if(d.due)chips.push(`<span class="dmeta-chip${overdue?' over':''}">${ICO_CAL}<span>${overdue?'Overdue':'Due'} ${formatDate(d.due)}</span></span>`);
  if(acc>0)chips.push(`<span class="dmeta-chip accent" title="${esc(accruedBasis(d)||'')}">${ICO_BOLT}<span>${fmt(acc)} interest</span></span>`);

  const addForm=`
      <div class="form-row-2">
        <div><label class="form-lbl" for="debtAddAmt">AMOUNT (${currentCurrency.code})</label>
          <input class="form-input" id="debtAddAmt" type="number" placeholder="0.00" step="any" inputmode="decimal"/></div>
        <div><label class="form-lbl" for="debtAddDate">DATE</label>
          <input class="form-input" id="debtAddDate" type="date" value="${todayStr()}"/></div>
      </div>
      <input class="form-input" id="debtAddNote" type="text" placeholder="Reason (optional)" style="margin-bottom:8px"/>
      <label class="form-lbl" id="debtAddAcctLbl">${isOwed?'PAID FROM':'RECEIVED INTO'}</label>
      <div id="debtAddAcctWrap" class="custom-select-wrap" style="margin-bottom:10px"></div>
      <div class="dcard-acts">
        <button type="button" class="ghost-btn" onclick="toggleDebtAddForm()">Cancel</button>
        <button type="button" class="submit-btn" onclick="recordDebtAddition()">${isOwed?'Record lend':'Record borrow'}</button>
      </div>`;
  const payForm=`
      <div class="form-row-2">
        <div><label class="form-lbl" for="debtPayAmt">AMOUNT (${currentCurrency.code})</label>
          <input class="form-input" id="debtPayAmt" type="number" placeholder="0.00" step="any" inputmode="decimal"/></div>
        <div><label class="form-lbl" for="debtPayDate">DATE</label>
          <input class="form-input" id="debtPayDate" type="date" value="${todayStr()}"/></div>
      </div>
      <input class="form-input" id="debtPayNote" type="text" placeholder="Note (optional)" style="margin-bottom:8px"/>
      <label class="form-lbl" id="debtPayAcctLbl">${isOwed?'RECEIVED INTO':'PAID FROM'}</label>
      <div id="debtPayAcctWrap" class="custom-select-wrap" style="margin-bottom:10px"></div>
      <div class="dcard-acts">
        <button type="button" class="ghost-btn" onclick="toggleDebtPayForm()">Cancel</button>
        <button type="button" class="submit-btn" style="background:var(--green);box-shadow:none;color:#04150f" onclick="recordDebtPayment()">${isOwed?'Record received':'Record repayment'}</button>
      </div>`;

  el('debtDetailBody').innerHTML=`
    <div class="dcard" style="padding:13px;margin-bottom:12px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
        <div class="d-stat"><div class="d-stat-lbl">${isOwed?'OWED TO YOU':'YOU OWE'}</div><div class="d-stat-val" style="color:${statusColor}">${fmt(d.amount+(acc||0))}</div></div>
        <div class="d-stat"><div class="d-stat-lbl">REMAINING</div><div class="d-stat-val" style="color:${statusColor}">${fmt(remaining)}</div></div>
        <div class="d-stat"><div class="d-stat-lbl">TOTAL PAID</div><div class="d-stat-val" style="color:var(--green)">${fmt(totalPaid)}</div></div>
        <div class="d-stat"><div class="d-stat-lbl">PROGRESS</div><div class="d-stat-val">${paidPct.toFixed(0)}%</div></div>
      </div>
      ${d.amount>0?`<div class="dprog"><div class="dprog-fill" style="width:${paidPct}%"></div></div>`:''}
      ${chips.length?`<div class="dmeta">${chips.join('')}</div>`:''}
    </div>

    <section class="dcard">
      <div class="dcard-hd">
        <div class="dcard-ttl">${isOwed?'LENT OUT':'BORROWED'}</div>
        <div class="dcard-sum">${fmt(totalLent)}${lendHistory.length>1?` &middot; ${lendHistory.length} entries`:''}</div>
      </div>
      <div class="dcard-bd">${lendRows||`<div class="dtx-empty">Nothing recorded yet</div>`}</div>
      <div class="dcard-ft">${debtAddOpen?addForm:`<button type="button" class="ghost-btn ${debtCashDir(isOwed,'lend')==='in'?'gb-in':'gb-out'}" onclick="toggleDebtAddForm()">+ ${isOwed?'Lend more':'Borrow more'}</button>`}</div>
    </section>

    <section class="dcard">
      <div class="dcard-hd">
        <div class="dcard-ttl">REPAYMENTS</div>
        <div class="dcard-sum">${fmt(totalPaid)}${payments.length>1?` &middot; ${payments.length} entries`:''}</div>
      </div>
      <div class="dcard-bd">${payRows||`<div class="dtx-empty">${isOwed?'Nothing paid back yet':'You have not repaid any of this yet'}</div>`}</div>
      <div class="dcard-ft">${debtPayOpen?payForm:`<button type="button" class="ghost-btn ${debtCashDir(isOwed,'pay')==='in'?'gb-in':'gb-out'}" onclick="toggleDebtPayForm()">+ ${isOwed?'Record a payment received':'Record a repayment'}</button>`}</div>
    </section>
  `;
  buildDebtAcctSelect('debtAddAcctWrap','lend',undefined,undefined,debtCashDir(isOwed,'lend')==='in');
  buildDebtAcctSelect('debtPayAcctWrap','pay',undefined,undefined,debtCashDir(isOwed,'pay')==='in');
}
// Null until picked (CASH_NONE is declared later; referencing it here would hit the TDZ).
let debtAddAcct=null,debtPayAcct=null;
function debtAcctOptions(dirIn){
  const opts=cashAccounts().map(a=>({value:a.id,label:a.name+' · '+fmt(a.value||0)}));
  opts.push({value:CASH_NONE,label:dirIn?'Did not land in a tracked account':'Not from a tracked account'});
  return opts;
}
function buildDebtAcctSelect(wrapId,kind,current,onPick,dirIn){
  const wrap=el(wrapId);if(!wrap)return;
  const opts=debtAcctOptions(dirIn);
  let cur=current!==undefined?current:(kind==='pay'?debtPayAcct:debtAddAcct);
  if(!cur||!opts.some(o=>o.value===cur))cur=CASH_NONE;
  if(current===undefined){ if(kind==='pay')debtPayAcct=cur; else debtAddAcct=cur; }
  buildCustomSelect(wrapId,opts,cur,v=>{
    if(onPick)onPick(v);
    else if(kind==='pay')debtPayAcct=v; else debtAddAcct=v;
  });
}
function recordDebtPayment(){
  const d=state.debts.find(x=>x.id===viewingDebtId);if(!d)return;
  const rate=getCurrRate(currentCurrency.code);
  const amt=parseFloat(el('debtPayAmt').value)||0;
  if(!amt||amt<0){toast(amt<0?'Amount cannot be negative':'Enter an amount','error');return;}
  const acc=calcAccrued(d),totalPaid=(d.payments||[]).reduce((s,p)=>s+p.amount,0);
  const remaining=d.amount+acc-totalPaid;
  if(amt/rate>remaining+0.001){toast('Cannot exceed remaining '+fmt(remaining),'error');return;}
  if(!d.payments)d.payments=[];
  const payAcct=(debtPayAcct&&debtPayAcct!==CASH_NONE)?resolveCashAccount(debtPayAcct):null;
  {const err=debtCashError(d,payAcct,amt/rate,'pay');if(err){toast(err,'error');return;}}
  const payEntry={id:uid(),amount:amt/rate,date:el('debtPayDate').value||todayStr(),
    note:el('debtPayNote').value.trim()||null,account:payAcct?payAcct.id:null,linkId:null};
  d.payments.push(payEntry);
  applyDebtCash(d,payEntry,'pay');
  debtPayOpen=false;debtPayAcct=null;
  saveState();renderAll();renderDebtDetailBody();
  haptic('success');toast('Payment recorded'+(payAcct?(debtCashDir(d.type==='owed','pay')==='in'?', into ':', from ')+payAcct.name:''),'success');
}
function recordDebtAddition(){
  const d=state.debts.find(x=>x.id===viewingDebtId);if(!d)return;
  const rate=getCurrRate(currentCurrency.code);
  const amt=parseFloat(el('debtAddAmt').value)||0;
  if(!amt||amt<0){toast(amt<0?'Amount cannot be negative':'Enter an amount','error');return;}
  const amtN=amt/rate;
  const dateVal=el('debtAddDate').value||todayStr();
  const noteVal=el('debtAddNote').value.trim();
  debtLedger(d);
  const addAcct=(debtAddAcct&&debtAddAcct!==CASH_NONE)?resolveCashAccount(debtAddAcct):null;
  {const err=debtCashError(d,addAcct,amtN,'lend');if(err){toast(err,'error');return;}}
  const lendEntry={id:uid(),amount:amtN,note:noteVal||null,date:dateVal,
    account:addAcct?addAcct.id:null,linkId:null};
  d.lendHistory.push(lendEntry);
  applyDebtCash(d,lendEntry,'lend');
  recalcDebtAmount(d);
  debtAddOpen=false;debtAddAcct=null;
  saveState();renderAll();renderDebtDetailBody();
  haptic('success');toast((d.type==='owed'?'Lend':'Borrow')+' recorded','success');
}
// EDITING ONE ENTRY
// Editing an amount re-derives the debt's total; any cash it moved is reversed first,
// then re-applied.
let editingDebtEntry=null;   // {debtId, kind, id}
let debtEntryAcct=null;
function debtEntryList(d,kind){ return kind==='pay'?(d.payments||[]):debtLedger(d); }
function openDebtEntry(debtId,kind,entryId){
  const d=(state.debts||[]).find(x=>x.id===debtId);if(!d)return;
  const e=debtEntryList(d,kind).find(x=>x&&x.id===entryId);if(!e)return;
  editingDebtEntry={debtId,kind,id:entryId};
  const owed=d.type==='owed',paying=kind==='pay';
  el('debtEntryTitle').textContent=paying?(owed?'Payment Received':'Payment Made'):(owed?'Money Lent':'Money Borrowed');
  const dir=debtCashDir(owed,kind);
  el('debtEntryAcctLbl').textContent=dir==='in'?'RECEIVED INTO':'PAID FROM';
  el('debtEntryAcctHint').textContent=dir==='in'
    ? 'Where this money landed. Change it and the balances follow.'
    : 'Where this money came from. Change it and the balances follow.';
  el('debtEntryHint').textContent=paying
    ? 'Correcting this changes what is still outstanding.'
    : 'The debt\u2019s total is the sum of its entries, so correcting this corrects the total.';
  resetMoneyCcy(['debtEntryAmt']);
  bindMoneyCcy('debtEntryAmt','debtEntryAmtCcyWrap');
  setMoneyField('debtEntryAmt',num(e.amount));
  el('debtEntryDate').value=e.date||todayStr();
  el('debtEntryNote').value=e.note||'';
  debtEntryAcct=e.account||CASH_NONE;
  buildDebtAcctSelect('debtEntryAcctWrap',kind,debtEntryAcct,v=>{debtEntryAcct=v;},dir==='in');
  // The only lend is the debt itself; delete the debt instead.
  const solo=kind==='lend'&&debtLedger(d).length<2;
  const del=el('debtEntryDeleteBtn');
  del.style.display=solo?'none':'';
  openModal('debtEntryModal');
}
function saveDebtEntry(){
  if(!editingDebtEntry)return;
  const {debtId,kind,id}=editingDebtEntry;
  const d=(state.debts||[]).find(x=>x.id===debtId);if(!d)return;
  const list=debtEntryList(d,kind);
  const e=list.find(x=>x&&x.id===id);if(!e)return;
  const amt=moneyBase('debtEntryAmt');
  if(isNaN(amt)||amt<=0){toast('Enter an amount','error');return;}
  const acct=(debtEntryAcct&&debtEntryAcct!==CASH_NONE)?resolveCashAccount(debtEntryAcct):null;
  {const blk=cashLegBlocked(acct);if(blk){toast(blk,'error');return;}}
  // Reverse the old movement first so checks see the balance without this entry.
  reverseDebtCash(d,e,kind);
  {const err=debtCashError(d,acct,amt,kind);
   if(err){applyDebtCash(d,e,kind);toast(err,'error');return;}}
  e.amount=amt;
  e.date=el('debtEntryDate').value||e.date||todayStr();
  e.note=el('debtEntryNote').value.trim()||null;
  e.account=acct?acct.id:null;
  e.linkId=acct?(e.linkId||uid()):null;
  applyDebtCash(d,e,kind);
  if(kind==='lend')recalcDebtAmount(d);
  editingDebtEntry=null;
  saveState();closeModal('debtEntryModal');renderAll();renderDebtDetailBody();
  haptic('success');toast('Entry updated','success');
}
async function deleteDebtEntry(){
  if(!editingDebtEntry)return;
  const {debtId,kind,id}=editingDebtEntry;
  const d=(state.debts||[]).find(x=>x.id===debtId);if(!d)return;
  const list=debtEntryList(d,kind);
  const e=list.find(x=>x&&x.id===id);if(!e)return;
  const acct=e.account?(state.assets||[]).find(a=>a.id===e.account):null;
  const dir=debtCashDir(d.type==='owed',kind);
  let msg=kind==='pay'
    ? 'The outstanding balance on this debt will go back up by this amount.'
    : 'This will come off the debt\u2019s total.';
  if(acct&&!isStablecoin(acct)){
    const after=num(acct.value)+(dir==='in'?-num(e.amount):num(e.amount));
    msg+=' '+acct.name+' goes '+(after>=0?'back to ':'to ')+fmt(after)+'.';
  }
  if(!await askConfirm({title:'Delete entry?',message:msg,confirmText:'Delete'}))return;
  withUndo('Entry deleted',['debts','assets','transactions'],()=>{
    reverseDebtCash(d,e,kind);
    if(kind==='pay')d.payments=(d.payments||[]).filter(p=>p.id!==id);
    else {d.lendHistory=(d.lendHistory||[]).filter(h=>h.id!==id);recalcDebtAmount(d);}
    saveState();
  });
  editingDebtEntry=null;
  closeModal('debtEntryModal');renderAll();renderDebtDetailBody();
  haptic('tap');
}
async function deleteDebtPayment(debtId,payId){
  if(!await askConfirm({title:'Delete payment?',message:'The outstanding balance on this debt will go back up by this amount.',confirmText:'Delete'}))return;
  const d=state.debts.find(x=>x.id===debtId);if(!d||!d.payments)return;
  d.payments=d.payments.filter(p=>p.id!==payId);
  saveState();renderAll();renderDebtDetailBody();
  haptic('tap');toast('Payment deleted');
}
// DEBTS
function onDebtSearch(){debtQuery=el('debtSearch').value.trim().toLowerCase();renderDebts();}
function onGoalSearch(){goalQuery=el('goalSearch').value.trim().toLowerCase();renderPlan();}
function cycleGoalSort(){const i=GOAL_SORTS.indexOf(goalSort);goalSort=GOAL_SORTS[(i+1)%GOAL_SORTS.length];state.settings.goalSort=goalSort;saveState();el('goalSortLbl').textContent=GOAL_SORT_LBL[goalSort];haptic('tap');renderPlan();}
function renderDebts(){const owed=state.debts.filter(d=>d.type==='owed'),iowe=state.debts.filter(d=>d.type==='iowe');
  const rate=getCurrRate(currentCurrency.code);
  const to=owed.reduce((s,d)=>s+debtRemaining(d),0),ti=iowe.reduce((s,d)=>s+debtRemaining(d),0);
  const accOwed=0,accIOwe=0;// already included in debtRemaining
  el('debtOwedTotal').textContent=fmt(to);
  el('debtIOweTotal').textContent=fmt(ti);
  const net=to-ti;el('debtNet').textContent=fmt(Math.abs(net+accOwed-accIOwe));
  el('debtNet').className='debt-sum-val '+(net>=0?'green':'red');
  const ownedIntEl=el('debtOwedInterest');const iOweIntEl=el('debtIOweInterest');
  if(ownedIntEl)ownedIntEl.textContent=accOwed>0?`+${fmt(accOwed)} interest`:'';
  if(iOweIntEl)iOweIntEl.textContent=accIOwe>0?`+${fmt(accIOwe)} interest`:'';
  // Overdue banner
  const today=new Date();today.setHours(0,0,0,0);
  const overdueDebts=state.debts.filter(d=>d.due&&parseDay(d.due)<today);
  const banner=el('debtOverdueBanner');const bannerTxt=el('debtOverdueTxt');
  if(banner){if(overdueDebts.length){banner.style.display='flex';bannerTxt.textContent=`${overdueDebts.length} overdue debt${overdueDebts.length>1?'s':''}, total ${fmt(overdueDebts.reduce((s,d)=>s+d.amount+calcAccrued(d),0))}`;}else{banner.style.display='none';}}
  // Insights strip
  const allDebts=state.debts;const strip=el('debtInsightsStrip');const insEl=el('debtInsights');
  if(strip&&insEl&&allDebts.length){const chips=[];
    const totalAccruing=allDebts.filter(d=>d.interest&&d.interest.enabled).reduce((s,d)=>s+calcAccrued(d),0);
    if(totalAccruing>0)chips.push(`<div class="chip"><div class="chip-ico" style="background:rgba(245,166,35,.15);color:var(--accent)">${svgIcon('zap',14)}</div><div class="chip-txt"><span class="chip-lbl">Total Accrued</span><span class="chip-val">${fmt(totalAccruing)}</span></div></div>`);
    const withInterest=allDebts.filter(d=>d.interest&&d.interest.enabled).length;
    if(withInterest>0)chips.push(`<div class="chip"><div class="chip-ico" style="background:rgba(90,166,255,.15);color:var(--blue)">${svgIcon('trending',14)}</div><div class="chip-txt"><span class="chip-lbl">With Interest</span><span class="chip-val">${withInterest} debt${withInterest>1?'s':''}</span></div></div>`);
    const noDue=allDebts.filter(d=>!d.due).length;
    if(noDue>0)chips.push(`<div class="chip"><div class="chip-ico" style="background:rgba(128,128,128,.12);color:var(--text3)">${svgIcon('clock',14)}</div><div class="chip-txt"><span class="chip-lbl">No Due Date</span><span class="chip-val">${noDue} debt${noDue>1?'s':''}</span></div></div>`);
    const highest=allDebts.reduce((best,d)=>{const a=calcAccrued(d);return a>(calcAccrued(best)||0)?d:best;},allDebts[0]);
    if(highest&&calcAccrued(highest)>0)chips.push(`<div class="chip"><div class="chip-ico" style="background:rgba(255,91,117,.15);color:var(--red)">${svgIcon('alert',14)}</div><div class="chip-txt"><span class="chip-lbl">Most Interest</span><span class="chip-val">${esc(highest.name?.slice(0,10)||'')}</span></div></div>`);
    if(chips.length){strip.style.display='block';insEl.innerHTML=chips.join('');}else strip.style.display='none';
  } else if(strip) strip.style.display='none';

  let list=activeDebtTab==='owed'?owed:iowe;const isOwed=activeDebtTab==='owed';if(debtQuery)list=list.filter(d=>(d.name||'').toLowerCase().includes(debtQuery)||(d.note||'').toLowerCase().includes(debtQuery));
  const dl=el('debtList');if(!list.length){dl.innerHTML=debtQuery?`<div class="empty-state"><div class="empty-ico">${svgIcon('coins',30)}</div><h3>No matches</h3><p>No debts match "${esc(debtQuery)}".</p></div>`:`<div class="empty-state"><div class="empty-ico">${svgIcon(isOwed?'trending':'coins',30)}</div><h3>${isOwed?'No one owes you':"You don't owe anyone"}</h3><p>${isOwed?'Track money lent to friends, family or clients with optional interest.':'Keep tabs on loans and dues so nothing slips.'}</p><button class="empty-cta" onclick="openAddDebt()">${svgIcon('zap',14)} Record a debt</button></div>`;return;}
  const sorted=sortDebts(list.filter(d=>!debtQuery||d.name?.toLowerCase().includes(debtQuery)||d.note?.toLowerCase().includes(debtQuery)));dl.innerHTML=sorted.map((d,i)=>{const over=d.due&&parseDay(d.due)<today,ini=debtInitials(d.name),acc=calcAccrued(d);
    // Status beside the name, the rest on one meta line.
    const duePill=d.due
      ? (over?`<span class="debt-pill over">OVERDUE ${formatDate(d.due)}</span>`
             :`<span class="debt-pill">Due ${formatDate(d.due)}</span>`)
      : '';
    const metaBits=[];
    if(d.note)metaBits.push(esc(d.note));
    if(d.lentDate)metaBits.push('Lent '+formatDate(d.lentDate));
    const metaHtml=metaBits.join(' &middot; ')||'&nbsp;';
    const subBits=[];
    const accHtml=acc?`<span style="color:var(--accent)">+${fmt(acc)} interest</span>`:'';
    const totalPaid=(d.payments||[]).reduce((s,p)=>s+p.amount,0);const remaining=Math.max(0,d.amount+(acc||0)-totalPaid);const paidBadge=totalPaid>0?`<span style="color:var(--green)">Paid ${fmt(totalPaid)}</span>`:'';return `<div class="debt-item${enterCls()}${isPendingSync('debts',d.id)?' unsynced':''}" style="animation-delay:${_animateEnter?Math.min(i,12)*35:0}ms" role="button" tabindex="0" data-debt-id="${d.id}" onclick="openDebtDetail('${d.id}')" aria-label="${esc(d.name)}, ${fmt(remaining)}">${isPendingSync('debts',d.id)?pendingBadge():''}<div class="debt-avatar" style="--dav-h:${debtHue(d.name)}">${esc(ini)}</div><div class="debt-info"><div class="debt-name-row"><span class="debt-name">${esc(d.name)}</span>${d.interest&&d.interest.enabled?`<span class="debt-int-badge">${d.interest.type==='pct'?d.interest.rate+'%/'+freqShort(d.interest.freq):'Flat'}</span>`:''}${duePill}</div><div class="debt-note">${metaHtml}</div></div><div class="debt-vals"><div class="debt-val ${isOwed?'grn':'rd'}">${fmt(remaining)}</div><div class="debt-due">${[paidBadge,accHtml].filter(Boolean).join('')}</div></div></div>`;}).join('');
  attachContextMenu(dl,'.debt-item',openDebtContextMenu);}
// Interest on the balance actually outstanding over each stretch: lends and repayments
// form one dated timeline. A settled debt stops accruing until more is lent.
function accruedBasis(d){
  if(!d||!d.interest||!d.interest.enabled)return '';
  const moves=((d.payments||[]).filter(p=>p&&num(p.amount)>0).length)
    +((d.lendHistory||[]).filter(h=>h&&num(h.amount)>0).length>1?1:0);
  if(!moves)return '';
  const paid=(d.payments||[]).reduce((x,p)=>x+num(p&&p.amount),0);
  const bal=Math.max(0,num(d.amount)-paid);
  if(bal<=0)return 'Stopped when the balance reached zero';
  return 'Charged on the balance as it changed, now '+fmt(bal)+', not the full '+fmt(num(d.amount));
}
function calcAccrued(d,asOf){
  if(!d||!d.interest||!d.interest.enabled)return 0;
  const lentD=d.lentDate?parseDay(d.lentDate):new Date(d.date);
  const startDate=(d.interest.chargeFrom==='due'&&d.due)?parseDay(d.due):lentD;
  const now=asOf?new Date(asOf):new Date();
  if(isNaN(startDate)||now<=startDate)return 0;
  const type=d.interest.type;
  if(type!=='flat'&&type!=='pct')return 0;
  const per={day:365,week:52,month:12,year:1}[d.interest.freq||'month']||12;
  const periodDays=365/per;
  const flat=parseFloat(d.interest.flatAmount)||0;
  const rate=(parseFloat(d.interest.rate)||0)/100;

  // lendHistory is the breakdown only when it sums to d.amount; otherwise the whole
  // amount counts from the start.
  const lends=(d.lendHistory||[]).filter(h=>h&&num(h.amount)>0)
    .map(h=>({t:h.date?parseDay(h.date):lentD,delta:num(h.amount)}))
    .filter(h=>!isNaN(h.t));
  const lendSum=lends.reduce((x,h)=>x+h.delta,0);
  const opens=(lends.length&&Math.abs(lendSum-num(d.amount))<0.01)
    ? lends : [{t:startDate,delta:num(d.amount)}];
  const events=opens.concat((d.payments||[]).filter(p=>p&&num(p.amount)>0)
      .map(p=>({t:p.date?parseDay(p.date):startDate,delta:-num(p.amount)}))
      .filter(p=>!isNaN(p.t)))
    .sort((a,b)=>a.t-b.t);

  let principal=0,accrued=0,cursor=startDate;
  const settle=()=>{ if(principal<1e-9)principal=0; };
  // Everything up to the start date is the opening balance.
  events.forEach(e=>{ if(e.t<=startDate)principal+=e.delta; });
  settle();
  const charge=(from,to,bal)=>{
    if(bal<=0||to<=from)return;
    const periods=((to-from)/864e5)/periodDays;
    if(type==='flat'){ accrued+=flat*periods; return; }
    if(d.interest.compound){ accrued+=bal*(Math.pow(1+rate,periods)-1); return; }
    accrued+=bal*rate*periods;
  };
  for(const e of events){
    if(e.t<=startDate)continue;
    // Future-dated entries have not happened yet.
    if(e.t>=now)break;
    charge(cursor,e.t,principal);
    cursor=e.t;
    principal+=e.delta;
    settle();
  }
  charge(cursor,now,principal);
  return accrued;
}
const DEBT_SORTS=['amount','due','interest','name'];
const DEBT_SORT_LBL={amount:'Amount',due:'Due Date',interest:'Interest',name:'Name'};
function cycleDebtSort(){const i=DEBT_SORTS.indexOf(debtSort);debtSort=DEBT_SORTS[(i+1)%DEBT_SORTS.length];state.settings.debtSort=debtSort;saveState();el('debtSortLbl').textContent=DEBT_SORT_LBL[debtSort];haptic('tap');renderDebts();}
function sortDebts(list){return [...list].sort((a,b)=>{if(debtSort==='amount')return (b.amount+calcAccrued(b))-(a.amount+calcAccrued(a));if(debtSort==='due'){if(!a.due&&!b.due)return 0;if(!a.due)return 1;if(!b.due)return -1;return new Date(a.due)-new Date(b.due);}if(debtSort==='interest')return calcAccrued(b)-calcAccrued(a);return (a.name||'').localeCompare(b.name||'');});}
function setDebtTab(tab){activeDebtTab=tab;state.settings.activeDebtTab=tab;saveState();haptic('tap');el('dTabOwed').className='d-tab'+(tab==='owed'?' active grn':'');el('dTabIOwe').className='d-tab'+(tab==='iowe'?' active rd':'');renderDebts();}
// HABIT TRACKER
// Stored in state.settings so it syncs with the settings blob.
//   habits:   [{id,name,color,goal}]   goal = times per month
//   habitLog: { habitId: { 'YYYY-MM-DD': 1 } }
const HABIT_COLORS = ['#f5a623','#16d6a4','#4a9eff','#a78bfa','#ff7b3a','#ff5b75','#ffd700','#00d4c8'];
let habitMonth = null;

function habits(){ if(!state.settings.habits) state.settings.habits=[]; return state.settings.habits; }
function habitLog(){ if(!state.settings.habitLog) state.settings.habitLog={}; return state.settings.habitLog; }
function dayKey(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function habitDone(id,key){ const l=habitLog()[id]; return !!(l&&l[key]); }
function habitMonthAnchor(){ if(!habitMonth){const n=new Date();habitMonth=new Date(n.getFullYear(),n.getMonth(),1);} return habitMonth; }
// Older habits stored `target` as days-per-week; read it as a monthly goal.
function habitGoal(h,daysInMonth){
  if(h.goal!=null) return Math.max(1,Math.min(daysInMonth,h.goal));
  if(h.target!=null) return Math.max(1,Math.min(daysInMonth,Math.round(h.target/7*daysInMonth)));
  return daysInMonth;
}

// Ticks allowed up to this many days back.
const HABIT_BACKFILL_DAYS = 7;
function habitDayAge(key){
  const d=new Date(key+'T12:00:00');
  if(isNaN(d))return 0;
  const today=new Date();today.setHours(12,0,0,0);
  return Math.round((today-d)/864e5);
}
function habitEditable(key){
  const age=habitDayAge(key);
  return age>=0 && age<=HABIT_BACKFILL_DAYS;
}
function toggleHabit(id,key){
  if(!habitEditable(key)){
    const age=habitDayAge(key);
    toast(age<0?'That day has not happened yet'
      :'Locked after '+HABIT_BACKFILL_DAYS+' days, so the record stays honest','error');
    haptic('error');
    return;
  }
  const log=habitLog();
  if(!log[id]) log[id]={};
  const nowOn=!log[id][key];
  if(log[id][key]) delete log[id][key]; else log[id][key]=1;
  saveState(); haptic(nowOn?'success':'tap');
  // Keep the scroll position after a tick.
  renderHabits({keepScroll:true});
  // The grid is rebuilt, so replay the pop on the changed cell.
  const cell=document.querySelector('.hb-cell[data-habit="'+CSS.escape(id)+'"][data-key="'+CSS.escape(key)+'"]');
  if(cell&&!state.settings.reduceMotion){
    cell.classList.add(nowOn?'hb-pop':'hb-unpop');
    setTimeout(()=>cell.classList.remove('hb-pop','hb-unpop'),420);
  }
  // All habits done for the day.
  if(nowOn)habitDayCelebration(key,cell);
}
// Light the column and buzz; deliberately quiet.
function habitDayCelebration(key,cell){
  const list=(state.settings.habits||[]).filter(h=>h&&h.id);
  if(list.length<2)return;
  if(!list.every(h=>habitDone(h.id,key)))return;
  haptic('success');
  if(state.settings.reduceMotion)return;
  const col=[...document.querySelectorAll('.hb-cell[data-key="'+CSS.escape(key)+'"]')];
  col.forEach((c,i)=>{
    c.style.animationDelay=(i*45)+'ms';
    c.classList.add('hb-allday');
    setTimeout(()=>{c.classList.remove('hb-allday');c.style.animationDelay='';},700+i*45);
  });
  const tot=document.querySelectorAll('.hb-total-row .hb-tot')[Math.max(0,(+key.slice(-2))-1)];
  if(tot){tot.classList.add('hb-allday-tot');setTimeout(()=>tot.classList.remove('hb-allday-tot'),900);}
}
// Habits keep the order you put them in.
function moveHabit(id,dir){
  const list=state.settings.habits||[];
  const i=list.findIndex(h=>h.id===id);
  const j=i+dir;
  if(i<0||j<0||j>=list.length)return;
  [list[i],list[j]]=[list[j],list[i]];
  saveState();haptic('tap');renderHabits({keepScroll:true});
  // Keep focus on the moved row.
  const n=document.querySelector('.hb-row[data-hid="'+CSS.escape(id)+'"] .hb-name-cell');
  if(n)n.focus();
}
// Alt+Up/Down reorders from the keyboard.
function habitNameKey(e,id){
  if(!e.altKey)return;
  if(e.key==='ArrowUp'){e.preventDefault();e.stopPropagation();moveHabit(id,-1);}
  else if(e.key==='ArrowDown'){e.preventDefault();e.stopPropagation();moveHabit(id,1);}
}

// Reorder by press-and-hold then drag; a plain drag scrolls the month.
const HB_HOLD_MS=340, HB_HOLD_SLOP=9;
let _hbDrag=null, _hbDragged=false;
function bindHabitReorder(wrap){
  if(!wrap||wrap._reorderBound)return;
  wrap._reorderBound=true;
  wrap.addEventListener('pointerdown',e=>{
    if(e.button)return;
    const cell=e.target.closest&&e.target.closest('.hb-name-cell');
    if(!cell)return;
    const row=cell.closest('.hb-row[data-hid]');
    if(!row||habits().length<2||_hbDrag)return;
    const sx=e.clientX, sy=e.clientY, pid=e.pointerId;
    let timer=0;
    const stop=()=>{ clearTimeout(timer);
      window.removeEventListener('pointermove',pre);
      window.removeEventListener('pointerup',stop);
      window.removeEventListener('pointercancel',stop); };
    const pre=ev=>{ if(ev.pointerId!==pid)return;
      // Moved before the hold finished, so it was a scroll or a swipe.
      if(Math.abs(ev.clientY-sy)>HB_HOLD_SLOP||Math.abs(ev.clientX-sx)>HB_HOLD_SLOP)stop(); };
    window.addEventListener('pointermove',pre);
    window.addEventListener('pointerup',stop);
    window.addEventListener('pointercancel',stop);
    timer=setTimeout(()=>{ stop(); startHabitDrag(row,sy,pid); },HB_HOLD_MS);
  });
}
const hbBlockTouch=e=>{ if(_hbDrag&&e.cancelable)e.preventDefault(); };
function startHabitDrag(row,startY,pid){
  const wrap=el('habitBody'); if(!wrap)return;
  const rows=[...wrap.querySelectorAll('.hb-row[data-hid]')];
  const from=rows.indexOf(row);
  const h=row.offsetHeight||34;
  if(from<0||rows.length<2)return;
  _hbDrag={rows,row,from,to:from,h,startY,pid};
  haptic('success');
  document.body.classList.add('hb-reordering');
  row.classList.add('hb-drag');
  rows.forEach(r=>{ if(r!==row) r.classList.add('hb-shift'); });
  window.addEventListener('pointermove',hbDragMove,{passive:false});
  window.addEventListener('pointerup',hbDragEnd);
  window.addEventListener('pointercancel',hbDragEnd);
  window.addEventListener('touchmove',hbBlockTouch,{passive:false});
}
function hbDragMove(e){
  const d=_hbDrag; if(!d||e.pointerId!==d.pid)return;
  // Still cancellable because the finger stayed still through the hold.
  if(e.cancelable)e.preventDefault();
  const dy=Math.max(-d.from*d.h,Math.min((d.rows.length-1-d.from)*d.h,e.clientY-d.startY));
  d.row.style.transform='translate3d(0,'+dy.toFixed(1)+'px,0)';
  const to=Math.max(0,Math.min(d.rows.length-1,d.from+Math.round(dy/d.h)));
  if(to!==d.to){ d.to=to; haptic('tap'); }
  // Rows between origin and target shift by one row.
  d.rows.forEach((r,i)=>{
    if(r===d.row)return;
    let shift=0;
    if(d.to>d.from&&i>d.from&&i<=d.to)shift=-d.h;
    else if(d.to<d.from&&i>=d.to&&i<d.from)shift=d.h;
    r.style.transform=shift?'translate3d(0,'+shift+'px,0)':'';
  });
}
function hbDragEnd(){
  const d=_hbDrag; if(!d)return;
  _hbDrag=null;
  window.removeEventListener('pointermove',hbDragMove);
  window.removeEventListener('pointerup',hbDragEnd);
  window.removeEventListener('pointercancel',hbDragEnd);
  window.removeEventListener('touchmove',hbBlockTouch);
  document.body.classList.remove('hb-reordering');
  d.rows.forEach(r=>{ r.classList.remove('hb-drag','hb-shift'); r.style.transform=''; });
  // Swallow the click that ends a drag.
  _hbDragged=true; setTimeout(()=>{_hbDragged=false;},280);
  if(d.to===d.from)return;
  const list=habits();
  const [moved]=list.splice(d.from,1);
  list.splice(d.to,0,moved);
  saveState(); haptic('success'); renderHabits({keepScroll:true});
}

function habitStreak(id){
  const log=habitLog()[id]||{};
  let streak=0; const d=new Date(); d.setHours(12,0,0,0);
  if(!log[dayKey(d)]) d.setDate(d.getDate()-1);
  while(log[dayKey(d)]){ streak++; d.setDate(d.getDate()-1); }
  return streak;
}
function habitMonthCount(id,anchor){
  const log=habitLog()[id]||{};
  const y=anchor.getFullYear(),m=anchor.getMonth();
  const days=new Date(y,m+1,0).getDate();
  let n=0;
  for(let i=1;i<=days;i++) if(log[dayKey(new Date(y,m,i))]) n++;
  return n;
}
// Pull past either end of the month to change month, against a rubber band; release
// before the threshold springs back.
const HB_PULL_TRIGGER=140;    // how far past the edge before it commits
const HB_PULL_MAX=190;        // the band stops giving beyond this
function bindHabitMonthPaging(){
  const sc=document.querySelector('.habit-scroll');
  if(!sc||sc._pagingBound)return;
  sc._pagingBound=true;
  // Only the day cells move.
  const strips=()=>sc.querySelectorAll('.hb-days');

  // The target month shows in the heading.
  const lbl=()=>el('habitMonthLbl');
  let realMonth=null;

  // Take over only once the movement is clearly sideways.
  let startX=null,startY=null,axis=null,pinned=null,pull=0,busy=false;
  const monthName=dir=>{
    const a=habitMonthAnchor();
    return new Date(a.getFullYear(),a.getMonth()+dir,1)
      .toLocaleDateString(undefined,{month:'short',year:'numeric'});
  };
  const paint=()=>{
    // Stiffer the further you pull.
    const eased=Math.sign(pull)*HB_PULL_MAX*(1-Math.exp(-Math.abs(pull)/HB_PULL_MAX));
    strips().forEach(st=>{st.style.transform='translate3d('+eased.toFixed(1)+'px,0,0)';});
    const dir=pull>0?-1:1;                       // pulling right reveals the past
    const armed=Math.abs(pull)>=HB_PULL_TRIGGER;
    const L=lbl();
    if(!L)return;
    if(Math.abs(pull)>6){
      if(realMonth===null)realMonth=L.textContent;
      L.textContent=(dir<0?'\u2039 ':'')+monthName(dir)+(dir>0?' \u203a':'');
      L.classList.add('hb-month-peek');
      L.classList.toggle('armed',armed);
    }else if(realMonth!==null){
      L.textContent=realMonth;
      L.classList.remove('hb-month-peek','armed');
    }
  };
  const release=()=>{
    const armed=Math.abs(pull)>=HB_PULL_TRIGGER;
    const dir=pull>0?-1:1;
    // Spring back; if armed, the month changes underneath.
    if(!armed){
      strips().forEach(st=>{
        st.style.transition='transform .34s cubic-bezier(.34,1.56,.64,1)';
        st.style.transform='translate3d(0,0,0)';
        setTimeout(()=>{st.style.transition='';},360);
      });
    }
    const L=lbl();
    if(L){
      if(realMonth!==null&&!armed)L.textContent=realMonth;
      L.classList.remove('hb-month-peek','armed');
    }
    realMonth=null;
    if(armed&&!busy){
      busy=true;
      // Carry the stretch into the swap.
      habitMonthSwap(dir,()=>{busy=false;});
    }
    pull=0;startX=null;startY=null;axis=null;pinned=null;
  };
  sc.addEventListener('touchstart',e=>{
    if(busy||_hbDrag)return;
    startX=e.touches[0].clientX;startY=e.touches[0].clientY;axis=null;pull=0;
    const max=sc.scrollWidth-sc.clientWidth;
    pinned=sc.scrollLeft<=0?'start':(sc.scrollLeft>=max-1?'end':null);
  },{passive:true});
  sc.addEventListener('touchmove',e=>{
    if(busy||_hbDrag||startX==null)return;
    const dx=e.touches[0].clientX-startX, dy=e.touches[0].clientY-startY;
    if(axis===null){
      if(Math.abs(dx)<4&&Math.abs(dy)<4)return;   // too small to tell yet
      axis=Math.abs(dx)>=Math.abs(dy)?'x':'y';
    }
    if(axis==='y'||!pinned)return;                // the page's gesture, or the grid's own scroll
    const max=sc.scrollWidth-sc.clientWidth;
    const atStart=sc.scrollLeft<=0,atEnd=sc.scrollLeft>=max-1;
    // Only the direction that leaves the month counts as a pull.
    if(pinned==='start'&&atStart&&dx>0)pull=dx;
    else if(pinned==='end'&&atEnd&&dx<0)pull=dx;
    else pull=0;
    // Only while stretched; otherwise native horizontal scroll.
    if(pull!==0&&e.cancelable)e.preventDefault();
    paint();
  },{passive:false});
  sc.addEventListener('touchend',release,{passive:true});
  sc.addEventListener('touchcancel',release,{passive:true});
  // Trackpads and mice pull the same way, through the wheel's own delta.
  let wheelRest=null;
  sc.addEventListener('wheel',e=>{
    if(busy)return;
    const max=sc.scrollWidth-sc.clientWidth;
    const d=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;
    const atStart=sc.scrollLeft<=0,atEnd=sc.scrollLeft>=max-1;
    if((atStart&&d<0)||(atEnd&&d>0))pull+=-d;else pull=0;
    paint();
    clearTimeout(wheelRest);
    wheelRest=setTimeout(release,140);
  },{passive:true});
}
function shiftHabitMonth(delta){
  const a=habitMonthAnchor();
  habitMonth=new Date(a.getFullYear(),a.getMonth()+delta,1);
  haptic('tap'); renderHabits();
}
// Month change as a card swap. dir<0 is the past: enters from the left.
const HB_SWAP_OUT=210, HB_SWAP_IN=430;
let _hbSwapping=false;
// Arrows use the same swap as swiping.
function habitMonthStep(dir){ habitMonthSwap(dir); }
function habitMonthSwap(dir,after){
  const sc=document.querySelector('.habit-scroll');
  const done=()=>{ if(typeof after==='function')after(); };
  if(!sc||state.settings.reduceMotion||_hbSwapping){ shiftHabitMonth(dir); done(); return; }
  _hbSwapping=true;
  const W=Math.max(120,Math.min(sc.clientWidth||260,340));
  const exitX=dir<0?W*0.5:-W*0.5;
  const enterX=-exitX*0.8;
  const lbl=el('habitMonthLbl');
  const strips=[...sc.querySelectorAll('.hb-days')];
  strips.forEach(st=>{
    st.style.transition='transform '+HB_SWAP_OUT+'ms cubic-bezier(.4,0,1,1), opacity '+HB_SWAP_OUT+'ms linear';
    st.style.transform='translate3d('+exitX.toFixed(1)+'px,0,0)';
    st.style.opacity='0';
  });
  if(lbl){ lbl.style.setProperty('--hb-dx',(dir<0?8:-8)+'px');
    lbl.classList.remove('hb-lbl-in'); lbl.classList.add('hb-lbl-out'); }
  setTimeout(()=>{
    shiftHabitMonth(dir);
    const sc2=document.querySelector('.habit-scroll');
    if(sc2){
      // Arrive at the edge you came from.
      sc2.scrollLeft=dir<0?Math.max(0,sc2.scrollWidth-sc2.clientWidth):0;
      sc2.querySelectorAll('.hb-days').forEach((st,i)=>{
        st.style.transition='none';
        st.style.transform='translate3d('+enterX.toFixed(1)+'px,0,0)';
        st.style.opacity='0';
        requestAnimationFrame(()=>{
          // Stagger rows.
          const d=Math.min(i,6)*26;
          st.style.transition='transform '+HB_SWAP_IN+'ms cubic-bezier(.22,1,.36,1) '+d+'ms, opacity '+(HB_SWAP_IN*0.6)+'ms ease '+d+'ms';
          st.style.transform='translate3d(0,0,0)';
          st.style.opacity='1';
          setTimeout(()=>{st.style.transition='';st.style.opacity='';},HB_SWAP_IN+d+40);
        });
      });
    }
    const l2=el('habitMonthLbl');
    if(l2){ l2.style.setProperty('--hb-dx',(dir<0?8:-8)+'px');
      l2.classList.remove('hb-lbl-out'); void l2.offsetWidth; l2.classList.add('hb-lbl-in');
      setTimeout(()=>l2.classList.remove('hb-lbl-in'),HB_SWAP_IN+40); }
    // The trend and the rings redraw with the month, so they fade up with it.
    ['habitChart','habitSummary','habitHeadStats'].forEach((id,i)=>{
      const n=el(id); if(!n)return;
      n.classList.remove('hb-fade-up'); void n.offsetWidth;
      n.style.animationDelay=(60+i*45)+'ms';
      n.classList.add('hb-fade-up');
      setTimeout(()=>{n.classList.remove('hb-fade-up');n.style.animationDelay='';},HB_SWAP_IN+260);
    });
    setTimeout(()=>{_hbSwapping=false;done();},HB_SWAP_IN+60);
  },HB_SWAP_OUT);
}

// Habit chart helpers: hand-rolled SVG, cheap to redraw.
// Hover readout; the SVG uses preserveAspectRatio=none, so x maps straight to a day.
function bindHabitTrendHover(host,perDay,list,y,m){
  if(!host||!perDay||!perDay.length)return;
  // Read the latest data from the node, not closed-over arrays.
  host._hb={perDay,list,y,m};
  if(host._hbHoverBound)return;
  host._hbHoverBound=true;
  // Look up nodes at event time: renders replace them.
  const parts=()=>({
    tip:host.querySelector('#hbTrendTip'),
    line:host.querySelector('#hbTrendLine'),
    svg:host.querySelector('svg'),
  });
  let hideTimer=null;
  const hide=()=>{
    const {tip,line}=parts();
    if(tip)tip.classList.remove('show');
    if(line)line.classList.remove('show');
    const dot=host.querySelector('#hbTrendDot');
    if(dot)dot.classList.remove('show');
  };
  const show=(clientX)=>{
    const {tip,line,svg}=parts();
    if(!tip||!svg)return;
    const r=svg.getBoundingClientRect();
    if(!r.width)return;
    const S=host._hb;
    if(!S||!S.perDay||!S.perDay.length)return;
    const plot=host._plot;
    const vals=(plot&&plot.vals&&plot.vals.length)?plot.vals:S.perDay;
    const t=Math.min(1,Math.max(0,(clientX-r.left)/r.width));
    const i=Math.min(vals.length-1,Math.round(t*(vals.length-1)));
    const date=new Date(S.y,S.m,i+1);
    const done=S.list.filter(h=>habitDone(h.id,dayKey(date)));
    tip.innerHTML=`<div class="tip-val">${done.length}<span> of ${S.list.length}</span></div>`
      +`<div class="tip-date">${esc(date.toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'}))}</div>`
      +(done.length?`<div class="tip-names">${done.map(h=>esc(h.name)).join(', ')}</div>`
                   :`<div class="tip-names dim">Nothing ticked</div>`);
    tip.classList.add('show');
    // Account for the SVG's inset inside the host.
    const hostRect=host.getBoundingClientRect();
    const inset=r.left-hostRect.left, insetY=r.top-hostRect.top;
    const x=inset+(i/((vals.length-1)||1))*r.width;
    const tw=tip.offsetWidth||120;
    tip.style.left=Math.max(tw/2+2,Math.min(x,r.width-tw/2-2))+'px';
    if(line){line.style.left=x+'px';line.classList.add('show');}
    const dot=host.querySelector('#hbTrendDot');
    if(dot&&plot){
      // Same maths as hbSmoothPath, scaled to the drawn height.
      const top=4,bot=plot.H-4;
      const svgY=bot-((vals[i]||0)/(plot.maxV||1))*(bot-top);
      dot.style.left=x+'px';
      dot.style.top=insetY+(svgY/plot.H)*r.height+'px';
      dot.classList.add('show');
    }
  };
  // mouse / stylus
  host.addEventListener('pointermove',e=>{if(e.pointerType!=='touch')show(e.clientX);});
  host.addEventListener('pointerleave',e=>{if(e.pointerType!=='touch')hide();});
  // touch: driven by touch events because pan-y fires pointercancel mid-scrub;
  // the readout lingers briefly after release.
  const touchAt=e=>{const t=e.touches&&e.touches[0];if(t){clearTimeout(hideTimer);show(t.clientX);}};
  host.addEventListener('touchstart',touchAt,{passive:true});
  host.addEventListener('touchmove',touchAt,{passive:true});
  host.addEventListener('touchend',()=>{
    clearTimeout(hideTimer);
    hideTimer=setTimeout(hide,2600);
  },{passive:true});
  // Touching anywhere else puts it away immediately.
  document.addEventListener('touchstart',e=>{
    if(!host.contains(e.target)){clearTimeout(hideTimer);hide();}
  },{passive:true});
}
function hbSmoothPath(vals,w,h,maxV){
  const n=vals.length; if(!n) return '';
  const dx=n>1?w/(n-1):0, top=4, bot=h-4;
  const pts=vals.map((v,i)=>[i*dx, bot-(maxV?v/maxV:0)*(bot-top)]);
  let d='M'+pts[0][0].toFixed(1)+','+pts[0][1].toFixed(1);
  for(let i=0;i<pts.length-1;i++){
    const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;
    d+='C'+(p1[0]+(p2[0]-p0[0])/6).toFixed(1)+','+(p1[1]+(p2[1]-p0[1])/6).toFixed(1)
      +' '+(p2[0]-(p3[0]-p1[0])/6).toFixed(1)+','+(p2[1]-(p3[1]-p1[1])/6).toFixed(1)
      +' '+p2[0].toFixed(1)+','+p2[1].toFixed(1);
  }
  return d;
}
function hbRing(pct,color,label,sub){
  const r=25,c=2*Math.PI*r,p=Math.max(0,Math.min(1,pct));
  // Number centred in a box the size of the dial.
  return `<div class="hb-ring">
    <div class="hb-ring-dial">
    <svg viewBox="0 0 62 62" aria-hidden="true">
      <circle class="hb-ring-bg" cx="31" cy="31" r="${r}"/>
      <circle class="hb-ring-fg" cx="31" cy="31" r="${r}" stroke="${color}"
        stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${(c*(1-p)).toFixed(1)}"/>
    </svg>
    <div class="hb-ring-val" style="color:${readableInk(color)}">${Math.round(pct*100)}<span>%</span></div>
    </div>
    <div class="hb-ring-lbl">${label}</div>
    <div class="hb-ring-sub">${sub}</div>
  </div>`;
}

// Centre today's column, current month only.
function scrollHabitsToToday(){
  const scroller=document.querySelector('.habit-scroll');
  if(!scroller)return;
  const anchor=habitMonthAnchor(),now=new Date();
  if(anchor.getFullYear()!==now.getFullYear()||anchor.getMonth()!==now.getMonth()){
    scroller.scrollLeft=0;return;
  }
  requestAnimationFrame(()=>{
    const cell=scroller.querySelector('.hb-cell.today');
    if(!cell)return;
    const target=cell.offsetLeft-(scroller.clientWidth/2)+(cell.offsetWidth/2);
    const max=scroller.scrollWidth-scroller.clientWidth;
    scroller.scrollLeft=Math.max(0,Math.min(max,target));
  });
}
function renderHabits(opts){
  const wrap=el('habitBody'); if(!wrap) return;
  const keepScroll=!!(opts&&opts.keepScroll);
  const scroller=document.querySelector('.habit-scroll');
  const heldScroll=keepScroll&&scroller?scroller.scrollLeft:null;
  const list=habits();
  const anchor=habitMonthAnchor();
  const y=anchor.getFullYear(), m=anchor.getMonth();
  const daysInMonth=new Date(y,m+1,0).getDate();
  const today=new Date(); today.setHours(12,0,0,0);
  const todayKey=dayKey(today);
  const isThisMonth=(today.getFullYear()===y&&today.getMonth()===m);
  const elapsed=isThisMonth?today.getDate():daysInMonth;

  {const _l=el('habitMonthLbl');
   // Short month in the header.
   _l.textContent=anchor.toLocaleDateString('en',{month:'short',year:'numeric'});
   // Clear a cancelled pull's preview.
   _l.classList.remove('hb-month-peek','armed');}
  const nextBtn=el('habitNextBtn');
  if(nextBtn){ nextBtn.disabled=(y>today.getFullYear())||(y===today.getFullYear()&&m>=today.getMonth()); }

  const headEl=el('habitHeadStats'), chartEl=el('habitChart'), sumEl=el('habitSummary');

  if(!list.length){
    wrap.innerHTML=`<div class="empty-state" style="padding:22px 10px">
      <div class="empty-ico">${svgIcon('target',26)}</div>
      <h3>No habits yet</h3>
      <p>Track daily habits beside your money goals, tap a square for every day you show up.</p>
      <button class="empty-cta" onclick="openAddHabit()">${svgIcon('rocket',13)} Add your first habit</button>
    </div>`;
    [headEl,chartEl,sumEl].forEach(n=>{ if(n) n.innerHTML=''; });
    return;
  }

  // Per-day totals across every habit, for the trend line and the totals row.
  const perDay=[]; for(let d=1;d<=daysInMonth;d++){
    const key=dayKey(new Date(y,m,d));
    perDay.push(list.reduce((n,h)=>n+(habitDone(h.id,key)?1:0),0));
  }
  const maxDay=Math.max(1,...perDay);
  const totalDone=perDay.reduce((a,b)=>a+b,0);
  const totalGoal=list.reduce((s,h)=>s+habitGoal(h,daysInMonth),0);
  const possible=list.length*elapsed;
  const successRate=possible?totalDone/possible:0;
  // Pace against where the goal should be by today.
  const expected=totalGoal*(elapsed/daysInMonth);
  const pace=expected?totalDone/expected:0;
  const last3=perDay.slice(Math.max(0,elapsed-3),elapsed);
  const momentum=last3.length?last3.reduce((a,b)=>a+b,0)/(list.length*last3.length):0;
  const bestStreak=list.reduce((b,h)=>Math.max(b,habitStreak(h.id)),0);

  // header: success rate + headline counts
  if(headEl) headEl.innerHTML=`
    <div class="hb-hero">
      <div class="hb-hero-rate">
        <div class="hb-hero-num">${Math.round(successRate*100)}<span>%</span></div>
        <div class="hb-hero-lbl">Success rate</div>
      </div>
      <div class="hb-hero-facts">
        <div><b>${totalDone}</b><span>/ ${totalGoal} goal</span></div>
        <div><b>${bestStreak}</b><span>day streak</span></div>
        <div><b>${list.length}</b><span>habit${list.length!==1?'s':''}</span></div>
      </div>
    </div>`;

  // trend line
  if(chartEl){
    const W=300,H=54;
    const shown=perDay.slice(0,elapsed);
    // The crosshair reads the same values, max and box the line was drawn with.
    chartEl._plot={vals:shown.length?shown:[0],maxV:maxDay||1,W,H};
    const path=hbSmoothPath(shown.length?shown:[0],W,H,maxDay);
    const area=path?path+`L${W},${H}L0,${H}Z`:'';
    chartEl.innerHTML=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" class="hb-trend" aria-label="Daily habits completed">
      <defs><linearGradient id="hbGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--accent)" stop-opacity=".30"/>
        <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
      </linearGradient></defs>
      ${area?`<path d="${area}" fill="url(#hbGrad)"/>`:''}
      ${path?`<path d="${path}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`:''}
    </svg>
    <div class="hb-trend-line" id="hbTrendLine" aria-hidden="true"></div>
    <div class="hb-trend-dot" id="hbTrendDot" aria-hidden="true"></div>
    <div class="hb-trend-tip" id="hbTrendTip" role="status"></div>
    <div class="hb-trend-cap"><span>Day 1</span><span>peak ${maxDay}/${list.length}</span><span>Day ${daysInMonth}</span></div>`;
    bindHabitTrendHover(chartEl,shown,list,y,m);
  }

  // grid
  const DOW=['S','M','T','W','T','F','S'];
  let html='<div class="hb-row hb-head">'
    +'<div class="hb-name-cell hb-corner"><span>HABIT</span><span class="hb-goal-col">GOAL</span></div>'
    +'<div class="hb-days">';
  for(let d=1;d<=daysInMonth;d++){
    const date=new Date(y,m,d);
    const isToday=isThisMonth&&dayKey(date)===todayKey;
    const wknd=date.getDay()===0||date.getDay()===6;
    html+=`<div class="hb-dh${isToday?' today':''}${wknd?' wknd':''}"><span class="hb-dnum">${d}</span><span class="hb-dow">${DOW[date.getDay()]}</span></div>`;
  }
  html+='</div><div class="hb-stat-cell hb-corner">PROGRESS</div></div>';

  list.forEach(h=>{
    const goal=habitGoal(h,daysInMonth);
    const done=habitMonthCount(h.id,anchor);
    const pct=goal?Math.min(1,done/goal):0;
    html+=`<div class="hb-row" data-hid="${h.id}">
      <div class="hb-name-cell" role="button" tabindex="0" onclick="openHabitMenu('${h.id}')"
        onkeydown="habitNameKey(event,'${h.id}')" title="Tap to edit \u00b7 hold to drag into a new order">
        <span class="hb-grip" aria-hidden="true"></span>
        <span class="hb-swatch" style="background:${h.color}"></span>
        <span class="hb-name">${esc(h.name)}</span>
        <span class="hb-goal-col">${goal}</span>
      </div>
      <div class="hb-days">`;
    for(let d=1;d<=daysInMonth;d++){
      const date=new Date(y,m,d);
      const key=dayKey(date);
      const future=date>today;
      const on=habitDone(h.id,key);
      const locked=!future&&!habitEditable(key);
      html+=`<button class="hb-cell${on?' on':''}${key===todayKey?' today':''}${future?' future':''}${locked?' locked':''}"
        ${future?'disabled':''} data-habit="${h.id}" data-key="${key}" style="color:${readableInk(h.color)}"
        title="${locked?'Locked, older than '+plural(HABIT_BACKFILL_DAYS,'day'):''}"
        aria-label="${esc(h.name)} ${key}${on?' done':''}" aria-pressed="${on}"><svg class="hb-tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg></button>`;
    }
    html+=`</div>
      <div class="hb-stat-cell">
        <div class="hb-prog"><div class="hb-prog-pct">${Math.round(pct*100)}%</div>
        <div class="hb-prog-bar"><div class="hb-prog-fill" style="width:${pct*100}%;background:${h.color}"></div></div></div>
      </div></div>`;
  });

  // daily totals row, aligned to the same day columns
  html+='<div class="hb-row hb-total-row"><div class="hb-name-cell hb-corner"><span>DAILY TOTAL</span></div><div class="hb-days">';
  for(let d=1;d<=daysInMonth;d++){
    const v=perDay[d-1], hgt=maxDay?Math.round(v/maxDay*100):0;
    html+=`<div class="hb-tot"><div class="hb-tot-bar"><div class="hb-tot-fill" style="height:${hgt}%"></div></div><span class="hb-tot-n${v?'':' zero'}">${v}</span></div>`;
  }
  html+=`</div><div class="hb-stat-cell hb-corner">${totalDone}</div></div>`;

  wrap.innerHTML=html;
  // Open on today; keep position on re-renders.
  if(heldScroll!=null){
    const sc=document.querySelector('.habit-scroll');
    if(sc)sc.scrollLeft=heldScroll;
  }else{
    scrollHabitsToToday();
  }
  bindHabitMonthPaging();
  bindHabitReorder(wrap);
  {const hint=el('habitHint'); if(hint)hint.hidden=list.length<2;}

  // summary rings
  if(sumEl) sumEl.innerHTML=`<div class="hb-rings">
    ${hbRing(totalGoal?totalDone/totalGoal:0,'#ff5b75','Monthly','of goal')}
    ${hbRing(pace,'#4a9eff','On pace','by today')}
    ${hbRing(momentum,'#f5a623','Momentum','last 3 days')}
  </div>`;
}

// HABIT CALENDAR
// The same log as a month calendar.
let hcalMonth=null;        // its own anchor, so browsing here does not move the grid
let hcalFocus='all';       // 'all' or one habit id
let hcalPickedDay=null;
function hcalAnchor(){
  if(!hcalMonth){const a=habitMonthAnchor();hcalMonth=new Date(a.getFullYear(),a.getMonth(),1);}
  return hcalMonth;
}
function openHabitCalendar(){
  const a=habitMonthAnchor();
  hcalMonth=new Date(a.getFullYear(),a.getMonth(),1);
  hcalPickedDay=null;
  const list=habits();
  if(hcalFocus!=='all'&&!list.some(h=>h.id===hcalFocus))hcalFocus='all';
  renderHabitCalendar();
  openModal('habitCalModal');
  bindHcalSwipe();
}
function shiftHabitCal(delta){
  const a=hcalAnchor();
  hcalMonth=new Date(a.getFullYear(),a.getMonth()+delta,1);
  hcalPickedDay=null;
  haptic('tap');renderHabitCalendar();
}
// Forward stops at the current month, like the Next button.
function hcalCanGo(dir){
  if(dir<0)return true;
  const a=hcalAnchor(),n=new Date();
  return !(a.getFullYear()>n.getFullYear()||(a.getFullYear()===n.getFullYear()&&a.getMonth()>=n.getMonth()));
}
// Same swap as the grid; only the days move.
function hcalSwap(dir){
  if(!hcalCanGo(dir))return;
  const g=el('hcalGrid'), d=g&&g.querySelector('.hcal-days');
  if(!d||state.settings.reduceMotion||_hcalSwapping){shiftHabitCal(dir);return;}
  _hcalSwapping=true;
  const W=Math.max(120,Math.min(g.clientWidth||280,340));
  const exitX=dir<0?W*0.42:-W*0.42;
  d.style.transition='transform '+HB_SWAP_OUT+'ms cubic-bezier(.4,0,1,1), opacity '+HB_SWAP_OUT+'ms linear';
  d.style.transform='translate3d('+exitX.toFixed(1)+'px,0,0)';
  d.style.opacity='0';
  const lbl=el('hcalMonthLbl');
  if(lbl){lbl.style.setProperty('--hb-dx',(dir<0?8:-8)+'px');lbl.classList.remove('hb-lbl-in');lbl.classList.add('hb-lbl-out');}
  setTimeout(()=>{
    shiftHabitCal(dir);
    const g2=el('hcalGrid'), d2=g2&&g2.querySelector('.hcal-days');
    if(d2){
      d2.style.transition='none';
      d2.style.transform='translate3d('+(-exitX*0.8).toFixed(1)+'px,0,0)';
      d2.style.opacity='0';
      requestAnimationFrame(()=>{
        d2.style.transition='transform '+HB_SWAP_IN+'ms cubic-bezier(.22,1,.36,1), opacity '+(HB_SWAP_IN*0.6)+'ms ease';
        d2.style.transform='translate3d(0,0,0)';
        d2.style.opacity='1';
        setTimeout(()=>{d2.style.transition='';d2.style.opacity='';d2.style.transform='';},HB_SWAP_IN+40);
      });
    }
    const l2=el('hcalMonthLbl');
    if(l2){l2.style.setProperty('--hb-dx',(dir<0?8:-8)+'px');l2.classList.remove('hb-lbl-out');void l2.offsetWidth;l2.classList.add('hb-lbl-in');
      setTimeout(()=>l2.classList.remove('hb-lbl-in'),HB_SWAP_IN+40);}
    setTimeout(()=>{_hcalSwapping=false;},HB_SWAP_IN+60);
  },HB_SWAP_OUT);
}
let _hcalSwapping=false;
// Horizontal swipe pages the month; vertical scrolls the sheet.
const HCAL_TRIGGER=64, HCAL_MAX=130;
function bindHcalSwipe(){
  const g=el('hcalGrid'); if(!g||g._swipeBound)return;
  g._swipeBound=true;
  let sx=null,sy=null,dx=0,axis=null;
  const days=()=>g.querySelector('.hcal-days');
  const lbl=()=>el('hcalMonthLbl');
  let realMonth=null;
  const monthName=dir=>{const a=hcalAnchor();
    return new Date(a.getFullYear(),a.getMonth()+dir,1).toLocaleDateString('en',{month:'long',year:'numeric'});};
  const paint=()=>{
    const d=days(); if(!d)return;
    const dir=dx>0?-1:1;
    // Much stiffer towards a closed direction.
    const stiff=hcalCanGo(dir)?1:0.22;
    const eased=Math.sign(dx)*HCAL_MAX*(1-Math.exp(-Math.abs(dx)/HCAL_MAX))*stiff;
    d.style.transition='none';
    d.style.transform='translate3d('+eased.toFixed(1)+'px,0,0)';
    d.style.opacity=String(Math.max(.4,1-Math.abs(eased)/300));
    const L=lbl(); if(!L)return;
    if(Math.abs(dx)>8&&hcalCanGo(dir)){
      if(realMonth===null)realMonth=L.textContent;
      L.textContent=monthName(dir);
      L.classList.add('hb-month-peek');
      L.classList.toggle('armed',Math.abs(dx)>=HCAL_TRIGGER);
    }else if(realMonth!==null){
      L.textContent=realMonth;L.classList.remove('hb-month-peek','armed');
    }
  };
  const settle=()=>{
    const d=days();
    if(d){d.style.transition='transform .3s cubic-bezier(.34,1.56,.64,1), opacity .2s ease';
      d.style.transform='translate3d(0,0,0)';d.style.opacity='1';
      setTimeout(()=>{if(d.style)d.style.transition='';},320);}
  };
  const release=()=>{
    const dir=dx>0?-1:1;
    const armed=Math.abs(dx)>=HCAL_TRIGGER&&hcalCanGo(dir);
    const L=lbl();
    if(L){ if(realMonth!==null&&!armed)L.textContent=realMonth;
      L.classList.remove('hb-month-peek','armed'); }
    realMonth=null;
    if(armed)hcalSwap(dir); else settle();
    sx=sy=null;dx=0;axis=null;
  };
  g.addEventListener('touchstart',e=>{
    if(_hcalSwapping||e.touches.length>1){sx=null;return;}
    sx=e.touches[0].clientX;sy=e.touches[0].clientY;dx=0;axis=null;
  },{passive:true});
  g.addEventListener('touchmove',e=>{
    if(sx==null||_hcalSwapping)return;
    const x=e.touches[0].clientX-sx, y=e.touches[0].clientY-sy;
    if(axis===null){
      if(Math.abs(x)<6&&Math.abs(y)<6)return;
      // Axis locks on the first move.
      axis=Math.abs(x)>Math.abs(y)*1.25?'x':'y';
    }
    if(axis!=='x')return;
    if(e.cancelable)e.preventDefault();
    dx=x;paint();
  },{passive:false});
  g.addEventListener('touchend',()=>{if(sx!=null&&axis==='x')release();else{sx=null;axis=null;dx=0;}},{passive:true});
  g.addEventListener('touchcancel',()=>{if(sx!=null&&axis==='x')release();else{sx=null;axis=null;dx=0;}},{passive:true});
}
function setHcalFocus(id){hcalFocus=id;hcalPickedDay=null;haptic('tap');renderHabitCalendar();}
function pickHcalDay(key){
  hcalPickedDay=(hcalPickedDay===key)?null:key;
  haptic('tap');renderHabitCalendar();
}
// Same backfill rule as the grid.
function toggleHabitFromCal(id,key){
  toggleHabit(id,key);
  renderHabitCalendar();
}
function renderHabitCalendar(){
  const grid=el('hcalGrid');if(!grid)return;
  const list=habits();
  const a=hcalAnchor(),y=a.getFullYear(),m=a.getMonth();
  const dim=new Date(y,m+1,0).getDate();
  const lead=new Date(y,m,1).getDay();          // 0 = Sunday, matching the grid's headers
  const today=new Date();today.setHours(23,59,59,999);
  const todayKey=dayKey(new Date());
  const log=habitLog();
  const focus=hcalFocus==='all'?null:list.find(h=>h.id===hcalFocus);
  const tracked=focus?[focus]:list;

  const lbl=el('hcalMonthLbl');
  if(lbl)lbl.textContent=a.toLocaleDateString('en',{month:'long',year:'numeric'});
  const nextBtn=el('hcalNextBtn');
  if(nextBtn){
    const now=new Date();
    const future=y>now.getFullYear()||(y===now.getFullYear()&&m>=now.getMonth());
    nextBtn.disabled=future;nextBtn.style.opacity=future?'.35':'';
  }

  // Habit filter chips: All, then one per habit in its own colour.
  const fil=el('hcalFilter');
  if(fil){
    fil.innerHTML=`<button class="hcal-chip${hcalFocus==='all'?' on':''}" onclick="setHcalFocus('all')">All habits</button>`
      +list.map(h=>`<button class="hcal-chip${hcalFocus===h.id?' on':''}" onclick="setHcalFocus('${h.id}')"
        style="--chip:${h.color}"><span class="hcal-chip-dot" style="background:${h.color}"></span>${esc(h.name)}</button>`).join('');
  }

  const DOW=['S','M','T','W','T','F','S'];
  let html='<div class="hcal-dow">'+DOW.map(d=>`<span>${d}</span>`).join('')+'</div><div class="hcal-days">';
  for(let i=0;i<lead;i++)html+='<div class="hcal-pad"></div>';
  let monthDone=0,monthPossible=0,perfectDays=0;
  for(let d=1;d<=dim;d++){
    const date=new Date(y,m,d);
    const key=dayKey(date);
    const future=date>today;
    const done=tracked.filter(h=>!!(log[h.id]&&log[h.id][key])).length;
    const possible=tracked.length;
    if(!future){monthDone+=done;monthPossible+=possible;if(possible&&done===possible)perfectDays++;}
    const ratio=possible?done/possible:0;
    const locked=!future&&!habitEditable(key);
    // One habit: its colour. All habits: a completion ramp.
    let style='',cls='hcal-day';
    if(future)cls+=' future';
    if(key===todayKey)cls+=' today';
    if(locked)cls+=' locked';
    if(hcalPickedDay===key)cls+=' picked';
    if(!future&&done>0){
      cls+=' has';
      if(focus){style=`--c:${focus.color};--fill:1`;}
      else{style=`--c:var(--accent);--fill:${ratio.toFixed(2)}`;}
      if(possible&&done===possible)cls+=' full';
    }
    const label=future?`${key}, not yet`
      :(focus?`${focus.name} ${key} ${done?'done':'not done'}`:`${key}, ${done} of ${plural(possible,'habit')}`);
    html+=`<button class="${cls}" style="${style}" data-key="${key}" ${future?'disabled':''}
      onclick="pickHcalDay('${key}')" aria-label="${esc(label)}">
      <span class="hcal-n">${d}</span>
      ${(!future&&possible>1&&!focus)?`<span class="hcal-frac">${done}/${possible}</span>`:''}
      ${(!future&&focus&&done)?'<span class="hcal-mark"></span>':''}
    </button>`;
  }
  html+='</div>';
  grid.innerHTML=html;

  // A month is only worth showing if it also says how the month went.
  const leg=el('hcalLegend');
  if(leg){
    const pct=monthPossible?Math.round(monthDone/monthPossible*100):0;
    leg.innerHTML=`<div class="hcal-stats">
      <div class="hcal-stat"><b>${pct}%</b><span>${focus?esc(focus.name):'all habits'}</span></div>
      <div class="hcal-stat"><b>${monthDone}</b><span>of ${monthPossible} ticks</span></div>
      <div class="hcal-stat"><b>${perfectDays}</b><span>${focus?'days done':'perfect days'}</span></div>
    </div>
    <div class="hcal-key"><span>Less</span>
      ${[0.001,0.34,0.67,1].map(f=>`<i style="--c:${focus?focus.color:'var(--accent)'};--fill:${f}"></i>`).join('')}
      <span>More</span></div>`;
  }

  // The tapped day, spelled out, with the same tick rules as the grid.
  const dayBox=el('hcalDay');
  if(dayBox){
    if(!hcalPickedDay){
      dayBox.innerHTML='<div class="hcal-hint">Tap a day to see it, and to tick it.</div>';
    }else{
      const dd=new Date(hcalPickedDay+'T12:00:00');
      const editable=habitEditable(hcalPickedDay);
      dayBox.innerHTML=`<div class="hcal-day-head">${dd.toLocaleDateString('en',{weekday:'long',day:'numeric',month:'long'})}</div>`
        +(editable?'':`<div class="hcal-day-note">Locked, older than ${plural(HABIT_BACKFILL_DAYS,'day')}, so the record stays honest.</div>`)
        +'<div class="hcal-day-list">'
        +list.map(h=>{
          const on=!!(log[h.id]&&log[h.id][hcalPickedDay]);
          return `<button class="hcal-row${on?' on':''}${editable?'':' locked'}" style="color:${readableInk(h.color)}"
            ${editable?`onclick="toggleHabitFromCal('${h.id}','${hcalPickedDay}')"`:'disabled'}>
            <span class="hcal-box">${on?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':''}</span>
            <span class="hcal-row-name">${esc(h.name)}</span>
            <span class="hcal-row-state">${on?'done':(editable?'tap to tick':'not done')}</span>
          </button>`;
        }).join('')
        +'</div>';
    }
  }
}
// One delegated listener for the whole grid.
function bindHabitGrid(){
  const wrap=el('habitBody'); if(!wrap||wrap._bound) return;
  wrap._bound=true;
  wrap.addEventListener('click',e=>{
    const c=e.target.closest('.hb-cell');
    if(!c||c.disabled) return;
    toggleHabit(c.dataset.habit,c.dataset.key);
  });
}

let editingHabitId=null, pickedHabitColor=HABIT_COLORS[0];
function openAddHabit(){
  editingHabitId=null;
  const days=new Date(habitMonthAnchor().getFullYear(),habitMonthAnchor().getMonth()+1,0).getDate();
  el('habitModalTitle').textContent='New Habit';
  el('habitNameInput').value='';
  el('habitGoalInput').value=days;
  el('habitGoalInput').max=days;
  pickedHabitColor=HABIT_COLORS[habits().length%HABIT_COLORS.length];
  renderHabitColors();
  el('habitDeleteBtn').style.display='none';
  clearFieldErr('habitNameErr',el('habitNameInput'));
  openModal('habitModal');
  setTimeout(()=>{try{el('habitNameInput').focus();}catch(e){}},280);
}
function openHabitMenu(id){
  if(_hbDragged)return;
  const h=habits().find(x=>x.id===id); if(!h) return;
  const days=new Date(habitMonthAnchor().getFullYear(),habitMonthAnchor().getMonth()+1,0).getDate();
  editingHabitId=id;
  el('habitModalTitle').textContent='Edit Habit';
  el('habitNameInput').value=h.name;
  el('habitGoalInput').value=habitGoal(h,days);
  el('habitGoalInput').max=days;
  pickedHabitColor=h.color||HABIT_COLORS[0];
  renderHabitColors();
  el('habitDeleteBtn').style.display='';
  clearFieldErr('habitNameErr',el('habitNameInput'));
  openModal('habitModal');
}
function habitPickColor(c){ pickedHabitColor=c; renderHabitColors(); }
function renderHabitColors(){
  const box=el('habitColorRow'); if(!box) return;
  box.innerHTML=HABIT_COLORS.map(c=>`<button type="button" class="hb-color${c===pickedHabitColor?' sel':''}" style="background:${c}" onclick="habitPickColor('${c}')" aria-label="Colour"></button>`).join('');
}
function saveHabit(){
  const name=el('habitNameInput').value.trim();
  if(!name){ showFieldErr('habitNameErr','Give the habit a name',el('habitNameInput')); haptic('tap'); return; }
  clearFieldErr('habitNameErr',el('habitNameInput'));
  const days=new Date(habitMonthAnchor().getFullYear(),habitMonthAnchor().getMonth()+1,0).getDate();
  const goal=Math.min(days,Math.max(1,parseInt(el('habitGoalInput').value,10)||days));
  if(editingHabitId){
    const h=habits().find(x=>x.id===editingHabitId);
    if(h){ h.name=name; h.color=pickedHabitColor; h.goal=goal; delete h.target; }
  } else {
    habits().push({id:uid(),name,color:pickedHabitColor,goal,createdAt:new Date().toISOString()});
  }
  saveState(); closeModal('habitModal'); renderHabits(); haptic('success');
  toast(editingHabitId?'Habit updated':'Habit added','success');
}
async function deleteHabit(){
  const h=habits().find(x=>x.id===editingHabitId); if(!h) return;
  if(!await askConfirm({title:'Delete habit?',message:'“'+h.name+'” and its whole check-in history will be removed.',confirmText:'Delete habit'})) return;
  const id=editingHabitId;
  const savedLog=JSON.parse(JSON.stringify(habitLog()[id]||{}));
  const savedHabit={...h};
  const idx=habits().findIndex(x=>x.id===id);
  habits().splice(idx,1);
  delete habitLog()[id];
  saveState(); closeModal('habitModal'); renderHabits(); haptic('tap');
  // Habits are in settings, not a diffed list; restore directly.
  const undoId=++_undoSeq;
  _undoStack.push({id:undoId,keys:[],diff:{},timer:setTimeout(()=>removeUndoEntry(undoId),UNDO_WINDOW_MS),
    restore:()=>{ habits().splice(Math.min(idx,habits().length),0,savedHabit); habitLog()[id]=savedLog; saveState(); renderHabits(); }});
  toastWithUndo(undoId,h.name+' deleted');
}

// PLAN
function goalLinkedIds(g){if(g.linkedAssetIds&&g.linkedAssetIds.length)return g.linkedAssetIds;if(g.linkedAssetId)return[g.linkedAssetId];return[];}
function syncLinkedGoals(){let changed=false;state.goals.forEach(g=>{const ids=goalLinkedIds(g);if(!ids.length)return;const validIds=ids.filter(id=>state.assets.find(x=>x.id===id));if(validIds.length!==ids.length){g.linkedAssetIds=validIds;if(validIds.length)g.linkedAssetId=validIds[0];else{g.linkedAssetId=null;g.linkedAssetIds=[];}changed=true;}const live=validIds.reduce((s,id)=>{const a=state.assets.find(x=>x.id===id);return s+(a?getAssetCurrentValue(a):0);},0);if(Math.abs((g.saved||0)-live)>0.005){g.saved=live;changed=true;}});if(changed)saveState();}
function renderPlan(){syncLinkedGoals();bindHabitGrid();renderHabits();const tt=state.goals.reduce((s,g)=>s+(g.target||0),0),ts=state.goals.reduce((s,g)=>s+(g.saved||0),0);el('planTarget').textContent=fmt(tt);el('planSaved').textContent=fmt(ts);el('planRemain').textContent=fmt(Math.max(0,tt-ts));renderPnLChart();
  let goals=state.goals.slice();
  if(goalQuery)goals=goals.filter(g=>g.name.toLowerCase().includes(goalQuery));
  const goalPct=g=>g.target>0?Math.min(100,(g.saved||0)/g.target*100):0;
  if(goalSort==='progress')goals.sort((a,b)=>goalPct(b)-goalPct(a));
  else if(goalSort==='target')goals.sort((a,b)=>(b.target||0)-(a.target||0));
  else if(goalSort==='saved')goals.sort((a,b)=>(b.saved||0)-(a.saved||0));
  else if(goalSort==='deadline')goals.sort((a,b)=>{if(!a.date&&!b.date)return 0;if(!a.date)return 1;if(!b.date)return -1;return new Date(a.date)-new Date(b.date);});
  else if(goalSort==='name')goals.sort((a,b)=>a.name.localeCompare(b.name));
  const gl=el('goalsList');if(!state.goals.length){gl.innerHTML=`<div class="empty-state"><div class="empty-ico">${svgIcon('target',30)}</div><h3>No goals yet</h3><p>Set savings targets, an emergency fund, a trip, a new home, and watch your progress grow.</p><button class="empty-cta" onclick="openAddGoal()">${svgIcon('trophy',14)} Create a goal</button></div>`;}
  else if(!goals.length){gl.innerHTML=`<div class="empty-state"><p>No goals match "${esc(goalQuery)}"</p></div>`;}
  else{gl.innerHTML=goals.map((g,i)=>{const pct=goalPct(g),col=g.colorTheme||'acc',color=GOAL_COLORS.find(c=>c.name===col)?.hex||'#f5a623',rem=Math.max(0,(g.target||0)-(g.saved||0)),done=pct>=100;
    const overdue=!done&&g.date&&parseDay(g.date)<new Date(new Date().toDateString());
    const dateHtml=g.date?(overdue?'<span class="goal-overdue-badge">OVERDUE, was due '+formatDate(g.date)+'</span>':'Target: '+formatDate(g.date)):'No target date';
    return `<div class="goal-card${enterCls()} ${done?'done':''} ${overdue?'overdue':''}${isPendingSync('goals',g.id)?' unsynced':''}" style="animation-delay:${_animateEnter?i*45:0}ms" role="button" tabindex="0" data-goal-id="${g.id}" onclick="openGoalDetail('${g.id}')">${isPendingSync('goals',g.id)?pendingBadge():''}<div class="goal-top"><div class="goal-icon" style="background:var(--bg3);color:${readableInk(color)}">${svgIcon(g.icon||'target',18)}</div><div class="goal-info"><div class="goal-name">${esc(g.name)} ${done?'<span class="goal-done-badge" title="Goal reached"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span>':''}${(goalLinkedIds(g).length)?'<span class="goal-link-badge" title="Linked to savings account(s)"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></span>':''}</div><div class="goal-sub">${dateHtml} · ${fmt(rem)} left</div>${(function(){const p=goalProjection(g.target,g.saved,g.monthly,g.date);if(!p||p.done||p.onTrack==null)return '';return `<span class="goal-chip ${p.onTrack?'on':'off'}">${p.onTrack?'On track':fmt(p.shortfall)+' short'}</span>`;})()}</div><div class="goal-pct">${pct.toFixed(1)}%</div></div><div class="progress-bar"><div class="progress-fill ${col}" data-w="${pct}"></div></div><div class="progress-meta"><span>${fmt(g.saved||0)} saved</span><span>${fmt(g.target||0)} goal</span></div></div>`;}).join('');
    attachContextMenu(gl,'.goal-card',openGoalContextMenu);
    // Grow from zero only on arrival.
    if(_animateEnter)requestAnimationFrame(()=>document.querySelectorAll('#goalsList .progress-fill').forEach(f=>f.style.width=f.dataset.w+'%'));
    else document.querySelectorAll('#goalsList .progress-fill').forEach(f=>{f.style.transition='none';f.style.width=f.dataset.w+'%';requestAnimationFrame(()=>{f.style.transition='';});});}
  const rl=el('recurList');if(!state.recurs.length)rl.innerHTML='<div class="empty-state" style="padding:16px"><p>Nothing repeating yet</p></div>';
  else{const tm={};ASSET_TYPES.forEach(t=>tm[t.id]=t);const today=todayStr(); // Due bills first: a missed one costs money.
  const ordered=state.recurs.slice().sort((a,b)=>{
    const da=(a.nextDue||a.start||''),db=(b.nextDue||b.start||'');
    const oa=(a.active!==false&&da<=today)?0:1, ob=(b.active!==false&&db<=today)?0:1;
    return oa-ob||da.localeCompare(db);
  });
  rl.innerHTML=ordered.map(r=>{const bill=recurKind(r)==='bill';const sc=bill?spendCat(r.spendCat):null;const type=bill?{bg:(sc.color||'#888')+'22',color:sc.color||'#888'}:(tm[r.category]||ASSET_TYPES[5]);const paused=r.active===false;const due=r.nextDue||r.start;const overdue=!paused&&due<=today;const dueLbl=paused?'Paused':(overdue?'Due now':'Next: '+formatDate(due));const sameWord=bill&&String(r.name||'').trim().toLowerCase()===String(sc.label||'').toLowerCase();const targetLbl=bill?(sameWord?'':' · '+esc(sc.label)):(r.category==='crypto'&&r.coinName?' → '+esc(r.coinName):'');
    return `<div class="recur-item ${paused?'paused':''}${isPendingSync('recurs',r.id)?' unsynced':''}" data-recur-id="${r.id}" role="button" tabindex="0" onclick="openEditRecur('${r.id}')">${isPendingSync('recurs',r.id)?pendingBadge():''}<div class="recur-ico" style="background:${type.bg};color:${readableInk(type.color)}">${(!bill&&r.coinImage)?`<img src="${esc(r.coinImage)}" style="width:16px;height:16px;border-radius:50%" onerror="this.style.display='none'"/>`:svgIcon(bill?(sc.icon||'receipt'):'coins',14)}</div><div class="recur-info"><div class="recur-name">${esc(r.name)}${targetLbl}</div><div class="recur-freq">${esc(freqLabel(r.freq))} · <span class="${overdue?'recur-due-now':''}">${dueLbl}</span></div></div><div class="recur-right"><div class="recur-val"${bill?' style="color:var(--red)"':''}>${bill?'−':''}${fmt(r.amount)}</div>${overdue?`<button class="recur-run-btn" onclick="event.stopPropagation();runRecurNow('${r.id}')">Run now</button>`:''}</div></div>`;}).join('');
    attachContextMenu(rl,'.recur-item',openRecurContextMenu);}}
function openRecurContextMenu(itemEl){const id=itemEl.dataset.recurId;if(!id)return;const r=state.recurs.find(x=>x.id===id);if(!r)return;const paused=r.active===false;
  el('ctxHeader').innerHTML=`<div class="ctx-header-ico" style="background:var(--accent-glow);color:var(--accent)">${svgIcon('coins',18)}</div><div class="ctx-header-text"><div class="ctx-header-name">${esc(r.name)}</div><div class="ctx-header-sub">${fmt(r.amount)} · ${esc(freqLabel(r.freq))}</div></div>`;
  const rows=[];
  if(!paused)rows.push({icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,label:'Run This Cycle Now',cls:'buy',action:()=>runRecurNow(id)});
  rows.push({icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>`,label:'Edit',cls:'accent',action:()=>openEditRecur(id)});
  rows.push({icon:paused?`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,label:paused?'Resume':'Pause',cls:'',action:()=>quickToggleRecur(id)});
  rows.push({icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,label:'Delete',cls:'danger',action:()=>quickDeleteRecur(id)});
  el('ctxList').innerHTML=rows.map((rw,i)=>`<button class="ctx-item ${rw.cls}" data-ctx-i="${i}">${rw.icon}<span>${rw.label}</span></button>`).join('');
  el('ctxList').querySelectorAll('.ctx-item').forEach((btn,i)=>btn.addEventListener('click',()=>{const rw=rows[i];closeModal('assetCtxModal',rw.label!=='Delete');setTimeout(rw.action,rw.label==='Delete'?200:0);}));
  openModal('assetCtxModal');}
async function quickDeleteGoal(id){const g=state.goals.find(x=>x.id===id);if(!g)return;if(!await askConfirm({title:'Delete goal?',message:'“'+g.name+'” will be removed. Any linked assets stay exactly as they are.',confirmText:'Delete goal'}))return;withUndo(g.name+' deleted',['goals'],()=>{state.goals=state.goals.filter(x=>x.id!==id);});saveState();renderAll();haptic('tap');}
function openGoalContextMenu(itemEl){const id=itemEl.dataset.goalId;if(!id)return;const g=state.goals.find(x=>x.id===id);if(!g)return;
  const pct=g.target>0?Math.min(100,(g.saved||0)/g.target*100):0,col=g.colorTheme||'acc',color=GOAL_COLORS.find(c=>c.name===col)?.hex||'#f5a623';
  el('ctxHeader').innerHTML=`<div class="ctx-header-ico" style="background:var(--bg3);color:${readableInk(color)}">${svgIcon(g.icon||'target',18)}</div><div class="ctx-header-text"><div class="ctx-header-name">${esc(g.name)}</div><div class="ctx-header-sub">${pct.toFixed(0)}% funded · ${fmt(g.saved||0)} of ${fmt(g.target||0)}</div></div>`;
  const rows=[];
  rows.push({icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>`,label:'Edit / Add Contribution',cls:'accent',action:()=>openGoalDetail(id)});
  rows.push({icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,label:'Delete Goal',cls:'danger',action:()=>quickDeleteGoal(id)});
  el('ctxList').innerHTML=rows.map((r,i)=>`<button class="ctx-item ${r.cls}" data-ctx-i="${i}">${r.icon}<span>${r.label}</span></button>`).join('');
  el('ctxList').querySelectorAll('.ctx-item').forEach((btn,i)=>btn.addEventListener('click',()=>{const r=rows[i];closeModal('assetCtxModal',r.label!=='Delete Goal');setTimeout(r.action,r.label==='Delete Goal'?200:0);}));
  openModal('assetCtxModal');}
function quickToggleRecur(id){const r=state.recurs.find(x=>x.id===id);if(!r)return;r.active=r.active===false;saveState();renderPlan();haptic('tap');toast(r.active===false?'Paused':'Resumed','success');}
async function quickDeleteRecur(id){const r=state.recurs.find(x=>x.id===id);if(!r)return;const _bill=recurKind(r)==='bill';if(!await askConfirm({title:_bill?'Delete recurring bill?':'Delete recurring investment?',message:'“'+r.name+'” will stop running. '+(_bill?'Expenses it already recorded are kept.':'Investments it already made are kept.'),confirmText:'Delete'}))return;withUndo(r.name+' deleted',['recurs'],()=>{state.recurs=state.recurs.filter(x=>x.id!==id);});saveState();renderPlan();haptic('tap');}
function renderPnLChart(){const c=el('pnlChart');if(!c||!window.Chart)return;if(pnlChartInst){try{pnlChartInst.destroy();}catch(e){}pnlChartInst=null;}let labels=[],data=[]; // Same reconstructed series as the dashboard.
  const _s=buildNetWorthSeries();const hist=_s.length>=2?_s.slice(-30):null;
  if(hist)hist.forEach(p=>{labels.push(new Date(p.date).toLocaleDateString('en',{month:'short',day:'numeric'}));data.push(p.netWorth);});else{const nw=calcNetWorth();for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);labels.push(d.toLocaleDateString('en',{month:'short',day:'numeric'}));data.push(nw);}}
  const pos=data.length<2||data[data.length-1]>=data[0],T=themeColors(),col=pos?T.green:T.red;
  pnlChartInst=new Chart(c,{type:'line',data:{labels,datasets:[{data,label:'Net Worth',borderColor:col,borderWidth:2.2,tension:.4,fill:true,backgroundColor:ctx=>{const g=ctx.chart.ctx.createLinearGradient(0,0,0,110);g.addColorStop(0,hexA(col,.22));g.addColorStop(1,hexA(col,0));return g;},pointRadius:0,pointHoverRadius:6,pointBackgroundColor:col,pointHoverBackgroundColor:'#fff',pointHoverBorderColor:col,pointHoverBorderWidth:2}]},options:{responsive:true,maintainAspectRatio:false,animation:{duration:state.settings.reduceMotion?0:550},plugins:{legend:{display:false},tooltip:{enabled:false,external:ctx=>buildHoverTooltip(ctx,'pnlChartTooltip',i=>labels[i]||'',{series:data,sinceLabel:'Over the window'})}},interaction:{intersect:false,mode:'index'},onHover:(e,els,chart)=>{const wrap=el('pnlChartWrap');if(els&&els.length){const x=els[0].element.x;chart._hoverX=x;if(wrap)wrap.classList.add('hovering');const vl=el('pnlChartVLine');if(vl)vl.style.left=x+'px';}else{chart._hoverX=null;if(wrap)wrap.classList.remove('hovering');}chart.draw();},scales:{x:{display:true,ticks:{color:T.text3,font:{size:9},maxRotation:0},grid:{display:false}},y:{display:false,...paddedYRange(data)}}},plugins:[sharedCrosshairPlugin]});}
// SETTINGS
// Stamped at commit time so a stale service-worker copy is visible.
const BUILD_ID='65069d4';
function buildStampText(){
  const sw=(navigator.serviceWorker&&navigator.serviceWorker.controller)?'active':'none';
  return BUILD_ID+' · sw '+sw;
}
function syncBuildStamp(){
  const n=el('buildStamp');
  if(n)n.textContent=buildStampText();
}
async function copyBuildInfo(){
  const lines=[
    'build '+BUILD_ID,
    'ua '+navigator.userAgent,
    'screen '+window.innerWidth+'x'+window.innerHeight+' dpr'+(window.devicePixelRatio||1),
    'sw '+((navigator.serviceWorker&&navigator.serviceWorker.controller)?'active':'none'),
  ].join('\n');
  try{await navigator.clipboard.writeText(lines);toast('Build info copied','success');}
  catch(e){toast(BUILD_ID,'success');}
  haptic('tap');
}
function renderSettings(){renderCurrGrid();updateAuthUI();syncAdminVisibility();['hideBalance','haptics','reduceMotion'].forEach(k=>{const t=el('tog-'+k);if(t){t.className='toggle'+(state.settings[k]?' on':'');t.setAttribute('aria-checked',state.settings[k]?'true':'false');}});const lu=el('lastUpdated');if(lu)lu.textContent=state.lastUpdated?'Synced: '+new Date(state.lastUpdated).toLocaleTimeString():'Never';el('themeOptAuto')&&el('themeOptAuto').classList.toggle('active',state.settings.theme==='auto');el('themeOptDark')&&el('themeOptDark').classList.toggle('active',state.settings.theme==='dark');el('themeOptLight')&&el('themeOptLight').classList.toggle('active',state.settings.theme==='light');syncAppLockUI();renderHapticSeg();renderAiSettings();syncAiEntryPoints();syncBuildStamp();}
let rateEditCode=null;
function renderCurrGrid(){
  const sub=el('currencySub');
  if(sub){
    const c=currentCurrency,b=baseCode();
    sub.textContent=c.code+' · '+c.name+(hasCustomRate(c.code)?' · your rate':'')
      +(b===c.code?'':' · stored in '+b);
  }
}
function openCurrencyPicker(){
  const s=el('currSearch');if(s)s.value='';
  renderCurrList();
  openModal('currencyModal');
}
function renderCurrList(){
  const host=el('currList');if(!host)return;
  const q=((el('currSearch')&&el('currSearch').value)||'').trim().toLowerCase();
  const rows=CURRENCIES.filter(c=>!q||c.code.toLowerCase().includes(q)||c.name.toLowerCase().includes(q));
  if(!rows.length){host.innerHTML='<div class="spend-none">No currency matches that.</div>';return;}
  host.innerHTML=rows.map(c=>{
    const base=baseCode();
    const active=currMode==='base'?(c.code===base):(c.code===state.settings.currency);
    const custom=hasCustomRate(c.code);
    const per=c.code===base?null:(custom?customRateFor(c.code):basePerUnit(c.code));
    const rateTxt=c.code===base?'Amounts are stored in this'
      :(per?('1 '+c.code+' = '+per.toFixed(per<1?4:2)+' '+base):'Rate unavailable');
    return `<div class="curr-row${active?' active':''}" role="option" aria-selected="${active}">`
      +`<button class="curr-pick" onclick="pickCurrency('${c.code}')">`
      +`<span class="curr-sym">${esc(c.sym)}</span>`
      +`<span class="curr-txt"><span class="curr-code">${c.code}<span class="curr-name">${esc(c.name)}</span></span>`
      +`<span class="curr-rate${custom?' custom':''}">${rateTxt}${custom?' · yours':''}</span></span>`
      +(active?`<span class="curr-tick"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span>`:'')
      +`</button>`
      +(c.code===base?'':`<button class="curr-edit" onclick="openRateEditor('${c.code}')" aria-label="Set your own rate for ${c.code}" title="Set your own rate"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg></button>`)
      +`</div>`;
  }).join('');
}
function pickCurrency(code){
  if(currMode==='base'){setBaseCurrency(code);return;}
  setCurrency(code);renderCurrList();closeModal('currencyModal');
}
// 'display' = what numbers are shown in; 'base' = what they are stored in.
let currMode='display';
function setCurrMode(m){
  currMode=(m==='base')?'base':'display';
  const d=el('currModeDisplay'),b=el('currModeBase');
  if(d)d.classList.toggle('on',currMode==='display');
  if(b)b.classList.toggle('on',currMode==='base');
  const h=el('currModeHint');
  if(h)h.textContent=currMode==='base'
    ? 'The currency your amounts are saved in. Changing it converts everything you have entered, once.'
    : 'What every figure in the app is shown in. Your saved amounts do not change.';
  renderCurrList();
}

// Rates are typed as quoted: base units per 1 unit.
function openRateEditor(code){
  rateEditCode=code;
  const live=basePerUnit(code);
  el('rateTitle').textContent=code+' Rate';
  el('rateLbl').textContent='1 '+code+' EQUALS ('+baseCode()+')';
  el('rateLive').innerHTML=live
    ? `<span>Live rate</span><b>1 ${code} = ${live.toFixed(live<1?4:2)} NPR</b>`
    : `<span>Live rate</span><b>unavailable right now</b>`;
  const cur=customRateFor(code);
  el('rateInput').value=cur?String(+cur.toFixed(6)):(live?live.toFixed(2):'');
  onRateInput();
  openModal('rateModal');
}
function onRateInput(){
  const v=parseFloat(el('rateInput').value);
  const live=basePerUnit(rateEditCode);
  const h=el('rateHint');if(!h)return;
  if(isNaN(v)||v<=0){h.textContent='Enter how many '+baseCode()+' one '+rateEditCode+' is worth to you.';h.style.color='';return;}
  if(!live){h.textContent='';return;}
  const diff=((v-live)/live)*100;
  h.textContent=Math.abs(diff)<0.05
    ? 'The same as the live rate.'
    : Math.abs(diff).toFixed(1)+'% '+(diff>0?'above':'below')+' the live rate.';
  h.style.color=Math.abs(diff)>15?'var(--red)':'';
}
function saveCustomRate(){
  const v=parseFloat(el('rateInput').value);
  if(isNaN(v)||v<=0){toast('Enter a rate','error');return;}
  state.settings.customRates={...customRates(),[rateEditCode]:v};
  saveState();invalidateCharts();
  toast('Using your rate for '+rateEditCode,'success');
  closeModal('rateModal');renderCurrGrid();renderAll();renderTicker();
}
function clearCustomRate(){
  const r={...customRates()};delete r[rateEditCode];
  state.settings.customRates=r;
  saveState();invalidateCharts();
  toast('Back to the live rate','success');
  closeModal('rateModal');renderCurrGrid();renderAll();renderTicker();
}
function toggleAiPref(k){
  const p=aiPrefs();
  setAiPref(k,!p[k]);
  haptic('tap');syncAiEntryPoints();renderAiSettings();
  // Keep at least one way to open the assistant.
  const now=aiPrefs();
  if(!now.bubble&&!now.header)toast('Folio is still in Settings and the command palette','success');
}
function setAiSpeed(v){setAiPref('speed',v);haptic('tap');renderAiSettings();}
function renderAiSettings(){
  const p=aiPrefs();
  const tb=el('tog-aiBubble');
  if(tb){tb.className='toggle'+(p.bubble?' on':'');tb.setAttribute('aria-checked',p.bubble?'true':'false');}
  const th=el('tog-aiHeader');
  if(th){th.className='toggle'+(p.header?' on':'');th.setAttribute('aria-checked',p.header?'true':'false');}
  const seg=el('aiSpeedSeg');
  if(seg){
    seg.innerHTML=[['instant','Instant'],['fast','Fast'],['normal','Normal'],['slow','Slow']]
      .map(([v,l])=>`<button class="seg-3-btn${p.speed===v?' on':''}" onclick="event.stopPropagation();setAiSpeed('${v}')">${l}</button>`).join('');
  }
  const sub=el('aiStatusSub');
  if(sub)sub.textContent=aiThread.length?(aiThread.filter(t=>t.role==='user').length+' question'+(aiThread.filter(t=>t.role==='user').length!==1?'s':'')+' this session'):'Ask about anything in the app';
}
function toggleSetting(key){state.settings[key]=!state.settings[key];saveState();haptic('tap');
  if(key==='reduceMotion')document.body.classList.toggle('no-anim',state.settings.reduceMotion);
  if(key==='hideBalance')syncPrivacyIcon();
  renderSettings();renderAll();}
function quickToggleBalance(){state.settings.hideBalance=!state.settings.hideBalance;saveState();haptic('tap');syncPrivacyIcon();renderSettings();renderAll();announce(state.settings.hideBalance?'Balances hidden':'Balances shown');}
function syncPrivacyIcon(){const i=el('privacyIcon');if(!i)return;i.innerHTML=state.settings.hideBalance?'<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>':'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';}
// APP LOCK (PIN)
const PIN_KEY='paisafolio_pin_hash';
let pinEntry='',pinMode=null,pinFirstEntry='',appUnlocked=false;
const PIN_SALT_KEY='paisafolio_pin_salt';
const PIN_ATTEMPTS_KEY='paisafolio_pin_attempts';
const PBKDF2_ITERATIONS=210000;

function hasWebCrypto(){return !!(window.crypto&&window.crypto.subtle&&window.crypto.getRandomValues);}
function bytesToHex(buf){return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');}

// Kept only so an existing v1 hash can still be verified once, then upgraded.
async function legacySha256Hex(str){
  if(!hasWebCrypto()){let h=0;for(let i=0;i<str.length;i++){h=(h*31+str.charCodeAt(i))|0;}return 'fallback_'+h;}
  const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(str));
  return bytesToHex(buf);
}

function getOrCreateSalt(){
  try{
    let s=localStorage.getItem(PIN_SALT_KEY);
    if(s&&/^[0-9a-f]{32}$/.test(s))return s;
    const bytes=new Uint8Array(16);
    crypto.getRandomValues(bytes);
    s=bytesToHex(bytes);
    localStorage.setItem(PIN_SALT_KEY,s);
    return s;
  }catch(e){return null;}
}

// PBKDF2-SHA256: the salt stops precomputation; the iterations buy time.
async function derivePinHash(pin,saltHex){
  const salt=new Uint8Array((saltHex.match(/../g)||[]).map(h=>parseInt(h,16)));
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(pin),'PBKDF2',false,['deriveBits']);
  const bits=await crypto.subtle.deriveBits(
    {name:'PBKDF2',salt,iterations:PBKDF2_ITERATIONS,hash:'SHA-256'},key,256);
  return 'v2$'+PBKDF2_ITERATIONS+'$'+bytesToHex(bits);
}

// Don't leak how much of the hash matched via early exit.
function timingSafeEqual(a,b){
  if(typeof a!=='string'||typeof b!=='string')return false;
  if(a.length!==b.length)return false;
  let diff=0;
  for(let i=0;i<a.length;i++)diff|=a.charCodeAt(i)^b.charCodeAt(i);
  return diff===0;
}

// Attempt throttling
function readAttempts(){
  try{const r=JSON.parse(localStorage.getItem(PIN_ATTEMPTS_KEY)||'{}');
    return{count:Number(r.count)||0,until:Number(r.until)||0};}catch(e){return{count:0,until:0};}
}
function writeAttempts(a){try{localStorage.setItem(PIN_ATTEMPTS_KEY,JSON.stringify(a));}catch(e){}}
function clearAttempts(){try{localStorage.removeItem(PIN_ATTEMPTS_KEY);}catch(e){}}
function lockoutRemainingMs(){const a=readAttempts();return Math.max(0,a.until-Date.now());}
function registerFailedAttempt(){
  const a=readAttempts();
  a.count+=1;
  // First 4 are free; then 15s, 30s, 60s, 2m, 5m, capped at 15m.
  if(a.count>=5){
    const steps=[15e3,30e3,60e3,120e3,300e3,900e3];
    a.until=Date.now()+steps[Math.min(a.count-5,steps.length-1)];
  }
  writeAttempts(a);
  return a;
}
function fmtLockout(ms){
  const s=Math.ceil(ms/1000);
  if(s<60)return s+'s';
  return Math.ceil(s/60)+' min';
}
function hasPinSet(){try{return!!localStorage.getItem(PIN_KEY);}catch(e){return false;}}
function syncAppLockUI(){
  const has=hasPinSet();
  const t=el('tog-appLock');if(t){t.className='toggle'+(has?' on':'');t.setAttribute('aria-checked',has?'true':'false');}
  const sub=el('appLockSub');if(sub)sub.textContent=has?'On, PIN required to open the app on this device':'Off, anyone can open the app';
  const chg=el('changePinRow');if(chg)chg.style.display=has?'flex':'none';
  const alr=el('autoLockRow');if(alr)alr.style.display=has?'block':'none';
  if(has&&el('autoLockWrap'))buildCustomSelect('autoLockWrap',[{value:'immediate',label:'Immediately'},{value:'1min',label:'After 1 minute'},{value:'5min',label:'After 5 minutes'},{value:'15min',label:'After 15 minutes'}],state.settings.autoLockDelay||'immediate',v=>{state.settings.autoLockDelay=v;saveState();});
}
async function onAppLockToggleClick(){
  if(hasPinSet()){
    if(!await askConfirm({title:'Turn off App Lock?',message:'Your PIN will be removed from this device and the app will open without one.',confirmText:'Turn off'}))return;
    try{localStorage.removeItem(PIN_KEY);localStorage.removeItem(PIN_SALT_KEY);}catch(e){}
    clearAttempts();
    syncAppLockUI();haptic('tap');toast('App Lock turned off','success');
  }else{
    if(!supabaseUser){
      if(!await askConfirm({title:'No way to recover this PIN',message:'You\u2019re not signed in to an account, so there\u2019s no way to recover a forgotten PIN, the only fallback would be clearing all app data, which deletes everything stored on this device. Continue anyway?',confirmText:'Set PIN anyway',cancelText:'Go back',danger:false}))return;
    }
    startPinSetup(false);
  }
}
let lockDismissable=false;
function startPinSetup(isChange){
  pinMode='setup-first';pinFirstEntry='';pinEntry='';
  el('lockTitle').textContent=isChange?'Enter a new PIN':'Set a PIN';
  el('lockError').innerHTML='&nbsp;';
  renderLockDots();
  el('lockPinView').style.display='flex';el('lockRecoveryView').style.display='none';
  el('lockForgotBtn').style.display='none';
  // Setting a PIN is always escapable; only unlocking is not.
  lockDismissable=true;
  el('lockCloseBtn').style.display='flex';
  el('lockScreen').classList.add('open');
  syncBodyScrollLock();
  if(lockDismissable)pushModalHistory();
}
function showLockScreen(){
  pinMode='verify';pinEntry='';
  el('lockTitle').textContent='Enter PIN';
  el('lockError').innerHTML='&nbsp;';
  renderLockDots();
  el('lockPinView').style.display='flex';el('lockRecoveryView').style.display='none';
  el('lockForgotBtn').style.display=supabaseUser?'block':'none';
  lockDismissable=false;
  el('lockCloseBtn').style.display='none';
  el('lockScreen').classList.add('open');
  syncBodyScrollLock();
}
function hideLockScreen(){el('lockScreen').classList.remove('open');pinMode=null;syncBodyScrollLock(); /* Backing out of setup leaves no PIN; show the toggle off. */ try{syncAppLockUI();}catch(e){}}
function dismissLockScreen(){
  if(!lockDismissable)return;
  hideLockScreen();popModalHistoryIfNeeded();
}
function showLockRecovery(){
  el('lockPinView').style.display='none';el('lockRecoveryView').style.display='flex';
  el('lockRecoveryPass').value='';el('lockRecoveryError').textContent='';
  setTimeout(()=>el('lockRecoveryPass').focus(),100);
}
function cancelLockRecovery(){
  el('lockPinView').style.display='block';el('lockRecoveryView').style.display='none';
  pinEntry='';renderLockDots();
}
async function confirmLockRecovery(){
  const pass=el('lockRecoveryPass').value;
  if(!pass){el('lockRecoveryError').textContent='Enter your password';return;}
  if(!supabaseUser||!supabaseUser.email){el('lockRecoveryError').textContent='No account found on this device';return;}
  const btn=el('lockRecoveryBtn');btn.disabled=true;btn.textContent='Checking…';
  try{
    const{data,error}=await sbClient.auth.signInWithPassword({email:supabaseUser.email,password:pass});
    if(error||!data||!data.user){el('lockRecoveryError').textContent='Incorrect password';btn.disabled=false;btn.textContent='Remove PIN';haptic('error');return;}
    try{localStorage.removeItem(PIN_KEY);localStorage.removeItem(PIN_SALT_KEY);}catch(e){}
    clearAttempts();
    appUnlocked=true;hideLockScreen();syncAppLockUI();renderSettings();haptic('success');toast('PIN removed for this device','success');
  }catch(e){el('lockRecoveryError').textContent='Something went wrong, try again';btn.disabled=false;btn.textContent='Remove PIN';}
}
function renderLockDots(){const dots=el('lockDots').querySelectorAll('span');dots.forEach((d,i)=>d.classList.toggle('filled',i<pinEntry.length));}
function lockShake(msg){const dd=el('lockDots');dd.classList.remove('shake');void dd.offsetWidth;dd.classList.add('shake');el('lockError').textContent=msg||'Incorrect PIN';haptic('error');pinEntry='';renderLockDots();}
async function lockKeyPress(d){
  if(pinEntry.length>=4)return;
  pinEntry+=d;renderLockDots();haptic('tap');
  if(pinEntry.length<4)return;
  if(pinMode==='setup-first'){
    pinFirstEntry=pinEntry;pinEntry='';
    setTimeout(()=>{el('lockTitle').textContent='Confirm your PIN';renderLockDots();pinMode='setup-confirm';},150);
    return;
  }
  if(pinMode==='setup-confirm'){
    if(pinEntry!==pinFirstEntry){lockShake('PINs didn\u2019t match, try again');setTimeout(()=>{el('lockTitle').textContent='Set a PIN';pinMode='setup-first';pinFirstEntry='';},500);return;}
    // Without WebCrypto only a reversible hash is possible; refuse instead.
    if(!hasWebCrypto()){
      lockShake('App Lock needs a secure (https) connection');
      setTimeout(()=>{hideLockScreen();syncAppLockUI();
        toast('App Lock needs HTTPS, open the site over https:// and try again','error');},900);
      pinMode=null;pinFirstEntry='';pinEntry='';
      return;
    }
    const salt=getOrCreateSalt();
    if(!salt){lockShake('Couldn\u2019t save the PIN on this device');return;}
    const hash=await derivePinHash(pinEntry,salt);
    try{localStorage.setItem(PIN_KEY,hash);}catch(e){
      lockShake('Couldn\u2019t save the PIN on this device');return;}
    clearAttempts();
    appUnlocked=true;hideLockScreen();syncAppLockUI();renderSettings();haptic('success');toast('App Lock enabled','success');
    return;
  }
  if(pinMode==='verify'){
    const waitMs=lockoutRemainingMs();
    if(waitMs>0){
      lockShake('Too many attempts, wait '+fmtLockout(waitMs));
      return;
    }
    let stored=null;try{stored=localStorage.getItem(PIN_KEY);}catch(e){}
    let ok=false,needsUpgrade=false;

    if(stored&&stored.startsWith('v2$')){
      const salt=getOrCreateSalt();
      if(salt&&hasWebCrypto()){
        try{ok=timingSafeEqual(await derivePinHash(pinEntry,salt),stored);}catch(e){ok=false;}
      }
    }else if(stored){
      // Legacy unsalted hash: verify once, then re-store as PBKDF2.
      ok=timingSafeEqual(await legacySha256Hex(pinEntry),stored);
      needsUpgrade=ok;
    }

    if(ok){
      if(needsUpgrade&&hasWebCrypto()){
        try{
          const salt=getOrCreateSalt();
          if(salt)localStorage.setItem(PIN_KEY,await derivePinHash(pinEntry,salt));
        }catch(e){}
      }
      clearAttempts();
      appUnlocked=true;_hiddenAt=null;hideLockScreen();haptic('success');
    }else{
      const a=registerFailedAttempt();
      const remain=lockoutRemainingMs();
      if(remain>0)lockShake('Too many attempts, wait '+fmtLockout(remain));
      else if(a.count>=3)lockShake('Incorrect PIN, '+(5-a.count)+' left before a delay');
      else lockShake();
    }
    return;
  }
}
function lockKeyBackspace(){if(!pinEntry.length)return;pinEntry=pinEntry.slice(0,-1);renderLockDots();haptic('tap');}
function checkAppLockOnLoad(){if(hasPinSet()){appUnlocked=false;showLockScreen();}else{appUnlocked=true;}}
let _hiddenAt=null;
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){_hiddenAt=Date.now();return;}
  if(!hasPinSet()||pinMode==='setup-first'||pinMode==='setup-confirm')return;
  const delayMin={immediate:0,'1min':1,'5min':5,'15min':15}[state.settings.autoLockDelay||'immediate'];
  const elapsedMin=_hiddenAt?(Date.now()-_hiddenAt)/60000:Infinity;
  if(elapsedMin>=delayMin){appUnlocked=false;showLockScreen();}
});
// TICKER
let modalStack=[],lastFocus=null;
function renderTicker(){}
// Only the top sheet is visible; the ones beneath are covered.
function syncModalCover(){
  const top=modalStack[modalStack.length-1];
  modalStack.forEach(id=>{
    const m=el(id);if(!m)return;
    m.classList.toggle('covered',id!==top);
    // Covered sheets take no taps and are hidden from screen readers.
    m.setAttribute('aria-hidden',id===top?'false':'true');
  });
}
function syncBodyScrollLock(){
  const anyOpen=modalStack.length>0||
    (el('lockScreen')&&el('lockScreen').classList.contains('open'))||
    (el('shortcutsHelp')&&el('shortcutsHelp').classList.contains('open'))||
    (el('authModal')&&el('authModal').classList.contains('open'))||
    (el('onbOverlay')&&el('onbOverlay').classList.contains('open'))||
    (el('cmdk')&&el('cmdk').classList.contains('open'));
  // Both html and body: html has overflow-x:clip, so the viewport ignores body overflow.
  document.body.classList.toggle('modal-open',!!anyOpen);
  document.documentElement.classList.toggle('modal-open',!!anyOpen);
}
// SHEETS AND THE BACK BUTTON
// Each open sheet pushes one history entry so Back closes it. Entries carry a token;
// closing only unwinds history if the top entry is still this sheet's, so stacked
// sheets and same-tick close+open stay in step.
let _suppressHistoryPop=false,_selfPop=false;
let _modalHistIds=[];
function pushModalHistory(){
  const id='mh'+(Date.now().toString(36))+Math.random().toString(36).slice(2,7);
  _modalHistIds.push(id);
  try{history.pushState({pfModal:true,mhId:id},'');}catch(e){}
}
function anyOverlayOpen(){return modalStack.length>0||
  (el('shortcutsHelp')&&el('shortcutsHelp').classList.contains('open'))||
  (el('authModal')&&el('authModal').classList.contains('open'))||
  (el('onbOverlay')&&el('onbOverlay').classList.contains('open'))||
  (el('cmdk')&&el('cmdk').classList.contains('open'));}
function closeTopmostOverlay(){
  if(el('cmdk')&&el('cmdk').classList.contains('open')){closePalette();return true;}
  if(el('shortcutsHelp')&&el('shortcutsHelp').classList.contains('open')){toggleShortcutsHelp();return true;}
  if(el('lockScreen')&&el('lockScreen').classList.contains('open')&&lockDismissable){hideLockScreen();return true;}
  if(el('authModal')&&el('authModal').classList.contains('open')&&!authRequired){closeAuthModal();return true;}
  if(el('tourOverlay')&&el('tourOverlay').classList.contains('open')){endTour();return true;}
  if(modalStack.length){closeModal(modalStack[modalStack.length-1]);return true;}
  return false;
}
window.addEventListener('popstate',()=>{
  // Our own unwind, from the close that pushed us here. Already accounted for.
  if(_selfPop){_selfPop=false;return;}
  _suppressHistoryPop=true;
  const closed=closeTopmostOverlay();
  if(closed)_modalHistIds.pop();
  setTimeout(()=>{_suppressHistoryPop=false;},50);
});
window.addEventListener('beforeunload',(e)=>{
  const formModalIds=['addAssetModal','addDebtModal','addGoalModal','addRecurModal'];
  const hasUnsaved=formModalIds.some(id=>{
    const m=el(id);if(!m||!m.classList.contains('open'))return false;
    return Array.from(m.querySelectorAll('input[type="text"],input[type="number"],input:not([type]),textarea')).some(inp=>inp.value&&inp.value.trim()!=='');
  });
  if(hasUnsaved){e.preventDefault();e.returnValue='';return '';}
  // Flush a pending cloud push before unload (best effort).
  if(typeof schedulePush==='function'&&typeof pushToCloud==='function'&&supabaseUser){clearTimeout(window._syncDebounceTimerRef);pushToCloud();}
});
// Ignore overlay clicks on a sheet that has only just opened.
function justOpened(m){
  const t=m&&Number(m.dataset&&m.dataset.openedAt);
  return !!t&&(Date.now()-t)<400;
}
function openModal(id){const m=el(id);if(!m)return;lastFocus=document.activeElement; /* Stamp the open time so the opening tap's synthetic click is ignored (justOpened). */ m.dataset.openedAt=String(Date.now());m.classList.add('open');m.setAttribute('aria-hidden','false');modalStack.push(id);syncModalCover();haptic('tap');syncBodyScrollLock();pushModalHistory();
  // Focus the sheet, not an input, so the keyboard does not cover it.
  setTimeout(()=>{const f=m.querySelector('.modal-sheet')||m;
    try{f.setAttribute('tabindex','-1');f.focus({preventScroll:true});}catch(e){}
    // Re-measure scroll hints now the sheet has a width.
    try{ bindScrollHints(m); }catch(e){}},120);}
function closeModal(id,skipHistoryPop){const m=el(id);if(!m)return;if(id==='aiModal')releaseAiViewport();if(id==='assetDetailModal')parkPnlCal();m.classList.remove('open');m.classList.remove('covered');m.setAttribute('aria-hidden','true');modalStack=modalStack.filter(x=>x!==id);syncModalCover();syncBodyScrollLock();if(!skipHistoryPop)popModalHistoryIfNeeded();if(lastFocus&&!modalStack.length){try{lastFocus.focus();}catch(e){}}}
// Sheets stack: closing one uncovers the one beneath.
function popModalHistoryIfNeeded(){
  if(_suppressHistoryPop)return;
  const want=_modalHistIds.pop();
  if(!want)return;
  let cur=null;try{cur=history.state;}catch(e){}
  if(!(cur&&cur.pfModal&&cur.mhId===want))return;
  _selfPop=true;_suppressHistoryPop=true;
  try{history.back();}catch(e){}
  setTimeout(()=>{_suppressHistoryPop=false;_selfPop=false;},50);
}
function bindModalOverlays(){document.querySelectorAll('.modal-overlay').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)closeModal(o.id);}));}
// CUSTOM SELECT
function buildCustomSelect(cid,options,cur,onChange){const wrap=el(cid);if(!wrap)return;const c=options.find(o=>o.value===cur)||options[0];
  wrap.innerHTML=`<div class="custom-select-trigger" id="cst-${cid}" tabindex="0" role="button" aria-haspopup="listbox"><span class="cst-label">${c.label}</span><svg class="caret" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div><div class="custom-select-dropdown" id="csd-${cid}" role="listbox">${options.map(o=>`<div class="csd-opt ${o.value===cur?'active':''}" data-val="${o.value}" role="option"><span class="csd-opt-name">${o.label}</span>${o.sub?`<span class="csd-opt-sub">${o.sub}</span>`:''}</div>`).join('')}</div>`;
  const trig=el('cst-'+cid),dd=el('csd-'+cid);trig.addEventListener('click',e=>{e.stopPropagation();document.querySelectorAll('.custom-select-trigger.open').forEach(t=>{if(t!==trig){t.classList.remove('open');const d=el('csd-'+t.id.replace('cst-',''));if(d){d.classList.remove('open');d.classList.remove('drop-up');}}});
    const opening=!trig.classList.contains('open');
    if(opening){const r=trig.getBoundingClientRect();const estH=Math.min(220,options.length*40+8);dd.classList.toggle('drop-up',r.bottom+estH>window.innerHeight-16&&r.top-estH>8);trig.scrollIntoView({block:'center',behavior:'smooth'});}
    trig.classList.toggle('open');dd.classList.toggle('open');});
  const opts=()=>[...dd.querySelectorAll('.csd-opt')];
  const choose=opt=>{
    if(!opt)return;
    const v=opt.dataset.val,ch=options.find(o=>o.value===v)||options[0];
    trig.querySelector('.cst-label').textContent=ch.label;
    opts().forEach(o=>{o.classList.remove('active');o.setAttribute('aria-selected','false');});
    opt.classList.add('active');opt.setAttribute('aria-selected','true');
    trig.classList.remove('open');dd.classList.remove('open');
    trig.setAttribute('aria-expanded','false');
    if(onChange)onChange(v);
  };
  opts().forEach(opt=>opt.addEventListener('click',e=>{e.stopPropagation();choose(opt);}));
  // Keyboard: arrows move, Enter/Space pick, Escape closes and refocuses the trigger.
  let hi=Math.max(0,options.findIndex(o=>o.value===cur));
  const paintHi=()=>{
    const list=opts();
    list.forEach((o,i)=>o.classList.toggle('hi',i===hi));
    const n=list[hi];
    if(n){n.scrollIntoView({block:'nearest'});
      if(!n.id)n.id='csd-'+cid+'-opt'+hi;
      dd.setAttribute('aria-activedescendant',n.id);}
  };
  const openIt=()=>{ if(!trig.classList.contains('open'))trig.click(); paintHi(); };
  trig.addEventListener('keydown',e=>{
    const k=e.key;
    // The document handler also clicks role=button on Enter/Space; stop it here.
    if(k==='Enter'||k===' '||k==='Spacebar'||k==='Escape'||k.startsWith('Arrow')||k==='Home'||k==='End')e.stopPropagation();
    if(k==='Enter'||k===' '||k==='Spacebar'){
      e.preventDefault();
      if(trig.classList.contains('open'))choose(opts()[hi]); else openIt();
      return;
    }
    if(k==='ArrowDown'||k==='ArrowUp'){
      e.preventDefault();
      if(!trig.classList.contains('open')){openIt();return;}
      hi=Math.max(0,Math.min(options.length-1,hi+(k==='ArrowDown'?1:-1)));
      paintHi();return;
    }
    if(k==='Home'||k==='End'){
      if(!trig.classList.contains('open'))return;
      e.preventDefault();hi=k==='Home'?0:options.length-1;paintHi();return;
    }
    if(k==='Escape'&&trig.classList.contains('open')){
      e.preventDefault();trig.classList.remove('open');dd.classList.remove('open');
      trig.setAttribute('aria-expanded','false');trig.focus();return;
    }
    // Type the first letter to jump, like a real select.
    if(k.length===1&&/\S/.test(k)){
      const q=k.toLowerCase();
      const from=(hi+1)%options.length;
      for(let i=0;i<options.length;i++){
        const j=(from+i)%options.length;
        if(String(options[j].label||'').toLowerCase().startsWith(q)){
          hi=j; if(!trig.classList.contains('open'))openIt(); else paintHi(); break;
        }
      }
    }
  });
  trig.addEventListener('click',()=>{
    trig.setAttribute('aria-expanded',trig.classList.contains('open')?'true':'false');
    if(trig.classList.contains('open'))paintHi();
  });
  opts().forEach((o,i)=>{o.setAttribute('aria-selected',o.classList.contains('active')?'true':'false');
    o.addEventListener('mousemove',()=>{hi=i;paintHi();});});
  trig.setAttribute('aria-expanded','false');
}
// ASSET TYPE ROW
function renderAssetTypeRow(){el('assetTypeRow').innerHTML=ASSET_TYPES.map(t=>`<button class="atype-btn ${t.id===selectedAssetType?'active':''}" onclick="setAssetType('${t.id}')">${t.svg}<span>${t.label}</span></button>`).join('');}
function setAssetType(t){if(t===selectedAssetType)return;selectedAssetType=t;state.settings.lastAssetType=t;saveState();haptic('tap');if(t==='stock')ensureNepsePrices();renderAssetTypeRow();
  el('assetQty').value='';el('assetBuyPrice').value='';el('assetCurrentPrice').value='';el('assetName').value='';el('assetNotes').value='';
  el('cryptoSearch').value='';el('cryptoSuggestions').style.display='none';el('cryptoPriceHint').style.display='none';
  el('stockSearch').value='';el('stockSuggestions').style.display='none';el('stockHint').style.display='none';
  selectedCoinId=null;selectedCoinName=null;selectedCoinImage=null;selectedStockSym=null;selectedStockName=null;selectedStockIsNepse=false;
  buyPriceEntryCcy=null;currentPriceEntryCcy=null;isPricePerUnitMode=true;
  buildCompactCcySelect('buyPriceCcyWrap',null,onBuyPriceCcyChange);buildCompactCcySelect('currentPriceCcyWrap',null,onCurrentPriceCcyChange);
  const hint=el('buyPriceHint');if(hint)hint.style.display='none';
  updateAssetFormFields();}
function updateAssetFormFields(){const isC=selectedAssetType==='crypto',isS=selectedAssetType==='stock',isCo=selectedAssetType==='commodity',isL=selectedAssetType==='liquidity',isP=selectedAssetType==='property';
  el('cryptoSearchRow').style.display=isC?'block':'none';el('stockRow').style.display=isS?'block':'none';el('commodityRow').style.display=isCo?'block':'none';el('liquidityFields').style.display=isL?'block':'none';el('qtyPriceFields').style.display=isL?'none':'block';el('propertyIconRow').style.display=isP?'block':'none';el('assetNameRow').style.display=(isC||isCo||isS||isL)?'none':'block';el('assetDateRow').style.display=isL?'none':'block';el('qtyLabel').textContent=isCo?unitQtyLabel(selectedCommodityUnit||(COMMODITIES.find(c=>c.id===selectedCommodityId)||COMMODITIES[0]).defaultUnit):'QUANTITY';const qtyWrap=el('qtyWrapper');if(qtyWrap)qtyWrap.style.display=isP?'none':'';const qRow=el('qtyPriceRow');if(qRow)qRow.style.gridTemplateColumns=isP?'1fr':'1fr 1fr';
  if(isCo)buildCommoditySelects();if(isL){buildLiquiditySelect();onLiquidityNameInput();}if(isP)renderPropertyTypeRow();if(isS)syncNepseToggle();updateCurrentPriceVisibility();updateBuyPriceLbl();updateBuyPriceHint();}
function isTotalInvestedMode(){return selectedAssetType!=='liquidity';}
function assetTypeHasQty(){return selectedAssetType!=='liquidity'&&selectedAssetType!=='property';}
function autoFillBuyPriceFromLive(){
  const qty=parseFloat(el('assetQty').value)||0;
  if(qty<=0)return;
  const inp=el('assetBuyPrice');
  if(!inp)return;
  let perUnitInCcy=null;
  const rate=getCurrRate(buyPriceEntryCcy||currentCurrency.code);
  if(selectedAssetType==='crypto'){
    if(!selectedCoinId||!livePrices[selectedCoinId])return;
    const priceUsd=livePrices[selectedCoinId].usd;
    perUnitInCcy=usdToNpr(priceUsd)*rate;
  } else if(selectedAssetType==='commodity'){
    const comm=COMMODITIES.find(c=>c.id===selectedCommodityId)||COMMODITIES[0];
    if(!comm.coinGeckoId||!livePrices[comm.coinGeckoId])return;
    const lp=livePrices[comm.coinGeckoId];
    const u=selectedCommodityUnit||comm.defaultUnit;
    let dpNpr;
    if(lp.nepalTolaNpr){
      if(u==='tola')dpNpr=lp.nepalTolaNpr;
      else if(u==='gram')dpNpr=lp.nepalGramNpr||lp.nepalTolaNpr/TOLA_IN_GRAMS;
      else if(u==='troy oz')dpNpr=lp.nepalTolaNpr/TOLA_IN_GRAMS*31.1035;
      else if(u==='kg')dpNpr=(lp.nepalGramNpr||lp.nepalTolaNpr/TOLA_IN_GRAMS)*1000;
    } else {
      let oz=lp.usd,dp=oz;
      if(u==='gram')dp=oz/31.1035;
      else if(u==='tola')dp=oz/31.1035*TOLA_IN_GRAMS;
      else if(u==='kg')dp=oz/31.1035*1000;
      dpNpr=usdToNpr(dp);
    }
    perUnitInCcy=dpNpr*rate;
  } else if(selectedAssetType==='stock'){
    const q=selectedStockSym?nepsePrices[String(selectedStockSym).toUpperCase()]:null;
    if(!q||!(q.price>0))return;
    perUnitInCcy=nprToBase(q.price)*rate;
  } else return;
  inp.value=isPricePerUnitMode?perUnitInCcy.toFixed(2):(perUnitInCcy*qty).toFixed(2);
  updateBuyPriceHint();
}
function autoFillBuyPriceFromCurrent(){
  // No live feed: Current Price × Quantity pre-fills Buy Price.
  if(selectedAssetType==='crypto'||selectedAssetType==='liquidity')return;
  if(selectedAssetType==='commodity'){
    const comm=COMMODITIES.find(c=>c.id===selectedCommodityId)||COMMODITIES[0];
    if(comm.coinGeckoId&&livePrices[comm.coinGeckoId])return; // has live price, handled elsewhere
  }
  const cpInp=el('assetCurrentPrice');
  if(!cpInp)return;
  const cpVal=parseFloat(cpInp.value)||0;
  if(cpVal<=0)return;
  const inp=el('assetBuyPrice');
  if(!inp)return;
  // Convert entered current price (in its own currency) into the buy-price field's currency
  const cpRate=getCurrRate(currentPriceEntryCcy||currentCurrency.code);
  const bpRate=getCurrRate(buyPriceEntryCcy||currentCurrency.code);
  const perUnitInBpCcy=(cpVal/cpRate)*bpRate;
  const qty=selectedAssetType==='property'?1:(parseFloat(el('assetQty').value)||0);
  if(selectedAssetType!=='property'&&qty<=0)return;
  inp.value=isPricePerUnitMode?perUnitInBpCcy.toFixed(2):(perUnitInBpCcy*qty).toFixed(2);
  updateBuyPriceHint();
}
function updateBuyPriceLbl(){
  const lbl=el('buyPriceLbl'),seg=el('priceModeSeg');if(!lbl)return;
  const canToggle=assetTypeHasQty();
  if(seg)seg.style.display=canToggle?'inline-flex':'none';
  if(!canToggle)isPricePerUnitMode=false; // only asset types with a quantity field support this toggle
  if(!canToggle){lbl.textContent='BUY PRICE';}
  else{lbl.textContent=isPricePerUnitMode?'BUY PRICE PER UNIT':'TOTAL BUY PRICE';}
  const segTotal=el('priceModeSegTotal'),segUnit=el('priceModeSegUnit');
  if(segTotal)segTotal.className='seg-btn'+(isPricePerUnitMode?'':' active');
  if(segUnit)segUnit.className='seg-btn'+(isPricePerUnitMode?' active':'');
  const inp=el('assetBuyPrice');if(inp)inp.placeholder='0.00';
}
function setPriceEntryMode(perUnit){
  if(perUnit===isPricePerUnitMode)return;
  const qty=parseFloat(el('assetQty').value)||0;
  const inp=el('assetBuyPrice');
  const val=parseFloat(inp.value)||0;
  if(qty>0&&val>0){
    // Convert the currently-entered number so switching modes doesn't lose the user's data
    inp.value=isPricePerUnitMode?(val*qty).toFixed(8).replace(/\.?0+$/,''):(val/qty).toFixed(8).replace(/\.?0+$/,'');
  }
  isPricePerUnitMode=perUnit;
  updateBuyPriceLbl();
  updateBuyPriceHint();
  haptic('tap');
}
function updateBuyPriceHint(){
  const hint=el('buyPriceHint');if(!hint)return;
  if(!assetTypeHasQty()){hint.style.display='none';return;}
  const qty=parseFloat(el('assetQty').value);
  const entered=parseFloat(el('assetBuyPrice').value);
  const ccy=buyPriceEntryCcy||currentCurrency.code;
  if(qty>0&&entered>0){
    if(isPricePerUnitMode){
      const total=(entered*qty);
      hint.style.display='block';
      hint.textContent='\u2192 total: '+total.toFixed(2)+' '+ccy;
    }else{
      const perUnit=(entered/qty);
      hint.style.display='block';
      hint.textContent='\u2192 '+perUnit.toFixed(8).replace(/\.?0+$/,'')+' '+ccy+' per unit';
    }
  }else{hint.style.display='none';}
}
function updateCurrentPriceVisibility(){
  // Hidden when adding; current price is set from the asset's detail sheet.
  const row=el('currentPriceRow');
  if(row)row.style.display='none';
}
function buildCommoditySelects(){buildCustomSelect('commoditySelectWrap',COMMODITIES.map(c=>({value:c.id,label:c.label})),selectedCommodityId||'gold',v=>{selectedCommodityId=v;state.settings.lastCommodityId=v;saveState();updateCommodityUnit();updateCommodityPriceHint();updateCurrentPriceVisibility();updateBuyPriceLbl();autoFillBuyPriceFromLive();updateBuyPriceHint();});updateCommodityUnit();updateCommodityPriceHint();updateCurrentPriceVisibility();}
function updateCommodityUnit(){const comm=COMMODITIES.find(c=>c.id===selectedCommodityId)||COMMODITIES[0];buildCustomSelect('commodityUnitWrap',comm.unitOptions.map(u=>({value:u,label:u})),selectedCommodityUnit||comm.defaultUnit,v=>{selectedCommodityUnit=v;state.settings.lastCommodityUnit=v;saveState();updateCommodityPriceHint();const ql=el('qtyLabel');if(ql)ql.textContent=unitQtyLabel(v);autoFillBuyPriceFromLive();updateBuyPriceHint();});selectedCommodityUnit=selectedCommodityUnit||comm.defaultUnit;const ql0=el('qtyLabel');if(ql0)ql0.textContent=unitQtyLabel(selectedCommodityUnit);}
function updateCommodityPriceHint(){
  const comm=COMMODITIES.find(c=>c.id===selectedCommodityId)||COMMODITIES[0],h=el('commodityPriceHint');
  if(!h)return;
  if(comm.coinGeckoId&&livePrices[comm.coinGeckoId]){
    const lp=livePrices[comm.coinGeckoId];
    const u=selectedCommodityUnit||comm.defaultUnit;
    let displayPrice;
    // Use Nepal-specific prices if available
    if(lp.nepalTolaNpr){
      if(u==='tola')displayPrice=lp.nepalTolaNpr;
      else if(u==='gram')displayPrice=lp.nepalGramNpr||lp.nepalTolaNpr/TOLA_IN_GRAMS;
      else if(u==='troy oz')displayPrice=lp.nepalTolaNpr/TOLA_IN_GRAMS*31.1035;
      else if(u==='kg')displayPrice=(lp.nepalGramNpr||lp.nepalTolaNpr/TOLA_IN_GRAMS)*1000;
      h.style.display='block';h.className='form-hint green';
      h.textContent=`Nepal market: ${fmt(displayPrice)} per ${u}`;
    } else {
      let oz=lp.usd,dp=oz;
      if(u==='gram')dp=oz/31.1035;
      else if(u==='tola')dp=oz/31.1035*TOLA_IN_GRAMS;
      else if(u==='kg')dp=oz/31.1035*1000;
      h.style.display='block';h.className='form-hint green';
      h.textContent=`Live: ${fmt(usdToNpr(dp))} per ${u}`;
    }
  } else if(!comm.coinGeckoId){
    h.style.display='block';h.className='form-hint';
    h.textContent='No live price available, enter buy price manually';
  } else h.style.display='none';
}
// NAME SUGGESTIONS
// Our own list instead of <datalist>, which many mobile browsers do not show.
function nameSuggestions(box,input,items,onPick){
  if(!box||!input)return;
  const q=(input.value||'').trim().toLowerCase();
  if(!q){box.style.display='none';box.innerHTML='';return;}
  // Exact match first, then prefix, then contains.
  const hits=items.map(it=>{
    const nm=(it.name||'').toLowerCase();
    const rank=nm===q?0:(nm.startsWith(q)?1:(nm.includes(q)?2:-1));
    return rank<0?null:{it,rank};
  }).filter(Boolean).sort((a,b)=>a.rank-b.rank).slice(0,6).map(x=>x.it);
  if(!hits.length){box.style.display='none';box.innerHTML='';return;}
  box.innerHTML=hits.map((it,i)=>
    `<div class="coin-sug-item" role="button" tabindex="0" data-i="${i}">`
    +`<div class="coin-sug-img" style="background:var(--bg3);display:flex;align-items:center;`
    +`justify-content:center;color:var(--text3)">${svgIcon(it.icon||'wallet',14)}</div>`
    +`<div><div class="coin-sug-name">${esc(it.name)}</div>`
    +`<div class="coin-sug-sym">${esc(it.sub||'')}</div></div></div>`
  ).join('');
  box.querySelectorAll('.coin-sug-item').forEach(node=>{
    node.addEventListener('click',()=>{
      const it=hits[+node.dataset.i];
      input.value=it.name;
      box.style.display='none';
      if(onPick)onPick(it);
      haptic('tap');
    });
    node.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();node.click();}
    });
  });
  box.style.display='block';
}
// Carries the whole asset so picking it adopts everything.
function assetSuggestion(a,showCat){
  const bits=[];
  if(a.category==='liquidity')bits.push(a.liquidityType||'Account');
  else if(a.qty!=null)bits.push(qtyWithUnit(a));
  if(showCat)bits.push(catLabel(a.category));
  bits.push(fmt(a.category==='liquidity'?(a.value||0):getAssetCurrentValue(a)));
  return {name:a.name,icon:a.icon,sub:bits.join(' · '),asset:a};
}
// Only holdings of the selected type.
function assetsOfCategory(cat){
  return (state.assets||[])
    .filter(a=>a&&a.category===cat&&a.id!==editingAssetId)
    .map(a=>assetSuggestion(a,false));
}
// The liquidity dropdown stores a key; the asset stores the label it produced.
const LIQ_KEY_BY_LABEL={'Savings Account':'savings','Current Account':'current',
  'Fixed Deposit (FD)':'fd','Cash in Hand':'cash','Digital Wallet':'digital','Other':'other'};
// Picking a holding makes the form that holding (type, subtype, ticker, unit, NEPSE flag).
function adoptAsset(a){
  if(!a)return;
  if(selectedAssetType!==a.category)setAssetType(a.category);
  selectedCoinId=a.coinId||null;
  selectedCoinName=a.coinId?a.name:null;
  selectedCoinImage=a.coinImage||null;
  if(a.category==='commodity'){
    selectedCommodityId=a.commodityId||'gold';
    selectedCommodityUnit=a.unit||'gram';
    state.settings.lastCommodityId=selectedCommodityId;
    state.settings.lastCommodityUnit=selectedCommodityUnit;
    buildCommoditySelects();
  }else if(a.category==='stock'){
    selectedStockSym=a.ticker||a.name;selectedStockName=a.name;
    selectedStockIsNepse=!!a.isNepse;
    const si=el('stockSearch');if(si)si.value=a.name;
    const sb=el('stockSuggestions');if(sb)sb.style.display='none';
    syncNepseToggle();
  }else if(a.category==='crypto'){
    const ci=el('cryptoSearch');if(ci)ci.value=a.name;
    const cb=el('cryptoSuggestions');if(cb)cb.style.display='none';
    if(a.coinId&&livePrices[a.coinId]){
      const h=el('cryptoPriceHint');
      if(h){h.style.display='block';h.textContent='Live: '+fmt(usdToBase(livePrices[a.coinId].usd))+' per unit';}
    }
  }else if(a.category==='liquidity'){
    selectedLiquidityType=LIQ_KEY_BY_LABEL[a.liquidityType]||'savings';
    state.settings.lastLiquidityType=selectedLiquidityType;
    buildLiquiditySelect();
    const li=el('liquidityName');if(li)li.value=a.name;
    if(a.interest!=null)el('liquidityInterest').value=a.interest;
    if(a.maturity)el('liquidityMaturity').value=a.maturity;
  }else if(a.category==='property'){
    selectedPropertyType=a.propertyType||'house';
    renderPropertyTypeRow();
  }
  if(a.category==='property'||a.category==='other'){
    const ni=el('assetName');if(ni)ni.value=a.name;
    const nb=el('assetNameSuggest');if(nb)nb.style.display='none';
  }
  if(a.unit)state.settings.lastTxUnit&&(state.settings.lastTxUnit[a.category]=a.unit);
  saveState();
  updateAssetFormFields();updateBuyPriceLbl();updateBuyPriceHint();
  if(a.category==='liquidity'){
    onLiquidityNameInput();
    // That refresh would re-open the dropdown on the name it just filled in.
    const sb=el('liquidityNameSuggest');if(sb)sb.style.display='none';
  }
  // Say plainly that this will merge rather than create a second entry.
  toast('Adding to '+stripParens(a.name),'success');
}
// Property and 'other' share one name field.
function onAssetNameInput(){
  nameSuggestions(el('assetNameSuggest'),el('assetName'),assetsOfCategory(selectedAssetType),
    it=>adoptAsset(it.asset));
}
function onLiquidityNameInput(){
  const hint=el('liquidityNameHint'),inp=el('liquidityName');
  if(!hint||!inp)return;
  nameSuggestions(el('liquidityNameSuggest'),inp,assetsOfCategory('liquidity'),
    it=>{adoptAsset(it.asset);onLiquidityNameInput();});
  const v=(inp.value||'').trim().toLowerCase();
  const match=cashAccounts().find(a=>a.name.toLowerCase()===v&&a.id!==editingAssetId);
  if(match){
    hint.textContent='Adds to '+match.name+', currently '+fmt(match.value||0)+'.';
    hint.style.display='';
  }else hint.style.display='none';
}
function buildLiquiditySelect(){buildCustomSelect('liquidityTypeWrap',[{value:'savings',label:'Savings Account'},{value:'current',label:'Current Account'},{value:'fd',label:'Fixed Deposit (FD)'},{value:'cash',label:'Cash in Hand'},{value:'digital',label:'Digital Wallet'},{value:'other',label:'Other'}],selectedLiquidityType||'savings',v=>{selectedLiquidityType=v;state.settings.lastLiquidityType=v;saveState();syncLiquidityFields();});syncLiquidityFields();}
// Cash and wallets have no rate or maturity; savings has a rate only.
function syncLiquidityFields(){
  const t=selectedLiquidityType||'savings';
  const earns=(t==='savings'||t==='fd'||t==='current'||t==='other');
  const matures=(t==='fd');
  const ir=el('liquidityInterest'),md=el('liquidityMaturity');
  if(ir&&ir.closest('.form-row'))ir.closest('.form-row').style.display=earns?'':'none';
  if(md&&md.closest('.form-row'))md.closest('.form-row').style.display=matures?'':'none';
  if(!earns&&ir)ir.value='';
  if(!matures&&md)md.value='';
}
function renderPropertyTypeRow(){el('propertyTypeRow').innerHTML=PROPERTY_TYPES.map(t=>`<button class="atype-btn ${t.id===selectedPropertyType?'active':''}" onclick="setPropertyType('${t.id}')" style="min-width:58px"><div style="color:${selectedPropertyType===t.id?'var(--accent)':'var(--text3)'}">${svgIcon(t.icon,16)}</div><span>${t.label}</span></button>`).join('');}
function setPropertyType(id){selectedPropertyType=id;renderPropertyTypeRow();}
// SEARCHES
let searchTimeout=null;
function onCryptoSearch(){clearTimeout(searchTimeout);const q=el('cryptoSearch').value.trim();if(!q){el('cryptoSuggestions').style.display='none';const sp=el('cryptoSpinner');if(sp)sp.classList.remove('visible');return;}
  // Held coins show instantly; the network search replaces them.
  {const mine=(state.assets||[]).filter(a=>a&&a.category==='crypto'&&a.id!==editingAssetId)
    .map(a=>assetSuggestion(a,false));
   if(mine.length)nameSuggestions(el('cryptoSuggestions'),el('cryptoSearch'),mine,it=>adoptAsset(it.asset));}
  const sp=el('cryptoSpinner');if(sp)sp.classList.add('visible');searchTimeout=setTimeout(async()=>{const res=await searchCryptoWithImages(q);if(sp)sp.classList.remove('visible');if(!res.length){el('cryptoSuggestions').style.display='none';return;}const box=el('cryptoSuggestions');box.innerHTML=res.map((c,i)=>`<div class="coin-sug-item" role="button" tabindex="0" data-i="${i}">${c.image?`<img class="coin-sug-img" src="${esc(c.image)}" onerror="this.style.display='none'" loading="lazy"/>`:`<div class="coin-sug-img"></div>`}<div><div class="coin-sug-name">${esc(c.name)}</div><div class="coin-sug-sym">${esc((c.symbol||'').toUpperCase())}</div></div></div>`).join('');box.querySelectorAll('.coin-sug-item').forEach((node,i)=>node.addEventListener('click',()=>{const c=res[i];selectCoin(c.id,c.name||'',(c.symbol||'').toUpperCase(),c.image||'');}));box.style.display='block';},350);}
async function selectCoin(id,name,sym,img){img=proxyImg(img);selectedCoinId=id;selectedCoinName=name;selectedCoinImage=img;el('cryptoSearch').value=name;el('cryptoSuggestions').style.display='none';const usd=await fetchCoinPrice(id);if(usd!==null){el('cryptoPriceHint').style.display='block';el('cryptoPriceHint').textContent=`Live: ${fmt(usdToNpr(usd))} per ${sym}`;autoFillBuyPriceFromLive();}}
let stockSearchTimeout=null;
// Load the NEPSE list the first time the stock form is used.
let _nepseAsked=false;
function ensureNepsePrices(){
  if(_nepseAsked||_nepseOff||Object.keys(nepsePrices).length)return;
  _nepseAsked=true;
  fetchNepse(true).then(()=>{
    // Show results for what is already typed.
    const inp=el('stockSearch');
    if(inp&&inp.value.trim()&&Object.keys(nepsePrices).length)onStockSearch();
  });
}
function onStockSearch(){
  const inp=el('stockSearch'),box=el('stockSuggestions');
  if(!inp||!box)return;
  ensureNepsePrices();
  const raw=inp.value.trim();
  selectedStockName=raw||null;selectedStockSym=raw||null;
  // A typed symbol the exchange quotes counts as picked.
  selectedStockIsNepse=nepseKnows(raw);
  // Search today's quoted symbols; with no feed, fall back to held stocks.
  const q=raw.toLowerCase();
  const listed=q?Object.keys(nepsePrices).map(sym=>({sym,q:nepsePrices[sym]}))
    .map(x=>{
      const nm=(x.q.name||'').toLowerCase(), sy=x.sym.toLowerCase();
      // Symbol first: people type NABIL, not Nabil Bank Limited.
      const rank=sy===q?0:(nm===q?1:(sy.startsWith(q)?2:(nm.startsWith(q)?3:(sy.includes(q)||nm.includes(q)?4:-1))));
      return rank<0?null:{...x,rank};
    }).filter(Boolean).sort((a,b)=>a.rank-b.rank).slice(0,6):[];
  if(listed.length){
    box.innerHTML=listed.map((x,i)=>
      '<div class="coin-sug-item" role="button" tabindex="0" data-i="'+i+'">'
      +'<div class="coin-sug-img" style="background:var(--bg3);display:flex;align-items:center;'
      +'justify-content:center;color:var(--text3)">'+svgIcon('chartline',14)+'</div>'
      +'<div><div class="coin-sug-name">'+esc(x.q.name||x.sym)+'</div>'
      +'<div class="coin-sug-sym">'+esc(x.sym)+' \u00b7 '+fmt(nprToBase(x.q.price))+'</div></div></div>'
    ).join('');
    box.style.display='block';
    box.querySelectorAll('.coin-sug-item').forEach(node=>{
      const pick=()=>{const x=listed[+node.dataset.i];if(x)pickNepseStock(x.sym,x.q.name||x.sym);};
      node.onclick=pick;
      node.onkeydown=ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();pick();}};
    });
    return;
  }
  // No listed match: offer held stocks.
  nameSuggestions(box,inp,assetsOfCategory('stock'),it=>adoptAsset(it.asset));
}
// Picking from the NEPSE list sets symbol, name and the NEPSE flag.
function pickNepseStock(sym,name){
  selectedStockSym=sym;selectedStockName=name;
  selectedStockIsNepse=true;
  const inp=el('stockSearch');if(inp)inp.value=name;
  const box=el('stockSuggestions');if(box){box.style.display='none';box.innerHTML='';}
  // Fill the known price.
  const q=nepsePrices[sym];
  const cp=el('assetCurrentPrice');
  if(cp&&q&&q.price>0&&!cp.value)cp.value=(nprToBase(q.price)*getCurrRate(currentPriceEntryCcy||currentCurrency.code)).toFixed(2);
  const hint=el('stockHint');
  // Same hint as coins and metals, plus the quote's age.
  if(hint&&q&&q.price>0){hint.style.display='block';
    hint.innerHTML='Live: '+esc(fmt(nprToBase(q.price)))+' per '+esc(sym)
      +(nepseAsOf?' <span class="hint-age">\u00b7 '+esc(relTime(Date.parse(nepseAsOf)))+'</span>':'');}
  // With a quantity entered, start the buy price from today's.
  autoFillBuyPriceFromLive();
  haptic('tap');
}
function selectStock(sym,name,isNepse){selectedStockSym=sym;selectedStockName=name;el('stockSearch').value=name;el('stockSuggestions').style.display='none';el('stockHint').style.display='none';}
// Listed or not is decided by the feed, not the user.
function syncNepseToggle(){selectedStockIsNepse=nepseKnows(selectedStockSym)||nepseKnows((el('stockSearch')&&el('stockSearch').value||'').trim());}
// The toggle only appears when the feed cannot answer (unknown symbol or feed down).
function nepseKnows(sym){
  const k=String(sym||'').trim().toUpperCase();
  return !!(k&&nepsePrices[k]);
}
// GOAL ICONS/COLORS
// ICON PICKER: one row shows the choice; picking happens in a searchable sheet.
let _iconPickerPick=null,_iconPickerCur=null;
function openIconPicker(current,onPick,title){
  _iconPickerCur=current||null;
  _iconPickerPick=typeof onPick==='function'?onPick:null;
  const t=el('iconPickerTitle');if(t)t.textContent=title||'Choose an icon';
  const q=el('iconPickerSearch');if(q)q.value='';
  renderIconPicker();
  openModal('iconPickerModal');
}
function renderIconPicker(){
  const grid=el('iconPickerGrid');if(!grid)return;
  const q=((el('iconPickerSearch')||{}).value||'').trim().toLowerCase();
  const keys=q?ICON_KEYS.filter(k=>k.toLowerCase().includes(q)):ICON_KEYS;
  grid.innerHTML=keys.map(k=>`<button type="button" class="icon-opt ${k===_iconPickerCur?'sel':''}" onclick="pickIcon('${jsAttr(k)}')" title="${esc(k)}" aria-label="${esc(k)}">${svgIcon(k,16)}</button>`).join('');
  const empty=el('iconPickerEmpty');if(empty)empty.hidden=!!keys.length;
}
function pickIcon(k){
  _iconPickerCur=k;
  const fn=_iconPickerPick;
  closeModal('iconPickerModal');
  haptic('tap');
  if(fn)fn(k);
}
function renderGoalIconGrid(){
  const prev=el('goalIconPreview');
  if(prev)prev.innerHTML=svgIcon(selectedGoalIcon||'target',18);
  const nm=el('goalIconName');
  if(nm)nm.textContent=selectedGoalIcon||'Choose one';
}
function openGoalIconPicker(){openIconPicker(selectedGoalIcon,setGoalIcon,'Goal icon');}
function setGoalIcon(k){selectedGoalIcon=k;renderGoalIconGrid();}
function renderGoalColors(){el('goalColorGrid').innerHTML=GOAL_COLORS.map(c=>`<button class="color-opt ${c.name===selGoalColor?'sel':''}" style="background:${c.hex}" onclick="selGoalColor='${c.name}';renderGoalColors()" aria-label="${c.name} color"></button>`).join('');}
// INTEREST
function refreshAccruedBox(d){
  const box=el('accruedBox');
  if(!box)return;
  // Only show when editing an existing debt with interest enabled
  if(!d||!d.interest||!d.interest.enabled){box.style.display='none';return;}
  const acc=calcAccrued(d);
  const rate=getCurrRate(currentCurrency.code);
  const lentD=d.lentDate?parseDay(d.lentDate):new Date(d.date);
  const startDate=d.interest.chargeFrom==='due'&&d.due?parseDay(d.due):lentD;
  const now=new Date();
  const days=Math.max(0,Math.floor((now-startDate)/(864e5)));
  const sym=currentCurrency.sym||'Rs.';
  // Build sub label describing rate (convert flat amount to display currency for label only)
  let rateLbl='';
  if(d.interest.type==='flat'){
    const fa=(d.interest.flatAmount||0)*rate;
    rateLbl=`${sym}${fa.toLocaleString('en-IN',{maximumFractionDigits:2})} / ${d.interest.freq||'month'}`;
  } else {
    rateLbl=`${d.interest.rate||0}% per ${d.interest.freq||'month'}`;
  }
  const fromLbl=d.interest.chargeFrom==='due'&&d.due
    ? (now<parseDay(d.due)?'Not started, due date not reached yet':'Since due date')
    : `Since ${d.lentDate||d.date?.split('T')[0]||'-'}`;
  el('accruedBoxVal').textContent=fmt(acc);
  el('accruedBoxDays').textContent=days>0?plural(days,'day'):'< 1 day';
  el('accruedBoxSub').textContent=`${rateLbl} · ${fromLbl}`;
  el('accruedBoxTotal').textContent=fmt(d.amount+acc);
  box.style.display='block';
}
function toggleInterestSection(){interestEnabled=!interestEnabled;const t=el('interestToggle');t.className='toggle'+(interestEnabled?' on':'');t.setAttribute('aria-checked',interestEnabled?'true':'false');el('interestFields').style.display=interestEnabled?'block':'none';}
function setIntType(t){intType=t;el('intTypeFlat').className='int-type-btn'+(t==='flat'?' active':'');el('intTypePct').className='int-type-btn'+(t==='pct'?' active':'');el('intFlatFields').style.display=t==='flat'?'block':'none';el('intPctFields').style.display=t==='pct'?'block':'none';}
function toggleCompound(){intCompound=!intCompound;const t=el('compoundToggle');t.className='toggle'+(intCompound?' on':'');t.setAttribute('aria-checked',intCompound?'true':'false');haptic('tap');}
let intFlatFreq='month',chargeFrom='lend';
function setIntFlatFreq(f){intFlatFreq=f;['day','week','month','year'].forEach(x=>{const b=el('intFlatFreq'+x.charAt(0).toUpperCase()+x.slice(1));if(b)b.className='freq-btn'+(x===f?' active':'');});}
function daysAgoISO(n){const d=new Date();d.setDate(d.getDate()-n);return d.toISOString().split('T')[0];}
// Clamped to month end (31 Jan + 1 month = 28 Feb).
function monthsAheadISO(n){const now=new Date();const day=now.getDate();const d=new Date(now.getFullYear(),now.getMonth()+n,1);const last=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();d.setDate(Math.min(day,last));return dayKey(d);}
let dueDateEnabled=false;
function daysFromNowISO(n){const d=new Date();d.setDate(d.getDate()+n);return d.toISOString().split('T')[0];}
function setDueDate(daysFromNow){el('debtDue').value=daysFromNowISO(daysFromNow);syncDueQuickBtns();}
function syncDueQuickBtns(){const v=el('debtDue').value;const map={1:'dueQkTomorrow',7:'dueQk1Week',30:'dueQk1Month'};Object.entries(map).forEach(([days,id])=>{const b=el(id);if(b)b.className='freq-btn'+(v===daysFromNowISO(Number(days))?' active':'');});}
function toggleDueDate(){dueDateEnabled=!dueDateEnabled;const t=el('dueDateToggle');t.className='toggle'+(dueDateEnabled?' on':'');t.setAttribute('aria-checked',dueDateEnabled?'true':'false');el('dueDateField').style.display=dueDateEnabled?'block':'none';if(dueDateEnabled){setDueDate(7);}else{el('debtDue').value='';syncDueQuickBtns();}}
function setDueDateEnabled(val,dateVal){dueDateEnabled=!!val;const t=el('dueDateToggle');if(!t)return;t.className='toggle'+(dueDateEnabled?' on':'');t.setAttribute('aria-checked',dueDateEnabled?'true':'false');el('dueDateField').style.display=dueDateEnabled?'block':'none';if(dueDateEnabled&&dateVal){el('debtDue').value=dateVal;syncDueQuickBtns();}else if(!dueDateEnabled){el('debtDue').value='';syncDueQuickBtns();}}
function setLentDate(daysAgo){const v=daysAgoISO(daysAgo);el('debtLentDate').value=v;syncLentQuickBtns();}
function syncLentQuickBtns(){const v=el('debtLentDate').value;const map={0:'lentQkToday',1:'lentQkYest',7:'lentQkWeek',30:'lentQkMonth'};Object.entries(map).forEach(([days,id])=>{const b=el(id);if(b)b.className='freq-btn'+(v===daysAgoISO(Number(days))?' active':'');});}
function setChargeFrom(v){chargeFrom=v;el('chargeFromLend').className='freq-btn'+(v==='lend'?' active':'');el('chargeFromDue').className='freq-btn'+(v==='due'?' active':'');el('chargeFromHint').textContent=v==='lend'?'Interest accrues from the day you lent / borrowed the money.':'Interest only starts accruing after the due date passes.';}
function setIntFreq(f){intFreq=f;['day','week','month','year'].forEach(x=>{el('intFreq'+x.charAt(0).toUpperCase()+x.slice(1)).className='freq-btn'+(x===f?' active':'');});}
function setDebtType(t){selectedDebtType=t;el('dtypeOwed').className='dtype-btn'+(t==='owed'?' active grn':'');el('dtypeIOwe').className='dtype-btn'+(t==='iowe'?' active rd':'');el('dtypeOwed').style.animation='';el('dtypeIOwe').style.animation='';if(typeof syncDebtNewAcct==='function')syncDebtNewAcct(editingDebtId?state.debts.find(x=>x.id===editingDebtId):null);}
// ADD/EDIT ASSET
// With a ledger behind it, quantity and cost are read-only (the replay owns them).
// Without one, what is typed becomes the opening entry.
function ledgerOwnsNumbers(a){
  return !!(a&&a.category!=='liquidity'&&txsForAsset(a).some(t=>!t.transfer));
}
function syncLedgerLock(a){
  const lock=ledgerOwnsNumbers(a);
  const note=el('assetLedgerLock');
  if(note)note.hidden=!lock;
  ['assetQty','assetBuyPrice'].forEach(id=>{
    const f=el(id);if(!f)return;
    f.readOnly=lock;
    f.setAttribute('aria-readonly',lock?'true':'false');
  });
  const seg=el('priceModeSeg');
  // The per-unit/total switch has nothing to edit.
  if(seg&&lock)seg.style.display='none';
}
function openAddAsset(){editingAssetId=null;el('addAssetTitle').textContent='Add Asset';el('saveAssetBtn').textContent='Add Asset';el('deleteAssetBtn').style.display='none';selectedAssetType=state.settings.lastAssetType||'crypto';selectedCoinId=null;selectedCoinName=null;selectedCoinImage=null;selectedCommodityId=state.settings.lastCommodityId||'gold';selectedCommodityUnit=state.settings.lastCommodityUnit||'gram';selectedLiquidityType=state.settings.lastLiquidityType||'savings';selectedStockSym=null;selectedStockName=null;selectedStockIsNepse=false;selectedPropertyType='house';
  el('cryptoSearch').value='';el('cryptoSuggestions').style.display='none';el('cryptoPriceHint').style.display='none';el('stockSearch').value='';el('stockSuggestions').style.display='none';el('stockHint').style.display='none';el('assetName').value='';el('assetQty').value='';el('assetBuyPrice').value='';el('assetDate').value=todayStr();el('assetNotes').value='';el('liquidityName').value='';el('liquidityValue').value='';el('liquidityInterest').value='';el('liquidityMaturity').value='';el('liquidityNotes').value='';el('assetCurrentPrice').value='';
  syncLedgerLock(null);updateCurrLabels();renderAssetTypeRow();syncNepseToggle();isPricePerUnitMode=true;updateAssetFormFields();buyPriceEntryCcy=null;liqValueEntryCcy=null;currentPriceEntryCcy=null;buildCompactCcySelect('buyPriceCcyWrap',null,onBuyPriceCcyChange);buildCompactCcySelect('liqValueCcyWrap',null,onLiqValueCcyChange);buildCompactCcySelect('currentPriceCcyWrap',null,onCurrentPriceCcyChange);openModal('addAssetModal');}
function openEditAsset(id){const a=state.assets.find(x=>x.id===id);if(!a)return;editingAssetId=id;el('addAssetTitle').textContent='Edit Asset';el('saveAssetBtn').textContent='Save Changes';el('deleteAssetBtn').style.display='block';selectedAssetType=a.category;selectedCoinId=a.coinId||null;selectedCoinName=a.name;selectedCoinImage=a.coinImage||null;selectedCommodityId=a.commodityId||'gold';selectedCommodityUnit=a.unit||'gram';selectedStockSym=a.ticker||null;selectedStockName=a.name;selectedStockIsNepse=a.isNepse||false;selectedPropertyType=a.propertyType||'house';
  const liqLabelToVal={'Savings Account':'savings','Current Account':'current','Fixed Deposit (FD)':'fd','Cash in Hand':'cash','Digital Wallet':'digital','Other':'other'};selectedLiquidityType=liqLabelToVal[a.liquidityType]||'savings';
  el('cryptoSearch').value=a.coinId?a.name:'';el('stockSearch').value=a.category==='stock'?a.name:'';el('assetName').value=a.name;el('assetQty').value=a.qty||''; // crypto/commodity/property show total invested; others per unit
  const isTotalMode=(a.category==='crypto'||a.category==='commodity'||a.category==='property');el('assetBuyPrice').value=a.buyPrice?((isTotalMode?a.buyPrice*(a.qty||1):a.buyPrice)*getCurrRate(currentCurrency.code)).toFixed(2):'';el('assetDate').value=a.date||'';el('assetNotes').value=a.notes||'';el('assetCurrentPrice').value=a.currentPrice?(a.currentPrice*getCurrRate(currentCurrency.code)).toFixed(2):'';
  if(a.category==='liquidity'){el('liquidityName').value=a.name;el('liquidityValue').value=a.value?(a.value*getCurrRate(currentCurrency.code)).toFixed(2):'';el('liquidityInterest').value=a.interest||'';el('liquidityMaturity').value=a.maturity||'';el('liquidityNotes').value=a.notes||'';}
  if(a.coinId&&livePrices[a.coinId]){el('cryptoPriceHint').style.display='block';el('cryptoPriceHint').textContent='Live: '+fmt(usdToNpr(livePrices[a.coinId].usd))+' per unit';}
  updateCurrLabels();renderAssetTypeRow();syncNepseToggle();isPricePerUnitMode=!isTotalMode;updateAssetFormFields();buyPriceEntryCcy=null;liqValueEntryCcy=null;currentPriceEntryCcy=null;buildCompactCcySelect('buyPriceCcyWrap',null,onBuyPriceCcyChange);buildCompactCcySelect('liqValueCcyWrap',null,onLiqValueCcyChange);buildCompactCcySelect('currentPriceCcyWrap',null,onCurrentPriceCcyChange);syncLedgerLock(a);openModal('addAssetModal');}



function getLiqRate(){return getCurrRate(currentCurrency.code);}



function saveAsset(){let name='',ticker=null,coinId=null,coinImage=null,commodityId=null,unit=null,isNepse=false,propertyType=null,liquidityType=null,value=null,qty=null,buyPriceNPR=null;const rate=getCurrRate(currentCurrency.code);const bpRate=getCurrRate(buyPriceEntryCcy||currentCurrency.code);
  for(const fid of ['assetQty','assetBuyPrice','liquidityValue']){const f=el(fid);if(f&&f.value!==''&&parseFloat(f.value)<0){toast('Negative values are not allowed','error');f.classList.add('input-error');setTimeout(()=>f.classList.remove('input-error'),700);return;}}
  if(selectedAssetType==='crypto'){if(!selectedCoinId){toast('Search and select a coin','error');return;}name=selectedCoinName;coinId=selectedCoinId;coinImage=selectedCoinImage;qty=parseFloat(el('assetQty').value)||null;const entered=parseFloat(el('assetBuyPrice').value)||null;if(!qty||!entered){toast('Enter quantity and buy price','error');return;}const totalCost=isPricePerUnitMode?entered*qty:entered;buyPriceNPR=(totalCost/bpRate)/qty;}
  else if(selectedAssetType==='commodity'){const comm=COMMODITIES.find(c=>c.id===selectedCommodityId)||COMMODITIES[0];name=comm.label;commodityId=selectedCommodityId;unit=selectedCommodityUnit;if(comm.coinGeckoId)coinId=comm.coinGeckoId;qty=parseFloat(el('assetQty').value)||null;const enteredC=parseFloat(el('assetBuyPrice').value)||null;const totalCostC=(enteredC&&qty&&isPricePerUnitMode)?enteredC*qty:enteredC;buyPriceNPR=(totalCostC&&qty)?(totalCostC/bpRate)/qty:null;if(!qty){toast('Enter quantity','error');return;}}
  else if(selectedAssetType==='stock'){if(!selectedStockName&&!el('stockSearch').value.trim()){toast('Search and select a stock','error');return;}name=selectedStockName||el('stockSearch').value.trim();ticker=selectedStockSym||name;isNepse=nepseKnows(ticker)||nepseKnows(name)||(!Object.keys(nepsePrices).length&&!!(editingAssetId&&(state.assets.find(x=>x.id===editingAssetId)||{}).isNepse));qty=parseFloat(el('assetQty').value)||null;const bp=parseFloat(el('assetBuyPrice').value)||null;const bpPerUnit=(bp&&qty&&!isPricePerUnitMode)?bp/qty:bp;buyPriceNPR=bpPerUnit?bpPerUnit/bpRate:null;if(!qty){toast('Enter quantity of shares','error');return;}}
  else if(selectedAssetType==='liquidity'){name=el('liquidityName').value.trim();if(!name){toast('Enter account/label name','error');return;}const v=parseFloat(el('liquidityValue').value)||null;if(!v){toast('Enter value','error');return;}value=v/getCurrRate(liqValueEntryCcy||currentCurrency.code);const liqLabels={savings:'Savings Account',current:'Current Account',fd:'Fixed Deposit (FD)',cash:'Cash in Hand',digital:'Digital Wallet',other:'Other'};liquidityType=liqLabels[selectedLiquidityType]||'Savings Account';}
  else if(selectedAssetType==='property'){name=el('assetName').value.trim();if(!name){toast('Enter property name','error');return;}propertyType=selectedPropertyType;const bp=parseFloat(el('assetBuyPrice').value)||null;buyPriceNPR=bp?bp/bpRate:null;}
  else{name=el('assetName').value.trim();if(!name){toast('Enter a name','error');return;}qty=parseFloat(el('assetQty').value)||null;const bp=parseFloat(el('assetBuyPrice').value)||null;const bpPerUnit=(bp&&qty&&!isPricePerUnitMode)?bp/qty:bp;buyPriceNPR=bpPerUnit?bpPerUnit/bpRate:null;}
  let icon='coins';if(selectedAssetType==='property'){const pt=PROPERTY_TYPES.find(p=>p.id===selectedPropertyType);icon=pt?pt.icon:'home';}else if(selectedAssetType==='other')icon='box';else if(selectedAssetType==='stock')icon='chartline';else if(selectedAssetType==='liquidity')icon='banknote';
  const existingForInterest=editingAssetId?state.assets.find(a=>a.id===editingAssetId):null;
  // Unit changed while editing: convert what was typed from the old unit.
  if(editingAssetId&&selectedAssetType==='commodity'&&existingForInterest&&existingForInterest.unit&&unit&&existingForInterest.unit!==unit){
    const oldUnit=existingForInterest.unit;
    if(qty!=null)qty=convertUnit(qty,oldUnit,unit);
    if(buyPriceNPR!=null){const conv=convertUnit(1,oldUnit,unit);if(conv)buyPriceNPR=buyPriceNPR/conv;}
  }
  const asset={id:editingAssetId||uid(),category:selectedAssetType,name,ticker,coinId,coinImage,commodityId,unit,isNepse,propertyType,liquidityType,icon,qty,buyPrice:buyPriceNPR,currentPrice:(function(){const c=parseFloat(el('assetCurrentPrice').value);const cpRate=getCurrRate(currentPriceEntryCcy||currentCurrency.code);if(!isNaN(c)&&c>0)return c/cpRate; /* Nothing to fetch: today's price defaults to the buy price. */ return (!coinId&&buyPriceNPR>0)?buyPriceNPR:null;})(),value,interest:el('liquidityInterest').value||null,interestSince:(selectedAssetType==='liquidity'&&el('liquidityInterest').value)?(existingForInterest&&existingForInterest.interestSince?existingForInterest.interestSince:todayStr()):null,maturity:el('liquidityMaturity').value||null,date:selectedAssetType!=='liquidity'?(el('assetDate').value||null):null,notes:(selectedAssetType==='liquidity'?el('liquidityNotes').value:el('assetNotes').value)||null};
  if(editingAssetId){
    const i=state.assets.findIndex(a=>a.id===editingAssetId);
    const prev=i!==-1?state.assets[i]:null;
    if(i!==-1)state.assets[i]=asset;
    // Rename the stored copies too, matched by the old identity; backfill assetId.
    if(prev){
      (state.transactions||[]).forEach(t=>{
        const mine=t.assetId?t.assetId===asset.id
          :(t.name===prev.name&&t.category===prev.category);
        if(!mine)return;
        if(!t.assetId)t.assetId=asset.id;
        t.name=asset.name;
        t.category=asset.category;
        if(asset.icon)t.icon=asset.icon;
        t.coinImage=asset.coinImage||null;
      });
    }
    let note='Asset updated!';
    if(prev&&selectedAssetType==='liquidity'){
      // A balance correction is recorded as a transaction so history adds up.
      const before=num(prev.value), after=num(asset.value);
      const delta=+(after-before).toFixed(2);
      if(Math.abs(delta)>=0.005){
        state.transactions=state.transactions||[];
        state.transactions.push({id:uid(),assetId:asset.id,name:asset.name,category:'liquidity',
          icon:asset.icon||'banknote',coinImage:null,txType:delta>0?'buy':'sell',
          qty:null,enteredQty:null,enteredUnit:null,perUnit:null,amount:Math.abs(delta),
          notes:'Balance correction',
          date:new Date().toISOString()});
        note=(delta>0?'Balance raised by ':'Balance reduced by ')+fmt(Math.abs(delta))+', recorded';
      }
    }
    if(prev&&selectedAssetType!=='liquidity'){
      // Rescale stored base quantities when a commodity's unit changes; entered values stay.
      if(selectedAssetType==='commodity'&&prev.unit&&unit&&prev.unit!==unit){
        const f=convertUnit(1,prev.unit,unit);
        if(f)txsForAsset(asset).forEach(t=>{
          // Rows with enteredQty/enteredUnit are read through those.
          if(t.enteredUnit&&t.enteredQty!=null)return;
          if(t.qty!=null)t.qty=+(t.qty*f).toFixed(10);
          if(t.perUnit!=null)t.perUnit=t.perUnit/f;
        });
      }
      // No ledger: what was typed becomes the opening entry.
      if(!txsForAsset(asset).some(t=>!t.transfer)&&(asset.qty||asset.buyPrice)){
        state.transactions=state.transactions||[];
        state.transactions.push({id:uid(),assetId:asset.id,name:asset.name,category:asset.category,
          icon:asset.icon,coinImage:asset.coinImage||null,amount:(asset.buyPrice||0)*(asset.qty||1),
          qty:assetNoQty(asset)?null:asset.qty,perUnit:assetNoQty(asset)?null:asset.buyPrice,txType:'buy',notes:asset.notes||null,
          date:asset.date||new Date().toISOString()});
      }
      // And then the ledger has the last word, always.
      recalcAssetFromTransactions(asset);
    }
    trackPnLHistory();saveState();closeModal('addAssetModal');renderAll();haptic('success');toast(note,'success');return;
  }
  // Find existing asset of the same identity to merge into, instead of creating a duplicate
  let existing=null;
  if(selectedAssetType==='crypto')existing=state.assets.find(a=>a.category==='crypto'&&a.coinId===coinId);
  else if(selectedAssetType==='commodity')existing=state.assets.find(a=>a.category==='commodity'&&a.commodityId===commodityId);
  else if(selectedAssetType==='stock')existing=state.assets.find(a=>a.category==='stock'&&(a.ticker||a.name)===(ticker||name));
  else if(selectedAssetType==='liquidity')existing=state.assets.find(a=>a.category==='liquidity'&&a.name.toLowerCase()===name.toLowerCase());
  else if(selectedAssetType==='property')existing=state.assets.find(a=>a.category==='property'&&a.name.toLowerCase()===name.toLowerCase());
  else existing=state.assets.find(a=>a.category===selectedAssetType&&a.name.toLowerCase()===name.toLowerCase());

  if(existing){
    if(selectedAssetType==='liquidity'){
      // Liquidity: just add to the balance, record as a deposit transaction
      const addVal=value||0;existing.value=(existing.value||0)+addVal;
      if(el('liquidityInterest').value){existing.interest=el('liquidityInterest').value;if(!existing.interestSince)existing.interestSince=todayStr();}
      if(el('liquidityMaturity').value)existing.maturity=el('liquidityMaturity').value;
      if(el('liquidityNotes').value.trim())existing.notes=el('liquidityNotes').value.trim();
      state.transactions.push({id:uid(),assetId:existing.id,name:existing.name,category:'liquidity',icon:existing.icon,coinImage:existing.coinImage,amount:addVal,qty:null,txType:'buy',notes:el('liquidityNotes').value.trim()||null,date:new Date().toISOString()});
      toast(name+': added to existing balance','success');
    }else{
      // Weighted-average price, summed quantity. Other-unit commodity purchases convert into
      // the holding's unit first.
      const enteredUnit=(selectedAssetType==='commodity')?unit:null;
      const targetUnit=(selectedAssetType==='commodity')?(existing.unit||unit):null;
      const qtyInExistingUnit=(enteredUnit&&targetUnit&&enteredUnit!==targetUnit)?convertUnit(qty||0,enteredUnit,targetUnit):(qty||0);
      const buyPriceInExistingUnit=(enteredUnit&&targetUnit&&enteredUnit!==targetUnit&&qtyInExistingUnit)?((buyPriceNPR||0)*(qty||0))/qtyInExistingUnit:buyPriceNPR;
      const addQty=qtyInExistingUnit||0,addCost=(buyPriceInExistingUnit||0)*addQty;
      const oldQty=existing.qty||0,oldCost=oldQty*(existing.buyPrice||0);
      const newQty=oldQty+addQty;
      existing.buyPrice=newQty>0?(oldCost+addCost)/newQty:existing.buyPrice;
      existing.qty=newQty;
      if(buyPriceNPR==null&&qty==null){}
      if(asset.currentPrice!=null)existing.currentPrice=asset.currentPrice;
      if((selectedAssetType==='property'||selectedAssetType==='other')&&el('assetNotes')&&el('assetNotes').value.trim())existing.notes=el('assetNotes').value.trim();
      const unitNote=(enteredUnit&&targetUnit&&enteredUnit!==targetUnit)?(qty+' '+enteredUnit):null;
      state.transactions.push({id:uid(),assetId:existing.id,name:existing.name,category:existing.category,icon:existing.icon,coinImage:existing.coinImage,amount:addCost,qty:assetNoQty(existing)?null:addQty,enteredQty:(assetNoQty(existing)||!unitNote)?undefined:qty,enteredUnit:(assetNoQty(existing)||!unitNote)?undefined:enteredUnit,perUnit:(assetNoQty(existing)||!addQty)?null:addCost/addQty,txType:'buy',notes:(el('assetNotes')?el('assetNotes').value.trim():'')||null,date:asset.date||new Date().toISOString()});
      toast(name+': added to existing holding'+(unitNote?' ('+unitNote+')':''),'success');
    }
  }else{
    state.assets.push(asset);
    const amt=selectedAssetType==='liquidity'?value:(buyPriceNPR||0)*(qty||1);
    state.transactions.push({id:uid(),assetId:asset.id,name,category:selectedAssetType,icon,coinImage,amount:amt,qty:assetNoQty(asset)?null:qty,txType:'buy',notes:asset.notes||null,date:asset.date||new Date().toISOString()});
    toast('Asset added!','success');
  }
  trackPnLHistory();saveState();closeModal('addAssetModal');renderAll();haptic('success');}
async function deleteAsset(){if(!editingAssetId)return;const linkedGoals=state.goals.filter(g=>g.linkedAssetId===editingAssetId);const warnMsg='Delete this asset? Its transaction history will be removed too.'+(linkedGoals.length?(' This will also unlink '+linkedGoals.length+' goal'+(linkedGoals.length>1?'s':'')+' ('+linkedGoals.map(g=>g.name).join(', ')+').'):'');if(!await askConfirm({title:'Delete asset?',message:warnMsg,confirmText:'Delete asset'}))return;const a=state.assets.find(x=>x.id===editingAssetId);const delId=editingAssetId;
  // Undoable, like quickDeleteAsset.
  withUndo((a&&a.name?a.name:'Asset')+' deleted',['assets','transactions','goals'],()=>{
    state.assets=state.assets.filter(x=>x.id!==delId);
    if(a){const txIds=new Set(txsForAsset(a).map(t=>t.id));state.transactions=(state.transactions||[]).filter(t=>!txIds.has(t.id));}
    linkedGoals.forEach(g=>{g.linkedAssetId=null;g.linkedAssetIds=(g.linkedAssetIds||[]).filter(x=>x!==delId);});
    trackPnLHistory();saveState();
  });
  closeModal('addAssetModal');closeModal('assetDetailModal');renderAll();haptic('tap');}
// Typed per unit or as the whole value; stored per unit.
let isQuickCurPerUnit=true;
function setQuickCurMode(perUnit,id){
  if(perUnit===isQuickCurPerUnit)return;
  const inp=el('quickCurPrice');
  const a=state.assets.find(x=>x.id===id);
  const q=(a&&a.qty)||1;
  const v=inp?parseFloat(inp.value):NaN;
  isQuickCurPerUnit=perUnit;
  // Convert whatever is already typed so the number keeps its meaning.
  if(inp&&!isNaN(v)&&q>0) inp.value=(perUnit?v/q:v*q).toFixed(2);
  haptic('tap');
  const lbl=el('quickCurLbl');
  if(lbl&&a) lbl.textContent=(perUnit?'CURRENT PRICE / '+((a.unit||'unit').toUpperCase()):'CURRENT TOTAL VALUE')+' ('+currentCurrency.code+'), keep it updated';
  // Re-mark the two segment buttons inside this box only.
  const seg=document.querySelector('#quickCurLbl')&&document.querySelector('#quickCurLbl').parentElement.querySelector('.seg-control');
  if(seg){const b=seg.querySelectorAll('.seg-btn');if(b[0])b[0].classList.toggle('active',perUnit);if(b[1])b[1].classList.toggle('active',!perUnit);}
  if(inp)inp.placeholder=perUnit?"Today's price per unit":'Total value today';
}
function quickUpdateCurrentPrice(id){
  const a=state.assets.find(x=>x.id===id);if(!a)return;
  const inp=el('quickCurPrice');if(!inp)return;
  const v=parseFloat(inp.value);
  if(isNaN(v)||v<0){toast('Enter a valid price','error');return;}
  const q=a.qty||1;
  const perUnitEntered=isQuickCurPerUnit?v:(q>0?v/q:v);
  a.currentPrice=perUnitEntered/getCurrRate(currentCurrency.code);
  trackPnLHistory();saveState();renderAll();haptic('success');
  toast('Current price updated','success');openAssetDetail(id);
}
// Liquidity in/out
// No buy/sell; each movement is still a transaction.
let liqMode=null;
// Amount in the currency the money moved in.
function bindLiqAmtCcy(){
  if(!el('liqAmtCcyWrap'))return;
  resetMoneyCcy(['liqAmt']);
  bindMoneyCcy('liqAmt','liqAmtCcyWrap',()=>updateLiqPreview(detailAssetId));
}
// Transfer target; any other account.
let liqXferTo=null;
function liqXferOptions(fromId){
  return cashAccounts().filter(a=>a.id!==fromId)
    .map(a=>({value:a.id,label:a.name+' \u00b7 '+fmt(getAssetCurrentValue(a))}));
}
function setLiqMode(mode){
  liqMode=(liqMode===mode)?null:mode;
  syncTxTabs();
  const box=el('liqForm'); if(!box) return;
  box.classList.toggle('open',!!liqMode);
  const xr=el('liqXferRow');
  if(xr)xr.hidden=liqMode!=='transfer';
  if(!liqMode) return;
  el('liqFormTitle').textContent=liqMode==='add'?'Record Deposit'
    :liqMode==='withdraw'?'Record Withdrawal':'Move money to another account';
  const btn=el('liqSaveBtn');
  btn.textContent=liqMode==='add'?'Deposit':liqMode==='withdraw'?'Withdraw':'Transfer';
  btn.style.background=liqMode==='add'?'var(--green)':liqMode==='withdraw'?'var(--red)':'var(--blue)';
  btn.style.color=liqMode==='transfer'?'#04121f':'';
  el('liqAmt').value='';
  bindLiqAmtCcy();
  el('liqNote').value='';
  el('liqDate').value=todayStr();
  el('liqPreview').textContent='';
  if(liqMode==='transfer'){
    const opts=liqXferOptions(detailAssetId);
    liqXferTo=opts.length?opts[0].value:null;
    buildCustomSelect('liqXferWrap',opts.length?opts:[{value:'',label:'No other account yet'}],
      liqXferTo||'',v=>{liqXferTo=v;updateLiqPreview(detailAssetId);});
  }
  haptic('tap');
  setTimeout(()=>{try{el('liqAmt').focus();}catch(e){}},80);
}
function updateLiqPreview(id){
  const a=state.assets.find(x=>x.id===id); if(!a) return;
  const p=el('liqPreview'); if(!p) return;
  const base=moneyBase('liqAmt');
  if(isNaN(base)||base<=0){p.textContent='';return;}
  const out=liqMode==='withdraw'||liqMode==='transfer';
  const after=(a.value||0)+(out?-base:base);
  const to=liqMode==='transfer'&&liqXferTo?(state.assets||[]).find(x=>x.id===liqXferTo):null;
  p.innerHTML=`${esc(stripParens(a.name))}: <b style="color:${after<0?'var(--red)':'var(--text)'}">${fmt(after)}</b>`
    +(to?` &rarr; ${esc(stripParens(to.name))}: <b>${fmt(getAssetCurrentValue(to)+base)}</b>`:'')
    +(after<0?' <span style="color:var(--red)">more than the balance</span>':'');
}
function saveLiqTx(id){
  const a=state.assets.find(x=>x.id===id); if(!a) return;
  const amtNPR=moneyBase('liqAmt');
  if(isNaN(amtNPR)||amtNPR<=0){toast('Enter an amount','error');return;}
  if(liqMode==='transfer')return saveLiqTransfer(a,amtNPR);
  if(liqMode==='withdraw'&&amtNPR>(a.value||0)+1e-9){toast('That is more than the balance','error');return;}
  const delta=liqMode==='withdraw'?-amtNPR:amtNPR;
  a.value=(a.value||0)+delta;
  const d=el('liqDate').value?dayToISO(el('liqDate').value):new Date().toISOString();
  state.transactions=state.transactions||[];
  state.transactions.push({
    id:uid(),assetId:a.id,name:a.name,category:'liquidity',
    txType:liqMode==='withdraw'?'sell':'buy',
    // Amount only.
    qty:null,enteredQty:null,perUnit:null,amount:Math.abs(amtNPR),
    date:d,notes:el('liqNote').value||null,
  });
  liqMode=null;
  trackPnLHistory();saveState();renderAll();haptic('success');
  toast(delta>0?'Deposit recorded':'Withdrawal recorded','success');
  openAssetDetail(id);
}

// A transfer is one event as two linked legs, like a trade's cash side, so undo, edit
// and daily P&L handle it without special cases.
function saveLiqTransfer(from,amtNPR){
  const to=(state.assets||[]).find(x=>x&&x.id===liqXferTo);
  if(!to){toast('Pick an account to transfer to','error');return;}
  if(to.id===from.id){toast('Pick a different account','error');return;}
  const have=getAssetCurrentValue(from);
  if(amtNPR>have+1e-9){toast('That is more than '+stripParens(from.name)+' holds','error');return;}
  {const blk=cashLegBlocked(to);if(blk){toast(blk,'error');return;}}
  const date=el('liqDate').value?dayToISO(el('liqDate').value):new Date().toISOString();
  const note=el('liqNote').value.trim()||null;
  const linkId=uid();
  state.transactions=state.transactions||[];
  withUndo('Transfer to '+stripParens(to.name),['assets','transactions'],()=>{
    applyCashLegBalance(from,amtNPR,'out');
    pushCashLeg(from,amtNPR,'out',date,linkId,note||('To '+stripParens(to.name)));
    applyCashLegBalance(to,amtNPR,'in');
    pushCashLeg(to,amtNPR,'in',date,linkId,note||('From '+stripParens(from.name)));
    trackPnLHistory();saveState();
  });
  liqMode=null;liqXferTo=null;
  renderAll();haptic('success');
  toast(fmt(amtNPR)+' moved to '+stripParens(to.name),'success');
  openAssetDetail(from.id);
}
function openAssetDetail(id){const a=state.assets.find(x=>x.id===id);if(!a)return;parkPnlCal();detailAssetId=id;txMode=null;txUnit=null;txCashChoice=null;liqMode=null;const cv=getAssetCurrentValue(a),pnl=getAssetPnL(a),pp=getAssetPnLPct(a),cp=getAssetCurrentPrice(a),pos=pnl===null||pnl>=0,txs=txsForAsset(a).slice().reverse(),type=ASSET_TYPES.find(t=>t.id===a.category)||ASSET_TYPES[5],img=a.coinImage||'';
  // P&L beside the value it is a gain on.
  const adPnl=(a.category!=='liquidity'&&pnl!==null)
    ? `<span class="ad-pl ${pos?'up':'dn'}">${pos?'+':''}${fmt(pnl)}${pp!==null?` (${pos?'+':''}${pp.toFixed(2)}%)`:''}</span>`
    : '';
  const isCommodityTx=a.category==='commodity';
  const canEarn=a.category==='stock'||a.category==='property';
  const txUI=a.category!=='liquidity'?`<div class="mini-actions" role="tablist"><button class="act-pill buy${txMode==='buy'?' active':''}" role="tab" aria-selected="${txMode==='buy'}" onclick="toggleTxForm('buy')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> Record Buy</button><button class="act-pill sell${txMode==='sell'?' active':''}" role="tab" aria-selected="${txMode==='sell'}" onclick="toggleTxForm('sell')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg> Record Sell</button>${canEarn?`<button class="act-pill income${txMode==='income'?' active':''}" role="tab" aria-selected="${txMode==='income'}" onclick="toggleTxForm('income')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> Income</button>`:''}</div><div class="mini-form tx-form-box" id="txForm"><div style="font-size:12px;font-weight:700;margin-bottom:8px" id="txFormTitle"></div><div class="form-row-2" style="margin-bottom:8px"><div><label class="form-lbl" id="txQtyLbl" for="txQty">${(a.unit&&!isCommodityTx)?esc(unitQtyLabel(a.unit)):'QUANTITY'}</label><input class="form-input" id="txQty" type="number" step="any" inputmode="decimal" placeholder="0" oninput="autoFillTxPrice();updateTxSellPreview();updateTxCashHint(txMode)"/></div><div><label class="form-lbl" id="txPriceLbl">BUY PRICE</label><div class="input-ccy-group"><input class="form-input" id="txPrice" type="number" step="any" inputmode="decimal" placeholder="0.00" oninput="updateTxSellPreview();updateTxCashHint(txMode)"/><div class="ccy-sel-wrap" id="txPriceCcyWrap"></div></div><div id="txPriceModeSeg" class="seg-control" style="margin-top:6px;float:right"><button type="button" class="seg-btn" id="txPriceModeSegUnit" onclick="setTxPriceEntryMode(true)">PRICE / UNIT</button><button type="button" class="seg-btn" id="txPriceModeSegTotal" onclick="setTxPriceEntryMode(false)">TOTAL PRICE</button></div></div></div><div id="txSellPreview" style="display:none;font-size:11px;font-weight:600;margin:-4px 0 8px;padding:6px 8px;border-radius:6px"></div>${isCommodityTx?`<div style="margin-bottom:8px"><label class="form-lbl">UNIT</label><div id="txUnitWrap" class="custom-select-wrap"></div></div>`:''}<div class="form-row" id="txIncomeRow" style="display:none;margin-bottom:8px"><label class="form-lbl">INCOME TYPE</label><div id="txIncomeWrap" class="custom-select-wrap"></div></div><div class="form-row" id="txCashRow" style="margin-bottom:8px"><label class="form-lbl" id="txCashLbl">PROCEEDS TO</label><div id="txCashWrap" class="custom-select-wrap"></div><div class="form-hint" id="txCashHint" style="margin-top:5px"></div></div><div class="form-row-2" style="margin-bottom:8px"><div><label class="form-lbl">DATE</label><input class="form-input" id="txDate" type="date"/></div><div><label class="form-lbl">NOTES</label><input class="form-input" id="txNotes" placeholder="Optional note"/></div></div><button class="submit-btn" id="txSaveBtn" style="margin-top:0" onclick="saveTx()">Save</button></div>`:'';
  let extra='';if(a.category==='liquidity'){const accrued=calcLiquidityAccrued(a);const _r=getCurrRate(currentCurrency.code);
    // Liquidity gets deposit/withdraw and a balance edit.
    extra=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px"><div class="d-stat"><div class="d-stat-lbl">TYPE</div><div class="d-stat-val" style="font-size:11px">${esc(a.liquidityType||'Cash')}</div></div>${a.interest?`<div class="d-stat"><div class="d-stat-lbl">INTEREST</div><div class="d-stat-val">${a.interest}% / yr</div></div>`:''}${a.maturity?`<div class="d-stat"><div class="d-stat-lbl">MATURITY</div><div class="d-stat-val" style="font-size:10px">${formatDate(a.maturity)}</div></div>`:''}${accrued>0?`<div class="d-stat"><div class="d-stat-lbl">ACCRUED</div><div class="d-stat-val" style="color:var(--green)">+${fmt(accrued)}</div></div>`:''}</div>
    <div class="mini-actions" role="tablist"><button class="act-pill buy${liqMode==='add'?' active':''}" role="tab" aria-selected="${liqMode==='add'}" onclick="setLiqMode('add')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Deposit</button><button class="act-pill sell${liqMode==='withdraw'?' active':''}" role="tab" aria-selected="${liqMode==='withdraw'}" onclick="setLiqMode('withdraw')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg> Withdraw</button>${cashAccounts().length>1?`<button class="act-pill xfer${liqMode==='transfer'?' active':''}" role="tab" aria-selected="${liqMode==='transfer'}" onclick="setLiqMode('transfer')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 2 21 6 17 10"/><line x1="21" y1="6" x2="7" y2="6"/><polyline points="7 22 3 18 7 14"/><line x1="3" y1="18" x2="17" y2="18"/></svg> Transfer</button>`:''}</div>
    <div class="mini-form" id="liqForm"><div style="font-size:12px;font-weight:700;margin-bottom:8px" id="liqFormTitle"></div>
      <div class="form-row-2" style="margin-bottom:8px">
        <div><label class="form-lbl" id="liqAmtLbl">AMOUNT</label><div class="input-ccy-group"><input class="form-input" id="liqAmt" type="number" step="any" inputmode="decimal" placeholder="0.00" oninput="updateLiqPreview('${a.id}')"/><div class="ccy-sel-wrap" id="liqAmtCcyWrap"></div></div></div>
        <div><label class="form-lbl">DATE</label><input class="form-input" id="liqDate" type="date"/></div>
      </div>
      <div class="form-row" id="liqXferRow" hidden style="margin-bottom:8px"><label class="form-lbl">TO ACCOUNT</label><div class="custom-select-wrap" id="liqXferWrap"></div></div>
      <div id="liqPreview" style="font-size:11px;font-weight:600;margin:-2px 0 8px;padding:6px 8px;border-radius:6px;background:var(--bg3);color:var(--text2)"></div>
      <div class="form-row" style="margin-bottom:8px"><label class="form-lbl">NOTE</label><input class="form-input" id="liqNote" placeholder="Optional note"/></div>
      <button class="submit-btn" id="liqSaveBtn" style="margin-top:0" onclick="saveLiqTx('${a.id}')">Save</button>
    </div>`;}
  
  else if(a.category!=='liquidity'){const _nq=nepseQuote(a);const hasLive=(a.coinId&&livePrices[a.coinId])||(_nq&&_nq.price>0);if(hasLive){
    // NEPSE prices: say it is the last trade and not the typed price.
    extra=`<div class="ad-price-row">Current Price: ${fmt(cp)}</div>`
      +(_nq?`<div class="ad-price-src">NEPSE last traded price${nepseAsOf?', '+esc(relTime(Date.parse(nepseAsOf))):''}${nepseStale?' \u00b7 the feed is behind':''}</div>`:'');}else{const rate=getCurrRate(currentCurrency.code);const _q=a.qty||1;const _per=a.currentPrice?a.currentPrice*rate:0;
      // No per-unit reading; ask for the whole value.
      const _noQ=assetNoQty(a);
      if(_noQ)isQuickCurPerUnit=false;
      extra=`<div style="margin-bottom:12px;background:var(--bg3);border:1px solid var(--border);border-radius:11px;padding:11px"><label class="form-lbl" style="margin-bottom:6px;display:block" id="quickCurLbl">${_noQ?'WHAT IT IS WORTH TODAY':'CURRENT PRICE / '+(a.unit||'unit').toUpperCase()} (${currentCurrency.code}), keep it updated</label><div style="display:flex;gap:8px"><input class="form-input" id="quickCurPrice" type="number" step="any" inputmode="decimal" value="${_per?(isQuickCurPerUnit?_per:_per*_q).toFixed(2):''}" placeholder="${_noQ?'Value today':isQuickCurPerUnit?"Today's price per unit":'Total value today'}"/><button class="add-btn" style="flex-shrink:0;white-space:nowrap" onclick="quickUpdateCurrentPrice('${a.id}')">Update</button></div>${_noQ?'':`<div class="seg-control" style="margin-top:7px;float:right"><button type="button" class="seg-btn${isQuickCurPerUnit?' active':''}" onclick="setQuickCurMode(true,'${a.id}')">PRICE / UNIT</button><button type="button" class="seg-btn${isQuickCurPerUnit?'':' active'}" onclick="setQuickCurMode(false,'${a.id}')">TOTAL PRICE</button></div><div style="clear:both"></div>`}</div>`;}}
  // Any priced holding gets the chart (gold via PAXG); the block removes itself if no
  // history comes back.
  const hasChart=!!a.coinId&&a.category!=='liquidity';
  el('assetDetailContent').innerHTML=`<div class="modal-hdr"><div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0"><div style="width:42px;height:42px;border-radius:12px;background:${type.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden">${img?`<img style="width:30px;height:30px;border-radius:50%;object-fit:cover" src="${img}" onerror="this.style.display='none'" loading="lazy"/>`:`<div style="color:${readableInk(type.color)}">${svgIcon(a.icon||'coins',20)}</div>`}</div><div style="min-width:0"><div class="modal-title" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(a.name)}</div><div style="font-size:10px;color:var(--text3)">${catLabel(a.category)}${a.unit?' · '+a.unit:''}</div></div></div><div style="display:flex;gap:6px;flex-shrink:0"><button class="modal-close" onclick="${a.category==='liquidity'?`openEditAsset('${a.id}')`:`openAssetEditPicker('${a.id}')`}" aria-label="Edit asset"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button><button class="modal-close" onclick="closeModal('assetDetailModal')" aria-label="Close"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div></div>
    <div class="modal-body"><div class="ad-value-row"><span class="ad-value">${fmt(cv)}</span>${adPnl}</div>${extra}
    ${hasChart?`<div class="cs-wrap"><div class="cs-readout"></div><div class="cs-loading" id="csArea">Loading price chart…</div><div class="cs-range" id="csRange"></div></div>`:''}
    ${a.category!=='liquidity'?`<div class="detail-stats"><div class="d-stat"><div class="d-stat-lbl">COST</div><div class="d-stat-val">${a.buyPrice?fmt((a.buyPrice||0)*assetUnits(a)):'-'}</div></div><div class="d-stat"><div class="d-stat-lbl">P&amp;L</div><div class="d-stat-val" style="color:${pos?'var(--green)':'var(--red)'}">${pnl!==null?(pos?'+':'')+fmt(pnl):'N/A'}</div></div><div class="d-stat"><div class="d-stat-lbl">RETURN</div><div class="d-stat-val" style="color:${pos?'var(--green)':'var(--red)'}">${pp!==null?(pos?'+':'')+pp.toFixed(2)+'%':'N/A'}</div></div></div>`:''}
    ${txUI}
    ${(a.qty||a.date)?`<div class="ad-facts">${a.qty?`<div class="ad-fact"><span class="ad-fact-lbl">Holding</span><span class="ad-fact-val">${esc(fmtQty(a.qty,a))} ${esc(a.unit||'units')}</span></div>`:''}${a.date?`<div class="ad-fact"><span class="ad-fact-lbl">Held since</span><span class="ad-fact-val">${esc(formatDate(a.date))}</span></div>`:''}</div>`:''}
    ${txs.length?`<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin:8px 0 6px"><div style="font-size:9px;font-weight:700;color:var(--text3);letter-spacing:1.5px;text-transform:uppercase">TRANSACTION HISTORY</div><div style="display:flex;align-items:center;gap:6px">${(a.commodityId&&(COMMODITIES.find(c=>c.id===a.commodityId)||COMMODITIES[0]).unitOptions.length>1)?`<div class="custom-select-wrap tx-hist-unit" id="txHistUnitWrap_${a.id}" style="width:auto;min-width:88px"></div>`:''}<button class="tx-export-btn" onclick="event.stopPropagation();openAssetExportPicker('${a.id}')" aria-label="Export transaction history"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Export</button></div></div>${buildTxTable(txs,a)}`:''}<div id="adPnlCalSlot"></div></div>`;
  updateCurrLabels();if(a.category==='liquidity')bindLiqAmtCcy();openModal('assetDetailModal');
  if(hasChart){
    el('csRange').innerHTML=CS_TIMEFRAMES.map(t=>
      `<button class="pnl-pill ${t.k===CS_DEFAULT_TF?'active':''}" data-tf="${t.k}" onclick="loadCandles('${a.coinId}','${t.k}',this,'${a.id}')">${t.label}</button>`).join('');
    loadCandles(a.coinId,CS_DEFAULT_TF,null,a.id);
  }
  // Day by day, for this holding on its own.
  mountPnlCal('asset',a.id);
}
// The filter is the candle timeframe; panning and pinching set the window. Each
// timeframe buckets the deepest series available: `series` in order, `bucket` per
// candle, `src`/`group` the /ohlc fallback. CoinGecko limits: 5-min for 1 day,
// hourly for 90 days, daily forever.
const CS_HOUR=3600000, CS_DAY=86400000;
const CS_FULL=[{days:'max',interval:'daily'},{days:365,interval:'daily'},{days:90}];
const CS_TIMEFRAMES=[
  {k:'30m',label:'30m',bn:'30m',bucket:CS_HOUR/2, series:[{days:1}],                 src:[1],          group:1},
  {k:'1h', label:'1H', bn:'1h', bucket:CS_HOUR,   series:[{days:90},{days:30},{days:1}], src:[1],      group:2},
  {k:'4h', label:'4H', bn:'4h', bucket:CS_HOUR*4, series:[{days:90},{days:30}],      src:[30,7],       group:1},
  {k:'1d', label:'1D', bn:'1d', bucket:CS_DAY,    series:CS_FULL,                    src:[365,180,90], group:1},
  {k:'1w', label:'1W', bn:'1w', bucket:CS_DAY*7,  series:CS_FULL,                    src:[365,180,90], group:7},
  {k:'1mo',label:'1M', bn:'1M', bucket:CS_DAY*30, series:CS_FULL,                    src:[365,180,90], group:30},
];
// Max pages of 1,000 candles kept while scrolling back.
const CS_MAX_PAGES=20;
// WAITING
// Skeletons only where something is really on its way: the candle chart and a
// friend's shared figures.
function skelLines(n,opts){
  const o=opts||{};
  let h='';
  for(let i=0;i<(n||3);i++){
    const w=o.widths&&o.widths[i]?o.widths[i]:(88-i*9)+'%';
    h+=`<div class="skel" style="height:${o.h||12}px;width:${w};margin-bottom:${o.gap||9}px"></div>`;
  }
  return h;
}
// Deterministic, so placeholders don't reshuffle on re-render.
function skelRand(seed){
  let x=seed||7;
  return ()=>{x=(x*1103515245+12345)&0x7fffffff;return x/0x7fffffff;};
}
// Candle-shaped placeholder.
function skelCandles(height,count){
  const H=height||190,n=count||20;
  const rnd=skelRand(11);
  // Walk, then rescale to fill the box.
  const cs=[];
  let v=50;
  for(let i=0;i<n;i++){
    const open=v;
    v=v+(rnd()-0.46)*17;
    const close=v;
    const bTop=Math.max(open,close),bBot=Math.min(open,close);
    cs.push({bTop,bBot,hi:bTop+rnd()*7+1.2,lo:bBot-rnd()*7-1.2});
  }
  let lo=Infinity,hi=-Infinity;
  cs.forEach(c=>{lo=Math.min(lo,c.lo);hi=Math.max(hi,c.hi);});
  const span=(hi-lo)||1;
  const TOP=93,BOT=7;
  const at=x=>BOT+((x-lo)/span)*(TOP-BOT);
  let out='';
  cs.forEach((c,i)=>{
    const t=at(c.hi),b=at(c.lo),bt=at(c.bTop),bb=at(c.bBot);
    const d=(i*62)%900;
    out+=`<div class="skel-cs-c">`
      +`<i class="skel skel-cs-wick" style="top:${(100-t).toFixed(1)}%;height:${Math.max(1,t-b).toFixed(1)}%;animation-delay:${d}ms"></i>`
      +`<i class="skel skel-cs-body" style="top:${(100-bt).toFixed(1)}%;height:${Math.max(5,bt-bb).toFixed(1)}%;animation-delay:${d}ms"></i>`
      +`</div>`;
  });
  return `<div class="skel-cs" style="height:${H}px" aria-hidden="true">${out}</div>`;
}
// Area-chart silhouette.
function skelSpark(height){
  const H=height||54;
  const vs=[26,38,31,48,44,58,52,68,61,74,66,82,77,88];
  const pts=vs.map((v,i)=>((i/(vs.length-1))*100).toFixed(1)+'% '+(100-v).toFixed(1)+'%').join(',');
  return `<div class="skel skel-spark" style="height:${H}px;clip-path:polygon(${pts},100% 100%,0 100%)" aria-hidden="true"></div>`;
}

// Coins no upstream has history for (e.g. the app's own metal ids); don't refetch.
const _csNoHistory=new Set();
const CS_DEFAULT_TF='1d';
// Merge n candles; keep a trailing partial group.
function csGroup(ohlc,n){
  if(n<=1)return ohlc;
  const out=[];
  for(let i=0;i<ohlc.length;i+=n){
    const chunk=ohlc.slice(i,i+n);
    if(!chunk.length)continue;
    let hi=-Infinity,lo=Infinity;
    chunk.forEach(c=>{hi=Math.max(hi,c[2]);lo=Math.min(lo,c[3]);});
    out.push([chunk[0][0],chunk[0][1],hi,lo,chunk[chunk.length-1][4]]);
  }
  return out;
}
async function loadCandles(coinId,tfKey,btn,assetId){
  if(btn){btn.parentElement.querySelectorAll('.pnl-pill').forEach(x=>x.classList.remove('active'));btn.classList.add('active');}
  const tf=CS_TIMEFRAMES.find(t=>t.k===tfKey)||CS_TIMEFRAMES.find(t=>t.k===CS_DEFAULT_TF);
  const area=el('csArea');if(!area)return;
  // The chart being replaced may still be listening on the window mid-drag.
  if(area._csDestroy)area._csDestroy();
  area.outerHTML='<div class="cs-loading" id="csArea">'+skelCandles(190)+'</div>';
  const wrap=el('csArea')&&el('csArea').parentElement;
  const a=(state.assets||[]).find(x=>x.id===assetId)
    ||(state.assets||[]).find(x=>x.coinId===coinId)||null;
  const initial=!btn;
  // Known no-history holdings show nothing; others show the skeleton until data arrives.
  if(initial&&wrap)wrap.style.display=_csNoHistory.has(coinId)?'none':'';
  // Don't refetch a known empty.
  if(initial&&_csNoHistory.has(coinId))return;
  let data=null,pair=null;
  // None of these may abandon the render.
  try{
    // Real candles first, and pageable, so scrolling left keeps loading history.
    if(tf.bn){
      try{
        pair=await csPairFor(coinId);
        if(pair){
          const k=await fetchKlines(pair,tf.bn,1000,null);
          if(k&&k.length>1)data=k; else pair=null;
        }
      }catch(e){ pair=null; }
    }
    // Deepest series first, falling back to shallower ones.
    for(const req of (data?[]:(tf.series||[]))){
      try{
        const sr=await fetchChartSeries(coinId,req.days,req.interval);
        if(!sr||!sr.length)continue;
        const c=csCandlesFromSeries(sr,tf.bucket);
        if(c.length>1){data=c;break;}
      }catch(e){/* the next window down */}
    }
    // Fallback: the original /ohlc endpoint.
    if(!data){
      for(const size of tf.src||[]){
        try{
          const d=await fetchOHLC(coinId,size);
          if(d&&d.length){data=csGroup(d,tf.group);break;}
        }catch(e){/* try a shorter one */}
      }
    }
  }catch(e){ data=null; }

  const a2=el('csArea');if(!a2)return;
  if(!data||!data.length){
    // First load with no data removes the block; a timeframe switch only says so.
    if(!initial){
      a2.outerHTML='<div class="cs-loading" id="csArea">No candles at this timeframe</div>';
      csSetMeta(wrap,'');
    }else{
      if(wrap)wrap.style.display='none';
      _csNoHistory.add(coinId);
    }
    return;
  }
  if(wrap)wrap.style.display='';
  a2.outerHTML='<canvas class="cs-canvas" id="csArea"></canvas>';
  const canvas=el('csArea');
  mountCandleChart(canvas,data,a);
  const setMeta=()=>{
    const d=canvas._cs?canvas._cs.data:data;
    const spanDays=(d[d.length-1][0]-d[0][0])/864e5;
    csSetMeta(wrap,tf.label+' candles · '+d.length+' bars · '+csSpan(spanDays)+' of history');
  };
  setMeta();
  // Endless scrollback: prepend the previous page at the left edge. Offsets count from
  // the right so the view does not jump.
  if(pair&&canvas._cs){
    const st=canvas._cs;
    st.pages=1;
    st.loadMore=async()=>{
      if(st.pages>=CS_MAX_PAGES)return false;
      const first=st.data[0][0];
      const older=await fetchKlines(pair,tf.bn,1000,first-1);
      if(!older||!older.length)return false;
      const add=older.filter(c=>c[0]<first);
      if(!add.length)return false;
      st.data=add.concat(st.data);
      st.pages++;
      setMeta();
      return true;
    };
  }
}
function csSpan(days){
  if(days>=700)return (days/365).toFixed(days/365>=10?0:1).replace(/\.0$/,'')+' years';
  if(days>=330)return 'about a year';
  if(days>=60)return plural(Math.round(days/30),'month');
  if(days>=14)return plural(Math.round(days/7),'week');
  if(days>=2)return plural(Math.round(days),'day');
  if(days>=1)return 'a day';
  return plural(Math.round(days*24),'hour');
}
// Caption: candle size and how far back the data goes.
function csSetMeta(wrap,text){
  if(!wrap)return;
  let m=wrap.querySelector('.cs-meta');
  if(!m){m=document.createElement('div');m.className='cs-meta';
    const r=wrap.querySelector('.cs-range');
    wrap.insertBefore(m,r||null);}
  m.textContent=text||'';
}
// CANDLE CHART
// Pan, pinch-zoom, hold for a crosshair. Hand-drawn on canvas for 60fps redraws.
const CS_MIN_BARS=12, CS_MAX_BARS=180;
function mountCandleChart(canvas,ohlc,asset){
  if(!canvas||!ohlc||!ohlc.length)return;
  // Cost basis lines, in USD like the candles.
  const marks=csCostLines(asset);
  // Candle duration from the data, for axis labels.
  const step=ohlc.length>1?(ohlc[ohlc.length-1][0]-ohlc[0][0])/(ohlc.length-1):864e5;
  const st={
    data:ohlc,
    step,
    // How many candles are on screen, and where the right-hand edge sits.
    bars:Math.min(60,ohlc.length),
    offset:0,                 // candles hidden past the right edge (0 = latest)
    cross:null,               // index under the finger, or null
  };
  canvas._cs=st;
  const PAD_R=52, PAD_T=10, PAD_B=18, PAD_L=2;

  const view=()=>{
    const end=st.data.length-st.offset;
    const begin=Math.max(0,end-st.bars);
    return st.data.slice(Math.max(0,begin),Math.max(0,end));
  };

  const draw=()=>{
    const dpr=window.devicePixelRatio||1;
    const W=canvas.clientWidth||300, H=canvas.clientHeight||190;
    if(canvas.width!==Math.round(W*dpr)||canvas.height!==Math.round(H*dpr)){
      canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);
    }
    const ctx=canvas.getContext('2d');
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,W,H);
    const d=view();
    if(!d.length)return;
    const plotW=W-PAD_L-PAD_R, plotH=H-PAD_T-PAD_B;
    let lo=Infinity,hi=-Infinity;
    d.forEach(c=>{lo=Math.min(lo,c[3]);hi=Math.max(hi,c[2]);});
    // A hair of headroom so the extremes are not drawn on the frame.
    const pad=(hi-lo||hi||1)*0.06; lo-=pad; hi+=pad;
    const rng=hi-lo||1;
    const Y=v=>PAD_T+plotH*(1-(v-lo)/rng);
    const cw=plotW/d.length;
    const up=cssVar('--green'), dn=cssVar('--red');
    const line=cssVar('--border'), dim=cssVar('--text3'), txt=cssVar('--text');

    // Price scale on the right, where every trading app puts it.
    ctx.font='9px '+(cssVar('--font')||'Poppins, sans-serif');
    ctx.textAlign='left';ctx.textBaseline='middle';
    ctx.lineWidth=1;
    for(let i=0;i<=4;i++){
      const y=PAD_T+plotH*(i/4), v=hi-rng*(i/4);
      ctx.strokeStyle=line;ctx.globalAlpha=.5;
      ctx.beginPath();ctx.moveTo(PAD_L,y+.5);ctx.lineTo(PAD_L+plotW,y+.5);ctx.stroke();
      ctx.globalAlpha=1;ctx.fillStyle=dim;
      ctx.fillText(csPrice(v),PAD_L+plotW+5,y);
    }

    // Candles.
    d.forEach((c,i)=>{
      const o=c[1],h=c[2],l=c[3],cl=c[4];
      const x=PAD_L+i*cw+cw/2, col=cl>=o?up:dn;
      ctx.strokeStyle=col;ctx.fillStyle=col;
      ctx.lineWidth=Math.max(1,Math.min(1.5,cw*0.12));
      ctx.beginPath();ctx.moveTo(x,Y(h));ctx.lineTo(x,Y(l));ctx.stroke();
      const bw=Math.max(1,cw*0.62), yo=Y(o), yc=Y(cl);
      ctx.fillRect(x-bw/2,Math.min(yo,yc),bw,Math.max(1,Math.abs(yc-yo)));
    });

    // Last price: a dashed line across, and the number on the scale.
    const last=d[d.length-1], lastY=Y(last[4]);
    const lastCol=last[4]>=last[1]?up:dn;
    ctx.save();
    ctx.setLineDash([3,3]);ctx.strokeStyle=lastCol;ctx.globalAlpha=.65;ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(PAD_L,lastY+.5);ctx.lineTo(PAD_L+plotW,lastY+.5);ctx.stroke();
    ctx.restore();
    ctx.fillStyle=lastCol;
    ctx.fillRect(PAD_L+plotW+2,lastY-7,PAD_R-4,14);
    ctx.fillStyle=cssVar('--accent-ink')||'#000';
    ctx.fillText(csPrice(last[4]),PAD_L+plotW+5,lastY);

    // Dates along the bottom, as many as fit without crowding.
    ctx.fillStyle=dim;ctx.textBaseline='alphabetic';
    const every=Math.max(1,Math.ceil(d.length/4));
    d.forEach((c,i)=>{
      if(i%every)return;
      const x=PAD_L+i*cw+cw/2;
      const lab=csAxisLabel(c[0],step,i?d[Math.max(0,i-every)][0]:null);
      ctx.textAlign=i===0?'left':'center';
      ctx.fillText(lab,Math.min(Math.max(x,PAD_L),PAD_L+plotW),H-5);
    });

    // Average buy/sell levels; off-screen ones stack at the edge they are beyond.
    let pinnedTop=0,pinnedBot=0;
    marks.forEach(mk=>{
      // Off-screen levels pin to the edge with an arrow.
      const off=mk.usd>hi?1:(mk.usd<lo?-1:0);
      const y=off>0?PAD_T+1+(pinnedTop++)*15
             :off<0?PAD_T+plotH-1-(pinnedBot++)*15
             :Y(mk.usd);
      ctx.save();
      ctx.setLineDash([5,4]);ctx.strokeStyle=mk.color;ctx.globalAlpha=.85;ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(PAD_L,y+.5);ctx.lineTo(PAD_L+plotW,y+.5);ctx.stroke();
      ctx.restore();
      ctx.font='8.5px '+(cssVar('--font')||'Poppins, sans-serif');
      const label=(off>0?'\u2191 ':off<0?'\u2193 ':'')+mk.label;
      const tw2=ctx.measureText(label).width+8;
      // Centred on the line it belongs to, not floating above it.
      const lh=13;
      ctx.globalAlpha=.92;ctx.fillStyle=mk.color;
      ctx.beginPath();
      if(ctx.roundRect)ctx.roundRect(PAD_L+2,y-lh/2,tw2,lh,3);
      else ctx.rect(PAD_L+2,y-lh/2,tw2,lh);
      ctx.fill();
      ctx.globalAlpha=1;ctx.fillStyle=cssVar('--accent-ink')||'#000';
      ctx.textAlign='left';ctx.textBaseline='middle';
      ctx.fillText(label,PAD_L+6,y);
      ctx.font='9px '+(cssVar('--font')||'Poppins, sans-serif');
    });

    // Show loading/start-of-history at the edge; the fetch starts 40 candles early.
    if(st.loadMore&&(st.loading||(st.exhausted&&st.offset+st.bars>=st.data.length-2))){
      const msg=st.loading?'Loading older':'Start of history';
      {
        ctx.save();
        ctx.font='600 9.5px '+(cssVar('--font')||'Poppins, sans-serif');
        ctx.textAlign='left';ctx.textBaseline='middle';
        // Spinning arc in the pill.
        const R=4.2, PADX=9, GAP=6;
        const lead=st.loading?(R*2+GAP):0;
        const tw=ctx.measureText(msg).width;
        const w=PADX*2+lead+tw, h=21;
        const bx=PAD_L+6, by=PAD_T+plotH/2;
        ctx.globalAlpha=.95;ctx.fillStyle=cssVar('--card2')||'#202020';
        ctx.beginPath();
        if(ctx.roundRect)ctx.roundRect(bx,by-h/2,w,h,h/2); else ctx.rect(bx,by-h/2,w,h);
        ctx.fill();
        ctx.globalAlpha=1;
        ctx.strokeStyle=cssVar('--border2')||'#333';ctx.lineWidth=1;ctx.stroke();
        const ink=st.loading?(cssVar('--accent')||'#f5a623'):dim;
        if(st.loading){
          const cx=bx+PADX+R, cy=by;
          const a0=(Date.now()/135)%(Math.PI*2);
          ctx.lineWidth=1.7;ctx.lineCap='round';
          ctx.globalAlpha=.28;ctx.strokeStyle=ink;
          ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.stroke();
          ctx.globalAlpha=1;
          ctx.beginPath();ctx.arc(cx,cy,R,a0,a0+Math.PI*1.15);ctx.stroke();
        }
        ctx.fillStyle=ink;
        ctx.fillText(msg,bx+PADX+lead,by+.5);
        ctx.restore();
      }
    }

    // Crosshair and the readout for the candle under the finger.
    if(st.cross!=null&&d[st.cross]){
      const c=d[st.cross], x=PAD_L+st.cross*cw+cw/2;
      ctx.save();
      ctx.strokeStyle=txt;ctx.globalAlpha=.35;ctx.lineWidth=1;ctx.setLineDash([2,3]);
      ctx.beginPath();ctx.moveTo(x+.5,PAD_T);ctx.lineTo(x+.5,PAD_T+plotH);ctx.stroke();
      ctx.beginPath();ctx.moveTo(PAD_L,Y(c[4])+.5);ctx.lineTo(PAD_L+plotW,Y(c[4])+.5);ctx.stroke();
      ctx.restore();
      // Dot on the close of the read candle.
      const dotCol=c[4]>=c[1]?up:dn;
      ctx.beginPath();ctx.arc(x,Y(c[4]),3,0,Math.PI*2);
      ctx.fillStyle=cssVar('--card')||'#111';ctx.fill();
      ctx.lineWidth=1.5;ctx.strokeStyle=dotCol;ctx.stroke();
      csReadout(canvas,c,step);
    }else csReadout(canvas,null,step);
  };

  // gestures
  let drag=null, pinch=null;
  const idxAt=clientX=>{
    const r=canvas.getBoundingClientRect();
    const plotW=r.width-PAD_L-PAD_R;
    const d=view(); if(!d.length)return null;
    const t=(clientX-r.left-PAD_L)/plotW;
    return Math.max(0,Math.min(d.length-1,Math.floor(t*d.length)));
  };
  const clampOffset=()=>{
    st.offset=Math.max(0,Math.min(st.data.length-CS_MIN_BARS,st.offset));
    maybeBackfill();
  };
  // Prefetch the previous page near the left edge; one request at a time, stop when exhausted.
  const BACKFILL_AT=40;
  const maybeBackfill=()=>{
    if(!st.loadMore||st.loading||st.exhausted)return;
    if(st.data.length-st.offset-st.bars>BACKFILL_AT)return;
    st.loading=true;
    draw();
    // Repaint while loading so the spinner moves.
    clearInterval(st._loadTick);
    st._loadTick=setInterval(()=>{ if(st.loading)draw(); else clearInterval(st._loadTick); },55);
    const done=()=>{ st.loading=false; clearInterval(st._loadTick); draw(); };
    st.loadMore().then(got=>{
      if(!got)st.exhausted=true;
      done();
    }).catch(()=>{st.exhausted=true;done();});
  };
  // Touch: move at once to pan; hold still to scrub with a crosshair.
  const HOLD_MS=260, PAN_SLOP=10;
  let mode=null;            // 'pan' | 'scrub' | null (undecided)
  let holdTimer=null;
  const onDown=e=>{
    if(e.touches&&e.touches.length===2){
      pinch=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,
                       e.touches[0].clientY-e.touches[1].clientY);
      drag=null;mode=null;clearTimeout(holdTimer);return;
    }
    const t=e.touches?e.touches[0]:e;
    const isTouch=!!e.touches;
    drag={x:t.clientX,startOffset:st.offset,moved:0,isTouch};
    clearTimeout(canvas._csClear);
    if(isTouch){
      mode=null;
      clearTimeout(holdTimer);
      // Held still long enough: this is a read, not a scroll.
      holdTimer=setTimeout(()=>{
        if(mode===null&&drag&&drag.moved<=PAN_SLOP){
          mode='scrub';st.cross=idxAt(drag.x);draw();
          if(navigator.vibrate&&state.settings.haptics!==false){try{navigator.vibrate(8);}catch(_){}}
        }
      },HOLD_MS);
    }else{
      mode='scrub';st.cross=idxAt(t.clientX);draw();
    }
  };
  const onMove=e=>{
    if(pinch!=null&&e.touches&&e.touches.length===2){
      const now=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,
                           e.touches[0].clientY-e.touches[1].clientY);
      if(now>0&&pinch>0){
        const ratio=pinch/now;
        st.bars=Math.round(Math.max(CS_MIN_BARS,Math.min(
          Math.min(CS_MAX_BARS,st.data.length),st.bars*ratio)));
        pinch=now;clampOffset();draw();
      }
      return;
    }
    if(!drag)return;
    const t=e.touches?e.touches[0]:e;
    const x=t.clientX;
    drag.moved=Math.max(drag.moved,Math.abs(x-drag.x));
    if(mode===null&&drag.moved>PAN_SLOP){mode='pan';clearTimeout(holdTimer);}
    // Mouse: starts scrubbing, switches to panning past the slop. A held finger keeps scrubbing.
    if(mode==='scrub'&&!drag.isTouch&&drag.moved>PAN_SLOP){mode='pan';st.cross=null;}
    if(mode==='scrub'){
      st.cross=idxAt(x);draw();return;
    }
    if(mode==='pan'){
      const r=canvas.getBoundingClientRect();
      const perBar=(r.width-PAD_L-PAD_R)/Math.max(1,st.bars);
      st.offset=drag.startOffset+Math.round((x-drag.x)/perBar);
      clampOffset();st.cross=null;draw();
    }
  };
  const onUp=()=>{
    clearTimeout(holdTimer);
    detachWindowDrag();
    drag=null;pinch=null;
    const wasScrub=mode==='scrub';
    mode=null;
    clearTimeout(canvas._csClear);
    if(wasScrub){
      // Leave it up long enough to actually read.
      canvas._csClear=setTimeout(()=>{st.cross=null;draw();},3000);
    }
    if(canvas.style)canvas.style.cursor='crosshair';
  };
  // Window listeners only while a mouse button is down; removed afterwards.
  let winBound=false;
  const attachWindowDrag=()=>{
    if(winBound)return; winBound=true;
    window.addEventListener('mousemove',onMove);
    window.addEventListener('mouseup',onUp);
  };
  const detachWindowDrag=()=>{
    if(!winBound)return; winBound=false;
    window.removeEventListener('mousemove',onMove);
    window.removeEventListener('mouseup',onUp);
  };
  canvas.addEventListener('touchstart',onDown,{passive:true});
  canvas.addEventListener('touchmove',onMove,{passive:true});
  canvas.addEventListener('touchend',onUp,{passive:true});
  canvas.addEventListener('touchcancel',onUp,{passive:true});
  canvas.style.cursor='crosshair';
  canvas.addEventListener('mousedown',e=>{e.preventDefault();canvas.style.cursor='grabbing';attachWindowDrag();onDown(e);});
  canvas.addEventListener('mousemove',e=>{if(!drag){mode='scrub';st.cross=idxAt(e.clientX);draw();}});
  canvas.addEventListener('mouseleave',()=>{if(!drag){st.cross=null;draw();}});
  canvas.addEventListener('wheel',e=>{
    // Sideways wheel or shift+wheel pans; a plain wheel zooms.
    const sideways=Math.abs(e.deltaX)>Math.abs(e.deltaY);
    if(sideways||e.shiftKey){
      const r=canvas.getBoundingClientRect();
      const perBar=(r.width-PAD_L-PAD_R)/Math.max(1,st.bars);
      const px=sideways?e.deltaX:e.deltaY;
      st.offset-=Math.round(px/Math.max(2,perBar))||(px>0?-1:1);
      clampOffset();st.cross=null;draw();
      if(e.cancelable)e.preventDefault();
      return;
    }
    const f=e.deltaY>0?1.12:0.89;
    st.bars=Math.round(Math.max(CS_MIN_BARS,Math.min(
      Math.min(CS_MAX_BARS,st.data.length),st.bars*f)));
    clampOffset();draw();
  },{passive:false});
  // Clean up if the canvas is removed mid-drag.
  canvas._csDestroy=()=>{detachWindowDrag();clearTimeout(holdTimer);clearTimeout(canvas._csClear);clearInterval(st._loadTick);};
  canvas._csDraw=draw;
  draw();
}
// Average buy (asset cost) and average sell (ledger) in USD.
function csCostLines(a){
  if(!a)return [];
  const perUsd=v=>{const f=fxOf(baseCode());return f>0?v/f:null;};
  const out=[];
  const buy=num(a.buyPrice);
  if(buy>0){const u=perUsd(buy);if(u)out.push({usd:u,color:cssVar('--green')||'#16d6a4',label:'Avg buy '+csPrice(u)});}
  let sellAmt=0,sellQty=0;
  (state.transactions||[]).forEach(t=>{
    if(t.assetId!==a.id||t.txType!=='sell')return;
    sellAmt+=num(t.amount);sellQty+=num(t.qty);
  });
  if(sellQty>0){const u=perUsd(sellAmt/sellQty);
    if(u)out.push({usd:u,color:cssVar('--red')||'#ff5b75',label:'Avg sell '+csPrice(u)});}
  return out;
}
// Prices come from CoinGecko in USD; show them in whatever the user reads in.
function csPrice(usd){
  const v=usdToBase(usd)*getCurrRate(currentCurrency.code);
  const a=Math.abs(v);
  const s=currentCurrency.sym;
  if(a>=1e7)return s+(v/1e7).toFixed(2)+'Cr';
  if(a>=1e5)return s+(v/1e5).toFixed(2)+'L';
  if(a>=1000)return s+(v/1000).toFixed(1)+'K';
  return s+v.toFixed(a<1?4:2);
}
// Labels match the candle size: time, date, or month and year.
function csAxisLabel(ts,step,prevTs){
  const d=new Date(ts);
  if(step<864e5){
    // Name the day at the first label after midnight.
    if(prevTs!=null&&new Date(prevTs).toDateString()!==d.toDateString())
      return d.toLocaleDateString(undefined,{month:'short',day:'numeric'});
    return d.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'});
  }
  // Aug '25 so it doesn't read as a day of the month.
  if(step>=25*864e5)return d.toLocaleDateString(undefined,{month:'short'})+" '"+String(d.getFullYear()).slice(-2);
  return d.toLocaleDateString(undefined,{month:'short',day:'numeric'});
}
function csStamp(ts,step){
  const d=new Date(ts);
  const day=d.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});
  if(step&&step<864e5)return day+' · '+d.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'});
  return day;
}
function csReadout(canvas,c,step){
  const box=canvas.parentElement&&canvas.parentElement.querySelector('.cs-readout');
  if(!box)return;
  if(!c){box.innerHTML='';box.classList.remove('show');return;}
  const chg=c[1]?((c[4]-c[1])/c[1])*100:0;
  box.innerHTML=
    `<span class="cs-r-date">${esc(csStamp(c[0],step))}</span>`
    +`<span class="cs-r-pair"><i>O</i>${csPrice(c[1])}</span>`
    +`<span class="cs-r-pair"><i>H</i>${csPrice(c[2])}</span>`
    +`<span class="cs-r-pair"><i>L</i>${csPrice(c[3])}</span>`
    +`<span class="cs-r-pair"><i>C</i>${csPrice(c[4])}</span>`
    +`<span class="cs-r-chg ${chg>=0?'up':'dn'}">${chg>=0?'+':''}${chg.toFixed(2)}%</span>`;
  box.classList.add('show');
}
function drawCandles(canvas,ohlc,asset){mountCandleChart(canvas,ohlc,asset);}
// ADD/EDIT DEBT
// With several lend entries the principal is their sum and read-only.
function syncDebtLock(d){
  const entries=(d&&d.lendHistory||[]).filter(h=>h&&num(h.amount)>0);
  const lock=!!(d&&entries.length);
  const note=el('debtLedgerLock');
  if(note){
    note.hidden=!lock;
    const txt=el('debtLedgerLockTxt');
    const word=(d&&d.type==='owed')?'lend':'borrow';
    if(txt&&lock)txt.textContent=entries.length>1
      ? 'This is the total of the '+entries.length+' entries in the '+word+' history. Add to it with Record '
        +((d.type==='owed')?'Lend':'Borrow')+', or open the entry that is wrong.'
      : 'This comes from the entry in the '+word+' history. Open it there to correct the amount, the date, or which account it moved through.';
  }
  const f=el('debtAmount');
  if(f){f.readOnly=lock;f.setAttribute('aria-readonly',lock?'true':'false');}
}
// The opening lend can move money through an account too.
let debtNewAcct=null;
function syncDebtNewAcct(d){
  const row=el('debtNewAcctRow');if(!row)return;
  // Several entries: no single opening lend to attach an account to.
  const many=!!(d&&(d.lendHistory||[]).length>1);
  const show=!!selectedDebtType&&!many;
  row.hidden=!show;
  row.style.display=show?'':'none';
  if(!show)return;
  const isOwed=selectedDebtType==='owed';
  const lbl=el('debtNewAcctLbl');
  if(lbl)lbl.textContent=isOwed?'PAID FROM':'RECEIVED INTO';
  const hint=el('debtNewAcctHint');
  if(hint)hint.textContent=isOwed
    ? 'Which account the money left. Its balance follows.'
    : 'Where the money landed. Its balance follows.';
  buildDebtAcctSelect('debtNewAcctWrap','new',debtNewAcct,v=>{debtNewAcct=v;},!isOwed);
}
function openAddDebt(){editingDebtId=null;debtNewAcct=null;syncDebtLock(null);el('addDebtTitle').textContent='Add Debt';el('saveDebtBtn').textContent='Add Debt';el('deleteDebtBtn').style.display='none';selectedDebtType=null;el('dtypeOwed').className='dtype-btn';el('dtypeIOwe').className='dtype-btn';el('debtName').value='';el('debtNote').value='';el('debtDue').value='';el('debtAmount').value='';interestEnabled=false;intType='flat';intFreq='day';intFlatFreq='month';intCompound=false;el('compoundToggle').className='toggle';el('compoundToggle').setAttribute('aria-checked','false');el('interestToggle').className='toggle';el('interestToggle').setAttribute('aria-checked','false');el('interestFields').style.display='none';setIntType('flat');setIntFreq('day');setIntFlatFreq('month');chargeFrom='lend';setChargeFrom('lend');el('intFlatAmount').value='';setLentDate(0);setDueDateEnabled(false,'');updateCurrLabels();resetMoneyCcy(['debtAmount','intFlatAmount']);bindMoneyCcy('debtAmount','debtAmountCcyWrap');bindMoneyCcy('intFlatAmount','intFlatAmountCcyWrap');const ab=el('accruedBox');if(ab)ab.style.display='none';syncDebtNewAcct(null);openModal('addDebtModal');}
function openDebtEdit(id){const d=state.debts.find(x=>x.id===id);if(!d)return;editingDebtId=id;el('addDebtTitle').textContent='Edit Debt';el('saveDebtBtn').textContent='Save Changes';el('deleteDebtBtn').style.display='block';setDebtType(d.type);resetMoneyCcy(['debtAmount','intFlatAmount']);bindMoneyCcy('debtAmount','debtAmountCcyWrap');bindMoneyCcy('intFlatAmount','intFlatAmountCcyWrap');el('debtName').value=d.name;setMoneyField('debtAmount',d.amount);el('debtNote').value=d.note||'';setDueDateEnabled(!!(d.due),d.due||'');const lentDateVal=d.lentDate||(d.date?d.date.split('T')[0]:'');el('debtLentDate').value=lentDateVal;syncLentQuickBtns();const int=d.interest||{};interestEnabled=int.enabled||false;intType=int.type||'flat';el('interestToggle').className='toggle'+(interestEnabled?' on':'');el('interestToggle').setAttribute('aria-checked',interestEnabled?'true':'false');el('interestFields').style.display=interestEnabled?'block':'none';setIntType(intType);if(int.flatAmount)setMoneyField('intFlatAmount',int.flatAmount);if(int.rate)el('intRate').value=int.rate;if(intType==='flat'){intFlatFreq=int.freq||'month';setIntFlatFreq(intFlatFreq);}else{intFreq=int.freq||'month';setIntFreq(intFreq);}intCompound=int.compound||false;el('compoundToggle').className='toggle'+(intCompound?' on':'');el('compoundToggle').setAttribute('aria-checked',intCompound?'true':'false');chargeFrom=int.chargeFrom||'lend';setChargeFrom(chargeFrom);updateCurrLabels();syncDebtLock(d);const _l0=(d.lendHistory||[])[0];debtNewAcct=(_l0&&_l0.account)||CASH_NONE;syncDebtNewAcct(d);refreshAccruedBox(d);openModal('addDebtModal');}
function scrollToAndPulse(elId,inputId){const target=el(elId)||el(inputId);if(!target)return;const modal=target.closest('.modal-body');if(modal)modal.scrollTo({top:target.offsetTop-20,behavior:'smooth'});target.classList.add('dtype-pulse');setTimeout(()=>target.classList.remove('dtype-pulse'),700);if(inputId&&el(inputId)&&el(inputId)!==target){el(inputId).focus();el(inputId).classList.add('input-error');setTimeout(()=>el(inputId).classList.remove('input-error'),1000);}}
// Picking a person also sets the direction.
function debtSuggestions(){
  const seen=new Map();
  (state.debts||[]).forEach(d=>{
    if(!d||d.id===editingDebtId)return;
    const k=d.type+'|'+(d.name||'').toLowerCase();
    if(seen.has(k))return;
    const rem=debtRemaining(d);
    seen.set(k,{name:d.name,icon:d.type==='owed'?'coins':'wallet',
      sub:(d.type==='owed'?'They owe you':'You owe them')+' · '+fmt(rem)
        +(d.note?' · '+d.note:''),
      debt:d});
  });
  return [...seen.values()];
}
function onDebtNameInput(){
  nameSuggestions(el('debtNameSuggest'),el('debtName'),debtSuggestions(),it=>{
    const d=it.debt;
    if(d.type&&d.type!==selectedDebtType)setDebtType(d.type);
    if(d.note&&!el('debtNote').value)el('debtNote').value=d.note;
    if(d.interest&&d.interest.enabled&&!interestEnabled){
      // Same person, same terms, unless you say otherwise.
      interestEnabled=true;
      intType=d.interest.type||'flat';
      el('interestToggle').className='toggle on';
      el('interestToggle').setAttribute('aria-checked','true');
      el('interestFields').style.display='block';
      setIntType(intType);
      if(d.interest.rate)el('intRate').value=d.interest.rate;
      if(d.interest.flatAmount)setMoneyField('intFlatAmount',d.interest.flatAmount);
      if(intType==='flat'){intFlatFreq=d.interest.freq||'month';setIntFlatFreq(intFlatFreq);}
      else{intFreq=d.interest.freq||'month';setIntFreq(intFreq);}
    }
    toast('Adding to '+stripParens(d.name)+', currently '+fmt(debtRemaining(d)),'success');
  });
}
function saveDebt(){if(!selectedDebtType){['dtypeOwed','dtypeIOwe'].forEach(id=>{const b=el(id);b.classList.add('dtype-pulse');setTimeout(()=>b.classList.remove('dtype-pulse'),700);});const typeRow=el('dtypeOwed').closest('.form-row');if(typeRow){const modal=typeRow.closest('.modal-body');if(modal)modal.scrollTo({top:0,behavior:'smooth'});}toast('Select debt type','error');return;}const name=el('debtName').value.trim(),amt=parseFloat(el('debtAmount').value)||0;if(!name){scrollToAndPulse('debtName','debtName');toast('Enter a name','error');return;}if(!amt||amt<0){scrollToAndPulse('debtAmount','debtAmount');toast(amt<0?'Amount cannot be negative':'Enter an amount','error');return;}if(dueDateEnabled&&!el('debtDue').value){const df=el('dueDateField');if(df){const modal=df.closest('.modal-body');if(modal)modal.scrollTo({top:df.offsetTop-20,behavior:'smooth'});}el('debtDue').classList.add('input-error');setTimeout(()=>el('debtDue').classList.remove('input-error'),1000);toast('Pick a due date or turn off the toggle','error');return;}const amtN=moneyBase('debtAmount');let interest={enabled:false};if(interestEnabled)interest={enabled:true,type:intType,freq:intType==='flat'?intFlatFreq:intFreq,flatAmount:intType==='flat'?(moneyBase('intFlatAmount')||0):null,rate:intType==='pct'?parseFloat(el('intRate').value)||0:null,compound:intType==='pct'?intCompound:false,chargeFrom};
  const lentDate=el('debtLentDate').value||todayStr();const noteVal=el('debtNote').value.trim();const debt={id:editingDebtId||uid(),type:selectedDebtType,name,amount:amtN,note:noteVal,due:el('debtDue').value||null,interest,lentDate,date:editingDebtId?(state.debts.find(d=>d.id===editingDebtId)?.date||new Date().toISOString()):new Date().toISOString()};
  if(editingDebtId){
    const i=state.debts.findIndex(d=>d.id===editingDebtId);
    if(i!==-1){
      const prev=state.debts[i];
      // Merge, never replace: this sheet does not know every field (history, payments).
      const lends=(prev.lendHistory||[]).slice();
      const merged=Object.assign({},prev,debt,{payments:prev.payments||[],lendHistory:lends});
      if(lends.length>1){
        // Several entries: principal is their total.
        merged.amount=lends.reduce((t,h)=>t+num(h.amount),0);
      }else if(lends.length===1){
        // One entry: the amount edits that entry; reverse its old cash movement first.
        const was=lends[0];
        const acct=(debtNewAcct&&debtNewAcct!==CASH_NONE)?resolveCashAccount(debtNewAcct):null;
        reverseDebtCash(prev,was,'lend');
        const err=debtCashError(debt,acct,amtN,'lend');
        if(err){applyDebtCash(prev,was,'lend');toast(err,'error');return;}
        const next=Object.assign({},was,{amount:amtN,date:lentDate,note:noteVal||was.note||null,
          account:acct?acct.id:null,linkId:acct?(was.linkId||uid()):null});
        applyDebtCash(debt,next,'lend');
        lends[0]=next;
        merged.amount=amtN;
      }else{
        merged.lendHistory=[{id:uid(),amount:amtN,note:noteVal||null,date:lentDate}];
        merged.amount=amtN;
      }
      state.debts[i]=merged;
    }
  }else{
    // Merge if same name + same type (case-sensitive)
    const existing=state.debts.find(d=>d.name===name&&d.type===selectedDebtType);
    // Checked before writing.
    const acct=(debtNewAcct&&debtNewAcct!==CASH_NONE)?resolveCashAccount(debtNewAcct):null;
    {const err=debtCashError(debt,acct,amtN,'lend');if(err){toast(err,'error');return;}}
    const entry={id:uid(),amount:amtN,note:noteVal||null,date:lentDate,
      account:acct?acct.id:null,linkId:null};
    if(existing){
      if(!existing.lendHistory)existing.lendHistory=[{id:uid(),amount:existing.amount,note:existing.note||null,date:existing.lentDate||(existing.date?existing.date.split('T')[0]:lentDate)}];
      existing.amount+=amtN;
      existing.lendHistory.push(entry);
      if(!existing.payments)existing.payments=[];
      applyDebtCash(existing,entry,'lend');
      toast(name+': new debt added to history','success');
    }else{
      debt.lendHistory=[entry];
      state.debts.push(debt);
      applyDebtCash(debt,entry,'lend');
      toast('Debt added!','success');
    }
  }saveState();closeModal('addDebtModal');renderAll();haptic('success');}
async function deleteDebt(){
  if(!editingDebtId)return;
  const _d=state.debts.find(d=>d.id===editingDebtId);const _id=editingDebtId;
  // Reverse every cash movement the debt's entries made.
  const legs=[].concat((_d&&_d.lendHistory||[]).map(e=>({e,kind:'lend'})),
                       (_d&&_d.payments||[]).map(e=>({e,kind:'pay'})))
              .filter(x=>x.e&&x.e.account&&x.e.linkId);
  let msg='The debt and its full payment history will be removed.';
  if(legs.length)msg+=' The '+legs.length+' entr'+(legs.length===1?'y':'ies')+' that moved money through an account will be put back.';
  if(!await askConfirm({title:'Delete debt?',message:msg,confirmText:'Delete'}))return;
  withUndo((_d?stripParens(_d.name):'Debt')+' deleted',['debts','assets','transactions'],()=>{
    legs.forEach(x=>reverseDebtCash(_d,x.e,x.kind));
    state.debts=state.debts.filter(d=>d.id!==_id);
    saveState();
  });
  closeModal('addDebtModal');renderAll();haptic('tap');
}
// GOALS
const GOAL_QUICK={3:'goalQk3m',6:'goalQk6m',12:'goalQk1y',24:'goalQk2y'};
function setGoalDate(months){const inp=el('goalDate');if(!inp)return;inp.value=monthsAheadISO(months);syncGoalQuickBtns();renderGoalProjection();haptic('tap');}
function syncGoalQuickBtns(){const inp=el('goalDate');if(!inp)return;const v=inp.value;Object.keys(GOAL_QUICK).forEach(m=>{const b=el(GOAL_QUICK[m]);if(b)b.className='freq-btn'+(v&&v===monthsAheadISO(Number(m))?' active':'');});}
function openAddGoal(){editingGoalId=null;selectedGoalIcon='target';selGoalColor='acc';goalLinkedAssetIds=[];el('addGoalTitle').textContent='Add Goal';el('saveGoalBtn').textContent='Add Goal';el('deleteGoalBtn').style.display='none';resetMoneyCcy(['goalTarget','goalSaved','goalMonthly']);['goalTarget','goalSaved','goalMonthly'].forEach(id=>bindMoneyCcy(id,id+'CcyWrap',renderGoalProjection));el('goalName').value='';el('goalTarget').value='';el('goalSaved').value='';el('goalDate').value='';if(el('goalMonthly'))el('goalMonthly').value='';syncGoalQuickBtns();updateCurrLabels();renderGoalIconGrid();renderGoalColors();syncGoalLinkUI();renderGoalProjection();openModal('addGoalModal');}
function openGoalDetail(id){const g=state.goals.find(x=>x.id===id);if(!g)return;editingGoalId=id;selectedGoalIcon=g.icon||'target';selGoalColor=g.colorTheme||'acc';goalLinkedAssetIds=goalLinkedIds(g).slice();el('addGoalTitle').textContent='Edit Goal';el('saveGoalBtn').textContent='Save Changes';el('deleteGoalBtn').style.display='block';resetMoneyCcy(['goalTarget','goalSaved','goalMonthly']);['goalTarget','goalSaved','goalMonthly'].forEach(id=>bindMoneyCcy(id,id+'CcyWrap',renderGoalProjection));el('goalName').value=g.name;setMoneyField('goalTarget',g.target);setMoneyField('goalSaved',g.saved);el('goalDate').value=g.date||'';setMoneyField('goalMonthly',g.monthly,0);syncGoalQuickBtns();updateCurrLabels();renderGoalIconGrid();renderGoalColors();syncGoalLinkUI();renderGoalProjection();openModal('addGoalModal');}
function liquidityAssetOptions(){return state.assets.filter(a=>a.category==='liquidity').map(a=>({value:a.id,label:a.name,sub:fmt(getAssetCurrentValue(a))}));}
function syncGoalLinkUI(){
  const opts=liquidityAssetOptions();
  const toggle=el('goalLinkToggle'),picker=el('goalLinkPicker'),savedInput=el('goalSaved'),presetsRow=el('goalPresetsRow');
  // Clean up deleted assets
  goalLinkedAssetIds=goalLinkedAssetIds.filter(id=>opts.some(o=>o.value===id));
  const linked=goalLinkedAssetIds.length>0;
  toggle.className='toggle'+(linked?' on':'');toggle.setAttribute('aria-checked',linked?'true':'false');
  picker.style.display=linked?'block':'none';
  savedInput.readOnly=linked;savedInput.style.opacity=linked?'.6':'1';
  presetsRow.style.display=linked?'none':'';
  if(!opts.length){el('goalLinkHint').textContent='Add a Liquidity asset (savings, cash, FD) first to link a goal.';if(toggle.classList.contains('on')){toggle.classList.remove('on');toggle.setAttribute('aria-checked','false');picker.style.display='none';savedInput.readOnly=false;savedInput.style.opacity='1';presetsRow.style.display='';goalLinkedAssetIds=[];}}
  const list=el('goalLinkAssetList');if(list){list.innerHTML=opts.map(o=>{const checked=goalLinkedAssetIds.includes(o.value);return`<label style="display:flex;align-items:center;gap:10px;padding:8px 10px;background:var(--bg3);border:1px solid var(--border);border-radius:10px;cursor:pointer;${checked?'border-color:var(--accent);':''}"><input type="checkbox" style="width:16px;height:16px;accent-color:var(--accent);cursor:pointer" ${checked?'checked':''} onchange="toggleGoalAsset('${o.value}',this.checked)"/><div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:600;color:var(--text)">${esc(o.label)}</div><div style="font-size:10px;color:var(--text3)">${o.sub}</div></div></label>`;}).join('');}
  applyGoalLinkValue();
}
function toggleGoalAsset(id,checked){if(checked){if(!goalLinkedAssetIds.includes(id))goalLinkedAssetIds.push(id);}else{goalLinkedAssetIds=goalLinkedAssetIds.filter(x=>x!==id);}if(!goalLinkedAssetIds.length){el('goalLinkToggle').className='toggle';el('goalLinkToggle').setAttribute('aria-checked','false');el('goalLinkPicker').style.display='none';el('goalSaved').readOnly=false;el('goalSaved').style.opacity='1';el('goalPresetsRow').style.display='';}syncGoalLinkUI();}
function applyGoalLinkValue(){if(!goalLinkedAssetIds.length)return;const total=goalLinkedAssetIds.reduce((s,id)=>{const a=state.assets.find(x=>x.id===id);return s+(a?getAssetCurrentValue(a):0);},0);setMoneyField('goalSaved',total);const names=goalLinkedAssetIds.map(id=>{const a=state.assets.find(x=>x.id===id);return a?a.name:'';}).filter(Boolean);el('goalLinkHint').textContent='Tracking: '+names.join(', ')+' · updates automatically';}
function toggleGoalLink(){
  const opts=liquidityAssetOptions();
  if(!opts.length){toast('Add a Liquidity asset first to link a goal','error');return;}
  const nowOn=!el('goalLinkToggle').classList.contains('on');
  if(nowOn&&!goalLinkedAssetIds.length)goalLinkedAssetIds=[opts[0].value];
  if(!nowOn){goalLinkedAssetIds=[];el('goalSaved').readOnly=false;el('goalSaved').style.opacity='1';el('goalPresetsRow').style.display='';}
  haptic('tap');syncGoalLinkUI();
  haptic('tap');syncGoalLinkUI();
}
// Target and saved are converted to base like every money field.
async function saveGoal(){const name=el('goalName').value.trim();if(!name){toast('Enter a goal name','error');return;}
  const targetRaw=moneyBase('goalTarget')||0,savedRaw=moneyBase('goalSaved')||0;
  if(targetRaw<0||savedRaw<0){toast('Negative values are not allowed','error');return;}
  if(!editingGoalId&&state.goals.some(g=>g.name.toLowerCase()===name.toLowerCase())){if(!await askConfirm({title:'Goal name already used',message:'You already have a goal called “'+name+'”. Create a second one with the same name?',confirmText:'Create anyway',danger:false}))return;}
  const goal={id:editingGoalId||uid(),name,icon:selectedGoalIcon,colorTheme:selGoalColor,target:targetRaw,saved:savedRaw,date:el('goalDate').value||null,monthly:(function(){const m=moneyBase('goalMonthly');return (!isNaN(m)&&m>0)?m:null;})(),linkedAssetIds:goalLinkedAssetIds.slice(),linkedAssetId:goalLinkedAssetIds[0]||null};
  const wasDone=completedGoals.has(goal.id),nowDone=goal.target>0&&goal.saved>=goal.target;
  // Merge onto the existing goal to keep fields this sheet doesn't know.
  if(editingGoalId){const i=state.goals.findIndex(g=>g.id===editingGoalId);if(i!==-1)state.goals[i]=Object.assign({},state.goals[i],goal);}else state.goals.push(goal);
  saveState();closeModal('addGoalModal');renderAll();haptic('success');toast(editingGoalId?'Goal updated!':'Goal added!','success');
  if(nowDone&&!wasDone){completedGoals.add(goal.id);fireConfetti();toast('🎉 Goal reached!','success');}else if(nowDone)completedGoals.add(goal.id);else completedGoals.delete(goal.id);}
async function deleteGoal(){if(!editingGoalId)return;if(!await askConfirm({title:'Delete goal?',message:'This goal will be removed. Any linked assets stay exactly as they are.',confirmText:'Delete goal'}))return;const _g=state.goals.find(g=>g.id===editingGoalId);const _id=editingGoalId;withUndo((_g?stripParens(_g.name):'Goal')+' deleted',['goals'],()=>{state.goals=state.goals.filter(g=>g.id!==_id);saveState();});closeModal('addGoalModal');renderAll();haptic('tap');}
// RECURRING
function freqDays(freq){return{daily:1,weekly:7,monthly:30,quarterly:91,yearly:365}[freq]||30;}
// Imported rules may have no frequency.
const FREQ_LABELS={daily:'Daily',weekly:'Weekly',monthly:'Monthly',quarterly:'Quarterly',yearly:'Yearly'};
function freqLabel(f){return FREQ_LABELS[f]||'Monthly';}
// Months and years advance on the calendar, clamped to month end.
function nextDueAfter(dateStr,freq){
  const src=String(dateStr||'').slice(0,10);
  const d=new Date(src+'T12:00:00');
  if(isNaN(d))return addDays(todayStr(),freqDays(freq));
  if(freq==='daily')d.setDate(d.getDate()+1);
  else if(freq==='weekly')d.setDate(d.getDate()+7);
  else{
    const months={monthly:1,quarterly:3,yearly:12}[freq]||1;
    const day=d.getDate();
    d.setDate(1);
    d.setMonth(d.getMonth()+months);
    const last=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();
    d.setDate(Math.min(day,last));
  }
  const p=n=>String(n).padStart(2,'0');
  return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate());
}
// invest = money in, bill = money out. Legacy rules are investments.
function recurKind(r){return (r&&r.kind==='bill')?'bill':'invest';}
let recurKindValue='invest',recurSpendCat='bills',recurAccountChoice=null;
function setRecurKind(k){
  recurKindValue=(k==='bill')?'bill':'invest';
  const bill=recurKindValue==='bill';
  const on=(id,yes)=>{const n=el(id);if(!n)return;n.classList.toggle('on',yes);n.setAttribute('aria-selected',yes?'true':'false');};
  on('recurKindInvest',!bill);on('recurKindBill',bill);
  const show=(id,yes)=>{const n=el(id);if(n)n.style.display=yes?'':'none';};
  show('recurCatRow',!bill);
  show('recurCryptoRow',!bill&&recurCatValue==='crypto');
  show('recurSpendCatRow',bill);
  show('recurAccountRow',bill);
  show('recurHintInvest',!bill);
  show('recurHintBill',bill);
  const nm=el('recurName');
  if(nm)nm.placeholder=bill?'Rent, Internet, Netflix…':'Monthly SIP, Weekly BTC DCA…';
  const t=el('addRecurTitle');
  if(t&&!editingRecurId)t.textContent=bill?'Recurring Bill':'Recurring Investment';
  if(bill){buildRecurSpendCatSelect();buildRecurAccountSelect();}
  haptic('tap');
}
function buildRecurSpendCatSelect(){
  if(!SPEND_CATS.some(c=>c.id===recurSpendCat))recurSpendCat=SPEND_CATS[0].id;
  buildCustomSelect('recurSpendCatWrap',SPEND_CATS.map(c=>({value:c.id,label:c.label})),
    recurSpendCat,v=>{recurSpendCat=v;});
}
function buildRecurAccountSelect(){
  const opts=[{value:CASH_NONE,label:'Not from an account'}].concat(
    (state.assets||[]).filter(a=>a&&a.category==='liquidity').map(a=>({value:a.id,label:a.name})));
  if(!opts.some(o=>o.value===recurAccountChoice))recurAccountChoice=CASH_NONE;
  buildCustomSelect('recurAccountWrap',opts,recurAccountChoice,v=>{recurAccountChoice=v;});
}
function recurCatWrapChange(v){recurCatValue=v;const isC=v==='crypto';el('recurCryptoRow').style.display=isC?'block':'none';if(!isC){recurCoinId=null;recurCoinName=null;recurCoinImage=null;el('recurCryptoSearch').value='';el('recurCryptoHint').style.display='none';}}
function openAddRecur(kind){editingRecurId=null;recurCoinId=null;recurCoinName=null;recurCoinImage=null;recurActiveVal=true;
  el('addRecurTitle').textContent='Recurring Investment';el('saveRecurBtn').textContent='Add Recurring';el('deleteRecurBtn').style.display='none';el('recurActiveRow').style.display='none';
  resetMoneyCcy(['recurAmount']);bindMoneyCcy('recurAmount','recurAmountCcyWrap');
  el('recurName').value='';el('recurAmount').value='';el('recurStart').value=todayStr();el('recurCryptoSearch').value='';el('recurCryptoHint').style.display='none';
  recurFreqValue='monthly';recurCatValue='crypto';updateCurrLabels();
  buildCustomSelect('recurFreqWrap',[{value:'daily',label:'Daily'},{value:'weekly',label:'Weekly'},{value:'monthly',label:'Monthly'},{value:'quarterly',label:'Quarterly'},{value:'yearly',label:'Yearly'}],'monthly',v=>{recurFreqValue=v;});
  buildCustomSelect('recurCatWrap',ASSET_TYPES.map(t=>({value:t.id,label:t.label})),'crypto',recurCatWrapChange);
  el('recurCryptoRow').style.display='block';
  recurSpendCat='bills';recurAccountChoice=defaultSpendAccount();  // CASH_NONE when there is no account
  setRecurKind(kind==='bill'?'bill':'invest');
  openModal('addRecurModal');}
function openEditRecur(id){const r=state.recurs.find(x=>x.id===id);if(!r)return;editingRecurId=id;recurCoinId=r.coinId||null;recurCoinName=r.coinName||null;recurCoinImage=r.coinImage||null;recurActiveVal=r.active!==false;
  el('addRecurTitle').textContent='Edit Recurring';el('saveRecurBtn').textContent='Save Changes';el('deleteRecurBtn').style.display='block';el('recurActiveRow').style.display='block';
  el('recurActiveToggle').className='toggle'+(recurActiveVal?' on':'');el('recurActiveToggle').setAttribute('aria-checked',recurActiveVal?'true':'false');
  resetMoneyCcy(['recurAmount']);bindMoneyCcy('recurAmount','recurAmountCcyWrap');
  el('recurName').value=r.name;setMoneyField('recurAmount',r.amount);el('recurStart').value=r.start;
  recurFreqValue=r.freq;recurCatValue=r.category;updateCurrLabels();
  buildCustomSelect('recurFreqWrap',[{value:'daily',label:'Daily'},{value:'weekly',label:'Weekly'},{value:'monthly',label:'Monthly'},{value:'quarterly',label:'Quarterly'},{value:'yearly',label:'Yearly'}],r.freq,v=>{recurFreqValue=v;});
  buildCustomSelect('recurCatWrap',ASSET_TYPES.map(t=>({value:t.id,label:t.label})),r.category,recurCatWrapChange);
  const isC=r.category==='crypto';el('recurCryptoRow').style.display=isC?'block':'none';
  if(isC&&r.coinName){el('recurCryptoSearch').value=r.coinName;el('recurCryptoHint').style.display='block';el('recurCryptoHint').textContent='Will buy '+esc(r.coinName)+' at live price each cycle';}else{el('recurCryptoSearch').value='';el('recurCryptoHint').style.display='none';}
  recurSpendCat=r.spendCat||'bills';
  recurAccountChoice=r.account||CASH_NONE;
  setRecurKind(recurKind(r));
  el('addRecurTitle').textContent=recurKind(r)==='bill'?'Edit Recurring Bill':'Edit Recurring';
  openModal('addRecurModal');}
let recurSearchTimeout=null;
function onRecurCryptoSearch(){clearTimeout(recurSearchTimeout);const q=el('recurCryptoSearch').value.trim();if(!q){el('recurCryptoSuggestions').style.display='none';return;}recurSearchTimeout=setTimeout(async()=>{const res=await searchCryptoWithImages(q);if(!res.length){el('recurCryptoSuggestions').style.display='none';return;}const box=el('recurCryptoSuggestions');box.innerHTML=res.map(c=>`<div class="coin-sug-item" role="button" tabindex="0">${c.image?`<img class="coin-sug-img" src="${esc(proxyImg(c.image))}" onerror="this.style.display='none'" loading="lazy"/>`:`<div class="coin-sug-img"></div>`}<div><div class="coin-sug-name">${esc(c.name)}</div><div class="coin-sug-sym">${esc((c.symbol||'').toUpperCase())}</div></div></div>`).join('');box.querySelectorAll('.coin-sug-item').forEach((node,i)=>node.addEventListener('click',()=>{const c=res[i];selectRecurCoin(c.id,c.name||'',proxyImg(c.image||''));}));box.style.display='block';},350);}
function selectRecurCoin(id,name,img){recurCoinId=id;recurCoinName=name;recurCoinImage=img;el('recurCryptoSearch').value=name;el('recurCryptoSuggestions').style.display='none';el('recurCryptoHint').style.display='block';el('recurCryptoHint').textContent='Will buy '+esc(name)+' at live price each cycle';}
function toggleRecurActive(){recurActiveVal=!recurActiveVal;const t=el('recurActiveToggle');t.className='toggle'+(recurActiveVal?' on':'');t.setAttribute('aria-checked',recurActiveVal?'true':'false');haptic('tap');}
async function deleteRecur(){if(!editingRecurId)return;const _bill=recurKind(state.recurs.find(r=>r.id===editingRecurId))==='bill';if(!await askConfirm({title:_bill?'Delete recurring bill?':'Delete recurring investment?',message:_bill?'It will stop running. Expenses it already recorded are kept.':'It will stop running. Investments it already made are kept.',confirmText:'Delete'}))return;const _r=state.recurs.find(r=>r.id===editingRecurId);const _id=editingRecurId;withUndo((_r?stripParens(_r.name):'Recurring investment')+' deleted',['recurs'],()=>{state.recurs=state.recurs.filter(r=>r.id!==_id);saveState();});closeModal('addRecurModal');renderPlan();haptic('tap');}
function saveRecur(){const name=el('recurName').value.trim(),amt=parseFloat(el('recurAmount').value)||0;if(!name||!amt){toast('Enter name and amount','error');return;}const amtN=moneyBase('recurAmount');
  const start=el('recurStart').value||todayStr();
  const bill=recurKindValue==='bill';
  const isC=!bill&&recurCatValue==='crypto';
  if(editingRecurId){const r=state.recurs.find(x=>x.id===editingRecurId);if(!r)return;
    r.name=name;r.amount=amtN;r.freq=recurFreqValue;r.category=recurCatValue;r.start=start;r.coinId=isC?recurCoinId:null;r.coinName=isC?recurCoinName:null;r.coinImage=isC?recurCoinImage:null;r.active=recurActiveVal;
    r.kind=bill?'bill':'invest';r.spendCat=bill?recurSpendCat:null;r.account=bill&&recurAccountChoice!==CASH_NONE?recurAccountChoice:null;
    saveState();closeModal('addRecurModal');renderPlan();haptic('success');toast(bill?'Recurring bill updated':'Recurring investment updated','success');return;
  }
  state.recurs.push({id:uid(),name,amount:amtN,freq:recurFreqValue,category:recurCatValue,
    kind:bill?'bill':'invest',spendCat:bill?recurSpendCat:null,
    account:bill&&recurAccountChoice!==CASH_NONE?recurAccountChoice:null,
    coinId:isC?recurCoinId:null,coinName:isC?recurCoinName:null,coinImage:isC?recurCoinImage:null,
    start,nextDue:start,active:true,runCount:0});
  saveState();closeModal('addRecurModal');renderPlan();haptic('success');toast(bill?'Recurring bill added!':'Recurring investment added!','success');}
// RECURRING INVESTMENT EXECUTION
async function runDueRecurs(silent){
  if(!state.recurs||!state.recurs.length)return;
  const today=new Date();today.setHours(0,0,0,0);
  let ran=0,touchedAssets=false;
  for(const r of state.recurs){
    if(r.active===false)continue;
    if(!r.nextDue)r.nextDue=r.start||today.toISOString().split('T')[0];
    let guard=0;
    while(parseDay(r.nextDue)<=today&&guard<24){ // cap catch-up runs so a long-dormant rule doesn't explode
      // A missed cycle is dated on its due day.
      const dueIso=new Date(r.nextDue+'T12:00:00').toISOString();
      if(recurKind(r)==='bill')executeRecurBill(r,dueIso);
      else{await executeRecurOnce(r);touchedAssets=true;}
      r.runCount=(r.runCount||0)+1;
      r.nextDue=nextDueAfter(r.nextDue,r.freq);
      ran++;guard++;
    }
  }
  if(ran>0){saveState();if(touchedAssets)trackPnLHistory();renderAll();if(!silent)toast(plural(ran,'recurring item')+' processed','success');}
}
function addDays(dateStr,days){const d=parseDay(dateStr);d.setDate(d.getDate()+days);return dayKey(d);}
async function executeRecurOnce(r){
  const amountNPR=r.amount||0;if(amountNPR<=0)return;
  if(recurKind(r)==='bill'){executeRecurBill(r);return;}
  if(r.category==='crypto'&&r.coinId){
    let priceUsd=livePrices[r.coinId]?.usd;
    if(priceUsd==null)priceUsd=await fetchCoinPrice(r.coinId);
    if(priceUsd==null){ // No price: log as cash so the contribution isn't lost
      logRecurAsCash(r);return;
    }
    const priceNPR=usdToNpr(priceUsd);const qty=amountNPR/priceNPR;
    let existing=state.assets.find(a=>a.category==='crypto'&&a.coinId===r.coinId);
    if(existing){const oldQty=existing.qty||0,oldCost=oldQty*(existing.buyPrice||0);const newQty=oldQty+qty;existing.buyPrice=(oldCost+amountNPR)/newQty;existing.qty=newQty;
      state.transactions.push({id:uid(),assetId:existing.id,name:existing.name,category:'crypto',icon:existing.icon,coinImage:existing.coinImage,amount:amountNPR,qty,perUnit:priceNPR,txType:'buy',recurId:r.id,date:new Date().toISOString()});
    }else{const asset={id:uid(),category:'crypto',name:r.coinName||r.name,ticker:null,coinId:r.coinId,coinImage:r.coinImage,commodityId:null,unit:null,isNepse:false,propertyType:null,liquidityType:null,icon:'coins',qty,buyPrice:priceNPR,currentPrice:null,value:null,interest:null,maturity:null,date:todayStr(),notes:'Auto-created by recurring investment "'+r.name+'"'};
      state.assets.push(asset);
      state.transactions.push({id:uid(),assetId:asset.id,name:asset.name,category:'crypto',icon:'coins',coinImage:r.coinImage,amount:amountNPR,qty,perUnit:priceNPR,txType:'buy',recurId:r.id,date:new Date().toISOString()});
    }
  }else{
    logRecurAsCash(r);
  }
}
// A bill becomes a normal expense, shaped like saveSpend() output.
function executeRecurBill(r,whenIso){
  const amount=r.amount||0;if(amount<=0)return;
  const acct=r.account?(state.assets||[]).find(a=>a.id===r.account&&a.category==='liquidity'):null;
  const rec={
    id:uid(),kind:'expense',amount,
    category:(r.spendCat&&SPEND_CATS.some(c=>c.id===r.spendCat))?r.spendCat:'bills',
    note:r.name||'Recurring bill',
    date:whenIso||new Date().toISOString(),
    account:acct?acct.id:null,
    linkId:acct?uid():null,
    recurId:r.id,
  };
  state.spends=state.spends||[];
  state.spends.push(rec);
  applySpendCash(rec);
}
function logRecurAsCash(r){
  const amountNPR=r.amount||0;
  let existing=state.assets.find(a=>a.category==='liquidity'&&a.name.toLowerCase()===r.name.toLowerCase());
  let targetAsset;
  if(existing){existing.value=(existing.value||0)+amountNPR;targetAsset=existing;}
  else{targetAsset={id:uid(),category:'liquidity',name:r.name,ticker:null,coinId:null,coinImage:null,commodityId:null,unit:null,isNepse:false,propertyType:null,liquidityType:'Recurring Contribution',icon:'banknote',qty:null,buyPrice:null,currentPrice:null,value:amountNPR,interest:null,maturity:null,date:null,notes:'Auto-created by recurring investment "'+r.name+'"'};state.assets.push(targetAsset);}
  state.transactions.push({id:uid(),assetId:targetAsset.id,name:r.name,category:'liquidity',icon:'banknote',coinImage:null,amount:amountNPR,qty:null,txType:'buy',recurId:r.id,date:new Date().toISOString()});
}
function runRecurNow(id){const r=state.recurs.find(x=>x.id===id);if(!r)return;executeRecurOnce(r).then(()=>{r.runCount=(r.runCount||0)+1;r.nextDue=nextDueAfter(r.nextDue||todayStr(),r.freq);saveState();trackPnLHistory();renderAll();haptic('success');toast('Recorded this cycle for '+r.name,'success');});}
// Local calendar day, not UTC.
function todayStr(){return dayKey(new Date());}
// Date inputs are local days; noon avoids timezone edges.
function dayToISO(v){
  const d=parseDay(v);
  return isNaN(d)?new Date().toISOString():d.toISOString();
}
// 'YYYY-MM-DD' parses as local noon; full timestamps are left alone.
function parseDay(v){
  const s=String(v==null?'':v);
  const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s.trim());
  if(m)return new Date(+m[1],+m[2]-1,+m[3],12,0,0,0);
  const m2=/^(\d{4})-(\d{2})-(\d{2})T/.exec(s);
  if(m2&&/T00:00:00(\.000)?Z$/.test(s))return new Date(+m2[1],+m2[2]-1,+m2[3],12,0,0,0);
  return new Date(s);
}
// REFRESH
let _refreshInFlight=false;
async function refreshAll(){if(_refreshInFlight)return;_refreshInFlight=true;const icon=el('refreshIcon');if(icon)icon.classList.add('spinning');haptic('tap');csCache={};
  try{
    const tasks=[fetchPrices(true),fetchFxRates()];
    if(supabaseUser)tasks.push(pullFromCloud());
    await Promise.all(tasks);
    await runDueRecurs(true);
    trackPnLHistory();renderAll();renderTicker();
    toast('Refreshed','success');
  }finally{setTimeout(()=>{if(icon)icon.classList.remove('spinning');},600);_refreshInFlight=false;}
}
function refreshPrices(){return refreshAll();}
// DATA EXPORT/IMPORT WIZARDS
const EXPORT_CATS = [
  { key: 'assets', label: 'Assets', sub: 'Crypto, stocks, gold, liquidity & property', ico: 'wallet' },
  { key: 'spends', label: 'Spending', sub: 'Household expenses & income', ico: 'banknote' },
  { key: 'debts', label: 'Debts', sub: 'Money owed to you & money you owe', ico: 'coins' },
  { key: 'goals', label: 'Goals', sub: 'Savings targets & progress', ico: 'target' },
  { key: 'recurs', label: 'Recurring', sub: 'Scheduled buys and bills', ico: 'coins' },
  { key: 'transactions', label: 'Transaction History', sub: 'Buy/sell ledger entries', ico: 'clock' },
  { key: 'settings', label: 'Settings & Preferences', sub: 'Currency, theme & app preferences', ico: 'briefcase' },
];
let exportSelected = {};
function exportData(){ openExportWizard(); }
function openExportWizard() {
  exportSelected = {}; EXPORT_CATS.forEach(c => exportSelected[c.key] = true);
  renderExportWizardStep1();
  openModal('exportWizardModal');
}
function exportCount(key) {
  if (key === 'settings') return 1;
  return (state[key] || []).length;
}
function renderExportWizardStep1() {
  const body = el('exportWizardBody');
  body.innerHTML = `
    <div class="wiz-step">
      <div style="font-size:12px;color:var(--text2);line-height:1.5">Choose what to include in your backup file. Everything's selected by default.</div>
      ${EXPORT_CATS.map(c => `
        <label class="wiz-check-row">
          <input type="checkbox" ${exportSelected[c.key]?'checked':''} onchange="exportSelected['${c.key}']=this.checked;el('exportNextBtn').disabled=!Object.values(exportSelected).some(Boolean)"/>
          <span class="sync-choice-ico">${svgIcon(c.ico,15)}</span>
          <span><span class="wiz-check-name">${c.label}</span><span class="wiz-check-sub" style="display:block">${c.sub}</span></span>
          <span class="wiz-check-count">${exportCount(c.key)}</span>
        </label>`).join('')}
      <div class="wiz-btn-row">
        <button class="wiz-btn ghost" onclick="closeModal('exportWizardModal')">Cancel</button>
        <button class="wiz-btn primary" id="exportNextBtn" onclick="runExportWizard()">Export Selected</button>
      </div>
    </div>`;
}
async function runExportWizard() {
  const body = el('exportWizardBody');
  const chosen = EXPORT_CATS.filter(c => exportSelected[c.key]);
  if (!chosen.length) { toast('Pick at least one category', 'error'); return; }

  body.innerHTML = `
    <div class="wiz-progress-wrap">
      <div class="wiz-progress-label" id="exportProgLabel">Preparing export…</div>
      <div class="wiz-progress-track"><div class="wiz-progress-fill" id="exportProgFill" style="width:0%"></div></div>
      <div class="wiz-progress-sub" id="exportProgSub">Starting…</div>
      <div class="wiz-progress-items" id="exportProgItems">
        ${chosen.map(c => `<div class="wiz-progress-item" id="exp-item-${c.key}"><span class="wiz-pi-ico">${svgIcon(c.ico,11)}</span><span>${c.label}</span></div>`).join('')}
      </div>
    </div>`;

  const payload = {};
  for (let i = 0; i < chosen.length; i++) {
    const c = chosen[i];
    const itemEl = el('exp-item-'+c.key);
    if (itemEl) itemEl.classList.add('active');
    if (el('exportProgLabel')) el('exportProgLabel').textContent = 'Exporting '+c.label+'…';
    if (el('exportProgSub')) el('exportProgSub').textContent = exportCount(c.key)+' item'+(exportCount(c.key)!==1?'s':'');
    if (el('exportProgFill')) el('exportProgFill').style.width = Math.round(((i)/chosen.length)*100)+'%';
    await new Promise(r => setTimeout(r, 160)); // brief visual pacing so progress is perceptible
    payload[c.key] = c.key === 'settings' ? state.settings : (state[c.key] || []);
    if (itemEl) { itemEl.classList.remove('active'); itemEl.classList.add('done'); itemEl.querySelector('.wiz-pi-ico').innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>'; }
    if (el('exportProgFill')) el('exportProgFill').style.width = Math.round(((i+1)/chosen.length)*100)+'%';
  }
  payload.exportedAt = new Date().toISOString();
  payload.appVersion = 'Paisafolio v4';

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const filename = 'paisafolio-backup-'+todayStr()+'.json';
  const url = URL.createObjectURL(blob);

  const totalItems = chosen.reduce((s,c) => s + exportCount(c.key), 0);
  body.innerHTML = `
    <div class="wiz-step" style="text-align:center">
      <div class="wiz-success-ico"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>
      <div style="font-size:15px;font-weight:800;color:var(--text)">Export Ready</div>
      <div class="wiz-preview-card" style="text-align:left">
        <div style="font-size:11.5px;color:var(--text2)">${esc(filename)}</div>
        <div class="wiz-preview-grid">
          <div class="wiz-preview-cell"><div class="wiz-preview-cell-lbl">Categories</div><div class="wiz-preview-cell-val">${chosen.length}</div></div>
          <div class="wiz-preview-cell"><div class="wiz-preview-cell-lbl">Total Items</div><div class="wiz-preview-cell-val">${totalItems}</div></div>
        </div>
      </div>
      <div class="wiz-btn-row">
        <button class="wiz-btn ghost" onclick="closeModal('exportWizardModal')">Done</button>
        <a class="wiz-btn primary" href="${url}" download="${filename}" style="display:flex;align-items:center;justify-content:center;text-decoration:none" onclick="haptic('success');toast('Data exported!','success')">Download File</a>
      </div>
    </div>`;
}
function csvEscape(v){if(v==null)return'';const s=String(v);return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;}
function exportTransactionsCSV(){
  const rate=getCurrRate(currentCurrency.code),cur=currentCurrency.code;
  const rows=[['Date','Asset','Category','Type','Quantity','Unit','Price Per Unit','Amount ('+cur+')','Realized P&L ('+cur+')']];
  (state.transactions||[]).slice().sort((a,b)=>new Date(a.date)-new Date(b.date)).forEach(t=>{
    rows.push([
      t.date?dayKey(parseDay(t.date)):'',
      txDisplayName(t),catLabel(t.category||''),txTypeLabel(t),
      t.enteredQty!=null?t.enteredQty:(t.qty!=null?t.qty:''),
      t.enteredUnit||'',
      t.perUnit!=null?(t.perUnit*rate).toFixed(4):'',
      t.amount!=null?(t.amount*rate).toFixed(2):'',
      t.realized!=null?(t.realized*rate).toFixed(2):''
    ]);
  });
  if(rows.length===1){toast('No transactions to export yet','error');return;}
  const csv=rows.map(r=>r.map(csvEscape).join(',')).join('\r\n');
  const blob=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='paisafolio-transactions-'+todayStr()+'.csv';a.click();
  haptic('success');toast('Transactions exported as CSV','success');
}
let assetExportId=null;
function openAssetExportPicker(assetId){
  assetExportId=assetId;
  const sheet=el('assetExportSheet');if(sheet)sheet.classList.remove('wide-export');
  const body=el('assetExportBody');
  const fmts=[
    {key:'csv',label:'CSV',sub:'Spreadsheet-friendly table',icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'},
    {key:'md',label:'Markdown',sub:'Formatted text table (.md)',icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M8 16V8l4 4 4-4v8"/></svg>'},
    {key:'image',label:'Image',sub:'Preview & themed PNG snapshot',icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>'}
  ];
  body.innerHTML=`<div style="display:flex;flex-direction:column;gap:8px">${fmts.map(f=>`<button class="export-fmt-opt" onclick="runAssetExport('${f.key}')"><span class="export-fmt-icon">${f.icon}</span><span style="text-align:left;flex:1"><span class="export-fmt-name">${f.label}</span><span class="export-fmt-sub">${f.sub}</span></span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><polyline points="9 18 15 12 9 6"/></svg></button>`).join('')}</div>`;
  openModal('assetExportModal');
}
function assetExportData(assetId){
  const a=state.assets.find(x=>x.id===assetId);if(!a)return null;
  const rate=getCurrRate(currentCurrency.code),cur=currentCurrency.code;
  const txs=(state.transactions||[]).filter(t=>t.assetId===assetId).slice().sort((x,y)=>new Date(x.date)-new Date(y.date));
  const rows=txs.map(t=>{
    const q=t.qty||0;
    const isSell=t.txType==='sell';
    const costBasisPerUnit=(isSell&&t.realized!=null&&q)?(((t.amount||0)-t.realized)/q)*rate:null;
    return{
    date:t.date?dayKey(parseDay(t.date)):'',
    type:txTypeLabel(t),
    qty:t.enteredQty!=null?fmtQty(t.enteredQty,a):(t.qty!=null?fmtQty(t.qty,a):''),
    unit:t.enteredUnit||a.unit||'',
    perUnit:t.perUnit!=null?(t.perUnit*rate).toFixed(4):(q?((t.amount||0)/q*rate).toFixed(4):''),
    costBasisPerUnit:costBasisPerUnit!=null?costBasisPerUnit.toFixed(4):null,
    amount:t.amount!=null?(t.amount*rate).toFixed(2):'',
    realized:t.realized!=null?(t.realized*rate).toFixed(2):'',
    notes:t.notes||''
  };});
  // Summary figures (mirrors buildTxTable calc)
  let buyAmt=0,sellAmt=0,realizedPnl=0,totalBoughtQty=0,sellQtyTotal=0,incomeAmt=0;
  txs.forEach(t=>{if(t.txType==='income'){incomeAmt+=t.amount||0;return;}const q=t.qty||0;if(t.txType==='sell'){sellAmt+=t.amount||0;sellQtyTotal+=q;if(t.realized!=null)realizedPnl+=t.realized;}else{buyAmt+=t.amount||0;totalBoughtQty+=q;}});
  const netQty=+((a.qty||0).toFixed(6));
  const curPriceEach=getAssetCurrentPrice(a);
  const heldValueBase=curPriceEach!==null?curPriceEach*netQty:null;
  const costTotalBase=a.buyPrice?(a.buyPrice||0)*assetUnits(a):null;
  const pnl=getAssetPnL(a),pp=getAssetPnLPct(a);
  const realizedCostBasis=sellAmt-realizedPnl;
  const realizedPp=realizedCostBasis>0?(realizedPnl/realizedCostBasis*100):null;
  const summary={
    // Accounts have no units, rates or unrealised P&L.
    noQty:assetNoQty(a),
    // Only accounts use direction wording and colours.
    isCash:assetIsCash(a),
    paidIn:buyAmt,
    takenOut:sellAmt,
    balanceNow:getAssetCurrentValue(a),
    interest:incomeAmt,
    totalHeld:fmtQty(totalBoughtQty,a)+' '+(a.unit||'units'),
    holdingNow:fmtQty(netQty,a)+' '+(a.unit||'units'),
    valueThenRaw:buyAmt,
    valueNow:heldValueBase,
    realizedPnl:realizedPnl,
    realizedPp:realizedPp,
    cost:costTotalBase,
    pnl,pp,
    currentPrice:curPriceEach,
    avgBuyPrice:(a.buyPrice||0)*rate,
    avgBuyTotal:(a.buyPrice||0)*sellQtyTotal*rate,
    avgSellPrice:sellQtyTotal>0?(sellAmt/sellQtyTotal)*rate:null,
    avgSellTotal:sellQtyTotal>0?sellAmt*rate:null
  };
  return{a,rows,cur,rate,summary};
}
function runAssetExport(fmt){
  const assetId=assetExportId;if(!assetId)return;
  const data=assetExportData(assetId);
  if(!data||!data.rows.length){toast('No transactions to export yet','error');closeModal('assetExportModal');return;}
  const{a}=data;
  const dateStr=todayStr();
  const safeName=(a.name||'asset').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  if(fmt==='csv')exportAssetCSV(data,safeName,dateStr);
  else if(fmt==='md')openAssetMdPreview(data,safeName,dateStr);
  else if(fmt==='image')openAssetImagePreview(data,safeName,dateStr);
}
function exportAssetCSV(data,safeName,dateStr){
  const{a,rows,cur,summary}=data;
  const lines=[];
  lines.push(['Asset',a.name]);
  lines.push(['Category',catLabel(a.category||'')]);
  if(a.unit)lines.push(['Unit',a.unit]);
  if(summary.isCash){
    lines.push(['Paid In ('+cur+')',(summary.paidIn*data.rate).toFixed(2)]);
    lines.push(['Taken Out ('+cur+')',(summary.takenOut*data.rate).toFixed(2)]);
    lines.push(['Balance Now ('+cur+')',(summary.balanceNow*data.rate).toFixed(2)]);
    if(summary.interest)lines.push(['Interest Earned ('+cur+')',(summary.interest*data.rate).toFixed(2)]);
  }else if(summary.noQty){
    lines.push(['Paid In ('+cur+')',(summary.paidIn*data.rate).toFixed(2)]);
    if(summary.takenOut)lines.push(['Sold For ('+cur+')',(summary.takenOut*data.rate).toFixed(2)]);
    lines.push(['Value Now ('+cur+')',(summary.balanceNow*data.rate).toFixed(2)]);
    if(summary.interest)lines.push(['Income ('+cur+')',(summary.interest*data.rate).toFixed(2)]);
    if(summary.pnl!=null)lines.push(['P&L ('+cur+')',(summary.pnl*data.rate).toFixed(2)]);
    if(summary.pp!=null)lines.push(['Return %',summary.pp.toFixed(2)]);
    lines.push(['Realized P&L ('+cur+')',(summary.realizedPnl*data.rate).toFixed(2)]);
  }else{
    if(summary.currentPrice!=null)lines.push(['Current Price ('+cur+')',(summary.currentPrice*data.rate).toFixed(4)]);
    if(summary.cost!=null)lines.push(['Cost ('+cur+')',(summary.cost*data.rate).toFixed(2)]);
    if(summary.pnl!=null)lines.push(['P&L ('+cur+')',(summary.pnl*data.rate).toFixed(2)]);
    if(summary.pp!=null)lines.push(['Return %',summary.pp.toFixed(2)]);
    lines.push(['Total Held',summary.totalHeld]);
    lines.push(['Holding Now',summary.holdingNow]);
    lines.push(['Value Then ('+cur+')',(summary.valueThenRaw*data.rate).toFixed(2)]);
    lines.push(['Value Now ('+cur+')',summary.valueNow!=null?(summary.valueNow*data.rate).toFixed(2):'']);
    lines.push(['Realized P&L ('+cur+')',(summary.realizedPnl*data.rate).toFixed(2)]);
  }
  lines.push(['Exported',new Date().toISOString()]);
  lines.push([]);
  const isCommodity=!!a.commodityId;
  const outSign=r=>(r.type==='WITHDRAW'||r.type==='MONEY OUT')?'-':'+';
  const header=summary.noQty
    ?['Date','Type','Amount ('+cur+')','Notes']
    :isCommodity
    ?['Date','Type','Quantity','Unit','Amount/Qty ('+cur+')','Total Amount ('+cur+')','Realized P&L ('+cur+')','Notes']
    :['Date','Type','Quantity','Amount/Qty ('+cur+')','Total Amount ('+cur+')','Realized P&L ('+cur+')','Notes'];
  const body=[header,...rows.map(r=>summary.noQty?[r.date,r.type,outSign(r)+r.amount,r.notes]
    :isCommodity?[r.date,r.type,r.qty,r.unit,r.perUnit,r.amount,r.realized,r.notes]
    :[r.date,r.type,r.qty,r.perUnit,r.amount,r.realized,r.notes])];
  const csv=[...lines,...body].map(r=>r.map(csvEscape).join(',')).join('\r\n');
  const blob=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'});
  const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='paisafolio-'+safeName+'-'+dateStr+'.csv';link.click();
  haptic('success');toast('Exported as CSV','success');closeModal('assetExportModal');
}
function buildAssetMarkdown(data){
  const{a,rows,cur,summary}=data;
  const esc2=v=>String(v==null?'':v).replace(/\|/g,'\\|');
  let md=`# ${a.name}, Transaction History\n\n`;
  md+=`**Category:** ${catLabel(a.category||'')}${a.unit?'  \n**Unit:** '+a.unit:''}\n\n`;
  md+='## Summary\n\n';
  md+='| Metric | Value |\n|---|---|\n';
  // Only rows the asset has an answer for.
  if(summary.isCash){
    md+=`| Paid In | ${fmt(summary.paidIn*data.rate)} |\n`;
    md+=`| Taken Out | ${fmt(summary.takenOut*data.rate)} |\n`;
    md+=`| Balance Now | ${fmt(summary.balanceNow*data.rate)} |\n`;
    if(summary.interest)md+=`| Interest Earned | ${fmt(summary.interest*data.rate)} |\n`;
    md+='\n';
  }else if(summary.noQty){
    md+=`| Paid In | ${fmt(summary.paidIn*data.rate)} |\n`;
    if(summary.takenOut)md+=`| Sold For | ${fmt(summary.takenOut*data.rate)} |\n`;
    md+=`| Value Now | ${fmt(summary.balanceNow*data.rate)} |\n`;
    if(summary.interest)md+=`| Income | ${fmt(summary.interest*data.rate)} |\n`;
    if(summary.pnl!=null)md+=`| P&L | ${(summary.pnl>=0?'+':'')+fmt(summary.pnl*data.rate)} |\n`;
    if(summary.pp!=null)md+=`| Return | ${(summary.pp>=0?'+':'')+summary.pp.toFixed(2)}% |\n`;
    md+=`| Realized P&L | ${fmt(summary.realizedPnl*data.rate)} |\n\n`;
  }else{
  if(summary.currentPrice!=null)md+=`| Current Price | ${fmt(summary.currentPrice*data.rate)} |\n`;
  if(summary.cost!=null)md+=`| Cost | ${fmt(summary.cost*data.rate)} |\n`;
  if(summary.pnl!=null)md+=`| P&L | ${(summary.pnl>=0?'+':'')+fmt(summary.pnl*data.rate)} |\n`;
  if(summary.pp!=null)md+=`| Return | ${(summary.pp>=0?'+':'')+summary.pp.toFixed(2)}% |\n`;
  md+=`| Total Held | ${summary.totalHeld} |\n`;
  md+=`| Holding Now | ${summary.holdingNow} |\n`;
  md+=`| Value Then | ${fmt(summary.valueThenRaw*data.rate)} |\n`;
  md+=`| Value Now | ${summary.valueNow!=null?fmt(summary.valueNow*data.rate):'-'} |\n`;
  md+=`| Realized P&L | ${fmt(summary.realizedPnl*data.rate)} |\n\n`;
  }
  md+='## Transactions\n\n';
  const isCommodity=!!a.commodityId;
  const header=summary.noQty
    ?['Date','Type','Amount ('+cur+')','Notes']
    :isCommodity
    ?['Date','Type','Quantity','Unit','Amount/Qty ('+cur+')','Total Amount ('+cur+')','Realized P&L ('+cur+')','Notes']
    :['Date','Type','Quantity','Amount/Qty ('+cur+')','Total Amount ('+cur+')','Realized P&L ('+cur+')','Notes'];
  md+='| '+header.join(' | ')+' |\n';
  md+='|'+header.map(()=>' --- ').join('|')+'|\n';
  const outSign=r=>(r.type==='WITHDRAW'||r.type==='MONEY OUT')?'-':'+';
  rows.forEach(r=>{const cells=summary.noQty?[r.date,r.type,outSign(r)+r.amount,r.notes]
    :isCommodity?[r.date,r.type,r.qty,r.unit,r.perUnit,r.amount,r.realized,r.notes]
    :[r.date,r.type,r.qty,r.perUnit,r.amount,r.realized,r.notes];md+='| '+cells.map(esc2).join(' | ')+' |\n';});
  md+=`\n_Exported from Paisafolio on ${new Date().toLocaleDateString()}_\n`;
  return md;
}
let pendingMdExport=null;
function openAssetMdPreview(data,safeName,dateStr){
  const md=buildAssetMarkdown(data);
  pendingMdExport={md,safeName,dateStr};
  const body=el('assetExportBody');
  body.innerHTML=`<div style="display:flex;flex-direction:column;gap:10px">
    <div style="background:var(--bg3);border:1px solid var(--border2);border-radius:10px;padding:10px;max-height:260px;overflow:auto"><pre style="white-space:pre-wrap;word-break:break-word;font-size:10.5px;line-height:1.5;color:var(--text2);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;margin:0">${esc(md)}</pre></div>
    <div style="display:flex;gap:8px">
      <button class="wiz-btn ghost" style="flex:1" onclick="copyMdExport()">Copy to Clipboard</button>
      <button class="wiz-btn primary" style="flex:1" onclick="downloadMdExport()">Download .md</button>
    </div>
    <button class="wiz-btn ghost" onclick="openAssetExportPicker('${data.a.id}')">‹ Back</button>
  </div>`;
}
function copyMdExport(){
  if(!pendingMdExport)return;
  navigator.clipboard.writeText(pendingMdExport.md).then(()=>{haptic('success');toast('Copied to clipboard','success');}).catch(()=>{toast('Copy failed','error');});
}
function downloadMdExport(){
  if(!pendingMdExport)return;
  const{md,safeName,dateStr}=pendingMdExport;
  const blob=new Blob([md],{type:'text/markdown;charset=utf-8;'});
  const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='paisafolio-'+safeName+'-'+dateStr+'.md';link.click();
  haptic('success');toast('Exported as Markdown','success');closeModal('assetExportModal');
}
const IMG_EXPORT_THEMES={
  dark:{bg:'#0f0f0f',bg2:'#1a1a1a',card:'#1a1a1a',panel:'#1a1a1a',border:'#262624',border2:'#262624',text:'#e8e8e6',text2:'#8a8a86',text3:'#8a8a86',muted:'#5a5a56',accent:'#e0a83a',accentDark:'#e0a83a',accentSoft:'#2a2210',green:'#4ec98a',greenSoft:'#12301f',greenTxt:'#4ec98a',red:'#e0736c',redSoft:'#3a1414',redTxt:'#e0736c'},
  light:{bg:'#f7f7f5',bg2:'#ffffff',card:'#ffffff',panel:'#ffffff',border:'#e6e6e3',border2:'#e6e6e3',text:'#1c1c1a',text2:'#6a6a66',text3:'#6a6a66',muted:'#9a9a96',accent:'#a3690e',accentDark:'#a3690e',accentSoft:'#fbeed9',green:'#1f8a5a',greenSoft:'#e0f5ea',greenTxt:'#1f8a5a',red:'#b6392f',redSoft:'#fbe3e1',redTxt:'#b6392f'}
};
const CARD_FONT="'Poppins',-apple-system,'Segoe UI',Roboto,sans-serif";
let imgExportState=null;
function openAssetImagePreview(data,safeName,dateStr){
  imgExportState={data,safeName,dateStr,theme:'dark'};
  const sheet=el('assetExportSheet');if(sheet)sheet.classList.add('wide-export');
  renderAssetImagePreview();
}
function renderAssetImagePreview(){
  const body=el('assetExportBody');
  const st=imgExportState;
  body.innerHTML=`<div style="display:flex;flex-direction:column;gap:10px">
    <div style="display:flex;gap:6px">
      <button class="wiz-btn ${st.theme==='dark'?'primary':'ghost'}" style="flex:1;padding:8px" onclick="setImgExportTheme('dark')">Dark</button>
      <button class="wiz-btn ${st.theme==='light'?'primary':'ghost'}" style="flex:1;padding:8px" onclick="setImgExportTheme('light')">Light</button>
    </div>
    <div id="assetImgWrap" style="width:100%;display:block;overflow:auto;border-radius:12px;border:1px solid var(--border2)"><canvas id="assetImgCanvas" style="display:block;width:100%;height:auto"></canvas></div>
    <div style="display:flex;gap:8px">
      <button class="wiz-btn primary" style="flex:1" onclick="downloadImgExport()">Download PNG</button>
    </div>
    <button class="wiz-btn ghost" onclick="openAssetExportPicker('${st.data.a.id}')">‹ Back</button>
  </div>`;
  drawAssetImageCanvas();
}
function setImgExportTheme(theme){
  imgExportState.theme=theme;
  renderAssetImagePreview();
}
function fmtPlain(n){ // Plain number for canvas cells
  if(n==null||isNaN(n))return '-';
  return fmt(n);
}
function drawRoundRect(ctx,x,y,w,h,r){
  ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();
}
function drawAssetImageCanvas(){
  const st=imgExportState;const{a,rows,cur,summary}=st.data;const t=IMG_EXPORT_THEMES[st.theme];
  const F=CARD_FONT;
  const doDraw=()=>{
    // Card width fits the columns it carries.
    const isCommodity=!!a.commodityId;
    const W=summary.noQty?408:(isCommodity?540:508), pad=16;
    const headerH=36;
    const gap=11;
    const sectionTitleH=19;
    const coinIconColor=a.category==='crypto'?'#f7931a':t.accent;

    // Summary: flat 2-col x 3-row grid, matching reference stat grid exactly
    const sumRows=summary.isCash?2:3, sRowH=37;
    const hasAvgSell=!summary.noQty&&summary.avgSellPrice!=null;
    // Sub-line space only when there is a sub-line.
    const subLines=summary.noQty?0:(hasAvgSell?2:1);
    const extraH=subLines?(subLines*14+8):0;
    const sumCardH=sumRows*sRowH+10+extraH;
    const tableHeadH=24;
    const hasNotes=rows.some(r=>r.notes);
    const rowH=29,noteH=15;
    let bodyH=0;rows.forEach(r=>{bodyH+=rowH+(hasNotes&&r.notes?noteH:0);});
    const tableCardH=tableHeadH+bodyH;
    const footerH=22;
    const H=pad+headerH+gap+sumCardH+gap+sectionTitleH+tableCardH+footerH+pad;

    const canvas=el('assetImgCanvas');if(!canvas)return;
    const wrap=el('assetImgWrap');
    const scale=3;canvas.width=W*scale;canvas.height=H*scale;
    const displayW=(wrap&&wrap.clientWidth)?Math.min(wrap.clientWidth,W):W;
    canvas.style.width=displayW+'px';
    canvas.style.height=(displayW*H/W)+'px';
    const ctx=canvas.getContext('2d');ctx.setTransform(scale,0,0,scale,0,0);
    ctx.textBaseline='alphabetic';
    ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';

    // page background, flat, no glow (matches reference exactly)
    ctx.fillStyle=t.bg;ctx.fillRect(0,0,W,H);

    // flat card: no shadow, thin 1px border, like the reference (.stats / table containers)
    function card(x,y,w,h,r){
      drawRoundRect(ctx,x+0.5,y+0.5,w-1,h-1,r);
      ctx.fillStyle=t.bg2;ctx.fill();
      ctx.strokeStyle=t.border;ctx.lineWidth=1;ctx.stroke();
    }

    let y=pad;
    // Header: icon + name/category left, Paisafolio badge + date right (reference layout)
    const iconSize=34;
    drawRoundRect(ctx,pad,y,iconSize,iconSize,9);
    ctx.fillStyle=coinIconColor;ctx.fill();
    ctx.fillStyle='#fff';ctx.font='700 16px '+F;ctx.textAlign='center';
    ctx.fillText((a.name||'?').charAt(0).toUpperCase(),pad+iconSize/2,y+iconSize/2+6);
    ctx.textAlign='left';
    ctx.fillStyle=t.text;ctx.font='600 14px '+F;
    ctx.fillText(a.name||'Asset',pad+iconSize+8,y+15);
    ctx.fillStyle=t.text3;ctx.font='400 11px '+F;
    ctx.fillText(catLabel(a.category||'')+(a.unit?' · '+a.unit:''),pad+iconSize+8,y+29);

    const brandLabel='Paisafolio';
    ctx.font='500 10px '+F;
    const brandW=ctx.measureText(brandLabel).width;
    drawRoundRect(ctx,W-pad-brandW-16,y,brandW+16,17,5);ctx.fillStyle=t.accentSoft;ctx.fill();
    ctx.textAlign='center';ctx.fillStyle=t.accent;
    ctx.fillText(brandLabel,W-pad-brandW/2-8,y+12);
    ctx.textAlign='right';ctx.fillStyle=t.text3;ctx.font='400 10px '+F;
    ctx.fillText(new Date().toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}),W-pad,y+30);
    ctx.textAlign='left';
    y+=headerH+gap;

    // Summary Card: 2 cols x 3 rows, thin dividers, flat bg (reference .stats)
    card(pad,y,W-pad*2,sumCardH,8);
    const pnlPos=summary.pnl!=null&&summary.pnl>=0;
    const sumItems=summary.isCash?[
      ['PAID IN','+'+fmtPlain(summary.paidIn),t.green],
      ['TAKEN OUT',summary.takenOut?'-'+fmtPlain(summary.takenOut):fmtPlain(0),summary.takenOut?t.red:t.text],
      ['BALANCE NOW',fmtPlain(summary.balanceNow),t.text],
      ['INTEREST EARNED',summary.interest?fmtPlain(summary.interest):fmtPlain(0),summary.interest?t.accent:t.text]
    ]:summary.noQty?[
      // Same six slots as a holding.
      ['PAID IN',fmtPlain(summary.paidIn),t.text],
      ['VALUE NOW',fmtPlain(summary.balanceNow),t.text],
      ['SOLD FOR',summary.takenOut?fmtPlain(summary.takenOut):'-',t.text],
      ['INCOME',summary.interest?fmtPlain(summary.interest):fmtPlain(0),summary.interest?t.accent:t.text],
      ['P&L',summary.pnl!=null?(pnlPos?'+':'')+fmtPlain(summary.pnl):'-',summary.pnl!=null?(pnlPos?t.green:t.red):t.text],
      ['REALIZED P&L',fmtPlain(summary.realizedPnl),summary.realizedPnl>0?t.green:summary.realizedPnl<0?t.red:t.text]
    ]:[
      ['TOTAL PURCHASED',summary.totalHeld,t.text],
      ['AMOUNT',summary.valueThenRaw!=null?fmtPlain(summary.valueThenRaw):'-',t.text],
      ['HOLDINGS NOW',summary.holdingNow,t.text],
      ['VALUE NOW',summary.valueNow!=null?fmtPlain(summary.valueNow):'-',t.text],
      ['P&L',summary.pnl!=null?(pnlPos?'+':'')+fmtPlain(summary.pnl):'-',summary.pnl!=null?(pnlPos?t.green:t.red):t.text],
      ['REALIZED P&L',fmtPlain(summary.realizedPnl),summary.realizedPnl>0?t.green:summary.realizedPnl<0?t.red:t.text]
    ];
    const sCols=2,sColW=(W-pad*2)/sCols;
    sumItems.forEach((item,i)=>{
      const col=i%sCols,row=Math.floor(i/sCols);
      const sx=pad+10+col*sColW,syy=y+6+row*sRowH+sRowH/2-3;
      ctx.fillStyle=t.text3;ctx.font='400 9px '+F;
      ctx.fillText(item[0],sx,syy);
      ctx.font='600 11px '+F;
      ctx.fillStyle=item[2];
      ctx.fillText(String(item[1]),sx,syy+15);
      if(!summary.isCash&&i===4&&summary.pp!=null){
        const amtW=ctx.measureText(String(item[1])).width;
        ctx.font='500 9px '+F;
        ctx.globalAlpha=0.75;
        ctx.fillText((summary.pp>=0?'+':'')+summary.pp.toFixed(2)+'%',sx+amtW+6,syy+15);
        ctx.globalAlpha=1;
      }
      if(!summary.isCash&&i===5&&summary.realizedPp!=null){ // Realized P&L percent, next to the amount
        const amtW=ctx.measureText(String(item[1])).width;
        ctx.font='500 9px '+F;
        ctx.globalAlpha=0.75;
        ctx.fillText((summary.realizedPp>=0?'+':'')+summary.realizedPp.toFixed(2)+'%',sx+amtW+6,syy+15);
        ctx.globalAlpha=1;
      }
    });
    ctx.strokeStyle=t.border;ctx.lineWidth=1;
    for(let r=1;r<sumRows;r++){ctx.beginPath();ctx.moveTo(pad,y+r*sRowH+6);ctx.lineTo(W-pad,y+r*sRowH+6);ctx.stroke();}
    if(subLines){
      const subY=y+sumRows*sRowH+5;
      ctx.beginPath();ctx.moveTo(pad,subY);ctx.lineTo(W-pad,subY);ctx.stroke();
      ctx.font='400 8.5px '+F;ctx.fillStyle=t.text3;ctx.textAlign='left';
      ctx.fillText('Avg buy price '+fmtPlain(summary.avgBuyPrice),pad+10,subY+13);
      if(hasAvgSell){
        ctx.fillText('Avg sell price '+fmtPlain(summary.avgSellPrice),pad+10,subY+27);
      }
    }
    y+=sumCardH+gap;

    // Transactions section title
    ctx.fillStyle=t.text3;ctx.font='500 12px '+F;ctx.textAlign='left';
    ctx.fillText('Transactions',pad,y+14);
    y+=sectionTitleH;

    // Transaction Table (no outer card, matches reference: header row + dividers only)
    const tableTop=y;
    const innerL=pad+6,innerR=W-pad-6,innerW=innerR-innerL;
    // Accounts get three columns.
    const colFrac=summary.noQty?[0,0.24,0.62,1]
      :isCommodity?[0,0.18,0.31,0.43,0.57,0.78,1]:[0,0.18,0.31,0.46,0.66,1];
    const colX=colFrac.slice(0,-1).map(f=>innerL+f*innerW);
    const headers=summary.noQty?['DATE','TYPE','AMOUNT']
      :isCommodity?['DATE','TYPE','QTY','RATE','AMOUNT','P&L']
      :['DATE','TYPE','QTY','AMT/QTY','AMOUNT','P&L'];
    ctx.fillStyle=t.text3;ctx.font='400 9px '+F;ctx.textAlign='left';
    headers.forEach((h,i)=>{
      if(i===headers.length-1){ctx.textAlign='right';ctx.fillText(h,innerR,y+18);ctx.textAlign='left';}
      else ctx.fillText(h,colX[i],y+18);
    });
    ctx.strokeStyle=t.border;ctx.beginPath();ctx.moveTo(pad,y+tableHeadH);ctx.lineTo(W-pad,y+tableHeadH);ctx.stroke();
    y+=tableHeadH;
    rows.forEach((r,ri)=>{
      const thisRowH=rowH+(hasNotes&&r.notes?noteH:0);
      // Colour keys off whether money came in or went out.
      const isSell=r.type==='SELL'||r.type==='WITHDRAW'||r.type==='MONEY OUT';
      const pnlV=r.realized?parseFloat(r.realized):null;
      // 3-way pill like the reference: Buy (amber), Sell-loss (red), Sell-gain (green)
      let pillBg,pillFg;
      if(summary.isCash){
        // Accounts colour by direction; property sales use profit colours.
        if(isSell){pillBg=t.redSoft;pillFg=t.redTxt||t.red;}
        else{pillBg=t.greenSoft;pillFg=t.greenTxt||t.green;}
      }
      else if(!isSell){pillBg=t.accentSoft;pillFg=t.accent;}
      else if(pnlV!=null&&pnlV<0){pillBg=t.redSoft;pillFg=t.redTxt||t.red;}
      else{pillBg=t.greenSoft;pillFg=t.greenTxt||t.green;}
      let ci=0;
      ctx.fillStyle=t.text2;ctx.font='500 9px '+F;
      const dObj=r.date?new Date(r.date+'T00:00:00'):null;
      const dateLabel=dObj&&!isNaN(dObj)?dObj.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}):r.date;
      ctx.fillText(dateLabel,colX[ci++],y+rowH/2+4);
      const pillLabel=titleWord(r.type||'BUY');ctx.font='500 8.5px '+F;
      const pillW=ctx.measureText(pillLabel).width+13;
      drawRoundRect(ctx,colX[ci],y+rowH/2-9,pillW,17,4);ctx.fillStyle=pillBg;ctx.fill();
      ctx.fillStyle=pillFg;ctx.textAlign='left';ctx.fillText(pillLabel,colX[ci]+6.5,y+rowH/2+3);ci++;
      if(!summary.noQty){
        ctx.font='400 10px '+F;ctx.fillStyle=t.text;
        ctx.fillText(String(r.qty),colX[ci++],y+rowH/2+4);
        ctx.fillStyle=t.text3;ctx.font='400 10px '+F;
        // Lift the rate only when there is a second line.
        const hasSub=isSell&&r.costBasisPerUnit!=null;
        ctx.fillText(r.perUnit?fmtPlain(parseFloat(r.perUnit)):'-',colX[ci],y+rowH/2+(hasSub?-2:4));
        if(hasSub){
          ctx.font='400 7.5px '+F;
          ctx.fillText('Avg buy price '+fmtPlain(parseFloat(r.costBasisPerUnit)),colX[ci],y+rowH/2+9);
        }
        ci++;
      }
      ctx.fillStyle=t.text;ctx.font='400 10px '+F;
      // Signed and compact amounts.
      const amtNum=parseFloat(r.amount);
      const amtFmt=isFinite(amtNum)?fmtPlain(amtNum):String(r.amount||'');
      const amtTxt=summary.isCash?((isSell?'-':'+')+amtFmt):amtFmt;
      if(summary.noQty){
        // Direction colour, accounts only.
        if(summary.isCash)ctx.fillStyle=isSell?t.red:t.green;
        ctx.textAlign='right';
        ctx.fillText(amtTxt,innerR,y+rowH/2+4);ctx.textAlign='left';ci++;
      }else ctx.fillText(amtTxt,colX[ci++],y+rowH/2+4);
      if(!summary.noQty){
        ctx.fillStyle=pnlV==null?t.text3:(pnlV>=0?t.green:t.red);
        ctx.font='400 10px '+F;ctx.textAlign='right';
        ctx.fillText(pnlV==null?'-':(pnlV>=0?'+':'')+r.realized,innerR,y+rowH/2+4);
        ctx.textAlign='left';
      }
      if(hasNotes&&r.notes){
        ctx.fillStyle=t.text3;ctx.font='italic 400 9px '+F;
        ctx.fillText(('Note: '+r.notes).slice(0,80),colX[0],y+rowH+11);
      }
      y+=thisRowH;
      if(ri<rows.length-1){ctx.strokeStyle=t.border;ctx.beginPath();ctx.moveTo(pad,y);ctx.lineTo(W-pad,y);ctx.stroke();}
    });
    y=tableTop+tableHeadH+bodyH+gap;

    // Footer
    ctx.fillStyle=t.text3;ctx.font='400 9px '+F;ctx.textAlign='center';
    ctx.fillText('Generated with Paisafolio - '+new Date().toLocaleString(),W/2,y+12);
    ctx.textAlign='left';
  };
  if(document.fonts&&document.fonts.load){
    Promise.all([
      document.fonts.load('700 20px Poppins'),
      document.fonts.load('600 12px Poppins'),
      document.fonts.load('500 11px Poppins')
    ]).then(doDraw).catch(doDraw);
  }else{doDraw();}
}
// SHARING A DEBT
// Image export with a status band (FULLY PAID / OVERDUE / AMOUNT TO PAY) on top.
let debtExportId=null;
function debtExportData(debtId){
  const d=(state.debts||[]).find(x=>x.id===debtId);if(!d)return null;
  const rate=getCurrRate(currentCurrency.code),cur=currentCurrency.code;
  const isOwed=d.type==='owed';
  const lends=((d.lendHistory&&d.lendHistory.length)?d.lendHistory
    :[{amount:d.amount,date:d.lentDate||d.date,note:d.note}])
    .filter(h=>h&&num(h.amount)>0)
    .map(h=>({kind:'lend',amount:num(h.amount),date:h.date,note:h.note||''}));
  const pays=(d.payments||[]).map(pp=>({kind:'pay',amount:num(pp.amount),date:pp.date,note:pp.note||''}));
  // Oldest first, with the running balance after each movement.
  const rows=[...lends,...pays]
    .sort((x,y)=>parseDay(x.date)-parseDay(y.date));
  let run=0;
  rows.forEach(r=>{ run+=(r.kind==='lend'?1:-1)*r.amount; r.balance=Math.max(0,run); });
  const lentTotal=lends.reduce((t,h)=>t+h.amount,0);
  const paidTotal=pays.reduce((t,h)=>t+h.amount,0);
  const accrued=calcAccrued(d)||0;
  const outstanding=Math.max(0,lentTotal+accrued-paidTotal);
  const overdue=!!(d.due&&outstanding>0&&parseDay(d.due)<new Date().setHours(0,0,0,0));
  // Interest as of today gets its own row so the balance matches the total.
  if(accrued>0.005)rows.push({kind:'interest',amount:accrued,date:todayStr(),
    note:accruedBasis(d)||'',balance:outstanding});
  return {d,rows,cur,rate,isOwed,
    summary:{lentTotal,paidTotal,accrued,outstanding,overdue,
      cleared:outstanding<=0.005,due:d.due||null,
      since:rows.length?rows[0].date:(d.lentDate||null)}};
}
function openDebtExportPicker(debtId){
  const data=debtExportData(debtId);
  if(!data){toast('Nothing to share yet','error');return;}
  debtExportId=debtId;
  const sheet=el('assetExportSheet');if(sheet)sheet.classList.add('wide-export');
  imgExportState={data,safeName:(data.d.name||'debt').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''),
    dateStr:todayStr(),theme:'dark',kind:'debt'};
  renderDebtImagePreview();
  openModal('assetExportModal');
}
function renderDebtImagePreview(){
  const body=el('assetExportBody');
  const st=imgExportState;
  body.innerHTML=`<div style="display:flex;flex-direction:column;gap:10px">
    <div style="display:flex;gap:6px">
      <button class="wiz-btn ${st.theme==='dark'?'primary':'ghost'}" style="flex:1;padding:8px" onclick="setDebtImgTheme('dark')">Dark</button>
      <button class="wiz-btn ${st.theme==='light'?'primary':'ghost'}" style="flex:1;padding:8px" onclick="setDebtImgTheme('light')">Light</button>
    </div>
    <div id="assetImgWrap" style="width:100%;display:block;overflow:auto;border-radius:12px;border:1px solid var(--border2)"><canvas id="assetImgCanvas" style="display:block;width:100%;height:auto"></canvas></div>
    <div style="display:flex;gap:8px">
      <button class="wiz-btn ghost" style="flex:1" onclick="copyImgExport()">Copy</button>
      <button class="wiz-btn primary" style="flex:1" onclick="downloadImgExport()">Download PNG</button>
    </div>
  </div>`;
  drawDebtImageCanvas();
}
function setDebtImgTheme(theme){imgExportState.theme=theme;renderDebtImagePreview();}
function copyImgExport(){
  const canvas=el('assetImgCanvas');if(!canvas)return;
  if(!navigator.clipboard||!window.ClipboardItem){toast('This browser cannot copy images, use Download','error');return;}
  canvas.toBlob(blob=>{
    if(!blob)return;
    navigator.clipboard.write([new ClipboardItem({'image/png':blob})])
      .then(()=>{haptic('success');toast('Copied, paste it anywhere','success');})
      .catch(()=>toast('Could not copy, use Download','error'));
  });
}
// Everyone at once, with the net total.
function openAllDebtsExport(){
  const list=(state.debts||[]).map(d=>debtExportData(d.id)).filter(Boolean)
    .filter(x=>x.summary.lentTotal>0);
  if(!list.length){toast('No debts to share yet','error');return;}
  const sheet=el('assetExportSheet');if(sheet)sheet.classList.add('wide-export');
  imgExportState={list,safeName:'debts',dateStr:todayStr(),theme:'dark',kind:'debts'};
  renderAllDebtsPreview();
  openModal('assetExportModal');
}
function renderAllDebtsPreview(){
  const body=el('assetExportBody');const st=imgExportState;
  body.innerHTML=`<div style="display:flex;flex-direction:column;gap:10px">
    <div style="display:flex;gap:6px">
      <button class="wiz-btn ${st.theme==='dark'?'primary':'ghost'}" style="flex:1;padding:8px" onclick="setAllDebtsTheme('dark')">Dark</button>
      <button class="wiz-btn ${st.theme==='light'?'primary':'ghost'}" style="flex:1;padding:8px" onclick="setAllDebtsTheme('light')">Light</button>
    </div>
    <div id="assetImgWrap" style="width:100%;display:block;overflow:auto;border-radius:12px;border:1px solid var(--border2)"><canvas id="assetImgCanvas" style="display:block;width:100%;height:auto"></canvas></div>
    <div style="display:flex;gap:8px">
      <button class="wiz-btn ghost" style="flex:1" onclick="copyImgExport()">Copy</button>
      <button class="wiz-btn primary" style="flex:1" onclick="downloadImgExport()">Download PNG</button>
    </div>
  </div>`;
  drawAllDebtsCanvas();
}
function setAllDebtsTheme(theme){imgExportState.theme=theme;renderAllDebtsPreview();}
function drawAllDebtsCanvas(){
  const st=imgExportState;const list=st.list;const t=IMG_EXPORT_THEMES[st.theme];const F=CARD_FONT;
  const doDraw=()=>{
    const rate=getCurrRate(currentCurrency.code);
    const owed=list.filter(x=>x.isOwed&&!x.summary.cleared);
    const owe=list.filter(x=>!x.isOwed&&!x.summary.cleared);
    const cleared=list.filter(x=>x.summary.cleared);
    const sum=a=>a.reduce((n,x)=>n+x.summary.outstanding,0);
    const totOwed=sum(owed),totOwe=sum(owe);
    const W=430,pad=16,gap=11,headerH=36,sectionTitleH=19;
    const bandH=58,rowH=30,groupH=20,footerH=22;
    const groups=[['OWED TO ME',owed],['I OWE',owe]];
    if(cleared.length)groups.push(['SETTLED',cleared]);
    const groupGap=9;
    let listH=0,shown=0;
    groups.forEach(([,g])=>{ if(!g.length)return; listH+=(shown++?groupGap:0)+groupH+g.length*rowH; });
    const H=pad+headerH+gap+bandH+gap+sectionTitleH+listH+footerH+pad;
    const canvas=el('assetImgCanvas');if(!canvas)return;
    const wrap=el('assetImgWrap');
    const scale=3;canvas.width=W*scale;canvas.height=H*scale;
    const displayW=(wrap&&wrap.clientWidth)?Math.min(wrap.clientWidth,W):W;
    canvas.style.width=displayW+'px';canvas.style.height=(displayW*H/W)+'px';
    const ctx=canvas.getContext('2d');ctx.setTransform(scale,0,0,scale,0,0);
    ctx.textBaseline='alphabetic';ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
    ctx.fillStyle=t.bg;ctx.fillRect(0,0,W,H);
    let y=pad;
    // header
    ctx.fillStyle=t.text;ctx.font='600 15px '+F;ctx.textAlign='left';
    ctx.fillText('Money between people',pad,y+16);
    ctx.fillStyle=t.text3;ctx.font='400 11px '+F;
    ctx.fillText(plural(list.length,'person','people')+' \u00b7 '+new Date().toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}),pad,y+30);
    const brandLabel='Paisafolio';ctx.font='500 10px '+F;
    const brandW=ctx.measureText(brandLabel).width;
    drawRoundRect(ctx,W-pad-brandW-16,y,brandW+16,17,5);ctx.fillStyle=t.accentSoft;ctx.fill();
    ctx.textAlign='center';ctx.fillStyle=t.accent;ctx.fillText(brandLabel,W-pad-brandW/2-8,y+12);
    ctx.textAlign='left';
    y+=headerH+gap;
    // the net position, which is the one number worth leading with
    const net=totOwed-totOwe;
    const netCol=net>=0?t.green:t.red;
    drawRoundRect(ctx,pad+0.5,y+0.5,W-pad*2-1,bandH-1,10);
    ctx.fillStyle=net>=0?t.greenSoft:t.redSoft;ctx.fill();
    ctx.strokeStyle=netCol;ctx.lineWidth=1;ctx.stroke();
    ctx.textAlign='center';ctx.fillStyle=netCol;ctx.font='700 10px '+F;
    ctx.fillText(net>=0?'NET, IN MY FAVOUR':'NET, I OWE MORE',W/2,y+20);
    ctx.font='700 21px '+F;ctx.fillStyle=t.text;
    ctx.fillText(fmtPlain(Math.abs(net)*rate),W/2,y+44);
    ctx.textAlign='left';
    y+=bandH+gap;
    ctx.fillStyle=t.text3;ctx.font='500 12px '+F;
    ctx.fillText('Everyone',pad,y+14);
    y+=sectionTitleH;
    let drawn=0;
    groups.forEach(([label,g])=>{
      if(!g.length)return;
      if(drawn++)y+=groupGap;
      const isOwedGroup=label==='OWED TO ME';
      const isCleared=label==='SETTLED';
      ctx.fillStyle=isCleared?t.muted:(isOwedGroup?t.green:t.red);
      ctx.font='700 9px '+F;
      ctx.fillText(label,pad,y+13);
      ctx.textAlign='right';ctx.fillStyle=t.text3;ctx.font='400 9px '+F;
      if(!isCleared)ctx.fillText(fmtPlain(sum(g)*rate),W-pad,y+13);
      ctx.textAlign='left';
      y+=groupH;
      g.forEach((x,i)=>{
        const dot=isCleared?t.muted:(x.summary.overdue?t.red:(isOwedGroup?t.green:t.red));
        ctx.beginPath();ctx.arc(pad+4,y+rowH/2-1,3.2,0,Math.PI*2);ctx.fillStyle=dot;ctx.fill();
        ctx.fillStyle=isCleared?t.text3:t.text;ctx.font='500 11px '+F;
        ctx.fillText(String(x.d.name||'').slice(0,26),pad+15,y+rowH/2+3);
        // Overdue is the thing you want to see at a glance in a list like this.
        if(x.summary.overdue){
          const nw=ctx.measureText(String(x.d.name||'').slice(0,26)).width;
          ctx.font='700 8px '+F;ctx.fillStyle=t.red;
          const ow=ctx.measureText('OVERDUE').width;
          drawRoundRect(ctx,pad+15+nw+7,y+rowH/2-8,ow+11,14,4);
          ctx.fillStyle=t.redSoft;ctx.fill();ctx.fillStyle=t.redTxt||t.red;
          ctx.fillText('OVERDUE',pad+15+nw+12.5,y+rowH/2+2);
        }
        ctx.textAlign='right';
        ctx.font='600 11px '+F;
        ctx.fillStyle=isCleared?t.muted:t.text;
        ctx.fillText(isCleared?'Settled':fmtPlain(x.summary.outstanding*rate),W-pad,y+rowH/2+3);
        ctx.textAlign='left';
        if(i<g.length-1){ctx.strokeStyle=t.border;ctx.lineWidth=1;ctx.beginPath();
          ctx.moveTo(pad,y+rowH);ctx.lineTo(W-pad,y+rowH);ctx.stroke();}
        y+=rowH;
      });
    });
    ctx.fillStyle=t.muted;ctx.font='400 9px '+F;ctx.textAlign='center';
    ctx.fillText('Generated with Paisafolio \u00b7 '+new Date().toLocaleString(),W/2,y+16);
    ctx.textAlign='left';
  };
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(doDraw).catch(doDraw);
  else doDraw();
}
function drawDebtImageCanvas(){
  const st=imgExportState;const{d,rows,summary,rate,isOwed}=st.data;
  const t=IMG_EXPORT_THEMES[st.theme];const F=CARD_FONT;
  const doDraw=()=>{
    const W=440,pad=16;
    const headerH=36,gap=11,sectionTitleH=19;
    const bandH=64;
    const sRowH=37,sumRows=summary.accrued>0?2:1;
    const sumCardH=sumRows*sRowH+10;
    const tableHeadH=24,rowH=29,noteH=15;
    const hasNotes=rows.some(r=>r.note);
    let bodyH=0;rows.forEach(r=>{bodyH+=rowH+(hasNotes&&r.note?noteH:0);});
    const tableCardH=tableHeadH+bodyH;
    const footerH=22;
    const H=pad+headerH+gap+bandH+gap+sumCardH+gap+sectionTitleH+tableCardH+footerH+pad;
    const canvas=el('assetImgCanvas');if(!canvas)return;
    const wrap=el('assetImgWrap');
    const scale=3;canvas.width=W*scale;canvas.height=H*scale;
    const displayW=(wrap&&wrap.clientWidth)?Math.min(wrap.clientWidth,W):W;
    canvas.style.width=displayW+'px';canvas.style.height=(displayW*H/W)+'px';
    const ctx=canvas.getContext('2d');ctx.setTransform(scale,0,0,scale,0,0);
    ctx.textBaseline='alphabetic';ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
    ctx.fillStyle=t.bg;ctx.fillRect(0,0,W,H);
    const card=(x,y,w,h,r)=>{drawRoundRect(ctx,x+0.5,y+0.5,w-1,h-1,r);ctx.fillStyle=t.bg2;ctx.fill();
      ctx.strokeStyle=t.border;ctx.lineWidth=1;ctx.stroke();};
    let y=pad;

    // ── who, and which way round the money went
    const iconSize=34;
    drawRoundRect(ctx,pad,y,iconSize,iconSize,9);
    ctx.fillStyle=isOwed?t.green:t.red;ctx.fill();
    ctx.fillStyle='#fff';ctx.font='700 16px '+F;ctx.textAlign='center';
    ctx.fillText((d.name||'?').charAt(0).toUpperCase(),pad+iconSize/2,y+iconSize/2+6);
    ctx.textAlign='left';
    ctx.fillStyle=t.text;ctx.font='600 14px '+F;
    ctx.fillText(d.name||'Someone',pad+iconSize+8,y+15);
    ctx.fillStyle=t.text3;ctx.font='400 11px '+F;
    ctx.fillText(isOwed?'Owes me':'I owe them',pad+iconSize+8,y+29);
    const brandLabel='Paisafolio';
    ctx.font='500 10px '+F;
    const brandW=ctx.measureText(brandLabel).width;
    drawRoundRect(ctx,W-pad-brandW-16,y,brandW+16,17,5);ctx.fillStyle=t.accentSoft;ctx.fill();
    ctx.textAlign='center';ctx.fillStyle=t.accent;
    ctx.fillText(brandLabel,W-pad-brandW/2-8,y+12);
    ctx.textAlign='right';ctx.fillStyle=t.text3;ctx.font='400 10px '+F;
    ctx.fillText(new Date().toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}),W-pad,y+30);
    ctx.textAlign='left';
    y+=headerH+gap;

    // ── the band. The whole point of sending this to someone.
    const bandCol=summary.cleared?t.green:(summary.overdue?t.red:t.accent);
    const bandSoft=summary.cleared?t.greenSoft:(summary.overdue?t.redSoft:t.accentSoft);
    drawRoundRect(ctx,pad+0.5,y+0.5,W-pad*2-1,bandH-1,10);
    ctx.fillStyle=bandSoft;ctx.fill();
    ctx.strokeStyle=bandCol;ctx.lineWidth=1;ctx.stroke();
    const bandTitle=summary.cleared?'FULLY PAID':(summary.overdue?'OVERDUE':(isOwed?'STILL TO COME':'STILL TO PAY'));
    ctx.textAlign='center';
    ctx.fillStyle=bandCol;ctx.font='700 10px '+F;
    ctx.fillText(bandTitle,W/2,y+21);
    ctx.font='700 22px '+F;ctx.fillStyle=summary.cleared?bandCol:t.text;
    ctx.fillText(summary.cleared?'All settled':fmtPlain(summary.outstanding*rate),W/2,y+46);
    if(!summary.cleared&&summary.due){
      ctx.font='400 9.5px '+F;ctx.fillStyle=summary.overdue?bandCol:t.text3;
      ctx.fillText((summary.overdue?'Was due ':'Due ')+formatDate(summary.due),W/2,y+58);
    }
    ctx.textAlign='left';
    y+=bandH+gap;

    // ── the three or four figures behind that number
    card(pad,y,W-pad*2,sumCardH,8);
    const items=[[isOwed?'LENT':'BORROWED',fmtPlain(summary.lentTotal*rate),t.text],
      ['PAID BACK',fmtPlain(summary.paidTotal*rate),summary.paidTotal?t.green:t.text]];
    if(summary.accrued>0){
      items.push(['INTEREST',fmtPlain(summary.accrued*rate),t.accent]);
      items.push(['OUTSTANDING',fmtPlain(summary.outstanding*rate),t.text]);
    }
    const sCols=2,sColW=(W-pad*2)/sCols;
    items.forEach((item,i)=>{
      const col=i%sCols,row=Math.floor(i/sCols);
      const sx=pad+10+col*sColW,syy=y+5+row*sRowH+sRowH/2-3;
      ctx.fillStyle=t.text3;ctx.font='400 9px '+F;ctx.fillText(item[0],sx,syy);
      ctx.font='600 11px '+F;ctx.fillStyle=item[2];ctx.fillText(String(item[1]),sx,syy+15);
    });
    ctx.strokeStyle=t.border;ctx.lineWidth=1;
    for(let r=1;r<sumRows;r++){ctx.beginPath();ctx.moveTo(pad,y+r*sRowH+5);ctx.lineTo(W-pad,y+r*sRowH+5);ctx.stroke();}
    y+=sumCardH+gap;

    // ── every movement, with the balance after it
    ctx.fillStyle=t.text3;ctx.font='500 12px '+F;ctx.textAlign='left';
    ctx.fillText('History',pad,y+14);
    y+=sectionTitleH;
    const innerL=pad+6,innerR=W-pad-6,innerW=innerR-innerL;
    const colFrac=[0,0.27,0.60,1];
    const colX=colFrac.slice(0,-1).map(f=>innerL+f*innerW);
    const headers=['DATE','WHAT','AMOUNT','BALANCE'];
    ctx.fillStyle=t.text3;ctx.font='400 9px '+F;
    headers.forEach((h,i)=>{
      if(i===headers.length-1){ctx.textAlign='right';ctx.fillText(h,innerR,y+17);ctx.textAlign='left';}
      else ctx.fillText(h,colX[i],y+17);
    });
    ctx.strokeStyle=t.border;ctx.beginPath();ctx.moveTo(pad,y+tableHeadH);ctx.lineTo(W-pad,y+tableHeadH);ctx.stroke();
    y+=tableHeadH;
    rows.forEach((r,ri)=>{
      const thisRowH=rowH+(hasNotes&&r.note?noteH:0);
      const isPay=r.kind==='pay', isInt=r.kind==='interest';
      const pillBg=isInt?t.accentSoft:isPay?t.greenSoft:(isOwed?t.accentSoft:t.redSoft);
      const pillFg=isInt?t.accent:isPay?(t.greenTxt||t.green):(isOwed?t.accent:(t.redTxt||t.red));
      let ci=0;
      ctx.fillStyle=t.text2;ctx.font='500 9px '+F;
      const dObj=r.date?parseDay(r.date):null;
      ctx.fillText(dObj&&!isNaN(dObj)?dObj.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}):String(r.date||''),colX[ci++],y+rowH/2+4);
      const pillLabel=isInt?'Interest':isPay?'Payment':(isOwed?'Lent':'Borrowed');
      ctx.font='500 8.5px '+F;
      const pillW=ctx.measureText(pillLabel).width+13;
      drawRoundRect(ctx,colX[ci],y+rowH/2-9,pillW,17,4);ctx.fillStyle=pillBg;ctx.fill();
      ctx.fillStyle=pillFg;ctx.fillText(pillLabel,colX[ci]+6.5,y+rowH/2+3);ci++;
      ctx.font='400 10px '+F;ctx.fillStyle=isInt?t.accent:isPay?t.green:t.text;
      ctx.fillText((isPay?'-':'+')+fmtPlain(r.amount*rate),colX[ci++],y+rowH/2+4);
      ctx.fillStyle=t.text2;ctx.textAlign='right';
      ctx.fillText(fmtPlain(r.balance*rate),innerR,y+rowH/2+4);
      ctx.textAlign='left';
      if(hasNotes&&r.note){
        ctx.fillStyle=t.muted;ctx.font='italic 400 9px '+F;
        ctx.fillText(String(r.note).slice(0,70),colX[0],y+rowH+7);
      }
      if(ri<rows.length-1){
        ctx.strokeStyle=t.border;ctx.beginPath();
        ctx.moveTo(pad,y+thisRowH);ctx.lineTo(W-pad,y+thisRowH);ctx.stroke();
      }
      y+=thisRowH;
    });
    ctx.fillStyle=t.muted;ctx.font='400 9px '+F;ctx.textAlign='center';
    ctx.fillText('Generated with Paisafolio \u00b7 '+new Date().toLocaleString(),W/2,y+16);
    ctx.textAlign='left';
  };
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(doDraw).catch(doDraw);
  else doDraw();
}
function downloadImgExport(){
  const canvas=el('assetImgCanvas');if(!canvas)return;
  canvas.toBlob(blob=>{
    const{safeName,dateStr}=imgExportState;
    const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='paisafolio-'+safeName+'-'+dateStr+'.png';link.click();
    haptic('success');toast('Exported as Image','success');closeModal('assetExportModal');
  });
}
// Settings' Import Data row.
function importData(){ openImportWizard(); }
function openImportWizard(){
  _importPendingData = null;
  const inp = el('importFileInput'); if (inp) inp.value = '';
  renderImportWizardStep1();
  openModal('importWizardModal');
}
function renderImportWizardStep1() {
  const body = el('importWizardBody');
  body.innerHTML = `
    <div class="wiz-step" style="text-align:center;padding:10px 0">
      <div class="sync-choice-ico" style="width:52px;height:52px;border-radius:16px;margin:0 auto 10px">${svgIcon('box',24)}</div>
      <div style="font-size:13px;font-weight:700;color:var(--text)">Choose a backup file</div>
      <div style="font-size:11.5px;color:var(--text2);margin-top:4px;line-height:1.5">Select a Paisafolio .json backup file exported earlier. You'll get to preview what's inside before anything is changed.</div>
      <button class="wiz-btn primary" style="margin-top:16px" onclick="el('importFileInput').click()">Choose File</button>
    </div>`;
}
let _importPendingData = null;
// IMPORT VALIDATION
// Backups are untrusted: every field is type-checked and coerced.
const IMPORT_LIMITS = { assets:5000, spends:50000, debts:5000, goals:2000, recurs:2000, transactions:50000 };

// Ids end up in onclick="fn('${id}')"; restrict the charset.
function safeId(v){
  const s = String(v == null ? '' : v).trim();
  return /^[A-Za-z0-9_-]{1,64}$/.test(s) ? s : null;
}
function safeStr(v, max = 200){
  if (v == null) return '';
  return String(v).replace(/[\u0000-\u001F\u007F]/g, '').slice(0, max);
}
function safeNum(v){
  const n = typeof v === 'number' ? v : parseFloat(v);
  return Number.isFinite(n) ? n : null;
}
// Only real, parseable dates.
function safeDate(v){
  if (!v) return null;
  const s = String(v).slice(0, 40);
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : s;
}

function sanitizeImportedItem(kind, raw){
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const id = safeId(raw.id) || uid();          // mint a fresh id rather than drop the row
  const out = { ...raw, id };

  // Strings that get rendered
  ['name','note','notes','ticker','person','institution','account','category','type','unit',
   'commodityId','coinId','propertyType','icon','color','freq','currency'].forEach(k=>{
    if (k in out) out[k] = safeStr(out[k], (k === 'notes' || k === 'note') ? 2000 : 200);
  });
  // coinImage is put into an <img src>. Only allow plain http(s) URLs.
  if (out.coinImage != null){
    const u = String(out.coinImage);
    out.coinImage = /^https?:\/\//i.test(u) ? u.slice(0, 500) : '';
  }
  // Numbers
  ['qty','buyPrice','currentPrice','value','amount','target','saved','interest','price'].forEach(k=>{
    if (k in out){ const n = safeNum(out[k]); if (n === null) delete out[k]; else out[k] = n; }
  });
  // Dates
  ['date','deadline','dueDate','lentDate','interestSince','nextRun','occurredAt'].forEach(k=>{
    if (k in out){ const d = safeDate(out[k]); if (d === null) delete out[k]; else out[k] = d; }
  });

  // Per-kind required shape
  if (kind === 'assets'){
    if (!out.category) out.category = 'other';
    if (out.category === 'cash') out.category = 'liquidity';
  }
  if (kind === 'debts'){
    // Anything outside the known set breaks the DB check constraint on push.
    if (out.type !== 'owed' && out.type !== 'iowe') out.type = 'owed';
    if (Array.isArray(out.payments)){
      out.payments = out.payments
        .filter(p => p && typeof p === 'object')
        .map(p => ({ ...p, id: safeId(p.id) || uid(), amount: safeNum(p.amount) ?? 0, date: safeDate(p.date) }))
        .slice(0, 1000);
    } else if ('payments' in out) out.payments = [];
  }
  if (kind === 'goals'){
    if (Array.isArray(out.linkedAssetIds)){
      out.linkedAssetIds = out.linkedAssetIds.map(safeId).filter(Boolean).slice(0, 200);
    }
  }
  if (kind === 'transactions'){
    if (out.assetId != null) out.assetId = safeId(out.assetId);
  }
  if (kind === 'spends'){
    // Only expense or income.
    out.kind = (out.kind === 'income') ? 'income' : 'expense';
    if (!out.category) out.category = 'other';
    out.amount = safeNum(out.amount) ?? 0;
    // These are ids rows are looked up by, not free text.
    ['account','linkId','recurId'].forEach(k=>{ if (out[k] != null) out[k] = safeId(out[k]); });
  }
  if (kind === 'recurs'){
    if (out.kind !== 'bill') out.kind = 'invest';
    if (out.account != null) out.account = safeId(out.account);
  }
  return out;
}

// Merge an imported list into a local list by id. Never removes a local item.
function mergeList(kind, localList, importedList, stats){
  if (!Array.isArray(importedList)) return localList;
  const byId = new Map((localList || []).map(x => [x && x.id, x]));
  let count = 0;
  for (const raw of importedList){
    if (count++ >= (IMPORT_LIMITS[kind] || 5000)) break;
    const item = sanitizeImportedItem(kind, raw);
    if (!item){ stats.skipped++; continue; }
    if (byId.has(item.id)){
      // Same id already here, treat the file as newer and update in place.
      byId.set(item.id, { ...byId.get(item.id), ...item });
      stats.updated++;
    } else {
      byId.set(item.id, item);
      stats.added++;
    }
  }
  return [...byId.values()];
}

function mergeImportedData(data){
  const stats = { added:0, updated:0, skipped:0 };
  ['assets','spends','debts','goals','recurs','transactions'].forEach(kind=>{
    state[kind] = mergeList(kind, state[kind] || [], data[kind], stats);
  });

  // Merge by date, local wins.
  if (Array.isArray(data.pnlHistory)){
    const byDate = new Map();
    data.pnlHistory.forEach(p=>{
      const d = safeDate(p && p.date), n = safeNum(p && p.netWorth);
      if (d === null || n === null) return;
      const pt = { date:d, netWorth:n };
      // Keep per-holding values.
      const av = p && p.assets;
      if (av && typeof av === 'object' && !Array.isArray(av)){
        const clean = {};
        Object.keys(av).forEach(k=>{ const v = safeNum(av[k]); if (v !== null) clean[k] = v; });
        if (Object.keys(clean).length) pt.assets = clean;
      }
      byDate.set(d, pt);
    });
    (state.pnlHistory || []).forEach(p=>{ if (p && p.date) byDate.set(p.date, p); });
    state.pnlHistory = [...byDate.values()].sort((a,b)=>a.date.localeCompare(b.date)).slice(-365);
  }

  // Never import the lock or device display choices.
  if (data.settings && typeof data.settings === 'object'){
    const deviceOnly = {
      theme: state.settings.theme,
      hideBalance: state.settings.hideBalance,
      haptics: state.settings.haptics,
      hapticStrength: state.settings.hapticStrength,
      reduceMotion: state.settings.reduceMotion,
    };
    state.settings = { ...state.settings, ...data.settings, ...deviceOnly, onboarded:true };
  }
  state.lastUpdated = new Date().toISOString();
  return stats;
}

function doImport(e){
  const file = e.target.files[0]; if (!file) return;
  // Anything this big would freeze the tab.
  if (file.size > 25 * 1024 * 1024){
    toast('That file is too large to be a Paisafolio backup', 'error');
    e.target.value = ''; return;
  }
  const r = new FileReader();
  r.onerror = () => toast('Couldn\u2019t read that file', 'error');
  r.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      if (!data || typeof data !== 'object' || Array.isArray(data)) {
        toast('That file isn\u2019t a Paisafolio backup', 'error'); return;
      }
      // Lists must really be arrays.
      const lists = ['assets','spends','debts','goals','recurs','transactions'];
      for (const k of lists){
        if (k in data && !Array.isArray(data[k])){
          toast(`Backup is malformed: "${k}" should be a list`, 'error'); return;
        }
      }
      if (!lists.some(k => Array.isArray(data[k]) && data[k].length)) {
        toast('Nothing to import, this backup is empty', 'error'); return;
      }
      _importPendingData = data;
      renderImportPreview(data, file.name);
    } catch (err) { toast('Failed to read file', 'error'); }
  };
  r.readAsText(file);
  e.target.value = '';
}
function renderImportPreview(data, filename) {
  const body = el('importWizardBody');
  const counts = {
    assets: (data.assets||[]).length, spends: (data.spends||[]).length,
    debts: (data.debts||[]).length,
    goals: (data.goals||[]).length, recurs: (data.recurs||[]).length,
    transactions: (data.transactions||[]).length,
  };
  const total = Object.values(counts).reduce((a,b)=>a+b,0);
  body.innerHTML = `
    <div class="wiz-step">
      <div class="wiz-preview-card">
        <div style="font-size:11.5px;color:var(--text2);display:flex;align-items:center;gap:6px">${svgIcon('box',13)} ${esc(filename)}</div>
        <div style="font-size:11px;color:var(--text3);margin-top:3px">${data.exportedAt?'Exported '+new Date(data.exportedAt).toLocaleDateString():'Backup file'}${data.appVersion?' · '+esc(data.appVersion):''}</div>
        <div class="wiz-preview-grid">
          <div class="wiz-preview-cell"><div class="wiz-preview-cell-lbl">Assets</div><div class="wiz-preview-cell-val">${counts.assets}</div></div>
          <div class="wiz-preview-cell"><div class="wiz-preview-cell-lbl">Spending</div><div class="wiz-preview-cell-val">${counts.spends}</div></div>
          <div class="wiz-preview-cell"><div class="wiz-preview-cell-lbl">Debts</div><div class="wiz-preview-cell-val">${counts.debts}</div></div>
          <div class="wiz-preview-cell"><div class="wiz-preview-cell-lbl">Goals</div><div class="wiz-preview-cell-val">${counts.goals}</div></div>
          <div class="wiz-preview-cell"><div class="wiz-preview-cell-lbl">Recurring</div><div class="wiz-preview-cell-val">${counts.recurs}</div></div>
          <div class="wiz-preview-cell"><div class="wiz-preview-cell-lbl">Transactions</div><div class="wiz-preview-cell-val">${counts.transactions}</div></div>
        </div>
      </div>
      <div style="font-size:11.5px;color:var(--accent);background:var(--accent-glow);border-radius:10px;padding:10px 12px;line-height:1.5">This will merge into your current data (${total} item${total!==1?'s':''} found). Items already on your device with the same ID will be updated; nothing currently on your device will be silently deleted.</div>
      <div class="wiz-btn-row">
        <button class="wiz-btn ghost" onclick="closeModal('importWizardModal')">Cancel</button>
        <button class="wiz-btn primary" onclick="runImportWizard()">Import Data</button>
      </div>
    </div>`;
}
async function runImportWizard() {
  if (!_importPendingData) return;
  const data = _importPendingData;
  const body = el('importWizardBody');
  const steps = [
    { key:'assets', label:'Assets', ico:'wallet' }, { key:'spends', label:'Spending', ico:'banknote' },
    { key:'debts', label:'Debts', ico:'coins' },
    { key:'goals', label:'Goals', ico:'target' }, { key:'recurs', label:'Recurring', ico:'coins' },
    { key:'transactions', label:'Transactions', ico:'clock' },
  ].filter(s => (data[s.key]||[]).length || s.key in data);

  body.innerHTML = `
    <div class="wiz-progress-wrap">
      <div class="wiz-progress-label" id="impProgLabel">Importing…</div>
      <div class="wiz-progress-track"><div class="wiz-progress-fill" id="impProgFill" style="width:0%"></div></div>
      <div class="wiz-progress-sub" id="impProgSub">Starting…</div>
      <div class="wiz-progress-items" id="impProgItems">
        ${steps.map(s => `<div class="wiz-progress-item" id="imp-item-${s.key}"><span class="wiz-pi-ico">${svgIcon(s.ico,11)}</span><span>${s.label}</span></div>`).join('')}
      </div>
    </div>`;

  for (let i = 0; i < steps.length; i++) {
    const s = steps[i];
    const itemEl = el('imp-item-'+s.key);
    if (itemEl) itemEl.classList.add('active');
    if (el('impProgLabel')) el('impProgLabel').textContent = 'Importing '+s.label+'…';
    if (el('impProgSub')) el('impProgSub').textContent = (data[s.key]||[]).length+' item'+((data[s.key]||[]).length!==1?'s':'');
    if (el('impProgFill')) el('impProgFill').style.width = Math.round((i/steps.length)*100)+'%';
    await new Promise(r => setTimeout(r, 160));
    if (itemEl) { itemEl.classList.remove('active'); itemEl.classList.add('done'); itemEl.querySelector('.wiz-pi-ico').innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>'; }
    if (el('impProgFill')) el('impProgFill').style.width = Math.round(((i+1)/steps.length)*100)+'%';
  }

  // Merge, don't replace.
  const mergeStats = mergeImportedData(data);
  state.settings = Object.assign({currency:'NPR',hideBalance:false,theme:'dark',haptics:true,hapticStrength:'medium',reduceMotion:false,onboarded:true}, state.settings||{});
  saveState();
  currentCurrency = CURRENCIES.find(c=>c.code===state.settings.currency) || CURRENCIES[0];
  applyTheme(state.settings.theme);
  updateCurrLabels(); renderAll(); renderSettings(); renderTicker();

  const total = mergeStats.added + mergeStats.updated;
  body.innerHTML = `
    <div class="wiz-step" style="text-align:center">
      <div class="wiz-success-ico"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>
      <div style="font-size:15px;font-weight:800;color:var(--text)">Import Complete</div>
      <div style="font-size:12px;color:var(--text2)">${mergeStats.added} new item${mergeStats.added!==1?'s':''} added${mergeStats.updated?`, ${mergeStats.updated} updated`:''}${mergeStats.skipped?`, ${mergeStats.skipped} skipped as invalid`:''}.</div>
      <div style="font-size:11px;color:var(--text3);margin-top:2px">Nothing already on this device was removed.</div>
      <div class="wiz-btn-row"><button class="wiz-btn primary" style="flex:1" onclick="closeModal('importWizardModal')">Done</button></div>
    </div>`;
  haptic('success'); toast('Data imported!', 'success');
  _importPendingData = null;
}
async function clearAllData(){if(!await askConfirm({title:'Delete everything?',message:'Every asset, expense, debt, goal, recurring item, habit and transaction on this device will be permanently deleted. Export a backup first if you might want any of it back.',confirmText:'Delete everything'}))return;
  // Keep device prefs and base currency; spends must be an array.
  const keep={theme:state.settings.theme,haptics:state.settings.haptics,hapticStrength:state.settings.hapticStrength,reduceMotion:state.settings.reduceMotion,baseCurrency:baseCode(),onboarded:true};state={assets:[],debts:[],goals:[],recurs:[],transactions:[],spends:[],settings:Object.assign({currency:'NPR',hideBalance:false},keep),lastUpdated:null,pnlHistory:[]};completedGoals=new Set();saveState();renderAll();renderSettings();haptic('tap');
  if(supabaseUser&&typeof pushToCloud==='function'){
    // Confirmed full wipe: push now, bypassing the wipe guard, so the cloud clears too.
    pushToCloud(true).catch(e=>{console.warn('[clearAllData] cloud push failed:',e);toast('Cleared on this device, but couldn\u2019t clear the cloud copy, try Sync Now.','error');});
  }
  toast('All data cleared');}
// PWA
// A new service worker only takes over the next navigation; offer a reload.
let _updateOffered=false,_swHadController=false;
function offerAppUpdate(){
  if(_updateOffered)return;
  // Only offer when a worker was already in control (not a first install).
  if(!_swHadController)return;
  _updateOffered=true;
  const stack=el('undoToastStack');
  if(!stack){toast('A new version is ready. Reload to get it.','success');return;}
  const t=document.createElement('div');
  t.className='undo-toast update-toast';
  t.setAttribute('role','status');
  const span=document.createElement('span');
  span.className='toast-msg';
  span.textContent='New version ready';
  const btn=document.createElement('button');
  btn.type='button';btn.className='toast-undo';btn.textContent='Reload';
  btn.setAttribute('aria-label','Reload to load the new version');
  btn.addEventListener('click',()=>{
    // Flush anything pending so a reload cannot lose the last edit.
    try{flushSave();}catch(e){}
    location.reload();
  });
  const close=document.createElement('button');
  close.type='button';close.className='toast-undo';close.textContent='Later';
  close.style.opacity='.7';
  close.addEventListener('click',()=>{t.classList.remove('show');setTimeout(()=>t.remove(),220);});
  t.appendChild(span);t.appendChild(btn);t.appendChild(close);
  stack.appendChild(t);
  requestAnimationFrame(()=>t.classList.add('show'));
  haptic('tap');
}
function registerSW(){
  if(!('serviceWorker' in navigator))return;
  _swHadController=!!navigator.serviceWorker.controller;
  navigator.serviceWorker.register('sw.js').then(reg=>{
    if(!reg)return;
    // A waiting worker can only be waiting behind one already in charge.
    if(reg.waiting){_swHadController=true;offerAppUpdate();}
    reg.addEventListener('updatefound',()=>{
      const nw=reg.installing;if(!nw)return;
      nw.addEventListener('statechange',()=>{if(nw.state==='installed')offerAppUpdate();});
    });
    // Coming back to the app is the natural moment to look for a new one.
    document.addEventListener('visibilitychange',()=>{
      if(!document.hidden)reg.update().catch(()=>{});
    });
    // And once in a while for a session left open all day.
    setInterval(()=>reg.update().catch(()=>{}),30*60*1000);
  }).catch(()=>{});
  navigator.serviceWorker.addEventListener('message',e=>{
    if(e.data&&e.data.type==='SW_UPDATED')offerAppUpdate();
  });
}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;const it=el('installItem');if(it)it.style.display='flex';});
window.addEventListener('appinstalled',()=>{deferredPrompt=null;const it=el('installItem');if(it)it.style.display='none';toast('App installed!','success');});
async function installApp(){if(!deferredPrompt){toast('Use your browser menu → "Add to Home Screen"');return;}deferredPrompt.prompt();const r=await deferredPrompt.userChoice;deferredPrompt=null;if(r&&r.outcome==='accepted')toast('Installing…','success');}
// ONBOARDING
// GUIDED TOUR: spotlights real elements. The hole is one box-shadow with a huge spread.
const TOUR = [
  { sel: '.nw-card', page: 'dash', title: 'Your net worth',
    text: 'Everything you own minus everything you owe. Tap the number itself to blur it when someone is looking over your shoulder.' },
  { sel: '#miniChartWrap', page: 'dash', title: 'How it moved',
    text: 'Drag your finger across the line. It reads out what you were worth that day, what that day changed, and how far it had moved overall.' },
  { sel: '.insights', page: 'dash', title: 'The short version',
    text: 'Profit and loss, what you have spent this month, your best and worst holding, what is due. Swipe along it, there is more than fits.' },
  { sel: '#page-assets .add-btn, #page-assets .page-hdr', page: 'assets', title: 'What you own',
    text: 'Crypto, shares, gold, property, bank balances. Anything with a live price updates on its own; anything else keeps the price you set.' },
  { sel: '#budgetCard, #budgetEmpty', page: 'spend', title: 'Where it goes',
    text: 'Log what you spend and set a monthly budget. Typing the note picks the category for you, and when you correct one it remembers the shop.' },
  { sel: '#page-debts .page-hdr', page: 'debts', title: 'Money between people',
    text: 'What you lent and what you borrowed, with due dates, interest, and how overdue something is getting.' },
  { sel: '#page-plan .page-hdr', page: 'plan', title: 'Goals and habits',
    text: 'Give a goal a target and a monthly amount and it tells you whether you actually get there, or what would close the gap.' },
  { sel: '#aiBubble', page: 'dash', title: 'Ask about your money',
    text: 'Folio reads the figures already in this app. Drag the bubble wherever your thumb sits; it sticks to the nearest edge.' },
  { sel: '#acctBtn', page: 'dash', title: 'Keep it safe',
    text: 'Sign in to sync across your devices. Everything works offline without an account, and goes up when you reconnect.' },
];
let tourStep = 0, _tourOn = false, _tourWatch = null, _tourRaf = 0;

function startTour(){
  if (!el('tourOverlay')) return;
  tourStep = 0; _tourOn = true;
  el('tourOverlay').classList.add('open');
  el('tourOverlay').setAttribute('aria-hidden', 'false');
  document.body.classList.add('tour-open');
  // Stop the Folio bubble tucking itself away mid-tour.
  const _bub=el('aiBubble');
  if(_bub){clearTimeout(_aiTuckTimer);untuckBubble();}
  pushModalHistory();
  // Follow the target on scroll and resize, once per frame.
  _tourWatch = () => {
    if (!_tourOn || _tourRaf) return;
    _tourRaf = requestAnimationFrame(() => { _tourRaf = 0; positionTour(true); });
  };
  window.addEventListener('resize', _tourWatch, { passive: true });
  window.addEventListener('scroll', _tourWatch, { passive: true, capture: true });
  paintTourStep();
}
function endTour(){
  _tourOn = false;
  const o = el('tourOverlay');
  if (o) { o.classList.remove('open'); o.setAttribute('aria-hidden', 'true'); }
  document.body.classList.remove('tour-open');
  document.querySelectorAll('.tour-lit').forEach(n => n.classList.remove('tour-lit', 'tour-lit-static'));
  if (_tourWatch) {
    window.removeEventListener('resize', _tourWatch);
    window.removeEventListener('scroll', _tourWatch, { capture: true });
    _tourWatch = null;
  }
  if (_tourRaf) { cancelAnimationFrame(_tourRaf); _tourRaf = 0; }
  state.settings.onboarded = true;
  saveState();
  popModalHistoryIfNeeded();
  syncBodyScrollLock();
  try{scheduleAiTuck();}catch(e){}
}
function tourNext(){ haptic('tap'); if (tourStep < TOUR.length - 1) { tourStep++; paintTourStep(); } else { endTour(); toast('That is the tour. Settings can replay it any time.', 'success'); } }
function tourPrev(){ haptic('tap'); if (tourStep > 0) { tourStep--; paintTourStep(); } }

// Comma list: preferred target, then fallbacks.
function tourTarget(step){
  for (const sel of String(step.sel).split(',')) {
    const n = document.querySelector(sel.trim());
    // offsetParent is null for fixed elements; measure the box instead.
    if (!n) continue;
    const r = n.getBoundingClientRect();
    if (r.width > 0 && r.height > 0 && getComputedStyle(n).display !== 'none') return n;
  }
  return null;
}
function paintTourStep(){
  const s = TOUR[tourStep];
  if (!s) return endTour();
  // Switch page, then wait for it to render.
  if (s.page && currentPage !== s.page) {
    goPage(s.page);
    return setTimeout(() => { if (_tourOn) revealTourStep(); }, 260);
  }
  revealTourStep();
}
function revealTourStep(){
  const s = TOUR[tourStep];
  const target = tourTarget(s);
  // Skip steps whose target is missing.
  if (!target) {
    if (tourStep < TOUR.length - 1) { tourStep++; return paintTourStep(); }
    return endTour();
  }
  document.querySelectorAll('.tour-lit').forEach(n => n.classList.remove('tour-lit', 'tour-lit-static'));
  target.classList.add('tour-lit');
  // z-index needs positioning; only add it to static elements.
  if (getComputedStyle(target).position === 'static') target.classList.add('tour-lit-static');

  el('tourTitle').textContent = s.title;
  el('tourText').textContent = s.text;
  el('tourCount').textContent = (tourStep + 1) + ' of ' + TOUR.length;
  el('tourDots').innerHTML = TOUR.map((_, i) => `<i class="${i === tourStep ? 'on' : ''}"></i>`).join('');
  el('tourPrev').style.visibility = tourStep === 0 ? 'hidden' : '';
  el('tourNext').textContent = tourStep === TOUR.length - 1 ? 'Done' : 'Next';

  // Scroll into view before measuring.
  const r0 = target.getBoundingClientRect();
  const needsScroll = r0.top < 80 || r0.bottom > window.innerHeight - 120;
  if (needsScroll) {
    target.scrollIntoView({ block: 'center', behavior: state.settings.reduceMotion ? 'auto' : 'smooth' });
    setTimeout(positionTour, state.settings.reduceMotion ? 20 : 380);
  }
  positionTour();
}
// `instant` skips the ease while following a scroll.
function positionTour(instant){
  const s = TOUR[tourStep];
  const target = s && tourTarget(s);
  const hole = el('tourHole'), card = el('tourCard'), ov = el('tourOverlay');
  if (!target || !hole || !card) return;

  const r = target.getBoundingClientRect();
  const pad = 8;
  // Unclamped: the hole follows the element off screen.
  const top = r.top - pad, left = r.left - pad;
  const w = r.width + pad * 2, h = r.height + pad * 2;
  hole.classList.toggle('instant', !!instant);
  hole.style.top = top + 'px';
  hole.style.left = left + 'px';
  hole.style.width = w + 'px';
  hole.style.height = h + 'px';
  // Follow the element's own corner radius, so a pill stays a pill.
  const br = getComputedStyle(target).borderRadius;
  hole.style.borderRadius = (br && br !== '0px') ? br : '12px';

  // How much of it you can actually see decides what the card does.
  const shown = Math.max(0, Math.min(top + h, window.innerHeight) - Math.max(top, 0));
  const away = shown < Math.min(h, 36) * 0.55;
  if (ov) ov.classList.toggle('tour-away', away);
  const back = el('tourShow');
  // Point the way back to a target scrolled out of view.
  if (back) back.textContent = (top + h / 2 < window.innerHeight / 2) ? 'Show me \u2191' : 'Show me \u2193';

  // Card on the side with room; centred if neither fits.
  const cardH = card.offsetHeight || 160;
  const gap = 14, edge = 10;
  const mid = Math.max(edge, (window.innerHeight - cardH) / 2);
  let ct;
  if (away) ct = mid;
  else if (window.innerHeight - (top + h) > cardH + gap + edge) ct = top + h + gap;
  else if (top > cardH + gap + edge) ct = top - cardH - gap;
  else ct = mid;
  card.style.top = Math.max(edge, Math.min(window.innerHeight - cardH - edge, ct)) + 'px';
}
// Bring a target you have scrolled away from back under the spotlight.
function tourShowMe(){
  const s = TOUR[tourStep], t = s && tourTarget(s);
  if (!t) return;
  haptic('tap');
  t.scrollIntoView({ block: 'center', behavior: state.settings.reduceMotion ? 'auto' : 'smooth' });
  setTimeout(positionTour, state.settings.reduceMotion ? 20 : 440);
}
// Both entry points, the first run and the Settings row, now open this.
function startOnboarding(){ startTour(); }
function rerunTour(){ goPage('dash'); setTimeout(startTour, 320); }
// CONFETTI
function fireConfetti(){if(state.settings.reduceMotion)return;const cv=el('confetti');cv.style.display='block';const ctx=cv.getContext('2d'),W=cv.width=innerWidth,H=cv.height=innerHeight;const cols=['#f5a623','#16d6a4','#5aa6ff','#b39bff','#ff5b75','#ff7b3a'];let p=[];for(let i=0;i<120;i++)p.push({x:W/2+(Math.random()-.5)*120,y:H*.32,vx:(Math.random()-.5)*9,vy:Math.random()*-9-3,g:.28,s:Math.random()*7+4,c:cols[i%cols.length],r:Math.random()*6,vr:(Math.random()-.5)*.4,a:1});
  let t0=performance.now();(function f(t){ctx.clearRect(0,0,W,H);let alive=false;p.forEach(o=>{o.vy+=o.g;o.x+=o.vx;o.y+=o.vy;o.r+=o.vr;o.a=Math.max(0,1-(t-t0)/2200);if(o.a>0&&o.y<H+20){alive=true;ctx.save();ctx.globalAlpha=o.a;ctx.translate(o.x,o.y);ctx.rotate(o.r);ctx.fillStyle=o.c;ctx.fillRect(-o.s/2,-o.s/2,o.s,o.s*.6);ctx.restore();}});if(alive)requestAnimationFrame(f);else cv.style.display='none';})(t0);}
// GESTURES
function noSwipe(t){return t.closest&&t.closest('.tx-summary,.cat-bar,#habitChart,.habit-scroll,.hb-trend,.pnl-filter-row,.asset-type-row,.movers-scroll,.insights,.custom-select-dropdown,.ccy-sel-dropdown,.coin-suggestions,.cs-wrap,input,canvas,.modal-overlay,.alloc-card,.stat-grid,.breakdownList,#breakdownList,.recent-card,.alloc-body,.assets-table-wrap,.assets-summary-scroll,table,th,td');}
function hasScrollableParent(el){let n=el;while(n&&n!==document.body){const s=window.getComputedStyle(n);const ox=s.overflowX;if((ox==='auto'||ox==='scroll')&&n.scrollWidth>n.clientWidth+1)return true;n=n.parentElement;}return false;}
function setupGestures(){const pagesEl=document.querySelector('.pages');let sx=0,sy=0,sw=false;
  pagesEl.addEventListener('touchstart',e=>{if(e.touches.length!==1){sw=false;return;}const t=e.touches[0];sx=t.clientX;sy=t.clientY;sw=!noSwipe(e.target)&&!hasScrollableParent(e.target);},{passive:true});
  pagesEl.addEventListener('touchmove',e=>{if(!sw)return;const t=e.touches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)&&hasScrollableParent(e.target)){sw=false;}},{passive:true});
  pagesEl.addEventListener('touchend',e=>{
    // changedTouches can be empty.
    const ch=e.changedTouches&&e.changedTouches[0];if(!ch)return;
    const dx=ch.clientX-sx,dy=ch.clientY-sy;
    if(!sw)return;if(Math.abs(dx)>72&&Math.abs(dx)>Math.abs(dy)*2.2){const i=PAGES.indexOf(currentPage);if(dx<0&&i<PAGES.length-1)goPage(PAGES[i+1],'left');else if(dx>0&&i>0)goPage(PAGES[i-1],'right');}},{passive:true});}
// LONG-PRESS / RIGHT-CLICK CONTEXT MENUS
function attachContextMenu(containerEl,itemSelector,onTrigger){
  if(!containerEl||containerEl._ctxBound)return;containerEl._ctxBound=true;
  let pressTimer=null,pressTarget=null,moved=false;
  const LONG_MS=480,MOVE_TOL=10;
  const clear=()=>{if(pressTimer){clearTimeout(pressTimer);pressTimer=null;}pressTarget=null;};
  containerEl.addEventListener('touchstart',e=>{const item=e.target.closest(itemSelector);if(!item){clear();return;}
    const t=e.touches[0];pressTarget={x:t.clientX,y:t.clientY,item};moved=false;
    pressTimer=setTimeout(()=>{if(moved||!pressTarget)return;haptic('success');onTrigger(item);clear();},LONG_MS);
  },{passive:true});
  containerEl.addEventListener('touchmove',e=>{if(!pressTarget)return;const t=e.touches[0];if(Math.abs(t.clientX-pressTarget.x)>MOVE_TOL||Math.abs(t.clientY-pressTarget.y)>MOVE_TOL){moved=true;clear();}},{passive:true});
  containerEl.addEventListener('touchend',clear,{passive:true});
  containerEl.addEventListener('touchcancel',clear,{passive:true});
  containerEl.addEventListener('contextmenu',e=>{const item=e.target.closest(itemSelector);if(!item)return;e.preventDefault();haptic('tap');onTrigger(item);});
}
let ctxAssetId=null;
function openAssetContextMenu(itemEl){const id=itemEl.dataset.assetId;if(!id)return;const a=state.assets.find(x=>x.id===id);if(!a)return;ctxAssetId=id;
  const tm={};ASSET_TYPES.forEach(t=>tm[t.id]=t);const type=tm[a.category]||ASSET_TYPES[5],img=a.coinImage||'';
  el('ctxHeader').innerHTML=`<div class="ctx-header-ico" style="background:${type.bg}">${img?`<img src="${img}" style="width:22px;height:22px;border-radius:7px" onerror="this.style.display='none'"/>`:`<div style="color:${readableInk(type.color)}">${svgIcon(a.icon||'coins',18)}</div>`}</div><div class="ctx-header-text"><div class="ctx-header-name">${esc(a.name)}</div><div class="ctx-header-sub">${esc(catLabel(a.category))}${a.qty?' · '+esc(qtyWithUnit(a)):''}</div></div>`;
  const isLiq=a.category==='liquidity';
  const rows=[];
  rows.push({icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>`,label:'View Details',cls:'',action:()=>openAssetDetail(id)});
  if(!isLiq){
    rows.push({icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,label:'Record Buy',cls:'buy',action:()=>{openAssetDetail(id);setTimeout(()=>toggleTxForm('buy'),260);}});
    rows.push({icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>`,label:'Record Sell',cls:'sell',action:()=>{openAssetDetail(id);setTimeout(()=>toggleTxForm('sell'),260);}});
  }
  rows.push({icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>`,label:'Edit',cls:'accent',action:()=>(isLiq?openEditAsset(id):openAssetEditPicker(id))});
  rows.push({icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,label:'Delete Asset',cls:'danger',action:()=>quickDeleteAsset(id)});
  el('ctxList').innerHTML=rows.map((r,i)=>`<button class="ctx-item ${r.cls}" data-ctx-i="${i}">${r.icon}<span>${r.label}</span></button>`).join('');
  el('ctxList').querySelectorAll('.ctx-item').forEach((btn,i)=>btn.addEventListener('click',()=>{const r=rows[i];closeModal('assetCtxModal',r.label!=='Delete Asset');setTimeout(r.action,r.label==='Delete Asset'?200:0);}));
  openModal('assetCtxModal');
}
async function quickDeleteAsset(id){const a=state.assets.find(x=>x.id===id);if(!a)return;const linkedGoals=state.goals.filter(g=>g.linkedAssetId===id);const warnMsg='Delete '+a.name+'? Its transaction history will be removed too.'+(linkedGoals.length?(' This will also unlink '+linkedGoals.length+' goal'+(linkedGoals.length>1?'s':'')+' ('+linkedGoals.map(g=>g.name).join(', ')+').'):'');if(!await askConfirm({title:'Delete asset?',message:warnMsg,confirmText:'Delete asset'}))return;
  const txIds=new Set(txsForAsset(a).map(t=>t.id));
  withUndo(a.name+' deleted',['assets','transactions','goals'],()=>{
    state.assets=state.assets.filter(x=>x.id!==id);state.transactions=(state.transactions||[]).filter(t=>!txIds.has(t.id));linkedGoals.forEach(g=>{g.linkedAssetId=null;g.linkedAssetIds=(g.linkedAssetIds||[]).filter(x=>x!==id);});
    trackPnLHistory();saveState();renderAll();haptic('tap');
  });}
async function quickDeleteDebt(id){const d=state.debts.find(x=>x.id===id);if(!d)return;if(!await askConfirm({title:'Delete debt?',message:'“'+d.name+'” and its full payment history will be removed.',confirmText:'Delete'}))return;
  withUndo(d.name+' deleted',['debts'],()=>{state.debts=state.debts.filter(x=>x.id!==id);});saveState();renderAll();haptic('tap');}
function scrollToDebtAction(id,inputId){openDebtDetail(id);setTimeout(()=>{const inp=el(inputId);if(!inp)return;const sheet=inp.closest('.modal-sheet');if(sheet)sheet.scrollTo({top:inp.offsetTop-20,behavior:'smooth'});inp.focus();inp.classList.add('input-error');setTimeout(()=>inp.classList.remove('input-error'),700);},280);}
let ctxDebtId=null;
function openDebtContextMenu(itemEl){const id=itemEl.dataset.debtId;if(!id)return;const d=state.debts.find(x=>x.id===id);if(!d)return;ctxDebtId=id;const isOwed=d.type==='owed';
  const acc=calcAccrued(d),totalPaid=(d.payments||[]).reduce((s,p)=>s+p.amount,0),remaining=Math.max(0,d.amount+(acc||0)-totalPaid);
  const ini=(d.name||'?').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
  el('ctxHeader').innerHTML=`<div class="ctx-header-ico" style="background:${isOwed?'rgba(0,200,150,.12)':'rgba(255,77,106,.12)'};color:${isOwed?'var(--green)':'var(--red)'};font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center">${esc(ini)}</div><div class="ctx-header-text"><div class="ctx-header-name">${esc(d.name)}</div><div class="ctx-header-sub">${fmt(remaining)} ${isOwed?'owed to you':'you owe'}</div></div>`;
  const rows=[];
  rows.push({icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>`,label:'View Details',cls:'',action:()=>openDebtDetail(id)});
  rows.push({icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,label:isOwed?'Lend More':'Borrow More',cls:'buy',action:()=>scrollToDebtAction(id,'debtAddAmt')});
  rows.push({icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>`,label:isOwed?'Record Payment Received':'Record Payment Made',cls:'sell',action:()=>scrollToDebtAction(id,'debtPayAmt')});
  rows.push({icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>`,label:'Edit Debt',cls:'accent',action:()=>openDebtEdit(id)});
  rows.push({icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,label:'Delete Debt',cls:'danger',action:()=>quickDeleteDebt(id)});
  el('ctxList').innerHTML=rows.map((r,i)=>`<button class="ctx-item ${r.cls}" data-ctx-i="${i}">${r.icon}<span>${r.label}</span></button>`).join('');
  el('ctxList').querySelectorAll('.ctx-item').forEach((btn,i)=>btn.addEventListener('click',()=>{const r=rows[i];closeModal('assetCtxModal',r.label!=='Delete Debt');setTimeout(r.action,r.label==='Delete Debt'?200:0);}));
  openModal('assetCtxModal');
}
function setupModalDrag(){document.querySelectorAll('.modal-sheet').forEach(sheet=>{const handle=sheet.querySelector('.modal-handle[data-drag]');if(!handle)return;const hdr=sheet.querySelector('.modal-hdr');const overlay=sheet.parentElement;let sy=0,cur=0,drag=false,vy=0,lastT=0,lastY=0;
  const start=e=>{sy=e.touches[0].clientY;lastY=sy;lastT=Date.now();drag=true;vy=0;sheet.style.transition='none';};
  const move=e=>{if(!drag)return;const y=e.touches[0].clientY;cur=Math.max(0,y-sy);const now=Date.now();const dt=now-lastT;if(dt>0){vy=(y-lastY)/dt;lastY=y;lastT=now;}sheet.style.transform='translateY('+cur+'px)';};
  const end=()=>{if(!drag)return;drag=false;sheet.style.transition='';if(cur>90||vy>0.6){sheet.style.transform='translateY(100%)';setTimeout(()=>{sheet.style.transform='';closeModal(overlay.id);},220);}else{sheet.style.transform='';}cur=0;};
  handle.addEventListener('touchstart',start,{passive:true});
  handle.addEventListener('touchmove',move,{passive:true});
  handle.addEventListener('touchend',end,{passive:true});
  if(hdr){
    hdr.addEventListener('touchstart',e=>{if(e.target.closest('button,input,select,textarea,a'))return;start(e);},{passive:true});
    hdr.addEventListener('touchmove',move,{passive:true});
    hdr.addEventListener('touchend',end,{passive:true});
  }
});}
// HAPTICS
// CONFIRM DIALOG: async replacement for window.confirm(); resolves to a boolean.
let _confirmResolve=null,_confirmPrevFocus=null;

function askConfirm(opts){
  const o=typeof opts==='string'?{message:opts}:(opts||{});
  const title=o.title||'Are you sure?';
  const message=o.message||'';
  const confirmText=o.confirmText||'Confirm';
  const cancelText=o.cancelText||'Cancel';
  const danger=o.danger!==false;

  return new Promise(resolve=>{
    let ov=el('confirmDialog');
    if(!ov){
      ov=document.createElement('div');
      ov.id='confirmDialog';
      ov.className='confirm-overlay';
      ov.setAttribute('role','dialog');
      ov.setAttribute('aria-modal','true');
      ov.setAttribute('aria-labelledby','confirmDialogTitle');
      ov.innerHTML=
        '<div class="confirm-box">'+
          '<div class="confirm-ico" id="confirmDialogIco"></div>'+
          '<div class="confirm-title" id="confirmDialogTitle"></div>'+
          '<div class="confirm-msg" id="confirmDialogMsg"></div>'+
          '<div class="confirm-actions">'+
            '<button type="button" class="confirm-btn ghost" id="confirmDialogNo"></button>'+
            '<button type="button" class="confirm-btn danger" id="confirmDialogYes"></button>'+
          '</div>'+
        '</div>';
      document.body.appendChild(ov);
      el('confirmDialogNo').addEventListener('click',()=>closeConfirm(false));
      el('confirmDialogYes').addEventListener('click',()=>closeConfirm(true));
      ov.addEventListener('click',e=>{if(e.target===ov)closeConfirm(false);});
      ov.addEventListener('keydown',e=>{
        if(e.key==='Escape'){e.preventDefault();closeConfirm(false);}
        if(e.key==='Tab'){
          // Keep focus inside the dialog while it's open.
          const f=[el('confirmDialogNo'),el('confirmDialogYes')];
          const i=f.indexOf(document.activeElement);
          e.preventDefault();
          f[(i+(e.shiftKey?-1:1)+f.length)%f.length].focus();
        }
      });
    }
    el('confirmDialogTitle').textContent=title;
    el('confirmDialogMsg').textContent=message;
    el('confirmDialogMsg').style.display=message?'block':'none';
    el('confirmDialogNo').textContent=cancelText;
    el('confirmDialogYes').textContent=confirmText;
    el('confirmDialogYes').className='confirm-btn '+(danger?'danger':'primary');
    el('confirmDialogIco').innerHTML=svgIcon(danger?'alert':'shield',22);
    el('confirmDialogIco').className='confirm-ico'+(danger?' danger':'');

    _confirmPrevFocus=document.activeElement;
    _confirmResolve=resolve;
    ov.classList.add('open');
    document.body.classList.add('modal-open');
    setTimeout(()=>{const b=el('confirmDialogNo');if(b)b.focus();},40);
    haptic('tap');
  });
}
function closeConfirm(result){
  const ov=el('confirmDialog');
  if(ov){ov.classList.remove('open');}
  if(!el('confirmDialog')||!document.querySelector('.modal.open,.confirm-overlay.open'))
    document.body.classList.remove('modal-open');
  try{if(_confirmPrevFocus&&_confirmPrevFocus.focus)_confirmPrevFocus.focus();}catch(e){}
  _confirmPrevFocus=null;
  const r=_confirmResolve;_confirmResolve=null;
  if(r)r(!!result);
}

// Levels scale buzz length, with an 8ms floor for coarse motors.
const HAPTIC_LEVELS={light:0.7,medium:1.5,strong:3.2};
const HAPTIC_BASE={tap:[9],success:[0,18,40,18],error:[0,40,30,40]};
function hapticLevel(){return HAPTIC_LEVELS[state.settings.hapticStrength]?state.settings.hapticStrength:'medium';}
function hapticPattern(type){
  const m=HAPTIC_LEVELS[hapticLevel()];
  const base=HAPTIC_BASE[type]||HAPTIC_BASE.tap;
  // Buzzes are the odd slots; pauses keep the rhythm.
  return base.map((v,i)=>(base.length===1||i%2===1)?Math.max(8,Math.round(v*m)):v);
}
function haptic(type){
  if(!state.settings.haptics||!navigator.vibrate)return;
  const p=hapticPattern(type);
  try{navigator.vibrate(p.length===1?p[0]:p);}catch(e){}
}
// Picking a level plays it, because the only way to judge one is to feel it.
function setHapticStrength(v){
  if(!HAPTIC_LEVELS[v])return;
  state.settings.hapticStrength=v;saveState();
  if(state.settings.haptics&&navigator.vibrate){try{navigator.vibrate(hapticPattern('success'));}catch(e){}}
  renderHapticSeg();
  announce('Vibration strength '+v);
}
function renderHapticSeg(){
  const seg=el('hapticSeg'),row=el('hapticStrengthRow');
  // Nothing to set if the phone has no motor, or you have switched it off.
  const can=!!navigator.vibrate;
  if(row)row.style.display=(state.settings.haptics&&can)?'':'none';
  if(!seg)return;
  const cur=hapticLevel();
  seg.innerHTML=[['light','Light'],['medium','Medium'],['strong','Strong']]
    .map(([v,l])=>`<button class="seg-3-btn${cur===v?' on':''}" aria-pressed="${cur===v}" onclick="event.stopPropagation();setHapticStrength('${v}')">${l}</button>`).join('');
}
// HELPERS
function el(id){return document.getElementById(id);}
// Mirror each switch's state onto its row button for screen readers.
function syncSwitchRows(root){
  (root||document).querySelectorAll('.toggle[role="switch"]').forEach(t=>{
    const row=t.closest('button,[role="button"]');
    if(!row||row===t)return;
    row.setAttribute('role','switch');
    row.setAttribute('aria-checked',t.getAttribute('aria-checked')||'false');
    t.setAttribute('aria-hidden','true');
    t.removeAttribute('role');
  });
}
// Watch the class every toggle updates, including later ones.
function watchSwitchRows(){
  syncSwitchRows();
  if(!window.MutationObserver)return;
  new MutationObserver(muts=>{
    let touched=false;
    muts.forEach(m=>{
      const t=m.target;
      if(t&&t.classList&&t.classList.contains('toggle')){
        const row=t.closest('button,[role="button"]');
        if(row&&row!==t){row.setAttribute('role','switch');
          row.setAttribute('aria-checked',t.classList.contains('on')?'true':'false');
          t.setAttribute('aria-hidden','true');t.removeAttribute('role');}
      } else if(m.type==='childList')touched=true;
    });
    if(touched)syncSwitchRows();
  }).observe(document.body,{subtree:true,childList:true,attributes:true,
    attributeFilter:['class','aria-checked']});
}
function plural(n,one,many){return n+' '+(Math.abs(n)===1?one:(many||one+'s'));}
function initTableScrollFade(wrapId,fadeId){const wrap=el(wrapId),fade=el(fadeId);if(!wrap||!fade)return;const update=()=>{const hasOverflow=wrap.scrollWidth>wrap.clientWidth+1;const atEnd=wrap.scrollLeft+wrap.clientWidth>=wrap.scrollWidth-1;fade.classList.toggle('show',hasOverflow&&!atEnd);};update();wrap.addEventListener('scroll',update,{passive:true});if(window.ResizeObserver){new ResizeObserver(update).observe(wrap);}else{window.addEventListener('resize',update);}}
function uid(){return Math.random().toString(36).slice(2)+Date.now().toString(36);}
function esc(s){return String(s==null?'':s).replace(/[&<>"'`=\/]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;','=':'&#61;','/':'&#47;'}[c]));}
// Escape for a JS string inside an HTML attribute; esc() alone is decoded back by the browser first.
function jsAttr(s){return String(s==null?'':s).replace(/[\\'"<>&`\r\n\u2028\u2029]/g,c=>({'\\':'\\\\',"'":'\\u0027','"':'\\u0022','<':'\\u003C','>':'\\u003E','&':'\\u0026','`':'\\u0060','\r':'','\n':'','\u2028':'','\u2029':''}[c]));}
function hexA(hex,a){hex=hex.trim();if(hex.startsWith('rgb')){return hex.replace(/rgb\(([^)]+)\)/,(m,p)=>`rgba(${p},${a})`);}let h=hex.replace('#','');if(h.length===3)h=h.split('').map(x=>x+x).join('');const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);return`rgba(${r},${g},${b},${a})`;}
function catLabel(c){return{crypto:'Crypto',stock:'Stock',commodity:'Commodity',liquidity:'Liquidity',property:'Property',other:'Other'}[c]||c;}
function clip(t,n){t=String(t||'').trim();return t.length>n?t.slice(0,n-1).trim()+'\u2026':t;}
function stripParens(s){return(s||'').replace(/\s*\([^)]*\)\s*$/,'').trim();}
function svgIcon(name,size=16){return(ICONS[name]||ICONS.box).replace('<svg ',`<svg width="${size}" height="${size}" `);}
function formatDate(d){if(!d)return'';try{return new Date(d).toLocaleDateString('en',{month:'short',day:'numeric',year:'numeric'});}catch(e){return d;}}
function toast(msg,type=''){const t=el('toast');if(t){t.classList.remove('with-undo');clearTimeout(t._hideTimer);}const ic=type==='success'?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>':type==='error'?'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9.25"/><line x1="12" y1="7.25" x2="12" y2="13"/><circle cx="12" cy="16.9" r="1.15" fill="currentColor" stroke="none"/></svg>':'';t.innerHTML=ic+'<span>'+esc(msg)+'</span>';t.className='toast '+(type||'');t.classList.add('show');announce(msg);clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2600);}
function announce(msg){const s=el('srAnnounce');if(s)s.textContent=msg;}

// UNDO (stacked, supports multiple pending undos at once)
const UNDO_WINDOW_MS=8000;
let _undoStack=[]; // [{ id, diff:{key:[items this action changed]}, keys, timer }]
let _undoSeq=0;

// Take a deep copy of just the lists an action touches, before it runs.
function snapshotForUndo(keys){
  const snap={};
  keys.forEach(k=>{
    try{snap[k]=JSON.parse(JSON.stringify(state[k]||[]));}
    catch(e){snap[k]=(state[k]||[]).slice();}
  });
  return snap;
}

// Destructive action with undo. keys = state lists it may change. Each call stores a
// diff of what it changed, so undoing one cannot resurrect another's deletes.
function withUndo(label,keys,action){
  const before=snapshotForUndo(keys);
  action();
  const diff={};
  keys.forEach(k=>{
    const beforeItems=before[k]||[];
    const afterItems=state[k]||[];
    const afterMap=new Map(afterItems.map(x=>[x.id,x]));
    diff[k]=beforeItems.filter(item=>{
      const nowItem=afterMap.get(item.id);
      return !nowItem || JSON.stringify(nowItem)!==JSON.stringify(item);
    });
  });
  const id=++_undoSeq;
  const entry={id,diff,keys,timer:null};
  entry.timer=setTimeout(()=>{ removeUndoEntry(id); },UNDO_WINDOW_MS);
  _undoStack.push(entry);
  toastWithUndo(id,label);
}

function removeUndoEntry(id){
  _undoStack=_undoStack.filter(e=>{
    if(e.id===id){clearTimeout(e.timer);return false;}
    return true;
  });
}

function performUndo(id){
  const entry=_undoStack.find(e=>e.id===id);
  if(!entry)return;
  // Custom restore for data outside the diffed lists (e.g. habits).
  if(typeof entry.restore==='function'){
    entry.restore();
    removeUndoEntry(id);
    haptic('success');
    toast('Restored','success');
    announce('Change undone');
    return;
  }
  const {diff,keys}=entry;
  keys.forEach(k=>{
    const itemsToRestore=diff[k];
    if(!itemsToRestore||!itemsToRestore.length)return;
    const current=state[k]||[];
    const restored=current.slice();
    itemsToRestore.forEach(item=>{
      const idx=restored.findIndex(x=>x.id===item.id);
      if(idx===-1){ restored.push(item); } // was removed by this action -> bring back
      else { restored[idx]=item; }         // was modified by this action -> restore its prior fields
    });
    state[k]=restored;
  });
  removeUndoEntry(id);
  saveState();
  // Recompute derived state that the delete may have changed.
  try{completedGoals=new Set();(state.goals||[]).forEach(g=>{if((g.target>0)&&(g.saved||0)>=g.target)completedGoals.add(g.id);});}catch(e){}
  renderAll();
  try{renderSettings();}catch(e){}
  haptic('success');
  toast('Restored','success');
  announce('Change undone');
}

// One toast per undo id; plain toast if the stack is missing.
function toastWithUndo(id,msg){
  const stack=el('undoToastStack');
  if(!stack){toast(msg);return;}
  const t=document.createElement('div');
  t.className='undo-toast';
  t.dataset.undoId=String(id);
  t.setAttribute('role','status');

  const span=document.createElement('span');
  span.className='toast-msg';
  span.textContent=msg;

  const btn=document.createElement('button');
  btn.type='button';
  btn.className='toast-undo';
  btn.textContent='Undo';
  btn.setAttribute('aria-label','Undo: '+msg);
  btn.addEventListener('click',()=>{
    performUndo(id);
    t.classList.remove('show');
    setTimeout(()=>t.remove(),220);
  });

  const barWrap=document.createElement('div');
  barWrap.className='toast-undo-barwrap';
  const bar=document.createElement('div');
  bar.className='toast-undo-bar';
  bar.style.setProperty('--undo-ms',UNDO_WINDOW_MS+'ms');
  barWrap.appendChild(bar);

  t.appendChild(span);
  t.appendChild(btn);
  t.appendChild(barWrap);
  stack.appendChild(t);

  requestAnimationFrame(()=>t.classList.add('show'));

  setTimeout(()=>{
    t.classList.remove('show');
    setTimeout(()=>t.remove(),220);
  },UNDO_WINDOW_MS);

  announce(msg+'. Undo available.');
}
function bindCatPills(){document.querySelectorAll('.cat-pill').forEach(p=>p.addEventListener('click',()=>{activeCat=p.dataset.cat;state.settings.activeCat=activeCat;saveState();haptic('tap');document.querySelectorAll('.cat-pill').forEach(x=>x.classList.remove('active'));p.classList.add('active');renderAssets();}));}
function syncAssetDebtUIFromSettings(){
  const sl=el('assetSortLbl');if(sl)sl.textContent=SORT_LBL[assetSort]||'Value';
  const vc=el('viewCardsBtn'),vt=el('viewTableBtn');if(vc&&vt){vc.classList.toggle('on',assetView==='cards');vt.classList.toggle('on',assetView==='table');}
  document.querySelectorAll('.cat-pill').forEach(p=>p.classList.toggle('active',p.dataset.cat===activeCat));
  const dsl=el('debtSortLbl');if(dsl)dsl.textContent=DEBT_SORT_LBL[debtSort]||'Amount';
  const dOwed=el('dTabOwed'),dIowe=el('dTabIOwe');if(dOwed&&dIowe){dOwed.className='d-tab'+(activeDebtTab==='owed'?' active grn':'');dIowe.className='d-tab'+(activeDebtTab==='iowe'?' active rd':'');}
  const gsl=el('goalSortLbl');if(gsl)gsl.textContent=GOAL_SORT_LBL[goalSort]||'Progress';
}
// KEYBOARD
function setupKeyboard(){
  document.addEventListener('keydown',e=>{
    // While the tour is up it owns the keyboard: Escape leaves, arrows step.
    if(_tourOn){
      if(e.key==='Escape'){endTour();e.preventDefault();return;}
      if(e.key==='ArrowRight'||e.key==='Enter'){tourNext();e.preventDefault();return;}
      if(e.key==='ArrowLeft'){tourPrev();e.preventDefault();return;}
      return;
    }
    const paletteOpen=el('cmdk').classList.contains('open');
    if((e.key==='k'||e.key==='K')&&(e.metaKey||e.ctrlKey)){e.preventDefault();paletteOpen?closePalette():openPalette();return;}
    if((e.key==='f'||e.key==='F')&&(e.metaKey||e.ctrlKey)){e.preventDefault();const gs=el('globalSearchModal');if(gs&&gs.classList.contains('open')){closeModal('globalSearchModal');}else{openGlobalSearch();}return;}
    if(paletteOpen){if(e.key==='Escape'){e.preventDefault();closePalette();}else if(e.key==='ArrowDown'){e.preventDefault();paletteMove(1);}else if(e.key==='ArrowUp'){e.preventDefault();paletteMove(-1);}else if(e.key==='Enter'){e.preventDefault();paletteActivate();}return;}
    const top=modalStack[modalStack.length-1];
    if(e.key==='Escape'){if(el('shortcutsHelp')&&el('shortcutsHelp').classList.contains('open')){toggleShortcutsHelp();return;}if(el('authModal')&&el('authModal').classList.contains('open')&&!authRequired){closeAuthModal();return;}if(el('onbOverlay')&&el('onbOverlay').classList.contains('open')&&typeof finishOnboard==='function'){finishOnboard();return;}if(top){closeModal(top);return;}document.querySelectorAll('.custom-select-trigger.open').forEach(t=>t.classList.remove('open'));document.querySelectorAll('.custom-select-dropdown.open').forEach(d=>d.classList.remove('open'));document.querySelectorAll('.ccy-sel-trigger.open').forEach(t=>t.classList.remove('open'));document.querySelectorAll('.ccy-sel-dropdown.open').forEach(d=>d.classList.remove('open'));return;}
    if((e.key==='Enter'||e.key===' ')&&document.activeElement){const a=document.activeElement;if(a.getAttribute&&(a.getAttribute('role')==='button'||a.getAttribute('role')==='switch')&&a.tagName!=='BUTTON'&&a.tagName!=='INPUT'&&a.tagName!=='A'){e.preventDefault();a.click();}}
    // Arrow keys page the habit calendar.
    if(top==='habitCalModal'&&(e.key==='ArrowLeft'||e.key==='ArrowRight')&&e.target.tagName!=='INPUT'){
      e.preventDefault();hcalSwap(e.key==='ArrowLeft'?-1:1);return;
    }
    if(top||(el('onbOverlay')&&el('onbOverlay').classList.contains('open')))return;
    if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
    if(e.key==='/'){e.preventDefault();if(currentPage==='assets'||currentPage==='debts'){const s=el(currentPage==='assets'?'assetSearch':'debtSearch');if(s){s.focus();s.select&&s.select();}}else{goPage('assets');let tries=0;const tryFocus=()=>{const s=el('assetSearch');if(s&&el('page-assets').classList.contains('active')){s.focus();}else if(tries++<20)requestAnimationFrame(tryFocus);};requestAnimationFrame(tryFocus);}}
    else if(e.key==='?'){e.preventDefault();toggleShortcutsHelp();}
    else if(e.key.toLowerCase()==='r'&&!e.shiftKey)refreshPrices();
    else if(e.key.toLowerCase()==='t')toggleTheme();
    else if(e.key.toLowerCase()==='n'){e.preventDefault();const fn={dash:openAddAsset,assets:openAddAsset,debts:openAddDebt,plan:openAddGoal,analytics:openAddAsset,settings:null}[currentPage];if(fn)fn();}
    else if(['1','2','3','4','5','6'].includes(e.key))goPage(PAGES[+e.key-1]);
  });
  // Focus trap over visible, enabled controls only.
  const focusablesIn=m=>[...m.querySelectorAll('input,button,select,textarea,a[href],[tabindex]:not([tabindex="-1"])')]
    .filter(n=>!n.disabled&&n.offsetParent!==null&&!n.closest('[hidden]'));
  document.addEventListener('keydown',e=>{
    if(e.key!=='Tab')return;
    const top=modalStack[modalStack.length-1];if(!top)return;
    const m=el(top);if(!m)return;
    const f=focusablesIn(m);if(!f.length)return;
    const first=f[0],last=f[f.length-1];
    // Focus on the sheet itself: first Tab goes to the first control.
    if(!m.contains(document.activeElement)||document.activeElement===m||
       !f.includes(document.activeElement)){
      e.preventDefault();(e.shiftKey?last:first).focus();return;
    }
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  });
}
function toggleShortcutsHelp(){const ov=el('shortcutsHelp');if(!ov)return;const open=ov.classList.toggle('open');ov.setAttribute('aria-hidden',open?'false':'true');syncBodyScrollLock();if(open){pushModalHistory();haptic('tap');}else{popModalHistoryIfNeeded();}}
// INSIGHTS
// Overdue and due items on the dashboard; the card shows only when there are some.
function needsAttentionItems(){
  const today=todayStr();
  const out=[];
  const daysLate=d=>Math.max(0,Math.round((new Date(today+'T12:00:00')-new Date(String(d).slice(0,10)+'T12:00:00'))/864e5));
  (state.recurs||[]).forEach(r=>{
    if(!r||r.active===false)return;
    const due=String(r.nextDue||r.start||'').slice(0,10);
    if(!due||due>today)return;
    const bill=recurKind(r)==='bill';
    const late=daysLate(due);
    out.push({
      sort:[0,-late],
      ico:bill?(spendCat(r.spendCat).icon||'zap'):'coins',
      color:bill?(spendCat(r.spendCat).color||'#888'):cssVar('--accent'),
      name:r.name,
      sub:(bill?'Bill':'Investment')+' · '+(late?plural(late,'day')+' late':'due today'),
      amt:fmt(r.amount), amtColor:bill?'var(--red)':'var(--text)',
      act:"runRecurNow('"+jsAttr(r.id)+"')", actLbl:'Log',
      go:"goPage('plan')",
    });
  });
  (state.debts||[]).forEach(d=>{
    if(!d||!d.due)return;
    const due=String(d.due).slice(0,10);
    if(due>today)return;
    if(debtRemaining(d)<=0)return;
    const late=daysLate(due);
    out.push({
      sort:[1,-late],
      ico:'wallet', color:d.type==='owed'?cssVar('--green'):cssVar('--red'),
      name:d.name||'Debt',
      sub:(d.type==='owed'?'Owed to you':'You owe')+' · '+(late?plural(late,'day')+' overdue':'due today'),
      amt:fmt(debtRemaining(d)), amtColor:d.type==='owed'?'var(--green)':'var(--red)',
      go:"goPage('debts');setTimeout(()=>openDebtDetail('"+jsAttr(d.id)+"'),260)",
    });
  });
  (state.goals||[]).forEach(g=>{
    if(!g||!g.date)return;
    const due=String(g.date).slice(0,10);
    if(due>today)return;
    if(num(g.target)<=0||num(g.saved)>=num(g.target))return;
    out.push({
      sort:[2,-daysLate(due)],
      ico:'target', color:cssVar('--blue')||'#4a9eff',
      name:g.name||'Goal',
      sub:'Target date passed · '+fmt(Math.max(0,num(g.target)-num(g.saved)))+' short',
      amt:'', amtColor:'var(--text)',
      go:"goPage('plan')",
    });
  });
  out.sort((a,b)=>a.sort[0]-b.sort[0]||a.sort[1]-b.sort[1]);
  return out;
}
let needsExpanded=false;
function toggleNeedsMore(){needsExpanded=!needsExpanded;renderNeedsAttention();haptic('tap');}
function freqShort(f){
  return {day:'d',daily:'d',week:'wk',weekly:'wk',month:'mo',monthly:'mo',
    year:'yr',yearly:'yr'}[String(f||'').toLowerCase()]||f||'mo';
}
function renderNeedsAttention(){
  const card=el('needsCard'), list=el('needsList'), title=el('needsTitle');
  if(!card||!list)return;
  const items=needsAttentionItems();
  // The insights strip needs to know whether this card is really shown.
  const pg=el('page-dash');
  if(!items.length){card.style.display='none';list.innerHTML='';needsExpanded=false;
    if(pg)pg.classList.remove('dash-has-needs');return;}
  card.style.display='';
  if(pg)pg.classList.add('dash-has-needs');
  if(title)title.textContent=items.length===1?'Needs you':plural(items.length,'thing')+' need you';
  // "and 2 more" was a dead label on a card whose whole job is to be acted on.
  const show=needsExpanded?items:items.slice(0,3);
  // role=button div: it contains a real button.
  list.innerHTML=show.map(it=>
    `<div class="needs-row" role="button" tabindex="0" onclick="${it.go}" onkeydown="if(event.key===' '||event.key==='Enter'){event.preventDefault();this.click();}">`
    +`<span class="needs-ico" style="background:${esc(it.color)}22;color:${esc(readableInk(it.color))}">${svgIcon(it.ico,14)}</span>`
    +`<span class="needs-txt"><span class="needs-name">${esc(it.name)}</span>`
    +`<span class="needs-sub">${esc(it.sub)}</span></span>`
    +(it.amt?`<span class="needs-amt" style="color:${esc(it.amtColor)}">${it.amt}</span>`:'')
    +(it.act?`<button class="bill-run" onclick="event.stopPropagation();${it.act}">${esc(it.actLbl)}</button>`:'')
    +`</div>`).join('')
    +(items.length>3
      ? `<button class="needs-more" onclick="toggleNeedsMore()">`
        +(needsExpanded?'Show fewer':`and ${items.length-3} more`)+`</button>`
      : '');
}
function renderInsights(ta,to,ti,nw,totalPnL,pct,best,worst){const box=el('insights');if(!box)return;const chips=[];const C=(ico,col,lbl,val)=>chips.push(`<div class="chip"><div class="chip-ico" style="background:${col}1f;color:${col}">${svgIcon(ico,14)}</div><div class="chip-txt"><span class="chip-lbl">${lbl}</span><span class="chip-val">${val}</span></div></div>`);
  const acc=cssVar('--accent'),grn=cssVar('--green'),red=cssVar('--red'),blu=cssVar('--blue'),pur=cssVar('--purple');
  const yd=nwYesterday();if(yd!==null){const d=nw-yd,p=d>=0;C('chartline',p?grn:red,'Today',(p?'+':'')+fmt(d));}
  if(state.assets.length){C('trending',totalPnL>=0?grn:red,'Total P&L',
    (totalPnL>=0?'+':'')+fmt(totalPnL)+'<span class="chip-sub">'+(totalPnL>=0?'+':'')+pct.toFixed(1)+'%</span>');}
  // This month's spending and budget status on the dashboard.
  {const sm=monthSummary(currentSpendMonth()),bs=budgetStatus(currentSpendMonth());
   if(sm.count)C('banknote',bs&&bs.statusId==='over'?red:acc,'Spent this month',
     fmt(sm.spent)+(bs?' \u00b7 '+bs.statusLabel:''));}
  // Colour by sign, not by label.
  if(best){C('rocket',best.pct>=0?grn:red,'Top performer',
    clip(stripParens(best.name),12)+' <span class="chip-sub">'+(best.pct>=0?'+':'')+best.pct.toFixed(1)+'%</span>');}
  // Only when different from the best.
  if(worst&&(!best||worst.name!==best.name))C('trending',worst.pct>=0?grn:red,'Worst performer',
    clip(stripParens(worst.name),12)+' <span class="chip-sub">'+(worst.pct>=0?'+':'')+worst.pct.toFixed(1)+'%</span>');
  // biggest holding
  let big=null;state.assets.forEach(a=>{const v=getAssetCurrentValue(a);if(!big||v>big.v)big={n:a.name,v};});if(big&&ta>0){C('diamond',acc,'Biggest holding',clip(stripParens(big.n),12)+'<span class="chip-sub">'+(big.v/ta*100).toFixed(0)+'%</span>');}
  // diversification
  const cats=new Set(state.assets.map(a=>a.category)).size;if(state.assets.length){C('shield',pur,'Diversification',cats+' asset type'+(cats!==1?'s':''));}
  // top goal progress
  if(state.goals.length){const g=state.goals.slice().sort((x,y)=>((y.saved||0)/(y.target||1))-((x.saved||0)/(x.target||1)))[0];const gp=g.target>0?Math.min(100,(g.saved||0)/g.target*100):0;C('target',blu,'Goal: '+clip(g.name,11),gp.toFixed(0)+'% funded');}
  // net debt
  if(to||ti){const net=to-ti;C('coins',net>=0?grn:red,net>=0?'Net receivable':'Net payable',fmt(Math.abs(net)));}
  // FD maturity reminder, soonest maturing FD within 14 days (or already matured)
  const today0=new Date();today0.setHours(0,0,0,0);
  let soonFd=null;state.assets.forEach(a=>{if(a.category!=='liquidity'||!a.maturity)return;const md=new Date(a.maturity);const days=Math.round((md-today0)/86400000);if(days<=14&&(!soonFd||days<soonFd.days))soonFd={name:a.name,days};});
  if(soonFd){const lbl=soonFd.days<0?'Matured':(soonFd.days===0?'Matures today':'Matures in '+soonFd.days+'d');C('clock',soonFd.days<=0?red:acc,clip(soonFd.name,12),lbl);}
  // Debt due reminder, soonest due debt within 7 days (or overdue)
  let soonDebt=null;state.debts.forEach(d=>{if(!d.due)return;const dd=parseDay(d.due);const days=Math.round((dd-today0)/86400000);if(days<=7&&(!soonDebt||days<soonDebt.days))soonDebt={name:d.name,days,owed:d.type==='owed'};});
  if(soonDebt){const lbl=soonDebt.days<0?'Overdue':(soonDebt.days===0?'Due today':'Due in '+soonDebt.days+'d');C('alert',soonDebt.days<0?red:acc,(soonDebt.owed?'Collect: ':'Pay: ')+clip(soonDebt.name,11),lbl);}
  if(!chips.length){box.style.display='none';return;}box.style.display='flex';box.innerHTML=chips.map((c,i)=>c.replace('class="chip"',`class="chip" style="animation-delay:${_animateEnter?i*45:0}ms"`)).join('');}
// RIPPLE
function setupRipple(){document.addEventListener('pointerdown',e=>{const t=e.target.closest('.add-btn,.submit-btn,.nav-item,.empty-cta,.cat-pill,.pnl-pill,.act-pill,.preset-btn,.hdr-btn');if(!t||state.settings.reduceMotion)return;const r=t.getBoundingClientRect(),d=Math.max(r.width,r.height),x=e.clientX-r.left-d/2,y=e.clientY-r.top-d/2;t.classList.add('rippling');const s=document.createElement('span');s.className='ripple';s.style.width=s.style.height=d+'px';s.style.left=x+'px';s.style.top=y+'px';t.appendChild(s);setTimeout(()=>s.remove(),560);},{passive:true});}
// FAB removed
function openPalette(){const c=el('cmdk');c.dataset.openedAt=String(Date.now());c.classList.add('open');c.setAttribute('aria-hidden','false');paletteSel=0;el('cmdkInput').value='';renderPalette();syncBodyScrollLock();pushModalHistory();setTimeout(()=>el('cmdkInput').focus(),80);haptic('tap');}
function closePalette(){const c=el('cmdk');c.classList.remove('open');c.setAttribute('aria-hidden','true');syncBodyScrollLock();popModalHistoryIfNeeded();}
function paletteData(){const q=el('cmdkInput').value.trim().toLowerCase(),items=[];
  const acts=[{n:'Ask Folio',ico:'zap',fn:()=>openAI()},{n:'Search Everything',ico:'search',fn:()=>openGlobalSearch()},{n:'Add Expense',ico:'banknote',fn:()=>{goPage('spend');setTimeout(()=>openAddSpend('expense'),260);}},{n:'Add Income',ico:'banknote',fn:()=>{goPage('spend');setTimeout(()=>openAddSpend('income'),260);}},{n:'Set Monthly Budget',ico:'target',fn:()=>{goPage('spend');setTimeout(openBudgetModal,260);}},{n:'Add Asset',ico:'wallet',fn:()=>openAddAsset()},{n:'Add Debt',ico:'coins',fn:()=>openAddDebt()},{n:'Add Goal',ico:'target',fn:()=>{goPage('plan');setTimeout(openAddGoal,260);}},{n:'Add Recurring Investment',ico:'coins',fn:()=>{goPage('plan');setTimeout(openAddRecur,260);}},{n:'View All Transactions',ico:'clock',fn:()=>openLedger()},{n:'Refresh Everything',ico:'zap',fn:()=>refreshAll()},{n:'Check Due Recurring Investments',ico:'coins',fn:()=>runDueRecurs(false)},{n:'Toggle Theme',ico:'sun',fn:()=>toggleTheme()},{n:state.settings.hideBalance?'Show Balances':'Hide Balances',ico:'shield',fn:()=>quickToggleBalance()},{n:'Export Data (JSON)',ico:'box',fn:()=>exportData()},{n:'Go to Dashboard',ico:'home',fn:()=>goPage('dash')},{n:'Go to Spendings',ico:'banknote',fn:()=>goPage('spend')},{n:'Go to Settings',ico:'briefcase',fn:()=>goPage('settings')}];
  state.assets.forEach(a=>{items.push({grp:'Assets',n:a.name,meta:fmt(getAssetCurrentValue(a)),ico:a.icon||'coins',fn:()=>{goPage('assets');setTimeout(()=>openAssetDetail(a.id),250);}});
    if(a.category!=='liquidity'){items.push({grp:'Quick Actions',n:'Record Buy, '+a.name,ico:'trending',fn:()=>{goPage('assets');setTimeout(()=>{openAssetDetail(a.id);setTimeout(()=>toggleTxForm('buy'),260);},250);}});
      items.push({grp:'Quick Actions',n:'Record Sell, '+a.name,ico:'trending',fn:()=>{goPage('assets');setTimeout(()=>{openAssetDetail(a.id);setTimeout(()=>toggleTxForm('sell'),260);},250);}});}});
  state.debts.forEach(d=>items.push({grp:'Debts',n:d.name,meta:fmt(d.amount),ico:'coins',fn:()=>{goPage('debts');setTimeout(()=>openDebtEdit(d.id),250);}}));
  state.goals.forEach(g=>items.push({grp:'Goals',n:g.name,meta:(g.target>0?Math.min(100,(g.saved||0)/g.target*100).toFixed(0):0)+'%',ico:g.icon||'target',fn:()=>{goPage('plan');setTimeout(()=>openGoalDetail(g.id),250);}}));
  acts.forEach(a=>items.push({grp:'Actions',n:a.n,ico:a.ico,fn:a.fn}));
  return q?items.filter(i=>i.n.toLowerCase().includes(q)):items.filter(i=>i.grp!=='Quick Actions');}
function renderPalette(){const items=paletteData(),res=el('cmdkResults');if(paletteSel>=items.length)paletteSel=Math.max(0,items.length-1);if(!items.length){res.innerHTML='<div class="cmdk-empty">No matches found</div>';return;}let html='',lastGrp='';items.forEach((it,i)=>{if(it.grp&&it.grp!==lastGrp){html+=`<div class="cmdk-sec">${it.grp}</div>`;lastGrp=it.grp;}html+=`<div class="cmdk-item ${i===paletteSel?'sel':''}" data-i="${i}" onclick="paletteActivate(${i})"><div class="cmdk-item-ico">${svgIcon(it.ico||'box',15)}</div><div class="cmdk-item-name">${esc(it.n)}</div>${it.meta?`<div class="cmdk-item-meta">${it.meta}</div>`:''}</div>`;});res.innerHTML=html;const sel=res.querySelector('.cmdk-item.sel');if(sel)sel.scrollIntoView({block:'nearest'});}
function paletteMove(d){const items=paletteData();if(!items.length)return;paletteSel=(paletteSel+d+items.length)%items.length;renderPalette();}
function paletteActivate(i){const items=paletteData();const it=items[i!=null?i:paletteSel];if(!it)return;closePalette();haptic('tap');setTimeout(it.fn,60);}
// GOAL CONTRIBUTE
function presetContribute(amt){const f=el('goalSaved');if(!f)return;
  const cur=moneyBase('goalSaved');
  setMoneyField('goalSaved',(isNaN(cur)?0:cur)+num(amt));
  renderGoalProjection();haptic('tap');f.focus();}
// ASSET TRANSACTIONS (BUY/SELL)
let detailAssetId=null;
// Form total in base currency, for the stablecoin hint.
function txPendingAmountNPR(){
  const q=parseFloat(el('txQty')&&el('txQty').value)||0;
  const praw=parseFloat(el('txPrice')&&el('txPrice').value)||0;
  if(!praw)return 0;
  const rate=getCurrRate(txPriceEntryCcy||currentCurrency.code);
  const total=isTxPricePerUnitMode?praw*q:praw;
  return rate?total/rate:0;
}
function updateTxSellPreview(){
  const box=el('txSellPreview');if(!box)return;
  const a=state.assets.find(x=>x.id===detailAssetId);
  if(!a||txMode!=='sell'){box.style.display='none';return;}
  const qEntered=txNoQty?1:(parseFloat(el('txQty')&&el('txQty').value)||0);
  const priceRaw=parseFloat(el('txPrice')&&el('txPrice').value)||0;
  if(!qEntered||!priceRaw){box.style.display='none';return;}
  const rate=getCurrRate(txPriceEntryCcy||currentCurrency.code);
  const totalSellDisp=isTxPricePerUnitMode?priceRaw*qEntered:priceRaw;
  const totalSellNPR=totalSellDisp/rate;
  const avgCost=a.buyPrice||0;
  const realizedPreview=totalSellNPR-qEntered*avgCost; // in NPR
  const avgCostDisp=avgCost*rate; // avgCost is NPR/unit, convert to display ccy
  const realizedPreviewDisp=realizedPreview*rate;
  const color=realizedPreview>0?'var(--green)':realizedPreview<0?'var(--red)':'var(--text3)';
  const bg=realizedPreview>0?'var(--green-bg)':realizedPreview<0?'var(--red-bg)':'var(--bg3)';
  box.style.background=bg;box.style.color=color;
  box.innerHTML=`${realizedPreview>0?'Profit':realizedPreview<0?'Loss':'Break-even'} of ${fmt(Math.abs(realizedPreviewDisp))}<div style="font-size:9.5px;font-weight:500;opacity:.75;margin-top:2px">${txNoQty?'It cost '+fmt(avgCostDisp):'Avg buy price is '+fmt(avgCostDisp)+'/unit'}</div>`;
  box.style.display='block';
}
function updateTxPriceLbl(mode){
  const lbl=el('txPriceLbl');
  // No quantity: plain label.
  if(txNoQty){if(lbl)lbl.textContent=mode==='buy'?'BUY PRICE':'SELL PRICE';return;}
  if(lbl)lbl.textContent=isTxPricePerUnitMode?(mode==='buy'?'BUY PRICE PER UNIT':'SELL PRICE PER UNIT'):(mode==='buy'?'TOTAL BUY PRICE':'TOTAL SELL PRICE');
  const segUnit=el('txPriceModeSegUnit'),segTotal=el('txPriceModeSegTotal');
  if(segUnit)segUnit.className='seg-btn'+(isTxPricePerUnitMode?' active':'');
  if(segTotal)segTotal.className='seg-btn'+(isTxPricePerUnitMode?'':' active');
}
function setTxPriceEntryMode(perUnit){
  if(perUnit===isTxPricePerUnitMode)return;
  const inp=el('txPrice');const qty=parseFloat(el('txQty')&&el('txQty').value)||0;
  if(inp&&inp.value&&qty>0){
    const val=parseFloat(inp.value)||0;
    inp.value=isTxPricePerUnitMode?(val*qty).toFixed(8).replace(/\.?0+$/,''):(val/qty).toFixed(8).replace(/\.?0+$/,'');
  }
  isTxPricePerUnitMode=perUnit;
  updateTxPriceLbl(txMode);
  updateTxSellPreview();
}
// Mark the open action's tab.
function syncTxTabs(){
  document.querySelectorAll('.mini-actions .act-pill').forEach(b=>{
    const oc=b.getAttribute('onclick')||'';
    const m=oc.match(/'(buy|sell|income|add|withdraw)'/);
    const mine=m&&(m[1]===txMode||m[1]===liqMode);
    b.classList.toggle('active',!!mine);
    b.setAttribute('aria-selected',mine?'true':'false');
  });
}
function toggleTxForm(mode){const a=state.assets.find(x=>x.id===detailAssetId);if(!a)return;txMode=(txMode===mode)?null:mode;document.querySelectorAll('.tx-form-box').forEach(b=>b.classList.remove('open'));syncTxTabs();if(txMode){const box=el('txForm');if(box){box.classList.add('open');el('txFormTitle').textContent=(mode==='buy'?'Record Buy':mode==='income'?'Record Income':'Record Sell')+(a.ticker||a.name?', ':' ')+(a.ticker||a.name);txNoQty=assetNoQty(a);isTxPricePerUnitMode=!txNoQty;updateTxPriceLbl(mode);txPriceEntryCcy=null;buildCompactCcySelect('txPriceCcyWrap',null,onTxPriceCcyChange);el('txSaveBtn').textContent=mode==='buy'?'Add Buy':mode==='income'?'Add Income':'Record Sell';el('txSaveBtn').style.background=mode==='buy'?'var(--blue)':mode==='income'?'var(--accent)':'var(--green)';el('txQty').value='';if(el('txDate'))el('txDate').value=todayStr();if(el('txNotes'))el('txNotes').value='';
  const _rate=getCurrRate(currentCurrency.code);el('txPrice').value=''; // leave empty, auto-fills as user types qty
  if(a.category==='commodity'){const comm=COMMODITIES.find(c=>c.id===a.commodityId)||COMMODITIES[0];if(!state.settings.lastTxUnit)state.settings.lastTxUnit={};const remembered=state.settings.lastTxUnit[a.commodityId];txUnit=(remembered&&comm.unitOptions.includes(remembered))?remembered:(a.unit||comm.defaultUnit);const ql0=el('txQtyLbl');if(ql0)ql0.textContent=unitQtyLabel(txUnit);buildCustomSelect('txUnitWrap',comm.unitOptions.map(u=>({value:u,label:u})),txUnit,v=>{txUnit=v;state.settings.lastTxUnit[a.commodityId]=v;saveState();const ql=el('txQtyLbl');if(ql)ql.textContent=unitQtyLabel(v);autoFillTxPrice();});}
  applyTxModeShape(mode,a);
  buildTxCashSelect(mode);
  const _sp=el('txSellPreview');if(_sp)_sp.style.display='none';
  el('txQty').focus();}}}
// WHERE THE MONEY GOES
// Sells credit a cash account; buys can be funded from one.
const CASH_NONE='__none__';   // money entered from, or left to, outside the app
const CASH_NEW='__new__';     // create a Cash in Hand account on the spot
function cashAccounts(){
  return (state.assets||[]).filter(a=>a&&a.category==='liquidity')
    .sort((a,b)=>(b.value||0)-(a.value||0));
}
// Crypto trades settle in stablecoins held on the exchange. Matched by id or ticker.
const STABLE_IDS=new Set(['tether','usd-coin','dai','binance-usd','true-usd',
  'first-digital-usd','paypal-usd','usdd','frax','gemini-dollar','ethena-usde']);
const STABLE_SYMS=new Set(['USDT','USDC','DAI','BUSD','TUSD','FDUSD','PYUSD','USDD','FRAX','GUSD','USDE']);
function isStablecoin(a){
  if(!a||a.category!=='crypto')return false;
  if(a.coinId&&STABLE_IDS.has(String(a.coinId).toLowerCase()))return true;
  const sym=String(a.ticker||a.name||'').trim().toUpperCase();
  return STABLE_SYMS.has(sym);
}
// Crypto trades only, never the coin being traded.
function stableAccounts(forAsset){
  if(!forAsset||forAsset.category!=='crypto')return [];
  return (state.assets||[]).filter(a=>a&&a.id!==forAsset.id&&isStablecoin(a)&&(a.qty||0)>0)
    .sort((a,b)=>(b.qty||0)-(a.qty||0));
}
function cashOptions(mode,forAsset){
  const opts=cashAccounts().map(a=>({value:a.id,label:a.name+' · '+fmt(a.value||0)}));
  stableAccounts(forAsset).forEach(a=>opts.push({value:a.id,
    label:(a.ticker||a.name)+' · '+(+(a.qty||0).toFixed(4))+' held',
    sub:fmt(getAssetCurrentValue(a))}));
  if(!opts.length)opts.push({value:CASH_NEW,label:'Cash in Hand (new account)'});
  opts.push({value:CASH_NONE,label:mode==='sell'?'Not tracked, I took the money out':'Outside money'});
  return opts;
}
function defaultCashChoice(mode,forAsset){
  const accts=cashAccounts(),stables=stableAccounts(forAsset);
  const ids=new Set([...accts,...stables].map(a=>a.id));
  const saved=mode==='sell'?state.settings.lastSellDest:state.settings.lastBuySrc;
  if(saved&&(ids.has(saved)||saved===CASH_NONE))return saved;
  // A held stablecoin leads for crypto.
  if(stables.length)return stables[0].id;
  // Sells land somewhere by default; buys default to outside money.
  if(mode==='sell')return accts.length?accts[0].id:CASH_NEW;
  return CASH_NONE;
}
function resolveCashAccount(choice){
  if(choice===CASH_NEW){
    const a={id:uid(),category:'liquidity',name:'Cash in Hand',ticker:null,coinId:null,
      coinImage:null,commodityId:null,unit:null,isNepse:false,propertyType:null,
      liquidityType:'Cash in Hand',icon:'wallet',qty:null,buyPrice:null,currentPrice:null,
      value:0,interest:null,maturity:null,date:null,notes:'Created to hold sale proceeds'};
    state.assets.push(a);return a;
  }
  return (state.assets||[]).find(x=>x.id===choice&&
    (x.category==='liquidity'||isStablecoin(x)))||null;
}
// A trade's cash leg, flagged `transfer` so trade totals don't double-count.
function pushCashLeg(acct,amountNPR,dir,date,linkId,note){
  // Stablecoin legs are quantities in the ledger; the replay derives the holding.
  if(isStablecoin(acct)){
    const per=getAssetCurrentPrice(acct)||0;
    const units=per>0?+(amountNPR/per).toFixed(8):0;
    if(!units)return 0;
    state.transactions.push({id:uid(),assetId:acct.id,name:acct.name,category:'crypto',
      icon:acct.icon||'coins',coinImage:acct.coinImage||null,
      txType:dir==='in'?'buy':'sell',qty:units,enteredQty:units,
      perUnit:per,amount:amountNPR,transfer:true,linkId,notes:note,date});
    recalcAssetFromTransactions(acct);
    return units;
  }
  state.transactions.push({id:uid(),assetId:acct.id,name:acct.name,category:'liquidity',
    icon:acct.icon||'wallet',txType:dir==='in'?'buy':'sell',qty:1,enteredQty:1,
    perUnit:amountNPR,amount:amountNPR,transfer:true,linkId,notes:note,date});
  return 0;
}
// Liquidity balances live in `value`; stablecoins in the quantity pushCashLeg wrote.
function applyCashLegBalance(acct,amountNPR,dir){
  if(!acct||isStablecoin(acct))return;
  acct.value=(acct.value||0)+(dir==='in'?1:-1)*amountNPR;
}
// A stablecoin leg needs a price to become units.
function cashLegBlocked(acct){
  if(!acct||!isStablecoin(acct))return null;
  if((getAssetCurrentPrice(acct)||0)>0)return null;
  return 'No price for '+(acct.ticker||acct.name)+' right now, so it cannot hold this yet';
}

// Destination for sale proceeds, or the source of funds for a buy.
function buildTxCashSelect(mode){
  const row=el('txCashRow');if(!row)return;
  const a=(state.assets||[]).find(x=>x.id===detailAssetId)||null;
  txCashChoice=defaultCashChoice(mode,a);
  el('txCashLbl').textContent=mode==='sell'?'PROCEEDS TO':'PAY FROM';
  buildCustomSelect('txCashWrap',cashOptions(mode,a),txCashChoice,v=>{
    txCashChoice=v;
    if(v!==CASH_NEW){if(mode==='sell')state.settings.lastSellDest=v;else state.settings.lastBuySrc=v;saveState();}
    updateTxCashHint(mode);
  });
  updateTxCashHint(mode);
}
function updateTxCashHint(mode){
  const h=el('txCashHint');if(!h)return;
  if(txCashChoice===CASH_NONE){
    h.textContent=mode==='sell'
      ? 'The money leaves your portfolio, so net worth drops by the sale amount.'
      : 'Paid with money from outside the app, nothing is deducted here.';
  }else if(txCashChoice===CASH_NEW){
    h.textContent='A Cash in Hand account will be created to hold this.';
  }else{
    const acct=(state.assets||[]).find(x=>x.id===txCashChoice);
    if(acct&&isStablecoin(acct)){
      const per=getAssetCurrentPrice(acct)||0;
      const amt=txPendingAmountNPR();
      const units=(per>0&&amt>0)?+(amt/per).toFixed(4):null;
      h.textContent=units
        ? ('About '+units+' '+(acct.ticker||acct.name)+' '+(mode==='sell'?'in':'out')
           +', at '+fmt(per)+' each.')
        : ('Moves '+(acct.ticker||acct.name)+', not cash. You hold '+(+(acct.qty||0).toFixed(4))+'.');
    }else h.textContent=''; // the option already shows that account's balance
  }
}
// Income reshapes the form. Allowed kinds per category.
const INCOME_KINDS_BY_CAT={
  stock:    [{value:'dividend',label:'Dividend'},{value:'bonus_share',label:'Bonus Share'},
             {value:'rights',label:'Rights Share'},{value:'other',label:'Other'}],
  property: [{value:'rent',label:'Rent'},{value:'lease',label:'Lease payment'},
             {value:'other',label:'Other'}],
  liquidity:[{value:'interest',label:'Interest'},{value:'cashback',label:'Cashback'},
             {value:'other',label:'Other'}],
  crypto:   [{value:'staking',label:'Staking reward'},{value:'airdrop',label:'Airdrop'},
             {value:'other',label:'Other'}],
  other:    [{value:'payout',label:'Payout'},{value:'other',label:'Other'}],
};
function incomeKindsFor(cat){return INCOME_KINDS_BY_CAT[cat]||INCOME_KINDS_BY_CAT.other;}
let txIncomeKind='dividend';
function applyTxModeShape(mode,a){
  const isInc=mode==='income';
  // Income and one-off holdings have no quantity.
  const noQ=isInc||assetNoQty(a);
  const qw=el('qtyWrapper2')||null;
  const qrow=el('txQty')?el('txQty').parentElement:null;
  if(qrow)qrow.style.display=noQ?'none':'';
  const seg=el('txPriceModeSeg');if(seg)seg.style.display=noQ?'none':'';
  const unitWrap=el('txUnitWrap');
  if(unitWrap&&unitWrap.parentElement)unitWrap.parentElement.style.display=(isInc||a.category!=='commodity')?'none':'';
  const incRow=el('txIncomeRow');if(incRow)incRow.style.display=isInc?'':'none';
  const row=el('txQty')?el('txQty').closest('.form-row-2'):null;
  if(row)row.style.gridTemplateColumns=noQ?'1fr':'1fr 1fr';
  if(isInc){
    const kinds=incomeKindsFor(a.category);
    // Last income kind per category.
    const remembered=(state.settings.lastIncomeKind||{})[a.category];
    txIncomeKind=kinds.some(k=>k.value===remembered)?remembered:kinds[0].value;
    buildCustomSelect('txIncomeWrap',kinds,txIncomeKind,v=>{
      txIncomeKind=v;
      const m=(typeof state.settings.lastIncomeKind==='object'&&state.settings.lastIncomeKind)||{};
      state.settings.lastIncomeKind={...m,[a.category]:v};saveState();});
    const lbl=el('txPriceLbl');if(lbl)lbl.textContent='AMOUNT RECEIVED';
    const sp=el('txSellPreview');if(sp)sp.style.display='none';
  }
}
function convertUnit(qty,fromUnit,toUnit){if(!qty||fromUnit===toUnit)return qty;const table=UNIT_CONVERSIONS[fromUnit];if(table&&table[toUnit]!=null)return qty*table[toUnit];return qty;/* unsupported conversion pair: assume same unit */}
async function saveTx(){const a=state.assets.find(x=>x.id===detailAssetId);if(!a||!txMode)return;
  if(txMode==='income'){
    const rateI=getCurrRate(txPriceEntryCcy||currentCurrency.code);
    const amtI=(parseFloat(el('txPrice').value)||0)/rateI;
    if(amtI<=0){toast('Enter an amount','error');return;}
    const dateI=el('txDate')&&el('txDate').value?dayToISO(el('txDate').value):new Date().toISOString();
    const destI=(txCashChoice&&txCashChoice!==CASH_NONE)?resolveCashAccount(txCashChoice):null;
    {const blk=cashLegBlocked(destI);if(blk){toast(blk,'error');return;}}
    const linkI=destI?uid():null;
    state.transactions.push({id:uid(),assetId:a.id,name:a.name,category:a.category,icon:a.icon,
      coinImage:a.coinImage,amount:amtI,qty:null,txType:'income',incomeKind:txIncomeKind,
      proceedsTo:destI?destI.id:null,linkId:linkI,
      notes:el('txNotes')?el('txNotes').value||null:null,date:dateI});
    if(destI){applyCashLegBalance(destI,amtI,'in');pushCashLeg(destI,amtI,'in',dateI,linkI,txIncomeKind+' from '+a.name);}
    haptic('success');
    toast(fmt(amtI)+' '+txIncomeKind+(destI?' into '+destI.name:' recorded'),'success');
    txMode=null;txUnit=null;txCashChoice=null;trackPnLHistory();saveState();renderAll();openAssetDetail(a.id);return;
  }
  // No quantity: the figure is the whole price, quantity 1.
  const _noQtyA=assetNoQty(a);
  const qEntered=_noQtyA?1:(parseFloat(el('txQty').value)||0),priceDispRaw=parseFloat(el('txPrice').value)||0,rate=getCurrRate(txPriceEntryCcy||currentCurrency.code);const priceDisp=(_noQtyA||!isTxPricePerUnitMode)?priceDispRaw:priceDispRaw*qEntered;const priceN=priceDisp/rate;if(!_noQtyA&&qEntered<=0){toast('Enter a quantity','error');return;}if(priceN<=0){toast('Enter a price','error');return;}
  const enteredUnit=_noQtyA?null:((a.category==='commodity'&&txUnit)?txUnit:(a.unit||null));
  const q=_noQtyA?1:((a.category==='commodity'&&a.unit&&enteredUnit)?convertUnit(qEntered,enteredUnit,a.unit):qEntered);
  const unitNote=(a.category==='commodity'&&enteredUnit&&a.unit&&enteredUnit!==a.unit)?(qEntered+' '+enteredUnit):null;
  if(txMode==='buy'){const totalBuyNPR=priceDisp/rate;
  // The funding account must cover the buy.
  let payAcct=null;
  if(txCashChoice&&txCashChoice!==CASH_NONE){
    payAcct=resolveCashAccount(txCashChoice);
    // A stablecoin covers the worth of its units.
    if(payAcct){
      const have=isStablecoin(payAcct)?getAssetCurrentValue(payAcct):(payAcct.value||0);
      if(have+1e-9<totalBuyNPR){
        toast((payAcct.ticker||payAcct.name)+' only has '+fmt(have),'error');return;}
    }
  }
  const buyPerUnit=totalBuyNPR/q;
  if(_noQtyA){
    // One-off holdings add to cost instead of averaging.
    a.buyPrice=(a.buyPrice||0)*assetUnits(a)+totalBuyNPR;
    if(a.qty!=null)a.qty=1;
  }else{const oldQ=a.qty||0,oldCostTotal=oldQ*(a.buyPrice||0);const newQ=oldQ+q;a.buyPrice=(oldCostTotal+totalBuyNPR)/newQ;a.qty=newQ;}
  const _txNotes=el('txNotes')?el('txNotes').value||null:null;const _txDate=el('txDate')&&el('txDate').value?dayToISO(el('txDate').value):new Date().toISOString();const _linkB=payAcct?uid():null;
  state.transactions.push({id:uid(),assetId:a.id,name:a.name,category:a.category,icon:a.icon,coinImage:a.coinImage,amount:totalBuyNPR,qty:_noQtyA?null:q,enteredQty:_noQtyA?null:qEntered,enteredUnit:_noQtyA?null:enteredUnit,perUnit:_noQtyA?null:buyPerUnit,txType:'buy',paidFrom:payAcct?payAcct.id:null,linkId:_linkB,notes:_txNotes,date:_txDate});
  if(payAcct){applyCashLegBalance(payAcct,totalBuyNPR,'out');pushCashLeg(payAcct,totalBuyNPR,'out',_txDate,_linkB,'Paid for '+a.name);}
  haptic('success');toast('Buy recorded'+(payAcct?', paid from '+payAcct.name:'')+(unitNote?' ('+unitNote+')':''),'success');}
  else{
  // One-off holdings: only check it is not already sold.
  if(_noQtyA){if(a.qty!=null&&a.qty<=0){toast(a.name+' is already sold','error');return;}}
  else if(q>(a.qty||0)){toast('You only hold '+qtyWithUnit(a),'error');return;}
  // Resolve and check before writing, so a refusal loses nothing.
  const destAcct=(txCashChoice&&txCashChoice!==CASH_NONE)?resolveCashAccount(txCashChoice):null;
  {const blk=cashLegBlocked(destAcct);if(blk){toast(blk,'error');return;}}
  // priceDisp = total sell amount; priceN = total in NPR
  const totalSellNPR=priceDisp/rate;const sellPerUnit=totalSellNPR/q;const realized=totalSellNPR-(_noQtyA?(a.buyPrice||0)*assetUnits(a):q*(a.buyPrice||0));
  // Selling a house sells the house. There is no remainder to carry.
  a.qty=_noQtyA?0:Math.max(0,(a.qty||0)-q);
  const _txNotesS=el('txNotes')?el('txNotes').value||null:null;const _txDateS=el('txDate')&&el('txDate').value?dayToISO(el('txDate').value):new Date().toISOString();
  const _linkS=destAcct?uid():null;
  state.transactions.push({id:uid(),assetId:a.id,name:a.name,category:a.category,icon:a.icon,coinImage:a.coinImage,amount:totalSellNPR,qty:_noQtyA?null:q,enteredQty:_noQtyA?null:qEntered,enteredUnit:_noQtyA?null:enteredUnit,perUnit:_noQtyA?null:sellPerUnit,txType:'sell',realized,proceedsTo:destAcct?destAcct.id:null,linkId:_linkS,notes:_txNotesS,date:_txDateS});
  if(destAcct){applyCashLegBalance(destAcct,totalSellNPR,'in');pushCashLeg(destAcct,totalSellNPR,'in',_txDateS,_linkS,'Sold '+a.name);}
  haptic('success');
  toast(destAcct?(fmt(totalSellNPR)+' into '+destAcct.name+' · '+(realized>=0?'+':'')+fmt(realized)+' realized'):((realized>=0?'+':'')+fmt(realized)+' realized'),'success');
  if(a.qty<=0){toast('Position closed, history kept','success');}}
  txMode=null;txUnit=null;txCashChoice=null;trackPnLHistory();saveState();renderAll();openAssetDetail(a.id);}

// BACKUPS
// Automatic local backups in IndexedDB (localStorage is too small).
const BK_DB='paisafolio-backups', BK_STORE='backups', BK_DB_VERSION=1;
// Automatic backups kept; manual ones are never swept.
const BK_KEEP=12;
const BK_FREQ_MS={daily:864e5, weekly:7*864e5, monthly:30*864e5};

function bkDB(){
  return new Promise((resolve,reject)=>{
    if(!window.indexedDB)return reject(new Error('no-idb'));
    let req;
    try{ req=indexedDB.open(BK_DB,BK_DB_VERSION); }catch(e){ return reject(e); }
    req.onupgradeneeded=()=>{
      const db=req.result;
      if(!db.objectStoreNames.contains(BK_STORE)){
        const st=db.createObjectStore(BK_STORE,{keyPath:'id'});
        st.createIndex('ts','ts');
      }
    };
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error||new Error('idb-open'));
    req.onblocked=()=>reject(new Error('idb-blocked'));
  });
}
function bkTx(mode,fn){
  return bkDB().then(db=>new Promise((resolve,reject)=>{
    const tx=db.transaction(BK_STORE,mode);
    const st=tx.objectStore(BK_STORE);
    let out;
    try{ out=fn(st); }catch(e){ reject(e); return; }
    tx.oncomplete=()=>{db.close();resolve(out&&out.result!==undefined?out.result:out);};
    tx.onerror=()=>{db.close();reject(tx.error||new Error('idb-tx'));};
    tx.onabort=()=>{db.close();reject(tx.error||new Error('idb-abort'));};
  }));
}

// Device-only settings, left out of backups.
const BK_DEVICE_ONLY=['pin','pinEnabled','biometric','lockTimeout','fontScale','font',
  'reduceMotion','haptics','hapticStrength','theme','aiBubblePos','lastPage'];
// Backup parts in collection order; the progress list is built from this.
const BK_PARTS=[
  {key:'assets',label:'Assets',ico:'wallet'},
  {key:'transactions',label:'Transactions',ico:'clock'},
  {key:'spends',label:'Spending',ico:'banknote'},
  {key:'debts',label:'Debts',ico:'coins'},
  {key:'goals',label:'Goals',ico:'target'},
  {key:'recurs',label:'Recurring',ico:'coins'},
  {key:'pnlHistory',label:'Net worth history',ico:'chartline'},
  {key:'settings',label:'Settings',ico:'shield'},
];
// Let the browser paint between steps.
function nextFrame(){return new Promise(r=>requestAnimationFrame(()=>r()));}
function backupPart(key){
  if(key==='settings'){
    const settings={};
    Object.keys(state.settings||{}).forEach(k=>{
      if(BK_DEVICE_ONLY.indexOf(k)<0)settings[k]=state.settings[k];
    });
    return settings;
  }
  return state[key]||[];
}
function backupSnapshot(){
  const d={};
  BK_PARTS.forEach(pt=>{d[pt.key]=backupPart(pt.key);});
  d.exportedAt=new Date().toISOString();
  d.appVersion='Paisafolio '+BUILD_ID;
  return d;
}
// Same snapshot, one part at a time.
async function backupSnapshotStepped(onStep){
  const d={};
  for(let i=0;i<BK_PARTS.length;i++){
    const pt=BK_PARTS[i];
    if(onStep){onStep(i,pt);await nextFrame();}
    d[pt.key]=backupPart(pt.key);
  }
  d.exportedAt=new Date().toISOString();
  d.appVersion='Paisafolio '+BUILD_ID;
  return d;
}
function backupCounts(d){
  return {assets:(d.assets||[]).length, transactions:(d.transactions||[]).length,
    spends:(d.spends||[]).length, debts:(d.debts||[]).length,
    goals:(d.goals||[]).length, recurs:(d.recurs||[]).length};
}
function backupTotal(c){return Object.values(c).reduce((a,b)=>a+b,0);}

// Validate shape before writing anything.
function backupUsable(d){
  if(!d||typeof d!=='object'||Array.isArray(d))return false;
  const lists=['assets','debts','goals','recurs','transactions','spends'];
  for(const k of lists) if(k in d && !Array.isArray(d[k])) return false;
  if(d.settings!=null&&(typeof d.settings!=='object'||Array.isArray(d.settings)))return false;
  return lists.some(k=>Array.isArray(d[k]));
}

async function takeBackup(kind,note,onStep){
  const data=onStep?await backupSnapshotStepped(onStep):backupSnapshot();
  if(!backupUsable(data)){
    // Nothing worth backing up.
    return null;
  }
  if(onStep){onStep(BK_PARTS.length,{label:'Saving to this device',ico:'box'});await nextFrame();}
  const json=JSON.stringify(data);
  const rec={id:uid(),ts:Date.now(),kind:kind==='manual'?'manual':'auto',
    note:note||null, bytes:json.length, counts:backupCounts(data), data};
  await bkTx('readwrite',st=>st.put(rec));
  state.settings.lastBackupTs=rec.ts;
  await sweepBackups();
  return rec;
}
// Newest first, without payloads.
async function listBackups(){
  const all=await bkTx('readonly',st=>st.getAll());
  return (all||[]).map(r=>({id:r.id,ts:r.ts,kind:r.kind,note:r.note,bytes:r.bytes,counts:r.counts}))
    .sort((a,b)=>b.ts-a.ts);
}
async function getBackup(id){ return bkTx('readonly',st=>st.get(id)); }
async function deleteBackup(id){ return bkTx('readwrite',st=>st.delete(id)); }
async function clearBackups(){ return bkTx('readwrite',st=>st.clear()); }
// Retention runs over the automatic ones only.
async function sweepBackups(){
  const rows=await listBackups();
  const autos=rows.filter(r=>r.kind==='auto');
  const doomed=autos.slice(BK_KEEP);
  for(const r of doomed) await deleteBackup(r.id);
  return doomed.length;
}

// Restore replaces (unlike Import); the current state is backed up first.
async function restoreBackup(id,onStep){
  const step=async(i,pt)=>{if(onStep){onStep(i,pt);await nextFrame();}};
  await step(0,{label:'Reading the backup',ico:'box'});
  const rec=await getBackup(id);
  if(!rec||!backupUsable(rec.data))throw new Error('unusable');
  await step(1,{label:'Copying what you have now',ico:'shield'});
  await takeBackup('manual','Before restoring '+new Date(rec.ts).toLocaleString());
  const d=rec.data;
  for(let i=0;i<BK_PARTS.length;i++){
    const pt=BK_PARTS[i];
    await step(i+2,pt);
    if(pt.key==='settings')continue;                 // merged below, not replaced
    state[pt.key]=Array.isArray(d[pt.key])?d[pt.key]:[];
  }
  // Merge settings so omitted device-only ones survive.
  if(d.settings&&typeof d.settings==='object')state.settings={...state.settings,...d.settings};
  state.lastUpdated=new Date().toISOString();
  return rec;
}

// the schedule
function backupsOn(){return state.settings.autoBackup!==false;}   // on unless turned off
function backupFreq(){const f=state.settings.backupFreq;return BK_FREQ_MS[f]?f:'daily';}
function backupDue(){
  if(!backupsOn())return false;
  const last=state.settings.lastBackupTs;
  if(!last)return true;
  return (Date.now()-last)>=BK_FREQ_MS[backupFreq()];
}
let _bkChecking=false;
// Cheap when nothing is due; never concurrent.
async function maybeAutoBackup(){
  if(_bkChecking||!backupDue())return;
  _bkChecking=true;
  try{ const r=await takeBackup('auto'); if(r)saveState(); }
  catch(e){ /* No IndexedDB, private mode or disk full: stay quiet */  }
  finally{ _bkChecking=false; }
}

// the sheet
function bkSize(n){
  if(!n)return '0 B';
  if(n<1024)return n+' B';
  if(n<1024*1024)return (n/1024).toFixed(1).replace(/\.0$/,'')+' KB';
  return (n/1048576).toFixed(1)+' MB';
}
function bkWhen(ts){
  const d=new Date(ts);
  const today=new Date();today.setHours(0,0,0,0);
  const day=new Date(ts);day.setHours(0,0,0,0);
  const diff=Math.round((today-day)/864e5);
  const time=d.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'});
  if(diff===0)return 'Today, '+time;
  if(diff===1)return 'Yesterday, '+time;
  return d.toLocaleDateString(undefined,{day:'numeric',month:'short'})+', '+time;
}
function openBackups(){ renderBackups(); openModal('backupsModal'); }
function toggleAutoBackup(){
  state.settings.autoBackup=!backupsOn();
  saveState();haptic('tap');renderBackups();syncBackupsSub();
  if(backupsOn())maybeAutoBackup().then(renderBackups);
}
function setBackupFreq(f){
  if(!BK_FREQ_MS[f])return;
  state.settings.backupFreq=f;saveState();haptic('tap');renderBackups();syncBackupsSub();
}
// Real steps, not a timer.
function bkProgressStart(title,steps){
  const host=el('bkProgress'); if(!host)return null;
  host.hidden=false;
  host.innerHTML='<div class="wiz-progress-wrap">'
    +'<div class="wiz-progress-track"><div class="wiz-progress-fill" id="bkProgFill" style="width:0%"></div></div>'
    +'<div class="wiz-progress-label" id="bkProgLabel">'+esc(title)+'</div>'
    +'<div class="wiz-progress-sub" id="bkProgSub">Starting</div>'
    +'<div class="wiz-progress-items" id="bkProgItems">'
    +steps.map((st,i)=>'<div class="wiz-progress-item" id="bkpi-'+i+'">'
      +'<span class="wiz-pi-ico">'+svgIcon(st.ico||'box',10)+'</span>'
      +'<span>'+esc(st.label)+'</span></div>').join('')
    +'</div></div>';
  return steps.length;
}
const BK_TICK='<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';
function bkProgressStep(i,total,label,sub){
  const fill=el('bkProgFill'); if(fill)fill.style.width=Math.round((i/total)*100)+'%';
  const lb=el('bkProgLabel'); if(lb&&label)lb.textContent=label;
  const sb=el('bkProgSub'); if(sb)sb.textContent=sub||'';
  for(let k=0;k<i;k++){const e=el('bkpi-'+k);
    if(e&&!e.classList.contains('done')){e.classList.remove('active');e.classList.add('done');
      const ic=e.querySelector('.wiz-pi-ico'); if(ic)ic.innerHTML=BK_TICK;}}
  const cur=el('bkpi-'+i); if(cur)cur.classList.add('active');
}
async function bkProgressDone(){
  const fill=el('bkProgFill'); if(fill)fill.style.width='100%';
  const items=document.querySelectorAll('#bkProgItems .wiz-progress-item');
  items.forEach(e=>{e.classList.remove('active');e.classList.add('done');
    const ic=e.querySelector('.wiz-pi-ico'); if(ic)ic.innerHTML=BK_TICK;});
  await nextFrame();
}
function bkProgressEnd(){const host=el('bkProgress'); if(host){host.hidden=true;host.innerHTML='';}}
let _bkBusy=false;
async function backupNow(){
  if(_bkBusy)return; _bkBusy=true;
  const steps=BK_PARTS.concat([{label:'Saving to this device',ico:'box'}]);
  const total=bkProgressStart('Backing up',steps)||steps.length;
  try{
    const r=await takeBackup('manual',null,(i,pt)=>{
      const n=pt.key&&Array.isArray(state[pt.key])?plural(state[pt.key].length,'item'):'';
      bkProgressStep(i,total,'Backing up',pt.label+(n?' \u00b7 '+n:''));
    });
    if(!r){bkProgressEnd();toast('Nothing to back up yet','error');return;}
    bkProgressStep(total,total,'Backed up',plural(backupTotal(r.counts),'item')+' \u00b7 '+bkSize(r.bytes));
    await bkProgressDone();
    saveState();haptic('success');
    toast('Backed up '+plural(backupTotal(r.counts),'item'),'success');
    // Leave the finished list up briefly.
    setTimeout(bkProgressEnd,1100);
    renderBackups();syncBackupsSub();
  }catch(e){ bkProgressEnd(); toast(bkFailReason(e),'error'); }
  finally{ _bkBusy=false; }
}
// No storage at all vs out of space.
function bkFailReason(e){
  const m=(e&&(e.name||e.message))||'';
  if(/no-idb|SecurityError|idb-open/i.test(m))return 'This browser will not let the app store backups here';
  if(/Quota|QuotaExceeded/i.test(m))return 'No room left for another backup, delete an old one';
  return 'Could not save that backup';
}
async function confirmClearBackups(){
  const rows=await listBackups();
  if(!rows.length){toast('No backups to delete');return;}
  if(!await askConfirm({title:'Delete every backup?',
    message:plural(rows.length,'backup')+' will be removed from this device. Your current data is not touched, but you will have nothing to roll back to.',
    confirmText:'Delete all',danger:true}))return;
  await clearBackups();
  haptic('tap');toast('Backups deleted');renderBackups();syncBackupsSub();
}
async function confirmDeleteBackup(id){
  const rows=await listBackups();
  const r=rows.find(x=>x.id===id);if(!r)return;
  if(!await askConfirm({title:'Delete this backup?',
    message:bkWhen(r.ts)+', '+plural(backupTotal(r.counts),'item')+'. This cannot be undone.',
    confirmText:'Delete',danger:true}))return;
  await deleteBackup(id);haptic('tap');toast('Backup deleted');renderBackups();syncBackupsSub();
}
async function confirmRestoreBackup(id){
  const rows=await listBackups();
  const r=rows.find(x=>x.id===id);if(!r)return;
  const now=backupTotal(backupCounts(backupSnapshot()));
  if(!await askConfirm({title:'Restore this backup?',
    message:'Everything here now ('+plural(now,'item')+') is replaced by what this backup holds ('+
      plural(backupTotal(r.counts),'item')+', from '+bkWhen(r.ts)+'). A copy of what you have now is taken first, so this can be undone.',
    confirmText:'Restore',danger:true}))return;
  if(_bkBusy)return; _bkBusy=true;
  const steps=[{label:'Reading the backup',ico:'box'},{label:'Copying what you have now',ico:'shield'}]
    .concat(BK_PARTS).concat([{label:'Rebuilding the app',ico:'zap'}]);
  const total=steps.length;
  bkProgressStart('Restoring',steps);
  try{
    await restoreBackup(id,(i,pt)=>bkProgressStep(i,total,'Restoring',pt.label));
    bkProgressStep(total-1,total,'Restoring','Rebuilding the app');
    await nextFrame();
    flushSave();renderAll();
    bkProgressStep(total,total,'Restored',plural(backupTotal(r.counts),'item')+' from '+bkWhen(r.ts));
    await bkProgressDone();
    haptic('success');
    toast('Restored from '+bkWhen(r.ts),'success');
    setTimeout(bkProgressEnd,1100);
    renderBackups();syncBackupsSub();
  }catch(e){ bkProgressEnd(); toast('That backup could not be restored','error'); }
  finally{ _bkBusy=false; }
}
// Download as the same JSON Import reads.
async function downloadBackup(id){
  const rec=await getBackup(id);
  if(!rec){toast('That backup is gone','error');return;}
  const blob=new Blob([JSON.stringify(rec.data,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download='paisafolio-backup-'+new Date(rec.ts).toISOString().slice(0,10)+'.json';
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(url),4000);
  haptic('tap');toast('Backup downloaded','success');
}
const BK_ICON={
  restore:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 3-6.7"/><polyline points="3 4 3 10 9 10"/></svg>',
  down:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  del:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>',
};
async function renderBackups(){
  const on=backupsOn();
  const t=el('bkAutoToggle');
  if(t){t.className='toggle'+(on?' on':'');t.setAttribute('aria-checked',on?'true':'false');}
  const fr=el('bkFreqRow'); if(fr)fr.hidden=!on;
  ['daily','weekly','monthly'].forEach(f=>{
    const b=el('bkFreq'+f[0].toUpperCase()+f.slice(1));
    if(b)b.classList.toggle('on',backupFreq()===f);
  });
  const sub=el('bkAutoSub');
  if(sub)sub.textContent=on
    ? (state.settings.lastBackupTs?'Last backup '+relTime(state.settings.lastBackupTs):'No backup taken yet')
    : 'Off, nothing is being kept';
  const host=el('bkList'); if(!host)return;
  let rows=[];
  try{ rows=await listBackups(); }
  catch(e){
    host.innerHTML='<div class="bk-empty">'+esc(bkFailReason(e))+'</div>';
    const ca=el('bkClearAll'); if(ca)ca.hidden=true;
    return;
  }
  const ca=el('bkClearAll'); if(ca)ca.hidden=!rows.length;
  if(!rows.length){
    host.innerHTML='<div class="bk-empty">No backups yet. One is taken automatically once a '
      +(backupFreq()==='daily'?'day':backupFreq()==='weekly'?'week':'month')
      +', or take one now.</div>';
    return;
  }
  host.innerHTML=rows.map(r=>{
    const c=r.counts||{};
    const parts=[plural(backupTotal(c),'item'),bkSize(r.bytes)];
    return '<div class="bk-row"><div class="bk-row-info">'
      +'<div class="bk-when">'+esc(bkWhen(r.ts))
      +'<span class="bk-tag'+(r.kind==='manual'?' manual':'')+'">'+(r.kind==='manual'?'manual':'auto')+'</span></div>'
      +'<div class="bk-meta">'+esc(parts.join(' · '))+(r.note?' · '+esc(r.note):'')+'</div>'
      +'</div><div class="bk-acts">'
      +'<button class="bk-btn" title="Restore" aria-label="Restore this backup" onclick="confirmRestoreBackup(\''+r.id+'\')">'+BK_ICON.restore+'</button>'
      +'<button class="bk-btn" title="Download" aria-label="Download this backup" onclick="downloadBackup(\''+r.id+'\')">'+BK_ICON.down+'</button>'
      +'<button class="bk-btn danger" title="Delete" aria-label="Delete this backup" onclick="confirmDeleteBackup(\''+r.id+'\')">'+BK_ICON.del+'</button>'
      +'</div></div>';
  }).join('');
}
// The settings row says the state of it without being opened.
function syncBackupsSub(){
  const e=el('backupsSub'); if(!e)return;
  if(!backupsOn()){e.textContent='Off';return;}
  e.textContent=state.settings.lastBackupTs
    ? 'Last backup '+relTime(state.settings.lastBackupTs)
    : 'On, no backup yet';
}

// SPENDING & BUDGETS
// Spends are their own records, not asset transactions. A spend naming a cash account
// moves its balance through a linked leg. Category = what was bought; group = how it
// is budgeted.
const SPEND_GROUPS=[
  {id:'needs',   label:'Needs',    color:'#ef6461'},
  {id:'wants',   label:'Wants',    color:'#f4a259'},
  {id:'giving',  label:'Giving',   color:'#5b8e7d'},
  {id:'personal',label:'Personal', color:'#7c8cf8'},
  {id:'other',   label:'Other',    color:'#8b8b8b'},
];
// Each category has its own colour; groups have theirs for the budget card.
const SPEND_CATS_BUILTIN=[
  {id:'food',      label:'Food & Dining', group:'needs',    icon:'leaf',       color:'#ef6461'},
  {id:'groceries', label:'Groceries',     group:'needs',    icon:'box',        color:'#f4978e'},
  {id:'transport', label:'Transport',     group:'needs',    icon:'car',        color:'#e8871e'},
  {id:'bills',     label:'Bills & Utilities',group:'needs', icon:'zap',        color:'#f6bd60'},
  {id:'rent',      label:'Rent',          group:'needs',    icon:'home',       color:'#b5838d'},
  {id:'health',    label:'Health',        group:'needs',    icon:'heart',      color:'#e5989b'},
  {id:'education', label:'Education',     group:'needs',    icon:'graduation', color:'#6d9dc5'},
  {id:'shopping',  label:'Shopping',      group:'wants',    icon:'gift',       color:'#7c8cf8'},
  {id:'fun',       label:'Entertainment', group:'wants',    icon:'trophy',     color:'#a685e2'},
  {id:'travel',    label:'Travel',        group:'wants',    icon:'rocket',     color:'#4cc9a4'},
  {id:'giving',    label:'Gifts & Giving',group:'giving',   icon:'heart',      color:'#5b8e7d'},
  {id:'personal',  label:'Personal',      group:'personal', icon:'briefcase',  color:'#d4a373'},
  {id:'other',     label:'Other',         group:'other',    icon:'box',        color:'#8d99ae'},
];
const INCOME_CATS_BUILTIN=[
  {id:'salary',    label:'Salary',        icon:'banknote', color:'#5b8e7d'},
  {id:'business',  label:'Business',      icon:'building', color:'#4cc9a4'},
  {id:'freelance', label:'Freelance',     icon:'laptop',   color:'#6d9dc5'},
  {id:'gifted',    label:'Gift Received', icon:'gift',     color:'#a685e2'},
  {id:'other_in',  label:'Other Income',  icon:'wallet',   color:'#8d99ae'},
];
// Built-ins plus custom categories, rebuilt by rebuildCats(). The fallback is 'other' by id.
let SPEND_CATS=SPEND_CATS_BUILTIN.slice();
let INCOME_CATS=INCOME_CATS_BUILTIN.slice();
function spendCat(id){return SPEND_CATS.find(c=>c.id===id)||SPEND_CATS_BUILTIN.find(c=>c.id==='other');}
function incomeCat(id){return INCOME_CATS.find(c=>c.id===id)||INCOME_CATS_BUILTIN.find(c=>c.id==='other_in');} // BANNER:── Categories the assistant is allowed to invent ──────────────────────
// Custom categories. A proposed name is matched against existing ones first, so
// near-duplicates fold instead of fragmenting budgets and charts.
function customCats(){
  const c=state.settings.customCats;
  return Array.isArray(c)?c:(state.settings.customCats=[]);
}
// Names compare as sets of stemmed words (plurals, punctuation, order). Semantic
// matches are left to the model, which is told to prefer existing categories.
// Stopwords include words that name the list itself (income, expense, payment, money).
const CAT_STOPWORDS=new Set(['and','the','of','for','a','an','my','other','misc','general',
  'income','expense','expenses','payment','payments','money','spend','spending','cost','costs']);
function catStem(w){
  w=String(w||'').toLowerCase();
  if(w.length>4&&w.endsWith('ies'))w=w.slice(0,-3)+'i';
  else if(w.length>3&&w.endsWith('es'))w=w.slice(0,-2);
  else if(w.length>3&&w.endsWith('s')&&!w.endsWith('ss'))w=w.slice(0,-1);
  if(w.length>3&&w.endsWith('y'))w=w.slice(0,-1)+'i';
  return w;
}
function catTokens(label){
  return String(label||'').toLowerCase().split(/[^a-z0-9]+/)
    .filter(w=>w&&!CAT_STOPWORDS.has(w)).map(catStem).filter(Boolean);
}
function catKey(label){return catTokens(label).slice().sort().join('|');}
function findCatByLabel(label,kind){
  const toks=catTokens(label);
  if(!toks.length)return null;
  const k=toks.slice().sort().join('|');
  const list=kind==='income'?INCOME_CATS:SPEND_CATS;
  const exact=list.find(c=>catKey(c.label)===k);   // same words, any order
  if(exact)return exact;
  // One shared long word is enough for short names; longer names need two.
  return list.find(c=>{
    const ct=catTokens(c.label);
    if(!ct.length)return false;
    const shared=toks.filter(t=>t.length>=4&&ct.indexOf(t)>=0);
    if(!shared.length)return false;
    return Math.min(toks.length,ct.length)<=2||shared.length>=2;
  })||null;
}
// Palette and keyword icons for new categories.
const NEWCAT_PALETTE=['#ef6461','#f4978e','#e8871e','#f6bd60','#b5838d','#e5989b','#6d9dc5',
  '#7c8cf8','#a685e2','#4cc9a4','#5b8e7d','#d4a373','#8d99ae','#c77dff','#57cc99'];
const NEWCAT_ICON_HINTS=[
  [/game|topup|diamond|uc|steam|play/,'trophy'],[/phone|recharge|data|sim|ncell|ntc/,'zap'],
  [/net|internet|wifi|fiber/,'zap'],[/rent|room|house|flat/,'home'],
  [/school|college|tuition|course|book/,'graduation'],[/doctor|medicine|clinic|hospital|health/,'heart'],
  [/bus|taxi|fuel|petrol|bike|pathao|ride/,'car'],[/food|khaja|chiya|tea|snack|restaurant|momo/,'leaf'],
  [/grocer|vegetable|market|kirana/,'box'],[/cloth|shoe|shop|wear/,'gift'],
  [/trip|travel|flight|hotel/,'rocket'],[/salary|wage|pay/,'banknote'],
  [/gift|donat|charity|dan/,'heart'],[/invest|share|stock|sip/,'trending'],
  [/work|office|business|client/,'briefcase'],[/pet|dog|cat/,'heart'],
];
function pickCatIcon(label){
  const t=String(label||'').toLowerCase();
  for(const [re,ico] of NEWCAT_ICON_HINTS)if(re.test(t))return ico;
  return 'box';
}
function pickCatColor(label){
  let h=0;const s=String(label||'');
  for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;
  return NEWCAT_PALETTE[h%NEWCAT_PALETTE.length];
}
function slugCat(label){
  const base=String(label||'').toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'').slice(0,24)||'cat';
  let id='c_'+base,n=2;
  while(SPEND_CATS.some(c=>c.id===id)||INCOME_CATS.some(c=>c.id===id))id='c_'+base+'_'+(n++);
  return id;
}
// Title Case, so an invented name sits beside the built-ins without shouting.
function tidyCatLabel(label){
  return String(label||'').trim().replace(/\s+/g,' ').slice(0,28)
    .replace(/\b\w/g,(m)=>m.toUpperCase());
}
// Existing category if the name matches one, else a new one.
function adoptCategory(label,kind,group,icon){
  const tidy=tidyCatLabel(label);
  if(!tidy||tidy.length<2)return null;
  // Only filler words: that is the catch-all.
  if(!catTokens(tidy).length)return null;
  const hit=findCatByLabel(tidy,kind);
  if(hit)return hit;
  if(customCats().length>=24)return null;   // a vocabulary, not a junk drawer
  // Model-suggested icon, checked against the icons we have.
  const wanted=String(icon||'').trim().toLowerCase();
  const ico=(wanted&&ICON_KEYS.indexOf(wanted)>=0)?wanted:pickCatIcon(tidy);
  const cat={id:slugCat(tidy),label:tidy,kind:kind==='income'?'income':'expense',
    group:(kind==='income')?null:(['needs','wants','giving','personal','other'].indexOf(group)>=0?group:'other'),
    icon:ico,color:pickCatColor(tidy),ai:true,created:new Date().toISOString()};
  customCats().push(cat);
  rebuildCats();
  return cat;
}
// Built-ins fixed; customs go before the catch-all, which stays last.
function rebuildCats(){
  const cs=customCats();
  const otherOut=SPEND_CATS_BUILTIN.find(c=>c.id==='other');
  const otherIn=INCOME_CATS_BUILTIN.find(c=>c.id==='other_in');
  SPEND_CATS=SPEND_CATS_BUILTIN.filter(c=>c.id!=='other')
    .concat(cs.filter(c=>c.kind!=='income')).concat([otherOut]);
  INCOME_CATS=INCOME_CATS_BUILTIN.filter(c=>c.id!=='other_in')
    .concat(cs.filter(c=>c.kind==='income')).concat([otherIn]);
  // Built-in edits are stored as overrides and replayed here.
  const ov=state.settings&&state.settings.catOverrides;
  if(ov&&typeof ov==='object'){
    const patch=list=>list.map(c=>{
      const o=ov[c.id];
      if(!o)return c;
      return Object.assign({},c,o.label?{label:o.label}:{},o.icon?{icon:o.icon}:{},
        o.color?{color:o.color}:{},o.group?{group:o.group}:{});
    });
    SPEND_CATS=patch(SPEND_CATS);INCOME_CATS=patch(INCOME_CATS);
  }
}
// MANAGING CATEGORIES
// Built-ins can be renamed and restyled but not deleted ("Other" is the fallback by id).
let catMgrKind='expense';
let editingCatId=null,catEditIcon='box',catEditColor=NEWCAT_PALETTE[0];
function catsOfKind(kind){return kind==='income'?INCOME_CATS:SPEND_CATS;}
function isCustomCat(id){return customCats().some(c=>c&&c.id===id);}
function catUseCount(id,kind){
  return (state.spends||[]).filter(s=>s&&s.category===id
    &&((s.kind==='income')===(kind==='income'))).length;
}
function setCatMgrKind(k){
  catMgrKind=k==='income'?'income':'expense';
  haptic('tap');renderCatManager();
}
function openCatManager(){catMgrKind='expense';renderCatManager();openModal('catMgrModal');}
function renderCatManager(){
  const host=el('catMgrList');if(!host)return;
  const kind=catMgrKind;
  el('catMgrSegOut').className=kind==='expense'?'on':'';
  el('catMgrSegIn').className=kind==='income'?'on':'';
  const list=catsOfKind(kind);
  host.innerHTML=list.map(c=>{
    const n=catUseCount(c.id,kind);
    const made=isCustomCat(c.id);
    return `<button type="button" class="cat-mgr-row" onclick="openCatEdit('${jsAttr(c.id)}')">
      <span class="cat-mgr-ico" style="background:${esc(c.color)}22;color:${esc(c.color)}">${svgIcon(c.icon||'box',16)}</span>
      <span class="cat-mgr-txt">
        <span class="cat-mgr-nm">${esc(c.label)}${made?'<span class="cat-mgr-tag">made for you</span>':''}</span>
        <span class="cat-mgr-sub">${n?plural(n,'entry','entries'):'nothing filed here'}${(kind!=='income'&&c.group)?' · '+esc(c.group):''}</span>
      </span>
      <svg class="pick-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
    </button>`;
  }).join('');
  const hint=el('catMgrHint');
  if(hint){
    const made=customCats().filter(c=>(c.kind==='income')===(kind==='income')).length;
    hint.textContent=made
      ? made+' of these were named for you as you typed. Rename, restyle or remove any of them.'
      : 'Folio adds one here when a note fits nothing on the list.';
  }
}
const CAT_GROUPS=[{value:'needs',label:'A need'},{value:'wants',label:'A want'},
  {value:'giving',label:'Giving'},{value:'personal',label:'Personal'},{value:'other',label:'Something else'}];
let catEditGroup='other';
function openCatEdit(id){
  const kind=catMgrKind;
  const cat=id?catsOfKind(kind).find(c=>c.id===id):null;
  editingCatId=cat?cat.id:null;
  el('catEditTitle').textContent=cat?'Edit category':'New category';
  el('catEditName').value=cat?cat.label:'';
  catEditIcon=cat?(cat.icon||'box'):'box';
  catEditColor=cat?(cat.color||NEWCAT_PALETTE[0]):pickCatColor(String(Date.now()));
  catEditGroup=cat?(cat.group||'other'):'other';
  syncCatEditIcon();renderCatEditColors();
  const gr=el('catEditGroupRow');
  if(gr){
    gr.hidden=kind==='income';
    if(kind!=='income')buildCustomSelect('catEditGroupWrap',CAT_GROUPS,catEditGroup,v=>{catEditGroup=v;});
  }
  const del=el('catEditDelete');
  const removable=!!cat&&isCustomCat(cat.id);
  del.style.display=removable?'block':'none';
  const used=cat?catUseCount(cat.id,kind):0;
  el('catEditHint').textContent=!cat?'It joins the list straight away and Folio can file notes under it.'
    :removable?(used?'Deleting it moves its '+plural(used,'entry','entries')+' to Other.':'Nothing is filed here, so deleting it changes nothing else.')
    :'A built-in category. You can rename and restyle it; it cannot be removed.';
  openModal('catEditModal');
}
function syncCatEditIcon(){
  const p=el('catEditIcoPrev');if(p){p.innerHTML=svgIcon(catEditIcon,18);p.style.background=catEditColor+'22';p.style.color=catEditColor;}
  const n=el('catEditIcoName');if(n)n.textContent=catEditIcon;
}
function openCatIconPicker(){openIconPicker(catEditIcon,k=>{catEditIcon=k;syncCatEditIcon();},'Category icon');}
function renderCatEditColors(){
  const g=el('catEditColors');if(!g)return;
  g.innerHTML=NEWCAT_PALETTE.map(c=>`<button type="button" class="color-opt ${c===catEditColor?'sel':''}" style="background:${c}" onclick="pickCatEditColor('${c}')" aria-label="colour ${c}"></button>`).join('');
}
function pickCatEditColor(c){catEditColor=c;renderCatEditColors();syncCatEditIcon();haptic('tap');}
function saveCatEdit(){
  const kind=catMgrKind;
  const label=tidyCatLabel(el('catEditName').value);
  if(!label||label.length<2){toast('Give it a name','error');return;}
  if(editingCatId){
    const custom=customCats().find(c=>c.id===editingCatId);
    if(custom){
      Object.assign(custom,{label,icon:catEditIcon,color:catEditColor});
      if(kind!=='income')custom.group=catEditGroup;
      rebuildCats();
    }else{
      // Built-in edits are stored as overrides.
      const ov=state.settings.catOverrides||(state.settings.catOverrides={});
      ov[editingCatId]={label,icon:catEditIcon,color:catEditColor,
        group:kind!=='income'?catEditGroup:undefined};
      rebuildCats();
    }
  }else{
    const clash=findCatByLabel(label,kind);
    if(clash){toast('"'+clash.label+'" already covers that','error');return;}
    if(customCats().length>=24){toast('That is as many as the list will hold','error');return;}
    customCats().push({id:slugCat(label),label,kind:kind==='income'?'income':'expense',
      group:kind==='income'?null:catEditGroup,icon:catEditIcon,color:catEditColor,
      ai:false,created:new Date().toISOString()});
    rebuildCats();
  }
  editingCatId=null;
  saveState();renderAll();haptic('success');
  closeModal('catEditModal');renderCatManager();
  toast('Category saved','success');
}
async function deleteCatEdit(){
  const id=editingCatId;if(!id)return;
  const kind=catMgrKind;
  const cat=catsOfKind(kind).find(c=>c.id===id);
  const used=catUseCount(id,kind);
  const fallback=kind==='income'?'other_in':'other';
  if(!await askConfirm({title:'Delete '+((cat&&cat.label)||'category')+'?',
    message:used?plural(used,'entry','entries')+' filed here will move to Other. Nothing is lost.'
                :'Nothing is filed here, so nothing else changes.',
    confirmText:'Delete'}))return;
  let moved=0;
  (state.spends||[]).forEach(sp=>{if(sp&&sp.category===id&&((sp.kind==='income')===(kind==='income'))){sp.category=fallback;moved++;}});
  // A rule that taught this category has nothing left to point at.
  state.settings.spendRules=userSpendRules().filter(r=>r&&r.cat!==id);
  state.settings.customCats=customCats().filter(c=>c&&c.id!==id);
  if(state.settings.catOverrides)delete state.settings.catOverrides[id];
  rebuildCats();saveState();
  editingCatId=null;
  renderAll();haptic('tap');
  closeModal('catEditModal');renderCatManager();
  toast(moved?'Deleted, '+plural(moved,'entry','entries')+' moved to Other':'Category deleted','success');
}
// Drop unused custom categories after a day.
function pruneCustomCats(){
  const used=new Set((state.spends||[]).map(s=>s.category));
  (state.settings.budgetDefaults?Object.keys(state.settings.budgetDefaults):[]).forEach(k=>used.add(k));
  const day=864e5;
  const keep=customCats().filter(c=>used.has(c.id)||(Date.now()-new Date(c.created||0).getTime())<day);
  if(keep.length!==customCats().length)state.settings.customCats=keep;
  rebuildCats();
}
function catOf(s){return s&&s.kind==='income'?incomeCat(s.category):spendCat(s.category);}

// Keyword rules on the note; the user's own rules are checked first.
const DEFAULT_SPEND_RULES=[
  {match:'khaja',cat:'food'},{match:'restaurant',cat:'food'},{match:'cafe',cat:'food'},
  {match:'coffee',cat:'food'},{match:'momo',cat:'food'},{match:'hotel',cat:'food'},
  {match:'bhatbhateni',cat:'groceries'},{match:'grocer',cat:'groceries'},{match:'tarkari',cat:'groceries'},
  {match:'pathao',cat:'transport'},{match:'indrive',cat:'transport'},{match:'tootle',cat:'transport'},
  {match:'taxi',cat:'transport'},{match:'petrol',cat:'transport'},{match:'fuel',cat:'transport'},
  {match:'bus',cat:'transport'},{match:'uber',cat:'transport'},
  {match:'ntc',cat:'bills'},{match:'ncell',cat:'bills'},{match:'worldlink',cat:'bills'},
  {match:'vianet',cat:'bills'},{match:'nea',cat:'bills'},{match:'electric',cat:'bills'},
  {match:'khanepani',cat:'bills'},{match:'water bill',cat:'bills'},{match:'internet',cat:'bills'},
  {match:'recharge',cat:'bills'},
  {match:'rent',cat:'rent'},{match:'kotha',cat:'rent'},
  {match:'pharmac',cat:'health'},{match:'hospital',cat:'health'},{match:'clinic',cat:'health'},
  {match:'doctor',cat:'health'},{match:'medicine',cat:'health'},
  {match:'college',cat:'education'},{match:'school',cat:'education'},{match:'tuition',cat:'education'},
  {match:'course',cat:'education'},{match:'book',cat:'education'},
  {match:'daraz',cat:'shopping'},{match:'shop',cat:'shopping'},{match:'clothes',cat:'shopping'},
  {match:'movie',cat:'fun'},{match:'cinema',cat:'fun'},{match:'game',cat:'fun'},
  {match:'netflix',cat:'fun'},{match:'spotify',cat:'fun'},{match:'youtube',cat:'fun'},
  {match:'ticket',cat:'travel'},{match:'flight',cat:'travel'},{match:'trek',cat:'travel'},
  {match:'donat',cat:'giving'},{match:'temple',cat:'giving'},{match:'dakshina',cat:'giving'},
  {match:'salon',cat:'personal'},{match:'gym',cat:'personal'},{match:'haircut',cat:'personal'},
];
const DEFAULT_INCOME_RULES=[
  {match:'salary',cat:'salary'},{match:'talab',cat:'salary'},{match:'payroll',cat:'salary'},
  {match:'invoice',cat:'freelance'},{match:'client',cat:'freelance'},{match:'fiverr',cat:'freelance'},
  {match:'upwork',cat:'freelance'},{match:'sale',cat:'business'},{match:'profit',cat:'business'},
];
function userSpendRules(){return Array.isArray(state.settings.spendRules)?state.settings.spendRules:[];}
// Longest match wins. Taught rules are final; built-in keywords are provisional and
// the model's read replaces them.
function guessCategoryRule(note,kind){
  const t=String(note||'').toLowerCase().trim();
  if(!t)return null;
  const taught=userSpendRules().filter(r=>r&&r.match&&(!r.kind||r.kind===kind));
  const builtin=kind==='income'?DEFAULT_INCOME_RULES:DEFAULT_SPEND_RULES;
  const valid=kind==='income'?INCOME_CATS:SPEND_CATS;
  const pick=pool=>{
    let best=null;
    pool.forEach(r=>{
      const m=String(r.match||'').toLowerCase();
      if(m&&t.includes(m)&&(!best||m.length>best.len))best={cat:r.cat,len:m.length};
    });
    return (best&&valid.some(c=>c.id===best.cat))?best.cat:null;
  };
  const mine=pick(taught);
  if(mine)return {cat:mine,taught:true};
  const std=pick(builtin);
  return std?{cat:std,taught:false}:null;
}
function guessCategory(note,kind){
  const g=guessCategoryRule(note,kind);
  return g?g.cat:null;
}
// Remember a correction so the same shop lands in the right place next time.
function learnCategory(note,cat,kind){
  const t=String(note||'').toLowerCase().trim();
  if(!t||!cat)return;
  // First word as the key (usually the shop).
  const key=t.split(/[\s,\-–—]+/)[0];
  if(!key||key.length<3)return;
  if(guessCategory(key,kind)===cat)return;   // already lands there, nothing to learn
  const rules=userSpendRules().filter(r=>!(r.match===key&&r.kind===kind));
  rules.push({match:key,cat,kind});
  state.settings.spendRules=rules.slice(-120);   // bounded, oldest fall off
}

// Month keys
function monthKey(d){const x=d instanceof Date?d:new Date(d);return isNaN(x)?null:x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0');}
function monthLabel(k){
  const [y,m]=String(k||'').split('-').map(Number);
  if(!y||!m)return '';
  return new Date(y,m-1,1).toLocaleDateString(undefined,{month:'long',year:'numeric'});
}
function shiftMonth(k,by){
  const [y,m]=String(k).split('-').map(Number);
  const d=new Date(y,m-1+by,1);
  return monthKey(d);
}
function daysInMonth(k){const [y,m]=String(k).split('-').map(Number);return new Date(y,m,0).getDate();}
function isCurrentMonth(k){return k===monthKey(new Date());}

function spendsIn(k){
  return (state.spends||[]).filter(s=>s&&monthKey(s.date)===k);
}
// One pass: totals by category, group and day.
function monthSummary(k){
  const rows=spendsIn(k);
  const out={income:0,spent:0,byCat:{},byGroup:{},byDay:{},count:rows.length,incomeByCat:{}};
  rows.forEach(s=>{
    const amt=num(s.amount);
    if(s.kind==='income'){out.income+=amt;out.incomeByCat[s.category]=(out.incomeByCat[s.category]||0)+amt;return;}
    out.spent+=amt;
    out.byCat[s.category]=(out.byCat[s.category]||0)+amt;
    const g=spendCat(s.category).group;
    out.byGroup[g]=(out.byGroup[g]||0)+amt;
    const day=new Date(s.date).getDate();
    if(day>=1)out.byDay[day]=(out.byDay[day]||0)+amt;
  });
  out.saved=out.income-out.spent;
  return out;
}

// Budgets
function budgetDefaults(){return (state.settings.budgetDefaults&&typeof state.settings.budgetDefaults==='object')?state.settings.budgetDefaults:{};}
function budgetFor(k){
  const over=(state.settings.budgets&&state.settings.budgets[k])||null;
  const base=budgetDefaults();
  const out={};
  SPEND_GROUPS.forEach(g=>{
    const v=over&&over[g.id]!=null?over[g.id]:base[g.id];
    out[g.id]=num(v);
  });
  out._overridden=!!over;
  return out;
}
function budgetTotal(k){return SPEND_GROUPS.reduce((s,g)=>s+num(budgetFor(k)[g.id]),0);}
function hasBudget(k){return budgetTotal(k)>0;}
// Straight-line pace: expected spend by today vs actual.
function budgetStatus(k){
  const b=budgetFor(k),sum=monthSummary(k);
  const total=SPEND_GROUPS.reduce((s,g)=>s+num(b[g.id]),0);
  if(total<=0)return null;
  const dim=daysInMonth(k);
  const today=new Date();
  const dayNow=isCurrentMonth(k)?today.getDate():dim;
  const pace=total*(dayNow/dim);
  const spent=sum.spent;
  const left=total-spent;
  // Forecast assumes the rest of the month looks like the days so far.
  const forecast=dayNow>0?(spent/dayNow)*dim:0;
  let statusId='on',statusLabel='On track';
  if(spent>total){statusId='over';statusLabel='Over budget';}
  else if(forecast>total*1.02){statusId='risk';statusLabel='Trending over';}
  else if(spent>pace*1.15){statusId='risk';statusLabel='Spending fast';}
  return {total,spent,left,pace,forecast,dayNow,dim,statusId,statusLabel,
          vsPace:pace-spent,byGroup:sum.byGroup,budget:b};
}

// Saving a spend
let spendMonth=null;              // month being viewed, null until first render
let editingSpendId=null;
let spendKind='expense';
let spendCatChoice=null;
let spendAccountChoice=CASH_NONE;
let spendFilter='all';

function currentSpendMonth(){return spendMonth||(spendMonth=monthKey(new Date()));}
function goSpendMonth(by){
  const next=shiftMonth(currentSpendMonth(),by);
  // Nothing useful lives in the future, so do not let the user walk into it.
  if(by>0&&next>monthKey(new Date()))return;
  spendMonth=next;haptic('tap');renderSpend();
}

function openAddSpend(kind){
  editingSpendId=null;
  spendKind=kind||'expense';
  spendCatChoice=null;
  _catSettled=false;spendCatPicked=false;
  spendAccountChoice=defaultSpendAccount();
  el('spendModalTitle').textContent=spendKind==='income'?'Add Income':'Add Expense';
  resetMoneyCcy(['spendAmount']);
  bindMoneyCcy('spendAmount','spendAmountCcyWrap');
  el('spendAmount').value='';
  clearTimeout(_catAiTimer);_catAiSeq++;setCatAiTag(null);
  el('spendNote').value='';
  el('spendDate').value=todayStr();
  el('spendDeleteBtn').style.display='none';
  buildSpendKindSeg();
  buildSpendCatSelect();
  buildSpendAccountSelect();
  syncSpendNoteCopy();
  openModal('spendModal');
}
// Switch to the result's month so saving lands where you are looking.
function openSpendFromSearch(id){
  const s=(state.spends||[]).find(x=>x.id===id);if(!s)return;
  spendMonth=monthKey(s.date);
  goPage('spend');
  setTimeout(()=>openEditSpend(id),250);
}
function openEditSpend(id){
  const s=(state.spends||[]).find(x=>x.id===id);if(!s)return;
  editingSpendId=id;
  spendKind=s.kind==='income'?'income':'expense';
  spendCatChoice=s.category;
  // Re-read the category when editing, too.
  _catSettled=true;spendCatPicked=false;
  spendAccountChoice=s.account||CASH_NONE;
  el('spendModalTitle').textContent=spendKind==='income'?'Edit Income':'Edit Expense';
  resetMoneyCcy(['spendAmount']);
  bindMoneyCcy('spendAmount','spendAmountCcyWrap');
  setMoneyField('spendAmount',num(s.amount));
  clearTimeout(_catAiTimer);_catAiSeq++;setCatAiTag(null);
  el('spendNote').value=s.note||'';
  el('spendDate').value=(s.date||'').split('T')[0];
  el('spendDeleteBtn').style.display='';
  buildSpendKindSeg();
  buildSpendCatSelect();
  buildSpendAccountSelect();
  syncSpendNoteCopy();
  openModal('spendModal');
  // Re-read an existing note.
  if((el('spendNote').value||'').trim())onSpendNoteInput();
}
const SPEND_PLACEHOLDER={
  expense:'Khaja at Bhatbhateni, Pathao ride…',
  income:'Salary, freelance payment, gift…',
};
const SPEND_NOTE_LBL={expense:'WHAT FOR',income:'WHAT FROM'};
function syncSpendNoteCopy(){
  const inp=el('spendNote');
  if(inp)inp.placeholder=SPEND_PLACEHOLDER[spendKind]||SPEND_PLACEHOLDER.expense;
  const lbl=el('spendNoteLbl');
  if(lbl)lbl.firstChild.nodeValue=(SPEND_NOTE_LBL[spendKind]||'WHAT FOR')+' ';
}
function setSpendKind(k){
  if(k===spendKind)return;
  spendKind=k;spendCatChoice=null;haptic('tap');
  el('spendModalTitle').textContent=(editingSpendId?'Edit ':'Add ')+(k==='income'?'Income':'Expense');
  buildSpendKindSeg();buildSpendCatSelect();buildSpendAccountSelect();syncSpendNoteCopy();
  // The note now means something different, so any read of the old one is void.
  _catAiSeq++;clearTimeout(_catAiTimer);setCatAiTag(null);
  if((el('spendNote').value||'').trim())onSpendNoteInput();
}
function buildSpendKindSeg(){
  el('spendKindExpense').classList.toggle('on',spendKind==='expense');
  el('spendKindIncome').classList.toggle('on',spendKind==='income');
}
// Online the category is always the model's (no manual override); offline it is a
// normal choice because only the keyword table is available.
function catFieldLocked(){ return navigator.onLine!==false; }
// Set by an offline manual pick; protects that choice for this entry only.
let spendCatPicked=false;
function buildSpendCatSelect(){
  const cats=spendKind==='income'?INCOME_CATS:SPEND_CATS;
  if(!spendCatChoice||!cats.some(c=>c.id===spendCatChoice))spendCatChoice=cats[0].id;
  const wrap=el('spendCatWrap');if(!wrap)return;
  if(!catFieldLocked()){
    buildCustomSelect('spendCatWrap',cats.map(c=>({value:c.id,label:c.label})),spendCatChoice,v=>{
      spendCatChoice=v;spendCatPicked=true;setCatAiTag(null);
    });
    return;
  }
  const c=cats.find(x=>x.id===spendCatChoice)||cats[0];
  wrap.innerHTML=`<div class="cat-readonly" id="catReadonly">
    <span class="cat-readonly-dot" style="background:${esc(c.color||'var(--accent)')}"></span>
    <span class="cat-readonly-lbl">${esc(c.label)}</span>
  </div>`;
}
// Connectivity can change with the sheet open.
function syncSpendCatField(){
  const m=el('spendModal');
  if(!m||!m.classList.contains('open'))return;
  buildSpendCatSelect();
  // Back online with no manual pick: read the note now.
  if(catFieldLocked()&&!spendCatPicked&&(el('spendNote').value||'').trim())onSpendNoteInput();
}
// Note to category: the keyword table answers instantly and offline; otherwise the
// model reads the note. A taught rule is never overruled; offline skips the model.
let _catAiTimer=null,_catAiSeq=0;
const _catAiCache=new Map();
// Only show that the model has not answered yet.
function setCatAiTag(mode){
  const t=el('spendCatAi');if(!t)return;
  if(mode!=='thinking'){t.hidden=true;return;}
  t.hidden=false;t.className='cat-ai-tag thinking';t.textContent='reading…';
}
// False means a read is still owed; saving hands it to the saved row.
let _catSettled=false;
// Debounced. The tag shows only while a request is in flight; every input bumps the
// sequence so stale replies are ignored and clear the tag.
const CAT_AI_WAIT=900;   // how long a person has to stop typing
function onSpendNoteInput(){
  clearTimeout(_catAiTimer);
  // Any change to the note invalidates every answer still on its way.
  const seq=++_catAiSeq;
  // An offline manual pick wins.
  if(spendCatPicked){setCatAiTag(null);return;}
  const note=(el('spendNote').value||'').trim();
  const g=guessCategoryRule(note,spendKind);
  if(g){
    // Show the keyword guess at once.
    if(g.cat!==spendCatChoice){spendCatChoice=g.cat;buildSpendCatSelect();}
    // A taught rule is final; a keyword guess is not.
    if(g.taught){setCatAiTag(null);_catSettled=true;return;}
  }
  if(note.length<3||!navigator.onLine){setCatAiTag(null);_catSettled=!!g||!note;return;}
  const key=spendKind+'|'+note.toLowerCase();
  if(_catAiCache.has(key)){
    setCatAiTag(null);
    const id=catFromReply(_catAiCache.get(key),spendKind);
    if(id){_catSettled=true;if(id!==spendCatChoice){spendCatChoice=id;buildSpendCatSelect();}}
    return;
  }
  // Wait for a pause before asking.
  setCatAiTag(null);_catSettled=false;
  _catAiTimer=setTimeout(()=>{
    if(seq!==_catAiSeq)return;
    setCatAiTag('thinking');
    askCatAi(note,spendKind,key,seq);
  },CAT_AI_WAIT);
}
// Reply to category id; adoptCategory() folds near-duplicates.
function catFromReply(reply,kind){
  if(!reply)return null;
  if(typeof reply==='string'){
    const valid=kind==='income'?INCOME_CATS:SPEND_CATS;
    return valid.some(c=>c.id===reply)?reply:null;
  }
  if(reply.propose&&reply.propose.label){
    const made=adoptCategory(reply.propose.label,kind,reply.propose.group,reply.propose.icon);
    if(made){saveState();return made.id;}
  }
  return null;
}
// With `spendId`, the answer goes to the saved row.
async function askCatAi(note,kind,key,seq,spendId){
  const cats=(kind==='income'?INCOME_CATS:SPEND_CATS).map(c=>({id:c.id,label:c.label}));
  try{
    const res=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({task:'categorise',note,kind,categories:cats})});
    const data=await res.json();
    const reply=res.ok?((data&&data.category)||(data&&data.propose?{propose:data.propose}:null)):null;
    if(res.ok){
      _catAiCache.set(key,reply);
      if(_catAiCache.size>200)_catAiCache.delete(_catAiCache.keys().next().value);
    }
    const id=catFromReply(reply,kind);
    if(spendId){
      // Only if the note is unchanged.
      const row=(state.spends||[]).find(x=>x.id===spendId);
      if(id&&row&&(row.note||'').trim()===note&&row.kind===kind&&row.category!==id){
        row.category=id;learnCategory(note,id,kind);saveState();
        if(currentPage==='spend')renderSpend();
        renderDashboard&&currentPage==='dash'&&renderDashboard();
      }
      return;
    }
    // Ignore stale replies.
    if(seq!==_catAiSeq)return;
    setCatAiTag(null);
    if(id){
      _catSettled=true;
      if(id!==spendCatChoice){spendCatChoice=id;buildSpendCatSelect();}
      // Learn it locally for next time.
      learnCategory(note,id,kind);saveState();
    }
  }catch(e){ if(!spendId&&seq===_catAiSeq)setCatAiTag(null); }
}
function defaultSpendAccount(){
  const saved=state.settings.lastSpendAccount;
  const ids=new Set(cashAccounts().map(a=>a.id));
  if(saved&&(ids.has(saved)||saved===CASH_NONE))return saved;
  return cashAccounts().length?cashAccounts()[0].id:CASH_NONE;
}
function buildSpendAccountSelect(){
  const opts=cashAccounts().map(a=>({value:a.id,label:a.name+' · '+fmt(a.value||0)}));
  opts.push({value:CASH_NONE,label:spendKind==='income'?'Not added to an account':'Not from a tracked account'});
  if(!opts.some(o=>o.value===spendAccountChoice))spendAccountChoice=opts[0].value;
  el('spendAccountLbl').textContent=spendKind==='income'?'RECEIVED INTO':'PAID FROM';
  buildCustomSelect('spendAccountWrap',opts,spendAccountChoice,v=>{
    spendAccountChoice=v;state.settings.lastSpendAccount=v;saveState();
  });
}

function saveSpend(){
  const rate=getCurrRate(currentCurrency.code);
  const raw=parseFloat(el('spendAmount').value);
  if(isNaN(raw)||raw<=0){toast('Enter an amount','error');return;}
  const amount=moneyBase('spendAmount');
  if(isNaN(amount)||amount<=0){toast('Enter an amount','error');return;}
  const note=(el('spendNote').value||'').trim();
  const date=el('spendDate').value?dayToISO(el('spendDate').value):new Date().toISOString();
  const acct=spendAccountChoice!==CASH_NONE?(state.assets||[]).find(a=>a.id===spendAccountChoice&&a.category==='liquidity'):null;
  const prev=editingSpendId?(state.spends||[]).find(x=>x.id===editingSpendId):null;

  // Reverse the old cash movement before applying the new one.
  if(prev)reverseSpendCash(prev);

  if(spendKind==='expense'&&acct){
    const bal=num(acct.value);
    if(bal+1e-9<amount){
      if(prev)applySpendCash(prev);   // put the reversal back, nothing changed
      toast(acct.name+' only has '+fmt(bal),'error');return;
    }
  }
  state.spends=state.spends||[];
  const rec={
    id:editingSpendId||uid(),
    kind:spendKind,
    amount,
    category:spendCatChoice,
    note:note||null,
    date,
    account:acct?acct.id:null,
    linkId:prev&&prev.linkId?prev.linkId:(acct?uid():null),
  };
  if(prev)Object.assign(prev,rec);else state.spends.push(rec);
  applySpendCash(rec);
  // Learn from manual picks.
  if(note&&spendCatPicked)learnCategory(note,spendCatChoice,spendKind);
  // Saving early doesn't lose the read; it continues against the saved row.
  if(!spendCatPicked)finishCategorising(rec.id,note,spendKind);
  else {clearTimeout(_catAiTimer);_catAiSeq++;setCatAiTag(null);}
  spendCatPicked=false;
  editingSpendId=null;
  saveState();closeModal('spendModal');renderAll();haptic('success');
  toast(rec.kind==='income'?'Income added':'Expense added','success');
}
// Hand an unfinished read to the saved row.
function finishCategorising(id,note,kind){
  clearTimeout(_catAiTimer);_catAiSeq++;setCatAiTag(null);
  if(_catSettled||!note||note.length<3||!navigator.onLine)return;
  // A rule the person taught has already settled it; nothing to hand over.
  {const g=guessCategoryRule(note,kind);if(g&&g.taught)return;}
  const key=kind+'|'+note.toLowerCase();
  if(_catAiCache.has(key)){
    const cid=catFromReply(_catAiCache.get(key),kind);
    const row=(state.spends||[]).find(x=>x.id===id);
    if(cid&&row&&row.category!==cid){row.category=cid;saveState();
      if(currentPage==='spend')renderSpend();}
    return;
  }
  askCatAi(note,kind,key,0,id);
}
// A spend's cash leg, tagged transfer.
function applySpendCash(s){
  if(!s||!s.account)return;
  const a=(state.assets||[]).find(x=>x.id===s.account);if(!a)return;
  const amt=num(s.amount);
  a.value=num(a.value)+(s.kind==='income'?amt:-amt);
  state.transactions=state.transactions||[];
  state.transactions.push({id:uid(),assetId:a.id,name:a.name,category:'liquidity',
    icon:a.icon||'wallet',txType:s.kind==='income'?'buy':'sell',qty:1,enteredQty:1,
    perUnit:amt,amount:amt,transfer:true,linkId:s.linkId,
    notes:(s.kind==='income'?'Income':'Spent')+(s.note?', '+s.note:''),date:s.date});
}
function reverseSpendCash(s){
  if(!s||!s.account||!s.linkId)return;
  const a=(state.assets||[]).find(x=>x.id===s.account);
  if(a)a.value=num(a.value)+(s.kind==='income'?-num(s.amount):num(s.amount));
  state.transactions=(state.transactions||[]).filter(t=>!(t.linkId===s.linkId&&t.transfer));
}
async function deleteSpend(){
  const s=(state.spends||[]).find(x=>x.id===editingSpendId);if(!s)return;
  const acct=s.account?(state.assets||[]).find(a=>a.id===s.account):null;
  let msg='This entry will be removed from your spending records.';
  if(acct){
    const after=num(acct.value)+(s.kind==='income'?-num(s.amount):num(s.amount));
    msg+=' '+acct.name+' goes '+(after>=0?'back to ':'to ')+fmt(after)+'.';
  }
  if(!await askConfirm({title:'Delete entry?',message:msg,confirmText:'Delete'}))return;
  const label=(s.note?s.note+' ':'')+(s.kind==='income'?'income':'expense')+' deleted';
  withUndo(label,['spends','assets','transactions'],()=>{
    reverseSpendCash(s);
    state.spends=(state.spends||[]).filter(x=>x.id!==s.id);
    saveState();
  });
  editingSpendId=null;
  closeModal('spendModal');renderAll();haptic('tap');
}

// The Spending page
let spendDayChart=null,spendPaceChart=null;
function renderSpend(){
  const k=currentSpendMonth();
  const sum=monthSummary(k);
  const prev=monthSummary(shiftMonth(k,-1));

  el('spendMonthLbl').textContent=monthLabel(k);
  const nextBtn=el('spendMonthNext');
  if(nextBtn){const atNow=isCurrentMonth(k);nextBtn.disabled=atNow;nextBtn.style.opacity=atNow?'.35':'';}

  // Headline: what left your pocket this month, against last month.
  el('spendTotal').textContent=fmt(sum.spent);
  const d=sum.spent-prev.spent;
  const dPct=prev.spent>0?(d/prev.spent)*100:null;
  const cmp=el('spendCompare');
  if(!prev.count&&!sum.count){cmp.textContent='Nothing recorded yet';cmp.className='spend-compare';}
  else if(!prev.count){cmp.textContent='No comparison for last month';cmp.className='spend-compare';}
  else{
    // Less spending is good here: colours flipped.
    cmp.textContent=(d>=0?'Up ':'Down ')+fmt(Math.abs(d))+(dPct!==null?' ('+Math.abs(dPct).toFixed(1)+'%)':'')+' from last month';
    cmp.className='spend-compare '+(d>0?'worse':'better');
  }

  el('spendStatIn').textContent=fmt(sum.income);
  el('spendStatOut').textContent=fmt(sum.spent);
  const savedEl=el('spendStatSaved');
  savedEl.textContent=(sum.saved>=0?'+':'−')+fmt(Math.abs(sum.saved));
  savedEl.style.color=sum.saved>=0?'var(--green)':'var(--red)';
  const rateEl=el('spendSaveRate');
  rateEl.textContent=sum.income>0?Math.round((sum.saved/sum.income)*100)+'%':'';
  rateEl.style.color=sum.saved>=0?'var(--green)':'var(--red)';
  rateEl.title=sum.income>0?'of income kept':'';

  renderSpendDayChart(k,sum);
  // Decide card visibility now, not in the deferred draw (a hidden card never draws).
  renderBudgetCard(k,sum);
  drawVisibleDeferred();
  renderWhereItWent(k,sum);
  renderRecurBills();
  renderSpendList(k);
}
// Bills view; the rules live on Plan.
function renderRecurBills(){
  const card=el('recurBillCard'), list=el('recurBillList');
  if(!card||!list)return;
  const bills=(state.recurs||[]).filter(r=>recurKind(r)==='bill');
  if(!bills.length){card.style.display='none';list.innerHTML='';return;}
  card.style.display='';
  const today=todayStr();
  const perMonth=bills.filter(r=>r.active!==false)
    .reduce((t,r)=>t+(r.amount||0)*(30/freqDays(r.freq)),0);
  const rows=bills.slice().sort((a,b)=>(a.nextDue||'').localeCompare(b.nextDue||'')).map(r=>{
    const sc=spendCat(r.spendCat);
    const paused=r.active===false;
    const due=r.nextDue||r.start;
    const overdue=!paused&&due<=today;
    return `<div class="bill-row" role="button" tabindex="0" onclick="openEditRecur('${jsAttr(r.id)}')">`
      +`<span class="bill-dot" style="background:${esc(sc.color||'#888')}"></span>`
      +`<div class="bill-info"><div class="bill-name">${esc(r.name)}</div>`
      +`<div class="bill-sub">${String(r.name||'').trim().toLowerCase()===String(sc.label||'').toLowerCase()?'':esc(sc.label)+' · '}${paused?'Paused':(overdue?'Due now':formatDate(due))}</div></div>`
      +`<div class="bill-amt">${fmt(r.amount)}</div>`
      +(overdue?`<button class="bill-run" onclick="event.stopPropagation();runRecurNow('${jsAttr(r.id)}')">Log</button>`:'')
      +`</div>`;
  }).join('');
  list.innerHTML=rows+`<div class="bill-foot">About ${esc(fmt(perMonth))} a month across ${esc(plural(bills.filter(r=>r.active!==false).length,'active bill'))}</div>`;
}

// Daily bars for the month.
function renderSpendDayChart(k,sum){
  const wrap=el('spendDayChartWrap');if(!wrap)return;
  const dim=daysInMonth(k);
  const data=[];for(let i=1;i<=dim;i++)data.push(+(sum.byDay[i]||0).toFixed(2));
  const any=data.some(v=>v>0);
  // An empty month still shows its empty bars.
  const empty=el('spendDayEmpty');
  if(empty){empty.style.display=any?'none':'';empty.className=any?'chart-empty':'chart-note';
    empty.textContent='Nothing logged yet this month';}
  wrap.style.display='';
  if(!window.Chart)return;
  const T=themeColors(),rate=getCurrRate(currentCurrency.code),sym=currentCurrency.sym;
  const today=isCurrentMonth(k)?new Date().getDate():0;
  const colors=data.map((v,i)=>(today&&i+1===today)?T.accent:cssVar('--green'));
  if(spendDayChart){try{spendDayChart.destroy();}catch(e){}}
  spendDayChart=new Chart(el('spendDayChart'),{type:'bar',
    data:{labels:data.map((_,i)=>i+1),datasets:[{data,backgroundColor:colors,borderRadius:3,barPercentage:.82,categoryPercentage:.92}]},
    options:{responsive:true,maintainAspectRatio:false,
      animation:{duration:state.settings.reduceMotion?0:400},
      plugins:{legend:{display:false},tooltip:{displayColors:false,callbacks:{
        title:c=>monthLabel(k).split(' ')[0]+' '+c[0].label,
        label:c=>sym+(c.parsed.y*rate).toFixed(2)}}},
      scales:{x:{ticks:{color:T.text3,font:{size:8},autoSkip:true,maxRotation:0,maxTicksLimit:10},grid:{display:false},border:{display:false}},
              y:{display:false,beginAtZero:true}}}});
}

function renderBudgetCard(k,sum){
  const st=budgetStatus(k);
  const card=el('budgetCard'),empty=el('budgetEmpty');
  if(!st){card.style.display='none';empty.style.display='';
    if(spendPaceChart){try{spendPaceChart.destroy();}catch(e){}spendPaceChart=null;}return;}
  card.style.display='';empty.style.display='none';

  const dot=el('budgetStatusDot');
  dot.className='budget-status '+st.statusId;
  el('budgetStatusLbl').textContent=st.statusLabel;
  el('budgetDayLbl').textContent='Day '+st.dayNow+' of '+st.dim;

  const over=st.left<0;
  el('budgetLeft').textContent=fmt(Math.abs(st.left));
  el('budgetLeftLbl').textContent=over?'over budget':'left';
  el('budgetLeft').style.color=over?'var(--red)':'var(--text)';
  el('budgetOf').textContent='of '+fmt(st.total)+' budgeted this month';

  el('budgetSpent').textContent=fmt(st.spent);
  el('budgetForecast').textContent=fmt(st.forecast);
  const fc=el('budgetForecastNote');
  fc.textContent=st.forecast>st.total?('↑ '+fmt(st.forecast-st.total)+' over at this pace'):('↓ '+fmt(st.total-st.forecast)+' under at this pace');
  fc.style.color=st.forecast>st.total?'var(--red)':'var(--green)';

  // Per-group bars, so "which part of my life is over budget" is one look.
  el('budgetGroups').innerHTML=SPEND_GROUPS.filter(g=>num(st.budget[g.id])>0||num(st.byGroup[g.id])>0).map(g=>{
    const b=num(st.budget[g.id]),s=num(st.byGroup[g.id]);
    const pct=b>0?Math.min(100,(s/b)*100):(s>0?100:0);
    const isOver=b>0&&s>b;
    return `<div class="bgrp"><div class="bgrp-top"><span class="bgrp-name"><i style="background:${g.color}"></i>${g.label}</span>`+
      `<span class="bgrp-nums${isOver?' over':''}">${fmt(s)}${b>0?' <em>/ '+fmt(b)+'</em>':' <em>unbudgeted</em>'}</span></div>`+
      `<div class="bgrp-bar"><span style="width:${pct.toFixed(1)}%;background:${isOver?'var(--red)':g.color}"></span></div></div>`;
  }).join('')||'<div class="spend-none">No budget groups set.</div>';

  // Usually below the fold; only the drawing waits.
  deferChart(el('budgetPaceChart'),()=>renderPaceChart(k,st),!spendPaceChart);
}
function renderPaceChart(k,st){
  const cv=el('budgetPaceChart');if(!cv||!window.Chart)return;
  const dim=st.dim,sum=monthSummary(k);
  const T=themeColors(),rate=getCurrRate(currentCurrency.code),sym=currentCurrency.sym;
  // Cumulative actual up to today, with the even-pace line behind it.
  const actual=[],paceLine=[];let run=0;
  for(let i=1;i<=dim;i++){
    run+=num(sum.byDay[i]);
    actual.push(i<=st.dayNow?+run.toFixed(2):null);
    paceLine.push(+(st.total*(i/dim)).toFixed(2));
  }
  if(spendPaceChart){try{spendPaceChart.destroy();}catch(e){}}
  spendPaceChart=new Chart(cv,{type:'line',
    data:{labels:actual.map((_,i)=>i+1),datasets:[
      {data:paceLine,borderColor:T.border,borderWidth:1.5,borderDash:[4,4],pointRadius:0,fill:false,tension:0},
      {data:actual,borderColor:st.statusId==='over'?cssVar('--red'):cssVar('--green'),borderWidth:2,pointRadius:0,
       fill:true,backgroundColor:(st.statusId==='over'?'rgba(239,100,97,.13)':'rgba(91,142,125,.15)'),tension:.25,spanGaps:false},
    ]},
    options:{responsive:true,maintainAspectRatio:false,
      animation:{duration:state.settings.reduceMotion?0:450},
      interaction:{mode:'index',intersect:false},
      plugins:{legend:{display:false},tooltip:{displayColors:false,callbacks:{
        title:c=>'Day '+c[0].label,
        label:c=>(c.datasetIndex===0?'Even pace ':'Spent ')+sym+(c.parsed.y*rate).toFixed(0)}}},
      // Room for the stroke at zero.
      layout:{padding:{top:3,bottom:3}},
      scales:{x:{display:false},y:{display:false,beginAtZero:true,grace:'3%'}}}});
}

// Stacked bar plus rows, by category.
function renderWhereItWent(k,sum){
  const host=el('whereList');if(!host)return;
  const entries=Object.entries(sum.byCat).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]);
  const bar=el('whereBar');
  if(!entries.length){
    bar.innerHTML='';
    host.innerHTML='<div class="spend-none">Nothing spent this month yet.</div>';
    return;
  }
  const total=entries.reduce((s,[,v])=>s+v,0);
  bar.innerHTML=entries.map(([id,v])=>
    `<span style="width:${((v/total)*100).toFixed(2)}%;background:${spendCat(id).color}" title="${esc(spendCat(id).label)}"></span>`
  ).join('');
  host.innerHTML=entries.map(([id,v])=>{
    const c=spendCat(id);
    const pct=(v/total)*100;
    return `<button class="where-row" onclick="filterSpendCat('${id}')">`+
      `<span class="where-dot" style="background:${c.color}"></span>`+
      `<span class="where-name">${esc(c.label)}</span>`+
      `<span class="where-pct">${pct.toFixed(1)}%</span>`+
      `<span class="where-amt">${fmt(v)}</span></button>`;
  }).join('');
}
function filterSpendCat(id){
  spendFilter=spendFilter===id?'all':id;
  haptic('tap');renderSpendList(currentSpendMonth());
  const list=el('spendListCard');if(list)list.scrollIntoView({behavior:'smooth',block:'start'});
}

function renderSpendList(k){
  const host=el('spendList');if(!host)return;
  let rows=spendsIn(k).slice().sort((a,b)=>new Date(b.date)-new Date(a.date));
  if(spendFilter!=='all')rows=rows.filter(s=>s.category===spendFilter&&s.kind!=='income');
  const chip=el('spendFilterChip');
  if(spendFilter==='all'){chip.style.display='none';}
  else{chip.style.display='';el('spendFilterName').textContent=spendCat(spendFilter).label;}
  if(!rows.length){
    host.innerHTML=`<div class="empty-state" style="padding:22px 12px"><div class="empty-ico">${svgIcon('wallet',26)}</div><h3>Nothing here yet</h3><p>${spendFilter==='all'?'Add what you spent and this month starts making sense.':'Nothing in this category this month.'}</p>${spendFilter==='all'?'<button class="empty-cta" onclick="openAddSpend(\'expense\')">Add an expense</button>':''}</div>`;
    return;
  }
  let html='',lastDay='';
  rows.forEach(s=>{
    const day=formatDate(s.date);
    if(day!==lastDay){html+=`<div class="ledger-date-hdr">${day}</div>`;lastDay=day;}
    const isIn=s.kind==='income';
    const c=catOf(s);
    const acct=s.account?(state.assets||[]).find(a=>a.id===s.account):null;
    html+=`<button class="spend-row${isPendingSync('spends',s.id)?' unsynced':''}" data-spend-id="${s.id}" onclick="openEditSpend('${s.id}')">`+
      (isPendingSync('spends',s.id)?pendingBadge():'')+
      `<span class="spend-ico" style="background:${isIn?'rgba(91,142,125,.16)':'rgba(255,255,255,.05)'};color:${isIn?'var(--green)':(c.color?readableInk(c.color):'var(--text2)')}">${svgIcon(c.icon||'box',15)}</span>`+
      `<span class="spend-info"><span class="spend-name">${esc(s.note||c.label)}</span>`+
      `<span class="spend-meta">${esc(c.label)}${acct?' · '+esc(acct.name):''}</span></span>`+
      `<span class="spend-amt ${isIn?'in':'out'}">${isIn?'+':'−'}${fmt(num(s.amount))}</span></button>`;
  });
  host.innerHTML=html;
}

// Budget editor
let budgetEditMonth=null,budgetEditScope='default';
function openBudgetModal(){
  budgetEditMonth=currentSpendMonth();
  // Open on this month's own budget if it has one, else the defaults.
  budgetEditScope=(state.settings.budgets&&state.settings.budgets[budgetEditMonth])?'month':'default';
  resetMoneyCcy(SPEND_GROUPS.map(g=>'bg-'+g.id));
  renderBudgetEditor();
  openModal('budgetModal');
}
function setBudgetScope(s){budgetEditScope=s;haptic('tap');renderBudgetEditor();}
function renderBudgetEditor(){
  el('budgetScopeDefault').classList.toggle('on',budgetEditScope==='default');
  el('budgetScopeMonth').classList.toggle('on',budgetEditScope==='month');
  el('budgetScopeMonth').textContent='Just '+monthLabel(budgetEditMonth).split(' ')[0];
  el('budgetScopeHint').textContent=budgetEditScope==='default'
    ? 'Applies to every month that has no plan of its own.'
    : 'Only '+monthLabel(budgetEditMonth)+'. Other months keep the default.';
  const src=budgetEditScope==='default'?budgetDefaults():((state.settings.budgets&&state.settings.budgets[budgetEditMonth])||budgetDefaults());
  const rate=getCurrRate(currentCurrency.code);
  el('budgetFields').innerHTML=SPEND_GROUPS.map(g=>{
    const v=num(src[g.id]);
    const r=moneyRate('bg-'+g.id);
    return `<div class="budget-field"><label class="form-lbl" for="bg-${g.id}"><i style="background:${g.color}"></i>${g.label}</label>`+
      `<div class="input-ccy-group">`+
      `<input class="form-input" id="bg-${g.id}" type="number" inputmode="decimal" step="any" placeholder="0" value="${v>0?(v*r).toFixed(0):''}" oninput="updateBudgetTotal()"/>`+
      `<div class="ccy-sel-wrap" id="bgccy-${g.id}"></div></div></div>`;
  }).join('');
  // Rebind after each render; innerHTML replaced the wrappers.
  SPEND_GROUPS.forEach(g=>bindMoneyCcy('bg-'+g.id,'bgccy-'+g.id,updateBudgetTotal));
  // Which categories land in which group, so the labels are not a guess.
  el('budgetLegend').innerHTML=SPEND_GROUPS.map(g=>{
    const cats=SPEND_CATS.filter(c=>c.group===g.id).map(c=>c.label);
    return cats.length?`<div class="budget-legend-row"><b>${g.label}</b><span>${cats.join(', ')}</span></div>`:'';
  }).join('');
  updateBudgetTotal();
}
function updateBudgetTotal(){
  let t=0;SPEND_GROUPS.forEach(g=>{const v=moneyBase('bg-'+g.id);if(!isNaN(v))t+=v;});
  el('budgetModalTotal').textContent=fmt(t);
  const inc=monthSummary(budgetEditMonth).income;
  const note=el('budgetVsIncome');
  if(inc>0&&t>0){
    const pct=(t/inc)*100;
    note.textContent=pct>100
      ? 'That is '+Math.round(pct)+'% of this month’s income, more than you brought in.'
      : 'That is '+Math.round(pct)+'% of this month’s income, leaving '+fmt(inc-t)+' to save.';
    note.style.color=pct>100?'var(--red)':'var(--text3)';
  }else note.textContent='';
}
function saveBudget(){
  const rate=getCurrRate(currentCurrency.code);
  const out={};let any=false;
  SPEND_GROUPS.forEach(g=>{
    const v=moneyBase('bg-'+g.id);
    if(!isNaN(v)&&v>0){out[g.id]=v;any=true;}
  });
  if(budgetEditScope==='default'){
    state.settings.budgetDefaults=out;
  }else{
    state.settings.budgets=state.settings.budgets||{};
    if(any)state.settings.budgets[budgetEditMonth]=out;
    else delete state.settings.budgets[budgetEditMonth];
  }
  saveState();closeModal('budgetModal');renderSpend();haptic('success');
  toast(any?'Budget saved':'Budget cleared','success');
}
// Seed a first budget from last month's spending.
function seedBudgetFromLastMonth(){
  const last=monthSummary(shiftMonth(currentSpendMonth(),-1));
  if(!last.count){toast('No spending last month to copy','error');return;}
  const rate=getCurrRate(currentCurrency.code);
  SPEND_GROUPS.forEach(g=>{
    setMoneyField('bg-'+g.id,num(last.byGroup[g.id]),0);
  });
  updateBudgetTotal();haptic('tap');
  toast('Filled from last month','success');
}



// GOAL PROJECTION
// Whether the monthly contribution reaches the target by the date, and by how much it misses.
function goalProjection(target,saved,monthly,dateStr){
  const t=num(target),s=num(saved),m=num(monthly);
  if(t<=0)return null;
  const remaining=Math.max(0,t-s);
  if(remaining<=0)return {done:true,target:t,saved:s};
  if(m<=0&&!dateStr)return null;
  const now=new Date();
  let monthsLeft=null,due=null;
  if(dateStr){
    due=parseDay(dateStr);
    if(isNaN(due))due=null;
    else monthsLeft=(due.getFullYear()-now.getFullYear())*12+(due.getMonth()-now.getMonth())
                    +((due.getDate()>=now.getDate())?0:-1);
  }
  const out={done:false,target:t,saved:s,monthly:m,remaining,due,monthsLeft};
  // What you would need to put away to land exactly on the date.
  if(monthsLeft!==null)out.needPerMonth=monthsLeft>0?remaining/monthsLeft:remaining;
  // Where the current rate actually lands you.
  if(m>0){
    out.monthsToTarget=Math.ceil(remaining/m);
    const reach=new Date(now.getFullYear(),now.getMonth()+out.monthsToTarget,now.getDate());
    out.reachDate=reach;
    if(monthsLeft!==null){
      out.projectedByDue=s+m*Math.max(0,monthsLeft);
      out.shortfall=Math.max(0,t-out.projectedByDue);
      out.onTrack=out.shortfall<=0.005;
      out.monthsEarly=out.onTrack?Math.max(0,monthsLeft-out.monthsToTarget):0;
    }
  }
  if(monthsLeft!==null&&monthsLeft<0)out.overdue=true;
  return out;
}
function renderGoalProjection(){
  const host=el('goalProjection');if(!host)return;
  const rate=getCurrRate(currentCurrency.code);
  const target=moneyBase('goalTarget')||0;
  const saved=moneyBase('goalSaved')||0;
  const monthly=moneyBase('goalMonthly')||0;
  const p=goalProjection(target,saved,monthly,el('goalDate').value||null);
  if(!p||p.done){host.style.display='none';destroyGoalProjChart();return;}
  host.style.display='';

  const dot=el('gpStatus'),verdict=el('gpVerdict'),line=el('gpLine');
  let cls='risk',word='Needs a plan',text='';
  if(p.overdue){cls='over';word='Past its date';
    text='The target date has gone. Push it back, or put in '+fmt(p.remaining)+' to finish it.';}
  else if(p.onTrack===true){cls='on';word='On track';
    text='At '+fmt(p.monthly)+' a month you reach '+fmt(p.target)+' by '+fmtMonthYear(p.reachDate)+
         (p.monthsEarly>0?', '+p.monthsEarly+' month'+(p.monthsEarly===1?'':'s')+' early.':'.');}
  else if(p.onTrack===false){cls='over';word='Short';
    text='At '+fmt(p.monthly)+' a month you land on '+fmt(p.projectedByDue)+', '+fmt(p.shortfall)+
         ' short by '+fmtMonthYear(p.due)+'. '+fmt(p.needPerMonth)+' a month closes it.';}
  else if(p.needPerMonth!=null){cls='risk';word='No contribution set';
    text='Put in '+fmt(p.needPerMonth)+' a month to reach '+fmt(p.target)+' by '+fmtMonthYear(p.due)+'.';}
  else{cls='risk';word='No date set';
    text='At '+fmt(p.monthly)+' a month you get there around '+fmtMonthYear(p.reachDate)+'.';}
  dot.className='gp-status '+cls;
  verdict.textContent=word;
  line.textContent=text;

  const stats=[];
  stats.push(['STILL NEEDED',fmt(p.remaining)]);
  if(p.needPerMonth!=null)stats.push(['NEEDED / MONTH',fmt(p.needPerMonth)]);
  if(p.monthsToTarget!=null)stats.push(['AT THIS RATE',p.monthsToTarget+' month'+(p.monthsToTarget===1?'':'s')]);
  el('gpStats').innerHTML=stats.map(([l,v])=>`<div><div class="gp-stat-l">${l}</div><div class="gp-stat-v">${v}</div></div>`).join('');

  renderGoalProjChart(p);
}
function fmtMonthYear(d){
  return d instanceof Date&&!isNaN(d)?d.toLocaleDateString(undefined,{month:'short',year:'numeric'}):'-';
}
let goalProjChart=null;
function destroyGoalProjChart(){if(goalProjChart){try{goalProjChart.destroy();}catch(e){}goalProjChart=null;}}
function renderGoalProjChart(p){
  const cv=el('goalProjChart');if(!cv||!window.Chart)return;
  // Show the longer horizon.
  const span=Math.max(1,Math.min(120,Math.max(p.monthsLeft||0,p.monthsToTarget||0)+1));
  const labels=[],saved=[],targetLine=[];
  for(let i=0;i<=span;i++){
    const dte=new Date();dte.setMonth(dte.getMonth()+i);
    labels.push(fmtMonthYear(dte));
    saved.push(+(p.saved+(p.monthly||0)*i).toFixed(2));
    targetLine.push(+p.target.toFixed(2));
  }
  const T=themeColors(),rate=getCurrRate(currentCurrency.code),sym=currentCurrency.sym;
  const good=p.onTrack!==false;
  destroyGoalProjChart();
  goalProjChart=new Chart(cv,{type:'line',data:{labels,datasets:[
    {data:targetLine,borderColor:T.border,borderWidth:1.5,borderDash:[4,4],pointRadius:0,fill:false},
    {data:saved,borderColor:good?cssVar('--green'):cssVar('--red'),borderWidth:2.5,pointRadius:0,
     tension:.1,fill:true,backgroundColor:good?'rgba(91,142,125,.14)':'rgba(200,80,80,.12)'},
  ]},options:{responsive:true,maintainAspectRatio:false,
    animation:{duration:state.settings.reduceMotion?0:400},
    interaction:{mode:'index',intersect:false},
    plugins:{legend:{display:false},tooltip:{displayColors:false,callbacks:{
      label:c=>(c.datasetIndex===0?'Target ':'Saved ')+sym+(c.parsed.y*rate).toFixed(0)}}},
    scales:{x:{ticks:{color:T.text3,font:{size:8},maxRotation:0,autoSkip:true,maxTicksLimit:5},
               grid:{display:false},border:{display:false}},
            y:{display:false,beginAtZero:true}}}});
}

// INVESTMENT INCOME
// Dividends and interest, separate from realised gains.
function incomeTxs(){
  return (state.transactions||[]).filter(t=>t&&t.txType==='income');
}
function buildIncomeReport(){
  const rows=incomeTxs();
  if(!rows.length)return null;
  let total=0;const byMonth={},bySource={},byKind={};
  rows.forEach(t=>{
    const amt=num(t.amount);total+=amt;
    const k=String(t.date||'').slice(0,7);
    if(k)byMonth[k]=(byMonth[k]||0)+amt;
    const name=stripParens(txDisplayName(t)||'Unknown');
    bySource[name]=(bySource[name]||0)+amt;
    const kind=t.incomeKind||'other';
    byKind[kind]=(byKind[kind]||0)+amt;
  });
  const months=Object.keys(byMonth).sort();
  // Average over elapsed months, not months with a payment.
  const first=new Date(months[0]+'-01'),now=new Date();
  const span=Math.max(1,(now.getFullYear()-first.getFullYear())*12+(now.getMonth()-first.getMonth())+1);
  const sources=Object.entries(bySource).sort((a,b)=>b[1]-a[1]);
  return {total,monthlyAvg:total/span,months,byMonth,sources,byKind,count:rows.length,
          since:months[0],spanMonths:span};
}
let incomeChart=null;
function renderIncomeReport(){
  const card=el('incomeCard');if(!card)return;
  const r=buildIncomeReport();
  if(!r){card.style.display='none';if(incomeChart){try{incomeChart.destroy();}catch(e){}incomeChart=null;}return;}
  card.style.display='';
  el('incomeTotal').textContent=fmt(r.total);
  el('incomeAvg').textContent=fmt(r.monthlyAvg);
  el('incomeSince').textContent=r.count+' payment'+(r.count===1?'':'s')+' since '+monthLabel(r.since);

  el('incomeSources').innerHTML=r.sources.slice(0,8).map(([n,v])=>{
    const pct=r.total>0?(v/r.total)*100:0;
    return `<div class="inc-src"><span class="inc-src-n">${esc(n)}</span>`+
      `<span class="inc-src-bar"><i style="width:${pct.toFixed(1)}%"></i></span>`+
      `<span class="inc-src-v">${fmt(v)}</span></div>`;
  }).join('');

  const cv=el('incomeChart');
  if(!cv||!window.Chart)return;
  // The last 12 calendar months, gaps included.
  const labels=[],vals=[],cum=[];
  const end=new Date();let running=0;
  const start=new Date(end.getFullYear(),end.getMonth()-11,1);
  const before=r.months.filter(m=>m<monthKey(start));
  before.forEach(m=>{running+=r.byMonth[m];});
  for(let i=0;i<12;i++){
    const dte=new Date(end.getFullYear(),end.getMonth()-11+i,1);
    const k=monthKey(dte);
    const v=num(r.byMonth[k]);running+=v;
    labels.push(dte.toLocaleDateString(undefined,{month:'short'}));
    vals.push(+v.toFixed(2));cum.push(+running.toFixed(2));
  }
  const T=themeColors(),rate=getCurrRate(currentCurrency.code),sym=currentCurrency.sym;
  if(incomeChart){try{incomeChart.destroy();}catch(e){}}
  incomeChart=new Chart(cv,{data:{labels,datasets:[
    {type:'bar',data:vals,backgroundColor:cssVar('--green'),borderRadius:4,barPercentage:.7,order:2},
    {type:'line',data:cum,borderColor:T.accent,borderWidth:2,pointRadius:0,tension:.3,yAxisID:'y2',order:1,fill:false},
  ]},options:{responsive:true,maintainAspectRatio:false,
    animation:{duration:state.settings.reduceMotion?0:450},
    interaction:{mode:'index',intersect:false},
    plugins:{legend:{display:false},tooltip:{displayColors:false,callbacks:{
      label:c=>(c.datasetIndex===0?'This month ':'Total ')+sym+(c.parsed.y*rate).toFixed(0)}}},
    scales:{x:{ticks:{color:T.text3,font:{size:8.5},maxRotation:0},grid:{display:false},border:{display:false}},
            y:{display:false,beginAtZero:true},
            y2:{display:false,beginAtZero:true,position:'right'}}}});
}

// COMPOSITION TREEMAP
// Every holding sized by value, tinted by performance. Squarified, in DOM so labels stay
// crisp and tiles tappable.
function squarify(items,x,y,w,h,out){
  if(!items.length)return out;
  if(items.length===1){out.push({...items[0],x,y,w,h});return out;}
  const total=items.reduce((s,i)=>s+i.value,0);
  // Split where the running total passes half; recurse.
  let acc=0,split=0;
  for(let i=0;i<items.length;i++){
    acc+=items[i].value;
    if(acc>=total/2){split=i+1;break;}
  }
  split=Math.min(Math.max(split,1),items.length-1);
  const aSum=items.slice(0,split).reduce((s,i)=>s+i.value,0);
  const ratio=total>0?aSum/total:0.5;
  if(w>=h){
    const aw=w*ratio;
    squarify(items.slice(0,split),x,y,aw,h,out);
    squarify(items.slice(split),x+aw,y,w-aw,h,out);
  }else{
    const ah=h*ratio;
    squarify(items.slice(0,split),x,y,w,ah,out);
    squarify(items.slice(split),x,y+ah,w,h-ah,out);
  }
  return out;
}
// Green for gains, red for losses, intensity by size.
function treemapTint(pct){
  if(pct===null||pct===undefined)return 'var(--card2)';
  // Below 0.05% is neutral.
  if(Math.abs(pct)<0.05)return 'var(--card2)';
  const mag=Math.min(1,Math.abs(pct)/25);
  const a=(0.13+mag*0.42).toFixed(3);
  return pct>=0?`rgba(91,142,125,${a})`:`rgba(200,80,80,${a})`;
}
// Holdings under this share roll into one openable tile.
const TM_MIN_SHARE=0.012;
let tmShowAll=false;
function tmToggleAll(){tmShowAll=!tmShowAll;renderTreemap();haptic('tap');}
// Map (by size) or list (names every holding).
let tmView=(typeof localStorage!=='undefined'&&localStorage.getItem('pf_tm_view')==='list')?'list':'map';
function setTmView(v){
  tmView=v==='list'?'list':'map';
  try{localStorage.setItem('pf_tm_view',tmView);}catch(e){}
  renderTreemap();haptic('tap');
}
function renderTmList(items,total){
  const host=el('treemapList');if(!host)return;
  host.innerHTML=items.map(i=>{
    const share=total>0?(i.value/total)*100:0;
    const flat=i.pct!=null&&Math.abs(i.pct)<0.05;
    const pctTxt=i.pct==null?'':(flat?'0.0%':(i.pct>=0?'+':'')+i.pct.toFixed(1)+'%');
    const col=i.pct==null||flat?'var(--text3)':(i.pct>=0?'var(--green)':'var(--red)');
    return `<button class="tm-row" onclick="openAssetDetail('${jsAttr(i.id)}')" title="${esc(i.name)} ${fmt(i.value)}">`
      +`<span class="tm-row-bar" style="width:${Math.max(2,Math.min(100,share))}%;background:${treemapTint(i.pct)}"></span>`
      +`<span class="tm-row-nm">${esc(i.name)}</span>`
      +`<span class="tm-row-sh">${share<0.1?'<0.1':share.toFixed(1)}%</span>`
      +`<span class="tm-row-val">${fmt(i.value)}</span>`
      +`<span class="tm-row-pct" style="color:${col}">${pctTxt||'&middot;'}</span>`
      +`</button>`;
  }).join('');
}
function renderTreemap(){
  const host=el('treemap');if(!host)return;
  const items=(state.assets||[]).map(a=>({
    id:a.id,name:stripParens(a.name),value:getAssetCurrentValue(a),pct:getAssetPnLPct(a),
  })).filter(i=>i.value>0).sort((a,b)=>b.value-a.value);
  const card=el('treemapCard');
  if(items.length<2){if(card)card.style.display='none';return;}
  if(card)card.style.display='';
  const total=items.reduce((s,i)=>s+i.value,0);
  const segMap=el('tmSegMap'),segList=el('tmSegList'),listEl=el('treemapList'),legend=el('treemapLegend');
  if(segMap)segMap.className=tmView==='map'?'on':'';
  if(segList)segList.className=tmView==='list'?'on':'';
  host.hidden=tmView!=='map';
  if(listEl)listEl.hidden=tmView!=='list';
  if(legend)legend.style.display=tmView==='map'?'':'none';
  if(tmView==='list'){
    renderTmList(items,total);
    const n=el('treemapNote');
    if(n)n.textContent=items.length+' holdings \u00b7 largest is '+stripParens(items[0].name)
      +' at '+((items[0].value/total)*100).toFixed(0)+'%';
    return;
  }
  const small=tmShowAll?[]:items.filter(i=>i.value/total<TM_MIN_SHARE);
  const laid=items.filter(i=>small.indexOf(i)<0);
  if(small.length){
    laid.push({id:'__rest',name:small.length+' smaller',
      value:small.reduce((s,i)=>s+i.value,0),pct:null});
    laid.sort((a,b)=>b.value-a.value);
  }
  // The box grows with the tile count so tiles stay readable.
  host.classList.remove('tm-tall');
  host.style.aspectRatio='auto';
  host.style.height=Math.round(Math.min(640,Math.max(230,150+laid.length*26)))+'px';
  const W=100,H=100;
  const tiles=squarify(laid,0,0,W,H,[]);
  const boxW=host.clientWidth||360,boxH=parseFloat(host.style.height)||360;
  host.innerHTML=tiles.map(t=>{
    // A -0.04% move printed as − 0.0%, a minus sign in front of zero.
    const flat=t.pct!=null&&Math.abs(t.pct)<0.05;
    const pctTxt=t.pct==null?'':(flat?'0.0%':(t.pct>=0?'+':'')+t.pct.toFixed(1)+'%');
    // Label decisions in real pixels.
    const pxW=t.w/100*boxW,pxH=t.h/100*boxH;
    const showLabel=pxW>=34&&pxH>=14;
    // Value always; return as a second line when there is room.
    const showVal=pxW>=58&&pxH>=34;
    const showPct=pctTxt&&pxW>=58&&pxH>=54;
    const small=showLabel&&!showVal;
    const rest=t.id==='__rest';
    const act=rest?' onclick="tmToggleAll()"':` onclick="openAssetDetail('${t.id}')"`;
    const label=rest?t.name+', tap to show':esc(t.name);
    return `<button class="tm-tile${rest?' tm-rest':''}"${act} `+
      `style="left:${t.x}%;top:${t.y}%;width:${t.w}%;height:${t.h}%;`+
      `background:${treemapTint(t.pct)}" title="${label} ${fmt(t.value)}${pctTxt?' ('+pctTxt+')':''}">`+
      (showLabel?`<span class="tm-name${small?' tm-name-sm':''}">${esc(t.name)}</span>`:'')+
      (showVal?`<span class="tm-val">${fmt(t.value)}</span>`:'')+
      (showPct?`<span class="tm-pct" style="color:${flat?'var(--text3)':t.pct>=0?'var(--green)':'var(--red)'}">${pctTxt}</span>`:'')+
      `</button>`;
  }).join('');
  const drawn=tiles.filter(t=>t.id!=='__rest').length;
  const unnamed=tiles.filter(t=>t.id!=='__rest'
    &&!(t.w/100*boxW>=34&&t.h/100*boxH>=14)).length;
  const note=el('treemapNote');
  const head=items.length+' holdings · largest is '+esc(stripParens(items[0].name))+
    ' at '+((items[0].value/total)*100).toFixed(0)+'%';
  note.innerHTML=head+(small.length
    ? ' · '+small.length+' smallest grouped <button class="tm-link" onclick="tmToggleAll()">Show all</button>'
    : (tmShowAll&&drawn>1&&items.some(i=>i.value/total<TM_MIN_SHARE)
       ? ' · all '+drawn+' shown'+(unnamed?', '+unnamed+' too small to label':'')
         +' <button class="tm-link" onclick="tmToggleAll()">Group smallest</button>'
       : ''));
}


// ASSISTANT BUBBLE
// Draggable, snaps to the nearest side, tucks away after a few idle seconds.
const AI_BUBBLE_TUCK_MS = 2600;
function aiPrefs(){
  const p = state.settings.ai || {};
  return {
    bubble: p.bubble !== false,          // shown unless turned off
    header: p.header !== false,
    speed:  p.speed || 'normal',
    side:   p.side === 'left' ? 'left' : 'right',
    y:      typeof p.y === 'number' ? p.y : 0.62,   // fraction of the viewport
  };
}
function setAiPref(k, v){
  state.settings.ai = { ...(state.settings.ai || {}), [k]: v };
  saveState();
}
let _aiTuckTimer = null;
// Position in pixels as one transform, so the snap animates.
let _bubX = 0, _bubY = 0, _bubTucked = false, _bubReady = false;

function bubbleSize(){
  const b = el('aiBubble');
  return { w: (b && b.offsetWidth) || 50, h: (b && b.offsetHeight) || 50 };
}
// Rest position, clear of the header and nav.
function bubbleAnchor(side, yFrac){
  const { w, h } = bubbleSize();
  const vh = window.innerHeight, vw = window.innerWidth;
  return {
    x: side === 'left' ? 0 : vw - w,
    y: Math.max(70, Math.min(vh - h - 96, yFrac * vh)),
  };
}
// How far a tucked bubble sits past the edge.
function tuckOffset(){
  return bubbleSize().w * 0.46 * (aiPrefs().side === 'left' ? -1 : 1);
}
function paintBubble(){
  const b = el('aiBubble'); if (!b) return;
  const x = _bubX + (_bubTucked ? tuckOffset() : 0);
  b.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + _bubY.toFixed(1) + 'px,0)';
}
// Duration scales with distance.
function settleBubble(toX, toY){
  const b = el('aiBubble'); if (!b) return;
  const dist = Math.hypot(toX - _bubX, toY - _bubY);
  const dur = Math.max(0.28, Math.min(0.62, 0.26 + dist / 900));
  b.style.setProperty('--bub-dur', dur.toFixed(2) + 's');
  b.classList.remove('tucking');
  b.classList.add('settling');
  _bubX = toX; _bubY = toY;
  paintBubble();
}
function syncAiEntryPoints(){
  const p = aiPrefs();
  const b = el('aiBubble');
  if (b) {
    b.style.display = p.bubble ? 'flex' : 'none';
    b.classList.toggle('left', p.side === 'left');
    const a = bubbleAnchor(p.side, p.y);
    // First placement should not animate in from the corner of the screen.
    if (!_bubReady) { _bubReady = true; b.classList.add('no-anim-once'); }
    _bubX = a.x; _bubY = a.y;
    paintBubble();
    requestAnimationFrame(() => b.classList.remove('no-anim-once'));
    scheduleAiTuck();
  }
  const h = el('aiHdrBtn');
  if (h) h.style.display = p.header ? '' : 'none';
}
function scheduleAiTuck(){
  const b = el('aiBubble'); if (!b) return;
  clearTimeout(_aiTuckTimer);
  untuckBubble();
  if (!aiPrefs().bubble) return;
  _aiTuckTimer = setTimeout(() => {
    if (b.classList.contains('dragging')) return;
    if (document.body.classList.contains('tour-open')) return;
    _bubTucked = true;
    // Tucking uses an ease, not the spring.
    b.classList.remove('settling');
    b.classList.add('tucking');
    paintBubble();
  }, AI_BUBBLE_TUCK_MS);
}
function untuckBubble(){
  const b = el('aiBubble'); if (!b || !_bubTucked) return;
  _bubTucked = false;
  b.classList.remove('settling');
  b.classList.add('tucking');
  paintBubble();
}
function setupAiBubble(){
  const b = el('aiBubble'); if (!b || b._wired) return;
  b._wired = true;
  let grabX = 0, grabY = 0, baseX = 0, baseY = 0, moved = false, id = null;
  const onDown = (e) => {
    id = e.pointerId;
    b.setPointerCapture(id);
    grabX = e.clientX; grabY = e.clientY;
    baseX = _bubX; baseY = _bubY;
    moved = false;
    clearTimeout(_aiTuckTimer);
    _bubTucked = false;
    b.classList.remove('settling', 'tucking');
    b.classList.add('dragging');   // kills the transition, so drag is 1:1
    paintBubble();
  };
  const onMove = (e) => {
    if (id === null) return;
    const dx = e.clientX - grabX, dy = e.clientY - grabY;
    // A few pixels of slop, so a tap with a shaky thumb still counts as a tap.
    if (!moved && Math.hypot(dx, dy) < 6) return;
    moved = true;
    const { w, h } = bubbleSize();
    _bubX = Math.max(-w * 0.35, Math.min(window.innerWidth - w * 0.65, baseX + dx));
    _bubY = Math.max(60, Math.min(window.innerHeight - h - 70, baseY + dy));
    paintBubble();
  };
  const onUp = () => {
    if (id === null) return;
    try { b.releasePointerCapture(id); } catch (err) {}
    id = null;
    b.classList.remove('dragging');
    // Open on click, not pointerup: the synthetic click would land on the new overlay and close it.
    if (!moved) { scheduleAiTuck(); return; }
    // Magnet: whichever side the middle of the bubble ended up nearest.
    const { w } = bubbleSize();
    const side = (_bubX + w / 2) < window.innerWidth / 2 ? 'left' : 'right';
    const yFrac = _bubY / window.innerHeight;
    setAiPref('side', side); setAiPref('y', yFrac);
    b.classList.toggle('left', side === 'left');
    const a = bubbleAnchor(side, yFrac);
    settleBubble(a.x, a.y);
    scheduleAiTuck();
    haptic('tap');
  };
  b.addEventListener('click', (e) => {
    // A drag ends with a click too; that one is not a tap.
    if (moved) { moved = false; e.preventDefault(); e.stopPropagation(); return; }
    openAI(); scheduleAiTuck();
  });
  b.addEventListener('pointerdown', onDown);
  b.addEventListener('pointermove', onMove);
  b.addEventListener('pointerup', onUp);
  b.addEventListener('pointercancel', onUp);
  // Coming back to it un-tucks without needing a drag.
  b.addEventListener('pointerenter', () => { untuckBubble(); scheduleAiTuck(); });
  window.addEventListener('resize', () => {
    const p = aiPrefs();
    const a = bubbleAnchor(p.side, p.y);
    _bubX = a.x; _bubY = a.y;
    paintBubble();
  }, { passive: true });
}

// AI ASSISTANT ("Folio")
// Questions about the app's own numbers, via /api/ai so no key ships to the browser.
// The sheet states that a summary of the user's finances leaves the device.
let aiThread=[];            // [{role:'user'|'model', text}]
let aiBusy=false;
const AI_SUGGESTIONS=[
  'Where is most of my money sitting?',
  'What did I spend the most on this month?',
  'Am I on track with my budget?',
  'Which holding is dragging my portfolio down?',
  'How much am I owed, and is any of it overdue?',
  'How long until I reach my goals at this rate?',
  'Were my past sales good calls?',
  'How has my spending changed over the year?',
  'Is my portfolio drifting from my targets?',
  'When did I last back up?',
];

// Compact summary of the app's data: it is what the model reads and what leaves the device.
function aiSnapshot(){
  const rate=getCurrRate(currentCurrency.code);
  const M=v=>+(num(v)*rate).toFixed(2);
  const assets=(state.assets||[]).map(a=>{
    const cv=getAssetCurrentValue(a),pnl=getAssetPnL(a),pp=getAssetPnLPct(a);
    const o={name:stripParens(a.name),type:catLabel(a.category),value:M(cv)};
    if(a.category!=='liquidity'){
      o.cost=M((a.buyPrice||0)*assetUnits(a));
      if(pnl!==null)o.gain=M(pnl);
      if(pp!==null)o.gainPct=+pp.toFixed(2);
      if(a.qty!=null)o.qty=a.qty;
      if(a.unit)o.unit=a.unit;
      const per=getAssetCurrentPrice(a);
      if(per!=null)o.pricePerUnit=M(per);
      if(a.coinId&&livePrices[a.coinId]&&livePrices[a.coinId].change24h!=null)
        o.change24hPct=+Number(livePrices[a.coinId].change24h).toFixed(2);
    }else{
      o.accountType=a.liquidityType||'Account';
      if(a.interest)o.interestRatePct=+num(a.interest).toFixed(2);
      if(a.maturity)o.maturity=String(a.maturity).split('T')[0];
    }
    if(a.ticker)o.ticker=a.ticker;
    if(a.isNepse)o.market='NEPSE';
    if(a.date)o.since=String(a.date).split('T')[0];
    return o;
  });
  const byCat={};
  (state.assets||[]).forEach(a=>{
    const k=catLabel(a.category);
    byCat[k]=byCat[k]||{value:0,cost:0};
    byCat[k].value=+(byCat[k].value+M(getAssetCurrentValue(a))).toFixed(2);
    byCat[k].cost=+(byCat[k].cost+M(a.category==='liquidity'?(a.value||0):(a.buyPrice||0)*assetUnits(a))).toFixed(2);
  });
  const today=new Date();
  const debts=(state.debts||[]).map(d=>{
    const rem=debtRemaining(d);
    const o={name:stripParens(d.name),direction:d.type==='owed'?'they owe me':'I owe them',remaining:M(rem)};
    if(d.due){o.due=String(d.due).split('T')[0];if(rem>0&&parseDay(d.due)<today)o.overdue=true;}
    if(d.lentDate)o.since=String(d.lentDate).split('T')[0];
    if(d.note)o.note=d.note;
    const paid=(d.payments||[]).reduce((x,p)=>x+num(p.amount),0);
    if(paid>0){o.paidBack=M(paid);o.originally=M(num(d.amount));}
    if(d.interest&&d.interest.enabled){
      o.interest=d.interest.type==='pct'
        ? d.interest.rate+'% per '+d.interest.freq+(d.interest.compound?', compounding':', simple')
        : M(d.interest.flatAmount)+' flat per '+d.interest.freq;
    }
    return o;
  });
  const goals=(state.goals||[]).map(g=>({
    name:g.name,target:M(g.target),saved:M(g.saved),
    percent:g.target>0?+(((g.saved||0)/g.target)*100).toFixed(1):0,
    by:(g.date||g.deadline)?String(g.date||g.deadline).split('T')[0]:null,
    monthlyPlan:g.monthly?M(g.monthly):null,
    remaining:M(Math.max(0,num(g.target)-num(g.saved))),
    fundedBy:(g.linkedAssetIds||[]).map(id=>{
      const a=(state.assets||[]).find(x=>x.id===id);return a?stripParens(a.name):null;
    }).filter(Boolean),
  }));
  // Recurring investments: what is committed, and what is already overdue.
  const recurs=(state.recurs||[]).filter(r=>r.active!==false).map(r=>{
    const bill=recurKind(r)==='bill';
    const o={name:r.name,amount:M(r.amount),every:r.freq||'monthly',
      kind:bill?'bill (money out)':'investment (money in)',
      into:bill?spendCat(r.spendCat).label:catLabel(r.category)};
    if(!bill&&r.coinName)o.buys=r.coinName;
    if(r.nextDue){o.nextDue=String(r.nextDue).split('T')[0];
      if(parseDay(r.nextDue)<=today)o.dueNow=true;}
    if(r.runCount)o.timesRun=r.runCount;
    return o;
  });
  // Habits, so "am I sticking to it" is answerable.
  const hAnchor=habitMonthAnchor(),hDays=new Date(hAnchor.getFullYear(),hAnchor.getMonth()+1,0).getDate();
  const habitList=(habits()||[]).map(h=>({
    name:h.name,
    doneThisMonth:habitMonthCount(h.id,hAnchor),
    ofDays:hDays,
    goal:habitGoal(h,hDays),
    currentStreak:habitStreak(h.id),
  }));
  // Recent ledger in full plus income totals by kind.
  const ledger=(state.transactions||[]).slice().sort((a,b)=>
    new Date(b.date||0)-new Date(a.date||0));
  const recentTx=ledger.slice(0,30).map(t=>{
    const o={date:String(t.date||'').split('T')[0],what:stripParens(txDisplayName(t)),
      // The app's own wording (a deposit is not a purchase).
      type:(txTypeLabel(t)||'BUY').toLowerCase(),amount:M(t.amount)};
    if(t.enteredQty!=null||t.qty!=null)o.qty=t.enteredQty!=null?t.enteredQty:t.qty;
    if(t.enteredUnit)o.unit=t.enteredUnit;
    if(t.incomeKind)o.incomeKind=t.incomeKind;
    return o;
  });
  const incomeByKind={};
  ledger.filter(t=>(t.txType||t.type)==='income').forEach(t=>{
    const k=t.incomeKind||'Other';
    incomeByKind[k]=+((incomeByKind[k]||0)+M(t.amount)).toFixed(2);
  });
  const mk=currentSpendMonth(),sum=monthSummary(mk),st=budgetStatus(mk);
  const spendByCat={};
  Object.entries(sum.byCat).forEach(([id,v])=>{spendByCat[spendCat(id).label]=M(v);});
  const spending={month:mk,income:M(sum.income),spent:M(sum.spent),kept:M(sum.saved),byCategory:spendByCat};
  if(st)spending.budget={total:M(st.total),spent:M(st.spent),
    left:M(st.left),status:st.statusLabel,forecast:M(st.forecast),dayOfMonth:st.dayNow+'/'+st.dim};
  const lastMk=shiftMonth(mk,-1),last=monthSummary(lastMk);
  if(last.count)spending.lastMonth={month:lastMk,income:M(last.income),spent:M(last.spent)};

  // Everything the screens show. Never the PIN, session token or raw price cache.
  // Individual spends, not just totals.
  const spendRows=(state.spends||[]).slice()
    .sort((a,b)=>new Date(b.date||0)-new Date(a.date||0));
  const recentSpends=spendRows.slice(0,60).map(s=>{
    const o={date:String(s.date||'').split('T')[0],
      kind:s.kind==='income'?'income':'expense',
      amount:M(s.amount),category:spendCat(s.category).label};
    if(s.note)o.note=clip(s.note,60);
    if(s.account){const a=(state.assets||[]).find(x=>x.id===s.account);
      if(a)o.account=stripParens(a.name);}
    return o;
  });
  // A year of months, so a trend question has something to stand on.
  const spendHistory=[];
  for(let i=0;i<12;i++){
    const k=shiftMonth(mk,-i),m=monthSummary(k);
    if(!m.count&&i>1)continue;
    spendHistory.push({month:k,income:M(m.income),spent:M(m.spent),
      kept:M(m.income-m.spent),entries:m.count});
  }
  // Per-category budget.
  if(st){
    const bud=budgetFor(mk),byG={};
    SPEND_GROUPS.forEach(g=>{
      const planned=num(bud[g.id]);
      if(planned>0)byG[g.label]={planned:M(planned),spent:M(num(sum.byGroup&&sum.byGroup[g.id]))};
    });
    if(Object.keys(byG).length)spending.budget.byGroup=byG;
  }
  // Past sales against today's price, the same numbers the Reports card shows.
  let sellReview=null;
  try{
    const hs=hindsightRows(),HT=hindsightTotals(hs);
    if(hs.length)sellReview={
      totalSaved:M(HT.saved),totalMissed:M(HT.missed),net:M(HT.net),
      compared:HT.priced,noPriceToCompare:HT.unpriced,
      meaning:'positive means the price fell after selling, so selling saved that much; negative means it rose and that profit was missed',
      excludes:'commission, DP charges, capital gains tax, bonus or rights adjustments, and what was done with the proceeds',
      rows:hs.slice(0,25).map(r=>({name:stripParens(r.name),qty:r.qty,unit:r.unit,
        soldAt:M(r.sellPrice),nowAt:r.ltp===null?null:M(r.ltp),
        priceFrom:(HS_SRC[r.src]||{}).lbl||null,
        perUnit:r.diff===null?null:M(r.diff),
        savedOrMissed:r.total===null?null:M(r.total),sales:r.sales.length})),
    };
  }catch(e){}
  // What the person is aiming at, and how far the real book has drifted.
  let allocation=null;
  try{
    const t=allocTargets(),keys=Object.keys(t).filter(k=>num(t[k])>0);
    if(keys.length){
      const total=(state.assets||[]).reduce((x,a)=>x+getAssetCurrentValue(a),0);
      allocation=keys.map(k=>{
        const have=(state.assets||[]).filter(a=>a.category===k)
          .reduce((x,a)=>x+getAssetCurrentValue(a),0);
        const actual=total>0?(have/total)*100:0;
        return {category:catLabel(k),targetPct:+num(t[k]).toFixed(1),
          actualPct:+actual.toFixed(1),driftPct:+(actual-num(t[k])).toFixed(1),
          value:M(have)};
      });
    }
  }catch(e){}
  // Price sources and ages.
  const priceInfo={
    coinsAndMetals:lastPriceTs?relTime(lastPriceTs):'never fetched',
    online:navigator.onLine!==false,
  };
  if(typeof nepseAsOf!=='undefined'&&nepseAsOf){
    priceInfo.nepse=relTime(Date.parse(nepseAsOf));
    priceInfo.nepseStale=!!nepseStale;
    priceInfo.nepseSymbolsQuoted=Object.keys(nepsePrices||{}).length;
  }
  // Backup, sync and currency state.
  const appState={
    displayCurrency:currentCurrency.code,
    baseCurrency:baseCode(),
    signedIn:!!(typeof supabaseUser!=='undefined'&&supabaseUser),
    lastCloudSync:state.lastUpdated?relTime(Date.parse(state.lastUpdated)):'never',
    lastBackup:state.settings.lastBackupTs?relTime(state.settings.lastBackupTs):'never',
    autoBackup:state.settings.autoBackup!==false,
    balancesHidden:!!state.settings.hideBalance,
    appLock:!!state.settings.pinEnabled,
    version:'Paisafolio '+BUILD_ID,
    counts:{assets:(state.assets||[]).length,transactions:ledger.length,
      spendEntries:spendRows.length,debts:(state.debts||[]).length,
      goals:(state.goals||[]).length,habits:(habits()||[]).length,
      recurring:(state.recurs||[]).length},
  };

  const split=(typeof buildPnLSplit==='function')?buildPnLSplit():null;
  // Monthly net-worth points only.
  const hist=[];const seen=new Set();
  (getFilteredHistory()||[]).forEach(p=>{
    const k=String(p.date).slice(0,7);
    if(seen.has(k))return;seen.add(k);
    hist.push({month:k,netWorth:M(p.netWorth)});
  });
  return {
    currency:currentCurrency.code,symbol:currentCurrency.sym,
    today:today.toISOString().split('T')[0],
    netWorth:M(calcNetWorth()),
    totals:{
      assets:M((state.assets||[]).reduce((s,a)=>s+getAssetCurrentValue(a),0)),
      owedToMe:M((state.debts||[]).filter(d=>d.type==='owed').reduce((s,d)=>s+debtRemaining(d),0)),
      iOwe:M((state.debts||[]).filter(d=>d.type==='iowe').reduce((s,d)=>s+debtRemaining(d),0)),
    },
    realisedGain:split?M(split.realized):null,
    unrealisedGain:split?M(split.unrealized):null,
    byCategory:byCat,assets,debts,goals,spending,
    cashTotal:M((state.assets||[]).filter(a=>a.category==='liquidity')
      .reduce((x,a)=>x+getAssetCurrentValue(a),0)),
    recurring:recurs,
    habits:habitList,
    investmentIncomeByKind:incomeByKind,
    recentTransactions:recentTx,
    transactionCount:ledger.length,
    netWorthByMonth:hist.slice(-18),
    recentSpending:recentSpends,
    spendingByMonth:spendHistory,
    sellReview,
    allocationTargets:allocation,
    prices:priceInfo,
    app:appState,
  };
}

// Trim here to stay valid JSON under the server's cap; `trimmed` says what was dropped.
const AI_SNAPSHOT_BUDGET=120000;
function fitSnapshot(snap){
  const steps=[
    ['recentSpending',30],['recentTransactions',20],
    ['recentSpending',15],['spendingByMonth',6],
    ['recentTransactions',10],['netWorthByMonth',12],
  ];
  let out=snap,i=0;
  const size=()=>{try{return JSON.stringify(out).length;}catch(e){return 0;}};
  while(size()>AI_SNAPSHOT_BUDGET&&i<steps.length){
    const [key,n]=steps[i++];
    if(Array.isArray(out[key])&&out[key].length>n){
      out[key]=out[key].slice(0,n);
      out.trimmed=out.trimmed||{};
      out.trimmed[key]='only the most recent '+n+' are included';
    }
  }
  if(size()>AI_SNAPSHOT_BUDGET&&Array.isArray(out.assets)&&out.assets.length>150){
    out.assets=out.assets.slice(0,150);
    out.trimmed=out.trimmed||{};out.trimmed.assets='largest 150 only';
  }
  if(out.sellReview&&size()>AI_SNAPSHOT_BUDGET&&(out.sellReview.rows||[]).length>10){
    out.sellReview.rows=out.sellReview.rows.slice(0,10);
    out.trimmed=out.trimmed||{};out.trimmed.sellReview='top 10 rows only, totals are still complete';
  }
  return out;
}

function openAI(){
  renderAIThread();
  openModal('aiModal');
  // No auto-focus: the keyboard would cover the suggestions.
  bindAiViewport();
}
// No-op: interactive-widget=resizes-content (index.html) lets the keyboard resize the
// layout viewport, and the fixed overlay follows.
function bindAiViewport(){}
function releaseAiViewport(){}
function aiAsk(q){
  const inp=el('aiInput');
  if(inp)inp.value=q;
  sendAI();
}
async function sendAI(){
  if(aiBusy)return;
  const inp=el('aiInput');
  const q=(inp.value||'').trim();
  if(!q)return;
  inp.value='';autoGrowAI();
  aiThread.push({role:'user',text:q});
  aiBusy=true;
  renderAIThread(true);
  try{
    const res=await fetch('/api/ai',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        message:q,
        snapshot:fitSnapshot(aiSnapshot()),
        // Everything before this turn, so follow-ups have something to attach to.
        history:aiThread.slice(0,-1).slice(-12).map(t=>({role:t.role,text:t.text})),
      }),
    });
    let data=null;try{data=await res.json();}catch(e){}
    if(!res.ok||!data||data.error){
      aiThread.push({role:'model',text:(data&&data.error)||'Could not reach Folio.',
                     error:true,setup:!!(data&&data.setup),detail:data&&data.detail});
    }else{
      aiThread.push({role:'model',text:data.text||'No answer came back.',shown:0});
      aiBusy=false;
      await revealAnswer(aiThread[aiThread.length-1]);
      renderAIThread();
      haptic('tap');
      return;
    }
  }catch(e){
    aiThread.push({role:'model',
      text:navigator.onLine?'Could not reach Folio.':'You are offline. Folio needs a connection.',
      error:true});
  }
  aiBusy=false;
  renderAIThread();
  haptic('tap');
}
function clearAI(){aiThread=[];haptic('tap');renderAIThread();}
function autoGrowAI(){
  const t=el('aiInput');if(!t)return;
  t.style.height='auto';
  t.style.height=Math.min(120,t.scrollHeight)+'px';
}
function onAIKey(e){
  if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendAI();}
}
// Reveal speed for a whole answer (not real streaming); Instant skips it.
const AI_SPEEDS={instant:0,fast:9,normal:20,slow:38};   // ms between chunks
function aiRevealDelay(){
  const s=aiPrefs().speed;
  return AI_SPEEDS[s]!==undefined?AI_SPEEDS[s]:AI_SPEEDS.normal;
}
let _aiRevealStop=false;
function revealAnswer(msg){
  const delay=aiRevealDelay();
  if(delay===0||state.settings.reduceMotion){msg.shown=msg.text.length;return Promise.resolve();}
  _aiRevealStop=false;
  return new Promise(resolve=>{
    const total=msg.text.length;
    // Whole words per step.
    const step=()=>{
      if(_aiRevealStop){msg.shown=total;renderAIThread();resolve();return;}
      let next=msg.text.indexOf(' ',msg.shown+1);
      if(next===-1)next=total;
      msg.shown=Math.min(total,next+1);
      renderAIThread();
      if(msg.shown>=total){resolve();return;}
      setTimeout(step,delay);
    };
    setTimeout(step,delay);
  });
}
// Tapping the thread while it unrolls shows the rest at once.
function finishAiReveal(){_aiRevealStop=true;}
function renderAIThread(thinking){
  const host=el('aiThread');if(!host)return;
  const send=el('aiSendBtn');if(send)send.disabled=aiBusy;
  el('aiClearBtn').style.display=aiThread.length?'':'none';
  if(!aiThread.length&&!thinking){
    host.innerHTML=`<div class="ai-intro">`+
      `<div class="ai-intro-ico">${svgIcon('zap',22)}</div>`+
      `<h3>Ask Folio</h3>`+
      `<p>Folio reads everything already in this app: your holdings, debts, goals, spending, budget, habits and history. Nothing else.</p>`+
      `<div class="ai-chips">${AI_SUGGESTIONS.map(s=>`<button class="ai-chip" onclick="aiAsk(${JSON.stringify(s).replace(/"/g,'&quot;')})">${esc(s)}</button>`).join('')}</div>`+
      `<div class="ai-privacy">To answer, a summary of your figures is sent to a third-party AI service through this app's own server. Your data is not stored there by this app.</div>`+
      `</div>`;
    return;
  }
  let html=aiThread.map(t=>{
    if(t.role==='user')return `<div class="ai-msg user">${esc(t.text)}</div>`;
    if(t.error)return `<div class="ai-msg err">${esc(t.text)}${t.detail?`<span class="ai-err-detail">${esc(t.detail)}</span>`:''}</div>`;
    const revealing=t.shown!==undefined&&t.shown<t.text.length;
    const body=revealing?t.text.slice(0,t.shown):t.text;
    return `<div class="ai-msg model${revealing?' revealing':''}">${mdLite(body)}</div>`;
  }).join('');
  if(thinking)html+=`<div class="ai-msg model thinking"><span></span><span></span><span></span></div>`;
  host.innerHTML=html;
  host.scrollTop=host.scrollHeight;
}

// Minimal markdown: escape everything, then restore known shapes (bold, code, lists, tables).
function mdLite(src){
  // Pull code spans before escaping; the placeholder is a control character.
  const code=[];
  const marked=String(src||'').replace(/`([^`\n]+)`/g,(m,c)=>{code.push(c);return '\u0001'+(code.length-1)+'\u0001';});
  const lines=esc(marked).split('\n');
  const inline=s=>s
    .replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>')
    .replace(/\u0001(\d+)\u0001/g,(m,i)=>'<code>'+esc(code[+i])+'</code>');
  let out='',list=null,tbl=null;
  const closeList=()=>{if(list){out+='</'+list+'>';list=null;}};
  const closeTbl=()=>{if(tbl){out+='</tbody></table></div>';tbl=null;}};
  for(let i=0;i<lines.length;i++){
    const raw=lines[i],line=raw.trim();
    // Table: a pipe row followed by a --- separator row.
    if(!tbl&&/^\|.*\|$/.test(line)&&/^\|[\s:|-]+\|$/.test((lines[i+1]||'').trim())){
      closeList();
      const cells=line.slice(1,-1).split('|').map(c=>inline(c.trim()));
      out+='<div class="ai-tbl-wrap"><table class="ai-tbl"><thead><tr>'+cells.map(c=>`<th>${c}</th>`).join('')+'</tr></thead><tbody>';
      tbl=true;i++;continue;
    }
    if(tbl){
      if(/^\|.*\|$/.test(line)){
        out+='<tr>'+line.slice(1,-1).split('|').map(c=>`<td>${inline(c.trim())}</td>`).join('')+'</tr>';
        continue;
      }
      closeTbl();
    }
    if(!line){closeList();continue;}
    const b=line.match(/^[-*•]\s+(.*)$/);
    if(b){if(list!=='ul'){closeList();out+='<ul>';list='ul';}out+=`<li>${inline(b[1])}</li>`;continue;}
    const n=line.match(/^\d+[.)]\s+(.*)$/);
    if(n){if(list!=='ol'){closeList();out+='<ol>';list='ol';}out+=`<li>${inline(n[1])}</li>`;continue;}
    const h=line.match(/^#{1,4}\s+(.*)$/);
    if(h){closeList();out+=`<h4>${inline(h[1])}</h4>`;continue;}
    closeList();
    out+=`<p>${inline(line)}</p>`;
  }
  closeList();closeTbl();
  return out;
}

// ANALYTICS
function compactNum(v){const a=Math.abs(v);if(a>=1e7)return (v/1e7).toFixed(2)+'Cr';if(a>=1e5)return (v/1e5).toFixed(2)+'L';if(a>=1e3)return (v/1e3).toFixed(1)+'K';return v.toFixed(0);}
function renderAnalytics(){const rate=getCurrRate(currentCurrency.code),sym=currentCurrency.sym,T=themeColors();const assets=state.assets;
  // Same function as the dashboard.
  const _PL=portfolioPnL();
  const invested=_PL.invested,current=_PL.current,realized=_PL.realized;
  const pnl=_PL.pnl,pp=_PL.pct;
  const sc=el('anStats');
  if(sc)sc.innerHTML=[['INVESTED',fmt(invested),'',''],['CURRENT VALUE',fmt(current),'',''],['TOTAL P&L',(pnl>=0?'+':'')+fmt(pnl),'all-time',pnl>=0?'var(--green)':'var(--red)'],['RETURN',(pp>=0?'+':'')+pp.toFixed(2)+'%','on invested',pp>=0?'var(--green)':'var(--red)']].map(([l,v,s,c])=>`<div class="an-stat"><div class="l">${l}</div><div class="v"${c?` style="color:${c}"`:''}>${v}</div>${s?`<div class="s"${c?` style="color:${c}"`:''}>${s}</div>`:''}</div>`).join('');
  const catColors={crypto:'#f5a623',stock:'#4a9eff',commodity:'#ffd700',liquidity:'#16d6a4',property:'#a78bfa',other:'#ff7b3a'};
  const cats={};assets.forEach(a=>{const c=a.category;if(!cats[c])cats[c]={inv:0,cur:0};const inv=c==='liquidity'?(a.value||0):((a.buyPrice||0)*assetUnits(a));cats[c].inv+=inv;cats[c].cur+=getAssetCurrentValue(a);});
  const catKeys=Object.keys(cats);
  const ctxC=el('catBarChart');
  deferChart(ctxC,()=>{
  if(anCatChart){try{anCatChart.destroy();}catch(e){}anCatChart=null;}
  if(ctxC&&window.Chart&&catKeys.length){anCatChart=new Chart(ctxC,{type:'bar',data:{labels:catKeys.map(catLabel),datasets:[{label:'Invested',data:catKeys.map(k=>cats[k].inv*rate),backgroundColor:T.text3,borderRadius:5,barPercentage:.7},{label:'Current',data:catKeys.map(k=>cats[k].cur*rate),backgroundColor:catKeys.map(k=>catColors[k]||'#888'),borderRadius:5,barPercentage:.7}]},options:{responsive:true,maintainAspectRatio:false,animation:{duration:state.settings.reduceMotion?0:550},plugins:{legend:{display:true,labels:{color:T.text2,font:{size:10},boxWidth:12}},tooltip:{callbacks:{label:c=>c.dataset.label+': '+sym+compactNum(c.parsed.y)}}},scales:{x:{ticks:{color:T.text2,font:{size:10}},grid:{display:false}},y:{ticks:{color:T.text3,font:{size:9},callback:v=>sym+compactNum(v)},grid:{color:T.border}}}}});}
  });
  const tw=el('catTableWrap');
  if(tw){if(!catKeys.length){tw.innerHTML='<div class="empty-state" style="padding:16px"><p style="font-size:11px">Add assets to see analytics</p></div>';}else{const rows=catKeys.map(k=>{const inv=cats[k].inv,cur=cats[k].cur,p=cur-inv,ppc=inv>0?p/inv*100:0,alloc=current>0?cur/current*100:0;return `<tr><td><span class="atype-chip" style="color:${readableInk(catColors[k]||'#888')};background:${(catColors[k]||'#888')}22">${catLabel(k)}</span></td><td>${fmt(inv)}</td><td style="font-weight:800">${fmt(cur)}</td><td class="${p>=0?'pos':'neg'}">${p>=0?'+':''}${fmt(p)}</td><td class="${ppc>=0?'pos':'neg'}">${ppc>=0?'+':''}${ppc.toFixed(1)}%</td><td>${alloc.toFixed(1)}%</td></tr>`;}).join('');tw.innerHTML=`<table class="atable atable-fixed"><colgroup><col class="col-cat"><col class="col-num"><col class="col-num"><col class="col-num"><col class="col-num"><col class="col-num"></colgroup><thead><tr><th>Category</th><th>Invested</th><th>Current</th><th><span class="th-full">Profit &amp; Loss</span><span class="th-short">P&amp;L</span></th><th>Return</th><th><span class="th-full">Allocation</span><span class="th-short">Alloc</span></th></tr></thead><tbody>${rows}</tbody></table>`;requestAnimationFrame(()=>initTableScrollFade('catTableWrap','catTableFade'));}}
  // Stablecoins are pegged; left out and noted.
  const stables=assets.filter(a=>isStablecoin(a)&&getAssetPnLPct(a)!==null);
  const perf=assets.filter(a=>!isStablecoin(a))
    .map(a=>({n:a.name,pp:getAssetPnLPct(a)})).filter(x=>x.pp!==null)
    .sort((a,b)=>b.pp-a.pp).slice(0,12);
  // Card visibility is decided outside the deferred draw.
  {const card=el('assetBarCard'),note=el('assetBarNote');
   // Nothing to plot without stablecoins.
   if(card)card.style.display=perf.length?'':'none';
   if(note){
     note.hidden=!(stables.length&&perf.length);
     if(stables.length)note.textContent=stables.map(a=>a.ticker||a.name).join(', ')
       +(stables.length>1?' are stablecoins, left out because they hold their value on purpose.'
                        :' is a stablecoin, left out because it holds its value on purpose.');
   }}
  const ctxA=el('assetBarChart');
  deferChart(ctxA,()=>{
  if(anAssetChart){try{anAssetChart.destroy();}catch(e){}anAssetChart=null;}
  if(ctxA&&window.Chart&&perf.length){anAssetChart=new Chart(ctxA,{type:'bar',data:{labels:perf.map(x=>x.n.length>10?x.n.slice(0,10)+'…':x.n),datasets:[{data:perf.map(x=>+x.pp.toFixed(2)),backgroundColor:perf.map(x=>x.pp>=0?T.green:T.red),borderRadius:5,barPercentage:.75, /* An unmoved holding gets a sliver, not a blank column */ minBarLength:3}]},options:{responsive:true,maintainAspectRatio:false,animation:{duration:state.settings.reduceMotion?0:550},plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>(c.parsed.y>=0?'+':'')+c.parsed.y+'%'}}},scales:{x:{ticks:{color:T.text2,font:{size:9},maxRotation:50,minRotation:30},grid:{display:false}},y:{ticks:{color:T.text3,font:{size:9},callback:v=>v+'%'},grid:{color:T.border}}}}});}
  });
  renderTreemap();
  deferChart(el('incomeChart'),()=>renderIncomeReport());
  const ctxM=el('monthlyChart');
  deferChart(ctxM,()=>{
  if(anMonthChart){try{anMonthChart.destroy();}catch(e){}anMonthChart=null;}
  const months={};(state.transactions||[]).forEach(t=>{if(t.txType==='sell'||t.txType==='income'||t.transfer)return;const d=new Date(t.date);if(isNaN(d))return;const k=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');months[k]=(months[k]||0)+(t.amount||0);});
  const mk=Object.keys(months).sort().slice(-12);
  if(ctxM&&window.Chart&&mk.length){anMonthChart=new Chart(ctxM,{type:'bar',data:{labels:mk,datasets:[{data:mk.map(k=>months[k]*rate),backgroundColor:T.accent,borderRadius:5,barPercentage:.7}]},options:{responsive:true,maintainAspectRatio:false,animation:{duration:state.settings.reduceMotion?0:550},plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>sym+compactNum(c.parsed.y)}}},scales:{x:{ticks:{color:T.text2,font:{size:9}},grid:{display:false}},y:{ticks:{color:T.text3,font:{size:9},callback:v=>sym+compactNum(v)},grid:{color:T.border}}}}});}
  });
  // These three are cheap DOM, not canvas, so they stay eager.
  renderPnLSplit();
  renderHindsight();
  renderAgeing();
  renderRebalance();
  deferChart(el('compositionChart'),()=>renderCompositionChart(themeColors(),currentCurrency.sym,getCurrRate(currentCurrency.code)));
  deferChart(el('debtTimeChart'),()=>renderDebtTimeChart(themeColors(),currentCurrency.sym,getCurrRate(currentCurrency.code)));
  deferChart(el('forecastChart'),()=>renderForecast());
  drawVisibleDeferred();
}

// Realised vs unrealised
function renderPnLSplit(){
  const body = el('pnlSplitBody'); if (!body) return;
  const s = buildPnLSplit();
  if (!s.sellCount && !s.priced) {
    body.innerHTML = `<div class="empty-state" style="padding:14px 4px"><p style="font-size:11.5px">Add a priced holding or record a sale to see banked gains against paper gains.</p></div>`;
    return;
  }
  const seg = (v, cls) => `<span class="split-seg ${cls}" style="flex:${Math.max(0.0001, Math.abs(v))}"></span>`;
  const rTone = s.realized >= 0 ? 'pos' : 'neg';
  const uTone = s.unrealized >= 0 ? 'pos' : 'neg';
  body.innerHTML = `
    <div class="split-bar">${seg(s.realized, rTone + ' a')}${seg(s.unrealized, uTone + ' b')}</div>
    <div class="split-rows">
      <div class="split-row">
        <span class="split-dot a"></span>
        <span class="split-name">Realised<span class="split-sub">${s.sellCount} sale${s.sellCount === 1 ? '' : 's'}, banked</span></span>
        <span class="split-val ${rTone}">${s.realized >= 0 ? '+' : ''}${fmt(s.realized)}</span>
      </div>
      <div class="split-row">
        <span class="split-dot b"></span>
        <span class="split-name">Unrealised<span class="split-sub">${s.priced} holding${s.priced === 1 ? '' : 's'}, on paper${s.unpriced ? `, ${s.unpriced} unpriced` : ''}</span></span>
        <span class="split-val ${uTone}">${s.unrealized >= 0 ? '+' : ''}${fmt(s.unrealized)}${s.unrealizedPct !== null ? ` <em>${s.unrealizedPct >= 0 ? '+' : ''}${s.unrealizedPct.toFixed(1)}%</em>` : ''}</span>
      </div>
      <div class="split-row total">
        <span class="split-dot" style="background:transparent"></span>
        <span class="split-name">Total</span>
        <span class="split-val ${s.total >= 0 ? 'pos' : 'neg'}">${s.total >= 0 ? '+' : ''}${fmt(s.total)}</span>
      </div>
    </div>
    ${s.months.length ? `<div class="chart-note">Realised by month: ${s.months.map((m, k) =>
        `<span class="mini-month ${s.monthly[k] >= 0 ? 'pos' : 'neg'}">${m.slice(5)}/${m.slice(2,4)} ${s.monthly[k] >= 0 ? '+' : '\u2212'}${compactNum(Math.abs(s.monthly[k]) * getCurrRate(currentCurrency.code))}</span>`).join('')}</div>` : ''}
    <div class="chart-note">Realised is money a completed sale actually returned. Unrealised is what your current holdings are worth on paper.</div>`;
}

// Receivables ageing
let ageingType = 'owed';
function setAgeingType(t){
  ageingType = t;
  el('ageSegOwed').classList.toggle('on', t === 'owed');
  el('ageSegIOwe').classList.toggle('on', t === 'iowe');
  haptic('tap'); renderAgeing();
}
function renderAgeing(){
  const body = el('ageingBody'); if (!body) return;
  const a = buildDebtAgeing(ageingType);
  const noun = ageingType === 'owed' ? 'owed to you' : 'you owe';
  if (!a) {
    body.innerHTML = `<div class="empty-state" style="padding:14px 4px"><p style="font-size:11.5px">Nothing outstanding ${esc(noun)} right now.</p></div>`;
    return;
  }
  const bars = a.buckets.filter(b => b.total > 0).map(b => {
    const pct = a.total > 0 ? (b.total / a.total) * 100 : 0;
    // Older money is redder, the bucket order carries the meaning.
    return `<div class="age-bucket">
      <div class="age-bucket-top"><span class="age-bucket-lbl">${b.label}</span><span class="age-bucket-val">${fmt(b.total)}</span></div>
      <div class="age-bucket-track"><span class="age-bucket-fill age-${b.key.replace('+','p')}" style="width:${pct.toFixed(1)}%"></span></div>
      <div class="age-bucket-sub">${b.count} ${b.count === 1 ? 'person' : 'people'} · ${pct.toFixed(0)}%</div>
    </div>`;
  }).join('');

  const list = a.rows.slice(0, 6).map(r => {
    const late = r.hasDue && r.overdueDays > 0;
    return `<div class="age-row">
      <span class="age-row-name">${esc(r.name)}</span>
      <span class="age-row-meta">${late ? `<span class="age-late">${r.overdueDays}d overdue</span>` : (r.hasDue ? 'due ' + formatDate(r.due) : 'no due date')} · ${r.ageDays}d old</span>
      <span class="age-row-amt">${fmt(r.amount)}</span>
    </div>`;
  }).join('');

  body.innerHTML = `
    <div class="age-headline">
      <span class="age-total">${fmt(a.total)}</span>
      <span class="age-total-sub">${a.rows.length} outstanding${a.overdueCount ? ` · <b class="age-late">${fmt(a.overdueTotal)} overdue</b>` : ''}</span>
    </div>
    <div class="age-buckets">${bars}</div>
    <div class="age-list">${list}</div>
    ${a.rows.length > 6 ? `<div class="chart-note">Showing the 6 oldest of ${a.rows.length}.</div>` : ''}
    ${a.noDueCount ? `<div class="chart-note">${a.noDueCount === 1 ? 'One entry has' : a.noDueCount + ' entries have'} no due date, so ${a.noDueCount === 1 ? 'it is' : 'they are'} never counted as overdue.</div>` : ''}`;
}

// Allocation vs target, and a buy-only rebalance plan
function openAllocTargets(){ resetMoneyCcy(['allocCashInput']);
  bindMoneyCcy('allocCashInput','allocCashCcyWrap',renderRebalance);
  renderAllocTargetRows(); openModal('allocTargetsModal'); }
function clearAllocTargets(){
  state.settings.allocTargets = {};
  saveState(); renderAllocTargetRows(); renderRebalance(); haptic('tap');
  toast('Targets cleared');
}
function renderAllocTargetRows(){
  const wrap = el('allocTargetRows'); if (!wrap) return;
  const t = allocTargets();
  wrap.innerHTML = CAT_ORDER.map(c => `
    <div class="alloc-target-row">
      <span class="alloc-dot" style="background:${NEWCAT_PALETTE[c]}"></span>
      <span class="alloc-target-name">${esc(catLabel(c))}</span>
      <input class="alloc-target-input" type="number" min="0" max="100" inputmode="numeric"
             value="${t[c] ? num(t[c]) : ''}" placeholder="0"
             aria-label="${esc(catLabel(c))} target percent"
             oninput="setAllocTarget('${c}', this.value); syncAllocTotal(); renderRebalance();"/>
      <span class="alloc-target-pct">%</span>
    </div>`).join('');
  syncAllocTotal();
}
function syncAllocTotal(){
  const totEl = el('allocTargetTotal'); if (!totEl) return;
  const total = allocTargetTotal();
  totEl.textContent = total.toFixed(0) + '%';
  // Targets are normalised; a total other than 100 is only a note.
  totEl.style.color = total === 0 ? 'var(--text3)'
    : Math.abs(total - 100) < 0.5 ? 'var(--green)' : 'var(--accent)';
  totEl.title = Math.abs(total - 100) < 0.5 ? 'Adds up to 100%'
    : 'Does not add to 100%, weights are scaled proportionally';
}
function renderRebalance(){
  const body = el('rebalanceBody'); if (!body) return;
  // In base currency, which is what buildRebalancePlan compares against.
  const cash = moneyBase('allocCashInput');
  const plan = buildRebalancePlan(isNaN(cash) ? 0 : cash);
  const rate = getCurrRate(currentCurrency.code);

  if (!plan) {
    body.innerHTML = `<div class="empty-state" style="padding:14px 4px">
      <p style="font-size:11.5px">Set a target for each category to see how far you have drifted, and where new money should go.</p>
      <button class="empty-cta" onclick="openAllocTargets()">${svgIcon('target',14)} Set targets</button></div>`;
    return;
  }

  const bar = plan.rows.map(r =>
    `<span class="alloc-bar-seg" style="width:${r.currentPct.toFixed(2)}%;background:${NEWCAT_PALETTE[r.cat]}" title="${esc(catLabel(r.cat))} ${r.currentPct.toFixed(1)}%"></span>`).join('');

  const rows = plan.rows.map(r => {
    const off = Math.abs(r.driftPct) >= 5;
    const sign = r.driftPct >= 0 ? '+' : '\u2212';
    return `<div class="alloc-row">
      <span class="alloc-dot" style="background:${NEWCAT_PALETTE[r.cat]}"></span>
      <span class="alloc-row-name">${esc(catLabel(r.cat))}</span>
      <span class="alloc-row-val">${fmt(r.value)}</span>
      <span class="alloc-row-now">${r.currentPct.toFixed(1)}%</span>
      <span class="alloc-row-tgt">${r.targetPct.toFixed(0)}%</span>
      <span class="alloc-row-drift ${off ? 'off' : ''}">${sign}${Math.abs(r.driftPct).toFixed(1)}</span>
    </div>`;
  }).join('');

  const buys = plan.buys.length
    ? `<div class="alloc-plan">
         <div class="alloc-plan-hdr">To deploy ${fmt(plan.cash)}, buy</div>
         ${plan.buys.map(b => `<div class="alloc-plan-row">
           <span class="alloc-dot" style="background:${NEWCAT_PALETTE[b.cat]}"></span>
           <span class="alloc-plan-name">${esc(catLabel(b.cat))}</span>
           <span class="alloc-plan-amt">${fmt(b.amount)}</span></div>`).join('')}
         <div class="alloc-plan-foot">Worst drift ${plan.maxDrift.toFixed(1)}% \u2192 ${plan.maxDriftAfter.toFixed(1)}% after. Nothing is sold.</div>
       </div>`
    : `<div class="alloc-plan-foot" style="margin-top:10px">Worst drift is ${plan.maxDrift.toFixed(1)}%. Enter an amount under Set targets to see where new money should go.</div>`;

  body.innerHTML = `
    <div class="alloc-bar" role="img" aria-label="Current allocation by category">${bar}</div>
    <div class="alloc-row alloc-row-head">
      <span class="alloc-dot" style="background:transparent"></span>
      <span class="alloc-row-name">CATEGORY</span>
      <span class="alloc-row-val">VALUE</span>
      <span class="alloc-row-now">NOW</span>
      <span class="alloc-row-tgt">TGT</span>
      <span class="alloc-row-drift">DRIFT</span>
    </div>
    ${rows}
    ${plan.unallocatedPct > 0.5 ? `<div class="alloc-plan-foot">Targets add up to ${plan.targetSum.toFixed(0)}%, weights are scaled proportionally.</div>` : ''}
    ${buys}`;
}

// Portfolio mix over time
let anCompChart=null;
function renderCompositionChart(T,sym,rate){
  const c=el('compositionChart'); if(!c) return;
  if(anCompChart){try{anCompChart.destroy();}catch(e){}anCompChart=null;}
  const data=buildCompositionSeries();
  const note=el('compositionNote');
  if(!data||!window.Chart){
    if(note)note.textContent=data?'Chart unavailable offline.':'Add a few transactions to see how your mix changes over time.';
    c.style.display='none'; return;
  }
  c.style.display='';
  if(note)note.textContent='What you put into each category, at cost, over time.';
  anCompChart=new Chart(c,{type:'line',data:{
    labels:data.dates.map(ds=>new Date(ds+'T00:00:00Z').toLocaleDateString('en',{month:'short',day:'numeric',timeZone:'UTC'})),
    datasets:data.cats.map(cat=>({
      label:catLabel(cat),
      data:data.series[cat].map(v=>v*rate),
      borderColor:NEWCAT_PALETTE[cat],backgroundColor:hexA(NEWCAT_PALETTE[cat],.5),
      borderWidth:1.5,fill:true,tension:.3,pointRadius:0,pointHoverRadius:4,
    }))},
    options:{responsive:true,maintainAspectRatio:false,
      animation:{duration:state.settings.reduceMotion?0:450},
      interaction:{intersect:false,mode:'index'},
      plugins:{legend:{display:true,labels:{color:T.text2,font:{size:9},boxWidth:10,padding:8}},
        tooltip:{callbacks:{label:x=>x.dataset.label+': '+sym+compactNum(x.parsed.y)}}},
      scales:{x:{stacked:true,ticks:{color:T.text3,font:{size:8},maxTicksLimit:6,maxRotation:0},grid:{display:false}},
              y:{stacked:true,ticks:{color:T.text3,font:{size:9},callback:v=>sym+compactNum(v)},grid:{color:T.border}}}}});
}

// Lending over time
let anDebtTimeChart=null;
function renderDebtTimeChart(T,sym,rate){
  const c=el('debtTimeChart'); if(!c) return;
  if(anDebtTimeChart){try{anDebtTimeChart.destroy();}catch(e){}anDebtTimeChart=null;}
  const data=buildDebtSeries();
  const note=el('debtTimeNote');
  if(!data||!window.Chart){
    if(note)note.textContent=data?'Chart unavailable offline.':'Record a loan or a debt to see its history here.';
    c.style.display='none'; return;
  }
  c.style.display='';
  if(note)note.textContent='Principal still owed, based on lend and repayment dates. Interest not included.';
  anDebtTimeChart=new Chart(c,{type:'line',data:{
    labels:data.dates.map(ds=>new Date(ds+'T00:00:00Z').toLocaleDateString('en',{month:'short',day:'numeric',timeZone:'UTC'})),
    datasets:[
      {label:'Owed to me',data:data.series.owed.map(v=>v*rate),
       borderColor:T.green,backgroundColor:hexA(T.green,.16),borderWidth:2,fill:true,tension:.25,pointRadius:0,pointHoverRadius:4},
      {label:'I owe',data:data.series.iowe.map(v=>-v*rate),
       borderColor:T.red,backgroundColor:hexA(T.red,.16),borderWidth:2,fill:true,tension:.25,pointRadius:0,pointHoverRadius:4},
    ]},
    options:{responsive:true,maintainAspectRatio:false,
      animation:{duration:state.settings.reduceMotion?0:450},
      interaction:{intersect:false,mode:'index'},
      plugins:{legend:{display:true,labels:{color:T.text2,font:{size:9},boxWidth:10,padding:8}},
        tooltip:{callbacks:{label:x=>x.dataset.label+': '+sym+compactNum(Math.abs(x.parsed.y))}}},
      scales:{x:{ticks:{color:T.text3,font:{size:8},maxTicksLimit:6,maxRotation:0},grid:{display:false}},
              y:{ticks:{color:T.text3,font:{size:9},callback:v=>(v<0?'\u2212':'')+sym+compactNum(Math.abs(v))},grid:{color:T.border}}}}});
}
// NET WORTH FORECAST
let forecastMonths=6;
function setForecastRange(m,btn){forecastMonths=m;document.querySelectorAll('#page-analytics .seg button[data-fc]').forEach(b=>b.classList.remove('on'));if(btn)btn.classList.add('on');haptic('tap');renderForecast();}
function linregNetWorth(){
  const hist=(state.pnlHistory||[]).slice().sort((a,b)=>a.date<b.date?-1:1);
  if(hist.length<2)return null;
  const t0=new Date(hist[0].date).getTime();
  const pts=hist.map(p=>({x:(new Date(p.date).getTime()-t0)/86400000,y:p.netWorth}));
  const n=pts.length,sx=pts.reduce((s,p)=>s+p.x,0),sy=pts.reduce((s,p)=>s+p.y,0);
  const sxx=pts.reduce((s,p)=>s+p.x*p.x,0),sxy=pts.reduce((s,p)=>s+p.x*p.y,0);
  const denom=(n*sxx-sx*sx);if(denom===0)return null;
  const slope=(n*sxy-sx*sy)/denom,intercept=(sy-slope*sx)/n;
  const meanY=sy/n;const ssTot=pts.reduce((s,p)=>s+(p.y-meanY)**2,0);
  const ssRes=pts.reduce((s,p)=>{const pred=slope*p.x+intercept;return s+(p.y-pred)**2;},0);
  const r2=ssTot>0?Math.max(0,1-ssRes/ssTot):0;
  const residStd=Math.sqrt(ssRes/Math.max(1,n-2));
  return{slope,intercept,t0,lastX:pts[pts.length-1].x,lastY:pts[pts.length-1].y,r2,residStd,n};
}
function renderForecast(){
  const T=themeColors(),rate=getCurrRate(currentCurrency.code),sym=currentCurrency.sym;
  const fc=el('forecastChart'),stats=el('forecastStats'),note=el('forecastNote');
  const reg=linregNetWorth();
  if(anForecastChart){try{anForecastChart.destroy();}catch(e){}anForecastChart=null;}
  if(!reg||reg.n<3){
    if(note)note.textContent='Add a few days of history to unlock forecasting.';
    if(stats)stats.innerHTML='';
    return;
  }
  const dailySlope=reg.slope;
  const horizonDays=forecastMonths*30;
  const histPts=(state.pnlHistory||[]).slice().sort((a,b)=>a.date<b.date?-1:1);
  const labels=[],actual=[],projected=[],upper=[],lower=[];
  histPts.forEach(p=>{labels.push(formatDate(p.date));actual.push(+(p.netWorth*rate).toFixed(2));projected.push(null);upper.push(null);lower.push(null);});
  const steps=Math.min(24,Math.max(6,Math.round(forecastMonths)));
  const stepDays=horizonDays/steps;
  actual[actual.length-1]=actual[actual.length-1];projected[projected.length-1]=actual[actual.length-1];
  upper[upper.length-1]=actual[actual.length-1];lower[lower.length-1]=actual[actual.length-1];
  for(let i=1;i<=steps;i++){
    const x=reg.lastX+stepDays*i;
    const y=reg.slope*x+reg.intercept;
    const d=new Date(reg.t0+x*86400000);
    labels.push(d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:i===steps?'numeric':undefined}));
    actual.push(null);
    projected.push(+(y*rate).toFixed(2));
    const band=reg.residStd*rate*Math.sqrt(i)*0.6;
    upper.push(+((y*rate)+band).toFixed(2));
    lower.push(+Math.max(0,(y*rate)-band).toFixed(2));
  }
  if(fc&&window.Chart){
    anForecastChart=new Chart(fc,{type:'line',data:{labels,datasets:[
      {label:'Range',data:upper,borderWidth:0,pointRadius:0,backgroundColor:'rgba(245,166,35,.08)',fill:'+1',tension:.3},
      {label:'Range low',data:lower,borderWidth:0,pointRadius:0,backgroundColor:'transparent',fill:false,tension:.3},
      {label:'Actual',data:actual,borderColor:T.accent,backgroundColor:T.accent,borderWidth:2.5,pointRadius:0,tension:.3,spanGaps:false},
      {label:'Projected',data:projected,borderColor:T.text2,borderDash:[5,4],borderWidth:2,pointRadius:0,tension:.3,spanGaps:true}
    ]},options:{responsive:true,maintainAspectRatio:false,animation:{duration:state.settings.reduceMotion?0:550},
      plugins:{legend:{display:false},tooltip:{filter:c=>c.dataset.label==='Actual'||c.dataset.label==='Projected',callbacks:{label:c=>(c.dataset.label==='Actual'?'Net worth: ':'Projected: ')+sym+compactNum(c.parsed.y)}}},
      interaction:{mode:'index',intersect:false},
      scales:{x:{ticks:{color:T.text3,font:{size:9},maxTicksLimit:8},grid:{display:false}},y:{ticks:{color:T.text3,font:{size:9},callback:v=>sym+compactNum(v)},grid:{color:T.border}}}}});
  }
  const finalProjected=projected[projected.length-1];
  const currentNW=reg.lastY*rate;
  const growthPct=currentNW>0?((finalProjected-currentNW)/currentNW*100):0;
  const monthlyRate=dailySlope*30*rate;
  const confidence=reg.r2>=.7?'High':reg.r2>=.4?'Moderate':'Low';
  if(stats)stats.innerHTML=[
    [`IN ${forecastMonths}${forecastMonths>=12?'M':'M'}`,sym+compactNum(finalProjected),(growthPct>=0?'+':'')+growthPct.toFixed(1)+'%'],
    ['MONTHLY TREND',(monthlyRate>=0?'+':'')+sym+compactNum(Math.abs(monthlyRate)),monthlyRate>=0?'growing':'declining'],
    ['CONFIDENCE',confidence,'R² '+reg.r2.toFixed(2)]
  ].map(([l,v,s])=>`<div class="forecast-stat"><div class="l">${l}</div><div class="v">${v}</div><div class="s text3" style="font-size:9px;margin-top:2px">${s}</div></div>`).join('');
  if(note)note.textContent=`Linear trend from ${reg.n} data points · for guidance only, not financial advice.`;
}
// CSV EXPORT
function downloadCSV(name,rows){const csv=rows.map(r=>r.map(csvEscape).join(',')).join('\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();haptic('success');toast('CSV exported','success');}
function exportHoldingsCSV(){const rate=getCurrRate(currentCurrency.code),sym=currentCurrency.code;if(!state.assets.length){toast('No assets to export','error');return;}const rows=[['Name','Category','Holdings','Unit','Avg Buy ('+sym+')','Current Price ('+sym+')','Invested ('+sym+')','Value ('+sym+')','P&L ('+sym+')','Return %']];
  state.assets.forEach(a=>{const inv=a.category==='liquidity'?(a.value||0):((a.buyPrice||0)*assetUnits(a));const cv=getAssetCurrentValue(a),pnl=getAssetPnL(a),pp=getAssetPnLPct(a),cur=getAssetCurrentPrice(a);rows.push([stripParens(a.name),catLabel(a.category),a.qty||'',a.unit||'',a.buyPrice?(a.buyPrice*rate).toFixed(2):'',cur!=null?(cur*rate).toFixed(2):'',(inv*rate).toFixed(2),(cv*rate).toFixed(2),pnl!=null?(pnl*rate).toFixed(2):'',pp!=null?pp.toFixed(2):'']);});
  downloadCSV('paisafolio-holdings-'+todayStr()+'.csv',rows);}
// INIT
async function init(){
  checkAppLockOnLoad();
  loadState();loadDevicePrefs();applyFonts();loadPriceCache();
  selectedAssetType=state.settings.lastAssetType||'crypto';
  selectedCommodityId=state.settings.lastCommodityId||'gold';
  selectedCommodityUnit=state.settings.lastCommodityUnit||'gram';
  selectedLiquidityType=state.settings.lastLiquidityType||'savings';
  adoptViewPrefs();
  syncAssetDebtUIFromSettings();
  initSupabase();
  applyTheme(state.settings.theme||'dark');
  if(state.settings.reduceMotion)document.body.classList.add('no-anim');
  syncPrivacyIcon();
  currentCurrency=CURRENCIES.find(c=>c.code===state.settings.currency)||CURRENCIES[0];
  try{pruneCustomCats();}catch(e){}
  // Measure after layout.
  requestAnimationFrame(()=>positionNavIndicator());
  syncAdminVisibility();
  restorePage();
  updateCurrLabels();renderAll();renderTicker();renderCurrGrid();renderSettings();updateSyncLabel();
  bindPnlPills();bindCatPills();bindModalOverlays();setupKeyboard();setupGestures();watchSwitchRows();setupModalDrag();setupRipple();setupAiBubble();syncAiEntryPoints();setupAuthKeyListeners();
  document.addEventListener('click',()=>{document.querySelectorAll('.custom-select-trigger.open').forEach(t=>t.classList.remove('open'));document.querySelectorAll('.custom-select-dropdown.open').forEach(d=>d.classList.remove('open'));document.querySelectorAll('.ccy-sel-trigger.open').forEach(t=>t.classList.remove('open'));document.querySelectorAll('.ccy-sel-dropdown.open').forEach(d=>d.classList.remove('open'));document.querySelectorAll('.coin-suggestions').forEach(s=>s.style.display='none');},{passive:true});
  setTimeout(()=>{const sp=el('splash');if(sp)sp.classList.add('hide');},650);
  // Auto-backup after first paint.
  setTimeout(()=>{syncBackupsSub();maybeAutoBackup().then(syncBackupsSub);},2500);
  if(!state.settings.onboarded)setTimeout(startOnboarding,900);
  checkRecoveryUrl();
  registerSW();
  await Promise.all([fetchPrices(false),fetchFxRates()]);
  runDueRecurs(true);
  setupSmartPolling();
  window.addEventListener('online',()=>{updateConnBanner();toast('Back online','success');refreshAll();syncSpendCatField();});
  window.addEventListener('offline',()=>{updateConnBanner();syncSpendCatField();});
}
// SMART POLLING
// Timers run only while the tab is visible.
let _priceTimer=null,_labelTimer=null;
const PRICE_POLL_MS=90000,LABEL_POLL_MS=15000,STALE_AFTER_MS=120000;

function startPolling(){
  stopPolling();
  _priceTimer=setInterval(()=>{fetchPrices(false);fetchFxRates();},PRICE_POLL_MS);
  _labelTimer=setInterval(updateSyncLabel,LABEL_POLL_MS);
}
function stopPolling(){
  if(_priceTimer){clearInterval(_priceTimer);_priceTimer=null;}
  if(_labelTimer){clearInterval(_labelTimer);_labelTimer=null;}
}
function setupSmartPolling(){
  startPolling();
  document.addEventListener('visibilitychange',()=>{
    // Pause CSS animations while hidden.
    document.body.classList.toggle('page-hidden',document.hidden);
    if(document.hidden){stopPolling();return;}
    // Back on screen: only spend a request if what we're showing is stale.
    const stale=!lastPriceTs||(Date.now()-lastPriceTs)>STALE_AFTER_MS;
    if(stale&&navigator.onLine){fetchPrices(false);fetchFxRates();}
    updateSyncLabel();
    startPolling();
  });
  // Belt and braces: a frozen/discarded page shouldn't leave timers behind.
  window.addEventListener('pagehide',stopPolling);
}


// Horizontal scrollers get edge fades only on the side with more content.
const SCROLL_X_SELECTOR='.movers-scroll,.cat-bar,.pnl-filter-row,.assets-summary-scroll,'
  +'.ledger-filter-row,.asset-type-row,.tx-summary,.insights,.ledger-summary,.hcal-filter';
const SCROLL_Y_SELECTOR='.sync-pending-list';
function updateScrollHint(node,vertical){
  const slack=vertical?(node.scrollHeight-node.clientHeight):(node.scrollWidth-node.clientWidth);
  if(slack<=4){node.dataset.scroll='none';return;}
  const pos=vertical?node.scrollTop:node.scrollLeft;
  const atStart=pos<=2,atEnd=pos>=slack-2;
  node.dataset.scroll=atStart?'end':(atEnd?'start':'middle');
}
// Inline-styled scrollers the stylesheet can't target: let the gesture chain to the page
// at the end. Sheets, pages and the palette keep containment.
const SCROLL_CHAIN_SKIP='.modal-body,.page,.modal-overlay,.cmdk';
function relaxScrollChaining(root){
  const scope=root&&root.querySelectorAll?root:document;
  let nodes;
  try{ nodes=scope.querySelectorAll('[style*="overflow"]'); }catch(e){ return; }
  nodes.forEach(node=>{
    if(node._scrollChained)return;
    if(node.matches&&node.matches(SCROLL_CHAIN_SKIP))return;
    if(node.closest&&node.closest('.cmdk'))return;
    const cs=getComputedStyle(node);
    const scrolls=/(auto|scroll)/.test(cs.overflowY)||/(auto|scroll)/.test(cs.overflowX);
    if(!scrolls)return;
    node._scrollChained=true;
    node.style.overscrollBehaviorY='auto';
  });
}
function bindScrollHints(root){
  const scope=root||document;
  try{ relaxScrollChaining(root); }catch(e){}
  const wire=(sel,cls,vertical)=>scope.querySelectorAll(sel).forEach(node=>{
    node.classList.add(cls);
    if(!node._scrollHintBound){
      node._scrollHintBound=true;
      node.addEventListener('scroll',()=>{
        if(node._scrollHintRaf)return;
        node._scrollHintRaf=requestAnimationFrame(()=>{node._scrollHintRaf=null;updateScrollHint(node,vertical);});
      },{passive:true});
    }
    updateScrollHint(node,vertical);
  });
  wire(SCROLL_X_SELECTOR,'scroll-x',false);
  wire(SCROLL_Y_SELECTOR,'scroll-y',true);
}
window.addEventListener('resize',()=>bindScrollHints(),{passive:true});

// SELLING, IN HINDSIGHT
// (selling price - today's price) × quantity: positive means selling saved money.
// Ignores what the money did next, fees and taxes, and splits or bonus shares.
const HS_SRC={
  live:  {lbl:'live',       why:'',                              tone:'var(--green)'},
  nepse: {lbl:'NEPSE',      why:'',                              tone:'var(--green)'},
  manual:{lbl:'your price', why:'',                              tone:'var(--text3)'},
  none:  {lbl:'no price',   why:'no current price for it yet',   tone:'var(--text3)'},
  gone:  {lbl:'removed',    why:'no longer in your assets',      tone:'var(--text3)'},
};
// Track where the comparison price came from; typed prices are not market prices.
function hindsightPrice(a,txName){
  if(a){
    if(a.coinId&&livePrices[a.coinId])return {price:getAssetCurrentPrice(a),src:'live'};
    const q=nepseQuote(a);
    if(q&&q.price>0)return {price:nprToBase(q.price),src:'nepse'};
    if(a.currentPrice!=null&&a.currentPrice!==''&&!isNaN(a.currentPrice))
      return {price:num(a.currentPrice),src:'manual'};
    return {price:null,src:'none'};
  }
  // Deleted after selling: the exchange still quotes it.
  const k=String(txName||'').trim().toUpperCase();
  if(k&&nepsePrices[k]&&nepsePrices[k].price>0)
    return {price:nprToBase(nepsePrices[k].price),src:'nepse'};
  return {price:null,src:'gone'};
}
// One row per thing sold, with the quantity-weighted average sale price.
function hindsightRows(){
  const groups=new Map();
  (state.transactions||[]).forEach(t=>{
    if(!t||t.txType!=='sell'||t.transfer)return;
    // A withdrawal from a bank account is stored as a sell. It is not one.
    if(t.category==='liquidity')return;
    const qty=num(t.qty),per=num(t.perUnit);
    if(!(qty>0)||!(per>0))return;
    const key=t.assetId||('name:'+String(t.name||'').toLowerCase()+'|'+t.category);
    let g=groups.get(key);
    if(!g){g={key,assetId:t.assetId||null,name:t.name||'Unnamed',category:t.category,
      icon:t.icon,img:t.coinImage||'',qty:0,proceeds:0,sales:[],first:t.date,last:t.date};
      groups.set(key,g);}
    g.qty+=qty;g.proceeds+=qty*per;
    g.sales.push({date:t.date,qty,per,id:t.id});
    if(new Date(t.date)<new Date(g.first))g.first=t.date;
    if(new Date(t.date)>new Date(g.last))g.last=t.date;
  });
  const rows=[];
  groups.forEach(g=>{
    const a=g.assetId?state.assets.find(x=>x.id===g.assetId):null;
    const {price,src}=hindsightPrice(a,g.name);
    const sellPrice=g.proceeds/g.qty;
    const tick=String((a&&a.ticker)||'').trim();
    const unit=(a&&a.unit)||(g.category==='stock'?'kitta':(tick||'unit'));
    const row={...g,asset:a,sellPrice,unit,ltp:price,src,
      diff:null,total:null};
    if(price!==null&&isFinite(price)){
      row.diff=sellPrice-price;
      row.total=row.diff*g.qty;
    }
    rows.push(row);
  });
  // Best decisions first, worst last, so the list reads as a ranking.
  rows.sort((x,y)=>{
    if(x.total===null&&y.total===null)return y.proceeds-x.proceeds;
    if(x.total===null)return 1;
    if(y.total===null)return -1;
    return y.total-x.total;
  });
  return rows;
}
function hindsightTotals(rows){
  let saved=0,missed=0,priced=0,unpriced=0;
  rows.forEach(r=>{
    if(r.total===null){unpriced++;return;}
    priced++;
    if(r.total>=0)saved+=r.total; else missed+=-r.total;
  });
  return {saved,missed,net:saved-missed,priced,unpriced};
}

let hsOpen=new Set(), hsFilter='all', hsShowAll=false;
const HS_PAGE=5;
// Unit prices unshortened.
function fmtUnit(v){
  if(state.settings.hideBalance)return currentCurrency.sym+'••••';
  const r=getCurrRate(currentCurrency.code),x=num(v)*r;
  return (x<0?'-':'')+currentCurrency.sym+Math.abs(x)
    .toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
}
function toggleHsAll(){hsShowAll=!hsShowAll;renderHindsight();haptic('tap');}
const HS_FILTERS=[{k:'all',label:'All'},{k:'stock',label:'Stocks'},{k:'crypto',label:'Crypto'},
  {k:'commodity',label:'Gold & silver'},{k:'other',label:'Other'}];
function setHsFilter(k){hsFilter=k;hsShowAll=false;renderHindsight();haptic('tap');}
function toggleHsRow(key){
  if(hsOpen.has(key))hsOpen.delete(key); else hsOpen.add(key);
  renderHindsight();haptic('tap');
}
function hsMatches(r){
  if(hsFilter==='all')return true;
  if(hsFilter==='other')return ['stock','crypto','commodity'].indexOf(r.category)<0;
  return r.category===hsFilter;
}
function renderHindsight(){
  const card=el('hindsightCard');if(!card)return;
  const all=hindsightRows();
  if(!all.length){card.style.display='none';return;}
  card.style.display='';
  const rows=all.filter(hsMatches);
  const T=hindsightTotals(rows);
  // Filters only for categories actually sold.
  const present=new Set(all.map(r=>['stock','crypto','commodity'].indexOf(r.category)<0?'other':r.category));
  {const _fr=el('hsFilterRow');
   if(_fr){
     const pills=(present.size>1?HS_FILTERS.filter(f=>f.k==='all'||present.has(f.k)):[]);
     _fr.innerHTML=pills.map(f=>`<button class="pnl-pill${f.k===hsFilter?' active':''}" onclick="setHsFilter('${f.k}')">${f.label}</button>`).join('');
     // Hide an empty filter row.
     _fr.style.display=pills.length?'':'none';
   }}

  // A missing node must not break renderAnalytics.
  const set=(id,txt)=>{const n=el(id);if(n)n.textContent=txt;};
  const net=T.net,pos=net>=0;
  set('hsNet',(pos?'':'−')+fmt(Math.abs(net)));
  {const n=el('hsNet');if(n)n.style.color=T.priced===0?'var(--text3)':(pos?'var(--green)':'var(--red)');}
  set('hsNetLbl',T.priced===0?'Nothing to compare yet'
    :(pos?'Better off having sold, on balance':'Would be better off having held'));
  set('hsSaved',fmt(T.saved));
  set('hsMissed',fmt(T.missed));
  set('hsCount',T.priced?plural(T.priced,'holding')+' compared'
    +(T.unpriced?', '+T.unpriced+' with no price to compare against':''):'');

  // Best and worst call.
  const priced=rows.filter(r=>r.total!==null);
  const best=priced.length?priced[0]:null, worst=priced.length?priced[priced.length-1]:null;
  const vs=el('hsVerdict')||{style:{}};
  if(!priced.length){vs.textContent='';}
  else if(priced.length===1||best===worst){
    vs.innerHTML=`Your ${esc(clip(best.name,20))} sale ${best.total>=0?'saved you':'cost you'} <b style="color:${best.total>=0?'var(--green)':'var(--red)'}">${fmt(Math.abs(best.total))}</b>.`;
  } else {
    vs.innerHTML=`Best call <b>${esc(clip(best.name,16))}</b> <span style="color:${best.total>=0?'var(--green)':'var(--red)'}">${best.total>=0?'+':'−'}${fmt(Math.abs(best.total))}</span>, worst <b>${esc(clip(worst.name,16))}</b> <span style="color:${worst.total>=0?'var(--green)':'var(--red)'}">${worst.total>=0?'+':'−'}${fmt(Math.abs(worst.total))}</span>.`;
  }

  {const _ls=el('hsList');
   if(_ls){
     const capped=!hsShowAll&&rows.length>HS_PAGE;
     const shown=capped?rows.slice(0,HS_PAGE):rows;
     _ls.innerHTML=shown.map(r=>hsRowHtml(r)).join('');
   }}
  {const _more=el('hsMore');
   if(_more){
     if(rows.length>HS_PAGE){
       _more.style.display='';
       _more.textContent=hsShowAll?'Show fewer':'Show all '+rows.length;
     } else _more.style.display='none';
   }}
  const asOf=el('hsAsOf');
  if(asOf){
    const bits=[];
    if(rows.some(r=>r.src==='nepse')&&nepseAsOf)bits.push('NEPSE '+(nepseStale?'last seen ':'')+relTime(Date.parse(nepseAsOf)));
    if(rows.some(r=>r.src==='live')&&lastPriceTs)bits.push('Coin and metal prices '+relTime(lastPriceTs));
    asOf.textContent=bits.join(' · ');
  }
}
function hsRowHtml(r){
  const open=hsOpen.has(r.key), multi=r.sales.length>1;
  const src=HS_SRC[r.src]||HS_SRC.none;
  const qty=fmtQty(r.qty,r.asset);
  if(r.total===null){
    return `<div class="hs-row hs-na">
      <div class="hs-main"><span class="hs-name">${esc(clip(r.name,26))}</span>
        <span class="hs-sub">${esc(qty)} ${esc(r.unit)} sold at ${fmtUnit(r.sellPrice)}</span>
        <span class="hs-diff">${esc(src.why||'nothing to compare against')}</span></div>
      <span class="hs-tot na">n/a</span></div>`;
  }
  const up=r.total>=0;
  const detail=multi&&open?`<div class="hs-lots">${r.sales.slice().sort((a,b)=>new Date(b.date)-new Date(a.date)).map(s=>{
      const d=(s.per-r.ltp)*s.qty;
      return `<div class="hs-lot"><span>${esc(formatDate(s.date))}</span>
        <span>${esc(fmtQty(s.qty,r.asset))} at ${fmtUnit(s.per)}</span>
        <b style="color:${d>=0?'var(--green)':'var(--red)'}">${d>=0?'+':'−'}${fmt(Math.abs(d))}</b></div>`;}).join('')}</div>`:'';
  return `<div class="hs-row${multi?' hs-clickable':''}"${multi?` onclick="toggleHsRow('${r.key}')" role="button" tabindex="0"`:''}>
    <div class="hs-main">
      <span class="hs-name">${esc(clip(r.name,24))}${multi?`<span class="hs-lots-n">${r.sales.length} sales${open?' ▴':' ▾'}</span>`:''}</span>
      <span class="hs-sub">${esc(qty)} ${esc(r.unit)} · sold ${fmtUnit(r.sellPrice)} · now <span style="color:${src.tone}">${fmtUnit(r.ltp)}</span></span>
      <span class="hs-diff">${up?'+':'−'}${fmtUnit(Math.abs(r.diff))} per ${esc(r.unit)}${r.src==='manual'?', against a price you typed':''}</span>
    </div>
    <span class="hs-tot" style="color:${up?'var(--green)':'var(--red)'}">${up?'+':'−'}${fmt(Math.abs(r.total))}</span>
  </div>${detail}`;
}
// Fetch fresh prices on demand.
async function refreshHindsight(){
  const b=el('hsRefresh');if(b)b.classList.add('spin');
  try{await Promise.all([fetchPrices(true),(typeof fetchNepse==='function')?fetchNepse(true):null]);}
  catch(e){}
  if(b)b.classList.remove('spin');
  renderHindsight();haptic('tap');
  toast('Prices refreshed','success');
}
function exportHindsightCSV(){
  const rows=hindsightRows().filter(hsMatches);
  if(!rows.length){toast('Nothing to export','error');return;}
  const rate=getCurrRate(currentCurrency.code),c=currentCurrency.code;
  const out=[['Name','Category','Quantity','Unit','Sell price ('+c+')','Current price ('+c+')',
    'Price source','Difference per unit ('+c+')','Saved or missed ('+c+')','Sales','First sale','Last sale']];
  rows.forEach(r=>{
    out.push([r.name,catLabel(r.category),r.qty,r.unit,(r.sellPrice*rate).toFixed(2),
      r.ltp===null?'':(r.ltp*rate).toFixed(2),(HS_SRC[r.src]||{}).lbl||'',
      r.diff===null?'':(r.diff*rate).toFixed(2),r.total===null?'':(r.total*rate).toFixed(2),
      r.sales.length,String(r.first||'').split('T')[0],String(r.last||'').split('T')[0]]);
  });
  const T=hindsightTotals(rows);
  out.push([]);
  out.push(['Total saved',(T.saved*rate).toFixed(2)]);
  out.push(['Total potential profit missed',(T.missed*rate).toFixed(2)]);
  out.push(['Net',(T.net*rate).toFixed(2)]);
  downloadCSV('paisafolio-sell-review-'+new Date().toISOString().slice(0,10)+'.csv',out);
}


// ADMIN
// The panel is admin.html; this only decides whether to show the link. admin.html and
// api/admin.js check again.
let _isAdmin=false;
function isAdmin(){return _isAdmin;}
async function refreshAdminRole(){
  _isAdmin=false;
  try{
    if(typeof sbClient!=='undefined'&&sbClient&&typeof supabaseUser!=='undefined'&&supabaseUser){
      const {data}=await sbClient.from('profiles').select('role').eq('user_id',supabaseUser.id).maybeSingle();
      _isAdmin=!!(data&&data.role==='admin');
    }
  }catch(e){ _isAdmin=false; }
  syncAdminVisibility();
  return _isAdmin;
}
function syncAdminVisibility(){
  const row=el('adminSettingsRow');
  if(row)row.style.display=_isAdmin?'':'none';
}
function openAdminPage(){window.location.href='admin.html';}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
window.addEventListener('load',()=>{try{syncChartFallbacks();bindScrollHints();}catch(e){}});
// Never leave the splash up: force-hide after 4s.
setTimeout(()=>{const sp=document.getElementById('splash');if(sp&&!sp.classList.contains('hide'))sp.classList.add('hide');},4000);
