/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var G=window.LB_DATA,ne="https://tierstats-publish.tierstats.workers.dev/publish",l=(e,t=document)=>t.querySelector(e),L=(e,t=document)=>[...t.querySelectorAll(e)],u=e=>String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),oe=e=>encodeURIComponent(String(e)),Le=e=>decodeURIComponent(e);function le(e,t,a={}){let r=a.dur||1200,v=a.dec||0,p=performance.now(),g=parseFloat(e.textContent)||0;function d(b){let f=Math.min(1,(b-p)/r),$=1-Math.pow(1-f,3);e.textContent=(g+(t-g)*$).toFixed(v),f<1&&requestAnimationFrame(d)}requestAnimationFrame(d)}var xe='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',Me='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function Z(e,t=""){let a=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",r=e<=3?e===1?xe:Me:"";return`<div class="rank-badge ${a} ${t}" title="Rank #${e}">${r}<span class="num">${e}</span></div>`}var I={},O=[],D={players:[],byName:{},qualified:[]},z={};function Se(){for(let e in z)delete z[e];Object.entries(G.aliases).forEach(([e,t])=>{z[e.toLowerCase()]=t}),Object.entries(N().aliases||{}).forEach(([e,t])=>{z[String(e).toLowerCase()]=t})}var _=e=>{let t=String(e).trim(),a=new Set;for(;;){let r=z[t.toLowerCase()];if(!r||r===t||a.has(t))return t;a.add(t),t=r}};function he(e){let t=[];return C().forEach(a=>{let r=(v,p,g)=>({opp:v,for_:p,against:g,res:p>g?"W":p<g?"L":"D",date:a.date});a.a===e?t.push(r(a.b,a.sa,a.sb)):a.b===e&&t.push(r(a.a,a.sb,a.sa))}),t}function qe(e){let t={};return he(e).forEach(a=>{let r=t[a.opp]||(t[a.opp]={w:0,l:0,d:0,pf:0,pa:0});r[a.res.toLowerCase()]+=1,r.pf+=a.for_,r.pa+=a.against}),Object.entries(t).map(([a,r])=>({opp:a,...r})).sort((a,r)=>r.w+r.l+r.d-(a.w+a.l+a.d)||r.w-a.w)}function Ee(e){let t=I[e]||{};return t.provisional?'<span class="tag prov">provisional</span>':t.inactive?'<span class="tag inact">inactive</span>':'<span class="tag legacy">legacy</span>'}function ue(e){let t=e.delta!=null?e.delta:0;if(Math.abs(t)<.05)return"";let a=t>0;return`<span class="delta ${a?"up":"down"}" title="${a?"up":"down"} ${Math.abs(t).toFixed(1)} since the previous sheet update">${a?"\u25B2":"\u25BC"} ${Math.abs(t).toFixed(1)}</span>`}var fe="tt1v1_admin_log_v1",se="tt1v1_admin_ok",F="tt1v1_admin_pw",Re=ne.replace(/\/publish$/,"/verify");function B(){try{return JSON.parse(localStorage.getItem(fe)||"[]")}catch{return[]}}function W(e){try{localStorage.setItem(fe,JSON.stringify(e))}catch{}}var ge="tt1v1_admin_over_v1";function S(){try{return JSON.parse(localStorage.getItem(ge)||"{}")||{}}catch{return{}}}function M(e){try{localStorage.setItem(ge,JSON.stringify(e))}catch{}}function N(){let e=window.LB_PUB||{},t=S();return{aliases:{...e.aliases||{},...t.aliases||{}},aliasNotes:{...e.aliasNotes||{},...t.aliasNotes||{}},seeds:{...e.seeds||{},...t.seeds||{}},seedGlicko:{...e.seedGlicko||{},...t.seedGlicko||{}},seedRd:{...e.seedRd||{},...t.seedRd||{}},settings:{...e.settings||{},...t.settings||{}},matchEdits:{...e.matchEdits||{},...t.matchEdits||{}},inactive:t.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...t.matchRemoved||[]])],faq:t.faq!=null?t.faq:e.faq!=null?e.faq:null}}function be(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function C(){let e=N(),t=e.matchEdits||{},a=new Set(e.matchRemoved||[]),r=(d,b)=>{if(a.has(b))return null;let f=t[b],$=f?{...d,sa:f.sa,sb:f.sb,date:f.date!=null?f.date:d.date}:d;return{...$,a:_($.a),b:_($.b),sa:+$.sa,sb:+$.sb,key:b}},v=B().map((d,b)=>r({...d,admin:!0,published:!1},"l:"+b)).filter(Boolean),p=be().map((d,b)=>r({...d,admin:!0,published:!0},"p:"+b)).filter(Boolean),g=G.matches.map((d,b)=>r({...d,admin:!1,published:!1},"a:"+b)).filter(Boolean).reverse();return v.concat(p,g)}var k={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},K=864e5,Q=Math.log(10)/400,ye=e=>1/Math.sqrt(1+3*Q*Q*e*e/(Math.PI*Math.PI)),Te=(e,t,a)=>1/(1+Math.pow(10,-ye(a)*(e-t)/400));function we(e){let t=N().seeds||{};return t[e]!=null&&t[e]!==""?Number(t[e]):G.seeds[e]}function Ne(e){let t=(N().seedGlicko||{})[e],a=(N().seedRd||{})[e],r=t!=null&&t!==""?Number(t):null,v=a!=null&&a!==""?Number(a):null;if(r!=null||v!=null)return[r??k.unratedR,v??k.unratedRd];let p=we(e);return p!=null?[Math.max(k.seedMid+(p-k.oldMid)*k.ptsPer,k.minSeed),k.knownRd]:[k.unratedR,k.unratedRd]}function pe(e,t,a){let r=0,v=0;for(let[g,d,b]of a){let f=ye(d),$=Te(e,g,d);r+=f*f*$*(1-$),v+=f*(b-$)}if(r*=Q*Q,r<=0)return[e,t];let p=1/(t*t)+r;return[e+Q/p*v,Math.sqrt(1/p)]}function Oe(e,t){let a=Math.pow(10,t),r=e*a,v=Math.floor(r);return Math.abs(r-v-.5)<1e-6?(v%2===0?v:v+1)/a:Math.round(r)/a}var re=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(k.periodDays*K)),J=re(k.graceStart),Ce={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function de(){let e=N().settings||{};return(G.settings||[]).map(t=>({...t,value:Object.prototype.hasOwnProperty.call(e,t.name)?e[t.name]:t.value}))}function Ae(){for(let e of de()){let t=Ce[e.name];if(!t)continue;if(t==="graceStart"){let r=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(r)&&(k.graceStart=r);continue}let a=Number(e.value);Number.isFinite(a)&&(k[t]=a)}J=re(k.graceStart),L(".cons-val").forEach(e=>{e.textContent=String(k.conservative)}),L(".min-matches-val").forEach(e=>{e.textContent=String(k.minMatches)}),L(".min-opp-val").forEach(e=>{e.textContent=String(k.minOpp)})}function je(){Ae(),Se();let e={},t=s=>{if(!e[s]){let[n,c]=Ne(s);e[s]={name:s,r:n,rd:c,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[s]},a=(s,n,c,m,i,h)=>{let w=t(s);w.games++,w.opps.add(n),c>m?w.w++:c<m?w.l++:w.d++,w.lastIdx=h,i&&(w.lastDate=i)},r={};for(let s of C()){if(s.date)continue;let n=s.a,c=s.b,m=s.sa>s.sb?1:s.sa<s.sb?0:.5;(r[n]=r[n]||[]).push([c,m]),(r[c]=r[c]||[]).push([n,1-m]),a(n,c,s.sa,s.sb,"",J),a(c,n,s.sb,s.sa,"",J)}let v={};for(let s in r)v[s]=[t(s).r,t(s).rd];for(let s in r){let[n,c]=pe(v[s][0],v[s][1],r[s].map(([m,i])=>[v[m][0],v[m][1],i]));t(s).r=n,t(s).rd=c}let p=new Map;for(let s of C().filter(n=>n.date).slice().reverse()){let n=s.date,c=re(n);p.has(c)||p.set(c,[]),p.get(c).push({a:_(s.a),b:_(s.b),sa:+s.sa,sb:+s.sb,date:n})}for(let s of[...p.keys()].sort((n,c)=>n-c)){for(let m in e){let i=e[m],h=s-(i.lastIdx==null?J:i.lastIdx);h>0&&(i.rd=Math.min(Math.sqrt(i.rd*i.rd+k.growth*k.growth*h),k.maxRd))}let n={};for(let m of p.get(s)){let i=m.sa>m.sb?1:m.sa<m.sb?0:.5;(n[m.a]=n[m.a]||[]).push([m.b,i]),(n[m.b]=n[m.b]||[]).push([m.a,1-i]),a(m.a,m.b,m.sa,m.sb,m.date,s),a(m.b,m.a,m.sb,m.sa,m.date,s)}let c={};for(let m in n)c[m]=[t(m).r,t(m).rd];for(let m in n){let[i,h]=pe(c[m][0],c[m][1],n[m].map(([w,E])=>[c[w][0],c[w][1],E]));t(m).r=i,t(m).rd=h}}let g=Object.values(e).map(s=>({name:s.name,glicko:s.r,rd:s.rd,rating:s.r-k.conservative*s.rd,matches:s.games,w:s.w,l:s.l,d:s.d,winPct:s.games?Oe(s.w/s.games*100,1):0,opponents:s.opps.size,avgOpp:0,lastMatch:s.lastDate||"",provisional:!(s.games>=k.minMatches&&s.opps.size>=k.minOpp),inactive:!1})),d={};g.forEach(s=>{d[s.name]=s.glicko}),g.forEach(s=>{let n=0;e[s.name].opps.forEach(c=>{n+=d[c]!=null?d[c]:k.unratedR}),s.avgOpp=e[s.name].opps.size?n/e[s.name].opps.size:0});let b=Date.now(),f=Math.floor(b/(k.periodDays*K));for(let s in e){let n=e[s],c=f-(n.lastIdx==null?J:n.lastIdx);c>0&&(n.rd=Math.min(Math.sqrt(n.rd*n.rd+k.growth*k.growth*c),k.maxRd))}g.forEach(s=>{s.glicko=e[s.name].r,s.rd=e[s.name].rd,s.rating=s.glicko-k.conservative*s.rd;let n=(G.prevRatings||{})[s.name];s.delta=n!=null?s.rating-n:0});let $=Date.parse(k.graceStart+"T00:00:00Z")+k.graceDays*K,P=new Set([...G.inactiveList||[],...N().inactive||[]]);g.forEach(s=>{s.inactive=P.has(s.name)||(s.lastMatch?b-Date.parse(s.lastMatch+"T00:00:00Z")>k.inactiveDays*K:b>$)});let j=g.filter(s=>!s.provisional&&!s.inactive).sort((s,n)=>n.rating-s.rating);j.forEach((s,n)=>{s.rank=n+1}),g.sort((s,n)=>n.rating-s.rating);let o={};return g.forEach(s=>{o[s.name]=s}),{players:g,byName:o,qualified:j}}function x(){D=je(),I=D.byName,O=D.qualified}var De=["page-home","page-player","page-matches","page-roster","page-analytics","page-method","page-faq","page-admin"];function ce(){let e=location.hash||"#/";De.forEach(v=>l("#"+v).classList.remove("active"));let t="#/"+(e.split("/")[1]||"");L(".nav a").forEach(v=>{let p=v.getAttribute("href");v.classList.toggle("active",p===t||e==="#/"&&p==="#/")});let a=l("#nav-glide"),r=document.querySelector(".nav a.active");a&&r?(a.style.width=r.offsetWidth+"px",a.style.transform=`translateX(${r.offsetLeft}px)`,a.style.opacity="1"):a&&(a.style.opacity="0"),e.startsWith("#/player/")?(Be(Le(e.slice(9))),l("#page-player").classList.add("active"),window.scrollTo({top:0,behavior:"instant"in window?"instant":"auto"})):e==="#/matches"?(_e(),l("#page-matches").classList.add("active"),window.scrollTo(0,0)):e==="#/roster"?(Fe(),l("#page-roster").classList.add("active"),window.scrollTo(0,0)):e==="#/analytics"?(He(),l("#page-analytics").classList.add("active"),window.scrollTo(0,0)):e==="#/method"?(Ge(),l("#page-method").classList.add("active"),window.scrollTo(0,0)):e==="#/faq"?(Ue(),l("#page-faq").classList.add("active"),window.scrollTo(0,0)):e==="#/admin"?(q(),l("#page-admin").classList.add("active"),window.scrollTo(0,0)):(ve(),l("#page-home").classList.add("active"),requestAnimationFrame(Pe)),te()}window.addEventListener("hashchange",ce);function ve(){H="all",T={key:"rank",dir:1},L(".chip[data-filter]").forEach(p=>p.classList.toggle("on",p.dataset.filter==="all")),L(".sortable").forEach(p=>p.classList.remove("sorted","asc"));let e=l('.sortable[data-key="rank"]');e&&e.classList.add("sorted");let t=C().length,a=D.players.length,r=O[0],v=Math.round(O.reduce((p,g)=>p+g.rd,0)/O.length);l("#hero-matches").textContent=t,l("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">Ranked players</div>
      <div class="v"><span class="cu" data-target="${O.length}">0</span><small>/ ${a} total</small></div></div>
    <div class="stat-card"><div class="k">Matches logged</div>
      <div class="v"><span class="cu" data-target="${t}">0</span></div></div>
    <div class="stat-card"><div class="k">Highest rating</div>
      <div class="v"><span class="cu" data-target="${r.rating}" data-dec="1">0</span><small>${u(r.name)}</small></div></div>
    <div class="stat-card"><div class="k">Avg certainty (RD)</div>
      <div class="v"><span class="cu" data-target="${v}" data-dec="1">0</span><small>lower = surer</small></div></div>`,l("#fl-cards").innerHTML=O.slice(0,5).map((p,g)=>`
    <div class="fl-card r${g+1}${g===0?" champ":""} reveal" data-goto="${u(p.name)}">
      <div class="rd">RD ${p.rd.toFixed(0)}</div>
      ${Z(p.rank)}
      ${g===0?'<div class="champ-tag">#1 Tank</div>':""}
      <div class="nm">${u(p.name)}</div>
      <div class="rating"><span class="big">${Math.round(p.rating)}</span><span class="unit">Rating</span></div>
      <div class="meta">
        <span><span class="w">${p.w}W</span> <span class="l">${p.l}L</span> ${p.d}D</span>
        <span style="margin-left:auto">${p.winPct}%</span>
      </div>
    </div>`).join(""),l("#fl-rows").innerHTML=O.slice(5,10).map(p=>`
    <div class="fl-row reveal" data-goto="${u(p.name)}">
      ${Z(p.rank,"sm")}
      <div class="nm">${u(p.name)}</div>
      <div class="rating">${Math.round(p.rating)}</div>
      <div class="rec"><span class="w">${p.w}W</span> \xB7 <span class="l">${p.l}L</span> \xB7 ${p.d}D</div>
      <div class="pct">${p.winPct}%</div>
      <div class="go">\u203A</div>
    </div>`).join(""),Y(),Ie()}function Ie(){let e=C().slice(0,10);l("#battles-grid").innerHTML=e.map(t=>{let a=t.sa>t.sb,r=t.sb>t.sa;return`
    <div class="battle-row reveal" data-goto="${u(a?t.a:t.b)}">
      <div class="who ${a?"win":"lose"}" data-goto="${u(t.a)}">${u(t.a)}</div>
      <div class="vs">vs</div>
      <div class="who r ${r?"win":"lose"}" data-goto="${u(t.b)}">${u(t.b)}</div>
      <div class="sc mono"><span class="${a?"win":"lose"}">${t.sa}</span> \u2013 <span class="${r?"win":"lose"}">${t.sb}</span></div>
      <div class="dt">${t.date||(t.admin&&!t.published?"just now":"legacy")}</div>
    </div>`}).join("")}function Y(e="all",t="rank",a=1){let r=l("#lb-body"),p=(e==="all"&&X?O:D.players).slice().map(d=>({...d,rank:d.rank!=null?d.rank:9999}));ie&&(p=p.filter(d=>d.name.toLowerCase().includes(ie))),e==="provisional"?p=p.filter(d=>(I[d.name]||{}).provisional):e==="inactive"?p=p.filter(d=>(I[d.name]||{}).inactive):e==="veterans"?p=p.filter(d=>d.matches>=15):e==="rising"&&(p=p.filter(d=>d.winPct>=60&&d.matches>=5)),p.sort((d,b)=>{let f=d[t],$=b[t];return(typeof f=="string"?f.localeCompare($):f-$)*a});let g=new Map;L(".lb-row",r).forEach(d=>g.set(d.dataset.name,d.getBoundingClientRect().top)),r.innerHTML=p.map(d=>`
    <div class="lb-row ${d.rank<=3?"top"+d.rank:""}" data-name="${u(d.name)}" data-goto="${u(d.name)}">
      <div class="rank">${d.rank<=O.length?Z(d.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="pname">${u(d.name)}</div></div>
      <div class="rating-cell mono">${d.rating.toFixed(1)}${ue(d)}</div>
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
      <div class="col-status">${Ee(d.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?"Nobody is inactive right now \u2014 a player goes inactive 365 days after their last match (or when flagged in the master sheet).":e==="provisional"?"No provisional players right now.":"No players match this filter."}</div>`,requestAnimationFrame(()=>{L(".lb-row",r).forEach(d=>{let b=g.get(d.dataset.name),f=d.getBoundingClientRect().top;b!==void 0&&Math.abs(b-f)>1&&(d.style.transform=`translateY(${b-f}px)`,d.style.transition="none",requestAnimationFrame(()=>{d.style.transition="transform .5s cubic-bezier(.22,.8,.24,1)",d.style.transform=""}))}),L(".bar-fill",r).forEach(d=>{d.style.width=d.dataset.w+"%"})})}var H="all",T={key:"rank",dir:1},ie="",X=!0;function Pe(){L("#stat-strip .cu").forEach(e=>le(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),L(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}l("#lb-qual").addEventListener("click",()=>{X=!X,l("#lb-qual").classList.toggle("on",X),Y(H,T.key,T.dir)});l("#lb-filter").addEventListener("input",e=>{ie=e.target.value.trim().toLowerCase(),Y(H,T.key,T.dir)});document.addEventListener("click",e=>{let t=e.target.closest(".chip");if(t&&t.dataset.filter){L(".chip[data-filter]").forEach(v=>v.classList.remove("on")),t.classList.add("on"),H=t.dataset.filter,Y(H,T.key,T.dir);return}let a=e.target.closest(".sortable");if(a){let v=a.dataset.key;T.dir=T.key===v?-T.dir:1,T.key=v,L(".sortable").forEach(p=>p.classList.remove("sorted","asc")),a.classList.add("sorted"),T.dir===1&&a.classList.add("asc"),Y(H,T.key,T.dir);return}let r=e.target.closest("[data-goto]");r&&(e.stopPropagation(),location.hash="#/player/"+oe(r.dataset.goto))});function Be(e){let t=I[e],a=l("#page-player");if(!t){a.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">
      No player called "<b>${u(e)}</b>" found. <a href="#/" style="color:var(--gold)">Back to the leaderboard</a>.
    </div></div></div>`;return}let r=O.find(f=>f.name===e),v=he(e),p=v.slice(0,10),g=qe(e),d=we(e),b=Math.max(3,Math.min(100,100-t.rd/120*100));a.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">\u2190 All rankings</a>
    <div class="player-hero anim">
      <div class="player-top">
        ${r?Z(r.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${u(t.name)}</div>
          <div class="player-rankline">
            ${r?`Ranked <b>#${r.rank}</b> of ${O.length} qualified players`:"Unranked \u2014 not enough recent games for the board"}
            ${d!=null?` \xB7 seeded from an original rating of <b>${d}</b>`:""}
            ${t.provisional?' \xB7 <span class="tag prov">provisional</span>':""}
            ${t.inactive?' \xB7 <span class="tag inact">inactive</span>':""}
          </div>
        </div>
        <div class="player-rating-block">
          <div class="lbl">Visible rating</div>
          <div class="big mono" id="pv-rating">0</div>
          ${ue(t)}
          <div class="rd-bar">
            <div class="bar-track"><div class="bar-fill" style="width:${b}%"></div></div>
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
      <h3>Recent form <span class="n">\u2014 last ${Math.min(10,v.length)}</span></h3>
      <div class="form-strip">
        ${p.map((f,$)=>`<div class="form-pill ${f.res}" style="animation-delay:${$*55}ms"
           title="vs ${u(f.opp)} ${f.for_}-${f.against}">${f.res}</div>`).join("")||'<span class="empty">No games yet</span>'}
      </div>
    </div>

    <div class="panel reveal">
      <h3>Match history <span class="n">\u2014 ${v.length} games</span></h3>
      <div class="match-list">
        ${v.map(f=>`
          <div class="match-row">
            <div class="res-chip ${f.res}">${f.res}</div>
            <div class="who">${u(t.name)}</div>
            <div class="score mono">${f.for_} \u2013 ${f.against}</div>
            <div class="who opp"><a href="#/player/${oe(f.opp)}" style="color:var(--blue)">${u(f.opp)}</a></div>
            <div class="date mono">${f.date||"legacy"}</div>
          </div>`).join("")||'<div class="empty">No games recorded</div>'}
      </div>
    </div>

    <div class="panel reveal">
      <h3>Head to head <span class="n">\u2014 ${g.length} opponents</span></h3>
      <div class="h2h-grid">
        ${g.map(f=>`
          <div class="h2h-card" data-goto="${u(f.opp)}">
            <div class="opp">${u(f.opp)}</div>
            <div class="rec mono"><span class="w">${f.w}W</span> \xB7 <span class="l">${f.l}L</span> \xB7 <span>${f.d}D</span> \xB7 ${f.pf}-${f.pa} pts</div>
          </div>`).join("")||'<div class="empty">No games recorded</div>'}
      </div>
    </div>
  </div>`,le(l("#pv-rating"),t.rating,{dec:1,dur:900}),te()}function _e(){let e=l("#gm-body"),t=C();l("#gm-count").textContent=`\u2014 ${t.length} games`,e.innerHTML=t.map(a=>{let r=a.sa>a.sb,v=a.sb>a.sa;return`
    <div class="gm-row">
      <div class="side ${r?"winner":"loser"}">
        <div class="dot ${r?"w":"l"}"></div>
        <div class="nm" data-goto="${u(a.a)}">${u(a.a)}</div>
      </div>
      <div class="sc mono" style="color:${r?"var(--green)":"var(--red)"}">${a.sa}</div>
      <div class="dash mono">\u2013</div>
      <div class="sc mono" style="color:${v?"var(--green)":"var(--red)"}">${a.sb}</div>
      <div class="side right ${v?"winner":"loser"}">
        <div class="dot ${v?"w":"l"}"></div>
        <div class="nm" data-goto="${u(a.b)}">${u(a.b)}</div>
      </div>
      <div class="dt mono">${a.admin&&!a.published?'<span class="tag fresh">new</span>':a.date||"legacy"}</div>
    </div>`}).join("")}function Fe(){let e=D.players.filter(t=>t.provisional).sort((t,a)=>a.rating-t.rating);l("#roster-grid").innerHTML=e.map(t=>{let a=Math.min(100,Math.round(Math.min(1,t.matches/5)*50+Math.min(1,t.opponents/3)*50));return`
    <div class="roster-card reveal" data-goto="${u(t.name)}">
      <div class="top">
        <div class="nm">${u(t.name)}</div>
        <svg class="shield" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"/></svg>
      </div>
      <div class="rating"><span class="big">${Math.round(t.rating)}</span><span class="unit">Rating</span></div>
      <div class="req-row"><span>Matches</span><span class="${t.matches>=5?"ok":""}">${t.matches} / 5 ${t.matches>=5?"\u2713":""}</span></div>
      <div class="req-row"><span>Opponents</span><span class="${t.opponents>=3?"ok":""}">${t.opponents} / 3 ${t.opponents>=3?"\u2713":""}</span></div>
      <div class="prog-track"><div class="prog-fill" data-w="${a}"></div></div>
      <div class="prog-label">${a}% to qualified</div>
    </div>`}).join(""),requestAnimationFrame(()=>L("#roster-grid .prog-fill").forEach(t=>{t.style.width=t.dataset.w+"%"}))}function He(){let e=D.players,t=e.filter(i=>i.matches>=5).sort((i,h)=>h.winPct-i.winPct).slice(0,10),a=e.slice().sort((i,h)=>h.matches-i.matches).slice(0,10),r=[];C().forEach(i=>{let h=I[i.a],w=I[i.b];if(!h||!w)return;let E=h.rating-w.rating;if(i.sa===i.sb)return;let A=i.sa>i.sb?i.a:i.b,R=Math.abs(E);(E<0&&A===i.a||E>0&&A===i.b)&&r.push({winner:A,loser:A===i.a?i.b:i.a,gap:R,score:A===i.a?`${i.sa}-${i.sb}`:`${i.sb}-${i.sa}`})}),r.sort((i,h)=>h.gap-i.gap);let v={};C().forEach(i=>{let h=[i.a,i.b].sort().join(" vs ");v[h]=(v[h]||0)+1});let p=Object.entries(v).sort((i,h)=>h[1]-i[1]).slice(0,10),g=e.map(i=>i.rating),d=Math.min(...g),b=Math.max(...g),f=12,$=(b-d)/f||1,P=Array.from({length:f},()=>0);g.forEach(i=>{P[Math.min(f-1,Math.max(0,Math.floor((i-d)/$)))]++});let j=Math.max(...P,1),o=P.map((i,h)=>`
    <div class="hcol" title="${i} player${i===1?"":"s"} near ${Math.round(d+h*$)}">
      <div class="hbar" data-h="${Math.round(i/j*100)}"></div>
      <div class="hlbl">${Math.round(d+h*$)}</div>
    </div>`).join(""),s=Math.max(...a.map(i=>i.matches),1),n=a.slice(0,8).map(i=>`
    <div class="mrow reveal" data-goto="${u(i.name)}">
      <div class="nm">${u(i.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(i.matches/s*100)}"></div></div>
      <div class="val mono">${i.matches}</div>
    </div>`).join(""),c=(i,h,w)=>i.map((E,A)=>`
    <div class="an-row reveal" data-goto="${u(E.name)}">
      <div class="idx mono">${A+1}</div>
      <div class="nm">${u(E.name)}</div>
      <div class="val mono">${h(E)}</div>
      <div class="unit mono">${w(E)}</div>
    </div>`).join("");l("#an-grid").innerHTML=`
    <div class="an-panel">
      <div class="head"><h3>Top win rate</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${c(t,i=>i.winPct+"%",i=>i.matches+" matches")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Most active</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/></svg>
      </div>
      ${c(a,i=>i.matches,i=>"matches")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Biggest upsets</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${r.length?r.slice(0,8).map((i,h)=>`
        <div class="an-row reveal" data-goto="${u(i.winner)}">
          <div class="idx mono">${h+1}</div>
          <div class="nm">${u(i.winner)} <span style="color:var(--dimmer);font-weight:500">def.</span> ${u(i.loser)}</div>
          <div class="val mono">${i.score}</div>
          <div class="unit mono">+${Math.round(i.gap)} pts</div>
        </div>`).join(""):'<div class="empty">No upsets on record</div>'}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Most contested rivalries</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${p.map(([i,h],w)=>`
        <div class="an-row reveal">
          <div class="idx mono">${w+1}</div>
          <div class="nm">${i.split(" vs ").map(u).join(' <span style="color:var(--dimmer);font-weight:500">vs</span> ')}</div>
          <div class="val mono">${h}</div>
          <div class="unit mono">meetings</div>
        </div>`).join("")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Rating distribution</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 20V10M10 20V4M16 20v-8M2 20h20" stroke-linecap="round"/></svg>
      </div>
      <div class="hist">${o}</div>
    </div>
    <div class="an-panel">
      <div class="head"><h3>Matches played</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v5M12 15v5" stroke-linecap="round"/></svg>
      </div>
      ${n}
    </div>`;let m=()=>{L("#an-grid .hbar").forEach(i=>{i.style.height=i.dataset.h+"%"}),L("#an-grid .abar").forEach(i=>{i.style.width=i.dataset.w+"%"})};requestAnimationFrame(m),setTimeout(m,140),te()}function Ge(){l("#settings-body").innerHTML=de().map(e=>`
    <tr><td><b>${u(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${u(e.desc)}</div></td>
        <td class="val">${u(String(e.value))}</td></tr>`).join("")}var We=[{q:"How are the ratings calculated?",a:"Dynamic Glicko \u2014 the same model behind competitive chess and table-tennis rankings. Every recorded duel moves the numbers: beating a stronger opponent gains more, losing to a weaker one costs more. The full maths lives on the Method page."},{q:"Why did my rating drop even though I didn't play?",a:"That's the inactivity automation. Each 30-day rating period without a match grows your RD (uncertainty), and the visible rating subtracts half of it \u2014 so an idle rating slowly sinks on its own, exactly like the master sheet. Play one match and the drift stops."},{q:"What is RD, and why does it matter?",a:"RD (ratings deviation) is how certain the system is about your rating. New or idle players have a high RD; regular players have a low one. The board ranks the visible rating = Glicko \u2212 0.5 \xD7 RD, so uncertain ratings are held back until they've earned trust."},{q:"How do I get ranked on the leaderboard?",a:"Log at least 5 matches against at least 3 different opponents. Until then you're provisional \u2014 your rating is real and takes part in every calculation, but you aren't ranked yet."},{q:"What do the green and red arrows next to ratings mean?",a:"They show how your visible rating moved since the previous spreadsheet update: green \u25B2 means you climbed, red \u25BC means you dropped."},{q:"What does the \u201Cinactive\u201D tag mean?",a:"A qualified player is marked inactive \u2014 and hidden from the board \u2014 after 365 days without a dated match (legacy players without recorded dates get a 365-day grace window first). Your rating isn't deleted: come back, play a match, and you're active again."},{q:"Do my old 0\u2013100 ladder ratings still count?",a:"Yes. Historical scores are converted into Glicko starting points (old 80 \u2248 1500), so the ladder carries over. This site reproduces the master sheet's seeding exactly, including its low-end floor."},{q:"Two names on the board look like the same person \u2014 is that a bug?",a:"Possibly an alias. When we confirm two names are the same player, a name fix merges them everywhere \u2014 records, ratings and head-to-heads \u2014 without rewriting old matches. Report suspicious duplicates through the feedback button."},{q:"How do I get my duels recorded?",a:"Matches are logged by the team after official 1v1 duels. If a match is missing or has the wrong score, send feedback with the details and we'll fix it \u2014 corrections recalculate every rating instantly."},{q:"The numbers here differ from the Google Sheet \u2014 what do I do?",a:"They shouldn't: every figure on this site is recomputed from the raw results and validated against the official sheet down to the decimal. If you spot a gap, screenshot it and send feedback \u2014 that's a bug report we want."},{q:"Who runs this site?",a:"Alternator & interstellar. The leaderboard is data-driven \u2014 no manual rankings, no politics. Just duels."}];function ee(){let e=N().faq;return Array.isArray(e)&&e.length?e:We}function Ue(){l("#faq-list").innerHTML=ee().map((e,t)=>`
    <div class="faq-item reveal" data-faq="${t}">
      <button class="faq-q" aria-expanded="false">
        <span>${u(String(e.q||""))}</span>
        <svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="faq-a"><div class="faq-a-in">${u(String(e.a||""))}</div></div>
    </div>`).join(""),te()}document.addEventListener("click",e=>{let t=e.target.closest(".faq-q");if(!t)return;let a=t.closest(".faq-item"),r=a.classList.contains("open");L(".faq-item.open").forEach(v=>{v.classList.remove("open"),v.querySelector(".faq-q").setAttribute("aria-expanded","false")}),r||(a.classList.add("open"),t.setAttribute("aria-expanded","true"))});function q(){let e=l("#admin-wrap");if(!(sessionStorage.getItem(se)==="1")){e.innerHTML=`
    <div class="admin-gate">
      <div class="admin-card">
        <div class="lock">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
        </div>
        <h2>Admin portal</h2>
        <div class="sub">Restricted access. Owners only.</div>
        <label for="admin-pw">Password</label>
        <input id="admin-pw" type="password" autocomplete="off">
        <button class="btn btn-primary" id="admin-auth">-) Authenticate</button>
      </div>
    </div>`;let o=async()=>{let s=l("#admin-pw").value;try{let n=await fetch(Re,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:s})});if(n.ok){sessionStorage.setItem(se,"1"),sessionStorage.setItem(F,s),q(),y("Welcome back, commander.");return}if(n.status===429){y("Too many attempts \u2014 wait a few minutes.");return}}catch{}l("#admin-pw").style.borderColor="var(--red)",y("Wrong password.")};l("#admin-auth").addEventListener("click",o),l("#admin-pw").addEventListener("keydown",s=>{s.key==="Enter"&&o()});return}let a=B(),r=be().length,v=N(),p='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',g=Object.entries(v.aliases).map(([o,s])=>`
    <div class="log-item">
      <div class="txt"><b>${u(o)}</b> \u2192 <b>${u(s)}</b>${v.aliasNotes&&v.aliasNotes[o]?` <span style="color:var(--dimmer)">\u2014 ${u(v.aliasNotes[o])}</span>`:""}</div>
      <button class="icon-btn" data-alias-del="${u(o)}" title="Remove name fix">${p}</button>
    </div>`).join("")||'<div class="empty">No name fixes yet.</div>',d=v.inactive.map(o=>`
    <div class="log-item">
      <div class="txt"><b>${u(o)}</b> <span style="color:var(--dimmer)">\u2014 inactive</span></div>
      <button class="icon-btn" data-inact-del="${u(o)}" title="Mark active again">${p}</button>
    </div>`).join("")||'<div class="empty">Nobody marked inactive.</div>',b=Object.keys({...v.seeds||{},...v.seedGlicko||{},...v.seedRd||{}}).map(o=>`
    <div class="log-item">
      <div class="txt"><b>${u(o)}</b> \xB7 <span style="color:var(--dimmer)">old</span> <b class="mono">${u(String((v.seeds||{})[o]!=null?(v.seeds||{})[o]:"\u2014"))}</b>${(v.seedGlicko||{})[o]!=null?` \xB7 <span style="color:var(--dimmer)">glicko</span> <b class="mono">${u(String(v.seedGlicko[o]))}</b>`:""}${(v.seedRd||{})[o]!=null?` \xB7 <span style="color:var(--dimmer)">rd</span> <b class="mono">${u(String(v.seedRd[o]))}</b>`:""}</div>
      <button class="icon-btn" data-seed-del="${u(o)}" title="Remove seed">${p}</button>
    </div>`).join("")||'<div class="empty">No seed overrides \u2014 players start from the sheet values.</div>',f=de().map(o=>`
    <div class="set-row">
      <div class="lbl"><b>${u(o.name)}</b><div class="d">${u(String(o.desc||""))}</div></div>
      <input class="set-val mono" data-set-name="${u(o.name)}" value="${u(String(o.value))}">
    </div>`).join(""),$=o=>{let s=(o||"").trim().toLowerCase();return C().filter(c=>!s||c.a.toLowerCase().includes(s)||c.b.toLowerCase().includes(s)).slice(0,20).map(c=>`
      <div class="log-item fix-row" data-mkey="${c.key}">
        <div class="txt"><b>${u(c.a)}</b> <span style="color:var(--dimmer)">vs</span> <b>${u(c.b)}</b>${c.date?"":' <span class="tag legacy">legacy</span>'}</div>
        <input class="mono" data-f="sa" type="number" min="0" value="${c.sa}" title="Score 1">
        <input class="mono" data-f="sb" type="number" min="0" value="${c.sb}" title="Score 2">
        <input data-f="date" type="date" value="${c.date||""}" title="Match date">
        <button class="icon-btn" data-msave="${c.key}" title="Save fix"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-mdel="${c.key}" title="Delete match">${p}</button>
      </div>`).join("")||'<div class="empty">No matches found.</div>'};e.innerHTML=`
  <div class="admin-bar anim">
    <div class="title"><span>\u25CF</span> Admin console</div>
    <div class="spacer"></div>
    <button class="btn btn-primary" id="admin-publish" style="width:auto;margin:0">\u2191 Publish to everyone</button>
    <button class="btn btn-ghost" id="admin-export">Export log</button>
    <button class="btn btn-danger" id="admin-lock">Lock</button>
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
      <h3>Pending <span class="n">log</span> \u2014 ${a.length} local \xB7 ${r} published</h3>
      <div class="log-list" id="adm-list">
        ${a.length?a.map((o,s)=>`
          <div class="log-item">
            <div class="txt"><b>${u(o.a)}</b> ${o.sa}\u2013${o.sb} <b>${u(o.b)}</b></div>
            <div class="txt" style="color:var(--dimmer)">${u(o.date||"")}</div>
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
      <div class="log-list" id="ov-seed-list" style="margin-top:12px">${b}</div>
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
      <h3>Feedback <span class="n">inbox</span> <span style="color:var(--dimmer);font-size:12px;font-weight:500">\u2014 messages sent from the site</span></h3>
      <div class="log-list" id="fb-inbox"><div class="empty">Loading messages\u2026</div></div>
    </div>
  </div>

  <datalist id="player-list">${D.players.map(o=>`<option value="${u(o.name)}">`).join("")}</datalist>`,l("#admin-lock").addEventListener("click",()=>{sessionStorage.removeItem(se),sessionStorage.removeItem(F),q()}),l("#admin-publish").addEventListener("click",P);async function P(){let o=sessionStorage.getItem(F)||(window.prompt("Admin password:")||"").trim();if(!o){y("Publish cancelled.");return}let s=N(),n={},c=[];for(let[h,w]of Object.entries(s.matchEdits||{}))h.startsWith("a:")&&(n[h]=w);for(let h of s.matchRemoved||[])h.startsWith("a:")&&c.push(h);let m=C().filter(h=>h.admin).map(h=>({a:h.a,b:h.b,sa:h.sa,sb:h.sb,date:h.date||""})),i={matches:m,aliases:s.aliases||{},aliasNotes:s.aliasNotes||{},inactive:s.inactive||[],seeds:s.seeds||{},seedGlicko:s.seedGlicko||{},seedRd:s.seedRd||{},settings:s.settings||{},matchEdits:n,matchRemoved:c,faq:s.faq!=null?s.faq:[]};try{let h=await fetch(ne,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:o,doc:i,message:`Publish match log (${m.length} matches)`})}),w=await h.json().catch(()=>({}));if(!h.ok||!w.ok){h.status===403&&sessionStorage.removeItem(F),y("Publish failed: "+(w.error||"HTTP "+h.status));return}window.LB_PUB=i,window.LB_LOG=m,W([]),M({}),x(),q(),y("Published! Everyone sees it on their next visit.")}catch{y("Publish failed: network error.")}}l("#admin-export").addEventListener("click",()=>{let o=new Blob([JSON.stringify(B(),null,2)],{type:"application/json"}),s=document.createElement("a");s.href=URL.createObjectURL(o),s.download="match-log.json",s.click(),URL.revokeObjectURL(s.href),y("Log exported.")}),l("#adm-add").addEventListener("click",()=>{let o=l("#adm-a").value.trim(),s=l("#adm-b").value.trim(),n=parseInt(l("#adm-sa").value,10),c=parseInt(l("#adm-sb").value,10);if(!o||!s||o.toLowerCase()===s.toLowerCase()||!Number.isFinite(n)||!Number.isFinite(c)){y("Fill in both players and scores.");return}let m=B();m.unshift({a:o,b:s,sa:n,sb:c,date:l("#adm-date")?l("#adm-date").value||new Date().toISOString().slice(0,10):new Date().toISOString().slice(0,10)}),W(m),x(),q(),y(`${o} ${n}\u2013${c} ${s} added \u2014 site recalculated live.`)}),l("#adm-list").addEventListener("click",o=>{let s=o.target.closest("[data-del]");if(!s)return;let n=B();n.splice(parseInt(s.dataset.del,10),1),W(n),x(),q()}),l("#ov-alias-add").addEventListener("click",()=>{let o=l("#ov-alias-a").value.trim(),s=l("#ov-alias-b").value.trim(),n=(l("#ov-alias-note")||{}).value.trim();if(!o||!s){y("Fill both: the wrong name and the correct player.");return}let c=S();M({...c,aliases:{...c.aliases||{},[o]:s},aliasNotes:n?{...c.aliasNotes||{},[o]:n}:c.aliasNotes||{}}),x(),q(),y(`Name fix saved \u2014 "${o}" now counts as ${s}.`)}),l("#ov-alias-list").addEventListener("click",o=>{let s=o.target.closest("[data-alias-del]");if(!s)return;let n=S(),c={...n.aliases||{}},m={...n.aliasNotes||{}};delete c[s.dataset.aliasDel],delete m[s.dataset.aliasDel],M({...n,aliases:c,aliasNotes:m}),x(),q()}),l("#ov-inact-toggle").addEventListener("click",()=>{let o=l("#ov-inact-n").value.trim();if(!o){y("Type a player name first.");return}let s=S(),n=N().inactive||[],c=n.includes(o)?n.filter(m=>m!==o):[...n,o];M({...s,inactive:c}),x(),q(),y(c.includes(o)?`${o} marked inactive.`:`${o} marked active again.`)}),l("#ov-inact-list").addEventListener("click",o=>{let s=o.target.closest("[data-inact-del]");if(!s)return;let n=S();M({...n,inactive:(N().inactive||[]).filter(c=>c!==s.dataset.inactDel)}),x(),q()}),l("#ov-seed-add").addEventListener("click",()=>{let o=l("#ov-seed-n").value.trim(),s=l("#ov-seed-v").value.trim(),n=l("#ov-seed-g").value.trim(),c=l("#ov-seed-rd").value.trim();if(!o){y("Pick a player first.");return}if(s===""&&n===""&&c===""){y("Enter an Old 0\u2013100 rating, or a Starting Glicko / RD.");return}let m=S(),i={...m.seeds||{}},h={...m.seedGlicko||{}},w={...m.seedRd||{}};s!==""&&Number.isFinite(Number(s))?i[o]=Number(s):delete i[o],n!==""&&Number.isFinite(Number(n))?h[o]=Number(n):delete h[o],c!==""&&Number.isFinite(Number(c))?w[o]=Number(c):delete w[o],M({...m,seeds:i,seedGlicko:h,seedRd:w}),x(),q(),y(`Seed saved for ${o}.`)}),l("#ov-seed-list").addEventListener("click",o=>{let s=o.target.closest("[data-seed-del]");if(!s)return;let n=s.dataset.seedDel,c=S(),m={...c.seeds||{}};delete m[n];let i={...c.seedGlicko||{}};delete i[n];let h={...c.seedRd||{}};delete h[n],M({...c,seeds:m,seedGlicko:i,seedRd:h}),x(),q()}),l("#ov-settings").addEventListener("change",o=>{let s=o.target.closest("[data-set-name]");if(!s)return;let n=S();M({...n,settings:{...n.settings||{},[s.dataset.setName]:s.value}}),x(),q(),y("Setting applied \u2014 everything recalculated.")}),l("#ov-set-reset").addEventListener("click",()=>{let o=S();M({...o,settings:{}}),x(),q(),y("Settings back to the master sheet values.")}),l("#ov-mq").addEventListener("input",()=>{l("#ov-mresults").innerHTML=$(l("#ov-mq").value)}),l("#ov-mresults").addEventListener("click",o=>{let s=o.target.closest("[data-msave]"),n=o.target.closest("[data-mdel]");if(s){let c=s.closest("[data-mkey]"),m=c.dataset.mkey,i=w=>c.querySelector(`[data-f="${w}"]`).value,h=S();M({...h,matchEdits:{...h.matchEdits||{},[m]:{sa:+i("sa"),sb:+i("sb"),date:i("date")}}}),x(),l("#ov-mresults").innerHTML=$(l("#ov-mq").value),y("Match fixed \u2014 ratings recalculated.")}else if(n){let c=n.dataset.mdel,m=S();M({...m,matchRemoved:[...new Set([...m.matchRemoved||[],c])]}),x(),l("#ov-mresults").innerHTML=$(l("#ov-mq").value),y("Match deleted \u2014 ratings recalculated.")}}),l("#pl-add").addEventListener("click",()=>{let o=l("#pl-name").value.trim(),s=l("#pl-opp").value.trim(),n=parseInt(l("#pl-sa").value,10),c=parseInt(l("#pl-sb").value,10);if(!o||!s||o.toLowerCase()===s.toLowerCase()||!Number.isFinite(n)||!Number.isFinite(c)){y("A player needs a name, an opponent and both scores \u2014 at least 1 result.");return}if(I[_(o)]){y(`${o} already exists \u2014 log a match for them instead.`);return}let m=B();m.unshift({a:o,b:s,sa:n,sb:c,date:(l("#pl-date")||{}).value||new Date().toISOString().slice(0,10)}),W(m);let i=(l("#pl-seed")||{}).value.trim();if(i!==""&&Number.isFinite(Number(i))){let h=S();M({...h,seeds:{...h.seeds||{},[_(o)]:Number(i)}})}x(),q(),y(`${o} added with their first result \u2014 ${n}\u2013${c} vs ${s}.`)}),l("#pl-del-btn").addEventListener("click",()=>{let o=l("#pl-del").value.trim(),s=_(o),n=C().filter(R=>R.a===s||R.b===s);if(!n.length){y(`No player called "${o}" with matches found.`);return}if(!window.confirm(`Remove ${s} and ${n.length} match${n.length===1?"":"es"}? This recalculates every rating.`))return;let c=S(),m=[...c.matchRemoved||[]],i=[];n.forEach(R=>{R.key.startsWith("l:")?i.push(parseInt(R.key.slice(2),10)):m.push(R.key)});let h=B();i.sort((R,ke)=>ke-R).forEach(R=>h.splice(R,1)),W(h);let w={...c.seeds||{}},E={...c.seedGlicko||{}},A={...c.seedRd||{}};delete w[s],delete E[s],delete A[s],M({...c,matchRemoved:[...new Set(m)],seeds:w,seedGlicko:E,seedRd:A,inactive:(N().inactive||[]).filter(R=>R!==s)}),x(),q(),y(`${s} removed with ${n.length} match${n.length===1?"":"es"}. Publish to make it public.`)});let j=()=>{let o=ee();l("#faq-admin-list").innerHTML=o.map((s,n)=>`
      <div class="log-item fix-row" data-faq-idx="${n}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${u(String(s.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${u(String(s.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${n}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${n}" title="Delete question">${p}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};j(),l("#faq-admin-list").addEventListener("click",o=>{let s=o.target.closest("[data-faq-save]"),n=o.target.closest("[data-faq-del]"),c=ee().map(i=>({...i}));if(s){let i=s.closest("[data-faq-idx]");c[parseInt(s.dataset.faqSave,10)]={q:i.querySelector('[data-fq="q"]').value.trim(),a:i.querySelector('[data-fq="a"]').value.trim()}}else if(n)c.splice(parseInt(n.dataset.faqDel,10),1);else return;let m=S();M({...m,faq:c}),j(),y("Q&A updated \u2014 publish to make it public.")}),l("#faq-add").addEventListener("click",()=>{let o=l("#faq-new-q").value.trim(),s=l("#faq-new-a").value.trim();if(!o||!s){y("Fill in both the question and the answer.");return}let n=S();M({...n,faq:[...ee().map(c=>({...c})),{q:o,a:s}]}),j(),y("Question added.")}),l("#faq-reset").addEventListener("click",()=>{let o=S();M({...o,faq:null}),j(),y("Q&A back to the built-in list.")}),(async function(){let s=l("#fb-inbox"),n=sessionStorage.getItem(F);if(!n){s.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let c=await fetch(V+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:n})}),m=await c.json().catch(()=>({}));if(!c.ok||!m.ok){s.innerHTML=`<div class="empty">Could not load messages (${u(m.error||"HTTP "+c.status)}).</div>`;return}let i=m.items||[];s.innerHTML=i.map(h=>`
        <div class="log-item fix-row" data-fb-id="${u(h.id)}" style="flex-wrap:wrap">
          <div class="txt" style="flex:1;min-width:220px">
            <b>${u(h.name||"Anonymous")}</b>${h.contact?` <span style="color:var(--dimmer)">\xB7 ${u(h.contact)}</span>`:""}
            <span class="tag ${h.status==="replied"?"live":"fresh"}" style="margin-left:6px">${u(h.status)}</span>
            <div style="color:var(--dim);font-size:13px;margin-top:4px">${u(h.message)}</div>
            ${h.reply?`<div style="color:var(--gold);font-size:12.5px;margin-top:4px">\u21A9 ${u(h.reply)}</div>`:""}
          </div>
          <input class="set-val" data-fb-reply placeholder="Write a reply\u2026" style="flex:1;min-width:180px" value="${u(h.reply||"")}">
          <button class="icon-btn" data-fb-send title="Send reply"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-del title="Delete message">${p}</button>
        </div>`).join("")||'<div class="empty">No messages yet.</div>'}catch{s.innerHTML='<div class="empty">Network error loading messages.</div>'}})(),l("#fb-inbox").addEventListener("click",async o=>{let s=o.target.closest("[data-fb-send]"),n=o.target.closest("[data-fb-del]");if(!s&&!n)return;let c=o.target.closest("[data-fb-id]"),m=c.dataset.fbId,i=sessionStorage.getItem(F);try{if(s){let h=c.querySelector("[data-fb-reply]").value;if(!(await fetch(V+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:i,id:m,reply:h})}).then(E=>E.json())).ok){y("Reply failed.");return}y("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(V+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:i,id:m})}).then(w=>w.json())).ok){y("Delete failed.");return}c.remove(),y("Message deleted.")}}catch{y("Network error.")}})}l("#search").addEventListener("input",e=>{let t=e.target.value.trim().toLowerCase(),a=l("#search-drop");if(!t){a.classList.remove("show");return}let r=D.players.filter(v=>v.name.toLowerCase().includes(t)).slice(0,8);if(!r.length){a.classList.remove("show");return}a.innerHTML=r.map(v=>`
    <a class="drop-row" href="#/player/${oe(v.name)}">
      ${v.rank?Z(v.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${u(v.name)}</span>
      <span class="mono" style="margin-left:auto;color:var(--dim)">${v.rating.toFixed(1)}</span>
    </a>`).join(""),a.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||l("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(l("#search-drop").classList.remove("show"),l("#search").value="")});var V=ne.replace(/\/publish$/,"/feedback"),$e="tt1v1_fb_tickets";function ze(){try{return JSON.parse(localStorage.getItem($e)||"[]")}catch{return[]}}function Je(e){let t=ze();t.push({id:e,ts:Date.now()});try{localStorage.setItem($e,JSON.stringify(t.slice(-20)))}catch{}}function Qe(){let e=l("#fb-overlay"),t=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>l("#fb-msg").focus(),180)},a=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};l("#fab-feedback").addEventListener("click",t),l("#fb-close").addEventListener("click",a),l("#fb-done").addEventListener("click",a),e.addEventListener("click",d=>{d.target===e&&a()}),document.addEventListener("keydown",d=>{d.key==="Escape"&&e.classList.contains("show")&&a()});let r=l("#faq-feedback-btn");r&&r.addEventListener("click",t);let v=l("#fb-msg"),p=l("#fb-count-n");v.addEventListener("input",()=>{p.textContent=String(v.value.length);try{localStorage.setItem("tt1v1_fb_draft",v.value)}catch{}});try{let d=localStorage.getItem("tt1v1_fb_draft");d&&(v.value=d,p.textContent=String(d.length))}catch{}let g=l("#fb-send");g.addEventListener("click",async()=>{let d=v.value.trim();if(d.length<5){v.focus(),v.classList.add("fb-nudge"),setTimeout(()=>v.classList.remove("fb-nudge"),500),y("Write a message first \u2014 a few words is plenty.");return}g.classList.add("busy"),g.disabled=!0;try{let b=await fetch(V,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:l("#fb-name").value.trim(),contact:l("#fb-contact").value.trim(),message:d})}),f=await b.json().catch(()=>({}));if(!b.ok||!f.ok){y("Could not send: "+(f.error||"HTTP "+b.status)+" \u2014 try again later.");return}Je(f.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}l("#fb-ticket-code").textContent=f.id,l("#fb-view-form").hidden=!0,l("#fb-view-done").hidden=!1}catch{y("Network error \u2014 your message was not sent.")}finally{g.classList.remove("busy"),g.disabled=!1}}),l("#fb-check").addEventListener("click",async()=>{let d=l("#fb-ticket-in").value.trim(),b=l("#fb-reply-out");if(d){b.classList.add("show"),b.textContent="Checking\u2026";try{let f=await fetch(V+"/status?id="+encodeURIComponent(d)),$=await f.json().catch(()=>({}));if(!f.ok||!$.ok){b.textContent="No message found with that ticket code.";return}b.innerHTML=$.reply?`<b>Reply from the team:</b> ${u($.reply)}`:`Status: <b>${u($.status)}</b> \u2014 your message is being reviewed, check back soon.`}catch{b.textContent="Network error \u2014 try again later."}}})}function Ve(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let t=null,a=()=>{e.classList.remove("show"),t=null};document.addEventListener("mouseover",r=>{let v=r.target.closest&&r.target.closest("[title],[data-tip]");if(!v)return;v.hasAttribute("title")&&(v.setAttribute("data-tip",v.getAttribute("title")),v.removeAttribute("title"));let p=v.getAttribute("data-tip");if(!p)return;t=v,e.textContent=p;let g=v.getBoundingClientRect(),d=g.top<52;e.classList.toggle("below",d),e.style.left=Math.max(10,Math.min(window.innerWidth-10,g.left+g.width/2))+"px",e.style.top=(d?g.bottom+8:g.top-8)+"px",e.classList.add("show")}),document.addEventListener("mouseout",r=>{if(!t)return;let v=r.relatedTarget;v&&v.closest&&v.closest("[title],[data-tip]")===t||a()}),window.addEventListener("scroll",a,{passive:!0})}var me;function y(e){let t=l("#toast");t.textContent=e,t.classList.add("show"),clearTimeout(me),me=setTimeout(()=>t.classList.remove("show"),2600)}var U;function te(){U&&U.disconnect(),U=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add("in"),L(".cu",t.target).forEach(a=>le(a,parseFloat(a.dataset.target),{dec:parseInt(a.dataset.dec||0)})),U.unobserve(t.target))})},{threshold:.12}),L(".reveal").forEach(e=>U.observe(e))}(function(){let t=l("#scroll-progress"),a=l("#to-top"),r=l("#page-home .hero-row"),v=document.querySelector(".topbar"),p=()=>{let g=window.scrollY,d=document.documentElement.scrollHeight-window.innerHeight;t&&(t.style.width=(d>0?g/d*100:0)+"%"),a&&a.classList.toggle("show",g>640),v&&v.classList.toggle("scrolled",g>10),r&&g<1400&&(r.style.transform=`translateY(${g*.14}px)`,r.style.opacity=String(Math.max(.3,1-g/950)))};window.addEventListener("scroll",p,{passive:!0}),a&&a.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),p()})();x();ve();ce();Qe();Ve();function ae(e,t){let a=e.indexOf("window."+t);if(a<0)return null;let r=e.indexOf("=",a);for(;r<e.length&&"{[".indexOf(e[r])<0;)r++;let v=0,p=!1,g="",d=!1;for(let b=r;b<e.length;b++){let f=e[b];if(p){d?d=!1:f==="\\"?d=!0:f===g&&(p=!1);continue}if(f==='"'||f==="'"){p=!0,g=f;continue}if(f==="{"||f==="[")v++;else if((f==="}"||f==="]")&&(v--,v<=0))return JSON.parse(e.slice(r,b+1))}return null}(async()=>{try{let e=await fetch("log.js?cb="+Date.now(),{cache:"no-store"});if(!e.ok)return;let t=await e.text(),a=ae(t,"LB_PUB")||(ae(t,"LB_LOG")?{matches:ae(t,"LB_LOG")}:null);if(!a)return;JSON.stringify(a)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=a,window.LB_LOG=a.matches||[],x(),ve(),ce())}catch{}})();})();
