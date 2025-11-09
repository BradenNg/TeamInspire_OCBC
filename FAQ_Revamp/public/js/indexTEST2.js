// Helpers
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

// Theme toggle
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);
$('#themeToggle')?.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Mobile nav
$('#mobileToggle')?.addEventListener('click', () => {
  const m = $('#mobileMenu');
  const open = getComputedStyle(m).display !== 'none';
  m.style.display = open ? 'none' : 'flex';
  $('#mobileToggle').setAttribute('aria-expanded', String(!open));
});

// ---------------- I18N full dictionary ----------------
const i18n = {
  current: 'en',
  dict: {
    en: {
      "banner.security":"⚠️ Security tip: Never share your OTP or passwords. OCBC will never ask for them via phone, chat, or email.",
      "nav.help":"Help","nav.banking":"Banking","nav.faq":"FAQ",
      "cta.login":"Log in","cta.open":"Open account",
      "hero.title":"Smarter support, <span class='accent'>without the wait</span>.",
      "hero.subtitle":"Find answers instantly, complete common tasks in a tap, or book a callback all in one place.",
      "hero.search":"Search","hero.popular":"Popular:",
      "chips.reset":"Reset password","chips.overseas":"Overseas card use","chips.lost":"Lost card",
      "chips.limit":"Change card limit","chips.open":"Open an account","chips.scam":"Report a scam","chips.paynow":"Set up PayNow",
      "status.title":"Service status","status.ok":"All systems normal","status.channels":"Internet/Mobile Banking • FAST/PayNow • Cards",
      "quick.title":"Do it in seconds",
      "qa.pay":"Pay bills","qa.paySub":"SP, Singtel, IRAS…","qa.transfer":"Transfer funds","qa.transferSub":"FAST / PayNow",
      "qa.card":"Card controls","qa.cardSub":"Freeze, limit, overseas","qa.book":"Book appointment","qa.bookSub":"Branch or video",
      "qa.callback":"Request callback","qa.callbackSub":"We will call you",
      "chat.title":"Ask our Smart Assistant","chat.handoff":"Human handoff available","chat.send":"Send",
      "verify.text":"Verified OCBC support. We will never ask for your OTP. In app callbacks only.",
      "triage.title":"Guided Triage","triage.step1":"Step 1: Pick a category","triage.step2":"Step 2: What is the issue","triage.step3":"Step 3: A few details",
      "triage.choose":"Choose…","triage.card":"Card","triage.online":"Online/Mobile Banking","triage.payment":"Payments & Transfers","triage.waiting":"Waiting for your selection…","triage.ready":"Great, ready to proceed.",
      "result.title":"Recommendation","result.alt":"Book a callback","suggest.title":"Self service suggestions",
      "topics.title":"Popular topics","topics.reset":"Reset Online Banking password","topics.overseas":"Enable overseas card usage","topics.lost":"Report a lost or stolen card","topics.dispute":"Dispute a transaction",
      "faq.title":"Frequently asked","faq.q1":"How do I request a callback instead of waiting on hold","faq.a1":"Select <b>Request callback</b> under Quick Actions. Choose your preferred time window and topic. We will queue it so you do not have to wait.",
      "faq.q2":"Can I do everything without logging in","faq.a2":"Many self serve flows are available without login. For account specific tasks you will sign in securely.",
      "footer.note":"This is a non commercial student prototype for ideation and testing. No real data is used.",
      "cb.title":"Request a callback","cb.topic":"Topic","cb.window":"Preferred time window","cb.notes":"Notes optional","cb.card":"Card","cb.online":"Online/Mobile Banking","cb.payment":"Payments & Transfers","cb.book":"Book callback"
    },
    zh: {
      "banner.security":"⚠️ 安全提示：请勿分享一次性密码或登录信息。OCBC 不会通过电话、聊天或电邮索取这些资料。",
      "nav.help":"协助","nav.banking":"银行服务","nav.faq":"常见问题",
      "cta.login":"登录","cta.open":"开立账户",
      "hero.title":"更聪明的客服，<span class='accent'>无需久等</span>。","hero.subtitle":"即时获得答案，一键完成常用操作，或预约回电，一站式完成。","hero.search":"搜索","hero.popular":"热门：",
      "chips.reset":"重置密码","chips.overseas":"海外用卡","chips.lost":"挂失","chips.limit":"更改卡额度","chips.open":"开立账户","chips.scam":"报告诈骗","chips.paynow":"开通 PayNow",
      "status.title":"服务状态","status.ok":"系统一切正常","status.channels":"网银/手机银行 • FAST/PayNow • 卡片",
      "quick.title":"几秒搞定","qa.pay":"缴付账单","qa.paySub":"电力/电话/税务…","qa.transfer":"转账汇款","qa.transferSub":"FAST / PayNow","qa.card":"卡片管控","qa.cardSub":"挂失、额度、海外","qa.book":"预约服务","qa.bookSub":"网点或视频",
      "qa.callback":"请求回电","qa.callbackSub":"由我们致电",
      "chat.title":"智能助理","chat.handoff":"可转接人工","chat.send":"发送",
      "verify.text":"已验证的 OCBC 支援。我们不会索取 OTP。仅通过应用内回电联系。",
      "triage.title":"引导式分流","triage.step1":"步骤一：选择类别","triage.step2":"步骤二：问题类型","triage.step3":"步骤三：补充信息","triage.choose":"请选择…","triage.card":"银行卡","triage.online":"网银/手机银行","triage.payment":"付款与转账","triage.waiting":"等待你的选择…","triage.ready":"很好，可以继续。",
      "result.title":"建议","result.alt":"预约回电","suggest.title":"自助建议",
      "topics.title":"热门主题","topics.reset":"重置网银密码","topics.overseas":"启用海外用卡","topics.lost":"挂失或被盗","topics.dispute":"交易争议",
      "faq.title":"常见问题","faq.q1":"如何请求回电以避免等待","faq.a1":"在“快捷操作”选择<b>请求回电</b>，设定时间与主题，我们会排队处理，你无需在线等待。","faq.q2":"不登录能完成所有操作吗","faq.a2":"许多自助流程无需登录；涉及账户信息的操作将进行安全登录。",
      "footer.note":"本页面为非商业学生原型，仅用于创意与测试，不涉及真实数据。",
      "cb.title":"请求回电","cb.topic":"主题","cb.window":"偏好时段","cb.notes":"备注 可选","cb.card":"银行卡","cb.online":"网银/手机银行","cb.payment":"付款与转账","cb.book":"预约回电"
    }
  }
};

function t(key){ return i18n.dict[i18n.current][key] || key; }
function applyI18n(){
  $$('[data-i18n]').forEach(el=>{
    const html = t(el.getAttribute('data-i18n'));
    if (html.includes('<')) el.innerHTML = html; else el.textContent = html;
  });
  if ($('#triageCategory')?.value) $('#triageCategory').dispatchEvent(new Event('change'));
}
applyI18n();
$$('.lang-switch .chip').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    i18n.current = btn.getAttribute('data-lang');
    applyI18n();
  });
});

// ---------------- Service status loads (simulated) ----------------
function updateLoads(){
  const hotline = Math.max(10, Math.floor(Math.random()*80));
  const branch = Math.max(5, Math.floor(Math.random()*60));
  const waitH = Math.round(hotline/10)+2;
  const waitB = Math.round(branch/6)+8;
  $('#callWaitTag').textContent   = `Avg call wait: ${waitH}–${waitH+2} min`;
  $('#branchWaitTag').textContent = `Nearest branch wait: ~${waitB} min`;
  const tag = $('#statusTag');
  const busy = hotline > 60 || branch > 45;
  tag.textContent = busy ? (i18n.current==='zh' ? '使用量高' : 'High demand') : t('status.ok');
  tag.dataset.status = busy ? 'busy' : 'ok';
  $('.svc-dot').style.background = busy ? '#f59e0b' : '#22c55e';
}
updateLoads();
setInterval(updateLoads, 7000);

// ---------------- Chat with typing indicator and memory ----------------
const CHAT_KEY = 'ocbc_chat_test2';
const chatBox = $('#chat');

function addBubble(text, who='bot', isHTML=false){
  const d = document.createElement('div');
  d.className = `bubble ${who}`;
  if (isHTML) d.innerHTML = text; else d.textContent = text;
  chatBox.appendChild(d);
  chatBox.scrollTop = chatBox.scrollHeight;
  return d;
}

function saveChat(){ localStorage.setItem(CHAT_KEY, chatBox.innerHTML); }
function loadChat(){
  const html = localStorage.getItem(CHAT_KEY);
  if (html) chatBox.innerHTML = html;
  else {
    addBubble(t('chat.title'),'bot');
    addBubble(i18n.current==='zh'
      ? '你好 我可以按步骤引导你或代为完成操作 你需要什么帮助'
      : 'Hi I can guide you step by step or complete tasks for you What do you need help with today'
    ,'bot');
  }
}
loadChat();

function botReply(q){
  const lc = q.toLowerCase();
  if (/(lost|stolen).*card|挂失/.test(lc)) { openTriage('card','lost'); }
  else if (/reset.*password|重置密码/.test(lc)) { openTriage('online','reset'); }
  else if (/overseas.*(card|usage)|海外/.test(lc)) { openTriage('card','overseas'); }

  const tnode = addBubble(i18n.current==='zh' ? '输入中…' : 'Typing…','bot');
  tnode.classList.add('typing');
  setTimeout(()=>{
    tnode.remove();
    addBubble(`Here are steps for "${q}":
      <ol style="margin:6px 0 0 18px">
        <li>Open <i>Card controls</i></li>
        <li>Choose the relevant card</li>
        <li>Toggle the setting and confirm</li>
      </ol>`, 'bot', true);
    saveChat();
  }, 500);
}

$('#askBtn').addEventListener('click', ()=>{
  const v = $('#ask').value.trim();
  if (!v) return;
  addBubble(v,'user'); saveChat(); botReply(v);
  $('#ask').value='';
});
$$('.chips .chip,[data-q]').forEach(c => c.addEventListener('click', ()=>{
  const q = c.getAttribute('data-q');
  addBubble(q,'user'); saveChat(); botReply(q);
}));
$('#searchBtn').addEventListener('click', ()=>{
  const v = $('#siteSearch').value.trim();
  if (!v) return;
  addBubble(`Search: ${v}`,'user'); saveChat(); botReply(v);
});
['ask','siteSearch'].forEach(id=>{
  const el = document.getElementById(id);
  el.addEventListener('keydown', e=>{
    if (e.key==='Enter'){ e.preventDefault(); if (id==='ask') $('#askBtn').click(); else $('#searchBtn').click(); }
  });
});

// ---------------- Guided triage ----------------
const TRIAGE = {
  card: {
    issues: {
      lost: { en:'Lost / Stolen', zh:'遗失/被盗' },
      overseas: { en:'Enable overseas usage', zh:'启用海外使用' },
      limit: { en:'Change card limit', zh:'更改卡额度' }
    }
  },
  online: {
    issues: {
      reset: { en:'Reset password', zh:'重置密码' },
      token: { en:'Reactivate digital token', zh:'重新激活数码令牌' }
    }
  },
  payment: {
    issues: {
      paynow: { en:'Set up PayNow', zh:'开通 PayNow' },
      dispute: { en:'Dispute a transaction', zh:'交易争议' }
    }
  }
};

const triage = $('#triage'), catSel = $('#triageCategory'), issueSel = $('#triageIssue'),
      extra = $('#triageExtra'), result = $('#triageResult'),
      resultType = $('#resultType'), resultText = $('#resultText'),
      suggestList = $('#suggestList'), primaryAction = $('#primaryAction'), altAction = $('#altAction');

function openTriage(prefCat, prefIssue){
  triage.hidden = false;
  if (prefCat) { catSel.value = prefCat; catSel.dispatchEvent(new Event('change')); }
  if (prefIssue) setTimeout(()=>{ issueSel.value = prefIssue; issueSel.dispatchEvent(new Event('change')); }, 0);
  triage.scrollIntoView({behavior:'smooth', block:'nearest'});
}
$('#closeTriage').addEventListener('click', ()=> triage.hidden = true);

catSel.addEventListener('change', () => {
  const val = catSel.value;
  issueSel.innerHTML = `<option value="" selected>${t('triage.choose')}</option>`;
  issueSel.disabled = !val;
  extra.textContent = t('triage.waiting');
  result.hidden = true;
  if (!val) return;
  const issues = TRIAGE[val].issues;
  Object.entries(issues).forEach(([key, obj])=>{
    const o = document.createElement('option');
    o.value = key; o.textContent = i18n.current==='zh' ? obj.zh : obj.en;
    issueSel.appendChild(o);
  });
});

issueSel.addEventListener('change', () => {
  const val = issueSel.value;
  result.hidden = true;
  if (!val) { extra.textContent = t('triage.waiting'); return; }
  if (catSel.value==='card' && val==='lost') {
    extra.innerHTML = `<label><input type="checkbox" id="within24"> ${i18n.current==='zh'?'是否在24小时内发生':'Was this within the last 24 hours'}</label>`;
  } else { extra.textContent = t('triage.ready'); }
});

function recommend({category, issue, detail}){
  let type='Fix Online', text=t('result.title'), suggestions=[], primary={label:'Continue', href:'#'}, alt={label:t('result.alt'), href:'#'};
  if (category==='card' && issue==='lost'){
    type='Call Now'; text = i18n.current==='zh'?'请立即冻结卡片 并与我们联系以补发新卡':'Freeze your card immediately and call to block and reissue';
    suggestions=['Freeze your card online instantly','Request a replacement card to your mailing address'];
    primary={label:i18n.current==='zh'?'挂失并冻结':'Freeze card online', href:'#'};
    alt={label:i18n.current==='zh'?'致电客服':'Call hotline', href:'#'};
  } else if (category==='online' && issue==='reset'){
    type='Fix Online'; text = i18n.current==='zh'?'可使用数码令牌即时重置密码':'You can reset your password instantly using your digital token';
    suggestions=['Reset via OCBC App','If token unavailable, use ATM card and PIN'];
    primary={label:i18n.current==='zh'?'重置密码':'Reset password', href:'#'};
    alt={label:i18n.current==='zh'?'建立个案':'Create a support case', href:'#'};
  } else if (category==='payment' && issue==='dispute'){
    type='Create Case'; text = i18n.current==='zh'?'提交争议表格 我们会在3到5个工作日回复':'Submit a dispute form We will update you within 3 to 5 working days';
    suggestions=['Prepare transaction date amount and merchant','We will notify you by SMS or email'];
    primary={label:i18n.current==='zh'?'开始争议':'Start dispute', href:'#'};
    alt={label:i18n.current==='zh'?'转接客服':'Chat with an agent', href:'#'};
  } else if (category==='card' && issue==='overseas'){
    type='Fix Online'; text = i18n.current==='zh'?'在卡片管控中启用海外使用并设置时段额度':'Toggle overseas usage in Card controls and set a schedule';
    suggestions=['Set a daily limit for extra safety','Enable travel alerts'];
    primary={label:i18n.current==='zh'?'打开卡片管控':'Open card controls', href:'#'};
    alt={label:i18n.current==='zh'?'查看指南':'See how to guide', href:'#'};
  }
  return {type, text, suggestions, primary, alt};
}

['change','click'].forEach(ev=>{
  document.addEventListener(ev, e=>{
    if (!(e.target.closest('#triage'))) return;
    if (!issueSel.value) return;
    const detail = $('#within24')?.checked ? 'within24' : null;
    const rec = recommend({category:catSel.value, issue:issueSel.value, detail});
    resultType.textContent = rec.type;
    resultType.className = 'badge';
    if (rec.type==='Call Now') { resultType.style.background='#fee2e2'; resultType.style.color='#991b1b'; }
    else if (rec.type==='Create Case') { resultType.style.background='#fff7ed'; resultType.style.color='#9a3412'; }
    else { resultType.style.background='#e8f8ec'; resultType.style.color='#05603a'; }
    resultText.textContent = rec.text;
    suggestList.innerHTML = rec.suggestions.map(s=>`<li>${s}</li>`).join('');
    primaryAction.textContent = rec.primary.label;
    primaryAction.onclick = ()=> alert(`(Prototype) ${rec.primary.label}`);
    altAction.textContent = rec.alt.label;
    altAction.onclick = ()=> $('#openCallback').click();
    result.hidden = false;
  });
});

// Popular topics trigger triage
$$('.topic').forEach(tk => tk.addEventListener('click', ()=>{
  const q = tk.getAttribute('data-q');
  addBubble(q,'user'); botReply(q);
}));

// Quick actions
$$('.qa .tile').forEach(tile=>tile.addEventListener('click', ()=>{
  const a = tile.getAttribute('data-action');
  if (a==='callback') $('#openCallback').click();
  else alert(`(Prototype) Launching ${a} flow`);
}));

// Callback modal
const modal = $('#callbackModal');
$('#openCallback').addEventListener('click', ()=> modal.setAttribute('aria-hidden','false'));
$('#closeCallback').addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
$('#bookCallback').addEventListener('click', ()=>{
  modal.setAttribute('aria-hidden','true');
  alert(`(Prototype) Callback booked — ${$('#cbTopic').value} • ${$('#cbWindow').value}`);
});

// Floating chatbot button
$('#chatFab')?.addEventListener('click', () => {
  document.getElementById('assistant').scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(()=> $('#ask')?.focus(), 500);
});
