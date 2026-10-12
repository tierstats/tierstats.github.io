/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var T=["bronze","silver","gold","platinum","diamond","master","grandmaster"],F={bronze:-1/0,silver:1300,gold:1550,platinum:1700,diamond:1850,master:1950,grandmaster:2e3};function N(e){let a=window.LB_TIER_MIN||{};return a[e]!=null?Number(a[e]):F[e]}function w(e){let a="bronze";for(let s of T)e>=N(s)&&(a=s);return a}function B(e){return T.indexOf(e)}function g(e){return t("cards.tier."+e)}function k(){return window.lbCards||null}function P(){let e=k();return e&&e.topOf?e.topOf():((window.LB_DATA||{}).qualified||[]).map(a=>({...a}))}function I(e){let a=k();return a&&a.byName&&a.byName()[e]?a.byName()[e]:P().find(s=>s.name===e)||null}function x(e){let a=(window.LB_TANKS||{})[e],s=(window.LB_TANKS_SNAPSHOT||{})[e];return a?s?{...s,...a}:a:s||null}function _(e){let a=k();return a&&a.histOf?a.histOf(e):((window.LB_DATA||{}).histories||{})[e]||[]}function H(e){let a=k();return a&&a.fmtDate?a.fmtDate(e):String(e||"")}function q(e){let a=k();return a&&a.deltaTag?a.deltaTag(e):""}function $(e){let a=k();return a&&a.resLetter?a.resLetter(e):e}function K(e){return _(e).slice(0,5).reverse().map(s=>{let n=`${$(s.res)} \xB7 ${t("pl.vsOpp",{opp:String(s.opp||"")})} ${s.for_}-${s.against}`+(s.date?` \xB7 ${H(s.date)}`:"");return`<i class="${s.res.toLowerCase()}" data-tip="${p(n)}">${p($(s.res))}</i>`}).join("")}function J(e){let a=_(e),s=0,n=0,c="",i=0,r=a.slice().reverse();for(let l of r)l.res==="W"?(n+=1,n>s&&(s=n)):n=0;if(a.length){c=a[0].res,i=0;for(let l of a)if(l.res===c)i+=1;else break}return{best:s,curRes:c,curN:i}}var y=null;function Y(e,a){if(!y){let c=k();if(y=c&&c.ratingTimeline?c.ratingTimeline():null,!y){y={};let i=window.LB_DATA||{};for(let r of Object.keys(i.curRatings||{})){let l=Math.max(i.curRatings[r]||-1/0,(i.prevRatings||{})[r]||-1/0);y[r]={rating:l,date:""}}}}let s=y[e],n=a??-1/0;return s?s.rating>=n?s:{rating:n,date:""}:n>-1/0?{rating:n,date:""}:null}function p(e){return String(e).replace(/[&<>"]/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[a])}function z(e){let a=String(e).split(/[\s_\-.]+/).filter(Boolean);return((a[0]||"?")[0]+(a[1]?a[1][0]:(a[0]||"?")[1]||"")).toUpperCase()}function Q(e,a){return x(e)?`<canvas class="pcard-tank" data-tank-name="${p(e)}" data-tank-size="${a||"medium"}"></canvas>`:`<div class="pcard-mono" aria-hidden="true">${p(z(e))}</div>`}var X=0;function L(e){let a="pcg"+ ++X,s="M12 2.3l7.6 2.9v6.3c0 4.6-3 8.6-7.6 10.3C7.4 20.1 4.4 16.1 4.4 11.5V5.2z",n="M4.4 5.2L12 2.3l7.6 2.9v2.4c-2.6 1.7-5 2.3-7.6 2.3s-5-.6-7.6-2.3z",c="M4.4 13.6c2.7 1.8 5 2.4 7.6 2.4s4.9-.6 7.6-2.4v2c-2.7 1.9-5 2.5-7.6 2.5s-4.9-.6-7.6-2.5z",i=h=>`<path class="pc-glyph" d="${h}"/>`,r='<path class="pc-line" d="M8.8 10.8h6.4"/>',l='<path class="pc-line" d="M8.9 13.2L12 15.4l3.1-2.2"/>',v=i("M12 8.7l1.33 2.86 3.08.34-2.3 2.07.67 3.08L12 15.62l-2.78 1.43.67-3.08-2.3-2.07 3.08-.34z"),f=i("M12 8.8l2.4 1.9v2.8L12 15.6l-2.4-2.1v-2.8z"),o=i("M12 8.4l2.8 2.8-2.8 3.4-2.8-3.4z")+'<path class="pc-line" d="M9.6 11.2h4.8"/>',d=i("M7.6 15l-.85-4.7 2.65 2L12 8.1l2.6 4.2 2.65-2L16.4 15z"),m={bronze:"",silver:r+l,gold:v,platinum:f,diamond:o,master:d,grandmaster:'<path class="pc-line" d="M12 3.7v1.4M8.9 4.8l.75 1.1M15.1 4.8l-.75 1.1"/>'+d}[e]||"";return`<svg class="pc-crest" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="${a}" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="var(--tc1)"/><stop offset="1" stop-color="var(--tc2)"/></linearGradient></defs><path d="${s}" fill="url(#${a})" stroke="rgba(255,255,255,.32)" stroke-width=".9"/><path d="${n}" fill="rgba(255,255,255,.28)"/><path d="${c}" fill="rgba(0,0,0,.22)"/>${m}</svg>`}var Z='<svg class="pc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';function tt(e,a){let s=k(),n=Y(a,e.rating),c=J(a),i=x(a),r=i&&i.stats||null,l=i&&i.lastLogin?Number(i.lastLogin):0,v=l&&s&&s.lastSeenText?s.lastSeenText(l):"",f=l&&s&&s.lastSeenExact?s.lastSeenExact(l):"",o=r&&r.deaths?(r.kills/r.deaths).toFixed(2):r?String(r.kills):"\u2014",d=s&&s.altsOf?s.altsOf(a):[];return`
    <div class="pcard-stats">
      <div class="pc-row"><span>${t("pl.glicko")}</span><b class="mono">${e.glicko.toFixed(1)}</b></div>
      <div class="pc-row"><span>${t("th.rd")}</span><b class="mono">${e.rd.toFixed(1)}</b></div>
      <div class="pc-row"><span>${t("pl.matches")}</span><b class="mono">${e.matches}</b></div>
      <div class="pc-row"><span>${t("pl.opponents")}</span><b class="mono">${e.opponents}</b></div>
      <div class="pc-row"><span>${t("pl.avgOppRating")}</span><b class="mono">${e.avgOpp.toFixed(1)}</b></div>
      ${n?`<div class="pc-row"><span>${t("cards.peak")}</span><b class="mono">${n.rating.toFixed(1)}${n.date?`<small> ${t("cards.peakOn",{date:H(n.date)})}</small>`:""}</b></div>`:""}
      <div class="pc-row"><span>${t("cards.bestStreak")}</span><b class="mono">${c.best?`${c.best}${$("W")}`:"\u2014"}${c.curN>1?`<small> \xB7 ${t("cards.curStreak")} ${c.curRes==="W"?"W":c.curRes==="L"?"L":"D"}${c.curN}</small>`:""}</b></div>
      ${e.delta?`<div class="pc-row"><span>${t("cards.seasonDelta")}</span><b class="mono">${q(e)}</b></div>`:""}
    </div>
    ${r?`
    <div class="pcard-game">
      <div class="pc-game-title">${t("cards.gameStats")}</div>
      <div class="pc-game-grid">
        <div class="pc-gs"><span>${t("cards.kills")}</span><b class="mono" data-live-name="${p(a)}" data-live="kills">${r.kills}</b></div>
        <div class="pc-gs"><span>${t("cards.deaths")}</span><b class="mono" data-live-name="${p(a)}" data-live="deaths">${r.deaths}</b></div>
        <div class="pc-gs"><span>${t("cards.victories")}</span><b class="mono" data-live-name="${p(a)}" data-live="victories">${r.victories}</b></div>
        <div class="pc-gs"><span>${t("cards.xp")}</span><b class="mono" data-live-name="${p(a)}" data-live="xp">${r.xp}</b></div>
        <div class="pc-gs wide"><span>${t("cards.rank")}</span><b class="mono" data-live-name="${p(a)}" data-live="rank">${r.rank!=null?r.rank:"\u2014"}</b></div>
        <div class="pc-gs kd"><span>${t("cards.kd")}</span><b class="mono" data-live-name="${p(a)}" data-live="kd">${o}</b></div>
      </div>
      <div class="pc-game-foot">
        ${i&&i.created?`<span class="pc-since">${t("cards.since",{year:new Date((i.created||0)*1e3).getFullYear()})}</span>`:""}
      </div>
    </div>`:`<div class="pcard-game empty">${t("cards.noGame")}</div>`}
    ${d.length?`<div class="pc-alt"><span>${t("cards.alts")}:</span> ${d.map(p).join(", ")}</div>`:""}
    ${v?`<div class="pc-seen" title="${p(f)}">${t("cards.lastSeen")} <b>${p(v)}</b></div>`:""}
    <div class="pcard-actions">
      <button class="pc-share" data-share="copy" data-name="${p(a)}">${t("cards.shareCopy")}</button>
      <button class="pc-share" data-share="dl" data-name="${p(a)}">${t("cards.shareDl")}</button>
      <button class="pc-share pc-share-link" data-share="link" data-name="${p(a)}">${Z}<span>${t("cards.shareLink")}</span></button>
    </div>`}function D(e,a){a=a||{};let s=e.name,n=w(e.rating),c=e.inactive?`<span class="pc-retired">${t("cards.retired")}</span>`:"";return`
  <article class="pcard-wrap tier-${n}${a.hero?" card-hero":""}" data-name="${p(s)}">
    <div class="pcard" tabindex="0" role="button" aria-label="${p(s)} \u2014 ${g(n)} \u2014 ${t("cards.flipTip")}">
      <div class="pcard-face pcard-front">
        <div class="pcard-art">
          ${Q(s,a.size||"medium")}
          ${e.rank!=null?`<span class="pc-rank-pill">#${e.rank}</span>`:""}
          <span class="pc-tier-crest">${L(n)}</span>
          ${c}
        </div>
        <div class="pcard-body">
          <div class="pcard-name">${p(s)}</div>
          <div class="pcard-tierline">${L(n)}<span>${g(n)}</span></div>
          <div class="pcard-rating">
            <span class="lbl">${t("th.rating")}</span>
            <div class="big-row"><span class="big mono">${e.provisional?p(`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`):e.rating.toFixed(1)}</span>${q(e)}</div>
          </div>
          <div class="pcard-record">
            <span class="wc mono">${e.winPct.toFixed(1)}%</span>
            <span class="rec mono"><span class="w">${e.w}${$("W")}</span> <span class="l">${e.l}${$("L")}</span> <span class="d">${e.d}${$("D")}</span></span>
          </div>
          <div class="pcard-form">
            <span class="lbl" data-tip="${t("cards.form")}">${t("cards.form")}</span>
            <span class="pills">${K(s)}</span>
          </div>
        </div>
      </div>
      <div class="pcard-face pcard-back">
        <div class="pcard-back-scroll">
          <div class="pcard-back-head">
            <a class="pcard-name pc-open" href="#/player/${encodeURIComponent(s)}" title="${t("cards.openProfile")}">${p(s)}</a>
            <div class="pcard-tierline">${L(n)}<span>${g(n)}</span></div>
          </div>
          ${tt(e,s)}
        </div>
      </div>
    </div>
  </article>`}var E=null;function et(e){if(!("IntersectionObserver"in window))return;E&&(E.disconnect(),E=null);let a=[...(e||document).querySelectorAll(".pcard-wrap.tier-master, .pcard-wrap.tier-grandmaster")];a.length&&(E=new IntersectionObserver(s=>{s.forEach(n=>{n.target.classList.toggle("anim-off",!n.isIntersecting)})},{rootMargin:"240px"}),a.forEach(s=>E.observe(s)))}var R=new Set,b=new Map,W=e=>String(e||"").toLowerCase(),M=0;function G(e){(e||[...b.keys()]).forEach(a=>{let s=b.get(a);s&&(b.delete(a),s.forEach(n=>n()))}),!b.size&&M&&(clearTimeout(M),M=0)}window.lbTankFreshMark=e=>{let a=(e||[]).map(W);a.forEach(s=>R.add(s)),G(a)};function j(e,a){let s=W(e);if(R.has(s)){a();return}b.has(s)||b.set(s,new Set),b.get(s).add(a),M||(M=setTimeout(()=>G(null),1200)),typeof window.lbTankWant=="function"&&(window.lbTankWant(e),typeof window.lbLiveStatsTick=="function"&&window.lbLiveStatsTick())}function C(e){et(e);let a=[...(e||document).querySelectorAll("canvas[data-tank-name]")];if(!a.length)return;let s=n=>{if(n.dataset.mounted||n.dataset.parked)return;let c=n.dataset.tankName;n.dataset.parked="1",j(c,()=>{if(n.dataset.parked="",n.dataset.mounted||!n.isConnected)return;n.dataset.mounted="1";let i=x(c);i&&window.TankRender&&window.TankRender.render(n,i,n.dataset.tankSize||"medium")})};if("IntersectionObserver"in window){let n=new IntersectionObserver(c=>{let i=c.filter(l=>l.isIntersecting).map(l=>l.target),r=()=>{i.splice(0,3).forEach(l=>{s(l),n.unobserve(l)}),i.length&&requestAnimationFrame(r)};r()},{rootMargin:"240px"});a.forEach(c=>n.observe(c))}else a.forEach(s)}var A="tt1v1_cardtiers";function at(e){let a={};try{a=JSON.parse(localStorage.getItem(A)||"{}")||{}}catch{a={}}let s=new Set;e.forEach(n=>{let c=B(w(n.rating));a[n.name]!=null&&c>a[n.name]&&s.add(n.name),a[n.name]=c});try{localStorage.setItem(A,JSON.stringify(a))}catch{}return s}function V(e){let a=I(e);if(!a)return Promise.reject(new Error("no player"));let s=w(a.rating),n=800,c=1e3,i=document.createElement("canvas");i.width=n,i.height=c;let r=i.getContext("2d"),l=r.createLinearGradient(0,0,0,c);l.addColorStop(0,"#10151d"),l.addColorStop(1,"#0b0e14"),r.fillStyle=l,r.fillRect(0,0,n,c);let v=document.querySelector(`.pcard-wrap.tier-${s}`),f=v?getComputedStyle(v):null,o=f&&f.getPropertyValue("--tc1").trim()||"#8a6a3f",d=f&&f.getPropertyValue("--tc2").trim()||"#5c4526",u=f&&f.getPropertyValue("--tfg").trim()||"#f2d9ae";r.strokeStyle=o,r.lineWidth=14,r.strokeRect(22,22,n-44,c-44),r.globalAlpha=.16,r.fillStyle=d,r.fillRect(22,22,n-44,300),r.globalAlpha=1;let m=x(e),h=document.createElement("canvas");return(m&&window.TankRender?window.TankRender.render(h,m,"large"):Promise.resolve()).then(()=>{if(m&&window.TankRender){let U=660*(h.height/h.width||.6);r.drawImage(h,(n-660)/2,110,660,U)}else r.fillStyle=d,r.font="900 150px Archivo, sans-serif",r.textAlign="center",r.fillText(z(e),n/2,300);return r.textAlign="center",r.fillStyle="#eef2f8",r.font="900 64px Archivo, sans-serif",r.fillText(e,n/2,560),r.fillStyle=u,r.font="700 30px Inter, sans-serif",r.fillText(g(s).toUpperCase()+(a.rank!=null?"  \xB7  #"+a.rank:""),n/2,610),r.fillStyle="#eef2f8",r.font='800 110px "JetBrains Mono", monospace',r.fillText(a.rating.toFixed(1),n/2,740),r.fillStyle="#98a4b8",r.font="600 30px Inter, sans-serif",r.fillText(`${a.winPct.toFixed(1)}%  \xB7  ${a.w}${$("W")}\u2013${a.l}${$("L")}\u2013${a.d}${$("D")}`,n/2,795),r.fillStyle="#5d6a80",r.font="500 22px Inter, sans-serif",r.fillText("tierstats.github.io \u2014 1v1 Leaderboard",n/2,935),i})}function st(e,a){let s=location.origin+location.pathname+"#/player/"+encodeURIComponent(e),n=()=>S(a,t("cards.linkCopied"));navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(s).then(n,()=>S(a,s)):S(a,s)}function nt(e,a,s){if(a==="link"){st(e,s);return}V(e).then(n=>{a==="copy"&&navigator.clipboard&&window.ClipboardItem?n.toBlob(c=>{navigator.clipboard.write([new ClipboardItem({"image/png":c})]).then(()=>S(s,t("cards.copied"))).catch(()=>O(n,e,s))}):O(n,e,s)}).catch(()=>S(s,t("cards.shareFail")))}function O(e,a,s){let n=document.createElement("a");n.download=`1v1-card-${a}.png`,n.href=e.toDataURL("image/png"),n.click(),S(s,t("cards.copied"))}function S(e,a){if(!e)return;let s=e.innerHTML;e.textContent=a,e.classList.add("ok"),setTimeout(()=>{e.innerHTML=s,e.classList.remove("ok")},1600)}function rt(){let e=document.getElementById("page-cards");if(!e)return;let a=P().slice().sort((o,d)=>(o.rank!=null?o.rank:9999)-(d.rank!=null?d.rank:9999)||o.name.localeCompare(d.name));if(!a.length){e.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("cards.deckEmpty")}</div></div></div>`;return}let s={};T.forEach(o=>{s[o]=0}),a.forEach(o=>{s[w(o.rating)]+=1});let n=at(a);e.innerHTML=`
  <div class="wrap">
    <section class="hero anim" style="padding-top:10px">
      <div class="kicker" data-i18n="cards.kicker">${t("cards.kicker")}</div>
      <h1 style="font-size:clamp(36px,5vw,58px)" data-i18n-html="cards.h1">${t("cards.h1")}</h1>
      <p class="sub" data-i18n="cards.sub">${t("cards.sub")}</p>
    </section>

    <section class="tier-strip anim" id="tier-strip" title="${t("cards.distTip")}">
      <div class="ts-label">${t("cards.dist")}</div>
      ${T.slice().reverse().map(o=>`
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
          ${T.slice().reverse().map(o=>`<button class="chip tier-chip-btn tier-${o}" data-tier-filter="${o}">${g(o)}</button>`).join("")}
        </div>
        <span class="deck-count mono" id="deck-count">${tp("cards.count",a.length)}</span>
      </div>
      <div class="deck-grid" id="deck-grid"></div>
    </section>
  </div>`;let c=document.getElementById("deck-grid"),i=document.getElementById("deck-search"),r=document.getElementById("deck-count"),l="all",v="";function f(){let o=a.filter(d=>(l==="all"||w(d.rating)===l)&&(!v||d.name.toLowerCase().includes(v)));c.innerHTML=o.map(d=>D(d)).join("")||`<div class="empty" style="grid-column:1/-1;padding:30px;text-align:center;color:var(--dim)">${t("cards.deckEmpty")}</div>`,o.forEach(d=>{let u=c.querySelector(`.pcard-wrap[data-name="${CSS.escape(d.name)}"]`);u&&n.has(d.name)&&u.classList.add("tier-up")}),r.textContent=tp("cards.count",o.length),C(c),typeof observeReveals=="function"&&observeReveals()}f(),i.addEventListener("input",()=>{v=i.value.trim().toLowerCase(),f()}),e.querySelectorAll("[data-tier-filter]").forEach(o=>{o.addEventListener("click",()=>{l=o.dataset.tierFilter,e.querySelectorAll("[data-tier-filter]").forEach(d=>d.classList.toggle("on",d===o)),f()})}),e.querySelectorAll(".tseg[data-tier]").forEach(o=>{o.addEventListener("click",()=>{let d=e.querySelector(`[data-tier-filter="${o.dataset.tier}"]`);d&&d.click(),document.getElementById("deck-grid").scrollIntoView({behavior:"smooth",block:"start"})})}),C(e),typeof observeReveals=="function"&&observeReveals()}function it(e){let a=I(e);return a?`<div class="pv-card-slot tier-${w(a.rating)}">${D(a,{hero:!0})}</div>`:""}function ct(e){let a=I(e);if(!a)return"";let s=w(a.rating);return`<span class="tier-chip tier-${s}" title="${g(s)}" aria-label="${g(s)}">${L(s)}</span>`}document.addEventListener("click",e=>{let a=e.target.closest(".pc-share");if(a){e.stopPropagation(),nt(a.dataset.name,a.dataset.share,a);return}let s=e.target.closest(".pcard");s&&!e.target.closest("a[href]")&&s.classList.toggle("flipped")});document.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;let a=document.activeElement&&document.activeElement.classList&&document.activeElement.classList.contains("pcard")?document.activeElement:null;a&&(e.preventDefault(),a.classList.toggle("flipped"))});function ot(){if(window.__lbTipInit)return;window.__lbTipInit=!0;let e=document.createElement("div");e.className="lb-tip lb-tip-hide",e.innerHTML="<canvas></canvas><span></span>",document.body.appendChild(e);let a=e.querySelector("canvas"),s=e.querySelector("span"),n=1100,c=null,i=null,r=null,l=null,v=0,f=Promise.resolve(),o=d=>{let u=d.getBoundingClientRect();e.style.left=Math.min(window.innerWidth-170,u.left+60)+"px",e.style.top=Math.max(8,u.top-96)+"px"};document.addEventListener("mouseover",d=>{let u=d.target.closest&&d.target.closest(".lb-row");if(!(!u||!u.dataset.name)){if(clearTimeout(c),u===r){l&&(cancelAnimationFrame(v),v=requestAnimationFrame(()=>o(u)));return}r=u,l=null,clearTimeout(i),e.classList.add("lb-tip-hide"),i=setTimeout(()=>{if(i=null,r!==u)return;l=u.dataset.name,s.textContent=l;let m=()=>{r===u&&(e.style.transition="none",o(u),e.offsetWidth,e.style.transition="",e.classList.remove("lb-tip-hide"))};j(l,()=>{if(r!==u)return;let h=x(l);h&&window.TankRender?(a.style.display="block",f=f.catch(()=>{}).then(()=>window.TankRender.render(a,h,"small")),f.then(m,m)):(a.style.display="none",m())})},n)}}),document.addEventListener("mouseout",d=>{d.target.closest&&d.target.closest(".lb-row")&&(clearTimeout(c),c=setTimeout(()=>{clearTimeout(i),i=null,r=null,e.classList.add("lb-tip-hide"),l=null},140))}),window.addEventListener("scroll",()=>{clearTimeout(i),i=null,r=null,e.classList.add("lb-tip-hide"),l=null},{passive:!0})}ot();function lt(e){let a=document.getElementById("deck-grid");if(!a)return;let s=[...a.querySelectorAll(".pcard-wrap")],n=s.find(i=>i.dataset.name===e);if(!n){let i=String(e||"").toLowerCase();n=s.find(r=>(r.dataset.name||"").toLowerCase()===i)}if(!n)return;n.scrollIntoView({behavior:"smooth",block:"center"});let c=n.querySelector(".pcard");c&&c.classList.add("flipped")}window.renderCards=rt;window.cardsFocus=lt;window.cardsHeroHTML=it;window.lbTankFor=x;window.lbTankFresh=R;window.cardsRowChip=ct;window.cardsMountAll=C;window.cardsSharePNG=V;window.cardsTiers={TIER_KEYS:T,TIER_MIN:F,tierMin:N,tierOf:w,tierIdx:B,tierLabel:g,crestSVG:L};})();
