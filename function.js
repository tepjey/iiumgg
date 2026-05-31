// ─── DATA ───────────────────────────────────────────────────────────────────────
const JOBS = [
  { id:1, title:'Café Crew Member',        company:'Mahallah Council IIUM', category:'CafeStaff', rate:10,  rateLabel:'RM 10/hr',  location:'On-site · Mahallah Ali', date:'Today',     tags:['CafeStaff'], verified:true,  desc:'Assist in serving food and beverages during peak hours at the mahallah café. Must be punctual and customer-friendly.', slots:3, applicants:7,  stars:4.8 },
  { id:2, title:'Exam Runner / Courier',    company:'Kulliyyah of Engineering',  category:'Runner',    rate:12,  rateLabel:'RM 12/hr',  location:'On-site · KoE Block C',  date:'Tomorrow',  tags:['Runner'],    verified:true,  desc:'Deliver exam materials and stationery across multiple exam halls. Physical stamina required.', slots:2, applicants:14, stars:4.6 },
  { id:3, title:'Python Tutor (SPM/IGCSE)', company:'IIUM Academic Club',        category:'Tutor',     rate:18,  rateLabel:'RM 18/hr',  location:'Remote · Zoom',          date:'2 Jun',     tags:['Tutor','Remote'], verified:true, desc:'Conduct online Python lessons for pre-university students via Zoom twice weekly.', slots:5, applicants:4,  stars:4.9 },
  { id:4, title:'Event Usher — Convocation',company:'IIUM Registry Office',      category:'Event',     rate:10,  rateLabel:'RM 10/hr',  location:'On-site · Main Stadium', date:'5 Jun',     tags:['Event'],     verified:true,  desc:'Guide graduating students and guests during the convocation ceremony. Smart attire provided.', slots:20, applicants:38, stars:4.7 },
  { id:5, title:'Social Media Manager',     company:'GreenByte Studio',          category:'Remote',    rate:22,  rateLabel:'RM 22/hr',  location:'Remote · Flexible',      date:'3 Jun',     tags:['Remote'],    verified:false, desc:'Manage Instagram and TikTok for a student-run tech startup. 3 hours/day, fully remote.', slots:1, applicants:9,  stars:4.3 },
  { id:6, title:'Library Cleaner',          company:'IIUM Main Library',         category:'Cleaner',   rate:9,   rateLabel:'RM 9/hr',   location:'On-site · Library B2',   date:'Daily',     tags:['Cleaner'],   verified:true,  desc:'Maintain cleanliness of reading halls, shelves, and washrooms. Early morning shifts available.', slots:4, applicants:2,  stars:4.5 },
  { id:7, title:'Graphic Design Assistant', company:'IIUM Student Union',        category:'Remote',    rate:20,  rateLabel:'RM 20/hr',  location:'Hybrid · Flexible',      date:'4 Jun',     tags:['Remote'],    verified:true,  desc:'Design promotional materials for campus events. Adobe Illustrator / Canva experience preferred.', slots:2, applicants:11, stars:4.8 },
  { id:8, title:'Food Delivery Runner',     company:'Campus Eats Co.',           category:'Runner',    rate:11,  rateLabel:'RM 11/hr',  location:'On-site · KoE Canteen',  date:'Today',     tags:['Runner'],    verified:false, desc:'Deliver food orders within campus during lunch rush. Bicycle provided by employer.', slots:3, applicants:6,  stars:4.2 },
];

let activeFilter = 'All';
let uploadedFiles = [];
let currentStep  = 1;
let locSelection = 'onsite';
let paymentDone  = false;

// ─── VIEW SWITCHING ──────────────────────────────────────────────────────────────
function switchView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const v = document.getElementById('view-' + name);
  const n = document.getElementById('nav-'  + name);
  if (v) v.classList.add('active');
  if (n) n.classList.add('active');
  // Reinit icons after view switch
  setTimeout(() => lucide.createIcons(), 50);
}

// ─── TOAST ───────────────────────────────────────────────────────────────────────
function showToast(msg, type='success', duration=2600) {
  const icon = type==='success' ? '✓' : type==='error' ? '✗' : 'ℹ';
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
  const container = document.getElementById('toast-container');
  container.appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transform='translateY(10px)'; t.style.transition='all 0.3s'; setTimeout(()=>t.remove(),300); }, duration);
}

// ─── FILTER ──────────────────────────────────────────────────────────────────────
function setFilter(el, filter) {
  document.querySelectorAll('.pill').forEach(p => { p.classList.remove('active'); p.classList.add('inactive'); });
  el.classList.remove('inactive'); el.classList.add('active');
  activeFilter = filter;
  filterJobs();
}

function filterJobs() {
  const q = (document.getElementById('search-input').value || '').toLowerCase();
  const filtered = JOBS.filter(j => {
    const matchCat  = activeFilter === 'All' || j.tags.includes(activeFilter);
    const matchText = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.category.toLowerCase().includes(q);
    return matchCat && matchText;
  });
  renderJobs(filtered);
}

function renderJobs(jobs) {
  const container = document.getElementById('jobs-container');
  document.getElementById('job-count').textContent = jobs.length + ' found';
  if (jobs.length === 0) {
    container.innerHTML = `<div class="text-center py-10"><div class="text-4xl mb-2">🌿</div><p class="font-semibold text-bark">No gigs found</p><p class="text-xs text-garden-400 mt-1">Try a different filter or search term</p></div>`;
    return;
  }
  container.innerHTML = jobs.map(j => jobCardHTML(j)).join('');
  setTimeout(() => lucide.createIcons(), 50);
}

function jobCardHTML(j) {
  const stars = '⭐'.repeat(Math.floor(j.stars));
  const badge = j.verified ? `<span class="verified-badge"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified</span>` : `<span style="font-size:10px;font-weight:700;color:#9aab8a;background:#f5f5f0;padding:2px 7px;border-radius:99px;">Unverified</span>`;
  return `
    <div class="job-card animate-fade-in" onclick="openJobModal(${j.id})">
      <div class="flex items-start justify-between gap-2 mb-2">
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-1.5 mb-1">${badge}<span style="font-size:10px;background:#f0faf0;color:#248024;font-weight:700;padding:2px 7px;border-radius:99px;">${j.category}</span></div>
          <p class="font-semibold text-bark" style="font-size:15px;line-height:1.3;">${j.title}</p>
          <p style="font-size:12px;color:#9aab8a;margin-top:1px;">${j.company}</p>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="font-display font-bold text-garden-600" style="font-size:16px;">${j.rateLabel}</p>
          <p style="font-size:10px;color:#9aab8a;font-weight:600;">${j.date}</p>
        </div>
      </div>
      <div class="flex items-center gap-3 mt-2.5 text-xs text-garden-500">
        <span class="flex items-center gap-1"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>${j.location}</span>
        <span class="flex items-center gap-1"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>${j.applicants} applied</span>
      </div>
      <div class="flex items-center justify-between mt-3 pt-3 border-t border-garden-50">
        <div class="flex items-center gap-1">
          <span style="font-size:11px;color:#f59e0b;">${'★'.repeat(Math.floor(j.stars))}</span>
          <span style="font-size:11px;color:#9aab8a;font-weight:600;">${j.stars}</span>
        </div>
        <button onclick="event.stopPropagation();applyToJob(${j.id})" class="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-white text-xs" style="background:linear-gradient(135deg,#33a033,#248024);box-shadow:0 3px 10px rgba(36,128,36,0.25);">
          Apply Now <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>`;
}

function applyToJob(id) {
  const j = JOBS.find(x=>x.id===id);
  showToast(`Applied to "${j.title}" ✓`, 'success');
  j.applicants++;
}

// ─── JOB MODAL ───────────────────────────────────────────────────────────────────
function openJobModal(id) {
  const j = JOBS.find(x=>x.id===id);
  const badge = j.verified ? `<span class="verified-badge"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified Employer</span>` : '';
  document.getElementById('job-modal-content').innerHTML = `
    <div class="w-10 h-1 bg-garden-200 rounded-full mx-auto mb-4"></div>
    <div class="flex items-start justify-between gap-2 mb-3">
      <div>
        ${badge}
        <h2 class="font-display font-semibold text-bark mt-1" style="font-size:19px;">${j.title}</h2>
        <p style="font-size:13px;color:#9aab8a;">${j.company}</p>
      </div>
      <p class="font-display font-bold text-garden-600" style="font-size:20px;white-space:nowrap;">${j.rateLabel}</p>
    </div>
    <div class="flex flex-wrap gap-2 mb-4">
      <span class="flex items-center gap-1 text-xs font-semibold text-garden-700" style="background:#f0faf0;padding:5px 10px;border-radius:99px;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>${j.location}</span>
      <span class="flex items-center gap-1 text-xs font-semibold text-garden-700" style="background:#f0faf0;padding:5px 10px;border-radius:99px;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${j.date}</span>
      <span class="flex items-center gap-1 text-xs font-semibold text-garden-700" style="background:#f0faf0;padding:5px 10px;border-radius:99px;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>${j.slots} slots</span>
    </div>
    <p class="font-bold text-bark mb-1" style="font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Description</p>
    <p style="font-size:13.5px;color:#4a5e3a;line-height:1.6;">${j.desc}</p>
    <div class="flex items-center gap-2 mt-4 pt-3 border-t border-garden-50">
      <div class="flex items-center gap-1">
        <span style="color:#f59e0b;font-size:14px;">${'★'.repeat(Math.floor(j.stars))}</span>
        <span style="font-size:12px;color:#9aab8a;font-weight:600;">${j.stars} · ${j.applicants} applied</span>
      </div>
    </div>
    <button onclick="closeJobModal();applyToJob(${j.id})" class="btn-green mt-3">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg> Apply Now
    </button>`;
  document.getElementById('job-modal').classList.add('open');
  setTimeout(() => lucide.createIcons(), 50);
}

function closeJobModal(e) {
  if (!e || e.target.id==='job-modal') {
    document.getElementById('job-modal').classList.remove('open');
  }
}

// ─── FILTER MODAL ────────────────────────────────────────────────────────────────
function openFilterModal() { document.getElementById('filter-modal').classList.add('open'); }
function closeFilterModal(e) { if(e.target.id==='filter-modal') document.getElementById('filter-modal').classList.remove('open'); }
function applyFilter() {
  document.getElementById('filter-modal').classList.remove('open');
  showToast('Filters applied', 'success');
}

function selectToggle(el) {
  el.closest('.toggle-wrap').querySelectorAll('.toggle-opt').forEach(o=>o.classList.remove('selected'));
  el.classList.add('selected');
}

function pillToggle(el) {
  el.closest('.flex').querySelectorAll('.pill').forEach(p=>{p.classList.remove('active');p.classList.add('inactive');});
  el.classList.remove('inactive'); el.classList.add('active');
}

// ─── FORM VALIDATION ─────────────────────────────────────────────────────────────
function validateField(el, key) {
  const errMap = { title:'e-title', cat:'e-cat', rate:'e-rate', desc:'e-desc', pname:'e-pname', email:'e-email', vorg:'e-vorg', vemail:'e-vemail' };
  const okMap  = { title:'ok-title' };
  const errEl  = document.getElementById(errMap[key]);
  const okEl   = okMap[key] ? document.getElementById(okMap[key]) : null;

  let valid = false;
  if (key==='title')  { valid = el.value.trim().length >= 3; }
  if (key==='cat')    { valid = el.value !== ''; }
  if (key==='rate')   { const v=parseFloat(el.value); valid = !isNaN(v) && v>=4 && v<=200; if(el.value && parseFloat(el.value)<0) el.value=Math.abs(el.value); }
  if (key==='desc')   {
    valid = el.value.trim().length >= 30;
    const cc = document.getElementById('char-count');
    if(cc) cc.textContent = el.value.length + ' / 500';
    if(el.value.length>500) el.value=el.value.slice(0,500);
  }
  if (key==='pname')  { valid = el.value.trim().length >= 2; }
  if (key==='email')  { valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value); }
  if (key==='vorg')   { valid = el.value.trim().length >= 2; }
  if (key==='vemail') { valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value) && el.value.length > 4; }

  el.classList.toggle('error', !valid && el.value.trim()!=='');
  el.classList.toggle('success', valid);
  if (errEl) errEl.classList.toggle('hidden', valid || el.value.trim()==='');
  if (okEl)  { okEl.classList.toggle('hidden', !valid); setTimeout(()=>lucide.createIcons(),20); }
  return valid;
}

// ─── MULTI-STEP FORM ─────────────────────────────────────────────────────────────
function nextStep(from) {
  if (from===1) {
    const t = validateField(document.getElementById('f-title'),'title');
    const c = validateField(document.getElementById('f-cat'),'cat');
    const r = validateField(document.getElementById('f-rate'),'rate');
    if (!t||!c||!r) { showToast('Please fill all required fields','error'); return; }
    // Update preview
    document.getElementById('prev-title').textContent = document.getElementById('f-title').value;
    document.getElementById('prev-cat').textContent   = document.getElementById('f-cat').value;
    document.getElementById('prev-rate').textContent  = 'RM ' + parseFloat(document.getElementById('f-rate').value).toFixed(2) + '/hr';
  }
  if (from===2) {
    const d = validateField(document.getElementById('f-desc'),'desc');
    if (!d) { showToast('Description must be at least 30 characters','error'); return; }
  }
  goToStep(from + 1);
}

function prevStep(from) { goToStep(from - 1); }

function goToStep(n) {
  document.querySelectorAll('.form-step').forEach(s=>s.classList.remove('active'));
  document.getElementById('step'+n).classList.add('active');
  currentStep = n;
  const labels = ['Basics','Details','Review'];
  document.getElementById('step-label').textContent = `Step ${n} of 3 — ${labels[n-1]}`;
  for(let i=1;i<=3;i++) {
    const dot = document.getElementById('sd'+i);
    dot.classList.remove('active','done','pending');
    if(i<n) dot.classList.add('done');
    else if(i===n) dot.classList.add('active');
    else dot.classList.add('pending');
  }
  document.getElementById('view-post').querySelector('.content-scroll').scrollTop = 0;
}

function submitJob() {
  const nm = validateField(document.getElementById('f-name'),'pname');
  const em = validateField(document.getElementById('f-email'),'email');
  if(!nm||!em) { showToast('Please complete all fields','error'); return; }

  const btn = event.currentTarget;
  btn.disabled=true;
  btn.innerHTML = '<svg class="animate-spin-slow w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Posting…';

  setTimeout(() => {
    btn.disabled=false;
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Posted!';
    showToast('Gig posted successfully 🎉', 'success');
    // Add to jobs list
    const newJob = {
      id: JOBS.length+1,
      title: document.getElementById('f-title').value,
      company: document.getElementById('f-name').value || 'My Organization',
      category: document.getElementById('f-cat').value,
      rate: parseFloat(document.getElementById('f-rate').value),
      rateLabel: 'RM '+parseFloat(document.getElementById('f-rate').value).toFixed(2)+'/hr',
      location: locSelection==='remote' ? 'Remote · Flexible' : (document.getElementById('f-address').value || 'On-site · IIUM'),
      date: 'Just now',
      tags: [document.getElementById('f-cat').value],
      verified: false,
      desc: document.getElementById('f-desc').value,
      slots: parseInt(document.getElementById('f-slots').value)||1,
      applicants: 0,
      stars: 5.0,
    };
    JOBS.unshift(newJob);
    setTimeout(() => {
      switchView('home');
      filterJobs();
      showToast('Your gig is now live!', 'success');
      // Reset form
      ['f-title','f-cat','f-rate','f-desc','f-name','f-email','f-slots'].forEach(id=>{
        const el=document.getElementById(id); if(el){el.value='';el.classList.remove('error','success');}
      });
      goToStep(1);
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Post Gig';
    }, 800);
  }, 1600);
}

// ─── LOCATION TOGGLE ─────────────────────────────────────────────────────────────
function selectLoc(val) {
  locSelection = val;
  ['onsite','remote','hybrid'].forEach(k=>{
    const el = document.getElementById('loc-'+k);
    if(el){ el.classList.toggle('selected', k===val); }
  });
  const addr = document.getElementById('f-address');
  if(addr) { addr.placeholder = val==='remote' ? 'e.g. Zoom / Google Meet link' : 'e.g. Mahallah Ali, IIUM Gombak'; }
}

// ─── VERIFICATION ────────────────────────────────────────────────────────────────
function dragOver(e) { e.preventDefault(); document.getElementById('drop-zone').classList.add('drag-over'); }
function dragLeave(e) { document.getElementById('drop-zone').classList.remove('drag-over'); }
function handleDrop(e) { e.preventDefault(); document.getElementById('drop-zone').classList.remove('drag-over'); processFiles(e.dataTransfer.files); }
function handleFileSelect(e) { processFiles(e.target.files); }

function processFiles(files) {
  uploadedFiles = Array.from(files).slice(0,3);
  const preview = document.getElementById('drop-preview');
  const content = document.getElementById('drop-content');
  if(uploadedFiles.length===0) return;
  content.classList.add('hidden');
  preview.classList.remove('hidden');
  preview.innerHTML = uploadedFiles.map(f=>`
    <div class="flex items-center gap-2 bg-garden-50 border border-garden-200 rounded-xl p-2 mb-2">
      <div class="w-8 h-8 rounded-lg bg-garden-100 flex items-center justify-center flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#248024" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-bark truncate" style="font-size:12px;">${f.name}</p>
        <p style="font-size:10px;color:#9aab8a;">${(f.size/1024).toFixed(1)} KB</p>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#33a033" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </div>`).join('');
  showToast(`${uploadedFiles.length} file(s) ready to upload`, 'info');
  document.getElementById('e-files').classList.add('hidden');
}

function submitVerification() {
  const org = validateField(document.getElementById('v-org'),'vorg');
  const em  = validateField(document.getElementById('v-email'),'vemail');
  if(!org||!em) { showToast('Please fill all required fields','error'); return; }
  if(uploadedFiles.length===0) { document.getElementById('e-files').classList.remove('hidden'); showToast('Please upload at least one document','error'); return; }

  const btn = event.currentTarget;
  btn.disabled=true;
  btn.innerHTML='<svg class="animate-spin-slow w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Submitting…';

  setTimeout(() => {
    btn.disabled=false;
    btn.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Submitted!';
    const card = document.getElementById('verify-status-card');
    card.className = 'bg-amber-50 border border-amber-200 rounded-xl2 p-3 mb-5 flex items-center gap-3';
    card.style.cssText = 'background:#f0faf0;border-color:#bce8bc;border-radius:12px;padding:12px;margin-bottom:20px;display:flex;align-items:center;gap:12px;';
    card.innerHTML = `<div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style="background:#ddf3dd;width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#248024" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><div><p style="font-weight:700;color:#1e661e;font-size:13px;">Under Review</p><p style="color:#33a033;font-size:11px;">We'll notify you within 24–48 hours.</p></div>`;
    showToast('Verification submitted! Review within 48 hrs 🛡️', 'success', 3500);
  }, 2000);
}

// ─── CHAT ────────────────────────────────────────────────────────────────────────
function sendQuickReply(msg) {
  appendChatMessage(msg, 'out');
  setTimeout(() => {
    const replies = ['Got it! See you soon.','Thanks for letting me know!','Perfect, noted!','Great, I\'ll be ready.','Confirmed ✓'];
    appendChatMessage(replies[Math.floor(Math.random()*replies.length)], 'in');
  }, 900 + Math.random()*600);
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if(!msg) return;
  input.value='';
  appendChatMessage(msg,'out');
  setTimeout(()=>{
    const responses=['Sure thing!','I\'ll check and get back to you.','Okay, understood.','Got it, thanks!','On it!'];
    appendChatMessage(responses[Math.floor(Math.random()*responses.length)],'in');
  }, 800 + Math.random()*800);
}

function appendChatMessage(text, type) {
  const area = document.getElementById('chat-messages');
  const div  = document.createElement('div');
  div.className = type==='out' ? 'chat-bubble-out animate-pop' : 'chat-bubble-in animate-pop';
  div.textContent = text;
  area.appendChild(div);
  area.scrollTop = area.scrollHeight;
}

// ─── PAYMENT ─────────────────────────────────────────────────────────────────────
function triggerPayment() {
  if(paymentDone) return;
  const btn = document.getElementById('pay-btn');
  btn.disabled=true;
  btn.innerHTML='<svg class="animate-spin-slow w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Processing…';

  setTimeout(() => {
    paymentDone = true;
    btn.style.display='none';
    document.getElementById('pay-success').classList.remove('hidden');
    document.getElementById('pay-success').classList.add('animate-slide-up');
    showToast('RM 68.92 sent to Maybank ✓', 'success', 4000);
  }, 2200);
}

// ─── MAP ANIMATION ───────────────────────────────────────────────────────────────
const riderPositions = [
  {top:'62%',left:'58%'},{top:'55%',left:'50%'},{top:'46%',left:'40%'},{top:'38%',left:'30%'}
];
let riderIdx = 0;
let etaVal   = 7;

function animateRider() {
  const rider = document.getElementById('rider');
  const etaEl = document.getElementById('eta-display');
  if(!rider||!etaEl) return;
  riderIdx = (riderIdx + 1) % riderPositions.length;
  const pos = riderPositions[riderIdx];
  rider.style.top  = pos.top;
  rider.style.left = pos.left;
  etaVal = Math.max(0, etaVal - 2);
  etaEl.textContent = etaVal;
  if(etaVal===0) {
    etaEl.closest('div').textContent = '🎉 Ahmad has arrived!';
    if(document.getElementById('view-chat').classList.contains('active')) {
      showToast('Ahmad has arrived at the location!', 'info');
    }
  }
}

setInterval(animateRider, 5000);

// ─── HOUR BARS ───────────────────────────────────────────────────────────────────
function renderHourBars() {
  const bars = document.getElementById('hour-bars');
  if(!bars) return;
  const heights = [60,75,85,95,100,90,80,70,85];
  const active  = [1,1,1,1,1,1,0,0,0];
  bars.innerHTML = heights.map((h,i)=>`
    <div class="flex-1 flex flex-col items-center justify-end gap-0.5" style="height:40px;">
      <div class="w-full rounded-t-md transition-all" style="height:${h*0.4}px;background:${active[i]?'linear-gradient(180deg,#33a033,#248024)':'#e8f0e0'};"></div>
    </div>`).join('');
}

// ─── INIT ─────────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  filterJobs();
  renderHourBars();

  // Prevent negative in rate field
  document.getElementById('f-rate').addEventListener('keydown', e => {
    if(e.key==='-'||e.key==='e') e.preventDefault();
  });
});