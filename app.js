/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var D=window.LB_DATA,we="https://tierstats-publish.tierstats.workers.dev/publish",d=(e,s=document)=>s.querySelector(e),N=(e,s=document)=>[...s.querySelectorAll(e)],h=e=>String(e).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),G=e=>encodeURIComponent(String(e)),_e=e=>decodeURIComponent(e);function Oe(e,s,n={}){let i=n.dur||1200,o=n.dec||0,u=performance.now(),g=parseFloat(e.textContent)||0;function m(c){let f=Math.min(1,(c-u)/i),w=1-Math.pow(1-f,3);e.textContent=(g+(s-g)*w).toFixed(o),f<1&&requestAnimationFrame(m)}requestAnimationFrame(m),setTimeout(()=>{e.textContent=s.toFixed(o)},i+300)}var it='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',ot='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function $e(e,s=""){let n=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",i=e<=3?e===1?it:ot:"";return`<div class="rank-badge ${n} ${s}" title="${t("home.rankTip",{n:e})}">${i}<span class="num">${e}</span></div>`}var O=e=>t(e==="W"?"rec.wLetter":e==="L"?"rec.lLetter":"rec.dLetter"),B={},F=[],Y={players:[],byName:{},qualified:[]},oe={},fe={},X={},Ee=new Set,Be="tt1v1_baseline",Ce={prevRatings:{},prevRanks:{}};function lt(){let e=D.baselineEpoch||"default",s=null;try{s=JSON.parse(localStorage.getItem(Be)||"null")}catch{s=null}if(!s||typeof s!="object"||s.epoch!==e){s={epoch:e,prevRatings:D.prevRatings||{},prevRanks:D.prevRanks||{}};try{localStorage.setItem(Be,JSON.stringify(s))}catch{}}Ce={prevRatings:{...D.prevRatings||{},...s.prevRatings||{}},prevRanks:{...D.prevRanks||{},...s.prevRanks||{}}}}function rt(){for(let n in oe)delete oe[n];let e=new Set(H().aliasRemoved||[]);Object.entries(D.aliases).forEach(([n,i])=>{e.has(n)||(oe[n.toLowerCase()]=i)}),Object.entries(H().aliases||{}).forEach(([n,i])=>{oe[String(n).toLowerCase()]=i});for(let n of Object.keys(fe))delete fe[n];for(let n of Object.keys(X))delete X[n];Ee.clear();let s=(n,i)=>{Object.keys(n||{}).forEach(o=>{let u=U(o);u!==o&&(i[u]=n[o])}),Object.keys(n||{}).forEach(o=>{let u=U(o);u===o&&(i[u]=n[o])})};s(D.seeds,fe),s(Ce.prevRatings,X),(D.inactiveList||[]).forEach(n=>Ee.add(U(n)))}var U=e=>{let s=String(e).trim(),n=new Set;for(;;){let i=oe[s.toLowerCase()];if(!i||i===s||n.has(s))return s;n.add(s),s=i}};function Ne(e){let s=[];return W().forEach(n=>{let i=(o,u,g)=>({opp:o,for_:u,against:g,res:u>g?"W":u<g?"L":"D",date:n.date});n.a===e?s.push(i(n.b,n.sa,n.sb)):n.b===e&&s.push(i(n.a,n.sb,n.sa))}),s}function ct(e){let s={};return Ne(e).forEach(n=>{let i=s[n.opp]||(s[n.opp]={w:0,l:0,d:0,pf:0,pa:0});i[n.res.toLowerCase()]+=1,i.pf+=n.for_,i.pa+=n.against}),Object.entries(s).map(([n,i])=>({opp:n,...i})).sort((n,i)=>i.w+i.l+i.d-(n.w+n.l+n.d)||i.w-n.w)}function dt(e){let s=B[e]||{};return s.provisional?`<span class="tag prov">${t("tag.provisional")}</span>`:s.inactive?`<span class="tag inact">${t("tag.inactive")}</span>`:""}function vt(e){let s=Ne(e).slice(0,5).reverse();if(!s.length)return"";let n=s.map(i=>O(i.res)).join(" ");return`<span class="form" title="${t("form.title",{n:s.length,seq:n})}">${s.map(i=>`<i class="${i.res.toLowerCase()}">${O(i.res)}</i>`).join("")}</span>`}function Je(){let e=typeof getLang=="function"?getLang():"en";return{en:"en-US",zh:"zh-CN",ja:"ja-JP",ru:"ru-RU"}[e]||"en-US"}function ze(e){let s=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||"").slice(0,10));return s?new Date(+s[1],+s[2]-1,+s[3]):null}function se(e){let s=ze(e);if(!s)return"";let n=s.getFullYear()===new Date().getFullYear();try{return new Intl.DateTimeFormat(Je(),n?{month:"short",day:"numeric"}:{year:"numeric",month:"short",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Ye(e){let s=ze(e);if(!s)return"";try{return new Intl.DateTimeFormat(Je(),{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Ae(e){let s=e.delta!=null?e.delta:0;if(Math.abs(s)<.05)return"";let n=s>0,i=Math.abs(s).toFixed(1);return`<span class="delta ${n?"up":"down"}" title="${n?t("delta.upTitle",{n:i}):t("delta.downTitle",{n:i})}">${n?"\u25B2":"\u25BC"} ${i}</span>`}function pt(){let e=Ce.prevRanks||{},s=Object.keys(e);if(s.length){let o={};return s.forEach(u=>{o[U(u)]=e[u]}),o}let n={};F.forEach(o=>{X[o.name]!=null&&(n[o.name]=X[o.name])});let i={};return Object.entries(n).sort((o,u)=>u[1]-o[1]).forEach(([o],u)=>{i[o]=u+1}),i}function mt(e,s){let n=s[e.name]!=null?s[e.name]:s[U(e.name)];if(n==null){let o=(D.newSince||{})[e.name];return!o||(Date.now()-Date.parse(o))/864e5>5?"":`<span class="mv new" title="${t("mv.newTitle")}">${t("mv.new")}</span>`}let i=n-e.rank;return i>0?`<span class="mv up" title="${tp("mv.up",i)}">\u25B2${i}</span>`:i<0?`<span class="mv down" title="${tp("mv.down",-i)}">\u25BC${-i}</span>`:""}function ve(e){return`${Math.round(e.rating-100)} \u2013 ${Math.round(e.rating+100)}`}function ye(e,s){if(!e.provisional)return e.rating.toFixed(1);let n=s?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:ve(e);return`<span class="prov-range" title="${t("rating.provTitle")}">${n}</span>`}var Ve="tt1v1_admin_log_v1",ee="tt1v1_admin_ok",K="tt1v1_admin_pw",ut=()=>sessionStorage.getItem(ee)==="1"||localStorage.getItem(ee)==="1",le=()=>sessionStorage.getItem(K)||localStorage.getItem(K)||"";function ft(e,s){s?(localStorage.setItem(ee,"1"),localStorage.setItem(K,e)):(sessionStorage.setItem(ee,"1"),sessionStorage.setItem(K,e),localStorage.removeItem(ee),localStorage.removeItem(K))}function ht(){[sessionStorage,localStorage].forEach(e=>{e.removeItem(ee),e.removeItem(K)})}var He=null,Me=!1;function Ze(){Me||!le()||(clearTimeout(He),He=setTimeout(()=>publishLog({silent:!0}),1500))}var gt=we.replace(/\/publish$/,"/verify"),bt=we.replace(/\/publish$/,"/sync");function Z(){try{return JSON.parse(localStorage.getItem(Ve)||"[]")}catch{return[]}}function ne(e){try{localStorage.setItem(Ve,JSON.stringify(e))}catch{}Ze()}var Qe="tt1v1_admin_over_v1";function P(){try{return JSON.parse(localStorage.getItem(Qe)||"{}")||{}}catch{return{}}}function j(e){try{localStorage.setItem(Qe,JSON.stringify(e))}catch{}Ze()}function H(){let e=window.LB_PUB||{},s=P(),n=new Set([...e.aliasRemoved||[],...s.aliasRemoved||[]]),i=new Set([...e.seedRemoved||[],...s.seedRemoved||[]]),o=s.aliases||{},u={...s.seeds||{},...s.seedGlicko||{},...s.seedRd||{}},g=L=>Object.fromEntries(Object.entries(L||{}).filter(([a])=>!n.has(a)||o[a]!=null)),m=L=>Object.fromEntries(Object.entries(L||{}).filter(([a])=>!i.has(a)||u[a]!=null)),c=g({...e.aliases||{},...s.aliases||{}}),f=g({...e.aliasNotes||{},...s.aliasNotes||{}}),w=m({...e.seeds||{},...s.seeds||{}}),k=m({...e.seedGlicko||{},...s.seedGlicko||{}}),E=m({...e.seedRd||{},...s.seedRd||{}});return{aliases:c,aliasNotes:f,seeds:w,seedGlicko:k,seedRd:E,aliasRemoved:[...n].filter(L=>c[L]==null),seedRemoved:[...i].filter(L=>w[L]==null&&k[L]==null&&E[L]==null),settings:{...e.settings||{},...s.settings||{}},matchEdits:{...e.matchEdits||{},...s.matchEdits||{}},inactive:s.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...s.matchRemoved||[]])],faq:s.faq!=null?s.faq:e.faq!=null?e.faq:null}}function Ke(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function W(){let e=H(),s=e.matchEdits||{},n=new Set(e.matchRemoved||[]),i=(k,E)=>{if(n.has(E))return null;let L=s[E],a=L?{...k,sa:L.sa,sb:L.sb,date:L.date!=null?L.date:k.date}:k;return{...a,a:U(a.a),b:U(a.b),sa:+a.sa,sb:+a.sb,key:E}},o=Z().map((k,E)=>i({...k,admin:!0,published:!1},"l:"+E)).filter(Boolean),u=Ke().map((k,E)=>i({...k,admin:!0,published:!0},"p:"+E)).filter(Boolean),g=D.matches.map((k,E)=>i({...k,admin:!1,published:!1},"a:"+E)).filter(Boolean).reverse(),m=k=>{let E=k.a>k.b;return[E?k.b:k.a,E?k.a:k.b,E?k.sb:k.sa,E?k.sa:k.sb,k.date||""].join("|")},c={};g.forEach(k=>{let E=m(k);c[E]=(c[E]||0)+1});let f={};return o.concat(u).filter(k=>{let E=m(k);return f[E]=(f[E]||0)+1,f[E]>(c[E]||0)}).concat(g)}var R={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},he=864e5,de=Math.log(10)/400,Xe=e=>1/Math.sqrt(1+3*de*de*e*e/(Math.PI*Math.PI)),Re=(e,s,n)=>1/(1+Math.pow(10,-Xe(n)*(e-s)/400));function yt(e){let s=H().seeds||{};return s[e]!=null&&s[e]!==""?Number(s[e]):fe[e]}function wt(e){let s=(H().seedGlicko||{})[e],n=(H().seedRd||{})[e],i=s!=null&&s!==""?Number(s):null,o=n!=null&&n!==""?Number(n):null;if(i!=null||o!=null)return[i??R.unratedR,o??R.unratedRd];let u=yt(e);return u!=null?[Math.max(R.seedMid+(u-R.oldMid)*R.ptsPer,R.minSeed),R.knownRd]:[R.unratedR,R.unratedRd]}function Ue(e,s,n){let i=0,o=0;for(let[g,m,c]of n){let f=Xe(m),w=Re(e,g,m);i+=f*f*w*(1-w),o+=f*(c-w)}if(i*=de*de,i<=0)return[e,s];let u=1/(s*s)+i;return[e+de/u*o,Math.sqrt(1/u)]}function $t(e,s){let n=Math.pow(10,s),i=e*n,o=Math.floor(i);return Math.abs(i-o-.5)<1e-6?(o%2===0?o:o+1)/n:Math.round(i)/n}var je=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(R.periodDays*he)),re=je(R.graceStart),kt={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function Pe(){let e=H().settings||{};return(D.settings||[]).map(s=>({...s,value:Object.prototype.hasOwnProperty.call(e,s.name)?e[s.name]:s.value}))}function Lt(){for(let e of Pe()){let s=kt[e.name];if(!s)continue;if(s==="graceStart"){let i=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(i)&&(R.graceStart=i);continue}let n=Number(e.value);Number.isFinite(n)&&(R[s]=n)}re=je(R.graceStart),N(".cons-val").forEach(e=>{e.textContent=String(R.conservative)}),N(".min-matches-val").forEach(e=>{e.textContent=String(R.minMatches)}),N(".min-opp-val").forEach(e=>{e.textContent=String(R.minOpp)})}function xt(){Lt(),rt();let e={},s=a=>{if(!e[a]){let[l,p]=wt(a);e[a]={name:a,r:l,rd:p,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[a]},n=(a,l,p,r,b,x)=>{let v=s(a);v.games++,v.opps.add(l),p>r?v.w++:p<r?v.l++:v.d++,v.lastIdx=x,b&&(v.lastDate=b)},i={};for(let a of W()){if(a.date)continue;let l=a.a,p=a.b,r=a.sa>a.sb?1:a.sa<a.sb?0:.5;(i[l]=i[l]||[]).push([p,r]),(i[p]=i[p]||[]).push([l,1-r]),n(l,p,a.sa,a.sb,"",re),n(p,l,a.sb,a.sa,"",re)}let o={};for(let a in i)o[a]=[s(a).r,s(a).rd];for(let a in i){let[l,p]=Ue(o[a][0],o[a][1],i[a].map(([r,b])=>[o[r][0],o[r][1],b]));s(a).r=l,s(a).rd=p}let u=new Map;for(let a of W().filter(l=>l.date).slice().reverse()){let l=a.date,p=je(l);u.has(p)||u.set(p,[]),u.get(p).push({a:U(a.a),b:U(a.b),sa:+a.sa,sb:+a.sb,date:l})}for(let a of[...u.keys()].sort((l,p)=>l-p)){for(let r in e){let b=e[r],x=a-(b.lastIdx==null?re:b.lastIdx);x>0&&(b.rd=Math.min(Math.sqrt(b.rd*b.rd+R.growth*R.growth*x),R.maxRd))}let l={};for(let r of u.get(a)){let b=r.sa>r.sb?1:r.sa<r.sb?0:.5;(l[r.a]=l[r.a]||[]).push([r.b,b]),(l[r.b]=l[r.b]||[]).push([r.a,1-b]),n(r.a,r.b,r.sa,r.sb,r.date,a),n(r.b,r.a,r.sb,r.sa,r.date,a)}let p={};for(let r in l)p[r]=[s(r).r,s(r).rd];for(let r in l){let[b,x]=Ue(p[r][0],p[r][1],l[r].map(([v,$])=>[p[v][0],p[v][1],$]));s(r).r=b,s(r).rd=x}}let g=Object.values(e).map(a=>({name:a.name,glicko:a.r,rd:a.rd,rating:a.r-R.conservative*a.rd,matches:a.games,w:a.w,l:a.l,d:a.d,winPct:a.games?$t(a.w/a.games*100,1):0,opponents:a.opps.size,avgOpp:0,lastMatch:a.lastDate||"",provisional:!(a.games>=R.minMatches&&a.opps.size>=R.minOpp),inactive:!1})),m={};g.forEach(a=>{m[a.name]=a.glicko}),g.forEach(a=>{let l=0;e[a.name].opps.forEach(p=>{l+=m[p]!=null?m[p]:R.unratedR}),a.avgOpp=e[a.name].opps.size?l/e[a.name].opps.size:0});let c=Date.now(),f=Math.floor(c/(R.periodDays*he));for(let a in e){let l=e[a],p=f-(l.lastIdx==null?re:l.lastIdx);p>0&&(l.rd=Math.min(Math.sqrt(l.rd*l.rd+R.growth*R.growth*p),R.maxRd))}g.forEach(a=>{a.glicko=e[a.name].r,a.rd=e[a.name].rd,a.rating=a.glicko-R.conservative*a.rd;let l=X[a.name],p=(D.curRatings||{})[a.name];a.delta=l!=null?(p??a.rating)-l:0});let w=Date.parse(R.graceStart+"T00:00:00Z")+R.graceDays*he,k=new Set([...Ee,...H().inactive||[]]);g.forEach(a=>{a.inactive=k.has(a.name)||(a.lastMatch?c-Date.parse(a.lastMatch+"T00:00:00Z")>R.inactiveDays*he:c>w)});let E=g.filter(a=>!a.provisional&&!a.inactive).sort((a,l)=>l.rating-a.rating);E.forEach((a,l)=>{a.rank=l+1}),g.sort((a,l)=>l.rating-a.rating);let L={};return g.forEach(a=>{L[a.name]=a}),{players:g,byName:L,qualified:E}}function A(){lt(),Y=xt(),B=Y.byName,F=Y.qualified}var St=["page-home","page-player","page-compare","page-matches","page-roster","page-analytics","page-method","page-faq","page-admin"];function ke(){if(qe){qe=!1;return}let e=location.hash||"#/";St.forEach(o=>d("#"+o).classList.remove("active"));let s="#/"+(e.split("/")[1]||"");N(".nav a, .foot-nav a").forEach(o=>{let u=o.getAttribute("href");o.classList.toggle("active",u===s||e==="#/"&&u==="#/")});let n=d("#nav-glide"),i=document.querySelector(".nav a.active");if(n&&i&&i.offsetWidth>0?(n.style.width=i.offsetWidth+"px",n.style.transform=`translateX(${i.offsetLeft}px)`,n.style.opacity="1"):n&&(n.style.opacity="0"),e==="#/compare"||e.startsWith("#/compare/")){let o=e.split("/").slice(2).map(_e);tt(o[0]||"",o[1]||""),d("#page-compare").classList.add("active"),window.scrollTo(0,0)}else e.startsWith("#/player/")?(Ct(_e(e.slice(9))),d("#page-player").classList.add("active"),window.scrollTo({top:0,behavior:"instant"in window?"instant":"auto"})):e==="#/matches"?(Nt(),d("#page-matches").classList.add("active"),window.scrollTo(0,0)):e==="#/roster"?(At(),d("#page-roster").classList.add("active"),window.scrollTo(0,0)):e==="#/analytics"?(jt(),d("#page-analytics").classList.add("active"),window.scrollTo(0,0)):e==="#/method"?(Pt(),d("#page-method").classList.add("active"),window.scrollTo(0,0)):e==="#/faq"?(Ft(),d("#page-faq").classList.add("active"),window.scrollTo(0,0)):e==="#/admin"?(I(),d("#page-admin").classList.add("active"),window.scrollTo(0,0)):(Ie(),d("#page-home").classList.add("active"),requestAnimationFrame(qt));xe()}window.addEventListener("hashchange",ke);function Ie(){V="all",C={key:"rank",dir:1},N(".chip[data-filter]").forEach(m=>m.classList.toggle("on",m.dataset.filter==="all")),Fe();let e=W().length,s=Y.players.length,n=F[0],i=Math.round(F.reduce((m,c)=>m+c.rd,0)/F.length),o=d("#hero-chip-matches");o&&(o.innerHTML=t("home.chipMatches",{n:e})),d("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">${t("stat.ranked")}</div>
      <div class="v"><span class="cu" data-target="${F.length}">0</span><small>${t("stat.ofTotal",{n:s})}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.matches")}</div>
      <div class="v"><span class="cu" data-target="${e}">0</span></div></div>
    <div class="stat-card"><div class="k">${t("stat.highest")}</div>
      <div class="v"><span class="cu" data-target="${n.rating}" data-dec="1">0</span><small>${h(n.name)}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.avgRd")}</div>
      <div class="v"><span class="cu" data-target="${i}" data-dec="1">0</span><small>${t("stat.certainty")}</small></div></div>`;let u=[F[1],F[0],F[2]].filter(Boolean);d("#fl-cards").innerHTML=u.map(m=>`
    <div class="fl-card r${m.rank}${m.rank===1?" champ":""} reveal" data-goto="${h(m.name)}">
      <div class="fl-top">
        ${$e(m.rank)}
        <div class="rd">RD ${m.rd.toFixed(0)}</div>
      </div>
      ${m.rank===1?`<div class="champ-tag">${t("home.champTag")}</div>`:""}
      <div class="nm">${h(m.name)}</div>
      <div class="rating">
        <span class="unit">${t("home.ratingUnit")}</span>
        <div class="big-row"><span class="big">${Math.round(m.rating)}</span>${Ae(m)}</div>
      </div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${m.winPct>=60?"":m.winPct>=40?"mid":"low"}" data-w="${m.winPct}"></div></div>
      </div>
      <div class="meta">
        <span><span class="w">${m.w}${O("W")}</span> <span class="l">${m.l}${O("L")}</span> ${m.d}${O("D")}</span>
        <span class="wc">${m.winPct}%</span>
        <span class="opp">${t("home.avgOpp",{n:Math.round(m.avgOpp)})}</span>
      </div>
    </div>`).join(""),requestAnimationFrame(()=>{N("#fl-cards .bar-fill").forEach(m=>{m.style.width=m.dataset.w+"%"})}),te(),et();let g=d("#last-updated");g&&(g.textContent=t("home.lastUpdated",{when:se(D.generated)||"today"}))}function et(){let e=W().filter(s=>s.date).slice(0,10);d("#battles-grid").innerHTML=e.length?e.map(s=>{let n=s.sa>s.sb,i=s.sb>s.sa;return`
    <div class="battle-row reveal" data-goto="${h(n?s.a:s.b)}">
      <div class="who ${n?"win":"lose"}" data-goto="${h(s.a)}">${h(s.a)}</div>
      <div class="vs">${t("vs")}</div>
      <div class="who r ${i?"win":"lose"}" data-goto="${h(s.b)}">${h(s.b)}</div>
      <div class="sc mono"><span class="${n?"win":"lose"}">${s.sa}</span> \u2013 <span class="${i?"win":"lose"}">${s.sb}</span></div>
      <div class="dt">${se(s.date)||(s.admin&&!s.published?t("battles.justNow"):t("misc.historical"))}</div>
    </div>`}).join(""):`<div class="empty" style="padding:26px;text-align:center;color:var(--dim);grid-column:1/-1">${t("battles.empty")}</div>`}var Et=500,Mt="cubic-bezier(.22,.8,.24,1)",Rt=12;function Tt(e,s){matchMedia("(prefers-reduced-motion: reduce)").matches||N(".lb-row",e).forEach((n,i)=>{let o=s.get(n.dataset.name);if(o===void 0||typeof n.animate!="function")return;let u=o-n.getBoundingClientRect().top;Math.abs(u)<=1||n.animate([{transform:`translateY(${u}px)`},{transform:"none"}],{duration:Et,easing:Mt,delay:Math.min(i*Rt,220),fill:"backwards"})})}function te(e="all",s="rank",n=1){let i=d("#lb-body"),u=(e==="all"&&ge?F:Y.players).slice().map(c=>({...c,rank:c.rank!=null?c.rank:9999}));Te&&(u=u.filter(c=>c.name.toLowerCase().includes(Te))),e==="provisional"?u=u.filter(c=>(B[c.name]||{}).provisional):e==="inactive"?u=u.filter(c=>(B[c.name]||{}).inactive):e==="veterans"?u=u.filter(c=>c.matches>=15):e==="rising"&&(u=u.filter(c=>c.winPct>=60&&c.matches>=5)),u.sort((c,f)=>{let w=c[s],k=f[s];return(typeof w=="string"?w.localeCompare(k):w-k)*n});let g=new Map;N(".lb-row",i).forEach(c=>g.set(c.dataset.name,c.getBoundingClientRect().top));let m=pt();i.innerHTML=u.map(c=>`
    <div class="lb-row ${c.rank<=3?"top"+c.rank:""}" data-name="${h(c.name)}" data-goto="${h(c.name)}">
      <div class="rank">${c.rank<=F.length?$e(c.rank,"sm")+mt(c,m):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="pname">${h(c.name)}</div></div>
      <div class="rating-cell mono">${Ae(c)}${ye(c,!0)}</div>
      <div class="num-cell mono col-hide">${c.rd.toFixed(1)}</div>
      <div class="num-cell mono col-hide">${c.matches}</div>
      <div class="num-cell mono col-hide"><span class="w">${c.w}</span></div>
      <div class="num-cell mono col-hide"><span class="l">${c.l}</span></div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${c.winPct>=60?"":c.winPct>=40?"mid":"low"}" data-w="${c.winPct}"></div></div>
        <div class="pct mono">${c.winPct}%</div>
      </div>
      <div class="num-cell mono col-hide">${c.opponents}</div>
      <div class="num-cell mono col-hide">${c.avgOpp.toFixed(0)}</div>
      <div class="col-status">${dt(c.name)||vt(c.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?t("lb.emptyInactive"):e==="provisional"?t("lb.emptyProv"):t("lb.emptyNone")}</div>`,Tt(i,g),requestAnimationFrame(()=>{N(".bar-fill",i).forEach(c=>{c.style.width=c.dataset.w+"%"})})}var V="all",C={key:"rank",dir:1},Te="",ge=!0;function Fe(){N(".sortable").forEach(s=>s.classList.remove("sorted","asc"));let e=d(`.sortable[data-key="${C.key}"]`);e&&(e.classList.add("sorted"),C.dir===1&&e.classList.add("asc"))}function qt(){N("#stat-strip .cu").forEach(e=>Oe(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),N(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}d("#lb-qual").addEventListener("click",()=>{ge=!ge,d("#lb-qual").classList.toggle("on",ge),te(V,C.key,C.dir)});d("#lb-filter").addEventListener("input",e=>{Te=e.target.value.trim().toLowerCase(),te(V,C.key,C.dir)});var ce=d("#theme-toggle");function De(){if(!ce)return;let e=document.documentElement.dataset.theme==="light",s=e?t("top.toDark"):t("top.toLight");ce.setAttribute("aria-pressed",String(e)),ce.setAttribute("aria-label",s),ce.title=s}ce.addEventListener("click",()=>{let s=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=s;try{localStorage.setItem("tt1v1_theme",s)}catch{}De()});De();document.addEventListener("click",e=>{let s=e.target.closest(".chip");if(s&&s.dataset.filter){N(".chip[data-filter]").forEach(o=>o.classList.remove("on")),s.classList.add("on"),V=s.dataset.filter,te(V,C.key,C.dir);return}let n=e.target.closest(".sortable");if(n){let o=n.dataset.key;C.key===o&&C.dir===-1?C={key:"rank",dir:1}:C.key===o?C={key:o,dir:-C.dir}:C={key:o,dir:1},Fe(),te(V,C.key,C.dir);return}let i=e.target.closest("[data-goto]");i&&(e.stopPropagation(),location.hash="#/player/"+G(i.dataset.goto))});function Ot(e){let s=e.slice();for(let n=s.length-1;n>0;n--){let i=Math.floor(Math.random()*(n+1));[s[n],s[i]]=[s[i],s[n]]}return s}function Ge(e,s){let n=document.getElementById(e);if(!n)return;let i=n.querySelector(".pick-btn"),o=n.querySelector(".pick-search"),u=[...n.querySelectorAll(".pick-opt")],g=n.querySelector(".pick-empty"),m=-1,c=()=>u.filter(L=>!L.classList.contains("hide")),f=L=>{let a=c();if(!a.length){m=-1;return}m=(L%a.length+a.length)%a.length,u.forEach(l=>l.classList.remove("hover")),a[m].classList.add("hover"),a[m].scrollIntoView({block:"nearest"})},w=L=>{let a=L.trim().toLowerCase(),l=0;u.forEach(p=>{let r=!a||p.dataset.name.toLowerCase().includes(a);p.classList.toggle("hide",!r),r&&l++}),g.classList.toggle("show",l===0),m=-1,l&&f(0)},k=()=>{document.querySelectorAll(".pick.open").forEach(L=>{if(L!==n){L.classList.remove("open");let a=L.querySelector(".pick-btn");a&&a.setAttribute("aria-expanded","false")}}),n.classList.add("open"),i.setAttribute("aria-expanded","true"),o.value="",w(""),requestAnimationFrame(()=>o.focus())},E=()=>{n.classList.remove("open"),i.setAttribute("aria-expanded","false")};i.addEventListener("click",()=>{n.classList.contains("open")?E():k()}),o.addEventListener("input",()=>w(o.value)),o.addEventListener("keydown",L=>{if(L.key==="ArrowDown")L.preventDefault(),f(m+1);else if(L.key==="ArrowUp")L.preventDefault(),f(m-1);else if(L.key==="Enter"){L.preventDefault();let a=c();a[m]&&a[m].click()}else L.key==="Escape"&&(E(),i.focus())}),u.forEach(L=>{L.addEventListener("click",()=>{n.dataset.value=L.dataset.name,n.querySelector(".pick-cur").textContent=L.dataset.name,E(),s()}),L.addEventListener("mousemove",()=>{let a=c().indexOf(L);a>=0&&a!==m&&(m=a,u.forEach(l=>l.classList.remove("hover")),L.classList.add("hover"))})})}document.addEventListener("click",e=>{document.querySelectorAll(".pick.open").forEach(s=>{if(!s.contains(e.target)){s.classList.remove("open");let n=s.querySelector(".pick-btn");n&&n.setAttribute("aria-expanded","false")}})});function tt(e,s){let n=d("#cmp-wrap"),o=Y.players.slice().sort((y,T)=>(y.rank!=null?y.rank:9999)-(T.rank!=null?T.rank:9999)||y.name.localeCompare(T.name)).map(y=>y.name);if(o.length<2){n.innerHTML=`<div class="empty">${t("cmp.notEnough")}</div>`;return}let u=y=>y[Math.floor(Math.random()*y.length)],g=y=>u(o.filter(T=>T!==y)),m=B[e]?e:u(o),c=B[s]?s:g(m);c===m&&(c=g(m)),(m!==e||c!==s)&&history.replaceState(null,"","#/compare/"+G(m)+"/"+G(c));let f=B[m],w=B[c],k=F.find(y=>y.name===m),E=F.find(y=>y.name===c),L=Re(f.glicko,w.glicko,w.rd),a=Re(w.glicko,f.glicko,f.rd),l=Math.round(L/(L+a)*1e3)/10,p=Math.round(1e3-l*10)/10,r=W().filter(y=>y.a===m&&y.b===c||y.a===c&&y.b===m).map(y=>{let T=y.a===m,_=T?y.sa:y.sb,J=T?y.sb:y.sa;return{fa:_,fb:J,res:_>J?"W":_<J?"L":"D",date:y.date}}),b=r.reduce((y,T)=>(T.res==="W"?y.w++:T.res==="L"?y.l++:y.d++,y),{w:0,l:0,d:0}),x=Ot(o),v=(y,T,_)=>`
    <div class="pick" id="${y}" data-value="${h(T)}">
      <button type="button" class="pick-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="${h(_)}">
        <span class="pick-cur">${h(T)}</span>
        <svg class="pick-caret" width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true"><path d="M1.2 1.2 5.5 5.6 9.8 1.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="pick-menu">
        <input class="pick-search" type="text" autocomplete="off" spellcheck="false"
          placeholder="${t("cmp.searchPlaceholder")}" aria-label="${h(_)}">
        <div class="pick-list" role="listbox" aria-label="${h(_)}">
          ${x.map(J=>{let ae=B[J];return`<button type="button" class="pick-opt${J===T?" on":""}" role="option" data-name="${h(J)}" aria-selected="${J===T?"true":"false"}">
              <span class="pick-n">${h(J)}</span>
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
      ${v("cmp-a",m,t("cmp.firstPlayer"))}
      <button class="btn btn-ghost" id="cmp-swap" style="width:auto;margin:0" title="${t("cmp.swap")}">\u21C4</button>
      ${v("cmp-b",c,t("cmp.secondPlayer"))}
    </div>
    <div class="cmp-share anim">
      <button class="btn btn-ghost" id="cmp-copy" style="width:auto;margin:0">${t("cmp.copyLink")}</button>
      <span class="caption" id="cmp-copy-msg"></span>
    </div>

    <div class="cmp-hero anim">
      <div class="cmp-side a">
        <div class="cmp-sub">${k?t("cmp.rankN",{n:k.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${G(m)}">${h(m)}</a></div>
        <div class="cmp-rating mono">${f.provisional?ve(f):f.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",f.matches,{rd:f.rd.toFixed(1)})}</div>
      </div>
      <div class="cmp-vs">
        <div class="vs-mark">${t("cmp.vsMark")}</div>
        <div class="mono" style="font-size:11px;color:var(--dimmer)">${t("cmp.h2hShort",{n:r.length})}</div>
      </div>
      <div class="cmp-side b">
        <div class="cmp-sub">${E?t("cmp.rankN",{n:E.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${G(c)}">${h(c)}</a></div>
        <div class="cmp-rating mono">${w.provisional?ve(w):w.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",w.matches,{rd:w.rd.toFixed(1)})}</div>
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.probTitle")} <span class="n">${t("cmp.probSub")}</span></h3>
      <div class="cmp-prob-labels">
        <span style="color:var(--gold)">${h(m)} ${l.toFixed(1)}%</span>
        <span style="color:var(--blue)">${p.toFixed(1)}% ${h(c)}</span>
      </div>
      <div class="cmp-probbar"><i class="pa" style="width:${l}%"></i><i class="pb" style="width:${p}%"></i></div>
      <div class="cmp-prob-note">${t("cmp.probNote")}</div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.tale")}</h3>
      <div class="cmp-table">
        ${$(t("cmp.rating"),ye(f),ye(w),!f.provisional&&f.rating>w.rating,!w.provisional&&w.rating>f.rating)}
        ${$(t("cmp.rank"),k?"#"+k.rank:M,E?"#"+E.rank:M,k&&E&&k.rank<E.rank,k&&E&&E.rank<k.rank)}
        ${$(t("cmp.rdUnc"),f.rd.toFixed(1),w.rd.toFixed(1),f.rd<w.rd,w.rd<f.rd)}
        ${$(t("cmp.glicko"),f.glicko.toFixed(1),w.glicko.toFixed(1),f.glicko>w.glicko,w.glicko>f.glicko)}
        ${$(t("cmp.record"),`<span style="color:var(--green)">${f.w}${O("W")}</span> <span style="color:var(--red)">${f.l}${O("L")}</span> ${f.d}${O("D")}`,`<span style="color:var(--green)">${w.w}${O("W")}</span> <span style="color:var(--red)">${w.l}${O("L")}</span> ${w.d}${O("D")}`,f.winPct>w.winPct,w.winPct>f.winPct)}
        ${$(t("cmp.winRate"),f.winPct+"%",w.winPct+"%",f.winPct>w.winPct,w.winPct>f.winPct)}
        ${$(t("cmp.matchesPlayed"),f.matches,w.matches,!1,!1)}
        ${$(t("cmp.uniqueOpp"),f.opponents,w.opponents,f.opponents>w.opponents,w.opponents>f.opponents)}
        ${$(t("cmp.avgOppRating"),f.avgOpp.toFixed(1),w.avgOpp.toFixed(1),f.avgOpp>w.avgOpp,w.avgOpp>f.avgOpp)}
        ${$(t("cmp.h2h"),`${b.w}${O("W")} \u2013 ${b.l}${O("L")} \u2013 ${b.d}${O("D")}`,`${b.l}${O("W")} \u2013 ${b.w}${O("L")} \u2013 ${b.d}${O("D")}`,b.w>b.l,b.l>b.w)}
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.prevMeetings")} <span class="n">${tp("cmp.meetings",r.length)}</span></h3>
      <div class="match-list">
        ${r.map(y=>`
          <div class="match-row">
            <div class="res-chip ${y.res}">${O(y.res)}</div>
            <div class="who">${h(m)}</div>
            <div class="score mono">${y.fa} \u2013 ${y.fb}</div>
            <div class="who opp"><a href="#/player/${G(c)}" style="color:var(--blue)">${h(c)}</a></div>
            <div class="date mono" title="${Ye(y.date)}">${se(y.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("cmp.neverMet")}</div>`}
      </div>
      <div class="caption" style="margin-top:12px">${t("cmp.legacyNote")}</div>
    </div>`;let q=()=>{let y=d("#cmp-a").dataset.value,T=d("#cmp-b").dataset.value,_="#/compare/"+G(y)+"/"+G(T);location.hash!==_&&(qe=!0,location.hash=_),tt(y,T)};Ge("cmp-a",q),Ge("cmp-b",q),d("#cmp-swap").addEventListener("click",()=>{let y=d("#cmp-a"),T=d("#cmp-b"),_=y.dataset.value;y.dataset.value=T.dataset.value,T.dataset.value=_,q()}),d("#cmp-copy").addEventListener("click",()=>{let y=location.href.split("#")[0]+"#/compare/"+G(m)+"/"+G(c),T=()=>{d("#cmp-copy-msg").textContent=t("cmp.linkCopied")};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(y).then(T,()=>{d("#cmp-copy-msg").textContent=y}):d("#cmp-copy-msg").textContent=y})}var qe=!1;function Ct(e){let s=B[e],n=d("#page-player");if(!s){n.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("pl.notFound",{name:h(e)})}</div></div></div>`;return}let i=F.find(c=>c.name===e),o=Ne(e),u=o.slice(0,10),g=ct(e),m=Math.max(3,Math.min(100,100-s.rd/120*100));n.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">${t("pl.back")}</a>
    <div class="player-hero anim">
      <div class="player-top">
        ${i?$e(i.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${h(s.name)}</div>
          <div class="player-rankline">
            ${i?t("pl.rankedOf",{rank:i.rank,total:F.length}):t("pl.unranked")}
            ${s.provisional?` \xB7 <span class="tag prov">${t("tag.provisional")}</span>`:""}
            ${s.inactive?` \xB7 <span class="tag inact">${t("tag.inactive")}</span>`:""}
          </div>
        </div>
        <div class="player-rating-block">
          <div class="lbl">${s.provisional?t("pl.estRange"):t("pl.visible")}</div>
          <div class="big mono${s.provisional?" prov-range":""}" id="pv-rating">${s.provisional?ve(s):"0"}</div>
          ${Ae(s)}
          <div class="rd-bar">
            <div class="bar-track"><div class="bar-fill" style="width:${m}%"></div></div>
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
      <h3>${t("pl.recentForm")} <span class="n">${t("pl.lastN",{n:Math.min(10,o.length)})}</span></h3>
      <div class="form-strip">
        ${u.map((c,f)=>`<div class="form-pill ${c.res}" style="animation-delay:${f*55}ms"
           title="${t("pl.vsOpp",{opp:h(c.opp)})} ${c.for_}-${c.against}">${O(c.res)}</div>`).join("")||`<span class="empty">${t("pl.noGames")}</span>`}
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.matchHistory")} <span class="n">${tp("pl.nGames",o.length)}</span></h3>
      <div class="match-list">
        ${o.map(c=>`
          <div class="match-row">
            <div class="res-chip ${c.res}">${O(c.res)}</div>
            <div class="who">${h(s.name)}</div>
            <div class="score mono">${c.for_} \u2013 ${c.against}</div>
            <div class="who opp"><a href="#/player/${G(c.opp)}" style="color:var(--blue)">${h(c.opp)}</a></div>
            <div class="date mono" title="${Ye(c.date)}">${se(c.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.h2h")} <span class="n">${tp("pl.nOpponents",g.length)}</span></h3>
      <div class="h2h-grid">
        ${g.map(c=>`
          <div class="h2h-card" data-goto="${h(c.opp)}">
            <div class="opp">${h(c.opp)}</div>
            <div class="rec mono"><span class="w">${c.w}${O("W")}</span> \xB7 <span class="l">${c.l}${O("L")}</span> \xB7 <span>${c.d}${O("D")}</span> \xB7 ${t("pl.pts",{pf:c.pf,pa:c.pa})}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>
  </div>`,s.provisional||Oe(d("#pv-rating"),s.rating,{dec:1,dur:900}),xe()}function Nt(){et();let e=d("#gm-body"),s=W();d("#gm-count").textContent=tp("gm.count",s.length),e.innerHTML=s.map(n=>{let i=n.sa>n.sb,o=n.sb>n.sa;return`
    <div class="gm-row">
      <div class="side ${i?"winner":"loser"}">
        <div class="dot ${i?"w":"l"}"></div>
        <div class="nm" data-goto="${h(n.a)}">${h(n.a)}</div>
      </div>
      <div class="sc mono" style="color:${i?"var(--green)":"var(--red)"}">${n.sa}</div>
      <div class="dash mono">\u2013</div>
      <div class="sc mono" style="color:${o?"var(--green)":"var(--red)"}">${n.sb}</div>
      <div class="side right ${o?"winner":"loser"}">
        <div class="dot ${o?"w":"l"}"></div>
        <div class="nm" data-goto="${h(n.b)}">${h(n.b)}</div>
      </div>
      <div class="dt mono">${n.admin&&!n.published?`<span class="tag fresh">${t("tag.new")}</span>`:se(n.date)||t("misc.historical")}</div>
    </div>`}).join("")}function At(){let e=Y.players.filter(s=>s.provisional).sort((s,n)=>n.rating-s.rating);d("#roster-grid").innerHTML=e.map(s=>{let n=Math.min(100,Math.round(Math.min(1,s.matches/5)*50+Math.min(1,s.opponents/3)*50));return`
    <div class="roster-card reveal" data-goto="${h(s.name)}">
      <div class="top">
        <div class="nm">${h(s.name)}</div>
        <svg class="shield" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"/></svg>
      </div>
      <div class="rating"><span class="unit">${t("roster.estRange")}</span><span class="big prov-range">${ve(s)}</span></div>
      <div class="req-row"><span>${t("roster.matches")}</span><span class="${s.matches>=5?"ok":""}">${s.matches} / 5 ${s.matches>=5?"\u2713":""}</span></div>
      <div class="req-row"><span>${t("roster.opponents")}</span><span class="${s.opponents>=3?"ok":""}">${s.opponents} / 3 ${s.opponents>=3?"\u2713":""}</span></div>
      <div class="prog-track"><div class="prog-fill" data-w="${n}"></div></div>
      <div class="prog-label">${t("roster.progress",{pct:n})}</div>
    </div>`}).join(""),requestAnimationFrame(()=>N("#roster-grid .prog-fill").forEach(s=>{s.style.width=s.dataset.w+"%"}))}function jt(){let e=Y.players,s=F.slice().sort((v,$)=>$.winPct-v.winPct).slice(0,10),n=e.slice().sort((v,$)=>$.matches-v.matches).slice(0,10),i=[];W().forEach(v=>{let $=B[v.a],M=B[v.b];if(!$||!M)return;let q=$.rating-M.rating;if(v.sa===v.sb)return;let y=v.sa>v.sb?v.a:v.b,T=Math.abs(q);(q<0&&y===v.a||q>0&&y===v.b)&&i.push({winner:y,loser:y===v.a?v.b:v.a,gap:T,score:y===v.a?`${v.sa}-${v.sb}`:`${v.sb}-${v.sa}`})}),i.sort((v,$)=>$.gap-v.gap);let o={};W().forEach(v=>{let $=[v.a,v.b].sort().join(" vs ");o[$]=(o[$]||0)+1});let u=Object.entries(o).sort((v,$)=>$[1]-v[1]).slice(0,10),g=e.map(v=>v.rating),m=Math.min(...g),c=Math.max(...g),f=8,w=(c-m)/f||1,k=Array.from({length:f},()=>0);g.forEach(v=>{k[Math.min(f-1,Math.max(0,Math.floor((v-m)/w)))]++});let E=Math.max(...k,1),L=k.map((v,$)=>{let M=Math.round((m+$*w)/10)*10,q=Math.round((m+($+1)*w)/10)*10;return`
    <div class="hcol" title="${tp("an.histTip",v,{lo:M,hi:q})}">
      <div class="hbar" data-h="${Math.round(v/E*100)}"></div>
      <div class="hlbl">${M}\u2013${q}</div>
    </div>`}).join(""),a=e.slice().sort((v,$)=>$.opponents-v.opponents).slice(0,8),l=Math.max(...a.map(v=>v.opponents),1),p=a.map(v=>`
    <div class="mrow reveal" data-goto="${h(v.name)}">
      <div class="nm">${h(v.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(v.opponents/l*100)}"></div></div>
      <div class="val mono">${v.opponents}</div>
    </div>`).join(""),r=(v,$,M)=>v.map((q,y)=>`
    <div class="an-row reveal" data-goto="${h(q.name)}">
      <div class="idx mono">${y+1}</div>
      <div class="nm">${h(q.name)}</div>
      <div class="val mono">${$(q)}</div>
      <div class="unit mono">${M(q)}</div>
    </div>`).join(""),b=v=>tp("an.nMatches",v.matches);d("#an-grid").innerHTML=`
    <div class="an-panel">
      <div class="head"><h3>${t("an.topWinRate")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${r(s,v=>v.winPct+"%",b)}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.mostActive")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/></svg>
      </div>
      ${r(n,v=>v.matches,v=>t("an.matchesUnit"))}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.biggestUpsets")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${i.length?i.slice(0,8).map((v,$)=>`
        <div class="an-row reveal" data-goto="${h(v.winner)}">
          <div class="idx mono">${$+1}</div>
          <div class="nm">${h(v.winner)} <span style="color:var(--dimmer);font-weight:500">${t("an.def")}</span> ${h(v.loser)}</div>
          <div class="val mono">${v.score}</div>
          <div class="unit mono">${t("an.plusPts",{n:Math.round(v.gap)})}</div>
        </div>`).join(""):`<div class="empty">${t("an.noUpsets")}</div>`}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.rivalries")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${u.map(([v,$],M)=>`
        <div class="an-row reveal">
          <div class="idx mono">${M+1}</div>
          <div class="nm">${v.split(" vs ").map(h).join(` <span style="color:var(--dimmer);font-weight:500">${t("vs")}</span> `)}</div>
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
    </div>`;let x=()=>{N("#an-grid .hbar").forEach(v=>{v.style.height=v.dataset.h+"%"}),N("#an-grid .abar").forEach(v=>{v.style.width=v.dataset.w+"%"})};requestAnimationFrame(x),setTimeout(x,140),xe()}function Pt(){d("#settings-body").innerHTML=Pe().map(e=>`
    <tr><td><b>${h(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${h(e.desc)}</div></td>
        <td class="val">${h(String(e.value))}</td></tr>`).join("")}function It(){return Array.from({length:11},(e,s)=>({q:t("faq.q"+(s+1)),a:t("faq.a"+(s+1))}))}function be(){let e=H().faq;return Array.isArray(e)&&e.length?e:It()}function Ft(){d("#faq-list").innerHTML=be().map((e,s)=>`
    <div class="faq-item reveal" data-faq="${s}">
      <button class="faq-q" aria-expanded="false">
        <span>${h(String(e.q||""))}</span>
        <svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="faq-a"><div class="faq-a-in">${h(String(e.a||""))}</div></div>
    </div>`).join(""),xe()}document.addEventListener("click",e=>{let s=e.target.closest(".faq-q");if(!s)return;let n=s.closest(".faq-item"),i=n.classList.contains("open");N(".faq-item.open").forEach(o=>{o.classList.remove("open"),o.querySelector(".faq-q").setAttribute("aria-expanded","false")}),i||(n.classList.add("open"),s.setAttribute("aria-expanded","true"))});function I(){let e=d("#admin-wrap");if(!ut()){e.innerHTML=`
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
    </div>`;let a=async()=>{let l=d("#admin-pw").value;try{let p=await fetch(gt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:l})});if(p.ok){let r=await p.json().catch(()=>({}));ft(r.token||l,d("#admin-remember").checked),I(),S("Welcome back, commander.");return}if(p.status===429){S("Too many attempts \u2014 wait a few minutes.");return}}catch{}d("#admin-pw").style.borderColor="var(--red)",S("Wrong password.")};d("#admin-auth").addEventListener("click",a),d("#admin-pw").addEventListener("keydown",l=>{l.key==="Enter"&&a()});return}let n=Z(),i=Ke().length,o=H(),u='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',g=Object.entries(o.aliases).map(([a,l])=>`
    <div class="log-item">
      <div class="txt"><b>${h(a)}</b> \u2192 <b>${h(l)}</b>${o.aliasNotes&&o.aliasNotes[a]?` <span style="color:var(--dimmer)">\u2014 ${h(o.aliasNotes[a])}</span>`:""}</div>
      <button class="icon-btn" data-alias-del="${h(a)}" title="Remove name fix">${u}</button>
    </div>`).join("")||'<div class="empty">No name fixes yet.</div>',m=o.inactive.map(a=>`
    <div class="log-item">
      <div class="txt"><b>${h(a)}</b> <span style="color:var(--dimmer)">\u2014 inactive</span></div>
      <button class="icon-btn" data-inact-del="${h(a)}" title="Mark active again">${u}</button>
    </div>`).join("")||'<div class="empty">Nobody marked inactive.</div>',c=Object.keys({...o.seeds||{},...o.seedGlicko||{},...o.seedRd||{}}).map(a=>`
    <div class="log-item">
      <div class="txt"><b>${h(a)}</b> \xB7 <span style="color:var(--dimmer)">old</span> <b class="mono">${h(String((o.seeds||{})[a]!=null?(o.seeds||{})[a]:"\u2014"))}</b>${(o.seedGlicko||{})[a]!=null?` \xB7 <span style="color:var(--dimmer)">glicko</span> <b class="mono">${h(String(o.seedGlicko[a]))}</b>`:""}${(o.seedRd||{})[a]!=null?` \xB7 <span style="color:var(--dimmer)">rd</span> <b class="mono">${h(String(o.seedRd[a]))}</b>`:""}</div>
      <button class="icon-btn" data-seed-del="${h(a)}" title="Remove seed">${u}</button>
    </div>`).join("")||'<div class="empty">No seed overrides \u2014 players start from the sheet values.</div>',f=Pe().map(a=>`
    <div class="set-row">
      <div class="lbl"><b>${h(a.name)}</b><div class="d">${h(String(a.desc||""))}</div></div>
      <input class="set-val mono" data-set-name="${h(a.name)}" value="${h(String(a.value))}">
    </div>`).join(""),w=a=>{let l=(a||"").trim().toLowerCase();return W().filter(r=>!l||r.a.toLowerCase().includes(l)||r.b.toLowerCase().includes(l)).slice(0,20).map(r=>`
      <div class="log-item fix-row" data-mkey="${r.key}">
        <div class="txt"><b>${h(r.a)}</b> <span style="color:var(--dimmer)">vs</span> <b>${h(r.b)}</b>${r.date?"":' <span class="tag legacy">legacy</span>'}</div>
        <input class="mono" data-f="sa" type="number" min="0" value="${r.sa}" title="Score 1">
        <input class="mono" data-f="sb" type="number" min="0" value="${r.sb}" title="Score 2">
        <input data-f="date" type="date" value="${r.date||""}" title="Match date">
        <button class="icon-btn" data-msave="${r.key}" title="Save fix"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-mdel="${r.key}" title="Delete match">${u}</button>
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
      <h3>Pending <span class="n">log</span> \u2014 ${n.length} local \xB7 ${i} published</h3>
      <div class="log-list" id="adm-list">
        ${n.length?n.map((a,l)=>`
          <div class="log-item">
            <div class="txt"><b>${h(a.a)}</b> ${a.sa}\u2013${a.sb} <b>${h(a.b)}</b></div>
            <div class="txt" style="color:var(--dimmer)">${h(a.date||"")}</div>
            <button class="icon-btn" data-del="${l}" title="Remove">
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
      <div class="log-list" id="ov-inact-list" style="margin-top:12px">${m}</div>
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
      <div class="log-list" id="ov-seed-list" style="margin-top:12px">${c}</div>
    </div>

    <div class="panel" style="margin:0">
      <h3>Model <span class="n">settings</span></h3>
      <div id="ov-settings">${f}</div>
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

  <datalist id="player-list">${Y.players.map(a=>`<option value="${h(a.name)}">`).join("")}</datalist>`,d("#admin-lock").addEventListener("click",()=>{ht(),I()}),d("#admin-publish").addEventListener("click",()=>k()),d("#admin-sync").addEventListener("click",async()=>{let a=d("#admin-sync"),l=d("#admin-sync-status");a.disabled=!0,l.textContent="syncing\u2026";try{let p=await fetch(bt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:le()})}),r=await p.json().catch(()=>({}));p.ok&&r.ok?(l.textContent=r.changed?`synced \u2713 ${r.matches} matches / ${r.players} players`:"already up to date \u2713",S(r.changed?"Sheet synced \u2014 the live site was updated.":"Site already matches the sheet.")):p.status===429?(l.textContent="rate limited",S("Too many attempts \u2014 wait a few minutes.")):(l.textContent="sync failed",S("Sync failed: "+(r.error||p.status)))}catch{l.textContent="network error",S("Sync failed (network).")}a.disabled=!1});async function k(a){let l=!!(a&&a.silent),p=le()||(l?"":(window.prompt("Admin password:")||"").trim());if(!p){S(l?'Saved here \u2014 auto-publish needs a stored password. Use "Publish to everyone".':"Publish cancelled.");return}Me=!0;let r=H(),b={},x=[];for(let[M,q]of Object.entries(r.matchEdits||{}))M.startsWith("a:")&&(b[M]=q);for(let M of r.matchRemoved||[])M.startsWith("a:")&&x.push(M);let v=W().filter(M=>M.admin).map(M=>({a:M.a,b:M.b,sa:M.sa,sb:M.sb,date:M.date||""})),$={matches:v,aliases:r.aliases||{},aliasNotes:r.aliasNotes||{},aliasRemoved:r.aliasRemoved||[],inactive:r.inactive||[],seeds:r.seeds||{},seedGlicko:r.seedGlicko||{},seedRd:r.seedRd||{},seedRemoved:r.seedRemoved||[],settings:r.settings||{},matchEdits:b,matchRemoved:x,faq:r.faq!=null?r.faq:[]};try{let M=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:p,doc:$,message:`Publish match log (${v.length} matches)`})}),q=await M.json().catch(()=>({}));if(!M.ok||!q.ok){M.status===403&&sessionStorage.removeItem(K),S("Publish failed: "+(q.error||"HTTP "+M.status));return}window.LB_PUB=$,window.LB_LOG=v,ne([]),j({}),A(),l||I(),S(l?"Saved \u2014 live for everyone \u2713":"Published! Everyone sees it on their next visit.")}catch{S("Publish failed: network error.")}finally{Me=!1}}d("#admin-export").addEventListener("click",()=>{let a=new Blob([JSON.stringify(Z(),null,2)],{type:"application/json"}),l=document.createElement("a");l.href=URL.createObjectURL(a),l.download="match-log.json",l.click(),URL.revokeObjectURL(l.href),S("Log exported.")}),d("#adm-add").addEventListener("click",()=>{let a=d("#adm-a").value.trim(),l=d("#adm-b").value.trim(),p=parseInt(d("#adm-sa").value,10),r=parseInt(d("#adm-sb").value,10);if(!a||!l||a.toLowerCase()===l.toLowerCase()||!Number.isFinite(p)||!Number.isFinite(r)){S("Fill in both players and scores.");return}let b=Z();b.unshift({a,b:l,sa:p,sb:r,date:d("#adm-date")?d("#adm-date").value||new Date().toISOString().slice(0,10):new Date().toISOString().slice(0,10)}),ne(b),A(),I(),S(`${a} ${p}\u2013${r} ${l} added \u2014 site recalculated live.`)}),d("#adm-list").addEventListener("click",a=>{let l=a.target.closest("[data-del]");if(!l)return;let p=Z();p.splice(parseInt(l.dataset.del,10),1),ne(p),A(),I()}),d("#ov-alias-add").addEventListener("click",()=>{let a=d("#ov-alias-a").value.trim(),l=d("#ov-alias-b").value.trim(),p=(d("#ov-alias-note")||{}).value.trim();if(!a||!l){S("Fill both: the wrong name and the correct player.");return}let r=Object.keys(B).find(x=>x.toLowerCase()===l.toLowerCase())||l,b=P();j({...b,aliases:{...b.aliases||{},[a]:r},aliasNotes:p?{...b.aliasNotes||{},[a]:p}:b.aliasNotes||{},aliasRemoved:(b.aliasRemoved||[]).filter(x=>x!==a)}),A(),I(),S(`Name fix saved \u2014 "${a}" now counts as ${r}.`)}),d("#ov-alias-list").addEventListener("click",a=>{let l=a.target.closest("[data-alias-del]");if(!l)return;let p=l.dataset.aliasDel,r=P(),b={...r.aliases||{}},x={...r.aliasNotes||{}};delete b[p],delete x[p],j({...r,aliases:b,aliasNotes:x,aliasRemoved:[...new Set([...r.aliasRemoved||[],p])]}),A(),I(),S("Name fix removed.")}),d("#ov-inact-toggle").addEventListener("click",()=>{let a=d("#ov-inact-n").value.trim();if(!a){S("Type a player name first.");return}let l=P(),p=H().inactive||[],r=p.includes(a)?p.filter(b=>b!==a):[...p,a];j({...l,inactive:r}),A(),I(),S(r.includes(a)?`${a} marked inactive.`:`${a} marked active again.`)}),d("#ov-inact-list").addEventListener("click",a=>{let l=a.target.closest("[data-inact-del]");if(!l)return;let p=P();j({...p,inactive:(H().inactive||[]).filter(r=>r!==l.dataset.inactDel)}),A(),I()}),d("#ov-seed-add").addEventListener("click",()=>{let a=d("#ov-seed-n").value.trim(),l=d("#ov-seed-v").value.trim(),p=d("#ov-seed-g").value.trim(),r=d("#ov-seed-rd").value.trim();if(!a){S("Pick a player first.");return}if(l===""&&p===""&&r===""){S("Enter an Old 0\u2013100 rating, or a Starting Glicko / RD.");return}let b=P(),x={...b.seeds||{}},v={...b.seedGlicko||{}},$={...b.seedRd||{}};l!==""&&Number.isFinite(Number(l))?x[a]=Number(l):delete x[a],p!==""&&Number.isFinite(Number(p))?v[a]=Number(p):delete v[a],r!==""&&Number.isFinite(Number(r))?$[a]=Number(r):delete $[a],j({...b,seeds:x,seedGlicko:v,seedRd:$,seedRemoved:(b.seedRemoved||[]).filter(M=>M!==a)}),A(),I(),S(`Seed saved for ${a}.`)}),d("#ov-seed-list").addEventListener("click",a=>{let l=a.target.closest("[data-seed-del]");if(!l)return;let p=l.dataset.seedDel,r=P(),b={...r.seeds||{}};delete b[p];let x={...r.seedGlicko||{}};delete x[p];let v={...r.seedRd||{}};delete v[p],j({...r,seeds:b,seedGlicko:x,seedRd:v,seedRemoved:[...new Set([...r.seedRemoved||[],p])]}),A(),I()}),d("#ov-settings").addEventListener("change",a=>{let l=a.target.closest("[data-set-name]");if(!l)return;let p=P();j({...p,settings:{...p.settings||{},[l.dataset.setName]:l.value}}),A(),I(),S("Setting applied \u2014 everything recalculated.")}),d("#ov-set-reset").addEventListener("click",()=>{let a=P();j({...a,settings:{}}),A(),I(),S("Settings back to the master sheet values.")}),d("#ov-mq").addEventListener("input",()=>{d("#ov-mresults").innerHTML=w(d("#ov-mq").value)}),d("#ov-mresults").addEventListener("click",a=>{let l=a.target.closest("[data-msave]"),p=a.target.closest("[data-mdel]");if(l){let r=l.closest("[data-mkey]"),b=r.dataset.mkey,x=$=>r.querySelector(`[data-f="${$}"]`).value,v=P();j({...v,matchEdits:{...v.matchEdits||{},[b]:{sa:+x("sa"),sb:+x("sb"),date:x("date")}}}),A(),d("#ov-mresults").innerHTML=w(d("#ov-mq").value),S("Match fixed \u2014 ratings recalculated.")}else if(p){let r=p.dataset.mdel,b=P();j({...b,matchRemoved:[...new Set([...b.matchRemoved||[],r])]}),A(),d("#ov-mresults").innerHTML=w(d("#ov-mq").value),S("Match deleted \u2014 ratings recalculated.")}}),d("#pl-add").addEventListener("click",()=>{let a=d("#pl-name").value.trim(),l=d("#pl-opp").value.trim(),p=parseInt(d("#pl-sa").value,10),r=parseInt(d("#pl-sb").value,10);if(!a||!l||a.toLowerCase()===l.toLowerCase()||!Number.isFinite(p)||!Number.isFinite(r)){S("A player needs a name, an opponent and both scores \u2014 at least 1 result.");return}if(B[U(a)]){S(`${a} already exists \u2014 log a match for them instead.`);return}let b=Z();b.unshift({a,b:l,sa:p,sb:r,date:(d("#pl-date")||{}).value||new Date().toISOString().slice(0,10)}),ne(b);let x=(d("#pl-seed")||{}).value.trim();if(x!==""&&Number.isFinite(Number(x))){let v=P();j({...v,seeds:{...v.seeds||{},[U(a)]:Number(x)},seedRemoved:(v.seedRemoved||[]).filter($=>$!==U(a))})}A(),I(),S(`${a} added with their first result \u2014 ${p}\u2013${r} vs ${l}.`)}),d("#pl-del-btn").addEventListener("click",()=>{let a=d("#pl-del").value.trim(),l=U(a),p=W().filter(y=>y.a===l||y.b===l);if(!p.length){S(`No player called "${a}" with matches found.`);return}if(!window.confirm(`Remove ${l} and ${p.length} match${p.length===1?"":"es"}? This recalculates every rating.`))return;let r=P(),b=[...r.matchRemoved||[]],x=[];p.forEach(y=>{y.key.startsWith("l:")?x.push(parseInt(y.key.slice(2),10)):b.push(y.key)});let v=Z();x.sort((y,T)=>T-y).forEach(y=>v.splice(y,1)),ne(v);let $={...r.seeds||{}},M={...r.seedGlicko||{}},q={...r.seedRd||{}};delete $[l],delete M[l],delete q[l],j({...r,matchRemoved:[...new Set(b)],seeds:$,seedGlicko:M,seedRd:q,seedRemoved:[...new Set([...r.seedRemoved||[],l])],inactive:(H().inactive||[]).filter(y=>y!==l)}),A(),I(),S(`${l} removed with ${p.length} match${p.length===1?"":"es"}. Publish to make it public.`)});let E=()=>{let a=be();d("#faq-admin-list").innerHTML=a.map((l,p)=>`
      <div class="log-item fix-row" data-faq-idx="${p}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${h(String(l.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${h(String(l.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${p}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${p}" title="Delete question">${u}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};E(),d("#faq-admin-list").addEventListener("click",a=>{let l=a.target.closest("[data-faq-save]"),p=a.target.closest("[data-faq-del]"),r=be().map(x=>({...x}));if(l){let x=l.closest("[data-faq-idx]");r[parseInt(l.dataset.faqSave,10)]={q:x.querySelector('[data-fq="q"]').value.trim(),a:x.querySelector('[data-fq="a"]').value.trim()}}else if(p)r.splice(parseInt(p.dataset.faqDel,10),1);else return;let b=P();j({...b,faq:r}),E(),S("Q&A updated \u2014 publish to make it public.")}),d("#faq-add").addEventListener("click",()=>{let a=d("#faq-new-q").value.trim(),l=d("#faq-new-a").value.trim();if(!a||!l){S("Fill in both the question and the answer.");return}let p=P();j({...p,faq:[...be().map(r=>({...r})),{q:a,a:l}]}),E(),S("Question added.")}),d("#faq-reset").addEventListener("click",()=>{let a=P();j({...a,faq:null}),E(),S("Q&A back to the built-in list.")}),window._fbTimer&&(clearInterval(window._fbTimer),window._fbTimer=null);async function L(){let a=d("#fb-inbox");if(!a||document.querySelector("#fb-inbox [data-fb-reply]:focus"))return;let l=le();if(!l){a.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let p=await fetch(Q+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:l})}),r=await p.json().catch(()=>({}));if(!p.ok||!r.ok){a.innerHTML=`<div class="empty">Could not load messages (${h(r.error||"HTTP "+p.status)}).</div>`;return}let b=r.items||[],x={};a.querySelectorAll("[data-fb-id]").forEach(v=>{let $=v.querySelector("[data-fb-reply]");$&&$.value&&(x[v.dataset.fbId]=$.value)}),a.innerHTML=b.map(v=>`
        <div class="log-item fb-row${v.resolved?" fb-done":""}" data-fb-id="${h(v.id)}" data-fb-resolved="${v.resolved?"1":""}">
          <div class="txt">
            <b>${h(v.name||"Anonymous")}</b>${v.contact?` <span style="color:var(--dimmer)">\xB7 ${h(v.contact)}</span>`:""}
            <span class="mono" style="color:var(--dimmer);font-size:11px;margin-left:6px">ticket ${h(v.id)}</span>
            ${v.resolved?'<span class="tag resolved" style="margin-left:6px">resolved \u2713</span>':`<span class="tag ${v.status==="replied"?"live":"fresh"}" style="margin-left:6px">${h(v.status)}</span>`}
            <div style="color:var(--dim);font-size:13px;margin-top:4px">${h(v.message)}</div>
            ${v.reply?`<div style="color:var(--gold);font-size:12.5px;margin-top:4px">\u21A9 ${h(v.reply)}</div>`:""}
          </div>
          <input class="set-val fb-reply-in" data-fb-reply placeholder="Write a reply\u2026" value="${h(v.reply||"")}">
          <button class="icon-btn" data-fb-send title="Send reply"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-resolve title="${v.resolved?"Reopen \u2014 mark as not resolved":"Mark as resolved"}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.6L16 9.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-del title="Delete message">${u}</button>
        </div>`).join("")||'<div class="empty">No messages yet.</div>',a.querySelectorAll("[data-fb-id]").forEach(v=>{let $=v.querySelector("[data-fb-reply]");$&&x[v.dataset.fbId]!=null&&($.value=x[v.dataset.fbId])})}catch{a.innerHTML='<div class="empty">Network error loading messages.</div>'}}L(),d("#fb-refresh").addEventListener("click",()=>{L(),S("Inbox refreshed.")}),window._fbTimer=setInterval(()=>{if(!d("#fb-inbox")){clearInterval(window._fbTimer),window._fbTimer=null;return}document.hidden||L()},2e3),d("#fb-inbox").addEventListener("click",async a=>{let l=a.target.closest("[data-fb-send]"),p=a.target.closest("[data-fb-del]"),r=a.target.closest("[data-fb-resolve]");if(!l&&!p&&!r)return;let b=a.target.closest("[data-fb-id]"),x=b.dataset.fbId,v=le();try{if(r){let $=b.dataset.fbResolved!=="1";if(!(await fetch(Q+"/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:v,id:x,resolved:$})}).then(q=>q.json())).ok){S("Could not update \u2014 try again.");return}S($?"Marked as resolved \u2713":"Message reopened."),L()}else if(l){let $=b.querySelector("[data-fb-reply]").value;if(!(await fetch(Q+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:v,id:x,reply:$})}).then(q=>q.json())).ok){S("Reply failed.");return}S("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(Q+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:v,id:x})}).then(M=>M.json())).ok){S("Delete failed.");return}b.remove(),S("Message deleted.")}}catch{S("Network error.")}})}var pe=document.getElementById("fl-cards");pe&&window.matchMedia("(hover: hover)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(pe.addEventListener("pointermove",e=>{let s=e.target.closest&&e.target.closest(".fl-card");if(!s)return;let n=s.getBoundingClientRect(),i=(e.clientX-n.left)/n.width-.5,o=(e.clientY-n.top)/n.height-.5;s.classList.add("tilt"),s.style.transform=`perspective(1000px) rotateY(${(i*7).toFixed(2)}deg) rotateX(${(-o*6).toFixed(2)}deg) translateY(-6px)`}),pe.addEventListener("pointerleave",()=>{pe.querySelectorAll(".fl-card").forEach(e=>{e.style.transform="",e.classList.remove("tilt")})}));d("#search").addEventListener("input",e=>{let s=e.target.value.trim().toLowerCase(),n=d("#search-drop");if(!s){n.classList.remove("show");return}let i=Y.players.filter(o=>o.name.toLowerCase().includes(s)).slice(0,8);if(!i.length){n.classList.remove("show");return}n.innerHTML=i.map(o=>`
    <a class="drop-row" href="#/player/${G(o.name)}">
      ${o.rank?$e(o.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${h(o.name)}</span>        <span class="mono" style="margin-left:auto;color:var(--dim)">${ye(o,!0)}</span>
    </a>`).join(""),n.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||d("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(d("#search-drop").classList.remove("show"),d("#search").value="")});var Q=we.replace(/\/publish$/,"/feedback"),Le="tt1v1_fb_tickets";function Dt(){try{return JSON.parse(localStorage.getItem(Le)||"[]")}catch{return[]}}function _t(e){let s=Dt();s.push({id:e,ts:Date.now()});try{localStorage.setItem(Le,JSON.stringify(s.slice(-20)))}catch{}}function Bt(){let e=d("#fb-overlay"),s=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>d("#fb-msg").focus(),180)},n=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};d("#fab-feedback").addEventListener("click",s),d("#fb-close").addEventListener("click",n),d("#fb-done").addEventListener("click",n),e.addEventListener("click",c=>{c.target===e&&n()}),document.addEventListener("keydown",c=>{c.key==="Escape"&&e.classList.contains("show")&&n()});let i=d("#faq-feedback-btn");i&&i.addEventListener("click",s);let o=d("#fb-msg"),u=d("#fb-count-n");o.addEventListener("input",()=>{u.textContent=String(o.value.length);try{localStorage.setItem("tt1v1_fb_draft",o.value)}catch{}});try{let c=localStorage.getItem("tt1v1_fb_draft");c&&(o.value=c,u.textContent=String(c.length))}catch{}let g=d("#fb-send");g.addEventListener("click",async()=>{let c=o.value.trim();if(c.length<5){o.focus(),o.classList.add("fb-nudge"),setTimeout(()=>o.classList.remove("fb-nudge"),500),S(t("fb.writeFirst"));return}g.classList.add("busy"),g.disabled=!0;try{let f=await fetch(Q,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:d("#fb-name").value.trim(),contact:d("#fb-contact").value.trim(),message:c})}),w=await f.json().catch(()=>({}));if(!f.ok||!w.ok){S(t("fb.couldNotSend",{err:w.error||"HTTP "+f.status}));return}_t(w.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}d("#fb-ticket-code").textContent=w.id,d("#fb-view-form").hidden=!0,d("#fb-view-done").hidden=!1}catch{S(t("fb.netError"))}finally{g.classList.remove("busy"),g.disabled=!1}});let m=document.querySelector(".fb-ticket");m&&m.addEventListener("click",async()=>{let c=(d("#fb-ticket-code").textContent||"").trim();if(!c||c==="\u2014")return;try{await navigator.clipboard.writeText(c)}catch{let k=document.createElement("textarea");k.value=c,document.body.appendChild(k),k.select();try{document.execCommand("copy")}catch{}k.remove()}let f=d("#fb-copied");f&&(f.classList.add("show"),clearTimeout(window._fbCopiedT),window._fbCopiedT=setTimeout(()=>f.classList.remove("show"),1800)),S(t("fb.ticketCopied"))}),d("#fb-check").addEventListener("click",async()=>{let c=d("#fb-ticket-in").value.trim(),f=d("#fb-reply-out");if(c){f.classList.add("show"),f.textContent=t("fb.checking");try{let w=await fetch(Q+"/status?id="+encodeURIComponent(c)),k=await w.json().catch(()=>({}));if(!w.ok||!k.ok){f.textContent=t("fb.noTicket");return}f.innerHTML=k.resolved?`${t("fb.statusResolved")}${k.reply?`<br>${t("fb.replyFrom",{reply:h(k.reply)})}`:""}`:k.reply?t("fb.replyFrom",{reply:h(k.reply)}):t("fb.statusPending",{status:h(k.status)})}catch{f.textContent=t("fb.netErrorShort")}}})}function Ht(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let s=null,n=()=>{e.classList.remove("show"),s=null};document.addEventListener("mouseover",i=>{let o=i.target.closest&&i.target.closest("[title],[data-tip]");if(!o)return;o.hasAttribute("title")&&(o.setAttribute("data-tip",o.getAttribute("title")),o.removeAttribute("title"));let u=o.getAttribute("data-tip");if(!u)return;s=o,e.textContent=u;let g=o.getBoundingClientRect(),m=g.top<52;e.classList.toggle("below",m),e.style.left=Math.max(10,Math.min(window.innerWidth-10,g.left+g.width/2))+"px",e.style.top=(m?g.bottom+8:g.top-8)+"px",e.classList.add("show")}),document.addEventListener("mouseout",i=>{if(!s)return;let o=i.relatedTarget;o&&o.closest&&o.closest("[title],[data-tip]")===s||n()}),window.addEventListener("scroll",n,{passive:!0}),document.addEventListener("mousedown",n,{passive:!0})}var We;function S(e){let s=d("#toast");s.textContent=e,s.classList.add("show"),clearTimeout(We),We=setTimeout(()=>s.classList.remove("show"),2600)}var ie;function xe(){ie&&ie.disconnect(),ie=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&(s.target.classList.add("in"),N(".cu",s.target).forEach(n=>Oe(n,parseFloat(n.dataset.target),{dec:parseInt(n.dataset.dec||0)})),ie.unobserve(s.target))})},{threshold:.12}),N(".reveal").forEach(e=>ie.observe(e))}(function(){let s=d("#scroll-progress"),n=d("#to-top"),i=d("#page-home .hero-row"),o=document.querySelector(".topbar"),u=()=>{let g=window.scrollY,m=document.documentElement.scrollHeight-window.innerHeight;s&&(s.style.width=(m>0?g/m*100:0)+"%"),n&&n.classList.toggle("show",g>640),o&&o.classList.toggle("scrolled",g>10),i&&g<1400&&(i.style.transform=`translateY(${g*.14}px)`,i.style.opacity=String(Math.max(.3,1-g/950)))};window.addEventListener("scroll",u,{passive:!0}),n&&n.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),u()})();A();Ie();ke();Bt();Ht();window.addEventListener("lb-lang",()=>{let e=window.scrollY,s=V,n={...C};ke(),d("#page-home").classList.contains("active")&&(s!=="all"||n.key!=="rank"||n.dir!==1)&&(V=s,C=n,N(".chip[data-filter]").forEach(i=>i.classList.toggle("on",i.dataset.filter===s)),Fe(),te(s,n.key,n.dir)),De(),window.scrollTo(0,e)});function me(e,s){let n=e.indexOf("window."+s);if(n<0)return null;let i=e.indexOf("=",n);for(;i<e.length&&"{[".indexOf(e[i])<0;)i++;let o=0,u=!1,g="",m=!1;for(let c=i;c<e.length;c++){let f=e[c];if(u){m?m=!1:f==="\\"?m=!0:f===g&&(u=!1);continue}if(f==='"'||f==="'"){u=!0,g=f;continue}if(f==="{"||f==="[")o++;else if((f==="}"||f==="]")&&(o--,o<=0))return JSON.parse(e.slice(i,c+1))}return null}async function Se(e){try{let s="cb="+Date.now(),[n,i]=await Promise.all([fetch("data.js?"+s,{cache:"no-store"}),fetch("log.js?"+s,{cache:"no-store"})]);if(!n.ok||!i.ok)throw new Error("HTTP "+n.status+"/"+i.status);let o=await n.text(),u=await i.text(),g=me(o,"LB_DATA"),m=me(u,"LB_PUB")||(me(u,"LB_LOG")?{matches:me(u,"LB_LOG")}:null),c=[];if(g&&JSON.stringify(g)!==JSON.stringify(D)&&(D=g,window.LB_DATA=g,c.push("data")),m&&JSON.stringify(m)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=m,window.LB_LOG=m.matches||[],c.push("log")),c.length){A(),Ie(),ke();let f=d("#last-updated");f&&(f.textContent=t("home.lastUpdated",{when:se(D.generated)||"today"}))}e&&S(c.length?t("misc.refreshed"):t("misc.upToDate"))}catch{e&&S(t("misc.refreshFailed"))}}Se(!1);var ue=d("#lb-refresh-btn");ue&&ue.addEventListener("click",async()=>{ue.classList.add("spinning"),await Se(!0),setTimeout(()=>ue.classList.remove("spinning"),400)});setInterval(()=>Se(!1),6e4);document.addEventListener("visibilitychange",()=>{document.hidden||Se(!1)});var st="tt1v1_fb_seen",z=null;function Ut(){try{return JSON.parse(localStorage.getItem(Le)||"[]")}catch{return[]}}function at(){try{return JSON.parse(localStorage.getItem(st)||"{}")||{}}catch{return{}}}function Gt(){let e=d("#fab-feedback");if(e&&!e.querySelector(".fb-dot")){let n=document.createElement("span");n.className="fb-dot",e.appendChild(n),requestAnimationFrame(()=>n.classList.add("in"))}let s=d("#fb-view-form");if(s&&!d("#fb-reply-banner")&&z){let n=document.createElement("div");n.id="fb-reply-banner",n.innerHTML=`${t("fb.teamReplied",{id:h(z.id)})}
      <div class="r">${h(z.reply)}</div>
      <button class="btn btn-ghost" id="fb-got-it" style="margin-top:9px;padding:6px 13px">${t("fb.gotIt")}</button>`,s.insertAdjacentElement("beforebegin",n),requestAnimationFrame(()=>n.classList.add("show")),d("#fb-got-it").addEventListener("click",Wt)}}function Wt(){if(z){let n=at();n[z.id]=1;try{localStorage.setItem(st,JSON.stringify(n))}catch{}z=null}let e=d(".fb-dot");e&&(e.classList.add("out"),setTimeout(()=>e.remove(),420));let s=d("#fb-reply-banner");s&&(s.classList.remove("show"),setTimeout(()=>s.remove(),420))}async function nt(){let e=at();z=null;let s=Ut(),n=s.slice(0,Math.max(0,s.length-6)),i=[];for(let o of s.slice(-6))try{let u=await fetch(Q+"/status?id="+encodeURIComponent(o.id),{cache:"no-store"}),g=await u.json().catch(()=>({}));if(u.status===404||u.ok&&g.ok===!1)continue;i.push(o),u.ok&&g.ok&&g.reply&&!e[o.id]&&!z&&(z={id:o.id,reply:g.reply})}catch{i.push(o)}if(i.length!==s.slice(-6).length)try{localStorage.setItem(Le,JSON.stringify([...n,...i]))}catch{}z&&Gt()}setTimeout(nt,3500);setInterval(nt,9e4);})();
