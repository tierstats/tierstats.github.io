/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var W=window.LB_DATA,ms="https://tierstats-publish.tierstats.workers.dev/publish",p=(s,e=document)=>e.querySelector(s),M=(s,e=document)=>[...e.querySelectorAll(s)],u=s=>String(s).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),is=s=>encodeURIComponent(String(s)),ks=s=>decodeURIComponent(s);function ns(s,e,a={}){let n=a.dur||1200,r=a.dec||0,d=performance.now(),g=parseFloat(s.textContent)||0;function o(b){let h=Math.min(1,(b-d)/n),w=1-Math.pow(1-h,3);s.textContent=(g+(e-g)*w).toFixed(r),h<1&&requestAnimationFrame(o)}requestAnimationFrame(o)}var Ls='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',Ms='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function H(s,e=""){let a=s===1?"rb1":s===2?"rb2":s===3?"rb3":"",n=s<=3?s===1?Ls:Ms:"";return`<div class="rank-badge ${a} ${e}" title="Rank #${s}">${n}<span class="num">${s}</span></div>`}var A={},N=[],T={players:[],byName:{},qualified:[]},q={};function xs(){for(let s in q)delete q[s];Object.entries(W.aliases).forEach(([s,e])=>{q[s.toLowerCase()]=e}),Object.entries(O().aliases||{}).forEach(([s,e])=>{q[String(s).toLowerCase()]=e})}var Z=s=>{let e=String(s).trim();return q[e.toLowerCase()]||e};function hs(s){let e=[];return B().forEach(a=>{let n=(r,d,g)=>({opp:r,for_:d,against:g,res:d>g?"W":d<g?"L":"D",date:a.date});a.a===s?e.push(n(a.b,a.sa,a.sb)):a.b===s&&e.push(n(a.a,a.sb,a.sa))}),e}function Ss(s){let e={};return hs(s).forEach(a=>{let n=e[a.opp]||(e[a.opp]={w:0,l:0,d:0,pf:0,pa:0});n[a.res.toLowerCase()]+=1,n.pf+=a.for_,n.pa+=a.against}),Object.entries(e).map(([a,n])=>({opp:a,...n})).sort((a,n)=>n.w+n.l+n.d-(a.w+a.l+a.d)||n.w-a.w)}function Es(s){let e=A[s]||{};return e.provisional?'<span class="tag prov">provisional</span>':e.inactive?'<span class="tag inact">inactive</span>':'<span class="tag legacy">legacy</span>'}var es={},Y=!1;function Rs(){Y=!0;try{ws().players.forEach(s=>{es[s.name]=s.rating})}finally{Y=!1}}function K(s){let e=s.delta!=null?s.delta:0;if(Math.abs(e)<.05)return"";let a=e>0;return`<span class="delta ${a?"up":"down"}" title="rating change since the last data sync">${a?"\u25B2":"\u25BC"} ${Math.abs(e).toFixed(1)}</span>`}var us="tt1v1_admin_log_v1",Q="tt1v1_admin_ok",z="tt1v1_admin_pw",Ns=ms.replace(/\/publish$/,"/verify");function G(){try{return JSON.parse(localStorage.getItem(us)||"[]")}catch{return[]}}function X(s){try{localStorage.setItem(us,JSON.stringify(s))}catch{}}var gs="tt1v1_admin_over_v1";function R(){try{return JSON.parse(localStorage.getItem(gs)||"{}")||{}}catch{return{}}}function E(s){try{localStorage.setItem(gs,JSON.stringify(s))}catch{}}function O(){let s=window.LB_PUB||{},e=R();return{aliases:{...s.aliases||{},...e.aliases||{}},aliasNotes:{...s.aliasNotes||{},...e.aliasNotes||{}},seeds:{...s.seeds||{},...e.seeds||{}},seedGlicko:{...s.seedGlicko||{},...e.seedGlicko||{}},seedRd:{...s.seedRd||{},...e.seedRd||{}},settings:{...s.settings||{},...e.settings||{}},matchEdits:{...s.matchEdits||{},...e.matchEdits||{}},inactive:e.inactive||s.inactive||[],matchRemoved:[...new Set([...s.matchRemoved||[],...e.matchRemoved||[]])]}}function fs(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function B(){let s=O(),e=s.matchEdits||{},a=new Set(s.matchRemoved||[]),n=(o,b)=>{if(a.has(b))return null;let h=e[b],w=h?{...o,sa:h.sa,sb:h.sb,date:h.date!=null?h.date:o.date}:o;return{...w,a:Z(w.a),b:Z(w.b),sa:+w.sa,sb:+w.sb,key:b}},r=Y?[]:G().map((o,b)=>n({...o,admin:!0,published:!1},"l:"+b)).filter(Boolean),d=Y?[]:fs().map((o,b)=>n({...o,admin:!0,published:!0},"p:"+b)).filter(Boolean),g=W.matches.map((o,b)=>n({...o,admin:!1,published:!1},"a:"+b)).filter(Boolean).reverse();return r.concat(d,g)}var $={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.35,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365},ts=864e5,F=Math.log(10)/400,bs=s=>1/Math.sqrt(1+3*F*F*s*s/(Math.PI*Math.PI)),Os=(s,e,a)=>1/(1+Math.pow(10,-bs(a)*(s-e)/400));function ys(s){let e=O().seeds||{};return e[s]!=null&&e[s]!==""?Number(e[s]):W.seeds[s]}function Bs(s){let e=(O().seedGlicko||{})[s],a=(O().seedRd||{})[s],n=e!=null&&e!==""?Number(e):null,r=a!=null&&a!==""?Number(a):null;if(n!=null||r!=null)return[n??$.unratedR,r??$.unratedRd];let d=ys(s);return d!=null?[$.seedMid+(d-$.oldMid)*$.ptsPer,$.knownRd]:[$.unratedR,$.unratedRd]}function vs(s,e,a){let n=0,r=0;for(let[g,o,b]of a){let h=bs(o),w=Os(s,g,o);n+=h*h*w*(1-w),r+=h*(b-w)}if(n*=F*F,n<=0)return[s,e];let d=1/(e*e)+n;return[s+F/d*r,Math.sqrt(1/d)]}function Ts(s,e){let a=Math.pow(10,e),n=s*a,r=Math.floor(n);return Math.abs(n-r-.5)<1e-6?(r%2===0?r:r+1)/a:Math.round(n)/a}var os=s=>Math.floor(Date.parse(s+"T00:00:00Z")/($.periodDays*ts)),J=os($.graceStart),Ps={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function ls(){let s=O().settings||{};return(W.settings||[]).map(e=>({...e,value:Object.prototype.hasOwnProperty.call(s,e.name)?s[e.name]:e.value}))}function js(){for(let s of ls()){let e=Ps[s.name];if(!e)continue;if(e==="graceStart"){let n=String(s.value==null?"":s.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(n)&&($.graceStart=n);continue}let a=Number(s.value);Number.isFinite(a)&&($[e]=a)}J=os($.graceStart)}function ws(){js(),xs();let s={},e=t=>{if(!s[t]){let[c,v]=Bs(t);s[t]={name:t,r:c,rd:v,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return s[t]},a=(t,c,v,m,y,i)=>{let f=e(t);f.games++,f.opps.add(c),v>m?f.w++:v<m?f.l++:f.d++,f.lastIdx=i,y&&(f.lastDate=y)},n={};for(let t of B()){if(t.date)continue;let c=t.a,v=t.b,m=t.sa>t.sb?1:t.sa<t.sb?0:.5;(n[c]=n[c]||[]).push([v,m]),(n[v]=n[v]||[]).push([c,1-m]),a(c,v,t.sa,t.sb,"",J),a(v,c,t.sb,t.sa,"",J)}let r={};for(let t in n)r[t]=[e(t).r,e(t).rd];for(let t in n){let[c,v]=vs(r[t][0],r[t][1],n[t].map(([m,y])=>[r[m][0],r[m][1],y]));e(t).r=c,e(t).rd=v}let d=new Map;for(let t of B().filter(c=>c.date).slice().reverse()){let c=t.date,v=os(c);d.has(v)||d.set(v,[]),d.get(v).push({a:Z(t.a),b:Z(t.b),sa:+t.sa,sb:+t.sb,date:c})}for(let t of[...d.keys()].sort((c,v)=>c-v)){for(let m in s){let y=s[m],i=t-(y.lastIdx==null?J:y.lastIdx);i>0&&(y.rd=Math.min(Math.sqrt(y.rd*y.rd+$.growth*$.growth*i),$.maxRd))}let c={};for(let m of d.get(t)){let y=m.sa>m.sb?1:m.sa<m.sb?0:.5;(c[m.a]=c[m.a]||[]).push([m.b,y]),(c[m.b]=c[m.b]||[]).push([m.a,1-y]),a(m.a,m.b,m.sa,m.sb,m.date,t),a(m.b,m.a,m.sb,m.sa,m.date,t)}let v={};for(let m in c)v[m]=[e(m).r,e(m).rd];for(let m in c){let[y,i]=vs(v[m][0],v[m][1],c[m].map(([f,j])=>[v[f][0],v[f][1],j]));e(m).r=y,e(m).rd=i}}let g=Object.values(s).map(t=>({name:t.name,glicko:t.r,rd:t.rd,rating:t.r-$.conservative*t.rd,matches:t.games,w:t.w,l:t.l,d:t.d,winPct:t.games?Ts(t.w/t.games*100,1):0,opponents:t.opps.size,avgOpp:0,lastMatch:t.lastDate||"",provisional:!(t.games>=$.minMatches&&t.opps.size>=$.minOpp),inactive:!1})),o={};g.forEach(t=>{o[t.name]=t.glicko}),g.forEach(t=>{let c=0;s[t.name].opps.forEach(v=>{c+=o[v]!=null?o[v]:$.unratedR}),t.avgOpp=s[t.name].opps.size?c/s[t.name].opps.size:0}),g.forEach(t=>{t.delta=t.rating-(es[t.name]!=null?es[t.name]:t.rating)});let b=Date.now(),h=Date.parse($.graceStart+"T00:00:00Z")+$.graceDays*ts,w=new Set([...W.inactiveList||[],...O().inactive||[]]);g.forEach(t=>{t.inactive=w.has(t.name)||(t.lastMatch?b-Date.parse(t.lastMatch+"T00:00:00Z")>$.inactiveDays*ts:b>h)});let P=g.filter(t=>!t.provisional).sort((t,c)=>c.rating-t.rating);P.forEach((t,c)=>{t.rank=c+1}),g.sort((t,c)=>c.rating-t.rating);let l={};return g.forEach(t=>{l[t.name]=t}),{players:g,byName:l,qualified:P}}function L(){T=ws(),A=T.byName,N=T.qualified}var Ds=["page-home","page-player","page-matches","page-roster","page-analytics","page-method","page-admin"];function ds(){let s=location.hash||"#/";Ds.forEach(r=>p("#"+r).classList.remove("active"));let e="#/"+(s.split("/")[1]||"");M(".nav a").forEach(r=>{let d=r.getAttribute("href");r.classList.toggle("active",d===e||s==="#/"&&d==="#/")});let a=p("#nav-glide"),n=document.querySelector(".nav a.active");a&&n?(a.style.width=n.offsetWidth+"px",a.style.transform=`translateX(${n.offsetLeft}px)`,a.style.opacity="1"):a&&(a.style.opacity="0"),s.startsWith("#/player/")?(_s(ks(s.slice(9))),p("#page-player").classList.add("active"),window.scrollTo({top:0,behavior:"instant"in window?"instant":"auto"})):s==="#/matches"?(Is(),p("#page-matches").classList.add("active"),window.scrollTo(0,0)):s==="#/roster"?(qs(),p("#page-roster").classList.add("active"),window.scrollTo(0,0)):s==="#/analytics"?(Gs(),p("#page-analytics").classList.add("active"),window.scrollTo(0,0)):s==="#/method"?(Fs(),p("#page-method").classList.add("active"),window.scrollTo(0,0)):s==="#/admin"?(x(),p("#page-admin").classList.add("active"),window.scrollTo(0,0)):(rs(),p("#page-home").classList.add("active"),requestAnimationFrame(As)),cs()}window.addEventListener("hashchange",ds);function rs(){_="all",S={key:"rank",dir:1},M(".chip[data-filter]").forEach(d=>d.classList.toggle("on",d.dataset.filter==="all")),M(".sortable").forEach(d=>d.classList.remove("sorted","asc"));let s=p('.sortable[data-key="rank"]');s&&s.classList.add("sorted");let e=B().length,a=T.players.length,n=N[0],r=Math.round(N.reduce((d,g)=>d+g.rd,0)/N.length);p("#hero-matches").textContent=e,p("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">Ranked players</div>
      <div class="v"><span class="cu" data-target="${N.length}">0</span><small>/ ${a} total</small></div></div>
    <div class="stat-card"><div class="k">Matches logged</div>
      <div class="v"><span class="cu" data-target="${e}">0</span></div></div>
    <div class="stat-card"><div class="k">Highest rating</div>
      <div class="v"><span class="cu" data-target="${n.rating}" data-dec="1">0</span><small>${u(n.name)}</small></div></div>
    <div class="stat-card"><div class="k">Avg certainty (RD)</div>
      <div class="v"><span class="cu" data-target="${r}" data-dec="1">0</span><small>lower = surer</small></div></div>`,p("#fl-cards").innerHTML=N.slice(0,5).map((d,g)=>`
    <div class="fl-card r${g+1}${g===0?" champ":""} reveal" data-goto="${u(d.name)}">
      <div class="rd">RD ${d.rd.toFixed(0)}</div>
      ${H(d.rank)}
      ${g===0?'<div class="champ-tag">#1 Tank</div>':""}
      <div class="nm">${u(d.name)}</div>
      <div class="rating"><span class="big">${Math.round(d.rating)}</span><span class="unit">Glicko</span>${K(d)}</div>
      <div class="meta">
        <span><span class="w">${d.w}W</span> <span class="l">${d.l}L</span> ${d.d}D</span>
        <span style="margin-left:auto">${d.winPct}%</span>
      </div>
    </div>`).join(""),p("#fl-rows").innerHTML=N.slice(5,10).map(d=>`
    <div class="fl-row reveal" data-goto="${u(d.name)}">
      ${H(d.rank,"sm")}
      <div class="nm">${u(d.name)}</div>
      <div class="rating">${Math.round(d.rating)}${K(d)}</div>
      <div class="rec"><span class="w">${d.w}W</span> \xB7 <span class="l">${d.l}L</span> \xB7 ${d.d}D</div>
      <div class="pct">${d.winPct}%</div>
      <div class="go">\u203A</div>
    </div>`).join(""),U(),Cs()}function Cs(){let s=B().slice(0,10);p("#battles-grid").innerHTML=s.map(e=>{let a=e.sa>e.sb,n=e.sb>e.sa;return`
    <div class="battle-row reveal" data-goto="${u(a?e.a:e.b)}">
      <div class="who ${a?"win":"lose"}" data-goto="${u(e.a)}">${u(e.a)}</div>
      <div class="vs">vs</div>
      <div class="who r ${n?"win":"lose"}" data-goto="${u(e.b)}">${u(e.b)}</div>
      <div class="sc mono"><span class="${a?"win":"lose"}">${e.sa}</span> \u2013 <span class="${n?"win":"lose"}">${e.sb}</span></div>
      <div class="dt">${e.date||(e.admin&&!e.published?"just now":"legacy")}</div>
    </div>`}).join("")}function U(s="all",e="rank",a=1){let n=p("#lb-body"),d=(s==="all"&&V?N:T.players).slice().map(o=>({...o,rank:o.rank!=null?o.rank:9999}));as&&(d=d.filter(o=>o.name.toLowerCase().includes(as))),s==="provisional"?d=d.filter(o=>(A[o.name]||{}).provisional):s==="inactive"?d=d.filter(o=>(A[o.name]||{}).inactive):s==="veterans"?d=d.filter(o=>o.matches>=15):s==="rising"&&(d=d.filter(o=>o.winPct>=60&&o.matches>=5)),d.sort((o,b)=>{let h=o[e],w=b[e];return(typeof h=="string"?h.localeCompare(w):h-w)*a});let g=new Map;M(".lb-row",n).forEach(o=>g.set(o.dataset.name,o.getBoundingClientRect().top)),n.innerHTML=d.map(o=>`
    <div class="lb-row ${o.rank<=3?"top"+o.rank:""}" data-name="${u(o.name)}" data-goto="${u(o.name)}">
      <div class="rank">${o.rank<=N.length?H(o.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="pname">${u(o.name)}</div></div>
      <div class="rating-cell mono">${o.rating.toFixed(1)}${K(o)}</div>
      <div class="num-cell mono col-hide">${o.rd.toFixed(1)}</div>
      <div class="num-cell mono col-hide">${o.matches}</div>
      <div class="num-cell mono col-hide"><span class="w">${o.w}</span></div>
      <div class="num-cell mono col-hide"><span class="l">${o.l}</span></div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${o.winPct>=60?"":o.winPct>=40?"mid":"low"}" data-w="${o.winPct}"></div></div>
        <div class="pct mono">${o.winPct}%</div>
      </div>
      <div class="num-cell mono col-hide">${o.opponents}</div>
      <div class="num-cell mono col-hide">${o.avgOpp.toFixed(0)}</div>
      <div class="col-status">${Es(o.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${s==="inactive"?"Nobody is inactive right now \u2014 a player goes inactive 365 days after their last match (or when flagged in the master sheet).":s==="provisional"?"No provisional players right now.":"No players match this filter."}</div>`,requestAnimationFrame(()=>{M(".lb-row",n).forEach(o=>{let b=g.get(o.dataset.name),h=o.getBoundingClientRect().top;b!==void 0&&Math.abs(b-h)>1&&(o.style.transform=`translateY(${b-h}px)`,o.style.transition="none",requestAnimationFrame(()=>{o.style.transition="transform .5s cubic-bezier(.22,.8,.24,1)",o.style.transform=""}))}),M(".bar-fill",n).forEach(o=>{o.style.width=o.dataset.w+"%"})})}var _="all",S={key:"rank",dir:1},as="",V=!0;function As(){M("#stat-strip .cu").forEach(s=>ns(s,parseFloat(s.dataset.target),{dec:parseInt(s.dataset.dec||0)})),M(".bar-fill").forEach(s=>{s.style.width=s.dataset.w+"%"})}p("#lb-qual").addEventListener("click",()=>{V=!V,p("#lb-qual").classList.toggle("on",V),U(_,S.key,S.dir)});p("#lb-filter").addEventListener("input",s=>{as=s.target.value.trim().toLowerCase(),U(_,S.key,S.dir)});document.addEventListener("click",s=>{let e=s.target.closest(".chip");if(e&&e.dataset.filter){M(".chip[data-filter]").forEach(r=>r.classList.remove("on")),e.classList.add("on"),_=e.dataset.filter,U(_,S.key,S.dir);return}let a=s.target.closest(".sortable");if(a){let r=a.dataset.key;S.dir=S.key===r?-S.dir:1,S.key=r,M(".sortable").forEach(d=>d.classList.remove("sorted","asc")),a.classList.add("sorted"),S.dir===1&&a.classList.add("asc"),U(_,S.key,S.dir);return}let n=s.target.closest("[data-goto]");n&&(s.stopPropagation(),location.hash="#/player/"+is(n.dataset.goto))});function _s(s){let e=A[s],a=p("#page-player");if(!e){a.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">
      No player called "<b>${u(s)}</b>" found. <a href="#/" style="color:var(--gold)">Back to the leaderboard</a>.
    </div></div></div>`;return}let n=N.find(h=>h.name===s),r=hs(s),d=r.slice(0,10),g=Ss(s),o=ys(s),b=Math.max(3,Math.min(100,100-e.rd/120*100));a.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">\u2190 All rankings</a>
    <div class="player-hero anim">
      <div class="player-top">
        ${n?H(n.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${u(e.name)}</div>
          <div class="player-rankline">
            ${n?`Ranked <b>#${n.rank}</b> of ${N.length} qualified players`:"Unranked \u2014 not enough recent games for the board"}
            ${o!=null?` \xB7 seeded from an original rating of <b>${o}</b>`:""}
            ${e.provisional?' \xB7 <span class="tag prov">provisional</span>':""}
            ${e.inactive?' \xB7 <span class="tag inact">inactive</span>':""}
          </div>
        </div>
        <div class="player-rating-block">
          <div class="lbl">Visible rating</div>
          <div class="big mono" id="pv-rating">0</div>
          ${K(e)}
          <div class="rd-bar">
            <div class="bar-track"><div class="bar-fill" style="width:${b}%"></div></div>
            <div class="caption"><span>certainty</span><span class="mono">RD ${e.rd.toFixed(1)}</span></div>
          </div>
        </div>
      </div>
      <div class="pstat-grid">
        <div class="pstat"><div class="k">Glicko</div><div class="v mono">${e.glicko.toFixed(1)}</div></div>
        <div class="pstat"><div class="k">Matches</div><div class="v mono">${e.matches}</div></div>
        <div class="pstat"><div class="k">Record</div><div class="v mono" style="font-size:19px"><span style="color:var(--green)">${e.w}W</span> <span style="color:var(--red)">${e.l}L</span> <span style="color:var(--dim)">${e.d}D</span></div></div>
        <div class="pstat"><div class="k">Win rate</div><div class="v mono">${e.winPct}%</div></div>
        <div class="pstat"><div class="k">Opponents</div><div class="v mono">${e.opponents}</div></div>
        <div class="pstat"><div class="k">Avg opp rating</div><div class="v mono">${e.avgOpp.toFixed(1)}</div></div>
      </div>
    </div>

    <div class="panel reveal">
      <h3>Recent form <span class="n">\u2014 last ${Math.min(10,r.length)}</span></h3>
      <div class="form-strip">
        ${d.map((h,w)=>`<div class="form-pill ${h.res}" style="animation-delay:${w*55}ms"
           title="vs ${u(h.opp)} ${h.for_}-${h.against}">${h.res}</div>`).join("")||'<span class="empty">No games yet</span>'}
      </div>
    </div>

    <div class="panel reveal">
      <h3>Match history <span class="n">\u2014 ${r.length} games</span></h3>
      <div class="match-list">
        ${r.map(h=>`
          <div class="match-row">
            <div class="res-chip ${h.res}">${h.res}</div>
            <div class="who">${u(e.name)}</div>
            <div class="score mono">${h.for_} \u2013 ${h.against}</div>
            <div class="who opp"><a href="#/player/${is(h.opp)}" style="color:var(--blue)">${u(h.opp)}</a></div>
            <div class="date mono">${h.date||"legacy"}</div>
          </div>`).join("")||'<div class="empty">No games recorded</div>'}
      </div>
    </div>

    <div class="panel reveal">
      <h3>Head to head <span class="n">\u2014 ${g.length} opponents</span></h3>
      <div class="h2h-grid">
        ${g.map(h=>`
          <div class="h2h-card" data-goto="${u(h.opp)}">
            <div class="opp">${u(h.opp)}</div>
            <div class="rec mono"><span class="w">${h.w}W</span> \xB7 <span class="l">${h.l}L</span> \xB7 <span>${h.d}D</span> \xB7 ${h.pf}-${h.pa} pts</div>
          </div>`).join("")||'<div class="empty">No games recorded</div>'}
      </div>
    </div>
  </div>`,ns(p("#pv-rating"),e.rating,{dec:1,dur:900}),cs()}function Is(){let s=p("#gm-body"),e=B();p("#gm-count").textContent=`\u2014 ${e.length} games`,s.innerHTML=e.map(a=>{let n=a.sa>a.sb,r=a.sb>a.sa;return`
    <div class="gm-row">
      <div class="side ${n?"winner":"loser"}">
        <div class="dot ${n?"w":"l"}"></div>
        <div class="nm" data-goto="${u(a.a)}">${u(a.a)}</div>
      </div>
      <div class="sc mono" style="color:${n?"var(--green)":"var(--red)"}">${a.sa}</div>
      <div class="dash mono">\u2013</div>
      <div class="sc mono" style="color:${r?"var(--green)":"var(--red)"}">${a.sb}</div>
      <div class="side right ${r?"winner":"loser"}">
        <div class="dot ${r?"w":"l"}"></div>
        <div class="nm" data-goto="${u(a.b)}">${u(a.b)}</div>
      </div>
      <div class="dt mono">${a.admin&&!a.published?'<span class="tag fresh">new</span>':a.date||"legacy"}</div>
    </div>`}).join("")}function qs(){let s=T.players.filter(e=>e.provisional).sort((e,a)=>a.rating-e.rating);p("#roster-grid").innerHTML=s.map(e=>{let a=Math.min(100,Math.round(Math.min(1,e.matches/5)*50+Math.min(1,e.opponents/3)*50));return`
    <div class="roster-card reveal" data-goto="${u(e.name)}">
      <div class="top">
        <div class="nm">${u(e.name)}</div>
        <svg class="shield" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"/></svg>
      </div>
      <div class="rating"><span class="big">${Math.round(e.rating)}</span><span class="unit">Glicko</span></div>
      <div class="req-row"><span>Matches</span><span class="${e.matches>=5?"ok":""}">${e.matches} / 5 ${e.matches>=5?"\u2713":""}</span></div>
      <div class="req-row"><span>Opponents</span><span class="${e.opponents>=3?"ok":""}">${e.opponents} / 3 ${e.opponents>=3?"\u2713":""}</span></div>
      <div class="prog-track"><div class="prog-fill" data-w="${a}"></div></div>
      <div class="prog-label">${a}% to qualified</div>
    </div>`}).join(""),requestAnimationFrame(()=>M("#roster-grid .prog-fill").forEach(e=>{e.style.width=e.dataset.w+"%"}))}function Gs(){let s=T.players,e=s.filter(i=>i.matches>=5).sort((i,f)=>f.winPct-i.winPct).slice(0,10),a=s.slice().sort((i,f)=>f.matches-i.matches).slice(0,10),n=[];B().forEach(i=>{let f=A[i.a],j=A[i.b];if(!f||!j)return;let D=f.rating-j.rating;if(i.sa===i.sb)return;let C=i.sa>i.sb?i.a:i.b,$s=Math.abs(D);(D<0&&C===i.a||D>0&&C===i.b)&&n.push({winner:C,loser:C===i.a?i.b:i.a,gap:$s,score:C===i.a?`${i.sa}-${i.sb}`:`${i.sb}-${i.sa}`})}),n.sort((i,f)=>f.gap-i.gap);let r={};B().forEach(i=>{let f=[i.a,i.b].sort().join(" vs ");r[f]=(r[f]||0)+1});let d=Object.entries(r).sort((i,f)=>f[1]-i[1]).slice(0,10),g=s.map(i=>i.rating),o=Math.min(...g),b=Math.max(...g),h=12,w=(b-o)/h||1,P=Array.from({length:h},()=>0);g.forEach(i=>{P[Math.min(h-1,Math.max(0,Math.floor((i-o)/w)))]++});let l=Math.max(...P,1),t=P.map((i,f)=>`
    <div class="hcol" title="${i} player${i===1?"":"s"} near ${Math.round(o+f*w)}">
      <div class="hbar" data-h="${Math.round(i/l*100)}"></div>
      <div class="hlbl">${Math.round(o+f*w)}</div>
    </div>`).join(""),c=Math.max(...a.map(i=>i.matches),1),v=a.slice(0,8).map(i=>`
    <div class="mrow reveal" data-goto="${u(i.name)}">
      <div class="nm">${u(i.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(i.matches/c*100)}"></div></div>
      <div class="val mono">${i.matches}</div>
    </div>`).join(""),m=(i,f,j)=>i.map((D,C)=>`
    <div class="an-row reveal" data-goto="${u(D.name)}">
      <div class="idx mono">${C+1}</div>
      <div class="nm">${u(D.name)}</div>
      <div class="val mono">${f(D)}</div>
      <div class="unit mono">${j(D)}</div>
    </div>`).join("");p("#an-grid").innerHTML=`
    <div class="an-panel">
      <div class="head"><h3>Top win rate</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${m(e,i=>i.winPct+"%",i=>i.matches+" matches")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Most active</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/></svg>
      </div>
      ${m(a,i=>i.matches,i=>"matches")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Biggest upsets</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${n.length?n.slice(0,8).map((i,f)=>`
        <div class="an-row reveal" data-goto="${u(i.winner)}">
          <div class="idx mono">${f+1}</div>
          <div class="nm">${u(i.winner)} <span style="color:var(--dimmer);font-weight:500">def.</span> ${u(i.loser)}</div>
          <div class="val mono">${i.score}</div>
          <div class="unit mono">+${Math.round(i.gap)} pts</div>
        </div>`).join(""):'<div class="empty">No upsets on record</div>'}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Most contested rivalries</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${d.map(([i,f],j)=>`
        <div class="an-row reveal">
          <div class="idx mono">${j+1}</div>
          <div class="nm">${i.split(" vs ").map(u).join(' <span style="color:var(--dimmer);font-weight:500">vs</span> ')}</div>
          <div class="val mono">${f}</div>
          <div class="unit mono">meetings</div>
        </div>`).join("")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Rating distribution</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 20V10M10 20V4M16 20v-8M2 20h20" stroke-linecap="round"/></svg>
      </div>
      <div class="hist">${t}</div>
    </div>
    <div class="an-panel">
      <div class="head"><h3>Matches played</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v5M12 15v5" stroke-linecap="round"/></svg>
      </div>
      ${v}
    </div>`;let y=()=>{M("#an-grid .hbar").forEach(i=>{i.style.height=i.dataset.h+"%"}),M("#an-grid .abar").forEach(i=>{i.style.width=i.dataset.w+"%"})};requestAnimationFrame(y),setTimeout(y,140),cs()}function Fs(){p("#settings-body").innerHTML=ls().map(s=>`
    <tr><td><b>${u(s.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${u(s.desc)}</div></td>
        <td class="val">${u(String(s.value))}</td></tr>`).join("")}function x(){let s=p("#admin-wrap");if(!(sessionStorage.getItem(Q)==="1")){s.innerHTML=`
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
    </div>`;let l=async()=>{let t=p("#admin-pw").value;try{let c=await fetch(Ns,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:t})});if(c.ok){sessionStorage.setItem(Q,"1"),sessionStorage.setItem(z,t),x(),k("Welcome back, commander.");return}if(c.status===429){k("Too many attempts \u2014 wait a few minutes.");return}}catch{}p("#admin-pw").style.borderColor="var(--red)",k("Wrong password.")};p("#admin-auth").addEventListener("click",l),p("#admin-pw").addEventListener("keydown",t=>{t.key==="Enter"&&l()});return}let a=G(),n=fs().length,r=O(),d='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',g=Object.entries(r.aliases).map(([l,t])=>`
    <div class="log-item">
      <div class="txt"><b>${u(l)}</b> \u2192 <b>${u(t)}</b>${r.aliasNotes&&r.aliasNotes[l]?` <span style="color:var(--dimmer)">\u2014 ${u(r.aliasNotes[l])}</span>`:""}</div>
      <button class="icon-btn" data-alias-del="${u(l)}" title="Remove name fix">${d}</button>
    </div>`).join("")||'<div class="empty">No name fixes yet.</div>',o=r.inactive.map(l=>`
    <div class="log-item">
      <div class="txt"><b>${u(l)}</b> <span style="color:var(--dimmer)">\u2014 inactive</span></div>
      <button class="icon-btn" data-inact-del="${u(l)}" title="Mark active again">${d}</button>
    </div>`).join("")||'<div class="empty">Nobody marked inactive.</div>',b=Object.keys({...r.seeds||{},...r.seedGlicko||{},...r.seedRd||{}}).map(l=>`
    <div class="log-item">
      <div class="txt"><b>${u(l)}</b> \xB7 <span style="color:var(--dimmer)">old</span> <b class="mono">${u(String((r.seeds||{})[l]!=null?(r.seeds||{})[l]:"\u2014"))}</b>${(r.seedGlicko||{})[l]!=null?` \xB7 <span style="color:var(--dimmer)">glicko</span> <b class="mono">${u(String(r.seedGlicko[l]))}</b>`:""}${(r.seedRd||{})[l]!=null?` \xB7 <span style="color:var(--dimmer)">rd</span> <b class="mono">${u(String(r.seedRd[l]))}</b>`:""}</div>
      <button class="icon-btn" data-seed-del="${u(l)}" title="Remove seed">${d}</button>
    </div>`).join("")||'<div class="empty">No seed overrides \u2014 players start from the sheet values.</div>',h=ls().map(l=>`
    <div class="set-row">
      <div class="lbl"><b>${u(l.name)}</b><div class="d">${u(String(l.desc||""))}</div></div>
      <input class="set-val mono" data-set-name="${u(l.name)}" value="${u(String(l.value))}">
    </div>`).join(""),w=l=>{let t=(l||"").trim().toLowerCase();return B().filter(v=>!t||v.a.toLowerCase().includes(t)||v.b.toLowerCase().includes(t)).slice(0,20).map(v=>`
      <div class="log-item fix-row" data-mkey="${v.key}">
        <div class="txt"><b>${u(v.a)}</b> <span style="color:var(--dimmer)">vs</span> <b>${u(v.b)}</b>${v.date?"":' <span class="tag legacy">legacy</span>'}</div>
        <input class="mono" data-f="sa" type="number" min="0" value="${v.sa}" title="Score 1">
        <input class="mono" data-f="sb" type="number" min="0" value="${v.sb}" title="Score 2">
        <input data-f="date" type="date" value="${v.date||""}" title="Match date">
        <button class="icon-btn" data-msave="${v.key}" title="Save fix"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-mdel="${v.key}" title="Delete match">${d}</button>
      </div>`).join("")||'<div class="empty">No matches found.</div>'};s.innerHTML=`
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
      <h3>Pending <span class="n">log</span> \u2014 ${a.length} local \xB7 ${n} published</h3>
      <div class="log-list" id="adm-list">
        ${a.length?a.map((l,t)=>`
          <div class="log-item">
            <div class="txt"><b>${u(l.a)}</b> ${l.sa}\u2013${l.sb} <b>${u(l.b)}</b></div>
            <div class="txt" style="color:var(--dimmer)">${u(l.date||"")}</div>
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
      <div class="log-list" id="ov-inact-list" style="margin-top:12px">${o}</div>
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
      <div id="ov-settings">${h}</div>
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
  </div>

  <datalist id="player-list">${T.players.map(l=>`<option value="${u(l.name)}">`).join("")}</datalist>`,p("#admin-lock").addEventListener("click",()=>{sessionStorage.removeItem(Q),sessionStorage.removeItem(z),x()}),p("#admin-publish").addEventListener("click",P);async function P(){let l=sessionStorage.getItem(z)||(window.prompt("Admin password:")||"").trim();if(!l){k("Publish cancelled.");return}let t=O(),c={},v=[];for(let[i,f]of Object.entries(t.matchEdits||{}))i.startsWith("a:")&&(c[i]=f);for(let i of t.matchRemoved||[])i.startsWith("a:")&&v.push(i);let m=B().filter(i=>i.admin).map(i=>({a:i.a,b:i.b,sa:i.sa,sb:i.sb,date:i.date||""})),y={matches:m,aliases:t.aliases||{},aliasNotes:t.aliasNotes||{},inactive:t.inactive||[],seeds:t.seeds||{},seedGlicko:t.seedGlicko||{},seedRd:t.seedRd||{},settings:t.settings||{},matchEdits:c,matchRemoved:v};try{let i=await fetch(ms,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:l,doc:y,message:`Publish match log (${m.length} matches)`})}),f=await i.json().catch(()=>({}));if(!i.ok||!f.ok){i.status===403&&sessionStorage.removeItem(z),k("Publish failed: "+(f.error||"HTTP "+i.status));return}window.LB_PUB=y,window.LB_LOG=m,X([]),E({}),L(),x(),k("Published! Everyone sees it on their next visit.")}catch{k("Publish failed: network error.")}}p("#admin-export").addEventListener("click",()=>{let l=new Blob([JSON.stringify(G(),null,2)],{type:"application/json"}),t=document.createElement("a");t.href=URL.createObjectURL(l),t.download="match-log.json",t.click(),URL.revokeObjectURL(t.href),k("Log exported.")}),p("#adm-add").addEventListener("click",()=>{let l=p("#adm-a").value.trim(),t=p("#adm-b").value.trim(),c=parseInt(p("#adm-sa").value,10),v=parseInt(p("#adm-sb").value,10);if(!l||!t||l.toLowerCase()===t.toLowerCase()||!Number.isFinite(c)||!Number.isFinite(v)){k("Fill in both players and scores.");return}let m=G();m.unshift({a:l,b:t,sa:c,sb:v,date:p("#adm-date")?p("#adm-date").value||new Date().toISOString().slice(0,10):new Date().toISOString().slice(0,10)}),X(m),L(),x(),k(`${l} ${c}\u2013${v} ${t} added \u2014 site recalculated live.`)}),p("#adm-list").addEventListener("click",l=>{let t=l.target.closest("[data-del]");if(!t)return;let c=G();c.splice(parseInt(t.dataset.del,10),1),X(c),L(),x()}),p("#ov-alias-add").addEventListener("click",()=>{let l=p("#ov-alias-a").value.trim(),t=p("#ov-alias-b").value.trim(),c=(p("#ov-alias-note")||{}).value.trim();if(!l||!t){k("Fill both: the wrong name and the correct player.");return}let v=R();E({...v,aliases:{...v.aliases||{},[l]:t},aliasNotes:c?{...v.aliasNotes||{},[l]:c}:v.aliasNotes||{}}),L(),x(),k(`Name fix saved \u2014 "${l}" now counts as ${t}.`)}),p("#ov-alias-list").addEventListener("click",l=>{let t=l.target.closest("[data-alias-del]");if(!t)return;let c=R(),v={...c.aliases||{}},m={...c.aliasNotes||{}};delete v[t.dataset.aliasDel],delete m[t.dataset.aliasDel],E({...c,aliases:v,aliasNotes:m}),L(),x()}),p("#ov-inact-toggle").addEventListener("click",()=>{let l=p("#ov-inact-n").value.trim();if(!l){k("Type a player name first.");return}let t=R(),c=O().inactive||[],v=c.includes(l)?c.filter(m=>m!==l):[...c,l];E({...t,inactive:v}),L(),x(),k(v.includes(l)?`${l} marked inactive.`:`${l} marked active again.`)}),p("#ov-inact-list").addEventListener("click",l=>{let t=l.target.closest("[data-inact-del]");if(!t)return;let c=R();E({...c,inactive:(O().inactive||[]).filter(v=>v!==t.dataset.inactDel)}),L(),x()}),p("#ov-seed-add").addEventListener("click",()=>{let l=p("#ov-seed-n").value.trim(),t=p("#ov-seed-v").value.trim(),c=p("#ov-seed-g").value.trim(),v=p("#ov-seed-rd").value.trim();if(!l){k("Pick a player first.");return}if(t===""&&c===""&&v===""){k("Enter an Old 0\u2013100 rating, or a Starting Glicko / RD.");return}let m=R(),y={...m.seeds||{}},i={...m.seedGlicko||{}},f={...m.seedRd||{}};t!==""&&Number.isFinite(Number(t))?y[l]=Number(t):delete y[l],c!==""&&Number.isFinite(Number(c))?i[l]=Number(c):delete i[l],v!==""&&Number.isFinite(Number(v))?f[l]=Number(v):delete f[l],E({...m,seeds:y,seedGlicko:i,seedRd:f}),L(),x(),k(`Seed saved for ${l}.`)}),p("#ov-seed-list").addEventListener("click",l=>{let t=l.target.closest("[data-seed-del]");if(!t)return;let c=t.dataset.seedDel,v=R(),m={...v.seeds||{}};delete m[c];let y={...v.seedGlicko||{}};delete y[c];let i={...v.seedRd||{}};delete i[c],E({...v,seeds:m,seedGlicko:y,seedRd:i}),L(),x()}),p("#ov-settings").addEventListener("change",l=>{let t=l.target.closest("[data-set-name]");if(!t)return;let c=R();E({...c,settings:{...c.settings||{},[t.dataset.setName]:t.value}}),L(),x(),k("Setting applied \u2014 everything recalculated.")}),p("#ov-set-reset").addEventListener("click",()=>{let l=R();E({...l,settings:{}}),L(),x(),k("Settings back to the master sheet values.")}),p("#ov-mq").addEventListener("input",()=>{p("#ov-mresults").innerHTML=w(p("#ov-mq").value)}),p("#ov-mresults").addEventListener("click",l=>{let t=l.target.closest("[data-msave]"),c=l.target.closest("[data-mdel]");if(t){let v=t.closest("[data-mkey]"),m=v.dataset.mkey,y=f=>v.querySelector(`[data-f="${f}"]`).value,i=R();E({...i,matchEdits:{...i.matchEdits||{},[m]:{sa:+y("sa"),sb:+y("sb"),date:y("date")}}}),L(),p("#ov-mresults").innerHTML=w(p("#ov-mq").value),k("Match fixed \u2014 ratings recalculated.")}else if(c){let v=c.dataset.mdel,m=R();E({...m,matchRemoved:[...new Set([...m.matchRemoved||[],v])]}),L(),p("#ov-mresults").innerHTML=w(p("#ov-mq").value),k("Match deleted \u2014 ratings recalculated.")}})}p("#search").addEventListener("input",s=>{let e=s.target.value.trim().toLowerCase(),a=p("#search-drop");if(!e){a.classList.remove("show");return}let n=T.players.filter(r=>r.name.toLowerCase().includes(e)).slice(0,8);if(!n.length){a.classList.remove("show");return}a.innerHTML=n.map(r=>`
    <a class="drop-row" href="#/player/${is(r.name)}">
      ${r.rank?H(r.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${u(r.name)}</span>
      <span class="mono" style="margin-left:auto;color:var(--dim)">${r.rating.toFixed(1)}</span>
    </a>`).join(""),a.classList.add("show")});document.addEventListener("click",s=>{s.target.closest(".search-box")||p("#search-drop").classList.remove("show"),s.target.closest(".drop-row")&&(p("#search-drop").classList.remove("show"),p("#search").value="")});var ps;function k(s){let e=p("#toast");e.textContent=s,e.classList.add("show"),clearTimeout(ps),ps=setTimeout(()=>e.classList.remove("show"),2600)}var I;function cs(){I&&I.disconnect(),I=new IntersectionObserver(s=>{s.forEach(e=>{e.isIntersecting&&(e.target.classList.add("in"),M(".cu",e.target).forEach(a=>ns(a,parseFloat(a.dataset.target),{dec:parseInt(a.dataset.dec||0)})),I.unobserve(e.target))})},{threshold:.12}),M(".reveal").forEach(s=>I.observe(s))}(function(){let e=p("#scroll-progress"),a=p("#to-top"),n=p("#page-home .hero-row"),r=document.querySelector(".topbar"),d=()=>{let g=window.scrollY,o=document.documentElement.scrollHeight-window.innerHeight;e&&(e.style.width=(o>0?g/o*100:0)+"%"),a&&a.classList.toggle("show",g>640),r&&r.classList.toggle("scrolled",g>10),n&&g<1400&&(n.style.transform=`translateY(${g*.14}px)`,n.style.opacity=String(Math.max(.3,1-g/950)))};window.addEventListener("scroll",d,{passive:!0}),a&&a.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),d()})();Rs();L();rs();ds();function ss(s,e){let a=s.indexOf("window."+e);if(a<0)return null;let n=s.indexOf("=",a);for(;n<s.length&&"{[".indexOf(s[n])<0;)n++;let r=0,d=!1,g="",o=!1;for(let b=n;b<s.length;b++){let h=s[b];if(d){o?o=!1:h==="\\"?o=!0:h===g&&(d=!1);continue}if(h==='"'||h==="'"){d=!0,g=h;continue}if(h==="{"||h==="[")r++;else if((h==="}"||h==="]")&&(r--,r<=0))return JSON.parse(s.slice(n,b+1))}return null}(async()=>{try{let s=await fetch("log.js?cb="+Date.now(),{cache:"no-store"});if(!s.ok)return;let e=await s.text(),a=ss(e,"LB_PUB")||(ss(e,"LB_LOG")?{matches:ss(e,"LB_LOG")}:null);if(!a)return;JSON.stringify(a)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=a,window.LB_LOG=a.matches||[],L(),rs(),ds())}catch{}})();})();
