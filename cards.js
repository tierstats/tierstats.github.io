/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{(()=>{var D=["bronze","silver","gold","platinum","diamond","master","grandmaster"],$t={bronze:-1/0,silver:1300,gold:1550,platinum:1700,diamond:1850,master:1950,grandmaster:2e3};function V(e){let a=window.LB_TIER_MIN||{};return a[e]!=null?Number(a[e]):$t[e]}function q(e){let a="bronze";for(let s of D)e>=V(s)&&(a=s);return a}function et(e){return D.indexOf(e)}function A(e){return t("cards.tier."+e)}function F(){return window.lbCards||null}function U(){let e=F();return e&&e.topOf?e.topOf():((window.LB_DATA||{}).qualified||[]).map(a=>({...a}))}function Y(e){let a=F();return a&&a.byName&&a.byName()[e]?a.byName()[e]:U().find(s=>s.name===e)||null}function O(e){let a=(window.LB_TANKS||{})[e],s=(window.LB_TANKS_SNAPSHOT||{})[e];return a?s?{...s,...a}:a:s||null}function nt(e){let a=F();return a&&a.histOf?a.histOf(e):((window.LB_DATA||{}).histories||{})[e]||[]}function gt(e){let a=F();return a&&a.fmtDate?a.fmtDate(e):String(e||"")}function kt(e){let a=F();return a&&a.deltaTag?a.deltaTag(e):""}function B(e){let a=F();return a&&a.resLetter?a.resLetter(e):e}function zt(e){return nt(e).slice(0,5).reverse().map(a=>{let s=`${B(a.res)} \xB7 ${t("pl.vsOpp",{opp:String(a.opp||"")})} ${a.for_}-${a.against}`+(a.date?` \xB7 ${gt(a.date)}`:"");return`<i class="${a.res.toLowerCase()}" data-tip="${m(s)}">${m(B(a.res))}</i>`}).join("")}function Wt(e){let a=nt(e),s=0,r=0,c="",l=0,n=a.slice().reverse();for(let f of n)f.res==="W"?(r+=1,r>s&&(s=r)):r=0;if(a.length){c=a[0].res,l=0;for(let f of a)if(f.res===c)l+=1;else break}return{best:s,curRes:c,curN:l}}var W=null,bt=-1,wt=!1;function Gt(e,a){let s=F(),r=window.lbDataRev!=null?window.lbDataRev:0;if(!W||bt!==r||wt&&s&&s.ratingTimeline){if(W=s&&s.ratingTimeline?s.ratingTimeline():null,wt=!W,!W){W={};let n=window.LB_DATA||{};for(let f of Object.keys(n.curRatings||{})){let S=Math.max(n.curRatings[f]||-1/0,(n.prevRatings||{})[f]||-1/0);W[f]={rating:S,date:""}}}bt=r}let c=W[e],l=a??-1/0;return c?c.rating>=l?c:{rating:l,date:""}:l>-1/0?{rating:l,date:""}:null}function m(e){return String(e).replace(/[&<>"]/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[a])}function yt(e){let a=String(e).split(/[\s_\-.]+/).filter(Boolean);return((a[0]||"?")[0]+(a[1]?a[1][0]:(a[0]||"?")[1]||"")).toUpperCase()}var Ut='<svg class="pcard-sil" viewBox="0 0 120 72" aria-hidden="true"><g fill="currentColor"><rect x="18" y="40" width="84" height="15" rx="7.5"/><rect x="30" y="28" width="40" height="14" rx="6"/><rect x="63" y="32" width="45" height="5" rx="2.5"/><circle cx="33" cy="56" r="8"/><circle cx="53" cy="56" r="8"/><circle cx="73" cy="56" r="8"/><circle cx="93" cy="56" r="8"/></g></svg>';function Zt(e,a){return O(e)?`<div class="pcard-art-stage">${Ut}<canvas class="pcard-tank" data-tank-name="${m(e)}" data-tank-size="${a||"medium"}" aria-hidden="true"></canvas></div>`:`<div class="pcard-art-stage empty" title="${m(t("cards.noGame"))}"><div class="pcard-mono" aria-hidden="true">${m(yt(e))}</div></div>`}function Kt(e){let a="tt1v1_guide_"+e+"_v1";try{if(localStorage.getItem(a))return""}catch{}return`<aside class="page-guide" data-guide="${e}"><span class="pg-ico" aria-hidden="true">?</span><div class="pg-body"><b>${t("guide.title")}</b> ${t("guide."+e)}</div><button class="pg-x" data-guide-close="${e}" aria-label="${t("guide.dismiss")}">${t("guide.dismiss")}</button></aside>`}var Vt=0;function N(e){let a="pcl"+ ++Vt,s="#0a0f16",r=h=>Math.round(h*100)/100,c=(h,i,d,k)=>[r(h+Math.cos(d)*k),r(i+Math.sin(d)*k)],l=`url(#m${a})`,n=`url(#r${a})`,f=`url(#b${a})`;function S(h,i,d,k,T){let o=Math.cos(d),p=Math.sin(d),u=-p,v=o,b=h+o*k,C=i+p*k,P=h+o*k*.48+u*T,x=i+p*k*.48+v*T,I=h+o*k*.48-u*T,K=i+p*k*.48-v*T;return`M${r(h)} ${r(i)} Q${r(P)} ${r(x)} ${r(b)} ${r(C)} Q${r(I)} ${r(K)} ${r(h)} ${r(i)}Z`}function E(h,i,d){let k=Math.PI*2/8,T=Math.PI/8,o=d*.47,p=d*.97,u=x=>{let I=Math.cos(x-Math.PI*.75);return I>.55?{f:"#fff",o:.5}:I>.1?{f:"var(--tfg)",o:.88}:I>-.55?{f:"var(--tc1)",o:.95}:I>-.9?{f:"var(--tc2)",o:1}:{f:s,o:.8}},v=[];for(let x=0;x<16;x++)v.push(c(h,i,-Math.PI/2+x*Math.PI/8,p));let b="";for(let x=0;x<8;x++){let I=-Math.PI/2+x*k,K=c(h,i,I,o),st=c(h,i,I+k,o),z=c(h,i,I+T,p),Dt=u(I+T);b+=`<path d="M${K[0]} ${K[1]} L${st[0]} ${st[1]} L${z[0]} ${z[1]}Z" fill="${Dt.f}" fill-opacity="${Dt.o}" stroke="${s}" stroke-opacity=".55" stroke-width=".55"/>`;let rt=v[(x*2+1)%16],Ot=v[(x*2+2)%16],Nt=u(I+k);b+=`<path d="M${st[0]} ${st[1]} L${z[0]} ${z[1]} L${rt[0]} ${rt[1]}Z" fill="${Nt.f}" fill-opacity="${Nt.o}" stroke="${s}" stroke-opacity=".45" stroke-width=".5"/>`;let jt=u(I+k+T);b+=`<path d="M${z[0]} ${z[1]} L${rt[0]} ${rt[1]} L${Ot[0]} ${Ot[1]}Z" fill="${jt.f}" fill-opacity="${jt.o}" stroke="${s}" stroke-opacity=".45" stroke-width=".5"/>`,b+=`<path d="M${K[0]} ${K[1]} L${z[0]} ${z[1]}" stroke="#fff" stroke-opacity=".3" stroke-width=".6"/>`}let C="";for(let x=0;x<8;x++){let I=c(h,i,-Math.PI/2+x*k,o);C+=(x?"L":"M")+I[0]+" "+I[1]}C+="Z";let P=v.map((x,I)=>(I?"L":"M")+x[0]+" "+x[1]).join("")+"Z";return`<path d="${P}" fill="var(--tc2)" stroke="${s}" stroke-width="1.1"/>
      ${b}
      <path d="${C}" fill="var(--tfg)" fill-opacity=".92" stroke="${s}" stroke-opacity=".6" stroke-width=".6"/>
      <path d="M${r(h-d*.32)} ${r(i-d*.3)} ${r(h-d*.02)} ${r(i-d*.38)} ${r(h+d*.1)} ${r(i-d*.08)} ${r(h-d*.2)} ${r(i+d*.02)}Z" fill="#fff" opacity=".5"/>
      <path d="${P}" fill="none" stroke="${s}" stroke-opacity=".7" stroke-width="1"/>
      <path d="M${r(h-d*.82)} ${r(i-d*.34)} ${r(h-d*.42)} ${r(i-d*.82)}" stroke="#fff" stroke-opacity=".5" stroke-width=".9" stroke-linecap="round"/>`}function _(h,i,d){let k=d*1.33,T=[0,1,2,3].map(o=>{let p=Math.PI/4+o*Math.PI/2,u=c(h,i,p,k*.92),v=c(h,i,p,k*1.16);return`<path d="M${u[0]} ${u[1]} L${v[0]} ${v[1]}" stroke="var(--tfg)" stroke-width="2.4" stroke-linecap="round" opacity=".82"/>
        <path d="M${u[0]} ${u[1]} L${v[0]} ${v[1]}" stroke="${s}" stroke-width=".7" stroke-linecap="round" opacity=".45" transform="translate(.7 .8)"/>`}).join("");return`<circle cx="${h}" cy="${i}" r="${k}" fill="${n}" stroke="${s}" stroke-width="1.5"/>
      <circle cx="${h}" cy="${i}" r="${r(k*1.02)}" fill="none" stroke="var(--tfg)" stroke-opacity=".38" stroke-width=".75"/>
      <circle cx="${h}" cy="${i}" r="${r(d*1.08)}" fill="${s}" opacity=".9"/>
      ${E(h,i,d)}
      ${T}`}let $=50,L=52,g=28,w=[105,126,147,168,189,210,231],M="";w.forEach((h,i)=>{let d=h*Math.PI/180,k=c($,L,d,g),T=d+Math.PI/2-.2,o=12-(i===6?1.6:0);if(M+=`<path d="${S(k[0],k[1],T,o,4.1)}" fill="${l}" stroke="${s}" stroke-width="1.05"/>
      <path d="${S(k[0],k[1],T,o*.86,2.5)}" fill="var(--tfg)" opacity=".22"/>
      <path d="${S(k[0],k[1],T,o*.95,1.3)}" fill="none" stroke="#fff" stroke-opacity=".14" stroke-width=".5"/>
      <path d="M${k[0]} ${k[1]} L${r(k[0]+Math.cos(T)*o*.86)} ${r(k[1]+Math.sin(T)*o*.86)}" stroke="${s}" stroke-opacity=".42" stroke-width=".65"/>`,i<6){let p=c($,L,d+10.5*Math.PI/180,g+.4);M+=`<circle cx="${p[0]}" cy="${p[1]}" r="1.55" fill="${n}" stroke="${s}" stroke-width=".45"/>`}});let y=c($,L,103*Math.PI/180,g),R=c($,L,245*Math.PI/180,g);return`<svg class="pc-crest" viewBox="13 17 74 80" aria-hidden="true"><defs>
    <linearGradient id="m${a}" x1=".08" y1="0" x2=".9" y2="1">
      <stop offset="0" stop-color="var(--tfg)"/><stop offset=".16" stop-color="var(--tc1)"/>
      <stop offset=".42" stop-color="var(--tc2)"/><stop offset=".62" stop-color="var(--tc1)"/>
      <stop offset=".84" stop-color="var(--tc2)"/><stop offset="1" stop-color="var(--tc1)"/>
    </linearGradient>
    <linearGradient id="r${a}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="var(--tfg)"/><stop offset=".24" stop-color="var(--tc1)"/>
      <stop offset=".5" stop-color="var(--tc2)"/><stop offset=".74" stop-color="var(--tc1)"/>
      <stop offset="1" stop-color="var(--tc2)"/>
    </linearGradient>
    <linearGradient id="b${a}" x1=".1" y1="0" x2=".9" y2="1">
      <stop offset="0" stop-color="var(--tfg)"/><stop offset=".3" stop-color="var(--tc1)"/>
      <stop offset=".72" stop-color="var(--tc1)"/><stop offset="1" stop-color="var(--tc2)"/>
    </linearGradient>
  </defs>
    <g transform="translate(1.5 2)" opacity=".45">
      <circle cx="${$}" cy="${L}" r="20" fill="${s}"/>
      <path d="M38 80 50 84 62 80 58 96 50 91 42 96Z" fill="${s}"/>
    </g>
    <path d="M44 80 50 83 56 80 59 92 53 89 50 95 47 89 41 92Z" fill="${f}" stroke="${s}" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M47 84 50 86 53 84 51 91 50 89 49 91Z" fill="${s}" opacity=".35"/>
    <path d="M44.6 80.8 47.6 90M55.4 80.8 52.4 90" stroke="var(--tfg)" stroke-opacity=".28" stroke-width=".55"/>
    <path d="M${y[0]} ${y[1]} A${g} ${g} 0 0 1 ${R[0]} ${R[1]}" fill="none" stroke="${s}" stroke-width="2.8"/>
    <path d="M${y[0]} ${y[1]} A${g} ${g} 0 0 1 ${R[0]} ${R[1]}" fill="none" stroke="var(--tc2)" stroke-width="1.15"/>
    <g transform="translate(100 0) scale(-1 1)">
      <path d="M${y[0]} ${y[1]} A${g} ${g} 0 0 1 ${R[0]} ${R[1]}" fill="none" stroke="${s}" stroke-width="2.8"/>
      <path d="M${y[0]} ${y[1]} A${g} ${g} 0 0 1 ${R[0]} ${R[1]}" fill="none" stroke="var(--tc2)" stroke-width="1.15"/>
    </g>
    <g>${M}</g>
    <g transform="translate(100 0) scale(-1 1)">${M}</g>
    <circle cx="${$}" cy="51" r="20.6" fill="${s}" opacity=".45"/>
    ${_($,51,15.2)}
    <circle cx="${$}" cy="51" r="20.9" fill="none" stroke="var(--tc1)" stroke-opacity=".35" stroke-width=".7"/>
    <path d="M43.5 80.2 50 83.2 56.5 80.2 58.4 86.6 50 90.6 41.6 86.6Z" fill="${n}" stroke="${s}" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M45 81.2 50 83.4 55 81.2 56.2 85.2 50 88.3 43.8 85.2Z" fill="${s}" opacity=".72"/>
    <circle cx="50" cy="84.6" r="1.5" fill="var(--tc1)" stroke="${s}" stroke-width=".4"/>
  </svg>`}var xt='<svg class="pc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',Yt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',Lt='<svg class="pc-crown" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.7 8.1 8.5 11l3.5-5.2L15.5 11l4.8-2.9-1.7 9.3H5.4L3.7 8.1Z"/><rect x="5.1" y="18.4" width="13.8" height="2.2" rx="1.1" fill="currentColor"/></svg>',Jt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.8"/></svg>',it='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11a8 8 0 1 1 2.2 6.5M4 5v6h6"/></svg>',Xt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg>',St='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',Qt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',te='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"/></svg>';function ee(e,a){let s=q(e.rating),r=e.rank!=null?String(e.rank).padStart(2,"0"):"\u2014",c=F(),l=O(a),n=l&&l.lastLogin?Number(l.lastLogin):0,f=n&&c&&c.lastSeenText?c.lastSeenText(n):"",S=n&&c&&c.lastSeenExact?c.lastSeenExact(n):"";return`<div class="pcb-head">
    <div class="pcb-head-txt">
      <span class="pcb-kicker">${t("cards.statSheet")}</span>
      <span class="pcard-name-row"><a class="pcard-name pc-open" href="#/player/${encodeURIComponent(a)}" title="${t("cards.openProfile")}">${m(a)}</a><span class="vslot" data-vname="${m(a)}"></span></span>
      <span class="pcb-meta"><span>${A(s)}</span><b class="mono">#${r}</b></span>
      ${f?`<span class="pcb-head-seen" title="${m(t("cards.lastSeen"))} \xB7 ${m(S)}">${Jt}${m(f)}</span>`:""}
    </div>
    <span class="pcb-head-side">
      <button type="button" class="pcb-flip" title="${m(t("cards.flipBack"))}" aria-label="${m(t("cards.flipBack"))}">${it}</button>
      <span class="pcb-crest">${N(s)}</span>
    </span>
  </div>`}var ae='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',Mt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5M5 20.5h14"/></svg>';function se(e,a){let s=r=>m(t(r));return`<div class="pcard-actions pcb-foot">
    ${a?`<a class="pc-showcase" href="#/card/${encodeURIComponent(e)}" title="${s("cards.showcase")}" aria-label="${s("cards.showcase")}">
      ${te}<span>${s("cards.showcase")}</span>${St}
    </a>`:""}
    <div class="pcb-actions">
      <button class="pc-share pcb-icon-btn" data-share="copy" data-name="${m(e)}" title="${s("cards.shareCopy")}" aria-label="${s("cards.shareCopy")}">${ae}</button>
      <button class="pc-share pcb-icon-btn" data-share="dl" data-name="${m(e)}" title="${s("cards.shareDl")}" aria-label="${s("cards.shareDl")}">${Mt}</button>
      <button class="pc-share pcb-icon-btn" data-share="link" data-name="${m(e)}" title="${s("cards.shareLink")}" aria-label="${s("cards.shareLink")}">${xt}</button>
    </div>
  </div>`}function re(e,a){let s=F(),r=Gt(a,e.rating),c=Wt(a),l=O(a),n=l&&l.stats||null,f=e.provisional?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:e.rating.toFixed(1),S=n&&n.deaths?(n.kills/n.deaths).toFixed(2):n?String(n.kills):"\u2014",E=s&&s.altsOf?s.altsOf(a):[],_=l&&l.created?new Date((l.created||0)*1e3).getFullYear():"",$=(L,g,w)=>`<div class="pcb-cell"><span>${L}</span><b class="mono"${w?` data-live-name="${m(a)}" data-live="${w}"`:""}>${g}</b></div>`;return`
    <div class="pcb-hero">
      <div class="pcb-hero-cell">
        <span class="pc-k">${t("th.rating")}</span>
        <b class="mono${e.provisional?" prov":""}">${f}</b>
        ${kt(e)}
      </div>
      ${r?`<div class="pcb-hero-cell">
        <span class="pc-k">${t("cards.peak")}</span>
        <b class="mono">${r.rating.toFixed(1)}</b>
        <small>${r.date?gt(r.date):""}</small>
      </div>`:""}
    </div>
    <div class="pcb-grid">
      ${$(t("pl.glicko"),e.glicko.toFixed(1))}
      ${$(t("th.rd"),e.rd.toFixed(1))}
      ${$(t("pl.matches"),e.matches)}
      ${$(t("pl.opponents"),e.opponents)}
      ${$(t("th.avgOpp"),e.avgOpp.toFixed(1))}
      ${$(t("cards.bestStreak"),c.best?`${c.best}${B("W")}`:"\u2014")}
    </div>
    ${n?`
    <div class="pcb-game">
      <div class="pcb-game-head"><span class="pcb-kicker">${t("cards.gameStats")}</span>${_?`<span class="pcb-since">${t("cards.since",{year:_})}</span>`:""}</div>
      <div class="pcb-game-grid">
        ${$(t("cards.kills"),n.kills,"kills")}
        ${$(t("cards.deaths"),n.deaths,"deaths")}
        ${$(t("cards.victories"),n.victories,"victories")}
        ${$(t("cards.xp"),n.xp,"xp")}
        ${$(t("cards.rank"),n.rank!=null?n.rank:"\u2014","rank")}
        ${$(t("cards.kd"),S,"kd")}
      </div>
    </div>`:`<div class="pcb-game empty">${t("cards.noGame")}</div>`}
    ${E.length?`<div class="pcb-note"><span>${t("cards.alts")}</span><b>${E.map(m).join(", ")}</b></div>`:""}
    ${(()=>{let L=D[et(q(e.rating))+1]||null,g=Number.isFinite(V(q(e.rating)))?V(q(e.rating)):1100,w=L?V(L):null,M=w?Math.max(0,w-e.rating):0,y=w?Math.max(2,Math.min(100,(e.rating-g)/Math.max(1,w-g)*100)):100;return`<div class="pcb-next"><div class="pcb-next-head"><span>${L?t("cards.nextTier")+" \u2014 "+A(L).toUpperCase():t("cards.topTier")}</span><b class="mono">${L?t("cards.toGo",{n:Math.ceil(M)}):"MAX"}</b></div><span class="pcb-next-track" aria-hidden="true"><i style="width:${y}%"></i></span></div>`})()}
`}function J(e,a){if(!e)return;let s=e.querySelector(".pcard-front"),r=e.querySelector(".pcard-back");s&&(s.inert=!!a,s.setAttribute("aria-hidden",a?"true":"false")),r&&(r.inert=!a,r.setAttribute("aria-hidden",a?"false":"true"))}function ct(e,a){a=a||{};let s=e.name,r=q(e.rating),c=e.rank!=null?String(e.rank).padStart(2,"0"):"\u2014",l=e.provisional?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:e.rating.toFixed(1),n=e.inactive?`<span class="pc-retired">${t("cards.retired")}</span>`:"",f=e.winPct>=65?"hi":e.winPct>=50?"mid":"low";return`
  <article class="pcard-wrap pcard-v2 tier-${r}${e.rank===1?" is-champion":""}${a.hero?" card-hero":""}" data-name="${m(s)}">
    <div class="pcard">
      <div class="pcard-face pcard-front">
        <div class="pc-hero">
          <div class="pcard-art">
            ${Zt(s,a.size||"medium")}
            ${n}
          </div>
          <span class="pc-watermark mono${e.rank===1?" champ":""}" aria-hidden="true">${c}</span>
          <div class="pc-hero-top">
            <span class="pc-rank-tab">
              <span class="pc-rank-k">${e.rank===1?Lt:""}${t(e.rank===1?"cards.champion":"cards.rankLabel")}</span>
              <b class="pc-rank-n mono">${c}</b>
            </span>
            <span class="pc-tier-mark">
              <span class="pc-head-crest">${N(r)}</span>
              <span class="pc-tier-name">${A(r)}</span>
            </span>
          </div>
        </div>
        <div class="pcard-body">
          <div class="pcard-name-row"><div class="pcard-name">${m(s)}</div><span class="vslot" data-vname="${m(s)}"></span></div>
          <div class="pc-metrics">
            <div class="pc-metric pc-metric-rating">
              <span class="pc-k">${t("th.rating")}</span>
              <div class="pc-big-row"><b class="pc-big mono${e.provisional?" prov":""}">${l}</b></div>
            </div>
            <div class="pc-metric pc-metric-win">
              <span class="pc-k">${t("th.winPct")}</span>
              <b class="pc-winrate mono">${e.winPct.toFixed(1)}%</b>
              <span class="pc-winbar ${f}" aria-hidden="true"><i style="width:${e.winPct}%"></i></span>
            </div>
          </div>
          <div class="pc-bottom">
            <span class="pc-rec mono"><span class="w">${e.w}${B("W")}</span> <span class="l">${e.l}${B("L")}</span> <span class="d">${e.d}${B("D")}</span></span>
            <span class="pc-form"><span class="pc-k">${t("cards.form")}</span><span class="pills">${zt(s)}</span></span>
          </div>
        </div>
        <button class="pc-flip-cue" type="button">
          <span class="fc-label">${t("cards.statSheet")}</span>
          <span class="fc-rule" aria-hidden="true"></span>
          <span class="fc-flip">${it}</span>
        </button>
      </div>
      <div class="pcard-face pcard-back">
        ${ee(e,s)}
        <div class="pcard-back-scroll" tabindex="0" role="group" aria-label="${m(t("cards.statSheet"))}">
          ${re(e,s)}
        </div>
        ${se(s,!(a.showcase||a.hero))}
      </div>
    </div>
  </article>`}var X=null;function ne(e){if(!("IntersectionObserver"in window))return;X&&(X.disconnect(),X=null);let a=[...(e||document).querySelectorAll(".pcard-wrap.tier-diamond, .pcard-wrap.tier-master, .pcard-wrap.tier-grandmaster")];a.length&&(X=new IntersectionObserver(s=>{s.forEach(r=>{r.target.classList.toggle("anim-off",!r.isIntersecting)})},{rootMargin:"240px"}),a.forEach(s=>X.observe(s)))}var lt=new Set,G=new Map,Tt=e=>String(e||"").toLowerCase(),Q=0;function Ct(e){(e||[...G.keys()]).forEach(a=>{let s=G.get(a);s&&(G.delete(a),s.forEach(r=>r()))}),!G.size&&Q&&(clearTimeout(Q),Q=0)}window.lbTankFreshMark=e=>{let a=(e||[]).map(Tt);a.forEach(s=>lt.add(s)),Ct(a)};function Et(e,a){let s=Tt(e);if(lt.has(s)){a();return}G.has(s)||G.set(s,new Set),G.get(s).add(a),Q||(Q=setTimeout(()=>Ct(null),1200)),typeof window.lbTankWant=="function"&&(window.lbTankWant(e),typeof window.lbLiveStatsTick=="function"&&window.lbLiveStatsTick())}function H(e){let a=0;(e||document).querySelectorAll(".pcard-name").forEach(s=>{if(!s.offsetWidth){a++;return}s.style.fontSize="";let r=parseFloat(getComputedStyle(s).fontSize)||21,c=14;for(let l=r;l>c;l-=1)if(s.style.fontSize=l+"px",s.scrollWidth<=s.clientWidth+1)return;s.style.fontSize=c+"px"}),H._n=a?(H._n||0)+1:0,a&&H._n<8&&!H._t&&(H._t=setTimeout(()=>{H._t=0,H(e||document)},130))}document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>H(document));var ot=[],dt=!1;function ie(e){if(ot.push(e),dt)return;dt=!0;let a=()=>{let s=ot.shift();if(s)try{s()}catch{}ot.length?setTimeout(a,0):dt=!1};setTimeout(a,0)}function j(e){(!e||e.id!=="card-showcase")&&ne(e),typeof window.decorateVerified=="function"&&window.decorateVerified(e||document),(e||document).querySelectorAll(".pcard").forEach(r=>J(r,r.classList.contains("flipped"))),H(e);let a=[...(e||document).querySelectorAll("canvas[data-tank-name]")];if(!a.length)return;let s=r=>{if(r.dataset.mounted||r.dataset.parked)return;let c=r.dataset.tankName;r.dataset.parked="1",Et(c,()=>{r.dataset.parked="",!(r.dataset.mounted||!r.isConnected)&&(r.dataset.mounted="1",ie(()=>{if(!r.isConnected)return;let l=O(c);if(l&&window.TankRender){let n=window.TankRender.render(r,l,r.dataset.tankSize||"medium"),f=S=>{if(S===!1){delete r.dataset.mounted;return}r.isConnected&&(r.classList.add("tank-painted"),r.parentElement&&r.parentElement.classList.add("art-live"))};n&&n.then?n.then(f,()=>f(!1)):f()}}))})};if("IntersectionObserver"in window){let r=new IntersectionObserver(c=>{let l=c.filter(f=>f.isIntersecting).map(f=>f.target),n=()=>{l.splice(0,3).forEach(f=>{s(f),r.unobserve(f)}),l.length&&setTimeout(n,50)};n()},{rootMargin:"240px"});a.forEach(c=>r.observe(c))}else a.forEach(s);clearTimeout(j._heal),j._heal=setTimeout(()=>{(e||document).querySelectorAll("canvas[data-tank-name]").forEach(r=>{r.dataset.mounted&&r.classList.contains("tank-painted")||(delete r.dataset.mounted,delete r.dataset.parked,s(r))})},2500)}var It="tt1v1_cardtiers";function ce(e){let a={};try{a=JSON.parse(localStorage.getItem(It)||"{}")||{}}catch{a={}}let s=new Set;e.forEach(r=>{let c=et(q(r.rating));a[r.name]!=null&&c>a[r.name]&&s.add(r.name),a[r.name]=c});try{localStorage.setItem(It,JSON.stringify(a))}catch{}return s}function pt(e){let a=Y(e);if(!a)return Promise.reject(new Error("no player"));let s=q(a.rating),r=800,c=1e3,l=document.createElement("canvas");l.width=r,l.height=c;let n=l.getContext("2d"),f=n.createLinearGradient(0,0,0,c);f.addColorStop(0,"#10151d"),f.addColorStop(1,"#0b0e14"),n.fillStyle=f,n.fillRect(0,0,r,c);let S=document.querySelector(`.pcard-wrap.tier-${s}`),E=S?getComputedStyle(S):null,_=E&&E.getPropertyValue("--tc1").trim()||"#8a6a3f",$=E&&E.getPropertyValue("--tc2").trim()||"#5c4526",L=E&&E.getPropertyValue("--tfg").trim()||"#f2d9ae";n.strokeStyle=_,n.lineWidth=14,n.strokeRect(22,22,r-44,c-44),n.globalAlpha=.16,n.fillStyle=$,n.fillRect(22,22,r-44,300),n.globalAlpha=1;let g=O(e),w=document.createElement("canvas");return(g&&window.TankRender?window.TankRender.render(w,g,"large"):Promise.resolve()).then(()=>{if(g&&window.TankRender){let M=660*(w.height/w.width||.6);n.drawImage(w,(r-660)/2,110,660,M)}else n.fillStyle=$,n.font="900 150px Archivo, sans-serif",n.textAlign="center",n.fillText(yt(e),r/2,300);return n.textAlign="center",n.fillStyle="#eef2f8",n.font="900 64px Archivo, sans-serif",n.fillText(e,r/2,560),n.fillStyle=L,n.font="700 30px Inter, sans-serif",n.fillText(A(s).toUpperCase()+(a.rank!=null?"  \xB7  #"+a.rank:""),r/2,610),n.fillStyle="#eef2f8",n.font='800 110px "JetBrains Mono", monospace',n.fillText(a.rating.toFixed(1),r/2,740),n.fillStyle="#98a4b8",n.font="600 30px Inter, sans-serif",n.fillText(`${a.winPct.toFixed(1)}%  \xB7  ${a.w}${B("W")}\u2013${a.l}${B("L")}\u2013${a.d}${B("D")}`,r/2,795),n.fillStyle="#5d6a80",n.font="500 22px Inter, sans-serif",n.fillText("tierstats.github.io \u2014 1v1 Leaderboard",r/2,935),l})}function le(e,a){let s=location.origin+"/player/"+encodeURIComponent(e),r=()=>Z(a,t("cards.linkCopied"));navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(s).then(r,()=>Z(a,s)):Z(a,s)}function oe(e,a,s){if(a==="link"){le(e,s);return}pt(e).then(r=>{a==="copy"&&navigator.clipboard&&window.ClipboardItem?r.toBlob(c=>{navigator.clipboard.write([new ClipboardItem({"image/png":c})]).then(()=>Z(s,t("cards.copied"))).catch(()=>_t(r,e,s))}):_t(r,e,s)}).catch(()=>Z(s,t("cards.shareFail")))}function _t(e,a,s){let r=document.createElement("a");r.download=`1v1-card-${a}.png`,r.href=e.toDataURL("image/png"),r.click(),Z(s,t("cards.copied"))}function Z(e,a){if(!e)return;let s=String(a).replace(/\s*[✓✔]\s*$/,""),r=e.closest(".pcb-actions");if(r){if(r.classList.contains("is-flash"))return;let l=r.innerHTML;r.classList.add("is-flash"),r.innerHTML=`<div class="pcb-flash" role="status">${Yt}<span>${m(s)}</span></div>`,setTimeout(()=>{r.isConnected&&(r.classList.remove("is-flash"),r.innerHTML=l)},1600);return}let c=e.innerHTML;e.textContent=a,e.classList.add("ok"),setTimeout(()=>{e.innerHTML=c,e.classList.remove("ok")},1600)}function ut(){let e=document.getElementById("page-cards");if(!e)return;let a=(window.lbDataRev||0)+"|"+(window.getLang?window.getLang():"");if(e.dataset.deckSig===a&&e.querySelector("#deck-grid"))return;e.dataset.deckSig=a;let s=U().slice().sort((i,d)=>(i.rank!=null?i.rank:9999)-(d.rank!=null?d.rank:9999)||i.name.localeCompare(d.name));if(!s.length){e.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("cards.deckEmpty")}</div></div></div>`;return}let r={};D.forEach(i=>{r[i]=0}),s.forEach(i=>{r[q(i.rating)]+=1});let c=ce(s),l=s[0]?s[0].name:"";e.innerHTML=`
  <div class="wrap">
    <section class="hero deck-hero anim">
      <div class="kicker" data-i18n="cards.kicker">${t("cards.kicker")}</div>
      <h1 data-i18n-html="cards.h1">${t("cards.h1")}</h1>
      <p class="sub" data-i18n="cards.sub">${t("cards.sub")}</p>
      <div class="hero-row deck-meta">
        <i class="hm-rule" aria-hidden="true"></i>
        <span class="hm">${tp("cards.count",s.length).replace(/^(\d+)/,"<b>$1</b>")}</span>
        <i class="hm-sep" aria-hidden="true"></i>
        <span class="hm">${t("cards.metaTiers",{n:D.length})}</span>
        <i class="hm-sep" aria-hidden="true"></i>
        <span class="hm">${t("cards.metaTop",{name:m(l)})}</span>
      </div>
    </section>

    <section class="deck-shell anim">
      <div class="deck-set" id="deck-set">
        <div class="deck-set-head">
          <span class="deck-set-k">${t("cards.dist")}</span>
          <span class="deck-set-hint">${t("cards.distTip")}</span>
        </div>
        <div class="deck-dist" aria-hidden="true">
          ${D.slice().reverse().map(i=>`<i class="tier-${i}" style="flex-grow:${r[i]}"></i>`).join("")}
        </div>
        <div class="deck-tiers" role="group" aria-label="${m(t("cards.dist"))}">
          <button type="button" class="deck-tier is-all on" data-tier-filter="all" aria-pressed="true">
            <span class="dt-name">${t("cards.allTiers")}</span><b class="mono">${s.length}</b>
          </button>
          ${D.slice().reverse().map(i=>`
            <button type="button" class="deck-tier tier-${i}" data-tier-filter="${i}" aria-pressed="false"${r[i]?"":" disabled"}>
              <span class="dt-crest">${N(i)}</span>
              <span class="dt-name">${A(i)}</span>
              <b class="mono">${r[i]}</b>
            </button>`).join("")}
        </div>
      </div>

      <div class="deck-toolbar">
        <div class="deck-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3" stroke-linecap="round"/></svg>
          <input id="deck-search" type="text" placeholder="${t("cards.searchPh")}" aria-label="${m(t("cards.searchPh"))}" data-i18n-attr="placeholder:cards.searchPh" autocomplete="off">
          <button type="button" class="deck-clear" id="deck-clear" aria-label="${m(t("lb.clearSearch"))}" hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
          </button>
        </div>
        <div class="deck-sort" role="group" aria-label="${m(t("cards.sort"))}">
          <span class="deck-sort-k">${t("cards.sort")}</span>
          <button type="button" class="deck-sort-btn on" data-sort="rank" aria-pressed="true">${t("cards.sortRank")}</button>
          <button type="button" class="deck-sort-btn" data-sort="rating" aria-pressed="false">${t("cards.sortRating")}</button>
          <button type="button" class="deck-sort-btn" data-sort="name" aria-pressed="false">${t("cards.sortName")}</button>
        </div>
        <span class="deck-count mono" id="deck-count">${tp("cards.count",s.length)}</span>
      </div>

      <div class="deck-cards" id="deck-grid"></div>
    </section>
  </div>`;let n=document.getElementById("deck-grid"),f=document.getElementById("deck-search"),S=document.getElementById("deck-clear"),E=document.getElementById("deck-count"),_=document.getElementById("deck-set"),$="all",L="",g="rank",w={rank:(i,d)=>(i.rank!=null?i.rank:9999)-(d.rank!=null?d.rank:9999)||i.name.localeCompare(d.name),rating:(i,d)=>d.rating-i.rating||(i.rank!=null?i.rank:9999)-(d.rank!=null?d.rank:9999),name:(i,d)=>i.name.localeCompare(d.name)},M=()=>e.querySelectorAll(".deck-tier").forEach(i=>{let d=i.dataset.tierFilter===$;i.classList.toggle("on",d),i.setAttribute("aria-pressed",String(d))}),y=()=>e.querySelectorAll(".deck-sort-btn").forEach(i=>{let d=i.dataset.sort===g;i.classList.toggle("on",d),i.setAttribute("aria-pressed",String(d))});function R(){$="all",g="rank",L="",f.value="",S.hidden=!0,M(),y(),h()}function h(){let i=s.filter(u=>($==="all"||q(u.rating)===$)&&(!L||u.name.toLowerCase().includes(L))).sort(w[g]);if(E.textContent=tp("cards.count",i.length),e.querySelectorAll(".deck-dist i").forEach(u=>{u.classList.toggle("on",$!=="all"&&u.classList.contains("tier-"+$))}),_.classList.toggle("filtered",$!=="all"),!i.length){n.innerHTML=`<div class="deck-empty">
        <span class="deck-empty-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3.5" y="5.5" width="12" height="16" rx="2"/><path d="M8 3.5h10a2 2 0 0 1 2 2V18"/><path d="M8 11h4M8 15h4"/></svg></span>
        <p>${m(t("cards.deckEmpty"))}</p>
        <button type="button" class="deck-reset" data-deck-reset>${m(t("cards.clearFilters"))}</button>
      </div>`;let u=n.querySelector("[data-deck-reset]");u&&u.addEventListener("click",R),j(n),typeof observeReveals=="function"&&observeReveals();return}let d=n.__paintGen=(n.__paintGen||0)+1;n.innerHTML="";let k=10,T=10,o=0,p=()=>{if(n.__paintGen!==d||!n.isConnected)return;let u=o===0?k:T,v=i.slice(o,o+u);if(n.insertAdjacentHTML("beforeend",v.map(b=>ct(b)).join("")),c.size&&v.forEach(b=>{let C=n.querySelector(`.pcard-wrap[data-name="${CSS.escape(b.name)}"]`);C&&c.has(b.name)&&C.classList.add("tier-up")}),o+=u,o<i.length){requestAnimationFrame(p);return}j(n),typeof observeReveals=="function"&&observeReveals()};p()}h(),f.addEventListener("input",()=>{L=f.value.trim().toLowerCase(),S.hidden=!f.value,h()}),S.addEventListener("click",()=>{f.value="",L="",S.hidden=!0,f.focus(),h()}),e.querySelectorAll("[data-tier-filter]").forEach(i=>{i.addEventListener("click",()=>{i.disabled||($=i.dataset.tierFilter,M(),h())})}),e.querySelectorAll("[data-sort]").forEach(i=>{i.addEventListener("click",()=>{g=i.dataset.sort,y(),h()})}),j(e),typeof observeReveals=="function"&&observeReveals()}function de(e){let a=Y(e);return a?`<div class="pv-card-slot tier-${q(a.rating)}">${ct(a,{hero:!0})}</div>`:""}function pe(e){let a=Y(e);if(!a)return"";let s=q(a.rating);return`<span class="tier-chip tier-${s}" title="${A(s)}" aria-label="${A(s)}">${N(s)}</span>`}document.addEventListener("click",e=>{let a=e.target.closest("[data-guide-close]");if(a){try{localStorage.setItem("tt1v1_guide_"+a.dataset.guideClose+"_v1","1")}catch{}let c=a.closest(".page-guide");c&&c.remove();return}let s=e.target.closest(".pc-share[data-share]");if(s){e.stopPropagation(),oe(s.dataset.name,s.dataset.share,s);return}let r=e.target.closest(".pcard");r&&!e.target.closest("a[href]")&&(r.classList.toggle("flipped"),J(r,r.classList.contains("flipped")))}),document.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;let a=document.activeElement&&document.activeElement.classList&&document.activeElement.classList.contains("pcard")?document.activeElement:null;a&&(e.preventDefault(),a.classList.toggle("flipped"),J(a,a.classList.contains("flipped")))});function ue(){if(window.__lbTipInit)return;window.__lbTipInit=!0;let e=document.createElement("div");e.className="lb-tip lb-tip-hide",e.setAttribute("aria-hidden","true"),e.innerHTML=`
    <div class="lbt-head">
      <span class="lbt-tier"><span class="lbt-crest"></span><span class="lbt-tier-name"></span></span>
      <span class="lbt-rank mono"></span>
    </div>
    <div class="lbt-stage"><span class="lbt-notank" aria-hidden="true"></span><canvas></canvas></div>
    <div class="lbt-name"></div>
    <div class="lbt-line"><span class="lbt-rating mono"></span><span class="lbt-delta"></span></div>
    <div class="lbt-rec mono"></div>
    <div class="lbt-meta mono"></div>
    <div class="lbt-foot"><span class="lbt-form"></span><span class="lbt-open">${m(t("cards.openProfile"))} <i aria-hidden="true">\u2192</i></span></div>`,document.body.appendChild(e);let a=e.querySelector("canvas"),s=e.querySelector(".lbt-notank"),r=e.querySelector(".lbt-name"),c=e.querySelector(".lbt-crest"),l=e.querySelector(".lbt-tier-name"),n=e.querySelector(".lbt-rank"),f=e.querySelector(".lbt-rating"),S=e.querySelector(".lbt-delta"),E=e.querySelector(".lbt-rec"),_=e.querySelector(".lbt-meta"),$=e.querySelector(".lbt-form"),L=650,g=null,w=null,M=null,y=null,R=0,h=Promise.resolve(),i=o=>{let p=o.getBoundingClientRect(),u=e.offsetWidth||236,v=e.offsetHeight||224,b=Math.max(12,Math.min(window.innerWidth-u-12,p.left+42)),C=document.querySelector("#full-rankings .lb-bar"),P=Math.max(8,C?C.getBoundingClientRect().bottom+8:8),x=p.top-v+4;if(x<P){let I=p.bottom-4;x=I+v<=window.innerHeight-8?I:Math.max(P,window.innerHeight-v-8)}e.style.left=b+"px",e.style.top=Math.round(x)+"px"};document.addEventListener("mouseover",o=>{let p=o.target.closest&&o.target.closest(".lb-row");if(!(!p||!p.dataset.name)){if(clearTimeout(g),p===M){y&&(cancelAnimationFrame(R),R=requestAnimationFrame(()=>i(p)));return}M=p,y=null,clearTimeout(w),e.classList.add("lb-tip-hide"),w=setTimeout(()=>{if(w=null,M!==p)return;y=p.dataset.name;let u=Y(y),v=u?q(u.rating):"";if(u){r.textContent=y,c.className="lbt-crest"+(v?" tier-"+v:""),c.innerHTML=v?N(v):"",l.textContent=v?A(v):"";let C=(p.querySelector(".rank-badge .num")||{}).textContent||"";n.textContent=C?"#"+String(C).trim():"",f.textContent=u.provisional?`${Math.round(u.rating-100)}\u2013${Math.round(u.rating+100)}`:u.rating.toFixed(1),f.classList.toggle("prov",!!u.provisional),S.innerHTML=kt(u)||"",E.innerHTML=`<b class="w">${u.w}${B("W")}</b> <b class="l">${u.l}${B("L")}</b> <b class="d">${u.d}${B("D")}</b> <span>\xB7 ${u.winPct}%</span>`,s.innerHTML=v?N(v):"",_.textContent=tp("cmp.meta",u.matches,{rd:u.rd.toFixed(1)});let P=nt(y).slice(0,5).reverse();$.innerHTML=P.length?`<span class="form">${P.map(x=>`<i class="${x.res.toLowerCase()}">${m(B(x.res))}</i>`).join("")}</span>`:""}e.className="lb-tip lb-tip-hide"+(v?" tier-"+v:"");let b=()=>{M===p&&(e.style.transition="none",i(p),e.offsetWidth,e.style.transition="",e.classList.remove("lb-tip-hide"))};Et(y,()=>{if(M!==p)return;let C=O(y);C&&window.TankRender?(a.style.display="block",s.style.display="none",h=h.catch(()=>{}).then(()=>window.TankRender.render(a,C,"medium")),h.then(b,b)):(a.style.display="none",s.style.display="grid",b())})},L)}});let d=()=>{e.matches(":hover")||(clearTimeout(w),w=null,M=null,e.classList.add("lb-tip-hide"),y=null)},k=o=>{clearTimeout(g),g=setTimeout(d,o)},T=()=>{clearTimeout(g),g=null,clearTimeout(w),w=null,M=null,y=null,e.classList.add("lb-tip-hide")};window.lbHideRowTip=T,document.addEventListener("mouseout",o=>{if(!(o.target.closest&&o.target.closest(".lb-row")))return;let p=o.relatedTarget;p&&p.closest&&p.closest(".lb-tip")||k(140)}),e.addEventListener("mouseenter",()=>clearTimeout(g)),e.addEventListener("mouseleave",()=>k(160)),e.addEventListener("click",()=>{if(!y)return;let o=y;T(),location.hash="#/player/"+encodeURIComponent(o)}),window.addEventListener("scroll",d,{passive:!0})}ue();function fe(e){let a=document.getElementById("deck-grid");if(!a)return;let s=[...a.querySelectorAll(".pcard-wrap")],r=s.find(l=>l.dataset.name===e);if(!r){let l=String(e||"").toLowerCase();r=s.find(n=>(n.dataset.name||"").toLowerCase()===l)}if(!r)return;r.scrollIntoView({behavior:"smooth",block:"center"});let c=r.querySelector(".pcard");c&&(c.classList.add("flipped"),J(c,!0))}function Rt(){let e=String(window.lbCardReturnHash||"");return/^#\/[a-z]/i.test(e)&&!e.startsWith("#/card/")?e:"#/cards"}var he=[[4,18,3,6.8,-.2],[96,14,2,7.4,.9],[2,48,2,5.6,1.6],[98,56,3,6.2,.3],[6,76,3,7.1,1.1],[94,84,2,5.9,.6],[12,96,2,6.5,1.9],[88,4,2,7.8,.1],[26,100,2,5.4,1.3],[73,1,3,6.9,.8],[0,33,2,6.1,2.1],[100,70,2,7.3,1.5],[17,6,2,5.8,.5],[82,97,3,6.6,1.8],[10,62,2,7.7,1],[90,38,2,5.5,2.3]];function me(e){let a=e.name,s=q(e.rating),r=et(s),c=U().length,l=String(e.rank!=null?e.rank:c).padStart(2,"0"),n=e.rank===1,f=e.provisional?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:e.rating.toFixed(1),S=m(Rt()),E=r>=4?r===4?8:r===5?12:16:0,_=E?he.slice(0,E).map(([$,L,g,w,M])=>`<i class="cs-spark" style="--x:${$}%;--y:${L}%;--s:${g}px;--d:${w}s;--dl:${M}s"></i>`).join(""):"";return`
  <div class="cs tier-${s}${n?" is-champion":""}" id="card-showcase" role="dialog"
       aria-modal="true" aria-labelledby="cs-title" tabindex="-1">
    <div class="cs-scene" aria-hidden="true">
      <span class="cs-ghost">${m(A(s))}</span>
      <span class="cs-rays cs-rays-a"></span>
      <span class="cs-rays cs-rays-b"></span>
      <span class="cs-aurora cs-aurora-a"></span>
      <span class="cs-aurora cs-aurora-b"></span>
    </div>
    <header class="cs-bar">
      <a class="cs-back" href="#/cards">${Xt}<span>${t("cards.showcaseBack")}</span></a>
      <span class="cs-crumb">${t("cards.showcase")}</span>
      <a class="cs-close" href="${S}" aria-label="${m(t("cards.showcaseClose"))}" title="${m(t("cards.showcaseClose"))}">${Qt}<kbd aria-hidden="true">ESC</kbd></a>
    </header>
    <div class="cs-stage">
      <div class="cs-id">
        <div class="cs-kicker">
          <span class="cs-crest">${N(s)}</span>
          <span class="cs-tier">${A(s)}</span>
          ${n?`<em class="cs-champ">
            <span class="cs-champ-crest">${Lt}</span>
            <span class="cs-champ-txt">${t("cards.champion")}</span>
            <span class="cs-champ-no">#${l}</span>
          </em>`:""}
        </div>
        <h1 class="cs-title" id="cs-title">${m(a)}</h1>
        <span class="cs-rule" aria-hidden="true"></span>
        <div class="cs-facts">
          <div class="cs-fact"><span>${t("th.rating")}</span><b class="mono${e.provisional?" prov":""}">${f}</b></div>
          <div class="cs-fact"><span>${t("th.winPct")}</span><b class="mono">${e.winPct.toFixed(1)}<small>%</small></b></div>
          <div class="cs-fact"><span>${t("pl.record")}</span><b class="mono">${e.w}\u2013${e.l}\u2013${e.d}</b></div>
        </div>
      </div>
      <div class="cs-figure" data-cs-figure>
        <span class="cs-figure-halo" aria-hidden="true"></span>
        <span class="cs-sparks" aria-hidden="true">${_}</span>
        <div class="cs-tilt">
          <div class="cs-float">
            <div class="cs-card">
              ${ct(e,{size:"medium",showcase:!0})}
            </div>
          </div>
        </div>
        <span class="cs-plinth" aria-hidden="true"></span>
        <span class="cs-side cs-side-l" aria-hidden="true">TIERSTATS \xB7 1V1</span>
        <span class="cs-side cs-side-r" aria-hidden="true">THE DECK</span>
      </div>
      <div class="cs-actions">
        <a class="cs-btn cs-btn-primary" href="#/player/${encodeURIComponent(a)}">${t("cards.openProfile")}${St}</a>
        <button type="button" class="cs-btn" data-cs-flip aria-pressed="false">${it}<span data-cs-flip-label>${t("cards.statSheet")}</span></button>
        <button type="button" class="cs-btn cs-iconbtn" data-cs-link title="${m(t("cards.shareLink"))}" aria-label="${m(t("cards.shareLink"))}">${xt}</button>
        <button type="button" class="cs-btn cs-iconbtn" data-cs-save title="${m(t("cards.shareDl"))}" aria-label="${m(t("cards.shareDl"))}">${Mt}</button>
        <p class="cs-hint" aria-live="polite">${t("cards.showcaseHint")}</p>
      </div>
    </div>
    <footer class="cs-foot">
      <span>${m(A(s).toUpperCase())} \xB7 ${t("cards.showcase")}</span>
      <span class="mono">${l} <i>/</i> ${String(c).padStart(2,"0")}</span>
    </footer>
  </div>`}function ft(e){let a=e&&e.querySelector?e.querySelector(".cs-title"):null;if(!a||!a.offsetWidth)return;a.style.fontSize="";let s=parseFloat(getComputedStyle(a).fontSize)||68;for(let r=s;r>27;r-=2)if(a.style.fontSize=r+"px",a.scrollWidth<=a.clientWidth+1)return;a.style.fontSize="27px"}function qt(e){if(e){if((e.__csBg||[]).forEach(a=>{try{a.inert=!1}catch{}}),e.__csBg=null,e.__csRO){try{e.__csRO.disconnect()}catch{}e.__csRO=null}e.__csKey&&(document.removeEventListener("keydown",e.__csKey,!0),e.__csKey=null),document.documentElement.classList.remove("cs-lock")}}var ht=0;function Bt(){let e=document.getElementById("card-showcase");if(e){if(qt(e),clearTimeout(ht),!!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)){e.remove();return}e.classList.add("cs-out"),ht=setTimeout(()=>{e.isConnected&&e.remove()},260)}}function ve(e){let a=String(e||"").toLowerCase(),s=U().find(o=>o.name===e)||U().find(o=>o.name.toLowerCase()===a);if(!s)return Bt(),!1;clearTimeout(ht);let r=document.getElementById("card-showcase");r&&(qt(r),r.remove());let c=document.createElement("div");c.innerHTML=me(s).trim();let l=c.firstElementChild;document.body.appendChild(l),document.documentElement.classList.add("cs-lock");let n=[];[...document.body.children].forEach(o=>{if(!(o===l||o.tagName==="SCRIPT"||o.tagName==="STYLE"||o.tagName==="LINK")&&!o.inert)try{o.inert=!0,n.push(o)}catch{}}),l.__csBg=n,j(l),ft(l),document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>{l.isConnected&&ft(l)}),window.ResizeObserver&&(l.__csRO=new ResizeObserver(()=>ft(l)),l.__csRO.observe(l.querySelector(".cs-id")));let f=l.querySelector(".pcard"),S=l.querySelector("[data-cs-flip]"),E=l.querySelector("[data-cs-flip-label]"),_=l.querySelector(".cs-hint"),$=0,L=!!(window.matchMedia&&matchMedia("(pointer: coarse)").matches),g=t(L||window.innerWidth<=760?"cards.showcaseHintTouch":"cards.showcaseHint");_.textContent=g;let w=(o,p)=>{clearTimeout($),_.textContent=o,_.classList.toggle("is-ok",p==="ok"),_.classList.toggle("is-err",p==="err"),_.classList.toggle("is-url",p==="url"),$=setTimeout(()=>{l.isConnected&&(_.textContent=g,_.classList.remove("is-ok","is-err","is-url"))},p==="url"?9e3:2400)},M=()=>{let o=!!(f&&f.classList.contains("flipped"));S&&S.setAttribute("aria-pressed",String(o)),E&&(E.textContent=o?t("cards.flipBack"):t("cards.statSheet"))},y=()=>{if(!f)return;let o=!f.classList.contains("flipped");f.classList.toggle("flipped",o),J(f,o),M()};l.addEventListener("click",o=>{if(o.target.closest("[data-cs-flip]")){o.preventDefault(),y();return}if(o.target.closest("[data-cs-link]")){o.preventDefault();let u=location.origin+"/card/"+encodeURIComponent(s.name),v=()=>w(t("cards.linkCopied"),"ok");navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(u).then(v,()=>w(u,"url")):w(u,"url");return}let p=o.target.closest("[data-cs-save]");if(p){o.preventDefault(),p.disabled=!0,pt(s.name).then(u=>{let v=document.createElement("a");v.download=`1v1-card-${s.name}.png`,v.href=u.toDataURL("image/png"),v.click(),w(t("cards.copied"),"ok")}).catch(()=>w(t("cards.shareFail"),"err")).finally(()=>{p.isConnected&&(p.disabled=!1)});return}o.target.closest(".pcard")&&requestAnimationFrame(M)});let R=o=>{if(o.key==="Escape"){o.preventDefault(),o.stopPropagation(),location.hash=Rt();return}if(o.key!=="Tab")return;let p=[...l.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(C=>!C.closest("[inert]")&&C.getClientRects().length);if(!p.length)return;let u=p[0],v=p[p.length-1],b=document.activeElement;o.shiftKey&&(b===u||!l.contains(b))?(o.preventDefault(),v.focus()):!o.shiftKey&&(b===v||!l.contains(b))&&(o.preventDefault(),u.focus())};l.__csKey=R,document.addEventListener("keydown",R,!0);let h=l.querySelector("[data-cs-figure]"),i=l.querySelector(".cs-tilt"),d=window.matchMedia&&matchMedia("(pointer: fine)").matches,k=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;if(h&&i&&d&&!k){let o=0,p=0,u=0,v=()=>{if(o=0,!h.isConnected)return;let b=h.getBoundingClientRect();if(!b.width||!b.height)return;let C=Math.max(-.5,Math.min(.5,(p-b.left)/b.width-.5)),P=Math.max(-.5,Math.min(.5,(u-b.top)/b.height-.5));i.style.transform=`perspective(1600px) rotateX(${(-P*5).toFixed(2)}deg) rotateY(${(C*7).toFixed(2)}deg)`};h.addEventListener("pointermove",b=>{p=b.clientX,u=b.clientY,o||(o=requestAnimationFrame(v))}),h.addEventListener("pointerleave",()=>{o&&(cancelAnimationFrame(o),o=0),i.style.transform=""})}let T=l.querySelector(".cs-close");return requestAnimationFrame(()=>{try{T.focus({preventScroll:!0})}catch{l.focus()}}),!0}var at=!1,At=new Set;function $e(e){if(!window.TankRender||!e)return;let a=String(e).toLowerCase(),s=Y(e)||U().find(c=>c.name.toLowerCase()===a);if(!s||At.has(s.name))return;let r=O(s.name);if(r){At.add(s.name);try{let c=document.createElement("canvas"),l=window.TankRender.render(c,r,"medium");l&&l.catch&&l.catch(()=>{})}catch{}}}function Pt(e){let a=document.getElementById("page-cards");if(!a||a.querySelector("#deck-grid")||a.classList.contains("active"))return;if(e){at=!1,ut();return}if(at||(navigator.connection||{}).saveData||navigator.hardwareConcurrency&&navigator.hardwareConcurrency<4||navigator.deviceMemory&&navigator.deviceMemory<4)return;at=!0;let s=()=>{if(at=!1,document.visibilityState!=="visible")return;let r=document.getElementById("page-cards");!r||r.querySelector("#deck-grid")||r.classList.contains("active")||ut()};window.requestIdleCallback?window.requestIdleCallback(s,{timeout:4500}):setTimeout(s,2200)}function ge(){let e=document.getElementById("page-cards");!e||!e.classList.contains("active")||!e.querySelector("#deck-grid")||(j(e),typeof observeReveals=="function"&&observeReveals())}var ke=e=>e&&e.closest?e.closest('a[href="#/cards"], a[href^="#/card/"]'):null;function mt(e){let a=ke(e.target);if(!a)return;Pt(!0);let s=a.getAttribute("href")||"";if(s.startsWith("#/card/"))try{$e(decodeURIComponent(s.slice(7)))}catch{}}document.addEventListener("pointerover",mt,{passive:!0}),document.addEventListener("focusin",mt),document.addEventListener("pointerdown",mt,{passive:!0}),window.renderCards=ut,window.cardsShowcase=ve,window.cardsShowcaseClose=Bt,window.cardsPreload=Pt,window.cardsReveal=ge;function tt(){let e=document.querySelectorAll(".pcard-wrap.card-hero");e.length&&e.forEach(a=>{let s=a.querySelector(".pcard"),r=a.querySelector(".pcard-back-scroll");if(!s||!r)return;s.style.minHeight="";let c=r.scrollHeight-r.clientHeight;c>0&&(s.style.minHeight=Math.ceil(s.getBoundingClientRect().height+c)+"px")})}window.fitHeroCards=tt;var vt=!1;function Ht(){vt||(vt=!0,setTimeout(()=>{vt=!1,tt(),setTimeout(tt,250)},0))}new MutationObserver(Ht).observe(document.documentElement,{childList:!0,subtree:!0});var Ft;window.addEventListener("resize",()=>{clearTimeout(Ft),Ft=setTimeout(tt,150)}),document.fonts&&document.fonts.ready&&document.fonts.ready.then(tt),Ht(),window.cardsFocus=fe,window.cardsHeroHTML=de,window.lbTankFor=O,window.lbTankFresh=lt,window.cardsRowChip=pe,window.cardsMountAll=j,window.fitCardNames=H,window.cardsSharePNG=pt,window.cardsGuideHTML=Kt,window.cardsTiers={TIER_KEYS:D,TIER_MIN:$t,tierMin:V,tierOf:q,tierIdx:et,tierLabel:A,crestSVG:N}})();})();
