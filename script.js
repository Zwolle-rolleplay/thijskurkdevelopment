
document.addEventListener('DOMContentLoaded', function(){
  const projects = [
    {id:'p1', title:'ServerBoost', tags:['Performance','Java','Spigot'], short:'Async chunk management and TPS stabilizer.', img:'assets/plugin_1.png'},
    {id:'p2', title:'TradeMaster', tags:['Economy','Java','Bukkit'], short:'Configurable trading system with GUIs.', img:'assets/plugin_2.png'},
    {id:'p3', title:'SkyWarsPlus', tags:['Minigame','Java','Paper'], short:'Team-based SkyWars with powerups.', img:'assets/plugin_3.png'},
    {id:'p4', title:'VoteRewardsX', tags:['Rewards','Java','MySQL'], short:'Reward system integrated with voting', img:'assets/plugin_4.png'},
    {id:'p5', title:'AntiCheatLite', tags:['Security','Java','Spigot'], short:'Lightweight anti-cheat with low false positives', img:'assets/plugin_5.png'},
    {id:'p6', title:'BuildGuard', tags:['Protection','Java','WorldGuard'], short:'Advanced build protection tools', img:'assets/plugin_6.png'},
    {id:'p7', title:'AutoAnnouncer', tags:['Utility','Java'], short:'Custom scheduled announcements', img:'assets/plugin_7.png'},
    {id:'p8', title:'ShopBridge', tags:['Economy','Java','Shop'], short:'Integrates with multiple economy plugins', img:'assets/plugin_8.png'},
    {id:'p9', title:'QuestChain', tags:['Gameplay','Java'], short:'Configurable quest system', img:'assets/plugin_9.png'},
    {id:'p10', title:'WarpManager', tags:['Utility','Java'], short:'Fast warp management with cooldowns', img:'assets/plugin_10.png'}
  ];

  // render project cards if grid present
  const grid = document.getElementById('projects-grid');
  if(grid){
    projects.forEach(p => {
      const card = document.createElement('article');
      card.className = 'card reveal';
      card.innerHTML = `
        <img src="${p.img}" alt="${p.title} preview">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div class="title">${p.title}</div>
          <div class="meta">Coming soon</div>
        </div>
        <div class="meta">${p.tags.join(' • ')}</div>
        <div style="flex:1">${p.short}</div>
        <div style="margin-top:8px;display:flex;gap:8px"><a class="btn btn-primary" href="mailto:thijskurk@example.com?subject=Interesse%20in%20${encodeURIComponent(p.title)}">Interesse</a><a class="btn" data-id="${p.id}" href="#">Details</a></div>
      `;
      grid.appendChild(card);
    });
  }

  // featured on index
  const featured = document.getElementById('featured-grid');
  if(featured){
    projects.slice(0,3).forEach(p => {
      const el = document.createElement('article');
      el.className = 'card reveal';
      el.innerHTML = `
        <img src="${p.img}" alt="${p.title} preview">
        <div class="title">${p.title}</div>
        <div class="meta">${p.tags.join(' • ')}</div>
        <div style="margin-top:8px">${p.short}</div>
      `;
      featured.appendChild(el);
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  }, {threshold: 0.12});
  reveals.forEach(r => io.observe(r));

  // animate background words subtly
  const bgWords = document.querySelectorAll('.bg-words span');
  let t = 0;
  if(bgWords.length){
    setInterval(()=>{ t+=0.03; bgWords.forEach((el,i)=>{ const s = Math.sin(t*2 + i); el.style.transform = `translateX(${s*18}px) skewX(${ -6 + s*4 }deg) scale(${1+Math.abs(s)*0.02})`; }) },30);
  }

  // project details overlay
  document.addEventListener('click', e=>{
    const a = e.target.closest('a[data-id]');
    if(!a) return;
    e.preventDefault();
    const id = a.dataset.id;
    const p = projects.find(x=>x.id===id);
    if(!p) return;
    let ov = document.getElementById('pk-overlay');
    if(!ov){
      ov = document.createElement('div'); ov.id='pk-overlay'; ov.style.position='fixed'; ov.style.inset=0; ov.style.display='grid'; ov.style.placeItems='center'; ov.style.background='linear-gradient(180deg, rgba(2,6,23,0.6), rgba(2,6,23,0.9))'; ov.style.zIndex=120;
      ov.innerHTML = `<div style="width:92%;max-width:880px;background:rgba(255,255,255,0.03);padding:20px;border-radius:12px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><div id="pk-title" style="font-weight:800;font-size:20px"></div><button id="pk-close" class="btn">Close</button></div><div id="pk-body"></div></div>`;
      document.body.appendChild(ov);
      document.getElementById('pk-close').addEventListener('click', ()=> ov.remove());
    }
    document.getElementById('pk-title').textContent = p.title;
    document.getElementById('pk-body').innerHTML = `<img src="${p.img}" style="width:100%;border-radius:10px;margin-bottom:12px"><div style="margin-bottom:8px"><strong>Tags:</strong> ${p.tags.join(', ')}</div><div style="margin-bottom:10px">${p.short}</div><div style="margin-top:12px"><a class="btn btn-primary" href="mailto:thijskurk@example.com?subject=Interesse%20in%20${encodeURIComponent(p.title)}">Neem contact op</a></div>`;
  });

});
