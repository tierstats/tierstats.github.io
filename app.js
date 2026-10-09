/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var D=window.LB_DATA,we="https://tierstats-publish.tierstats.workers.dev/publish",d=(e,s=document)=>s.querySelector(e),C=(e,s=document)=>[...s.querySelectorAll(e)],f=e=>String(e).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),G=e=>encodeURIComponent(String(e)),De=e=>decodeURIComponent(e);function Oe(e,s,n={}){let o=n.dur||1200,l=n.dec||0,m=performance.now(),g=parseFloat(e.textContent)||0;function h(i){let u=Math.min(1,(i-m)/o),w=1-Math.pow(1-u,3);e.textContent=(g+(s-g)*w).toFixed(l),u<1&&requestAnimationFrame(h)}requestAnimationFrame(h),setTimeout(()=>{e.textContent=s.toFixed(l)},o+300)}var nt='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',it='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function $e(e,s=""){let n=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",o=e<=3?e===1?nt:it:"";return`<div class="rank-badge ${n} ${s}" title="${t("home.rankTip",{n:e})}">${o}<span class="num">${e}</span></div>`}var O=e=>t(e==="W"?"rec.wLetter":e==="L"?"rec.lLetter":"rec.dLetter"),B={},F=[],Y={players:[],byName:{},qualified:[]},oe={},fe={},X={},Ee=new Set,_e="tt1v1_baseline",Ce={prevRatings:{},prevRanks:{}};function ot(){
  Ce={
    prevRatings:{...(D.prevRatings||{})},
    prevRanks:{...(D.prevRanks||{})}
  };
}
function lt(){for(let n in oe)delete oe[n];let e=new Set(H().aliasRemoved||[]);Object.entries(D.aliases).forEach(([n,o])=>{e.has(n)||(oe[n.toLowerCase()]=o)}),Object.entries(H().aliases||{}).forEach(([n,o])=>{oe[String(n).toLowerCase()]=o});for(let n of Object.keys(fe))delete fe[n];for(let n of Object.keys(X))delete X[n];Ee.clear();let s=(n,o)=>{Object.keys(n||{}).forEach(l=>{let m=U(l);m!==l&&(o[m]=n[l])}),Object.keys(n||{}).forEach(l=>{let m=U(l);m===l&&(o[m]=n[l])})};s(D.seeds,fe),s(Ce.prevRatings,X),(D.inactiveList||[]).forEach(n=>Ee.add(U(n)))}var U=e=>{let s=String(e).trim(),n=new Set;for(;;){let o=oe[s.toLowerCase()];if(!o||o===s||n.has(s))return s;n.add(s),s=o}};function Ne(e){let s=[];return W().forEach(n=>{let o=(l,m,g)=>({opp:l,for_:m,against:g,res:m>g?"W":m<g?"L":"D",date:n.date});n.a===e?s.push(o(n.b,n.sa,n.sb)):n.b===e&&s.push(o(n.a,n.sb,n.sa))}),s}function rt(e){let s={};return Ne(e).forEach(n=>{let o=s[n.opp]||(s[n.opp]={w:0,l:0,d:0,pf:0,pa:0});o[n.res.toLowerCase()]+=1,o.pf+=n.for_,o.pa+=n.against}),Object.entries(s).map(([n,o])=>({opp:n,...o})).sort((n,o)=>o.w+o.l+o.d-(n.w+n.l+n.d)||o.w-n.w)}function ct(e){let s=B[e]||{};return s.provisional?`<span class="tag prov">${t("tag.provisional")}</span>`:s.inactive?`<span class="tag inact">${t("tag.inactive")}</span>`:""}function dt(e){let s=Ne(e).slice(0,5).reverse();if(!s.length)return"";let n=s.map(o=>O(o.res)).join(" ");return`<span class="form" title="${t("form.title",{n:s.length,seq:n})}">${s.map(o=>`<i class="${o.res.toLowerCase()}">${O(o.res)}</i>`).join("")}</span>`}function We(){let e=typeof getLang=="function"?getLang():"en";return{en:"en-US",zh:"zh-CN",ja:"ja-JP",ru:"ru-RU"}[e]||"en-US"}function Je(e){let s=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||"").slice(0,10));return s?new Date(+s[1],+s[2]-1,+s[3]):null}function se(e){let s=Je(e);if(!s)return"";let n=s.getFullYear()===new Date().getFullYear();try{return new Intl.DateTimeFormat(We(),n?{month:"short",day:"numeric"}:{year:"numeric",month:"short",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function ze(e){let s=Je(e);if(!s)return"";try{return new Intl.DateTimeFormat(We(),{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Ae(e){let s=e.delta!=null?e.delta:0;if(Math.abs(s)<.05)return"";let n=s>0,o=Math.abs(s).toFixed(1);return`<span class="delta ${n?"up":"down"}" title="${n?t("delta.upTitle",{n:o}):t("delta.downTitle",{n:o})}">${n?"\u25B2":"\u25BC"} ${o}</span>`}function vt(){let e=Ce.prevRanks||{},s=Object.keys(e);if(s.length){let l={};return s.forEach(m=>{l[U(m)]=e[m]}),l}let n={};F.forEach(l=>{X[l.name]!=null&&(n[l.name]=X[l.name])});let o={};return Object.entries(n).sort((l,m)=>m[1]-l[1]).forEach(([l],m)=>{o[l]=m+1}),o}function pt(e,s){let n=s[e.name]!=null?s[e.name]:s[U(e.name)];if(n==null){let l=(D.newSince||{})[e.name];return!l||(Date.now()-Date.parse(l))/864e5>5?"":`<span class="mv new" title="${t("mv.newTitle")}">${t("mv.new")}</span>`}let o=n-e.rank;return o>0?`<span class="mv up" title="${tp("mv.up",o)}">\u25B2${o}</span>`:o<0?`<span class="mv down" title="${tp("mv.down",-o)}">\u25BC${-o}</span>`:""}function ve(e){return`${Math.round(e.rating-100)} \u2013 ${Math.round(e.rating+100)}`}function ye(e,s){if(!e.provisional)return e.rating.toFixed(1);let n=s?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:ve(e);return`<span class="prov-range" title="${t("rating.provTitle")}">${n}</span>`}var Ye="tt1v1_admin_log_v1",ee="tt1v1_admin_ok",K="tt1v1_admin_pw",mt=()=>sessionStorage.getItem(ee)==="1"||localStorage.getItem(ee)==="1",le=()=>sessionStorage.getItem(K)||localStorage.getItem(K)||"";function ut(e,s){s?(localStorage.setItem(ee,"1"),localStorage.setItem(K,e)):(sessionStorage.setItem(ee,"1"),sessionStorage.setItem(K,e),localStorage.removeItem(ee),localStorage.removeItem(K))}function ft(){[sessionStorage,localStorage].forEach(e=>{e.removeItem(ee),e.removeItem(K)})}var Be=null,Me=!1;function Ve(){Me||!le()||(clearTimeout(Be),Be=setTimeout(()=>publishLog({silent:!0}),1500))}var ht=we.replace(/\/publish$/,"/verify"),gt=we.replace(/\/publish$/,"/sync");function Z(){try{return JSON.parse(localStorage.getItem(Ye)||"[]")}catch{return[]}}function ne(e){try{localStorage.setItem(Ye,JSON.stringify(e))}catch{}Ve()}var Ze="tt1v1_admin_over_v1";function j(){try{return JSON.parse(localStorage.getItem(Ze)||"{}")||{}}catch{return{}}}function A(e){try{localStorage.setItem(Ze,JSON.stringify(e))}catch{}Ve()}function H(){let e=window.LB_PUB||{},s=j(),n=new Set([...e.aliasRemoved||[],...s.aliasRemoved||[]]),o=new Set([...e.seedRemoved||[],...s.seedRemoved||[]]),l=s.aliases||{},m={...s.seeds||{},...s.seedGlicko||{},...s.seedRd||{}},g=L=>Object.fromEntries(Object.entries(L||{}).filter(([a])=>!n.has(a)||l[a]!=null)),h=L=>Object.fromEntries(Object.entries(L||{}).filter(([a])=>!o.has(a)||m[a]!=null)),i=g({...e.aliases||{},...s.aliases||{}}),u=g({...e.aliasNotes||{},...s.aliasNotes||{}}),w=h({...e.seeds||{},...s.seeds||{}}),k=h({...e.seedGlicko||{},...s.seedGlicko||{}}),E=h({...e.seedRd||{},...s.seedRd||{}});return{aliases:i,aliasNotes:u,seeds:w,seedGlicko:k,seedRd:E,aliasRemoved:[...n].filter(L=>i[L]==null),seedRemoved:[...o].filter(L=>w[L]==null&&k[L]==null&&E[L]==null),settings:{...e.settings||{},...s.settings||{}},matchEdits:{...e.matchEdits||{},...s.matchEdits||{}},inactive:s.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...s.matchRemoved||[]])],faq:s.faq!=null?s.faq:e.faq!=null?e.faq:null}}function Qe(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function W(){let e=H(),s=e.matchEdits||{},n=new Set(e.matchRemoved||[]),o=(k,E)=>{if(n.has(E))return null;let L=s[E],a=L?{...k,sa:L.sa,sb:L.sb,date:L.date!=null?L.date:k.date}:k;return{...a,a:U(a.a),b:U(a.b),sa:+a.sa,sb:+a.sb,key:E}},l=Z().map((k,E)=>o({...k,admin:!0,published:!1},"l:"+E)).filter(Boolean),m=Qe().map((k,E)=>o({...k,admin:!0,published:!0},"p:"+E)).filter(Boolean),g=D.matches.map((k,E)=>o({...k,admin:!1,published:!1},"a:"+E)).filter(Boolean).reverse(),h=k=>{let E=k.a>k.b;return[E?k.b:k.a,E?k.a:k.b,E?k.sb:k.sa,E?k.sa:k.sb,k.date||""].join("|")},i={};g.forEach(k=>{let E=h(k);i[E]=(i[E]||0)+1});let u={};return l.concat(m).filter(k=>{let E=h(k);return u[E]=(u[E]||0)+1,u[E]>(i[E]||0)}).concat(g)}var R={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},he=864e5,de=Math.log(10)/400,Ke=e=>1/Math.sqrt(1+3*de*de*e*e/(Math.PI*Math.PI)),Re=(e,s,n)=>1/(1+Math.pow(10,-Ke(n)*(e-s)/400));function bt(e){let s=H().seeds||{};return s[e]!=null&&s[e]!==""?Number(s[e]):fe[e]}function yt(e){let s=(H().seedGlicko||{})[e],n=(H().seedRd||{})[e],o=s!=null&&s!==""?Number(s):null,l=n!=null&&n!==""?Number(n):null;if(o!=null||l!=null)return[o??R.unratedR,l??R.unratedRd];let m=bt(e);return m!=null?[Math.max(R.seedMid+(m-R.oldMid)*R.ptsPer,R.minSeed),R.knownRd]:[R.unratedR,R.unratedRd]}function He(e,s,n){let o=0,l=0;for(let[g,h,i]of n){let u=Ke(h),w=Re(e,g,h);o+=u*u*w*(1-w),l+=u*(i-w)}if(o*=de*de,o<=0)return[e,s];let m=1/(s*s)+o;return[e+de/m*l,Math.sqrt(1/m)]}function wt(e,s){let n=Math.pow(10,s),o=e*n,l=Math.floor(o);return Math.abs(o-l-.5)<1e-6?(l%2===0?l:l+1)/n:Math.round(o)/n}var je=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(R.periodDays*he)),re=je(R.graceStart),$t={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function Pe(){let e=H().settings||{};return(D.settings||[]).map(s=>({...s,value:Object.prototype.hasOwnProperty.call(e,s.name)?e[s.name]:s.value}))}function kt(){for(let e of Pe()){let s=$t[e.name];if(!s)continue;if(s==="graceStart"){let o=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(o)&&(R.graceStart=o);continue}let n=Number(e.value);Number.isFinite(n)&&(R[s]=n)}re=je(R.graceStart),C(".cons-val").forEach(e=>{e.textContent=String(R.conservative)}),C(".min-matches-val").forEach(e=>{e.textContent=String(R.minMatches)}),C(".min-opp-val").forEach(e=>{e.textContent=String(R.minOpp)})}function Lt(){kt(),lt();let e={},s=a=>{if(!e[a]){let[r,p]=yt(a);e[a]={name:a,r,rd:p,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[a]},n=(a,r,p,c,b,x)=>{let v=s(a);v.games++,v.opps.add(r),p>c?v.w++:p<c?v.l++:v.d++,v.lastIdx=x,b&&(v.lastDate=b)},o={};for(let a of W()){if(a.date)continue;let r=a.a,p=a.b,c=a.sa>a.sb?1:a.sa<a.sb?0:.5;(o[r]=o[r]||[]).push([p,c]),(o[p]=o[p]||[]).push([r,1-c]),n(r,p,a.sa,a.sb,"",re),n(p,r,a.sb,a.sa,"",re)}let l={};for(let a in o)l[a]=[s(a).r,s(a).rd];for(let a in o){let[r,p]=He(l[a][0],l[a][1],o[a].map(([c,b])=>[l[c][0],l[c][1],b]));s(a).r=r,s(a).rd=p}let m=new Map;for(let a of W().filter(r=>r.date).slice().reverse()){let r=a.date,p=je(r);m.has(p)||m.set(p,[]),m.get(p).push({a:U(a.a),b:U(a.b),sa:+a.sa,sb:+a.sb,date:r})}for(let a of[...m.keys()].sort((r,p)=>r-p)){for(let c in e){let b=e[c],x=a-(b.lastIdx==null?re:b.lastIdx);x>0&&(b.rd=Math.min(Math.sqrt(b.rd*b.rd+R.growth*R.growth*x),R.maxRd))}let r={};for(let c of m.get(a)){let b=c.sa>c.sb?1:c.sa<c.sb?0:.5;(r[c.a]=r[c.a]||[]).push([c.b,b]),(r[c.b]=r[c.b]||[]).push([c.a,1-b]),n(c.a,c.b,c.sa,c.sb,c.date,a),n(c.b,c.a,c.sb,c.sa,c.date,a)}let p={};for(let c in r)p[c]=[s(c).r,s(c).rd];for(let c in r){let[b,x]=He(p[c][0],p[c][1],r[c].map(([v,$])=>[p[v][0],p[v][1],$]));s(c).r=b,s(c).rd=x}}let g=Object.values(e).map(a=>({name:a.name,glicko:a.r,rd:a.rd,rating:a.r-R.conservative*a.rd,matches:a.games,w:a.w,l:a.l,d:a.d,winPct:a.games?wt(a.w/a.games*100,1):0,opponents:a.opps.size,avgOpp:0,lastMatch:a.lastDate||"",provisional:!(a.games>=R.minMatches&&a.opps.size>=R.minOpp),inactive:!1})),h={};g.forEach(a=>{h[a.name]=a.glicko}),g.forEach(a=>{let r=0;e[a.name].opps.forEach(p=>{r+=h[p]!=null?h[p]:R.unratedR}),a.avgOpp=e[a.name].opps.size?r/e[a.name].opps.size:0});let i=Date.now(),u=Math.floor(i/(R.periodDays*he));for(let a in e){let r=e[a],p=u-(r.lastIdx==null?re:r.lastIdx);p>0&&(r.rd=Math.min(Math.sqrt(r.rd*r.rd+R.growth*R.growth*p),R.maxRd))}g.forEach(a=>{a.glicko=e[a.name].r,a.rd=e[a.name].rd,a.rating=a.glicko-R.conservative*a.rd;let r=X[a.name],p=(D.curRatings||{})[a.name];a.delta=r!=null?(p??a.rating)-r:0});let w=Date.parse(R.graceStart+"T00:00:00Z")+R.graceDays*he,k=new Set([...Ee,...H().inactive||[]]);g.forEach(a=>{a.inactive=k.has(a.name)||(a.lastMatch?i-Date.parse(a.lastMatch+"T00:00:00Z")>R.inactiveDays*he:i>w)});let E=g.filter(a=>!a.provisional&&!a.inactive).sort((a,r)=>r.rating-a.rating);E.forEach((a,r)=>{a.rank=r+1}),g.sort((a,r)=>r.rating-a.rating);let L={};return g.forEach(a=>{L[a.name]=a}),{players:g,byName:L,qualified:E}}function N(){
  ot();
  kt();
  lt();

  var rankMap = {};
  (D.qualified || []).forEach(function(p){
    rankMap[p.name] = p.rank;
  });

  var inactiveSet = new Set((D.inactiveList || []).map(function(n){
    return String(n).toLowerCase();
  }));

  var players = (D.players || []).map(function(p){
    var x = Object.assign({}, p);
    x.rank = Object.prototype.hasOwnProperty.call(rankMap, p.name) ? rankMap[p.name] : null;
    x.provisional = !!p.provisional;
    x.inactive = inactiveSet.has(String(p.name).toLowerCase());

    var prev = (D.prevRatings || {})[p.name];
    x.delta = prev != null ? Number(p.rating) - Number(prev) : 0;
    return x;
  });

  var byName = {};
  players.forEach(function(p){
    byName[p.name] = p;
  });

  var qualified = (D.qualified || []).map(function(q){
    var p = byName[q.name];
    if (p) {
      p.rank = q.rank;
      p.provisional = false;
      p.inactive = false;
      return p;
    }
    var x = Object.assign({}, q, { provisional:false, inactive:false, delta:0 });
    byName[x.name] = x;
    return x;
  });

  Y = { players: players, byName: byName, qualified: qualified };
  B = byName;
  F = qualified;
}var xt=["page-home","page-player","page-compare","page-matches","page-roster","page-analytics","page-method","page-faq","page-admin"];function ke(){if(qe){qe=!1;return}let e=location.hash||"#/";xt.forEach(l=>d("#"+l).classList.remove("active"));let s="#/"+(e.split("/")[1]||"");C(".nav a, .foot-nav a").forEach(l=>{let m=l.getAttribute("href");l.classList.toggle("active",m===s||e==="#/"&&m==="#/")});let n=d("#nav-glide"),o=document.querySelector(".nav a.active");if(n&&o&&o.offsetWidth>0?(n.style.width=o.offsetWidth+"px",n.style.transform=`translateX(${o.offsetLeft}px)`,n.style.opacity="1"):n&&(n.style.opacity="0"),e==="#/compare"||e.startsWith("#/compare/")){let l=e.split("/").slice(2).map(De);et(l[0]||"",l[1]||""),d("#page-compare").classList.add("active"),window.scrollTo(0,0)}else e.startsWith("#/player/")?(Ot(De(e.slice(9))),d("#page-player").classList.add("active"),window.scrollTo({top:0,behavior:"instant"in window?"instant":"auto"})):e==="#/matches"?(Ct(),d("#page-matches").classList.add("active"),window.scrollTo(0,0)):e==="#/roster"?(Nt(),d("#page-roster").classList.add("active"),window.scrollTo(0,0)):e==="#/analytics"?(At(),d("#page-analytics").classList.add("active"),window.scrollTo(0,0)):e==="#/method"?(jt(),d("#page-method").classList.add("active"),window.scrollTo(0,0)):e==="#/faq"?(It(),d("#page-faq").classList.add("active"),window.scrollTo(0,0)):e==="#/admin"?(P(),d("#page-admin").classList.add("active"),window.scrollTo(0,0)):(Ie(),d("#page-home").classList.add("active"),requestAnimationFrame(Tt));xe()}window.addEventListener("hashchange",ke);function Ie(){V="all",I={key:"rank",dir:1},C(".chip[data-filter]").forEach(i=>i.classList.toggle("on",i.dataset.filter==="all")),C(".sortable").forEach(i=>i.classList.remove("sorted","asc"));let e=d('.sortable[data-key="rank"]');e&&e.classList.add("sorted");let s=W().length,n=Y.players.length,o=F[0],l=Math.round(F.reduce((i,u)=>i+u.rd,0)/F.length),m=d("#hero-chip-matches");m&&(m.innerHTML=t("home.chipMatches",{n:s})),d("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">${t("stat.ranked")}</div>
      <div class="v"><span class="cu" data-target="${F.length}">0</span><small>${t("stat.ofTotal",{n})}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.matches")}</div>
      <div class="v"><span class="cu" data-target="${s}">0</span></div></div>
    <div class="stat-card"><div class="k">${t("stat.highest")}</div>
      <div class="v"><span class="cu" data-target="${o.rating}" data-dec="1">0</span><small>${f(o.name)}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.avgRd")}</div>
      <div class="v"><span class="cu" data-target="${l}" data-dec="1">0</span><small>${t("stat.certainty")}</small></div></div>`;let g=[F[1],F[0],F[2]].filter(Boolean);d("#fl-cards").innerHTML=g.map(i=>`
    <div class="fl-card r${i.rank}${i.rank===1?" champ":""} reveal" data-goto="${f(i.name)}">
      <div class="fl-top">
        ${$e(i.rank)}
        <div class="rd">RD ${i.rd.toFixed(0)}</div>
      </div>
      ${i.rank===1?`<div class="champ-tag">${t("home.champTag")}</div>`:""}
      <div class="nm">${f(i.name)}</div>
      <div class="rating">
        <span class="unit">${t("home.ratingUnit")}</span>
        <div class="big-row"><span class="big">${Math.round(i.rating)}</span>${Ae(i)}</div>
      </div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${i.winPct>=60?"":i.winPct>=40?"mid":"low"}" data-w="${i.winPct}"></div></div>
      </div>
      <div class="meta">
        <span><span class="w">${i.w}${O("W")}</span> <span class="l">${i.l}${O("L")}</span> ${i.d}${O("D")}</span>
        <span class="wc">${i.winPct}%</span>
        <span class="opp">${t("home.avgOpp",{n:Math.round(i.avgOpp)})}</span>
      </div>
    </div>`).join(""),requestAnimationFrame(()=>{C("#fl-cards .bar-fill").forEach(i=>{i.style.width=i.dataset.w+"%"})}),te(),Xe();let h=d("#last-updated");h&&(h.textContent=t("home.lastUpdated",{when:se(D.generated)||"today"}))}function Xe(){let e=W().filter(s=>s.date).slice(0,10);d("#battles-grid").innerHTML=e.length?e.map(s=>{let n=s.sa>s.sb,o=s.sb>s.sa;return`
    <div class="battle-row reveal" data-goto="${f(n?s.a:s.b)}">
      <div class="who ${n?"win":"lose"}" data-goto="${f(s.a)}">${f(s.a)}</div>
      <div class="vs">${t("vs")}</div>
      <div class="who r ${o?"win":"lose"}" data-goto="${f(s.b)}">${f(s.b)}</div>
      <div class="sc mono"><span class="${n?"win":"lose"}">${s.sa}</span> \u2013 <span class="${o?"win":"lose"}">${s.sb}</span></div>
      <div class="dt">${se(s.date)||(s.admin&&!s.published?t("battles.justNow"):t("misc.historical"))}</div>
    </div>`}).join(""):`<div class="empty" style="padding:26px;text-align:center;color:var(--dim);grid-column:1/-1">${t("battles.empty")}</div>`}var St=500,Et="cubic-bezier(.22,.8,.24,1)",Mt=12;function Rt(e,s){matchMedia("(prefers-reduced-motion: reduce)").matches||C(".lb-row",e).forEach((n,o)=>{let l=s.get(n.dataset.name);if(l===void 0||typeof n.animate!="function")return;let m=l-n.getBoundingClientRect().top;Math.abs(m)<=1||n.animate([{transform:`translateY(${m}px)`},{transform:"none"}],{duration:St,easing:Et,delay:Math.min(o*Mt,220),fill:"backwards"})})}function te(e="all",s="rank",n=1){let o=d("#lb-body"),m=(e==="all"&&ge?F:Y.players).slice().map(i=>({...i,rank:i.rank!=null?i.rank:9999}));Te&&(m=m.filter(i=>i.name.toLowerCase().includes(Te))),e==="provisional"?m=m.filter(i=>(B[i.name]||{}).provisional):e==="inactive"?m=m.filter(i=>(B[i.name]||{}).inactive):e==="veterans"?m=m.filter(i=>i.matches>=15):e==="rising"&&(m=m.filter(i=>i.winPct>=60&&i.matches>=5)),m.sort((i,u)=>{let w=i[s],k=u[s];return(typeof w=="string"?w.localeCompare(k):w-k)*n});let g=new Map;C(".lb-row",o).forEach(i=>g.set(i.dataset.name,i.getBoundingClientRect().top));let h=vt();o.innerHTML=m.map(i=>`
    <div class="lb-row ${i.rank<=3?"top"+i.rank:""}" data-name="${f(i.name)}" data-goto="${f(i.name)}">
      <div class="rank">${i.rank<=F.length?$e(i.rank,"sm")+pt(i,h):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="pname">${f(i.name)}</div></div>
      <div class="rating-cell mono">${Ae(i)}${ye(i,!0)}</div>
      <div class="num-cell mono col-hide">${i.rd.toFixed(1)}</div>
      <div class="num-cell mono col-hide">${i.matches}</div>
      <div class="num-cell mono col-hide"><span class="w">${i.w}</span></div>
      <div class="num-cell mono col-hide"><span class="l">${i.l}</span></div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${i.winPct>=60?"":i.winPct>=40?"mid":"low"}" data-w="${i.winPct}"></div></div>
        <div class="pct mono">${i.winPct}%</div>
      </div>
      <div class="num-cell mono col-hide">${i.opponents}</div>
      <div class="num-cell mono col-hide">${i.avgOpp.toFixed(0)}</div>
      <div class="col-status">${ct(i.name)||dt(i.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?t("lb.emptyInactive"):e==="provisional"?t("lb.emptyProv"):t("lb.emptyNone")}</div>`,Rt(o,g),requestAnimationFrame(()=>{C(".bar-fill",o).forEach(i=>{i.style.width=i.dataset.w+"%"})})}var V="all",I={key:"rank",dir:1},Te="",ge=!0;function Tt(){C("#stat-strip .cu").forEach(e=>Oe(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),C(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}d("#lb-qual").addEventListener("click",()=>{ge=!ge,d("#lb-qual").classList.toggle("on",ge),te(V,I.key,I.dir)});d("#lb-filter").addEventListener("input",e=>{Te=e.target.value.trim().toLowerCase(),te(V,I.key,I.dir)});var ce=d("#theme-toggle");function Fe(){if(!ce)return;let e=document.documentElement.dataset.theme==="light",s=e?t("top.toDark"):t("top.toLight");ce.setAttribute("aria-pressed",String(e)),ce.setAttribute("aria-label",s),ce.title=s}ce.addEventListener("click",()=>{let s=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=s;try{localStorage.setItem("tt1v1_theme",s)}catch{}Fe()});Fe();document.addEventListener("click",e=>{let s=e.target.closest(".chip");if(s&&s.dataset.filter){C(".chip[data-filter]").forEach(l=>l.classList.remove("on")),s.classList.add("on"),V=s.dataset.filter,te(V,I.key,I.dir);return}let n=e.target.closest(".sortable");if(n){let l=n.dataset.key;I.dir=I.key===l?-I.dir:1,I.key=l,C(".sortable").forEach(m=>m.classList.remove("sorted","asc")),n.classList.add("sorted"),I.dir===1&&n.classList.add("asc"),te(V,I.key,I.dir);return}let o=e.target.closest("[data-goto]");o&&(e.stopPropagation(),location.hash="#/player/"+G(o.dataset.goto))});function qt(e){let s=e.slice();for(let n=s.length-1;n>0;n--){let o=Math.floor(Math.random()*(n+1));[s[n],s[o]]=[s[o],s[n]]}return s}function Ue(e,s){let n=document.getElementById(e);if(!n)return;let o=n.querySelector(".pick-btn"),l=n.querySelector(".pick-search"),m=[...n.querySelectorAll(".pick-opt")],g=n.querySelector(".pick-empty"),h=-1,i=()=>m.filter(L=>!L.classList.contains("hide")),u=L=>{let a=i();if(!a.length){h=-1;return}h=(L%a.length+a.length)%a.length,m.forEach(r=>r.classList.remove("hover")),a[h].classList.add("hover"),a[h].scrollIntoView({block:"nearest"})},w=L=>{let a=L.trim().toLowerCase(),r=0;m.forEach(p=>{let c=!a||p.dataset.name.toLowerCase().includes(a);p.classList.toggle("hide",!c),c&&r++}),g.classList.toggle("show",r===0),h=-1,r&&u(0)},k=()=>{document.querySelectorAll(".pick.open").forEach(L=>{if(L!==n){L.classList.remove("open");let a=L.querySelector(".pick-btn");a&&a.setAttribute("aria-expanded","false")}}),n.classList.add("open"),o.setAttribute("aria-expanded","true"),l.value="",w(""),requestAnimationFrame(()=>l.focus())},E=()=>{n.classList.remove("open"),o.setAttribute("aria-expanded","false")};o.addEventListener("click",()=>{n.classList.contains("open")?E():k()}),l.addEventListener("input",()=>w(l.value)),l.addEventListener("keydown",L=>{if(L.key==="ArrowDown")L.preventDefault(),u(h+1);else if(L.key==="ArrowUp")L.preventDefault(),u(h-1);else if(L.key==="Enter"){L.preventDefault();let a=i();a[h]&&a[h].click()}else L.key==="Escape"&&(E(),o.focus())}),m.forEach(L=>{L.addEventListener("click",()=>{n.dataset.value=L.dataset.name,n.querySelector(".pick-cur").textContent=L.dataset.name,E(),s()}),L.addEventListener("mousemove",()=>{let a=i().indexOf(L);a>=0&&a!==h&&(h=a,m.forEach(r=>r.classList.remove("hover")),L.classList.add("hover"))})})}document.addEventListener("click",e=>{document.querySelectorAll(".pick.open").forEach(s=>{if(!s.contains(e.target)){s.classList.remove("open");let n=s.querySelector(".pick-btn");n&&n.setAttribute("aria-expanded","false")}})});function et(e,s){let n=d("#cmp-wrap"),l=Y.players.slice().sort((y,T)=>(y.rank!=null?y.rank:9999)-(T.rank!=null?T.rank:9999)||y.name.localeCompare(T.name)).map(y=>y.name);if(l.length<2){n.innerHTML=`<div class="empty">${t("cmp.notEnough")}</div>`;return}let m=y=>y[Math.floor(Math.random()*y.length)],g=y=>m(l.filter(T=>T!==y)),h=B[e]?e:m(l),i=B[s]?s:g(h);i===h&&(i=g(h)),(h!==e||i!==s)&&history.replaceState(null,"","#/compare/"+G(h)+"/"+G(i));let u=B[h],w=B[i],k=F.find(y=>y.name===h),E=F.find(y=>y.name===i),L=Re(u.glicko,w.glicko,w.rd),a=Re(w.glicko,u.glicko,u.rd),r=Math.round(L/(L+a)*1e3)/10,p=Math.round(1e3-r*10)/10,c=W().filter(y=>y.a===h&&y.b===i||y.a===i&&y.b===h).map(y=>{let T=y.a===h,_=T?y.sa:y.sb,J=T?y.sb:y.sa;return{fa:_,fb:J,res:_>J?"W":_<J?"L":"D",date:y.date}}),b=c.reduce((y,T)=>(T.res==="W"?y.w++:T.res==="L"?y.l++:y.d++,y),{w:0,l:0,d:0}),x=qt(l),v=(y,T,_)=>`
    <div class="pick" id="${y}" data-value="${f(T)}">
      <button type="button" class="pick-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="${f(_)}">
        <span class="pick-cur">${f(T)}</span>
        <svg class="pick-caret" width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true"><path d="M1.2 1.2 5.5 5.6 9.8 1.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="pick-menu">
        <input class="pick-search" type="text" autocomplete="off" spellcheck="false"
          placeholder="${t("cmp.searchPlaceholder")}" aria-label="${f(_)}">
        <div class="pick-list" role="listbox" aria-label="${f(_)}">
          ${x.map(J=>{let ae=B[J];return`<button type="button" class="pick-opt${J===T?" on":""}" role="option" data-name="${f(J)}" aria-selected="${J===T?"true":"false"}">
              <span class="pick-n">${f(J)}</span>
              <span class="pick-meta mono">${ae&&ae.rating!=null?ae.rating.toFixed(1):""}</span>
            </button>`}).join("")}
          <div class="pick-empty">${t("cmp.noResults")}</div>
        </div>
      </div>
    </div>`,$=(y,T,_,J,ae)=>`
    <div class="cmp-trow">
      <div class="va mono${J?" win":""}">${T}</div>
      <div class="k">${y}</div>
      <div class="vb mono${ae?" win":""}">${_}</div>
    </div>`,M='<span style="color:var(--dimmer)">\u2014</span>';n.innerHTML=`
    <div class="kicker anim">${t("cmp.versus")}</div>
    <h2 class="section-head anim" style="margin:6px 0 2px">${t("cmp.title")}</h2>
    <div class="cmp-pickers anim">
      ${v("cmp-a",h,t("cmp.firstPlayer"))}
      <button class="btn btn-ghost" id="cmp-swap" style="width:auto;margin:0" title="${t("cmp.swap")}">\u21C4</button>
      ${v("cmp-b",i,t("cmp.secondPlayer"))}
    </div>
    <div class="cmp-share anim">
      <button class="btn btn-ghost" id="cmp-copy" style="width:auto;margin:0">${t("cmp.copyLink")}</button>
      <span class="caption" id="cmp-copy-msg"></span>
    </div>

    <div class="cmp-hero anim">
      <div class="cmp-side a">
        <div class="cmp-sub">${k?t("cmp.rankN",{n:k.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${G(h)}">${f(h)}</a></div>
        <div class="cmp-rating mono">${u.provisional?ve(u):u.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",u.matches,{rd:u.rd.toFixed(1)})}</div>
      </div>
      <div class="cmp-vs">
        <div class="vs-mark">${t("cmp.vsMark")}</div>
        <div class="mono" style="font-size:11px;color:var(--dimmer)">${t("cmp.h2hShort",{n:c.length})}</div>
      </div>
      <div class="cmp-side b">
        <div class="cmp-sub">${E?t("cmp.rankN",{n:E.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${G(i)}">${f(i)}</a></div>
        <div class="cmp-rating mono">${w.provisional?ve(w):w.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",w.matches,{rd:w.rd.toFixed(1)})}</div>
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.probTitle")} <span class="n">${t("cmp.probSub")}</span></h3>
      <div class="cmp-prob-labels">
        <span style="color:var(--gold)">${f(h)} ${r.toFixed(1)}%</span>
        <span style="color:var(--blue)">${p.toFixed(1)}% ${f(i)}</span>
      </div>
      <div class="cmp-probbar"><i class="pa" style="width:${r}%"></i><i class="pb" style="width:${p}%"></i></div>
      <div class="cmp-prob-note">${t("cmp.probNote")}</div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.tale")}</h3>
      <div class="cmp-table">
        ${$(t("cmp.rating"),ye(u),ye(w),!u.provisional&&u.rating>w.rating,!w.provisional&&w.rating>u.rating)}
        ${$(t("cmp.rank"),k?"#"+k.rank:M,E?"#"+E.rank:M,k&&E&&k.rank<E.rank,k&&E&&E.rank<k.rank)}
        ${$(t("cmp.rdUnc"),u.rd.toFixed(1),w.rd.toFixed(1),u.rd<w.rd,w.rd<u.rd)}
        ${$(t("cmp.glicko"),u.glicko.toFixed(1),w.glicko.toFixed(1),u.glicko>w.glicko,w.glicko>u.glicko)}
        ${$(t("cmp.record"),`<span style="color:var(--green)">${u.w}${O("W")}</span> <span style="color:var(--red)">${u.l}${O("L")}</span> ${u.d}${O("D")}`,`<span style="color:var(--green)">${w.w}${O("W")}</span> <span style="color:var(--red)">${w.l}${O("L")}</span> ${w.d}${O("D")}`,u.winPct>w.winPct,w.winPct>u.winPct)}
        ${$(t("cmp.winRate"),u.winPct+"%",w.winPct+"%",u.winPct>w.winPct,w.winPct>u.winPct)}
        ${$(t("cmp.matchesPlayed"),u.matches,w.matches,!1,!1)}
        ${$(t("cmp.uniqueOpp"),u.opponents,w.opponents,u.opponents>w.opponents,w.opponents>u.opponents)}
        ${$(t("cmp.avgOppRating"),u.avgOpp.toFixed(1),w.avgOpp.toFixed(1),u.avgOpp>w.avgOpp,w.avgOpp>u.avgOpp)}
        ${$(t("cmp.h2h"),`${b.w}${O("W")} \u2013 ${b.l}${O("L")} \u2013 ${b.d}${O("D")}`,`${b.l}${O("W")} \u2013 ${b.w}${O("L")} \u2013 ${b.d}${O("D")}`,b.w>b.l,b.l>b.w)}
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.prevMeetings")} <span class="n">${tp("cmp.meetings",c.length)}</span></h3>
      <div class="match-list">
        ${c.map(y=>`
          <div class="match-row">
            <div class="res-chip ${y.res}">${O(y.res)}</div>
            <div class="who">${f(h)}</div>
            <div class="score mono">${y.fa} \u2013 ${y.fb}</div>
            <div class="who opp"><a href="#/player/${G(i)}" style="color:var(--blue)">${f(i)}</a></div>
            <div class="date mono" title="${ze(y.date)}">${se(y.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("cmp.neverMet")}</div>`}
      </div>
      <div class="caption" style="margin-top:12px">${t("cmp.legacyNote")}</div>
    </div>`;let q=()=>{let y=d("#cmp-a").dataset.value,T=d("#cmp-b").dataset.value,_="#/compare/"+G(y)+"/"+G(T);location.hash!==_&&(qe=!0,location.hash=_),et(y,T)};Ue("cmp-a",q),Ue("cmp-b",q),d("#cmp-swap").addEventListener("click",()=>{let y=d("#cmp-a"),T=d("#cmp-b"),_=y.dataset.value;y.dataset.value=T.dataset.value,T.dataset.value=_,q()}),d("#cmp-copy").addEventListener("click",()=>{let y=location.href.split("#")[0]+"#/compare/"+G(h)+"/"+G(i),T=()=>{d("#cmp-copy-msg").textContent=t("cmp.linkCopied")};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(y).then(T,()=>{d("#cmp-copy-msg").textContent=y}):d("#cmp-copy-msg").textContent=y})}var qe=!1;function Ot(e){let s=B[e],n=d("#page-player");if(!s){n.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("pl.notFound",{name:f(e)})}</div></div></div>`;return}let o=F.find(i=>i.name===e),l=Ne(e),m=l.slice(0,10),g=rt(e),h=Math.max(3,Math.min(100,100-s.rd/120*100));n.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">${t("pl.back")}</a>
    <div class="player-hero anim">
      <div class="player-top">
        ${o?$e(o.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${f(s.name)}</div>
          <div class="player-rankline">
            ${o?t("pl.rankedOf",{rank:o.rank,total:F.length}):t("pl.unranked")}
            ${s.provisional?` \xB7 <span class="tag prov">${t("tag.provisional")}</span>`:""}
            ${s.inactive?` \xB7 <span class="tag inact">${t("tag.inactive")}</span>`:""}
          </div>
        </div>
        <div class="player-rating-block">
          <div class="lbl">${s.provisional?t("pl.estRange"):t("pl.visible")}</div>
          <div class="big mono${s.provisional?" prov-range":""}" id="pv-rating">${s.provisional?ve(s):"0"}</div>
          ${Ae(s)}
          <div class="rd-bar">
            <div class="bar-track"><div class="bar-fill" style="width:${h}%"></div></div>
            <div class="caption"><span>${t("pl.certainty")}</span><span class="mono">RD ${s.rd.toFixed(1)}</span></div>
          </div>
        </div>
      </div>
      <div class="pstat-grid">
        <div class="pstat"><div class="k">${t("pl.glicko")}</div><div class="v mono">${s.glicko.toFixed(1)}</div></div>
        <div class="pstat"><div class="k">${t("pl.matches")}</div><div class="v mono">${s.matches}</div></div>
        <div class="pstat"><div class="k">${t("pl.record")}</div><div class="v mono" style="font-size:19px"><span style="color:var(--green)">${s.w}${O("W")}</span> <span style="color:var(--red)">${s.l}${O("L")}</span> <span style="color:var(--dim)">${s.d}${O("D")}</span></div></div>
        <div class="pstat"><div class="k">${t("pl.winRate")}</div><div class="v mono">${s.winPct}%</div></div>
        <div class="pstat"><div class="k">${t("pl.opponents")}</div><div class="v mono">${s.opponents}</div></div>
        <div class="pstat"><div class="k">${t("pl.avgOppRating")}</div><div class="v mono">${s.avgOpp.toFixed(1)}</div></div>
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.recentForm")} <span class="n">${t("pl.lastN",{n:Math.min(10,l.length)})}</span></h3>
      <div class="form-strip">
        ${m.map((i,u)=>`<div class="form-pill ${i.res}" style="animation-delay:${u*55}ms"
           title="${t("pl.vsOpp",{opp:f(i.opp)})} ${i.for_}-${i.against}">${O(i.res)}</div>`).join("")||`<span class="empty">${t("pl.noGames")}</span>`}
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.matchHistory")} <span class="n">${tp("pl.nGames",l.length)}</span></h3>
      <div class="match-list">
        ${l.map(i=>`
          <div class="match-row">
            <div class="res-chip ${i.res}">${O(i.res)}</div>
            <div class="who">${f(s.name)}</div>
            <div class="score mono">${i.for_} \u2013 ${i.against}</div>
            <div class="who opp"><a href="#/player/${G(i.opp)}" style="color:var(--blue)">${f(i.opp)}</a></div>
            <div class="date mono" title="${ze(i.date)}">${se(i.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.h2h")} <span class="n">${tp("pl.nOpponents",g.length)}</span></h3>
      <div class="h2h-grid">
        ${g.map(i=>`
          <div class="h2h-card" data-goto="${f(i.opp)}">
            <div class="opp">${f(i.opp)}</div>
            <div class="rec mono"><span class="w">${i.w}${O("W")}</span> \xB7 <span class="l">${i.l}${O("L")}</span> \xB7 <span>${i.d}${O("D")}</span> \xB7 ${t("pl.pts",{pf:i.pf,pa:i.pa})}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>
  </div>`,s.provisional||Oe(d("#pv-rating"),s.rating,{dec:1,dur:900}),xe()}function Ct(){Xe();let e=d("#gm-body"),s=W();d("#gm-count").textContent=tp("gm.count",s.length),e.innerHTML=s.map(n=>{let o=n.sa>n.sb,l=n.sb>n.sa;return`
    <div class="gm-row">
      <div class="side ${o?"winner":"loser"}">
        <div class="dot ${o?"w":"l"}"></div>
        <div class="nm" data-goto="${f(n.a)}">${f(n.a)}</div>
      </div>
      <div class="sc mono" style="color:${o?"var(--green)":"var(--red)"}">${n.sa}</div>
      <div class="dash mono">\u2013</div>
      <div class="sc mono" style="color:${l?"var(--green)":"var(--red)"}">${n.sb}</div>
      <div class="side right ${l?"winner":"loser"}">
        <div class="dot ${l?"w":"l"}"></div>
        <div class="nm" data-goto="${f(n.b)}">${f(n.b)}</div>
      </div>
      <div class="dt mono">${n.admin&&!n.published?`<span class="tag fresh">${t("tag.new")}</span>`:se(n.date)||t("misc.historical")}</div>
    </div>`}).join("")}function Nt(){let e=Y.players.filter(s=>s.provisional).sort((s,n)=>n.rating-s.rating);d("#roster-grid").innerHTML=e.map(s=>{let n=Math.min(100,Math.round(Math.min(1,s.matches/5)*50+Math.min(1,s.opponents/3)*50));return`
    <div class="roster-card reveal" data-goto="${f(s.name)}">
      <div class="top">
        <div class="nm">${f(s.name)}</div>
        <svg class="shield" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"/></svg>
      </div>
      <div class="rating"><span class="unit">${t("roster.estRange")}</span><span class="big prov-range">${ve(s)}</span></div>
      <div class="req-row"><span>${t("roster.matches")}</span><span class="${s.matches>=5?"ok":""}">${s.matches} / 5 ${s.matches>=5?"\u2713":""}</span></div>
      <div class="req-row"><span>${t("roster.opponents")}</span><span class="${s.opponents>=3?"ok":""}">${s.opponents} / 3 ${s.opponents>=3?"\u2713":""}</span></div>
      <div class="prog-track"><div class="prog-fill" data-w="${n}"></div></div>
      <div class="prog-label">${t("roster.progress",{pct:n})}</div>
    </div>`}).join(""),requestAnimationFrame(()=>C("#roster-grid .prog-fill").forEach(s=>{s.style.width=s.dataset.w+"%"}))}function At(){let e=Y.players,s=F.slice().sort((v,$)=>$.winPct-v.winPct).slice(0,10),n=e.slice().sort((v,$)=>$.matches-v.matches).slice(0,10),o=[];W().forEach(v=>{let $=B[v.a],M=B[v.b];if(!$||!M)return;let q=$.rating-M.rating;if(v.sa===v.sb)return;let y=v.sa>v.sb?v.a:v.b,T=Math.abs(q);(q<0&&y===v.a||q>0&&y===v.b)&&o.push({winner:y,loser:y===v.a?v.b:v.a,gap:T,score:y===v.a?`${v.sa}-${v.sb}`:`${v.sb}-${v.sa}`})}),o.sort((v,$)=>$.gap-v.gap);let l={};W().forEach(v=>{let $=[v.a,v.b].sort().join(" vs ");l[$]=(l[$]||0)+1});let m=Object.entries(l).sort((v,$)=>$[1]-v[1]).slice(0,10),g=e.map(v=>v.rating),h=Math.min(...g),i=Math.max(...g),u=8,w=(i-h)/u||1,k=Array.from({length:u},()=>0);g.forEach(v=>{k[Math.min(u-1,Math.max(0,Math.floor((v-h)/w)))]++});let E=Math.max(...k,1),L=k.map((v,$)=>{let M=Math.round((h+$*w)/10)*10,q=Math.round((h+($+1)*w)/10)*10;return`
    <div class="hcol" title="${tp("an.histTip",v,{lo:M,hi:q})}">
      <div class="hbar" data-h="${Math.round(v/E*100)}"></div>
      <div class="hlbl">${M}\u2013${q}</div>
    </div>`}).join(""),a=e.slice().sort((v,$)=>$.opponents-v.opponents).slice(0,8),r=Math.max(...a.map(v=>v.opponents),1),p=a.map(v=>`
    <div class="mrow reveal" data-goto="${f(v.name)}">
      <div class="nm">${f(v.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(v.opponents/r*100)}"></div></div>
      <div class="val mono">${v.opponents}</div>
    </div>`).join(""),c=(v,$,M)=>v.map((q,y)=>`
    <div class="an-row reveal" data-goto="${f(q.name)}">
      <div class="idx mono">${y+1}</div>
      <div class="nm">${f(q.name)}</div>
      <div class="val mono">${$(q)}</div>
      <div class="unit mono">${M(q)}</div>
    </div>`).join(""),b=v=>tp("an.nMatches",v.matches);d("#an-grid").innerHTML=`
    <div class="an-panel">
      <div class="head"><h3>${t("an.topWinRate")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${c(s,v=>v.winPct+"%",b)}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.mostActive")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/></svg>
      </div>
      ${c(n,v=>v.matches,v=>t("an.matchesUnit"))}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.biggestUpsets")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${o.length?o.slice(0,8).map((v,$)=>`
        <div class="an-row reveal" data-goto="${f(v.winner)}">
          <div class="idx mono">${$+1}</div>
          <div class="nm">${f(v.winner)} <span style="color:var(--dimmer);font-weight:500">${t("an.def")}</span> ${f(v.loser)}</div>
          <div class="val mono">${v.score}</div>
          <div class="unit mono">${t("an.plusPts",{n:Math.round(v.gap)})}</div>
        </div>`).join(""):`<div class="empty">${t("an.noUpsets")}</div>`}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.rivalries")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${m.map(([v,$],M)=>`
        <div class="an-row reveal">
          <div class="idx mono">${M+1}</div>
          <div class="nm">${v.split(" vs ").map(f).join(` <span style="color:var(--dimmer);font-weight:500">${t("vs")}</span> `)}</div>
          <div class="val mono">${$}</div>
          <div class="unit mono">${t("an.meetingsUnit")}</div>
        </div>`).join("")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.ratingDist")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 20V10M10 20V4M16 20v-8M2 20h20" stroke-linecap="round"/></svg>
      </div>
      <div class="hist">${L}</div>
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.uniqueOpp")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v5M12 15v5" stroke-linecap="round"/></svg>
      </div>
      ${p}
    </div>`;let x=()=>{C("#an-grid .hbar").forEach(v=>{v.style.height=v.dataset.h+"%"}),C("#an-grid .abar").forEach(v=>{v.style.width=v.dataset.w+"%"})};requestAnimationFrame(x),setTimeout(x,140),xe()}function jt(){d("#settings-body").innerHTML=Pe().map(e=>`
    <tr><td><b>${f(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${f(e.desc)}</div></td>
        <td class="val">${f(String(e.value))}</td></tr>`).join("")}function Pt(){return Array.from({length:11},(e,s)=>({q:t("faq.q"+(s+1)),a:t("faq.a"+(s+1))}))}function be(){let e=H().faq;return Array.isArray(e)&&e.length?e:Pt()}function It(){d("#faq-list").innerHTML=be().map((e,s)=>`
    <div class="faq-item reveal" data-faq="${s}">
      <button class="faq-q" aria-expanded="false">
        <span>${f(String(e.q||""))}</span>
        <svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="faq-a"><div class="faq-a-in">${f(String(e.a||""))}</div></div>
    </div>`).join(""),xe()}document.addEventListener("click",e=>{let s=e.target.closest(".faq-q");if(!s)return;let n=s.closest(".faq-item"),o=n.classList.contains("open");C(".faq-item.open").forEach(l=>{l.classList.remove("open"),l.querySelector(".faq-q").setAttribute("aria-expanded","false")}),o||(n.classList.add("open"),s.setAttribute("aria-expanded","true"))});function P(){let e=d("#admin-wrap");if(!mt()){e.innerHTML=`
    <div class="admin-gate">
      <div class="admin-card">
        <div class="lock">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
        </div>
        <h2>Admin portal</h2>
        <div class="sub">Restricted access. Owners only.</div>
        <label for="admin-pw">Password</label>
        <input id="admin-pw" type="password" autocomplete="off">
        <label class="remember"><input type="checkbox" id="admin-remember"> Remember me on this device</label>
        <button class="btn btn-primary" id="admin-auth">-) Authenticate</button>
      </div>
    </div>`;let a=async()=>{let r=d("#admin-pw").value;try{let p=await fetch(ht,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:r})});if(p.ok){let c=await p.json().catch(()=>({}));ut(c.token||r,d("#admin-remember").checked),P(),S("Welcome back, commander.");return}if(p.status===429){S("Too many attempts \u2014 wait a few minutes.");return}}catch{}d("#admin-pw").style.borderColor="var(--red)",S("Wrong password.")};d("#admin-auth").addEventListener("click",a),d("#admin-pw").addEventListener("keydown",r=>{r.key==="Enter"&&a()});return}let n=Z(),o=Qe().length,l=H(),m='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',g=Object.entries(l.aliases).map(([a,r])=>`
    <div class="log-item">
      <div class="txt"><b>${f(a)}</b> \u2192 <b>${f(r)}</b>${l.aliasNotes&&l.aliasNotes[a]?` <span style="color:var(--dimmer)">\u2014 ${f(l.aliasNotes[a])}</span>`:""}</div>
      <button class="icon-btn" data-alias-del="${f(a)}" title="Remove name fix">${m}</button>
    </div>`).join("")||'<div class="empty">No name fixes yet.</div>',h=l.inactive.map(a=>`
    <div class="log-item">
      <div class="txt"><b>${f(a)}</b> <span style="color:var(--dimmer)">\u2014 inactive</span></div>
      <button class="icon-btn" data-inact-del="${f(a)}" title="Mark active again">${m}</button>
    </div>`).join("")||'<div class="empty">Nobody marked inactive.</div>',i=Object.keys({...l.seeds||{},...l.seedGlicko||{},...l.seedRd||{}}).map(a=>`
    <div class="log-item">
      <div class="txt"><b>${f(a)}</b> \xB7 <span style="color:var(--dimmer)">old</span> <b class="mono">${f(String((l.seeds||{})[a]!=null?(l.seeds||{})[a]:"\u2014"))}</b>${(l.seedGlicko||{})[a]!=null?` \xB7 <span style="color:var(--dimmer)">glicko</span> <b class="mono">${f(String(l.seedGlicko[a]))}</b>`:""}${(l.seedRd||{})[a]!=null?` \xB7 <span style="color:var(--dimmer)">rd</span> <b class="mono">${f(String(l.seedRd[a]))}</b>`:""}</div>
      <button class="icon-btn" data-seed-del="${f(a)}" title="Remove seed">${m}</button>
    </div>`).join("")||'<div class="empty">No seed overrides \u2014 players start from the sheet values.</div>',u=Pe().map(a=>`
    <div class="set-row">
      <div class="lbl"><b>${f(a.name)}</b><div class="d">${f(String(a.desc||""))}</div></div>
      <input class="set-val mono" data-set-name="${f(a.name)}" value="${f(String(a.value))}">
    </div>`).join(""),w=a=>{let r=(a||"").trim().toLowerCase();return W().filter(c=>!r||c.a.toLowerCase().includes(r)||c.b.toLowerCase().includes(r)).slice(0,20).map(c=>`
      <div class="log-item fix-row" data-mkey="${c.key}">
        <div class="txt"><b>${f(c.a)}</b> <span style="color:var(--dimmer)">vs</span> <b>${f(c.b)}</b>${c.date?"":' <span class="tag legacy">legacy</span>'}</div>
        <input class="mono" data-f="sa" type="number" min="0" value="${c.sa}" title="Score 1">
        <input class="mono" data-f="sb" type="number" min="0" value="${c.sb}" title="Score 2">
        <input data-f="date" type="date" value="${c.date||""}" title="Match date">
        <button class="icon-btn" data-msave="${c.key}" title="Save fix"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-mdel="${c.key}" title="Delete match">${m}</button>
      </div>`).join("")||'<div class="empty">No matches found.</div>'};e.innerHTML=`
  <div class="admin-bar anim">
    <div class="title"><span>\u25CF</span> Admin console</div>
    <div class="spacer"></div>
    <button class="btn btn-primary" id="admin-publish" style="width:auto;margin:0">\u2191 Publish to everyone</button>
    <button class="btn btn-ghost" id="admin-export">Export log</button>
    <button class="btn btn-danger" id="admin-lock">Lock</button>
  </div>

  <div class="panel anim" style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
    <div style="flex:1 1 340px;min-width:0">
      <h3 style="margin:0 0 4px">Sheet <span class="n">auto-sync</span></h3>
      <div class="form-note" style="margin:0">The live site rebuilds from the master Google Sheet every 5 minutes \u2014 and instantly when someone presses <b style="color:var(--gold)">Update website</b> in the sheet. No manual rebuild needed.</div>
    </div>
    <button class="btn btn-primary" id="admin-sync" style="width:auto;margin:0">\u27F3 Sync from sheet now</button>
    <span id="admin-sync-status" class="mono" style="font-size:11px;color:var(--dimmer)"></span>
  </div>

  <div class="admin-grid anim">
    <div class="panel" style="margin:0">
      <h3>Log a <span class="n">match</span></h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Player 1</label>
          <input id="adm-a" list="player-list" placeholder="e.g. Kobi" autocomplete="off">
        </div>
        <div class="form-field">
          <label>Player 2</label>
          <input id="adm-b" list="player-list" placeholder="e.g. Slayer" autocomplete="off">
        </div>
        <div class="form-field">
          <label>Score 1</label>
          <input id="adm-sa" type="number" min="0" placeholder="15">
        </div>
        <div class="form-field">
          <label>Score 2</label>
          <input id="adm-sb" type="number" min="0" placeholder="12">
        </div>
        <div class="form-field full">
          <label>Match date</label>
          <input id="adm-date" type="date">
        </div>
        <div class="form-field full">
          <button class="btn btn-primary" id="adm-add" style="margin-top:6px">+) Add to log</button>
        </div>
      </div>
      <div class="form-note" style="margin-top:14px">
        Logged matches feed the same Dynamic Glicko engine as the official sheet \u2014
        ratings, ranks, records and head-to-heads recalculate instantly here.
        Hit <b style="color:var(--gold)">Publish to everyone</b> to push the log to
        the site so every visitor sees it \u2014 one click, no tokens needed.
        Use <b>Customize everything</b>
        below to fix names, dates, seeds, settings or any past match.
      </div>
    </div>

    <div class="panel" style="margin:0">
      <h3>Pending <span class="n">log</span> \u2014 ${n.length} local \xB7 ${o} published</h3>
      <div class="log-list" id="adm-list">
        ${n.length?n.map((a,r)=>`
          <div class="log-item">
            <div class="txt"><b>${f(a.a)}</b> ${a.sa}\u2013${a.sb} <b>${f(a.b)}</b></div>
            <div class="txt" style="color:var(--dimmer)">${f(a.date||"")}</div>
            <button class="icon-btn" data-del="${r}" title="Remove">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>`).join(""):'<div class="empty">Nothing pending \u2014 the log is clean.</div>'}
      </div>
    </div>
  </div>

  <div class="admin-bar anim" style="margin-top:22px">
    <div class="title"><span>\u25CF</span> Customize everything</div>
    <div class="spacer"></div>
    <div class="form-note" style="margin:0">Everything the master sheet can do \u2014 names, inactive, seeds, settings, match fixes & dates. Changes apply live here; <b style="color:var(--gold)">Publish to everyone</b> makes them public.</div>
  </div>

  <div class="admin-grid anim">
    <div class="panel" style="margin:0">
      <h3>Fix <span class="n">names</span> & merge players</h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Name as written</label>
          <input id="ov-alias-a" placeholder="e.g. sneakyonyxdragon" autocomplete="off">
        </div>
        <div class="form-field">
          <label>Correct player</label>
          <input id="ov-alias-b" list="player-list" placeholder="e.g. _Eddie_" autocomplete="off">
        </div>
        <div class="form-field full">
          <label>Note (optional)</label>
          <input id="ov-alias-note" placeholder="e.g. same person, alt account" autocomplete="off">
        </div>
        <div class="form-field full">
          <button class="btn btn-primary" id="ov-alias-add" style="margin-top:6px">+) Save name fix</button>
        </div>
      </div>
      <div class="log-list" id="ov-alias-list" style="margin-top:12px">${g}</div>
    </div>

    <div class="panel" style="margin:0">
      <h3>Active / <span class="n">inactive</span></h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Player</label>
          <input id="ov-inact-n" list="player-list" placeholder="e.g. Warren" autocomplete="off">
        </div>
        <div class="form-field">
          <label>&nbsp;</label>
          <button class="btn btn-primary" id="ov-inact-toggle">Toggle inactive</button>
        </div>
      </div>
      <div class="log-list" id="ov-inact-list" style="margin-top:12px">${h}</div>
    </div>

    <div class="panel" style="margin:0">
      <h3>Start <span class="n">ratings</span> (seeds)</h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Player</label>
          <input id="ov-seed-n" list="player-list" autocomplete="off">
        </div>
        <div class="form-field">
          <label>Old 0\u2013100 rating</label>
          <input id="ov-seed-v" type="number" step="0.5" placeholder="90">
        </div>
        <div class="form-field">
          <label>Starting Glicko <span style="color:var(--dimmer)">(opt)</span></label>
          <input id="ov-seed-g" type="number" step="1" placeholder="auto">
        </div>
        <div class="form-field">
          <label>Starting RD <span style="color:var(--dimmer)">(opt)</span></label>
          <input id="ov-seed-rd" type="number" step="1" placeholder="auto">
        </div>
        <div class="form-field full">
          <button class="btn btn-primary" id="ov-seed-add" style="margin-top:6px">+) Save seed</button>
        </div>
      </div>
      <div class="log-list" id="ov-seed-list" style="margin-top:12px">${i}</div>
    </div>

    <div class="panel" style="margin:0">
      <h3>Model <span class="n">settings</span></h3>
      <div id="ov-settings">${u}</div>
      <button class="btn btn-ghost" id="ov-set-reset" style="margin-top:12px">Reset to sheet values</button>
    </div>

    <div class="panel" style="margin:0;grid-column:1/-1">
      <h3>Fix or delete <span class="n">any match</span></h3>
      <div class="form-note" style="margin:0 0 10px">Search a player, then fix scores, set or fix the date, or delete the match. Ratings recalculate instantly.</div>
      <input id="ov-mq" placeholder="Search a player to find their matches\u2026" autocomplete="off" style="width:100%">
      <div class="fix-row" style="margin-top:12px;opacity:.5">
        <div class="txt" style="font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--dimmer)">Players</div>
        <div style="font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:var(--dimmer)">Score</div>
        <div style="font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:var(--dimmer)">Score</div>
        <div style="font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:var(--dimmer)">Date</div>
        <div></div><div></div>
      </div>
      <div class="log-list" id="ov-mresults"><div class="empty">Search to edit scores, dates, or delete a match.</div></div>
    </div>

    <div class="panel" style="margin:0;grid-column:1/-1">
      <h3>Add / remove <span class="n">players</span></h3>
      <div class="form-note" style="margin:0 0 10px">A player exists through their results \u2014 so adding a player means logging their <b>first 1v1 result</b> (required). Removing a player deletes every match they played.</div>
      <div class="form-grid">
        <div class="form-field">
          <label>New player</label>
          <input id="pl-name" placeholder="e.g. NewFighter" autocomplete="off">
        </div>
        <div class="form-field">
          <label>First opponent</label>
          <input id="pl-opp" list="player-list" placeholder="e.g. Kobi" autocomplete="off">
        </div>
        <div class="form-field">
          <label>Score 1</label>
          <input id="pl-sa" type="number" min="0" placeholder="15">
        </div>
        <div class="form-field">
          <label>Score 2</label>
          <input id="pl-sb" type="number" min="0" placeholder="10">
        </div>
        <div class="form-field">
          <label>Match date</label>
          <input id="pl-date" type="date">
        </div>
        <div class="form-field">
          <label>Old 0\u2013100 rating <span style="color:var(--dimmer)">(opt)</span></label>
          <input id="pl-seed" type="number" step="0.5" placeholder="auto">
        </div>
        <div class="form-field full">
          <button class="btn btn-primary" id="pl-add" style="margin-top:6px">+) Add player with first result</button>
        </div>
      </div>
      <div class="form-grid" style="margin-top:18px;border-top:1px solid var(--line);padding-top:16px">
        <div class="form-field">
          <label>Remove player (and all their matches)</label>
          <input id="pl-del" list="player-list" placeholder="e.g. Warren" autocomplete="off">
        </div>
        <div class="form-field">
          <label>&nbsp;</label>
          <button class="btn btn-danger" id="pl-del-btn">Remove player</button>
        </div>
      </div>
    </div>

    <div class="panel" style="margin:0;grid-column:1/-1">
      <h3>Manage <span class="n">Q &amp; A</span> <span style="color:var(--dimmer);font-size:12px;font-weight:500">\u2014 shown on the FAQ page</span></h3>
      <div class="log-list" id="faq-admin-list" style="margin-bottom:12px"></div>
      <div class="form-grid">
        <div class="form-field full">
          <label>New question</label>
          <input id="faq-new-q" placeholder="e.g. Can I reset my rating?" autocomplete="off">
        </div>
        <div class="form-field full">
          <label>Answer</label>
          <input id="faq-new-a" placeholder="The answer players should see" autocomplete="off">
        </div>
        <div class="form-field full">
          <button class="btn btn-primary" id="faq-add" style="margin-top:6px">+) Add question</button>
          <button class="btn btn-ghost" id="faq-reset" style="margin-top:6px">Reset to built-in Q&amp;A</button>
        </div>
      </div>
    </div>

    <div class="panel" style="margin:0;grid-column:1/-1">
      <h3>Feedback <span class="n">inbox</span> <span style="color:var(--dimmer);font-size:12px;font-weight:500">\u2014 messages sent from the site</span>
        <button class="btn btn-ghost" id="fb-refresh" style="margin:0 0 0 14px;padding:8px 16px;width:auto">\u27F3 Refresh</button></h3>
      <div class="log-list" id="fb-inbox"><div class="empty">Loading messages\u2026</div></div>
    </div>
  </div>

  <datalist id="player-list">${Y.players.map(a=>`<option value="${f(a.name)}">`).join("")}</datalist>`,d("#admin-lock").addEventListener("click",()=>{ft(),P()}),d("#admin-publish").addEventListener("click",()=>k()),d("#admin-sync").addEventListener("click",async()=>{let a=d("#admin-sync"),r=d("#admin-sync-status");a.disabled=!0,r.textContent="syncing\u2026";try{let p=await fetch(gt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:le()})}),c=await p.json().catch(()=>({}));p.ok&&c.ok?(r.textContent=c.changed?`synced \u2713 ${c.matches} matches / ${c.players} players`:"already up to date \u2713",S(c.changed?"Sheet synced \u2014 the live site was updated.":"Site already matches the sheet.")):p.status===429?(r.textContent="rate limited",S("Too many attempts \u2014 wait a few minutes.")):(r.textContent="sync failed",S("Sync failed: "+(c.error||p.status)))}catch{r.textContent="network error",S("Sync failed (network).")}a.disabled=!1});async function k(a){let r=!!(a&&a.silent),p=le()||(r?"":(window.prompt("Admin password:")||"").trim());if(!p){S(r?'Saved here \u2014 auto-publish needs a stored password. Use "Publish to everyone".':"Publish cancelled.");return}Me=!0;let c=H(),b={},x=[];for(let[M,q]of Object.entries(c.matchEdits||{}))M.startsWith("a:")&&(b[M]=q);for(let M of c.matchRemoved||[])M.startsWith("a:")&&x.push(M);let v=W().filter(M=>M.admin).map(M=>({a:M.a,b:M.b,sa:M.sa,sb:M.sb,date:M.date||""})),$={matches:v,aliases:c.aliases||{},aliasNotes:c.aliasNotes||{},aliasRemoved:c.aliasRemoved||[],inactive:c.inactive||[],seeds:c.seeds||{},seedGlicko:c.seedGlicko||{},seedRd:c.seedRd||{},seedRemoved:c.seedRemoved||[],settings:c.settings||{},matchEdits:b,matchRemoved:x,faq:c.faq!=null?c.faq:[]};try{let M=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:p,doc:$,message:`Publish match log (${v.length} matches)`})}),q=await M.json().catch(()=>({}));if(!M.ok||!q.ok){M.status===403&&sessionStorage.removeItem(K),S("Publish failed: "+(q.error||"HTTP "+M.status));return}window.LB_PUB=$,window.LB_LOG=v,ne([]),A({}),N(),r||P(),S(r?"Saved \u2014 live for everyone \u2713":"Published! Everyone sees it on their next visit.")}catch{S("Publish failed: network error.")}finally{Me=!1}}d("#admin-export").addEventListener("click",()=>{let a=new Blob([JSON.stringify(Z(),null,2)],{type:"application/json"}),r=document.createElement("a");r.href=URL.createObjectURL(a),r.download="match-log.json",r.click(),URL.revokeObjectURL(r.href),S("Log exported.")}),d("#adm-add").addEventListener("click",()=>{let a=d("#adm-a").value.trim(),r=d("#adm-b").value.trim(),p=parseInt(d("#adm-sa").value,10),c=parseInt(d("#adm-sb").value,10);if(!a||!r||a.toLowerCase()===r.toLowerCase()||!Number.isFinite(p)||!Number.isFinite(c)){S("Fill in both players and scores.");return}let b=Z();b.unshift({a,b:r,sa:p,sb:c,date:d("#adm-date")?d("#adm-date").value||new Date().toISOString().slice(0,10):new Date().toISOString().slice(0,10)}),ne(b),N(),P(),S(`${a} ${p}\u2013${c} ${r} added \u2014 site recalculated live.`)}),d("#adm-list").addEventListener("click",a=>{let r=a.target.closest("[data-del]");if(!r)return;let p=Z();p.splice(parseInt(r.dataset.del,10),1),ne(p),N(),P()}),d("#ov-alias-add").addEventListener("click",()=>{let a=d("#ov-alias-a").value.trim(),r=d("#ov-alias-b").value.trim(),p=(d("#ov-alias-note")||{}).value.trim();if(!a||!r){S("Fill both: the wrong name and the correct player.");return}let c=Object.keys(B).find(x=>x.toLowerCase()===r.toLowerCase())||r,b=j();A({...b,aliases:{...b.aliases||{},[a]:c},aliasNotes:p?{...b.aliasNotes||{},[a]:p}:b.aliasNotes||{},aliasRemoved:(b.aliasRemoved||[]).filter(x=>x!==a)}),N(),P(),S(`Name fix saved \u2014 "${a}" now counts as ${c}.`)}),d("#ov-alias-list").addEventListener("click",a=>{let r=a.target.closest("[data-alias-del]");if(!r)return;let p=r.dataset.aliasDel,c=j(),b={...c.aliases||{}},x={...c.aliasNotes||{}};delete b[p],delete x[p],A({...c,aliases:b,aliasNotes:x,aliasRemoved:[...new Set([...c.aliasRemoved||[],p])]}),N(),P(),S("Name fix removed.")}),d("#ov-inact-toggle").addEventListener("click",()=>{let a=d("#ov-inact-n").value.trim();if(!a){S("Type a player name first.");return}let r=j(),p=H().inactive||[],c=p.includes(a)?p.filter(b=>b!==a):[...p,a];A({...r,inactive:c}),N(),P(),S(c.includes(a)?`${a} marked inactive.`:`${a} marked active again.`)}),d("#ov-inact-list").addEventListener("click",a=>{let r=a.target.closest("[data-inact-del]");if(!r)return;let p=j();A({...p,inactive:(H().inactive||[]).filter(c=>c!==r.dataset.inactDel)}),N(),P()}),d("#ov-seed-add").addEventListener("click",()=>{let a=d("#ov-seed-n").value.trim(),r=d("#ov-seed-v").value.trim(),p=d("#ov-seed-g").value.trim(),c=d("#ov-seed-rd").value.trim();if(!a){S("Pick a player first.");return}if(r===""&&p===""&&c===""){S("Enter an Old 0\u2013100 rating, or a Starting Glicko / RD.");return}let b=j(),x={...b.seeds||{}},v={...b.seedGlicko||{}},$={...b.seedRd||{}};r!==""&&Number.isFinite(Number(r))?x[a]=Number(r):delete x[a],p!==""&&Number.isFinite(Number(p))?v[a]=Number(p):delete v[a],c!==""&&Number.isFinite(Number(c))?$[a]=Number(c):delete $[a],A({...b,seeds:x,seedGlicko:v,seedRd:$,seedRemoved:(b.seedRemoved||[]).filter(M=>M!==a)}),N(),P(),S(`Seed saved for ${a}.`)}),d("#ov-seed-list").addEventListener("click",a=>{let r=a.target.closest("[data-seed-del]");if(!r)return;let p=r.dataset.seedDel,c=j(),b={...c.seeds||{}};delete b[p];let x={...c.seedGlicko||{}};delete x[p];let v={...c.seedRd||{}};delete v[p],A({...c,seeds:b,seedGlicko:x,seedRd:v,seedRemoved:[...new Set([...c.seedRemoved||[],p])]}),N(),P()}),d("#ov-settings").addEventListener("change",a=>{let r=a.target.closest("[data-set-name]");if(!r)return;let p=j();A({...p,settings:{...p.settings||{},[r.dataset.setName]:r.value}}),N(),P(),S("Setting applied \u2014 everything recalculated.")}),d("#ov-set-reset").addEventListener("click",()=>{let a=j();A({...a,settings:{}}),N(),P(),S("Settings back to the master sheet values.")}),d("#ov-mq").addEventListener("input",()=>{d("#ov-mresults").innerHTML=w(d("#ov-mq").value)}),d("#ov-mresults").addEventListener("click",a=>{let r=a.target.closest("[data-msave]"),p=a.target.closest("[data-mdel]");if(r){let c=r.closest("[data-mkey]"),b=c.dataset.mkey,x=$=>c.querySelector(`[data-f="${$}"]`).value,v=j();A({...v,matchEdits:{...v.matchEdits||{},[b]:{sa:+x("sa"),sb:+x("sb"),date:x("date")}}}),N(),d("#ov-mresults").innerHTML=w(d("#ov-mq").value),S("Match fixed \u2014 ratings recalculated.")}else if(p){let c=p.dataset.mdel,b=j();A({...b,matchRemoved:[...new Set([...b.matchRemoved||[],c])]}),N(),d("#ov-mresults").innerHTML=w(d("#ov-mq").value),S("Match deleted \u2014 ratings recalculated.")}}),d("#pl-add").addEventListener("click",()=>{let a=d("#pl-name").value.trim(),r=d("#pl-opp").value.trim(),p=parseInt(d("#pl-sa").value,10),c=parseInt(d("#pl-sb").value,10);if(!a||!r||a.toLowerCase()===r.toLowerCase()||!Number.isFinite(p)||!Number.isFinite(c)){S("A player needs a name, an opponent and both scores \u2014 at least 1 result.");return}if(B[U(a)]){S(`${a} already exists \u2014 log a match for them instead.`);return}let b=Z();b.unshift({a,b:r,sa:p,sb:c,date:(d("#pl-date")||{}).value||new Date().toISOString().slice(0,10)}),ne(b);let x=(d("#pl-seed")||{}).value.trim();if(x!==""&&Number.isFinite(Number(x))){let v=j();A({...v,seeds:{...v.seeds||{},[U(a)]:Number(x)},seedRemoved:(v.seedRemoved||[]).filter($=>$!==U(a))})}N(),P(),S(`${a} added with their first result \u2014 ${p}\u2013${c} vs ${r}.`)}),d("#pl-del-btn").addEventListener("click",()=>{let a=d("#pl-del").value.trim(),r=U(a),p=W().filter(y=>y.a===r||y.b===r);if(!p.length){S(`No player called "${a}" with matches found.`);return}if(!window.confirm(`Remove ${r} and ${p.length} match${p.length===1?"":"es"}? This recalculates every rating.`))return;let c=j(),b=[...c.matchRemoved||[]],x=[];p.forEach(y=>{y.key.startsWith("l:")?x.push(parseInt(y.key.slice(2),10)):b.push(y.key)});let v=Z();x.sort((y,T)=>T-y).forEach(y=>v.splice(y,1)),ne(v);let $={...c.seeds||{}},M={...c.seedGlicko||{}},q={...c.seedRd||{}};delete $[r],delete M[r],delete q[r],A({...c,matchRemoved:[...new Set(b)],seeds:$,seedGlicko:M,seedRd:q,seedRemoved:[...new Set([...c.seedRemoved||[],r])],inactive:(H().inactive||[]).filter(y=>y!==r)}),N(),P(),S(`${r} removed with ${p.length} match${p.length===1?"":"es"}. Publish to make it public.`)});let E=()=>{let a=be();d("#faq-admin-list").innerHTML=a.map((r,p)=>`
      <div class="log-item fix-row" data-faq-idx="${p}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${f(String(r.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${f(String(r.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${p}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${p}" title="Delete question">${m}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};E(),d("#faq-admin-list").addEventListener("click",a=>{let r=a.target.closest("[data-faq-save]"),p=a.target.closest("[data-faq-del]"),c=be().map(x=>({...x}));if(r){let x=r.closest("[data-faq-idx]");c[parseInt(r.dataset.faqSave,10)]={q:x.querySelector('[data-fq="q"]').value.trim(),a:x.querySelector('[data-fq="a"]').value.trim()}}else if(p)c.splice(parseInt(p.dataset.faqDel,10),1);else return;let b=j();A({...b,faq:c}),E(),S("Q&A updated \u2014 publish to make it public.")}),d("#faq-add").addEventListener("click",()=>{let a=d("#faq-new-q").value.trim(),r=d("#faq-new-a").value.trim();if(!a||!r){S("Fill in both the question and the answer.");return}let p=j();A({...p,faq:[...be().map(c=>({...c})),{q:a,a:r}]}),E(),S("Question added.")}),d("#faq-reset").addEventListener("click",()=>{let a=j();A({...a,faq:null}),E(),S("Q&A back to the built-in list.")}),window._fbTimer&&(clearInterval(window._fbTimer),window._fbTimer=null);async function L(){let a=d("#fb-inbox");if(!a||document.querySelector("#fb-inbox [data-fb-reply]:focus"))return;let r=le();if(!r){a.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let p=await fetch(Q+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:r})}),c=await p.json().catch(()=>({}));if(!p.ok||!c.ok){a.innerHTML=`<div class="empty">Could not load messages (${f(c.error||"HTTP "+p.status)}).</div>`;return}let b=c.items||[],x={};a.querySelectorAll("[data-fb-id]").forEach(v=>{let $=v.querySelector("[data-fb-reply]");$&&$.value&&(x[v.dataset.fbId]=$.value)}),a.innerHTML=b.map(v=>`
        <div class="log-item fb-row${v.resolved?" fb-done":""}" data-fb-id="${f(v.id)}" data-fb-resolved="${v.resolved?"1":""}">
          <div class="txt">
            <b>${f(v.name||"Anonymous")}</b>${v.contact?` <span style="color:var(--dimmer)">\xB7 ${f(v.contact)}</span>`:""}
            <span class="mono" style="color:var(--dimmer);font-size:11px;margin-left:6px">ticket ${f(v.id)}</span>
            ${v.resolved?'<span class="tag resolved" style="margin-left:6px">resolved \u2713</span>':`<span class="tag ${v.status==="replied"?"live":"fresh"}" style="margin-left:6px">${f(v.status)}</span>`}
            <div style="color:var(--dim);font-size:13px;margin-top:4px">${f(v.message)}</div>
            ${v.reply?`<div style="color:var(--gold);font-size:12.5px;margin-top:4px">\u21A9 ${f(v.reply)}</div>`:""}
          </div>
          <input class="set-val fb-reply-in" data-fb-reply placeholder="Write a reply\u2026" value="${f(v.reply||"")}">
          <button class="icon-btn" data-fb-send title="Send reply"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-resolve title="${v.resolved?"Reopen \u2014 mark as not resolved":"Mark as resolved"}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.6L16 9.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-del title="Delete message">${m}</button>
        </div>`).join("")||'<div class="empty">No messages yet.</div>',a.querySelectorAll("[data-fb-id]").forEach(v=>{let $=v.querySelector("[data-fb-reply]");$&&x[v.dataset.fbId]!=null&&($.value=x[v.dataset.fbId])})}catch{a.innerHTML='<div class="empty">Network error loading messages.</div>'}}L(),d("#fb-refresh").addEventListener("click",()=>{L(),S("Inbox refreshed.")}),window._fbTimer=setInterval(()=>{if(!d("#fb-inbox")){clearInterval(window._fbTimer),window._fbTimer=null;return}document.hidden||L()},2e3),d("#fb-inbox").addEventListener("click",async a=>{let r=a.target.closest("[data-fb-send]"),p=a.target.closest("[data-fb-del]"),c=a.target.closest("[data-fb-resolve]");if(!r&&!p&&!c)return;let b=a.target.closest("[data-fb-id]"),x=b.dataset.fbId,v=le();try{if(c){let $=b.dataset.fbResolved!=="1";if(!(await fetch(Q+"/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:v,id:x,resolved:$})}).then(q=>q.json())).ok){S("Could not update \u2014 try again.");return}S($?"Marked as resolved \u2713":"Message reopened."),L()}else if(r){let $=b.querySelector("[data-fb-reply]").value;if(!(await fetch(Q+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:v,id:x,reply:$})}).then(q=>q.json())).ok){S("Reply failed.");return}S("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(Q+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:v,id:x})}).then(M=>M.json())).ok){S("Delete failed.");return}b.remove(),S("Message deleted.")}}catch{S("Network error.")}})}var pe=document.getElementById("fl-cards");pe&&window.matchMedia("(hover: hover)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(pe.addEventListener("pointermove",e=>{let s=e.target.closest&&e.target.closest(".fl-card");if(!s)return;let n=s.getBoundingClientRect(),o=(e.clientX-n.left)/n.width-.5,l=(e.clientY-n.top)/n.height-.5;s.classList.add("tilt"),s.style.transform=`perspective(1000px) rotateY(${(o*7).toFixed(2)}deg) rotateX(${(-l*6).toFixed(2)}deg) translateY(-6px)`}),pe.addEventListener("pointerleave",()=>{pe.querySelectorAll(".fl-card").forEach(e=>{e.style.transform="",e.classList.remove("tilt")})}));d("#search").addEventListener("input",e=>{let s=e.target.value.trim().toLowerCase(),n=d("#search-drop");if(!s){n.classList.remove("show");return}let o=Y.players.filter(l=>l.name.toLowerCase().includes(s)).slice(0,8);if(!o.length){n.classList.remove("show");return}n.innerHTML=o.map(l=>`
    <a class="drop-row" href="#/player/${G(l.name)}">
      ${l.rank?$e(l.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${f(l.name)}</span>        <span class="mono" style="margin-left:auto;color:var(--dim)">${ye(l,!0)}</span>
    </a>`).join(""),n.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||d("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(d("#search-drop").classList.remove("show"),d("#search").value="")});var Q=we.replace(/\/publish$/,"/feedback"),Le="tt1v1_fb_tickets";function Ft(){try{return JSON.parse(localStorage.getItem(Le)||"[]")}catch{return[]}}function Dt(e){let s=Ft();s.push({id:e,ts:Date.now()});try{localStorage.setItem(Le,JSON.stringify(s.slice(-20)))}catch{}}function _t(){let e=d("#fb-overlay"),s=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>d("#fb-msg").focus(),180)},n=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};d("#fab-feedback").addEventListener("click",s),d("#fb-close").addEventListener("click",n),d("#fb-done").addEventListener("click",n),e.addEventListener("click",i=>{i.target===e&&n()}),document.addEventListener("keydown",i=>{i.key==="Escape"&&e.classList.contains("show")&&n()});let o=d("#faq-feedback-btn");o&&o.addEventListener("click",s);let l=d("#fb-msg"),m=d("#fb-count-n");l.addEventListener("input",()=>{m.textContent=String(l.value.length);try{localStorage.setItem("tt1v1_fb_draft",l.value)}catch{}});try{let i=localStorage.getItem("tt1v1_fb_draft");i&&(l.value=i,m.textContent=String(i.length))}catch{}let g=d("#fb-send");g.addEventListener("click",async()=>{let i=l.value.trim();if(i.length<5){l.focus(),l.classList.add("fb-nudge"),setTimeout(()=>l.classList.remove("fb-nudge"),500),S(t("fb.writeFirst"));return}g.classList.add("busy"),g.disabled=!0;try{let u=await fetch(Q,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:d("#fb-name").value.trim(),contact:d("#fb-contact").value.trim(),message:i})}),w=await u.json().catch(()=>({}));if(!u.ok||!w.ok){S(t("fb.couldNotSend",{err:w.error||"HTTP "+u.status}));return}Dt(w.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}d("#fb-ticket-code").textContent=w.id,d("#fb-view-form").hidden=!0,d("#fb-view-done").hidden=!1}catch{S(t("fb.netError"))}finally{g.classList.remove("busy"),g.disabled=!1}});let h=document.querySelector(".fb-ticket");h&&h.addEventListener("click",async()=>{let i=(d("#fb-ticket-code").textContent||"").trim();if(!i||i==="\u2014")return;try{await navigator.clipboard.writeText(i)}catch{let k=document.createElement("textarea");k.value=i,document.body.appendChild(k),k.select();try{document.execCommand("copy")}catch{}k.remove()}let u=d("#fb-copied");u&&(u.classList.add("show"),clearTimeout(window._fbCopiedT),window._fbCopiedT=setTimeout(()=>u.classList.remove("show"),1800)),S(t("fb.ticketCopied"))}),d("#fb-check").addEventListener("click",async()=>{let i=d("#fb-ticket-in").value.trim(),u=d("#fb-reply-out");if(i){u.classList.add("show"),u.textContent=t("fb.checking");try{let w=await fetch(Q+"/status?id="+encodeURIComponent(i)),k=await w.json().catch(()=>({}));if(!w.ok||!k.ok){u.textContent=t("fb.noTicket");return}u.innerHTML=k.resolved?`${t("fb.statusResolved")}${k.reply?`<br>${t("fb.replyFrom",{reply:f(k.reply)})}`:""}`:k.reply?t("fb.replyFrom",{reply:f(k.reply)}):t("fb.statusPending",{status:f(k.status)})}catch{u.textContent=t("fb.netErrorShort")}}})}function Bt(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let s=null,n=()=>{e.classList.remove("show"),s=null};document.addEventListener("mouseover",o=>{let l=o.target.closest&&o.target.closest("[title],[data-tip]");if(!l)return;l.hasAttribute("title")&&(l.setAttribute("data-tip",l.getAttribute("title")),l.removeAttribute("title"));let m=l.getAttribute("data-tip");if(!m)return;s=l,e.textContent=m;let g=l.getBoundingClientRect(),h=g.top<52;e.classList.toggle("below",h),e.style.left=Math.max(10,Math.min(window.innerWidth-10,g.left+g.width/2))+"px",e.style.top=(h?g.bottom+8:g.top-8)+"px",e.classList.add("show")}),document.addEventListener("mouseout",o=>{if(!s)return;let l=o.relatedTarget;l&&l.closest&&l.closest("[title],[data-tip]")===s||n()}),window.addEventListener("scroll",n,{passive:!0})}var Ge;function S(e){let s=d("#toast");s.textContent=e,s.classList.add("show"),clearTimeout(Ge),Ge=setTimeout(()=>s.classList.remove("show"),2600)}var ie;function xe(){ie&&ie.disconnect(),ie=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&(s.target.classList.add("in"),C(".cu",s.target).forEach(n=>Oe(n,parseFloat(n.dataset.target),{dec:parseInt(n.dataset.dec||0)})),ie.unobserve(s.target))})},{threshold:.12}),C(".reveal").forEach(e=>ie.observe(e))}(function(){let s=d("#scroll-progress"),n=d("#to-top"),o=d("#page-home .hero-row"),l=document.querySelector(".topbar"),m=()=>{let g=window.scrollY,h=document.documentElement.scrollHeight-window.innerHeight;s&&(s.style.width=(h>0?g/h*100:0)+"%"),n&&n.classList.toggle("show",g>640),l&&l.classList.toggle("scrolled",g>10),o&&g<1400&&(o.style.transform=`translateY(${g*.14}px)`,o.style.opacity=String(Math.max(.3,1-g/950)))};window.addEventListener("scroll",m,{passive:!0}),n&&n.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),m()})();N();Ie();ke();_t();Bt();window.addEventListener("lb-lang",()=>{let e=window.scrollY,s=V,n={...I};if(ke(),d("#page-home").classList.contains("active")&&(s!=="all"||n.key!=="rank"||n.dir!==1)){V=s,I=n,C(".chip[data-filter]").forEach(l=>l.classList.toggle("on",l.dataset.filter===s)),C(".sortable").forEach(l=>l.classList.remove("sorted","asc"));let o=d(`.sortable[data-key="${n.key}"]`);o&&(o.classList.add("sorted"),n.dir===1&&o.classList.add("asc")),te(s,n.key,n.dir)}Fe(),window.scrollTo(0,e)});function me(e,s){let n=e.indexOf("window."+s);if(n<0)return null;let o=e.indexOf("=",n);for(;o<e.length&&"{[".indexOf(e[o])<0;)o++;let l=0,m=!1,g="",h=!1;for(let i=o;i<e.length;i++){let u=e[i];if(m){h?h=!1:u==="\\"?h=!0:u===g&&(m=!1);continue}if(u==='"'||u==="'"){m=!0,g=u;continue}if(u==="{"||u==="[")l++;else if((u==="}"||u==="]")&&(l--,l<=0))return JSON.parse(e.slice(o,i+1))}return null}async function Se(e){try{let s="cb="+Date.now(),[n,o]=await Promise.all([fetch("data.js?"+s,{cache:"no-store"}),fetch("log.js?"+s,{cache:"no-store"})]);if(!n.ok||!o.ok)throw new Error("HTTP "+n.status+"/"+o.status);let l=await n.text(),m=await o.text(),g=me(l,"LB_DATA"),h=me(m,"LB_PUB")||(me(m,"LB_LOG")?{matches:me(m,"LB_LOG")}:null),i=[];if(g&&JSON.stringify(g)!==JSON.stringify(D)&&(D=g,window.LB_DATA=g,i.push("data")),h&&JSON.stringify(h)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=h,window.LB_LOG=h.matches||[],i.push("log")),i.length){N(),Ie(),ke();let u=d("#last-updated");u&&(u.textContent=t("home.lastUpdated",{when:se(D.generated)||"today"}))}e&&S(i.length?t("misc.refreshed"):t("misc.upToDate"))}catch{e&&S(t("misc.refreshFailed"))}}Se(!1);var ue=d("#lb-refresh-btn");ue&&ue.addEventListener("click",async()=>{ue.classList.add("spinning"),await Se(!0),setTimeout(()=>ue.classList.remove("spinning"),400)});setInterval(()=>Se(!1),6e4);document.addEventListener("visibilitychange",()=>{document.hidden||Se(!1)});var tt="tt1v1_fb_seen",z=null;function Ht(){try{return JSON.parse(localStorage.getItem(Le)||"[]")}catch{return[]}}function st(){try{return JSON.parse(localStorage.getItem(tt)||"{}")||{}}catch{return{}}}function Ut(){let e=d("#fab-feedback");if(e&&!e.querySelector(".fb-dot")){let n=document.createElement("span");n.className="fb-dot",e.appendChild(n),requestAnimationFrame(()=>n.classList.add("in"))}let s=d("#fb-view-form");if(s&&!d("#fb-reply-banner")&&z){let n=document.createElement("div");n.id="fb-reply-banner",n.innerHTML=`${t("fb.teamReplied",{id:f(z.id)})}
      <div class="r">${f(z.reply)}</div>
      <button class="btn btn-ghost" id="fb-got-it" style="margin-top:9px;padding:6px 13px">${t("fb.gotIt")}</button>`,s.insertAdjacentElement("beforebegin",n),requestAnimationFrame(()=>n.classList.add("show")),d("#fb-got-it").addEventListener("click",Gt)}}function Gt(){if(z){let n=st();n[z.id]=1;try{localStorage.setItem(tt,JSON.stringify(n))}catch{}z=null}let e=d(".fb-dot");e&&(e.classList.add("out"),setTimeout(()=>e.remove(),420));let s=d("#fb-reply-banner");s&&(s.classList.remove("show"),setTimeout(()=>s.remove(),420))}async function at(){let e=st();z=null;let s=Ht(),n=s.slice(0,Math.max(0,s.length-6)),o=[];for(let l of s.slice(-6))try{let m=await fetch(Q+"/status?id="+encodeURIComponent(l.id),{cache:"no-store"}),g=await m.json().catch(()=>({}));if(m.status===404||m.ok&&g.ok===!1)continue;o.push(l),m.ok&&g.ok&&g.reply&&!e[l.id]&&!z&&(z={id:l.id,reply:g.reply})}catch{o.push(l)}if(o.length!==s.slice(-6).length)try{localStorage.setItem(Le,JSON.stringify([...n,...o]))}catch{}z&&Ut()}setTimeout(at,3500);setInterval(at,9e4);})();
