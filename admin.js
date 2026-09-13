// ════════════════════════════════════════════════════════════════════════
// PAISAFOLIO ADMIN, standalone
// ════════════════════════════════════════════════════════════════════════
// Runs on its own page with its own Supabase client. It needs a session and
// a role, and nothing else from the app, which is exactly why it is not in
// app.js any more.
//
// Being here at all proves nothing. Every action posts to /api/admin, which
// verifies the token with Supabase and re-reads profiles.role server-side
// before doing anything. The gate below is so an ordinary person sees a
// polite message instead of a broken page.

let sbClient=null, supabaseUser=null;

// ── the few helpers this page borrows from the app ────────────────────
const el=(id)=>document.getElementById(id);
const esc=(s)=>String(s==null?'':s).replace(/[&<>"'`=\/]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;','=':'&#61;','/':'&#47;'}[c]));
function formatDate(d){if(!d)return'';try{return new Date(d).toLocaleDateString('en',{month:'short',day:'numeric',year:'numeric'});}catch(e){return d;}}
function haptic(){try{if(navigator.vibrate)navigator.vibrate(8);}catch(e){}}

// ── theme, kept in step with the app's own choice ─────────────────────
function readAppTheme(){
  try{
    const d=JSON.parse(localStorage.getItem('paisafolio_device_prefs')||'{}');
    if(d&&d.theme)return d.theme;
    const s=JSON.parse(localStorage.getItem('paisafolio_local')||'{}');
    return (s.settings&&s.settings.theme)||'dark';
  }catch(e){return 'dark';}
}
function resolveTheme(t){
  if(t==='auto')return window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';
  return t==='light'?'light':'dark';
}
let admTheme=readAppTheme();
function applyAdmTheme(){
  const r=resolveTheme(admTheme);
  document.documentElement.dataset.theme=r;
  const m=el('metaTheme');
  if(m)m.content=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()||'#0e0e0e';
  const btn=el('admThemeBtn');
  if(btn)btn.innerHTML=r==='dark'
    ?'<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>'
    :'<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
}

// ── the gate ──────────────────────────────────────────────────────────
function gate(title,msg,cta){
  el('admPanel').hidden=true;
  el('admGate').hidden=false;
  el('admGateTitle').textContent=title;
  el('admGateMsg').textContent=msg;
  const b=el('admGateCta');
  b.hidden=!cta; if(cta){b.textContent=cta.label;b.href=cta.href;}
}
async function boot(){
  applyAdmTheme();
  // Two different problems that used to share one message. A fresh copy with
  // nothing filled in is not a failure, it is a setup step, and telling
  // someone the library did not load sends them hunting for the wrong thing.
  if(!window.SB_URL||!window.SB_ANON){
    gate('Not set up yet','This copy has no Supabase project connected. Fill in sb-config.js, then run schema.sql in that project, and this page has something to manage.',
      {label:'Back to the app',href:'index.html'});return;
  }
  if(!window.supabase){
    gate('Cannot reach the account system','Supabase did not load, so there is no way to check who you are.',
      {label:'Back to the app',href:'index.html'});return;
  }
  sbClient=window.supabase.createClient(window.SB_URL,window.SB_ANON);
  const {data:{session}}=await sbClient.auth.getSession();
  if(!session||!session.user){
    gate('Sign in first','This page needs an account. Sign in from the app, then come back.',
      {label:'Go and sign in',href:'index.html'});return;
  }
  supabaseUser=session.user;
  let role='user';
  try{
    const {data}=await sbClient.from('profiles').select('role').eq('user_id',supabaseUser.id).maybeSingle();
    role=(data&&data.role)||'user';
  }catch(e){ role='user'; }
  if(role!=='admin'){
    gate('Not for this account','This area is for administrators. Nothing here belongs to you, which is the point.',
      {label:'Back to the app',href:'index.html'});return;
  }
  el('admGate').hidden=true;
  el('admPanel').hidden=false;
  renderAdmin(true);
}
document.addEventListener('DOMContentLoaded',()=>{
  el('admReload').addEventListener('click',()=>renderAdmin(true));
  el('admThemeBtn').addEventListener('click',()=>{
    admTheme=resolveTheme(admTheme)==='dark'?'light':'dark';applyAdmTheme();haptic();
  });
  boot();
});

let adminData=null, adminBusy=false, adminTab='ai', adminModels={}, adminMsg=null;
let _isAdmin=false;

async function adminCall(action,payload){
  if(!sbClient)throw new Error('Not signed in.');
  const {data:{session}}=await sbClient.auth.getSession();
  const token=session&&session.access_token;
  if(!token)throw new Error('Sign in again.');
  const res=await fetch('/api/admin',{method:'POST',
    headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},
    body:JSON.stringify({action,...(payload||{})})});
  let data=null;try{data=await res.json();}catch(e){}
  if(!res.ok)throw new Error((data&&(data.detail||data.error))||('Request failed ('+res.status+')'));
  return data;
}
function adminSay(text,kind){
  adminMsg=text?{text,kind:kind||'ok'}:null;
  const box=el('adminMsg');
  if(box){box.textContent=text||'';box.className='admin-msg'+(text?' show '+(kind||'ok'):'');}
  if(text)setTimeout(()=>{if(adminMsg&&adminMsg.text===text)adminSay(null);},4000);
}
function setAdminTab(t){adminTab=t;renderAdmin();haptic('tap');}

async function renderAdmin(force){
  if(!el('adminBody'))return;
  el('adminTabs').innerHTML=[['ai','AI'],['users','Users'],['data','Data']]
    .map(([k,l])=>`<button class="pnl-pill${k===adminTab?' active':''}" onclick="setAdminTab('${k}')">${l}</button>`).join('');
  const body=el('adminBody');
  if(!adminData||force){
    body.innerHTML='<div class="admin-loading">Loading…</div>';
    try{
      adminData=await adminCall('overview');
    }catch(e){
      body.innerHTML=`<div class="admin-err">${esc(e.message)}</div>`;
      return;
    }
  }
  if(adminTab==='ai')return renderAdminAI();
  if(adminTab==='users')return renderAdminUsers();
  return renderAdminData();
}

function renderAdminAI(){
  const d=adminData,body=el('adminBody');
  const chain=(job)=>{
    const rows=(d.plan&&d.plan[job])||[];
    if(!rows.length)return '<span class="admin-dim">nothing configured</span>';
    return rows.map(r=>`<span class="admin-chip${r.cooling?' cool':''}">${esc(r.id)}${r.cooling?' (resting)':''}</span>`).join('');
  };
  body.innerHTML=
    `<div class="card admin-card">
      <div class="sec-title">HOW WORK IS SHARED OUT</div>
      <p class="admin-p">Each request picks a provider at random, weighted by how well it suits the job, so every key takes a share instead of one hitting its ceiling while the rest sit idle. A provider that rate limits or times out rests for five minutes.</p>
      <div class="admin-chain"><span class="admin-chain-l">Assistant</span><div>${chain('chat')}</div></div>
      <div class="admin-chain"><span class="admin-chain-l">Category tagging</span><div>${chain('quick')}</div></div>
      <div class="admin-note">Keys are stored in ${d.storage==='database'?'the database':'environment variables'}. They are never sent back to this page.</div>
    </div>`
    +d.providers.map(p=>adminProviderCard(p)).join('');
}
function adminProviderCard(p){
  const models=adminModels[p.id]||null;
  const chosen=p.models||[];
  return `<div class="card admin-card admin-prov${p.configured?'':' off'}" id="adm-${p.id}">
    <div class="admin-prov-hdr">
      <div>
        <div class="admin-prov-name">${esc(p.label)}
          ${p.configured?`<span class="admin-pill ${p.enabled?'on':'off'}">${p.enabled?'active':'off'}</span>`
            :'<span class="admin-pill none">no key</span>'}</div>
        <div class="admin-prov-note">${esc(p.note)}</div>
      </div>
      <div class="admin-prov-links">
        <a href="${esc(p.console)}" target="_blank" rel="noopener">Get key</a>
        <a href="${esc(p.docs)}" target="_blank" rel="noopener">Models</a>
      </div>
    </div>
    <div class="form-row">
      <label class="form-lbl">API KEY ${p.configured?`<span class="admin-mask">${esc(p.keyMask)}${p.keySource==='env'?' · from environment':''}</span>`:''}</label>
      <input class="form-input" id="admkey-${p.id}" type="password" autocomplete="off"
        placeholder="${p.configured?'Paste a new key to replace it':'Paste the key'}"/>
    </div>
    <div class="admin-grid2">
      <div><label class="form-lbl">ASSISTANT</label>
        <input class="form-input" id="admjob-chat-${p.id}" type="number" min="0" max="100"
          value="${p.jobs&&p.jobs.chat!=null?p.jobs.chat:p.defaultJobs.chat}"/></div>
      <div><label class="form-lbl">TAGGING</label>
        <input class="form-input" id="admjob-quick-${p.id}" type="number" min="0" max="100"
          value="${p.jobs&&p.jobs.quick!=null?p.jobs.quick:p.defaultJobs.quick}"/></div>
    </div>
    <div class="admin-hint">0 to 100, how well this provider suits each job. 0 keeps it out of that job entirely.</div>
    <div class="form-row" style="margin-top:8px">
      <label class="form-lbl">PRIORITY <span class="admin-dim">each step doubles its share</span></label>
      <input class="form-input" id="admprio-${p.id}" type="number" min="-5" max="5" value="${p.priority||0}"/>
    </div>
    <div class="admin-models">
      <div class="admin-models-hdr">
        <span class="form-lbl" style="margin:0">MODELS ${chosen.length?`<span class="admin-dim">${chosen.length} chosen</span>`:''}</span>
        <button class="admin-btn" onclick="adminFetchModels('${p.id}')" ${p.configured?'':'disabled'}>Fetch list</button>
      </div>
      ${chosen.length?`<div class="admin-chosen">${chosen.map((m,i)=>
        `<span class="admin-chip pick">${i===0?'<b>1st</b> ':''}${esc(m)}<button onclick="adminDropModel('${p.id}',${i})" aria-label="Remove">×</button></span>`).join('')}</div>`
        :`<div class="admin-hint">${p.suggest.length?'Nothing chosen, so these are tried: '+p.suggest.map(esc).join(', '):'Fetch the list and pick at least one, or this provider is skipped.'}</div>`}
      ${models?`<div class="admin-modellist">${models.length?models.map(m=>
        `<button class="admin-model${chosen.indexOf(m.id)>=0?' picked':''}" onclick="adminPickModel('${p.id}','${esc(m.id).replace(/'/g,"\\\\'")}')">
          <span>${esc(m.id)}</span>${m.free===true?'<i class="free">free</i>':''}${m.free===false?'<i class="paid">paid</i>':''}
          ${m.context?`<i class="ctx">${Math.round(m.context/1000)}k</i>`:''}</button>`).join('')
        :'<div class="admin-hint">That key returned no usable chat models.</div>'}</div>`:''}
    </div>
    <div class="admin-actions">
      <button class="admin-btn primary" onclick="adminSaveProvider('${p.id}')">Save</button>
      <button class="admin-btn" onclick="adminTestProvider('${p.id}')" ${p.configured?'':'disabled'}>Test</button>
      ${p.configured&&p.keySource!=='env'?`<button class="admin-btn danger" onclick="adminClearKey('${p.id}')">Remove key</button>`:''}
      <label class="admin-toggle"><input type="checkbox" id="admen-${p.id}" ${p.enabled?'checked':''}/> <span>Enabled</span></label>
    </div>
    <div class="admin-result" id="admres-${p.id}"></div>
  </div>`;
}
async function adminFetchModels(id){
  const box=el('admres-'+id);if(box)box.textContent='Asking '+id+' what it can run…';
  try{
    const out=await adminCall('models',{provider:id});
    adminModels[id]=out.models;
    if(box)box.textContent=out.count+' chat models available.';
    renderAdmin();
  }catch(e){ if(box)box.textContent=e.message; }
}
function adminPickModel(id,model){
  const p=adminData.providers.find(x=>x.id===id);if(!p)return;
  const i=p.models.indexOf(model);
  if(i>=0)p.models.splice(i,1); else p.models.push(model);
  renderAdmin();haptic('tap');
}
function adminDropModel(id,i){
  const p=adminData.providers.find(x=>x.id===id);if(!p)return;
  p.models.splice(i,1);renderAdmin();haptic('tap');
}
async function adminSaveProvider(id){
  const p=adminData.providers.find(x=>x.id===id);if(!p)return;
  const box=el('admres-'+id);if(box)box.textContent='Saving…';
  try{
    await adminCall('saveProvider',{provider:id,
      apiKey:(el('admkey-'+id)&&el('admkey-'+id).value)||'',
      enabled:!!(el('admen-'+id)&&el('admen-'+id).checked),
      models:p.models,
      priority:Number(el('admprio-'+id)&&el('admprio-'+id).value)||0,
      jobs:{chat:Number(el('admjob-chat-'+id).value)||0,quick:Number(el('admjob-quick-'+id).value)||0}});
    adminSay('Saved '+p.label,'ok');
    await renderAdmin(true);
  }catch(e){ if(box)box.textContent=e.message; adminSay(e.message,'err'); }
}
async function adminTestProvider(id){
  const box=el('admres-'+id);if(box)box.textContent='Sending one real question…';
  try{
    const out=await adminCall('test',{provider:id});
    if(box)box.innerHTML=out.ok
      ? `<span class="admin-ok">Works. ${esc(out.model)} answered in ${out.ms}ms.</span>`
      : `<span class="admin-bad">Failed (${out.status||'no status'}) on ${esc(out.model)}: ${esc(String(out.error).slice(0,160))}</span>`;
  }catch(e){ if(box)box.textContent=e.message; }
}
async function adminClearKey(id){
  if(!confirm('Remove the stored key for '+id+'?'))return;
  try{ await adminCall('clearKey',{provider:id}); adminSay('Key removed','ok'); await renderAdmin(true); }
  catch(e){ adminSay(e.message,'err'); }
}

async function renderAdminUsers(){
  const body=el('adminBody');
  body.innerHTML='<div class="admin-loading">Loading people…</div>';
  let out;
  try{ out=await adminCall('users'); }
  catch(e){ body.innerHTML=`<div class="admin-err">${esc(e.message)}</div>`; return; }
  body.innerHTML=`<div class="card admin-card">
    <div class="sec-head"><div class="sec-title">PEOPLE</div><b>${out.count}</b></div>
    <p class="admin-p">Who has an account, and who can reach this page. Their figures are not shown here: running the app is not a reason to read somebody's holdings.</p>
    <div class="admin-users">${out.users.map(u=>`<div class="admin-user">
      <div class="admin-user-main">
        <span class="admin-user-name">${esc(u.full_name||u.username||u.email||'Unnamed')}</span>
        <span class="admin-user-sub">${esc(u.email||'')}${u.created_at?' · joined '+formatDate(u.created_at):''}</span>
      </div>
      <button class="admin-btn${u.role==='admin'?' primary':''}" onclick="adminToggleRole('${esc(u.user_id)}','${u.role==='admin'?'user':'admin'}')">
        ${u.role==='admin'?'Admin':'Make admin'}</button>
    </div>`).join('')}</div>
  </div>`;
}
async function adminToggleRole(userId,role){
  if(role==='user'&&supabaseUser&&supabaseUser.id===userId){
    if(!confirm('Remove your OWN admin access? You will lose this page immediately.'))return;
  }
  try{
    await adminCall('setRole',{userId,role});
    adminSay('Role updated','ok');
    // Removing your own admin closes this page behind you, which is the
    // honest outcome rather than a panel that no longer works.
    if(role==='user'&&supabaseUser&&supabaseUser.id===userId){
      gate('You are no longer an administrator','You just removed your own access.',
        {label:'Back to the app',href:'index.html'});
      return;
    }
    renderAdminUsers();
  }catch(e){ adminSay(e.message,'err'); }
}

async function renderAdminData(){
  const body=el('adminBody');
  body.innerHTML='<div class="admin-loading">Counting…</div>';
  let out;
  try{ out=await adminCall('stats'); }
  catch(e){ body.innerHTML=`<div class="admin-err">${esc(e.message)}</div>`; return; }
  const rows=Object.entries(out.counts);
  body.innerHTML=`<div class="card admin-card">
    <div class="sec-title">WHAT IS IN THE DATABASE</div>
    <p class="admin-p">Row counts only. Opening anybody's actual records is not something this page will do.</p>
    <div class="admin-stats">${rows.map(([t,n])=>
      `<div class="admin-stat"><div class="admin-stat-n">${n==null?'?':n.toLocaleString()}</div><div class="admin-stat-l">${esc(t)}</div></div>`).join('')}</div>
  </div>
  <div class="card admin-card">
    <div class="sec-title">SUPABASE</div>
    <p class="admin-p">Tables, policies and keys are managed in the Supabase dashboard. This page only reads counts and writes the two things it owns: provider settings and roles.</p>
    <a class="admin-btn" href="https://supabase.com/dashboard" target="_blank" rel="noopener">Open Supabase</a>
  </div>`;
}
