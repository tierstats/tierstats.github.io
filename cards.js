/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var O=["bronze","silver","gold","platinum","diamond","master","grandmaster"],vt={bronze:-1/0,silver:1300,gold:1550,platinum:1700,diamond:1850,master:1950,grandmaster:2e3};function gt(e){let s=window.LB_TIER_MIN||{};return s[e]!=null?Number(s[e]):vt[e]}function _(e){let s="bronze";for(let a of O)e>=gt(a)&&(s=a);return s}function nt(e){return O.indexOf(e)}function E(e){return t("cards.tier."+e)}function H(){return window.lbCards||null}function j(){let e=H();return e&&e.topOf?e.topOf():((window.LB_DATA||{}).qualified||[]).map(s=>({...s}))}function Y(e){let s=H();return s&&s.byName&&s.byName()[e]?s.byName()[e]:j().find(a=>a.name===e)||null}function B(e){let s=(window.LB_TANKS||{})[e],a=(window.LB_TANKS_SNAPSHOT||{})[e];return s?a?{...a,...s}:s:a||null}function rt(e){let s=H();return s&&s.histOf?s.histOf(e):((window.LB_DATA||{}).histories||{})[e]||[]}function bt(e){let s=H();return s&&s.fmtDate?s.fmtDate(e):String(e||"")}function kt(e){let s=H();return s&&s.deltaTag?s.deltaTag(e):""}function M(e){let s=H();return s&&s.resLetter?s.resLetter(e):e}function Ht(e){return rt(e).slice(0,5).reverse().map(a=>{let n=`${M(a.res)} \xB7 ${t("pl.vsOpp",{opp:String(a.opp||"")})} ${a.for_}-${a.against}`+(a.date?` \xB7 ${bt(a.date)}`:"");return`<i class="${a.res.toLowerCase()}" data-tip="${u(n)}">${u(M(a.res))}</i>`}).join("")}function qt(e){let s=rt(e),a=0,n=0,i="",c=0,r=s.slice().reverse();for(let d of r)d.res==="W"?(n+=1,n>a&&(a=n)):n=0;if(s.length){i=s[0].res,c=0;for(let d of s)if(d.res===i)c+=1;else break}return{best:a,curRes:i,curN:c}}var W=null;function At(e,s){if(!W){let i=H();if(W=i&&i.ratingTimeline?i.ratingTimeline():null,!W){W={};let c=window.LB_DATA||{};for(let r of Object.keys(c.curRatings||{})){let d=Math.max(c.curRatings[r]||-1/0,(c.prevRatings||{})[r]||-1/0);W[r]={rating:d,date:""}}}}let a=W[e],n=s??-1/0;return a?a.rating>=n?a:{rating:n,date:""}:n>-1/0?{rating:n,date:""}:null}function u(e){return String(e).replace(/[&<>"]/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[s])}function wt(e){let s=String(e).split(/[\s_\-.]+/).filter(Boolean);return((s[0]||"?")[0]+(s[1]?s[1][0]:(s[0]||"?")[1]||"")).toUpperCase()}var Bt='<svg class="pcard-sil" viewBox="0 0 120 72" aria-hidden="true"><g fill="currentColor"><rect x="18" y="40" width="84" height="15" rx="7.5"/><rect x="30" y="28" width="40" height="14" rx="6"/><rect x="63" y="32" width="45" height="5" rx="2.5"/><circle cx="33" cy="56" r="8"/><circle cx="53" cy="56" r="8"/><circle cx="73" cy="56" r="8"/><circle cx="93" cy="56" r="8"/></g></svg>';function Ft(e,s){return B(e)?`<div class="pcard-art-stage">${Bt}<canvas class="pcard-tank" data-tank-name="${u(e)}" data-tank-size="${s||"medium"}" aria-hidden="true"></canvas></div>`:`<div class="pcard-art-stage empty" title="${u(t("cards.noGame"))}"><div class="pcard-mono" aria-hidden="true">${u(wt(e))}</div></div>`}function Ot(e){let s="tt1v1_guide_"+e+"_v1";try{if(localStorage.getItem(s))return""}catch{}return`<aside class="page-guide" data-guide="${e}"><span class="pg-ico" aria-hidden="true">?</span><div class="pg-body"><b>${t("guide.title")}</b> ${t("guide."+e)}</div><button class="pg-x" data-guide-close="${e}" aria-label="${t("guide.dismiss")}">${t("guide.dismiss")}</button></aside>`}var Pt=0;function A(e){let s="pcg"+ ++Pt,a="M12 2.3l7.6 2.9v6.3c0 4.6-3 8.6-7.6 10.3C7.4 20.1 4.4 16.1 4.4 11.5V5.2z",n="M4.4 5.2L12 2.3l7.6 2.9v2.4c-2.6 1.7-5 2.3-7.6 2.3s-5-.6-7.6-2.3z",i="M4.4 13.6c2.7 1.8 5 2.4 7.6 2.4s4.9-.6 7.6-2.4v2c-2.7 1.9-5 2.5-7.6 2.5s-4.9-.6-7.6-2.5z",c=v=>`<path class="pc-glyph" d="${v}"/>`,r='<path class="pc-line" d="M8.8 10.8h6.4"/>',d='<path class="pc-line" d="M8.9 13.2L12 15.4l3.1-2.2"/>',w=c("M12 8.7l1.33 2.86 3.08.34-2.3 2.07.67 3.08L12 15.62l-2.78 1.43.67-3.08-2.3-2.07 3.08-.34z"),y=c("M12 8.8l2.4 1.9v2.8L12 15.6l-2.4-2.1v-2.8z"),S=c("M12 8.4l2.8 2.8-2.8 3.4-2.8-3.4z")+'<path class="pc-line" d="M9.6 11.2h4.8"/>',f=c("M7.6 15l-.85-4.7 2.65 2L12 8.1l2.6 4.2 2.65-2L16.4 15z"),k={bronze:"",silver:r+d,gold:w,platinum:y,diamond:S,master:f,grandmaster:'<path class="pc-line" d="M12 3.7v1.4M8.9 4.8l.75 1.1M15.1 4.8l-.75 1.1"/>'+f}[e]||"";return`<svg class="pc-crest" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="${s}" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="var(--tc1)"/><stop offset="1" stop-color="var(--tc2)"/></linearGradient></defs><path d="${a}" fill="url(#${s})" stroke="rgba(255,255,255,.32)" stroke-width=".9"/><path d="${n}" fill="rgba(255,255,255,.28)"/><path d="${i}" fill="rgba(0,0,0,.22)"/>${k}</svg>`}var $t='<svg class="pc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',Nt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',yt='<svg class="pc-crown" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.7 8.1 8.5 11l3.5-5.2L15.5 11l4.8-2.9-1.7 9.3H5.4L3.7 8.1Z"/><rect x="5.1" y="18.4" width="13.8" height="2.2" rx="1.1" fill="currentColor"/></svg>',zt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.8"/></svg>',ct='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11a8 8 0 1 1 2.2 6.5M4 5v6h6"/></svg>',Dt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg>',St='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',Wt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',Kt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"/></svg>';function jt(e,s){let a=_(e.rating),n=e.rank!=null?String(e.rank).padStart(2,"0"):"\u2014",i=H(),c=B(s),r=c&&c.lastLogin?Number(c.lastLogin):0,d=r&&i&&i.lastSeenText?i.lastSeenText(r):"",w=r&&i&&i.lastSeenExact?i.lastSeenExact(r):"";return`<div class="pcb-head">
    <div class="pcb-head-txt">
      <span class="pcb-kicker">${t("cards.statSheet")}</span>
      <span class="pcard-name-row"><a class="pcard-name pc-open" href="#/player/${encodeURIComponent(s)}" title="${t("cards.openProfile")}">${u(s)}</a><span class="vslot" data-vname="${u(s)}"></span></span>
      <span class="pcb-meta"><span>${E(a)}</span><b class="mono">#${n}</b></span>
      ${d?`<span class="pcb-head-seen" title="${u(t("cards.lastSeen"))} \xB7 ${u(w)}">${zt}${u(d)}</span>`:""}
    </div>
    <span class="pcb-head-side">
      <button type="button" class="pcb-flip" title="${u(t("cards.flipBack"))}" aria-label="${u(t("cards.flipBack"))}">${ct}</button>
      <span class="pcb-crest">${A(a)}</span>
    </span>
  </div>`}var Gt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',Lt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5M5 20.5h14"/></svg>';function Ut(e,s){let a=n=>u(t(n));return`<div class="pcard-actions pcb-foot">
    ${s?`<a class="pc-showcase" href="#/card/${encodeURIComponent(e)}" title="${a("cards.showcase")}" aria-label="${a("cards.showcase")}">
      ${Kt}<span>${a("cards.showcase")}</span>${St}
    </a>`:""}
    <div class="pcb-actions">
      <button class="pc-share pcb-icon-btn" data-share="copy" data-name="${u(e)}" title="${a("cards.shareCopy")}" aria-label="${a("cards.shareCopy")}">${Gt}</button>
      <button class="pc-share pcb-icon-btn" data-share="dl" data-name="${u(e)}" title="${a("cards.shareDl")}" aria-label="${a("cards.shareDl")}">${Lt}</button>
      <button class="pc-share pcb-icon-btn" data-share="link" data-name="${u(e)}" title="${a("cards.shareLink")}" aria-label="${a("cards.shareLink")}">${$t}</button>
    </div>
  </div>`}function Vt(e,s){let a=H(),n=At(s,e.rating),i=qt(s),c=B(s),r=c&&c.stats||null,d=e.provisional?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:e.rating.toFixed(1),w=r&&r.deaths?(r.kills/r.deaths).toFixed(2):r?String(r.kills):"\u2014",y=a&&a.altsOf?a.altsOf(s):[],S=c&&c.created?new Date((c.created||0)*1e3).getFullYear():"",f=(C,k,v)=>`<div class="pcb-cell"><span>${C}</span><b class="mono"${v?` data-live-name="${u(s)}" data-live="${v}"`:""}>${k}</b></div>`;return`
    <div class="pcb-hero">
      <div class="pcb-hero-cell">
        <span class="pc-k">${t("th.rating")}</span>
        <b class="mono${e.provisional?" prov":""}">${d}</b>
        ${e.delta?kt(e):""}
      </div>
      ${n?`<div class="pcb-hero-cell">
        <span class="pc-k">${t("cards.peak")}</span>
        <b class="mono">${n.rating.toFixed(1)}</b>
        <small>${n.date?bt(n.date):""}</small>
      </div>`:""}
    </div>
    <div class="pcb-grid">
      ${f(t("pl.glicko"),e.glicko.toFixed(1))}
      ${f(t("th.rd"),e.rd.toFixed(1))}
      ${f(t("pl.matches"),e.matches)}
      ${f(t("pl.opponents"),e.opponents)}
      ${f(t("th.avgOpp"),e.avgOpp.toFixed(1))}
      ${f(t("cards.bestStreak"),i.best?`${i.best}${M("W")}`:"\u2014")}
    </div>
    ${r?`
    <div class="pcb-game">
      <div class="pcb-game-head"><span class="pcb-kicker">${t("cards.gameStats")}</span>${S?`<span class="pcb-since">${t("cards.since",{year:S})}</span>`:""}</div>
      <div class="pcb-game-grid">
        ${f(t("cards.kills"),r.kills,"kills")}
        ${f(t("cards.deaths"),r.deaths,"deaths")}
        ${f(t("cards.victories"),r.victories,"victories")}
        ${f(t("cards.xp"),r.xp,"xp")}
        ${f(t("cards.rank"),r.rank!=null?r.rank:"\u2014","rank")}
        ${f(t("cards.kd"),w,"kd")}
      </div>
    </div>`:`<div class="pcb-game empty">${t("cards.noGame")}</div>`}
    ${y.length?`<div class="pcb-note"><span>${t("cards.alts")}</span><b>${y.map(u).join(", ")}</b></div>`:""}
`}function J(e,s){if(!e)return;let a=e.querySelector(".pcard-front"),n=e.querySelector(".pcard-back");a&&(a.inert=!!s,a.setAttribute("aria-hidden",s?"true":"false")),n&&(n.inert=!s,n.setAttribute("aria-hidden",s?"false":"true"))}function it(e,s){s=s||{};let a=e.name,n=_(e.rating),i=e.rank!=null?String(e.rank).padStart(2,"0"):"\u2014",c=e.provisional?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:e.rating.toFixed(1),r=e.inactive?`<span class="pc-retired">${t("cards.retired")}</span>`:"",d=e.winPct>=65?"hi":e.winPct>=50?"mid":"low";return`
  <article class="pcard-wrap pcard-v2 tier-${n}${e.rank===1?" is-champion":""}${s.hero?" card-hero":""}" data-name="${u(a)}">
    <div class="pcard">
      <div class="pcard-face pcard-front">
        <div class="pc-hero">
          <div class="pcard-art">
            ${Ft(a,s.size||"medium")}
            ${r}
          </div>
          <span class="pc-watermark mono${e.rank===1?" champ":""}" aria-hidden="true">${i}</span>
          <div class="pc-hero-top">
            <span class="pc-rank-tab">
              <span class="pc-rank-k">${e.rank===1?yt:""}${t(e.rank===1?"cards.champion":"cards.rankLabel")}</span>
              <b class="pc-rank-n mono">${i}</b>
            </span>
            <span class="pc-tier-mark">
              <span class="pc-head-crest">${A(n)}</span>
              <span class="pc-tier-name">${E(n)}</span>
            </span>
          </div>
        </div>
        <div class="pcard-body">
          <div class="pcard-name-row"><div class="pcard-name">${u(a)}</div><span class="vslot" data-vname="${u(a)}"></span></div>
          <div class="pc-metrics">
            <div class="pc-metric pc-metric-rating">
              <span class="pc-k">${t("th.rating")}</span>
              <div class="pc-big-row"><b class="pc-big mono${e.provisional?" prov":""}">${c}</b></div>
            </div>
            <div class="pc-metric pc-metric-win">
              <span class="pc-k">${t("th.winPct")}</span>
              <b class="pc-winrate mono">${e.winPct.toFixed(1)}%</b>
              <span class="pc-winbar ${d}" aria-hidden="true"><i style="width:${e.winPct}%"></i></span>
            </div>
          </div>
          <div class="pc-bottom">
            <span class="pc-rec mono"><span class="w">${e.w}${M("W")}</span> <span class="l">${e.l}${M("L")}</span> <span class="d">${e.d}${M("D")}</span></span>
            <span class="pc-form"><span class="pc-k">${t("cards.form")}</span><span class="pills">${Ht(a)}</span></span>
          </div>
        </div>
        <button class="pc-flip-cue" type="button">
          <span class="fc-label">${t("cards.statSheet")}</span>
          <span class="fc-rule" aria-hidden="true"></span>
          <span class="fc-flip">${ct}</span>
        </button>
      </div>
      <div class="pcard-face pcard-back">
        ${jt(e,a)}
        <div class="pcard-back-scroll" tabindex="0" role="group" aria-label="${u(t("cards.statSheet"))}">
          ${Vt(e,a)}
        </div>
        ${Ut(a,!(s.showcase||s.hero))}
      </div>
    </div>
  </article>`}var G=null;function Yt(e){if(!("IntersectionObserver"in window))return;G&&(G.disconnect(),G=null);let s=[...(e||document).querySelectorAll(".pcard-wrap.tier-diamond, .pcard-wrap.tier-master, .pcard-wrap.tier-grandmaster")];s.length&&(G=new IntersectionObserver(a=>{a.forEach(n=>{n.target.classList.toggle("anim-off",!n.isIntersecting)})},{rootMargin:"240px"}),s.forEach(a=>G.observe(a)))}var ot=new Set,P=new Map,Ct=e=>String(e||"").toLowerCase(),U=0;function Tt(e){(e||[...P.keys()]).forEach(s=>{let a=P.get(s);a&&(P.delete(s),a.forEach(n=>n()))}),!P.size&&U&&(clearTimeout(U),U=0)}window.lbTankFreshMark=e=>{let s=(e||[]).map(Ct);s.forEach(a=>ot.add(a)),Tt(s)};function xt(e,s){let a=Ct(e);if(ot.has(a)){s();return}P.has(a)||P.set(a,new Set),P.get(a).add(s),U||(U=setTimeout(()=>Tt(null),1200)),typeof window.lbTankWant=="function"&&(window.lbTankWant(e),typeof window.lbLiveStatsTick=="function"&&window.lbLiveStatsTick())}function R(e){let s=0;(e||document).querySelectorAll(".pcard-name").forEach(a=>{if(!a.offsetWidth){s++;return}a.style.fontSize="";let n=parseFloat(getComputedStyle(a).fontSize)||21,i=14;for(let c=n;c>i;c-=1)if(a.style.fontSize=c+"px",a.scrollWidth<=a.clientWidth+1)return;a.style.fontSize=i+"px"}),R._n=s?(R._n||0)+1:0,s&&R._n<8&&!R._t&&(R._t=setTimeout(()=>{R._t=0,R(e||document)},130))}document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>R(document));var X=[],Z=!1;function Jt(e){if(X.push(e),Z)return;Z=!0;let s=()=>{let a=X.shift();if(a)try{a()}catch{}X.length?setTimeout(s,0):Z=!1};setTimeout(s,0)}function q(e){(!e||e.id!=="card-showcase")&&Yt(e),typeof window.decorateVerified=="function"&&window.decorateVerified(e||document),(e||document).querySelectorAll(".pcard").forEach(n=>J(n,n.classList.contains("flipped"))),R(e);let s=[...(e||document).querySelectorAll("canvas[data-tank-name]")];if(!s.length)return;let a=n=>{if(n.dataset.mounted||n.dataset.parked)return;let i=n.dataset.tankName;n.dataset.parked="1",xt(i,()=>{n.dataset.parked="",!(n.dataset.mounted||!n.isConnected)&&(n.dataset.mounted="1",Jt(()=>{if(!n.isConnected)return;let c=B(i);if(c&&window.TankRender){let r=window.TankRender.render(n,c,n.dataset.tankSize||"medium"),d=w=>{if(w===!1){delete n.dataset.mounted;return}n.isConnected&&(n.classList.add("tank-painted"),n.parentElement&&n.parentElement.classList.add("art-live"))};r&&r.then?r.then(d,()=>d(!1)):d()}}))})};if("IntersectionObserver"in window){let n=new IntersectionObserver(i=>{let c=i.filter(d=>d.isIntersecting).map(d=>d.target),r=()=>{c.splice(0,3).forEach(d=>{a(d),n.unobserve(d)}),c.length&&setTimeout(r,50)};r()},{rootMargin:"240px"});s.forEach(i=>n.observe(i))}else s.forEach(a);clearTimeout(q._heal),q._heal=setTimeout(()=>{(e||document).querySelectorAll("canvas[data-tank-name]").forEach(n=>{n.dataset.mounted&&n.classList.contains("tank-painted")||(delete n.dataset.mounted,delete n.dataset.parked,a(n))})},2500)}var pt="tt1v1_cardtiers";function Qt(e){let s={};try{s=JSON.parse(localStorage.getItem(pt)||"{}")||{}}catch{s={}}let a=new Set;e.forEach(n=>{let i=nt(_(n.rating));s[n.name]!=null&&i>s[n.name]&&a.add(n.name),s[n.name]=i});try{localStorage.setItem(pt,JSON.stringify(s))}catch{}return a}function lt(e){let s=Y(e);if(!s)return Promise.reject(new Error("no player"));let a=_(s.rating),n=800,i=1e3,c=document.createElement("canvas");c.width=n,c.height=i;let r=c.getContext("2d"),d=r.createLinearGradient(0,0,0,i);d.addColorStop(0,"#10151d"),d.addColorStop(1,"#0b0e14"),r.fillStyle=d,r.fillRect(0,0,n,i);let w=document.querySelector(`.pcard-wrap.tier-${a}`),y=w?getComputedStyle(w):null,S=y&&y.getPropertyValue("--tc1").trim()||"#8a6a3f",f=y&&y.getPropertyValue("--tc2").trim()||"#5c4526",C=y&&y.getPropertyValue("--tfg").trim()||"#f2d9ae";r.strokeStyle=S,r.lineWidth=14,r.strokeRect(22,22,n-44,i-44),r.globalAlpha=.16,r.fillStyle=f,r.fillRect(22,22,n-44,300),r.globalAlpha=1;let k=B(e),v=document.createElement("canvas");return(k&&window.TankRender?window.TankRender.render(v,k,"large"):Promise.resolve()).then(()=>{if(k&&window.TankRender){let I=660*(v.height/v.width||.6);r.drawImage(v,(n-660)/2,110,660,I)}else r.fillStyle=f,r.font="900 150px Archivo, sans-serif",r.textAlign="center",r.fillText(wt(e),n/2,300);return r.textAlign="center",r.fillStyle="#eef2f8",r.font="900 64px Archivo, sans-serif",r.fillText(e,n/2,560),r.fillStyle=C,r.font="700 30px Inter, sans-serif",r.fillText(E(a).toUpperCase()+(s.rank!=null?"  \xB7  #"+s.rank:""),n/2,610),r.fillStyle="#eef2f8",r.font='800 110px "JetBrains Mono", monospace',r.fillText(s.rating.toFixed(1),n/2,740),r.fillStyle="#98a4b8",r.font="600 30px Inter, sans-serif",r.fillText(`${s.winPct.toFixed(1)}%  \xB7  ${s.w}${M("W")}\u2013${s.l}${M("L")}\u2013${s.d}${M("D")}`,n/2,795),r.fillStyle="#5d6a80",r.font="500 22px Inter, sans-serif",r.fillText("tierstats.github.io \u2014 1v1 Leaderboard",n/2,935),c})}function Xt(e,s){let a=location.origin+"/player/"+encodeURIComponent(e),n=()=>K(s,t("cards.linkCopied"));navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(a).then(n,()=>K(s,a)):K(s,a)}function Zt(e,s,a){if(s==="link"){Xt(e,a);return}lt(e).then(n=>{s==="copy"&&navigator.clipboard&&window.ClipboardItem?n.toBlob(i=>{navigator.clipboard.write([new ClipboardItem({"image/png":i})]).then(()=>K(a,t("cards.copied"))).catch(()=>ft(n,e,a))}):ft(n,e,a)}).catch(()=>K(a,t("cards.shareFail")))}function ft(e,s,a){let n=document.createElement("a");n.download=`1v1-card-${s}.png`,n.href=e.toDataURL("image/png"),n.click(),K(a,t("cards.copied"))}function K(e,s){if(!e)return;let a=String(s).replace(/\s*[✓✔]\s*$/,""),n=e.closest(".pcb-actions");if(n){if(n.classList.contains("is-flash"))return;let c=n.innerHTML;n.classList.add("is-flash"),n.innerHTML=`<div class="pcb-flash" role="status">${Nt}<span>${u(a)}</span></div>`,setTimeout(()=>{n.isConnected&&(n.classList.remove("is-flash"),n.innerHTML=c)},1600);return}let i=e.innerHTML;e.textContent=s,e.classList.add("ok"),setTimeout(()=>{e.innerHTML=i,e.classList.remove("ok")},1600)}function st(){let e=document.getElementById("page-cards");if(!e)return;let s=(window.lbDataRev||0)+"|"+(window.getLang?window.getLang():"");if(e.dataset.deckSig===s&&e.querySelector("#deck-grid"))return;e.dataset.deckSig=s;let a=j().slice().sort((l,b)=>(l.rank!=null?l.rank:9999)-(b.rank!=null?b.rank:9999)||l.name.localeCompare(b.name));if(!a.length){e.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("cards.deckEmpty")}</div></div></div>`;return}let n={};O.forEach(l=>{n[l]=0}),a.forEach(l=>{n[_(l.rating)]+=1});let i=Qt(a),c=a[0]?a[0].name:"";e.innerHTML=`
  <div class="wrap">
    <section class="hero deck-hero anim">
      <div class="kicker" data-i18n="cards.kicker">${t("cards.kicker")}</div>
      <h1 data-i18n-html="cards.h1">${t("cards.h1")}</h1>
      <p class="sub" data-i18n="cards.sub">${t("cards.sub")}</p>
      <div class="hero-row deck-meta">
        <i class="hm-rule" aria-hidden="true"></i>
        <span class="hm">${tp("cards.count",a.length).replace(/^(\d+)/,"<b>$1</b>")}</span>
        <i class="hm-sep" aria-hidden="true"></i>
        <span class="hm">${t("cards.metaTiers",{n:O.length})}</span>
        <i class="hm-sep" aria-hidden="true"></i>
        <span class="hm">${t("cards.metaTop",{name:u(c)})}</span>
      </div>
    </section>

    <section class="deck-shell anim">
      <div class="deck-set" id="deck-set">
        <div class="deck-set-head">
          <span class="deck-set-k">${t("cards.dist")}</span>
          <span class="deck-set-hint">${t("cards.distTip")}</span>
        </div>
        <div class="deck-dist" aria-hidden="true">
          ${O.slice().reverse().map(l=>`<i class="tier-${l}" style="flex-grow:${n[l]}"></i>`).join("")}
        </div>
        <div class="deck-tiers" role="group" aria-label="${u(t("cards.dist"))}">
          <button type="button" class="deck-tier is-all on" data-tier-filter="all" aria-pressed="true">
            <span class="dt-name">${t("cards.allTiers")}</span><b class="mono">${a.length}</b>
          </button>
          ${O.slice().reverse().map(l=>`
            <button type="button" class="deck-tier tier-${l}" data-tier-filter="${l}" aria-pressed="false"${n[l]?"":" disabled"}>
              <span class="dt-crest">${A(l)}</span>
              <span class="dt-name">${E(l)}</span>
              <b class="mono">${n[l]}</b>
            </button>`).join("")}
        </div>
      </div>

      <div class="deck-toolbar">
        <div class="deck-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3" stroke-linecap="round"/></svg>
          <input id="deck-search" type="text" placeholder="${t("cards.searchPh")}" aria-label="${u(t("cards.searchPh"))}" data-i18n-attr="placeholder:cards.searchPh" autocomplete="off">
          <button type="button" class="deck-clear" id="deck-clear" aria-label="${u(t("lb.clearSearch"))}" hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
          </button>
        </div>
        <div class="deck-sort" role="group" aria-label="${u(t("cards.sort"))}">
          <span class="deck-sort-k">${t("cards.sort")}</span>
          <button type="button" class="deck-sort-btn on" data-sort="rank" aria-pressed="true">${t("cards.sortRank")}</button>
          <button type="button" class="deck-sort-btn" data-sort="rating" aria-pressed="false">${t("cards.sortRating")}</button>
          <button type="button" class="deck-sort-btn" data-sort="name" aria-pressed="false">${t("cards.sortName")}</button>
        </div>
        <span class="deck-count mono" id="deck-count">${tp("cards.count",a.length)}</span>
      </div>

      <div class="deck-cards" id="deck-grid"></div>
    </section>
  </div>`;let r=document.getElementById("deck-grid"),d=document.getElementById("deck-search"),w=document.getElementById("deck-clear"),y=document.getElementById("deck-count"),S=document.getElementById("deck-set"),f="all",C="",k="rank",v={rank:(l,b)=>(l.rank!=null?l.rank:9999)-(b.rank!=null?b.rank:9999)||l.name.localeCompare(b.name),rating:(l,b)=>b.rating-l.rating||(l.rank!=null?l.rank:9999)-(b.rank!=null?b.rank:9999),name:(l,b)=>l.name.localeCompare(b.name)},T=()=>e.querySelectorAll(".deck-tier").forEach(l=>{let b=l.dataset.tierFilter===f;l.classList.toggle("on",b),l.setAttribute("aria-pressed",String(b))}),L=()=>e.querySelectorAll(".deck-sort-btn").forEach(l=>{let b=l.dataset.sort===k;l.classList.toggle("on",b),l.setAttribute("aria-pressed",String(b))});function I(){f="all",k="rank",C="",d.value="",w.hidden=!0,T(),L(),x()}function x(){let l=a.filter(p=>(f==="all"||_(p.rating)===f)&&(!C||p.name.toLowerCase().includes(C))).sort(v[k]);if(y.textContent=tp("cards.count",l.length),e.querySelectorAll(".deck-dist i").forEach(p=>{p.classList.toggle("on",f!=="all"&&p.classList.contains("tier-"+f))}),S.classList.toggle("filtered",f!=="all"),!l.length){r.innerHTML=`<div class="deck-empty">
        <span class="deck-empty-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3.5" y="5.5" width="12" height="16" rx="2"/><path d="M8 3.5h10a2 2 0 0 1 2 2V18"/><path d="M8 11h4M8 15h4"/></svg></span>
        <p>${u(t("cards.deckEmpty"))}</p>
        <button type="button" class="deck-reset" data-deck-reset>${u(t("cards.clearFilters"))}</button>
      </div>`;let p=r.querySelector("[data-deck-reset]");p&&p.addEventListener("click",I),q(r),typeof observeReveals=="function"&&observeReveals();return}let b=r.__paintGen=(r.__paintGen||0)+1;r.innerHTML="";let N=10,z=10,o=0,h=()=>{if(r.__paintGen!==b||!r.isConnected)return;let p=o===0?N:z,g=l.slice(o,o+p);if(r.insertAdjacentHTML("beforeend",g.map(m=>it(m)).join("")),i.size&&g.forEach(m=>{let $=r.querySelector(`.pcard-wrap[data-name="${CSS.escape(m.name)}"]`);$&&i.has(m.name)&&$.classList.add("tier-up")}),o+=p,o<l.length){requestAnimationFrame(h);return}q(r),typeof observeReveals=="function"&&observeReveals()};h()}x(),d.addEventListener("input",()=>{C=d.value.trim().toLowerCase(),w.hidden=!d.value,x()}),w.addEventListener("click",()=>{d.value="",C="",w.hidden=!0,d.focus(),x()}),e.querySelectorAll("[data-tier-filter]").forEach(l=>{l.addEventListener("click",()=>{l.disabled||(f=l.dataset.tierFilter,T(),x())})}),e.querySelectorAll("[data-sort]").forEach(l=>{l.addEventListener("click",()=>{k=l.dataset.sort,L(),x()})}),q(e),typeof observeReveals=="function"&&observeReveals()}function te(e){let s=Y(e);return s?`<div class="pv-card-slot tier-${_(s.rating)}">${it(s,{hero:!0})}</div>`:""}function ee(e){let s=Y(e);if(!s)return"";let a=_(s.rating);return`<span class="tier-chip tier-${a}" title="${E(a)}" aria-label="${E(a)}">${A(a)}</span>`}document.addEventListener("click",e=>{let s=e.target.closest("[data-guide-close]");if(s){try{localStorage.setItem("tt1v1_guide_"+s.dataset.guideClose+"_v1","1")}catch{}let i=s.closest(".page-guide");i&&i.remove();return}let a=e.target.closest(".pc-share");if(a){e.stopPropagation(),Zt(a.dataset.name,a.dataset.share,a);return}let n=e.target.closest(".pcard");n&&!e.target.closest("a[href]")&&(n.classList.toggle("flipped"),J(n,n.classList.contains("flipped")))});document.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;let s=document.activeElement&&document.activeElement.classList&&document.activeElement.classList.contains("pcard")?document.activeElement:null;s&&(e.preventDefault(),s.classList.toggle("flipped"),J(s,s.classList.contains("flipped")))});function se(){if(window.__lbTipInit)return;window.__lbTipInit=!0;let e=document.createElement("div");e.className="lb-tip lb-tip-hide",e.setAttribute("aria-hidden","true"),e.innerHTML=`
    <div class="lbt-head">
      <span class="lbt-tier"><span class="lbt-crest"></span><span class="lbt-tier-name"></span></span>
      <span class="lbt-rank mono"></span>
    </div>
    <div class="lbt-stage"><span class="lbt-notank" aria-hidden="true"></span><canvas></canvas></div>
    <div class="lbt-name"></div>
    <div class="lbt-line"><span class="lbt-rating mono"></span><span class="lbt-delta"></span></div>
    <div class="lbt-rec mono"></div>
    <div class="lbt-meta mono"></div>
    <div class="lbt-foot"><span class="lbt-form"></span><span class="lbt-open">${u(t("cards.openProfile"))} <i aria-hidden="true">\u2192</i></span></div>`,document.body.appendChild(e);let s=e.querySelector("canvas"),a=e.querySelector(".lbt-notank"),n=e.querySelector(".lbt-name"),i=e.querySelector(".lbt-crest"),c=e.querySelector(".lbt-tier-name"),r=e.querySelector(".lbt-rank"),d=e.querySelector(".lbt-rating"),w=e.querySelector(".lbt-delta"),y=e.querySelector(".lbt-rec"),S=e.querySelector(".lbt-meta"),f=e.querySelector(".lbt-form"),C=650,k=null,v=null,T=null,L=null,I=0,x=Promise.resolve(),l=o=>{let h=o.getBoundingClientRect(),p=e.offsetWidth||236,g=e.offsetHeight||224,m=Math.max(12,Math.min(window.innerWidth-p-12,h.left+42)),$=document.querySelector("#full-rankings .lb-bar"),F=Math.max(8,$?$.getBoundingClientRect().bottom+8:8),D=h.top-g+4;if(D<F){let ut=h.bottom-4;D=ut+g<=window.innerHeight-8?ut:Math.max(F,window.innerHeight-g-8)}e.style.left=m+"px",e.style.top=Math.round(D)+"px"};document.addEventListener("mouseover",o=>{let h=o.target.closest&&o.target.closest(".lb-row");if(!(!h||!h.dataset.name)){if(clearTimeout(k),h===T){L&&(cancelAnimationFrame(I),I=requestAnimationFrame(()=>l(h)));return}T=h,L=null,clearTimeout(v),e.classList.add("lb-tip-hide"),v=setTimeout(()=>{if(v=null,T!==h)return;L=h.dataset.name;let p=Y(L),g=p?_(p.rating):"";if(p){n.textContent=L,i.className="lbt-crest"+(g?" tier-"+g:""),i.innerHTML=g?A(g):"",c.textContent=g?E(g):"";let $=(h.querySelector(".rank-badge .num")||{}).textContent||"";r.textContent=$?"#"+String($).trim():"",d.textContent=p.provisional?`${Math.round(p.rating-100)}\u2013${Math.round(p.rating+100)}`:p.rating.toFixed(1),d.classList.toggle("prov",!!p.provisional),w.innerHTML=kt(p)||"",y.innerHTML=`<b class="w">${p.w}${M("W")}</b> <b class="l">${p.l}${M("L")}</b> <b class="d">${p.d}${M("D")}</b> <span>\xB7 ${p.winPct}%</span>`,a.innerHTML=g?A(g):"",S.textContent=tp("cmp.meta",p.matches,{rd:p.rd.toFixed(1)});let F=rt(L).slice(0,5).reverse();f.innerHTML=F.length?`<span class="form">${F.map(D=>`<i class="${D.res.toLowerCase()}">${u(M(D.res))}</i>`).join("")}</span>`:""}e.className="lb-tip lb-tip-hide"+(g?" tier-"+g:"");let m=()=>{T===h&&(e.style.transition="none",l(h),e.offsetWidth,e.style.transition="",e.classList.remove("lb-tip-hide"))};xt(L,()=>{if(T!==h)return;let $=B(L);$&&window.TankRender?(s.style.display="block",a.style.display="none",x=x.catch(()=>{}).then(()=>window.TankRender.render(s,$,"medium")),x.then(m,m)):(s.style.display="none",a.style.display="grid",m())})},C)}});let b=()=>{e.matches(":hover")||(clearTimeout(v),v=null,T=null,e.classList.add("lb-tip-hide"),L=null)},N=o=>{clearTimeout(k),k=setTimeout(b,o)},z=()=>{clearTimeout(k),k=null,clearTimeout(v),v=null,T=null,L=null,e.classList.add("lb-tip-hide")};window.lbHideRowTip=z,document.addEventListener("mouseout",o=>{if(!(o.target.closest&&o.target.closest(".lb-row")))return;let p=o.relatedTarget;p&&p.closest&&p.closest(".lb-tip")||N(140)}),e.addEventListener("mouseenter",()=>clearTimeout(k)),e.addEventListener("mouseleave",()=>N(160)),e.addEventListener("click",()=>{if(!L)return;let o=L;z(),location.hash="#/player/"+encodeURIComponent(o)}),window.addEventListener("scroll",b,{passive:!0})}se();function ae(e){let s=document.getElementById("deck-grid");if(!s)return;let a=[...s.querySelectorAll(".pcard-wrap")],n=a.find(c=>c.dataset.name===e);if(!n){let c=String(e||"").toLowerCase();n=a.find(r=>(r.dataset.name||"").toLowerCase()===c)}if(!n)return;n.scrollIntoView({behavior:"smooth",block:"center"});let i=n.querySelector(".pcard");i&&(i.classList.add("flipped"),J(i,!0))}function Mt(){let e=String(window.lbCardReturnHash||"");return/^#\/[a-z]/i.test(e)&&!e.startsWith("#/card/")?e:"#/cards"}var ne=[[4,18,3,6.8,-.2],[96,14,2,7.4,.9],[2,48,2,5.6,1.6],[98,56,3,6.2,.3],[6,76,3,7.1,1.1],[94,84,2,5.9,.6],[12,96,2,6.5,1.9],[88,4,2,7.8,.1],[26,100,2,5.4,1.3],[73,1,3,6.9,.8],[0,33,2,6.1,2.1],[100,70,2,7.3,1.5],[17,6,2,5.8,.5],[82,97,3,6.6,1.8],[10,62,2,7.7,1],[90,38,2,5.5,2.3]];function re(e){let s=e.name,a=_(e.rating),n=nt(a),i=j().length,c=String(e.rank!=null?e.rank:i).padStart(2,"0"),r=e.rank===1,d=e.provisional?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:e.rating.toFixed(1),w=u(Mt()),y=n>=4?n===4?8:n===5?12:16:0,S=y?ne.slice(0,y).map(([f,C,k,v,T])=>`<i class="cs-spark" style="--x:${f}%;--y:${C}%;--s:${k}px;--d:${v}s;--dl:${T}s"></i>`).join(""):"";return`
  <div class="cs tier-${a}${r?" is-champion":""}" id="card-showcase" role="dialog"
       aria-modal="true" aria-labelledby="cs-title" tabindex="-1">
    <div class="cs-scene" aria-hidden="true">
      <span class="cs-ghost">${u(E(a))}</span>
      <span class="cs-rays cs-rays-a"></span>
      <span class="cs-rays cs-rays-b"></span>
      <span class="cs-aurora cs-aurora-a"></span>
      <span class="cs-aurora cs-aurora-b"></span>
    </div>
    <header class="cs-bar">
      <a class="cs-back" href="#/cards">${Dt}<span>${t("cards.showcaseBack")}</span></a>
      <span class="cs-crumb">${t("cards.showcase")}</span>
      <a class="cs-close" href="${w}" aria-label="${u(t("cards.showcaseClose"))}" title="${u(t("cards.showcaseClose"))}">${Wt}<kbd aria-hidden="true">ESC</kbd></a>
    </header>
    <div class="cs-stage">
      <div class="cs-id">
        <div class="cs-kicker">
          <span class="cs-crest">${A(a)}</span>
          <span class="cs-tier">${E(a)}</span>
          ${r?`<em class="cs-champ">
            <span class="cs-champ-crest">${yt}</span>
            <span class="cs-champ-txt">${t("cards.champion")}</span>
            <span class="cs-champ-no">#${c}</span>
          </em>`:""}
        </div>
        <h1 class="cs-title" id="cs-title">${u(s)}</h1>
        <span class="cs-rule" aria-hidden="true"></span>
        <div class="cs-facts">
          <div class="cs-fact"><span>${t("th.rating")}</span><b class="mono${e.provisional?" prov":""}">${d}</b></div>
          <div class="cs-fact"><span>${t("th.winPct")}</span><b class="mono">${e.winPct.toFixed(1)}<small>%</small></b></div>
          <div class="cs-fact"><span>${t("pl.record")}</span><b class="mono">${e.w}\u2013${e.l}\u2013${e.d}</b></div>
        </div>
      </div>
      <div class="cs-figure" data-cs-figure>
        <span class="cs-figure-halo" aria-hidden="true"></span>
        <span class="cs-sparks" aria-hidden="true">${S}</span>
        <div class="cs-tilt">
          <div class="cs-float">
            <div class="cs-card">
              ${it(e,{size:"medium",showcase:!0})}
            </div>
          </div>
        </div>
        <span class="cs-plinth" aria-hidden="true"></span>
        <span class="cs-side cs-side-l" aria-hidden="true">TIERSTATS \xB7 1V1</span>
        <span class="cs-side cs-side-r" aria-hidden="true">THE DECK</span>
      </div>
      <div class="cs-actions">
        <a class="cs-btn cs-btn-primary" href="#/player/${encodeURIComponent(s)}">${t("cards.openProfile")}${St}</a>
        <button type="button" class="cs-btn" data-cs-flip aria-pressed="false">${ct}<span data-cs-flip-label>${t("cards.statSheet")}</span></button>
        <button type="button" class="cs-btn cs-iconbtn" data-cs-link title="${u(t("cards.shareLink"))}" aria-label="${u(t("cards.shareLink"))}">${$t}</button>
        <button type="button" class="cs-btn cs-iconbtn" data-cs-save title="${u(t("cards.shareDl"))}" aria-label="${u(t("cards.shareDl"))}">${Lt}</button>
        <p class="cs-hint" aria-live="polite">${t("cards.showcaseHint")}</p>
      </div>
    </div>
    <footer class="cs-foot">
      <span>${u(E(a).toUpperCase())} \xB7 ${t("cards.showcase")}</span>
      <span class="mono">${c} <i>/</i> ${String(i).padStart(2,"0")}</span>
    </footer>
  </div>`}function tt(e){let s=e&&e.querySelector?e.querySelector(".cs-title"):null;if(!s||!s.offsetWidth)return;s.style.fontSize="";let a=parseFloat(getComputedStyle(s).fontSize)||68;for(let n=a;n>27;n-=2)if(s.style.fontSize=n+"px",s.scrollWidth<=s.clientWidth+1)return;s.style.fontSize="27px"}function Et(e){if(e){if((e.__csBg||[]).forEach(s=>{try{s.inert=!1}catch{}}),e.__csBg=null,e.__csRO){try{e.__csRO.disconnect()}catch{}e.__csRO=null}e.__csKey&&(document.removeEventListener("keydown",e.__csKey,!0),e.__csKey=null),document.documentElement.classList.remove("cs-lock")}}var at=0;function _t(){let e=document.getElementById("card-showcase");if(!e)return;if(Et(e),clearTimeout(at),!!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)){e.remove();return}e.classList.add("cs-out"),at=setTimeout(()=>{e.isConnected&&e.remove()},260)}function ce(e){let s=String(e||"").toLowerCase(),a=j().find(o=>o.name===e)||j().find(o=>o.name.toLowerCase()===s);if(!a)return _t(),!1;clearTimeout(at);let n=document.getElementById("card-showcase");n&&(Et(n),n.remove());let i=document.createElement("div");i.innerHTML=re(a).trim();let c=i.firstElementChild;document.body.appendChild(c),document.documentElement.classList.add("cs-lock");let r=[];[...document.body.children].forEach(o=>{if(!(o===c||o.tagName==="SCRIPT"||o.tagName==="STYLE"||o.tagName==="LINK")&&!o.inert)try{o.inert=!0,r.push(o)}catch{}}),c.__csBg=r,q(c),tt(c),document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>{c.isConnected&&tt(c)}),window.ResizeObserver&&(c.__csRO=new ResizeObserver(()=>tt(c)),c.__csRO.observe(c.querySelector(".cs-id")));let d=c.querySelector(".pcard"),w=c.querySelector("[data-cs-flip]"),y=c.querySelector("[data-cs-flip-label]"),S=c.querySelector(".cs-hint"),f=0,C=!!(window.matchMedia&&matchMedia("(pointer: coarse)").matches),k=t(C||window.innerWidth<=760?"cards.showcaseHintTouch":"cards.showcaseHint");S.textContent=k;let v=(o,h)=>{clearTimeout(f),S.textContent=o,S.classList.toggle("is-ok",h==="ok"),S.classList.toggle("is-err",h==="err"),S.classList.toggle("is-url",h==="url"),f=setTimeout(()=>{c.isConnected&&(S.textContent=k,S.classList.remove("is-ok","is-err","is-url"))},h==="url"?9e3:2400)},T=()=>{let o=!!(d&&d.classList.contains("flipped"));w&&w.setAttribute("aria-pressed",String(o)),y&&(y.textContent=o?t("cards.flipBack"):t("cards.statSheet"))},L=()=>{if(!d)return;let o=!d.classList.contains("flipped");d.classList.toggle("flipped",o),J(d,o),T()};c.addEventListener("click",o=>{if(o.target.closest("[data-cs-flip]")){o.preventDefault(),L();return}if(o.target.closest("[data-cs-link]")){o.preventDefault();let m=location.origin+"/card/"+encodeURIComponent(a.name),$=()=>v(t("cards.linkCopied"),"ok");navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(m).then($,()=>v(m,"url")):v(m,"url");return}let g=o.target.closest("[data-cs-save]");if(g){o.preventDefault(),g.disabled=!0,lt(a.name).then(m=>{let $=document.createElement("a");$.download=`1v1-card-${a.name}.png`,$.href=m.toDataURL("image/png"),$.click(),v(t("cards.copied"),"ok")}).catch(()=>v(t("cards.shareFail"),"err")).finally(()=>{g.isConnected&&(g.disabled=!1)});return}o.target.closest(".pcard")&&requestAnimationFrame(T)});let I=o=>{if(o.key==="Escape"){o.preventDefault(),o.stopPropagation(),location.hash=Mt();return}if(o.key!=="Tab")return;let h=[...c.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter($=>!$.closest("[inert]")&&$.getClientRects().length);if(!h.length)return;let p=h[0],g=h[h.length-1],m=document.activeElement;o.shiftKey&&(m===p||!c.contains(m))?(o.preventDefault(),g.focus()):!o.shiftKey&&(m===g||!c.contains(m))&&(o.preventDefault(),p.focus())};c.__csKey=I,document.addEventListener("keydown",I,!0);let x=c.querySelector("[data-cs-figure]"),l=c.querySelector(".cs-tilt"),b=window.matchMedia&&matchMedia("(pointer: fine)").matches,N=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;if(x&&l&&b&&!N){let o=0,h=0,p=0,g=()=>{if(o=0,!x.isConnected)return;let m=x.getBoundingClientRect();if(!m.width||!m.height)return;let $=Math.max(-.5,Math.min(.5,(h-m.left)/m.width-.5)),F=Math.max(-.5,Math.min(.5,(p-m.top)/m.height-.5));l.style.transform=`perspective(1600px) rotateX(${(-F*5).toFixed(2)}deg) rotateY(${($*7).toFixed(2)}deg)`};x.addEventListener("pointermove",m=>{h=m.clientX,p=m.clientY,o||(o=requestAnimationFrame(g))}),x.addEventListener("pointerleave",()=>{o&&(cancelAnimationFrame(o),o=0),l.style.transform=""})}let z=c.querySelector(".cs-close");return requestAnimationFrame(()=>{try{z.focus({preventScroll:!0})}catch{c.focus()}}),!0}var Q=!1,ht=new Set;function ie(e){if(!window.TankRender||!e)return;let s=String(e).toLowerCase(),a=Y(e)||j().find(i=>i.name.toLowerCase()===s);if(!a||ht.has(a.name))return;let n=B(a.name);if(n){ht.add(a.name);try{let i=document.createElement("canvas"),c=window.TankRender.render(i,n,"medium");c&&c.catch&&c.catch(()=>{})}catch{}}}function Rt(e){let s=document.getElementById("page-cards");if(!s||s.querySelector("#deck-grid")||s.classList.contains("active"))return;if(e){Q=!1,st();return}if(Q||(navigator.connection||{}).saveData||navigator.hardwareConcurrency&&navigator.hardwareConcurrency<4||navigator.deviceMemory&&navigator.deviceMemory<4)return;Q=!0;let n=()=>{if(Q=!1,document.visibilityState!=="visible")return;let i=document.getElementById("page-cards");!i||i.querySelector("#deck-grid")||i.classList.contains("active")||st()};window.requestIdleCallback?window.requestIdleCallback(n,{timeout:4500}):setTimeout(n,2200)}function oe(){let e=document.getElementById("page-cards");!e||!e.classList.contains("active")||!e.querySelector("#deck-grid")||(q(e),typeof observeReveals=="function"&&observeReveals())}var le=e=>e&&e.closest?e.closest('a[href="#/cards"], a[href^="#/card/"]'):null;function dt(e){let s=le(e.target);if(!s)return;Rt(!0);let a=s.getAttribute("href")||"";if(a.startsWith("#/card/"))try{ie(decodeURIComponent(a.slice(7)))}catch{}}document.addEventListener("pointerover",dt,{passive:!0});document.addEventListener("focusin",dt);document.addEventListener("pointerdown",dt,{passive:!0});window.renderCards=st;window.cardsShowcase=ce;window.cardsShowcaseClose=_t;window.cardsPreload=Rt;window.cardsReveal=oe;function V(){let e=document.querySelectorAll(".pcard-wrap.card-hero");e.length&&e.forEach(s=>{let a=s.querySelector(".pcard"),n=s.querySelector(".pcard-back-scroll");if(!a||!n)return;a.style.minHeight="";let i=n.scrollHeight-n.clientHeight;i>0&&(a.style.minHeight=Math.ceil(a.getBoundingClientRect().height+i)+"px")})}window.fitHeroCards=V;var et=!1;function It(){et||(et=!0,setTimeout(()=>{et=!1,V(),setTimeout(V,250)},0))}new MutationObserver(It).observe(document.documentElement,{childList:!0,subtree:!0});var mt;window.addEventListener("resize",()=>{clearTimeout(mt),mt=setTimeout(V,150)});document.fonts&&document.fonts.ready&&document.fonts.ready.then(V);It();window.cardsFocus=ae;window.cardsHeroHTML=te;window.lbTankFor=B;window.lbTankFresh=ot;window.cardsRowChip=ee;window.cardsMountAll=q;window.fitCardNames=R;window.cardsSharePNG=lt;window.cardsGuideHTML=Ot;window.cardsTiers={TIER_KEYS:O,TIER_MIN:vt,tierMin:gt,tierOf:_,tierIdx:nt,tierLabel:E,crestSVG:A};})();
