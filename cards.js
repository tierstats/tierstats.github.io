/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var z=["bronze","silver","gold","platinum","diamond","master","grandmaster"],Mt={bronze:-1/0,silver:1300,gold:1550,platinum:1700,diamond:1850,master:1950,grandmaster:2e3};function Ct(e){let s=window.LB_TIER_MIN||{};return s[e]!=null?Number(s[e]):Mt[e]}function P(e){let s="bronze";for(let a of z)e>=Ct(a)&&(s=a);return s}function dt(e){return z.indexOf(e)}function B(e){return t("cards.tier."+e)}function O(){return window.lbCards||null}function Z(){let e=O();return e&&e.topOf?e.topOf():((window.LB_DATA||{}).qualified||[]).map(s=>({...s}))}function J(e){let s=O();return s&&s.byName&&s.byName()[e]?s.byName()[e]:Z().find(a=>a.name===e)||null}function j(e){let s=(window.LB_TANKS||{})[e],a=(window.LB_TANKS_SNAPSHOT||{})[e];return s?a?{...a,...s}:s:a||null}function pt(e){let s=O();return s&&s.histOf?s.histOf(e):((window.LB_DATA||{}).histories||{})[e]||[]}function Tt(e){let s=O();return s&&s.fmtDate?s.fmtDate(e):String(e||"")}function xt(e){let s=O();return s&&s.deltaTag?s.deltaTag(e):""}function H(e){let s=O();return s&&s.resLetter?s.resLetter(e):e}function Wt(e){return pt(e).slice(0,5).reverse().map(a=>{let n=`${H(a.res)} \xB7 ${t("pl.vsOpp",{opp:String(a.opp||"")})} ${a.for_}-${a.against}`+(a.date?` \xB7 ${Tt(a.date)}`:"");return`<i class="${a.res.toLowerCase()}" data-tip="${m(n)}">${m(H(a.res))}</i>`}).join("")}function jt(e){let s=pt(e),a=0,n=0,i="",c=0,r=s.slice().reverse();for(let f of r)f.res==="W"?(n+=1,n>a&&(a=n)):n=0;if(s.length){i=s[0].res,c=0;for(let f of s)if(f.res===i)c+=1;else break}return{best:a,curRes:i,curN:c}}var G=null;function zt(e,s){if(!G){let i=O();if(G=i&&i.ratingTimeline?i.ratingTimeline():null,!G){G={};let c=window.LB_DATA||{};for(let r of Object.keys(c.curRatings||{})){let f=Math.max(c.curRatings[r]||-1/0,(c.prevRatings||{})[r]||-1/0);G[r]={rating:f,date:""}}}}let a=G[e],n=s??-1/0;return a?a.rating>=n?a:{rating:n,date:""}:n>-1/0?{rating:n,date:""}:null}function m(e){return String(e).replace(/[&<>"]/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[s])}function Et(e){let s=String(e).split(/[\s_\-.]+/).filter(Boolean);return((s[0]||"?")[0]+(s[1]?s[1][0]:(s[0]||"?")[1]||"")).toUpperCase()}var Kt='<svg class="pcard-sil" viewBox="0 0 120 72" aria-hidden="true"><g fill="currentColor"><rect x="18" y="40" width="84" height="15" rx="7.5"/><rect x="30" y="28" width="40" height="14" rx="6"/><rect x="63" y="32" width="45" height="5" rx="2.5"/><circle cx="33" cy="56" r="8"/><circle cx="53" cy="56" r="8"/><circle cx="73" cy="56" r="8"/><circle cx="93" cy="56" r="8"/></g></svg>';function Gt(e,s){return j(e)?`<div class="pcard-art-stage">${Kt}<canvas class="pcard-tank" data-tank-name="${m(e)}" data-tank-size="${s||"medium"}" aria-hidden="true"></canvas></div>`:`<div class="pcard-art-stage empty" title="${m(t("cards.noGame"))}"><div class="pcard-mono" aria-hidden="true">${m(Et(e))}</div></div>`}function Ut(e){let s="tt1v1_guide_"+e+"_v1";try{if(localStorage.getItem(s))return""}catch{}return`<aside class="page-guide" data-guide="${e}"><span class="pg-ico" aria-hidden="true">?</span><div class="pg-body"><b>${t("guide.title")}</b> ${t("guide."+e)}</div><button class="pg-x" data-guide-close="${e}" aria-label="${t("guide.dismiss")}">${t("guide.dismiss")}</button></aside>`}var Zt=0;function W(e){let s="pcl"+ ++Zt,a="#0a0f16",n=h=>Math.round(h*100)/100,i=(h,o,d,w)=>[n(h+Math.cos(d)*w),n(o+Math.sin(d)*w)],c=`url(#m${s})`,r=`url(#r${s})`,f=`url(#b${s})`;function M(h,o,d,w,L){let l=Math.cos(d),u=Math.sin(d),p=-u,$=l,g=h+l*w,b=o+u*w,A=h+l*w*.48+p*L,q=o+u*w*.48+$*L,C=h+l*w*.48-p*L,_=o+u*w*.48-$*L;return`M${n(h)} ${n(o)} Q${n(A)} ${n(q)} ${n(g)} ${n(b)} Q${n(C)} ${n(_)} ${n(h)} ${n(o)}Z`}function T(h,o,d){let L=Math.PI*2/8,l=Math.PI/8,u=d*.47,p=d*.97,$=C=>{let _=Math.cos(C-Math.PI*.75);return _>.55?{f:"#fff",o:.5}:_>.1?{f:"var(--tfg)",o:.88}:_>-.55?{f:"var(--tc1)",o:.95}:_>-.9?{f:"var(--tc2)",o:1}:{f:a,o:.8}},g=[];for(let C=0;C<16;C++)g.push(i(h,o,-Math.PI/2+C*Math.PI/8,p));let b="";for(let C=0;C<8;C++){let _=-Math.PI/2+C*L,tt=i(h,o,_,u),et=i(h,o,_+L,u),N=i(h,o,_+l,p),$t=$(_+l);b+=`<path d="M${tt[0]} ${tt[1]} L${et[0]} ${et[1]} L${N[0]} ${N[1]}Z" fill="${$t.f}" fill-opacity="${$t.o}" stroke="${a}" stroke-opacity=".55" stroke-width=".55"/>`;let st=g[(C*2+1)%16],gt=g[(C*2+2)%16],kt=$(_+L);b+=`<path d="M${et[0]} ${et[1]} L${N[0]} ${N[1]} L${st[0]} ${st[1]}Z" fill="${kt.f}" fill-opacity="${kt.o}" stroke="${a}" stroke-opacity=".45" stroke-width=".5"/>`;let wt=$(_+L+l);b+=`<path d="M${N[0]} ${N[1]} L${st[0]} ${st[1]} L${gt[0]} ${gt[1]}Z" fill="${wt.f}" fill-opacity="${wt.o}" stroke="${a}" stroke-opacity=".45" stroke-width=".5"/>`,b+=`<path d="M${tt[0]} ${tt[1]} L${N[0]} ${N[1]}" stroke="#fff" stroke-opacity=".3" stroke-width=".6"/>`}let A="";for(let C=0;C<8;C++){let _=i(h,o,-Math.PI/2+C*L,u);A+=(C?"L":"M")+_[0]+" "+_[1]}A+="Z";let q=g.map((C,_)=>(_?"L":"M")+C[0]+" "+C[1]).join("")+"Z";return`<path d="${q}" fill="var(--tc2)" stroke="${a}" stroke-width="1.1"/>
      ${b}
      <path d="${A}" fill="var(--tfg)" fill-opacity=".92" stroke="${a}" stroke-opacity=".6" stroke-width=".6"/>
      <path d="M${n(h-d*.32)} ${n(o-d*.3)} ${n(h-d*.02)} ${n(o-d*.38)} ${n(h+d*.1)} ${n(o-d*.08)} ${n(h-d*.2)} ${n(o+d*.02)}Z" fill="#fff" opacity=".5"/>
      <path d="${q}" fill="none" stroke="${a}" stroke-opacity=".7" stroke-width="1"/>
      <path d="M${n(h-d*.82)} ${n(o-d*.34)} ${n(h-d*.42)} ${n(o-d*.82)}" stroke="#fff" stroke-opacity=".5" stroke-width=".9" stroke-linecap="round"/>`}function I(h,o,d){let w=d*1.33,L=[0,1,2,3].map(l=>{let u=Math.PI/4+l*Math.PI/2,p=i(h,o,u,w*.92),$=i(h,o,u,w*1.16);return`<path d="M${p[0]} ${p[1]} L${$[0]} ${$[1]}" stroke="var(--tfg)" stroke-width="2.4" stroke-linecap="round" opacity=".82"/>
        <path d="M${p[0]} ${p[1]} L${$[0]} ${$[1]}" stroke="${a}" stroke-width=".7" stroke-linecap="round" opacity=".45" transform="translate(.7 .8)"/>`}).join("");return`<circle cx="${h}" cy="${o}" r="${w}" fill="${r}" stroke="${a}" stroke-width="1.5"/>
      <circle cx="${h}" cy="${o}" r="${n(w*1.02)}" fill="none" stroke="var(--tfg)" stroke-opacity=".38" stroke-width=".75"/>
      <circle cx="${h}" cy="${o}" r="${n(d*1.08)}" fill="${a}" opacity=".9"/>
      ${T(h,o,d)}
      ${L}`}let v=50,x=52,k=28,y=[105,126,147,168,189,210,231],E="";y.forEach((h,o)=>{let d=h*Math.PI/180,w=i(v,x,d,k),L=d+Math.PI/2-.2,l=12-(o===6?1.6:0);if(E+=`<path d="${M(w[0],w[1],L,l,4.1)}" fill="${c}" stroke="${a}" stroke-width="1.05"/>
      <path d="${M(w[0],w[1],L,l*.86,2.5)}" fill="var(--tfg)" opacity=".22"/>
      <path d="${M(w[0],w[1],L,l*.95,1.3)}" fill="none" stroke="#fff" stroke-opacity=".14" stroke-width=".5"/>
      <path d="M${w[0]} ${w[1]} L${n(w[0]+Math.cos(L)*l*.86)} ${n(w[1]+Math.sin(L)*l*.86)}" stroke="${a}" stroke-opacity=".42" stroke-width=".65"/>`,o<6){let u=i(v,x,d+10.5*Math.PI/180,k+.4);E+=`<circle cx="${u[0]}" cy="${u[1]}" r="1.55" fill="${r}" stroke="${a}" stroke-width=".45"/>`}});let S=i(v,x,103*Math.PI/180,k),R=i(v,x,245*Math.PI/180,k);return`<svg class="pc-crest" viewBox="13 17 74 80" aria-hidden="true"><defs>
    <linearGradient id="m${s}" x1=".08" y1="0" x2=".9" y2="1">
      <stop offset="0" stop-color="var(--tfg)"/><stop offset=".16" stop-color="var(--tc1)"/>
      <stop offset=".42" stop-color="var(--tc2)"/><stop offset=".62" stop-color="var(--tc1)"/>
      <stop offset=".84" stop-color="var(--tc2)"/><stop offset="1" stop-color="var(--tc1)"/>
    </linearGradient>
    <linearGradient id="r${s}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="var(--tfg)"/><stop offset=".24" stop-color="var(--tc1)"/>
      <stop offset=".5" stop-color="var(--tc2)"/><stop offset=".74" stop-color="var(--tc1)"/>
      <stop offset="1" stop-color="var(--tc2)"/>
    </linearGradient>
    <linearGradient id="b${s}" x1=".1" y1="0" x2=".9" y2="1">
      <stop offset="0" stop-color="var(--tfg)"/><stop offset=".3" stop-color="var(--tc1)"/>
      <stop offset=".72" stop-color="var(--tc1)"/><stop offset="1" stop-color="var(--tc2)"/>
    </linearGradient>
  </defs>
    <g transform="translate(1.5 2)" opacity=".45">
      <circle cx="${v}" cy="${x}" r="20" fill="${a}"/>
      <path d="M38 80 50 84 62 80 58 96 50 91 42 96Z" fill="${a}"/>
    </g>
    <path d="M44 80 50 83 56 80 59 92 53 89 50 95 47 89 41 92Z" fill="${f}" stroke="${a}" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M47 84 50 86 53 84 51 91 50 89 49 91Z" fill="${a}" opacity=".35"/>
    <path d="M44.6 80.8 47.6 90M55.4 80.8 52.4 90" stroke="var(--tfg)" stroke-opacity=".28" stroke-width=".55"/>
    <path d="M${S[0]} ${S[1]} A${k} ${k} 0 0 1 ${R[0]} ${R[1]}" fill="none" stroke="${a}" stroke-width="2.8"/>
    <path d="M${S[0]} ${S[1]} A${k} ${k} 0 0 1 ${R[0]} ${R[1]}" fill="none" stroke="var(--tc2)" stroke-width="1.15"/>
    <g transform="translate(100 0) scale(-1 1)">
      <path d="M${S[0]} ${S[1]} A${k} ${k} 0 0 1 ${R[0]} ${R[1]}" fill="none" stroke="${a}" stroke-width="2.8"/>
      <path d="M${S[0]} ${S[1]} A${k} ${k} 0 0 1 ${R[0]} ${R[1]}" fill="none" stroke="var(--tc2)" stroke-width="1.15"/>
    </g>
    <g>${E}</g>
    <g transform="translate(100 0) scale(-1 1)">${E}</g>
    <circle cx="${v}" cy="51" r="20.6" fill="${a}" opacity=".45"/>
    ${I(v,51,15.2)}
    <circle cx="${v}" cy="51" r="20.9" fill="none" stroke="var(--tc1)" stroke-opacity=".35" stroke-width=".7"/>
    <path d="M43.5 80.2 50 83.2 56.5 80.2 58.4 86.6 50 90.6 41.6 86.6Z" fill="${r}" stroke="${a}" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M45 81.2 50 83.4 55 81.2 56.2 85.2 50 88.3 43.8 85.2Z" fill="${a}" opacity=".72"/>
    <circle cx="50" cy="84.6" r="1.5" fill="var(--tc1)" stroke="${a}" stroke-width=".4"/>
  </svg>`}var It='<svg class="pc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',Vt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',Rt='<svg class="pc-crown" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.7 8.1 8.5 11l3.5-5.2L15.5 11l4.8-2.9-1.7 9.3H5.4L3.7 8.1Z"/><rect x="5.1" y="18.4" width="13.8" height="2.2" rx="1.1" fill="currentColor"/></svg>',Yt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.8"/></svg>',ut='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11a8 8 0 1 1 2.2 6.5M4 5v6h6"/></svg>',Qt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg>',_t='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',Jt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',Xt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"/></svg>';function te(e,s){let a=P(e.rating),n=e.rank!=null?String(e.rank).padStart(2,"0"):"\u2014",i=O(),c=j(s),r=c&&c.lastLogin?Number(c.lastLogin):0,f=r&&i&&i.lastSeenText?i.lastSeenText(r):"",M=r&&i&&i.lastSeenExact?i.lastSeenExact(r):"";return`<div class="pcb-head">
    <div class="pcb-head-txt">
      <span class="pcb-kicker">${t("cards.statSheet")}</span>
      <span class="pcard-name-row"><a class="pcard-name pc-open" href="#/player/${encodeURIComponent(s)}" title="${t("cards.openProfile")}">${m(s)}</a><span class="vslot" data-vname="${m(s)}"></span></span>
      <span class="pcb-meta"><span>${B(a)}</span><b class="mono">#${n}</b></span>
      ${f?`<span class="pcb-head-seen" title="${m(t("cards.lastSeen"))} \xB7 ${m(M)}">${Yt}${m(f)}</span>`:""}
    </div>
    <span class="pcb-head-side">
      <button type="button" class="pcb-flip" title="${m(t("cards.flipBack"))}" aria-label="${m(t("cards.flipBack"))}">${ut}</button>
      <span class="pcb-crest">${W(a)}</span>
    </span>
  </div>`}var ee='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',At='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5M5 20.5h14"/></svg>';function se(e,s){let a=n=>m(t(n));return`<div class="pcard-actions pcb-foot">
    ${s?`<a class="pc-showcase" href="#/card/${encodeURIComponent(e)}" title="${a("cards.showcase")}" aria-label="${a("cards.showcase")}">
      ${Xt}<span>${a("cards.showcase")}</span>${_t}
    </a>`:""}
    <div class="pcb-actions">
      <button class="pc-share pcb-icon-btn" data-share="copy" data-name="${m(e)}" title="${a("cards.shareCopy")}" aria-label="${a("cards.shareCopy")}">${ee}</button>
      <button class="pc-share pcb-icon-btn" data-share="dl" data-name="${m(e)}" title="${a("cards.shareDl")}" aria-label="${a("cards.shareDl")}">${At}</button>
      <button class="pc-share pcb-icon-btn" data-share="link" data-name="${m(e)}" title="${a("cards.shareLink")}" aria-label="${a("cards.shareLink")}">${It}</button>
    </div>
  </div>`}function ae(e,s){let a=O(),n=zt(s,e.rating),i=jt(s),c=j(s),r=c&&c.stats||null,f=e.provisional?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:e.rating.toFixed(1),M=r&&r.deaths?(r.kills/r.deaths).toFixed(2):r?String(r.kills):"\u2014",T=a&&a.altsOf?a.altsOf(s):[],I=c&&c.created?new Date((c.created||0)*1e3).getFullYear():"",v=(x,k,y)=>`<div class="pcb-cell"><span>${x}</span><b class="mono"${y?` data-live-name="${m(s)}" data-live="${y}"`:""}>${k}</b></div>`;return`
    <div class="pcb-hero">
      <div class="pcb-hero-cell">
        <span class="pc-k">${t("th.rating")}</span>
        <b class="mono${e.provisional?" prov":""}">${f}</b>
        ${e.delta?xt(e):""}
      </div>
      ${n?`<div class="pcb-hero-cell">
        <span class="pc-k">${t("cards.peak")}</span>
        <b class="mono">${n.rating.toFixed(1)}</b>
        <small>${n.date?Tt(n.date):""}</small>
      </div>`:""}
    </div>
    <div class="pcb-grid">
      ${v(t("pl.glicko"),e.glicko.toFixed(1))}
      ${v(t("th.rd"),e.rd.toFixed(1))}
      ${v(t("pl.matches"),e.matches)}
      ${v(t("pl.opponents"),e.opponents)}
      ${v(t("th.avgOpp"),e.avgOpp.toFixed(1))}
      ${v(t("cards.bestStreak"),i.best?`${i.best}${H("W")}`:"\u2014")}
    </div>
    ${r?`
    <div class="pcb-game">
      <div class="pcb-game-head"><span class="pcb-kicker">${t("cards.gameStats")}</span>${I?`<span class="pcb-since">${t("cards.since",{year:I})}</span>`:""}</div>
      <div class="pcb-game-grid">
        ${v(t("cards.kills"),r.kills,"kills")}
        ${v(t("cards.deaths"),r.deaths,"deaths")}
        ${v(t("cards.victories"),r.victories,"victories")}
        ${v(t("cards.xp"),r.xp,"xp")}
        ${v(t("cards.rank"),r.rank!=null?r.rank:"\u2014","rank")}
        ${v(t("cards.kd"),M,"kd")}
      </div>
    </div>`:`<div class="pcb-game empty">${t("cards.noGame")}</div>`}
    ${T.length?`<div class="pcb-note"><span>${t("cards.alts")}</span><b>${T.map(m).join(", ")}</b></div>`:""}
`}function X(e,s){if(!e)return;let a=e.querySelector(".pcard-front"),n=e.querySelector(".pcard-back");a&&(a.inert=!!s,a.setAttribute("aria-hidden",s?"true":"false")),n&&(n.inert=!s,n.setAttribute("aria-hidden",s?"false":"true"))}function ft(e,s){s=s||{};let a=e.name,n=P(e.rating),i=e.rank!=null?String(e.rank).padStart(2,"0"):"\u2014",c=e.provisional?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:e.rating.toFixed(1),r=e.inactive?`<span class="pc-retired">${t("cards.retired")}</span>`:"",f=e.winPct>=65?"hi":e.winPct>=50?"mid":"low";return`
  <article class="pcard-wrap pcard-v2 tier-${n}${e.rank===1?" is-champion":""}${s.hero?" card-hero":""}" data-name="${m(a)}">
    <div class="pcard">
      <div class="pcard-face pcard-front">
        <div class="pc-hero">
          <div class="pcard-art">
            ${Gt(a,s.size||"medium")}
            ${r}
          </div>
          <span class="pc-watermark mono${e.rank===1?" champ":""}" aria-hidden="true">${i}</span>
          <div class="pc-hero-top">
            <span class="pc-rank-tab">
              <span class="pc-rank-k">${e.rank===1?Rt:""}${t(e.rank===1?"cards.champion":"cards.rankLabel")}</span>
              <b class="pc-rank-n mono">${i}</b>
            </span>
            <span class="pc-tier-mark">
              <span class="pc-head-crest">${W(n)}</span>
              <span class="pc-tier-name">${B(n)}</span>
            </span>
          </div>
        </div>
        <div class="pcard-body">
          <div class="pcard-name-row"><div class="pcard-name">${m(a)}</div><span class="vslot" data-vname="${m(a)}"></span></div>
          <div class="pc-metrics">
            <div class="pc-metric pc-metric-rating">
              <span class="pc-k">${t("th.rating")}</span>
              <div class="pc-big-row"><b class="pc-big mono${e.provisional?" prov":""}">${c}</b></div>
            </div>
            <div class="pc-metric pc-metric-win">
              <span class="pc-k">${t("th.winPct")}</span>
              <b class="pc-winrate mono">${e.winPct.toFixed(1)}%</b>
              <span class="pc-winbar ${f}" aria-hidden="true"><i style="width:${e.winPct}%"></i></span>
            </div>
          </div>
          <div class="pc-bottom">
            <span class="pc-rec mono"><span class="w">${e.w}${H("W")}</span> <span class="l">${e.l}${H("L")}</span> <span class="d">${e.d}${H("D")}</span></span>
            <span class="pc-form"><span class="pc-k">${t("cards.form")}</span><span class="pills">${Wt(a)}</span></span>
          </div>
        </div>
        <button class="pc-flip-cue" type="button">
          <span class="fc-label">${t("cards.statSheet")}</span>
          <span class="fc-rule" aria-hidden="true"></span>
          <span class="fc-flip">${ut}</span>
        </button>
      </div>
      <div class="pcard-face pcard-back">
        ${te(e,a)}
        <div class="pcard-back-scroll" tabindex="0" role="group" aria-label="${m(t("cards.statSheet"))}">
          ${ae(e,a)}
        </div>
        ${se(a,!(s.showcase||s.hero))}
      </div>
    </div>
  </article>`}var V=null;function ne(e){if(!("IntersectionObserver"in window))return;V&&(V.disconnect(),V=null);let s=[...(e||document).querySelectorAll(".pcard-wrap.tier-diamond, .pcard-wrap.tier-master, .pcard-wrap.tier-grandmaster")];s.length&&(V=new IntersectionObserver(a=>{a.forEach(n=>{n.target.classList.toggle("anim-off",!n.isIntersecting)})},{rootMargin:"240px"}),s.forEach(a=>V.observe(a)))}var ht=new Set,K=new Map,Ht=e=>String(e||"").toLowerCase(),Y=0;function qt(e){(e||[...K.keys()]).forEach(s=>{let a=K.get(s);a&&(K.delete(s),a.forEach(n=>n()))}),!K.size&&Y&&(clearTimeout(Y),Y=0)}window.lbTankFreshMark=e=>{let s=(e||[]).map(Ht);s.forEach(a=>ht.add(a)),qt(s)};function Bt(e,s){let a=Ht(e);if(ht.has(a)){s();return}K.has(a)||K.set(a,new Set),K.get(a).add(s),Y||(Y=setTimeout(()=>qt(null),1200)),typeof window.lbTankWant=="function"&&(window.lbTankWant(e),typeof window.lbLiveStatsTick=="function"&&window.lbLiveStatsTick())}function F(e){let s=0;(e||document).querySelectorAll(".pcard-name").forEach(a=>{if(!a.offsetWidth){s++;return}a.style.fontSize="";let n=parseFloat(getComputedStyle(a).fontSize)||21,i=14;for(let c=n;c>i;c-=1)if(a.style.fontSize=c+"px",a.scrollWidth<=a.clientWidth+1)return;a.style.fontSize=i+"px"}),F._n=s?(F._n||0)+1:0,s&&F._n<8&&!F._t&&(F._t=setTimeout(()=>{F._t=0,F(e||document)},130))}document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>F(document));var nt=[],rt=!1;function re(e){if(nt.push(e),rt)return;rt=!0;let s=()=>{let a=nt.shift();if(a)try{a()}catch{}nt.length?setTimeout(s,0):rt=!1};setTimeout(s,0)}function D(e){(!e||e.id!=="card-showcase")&&ne(e),typeof window.decorateVerified=="function"&&window.decorateVerified(e||document),(e||document).querySelectorAll(".pcard").forEach(n=>X(n,n.classList.contains("flipped"))),F(e);let s=[...(e||document).querySelectorAll("canvas[data-tank-name]")];if(!s.length)return;let a=n=>{if(n.dataset.mounted||n.dataset.parked)return;let i=n.dataset.tankName;n.dataset.parked="1",Bt(i,()=>{n.dataset.parked="",!(n.dataset.mounted||!n.isConnected)&&(n.dataset.mounted="1",re(()=>{if(!n.isConnected)return;let c=j(i);if(c&&window.TankRender){let r=window.TankRender.render(n,c,n.dataset.tankSize||"medium"),f=M=>{if(M===!1){delete n.dataset.mounted;return}n.isConnected&&(n.classList.add("tank-painted"),n.parentElement&&n.parentElement.classList.add("art-live"))};r&&r.then?r.then(f,()=>f(!1)):f()}}))})};if("IntersectionObserver"in window){let n=new IntersectionObserver(i=>{let c=i.filter(f=>f.isIntersecting).map(f=>f.target),r=()=>{c.splice(0,3).forEach(f=>{a(f),n.unobserve(f)}),c.length&&setTimeout(r,50)};r()},{rootMargin:"240px"});s.forEach(i=>n.observe(i))}else s.forEach(a);clearTimeout(D._heal),D._heal=setTimeout(()=>{(e||document).querySelectorAll("canvas[data-tank-name]").forEach(n=>{n.dataset.mounted&&n.classList.contains("tank-painted")||(delete n.dataset.mounted,delete n.dataset.parked,a(n))})},2500)}var bt="tt1v1_cardtiers";function ie(e){let s={};try{s=JSON.parse(localStorage.getItem(bt)||"{}")||{}}catch{s={}}let a=new Set;e.forEach(n=>{let i=dt(P(n.rating));s[n.name]!=null&&i>s[n.name]&&a.add(n.name),s[n.name]=i});try{localStorage.setItem(bt,JSON.stringify(s))}catch{}return a}function mt(e){let s=J(e);if(!s)return Promise.reject(new Error("no player"));let a=P(s.rating),n=800,i=1e3,c=document.createElement("canvas");c.width=n,c.height=i;let r=c.getContext("2d"),f=r.createLinearGradient(0,0,0,i);f.addColorStop(0,"#10151d"),f.addColorStop(1,"#0b0e14"),r.fillStyle=f,r.fillRect(0,0,n,i);let M=document.querySelector(`.pcard-wrap.tier-${a}`),T=M?getComputedStyle(M):null,I=T&&T.getPropertyValue("--tc1").trim()||"#8a6a3f",v=T&&T.getPropertyValue("--tc2").trim()||"#5c4526",x=T&&T.getPropertyValue("--tfg").trim()||"#f2d9ae";r.strokeStyle=I,r.lineWidth=14,r.strokeRect(22,22,n-44,i-44),r.globalAlpha=.16,r.fillStyle=v,r.fillRect(22,22,n-44,300),r.globalAlpha=1;let k=j(e),y=document.createElement("canvas");return(k&&window.TankRender?window.TankRender.render(y,k,"large"):Promise.resolve()).then(()=>{if(k&&window.TankRender){let R=660*(y.height/y.width||.6);r.drawImage(y,(n-660)/2,110,660,R)}else r.fillStyle=v,r.font="900 150px Archivo, sans-serif",r.textAlign="center",r.fillText(Et(e),n/2,300);return r.textAlign="center",r.fillStyle="#eef2f8",r.font="900 64px Archivo, sans-serif",r.fillText(e,n/2,560),r.fillStyle=x,r.font="700 30px Inter, sans-serif",r.fillText(B(a).toUpperCase()+(s.rank!=null?"  \xB7  #"+s.rank:""),n/2,610),r.fillStyle="#eef2f8",r.font='800 110px "JetBrains Mono", monospace',r.fillText(s.rating.toFixed(1),n/2,740),r.fillStyle="#98a4b8",r.font="600 30px Inter, sans-serif",r.fillText(`${s.winPct.toFixed(1)}%  \xB7  ${s.w}${H("W")}\u2013${s.l}${H("L")}\u2013${s.d}${H("D")}`,n/2,795),r.fillStyle="#5d6a80",r.font="500 22px Inter, sans-serif",r.fillText("tierstats.github.io \u2014 1v1 Leaderboard",n/2,935),c})}function oe(e,s){let a=location.origin+"/player/"+encodeURIComponent(e),n=()=>U(s,t("cards.linkCopied"));navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(a).then(n,()=>U(s,a)):U(s,a)}function ce(e,s,a){if(s==="link"){oe(e,a);return}mt(e).then(n=>{s==="copy"&&navigator.clipboard&&window.ClipboardItem?n.toBlob(i=>{navigator.clipboard.write([new ClipboardItem({"image/png":i})]).then(()=>U(a,t("cards.copied"))).catch(()=>yt(n,e,a))}):yt(n,e,a)}).catch(()=>U(a,t("cards.shareFail")))}function yt(e,s,a){let n=document.createElement("a");n.download=`1v1-card-${s}.png`,n.href=e.toDataURL("image/png"),n.click(),U(a,t("cards.copied"))}function U(e,s){if(!e)return;let a=String(s).replace(/\s*[✓✔]\s*$/,""),n=e.closest(".pcb-actions");if(n){if(n.classList.contains("is-flash"))return;let c=n.innerHTML;n.classList.add("is-flash"),n.innerHTML=`<div class="pcb-flash" role="status">${Vt}<span>${m(a)}</span></div>`,setTimeout(()=>{n.isConnected&&(n.classList.remove("is-flash"),n.innerHTML=c)},1600);return}let i=e.innerHTML;e.textContent=s,e.classList.add("ok"),setTimeout(()=>{e.innerHTML=i,e.classList.remove("ok")},1600)}function ct(){let e=document.getElementById("page-cards");if(!e)return;let s=(window.lbDataRev||0)+"|"+(window.getLang?window.getLang():"");if(e.dataset.deckSig===s&&e.querySelector("#deck-grid"))return;e.dataset.deckSig=s;let a=Z().slice().sort((o,d)=>(o.rank!=null?o.rank:9999)-(d.rank!=null?d.rank:9999)||o.name.localeCompare(d.name));if(!a.length){e.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("cards.deckEmpty")}</div></div></div>`;return}let n={};z.forEach(o=>{n[o]=0}),a.forEach(o=>{n[P(o.rating)]+=1});let i=ie(a),c=a[0]?a[0].name:"";e.innerHTML=`
  <div class="wrap">
    <section class="hero deck-hero anim">
      <div class="kicker" data-i18n="cards.kicker">${t("cards.kicker")}</div>
      <h1 data-i18n-html="cards.h1">${t("cards.h1")}</h1>
      <p class="sub" data-i18n="cards.sub">${t("cards.sub")}</p>
      <div class="hero-row deck-meta">
        <i class="hm-rule" aria-hidden="true"></i>
        <span class="hm">${tp("cards.count",a.length).replace(/^(\d+)/,"<b>$1</b>")}</span>
        <i class="hm-sep" aria-hidden="true"></i>
        <span class="hm">${t("cards.metaTiers",{n:z.length})}</span>
        <i class="hm-sep" aria-hidden="true"></i>
        <span class="hm">${t("cards.metaTop",{name:m(c)})}</span>
      </div>
    </section>

    <section class="deck-shell anim">
      <div class="deck-set" id="deck-set">
        <div class="deck-set-head">
          <span class="deck-set-k">${t("cards.dist")}</span>
          <span class="deck-set-hint">${t("cards.distTip")}</span>
        </div>
        <div class="deck-dist" aria-hidden="true">
          ${z.slice().reverse().map(o=>`<i class="tier-${o}" style="flex-grow:${n[o]}"></i>`).join("")}
        </div>
        <div class="deck-tiers" role="group" aria-label="${m(t("cards.dist"))}">
          <button type="button" class="deck-tier is-all on" data-tier-filter="all" aria-pressed="true">
            <span class="dt-name">${t("cards.allTiers")}</span><b class="mono">${a.length}</b>
          </button>
          ${z.slice().reverse().map(o=>`
            <button type="button" class="deck-tier tier-${o}" data-tier-filter="${o}" aria-pressed="false"${n[o]?"":" disabled"}>
              <span class="dt-crest">${W(o)}</span>
              <span class="dt-name">${B(o)}</span>
              <b class="mono">${n[o]}</b>
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
        <span class="deck-count mono" id="deck-count">${tp("cards.count",a.length)}</span>
      </div>

      <div class="deck-cards" id="deck-grid"></div>
    </section>
  </div>`;let r=document.getElementById("deck-grid"),f=document.getElementById("deck-search"),M=document.getElementById("deck-clear"),T=document.getElementById("deck-count"),I=document.getElementById("deck-set"),v="all",x="",k="rank",y={rank:(o,d)=>(o.rank!=null?o.rank:9999)-(d.rank!=null?d.rank:9999)||o.name.localeCompare(d.name),rating:(o,d)=>d.rating-o.rating||(o.rank!=null?o.rank:9999)-(d.rank!=null?d.rank:9999),name:(o,d)=>o.name.localeCompare(d.name)},E=()=>e.querySelectorAll(".deck-tier").forEach(o=>{let d=o.dataset.tierFilter===v;o.classList.toggle("on",d),o.setAttribute("aria-pressed",String(d))}),S=()=>e.querySelectorAll(".deck-sort-btn").forEach(o=>{let d=o.dataset.sort===k;o.classList.toggle("on",d),o.setAttribute("aria-pressed",String(d))});function R(){v="all",k="rank",x="",f.value="",M.hidden=!0,E(),S(),h()}function h(){let o=a.filter(p=>(v==="all"||P(p.rating)===v)&&(!x||p.name.toLowerCase().includes(x))).sort(y[k]);if(T.textContent=tp("cards.count",o.length),e.querySelectorAll(".deck-dist i").forEach(p=>{p.classList.toggle("on",v!=="all"&&p.classList.contains("tier-"+v))}),I.classList.toggle("filtered",v!=="all"),!o.length){r.innerHTML=`<div class="deck-empty">
        <span class="deck-empty-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3.5" y="5.5" width="12" height="16" rx="2"/><path d="M8 3.5h10a2 2 0 0 1 2 2V18"/><path d="M8 11h4M8 15h4"/></svg></span>
        <p>${m(t("cards.deckEmpty"))}</p>
        <button type="button" class="deck-reset" data-deck-reset>${m(t("cards.clearFilters"))}</button>
      </div>`;let p=r.querySelector("[data-deck-reset]");p&&p.addEventListener("click",R),D(r),typeof observeReveals=="function"&&observeReveals();return}let d=r.__paintGen=(r.__paintGen||0)+1;r.innerHTML="";let w=10,L=10,l=0,u=()=>{if(r.__paintGen!==d||!r.isConnected)return;let p=l===0?w:L,$=o.slice(l,l+p);if(r.insertAdjacentHTML("beforeend",$.map(g=>ft(g)).join("")),i.size&&$.forEach(g=>{let b=r.querySelector(`.pcard-wrap[data-name="${CSS.escape(g.name)}"]`);b&&i.has(g.name)&&b.classList.add("tier-up")}),l+=p,l<o.length){requestAnimationFrame(u);return}D(r),typeof observeReveals=="function"&&observeReveals()};u()}h(),f.addEventListener("input",()=>{x=f.value.trim().toLowerCase(),M.hidden=!f.value,h()}),M.addEventListener("click",()=>{f.value="",x="",M.hidden=!0,f.focus(),h()}),e.querySelectorAll("[data-tier-filter]").forEach(o=>{o.addEventListener("click",()=>{o.disabled||(v=o.dataset.tierFilter,E(),h())})}),e.querySelectorAll("[data-sort]").forEach(o=>{o.addEventListener("click",()=>{k=o.dataset.sort,S(),h()})}),D(e),typeof observeReveals=="function"&&observeReveals()}function le(e){let s=J(e);return s?`<div class="pv-card-slot tier-${P(s.rating)}">${ft(s,{hero:!0})}</div>`:""}function de(e){let s=J(e);if(!s)return"";let a=P(s.rating);return`<span class="tier-chip tier-${a}" title="${B(a)}" aria-label="${B(a)}">${W(a)}</span>`}document.addEventListener("click",e=>{let s=e.target.closest("[data-guide-close]");if(s){try{localStorage.setItem("tt1v1_guide_"+s.dataset.guideClose+"_v1","1")}catch{}let i=s.closest(".page-guide");i&&i.remove();return}let a=e.target.closest(".pc-share");if(a){e.stopPropagation(),ce(a.dataset.name,a.dataset.share,a);return}let n=e.target.closest(".pcard");n&&!e.target.closest("a[href]")&&(n.classList.toggle("flipped"),X(n,n.classList.contains("flipped")))});document.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;let s=document.activeElement&&document.activeElement.classList&&document.activeElement.classList.contains("pcard")?document.activeElement:null;s&&(e.preventDefault(),s.classList.toggle("flipped"),X(s,s.classList.contains("flipped")))});function pe(){if(window.__lbTipInit)return;window.__lbTipInit=!0;let e=document.createElement("div");e.className="lb-tip lb-tip-hide",e.setAttribute("aria-hidden","true"),e.innerHTML=`
    <div class="lbt-head">
      <span class="lbt-tier"><span class="lbt-crest"></span><span class="lbt-tier-name"></span></span>
      <span class="lbt-rank mono"></span>
    </div>
    <div class="lbt-stage"><span class="lbt-notank" aria-hidden="true"></span><canvas></canvas></div>
    <div class="lbt-name"></div>
    <div class="lbt-line"><span class="lbt-rating mono"></span><span class="lbt-delta"></span></div>
    <div class="lbt-rec mono"></div>
    <div class="lbt-meta mono"></div>
    <div class="lbt-foot"><span class="lbt-form"></span><span class="lbt-open">${m(t("cards.openProfile"))} <i aria-hidden="true">\u2192</i></span></div>`,document.body.appendChild(e);let s=e.querySelector("canvas"),a=e.querySelector(".lbt-notank"),n=e.querySelector(".lbt-name"),i=e.querySelector(".lbt-crest"),c=e.querySelector(".lbt-tier-name"),r=e.querySelector(".lbt-rank"),f=e.querySelector(".lbt-rating"),M=e.querySelector(".lbt-delta"),T=e.querySelector(".lbt-rec"),I=e.querySelector(".lbt-meta"),v=e.querySelector(".lbt-form"),x=650,k=null,y=null,E=null,S=null,R=0,h=Promise.resolve(),o=l=>{let u=l.getBoundingClientRect(),p=e.offsetWidth||236,$=e.offsetHeight||224,g=Math.max(12,Math.min(window.innerWidth-p-12,u.left+42)),b=document.querySelector("#full-rankings .lb-bar"),A=Math.max(8,b?b.getBoundingClientRect().bottom+8:8),q=u.top-$+4;if(q<A){let C=u.bottom-4;q=C+$<=window.innerHeight-8?C:Math.max(A,window.innerHeight-$-8)}e.style.left=g+"px",e.style.top=Math.round(q)+"px"};document.addEventListener("mouseover",l=>{let u=l.target.closest&&l.target.closest(".lb-row");if(!(!u||!u.dataset.name)){if(clearTimeout(k),u===E){S&&(cancelAnimationFrame(R),R=requestAnimationFrame(()=>o(u)));return}E=u,S=null,clearTimeout(y),e.classList.add("lb-tip-hide"),y=setTimeout(()=>{if(y=null,E!==u)return;S=u.dataset.name;let p=J(S),$=p?P(p.rating):"";if(p){n.textContent=S,i.className="lbt-crest"+($?" tier-"+$:""),i.innerHTML=$?W($):"",c.textContent=$?B($):"";let b=(u.querySelector(".rank-badge .num")||{}).textContent||"";r.textContent=b?"#"+String(b).trim():"",f.textContent=p.provisional?`${Math.round(p.rating-100)}\u2013${Math.round(p.rating+100)}`:p.rating.toFixed(1),f.classList.toggle("prov",!!p.provisional),M.innerHTML=xt(p)||"",T.innerHTML=`<b class="w">${p.w}${H("W")}</b> <b class="l">${p.l}${H("L")}</b> <b class="d">${p.d}${H("D")}</b> <span>\xB7 ${p.winPct}%</span>`,a.innerHTML=$?W($):"",I.textContent=tp("cmp.meta",p.matches,{rd:p.rd.toFixed(1)});let A=pt(S).slice(0,5).reverse();v.innerHTML=A.length?`<span class="form">${A.map(q=>`<i class="${q.res.toLowerCase()}">${m(H(q.res))}</i>`).join("")}</span>`:""}e.className="lb-tip lb-tip-hide"+($?" tier-"+$:"");let g=()=>{E===u&&(e.style.transition="none",o(u),e.offsetWidth,e.style.transition="",e.classList.remove("lb-tip-hide"))};Bt(S,()=>{if(E!==u)return;let b=j(S);b&&window.TankRender?(s.style.display="block",a.style.display="none",h=h.catch(()=>{}).then(()=>window.TankRender.render(s,b,"medium")),h.then(g,g)):(s.style.display="none",a.style.display="grid",g())})},x)}});let d=()=>{e.matches(":hover")||(clearTimeout(y),y=null,E=null,e.classList.add("lb-tip-hide"),S=null)},w=l=>{clearTimeout(k),k=setTimeout(d,l)},L=()=>{clearTimeout(k),k=null,clearTimeout(y),y=null,E=null,S=null,e.classList.add("lb-tip-hide")};window.lbHideRowTip=L,document.addEventListener("mouseout",l=>{if(!(l.target.closest&&l.target.closest(".lb-row")))return;let p=l.relatedTarget;p&&p.closest&&p.closest(".lb-tip")||w(140)}),e.addEventListener("mouseenter",()=>clearTimeout(k)),e.addEventListener("mouseleave",()=>w(160)),e.addEventListener("click",()=>{if(!S)return;let l=S;L(),location.hash="#/player/"+encodeURIComponent(l)}),window.addEventListener("scroll",d,{passive:!0})}pe();function ue(e){let s=document.getElementById("deck-grid");if(!s)return;let a=[...s.querySelectorAll(".pcard-wrap")],n=a.find(c=>c.dataset.name===e);if(!n){let c=String(e||"").toLowerCase();n=a.find(r=>(r.dataset.name||"").toLowerCase()===c)}if(!n)return;n.scrollIntoView({behavior:"smooth",block:"center"});let i=n.querySelector(".pcard");i&&(i.classList.add("flipped"),X(i,!0))}function Pt(){let e=String(window.lbCardReturnHash||"");return/^#\/[a-z]/i.test(e)&&!e.startsWith("#/card/")?e:"#/cards"}var fe=[[4,18,3,6.8,-.2],[96,14,2,7.4,.9],[2,48,2,5.6,1.6],[98,56,3,6.2,.3],[6,76,3,7.1,1.1],[94,84,2,5.9,.6],[12,96,2,6.5,1.9],[88,4,2,7.8,.1],[26,100,2,5.4,1.3],[73,1,3,6.9,.8],[0,33,2,6.1,2.1],[100,70,2,7.3,1.5],[17,6,2,5.8,.5],[82,97,3,6.6,1.8],[10,62,2,7.7,1],[90,38,2,5.5,2.3]];function he(e){let s=e.name,a=P(e.rating),n=dt(a),i=Z().length,c=String(e.rank!=null?e.rank:i).padStart(2,"0"),r=e.rank===1,f=e.provisional?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:e.rating.toFixed(1),M=m(Pt()),T=n>=4?n===4?8:n===5?12:16:0,I=T?fe.slice(0,T).map(([v,x,k,y,E])=>`<i class="cs-spark" style="--x:${v}%;--y:${x}%;--s:${k}px;--d:${y}s;--dl:${E}s"></i>`).join(""):"";return`
  <div class="cs tier-${a}${r?" is-champion":""}" id="card-showcase" role="dialog"
       aria-modal="true" aria-labelledby="cs-title" tabindex="-1">
    <div class="cs-scene" aria-hidden="true">
      <span class="cs-ghost">${m(B(a))}</span>
      <span class="cs-rays cs-rays-a"></span>
      <span class="cs-rays cs-rays-b"></span>
      <span class="cs-aurora cs-aurora-a"></span>
      <span class="cs-aurora cs-aurora-b"></span>
    </div>
    <header class="cs-bar">
      <a class="cs-back" href="#/cards">${Qt}<span>${t("cards.showcaseBack")}</span></a>
      <span class="cs-crumb">${t("cards.showcase")}</span>
      <a class="cs-close" href="${M}" aria-label="${m(t("cards.showcaseClose"))}" title="${m(t("cards.showcaseClose"))}">${Jt}<kbd aria-hidden="true">ESC</kbd></a>
    </header>
    <div class="cs-stage">
      <div class="cs-id">
        <div class="cs-kicker">
          <span class="cs-crest">${W(a)}</span>
          <span class="cs-tier">${B(a)}</span>
          ${r?`<em class="cs-champ">
            <span class="cs-champ-crest">${Rt}</span>
            <span class="cs-champ-txt">${t("cards.champion")}</span>
            <span class="cs-champ-no">#${c}</span>
          </em>`:""}
        </div>
        <h1 class="cs-title" id="cs-title">${m(s)}</h1>
        <span class="cs-rule" aria-hidden="true"></span>
        <div class="cs-facts">
          <div class="cs-fact"><span>${t("th.rating")}</span><b class="mono${e.provisional?" prov":""}">${f}</b></div>
          <div class="cs-fact"><span>${t("th.winPct")}</span><b class="mono">${e.winPct.toFixed(1)}<small>%</small></b></div>
          <div class="cs-fact"><span>${t("pl.record")}</span><b class="mono">${e.w}\u2013${e.l}\u2013${e.d}</b></div>
        </div>
      </div>
      <div class="cs-figure" data-cs-figure>
        <span class="cs-figure-halo" aria-hidden="true"></span>
        <span class="cs-sparks" aria-hidden="true">${I}</span>
        <div class="cs-tilt">
          <div class="cs-float">
            <div class="cs-card">
              ${ft(e,{size:"medium",showcase:!0})}
            </div>
          </div>
        </div>
        <span class="cs-plinth" aria-hidden="true"></span>
        <span class="cs-side cs-side-l" aria-hidden="true">TIERSTATS \xB7 1V1</span>
        <span class="cs-side cs-side-r" aria-hidden="true">THE DECK</span>
      </div>
      <div class="cs-actions">
        <a class="cs-btn cs-btn-primary" href="#/player/${encodeURIComponent(s)}">${t("cards.openProfile")}${_t}</a>
        <button type="button" class="cs-btn" data-cs-flip aria-pressed="false">${ut}<span data-cs-flip-label>${t("cards.statSheet")}</span></button>
        <button type="button" class="cs-btn cs-iconbtn" data-cs-link title="${m(t("cards.shareLink"))}" aria-label="${m(t("cards.shareLink"))}">${It}</button>
        <button type="button" class="cs-btn cs-iconbtn" data-cs-save title="${m(t("cards.shareDl"))}" aria-label="${m(t("cards.shareDl"))}">${At}</button>
        <p class="cs-hint" aria-live="polite">${t("cards.showcaseHint")}</p>
      </div>
    </div>
    <footer class="cs-foot">
      <span>${m(B(a).toUpperCase())} \xB7 ${t("cards.showcase")}</span>
      <span class="mono">${c} <i>/</i> ${String(i).padStart(2,"0")}</span>
    </footer>
  </div>`}function it(e){let s=e&&e.querySelector?e.querySelector(".cs-title"):null;if(!s||!s.offsetWidth)return;s.style.fontSize="";let a=parseFloat(getComputedStyle(s).fontSize)||68;for(let n=a;n>27;n-=2)if(s.style.fontSize=n+"px",s.scrollWidth<=s.clientWidth+1)return;s.style.fontSize="27px"}function Ft(e){if(e){if((e.__csBg||[]).forEach(s=>{try{s.inert=!1}catch{}}),e.__csBg=null,e.__csRO){try{e.__csRO.disconnect()}catch{}e.__csRO=null}e.__csKey&&(document.removeEventListener("keydown",e.__csKey,!0),e.__csKey=null),document.documentElement.classList.remove("cs-lock")}}var lt=0;function Ot(){let e=document.getElementById("card-showcase");if(!e)return;if(Ft(e),clearTimeout(lt),!!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)){e.remove();return}e.classList.add("cs-out"),lt=setTimeout(()=>{e.isConnected&&e.remove()},260)}function me(e){let s=String(e||"").toLowerCase(),a=Z().find(l=>l.name===e)||Z().find(l=>l.name.toLowerCase()===s);if(!a)return Ot(),!1;clearTimeout(lt);let n=document.getElementById("card-showcase");n&&(Ft(n),n.remove());let i=document.createElement("div");i.innerHTML=he(a).trim();let c=i.firstElementChild;document.body.appendChild(c),document.documentElement.classList.add("cs-lock");let r=[];[...document.body.children].forEach(l=>{if(!(l===c||l.tagName==="SCRIPT"||l.tagName==="STYLE"||l.tagName==="LINK")&&!l.inert)try{l.inert=!0,r.push(l)}catch{}}),c.__csBg=r,D(c),it(c),document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>{c.isConnected&&it(c)}),window.ResizeObserver&&(c.__csRO=new ResizeObserver(()=>it(c)),c.__csRO.observe(c.querySelector(".cs-id")));let f=c.querySelector(".pcard"),M=c.querySelector("[data-cs-flip]"),T=c.querySelector("[data-cs-flip-label]"),I=c.querySelector(".cs-hint"),v=0,x=!!(window.matchMedia&&matchMedia("(pointer: coarse)").matches),k=t(x||window.innerWidth<=760?"cards.showcaseHintTouch":"cards.showcaseHint");I.textContent=k;let y=(l,u)=>{clearTimeout(v),I.textContent=l,I.classList.toggle("is-ok",u==="ok"),I.classList.toggle("is-err",u==="err"),I.classList.toggle("is-url",u==="url"),v=setTimeout(()=>{c.isConnected&&(I.textContent=k,I.classList.remove("is-ok","is-err","is-url"))},u==="url"?9e3:2400)},E=()=>{let l=!!(f&&f.classList.contains("flipped"));M&&M.setAttribute("aria-pressed",String(l)),T&&(T.textContent=l?t("cards.flipBack"):t("cards.statSheet"))},S=()=>{if(!f)return;let l=!f.classList.contains("flipped");f.classList.toggle("flipped",l),X(f,l),E()};c.addEventListener("click",l=>{if(l.target.closest("[data-cs-flip]")){l.preventDefault(),S();return}if(l.target.closest("[data-cs-link]")){l.preventDefault();let g=location.origin+"/card/"+encodeURIComponent(a.name),b=()=>y(t("cards.linkCopied"),"ok");navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(g).then(b,()=>y(g,"url")):y(g,"url");return}let $=l.target.closest("[data-cs-save]");if($){l.preventDefault(),$.disabled=!0,mt(a.name).then(g=>{let b=document.createElement("a");b.download=`1v1-card-${a.name}.png`,b.href=g.toDataURL("image/png"),b.click(),y(t("cards.copied"),"ok")}).catch(()=>y(t("cards.shareFail"),"err")).finally(()=>{$.isConnected&&($.disabled=!1)});return}l.target.closest(".pcard")&&requestAnimationFrame(E)});let R=l=>{if(l.key==="Escape"){l.preventDefault(),l.stopPropagation(),location.hash=Pt();return}if(l.key!=="Tab")return;let u=[...c.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(b=>!b.closest("[inert]")&&b.getClientRects().length);if(!u.length)return;let p=u[0],$=u[u.length-1],g=document.activeElement;l.shiftKey&&(g===p||!c.contains(g))?(l.preventDefault(),$.focus()):!l.shiftKey&&(g===$||!c.contains(g))&&(l.preventDefault(),p.focus())};c.__csKey=R,document.addEventListener("keydown",R,!0);let h=c.querySelector("[data-cs-figure]"),o=c.querySelector(".cs-tilt"),d=window.matchMedia&&matchMedia("(pointer: fine)").matches,w=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;if(h&&o&&d&&!w){let l=0,u=0,p=0,$=()=>{if(l=0,!h.isConnected)return;let g=h.getBoundingClientRect();if(!g.width||!g.height)return;let b=Math.max(-.5,Math.min(.5,(u-g.left)/g.width-.5)),A=Math.max(-.5,Math.min(.5,(p-g.top)/g.height-.5));o.style.transform=`perspective(1600px) rotateX(${(-A*5).toFixed(2)}deg) rotateY(${(b*7).toFixed(2)}deg)`};h.addEventListener("pointermove",g=>{u=g.clientX,p=g.clientY,l||(l=requestAnimationFrame($))}),h.addEventListener("pointerleave",()=>{l&&(cancelAnimationFrame(l),l=0),o.style.transform=""})}let L=c.querySelector(".cs-close");return requestAnimationFrame(()=>{try{L.focus({preventScroll:!0})}catch{c.focus()}}),!0}var at=!1,St=new Set;function ve(e){if(!window.TankRender||!e)return;let s=String(e).toLowerCase(),a=J(e)||Z().find(i=>i.name.toLowerCase()===s);if(!a||St.has(a.name))return;let n=j(a.name);if(n){St.add(a.name);try{let i=document.createElement("canvas"),c=window.TankRender.render(i,n,"medium");c&&c.catch&&c.catch(()=>{})}catch{}}}function Nt(e){let s=document.getElementById("page-cards");if(!s||s.querySelector("#deck-grid")||s.classList.contains("active"))return;if(e){at=!1,ct();return}if(at||(navigator.connection||{}).saveData||navigator.hardwareConcurrency&&navigator.hardwareConcurrency<4||navigator.deviceMemory&&navigator.deviceMemory<4)return;at=!0;let n=()=>{if(at=!1,document.visibilityState!=="visible")return;let i=document.getElementById("page-cards");!i||i.querySelector("#deck-grid")||i.classList.contains("active")||ct()};window.requestIdleCallback?window.requestIdleCallback(n,{timeout:4500}):setTimeout(n,2200)}function $e(){let e=document.getElementById("page-cards");!e||!e.classList.contains("active")||!e.querySelector("#deck-grid")||(D(e),typeof observeReveals=="function"&&observeReveals())}var ge=e=>e&&e.closest?e.closest('a[href="#/cards"], a[href^="#/card/"]'):null;function vt(e){let s=ge(e.target);if(!s)return;Nt(!0);let a=s.getAttribute("href")||"";if(a.startsWith("#/card/"))try{ve(decodeURIComponent(a.slice(7)))}catch{}}document.addEventListener("pointerover",vt,{passive:!0});document.addEventListener("focusin",vt);document.addEventListener("pointerdown",vt,{passive:!0});window.renderCards=ct;window.cardsShowcase=me;window.cardsShowcaseClose=Ot;window.cardsPreload=Nt;window.cardsReveal=$e;function Q(){let e=document.querySelectorAll(".pcard-wrap.card-hero");e.length&&e.forEach(s=>{let a=s.querySelector(".pcard"),n=s.querySelector(".pcard-back-scroll");if(!a||!n)return;a.style.minHeight="";let i=n.scrollHeight-n.clientHeight;i>0&&(a.style.minHeight=Math.ceil(a.getBoundingClientRect().height+i)+"px")})}window.fitHeroCards=Q;var ot=!1;function Dt(){ot||(ot=!0,setTimeout(()=>{ot=!1,Q(),setTimeout(Q,250)},0))}new MutationObserver(Dt).observe(document.documentElement,{childList:!0,subtree:!0});var Lt;window.addEventListener("resize",()=>{clearTimeout(Lt),Lt=setTimeout(Q,150)});document.fonts&&document.fonts.ready&&document.fonts.ready.then(Q);Dt();window.cardsFocus=ue;window.cardsHeroHTML=le;window.lbTankFor=j;window.lbTankFresh=ht;window.cardsRowChip=de;window.cardsMountAll=D;window.fitCardNames=F;window.cardsSharePNG=mt;window.cardsGuideHTML=Ut;window.cardsTiers={TIER_KEYS:z,TIER_MIN:Mt,tierMin:Ct,tierOf:P,tierIdx:dt,tierLabel:B,crestSVG:W};})();
