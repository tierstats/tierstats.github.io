/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var G=window.LB_DATA,oe="https://tierstats-publish.tierstats.workers.dev/publish",l=(e,s=document)=>s.querySelector(e),L=(e,s=document)=>[...s.querySelectorAll(e)],u=e=>String(e).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),le=e=>encodeURIComponent(String(e)),Le=e=>decodeURIComponent(e);function re(e,s,a={}){let c=a.dur||1200,v=a.dec||0,p=performance.now(),g=parseFloat(e.textContent)||0;function d(b){let f=Math.min(1,(b-p)/c),$=1-Math.pow(1-f,3);e.textContent=(g+(s-g)*$).toFixed(v),f<1&&requestAnimationFrame(d)}requestAnimationFrame(d)}var xe='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',Me='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function Z(e,s=""){let a=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",c=e<=3?e===1?xe:Me:"";return`<div class="rank-badge ${a} ${s}" title="Rank #${e}">${c}<span class="num">${e}</span></div>`}var I={},O=[],D={players:[],byName:{},qualified:[]},z={};function Se(){for(let e in z)delete z[e];Object.entries(G.aliases).forEach(([e,s])=>{z[e.toLowerCase()]=s}),Object.entries(N().aliases||{}).forEach(([e,s])=>{z[String(e).toLowerCase()]=s})}var _=e=>{let s=String(e).trim(),a=new Set;for(;;){let c=z[s.toLowerCase()];if(!c||c===s||a.has(s))return s;a.add(s),s=c}};function ue(e){let s=[];return C().forEach(a=>{let c=(v,p,g)=>({opp:v,for_:p,against:g,res:p>g?"W":p<g?"L":"D",date:a.date});a.a===e?s.push(c(a.b,a.sa,a.sb)):a.b===e&&s.push(c(a.a,a.sb,a.sa))}),s}function qe(e){let s={};return ue(e).forEach(a=>{let c=s[a.opp]||(s[a.opp]={w:0,l:0,d:0,pf:0,pa:0});c[a.res.toLowerCase()]+=1,c.pf+=a.for_,c.pa+=a.against}),Object.entries(s).map(([a,c])=>({opp:a,...c})).sort((a,c)=>c.w+c.l+c.d-(a.w+a.l+a.d)||c.w-a.w)}function Ee(e){let s=I[e]||{};return s.provisional?'<span class="tag prov">provisional</span>':s.inactive?'<span class="tag inact">inactive</span>':'<span class="tag legacy">legacy</span>'}function te(e){let s=e.delta!=null?e.delta:0;if(Math.abs(s)<.05)return"";let a=s>0;return`<span class="delta ${a?"up":"down"}" title="${a?"up":"down"} ${Math.abs(s).toFixed(1)} since the previous sheet update">${a?"\u25B2":"\u25BC"} ${Math.abs(s).toFixed(1)}</span>`}var fe="tt1v1_admin_log_v1",ae="tt1v1_admin_ok",F="tt1v1_admin_pw",Re=oe.replace(/\/publish$/,"/verify");function B(){try{return JSON.parse(localStorage.getItem(fe)||"[]")}catch{return[]}}function W(e){try{localStorage.setItem(fe,JSON.stringify(e))}catch{}}var ge="tt1v1_admin_over_v1";function S(){try{return JSON.parse(localStorage.getItem(ge)||"{}")||{}}catch{return{}}}function M(e){try{localStorage.setItem(ge,JSON.stringify(e))}catch{}}function N(){let e=window.LB_PUB||{},s=S();return{aliases:{...e.aliases||{},...s.aliases||{}},aliasNotes:{...e.aliasNotes||{},...s.aliasNotes||{}},seeds:{...e.seeds||{},...s.seeds||{}},seedGlicko:{...e.seedGlicko||{},...s.seedGlicko||{}},seedRd:{...e.seedRd||{},...s.seedRd||{}},settings:{...e.settings||{},...s.settings||{}},matchEdits:{...e.matchEdits||{},...s.matchEdits||{}},inactive:s.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...s.matchRemoved||[]])],faq:s.faq!=null?s.faq:e.faq!=null?e.faq:null}}function be(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function C(){let e=N(),s=e.matchEdits||{},a=new Set(e.matchRemoved||[]),c=(d,b)=>{if(a.has(b))return null;let f=s[b],$=f?{...d,sa:f.sa,sb:f.sb,date:f.date!=null?f.date:d.date}:d;return{...$,a:_($.a),b:_($.b),sa:+$.sa,sb:+$.sb,key:b}},v=B().map((d,b)=>c({...d,admin:!0,published:!1},"l:"+b)).filter(Boolean),p=be().map((d,b)=>c({...d,admin:!0,published:!0},"p:"+b)).filter(Boolean),g=G.matches.map((d,b)=>c({...d,admin:!1,published:!1},"a:"+b)).filter(Boolean).reverse();return v.concat(p,g)}var k={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},K=864e5,Q=Math.log(10)/400,ye=e=>1/Math.sqrt(1+3*Q*Q*e*e/(Math.PI*Math.PI)),Te=(e,s,a)=>1/(1+Math.pow(10,-ye(a)*(e-s)/400));function we(e){let s=N().seeds||{};return s[e]!=null&&s[e]!==""?Number(s[e]):G.seeds[e]}function Ne(e){let s=(N().seedGlicko||{})[e],a=(N().seedRd||{})[e],c=s!=null&&s!==""?Number(s):null,v=a!=null&&a!==""?Number(a):null;if(c!=null||v!=null)return[c??k.unratedR,v??k.unratedRd];let p=we(e);return p!=null?[Math.max(k.seedMid+(p-k.oldMid)*k.ptsPer,k.minSeed),k.knownRd]:[k.unratedR,k.unratedRd]}function me(e,s,a){let c=0,v=0;for(let[g,d,b]of a){let f=ye(d),$=Te(e,g,d);c+=f*f*$*(1-$),v+=f*(b-$)}if(c*=Q*Q,c<=0)return[e,s];let p=1/(s*s)+c;return[e+Q/p*v,Math.sqrt(1/p)]}function Oe(e,s){let a=Math.pow(10,s),c=e*a,v=Math.floor(c);return Math.abs(c-v-.5)<1e-6?(v%2===0?v:v+1)/a:Math.round(c)/a}var de=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(k.periodDays*K)),J=de(k.graceStart),Ce={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function ce(){let e=N().settings||{};return(G.settings||[]).map(s=>({...s,value:Object.prototype.hasOwnProperty.call(e,s.name)?e[s.name]:s.value}))}function Ae(){for(let e of ce()){let s=Ce[e.name];if(!s)continue;if(s==="graceStart"){let c=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(c)&&(k.graceStart=c);continue}let a=Number(e.value);Number.isFinite(a)&&(k[s]=a)}J=de(k.graceStart),L(".cons-val").forEach(e=>{e.textContent=String(k.conservative)}),L(".min-matches-val").forEach(e=>{e.textContent=String(k.minMatches)}),L(".min-opp-val").forEach(e=>{e.textContent=String(k.minOpp)})}function je(){Ae(),Se();let e={},s=t=>{if(!e[t]){let[n,r]=Ne(t);e[t]={name:t,r:n,rd:r,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[t]},a=(t,n,r,m,i,h)=>{let w=s(t);w.games++,w.opps.add(n),r>m?w.w++:r<m?w.l++:w.d++,w.lastIdx=h,i&&(w.lastDate=i)},c={};for(let t of C()){if(t.date)continue;let n=t.a,r=t.b,m=t.sa>t.sb?1:t.sa<t.sb?0:.5;(c[n]=c[n]||[]).push([r,m]),(c[r]=c[r]||[]).push([n,1-m]),a(n,r,t.sa,t.sb,"",J),a(r,n,t.sb,t.sa,"",J)}let v={};for(let t in c)v[t]=[s(t).r,s(t).rd];for(let t in c){let[n,r]=me(v[t][0],v[t][1],c[t].map(([m,i])=>[v[m][0],v[m][1],i]));s(t).r=n,s(t).rd=r}let p=new Map;for(let t of C().filter(n=>n.date).slice().reverse()){let n=t.date,r=de(n);p.has(r)||p.set(r,[]),p.get(r).push({a:_(t.a),b:_(t.b),sa:+t.sa,sb:+t.sb,date:n})}for(let t of[...p.keys()].sort((n,r)=>n-r)){for(let m in e){let i=e[m],h=t-(i.lastIdx==null?J:i.lastIdx);h>0&&(i.rd=Math.min(Math.sqrt(i.rd*i.rd+k.growth*k.growth*h),k.maxRd))}let n={};for(let m of p.get(t)){let i=m.sa>m.sb?1:m.sa<m.sb?0:.5;(n[m.a]=n[m.a]||[]).push([m.b,i]),(n[m.b]=n[m.b]||[]).push([m.a,1-i]),a(m.a,m.b,m.sa,m.sb,m.date,t),a(m.b,m.a,m.sb,m.sa,m.date,t)}let r={};for(let m in n)r[m]=[s(m).r,s(m).rd];for(let m in n){let[i,h]=me(r[m][0],r[m][1],n[m].map(([w,E])=>[r[w][0],r[w][1],E]));s(m).r=i,s(m).rd=h}}let g=Object.values(e).map(t=>({name:t.name,glicko:t.r,rd:t.rd,rating:t.r-k.conservative*t.rd,matches:t.games,w:t.w,l:t.l,d:t.d,winPct:t.games?Oe(t.w/t.games*100,1):0,opponents:t.opps.size,avgOpp:0,lastMatch:t.lastDate||"",provisional:!(t.games>=k.minMatches&&t.opps.size>=k.minOpp),inactive:!1})),d={};g.forEach(t=>{d[t.name]=t.glicko}),g.forEach(t=>{let n=0;e[t.name].opps.forEach(r=>{n+=d[r]!=null?d[r]:k.unratedR}),t.avgOpp=e[t.name].opps.size?n/e[t.name].opps.size:0});let b=Date.now(),f=Math.floor(b/(k.periodDays*K));for(let t in e){let n=e[t],r=f-(n.lastIdx==null?J:n.lastIdx);r>0&&(n.rd=Math.min(Math.sqrt(n.rd*n.rd+k.growth*k.growth*r),k.maxRd))}g.forEach(t=>{t.glicko=e[t.name].r,t.rd=e[t.name].rd,t.rating=t.glicko-k.conservative*t.rd;let n=(G.prevRatings||{})[t.name];t.delta=n!=null?t.rating-n:0});let $=Date.parse(k.graceStart+"T00:00:00Z")+k.graceDays*K,P=new Set([...G.inactiveList||[],...N().inactive||[]]);g.forEach(t=>{t.inactive=P.has(t.name)||(t.lastMatch?b-Date.parse(t.lastMatch+"T00:00:00Z")>k.inactiveDays*K:b>$)});let j=g.filter(t=>!t.provisional&&!t.inactive).sort((t,n)=>n.rating-t.rating);j.forEach((t,n)=>{t.rank=n+1}),g.sort((t,n)=>n.rating-t.rating);let o={};return g.forEach(t=>{o[t.name]=t}),{players:g,byName:o,qualified:j}}function x(){D=je(),I=D.byName,O=D.qualified}var De=["page-home","page-player","page-matches","page-roster","page-analytics","page-method","page-faq","page-admin"];function ve(){let e=location.hash||"#/";De.forEach(v=>l("#"+v).classList.remove("active"));let s="#/"+(e.split("/")[1]||"");L(".nav a").forEach(v=>{let p=v.getAttribute("href");v.classList.toggle("active",p===s||e==="#/"&&p==="#/")});let a=l("#nav-glide"),c=document.querySelector(".nav a.active");a&&c?(a.style.width=c.offsetWidth+"px",a.style.transform=`translateX(${c.offsetLeft}px)`,a.style.opacity="1"):a&&(a.style.opacity="0"),e.startsWith("#/player/")?(Be(Le(e.slice(9))),l("#page-player").classList.add("active"),window.scrollTo({top:0,behavior:"instant"in window?"instant":"auto"})):e==="#/matches"?(_e(),l("#page-matches").classList.add("active"),window.scrollTo(0,0)):e==="#/roster"?(Fe(),l("#page-roster").classList.add("active"),window.scrollTo(0,0)):e==="#/analytics"?(He(),l("#page-analytics").classList.add("active"),window.scrollTo(0,0)):e==="#/method"?(Ge(),l("#page-method").classList.add("active"),window.scrollTo(0,0)):e==="#/faq"?(Ue(),l("#page-faq").classList.add("active"),window.scrollTo(0,0)):e==="#/admin"?(q(),l("#page-admin").classList.add("active"),window.scrollTo(0,0)):(pe(),l("#page-home").classList.add("active"),requestAnimationFrame(Pe)),se()}window.addEventListener("hashchange",ve);function pe(){H="all",T={key:"rank",dir:1},L(".chip[data-filter]").forEach(p=>p.classList.toggle("on",p.dataset.filter==="all")),L(".sortable").forEach(p=>p.classList.remove("sorted","asc"));let e=l('.sortable[data-key="rank"]');e&&e.classList.add("sorted");let s=C().length,a=D.players.length,c=O[0],v=Math.round(O.reduce((p,g)=>p+g.rd,0)/O.length);l("#hero-matches").textContent=s,l("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">Ranked players</div>
      <div class="v"><span class="cu" data-target="${O.length}">0</span><small>/ ${a} total</small></div></div>
    <div class="stat-card"><div class="k">Matches logged</div>
      <div class="v"><span class="cu" data-target="${s}">0</span></div></div>
    <div class="stat-card"><div class="k">Highest rating</div>
      <div class="v"><span class="cu" data-target="${c.rating}" data-dec="1">0</span><small>${u(c.name)}</small></div></div>
    <div class="stat-card"><div class="k">Avg certainty (RD)</div>
      <div class="v"><span class="cu" data-target="${v}" data-dec="1">0</span><small>lower = surer</small></div></div>`,l("#fl-cards").innerHTML=O.slice(0,5).map((p,g)=>`
    <div class="fl-card r${g+1}${g===0?" champ":""} reveal" data-goto="${u(p.name)}">
      <div class="rd">RD ${p.rd.toFixed(0)}</div>
      ${Z(p.rank)}
      ${g===0?'<div class="champ-tag">#1 Tank</div>':""}
      <div class="nm">${u(p.name)}</div>
      <div class="rating"><span class="big">${Math.round(p.rating)}</span><span class="unit">Glicko</span>${te(p)}</div>
      <div class="meta">
        <span><span class="w">${p.w}W</span> <span class="l">${p.l}L</span> ${p.d}D</span>
        <span style="margin-left:auto">${p.winPct}%</span>
      </div>
    </div>`).join(""),l("#fl-rows").innerHTML=O.slice(5,10).map(p=>`
    <div class="fl-row reveal" data-goto="${u(p.name)}">
      ${Z(p.rank,"sm")}
      <div class="nm">${u(p.name)}</div>
      <div class="rating">${Math.round(p.rating)}${te(p)}</div>
      <div class="rec"><span class="w">${p.w}W</span> \xB7 <span class="l">${p.l}L</span> \xB7 ${p.d}D</div>
      <div class="pct">${p.winPct}%</div>
      <div class="go">\u203A</div>
    </div>`).join(""),Y(),Ie()}function Ie(){let e=C().slice(0,10);l("#battles-grid").innerHTML=e.map(s=>{let a=s.sa>s.sb,c=s.sb>s.sa;return`
    <div class="battle-row reveal" data-goto="${u(a?s.a:s.b)}">
      <div class="who ${a?"win":"lose"}" data-goto="${u(s.a)}">${u(s.a)}</div>
      <div class="vs">vs</div>
      <div class="who r ${c?"win":"lose"}" data-goto="${u(s.b)}">${u(s.b)}</div>
      <div class="sc mono"><span class="${a?"win":"lose"}">${s.sa}</span> \u2013 <span class="${c?"win":"lose"}">${s.sb}</span></div>
      <div class="dt">${s.date||(s.admin&&!s.published?"just now":"legacy")}</div>
    </div>`}).join("")}function Y(e="all",s="rank",a=1){let c=l("#lb-body"),p=(e==="all"&&X?O:D.players).slice().map(d=>({...d,rank:d.rank!=null?d.rank:9999}));ne&&(p=p.filter(d=>d.name.toLowerCase().includes(ne))),e==="provisional"?p=p.filter(d=>(I[d.name]||{}).provisional):e==="inactive"?p=p.filter(d=>(I[d.name]||{}).inactive):e==="veterans"?p=p.filter(d=>d.matches>=15):e==="rising"&&(p=p.filter(d=>d.winPct>=60&&d.matches>=5)),p.sort((d,b)=>{let f=d[s],$=b[s];return(typeof f=="string"?f.localeCompare($):f-$)*a});let g=new Map;L(".lb-row",c).forEach(d=>g.set(d.dataset.name,d.getBoundingClientRect().top)),c.innerHTML=p.map(d=>`
    <div class="lb-row ${d.rank<=3?"top"+d.rank:""}" data-name="${u(d.name)}" data-goto="${u(d.name)}">
      <div class="rank">${d.rank<=O.length?Z(d.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="pname">${u(d.name)}</div></div>
      <div class="rating-cell mono">${d.rating.toFixed(1)}${te(d)}</div>
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
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?"Nobody is inactive right now \u2014 a player goes inactive 365 days after their last match (or when flagged in the master sheet).":e==="provisional"?"No provisional players right now.":"No players match this filter."}</div>`,requestAnimationFrame(()=>{L(".lb-row",c).forEach(d=>{let b=g.get(d.dataset.name),f=d.getBoundingClientRect().top;b!==void 0&&Math.abs(b-f)>1&&(d.style.transform=`translateY(${b-f}px)`,d.style.transition="none",requestAnimationFrame(()=>{d.style.transition="transform .5s cubic-bezier(.22,.8,.24,1)",d.style.transform=""}))}),L(".bar-fill",c).forEach(d=>{d.style.width=d.dataset.w+"%"})})}var H="all",T={key:"rank",dir:1},ne="",X=!0;function Pe(){L("#stat-strip .cu").forEach(e=>re(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),L(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}l("#lb-qual").addEventListener("click",()=>{X=!X,l("#lb-qual").classList.toggle("on",X),Y(H,T.key,T.dir)});l("#lb-filter").addEventListener("input",e=>{ne=e.target.value.trim().toLowerCase(),Y(H,T.key,T.dir)});document.addEventListener("click",e=>{let s=e.target.closest(".chip");if(s&&s.dataset.filter){L(".chip[data-filter]").forEach(v=>v.classList.remove("on")),s.classList.add("on"),H=s.dataset.filter,Y(H,T.key,T.dir);return}let a=e.target.closest(".sortable");if(a){let v=a.dataset.key;T.dir=T.key===v?-T.dir:1,T.key=v,L(".sortable").forEach(p=>p.classList.remove("sorted","asc")),a.classList.add("sorted"),T.dir===1&&a.classList.add("asc"),Y(H,T.key,T.dir);return}let c=e.target.closest("[data-goto]");c&&(e.stopPropagation(),location.hash="#/player/"+le(c.dataset.goto))});function Be(e){let s=I[e],a=l("#page-player");if(!s){a.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">
      No player called "<b>${u(e)}</b>" found. <a href="#/" style="color:var(--gold)">Back to the leaderboard</a>.
    </div></div></div>`;return}let c=O.find(f=>f.name===e),v=ue(e),p=v.slice(0,10),g=qe(e),d=we(e),b=Math.max(3,Math.min(100,100-s.rd/120*100));a.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">\u2190 All rankings</a>
    <div class="player-hero anim">
      <div class="player-top">
        ${c?Z(c.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${u(s.name)}</div>
          <div class="player-rankline">
            ${c?`Ranked <b>#${c.rank}</b> of ${O.length} qualified players`:"Unranked \u2014 not enough recent games for the board"}
            ${d!=null?` \xB7 seeded from an original rating of <b>${d}</b>`:""}
            ${s.provisional?' \xB7 <span class="tag prov">provisional</span>':""}
            ${s.inactive?' \xB7 <span class="tag inact">inactive</span>':""}
          </div>
        </div>
        <div class="player-rating-block">
          <div class="lbl">Visible rating</div>
          <div class="big mono" id="pv-rating">0</div>
          ${te(s)}
          <div class="rd-bar">
            <div class="bar-track"><div class="bar-fill" style="width:${b}%"></div></div>
            <div class="caption"><span>certainty</span><span class="mono">RD ${s.rd.toFixed(1)}</span></div>
          </div>
        </div>
      </div>
      <div class="pstat-grid">
        <div class="pstat"><div class="k">Glicko</div><div class="v mono">${s.glicko.toFixed(1)}</div></div>
        <div class="pstat"><div class="k">Matches</div><div class="v mono">${s.matches}</div></div>
        <div class="pstat"><div class="k">Record</div><div class="v mono" style="font-size:19px"><span style="color:var(--green)">${s.w}W</span> <span style="color:var(--red)">${s.l}L</span> <span style="color:var(--dim)">${s.d}D</span></div></div>
        <div class="pstat"><div class="k">Win rate</div><div class="v mono">${s.winPct}%</div></div>
        <div class="pstat"><div class="k">Opponents</div><div class="v mono">${s.opponents}</div></div>
        <div class="pstat"><div class="k">Avg opp rating</div><div class="v mono">${s.avgOpp.toFixed(1)}</div></div>
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
            <div class="who">${u(s.name)}</div>
            <div class="score mono">${f.for_} \u2013 ${f.against}</div>
            <div class="who opp"><a href="#/player/${le(f.opp)}" style="color:var(--blue)">${u(f.opp)}</a></div>
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
  </div>`,re(l("#pv-rating"),s.rating,{dec:1,dur:900}),se()}function _e(){let e=l("#gm-body"),s=C();l("#gm-count").textContent=`\u2014 ${s.length} games`,e.innerHTML=s.map(a=>{let c=a.sa>a.sb,v=a.sb>a.sa;return`
    <div class="gm-row">
      <div class="side ${c?"winner":"loser"}">
        <div class="dot ${c?"w":"l"}"></div>
        <div class="nm" data-goto="${u(a.a)}">${u(a.a)}</div>
      </div>
      <div class="sc mono" style="color:${c?"var(--green)":"var(--red)"}">${a.sa}</div>
      <div class="dash mono">\u2013</div>
      <div class="sc mono" style="color:${v?"var(--green)":"var(--red)"}">${a.sb}</div>
      <div class="side right ${v?"winner":"loser"}">
        <div class="dot ${v?"w":"l"}"></div>
        <div class="nm" data-goto="${u(a.b)}">${u(a.b)}</div>
      </div>
      <div class="dt mono">${a.admin&&!a.published?'<span class="tag fresh">new</span>':a.date||"legacy"}</div>
    </div>`}).join("")}function Fe(){let e=D.players.filter(s=>s.provisional).sort((s,a)=>a.rating-s.rating);l("#roster-grid").innerHTML=e.map(s=>{let a=Math.min(100,Math.round(Math.min(1,s.matches/5)*50+Math.min(1,s.opponents/3)*50));return`
    <div class="roster-card reveal" data-goto="${u(s.name)}">
      <div class="top">
        <div class="nm">${u(s.name)}</div>
        <svg class="shield" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"/></svg>
      </div>
      <div class="rating"><span class="big">${Math.round(s.rating)}</span><span class="unit">Glicko</span></div>
      <div class="req-row"><span>Matches</span><span class="${s.matches>=5?"ok":""}">${s.matches} / 5 ${s.matches>=5?"\u2713":""}</span></div>
      <div class="req-row"><span>Opponents</span><span class="${s.opponents>=3?"ok":""}">${s.opponents} / 3 ${s.opponents>=3?"\u2713":""}</span></div>
      <div class="prog-track"><div class="prog-fill" data-w="${a}"></div></div>
      <div class="prog-label">${a}% to qualified</div>
    </div>`}).join(""),requestAnimationFrame(()=>L("#roster-grid .prog-fill").forEach(s=>{s.style.width=s.dataset.w+"%"}))}function He(){let e=D.players,s=e.filter(i=>i.matches>=5).sort((i,h)=>h.winPct-i.winPct).slice(0,10),a=e.slice().sort((i,h)=>h.matches-i.matches).slice(0,10),c=[];C().forEach(i=>{let h=I[i.a],w=I[i.b];if(!h||!w)return;let E=h.rating-w.rating;if(i.sa===i.sb)return;let A=i.sa>i.sb?i.a:i.b,R=Math.abs(E);(E<0&&A===i.a||E>0&&A===i.b)&&c.push({winner:A,loser:A===i.a?i.b:i.a,gap:R,score:A===i.a?`${i.sa}-${i.sb}`:`${i.sb}-${i.sa}`})}),c.sort((i,h)=>h.gap-i.gap);let v={};C().forEach(i=>{let h=[i.a,i.b].sort().join(" vs ");v[h]=(v[h]||0)+1});let p=Object.entries(v).sort((i,h)=>h[1]-i[1]).slice(0,10),g=e.map(i=>i.rating),d=Math.min(...g),b=Math.max(...g),f=12,$=(b-d)/f||1,P=Array.from({length:f},()=>0);g.forEach(i=>{P[Math.min(f-1,Math.max(0,Math.floor((i-d)/$)))]++});let j=Math.max(...P,1),o=P.map((i,h)=>`
    <div class="hcol" title="${i} player${i===1?"":"s"} near ${Math.round(d+h*$)}">
      <div class="hbar" data-h="${Math.round(i/j*100)}"></div>
      <div class="hlbl">${Math.round(d+h*$)}</div>
    </div>`).join(""),t=Math.max(...a.map(i=>i.matches),1),n=a.slice(0,8).map(i=>`
    <div class="mrow reveal" data-goto="${u(i.name)}">
      <div class="nm">${u(i.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(i.matches/t*100)}"></div></div>
      <div class="val mono">${i.matches}</div>
    </div>`).join(""),r=(i,h,w)=>i.map((E,A)=>`
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
      ${r(s,i=>i.winPct+"%",i=>i.matches+" matches")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Most active</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/></svg>
      </div>
      ${r(a,i=>i.matches,i=>"matches")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Biggest upsets</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${c.length?c.slice(0,8).map((i,h)=>`
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
    </div>`;let m=()=>{L("#an-grid .hbar").forEach(i=>{i.style.height=i.dataset.h+"%"}),L("#an-grid .abar").forEach(i=>{i.style.width=i.dataset.w+"%"})};requestAnimationFrame(m),setTimeout(m,140),se()}function Ge(){l("#settings-body").innerHTML=ce().map(e=>`
    <tr><td><b>${u(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${u(e.desc)}</div></td>
        <td class="val">${u(String(e.value))}</td></tr>`).join("")}var We=[{q:"How are the ratings calculated?",a:"Dynamic Glicko \u2014 the same model behind competitive chess and table-tennis rankings. Every recorded duel moves the numbers: beating a stronger opponent gains more, losing to a weaker one costs more. The full maths lives on the Method page."},{q:"Why did my rating drop even though I didn't play?",a:"That's the inactivity automation. Each 30-day rating period without a match grows your RD (uncertainty), and the visible rating subtracts half of it \u2014 so an idle rating slowly sinks on its own, exactly like the master sheet. Play one match and the drift stops."},{q:"What is RD, and why does it matter?",a:"RD (ratings deviation) is how certain the system is about your rating. New or idle players have a high RD; regular players have a low one. The board ranks the visible rating = Glicko \u2212 0.5 \xD7 RD, so uncertain ratings are held back until they've earned trust."},{q:"How do I get ranked on the leaderboard?",a:"Log at least 5 matches against at least 3 different opponents. Until then you're provisional \u2014 your rating is real and takes part in every calculation, but you aren't ranked yet."},{q:"What do the green and red arrows next to ratings mean?",a:"They show how your visible rating moved since the previous spreadsheet update: green \u25B2 means you climbed, red \u25BC means you dropped."},{q:"What does the \u201Cinactive\u201D tag mean?",a:"A qualified player is marked inactive \u2014 and hidden from the board \u2014 after 365 days without a dated match (legacy players without recorded dates get a 365-day grace window first). Your rating isn't deleted: come back, play a match, and you're active again."},{q:"Do my old 0\u2013100 ladder ratings still count?",a:"Yes. Historical scores are converted into Glicko starting points (old 80 \u2248 1500), so the ladder carries over. This site reproduces the master sheet's seeding exactly, including its low-end floor."},{q:"Two names on the board look like the same person \u2014 is that a bug?",a:"Possibly an alias. When we confirm two names are the same player, a name fix merges them everywhere \u2014 records, ratings and head-to-heads \u2014 without rewriting old matches. Report suspicious duplicates through the feedback button."},{q:"How do I get my duels recorded?",a:"Matches are logged by the team after official 1v1 duels. If a match is missing or has the wrong score, send feedback with the details and we'll fix it \u2014 corrections recalculate every rating instantly."},{q:"The numbers here differ from the Google Sheet \u2014 what do I do?",a:"They shouldn't: every figure on this site is recomputed from the raw results and validated against the official sheet down to the decimal. If you spot a gap, screenshot it and send feedback \u2014 that's a bug report we want."},{q:"Who runs this site?",a:"Alternator & interstellar. The leaderboard is data-driven \u2014 no manual rankings, no politics. Just duels."}];function ee(){let e=N().faq;return Array.isArray(e)&&e.length?e:We}function Ue(){l("#faq-list").innerHTML=ee().map((e,s)=>`
    <div class="faq-item reveal" data-faq="${s}">
      <button class="faq-q" aria-expanded="false">
        <span>${u(String(e.q||""))}</span>
        <svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="faq-a"><div class="faq-a-in">${u(String(e.a||""))}</div></div>
    </div>`).join(""),se()}document.addEventListener("click",e=>{let s=e.target.closest(".faq-q");if(!s)return;let a=s.closest(".faq-item"),c=a.classList.contains("open");L(".faq-item.open").forEach(v=>{v.classList.remove("open"),v.querySelector(".faq-q").setAttribute("aria-expanded","false")}),c||(a.classList.add("open"),s.setAttribute("aria-expanded","true"))});function q(){let e=l("#admin-wrap");if(!(sessionStorage.getItem(ae)==="1")){e.innerHTML=`
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
    </div>`;let o=async()=>{let t=l("#admin-pw").value;try{let n=await fetch(Re,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:t})});if(n.ok){sessionStorage.setItem(ae,"1"),sessionStorage.setItem(F,t),q(),y("Welcome back, commander.");return}if(n.status===429){y("Too many attempts \u2014 wait a few minutes.");return}}catch{}l("#admin-pw").style.borderColor="var(--red)",y("Wrong password.")};l("#admin-auth").addEventListener("click",o),l("#admin-pw").addEventListener("keydown",t=>{t.key==="Enter"&&o()});return}let a=B(),c=be().length,v=N(),p='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',g=Object.entries(v.aliases).map(([o,t])=>`
    <div class="log-item">
      <div class="txt"><b>${u(o)}</b> \u2192 <b>${u(t)}</b>${v.aliasNotes&&v.aliasNotes[o]?` <span style="color:var(--dimmer)">\u2014 ${u(v.aliasNotes[o])}</span>`:""}</div>
      <button class="icon-btn" data-alias-del="${u(o)}" title="Remove name fix">${p}</button>
    </div>`).join("")||'<div class="empty">No name fixes yet.</div>',d=v.inactive.map(o=>`
    <div class="log-item">
      <div class="txt"><b>${u(o)}</b> <span style="color:var(--dimmer)">\u2014 inactive</span></div>
      <button class="icon-btn" data-inact-del="${u(o)}" title="Mark active again">${p}</button>
    </div>`).join("")||'<div class="empty">Nobody marked inactive.</div>',b=Object.keys({...v.seeds||{},...v.seedGlicko||{},...v.seedRd||{}}).map(o=>`
    <div class="log-item">
      <div class="txt"><b>${u(o)}</b> \xB7 <span style="color:var(--dimmer)">old</span> <b class="mono">${u(String((v.seeds||{})[o]!=null?(v.seeds||{})[o]:"\u2014"))}</b>${(v.seedGlicko||{})[o]!=null?` \xB7 <span style="color:var(--dimmer)">glicko</span> <b class="mono">${u(String(v.seedGlicko[o]))}</b>`:""}${(v.seedRd||{})[o]!=null?` \xB7 <span style="color:var(--dimmer)">rd</span> <b class="mono">${u(String(v.seedRd[o]))}</b>`:""}</div>
      <button class="icon-btn" data-seed-del="${u(o)}" title="Remove seed">${p}</button>
    </div>`).join("")||'<div class="empty">No seed overrides \u2014 players start from the sheet values.</div>',f=ce().map(o=>`
    <div class="set-row">
      <div class="lbl"><b>${u(o.name)}</b><div class="d">${u(String(o.desc||""))}</div></div>
      <input class="set-val mono" data-set-name="${u(o.name)}" value="${u(String(o.value))}">
    </div>`).join(""),$=o=>{let t=(o||"").trim().toLowerCase();return C().filter(r=>!t||r.a.toLowerCase().includes(t)||r.b.toLowerCase().includes(t)).slice(0,20).map(r=>`
      <div class="log-item fix-row" data-mkey="${r.key}">
        <div class="txt"><b>${u(r.a)}</b> <span style="color:var(--dimmer)">vs</span> <b>${u(r.b)}</b>${r.date?"":' <span class="tag legacy">legacy</span>'}</div>
        <input class="mono" data-f="sa" type="number" min="0" value="${r.sa}" title="Score 1">
        <input class="mono" data-f="sb" type="number" min="0" value="${r.sb}" title="Score 2">
        <input data-f="date" type="date" value="${r.date||""}" title="Match date">
        <button class="icon-btn" data-msave="${r.key}" title="Save fix"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-mdel="${r.key}" title="Delete match">${p}</button>
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
      <h3>Pending <span class="n">log</span> \u2014 ${a.length} local \xB7 ${c} published</h3>
      <div class="log-list" id="adm-list">
        ${a.length?a.map((o,t)=>`
          <div class="log-item">
            <div class="txt"><b>${u(o.a)}</b> ${o.sa}\u2013${o.sb} <b>${u(o.b)}</b></div>
            <div class="txt" style="color:var(--dimmer)">${u(o.date||"")}</div>
            <button class="icon-btn" data-del="${t}" title="Remove">
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

  <datalist id="player-list">${D.players.map(o=>`<option value="${u(o.name)}">`).join("")}</datalist>`,l("#admin-lock").addEventListener("click",()=>{sessionStorage.removeItem(ae),sessionStorage.removeItem(F),q()}),l("#admin-publish").addEventListener("click",P);async function P(){let o=sessionStorage.getItem(F)||(window.prompt("Admin password:")||"").trim();if(!o){y("Publish cancelled.");return}let t=N(),n={},r=[];for(let[h,w]of Object.entries(t.matchEdits||{}))h.startsWith("a:")&&(n[h]=w);for(let h of t.matchRemoved||[])h.startsWith("a:")&&r.push(h);let m=C().filter(h=>h.admin).map(h=>({a:h.a,b:h.b,sa:h.sa,sb:h.sb,date:h.date||""})),i={matches:m,aliases:t.aliases||{},aliasNotes:t.aliasNotes||{},inactive:t.inactive||[],seeds:t.seeds||{},seedGlicko:t.seedGlicko||{},seedRd:t.seedRd||{},settings:t.settings||{},matchEdits:n,matchRemoved:r,faq:t.faq!=null?t.faq:[]};try{let h=await fetch(oe,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:o,doc:i,message:`Publish match log (${m.length} matches)`})}),w=await h.json().catch(()=>({}));if(!h.ok||!w.ok){h.status===403&&sessionStorage.removeItem(F),y("Publish failed: "+(w.error||"HTTP "+h.status));return}window.LB_PUB=i,window.LB_LOG=m,W([]),M({}),x(),q(),y("Published! Everyone sees it on their next visit.")}catch{y("Publish failed: network error.")}}l("#admin-export").addEventListener("click",()=>{let o=new Blob([JSON.stringify(B(),null,2)],{type:"application/json"}),t=document.createElement("a");t.href=URL.createObjectURL(o),t.download="match-log.json",t.click(),URL.revokeObjectURL(t.href),y("Log exported.")}),l("#adm-add").addEventListener("click",()=>{let o=l("#adm-a").value.trim(),t=l("#adm-b").value.trim(),n=parseInt(l("#adm-sa").value,10),r=parseInt(l("#adm-sb").value,10);if(!o||!t||o.toLowerCase()===t.toLowerCase()||!Number.isFinite(n)||!Number.isFinite(r)){y("Fill in both players and scores.");return}let m=B();m.unshift({a:o,b:t,sa:n,sb:r,date:l("#adm-date")?l("#adm-date").value||new Date().toISOString().slice(0,10):new Date().toISOString().slice(0,10)}),W(m),x(),q(),y(`${o} ${n}\u2013${r} ${t} added \u2014 site recalculated live.`)}),l("#adm-list").addEventListener("click",o=>{let t=o.target.closest("[data-del]");if(!t)return;let n=B();n.splice(parseInt(t.dataset.del,10),1),W(n),x(),q()}),l("#ov-alias-add").addEventListener("click",()=>{let o=l("#ov-alias-a").value.trim(),t=l("#ov-alias-b").value.trim(),n=(l("#ov-alias-note")||{}).value.trim();if(!o||!t){y("Fill both: the wrong name and the correct player.");return}let r=S();M({...r,aliases:{...r.aliases||{},[o]:t},aliasNotes:n?{...r.aliasNotes||{},[o]:n}:r.aliasNotes||{}}),x(),q(),y(`Name fix saved \u2014 "${o}" now counts as ${t}.`)}),l("#ov-alias-list").addEventListener("click",o=>{let t=o.target.closest("[data-alias-del]");if(!t)return;let n=S(),r={...n.aliases||{}},m={...n.aliasNotes||{}};delete r[t.dataset.aliasDel],delete m[t.dataset.aliasDel],M({...n,aliases:r,aliasNotes:m}),x(),q()}),l("#ov-inact-toggle").addEventListener("click",()=>{let o=l("#ov-inact-n").value.trim();if(!o){y("Type a player name first.");return}let t=S(),n=N().inactive||[],r=n.includes(o)?n.filter(m=>m!==o):[...n,o];M({...t,inactive:r}),x(),q(),y(r.includes(o)?`${o} marked inactive.`:`${o} marked active again.`)}),l("#ov-inact-list").addEventListener("click",o=>{let t=o.target.closest("[data-inact-del]");if(!t)return;let n=S();M({...n,inactive:(N().inactive||[]).filter(r=>r!==t.dataset.inactDel)}),x(),q()}),l("#ov-seed-add").addEventListener("click",()=>{let o=l("#ov-seed-n").value.trim(),t=l("#ov-seed-v").value.trim(),n=l("#ov-seed-g").value.trim(),r=l("#ov-seed-rd").value.trim();if(!o){y("Pick a player first.");return}if(t===""&&n===""&&r===""){y("Enter an Old 0\u2013100 rating, or a Starting Glicko / RD.");return}let m=S(),i={...m.seeds||{}},h={...m.seedGlicko||{}},w={...m.seedRd||{}};t!==""&&Number.isFinite(Number(t))?i[o]=Number(t):delete i[o],n!==""&&Number.isFinite(Number(n))?h[o]=Number(n):delete h[o],r!==""&&Number.isFinite(Number(r))?w[o]=Number(r):delete w[o],M({...m,seeds:i,seedGlicko:h,seedRd:w}),x(),q(),y(`Seed saved for ${o}.`)}),l("#ov-seed-list").addEventListener("click",o=>{let t=o.target.closest("[data-seed-del]");if(!t)return;let n=t.dataset.seedDel,r=S(),m={...r.seeds||{}};delete m[n];let i={...r.seedGlicko||{}};delete i[n];let h={...r.seedRd||{}};delete h[n],M({...r,seeds:m,seedGlicko:i,seedRd:h}),x(),q()}),l("#ov-settings").addEventListener("change",o=>{let t=o.target.closest("[data-set-name]");if(!t)return;let n=S();M({...n,settings:{...n.settings||{},[t.dataset.setName]:t.value}}),x(),q(),y("Setting applied \u2014 everything recalculated.")}),l("#ov-set-reset").addEventListener("click",()=>{let o=S();M({...o,settings:{}}),x(),q(),y("Settings back to the master sheet values.")}),l("#ov-mq").addEventListener("input",()=>{l("#ov-mresults").innerHTML=$(l("#ov-mq").value)}),l("#ov-mresults").addEventListener("click",o=>{let t=o.target.closest("[data-msave]"),n=o.target.closest("[data-mdel]");if(t){let r=t.closest("[data-mkey]"),m=r.dataset.mkey,i=w=>r.querySelector(`[data-f="${w}"]`).value,h=S();M({...h,matchEdits:{...h.matchEdits||{},[m]:{sa:+i("sa"),sb:+i("sb"),date:i("date")}}}),x(),l("#ov-mresults").innerHTML=$(l("#ov-mq").value),y("Match fixed \u2014 ratings recalculated.")}else if(n){let r=n.dataset.mdel,m=S();M({...m,matchRemoved:[...new Set([...m.matchRemoved||[],r])]}),x(),l("#ov-mresults").innerHTML=$(l("#ov-mq").value),y("Match deleted \u2014 ratings recalculated.")}}),l("#pl-add").addEventListener("click",()=>{let o=l("#pl-name").value.trim(),t=l("#pl-opp").value.trim(),n=parseInt(l("#pl-sa").value,10),r=parseInt(l("#pl-sb").value,10);if(!o||!t||o.toLowerCase()===t.toLowerCase()||!Number.isFinite(n)||!Number.isFinite(r)){y("A player needs a name, an opponent and both scores \u2014 at least 1 result.");return}if(I[_(o)]){y(`${o} already exists \u2014 log a match for them instead.`);return}let m=B();m.unshift({a:o,b:t,sa:n,sb:r,date:(l("#pl-date")||{}).value||new Date().toISOString().slice(0,10)}),W(m);let i=(l("#pl-seed")||{}).value.trim();if(i!==""&&Number.isFinite(Number(i))){let h=S();M({...h,seeds:{...h.seeds||{},[_(o)]:Number(i)}})}x(),q(),y(`${o} added with their first result \u2014 ${n}\u2013${r} vs ${t}.`)}),l("#pl-del-btn").addEventListener("click",()=>{let o=l("#pl-del").value.trim(),t=_(o),n=C().filter(R=>R.a===t||R.b===t);if(!n.length){y(`No player called "${o}" with matches found.`);return}if(!window.confirm(`Remove ${t} and ${n.length} match${n.length===1?"":"es"}? This recalculates every rating.`))return;let r=S(),m=[...r.matchRemoved||[]],i=[];n.forEach(R=>{R.key.startsWith("l:")?i.push(parseInt(R.key.slice(2),10)):m.push(R.key)});let h=B();i.sort((R,ke)=>ke-R).forEach(R=>h.splice(R,1)),W(h);let w={...r.seeds||{}},E={...r.seedGlicko||{}},A={...r.seedRd||{}};delete w[t],delete E[t],delete A[t],M({...r,matchRemoved:[...new Set(m)],seeds:w,seedGlicko:E,seedRd:A,inactive:(N().inactive||[]).filter(R=>R!==t)}),x(),q(),y(`${t} removed with ${n.length} match${n.length===1?"":"es"}. Publish to make it public.`)});let j=()=>{let o=ee();l("#faq-admin-list").innerHTML=o.map((t,n)=>`
      <div class="log-item fix-row" data-faq-idx="${n}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${u(String(t.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${u(String(t.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${n}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${n}" title="Delete question">${p}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};j(),l("#faq-admin-list").addEventListener("click",o=>{let t=o.target.closest("[data-faq-save]"),n=o.target.closest("[data-faq-del]"),r=ee().map(i=>({...i}));if(t){let i=t.closest("[data-faq-idx]");r[parseInt(t.dataset.faqSave,10)]={q:i.querySelector('[data-fq="q"]').value.trim(),a:i.querySelector('[data-fq="a"]').value.trim()}}else if(n)r.splice(parseInt(n.dataset.faqDel,10),1);else return;let m=S();M({...m,faq:r}),j(),y("Q&A updated \u2014 publish to make it public.")}),l("#faq-add").addEventListener("click",()=>{let o=l("#faq-new-q").value.trim(),t=l("#faq-new-a").value.trim();if(!o||!t){y("Fill in both the question and the answer.");return}let n=S();M({...n,faq:[...ee().map(r=>({...r})),{q:o,a:t}]}),j(),y("Question added.")}),l("#faq-reset").addEventListener("click",()=>{let o=S();M({...o,faq:null}),j(),y("Q&A back to the built-in list.")}),(async function(){let t=l("#fb-inbox"),n=sessionStorage.getItem(F);if(!n){t.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let r=await fetch(V+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:n})}),m=await r.json().catch(()=>({}));if(!r.ok||!m.ok){t.innerHTML=`<div class="empty">Could not load messages (${u(m.error||"HTTP "+r.status)}).</div>`;return}let i=m.items||[];t.innerHTML=i.map(h=>`
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
        </div>`).join("")||'<div class="empty">No messages yet.</div>'}catch{t.innerHTML='<div class="empty">Network error loading messages.</div>'}})(),l("#fb-inbox").addEventListener("click",async o=>{let t=o.target.closest("[data-fb-send]"),n=o.target.closest("[data-fb-del]");if(!t&&!n)return;let r=o.target.closest("[data-fb-id]"),m=r.dataset.fbId,i=sessionStorage.getItem(F);try{if(t){let h=r.querySelector("[data-fb-reply]").value;if(!(await fetch(V+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:i,id:m,reply:h})}).then(E=>E.json())).ok){y("Reply failed.");return}y("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(V+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:i,id:m})}).then(w=>w.json())).ok){y("Delete failed.");return}r.remove(),y("Message deleted.")}}catch{y("Network error.")}})}l("#search").addEventListener("input",e=>{let s=e.target.value.trim().toLowerCase(),a=l("#search-drop");if(!s){a.classList.remove("show");return}let c=D.players.filter(v=>v.name.toLowerCase().includes(s)).slice(0,8);if(!c.length){a.classList.remove("show");return}a.innerHTML=c.map(v=>`
    <a class="drop-row" href="#/player/${le(v.name)}">
      ${v.rank?Z(v.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${u(v.name)}</span>
      <span class="mono" style="margin-left:auto;color:var(--dim)">${v.rating.toFixed(1)}</span>
    </a>`).join(""),a.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||l("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(l("#search-drop").classList.remove("show"),l("#search").value="")});var V=oe.replace(/\/publish$/,"/feedback"),$e="tt1v1_fb_tickets";function ze(){try{return JSON.parse(localStorage.getItem($e)||"[]")}catch{return[]}}function Je(e){let s=ze();s.push({id:e,ts:Date.now()});try{localStorage.setItem($e,JSON.stringify(s.slice(-20)))}catch{}}function Qe(){let e=l("#fb-overlay"),s=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>l("#fb-msg").focus(),180)},a=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};l("#fab-feedback").addEventListener("click",s),l("#fb-close").addEventListener("click",a),l("#fb-done").addEventListener("click",a),e.addEventListener("click",d=>{d.target===e&&a()}),document.addEventListener("keydown",d=>{d.key==="Escape"&&e.classList.contains("show")&&a()});let c=l("#faq-feedback-btn");c&&c.addEventListener("click",s);let v=l("#fb-msg"),p=l("#fb-count-n");v.addEventListener("input",()=>{p.textContent=String(v.value.length);try{localStorage.setItem("tt1v1_fb_draft",v.value)}catch{}});try{let d=localStorage.getItem("tt1v1_fb_draft");d&&(v.value=d,p.textContent=String(d.length))}catch{}let g=l("#fb-send");g.addEventListener("click",async()=>{let d=v.value.trim();if(d.length<5){v.focus(),v.classList.add("fb-nudge"),setTimeout(()=>v.classList.remove("fb-nudge"),500),y("Write a message first \u2014 a few words is plenty.");return}g.classList.add("busy"),g.disabled=!0;try{let b=await fetch(V,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:l("#fb-name").value.trim(),contact:l("#fb-contact").value.trim(),message:d})}),f=await b.json().catch(()=>({}));if(!b.ok||!f.ok){y("Could not send: "+(f.error||"HTTP "+b.status)+" \u2014 try again later.");return}Je(f.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}l("#fb-ticket-code").textContent=f.id,l("#fb-view-form").hidden=!0,l("#fb-view-done").hidden=!1}catch{y("Network error \u2014 your message was not sent.")}finally{g.classList.remove("busy"),g.disabled=!1}}),l("#fb-check").addEventListener("click",async()=>{let d=l("#fb-ticket-in").value.trim(),b=l("#fb-reply-out");if(d){b.classList.add("show"),b.textContent="Checking\u2026";try{let f=await fetch(V+"/status?id="+encodeURIComponent(d)),$=await f.json().catch(()=>({}));if(!f.ok||!$.ok){b.textContent="No message found with that ticket code.";return}b.innerHTML=$.reply?`<b>Reply from the team:</b> ${u($.reply)}`:`Status: <b>${u($.status)}</b> \u2014 your message is being reviewed, check back soon.`}catch{b.textContent="Network error \u2014 try again later."}}})}var he;function y(e){let s=l("#toast");s.textContent=e,s.classList.add("show"),clearTimeout(he),he=setTimeout(()=>s.classList.remove("show"),2600)}var U;function se(){U&&U.disconnect(),U=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&(s.target.classList.add("in"),L(".cu",s.target).forEach(a=>re(a,parseFloat(a.dataset.target),{dec:parseInt(a.dataset.dec||0)})),U.unobserve(s.target))})},{threshold:.12}),L(".reveal").forEach(e=>U.observe(e))}(function(){let s=l("#scroll-progress"),a=l("#to-top"),c=l("#page-home .hero-row"),v=document.querySelector(".topbar"),p=()=>{let g=window.scrollY,d=document.documentElement.scrollHeight-window.innerHeight;s&&(s.style.width=(d>0?g/d*100:0)+"%"),a&&a.classList.toggle("show",g>640),v&&v.classList.toggle("scrolled",g>10),c&&g<1400&&(c.style.transform=`translateY(${g*.14}px)`,c.style.opacity=String(Math.max(.3,1-g/950)))};window.addEventListener("scroll",p,{passive:!0}),a&&a.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),p()})();x();pe();ve();Qe();function ie(e,s){let a=e.indexOf("window."+s);if(a<0)return null;let c=e.indexOf("=",a);for(;c<e.length&&"{[".indexOf(e[c])<0;)c++;let v=0,p=!1,g="",d=!1;for(let b=c;b<e.length;b++){let f=e[b];if(p){d?d=!1:f==="\\"?d=!0:f===g&&(p=!1);continue}if(f==='"'||f==="'"){p=!0,g=f;continue}if(f==="{"||f==="[")v++;else if((f==="}"||f==="]")&&(v--,v<=0))return JSON.parse(e.slice(c,b+1))}return null}(async()=>{try{let e=await fetch("log.js?cb="+Date.now(),{cache:"no-store"});if(!e.ok)return;let s=await e.text(),a=ie(s,"LB_PUB")||(ie(s,"LB_LOG")?{matches:ie(s,"LB_LOG")}:null);if(!a)return;JSON.stringify(a)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=a,window.LB_LOG=a.matches||[],x(),pe(),ve())}catch{}})();})();
