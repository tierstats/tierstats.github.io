/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var _=window.LB_DATA,de="https://tierstats-publish.tierstats.workers.dev/publish",l=(e,t=document)=>t.querySelector(e),E=(e,t=document)=>[...t.querySelectorAll(e)],u=e=>String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),fe=e=>encodeURIComponent(String(e)),Be=e=>decodeURIComponent(e);function ge(e,t,a={}){let o=a.dur||1200,r=a.dec||0,m=performance.now(),f=parseFloat(e.textContent)||0;function d(h){let b=Math.min(1,(h-m)/o),L=1-Math.pow(1-b,3);e.textContent=(f+(t-f)*L).toFixed(r),b<1&&requestAnimationFrame(d)}requestAnimationFrame(d),setTimeout(()=>{e.textContent=t.toFixed(r)},o+300)}var Fe='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',He='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function ce(e,t=""){let a=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",o=e<=3?e===1?Fe:He:"";return`<div class="rank-badge ${a} ${t}" title="Rank #${e}">${o}<span class="num">${e}</span></div>`}var H={},I=[],F={players:[],byName:{},qualified:[]},V={},ie={},ne={},me=new Set;function Ge(){for(let a in V)delete V[a];let e=new Set(j().aliasRemoved||[]);Object.entries(_.aliases).forEach(([a,o])=>{e.has(a)||(V[a.toLowerCase()]=o)}),Object.entries(j().aliases||{}).forEach(([a,o])=>{V[String(a).toLowerCase()]=o});for(let a of Object.keys(ie))delete ie[a];for(let a of Object.keys(ne))delete ne[a];me.clear();let t=(a,o)=>{Object.keys(a||{}).forEach(r=>{let m=P(r);m!==r&&(o[m]=a[r])}),Object.keys(a||{}).forEach(r=>{let m=P(r);m===r&&(o[m]=a[r])})};t(_.seeds,ie),t(_.prevRatings,ne),(_.inactiveList||[]).forEach(a=>me.add(P(a)))}var P=e=>{let t=String(e).trim(),a=new Set;for(;;){let o=V[t.toLowerCase()];if(!o||o===t||a.has(t))return t;a.add(t),t=o}};function be(e){let t=[];return D().forEach(a=>{let o=(r,m,f)=>({opp:r,for_:m,against:f,res:m>f?"W":m<f?"L":"D",date:a.date});a.a===e?t.push(o(a.b,a.sa,a.sb)):a.b===e&&t.push(o(a.a,a.sb,a.sa))}),t}function Ue(e){let t={};return be(e).forEach(a=>{let o=t[a.opp]||(t[a.opp]={w:0,l:0,d:0,pf:0,pa:0});o[a.res.toLowerCase()]+=1,o.pf+=a.for_,o.pa+=a.against}),Object.entries(t).map(([a,o])=>({opp:a,...o})).sort((a,o)=>o.w+o.l+o.d-(a.w+a.l+a.d)||o.w-a.w)}function We(e){let t=H[e]||{};return t.provisional?'<span class="tag prov">provisional</span>':t.inactive?'<span class="tag inact">inactive</span>':""}function Je(e){let t=be(e).slice(0,5).reverse();if(!t.length)return"";let a=t.map(o=>o.res).join(" ");return`<span class="form" title="Last ${t.length} results (oldest \u2192 newest): ${a}">${t.map(o=>`<i class="${o.res.toLowerCase()}">${o.res}</i>`).join("")}</span>`}function ye(e){let t=e.delta!=null?e.delta:0;if(Math.abs(t)<.05)return"";let a=t>0;return`<span class="delta ${a?"up":"down"}" title="${a?"up":"down"} ${Math.abs(t).toFixed(1)} since the previous sheet update">${a?"\u25B2":"\u25BC"} ${Math.abs(t).toFixed(1)}</span>`}function we(e){return`${Math.round(e.rating-100)} \u2013 ${Math.round(e.rating+100)}`}function Re(e,t){return e.provisional?`<span class="prov-range" title="Provisional \u2014 estimated range (\xB1100). The exact rating is unreliable over few matches.">${t?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:we(e)}</span>`:e.rating.toFixed(1)}var qe="tt1v1_admin_log_v1",J="tt1v1_admin_ok",W="tt1v1_admin_pw",ze=()=>sessionStorage.getItem(J)==="1"||localStorage.getItem(J)==="1",Z=()=>sessionStorage.getItem(W)||localStorage.getItem(W)||"";function Ye(e,t){t?(localStorage.setItem(J,"1"),localStorage.setItem(W,e)):(sessionStorage.setItem(J,"1"),sessionStorage.setItem(W,e),localStorage.removeItem(J),localStorage.removeItem(W))}function Qe(){[sessionStorage,localStorage].forEach(e=>{e.removeItem(J),e.removeItem(W)})}var Se=null,he=!1;function Te(){he||!Z()||(clearTimeout(Se),Se=setTimeout(()=>publishLog({silent:!0}),1500))}var Ve=de.replace(/\/publish$/,"/verify"),Ze=de.replace(/\/publish$/,"/sync");function G(){try{return JSON.parse(localStorage.getItem(qe)||"[]")}catch{return[]}}function Y(e){try{localStorage.setItem(qe,JSON.stringify(e))}catch{}Te()}var Ne="tt1v1_admin_over_v1";function N(){try{return JSON.parse(localStorage.getItem(Ne)||"{}")||{}}catch{return{}}}function T(e){try{localStorage.setItem(Ne,JSON.stringify(e))}catch{}Te()}function j(){let e=window.LB_PUB||{},t=N(),a=new Set([...e.aliasRemoved||[],...t.aliasRemoved||[]]),o=new Set([...e.seedRemoved||[],...t.seedRemoved||[]]),r=t.aliases||{},m={...t.seeds||{},...t.seedGlicko||{},...t.seedRd||{}},f=M=>Object.fromEntries(Object.entries(M||{}).filter(([s])=>!a.has(s)||r[s]!=null)),d=M=>Object.fromEntries(Object.entries(M||{}).filter(([s])=>!o.has(s)||m[s]!=null)),h=f({...e.aliases||{},...t.aliases||{}}),b=f({...e.aliasNotes||{},...t.aliasNotes||{}}),L=d({...e.seeds||{},...t.seeds||{}}),y=d({...e.seedGlicko||{},...t.seedGlicko||{}}),x=d({...e.seedRd||{},...t.seedRd||{}});return{aliases:h,aliasNotes:b,seeds:L,seedGlicko:y,seedRd:x,aliasRemoved:[...a].filter(M=>h[M]==null),seedRemoved:[...o].filter(M=>L[M]==null&&y[M]==null&&x[M]==null),settings:{...e.settings||{},...t.settings||{}},matchEdits:{...e.matchEdits||{},...t.matchEdits||{}},inactive:t.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...t.matchRemoved||[]])],faq:t.faq!=null?t.faq:e.faq!=null?e.faq:null}}function Ce(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function D(){let e=j(),t=e.matchEdits||{},a=new Set(e.matchRemoved||[]),o=(y,x)=>{if(a.has(x))return null;let M=t[x],s=M?{...y,sa:M.sa,sb:M.sb,date:M.date!=null?M.date:y.date}:y;return{...s,a:P(s.a),b:P(s.b),sa:+s.sa,sb:+s.sb,key:x}},r=G().map((y,x)=>o({...y,admin:!0,published:!1},"l:"+x)).filter(Boolean),m=Ce().map((y,x)=>o({...y,admin:!0,published:!0},"p:"+x)).filter(Boolean),f=_.matches.map((y,x)=>o({...y,admin:!1,published:!1},"a:"+x)).filter(Boolean).reverse(),d=y=>{let x=y.a>y.b;return[x?y.b:y.a,x?y.a:y.b,x?y.sb:y.sa,x?y.sa:y.sb,y.date||""].join("|")},h={};f.forEach(y=>{let x=d(y);h[x]=(h[x]||0)+1});let b={};return r.concat(m).filter(y=>{let x=d(y);return b[x]=(b[x]||0)+1,b[x]>(h[x]||0)}).concat(f)}var S={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},oe=864e5,X=Math.log(10)/400,Oe=e=>1/Math.sqrt(1+3*X*X*e*e/(Math.PI*Math.PI)),Ke=(e,t,a)=>1/(1+Math.pow(10,-Oe(a)*(e-t)/400));function Xe(e){let t=j().seeds||{};return t[e]!=null&&t[e]!==""?Number(t[e]):ie[e]}function et(e){let t=(j().seedGlicko||{})[e],a=(j().seedRd||{})[e],o=t!=null&&t!==""?Number(t):null,r=a!=null&&a!==""?Number(a):null;if(o!=null||r!=null)return[o??S.unratedR,r??S.unratedRd];let m=Xe(e);return m!=null?[Math.max(S.seedMid+(m-S.oldMid)*S.ptsPer,S.minSeed),S.knownRd]:[S.unratedR,S.unratedRd]}function Me(e,t,a){let o=0,r=0;for(let[f,d,h]of a){let b=Oe(d),L=Ke(e,f,d);o+=b*b*L*(1-L),r+=b*(h-L)}if(o*=X*X,o<=0)return[e,t];let m=1/(t*t)+o;return[e+X/m*r,Math.sqrt(1/m)]}function tt(e,t){let a=Math.pow(10,t),o=e*a,r=Math.floor(o);return Math.abs(o-r-.5)<1e-6?(r%2===0?r:r+1)/a:Math.round(o)/a}var ke=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(S.periodDays*oe)),K=ke(S.graceStart),st={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function $e(){let e=j().settings||{};return(_.settings||[]).map(t=>({...t,value:Object.prototype.hasOwnProperty.call(e,t.name)?e[t.name]:t.value}))}function at(){for(let e of $e()){let t=st[e.name];if(!t)continue;if(t==="graceStart"){let o=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(o)&&(S.graceStart=o);continue}let a=Number(e.value);Number.isFinite(a)&&(S[t]=a)}K=ke(S.graceStart),E(".cons-val").forEach(e=>{e.textContent=String(S.conservative)}),E(".min-matches-val").forEach(e=>{e.textContent=String(S.minMatches)}),E(".min-opp-val").forEach(e=>{e.textContent=String(S.minOpp)})}function it(){at(),Ge();let e={},t=s=>{if(!e[s]){let[i,v]=et(s);e[s]={name:s,r:i,rd:v,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[s]},a=(s,i,v,n,g,c)=>{let p=t(s);p.games++,p.opps.add(i),v>n?p.w++:v<n?p.l++:p.d++,p.lastIdx=c,g&&(p.lastDate=g)},o={};for(let s of D()){if(s.date)continue;let i=s.a,v=s.b,n=s.sa>s.sb?1:s.sa<s.sb?0:.5;(o[i]=o[i]||[]).push([v,n]),(o[v]=o[v]||[]).push([i,1-n]),a(i,v,s.sa,s.sb,"",K),a(v,i,s.sb,s.sa,"",K)}let r={};for(let s in o)r[s]=[t(s).r,t(s).rd];for(let s in o){let[i,v]=Me(r[s][0],r[s][1],o[s].map(([n,g])=>[r[n][0],r[n][1],g]));t(s).r=i,t(s).rd=v}let m=new Map;for(let s of D().filter(i=>i.date).slice().reverse()){let i=s.date,v=ke(i);m.has(v)||m.set(v,[]),m.get(v).push({a:P(s.a),b:P(s.b),sa:+s.sa,sb:+s.sb,date:i})}for(let s of[...m.keys()].sort((i,v)=>i-v)){for(let n in e){let g=e[n],c=s-(g.lastIdx==null?K:g.lastIdx);c>0&&(g.rd=Math.min(Math.sqrt(g.rd*g.rd+S.growth*S.growth*c),S.maxRd))}let i={};for(let n of m.get(s)){let g=n.sa>n.sb?1:n.sa<n.sb?0:.5;(i[n.a]=i[n.a]||[]).push([n.b,g]),(i[n.b]=i[n.b]||[]).push([n.a,1-g]),a(n.a,n.b,n.sa,n.sb,n.date,s),a(n.b,n.a,n.sb,n.sa,n.date,s)}let v={};for(let n in i)v[n]=[t(n).r,t(n).rd];for(let n in i){let[g,c]=Me(v[n][0],v[n][1],i[n].map(([p,$])=>[v[p][0],v[p][1],$]));t(n).r=g,t(n).rd=c}}let f=Object.values(e).map(s=>({name:s.name,glicko:s.r,rd:s.rd,rating:s.r-S.conservative*s.rd,matches:s.games,w:s.w,l:s.l,d:s.d,winPct:s.games?tt(s.w/s.games*100,1):0,opponents:s.opps.size,avgOpp:0,lastMatch:s.lastDate||"",provisional:!(s.games>=S.minMatches&&s.opps.size>=S.minOpp),inactive:!1})),d={};f.forEach(s=>{d[s.name]=s.glicko}),f.forEach(s=>{let i=0;e[s.name].opps.forEach(v=>{i+=d[v]!=null?d[v]:S.unratedR}),s.avgOpp=e[s.name].opps.size?i/e[s.name].opps.size:0});let h=Date.now(),b=Math.floor(h/(S.periodDays*oe));for(let s in e){let i=e[s],v=b-(i.lastIdx==null?K:i.lastIdx);v>0&&(i.rd=Math.min(Math.sqrt(i.rd*i.rd+S.growth*S.growth*v),S.maxRd))}f.forEach(s=>{s.glicko=e[s.name].r,s.rd=e[s.name].rd,s.rating=s.glicko-S.conservative*s.rd;let i=ne[s.name];s.delta=i!=null?s.rating-i:0});let L=Date.parse(S.graceStart+"T00:00:00Z")+S.graceDays*oe,y=new Set([...me,...j().inactive||[]]);f.forEach(s=>{s.inactive=y.has(s.name)||(s.lastMatch?h-Date.parse(s.lastMatch+"T00:00:00Z")>S.inactiveDays*oe:h>L)});let x=f.filter(s=>!s.provisional&&!s.inactive).sort((s,i)=>i.rating-s.rating);x.forEach((s,i)=>{s.rank=i+1}),f.sort((s,i)=>i.rating-s.rating);let M={};return f.forEach(s=>{M[s.name]=s}),{players:f,byName:M,qualified:x}}function q(){F=it(),H=F.byName,I=F.qualified}var nt=["page-home","page-player","page-matches","page-roster","page-analytics","page-method","page-faq","page-admin"];function xe(){let e=location.hash||"#/";nt.forEach(r=>l("#"+r).classList.remove("active"));let t="#/"+(e.split("/")[1]||"");E(".nav a").forEach(r=>{let m=r.getAttribute("href");r.classList.toggle("active",m===t||e==="#/"&&m==="#/")});let a=l("#nav-glide"),o=document.querySelector(".nav a.active");a&&o?(a.style.width=o.offsetWidth+"px",a.style.transform=`translateX(${o.offsetLeft}px)`,a.style.opacity="1"):a&&(a.style.opacity="0"),e.startsWith("#/player/")?(lt(Be(e.slice(9))),l("#page-player").classList.add("active"),window.scrollTo({top:0,behavior:"instant"in window?"instant":"auto"})):e==="#/matches"?(rt(),l("#page-matches").classList.add("active"),window.scrollTo(0,0)):e==="#/roster"?(dt(),l("#page-roster").classList.add("active"),window.scrollTo(0,0)):e==="#/analytics"?(ct(),l("#page-analytics").classList.add("active"),window.scrollTo(0,0)):e==="#/method"?(vt(),l("#page-method").classList.add("active"),window.scrollTo(0,0)):e==="#/faq"?(mt(),l("#page-faq").classList.add("active"),window.scrollTo(0,0)):e==="#/admin"?(C(),l("#page-admin").classList.add("active"),window.scrollTo(0,0)):(Le(),l("#page-home").classList.add("active"),requestAnimationFrame(ot)),pe()}window.addEventListener("hashchange",xe);function Le(){z="all",A={key:"rank",dir:1},E(".chip[data-filter]").forEach(d=>d.classList.toggle("on",d.dataset.filter==="all")),E(".sortable").forEach(d=>d.classList.remove("sorted","asc"));let e=l('.sortable[data-key="rank"]');e&&e.classList.add("sorted");let t=D().length,a=F.players.length,o=I[0],r=Math.round(I.reduce((d,h)=>d+h.rd,0)/I.length);l("#hero-matches").textContent=t,l("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">Ranked players</div>
      <div class="v"><span class="cu" data-target="${I.length}">0</span><small>/ ${a} total</small></div></div>
    <div class="stat-card"><div class="k">Matches logged</div>
      <div class="v"><span class="cu" data-target="${t}">0</span></div></div>
    <div class="stat-card"><div class="k">Highest rating</div>
      <div class="v"><span class="cu" data-target="${o.rating}" data-dec="1">0</span><small>${u(o.name)}</small></div></div>
    <div class="stat-card"><div class="k">Avg certainty (RD)</div>
      <div class="v"><span class="cu" data-target="${r}" data-dec="1">0</span><small>certainty score</small></div></div>`;let m=[I[1],I[0],I[2]].filter(Boolean);l("#fl-cards").innerHTML=m.map(d=>`
    <div class="fl-card r${d.rank}${d.rank===1?" champ":""} reveal" data-goto="${u(d.name)}">
      <div class="fl-top">
        ${ce(d.rank)}
        <div class="rd">RD ${d.rd.toFixed(0)}</div>
      </div>
      ${d.rank===1?'<div class="champ-tag">#1 Tank</div>':""}
      <div class="nm">${u(d.name)}</div>
      <div class="rating">
        <span class="unit">Rating</span>
        <div class="big-row"><span class="big">${Math.round(d.rating)}</span>${ye(d)}</div>
      </div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${d.winPct>=60?"":d.winPct>=40?"mid":"low"}" data-w="${d.winPct}"></div></div>
      </div>
      <div class="meta">
        <span><span class="w">${d.w}W</span> <span class="l">${d.l}L</span> ${d.d}D</span>
        <span class="wc">${d.winPct}%</span>
        <span class="opp">avg opp ${Math.round(d.avgOpp)}</span>
      </div>
    </div>`).join(""),requestAnimationFrame(()=>{E("#fl-cards .bar-fill").forEach(d=>{d.style.width=d.dataset.w+"%"})}),ee(),Ae();let f=l("#last-updated");f&&(f.textContent="Last updated "+(_.generated||"today"))}function Ae(){let e=D().filter(t=>t.date).slice(0,10);l("#battles-grid").innerHTML=e.length?e.map(t=>{let a=t.sa>t.sb,o=t.sb>t.sa;return`
    <div class="battle-row reveal" data-goto="${u(a?t.a:t.b)}">
      <div class="who ${a?"win":"lose"}" data-goto="${u(t.a)}">${u(t.a)}</div>
      <div class="vs">vs</div>
      <div class="who r ${o?"win":"lose"}" data-goto="${u(t.b)}">${u(t.b)}</div>
      <div class="sc mono"><span class="${a?"win":"lose"}">${t.sa}</span> \u2013 <span class="${o?"win":"lose"}">${t.sb}</span></div>
      <div class="dt">${t.date||(t.admin&&!t.published?"just now":"historical")}</div>
    </div>`}).join(""):'<div class="empty" style="padding:26px;text-align:center;color:var(--dim);grid-column:1/-1">No dated matches yet \u2014 new verified results will appear here as they are logged.</div>'}function ee(e="all",t="rank",a=1){let o=l("#lb-body"),m=(e==="all"&&le?I:F.players).slice().map(d=>({...d,rank:d.rank!=null?d.rank:9999}));ue&&(m=m.filter(d=>d.name.toLowerCase().includes(ue))),e==="provisional"?m=m.filter(d=>(H[d.name]||{}).provisional):e==="inactive"?m=m.filter(d=>(H[d.name]||{}).inactive):e==="veterans"?m=m.filter(d=>d.matches>=15):e==="rising"&&(m=m.filter(d=>d.winPct>=60&&d.matches>=5)),m.sort((d,h)=>{let b=d[t],L=h[t];return(typeof b=="string"?b.localeCompare(L):b-L)*a});let f=new Map;E(".lb-row",o).forEach(d=>f.set(d.dataset.name,d.getBoundingClientRect().top)),o.innerHTML=m.map(d=>`
    <div class="lb-row ${d.rank<=3?"top"+d.rank:""}" data-name="${u(d.name)}" data-goto="${u(d.name)}">
      <div class="rank">${d.rank<=I.length?ce(d.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="pname">${u(d.name)}</div></div>
      <div class="rating-cell mono">${Re(d,!0)}${ye(d)}</div>
      <div class="num-cell mono col-hide">${d.rd.toFixed(1)}</div>
      <div class="num-cell mono col-hide">${d.matches}</div>
      <div class="num-cell mono col-hide"><span class="w">${d.w}</span></div>
      <div class="num-cell mono col-hide"><span class="l">${d.l}</span></div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${d.winPct>=60?"":d.winPct>=40?"mid":"low"}" data-w="${d.winPct}"></div></div>
        <div class="pct mono">${d.winPct}%</div>
      </div>
      <div class="num-cell mono col-hide">${d.opponents}</div>
      <div class="num-cell mono col-hide">${d.avgOpp.toFixed(0)}</div>
      <div class="col-status">${We(d.name)||Je(d.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?"Nobody is inactive right now \u2014 a player goes inactive 365 days after their last match (or when flagged in the master sheet).":e==="provisional"?"No provisional players right now.":"No players match this filter."}</div>`,requestAnimationFrame(()=>{E(".lb-row",o).forEach(d=>{let h=f.get(d.dataset.name),b=d.getBoundingClientRect().top;h!==void 0&&Math.abs(h-b)>1&&(d.style.transform=`translateY(${h-b}px)`,d.style.transition="none",requestAnimationFrame(()=>{d.style.transition="transform .5s cubic-bezier(.22,.8,.24,1)",d.style.transform=""}))}),E(".bar-fill",o).forEach(d=>{d.style.width=d.dataset.w+"%"})})}var z="all",A={key:"rank",dir:1},ue="",le=!0;function ot(){E("#stat-strip .cu").forEach(e=>ge(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),E(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}l("#lb-qual").addEventListener("click",()=>{le=!le,l("#lb-qual").classList.toggle("on",le),ee(z,A.key,A.dir)});l("#lb-filter").addEventListener("input",e=>{ue=e.target.value.trim().toLowerCase(),ee(z,A.key,A.dir)});document.addEventListener("click",e=>{let t=e.target.closest(".chip");if(t&&t.dataset.filter){E(".chip[data-filter]").forEach(r=>r.classList.remove("on")),t.classList.add("on"),z=t.dataset.filter,ee(z,A.key,A.dir);return}let a=e.target.closest(".sortable");if(a){let r=a.dataset.key;A.dir=A.key===r?-A.dir:1,A.key=r,E(".sortable").forEach(m=>m.classList.remove("sorted","asc")),a.classList.add("sorted"),A.dir===1&&a.classList.add("asc"),ee(z,A.key,A.dir);return}let o=e.target.closest("[data-goto]");o&&(e.stopPropagation(),location.hash="#/player/"+fe(o.dataset.goto))});function lt(e){let t=H[e],a=l("#page-player");if(!t){a.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">
      No player called "<b>${u(e)}</b>" found. <a href="#/" style="color:var(--gold)">Back to the leaderboard</a>.
    </div></div></div>`;return}let o=I.find(h=>h.name===e),r=be(e),m=r.slice(0,10),f=Ue(e),d=Math.max(3,Math.min(100,100-t.rd/120*100));a.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">\u2190 All rankings</a>
    <div class="player-hero anim">
      <div class="player-top">
        ${o?ce(o.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${u(t.name)}</div>
          <div class="player-rankline">
            ${o?`Ranked <b>#${o.rank}</b> of ${I.length} qualified players`:"Unranked \u2014 not enough recent games for the board"}
            ${t.provisional?' \xB7 <span class="tag prov">provisional</span>':""}
            ${t.inactive?' \xB7 <span class="tag inact">inactive</span>':""}
          </div>
        </div>
        <div class="player-rating-block">
          <div class="lbl">${t.provisional?"Estimated range":"Visible rating"}</div>
          <div class="big mono${t.provisional?" prov-range":""}" id="pv-rating">${t.provisional?we(t):"0"}</div>
          ${ye(t)}
          <div class="rd-bar">
            <div class="bar-track"><div class="bar-fill" style="width:${d}%"></div></div>
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
      <h3>Recent form <span class="n">\u2014 last ${Math.min(10,r.length)}</span></h3>
      <div class="form-strip">
        ${m.map((h,b)=>`<div class="form-pill ${h.res}" style="animation-delay:${b*55}ms"
           title="vs ${u(h.opp)} ${h.for_}-${h.against}">${h.res}</div>`).join("")||'<span class="empty">No games yet</span>'}
      </div>
    </div>

    <div class="panel reveal">
      <h3>Match history <span class="n">\u2014 ${r.length} games</span></h3>
      <div class="match-list">
        ${r.map(h=>`
          <div class="match-row">
            <div class="res-chip ${h.res}">${h.res}</div>
            <div class="who">${u(t.name)}</div>
            <div class="score mono">${h.for_} \u2013 ${h.against}</div>
            <div class="who opp"><a href="#/player/${fe(h.opp)}" style="color:var(--blue)">${u(h.opp)}</a></div>
            <div class="date mono">${h.date||"historical"}</div>
          </div>`).join("")||'<div class="empty">No games recorded</div>'}
      </div>
    </div>

    <div class="panel reveal">
      <h3>Head to head <span class="n">\u2014 ${f.length} opponents</span></h3>
      <div class="h2h-grid">
        ${f.map(h=>`
          <div class="h2h-card" data-goto="${u(h.opp)}">
            <div class="opp">${u(h.opp)}</div>
            <div class="rec mono"><span class="w">${h.w}W</span> \xB7 <span class="l">${h.l}L</span> \xB7 <span>${h.d}D</span> \xB7 ${h.pf}-${h.pa} pts</div>
          </div>`).join("")||'<div class="empty">No games recorded</div>'}
      </div>
    </div>
  </div>`,t.provisional||ge(l("#pv-rating"),t.rating,{dec:1,dur:900}),pe()}function rt(){Ae();let e=l("#gm-body"),t=D();l("#gm-count").textContent=`\u2014 ${t.length} games`,e.innerHTML=t.map(a=>{let o=a.sa>a.sb,r=a.sb>a.sa;return`
    <div class="gm-row">
      <div class="side ${o?"winner":"loser"}">
        <div class="dot ${o?"w":"l"}"></div>
        <div class="nm" data-goto="${u(a.a)}">${u(a.a)}</div>
      </div>
      <div class="sc mono" style="color:${o?"var(--green)":"var(--red)"}">${a.sa}</div>
      <div class="dash mono">\u2013</div>
      <div class="sc mono" style="color:${r?"var(--green)":"var(--red)"}">${a.sb}</div>
      <div class="side right ${r?"winner":"loser"}">
        <div class="dot ${r?"w":"l"}"></div>
        <div class="nm" data-goto="${u(a.b)}">${u(a.b)}</div>
      </div>
      <div class="dt mono">${a.admin&&!a.published?'<span class="tag fresh">new</span>':a.date||"historical"}</div>
    </div>`}).join("")}function dt(){let e=F.players.filter(t=>t.provisional).sort((t,a)=>a.rating-t.rating);l("#roster-grid").innerHTML=e.map(t=>{let a=Math.min(100,Math.round(Math.min(1,t.matches/5)*50+Math.min(1,t.opponents/3)*50));return`
    <div class="roster-card reveal" data-goto="${u(t.name)}">
      <div class="top">
        <div class="nm">${u(t.name)}</div>
        <svg class="shield" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"/></svg>
      </div>
      <div class="rating"><span class="unit">Est. range</span><span class="big prov-range">${we(t)}</span></div>
      <div class="req-row"><span>Matches</span><span class="${t.matches>=5?"ok":""}">${t.matches} / 5 ${t.matches>=5?"\u2713":""}</span></div>
      <div class="req-row"><span>Opponents</span><span class="${t.opponents>=3?"ok":""}">${t.opponents} / 3 ${t.opponents>=3?"\u2713":""}</span></div>
      <div class="prog-track"><div class="prog-fill" data-w="${a}"></div></div>
      <div class="prog-label">${a}% to qualified</div>
    </div>`}).join(""),requestAnimationFrame(()=>E("#roster-grid .prog-fill").forEach(t=>{t.style.width=t.dataset.w+"%"}))}function ct(){let e=F.players,t=I.slice().sort((c,p)=>p.winPct-c.winPct).slice(0,10),a=e.slice().sort((c,p)=>p.matches-c.matches).slice(0,10),o=[];D().forEach(c=>{let p=H[c.a],$=H[c.b];if(!p||!$)return;let k=p.rating-$.rating;if(c.sa===c.sb)return;let R=c.sa>c.sb?c.a:c.b,O=Math.abs(k);(k<0&&R===c.a||k>0&&R===c.b)&&o.push({winner:R,loser:R===c.a?c.b:c.a,gap:O,score:R===c.a?`${c.sa}-${c.sb}`:`${c.sb}-${c.sa}`})}),o.sort((c,p)=>p.gap-c.gap);let r={};D().forEach(c=>{let p=[c.a,c.b].sort().join(" vs ");r[p]=(r[p]||0)+1});let m=Object.entries(r).sort((c,p)=>p[1]-c[1]).slice(0,10),f=e.map(c=>c.rating),d=Math.min(...f),h=Math.max(...f),b=8,L=(h-d)/b||1,y=Array.from({length:b},()=>0);f.forEach(c=>{y[Math.min(b-1,Math.max(0,Math.floor((c-d)/L)))]++});let x=Math.max(...y,1),M=y.map((c,p)=>{let $=Math.round((d+p*L)/10)*10,k=Math.round((d+(p+1)*L)/10)*10;return`
    <div class="hcol" title="${c} player${c===1?"":"s"} rated ${$}\u2013${k}">
      <div class="hbar" data-h="${Math.round(c/x*100)}"></div>
      <div class="hlbl">${$}\u2013${k}</div>
    </div>`}).join(""),s=e.slice().sort((c,p)=>p.opponents-c.opponents).slice(0,8),i=Math.max(...s.map(c=>c.opponents),1),v=s.map(c=>`
    <div class="mrow reveal" data-goto="${u(c.name)}">
      <div class="nm">${u(c.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(c.opponents/i*100)}"></div></div>
      <div class="val mono">${c.opponents}</div>
    </div>`).join(""),n=(c,p,$)=>c.map((k,R)=>`
    <div class="an-row reveal" data-goto="${u(k.name)}">
      <div class="idx mono">${R+1}</div>
      <div class="nm">${u(k.name)}</div>
      <div class="val mono">${p(k)}</div>
      <div class="unit mono">${$(k)}</div>
    </div>`).join("");l("#an-grid").innerHTML=`
    <div class="an-panel">
      <div class="head"><h3>Top win rate</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${n(t,c=>c.winPct+"%",c=>c.matches+" matches")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Most active</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/></svg>
      </div>
      ${n(a,c=>c.matches,c=>"matches")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Biggest upsets</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${o.length?o.slice(0,8).map((c,p)=>`
        <div class="an-row reveal" data-goto="${u(c.winner)}">
          <div class="idx mono">${p+1}</div>
          <div class="nm">${u(c.winner)} <span style="color:var(--dimmer);font-weight:500">def.</span> ${u(c.loser)}</div>
          <div class="val mono">${c.score}</div>
          <div class="unit mono">+${Math.round(c.gap)} pts</div>
        </div>`).join(""):'<div class="empty">No upsets on record</div>'}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Most contested rivalries</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${m.map(([c,p],$)=>`
        <div class="an-row reveal">
          <div class="idx mono">${$+1}</div>
          <div class="nm">${c.split(" vs ").map(u).join(' <span style="color:var(--dimmer);font-weight:500">vs</span> ')}</div>
          <div class="val mono">${p}</div>
          <div class="unit mono">meetings</div>
        </div>`).join("")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Rating distribution</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 20V10M10 20V4M16 20v-8M2 20h20" stroke-linecap="round"/></svg>
      </div>
      <div class="hist">${M}</div>
    </div>
    <div class="an-panel">
      <div class="head"><h3>Most unique opponents</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v5M12 15v5" stroke-linecap="round"/></svg>
      </div>
      ${v}
    </div>`;let g=()=>{E("#an-grid .hbar").forEach(c=>{c.style.height=c.dataset.h+"%"}),E("#an-grid .abar").forEach(c=>{c.style.width=c.dataset.w+"%"})};requestAnimationFrame(g),setTimeout(g,140),pe()}function vt(){l("#settings-body").innerHTML=$e().map(e=>`
    <tr><td><b>${u(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${u(e.desc)}</div></td>
        <td class="val">${u(String(e.value))}</td></tr>`).join("")}var pt=[{q:"How are the ratings calculated?",a:"Dynamic Glicko \u2014 the same model behind competitive chess and table-tennis rankings. Every recorded duel moves the numbers: beating a stronger opponent gains more, losing to a weaker one costs more. The full maths lives on the Method page."},{q:"Why did my rating drop even though I didn't play?",a:"That's the inactivity automation. Each 30-day rating period without a match grows your RD (uncertainty), and the visible rating subtracts half of it \u2014 so an idle rating slowly sinks on its own, exactly like the master sheet. Play one match and the drift stops."},{q:"What is RD, and why does it matter?",a:"RD (ratings deviation) is how certain the system is about your rating. New or idle players have a high RD; regular players have a low one. The board ranks the visible rating = Glicko \u2212 0.5 \xD7 RD, so uncertain ratings are held back until they've earned trust."},{q:"How do I get ranked on the leaderboard?",a:"Log at least 5 matches against at least 3 different opponents. Until then you're provisional \u2014 your rating is real and takes part in every calculation, but you aren't ranked yet."},{q:"What do the green and red arrows next to ratings mean?",a:"They show how your visible rating moved since the previous spreadsheet update: green \u25B2 means you climbed, red \u25BC means you dropped."},{q:"What does the \u201Cinactive\u201D tag mean?",a:"A qualified player is marked inactive \u2014 and hidden from the board \u2014 after 365 days without a dated match (legacy players without recorded dates get a 365-day grace window first). Your rating isn't deleted: come back, play a match, and you're active again."},{q:"Do my old 0\u2013100 ladder ratings still count?",a:"Yes. Historical scores are converted into Glicko starting points (old 80 \u2248 1500), so the ladder carries over. This site reproduces the master sheet's seeding exactly, including its low-end floor."},{q:"Two names on the board look like the same person \u2014 is that a bug?",a:"Possibly an alias. When we confirm two names are the same player, a name fix merges them everywhere \u2014 records, ratings and head-to-heads \u2014 without rewriting old matches. Report suspicious duplicates through the feedback button."},{q:"How do I get my duels recorded?",a:"Matches are logged by the team after official 1v1 duels. If a match is missing or has the wrong score, send feedback with the details and we'll fix it \u2014 corrections recalculate every rating instantly."},{q:"The numbers here differ from the Google Sheet \u2014 what do I do?",a:"They shouldn't: every figure on this site is recomputed from the raw results and validated against the official sheet down to the decimal. If you spot a gap, screenshot it and send feedback \u2014 that's a bug report we want."},{q:"Who runs this site?",a:"Alternator & interstellar. The leaderboard is data-driven \u2014 no manual rankings, no politics. Just duels."}];function re(){let e=j().faq;return Array.isArray(e)&&e.length?e:pt}function mt(){l("#faq-list").innerHTML=re().map((e,t)=>`
    <div class="faq-item reveal" data-faq="${t}">
      <button class="faq-q" aria-expanded="false">
        <span>${u(String(e.q||""))}</span>
        <svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="faq-a"><div class="faq-a-in">${u(String(e.a||""))}</div></div>
    </div>`).join(""),pe()}document.addEventListener("click",e=>{let t=e.target.closest(".faq-q");if(!t)return;let a=t.closest(".faq-item"),o=a.classList.contains("open");E(".faq-item.open").forEach(r=>{r.classList.remove("open"),r.querySelector(".faq-q").setAttribute("aria-expanded","false")}),o||(a.classList.add("open"),t.setAttribute("aria-expanded","true"))});function C(){let e=l("#admin-wrap");if(!ze()){e.innerHTML=`
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
    </div>`;let s=async()=>{let i=l("#admin-pw").value;try{let v=await fetch(Ve,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:i})});if(v.ok){Ye(i,l("#admin-remember").checked),C(),w("Welcome back, commander.");return}if(v.status===429){w("Too many attempts \u2014 wait a few minutes.");return}}catch{}l("#admin-pw").style.borderColor="var(--red)",w("Wrong password.")};l("#admin-auth").addEventListener("click",s),l("#admin-pw").addEventListener("keydown",i=>{i.key==="Enter"&&s()});return}let a=G(),o=Ce().length,r=j(),m='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',f=Object.entries(r.aliases).map(([s,i])=>`
    <div class="log-item">
      <div class="txt"><b>${u(s)}</b> \u2192 <b>${u(i)}</b>${r.aliasNotes&&r.aliasNotes[s]?` <span style="color:var(--dimmer)">\u2014 ${u(r.aliasNotes[s])}</span>`:""}</div>
      <button class="icon-btn" data-alias-del="${u(s)}" title="Remove name fix">${m}</button>
    </div>`).join("")||'<div class="empty">No name fixes yet.</div>',d=r.inactive.map(s=>`
    <div class="log-item">
      <div class="txt"><b>${u(s)}</b> <span style="color:var(--dimmer)">\u2014 inactive</span></div>
      <button class="icon-btn" data-inact-del="${u(s)}" title="Mark active again">${m}</button>
    </div>`).join("")||'<div class="empty">Nobody marked inactive.</div>',h=Object.keys({...r.seeds||{},...r.seedGlicko||{},...r.seedRd||{}}).map(s=>`
    <div class="log-item">
      <div class="txt"><b>${u(s)}</b> \xB7 <span style="color:var(--dimmer)">old</span> <b class="mono">${u(String((r.seeds||{})[s]!=null?(r.seeds||{})[s]:"\u2014"))}</b>${(r.seedGlicko||{})[s]!=null?` \xB7 <span style="color:var(--dimmer)">glicko</span> <b class="mono">${u(String(r.seedGlicko[s]))}</b>`:""}${(r.seedRd||{})[s]!=null?` \xB7 <span style="color:var(--dimmer)">rd</span> <b class="mono">${u(String(r.seedRd[s]))}</b>`:""}</div>
      <button class="icon-btn" data-seed-del="${u(s)}" title="Remove seed">${m}</button>
    </div>`).join("")||'<div class="empty">No seed overrides \u2014 players start from the sheet values.</div>',b=$e().map(s=>`
    <div class="set-row">
      <div class="lbl"><b>${u(s.name)}</b><div class="d">${u(String(s.desc||""))}</div></div>
      <input class="set-val mono" data-set-name="${u(s.name)}" value="${u(String(s.value))}">
    </div>`).join(""),L=s=>{let i=(s||"").trim().toLowerCase();return D().filter(n=>!i||n.a.toLowerCase().includes(i)||n.b.toLowerCase().includes(i)).slice(0,20).map(n=>`
      <div class="log-item fix-row" data-mkey="${n.key}">
        <div class="txt"><b>${u(n.a)}</b> <span style="color:var(--dimmer)">vs</span> <b>${u(n.b)}</b>${n.date?"":' <span class="tag legacy">legacy</span>'}</div>
        <input class="mono" data-f="sa" type="number" min="0" value="${n.sa}" title="Score 1">
        <input class="mono" data-f="sb" type="number" min="0" value="${n.sb}" title="Score 2">
        <input data-f="date" type="date" value="${n.date||""}" title="Match date">
        <button class="icon-btn" data-msave="${n.key}" title="Save fix"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-mdel="${n.key}" title="Delete match">${m}</button>
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
      <h3>Pending <span class="n">log</span> \u2014 ${a.length} local \xB7 ${o} published</h3>
      <div class="log-list" id="adm-list">
        ${a.length?a.map((s,i)=>`
          <div class="log-item">
            <div class="txt"><b>${u(s.a)}</b> ${s.sa}\u2013${s.sb} <b>${u(s.b)}</b></div>
            <div class="txt" style="color:var(--dimmer)">${u(s.date||"")}</div>
            <button class="icon-btn" data-del="${i}" title="Remove">
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
      <div class="log-list" id="ov-alias-list" style="margin-top:12px">${f}</div>
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
      <div class="log-list" id="ov-inact-list" style="margin-top:12px">${d}</div>
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
      <div class="log-list" id="ov-seed-list" style="margin-top:12px">${h}</div>
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

  <datalist id="player-list">${F.players.map(s=>`<option value="${u(s.name)}">`).join("")}</datalist>`,l("#admin-lock").addEventListener("click",()=>{Qe(),C()}),l("#admin-publish").addEventListener("click",()=>y()),l("#admin-sync").addEventListener("click",async()=>{let s=l("#admin-sync"),i=l("#admin-sync-status");s.disabled=!0,i.textContent="syncing\u2026";try{let v=await fetch(Ze,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:Z()})}),n=await v.json().catch(()=>({}));v.ok&&n.ok?(i.textContent=n.changed?`synced \u2713 ${n.matches} matches / ${n.players} players`:"already up to date \u2713",w(n.changed?"Sheet synced \u2014 the live site was updated.":"Site already matches the sheet.")):v.status===429?(i.textContent="rate limited",w("Too many attempts \u2014 wait a few minutes.")):(i.textContent="sync failed",w("Sync failed: "+(n.error||v.status)))}catch{i.textContent="network error",w("Sync failed (network).")}s.disabled=!1});async function y(s){let i=!!(s&&s.silent),v=Z()||(i?"":(window.prompt("Admin password:")||"").trim());if(!v){w(i?'Saved here \u2014 auto-publish needs a stored password. Use "Publish to everyone".':"Publish cancelled.");return}he=!0;let n=j(),g={},c=[];for(let[k,R]of Object.entries(n.matchEdits||{}))k.startsWith("a:")&&(g[k]=R);for(let k of n.matchRemoved||[])k.startsWith("a:")&&c.push(k);let p=D().filter(k=>k.admin).map(k=>({a:k.a,b:k.b,sa:k.sa,sb:k.sb,date:k.date||""})),$={matches:p,aliases:n.aliases||{},aliasNotes:n.aliasNotes||{},aliasRemoved:n.aliasRemoved||[],inactive:n.inactive||[],seeds:n.seeds||{},seedGlicko:n.seedGlicko||{},seedRd:n.seedRd||{},seedRemoved:n.seedRemoved||[],settings:n.settings||{},matchEdits:g,matchRemoved:c,faq:n.faq!=null?n.faq:[]};try{let k=await fetch(de,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:v,doc:$,message:`Publish match log (${p.length} matches)`})}),R=await k.json().catch(()=>({}));if(!k.ok||!R.ok){k.status===403&&sessionStorage.removeItem(W),w("Publish failed: "+(R.error||"HTTP "+k.status));return}window.LB_PUB=$,window.LB_LOG=p,Y([]),T({}),q(),i||C(),w(i?"Saved \u2014 live for everyone \u2713":"Published! Everyone sees it on their next visit.")}catch{w("Publish failed: network error.")}finally{he=!1}}l("#admin-export").addEventListener("click",()=>{let s=new Blob([JSON.stringify(G(),null,2)],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(s),i.download="match-log.json",i.click(),URL.revokeObjectURL(i.href),w("Log exported.")}),l("#adm-add").addEventListener("click",()=>{let s=l("#adm-a").value.trim(),i=l("#adm-b").value.trim(),v=parseInt(l("#adm-sa").value,10),n=parseInt(l("#adm-sb").value,10);if(!s||!i||s.toLowerCase()===i.toLowerCase()||!Number.isFinite(v)||!Number.isFinite(n)){w("Fill in both players and scores.");return}let g=G();g.unshift({a:s,b:i,sa:v,sb:n,date:l("#adm-date")?l("#adm-date").value||new Date().toISOString().slice(0,10):new Date().toISOString().slice(0,10)}),Y(g),q(),C(),w(`${s} ${v}\u2013${n} ${i} added \u2014 site recalculated live.`)}),l("#adm-list").addEventListener("click",s=>{let i=s.target.closest("[data-del]");if(!i)return;let v=G();v.splice(parseInt(i.dataset.del,10),1),Y(v),q(),C()}),l("#ov-alias-add").addEventListener("click",()=>{let s=l("#ov-alias-a").value.trim(),i=l("#ov-alias-b").value.trim(),v=(l("#ov-alias-note")||{}).value.trim();if(!s||!i){w("Fill both: the wrong name and the correct player.");return}let n=Object.keys(H).find(c=>c.toLowerCase()===i.toLowerCase())||i,g=N();T({...g,aliases:{...g.aliases||{},[s]:n},aliasNotes:v?{...g.aliasNotes||{},[s]:v}:g.aliasNotes||{},aliasRemoved:(g.aliasRemoved||[]).filter(c=>c!==s)}),q(),C(),w(`Name fix saved \u2014 "${s}" now counts as ${n}.`)}),l("#ov-alias-list").addEventListener("click",s=>{let i=s.target.closest("[data-alias-del]");if(!i)return;let v=i.dataset.aliasDel,n=N(),g={...n.aliases||{}},c={...n.aliasNotes||{}};delete g[v],delete c[v],T({...n,aliases:g,aliasNotes:c,aliasRemoved:[...new Set([...n.aliasRemoved||[],v])]}),q(),C(),w("Name fix removed.")}),l("#ov-inact-toggle").addEventListener("click",()=>{let s=l("#ov-inact-n").value.trim();if(!s){w("Type a player name first.");return}let i=N(),v=j().inactive||[],n=v.includes(s)?v.filter(g=>g!==s):[...v,s];T({...i,inactive:n}),q(),C(),w(n.includes(s)?`${s} marked inactive.`:`${s} marked active again.`)}),l("#ov-inact-list").addEventListener("click",s=>{let i=s.target.closest("[data-inact-del]");if(!i)return;let v=N();T({...v,inactive:(j().inactive||[]).filter(n=>n!==i.dataset.inactDel)}),q(),C()}),l("#ov-seed-add").addEventListener("click",()=>{let s=l("#ov-seed-n").value.trim(),i=l("#ov-seed-v").value.trim(),v=l("#ov-seed-g").value.trim(),n=l("#ov-seed-rd").value.trim();if(!s){w("Pick a player first.");return}if(i===""&&v===""&&n===""){w("Enter an Old 0\u2013100 rating, or a Starting Glicko / RD.");return}let g=N(),c={...g.seeds||{}},p={...g.seedGlicko||{}},$={...g.seedRd||{}};i!==""&&Number.isFinite(Number(i))?c[s]=Number(i):delete c[s],v!==""&&Number.isFinite(Number(v))?p[s]=Number(v):delete p[s],n!==""&&Number.isFinite(Number(n))?$[s]=Number(n):delete $[s],T({...g,seeds:c,seedGlicko:p,seedRd:$,seedRemoved:(g.seedRemoved||[]).filter(k=>k!==s)}),q(),C(),w(`Seed saved for ${s}.`)}),l("#ov-seed-list").addEventListener("click",s=>{let i=s.target.closest("[data-seed-del]");if(!i)return;let v=i.dataset.seedDel,n=N(),g={...n.seeds||{}};delete g[v];let c={...n.seedGlicko||{}};delete c[v];let p={...n.seedRd||{}};delete p[v],T({...n,seeds:g,seedGlicko:c,seedRd:p,seedRemoved:[...new Set([...n.seedRemoved||[],v])]}),q(),C()}),l("#ov-settings").addEventListener("change",s=>{let i=s.target.closest("[data-set-name]");if(!i)return;let v=N();T({...v,settings:{...v.settings||{},[i.dataset.setName]:i.value}}),q(),C(),w("Setting applied \u2014 everything recalculated.")}),l("#ov-set-reset").addEventListener("click",()=>{let s=N();T({...s,settings:{}}),q(),C(),w("Settings back to the master sheet values.")}),l("#ov-mq").addEventListener("input",()=>{l("#ov-mresults").innerHTML=L(l("#ov-mq").value)}),l("#ov-mresults").addEventListener("click",s=>{let i=s.target.closest("[data-msave]"),v=s.target.closest("[data-mdel]");if(i){let n=i.closest("[data-mkey]"),g=n.dataset.mkey,c=$=>n.querySelector(`[data-f="${$}"]`).value,p=N();T({...p,matchEdits:{...p.matchEdits||{},[g]:{sa:+c("sa"),sb:+c("sb"),date:c("date")}}}),q(),l("#ov-mresults").innerHTML=L(l("#ov-mq").value),w("Match fixed \u2014 ratings recalculated.")}else if(v){let n=v.dataset.mdel,g=N();T({...g,matchRemoved:[...new Set([...g.matchRemoved||[],n])]}),q(),l("#ov-mresults").innerHTML=L(l("#ov-mq").value),w("Match deleted \u2014 ratings recalculated.")}}),l("#pl-add").addEventListener("click",()=>{let s=l("#pl-name").value.trim(),i=l("#pl-opp").value.trim(),v=parseInt(l("#pl-sa").value,10),n=parseInt(l("#pl-sb").value,10);if(!s||!i||s.toLowerCase()===i.toLowerCase()||!Number.isFinite(v)||!Number.isFinite(n)){w("A player needs a name, an opponent and both scores \u2014 at least 1 result.");return}if(H[P(s)]){w(`${s} already exists \u2014 log a match for them instead.`);return}let g=G();g.unshift({a:s,b:i,sa:v,sb:n,date:(l("#pl-date")||{}).value||new Date().toISOString().slice(0,10)}),Y(g);let c=(l("#pl-seed")||{}).value.trim();if(c!==""&&Number.isFinite(Number(c))){let p=N();T({...p,seeds:{...p.seeds||{},[P(s)]:Number(c)},seedRemoved:(p.seedRemoved||[]).filter($=>$!==P(s))})}q(),C(),w(`${s} added with their first result \u2014 ${v}\u2013${n} vs ${i}.`)}),l("#pl-del-btn").addEventListener("click",()=>{let s=l("#pl-del").value.trim(),i=P(s),v=D().filter(O=>O.a===i||O.b===i);if(!v.length){w(`No player called "${s}" with matches found.`);return}if(!window.confirm(`Remove ${i} and ${v.length} match${v.length===1?"":"es"}? This recalculates every rating.`))return;let n=N(),g=[...n.matchRemoved||[]],c=[];v.forEach(O=>{O.key.startsWith("l:")?c.push(parseInt(O.key.slice(2),10)):g.push(O.key)});let p=G();c.sort((O,_e)=>_e-O).forEach(O=>p.splice(O,1)),Y(p);let $={...n.seeds||{}},k={...n.seedGlicko||{}},R={...n.seedRd||{}};delete $[i],delete k[i],delete R[i],T({...n,matchRemoved:[...new Set(g)],seeds:$,seedGlicko:k,seedRd:R,seedRemoved:[...new Set([...n.seedRemoved||[],i])],inactive:(j().inactive||[]).filter(O=>O!==i)}),q(),C(),w(`${i} removed with ${v.length} match${v.length===1?"":"es"}. Publish to make it public.`)});let x=()=>{let s=re();l("#faq-admin-list").innerHTML=s.map((i,v)=>`
      <div class="log-item fix-row" data-faq-idx="${v}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${u(String(i.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${u(String(i.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${v}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${v}" title="Delete question">${m}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};x(),l("#faq-admin-list").addEventListener("click",s=>{let i=s.target.closest("[data-faq-save]"),v=s.target.closest("[data-faq-del]"),n=re().map(c=>({...c}));if(i){let c=i.closest("[data-faq-idx]");n[parseInt(i.dataset.faqSave,10)]={q:c.querySelector('[data-fq="q"]').value.trim(),a:c.querySelector('[data-fq="a"]').value.trim()}}else if(v)n.splice(parseInt(v.dataset.faqDel,10),1);else return;let g=N();T({...g,faq:n}),x(),w("Q&A updated \u2014 publish to make it public.")}),l("#faq-add").addEventListener("click",()=>{let s=l("#faq-new-q").value.trim(),i=l("#faq-new-a").value.trim();if(!s||!i){w("Fill in both the question and the answer.");return}let v=N();T({...v,faq:[...re().map(n=>({...n})),{q:s,a:i}]}),x(),w("Question added.")}),l("#faq-reset").addEventListener("click",()=>{let s=N();T({...s,faq:null}),x(),w("Q&A back to the built-in list.")}),window._fbTimer&&(clearInterval(window._fbTimer),window._fbTimer=null);async function M(){let s=l("#fb-inbox");if(!s||document.querySelector("#fb-inbox [data-fb-reply]:focus"))return;let i=Z();if(!i){s.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let v=await fetch(U+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:i})}),n=await v.json().catch(()=>({}));if(!v.ok||!n.ok){s.innerHTML=`<div class="empty">Could not load messages (${u(n.error||"HTTP "+v.status)}).</div>`;return}let g=n.items||[],c={};s.querySelectorAll("[data-fb-id]").forEach(p=>{let $=p.querySelector("[data-fb-reply]");$&&$.value&&(c[p.dataset.fbId]=$.value)}),s.innerHTML=g.map(p=>`
        <div class="log-item fb-row${p.resolved?" fb-done":""}" data-fb-id="${u(p.id)}" data-fb-resolved="${p.resolved?"1":""}">
          <div class="txt">
            <b>${u(p.name||"Anonymous")}</b>${p.contact?` <span style="color:var(--dimmer)">\xB7 ${u(p.contact)}</span>`:""}
            <span class="mono" style="color:var(--dimmer);font-size:11px;margin-left:6px">ticket ${u(p.id)}</span>
            ${p.resolved?'<span class="tag resolved" style="margin-left:6px">resolved \u2713</span>':`<span class="tag ${p.status==="replied"?"live":"fresh"}" style="margin-left:6px">${u(p.status)}</span>`}
            <div style="color:var(--dim);font-size:13px;margin-top:4px">${u(p.message)}</div>
            ${p.reply?`<div style="color:var(--gold);font-size:12.5px;margin-top:4px">\u21A9 ${u(p.reply)}</div>`:""}
          </div>
          <input class="set-val fb-reply-in" data-fb-reply placeholder="Write a reply\u2026" value="${u(p.reply||"")}">
          <button class="icon-btn" data-fb-send title="Send reply"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-resolve title="${p.resolved?"Reopen \u2014 mark as not resolved":"Mark as resolved"}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.6L16 9.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-del title="Delete message">${m}</button>
        </div>`).join("")||'<div class="empty">No messages yet.</div>',s.querySelectorAll("[data-fb-id]").forEach(p=>{let $=p.querySelector("[data-fb-reply]");$&&c[p.dataset.fbId]!=null&&($.value=c[p.dataset.fbId])})}catch{s.innerHTML='<div class="empty">Network error loading messages.</div>'}}M(),l("#fb-refresh").addEventListener("click",()=>{M(),w("Inbox refreshed.")}),window._fbTimer=setInterval(()=>{if(!l("#fb-inbox")){clearInterval(window._fbTimer),window._fbTimer=null;return}document.hidden||M()},2e3),l("#fb-inbox").addEventListener("click",async s=>{let i=s.target.closest("[data-fb-send]"),v=s.target.closest("[data-fb-del]"),n=s.target.closest("[data-fb-resolve]");if(!i&&!v&&!n)return;let g=s.target.closest("[data-fb-id]"),c=g.dataset.fbId,p=Z();try{if(n){let $=g.dataset.fbResolved!=="1";if(!(await fetch(U+"/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:p,id:c,resolved:$})}).then(R=>R.json())).ok){w("Could not update \u2014 try again.");return}w($?"Marked as resolved \u2713":"Message reopened."),M()}else if(i){let $=g.querySelector("[data-fb-reply]").value;if(!(await fetch(U+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:p,id:c,reply:$})}).then(R=>R.json())).ok){w("Reply failed.");return}w("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(U+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:p,id:c})}).then(k=>k.json())).ok){w("Delete failed.");return}g.remove(),w("Message deleted.")}}catch{w("Network error.")}})}var te=document.getElementById("fl-cards");te&&window.matchMedia("(hover: hover)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(te.addEventListener("pointermove",e=>{let t=e.target.closest&&e.target.closest(".fl-card");if(!t)return;let a=t.getBoundingClientRect(),o=(e.clientX-a.left)/a.width-.5,r=(e.clientY-a.top)/a.height-.5;t.classList.add("tilt"),t.style.transform=`perspective(1000px) rotateY(${(o*7).toFixed(2)}deg) rotateX(${(-r*6).toFixed(2)}deg) translateY(-6px)`}),te.addEventListener("pointerleave",()=>{te.querySelectorAll(".fl-card").forEach(e=>{e.style.transform="",e.classList.remove("tilt")})}));l("#search").addEventListener("input",e=>{let t=e.target.value.trim().toLowerCase(),a=l("#search-drop");if(!t){a.classList.remove("show");return}let o=F.players.filter(r=>r.name.toLowerCase().includes(t)).slice(0,8);if(!o.length){a.classList.remove("show");return}a.innerHTML=o.map(r=>`
    <a class="drop-row" href="#/player/${fe(r.name)}">
      ${r.rank?ce(r.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${u(r.name)}</span>        <span class="mono" style="margin-left:auto;color:var(--dim)">${Re(r,!0)}</span>
    </a>`).join(""),a.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||l("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(l("#search-drop").classList.remove("show"),l("#search").value="")});var U=de.replace(/\/publish$/,"/feedback"),ve="tt1v1_fb_tickets";function ht(){try{return JSON.parse(localStorage.getItem(ve)||"[]")}catch{return[]}}function ut(e){let t=ht();t.push({id:e,ts:Date.now()});try{localStorage.setItem(ve,JSON.stringify(t.slice(-20)))}catch{}}function ft(){let e=l("#fb-overlay"),t=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>l("#fb-msg").focus(),180)},a=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};l("#fab-feedback").addEventListener("click",t),l("#fb-close").addEventListener("click",a),l("#fb-done").addEventListener("click",a),e.addEventListener("click",h=>{h.target===e&&a()}),document.addEventListener("keydown",h=>{h.key==="Escape"&&e.classList.contains("show")&&a()});let o=l("#faq-feedback-btn");o&&o.addEventListener("click",t);let r=l("#fb-msg"),m=l("#fb-count-n");r.addEventListener("input",()=>{m.textContent=String(r.value.length);try{localStorage.setItem("tt1v1_fb_draft",r.value)}catch{}});try{let h=localStorage.getItem("tt1v1_fb_draft");h&&(r.value=h,m.textContent=String(h.length))}catch{}let f=l("#fb-send");f.addEventListener("click",async()=>{let h=r.value.trim();if(h.length<5){r.focus(),r.classList.add("fb-nudge"),setTimeout(()=>r.classList.remove("fb-nudge"),500),w("Write a message first \u2014 a few words is plenty.");return}f.classList.add("busy"),f.disabled=!0;try{let b=await fetch(U,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:l("#fb-name").value.trim(),contact:l("#fb-contact").value.trim(),message:h})}),L=await b.json().catch(()=>({}));if(!b.ok||!L.ok){w("Could not send: "+(L.error||"HTTP "+b.status)+" \u2014 try again later.");return}ut(L.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}l("#fb-ticket-code").textContent=L.id,l("#fb-view-form").hidden=!0,l("#fb-view-done").hidden=!1}catch{w("Network error \u2014 your message was not sent.")}finally{f.classList.remove("busy"),f.disabled=!1}});let d=document.querySelector(".fb-ticket");d&&d.addEventListener("click",async()=>{let h=(l("#fb-ticket-code").textContent||"").trim();if(!h||h==="\u2014")return;try{await navigator.clipboard.writeText(h)}catch{let y=document.createElement("textarea");y.value=h,document.body.appendChild(y),y.select();try{document.execCommand("copy")}catch{}y.remove()}let b=l("#fb-copied");b&&(b.classList.add("show"),clearTimeout(window._fbCopiedT),window._fbCopiedT=setTimeout(()=>b.classList.remove("show"),1800)),w("Ticket code copied to clipboard.")}),l("#fb-check").addEventListener("click",async()=>{let h=l("#fb-ticket-in").value.trim(),b=l("#fb-reply-out");if(h){b.classList.add("show"),b.textContent="Checking\u2026";try{let L=await fetch(U+"/status?id="+encodeURIComponent(h)),y=await L.json().catch(()=>({}));if(!L.ok||!y.ok){b.textContent="No message found with that ticket code.";return}b.innerHTML=y.resolved?`Status: <b>resolved \u2713</b> \u2014 your message has been handled. Thanks for reaching out!${y.reply?`<br><b>Reply from the team:</b> ${u(y.reply)}`:""}`:y.reply?`<b>Reply from the team:</b> ${u(y.reply)}`:`Status: <b>${u(y.status)}</b> \u2014 your message is being reviewed, check back soon.`}catch{b.textContent="Network error \u2014 try again later."}}})}function gt(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let t=null,a=()=>{e.classList.remove("show"),t=null};document.addEventListener("mouseover",o=>{let r=o.target.closest&&o.target.closest("[title],[data-tip]");if(!r)return;r.hasAttribute("title")&&(r.setAttribute("data-tip",r.getAttribute("title")),r.removeAttribute("title"));let m=r.getAttribute("data-tip");if(!m)return;t=r,e.textContent=m;let f=r.getBoundingClientRect(),d=f.top<52;e.classList.toggle("below",d),e.style.left=Math.max(10,Math.min(window.innerWidth-10,f.left+f.width/2))+"px",e.style.top=(d?f.bottom+8:f.top-8)+"px",e.classList.add("show")}),document.addEventListener("mouseout",o=>{if(!t)return;let r=o.relatedTarget;r&&r.closest&&r.closest("[title],[data-tip]")===t||a()}),window.addEventListener("scroll",a,{passive:!0})}var Ee;function w(e){let t=l("#toast");t.textContent=e,t.classList.add("show"),clearTimeout(Ee),Ee=setTimeout(()=>t.classList.remove("show"),2600)}var Q;function pe(){Q&&Q.disconnect(),Q=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add("in"),E(".cu",t.target).forEach(a=>ge(a,parseFloat(a.dataset.target),{dec:parseInt(a.dataset.dec||0)})),Q.unobserve(t.target))})},{threshold:.12}),E(".reveal").forEach(e=>Q.observe(e))}(function(){let t=l("#scroll-progress"),a=l("#to-top"),o=l("#page-home .hero-row"),r=document.querySelector(".topbar"),m=()=>{let f=window.scrollY,d=document.documentElement.scrollHeight-window.innerHeight;t&&(t.style.width=(d>0?f/d*100:0)+"%"),a&&a.classList.toggle("show",f>640),r&&r.classList.toggle("scrolled",f>10),o&&f<1400&&(o.style.transform=`translateY(${f*.14}px)`,o.style.opacity=String(Math.max(.3,1-f/950)))};window.addEventListener("scroll",m,{passive:!0}),a&&a.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),m()})();q();Le();xe();ft();gt();function se(e,t){let a=e.indexOf("window."+t);if(a<0)return null;let o=e.indexOf("=",a);for(;o<e.length&&"{[".indexOf(e[o])<0;)o++;let r=0,m=!1,f="",d=!1;for(let h=o;h<e.length;h++){let b=e[h];if(m){d?d=!1:b==="\\"?d=!0:b===f&&(m=!1);continue}if(b==='"'||b==="'"){m=!0,f=b;continue}if(b==="{"||b==="[")r++;else if((b==="}"||b==="]")&&(r--,r<=0))return JSON.parse(e.slice(o,h+1))}return null}async function je(e){try{let t="cb="+Date.now(),[a,o]=await Promise.all([fetch("data.js?"+t,{cache:"no-store"}),fetch("log.js?"+t,{cache:"no-store"})]);if(!a.ok||!o.ok)throw new Error("HTTP "+a.status+"/"+o.status);let r=await a.text(),m=await o.text(),f=se(r,"LB_DATA"),d=se(m,"LB_PUB")||(se(m,"LB_LOG")?{matches:se(m,"LB_LOG")}:null),h=[];if(f&&JSON.stringify(f)!==JSON.stringify(_)&&(_=f,window.LB_DATA=f,h.push("data")),d&&JSON.stringify(d)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=d,window.LB_LOG=d.matches||[],h.push("log")),h.length){q(),Le(),xe();let b=l("#last-updated");b&&(b.textContent="Last updated "+(_.generated||"today"))}e&&w(h.length?"Refreshed \u2014 you have the latest data.":"Already up to date \u2713")}catch{e&&w("Refresh failed \u2014 check your connection.")}}je(!1);var ae=l("#lb-refresh-btn");ae&&ae.addEventListener("click",async()=>{ae.classList.add("spinning"),await je(!0),setTimeout(()=>ae.classList.remove("spinning"),400)});var Ie="tt1v1_fb_seen",B=null;function bt(){try{return JSON.parse(localStorage.getItem(ve)||"[]")}catch{return[]}}function Pe(){try{return JSON.parse(localStorage.getItem(Ie)||"{}")||{}}catch{return{}}}function yt(){let e=l("#fab-feedback");if(e&&!e.querySelector(".fb-dot")){let a=document.createElement("span");a.className="fb-dot",e.appendChild(a),requestAnimationFrame(()=>a.classList.add("in"))}let t=l("#fb-view-form");if(t&&!l("#fb-reply-banner")&&B){let a=document.createElement("div");a.id="fb-reply-banner",a.innerHTML=`<b>The team replied</b> to your message (ticket ${u(B.id)})
      <div class="r">${u(B.reply)}</div>
      <button class="btn btn-ghost" id="fb-got-it" style="margin-top:9px;padding:6px 13px">\u2713 Got it</button>`,t.insertAdjacentElement("beforebegin",a),requestAnimationFrame(()=>a.classList.add("show")),l("#fb-got-it").addEventListener("click",wt)}}function wt(){if(B){let a=Pe();a[B.id]=1;try{localStorage.setItem(Ie,JSON.stringify(a))}catch{}B=null}let e=l(".fb-dot");e&&(e.classList.add("out"),setTimeout(()=>e.remove(),420));let t=l("#fb-reply-banner");t&&(t.classList.remove("show"),setTimeout(()=>t.remove(),420))}async function De(){let e=Pe();B=null;let t=bt(),a=t.slice(0,Math.max(0,t.length-6)),o=[];for(let r of t.slice(-6))try{let m=await fetch(U+"/status?id="+encodeURIComponent(r.id),{cache:"no-store"}),f=await m.json().catch(()=>({}));if(m.status===404||m.ok&&f.ok===!1)continue;o.push(r),m.ok&&f.ok&&f.reply&&!e[r.id]&&!B&&(B={id:r.id,reply:f.reply})}catch{o.push(r)}if(o.length!==t.slice(-6).length)try{localStorage.setItem(ve,JSON.stringify([...a,...o]))}catch{}B&&yt()}setTimeout(De,3500);setInterval(De,9e4);})();
