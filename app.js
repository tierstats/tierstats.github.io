/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var _=window.LB_DATA,me="https://tierstats-publish.tierstats.workers.dev/publish",r=(e,t=document)=>t.querySelector(e),T=(e,t=document)=>[...t.querySelectorAll(e)],f=e=>String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),F=e=>encodeURIComponent(String(e)),Te=e=>decodeURIComponent(e);function ke(e,t,a={}){let n=a.dur||1200,o=a.dec||0,m=performance.now(),g=parseFloat(e.textContent)||0;function p(i){let y=Math.min(1,(i-m)/n),k=1-Math.pow(1-y,3);e.textContent=(g+(t-g)*k).toFixed(o),y<1&&requestAnimationFrame(p)}requestAnimationFrame(p),setTimeout(()=>{e.textContent=t.toFixed(o)},n+300)}var Ue='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',Je='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function he(e,t=""){let a=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",n=e<=3?e===1?Ue:Je:"";return`<div class="rank-badge ${a} ${t}" title="Rank #${e}">${n}<span class="num">${e}</span></div>`}var I={},A=[],G={players:[],byName:{},qualified:[]},X={},re={},V={},ge=new Set;function ze(){for(let a in X)delete X[a];let e=new Set(P().aliasRemoved||[]);Object.entries(_.aliases).forEach(([a,n])=>{e.has(a)||(X[a.toLowerCase()]=n)}),Object.entries(P().aliases||{}).forEach(([a,n])=>{X[String(a).toLowerCase()]=n});for(let a of Object.keys(re))delete re[a];for(let a of Object.keys(V))delete V[a];ge.clear();let t=(a,n)=>{Object.keys(a||{}).forEach(o=>{let m=D(o);m!==o&&(n[m]=a[o])}),Object.keys(a||{}).forEach(o=>{let m=D(o);m===o&&(n[m]=a[o])})};t(_.seeds,re),t(_.prevRatings,V),(_.inactiveList||[]).forEach(a=>ge.add(D(a)))}var D=e=>{let t=String(e).trim(),a=new Set;for(;;){let n=X[t.toLowerCase()];if(!n||n===t||a.has(t))return t;a.add(t),t=n}};function xe(e){let t=[];return B().forEach(a=>{let n=(o,m,g)=>({opp:o,for_:m,against:g,res:m>g?"W":m<g?"L":"D",date:a.date});a.a===e?t.push(n(a.b,a.sa,a.sb)):a.b===e&&t.push(n(a.a,a.sb,a.sa))}),t}function Ve(e){let t={};return xe(e).forEach(a=>{let n=t[a.opp]||(t[a.opp]={w:0,l:0,d:0,pf:0,pa:0});n[a.res.toLowerCase()]+=1,n.pf+=a.for_,n.pa+=a.against}),Object.entries(t).map(([a,n])=>({opp:a,...n})).sort((a,n)=>n.w+n.l+n.d-(a.w+a.l+a.d)||n.w-a.w)}function Ye(e){let t=I[e]||{};return t.provisional?'<span class="tag prov">provisional</span>':t.inactive?'<span class="tag inact">inactive</span>':""}function Qe(e){let t=xe(e).slice(0,5).reverse();if(!t.length)return"";let a=t.map(n=>n.res).join(" ");return`<span class="form" title="Last ${t.length} results (oldest \u2192 newest): ${a}">${t.map(n=>`<i class="${n.res.toLowerCase()}">${n.res}</i>`).join("")}</span>`}function Le(e){let t=e.delta!=null?e.delta:0;if(Math.abs(t)<.05)return"";let a=t>0;return`<span class="delta ${a?"up":"down"}" title="${a?"up":"down"} ${Math.abs(t).toFixed(1)} since the previous sheet update">${a?"\u25B2":"\u25BC"} ${Math.abs(t).toFixed(1)}</span>`}function Ze(){let e=_.prevRanks||{},t=Object.keys(e);if(t.length){let o={};return t.forEach(m=>{o[D(m)]=e[m]}),o}let a={};A.forEach(o=>{V[o.name]!=null&&(a[o.name]=V[o.name])});let n={};return Object.entries(a).sort((o,m)=>m[1]-o[1]).forEach(([o],m)=>{n[o]=m+1}),n}function Ke(e,t){let a=t[e.name];if(a==null)return'<span class="mv new" title="Newly qualified for the leaderboard">NEW</span>';let n=a-e.rank;return n>0?`<span class="mv up" title="Up ${n} place${n>1?"s":""} since the last ratings update">\u25B2${n}</span>`:n<0?`<span class="mv down" title="Down ${-n} place${n<-1?"s":""} since the last ratings update">\u25BC${-n}</span>`:'<span class="mv same" title="Rank unchanged since the last ratings update">\u2014</span>'}function ae(e){return`${Math.round(e.rating-100)} \u2013 ${Math.round(e.rating+100)}`}function pe(e,t){return e.provisional?`<span class="prov-range" title="Provisional \u2014 estimated range (\xB1100). The exact rating is unreliable over few matches.">${t?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:ae(e)}</span>`:e.rating.toFixed(1)}var Oe="tt1v1_admin_log_v1",Y="tt1v1_admin_ok",z="tt1v1_admin_pw",Xe=()=>sessionStorage.getItem(Y)==="1"||localStorage.getItem(Y)==="1",ee=()=>sessionStorage.getItem(z)||localStorage.getItem(z)||"";function et(e,t){t?(localStorage.setItem(Y,"1"),localStorage.setItem(z,e)):(sessionStorage.setItem(Y,"1"),sessionStorage.setItem(z,e),localStorage.removeItem(Y),localStorage.removeItem(z))}function tt(){[sessionStorage,localStorage].forEach(e=>{e.removeItem(Y),e.removeItem(z)})}var qe=null,be=!1;function Ae(){be||!ee()||(clearTimeout(qe),qe=setTimeout(()=>publishLog({silent:!0}),1500))}var st=me.replace(/\/publish$/,"/verify"),at=me.replace(/\/publish$/,"/sync");function U(){try{return JSON.parse(localStorage.getItem(Oe)||"[]")}catch{return[]}}function Z(e){try{localStorage.setItem(Oe,JSON.stringify(e))}catch{}Ae()}var je="tt1v1_admin_over_v1";function C(){try{return JSON.parse(localStorage.getItem(je)||"{}")||{}}catch{return{}}}function N(e){try{localStorage.setItem(je,JSON.stringify(e))}catch{}Ae()}function P(){let e=window.LB_PUB||{},t=C(),a=new Set([...e.aliasRemoved||[],...t.aliasRemoved||[]]),n=new Set([...e.seedRemoved||[],...t.seedRemoved||[]]),o=t.aliases||{},m={...t.seeds||{},...t.seedGlicko||{},...t.seedRd||{}},g=E=>Object.fromEntries(Object.entries(E||{}).filter(([s])=>!a.has(s)||o[s]!=null)),p=E=>Object.fromEntries(Object.entries(E||{}).filter(([s])=>!n.has(s)||m[s]!=null)),i=g({...e.aliases||{},...t.aliases||{}}),y=g({...e.aliasNotes||{},...t.aliasNotes||{}}),k=p({...e.seeds||{},...t.seeds||{}}),w=p({...e.seedGlicko||{},...t.seedGlicko||{}}),L=p({...e.seedRd||{},...t.seedRd||{}});return{aliases:i,aliasNotes:y,seeds:k,seedGlicko:w,seedRd:L,aliasRemoved:[...a].filter(E=>i[E]==null),seedRemoved:[...n].filter(E=>k[E]==null&&w[E]==null&&L[E]==null),settings:{...e.settings||{},...t.settings||{}},matchEdits:{...e.matchEdits||{},...t.matchEdits||{}},inactive:t.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...t.matchRemoved||[]])],faq:t.faq!=null?t.faq:e.faq!=null?e.faq:null}}function Pe(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function B(){let e=P(),t=e.matchEdits||{},a=new Set(e.matchRemoved||[]),n=(w,L)=>{if(a.has(L))return null;let E=t[L],s=E?{...w,sa:E.sa,sb:E.sb,date:E.date!=null?E.date:w.date}:w;return{...s,a:D(s.a),b:D(s.b),sa:+s.sa,sb:+s.sb,key:L}},o=U().map((w,L)=>n({...w,admin:!0,published:!1},"l:"+L)).filter(Boolean),m=Pe().map((w,L)=>n({...w,admin:!0,published:!0},"p:"+L)).filter(Boolean),g=_.matches.map((w,L)=>n({...w,admin:!1,published:!1},"a:"+L)).filter(Boolean).reverse(),p=w=>{let L=w.a>w.b;return[L?w.b:w.a,L?w.a:w.b,L?w.sb:w.sa,L?w.sa:w.sb,w.date||""].join("|")},i={};g.forEach(w=>{let L=p(w);i[L]=(i[L]||0)+1});let y={};return o.concat(m).filter(w=>{let L=p(w);return y[L]=(y[L]||0)+1,y[L]>(i[L]||0)}).concat(g)}var M={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},de=864e5,se=Math.log(10)/400,Ie=e=>1/Math.sqrt(1+3*se*se*e*e/(Math.PI*Math.PI)),ye=(e,t,a)=>1/(1+Math.pow(10,-Ie(a)*(e-t)/400));function it(e){let t=P().seeds||{};return t[e]!=null&&t[e]!==""?Number(t[e]):re[e]}function nt(e){let t=(P().seedGlicko||{})[e],a=(P().seedRd||{})[e],n=t!=null&&t!==""?Number(t):null,o=a!=null&&a!==""?Number(a):null;if(n!=null||o!=null)return[n??M.unratedR,o??M.unratedRd];let m=it(e);return m!=null?[Math.max(M.seedMid+(m-M.oldMid)*M.ptsPer,M.minSeed),M.knownRd]:[M.unratedR,M.unratedRd]}function Ne(e,t,a){let n=0,o=0;for(let[g,p,i]of a){let y=Ie(p),k=ye(e,g,p);n+=y*y*k*(1-k),o+=y*(i-k)}if(n*=se*se,n<=0)return[e,t];let m=1/(t*t)+n;return[e+se/m*o,Math.sqrt(1/m)]}function ot(e,t){let a=Math.pow(10,t),n=e*a,o=Math.floor(n);return Math.abs(n-o-.5)<1e-6?(o%2===0?o:o+1)/a:Math.round(n)/a}var Se=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(M.periodDays*de)),te=Se(M.graceStart),lt={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function Me(){let e=P().settings||{};return(_.settings||[]).map(t=>({...t,value:Object.prototype.hasOwnProperty.call(e,t.name)?e[t.name]:t.value}))}function rt(){for(let e of Me()){let t=lt[e.name];if(!t)continue;if(t==="graceStart"){let n=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(n)&&(M.graceStart=n);continue}let a=Number(e.value);Number.isFinite(a)&&(M[t]=a)}te=Se(M.graceStart),T(".cons-val").forEach(e=>{e.textContent=String(M.conservative)}),T(".min-matches-val").forEach(e=>{e.textContent=String(M.minMatches)}),T(".min-opp-val").forEach(e=>{e.textContent=String(M.minOpp)})}function dt(){rt(),ze();let e={},t=s=>{if(!e[s]){let[l,v]=nt(s);e[s]={name:s,r:l,rd:v,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[s]},a=(s,l,v,d,b,c)=>{let u=t(s);u.games++,u.opps.add(l),v>d?u.w++:v<d?u.l++:u.d++,u.lastIdx=c,b&&(u.lastDate=b)},n={};for(let s of B()){if(s.date)continue;let l=s.a,v=s.b,d=s.sa>s.sb?1:s.sa<s.sb?0:.5;(n[l]=n[l]||[]).push([v,d]),(n[v]=n[v]||[]).push([l,1-d]),a(l,v,s.sa,s.sb,"",te),a(v,l,s.sb,s.sa,"",te)}let o={};for(let s in n)o[s]=[t(s).r,t(s).rd];for(let s in n){let[l,v]=Ne(o[s][0],o[s][1],n[s].map(([d,b])=>[o[d][0],o[d][1],b]));t(s).r=l,t(s).rd=v}let m=new Map;for(let s of B().filter(l=>l.date).slice().reverse()){let l=s.date,v=Se(l);m.has(v)||m.set(v,[]),m.get(v).push({a:D(s.a),b:D(s.b),sa:+s.sa,sb:+s.sb,date:l})}for(let s of[...m.keys()].sort((l,v)=>l-v)){for(let d in e){let b=e[d],c=s-(b.lastIdx==null?te:b.lastIdx);c>0&&(b.rd=Math.min(Math.sqrt(b.rd*b.rd+M.growth*M.growth*c),M.maxRd))}let l={};for(let d of m.get(s)){let b=d.sa>d.sb?1:d.sa<d.sb?0:.5;(l[d.a]=l[d.a]||[]).push([d.b,b]),(l[d.b]=l[d.b]||[]).push([d.a,1-b]),a(d.a,d.b,d.sa,d.sb,d.date,s),a(d.b,d.a,d.sb,d.sa,d.date,s)}let v={};for(let d in l)v[d]=[t(d).r,t(d).rd];for(let d in l){let[b,c]=Ne(v[d][0],v[d][1],l[d].map(([u,x])=>[v[u][0],v[u][1],x]));t(d).r=b,t(d).rd=c}}let g=Object.values(e).map(s=>({name:s.name,glicko:s.r,rd:s.rd,rating:s.r-M.conservative*s.rd,matches:s.games,w:s.w,l:s.l,d:s.d,winPct:s.games?ot(s.w/s.games*100,1):0,opponents:s.opps.size,avgOpp:0,lastMatch:s.lastDate||"",provisional:!(s.games>=M.minMatches&&s.opps.size>=M.minOpp),inactive:!1})),p={};g.forEach(s=>{p[s.name]=s.glicko}),g.forEach(s=>{let l=0;e[s.name].opps.forEach(v=>{l+=p[v]!=null?p[v]:M.unratedR}),s.avgOpp=e[s.name].opps.size?l/e[s.name].opps.size:0});let i=Date.now(),y=Math.floor(i/(M.periodDays*de));for(let s in e){let l=e[s],v=y-(l.lastIdx==null?te:l.lastIdx);v>0&&(l.rd=Math.min(Math.sqrt(l.rd*l.rd+M.growth*M.growth*v),M.maxRd))}g.forEach(s=>{s.glicko=e[s.name].r,s.rd=e[s.name].rd,s.rating=s.glicko-M.conservative*s.rd;let l=V[s.name];s.delta=l!=null?s.rating-l:0});let k=Date.parse(M.graceStart+"T00:00:00Z")+M.graceDays*de,w=new Set([...ge,...P().inactive||[]]);g.forEach(s=>{s.inactive=w.has(s.name)||(s.lastMatch?i-Date.parse(s.lastMatch+"T00:00:00Z")>M.inactiveDays*de:i>k)});let L=g.filter(s=>!s.provisional&&!s.inactive).sort((s,l)=>l.rating-s.rating);L.forEach((s,l)=>{s.rank=l+1}),g.sort((s,l)=>l.rating-s.rating);let E={};return g.forEach(s=>{E[s.name]=s}),{players:g,byName:E,qualified:L}}function q(){G=dt(),I=G.byName,A=G.qualified}var ct=["page-home","page-player","page-compare","page-matches","page-roster","page-analytics","page-method","page-faq","page-admin"];function Ee(){if($e){$e=!1;return}let e=location.hash||"#/";ct.forEach(o=>r("#"+o).classList.remove("active"));let t="#/"+(e.split("/")[1]||"");T(".nav a").forEach(o=>{let m=o.getAttribute("href");o.classList.toggle("active",m===t||e==="#/"&&m==="#/")});let a=r("#nav-glide"),n=document.querySelector(".nav a.active");if(a&&n?(a.style.width=n.offsetWidth+"px",a.style.transform=`translateX(${n.offsetLeft}px)`,a.style.opacity="1"):a&&(a.style.opacity="0"),e==="#/compare"||e.startsWith("#/compare/")){let o=e.split("/").slice(2).map(Te);Be(o[0]||"",o[1]||""),r("#page-compare").classList.add("active"),window.scrollTo(0,0)}else e.startsWith("#/player/")?(pt(Te(e.slice(9))),r("#page-player").classList.add("active"),window.scrollTo({top:0,behavior:"instant"in window?"instant":"auto"})):e==="#/matches"?(mt(),r("#page-matches").classList.add("active"),window.scrollTo(0,0)):e==="#/roster"?(ht(),r("#page-roster").classList.add("active"),window.scrollTo(0,0)):e==="#/analytics"?(ut(),r("#page-analytics").classList.add("active"),window.scrollTo(0,0)):e==="#/method"?(ft(),r("#page-method").classList.add("active"),window.scrollTo(0,0)):e==="#/faq"?(bt(),r("#page-faq").classList.add("active"),window.scrollTo(0,0)):e==="#/admin"?(O(),r("#page-admin").classList.add("active"),window.scrollTo(0,0)):(Re(),r("#page-home").classList.add("active"),requestAnimationFrame(vt));fe()}window.addEventListener("hashchange",Ee);function Re(){Q="all",j={key:"rank",dir:1},T(".chip[data-filter]").forEach(p=>p.classList.toggle("on",p.dataset.filter==="all")),T(".sortable").forEach(p=>p.classList.remove("sorted","asc"));let e=r('.sortable[data-key="rank"]');e&&e.classList.add("sorted");let t=B().length,a=G.players.length,n=A[0],o=Math.round(A.reduce((p,i)=>p+i.rd,0)/A.length);r("#hero-matches").textContent=t,r("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">Ranked players</div>
      <div class="v"><span class="cu" data-target="${A.length}">0</span><small>/ ${a} total</small></div></div>
    <div class="stat-card"><div class="k">Matches logged</div>
      <div class="v"><span class="cu" data-target="${t}">0</span></div></div>
    <div class="stat-card"><div class="k">Highest rating</div>
      <div class="v"><span class="cu" data-target="${n.rating}" data-dec="1">0</span><small>${f(n.name)}</small></div></div>
    <div class="stat-card"><div class="k">Avg certainty (RD)</div>
      <div class="v"><span class="cu" data-target="${o}" data-dec="1">0</span><small>certainty score</small></div></div>`;let m=[A[1],A[0],A[2]].filter(Boolean);r("#fl-cards").innerHTML=m.map(p=>`
    <div class="fl-card r${p.rank}${p.rank===1?" champ":""} reveal" data-goto="${f(p.name)}">
      <div class="fl-top">
        ${he(p.rank)}
        <div class="rd">RD ${p.rd.toFixed(0)}</div>
      </div>
      ${p.rank===1?'<div class="champ-tag">#1 Tank</div>':""}
      <div class="nm">${f(p.name)}</div>
      <div class="rating">
        <span class="unit">Rating</span>
        <div class="big-row"><span class="big">${Math.round(p.rating)}</span>${Le(p)}</div>
      </div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${p.winPct>=60?"":p.winPct>=40?"mid":"low"}" data-w="${p.winPct}"></div></div>
      </div>
      <div class="meta">
        <span><span class="w">${p.w}W</span> <span class="l">${p.l}L</span> ${p.d}D</span>
        <span class="wc">${p.winPct}%</span>
        <span class="opp">avg opp ${Math.round(p.avgOpp)}</span>
      </div>
    </div>`).join(""),requestAnimationFrame(()=>{T("#fl-cards .bar-fill").forEach(p=>{p.style.width=p.dataset.w+"%"})}),ie(),De();let g=r("#last-updated");g&&(g.textContent="Last updated "+(_.generated||"today"))}function De(){let e=B().filter(t=>t.date).slice(0,10);r("#battles-grid").innerHTML=e.length?e.map(t=>{let a=t.sa>t.sb,n=t.sb>t.sa;return`
    <div class="battle-row reveal" data-goto="${f(a?t.a:t.b)}">
      <div class="who ${a?"win":"lose"}" data-goto="${f(t.a)}">${f(t.a)}</div>
      <div class="vs">vs</div>
      <div class="who r ${n?"win":"lose"}" data-goto="${f(t.b)}">${f(t.b)}</div>
      <div class="sc mono"><span class="${a?"win":"lose"}">${t.sa}</span> \u2013 <span class="${n?"win":"lose"}">${t.sb}</span></div>
      <div class="dt">${t.date||(t.admin&&!t.published?"just now":"historical")}</div>
    </div>`}).join(""):'<div class="empty" style="padding:26px;text-align:center;color:var(--dim);grid-column:1/-1">No dated matches yet \u2014 new verified results will appear here as they are logged.</div>'}function ie(e="all",t="rank",a=1){let n=r("#lb-body"),m=(e==="all"&&ce?A:G.players).slice().map(i=>({...i,rank:i.rank!=null?i.rank:9999}));we&&(m=m.filter(i=>i.name.toLowerCase().includes(we))),e==="provisional"?m=m.filter(i=>(I[i.name]||{}).provisional):e==="inactive"?m=m.filter(i=>(I[i.name]||{}).inactive):e==="veterans"?m=m.filter(i=>i.matches>=15):e==="rising"&&(m=m.filter(i=>i.winPct>=60&&i.matches>=5)),m.sort((i,y)=>{let k=i[t],w=y[t];return(typeof k=="string"?k.localeCompare(w):k-w)*a});let g=new Map;T(".lb-row",n).forEach(i=>g.set(i.dataset.name,i.getBoundingClientRect().top));let p=Ze();n.innerHTML=m.map(i=>`
    <div class="lb-row ${i.rank<=3?"top"+i.rank:""}" data-name="${f(i.name)}" data-goto="${f(i.name)}">
      <div class="rank">${i.rank<=A.length?he(i.rank,"sm")+Ke(i,p):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="pname">${f(i.name)}</div></div>
      <div class="rating-cell mono">${Le(i)}${pe(i,!0)}</div>
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
      <div class="col-status">${Ye(i.name)||Qe(i.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?"Nobody is inactive right now \u2014 a player goes inactive 365 days after their last match (or when flagged in the master sheet).":e==="provisional"?"No provisional players right now.":"No players match this filter."}</div>`,requestAnimationFrame(()=>{T(".lb-row",n).forEach(i=>{let y=g.get(i.dataset.name),k=i.getBoundingClientRect().top;y!==void 0&&Math.abs(y-k)>1&&(i.style.transform=`translateY(${y-k}px)`,i.style.transition="none",requestAnimationFrame(()=>{i.style.transition="transform .5s cubic-bezier(.22,.8,.24,1)",i.style.transform=""}))}),T(".bar-fill",n).forEach(i=>{i.style.width=i.dataset.w+"%"})})}var Q="all",j={key:"rank",dir:1},we="",ce=!0;function vt(){T("#stat-strip .cu").forEach(e=>ke(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),T(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}r("#lb-qual").addEventListener("click",()=>{ce=!ce,r("#lb-qual").classList.toggle("on",ce),ie(Q,j.key,j.dir)});r("#lb-filter").addEventListener("input",e=>{we=e.target.value.trim().toLowerCase(),ie(Q,j.key,j.dir)});r("#theme-toggle").addEventListener("click",()=>{let t=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=t;try{localStorage.setItem("tt1v1_theme",t)}catch{}});document.addEventListener("click",e=>{let t=e.target.closest(".chip");if(t&&t.dataset.filter){T(".chip[data-filter]").forEach(o=>o.classList.remove("on")),t.classList.add("on"),Q=t.dataset.filter,ie(Q,j.key,j.dir);return}let a=e.target.closest(".sortable");if(a){let o=a.dataset.key;j.dir=j.key===o?-j.dir:1,j.key=o,T(".sortable").forEach(m=>m.classList.remove("sorted","asc")),a.classList.add("sorted"),j.dir===1&&a.classList.add("asc"),ie(Q,j.key,j.dir);return}let n=e.target.closest("[data-goto]");n&&(e.stopPropagation(),location.hash="#/player/"+F(n.dataset.goto))});function Be(e,t){let a=r("#cmp-wrap"),o=G.players.slice().sort((h,S)=>(h.rank!=null?h.rank:9999)-(S.rank!=null?S.rank:9999)||h.name.localeCompare(S.name)).map(h=>h.name);if(o.length<2){a.innerHTML='<div class="empty">Not enough players to compare yet.</div>';return}let m=I[e]?e:o[0],g=I[t]?t:o[1];g===m&&(g=o.find(h=>h!==m));let p=I[m],i=I[g],y=A.find(h=>h.name===m),k=A.find(h=>h.name===g),w=ye(p.glicko,i.glicko,i.rd),L=ye(i.glicko,p.glicko,p.rd),E=Math.round(w/(w+L)*1e3)/10,s=Math.round(1e3-E*10)/10,l=B().filter(h=>h.a===m&&h.b===g||h.a===g&&h.b===m).map(h=>{let S=h.a===m,R=S?h.sa:h.sb,W=S?h.sb:h.sa;return{fa:R,fb:W,res:R>W?"W":R<W?"L":"D",date:h.date}}),v=l.reduce((h,S)=>(S.res==="W"?h.w++:S.res==="L"?h.l++:h.d++,h),{w:0,l:0,d:0}),d=h=>`<option value="${f(h)}"${h===m?" selected":""}>${f(h)}</option>`,b=h=>`<option value="${f(h)}"${h===g?" selected":""}>${f(h)}</option>`,c=(h,S,R,W,We)=>`
    <div class="cmp-trow">
      <div class="va mono${W?" win":""}">${S}</div>
      <div class="k">${h}</div>
      <div class="vb mono${We?" win":""}">${R}</div>
    </div>`,u='<span style="color:var(--dimmer)">\u2014</span>';a.innerHTML=`
    <div class="kicker anim">versus</div>
    <h2 class="section-head anim" style="margin:6px 0 2px">Compare players</h2>
    <div class="cmp-pickers anim">
      <select id="cmp-a" aria-label="First player">${o.map(d).join("")}</select>
      <button class="btn btn-ghost" id="cmp-swap" style="width:auto;margin:0" title="Swap sides">\u21C4</button>
      <select id="cmp-b" aria-label="Second player">${o.map(b).join("")}</select>
    </div>
    <div class="cmp-share anim">
      <button class="btn btn-ghost" id="cmp-copy" style="width:auto;margin:0">Copy shareable link</button>
      <span class="caption" id="cmp-copy-msg"></span>
    </div>

    <div class="cmp-hero anim">
      <div class="cmp-side a">
        <div class="cmp-sub">${y?`Rank #${y.rank}`:"Unranked"}</div>
        <div class="cmp-name"><a href="#/player/${F(m)}">${f(m)}</a></div>
        <div class="cmp-rating mono">${p.provisional?ae(p):p.rating.toFixed(1)}</div>
        <div class="cmp-sub">RD ${p.rd.toFixed(1)} \xB7 ${p.matches} matches</div>
      </div>
      <div class="cmp-vs">
        <div class="vs-mark">VS</div>
        <div class="mono" style="font-size:11px;color:var(--dimmer)">${l.length} H2H</div>
      </div>
      <div class="cmp-side b">
        <div class="cmp-sub">${k?`Rank #${k.rank}`:"Unranked"}</div>
        <div class="cmp-name"><a href="#/player/${F(g)}">${f(g)}</a></div>
        <div class="cmp-rating mono">${i.provisional?ae(i):i.rating.toFixed(1)}</div>
        <div class="cmp-sub">RD ${i.rd.toFixed(1)} \xB7 ${i.matches} matches</div>
      </div>
    </div>

    <div class="panel anim">
      <h3>Estimated win probability <span class="n">\u2014 based on current Glicko ratings</span></h3>
      <div class="cmp-prob-labels">
        <span style="color:var(--gold)">${f(m)} ${E.toFixed(1)}%</span>
        <span style="color:var(--blue)">${s.toFixed(1)}% ${f(g)}</span>
      </div>
      <div class="cmp-probbar"><i class="pa" style="width:${E}%"></i><i class="pb" style="width:${s}%"></i></div>
      <div class="cmp-prob-note">Estimate only \u2014 computed with the leaderboard's own Glicko formula from each player's current rating and RD. It is not a guarantee: form, maps and matchups still decide the game.</div>
    </div>

    <div class="panel anim">
      <h3>Tale of the tape</h3>
      <div class="cmp-table">
        ${c("Rating",pe(p),pe(i),!p.provisional&&p.rating>i.rating,!i.provisional&&i.rating>p.rating)}
        ${c("Rank",y?"#"+y.rank:u,k?"#"+k.rank:u,y&&k&&y.rank<k.rank,y&&k&&k.rank<y.rank)}
        ${c("RD (uncertainty)",p.rd.toFixed(1),i.rd.toFixed(1),p.rd<i.rd,i.rd<p.rd)}
        ${c("Glicko",p.glicko.toFixed(1),i.glicko.toFixed(1),p.glicko>i.glicko,i.glicko>p.glicko)}
        ${c("Record",`<span style="color:var(--green)">${p.w}W</span> <span style="color:var(--red)">${p.l}L</span> ${p.d}D`,`<span style="color:var(--green)">${i.w}W</span> <span style="color:var(--red)">${i.l}L</span> ${i.d}D`,p.winPct>i.winPct,i.winPct>p.winPct)}
        ${c("Win rate",p.winPct+"%",i.winPct+"%",p.winPct>i.winPct,i.winPct>p.winPct)}
        ${c("Matches played",p.matches,i.matches,!1,!1)}
        ${c("Unique opponents",p.opponents,i.opponents,p.opponents>i.opponents,i.opponents>p.opponents)}
        ${c("Avg opponent rating",p.avgOpp.toFixed(1),i.avgOpp.toFixed(1),p.avgOpp>i.avgOpp,i.avgOpp>p.avgOpp)}
        ${c("Head to head",`${v.w}W \u2013 ${v.l}L \u2013 ${v.d}D`,`${v.l}W \u2013 ${v.w}L \u2013 ${v.d}D`,v.w>v.l,v.l>v.w)}
      </div>
    </div>

    <div class="panel anim">
      <h3>Previous meetings <span class="n">\u2014 ${l.length} ${l.length===1?"game":"games"}</span></h3>
      <div class="match-list">
        ${l.map(h=>`
          <div class="match-row">
            <div class="res-chip ${h.res}">${h.res}</div>
            <div class="who">${f(m)}</div>
            <div class="score mono">${h.fa} \u2013 ${h.fb}</div>
            <div class="who opp"><a href="#/player/${F(g)}" style="color:var(--blue)">${f(g)}</a></div>
            <div class="date mono">${h.date||"historical"}</div>
          </div>`).join("")||'<div class="empty">These two have never met.</div>'}
      </div>
      <div class="caption" style="margin-top:12px">Legacy archive games count toward head-to-head (the results are known) \u2014 their dates are not.</div>
    </div>`;let x=()=>{let h=r("#cmp-a").value,S=r("#cmp-b").value,R="#/compare/"+F(h)+"/"+F(S);location.hash!==R&&($e=!0,location.hash=R),Be(h,S)};r("#cmp-a").addEventListener("change",x),r("#cmp-b").addEventListener("change",x),r("#cmp-swap").addEventListener("click",()=>{let h=r("#cmp-a").value;r("#cmp-a").value=r("#cmp-b").value,r("#cmp-b").value=h,x()}),r("#cmp-copy").addEventListener("click",()=>{let h=location.href.split("#")[0]+"#/compare/"+F(m)+"/"+F(g),S=()=>{r("#cmp-copy-msg").textContent="Link copied \u2713"};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(h).then(S,()=>{r("#cmp-copy-msg").textContent=h}):r("#cmp-copy-msg").textContent=h})}var $e=!1;function pt(e){let t=I[e],a=r("#page-player");if(!t){a.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">
      No player called "<b>${f(e)}</b>" found. <a href="#/" style="color:var(--gold)">Back to the leaderboard</a>.
    </div></div></div>`;return}let n=A.find(i=>i.name===e),o=xe(e),m=o.slice(0,10),g=Ve(e),p=Math.max(3,Math.min(100,100-t.rd/120*100));a.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">\u2190 All rankings</a>
    <div class="player-hero anim">
      <div class="player-top">
        ${n?he(n.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${f(t.name)}</div>
          <div class="player-rankline">
            ${n?`Ranked <b>#${n.rank}</b> of ${A.length} qualified players`:"Unranked \u2014 not enough recent games for the board"}
            ${t.provisional?' \xB7 <span class="tag prov">provisional</span>':""}
            ${t.inactive?' \xB7 <span class="tag inact">inactive</span>':""}
          </div>
        </div>
        <div class="player-rating-block">
          <div class="lbl">${t.provisional?"Estimated range":"Visible rating"}</div>
          <div class="big mono${t.provisional?" prov-range":""}" id="pv-rating">${t.provisional?ae(t):"0"}</div>
          ${Le(t)}
          <div class="rd-bar">
            <div class="bar-track"><div class="bar-fill" style="width:${p}%"></div></div>
            <div class="caption"><span>certainty</span><span class="mono">RD ${t.rd.toFixed(1)}</span></div>
          </div>
        </div>
      </div>
      <div class="pstat-grid">
        <div class="pstat"><div class="k">Glicko</div><div class="v mono">${t.glicko.toFixed(1)}</div></div>
        <div class="pstat"><div class="k">Matches</div><div class="v mono">${t.matches}</div></div>
        <div class="pstat"><div class="k">Record</div><div class="v mono" style="font-size:19px"><span style="color:var(--green)">${t.w}W</span> <span style="color:var(--red)">${t.l}L</span> <span style="color:var(--dim)">${t.d}D</span></div></div>
        <div class="pstat"><div class="k">Win rate</div><div class="v mono">${t.winPct}%</div></div>
        <div class="pstat"><div class="k">Opponents</div><div class="v mono">${t.opponents}</div></div>
        <div class="pstat"><div class="k">Avg opp rating</div><div class="v mono">${t.avgOpp.toFixed(1)}</div></div>
      </div>
    </div>

    <div class="panel reveal">
      <h3>Recent form <span class="n">\u2014 last ${Math.min(10,o.length)}</span></h3>
      <div class="form-strip">
        ${m.map((i,y)=>`<div class="form-pill ${i.res}" style="animation-delay:${y*55}ms"
           title="vs ${f(i.opp)} ${i.for_}-${i.against}">${i.res}</div>`).join("")||'<span class="empty">No games yet</span>'}
      </div>
    </div>

    <div class="panel reveal">
      <h3>Match history <span class="n">\u2014 ${o.length} games</span></h3>
      <div class="match-list">
        ${o.map(i=>`
          <div class="match-row">
            <div class="res-chip ${i.res}">${i.res}</div>
            <div class="who">${f(t.name)}</div>
            <div class="score mono">${i.for_} \u2013 ${i.against}</div>
            <div class="who opp"><a href="#/player/${F(i.opp)}" style="color:var(--blue)">${f(i.opp)}</a></div>
            <div class="date mono">${i.date||"historical"}</div>
          </div>`).join("")||'<div class="empty">No games recorded</div>'}
      </div>
    </div>

    <div class="panel reveal">
      <h3>Head to head <span class="n">\u2014 ${g.length} opponents</span></h3>
      <div class="h2h-grid">
        ${g.map(i=>`
          <div class="h2h-card" data-goto="${f(i.opp)}">
            <div class="opp">${f(i.opp)}</div>
            <div class="rec mono"><span class="w">${i.w}W</span> \xB7 <span class="l">${i.l}L</span> \xB7 <span>${i.d}D</span> \xB7 ${i.pf}-${i.pa} pts</div>
          </div>`).join("")||'<div class="empty">No games recorded</div>'}
      </div>
    </div>
  </div>`,t.provisional||ke(r("#pv-rating"),t.rating,{dec:1,dur:900}),fe()}function mt(){De();let e=r("#gm-body"),t=B();r("#gm-count").textContent=`\u2014 ${t.length} games`,e.innerHTML=t.map(a=>{let n=a.sa>a.sb,o=a.sb>a.sa;return`
    <div class="gm-row">
      <div class="side ${n?"winner":"loser"}">
        <div class="dot ${n?"w":"l"}"></div>
        <div class="nm" data-goto="${f(a.a)}">${f(a.a)}</div>
      </div>
      <div class="sc mono" style="color:${n?"var(--green)":"var(--red)"}">${a.sa}</div>
      <div class="dash mono">\u2013</div>
      <div class="sc mono" style="color:${o?"var(--green)":"var(--red)"}">${a.sb}</div>
      <div class="side right ${o?"winner":"loser"}">
        <div class="dot ${o?"w":"l"}"></div>
        <div class="nm" data-goto="${f(a.b)}">${f(a.b)}</div>
      </div>
      <div class="dt mono">${a.admin&&!a.published?'<span class="tag fresh">new</span>':a.date||"historical"}</div>
    </div>`}).join("")}function ht(){let e=G.players.filter(t=>t.provisional).sort((t,a)=>a.rating-t.rating);r("#roster-grid").innerHTML=e.map(t=>{let a=Math.min(100,Math.round(Math.min(1,t.matches/5)*50+Math.min(1,t.opponents/3)*50));return`
    <div class="roster-card reveal" data-goto="${f(t.name)}">
      <div class="top">
        <div class="nm">${f(t.name)}</div>
        <svg class="shield" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"/></svg>
      </div>
      <div class="rating"><span class="unit">Est. range</span><span class="big prov-range">${ae(t)}</span></div>
      <div class="req-row"><span>Matches</span><span class="${t.matches>=5?"ok":""}">${t.matches} / 5 ${t.matches>=5?"\u2713":""}</span></div>
      <div class="req-row"><span>Opponents</span><span class="${t.opponents>=3?"ok":""}">${t.opponents} / 3 ${t.opponents>=3?"\u2713":""}</span></div>
      <div class="prog-track"><div class="prog-fill" data-w="${a}"></div></div>
      <div class="prog-label">${a}% to qualified</div>
    </div>`}).join(""),requestAnimationFrame(()=>T("#roster-grid .prog-fill").forEach(t=>{t.style.width=t.dataset.w+"%"}))}function ut(){let e=G.players,t=A.slice().sort((c,u)=>u.winPct-c.winPct).slice(0,10),a=e.slice().sort((c,u)=>u.matches-c.matches).slice(0,10),n=[];B().forEach(c=>{let u=I[c.a],x=I[c.b];if(!u||!x)return;let h=u.rating-x.rating;if(c.sa===c.sb)return;let S=c.sa>c.sb?c.a:c.b,R=Math.abs(h);(h<0&&S===c.a||h>0&&S===c.b)&&n.push({winner:S,loser:S===c.a?c.b:c.a,gap:R,score:S===c.a?`${c.sa}-${c.sb}`:`${c.sb}-${c.sa}`})}),n.sort((c,u)=>u.gap-c.gap);let o={};B().forEach(c=>{let u=[c.a,c.b].sort().join(" vs ");o[u]=(o[u]||0)+1});let m=Object.entries(o).sort((c,u)=>u[1]-c[1]).slice(0,10),g=e.map(c=>c.rating),p=Math.min(...g),i=Math.max(...g),y=8,k=(i-p)/y||1,w=Array.from({length:y},()=>0);g.forEach(c=>{w[Math.min(y-1,Math.max(0,Math.floor((c-p)/k)))]++});let L=Math.max(...w,1),E=w.map((c,u)=>{let x=Math.round((p+u*k)/10)*10,h=Math.round((p+(u+1)*k)/10)*10;return`
    <div class="hcol" title="${c} player${c===1?"":"s"} rated ${x}\u2013${h}">
      <div class="hbar" data-h="${Math.round(c/L*100)}"></div>
      <div class="hlbl">${x}\u2013${h}</div>
    </div>`}).join(""),s=e.slice().sort((c,u)=>u.opponents-c.opponents).slice(0,8),l=Math.max(...s.map(c=>c.opponents),1),v=s.map(c=>`
    <div class="mrow reveal" data-goto="${f(c.name)}">
      <div class="nm">${f(c.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(c.opponents/l*100)}"></div></div>
      <div class="val mono">${c.opponents}</div>
    </div>`).join(""),d=(c,u,x)=>c.map((h,S)=>`
    <div class="an-row reveal" data-goto="${f(h.name)}">
      <div class="idx mono">${S+1}</div>
      <div class="nm">${f(h.name)}</div>
      <div class="val mono">${u(h)}</div>
      <div class="unit mono">${x(h)}</div>
    </div>`).join("");r("#an-grid").innerHTML=`
    <div class="an-panel">
      <div class="head"><h3>Top win rate</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${d(t,c=>c.winPct+"%",c=>c.matches+" matches")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Most active</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/></svg>
      </div>
      ${d(a,c=>c.matches,c=>"matches")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Biggest upsets</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${n.length?n.slice(0,8).map((c,u)=>`
        <div class="an-row reveal" data-goto="${f(c.winner)}">
          <div class="idx mono">${u+1}</div>
          <div class="nm">${f(c.winner)} <span style="color:var(--dimmer);font-weight:500">def.</span> ${f(c.loser)}</div>
          <div class="val mono">${c.score}</div>
          <div class="unit mono">+${Math.round(c.gap)} pts</div>
        </div>`).join(""):'<div class="empty">No upsets on record</div>'}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Most contested rivalries</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${m.map(([c,u],x)=>`
        <div class="an-row reveal">
          <div class="idx mono">${x+1}</div>
          <div class="nm">${c.split(" vs ").map(f).join(' <span style="color:var(--dimmer);font-weight:500">vs</span> ')}</div>
          <div class="val mono">${u}</div>
          <div class="unit mono">meetings</div>
        </div>`).join("")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Rating distribution</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 20V10M10 20V4M16 20v-8M2 20h20" stroke-linecap="round"/></svg>
      </div>
      <div class="hist">${E}</div>
    </div>
    <div class="an-panel">
      <div class="head"><h3>Most unique opponents</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v5M12 15v5" stroke-linecap="round"/></svg>
      </div>
      ${v}
    </div>`;let b=()=>{T("#an-grid .hbar").forEach(c=>{c.style.height=c.dataset.h+"%"}),T("#an-grid .abar").forEach(c=>{c.style.width=c.dataset.w+"%"})};requestAnimationFrame(b),setTimeout(b,140),fe()}function ft(){r("#settings-body").innerHTML=Me().map(e=>`
    <tr><td><b>${f(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${f(e.desc)}</div></td>
        <td class="val">${f(String(e.value))}</td></tr>`).join("")}var gt=[{q:"How are the ratings calculated?",a:"Dynamic Glicko \u2014 the same model behind competitive chess and table-tennis rankings. Every recorded duel moves the numbers: beating a stronger opponent gains more, losing to a weaker one costs more. The full maths lives on the Method page."},{q:"Why did my rating drop even though I didn't play?",a:"That's the inactivity automation. Each 30-day rating period without a match grows your RD (uncertainty), and the visible rating subtracts half of it \u2014 so an idle rating slowly sinks on its own, exactly like the master sheet. Play one match and the drift stops."},{q:"What is RD, and why does it matter?",a:"RD (ratings deviation) is how certain the system is about your rating. New or idle players have a high RD; regular players have a low one. The board ranks the visible rating = Glicko \u2212 0.5 \xD7 RD, so uncertain ratings are held back until they've earned trust."},{q:"How do I get ranked on the leaderboard?",a:"Log at least 5 matches against at least 3 different opponents. Until then you're provisional \u2014 your rating is real and takes part in every calculation, but you aren't ranked yet."},{q:"What do the green and red arrows next to ratings mean?",a:"They show how your visible rating moved since the previous spreadsheet update: green \u25B2 means you climbed, red \u25BC means you dropped."},{q:"What does the \u201Cinactive\u201D tag mean?",a:"A qualified player is marked inactive \u2014 and hidden from the board \u2014 after 365 days without a dated match (legacy players without recorded dates get a 365-day grace window first). Your rating isn't deleted: come back, play a match, and you're active again."},{q:"Do my old 0\u2013100 ladder ratings still count?",a:"Yes. Historical scores are converted into Glicko starting points (old 80 \u2248 1500), so the ladder carries over. This site reproduces the master sheet's seeding exactly, including its low-end floor."},{q:"Two names on the board look like the same person \u2014 is that a bug?",a:"Possibly an alias. When we confirm two names are the same player, a name fix merges them everywhere \u2014 records, ratings and head-to-heads \u2014 without rewriting old matches. Report suspicious duplicates through the feedback button."},{q:"How do I get my duels recorded?",a:"Matches are logged by the team after official 1v1 duels. If a match is missing or has the wrong score, send feedback with the details and we'll fix it \u2014 corrections recalculate every rating instantly."},{q:"The numbers here differ from the Google Sheet \u2014 what do I do?",a:"They shouldn't: every figure on this site is recomputed from the raw results and validated against the official sheet down to the decimal. If you spot a gap, screenshot it and send feedback \u2014 that's a bug report we want."},{q:"Who runs this site?",a:"Alternator & interstellar. The leaderboard is data-driven \u2014 no manual rankings, no politics. Just duels."}];function ve(){let e=P().faq;return Array.isArray(e)&&e.length?e:gt}function bt(){r("#faq-list").innerHTML=ve().map((e,t)=>`
    <div class="faq-item reveal" data-faq="${t}">
      <button class="faq-q" aria-expanded="false">
        <span>${f(String(e.q||""))}</span>
        <svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="faq-a"><div class="faq-a-in">${f(String(e.a||""))}</div></div>
    </div>`).join(""),fe()}document.addEventListener("click",e=>{let t=e.target.closest(".faq-q");if(!t)return;let a=t.closest(".faq-item"),n=a.classList.contains("open");T(".faq-item.open").forEach(o=>{o.classList.remove("open"),o.querySelector(".faq-q").setAttribute("aria-expanded","false")}),n||(a.classList.add("open"),t.setAttribute("aria-expanded","true"))});function O(){let e=r("#admin-wrap");if(!Xe()){e.innerHTML=`
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
    </div>`;let s=async()=>{let l=r("#admin-pw").value;try{let v=await fetch(st,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:l})});if(v.ok){let d=await v.json().catch(()=>({}));et(d.token||l,r("#admin-remember").checked),O(),$("Welcome back, commander.");return}if(v.status===429){$("Too many attempts \u2014 wait a few minutes.");return}}catch{}r("#admin-pw").style.borderColor="var(--red)",$("Wrong password.")};r("#admin-auth").addEventListener("click",s),r("#admin-pw").addEventListener("keydown",l=>{l.key==="Enter"&&s()});return}let a=U(),n=Pe().length,o=P(),m='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',g=Object.entries(o.aliases).map(([s,l])=>`
    <div class="log-item">
      <div class="txt"><b>${f(s)}</b> \u2192 <b>${f(l)}</b>${o.aliasNotes&&o.aliasNotes[s]?` <span style="color:var(--dimmer)">\u2014 ${f(o.aliasNotes[s])}</span>`:""}</div>
      <button class="icon-btn" data-alias-del="${f(s)}" title="Remove name fix">${m}</button>
    </div>`).join("")||'<div class="empty">No name fixes yet.</div>',p=o.inactive.map(s=>`
    <div class="log-item">
      <div class="txt"><b>${f(s)}</b> <span style="color:var(--dimmer)">\u2014 inactive</span></div>
      <button class="icon-btn" data-inact-del="${f(s)}" title="Mark active again">${m}</button>
    </div>`).join("")||'<div class="empty">Nobody marked inactive.</div>',i=Object.keys({...o.seeds||{},...o.seedGlicko||{},...o.seedRd||{}}).map(s=>`
    <div class="log-item">
      <div class="txt"><b>${f(s)}</b> \xB7 <span style="color:var(--dimmer)">old</span> <b class="mono">${f(String((o.seeds||{})[s]!=null?(o.seeds||{})[s]:"\u2014"))}</b>${(o.seedGlicko||{})[s]!=null?` \xB7 <span style="color:var(--dimmer)">glicko</span> <b class="mono">${f(String(o.seedGlicko[s]))}</b>`:""}${(o.seedRd||{})[s]!=null?` \xB7 <span style="color:var(--dimmer)">rd</span> <b class="mono">${f(String(o.seedRd[s]))}</b>`:""}</div>
      <button class="icon-btn" data-seed-del="${f(s)}" title="Remove seed">${m}</button>
    </div>`).join("")||'<div class="empty">No seed overrides \u2014 players start from the sheet values.</div>',y=Me().map(s=>`
    <div class="set-row">
      <div class="lbl"><b>${f(s.name)}</b><div class="d">${f(String(s.desc||""))}</div></div>
      <input class="set-val mono" data-set-name="${f(s.name)}" value="${f(String(s.value))}">
    </div>`).join(""),k=s=>{let l=(s||"").trim().toLowerCase();return B().filter(d=>!l||d.a.toLowerCase().includes(l)||d.b.toLowerCase().includes(l)).slice(0,20).map(d=>`
      <div class="log-item fix-row" data-mkey="${d.key}">
        <div class="txt"><b>${f(d.a)}</b> <span style="color:var(--dimmer)">vs</span> <b>${f(d.b)}</b>${d.date?"":' <span class="tag legacy">legacy</span>'}</div>
        <input class="mono" data-f="sa" type="number" min="0" value="${d.sa}" title="Score 1">
        <input class="mono" data-f="sb" type="number" min="0" value="${d.sb}" title="Score 2">
        <input data-f="date" type="date" value="${d.date||""}" title="Match date">
        <button class="icon-btn" data-msave="${d.key}" title="Save fix"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-mdel="${d.key}" title="Delete match">${m}</button>
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
      <h3>Pending <span class="n">log</span> \u2014 ${a.length} local \xB7 ${n} published</h3>
      <div class="log-list" id="adm-list">
        ${a.length?a.map((s,l)=>`
          <div class="log-item">
            <div class="txt"><b>${f(s.a)}</b> ${s.sa}\u2013${s.sb} <b>${f(s.b)}</b></div>
            <div class="txt" style="color:var(--dimmer)">${f(s.date||"")}</div>
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
      <div class="log-list" id="ov-inact-list" style="margin-top:12px">${p}</div>
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

  <datalist id="player-list">${G.players.map(s=>`<option value="${f(s.name)}">`).join("")}</datalist>`,r("#admin-lock").addEventListener("click",()=>{tt(),O()}),r("#admin-publish").addEventListener("click",()=>w()),r("#admin-sync").addEventListener("click",async()=>{let s=r("#admin-sync"),l=r("#admin-sync-status");s.disabled=!0,l.textContent="syncing\u2026";try{let v=await fetch(at,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:ee()})}),d=await v.json().catch(()=>({}));v.ok&&d.ok?(l.textContent=d.changed?`synced \u2713 ${d.matches} matches / ${d.players} players`:"already up to date \u2713",$(d.changed?"Sheet synced \u2014 the live site was updated.":"Site already matches the sheet.")):v.status===429?(l.textContent="rate limited",$("Too many attempts \u2014 wait a few minutes.")):(l.textContent="sync failed",$("Sync failed: "+(d.error||v.status)))}catch{l.textContent="network error",$("Sync failed (network).")}s.disabled=!1});async function w(s){let l=!!(s&&s.silent),v=ee()||(l?"":(window.prompt("Admin password:")||"").trim());if(!v){$(l?'Saved here \u2014 auto-publish needs a stored password. Use "Publish to everyone".':"Publish cancelled.");return}be=!0;let d=P(),b={},c=[];for(let[h,S]of Object.entries(d.matchEdits||{}))h.startsWith("a:")&&(b[h]=S);for(let h of d.matchRemoved||[])h.startsWith("a:")&&c.push(h);let u=B().filter(h=>h.admin).map(h=>({a:h.a,b:h.b,sa:h.sa,sb:h.sb,date:h.date||""})),x={matches:u,aliases:d.aliases||{},aliasNotes:d.aliasNotes||{},aliasRemoved:d.aliasRemoved||[],inactive:d.inactive||[],seeds:d.seeds||{},seedGlicko:d.seedGlicko||{},seedRd:d.seedRd||{},seedRemoved:d.seedRemoved||[],settings:d.settings||{},matchEdits:b,matchRemoved:c,faq:d.faq!=null?d.faq:[]};try{let h=await fetch(me,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:v,doc:x,message:`Publish match log (${u.length} matches)`})}),S=await h.json().catch(()=>({}));if(!h.ok||!S.ok){h.status===403&&sessionStorage.removeItem(z),$("Publish failed: "+(S.error||"HTTP "+h.status));return}window.LB_PUB=x,window.LB_LOG=u,Z([]),N({}),q(),l||O(),$(l?"Saved \u2014 live for everyone \u2713":"Published! Everyone sees it on their next visit.")}catch{$("Publish failed: network error.")}finally{be=!1}}r("#admin-export").addEventListener("click",()=>{let s=new Blob([JSON.stringify(U(),null,2)],{type:"application/json"}),l=document.createElement("a");l.href=URL.createObjectURL(s),l.download="match-log.json",l.click(),URL.revokeObjectURL(l.href),$("Log exported.")}),r("#adm-add").addEventListener("click",()=>{let s=r("#adm-a").value.trim(),l=r("#adm-b").value.trim(),v=parseInt(r("#adm-sa").value,10),d=parseInt(r("#adm-sb").value,10);if(!s||!l||s.toLowerCase()===l.toLowerCase()||!Number.isFinite(v)||!Number.isFinite(d)){$("Fill in both players and scores.");return}let b=U();b.unshift({a:s,b:l,sa:v,sb:d,date:r("#adm-date")?r("#adm-date").value||new Date().toISOString().slice(0,10):new Date().toISOString().slice(0,10)}),Z(b),q(),O(),$(`${s} ${v}\u2013${d} ${l} added \u2014 site recalculated live.`)}),r("#adm-list").addEventListener("click",s=>{let l=s.target.closest("[data-del]");if(!l)return;let v=U();v.splice(parseInt(l.dataset.del,10),1),Z(v),q(),O()}),r("#ov-alias-add").addEventListener("click",()=>{let s=r("#ov-alias-a").value.trim(),l=r("#ov-alias-b").value.trim(),v=(r("#ov-alias-note")||{}).value.trim();if(!s||!l){$("Fill both: the wrong name and the correct player.");return}let d=Object.keys(I).find(c=>c.toLowerCase()===l.toLowerCase())||l,b=C();N({...b,aliases:{...b.aliases||{},[s]:d},aliasNotes:v?{...b.aliasNotes||{},[s]:v}:b.aliasNotes||{},aliasRemoved:(b.aliasRemoved||[]).filter(c=>c!==s)}),q(),O(),$(`Name fix saved \u2014 "${s}" now counts as ${d}.`)}),r("#ov-alias-list").addEventListener("click",s=>{let l=s.target.closest("[data-alias-del]");if(!l)return;let v=l.dataset.aliasDel,d=C(),b={...d.aliases||{}},c={...d.aliasNotes||{}};delete b[v],delete c[v],N({...d,aliases:b,aliasNotes:c,aliasRemoved:[...new Set([...d.aliasRemoved||[],v])]}),q(),O(),$("Name fix removed.")}),r("#ov-inact-toggle").addEventListener("click",()=>{let s=r("#ov-inact-n").value.trim();if(!s){$("Type a player name first.");return}let l=C(),v=P().inactive||[],d=v.includes(s)?v.filter(b=>b!==s):[...v,s];N({...l,inactive:d}),q(),O(),$(d.includes(s)?`${s} marked inactive.`:`${s} marked active again.`)}),r("#ov-inact-list").addEventListener("click",s=>{let l=s.target.closest("[data-inact-del]");if(!l)return;let v=C();N({...v,inactive:(P().inactive||[]).filter(d=>d!==l.dataset.inactDel)}),q(),O()}),r("#ov-seed-add").addEventListener("click",()=>{let s=r("#ov-seed-n").value.trim(),l=r("#ov-seed-v").value.trim(),v=r("#ov-seed-g").value.trim(),d=r("#ov-seed-rd").value.trim();if(!s){$("Pick a player first.");return}if(l===""&&v===""&&d===""){$("Enter an Old 0\u2013100 rating, or a Starting Glicko / RD.");return}let b=C(),c={...b.seeds||{}},u={...b.seedGlicko||{}},x={...b.seedRd||{}};l!==""&&Number.isFinite(Number(l))?c[s]=Number(l):delete c[s],v!==""&&Number.isFinite(Number(v))?u[s]=Number(v):delete u[s],d!==""&&Number.isFinite(Number(d))?x[s]=Number(d):delete x[s],N({...b,seeds:c,seedGlicko:u,seedRd:x,seedRemoved:(b.seedRemoved||[]).filter(h=>h!==s)}),q(),O(),$(`Seed saved for ${s}.`)}),r("#ov-seed-list").addEventListener("click",s=>{let l=s.target.closest("[data-seed-del]");if(!l)return;let v=l.dataset.seedDel,d=C(),b={...d.seeds||{}};delete b[v];let c={...d.seedGlicko||{}};delete c[v];let u={...d.seedRd||{}};delete u[v],N({...d,seeds:b,seedGlicko:c,seedRd:u,seedRemoved:[...new Set([...d.seedRemoved||[],v])]}),q(),O()}),r("#ov-settings").addEventListener("change",s=>{let l=s.target.closest("[data-set-name]");if(!l)return;let v=C();N({...v,settings:{...v.settings||{},[l.dataset.setName]:l.value}}),q(),O(),$("Setting applied \u2014 everything recalculated.")}),r("#ov-set-reset").addEventListener("click",()=>{let s=C();N({...s,settings:{}}),q(),O(),$("Settings back to the master sheet values.")}),r("#ov-mq").addEventListener("input",()=>{r("#ov-mresults").innerHTML=k(r("#ov-mq").value)}),r("#ov-mresults").addEventListener("click",s=>{let l=s.target.closest("[data-msave]"),v=s.target.closest("[data-mdel]");if(l){let d=l.closest("[data-mkey]"),b=d.dataset.mkey,c=x=>d.querySelector(`[data-f="${x}"]`).value,u=C();N({...u,matchEdits:{...u.matchEdits||{},[b]:{sa:+c("sa"),sb:+c("sb"),date:c("date")}}}),q(),r("#ov-mresults").innerHTML=k(r("#ov-mq").value),$("Match fixed \u2014 ratings recalculated.")}else if(v){let d=v.dataset.mdel,b=C();N({...b,matchRemoved:[...new Set([...b.matchRemoved||[],d])]}),q(),r("#ov-mresults").innerHTML=k(r("#ov-mq").value),$("Match deleted \u2014 ratings recalculated.")}}),r("#pl-add").addEventListener("click",()=>{let s=r("#pl-name").value.trim(),l=r("#pl-opp").value.trim(),v=parseInt(r("#pl-sa").value,10),d=parseInt(r("#pl-sb").value,10);if(!s||!l||s.toLowerCase()===l.toLowerCase()||!Number.isFinite(v)||!Number.isFinite(d)){$("A player needs a name, an opponent and both scores \u2014 at least 1 result.");return}if(I[D(s)]){$(`${s} already exists \u2014 log a match for them instead.`);return}let b=U();b.unshift({a:s,b:l,sa:v,sb:d,date:(r("#pl-date")||{}).value||new Date().toISOString().slice(0,10)}),Z(b);let c=(r("#pl-seed")||{}).value.trim();if(c!==""&&Number.isFinite(Number(c))){let u=C();N({...u,seeds:{...u.seeds||{},[D(s)]:Number(c)},seedRemoved:(u.seedRemoved||[]).filter(x=>x!==D(s))})}q(),O(),$(`${s} added with their first result \u2014 ${v}\u2013${d} vs ${l}.`)}),r("#pl-del-btn").addEventListener("click",()=>{let s=r("#pl-del").value.trim(),l=D(s),v=B().filter(R=>R.a===l||R.b===l);if(!v.length){$(`No player called "${s}" with matches found.`);return}if(!window.confirm(`Remove ${l} and ${v.length} match${v.length===1?"":"es"}? This recalculates every rating.`))return;let d=C(),b=[...d.matchRemoved||[]],c=[];v.forEach(R=>{R.key.startsWith("l:")?c.push(parseInt(R.key.slice(2),10)):b.push(R.key)});let u=U();c.sort((R,W)=>W-R).forEach(R=>u.splice(R,1)),Z(u);let x={...d.seeds||{}},h={...d.seedGlicko||{}},S={...d.seedRd||{}};delete x[l],delete h[l],delete S[l],N({...d,matchRemoved:[...new Set(b)],seeds:x,seedGlicko:h,seedRd:S,seedRemoved:[...new Set([...d.seedRemoved||[],l])],inactive:(P().inactive||[]).filter(R=>R!==l)}),q(),O(),$(`${l} removed with ${v.length} match${v.length===1?"":"es"}. Publish to make it public.`)});let L=()=>{let s=ve();r("#faq-admin-list").innerHTML=s.map((l,v)=>`
      <div class="log-item fix-row" data-faq-idx="${v}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${f(String(l.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${f(String(l.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${v}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${v}" title="Delete question">${m}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};L(),r("#faq-admin-list").addEventListener("click",s=>{let l=s.target.closest("[data-faq-save]"),v=s.target.closest("[data-faq-del]"),d=ve().map(c=>({...c}));if(l){let c=l.closest("[data-faq-idx]");d[parseInt(l.dataset.faqSave,10)]={q:c.querySelector('[data-fq="q"]').value.trim(),a:c.querySelector('[data-fq="a"]').value.trim()}}else if(v)d.splice(parseInt(v.dataset.faqDel,10),1);else return;let b=C();N({...b,faq:d}),L(),$("Q&A updated \u2014 publish to make it public.")}),r("#faq-add").addEventListener("click",()=>{let s=r("#faq-new-q").value.trim(),l=r("#faq-new-a").value.trim();if(!s||!l){$("Fill in both the question and the answer.");return}let v=C();N({...v,faq:[...ve().map(d=>({...d})),{q:s,a:l}]}),L(),$("Question added.")}),r("#faq-reset").addEventListener("click",()=>{let s=C();N({...s,faq:null}),L(),$("Q&A back to the built-in list.")}),window._fbTimer&&(clearInterval(window._fbTimer),window._fbTimer=null);async function E(){let s=r("#fb-inbox");if(!s||document.querySelector("#fb-inbox [data-fb-reply]:focus"))return;let l=ee();if(!l){s.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let v=await fetch(J+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:l})}),d=await v.json().catch(()=>({}));if(!v.ok||!d.ok){s.innerHTML=`<div class="empty">Could not load messages (${f(d.error||"HTTP "+v.status)}).</div>`;return}let b=d.items||[],c={};s.querySelectorAll("[data-fb-id]").forEach(u=>{let x=u.querySelector("[data-fb-reply]");x&&x.value&&(c[u.dataset.fbId]=x.value)}),s.innerHTML=b.map(u=>`
        <div class="log-item fb-row${u.resolved?" fb-done":""}" data-fb-id="${f(u.id)}" data-fb-resolved="${u.resolved?"1":""}">
          <div class="txt">
            <b>${f(u.name||"Anonymous")}</b>${u.contact?` <span style="color:var(--dimmer)">\xB7 ${f(u.contact)}</span>`:""}
            <span class="mono" style="color:var(--dimmer);font-size:11px;margin-left:6px">ticket ${f(u.id)}</span>
            ${u.resolved?'<span class="tag resolved" style="margin-left:6px">resolved \u2713</span>':`<span class="tag ${u.status==="replied"?"live":"fresh"}" style="margin-left:6px">${f(u.status)}</span>`}
            <div style="color:var(--dim);font-size:13px;margin-top:4px">${f(u.message)}</div>
            ${u.reply?`<div style="color:var(--gold);font-size:12.5px;margin-top:4px">\u21A9 ${f(u.reply)}</div>`:""}
          </div>
          <input class="set-val fb-reply-in" data-fb-reply placeholder="Write a reply\u2026" value="${f(u.reply||"")}">
          <button class="icon-btn" data-fb-send title="Send reply"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-resolve title="${u.resolved?"Reopen \u2014 mark as not resolved":"Mark as resolved"}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.6L16 9.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-del title="Delete message">${m}</button>
        </div>`).join("")||'<div class="empty">No messages yet.</div>',s.querySelectorAll("[data-fb-id]").forEach(u=>{let x=u.querySelector("[data-fb-reply]");x&&c[u.dataset.fbId]!=null&&(x.value=c[u.dataset.fbId])})}catch{s.innerHTML='<div class="empty">Network error loading messages.</div>'}}E(),r("#fb-refresh").addEventListener("click",()=>{E(),$("Inbox refreshed.")}),window._fbTimer=setInterval(()=>{if(!r("#fb-inbox")){clearInterval(window._fbTimer),window._fbTimer=null;return}document.hidden||E()},2e3),r("#fb-inbox").addEventListener("click",async s=>{let l=s.target.closest("[data-fb-send]"),v=s.target.closest("[data-fb-del]"),d=s.target.closest("[data-fb-resolve]");if(!l&&!v&&!d)return;let b=s.target.closest("[data-fb-id]"),c=b.dataset.fbId,u=ee();try{if(d){let x=b.dataset.fbResolved!=="1";if(!(await fetch(J+"/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:u,id:c,resolved:x})}).then(S=>S.json())).ok){$("Could not update \u2014 try again.");return}$(x?"Marked as resolved \u2713":"Message reopened."),E()}else if(l){let x=b.querySelector("[data-fb-reply]").value;if(!(await fetch(J+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:u,id:c,reply:x})}).then(S=>S.json())).ok){$("Reply failed.");return}$("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(J+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:u,id:c})}).then(h=>h.json())).ok){$("Delete failed.");return}b.remove(),$("Message deleted.")}}catch{$("Network error.")}})}var ne=document.getElementById("fl-cards");ne&&window.matchMedia("(hover: hover)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(ne.addEventListener("pointermove",e=>{let t=e.target.closest&&e.target.closest(".fl-card");if(!t)return;let a=t.getBoundingClientRect(),n=(e.clientX-a.left)/a.width-.5,o=(e.clientY-a.top)/a.height-.5;t.classList.add("tilt"),t.style.transform=`perspective(1000px) rotateY(${(n*7).toFixed(2)}deg) rotateX(${(-o*6).toFixed(2)}deg) translateY(-6px)`}),ne.addEventListener("pointerleave",()=>{ne.querySelectorAll(".fl-card").forEach(e=>{e.style.transform="",e.classList.remove("tilt")})}));r("#search").addEventListener("input",e=>{let t=e.target.value.trim().toLowerCase(),a=r("#search-drop");if(!t){a.classList.remove("show");return}let n=G.players.filter(o=>o.name.toLowerCase().includes(t)).slice(0,8);if(!n.length){a.classList.remove("show");return}a.innerHTML=n.map(o=>`
    <a class="drop-row" href="#/player/${F(o.name)}">
      ${o.rank?he(o.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${f(o.name)}</span>        <span class="mono" style="margin-left:auto;color:var(--dim)">${pe(o,!0)}</span>
    </a>`).join(""),a.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||r("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(r("#search-drop").classList.remove("show"),r("#search").value="")});var J=me.replace(/\/publish$/,"/feedback"),ue="tt1v1_fb_tickets";function yt(){try{return JSON.parse(localStorage.getItem(ue)||"[]")}catch{return[]}}function wt(e){let t=yt();t.push({id:e,ts:Date.now()});try{localStorage.setItem(ue,JSON.stringify(t.slice(-20)))}catch{}}function $t(){let e=r("#fb-overlay"),t=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>r("#fb-msg").focus(),180)},a=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};r("#fab-feedback").addEventListener("click",t),r("#fb-close").addEventListener("click",a),r("#fb-done").addEventListener("click",a),e.addEventListener("click",i=>{i.target===e&&a()}),document.addEventListener("keydown",i=>{i.key==="Escape"&&e.classList.contains("show")&&a()});let n=r("#faq-feedback-btn");n&&n.addEventListener("click",t);let o=r("#fb-msg"),m=r("#fb-count-n");o.addEventListener("input",()=>{m.textContent=String(o.value.length);try{localStorage.setItem("tt1v1_fb_draft",o.value)}catch{}});try{let i=localStorage.getItem("tt1v1_fb_draft");i&&(o.value=i,m.textContent=String(i.length))}catch{}let g=r("#fb-send");g.addEventListener("click",async()=>{let i=o.value.trim();if(i.length<5){o.focus(),o.classList.add("fb-nudge"),setTimeout(()=>o.classList.remove("fb-nudge"),500),$("Write a message first \u2014 a few words is plenty.");return}g.classList.add("busy"),g.disabled=!0;try{let y=await fetch(J,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:r("#fb-name").value.trim(),contact:r("#fb-contact").value.trim(),message:i})}),k=await y.json().catch(()=>({}));if(!y.ok||!k.ok){$("Could not send: "+(k.error||"HTTP "+y.status)+" \u2014 try again later.");return}wt(k.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}r("#fb-ticket-code").textContent=k.id,r("#fb-view-form").hidden=!0,r("#fb-view-done").hidden=!1}catch{$("Network error \u2014 your message was not sent.")}finally{g.classList.remove("busy"),g.disabled=!1}});let p=document.querySelector(".fb-ticket");p&&p.addEventListener("click",async()=>{let i=(r("#fb-ticket-code").textContent||"").trim();if(!i||i==="\u2014")return;try{await navigator.clipboard.writeText(i)}catch{let w=document.createElement("textarea");w.value=i,document.body.appendChild(w),w.select();try{document.execCommand("copy")}catch{}w.remove()}let y=r("#fb-copied");y&&(y.classList.add("show"),clearTimeout(window._fbCopiedT),window._fbCopiedT=setTimeout(()=>y.classList.remove("show"),1800)),$("Ticket code copied to clipboard.")}),r("#fb-check").addEventListener("click",async()=>{let i=r("#fb-ticket-in").value.trim(),y=r("#fb-reply-out");if(i){y.classList.add("show"),y.textContent="Checking\u2026";try{let k=await fetch(J+"/status?id="+encodeURIComponent(i)),w=await k.json().catch(()=>({}));if(!k.ok||!w.ok){y.textContent="No message found with that ticket code.";return}y.innerHTML=w.resolved?`Status: <b>resolved \u2713</b> \u2014 your message has been handled. Thanks for reaching out!${w.reply?`<br><b>Reply from the team:</b> ${f(w.reply)}`:""}`:w.reply?`<b>Reply from the team:</b> ${f(w.reply)}`:`Status: <b>${f(w.status)}</b> \u2014 your message is being reviewed, check back soon.`}catch{y.textContent="Network error \u2014 try again later."}}})}function kt(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let t=null,a=()=>{e.classList.remove("show"),t=null};document.addEventListener("mouseover",n=>{let o=n.target.closest&&n.target.closest("[title],[data-tip]");if(!o)return;o.hasAttribute("title")&&(o.setAttribute("data-tip",o.getAttribute("title")),o.removeAttribute("title"));let m=o.getAttribute("data-tip");if(!m)return;t=o,e.textContent=m;let g=o.getBoundingClientRect(),p=g.top<52;e.classList.toggle("below",p),e.style.left=Math.max(10,Math.min(window.innerWidth-10,g.left+g.width/2))+"px",e.style.top=(p?g.bottom+8:g.top-8)+"px",e.classList.add("show")}),document.addEventListener("mouseout",n=>{if(!t)return;let o=n.relatedTarget;o&&o.closest&&o.closest("[title],[data-tip]")===t||a()}),window.addEventListener("scroll",a,{passive:!0})}var Ce;function $(e){let t=r("#toast");t.textContent=e,t.classList.add("show"),clearTimeout(Ce),Ce=setTimeout(()=>t.classList.remove("show"),2600)}var K;function fe(){K&&K.disconnect(),K=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add("in"),T(".cu",t.target).forEach(a=>ke(a,parseFloat(a.dataset.target),{dec:parseInt(a.dataset.dec||0)})),K.unobserve(t.target))})},{threshold:.12}),T(".reveal").forEach(e=>K.observe(e))}(function(){let t=r("#scroll-progress"),a=r("#to-top"),n=r("#page-home .hero-row"),o=document.querySelector(".topbar"),m=()=>{let g=window.scrollY,p=document.documentElement.scrollHeight-window.innerHeight;t&&(t.style.width=(p>0?g/p*100:0)+"%"),a&&a.classList.toggle("show",g>640),o&&o.classList.toggle("scrolled",g>10),n&&g<1400&&(n.style.transform=`translateY(${g*.14}px)`,n.style.opacity=String(Math.max(.3,1-g/950)))};window.addEventListener("scroll",m,{passive:!0}),a&&a.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),m()})();q();Re();Ee();$t();kt();function oe(e,t){let a=e.indexOf("window."+t);if(a<0)return null;let n=e.indexOf("=",a);for(;n<e.length&&"{[".indexOf(e[n])<0;)n++;let o=0,m=!1,g="",p=!1;for(let i=n;i<e.length;i++){let y=e[i];if(m){p?p=!1:y==="\\"?p=!0:y===g&&(m=!1);continue}if(y==='"'||y==="'"){m=!0,g=y;continue}if(y==="{"||y==="[")o++;else if((y==="}"||y==="]")&&(o--,o<=0))return JSON.parse(e.slice(n,i+1))}return null}async function _e(e){try{let t="cb="+Date.now(),[a,n]=await Promise.all([fetch("data.js?"+t,{cache:"no-store"}),fetch("log.js?"+t,{cache:"no-store"})]);if(!a.ok||!n.ok)throw new Error("HTTP "+a.status+"/"+n.status);let o=await a.text(),m=await n.text(),g=oe(o,"LB_DATA"),p=oe(m,"LB_PUB")||(oe(m,"LB_LOG")?{matches:oe(m,"LB_LOG")}:null),i=[];if(g&&JSON.stringify(g)!==JSON.stringify(_)&&(_=g,window.LB_DATA=g,i.push("data")),p&&JSON.stringify(p)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=p,window.LB_LOG=p.matches||[],i.push("log")),i.length){q(),Re(),Ee();let y=r("#last-updated");y&&(y.textContent="Last updated "+(_.generated||"today"))}e&&$(i.length?"Refreshed \u2014 you have the latest data.":"Already up to date \u2713")}catch{e&&$("Refresh failed \u2014 check your connection.")}}_e(!1);var le=r("#lb-refresh-btn");le&&le.addEventListener("click",async()=>{le.classList.add("spinning"),await _e(!0),setTimeout(()=>le.classList.remove("spinning"),400)});var Fe="tt1v1_fb_seen",H=null;function xt(){try{return JSON.parse(localStorage.getItem(ue)||"[]")}catch{return[]}}function He(){try{return JSON.parse(localStorage.getItem(Fe)||"{}")||{}}catch{return{}}}function Lt(){let e=r("#fab-feedback");if(e&&!e.querySelector(".fb-dot")){let a=document.createElement("span");a.className="fb-dot",e.appendChild(a),requestAnimationFrame(()=>a.classList.add("in"))}let t=r("#fb-view-form");if(t&&!r("#fb-reply-banner")&&H){let a=document.createElement("div");a.id="fb-reply-banner",a.innerHTML=`<b>The team replied</b> to your message (ticket ${f(H.id)})
      <div class="r">${f(H.reply)}</div>
      <button class="btn btn-ghost" id="fb-got-it" style="margin-top:9px;padding:6px 13px">\u2713 Got it</button>`,t.insertAdjacentElement("beforebegin",a),requestAnimationFrame(()=>a.classList.add("show")),r("#fb-got-it").addEventListener("click",St)}}function St(){if(H){let a=He();a[H.id]=1;try{localStorage.setItem(Fe,JSON.stringify(a))}catch{}H=null}let e=r(".fb-dot");e&&(e.classList.add("out"),setTimeout(()=>e.remove(),420));let t=r("#fb-reply-banner");t&&(t.classList.remove("show"),setTimeout(()=>t.remove(),420))}async function Ge(){let e=He();H=null;let t=xt(),a=t.slice(0,Math.max(0,t.length-6)),n=[];for(let o of t.slice(-6))try{let m=await fetch(J+"/status?id="+encodeURIComponent(o.id),{cache:"no-store"}),g=await m.json().catch(()=>({}));if(m.status===404||m.ok&&g.ok===!1)continue;n.push(o),m.ok&&g.ok&&g.reply&&!e[o.id]&&!H&&(H={id:o.id,reply:g.reply})}catch{n.push(o)}if(n.length!==t.slice(-6).length)try{localStorage.setItem(ue,JSON.stringify([...a,...n]))}catch{}H&&Lt()}setTimeout(Ge,3500);setInterval(Ge,9e4);})();
