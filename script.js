/* Drish Shah Portfolio — script.js */

/* ── Cursor + sparkle trail ── */
(function() {
  const dot=document.querySelector('.cursor-dot'), ring=document.querySelector('.cursor-ring');
  if (!dot||!ring) return;
  let mx=0,my=0,rx=0,ry=0,throttle=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;spawnSparkle(e.clientX,e.clientY);});
  document.addEventListener('mouseleave',()=>{dot.style.opacity='0';ring.style.opacity='0';});
  document.addEventListener('mouseenter',()=>{dot.style.opacity='1';ring.style.opacity='.55';});
  (function tick(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;dot.style.left=mx+'px';dot.style.top=my+'px';ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(tick);})();
  document.querySelectorAll('a,button,.photo-frame,.tilt-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ring.style.width='52px';ring.style.height='52px';ring.style.opacity='.85';ring.style.borderColor='var(--blue-light)';});
    el.addEventListener('mouseleave',()=>{ring.style.width='34px';ring.style.height='34px';ring.style.opacity='.55';ring.style.borderColor='var(--blue)';});
  });
  function spawnSparkle(x,y){
    const now=Date.now(); if(now-throttle<50)return; throttle=now;
    const s=document.createElement('div'); s.className='cursor-sparkle';
    const size=2+Math.random()*5, angle=Math.random()*360, dist=10+Math.random()*20;
    Object.assign(s.style,{left:(x-size/2)+'px',top:(y-size/2)+'px',width:size+'px',height:size+'px','--ox':(Math.cos(angle*Math.PI/180)*dist)+'px','--oy':(Math.sin(angle*Math.PI/180)*dist)+'px'});
    document.body.appendChild(s); setTimeout(()=>s.remove(),700);
  }
})();

/* ── Scroll progress ── */
(function(){
  const bar=document.getElementById('scroll-progress'); if(!bar)return;
  window.addEventListener('scroll',()=>{bar.style.transform='scaleX('+Math.min(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight),1)+')';},{passive:true});
})();

/* ── Page transitions ── */
(function(){
  const ov=document.getElementById('page-transition'); if(!ov)return;
  ov.classList.add('leaving');
  document.querySelectorAll('a[href]').forEach(a=>{
    const href=a.getAttribute('href');
    if(!href||href.startsWith('http')||href.startsWith('#')||href.startsWith('mailto'))return;
    a.addEventListener('click',e=>{e.preventDefault();ov.classList.remove('leaving');ov.classList.add('entering');setTimeout(()=>{window.location.href=href;},420);});
  });
})();

/* ── Reveal on scroll ── */
(function(){
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');obs.unobserve(e.target);}});},{threshold:.07});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
})();

/* ── Animated counters ── */
(function(){
  const obs=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;obs.unobserve(entry.target);const el=entry.target;if(el.dataset.count==='inf'){el.textContent='inf';return;}const target=parseFloat(el.dataset.count);let start=0;const step=ts=>{if(!start)start=ts;const p=Math.min((ts-start)/1600,1);el.textContent=Math.floor((1-Math.pow(1-p,3))*target);if(p<1)requestAnimationFrame(step);else el.textContent=target;};requestAnimationFrame(step);});},{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(el=>obs.observe(el));
})();

/* ── 3D Tilt ── */
(function(){
  document.querySelectorAll('.tilt-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();const rx=((e.clientY-r.top-r.height/2)/(r.height/2))*-7;const ry=((e.clientX-r.left-r.width/2)/(r.width/2))*7;card.style.transform='perspective(900px) rotateX('+rx+'deg) rotateY('+ry+'deg) scale(1.025)';card.style.transition='transform .05s';});
    card.addEventListener('mouseleave',()=>{card.style.transform='perspective(900px) rotateX(0) rotateY(0) scale(1)';card.style.transition='transform .5s ease';});
  });
})();

/* ── Typewriter ── */
(function(){
  const el=document.getElementById('typewriter'); if(!el)return;
  const words=JSON.parse(el.dataset.words||'[]'); if(!words.length)return;
  let wi=0,ci=0,del=false,wait=false;
  function tick(){const word=words[wi];if(wait){wait=false;del=true;setTimeout(tick,1800);return;}if(!del){el.textContent=word.slice(0,++ci);if(ci===word.length){wait=true;setTimeout(tick,100);return;}}else{el.textContent=word.slice(0,--ci);if(ci===0){del=false;wi=(wi+1)%words.length;}}setTimeout(tick,del?42:80);}
  tick();
})();

/* ── Active nav ── */
(function(){
  const path=window.location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{if(a.getAttribute('href').split('/').pop()===path)a.classList.add('active');});
})();

/* ── Splash ── */
(function(){
  const splash=document.getElementById('splash'); if(!splash)return;
  if(sessionStorage.getItem('ds_splash')){splash.style.display='none';return;}
  setTimeout(()=>{splash.classList.add('splash-out');setTimeout(()=>{splash.style.display='none';sessionStorage.setItem('ds_splash','1');},900);},2400);
})();

/* ── Birthday countdown (Sep 24) ── */
(function(){
  const el=document.getElementById('bday-countdown'); if(!el)return;
  const now=new Date();
  let bday=new Date(now.getFullYear(),8,24); // September = month 8
  if(now>bday)bday.setFullYear(now.getFullYear()+1);
  const diff=Math.ceil((bday-now)/86400000);
  if(diff===0){el.innerHTML='<span class="cd-num">Today</span><span class="cd-label">Happy Birthday Drish</span>';}
  else{el.innerHTML='<span class="cd-num">'+diff+'</span><span class="cd-label">days until 24 September</span>';}
})();

/* ── Dev key: Ctrl/Cmd + Shift + ; then 2 ── */
(function(){
  let gotColon=false, colonTimer;
  document.addEventListener('keydown',e=>{
    const ctrl=e.ctrlKey||e.metaKey;
    if(ctrl&&(e.key==='l'||(e.shiftKey&&e.key==='L'))){gotColon=true;clearTimeout(colonTimer);colonTimer=setTimeout(()=>{gotColon=false;},2500);}
    if(ctrl&&e.key==='2'&&gotColon){gotColon=false;clearTimeout(colonTimer);window.location.href='birthday.html';}
  });
})();
