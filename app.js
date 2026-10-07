/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var D=window.LB_DATA,he="https://tierstats-publish.tierstats.workers.dev/publish",d=(e,s=document)=>s.querySelector(e),O=(e,s=document)=>[...s.querySelectorAll(e)],f=e=>String(e).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),G=e=>encodeURIComponent(String(e)),Ne=e=>decodeURIComponent(e);function Me(e,s,n={}){let l=n.dur||1200,o=n.dec||0,m=performance.now(),h=parseFloat(e.textContent)||0;function g(i){let y=Math.min(1,(i-m)/l),x=1-Math.pow(1-y,3);e.textContent=(h+(s-h)*x).toFixed(o),y<1&&requestAnimationFrame(g)}requestAnimationFrame(g),setTimeout(()=>{e.textContent=s.toFixed(o)},l+300)}var Ve='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',Ze='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function ge(e,s=""){let n=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",l=e<=3?e===1?Ve:Ze:"";return`<div class="rank-badge ${n} ${s}" title="${t("home.rankTip",{n:e})}">${l}<span class="num">${e}</span></div>`}var q=e=>t(e==="W"?"rec.wLetter":e==="L"?"rec.lLetter":"rec.dLetter"),_={},I=[],W={players:[],byName:{},qualified:[]},se={},ve={},Q={},$e=new Set;function Qe(){for(let n in se)delete se[n];let e=new Set(F().aliasRemoved||[]);Object.entries(D.aliases).forEach(([n,l])=>{e.has(n)||(se[n.toLowerCase()]=l)}),Object.entries(F().aliases||{}).forEach(([n,l])=>{se[String(n).toLowerCase()]=l});for(let n of Object.keys(ve))delete ve[n];for(let n of Object.keys(Q))delete Q[n];$e.clear();let s=(n,l)=>{Object.keys(n||{}).forEach(o=>{let m=B(o);m!==o&&(l[m]=n[o])}),Object.keys(n||{}).forEach(o=>{let m=B(o);m===o&&(l[m]=n[o])})};s(D.seeds,ve),s(D.prevRatings,Q),(D.inactiveList||[]).forEach(n=>$e.add(B(n)))}var B=e=>{let s=String(e).trim(),n=new Set;for(;;){let l=se[s.toLowerCase()];if(!l||l===s||n.has(s))return s;n.add(s),s=l}};function Ee(e){let s=[];return H().forEach(n=>{let l=(o,m,h)=>({opp:o,for_:m,against:h,res:m>h?"W":m<h?"L":"D",date:n.date});n.a===e?s.push(l(n.b,n.sa,n.sb)):n.b===e&&s.push(l(n.a,n.sb,n.sa))}),s}function Ke(e){let s={};return Ee(e).forEach(n=>{let l=s[n.opp]||(s[n.opp]={w:0,l:0,d:0,pf:0,pa:0});l[n.res.toLowerCase()]+=1,l.pf+=n.for_,l.pa+=n.against}),Object.entries(s).map(([n,l])=>({opp:n,...l})).sort((n,l)=>l.w+l.l+l.d-(n.w+n.l+n.d)||l.w-n.w)}function Xe(e){let s=_[e]||{};return s.provisional?`<span class="tag prov">${t("tag.provisional")}</span>`:s.inactive?`<span class="tag inact">${t("tag.inactive")}</span>`:""}function et(e){let s=Ee(e).slice(0,5).reverse();if(!s.length)return"";let n=s.map(l=>q(l.res)).join(" ");return`<span class="form" title="${t("form.title",{n:s.length,seq:n})}">${s.map(l=>`<i class="${l.res.toLowerCase()}">${q(l.res)}</i>`).join("")}</span>`}function Re(e){let s=e.delta!=null?e.delta:0;if(Math.abs(s)<.05)return"";let n=s>0,l=Math.abs(s).toFixed(1);return`<span class="delta ${n?"up":"down"}" title="${n?t("delta.upTitle",{n:l}):t("delta.downTitle",{n:l})}">${n?"\u25B2":"\u25BC"} ${l}</span>`}function tt(){let e=D.prevRanks||{},s=Object.keys(e);if(s.length){let o={};return s.forEach(m=>{o[B(m)]=e[m]}),o}let n={};I.forEach(o=>{Q[o.name]!=null&&(n[o.name]=Q[o.name])});let l={};return Object.entries(n).sort((o,m)=>m[1]-o[1]).forEach(([o],m)=>{l[o]=m+1}),l}function st(e,s){let n=s[e.name]!=null?s[e.name]:s[B(e.name)];if(n==null){let o=(D.newSince||{})[e.name];return!o||(Date.now()-Date.parse(o))/864e5>5?"":`<span class="mv new" title="${t("mv.newTitle")}">${t("mv.new")}</span>`}let l=n-e.rank;return l>0?`<span class="mv up" title="${tp("mv.up",l)}">\u25B2${l}</span>`:l<0?`<span class="mv down" title="${tp("mv.down",-l)}">\u25BC${-l}</span>`:""}function le(e){return`${Math.round(e.rating-100)} \u2013 ${Math.round(e.rating+100)}`}function fe(e,s){if(!e.provisional)return e.rating.toFixed(1);let n=s?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:le(e);return`<span class="prov-range" title="${t("rating.provTitle")}">${n}</span>`}var Ie="tt1v1_admin_log_v1",K="tt1v1_admin_ok",Z="tt1v1_admin_pw",at=()=>sessionStorage.getItem(K)==="1"||localStorage.getItem(K)==="1",ae=()=>sessionStorage.getItem(Z)||localStorage.getItem(Z)||"";function nt(e,s){s?(localStorage.setItem(K,"1"),localStorage.setItem(Z,e)):(sessionStorage.setItem(K,"1"),sessionStorage.setItem(Z,e),localStorage.removeItem(K),localStorage.removeItem(Z))}function it(){[sessionStorage,localStorage].forEach(e=>{e.removeItem(K),e.removeItem(Z)})}var je=null,ke=!1;function Fe(){ke||!ae()||(clearTimeout(je),je=setTimeout(()=>publishLog({silent:!0}),1500))}var ot=he.replace(/\/publish$/,"/verify"),lt=he.replace(/\/publish$/,"/sync");function Y(){try{return JSON.parse(localStorage.getItem(Ie)||"[]")}catch{return[]}}function ee(e){try{localStorage.setItem(Ie,JSON.stringify(e))}catch{}Fe()}var _e="tt1v1_admin_over_v1";function j(){try{return JSON.parse(localStorage.getItem(_e)||"{}")||{}}catch{return{}}}function N(e){try{localStorage.setItem(_e,JSON.stringify(e))}catch{}Fe()}function F(){let e=window.LB_PUB||{},s=j(),n=new Set([...e.aliasRemoved||[],...s.aliasRemoved||[]]),l=new Set([...e.seedRemoved||[],...s.seedRemoved||[]]),o=s.aliases||{},m={...s.seeds||{},...s.seedGlicko||{},...s.seedRd||{}},h=R=>Object.fromEntries(Object.entries(R||{}).filter(([a])=>!n.has(a)||o[a]!=null)),g=R=>Object.fromEntries(Object.entries(R||{}).filter(([a])=>!l.has(a)||m[a]!=null)),i=h({...e.aliases||{},...s.aliases||{}}),y=h({...e.aliasNotes||{},...s.aliasNotes||{}}),x=g({...e.seeds||{},...s.seeds||{}}),k=g({...e.seedGlicko||{},...s.seedGlicko||{}}),M=g({...e.seedRd||{},...s.seedRd||{}});return{aliases:i,aliasNotes:y,seeds:x,seedGlicko:k,seedRd:M,aliasRemoved:[...n].filter(R=>i[R]==null),seedRemoved:[...l].filter(R=>x[R]==null&&k[R]==null&&M[R]==null),settings:{...e.settings||{},...s.settings||{}},matchEdits:{...e.matchEdits||{},...s.matchEdits||{}},inactive:s.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...s.matchRemoved||[]])],faq:s.faq!=null?s.faq:e.faq!=null?e.faq:null}}function Be(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function H(){let e=F(),s=e.matchEdits||{},n=new Set(e.matchRemoved||[]),l=(k,M)=>{if(n.has(M))return null;let R=s[M],a=R?{...k,sa:R.sa,sb:R.sb,date:R.date!=null?R.date:k.date}:k;return{...a,a:B(a.a),b:B(a.b),sa:+a.sa,sb:+a.sb,key:M}},o=Y().map((k,M)=>l({...k,admin:!0,published:!1},"l:"+M)).filter(Boolean),m=Be().map((k,M)=>l({...k,admin:!0,published:!0},"p:"+M)).filter(Boolean),h=D.matches.map((k,M)=>l({...k,admin:!1,published:!1},"a:"+M)).filter(Boolean).reverse(),g=k=>{let M=k.a>k.b;return[M?k.b:k.a,M?k.a:k.b,M?k.sb:k.sa,M?k.sa:k.sb,k.date||""].join("|")},i={};h.forEach(k=>{let M=g(k);i[M]=(i[M]||0)+1});let y={};return o.concat(m).filter(k=>{let M=g(k);return y[M]=(y[M]||0)+1,y[M]>(i[M]||0)}).concat(h)}var E={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},pe=864e5,oe=Math.log(10)/400,De=e=>1/Math.sqrt(1+3*oe*oe*e*e/(Math.PI*Math.PI)),Le=(e,s,n)=>1/(1+Math.pow(10,-De(n)*(e-s)/400));function rt(e){let s=F().seeds||{};return s[e]!=null&&s[e]!==""?Number(s[e]):ve[e]}function dt(e){let s=(F().seedGlicko||{})[e],n=(F().seedRd||{})[e],l=s!=null&&s!==""?Number(s):null,o=n!=null&&n!==""?Number(n):null;if(l!=null||o!=null)return[l??E.unratedR,o??E.unratedRd];let m=rt(e);return m!=null?[Math.max(E.seedMid+(m-E.oldMid)*E.ptsPer,E.minSeed),E.knownRd]:[E.unratedR,E.unratedRd]}function Ae(e,s,n){let l=0,o=0;for(let[h,g,i]of n){let y=De(g),x=Le(e,h,g);l+=y*y*x*(1-x),o+=y*(i-x)}if(l*=oe*oe,l<=0)return[e,s];let m=1/(s*s)+l;return[e+oe/m*o,Math.sqrt(1/m)]}function ct(e,s){let n=Math.pow(10,s),l=e*n,o=Math.floor(l);return Math.abs(l-o-.5)<1e-6?(o%2===0?o:o+1)/n:Math.round(l)/n}var Te=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(E.periodDays*pe)),ne=Te(E.graceStart),vt={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function qe(){let e=F().settings||{};return(D.settings||[]).map(s=>({...s,value:Object.prototype.hasOwnProperty.call(e,s.name)?e[s.name]:s.value}))}function pt(){for(let e of qe()){let s=vt[e.name];if(!s)continue;if(s==="graceStart"){let l=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(l)&&(E.graceStart=l);continue}let n=Number(e.value);Number.isFinite(n)&&(E[s]=n)}ne=Te(E.graceStart),O(".cons-val").forEach(e=>{e.textContent=String(E.conservative)}),O(".min-matches-val").forEach(e=>{e.textContent=String(E.minMatches)}),O(".min-opp-val").forEach(e=>{e.textContent=String(E.minOpp)})}function mt(){pt(),Qe();let e={},s=a=>{if(!e[a]){let[r,p]=dt(a);e[a]={name:a,r,rd:p,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[a]},n=(a,r,p,c,b,w)=>{let v=s(a);v.games++,v.opps.add(r),p>c?v.w++:p<c?v.l++:v.d++,v.lastIdx=w,b&&(v.lastDate=b)},l={};for(let a of H()){if(a.date)continue;let r=a.a,p=a.b,c=a.sa>a.sb?1:a.sa<a.sb?0:.5;(l[r]=l[r]||[]).push([p,c]),(l[p]=l[p]||[]).push([r,1-c]),n(r,p,a.sa,a.sb,"",ne),n(p,r,a.sb,a.sa,"",ne)}let o={};for(let a in l)o[a]=[s(a).r,s(a).rd];for(let a in l){let[r,p]=Ae(o[a][0],o[a][1],l[a].map(([c,b])=>[o[c][0],o[c][1],b]));s(a).r=r,s(a).rd=p}let m=new Map;for(let a of H().filter(r=>r.date).slice().reverse()){let r=a.date,p=Te(r);m.has(p)||m.set(p,[]),m.get(p).push({a:B(a.a),b:B(a.b),sa:+a.sa,sb:+a.sb,date:r})}for(let a of[...m.keys()].sort((r,p)=>r-p)){for(let c in e){let b=e[c],w=a-(b.lastIdx==null?ne:b.lastIdx);w>0&&(b.rd=Math.min(Math.sqrt(b.rd*b.rd+E.growth*E.growth*w),E.maxRd))}let r={};for(let c of m.get(a)){let b=c.sa>c.sb?1:c.sa<c.sb?0:.5;(r[c.a]=r[c.a]||[]).push([c.b,b]),(r[c.b]=r[c.b]||[]).push([c.a,1-b]),n(c.a,c.b,c.sa,c.sb,c.date,a),n(c.b,c.a,c.sb,c.sa,c.date,a)}let p={};for(let c in r)p[c]=[s(c).r,s(c).rd];for(let c in r){let[b,w]=Ae(p[c][0],p[c][1],r[c].map(([v,$])=>[p[v][0],p[v][1],$]));s(c).r=b,s(c).rd=w}}let h=Object.values(e).map(a=>({name:a.name,glicko:a.r,rd:a.rd,rating:a.r-E.conservative*a.rd,matches:a.games,w:a.w,l:a.l,d:a.d,winPct:a.games?ct(a.w/a.games*100,1):0,opponents:a.opps.size,avgOpp:0,lastMatch:a.lastDate||"",provisional:!(a.games>=E.minMatches&&a.opps.size>=E.minOpp),inactive:!1})),g={};h.forEach(a=>{g[a.name]=a.glicko}),h.forEach(a=>{let r=0;e[a.name].opps.forEach(p=>{r+=g[p]!=null?g[p]:E.unratedR}),a.avgOpp=e[a.name].opps.size?r/e[a.name].opps.size:0});let i=Date.now(),y=Math.floor(i/(E.periodDays*pe));for(let a in e){let r=e[a],p=y-(r.lastIdx==null?ne:r.lastIdx);p>0&&(r.rd=Math.min(Math.sqrt(r.rd*r.rd+E.growth*E.growth*p),E.maxRd))}h.forEach(a=>{a.glicko=e[a.name].r,a.rd=e[a.name].rd,a.rating=a.glicko-E.conservative*a.rd;let r=Q[a.name];a.delta=r!=null?a.rating-r:0});let x=Date.parse(E.graceStart+"T00:00:00Z")+E.graceDays*pe,k=new Set([...$e,...F().inactive||[]]);h.forEach(a=>{a.inactive=k.has(a.name)||(a.lastMatch?i-Date.parse(a.lastMatch+"T00:00:00Z")>E.inactiveDays*pe:i>x)});let M=h.filter(a=>!a.provisional&&!a.inactive).sort((a,r)=>r.rating-a.rating);M.forEach((a,r)=>{a.rank=r+1}),h.sort((a,r)=>r.rating-a.rating);let R={};return h.forEach(a=>{R[a.name]=a}),{players:h,byName:R,qualified:M}}function C(){W=mt(),_=W.byName,I=W.qualified}var ut=["page-home","page-player","page-compare","page-matches","page-roster","page-analytics","page-method","page-faq","page-admin"];function be(){if(Se){Se=!1;return}let e=location.hash||"#/";ut.forEach(o=>d("#"+o).classList.remove("active"));let s="#/"+(e.split("/")[1]||"");O(".nav a, .foot-nav a").forEach(o=>{let m=o.getAttribute("href");o.classList.toggle("active",m===s||e==="#/"&&m==="#/")});let n=d("#nav-glide"),l=document.querySelector(".nav a.active");if(n&&l&&l.offsetWidth>0?(n.style.width=l.offsetWidth+"px",n.style.transform=`translateX(${l.offsetLeft}px)`,n.style.opacity="1"):n&&(n.style.opacity="0"),e==="#/compare"||e.startsWith("#/compare/")){let o=e.split("/").slice(2).map(Ne);Ge(o[0]||"",o[1]||""),d("#page-compare").classList.add("active"),window.scrollTo(0,0)}else e.startsWith("#/player/")?(wt(Ne(e.slice(9))),d("#page-player").classList.add("active"),window.scrollTo({top:0,behavior:"instant"in window?"instant":"auto"})):e==="#/matches"?($t(),d("#page-matches").classList.add("active"),window.scrollTo(0,0)):e==="#/roster"?(kt(),d("#page-roster").classList.add("active"),window.scrollTo(0,0)):e==="#/analytics"?(Lt(),d("#page-analytics").classList.add("active"),window.scrollTo(0,0)):e==="#/method"?(xt(),d("#page-method").classList.add("active"),window.scrollTo(0,0)):e==="#/faq"?(Mt(),d("#page-faq").classList.add("active"),window.scrollTo(0,0)):e==="#/admin"?(A(),d("#page-admin").classList.add("active"),window.scrollTo(0,0)):(Oe(),d("#page-home").classList.add("active"),requestAnimationFrame(yt));we()}window.addEventListener("hashchange",be);function Oe(){J="all",P={key:"rank",dir:1},O(".chip[data-filter]").forEach(i=>i.classList.toggle("on",i.dataset.filter==="all")),O(".sortable").forEach(i=>i.classList.remove("sorted","asc"));let e=d('.sortable[data-key="rank"]');e&&e.classList.add("sorted");let s=H().length,n=W.players.length,l=I[0],o=Math.round(I.reduce((i,y)=>i+y.rd,0)/I.length),m=d("#hero-chip-matches");m&&(m.innerHTML=t("home.chipMatches",{n:s})),d("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">${t("stat.ranked")}</div>
      <div class="v"><span class="cu" data-target="${I.length}">0</span><small>${t("stat.ofTotal",{n})}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.matches")}</div>
      <div class="v"><span class="cu" data-target="${s}">0</span></div></div>
    <div class="stat-card"><div class="k">${t("stat.highest")}</div>
      <div class="v"><span class="cu" data-target="${l.rating}" data-dec="1">0</span><small>${f(l.name)}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.avgRd")}</div>
      <div class="v"><span class="cu" data-target="${o}" data-dec="1">0</span><small>${t("stat.certainty")}</small></div></div>`;let h=[I[1],I[0],I[2]].filter(Boolean);d("#fl-cards").innerHTML=h.map(i=>`
    <div class="fl-card r${i.rank}${i.rank===1?" champ":""} reveal" data-goto="${f(i.name)}">
      <div class="fl-top">
        ${ge(i.rank)}
        <div class="rd">RD ${i.rd.toFixed(0)}</div>
      </div>
      ${i.rank===1?`<div class="champ-tag">${t("home.champTag")}</div>`:""}
      <div class="nm">${f(i.name)}</div>
      <div class="rating">
        <span class="unit">${t("home.ratingUnit")}</span>
        <div class="big-row"><span class="big">${Math.round(i.rating)}</span>${Re(i)}</div>
      </div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${i.winPct>=60?"":i.winPct>=40?"mid":"low"}" data-w="${i.winPct}"></div></div>
      </div>
      <div class="meta">
        <span><span class="w">${i.w}${q("W")}</span> <span class="l">${i.l}${q("L")}</span> ${i.d}${q("D")}</span>
        <span class="wc">${i.winPct}%</span>
        <span class="opp">${t("home.avgOpp",{n:Math.round(i.avgOpp)})}</span>
      </div>
    </div>`).join(""),requestAnimationFrame(()=>{O("#fl-cards .bar-fill").forEach(i=>{i.style.width=i.dataset.w+"%"})}),X(),He();let g=d("#last-updated");g&&(g.textContent=t("home.lastUpdated",{when:D.generated||"today"}))}function He(){let e=H().filter(s=>s.date).slice(0,10);d("#battles-grid").innerHTML=e.length?e.map(s=>{let n=s.sa>s.sb,l=s.sb>s.sa;return`
    <div class="battle-row reveal" data-goto="${f(n?s.a:s.b)}">
      <div class="who ${n?"win":"lose"}" data-goto="${f(s.a)}">${f(s.a)}</div>
      <div class="vs">${t("vs")}</div>
      <div class="who r ${l?"win":"lose"}" data-goto="${f(s.b)}">${f(s.b)}</div>
      <div class="sc mono"><span class="${n?"win":"lose"}">${s.sa}</span> \u2013 <span class="${l?"win":"lose"}">${s.sb}</span></div>
      <div class="dt">${s.date||(s.admin&&!s.published?t("battles.justNow"):t("misc.historical"))}</div>
    </div>`}).join(""):`<div class="empty" style="padding:26px;text-align:center;color:var(--dim);grid-column:1/-1">${t("battles.empty")}</div>`}var ft=500,ht="cubic-bezier(.22,.8,.24,1)",gt=12;function bt(e,s){matchMedia("(prefers-reduced-motion: reduce)").matches||O(".lb-row",e).forEach((n,l)=>{let o=s.get(n.dataset.name);if(o===void 0||typeof n.animate!="function")return;let m=o-n.getBoundingClientRect().top;Math.abs(m)<=1||n.animate([{transform:`translateY(${m}px)`},{transform:"none"}],{duration:ft,easing:ht,delay:Math.min(l*gt,220),fill:"backwards"})})}function X(e="all",s="rank",n=1){let l=d("#lb-body"),m=(e==="all"&&me?I:W.players).slice().map(i=>({...i,rank:i.rank!=null?i.rank:9999}));xe&&(m=m.filter(i=>i.name.toLowerCase().includes(xe))),e==="provisional"?m=m.filter(i=>(_[i.name]||{}).provisional):e==="inactive"?m=m.filter(i=>(_[i.name]||{}).inactive):e==="veterans"?m=m.filter(i=>i.matches>=15):e==="rising"&&(m=m.filter(i=>i.winPct>=60&&i.matches>=5)),m.sort((i,y)=>{let x=i[s],k=y[s];return(typeof x=="string"?x.localeCompare(k):x-k)*n});let h=new Map;O(".lb-row",l).forEach(i=>h.set(i.dataset.name,i.getBoundingClientRect().top));let g=tt();l.innerHTML=m.map(i=>`
    <div class="lb-row ${i.rank<=3?"top"+i.rank:""}" data-name="${f(i.name)}" data-goto="${f(i.name)}">
      <div class="rank">${i.rank<=I.length?ge(i.rank,"sm")+st(i,g):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="pname">${f(i.name)}</div></div>
      <div class="rating-cell mono">${Re(i)}${fe(i,!0)}</div>
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
      <div class="col-status">${Xe(i.name)||et(i.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?t("lb.emptyInactive"):e==="provisional"?t("lb.emptyProv"):t("lb.emptyNone")}</div>`,bt(l,h),requestAnimationFrame(()=>{O(".bar-fill",l).forEach(i=>{i.style.width=i.dataset.w+"%"})})}var J="all",P={key:"rank",dir:1},xe="",me=!0;function yt(){O("#stat-strip .cu").forEach(e=>Me(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),O(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}d("#lb-qual").addEventListener("click",()=>{me=!me,d("#lb-qual").classList.toggle("on",me),X(J,P.key,P.dir)});d("#lb-filter").addEventListener("input",e=>{xe=e.target.value.trim().toLowerCase(),X(J,P.key,P.dir)});var ie=d("#theme-toggle");function Ce(){if(!ie)return;let e=document.documentElement.dataset.theme==="light",s=e?t("top.toDark"):t("top.toLight");ie.setAttribute("aria-pressed",String(e)),ie.setAttribute("aria-label",s),ie.title=s}ie.addEventListener("click",()=>{let s=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=s;try{localStorage.setItem("tt1v1_theme",s)}catch{}Ce()});Ce();document.addEventListener("click",e=>{let s=e.target.closest(".chip");if(s&&s.dataset.filter){O(".chip[data-filter]").forEach(o=>o.classList.remove("on")),s.classList.add("on"),J=s.dataset.filter,X(J,P.key,P.dir);return}let n=e.target.closest(".sortable");if(n){let o=n.dataset.key;P.dir=P.key===o?-P.dir:1,P.key=o,O(".sortable").forEach(m=>m.classList.remove("sorted","asc")),n.classList.add("sorted"),P.dir===1&&n.classList.add("asc"),X(J,P.key,P.dir);return}let l=e.target.closest("[data-goto]");l&&(e.stopPropagation(),location.hash="#/player/"+G(l.dataset.goto))});function Ge(e,s){let n=d("#cmp-wrap"),o=W.players.slice().sort((u,S)=>(u.rank!=null?u.rank:9999)-(S.rank!=null?S.rank:9999)||u.name.localeCompare(S.name)).map(u=>u.name);if(o.length<2){n.innerHTML=`<div class="empty">${t("cmp.notEnough")}</div>`;return}let m=_[e]?e:o[0],h=_[s]?s:o[1];h===m&&(h=o.find(u=>u!==m));let g=_[m],i=_[h],y=I.find(u=>u.name===m),x=I.find(u=>u.name===h),k=Le(g.glicko,i.glicko,i.rd),M=Le(i.glicko,g.glicko,g.rd),R=Math.round(k/(k+M)*1e3)/10,a=Math.round(1e3-R*10)/10,r=H().filter(u=>u.a===m&&u.b===h||u.a===h&&u.b===m).map(u=>{let S=u.a===m,T=S?u.sa:u.sb,z=S?u.sb:u.sa;return{fa:T,fb:z,res:T>z?"W":T<z?"L":"D",date:u.date}}),p=r.reduce((u,S)=>(S.res==="W"?u.w++:S.res==="L"?u.l++:u.d++,u),{w:0,l:0,d:0}),c=u=>`<option value="${f(u)}"${u===m?" selected":""}>${f(u)}</option>`,b=u=>`<option value="${f(u)}"${u===h?" selected":""}>${f(u)}</option>`,w=(u,S,T,z,Ye)=>`
    <div class="cmp-trow">
      <div class="va mono${z?" win":""}">${S}</div>
      <div class="k">${u}</div>
      <div class="vb mono${Ye?" win":""}">${T}</div>
    </div>`,v='<span style="color:var(--dimmer)">\u2014</span>';n.innerHTML=`
    <div class="kicker anim">${t("cmp.versus")}</div>
    <h2 class="section-head anim" style="margin:6px 0 2px">${t("cmp.title")}</h2>
    <div class="cmp-pickers anim">
      <select id="cmp-a" aria-label="${t("cmp.firstPlayer")}">${o.map(c).join("")}</select>
      <button class="btn btn-ghost" id="cmp-swap" style="width:auto;margin:0" title="${t("cmp.swap")}">\u21C4</button>
      <select id="cmp-b" aria-label="${t("cmp.secondPlayer")}">${o.map(b).join("")}</select>
    </div>
    <div class="cmp-share anim">
      <button class="btn btn-ghost" id="cmp-copy" style="width:auto;margin:0">${t("cmp.copyLink")}</button>
      <span class="caption" id="cmp-copy-msg"></span>
    </div>

    <div class="cmp-hero anim">
      <div class="cmp-side a">
        <div class="cmp-sub">${y?t("cmp.rankN",{n:y.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${G(m)}">${f(m)}</a></div>
        <div class="cmp-rating mono">${g.provisional?le(g):g.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",g.matches,{rd:g.rd.toFixed(1)})}</div>
      </div>
      <div class="cmp-vs">
        <div class="vs-mark">${t("cmp.vsMark")}</div>
        <div class="mono" style="font-size:11px;color:var(--dimmer)">${t("cmp.h2hShort",{n:r.length})}</div>
      </div>
      <div class="cmp-side b">
        <div class="cmp-sub">${x?t("cmp.rankN",{n:x.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${G(h)}">${f(h)}</a></div>
        <div class="cmp-rating mono">${i.provisional?le(i):i.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",i.matches,{rd:i.rd.toFixed(1)})}</div>
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.probTitle")} <span class="n">${t("cmp.probSub")}</span></h3>
      <div class="cmp-prob-labels">
        <span style="color:var(--gold)">${f(m)} ${R.toFixed(1)}%</span>
        <span style="color:var(--blue)">${a.toFixed(1)}% ${f(h)}</span>
      </div>
      <div class="cmp-probbar"><i class="pa" style="width:${R}%"></i><i class="pb" style="width:${a}%"></i></div>
      <div class="cmp-prob-note">${t("cmp.probNote")}</div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.tale")}</h3>
      <div class="cmp-table">
        ${w(t("cmp.rating"),fe(g),fe(i),!g.provisional&&g.rating>i.rating,!i.provisional&&i.rating>g.rating)}
        ${w(t("cmp.rank"),y?"#"+y.rank:v,x?"#"+x.rank:v,y&&x&&y.rank<x.rank,y&&x&&x.rank<y.rank)}
        ${w(t("cmp.rdUnc"),g.rd.toFixed(1),i.rd.toFixed(1),g.rd<i.rd,i.rd<g.rd)}
        ${w(t("cmp.glicko"),g.glicko.toFixed(1),i.glicko.toFixed(1),g.glicko>i.glicko,i.glicko>g.glicko)}
        ${w(t("cmp.record"),`<span style="color:var(--green)">${g.w}${q("W")}</span> <span style="color:var(--red)">${g.l}${q("L")}</span> ${g.d}${q("D")}`,`<span style="color:var(--green)">${i.w}${q("W")}</span> <span style="color:var(--red)">${i.l}${q("L")}</span> ${i.d}${q("D")}`,g.winPct>i.winPct,i.winPct>g.winPct)}
        ${w(t("cmp.winRate"),g.winPct+"%",i.winPct+"%",g.winPct>i.winPct,i.winPct>g.winPct)}
        ${w(t("cmp.matchesPlayed"),g.matches,i.matches,!1,!1)}
        ${w(t("cmp.uniqueOpp"),g.opponents,i.opponents,g.opponents>i.opponents,i.opponents>g.opponents)}
        ${w(t("cmp.avgOppRating"),g.avgOpp.toFixed(1),i.avgOpp.toFixed(1),g.avgOpp>i.avgOpp,i.avgOpp>g.avgOpp)}
        ${w(t("cmp.h2h"),`${p.w}${q("W")} \u2013 ${p.l}${q("L")} \u2013 ${p.d}${q("D")}`,`${p.l}${q("W")} \u2013 ${p.w}${q("L")} \u2013 ${p.d}${q("D")}`,p.w>p.l,p.l>p.w)}
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.prevMeetings")} <span class="n">${tp("cmp.meetings",r.length)}</span></h3>
      <div class="match-list">
        ${r.map(u=>`
          <div class="match-row">
            <div class="res-chip ${u.res}">${q(u.res)}</div>
            <div class="who">${f(m)}</div>
            <div class="score mono">${u.fa} \u2013 ${u.fb}</div>
            <div class="who opp"><a href="#/player/${G(h)}" style="color:var(--blue)">${f(h)}</a></div>
            <div class="date mono">${u.date||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("cmp.neverMet")}</div>`}
      </div>
      <div class="caption" style="margin-top:12px">${t("cmp.legacyNote")}</div>
    </div>`;let $=()=>{let u=d("#cmp-a").value,S=d("#cmp-b").value,T="#/compare/"+G(u)+"/"+G(S);location.hash!==T&&(Se=!0,location.hash=T),Ge(u,S)};d("#cmp-a").addEventListener("change",$),d("#cmp-b").addEventListener("change",$),d("#cmp-swap").addEventListener("click",()=>{let u=d("#cmp-a").value;d("#cmp-a").value=d("#cmp-b").value,d("#cmp-b").value=u,$()}),d("#cmp-copy").addEventListener("click",()=>{let u=location.href.split("#")[0]+"#/compare/"+G(m)+"/"+G(h),S=()=>{d("#cmp-copy-msg").textContent=t("cmp.linkCopied")};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(u).then(S,()=>{d("#cmp-copy-msg").textContent=u}):d("#cmp-copy-msg").textContent=u})}var Se=!1;function wt(e){let s=_[e],n=d("#page-player");if(!s){n.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("pl.notFound",{name:f(e)})}</div></div></div>`;return}let l=I.find(i=>i.name===e),o=Ee(e),m=o.slice(0,10),h=Ke(e),g=Math.max(3,Math.min(100,100-s.rd/120*100));n.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">${t("pl.back")}</a>
    <div class="player-hero anim">
      <div class="player-top">
        ${l?ge(l.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${f(s.name)}</div>
          <div class="player-rankline">
            ${l?t("pl.rankedOf",{rank:l.rank,total:I.length}):t("pl.unranked")}
            ${s.provisional?` \xB7 <span class="tag prov">${t("tag.provisional")}</span>`:""}
            ${s.inactive?` \xB7 <span class="tag inact">${t("tag.inactive")}</span>`:""}
          </div>
        </div>
        <div class="player-rating-block">
          <div class="lbl">${s.provisional?t("pl.estRange"):t("pl.visible")}</div>
          <div class="big mono${s.provisional?" prov-range":""}" id="pv-rating">${s.provisional?le(s):"0"}</div>
          ${Re(s)}
          <div class="rd-bar">
            <div class="bar-track"><div class="bar-fill" style="width:${g}%"></div></div>
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
      <h3>${t("pl.recentForm")} <span class="n">${t("pl.lastN",{n:Math.min(10,o.length)})}</span></h3>
      <div class="form-strip">
        ${m.map((i,y)=>`<div class="form-pill ${i.res}" style="animation-delay:${y*55}ms"
           title="${t("pl.vsOpp",{opp:f(i.opp)})} ${i.for_}-${i.against}">${q(i.res)}</div>`).join("")||`<span class="empty">${t("pl.noGames")}</span>`}
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.matchHistory")} <span class="n">${tp("pl.nGames",o.length)}</span></h3>
      <div class="match-list">
        ${o.map(i=>`
          <div class="match-row">
            <div class="res-chip ${i.res}">${q(i.res)}</div>
            <div class="who">${f(s.name)}</div>
            <div class="score mono">${i.for_} \u2013 ${i.against}</div>
            <div class="who opp"><a href="#/player/${G(i.opp)}" style="color:var(--blue)">${f(i.opp)}</a></div>
            <div class="date mono">${i.date||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.h2h")} <span class="n">${tp("pl.nOpponents",h.length)}</span></h3>
      <div class="h2h-grid">
        ${h.map(i=>`
          <div class="h2h-card" data-goto="${f(i.opp)}">
            <div class="opp">${f(i.opp)}</div>
            <div class="rec mono"><span class="w">${i.w}${q("W")}</span> \xB7 <span class="l">${i.l}${q("L")}</span> \xB7 <span>${i.d}${q("D")}</span> \xB7 ${t("pl.pts",{pf:i.pf,pa:i.pa})}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>
  </div>`,s.provisional||Me(d("#pv-rating"),s.rating,{dec:1,dur:900}),we()}function $t(){He();let e=d("#gm-body"),s=H();d("#gm-count").textContent=tp("gm.count",s.length),e.innerHTML=s.map(n=>{let l=n.sa>n.sb,o=n.sb>n.sa;return`
    <div class="gm-row">
      <div class="side ${l?"winner":"loser"}">
        <div class="dot ${l?"w":"l"}"></div>
        <div class="nm" data-goto="${f(n.a)}">${f(n.a)}</div>
      </div>
      <div class="sc mono" style="color:${l?"var(--green)":"var(--red)"}">${n.sa}</div>
      <div class="dash mono">\u2013</div>
      <div class="sc mono" style="color:${o?"var(--green)":"var(--red)"}">${n.sb}</div>
      <div class="side right ${o?"winner":"loser"}">
        <div class="dot ${o?"w":"l"}"></div>
        <div class="nm" data-goto="${f(n.b)}">${f(n.b)}</div>
      </div>
      <div class="dt mono">${n.admin&&!n.published?`<span class="tag fresh">${t("tag.new")}</span>`:n.date||t("misc.historical")}</div>
    </div>`}).join("")}function kt(){let e=W.players.filter(s=>s.provisional).sort((s,n)=>n.rating-s.rating);d("#roster-grid").innerHTML=e.map(s=>{let n=Math.min(100,Math.round(Math.min(1,s.matches/5)*50+Math.min(1,s.opponents/3)*50));return`
    <div class="roster-card reveal" data-goto="${f(s.name)}">
      <div class="top">
        <div class="nm">${f(s.name)}</div>
        <svg class="shield" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"/></svg>
      </div>
      <div class="rating"><span class="unit">${t("roster.estRange")}</span><span class="big prov-range">${le(s)}</span></div>
      <div class="req-row"><span>${t("roster.matches")}</span><span class="${s.matches>=5?"ok":""}">${s.matches} / 5 ${s.matches>=5?"\u2713":""}</span></div>
      <div class="req-row"><span>${t("roster.opponents")}</span><span class="${s.opponents>=3?"ok":""}">${s.opponents} / 3 ${s.opponents>=3?"\u2713":""}</span></div>
      <div class="prog-track"><div class="prog-fill" data-w="${n}"></div></div>
      <div class="prog-label">${t("roster.progress",{pct:n})}</div>
    </div>`}).join(""),requestAnimationFrame(()=>O("#roster-grid .prog-fill").forEach(s=>{s.style.width=s.dataset.w+"%"}))}function Lt(){let e=W.players,s=I.slice().sort((v,$)=>$.winPct-v.winPct).slice(0,10),n=e.slice().sort((v,$)=>$.matches-v.matches).slice(0,10),l=[];H().forEach(v=>{let $=_[v.a],u=_[v.b];if(!$||!u)return;let S=$.rating-u.rating;if(v.sa===v.sb)return;let T=v.sa>v.sb?v.a:v.b,z=Math.abs(S);(S<0&&T===v.a||S>0&&T===v.b)&&l.push({winner:T,loser:T===v.a?v.b:v.a,gap:z,score:T===v.a?`${v.sa}-${v.sb}`:`${v.sb}-${v.sa}`})}),l.sort((v,$)=>$.gap-v.gap);let o={};H().forEach(v=>{let $=[v.a,v.b].sort().join(" vs ");o[$]=(o[$]||0)+1});let m=Object.entries(o).sort((v,$)=>$[1]-v[1]).slice(0,10),h=e.map(v=>v.rating),g=Math.min(...h),i=Math.max(...h),y=8,x=(i-g)/y||1,k=Array.from({length:y},()=>0);h.forEach(v=>{k[Math.min(y-1,Math.max(0,Math.floor((v-g)/x)))]++});let M=Math.max(...k,1),R=k.map((v,$)=>{let u=Math.round((g+$*x)/10)*10,S=Math.round((g+($+1)*x)/10)*10;return`
    <div class="hcol" title="${tp("an.histTip",v,{lo:u,hi:S})}">
      <div class="hbar" data-h="${Math.round(v/M*100)}"></div>
      <div class="hlbl">${u}\u2013${S}</div>
    </div>`}).join(""),a=e.slice().sort((v,$)=>$.opponents-v.opponents).slice(0,8),r=Math.max(...a.map(v=>v.opponents),1),p=a.map(v=>`
    <div class="mrow reveal" data-goto="${f(v.name)}">
      <div class="nm">${f(v.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(v.opponents/r*100)}"></div></div>
      <div class="val mono">${v.opponents}</div>
    </div>`).join(""),c=(v,$,u)=>v.map((S,T)=>`
    <div class="an-row reveal" data-goto="${f(S.name)}">
      <div class="idx mono">${T+1}</div>
      <div class="nm">${f(S.name)}</div>
      <div class="val mono">${$(S)}</div>
      <div class="unit mono">${u(S)}</div>
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
      ${l.length?l.slice(0,8).map((v,$)=>`
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
      ${m.map(([v,$],u)=>`
        <div class="an-row reveal">
          <div class="idx mono">${u+1}</div>
          <div class="nm">${v.split(" vs ").map(f).join(` <span style="color:var(--dimmer);font-weight:500">${t("vs")}</span> `)}</div>
          <div class="val mono">${$}</div>
          <div class="unit mono">${t("an.meetingsUnit")}</div>
        </div>`).join("")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.ratingDist")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 20V10M10 20V4M16 20v-8M2 20h20" stroke-linecap="round"/></svg>
      </div>
      <div class="hist">${R}</div>
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.uniqueOpp")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v5M12 15v5" stroke-linecap="round"/></svg>
      </div>
      ${p}
    </div>`;let w=()=>{O("#an-grid .hbar").forEach(v=>{v.style.height=v.dataset.h+"%"}),O("#an-grid .abar").forEach(v=>{v.style.width=v.dataset.w+"%"})};requestAnimationFrame(w),setTimeout(w,140),we()}function xt(){d("#settings-body").innerHTML=qe().map(e=>`
    <tr><td><b>${f(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${f(e.desc)}</div></td>
        <td class="val">${f(String(e.value))}</td></tr>`).join("")}function St(){return Array.from({length:11},(e,s)=>({q:t("faq.q"+(s+1)),a:t("faq.a"+(s+1))}))}function ue(){let e=F().faq;return Array.isArray(e)&&e.length?e:St()}function Mt(){d("#faq-list").innerHTML=ue().map((e,s)=>`
    <div class="faq-item reveal" data-faq="${s}">
      <button class="faq-q" aria-expanded="false">
        <span>${f(String(e.q||""))}</span>
        <svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="faq-a"><div class="faq-a-in">${f(String(e.a||""))}</div></div>
    </div>`).join(""),we()}document.addEventListener("click",e=>{let s=e.target.closest(".faq-q");if(!s)return;let n=s.closest(".faq-item"),l=n.classList.contains("open");O(".faq-item.open").forEach(o=>{o.classList.remove("open"),o.querySelector(".faq-q").setAttribute("aria-expanded","false")}),l||(n.classList.add("open"),s.setAttribute("aria-expanded","true"))});function A(){let e=d("#admin-wrap");if(!at()){e.innerHTML=`
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
    </div>`;let a=async()=>{let r=d("#admin-pw").value;try{let p=await fetch(ot,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:r})});if(p.ok){let c=await p.json().catch(()=>({}));nt(c.token||r,d("#admin-remember").checked),A(),L("Welcome back, commander.");return}if(p.status===429){L("Too many attempts \u2014 wait a few minutes.");return}}catch{}d("#admin-pw").style.borderColor="var(--red)",L("Wrong password.")};d("#admin-auth").addEventListener("click",a),d("#admin-pw").addEventListener("keydown",r=>{r.key==="Enter"&&a()});return}let n=Y(),l=Be().length,o=F(),m='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',h=Object.entries(o.aliases).map(([a,r])=>`
    <div class="log-item">
      <div class="txt"><b>${f(a)}</b> \u2192 <b>${f(r)}</b>${o.aliasNotes&&o.aliasNotes[a]?` <span style="color:var(--dimmer)">\u2014 ${f(o.aliasNotes[a])}</span>`:""}</div>
      <button class="icon-btn" data-alias-del="${f(a)}" title="Remove name fix">${m}</button>
    </div>`).join("")||'<div class="empty">No name fixes yet.</div>',g=o.inactive.map(a=>`
    <div class="log-item">
      <div class="txt"><b>${f(a)}</b> <span style="color:var(--dimmer)">\u2014 inactive</span></div>
      <button class="icon-btn" data-inact-del="${f(a)}" title="Mark active again">${m}</button>
    </div>`).join("")||'<div class="empty">Nobody marked inactive.</div>',i=Object.keys({...o.seeds||{},...o.seedGlicko||{},...o.seedRd||{}}).map(a=>`
    <div class="log-item">
      <div class="txt"><b>${f(a)}</b> \xB7 <span style="color:var(--dimmer)">old</span> <b class="mono">${f(String((o.seeds||{})[a]!=null?(o.seeds||{})[a]:"\u2014"))}</b>${(o.seedGlicko||{})[a]!=null?` \xB7 <span style="color:var(--dimmer)">glicko</span> <b class="mono">${f(String(o.seedGlicko[a]))}</b>`:""}${(o.seedRd||{})[a]!=null?` \xB7 <span style="color:var(--dimmer)">rd</span> <b class="mono">${f(String(o.seedRd[a]))}</b>`:""}</div>
      <button class="icon-btn" data-seed-del="${f(a)}" title="Remove seed">${m}</button>
    </div>`).join("")||'<div class="empty">No seed overrides \u2014 players start from the sheet values.</div>',y=qe().map(a=>`
    <div class="set-row">
      <div class="lbl"><b>${f(a.name)}</b><div class="d">${f(String(a.desc||""))}</div></div>
      <input class="set-val mono" data-set-name="${f(a.name)}" value="${f(String(a.value))}">
    </div>`).join(""),x=a=>{let r=(a||"").trim().toLowerCase();return H().filter(c=>!r||c.a.toLowerCase().includes(r)||c.b.toLowerCase().includes(r)).slice(0,20).map(c=>`
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
      <h3>Pending <span class="n">log</span> \u2014 ${n.length} local \xB7 ${l} published</h3>
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
      <div class="log-list" id="ov-alias-list" style="margin-top:12px">${h}</div>
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
      <div class="log-list" id="ov-inact-list" style="margin-top:12px">${g}</div>
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
      <div id="ov-settings">${y}</div>
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

  <datalist id="player-list">${W.players.map(a=>`<option value="${f(a.name)}">`).join("")}</datalist>`,d("#admin-lock").addEventListener("click",()=>{it(),A()}),d("#admin-publish").addEventListener("click",()=>k()),d("#admin-sync").addEventListener("click",async()=>{let a=d("#admin-sync"),r=d("#admin-sync-status");a.disabled=!0,r.textContent="syncing\u2026";try{let p=await fetch(lt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:ae()})}),c=await p.json().catch(()=>({}));p.ok&&c.ok?(r.textContent=c.changed?`synced \u2713 ${c.matches} matches / ${c.players} players`:"already up to date \u2713",L(c.changed?"Sheet synced \u2014 the live site was updated.":"Site already matches the sheet.")):p.status===429?(r.textContent="rate limited",L("Too many attempts \u2014 wait a few minutes.")):(r.textContent="sync failed",L("Sync failed: "+(c.error||p.status)))}catch{r.textContent="network error",L("Sync failed (network).")}a.disabled=!1});async function k(a){let r=!!(a&&a.silent),p=ae()||(r?"":(window.prompt("Admin password:")||"").trim());if(!p){L(r?'Saved here \u2014 auto-publish needs a stored password. Use "Publish to everyone".':"Publish cancelled.");return}ke=!0;let c=F(),b={},w=[];for(let[u,S]of Object.entries(c.matchEdits||{}))u.startsWith("a:")&&(b[u]=S);for(let u of c.matchRemoved||[])u.startsWith("a:")&&w.push(u);let v=H().filter(u=>u.admin).map(u=>({a:u.a,b:u.b,sa:u.sa,sb:u.sb,date:u.date||""})),$={matches:v,aliases:c.aliases||{},aliasNotes:c.aliasNotes||{},aliasRemoved:c.aliasRemoved||[],inactive:c.inactive||[],seeds:c.seeds||{},seedGlicko:c.seedGlicko||{},seedRd:c.seedRd||{},seedRemoved:c.seedRemoved||[],settings:c.settings||{},matchEdits:b,matchRemoved:w,faq:c.faq!=null?c.faq:[]};try{let u=await fetch(he,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:p,doc:$,message:`Publish match log (${v.length} matches)`})}),S=await u.json().catch(()=>({}));if(!u.ok||!S.ok){u.status===403&&sessionStorage.removeItem(Z),L("Publish failed: "+(S.error||"HTTP "+u.status));return}window.LB_PUB=$,window.LB_LOG=v,ee([]),N({}),C(),r||A(),L(r?"Saved \u2014 live for everyone \u2713":"Published! Everyone sees it on their next visit.")}catch{L("Publish failed: network error.")}finally{ke=!1}}d("#admin-export").addEventListener("click",()=>{let a=new Blob([JSON.stringify(Y(),null,2)],{type:"application/json"}),r=document.createElement("a");r.href=URL.createObjectURL(a),r.download="match-log.json",r.click(),URL.revokeObjectURL(r.href),L("Log exported.")}),d("#adm-add").addEventListener("click",()=>{let a=d("#adm-a").value.trim(),r=d("#adm-b").value.trim(),p=parseInt(d("#adm-sa").value,10),c=parseInt(d("#adm-sb").value,10);if(!a||!r||a.toLowerCase()===r.toLowerCase()||!Number.isFinite(p)||!Number.isFinite(c)){L("Fill in both players and scores.");return}let b=Y();b.unshift({a,b:r,sa:p,sb:c,date:d("#adm-date")?d("#adm-date").value||new Date().toISOString().slice(0,10):new Date().toISOString().slice(0,10)}),ee(b),C(),A(),L(`${a} ${p}\u2013${c} ${r} added \u2014 site recalculated live.`)}),d("#adm-list").addEventListener("click",a=>{let r=a.target.closest("[data-del]");if(!r)return;let p=Y();p.splice(parseInt(r.dataset.del,10),1),ee(p),C(),A()}),d("#ov-alias-add").addEventListener("click",()=>{let a=d("#ov-alias-a").value.trim(),r=d("#ov-alias-b").value.trim(),p=(d("#ov-alias-note")||{}).value.trim();if(!a||!r){L("Fill both: the wrong name and the correct player.");return}let c=Object.keys(_).find(w=>w.toLowerCase()===r.toLowerCase())||r,b=j();N({...b,aliases:{...b.aliases||{},[a]:c},aliasNotes:p?{...b.aliasNotes||{},[a]:p}:b.aliasNotes||{},aliasRemoved:(b.aliasRemoved||[]).filter(w=>w!==a)}),C(),A(),L(`Name fix saved \u2014 "${a}" now counts as ${c}.`)}),d("#ov-alias-list").addEventListener("click",a=>{let r=a.target.closest("[data-alias-del]");if(!r)return;let p=r.dataset.aliasDel,c=j(),b={...c.aliases||{}},w={...c.aliasNotes||{}};delete b[p],delete w[p],N({...c,aliases:b,aliasNotes:w,aliasRemoved:[...new Set([...c.aliasRemoved||[],p])]}),C(),A(),L("Name fix removed.")}),d("#ov-inact-toggle").addEventListener("click",()=>{let a=d("#ov-inact-n").value.trim();if(!a){L("Type a player name first.");return}let r=j(),p=F().inactive||[],c=p.includes(a)?p.filter(b=>b!==a):[...p,a];N({...r,inactive:c}),C(),A(),L(c.includes(a)?`${a} marked inactive.`:`${a} marked active again.`)}),d("#ov-inact-list").addEventListener("click",a=>{let r=a.target.closest("[data-inact-del]");if(!r)return;let p=j();N({...p,inactive:(F().inactive||[]).filter(c=>c!==r.dataset.inactDel)}),C(),A()}),d("#ov-seed-add").addEventListener("click",()=>{let a=d("#ov-seed-n").value.trim(),r=d("#ov-seed-v").value.trim(),p=d("#ov-seed-g").value.trim(),c=d("#ov-seed-rd").value.trim();if(!a){L("Pick a player first.");return}if(r===""&&p===""&&c===""){L("Enter an Old 0\u2013100 rating, or a Starting Glicko / RD.");return}let b=j(),w={...b.seeds||{}},v={...b.seedGlicko||{}},$={...b.seedRd||{}};r!==""&&Number.isFinite(Number(r))?w[a]=Number(r):delete w[a],p!==""&&Number.isFinite(Number(p))?v[a]=Number(p):delete v[a],c!==""&&Number.isFinite(Number(c))?$[a]=Number(c):delete $[a],N({...b,seeds:w,seedGlicko:v,seedRd:$,seedRemoved:(b.seedRemoved||[]).filter(u=>u!==a)}),C(),A(),L(`Seed saved for ${a}.`)}),d("#ov-seed-list").addEventListener("click",a=>{let r=a.target.closest("[data-seed-del]");if(!r)return;let p=r.dataset.seedDel,c=j(),b={...c.seeds||{}};delete b[p];let w={...c.seedGlicko||{}};delete w[p];let v={...c.seedRd||{}};delete v[p],N({...c,seeds:b,seedGlicko:w,seedRd:v,seedRemoved:[...new Set([...c.seedRemoved||[],p])]}),C(),A()}),d("#ov-settings").addEventListener("change",a=>{let r=a.target.closest("[data-set-name]");if(!r)return;let p=j();N({...p,settings:{...p.settings||{},[r.dataset.setName]:r.value}}),C(),A(),L("Setting applied \u2014 everything recalculated.")}),d("#ov-set-reset").addEventListener("click",()=>{let a=j();N({...a,settings:{}}),C(),A(),L("Settings back to the master sheet values.")}),d("#ov-mq").addEventListener("input",()=>{d("#ov-mresults").innerHTML=x(d("#ov-mq").value)}),d("#ov-mresults").addEventListener("click",a=>{let r=a.target.closest("[data-msave]"),p=a.target.closest("[data-mdel]");if(r){let c=r.closest("[data-mkey]"),b=c.dataset.mkey,w=$=>c.querySelector(`[data-f="${$}"]`).value,v=j();N({...v,matchEdits:{...v.matchEdits||{},[b]:{sa:+w("sa"),sb:+w("sb"),date:w("date")}}}),C(),d("#ov-mresults").innerHTML=x(d("#ov-mq").value),L("Match fixed \u2014 ratings recalculated.")}else if(p){let c=p.dataset.mdel,b=j();N({...b,matchRemoved:[...new Set([...b.matchRemoved||[],c])]}),C(),d("#ov-mresults").innerHTML=x(d("#ov-mq").value),L("Match deleted \u2014 ratings recalculated.")}}),d("#pl-add").addEventListener("click",()=>{let a=d("#pl-name").value.trim(),r=d("#pl-opp").value.trim(),p=parseInt(d("#pl-sa").value,10),c=parseInt(d("#pl-sb").value,10);if(!a||!r||a.toLowerCase()===r.toLowerCase()||!Number.isFinite(p)||!Number.isFinite(c)){L("A player needs a name, an opponent and both scores \u2014 at least 1 result.");return}if(_[B(a)]){L(`${a} already exists \u2014 log a match for them instead.`);return}let b=Y();b.unshift({a,b:r,sa:p,sb:c,date:(d("#pl-date")||{}).value||new Date().toISOString().slice(0,10)}),ee(b);let w=(d("#pl-seed")||{}).value.trim();if(w!==""&&Number.isFinite(Number(w))){let v=j();N({...v,seeds:{...v.seeds||{},[B(a)]:Number(w)},seedRemoved:(v.seedRemoved||[]).filter($=>$!==B(a))})}C(),A(),L(`${a} added with their first result \u2014 ${p}\u2013${c} vs ${r}.`)}),d("#pl-del-btn").addEventListener("click",()=>{let a=d("#pl-del").value.trim(),r=B(a),p=H().filter(T=>T.a===r||T.b===r);if(!p.length){L(`No player called "${a}" with matches found.`);return}if(!window.confirm(`Remove ${r} and ${p.length} match${p.length===1?"":"es"}? This recalculates every rating.`))return;let c=j(),b=[...c.matchRemoved||[]],w=[];p.forEach(T=>{T.key.startsWith("l:")?w.push(parseInt(T.key.slice(2),10)):b.push(T.key)});let v=Y();w.sort((T,z)=>z-T).forEach(T=>v.splice(T,1)),ee(v);let $={...c.seeds||{}},u={...c.seedGlicko||{}},S={...c.seedRd||{}};delete $[r],delete u[r],delete S[r],N({...c,matchRemoved:[...new Set(b)],seeds:$,seedGlicko:u,seedRd:S,seedRemoved:[...new Set([...c.seedRemoved||[],r])],inactive:(F().inactive||[]).filter(T=>T!==r)}),C(),A(),L(`${r} removed with ${p.length} match${p.length===1?"":"es"}. Publish to make it public.`)});let M=()=>{let a=ue();d("#faq-admin-list").innerHTML=a.map((r,p)=>`
      <div class="log-item fix-row" data-faq-idx="${p}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${f(String(r.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${f(String(r.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${p}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${p}" title="Delete question">${m}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};M(),d("#faq-admin-list").addEventListener("click",a=>{let r=a.target.closest("[data-faq-save]"),p=a.target.closest("[data-faq-del]"),c=ue().map(w=>({...w}));if(r){let w=r.closest("[data-faq-idx]");c[parseInt(r.dataset.faqSave,10)]={q:w.querySelector('[data-fq="q"]').value.trim(),a:w.querySelector('[data-fq="a"]').value.trim()}}else if(p)c.splice(parseInt(p.dataset.faqDel,10),1);else return;let b=j();N({...b,faq:c}),M(),L("Q&A updated \u2014 publish to make it public.")}),d("#faq-add").addEventListener("click",()=>{let a=d("#faq-new-q").value.trim(),r=d("#faq-new-a").value.trim();if(!a||!r){L("Fill in both the question and the answer.");return}let p=j();N({...p,faq:[...ue().map(c=>({...c})),{q:a,a:r}]}),M(),L("Question added.")}),d("#faq-reset").addEventListener("click",()=>{let a=j();N({...a,faq:null}),M(),L("Q&A back to the built-in list.")}),window._fbTimer&&(clearInterval(window._fbTimer),window._fbTimer=null);async function R(){let a=d("#fb-inbox");if(!a||document.querySelector("#fb-inbox [data-fb-reply]:focus"))return;let r=ae();if(!r){a.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let p=await fetch(V+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:r})}),c=await p.json().catch(()=>({}));if(!p.ok||!c.ok){a.innerHTML=`<div class="empty">Could not load messages (${f(c.error||"HTTP "+p.status)}).</div>`;return}let b=c.items||[],w={};a.querySelectorAll("[data-fb-id]").forEach(v=>{let $=v.querySelector("[data-fb-reply]");$&&$.value&&(w[v.dataset.fbId]=$.value)}),a.innerHTML=b.map(v=>`
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
        </div>`).join("")||'<div class="empty">No messages yet.</div>',a.querySelectorAll("[data-fb-id]").forEach(v=>{let $=v.querySelector("[data-fb-reply]");$&&w[v.dataset.fbId]!=null&&($.value=w[v.dataset.fbId])})}catch{a.innerHTML='<div class="empty">Network error loading messages.</div>'}}R(),d("#fb-refresh").addEventListener("click",()=>{R(),L("Inbox refreshed.")}),window._fbTimer=setInterval(()=>{if(!d("#fb-inbox")){clearInterval(window._fbTimer),window._fbTimer=null;return}document.hidden||R()},2e3),d("#fb-inbox").addEventListener("click",async a=>{let r=a.target.closest("[data-fb-send]"),p=a.target.closest("[data-fb-del]"),c=a.target.closest("[data-fb-resolve]");if(!r&&!p&&!c)return;let b=a.target.closest("[data-fb-id]"),w=b.dataset.fbId,v=ae();try{if(c){let $=b.dataset.fbResolved!=="1";if(!(await fetch(V+"/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:v,id:w,resolved:$})}).then(S=>S.json())).ok){L("Could not update \u2014 try again.");return}L($?"Marked as resolved \u2713":"Message reopened."),R()}else if(r){let $=b.querySelector("[data-fb-reply]").value;if(!(await fetch(V+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:v,id:w,reply:$})}).then(S=>S.json())).ok){L("Reply failed.");return}L("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(V+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:v,id:w})}).then(u=>u.json())).ok){L("Delete failed.");return}b.remove(),L("Message deleted.")}}catch{L("Network error.")}})}var re=document.getElementById("fl-cards");re&&window.matchMedia("(hover: hover)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(re.addEventListener("pointermove",e=>{let s=e.target.closest&&e.target.closest(".fl-card");if(!s)return;let n=s.getBoundingClientRect(),l=(e.clientX-n.left)/n.width-.5,o=(e.clientY-n.top)/n.height-.5;s.classList.add("tilt"),s.style.transform=`perspective(1000px) rotateY(${(l*7).toFixed(2)}deg) rotateX(${(-o*6).toFixed(2)}deg) translateY(-6px)`}),re.addEventListener("pointerleave",()=>{re.querySelectorAll(".fl-card").forEach(e=>{e.style.transform="",e.classList.remove("tilt")})}));d("#search").addEventListener("input",e=>{let s=e.target.value.trim().toLowerCase(),n=d("#search-drop");if(!s){n.classList.remove("show");return}let l=W.players.filter(o=>o.name.toLowerCase().includes(s)).slice(0,8);if(!l.length){n.classList.remove("show");return}n.innerHTML=l.map(o=>`
    <a class="drop-row" href="#/player/${G(o.name)}">
      ${o.rank?ge(o.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${f(o.name)}</span>        <span class="mono" style="margin-left:auto;color:var(--dim)">${fe(o,!0)}</span>
    </a>`).join(""),n.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||d("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(d("#search-drop").classList.remove("show"),d("#search").value="")});var V=he.replace(/\/publish$/,"/feedback"),ye="tt1v1_fb_tickets";function Et(){try{return JSON.parse(localStorage.getItem(ye)||"[]")}catch{return[]}}function Rt(e){let s=Et();s.push({id:e,ts:Date.now()});try{localStorage.setItem(ye,JSON.stringify(s.slice(-20)))}catch{}}function Tt(){let e=d("#fb-overlay"),s=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>d("#fb-msg").focus(),180)},n=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};d("#fab-feedback").addEventListener("click",s),d("#fb-close").addEventListener("click",n),d("#fb-done").addEventListener("click",n),e.addEventListener("click",i=>{i.target===e&&n()}),document.addEventListener("keydown",i=>{i.key==="Escape"&&e.classList.contains("show")&&n()});let l=d("#faq-feedback-btn");l&&l.addEventListener("click",s);let o=d("#fb-msg"),m=d("#fb-count-n");o.addEventListener("input",()=>{m.textContent=String(o.value.length);try{localStorage.setItem("tt1v1_fb_draft",o.value)}catch{}});try{let i=localStorage.getItem("tt1v1_fb_draft");i&&(o.value=i,m.textContent=String(i.length))}catch{}let h=d("#fb-send");h.addEventListener("click",async()=>{let i=o.value.trim();if(i.length<5){o.focus(),o.classList.add("fb-nudge"),setTimeout(()=>o.classList.remove("fb-nudge"),500),L(t("fb.writeFirst"));return}h.classList.add("busy"),h.disabled=!0;try{let y=await fetch(V,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:d("#fb-name").value.trim(),contact:d("#fb-contact").value.trim(),message:i})}),x=await y.json().catch(()=>({}));if(!y.ok||!x.ok){L(t("fb.couldNotSend",{err:x.error||"HTTP "+y.status}));return}Rt(x.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}d("#fb-ticket-code").textContent=x.id,d("#fb-view-form").hidden=!0,d("#fb-view-done").hidden=!1}catch{L(t("fb.netError"))}finally{h.classList.remove("busy"),h.disabled=!1}});let g=document.querySelector(".fb-ticket");g&&g.addEventListener("click",async()=>{let i=(d("#fb-ticket-code").textContent||"").trim();if(!i||i==="\u2014")return;try{await navigator.clipboard.writeText(i)}catch{let k=document.createElement("textarea");k.value=i,document.body.appendChild(k),k.select();try{document.execCommand("copy")}catch{}k.remove()}let y=d("#fb-copied");y&&(y.classList.add("show"),clearTimeout(window._fbCopiedT),window._fbCopiedT=setTimeout(()=>y.classList.remove("show"),1800)),L(t("fb.ticketCopied"))}),d("#fb-check").addEventListener("click",async()=>{let i=d("#fb-ticket-in").value.trim(),y=d("#fb-reply-out");if(i){y.classList.add("show"),y.textContent=t("fb.checking");try{let x=await fetch(V+"/status?id="+encodeURIComponent(i)),k=await x.json().catch(()=>({}));if(!x.ok||!k.ok){y.textContent=t("fb.noTicket");return}y.innerHTML=k.resolved?`${t("fb.statusResolved")}${k.reply?`<br>${t("fb.replyFrom",{reply:f(k.reply)})}`:""}`:k.reply?t("fb.replyFrom",{reply:f(k.reply)}):t("fb.statusPending",{status:f(k.status)})}catch{y.textContent=t("fb.netErrorShort")}}})}function qt(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let s=null,n=()=>{e.classList.remove("show"),s=null};document.addEventListener("mouseover",l=>{let o=l.target.closest&&l.target.closest("[title],[data-tip]");if(!o)return;o.hasAttribute("title")&&(o.setAttribute("data-tip",o.getAttribute("title")),o.removeAttribute("title"));let m=o.getAttribute("data-tip");if(!m)return;s=o,e.textContent=m;let h=o.getBoundingClientRect(),g=h.top<52;e.classList.toggle("below",g),e.style.left=Math.max(10,Math.min(window.innerWidth-10,h.left+h.width/2))+"px",e.style.top=(g?h.bottom+8:h.top-8)+"px",e.classList.add("show")}),document.addEventListener("mouseout",l=>{if(!s)return;let o=l.relatedTarget;o&&o.closest&&o.closest("[title],[data-tip]")===s||n()}),window.addEventListener("scroll",n,{passive:!0})}var Pe;function L(e){let s=d("#toast");s.textContent=e,s.classList.add("show"),clearTimeout(Pe),Pe=setTimeout(()=>s.classList.remove("show"),2600)}var te;function we(){te&&te.disconnect(),te=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&(s.target.classList.add("in"),O(".cu",s.target).forEach(n=>Me(n,parseFloat(n.dataset.target),{dec:parseInt(n.dataset.dec||0)})),te.unobserve(s.target))})},{threshold:.12}),O(".reveal").forEach(e=>te.observe(e))}(function(){let s=d("#scroll-progress"),n=d("#to-top"),l=d("#page-home .hero-row"),o=document.querySelector(".topbar"),m=()=>{let h=window.scrollY,g=document.documentElement.scrollHeight-window.innerHeight;s&&(s.style.width=(g>0?h/g*100:0)+"%"),n&&n.classList.toggle("show",h>640),o&&o.classList.toggle("scrolled",h>10),l&&h<1400&&(l.style.transform=`translateY(${h*.14}px)`,l.style.opacity=String(Math.max(.3,1-h/950)))};window.addEventListener("scroll",m,{passive:!0}),n&&n.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),m()})();C();Oe();be();Tt();qt();window.addEventListener("lb-lang",()=>{let e=window.scrollY,s=J,n={...P};if(be(),d("#page-home").classList.contains("active")&&(s!=="all"||n.key!=="rank"||n.dir!==1)){J=s,P=n,O(".chip[data-filter]").forEach(o=>o.classList.toggle("on",o.dataset.filter===s)),O(".sortable").forEach(o=>o.classList.remove("sorted","asc"));let l=d(`.sortable[data-key="${n.key}"]`);l&&(l.classList.add("sorted"),n.dir===1&&l.classList.add("asc")),X(s,n.key,n.dir)}Ce(),window.scrollTo(0,e)});function de(e,s){let n=e.indexOf("window."+s);if(n<0)return null;let l=e.indexOf("=",n);for(;l<e.length&&"{[".indexOf(e[l])<0;)l++;let o=0,m=!1,h="",g=!1;for(let i=l;i<e.length;i++){let y=e[i];if(m){g?g=!1:y==="\\"?g=!0:y===h&&(m=!1);continue}if(y==='"'||y==="'"){m=!0,h=y;continue}if(y==="{"||y==="[")o++;else if((y==="}"||y==="]")&&(o--,o<=0))return JSON.parse(e.slice(l,i+1))}return null}async function Ue(e){try{let s="cb="+Date.now(),[n,l]=await Promise.all([fetch("data.js?"+s,{cache:"no-store"}),fetch("log.js?"+s,{cache:"no-store"})]);if(!n.ok||!l.ok)throw new Error("HTTP "+n.status+"/"+l.status);let o=await n.text(),m=await l.text(),h=de(o,"LB_DATA"),g=de(m,"LB_PUB")||(de(m,"LB_LOG")?{matches:de(m,"LB_LOG")}:null),i=[];if(h&&JSON.stringify(h)!==JSON.stringify(D)&&(D=h,window.LB_DATA=h,i.push("data")),g&&JSON.stringify(g)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=g,window.LB_LOG=g.matches||[],i.push("log")),i.length){C(),Oe(),be();let y=d("#last-updated");y&&(y.textContent=t("home.lastUpdated",{when:D.generated||"today"}))}e&&L(i.length?t("misc.refreshed"):t("misc.upToDate"))}catch{e&&L(t("misc.refreshFailed"))}}Ue(!1);var ce=d("#lb-refresh-btn");ce&&ce.addEventListener("click",async()=>{ce.classList.add("spinning"),await Ue(!0),setTimeout(()=>ce.classList.remove("spinning"),400)});var We="tt1v1_fb_seen",U=null;function Ot(){try{return JSON.parse(localStorage.getItem(ye)||"[]")}catch{return[]}}function ze(){try{return JSON.parse(localStorage.getItem(We)||"{}")||{}}catch{return{}}}function Ct(){let e=d("#fab-feedback");if(e&&!e.querySelector(".fb-dot")){let n=document.createElement("span");n.className="fb-dot",e.appendChild(n),requestAnimationFrame(()=>n.classList.add("in"))}let s=d("#fb-view-form");if(s&&!d("#fb-reply-banner")&&U){let n=document.createElement("div");n.id="fb-reply-banner",n.innerHTML=`${t("fb.teamReplied",{id:f(U.id)})}
      <div class="r">${f(U.reply)}</div>
      <button class="btn btn-ghost" id="fb-got-it" style="margin-top:9px;padding:6px 13px">${t("fb.gotIt")}</button>`,s.insertAdjacentElement("beforebegin",n),requestAnimationFrame(()=>n.classList.add("show")),d("#fb-got-it").addEventListener("click",Nt)}}function Nt(){if(U){let n=ze();n[U.id]=1;try{localStorage.setItem(We,JSON.stringify(n))}catch{}U=null}let e=d(".fb-dot");e&&(e.classList.add("out"),setTimeout(()=>e.remove(),420));let s=d("#fb-reply-banner");s&&(s.classList.remove("show"),setTimeout(()=>s.remove(),420))}async function Je(){let e=ze();U=null;let s=Ot(),n=s.slice(0,Math.max(0,s.length-6)),l=[];for(let o of s.slice(-6))try{let m=await fetch(V+"/status?id="+encodeURIComponent(o.id),{cache:"no-store"}),h=await m.json().catch(()=>({}));if(m.status===404||m.ok&&h.ok===!1)continue;l.push(o),m.ok&&h.ok&&h.reply&&!e[o.id]&&!U&&(U={id:o.id,reply:h.reply})}catch{l.push(o)}if(l.length!==s.slice(-6).length)try{localStorage.setItem(ye,JSON.stringify([...n,...l]))}catch{}U&&Ct()}setTimeout(Je,3500);setInterval(Je,9e4);})();
