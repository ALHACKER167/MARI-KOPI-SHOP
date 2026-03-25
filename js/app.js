// ============================================================
//  MARI KOPI SHOP v4 — Enhanced App
// ============================================================

let cart = {};
let currentView = 'menu';
let orderHistory = JSON.parse(localStorage.getItem('mk_orders') || '[]');
let liveNotifs = JSON.parse(localStorage.getItem('mk_notifs') || '[]');

const DEMO_NAMES  = ['Budi','Siti','Ahmad','Dewi','Rizky','Ayu','Fajar','Nisa','Hendra','Rani','Doni','Lina','Yudi','Mega','Tono','Zahra','Bagas','Dini'];
const DEMO_TABLES = ['Meja 1','Meja 2','Meja 3','Meja 4','Meja 5','Take Away','Meja VIP','Sofa Pojok','Drive Thru','Meja 6','Outdoor'];
const DEMO_MENUS  = ['Kopi Susu Aren','Iced Latte','Cappuccino','Cold Brew','Brown Sugar Latte','Americano','Caramel Macchiato','Matcha Latte','Iced Chocolate','Nitro Cold Brew','Strawberry Matcha'];

// ---- UTILS ----
function findItem(id) {
  for (const cat of CATEGORIES) {
    const f = cat.items.find(i => i.id === id);
    if (f) return f;
  }
  return null;
}
function formatTime(ts) { return new Date(ts).toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'}); }
function formatDate(ts) { return new Date(ts).toLocaleDateString('id-ID', {day:'2-digit', month:'short', year:'numeric'}); }
function isSameDay(ts, ref) { const a=new Date(ts),b=new Date(ref); return a.getDate()===b.getDate()&&a.getMonth()===b.getMonth()&&a.getFullYear()===b.getFullYear(); }
function isSameWeek(ts, ref) {
  const startOfWeek = d => { const n=new Date(d); n.setDate(n.getDate()-n.getDay()); n.setHours(0,0,0,0); return n; };
  return startOfWeek(ts).getTime()===startOfWeek(ref).getTime();
}
function isSameMonth(ts, ref) { const a=new Date(ts),b=new Date(ref); return a.getMonth()===b.getMonth()&&a.getFullYear()===b.getFullYear(); }

// ---- METEOR ----
function initMeteors() {
  const container = document.getElementById('meteorContainer');
  if (!container) return;
  function spawnMeteor() {
    const m = document.createElement('div');
    m.className = 'meteor';
    const angle = Math.random()*30+20, startX=Math.random()*110-10, startY=Math.random()*40-10;
    const length=Math.random()*100+60, duration=Math.random()*1.5+1, delay=Math.random()*.5;
    m.style.cssText = `left:${startX}%;top:${startY}%;width:${length}px;transform:rotate(${angle}deg);animation-duration:${duration}s;animation-delay:${delay}s;`;
    container.appendChild(m);
    setTimeout(() => m.remove(), (duration+delay)*1000+100);
  }
  setInterval(spawnMeteor, 550);
  for (let i=0;i<4;i++) setTimeout(spawnMeteor, i*250);
}

// ---- PARTICLES ----
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles=[];
  function resize() { W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
  function createParticles() {
    particles=[];
    const count=Math.floor(W*H/12000);
    for (let i=0;i<count;i++) {
      particles.push({ x:Math.random()*W, y:Math.random()*H, r:Math.random()*2.2+.4, vx:(Math.random()-.5)*.22, vy:(Math.random()-.5)*.22, op:Math.random()*.35+.08 });
    }
  }
  function draw() {
    ctx.clearRect(0,0,W,H);
    for (const p of particles) {
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(180,110,40,${p.op})`; ctx.fill();
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=W; if(p.x>W)p.x=0;
      if(p.y<0)p.y=H; if(p.y>H)p.y=0;
    }
    requestAnimationFrame(draw);
  }
  resize(); createParticles(); draw();
  window.addEventListener('resize', ()=>{ resize(); createParticles(); });
}

// ---- SCROLL TOP ----
function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY>300));
  btn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
}

// ---- CART ----
function addToCart(id, qty=1) {
  const item = findItem(id);
  if (!item) return;
  cart[id] = (cart[id]||0)+qty;
  if (cart[id]<1) delete cart[id];
  updateCartUI(); updateCheckoutBar();
  renderMenu(document.getElementById('searchInput')?.value||'');
  if (qty>0) showToast(`${item.emoji} ${item.name} ditambahkan!`);
}

function updateCartUI() {
  const total = Object.values(cart).reduce((s,q)=>s+q,0);
  const badge = document.getElementById('cartBadge');
  badge.textContent = total; badge.style.display = total>0?'flex':'none';
  const body = document.getElementById('cartBody');
  const foot = document.getElementById('cartFoot');
  const ids = Object.keys(cart);
  if (!ids.length) { body.innerHTML='<div class="empty-state">Keranjang kosong.<br>Pilih kopi dulu! ☕</div>'; foot.style.display='none'; return; }
  let html='', total_price=0;
  for (const id of ids) {
    const item=findItem(parseInt(id)); if(!item) continue;
    const qty=cart[id], sub=item.price*qty; total_price+=sub;
    html+=`<div class="cart-item"><span class="ci-emoji">${item.emoji}</span><div class="ci-info"><div class="ci-name">${item.name}</div><div class="ci-price">฿${item.price} × ${qty} = <strong>฿${sub}</strong></div></div><div class="ci-controls"><button onclick="addToCart(${item.id},-1)">−</button><span>${qty}</span><button onclick="addToCart(${item.id},1)">+</button></div></div>`;
  }
  body.innerHTML=html; document.getElementById('cartTotal').textContent=`฿ ${total_price}`; foot.style.display='block';
}

function updateCheckoutBar() {
  const bar=document.getElementById('checkoutBar');
  const ids=Object.keys(cart);
  if (!ids.length){bar.classList.remove('visible');return;}
  bar.classList.add('visible');
  let total=0;
  for(const id of ids){const item=findItem(parseInt(id));if(item)total+=item.price*cart[id];}
  document.getElementById('barTotal').textContent=`฿ ${total}`;
}

// ---- LIGHTBOX ----
let lbItemId=null;
function openLightbox(id) {
  const item=findItem(id); if(!item) return;
  lbItemId=id;
  document.getElementById('lbEmoji').textContent=item.emoji;
  document.getElementById('lbName').textContent=item.name;
  document.getElementById('lbDesc').textContent=item.desc;
  document.getElementById('lbPrice').textContent=`฿ ${item.price}`;
  document.getElementById('lbQty').textContent=cart[id]||0;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow='hidden';
}
function closeLightbox() { document.getElementById('lightbox').classList.remove('active'); document.body.style.overflow=''; }
function lbChangeQty(delta) { if(!lbItemId) return; addToCart(lbItemId,delta); document.getElementById('lbQty').textContent=cart[lbItemId]||0; }

// ---- PROMO MODAL ----
function openPromoModal(idx) {
  const p=PROMO_ITEMS[idx]; if(!p) return;
  document.getElementById('pmTag').textContent=p.tag;
  document.getElementById('pmBadge').textContent=p.badge;
  document.getElementById('pmBadge').style.background=p.color;
  document.getElementById('pmEmoji').textContent=p.emoji;
  document.getElementById('pmTitle').textContent=p.title;
  document.getElementById('pmSubtitle').textContent=p.subtitle;
  document.getElementById('pmDesc').textContent=p.desc;
  document.getElementById('pmValid').textContent='🕐 '+p.valid;
  document.getElementById('pmModal').style.background=p.bg;
  document.getElementById('promoModal').classList.add('active');
  document.body.style.overflow='hidden';
}
function closePromoModal() { document.getElementById('promoModal').classList.remove('active'); document.body.style.overflow=''; }

// ---- VIEW TOGGLE ----
function switchView(view) {
  currentView=view;
  document.getElementById('btnViewMenu').classList.toggle('active',view==='menu');
  document.getElementById('btnViewPromo').classList.toggle('active',view==='promo');
  document.getElementById('viewMenu').style.display=view==='menu'?'block':'none';
  document.getElementById('viewPromo').style.display=view==='promo'?'block':'none';
}

// ---- CHECKOUT ----
function validateForm() {
  const name=document.getElementById('custName').value.trim();
  const table=document.getElementById('custTable').value.trim();
  let valid=true;
  if (!name) { document.getElementById('nameField').classList.add('field-error'); document.getElementById('nameError').style.display='block'; valid=false; }
  else { document.getElementById('nameField').classList.remove('field-error'); document.getElementById('nameError').style.display='none'; }
  if (!table) { document.getElementById('tableField').classList.add('field-error'); document.getElementById('tableError').style.display='block'; valid=false; }
  else { document.getElementById('tableField').classList.remove('field-error'); document.getElementById('tableError').style.display='none'; }
  if (!valid) { document.getElementById('orderForm').scrollIntoView({behavior:'smooth',block:'center'}); showToast('⚠️ Nama & Meja/Lokasi wajib diisi dulu!'); }
  return valid;
}

function buildOrderText() {
  const name=document.getElementById('custName').value.trim();
  const table=document.getElementById('custTable').value.trim();
  const note=document.getElementById('custNote').value.trim()||'-';
  let lines=[`☕ *MARI KOPI SHOP*\n`,`*Nama:* ${name}`,`*Meja/Lokasi:* ${table}`,`*Catatan:* ${note}`,`\n*Pesanan:*`];
  let total=0; const items=[];
  for (const [id,qty] of Object.entries(cart)) {
    const item=findItem(parseInt(id)); if(!item) continue;
    const sub=item.price*qty; total+=sub;
    lines.push(`• ${item.name} ×${qty} = ฿${sub}`);
    items.push({name:item.name,qty,price:item.price,emoji:item.emoji});
  }
  lines.push(`\n*Total: ฿${total}*`);
  lines.push(`\n_Order via Mari Kopi Shop App_`);
  const order={id:Date.now(),name,table,note,items,total,ts:Date.now(),date:formatDate(Date.now()),time:formatTime(Date.now())};
  orderHistory.unshift(order);
  if(orderHistory.length>100) orderHistory=orderHistory.slice(0,100);
  localStorage.setItem('mk_orders',JSON.stringify(orderHistory));
  updateHistoryBadge(); addLiveNotif(order);
  return lines.join('\n');
}

function checkoutWA() {
  if(!Object.keys(cart).length){showToast('Keranjang masih kosong! ☕');return;}
  if(!validateForm()) return;
  const text=encodeURIComponent(buildOrderText());
  window.open(`https://wa.me/${WA_NUMBER}?text=${text}`,'_blank');
}
function checkoutTG() {
  if(!Object.keys(cart).length){showToast('Keranjang masih kosong! ☕');return;}
  if(!validateForm()) return;
  const text=encodeURIComponent(buildOrderText());
  window.open(`https://t.me/${TG_HANDLE}?text=${text}`,'_blank');
}

// ---- LIVE NOTIFICATIONS ----
function addLiveNotif(order) {
  const notif={id:order.id,name:order.name,table:order.table,items:order.items.slice(0,2).map(i=>i.name).join(', ')+(order.items.length>2?` +${order.items.length-2} lagi`:''),total:order.total,ts:order.ts};
  liveNotifs.unshift(notif);
  if(liveNotifs.length>50) liveNotifs=liveNotifs.slice(0,50);
  localStorage.setItem('mk_notifs',JSON.stringify(liveNotifs));
  showLiveNotifBanner(notif);
}
let notifQueue=[], notifShowing=false;
function showLiveNotifBanner(notif) { notifQueue.push(notif); if(!notifShowing) processNotifQueue(); }
function processNotifQueue() {
  if(!notifQueue.length){notifShowing=false;return;}
  notifShowing=true;
  const notif=notifQueue.shift();
  const banner=document.getElementById('liveOrderBanner');
  document.getElementById('lobName').textContent=notif.name;
  document.getElementById('lobTable').textContent=notif.table;
  document.getElementById('lobItems').textContent=notif.items;
  document.getElementById('lobTotal').textContent=`฿${notif.total}`;
  document.getElementById('lobTime').textContent=formatTime(notif.ts);
  banner.classList.add('show');
  setTimeout(()=>{ banner.classList.remove('show'); setTimeout(processNotifQueue,500); },4200);
}
function spawnDemoNotif() {
  const name=DEMO_NAMES[Math.floor(Math.random()*DEMO_NAMES.length)];
  const table=DEMO_TABLES[Math.floor(Math.random()*DEMO_TABLES.length)];
  const menuCount=Math.floor(Math.random()*3)+1;
  const menus=[];
  for(let i=0;i<menuCount;i++) menus.push(DEMO_MENUS[Math.floor(Math.random()*DEMO_MENUS.length)]);
  const total=Math.floor(Math.random()*5+1)*45+20;
  const notif={id:Date.now(),name,table,items:menus.join(', '),total,ts:Date.now()};
  showLiveNotifBanner(notif);
  liveNotifs.unshift(notif);
  if(liveNotifs.length>50) liveNotifs=liveNotifs.slice(0,50);
  localStorage.setItem('mk_notifs',JSON.stringify(liveNotifs));
}

// ---- MENU RENDER ----
function renderMenu(filterText='') {
  const container=document.getElementById('menuContainer');
  let html=''; const q=filterText.toLowerCase();
  for (const cat of CATEGORIES) {
    const items=q?cat.items.filter(i=>i.name.toLowerCase().includes(q)||i.desc.toLowerCase().includes(q)):cat.items;
    if(!items.length) continue;
    html+=`<div class="menu-cat" id="cat-${cat.id}"><div class="menu-cat-header"><span class="cat-emoji">${cat.emoji}</span><h3>${cat.name}</h3><span class="cat-count">${items.length} item</span></div><div class="menu-grid">`;
    for (const item of items) {
      const qty=cart[item.id]||0;
      html+=`<div class="menu-card ${qty>0?'in-cart':''}" onclick="openLightbox(${item.id})">
        ${item.badge?`<div class="mc-badge-top">${item.badge}</div>`:''}
        <div class="mc-emoji">${item.emoji}</div>
        <div class="mc-body">
          <div class="mc-name">${item.name}</div>
          <div class="mc-desc">${item.desc}</div>
          <div class="mc-footer">
            <span class="mc-price">฿ ${item.price}</span>
            ${qty>0?`<span class="mc-badge">×${qty}</span>`:'<span class="mc-add">+ Tambah</span>'}
          </div>
        </div>
      </div>`;
    }
    html+=`</div></div>`;
  }
  if(!html) html=`<div class="empty-state">Menu "${filterText}" tidak ditemukan ☕</div>`;
  container.innerHTML=html;
}
function filterMenu() { renderMenu(document.getElementById('searchInput')?.value||''); }

// ---- PROMO RENDER ----
function renderPromo() {
  const container=document.getElementById('promoContainer');
  container.innerHTML = PROMO_ITEMS.map((p,i) => {
    const isHot = p.hot;
    return `<div class="promo-card ${isHot?'hot-promo':''}" onclick="openPromoModal(${i})" style="background:${p.bg};--pc-accent:${p.accent||p.color}">
      <div class="pc-glow" style="background:radial-gradient(circle at 20% 50%,${p.color}30 0%,transparent 70%)"></div>
      <div class="pc-badge" style="background:${p.color}">${p.badge}</div>
      <div class="pc-emoji">${p.emoji}</div>
      <div class="pc-content">
        <div class="pc-tag">${p.tag}</div>
        <h3 class="pc-title">${p.title}</h3>
        <p class="pc-sub">${p.subtitle}</p>
        <div class="pc-valid">🕐 ${p.valid}</div>
        ${isHot?`<div class="pc-timer"><span class="pc-timer-dot"></span> Promo aktif sekarang!</div>`:''}
      </div>
      <div class="pc-arrow">→</div>
    </div>`;
  }).join('');
}

// ---- BEST SLIDER ----
let bestIndex=0;
function renderBest() {
  const track=document.getElementById('bestTrack');
  const dots=document.getElementById('bestDots');
  track.innerHTML=BEST_ITEMS.map((b,i)=>`<div class="best-card ${i===0?'active':''}" style="background:${b.bg}"><div class="best-tag">${b.tag}</div><div class="best-emoji">${b.emoji}</div><div class="best-name">${b.name}</div><div class="best-sub">${b.sub}</div></div>`).join('');
  dots.innerHTML=BEST_ITEMS.map((_,i)=>`<span class="dot ${i===0?'active':''}" onclick="goToBest(${i})"></span>`).join('');
}
function updateBest() {
  const cards=document.querySelectorAll('.best-card');
  const track=document.getElementById('bestTrack');
  cards.forEach((c,i)=>c.classList.toggle('active',i===bestIndex));
  document.querySelectorAll('#bestDots .dot').forEach((d,i)=>d.classList.toggle('active',i===bestIndex));
  const cardW=cards[0]?.offsetWidth+12||162;
  const offset=bestIndex*cardW - (document.querySelector('.best-slider-wrap')?.offsetWidth/2 - cardW/2);
  track.style.transform=`translateX(${-Math.max(0,offset)}px)`;
}
function moveBest(dir){bestIndex=(bestIndex+dir+BEST_ITEMS.length)%BEST_ITEMS.length;updateBest();}
function goToBest(i){bestIndex=i;updateBest();}

// ---- HERO SLIDER ----
let heroIndex=0;
function initHeroSlider() {
  const slides=document.querySelectorAll('.slide');
  const dotsEl=document.getElementById('sliderDots');
  dotsEl.innerHTML=Array.from(slides).map((_,i)=>`<span class="sdot ${i===0?'active':''}" onclick="goToHero(${i})"></span>`).join('');
}
function updateHero() {
  document.querySelectorAll('.slide').forEach((s,i)=>s.classList.toggle('active',i===heroIndex));
  document.querySelectorAll('.sdot').forEach((d,i)=>d.classList.toggle('active',i===heroIndex));
}
function slideMove(dir){const slides=document.querySelectorAll('.slide');heroIndex=(heroIndex+dir+slides.length)%slides.length;updateHero();}
function goToHero(i){heroIndex=i;updateHero();}

// ---- TESTIMONIALS ----
let testiIndex=0;
function renderTestimonials() {
  const track=document.getElementById('testiTrack');
  const dots=document.getElementById('testiDots');
  track.style.display='flex'; track.style.flexDirection='column'; track.style.position='relative';
  track.innerHTML=TESTIMONIALS.map((t,i)=>`<div class="testi-card ${i===0?'active':''}" style="position:${i===0?'relative':'absolute'};inset:0;"><div class="tc-stars">${'⭐'.repeat(t.stars)}</div><p class="tc-text">"${t.text}"</p><div class="tc-author"><span class="tc-avatar">${t.avatar}</span><div><div class="tc-name">${t.name}</div><div class="tc-item">☕ ${t.item}</div></div></div></div>`).join('');
  dots.innerHTML=TESTIMONIALS.map((_,i)=>`<span class="dot ${i===0?'active':''}" onclick="goToTesti(${i})"></span>`).join('');
}
function goToTesti(i) {
  testiIndex=i;
  document.querySelectorAll('.testi-card').forEach((c,idx)=>{
    c.classList.toggle('active',idx===i);
    c.style.position=idx===i?'relative':'absolute';
  });
  document.querySelectorAll('#testiDots .dot').forEach((d,idx)=>d.classList.toggle('active',idx===i));
}

// ---- HISTORY ----
function updateHistoryBadge() {
  const badge=document.getElementById('historyBadge');
  badge.textContent=orderHistory.length;
  badge.style.display=orderHistory.length>0?'flex':'none';
}
function renderHistory() {
  const body=document.getElementById('historyBody');
  const now=Date.now();
  if(!orderHistory.length){body.innerHTML='<div class="empty-state">Belum ada history pemesanan.</div>';return;}
  const topToday=getTopOrderer(orderHistory.filter(o=>isSameDay(o.ts,now)));
  const topWeek=getTopOrderer(orderHistory.filter(o=>isSameWeek(o.ts,now)));
  const topMonth=getTopOrderer(orderHistory.filter(o=>isSameMonth(o.ts,now)));
  let html=`<div class="stats-row"><div class="stat-card"><div class="stat-label">🏆 Top Hari Ini</div><div class="stat-name">${topToday}</div></div><div class="stat-card"><div class="stat-label">📅 Top Minggu</div><div class="stat-name">${topWeek}</div></div><div class="stat-card"><div class="stat-label">📆 Top Bulan</div><div class="stat-name">${topMonth}</div></div></div><div class="history-list">`;
  orderHistory.forEach(o=>{
    html+=`<div class="history-item"><div class="hi-head"><div class="hi-left"><span class="hi-name">👤 ${o.name}</span><span class="hi-table">📍 ${o.table}</span></div><div class="hi-right"><span class="hi-total">฿${o.total}</span></div></div><div class="hi-items">${o.items.map(i=>`${i.emoji||'☕'} ${i.name} ×${i.qty}`).join(' • ')}</div><div class="hi-meta">${o.time||''} • ${o.date||''}</div></div>`;
  });
  html+='</div>';
  body.innerHTML=html;
}
function getTopOrderer(orders) {
  if(!orders.length) return '—';
  const counts={};
  orders.forEach(o=>{counts[o.name]=(counts[o.name]||0)+1;});
  const sorted=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
  return sorted[0]?`${sorted[0][0]} (${sorted[0][1]}×)`:'—';
}
function clearHistory() {
  if(!confirm('Hapus semua history?')) return;
  orderHistory=[]; localStorage.setItem('mk_orders','[]');
  updateHistoryBadge(); renderHistory();
}

// ---- MODAL ----
function toggleModal(id) {
  const el=document.getElementById(id);
  const open=el.classList.toggle('active');
  document.body.style.overflow=open?'hidden':'';
  if(id==='cartModal'&&open) updateCartUI();
  if(id==='historyModal'&&open) renderHistory();
}
function handleModalClick(e,id) { if(e.target===document.getElementById(id)) toggleModal(id); }

// ---- SIDENAV ----
function openNav() { document.getElementById('sidenav').classList.add('open'); document.getElementById('overlay').classList.add('active'); document.body.style.overflow='hidden'; }
function closeNav() { document.getElementById('sidenav').classList.remove('open'); document.getElementById('overlay').classList.remove('active'); document.body.style.overflow=''; }

// ---- TOAST ----
let toastTimer;
function showToast(msg) {
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'),2500);
}

// ---- FORM VALIDATION ----
function initFormValidation() {
  document.getElementById('custName').addEventListener('input',function(){
    if(this.value.trim()){document.getElementById('nameField').classList.remove('field-error');document.getElementById('nameError').style.display='none';}
  });
  document.getElementById('custTable').addEventListener('input',function(){
    if(this.value.trim()){document.getElementById('tableField').classList.remove('field-error');document.getElementById('tableError').style.display='none';}
  });
}

// ---- AUTO SLIDES ----
function startAutoSlides() {
  setInterval(()=>slideMove(1), 4200);
  setInterval(()=>moveBest(1), 3500);
  setInterval(()=>{testiIndex=(testiIndex+1)%TESTIMONIALS.length;goToTesti(testiIndex);}, 5500);
  const spawnNext=()=>{ spawnDemoNotif(); setTimeout(spawnNext, Math.random()*8000+7000); };
  setTimeout(spawnNext, 3500);
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initMeteors();
  initScrollTop();
  initFormValidation();
  renderMenu();
  renderPromo();
  renderBest();
  renderTestimonials();
  initHeroSlider();
  updateHistoryBadge();
  updateCheckoutBar();
  startAutoSlides();

  document.getElementById('openNav').addEventListener('click', openNav);
  document.getElementById('closeNav').addEventListener('click', closeNav);
  document.getElementById('overlay').addEventListener('click', closeNav);
  document.getElementById('btnCart').addEventListener('click', ()=>toggleModal('cartModal'));
  document.getElementById('btnHistory').addEventListener('click', ()=>toggleModal('historyModal'));
  switchView('menu');
});
