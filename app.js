/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var F=window.LB_DATA,ge="https://tierstats-publish.tierstats.workers.dev/publish",d=(e,s=document)=>s.querySelector(e),C=(e,s=document)=>[...s.querySelectorAll(e)],f=e=>String(e).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),U=e=>encodeURIComponent(String(e)),Pe=e=>decodeURIComponent(e);function Re(e,s,n={}){let o=n.dur||1200,l=n.dec||0,m=performance.now(),g=parseFloat(e.textContent)||0;function u(i){let b=Math.min(1,(i-m)/o),E=1-Math.pow(1-b,3);e.textContent=(g+(s-g)*E).toFixed(l),b<1&&requestAnimationFrame(u)}requestAnimationFrame(u),setTimeout(()=>{e.textContent=s.toFixed(l)},o+300)}var Ke='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',Xe='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function be(e,s=""){let n=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",o=e<=3?e===1?Ke:Xe:"";return`<div class="rank-badge ${n} ${s}" title="${t("home.rankTip",{n:e})}">${o}<span class="num">${e}</span></div>`}var q=e=>t(e==="W"?"rec.wLetter":e==="L"?"rec.lLetter":"rec.dLetter"),B={},I=[],J={players:[],byName:{},qualified:[]},ae={},pe={},Q={},Le=new Set,Ie="tt1v1_baseline",Te={prevRatings:{},prevRanks:{}};function et(){let e=F.baselineEpoch||"default",s=null;try{s=JSON.parse(localStorage.getItem(Ie)||"null")}catch{s=null}if(!s||typeof s!="object"||s.epoch!==e){s={epoch:e,prevRatings:F.prevRatings||{},prevRanks:F.prevRanks||{}};try{localStorage.setItem(Ie,JSON.stringify(s))}catch{}}Te={prevRatings:{...F.prevRatings||{},...s.prevRatings||{}},prevRanks:{...F.prevRanks||{},...s.prevRanks||{}}}}function tt(){for(let n in ae)delete ae[n];let e=new Set(D().aliasRemoved||[]);Object.entries(F.aliases).forEach(([n,o])=>{e.has(n)||(ae[n.toLowerCase()]=o)}),Object.entries(D().aliases||{}).forEach(([n,o])=>{ae[String(n).toLowerCase()]=o});for(let n of Object.keys(pe))delete pe[n];for(let n of Object.keys(Q))delete Q[n];Le.clear();let s=(n,o)=>{Object.keys(n||{}).forEach(l=>{let m=H(l);m!==l&&(o[m]=n[l])}),Object.keys(n||{}).forEach(l=>{let m=H(l);m===l&&(o[m]=n[l])})};s(F.seeds,pe),s(Te.prevRatings,Q),(F.inactiveList||[]).forEach(n=>Le.add(H(n)))}var H=e=>{let s=String(e).trim(),n=new Set;for(;;){let o=ae[s.toLowerCase()];if(!o||o===s||n.has(s))return s;n.add(s),s=o}};function qe(e){let s=[];return G().forEach(n=>{let o=(l,m,g)=>({opp:l,for_:m,against:g,res:m>g?"W":m<g?"L":"D",date:n.date});n.a===e?s.push(o(n.b,n.sa,n.sb)):n.b===e&&s.push(o(n.a,n.sb,n.sa))}),s}function st(e){let s={};return qe(e).forEach(n=>{let o=s[n.opp]||(s[n.opp]={w:0,l:0,d:0,pf:0,pa:0});o[n.res.toLowerCase()]+=1,o.pf+=n.for_,o.pa+=n.against}),Object.entries(s).map(([n,o])=>({opp:n,...o})).sort((n,o)=>o.w+o.l+o.d-(n.w+n.l+n.d)||o.w-n.w)}function at(e){let s=B[e]||{};return s.provisional?`<span class="tag prov">${t("tag.provisional")}</span>`:s.inactive?`<span class="tag inact">${t("tag.inactive")}</span>`:""}function nt(e){let s=qe(e).slice(0,5).reverse();if(!s.length)return"";let n=s.map(o=>q(o.res)).join(" ");return`<span class="form" title="${t("form.title",{n:s.length,seq:n})}">${s.map(o=>`<i class="${o.res.toLowerCase()}">${q(o.res)}</i>`).join("")}</span>`}function Ce(e){let s=e.delta!=null?e.delta:0;if(Math.abs(s)<.05)return"";let n=s>0,o=Math.abs(s).toFixed(1);return`<span class="delta ${n?"up":"down"}" title="${n?t("delta.upTitle",{n:o}):t("delta.downTitle",{n:o})}">${n?"\u25B2":"\u25BC"} ${o}</span>`}function it(){let e=Te.prevRanks||{},s=Object.keys(e);if(s.length){let l={};return s.forEach(m=>{l[H(m)]=e[m]}),l}let n={};I.forEach(l=>{Q[l.name]!=null&&(n[l.name]=Q[l.name])});let o={};return Object.entries(n).sort((l,m)=>m[1]-l[1]).forEach(([l],m)=>{o[l]=m+1}),o}function ot(e,s){let n=s[e.name]!=null?s[e.name]:s[H(e.name)];if(n==null){let l=(F.newSince||{})[e.name];return!l||(Date.now()-Date.parse(l))/864e5>5?"":`<span class="mv new" title="${t("mv.newTitle")}">${t("mv.new")}</span>`}let o=n-e.rank;return o>0?`<span class="mv up" title="${tp("mv.up",o)}">\u25B2${o}</span>`:o<0?`<span class="mv down" title="${tp("mv.down",-o)}">\u25BC${-o}</span>`:""}function re(e){return`${Math.round(e.rating-100)} \u2013 ${Math.round(e.rating+100)}`}function he(e,s){if(!e.provisional)return e.rating.toFixed(1);let n=s?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:re(e);return`<span class="prov-range" title="${t("rating.provTitle")}">${n}</span>`}var He="tt1v1_admin_log_v1",K="tt1v1_admin_ok",Z="tt1v1_admin_pw",lt=()=>sessionStorage.getItem(K)==="1"||localStorage.getItem(K)==="1",ne=()=>sessionStorage.getItem(Z)||localStorage.getItem(Z)||"";function rt(e,s){s?(localStorage.setItem(K,"1"),localStorage.setItem(Z,e)):(sessionStorage.setItem(K,"1"),sessionStorage.setItem(Z,e),localStorage.removeItem(K),localStorage.removeItem(Z))}function ct(){[sessionStorage,localStorage].forEach(e=>{e.removeItem(K),e.removeItem(Z)})}var Fe=null,xe=!1;function Ge(){xe||!ne()||(clearTimeout(Fe),Fe=setTimeout(()=>publishLog({silent:!0}),1500))}var dt=ge.replace(/\/publish$/,"/verify"),vt=ge.replace(/\/publish$/,"/sync");function Y(){try{return JSON.parse(localStorage.getItem(He)||"[]")}catch{return[]}}function te(e){try{localStorage.setItem(He,JSON.stringify(e))}catch{}Ge()}var Ue="tt1v1_admin_over_v1";function A(){try{return JSON.parse(localStorage.getItem(Ue)||"{}")||{}}catch{return{}}}function N(e){try{localStorage.setItem(Ue,JSON.stringify(e))}catch{}Ge()}function D(){let e=window.LB_PUB||{},s=A(),n=new Set([...e.aliasRemoved||[],...s.aliasRemoved||[]]),o=new Set([...e.seedRemoved||[],...s.seedRemoved||[]]),l=s.aliases||{},m={...s.seeds||{},...s.seedGlicko||{},...s.seedRd||{}},g=L=>Object.fromEntries(Object.entries(L||{}).filter(([a])=>!n.has(a)||l[a]!=null)),u=L=>Object.fromEntries(Object.entries(L||{}).filter(([a])=>!o.has(a)||m[a]!=null)),i=g({...e.aliases||{},...s.aliases||{}}),b=g({...e.aliasNotes||{},...s.aliasNotes||{}}),E=u({...e.seeds||{},...s.seeds||{}}),$=u({...e.seedGlicko||{},...s.seedGlicko||{}}),M=u({...e.seedRd||{},...s.seedRd||{}});return{aliases:i,aliasNotes:b,seeds:E,seedGlicko:$,seedRd:M,aliasRemoved:[...n].filter(L=>i[L]==null),seedRemoved:[...o].filter(L=>E[L]==null&&$[L]==null&&M[L]==null),settings:{...e.settings||{},...s.settings||{}},matchEdits:{...e.matchEdits||{},...s.matchEdits||{}},inactive:s.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...s.matchRemoved||[]])],faq:s.faq!=null?s.faq:e.faq!=null?e.faq:null}}function We(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function G(){let e=D(),s=e.matchEdits||{},n=new Set(e.matchRemoved||[]),o=($,M)=>{if(n.has(M))return null;let L=s[M],a=L?{...$,sa:L.sa,sb:L.sb,date:L.date!=null?L.date:$.date}:$;return{...a,a:H(a.a),b:H(a.b),sa:+a.sa,sb:+a.sb,key:M}},l=Y().map(($,M)=>o({...$,admin:!0,published:!1},"l:"+M)).filter(Boolean),m=We().map(($,M)=>o({...$,admin:!0,published:!0},"p:"+M)).filter(Boolean),g=F.matches.map(($,M)=>o({...$,admin:!1,published:!1},"a:"+M)).filter(Boolean).reverse(),u=$=>{let M=$.a>$.b;return[M?$.b:$.a,M?$.a:$.b,M?$.sb:$.sa,M?$.sa:$.sb,$.date||""].join("|")},i={};g.forEach($=>{let M=u($);i[M]=(i[M]||0)+1});let b={};return l.concat(m).filter($=>{let M=u($);return b[M]=(b[M]||0)+1,b[M]>(i[M]||0)}).concat(g)}var T={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},me=864e5,le=Math.log(10)/400,Je=e=>1/Math.sqrt(1+3*le*le*e*e/(Math.PI*Math.PI)),Se=(e,s,n)=>1/(1+Math.pow(10,-Je(n)*(e-s)/400));function pt(e){let s=D().seeds||{};return s[e]!=null&&s[e]!==""?Number(s[e]):pe[e]}function mt(e){let s=(D().seedGlicko||{})[e],n=(D().seedRd||{})[e],o=s!=null&&s!==""?Number(s):null,l=n!=null&&n!==""?Number(n):null;if(o!=null||l!=null)return[o??T.unratedR,l??T.unratedRd];let m=pt(e);return m!=null?[Math.max(T.seedMid+(m-T.oldMid)*T.ptsPer,T.minSeed),T.knownRd]:[T.unratedR,T.unratedRd]}function _e(e,s,n){let o=0,l=0;for(let[g,u,i]of n){let b=Je(u),E=Se(e,g,u);o+=b*b*E*(1-E),l+=b*(i-E)}if(o*=le*le,o<=0)return[e,s];let m=1/(s*s)+o;return[e+le/m*l,Math.sqrt(1/m)]}function ut(e,s){let n=Math.pow(10,s),o=e*n,l=Math.floor(o);return Math.abs(o-l-.5)<1e-6?(l%2===0?l:l+1)/n:Math.round(o)/n}var Oe=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(T.periodDays*me)),ie=Oe(T.graceStart),ft={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function Ne(){let e=D().settings||{};return(F.settings||[]).map(s=>({...s,value:Object.prototype.hasOwnProperty.call(e,s.name)?e[s.name]:s.value}))}function ht(){for(let e of Ne()){let s=ft[e.name];if(!s)continue;if(s==="graceStart"){let o=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(o)&&(T.graceStart=o);continue}let n=Number(e.value);Number.isFinite(n)&&(T[s]=n)}ie=Oe(T.graceStart),C(".cons-val").forEach(e=>{e.textContent=String(T.conservative)}),C(".min-matches-val").forEach(e=>{e.textContent=String(T.minMatches)}),C(".min-opp-val").forEach(e=>{e.textContent=String(T.minOpp)})}function gt(){ht(),tt();let e={},s=a=>{if(!e[a]){let[r,p]=mt(a);e[a]={name:a,r,rd:p,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[a]},n=(a,r,p,c,y,w)=>{let v=s(a);v.games++,v.opps.add(r),p>c?v.w++:p<c?v.l++:v.d++,v.lastIdx=w,y&&(v.lastDate=y)},o={};for(let a of G()){if(a.date)continue;let r=a.a,p=a.b,c=a.sa>a.sb?1:a.sa<a.sb?0:.5;(o[r]=o[r]||[]).push([p,c]),(o[p]=o[p]||[]).push([r,1-c]),n(r,p,a.sa,a.sb,"",ie),n(p,r,a.sb,a.sa,"",ie)}let l={};for(let a in o)l[a]=[s(a).r,s(a).rd];for(let a in o){let[r,p]=_e(l[a][0],l[a][1],o[a].map(([c,y])=>[l[c][0],l[c][1],y]));s(a).r=r,s(a).rd=p}let m=new Map;for(let a of G().filter(r=>r.date).slice().reverse()){let r=a.date,p=Oe(r);m.has(p)||m.set(p,[]),m.get(p).push({a:H(a.a),b:H(a.b),sa:+a.sa,sb:+a.sb,date:r})}for(let a of[...m.keys()].sort((r,p)=>r-p)){for(let c in e){let y=e[c],w=a-(y.lastIdx==null?ie:y.lastIdx);w>0&&(y.rd=Math.min(Math.sqrt(y.rd*y.rd+T.growth*T.growth*w),T.maxRd))}let r={};for(let c of m.get(a)){let y=c.sa>c.sb?1:c.sa<c.sb?0:.5;(r[c.a]=r[c.a]||[]).push([c.b,y]),(r[c.b]=r[c.b]||[]).push([c.a,1-y]),n(c.a,c.b,c.sa,c.sb,c.date,a),n(c.b,c.a,c.sb,c.sa,c.date,a)}let p={};for(let c in r)p[c]=[s(c).r,s(c).rd];for(let c in r){let[y,w]=_e(p[c][0],p[c][1],r[c].map(([v,k])=>[p[v][0],p[v][1],k]));s(c).r=y,s(c).rd=w}}let g=Object.values(e).map(a=>({name:a.name,glicko:a.r,rd:a.rd,rating:a.r-T.conservative*a.rd,matches:a.games,w:a.w,l:a.l,d:a.d,winPct:a.games?ut(a.w/a.games*100,1):0,opponents:a.opps.size,avgOpp:0,lastMatch:a.lastDate||"",provisional:!(a.games>=T.minMatches&&a.opps.size>=T.minOpp),inactive:!1})),u={};g.forEach(a=>{u[a.name]=a.glicko}),g.forEach(a=>{let r=0;e[a.name].opps.forEach(p=>{r+=u[p]!=null?u[p]:T.unratedR}),a.avgOpp=e[a.name].opps.size?r/e[a.name].opps.size:0});let i=Date.now(),b=Math.floor(i/(T.periodDays*me));for(let a in e){let r=e[a],p=b-(r.lastIdx==null?ie:r.lastIdx);p>0&&(r.rd=Math.min(Math.sqrt(r.rd*r.rd+T.growth*T.growth*p),T.maxRd))}g.forEach(a=>{a.glicko=e[a.name].r,a.rd=e[a.name].rd,a.rating=a.glicko-T.conservative*a.rd;let r=Q[a.name],p=(F.curRatings||{})[a.name];a.delta=r!=null?(p??a.rating)-r:0});let E=Date.parse(T.graceStart+"T00:00:00Z")+T.graceDays*me,$=new Set([...Le,...D().inactive||[]]);g.forEach(a=>{a.inactive=$.has(a.name)||(a.lastMatch?i-Date.parse(a.lastMatch+"T00:00:00Z")>T.inactiveDays*me:i>E)});let M=g.filter(a=>!a.provisional&&!a.inactive).sort((a,r)=>r.rating-a.rating);M.forEach((a,r)=>{a.rank=r+1}),g.sort((a,r)=>r.rating-a.rating);let L={};return g.forEach(a=>{L[a.name]=a}),{players:g,byName:L,qualified:M}}function O(){et(),J=gt(),B=J.byName,I=J.qualified}var bt=["page-home","page-player","page-compare","page-matches","page-roster","page-analytics","page-method","page-faq","page-admin"];function ye(){if(Me){Me=!1;return}let e=location.hash||"#/";bt.forEach(l=>d("#"+l).classList.remove("active"));let s="#/"+(e.split("/")[1]||"");C(".nav a, .foot-nav a").forEach(l=>{let m=l.getAttribute("href");l.classList.toggle("active",m===s||e==="#/"&&m==="#/")});let n=d("#nav-glide"),o=document.querySelector(".nav a.active");if(n&&o&&o.offsetWidth>0?(n.style.width=o.offsetWidth+"px",n.style.transform=`translateX(${o.offsetLeft}px)`,n.style.opacity="1"):n&&(n.style.opacity="0"),e==="#/compare"||e.startsWith("#/compare/")){let l=e.split("/").slice(2).map(Pe);Ye(l[0]||"",l[1]||""),d("#page-compare").classList.add("active"),window.scrollTo(0,0)}else e.startsWith("#/player/")?(St(Pe(e.slice(9))),d("#page-player").classList.add("active"),window.scrollTo({top:0,behavior:"instant"in window?"instant":"auto"})):e==="#/matches"?(Et(),d("#page-matches").classList.add("active"),window.scrollTo(0,0)):e==="#/roster"?(Mt(),d("#page-roster").classList.add("active"),window.scrollTo(0,0)):e==="#/analytics"?(Rt(),d("#page-analytics").classList.add("active"),window.scrollTo(0,0)):e==="#/method"?(Tt(),d("#page-method").classList.add("active"),window.scrollTo(0,0)):e==="#/faq"?(Ct(),d("#page-faq").classList.add("active"),window.scrollTo(0,0)):e==="#/admin"?(j(),d("#page-admin").classList.add("active"),window.scrollTo(0,0)):(Ae(),d("#page-home").classList.add("active"),requestAnimationFrame(Lt));$e()}window.addEventListener("hashchange",ye);function Ae(){z="all",P={key:"rank",dir:1},C(".chip[data-filter]").forEach(i=>i.classList.toggle("on",i.dataset.filter==="all")),C(".sortable").forEach(i=>i.classList.remove("sorted","asc"));let e=d('.sortable[data-key="rank"]');e&&e.classList.add("sorted");let s=G().length,n=J.players.length,o=I[0],l=Math.round(I.reduce((i,b)=>i+b.rd,0)/I.length),m=d("#hero-chip-matches");m&&(m.innerHTML=t("home.chipMatches",{n:s})),d("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">${t("stat.ranked")}</div>
      <div class="v"><span class="cu" data-target="${I.length}">0</span><small>${t("stat.ofTotal",{n})}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.matches")}</div>
      <div class="v"><span class="cu" data-target="${s}">0</span></div></div>
    <div class="stat-card"><div class="k">${t("stat.highest")}</div>
      <div class="v"><span class="cu" data-target="${o.rating}" data-dec="1">0</span><small>${f(o.name)}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.avgRd")}</div>
      <div class="v"><span class="cu" data-target="${l}" data-dec="1">0</span><small>${t("stat.certainty")}</small></div></div>`;let g=[I[1],I[0],I[2]].filter(Boolean);d("#fl-cards").innerHTML=g.map(i=>`
    <div class="fl-card r${i.rank}${i.rank===1?" champ":""} reveal" data-goto="${f(i.name)}">
      <div class="fl-top">
        ${be(i.rank)}
        <div class="rd">RD ${i.rd.toFixed(0)}</div>
      </div>
      ${i.rank===1?`<div class="champ-tag">${t("home.champTag")}</div>`:""}
      <div class="nm">${f(i.name)}</div>
      <div class="rating">
        <span class="unit">${t("home.ratingUnit")}</span>
        <div class="big-row"><span class="big">${Math.round(i.rating)}</span>${Ce(i)}</div>
      </div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${i.winPct>=60?"":i.winPct>=40?"mid":"low"}" data-w="${i.winPct}"></div></div>
      </div>
      <div class="meta">
        <span><span class="w">${i.w}${q("W")}</span> <span class="l">${i.l}${q("L")}</span> ${i.d}${q("D")}</span>
        <span class="wc">${i.winPct}%</span>
        <span class="opp">${t("home.avgOpp",{n:Math.round(i.avgOpp)})}</span>
      </div>
    </div>`).join(""),requestAnimationFrame(()=>{C("#fl-cards .bar-fill").forEach(i=>{i.style.width=i.dataset.w+"%"})}),X(),ze();let u=d("#last-updated");u&&(u.textContent=t("home.lastUpdated",{when:F.generated||"today"}))}function ze(){let e=G().filter(s=>s.date).slice(0,10);d("#battles-grid").innerHTML=e.length?e.map(s=>{let n=s.sa>s.sb,o=s.sb>s.sa;return`
    <div class="battle-row reveal" data-goto="${f(n?s.a:s.b)}">
      <div class="who ${n?"win":"lose"}" data-goto="${f(s.a)}">${f(s.a)}</div>
      <div class="vs">${t("vs")}</div>
      <div class="who r ${o?"win":"lose"}" data-goto="${f(s.b)}">${f(s.b)}</div>
      <div class="sc mono"><span class="${n?"win":"lose"}">${s.sa}</span> \u2013 <span class="${o?"win":"lose"}">${s.sb}</span></div>
      <div class="dt">${s.date||(s.admin&&!s.published?t("battles.justNow"):t("misc.historical"))}</div>
    </div>`}).join(""):`<div class="empty" style="padding:26px;text-align:center;color:var(--dim);grid-column:1/-1">${t("battles.empty")}</div>`}var yt=500,wt="cubic-bezier(.22,.8,.24,1)",$t=12;function kt(e,s){matchMedia("(prefers-reduced-motion: reduce)").matches||C(".lb-row",e).forEach((n,o)=>{let l=s.get(n.dataset.name);if(l===void 0||typeof n.animate!="function")return;let m=l-n.getBoundingClientRect().top;Math.abs(m)<=1||n.animate([{transform:`translateY(${m}px)`},{transform:"none"}],{duration:yt,easing:wt,delay:Math.min(o*$t,220),fill:"backwards"})})}function X(e="all",s="rank",n=1){let o=d("#lb-body"),m=(e==="all"&&ue?I:J.players).slice().map(i=>({...i,rank:i.rank!=null?i.rank:9999}));Ee&&(m=m.filter(i=>i.name.toLowerCase().includes(Ee))),e==="provisional"?m=m.filter(i=>(B[i.name]||{}).provisional):e==="inactive"?m=m.filter(i=>(B[i.name]||{}).inactive):e==="veterans"?m=m.filter(i=>i.matches>=15):e==="rising"&&(m=m.filter(i=>i.winPct>=60&&i.matches>=5)),m.sort((i,b)=>{let E=i[s],$=b[s];return(typeof E=="string"?E.localeCompare($):E-$)*n});let g=new Map;C(".lb-row",o).forEach(i=>g.set(i.dataset.name,i.getBoundingClientRect().top));let u=it();o.innerHTML=m.map(i=>`
    <div class="lb-row ${i.rank<=3?"top"+i.rank:""}" data-name="${f(i.name)}" data-goto="${f(i.name)}">
      <div class="rank">${i.rank<=I.length?be(i.rank,"sm")+ot(i,u):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="pname">${f(i.name)}</div></div>
      <div class="rating-cell mono">${Ce(i)}${he(i,!0)}</div>
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
      <div class="col-status">${at(i.name)||nt(i.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?t("lb.emptyInactive"):e==="provisional"?t("lb.emptyProv"):t("lb.emptyNone")}</div>`,kt(o,g),requestAnimationFrame(()=>{C(".bar-fill",o).forEach(i=>{i.style.width=i.dataset.w+"%"})})}var z="all",P={key:"rank",dir:1},Ee="",ue=!0;function Lt(){C("#stat-strip .cu").forEach(e=>Re(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),C(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}d("#lb-qual").addEventListener("click",()=>{ue=!ue,d("#lb-qual").classList.toggle("on",ue),X(z,P.key,P.dir)});d("#lb-filter").addEventListener("input",e=>{Ee=e.target.value.trim().toLowerCase(),X(z,P.key,P.dir)});var oe=d("#theme-toggle");function je(){if(!oe)return;let e=document.documentElement.dataset.theme==="light",s=e?t("top.toDark"):t("top.toLight");oe.setAttribute("aria-pressed",String(e)),oe.setAttribute("aria-label",s),oe.title=s}oe.addEventListener("click",()=>{let s=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=s;try{localStorage.setItem("tt1v1_theme",s)}catch{}je()});je();document.addEventListener("click",e=>{let s=e.target.closest(".chip");if(s&&s.dataset.filter){C(".chip[data-filter]").forEach(l=>l.classList.remove("on")),s.classList.add("on"),z=s.dataset.filter,X(z,P.key,P.dir);return}let n=e.target.closest(".sortable");if(n){let l=n.dataset.key;P.dir=P.key===l?-P.dir:1,P.key=l,C(".sortable").forEach(m=>m.classList.remove("sorted","asc")),n.classList.add("sorted"),P.dir===1&&n.classList.add("asc"),X(z,P.key,P.dir);return}let o=e.target.closest("[data-goto]");o&&(e.stopPropagation(),location.hash="#/player/"+U(o.dataset.goto))});function xt(e){let s=e.slice();for(let n=s.length-1;n>0;n--){let o=Math.floor(Math.random()*(n+1));[s[n],s[o]]=[s[o],s[n]]}return s}function Be(e,s){let n=document.getElementById(e);if(!n)return;let o=n.querySelector(".pick-btn"),l=n.querySelector(".pick-search"),m=[...n.querySelectorAll(".pick-opt")],g=n.querySelector(".pick-empty"),u=-1,i=()=>m.filter(L=>!L.classList.contains("hide")),b=L=>{let a=i();if(!a.length){u=-1;return}u=(L%a.length+a.length)%a.length,m.forEach(r=>r.classList.remove("hover")),a[u].classList.add("hover"),a[u].scrollIntoView({block:"nearest"})},E=L=>{let a=L.trim().toLowerCase(),r=0;m.forEach(p=>{let c=!a||p.dataset.name.toLowerCase().includes(a);p.classList.toggle("hide",!c),c&&r++}),g.classList.toggle("show",r===0),u=-1,r&&b(0)},$=()=>{document.querySelectorAll(".pick.open").forEach(L=>{if(L!==n){L.classList.remove("open");let a=L.querySelector(".pick-btn");a&&a.setAttribute("aria-expanded","false")}}),n.classList.add("open"),o.setAttribute("aria-expanded","true"),l.value="",E(""),requestAnimationFrame(()=>l.focus())},M=()=>{n.classList.remove("open"),o.setAttribute("aria-expanded","false")};o.addEventListener("click",()=>{n.classList.contains("open")?M():$()}),l.addEventListener("input",()=>E(l.value)),l.addEventListener("keydown",L=>{if(L.key==="ArrowDown")L.preventDefault(),b(u+1);else if(L.key==="ArrowUp")L.preventDefault(),b(u-1);else if(L.key==="Enter"){L.preventDefault();let a=i();a[u]&&a[u].click()}else L.key==="Escape"&&(M(),o.focus())}),m.forEach(L=>{L.addEventListener("click",()=>{n.dataset.value=L.dataset.name,n.querySelector(".pick-cur").textContent=L.dataset.name,M(),s()}),L.addEventListener("mousemove",()=>{let a=i().indexOf(L);a>=0&&a!==u&&(u=a,m.forEach(r=>r.classList.remove("hover")),L.classList.add("hover"))})})}document.addEventListener("click",e=>{document.querySelectorAll(".pick.open").forEach(s=>{if(!s.contains(e.target)){s.classList.remove("open");let n=s.querySelector(".pick-btn");n&&n.setAttribute("aria-expanded","false")}})});function Ye(e,s){let n=d("#cmp-wrap"),l=J.players.slice().sort((h,S)=>(h.rank!=null?h.rank:9999)-(S.rank!=null?S.rank:9999)||h.name.localeCompare(S.name)).map(h=>h.name);if(l.length<2){n.innerHTML=`<div class="empty">${t("cmp.notEnough")}</div>`;return}let m=B[e]?e:l[0],g=B[s]?s:l[1];g===m&&(g=l.find(h=>h!==m));let u=B[m],i=B[g],b=I.find(h=>h.name===m),E=I.find(h=>h.name===g),$=Se(u.glicko,i.glicko,i.rd),M=Se(i.glicko,u.glicko,u.rd),L=Math.round($/($+M)*1e3)/10,a=Math.round(1e3-L*10)/10,r=G().filter(h=>h.a===m&&h.b===g||h.a===g&&h.b===m).map(h=>{let S=h.a===m,R=S?h.sa:h.sb,_=S?h.sb:h.sa;return{fa:R,fb:_,res:R>_?"W":R<_?"L":"D",date:h.date}}),p=r.reduce((h,S)=>(S.res==="W"?h.w++:S.res==="L"?h.l++:h.d++,h),{w:0,l:0,d:0}),c=xt(l),y=(h,S,R)=>`
    <div class="pick" id="${h}" data-value="${f(S)}">
      <button type="button" class="pick-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="${f(R)}">
        <span class="pick-cur">${f(S)}</span>
        <svg class="pick-caret" width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true"><path d="M1.2 1.2 5.5 5.6 9.8 1.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="pick-menu">
        <input class="pick-search" type="text" autocomplete="off" spellcheck="false"
          placeholder="${t("cmp.searchPlaceholder")}" aria-label="${f(R)}">
        <div class="pick-list" role="listbox" aria-label="${f(R)}">
          ${c.map(_=>{let ee=B[_];return`<button type="button" class="pick-opt${_===S?" on":""}" role="option" data-name="${f(_)}" aria-selected="${_===S?"true":"false"}">
              <span class="pick-n">${f(_)}</span>
              <span class="pick-meta mono">${ee&&ee.rating!=null?ee.rating.toFixed(1):""}</span>
            </button>`}).join("")}
          <div class="pick-empty">${t("cmp.noResults")}</div>
        </div>
      </div>
    </div>`,w=(h,S,R,_,ee)=>`
    <div class="cmp-trow">
      <div class="va mono${_?" win":""}">${S}</div>
      <div class="k">${h}</div>
      <div class="vb mono${ee?" win":""}">${R}</div>
    </div>`,v='<span style="color:var(--dimmer)">\u2014</span>';n.innerHTML=`
    <div class="kicker anim">${t("cmp.versus")}</div>
    <h2 class="section-head anim" style="margin:6px 0 2px">${t("cmp.title")}</h2>
    <div class="cmp-pickers anim">
      ${y("cmp-a",m,t("cmp.firstPlayer"))}
      <button class="btn btn-ghost" id="cmp-swap" style="width:auto;margin:0" title="${t("cmp.swap")}">\u21C4</button>
      ${y("cmp-b",g,t("cmp.secondPlayer"))}
    </div>
    <div class="cmp-share anim">
      <button class="btn btn-ghost" id="cmp-copy" style="width:auto;margin:0">${t("cmp.copyLink")}</button>
      <span class="caption" id="cmp-copy-msg"></span>
    </div>

    <div class="cmp-hero anim">
      <div class="cmp-side a">
        <div class="cmp-sub">${b?t("cmp.rankN",{n:b.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${U(m)}">${f(m)}</a></div>
        <div class="cmp-rating mono">${u.provisional?re(u):u.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",u.matches,{rd:u.rd.toFixed(1)})}</div>
      </div>
      <div class="cmp-vs">
        <div class="vs-mark">${t("cmp.vsMark")}</div>
        <div class="mono" style="font-size:11px;color:var(--dimmer)">${t("cmp.h2hShort",{n:r.length})}</div>
      </div>
      <div class="cmp-side b">
        <div class="cmp-sub">${E?t("cmp.rankN",{n:E.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${U(g)}">${f(g)}</a></div>
        <div class="cmp-rating mono">${i.provisional?re(i):i.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",i.matches,{rd:i.rd.toFixed(1)})}</div>
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.probTitle")} <span class="n">${t("cmp.probSub")}</span></h3>
      <div class="cmp-prob-labels">
        <span style="color:var(--gold)">${f(m)} ${L.toFixed(1)}%</span>
        <span style="color:var(--blue)">${a.toFixed(1)}% ${f(g)}</span>
      </div>
      <div class="cmp-probbar"><i class="pa" style="width:${L}%"></i><i class="pb" style="width:${a}%"></i></div>
      <div class="cmp-prob-note">${t("cmp.probNote")}</div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.tale")}</h3>
      <div class="cmp-table">
        ${w(t("cmp.rating"),he(u),he(i),!u.provisional&&u.rating>i.rating,!i.provisional&&i.rating>u.rating)}
        ${w(t("cmp.rank"),b?"#"+b.rank:v,E?"#"+E.rank:v,b&&E&&b.rank<E.rank,b&&E&&E.rank<b.rank)}
        ${w(t("cmp.rdUnc"),u.rd.toFixed(1),i.rd.toFixed(1),u.rd<i.rd,i.rd<u.rd)}
        ${w(t("cmp.glicko"),u.glicko.toFixed(1),i.glicko.toFixed(1),u.glicko>i.glicko,i.glicko>u.glicko)}
        ${w(t("cmp.record"),`<span style="color:var(--green)">${u.w}${q("W")}</span> <span style="color:var(--red)">${u.l}${q("L")}</span> ${u.d}${q("D")}`,`<span style="color:var(--green)">${i.w}${q("W")}</span> <span style="color:var(--red)">${i.l}${q("L")}</span> ${i.d}${q("D")}`,u.winPct>i.winPct,i.winPct>u.winPct)}
        ${w(t("cmp.winRate"),u.winPct+"%",i.winPct+"%",u.winPct>i.winPct,i.winPct>u.winPct)}
        ${w(t("cmp.matchesPlayed"),u.matches,i.matches,!1,!1)}
        ${w(t("cmp.uniqueOpp"),u.opponents,i.opponents,u.opponents>i.opponents,i.opponents>u.opponents)}
        ${w(t("cmp.avgOppRating"),u.avgOpp.toFixed(1),i.avgOpp.toFixed(1),u.avgOpp>i.avgOpp,i.avgOpp>u.avgOpp)}
        ${w(t("cmp.h2h"),`${p.w}${q("W")} \u2013 ${p.l}${q("L")} \u2013 ${p.d}${q("D")}`,`${p.l}${q("W")} \u2013 ${p.w}${q("L")} \u2013 ${p.d}${q("D")}`,p.w>p.l,p.l>p.w)}
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.prevMeetings")} <span class="n">${tp("cmp.meetings",r.length)}</span></h3>
      <div class="match-list">
        ${r.map(h=>`
          <div class="match-row">
            <div class="res-chip ${h.res}">${q(h.res)}</div>
            <div class="who">${f(m)}</div>
            <div class="score mono">${h.fa} \u2013 ${h.fb}</div>
            <div class="who opp"><a href="#/player/${U(g)}" style="color:var(--blue)">${f(g)}</a></div>
            <div class="date mono">${h.date||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("cmp.neverMet")}</div>`}
      </div>
      <div class="caption" style="margin-top:12px">${t("cmp.legacyNote")}</div>
    </div>`;let k=()=>{let h=d("#cmp-a").dataset.value,S=d("#cmp-b").dataset.value,R="#/compare/"+U(h)+"/"+U(S);location.hash!==R&&(Me=!0,location.hash=R),Ye(h,S)};Be("cmp-a",k),Be("cmp-b",k),d("#cmp-swap").addEventListener("click",()=>{let h=d("#cmp-a"),S=d("#cmp-b"),R=h.dataset.value;h.dataset.value=S.dataset.value,S.dataset.value=R,k()}),d("#cmp-copy").addEventListener("click",()=>{let h=location.href.split("#")[0]+"#/compare/"+U(m)+"/"+U(g),S=()=>{d("#cmp-copy-msg").textContent=t("cmp.linkCopied")};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(h).then(S,()=>{d("#cmp-copy-msg").textContent=h}):d("#cmp-copy-msg").textContent=h})}var Me=!1;function St(e){let s=B[e],n=d("#page-player");if(!s){n.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("pl.notFound",{name:f(e)})}</div></div></div>`;return}let o=I.find(i=>i.name===e),l=qe(e),m=l.slice(0,10),g=st(e),u=Math.max(3,Math.min(100,100-s.rd/120*100));n.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">${t("pl.back")}</a>
    <div class="player-hero anim">
      <div class="player-top">
        ${o?be(o.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${f(s.name)}</div>
          <div class="player-rankline">
            ${o?t("pl.rankedOf",{rank:o.rank,total:I.length}):t("pl.unranked")}
            ${s.provisional?` \xB7 <span class="tag prov">${t("tag.provisional")}</span>`:""}
            ${s.inactive?` \xB7 <span class="tag inact">${t("tag.inactive")}</span>`:""}
          </div>
        </div>
        <div class="player-rating-block">
          <div class="lbl">${s.provisional?t("pl.estRange"):t("pl.visible")}</div>
          <div class="big mono${s.provisional?" prov-range":""}" id="pv-rating">${s.provisional?re(s):"0"}</div>
          ${Ce(s)}
          <div class="rd-bar">
            <div class="bar-track"><div class="bar-fill" style="width:${u}%"></div></div>
            <div class="caption"><span>${t("pl.certainty")}</span><span class="mono">RD ${s.rd.toFixed(1)}</span></div>
          </div>
        </div>
      </div>
      <div class="pstat-grid">
        <div class="pstat"><div class="k">${t("pl.glicko")}</div><div class="v mono">${s.glicko.toFixed(1)}</div></div>
        <div class="pstat"><div class="k">${t("pl.matches")}</div><div class="v mono">${s.matches}</div></div>
        <div class="pstat"><div class="k">${t("pl.record")}</div><div class="v mono" style="font-size:19px"><span style="color:var(--green)">${s.w}${q("W")}</span> <span style="color:var(--red)">${s.l}${q("L")}</span> <span style="color:var(--dim)">${s.d}${q("D")}</span></div></div>
        <div class="pstat"><div class="k">${t("pl.winRate")}</div><div class="v mono">${s.winPct}%</div></div>
        <div class="pstat"><div class="k">${t("pl.opponents")}</div><div class="v mono">${s.opponents}</div></div>
        <div class="pstat"><div class="k">${t("pl.avgOppRating")}</div><div class="v mono">${s.avgOpp.toFixed(1)}</div></div>
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.recentForm")} <span class="n">${t("pl.lastN",{n:Math.min(10,l.length)})}</span></h3>
      <div class="form-strip">
        ${m.map((i,b)=>`<div class="form-pill ${i.res}" style="animation-delay:${b*55}ms"
           title="${t("pl.vsOpp",{opp:f(i.opp)})} ${i.for_}-${i.against}">${q(i.res)}</div>`).join("")||`<span class="empty">${t("pl.noGames")}</span>`}
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.matchHistory")} <span class="n">${tp("pl.nGames",l.length)}</span></h3>
      <div class="match-list">
        ${l.map(i=>`
          <div class="match-row">
            <div class="res-chip ${i.res}">${q(i.res)}</div>
            <div class="who">${f(s.name)}</div>
            <div class="score mono">${i.for_} \u2013 ${i.against}</div>
            <div class="who opp"><a href="#/player/${U(i.opp)}" style="color:var(--blue)">${f(i.opp)}</a></div>
            <div class="date mono">${i.date||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.h2h")} <span class="n">${tp("pl.nOpponents",g.length)}</span></h3>
      <div class="h2h-grid">
        ${g.map(i=>`
          <div class="h2h-card" data-goto="${f(i.opp)}">
            <div class="opp">${f(i.opp)}</div>
            <div class="rec mono"><span class="w">${i.w}${q("W")}</span> \xB7 <span class="l">${i.l}${q("L")}</span> \xB7 <span>${i.d}${q("D")}</span> \xB7 ${t("pl.pts",{pf:i.pf,pa:i.pa})}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>
  </div>`,s.provisional||Re(d("#pv-rating"),s.rating,{dec:1,dur:900}),$e()}function Et(){ze();let e=d("#gm-body"),s=G();d("#gm-count").textContent=tp("gm.count",s.length),e.innerHTML=s.map(n=>{let o=n.sa>n.sb,l=n.sb>n.sa;return`
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
      <div class="dt mono">${n.admin&&!n.published?`<span class="tag fresh">${t("tag.new")}</span>`:n.date||t("misc.historical")}</div>
    </div>`}).join("")}function Mt(){let e=J.players.filter(s=>s.provisional).sort((s,n)=>n.rating-s.rating);d("#roster-grid").innerHTML=e.map(s=>{let n=Math.min(100,Math.round(Math.min(1,s.matches/5)*50+Math.min(1,s.opponents/3)*50));return`
    <div class="roster-card reveal" data-goto="${f(s.name)}">
      <div class="top">
        <div class="nm">${f(s.name)}</div>
        <svg class="shield" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"/></svg>
      </div>
      <div class="rating"><span class="unit">${t("roster.estRange")}</span><span class="big prov-range">${re(s)}</span></div>
      <div class="req-row"><span>${t("roster.matches")}</span><span class="${s.matches>=5?"ok":""}">${s.matches} / 5 ${s.matches>=5?"\u2713":""}</span></div>
      <div class="req-row"><span>${t("roster.opponents")}</span><span class="${s.opponents>=3?"ok":""}">${s.opponents} / 3 ${s.opponents>=3?"\u2713":""}</span></div>
      <div class="prog-track"><div class="prog-fill" data-w="${n}"></div></div>
      <div class="prog-label">${t("roster.progress",{pct:n})}</div>
    </div>`}).join(""),requestAnimationFrame(()=>C("#roster-grid .prog-fill").forEach(s=>{s.style.width=s.dataset.w+"%"}))}function Rt(){let e=J.players,s=I.slice().sort((v,k)=>k.winPct-v.winPct).slice(0,10),n=e.slice().sort((v,k)=>k.matches-v.matches).slice(0,10),o=[];G().forEach(v=>{let k=B[v.a],h=B[v.b];if(!k||!h)return;let S=k.rating-h.rating;if(v.sa===v.sb)return;let R=v.sa>v.sb?v.a:v.b,_=Math.abs(S);(S<0&&R===v.a||S>0&&R===v.b)&&o.push({winner:R,loser:R===v.a?v.b:v.a,gap:_,score:R===v.a?`${v.sa}-${v.sb}`:`${v.sb}-${v.sa}`})}),o.sort((v,k)=>k.gap-v.gap);let l={};G().forEach(v=>{let k=[v.a,v.b].sort().join(" vs ");l[k]=(l[k]||0)+1});let m=Object.entries(l).sort((v,k)=>k[1]-v[1]).slice(0,10),g=e.map(v=>v.rating),u=Math.min(...g),i=Math.max(...g),b=8,E=(i-u)/b||1,$=Array.from({length:b},()=>0);g.forEach(v=>{$[Math.min(b-1,Math.max(0,Math.floor((v-u)/E)))]++});let M=Math.max(...$,1),L=$.map((v,k)=>{let h=Math.round((u+k*E)/10)*10,S=Math.round((u+(k+1)*E)/10)*10;return`
    <div class="hcol" title="${tp("an.histTip",v,{lo:h,hi:S})}">
      <div class="hbar" data-h="${Math.round(v/M*100)}"></div>
      <div class="hlbl">${h}\u2013${S}</div>
    </div>`}).join(""),a=e.slice().sort((v,k)=>k.opponents-v.opponents).slice(0,8),r=Math.max(...a.map(v=>v.opponents),1),p=a.map(v=>`
    <div class="mrow reveal" data-goto="${f(v.name)}">
      <div class="nm">${f(v.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(v.opponents/r*100)}"></div></div>
      <div class="val mono">${v.opponents}</div>
    </div>`).join(""),c=(v,k,h)=>v.map((S,R)=>`
    <div class="an-row reveal" data-goto="${f(S.name)}">
      <div class="idx mono">${R+1}</div>
      <div class="nm">${f(S.name)}</div>
      <div class="val mono">${k(S)}</div>
      <div class="unit mono">${h(S)}</div>
    </div>`).join(""),y=v=>tp("an.nMatches",v.matches);d("#an-grid").innerHTML=`
    <div class="an-panel">
      <div class="head"><h3>${t("an.topWinRate")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${c(s,v=>v.winPct+"%",y)}
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
      ${o.length?o.slice(0,8).map((v,k)=>`
        <div class="an-row reveal" data-goto="${f(v.winner)}">
          <div class="idx mono">${k+1}</div>
          <div class="nm">${f(v.winner)} <span style="color:var(--dimmer);font-weight:500">${t("an.def")}</span> ${f(v.loser)}</div>
          <div class="val mono">${v.score}</div>
          <div class="unit mono">${t("an.plusPts",{n:Math.round(v.gap)})}</div>
        </div>`).join(""):`<div class="empty">${t("an.noUpsets")}</div>`}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.rivalries")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${m.map(([v,k],h)=>`
        <div class="an-row reveal">
          <div class="idx mono">${h+1}</div>
          <div class="nm">${v.split(" vs ").map(f).join(` <span style="color:var(--dimmer);font-weight:500">${t("vs")}</span> `)}</div>
          <div class="val mono">${k}</div>
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
    </div>`;let w=()=>{C("#an-grid .hbar").forEach(v=>{v.style.height=v.dataset.h+"%"}),C("#an-grid .abar").forEach(v=>{v.style.width=v.dataset.w+"%"})};requestAnimationFrame(w),setTimeout(w,140),$e()}function Tt(){d("#settings-body").innerHTML=Ne().map(e=>`
    <tr><td><b>${f(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${f(e.desc)}</div></td>
        <td class="val">${f(String(e.value))}</td></tr>`).join("")}function qt(){return Array.from({length:11},(e,s)=>({q:t("faq.q"+(s+1)),a:t("faq.a"+(s+1))}))}function fe(){let e=D().faq;return Array.isArray(e)&&e.length?e:qt()}function Ct(){d("#faq-list").innerHTML=fe().map((e,s)=>`
    <div class="faq-item reveal" data-faq="${s}">
      <button class="faq-q" aria-expanded="false">
        <span>${f(String(e.q||""))}</span>
        <svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="faq-a"><div class="faq-a-in">${f(String(e.a||""))}</div></div>
    </div>`).join(""),$e()}document.addEventListener("click",e=>{let s=e.target.closest(".faq-q");if(!s)return;let n=s.closest(".faq-item"),o=n.classList.contains("open");C(".faq-item.open").forEach(l=>{l.classList.remove("open"),l.querySelector(".faq-q").setAttribute("aria-expanded","false")}),o||(n.classList.add("open"),s.setAttribute("aria-expanded","true"))});function j(){let e=d("#admin-wrap");if(!lt()){e.innerHTML=`
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
    </div>`;let a=async()=>{let r=d("#admin-pw").value;try{let p=await fetch(dt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:r})});if(p.ok){let c=await p.json().catch(()=>({}));rt(c.token||r,d("#admin-remember").checked),j(),x("Welcome back, commander.");return}if(p.status===429){x("Too many attempts \u2014 wait a few minutes.");return}}catch{}d("#admin-pw").style.borderColor="var(--red)",x("Wrong password.")};d("#admin-auth").addEventListener("click",a),d("#admin-pw").addEventListener("keydown",r=>{r.key==="Enter"&&a()});return}let n=Y(),o=We().length,l=D(),m='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',g=Object.entries(l.aliases).map(([a,r])=>`
    <div class="log-item">
      <div class="txt"><b>${f(a)}</b> \u2192 <b>${f(r)}</b>${l.aliasNotes&&l.aliasNotes[a]?` <span style="color:var(--dimmer)">\u2014 ${f(l.aliasNotes[a])}</span>`:""}</div>
      <button class="icon-btn" data-alias-del="${f(a)}" title="Remove name fix">${m}</button>
    </div>`).join("")||'<div class="empty">No name fixes yet.</div>',u=l.inactive.map(a=>`
    <div class="log-item">
      <div class="txt"><b>${f(a)}</b> <span style="color:var(--dimmer)">\u2014 inactive</span></div>
      <button class="icon-btn" data-inact-del="${f(a)}" title="Mark active again">${m}</button>
    </div>`).join("")||'<div class="empty">Nobody marked inactive.</div>',i=Object.keys({...l.seeds||{},...l.seedGlicko||{},...l.seedRd||{}}).map(a=>`
    <div class="log-item">
      <div class="txt"><b>${f(a)}</b> \xB7 <span style="color:var(--dimmer)">old</span> <b class="mono">${f(String((l.seeds||{})[a]!=null?(l.seeds||{})[a]:"\u2014"))}</b>${(l.seedGlicko||{})[a]!=null?` \xB7 <span style="color:var(--dimmer)">glicko</span> <b class="mono">${f(String(l.seedGlicko[a]))}</b>`:""}${(l.seedRd||{})[a]!=null?` \xB7 <span style="color:var(--dimmer)">rd</span> <b class="mono">${f(String(l.seedRd[a]))}</b>`:""}</div>
      <button class="icon-btn" data-seed-del="${f(a)}" title="Remove seed">${m}</button>
    </div>`).join("")||'<div class="empty">No seed overrides \u2014 players start from the sheet values.</div>',b=Ne().map(a=>`
    <div class="set-row">
      <div class="lbl"><b>${f(a.name)}</b><div class="d">${f(String(a.desc||""))}</div></div>
      <input class="set-val mono" data-set-name="${f(a.name)}" value="${f(String(a.value))}">
    </div>`).join(""),E=a=>{let r=(a||"").trim().toLowerCase();return G().filter(c=>!r||c.a.toLowerCase().includes(r)||c.b.toLowerCase().includes(r)).slice(0,20).map(c=>`
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
      <div class="log-list" id="ov-inact-list" style="margin-top:12px">${u}</div>
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
      <div id="ov-settings">${b}</div>
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

  <datalist id="player-list">${J.players.map(a=>`<option value="${f(a.name)}">`).join("")}</datalist>`,d("#admin-lock").addEventListener("click",()=>{ct(),j()}),d("#admin-publish").addEventListener("click",()=>$()),d("#admin-sync").addEventListener("click",async()=>{let a=d("#admin-sync"),r=d("#admin-sync-status");a.disabled=!0,r.textContent="syncing\u2026";try{let p=await fetch(vt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:ne()})}),c=await p.json().catch(()=>({}));p.ok&&c.ok?(r.textContent=c.changed?`synced \u2713 ${c.matches} matches / ${c.players} players`:"already up to date \u2713",x(c.changed?"Sheet synced \u2014 the live site was updated.":"Site already matches the sheet.")):p.status===429?(r.textContent="rate limited",x("Too many attempts \u2014 wait a few minutes.")):(r.textContent="sync failed",x("Sync failed: "+(c.error||p.status)))}catch{r.textContent="network error",x("Sync failed (network).")}a.disabled=!1});async function $(a){let r=!!(a&&a.silent),p=ne()||(r?"":(window.prompt("Admin password:")||"").trim());if(!p){x(r?'Saved here \u2014 auto-publish needs a stored password. Use "Publish to everyone".':"Publish cancelled.");return}xe=!0;let c=D(),y={},w=[];for(let[h,S]of Object.entries(c.matchEdits||{}))h.startsWith("a:")&&(y[h]=S);for(let h of c.matchRemoved||[])h.startsWith("a:")&&w.push(h);let v=G().filter(h=>h.admin).map(h=>({a:h.a,b:h.b,sa:h.sa,sb:h.sb,date:h.date||""})),k={matches:v,aliases:c.aliases||{},aliasNotes:c.aliasNotes||{},aliasRemoved:c.aliasRemoved||[],inactive:c.inactive||[],seeds:c.seeds||{},seedGlicko:c.seedGlicko||{},seedRd:c.seedRd||{},seedRemoved:c.seedRemoved||[],settings:c.settings||{},matchEdits:y,matchRemoved:w,faq:c.faq!=null?c.faq:[]};try{let h=await fetch(ge,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:p,doc:k,message:`Publish match log (${v.length} matches)`})}),S=await h.json().catch(()=>({}));if(!h.ok||!S.ok){h.status===403&&sessionStorage.removeItem(Z),x("Publish failed: "+(S.error||"HTTP "+h.status));return}window.LB_PUB=k,window.LB_LOG=v,te([]),N({}),O(),r||j(),x(r?"Saved \u2014 live for everyone \u2713":"Published! Everyone sees it on their next visit.")}catch{x("Publish failed: network error.")}finally{xe=!1}}d("#admin-export").addEventListener("click",()=>{let a=new Blob([JSON.stringify(Y(),null,2)],{type:"application/json"}),r=document.createElement("a");r.href=URL.createObjectURL(a),r.download="match-log.json",r.click(),URL.revokeObjectURL(r.href),x("Log exported.")}),d("#adm-add").addEventListener("click",()=>{let a=d("#adm-a").value.trim(),r=d("#adm-b").value.trim(),p=parseInt(d("#adm-sa").value,10),c=parseInt(d("#adm-sb").value,10);if(!a||!r||a.toLowerCase()===r.toLowerCase()||!Number.isFinite(p)||!Number.isFinite(c)){x("Fill in both players and scores.");return}let y=Y();y.unshift({a,b:r,sa:p,sb:c,date:d("#adm-date")?d("#adm-date").value||new Date().toISOString().slice(0,10):new Date().toISOString().slice(0,10)}),te(y),O(),j(),x(`${a} ${p}\u2013${c} ${r} added \u2014 site recalculated live.`)}),d("#adm-list").addEventListener("click",a=>{let r=a.target.closest("[data-del]");if(!r)return;let p=Y();p.splice(parseInt(r.dataset.del,10),1),te(p),O(),j()}),d("#ov-alias-add").addEventListener("click",()=>{let a=d("#ov-alias-a").value.trim(),r=d("#ov-alias-b").value.trim(),p=(d("#ov-alias-note")||{}).value.trim();if(!a||!r){x("Fill both: the wrong name and the correct player.");return}let c=Object.keys(B).find(w=>w.toLowerCase()===r.toLowerCase())||r,y=A();N({...y,aliases:{...y.aliases||{},[a]:c},aliasNotes:p?{...y.aliasNotes||{},[a]:p}:y.aliasNotes||{},aliasRemoved:(y.aliasRemoved||[]).filter(w=>w!==a)}),O(),j(),x(`Name fix saved \u2014 "${a}" now counts as ${c}.`)}),d("#ov-alias-list").addEventListener("click",a=>{let r=a.target.closest("[data-alias-del]");if(!r)return;let p=r.dataset.aliasDel,c=A(),y={...c.aliases||{}},w={...c.aliasNotes||{}};delete y[p],delete w[p],N({...c,aliases:y,aliasNotes:w,aliasRemoved:[...new Set([...c.aliasRemoved||[],p])]}),O(),j(),x("Name fix removed.")}),d("#ov-inact-toggle").addEventListener("click",()=>{let a=d("#ov-inact-n").value.trim();if(!a){x("Type a player name first.");return}let r=A(),p=D().inactive||[],c=p.includes(a)?p.filter(y=>y!==a):[...p,a];N({...r,inactive:c}),O(),j(),x(c.includes(a)?`${a} marked inactive.`:`${a} marked active again.`)}),d("#ov-inact-list").addEventListener("click",a=>{let r=a.target.closest("[data-inact-del]");if(!r)return;let p=A();N({...p,inactive:(D().inactive||[]).filter(c=>c!==r.dataset.inactDel)}),O(),j()}),d("#ov-seed-add").addEventListener("click",()=>{let a=d("#ov-seed-n").value.trim(),r=d("#ov-seed-v").value.trim(),p=d("#ov-seed-g").value.trim(),c=d("#ov-seed-rd").value.trim();if(!a){x("Pick a player first.");return}if(r===""&&p===""&&c===""){x("Enter an Old 0\u2013100 rating, or a Starting Glicko / RD.");return}let y=A(),w={...y.seeds||{}},v={...y.seedGlicko||{}},k={...y.seedRd||{}};r!==""&&Number.isFinite(Number(r))?w[a]=Number(r):delete w[a],p!==""&&Number.isFinite(Number(p))?v[a]=Number(p):delete v[a],c!==""&&Number.isFinite(Number(c))?k[a]=Number(c):delete k[a],N({...y,seeds:w,seedGlicko:v,seedRd:k,seedRemoved:(y.seedRemoved||[]).filter(h=>h!==a)}),O(),j(),x(`Seed saved for ${a}.`)}),d("#ov-seed-list").addEventListener("click",a=>{let r=a.target.closest("[data-seed-del]");if(!r)return;let p=r.dataset.seedDel,c=A(),y={...c.seeds||{}};delete y[p];let w={...c.seedGlicko||{}};delete w[p];let v={...c.seedRd||{}};delete v[p],N({...c,seeds:y,seedGlicko:w,seedRd:v,seedRemoved:[...new Set([...c.seedRemoved||[],p])]}),O(),j()}),d("#ov-settings").addEventListener("change",a=>{let r=a.target.closest("[data-set-name]");if(!r)return;let p=A();N({...p,settings:{...p.settings||{},[r.dataset.setName]:r.value}}),O(),j(),x("Setting applied \u2014 everything recalculated.")}),d("#ov-set-reset").addEventListener("click",()=>{let a=A();N({...a,settings:{}}),O(),j(),x("Settings back to the master sheet values.")}),d("#ov-mq").addEventListener("input",()=>{d("#ov-mresults").innerHTML=E(d("#ov-mq").value)}),d("#ov-mresults").addEventListener("click",a=>{let r=a.target.closest("[data-msave]"),p=a.target.closest("[data-mdel]");if(r){let c=r.closest("[data-mkey]"),y=c.dataset.mkey,w=k=>c.querySelector(`[data-f="${k}"]`).value,v=A();N({...v,matchEdits:{...v.matchEdits||{},[y]:{sa:+w("sa"),sb:+w("sb"),date:w("date")}}}),O(),d("#ov-mresults").innerHTML=E(d("#ov-mq").value),x("Match fixed \u2014 ratings recalculated.")}else if(p){let c=p.dataset.mdel,y=A();N({...y,matchRemoved:[...new Set([...y.matchRemoved||[],c])]}),O(),d("#ov-mresults").innerHTML=E(d("#ov-mq").value),x("Match deleted \u2014 ratings recalculated.")}}),d("#pl-add").addEventListener("click",()=>{let a=d("#pl-name").value.trim(),r=d("#pl-opp").value.trim(),p=parseInt(d("#pl-sa").value,10),c=parseInt(d("#pl-sb").value,10);if(!a||!r||a.toLowerCase()===r.toLowerCase()||!Number.isFinite(p)||!Number.isFinite(c)){x("A player needs a name, an opponent and both scores \u2014 at least 1 result.");return}if(B[H(a)]){x(`${a} already exists \u2014 log a match for them instead.`);return}let y=Y();y.unshift({a,b:r,sa:p,sb:c,date:(d("#pl-date")||{}).value||new Date().toISOString().slice(0,10)}),te(y);let w=(d("#pl-seed")||{}).value.trim();if(w!==""&&Number.isFinite(Number(w))){let v=A();N({...v,seeds:{...v.seeds||{},[H(a)]:Number(w)},seedRemoved:(v.seedRemoved||[]).filter(k=>k!==H(a))})}O(),j(),x(`${a} added with their first result \u2014 ${p}\u2013${c} vs ${r}.`)}),d("#pl-del-btn").addEventListener("click",()=>{let a=d("#pl-del").value.trim(),r=H(a),p=G().filter(R=>R.a===r||R.b===r);if(!p.length){x(`No player called "${a}" with matches found.`);return}if(!window.confirm(`Remove ${r} and ${p.length} match${p.length===1?"":"es"}? This recalculates every rating.`))return;let c=A(),y=[...c.matchRemoved||[]],w=[];p.forEach(R=>{R.key.startsWith("l:")?w.push(parseInt(R.key.slice(2),10)):y.push(R.key)});let v=Y();w.sort((R,_)=>_-R).forEach(R=>v.splice(R,1)),te(v);let k={...c.seeds||{}},h={...c.seedGlicko||{}},S={...c.seedRd||{}};delete k[r],delete h[r],delete S[r],N({...c,matchRemoved:[...new Set(y)],seeds:k,seedGlicko:h,seedRd:S,seedRemoved:[...new Set([...c.seedRemoved||[],r])],inactive:(D().inactive||[]).filter(R=>R!==r)}),O(),j(),x(`${r} removed with ${p.length} match${p.length===1?"":"es"}. Publish to make it public.`)});let M=()=>{let a=fe();d("#faq-admin-list").innerHTML=a.map((r,p)=>`
      <div class="log-item fix-row" data-faq-idx="${p}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${f(String(r.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${f(String(r.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${p}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${p}" title="Delete question">${m}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};M(),d("#faq-admin-list").addEventListener("click",a=>{let r=a.target.closest("[data-faq-save]"),p=a.target.closest("[data-faq-del]"),c=fe().map(w=>({...w}));if(r){let w=r.closest("[data-faq-idx]");c[parseInt(r.dataset.faqSave,10)]={q:w.querySelector('[data-fq="q"]').value.trim(),a:w.querySelector('[data-fq="a"]').value.trim()}}else if(p)c.splice(parseInt(p.dataset.faqDel,10),1);else return;let y=A();N({...y,faq:c}),M(),x("Q&A updated \u2014 publish to make it public.")}),d("#faq-add").addEventListener("click",()=>{let a=d("#faq-new-q").value.trim(),r=d("#faq-new-a").value.trim();if(!a||!r){x("Fill in both the question and the answer.");return}let p=A();N({...p,faq:[...fe().map(c=>({...c})),{q:a,a:r}]}),M(),x("Question added.")}),d("#faq-reset").addEventListener("click",()=>{let a=A();N({...a,faq:null}),M(),x("Q&A back to the built-in list.")}),window._fbTimer&&(clearInterval(window._fbTimer),window._fbTimer=null);async function L(){let a=d("#fb-inbox");if(!a||document.querySelector("#fb-inbox [data-fb-reply]:focus"))return;let r=ne();if(!r){a.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let p=await fetch(V+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:r})}),c=await p.json().catch(()=>({}));if(!p.ok||!c.ok){a.innerHTML=`<div class="empty">Could not load messages (${f(c.error||"HTTP "+p.status)}).</div>`;return}let y=c.items||[],w={};a.querySelectorAll("[data-fb-id]").forEach(v=>{let k=v.querySelector("[data-fb-reply]");k&&k.value&&(w[v.dataset.fbId]=k.value)}),a.innerHTML=y.map(v=>`
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
        </div>`).join("")||'<div class="empty">No messages yet.</div>',a.querySelectorAll("[data-fb-id]").forEach(v=>{let k=v.querySelector("[data-fb-reply]");k&&w[v.dataset.fbId]!=null&&(k.value=w[v.dataset.fbId])})}catch{a.innerHTML='<div class="empty">Network error loading messages.</div>'}}L(),d("#fb-refresh").addEventListener("click",()=>{L(),x("Inbox refreshed.")}),window._fbTimer=setInterval(()=>{if(!d("#fb-inbox")){clearInterval(window._fbTimer),window._fbTimer=null;return}document.hidden||L()},2e3),d("#fb-inbox").addEventListener("click",async a=>{let r=a.target.closest("[data-fb-send]"),p=a.target.closest("[data-fb-del]"),c=a.target.closest("[data-fb-resolve]");if(!r&&!p&&!c)return;let y=a.target.closest("[data-fb-id]"),w=y.dataset.fbId,v=ne();try{if(c){let k=y.dataset.fbResolved!=="1";if(!(await fetch(V+"/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:v,id:w,resolved:k})}).then(S=>S.json())).ok){x("Could not update \u2014 try again.");return}x(k?"Marked as resolved \u2713":"Message reopened."),L()}else if(r){let k=y.querySelector("[data-fb-reply]").value;if(!(await fetch(V+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:v,id:w,reply:k})}).then(S=>S.json())).ok){x("Reply failed.");return}x("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(V+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:v,id:w})}).then(h=>h.json())).ok){x("Delete failed.");return}y.remove(),x("Message deleted.")}}catch{x("Network error.")}})}var ce=document.getElementById("fl-cards");ce&&window.matchMedia("(hover: hover)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(ce.addEventListener("pointermove",e=>{let s=e.target.closest&&e.target.closest(".fl-card");if(!s)return;let n=s.getBoundingClientRect(),o=(e.clientX-n.left)/n.width-.5,l=(e.clientY-n.top)/n.height-.5;s.classList.add("tilt"),s.style.transform=`perspective(1000px) rotateY(${(o*7).toFixed(2)}deg) rotateX(${(-l*6).toFixed(2)}deg) translateY(-6px)`}),ce.addEventListener("pointerleave",()=>{ce.querySelectorAll(".fl-card").forEach(e=>{e.style.transform="",e.classList.remove("tilt")})}));d("#search").addEventListener("input",e=>{let s=e.target.value.trim().toLowerCase(),n=d("#search-drop");if(!s){n.classList.remove("show");return}let o=J.players.filter(l=>l.name.toLowerCase().includes(s)).slice(0,8);if(!o.length){n.classList.remove("show");return}n.innerHTML=o.map(l=>`
    <a class="drop-row" href="#/player/${U(l.name)}">
      ${l.rank?be(l.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${f(l.name)}</span>        <span class="mono" style="margin-left:auto;color:var(--dim)">${he(l,!0)}</span>
    </a>`).join(""),n.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||d("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(d("#search-drop").classList.remove("show"),d("#search").value="")});var V=ge.replace(/\/publish$/,"/feedback"),we="tt1v1_fb_tickets";function Ot(){try{return JSON.parse(localStorage.getItem(we)||"[]")}catch{return[]}}function Nt(e){let s=Ot();s.push({id:e,ts:Date.now()});try{localStorage.setItem(we,JSON.stringify(s.slice(-20)))}catch{}}function At(){let e=d("#fb-overlay"),s=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>d("#fb-msg").focus(),180)},n=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};d("#fab-feedback").addEventListener("click",s),d("#fb-close").addEventListener("click",n),d("#fb-done").addEventListener("click",n),e.addEventListener("click",i=>{i.target===e&&n()}),document.addEventListener("keydown",i=>{i.key==="Escape"&&e.classList.contains("show")&&n()});let o=d("#faq-feedback-btn");o&&o.addEventListener("click",s);let l=d("#fb-msg"),m=d("#fb-count-n");l.addEventListener("input",()=>{m.textContent=String(l.value.length);try{localStorage.setItem("tt1v1_fb_draft",l.value)}catch{}});try{let i=localStorage.getItem("tt1v1_fb_draft");i&&(l.value=i,m.textContent=String(i.length))}catch{}let g=d("#fb-send");g.addEventListener("click",async()=>{let i=l.value.trim();if(i.length<5){l.focus(),l.classList.add("fb-nudge"),setTimeout(()=>l.classList.remove("fb-nudge"),500),x(t("fb.writeFirst"));return}g.classList.add("busy"),g.disabled=!0;try{let b=await fetch(V,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:d("#fb-name").value.trim(),contact:d("#fb-contact").value.trim(),message:i})}),E=await b.json().catch(()=>({}));if(!b.ok||!E.ok){x(t("fb.couldNotSend",{err:E.error||"HTTP "+b.status}));return}Nt(E.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}d("#fb-ticket-code").textContent=E.id,d("#fb-view-form").hidden=!0,d("#fb-view-done").hidden=!1}catch{x(t("fb.netError"))}finally{g.classList.remove("busy"),g.disabled=!1}});let u=document.querySelector(".fb-ticket");u&&u.addEventListener("click",async()=>{let i=(d("#fb-ticket-code").textContent||"").trim();if(!i||i==="\u2014")return;try{await navigator.clipboard.writeText(i)}catch{let $=document.createElement("textarea");$.value=i,document.body.appendChild($),$.select();try{document.execCommand("copy")}catch{}$.remove()}let b=d("#fb-copied");b&&(b.classList.add("show"),clearTimeout(window._fbCopiedT),window._fbCopiedT=setTimeout(()=>b.classList.remove("show"),1800)),x(t("fb.ticketCopied"))}),d("#fb-check").addEventListener("click",async()=>{let i=d("#fb-ticket-in").value.trim(),b=d("#fb-reply-out");if(i){b.classList.add("show"),b.textContent=t("fb.checking");try{let E=await fetch(V+"/status?id="+encodeURIComponent(i)),$=await E.json().catch(()=>({}));if(!E.ok||!$.ok){b.textContent=t("fb.noTicket");return}b.innerHTML=$.resolved?`${t("fb.statusResolved")}${$.reply?`<br>${t("fb.replyFrom",{reply:f($.reply)})}`:""}`:$.reply?t("fb.replyFrom",{reply:f($.reply)}):t("fb.statusPending",{status:f($.status)})}catch{b.textContent=t("fb.netErrorShort")}}})}function jt(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let s=null,n=()=>{e.classList.remove("show"),s=null};document.addEventListener("mouseover",o=>{let l=o.target.closest&&o.target.closest("[title],[data-tip]");if(!l)return;l.hasAttribute("title")&&(l.setAttribute("data-tip",l.getAttribute("title")),l.removeAttribute("title"));let m=l.getAttribute("data-tip");if(!m)return;s=l,e.textContent=m;let g=l.getBoundingClientRect(),u=g.top<52;e.classList.toggle("below",u),e.style.left=Math.max(10,Math.min(window.innerWidth-10,g.left+g.width/2))+"px",e.style.top=(u?g.bottom+8:g.top-8)+"px",e.classList.add("show")}),document.addEventListener("mouseout",o=>{if(!s)return;let l=o.relatedTarget;l&&l.closest&&l.closest("[title],[data-tip]")===s||n()}),window.addEventListener("scroll",n,{passive:!0})}var De;function x(e){let s=d("#toast");s.textContent=e,s.classList.add("show"),clearTimeout(De),De=setTimeout(()=>s.classList.remove("show"),2600)}var se;function $e(){se&&se.disconnect(),se=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&(s.target.classList.add("in"),C(".cu",s.target).forEach(n=>Re(n,parseFloat(n.dataset.target),{dec:parseInt(n.dataset.dec||0)})),se.unobserve(s.target))})},{threshold:.12}),C(".reveal").forEach(e=>se.observe(e))}(function(){let s=d("#scroll-progress"),n=d("#to-top"),o=d("#page-home .hero-row"),l=document.querySelector(".topbar"),m=()=>{let g=window.scrollY,u=document.documentElement.scrollHeight-window.innerHeight;s&&(s.style.width=(u>0?g/u*100:0)+"%"),n&&n.classList.toggle("show",g>640),l&&l.classList.toggle("scrolled",g>10),o&&g<1400&&(o.style.transform=`translateY(${g*.14}px)`,o.style.opacity=String(Math.max(.3,1-g/950)))};window.addEventListener("scroll",m,{passive:!0}),n&&n.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),m()})();O();Ae();ye();At();jt();window.addEventListener("lb-lang",()=>{let e=window.scrollY,s=z,n={...P};if(ye(),d("#page-home").classList.contains("active")&&(s!=="all"||n.key!=="rank"||n.dir!==1)){z=s,P=n,C(".chip[data-filter]").forEach(l=>l.classList.toggle("on",l.dataset.filter===s)),C(".sortable").forEach(l=>l.classList.remove("sorted","asc"));let o=d(`.sortable[data-key="${n.key}"]`);o&&(o.classList.add("sorted"),n.dir===1&&o.classList.add("asc")),X(s,n.key,n.dir)}je(),window.scrollTo(0,e)});function de(e,s){let n=e.indexOf("window."+s);if(n<0)return null;let o=e.indexOf("=",n);for(;o<e.length&&"{[".indexOf(e[o])<0;)o++;let l=0,m=!1,g="",u=!1;for(let i=o;i<e.length;i++){let b=e[i];if(m){u?u=!1:b==="\\"?u=!0:b===g&&(m=!1);continue}if(b==='"'||b==="'"){m=!0,g=b;continue}if(b==="{"||b==="[")l++;else if((b==="}"||b==="]")&&(l--,l<=0))return JSON.parse(e.slice(o,i+1))}return null}async function ke(e){try{let s="cb="+Date.now(),[n,o]=await Promise.all([fetch("data.js?"+s,{cache:"no-store"}),fetch("log.js?"+s,{cache:"no-store"})]);if(!n.ok||!o.ok)throw new Error("HTTP "+n.status+"/"+o.status);let l=await n.text(),m=await o.text(),g=de(l,"LB_DATA"),u=de(m,"LB_PUB")||(de(m,"LB_LOG")?{matches:de(m,"LB_LOG")}:null),i=[];if(g&&JSON.stringify(g)!==JSON.stringify(F)&&(F=g,window.LB_DATA=g,i.push("data")),u&&JSON.stringify(u)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=u,window.LB_LOG=u.matches||[],i.push("log")),i.length){O(),Ae(),ye();let b=d("#last-updated");b&&(b.textContent=t("home.lastUpdated",{when:F.generated||"today"}))}e&&x(i.length?t("misc.refreshed"):t("misc.upToDate"))}catch{e&&x(t("misc.refreshFailed"))}}ke(!1);var ve=d("#lb-refresh-btn");ve&&ve.addEventListener("click",async()=>{ve.classList.add("spinning"),await ke(!0),setTimeout(()=>ve.classList.remove("spinning"),400)});setInterval(()=>ke(!1),6e4);document.addEventListener("visibilitychange",()=>{document.hidden||ke(!1)});var Ve="tt1v1_fb_seen",W=null;function Pt(){try{return JSON.parse(localStorage.getItem(we)||"[]")}catch{return[]}}function Ze(){try{return JSON.parse(localStorage.getItem(Ve)||"{}")||{}}catch{return{}}}function It(){let e=d("#fab-feedback");if(e&&!e.querySelector(".fb-dot")){let n=document.createElement("span");n.className="fb-dot",e.appendChild(n),requestAnimationFrame(()=>n.classList.add("in"))}let s=d("#fb-view-form");if(s&&!d("#fb-reply-banner")&&W){let n=document.createElement("div");n.id="fb-reply-banner",n.innerHTML=`${t("fb.teamReplied",{id:f(W.id)})}
      <div class="r">${f(W.reply)}</div>
      <button class="btn btn-ghost" id="fb-got-it" style="margin-top:9px;padding:6px 13px">${t("fb.gotIt")}</button>`,s.insertAdjacentElement("beforebegin",n),requestAnimationFrame(()=>n.classList.add("show")),d("#fb-got-it").addEventListener("click",Ft)}}function Ft(){if(W){let n=Ze();n[W.id]=1;try{localStorage.setItem(Ve,JSON.stringify(n))}catch{}W=null}let e=d(".fb-dot");e&&(e.classList.add("out"),setTimeout(()=>e.remove(),420));let s=d("#fb-reply-banner");s&&(s.classList.remove("show"),setTimeout(()=>s.remove(),420))}async function Qe(){let e=Ze();W=null;let s=Pt(),n=s.slice(0,Math.max(0,s.length-6)),o=[];for(let l of s.slice(-6))try{let m=await fetch(V+"/status?id="+encodeURIComponent(l.id),{cache:"no-store"}),g=await m.json().catch(()=>({}));if(m.status===404||m.ok&&g.ok===!1)continue;o.push(l),m.ok&&g.ok&&g.reply&&!e[l.id]&&!W&&(W={id:l.id,reply:g.reply})}catch{o.push(l)}if(o.length!==s.slice(-6).length)try{localStorage.setItem(we,JSON.stringify([...n,...o]))}catch{}W&&It()}setTimeout(Qe,3500);setInterval(Qe,9e4);})();
