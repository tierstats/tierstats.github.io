/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var L=["bronze","silver","gold","platinum","diamond","master","grandmaster"],O={bronze:-1/0,silver:1300,gold:1550,platinum:1700,diamond:1850,master:1950,grandmaster:2e3};function N(a){let e=window.LB_TIER_MIN||{};return e[a]!=null?Number(e[a]):O[a]}function g(a){let e="bronze";for(let n of L)a>=N(n)&&(e=n);return e}function F(a){return L.indexOf(a)}function w(a){return t("cards.tier."+a)}function b(){return window.lbCards||null}function C(){let a=b();return a&&a.topOf?a.topOf():((window.LB_DATA||{}).qualified||[]).map(e=>({...e}))}function M(a){let e=b();return e&&e.byName&&e.byName()[a]?e.byName()[a]:C().find(n=>n.name===a)||null}function x(a){return(window.LB_TANKS||{})[a]||(window.LB_TANKS_SNAPSHOT||{})[a]||null}function P(a){let e=b();return e&&e.histOf?e.histOf(a):((window.LB_DATA||{}).histories||{})[a]||[]}function B(a){let e=b();return e&&e.fmtDate?e.fmtDate(a):String(a||"")}function I(a){let e=b();return e&&e.deltaTag?e.deltaTag(a):""}function h(a){let e=b();return e&&e.resLetter?e.resLetter(a):a}function _(a){return P(a).slice(0,5).reverse().map(n=>{let s=`${h(n.res)} \xB7 ${t("pl.vsOpp",{opp:String(n.opp||"")})} ${n.for_}-${n.against}`+(n.date?` \xB7 ${B(n.date)}`:"");return`<i class="${n.res.toLowerCase()}" data-tip="${p(s)}">${p(h(n.res))}</i>`}).join("")}function z(a){let e=P(a),n=0,s=0,c="",o=0,r=e.slice().reverse();for(let d of r)d.res==="W"?(s+=1,s>n&&(n=s)):s=0;if(e.length){c=e[0].res,o=0;for(let d of e)if(d.res===c)o+=1;else break}return{best:n,curRes:c,curN:o}}var y=null;function W(a,e){if(!y){let c=b();if(y=c&&c.ratingTimeline?c.ratingTimeline():null,!y){y={};let o=window.LB_DATA||{};for(let r of Object.keys(o.curRatings||{})){let d=Math.max(o.curRatings[r]||-1/0,(o.prevRatings||{})[r]||-1/0);y[r]={rating:d,date:""}}}}let n=y[a],s=e??-1/0;return n?n.rating>=s?n:{rating:s,date:""}:s>-1/0?{rating:s,date:""}:null}function p(a){return String(a).replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e])}function H(a){let e=String(a).split(/[\s_\-.]+/).filter(Boolean);return((e[0]||"?")[0]+(e[1]?e[1][0]:(e[0]||"?")[1]||"")).toUpperCase()}function G(a,e){return x(a)?`<canvas class="pcard-tank" data-tank-name="${p(a)}" data-tank-size="${e||"medium"}"></canvas>`:`<div class="pcard-mono" aria-hidden="true">${p(H(a))}</div>`}var j=0;function k(a){let e="pcg"+ ++j,n="M12 2.3l7.6 2.9v6.3c0 4.6-3 8.6-7.6 10.3C7.4 20.1 4.4 16.1 4.4 11.5V5.2z",s="M4.4 5.2L12 2.3l7.6 2.9v2.4c-2.6 1.7-5 2.3-7.6 2.3s-5-.6-7.6-2.3z",c="M4.4 13.6c2.7 1.8 5 2.4 7.6 2.4s4.9-.6 7.6-2.4v2c-2.7 1.9-5 2.5-7.6 2.5s-4.9-.6-7.6-2.5z",o=$=>`<path class="pc-glyph" d="${$}"/>`,r='<path class="pc-line" d="M8.8 10.8h6.4"/>',d='<path class="pc-line" d="M8.9 13.2L12 15.4l3.1-2.2"/>',f=o("M12 8.7l1.33 2.86 3.08.34-2.3 2.07.67 3.08L12 15.62l-2.78 1.43.67-3.08-2.3-2.07 3.08-.34z"),v=o("M12 8.8l2.4 1.9v2.8L12 15.6l-2.4-2.1v-2.8z"),m=o("M12 8.4l2.8 2.8-2.8 3.4-2.8-3.4z")+'<path class="pc-line" d="M9.6 11.2h4.8"/>',u=o("M7.6 15l-.85-4.7 2.65 2L12 8.1l2.6 4.2 2.65-2L16.4 15z"),l={bronze:"",silver:r+d,gold:f,platinum:v,diamond:m,master:u,grandmaster:'<path class="pc-line" d="M12 3.7v1.4M8.9 4.8l.75 1.1M15.1 4.8l-.75 1.1"/>'+u}[a]||"";return`<svg class="pc-crest" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="${e}" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="var(--tc1)"/><stop offset="1" stop-color="var(--tc2)"/></linearGradient></defs><path d="${n}" fill="url(#${e})" stroke="rgba(255,255,255,.32)" stroke-width=".9"/><path d="${s}" fill="rgba(255,255,255,.28)"/><path d="${c}" fill="rgba(0,0,0,.22)"/>${l}</svg>`}var U='<svg class="pc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';function V(a,e){let n=b(),s=W(e,a.rating),c=z(e),o=x(e),r=o&&o.stats||null,d=C()[0],f="";if(d&&d.name!==e&&n&&n.h2hOf){let u=n.h2hOf(e).find(i=>i.opp===d.name);f=u?t("cards.h2hTop",{name:p(d.name)})+` \u2014 ${u.w}${h("W")}\xB7${u.l}${h("L")}\xB7${u.d}${h("D")}`:t("cards.h2hNone")}let v=r&&r.deaths?(r.kills/r.deaths).toFixed(2):r?String(r.kills):"\u2014",m=n&&n.altsOf?n.altsOf(e):[];return`
    <div class="pcard-stats">
      <div class="pc-row"><span>${t("pl.glicko")}</span><b class="mono">${a.glicko.toFixed(1)}</b></div>
      <div class="pc-row"><span>${t("th.rd")}</span><b class="mono">${a.rd.toFixed(1)}</b></div>
      <div class="pc-row"><span>${t("pl.matches")}</span><b class="mono">${a.matches}</b></div>
      <div class="pc-row"><span>${t("pl.opponents")}</span><b class="mono">${a.opponents}</b></div>
      <div class="pc-row"><span>${t("pl.avgOppRating")}</span><b class="mono">${a.avgOpp.toFixed(1)}</b></div>
      ${s?`<div class="pc-row"><span>${t("cards.peak")}</span><b class="mono">${s.rating.toFixed(1)}${s.date?`<small> ${t("cards.peakOn",{date:B(s.date)})}</small>`:""}</b></div>`:""}
      <div class="pc-row"><span>${t("cards.bestStreak")}</span><b class="mono">${c.best?`${c.best}${h("W")}`:"\u2014"}${c.curN>1?`<small> \xB7 ${t("cards.curStreak")} ${c.curRes==="W"?"W":c.curRes==="L"?"L":"D"}${c.curN}</small>`:""}</b></div>
      ${a.delta?`<div class="pc-row"><span>${t("cards.seasonDelta")}</span><b class="mono">${I(a)}</b></div>`:""}
    </div>
    ${r?`
    <div class="pcard-game">
      <div class="pc-game-title">${t("cards.gameStats")}</div>
      <div class="pc-game-grid">
        <div class="pc-gs"><span>${t("cards.kills")}</span><b class="mono" data-live-name="${p(e)}" data-live="kills">${r.kills}</b></div>
        <div class="pc-gs"><span>${t("cards.deaths")}</span><b class="mono" data-live-name="${p(e)}" data-live="deaths">${r.deaths}</b></div>
        <div class="pc-gs"><span>${t("cards.victories")}</span><b class="mono" data-live-name="${p(e)}" data-live="victories">${r.victories}</b></div>
        <div class="pc-gs"><span>${t("cards.xp")}</span><b class="mono" data-live-name="${p(e)}" data-live="xp">${r.xp}</b></div>
        <div class="pc-gs wide"><span>${t("cards.rank")}</span><b class="mono" data-live-name="${p(e)}" data-live="rank">${r.rank!=null?r.rank:"\u2014"}</b></div>
        <div class="pc-gs kd"><span>${t("cards.kd")}</span><b class="mono" data-live-name="${p(e)}" data-live="kd">${v}</b></div>
      </div>
      <div class="pc-game-foot">
        ${o&&o.badge&&o.badge!=="0"?`<span class="pc-badge" data-live-name="${p(e)}" data-live="badge">${t("cards.badge",{n:o.badge})}</span>`:""}
        ${o&&o.created?`<span class="pc-since">${t("cards.since",{year:new Date((o.created||0)*1e3).getFullYear()})}</span>`:""}
      </div>
    </div>`:`<div class="pcard-game empty">${t("cards.noGame")}</div>`}
    ${m.length?`<div class="pc-alt"><span>${t("cards.alts")}:</span> ${m.map(p).join(", ")}</div>`:""}
    ${f?`<div class="pc-h2h">${f}</div>`:""}
    <div class="pcard-actions">
      <button class="pc-share" data-share="copy" data-name="${p(e)}">${t("cards.shareCopy")}</button>
      <button class="pc-share" data-share="dl" data-name="${p(e)}">${t("cards.shareDl")}</button>
      <button class="pc-share pc-share-link" data-share="link" data-name="${p(e)}">${U}<span>${t("cards.shareLink")}</span></button>
    </div>`}function S(a,e){e=e||{};let n=a.name,s=g(a.rating),c=a.inactive?`<span class="pc-retired">${t("cards.retired")}</span>`:"";return`
  <article class="pcard-wrap tier-${s}${e.hero?" hero":""}${e.cotw?" cotw":""}" data-name="${p(n)}">
    <div class="pcard" tabindex="0" role="button" aria-label="${p(n)} \u2014 ${w(s)} \u2014 ${t("cards.flipTip")}">
      <div class="pcard-face pcard-front">
        <div class="pcard-art">
          ${G(n,e.size||"medium")}
          ${a.rank!=null?`<span class="pc-rank-pill">#${a.rank}</span>`:""}
          <span class="pc-tier-crest">${k(s)}</span>
          ${c}
        </div>
        <div class="pcard-body">
          <div class="pcard-name">${p(n)}</div>
          <div class="pcard-tierline">${k(s)}<span>${w(s)}</span></div>
          <div class="pcard-rating">
            <span class="lbl">${t("th.rating")}</span>
            <div class="big-row"><span class="big mono">${a.provisional?p(`${Math.round(a.rating-100)}\u2013${Math.round(a.rating+100)}`):a.rating.toFixed(1)}</span>${I(a)}</div>
          </div>
          <div class="pcard-record">
            <span class="wc mono">${a.winPct.toFixed(1)}%</span>
            <span class="rec mono"><span class="w">${a.w}${h("W")}</span> <span class="l">${a.l}${h("L")}</span> <span class="d">${a.d}${h("D")}</span></span>
          </div>
          <div class="pcard-form">
            <span class="lbl" data-tip="${t("cards.form")}">${t("cards.form")}</span>
            <span class="pills">${_(n)}</span>
          </div>
        </div>
      </div>
      <div class="pcard-face pcard-back">
        <div class="pcard-back-scroll">
          <div class="pcard-back-head">
            <a class="pcard-name pc-open" href="#/player/${encodeURIComponent(n)}" title="${t("cards.openProfile")}">${p(n)}</a>
            <div class="pcard-tierline">${k(s)}<span>${w(s)}</span></div>
          </div>
          ${V(a,n)}
        </div>
      </div>
    </div>
  </article>`}function E(a){let e=[...(a||document).querySelectorAll("canvas[data-tank-name]")];if(!e.length)return;let n=s=>{if(s.dataset.mounted)return;s.dataset.mounted="1";let c=x(s.dataset.tankName);c&&window.TankRender&&window.TankRender.render(s,c,s.dataset.tankSize||"medium")};if("IntersectionObserver"in window){let s=new IntersectionObserver(c=>{c.forEach(o=>{o.isIntersecting&&(n(o.target),s.unobserve(o.target))})},{rootMargin:"240px"});e.forEach(c=>s.observe(c))}else e.forEach(n)}var R="tt1v1_cardtiers";function K(a){let e={};try{e=JSON.parse(localStorage.getItem(R)||"{}")||{}}catch{e={}}let n=new Set;a.forEach(s=>{let c=F(g(s.rating));e[s.name]!=null&&c>e[s.name]&&n.add(s.name),e[s.name]=c});try{localStorage.setItem(R,JSON.stringify(e))}catch{}return n}function D(a){let e=M(a);if(!e)return Promise.reject(new Error("no player"));let n=g(e.rating),s=800,c=1e3,o=document.createElement("canvas");o.width=s,o.height=c;let r=o.getContext("2d"),d=r.createLinearGradient(0,0,0,c);d.addColorStop(0,"#10151d"),d.addColorStop(1,"#0b0e14"),r.fillStyle=d,r.fillRect(0,0,s,c);let f=document.querySelector(`.pcard-wrap.tier-${n}`),v=f?getComputedStyle(f):null,m=v&&v.getPropertyValue("--tc1").trim()||"#8a6a3f",u=v&&v.getPropertyValue("--tc2").trim()||"#5c4526",i=v&&v.getPropertyValue("--tfg").trim()||"#f2d9ae";r.strokeStyle=m,r.lineWidth=14,r.strokeRect(22,22,s-44,c-44),r.globalAlpha=.16,r.fillStyle=u,r.fillRect(22,22,s-44,300),r.globalAlpha=1;let l=x(a),$=document.createElement("canvas");return(l&&window.TankRender?window.TankRender.render($,l,"large"):Promise.resolve()).then(()=>{if(l&&window.TankRender){let q=660*($.height/$.width||.6);r.drawImage($,(s-660)/2,110,660,q)}else r.fillStyle=u,r.font="900 150px Archivo, sans-serif",r.textAlign="center",r.fillText(H(a),s/2,300);return r.textAlign="center",r.fillStyle="#eef2f8",r.font="900 64px Archivo, sans-serif",r.fillText(a,s/2,560),r.fillStyle=i,r.font="700 30px Inter, sans-serif",r.fillText(w(n).toUpperCase()+(e.rank!=null?"  \xB7  #"+e.rank:""),s/2,610),r.fillStyle="#eef2f8",r.font='800 110px "JetBrains Mono", monospace',r.fillText(e.rating.toFixed(1),s/2,740),r.fillStyle="#98a4b8",r.font="600 30px Inter, sans-serif",r.fillText(`${e.winPct.toFixed(1)}%  \xB7  ${e.w}${h("W")}\u2013${e.l}${h("L")}\u2013${e.d}${h("D")}`,s/2,795),r.fillStyle="#5d6a80",r.font="500 22px Inter, sans-serif",r.fillText("tierstats.github.io \u2014 1v1 Leaderboard",s/2,935),o})}function J(a,e){let n=location.origin+location.pathname+"#/player/"+encodeURIComponent(a),s=()=>T(e,t("cards.linkCopied"));navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(n).then(s,()=>T(e,n)):T(e,n)}function Y(a,e,n){if(e==="link"){J(a,n);return}D(a).then(s=>{e==="copy"&&navigator.clipboard&&window.ClipboardItem?s.toBlob(c=>{navigator.clipboard.write([new ClipboardItem({"image/png":c})]).then(()=>T(n,t("cards.copied"))).catch(()=>A(s,a,n))}):A(s,a,n)}).catch(()=>T(n,t("cards.shareFail")))}function A(a,e,n){let s=document.createElement("a");s.download=`1v1-card-${e}.png`,s.href=a.toDataURL("image/png"),s.click(),T(n,t("cards.copied"))}function T(a,e){if(!a)return;let n=a.innerHTML;a.textContent=e,a.classList.add("ok"),setTimeout(()=>{a.innerHTML=n,a.classList.remove("ok")},1600)}function Q(){let a=document.getElementById("page-cards");if(!a)return;let e=C().slice().sort((i,l)=>(i.rank!=null?i.rank:9999)-(l.rank!=null?l.rank:9999)||i.name.localeCompare(l.name));if(!e.length){a.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("cards.deckEmpty")}</div></div></div>`;return}let n={};L.forEach(i=>{n[i]=0}),e.forEach(i=>{n[g(i.rating)]+=1});let s=e.slice().sort((i,l)=>(l.delta||0)-(i.delta||0))[0],c=t("cards.cotwChamp");s&&(s.delta||0)>.05?c=t("cards.cotwClimber",{n:(s.delta||0).toFixed(1)}):s=e[0];let o=K(e);a.innerHTML=`
  <div class="wrap">
    <section class="hero anim" style="padding-top:10px">
      <div class="kicker" data-i18n="cards.kicker">${t("cards.kicker")}</div>
      <h1 style="font-size:clamp(36px,5vw,58px)" data-i18n-html="cards.h1">${t("cards.h1")}</h1>
      <p class="sub" data-i18n="cards.sub">${t("cards.sub")}</p>
    </section>

    <section class="cotw anim">
      <div class="cotw-stage tier-${g(s.rating)}">
        <div class="cotw-info">
          <div class="kicker">${t("cards.cotw")}</div>
          <h2 class="cotw-name">${p(s.name)}</h2>
          <div class="cotw-tierline">${k(g(s.rating))}<span>${w(g(s.rating))}</span>${I(s)}</div>
          <div class="cotw-note">${c}</div>
          <div class="cotw-stats">
            <div class="cotw-stat"><b class="mono">${s.provisional?p(`${Math.round(s.rating-100)}\u2013${Math.round(s.rating+100)}`):s.rating.toFixed(1)}</b><span>${t("th.rating")}</span></div>
            <div class="cotw-stat"><b class="mono">${s.matches}</b><span>${t("pl.matches")}</span></div>
            <div class="cotw-stat"><b class="mono">${s.winPct.toFixed(1)}%</b><span>${t("th.winPct")}</span></div>
          </div>
          <div class="pcard-form">
            <span class="lbl" data-tip="${t("cards.form")}">${t("cards.form")}</span>
            <span class="pills">${_(s.name)}</span>
          </div>
          <a class="cotw-cta" href="#/player/${encodeURIComponent(s.name)}">${t("cards.openProfile")}</a>
        </div>
        <div class="cotw-card">${S(s,{hero:!0,cotw:!0})}</div>
      </div>
    </section>

    <section class="tier-strip anim" id="tier-strip" title="${t("cards.distTip")}">
      <div class="ts-label">${t("cards.dist")}</div>
      ${L.slice().reverse().map(i=>`
        <button class="tseg tier-${i}" data-tier="${i}" ${n[i]?"":"disabled"}>
          ${k(i)}<span class="tn">${w(i)}</span><b class="mono">${n[i]}</b>
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
          ${L.slice().reverse().map(i=>`<button class="chip tier-chip-btn tier-${i}" data-tier-filter="${i}">${w(i)}</button>`).join("")}
        </div>
        <span class="deck-count mono" id="deck-count">${tp("cards.count",e.length)}</span>
      </div>
      <div class="deck-grid" id="deck-grid"></div>
    </section>
  </div>`;let r=document.getElementById("deck-grid"),d=document.getElementById("deck-search"),f=document.getElementById("deck-count"),v="all",m="";function u(){let i=e.filter(l=>(v==="all"||g(l.rating)===v)&&(!m||l.name.toLowerCase().includes(m)));r.innerHTML=i.map(l=>S(l,{cotw:!1})).join("")||`<div class="empty" style="grid-column:1/-1;padding:30px;text-align:center;color:var(--dim)">${t("cards.deckEmpty")}</div>`,i.forEach(l=>{let $=r.querySelector(`.pcard-wrap[data-name="${CSS.escape(l.name)}"]`);$&&o.has(l.name)&&$.classList.add("tier-up")}),f.textContent=tp("cards.count",i.length),E(r),typeof observeReveals=="function"&&observeReveals()}u(),d.addEventListener("input",()=>{m=d.value.trim().toLowerCase(),u()}),a.querySelectorAll("[data-tier-filter]").forEach(i=>{i.addEventListener("click",()=>{v=i.dataset.tierFilter,a.querySelectorAll("[data-tier-filter]").forEach(l=>l.classList.toggle("on",l===i)),u()})}),a.querySelectorAll(".tseg[data-tier]").forEach(i=>{i.addEventListener("click",()=>{let l=a.querySelector(`[data-tier-filter="${i.dataset.tier}"]`);l&&l.click(),document.getElementById("deck-grid").scrollIntoView({behavior:"smooth",block:"start"})})}),E(a),typeof observeReveals=="function"&&observeReveals()}function X(a){let e=M(a);return e?`<div class="pv-card-slot tier-${g(e.rating)}">${S(e,{hero:!0})}</div>`:""}function Z(a){let e=M(a);if(!e)return"";let n=g(e.rating);return`<span class="tier-chip tier-${n}" title="${w(n)}" aria-label="${w(n)}">${k(n)}</span>`}document.addEventListener("click",a=>{let e=a.target.closest(".pc-share");if(e){a.stopPropagation(),Y(e.dataset.name,e.dataset.share,e);return}let n=a.target.closest(".pcard");n&&!a.target.closest("a[href]")&&n.classList.toggle("flipped")});document.addEventListener("keydown",a=>{if(a.key!=="Enter"&&a.key!==" ")return;let e=document.activeElement&&document.activeElement.classList&&document.activeElement.classList.contains("pcard")?document.activeElement:null;e&&(a.preventDefault(),e.classList.toggle("flipped"))});function tt(){if(window.__lbTipInit)return;window.__lbTipInit=!0;let a=document.createElement("div");a.className="lb-tip lb-tip-hide",a.innerHTML="<canvas></canvas><span></span>",document.body.appendChild(a);let e=a.querySelector("canvas"),n=a.querySelector("span"),s=1100,c=null,o=null,r=null,d=null,f=0,v=Promise.resolve(),m=u=>{let i=u.getBoundingClientRect();a.style.left=Math.min(window.innerWidth-170,i.left+60)+"px",a.style.top=Math.max(8,i.top-96)+"px"};document.addEventListener("mouseover",u=>{let i=u.target.closest&&u.target.closest(".lb-row");if(!(!i||!i.dataset.name)){if(clearTimeout(c),i===r){d&&(cancelAnimationFrame(f),f=requestAnimationFrame(()=>m(i)));return}r=i,d=null,clearTimeout(o),a.classList.add("lb-tip-hide"),o=setTimeout(()=>{if(o=null,r!==i)return;d=i.dataset.name;let l=x(d);n.textContent=d;let $=()=>{r===i&&(a.style.transition="none",m(i),a.offsetWidth,a.style.transition="",a.classList.remove("lb-tip-hide"))};l&&window.TankRender?(e.style.display="block",v=v.catch(()=>{}).then(()=>window.TankRender.render(e,l,"small")),v.then($,$)):(e.style.display="none",$())},s)}}),document.addEventListener("mouseout",u=>{u.target.closest&&u.target.closest(".lb-row")&&(clearTimeout(c),c=setTimeout(()=>{clearTimeout(o),o=null,r=null,a.classList.add("lb-tip-hide"),d=null},140))}),window.addEventListener("scroll",()=>{clearTimeout(o),o=null,r=null,a.classList.add("lb-tip-hide"),d=null},{passive:!0})}tt();function at(a){let e=document.getElementById("deck-grid");if(!e)return;let n=[...e.querySelectorAll(".pcard-wrap")],s=n.find(o=>o.dataset.name===a);if(!s){let o=String(a||"").toLowerCase();s=n.find(r=>(r.dataset.name||"").toLowerCase()===o)}if(!s)return;s.scrollIntoView({behavior:"smooth",block:"center"});let c=s.querySelector(".pcard");c&&c.classList.add("flipped")}window.renderCards=Q;window.cardsFocus=at;window.cardsHeroHTML=X;window.cardsRowChip=Z;window.cardsMountAll=E;window.cardsSharePNG=D;window.cardsTiers={TIER_KEYS:L,TIER_MIN:O,tierMin:N,tierOf:g,tierIdx:F,tierLabel:w,crestSVG:k};})();
