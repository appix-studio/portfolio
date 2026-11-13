(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement;
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const yr=$('#year');if(yr)yr.textContent=new Date().getFullYear();

const nav=$('.nav'),bar=$('.progress');
const onScroll=()=>{
 nav.classList.toggle('is-stuck',scrollY>12);
 const h=root.scrollHeight-root.clientHeight;
 bar.style.transform='scaleX('+(h>0?Math.min(1,scrollY/h):0)+')';
};
addEventListener('scroll',onScroll,{passive:true});onScroll();

const mb=$('.menu'),nl=$('.links');
const setMenu=o=>{
 nl.classList.toggle('open',o);nav.classList.toggle('is-open',o);
 mb.setAttribute('aria-expanded',String(o));
 mb.setAttribute('aria-label',o?'Fermer le menu':'Ouvrir le menu');
 root.style.overflow=o?'hidden':'';
};
mb.addEventListener('click',()=>setMenu(mb.getAttribute('aria-expanded')!=='true'));
addEventListener('keydown',e=>{if(e.key==='Escape'&&mb.getAttribute('aria-expanded')==='true'){setMenu(false);mb.focus()}});
addEventListener('resize',()=>{if(innerWidth>860)setMenu(false)});

let lenis=null;
const hasLib=typeof gsap!=='undefined'&&typeof ScrollTrigger!=='undefined';
if(!rm&&typeof Lenis!=='undefined'&&hasLib){
 lenis=new Lenis({lerp:.1,wheelMultiplier:1,smoothWheel:true});
 gsap.registerPlugin(ScrollTrigger);
 lenis.on('scroll',ScrollTrigger.update);
 gsap.ticker.add(t=>lenis.raf(t*1000));
 gsap.ticker.lagSmoothing(0);
}
const navH=()=>nav.offsetHeight+12;
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
 const id=a.getAttribute('href');
 if(id.length<2)return;
 const t=$(id);if(!t)return;
 e.preventDefault();setMenu(false);
 if(id==='#haut'){lenis?lenis.scrollTo(0):scrollTo({top:0,behavior:rm?'auto':'smooth'});return}
 if(lenis)lenis.scrollTo(t,{offset:-navH(),duration:1.3});
 else t.scrollIntoView({behavior:rm?'auto':'smooth',block:'start'});
 history.replaceState(null,'',id);
}));

if(rm||!('IntersectionObserver' in window)){root.classList.add('rv-off')}
else{
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.05});
 $$('.rv').forEach((el,i)=>{el.style.transitionDelay=(i%3)*70+'ms';io.observe(el)});
}
requestAnimationFrame(()=>requestAnimationFrame(()=>root.classList.add('ready')));

$$('.frame').forEach(f=>{
 const img=$('.frame__img',f),chips=$$('.chip',f);
 chips.forEach(c=>c.addEventListener('click',()=>{
  chips.forEach(x=>x.setAttribute('aria-pressed',String(x===c)));
  if(img.getAttribute('src')===c.dataset.src)return;
  img.style.opacity='0';
  const n=new Image();
  n.onload=()=>{img.src=c.dataset.src;img.alt=c.dataset.alt||'';img.style.opacity='1'};
  n.src=c.dataset.src;
 }));
});

const counters=$$('[data-count]');
if(!rm&&'IntersectionObserver' in window){
 const co=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;co.unobserve(e.target);
  const el=e.target,to=+el.dataset.count,t0=performance.now();
  const step=n=>{const k=Math.min(1,(n-t0)/1100),v=Math.round(to*(1-Math.pow(1-k,3)));el.textContent=String(v).padStart(2,'0');if(k<1)requestAnimationFrame(step)};
  el.textContent='00';requestAnimationFrame(step);
 }),{threshold:.6});
 counters.forEach(c=>co.observe(c));
}

const links=$$('.links a:not(.btn)[href^="#"]');
const secs=links.map(a=>$(a.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window){
 const so=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}
 }),{rootMargin:'-45% 0px -50% 0px'});
 secs.forEach(s=>so.observe(s));
}

if(!rm&&hasLib&&lenis){
 const orbit=$('.hero__orbit');
 if(orbit)gsap.to(orbit,{yPercent:-12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
 $$('.frame__stage').forEach(s=>{
  gsap.fromTo($$('.frame__img',s),{scale:1.08},{scale:1,ease:'none',scrollTrigger:{trigger:s,start:'top bottom',end:'top 30%',scrub:true}});
 });
 $$('.proj__n').forEach(n=>{
  gsap.fromTo(n,{xPercent:-8},{xPercent:0,ease:'none',scrollTrigger:{trigger:n,start:'top bottom',end:'top 40%',scrub:true}});
 });
}

const form=$('#briefForm');
if(form){
 const result=$('#bf-result'),summary=$('#summary'),errBox=$('#bf-error');
 const ENDPOINT='https://formsubmit.co/ajax/appix.web@gmail.com';
 let briefText='';
 const value=name=>{
  const els=$$('[name="'+name+'"]',form);
  if(!els.length)return '';
  if(els[0].type==='checkbox')return els.filter(e=>e.checked).map(e=>e.value).join(', ');
  if(els[0].type==='radio')return (els.find(e=>e.checked)||{}).value||'';
  return els[0].value.trim();
 };
 const prettyDate=v=>{if(!v)return '';return new Date(v+'T12:00:00').toLocaleDateString('fr-FR',{day:'2-digit',month:'long',year:'numeric'})};
 const updateConditional=()=>{
  const t=value('projectType');
  $('#refonteFields').classList.toggle('visible',t==='Refonte');
  $('#landingFields').classList.toggle('visible',t==='Landing page');
  $('#shopFields').classList.toggle('visible',t==='Boutique en ligne');
 };
 $$('input[name="projectType"]').forEach(el=>el.addEventListener('change',updateConditional));
 const makeSummary=()=>{
  const rows=[
   ['Nom',value('clientName')],['Entreprise / marque',value('company')],['E-mail',value('email')],['Activité',value('industry')],['Clientèle cible',value('audience')],['Services / produits',value('services')],
   ['Type de projet',value('projectType')],['Objectif principal',value('goal')],['Pages envisagées',value('pages')],['Site actuel',value('currentUrl')],['Attentes de refonte',value('refonteNeeds')],['Offre / conversion de la landing page',value('offer')],['Produits à vendre',value('shopNeeds')],
   ['Style souhaité',value('style')],['Sites de référence',value('references')],['Éléments disponibles',value('assets')],['Fonctionnalités',value('features')],['Détails des fonctionnalités',value('featureDetails')],
   ['Date de lancement souhaitée',prettyDate(value('deadline'))],['Budget envisagé',value('budget')],['Domaine / hébergement',value('hosting')],['Nom de domaine',value('domain')],['Autres informations',value('extra')],['Critère de réussite',value('success')]
  ];
  return 'BRIEF PROJET WEB — APPIX STUDIO\n\n'+rows.filter(r=>r[1]).map(r=>r[0]+' :\n'+r[1]).join('\n\n')+'\n\nPréparé depuis le portfolio APPIX STUDIO.';
 };
 const emailBtn=$('#emailBtn');
 const clearSend=()=>{
  emailBtn.disabled=false;emailBtn.textContent='Envoyer mon brief ↗';
  $$('#bf-result .hint[role="status"],#sendError').forEach(n=>n.remove());
 };
 const dl=$('#deadline');
 if(dl){const n=new Date();dl.min=n.getFullYear()+'-'+String(n.getMonth()+1).padStart(2,'0')+'-'+String(n.getDate()).padStart(2,'0')}
 form.addEventListener('submit',e=>{
  e.preventDefault();clearSend();
  if(!form.reportValidity()){errBox.classList.add('show');return}
  errBox.classList.remove('show');
  briefText=makeSummary();summary.textContent=briefText;result.classList.add('show');
  $('#downloadBtn').focus({preventScroll:true});
  if(lenis)lenis.scrollTo(result,{offset:-navH()-40});else result.scrollIntoView({behavior:rm?'auto':'smooth',block:'center'});
 });
 $('#downloadBtn').addEventListener('click',()=>{
  const url=URL.createObjectURL(new Blob([briefText],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');
  a.href=url;a.download='brief-projet-web-appix.txt';document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);
 });
 emailBtn.addEventListener('click',async()=>{
  const label=emailBtn.textContent;
  const old=$('#sendError');if(old)old.remove();
  emailBtn.disabled=true;emailBtn.textContent='Envoi en cours…';
  try{
   const r=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({name:value('clientName'),email:value('email'),_subject:'Brief projet web — '+value('company'),_template:'box',message:briefText,_honey:(form.querySelector('input[name="_honey"]')||{}).value||''})});
   const d=await r.json();
   if(!r.ok||d.success===false||String(d.success)==='false')throw new Error('refus');
   emailBtn.textContent='Brief envoyé ✓';
   const p=document.createElement('p');p.className='hint';p.setAttribute('role','status');p.textContent='Merci, votre brief a bien été transmis.';
   emailBtn.parentElement.insertAdjacentElement('afterend',p);
  }catch(err){
   emailBtn.disabled=false;emailBtn.textContent=label;
   const p=document.createElement('p');p.id='sendError';p.className='error show';p.setAttribute('role','alert');
   p.textContent='L’envoi automatique a échoué. Vérifiez votre connexion puis réessayez, ou téléchargez le brief et envoyez-le par e-mail.';
   emailBtn.parentElement.insertAdjacentElement('afterend',p);
  }
 });
 $('#editBtn').addEventListener('click',()=>{
  result.classList.remove('show');
  const t=$('#b-about');
  if(lenis)lenis.scrollTo(t,{offset:-navH()});else t.scrollIntoView({behavior:rm?'auto':'smooth',block:'start'});
  $('#clientName').focus({preventScroll:true});
 });
 const stepLinks=$$('.step-link');
 if('IntersectionObserver' in window){
  const io2=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting)stepLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+en.target.id))}),{rootMargin:'-20% 0px -65% 0px'});
  ['b-about','b-project','b-style','b-features','b-practical'].forEach(id=>{const el=$('#'+id);if(el)io2.observe(el)});
 }
}
})();
