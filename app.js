/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var _=window.LB_DATA,he="https://tierstats-publish.tierstats.workers.dev/publish",r=(e,t=document)=>t.querySelector(e),T=(e,t=document)=>[...t.querySelectorAll(e)],g=e=>String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),F=e=>encodeURIComponent(String(e)),qe=e=>decodeURIComponent(e);function xe(e,t,s={}){let l=s.dur||1200,i=s.dec||0,u=performance.now(),m=parseFloat(e.textContent)||0;function p(n){let y=Math.min(1,(n-u)/l),x=1-Math.pow(1-y,3);e.textContent=(m+(t-m)*x).toFixed(i),y<1&&requestAnimationFrame(p)}requestAnimationFrame(p),setTimeout(()=>{e.textContent=t.toFixed(i)},l+300)}var ze='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',Ve='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function ue(e,t=""){let s=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",l=e<=3?e===1?ze:Ve:"";return`<div class="rank-badge ${s} ${t}" title="Rank #${e}">${l}<span class="num">${e}</span></div>`}var I={},A=[],G={players:[],byName:{},qualified:[]},X={},de={},V={},be=new Set;function Ye(){for(let s in X)delete X[s];let e=new Set(P().aliasRemoved||[]);Object.entries(_.aliases).forEach(([s,l])=>{e.has(s)||(X[s.toLowerCase()]=l)}),Object.entries(P().aliases||{}).forEach(([s,l])=>{X[String(s).toLowerCase()]=l});for(let s of Object.keys(de))delete de[s];for(let s of Object.keys(V))delete V[s];be.clear();let t=(s,l)=>{Object.keys(s||{}).forEach(i=>{let u=D(i);u!==i&&(l[u]=s[i])}),Object.keys(s||{}).forEach(i=>{let u=D(i);u===i&&(l[u]=s[i])})};t(_.seeds,de),t(_.prevRatings,V),(_.inactiveList||[]).forEach(s=>be.add(D(s)))}var D=e=>{let t=String(e).trim(),s=new Set;for(;;){let l=X[t.toLowerCase()];if(!l||l===t||s.has(t))return t;s.add(t),t=l}};function Le(e){let t=[];return B().forEach(s=>{let l=(i,u,m)=>({opp:i,for_:u,against:m,res:u>m?"W":u<m?"L":"D",date:s.date});s.a===e?t.push(l(s.b,s.sa,s.sb)):s.b===e&&t.push(l(s.a,s.sb,s.sa))}),t}function Qe(e){let t={};return Le(e).forEach(s=>{let l=t[s.opp]||(t[s.opp]={w:0,l:0,d:0,pf:0,pa:0});l[s.res.toLowerCase()]+=1,l.pf+=s.for_,l.pa+=s.against}),Object.entries(t).map(([s,l])=>({opp:s,...l})).sort((s,l)=>l.w+l.l+l.d-(s.w+s.l+s.d)||l.w-s.w)}function Ze(e){let t=I[e]||{};return t.provisional?'<span class="tag prov">provisional</span>':t.inactive?'<span class="tag inact">inactive</span>':""}function Ke(e){let t=Le(e).slice(0,5).reverse();if(!t.length)return"";let s=t.map(l=>l.res).join(" ");return`<span class="form" title="Last ${t.length} results (oldest \u2192 newest): ${s}">${t.map(l=>`<i class="${l.res.toLowerCase()}">${l.res}</i>`).join("")}</span>`}function Se(e){let t=e.delta!=null?e.delta:0;if(Math.abs(t)<.05)return"";let s=t>0;return`<span class="delta ${s?"up":"down"}" title="${s?"up":"down"} ${Math.abs(t).toFixed(1)} since the previous sheet update">${s?"\u25B2":"\u25BC"} ${Math.abs(t).toFixed(1)}</span>`}function Xe(){let e=_.prevRanks||{},t=Object.keys(e);if(t.length){let i={};return t.forEach(u=>{i[D(u)]=e[u]}),i}let s={};A.forEach(i=>{V[i.name]!=null&&(s[i.name]=V[i.name])});let l={};return Object.entries(s).sort((i,u)=>u[1]-i[1]).forEach(([i],u)=>{l[i]=u+1}),l}function et(e,t){let s=t[e.name]!=null?t[e.name]:t[D(e.name)];if(s==null){let i=(_.newSince||{})[e.name];return!i||(Date.now()-Date.parse(i))/864e5>5?"":'<span class="mv new" title="Newly qualified for the leaderboard \u2014 shown for 5 days">NEW</span>'}let l=s-e.rank;return l>0?`<span class="mv up" title="Up ${l} place${l>1?"s":""} since the last ratings update">\u25B2${l}</span>`:l<0?`<span class="mv down" title="Down ${-l} place${l<-1?"s":""} since the last ratings update">\u25BC${-l}</span>`:""}function ie(e){return`${Math.round(e.rating-100)} \u2013 ${Math.round(e.rating+100)}`}function me(e,t){return e.provisional?`<span class="prov-range" title="Provisional \u2014 estimated range (\xB1100). The exact rating is unreliable over few matches.">${t?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:ie(e)}</span>`:e.rating.toFixed(1)}var Ae="tt1v1_admin_log_v1",Y="tt1v1_admin_ok",z="tt1v1_admin_pw",tt=()=>sessionStorage.getItem(Y)==="1"||localStorage.getItem(Y)==="1",ee=()=>sessionStorage.getItem(z)||localStorage.getItem(z)||"";function at(e,t){t?(localStorage.setItem(Y,"1"),localStorage.setItem(z,e)):(sessionStorage.setItem(Y,"1"),sessionStorage.setItem(z,e),localStorage.removeItem(Y),localStorage.removeItem(z))}function st(){[sessionStorage,localStorage].forEach(e=>{e.removeItem(Y),e.removeItem(z)})}var Ne=null,ye=!1;function je(){ye||!ee()||(clearTimeout(Ne),Ne=setTimeout(()=>publishLog({silent:!0}),1500))}var it=he.replace(/\/publish$/,"/verify"),nt=he.replace(/\/publish$/,"/sync");function U(){try{return JSON.parse(localStorage.getItem(Ae)||"[]")}catch{return[]}}function Z(e){try{localStorage.setItem(Ae,JSON.stringify(e))}catch{}je()}var Pe="tt1v1_admin_over_v1";function C(){try{return JSON.parse(localStorage.getItem(Pe)||"{}")||{}}catch{return{}}}function N(e){try{localStorage.setItem(Pe,JSON.stringify(e))}catch{}je()}function P(){let e=window.LB_PUB||{},t=C(),s=new Set([...e.aliasRemoved||[],...t.aliasRemoved||[]]),l=new Set([...e.seedRemoved||[],...t.seedRemoved||[]]),i=t.aliases||{},u={...t.seeds||{},...t.seedGlicko||{},...t.seedRd||{}},m=E=>Object.fromEntries(Object.entries(E||{}).filter(([a])=>!s.has(a)||i[a]!=null)),p=E=>Object.fromEntries(Object.entries(E||{}).filter(([a])=>!l.has(a)||u[a]!=null)),n=m({...e.aliases||{},...t.aliases||{}}),y=m({...e.aliasNotes||{},...t.aliasNotes||{}}),x=p({...e.seeds||{},...t.seeds||{}}),w=p({...e.seedGlicko||{},...t.seedGlicko||{}}),L=p({...e.seedRd||{},...t.seedRd||{}});return{aliases:n,aliasNotes:y,seeds:x,seedGlicko:w,seedRd:L,aliasRemoved:[...s].filter(E=>n[E]==null),seedRemoved:[...l].filter(E=>x[E]==null&&w[E]==null&&L[E]==null),settings:{...e.settings||{},...t.settings||{}},matchEdits:{...e.matchEdits||{},...t.matchEdits||{}},inactive:t.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...t.matchRemoved||[]])],faq:t.faq!=null?t.faq:e.faq!=null?e.faq:null}}function Ie(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function B(){let e=P(),t=e.matchEdits||{},s=new Set(e.matchRemoved||[]),l=(w,L)=>{if(s.has(L))return null;let E=t[L],a=E?{...w,sa:E.sa,sb:E.sb,date:E.date!=null?E.date:w.date}:w;return{...a,a:D(a.a),b:D(a.b),sa:+a.sa,sb:+a.sb,key:L}},i=U().map((w,L)=>l({...w,admin:!0,published:!1},"l:"+L)).filter(Boolean),u=Ie().map((w,L)=>l({...w,admin:!0,published:!0},"p:"+L)).filter(Boolean),m=_.matches.map((w,L)=>l({...w,admin:!1,published:!1},"a:"+L)).filter(Boolean).reverse(),p=w=>{let L=w.a>w.b;return[L?w.b:w.a,L?w.a:w.b,L?w.sb:w.sa,L?w.sa:w.sb,w.date||""].join("|")},n={};m.forEach(w=>{let L=p(w);n[L]=(n[L]||0)+1});let y={};return i.concat(u).filter(w=>{let L=p(w);return y[L]=(y[L]||0)+1,y[L]>(n[L]||0)}).concat(m)}var M={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},ce=864e5,se=Math.log(10)/400,De=e=>1/Math.sqrt(1+3*se*se*e*e/(Math.PI*Math.PI)),we=(e,t,s)=>1/(1+Math.pow(10,-De(s)*(e-t)/400));function ot(e){let t=P().seeds||{};return t[e]!=null&&t[e]!==""?Number(t[e]):de[e]}function lt(e){let t=(P().seedGlicko||{})[e],s=(P().seedRd||{})[e],l=t!=null&&t!==""?Number(t):null,i=s!=null&&s!==""?Number(s):null;if(l!=null||i!=null)return[l??M.unratedR,i??M.unratedRd];let u=ot(e);return u!=null?[Math.max(M.seedMid+(u-M.oldMid)*M.ptsPer,M.minSeed),M.knownRd]:[M.unratedR,M.unratedRd]}function Ce(e,t,s){let l=0,i=0;for(let[m,p,n]of s){let y=De(p),x=we(e,m,p);l+=y*y*x*(1-x),i+=y*(n-x)}if(l*=se*se,l<=0)return[e,t];let u=1/(t*t)+l;return[e+se/u*i,Math.sqrt(1/u)]}function rt(e,t){let s=Math.pow(10,t),l=e*s,i=Math.floor(l);return Math.abs(l-i-.5)<1e-6?(i%2===0?i:i+1)/s:Math.round(l)/s}var Me=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(M.periodDays*ce)),te=Me(M.graceStart),dt={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function Ee(){let e=P().settings||{};return(_.settings||[]).map(t=>({...t,value:Object.prototype.hasOwnProperty.call(e,t.name)?e[t.name]:t.value}))}function ct(){for(let e of Ee()){let t=dt[e.name];if(!t)continue;if(t==="graceStart"){let l=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(l)&&(M.graceStart=l);continue}let s=Number(e.value);Number.isFinite(s)&&(M[t]=s)}te=Me(M.graceStart),T(".cons-val").forEach(e=>{e.textContent=String(M.conservative)}),T(".min-matches-val").forEach(e=>{e.textContent=String(M.minMatches)}),T(".min-opp-val").forEach(e=>{e.textContent=String(M.minOpp)})}function vt(){ct(),Ye();let e={},t=a=>{if(!e[a]){let[o,v]=lt(a);e[a]={name:a,r:o,rd:v,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[a]},s=(a,o,v,d,b,c)=>{let f=t(a);f.games++,f.opps.add(o),v>d?f.w++:v<d?f.l++:f.d++,f.lastIdx=c,b&&(f.lastDate=b)},l={};for(let a of B()){if(a.date)continue;let o=a.a,v=a.b,d=a.sa>a.sb?1:a.sa<a.sb?0:.5;(l[o]=l[o]||[]).push([v,d]),(l[v]=l[v]||[]).push([o,1-d]),s(o,v,a.sa,a.sb,"",te),s(v,o,a.sb,a.sa,"",te)}let i={};for(let a in l)i[a]=[t(a).r,t(a).rd];for(let a in l){let[o,v]=Ce(i[a][0],i[a][1],l[a].map(([d,b])=>[i[d][0],i[d][1],b]));t(a).r=o,t(a).rd=v}let u=new Map;for(let a of B().filter(o=>o.date).slice().reverse()){let o=a.date,v=Me(o);u.has(v)||u.set(v,[]),u.get(v).push({a:D(a.a),b:D(a.b),sa:+a.sa,sb:+a.sb,date:o})}for(let a of[...u.keys()].sort((o,v)=>o-v)){for(let d in e){let b=e[d],c=a-(b.lastIdx==null?te:b.lastIdx);c>0&&(b.rd=Math.min(Math.sqrt(b.rd*b.rd+M.growth*M.growth*c),M.maxRd))}let o={};for(let d of u.get(a)){let b=d.sa>d.sb?1:d.sa<d.sb?0:.5;(o[d.a]=o[d.a]||[]).push([d.b,b]),(o[d.b]=o[d.b]||[]).push([d.a,1-b]),s(d.a,d.b,d.sa,d.sb,d.date,a),s(d.b,d.a,d.sb,d.sa,d.date,a)}let v={};for(let d in o)v[d]=[t(d).r,t(d).rd];for(let d in o){let[b,c]=Ce(v[d][0],v[d][1],o[d].map(([f,k])=>[v[f][0],v[f][1],k]));t(d).r=b,t(d).rd=c}}let m=Object.values(e).map(a=>({name:a.name,glicko:a.r,rd:a.rd,rating:a.r-M.conservative*a.rd,matches:a.games,w:a.w,l:a.l,d:a.d,winPct:a.games?rt(a.w/a.games*100,1):0,opponents:a.opps.size,avgOpp:0,lastMatch:a.lastDate||"",provisional:!(a.games>=M.minMatches&&a.opps.size>=M.minOpp),inactive:!1})),p={};m.forEach(a=>{p[a.name]=a.glicko}),m.forEach(a=>{let o=0;e[a.name].opps.forEach(v=>{o+=p[v]!=null?p[v]:M.unratedR}),a.avgOpp=e[a.name].opps.size?o/e[a.name].opps.size:0});let n=Date.now(),y=Math.floor(n/(M.periodDays*ce));for(let a in e){let o=e[a],v=y-(o.lastIdx==null?te:o.lastIdx);v>0&&(o.rd=Math.min(Math.sqrt(o.rd*o.rd+M.growth*M.growth*v),M.maxRd))}m.forEach(a=>{a.glicko=e[a.name].r,a.rd=e[a.name].rd,a.rating=a.glicko-M.conservative*a.rd;let o=V[a.name];a.delta=o!=null?a.rating-o:0});let x=Date.parse(M.graceStart+"T00:00:00Z")+M.graceDays*ce,w=new Set([...be,...P().inactive||[]]);m.forEach(a=>{a.inactive=w.has(a.name)||(a.lastMatch?n-Date.parse(a.lastMatch+"T00:00:00Z")>M.inactiveDays*ce:n>x)});let L=m.filter(a=>!a.provisional&&!a.inactive).sort((a,o)=>o.rating-a.rating);L.forEach((a,o)=>{a.rank=o+1}),m.sort((a,o)=>o.rating-a.rating);let E={};return m.forEach(a=>{E[a.name]=a}),{players:m,byName:E,qualified:L}}function q(){G=vt(),I=G.byName,A=G.qualified}var pt=["page-home","page-player","page-compare","page-matches","page-roster","page-analytics","page-method","page-faq","page-admin"];function Re(){if(ke){ke=!1;return}let e=location.hash||"#/";pt.forEach(i=>r("#"+i).classList.remove("active"));let t="#/"+(e.split("/")[1]||"");T(".nav a, .foot-nav a").forEach(i=>{let u=i.getAttribute("href");i.classList.toggle("active",u===t||e==="#/"&&u==="#/")});let s=r("#nav-glide"),l=document.querySelector(".nav a.active");if(s&&l&&l.offsetWidth>0?(s.style.width=l.offsetWidth+"px",s.style.transform=`translateX(${l.offsetLeft}px)`,s.style.opacity="1"):s&&(s.style.opacity="0"),e==="#/compare"||e.startsWith("#/compare/")){let i=e.split("/").slice(2).map(qe);Fe(i[0]||"",i[1]||""),r("#page-compare").classList.add("active"),window.scrollTo(0,0)}else e.startsWith("#/player/")?(gt(qe(e.slice(9))),r("#page-player").classList.add("active"),window.scrollTo({top:0,behavior:"instant"in window?"instant":"auto"})):e==="#/matches"?(bt(),r("#page-matches").classList.add("active"),window.scrollTo(0,0)):e==="#/roster"?(yt(),r("#page-roster").classList.add("active"),window.scrollTo(0,0)):e==="#/analytics"?(wt(),r("#page-analytics").classList.add("active"),window.scrollTo(0,0)):e==="#/method"?($t(),r("#page-method").classList.add("active"),window.scrollTo(0,0)):e==="#/faq"?(xt(),r("#page-faq").classList.add("active"),window.scrollTo(0,0)):e==="#/admin"?(O(),r("#page-admin").classList.add("active"),window.scrollTo(0,0)):(Te(),r("#page-home").classList.add("active"),requestAnimationFrame(ft));ge()}window.addEventListener("hashchange",Re);function Te(){Q="all",j={key:"rank",dir:1},T(".chip[data-filter]").forEach(p=>p.classList.toggle("on",p.dataset.filter==="all")),T(".sortable").forEach(p=>p.classList.remove("sorted","asc"));let e=r('.sortable[data-key="rank"]');e&&e.classList.add("sorted");let t=B().length,s=G.players.length,l=A[0],i=Math.round(A.reduce((p,n)=>p+n.rd,0)/A.length);r("#hero-matches").textContent=t,r("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">Ranked players</div>
      <div class="v"><span class="cu" data-target="${A.length}">0</span><small>/ ${s} total</small></div></div>
    <div class="stat-card"><div class="k">Matches logged</div>
      <div class="v"><span class="cu" data-target="${t}">0</span></div></div>
    <div class="stat-card"><div class="k">Highest rating</div>
      <div class="v"><span class="cu" data-target="${l.rating}" data-dec="1">0</span><small>${g(l.name)}</small></div></div>
    <div class="stat-card"><div class="k">Avg certainty (RD)</div>
      <div class="v"><span class="cu" data-target="${i}" data-dec="1">0</span><small>certainty score</small></div></div>`;let u=[A[1],A[0],A[2]].filter(Boolean);r("#fl-cards").innerHTML=u.map(p=>`
    <div class="fl-card r${p.rank}${p.rank===1?" champ":""} reveal" data-goto="${g(p.name)}">
      <div class="fl-top">
        ${ue(p.rank)}
        <div class="rd">RD ${p.rd.toFixed(0)}</div>
      </div>
      ${p.rank===1?'<div class="champ-tag">#1 Tank</div>':""}
      <div class="nm">${g(p.name)}</div>
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
    </div>`).join(""),requestAnimationFrame(()=>{T("#fl-cards .bar-fill").forEach(p=>{p.style.width=p.dataset.w+"%"})}),ne(),_e();let m=r("#last-updated");m&&(m.textContent="Last updated "+(_.generated||"today"))}function _e(){let e=B().filter(t=>t.date).slice(0,10);r("#battles-grid").innerHTML=e.length?e.map(t=>{let s=t.sa>t.sb,l=t.sb>t.sa;return`
    <div class="battle-row reveal" data-goto="${g(s?t.a:t.b)}">
      <div class="who ${s?"win":"lose"}" data-goto="${g(t.a)}">${g(t.a)}</div>
      <div class="vs">vs</div>
      <div class="who r ${l?"win":"lose"}" data-goto="${g(t.b)}">${g(t.b)}</div>
      <div class="sc mono"><span class="${s?"win":"lose"}">${t.sa}</span> \u2013 <span class="${l?"win":"lose"}">${t.sb}</span></div>
      <div class="dt">${t.date||(t.admin&&!t.published?"just now":"historical")}</div>
    </div>`}).join(""):'<div class="empty" style="padding:26px;text-align:center;color:var(--dim);grid-column:1/-1">No dated matches yet \u2014 new verified results will appear here as they are logged.</div>'}var mt=380,ht="cubic-bezier(.22,.8,.24,1)";function ut(e){matchMedia("(prefers-reduced-motion: reduce)").matches||T(".lb-row",e).forEach((t,s)=>{typeof t.animate=="function"&&t.animate([{opacity:0,transform:"translateY(22px)"},{opacity:1,transform:"none"}],{duration:mt,easing:ht,delay:Math.min(s*14,260),fill:"backwards"})})}function ne(e="all",t="rank",s=1,l=!1){let i=r("#lb-body"),m=(e==="all"&&ve?A:G.players).slice().map(n=>({...n,rank:n.rank!=null?n.rank:9999}));$e&&(m=m.filter(n=>n.name.toLowerCase().includes($e))),e==="provisional"?m=m.filter(n=>(I[n.name]||{}).provisional):e==="inactive"?m=m.filter(n=>(I[n.name]||{}).inactive):e==="veterans"?m=m.filter(n=>n.matches>=15):e==="rising"&&(m=m.filter(n=>n.winPct>=60&&n.matches>=5)),m.sort((n,y)=>{let x=n[t],w=y[t];return(typeof x=="string"?x.localeCompare(w):x-w)*s});let p=Xe();i.innerHTML=m.map(n=>`
    <div class="lb-row ${n.rank<=3?"top"+n.rank:""}" data-name="${g(n.name)}" data-goto="${g(n.name)}">
      <div class="rank">${n.rank<=A.length?ue(n.rank,"sm")+et(n,p):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="pname">${g(n.name)}</div></div>
      <div class="rating-cell mono">${Se(n)}${me(n,!0)}</div>
      <div class="num-cell mono col-hide">${n.rd.toFixed(1)}</div>
      <div class="num-cell mono col-hide">${n.matches}</div>
      <div class="num-cell mono col-hide"><span class="w">${n.w}</span></div>
      <div class="num-cell mono col-hide"><span class="l">${n.l}</span></div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${n.winPct>=60?"":n.winPct>=40?"mid":"low"}" data-w="${n.winPct}"></div></div>
        <div class="pct mono">${n.winPct}%</div>
      </div>
      <div class="num-cell mono col-hide">${n.opponents}</div>
      <div class="num-cell mono col-hide">${n.avgOpp.toFixed(0)}</div>
      <div class="col-status">${Ze(n.name)||Ke(n.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?"Nobody is inactive right now \u2014 a player goes inactive 365 days after their last match (or when flagged in the master sheet).":e==="provisional"?"No provisional players right now.":"No players match this filter."}</div>`,l&&ut(i),requestAnimationFrame(()=>{T(".bar-fill",i).forEach(n=>{n.style.width=n.dataset.w+"%"})})}var Q="all",j={key:"rank",dir:1},$e="",ve=!0;function ft(){T("#stat-strip .cu").forEach(e=>xe(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),T(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}r("#lb-qual").addEventListener("click",()=>{ve=!ve,r("#lb-qual").classList.toggle("on",ve),ne(Q,j.key,j.dir,!0)});r("#lb-filter").addEventListener("input",e=>{$e=e.target.value.trim().toLowerCase(),ne(Q,j.key,j.dir)});var ae=r("#theme-toggle");function Be(){if(!ae)return;let e=document.documentElement.dataset.theme==="light",t=e?"Switch to dark mode":"Switch to light mode";ae.setAttribute("aria-pressed",String(e)),ae.setAttribute("aria-label",t),ae.title=t}ae.addEventListener("click",()=>{let t=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=t;try{localStorage.setItem("tt1v1_theme",t)}catch{}Be()});Be();document.addEventListener("click",e=>{let t=e.target.closest(".chip");if(t&&t.dataset.filter){T(".chip[data-filter]").forEach(i=>i.classList.remove("on")),t.classList.add("on"),Q=t.dataset.filter,ne(Q,j.key,j.dir,!0);return}let s=e.target.closest(".sortable");if(s){let i=s.dataset.key;j.dir=j.key===i?-j.dir:1,j.key=i,T(".sortable").forEach(u=>u.classList.remove("sorted","asc")),s.classList.add("sorted"),j.dir===1&&s.classList.add("asc"),ne(Q,j.key,j.dir,!0);return}let l=e.target.closest("[data-goto]");l&&(e.stopPropagation(),location.hash="#/player/"+F(l.dataset.goto))});function Fe(e,t){let s=r("#cmp-wrap"),i=G.players.slice().sort((h,S)=>(h.rank!=null?h.rank:9999)-(S.rank!=null?S.rank:9999)||h.name.localeCompare(S.name)).map(h=>h.name);if(i.length<2){s.innerHTML='<div class="empty">Not enough players to compare yet.</div>';return}let u=I[e]?e:i[0],m=I[t]?t:i[1];m===u&&(m=i.find(h=>h!==u));let p=I[u],n=I[m],y=A.find(h=>h.name===u),x=A.find(h=>h.name===m),w=we(p.glicko,n.glicko,n.rd),L=we(n.glicko,p.glicko,p.rd),E=Math.round(w/(w+L)*1e3)/10,a=Math.round(1e3-E*10)/10,o=B().filter(h=>h.a===u&&h.b===m||h.a===m&&h.b===u).map(h=>{let S=h.a===u,R=S?h.sa:h.sb,W=S?h.sb:h.sa;return{fa:R,fb:W,res:R>W?"W":R<W?"L":"D",date:h.date}}),v=o.reduce((h,S)=>(S.res==="W"?h.w++:S.res==="L"?h.l++:h.d++,h),{w:0,l:0,d:0}),d=h=>`<option value="${g(h)}"${h===u?" selected":""}>${g(h)}</option>`,b=h=>`<option value="${g(h)}"${h===m?" selected":""}>${g(h)}</option>`,c=(h,S,R,W,Je)=>`
    <div class="cmp-trow">
      <div class="va mono${W?" win":""}">${S}</div>
      <div class="k">${h}</div>
      <div class="vb mono${Je?" win":""}">${R}</div>
    </div>`,f='<span style="color:var(--dimmer)">\u2014</span>';s.innerHTML=`
    <div class="kicker anim">versus</div>
    <h2 class="section-head anim" style="margin:6px 0 2px">Compare players</h2>
    <div class="cmp-pickers anim">
      <select id="cmp-a" aria-label="First player">${i.map(d).join("")}</select>
      <button class="btn btn-ghost" id="cmp-swap" style="width:auto;margin:0" title="Swap sides">\u21C4</button>
      <select id="cmp-b" aria-label="Second player">${i.map(b).join("")}</select>
    </div>
    <div class="cmp-share anim">
      <button class="btn btn-ghost" id="cmp-copy" style="width:auto;margin:0">Copy shareable link</button>
      <span class="caption" id="cmp-copy-msg"></span>
    </div>

    <div class="cmp-hero anim">
      <div class="cmp-side a">
        <div class="cmp-sub">${y?`Rank #${y.rank}`:"Unranked"}</div>
        <div class="cmp-name"><a href="#/player/${F(u)}">${g(u)}</a></div>
        <div class="cmp-rating mono">${p.provisional?ie(p):p.rating.toFixed(1)}</div>
        <div class="cmp-sub">RD ${p.rd.toFixed(1)} \xB7 ${p.matches} matches</div>
      </div>
      <div class="cmp-vs">
        <div class="vs-mark">VS</div>
        <div class="mono" style="font-size:11px;color:var(--dimmer)">${o.length} H2H</div>
      </div>
      <div class="cmp-side b">
        <div class="cmp-sub">${x?`Rank #${x.rank}`:"Unranked"}</div>
        <div class="cmp-name"><a href="#/player/${F(m)}">${g(m)}</a></div>
        <div class="cmp-rating mono">${n.provisional?ie(n):n.rating.toFixed(1)}</div>
        <div class="cmp-sub">RD ${n.rd.toFixed(1)} \xB7 ${n.matches} matches</div>
      </div>
    </div>

    <div class="panel anim">
      <h3>Estimated win probability <span class="n">\u2014 based on current Glicko ratings</span></h3>
      <div class="cmp-prob-labels">
        <span style="color:var(--gold)">${g(u)} ${E.toFixed(1)}%</span>
        <span style="color:var(--blue)">${a.toFixed(1)}% ${g(m)}</span>
      </div>
      <div class="cmp-probbar"><i class="pa" style="width:${E}%"></i><i class="pb" style="width:${a}%"></i></div>
      <div class="cmp-prob-note">Estimate only \u2014 computed with the leaderboard's own Glicko formula from each player's current rating and RD. It is not a guarantee: form, maps and matchups still decide the game.</div>
    </div>

    <div class="panel anim">
      <h3>Tale of the tape</h3>
      <div class="cmp-table">
        ${c("Rating",me(p),me(n),!p.provisional&&p.rating>n.rating,!n.provisional&&n.rating>p.rating)}
        ${c("Rank",y?"#"+y.rank:f,x?"#"+x.rank:f,y&&x&&y.rank<x.rank,y&&x&&x.rank<y.rank)}
        ${c("RD (uncertainty)",p.rd.toFixed(1),n.rd.toFixed(1),p.rd<n.rd,n.rd<p.rd)}
        ${c("Glicko",p.glicko.toFixed(1),n.glicko.toFixed(1),p.glicko>n.glicko,n.glicko>p.glicko)}
        ${c("Record",`<span style="color:var(--green)">${p.w}W</span> <span style="color:var(--red)">${p.l}L</span> ${p.d}D`,`<span style="color:var(--green)">${n.w}W</span> <span style="color:var(--red)">${n.l}L</span> ${n.d}D`,p.winPct>n.winPct,n.winPct>p.winPct)}
        ${c("Win rate",p.winPct+"%",n.winPct+"%",p.winPct>n.winPct,n.winPct>p.winPct)}
        ${c("Matches played",p.matches,n.matches,!1,!1)}
        ${c("Unique opponents",p.opponents,n.opponents,p.opponents>n.opponents,n.opponents>p.opponents)}
        ${c("Avg opponent rating",p.avgOpp.toFixed(1),n.avgOpp.toFixed(1),p.avgOpp>n.avgOpp,n.avgOpp>p.avgOpp)}
        ${c("Head to head",`${v.w}W \u2013 ${v.l}L \u2013 ${v.d}D`,`${v.l}W \u2013 ${v.w}L \u2013 ${v.d}D`,v.w>v.l,v.l>v.w)}
      </div>
    </div>

    <div class="panel anim">
      <h3>Previous meetings <span class="n">\u2014 ${o.length} ${o.length===1?"game":"games"}</span></h3>
      <div class="match-list">
        ${o.map(h=>`
          <div class="match-row">
            <div class="res-chip ${h.res}">${h.res}</div>
            <div class="who">${g(u)}</div>
            <div class="score mono">${h.fa} \u2013 ${h.fb}</div>
            <div class="who opp"><a href="#/player/${F(m)}" style="color:var(--blue)">${g(m)}</a></div>
            <div class="date mono">${h.date||"historical"}</div>
          </div>`).join("")||'<div class="empty">These two have never met.</div>'}
      </div>
      <div class="caption" style="margin-top:12px">Legacy archive games count toward head-to-head (the results are known) \u2014 their dates are not.</div>
    </div>`;let k=()=>{let h=r("#cmp-a").value,S=r("#cmp-b").value,R="#/compare/"+F(h)+"/"+F(S);location.hash!==R&&(ke=!0,location.hash=R),Fe(h,S)};r("#cmp-a").addEventListener("change",k),r("#cmp-b").addEventListener("change",k),r("#cmp-swap").addEventListener("click",()=>{let h=r("#cmp-a").value;r("#cmp-a").value=r("#cmp-b").value,r("#cmp-b").value=h,k()}),r("#cmp-copy").addEventListener("click",()=>{let h=location.href.split("#")[0]+"#/compare/"+F(u)+"/"+F(m),S=()=>{r("#cmp-copy-msg").textContent="Link copied \u2713"};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(h).then(S,()=>{r("#cmp-copy-msg").textContent=h}):r("#cmp-copy-msg").textContent=h})}var ke=!1;function gt(e){let t=I[e],s=r("#page-player");if(!t){s.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">
      No player called "<b>${g(e)}</b>" found. <a href="#/" style="color:var(--gold)">Back to the leaderboard</a>.
    </div></div></div>`;return}let l=A.find(n=>n.name===e),i=Le(e),u=i.slice(0,10),m=Qe(e),p=Math.max(3,Math.min(100,100-t.rd/120*100));s.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">\u2190 All rankings</a>
    <div class="player-hero anim">
      <div class="player-top">
        ${l?ue(l.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${g(t.name)}</div>
          <div class="player-rankline">
            ${l?`Ranked <b>#${l.rank}</b> of ${A.length} qualified players`:"Unranked \u2014 not enough recent games for the board"}
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
        ${u.map((n,y)=>`<div class="form-pill ${n.res}" style="animation-delay:${y*55}ms"
           title="vs ${g(n.opp)} ${n.for_}-${n.against}">${n.res}</div>`).join("")||'<span class="empty">No games yet</span>'}
      </div>
    </div>

    <div class="panel reveal">
      <h3>Match history <span class="n">\u2014 ${i.length} games</span></h3>
      <div class="match-list">
        ${i.map(n=>`
          <div class="match-row">
            <div class="res-chip ${n.res}">${n.res}</div>
            <div class="who">${g(t.name)}</div>
            <div class="score mono">${n.for_} \u2013 ${n.against}</div>
            <div class="who opp"><a href="#/player/${F(n.opp)}" style="color:var(--blue)">${g(n.opp)}</a></div>
            <div class="date mono">${n.date||"historical"}</div>
          </div>`).join("")||'<div class="empty">No games recorded</div>'}
      </div>
    </div>

    <div class="panel reveal">
      <h3>Head to head <span class="n">\u2014 ${m.length} opponents</span></h3>
      <div class="h2h-grid">
        ${m.map(n=>`
          <div class="h2h-card" data-goto="${g(n.opp)}">
            <div class="opp">${g(n.opp)}</div>
            <div class="rec mono"><span class="w">${n.w}W</span> \xB7 <span class="l">${n.l}L</span> \xB7 <span>${n.d}D</span> \xB7 ${n.pf}-${n.pa} pts</div>
          </div>`).join("")||'<div class="empty">No games recorded</div>'}
      </div>
    </div>
  </div>`,t.provisional||xe(r("#pv-rating"),t.rating,{dec:1,dur:900}),ge()}function bt(){_e();let e=r("#gm-body"),t=B();r("#gm-count").textContent=`\u2014 ${t.length} games`,e.innerHTML=t.map(s=>{let l=s.sa>s.sb,i=s.sb>s.sa;return`
    <div class="gm-row">
      <div class="side ${l?"winner":"loser"}">
        <div class="dot ${l?"w":"l"}"></div>
        <div class="nm" data-goto="${g(s.a)}">${g(s.a)}</div>
      </div>
      <div class="sc mono" style="color:${l?"var(--green)":"var(--red)"}">${s.sa}</div>
      <div class="dash mono">\u2013</div>
      <div class="sc mono" style="color:${i?"var(--green)":"var(--red)"}">${s.sb}</div>
      <div class="side right ${i?"winner":"loser"}">
        <div class="dot ${i?"w":"l"}"></div>
        <div class="nm" data-goto="${g(s.b)}">${g(s.b)}</div>
      </div>
      <div class="dt mono">${s.admin&&!s.published?'<span class="tag fresh">new</span>':s.date||"historical"}</div>
    </div>`}).join("")}function yt(){let e=G.players.filter(t=>t.provisional).sort((t,s)=>s.rating-t.rating);r("#roster-grid").innerHTML=e.map(t=>{let s=Math.min(100,Math.round(Math.min(1,t.matches/5)*50+Math.min(1,t.opponents/3)*50));return`
    <div class="roster-card reveal" data-goto="${g(t.name)}">
      <div class="top">
        <div class="nm">${g(t.name)}</div>
        <svg class="shield" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"/></svg>
      </div>
      <div class="rating"><span class="unit">Est. range</span><span class="big prov-range">${ie(t)}</span></div>
      <div class="req-row"><span>Matches</span><span class="${t.matches>=5?"ok":""}">${t.matches} / 5 ${t.matches>=5?"\u2713":""}</span></div>
      <div class="req-row"><span>Opponents</span><span class="${t.opponents>=3?"ok":""}">${t.opponents} / 3 ${t.opponents>=3?"\u2713":""}</span></div>
      <div class="prog-track"><div class="prog-fill" data-w="${s}"></div></div>
      <div class="prog-label">${s}% to qualified</div>
    </div>`}).join(""),requestAnimationFrame(()=>T("#roster-grid .prog-fill").forEach(t=>{t.style.width=t.dataset.w+"%"}))}function wt(){let e=G.players,t=A.slice().sort((c,f)=>f.winPct-c.winPct).slice(0,10),s=e.slice().sort((c,f)=>f.matches-c.matches).slice(0,10),l=[];B().forEach(c=>{let f=I[c.a],k=I[c.b];if(!f||!k)return;let h=f.rating-k.rating;if(c.sa===c.sb)return;let S=c.sa>c.sb?c.a:c.b,R=Math.abs(h);(h<0&&S===c.a||h>0&&S===c.b)&&l.push({winner:S,loser:S===c.a?c.b:c.a,gap:R,score:S===c.a?`${c.sa}-${c.sb}`:`${c.sb}-${c.sa}`})}),l.sort((c,f)=>f.gap-c.gap);let i={};B().forEach(c=>{let f=[c.a,c.b].sort().join(" vs ");i[f]=(i[f]||0)+1});let u=Object.entries(i).sort((c,f)=>f[1]-c[1]).slice(0,10),m=e.map(c=>c.rating),p=Math.min(...m),n=Math.max(...m),y=8,x=(n-p)/y||1,w=Array.from({length:y},()=>0);m.forEach(c=>{w[Math.min(y-1,Math.max(0,Math.floor((c-p)/x)))]++});let L=Math.max(...w,1),E=w.map((c,f)=>{let k=Math.round((p+f*x)/10)*10,h=Math.round((p+(f+1)*x)/10)*10;return`
    <div class="hcol" title="${c} player${c===1?"":"s"} rated ${k}\u2013${h}">
      <div class="hbar" data-h="${Math.round(c/L*100)}"></div>
      <div class="hlbl">${k}\u2013${h}</div>
    </div>`}).join(""),a=e.slice().sort((c,f)=>f.opponents-c.opponents).slice(0,8),o=Math.max(...a.map(c=>c.opponents),1),v=a.map(c=>`
    <div class="mrow reveal" data-goto="${g(c.name)}">
      <div class="nm">${g(c.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(c.opponents/o*100)}"></div></div>
      <div class="val mono">${c.opponents}</div>
    </div>`).join(""),d=(c,f,k)=>c.map((h,S)=>`
    <div class="an-row reveal" data-goto="${g(h.name)}">
      <div class="idx mono">${S+1}</div>
      <div class="nm">${g(h.name)}</div>
      <div class="val mono">${f(h)}</div>
      <div class="unit mono">${k(h)}</div>
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
      ${d(s,c=>c.matches,c=>"matches")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Biggest upsets</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${l.length?l.slice(0,8).map((c,f)=>`
        <div class="an-row reveal" data-goto="${g(c.winner)}">
          <div class="idx mono">${f+1}</div>
          <div class="nm">${g(c.winner)} <span style="color:var(--dimmer);font-weight:500">def.</span> ${g(c.loser)}</div>
          <div class="val mono">${c.score}</div>
          <div class="unit mono">+${Math.round(c.gap)} pts</div>
        </div>`).join(""):'<div class="empty">No upsets on record</div>'}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Most contested rivalries</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${u.map(([c,f],k)=>`
        <div class="an-row reveal">
          <div class="idx mono">${k+1}</div>
          <div class="nm">${c.split(" vs ").map(g).join(' <span style="color:var(--dimmer);font-weight:500">vs</span> ')}</div>
          <div class="val mono">${f}</div>
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
    </div>`;let b=()=>{T("#an-grid .hbar").forEach(c=>{c.style.height=c.dataset.h+"%"}),T("#an-grid .abar").forEach(c=>{c.style.width=c.dataset.w+"%"})};requestAnimationFrame(b),setTimeout(b,140),ge()}function $t(){r("#settings-body").innerHTML=Ee().map(e=>`
    <tr><td><b>${g(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${g(e.desc)}</div></td>
        <td class="val">${g(String(e.value))}</td></tr>`).join("")}var kt=[{q:"How are the ratings calculated?",a:"Dynamic Glicko \u2014 the same model behind competitive chess and table-tennis rankings. Every recorded duel moves the numbers: beating a stronger opponent gains more, losing to a weaker one costs more. The full maths lives on the Method page."},{q:"Why did my rating drop even though I didn't play?",a:"That's the inactivity automation. Each 30-day rating period without a match grows your RD (uncertainty), and the visible rating subtracts half of it \u2014 so an idle rating slowly sinks on its own, exactly like the master sheet. Play one match and the drift stops."},{q:"What is RD, and why does it matter?",a:"RD (ratings deviation) is how certain the system is about your rating. New or idle players have a high RD; regular players have a low one. The board ranks the visible rating = Glicko \u2212 0.5 \xD7 RD, so uncertain ratings are held back until they've earned trust."},{q:"How do I get ranked on the leaderboard?",a:"Log at least 5 matches against at least 3 different opponents. Until then you're provisional \u2014 your rating is real and takes part in every calculation, but you aren't ranked yet."},{q:"What do the green and red arrows next to ratings mean?",a:"They show how your visible rating moved since the previous spreadsheet update: green \u25B2 means you climbed, red \u25BC means you dropped."},{q:"What does the \u201Cinactive\u201D tag mean?",a:"A qualified player is marked inactive \u2014 and hidden from the board \u2014 after 365 days without a dated match (legacy players without recorded dates get a 365-day grace window first). Your rating isn't deleted: come back, play a match, and you're active again."},{q:"Do my old 0\u2013100 ladder ratings still count?",a:"Yes. Historical scores are converted into Glicko starting points (old 80 \u2248 1500), so the ladder carries over. This site reproduces the master sheet's seeding exactly, including its low-end floor."},{q:"Two names on the board look like the same person \u2014 is that a bug?",a:"Possibly an alias. When we confirm two names are the same player, a name fix merges them everywhere \u2014 records, ratings and head-to-heads \u2014 without rewriting old matches. Report suspicious duplicates through the feedback button."},{q:"How do I get my duels recorded?",a:"Matches are logged by the team after official 1v1 duels. If a match is missing or has the wrong score, send feedback with the details and we'll fix it \u2014 corrections recalculate every rating instantly."},{q:"The numbers here differ from the Google Sheet \u2014 what do I do?",a:"They shouldn't: every figure on this site is recomputed from the raw results and validated against the official sheet down to the decimal. If you spot a gap, screenshot it and send feedback \u2014 that's a bug report we want."},{q:"Who runs this site?",a:"Alternator & interstellar. The leaderboard is data-driven \u2014 no manual rankings, no politics. Just duels."}];function pe(){let e=P().faq;return Array.isArray(e)&&e.length?e:kt}function xt(){r("#faq-list").innerHTML=pe().map((e,t)=>`
    <div class="faq-item reveal" data-faq="${t}">
      <button class="faq-q" aria-expanded="false">
        <span>${g(String(e.q||""))}</span>
        <svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="faq-a"><div class="faq-a-in">${g(String(e.a||""))}</div></div>
    </div>`).join(""),ge()}document.addEventListener("click",e=>{let t=e.target.closest(".faq-q");if(!t)return;let s=t.closest(".faq-item"),l=s.classList.contains("open");T(".faq-item.open").forEach(i=>{i.classList.remove("open"),i.querySelector(".faq-q").setAttribute("aria-expanded","false")}),l||(s.classList.add("open"),t.setAttribute("aria-expanded","true"))});function O(){let e=r("#admin-wrap");if(!tt()){e.innerHTML=`
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
    </div>`;let a=async()=>{let o=r("#admin-pw").value;try{let v=await fetch(it,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:o})});if(v.ok){let d=await v.json().catch(()=>({}));at(d.token||o,r("#admin-remember").checked),O(),$("Welcome back, commander.");return}if(v.status===429){$("Too many attempts \u2014 wait a few minutes.");return}}catch{}r("#admin-pw").style.borderColor="var(--red)",$("Wrong password.")};r("#admin-auth").addEventListener("click",a),r("#admin-pw").addEventListener("keydown",o=>{o.key==="Enter"&&a()});return}let s=U(),l=Ie().length,i=P(),u='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',m=Object.entries(i.aliases).map(([a,o])=>`
    <div class="log-item">
      <div class="txt"><b>${g(a)}</b> \u2192 <b>${g(o)}</b>${i.aliasNotes&&i.aliasNotes[a]?` <span style="color:var(--dimmer)">\u2014 ${g(i.aliasNotes[a])}</span>`:""}</div>
      <button class="icon-btn" data-alias-del="${g(a)}" title="Remove name fix">${u}</button>
    </div>`).join("")||'<div class="empty">No name fixes yet.</div>',p=i.inactive.map(a=>`
    <div class="log-item">
      <div class="txt"><b>${g(a)}</b> <span style="color:var(--dimmer)">\u2014 inactive</span></div>
      <button class="icon-btn" data-inact-del="${g(a)}" title="Mark active again">${u}</button>
    </div>`).join("")||'<div class="empty">Nobody marked inactive.</div>',n=Object.keys({...i.seeds||{},...i.seedGlicko||{},...i.seedRd||{}}).map(a=>`
    <div class="log-item">
      <div class="txt"><b>${g(a)}</b> \xB7 <span style="color:var(--dimmer)">old</span> <b class="mono">${g(String((i.seeds||{})[a]!=null?(i.seeds||{})[a]:"\u2014"))}</b>${(i.seedGlicko||{})[a]!=null?` \xB7 <span style="color:var(--dimmer)">glicko</span> <b class="mono">${g(String(i.seedGlicko[a]))}</b>`:""}${(i.seedRd||{})[a]!=null?` \xB7 <span style="color:var(--dimmer)">rd</span> <b class="mono">${g(String(i.seedRd[a]))}</b>`:""}</div>
      <button class="icon-btn" data-seed-del="${g(a)}" title="Remove seed">${u}</button>
    </div>`).join("")||'<div class="empty">No seed overrides \u2014 players start from the sheet values.</div>',y=Ee().map(a=>`
    <div class="set-row">
      <div class="lbl"><b>${g(a.name)}</b><div class="d">${g(String(a.desc||""))}</div></div>
      <input class="set-val mono" data-set-name="${g(a.name)}" value="${g(String(a.value))}">
    </div>`).join(""),x=a=>{let o=(a||"").trim().toLowerCase();return B().filter(d=>!o||d.a.toLowerCase().includes(o)||d.b.toLowerCase().includes(o)).slice(0,20).map(d=>`
      <div class="log-item fix-row" data-mkey="${d.key}">
        <div class="txt"><b>${g(d.a)}</b> <span style="color:var(--dimmer)">vs</span> <b>${g(d.b)}</b>${d.date?"":' <span class="tag legacy">legacy</span>'}</div>
        <input class="mono" data-f="sa" type="number" min="0" value="${d.sa}" title="Score 1">
        <input class="mono" data-f="sb" type="number" min="0" value="${d.sb}" title="Score 2">
        <input data-f="date" type="date" value="${d.date||""}" title="Match date">
        <button class="icon-btn" data-msave="${d.key}" title="Save fix"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-mdel="${d.key}" title="Delete match">${u}</button>
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
      <h3>Pending <span class="n">log</span> \u2014 ${s.length} local \xB7 ${l} published</h3>
      <div class="log-list" id="adm-list">
        ${s.length?s.map((a,o)=>`
          <div class="log-item">
            <div class="txt"><b>${g(a.a)}</b> ${a.sa}\u2013${a.sb} <b>${g(a.b)}</b></div>
            <div class="txt" style="color:var(--dimmer)">${g(a.date||"")}</div>
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
      <div class="log-list" id="ov-alias-list" style="margin-top:12px">${m}</div>
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
      <div class="log-list" id="ov-seed-list" style="margin-top:12px">${n}</div>
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

  <datalist id="player-list">${G.players.map(a=>`<option value="${g(a.name)}">`).join("")}</datalist>`,r("#admin-lock").addEventListener("click",()=>{st(),O()}),r("#admin-publish").addEventListener("click",()=>w()),r("#admin-sync").addEventListener("click",async()=>{let a=r("#admin-sync"),o=r("#admin-sync-status");a.disabled=!0,o.textContent="syncing\u2026";try{let v=await fetch(nt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:ee()})}),d=await v.json().catch(()=>({}));v.ok&&d.ok?(o.textContent=d.changed?`synced \u2713 ${d.matches} matches / ${d.players} players`:"already up to date \u2713",$(d.changed?"Sheet synced \u2014 the live site was updated.":"Site already matches the sheet.")):v.status===429?(o.textContent="rate limited",$("Too many attempts \u2014 wait a few minutes.")):(o.textContent="sync failed",$("Sync failed: "+(d.error||v.status)))}catch{o.textContent="network error",$("Sync failed (network).")}a.disabled=!1});async function w(a){let o=!!(a&&a.silent),v=ee()||(o?"":(window.prompt("Admin password:")||"").trim());if(!v){$(o?'Saved here \u2014 auto-publish needs a stored password. Use "Publish to everyone".':"Publish cancelled.");return}ye=!0;let d=P(),b={},c=[];for(let[h,S]of Object.entries(d.matchEdits||{}))h.startsWith("a:")&&(b[h]=S);for(let h of d.matchRemoved||[])h.startsWith("a:")&&c.push(h);let f=B().filter(h=>h.admin).map(h=>({a:h.a,b:h.b,sa:h.sa,sb:h.sb,date:h.date||""})),k={matches:f,aliases:d.aliases||{},aliasNotes:d.aliasNotes||{},aliasRemoved:d.aliasRemoved||[],inactive:d.inactive||[],seeds:d.seeds||{},seedGlicko:d.seedGlicko||{},seedRd:d.seedRd||{},seedRemoved:d.seedRemoved||[],settings:d.settings||{},matchEdits:b,matchRemoved:c,faq:d.faq!=null?d.faq:[]};try{let h=await fetch(he,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:v,doc:k,message:`Publish match log (${f.length} matches)`})}),S=await h.json().catch(()=>({}));if(!h.ok||!S.ok){h.status===403&&sessionStorage.removeItem(z),$("Publish failed: "+(S.error||"HTTP "+h.status));return}window.LB_PUB=k,window.LB_LOG=f,Z([]),N({}),q(),o||O(),$(o?"Saved \u2014 live for everyone \u2713":"Published! Everyone sees it on their next visit.")}catch{$("Publish failed: network error.")}finally{ye=!1}}r("#admin-export").addEventListener("click",()=>{let a=new Blob([JSON.stringify(U(),null,2)],{type:"application/json"}),o=document.createElement("a");o.href=URL.createObjectURL(a),o.download="match-log.json",o.click(),URL.revokeObjectURL(o.href),$("Log exported.")}),r("#adm-add").addEventListener("click",()=>{let a=r("#adm-a").value.trim(),o=r("#adm-b").value.trim(),v=parseInt(r("#adm-sa").value,10),d=parseInt(r("#adm-sb").value,10);if(!a||!o||a.toLowerCase()===o.toLowerCase()||!Number.isFinite(v)||!Number.isFinite(d)){$("Fill in both players and scores.");return}let b=U();b.unshift({a,b:o,sa:v,sb:d,date:r("#adm-date")?r("#adm-date").value||new Date().toISOString().slice(0,10):new Date().toISOString().slice(0,10)}),Z(b),q(),O(),$(`${a} ${v}\u2013${d} ${o} added \u2014 site recalculated live.`)}),r("#adm-list").addEventListener("click",a=>{let o=a.target.closest("[data-del]");if(!o)return;let v=U();v.splice(parseInt(o.dataset.del,10),1),Z(v),q(),O()}),r("#ov-alias-add").addEventListener("click",()=>{let a=r("#ov-alias-a").value.trim(),o=r("#ov-alias-b").value.trim(),v=(r("#ov-alias-note")||{}).value.trim();if(!a||!o){$("Fill both: the wrong name and the correct player.");return}let d=Object.keys(I).find(c=>c.toLowerCase()===o.toLowerCase())||o,b=C();N({...b,aliases:{...b.aliases||{},[a]:d},aliasNotes:v?{...b.aliasNotes||{},[a]:v}:b.aliasNotes||{},aliasRemoved:(b.aliasRemoved||[]).filter(c=>c!==a)}),q(),O(),$(`Name fix saved \u2014 "${a}" now counts as ${d}.`)}),r("#ov-alias-list").addEventListener("click",a=>{let o=a.target.closest("[data-alias-del]");if(!o)return;let v=o.dataset.aliasDel,d=C(),b={...d.aliases||{}},c={...d.aliasNotes||{}};delete b[v],delete c[v],N({...d,aliases:b,aliasNotes:c,aliasRemoved:[...new Set([...d.aliasRemoved||[],v])]}),q(),O(),$("Name fix removed.")}),r("#ov-inact-toggle").addEventListener("click",()=>{let a=r("#ov-inact-n").value.trim();if(!a){$("Type a player name first.");return}let o=C(),v=P().inactive||[],d=v.includes(a)?v.filter(b=>b!==a):[...v,a];N({...o,inactive:d}),q(),O(),$(d.includes(a)?`${a} marked inactive.`:`${a} marked active again.`)}),r("#ov-inact-list").addEventListener("click",a=>{let o=a.target.closest("[data-inact-del]");if(!o)return;let v=C();N({...v,inactive:(P().inactive||[]).filter(d=>d!==o.dataset.inactDel)}),q(),O()}),r("#ov-seed-add").addEventListener("click",()=>{let a=r("#ov-seed-n").value.trim(),o=r("#ov-seed-v").value.trim(),v=r("#ov-seed-g").value.trim(),d=r("#ov-seed-rd").value.trim();if(!a){$("Pick a player first.");return}if(o===""&&v===""&&d===""){$("Enter an Old 0\u2013100 rating, or a Starting Glicko / RD.");return}let b=C(),c={...b.seeds||{}},f={...b.seedGlicko||{}},k={...b.seedRd||{}};o!==""&&Number.isFinite(Number(o))?c[a]=Number(o):delete c[a],v!==""&&Number.isFinite(Number(v))?f[a]=Number(v):delete f[a],d!==""&&Number.isFinite(Number(d))?k[a]=Number(d):delete k[a],N({...b,seeds:c,seedGlicko:f,seedRd:k,seedRemoved:(b.seedRemoved||[]).filter(h=>h!==a)}),q(),O(),$(`Seed saved for ${a}.`)}),r("#ov-seed-list").addEventListener("click",a=>{let o=a.target.closest("[data-seed-del]");if(!o)return;let v=o.dataset.seedDel,d=C(),b={...d.seeds||{}};delete b[v];let c={...d.seedGlicko||{}};delete c[v];let f={...d.seedRd||{}};delete f[v],N({...d,seeds:b,seedGlicko:c,seedRd:f,seedRemoved:[...new Set([...d.seedRemoved||[],v])]}),q(),O()}),r("#ov-settings").addEventListener("change",a=>{let o=a.target.closest("[data-set-name]");if(!o)return;let v=C();N({...v,settings:{...v.settings||{},[o.dataset.setName]:o.value}}),q(),O(),$("Setting applied \u2014 everything recalculated.")}),r("#ov-set-reset").addEventListener("click",()=>{let a=C();N({...a,settings:{}}),q(),O(),$("Settings back to the master sheet values.")}),r("#ov-mq").addEventListener("input",()=>{r("#ov-mresults").innerHTML=x(r("#ov-mq").value)}),r("#ov-mresults").addEventListener("click",a=>{let o=a.target.closest("[data-msave]"),v=a.target.closest("[data-mdel]");if(o){let d=o.closest("[data-mkey]"),b=d.dataset.mkey,c=k=>d.querySelector(`[data-f="${k}"]`).value,f=C();N({...f,matchEdits:{...f.matchEdits||{},[b]:{sa:+c("sa"),sb:+c("sb"),date:c("date")}}}),q(),r("#ov-mresults").innerHTML=x(r("#ov-mq").value),$("Match fixed \u2014 ratings recalculated.")}else if(v){let d=v.dataset.mdel,b=C();N({...b,matchRemoved:[...new Set([...b.matchRemoved||[],d])]}),q(),r("#ov-mresults").innerHTML=x(r("#ov-mq").value),$("Match deleted \u2014 ratings recalculated.")}}),r("#pl-add").addEventListener("click",()=>{let a=r("#pl-name").value.trim(),o=r("#pl-opp").value.trim(),v=parseInt(r("#pl-sa").value,10),d=parseInt(r("#pl-sb").value,10);if(!a||!o||a.toLowerCase()===o.toLowerCase()||!Number.isFinite(v)||!Number.isFinite(d)){$("A player needs a name, an opponent and both scores \u2014 at least 1 result.");return}if(I[D(a)]){$(`${a} already exists \u2014 log a match for them instead.`);return}let b=U();b.unshift({a,b:o,sa:v,sb:d,date:(r("#pl-date")||{}).value||new Date().toISOString().slice(0,10)}),Z(b);let c=(r("#pl-seed")||{}).value.trim();if(c!==""&&Number.isFinite(Number(c))){let f=C();N({...f,seeds:{...f.seeds||{},[D(a)]:Number(c)},seedRemoved:(f.seedRemoved||[]).filter(k=>k!==D(a))})}q(),O(),$(`${a} added with their first result \u2014 ${v}\u2013${d} vs ${o}.`)}),r("#pl-del-btn").addEventListener("click",()=>{let a=r("#pl-del").value.trim(),o=D(a),v=B().filter(R=>R.a===o||R.b===o);if(!v.length){$(`No player called "${a}" with matches found.`);return}if(!window.confirm(`Remove ${o} and ${v.length} match${v.length===1?"":"es"}? This recalculates every rating.`))return;let d=C(),b=[...d.matchRemoved||[]],c=[];v.forEach(R=>{R.key.startsWith("l:")?c.push(parseInt(R.key.slice(2),10)):b.push(R.key)});let f=U();c.sort((R,W)=>W-R).forEach(R=>f.splice(R,1)),Z(f);let k={...d.seeds||{}},h={...d.seedGlicko||{}},S={...d.seedRd||{}};delete k[o],delete h[o],delete S[o],N({...d,matchRemoved:[...new Set(b)],seeds:k,seedGlicko:h,seedRd:S,seedRemoved:[...new Set([...d.seedRemoved||[],o])],inactive:(P().inactive||[]).filter(R=>R!==o)}),q(),O(),$(`${o} removed with ${v.length} match${v.length===1?"":"es"}. Publish to make it public.`)});let L=()=>{let a=pe();r("#faq-admin-list").innerHTML=a.map((o,v)=>`
      <div class="log-item fix-row" data-faq-idx="${v}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${g(String(o.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${g(String(o.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${v}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${v}" title="Delete question">${u}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};L(),r("#faq-admin-list").addEventListener("click",a=>{let o=a.target.closest("[data-faq-save]"),v=a.target.closest("[data-faq-del]"),d=pe().map(c=>({...c}));if(o){let c=o.closest("[data-faq-idx]");d[parseInt(o.dataset.faqSave,10)]={q:c.querySelector('[data-fq="q"]').value.trim(),a:c.querySelector('[data-fq="a"]').value.trim()}}else if(v)d.splice(parseInt(v.dataset.faqDel,10),1);else return;let b=C();N({...b,faq:d}),L(),$("Q&A updated \u2014 publish to make it public.")}),r("#faq-add").addEventListener("click",()=>{let a=r("#faq-new-q").value.trim(),o=r("#faq-new-a").value.trim();if(!a||!o){$("Fill in both the question and the answer.");return}let v=C();N({...v,faq:[...pe().map(d=>({...d})),{q:a,a:o}]}),L(),$("Question added.")}),r("#faq-reset").addEventListener("click",()=>{let a=C();N({...a,faq:null}),L(),$("Q&A back to the built-in list.")}),window._fbTimer&&(clearInterval(window._fbTimer),window._fbTimer=null);async function E(){let a=r("#fb-inbox");if(!a||document.querySelector("#fb-inbox [data-fb-reply]:focus"))return;let o=ee();if(!o){a.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let v=await fetch(J+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:o})}),d=await v.json().catch(()=>({}));if(!v.ok||!d.ok){a.innerHTML=`<div class="empty">Could not load messages (${g(d.error||"HTTP "+v.status)}).</div>`;return}let b=d.items||[],c={};a.querySelectorAll("[data-fb-id]").forEach(f=>{let k=f.querySelector("[data-fb-reply]");k&&k.value&&(c[f.dataset.fbId]=k.value)}),a.innerHTML=b.map(f=>`
        <div class="log-item fb-row${f.resolved?" fb-done":""}" data-fb-id="${g(f.id)}" data-fb-resolved="${f.resolved?"1":""}">
          <div class="txt">
            <b>${g(f.name||"Anonymous")}</b>${f.contact?` <span style="color:var(--dimmer)">\xB7 ${g(f.contact)}</span>`:""}
            <span class="mono" style="color:var(--dimmer);font-size:11px;margin-left:6px">ticket ${g(f.id)}</span>
            ${f.resolved?'<span class="tag resolved" style="margin-left:6px">resolved \u2713</span>':`<span class="tag ${f.status==="replied"?"live":"fresh"}" style="margin-left:6px">${g(f.status)}</span>`}
            <div style="color:var(--dim);font-size:13px;margin-top:4px">${g(f.message)}</div>
            ${f.reply?`<div style="color:var(--gold);font-size:12.5px;margin-top:4px">\u21A9 ${g(f.reply)}</div>`:""}
          </div>
          <input class="set-val fb-reply-in" data-fb-reply placeholder="Write a reply\u2026" value="${g(f.reply||"")}">
          <button class="icon-btn" data-fb-send title="Send reply"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-resolve title="${f.resolved?"Reopen \u2014 mark as not resolved":"Mark as resolved"}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.6L16 9.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-del title="Delete message">${u}</button>
        </div>`).join("")||'<div class="empty">No messages yet.</div>',a.querySelectorAll("[data-fb-id]").forEach(f=>{let k=f.querySelector("[data-fb-reply]");k&&c[f.dataset.fbId]!=null&&(k.value=c[f.dataset.fbId])})}catch{a.innerHTML='<div class="empty">Network error loading messages.</div>'}}E(),r("#fb-refresh").addEventListener("click",()=>{E(),$("Inbox refreshed.")}),window._fbTimer=setInterval(()=>{if(!r("#fb-inbox")){clearInterval(window._fbTimer),window._fbTimer=null;return}document.hidden||E()},2e3),r("#fb-inbox").addEventListener("click",async a=>{let o=a.target.closest("[data-fb-send]"),v=a.target.closest("[data-fb-del]"),d=a.target.closest("[data-fb-resolve]");if(!o&&!v&&!d)return;let b=a.target.closest("[data-fb-id]"),c=b.dataset.fbId,f=ee();try{if(d){let k=b.dataset.fbResolved!=="1";if(!(await fetch(J+"/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:f,id:c,resolved:k})}).then(S=>S.json())).ok){$("Could not update \u2014 try again.");return}$(k?"Marked as resolved \u2713":"Message reopened."),E()}else if(o){let k=b.querySelector("[data-fb-reply]").value;if(!(await fetch(J+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:f,id:c,reply:k})}).then(S=>S.json())).ok){$("Reply failed.");return}$("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(J+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:f,id:c})}).then(h=>h.json())).ok){$("Delete failed.");return}b.remove(),$("Message deleted.")}}catch{$("Network error.")}})}var oe=document.getElementById("fl-cards");oe&&window.matchMedia("(hover: hover)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(oe.addEventListener("pointermove",e=>{let t=e.target.closest&&e.target.closest(".fl-card");if(!t)return;let s=t.getBoundingClientRect(),l=(e.clientX-s.left)/s.width-.5,i=(e.clientY-s.top)/s.height-.5;t.classList.add("tilt"),t.style.transform=`perspective(1000px) rotateY(${(l*7).toFixed(2)}deg) rotateX(${(-i*6).toFixed(2)}deg) translateY(-6px)`}),oe.addEventListener("pointerleave",()=>{oe.querySelectorAll(".fl-card").forEach(e=>{e.style.transform="",e.classList.remove("tilt")})}));r("#search").addEventListener("input",e=>{let t=e.target.value.trim().toLowerCase(),s=r("#search-drop");if(!t){s.classList.remove("show");return}let l=G.players.filter(i=>i.name.toLowerCase().includes(t)).slice(0,8);if(!l.length){s.classList.remove("show");return}s.innerHTML=l.map(i=>`
    <a class="drop-row" href="#/player/${F(i.name)}">
      ${i.rank?ue(i.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${g(i.name)}</span>        <span class="mono" style="margin-left:auto;color:var(--dim)">${me(i,!0)}</span>
    </a>`).join(""),s.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||r("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(r("#search-drop").classList.remove("show"),r("#search").value="")});var J=he.replace(/\/publish$/,"/feedback"),fe="tt1v1_fb_tickets";function Lt(){try{return JSON.parse(localStorage.getItem(fe)||"[]")}catch{return[]}}function St(e){let t=Lt();t.push({id:e,ts:Date.now()});try{localStorage.setItem(fe,JSON.stringify(t.slice(-20)))}catch{}}function Mt(){let e=r("#fb-overlay"),t=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>r("#fb-msg").focus(),180)},s=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};r("#fab-feedback").addEventListener("click",t),r("#fb-close").addEventListener("click",s),r("#fb-done").addEventListener("click",s),e.addEventListener("click",n=>{n.target===e&&s()}),document.addEventListener("keydown",n=>{n.key==="Escape"&&e.classList.contains("show")&&s()});let l=r("#faq-feedback-btn");l&&l.addEventListener("click",t);let i=r("#fb-msg"),u=r("#fb-count-n");i.addEventListener("input",()=>{u.textContent=String(i.value.length);try{localStorage.setItem("tt1v1_fb_draft",i.value)}catch{}});try{let n=localStorage.getItem("tt1v1_fb_draft");n&&(i.value=n,u.textContent=String(n.length))}catch{}let m=r("#fb-send");m.addEventListener("click",async()=>{let n=i.value.trim();if(n.length<5){i.focus(),i.classList.add("fb-nudge"),setTimeout(()=>i.classList.remove("fb-nudge"),500),$("Write a message first \u2014 a few words is plenty.");return}m.classList.add("busy"),m.disabled=!0;try{let y=await fetch(J,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:r("#fb-name").value.trim(),contact:r("#fb-contact").value.trim(),message:n})}),x=await y.json().catch(()=>({}));if(!y.ok||!x.ok){$("Could not send: "+(x.error||"HTTP "+y.status)+" \u2014 try again later.");return}St(x.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}r("#fb-ticket-code").textContent=x.id,r("#fb-view-form").hidden=!0,r("#fb-view-done").hidden=!1}catch{$("Network error \u2014 your message was not sent.")}finally{m.classList.remove("busy"),m.disabled=!1}});let p=document.querySelector(".fb-ticket");p&&p.addEventListener("click",async()=>{let n=(r("#fb-ticket-code").textContent||"").trim();if(!n||n==="\u2014")return;try{await navigator.clipboard.writeText(n)}catch{let w=document.createElement("textarea");w.value=n,document.body.appendChild(w),w.select();try{document.execCommand("copy")}catch{}w.remove()}let y=r("#fb-copied");y&&(y.classList.add("show"),clearTimeout(window._fbCopiedT),window._fbCopiedT=setTimeout(()=>y.classList.remove("show"),1800)),$("Ticket code copied to clipboard.")}),r("#fb-check").addEventListener("click",async()=>{let n=r("#fb-ticket-in").value.trim(),y=r("#fb-reply-out");if(n){y.classList.add("show"),y.textContent="Checking\u2026";try{let x=await fetch(J+"/status?id="+encodeURIComponent(n)),w=await x.json().catch(()=>({}));if(!x.ok||!w.ok){y.textContent="No message found with that ticket code.";return}y.innerHTML=w.resolved?`Status: <b>resolved \u2713</b> \u2014 your message has been handled. Thanks for reaching out!${w.reply?`<br><b>Reply from the team:</b> ${g(w.reply)}`:""}`:w.reply?`<b>Reply from the team:</b> ${g(w.reply)}`:`Status: <b>${g(w.status)}</b> \u2014 your message is being reviewed, check back soon.`}catch{y.textContent="Network error \u2014 try again later."}}})}function Et(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let t=null,s=()=>{e.classList.remove("show"),t=null};document.addEventListener("mouseover",l=>{let i=l.target.closest&&l.target.closest("[title],[data-tip]");if(!i)return;i.hasAttribute("title")&&(i.setAttribute("data-tip",i.getAttribute("title")),i.removeAttribute("title"));let u=i.getAttribute("data-tip");if(!u)return;t=i,e.textContent=u;let m=i.getBoundingClientRect(),p=m.top<52;e.classList.toggle("below",p),e.style.left=Math.max(10,Math.min(window.innerWidth-10,m.left+m.width/2))+"px",e.style.top=(p?m.bottom+8:m.top-8)+"px",e.classList.add("show")}),document.addEventListener("mouseout",l=>{if(!t)return;let i=l.relatedTarget;i&&i.closest&&i.closest("[title],[data-tip]")===t||s()}),window.addEventListener("scroll",s,{passive:!0})}var Oe;function $(e){let t=r("#toast");t.textContent=e,t.classList.add("show"),clearTimeout(Oe),Oe=setTimeout(()=>t.classList.remove("show"),2600)}var K;function ge(){K&&K.disconnect(),K=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add("in"),T(".cu",t.target).forEach(s=>xe(s,parseFloat(s.dataset.target),{dec:parseInt(s.dataset.dec||0)})),K.unobserve(t.target))})},{threshold:.12}),T(".reveal").forEach(e=>K.observe(e))}(function(){let t=r("#scroll-progress"),s=r("#to-top"),l=r("#page-home .hero-row"),i=document.querySelector(".topbar"),u=()=>{let m=window.scrollY,p=document.documentElement.scrollHeight-window.innerHeight;t&&(t.style.width=(p>0?m/p*100:0)+"%"),s&&s.classList.toggle("show",m>640),i&&i.classList.toggle("scrolled",m>10),l&&m<1400&&(l.style.transform=`translateY(${m*.14}px)`,l.style.opacity=String(Math.max(.3,1-m/950)))};window.addEventListener("scroll",u,{passive:!0}),s&&s.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),u()})();q();Te();Re();Mt();Et();function le(e,t){let s=e.indexOf("window."+t);if(s<0)return null;let l=e.indexOf("=",s);for(;l<e.length&&"{[".indexOf(e[l])<0;)l++;let i=0,u=!1,m="",p=!1;for(let n=l;n<e.length;n++){let y=e[n];if(u){p?p=!1:y==="\\"?p=!0:y===m&&(u=!1);continue}if(y==='"'||y==="'"){u=!0,m=y;continue}if(y==="{"||y==="[")i++;else if((y==="}"||y==="]")&&(i--,i<=0))return JSON.parse(e.slice(l,n+1))}return null}async function He(e){try{let t="cb="+Date.now(),[s,l]=await Promise.all([fetch("data.js?"+t,{cache:"no-store"}),fetch("log.js?"+t,{cache:"no-store"})]);if(!s.ok||!l.ok)throw new Error("HTTP "+s.status+"/"+l.status);let i=await s.text(),u=await l.text(),m=le(i,"LB_DATA"),p=le(u,"LB_PUB")||(le(u,"LB_LOG")?{matches:le(u,"LB_LOG")}:null),n=[];if(m&&JSON.stringify(m)!==JSON.stringify(_)&&(_=m,window.LB_DATA=m,n.push("data")),p&&JSON.stringify(p)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=p,window.LB_LOG=p.matches||[],n.push("log")),n.length){q(),Te(),Re();let y=r("#last-updated");y&&(y.textContent="Last updated "+(_.generated||"today"))}e&&$(n.length?"Refreshed \u2014 you have the latest data.":"Already up to date \u2713")}catch{e&&$("Refresh failed \u2014 check your connection.")}}He(!1);var re=r("#lb-refresh-btn");re&&re.addEventListener("click",async()=>{re.classList.add("spinning"),await He(!0),setTimeout(()=>re.classList.remove("spinning"),400)});var Ge="tt1v1_fb_seen",H=null;function Rt(){try{return JSON.parse(localStorage.getItem(fe)||"[]")}catch{return[]}}function We(){try{return JSON.parse(localStorage.getItem(Ge)||"{}")||{}}catch{return{}}}function Tt(){let e=r("#fab-feedback");if(e&&!e.querySelector(".fb-dot")){let s=document.createElement("span");s.className="fb-dot",e.appendChild(s),requestAnimationFrame(()=>s.classList.add("in"))}let t=r("#fb-view-form");if(t&&!r("#fb-reply-banner")&&H){let s=document.createElement("div");s.id="fb-reply-banner",s.innerHTML=`<b>The team replied</b> to your message (ticket ${g(H.id)})
      <div class="r">${g(H.reply)}</div>
      <button class="btn btn-ghost" id="fb-got-it" style="margin-top:9px;padding:6px 13px">\u2713 Got it</button>`,t.insertAdjacentElement("beforebegin",s),requestAnimationFrame(()=>s.classList.add("show")),r("#fb-got-it").addEventListener("click",qt)}}function qt(){if(H){let s=We();s[H.id]=1;try{localStorage.setItem(Ge,JSON.stringify(s))}catch{}H=null}let e=r(".fb-dot");e&&(e.classList.add("out"),setTimeout(()=>e.remove(),420));let t=r("#fb-reply-banner");t&&(t.classList.remove("show"),setTimeout(()=>t.remove(),420))}async function Ue(){let e=We();H=null;let t=Rt(),s=t.slice(0,Math.max(0,t.length-6)),l=[];for(let i of t.slice(-6))try{let u=await fetch(J+"/status?id="+encodeURIComponent(i.id),{cache:"no-store"}),m=await u.json().catch(()=>({}));if(u.status===404||u.ok&&m.ok===!1)continue;l.push(i),u.ok&&m.ok&&m.reply&&!e[i.id]&&!H&&(H={id:i.id,reply:m.reply})}catch{l.push(i)}if(l.length!==t.slice(-6).length)try{localStorage.setItem(fe,JSON.stringify([...s,...l]))}catch{}H&&Tt()}setTimeout(Ue,3500);setInterval(Ue,9e4);})();
