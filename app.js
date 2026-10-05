/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var P=window.LB_DATA,re="https://tierstats-publish.tierstats.workers.dev/publish",o=(e,t=document)=>t.querySelector(e),E=(e,t=document)=>[...t.querySelectorAll(e)],m=e=>String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),ue=e=>encodeURIComponent(String(e)),Be=e=>decodeURIComponent(e);function fe(e,t,a={}){let n=a.dur||1200,c=a.dec||0,u=performance.now(),f=parseFloat(e.textContent)||0;function i(h){let y=Math.min(1,(h-u)/n),S=1-Math.pow(1-y,3);e.textContent=(f+(t-f)*S).toFixed(c),y<1&&requestAnimationFrame(i)}requestAnimationFrame(i),setTimeout(()=>{e.textContent=t.toFixed(c)},n+300)}var _e='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',Fe='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function de(e,t=""){let a=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",n=e<=3?e===1?_e:Fe:"";return`<div class="rank-badge ${a} ${t}" title="Rank #${e}">${n}<span class="num">${e}</span></div>`}var F={},A=[],B={players:[],byName:{},qualified:[]},Q={},ae={},ie={},pe=new Set;function He(){for(let t in Q)delete Q[t];Object.entries(P.aliases).forEach(([t,a])=>{Q[t.toLowerCase()]=a}),Object.entries(j().aliases||{}).forEach(([t,a])=>{Q[String(t).toLowerCase()]=a});for(let t of Object.keys(ae))delete ae[t];for(let t of Object.keys(ie))delete ie[t];pe.clear();let e=(t,a)=>{Object.keys(t||{}).forEach(n=>{let c=D(n);c!==n&&(a[c]=t[n])}),Object.keys(t||{}).forEach(n=>{let c=D(n);c===n&&(a[c]=t[n])})};e(P.seeds,ae),e(P.prevRatings,ie),(P.inactiveList||[]).forEach(t=>pe.add(D(t)))}var D=e=>{let t=String(e).trim(),a=new Set;for(;;){let n=Q[t.toLowerCase()];if(!n||n===t||a.has(t))return t;a.add(t),t=n}};function Ee(e){let t=[];return I().forEach(a=>{let n=(c,u,f)=>({opp:c,for_:u,against:f,res:u>f?"W":u<f?"L":"D",date:a.date});a.a===e?t.push(n(a.b,a.sa,a.sb)):a.b===e&&t.push(n(a.a,a.sb,a.sa))}),t}function Ge(e){let t={};return Ee(e).forEach(a=>{let n=t[a.opp]||(t[a.opp]={w:0,l:0,d:0,pf:0,pa:0});n[a.res.toLowerCase()]+=1,n.pf+=a.for_,n.pa+=a.against}),Object.entries(t).map(([a,n])=>({opp:a,...n})).sort((a,n)=>n.w+n.l+n.d-(a.w+a.l+a.d)||n.w-a.w)}function Ue(e){let t=F[e]||{};return t.provisional?'<span class="tag prov">provisional</span>':t.inactive?'<span class="tag inact">inactive</span>':""}function ge(e){let t=e.delta!=null?e.delta:0;if(Math.abs(t)<.05)return"";let a=t>0;return`<span class="delta ${a?"up":"down"}" title="${a?"up":"down"} ${Math.abs(t).toFixed(1)} since the previous sheet update">${a?"\u25B2":"\u25BC"} ${Math.abs(t).toFixed(1)}</span>`}function be(e){return`${Math.round(e.rating-100)} \u2013 ${Math.round(e.rating+100)}`}function qe(e,t){return e.provisional?`<span class="prov-range" title="Provisional \u2014 estimated range (\xB1100). The exact rating is unreliable over few matches.">${t?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:be(e)}</span>`:e.rating.toFixed(1)}var Re="tt1v1_admin_log_v1",U="tt1v1_admin_ok",G="tt1v1_admin_pw",We=()=>sessionStorage.getItem(U)==="1"||localStorage.getItem(U)==="1",V=()=>sessionStorage.getItem(G)||localStorage.getItem(G)||"";function ze(e,t){t?(localStorage.setItem(U,"1"),localStorage.setItem(G,e)):(sessionStorage.setItem(U,"1"),sessionStorage.setItem(G,e),localStorage.removeItem(U),localStorage.removeItem(G))}function Je(){[sessionStorage,localStorage].forEach(e=>{e.removeItem(U),e.removeItem(G)})}var Le=null,me=!1;function Te(){me||!V()||(clearTimeout(Le),Le=setTimeout(()=>publishLog({silent:!0}),1500))}var Ye=re.replace(/\/publish$/,"/verify"),Qe=re.replace(/\/publish$/,"/sync");function H(){try{return JSON.parse(localStorage.getItem(Re)||"[]")}catch{return[]}}function J(e){try{localStorage.setItem(Re,JSON.stringify(e))}catch{}Te()}var Ne="tt1v1_admin_over_v1";function N(){try{return JSON.parse(localStorage.getItem(Ne)||"{}")||{}}catch{return{}}}function T(e){try{localStorage.setItem(Ne,JSON.stringify(e))}catch{}Te()}function j(){let e=window.LB_PUB||{},t=N();return{aliases:{...e.aliases||{},...t.aliases||{}},aliasNotes:{...e.aliasNotes||{},...t.aliasNotes||{}},seeds:{...e.seeds||{},...t.seeds||{}},seedGlicko:{...e.seedGlicko||{},...t.seedGlicko||{}},seedRd:{...e.seedRd||{},...t.seedRd||{}},settings:{...e.settings||{},...t.settings||{}},matchEdits:{...e.matchEdits||{},...t.matchEdits||{}},inactive:t.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...t.matchRemoved||[]])],faq:t.faq!=null?t.faq:e.faq!=null?e.faq:null}}function Ce(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function I(){let e=j(),t=e.matchEdits||{},a=new Set(e.matchRemoved||[]),n=($,x)=>{if(a.has(x))return null;let l=t[x],s=l?{...$,sa:l.sa,sb:l.sb,date:l.date!=null?l.date:$.date}:$;return{...s,a:D(s.a),b:D(s.b),sa:+s.sa,sb:+s.sb,key:x}},c=H().map(($,x)=>n({...$,admin:!0,published:!1},"l:"+x)).filter(Boolean),u=Ce().map(($,x)=>n({...$,admin:!0,published:!0},"p:"+x)).filter(Boolean),f=P.matches.map(($,x)=>n({...$,admin:!1,published:!1},"a:"+x)).filter(Boolean).reverse(),i=$=>{let x=$.a>$.b;return[x?$.b:$.a,x?$.a:$.b,x?$.sb:$.sa,x?$.sa:$.sb,$.date||""].join("|")},h={};f.forEach($=>{let x=i($);h[x]=(h[x]||0)+1});let y={};return c.concat(u).filter($=>{let x=i($);return y[x]=(y[x]||0)+1,y[x]>(h[x]||0)}).concat(f)}var L={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},ne=864e5,K=Math.log(10)/400,Oe=e=>1/Math.sqrt(1+3*K*K*e*e/(Math.PI*Math.PI)),Ve=(e,t,a)=>1/(1+Math.pow(10,-Oe(a)*(e-t)/400));function Ze(e){let t=j().seeds||{};return t[e]!=null&&t[e]!==""?Number(t[e]):ae[e]}function Ke(e){let t=(j().seedGlicko||{})[e],a=(j().seedRd||{})[e],n=t!=null&&t!==""?Number(t):null,c=a!=null&&a!==""?Number(a):null;if(n!=null||c!=null)return[n??L.unratedR,c??L.unratedRd];let u=Ze(e);return u!=null?[Math.max(L.seedMid+(u-L.oldMid)*L.ptsPer,L.minSeed),L.knownRd]:[L.unratedR,L.unratedRd]}function Se(e,t,a){let n=0,c=0;for(let[f,i,h]of a){let y=Oe(i),S=Ve(e,f,i);n+=y*y*S*(1-S),c+=y*(h-S)}if(n*=K*K,n<=0)return[e,t];let u=1/(t*t)+n;return[e+K/u*c,Math.sqrt(1/u)]}function Xe(e,t){let a=Math.pow(10,t),n=e*a,c=Math.floor(n);return Math.abs(n-c-.5)<1e-6?(c%2===0?c:c+1)/a:Math.round(n)/a}var ye=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(L.periodDays*ne)),Z=ye(L.graceStart),et={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function we(){let e=j().settings||{};return(P.settings||[]).map(t=>({...t,value:Object.prototype.hasOwnProperty.call(e,t.name)?e[t.name]:t.value}))}function tt(){for(let e of we()){let t=et[e.name];if(!t)continue;if(t==="graceStart"){let n=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(n)&&(L.graceStart=n);continue}let a=Number(e.value);Number.isFinite(a)&&(L[t]=a)}Z=ye(L.graceStart),E(".cons-val").forEach(e=>{e.textContent=String(L.conservative)}),E(".min-matches-val").forEach(e=>{e.textContent=String(L.minMatches)}),E(".min-opp-val").forEach(e=>{e.textContent=String(L.minOpp)})}function st(){tt(),He();let e={},t=s=>{if(!e[s]){let[d,r]=Ke(s);e[s]={name:s,r:d,rd:r,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[s]},a=(s,d,r,p,g,v)=>{let b=t(s);b.games++,b.opps.add(d),r>p?b.w++:r<p?b.l++:b.d++,b.lastIdx=v,g&&(b.lastDate=g)},n={};for(let s of I()){if(s.date)continue;let d=s.a,r=s.b,p=s.sa>s.sb?1:s.sa<s.sb?0:.5;(n[d]=n[d]||[]).push([r,p]),(n[r]=n[r]||[]).push([d,1-p]),a(d,r,s.sa,s.sb,"",Z),a(r,d,s.sb,s.sa,"",Z)}let c={};for(let s in n)c[s]=[t(s).r,t(s).rd];for(let s in n){let[d,r]=Se(c[s][0],c[s][1],n[s].map(([p,g])=>[c[p][0],c[p][1],g]));t(s).r=d,t(s).rd=r}let u=new Map;for(let s of I().filter(d=>d.date).slice().reverse()){let d=s.date,r=ye(d);u.has(r)||u.set(r,[]),u.get(r).push({a:D(s.a),b:D(s.b),sa:+s.sa,sb:+s.sb,date:d})}for(let s of[...u.keys()].sort((d,r)=>d-r)){for(let p in e){let g=e[p],v=s-(g.lastIdx==null?Z:g.lastIdx);v>0&&(g.rd=Math.min(Math.sqrt(g.rd*g.rd+L.growth*L.growth*v),L.maxRd))}let d={};for(let p of u.get(s)){let g=p.sa>p.sb?1:p.sa<p.sb?0:.5;(d[p.a]=d[p.a]||[]).push([p.b,g]),(d[p.b]=d[p.b]||[]).push([p.a,1-g]),a(p.a,p.b,p.sa,p.sb,p.date,s),a(p.b,p.a,p.sb,p.sa,p.date,s)}let r={};for(let p in d)r[p]=[t(p).r,t(p).rd];for(let p in d){let[g,v]=Se(r[p][0],r[p][1],d[p].map(([b,k])=>[r[b][0],r[b][1],k]));t(p).r=g,t(p).rd=v}}let f=Object.values(e).map(s=>({name:s.name,glicko:s.r,rd:s.rd,rating:s.r-L.conservative*s.rd,matches:s.games,w:s.w,l:s.l,d:s.d,winPct:s.games?Xe(s.w/s.games*100,1):0,opponents:s.opps.size,avgOpp:0,lastMatch:s.lastDate||"",provisional:!(s.games>=L.minMatches&&s.opps.size>=L.minOpp),inactive:!1})),i={};f.forEach(s=>{i[s.name]=s.glicko}),f.forEach(s=>{let d=0;e[s.name].opps.forEach(r=>{d+=i[r]!=null?i[r]:L.unratedR}),s.avgOpp=e[s.name].opps.size?d/e[s.name].opps.size:0});let h=Date.now(),y=Math.floor(h/(L.periodDays*ne));for(let s in e){let d=e[s],r=y-(d.lastIdx==null?Z:d.lastIdx);r>0&&(d.rd=Math.min(Math.sqrt(d.rd*d.rd+L.growth*L.growth*r),L.maxRd))}f.forEach(s=>{s.glicko=e[s.name].r,s.rd=e[s.name].rd,s.rating=s.glicko-L.conservative*s.rd;let d=ie[s.name];s.delta=d!=null?s.rating-d:0});let S=Date.parse(L.graceStart+"T00:00:00Z")+L.graceDays*ne,$=new Set([...pe,...j().inactive||[]]);f.forEach(s=>{s.inactive=$.has(s.name)||(s.lastMatch?h-Date.parse(s.lastMatch+"T00:00:00Z")>L.inactiveDays*ne:h>S)});let x=f.filter(s=>!s.provisional&&!s.inactive).sort((s,d)=>d.rating-s.rating);x.forEach((s,d)=>{s.rank=d+1}),f.sort((s,d)=>d.rating-s.rating);let l={};return f.forEach(s=>{l[s.name]=s}),{players:f,byName:l,qualified:x}}function R(){B=st(),F=B.byName,A=B.qualified}var at=["page-home","page-player","page-matches","page-roster","page-analytics","page-method","page-faq","page-admin"];function ke(){let e=location.hash||"#/";at.forEach(c=>o("#"+c).classList.remove("active"));let t="#/"+(e.split("/")[1]||"");E(".nav a").forEach(c=>{let u=c.getAttribute("href");c.classList.toggle("active",u===t||e==="#/"&&u==="#/")});let a=o("#nav-glide"),n=document.querySelector(".nav a.active");a&&n?(a.style.width=n.offsetWidth+"px",a.style.transform=`translateX(${n.offsetLeft}px)`,a.style.opacity="1"):a&&(a.style.opacity="0"),e.startsWith("#/player/")?(nt(Be(e.slice(9))),o("#page-player").classList.add("active"),window.scrollTo({top:0,behavior:"instant"in window?"instant":"auto"})):e==="#/matches"?(ot(),o("#page-matches").classList.add("active"),window.scrollTo(0,0)):e==="#/roster"?(lt(),o("#page-roster").classList.add("active"),window.scrollTo(0,0)):e==="#/analytics"?(rt(),o("#page-analytics").classList.add("active"),window.scrollTo(0,0)):e==="#/method"?(dt(),o("#page-method").classList.add("active"),window.scrollTo(0,0)):e==="#/faq"?(vt(),o("#page-faq").classList.add("active"),window.scrollTo(0,0)):e==="#/admin"?(C(),o("#page-admin").classList.add("active"),window.scrollTo(0,0)):($e(),o("#page-home").classList.add("active"),requestAnimationFrame(it)),ce()}window.addEventListener("hashchange",ke);function $e(){W="all",O={key:"rank",dir:1},E(".chip[data-filter]").forEach(i=>i.classList.toggle("on",i.dataset.filter==="all")),E(".sortable").forEach(i=>i.classList.remove("sorted","asc"));let e=o('.sortable[data-key="rank"]');e&&e.classList.add("sorted");let t=I().length,a=B.players.length,n=A[0],c=Math.round(A.reduce((i,h)=>i+h.rd,0)/A.length);o("#hero-matches").textContent=t,o("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">Ranked players</div>
      <div class="v"><span class="cu" data-target="${A.length}">0</span><small>/ ${a} total</small></div></div>
    <div class="stat-card"><div class="k">Matches logged</div>
      <div class="v"><span class="cu" data-target="${t}">0</span></div></div>
    <div class="stat-card"><div class="k">Highest rating</div>
      <div class="v"><span class="cu" data-target="${n.rating}" data-dec="1">0</span><small>${m(n.name)}</small></div></div>
    <div class="stat-card"><div class="k">Avg certainty (RD)</div>
      <div class="v"><span class="cu" data-target="${c}" data-dec="1">0</span><small>certainty score</small></div></div>`;let u=[A[1],A[0],A[2]].filter(Boolean);o("#fl-cards").innerHTML=u.map(i=>`
    <div class="fl-card r${i.rank}${i.rank===1?" champ":""} reveal" data-goto="${m(i.name)}">
      <div class="fl-top">
        ${de(i.rank)}
        <div class="rd">RD ${i.rd.toFixed(0)}</div>
      </div>
      ${i.rank===1?'<div class="champ-tag">#1 Tank</div>':""}
      <div class="nm">${m(i.name)}</div>
      <div class="rating">
        <span class="unit">Rating</span>
        <div class="big-row"><span class="big">${Math.round(i.rating)}</span>${ge(i)}</div>
      </div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${i.winPct>=60?"":i.winPct>=40?"mid":"low"}" data-w="${i.winPct}"></div></div>
      </div>
      <div class="meta">
        <span><span class="w">${i.w}W</span> <span class="l">${i.l}L</span> ${i.d}D</span>
        <span class="wc">${i.winPct}%</span>
        <span class="opp">avg opp ${Math.round(i.avgOpp)}</span>
      </div>
    </div>`).join(""),requestAnimationFrame(()=>{E("#fl-cards .bar-fill").forEach(i=>{i.style.width=i.dataset.w+"%"})}),X(),Ae();let f=o("#last-updated");f&&(f.textContent="Last updated "+(P.generated||"today"))}function Ae(){let e=I().filter(t=>t.date).slice(0,10);o("#battles-grid").innerHTML=e.length?e.map(t=>{let a=t.sa>t.sb,n=t.sb>t.sa;return`
    <div class="battle-row reveal" data-goto="${m(a?t.a:t.b)}">
      <div class="who ${a?"win":"lose"}" data-goto="${m(t.a)}">${m(t.a)}</div>
      <div class="vs">vs</div>
      <div class="who r ${n?"win":"lose"}" data-goto="${m(t.b)}">${m(t.b)}</div>
      <div class="sc mono"><span class="${a?"win":"lose"}">${t.sa}</span> \u2013 <span class="${n?"win":"lose"}">${t.sb}</span></div>
      <div class="dt">${t.date||(t.admin&&!t.published?"just now":"historical")}</div>
    </div>`}).join(""):'<div class="empty" style="padding:26px;text-align:center;color:var(--dim);grid-column:1/-1">No dated matches yet \u2014 new verified results will appear here as they are logged.</div>'}function X(e="all",t="rank",a=1){let n=o("#lb-body"),u=(e==="all"&&oe?A:B.players).slice().map(i=>({...i,rank:i.rank!=null?i.rank:9999}));he&&(u=u.filter(i=>i.name.toLowerCase().includes(he))),e==="provisional"?u=u.filter(i=>(F[i.name]||{}).provisional):e==="inactive"?u=u.filter(i=>(F[i.name]||{}).inactive):e==="veterans"?u=u.filter(i=>i.matches>=15):e==="rising"&&(u=u.filter(i=>i.winPct>=60&&i.matches>=5)),u.sort((i,h)=>{let y=i[t],S=h[t];return(typeof y=="string"?y.localeCompare(S):y-S)*a});let f=new Map;E(".lb-row",n).forEach(i=>f.set(i.dataset.name,i.getBoundingClientRect().top)),n.innerHTML=u.map(i=>`
    <div class="lb-row ${i.rank<=3?"top"+i.rank:""}" data-name="${m(i.name)}" data-goto="${m(i.name)}">
      <div class="rank">${i.rank<=A.length?de(i.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="pname">${m(i.name)}</div></div>
      <div class="rating-cell mono">${qe(i,!0)}${ge(i)}</div>
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
      <div class="col-status">${Ue(i.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?"Nobody is inactive right now \u2014 a player goes inactive 365 days after their last match (or when flagged in the master sheet).":e==="provisional"?"No provisional players right now.":"No players match this filter."}</div>`,requestAnimationFrame(()=>{E(".lb-row",n).forEach(i=>{let h=f.get(i.dataset.name),y=i.getBoundingClientRect().top;h!==void 0&&Math.abs(h-y)>1&&(i.style.transform=`translateY(${h-y}px)`,i.style.transition="none",requestAnimationFrame(()=>{i.style.transition="transform .5s cubic-bezier(.22,.8,.24,1)",i.style.transform=""}))}),E(".bar-fill",n).forEach(i=>{i.style.width=i.dataset.w+"%"})})}var W="all",O={key:"rank",dir:1},he="",oe=!0;function it(){E("#stat-strip .cu").forEach(e=>fe(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),E(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}o("#lb-qual").addEventListener("click",()=>{oe=!oe,o("#lb-qual").classList.toggle("on",oe),X(W,O.key,O.dir)});o("#lb-filter").addEventListener("input",e=>{he=e.target.value.trim().toLowerCase(),X(W,O.key,O.dir)});document.addEventListener("click",e=>{let t=e.target.closest(".chip");if(t&&t.dataset.filter){E(".chip[data-filter]").forEach(c=>c.classList.remove("on")),t.classList.add("on"),W=t.dataset.filter,X(W,O.key,O.dir);return}let a=e.target.closest(".sortable");if(a){let c=a.dataset.key;O.dir=O.key===c?-O.dir:1,O.key=c,E(".sortable").forEach(u=>u.classList.remove("sorted","asc")),a.classList.add("sorted"),O.dir===1&&a.classList.add("asc"),X(W,O.key,O.dir);return}let n=e.target.closest("[data-goto]");n&&(e.stopPropagation(),location.hash="#/player/"+ue(n.dataset.goto))});function nt(e){let t=F[e],a=o("#page-player");if(!t){a.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">
      No player called "<b>${m(e)}</b>" found. <a href="#/" style="color:var(--gold)">Back to the leaderboard</a>.
    </div></div></div>`;return}let n=A.find(h=>h.name===e),c=Ee(e),u=c.slice(0,10),f=Ge(e),i=Math.max(3,Math.min(100,100-t.rd/120*100));a.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">\u2190 All rankings</a>
    <div class="player-hero anim">
      <div class="player-top">
        ${n?de(n.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${m(t.name)}</div>
          <div class="player-rankline">
            ${n?`Ranked <b>#${n.rank}</b> of ${A.length} qualified players`:"Unranked \u2014 not enough recent games for the board"}
            ${t.provisional?' \xB7 <span class="tag prov">provisional</span>':""}
            ${t.inactive?' \xB7 <span class="tag inact">inactive</span>':""}
          </div>
        </div>
        <div class="player-rating-block">
          <div class="lbl">${t.provisional?"Estimated range":"Visible rating"}</div>
          <div class="big mono${t.provisional?" prov-range":""}" id="pv-rating">${t.provisional?be(t):"0"}</div>
          ${ge(t)}
          <div class="rd-bar">
            <div class="bar-track"><div class="bar-fill" style="width:${i}%"></div></div>
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
      <h3>Recent form <span class="n">\u2014 last ${Math.min(10,c.length)}</span></h3>
      <div class="form-strip">
        ${u.map((h,y)=>`<div class="form-pill ${h.res}" style="animation-delay:${y*55}ms"
           title="vs ${m(h.opp)} ${h.for_}-${h.against}">${h.res}</div>`).join("")||'<span class="empty">No games yet</span>'}
      </div>
    </div>

    <div class="panel reveal">
      <h3>Match history <span class="n">\u2014 ${c.length} games</span></h3>
      <div class="match-list">
        ${c.map(h=>`
          <div class="match-row">
            <div class="res-chip ${h.res}">${h.res}</div>
            <div class="who">${m(t.name)}</div>
            <div class="score mono">${h.for_} \u2013 ${h.against}</div>
            <div class="who opp"><a href="#/player/${ue(h.opp)}" style="color:var(--blue)">${m(h.opp)}</a></div>
            <div class="date mono">${h.date||"historical"}</div>
          </div>`).join("")||'<div class="empty">No games recorded</div>'}
      </div>
    </div>

    <div class="panel reveal">
      <h3>Head to head <span class="n">\u2014 ${f.length} opponents</span></h3>
      <div class="h2h-grid">
        ${f.map(h=>`
          <div class="h2h-card" data-goto="${m(h.opp)}">
            <div class="opp">${m(h.opp)}</div>
            <div class="rec mono"><span class="w">${h.w}W</span> \xB7 <span class="l">${h.l}L</span> \xB7 <span>${h.d}D</span> \xB7 ${h.pf}-${h.pa} pts</div>
          </div>`).join("")||'<div class="empty">No games recorded</div>'}
      </div>
    </div>
  </div>`,t.provisional||fe(o("#pv-rating"),t.rating,{dec:1,dur:900}),ce()}function ot(){Ae();let e=o("#gm-body"),t=I();o("#gm-count").textContent=`\u2014 ${t.length} games`,e.innerHTML=t.map(a=>{let n=a.sa>a.sb,c=a.sb>a.sa;return`
    <div class="gm-row">
      <div class="side ${n?"winner":"loser"}">
        <div class="dot ${n?"w":"l"}"></div>
        <div class="nm" data-goto="${m(a.a)}">${m(a.a)}</div>
      </div>
      <div class="sc mono" style="color:${n?"var(--green)":"var(--red)"}">${a.sa}</div>
      <div class="dash mono">\u2013</div>
      <div class="sc mono" style="color:${c?"var(--green)":"var(--red)"}">${a.sb}</div>
      <div class="side right ${c?"winner":"loser"}">
        <div class="dot ${c?"w":"l"}"></div>
        <div class="nm" data-goto="${m(a.b)}">${m(a.b)}</div>
      </div>
      <div class="dt mono">${a.admin&&!a.published?'<span class="tag fresh">new</span>':a.date||"historical"}</div>
    </div>`}).join("")}function lt(){let e=B.players.filter(t=>t.provisional).sort((t,a)=>a.rating-t.rating);o("#roster-grid").innerHTML=e.map(t=>{let a=Math.min(100,Math.round(Math.min(1,t.matches/5)*50+Math.min(1,t.opponents/3)*50));return`
    <div class="roster-card reveal" data-goto="${m(t.name)}">
      <div class="top">
        <div class="nm">${m(t.name)}</div>
        <svg class="shield" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"/></svg>
      </div>
      <div class="rating"><span class="unit">Est. range</span><span class="big prov-range">${be(t)}</span></div>
      <div class="req-row"><span>Matches</span><span class="${t.matches>=5?"ok":""}">${t.matches} / 5 ${t.matches>=5?"\u2713":""}</span></div>
      <div class="req-row"><span>Opponents</span><span class="${t.opponents>=3?"ok":""}">${t.opponents} / 3 ${t.opponents>=3?"\u2713":""}</span></div>
      <div class="prog-track"><div class="prog-fill" data-w="${a}"></div></div>
      <div class="prog-label">${a}% to qualified</div>
    </div>`}).join(""),requestAnimationFrame(()=>E("#roster-grid .prog-fill").forEach(t=>{t.style.width=t.dataset.w+"%"}))}function rt(){let e=B.players,t=A.slice().sort((v,b)=>b.winPct-v.winPct).slice(0,10),a=e.slice().sort((v,b)=>b.matches-v.matches).slice(0,10),n=[];I().forEach(v=>{let b=F[v.a],k=F[v.b];if(!b||!k)return;let q=b.rating-k.rating;if(v.sa===v.sb)return;let M=v.sa>v.sb?v.a:v.b,ve=Math.abs(q);(q<0&&M===v.a||q>0&&M===v.b)&&n.push({winner:M,loser:M===v.a?v.b:v.a,gap:ve,score:M===v.a?`${v.sa}-${v.sb}`:`${v.sb}-${v.sa}`})}),n.sort((v,b)=>b.gap-v.gap);let c={};I().forEach(v=>{let b=[v.a,v.b].sort().join(" vs ");c[b]=(c[b]||0)+1});let u=Object.entries(c).sort((v,b)=>b[1]-v[1]).slice(0,10),f=e.map(v=>v.rating),i=Math.min(...f),h=Math.max(...f),y=8,S=(h-i)/y||1,$=Array.from({length:y},()=>0);f.forEach(v=>{$[Math.min(y-1,Math.max(0,Math.floor((v-i)/S)))]++});let x=Math.max(...$,1),l=$.map((v,b)=>{let k=Math.round((i+b*S)/10)*10,q=Math.round((i+(b+1)*S)/10)*10;return`
    <div class="hcol" title="${v} player${v===1?"":"s"} rated ${k}\u2013${q}">
      <div class="hbar" data-h="${Math.round(v/x*100)}"></div>
      <div class="hlbl">${k}\u2013${q}</div>
    </div>`}).join(""),s=e.slice().sort((v,b)=>b.opponents-v.opponents).slice(0,8),d=Math.max(...s.map(v=>v.opponents),1),r=s.map(v=>`
    <div class="mrow reveal" data-goto="${m(v.name)}">
      <div class="nm">${m(v.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(v.opponents/d*100)}"></div></div>
      <div class="val mono">${v.opponents}</div>
    </div>`).join(""),p=(v,b,k)=>v.map((q,M)=>`
    <div class="an-row reveal" data-goto="${m(q.name)}">
      <div class="idx mono">${M+1}</div>
      <div class="nm">${m(q.name)}</div>
      <div class="val mono">${b(q)}</div>
      <div class="unit mono">${k(q)}</div>
    </div>`).join("");o("#an-grid").innerHTML=`
    <div class="an-panel">
      <div class="head"><h3>Top win rate</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${p(t,v=>v.winPct+"%",v=>v.matches+" matches")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Most active</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/></svg>
      </div>
      ${p(a,v=>v.matches,v=>"matches")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Biggest upsets</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${n.length?n.slice(0,8).map((v,b)=>`
        <div class="an-row reveal" data-goto="${m(v.winner)}">
          <div class="idx mono">${b+1}</div>
          <div class="nm">${m(v.winner)} <span style="color:var(--dimmer);font-weight:500">def.</span> ${m(v.loser)}</div>
          <div class="val mono">${v.score}</div>
          <div class="unit mono">+${Math.round(v.gap)} pts</div>
        </div>`).join(""):'<div class="empty">No upsets on record</div>'}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Most contested rivalries</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${u.map(([v,b],k)=>`
        <div class="an-row reveal">
          <div class="idx mono">${k+1}</div>
          <div class="nm">${v.split(" vs ").map(m).join(' <span style="color:var(--dimmer);font-weight:500">vs</span> ')}</div>
          <div class="val mono">${b}</div>
          <div class="unit mono">meetings</div>
        </div>`).join("")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Rating distribution</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 20V10M10 20V4M16 20v-8M2 20h20" stroke-linecap="round"/></svg>
      </div>
      <div class="hist">${l}</div>
    </div>
    <div class="an-panel">
      <div class="head"><h3>Most unique opponents</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v5M12 15v5" stroke-linecap="round"/></svg>
      </div>
      ${r}
    </div>`;let g=()=>{E("#an-grid .hbar").forEach(v=>{v.style.height=v.dataset.h+"%"}),E("#an-grid .abar").forEach(v=>{v.style.width=v.dataset.w+"%"})};requestAnimationFrame(g),setTimeout(g,140),ce()}function dt(){o("#settings-body").innerHTML=we().map(e=>`
    <tr><td><b>${m(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${m(e.desc)}</div></td>
        <td class="val">${m(String(e.value))}</td></tr>`).join("")}var ct=[{q:"How are the ratings calculated?",a:"Dynamic Glicko \u2014 the same model behind competitive chess and table-tennis rankings. Every recorded duel moves the numbers: beating a stronger opponent gains more, losing to a weaker one costs more. The full maths lives on the Method page."},{q:"Why did my rating drop even though I didn't play?",a:"That's the inactivity automation. Each 30-day rating period without a match grows your RD (uncertainty), and the visible rating subtracts half of it \u2014 so an idle rating slowly sinks on its own, exactly like the master sheet. Play one match and the drift stops."},{q:"What is RD, and why does it matter?",a:"RD (ratings deviation) is how certain the system is about your rating. New or idle players have a high RD; regular players have a low one. The board ranks the visible rating = Glicko \u2212 0.5 \xD7 RD, so uncertain ratings are held back until they've earned trust."},{q:"How do I get ranked on the leaderboard?",a:"Log at least 5 matches against at least 3 different opponents. Until then you're provisional \u2014 your rating is real and takes part in every calculation, but you aren't ranked yet."},{q:"What do the green and red arrows next to ratings mean?",a:"They show how your visible rating moved since the previous spreadsheet update: green \u25B2 means you climbed, red \u25BC means you dropped."},{q:"What does the \u201Cinactive\u201D tag mean?",a:"A qualified player is marked inactive \u2014 and hidden from the board \u2014 after 365 days without a dated match (legacy players without recorded dates get a 365-day grace window first). Your rating isn't deleted: come back, play a match, and you're active again."},{q:"Do my old 0\u2013100 ladder ratings still count?",a:"Yes. Historical scores are converted into Glicko starting points (old 80 \u2248 1500), so the ladder carries over. This site reproduces the master sheet's seeding exactly, including its low-end floor."},{q:"Two names on the board look like the same person \u2014 is that a bug?",a:"Possibly an alias. When we confirm two names are the same player, a name fix merges them everywhere \u2014 records, ratings and head-to-heads \u2014 without rewriting old matches. Report suspicious duplicates through the feedback button."},{q:"How do I get my duels recorded?",a:"Matches are logged by the team after official 1v1 duels. If a match is missing or has the wrong score, send feedback with the details and we'll fix it \u2014 corrections recalculate every rating instantly."},{q:"The numbers here differ from the Google Sheet \u2014 what do I do?",a:"They shouldn't: every figure on this site is recomputed from the raw results and validated against the official sheet down to the decimal. If you spot a gap, screenshot it and send feedback \u2014 that's a bug report we want."},{q:"Who runs this site?",a:"Alternator & interstellar. The leaderboard is data-driven \u2014 no manual rankings, no politics. Just duels."}];function le(){let e=j().faq;return Array.isArray(e)&&e.length?e:ct}function vt(){o("#faq-list").innerHTML=le().map((e,t)=>`
    <div class="faq-item reveal" data-faq="${t}">
      <button class="faq-q" aria-expanded="false">
        <span>${m(String(e.q||""))}</span>
        <svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="faq-a"><div class="faq-a-in">${m(String(e.a||""))}</div></div>
    </div>`).join(""),ce()}document.addEventListener("click",e=>{let t=e.target.closest(".faq-q");if(!t)return;let a=t.closest(".faq-item"),n=a.classList.contains("open");E(".faq-item.open").forEach(c=>{c.classList.remove("open"),c.querySelector(".faq-q").setAttribute("aria-expanded","false")}),n||(a.classList.add("open"),t.setAttribute("aria-expanded","true"))});function C(){let e=o("#admin-wrap");if(!We()){e.innerHTML=`
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
    </div>`;let l=async()=>{let s=o("#admin-pw").value;try{let d=await fetch(Ye,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:s})});if(d.ok){ze(s,o("#admin-remember").checked),C(),w("Welcome back, commander.");return}if(d.status===429){w("Too many attempts \u2014 wait a few minutes.");return}}catch{}o("#admin-pw").style.borderColor="var(--red)",w("Wrong password.")};o("#admin-auth").addEventListener("click",l),o("#admin-pw").addEventListener("keydown",s=>{s.key==="Enter"&&l()});return}let a=H(),n=Ce().length,c=j(),u='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',f=Object.entries(c.aliases).map(([l,s])=>`
    <div class="log-item">
      <div class="txt"><b>${m(l)}</b> \u2192 <b>${m(s)}</b>${c.aliasNotes&&c.aliasNotes[l]?` <span style="color:var(--dimmer)">\u2014 ${m(c.aliasNotes[l])}</span>`:""}</div>
      <button class="icon-btn" data-alias-del="${m(l)}" title="Remove name fix">${u}</button>
    </div>`).join("")||'<div class="empty">No name fixes yet.</div>',i=c.inactive.map(l=>`
    <div class="log-item">
      <div class="txt"><b>${m(l)}</b> <span style="color:var(--dimmer)">\u2014 inactive</span></div>
      <button class="icon-btn" data-inact-del="${m(l)}" title="Mark active again">${u}</button>
    </div>`).join("")||'<div class="empty">Nobody marked inactive.</div>',h=Object.keys({...c.seeds||{},...c.seedGlicko||{},...c.seedRd||{}}).map(l=>`
    <div class="log-item">
      <div class="txt"><b>${m(l)}</b> \xB7 <span style="color:var(--dimmer)">old</span> <b class="mono">${m(String((c.seeds||{})[l]!=null?(c.seeds||{})[l]:"\u2014"))}</b>${(c.seedGlicko||{})[l]!=null?` \xB7 <span style="color:var(--dimmer)">glicko</span> <b class="mono">${m(String(c.seedGlicko[l]))}</b>`:""}${(c.seedRd||{})[l]!=null?` \xB7 <span style="color:var(--dimmer)">rd</span> <b class="mono">${m(String(c.seedRd[l]))}</b>`:""}</div>
      <button class="icon-btn" data-seed-del="${m(l)}" title="Remove seed">${u}</button>
    </div>`).join("")||'<div class="empty">No seed overrides \u2014 players start from the sheet values.</div>',y=we().map(l=>`
    <div class="set-row">
      <div class="lbl"><b>${m(l.name)}</b><div class="d">${m(String(l.desc||""))}</div></div>
      <input class="set-val mono" data-set-name="${m(l.name)}" value="${m(String(l.value))}">
    </div>`).join(""),S=l=>{let s=(l||"").trim().toLowerCase();return I().filter(r=>!s||r.a.toLowerCase().includes(s)||r.b.toLowerCase().includes(s)).slice(0,20).map(r=>`
      <div class="log-item fix-row" data-mkey="${r.key}">
        <div class="txt"><b>${m(r.a)}</b> <span style="color:var(--dimmer)">vs</span> <b>${m(r.b)}</b>${r.date?"":' <span class="tag legacy">legacy</span>'}</div>
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
      <h3>Pending <span class="n">log</span> \u2014 ${a.length} local \xB7 ${n} published</h3>
      <div class="log-list" id="adm-list">
        ${a.length?a.map((l,s)=>`
          <div class="log-item">
            <div class="txt"><b>${m(l.a)}</b> ${l.sa}\u2013${l.sb} <b>${m(l.b)}</b></div>
            <div class="txt" style="color:var(--dimmer)">${m(l.date||"")}</div>
            <button class="icon-btn" data-del="${s}" title="Remove">
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
      <div class="log-list" id="ov-inact-list" style="margin-top:12px">${i}</div>
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
      <h3>Feedback <span class="n">inbox</span> <span style="color:var(--dimmer);font-size:12px;font-weight:500">\u2014 messages sent from the site</span></h3>
      <div class="log-list" id="fb-inbox"><div class="empty">Loading messages\u2026</div></div>
    </div>
  </div>

  <datalist id="player-list">${B.players.map(l=>`<option value="${m(l.name)}">`).join("")}</datalist>`,o("#admin-lock").addEventListener("click",()=>{Je(),C()}),o("#admin-publish").addEventListener("click",()=>$()),o("#admin-sync").addEventListener("click",async()=>{let l=o("#admin-sync"),s=o("#admin-sync-status");l.disabled=!0,s.textContent="syncing\u2026";try{let d=await fetch(Qe,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:V()})}),r=await d.json().catch(()=>({}));d.ok&&r.ok?(s.textContent=r.changed?`synced \u2713 ${r.matches} matches / ${r.players} players`:"already up to date \u2713",w(r.changed?"Sheet synced \u2014 the live site was updated.":"Site already matches the sheet.")):d.status===429?(s.textContent="rate limited",w("Too many attempts \u2014 wait a few minutes.")):(s.textContent="sync failed",w("Sync failed: "+(r.error||d.status)))}catch{s.textContent="network error",w("Sync failed (network).")}l.disabled=!1});async function $(l){let s=!!(l&&l.silent),d=V()||(s?"":(window.prompt("Admin password:")||"").trim());if(!d){w(s?'Saved here \u2014 auto-publish needs a stored password. Use "Publish to everyone".':"Publish cancelled.");return}me=!0;let r=j(),p={},g=[];for(let[k,q]of Object.entries(r.matchEdits||{}))k.startsWith("a:")&&(p[k]=q);for(let k of r.matchRemoved||[])k.startsWith("a:")&&g.push(k);let v=I().filter(k=>k.admin).map(k=>({a:k.a,b:k.b,sa:k.sa,sb:k.sb,date:k.date||""})),b={matches:v,aliases:r.aliases||{},aliasNotes:r.aliasNotes||{},inactive:r.inactive||[],seeds:r.seeds||{},seedGlicko:r.seedGlicko||{},seedRd:r.seedRd||{},settings:r.settings||{},matchEdits:p,matchRemoved:g,faq:r.faq!=null?r.faq:[]};try{let k=await fetch(re,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:d,doc:b,message:`Publish match log (${v.length} matches)`})}),q=await k.json().catch(()=>({}));if(!k.ok||!q.ok){k.status===403&&sessionStorage.removeItem(G),w("Publish failed: "+(q.error||"HTTP "+k.status));return}window.LB_PUB=b,window.LB_LOG=v,J([]),T({}),R(),s||C(),w(s?"Saved \u2014 live for everyone \u2713":"Published! Everyone sees it on their next visit.")}catch{w("Publish failed: network error.")}finally{me=!1}}o("#admin-export").addEventListener("click",()=>{let l=new Blob([JSON.stringify(H(),null,2)],{type:"application/json"}),s=document.createElement("a");s.href=URL.createObjectURL(l),s.download="match-log.json",s.click(),URL.revokeObjectURL(s.href),w("Log exported.")}),o("#adm-add").addEventListener("click",()=>{let l=o("#adm-a").value.trim(),s=o("#adm-b").value.trim(),d=parseInt(o("#adm-sa").value,10),r=parseInt(o("#adm-sb").value,10);if(!l||!s||l.toLowerCase()===s.toLowerCase()||!Number.isFinite(d)||!Number.isFinite(r)){w("Fill in both players and scores.");return}let p=H();p.unshift({a:l,b:s,sa:d,sb:r,date:o("#adm-date")?o("#adm-date").value||new Date().toISOString().slice(0,10):new Date().toISOString().slice(0,10)}),J(p),R(),C(),w(`${l} ${d}\u2013${r} ${s} added \u2014 site recalculated live.`)}),o("#adm-list").addEventListener("click",l=>{let s=l.target.closest("[data-del]");if(!s)return;let d=H();d.splice(parseInt(s.dataset.del,10),1),J(d),R(),C()}),o("#ov-alias-add").addEventListener("click",()=>{let l=o("#ov-alias-a").value.trim(),s=o("#ov-alias-b").value.trim(),d=(o("#ov-alias-note")||{}).value.trim();if(!l||!s){w("Fill both: the wrong name and the correct player.");return}let r=Object.keys(F).find(g=>g.toLowerCase()===s.toLowerCase())||s,p=N();T({...p,aliases:{...p.aliases||{},[l]:r},aliasNotes:d?{...p.aliasNotes||{},[l]:d}:p.aliasNotes||{}}),R(),C(),w(`Name fix saved \u2014 "${l}" now counts as ${r}.`)}),o("#ov-alias-list").addEventListener("click",l=>{let s=l.target.closest("[data-alias-del]");if(!s)return;let d=N(),r={...d.aliases||{}},p={...d.aliasNotes||{}};delete r[s.dataset.aliasDel],delete p[s.dataset.aliasDel],T({...d,aliases:r,aliasNotes:p}),R(),C()}),o("#ov-inact-toggle").addEventListener("click",()=>{let l=o("#ov-inact-n").value.trim();if(!l){w("Type a player name first.");return}let s=N(),d=j().inactive||[],r=d.includes(l)?d.filter(p=>p!==l):[...d,l];T({...s,inactive:r}),R(),C(),w(r.includes(l)?`${l} marked inactive.`:`${l} marked active again.`)}),o("#ov-inact-list").addEventListener("click",l=>{let s=l.target.closest("[data-inact-del]");if(!s)return;let d=N();T({...d,inactive:(j().inactive||[]).filter(r=>r!==s.dataset.inactDel)}),R(),C()}),o("#ov-seed-add").addEventListener("click",()=>{let l=o("#ov-seed-n").value.trim(),s=o("#ov-seed-v").value.trim(),d=o("#ov-seed-g").value.trim(),r=o("#ov-seed-rd").value.trim();if(!l){w("Pick a player first.");return}if(s===""&&d===""&&r===""){w("Enter an Old 0\u2013100 rating, or a Starting Glicko / RD.");return}let p=N(),g={...p.seeds||{}},v={...p.seedGlicko||{}},b={...p.seedRd||{}};s!==""&&Number.isFinite(Number(s))?g[l]=Number(s):delete g[l],d!==""&&Number.isFinite(Number(d))?v[l]=Number(d):delete v[l],r!==""&&Number.isFinite(Number(r))?b[l]=Number(r):delete b[l],T({...p,seeds:g,seedGlicko:v,seedRd:b}),R(),C(),w(`Seed saved for ${l}.`)}),o("#ov-seed-list").addEventListener("click",l=>{let s=l.target.closest("[data-seed-del]");if(!s)return;let d=s.dataset.seedDel,r=N(),p={...r.seeds||{}};delete p[d];let g={...r.seedGlicko||{}};delete g[d];let v={...r.seedRd||{}};delete v[d],T({...r,seeds:p,seedGlicko:g,seedRd:v}),R(),C()}),o("#ov-settings").addEventListener("change",l=>{let s=l.target.closest("[data-set-name]");if(!s)return;let d=N();T({...d,settings:{...d.settings||{},[s.dataset.setName]:s.value}}),R(),C(),w("Setting applied \u2014 everything recalculated.")}),o("#ov-set-reset").addEventListener("click",()=>{let l=N();T({...l,settings:{}}),R(),C(),w("Settings back to the master sheet values.")}),o("#ov-mq").addEventListener("input",()=>{o("#ov-mresults").innerHTML=S(o("#ov-mq").value)}),o("#ov-mresults").addEventListener("click",l=>{let s=l.target.closest("[data-msave]"),d=l.target.closest("[data-mdel]");if(s){let r=s.closest("[data-mkey]"),p=r.dataset.mkey,g=b=>r.querySelector(`[data-f="${b}"]`).value,v=N();T({...v,matchEdits:{...v.matchEdits||{},[p]:{sa:+g("sa"),sb:+g("sb"),date:g("date")}}}),R(),o("#ov-mresults").innerHTML=S(o("#ov-mq").value),w("Match fixed \u2014 ratings recalculated.")}else if(d){let r=d.dataset.mdel,p=N();T({...p,matchRemoved:[...new Set([...p.matchRemoved||[],r])]}),R(),o("#ov-mresults").innerHTML=S(o("#ov-mq").value),w("Match deleted \u2014 ratings recalculated.")}}),o("#pl-add").addEventListener("click",()=>{let l=o("#pl-name").value.trim(),s=o("#pl-opp").value.trim(),d=parseInt(o("#pl-sa").value,10),r=parseInt(o("#pl-sb").value,10);if(!l||!s||l.toLowerCase()===s.toLowerCase()||!Number.isFinite(d)||!Number.isFinite(r)){w("A player needs a name, an opponent and both scores \u2014 at least 1 result.");return}if(F[D(l)]){w(`${l} already exists \u2014 log a match for them instead.`);return}let p=H();p.unshift({a:l,b:s,sa:d,sb:r,date:(o("#pl-date")||{}).value||new Date().toISOString().slice(0,10)}),J(p);let g=(o("#pl-seed")||{}).value.trim();if(g!==""&&Number.isFinite(Number(g))){let v=N();T({...v,seeds:{...v.seeds||{},[D(l)]:Number(g)}})}R(),C(),w(`${l} added with their first result \u2014 ${d}\u2013${r} vs ${s}.`)}),o("#pl-del-btn").addEventListener("click",()=>{let l=o("#pl-del").value.trim(),s=D(l),d=I().filter(M=>M.a===s||M.b===s);if(!d.length){w(`No player called "${l}" with matches found.`);return}if(!window.confirm(`Remove ${s} and ${d.length} match${d.length===1?"":"es"}? This recalculates every rating.`))return;let r=N(),p=[...r.matchRemoved||[]],g=[];d.forEach(M=>{M.key.startsWith("l:")?g.push(parseInt(M.key.slice(2),10)):p.push(M.key)});let v=H();g.sort((M,ve)=>ve-M).forEach(M=>v.splice(M,1)),J(v);let b={...r.seeds||{}},k={...r.seedGlicko||{}},q={...r.seedRd||{}};delete b[s],delete k[s],delete q[s],T({...r,matchRemoved:[...new Set(p)],seeds:b,seedGlicko:k,seedRd:q,inactive:(j().inactive||[]).filter(M=>M!==s)}),R(),C(),w(`${s} removed with ${d.length} match${d.length===1?"":"es"}. Publish to make it public.`)});let x=()=>{let l=le();o("#faq-admin-list").innerHTML=l.map((s,d)=>`
      <div class="log-item fix-row" data-faq-idx="${d}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${m(String(s.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${m(String(s.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${d}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${d}" title="Delete question">${u}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};x(),o("#faq-admin-list").addEventListener("click",l=>{let s=l.target.closest("[data-faq-save]"),d=l.target.closest("[data-faq-del]"),r=le().map(g=>({...g}));if(s){let g=s.closest("[data-faq-idx]");r[parseInt(s.dataset.faqSave,10)]={q:g.querySelector('[data-fq="q"]').value.trim(),a:g.querySelector('[data-fq="a"]').value.trim()}}else if(d)r.splice(parseInt(d.dataset.faqDel,10),1);else return;let p=N();T({...p,faq:r}),x(),w("Q&A updated \u2014 publish to make it public.")}),o("#faq-add").addEventListener("click",()=>{let l=o("#faq-new-q").value.trim(),s=o("#faq-new-a").value.trim();if(!l||!s){w("Fill in both the question and the answer.");return}let d=N();T({...d,faq:[...le().map(r=>({...r})),{q:l,a:s}]}),x(),w("Question added.")}),o("#faq-reset").addEventListener("click",()=>{let l=N();T({...l,faq:null}),x(),w("Q&A back to the built-in list.")}),(async function(){let s=o("#fb-inbox"),d=V();if(!d){s.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let r=await fetch(z+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:d})}),p=await r.json().catch(()=>({}));if(!r.ok||!p.ok){s.innerHTML=`<div class="empty">Could not load messages (${m(p.error||"HTTP "+r.status)}).</div>`;return}let g=p.items||[];s.innerHTML=g.map(v=>`
        <div class="log-item fb-row" data-fb-id="${m(v.id)}">
          <div class="txt">
            <b>${m(v.name||"Anonymous")}</b>${v.contact?` <span style="color:var(--dimmer)">\xB7 ${m(v.contact)}</span>`:""}
            <span class="mono" style="color:var(--dimmer);font-size:11px;margin-left:6px">ticket ${m(v.id)}</span>
            <span class="tag ${v.status==="replied"?"live":"fresh"}" style="margin-left:6px">${m(v.status)}</span>
            <div style="color:var(--dim);font-size:13px;margin-top:4px">${m(v.message)}</div>
            ${v.reply?`<div style="color:var(--gold);font-size:12.5px;margin-top:4px">\u21A9 ${m(v.reply)}</div>`:""}
          </div>
          <input class="set-val fb-reply-in" data-fb-reply placeholder="Write a reply\u2026" value="${m(v.reply||"")}">
          <button class="icon-btn" data-fb-send title="Send reply"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-del title="Delete message">${u}</button>
        </div>`).join("")||'<div class="empty">No messages yet.</div>'}catch{s.innerHTML='<div class="empty">Network error loading messages.</div>'}})(),o("#fb-inbox").addEventListener("click",async l=>{let s=l.target.closest("[data-fb-send]"),d=l.target.closest("[data-fb-del]");if(!s&&!d)return;let r=l.target.closest("[data-fb-id]"),p=r.dataset.fbId,g=V();try{if(s){let v=r.querySelector("[data-fb-reply]").value;if(!(await fetch(z+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:g,id:p,reply:v})}).then(k=>k.json())).ok){w("Reply failed.");return}w("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(z+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:g,id:p})}).then(b=>b.json())).ok){w("Delete failed.");return}r.remove(),w("Message deleted.")}}catch{w("Network error.")}})}var ee=document.getElementById("fl-cards");ee&&window.matchMedia("(hover: hover)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(ee.addEventListener("pointermove",e=>{let t=e.target.closest&&e.target.closest(".fl-card");if(!t)return;let a=t.getBoundingClientRect(),n=(e.clientX-a.left)/a.width-.5,c=(e.clientY-a.top)/a.height-.5;t.classList.add("tilt"),t.style.transform=`perspective(1000px) rotateY(${(n*7).toFixed(2)}deg) rotateX(${(-c*6).toFixed(2)}deg) translateY(-6px)`}),ee.addEventListener("pointerleave",()=>{ee.querySelectorAll(".fl-card").forEach(e=>{e.style.transform="",e.classList.remove("tilt")})}));o("#search").addEventListener("input",e=>{let t=e.target.value.trim().toLowerCase(),a=o("#search-drop");if(!t){a.classList.remove("show");return}let n=B.players.filter(c=>c.name.toLowerCase().includes(t)).slice(0,8);if(!n.length){a.classList.remove("show");return}a.innerHTML=n.map(c=>`
    <a class="drop-row" href="#/player/${ue(c.name)}">
      ${c.rank?de(c.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${m(c.name)}</span>        <span class="mono" style="margin-left:auto;color:var(--dim)">${qe(c,!0)}</span>
    </a>`).join(""),a.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||o("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(o("#search-drop").classList.remove("show"),o("#search").value="")});var z=re.replace(/\/publish$/,"/feedback"),xe="tt1v1_fb_tickets";function pt(){try{return JSON.parse(localStorage.getItem(xe)||"[]")}catch{return[]}}function mt(e){let t=pt();t.push({id:e,ts:Date.now()});try{localStorage.setItem(xe,JSON.stringify(t.slice(-20)))}catch{}}function ht(){let e=o("#fb-overlay"),t=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>o("#fb-msg").focus(),180)},a=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};o("#fab-feedback").addEventListener("click",t),o("#fb-close").addEventListener("click",a),o("#fb-done").addEventListener("click",a),e.addEventListener("click",i=>{i.target===e&&a()}),document.addEventListener("keydown",i=>{i.key==="Escape"&&e.classList.contains("show")&&a()});let n=o("#faq-feedback-btn");n&&n.addEventListener("click",t);let c=o("#fb-msg"),u=o("#fb-count-n");c.addEventListener("input",()=>{u.textContent=String(c.value.length);try{localStorage.setItem("tt1v1_fb_draft",c.value)}catch{}});try{let i=localStorage.getItem("tt1v1_fb_draft");i&&(c.value=i,u.textContent=String(i.length))}catch{}let f=o("#fb-send");f.addEventListener("click",async()=>{let i=c.value.trim();if(i.length<5){c.focus(),c.classList.add("fb-nudge"),setTimeout(()=>c.classList.remove("fb-nudge"),500),w("Write a message first \u2014 a few words is plenty.");return}f.classList.add("busy"),f.disabled=!0;try{let h=await fetch(z,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:o("#fb-name").value.trim(),contact:o("#fb-contact").value.trim(),message:i})}),y=await h.json().catch(()=>({}));if(!h.ok||!y.ok){w("Could not send: "+(y.error||"HTTP "+h.status)+" \u2014 try again later.");return}mt(y.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}o("#fb-ticket-code").textContent=y.id,o("#fb-view-form").hidden=!0,o("#fb-view-done").hidden=!1}catch{w("Network error \u2014 your message was not sent.")}finally{f.classList.remove("busy"),f.disabled=!1}}),o("#fb-check").addEventListener("click",async()=>{let i=o("#fb-ticket-in").value.trim(),h=o("#fb-reply-out");if(i){h.classList.add("show"),h.textContent="Checking\u2026";try{let y=await fetch(z+"/status?id="+encodeURIComponent(i)),S=await y.json().catch(()=>({}));if(!y.ok||!S.ok){h.textContent="No message found with that ticket code.";return}h.innerHTML=S.reply?`<b>Reply from the team:</b> ${m(S.reply)}`:`Status: <b>${m(S.status)}</b> \u2014 your message is being reviewed, check back soon.`}catch{h.textContent="Network error \u2014 try again later."}}})}function ut(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let t=null,a=()=>{e.classList.remove("show"),t=null};document.addEventListener("mouseover",n=>{let c=n.target.closest&&n.target.closest("[title],[data-tip]");if(!c)return;c.hasAttribute("title")&&(c.setAttribute("data-tip",c.getAttribute("title")),c.removeAttribute("title"));let u=c.getAttribute("data-tip");if(!u)return;t=c,e.textContent=u;let f=c.getBoundingClientRect(),i=f.top<52;e.classList.toggle("below",i),e.style.left=Math.max(10,Math.min(window.innerWidth-10,f.left+f.width/2))+"px",e.style.top=(i?f.bottom+8:f.top-8)+"px",e.classList.add("show")}),document.addEventListener("mouseout",n=>{if(!t)return;let c=n.relatedTarget;c&&c.closest&&c.closest("[title],[data-tip]")===t||a()}),window.addEventListener("scroll",a,{passive:!0})}var Me;function w(e){let t=o("#toast");t.textContent=e,t.classList.add("show"),clearTimeout(Me),Me=setTimeout(()=>t.classList.remove("show"),2600)}var Y;function ce(){Y&&Y.disconnect(),Y=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add("in"),E(".cu",t.target).forEach(a=>fe(a,parseFloat(a.dataset.target),{dec:parseInt(a.dataset.dec||0)})),Y.unobserve(t.target))})},{threshold:.12}),E(".reveal").forEach(e=>Y.observe(e))}(function(){let t=o("#scroll-progress"),a=o("#to-top"),n=o("#page-home .hero-row"),c=document.querySelector(".topbar"),u=()=>{let f=window.scrollY,i=document.documentElement.scrollHeight-window.innerHeight;t&&(t.style.width=(i>0?f/i*100:0)+"%"),a&&a.classList.toggle("show",f>640),c&&c.classList.toggle("scrolled",f>10),n&&f<1400&&(n.style.transform=`translateY(${f*.14}px)`,n.style.opacity=String(Math.max(.3,1-f/950)))};window.addEventListener("scroll",u,{passive:!0}),a&&a.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),u()})();R();$e();ke();ht();ut();function te(e,t){let a=e.indexOf("window."+t);if(a<0)return null;let n=e.indexOf("=",a);for(;n<e.length&&"{[".indexOf(e[n])<0;)n++;let c=0,u=!1,f="",i=!1;for(let h=n;h<e.length;h++){let y=e[h];if(u){i?i=!1:y==="\\"?i=!0:y===f&&(u=!1);continue}if(y==='"'||y==="'"){u=!0,f=y;continue}if(y==="{"||y==="[")c++;else if((y==="}"||y==="]")&&(c--,c<=0))return JSON.parse(e.slice(n,h+1))}return null}async function je(e){try{let t="cb="+Date.now(),[a,n]=await Promise.all([fetch("data.js?"+t,{cache:"no-store"}),fetch("log.js?"+t,{cache:"no-store"})]);if(!a.ok||!n.ok)throw new Error("HTTP "+a.status+"/"+n.status);let c=await a.text(),u=await n.text(),f=te(c,"LB_DATA"),i=te(u,"LB_PUB")||(te(u,"LB_LOG")?{matches:te(u,"LB_LOG")}:null),h=[];if(f&&JSON.stringify(f)!==JSON.stringify(P)&&(P=f,window.LB_DATA=f,h.push("data")),i&&JSON.stringify(i)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=i,window.LB_LOG=i.matches||[],h.push("log")),h.length){R(),$e(),ke();let y=o("#last-updated");y&&(y.textContent="Last updated "+(P.generated||"today"))}e&&w(h.length?"Refreshed \u2014 you have the latest data.":"Already up to date \u2713")}catch{e&&w("Refresh failed \u2014 check your connection.")}}je(!1);var se=o("#lb-refresh-btn");se&&se.addEventListener("click",async()=>{se.classList.add("spinning"),await je(!0),setTimeout(()=>se.classList.remove("spinning"),400)});var Ie="tt1v1_fb_seen",_=null;function ft(){try{return JSON.parse(localStorage.getItem(xe)||"[]")}catch{return[]}}function Pe(){try{return JSON.parse(localStorage.getItem(Ie)||"{}")||{}}catch{return{}}}function gt(){let e=o("#fab-feedback");if(e&&!e.querySelector(".fb-dot")){let a=document.createElement("span");a.className="fb-dot",e.appendChild(a),requestAnimationFrame(()=>a.classList.add("in"))}let t=o("#fb-view-form");if(t&&!o("#fb-reply-banner")&&_){let a=document.createElement("div");a.id="fb-reply-banner",a.innerHTML=`<b>The team replied</b> to your message (ticket ${m(_.id)})
      <div class="r">${m(_.reply)}</div>
      <button class="btn btn-ghost" id="fb-got-it" style="margin-top:9px;padding:6px 13px">\u2713 Got it</button>`,t.insertAdjacentElement("beforebegin",a),requestAnimationFrame(()=>a.classList.add("show")),o("#fb-got-it").addEventListener("click",bt)}}function bt(){if(_){let a=Pe();a[_.id]=1;try{localStorage.setItem(Ie,JSON.stringify(a))}catch{}_=null}let e=o(".fb-dot");e&&(e.classList.add("out"),setTimeout(()=>e.remove(),420));let t=o("#fb-reply-banner");t&&(t.classList.remove("show"),setTimeout(()=>t.remove(),420))}async function De(){let e=Pe();_=null;for(let t of ft().slice(-6))try{let a=await fetch(z+"/status?id="+encodeURIComponent(t.id),{cache:"no-store"}),n=await a.json().catch(()=>({}));if(a.ok&&n.ok&&n.reply&&!e[t.id]){_={id:t.id,reply:n.reply};break}}catch{}_&&gt()}setTimeout(De,3500);setInterval(De,9e4);})();
