/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var j=window.LB_DATA,we="https://tierstats-publish.tierstats.workers.dev/publish",c=(e,s=document)=>s.querySelector(e),A=(e,s=document)=>[...s.querySelectorAll(e)],g=e=>String(e).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),W=e=>encodeURIComponent(String(e)),Be=e=>decodeURIComponent(e);function Oe(e,s,n={}){let i=n.dur||1200,l=n.dec||0,u=performance.now(),w=parseFloat(e.textContent)||0;function m(r){let f=Math.min(1,(r-u)/i),$=1-Math.pow(1-f,3);e.textContent=(w+(s-w)*$).toFixed(l),f<1&&requestAnimationFrame(m)}requestAnimationFrame(m),setTimeout(()=>{e.textContent=s.toFixed(l)},i+300)}var it='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',ot='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function $e(e,s=""){let n=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",i=e<=3?e===1?it:ot:"";return`<div class="rank-badge ${n} ${s}" title="${t("home.rankTip",{n:e})}">${i}<span class="num">${e}</span></div>`}var O=e=>t(e==="W"?"rec.wLetter":e==="L"?"rec.lLetter":"rec.dLetter"),H={},B=[],Y={players:[],byName:{},qualified:[]},oe={},fe={},X={},Ee=new Set,_e="tt1v1_baseline",Ce={prevRatings:{},prevRanks:{}};function lt(){let e=j.baselineEpoch||"default",s=null;try{s=JSON.parse(localStorage.getItem(_e)||"null")}catch{s=null}if(!s||typeof s!="object"||s.epoch!==e){s={epoch:e,prevRatings:j.prevRatings||{},prevRanks:j.prevRanks||{}};try{localStorage.setItem(_e,JSON.stringify(s))}catch{}}Ce={prevRatings:{...j.prevRatings||{},...s.prevRatings||{}},prevRanks:{...j.prevRanks||{},...s.prevRanks||{}}}}function rt(){for(let n in oe)delete oe[n];let e=new Set(U().aliasRemoved||[]);Object.entries(j.aliases).forEach(([n,i])=>{e.has(n)||(oe[n.toLowerCase()]=i)}),Object.entries(U().aliases||{}).forEach(([n,i])=>{oe[String(n).toLowerCase()]=i});for(let n of Object.keys(fe))delete fe[n];for(let n of Object.keys(X))delete X[n];Ee.clear();let s=(n,i)=>{Object.keys(n||{}).forEach(l=>{let u=_(l);u!==l&&(i[u]=n[l])}),Object.keys(n||{}).forEach(l=>{let u=_(l);u===l&&(i[u]=n[l])})};s(j.seeds,fe),s(Ce.prevRatings,X),(j.inactiveList||[]).forEach(n=>Ee.add(_(n)))}var _=e=>{let s=String(e).trim(),n=new Set;for(;;){let i=oe[s.toLowerCase()];if(!i||i===s||n.has(s))return s;n.add(s),s=i}};function Ne(e){let s=[];return J().forEach(n=>{let i=(l,u,w)=>({opp:l,for_:u,against:w,res:u>w?"W":u<w?"L":"D",date:n.date});n.a===e?s.push(i(n.b,n.sa,n.sb)):n.b===e&&s.push(i(n.a,n.sb,n.sa))}),s}function ct(e){let s={};return Ne(e).forEach(n=>{let i=s[n.opp]||(s[n.opp]={w:0,l:0,d:0,pf:0,pa:0});i[n.res.toLowerCase()]+=1,i.pf+=n.for_,i.pa+=n.against}),Object.entries(s).map(([n,i])=>({opp:n,...i})).sort((n,i)=>i.w+i.l+i.d-(n.w+n.l+n.d)||i.w-n.w)}function dt(e){let s=H[e]||{};return s.provisional?`<span class="tag prov">${t("tag.provisional")}</span>`:s.inactive?`<span class="tag inact">${t("tag.inactive")}</span>`:""}function vt(e){let s=Ne(e).slice(0,5).reverse();if(!s.length)return"";let n=s.map(i=>O(i.res)).join(" ");return`<span class="form" title="${t("form.title",{n:s.length,seq:n})}">${s.map(i=>`<i class="${i.res.toLowerCase()}">${O(i.res)}</i>`).join("")}</span>`}function Je(){let e=typeof getLang=="function"?getLang():"en";return{en:"en-US",zh:"zh-CN",ja:"ja-JP",ru:"ru-RU"}[e]||"en-US"}function ze(e){let s=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||"").slice(0,10));return s?new Date(+s[1],+s[2]-1,+s[3]):null}function se(e){let s=ze(e);if(!s)return"";let n=s.getFullYear()===new Date().getFullYear();try{return new Intl.DateTimeFormat(Je(),n?{month:"short",day:"numeric"}:{year:"numeric",month:"short",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Ye(e){let s=ze(e);if(!s)return"";try{return new Intl.DateTimeFormat(Je(),{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Ae(e){let s=e.delta!=null?e.delta:0;if(Math.abs(s)<.05)return"";let n=s>0,i=Math.abs(s).toFixed(1);return`<span class="delta ${n?"up":"down"}" title="${n?t("delta.upTitle",{n:i}):t("delta.downTitle",{n:i})}">${n?"\u25B2":"\u25BC"} ${i}</span>`}function pt(){let e=Ce.prevRanks||{},s=Object.keys(e);if(s.length){let l={};return s.forEach(u=>{l[_(u)]=e[u]}),l}let n={};B.forEach(l=>{X[l.name]!=null&&(n[l.name]=X[l.name])});let i={};return Object.entries(n).sort((l,u)=>u[1]-l[1]).forEach(([l],u)=>{i[l]=u+1}),i}function mt(e,s){let n=s[e.name]!=null?s[e.name]:s[_(e.name)];if(n==null){let l=(j.newSince||{})[e.name];return!l||(Date.now()-Date.parse(l))/864e5>5?"":`<span class="mv new" title="${t("mv.newTitle")}">${t("mv.new")}</span>`}let i=n-e.rank;return i>0?`<span class="mv up" title="${tp("mv.up",i)}">\u25B2${i}</span>`:i<0?`<span class="mv down" title="${tp("mv.down",-i)}">\u25BC${-i}</span>`:""}function ve(e){return`${Math.round(e.rating-100)} \u2013 ${Math.round(e.rating+100)}`}function ye(e,s){if(!e.provisional)return e.rating.toFixed(1);let n=s?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:ve(e);return`<span class="prov-range" title="${t("rating.provTitle")}">${n}</span>`}var Qe="tt1v1_admin_log_v1",ee="tt1v1_admin_ok",K="tt1v1_admin_pw",ut=()=>sessionStorage.getItem(ee)==="1"||localStorage.getItem(ee)==="1",le=()=>sessionStorage.getItem(K)||localStorage.getItem(K)||"";function ft(e,s){s?(localStorage.setItem(ee,"1"),localStorage.setItem(K,e)):(sessionStorage.setItem(ee,"1"),sessionStorage.setItem(K,e),localStorage.removeItem(ee),localStorage.removeItem(K))}function ht(){[sessionStorage,localStorage].forEach(e=>{e.removeItem(ee),e.removeItem(K)})}var He=null,Me=!1;function Ve(){Me||!le()||(clearTimeout(He),He=setTimeout(()=>publishLog({silent:!0}),1500))}var gt=we.replace(/\/publish$/,"/verify"),bt=we.replace(/\/publish$/,"/sync");function V(){try{return JSON.parse(localStorage.getItem(Qe)||"[]")}catch{return[]}}function ne(e){try{localStorage.setItem(Qe,JSON.stringify(e))}catch{}Ve()}var Ze="tt1v1_admin_over_v1";function F(){try{return JSON.parse(localStorage.getItem(Ze)||"{}")||{}}catch{return{}}}function I(e){try{localStorage.setItem(Ze,JSON.stringify(e))}catch{}Ve()}function U(){let e=window.LB_PUB||{},s=F(),n=new Set([...e.aliasRemoved||[],...s.aliasRemoved||[]]),i=new Set([...e.seedRemoved||[],...s.seedRemoved||[]]),l=s.aliases||{},u={...s.seeds||{},...s.seedGlicko||{},...s.seedRd||{}},w=S=>Object.fromEntries(Object.entries(S||{}).filter(([o])=>!n.has(o)||l[o]!=null)),m=S=>Object.fromEntries(Object.entries(S||{}).filter(([o])=>!i.has(o)||u[o]!=null)),r=w({...e.aliases||{},...s.aliases||{}}),f=w({...e.aliasNotes||{},...s.aliasNotes||{}}),$=m({...e.seeds||{},...s.seeds||{}}),L=m({...e.seedGlicko||{},...s.seedGlicko||{}}),M=m({...e.seedRd||{},...s.seedRd||{}});return{aliases:r,aliasNotes:f,seeds:$,seedGlicko:L,seedRd:M,aliasRemoved:[...n].filter(S=>r[S]==null),seedRemoved:[...i].filter(S=>$[S]==null&&L[S]==null&&M[S]==null),settings:{...e.settings||{},...s.settings||{}},matchEdits:{...e.matchEdits||{},...s.matchEdits||{}},inactive:s.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...s.matchRemoved||[]])],faq:s.faq!=null?s.faq:e.faq!=null?e.faq:null}}function Ke(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function J(){let e=U(),s=e.matchEdits||{},n=new Set(e.matchRemoved||[]),i=(L,M)=>{if(n.has(M))return null;let S=s[M],o=S?{...L,sa:S.sa,sb:S.sb,date:S.date!=null?S.date:L.date}:L;return{...o,a:_(o.a),b:_(o.b),sa:+o.sa,sb:+o.sb,key:M}},l=V().map((L,M)=>i({...L,admin:!0,published:!1},"l:"+M)).filter(Boolean),u=Ke().map((L,M)=>i({...L,admin:!0,published:!0},"p:"+M)).filter(Boolean),w=j.matches.map((L,M)=>i({...L,admin:!1,published:!1},"a:"+M)).filter(Boolean).reverse(),m=L=>{let M=L.a>L.b;return[M?L.b:L.a,M?L.a:L.b,M?L.sb:L.sa,M?L.sa:L.sb,L.date||""].join("|")},r={};w.forEach(L=>{let M=m(L);r[M]=(r[M]||0)+1});let f={};return l.concat(u).filter(L=>{let M=m(L);return f[M]=(f[M]||0)+1,f[M]>(r[M]||0)}).concat(w)}var q={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},he=864e5,de=Math.log(10)/400,Xe=e=>1/Math.sqrt(1+3*de*de*e*e/(Math.PI*Math.PI)),Re=(e,s,n)=>1/(1+Math.pow(10,-Xe(n)*(e-s)/400));function yt(e){let s=U().seeds||{};return s[e]!=null&&s[e]!==""?Number(s[e]):fe[e]}function wt(e){let s=(U().seedGlicko||{})[e],n=(U().seedRd||{})[e],i=s!=null&&s!==""?Number(s):null,l=n!=null&&n!==""?Number(n):null;if(i!=null||l!=null)return[i??q.unratedR,l??q.unratedRd];let u=yt(e);return u!=null?[Math.max(q.seedMid+(u-q.oldMid)*q.ptsPer,q.minSeed),q.knownRd]:[q.unratedR,q.unratedRd]}function Ue(e,s,n){let i=0,l=0;for(let[w,m,r]of n){let f=Xe(m),$=Re(e,w,m);i+=f*f*$*(1-$),l+=f*(r-$)}if(i*=de*de,i<=0)return[e,s];let u=1/(s*s)+i;return[e+de/u*l,Math.sqrt(1/u)]}function $t(e,s){let n=Math.pow(10,s),i=e*n,l=Math.floor(i);return Math.abs(i-l-.5)<1e-6?(l+1)/n:Math.round(i)/n}var je=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(q.periodDays*he)),re=je(q.graceStart),kt={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function Pe(){let e=U().settings||{};return(j.settings||[]).map(s=>({...s,value:Object.prototype.hasOwnProperty.call(e,s.name)?e[s.name]:s.value}))}function Lt(){for(let e of Pe()){let s=kt[e.name];if(!s)continue;if(s==="graceStart"){let i=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(i)&&(q.graceStart=i);continue}let n=Number(e.value);Number.isFinite(n)&&(q[s]=n)}re=je(q.graceStart),A(".cons-val").forEach(e=>{e.textContent=String(q.conservative)}),A(".min-matches-val").forEach(e=>{e.textContent=String(q.minMatches)}),A(".min-opp-val").forEach(e=>{e.textContent=String(q.minOpp)})}function xt(){Lt(),rt();let e={},s=a=>{if(!e[a]){let[d,y]=wt(a);e[a]={name:a,r:d,rd:y,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[a]},n=(a,d,y,k,h,T)=>{let C=s(a);C.games++,C.opps.add(d),y>k?C.w++:y<k?C.l++:C.d++,C.lastIdx=T,h&&(C.lastDate=h)},i={};for(let a of J()){if(a.date)continue;let d=a.a,y=a.b,k=a.sa>a.sb?1:a.sa<a.sb?0:.5;(i[d]=i[d]||[]).push([y,k]),(i[y]=i[y]||[]).push([d,1-k]),n(d,y,a.sa,a.sb,"",re),n(y,d,a.sb,a.sa,"",re)}let l={};for(let a in i)l[a]=[s(a).r,s(a).rd];for(let a in i){let[d,y]=Ue(l[a][0],l[a][1],i[a].map(([k,h])=>[l[k][0],l[k][1],h]));s(a).r=d,s(a).rd=y}let u=new Map;for(let a of J().filter(d=>d.date).slice().reverse()){let d=a.date,y=je(d);u.has(y)||u.set(y,[]),u.get(y).push({a:_(a.a),b:_(a.b),sa:+a.sa,sb:+a.sb,date:d})}for(let a of[...u.keys()].sort((d,y)=>d-y)){for(let k in e){let h=e[k],T=a-(h.lastIdx==null?re:h.lastIdx);T>0&&(h.rd=Math.min(Math.sqrt(h.rd*h.rd+q.growth*q.growth*T),q.maxRd))}let d={};for(let k of u.get(a)){let h=k.sa>k.sb?1:k.sa<k.sb?0:.5;(d[k.a]=d[k.a]||[]).push([k.b,h]),(d[k.b]=d[k.b]||[]).push([k.a,1-h]),n(k.a,k.b,k.sa,k.sb,k.date,a),n(k.b,k.a,k.sb,k.sa,k.date,a)}let y={};for(let k in d)y[k]=[s(k).r,s(k).rd];for(let k in d){let[h,T]=Ue(y[k][0],y[k][1],d[k].map(([C,G])=>[y[C][0],y[C][1],G]));s(k).r=h,s(k).rd=T}}let w=Object.values(e).map(a=>({name:a.name,glicko:a.r,rd:a.rd,rating:a.r-q.conservative*a.rd,matches:a.games,w:a.w,l:a.l,d:a.d,winPct:a.games?$t(a.w/a.games*100,1):0,opponents:a.opps.size,avgOpp:0,lastMatch:a.lastDate||"",provisional:!(a.games>=q.minMatches&&a.opps.size>=q.minOpp),inactive:!1})),m={};w.forEach(a=>{m[a.name]=a.glicko}),w.forEach(a=>{let d=0;e[a.name].opps.forEach(y=>{d+=m[y]!=null?m[y]:q.unratedR}),a.avgOpp=e[a.name].opps.size?d/e[a.name].opps.size:0});let r=Date.now(),f=Math.floor(r/(q.periodDays*he));for(let a in e){let d=e[a],y=f-(d.lastIdx==null?re:d.lastIdx);y>0&&(d.rd=Math.min(Math.sqrt(d.rd*d.rd+q.growth*q.growth*y),q.maxRd))}w.forEach(a=>{a.glicko=e[a.name].r,a.rd=e[a.name].rd,a.rating=a.glicko-q.conservative*a.rd;let d=X[a.name],y=(j.curRatings||{})[a.name];a.delta=d!=null?(y??a.rating)-d:0});let $=Date.parse(q.graceStart+"T00:00:00Z")+q.graceDays*he,L=new Set([...Ee,...U().inactive||[]]);w.forEach(a=>{a.inactive=L.has(a.name)||(a.lastMatch?r-Date.parse(a.lastMatch+"T00:00:00Z")>q.inactiveDays*he:r>$)});let M={},S={};(j.players||[]).forEach((a,d)=>{let y=_(a.name);M[y]=a,S[y]=d});let o={};w.forEach(a=>{o[a.name]=a}),w.forEach(a=>{let d=M[a.name];d&&(a.rating=d.rating,a.glicko=d.glicko,a.rd=d.rd,a.matches=d.matches,a.w=d.w,a.l=d.l,a.d=d.d,a.winPct=d.winPct,a.opponents=d.opponents,a.avgOpp=d.avgOpp,d.lastMatch&&(a.lastMatch=d.lastMatch))});let v=[];(j.qualified||[]).forEach(a=>{let d=o[_(a.name)];d&&(d.provisional=!1,d.rank=a.rank!=null?a.rank:v.length+1,v.push(d))});let b=new Set(v.map(a=>a.name)),p=w.filter(a=>!b.has(a.name)&&!a.provisional&&!a.inactive).sort((a,d)=>d.rating-a.rating);p.forEach((a,d)=>{a.rank=v.length+d+1});let x=v.concat(p);w.sort((a,d)=>d.rating-a.rating||(S[a.name]!=null?S[a.name]:1e9)-(S[d.name]!=null?S[d.name]:1e9));let R={};return w.forEach(a=>{R[a.name]=a}),{players:w,byName:R,qualified:x}}function P(){lt(),Y=xt(),H=Y.byName,B=Y.qualified}var St=["page-home","page-player","page-compare","page-matches","page-roster","page-analytics","page-method","page-faq","page-admin"];function ke(){if(qe){qe=!1;return}let e=location.hash||"#/";St.forEach(l=>c("#"+l).classList.remove("active"));let s="#/"+(e.split("/")[1]||"");A(".nav a, .foot-nav a").forEach(l=>{let u=l.getAttribute("href");l.classList.toggle("active",u===s||e==="#/"&&u==="#/")});let n=c("#nav-glide"),i=document.querySelector(".nav a.active");if(n&&i&&i.offsetWidth>0?(n.style.width=i.offsetWidth+"px",n.style.transform=`translateX(${i.offsetLeft}px)`,n.style.opacity="1"):n&&(n.style.opacity="0"),e==="#/compare"||e.startsWith("#/compare/")){let l=e.split("/").slice(2).map(Be);tt(l[0]||"",l[1]||""),c("#page-compare").classList.add("active"),window.scrollTo(0,0)}else e.startsWith("#/player/")?(Ct(Be(e.slice(9))),c("#page-player").classList.add("active"),window.scrollTo({top:0,behavior:"instant"in window?"instant":"auto"})):e==="#/matches"?(Nt(),c("#page-matches").classList.add("active"),window.scrollTo(0,0)):e==="#/roster"?(At(),c("#page-roster").classList.add("active"),window.scrollTo(0,0)):e==="#/analytics"?(jt(),c("#page-analytics").classList.add("active"),window.scrollTo(0,0)):e==="#/method"?(Pt(),c("#page-method").classList.add("active"),window.scrollTo(0,0)):e==="#/faq"?(Ft(),c("#page-faq").classList.add("active"),window.scrollTo(0,0)):e==="#/admin"?(D(),c("#page-admin").classList.add("active"),window.scrollTo(0,0)):(Ie(),c("#page-home").classList.add("active"),requestAnimationFrame(qt));xe()}window.addEventListener("hashchange",ke);function Ie(){Q="all",N={key:"rank",dir:1},A(".chip[data-filter]").forEach(m=>m.classList.toggle("on",m.dataset.filter==="all")),Fe();let e=J().length,s=Y.players.length,n=B[0],i=Math.round(B.reduce((m,r)=>m+r.rd,0)/B.length),l=c("#hero-chip-matches");l&&(l.innerHTML=t("home.chipMatches",{n:e})),c("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">${t("stat.ranked")}</div>
      <div class="v"><span class="cu" data-target="${B.length}">0</span><small>${t("stat.ofTotal",{n:s})}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.matches")}</div>
      <div class="v"><span class="cu" data-target="${e}">0</span></div></div>
    <div class="stat-card"><div class="k">${t("stat.highest")}</div>
      <div class="v"><span class="cu" data-target="${n.rating}" data-dec="1">0</span><small>${g(n.name)}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.avgRd")}</div>
      <div class="v"><span class="cu" data-target="${i}" data-dec="1">0</span><small>${t("stat.certainty")}</small></div></div>`;let u=[B[1],B[0],B[2]].filter(Boolean);c("#fl-cards").innerHTML=u.map(m=>`
    <div class="fl-card r${m.rank}${m.rank===1?" champ":""} reveal" data-goto="${g(m.name)}">
      <div class="fl-top">
        ${$e(m.rank)}
        <div class="rd">RD ${m.rd.toFixed(0)}</div>
      </div>
      ${m.rank===1?`<div class="champ-tag">${t("home.champTag")}</div>`:""}
      <div class="nm">${g(m.name)}</div>
      <div class="rating">
        <span class="unit">${t("home.ratingUnit")}</span>
        <div class="big-row"><span class="big">${Math.round(m.rating)}</span>${Ae(m)}</div>
      </div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${m.winPct>=60?"":m.winPct>=40?"mid":"low"}" data-w="${m.winPct}"></div></div>
      </div>
      <div class="meta">
        <span><span class="w">${m.w}${O("W")}</span> <span class="l">${m.l}${O("L")}</span> ${m.d}${O("D")}</span>
        <span class="wc">${m.winPct.toFixed(1)}%</span>
        <span class="opp">${t("home.avgOpp",{n:m.avgOpp.toFixed(1)})}</span>
      </div>
    </div>`).join(""),requestAnimationFrame(()=>{A("#fl-cards .bar-fill").forEach(m=>{m.style.width=m.dataset.w+"%"})}),te(),et();let w=c("#last-updated");w&&(w.textContent=t("home.lastUpdated",{when:se(j.generated)||"today"}))}function et(){let e=J().filter(s=>s.date).slice(0,10);c("#battles-grid").innerHTML=e.length?e.map(s=>{let n=s.sa>s.sb,i=s.sb>s.sa;return`
    <div class="battle-row reveal" data-goto="${g(n?s.a:s.b)}">
      <div class="who ${n?"win":"lose"}" data-goto="${g(s.a)}">${g(s.a)}</div>
      <div class="vs">${t("vs")}</div>
      <div class="who r ${i?"win":"lose"}" data-goto="${g(s.b)}">${g(s.b)}</div>
      <div class="sc mono"><span class="${n?"win":"lose"}">${s.sa}</span> \u2013 <span class="${i?"win":"lose"}">${s.sb}</span></div>
      <div class="dt">${se(s.date)||(s.admin&&!s.published?t("battles.justNow"):t("misc.historical"))}</div>
    </div>`}).join(""):`<div class="empty" style="padding:26px;text-align:center;color:var(--dim);grid-column:1/-1">${t("battles.empty")}</div>`}var Et=500,Mt="cubic-bezier(.22,.8,.24,1)",Rt=12;function Tt(e,s){matchMedia("(prefers-reduced-motion: reduce)").matches||A(".lb-row",e).forEach((n,i)=>{let l=s.get(n.dataset.name);if(l===void 0||typeof n.animate!="function")return;let u=l-n.getBoundingClientRect().top;Math.abs(u)<=1||n.animate([{transform:`translateY(${u}px)`},{transform:"none"}],{duration:Et,easing:Mt,delay:Math.min(i*Rt,220),fill:"backwards"})})}function te(e="all",s="rank",n=1){let i=c("#lb-body"),u=(e==="all"&&ge?B:Y.players).slice().map(r=>({...r,rank:r.rank!=null?r.rank:9999}));Te&&(u=u.filter(r=>r.name.toLowerCase().includes(Te))),e==="provisional"?u=u.filter(r=>(H[r.name]||{}).provisional):e==="inactive"?u=u.filter(r=>(H[r.name]||{}).inactive):e==="veterans"?u=u.filter(r=>r.matches>=15):e==="rising"&&(u=u.filter(r=>r.winPct>=60&&r.matches>=5)),u.sort((r,f)=>{let $=r[s],L=f[s];return(typeof $=="string"?$.localeCompare(L):$-L)*n});let w=new Map;A(".lb-row",i).forEach(r=>w.set(r.dataset.name,r.getBoundingClientRect().top));let m=pt();i.innerHTML=u.map(r=>`
    <div class="lb-row ${r.rank<=3?"top"+r.rank:""}" data-name="${g(r.name)}" data-goto="${g(r.name)}">
      <div class="rank">${r.rank<=B.length?$e(r.rank,"sm")+mt(r,m):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="pname">${g(r.name)}</div></div>
      <div class="rating-cell mono">${Ae(r)}${ye(r,!0)}</div>
      <div class="num-cell mono col-hide">${r.rd.toFixed(1)}</div>
      <div class="num-cell mono col-hide">${r.matches}</div>
      <div class="num-cell mono col-hide"><span class="w">${r.w}</span></div>
      <div class="num-cell mono col-hide"><span class="l">${r.l}</span></div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${r.winPct>=60?"":r.winPct>=40?"mid":"low"}" data-w="${r.winPct}"></div></div>
        <div class="pct mono">${r.winPct.toFixed(1)}%</div>
      </div>
      <div class="num-cell mono col-hide">${r.opponents}</div>
      <div class="num-cell mono col-hide">${r.avgOpp.toFixed(1)}</div>
      <div class="col-status">${dt(r.name)||vt(r.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?t("lb.emptyInactive"):e==="provisional"?t("lb.emptyProv"):t("lb.emptyNone")}</div>`,Tt(i,w),requestAnimationFrame(()=>{A(".bar-fill",i).forEach(r=>{r.style.width=r.dataset.w+"%"})})}var Q="all",N={key:"rank",dir:1},Te="",ge=!0;function Fe(){A(".sortable").forEach(s=>s.classList.remove("sorted","asc"));let e=c(`.sortable[data-key="${N.key}"]`);e&&(e.classList.add("sorted"),N.dir===1&&e.classList.add("asc"))}function qt(){A("#stat-strip .cu").forEach(e=>Oe(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),A(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}c("#lb-qual").addEventListener("click",()=>{ge=!ge,c("#lb-qual").classList.toggle("on",ge),te(Q,N.key,N.dir)});c("#lb-filter").addEventListener("input",e=>{Te=e.target.value.trim().toLowerCase(),te(Q,N.key,N.dir)});var ce=c("#theme-toggle");function De(){if(!ce)return;let e=document.documentElement.dataset.theme==="light",s=e?t("top.toDark"):t("top.toLight");ce.setAttribute("aria-pressed",String(e)),ce.setAttribute("aria-label",s),ce.title=s}ce.addEventListener("click",()=>{let s=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=s;try{localStorage.setItem("tt1v1_theme",s)}catch{}De()});De();document.addEventListener("click",e=>{let s=e.target.closest(".chip");if(s&&s.dataset.filter){A(".chip[data-filter]").forEach(l=>l.classList.remove("on")),s.classList.add("on"),Q=s.dataset.filter,te(Q,N.key,N.dir);return}let n=e.target.closest(".sortable");if(n){let l=n.dataset.key;N.key===l&&N.dir===-1?N={key:"rank",dir:1}:N.key===l?N={key:l,dir:-N.dir}:N={key:l,dir:1},Fe(),te(Q,N.key,N.dir);return}let i=e.target.closest("[data-goto]");i&&(e.stopPropagation(),location.hash="#/player/"+W(i.dataset.goto))});function Ot(e){let s=e.slice();for(let n=s.length-1;n>0;n--){let i=Math.floor(Math.random()*(n+1));[s[n],s[i]]=[s[i],s[n]]}return s}function Ge(e,s){let n=document.getElementById(e);if(!n)return;let i=n.querySelector(".pick-btn"),l=n.querySelector(".pick-search"),u=[...n.querySelectorAll(".pick-opt")],w=n.querySelector(".pick-empty"),m=-1,r=()=>u.filter(S=>!S.classList.contains("hide")),f=S=>{let o=r();if(!o.length){m=-1;return}m=(S%o.length+o.length)%o.length,u.forEach(v=>v.classList.remove("hover")),o[m].classList.add("hover"),o[m].scrollIntoView({block:"nearest"})},$=S=>{let o=S.trim().toLowerCase(),v=0;u.forEach(b=>{let p=!o||b.dataset.name.toLowerCase().includes(o);b.classList.toggle("hide",!p),p&&v++}),w.classList.toggle("show",v===0),m=-1,v&&f(0)},L=()=>{document.querySelectorAll(".pick.open").forEach(S=>{if(S!==n){S.classList.remove("open");let o=S.querySelector(".pick-btn");o&&o.setAttribute("aria-expanded","false")}}),n.classList.add("open"),i.setAttribute("aria-expanded","true"),l.value="",$(""),requestAnimationFrame(()=>l.focus())},M=()=>{n.classList.remove("open"),i.setAttribute("aria-expanded","false")};i.addEventListener("click",()=>{n.classList.contains("open")?M():L()}),l.addEventListener("input",()=>$(l.value)),l.addEventListener("keydown",S=>{if(S.key==="ArrowDown")S.preventDefault(),f(m+1);else if(S.key==="ArrowUp")S.preventDefault(),f(m-1);else if(S.key==="Enter"){S.preventDefault();let o=r();o[m]&&o[m].click()}else S.key==="Escape"&&(M(),i.focus())}),u.forEach(S=>{S.addEventListener("click",()=>{n.dataset.value=S.dataset.name,n.querySelector(".pick-cur").textContent=S.dataset.name,M(),s()}),S.addEventListener("mousemove",()=>{let o=r().indexOf(S);o>=0&&o!==m&&(m=o,u.forEach(v=>v.classList.remove("hover")),S.classList.add("hover"))})})}document.addEventListener("click",e=>{document.querySelectorAll(".pick.open").forEach(s=>{if(!s.contains(e.target)){s.classList.remove("open");let n=s.querySelector(".pick-btn");n&&n.setAttribute("aria-expanded","false")}})});function tt(e,s){let n=c("#cmp-wrap"),l=Y.players.slice().sort((h,T)=>(h.rank!=null?h.rank:9999)-(T.rank!=null?T.rank:9999)||h.name.localeCompare(T.name)).map(h=>h.name);if(l.length<2){n.innerHTML=`<div class="empty">${t("cmp.notEnough")}</div>`;return}let u=h=>h[Math.floor(Math.random()*h.length)],w=h=>u(l.filter(T=>T!==h)),m=H[e]?e:u(l),r=H[s]?s:w(m);r===m&&(r=w(m)),(m!==e||r!==s)&&history.replaceState(null,"","#/compare/"+W(m)+"/"+W(r));let f=H[m],$=H[r],L=B.find(h=>h.name===m),M=B.find(h=>h.name===r),S=Re(f.glicko,$.glicko,$.rd),o=Re($.glicko,f.glicko,f.rd),v=Math.round(S/(S+o)*1e3)/10,b=Math.round(1e3-v*10)/10,p=J().filter(h=>h.a===m&&h.b===r||h.a===r&&h.b===m).map(h=>{let T=h.a===m,C=T?h.sa:h.sb,G=T?h.sb:h.sa;return{fa:C,fb:G,res:C>G?"W":C<G?"L":"D",date:h.date}}),x=p.reduce((h,T)=>(T.res==="W"?h.w++:T.res==="L"?h.l++:h.d++,h),{w:0,l:0,d:0}),R=Ot(l),a=(h,T,C)=>`
    <div class="pick" id="${h}" data-value="${g(T)}">
      <button type="button" class="pick-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="${g(C)}">
        <span class="pick-cur">${g(T)}</span>
        <svg class="pick-caret" width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true"><path d="M1.2 1.2 5.5 5.6 9.8 1.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="pick-menu">
        <input class="pick-search" type="text" autocomplete="off" spellcheck="false"
          placeholder="${t("cmp.searchPlaceholder")}" aria-label="${g(C)}">
        <div class="pick-list" role="listbox" aria-label="${g(C)}">
          ${R.map(G=>{let ae=H[G];return`<button type="button" class="pick-opt${G===T?" on":""}" role="option" data-name="${g(G)}" aria-selected="${G===T?"true":"false"}">
              <span class="pick-n">${g(G)}</span>
              <span class="pick-meta mono">${ae&&ae.rating!=null?ae.rating.toFixed(1):""}</span>
            </button>`}).join("")}
          <div class="pick-empty">${t("cmp.noResults")}</div>
        </div>
      </div>
    </div>`,d=(h,T,C,G,ae)=>`
    <div class="cmp-trow">
      <div class="va mono${G?" win":""}">${T}</div>
      <div class="k">${h}</div>
      <div class="vb mono${ae?" win":""}">${C}</div>
    </div>`,y='<span style="color:var(--dimmer)">\u2014</span>';n.innerHTML=`
    <div class="kicker anim">${t("cmp.versus")}</div>
    <h2 class="section-head anim" style="margin:6px 0 2px">${t("cmp.title")}</h2>
    <div class="cmp-pickers anim">
      ${a("cmp-a",m,t("cmp.firstPlayer"))}
      <button class="btn btn-ghost" id="cmp-swap" style="width:auto;margin:0" title="${t("cmp.swap")}">\u21C4</button>
      ${a("cmp-b",r,t("cmp.secondPlayer"))}
    </div>
    <div class="cmp-share anim">
      <button class="btn btn-ghost" id="cmp-copy" style="width:auto;margin:0">${t("cmp.copyLink")}</button>
      <span class="caption" id="cmp-copy-msg"></span>
    </div>

    <div class="cmp-hero anim">
      <div class="cmp-side a">
        <div class="cmp-sub">${L?t("cmp.rankN",{n:L.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${W(m)}">${g(m)}</a></div>
        <div class="cmp-rating mono">${f.provisional?ve(f):f.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",f.matches,{rd:f.rd.toFixed(1)})}</div>
      </div>
      <div class="cmp-vs">
        <div class="vs-mark">${t("cmp.vsMark")}</div>
        <div class="mono" style="font-size:11px;color:var(--dimmer)">${t("cmp.h2hShort",{n:p.length})}</div>
      </div>
      <div class="cmp-side b">
        <div class="cmp-sub">${M?t("cmp.rankN",{n:M.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${W(r)}">${g(r)}</a></div>
        <div class="cmp-rating mono">${$.provisional?ve($):$.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",$.matches,{rd:$.rd.toFixed(1)})}</div>
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.probTitle")} <span class="n">${t("cmp.probSub")}</span></h3>
      <div class="cmp-prob-labels">
        <span style="color:var(--gold)">${g(m)} ${v.toFixed(1)}%</span>
        <span style="color:var(--blue)">${b.toFixed(1)}% ${g(r)}</span>
      </div>
      <div class="cmp-probbar"><i class="pa" style="width:${v}%"></i><i class="pb" style="width:${b}%"></i></div>
      <div class="cmp-prob-note">${t("cmp.probNote")}</div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.tale")}</h3>
      <div class="cmp-table">
        ${d(t("cmp.rating"),ye(f),ye($),!f.provisional&&f.rating>$.rating,!$.provisional&&$.rating>f.rating)}
        ${d(t("cmp.rank"),L?"#"+L.rank:y,M?"#"+M.rank:y,L&&M&&L.rank<M.rank,L&&M&&M.rank<L.rank)}
        ${d(t("cmp.rdUnc"),f.rd.toFixed(1),$.rd.toFixed(1),f.rd<$.rd,$.rd<f.rd)}
        ${d(t("cmp.glicko"),f.glicko.toFixed(1),$.glicko.toFixed(1),f.glicko>$.glicko,$.glicko>f.glicko)}
        ${d(t("cmp.record"),`<span style="color:var(--green)">${f.w}${O("W")}</span> <span style="color:var(--red)">${f.l}${O("L")}</span> ${f.d}${O("D")}`,`<span style="color:var(--green)">${$.w}${O("W")}</span> <span style="color:var(--red)">${$.l}${O("L")}</span> ${$.d}${O("D")}`,f.winPct>$.winPct,$.winPct>f.winPct)}
        ${d(t("cmp.winRate"),f.winPct+"%",$.winPct+"%",f.winPct>$.winPct,$.winPct>f.winPct)}
        ${d(t("cmp.matchesPlayed"),f.matches,$.matches,!1,!1)}
        ${d(t("cmp.uniqueOpp"),f.opponents,$.opponents,f.opponents>$.opponents,$.opponents>f.opponents)}
        ${d(t("cmp.avgOppRating"),f.avgOpp.toFixed(1),$.avgOpp.toFixed(1),f.avgOpp>$.avgOpp,$.avgOpp>f.avgOpp)}
        ${d(t("cmp.h2h"),`${x.w}${O("W")} \u2013 ${x.l}${O("L")} \u2013 ${x.d}${O("D")}`,`${x.l}${O("W")} \u2013 ${x.w}${O("L")} \u2013 ${x.d}${O("D")}`,x.w>x.l,x.l>x.w)}
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.prevMeetings")} <span class="n">${tp("cmp.meetings",p.length)}</span></h3>
      <div class="match-list">
        ${p.map(h=>`
          <div class="match-row">
            <div class="res-chip ${h.res}">${O(h.res)}</div>
            <div class="who">${g(m)}</div>
            <div class="score mono">${h.fa} \u2013 ${h.fb}</div>
            <div class="who opp"><a href="#/player/${W(r)}" style="color:var(--blue)">${g(r)}</a></div>
            <div class="date mono" title="${Ye(h.date)}">${se(h.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("cmp.neverMet")}</div>`}
      </div>
      <div class="caption" style="margin-top:12px">${t("cmp.legacyNote")}</div>
    </div>`;let k=()=>{let h=c("#cmp-a").dataset.value,T=c("#cmp-b").dataset.value,C="#/compare/"+W(h)+"/"+W(T);location.hash!==C&&(qe=!0,location.hash=C),tt(h,T)};Ge("cmp-a",k),Ge("cmp-b",k),c("#cmp-swap").addEventListener("click",()=>{let h=c("#cmp-a"),T=c("#cmp-b"),C=h.dataset.value;h.dataset.value=T.dataset.value,T.dataset.value=C,k()}),c("#cmp-copy").addEventListener("click",()=>{let h=location.href.split("#")[0]+"#/compare/"+W(m)+"/"+W(r),T=()=>{c("#cmp-copy-msg").textContent=t("cmp.linkCopied")};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(h).then(T,()=>{c("#cmp-copy-msg").textContent=h}):c("#cmp-copy-msg").textContent=h})}var qe=!1;function Ct(e){let s=H[e],n=c("#page-player");if(!s){n.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("pl.notFound",{name:g(e)})}</div></div></div>`;return}let i=B.find(r=>r.name===e),l=Ne(e),u=l.slice(0,10),w=ct(e),m=Math.max(3,Math.min(100,100-s.rd/120*100));n.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">${t("pl.back")}</a>
    <div class="player-hero anim">
      <div class="player-top">
        ${i?$e(i.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${g(s.name)}</div>
          <div class="player-rankline">
            ${i?t("pl.rankedOf",{rank:i.rank,total:B.length}):t("pl.unranked")}
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
      <h3>${t("pl.recentForm")} <span class="n">${t("pl.lastN",{n:Math.min(10,l.length)})}</span></h3>
      <div class="form-strip">
        ${u.map((r,f)=>`<div class="form-pill ${r.res}" style="animation-delay:${f*55}ms"
           title="${t("pl.vsOpp",{opp:g(r.opp)})} ${r.for_}-${r.against}">${O(r.res)}</div>`).join("")||`<span class="empty">${t("pl.noGames")}</span>`}
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.matchHistory")} <span class="n">${tp("pl.nGames",l.length)}</span></h3>
      <div class="match-list">
        ${l.map(r=>`
          <div class="match-row">
            <div class="res-chip ${r.res}">${O(r.res)}</div>
            <div class="who">${g(s.name)}</div>
            <div class="score mono">${r.for_} \u2013 ${r.against}</div>
            <div class="who opp"><a href="#/player/${W(r.opp)}" style="color:var(--blue)">${g(r.opp)}</a></div>
            <div class="date mono" title="${Ye(r.date)}">${se(r.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.h2h")} <span class="n">${tp("pl.nOpponents",w.length)}</span></h3>
      <div class="h2h-grid">
        ${w.map(r=>`
          <div class="h2h-card" data-goto="${g(r.opp)}">
            <div class="opp">${g(r.opp)}</div>
            <div class="rec mono"><span class="w">${r.w}${O("W")}</span> \xB7 <span class="l">${r.l}${O("L")}</span> \xB7 <span>${r.d}${O("D")}</span> \xB7 ${t("pl.pts",{pf:r.pf,pa:r.pa})}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>
  </div>`,s.provisional||Oe(c("#pv-rating"),s.rating,{dec:1,dur:900}),xe()}function Nt(){et();let e=c("#gm-body"),s=J();c("#gm-count").textContent=tp("gm.count",s.length),e.innerHTML=s.map(n=>{let i=n.sa>n.sb,l=n.sb>n.sa;return`
    <div class="gm-row">
      <div class="side ${i?"winner":"loser"}">
        <div class="dot ${i?"w":"l"}"></div>
        <div class="nm" data-goto="${g(n.a)}">${g(n.a)}</div>
      </div>
      <div class="sc mono" style="color:${i?"var(--green)":"var(--red)"}">${n.sa}</div>
      <div class="dash mono">\u2013</div>
      <div class="sc mono" style="color:${l?"var(--green)":"var(--red)"}">${n.sb}</div>
      <div class="side right ${l?"winner":"loser"}">
        <div class="dot ${l?"w":"l"}"></div>
        <div class="nm" data-goto="${g(n.b)}">${g(n.b)}</div>
      </div>
      <div class="dt mono">${n.admin&&!n.published?`<span class="tag fresh">${t("tag.new")}</span>`:se(n.date)||t("misc.historical")}</div>
    </div>`}).join("")}function At(){let e=Y.players.filter(s=>s.provisional).sort((s,n)=>n.rating-s.rating);c("#roster-grid").innerHTML=e.map(s=>{let n=Math.min(100,Math.round(Math.min(1,s.matches/5)*50+Math.min(1,s.opponents/3)*50));return`
    <div class="roster-card reveal" data-goto="${g(s.name)}">
      <div class="top">
        <div class="nm">${g(s.name)}</div>
        <svg class="shield" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"/></svg>
      </div>
      <div class="rating"><span class="unit">${t("roster.estRange")}</span><span class="big prov-range">${ve(s)}</span></div>
      <div class="req-row"><span>${t("roster.matches")}</span><span class="${s.matches>=5?"ok":""}">${s.matches} / 5 ${s.matches>=5?"\u2713":""}</span></div>
      <div class="req-row"><span>${t("roster.opponents")}</span><span class="${s.opponents>=3?"ok":""}">${s.opponents} / 3 ${s.opponents>=3?"\u2713":""}</span></div>
      <div class="prog-track"><div class="prog-fill" data-w="${n}"></div></div>
      <div class="prog-label">${t("roster.progress",{pct:n})}</div>
    </div>`}).join(""),requestAnimationFrame(()=>A("#roster-grid .prog-fill").forEach(s=>{s.style.width=s.dataset.w+"%"}))}function jt(){let e=Y.players,s=B.slice().sort((a,d)=>d.winPct-a.winPct).slice(0,10),n=e.slice().sort((a,d)=>d.matches-a.matches).slice(0,10),i=[];J().forEach(a=>{let d=H[a.a],y=H[a.b];if(!d||!y)return;let k=d.rating-y.rating;if(a.sa===a.sb)return;let h=a.sa>a.sb?a.a:a.b,T=Math.abs(k);(k<0&&h===a.a||k>0&&h===a.b)&&i.push({winner:h,loser:h===a.a?a.b:a.a,gap:T,score:h===a.a?`${a.sa}-${a.sb}`:`${a.sb}-${a.sa}`})}),i.sort((a,d)=>d.gap-a.gap);let l={};J().forEach(a=>{let d=[a.a,a.b].sort().join(" vs ");l[d]=(l[d]||0)+1});let u=Object.entries(l).sort((a,d)=>d[1]-a[1]).slice(0,10),w=e.map(a=>a.rating),m=Math.min(...w),r=Math.max(...w),f=8,$=(r-m)/f||1,L=Array.from({length:f},()=>0);w.forEach(a=>{L[Math.min(f-1,Math.max(0,Math.floor((a-m)/$)))]++});let M=Math.max(...L,1),S=L.map((a,d)=>{let y=Math.round((m+d*$)/10)*10,k=Math.round((m+(d+1)*$)/10)*10;return`
    <div class="hcol" title="${tp("an.histTip",a,{lo:y,hi:k})}">
      <div class="hbar" data-h="${Math.round(a/M*100)}"></div>
      <div class="hlbl">${y}\u2013${k}</div>
    </div>`}).join(""),o=e.slice().sort((a,d)=>d.opponents-a.opponents).slice(0,8),v=Math.max(...o.map(a=>a.opponents),1),b=o.map(a=>`
    <div class="mrow reveal" data-goto="${g(a.name)}">
      <div class="nm">${g(a.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(a.opponents/v*100)}"></div></div>
      <div class="val mono">${a.opponents}</div>
    </div>`).join(""),p=(a,d,y)=>a.map((k,h)=>`
    <div class="an-row reveal" data-goto="${g(k.name)}">
      <div class="idx mono">${h+1}</div>
      <div class="nm">${g(k.name)}</div>
      <div class="val mono">${d(k)}</div>
      <div class="unit mono">${y(k)}</div>
    </div>`).join(""),x=a=>tp("an.nMatches",a.matches);c("#an-grid").innerHTML=`
    <div class="an-panel">
      <div class="head"><h3>${t("an.topWinRate")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${p(s,a=>a.winPct+"%",x)}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.mostActive")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/></svg>
      </div>
      ${p(n,a=>a.matches,a=>t("an.matchesUnit"))}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.biggestUpsets")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${i.length?i.slice(0,8).map((a,d)=>`
        <div class="an-row reveal" data-goto="${g(a.winner)}">
          <div class="idx mono">${d+1}</div>
          <div class="nm">${g(a.winner)} <span style="color:var(--dimmer);font-weight:500">${t("an.def")}</span> ${g(a.loser)}</div>
          <div class="val mono">${a.score}</div>
          <div class="unit mono">${t("an.plusPts",{n:Math.round(a.gap)})}</div>
        </div>`).join(""):`<div class="empty">${t("an.noUpsets")}</div>`}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.rivalries")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${u.map(([a,d],y)=>`
        <div class="an-row reveal">
          <div class="idx mono">${y+1}</div>
          <div class="nm">${a.split(" vs ").map(g).join(` <span style="color:var(--dimmer);font-weight:500">${t("vs")}</span> `)}</div>
          <div class="val mono">${d}</div>
          <div class="unit mono">${t("an.meetingsUnit")}</div>
        </div>`).join("")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.ratingDist")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 20V10M10 20V4M16 20v-8M2 20h20" stroke-linecap="round"/></svg>
      </div>
      <div class="hist">${S}</div>
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.uniqueOpp")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v5M12 15v5" stroke-linecap="round"/></svg>
      </div>
      ${b}
    </div>`;let R=()=>{A("#an-grid .hbar").forEach(a=>{a.style.height=a.dataset.h+"%"}),A("#an-grid .abar").forEach(a=>{a.style.width=a.dataset.w+"%"})};requestAnimationFrame(R),setTimeout(R,140),xe()}function Pt(){c("#settings-body").innerHTML=Pe().map(e=>`
    <tr><td><b>${g(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${g(e.desc)}</div></td>
        <td class="val">${g(String(e.value))}</td></tr>`).join("")}function It(){return Array.from({length:11},(e,s)=>({q:t("faq.q"+(s+1)),a:t("faq.a"+(s+1))}))}function be(){let e=U().faq;return Array.isArray(e)&&e.length?e:It()}function Ft(){c("#faq-list").innerHTML=be().map((e,s)=>`
    <div class="faq-item reveal" data-faq="${s}">
      <button class="faq-q" aria-expanded="false">
        <span>${g(String(e.q||""))}</span>
        <svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="faq-a"><div class="faq-a-in">${g(String(e.a||""))}</div></div>
    </div>`).join(""),xe()}document.addEventListener("click",e=>{let s=e.target.closest(".faq-q");if(!s)return;let n=s.closest(".faq-item"),i=n.classList.contains("open");A(".faq-item.open").forEach(l=>{l.classList.remove("open"),l.querySelector(".faq-q").setAttribute("aria-expanded","false")}),i||(n.classList.add("open"),s.setAttribute("aria-expanded","true"))});function D(){let e=c("#admin-wrap");if(!ut()){e.innerHTML=`
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
    </div>`;let o=async()=>{let v=c("#admin-pw").value;try{let b=await fetch(gt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:v})});if(b.ok){let p=await b.json().catch(()=>({}));ft(p.token||v,c("#admin-remember").checked),D(),E("Welcome back, commander.");return}if(b.status===429){E("Too many attempts \u2014 wait a few minutes.");return}}catch{}c("#admin-pw").style.borderColor="var(--red)",E("Wrong password.")};c("#admin-auth").addEventListener("click",o),c("#admin-pw").addEventListener("keydown",v=>{v.key==="Enter"&&o()});return}let n=V(),i=Ke().length,l=U(),u='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',w=Object.entries(l.aliases).map(([o,v])=>`
    <div class="log-item">
      <div class="txt"><b>${g(o)}</b> \u2192 <b>${g(v)}</b>${l.aliasNotes&&l.aliasNotes[o]?` <span style="color:var(--dimmer)">\u2014 ${g(l.aliasNotes[o])}</span>`:""}</div>
      <button class="icon-btn" data-alias-del="${g(o)}" title="Remove name fix">${u}</button>
    </div>`).join("")||'<div class="empty">No name fixes yet.</div>',m=l.inactive.map(o=>`
    <div class="log-item">
      <div class="txt"><b>${g(o)}</b> <span style="color:var(--dimmer)">\u2014 inactive</span></div>
      <button class="icon-btn" data-inact-del="${g(o)}" title="Mark active again">${u}</button>
    </div>`).join("")||'<div class="empty">Nobody marked inactive.</div>',r=Object.keys({...l.seeds||{},...l.seedGlicko||{},...l.seedRd||{}}).map(o=>`
    <div class="log-item">
      <div class="txt"><b>${g(o)}</b> \xB7 <span style="color:var(--dimmer)">old</span> <b class="mono">${g(String((l.seeds||{})[o]!=null?(l.seeds||{})[o]:"\u2014"))}</b>${(l.seedGlicko||{})[o]!=null?` \xB7 <span style="color:var(--dimmer)">glicko</span> <b class="mono">${g(String(l.seedGlicko[o]))}</b>`:""}${(l.seedRd||{})[o]!=null?` \xB7 <span style="color:var(--dimmer)">rd</span> <b class="mono">${g(String(l.seedRd[o]))}</b>`:""}</div>
      <button class="icon-btn" data-seed-del="${g(o)}" title="Remove seed">${u}</button>
    </div>`).join("")||'<div class="empty">No seed overrides \u2014 players start from the sheet values.</div>',f=Pe().map(o=>`
    <div class="set-row">
      <div class="lbl"><b>${g(o.name)}</b><div class="d">${g(String(o.desc||""))}</div></div>
      <input class="set-val mono" data-set-name="${g(o.name)}" value="${g(String(o.value))}">
    </div>`).join(""),$=o=>{let v=(o||"").trim().toLowerCase();return J().filter(p=>!v||p.a.toLowerCase().includes(v)||p.b.toLowerCase().includes(v)).slice(0,20).map(p=>`
      <div class="log-item fix-row" data-mkey="${p.key}">
        <div class="txt"><b>${g(p.a)}</b> <span style="color:var(--dimmer)">vs</span> <b>${g(p.b)}</b>${p.date?"":' <span class="tag legacy">legacy</span>'}</div>
        <input class="mono" data-f="sa" type="number" min="0" value="${p.sa}" title="Score 1">
        <input class="mono" data-f="sb" type="number" min="0" value="${p.sb}" title="Score 2">
        <input data-f="date" type="date" value="${p.date||""}" title="Match date">
        <button class="icon-btn" data-msave="${p.key}" title="Save fix"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-mdel="${p.key}" title="Delete match">${u}</button>
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
        ${n.length?n.map((o,v)=>`
          <div class="log-item">
            <div class="txt"><b>${g(o.a)}</b> ${o.sa}\u2013${o.sb} <b>${g(o.b)}</b></div>
            <div class="txt" style="color:var(--dimmer)">${g(o.date||"")}</div>
            <button class="icon-btn" data-del="${v}" title="Remove">
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
      <div class="log-list" id="ov-alias-list" style="margin-top:12px">${w}</div>
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
      <div class="log-list" id="ov-seed-list" style="margin-top:12px">${r}</div>
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

  <datalist id="player-list">${Y.players.map(o=>`<option value="${g(o.name)}">`).join("")}</datalist>`,c("#admin-lock").addEventListener("click",()=>{ht(),D()}),c("#admin-publish").addEventListener("click",()=>L()),c("#admin-sync").addEventListener("click",async()=>{let o=c("#admin-sync"),v=c("#admin-sync-status");o.disabled=!0,v.textContent="syncing\u2026";try{let b=await fetch(bt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:le()})}),p=await b.json().catch(()=>({}));b.ok&&p.ok?(v.textContent=p.changed?`synced \u2713 ${p.matches} matches / ${p.players} players`:"already up to date \u2713",E(p.changed?"Sheet synced \u2014 the live site was updated.":"Site already matches the sheet.")):b.status===429?(v.textContent="rate limited",E("Too many attempts \u2014 wait a few minutes.")):(v.textContent="sync failed",E("Sync failed: "+(p.error||b.status)))}catch{v.textContent="network error",E("Sync failed (network).")}o.disabled=!1});async function L(o){let v=!!(o&&o.silent),b=le()||(v?"":(window.prompt("Admin password:")||"").trim());if(!b){E(v?'Saved here \u2014 auto-publish needs a stored password. Use "Publish to everyone".':"Publish cancelled.");return}Me=!0;let p=U(),x={},R=[];for(let[y,k]of Object.entries(p.matchEdits||{}))y.startsWith("a:")&&(x[y]=k);for(let y of p.matchRemoved||[])y.startsWith("a:")&&R.push(y);let a=J().filter(y=>y.admin).map(y=>({a:y.a,b:y.b,sa:y.sa,sb:y.sb,date:y.date||""})),d={matches:a,aliases:p.aliases||{},aliasNotes:p.aliasNotes||{},aliasRemoved:p.aliasRemoved||[],inactive:p.inactive||[],seeds:p.seeds||{},seedGlicko:p.seedGlicko||{},seedRd:p.seedRd||{},seedRemoved:p.seedRemoved||[],settings:p.settings||{},matchEdits:x,matchRemoved:R,faq:p.faq!=null?p.faq:[]};try{let y=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:b,doc:d,message:`Publish match log (${a.length} matches)`})}),k=await y.json().catch(()=>({}));if(!y.ok||!k.ok){y.status===403&&sessionStorage.removeItem(K),E("Publish failed: "+(k.error||"HTTP "+y.status));return}window.LB_PUB=d,window.LB_LOG=a,ne([]),I({}),P(),v||D(),E(v?"Saved \u2014 live for everyone \u2713":"Published! Everyone sees it on their next visit.")}catch{E("Publish failed: network error.")}finally{Me=!1}}c("#admin-export").addEventListener("click",()=>{let o=new Blob([JSON.stringify(V(),null,2)],{type:"application/json"}),v=document.createElement("a");v.href=URL.createObjectURL(o),v.download="match-log.json",v.click(),URL.revokeObjectURL(v.href),E("Log exported.")}),c("#adm-add").addEventListener("click",()=>{let o=c("#adm-a").value.trim(),v=c("#adm-b").value.trim(),b=parseInt(c("#adm-sa").value,10),p=parseInt(c("#adm-sb").value,10);if(!o||!v||o.toLowerCase()===v.toLowerCase()||!Number.isFinite(b)||!Number.isFinite(p)){E("Fill in both players and scores.");return}let x=V();x.unshift({a:o,b:v,sa:b,sb:p,date:c("#adm-date")?c("#adm-date").value||new Date().toISOString().slice(0,10):new Date().toISOString().slice(0,10)}),ne(x),P(),D(),E(`${o} ${b}\u2013${p} ${v} added \u2014 site recalculated live.`)}),c("#adm-list").addEventListener("click",o=>{let v=o.target.closest("[data-del]");if(!v)return;let b=V();b.splice(parseInt(v.dataset.del,10),1),ne(b),P(),D()}),c("#ov-alias-add").addEventListener("click",()=>{let o=c("#ov-alias-a").value.trim(),v=c("#ov-alias-b").value.trim(),b=(c("#ov-alias-note")||{}).value.trim();if(!o||!v){E("Fill both: the wrong name and the correct player.");return}let p=Object.keys(H).find(R=>R.toLowerCase()===v.toLowerCase())||v,x=F();I({...x,aliases:{...x.aliases||{},[o]:p},aliasNotes:b?{...x.aliasNotes||{},[o]:b}:x.aliasNotes||{},aliasRemoved:(x.aliasRemoved||[]).filter(R=>R!==o)}),P(),D(),E(`Name fix saved \u2014 "${o}" now counts as ${p}.`)}),c("#ov-alias-list").addEventListener("click",o=>{let v=o.target.closest("[data-alias-del]");if(!v)return;let b=v.dataset.aliasDel,p=F(),x={...p.aliases||{}},R={...p.aliasNotes||{}};delete x[b],delete R[b],I({...p,aliases:x,aliasNotes:R,aliasRemoved:[...new Set([...p.aliasRemoved||[],b])]}),P(),D(),E("Name fix removed.")}),c("#ov-inact-toggle").addEventListener("click",()=>{let o=c("#ov-inact-n").value.trim();if(!o){E("Type a player name first.");return}let v=F(),b=U().inactive||[],p=b.includes(o)?b.filter(x=>x!==o):[...b,o];I({...v,inactive:p}),P(),D(),E(p.includes(o)?`${o} marked inactive.`:`${o} marked active again.`)}),c("#ov-inact-list").addEventListener("click",o=>{let v=o.target.closest("[data-inact-del]");if(!v)return;let b=F();I({...b,inactive:(U().inactive||[]).filter(p=>p!==v.dataset.inactDel)}),P(),D()}),c("#ov-seed-add").addEventListener("click",()=>{let o=c("#ov-seed-n").value.trim(),v=c("#ov-seed-v").value.trim(),b=c("#ov-seed-g").value.trim(),p=c("#ov-seed-rd").value.trim();if(!o){E("Pick a player first.");return}if(v===""&&b===""&&p===""){E("Enter an Old 0\u2013100 rating, or a Starting Glicko / RD.");return}let x=F(),R={...x.seeds||{}},a={...x.seedGlicko||{}},d={...x.seedRd||{}};v!==""&&Number.isFinite(Number(v))?R[o]=Number(v):delete R[o],b!==""&&Number.isFinite(Number(b))?a[o]=Number(b):delete a[o],p!==""&&Number.isFinite(Number(p))?d[o]=Number(p):delete d[o],I({...x,seeds:R,seedGlicko:a,seedRd:d,seedRemoved:(x.seedRemoved||[]).filter(y=>y!==o)}),P(),D(),E(`Seed saved for ${o}.`)}),c("#ov-seed-list").addEventListener("click",o=>{let v=o.target.closest("[data-seed-del]");if(!v)return;let b=v.dataset.seedDel,p=F(),x={...p.seeds||{}};delete x[b];let R={...p.seedGlicko||{}};delete R[b];let a={...p.seedRd||{}};delete a[b],I({...p,seeds:x,seedGlicko:R,seedRd:a,seedRemoved:[...new Set([...p.seedRemoved||[],b])]}),P(),D()}),c("#ov-settings").addEventListener("change",o=>{let v=o.target.closest("[data-set-name]");if(!v)return;let b=F();I({...b,settings:{...b.settings||{},[v.dataset.setName]:v.value}}),P(),D(),E("Setting applied \u2014 everything recalculated.")}),c("#ov-set-reset").addEventListener("click",()=>{let o=F();I({...o,settings:{}}),P(),D(),E("Settings back to the master sheet values.")}),c("#ov-mq").addEventListener("input",()=>{c("#ov-mresults").innerHTML=$(c("#ov-mq").value)}),c("#ov-mresults").addEventListener("click",o=>{let v=o.target.closest("[data-msave]"),b=o.target.closest("[data-mdel]");if(v){let p=v.closest("[data-mkey]"),x=p.dataset.mkey,R=d=>p.querySelector(`[data-f="${d}"]`).value,a=F();I({...a,matchEdits:{...a.matchEdits||{},[x]:{sa:+R("sa"),sb:+R("sb"),date:R("date")}}}),P(),c("#ov-mresults").innerHTML=$(c("#ov-mq").value),E("Match fixed \u2014 ratings recalculated.")}else if(b){let p=b.dataset.mdel,x=F();I({...x,matchRemoved:[...new Set([...x.matchRemoved||[],p])]}),P(),c("#ov-mresults").innerHTML=$(c("#ov-mq").value),E("Match deleted \u2014 ratings recalculated.")}}),c("#pl-add").addEventListener("click",()=>{let o=c("#pl-name").value.trim(),v=c("#pl-opp").value.trim(),b=parseInt(c("#pl-sa").value,10),p=parseInt(c("#pl-sb").value,10);if(!o||!v||o.toLowerCase()===v.toLowerCase()||!Number.isFinite(b)||!Number.isFinite(p)){E("A player needs a name, an opponent and both scores \u2014 at least 1 result.");return}if(H[_(o)]){E(`${o} already exists \u2014 log a match for them instead.`);return}let x=V();x.unshift({a:o,b:v,sa:b,sb:p,date:(c("#pl-date")||{}).value||new Date().toISOString().slice(0,10)}),ne(x);let R=(c("#pl-seed")||{}).value.trim();if(R!==""&&Number.isFinite(Number(R))){let a=F();I({...a,seeds:{...a.seeds||{},[_(o)]:Number(R)},seedRemoved:(a.seedRemoved||[]).filter(d=>d!==_(o))})}P(),D(),E(`${o} added with their first result \u2014 ${b}\u2013${p} vs ${v}.`)}),c("#pl-del-btn").addEventListener("click",()=>{let o=c("#pl-del").value.trim(),v=_(o),b=J().filter(h=>h.a===v||h.b===v);if(!b.length){E(`No player called "${o}" with matches found.`);return}if(!window.confirm(`Remove ${v} and ${b.length} match${b.length===1?"":"es"}? This recalculates every rating.`))return;let p=F(),x=[...p.matchRemoved||[]],R=[];b.forEach(h=>{h.key.startsWith("l:")?R.push(parseInt(h.key.slice(2),10)):x.push(h.key)});let a=V();R.sort((h,T)=>T-h).forEach(h=>a.splice(h,1)),ne(a);let d={...p.seeds||{}},y={...p.seedGlicko||{}},k={...p.seedRd||{}};delete d[v],delete y[v],delete k[v],I({...p,matchRemoved:[...new Set(x)],seeds:d,seedGlicko:y,seedRd:k,seedRemoved:[...new Set([...p.seedRemoved||[],v])],inactive:(U().inactive||[]).filter(h=>h!==v)}),P(),D(),E(`${v} removed with ${b.length} match${b.length===1?"":"es"}. Publish to make it public.`)});let M=()=>{let o=be();c("#faq-admin-list").innerHTML=o.map((v,b)=>`
      <div class="log-item fix-row" data-faq-idx="${b}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${g(String(v.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${g(String(v.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${b}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${b}" title="Delete question">${u}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};M(),c("#faq-admin-list").addEventListener("click",o=>{let v=o.target.closest("[data-faq-save]"),b=o.target.closest("[data-faq-del]"),p=be().map(R=>({...R}));if(v){let R=v.closest("[data-faq-idx]");p[parseInt(v.dataset.faqSave,10)]={q:R.querySelector('[data-fq="q"]').value.trim(),a:R.querySelector('[data-fq="a"]').value.trim()}}else if(b)p.splice(parseInt(b.dataset.faqDel,10),1);else return;let x=F();I({...x,faq:p}),M(),E("Q&A updated \u2014 publish to make it public.")}),c("#faq-add").addEventListener("click",()=>{let o=c("#faq-new-q").value.trim(),v=c("#faq-new-a").value.trim();if(!o||!v){E("Fill in both the question and the answer.");return}let b=F();I({...b,faq:[...be().map(p=>({...p})),{q:o,a:v}]}),M(),E("Question added.")}),c("#faq-reset").addEventListener("click",()=>{let o=F();I({...o,faq:null}),M(),E("Q&A back to the built-in list.")}),window._fbTimer&&(clearInterval(window._fbTimer),window._fbTimer=null);async function S(){let o=c("#fb-inbox");if(!o||document.querySelector("#fb-inbox [data-fb-reply]:focus"))return;let v=le();if(!v){o.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let b=await fetch(Z+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:v})}),p=await b.json().catch(()=>({}));if(!b.ok||!p.ok){o.innerHTML=`<div class="empty">Could not load messages (${g(p.error||"HTTP "+b.status)}).</div>`;return}let x=p.items||[],R={};o.querySelectorAll("[data-fb-id]").forEach(a=>{let d=a.querySelector("[data-fb-reply]");d&&d.value&&(R[a.dataset.fbId]=d.value)}),o.innerHTML=x.map(a=>`
        <div class="log-item fb-row${a.resolved?" fb-done":""}" data-fb-id="${g(a.id)}" data-fb-resolved="${a.resolved?"1":""}">
          <div class="txt">
            <b>${g(a.name||"Anonymous")}</b>${a.contact?` <span style="color:var(--dimmer)">\xB7 ${g(a.contact)}</span>`:""}
            <span class="mono" style="color:var(--dimmer);font-size:11px;margin-left:6px">ticket ${g(a.id)}</span>
            ${a.resolved?'<span class="tag resolved" style="margin-left:6px">resolved \u2713</span>':`<span class="tag ${a.status==="replied"?"live":"fresh"}" style="margin-left:6px">${g(a.status)}</span>`}
            <div style="color:var(--dim);font-size:13px;margin-top:4px">${g(a.message)}</div>
            ${a.reply?`<div style="color:var(--gold);font-size:12.5px;margin-top:4px">\u21A9 ${g(a.reply)}</div>`:""}
          </div>
          <input class="set-val fb-reply-in" data-fb-reply placeholder="Write a reply\u2026" value="${g(a.reply||"")}">
          <button class="icon-btn" data-fb-send title="Send reply"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-resolve title="${a.resolved?"Reopen \u2014 mark as not resolved":"Mark as resolved"}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.6L16 9.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-del title="Delete message">${u}</button>
        </div>`).join("")||'<div class="empty">No messages yet.</div>',o.querySelectorAll("[data-fb-id]").forEach(a=>{let d=a.querySelector("[data-fb-reply]");d&&R[a.dataset.fbId]!=null&&(d.value=R[a.dataset.fbId])})}catch{o.innerHTML='<div class="empty">Network error loading messages.</div>'}}S(),c("#fb-refresh").addEventListener("click",()=>{S(),E("Inbox refreshed.")}),window._fbTimer=setInterval(()=>{if(!c("#fb-inbox")){clearInterval(window._fbTimer),window._fbTimer=null;return}document.hidden||S()},2e3),c("#fb-inbox").addEventListener("click",async o=>{let v=o.target.closest("[data-fb-send]"),b=o.target.closest("[data-fb-del]"),p=o.target.closest("[data-fb-resolve]");if(!v&&!b&&!p)return;let x=o.target.closest("[data-fb-id]"),R=x.dataset.fbId,a=le();try{if(p){let d=x.dataset.fbResolved!=="1";if(!(await fetch(Z+"/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:a,id:R,resolved:d})}).then(k=>k.json())).ok){E("Could not update \u2014 try again.");return}E(d?"Marked as resolved \u2713":"Message reopened."),S()}else if(v){let d=x.querySelector("[data-fb-reply]").value;if(!(await fetch(Z+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:a,id:R,reply:d})}).then(k=>k.json())).ok){E("Reply failed.");return}E("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(Z+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:a,id:R})}).then(y=>y.json())).ok){E("Delete failed.");return}x.remove(),E("Message deleted.")}}catch{E("Network error.")}})}var pe=document.getElementById("fl-cards");pe&&window.matchMedia("(hover: hover)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(pe.addEventListener("pointermove",e=>{let s=e.target.closest&&e.target.closest(".fl-card");if(!s)return;let n=s.getBoundingClientRect(),i=(e.clientX-n.left)/n.width-.5,l=(e.clientY-n.top)/n.height-.5;s.classList.add("tilt"),s.style.transform=`perspective(1000px) rotateY(${(i*7).toFixed(2)}deg) rotateX(${(-l*6).toFixed(2)}deg) translateY(-6px)`}),pe.addEventListener("pointerleave",()=>{pe.querySelectorAll(".fl-card").forEach(e=>{e.style.transform="",e.classList.remove("tilt")})}));c("#search").addEventListener("input",e=>{let s=e.target.value.trim().toLowerCase(),n=c("#search-drop");if(!s){n.classList.remove("show");return}let i=Y.players.filter(l=>l.name.toLowerCase().includes(s)).slice(0,8);if(!i.length){n.classList.remove("show");return}n.innerHTML=i.map(l=>`
    <a class="drop-row" href="#/player/${W(l.name)}">
      ${l.rank?$e(l.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${g(l.name)}</span>        <span class="mono" style="margin-left:auto;color:var(--dim)">${ye(l,!0)}</span>
    </a>`).join(""),n.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||c("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(c("#search-drop").classList.remove("show"),c("#search").value="")});var Z=we.replace(/\/publish$/,"/feedback"),Le="tt1v1_fb_tickets";function Dt(){try{return JSON.parse(localStorage.getItem(Le)||"[]")}catch{return[]}}function Bt(e){let s=Dt();s.push({id:e,ts:Date.now()});try{localStorage.setItem(Le,JSON.stringify(s.slice(-20)))}catch{}}function _t(){let e=c("#fb-overlay"),s=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>c("#fb-msg").focus(),180)},n=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};c("#fab-feedback").addEventListener("click",s),c("#fb-close").addEventListener("click",n),c("#fb-done").addEventListener("click",n),e.addEventListener("click",r=>{r.target===e&&n()}),document.addEventListener("keydown",r=>{r.key==="Escape"&&e.classList.contains("show")&&n()});let i=c("#faq-feedback-btn");i&&i.addEventListener("click",s);let l=c("#fb-msg"),u=c("#fb-count-n");l.addEventListener("input",()=>{u.textContent=String(l.value.length);try{localStorage.setItem("tt1v1_fb_draft",l.value)}catch{}});try{let r=localStorage.getItem("tt1v1_fb_draft");r&&(l.value=r,u.textContent=String(r.length))}catch{}let w=c("#fb-send");w.addEventListener("click",async()=>{let r=l.value.trim();if(r.length<5){l.focus(),l.classList.add("fb-nudge"),setTimeout(()=>l.classList.remove("fb-nudge"),500),E(t("fb.writeFirst"));return}w.classList.add("busy"),w.disabled=!0;try{let f=await fetch(Z,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:c("#fb-name").value.trim(),contact:c("#fb-contact").value.trim(),message:r})}),$=await f.json().catch(()=>({}));if(!f.ok||!$.ok){E(t("fb.couldNotSend",{err:$.error||"HTTP "+f.status}));return}Bt($.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}c("#fb-ticket-code").textContent=$.id,c("#fb-view-form").hidden=!0,c("#fb-view-done").hidden=!1}catch{E(t("fb.netError"))}finally{w.classList.remove("busy"),w.disabled=!1}});let m=document.querySelector(".fb-ticket");m&&m.addEventListener("click",async()=>{let r=(c("#fb-ticket-code").textContent||"").trim();if(!r||r==="\u2014")return;try{await navigator.clipboard.writeText(r)}catch{let L=document.createElement("textarea");L.value=r,document.body.appendChild(L),L.select();try{document.execCommand("copy")}catch{}L.remove()}let f=c("#fb-copied");f&&(f.classList.add("show"),clearTimeout(window._fbCopiedT),window._fbCopiedT=setTimeout(()=>f.classList.remove("show"),1800)),E(t("fb.ticketCopied"))}),c("#fb-check").addEventListener("click",async()=>{let r=c("#fb-ticket-in").value.trim(),f=c("#fb-reply-out");if(r){f.classList.add("show"),f.textContent=t("fb.checking");try{let $=await fetch(Z+"/status?id="+encodeURIComponent(r)),L=await $.json().catch(()=>({}));if(!$.ok||!L.ok){f.textContent=t("fb.noTicket");return}f.innerHTML=L.resolved?`${t("fb.statusResolved")}${L.reply?`<br>${t("fb.replyFrom",{reply:g(L.reply)})}`:""}`:L.reply?t("fb.replyFrom",{reply:g(L.reply)}):t("fb.statusPending",{status:g(L.status)})}catch{f.textContent=t("fb.netErrorShort")}}})}function Ht(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let s=null,n=()=>{e.classList.remove("show"),s=null};document.addEventListener("mouseover",i=>{let l=i.target.closest&&i.target.closest("[title],[data-tip]");if(!l)return;l.hasAttribute("title")&&(l.setAttribute("data-tip",l.getAttribute("title")),l.removeAttribute("title"));let u=l.getAttribute("data-tip");if(!u)return;s=l,e.textContent=u;let w=l.getBoundingClientRect(),m=w.top<52;e.classList.toggle("below",m),e.style.left=Math.max(10,Math.min(window.innerWidth-10,w.left+w.width/2))+"px",e.style.top=(m?w.bottom+8:w.top-8)+"px",e.classList.add("show")}),document.addEventListener("mouseout",i=>{if(!s)return;let l=i.relatedTarget;l&&l.closest&&l.closest("[title],[data-tip]")===s||n()}),window.addEventListener("scroll",n,{passive:!0}),document.addEventListener("mousedown",n,{passive:!0})}var We;function E(e){let s=c("#toast");s.textContent=e,s.classList.add("show"),clearTimeout(We),We=setTimeout(()=>s.classList.remove("show"),2600)}var ie;function xe(){ie&&ie.disconnect(),ie=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&(s.target.classList.add("in"),A(".cu",s.target).forEach(n=>Oe(n,parseFloat(n.dataset.target),{dec:parseInt(n.dataset.dec||0)})),ie.unobserve(s.target))})},{threshold:.12}),A(".reveal").forEach(e=>ie.observe(e))}(function(){let s=c("#scroll-progress"),n=c("#to-top"),i=c("#page-home .hero-row"),l=document.querySelector(".topbar"),u=()=>{let w=window.scrollY,m=document.documentElement.scrollHeight-window.innerHeight;s&&(s.style.width=(m>0?w/m*100:0)+"%"),n&&n.classList.toggle("show",w>640),l&&l.classList.toggle("scrolled",w>10),i&&w<1400&&(i.style.transform=`translateY(${w*.14}px)`,i.style.opacity=String(Math.max(.3,1-w/950)))};window.addEventListener("scroll",u,{passive:!0}),n&&n.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),u()})();P();Ie();ke();_t();Ht();window.addEventListener("lb-lang",()=>{let e=window.scrollY,s=Q,n={...N};ke(),c("#page-home").classList.contains("active")&&(s!=="all"||n.key!=="rank"||n.dir!==1)&&(Q=s,N=n,A(".chip[data-filter]").forEach(i=>i.classList.toggle("on",i.dataset.filter===s)),Fe(),te(s,n.key,n.dir)),De(),window.scrollTo(0,e)});function me(e,s){let n=e.indexOf("window."+s);if(n<0)return null;let i=e.indexOf("=",n);for(;i<e.length&&"{[".indexOf(e[i])<0;)i++;let l=0,u=!1,w="",m=!1;for(let r=i;r<e.length;r++){let f=e[r];if(u){m?m=!1:f==="\\"?m=!0:f===w&&(u=!1);continue}if(f==='"'||f==="'"){u=!0,w=f;continue}if(f==="{"||f==="[")l++;else if((f==="}"||f==="]")&&(l--,l<=0))return JSON.parse(e.slice(i,r+1))}return null}async function Se(e){try{let s="cb="+Date.now(),[n,i]=await Promise.all([fetch("data.js?"+s,{cache:"no-store"}),fetch("log.js?"+s,{cache:"no-store"})]);if(!n.ok||!i.ok)throw new Error("HTTP "+n.status+"/"+i.status);let l=await n.text(),u=await i.text(),w=me(l,"LB_DATA"),m=me(u,"LB_PUB")||(me(u,"LB_LOG")?{matches:me(u,"LB_LOG")}:null),r=[];if(w&&JSON.stringify(w)!==JSON.stringify(j)&&(j=w,window.LB_DATA=w,r.push("data")),m&&JSON.stringify(m)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=m,window.LB_LOG=m.matches||[],r.push("log")),r.length){P(),Ie(),ke();let f=c("#last-updated");f&&(f.textContent=t("home.lastUpdated",{when:se(j.generated)||"today"}))}e&&E(r.length?t("misc.refreshed"):t("misc.upToDate"))}catch{e&&E(t("misc.refreshFailed"))}}Se(!1);var ue=c("#lb-refresh-btn");ue&&ue.addEventListener("click",async()=>{ue.classList.add("spinning"),await Se(!0),setTimeout(()=>ue.classList.remove("spinning"),400)});setInterval(()=>Se(!1),6e4);document.addEventListener("visibilitychange",()=>{document.hidden||Se(!1)});var st="tt1v1_fb_seen",z=null;function Ut(){try{return JSON.parse(localStorage.getItem(Le)||"[]")}catch{return[]}}function at(){try{return JSON.parse(localStorage.getItem(st)||"{}")||{}}catch{return{}}}function Gt(){let e=c("#fab-feedback");if(e&&!e.querySelector(".fb-dot")){let n=document.createElement("span");n.className="fb-dot",e.appendChild(n),requestAnimationFrame(()=>n.classList.add("in"))}let s=c("#fb-view-form");if(s&&!c("#fb-reply-banner")&&z){let n=document.createElement("div");n.id="fb-reply-banner",n.innerHTML=`${t("fb.teamReplied",{id:g(z.id)})}
      <div class="r">${g(z.reply)}</div>
      <button class="btn btn-ghost" id="fb-got-it" style="margin-top:9px;padding:6px 13px">${t("fb.gotIt")}</button>`,s.insertAdjacentElement("beforebegin",n),requestAnimationFrame(()=>n.classList.add("show")),c("#fb-got-it").addEventListener("click",Wt)}}function Wt(){if(z){let n=at();n[z.id]=1;try{localStorage.setItem(st,JSON.stringify(n))}catch{}z=null}let e=c(".fb-dot");e&&(e.classList.add("out"),setTimeout(()=>e.remove(),420));let s=c("#fb-reply-banner");s&&(s.classList.remove("show"),setTimeout(()=>s.remove(),420))}async function nt(){let e=at();z=null;let s=Ut(),n=s.slice(0,Math.max(0,s.length-6)),i=[];for(let l of s.slice(-6))try{let u=await fetch(Z+"/status?id="+encodeURIComponent(l.id),{cache:"no-store"}),w=await u.json().catch(()=>({}));if(u.status===404||u.ok&&w.ok===!1)continue;i.push(l),u.ok&&w.ok&&w.reply&&!e[l.id]&&!z&&(z={id:l.id,reply:w.reply})}catch{i.push(l)}if(i.length!==s.slice(-6).length)try{localStorage.setItem(Le,JSON.stringify([...n,...i]))}catch{}z&&Gt()}setTimeout(nt,3500);setInterval(nt,9e4);})();
