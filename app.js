/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var B=window.LB_DATA,he="https://tierstats-publish.tierstats.workers.dev/publish",l=(e,t=document)=>t.querySelector(e),T=(e,t=document)=>[...t.querySelectorAll(e)],b=e=>String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),F=e=>encodeURIComponent(String(e)),qe=e=>decodeURIComponent(e);function xe(e,t,a={}){let n=a.dur||1200,i=a.dec||0,f=performance.now(),h=parseFloat(e.textContent)||0;function p(v){let m=Math.min(1,(v-f)/n),L=1-Math.pow(1-m,3);e.textContent=(h+(t-h)*L).toFixed(i),m<1&&requestAnimationFrame(p)}requestAnimationFrame(p),setTimeout(()=>{e.textContent=t.toFixed(i)},n+300)}var ze='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',Ve='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function ue(e,t=""){let a=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",n=e<=3?e===1?ze:Ve:"";return`<div class="rank-badge ${a} ${t}" title="Rank #${e}">${n}<span class="num">${e}</span></div>`}var I={},A=[],G={players:[],byName:{},qualified:[]},X={},de={},V={},be=new Set;function Ye(){for(let a in X)delete X[a];let e=new Set(P().aliasRemoved||[]);Object.entries(B.aliases).forEach(([a,n])=>{e.has(a)||(X[a.toLowerCase()]=n)}),Object.entries(P().aliases||{}).forEach(([a,n])=>{X[String(a).toLowerCase()]=n});for(let a of Object.keys(de))delete de[a];for(let a of Object.keys(V))delete V[a];be.clear();let t=(a,n)=>{Object.keys(a||{}).forEach(i=>{let f=D(i);f!==i&&(n[f]=a[i])}),Object.keys(a||{}).forEach(i=>{let f=D(i);f===i&&(n[f]=a[i])})};t(B.seeds,de),t(B.prevRatings,V),(B.inactiveList||[]).forEach(a=>be.add(D(a)))}var D=e=>{let t=String(e).trim(),a=new Set;for(;;){let n=X[t.toLowerCase()];if(!n||n===t||a.has(t))return t;a.add(t),t=n}};function Le(e){let t=[];return _().forEach(a=>{let n=(i,f,h)=>({opp:i,for_:f,against:h,res:f>h?"W":f<h?"L":"D",date:a.date});a.a===e?t.push(n(a.b,a.sa,a.sb)):a.b===e&&t.push(n(a.a,a.sb,a.sa))}),t}function Qe(e){let t={};return Le(e).forEach(a=>{let n=t[a.opp]||(t[a.opp]={w:0,l:0,d:0,pf:0,pa:0});n[a.res.toLowerCase()]+=1,n.pf+=a.for_,n.pa+=a.against}),Object.entries(t).map(([a,n])=>({opp:a,...n})).sort((a,n)=>n.w+n.l+n.d-(a.w+a.l+a.d)||n.w-a.w)}function Ze(e){let t=I[e]||{};return t.provisional?'<span class="tag prov">provisional</span>':t.inactive?'<span class="tag inact">inactive</span>':""}function Ke(e){let t=Le(e).slice(0,5).reverse();if(!t.length)return"";let a=t.map(n=>n.res).join(" ");return`<span class="form" title="Last ${t.length} results (oldest \u2192 newest): ${a}">${t.map(n=>`<i class="${n.res.toLowerCase()}">${n.res}</i>`).join("")}</span>`}function Se(e){let t=e.delta!=null?e.delta:0;if(Math.abs(t)<.05)return"";let a=t>0;return`<span class="delta ${a?"up":"down"}" title="${a?"up":"down"} ${Math.abs(t).toFixed(1)} since the previous sheet update">${a?"\u25B2":"\u25BC"} ${Math.abs(t).toFixed(1)}</span>`}function Xe(){let e=B.prevRanks||{},t=Object.keys(e);if(t.length){let i={};return t.forEach(f=>{i[D(f)]=e[f]}),i}let a={};A.forEach(i=>{V[i.name]!=null&&(a[i.name]=V[i.name])});let n={};return Object.entries(a).sort((i,f)=>f[1]-i[1]).forEach(([i],f)=>{n[i]=f+1}),n}function et(e,t){let a=t[e.name];if(a==null)return'<span class="mv new" title="Newly qualified for the leaderboard">NEW</span>';let n=a-e.rank;return n>0?`<span class="mv up" title="Up ${n} place${n>1?"s":""} since the last ratings update">\u25B2${n}</span>`:n<0?`<span class="mv down" title="Down ${-n} place${n<-1?"s":""} since the last ratings update">\u25BC${-n}</span>`:'<span class="mv same" title="Rank unchanged since the last ratings update">\u2014</span>'}function ie(e){return`${Math.round(e.rating-100)} \u2013 ${Math.round(e.rating+100)}`}function me(e,t){return e.provisional?`<span class="prov-range" title="Provisional \u2014 estimated range (\xB1100). The exact rating is unreliable over few matches.">${t?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:ie(e)}</span>`:e.rating.toFixed(1)}var Ae="tt1v1_admin_log_v1",Y="tt1v1_admin_ok",z="tt1v1_admin_pw",tt=()=>sessionStorage.getItem(Y)==="1"||localStorage.getItem(Y)==="1",ee=()=>sessionStorage.getItem(z)||localStorage.getItem(z)||"";function st(e,t){t?(localStorage.setItem(Y,"1"),localStorage.setItem(z,e)):(sessionStorage.setItem(Y,"1"),sessionStorage.setItem(z,e),localStorage.removeItem(Y),localStorage.removeItem(z))}function at(){[sessionStorage,localStorage].forEach(e=>{e.removeItem(Y),e.removeItem(z)})}var Ne=null,ye=!1;function je(){ye||!ee()||(clearTimeout(Ne),Ne=setTimeout(()=>publishLog({silent:!0}),1500))}var it=he.replace(/\/publish$/,"/verify"),nt=he.replace(/\/publish$/,"/sync");function U(){try{return JSON.parse(localStorage.getItem(Ae)||"[]")}catch{return[]}}function Z(e){try{localStorage.setItem(Ae,JSON.stringify(e))}catch{}je()}var Pe="tt1v1_admin_over_v1";function C(){try{return JSON.parse(localStorage.getItem(Pe)||"{}")||{}}catch{return{}}}function N(e){try{localStorage.setItem(Pe,JSON.stringify(e))}catch{}je()}function P(){let e=window.LB_PUB||{},t=C(),a=new Set([...e.aliasRemoved||[],...t.aliasRemoved||[]]),n=new Set([...e.seedRemoved||[],...t.seedRemoved||[]]),i=t.aliases||{},f={...t.seeds||{},...t.seedGlicko||{},...t.seedRd||{}},h=E=>Object.fromEntries(Object.entries(E||{}).filter(([s])=>!a.has(s)||i[s]!=null)),p=E=>Object.fromEntries(Object.entries(E||{}).filter(([s])=>!n.has(s)||f[s]!=null)),v=h({...e.aliases||{},...t.aliases||{}}),m=h({...e.aliasNotes||{},...t.aliasNotes||{}}),L=p({...e.seeds||{},...t.seeds||{}}),w=p({...e.seedGlicko||{},...t.seedGlicko||{}}),x=p({...e.seedRd||{},...t.seedRd||{}});return{aliases:v,aliasNotes:m,seeds:L,seedGlicko:w,seedRd:x,aliasRemoved:[...a].filter(E=>v[E]==null),seedRemoved:[...n].filter(E=>L[E]==null&&w[E]==null&&x[E]==null),settings:{...e.settings||{},...t.settings||{}},matchEdits:{...e.matchEdits||{},...t.matchEdits||{}},inactive:t.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...t.matchRemoved||[]])],faq:t.faq!=null?t.faq:e.faq!=null?e.faq:null}}function Ie(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function _(){let e=P(),t=e.matchEdits||{},a=new Set(e.matchRemoved||[]),n=(w,x)=>{if(a.has(x))return null;let E=t[x],s=E?{...w,sa:E.sa,sb:E.sb,date:E.date!=null?E.date:w.date}:w;return{...s,a:D(s.a),b:D(s.b),sa:+s.sa,sb:+s.sb,key:x}},i=U().map((w,x)=>n({...w,admin:!0,published:!1},"l:"+x)).filter(Boolean),f=Ie().map((w,x)=>n({...w,admin:!0,published:!0},"p:"+x)).filter(Boolean),h=B.matches.map((w,x)=>n({...w,admin:!1,published:!1},"a:"+x)).filter(Boolean).reverse(),p=w=>{let x=w.a>w.b;return[x?w.b:w.a,x?w.a:w.b,x?w.sb:w.sa,x?w.sa:w.sb,w.date||""].join("|")},v={};h.forEach(w=>{let x=p(w);v[x]=(v[x]||0)+1});let m={};return i.concat(f).filter(w=>{let x=p(w);return m[x]=(m[x]||0)+1,m[x]>(v[x]||0)}).concat(h)}var M={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},ce=864e5,ae=Math.log(10)/400,De=e=>1/Math.sqrt(1+3*ae*ae*e*e/(Math.PI*Math.PI)),we=(e,t,a)=>1/(1+Math.pow(10,-De(a)*(e-t)/400));function ot(e){let t=P().seeds||{};return t[e]!=null&&t[e]!==""?Number(t[e]):de[e]}function lt(e){let t=(P().seedGlicko||{})[e],a=(P().seedRd||{})[e],n=t!=null&&t!==""?Number(t):null,i=a!=null&&a!==""?Number(a):null;if(n!=null||i!=null)return[n??M.unratedR,i??M.unratedRd];let f=ot(e);return f!=null?[Math.max(M.seedMid+(f-M.oldMid)*M.ptsPer,M.minSeed),M.knownRd]:[M.unratedR,M.unratedRd]}function Ce(e,t,a){let n=0,i=0;for(let[h,p,v]of a){let m=De(p),L=we(e,h,p);n+=m*m*L*(1-L),i+=m*(v-L)}if(n*=ae*ae,n<=0)return[e,t];let f=1/(t*t)+n;return[e+ae/f*i,Math.sqrt(1/f)]}function rt(e,t){let a=Math.pow(10,t),n=e*a,i=Math.floor(n);return Math.abs(n-i-.5)<1e-6?(i%2===0?i:i+1)/a:Math.round(n)/a}var Me=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(M.periodDays*ce)),te=Me(M.graceStart),dt={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function Ee(){let e=P().settings||{};return(B.settings||[]).map(t=>({...t,value:Object.prototype.hasOwnProperty.call(e,t.name)?e[t.name]:t.value}))}function ct(){for(let e of Ee()){let t=dt[e.name];if(!t)continue;if(t==="graceStart"){let n=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(n)&&(M.graceStart=n);continue}let a=Number(e.value);Number.isFinite(a)&&(M[t]=a)}te=Me(M.graceStart),T(".cons-val").forEach(e=>{e.textContent=String(M.conservative)}),T(".min-matches-val").forEach(e=>{e.textContent=String(M.minMatches)}),T(".min-opp-val").forEach(e=>{e.textContent=String(M.minOpp)})}function vt(){ct(),Ye();let e={},t=s=>{if(!e[s]){let[o,c]=lt(s);e[s]={name:s,r:o,rd:c,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[s]},a=(s,o,c,r,y,d)=>{let g=t(s);g.games++,g.opps.add(o),c>r?g.w++:c<r?g.l++:g.d++,g.lastIdx=d,y&&(g.lastDate=y)},n={};for(let s of _()){if(s.date)continue;let o=s.a,c=s.b,r=s.sa>s.sb?1:s.sa<s.sb?0:.5;(n[o]=n[o]||[]).push([c,r]),(n[c]=n[c]||[]).push([o,1-r]),a(o,c,s.sa,s.sb,"",te),a(c,o,s.sb,s.sa,"",te)}let i={};for(let s in n)i[s]=[t(s).r,t(s).rd];for(let s in n){let[o,c]=Ce(i[s][0],i[s][1],n[s].map(([r,y])=>[i[r][0],i[r][1],y]));t(s).r=o,t(s).rd=c}let f=new Map;for(let s of _().filter(o=>o.date).slice().reverse()){let o=s.date,c=Me(o);f.has(c)||f.set(c,[]),f.get(c).push({a:D(s.a),b:D(s.b),sa:+s.sa,sb:+s.sb,date:o})}for(let s of[...f.keys()].sort((o,c)=>o-c)){for(let r in e){let y=e[r],d=s-(y.lastIdx==null?te:y.lastIdx);d>0&&(y.rd=Math.min(Math.sqrt(y.rd*y.rd+M.growth*M.growth*d),M.maxRd))}let o={};for(let r of f.get(s)){let y=r.sa>r.sb?1:r.sa<r.sb?0:.5;(o[r.a]=o[r.a]||[]).push([r.b,y]),(o[r.b]=o[r.b]||[]).push([r.a,1-y]),a(r.a,r.b,r.sa,r.sb,r.date,s),a(r.b,r.a,r.sb,r.sa,r.date,s)}let c={};for(let r in o)c[r]=[t(r).r,t(r).rd];for(let r in o){let[y,d]=Ce(c[r][0],c[r][1],o[r].map(([g,k])=>[c[g][0],c[g][1],k]));t(r).r=y,t(r).rd=d}}let h=Object.values(e).map(s=>({name:s.name,glicko:s.r,rd:s.rd,rating:s.r-M.conservative*s.rd,matches:s.games,w:s.w,l:s.l,d:s.d,winPct:s.games?rt(s.w/s.games*100,1):0,opponents:s.opps.size,avgOpp:0,lastMatch:s.lastDate||"",provisional:!(s.games>=M.minMatches&&s.opps.size>=M.minOpp),inactive:!1})),p={};h.forEach(s=>{p[s.name]=s.glicko}),h.forEach(s=>{let o=0;e[s.name].opps.forEach(c=>{o+=p[c]!=null?p[c]:M.unratedR}),s.avgOpp=e[s.name].opps.size?o/e[s.name].opps.size:0});let v=Date.now(),m=Math.floor(v/(M.periodDays*ce));for(let s in e){let o=e[s],c=m-(o.lastIdx==null?te:o.lastIdx);c>0&&(o.rd=Math.min(Math.sqrt(o.rd*o.rd+M.growth*M.growth*c),M.maxRd))}h.forEach(s=>{s.glicko=e[s.name].r,s.rd=e[s.name].rd,s.rating=s.glicko-M.conservative*s.rd;let o=V[s.name];s.delta=o!=null?s.rating-o:0});let L=Date.parse(M.graceStart+"T00:00:00Z")+M.graceDays*ce,w=new Set([...be,...P().inactive||[]]);h.forEach(s=>{s.inactive=w.has(s.name)||(s.lastMatch?v-Date.parse(s.lastMatch+"T00:00:00Z")>M.inactiveDays*ce:v>L)});let x=h.filter(s=>!s.provisional&&!s.inactive).sort((s,o)=>o.rating-s.rating);x.forEach((s,o)=>{s.rank=o+1}),h.sort((s,o)=>o.rating-s.rating);let E={};return h.forEach(s=>{E[s.name]=s}),{players:h,byName:E,qualified:x}}function q(){G=vt(),I=G.byName,A=G.qualified}var pt=["page-home","page-player","page-compare","page-matches","page-roster","page-analytics","page-method","page-faq","page-admin"];function Re(){if(ke){ke=!1;return}let e=location.hash||"#/";pt.forEach(i=>l("#"+i).classList.remove("active"));let t="#/"+(e.split("/")[1]||"");T(".nav a, .foot-nav a").forEach(i=>{let f=i.getAttribute("href");i.classList.toggle("active",f===t||e==="#/"&&f==="#/")});let a=l("#nav-glide"),n=document.querySelector(".nav a.active");if(a&&n&&n.offsetWidth>0?(a.style.width=n.offsetWidth+"px",a.style.transform=`translateX(${n.offsetLeft}px)`,a.style.opacity="1"):a&&(a.style.opacity="0"),e==="#/compare"||e.startsWith("#/compare/")){let i=e.split("/").slice(2).map(qe);Fe(i[0]||"",i[1]||""),l("#page-compare").classList.add("active"),window.scrollTo(0,0)}else e.startsWith("#/player/")?(bt(qe(e.slice(9))),l("#page-player").classList.add("active"),window.scrollTo({top:0,behavior:"instant"in window?"instant":"auto"})):e==="#/matches"?(yt(),l("#page-matches").classList.add("active"),window.scrollTo(0,0)):e==="#/roster"?(wt(),l("#page-roster").classList.add("active"),window.scrollTo(0,0)):e==="#/analytics"?($t(),l("#page-analytics").classList.add("active"),window.scrollTo(0,0)):e==="#/method"?(kt(),l("#page-method").classList.add("active"),window.scrollTo(0,0)):e==="#/faq"?(Lt(),l("#page-faq").classList.add("active"),window.scrollTo(0,0)):e==="#/admin"?(O(),l("#page-admin").classList.add("active"),window.scrollTo(0,0)):(Te(),l("#page-home").classList.add("active"),requestAnimationFrame(gt));ge()}window.addEventListener("hashchange",Re);function Te(){Q="all",j={key:"rank",dir:1},T(".chip[data-filter]").forEach(p=>p.classList.toggle("on",p.dataset.filter==="all")),T(".sortable").forEach(p=>p.classList.remove("sorted","asc"));let e=l('.sortable[data-key="rank"]');e&&e.classList.add("sorted");let t=_().length,a=G.players.length,n=A[0],i=Math.round(A.reduce((p,v)=>p+v.rd,0)/A.length);l("#hero-matches").textContent=t,l("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">Ranked players</div>
      <div class="v"><span class="cu" data-target="${A.length}">0</span><small>/ ${a} total</small></div></div>
    <div class="stat-card"><div class="k">Matches logged</div>
      <div class="v"><span class="cu" data-target="${t}">0</span></div></div>
    <div class="stat-card"><div class="k">Highest rating</div>
      <div class="v"><span class="cu" data-target="${n.rating}" data-dec="1">0</span><small>${b(n.name)}</small></div></div>
    <div class="stat-card"><div class="k">Avg certainty (RD)</div>
      <div class="v"><span class="cu" data-target="${i}" data-dec="1">0</span><small>certainty score</small></div></div>`;let f=[A[1],A[0],A[2]].filter(Boolean);l("#fl-cards").innerHTML=f.map(p=>`
    <div class="fl-card r${p.rank}${p.rank===1?" champ":""} reveal" data-goto="${b(p.name)}">
      <div class="fl-top">
        ${ue(p.rank)}
        <div class="rd">RD ${p.rd.toFixed(0)}</div>
      </div>
      ${p.rank===1?'<div class="champ-tag">#1 Tank</div>':""}
      <div class="nm">${b(p.name)}</div>
      <div class="rating">
        <span class="unit">Rating</span>
        <div class="big-row"><span class="big">${Math.round(p.rating)}</span>${Se(p)}</div>
      </div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${p.winPct>=60?"":p.winPct>=40?"mid":"low"}" data-w="${p.winPct}"></div></div>
      </div>
      <div class="meta">
        <span><span class="w">${p.w}W</span> <span class="l">${p.l}L</span> ${p.d}D</span>
        <span class="wc">${p.winPct}%</span>
        <span class="opp">avg opp ${Math.round(p.avgOpp)}</span>
      </div>
    </div>`).join(""),requestAnimationFrame(()=>{T("#fl-cards .bar-fill").forEach(p=>{p.style.width=p.dataset.w+"%"})}),ne(),_e();let h=l("#last-updated");h&&(h.textContent="Last updated "+(B.generated||"today"))}function _e(){let e=_().filter(t=>t.date).slice(0,10);l("#battles-grid").innerHTML=e.length?e.map(t=>{let a=t.sa>t.sb,n=t.sb>t.sa;return`
    <div class="battle-row reveal" data-goto="${b(a?t.a:t.b)}">
      <div class="who ${a?"win":"lose"}" data-goto="${b(t.a)}">${b(t.a)}</div>
      <div class="vs">vs</div>
      <div class="who r ${n?"win":"lose"}" data-goto="${b(t.b)}">${b(t.b)}</div>
      <div class="sc mono"><span class="${a?"win":"lose"}">${t.sa}</span> \u2013 <span class="${n?"win":"lose"}">${t.sb}</span></div>
      <div class="dt">${t.date||(t.admin&&!t.published?"just now":"historical")}</div>
    </div>`}).join(""):'<div class="empty" style="padding:26px;text-align:center;color:var(--dim);grid-column:1/-1">No dated matches yet \u2014 new verified results will appear here as they are logged.</div>'}var mt=500,ht="cubic-bezier(.22,.8,.24,1)",ut=.5;function ft(e,t,a){matchMedia("(prefers-reduced-motion: reduce)").matches||T(".lb-row",e).forEach(n=>{let i=t.get(n.dataset.name);if(i===void 0||typeof n.animate!="function")return;let f=i-n.getBoundingClientRect().top,h=Math.abs(f)>1;if(!h&&!a)return;let p={opacity:a?ut:1},v={opacity:1};h&&(p.transform=`translateY(${f}px)`,v.transform="none"),n.animate([p,v],{duration:mt,easing:ht})})}function ne(e="all",t="rank",a=1,n=!1){let i=l("#lb-body"),h=(e==="all"&&ve?A:G.players).slice().map(m=>({...m,rank:m.rank!=null?m.rank:9999}));$e&&(h=h.filter(m=>m.name.toLowerCase().includes($e))),e==="provisional"?h=h.filter(m=>(I[m.name]||{}).provisional):e==="inactive"?h=h.filter(m=>(I[m.name]||{}).inactive):e==="veterans"?h=h.filter(m=>m.matches>=15):e==="rising"&&(h=h.filter(m=>m.winPct>=60&&m.matches>=5)),h.sort((m,L)=>{let w=m[t],x=L[t];return(typeof w=="string"?w.localeCompare(x):w-x)*a});let p=new Map;T(".lb-row",i).forEach(m=>p.set(m.dataset.name,m.getBoundingClientRect().top));let v=Xe();i.innerHTML=h.map(m=>`
    <div class="lb-row ${m.rank<=3?"top"+m.rank:""}" data-name="${b(m.name)}" data-goto="${b(m.name)}">
      <div class="rank">${m.rank<=A.length?ue(m.rank,"sm")+et(m,v):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="pname">${b(m.name)}</div></div>
      <div class="rating-cell mono">${Se(m)}${me(m,!0)}</div>
      <div class="num-cell mono col-hide">${m.rd.toFixed(1)}</div>
      <div class="num-cell mono col-hide">${m.matches}</div>
      <div class="num-cell mono col-hide"><span class="w">${m.w}</span></div>
      <div class="num-cell mono col-hide"><span class="l">${m.l}</span></div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${m.winPct>=60?"":m.winPct>=40?"mid":"low"}" data-w="${m.winPct}"></div></div>
        <div class="pct mono">${m.winPct}%</div>
      </div>
      <div class="num-cell mono col-hide">${m.opponents}</div>
      <div class="num-cell mono col-hide">${m.avgOpp.toFixed(0)}</div>
      <div class="col-status">${Ze(m.name)||Ke(m.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?"Nobody is inactive right now \u2014 a player goes inactive 365 days after their last match (or when flagged in the master sheet).":e==="provisional"?"No provisional players right now.":"No players match this filter."}</div>`,ft(i,p,n),requestAnimationFrame(()=>{T(".bar-fill",i).forEach(m=>{m.style.width=m.dataset.w+"%"})})}var Q="all",j={key:"rank",dir:1},$e="",ve=!0;function gt(){T("#stat-strip .cu").forEach(e=>xe(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),T(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}l("#lb-qual").addEventListener("click",()=>{ve=!ve,l("#lb-qual").classList.toggle("on",ve),ne(Q,j.key,j.dir)});l("#lb-filter").addEventListener("input",e=>{$e=e.target.value.trim().toLowerCase(),ne(Q,j.key,j.dir)});var se=l("#theme-toggle");function Be(){if(!se)return;let e=document.documentElement.dataset.theme==="light",t=e?"Switch to dark mode":"Switch to light mode";se.setAttribute("aria-pressed",String(e)),se.setAttribute("aria-label",t),se.title=t}se.addEventListener("click",()=>{let t=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=t;try{localStorage.setItem("tt1v1_theme",t)}catch{}Be()});Be();document.addEventListener("click",e=>{let t=e.target.closest(".chip");if(t&&t.dataset.filter){T(".chip[data-filter]").forEach(i=>i.classList.remove("on")),t.classList.add("on"),Q=t.dataset.filter,ne(Q,j.key,j.dir);return}let a=e.target.closest(".sortable");if(a){let i=a.dataset.key;j.dir=j.key===i?-j.dir:1,j.key=i,T(".sortable").forEach(f=>f.classList.remove("sorted","asc")),a.classList.add("sorted"),j.dir===1&&a.classList.add("asc"),ne(Q,j.key,j.dir,!0);return}let n=e.target.closest("[data-goto]");n&&(e.stopPropagation(),location.hash="#/player/"+F(n.dataset.goto))});function Fe(e,t){let a=l("#cmp-wrap"),i=G.players.slice().sort((u,S)=>(u.rank!=null?u.rank:9999)-(S.rank!=null?S.rank:9999)||u.name.localeCompare(S.name)).map(u=>u.name);if(i.length<2){a.innerHTML='<div class="empty">Not enough players to compare yet.</div>';return}let f=I[e]?e:i[0],h=I[t]?t:i[1];h===f&&(h=i.find(u=>u!==f));let p=I[f],v=I[h],m=A.find(u=>u.name===f),L=A.find(u=>u.name===h),w=we(p.glicko,v.glicko,v.rd),x=we(v.glicko,p.glicko,p.rd),E=Math.round(w/(w+x)*1e3)/10,s=Math.round(1e3-E*10)/10,o=_().filter(u=>u.a===f&&u.b===h||u.a===h&&u.b===f).map(u=>{let S=u.a===f,R=S?u.sa:u.sb,W=S?u.sb:u.sa;return{fa:R,fb:W,res:R>W?"W":R<W?"L":"D",date:u.date}}),c=o.reduce((u,S)=>(S.res==="W"?u.w++:S.res==="L"?u.l++:u.d++,u),{w:0,l:0,d:0}),r=u=>`<option value="${b(u)}"${u===f?" selected":""}>${b(u)}</option>`,y=u=>`<option value="${b(u)}"${u===h?" selected":""}>${b(u)}</option>`,d=(u,S,R,W,Je)=>`
    <div class="cmp-trow">
      <div class="va mono${W?" win":""}">${S}</div>
      <div class="k">${u}</div>
      <div class="vb mono${Je?" win":""}">${R}</div>
    </div>`,g='<span style="color:var(--dimmer)">\u2014</span>';a.innerHTML=`
    <div class="kicker anim">versus</div>
    <h2 class="section-head anim" style="margin:6px 0 2px">Compare players</h2>
    <div class="cmp-pickers anim">
      <select id="cmp-a" aria-label="First player">${i.map(r).join("")}</select>
      <button class="btn btn-ghost" id="cmp-swap" style="width:auto;margin:0" title="Swap sides">\u21C4</button>
      <select id="cmp-b" aria-label="Second player">${i.map(y).join("")}</select>
    </div>
    <div class="cmp-share anim">
      <button class="btn btn-ghost" id="cmp-copy" style="width:auto;margin:0">Copy shareable link</button>
      <span class="caption" id="cmp-copy-msg"></span>
    </div>

    <div class="cmp-hero anim">
      <div class="cmp-side a">
        <div class="cmp-sub">${m?`Rank #${m.rank}`:"Unranked"}</div>
        <div class="cmp-name"><a href="#/player/${F(f)}">${b(f)}</a></div>
        <div class="cmp-rating mono">${p.provisional?ie(p):p.rating.toFixed(1)}</div>
        <div class="cmp-sub">RD ${p.rd.toFixed(1)} \xB7 ${p.matches} matches</div>
      </div>
      <div class="cmp-vs">
        <div class="vs-mark">VS</div>
        <div class="mono" style="font-size:11px;color:var(--dimmer)">${o.length} H2H</div>
      </div>
      <div class="cmp-side b">
        <div class="cmp-sub">${L?`Rank #${L.rank}`:"Unranked"}</div>
        <div class="cmp-name"><a href="#/player/${F(h)}">${b(h)}</a></div>
        <div class="cmp-rating mono">${v.provisional?ie(v):v.rating.toFixed(1)}</div>
        <div class="cmp-sub">RD ${v.rd.toFixed(1)} \xB7 ${v.matches} matches</div>
      </div>
    </div>

    <div class="panel anim">
      <h3>Estimated win probability <span class="n">\u2014 based on current Glicko ratings</span></h3>
      <div class="cmp-prob-labels">
        <span style="color:var(--gold)">${b(f)} ${E.toFixed(1)}%</span>
        <span style="color:var(--blue)">${s.toFixed(1)}% ${b(h)}</span>
      </div>
      <div class="cmp-probbar"><i class="pa" style="width:${E}%"></i><i class="pb" style="width:${s}%"></i></div>
      <div class="cmp-prob-note">Estimate only \u2014 computed with the leaderboard's own Glicko formula from each player's current rating and RD. It is not a guarantee: form, maps and matchups still decide the game.</div>
    </div>

    <div class="panel anim">
      <h3>Tale of the tape</h3>
      <div class="cmp-table">
        ${d("Rating",me(p),me(v),!p.provisional&&p.rating>v.rating,!v.provisional&&v.rating>p.rating)}
        ${d("Rank",m?"#"+m.rank:g,L?"#"+L.rank:g,m&&L&&m.rank<L.rank,m&&L&&L.rank<m.rank)}
        ${d("RD (uncertainty)",p.rd.toFixed(1),v.rd.toFixed(1),p.rd<v.rd,v.rd<p.rd)}
        ${d("Glicko",p.glicko.toFixed(1),v.glicko.toFixed(1),p.glicko>v.glicko,v.glicko>p.glicko)}
        ${d("Record",`<span style="color:var(--green)">${p.w}W</span> <span style="color:var(--red)">${p.l}L</span> ${p.d}D`,`<span style="color:var(--green)">${v.w}W</span> <span style="color:var(--red)">${v.l}L</span> ${v.d}D`,p.winPct>v.winPct,v.winPct>p.winPct)}
        ${d("Win rate",p.winPct+"%",v.winPct+"%",p.winPct>v.winPct,v.winPct>p.winPct)}
        ${d("Matches played",p.matches,v.matches,!1,!1)}
        ${d("Unique opponents",p.opponents,v.opponents,p.opponents>v.opponents,v.opponents>p.opponents)}
        ${d("Avg opponent rating",p.avgOpp.toFixed(1),v.avgOpp.toFixed(1),p.avgOpp>v.avgOpp,v.avgOpp>p.avgOpp)}
        ${d("Head to head",`${c.w}W \u2013 ${c.l}L \u2013 ${c.d}D`,`${c.l}W \u2013 ${c.w}L \u2013 ${c.d}D`,c.w>c.l,c.l>c.w)}
      </div>
    </div>

    <div class="panel anim">
      <h3>Previous meetings <span class="n">\u2014 ${o.length} ${o.length===1?"game":"games"}</span></h3>
      <div class="match-list">
        ${o.map(u=>`
          <div class="match-row">
            <div class="res-chip ${u.res}">${u.res}</div>
            <div class="who">${b(f)}</div>
            <div class="score mono">${u.fa} \u2013 ${u.fb}</div>
            <div class="who opp"><a href="#/player/${F(h)}" style="color:var(--blue)">${b(h)}</a></div>
            <div class="date mono">${u.date||"historical"}</div>
          </div>`).join("")||'<div class="empty">These two have never met.</div>'}
      </div>
      <div class="caption" style="margin-top:12px">Legacy archive games count toward head-to-head (the results are known) \u2014 their dates are not.</div>
    </div>`;let k=()=>{let u=l("#cmp-a").value,S=l("#cmp-b").value,R="#/compare/"+F(u)+"/"+F(S);location.hash!==R&&(ke=!0,location.hash=R),Fe(u,S)};l("#cmp-a").addEventListener("change",k),l("#cmp-b").addEventListener("change",k),l("#cmp-swap").addEventListener("click",()=>{let u=l("#cmp-a").value;l("#cmp-a").value=l("#cmp-b").value,l("#cmp-b").value=u,k()}),l("#cmp-copy").addEventListener("click",()=>{let u=location.href.split("#")[0]+"#/compare/"+F(f)+"/"+F(h),S=()=>{l("#cmp-copy-msg").textContent="Link copied \u2713"};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(u).then(S,()=>{l("#cmp-copy-msg").textContent=u}):l("#cmp-copy-msg").textContent=u})}var ke=!1;function bt(e){let t=I[e],a=l("#page-player");if(!t){a.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">
      No player called "<b>${b(e)}</b>" found. <a href="#/" style="color:var(--gold)">Back to the leaderboard</a>.
    </div></div></div>`;return}let n=A.find(v=>v.name===e),i=Le(e),f=i.slice(0,10),h=Qe(e),p=Math.max(3,Math.min(100,100-t.rd/120*100));a.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">\u2190 All rankings</a>
    <div class="player-hero anim">
      <div class="player-top">
        ${n?ue(n.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${b(t.name)}</div>
          <div class="player-rankline">
            ${n?`Ranked <b>#${n.rank}</b> of ${A.length} qualified players`:"Unranked \u2014 not enough recent games for the board"}
            ${t.provisional?' \xB7 <span class="tag prov">provisional</span>':""}
            ${t.inactive?' \xB7 <span class="tag inact">inactive</span>':""}
          </div>
        </div>
        <div class="player-rating-block">
          <div class="lbl">${t.provisional?"Estimated range":"Visible rating"}</div>
          <div class="big mono${t.provisional?" prov-range":""}" id="pv-rating">${t.provisional?ie(t):"0"}</div>
          ${Se(t)}
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
      <h3>Recent form <span class="n">\u2014 last ${Math.min(10,i.length)}</span></h3>
      <div class="form-strip">
        ${f.map((v,m)=>`<div class="form-pill ${v.res}" style="animation-delay:${m*55}ms"
           title="vs ${b(v.opp)} ${v.for_}-${v.against}">${v.res}</div>`).join("")||'<span class="empty">No games yet</span>'}
      </div>
    </div>

    <div class="panel reveal">
      <h3>Match history <span class="n">\u2014 ${i.length} games</span></h3>
      <div class="match-list">
        ${i.map(v=>`
          <div class="match-row">
            <div class="res-chip ${v.res}">${v.res}</div>
            <div class="who">${b(t.name)}</div>
            <div class="score mono">${v.for_} \u2013 ${v.against}</div>
            <div class="who opp"><a href="#/player/${F(v.opp)}" style="color:var(--blue)">${b(v.opp)}</a></div>
            <div class="date mono">${v.date||"historical"}</div>
          </div>`).join("")||'<div class="empty">No games recorded</div>'}
      </div>
    </div>

    <div class="panel reveal">
      <h3>Head to head <span class="n">\u2014 ${h.length} opponents</span></h3>
      <div class="h2h-grid">
        ${h.map(v=>`
          <div class="h2h-card" data-goto="${b(v.opp)}">
            <div class="opp">${b(v.opp)}</div>
            <div class="rec mono"><span class="w">${v.w}W</span> \xB7 <span class="l">${v.l}L</span> \xB7 <span>${v.d}D</span> \xB7 ${v.pf}-${v.pa} pts</div>
          </div>`).join("")||'<div class="empty">No games recorded</div>'}
      </div>
    </div>
  </div>`,t.provisional||xe(l("#pv-rating"),t.rating,{dec:1,dur:900}),ge()}function yt(){_e();let e=l("#gm-body"),t=_();l("#gm-count").textContent=`\u2014 ${t.length} games`,e.innerHTML=t.map(a=>{let n=a.sa>a.sb,i=a.sb>a.sa;return`
    <div class="gm-row">
      <div class="side ${n?"winner":"loser"}">
        <div class="dot ${n?"w":"l"}"></div>
        <div class="nm" data-goto="${b(a.a)}">${b(a.a)}</div>
      </div>
      <div class="sc mono" style="color:${n?"var(--green)":"var(--red)"}">${a.sa}</div>
      <div class="dash mono">\u2013</div>
      <div class="sc mono" style="color:${i?"var(--green)":"var(--red)"}">${a.sb}</div>
      <div class="side right ${i?"winner":"loser"}">
        <div class="dot ${i?"w":"l"}"></div>
        <div class="nm" data-goto="${b(a.b)}">${b(a.b)}</div>
      </div>
      <div class="dt mono">${a.admin&&!a.published?'<span class="tag fresh">new</span>':a.date||"historical"}</div>
    </div>`}).join("")}function wt(){let e=G.players.filter(t=>t.provisional).sort((t,a)=>a.rating-t.rating);l("#roster-grid").innerHTML=e.map(t=>{let a=Math.min(100,Math.round(Math.min(1,t.matches/5)*50+Math.min(1,t.opponents/3)*50));return`
    <div class="roster-card reveal" data-goto="${b(t.name)}">
      <div class="top">
        <div class="nm">${b(t.name)}</div>
        <svg class="shield" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"/></svg>
      </div>
      <div class="rating"><span class="unit">Est. range</span><span class="big prov-range">${ie(t)}</span></div>
      <div class="req-row"><span>Matches</span><span class="${t.matches>=5?"ok":""}">${t.matches} / 5 ${t.matches>=5?"\u2713":""}</span></div>
      <div class="req-row"><span>Opponents</span><span class="${t.opponents>=3?"ok":""}">${t.opponents} / 3 ${t.opponents>=3?"\u2713":""}</span></div>
      <div class="prog-track"><div class="prog-fill" data-w="${a}"></div></div>
      <div class="prog-label">${a}% to qualified</div>
    </div>`}).join(""),requestAnimationFrame(()=>T("#roster-grid .prog-fill").forEach(t=>{t.style.width=t.dataset.w+"%"}))}function $t(){let e=G.players,t=A.slice().sort((d,g)=>g.winPct-d.winPct).slice(0,10),a=e.slice().sort((d,g)=>g.matches-d.matches).slice(0,10),n=[];_().forEach(d=>{let g=I[d.a],k=I[d.b];if(!g||!k)return;let u=g.rating-k.rating;if(d.sa===d.sb)return;let S=d.sa>d.sb?d.a:d.b,R=Math.abs(u);(u<0&&S===d.a||u>0&&S===d.b)&&n.push({winner:S,loser:S===d.a?d.b:d.a,gap:R,score:S===d.a?`${d.sa}-${d.sb}`:`${d.sb}-${d.sa}`})}),n.sort((d,g)=>g.gap-d.gap);let i={};_().forEach(d=>{let g=[d.a,d.b].sort().join(" vs ");i[g]=(i[g]||0)+1});let f=Object.entries(i).sort((d,g)=>g[1]-d[1]).slice(0,10),h=e.map(d=>d.rating),p=Math.min(...h),v=Math.max(...h),m=8,L=(v-p)/m||1,w=Array.from({length:m},()=>0);h.forEach(d=>{w[Math.min(m-1,Math.max(0,Math.floor((d-p)/L)))]++});let x=Math.max(...w,1),E=w.map((d,g)=>{let k=Math.round((p+g*L)/10)*10,u=Math.round((p+(g+1)*L)/10)*10;return`
    <div class="hcol" title="${d} player${d===1?"":"s"} rated ${k}\u2013${u}">
      <div class="hbar" data-h="${Math.round(d/x*100)}"></div>
      <div class="hlbl">${k}\u2013${u}</div>
    </div>`}).join(""),s=e.slice().sort((d,g)=>g.opponents-d.opponents).slice(0,8),o=Math.max(...s.map(d=>d.opponents),1),c=s.map(d=>`
    <div class="mrow reveal" data-goto="${b(d.name)}">
      <div class="nm">${b(d.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(d.opponents/o*100)}"></div></div>
      <div class="val mono">${d.opponents}</div>
    </div>`).join(""),r=(d,g,k)=>d.map((u,S)=>`
    <div class="an-row reveal" data-goto="${b(u.name)}">
      <div class="idx mono">${S+1}</div>
      <div class="nm">${b(u.name)}</div>
      <div class="val mono">${g(u)}</div>
      <div class="unit mono">${k(u)}</div>
    </div>`).join("");l("#an-grid").innerHTML=`
    <div class="an-panel">
      <div class="head"><h3>Top win rate</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${r(t,d=>d.winPct+"%",d=>d.matches+" matches")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Most active</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/></svg>
      </div>
      ${r(a,d=>d.matches,d=>"matches")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Biggest upsets</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${n.length?n.slice(0,8).map((d,g)=>`
        <div class="an-row reveal" data-goto="${b(d.winner)}">
          <div class="idx mono">${g+1}</div>
          <div class="nm">${b(d.winner)} <span style="color:var(--dimmer);font-weight:500">def.</span> ${b(d.loser)}</div>
          <div class="val mono">${d.score}</div>
          <div class="unit mono">+${Math.round(d.gap)} pts</div>
        </div>`).join(""):'<div class="empty">No upsets on record</div>'}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Most contested rivalries</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${f.map(([d,g],k)=>`
        <div class="an-row reveal">
          <div class="idx mono">${k+1}</div>
          <div class="nm">${d.split(" vs ").map(b).join(' <span style="color:var(--dimmer);font-weight:500">vs</span> ')}</div>
          <div class="val mono">${g}</div>
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
      ${c}
    </div>`;let y=()=>{T("#an-grid .hbar").forEach(d=>{d.style.height=d.dataset.h+"%"}),T("#an-grid .abar").forEach(d=>{d.style.width=d.dataset.w+"%"})};requestAnimationFrame(y),setTimeout(y,140),ge()}function kt(){l("#settings-body").innerHTML=Ee().map(e=>`
    <tr><td><b>${b(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${b(e.desc)}</div></td>
        <td class="val">${b(String(e.value))}</td></tr>`).join("")}var xt=[{q:"How are the ratings calculated?",a:"Dynamic Glicko \u2014 the same model behind competitive chess and table-tennis rankings. Every recorded duel moves the numbers: beating a stronger opponent gains more, losing to a weaker one costs more. The full maths lives on the Method page."},{q:"Why did my rating drop even though I didn't play?",a:"That's the inactivity automation. Each 30-day rating period without a match grows your RD (uncertainty), and the visible rating subtracts half of it \u2014 so an idle rating slowly sinks on its own, exactly like the master sheet. Play one match and the drift stops."},{q:"What is RD, and why does it matter?",a:"RD (ratings deviation) is how certain the system is about your rating. New or idle players have a high RD; regular players have a low one. The board ranks the visible rating = Glicko \u2212 0.5 \xD7 RD, so uncertain ratings are held back until they've earned trust."},{q:"How do I get ranked on the leaderboard?",a:"Log at least 5 matches against at least 3 different opponents. Until then you're provisional \u2014 your rating is real and takes part in every calculation, but you aren't ranked yet."},{q:"What do the green and red arrows next to ratings mean?",a:"They show how your visible rating moved since the previous spreadsheet update: green \u25B2 means you climbed, red \u25BC means you dropped."},{q:"What does the \u201Cinactive\u201D tag mean?",a:"A qualified player is marked inactive \u2014 and hidden from the board \u2014 after 365 days without a dated match (legacy players without recorded dates get a 365-day grace window first). Your rating isn't deleted: come back, play a match, and you're active again."},{q:"Do my old 0\u2013100 ladder ratings still count?",a:"Yes. Historical scores are converted into Glicko starting points (old 80 \u2248 1500), so the ladder carries over. This site reproduces the master sheet's seeding exactly, including its low-end floor."},{q:"Two names on the board look like the same person \u2014 is that a bug?",a:"Possibly an alias. When we confirm two names are the same player, a name fix merges them everywhere \u2014 records, ratings and head-to-heads \u2014 without rewriting old matches. Report suspicious duplicates through the feedback button."},{q:"How do I get my duels recorded?",a:"Matches are logged by the team after official 1v1 duels. If a match is missing or has the wrong score, send feedback with the details and we'll fix it \u2014 corrections recalculate every rating instantly."},{q:"The numbers here differ from the Google Sheet \u2014 what do I do?",a:"They shouldn't: every figure on this site is recomputed from the raw results and validated against the official sheet down to the decimal. If you spot a gap, screenshot it and send feedback \u2014 that's a bug report we want."},{q:"Who runs this site?",a:"Alternator & interstellar. The leaderboard is data-driven \u2014 no manual rankings, no politics. Just duels."}];function pe(){let e=P().faq;return Array.isArray(e)&&e.length?e:xt}function Lt(){l("#faq-list").innerHTML=pe().map((e,t)=>`
    <div class="faq-item reveal" data-faq="${t}">
      <button class="faq-q" aria-expanded="false">
        <span>${b(String(e.q||""))}</span>
        <svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="faq-a"><div class="faq-a-in">${b(String(e.a||""))}</div></div>
    </div>`).join(""),ge()}document.addEventListener("click",e=>{let t=e.target.closest(".faq-q");if(!t)return;let a=t.closest(".faq-item"),n=a.classList.contains("open");T(".faq-item.open").forEach(i=>{i.classList.remove("open"),i.querySelector(".faq-q").setAttribute("aria-expanded","false")}),n||(a.classList.add("open"),t.setAttribute("aria-expanded","true"))});function O(){let e=l("#admin-wrap");if(!tt()){e.innerHTML=`
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
    </div>`;let s=async()=>{let o=l("#admin-pw").value;try{let c=await fetch(it,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:o})});if(c.ok){let r=await c.json().catch(()=>({}));st(r.token||o,l("#admin-remember").checked),O(),$("Welcome back, commander.");return}if(c.status===429){$("Too many attempts \u2014 wait a few minutes.");return}}catch{}l("#admin-pw").style.borderColor="var(--red)",$("Wrong password.")};l("#admin-auth").addEventListener("click",s),l("#admin-pw").addEventListener("keydown",o=>{o.key==="Enter"&&s()});return}let a=U(),n=Ie().length,i=P(),f='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',h=Object.entries(i.aliases).map(([s,o])=>`
    <div class="log-item">
      <div class="txt"><b>${b(s)}</b> \u2192 <b>${b(o)}</b>${i.aliasNotes&&i.aliasNotes[s]?` <span style="color:var(--dimmer)">\u2014 ${b(i.aliasNotes[s])}</span>`:""}</div>
      <button class="icon-btn" data-alias-del="${b(s)}" title="Remove name fix">${f}</button>
    </div>`).join("")||'<div class="empty">No name fixes yet.</div>',p=i.inactive.map(s=>`
    <div class="log-item">
      <div class="txt"><b>${b(s)}</b> <span style="color:var(--dimmer)">\u2014 inactive</span></div>
      <button class="icon-btn" data-inact-del="${b(s)}" title="Mark active again">${f}</button>
    </div>`).join("")||'<div class="empty">Nobody marked inactive.</div>',v=Object.keys({...i.seeds||{},...i.seedGlicko||{},...i.seedRd||{}}).map(s=>`
    <div class="log-item">
      <div class="txt"><b>${b(s)}</b> \xB7 <span style="color:var(--dimmer)">old</span> <b class="mono">${b(String((i.seeds||{})[s]!=null?(i.seeds||{})[s]:"\u2014"))}</b>${(i.seedGlicko||{})[s]!=null?` \xB7 <span style="color:var(--dimmer)">glicko</span> <b class="mono">${b(String(i.seedGlicko[s]))}</b>`:""}${(i.seedRd||{})[s]!=null?` \xB7 <span style="color:var(--dimmer)">rd</span> <b class="mono">${b(String(i.seedRd[s]))}</b>`:""}</div>
      <button class="icon-btn" data-seed-del="${b(s)}" title="Remove seed">${f}</button>
    </div>`).join("")||'<div class="empty">No seed overrides \u2014 players start from the sheet values.</div>',m=Ee().map(s=>`
    <div class="set-row">
      <div class="lbl"><b>${b(s.name)}</b><div class="d">${b(String(s.desc||""))}</div></div>
      <input class="set-val mono" data-set-name="${b(s.name)}" value="${b(String(s.value))}">
    </div>`).join(""),L=s=>{let o=(s||"").trim().toLowerCase();return _().filter(r=>!o||r.a.toLowerCase().includes(o)||r.b.toLowerCase().includes(o)).slice(0,20).map(r=>`
      <div class="log-item fix-row" data-mkey="${r.key}">
        <div class="txt"><b>${b(r.a)}</b> <span style="color:var(--dimmer)">vs</span> <b>${b(r.b)}</b>${r.date?"":' <span class="tag legacy">legacy</span>'}</div>
        <input class="mono" data-f="sa" type="number" min="0" value="${r.sa}" title="Score 1">
        <input class="mono" data-f="sb" type="number" min="0" value="${r.sb}" title="Score 2">
        <input data-f="date" type="date" value="${r.date||""}" title="Match date">
        <button class="icon-btn" data-msave="${r.key}" title="Save fix"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-mdel="${r.key}" title="Delete match">${f}</button>
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
        ${a.length?a.map((s,o)=>`
          <div class="log-item">
            <div class="txt"><b>${b(s.a)}</b> ${s.sa}\u2013${s.sb} <b>${b(s.b)}</b></div>
            <div class="txt" style="color:var(--dimmer)">${b(s.date||"")}</div>
            <button class="icon-btn" data-del="${o}" title="Remove">
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
      <div class="log-list" id="ov-seed-list" style="margin-top:12px">${v}</div>
    </div>

    <div class="panel" style="margin:0">
      <h3>Model <span class="n">settings</span></h3>
      <div id="ov-settings">${m}</div>
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

  <datalist id="player-list">${G.players.map(s=>`<option value="${b(s.name)}">`).join("")}</datalist>`,l("#admin-lock").addEventListener("click",()=>{at(),O()}),l("#admin-publish").addEventListener("click",()=>w()),l("#admin-sync").addEventListener("click",async()=>{let s=l("#admin-sync"),o=l("#admin-sync-status");s.disabled=!0,o.textContent="syncing\u2026";try{let c=await fetch(nt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:ee()})}),r=await c.json().catch(()=>({}));c.ok&&r.ok?(o.textContent=r.changed?`synced \u2713 ${r.matches} matches / ${r.players} players`:"already up to date \u2713",$(r.changed?"Sheet synced \u2014 the live site was updated.":"Site already matches the sheet.")):c.status===429?(o.textContent="rate limited",$("Too many attempts \u2014 wait a few minutes.")):(o.textContent="sync failed",$("Sync failed: "+(r.error||c.status)))}catch{o.textContent="network error",$("Sync failed (network).")}s.disabled=!1});async function w(s){let o=!!(s&&s.silent),c=ee()||(o?"":(window.prompt("Admin password:")||"").trim());if(!c){$(o?'Saved here \u2014 auto-publish needs a stored password. Use "Publish to everyone".':"Publish cancelled.");return}ye=!0;let r=P(),y={},d=[];for(let[u,S]of Object.entries(r.matchEdits||{}))u.startsWith("a:")&&(y[u]=S);for(let u of r.matchRemoved||[])u.startsWith("a:")&&d.push(u);let g=_().filter(u=>u.admin).map(u=>({a:u.a,b:u.b,sa:u.sa,sb:u.sb,date:u.date||""})),k={matches:g,aliases:r.aliases||{},aliasNotes:r.aliasNotes||{},aliasRemoved:r.aliasRemoved||[],inactive:r.inactive||[],seeds:r.seeds||{},seedGlicko:r.seedGlicko||{},seedRd:r.seedRd||{},seedRemoved:r.seedRemoved||[],settings:r.settings||{},matchEdits:y,matchRemoved:d,faq:r.faq!=null?r.faq:[]};try{let u=await fetch(he,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:c,doc:k,message:`Publish match log (${g.length} matches)`})}),S=await u.json().catch(()=>({}));if(!u.ok||!S.ok){u.status===403&&sessionStorage.removeItem(z),$("Publish failed: "+(S.error||"HTTP "+u.status));return}window.LB_PUB=k,window.LB_LOG=g,Z([]),N({}),q(),o||O(),$(o?"Saved \u2014 live for everyone \u2713":"Published! Everyone sees it on their next visit.")}catch{$("Publish failed: network error.")}finally{ye=!1}}l("#admin-export").addEventListener("click",()=>{let s=new Blob([JSON.stringify(U(),null,2)],{type:"application/json"}),o=document.createElement("a");o.href=URL.createObjectURL(s),o.download="match-log.json",o.click(),URL.revokeObjectURL(o.href),$("Log exported.")}),l("#adm-add").addEventListener("click",()=>{let s=l("#adm-a").value.trim(),o=l("#adm-b").value.trim(),c=parseInt(l("#adm-sa").value,10),r=parseInt(l("#adm-sb").value,10);if(!s||!o||s.toLowerCase()===o.toLowerCase()||!Number.isFinite(c)||!Number.isFinite(r)){$("Fill in both players and scores.");return}let y=U();y.unshift({a:s,b:o,sa:c,sb:r,date:l("#adm-date")?l("#adm-date").value||new Date().toISOString().slice(0,10):new Date().toISOString().slice(0,10)}),Z(y),q(),O(),$(`${s} ${c}\u2013${r} ${o} added \u2014 site recalculated live.`)}),l("#adm-list").addEventListener("click",s=>{let o=s.target.closest("[data-del]");if(!o)return;let c=U();c.splice(parseInt(o.dataset.del,10),1),Z(c),q(),O()}),l("#ov-alias-add").addEventListener("click",()=>{let s=l("#ov-alias-a").value.trim(),o=l("#ov-alias-b").value.trim(),c=(l("#ov-alias-note")||{}).value.trim();if(!s||!o){$("Fill both: the wrong name and the correct player.");return}let r=Object.keys(I).find(d=>d.toLowerCase()===o.toLowerCase())||o,y=C();N({...y,aliases:{...y.aliases||{},[s]:r},aliasNotes:c?{...y.aliasNotes||{},[s]:c}:y.aliasNotes||{},aliasRemoved:(y.aliasRemoved||[]).filter(d=>d!==s)}),q(),O(),$(`Name fix saved \u2014 "${s}" now counts as ${r}.`)}),l("#ov-alias-list").addEventListener("click",s=>{let o=s.target.closest("[data-alias-del]");if(!o)return;let c=o.dataset.aliasDel,r=C(),y={...r.aliases||{}},d={...r.aliasNotes||{}};delete y[c],delete d[c],N({...r,aliases:y,aliasNotes:d,aliasRemoved:[...new Set([...r.aliasRemoved||[],c])]}),q(),O(),$("Name fix removed.")}),l("#ov-inact-toggle").addEventListener("click",()=>{let s=l("#ov-inact-n").value.trim();if(!s){$("Type a player name first.");return}let o=C(),c=P().inactive||[],r=c.includes(s)?c.filter(y=>y!==s):[...c,s];N({...o,inactive:r}),q(),O(),$(r.includes(s)?`${s} marked inactive.`:`${s} marked active again.`)}),l("#ov-inact-list").addEventListener("click",s=>{let o=s.target.closest("[data-inact-del]");if(!o)return;let c=C();N({...c,inactive:(P().inactive||[]).filter(r=>r!==o.dataset.inactDel)}),q(),O()}),l("#ov-seed-add").addEventListener("click",()=>{let s=l("#ov-seed-n").value.trim(),o=l("#ov-seed-v").value.trim(),c=l("#ov-seed-g").value.trim(),r=l("#ov-seed-rd").value.trim();if(!s){$("Pick a player first.");return}if(o===""&&c===""&&r===""){$("Enter an Old 0\u2013100 rating, or a Starting Glicko / RD.");return}let y=C(),d={...y.seeds||{}},g={...y.seedGlicko||{}},k={...y.seedRd||{}};o!==""&&Number.isFinite(Number(o))?d[s]=Number(o):delete d[s],c!==""&&Number.isFinite(Number(c))?g[s]=Number(c):delete g[s],r!==""&&Number.isFinite(Number(r))?k[s]=Number(r):delete k[s],N({...y,seeds:d,seedGlicko:g,seedRd:k,seedRemoved:(y.seedRemoved||[]).filter(u=>u!==s)}),q(),O(),$(`Seed saved for ${s}.`)}),l("#ov-seed-list").addEventListener("click",s=>{let o=s.target.closest("[data-seed-del]");if(!o)return;let c=o.dataset.seedDel,r=C(),y={...r.seeds||{}};delete y[c];let d={...r.seedGlicko||{}};delete d[c];let g={...r.seedRd||{}};delete g[c],N({...r,seeds:y,seedGlicko:d,seedRd:g,seedRemoved:[...new Set([...r.seedRemoved||[],c])]}),q(),O()}),l("#ov-settings").addEventListener("change",s=>{let o=s.target.closest("[data-set-name]");if(!o)return;let c=C();N({...c,settings:{...c.settings||{},[o.dataset.setName]:o.value}}),q(),O(),$("Setting applied \u2014 everything recalculated.")}),l("#ov-set-reset").addEventListener("click",()=>{let s=C();N({...s,settings:{}}),q(),O(),$("Settings back to the master sheet values.")}),l("#ov-mq").addEventListener("input",()=>{l("#ov-mresults").innerHTML=L(l("#ov-mq").value)}),l("#ov-mresults").addEventListener("click",s=>{let o=s.target.closest("[data-msave]"),c=s.target.closest("[data-mdel]");if(o){let r=o.closest("[data-mkey]"),y=r.dataset.mkey,d=k=>r.querySelector(`[data-f="${k}"]`).value,g=C();N({...g,matchEdits:{...g.matchEdits||{},[y]:{sa:+d("sa"),sb:+d("sb"),date:d("date")}}}),q(),l("#ov-mresults").innerHTML=L(l("#ov-mq").value),$("Match fixed \u2014 ratings recalculated.")}else if(c){let r=c.dataset.mdel,y=C();N({...y,matchRemoved:[...new Set([...y.matchRemoved||[],r])]}),q(),l("#ov-mresults").innerHTML=L(l("#ov-mq").value),$("Match deleted \u2014 ratings recalculated.")}}),l("#pl-add").addEventListener("click",()=>{let s=l("#pl-name").value.trim(),o=l("#pl-opp").value.trim(),c=parseInt(l("#pl-sa").value,10),r=parseInt(l("#pl-sb").value,10);if(!s||!o||s.toLowerCase()===o.toLowerCase()||!Number.isFinite(c)||!Number.isFinite(r)){$("A player needs a name, an opponent and both scores \u2014 at least 1 result.");return}if(I[D(s)]){$(`${s} already exists \u2014 log a match for them instead.`);return}let y=U();y.unshift({a:s,b:o,sa:c,sb:r,date:(l("#pl-date")||{}).value||new Date().toISOString().slice(0,10)}),Z(y);let d=(l("#pl-seed")||{}).value.trim();if(d!==""&&Number.isFinite(Number(d))){let g=C();N({...g,seeds:{...g.seeds||{},[D(s)]:Number(d)},seedRemoved:(g.seedRemoved||[]).filter(k=>k!==D(s))})}q(),O(),$(`${s} added with their first result \u2014 ${c}\u2013${r} vs ${o}.`)}),l("#pl-del-btn").addEventListener("click",()=>{let s=l("#pl-del").value.trim(),o=D(s),c=_().filter(R=>R.a===o||R.b===o);if(!c.length){$(`No player called "${s}" with matches found.`);return}if(!window.confirm(`Remove ${o} and ${c.length} match${c.length===1?"":"es"}? This recalculates every rating.`))return;let r=C(),y=[...r.matchRemoved||[]],d=[];c.forEach(R=>{R.key.startsWith("l:")?d.push(parseInt(R.key.slice(2),10)):y.push(R.key)});let g=U();d.sort((R,W)=>W-R).forEach(R=>g.splice(R,1)),Z(g);let k={...r.seeds||{}},u={...r.seedGlicko||{}},S={...r.seedRd||{}};delete k[o],delete u[o],delete S[o],N({...r,matchRemoved:[...new Set(y)],seeds:k,seedGlicko:u,seedRd:S,seedRemoved:[...new Set([...r.seedRemoved||[],o])],inactive:(P().inactive||[]).filter(R=>R!==o)}),q(),O(),$(`${o} removed with ${c.length} match${c.length===1?"":"es"}. Publish to make it public.`)});let x=()=>{let s=pe();l("#faq-admin-list").innerHTML=s.map((o,c)=>`
      <div class="log-item fix-row" data-faq-idx="${c}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${b(String(o.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${b(String(o.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${c}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${c}" title="Delete question">${f}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};x(),l("#faq-admin-list").addEventListener("click",s=>{let o=s.target.closest("[data-faq-save]"),c=s.target.closest("[data-faq-del]"),r=pe().map(d=>({...d}));if(o){let d=o.closest("[data-faq-idx]");r[parseInt(o.dataset.faqSave,10)]={q:d.querySelector('[data-fq="q"]').value.trim(),a:d.querySelector('[data-fq="a"]').value.trim()}}else if(c)r.splice(parseInt(c.dataset.faqDel,10),1);else return;let y=C();N({...y,faq:r}),x(),$("Q&A updated \u2014 publish to make it public.")}),l("#faq-add").addEventListener("click",()=>{let s=l("#faq-new-q").value.trim(),o=l("#faq-new-a").value.trim();if(!s||!o){$("Fill in both the question and the answer.");return}let c=C();N({...c,faq:[...pe().map(r=>({...r})),{q:s,a:o}]}),x(),$("Question added.")}),l("#faq-reset").addEventListener("click",()=>{let s=C();N({...s,faq:null}),x(),$("Q&A back to the built-in list.")}),window._fbTimer&&(clearInterval(window._fbTimer),window._fbTimer=null);async function E(){let s=l("#fb-inbox");if(!s||document.querySelector("#fb-inbox [data-fb-reply]:focus"))return;let o=ee();if(!o){s.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let c=await fetch(J+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:o})}),r=await c.json().catch(()=>({}));if(!c.ok||!r.ok){s.innerHTML=`<div class="empty">Could not load messages (${b(r.error||"HTTP "+c.status)}).</div>`;return}let y=r.items||[],d={};s.querySelectorAll("[data-fb-id]").forEach(g=>{let k=g.querySelector("[data-fb-reply]");k&&k.value&&(d[g.dataset.fbId]=k.value)}),s.innerHTML=y.map(g=>`
        <div class="log-item fb-row${g.resolved?" fb-done":""}" data-fb-id="${b(g.id)}" data-fb-resolved="${g.resolved?"1":""}">
          <div class="txt">
            <b>${b(g.name||"Anonymous")}</b>${g.contact?` <span style="color:var(--dimmer)">\xB7 ${b(g.contact)}</span>`:""}
            <span class="mono" style="color:var(--dimmer);font-size:11px;margin-left:6px">ticket ${b(g.id)}</span>
            ${g.resolved?'<span class="tag resolved" style="margin-left:6px">resolved \u2713</span>':`<span class="tag ${g.status==="replied"?"live":"fresh"}" style="margin-left:6px">${b(g.status)}</span>`}
            <div style="color:var(--dim);font-size:13px;margin-top:4px">${b(g.message)}</div>
            ${g.reply?`<div style="color:var(--gold);font-size:12.5px;margin-top:4px">\u21A9 ${b(g.reply)}</div>`:""}
          </div>
          <input class="set-val fb-reply-in" data-fb-reply placeholder="Write a reply\u2026" value="${b(g.reply||"")}">
          <button class="icon-btn" data-fb-send title="Send reply"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-resolve title="${g.resolved?"Reopen \u2014 mark as not resolved":"Mark as resolved"}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.6L16 9.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-del title="Delete message">${f}</button>
        </div>`).join("")||'<div class="empty">No messages yet.</div>',s.querySelectorAll("[data-fb-id]").forEach(g=>{let k=g.querySelector("[data-fb-reply]");k&&d[g.dataset.fbId]!=null&&(k.value=d[g.dataset.fbId])})}catch{s.innerHTML='<div class="empty">Network error loading messages.</div>'}}E(),l("#fb-refresh").addEventListener("click",()=>{E(),$("Inbox refreshed.")}),window._fbTimer=setInterval(()=>{if(!l("#fb-inbox")){clearInterval(window._fbTimer),window._fbTimer=null;return}document.hidden||E()},2e3),l("#fb-inbox").addEventListener("click",async s=>{let o=s.target.closest("[data-fb-send]"),c=s.target.closest("[data-fb-del]"),r=s.target.closest("[data-fb-resolve]");if(!o&&!c&&!r)return;let y=s.target.closest("[data-fb-id]"),d=y.dataset.fbId,g=ee();try{if(r){let k=y.dataset.fbResolved!=="1";if(!(await fetch(J+"/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:g,id:d,resolved:k})}).then(S=>S.json())).ok){$("Could not update \u2014 try again.");return}$(k?"Marked as resolved \u2713":"Message reopened."),E()}else if(o){let k=y.querySelector("[data-fb-reply]").value;if(!(await fetch(J+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:g,id:d,reply:k})}).then(S=>S.json())).ok){$("Reply failed.");return}$("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(J+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:g,id:d})}).then(u=>u.json())).ok){$("Delete failed.");return}y.remove(),$("Message deleted.")}}catch{$("Network error.")}})}var oe=document.getElementById("fl-cards");oe&&window.matchMedia("(hover: hover)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(oe.addEventListener("pointermove",e=>{let t=e.target.closest&&e.target.closest(".fl-card");if(!t)return;let a=t.getBoundingClientRect(),n=(e.clientX-a.left)/a.width-.5,i=(e.clientY-a.top)/a.height-.5;t.classList.add("tilt"),t.style.transform=`perspective(1000px) rotateY(${(n*7).toFixed(2)}deg) rotateX(${(-i*6).toFixed(2)}deg) translateY(-6px)`}),oe.addEventListener("pointerleave",()=>{oe.querySelectorAll(".fl-card").forEach(e=>{e.style.transform="",e.classList.remove("tilt")})}));l("#search").addEventListener("input",e=>{let t=e.target.value.trim().toLowerCase(),a=l("#search-drop");if(!t){a.classList.remove("show");return}let n=G.players.filter(i=>i.name.toLowerCase().includes(t)).slice(0,8);if(!n.length){a.classList.remove("show");return}a.innerHTML=n.map(i=>`
    <a class="drop-row" href="#/player/${F(i.name)}">
      ${i.rank?ue(i.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${b(i.name)}</span>        <span class="mono" style="margin-left:auto;color:var(--dim)">${me(i,!0)}</span>
    </a>`).join(""),a.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||l("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(l("#search-drop").classList.remove("show"),l("#search").value="")});var J=he.replace(/\/publish$/,"/feedback"),fe="tt1v1_fb_tickets";function St(){try{return JSON.parse(localStorage.getItem(fe)||"[]")}catch{return[]}}function Mt(e){let t=St();t.push({id:e,ts:Date.now()});try{localStorage.setItem(fe,JSON.stringify(t.slice(-20)))}catch{}}function Et(){let e=l("#fb-overlay"),t=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>l("#fb-msg").focus(),180)},a=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};l("#fab-feedback").addEventListener("click",t),l("#fb-close").addEventListener("click",a),l("#fb-done").addEventListener("click",a),e.addEventListener("click",v=>{v.target===e&&a()}),document.addEventListener("keydown",v=>{v.key==="Escape"&&e.classList.contains("show")&&a()});let n=l("#faq-feedback-btn");n&&n.addEventListener("click",t);let i=l("#fb-msg"),f=l("#fb-count-n");i.addEventListener("input",()=>{f.textContent=String(i.value.length);try{localStorage.setItem("tt1v1_fb_draft",i.value)}catch{}});try{let v=localStorage.getItem("tt1v1_fb_draft");v&&(i.value=v,f.textContent=String(v.length))}catch{}let h=l("#fb-send");h.addEventListener("click",async()=>{let v=i.value.trim();if(v.length<5){i.focus(),i.classList.add("fb-nudge"),setTimeout(()=>i.classList.remove("fb-nudge"),500),$("Write a message first \u2014 a few words is plenty.");return}h.classList.add("busy"),h.disabled=!0;try{let m=await fetch(J,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:l("#fb-name").value.trim(),contact:l("#fb-contact").value.trim(),message:v})}),L=await m.json().catch(()=>({}));if(!m.ok||!L.ok){$("Could not send: "+(L.error||"HTTP "+m.status)+" \u2014 try again later.");return}Mt(L.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}l("#fb-ticket-code").textContent=L.id,l("#fb-view-form").hidden=!0,l("#fb-view-done").hidden=!1}catch{$("Network error \u2014 your message was not sent.")}finally{h.classList.remove("busy"),h.disabled=!1}});let p=document.querySelector(".fb-ticket");p&&p.addEventListener("click",async()=>{let v=(l("#fb-ticket-code").textContent||"").trim();if(!v||v==="\u2014")return;try{await navigator.clipboard.writeText(v)}catch{let w=document.createElement("textarea");w.value=v,document.body.appendChild(w),w.select();try{document.execCommand("copy")}catch{}w.remove()}let m=l("#fb-copied");m&&(m.classList.add("show"),clearTimeout(window._fbCopiedT),window._fbCopiedT=setTimeout(()=>m.classList.remove("show"),1800)),$("Ticket code copied to clipboard.")}),l("#fb-check").addEventListener("click",async()=>{let v=l("#fb-ticket-in").value.trim(),m=l("#fb-reply-out");if(v){m.classList.add("show"),m.textContent="Checking\u2026";try{let L=await fetch(J+"/status?id="+encodeURIComponent(v)),w=await L.json().catch(()=>({}));if(!L.ok||!w.ok){m.textContent="No message found with that ticket code.";return}m.innerHTML=w.resolved?`Status: <b>resolved \u2713</b> \u2014 your message has been handled. Thanks for reaching out!${w.reply?`<br><b>Reply from the team:</b> ${b(w.reply)}`:""}`:w.reply?`<b>Reply from the team:</b> ${b(w.reply)}`:`Status: <b>${b(w.status)}</b> \u2014 your message is being reviewed, check back soon.`}catch{m.textContent="Network error \u2014 try again later."}}})}function Rt(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let t=null,a=()=>{e.classList.remove("show"),t=null};document.addEventListener("mouseover",n=>{let i=n.target.closest&&n.target.closest("[title],[data-tip]");if(!i)return;i.hasAttribute("title")&&(i.setAttribute("data-tip",i.getAttribute("title")),i.removeAttribute("title"));let f=i.getAttribute("data-tip");if(!f)return;t=i,e.textContent=f;let h=i.getBoundingClientRect(),p=h.top<52;e.classList.toggle("below",p),e.style.left=Math.max(10,Math.min(window.innerWidth-10,h.left+h.width/2))+"px",e.style.top=(p?h.bottom+8:h.top-8)+"px",e.classList.add("show")}),document.addEventListener("mouseout",n=>{if(!t)return;let i=n.relatedTarget;i&&i.closest&&i.closest("[title],[data-tip]")===t||a()}),window.addEventListener("scroll",a,{passive:!0})}var Oe;function $(e){let t=l("#toast");t.textContent=e,t.classList.add("show"),clearTimeout(Oe),Oe=setTimeout(()=>t.classList.remove("show"),2600)}var K;function ge(){K&&K.disconnect(),K=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add("in"),T(".cu",t.target).forEach(a=>xe(a,parseFloat(a.dataset.target),{dec:parseInt(a.dataset.dec||0)})),K.unobserve(t.target))})},{threshold:.12}),T(".reveal").forEach(e=>K.observe(e))}(function(){let t=l("#scroll-progress"),a=l("#to-top"),n=l("#page-home .hero-row"),i=document.querySelector(".topbar"),f=()=>{let h=window.scrollY,p=document.documentElement.scrollHeight-window.innerHeight;t&&(t.style.width=(p>0?h/p*100:0)+"%"),a&&a.classList.toggle("show",h>640),i&&i.classList.toggle("scrolled",h>10),n&&h<1400&&(n.style.transform=`translateY(${h*.14}px)`,n.style.opacity=String(Math.max(.3,1-h/950)))};window.addEventListener("scroll",f,{passive:!0}),a&&a.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),f()})();q();Te();Re();Et();Rt();function le(e,t){let a=e.indexOf("window."+t);if(a<0)return null;let n=e.indexOf("=",a);for(;n<e.length&&"{[".indexOf(e[n])<0;)n++;let i=0,f=!1,h="",p=!1;for(let v=n;v<e.length;v++){let m=e[v];if(f){p?p=!1:m==="\\"?p=!0:m===h&&(f=!1);continue}if(m==='"'||m==="'"){f=!0,h=m;continue}if(m==="{"||m==="[")i++;else if((m==="}"||m==="]")&&(i--,i<=0))return JSON.parse(e.slice(n,v+1))}return null}async function He(e){try{let t="cb="+Date.now(),[a,n]=await Promise.all([fetch("data.js?"+t,{cache:"no-store"}),fetch("log.js?"+t,{cache:"no-store"})]);if(!a.ok||!n.ok)throw new Error("HTTP "+a.status+"/"+n.status);let i=await a.text(),f=await n.text(),h=le(i,"LB_DATA"),p=le(f,"LB_PUB")||(le(f,"LB_LOG")?{matches:le(f,"LB_LOG")}:null),v=[];if(h&&JSON.stringify(h)!==JSON.stringify(B)&&(B=h,window.LB_DATA=h,v.push("data")),p&&JSON.stringify(p)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=p,window.LB_LOG=p.matches||[],v.push("log")),v.length){q(),Te(),Re();let m=l("#last-updated");m&&(m.textContent="Last updated "+(B.generated||"today"))}e&&$(v.length?"Refreshed \u2014 you have the latest data.":"Already up to date \u2713")}catch{e&&$("Refresh failed \u2014 check your connection.")}}He(!1);var re=l("#lb-refresh-btn");re&&re.addEventListener("click",async()=>{re.classList.add("spinning"),await He(!0),setTimeout(()=>re.classList.remove("spinning"),400)});var Ge="tt1v1_fb_seen",H=null;function Tt(){try{return JSON.parse(localStorage.getItem(fe)||"[]")}catch{return[]}}function We(){try{return JSON.parse(localStorage.getItem(Ge)||"{}")||{}}catch{return{}}}function qt(){let e=l("#fab-feedback");if(e&&!e.querySelector(".fb-dot")){let a=document.createElement("span");a.className="fb-dot",e.appendChild(a),requestAnimationFrame(()=>a.classList.add("in"))}let t=l("#fb-view-form");if(t&&!l("#fb-reply-banner")&&H){let a=document.createElement("div");a.id="fb-reply-banner",a.innerHTML=`<b>The team replied</b> to your message (ticket ${b(H.id)})
      <div class="r">${b(H.reply)}</div>
      <button class="btn btn-ghost" id="fb-got-it" style="margin-top:9px;padding:6px 13px">\u2713 Got it</button>`,t.insertAdjacentElement("beforebegin",a),requestAnimationFrame(()=>a.classList.add("show")),l("#fb-got-it").addEventListener("click",Nt)}}function Nt(){if(H){let a=We();a[H.id]=1;try{localStorage.setItem(Ge,JSON.stringify(a))}catch{}H=null}let e=l(".fb-dot");e&&(e.classList.add("out"),setTimeout(()=>e.remove(),420));let t=l("#fb-reply-banner");t&&(t.classList.remove("show"),setTimeout(()=>t.remove(),420))}async function Ue(){let e=We();H=null;let t=Tt(),a=t.slice(0,Math.max(0,t.length-6)),n=[];for(let i of t.slice(-6))try{let f=await fetch(J+"/status?id="+encodeURIComponent(i.id),{cache:"no-store"}),h=await f.json().catch(()=>({}));if(f.status===404||f.ok&&h.ok===!1)continue;n.push(i),f.ok&&h.ok&&h.reply&&!e[i.id]&&!H&&(H={id:i.id,reply:h.reply})}catch{n.push(i)}if(n.length!==t.slice(-6).length)try{localStorage.setItem(fe,JSON.stringify([...a,...n]))}catch{}H&&qt()}setTimeout(Ue,3500);setInterval(Ue,9e4);})();
