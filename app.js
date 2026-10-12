/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var N=window.LB_DATA,pt="https://tierstats-publish.tierstats.workers.dev/publish",u=(e,s=document)=>s.querySelector(e),j=(e,s=document)=>[...s.querySelectorAll(e)],b=e=>String(e).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),D=e=>encodeURIComponent(String(e)),qt=e=>decodeURIComponent(e);function yt(e,s,a={}){let n=a.dur||1200,r=a.dec||0,v=performance.now(),m=parseFloat(e.textContent)||0;function c(o){let l=Math.min(1,(o-v)/n),d=1-Math.pow(1-l,3);e.textContent=(m+(s-m)*d).toFixed(r),l<1&&requestAnimationFrame(c)}requestAnimationFrame(c),setTimeout(()=>{e.textContent=s.toFixed(r)},n+300)}var de='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',pe='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function $t(e,s=""){let a=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",n=e<=3?e===1?de:pe:"";return`<div class="rank-badge ${a} ${s}" title="${t("home.rankTip",{n:e})}">${n}<span class="num">${e}</span></div>`}var q=e=>t(e==="W"?"rec.wLetter":e==="L"?"rec.lLetter":"rec.dLetter"),F={},I=[],H={players:[],byName:{},qualified:[]},ot={},ut={},tt={},At=new Set,It={prevRatings:{},prevRanks:{}};function ve(){try{localStorage.removeItem("tt1v1_baseline")}catch{}It={prevRatings:{...N.prevRatings||{}},prevRanks:{...N.prevRanks||{}}}}function fe(){for(let a in ot)delete ot[a];let e=new Set(P().aliasRemoved||[]);Object.entries(N.aliases).forEach(([a,n])=>{e.has(a)||(ot[a.toLowerCase()]=n)}),Object.entries(P().aliases||{}).forEach(([a,n])=>{ot[String(a).toLowerCase()]=n});for(let a of Object.keys(ut))delete ut[a];for(let a of Object.keys(tt))delete tt[a];At.clear();let s=(a,n)=>{Object.keys(a||{}).forEach(r=>{let v=O(r);v!==r&&(n[v]=a[r])}),Object.keys(a||{}).forEach(r=>{let v=O(r);v===r&&(n[v]=a[r])})};s(N.seeds,ut),s(It.prevRatings,tt),(N.inactiveList||[]).forEach(a=>At.add(O(a)))}var Rt={},Dt=e=>String(e).toLowerCase().replace(/[^a-z0-9]/g,"").replace(/0/g,"o").replace(/1/g,"i").replace(/3/g,"e").replace(/5/g,"s");function ue(e,s){if(Math.abs(e.length-s.length)>3)return 99;let a=Array.from({length:s.length+1},(n,r)=>r);for(let n=1;n<=e.length;n++){let r=[n];for(let v=1;v<=s.length;v++)r[v]=Math.min(a[v]+1,r[v-1]+1,a[v-1]+(e[n-1]===s[v-1]?0:1));if(a=r,Math.min(...a)>3)return 99}return a[s.length]}function me(){let e={},s=new Set(P().aliasRemoved||[]),a=r=>{let v=String(r).trim(),m=O(v);!v||Dt(v)===Dt(m)||ue(v.toLowerCase(),m.toLowerCase())<=2||(e[m]=e[m]||[]).push(v)};Object.keys(N.aliases).forEach(r=>{s.has(r)||a(r)}),Object.keys(P().aliases||{}).forEach(a);for(let r of Object.keys(e)){let v=new Set([r.toLowerCase()]);e[r]=e[r].filter(m=>{let c=m.toLowerCase();return v.has(c)?!1:(v.add(c),!0)}).sort((m,c)=>m.localeCompare(c))}let n=N.cards&&N.cards.alts||{};Object.keys(n).forEach(r=>{let v=O(r),m=n[r];e[v]=(Array.isArray(m)?m:String(m||"").split(/[,;]/)).map(c=>String(c).trim()).filter(Boolean)}),Rt=e}function Yt(e){return Rt[e]||Rt[O(e)]||[]}function he(e){let s=Yt(e);if(!s.length)return"";let a=s.slice(0,2).join(", ")+(s.length>2?` +${s.length-2}`:"");return`<div class="p-alt" title="${b(s.join(", "))}">${t("lb.aka",{names:b(a)})}</div>`}var O=e=>{let s=String(e).trim(),a=new Set;for(;;){let n=ot[s.toLowerCase()];if(!n||n===s||a.has(s))return s;a.add(s),s=n}};function kt(e){let s=[];return B().forEach(a=>{let n=(r,v,m)=>({opp:r,for_:v,against:m,res:v>m?"W":v<m?"L":"D",date:a.date});a.a===e?s.push(n(a.b,a.sa,a.sb)):a.b===e&&s.push(n(a.a,a.sb,a.sa))}),s}function zt(e){let s={};return kt(e).forEach(a=>{let n=s[a.opp]||(s[a.opp]={w:0,l:0,d:0,pf:0,pa:0});n[a.res.toLowerCase()]+=1,n.pf+=a.for_,n.pa+=a.against}),Object.entries(s).map(([a,n])=>({opp:a,...n})).sort((a,n)=>n.w+n.l+n.d-(a.w+a.l+a.d)||n.w-a.w)}function ge(e){let s=F[e]||{};return s.provisional?`<span class="tag prov">${t("tag.provisional")}</span>`:s.inactive?`<span class="tag inact">${t("tag.inactive")}</span>`:""}function be(e){let s=kt(e).slice(0,5).reverse();if(!s.length)return"";let a=s.map(n=>q(n.res)).join(" ");return`<span class="form" title="${t("form.title",{n:s.length,seq:a})}">${s.map(n=>`<i class="${n.res.toLowerCase()}">${q(n.res)}</i>`).join("")}</span>`}function Vt(){let e=typeof getLang=="function"?getLang():"en";return{en:"en-US",zh:"zh-CN",ja:"ja-JP",ru:"ru-RU"}[e]||"en-US"}function Qt(e){let s=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||"").slice(0,10));return s?new Date(+s[1],+s[2]-1,+s[3]):null}function X(e){let s=Qt(e);if(!s)return"";let a=s.getFullYear()===new Date().getFullYear();try{return new Intl.DateTimeFormat(Vt(),a?{month:"short",day:"numeric"}:{year:"numeric",month:"short",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Kt(e){let s=Qt(e);if(!s)return"";try{return new Intl.DateTimeFormat(Vt(),{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Lt(e){let s=e.delta!=null?e.delta:0;if(Math.abs(s)<.05)return"";let a=s>0,n=Math.abs(s).toFixed(1);return`<span class="delta ${a?"up":"down"}" title="${a?t("delta.upTitle",{n}):t("delta.downTitle",{n})}">${a?"\u25B2":"\u25BC"} ${n}</span>`}function we(){let e=It.prevRanks||{},s=Object.keys(e);if(s.length){let r={};return s.forEach(v=>{r[O(v)]=e[v]}),r}let a={};I.forEach(r=>{tt[r.name]!=null&&(a[r.name]=tt[r.name])});let n={};return Object.entries(a).sort((r,v)=>v[1]-r[1]).forEach(([r],v)=>{n[r]=v+1}),n}function ye(e,s){let a=s[e.name]!=null?s[e.name]:s[O(e.name)];if(a==null){let r=(N.newSince||{})[e.name];return!r||(Date.now()-Date.parse(r))/864e5>5?"":`<span class="mv new" title="${t("mv.newTitle")}">${t("mv.new")}</span>`}let n=a-e.rank;return n>0?`<span class="mv up" title="${tp("mv.up",n)}">\u25B2${n}</span>`:n<0?`<span class="mv down" title="${tp("mv.down",-n)}">\u25BC${-n}</span>`:""}function dt(e){return`${Math.round(e.rating-100)} \u2013 ${Math.round(e.rating+100)}`}function bt(e,s){if(!e.provisional)return e.rating.toFixed(1);let a=s?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:dt(e);return`<span class="prov-range" title="${t("rating.provTitle")}">${a}</span>`}var Zt="tt1v1_admin_log_v1",et="tt1v1_admin_ok",Z="tt1v1_admin_pw",$e=()=>sessionStorage.getItem(et)==="1"||localStorage.getItem(et)==="1",rt=()=>sessionStorage.getItem(Z)||localStorage.getItem(Z)||"";function ke(e,s){s?(localStorage.setItem(et,"1"),localStorage.setItem(Z,e)):(sessionStorage.setItem(et,"1"),sessionStorage.setItem(Z,e),localStorage.removeItem(et),localStorage.removeItem(Z))}function Le(){[sessionStorage,localStorage].forEach(e=>{e.removeItem(et),e.removeItem(Z)})}var Ht=null,Ct=!1;function Xt(){Ct||!rt()||(clearTimeout(Ht),Ht=setTimeout(()=>publishLog({silent:!0}),1500))}var Se=pt.replace(/\/publish$/,"/verify"),xe=pt.replace(/\/publish$/,"/sync");function te(){try{return JSON.parse(localStorage.getItem(Zt)||"[]")}catch{return[]}}function Me(e){try{localStorage.setItem(Zt,JSON.stringify(e))}catch{}Xt()}var ee="tt1v1_admin_over_v1";function G(){try{return JSON.parse(localStorage.getItem(ee)||"{}")||{}}catch{return{}}}function W(e){try{localStorage.setItem(ee,JSON.stringify(e))}catch{}Xt()}function P(){let e=window.LB_PUB||{},s=G(),a=new Set([...e.aliasRemoved||[],...s.aliasRemoved||[]]),n=new Set([...e.seedRemoved||[],...s.seedRemoved||[]]),r=s.aliases||{},v={...s.seeds||{},...s.seedGlicko||{},...s.seedRd||{}},m=g=>Object.fromEntries(Object.entries(g||{}).filter(([y])=>!a.has(y)||r[y]!=null)),c=g=>Object.fromEntries(Object.entries(g||{}).filter(([y])=>!n.has(y)||v[y]!=null)),o=m({...e.aliases||{},...s.aliases||{}}),l=m({...e.aliasNotes||{},...s.aliasNotes||{}}),d=c({...e.seeds||{},...s.seeds||{}}),p=c({...e.seedGlicko||{},...s.seedGlicko||{}}),f=c({...e.seedRd||{},...s.seedRd||{}});return{aliases:o,aliasNotes:l,seeds:d,seedGlicko:p,seedRd:f,aliasRemoved:[...a].filter(g=>o[g]==null),seedRemoved:[...n].filter(g=>d[g]==null&&p[g]==null&&f[g]==null),settings:{...e.settings||{},...s.settings||{}},matchEdits:{...e.matchEdits||{},...s.matchEdits||{}},inactive:s.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...s.matchRemoved||[]])],faq:s.faq!=null?s.faq:e.faq!=null?e.faq:null}}function Ee(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function B(){let e=P(),s=e.matchEdits||{},a=new Set(e.matchRemoved||[]),n=(p,f)=>{if(a.has(f))return null;let g=s[f],y=g?{...p,sa:g.sa,sb:g.sb,date:g.date!=null?g.date:p.date}:p;return{...y,a:O(y.a),b:O(y.b),sa:+y.sa,sb:+y.sb,key:f}},r=te().map((p,f)=>n({...p,admin:!0,published:!1},"l:"+f)).filter(Boolean),v=Ee().map((p,f)=>n({...p,admin:!0,published:!0},"p:"+f)).filter(Boolean),m=N.matches.map((p,f)=>n({...p,admin:!1,published:!1},"a:"+f)).filter(Boolean).reverse(),c=p=>{let f=p.a>p.b;return[f?p.b:p.a,f?p.a:p.b,f?p.sb:p.sa,f?p.sa:p.sb,p.date||""].join("|")},o={};m.forEach(p=>{let f=c(p);o[f]=(o[f]||0)+1});let l={};return r.concat(v).filter(p=>{let f=c(p);return l[f]=(l[f]||0)+1,l[f]>(o[f]||0)}).concat(m)}var x={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},mt=864e5,lt=Math.log(10)/400,se=e=>1/Math.sqrt(1+3*lt*lt*e*e/(Math.PI*Math.PI)),Ot=(e,s,a)=>1/(1+Math.pow(10,-se(a)*(e-s)/400));function Te(e){let s=P().seeds||{};return s[e]!=null&&s[e]!==""?Number(s[e]):ut[e]}function ae(e){let s=(P().seedGlicko||{})[e],a=(P().seedRd||{})[e],n=s!=null&&s!==""?Number(s):null,r=a!=null&&a!==""?Number(a):null;if(n!=null||r!=null)return[n??x.unratedR,r??x.unratedRd];let v=Te(e);return v!=null?[Math.max(x.seedMid+(v-x.oldMid)*x.ptsPer,x.minSeed),x.knownRd]:[x.unratedR,x.unratedRd]}function wt(e,s,a){let n=0,r=0;for(let[m,c,o]of a){let l=se(c),d=Ot(e,m,c);n+=l*l*d*(1-d),r+=l*(o-d)}if(n*=lt*lt,n<=0)return[e,s];let v=1/(s*s)+n;return[e+lt/v*r,Math.sqrt(1/v)]}function qe(e,s){let a=Math.pow(10,s),n=e*a,r=Math.floor(n);return Math.abs(n-r-.5)<1e-6?(r+1)/a:Math.round(n)/a}var St=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(x.periodDays*mt)),Y=St(x.graceStart),Ae={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function Pt(){let e=P().settings||{};return(N.settings||[]).map(s=>({...s,value:Object.prototype.hasOwnProperty.call(e,s.name)?e[s.name]:s.value}))}function Re(){for(let e of Pt()){let s=Ae[e.name];if(!s)continue;if(s==="graceStart"){let n=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(n)&&(x.graceStart=n);continue}let a=Number(e.value);Number.isFinite(a)&&(x[s]=a)}Y=St(x.graceStart),j(".cons-val").forEach(e=>{e.textContent=String(x.conservative)}),j(".min-matches-val").forEach(e=>{e.textContent=String(x.minMatches)}),j(".min-opp-val").forEach(e=>{e.textContent=String(x.minOpp)})}function Ce(){Re(),fe(),me();let e={},s=i=>{if(!e[i]){let[h,L]=ae(i);e[i]={name:i,r:h,rd:L,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[i]},a=(i,h,L,k,w,E)=>{let A=s(i);A.games++,A.opps.add(h),L>k?A.w++:L<k?A.l++:A.d++,A.lastIdx=E,w&&(A.lastDate=w)},n={};for(let i of B()){if(i.date)continue;let h=O(i.a),L=O(i.b),k=i.sa>i.sb?1:i.sa<i.sb?0:.5;(n[h]=n[h]||[]).push([L,k]),(n[L]=n[L]||[]).push([h,1-k]),a(h,L,i.sa,i.sb,"",Y),a(L,h,i.sb,i.sa,"",Y)}let r={};for(let i in n)r[i]=[s(i).r,s(i).rd];for(let i in n){let[h,L]=wt(r[i][0],r[i][1],n[i].map(([k,w])=>[r[k][0],r[k][1],w]));s(i).r=h,s(i).rd=L}let v=new Map;for(let i of B().filter(h=>h.date).slice().reverse()){let h=i.date,L=St(h);v.has(L)||v.set(L,[]),v.get(L).push({a:O(i.a),b:O(i.b),sa:+i.sa,sb:+i.sb,date:h})}for(let i of[...v.keys()].sort((h,L)=>h-L)){for(let k in e){let w=e[k],E=i-(w.lastIdx==null?Y:w.lastIdx);E>0&&(w.rd=Math.min(Math.sqrt(w.rd*w.rd+x.growth*x.growth*E),x.maxRd))}let h={};for(let k of v.get(i)){let w=k.sa>k.sb?1:k.sa<k.sb?0:.5;(h[k.a]=h[k.a]||[]).push([k.b,w]),(h[k.b]=h[k.b]||[]).push([k.a,1-w]),a(k.a,k.b,k.sa,k.sb,k.date,i),a(k.b,k.a,k.sb,k.sa,k.date,i)}let L={};for(let k in h)L[k]=[s(k).r,s(k).rd];for(let k in h){let[w,E]=wt(L[k][0],L[k][1],h[k].map(([A,_])=>[L[A][0],L[A][1],_]));s(k).r=w,s(k).rd=E}}let m=Object.values(e).map(i=>({name:i.name,glicko:i.r,rd:i.rd,rating:i.r-x.conservative*i.rd,matches:i.games,w:i.w,l:i.l,d:i.d,winPct:i.games?qe(i.w/i.games*100,1):0,opponents:i.opps.size,avgOpp:0,lastMatch:i.lastDate||"",provisional:!(i.games>=x.minMatches&&i.opps.size>=x.minOpp),inactive:!1})),c={};m.forEach(i=>{c[i.name]=i.glicko}),m.forEach(i=>{let h=0;e[i.name].opps.forEach(L=>{h+=c[L]!=null?c[L]:x.unratedR}),i.avgOpp=e[i.name].opps.size?h/e[i.name].opps.size:0});let o=Date.now(),l=Math.floor(o/(x.periodDays*mt));for(let i in e){let h=e[i],L=l-(h.lastIdx==null?Y:h.lastIdx);L>0&&(h.rd=Math.min(Math.sqrt(h.rd*h.rd+x.growth*x.growth*L),x.maxRd))}m.forEach(i=>{i.glicko=e[i.name].r,i.rd=e[i.name].rd,i.rating=i.glicko-x.conservative*i.rd;let h=tt[i.name],L=(N.curRatings||{})[i.name];i.delta=h!=null?(L??i.rating)-h:0});let d=Date.parse(x.graceStart+"T00:00:00Z")+x.graceDays*mt,p=new Set([...At,...P().inactive||[]]);m.forEach(i=>{i.inactive=p.has(i.name)||(i.lastMatch?o-Date.parse(i.lastMatch+"T00:00:00Z")>x.inactiveDays*mt:o>d)});let f={},g={};(N.players||[]).forEach((i,h)=>{let L=O(i.name);f[L]=i,g[L]=h});let y={};m.forEach(i=>{y[i.name]=i}),m.forEach(i=>{let h=f[i.name];h&&(i.rating=h.rating,i.glicko=h.glicko,i.rd=h.rd,i.matches=h.matches,i.w=h.w,i.l=h.l,i.d=h.d,i.winPct=h.winPct,i.opponents=h.opponents,i.avgOpp=h.avgOpp,h.lastMatch&&(i.lastMatch=h.lastMatch))});let $=[];(N.qualified||[]).forEach(i=>{let h=y[O(i.name)];h&&(h.provisional=!1,h.rank=i.rank!=null?i.rank:$.length+1,$.push(h))});let M=new Set($.map(i=>i.name)),S=m.filter(i=>!M.has(i.name)&&!f[i.name]&&!f[O(i.name)]&&!i.provisional&&!i.inactive).sort((i,h)=>h.rating-i.rating);S.forEach((i,h)=>{i.rank=$.length+h+1});let R=$.concat(S);m.sort((i,h)=>h.rating-i.rating||(g[i.name]!=null?g[i.name]:1e9)-(g[h.name]!=null?g[h.name]:1e9));let V={};return m.forEach(i=>{V[i.name]=i}),{players:m,byName:V,qualified:R}}function Q(){ve(),H=Ce(),F=H.byName,I=H.qualified}var Oe=["page-home","page-player","page-compare","page-matches","page-cards","page-roster","page-analytics","page-method","page-faq","page-admin"];function xt(){if(Nt){Nt=!1;return}let e=location.hash||"#/";Oe.forEach(r=>u("#"+r).classList.remove("active"));let s="#/"+(e.split("/")[1]||"");j(".nav a, .foot-nav a").forEach(r=>{let v=r.getAttribute("href");r.classList.toggle("active",v===s||e==="#/"&&v==="#/")});let a=u("#nav-glide"),n=document.querySelector(".nav a.active");if(a&&n&&n.offsetWidth>0?(a.style.width=n.offsetWidth+"px",a.style.transform=`translateX(${n.offsetLeft}px)`,a.style.opacity="1"):a&&(a.style.opacity="0"),e==="#/compare"||e.startsWith("#/compare/")){let r=e.split("/").slice(2).map(qt);ie(r[0]||"",r[1]||""),u("#page-compare").classList.add("active"),window.lbScrollNow(0)}else if(e.startsWith("#/player/"))Be(qt(e.slice(9))),u("#page-player").classList.add("active"),window.lbScrollNow(0);else if(e==="#/matches")De(),u("#page-matches").classList.add("active"),window.lbScrollNow(0);else if(e==="#/cards")typeof renderCards=="function"&&renderCards(),u("#page-cards").classList.add("active"),window.lbScrollNow(0);else if(e.startsWith("#/card/")){typeof renderCards=="function"&&renderCards(),u("#page-cards").classList.add("active"),window.lbScrollNow(0);let r=qt(e.slice(7));requestAnimationFrame(()=>{typeof window.cardsFocus=="function"&&window.cardsFocus(r)})}else e==="#/roster"?(He(),u("#page-roster").classList.add("active"),window.lbScrollNow(0)):e==="#/analytics"?(Ue(),u("#page-analytics").classList.add("active"),window.lbScrollNow(0)):e==="#/method"?(We(),u("#page-method").classList.add("active"),window.lbScrollNow(0)):e==="#/faq"?(Ye(),u("#page-faq").classList.add("active"),window.lbScrollNow(0)):e==="#/admin"?(J(),u("#page-admin").classList.add("active"),window.lbScrollNow(0)):(_t(),u("#page-home").classList.add("active"),requestAnimationFrame(_e));Et()}window.addEventListener("hashchange",xt);function _t(){z="all",C={key:"rank",dir:1},j(".chip[data-filter]").forEach(c=>c.classList.toggle("on",c.dataset.filter==="all")),Ft();let e=B().length,s=H.players.length,a=I[0],n=Math.round(I.reduce((c,o)=>c+o.rd,0)/I.length),r=u("#hero-chip-matches");r&&(r.innerHTML=t("home.chipMatches",{n:e})),u("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">${t("stat.ranked")}</div>
      <div class="v"><span class="cu" data-target="${I.length}">0</span><small>${t("stat.ofTotal",{n:s})}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.matches")}</div>
      <div class="v"><span class="cu" data-target="${e}">0</span></div></div>
    <div class="stat-card"><div class="k">${t("stat.highest")}</div>
      <div class="v"><span class="cu" data-target="${a.rating}" data-dec="1">0</span><small>${b(a.name)}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.avgRd")}</div>
      <div class="v"><span class="cu" data-target="${n}" data-dec="1">0</span><small>${t("stat.certainty")}</small></div></div>`;let v=[I[1],I[0],I[2]].filter(Boolean);u("#fl-cards").innerHTML=v.map(c=>`
    <div class="fl-card r${c.rank}${c.rank===1?" champ":""} reveal" data-goto="${b(c.name)}">
      <div class="fl-top">
        ${$t(c.rank)}
        <div class="rd">RD ${c.rd.toFixed(0)}</div>
      </div>
      ${c.rank===1?`<div class="champ-tag">${t("home.champTag")}</div>`:""}
      <div class="nm">${b(c.name)}</div>
      <div class="rating">
        <span class="unit">${t("home.ratingUnit")}</span>
        <div class="big-row"><span class="big">${Math.round(c.rating)}</span>${Lt(c)}</div>
      </div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${c.winPct>=60?"":c.winPct>=40?"mid":"low"}" data-w="${c.winPct}"></div></div>
      </div>
      <div class="meta">
        <span><span class="w">${c.w}${q("W")}</span> <span class="l">${c.l}${q("L")}</span> ${c.d}${q("D")}</span>
        <span class="wc">${c.winPct.toFixed(1)}%</span>
        <span class="opp">${t("home.avgOpp",{n:c.avgOpp.toFixed(1)})}</span>
      </div>
    </div>`).join(""),requestAnimationFrame(()=>{j("#fl-cards .bar-fill").forEach(c=>{c.style.width=c.dataset.w+"%"})}),st(),ne();let m=u("#last-updated");m&&(m.textContent=t("home.lastUpdated",{when:X(N.generated)||"today"}))}function ne(){let e=B().filter(s=>s.date).slice(0,10);u("#battles-grid").innerHTML=e.length?e.map(s=>{let a=s.sa>s.sb,n=s.sb>s.sa;return`
    <div class="battle-row reveal" data-goto="${b(a?s.a:s.b)}">
      <div class="who ${a?"win":"lose"}" data-goto="${b(s.a)}">${b(s.a)}</div>
      <div class="vs">${t("vs")}</div>
      <div class="who r ${n?"win":"lose"}" data-goto="${b(s.b)}">${b(s.b)}</div>
      <div class="sc mono"><span class="${a?"win":"lose"}">${s.sa}</span> \u2013 <span class="${n?"win":"lose"}">${s.sb}</span></div>
      <div class="dt">${X(s.date)||(s.admin&&!s.published?t("battles.justNow"):t("misc.historical"))}</div>
    </div>`}).join(""):`<div class="empty" style="padding:26px;text-align:center;color:var(--dim);grid-column:1/-1">${t("battles.empty")}</div>`}var je=500,Ne="cubic-bezier(.22,.8,.24,1)",Ie=12;function Pe(e,s){matchMedia("(prefers-reduced-motion: reduce)").matches||j(".lb-row",e).forEach((a,n)=>{let r=s.get(a.dataset.name);if(r===void 0||typeof a.animate!="function")return;let v=r-a.getBoundingClientRect().top;Math.abs(v)<=1||a.animate([{transform:`translateY(${v}px)`},{transform:"none"}],{duration:je,easing:Ne,delay:Math.min(n*Ie,220),fill:"backwards"})})}function st(e="all",s="rank",a=1){let n=u("#lb-body"),v=(e==="all"&&ht?I:H.players).slice().map(o=>({...o,rank:o.rank!=null?o.rank:9999}));jt&&(v=v.filter(o=>o.name.toLowerCase().includes(jt))),e==="provisional"?v=v.filter(o=>(F[o.name]||{}).provisional):e==="inactive"?v=v.filter(o=>(F[o.name]||{}).inactive):e==="veterans"?v=v.filter(o=>o.matches>=15):e==="rising"&&(v=v.filter(o=>o.winPct>=60&&o.matches>=5)),v.sort((o,l)=>{let d=o[s],p=l[s];return(typeof d=="string"?d.localeCompare(p):d-p)*a});let m=new Map;j(".lb-row",n).forEach(o=>m.set(o.dataset.name,o.getBoundingClientRect().top));let c=we();n.innerHTML=v.map(o=>`
    <div class="lb-row ${o.rank<=3?"top"+o.rank:""}" data-name="${b(o.name)}" data-goto="${b(o.name)}">
      <div class="rank">${o.rank<=I.length?$t(o.rank,"sm")+ye(o,c):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="name-stack"><div class="pname">${b(o.name)}</div></div>${typeof cardsRowChip=="function"?cardsRowChip(o.name):""}</div>
      <div class="rating-cell mono">${Lt(o)}${bt(o,!0)}</div>
      <div class="num-cell mono col-hide">${o.rd.toFixed(1)}</div>
      <div class="num-cell mono col-hide">${o.matches}</div>
      <div class="num-cell mono col-hide"><span class="w">${o.w}</span></div>
      <div class="num-cell mono col-hide"><span class="l">${o.l}</span></div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${o.winPct>=60?"":o.winPct>=40?"mid":"low"}" data-w="${o.winPct}"></div></div>
        <div class="pct mono">${o.winPct.toFixed(1)}%</div>
      </div>
      <div class="num-cell mono col-hide">${o.opponents}</div>
      <div class="num-cell mono col-hide">${o.avgOpp.toFixed(1)}</div>
      <div class="col-status">${ge(o.name)||be(o.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?t("lb.emptyInactive"):e==="provisional"?t("lb.emptyProv"):t("lb.emptyNone")}</div>`,Pe(n,m),requestAnimationFrame(()=>{j(".bar-fill",n).forEach(o=>{o.style.width=o.dataset.w+"%"})})}var z="all",C={key:"rank",dir:1},jt="",ht=!0;function Ft(){j(".sortable").forEach(s=>s.classList.remove("sorted","asc"));let e=u(`.sortable[data-key="${C.key}"]`);e&&(e.classList.add("sorted"),C.dir===1&&e.classList.add("asc"))}function _e(){j("#stat-strip .cu").forEach(e=>yt(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),j(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}u("#lb-qual").addEventListener("click",()=>{ht=!ht,u("#lb-qual").classList.toggle("on",ht),st(z,C.key,C.dir)});u("#lb-filter").addEventListener("input",e=>{jt=e.target.value.trim().toLowerCase(),st(z,C.key,C.dir)});var ct=u("#theme-toggle");function Bt(){if(!ct)return;let e=document.documentElement.dataset.theme==="light",s=e?t("top.toDark"):t("top.toLight");ct.setAttribute("aria-pressed",String(e)),ct.setAttribute("aria-label",s),ct.title=s}ct.addEventListener("click",()=>{let s=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=s;try{localStorage.setItem("tt1v1_theme",s)}catch{}Bt()});Bt();document.addEventListener("click",e=>{let s=e.target.closest(".chip");if(s&&s.dataset.filter){j(".chip[data-filter]").forEach(r=>r.classList.remove("on")),s.classList.add("on"),z=s.dataset.filter,st(z,C.key,C.dir);return}let a=e.target.closest(".sortable");if(a){let r=a.dataset.key;C.key===r&&C.dir===-1?C={key:"rank",dir:1}:C.key===r?C={key:r,dir:-C.dir}:C={key:r,dir:1},Ft(),st(z,C.key,C.dir);return}let n=e.target.closest("[data-goto]");n&&(e.stopPropagation(),location.hash="#/player/"+D(n.dataset.goto))});function Fe(e){let s=e.slice();for(let a=s.length-1;a>0;a--){let n=Math.floor(Math.random()*(a+1));[s[a],s[n]]=[s[n],s[a]]}return s}function Ut(e,s){let a=document.getElementById(e);if(!a)return;let n=a.querySelector(".pick-btn"),r=a.querySelector(".pick-search"),v=[...a.querySelectorAll(".pick-opt")],m=a.querySelector(".pick-empty"),c=-1,o=()=>v.filter(g=>!g.classList.contains("hide")),l=g=>{let y=o();if(!y.length){c=-1;return}c=(g%y.length+y.length)%y.length,v.forEach($=>$.classList.remove("hover")),y[c].classList.add("hover"),y[c].scrollIntoView({block:"nearest"})},d=g=>{let y=g.trim().toLowerCase(),$=0;v.forEach(M=>{let S=!y||M.dataset.name.toLowerCase().includes(y);M.classList.toggle("hide",!S),S&&$++}),m.classList.toggle("show",$===0),c=-1,$&&l(0)},p=()=>{document.querySelectorAll(".pick.open").forEach(g=>{if(g!==a){g.classList.remove("open");let y=g.querySelector(".pick-btn");y&&y.setAttribute("aria-expanded","false")}}),a.classList.add("open"),n.setAttribute("aria-expanded","true"),r.value="",d(""),requestAnimationFrame(()=>r.focus())},f=()=>{a.classList.remove("open"),n.setAttribute("aria-expanded","false")};n.addEventListener("click",()=>{a.classList.contains("open")?f():p()}),r.addEventListener("input",()=>d(r.value)),r.addEventListener("keydown",g=>{if(g.key==="ArrowDown")g.preventDefault(),l(c+1);else if(g.key==="ArrowUp")g.preventDefault(),l(c-1);else if(g.key==="Enter"){g.preventDefault();let y=o();y[c]&&y[c].click()}else g.key==="Escape"&&(f(),n.focus())}),v.forEach(g=>{g.addEventListener("click",()=>{a.dataset.value=g.dataset.name,a.querySelector(".pick-cur").textContent=g.dataset.name,f(),s()}),g.addEventListener("mousemove",()=>{let y=o().indexOf(g);y>=0&&y!==c&&(c=y,v.forEach($=>$.classList.remove("hover")),g.classList.add("hover"))})})}document.addEventListener("click",e=>{document.querySelectorAll(".pick.open").forEach(s=>{if(!s.contains(e.target)){s.classList.remove("open");let a=s.querySelector(".pick-btn");a&&a.setAttribute("aria-expanded","false")}})});function ie(e,s){let a=u("#cmp-wrap"),r=H.players.slice().sort((w,E)=>(w.rank!=null?w.rank:9999)-(E.rank!=null?E.rank:9999)||w.name.localeCompare(E.name)).map(w=>w.name);if(r.length<2){a.innerHTML=`<div class="empty">${t("cmp.notEnough")}</div>`;return}let v=w=>w[Math.floor(Math.random()*w.length)],m=w=>v(r.filter(E=>E!==w)),c=F[e]?e:v(r),o=F[s]?s:m(c);o===c&&(o=m(c)),(c!==e||o!==s)&&history.replaceState(null,"","#/compare/"+D(c)+"/"+D(o));let l=F[c],d=F[o],p=I.find(w=>w.name===c),f=I.find(w=>w.name===o),g=Ot(l.glicko,d.glicko,d.rd),y=Ot(d.glicko,l.glicko,l.rd),$=Math.round(g/(g+y)*1e3)/10,M=Math.round(1e3-$*10)/10,S=B().filter(w=>w.a===c&&w.b===o||w.a===o&&w.b===c).map(w=>{let E=w.a===c,A=E?w.sa:w.sb,_=E?w.sb:w.sa;return{fa:A,fb:_,res:A>_?"W":A<_?"L":"D",date:w.date}}),R=S.reduce((w,E)=>(E.res==="W"?w.w++:E.res==="L"?w.l++:w.d++,w),{w:0,l:0,d:0}),V=Fe(r),i=(w,E,A)=>`
    <div class="pick" id="${w}" data-value="${b(E)}">
      <button type="button" class="pick-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="${b(A)}">
        <span class="pick-cur">${b(E)}</span>
        <svg class="pick-caret" width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true"><path d="M1.2 1.2 5.5 5.6 9.8 1.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="pick-menu">
        <input class="pick-search" type="text" autocomplete="off" spellcheck="false"
          placeholder="${t("cmp.searchPlaceholder")}" aria-label="${b(A)}">
        <div class="pick-list" role="listbox" aria-label="${b(A)}">
          ${V.map(_=>{let at=F[_];return`<button type="button" class="pick-opt${_===E?" on":""}" role="option" data-name="${b(_)}" aria-selected="${_===E?"true":"false"}">
              <span class="pick-n">${b(_)}</span>
              <span class="pick-meta mono">${at&&at.rating!=null?at.rating.toFixed(1):""}</span>
            </button>`}).join("")}
          <div class="pick-empty">${t("cmp.noResults")}</div>
        </div>
      </div>
    </div>`,h=(w,E,A,_,at)=>`
    <div class="cmp-trow">
      <div class="va mono${_?" win":""}">${E}</div>
      <div class="k">${w}</div>
      <div class="vb mono${at?" win":""}">${A}</div>
    </div>`,L='<span style="color:var(--dimmer)">\u2014</span>';a.innerHTML=`
    <div class="kicker anim">${t("cmp.versus")}</div>
    <h2 class="section-head anim" style="margin:6px 0 2px">${t("cmp.title")}</h2>
    <div class="cmp-pickers anim">
      ${i("cmp-a",c,t("cmp.firstPlayer"))}
      <button class="btn btn-ghost" id="cmp-swap" style="width:auto;margin:0" title="${t("cmp.swap")}">\u21C4</button>
      ${i("cmp-b",o,t("cmp.secondPlayer"))}
    </div>
    <div class="cmp-share anim">
      <button class="btn btn-ghost" id="cmp-copy" style="width:auto;margin:0">${t("cmp.copyLink")}</button>
      <span class="caption" id="cmp-copy-msg"></span>
    </div>

    <div class="cmp-hero anim">
      <div class="cmp-side a">
        <div class="cmp-sub">${p?t("cmp.rankN",{n:p.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${D(c)}">${b(c)}</a></div>
        <div class="cmp-rating mono">${l.provisional?dt(l):l.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",l.matches,{rd:l.rd.toFixed(1)})}</div>
      </div>
      <div class="cmp-vs">
        <div class="vs-mark">${t("cmp.vsMark")}</div>
        <div class="mono" style="font-size:11px;color:var(--dimmer)">${t("cmp.h2hShort",{n:S.length})}</div>
      </div>
      <div class="cmp-side b">
        <div class="cmp-sub">${f?t("cmp.rankN",{n:f.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${D(o)}">${b(o)}</a></div>
        <div class="cmp-rating mono">${d.provisional?dt(d):d.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",d.matches,{rd:d.rd.toFixed(1)})}</div>
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.probTitle")} <span class="n">${t("cmp.probSub")}</span></h3>
      <div class="cmp-prob-labels">
        <span style="color:var(--gold)">${b(c)} ${$.toFixed(1)}%</span>
        <span style="color:var(--blue)">${M.toFixed(1)}% ${b(o)}</span>
      </div>
      <div class="cmp-probbar"><i class="pa" style="width:${$}%"></i><i class="pb" style="width:${M}%"></i></div>
      <div class="cmp-prob-note">${t("cmp.probNote")}</div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.tale")}</h3>
      <div class="cmp-table">
        ${h(t("cmp.rating"),bt(l),bt(d),!l.provisional&&l.rating>d.rating,!d.provisional&&d.rating>l.rating)}
        ${h(t("cmp.rank"),p?"#"+p.rank:L,f?"#"+f.rank:L,p&&f&&p.rank<f.rank,p&&f&&f.rank<p.rank)}
        ${h(t("cmp.rdUnc"),l.rd.toFixed(1),d.rd.toFixed(1),l.rd<d.rd,d.rd<l.rd)}
        ${h(t("cmp.glicko"),l.glicko.toFixed(1),d.glicko.toFixed(1),l.glicko>d.glicko,d.glicko>l.glicko)}
        ${h(t("cmp.record"),`<span style="color:var(--green)">${l.w}${q("W")}</span> <span style="color:var(--red)">${l.l}${q("L")}</span> ${l.d}${q("D")}`,`<span style="color:var(--green)">${d.w}${q("W")}</span> <span style="color:var(--red)">${d.l}${q("L")}</span> ${d.d}${q("D")}`,l.winPct>d.winPct,d.winPct>l.winPct)}
        ${h(t("cmp.winRate"),l.winPct+"%",d.winPct+"%",l.winPct>d.winPct,d.winPct>l.winPct)}
        ${h(t("cmp.matchesPlayed"),l.matches,d.matches,!1,!1)}
        ${h(t("cmp.uniqueOpp"),l.opponents,d.opponents,l.opponents>d.opponents,d.opponents>l.opponents)}
        ${h(t("cmp.avgOppRating"),l.avgOpp.toFixed(1),d.avgOpp.toFixed(1),l.avgOpp>d.avgOpp,d.avgOpp>l.avgOpp)}
        ${h(t("cmp.h2h"),`${R.w}${q("W")} \u2013 ${R.l}${q("L")} \u2013 ${R.d}${q("D")}`,`${R.l}${q("W")} \u2013 ${R.w}${q("L")} \u2013 ${R.d}${q("D")}`,R.w>R.l,R.l>R.w)}
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.prevMeetings")} <span class="n">${tp("cmp.meetings",S.length)}</span></h3>
      <div class="match-list">
        ${S.map(w=>`
          <div class="match-row">
            <div class="res-chip ${w.res}">${q(w.res)}</div>
            <div class="who">${b(c)}</div>
            <div class="score mono">${w.fa} \u2013 ${w.fb}</div>
            <div class="who opp"><a href="#/player/${D(o)}" style="color:var(--blue)">${b(o)}</a></div>
            <div class="date mono" title="${Kt(w.date)}">${X(w.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("cmp.neverMet")}</div>`}
      </div>
      <div class="caption" style="margin-top:12px">${t("cmp.legacyNote")}</div>
    </div>`;let k=()=>{let w=u("#cmp-a").dataset.value,E=u("#cmp-b").dataset.value,A="#/compare/"+D(w)+"/"+D(E);location.hash!==A&&(Nt=!0,location.hash=A),ie(w,E)};Ut("cmp-a",k),Ut("cmp-b",k),u("#cmp-swap").addEventListener("click",()=>{let w=u("#cmp-a"),E=u("#cmp-b"),A=w.dataset.value;w.dataset.value=E.dataset.value,E.dataset.value=A,k()}),u("#cmp-copy").addEventListener("click",()=>{let w=location.href.split("#")[0]+"#/compare/"+D(c)+"/"+D(o),E=()=>{u("#cmp-copy-msg").textContent=t("cmp.linkCopied")};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(w).then(E,()=>{u("#cmp-copy-msg").textContent=w}):u("#cmp-copy-msg").textContent=w})}var Nt=!1;function Be(e){let s=F[e],a=u("#page-player");if(!s){a.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("pl.notFound",{name:b(e)})}</div></div></div>`;return}let n=I.find(o=>o.name===e),r=kt(e),v=r.slice(0,10),m=zt(e),c=Math.max(3,Math.min(100,100-s.rd/120*100));a.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">${t("pl.back")}</a>
    <div class="pv-layout">
    <div class="pv-main">
    <div class="player-hero anim">
      <div class="player-top">
        ${n?$t(n.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${b(s.name)}</div>
          ${he(s.name)}
          <button class="pc-share pv-share" data-share="link" data-target="profile" data-name="${b(s.name)}"><svg class="pc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg><span>${t("cards.shareLink")}</span></button>
          <div class="player-rankline">
            ${n?t("pl.rankedOf",{rank:n.rank,total:I.length}):t("pl.unranked")}
            ${s.provisional?` \xB7 <span class="tag prov">${t("tag.provisional")}</span>`:""}
            ${s.inactive?` \xB7 <span class="tag inact">${t("tag.inactive")}</span>`:""}
          </div>
        </div>
        <div class="player-rating-block">
          <div class="lbl">${s.provisional?t("pl.estRange"):t("pl.visible")}</div>
          <div class="big mono${s.provisional?" prov-range":""}" id="pv-rating">${s.provisional?dt(s):"0"}</div>
          ${Lt(s)}
          <div class="rd-bar">
            <div class="bar-track"><div class="bar-fill" style="width:${c}%"></div></div>
            <div class="caption"><span>${t("pl.certainty")}</span><span class="mono">RD ${s.rd.toFixed(1)}</span></div>
          </div>
        </div>
      </div>
      <div class="pstat-grid">
        <div class="pstat"><div class="k">${t("pl.glicko")}</div><div class="v mono">${s.glicko.toFixed(1)}</div></div>
        <div class="pstat"><div class="k">${t("pl.matches")}</div><div class="v mono">${s.matches}</div></div>
        <div class="pstat"><div class="k">${t("pl.record")}</div><div class="v mono" style="font-size:19px"><span style="color:var(--green)">${s.w}${q("W")}</span> <span style="color:var(--red)">${s.l}${q("L")}</span> <span style="color:var(--dim)">${s.d}${q("D")}</span></div></div>
        <div class="pstat"><div class="k">${t("pl.winRate")}</div><div class="v mono">${s.winPct}%</div></div>
        <div class="pstat"><div class="k">${t("pl.opponents")}</div><div class="v mono">${s.opponents}</div></div>
        <div class="pstat"><div class="k">${t("pl.avgOppRating")}</div><div class="v mono">${s.avgOpp.toFixed(1)}</div></div>
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.recentForm")} <span class="n">${t("pl.lastN",{n:Math.min(10,r.length)})}</span></h3>
      <div class="form-strip">
        ${v.map((o,l)=>`<div class="form-pill ${o.res}" style="animation-delay:${l*55}ms"
           title="${t("pl.vsOpp",{opp:b(o.opp)})} ${o.for_}-${o.against}">${q(o.res)}</div>`).join("")||`<span class="empty">${t("pl.noGames")}</span>`}
      </div>
    </div>
    </div>
    <div class="pv-side">${typeof cardsHeroHTML=="function"?cardsHeroHTML(e):""}</div>
    </div>

    <div class="pv-lower">
    <div class="panel reveal">
      <h3>${t("pl.matchHistory")} <span class="n">${tp("pl.nGames",r.length)}</span></h3>
      <div class="match-list">
        ${r.map(o=>`
          <div class="match-row">
            <div class="res-chip ${o.res}">${q(o.res)}</div>
            <div class="who">${b(s.name)}</div>
            <div class="score mono">${o.for_} \u2013 ${o.against}</div>
            <div class="who opp"><a href="#/player/${D(o.opp)}" style="color:var(--blue)">${b(o.opp)}</a></div>
            <div class="date mono" title="${Kt(o.date)}">${X(o.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.h2h")} <span class="n">${tp("pl.nOpponents",m.length)}</span></h3>
      <div class="h2h-grid">
        ${m.map(o=>`
          <div class="h2h-card" data-goto="${b(o.opp)}">
            <div class="opp">${b(o.opp)}</div>
            <div class="rec mono"><span class="w">${o.w}${q("W")}</span> \xB7 <span class="l">${o.l}${q("L")}</span> \xB7 <span>${o.d}${q("D")}</span> \xB7 ${t("pl.pts",{pf:o.pf,pa:o.pa})}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>
    </div>
  </div>`,s.provisional||yt(u("#pv-rating"),s.rating,{dec:1,dur:900}),typeof cardsMountAll=="function"&&cardsMountAll(a),Et()}function De(){ne();let e=u("#gm-body"),s=B();u("#gm-count").textContent=tp("gm.count",s.length),e.innerHTML=s.map(a=>{let n=a.sa>a.sb,r=a.sb>a.sa;return`
    <div class="gm-row">
      <div class="side ${n?"winner":"loser"}">
        <div class="dot ${n?"w":"l"}"></div>
        <div class="nm" data-goto="${b(a.a)}">${b(a.a)}</div>
      </div>
      <div class="sc mono" style="color:${n?"var(--green)":"var(--red)"}">${a.sa}</div>
      <div class="dash mono">\u2013</div>
      <div class="sc mono" style="color:${r?"var(--green)":"var(--red)"}">${a.sb}</div>
      <div class="side right ${r?"winner":"loser"}">
        <div class="dot ${r?"w":"l"}"></div>
        <div class="nm" data-goto="${b(a.b)}">${b(a.b)}</div>
      </div>
      <div class="dt mono">${a.admin&&!a.published?`<span class="tag fresh">${t("tag.new")}</span>`:X(a.date)||t("misc.historical")}</div>
    </div>`}).join("")}function He(){let e=H.players.filter(s=>s.provisional).sort((s,a)=>a.rating-s.rating);u("#roster-grid").innerHTML=e.map(s=>{let a=Math.min(100,Math.round(Math.min(1,s.matches/5)*50+Math.min(1,s.opponents/3)*50));return`
    <div class="roster-card reveal" data-goto="${b(s.name)}">
      <div class="top">
        <div class="nm">${b(s.name)}</div>
        <svg class="shield" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"/></svg>
      </div>
      <div class="rating"><span class="unit">${t("roster.estRange")}</span><span class="big prov-range">${dt(s)}</span></div>
      <div class="req-row"><span>${t("roster.matches")}</span><span class="${s.matches>=5?"ok":""}">${s.matches} / 5 ${s.matches>=5?"\u2713":""}</span></div>
      <div class="req-row"><span>${t("roster.opponents")}</span><span class="${s.opponents>=3?"ok":""}">${s.opponents} / 3 ${s.opponents>=3?"\u2713":""}</span></div>
      <div class="prog-track"><div class="prog-fill" data-w="${a}"></div></div>
      <div class="prog-label">${t("roster.progress",{pct:a})}</div>
    </div>`}).join(""),requestAnimationFrame(()=>j("#roster-grid .prog-fill").forEach(s=>{s.style.width=s.dataset.w+"%"}))}function Ue(){let e=H.players,s=I.slice().sort((i,h)=>h.winPct-i.winPct).slice(0,10),a=e.slice().sort((i,h)=>h.matches-i.matches).slice(0,10),n=[];B().forEach(i=>{let h=F[i.a],L=F[i.b];if(!h||!L)return;let k=h.rating-L.rating;if(i.sa===i.sb)return;let w=i.sa>i.sb?i.a:i.b,E=Math.abs(k);(k<0&&w===i.a||k>0&&w===i.b)&&n.push({winner:w,loser:w===i.a?i.b:i.a,gap:E,score:w===i.a?`${i.sa}-${i.sb}`:`${i.sb}-${i.sa}`})}),n.sort((i,h)=>h.gap-i.gap);let r={};B().forEach(i=>{let h=[i.a,i.b].sort().join(" vs ");r[h]=(r[h]||0)+1});let v=Object.entries(r).sort((i,h)=>h[1]-i[1]).slice(0,10),m=e.map(i=>i.rating),c=Math.min(...m),o=Math.max(...m),l=8,d=(o-c)/l||1,p=Array.from({length:l},()=>0);m.forEach(i=>{p[Math.min(l-1,Math.max(0,Math.floor((i-c)/d)))]++});let f=Math.max(...p,1),g=p.map((i,h)=>{let L=Math.round((c+h*d)/10)*10,k=Math.round((c+(h+1)*d)/10)*10;return`
    <div class="hcol" title="${tp("an.histTip",i,{lo:L,hi:k})}">
      <div class="hbar" data-h="${Math.round(i/f*100)}"></div>
      <div class="hlbl">${L}\u2013${k}</div>
    </div>`}).join(""),y=e.slice().sort((i,h)=>h.opponents-i.opponents).slice(0,8),$=Math.max(...y.map(i=>i.opponents),1),M=y.map(i=>`
    <div class="mrow reveal" data-goto="${b(i.name)}">
      <div class="nm">${b(i.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(i.opponents/$*100)}"></div></div>
      <div class="val mono">${i.opponents}</div>
    </div>`).join(""),S=(i,h,L)=>i.map((k,w)=>`
    <div class="an-row reveal" data-goto="${b(k.name)}">
      <div class="idx mono">${w+1}</div>
      <div class="nm">${b(k.name)}</div>
      <div class="val mono">${h(k)}</div>
      <div class="unit mono">${L(k)}</div>
    </div>`).join(""),R=i=>tp("an.nMatches",i.matches);u("#an-grid").innerHTML=`
    <div class="an-panel">
      <div class="head"><h3>${t("an.topWinRate")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${S(s,i=>i.winPct+"%",R)}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.mostActive")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/></svg>
      </div>
      ${S(a,i=>i.matches,i=>t("an.matchesUnit"))}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.biggestUpsets")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${n.length?n.slice(0,8).map((i,h)=>`
        <div class="an-row reveal" data-goto="${b(i.winner)}">
          <div class="idx mono">${h+1}</div>
          <div class="nm">${b(i.winner)} <span style="color:var(--dimmer);font-weight:500">${t("an.def")}</span> ${b(i.loser)}</div>
          <div class="val mono">${i.score}</div>
          <div class="unit mono">${t("an.plusPts",{n:Math.round(i.gap)})}</div>
        </div>`).join(""):`<div class="empty">${t("an.noUpsets")}</div>`}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.rivalries")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${v.map(([i,h],L)=>`
        <div class="an-row reveal">
          <div class="idx mono">${L+1}</div>
          <div class="nm">${i.split(" vs ").map(b).join(` <span style="color:var(--dimmer);font-weight:500">${t("vs")}</span> `)}</div>
          <div class="val mono">${h}</div>
          <div class="unit mono">${t("an.meetingsUnit")}</div>
        </div>`).join("")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.ratingDist")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 20V10M10 20V4M16 20v-8M2 20h20" stroke-linecap="round"/></svg>
      </div>
      <div class="hist">${g}</div>
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.uniqueOpp")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v5M12 15v5" stroke-linecap="round"/></svg>
      </div>
      ${M}
    </div>`;let V=()=>{j("#an-grid .hbar").forEach(i=>{i.style.height=i.dataset.h+"%"}),j("#an-grid .abar").forEach(i=>{i.style.width=i.dataset.w+"%"})};requestAnimationFrame(V),setTimeout(V,140),Et()}function We(){u("#settings-body").innerHTML=Pt().map(e=>`
    <tr><td><b>${b(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${b(e.desc)}</div></td>
        <td class="val">${b(String(e.value))}</td></tr>`).join("")}function Ge(){return Array.from({length:11},(e,s)=>({q:t("faq.q"+(s+1)),a:t("faq.a"+(s+1))}))}function gt(){let e=P().faq;return Array.isArray(e)&&e.length?e:Ge()}function Je(){let e=window.cardsTiers;if(!e)return"";let{TIER_KEYS:s,tierOf:a,tierIdx:n,tierMin:r,tierLabel:v,crestSVG:m}=e,c={};s.forEach(d=>{c[d]=0}),(H.players||[]).forEach(d=>{d&&d.rating!=null&&(c[a(d.rating)]+=1)});let o=s.reduce((d,p)=>d+c[p],0),l=s.slice().reverse().map(d=>{let p=n(d),f=r(d),g=s[p+1]!=null?r(s[p+1]):null,y=p===0?`&lt; ${Math.round(g)}`:g!=null?`${Math.round(f)}\u2013${Math.round(g)-1}`:`${Math.round(f)}+`,$=o?c[d]/o*100:0;return`
      <tr class="tier-${d}">
        <td class="fd-badge"><span class="fd-badge-in">${m(d)}<span class="fd-name">${v(d)}</span></span></td>
        <td class="fd-range mono">${y}</td>
        <td class="fd-count"><b class="mono">${c[d]}</b><i style="width:${$.toFixed(1)}%"></i></td>
      </tr>`}).join("");return`
    <p class="fd-note">${t("faq.distNote")}</p>
    <table class="fd-table">
      <thead><tr><th>${t("faq.distBadge")}</th><th>${t("faq.distRange")}</th><th>${t("faq.distPlayers")}</th></tr></thead>
      <tbody>${l}</tbody>
    </table>`}function Ye(){let e='<svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',s=(a,n,r)=>`
    <div class="faq-item reveal" data-faq="${r}">
      <button class="faq-q" aria-expanded="false">
        <span>${a}</span>
        ${e}
      </button>
      <div class="faq-a"><div class="faq-a-in">${n}</div></div>
    </div>`;u("#faq-list").innerHTML=s(b(t("faq.distTitle")),Je(),"dist")+gt().map((a,n)=>s(b(String(a.q||"")),b(String(a.a||"")),n)).join(""),Et()}document.addEventListener("click",e=>{let s=e.target.closest(".faq-q");if(!s)return;let a=s.closest(".faq-item"),n=a.classList.contains("open");j(".faq-item.open").forEach(r=>{r.classList.remove("open"),r.querySelector(".faq-q").setAttribute("aria-expanded","false")}),n||(a.classList.add("open"),s.setAttribute("aria-expanded","true"))});function J(){let e=u("#admin-wrap");if(!$e()){e.innerHTML=`
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
    </div>`;let l=async()=>{let d=u("#admin-pw").value;try{let p=await fetch(Se,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:d})});if(p.ok){let f=await p.json().catch(()=>({}));ke(f.token||d,u("#admin-remember").checked),J(),T("Welcome back, commander.");return}if(p.status===429){T("Too many attempts \u2014 wait a few minutes.");return}}catch{}u("#admin-pw").style.borderColor="var(--red)",T("Wrong password.")};u("#admin-auth").addEventListener("click",l),u("#admin-pw").addEventListener("keydown",d=>{d.key==="Enter"&&l()});return}let a=P(),n='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',r=a.inactive.map(l=>`
    <div class="log-item">
      <div class="txt"><b>${b(l)}</b> <span style="color:var(--dimmer)">\u2014 inactive</span></div>
      <button class="icon-btn" data-inact-del="${b(l)}" title="Mark active again">${n}</button>
    </div>`).join("")||'<div class="empty">Nobody marked inactive.</div>',v=Pt().map(l=>`
    <div class="set-row">
      <div class="lbl"><b>${b(l.name)}</b><div class="d">${b(String(l.desc||""))}</div></div>
      <input class="set-val mono" data-set-name="${b(l.name)}" value="${b(String(l.value))}">
    </div>`).join("");e.innerHTML=`
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

  <div class="admin-bar anim" style="margin-top:22px">
    <div class="title"><span>\u25CF</span> Customize everything</div>
    <div class="spacer"></div>
    <div class="form-note" style="margin:0">Everything the master sheet can do \u2014 inactive status, model settings &amp; Q&A. Changes apply live here; <b style="color:var(--gold)">Publish to everyone</b> makes them public.</div>
  </div>

  <div class="admin-grid anim">
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
      <div class="log-list" id="ov-inact-list" style="margin-top:12px">${r}</div>
    </div>

    <div class="panel" style="margin:0">
      <h3>Model <span class="n">settings</span></h3>
      <div id="ov-settings">${v}</div>
      <button class="btn btn-ghost" id="ov-set-reset" style="margin-top:12px">Reset to sheet values</button>
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
      <h3>Feedback <span class="n">inbox</span> <span style="color:var(--dimmer);font-size:12px;font-weight:500">\u2014 messages sent from the site</span>
        <button class="btn btn-ghost" id="fb-refresh" style="margin:0 0 0 14px;padding:8px 16px;width:auto">\u27F3 Refresh</button></h3>
      <div class="log-list" id="fb-inbox"><div class="empty">Loading messages\u2026</div></div>
    </div>
  </div>

  <datalist id="player-list">${H.players.map(l=>`<option value="${b(l.name)}">`).join("")}</datalist>`,u("#admin-lock").addEventListener("click",()=>{Le(),J()}),u("#admin-publish").addEventListener("click",()=>m()),u("#admin-sync").addEventListener("click",async()=>{let l=u("#admin-sync"),d=u("#admin-sync-status");l.disabled=!0,d.textContent="syncing\u2026";try{let p=await fetch(xe,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:rt()})}),f=await p.json().catch(()=>({}));p.ok&&f.ok?(d.textContent=f.changed?`synced \u2713 ${f.matches} matches / ${f.players} players`:"already up to date \u2713",T(f.changed?"Sheet synced \u2014 the live site was updated.":"Site already matches the sheet.")):p.status===429?(d.textContent="rate limited",T("Too many attempts \u2014 wait a few minutes.")):(d.textContent="sync failed",T("Sync failed: "+(f.error||p.status)))}catch{d.textContent="network error",T("Sync failed (network).")}l.disabled=!1});async function m(l){let d=!!(l&&l.silent),p=rt()||(d?"":(window.prompt("Admin password:")||"").trim());if(!p){T(d?'Saved here \u2014 auto-publish needs a stored password. Use "Publish to everyone".':"Publish cancelled.");return}Ct=!0;let f=P(),g={},y=[];for(let[S,R]of Object.entries(f.matchEdits||{}))S.startsWith("a:")&&(g[S]=R);for(let S of f.matchRemoved||[])S.startsWith("a:")&&y.push(S);let $=B().filter(S=>S.admin).map(S=>({a:S.a,b:S.b,sa:S.sa,sb:S.sb,date:S.date||""})),M={matches:$,aliases:f.aliases||{},aliasNotes:f.aliasNotes||{},aliasRemoved:f.aliasRemoved||[],inactive:f.inactive||[],seeds:f.seeds||{},seedGlicko:f.seedGlicko||{},seedRd:f.seedRd||{},seedRemoved:f.seedRemoved||[],settings:f.settings||{},matchEdits:g,matchRemoved:y,faq:f.faq!=null?f.faq:[]};try{let S=await fetch(pt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:p,doc:M,message:`Publish match log (${$.length} matches)`})}),R=await S.json().catch(()=>({}));if(!S.ok||!R.ok){S.status===403&&sessionStorage.removeItem(Z),T("Publish failed: "+(R.error||"HTTP "+S.status));return}window.LB_PUB=M,window.LB_LOG=$,Me([]),W({}),Q(),d||J(),T(d?"Saved \u2014 live for everyone \u2713":"Published! Everyone sees it on their next visit.")}catch{T("Publish failed: network error.")}finally{Ct=!1}}u("#admin-export").addEventListener("click",()=>{let l=new Blob([JSON.stringify(te(),null,2)],{type:"application/json"}),d=document.createElement("a");d.href=URL.createObjectURL(l),d.download="match-log.json",d.click(),URL.revokeObjectURL(d.href),T("Log exported.")}),u("#ov-inact-toggle").addEventListener("click",()=>{let l=u("#ov-inact-n").value.trim();if(!l){T("Type a player name first.");return}let d=G(),p=P().inactive||[],f=p.includes(l)?p.filter(g=>g!==l):[...p,l];W({...d,inactive:f}),Q(),J(),T(f.includes(l)?`${l} marked inactive.`:`${l} marked active again.`)}),u("#ov-inact-list").addEventListener("click",l=>{let d=l.target.closest("[data-inact-del]");if(!d)return;let p=G();W({...p,inactive:(P().inactive||[]).filter(f=>f!==d.dataset.inactDel)}),Q(),J()}),u("#ov-settings").addEventListener("change",l=>{let d=l.target.closest("[data-set-name]");if(!d)return;let p=G();W({...p,settings:{...p.settings||{},[d.dataset.setName]:d.value}}),Q(),J(),T("Setting applied \u2014 everything recalculated.")}),u("#ov-set-reset").addEventListener("click",()=>{let l=G();W({...l,settings:{}}),Q(),J(),T("Settings back to the master sheet values.")});let c=()=>{let l=gt();u("#faq-admin-list").innerHTML=l.map((d,p)=>`
      <div class="log-item fix-row" data-faq-idx="${p}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${b(String(d.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${b(String(d.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${p}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${p}" title="Delete question">${n}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};c(),u("#faq-admin-list").addEventListener("click",l=>{let d=l.target.closest("[data-faq-save]"),p=l.target.closest("[data-faq-del]"),f=gt().map(y=>({...y}));if(d){let y=d.closest("[data-faq-idx]");f[parseInt(d.dataset.faqSave,10)]={q:y.querySelector('[data-fq="q"]').value.trim(),a:y.querySelector('[data-fq="a"]').value.trim()}}else if(p)f.splice(parseInt(p.dataset.faqDel,10),1);else return;let g=G();W({...g,faq:f}),c(),T("Q&A updated \u2014 publish to make it public.")}),u("#faq-add").addEventListener("click",()=>{let l=u("#faq-new-q").value.trim(),d=u("#faq-new-a").value.trim();if(!l||!d){T("Fill in both the question and the answer.");return}let p=G();W({...p,faq:[...gt().map(f=>({...f})),{q:l,a:d}]}),c(),T("Question added.")}),u("#faq-reset").addEventListener("click",()=>{let l=G();W({...l,faq:null}),c(),T("Q&A back to the built-in list.")}),window._fbTimer&&(clearInterval(window._fbTimer),window._fbTimer=null);async function o(){let l=u("#fb-inbox");if(!l||document.querySelector("#fb-inbox [data-fb-reply]:focus"))return;let d=rt();if(!d){l.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let p=await fetch(K+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:d})}),f=await p.json().catch(()=>({}));if(!p.ok||!f.ok){l.innerHTML=`<div class="empty">Could not load messages (${b(f.error||"HTTP "+p.status)}).</div>`;return}let g=f.items||[],y={};l.querySelectorAll("[data-fb-id]").forEach($=>{let M=$.querySelector("[data-fb-reply]");M&&M.value&&(y[$.dataset.fbId]=M.value)}),l.innerHTML=g.map($=>`
        <div class="log-item fb-row${$.resolved?" fb-done":""}" data-fb-id="${b($.id)}" data-fb-resolved="${$.resolved?"1":""}">
          <div class="txt">
            <b>${b($.name||"Anonymous")}</b>${$.contact?` <span style="color:var(--dimmer)">\xB7 ${b($.contact)}</span>`:""}
            <span class="mono" style="color:var(--dimmer);font-size:11px;margin-left:6px">ticket ${b($.id)}</span>
            ${$.resolved?'<span class="tag resolved" style="margin-left:6px">resolved \u2713</span>':`<span class="tag ${$.status==="replied"?"live":"fresh"}" style="margin-left:6px">${b($.status)}</span>`}
            <div style="color:var(--dim);font-size:13px;margin-top:4px">${b($.message)}</div>
            ${$.reply?`<div style="color:var(--gold);font-size:12.5px;margin-top:4px">\u21A9 ${b($.reply)}</div>`:""}
          </div>
          <input class="set-val fb-reply-in" data-fb-reply placeholder="Write a reply\u2026" value="${b($.reply||"")}">
          <button class="icon-btn" data-fb-send title="Send reply"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-resolve title="${$.resolved?"Reopen \u2014 mark as not resolved":"Mark as resolved"}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.6L16 9.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-del title="Delete message">${n}</button>
        </div>`).join("")||'<div class="empty">No messages yet.</div>',l.querySelectorAll("[data-fb-id]").forEach($=>{let M=$.querySelector("[data-fb-reply]");M&&y[$.dataset.fbId]!=null&&(M.value=y[$.dataset.fbId])})}catch{l.innerHTML='<div class="empty">Network error loading messages.</div>'}}o(),u("#fb-refresh").addEventListener("click",()=>{o(),T("Inbox refreshed.")}),window._fbTimer=setInterval(()=>{if(!u("#fb-inbox")){clearInterval(window._fbTimer),window._fbTimer=null;return}document.hidden||o()},2e3),u("#fb-inbox").addEventListener("click",async l=>{let d=l.target.closest("[data-fb-send]"),p=l.target.closest("[data-fb-del]"),f=l.target.closest("[data-fb-resolve]");if(!d&&!p&&!f)return;let g=l.target.closest("[data-fb-id]"),y=g.dataset.fbId,$=rt();try{if(f){let M=g.dataset.fbResolved!=="1";if(!(await fetch(K+"/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:$,id:y,resolved:M})}).then(R=>R.json())).ok){T("Could not update \u2014 try again.");return}T(M?"Marked as resolved \u2713":"Message reopened."),o()}else if(d){let M=g.querySelector("[data-fb-reply]").value;if(!(await fetch(K+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:$,id:y,reply:M})}).then(R=>R.json())).ok){T("Reply failed.");return}T("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(K+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:$,id:y})}).then(S=>S.json())).ok){T("Delete failed.");return}g.remove(),T("Message deleted.")}}catch{T("Network error.")}})}var vt=document.getElementById("fl-cards");vt&&window.matchMedia("(hover: hover)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(vt.addEventListener("pointermove",e=>{let s=e.target.closest&&e.target.closest(".fl-card");if(!s)return;let a=s.getBoundingClientRect(),n=(e.clientX-a.left)/a.width-.5,r=(e.clientY-a.top)/a.height-.5;s.classList.add("tilt"),s.style.transform=`perspective(1000px) rotateY(${(n*7).toFixed(2)}deg) rotateX(${(-r*6).toFixed(2)}deg) translateY(-6px)`}),vt.addEventListener("pointerleave",()=>{vt.querySelectorAll(".fl-card").forEach(e=>{e.style.transform="",e.classList.remove("tilt")})}));u("#search").addEventListener("input",e=>{let s=e.target.value.trim().toLowerCase(),a=u("#search-drop");if(!s){a.classList.remove("show");return}let n=H.players.filter(r=>r.name.toLowerCase().includes(s)).slice(0,8);if(!n.length){a.classList.remove("show");return}a.innerHTML=n.map(r=>`
    <a class="drop-row" href="#/player/${D(r.name)}">
      ${r.rank?$t(r.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${b(r.name)}</span>        <span class="mono" style="margin-left:auto;color:var(--dim)">${bt(r,!0)}</span>
    </a>`).join(""),a.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||u("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(u("#search-drop").classList.remove("show"),u("#search").value="")});var K=pt.replace(/\/publish$/,"/feedback"),Mt="tt1v1_fb_tickets";function ze(){try{return JSON.parse(localStorage.getItem(Mt)||"[]")}catch{return[]}}function Ve(e){let s=ze();s.push({id:e,ts:Date.now()});try{localStorage.setItem(Mt,JSON.stringify(s.slice(-20)))}catch{}}function Qe(){let e=u("#fb-overlay"),s=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>u("#fb-msg").focus(),180)},a=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};u("#fab-feedback").addEventListener("click",s),u("#fb-close").addEventListener("click",a),u("#fb-done").addEventListener("click",a),e.addEventListener("click",o=>{o.target===e&&a()}),document.addEventListener("keydown",o=>{o.key==="Escape"&&e.classList.contains("show")&&a()});let n=u("#faq-feedback-btn");n&&n.addEventListener("click",s);let r=u("#fb-msg"),v=u("#fb-count-n");r.addEventListener("input",()=>{v.textContent=String(r.value.length);try{localStorage.setItem("tt1v1_fb_draft",r.value)}catch{}});try{let o=localStorage.getItem("tt1v1_fb_draft");o&&(r.value=o,v.textContent=String(o.length))}catch{}let m=u("#fb-send");m.addEventListener("click",async()=>{let o=r.value.trim();if(o.length<5){r.focus(),r.classList.add("fb-nudge"),setTimeout(()=>r.classList.remove("fb-nudge"),500),T(t("fb.writeFirst"));return}m.classList.add("busy"),m.disabled=!0;try{let l=await fetch(K,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:u("#fb-name").value.trim(),contact:u("#fb-contact").value.trim(),message:o})}),d=await l.json().catch(()=>({}));if(!l.ok||!d.ok){T(t("fb.couldNotSend",{err:d.error||"HTTP "+l.status}));return}Ve(d.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}u("#fb-ticket-code").textContent=d.id,u("#fb-view-form").hidden=!0,u("#fb-view-done").hidden=!1}catch{T(t("fb.netError"))}finally{m.classList.remove("busy"),m.disabled=!1}});let c=document.querySelector(".fb-ticket");c&&c.addEventListener("click",async()=>{let o=(u("#fb-ticket-code").textContent||"").trim();if(!o||o==="\u2014")return;try{await navigator.clipboard.writeText(o)}catch{let p=document.createElement("textarea");p.value=o,document.body.appendChild(p),p.select();try{document.execCommand("copy")}catch{}p.remove()}let l=u("#fb-copied");l&&(l.classList.add("show"),clearTimeout(window._fbCopiedT),window._fbCopiedT=setTimeout(()=>l.classList.remove("show"),1800)),T(t("fb.ticketCopied"))}),u("#fb-check").addEventListener("click",async()=>{let o=u("#fb-ticket-in").value.trim(),l=u("#fb-reply-out");if(o){l.classList.add("show"),l.textContent=t("fb.checking");try{let d=await fetch(K+"/status?id="+encodeURIComponent(o)),p=await d.json().catch(()=>({}));if(!d.ok||!p.ok){l.textContent=t("fb.noTicket");return}l.innerHTML=p.resolved?`${t("fb.statusResolved")}${p.reply?`<br>${t("fb.replyFrom",{reply:b(p.reply)})}`:""}`:p.reply?t("fb.replyFrom",{reply:b(p.reply)}):t("fb.statusPending",{status:b(p.status)})}catch{l.textContent=t("fb.netErrorShort")}}})}function Ke(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let s=null,a=null,n=null,r=0,v=0,m=0,c=p=>{let f=p&&p.closest?p.closest("[title],[data-tip]"):null;return f&&f.hasAttribute("title")&&(f.setAttribute("data-tip",f.getAttribute("title")),f.removeAttribute("title")),f&&f.getAttribute("data-tip")?f:null},o=(p,f)=>{let g=e.offsetWidth,y=e.offsetHeight,$=p+14,M=f+18;$+g>window.innerWidth-8&&($=p-g-14),M+y>window.innerHeight-8&&(M=f-y-14),$=Math.max(8,$),M=Math.max(8,M);let S=e.classList.contains("show")&&e.style.left?Math.abs(parseFloat(e.style.left)-$)+Math.abs(parseFloat(e.style.top)-M)<150:!1;e.classList.toggle("snap",!S),e.style.left=$+"px",e.style.top=M+"px"},l=(p,f,g)=>{s=p,e.textContent=p.getAttribute("data-tip"),o(f,g),e.classList.add("show")},d=()=>{clearTimeout(a),clearTimeout(n),a=n=null,e.classList.remove("show"),s=null};document.addEventListener("mousemove",p=>{v=p.clientX,m=p.clientY;let f=c(p.target);if(f){if(clearTimeout(n),n=null,f===s){e.classList.contains("show")&&(cancelAnimationFrame(r),r=requestAnimationFrame(()=>o(v,m)));return}clearTimeout(a),e.classList.contains("show")?l(f,v,m):a=setTimeout(()=>l(f,v,m),90);return}s&&!n&&(n=setTimeout(d,110))},{passive:!0}),window.addEventListener("scroll",d,{passive:!0}),document.addEventListener("mousedown",d,{passive:!0})}var Wt;function T(e){let s=u("#toast");s.textContent=e,s.classList.add("show"),clearTimeout(Wt),Wt=setTimeout(()=>s.classList.remove("show"),2600)}var nt;function Et(){nt&&nt.disconnect(),nt=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&(s.target.classList.add("in"),j(".cu",s.target).forEach(a=>yt(a,parseFloat(a.dataset.target),{dec:parseInt(a.dataset.dec||0)})),nt.unobserve(s.target))})},{threshold:.12}),j(".reveal").forEach(e=>nt.observe(e))}(function(){let s=u("#scroll-progress"),a=u("#to-top"),n=u("#page-home .hero-row"),r=document.querySelector(".topbar"),v=!1,m=()=>{v=!1;let o=window.scrollY,l=document.documentElement.scrollHeight-window.innerHeight;s&&(s.style.transform=`scaleX(${l>0?Math.min(1,o/l):0})`),a&&a.classList.toggle("show",o>640),r&&r.classList.toggle("scrolled",o>10),n&&o<1400&&(n.style.transform=`translateY(${o*.14}px)`,n.style.opacity=String(Math.max(.3,1-o/950)))},c=()=>{v||(v=!0,requestAnimationFrame(m))};window.addEventListener("scroll",c,{passive:!0}),a&&a.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),m()})();var oe=()=>{};window.lbScrollNow=e=>{oe(),window.scrollTo({top:e||0,behavior:"instant"})};(function(){if(matchMedia("(prefers-reduced-motion: reduce)").matches||!matchMedia("(pointer: fine)").matches)return;let s=window.scrollY,a=s,n=0,r=()=>Math.max(0,document.documentElement.scrollHeight-window.innerHeight),v=c=>{a=c,window.scrollTo({top:c,behavior:"instant"})};oe=()=>{n&&(cancelAnimationFrame(n),n=0),s=a=window.scrollY};function m(){let c=s-a;if(Math.abs(c)<.5){v(s),n=0;return}v(a+c*.16),n=requestAnimationFrame(m)}window.addEventListener("wheel",c=>{if(c.ctrlKey||c.defaultPrevented||c.deltaY===0)return;let o=c.target instanceof Element?c.target:null;if(o&&o.closest("textarea, input, select, [data-native-scroll]"))return;for(let d=o;d&&d!==document.documentElement;d=d.parentElement){let p=getComputedStyle(d).overflowY;if((p==="auto"||p==="scroll")&&d.scrollHeight>d.clientHeight+1){if(!(c.deltaY>0?d.scrollTop+d.clientHeight>=d.scrollHeight-1:d.scrollTop<=0))return;break}}c.preventDefault();let l=c.deltaY;c.deltaMode===1?l*=16:c.deltaMode===2&&(l*=window.innerHeight),s=Math.min(r(),Math.max(0,s+l)),n||(n=requestAnimationFrame(m))},{passive:!1}),window.addEventListener("scroll",()=>{n||(s=a=window.scrollY)},{passive:!0})})();window.lbCards={topOf:()=>I,all:()=>H.players,byName:()=>F,histOf:kt,h2hOf:zt,deltaTag:Lt,resLetter:q,fmtDate:X,canon:O,allMatches:B,ratingTimeline:is,altsOf:Yt};Q();_t();xt();Qe();Ke();window.addEventListener("lb-lang",()=>{let e=window.scrollY,s=z,a={...C};xt(),u("#page-home").classList.contains("active")&&(s!=="all"||a.key!=="rank"||a.dir!==1)&&(z=s,C=a,j(".chip[data-filter]").forEach(n=>n.classList.toggle("on",n.dataset.filter===s)),Ft(),st(s,a.key,a.dir)),Bt(),window.lbScrollNow(e)});function it(e,s){let a=e.indexOf("window."+s);if(a<0)return null;let n=e.indexOf("=",a);for(;n<e.length&&"{[".indexOf(e[n])<0;)n++;let r=0,v=!1,m="",c=!1;for(let o=n;o<e.length;o++){let l=e[o];if(v){c?c=!1:l==="\\"?c=!0:l===m&&(v=!1);continue}if(l==='"'||l==="'"){v=!0,m=l;continue}if(l==="{"||l==="[")r++;else if((l==="}"||l==="]")&&(r--,r<=0))return JSON.parse(e.slice(n,o+1))}return null}var Gt="https://tierstats.github.io/";async function Jt(e,s){for(let a of e)try{let n=await fetch(a+(a.includes("?")?"&":"?")+s,{cache:"no-store"});if(n.ok)return await n.text()}catch{}return null}async function Tt(e){try{let s="cb="+Date.now(),[a,n]=await Promise.all([Jt([Gt+"data.js","data.js"],s),Jt([Gt+"log.js","log.js"],s)]);if(!a||!n)throw new Error("data unavailable");let r=it(a,"LB_TANKS");r&&(window.LB_TANKS={...window.LB_TANKS_SNAPSHOT||{},...r});let v=it(a,"LB_DATA"),m=it(n,"LB_PUB")||(it(n,"LB_LOG")?{matches:it(n,"LB_LOG")}:null),c=[];if(v&&JSON.stringify(v)!==JSON.stringify(N)&&(N=v,window.LB_DATA=v,c.push("data")),m&&JSON.stringify(m)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=m,window.LB_LOG=m.matches||[],c.push("log")),c.length){Q(),_t(),xt();let o=u("#last-updated");o&&(o.textContent=t("home.lastUpdated",{when:X(N.generated)||"today"}))}e&&T(c.length?t("misc.refreshed"):t("misc.upToDate"))}catch{e&&T(t("misc.refreshFailed"))}}Tt(!1);var ft=u("#lb-refresh-btn");ft&&ft.addEventListener("click",async()=>{ft.classList.add("spinning"),await Tt(!0),setTimeout(()=>ft.classList.remove("spinning"),400)});setInterval(()=>Tt(!1),6e4);document.addEventListener("visibilitychange",()=>{document.hidden||Tt(!1)});var re="tt1v1_fb_seen",U=null;function Ze(){try{return JSON.parse(localStorage.getItem(Mt)||"[]")}catch{return[]}}function ce(){try{return JSON.parse(localStorage.getItem(re)||"{}")||{}}catch{return{}}}function Xe(){let e=u("#fab-feedback");if(e&&!e.querySelector(".fb-dot")){let a=document.createElement("span");a.className="fb-dot",e.appendChild(a),requestAnimationFrame(()=>a.classList.add("in"))}let s=u("#fb-view-form");if(s&&!u("#fb-reply-banner")&&U){let a=document.createElement("div");a.id="fb-reply-banner",a.innerHTML=`${t("fb.teamReplied",{id:b(U.id)})}
      <div class="r">${b(U.reply)}</div>
      <button class="btn btn-ghost" id="fb-got-it" style="margin-top:9px;padding:6px 13px">${t("fb.gotIt")}</button>`,s.insertAdjacentElement("beforebegin",a),requestAnimationFrame(()=>a.classList.add("show")),u("#fb-got-it").addEventListener("click",ts)}}function ts(){if(U){let a=ce();a[U.id]=1;try{localStorage.setItem(re,JSON.stringify(a))}catch{}U=null}let e=u(".fb-dot");e&&(e.classList.add("out"),setTimeout(()=>e.remove(),420));let s=u("#fb-reply-banner");s&&(s.classList.remove("show"),setTimeout(()=>s.remove(),420))}async function le(){let e=ce();U=null;let s=Ze(),a=s.slice(0,Math.max(0,s.length-6)),n=[];for(let r of s.slice(-6))try{let v=await fetch(K+"/status?id="+encodeURIComponent(r.id),{cache:"no-store"}),m=await v.json().catch(()=>({}));if(v.status===404||v.ok&&m.ok===!1)continue;n.push(r),v.ok&&m.ok&&m.reply&&!e[r.id]&&!U&&(U={id:r.id,reply:m.reply})}catch{n.push(r)}if(n.length!==s.slice(-6).length)try{localStorage.setItem(Mt,JSON.stringify([...a,...n]))}catch{}U&&Xe()}setTimeout(le,3500);setInterval(le,9e4);var es=pt.replace(/\/publish$/,"/api/ttstats"),ss=15e3;function as(e,s){let a=e&&e.stats||{};return s==="kd"?a.deaths?a.kills/a.deaths:a.kills!=null?a.kills:null:a[s]!=null?a[s]:null}function ns(e){let s=a=>String(a).replace(/["\\]/g,"\\$&");Object.keys(e).forEach(a=>{let n=e[a];window.LB_TANKS=Object.assign({},window.LB_TANKS||{},{[a]:n}),document.querySelectorAll(`[data-live-name="${s(a)}"][data-live]`).forEach(r=>{let v=r.dataset.live;if(v==="badge"){r.textContent=t("cards.badge",{n:n&&n.badge||"0"});return}let m=as(n,v);if(m==null)return;let c=v==="kd"&&n.stats&&n.stats.deaths?2:0,o=Number(m.toFixed(c)),l=parseFloat(String(r.textContent).replace(/[^0-9.\-]/g,""));(isNaN(l)||l!==o)&&yt(r,o,{dec:c,dur:900})}),document.querySelectorAll(`canvas[data-tank-name="${s(a)}"]`).forEach(r=>{r.dataset.mounted&&window.TankRender&&window.TankRender.render(r,n,r.dataset.tankSize||"medium")})})}(function(){let s=!1,a=async()=>{if(s||document.visibilityState!=="visible")return;let n=new Set;document.querySelectorAll("[data-live-name]").forEach(v=>n.add(v.dataset.liveName)),document.querySelectorAll("canvas[data-tank-name]").forEach(v=>n.add(v.dataset.tankName));let r=[...n].filter(Boolean).slice(0,12);if(r.length){s=!0;try{let m=await(await fetch(es+"?names="+encodeURIComponent(r.join(",")),{cache:"no-store"})).json();m&&m.ok&&m.tanks&&ns(m.tanks)}catch{}s=!1}};setTimeout(a,2500),setInterval(a,ss)})();function is(){let e={},s=(c,o,l,d)=>{let p=o-x.conservative*l;(!e[c]||p>e[c].rating)&&(e[c]={rating:p,date:d||""})},a={},n=c=>{if(!a[c]){let[o,l]=ae(c);a[c]={r:o,rd:l,lastIdx:null}}return a[c]},r={};for(let c of B()){if(c.date)continue;let o=c.sa>c.sb?1:c.sa<c.sb?0:.5;(r[c.a]=r[c.a]||[]).push([c.b,o]),(r[c.b]=r[c.b]||[]).push([c.a,1-o]),n(c.a).lastIdx=Y,n(c.b).lastIdx=Y}let v={};for(let c in r)v[c]=[n(c).r,n(c).rd];for(let c in r){let o=n(c),[l,d]=wt(o.r,o.rd,r[c].map(([p,f])=>[v[p][0],v[p][1],f]));o.r=l,o.rd=d,s(c,l,d,x.graceStart)}let m=new Map;for(let c of B().filter(o=>o.date).slice().reverse()){let o=St(c.date);m.has(o)||m.set(o,[]),m.get(o).push({a:O(c.a),b:O(c.b),sa:+c.sa,sb:+c.sb,date:c.date})}for(let c of[...m.keys()].sort((o,l)=>o-l)){for(let p in a){let f=a[p],g=c-(f.lastIdx==null?Y:f.lastIdx);g>0&&(f.rd=Math.min(Math.sqrt(f.rd*f.rd+x.growth*x.growth*g),x.maxRd))}let o={},l="";for(let p of m.get(c)){let f=p.sa>p.sb?1:p.sa<p.sb?0:.5;(o[p.a]=o[p.a]||[]).push([p.b,f]),(o[p.b]=o[p.b]||[]).push([p.a,1-f]),n(p.a).lastIdx=c,n(p.b).lastIdx=c,p.date>l&&(l=p.date)}let d={};for(let p in o)d[p]=[n(p).r,n(p).rd];for(let p in o){let f=n(p),[g,y]=wt(f.r,f.rd,o[p].map(([$,M])=>[d[$][0],d[$][1],M]));f.r=g,f.rd=y,s(p,g,y,l)}}return e}})();
