/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var y=["bronze","silver","gold","platinum","diamond","master","grandmaster"],R={bronze:-1/0,silver:1300,gold:1550,platinum:1700,diamond:1850,master:1950,grandmaster:2e3};function A(e){let a=window.LB_TIER_MIN||{};return a[e]!=null?Number(a[e]):R[e]}function w(e){let a="bronze";for(let s of y)e>=A(s)&&(a=s);return a}function O(e){return y.indexOf(e)}function g(e){return t("cards.tier."+e)}function b(){return window.lbCards||null}function E(){let e=b();return e&&e.topOf?e.topOf():((window.LB_DATA||{}).qualified||[]).map(a=>({...a}))}function M(e){let a=b();return a&&a.byName&&a.byName()[e]?a.byName()[e]:E().find(s=>s.name===e)||null}function x(e){return(window.LB_TANKS||{})[e]||(window.LB_TANKS_SNAPSHOT||{})[e]||null}function N(e){let a=b();return a&&a.histOf?a.histOf(e):((window.LB_DATA||{}).histories||{})[e]||[]}function B(e){let a=b();return a&&a.fmtDate?a.fmtDate(e):String(e||"")}function _(e){let a=b();return a&&a.deltaTag?a.deltaTag(e):""}function m(e){let a=b();return a&&a.resLetter?a.resLetter(e):e}function q(e){return N(e).slice(0,5).reverse().map(s=>{let n=`${m(s.res)} \xB7 ${t("pl.vsOpp",{opp:String(s.opp||"")})} ${s.for_}-${s.against}`+(s.date?` \xB7 ${B(s.date)}`:"");return`<i class="${s.res.toLowerCase()}" data-tip="${u(n)}">${u(m(s.res))}</i>`}).join("")}function z(e){let a=N(e),s=0,n=0,i="",c=0,r=a.slice().reverse();for(let d of r)d.res==="W"?(n+=1,n>s&&(s=n)):n=0;if(a.length){i=a[0].res,c=0;for(let d of a)if(d.res===i)c+=1;else break}return{best:s,curRes:i,curN:c}}var k=null;function W(e,a){if(!k){let i=b();if(k=i&&i.ratingTimeline?i.ratingTimeline():null,!k){k={};let c=window.LB_DATA||{};for(let r of Object.keys(c.curRatings||{})){let d=Math.max(c.curRatings[r]||-1/0,(c.prevRatings||{})[r]||-1/0);k[r]={rating:d,date:""}}}}let s=k[e],n=a??-1/0;return s?s.rating>=n?s:{rating:n,date:""}:n>-1/0?{rating:n,date:""}:null}function u(e){return String(e).replace(/[&<>"]/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[a])}function F(e){let a=String(e).split(/[\s_\-.]+/).filter(Boolean);return((a[0]||"?")[0]+(a[1]?a[1][0]:(a[0]||"?")[1]||"")).toUpperCase()}function G(e,a){return x(e)?`<canvas class="pcard-tank" data-tank-name="${u(e)}" data-tank-size="${a||"medium"}"></canvas>`:`<div class="pcard-mono" aria-hidden="true">${u(F(e))}</div>`}var j=0;function L(e){let a="pcg"+ ++j,s="M12 2.3l7.6 2.9v6.3c0 4.6-3 8.6-7.6 10.3C7.4 20.1 4.4 16.1 4.4 11.5V5.2z",n="M4.4 5.2L12 2.3l7.6 2.9v2.4c-2.6 1.7-5 2.3-7.6 2.3s-5-.6-7.6-2.3z",i="M4.4 13.6c2.7 1.8 5 2.4 7.6 2.4s4.9-.6 7.6-2.4v2c-2.7 1.9-5 2.5-7.6 2.5s-4.9-.6-7.6-2.5z",c=h=>`<path class="pc-glyph" d="${h}"/>`,r='<path class="pc-line" d="M8.8 10.8h6.4"/>',d='<path class="pc-line" d="M8.9 13.2L12 15.4l3.1-2.2"/>',v=c("M12 8.7l1.33 2.86 3.08.34-2.3 2.07.67 3.08L12 15.62l-2.78 1.43.67-3.08-2.3-2.07 3.08-.34z"),f=c("M12 8.8l2.4 1.9v2.8L12 15.6l-2.4-2.1v-2.8z"),o=c("M12 8.4l2.8 2.8-2.8 3.4-2.8-3.4z")+'<path class="pc-line" d="M9.6 11.2h4.8"/>',l=c("M7.6 15l-.85-4.7 2.65 2L12 8.1l2.6 4.2 2.65-2L16.4 15z"),$={bronze:"",silver:r+d,gold:v,platinum:f,diamond:o,master:l,grandmaster:'<path class="pc-line" d="M12 3.7v1.4M8.9 4.8l.75 1.1M15.1 4.8l-.75 1.1"/>'+l}[e]||"";return`<svg class="pc-crest" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="${a}" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="var(--tc1)"/><stop offset="1" stop-color="var(--tc2)"/></linearGradient></defs><path d="${s}" fill="url(#${a})" stroke="rgba(255,255,255,.32)" stroke-width=".9"/><path d="${n}" fill="rgba(255,255,255,.28)"/><path d="${i}" fill="rgba(0,0,0,.22)"/>${$}</svg>`}var V='<svg class="pc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';function U(e,a){let s=b(),n=W(a,e.rating),i=z(a),c=x(a),r=c&&c.stats||null,d=E()[0],v="";if(d&&d.name!==a&&s&&s.h2hOf){let l=s.h2hOf(a).find(p=>p.opp===d.name);v=l?t("cards.h2hTop",{name:u(d.name)})+` \u2014 ${l.w}${m("W")}\xB7${l.l}${m("L")}\xB7${l.d}${m("D")}`:t("cards.h2hNone")}let f=r&&r.deaths?(r.kills/r.deaths).toFixed(2):r?String(r.kills):"\u2014",o=s&&s.altsOf?s.altsOf(a):[];return`
    <div class="pcard-stats">
      <div class="pc-row"><span>${t("pl.glicko")}</span><b class="mono">${e.glicko.toFixed(1)}</b></div>
      <div class="pc-row"><span>${t("th.rd")}</span><b class="mono">${e.rd.toFixed(1)}</b></div>
      <div class="pc-row"><span>${t("pl.matches")}</span><b class="mono">${e.matches}</b></div>
      <div class="pc-row"><span>${t("pl.opponents")}</span><b class="mono">${e.opponents}</b></div>
      <div class="pc-row"><span>${t("pl.avgOppRating")}</span><b class="mono">${e.avgOpp.toFixed(1)}</b></div>
      ${n?`<div class="pc-row"><span>${t("cards.peak")}</span><b class="mono">${n.rating.toFixed(1)}${n.date?`<small> ${t("cards.peakOn",{date:B(n.date)})}</small>`:""}</b></div>`:""}
      <div class="pc-row"><span>${t("cards.bestStreak")}</span><b class="mono">${i.best?`${i.best}${m("W")}`:"\u2014"}${i.curN>1?`<small> \xB7 ${t("cards.curStreak")} ${i.curRes==="W"?"W":i.curRes==="L"?"L":"D"}${i.curN}</small>`:""}</b></div>
      ${e.delta?`<div class="pc-row"><span>${t("cards.seasonDelta")}</span><b class="mono">${_(e)}</b></div>`:""}
    </div>
    ${r?`
    <div class="pcard-game">
      <div class="pc-game-title">${t("cards.gameStats")}</div>
      <div class="pc-game-grid">
        <div class="pc-gs"><span>${t("cards.kills")}</span><b class="mono" data-live-name="${u(a)}" data-live="kills">${r.kills}</b></div>
        <div class="pc-gs"><span>${t("cards.deaths")}</span><b class="mono" data-live-name="${u(a)}" data-live="deaths">${r.deaths}</b></div>
        <div class="pc-gs"><span>${t("cards.victories")}</span><b class="mono" data-live-name="${u(a)}" data-live="victories">${r.victories}</b></div>
        <div class="pc-gs"><span>${t("cards.xp")}</span><b class="mono" data-live-name="${u(a)}" data-live="xp">${r.xp}</b></div>
        <div class="pc-gs wide"><span>${t("cards.rank")}</span><b class="mono" data-live-name="${u(a)}" data-live="rank">${r.rank!=null?r.rank:"\u2014"}</b></div>
        <div class="pc-gs kd"><span>${t("cards.kd")}</span><b class="mono" data-live-name="${u(a)}" data-live="kd">${f}</b></div>
      </div>
      <div class="pc-game-foot">
        ${c&&c.badge&&c.badge!=="0"?`<span class="pc-badge" data-live-name="${u(a)}" data-live="badge">${t("cards.badge",{n:c.badge})}</span>`:""}
        ${c&&c.created?`<span class="pc-since">${t("cards.since",{year:new Date((c.created||0)*1e3).getFullYear()})}</span>`:""}
      </div>
    </div>`:`<div class="pcard-game empty">${t("cards.noGame")}</div>`}
    ${o.length?`<div class="pc-alt"><span>${t("cards.alts")}:</span> ${o.map(u).join(", ")}</div>`:""}
    ${v?`<div class="pc-h2h">${v}</div>`:""}
    <div class="pcard-actions">
      <button class="pc-share" data-share="copy" data-name="${u(a)}">${t("cards.shareCopy")}</button>
      <button class="pc-share" data-share="dl" data-name="${u(a)}">${t("cards.shareDl")}</button>
      <button class="pc-share pc-share-link" data-share="link" data-name="${u(a)}">${V}<span>${t("cards.shareLink")}</span></button>
    </div>`}function H(e,a){a=a||{};let s=e.name,n=w(e.rating),i=e.inactive?`<span class="pc-retired">${t("cards.retired")}</span>`:"";return`
  <article class="pcard-wrap tier-${n}${a.hero?" card-hero":""}" data-name="${u(s)}">
    <div class="pcard" tabindex="0" role="button" aria-label="${u(s)} \u2014 ${g(n)} \u2014 ${t("cards.flipTip")}">
      <div class="pcard-face pcard-front">
        <div class="pcard-art">
          ${G(s,a.size||"medium")}
          ${e.rank!=null?`<span class="pc-rank-pill">#${e.rank}</span>`:""}
          <span class="pc-tier-crest">${L(n)}</span>
          ${i}
        </div>
        <div class="pcard-body">
          <div class="pcard-name">${u(s)}</div>
          <div class="pcard-tierline">${L(n)}<span>${g(n)}</span></div>
          <div class="pcard-rating">
            <span class="lbl">${t("th.rating")}</span>
            <div class="big-row"><span class="big mono">${e.provisional?u(`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`):e.rating.toFixed(1)}</span>${_(e)}</div>
          </div>
          <div class="pcard-record">
            <span class="wc mono">${e.winPct.toFixed(1)}%</span>
            <span class="rec mono"><span class="w">${e.w}${m("W")}</span> <span class="l">${e.l}${m("L")}</span> <span class="d">${e.d}${m("D")}</span></span>
          </div>
          <div class="pcard-form">
            <span class="lbl" data-tip="${t("cards.form")}">${t("cards.form")}</span>
            <span class="pills">${q(s)}</span>
          </div>
        </div>
      </div>
      <div class="pcard-face pcard-back">
        <div class="pcard-back-scroll">
          <div class="pcard-back-head">
            <a class="pcard-name pc-open" href="#/player/${encodeURIComponent(s)}" title="${t("cards.openProfile")}">${u(s)}</a>
            <div class="pcard-tierline">${L(n)}<span>${g(n)}</span></div>
          </div>
          ${U(e,s)}
        </div>
      </div>
    </div>
  </article>`}function S(e){let a=[...(e||document).querySelectorAll("canvas[data-tank-name]")];if(!a.length)return;let s=n=>{if(n.dataset.mounted)return;n.dataset.mounted="1";let i=x(n.dataset.tankName);i&&window.TankRender&&window.TankRender.render(n,i,n.dataset.tankSize||"medium")};if("IntersectionObserver"in window){let n=new IntersectionObserver(i=>{i.forEach(c=>{c.isIntersecting&&(s(c.target),n.unobserve(c.target))})},{rootMargin:"240px"});a.forEach(i=>n.observe(i))}else a.forEach(s)}var C="tt1v1_cardtiers";function K(e){let a={};try{a=JSON.parse(localStorage.getItem(C)||"{}")||{}}catch{a={}}let s=new Set;e.forEach(n=>{let i=O(w(n.rating));a[n.name]!=null&&i>a[n.name]&&s.add(n.name),a[n.name]=i});try{localStorage.setItem(C,JSON.stringify(a))}catch{}return s}function P(e){let a=M(e);if(!a)return Promise.reject(new Error("no player"));let s=w(a.rating),n=800,i=1e3,c=document.createElement("canvas");c.width=n,c.height=i;let r=c.getContext("2d"),d=r.createLinearGradient(0,0,0,i);d.addColorStop(0,"#10151d"),d.addColorStop(1,"#0b0e14"),r.fillStyle=d,r.fillRect(0,0,n,i);let v=document.querySelector(`.pcard-wrap.tier-${s}`),f=v?getComputedStyle(v):null,o=f&&f.getPropertyValue("--tc1").trim()||"#8a6a3f",l=f&&f.getPropertyValue("--tc2").trim()||"#5c4526",p=f&&f.getPropertyValue("--tfg").trim()||"#f2d9ae";r.strokeStyle=o,r.lineWidth=14,r.strokeRect(22,22,n-44,i-44),r.globalAlpha=.16,r.fillStyle=l,r.fillRect(22,22,n-44,300),r.globalAlpha=1;let $=x(e),h=document.createElement("canvas");return($&&window.TankRender?window.TankRender.render(h,$,"large"):Promise.resolve()).then(()=>{if($&&window.TankRender){let D=660*(h.height/h.width||.6);r.drawImage(h,(n-660)/2,110,660,D)}else r.fillStyle=l,r.font="900 150px Archivo, sans-serif",r.textAlign="center",r.fillText(F(e),n/2,300);return r.textAlign="center",r.fillStyle="#eef2f8",r.font="900 64px Archivo, sans-serif",r.fillText(e,n/2,560),r.fillStyle=p,r.font="700 30px Inter, sans-serif",r.fillText(g(s).toUpperCase()+(a.rank!=null?"  \xB7  #"+a.rank:""),n/2,610),r.fillStyle="#eef2f8",r.font='800 110px "JetBrains Mono", monospace',r.fillText(a.rating.toFixed(1),n/2,740),r.fillStyle="#98a4b8",r.font="600 30px Inter, sans-serif",r.fillText(`${a.winPct.toFixed(1)}%  \xB7  ${a.w}${m("W")}\u2013${a.l}${m("L")}\u2013${a.d}${m("D")}`,n/2,795),r.fillStyle="#5d6a80",r.font="500 22px Inter, sans-serif",r.fillText("tierstats.github.io \u2014 1v1 Leaderboard",n/2,935),c})}function J(e,a){let s=location.origin+location.pathname+"#/player/"+encodeURIComponent(e),n=()=>T(a,t("cards.linkCopied"));navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(s).then(n,()=>T(a,s)):T(a,s)}function Y(e,a,s){if(a==="link"){J(e,s);return}P(e).then(n=>{a==="copy"&&navigator.clipboard&&window.ClipboardItem?n.toBlob(i=>{navigator.clipboard.write([new ClipboardItem({"image/png":i})]).then(()=>T(s,t("cards.copied"))).catch(()=>I(n,e,s))}):I(n,e,s)}).catch(()=>T(s,t("cards.shareFail")))}function I(e,a,s){let n=document.createElement("a");n.download=`1v1-card-${a}.png`,n.href=e.toDataURL("image/png"),n.click(),T(s,t("cards.copied"))}function T(e,a){if(!e)return;let s=e.innerHTML;e.textContent=a,e.classList.add("ok"),setTimeout(()=>{e.innerHTML=s,e.classList.remove("ok")},1600)}function Q(){let e=document.getElementById("page-cards");if(!e)return;let a=E().slice().sort((o,l)=>(o.rank!=null?o.rank:9999)-(l.rank!=null?l.rank:9999)||o.name.localeCompare(l.name));if(!a.length){e.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("cards.deckEmpty")}</div></div></div>`;return}let s={};y.forEach(o=>{s[o]=0}),a.forEach(o=>{s[w(o.rating)]+=1});let n=K(a);e.innerHTML=`
  <div class="wrap">
    <section class="hero anim" style="padding-top:10px">
      <div class="kicker" data-i18n="cards.kicker">${t("cards.kicker")}</div>
      <h1 style="font-size:clamp(36px,5vw,58px)" data-i18n-html="cards.h1">${t("cards.h1")}</h1>
      <p class="sub" data-i18n="cards.sub">${t("cards.sub")}</p>
    </section>

    <section class="tier-strip anim" id="tier-strip" title="${t("cards.distTip")}">
      <div class="ts-label">${t("cards.dist")}</div>
      ${y.slice().reverse().map(o=>`
        <button class="tseg tier-${o}" data-tier="${o}" ${s[o]?"":"disabled"}>
          ${L(o)}<span class="tn">${g(o)}</span><b class="mono">${s[o]}</b>
        </button>`).join("")}
    </section>

    <section class="anim">
      <div class="deck-controls reveal">
        <div class="lb-filter-box">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3" stroke-linecap="round"/></svg>
          <input id="deck-search" type="text" placeholder="${t("cards.searchPh")}" data-i18n-attr="placeholder:cards.searchPh" autocomplete="off">
        </div>
        <div class="deck-chips">
          <button class="chip on" data-tier-filter="all">${t("cards.allTiers")}</button>
          ${y.slice().reverse().map(o=>`<button class="chip tier-chip-btn tier-${o}" data-tier-filter="${o}">${g(o)}</button>`).join("")}
        </div>
        <span class="deck-count mono" id="deck-count">${tp("cards.count",a.length)}</span>
      </div>
      <div class="deck-grid" id="deck-grid"></div>
    </section>
  </div>`;let i=document.getElementById("deck-grid"),c=document.getElementById("deck-search"),r=document.getElementById("deck-count"),d="all",v="";function f(){let o=a.filter(l=>(d==="all"||w(l.rating)===d)&&(!v||l.name.toLowerCase().includes(v)));i.innerHTML=o.map(l=>H(l)).join("")||`<div class="empty" style="grid-column:1/-1;padding:30px;text-align:center;color:var(--dim)">${t("cards.deckEmpty")}</div>`,o.forEach(l=>{let p=i.querySelector(`.pcard-wrap[data-name="${CSS.escape(l.name)}"]`);p&&n.has(l.name)&&p.classList.add("tier-up")}),r.textContent=tp("cards.count",o.length),S(i),typeof observeReveals=="function"&&observeReveals()}f(),c.addEventListener("input",()=>{v=c.value.trim().toLowerCase(),f()}),e.querySelectorAll("[data-tier-filter]").forEach(o=>{o.addEventListener("click",()=>{d=o.dataset.tierFilter,e.querySelectorAll("[data-tier-filter]").forEach(l=>l.classList.toggle("on",l===o)),f()})}),e.querySelectorAll(".tseg[data-tier]").forEach(o=>{o.addEventListener("click",()=>{let l=e.querySelector(`[data-tier-filter="${o.dataset.tier}"]`);l&&l.click(),document.getElementById("deck-grid").scrollIntoView({behavior:"smooth",block:"start"})})}),S(e),typeof observeReveals=="function"&&observeReveals()}function X(e){let a=M(e);return a?`<div class="pv-card-slot tier-${w(a.rating)}">${H(a,{hero:!0})}</div>`:""}function Z(e){let a=M(e);if(!a)return"";let s=w(a.rating);return`<span class="tier-chip tier-${s}" title="${g(s)}" aria-label="${g(s)}">${L(s)}</span>`}document.addEventListener("click",e=>{let a=e.target.closest(".pc-share");if(a){e.stopPropagation(),Y(a.dataset.name,a.dataset.share,a);return}let s=e.target.closest(".pcard");s&&!e.target.closest("a[href]")&&s.classList.toggle("flipped")});document.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;let a=document.activeElement&&document.activeElement.classList&&document.activeElement.classList.contains("pcard")?document.activeElement:null;a&&(e.preventDefault(),a.classList.toggle("flipped"))});function tt(){if(window.__lbTipInit)return;window.__lbTipInit=!0;let e=document.createElement("div");e.className="lb-tip lb-tip-hide",e.innerHTML="<canvas></canvas><span></span>",document.body.appendChild(e);let a=e.querySelector("canvas"),s=e.querySelector("span"),n=1100,i=null,c=null,r=null,d=null,v=0,f=Promise.resolve(),o=l=>{let p=l.getBoundingClientRect();e.style.left=Math.min(window.innerWidth-170,p.left+60)+"px",e.style.top=Math.max(8,p.top-96)+"px"};document.addEventListener("mouseover",l=>{let p=l.target.closest&&l.target.closest(".lb-row");if(!(!p||!p.dataset.name)){if(clearTimeout(i),p===r){d&&(cancelAnimationFrame(v),v=requestAnimationFrame(()=>o(p)));return}r=p,d=null,clearTimeout(c),e.classList.add("lb-tip-hide"),c=setTimeout(()=>{if(c=null,r!==p)return;d=p.dataset.name;let $=x(d);s.textContent=d;let h=()=>{r===p&&(e.style.transition="none",o(p),e.offsetWidth,e.style.transition="",e.classList.remove("lb-tip-hide"))};$&&window.TankRender?(a.style.display="block",f=f.catch(()=>{}).then(()=>window.TankRender.render(a,$,"small")),f.then(h,h)):(a.style.display="none",h())},n)}}),document.addEventListener("mouseout",l=>{l.target.closest&&l.target.closest(".lb-row")&&(clearTimeout(i),i=setTimeout(()=>{clearTimeout(c),c=null,r=null,e.classList.add("lb-tip-hide"),d=null},140))}),window.addEventListener("scroll",()=>{clearTimeout(c),c=null,r=null,e.classList.add("lb-tip-hide"),d=null},{passive:!0})}tt();function et(e){let a=document.getElementById("deck-grid");if(!a)return;let s=[...a.querySelectorAll(".pcard-wrap")],n=s.find(c=>c.dataset.name===e);if(!n){let c=String(e||"").toLowerCase();n=s.find(r=>(r.dataset.name||"").toLowerCase()===c)}if(!n)return;n.scrollIntoView({behavior:"smooth",block:"center"});let i=n.querySelector(".pcard");i&&i.classList.add("flipped")}window.renderCards=Q;window.cardsFocus=et;window.cardsHeroHTML=X;window.cardsRowChip=Z;window.cardsMountAll=S;window.cardsSharePNG=P;window.cardsTiers={TIER_KEYS:y,TIER_MIN:R,tierMin:A,tierOf:w,tierIdx:O,tierLabel:g,crestSVG:L};})();
