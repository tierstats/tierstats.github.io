/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var N=window.LB_DATA,pt="https://tierstats-publish.tierstats.workers.dev/publish",m=(e,s=document)=>s.querySelector(e),O=(e,s=document)=>[...s.querySelectorAll(e)],y=e=>String(e).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),D=e=>encodeURIComponent(String(e)),At=e=>decodeURIComponent(e);function yt(e,s,a={}){let n=a.dur||1200,r=a.dec||0,v=performance.now(),f=parseFloat(e.textContent)||0;function c(i){let d=Math.min(1,(i-v)/n),p=1-Math.pow(1-d,3);e.textContent=(f+(s-f)*p).toFixed(r),d<1&&requestAnimationFrame(c)}requestAnimationFrame(c),setTimeout(()=>{e.textContent=s.toFixed(r)},n+300)}var ve='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',fe='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function $t(e,s=""){let a=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",n=e<=3?e===1?ve:fe:"";return`<div class="rank-badge ${a} ${s}" title="${t("home.rankTip",{n:e})}">${n}<span class="num">${e}</span></div>`}var T=e=>t(e==="W"?"rec.wLetter":e==="L"?"rec.lLetter":"rec.dLetter"),_={},j=[],H={players:[],byName:{},qualified:[]},it={},ut={},X={},Rt=new Set,Ft={prevRatings:{},prevRanks:{}};function ue(){try{localStorage.removeItem("tt1v1_baseline")}catch{}Ft={prevRatings:{...N.prevRatings||{}},prevRanks:{...N.prevRanks||{}}}}function me(){for(let a in it)delete it[a];let e=new Set(I().aliasRemoved||[]);Object.entries(N.aliases).forEach(([a,n])=>{e.has(a)||(it[a.toLowerCase()]=n)}),Object.entries(I().aliases||{}).forEach(([a,n])=>{it[String(a).toLowerCase()]=n});for(let a of Object.keys(ut))delete ut[a];for(let a of Object.keys(X))delete X[a];Rt.clear();let s=(a,n)=>{Object.keys(a||{}).forEach(r=>{let v=C(r);v!==r&&(n[v]=a[r])}),Object.keys(a||{}).forEach(r=>{let v=C(r);v===r&&(n[v]=a[r])})};s(N.seeds,ut),s(Ft.prevRatings,X),(N.inactiveList||[]).forEach(a=>Rt.add(C(a)))}var Ct={},Dt=e=>String(e).toLowerCase().replace(/[^a-z0-9]/g,"").replace(/0/g,"o").replace(/1/g,"i").replace(/3/g,"e").replace(/5/g,"s");function he(e,s){if(Math.abs(e.length-s.length)>3)return 99;let a=Array.from({length:s.length+1},(n,r)=>r);for(let n=1;n<=e.length;n++){let r=[n];for(let v=1;v<=s.length;v++)r[v]=Math.min(a[v]+1,r[v-1]+1,a[v-1]+(e[n-1]===s[v-1]?0:1));if(a=r,Math.min(...a)>3)return 99}return a[s.length]}function ge(){let e={},s=new Set(I().aliasRemoved||[]),a=r=>{let v=String(r).trim(),f=C(v);!v||Dt(v)===Dt(f)||he(v.toLowerCase(),f.toLowerCase())<=2||(e[f]=e[f]||[]).push(v)};Object.keys(N.aliases).forEach(r=>{s.has(r)||a(r)}),Object.keys(I().aliases||{}).forEach(a);for(let r of Object.keys(e)){let v=new Set([r.toLowerCase()]);e[r]=e[r].filter(f=>{let c=f.toLowerCase();return v.has(c)?!1:(v.add(c),!0)}).sort((f,c)=>f.localeCompare(c))}let n=N.cards&&N.cards.alts||{};Object.keys(n).forEach(r=>{let v=C(r),f=n[r];e[v]=(Array.isArray(f)?f:String(f||"").split(/[,;]/)).map(c=>String(c).trim()).filter(Boolean)}),Ct=e}function Yt(e){return Ct[e]||Ct[C(e)]||[]}function be(e){let s=Yt(e);if(!s.length)return"";let a=s.slice(0,2).join(", ")+(s.length>2?` +${s.length-2}`:"");return`<div class="p-alt" title="${y(s.join(", "))}">${t("lb.aka",{names:y(a)})}</div>`}var C=e=>{let s=String(e).trim(),a=new Set;for(;;){let n=it[s.toLowerCase()];if(!n||n===s||a.has(s))return s;a.add(s),s=n}};function kt(e){let s=[];return B().forEach(a=>{let n=(r,v,f)=>({opp:r,for_:v,against:f,res:v>f?"W":v<f?"L":"D",date:a.date});a.a===e?s.push(n(a.b,a.sa,a.sb)):a.b===e&&s.push(n(a.a,a.sb,a.sa))}),s}function zt(e){let s={};return kt(e).forEach(a=>{let n=s[a.opp]||(s[a.opp]={w:0,l:0,d:0,pf:0,pa:0});n[a.res.toLowerCase()]+=1,n.pf+=a.for_,n.pa+=a.against}),Object.entries(s).map(([a,n])=>({opp:a,...n})).sort((a,n)=>n.w+n.l+n.d-(a.w+a.l+a.d)||n.w-a.w)}function we(e){let s=_[e]||{};return s.provisional?`<span class="tag prov">${t("tag.provisional")}</span>`:s.inactive?`<span class="tag inact">${t("tag.inactive")}</span>`:""}function ye(e){let s=kt(e).slice(0,5).reverse();if(!s.length)return"";let a=s.map(n=>T(n.res)).join(" ");return`<span class="form" title="${t("form.title",{n:s.length,seq:a})}">${s.map(n=>`<i class="${n.res.toLowerCase()}">${T(n.res)}</i>`).join("")}</span>`}function Lt(){let e=typeof getLang=="function"?getLang():"en";return{en:"en-US",zh:"zh-CN",ja:"ja-JP",ru:"ru-RU"}[e]||"en-US"}function Vt(e){let s=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||"").slice(0,10));return s?new Date(+s[1],+s[2]-1,+s[3]):null}function V(e){let s=Vt(e);if(!s)return"";let a=s.getFullYear()===new Date().getFullYear();try{return new Intl.DateTimeFormat(Lt(),a?{month:"short",day:"numeric"}:{year:"numeric",month:"short",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Kt(e){let s=Vt(e);if(!s)return"";try{return new Intl.DateTimeFormat(Lt(),{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Qt(e){let s=new Date(Number(e)*1e3);if(!Number.isFinite(s.getTime()))return"";try{return new Intl.DateTimeFormat(Lt(),{dateStyle:"medium",timeStyle:"short"}).format(s)}catch{return s.toISOString().slice(0,16).replace("T"," ")}}function Zt(e){let s=Math.floor(Date.now()/1e3)-Number(e);if(!Number.isFinite(s))return"";let a=[["year",31536e3],["month",2592e3],["week",604800],["day",86400],["hour",3600],["minute",60]];try{let n=new Intl.RelativeTimeFormat(Lt(),{numeric:"auto"});for(let[r,v]of a)if(s>=v)return n.format(-Math.floor(s/v),r);return n.format(-Math.max(0,s),"second")}catch{let r=Math.floor(s/86400);return r>0?r+"d":"<1d"}}function St(e){let s=e.delta!=null?e.delta:0;if(Math.abs(s)<.05)return"";let a=s>0,n=Math.abs(s).toFixed(1);return`<span class="delta ${a?"up":"down"}" title="${a?t("delta.upTitle",{n}):t("delta.downTitle",{n})}">${a?"\u25B2":"\u25BC"} ${n}</span>`}function $e(){let e=Ft.prevRanks||{},s=Object.keys(e);if(s.length){let r={};return s.forEach(v=>{r[C(v)]=e[v]}),r}let a={};j.forEach(r=>{X[r.name]!=null&&(a[r.name]=X[r.name])});let n={};return Object.entries(a).sort((r,v)=>v[1]-r[1]).forEach(([r],v)=>{n[r]=v+1}),n}function ke(e,s){let a=s[e.name]!=null?s[e.name]:s[C(e.name)];if(a==null){let r=(N.newSince||{})[e.name];return!r||(Date.now()-Date.parse(r))/864e5>5?"":`<span class="mv new" title="${t("mv.newTitle")}">${t("mv.new")}</span>`}let n=a-e.rank;return n>0?`<span class="mv up" title="${tp("mv.up",n)}">\u25B2${n}</span>`:n<0?`<span class="mv down" title="${tp("mv.down",-n)}">\u25BC${-n}</span>`:""}function dt(e){return`${Math.round(e.rating-100)} \u2013 ${Math.round(e.rating+100)}`}function bt(e,s){if(!e.provisional)return e.rating.toFixed(1);let a=s?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:dt(e);return`<span class="prov-range" title="${t("rating.provTitle")}">${a}</span>`}var Xt="tt1v1_admin_log_v1",tt="tt1v1_admin_ok",z="tt1v1_admin_pw",Le=()=>sessionStorage.getItem(tt)==="1"||localStorage.getItem(tt)==="1",ot=()=>sessionStorage.getItem(z)||localStorage.getItem(z)||"";function Se(e,s){s?(localStorage.setItem(tt,"1"),localStorage.setItem(z,e)):(sessionStorage.setItem(tt,"1"),sessionStorage.setItem(z,e),localStorage.removeItem(tt),localStorage.removeItem(z))}function xe(){[sessionStorage,localStorage].forEach(e=>{e.removeItem(tt),e.removeItem(z)})}var Ht=null,Ot=!1;function te(){Ot||!ot()||(clearTimeout(Ht),Ht=setTimeout(()=>publishLog({silent:!0}),1500))}var Me=pt.replace(/\/publish$/,"/verify"),Ee=pt.replace(/\/publish$/,"/sync");function ee(){try{return JSON.parse(localStorage.getItem(Xt)||"[]")}catch{return[]}}function Te(e){try{localStorage.setItem(Xt,JSON.stringify(e))}catch{}te()}var se="tt1v1_admin_over_v1";function Q(){try{return JSON.parse(localStorage.getItem(se)||"{}")||{}}catch{return{}}}function K(e){try{localStorage.setItem(se,JSON.stringify(e))}catch{}te()}function I(){let e=window.LB_PUB||{},s=Q(),a=new Set([...e.aliasRemoved||[],...s.aliasRemoved||[]]),n=new Set([...e.seedRemoved||[],...s.seedRemoved||[]]),r=s.aliases||{},v={...s.seeds||{},...s.seedGlicko||{},...s.seedRd||{}},f=g=>Object.fromEntries(Object.entries(g||{}).filter(([b])=>!a.has(b)||r[b]!=null)),c=g=>Object.fromEntries(Object.entries(g||{}).filter(([b])=>!n.has(b)||v[b]!=null)),i=f({...e.aliases||{},...s.aliases||{}}),d=f({...e.aliasNotes||{},...s.aliasNotes||{}}),p=c({...e.seeds||{},...s.seeds||{}}),l=c({...e.seedGlicko||{},...s.seedGlicko||{}}),u=c({...e.seedRd||{},...s.seedRd||{}});return{aliases:i,aliasNotes:d,seeds:p,seedGlicko:l,seedRd:u,aliasRemoved:[...a].filter(g=>i[g]==null),seedRemoved:[...n].filter(g=>p[g]==null&&l[g]==null&&u[g]==null),settings:{...e.settings||{},...s.settings||{}},matchEdits:{...e.matchEdits||{},...s.matchEdits||{}},inactive:s.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...s.matchRemoved||[]])],faq:s.faq!=null?s.faq:e.faq!=null?e.faq:null}}function qe(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function B(){let e=I(),s=e.matchEdits||{},a=new Set(e.matchRemoved||[]),n=(l,u)=>{if(a.has(u))return null;let g=s[u],b=g?{...l,sa:g.sa,sb:g.sb,date:g.date!=null?g.date:l.date}:l;return{...b,a:C(b.a),b:C(b.b),sa:+b.sa,sb:+b.sb,key:u}},r=ee().map((l,u)=>n({...l,admin:!0,published:!1},"l:"+u)).filter(Boolean),v=qe().map((l,u)=>n({...l,admin:!0,published:!0},"p:"+u)).filter(Boolean),f=N.matches.map((l,u)=>n({...l,admin:!1,published:!1},"a:"+u)).filter(Boolean).reverse(),c=l=>{let u=l.a>l.b;return[u?l.b:l.a,u?l.a:l.b,u?l.sb:l.sa,u?l.sa:l.sb,l.date||""].join("|")},i={};f.forEach(l=>{let u=c(l);i[u]=(i[u]||0)+1});let d={};return r.concat(v).filter(l=>{let u=c(l);return d[u]=(d[u]||0)+1,d[u]>(i[u]||0)}).concat(f)}var x={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},mt=864e5,ct=Math.log(10)/400,ae=e=>1/Math.sqrt(1+3*ct*ct*e*e/(Math.PI*Math.PI)),Nt=(e,s,a)=>1/(1+Math.pow(10,-ae(a)*(e-s)/400));function Ae(e){let s=I().seeds||{};return s[e]!=null&&s[e]!==""?Number(s[e]):ut[e]}function ne(e){let s=(I().seedGlicko||{})[e],a=(I().seedRd||{})[e],n=s!=null&&s!==""?Number(s):null,r=a!=null&&a!==""?Number(a):null;if(n!=null||r!=null)return[n??x.unratedR,r??x.unratedRd];let v=Ae(e);return v!=null?[Math.max(x.seedMid+(v-x.oldMid)*x.ptsPer,x.minSeed),x.knownRd]:[x.unratedR,x.unratedRd]}function wt(e,s,a){let n=0,r=0;for(let[f,c,i]of a){let d=ae(c),p=Nt(e,f,c);n+=d*d*p*(1-p),r+=d*(i-p)}if(n*=ct*ct,n<=0)return[e,s];let v=1/(s*s)+n;return[e+ct/v*r,Math.sqrt(1/v)]}function Re(e,s){let a=Math.pow(10,s),n=e*a,r=Math.floor(n);return Math.abs(n-r-.5)<1e-6?(r+1)/a:Math.round(n)/a}var xt=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(x.periodDays*mt)),W=xt(x.graceStart),Ce={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function ie(){let e=I().settings||{};return(N.settings||[]).map(s=>({...s,value:Object.prototype.hasOwnProperty.call(e,s.name)?e[s.name]:s.value}))}function Oe(){for(let e of ie()){let s=Ce[e.name];if(!s)continue;if(s==="graceStart"){let n=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(n)&&(x.graceStart=n);continue}let a=Number(e.value);Number.isFinite(a)&&(x[s]=a)}W=xt(x.graceStart),O(".cons-val").forEach(e=>{e.textContent=String(x.conservative)}),O(".min-matches-val").forEach(e=>{e.textContent=String(x.minMatches)}),O(".min-opp-val").forEach(e=>{e.textContent=String(x.minOpp)})}function Ne(){Oe(),me(),ge();let e={},s=o=>{if(!e[o]){let[h,L]=ne(o);e[o]={name:o,r:h,rd:L,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[o]},a=(o,h,L,$,w,M)=>{let q=s(o);q.games++,q.opps.add(h),L>$?q.w++:L<$?q.l++:q.d++,q.lastIdx=M,w&&(q.lastDate=w)},n={};for(let o of B()){if(o.date)continue;let h=C(o.a),L=C(o.b),$=o.sa>o.sb?1:o.sa<o.sb?0:.5;(n[h]=n[h]||[]).push([L,$]),(n[L]=n[L]||[]).push([h,1-$]),a(h,L,o.sa,o.sb,"",W),a(L,h,o.sb,o.sa,"",W)}let r={};for(let o in n)r[o]=[s(o).r,s(o).rd];for(let o in n){let[h,L]=wt(r[o][0],r[o][1],n[o].map(([$,w])=>[r[$][0],r[$][1],w]));s(o).r=h,s(o).rd=L}let v=new Map;for(let o of B().filter(h=>h.date).slice().reverse()){let h=o.date,L=xt(h);v.has(L)||v.set(L,[]),v.get(L).push({a:C(o.a),b:C(o.b),sa:+o.sa,sb:+o.sb,date:h})}for(let o of[...v.keys()].sort((h,L)=>h-L)){for(let $ in e){let w=e[$],M=o-(w.lastIdx==null?W:w.lastIdx);M>0&&(w.rd=Math.min(Math.sqrt(w.rd*w.rd+x.growth*x.growth*M),x.maxRd))}let h={};for(let $ of v.get(o)){let w=$.sa>$.sb?1:$.sa<$.sb?0:.5;(h[$.a]=h[$.a]||[]).push([$.b,w]),(h[$.b]=h[$.b]||[]).push([$.a,1-w]),a($.a,$.b,$.sa,$.sb,$.date,o),a($.b,$.a,$.sb,$.sa,$.date,o)}let L={};for(let $ in h)L[$]=[s($).r,s($).rd];for(let $ in h){let[w,M]=wt(L[$][0],L[$][1],h[$].map(([q,P])=>[L[q][0],L[q][1],P]));s($).r=w,s($).rd=M}}let f=Object.values(e).map(o=>({name:o.name,glicko:o.r,rd:o.rd,rating:o.r-x.conservative*o.rd,matches:o.games,w:o.w,l:o.l,d:o.d,winPct:o.games?Re(o.w/o.games*100,1):0,opponents:o.opps.size,avgOpp:0,lastMatch:o.lastDate||"",provisional:!(o.games>=x.minMatches&&o.opps.size>=x.minOpp),inactive:!1})),c={};f.forEach(o=>{c[o.name]=o.glicko}),f.forEach(o=>{let h=0;e[o.name].opps.forEach(L=>{h+=c[L]!=null?c[L]:x.unratedR}),o.avgOpp=e[o.name].opps.size?h/e[o.name].opps.size:0});let i=Date.now(),d=Math.floor(i/(x.periodDays*mt));for(let o in e){let h=e[o],L=d-(h.lastIdx==null?W:h.lastIdx);L>0&&(h.rd=Math.min(Math.sqrt(h.rd*h.rd+x.growth*x.growth*L),x.maxRd))}f.forEach(o=>{o.glicko=e[o.name].r,o.rd=e[o.name].rd,o.rating=o.glicko-x.conservative*o.rd;let h=X[o.name],L=(N.curRatings||{})[o.name];o.delta=h!=null?(L??o.rating)-h:0});let p=Date.parse(x.graceStart+"T00:00:00Z")+x.graceDays*mt,l=new Set([...Rt,...I().inactive||[]]);f.forEach(o=>{o.inactive=l.has(o.name)||(o.lastMatch?i-Date.parse(o.lastMatch+"T00:00:00Z")>x.inactiveDays*mt:i>p)});let u={},g={};(N.players||[]).forEach((o,h)=>{let L=C(o.name);u[L]=o,g[L]=h});let b={};f.forEach(o=>{b[o.name]=o}),f.forEach(o=>{let h=u[o.name];h&&(o.rating=h.rating,o.glicko=h.glicko,o.rd=h.rd,o.matches=h.matches,o.w=h.w,o.l=h.l,o.d=h.d,o.winPct=h.winPct,o.opponents=h.opponents,o.avgOpp=h.avgOpp,h.lastMatch&&(o.lastMatch=h.lastMatch))});let k=[];(N.qualified||[]).forEach(o=>{let h=b[C(o.name)];h&&(h.provisional=!1,h.rank=o.rank!=null?o.rank:k.length+1,k.push(h))});let S=new Set(k.map(o=>o.name)),A=f.filter(o=>!S.has(o.name)&&!u[o.name]&&!u[C(o.name)]&&!o.provisional&&!o.inactive).sort((o,h)=>h.rating-o.rating);A.forEach((o,h)=>{o.rank=k.length+h+1});let F=k.concat(A);f.sort((o,h)=>h.rating-o.rating||(g[o.name]!=null?g[o.name]:1e9)-(g[h.name]!=null?g[h.name]:1e9));let J={};return f.forEach(o=>{J[o.name]=o}),{players:f,byName:J,qualified:F}}function lt(){ue(),H=Ne(),_=H.byName,j=H.qualified}var je=["page-home","page-player","page-compare","page-matches","page-cards","page-roster","page-analytics","page-method","page-faq","page-admin"];function Mt(){if(It){It=!1;return}let e=location.hash||"#/";je.forEach(r=>m("#"+r).classList.remove("active"));let s="#/"+(e.split("/")[1]||"");O(".nav a, .foot-nav a").forEach(r=>{let v=r.getAttribute("href");r.classList.toggle("active",v===s||e==="#/"&&v==="#/")});let a=m("#nav-glide"),n=document.querySelector(".nav a.active");if(a&&n&&n.offsetWidth>0?(a.style.width=n.offsetWidth+"px",a.style.transform=`translateX(${n.offsetLeft}px)`,a.style.opacity="1"):a&&(a.style.opacity="0"),e==="#/compare"||e.startsWith("#/compare/")){let r=e.split("/").slice(2).map(At);re(r[0]||"",r[1]||""),m("#page-compare").classList.add("active"),window.lbScrollNow(0)}else if(e.startsWith("#/player/"))He(At(e.slice(9))),m("#page-player").classList.add("active"),window.lbScrollNow(0);else if(e==="#/matches")Ue(),m("#page-matches").classList.add("active"),window.lbScrollNow(0);else if(e==="#/cards")typeof renderCards=="function"&&renderCards(),typeof window.lbLiveStatsTick=="function"&&window.lbLiveStatsTick(),m("#page-cards").classList.add("active"),window.lbScrollNow(0);else if(e.startsWith("#/card/")){typeof renderCards=="function"&&renderCards(),m("#page-cards").classList.add("active"),window.lbScrollNow(0);let r=At(e.slice(7));requestAnimationFrame(()=>{typeof window.cardsFocus=="function"&&window.cardsFocus(r)})}else e==="#/roster"?(We(),m("#page-roster").classList.add("active"),window.lbScrollNow(0)):e==="#/analytics"?(Ge(),m("#page-analytics").classList.add("active"),window.lbScrollNow(0)):e==="#/method"?(Je(),m("#page-method").classList.add("active"),window.lbScrollNow(0)):e==="#/faq"?(Ve(),m("#page-faq").classList.add("active"),window.lbScrollNow(0)):e==="#/admin"?(Z(),m("#page-admin").classList.add("active"),window.lbScrollNow(0)):(Pt(),m("#page-home").classList.add("active"),requestAnimationFrame(Be));Tt()}window.addEventListener("hashchange",Mt);function Pt(){G="all",R={key:"rank",dir:1},O(".chip[data-filter]").forEach(c=>c.classList.toggle("on",c.dataset.filter==="all")),_t();let e=B().length,s=H.players.length,a=j[0],n=Math.round(j.reduce((c,i)=>c+i.rd,0)/j.length),r=m("#hero-chip-matches");r&&(r.innerHTML=t("home.chipMatches",{n:e})),m("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">${t("stat.ranked")}</div>
      <div class="v"><span class="cu" data-target="${j.length}">0</span><small>${t("stat.ofTotal",{n:s})}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.matches")}</div>
      <div class="v"><span class="cu" data-target="${e}">0</span></div></div>
    <div class="stat-card"><div class="k">${t("stat.highest")}</div>
      <div class="v"><span class="cu" data-target="${a.rating}" data-dec="1">0</span><small>${y(a.name)}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.avgRd")}</div>
      <div class="v"><span class="cu" data-target="${n}" data-dec="1">0</span><small>${t("stat.certainty")}</small></div></div>`;let v=[j[1],j[0],j[2]].filter(Boolean);m("#fl-cards").innerHTML=v.map(c=>`
    <div class="fl-card r${c.rank}${c.rank===1?" champ":""} reveal" data-goto="${y(c.name)}">
      <div class="fl-top">
        ${$t(c.rank)}
        <div class="rd">RD ${c.rd.toFixed(0)}</div>
      </div>
      ${c.rank===1?`<div class="champ-tag">${t("home.champTag")}</div>`:""}
      <div class="nm">${y(c.name)}</div>
      <div class="rating">
        <span class="unit">${t("home.ratingUnit")}</span>
        <div class="big-row"><span class="big">${Math.round(c.rating)}</span>${St(c)}</div>
      </div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${c.winPct>=60?"":c.winPct>=40?"mid":"low"}" data-w="${c.winPct}"></div></div>
      </div>
      <div class="meta">
        <span><span class="w">${c.w}${T("W")}</span> <span class="l">${c.l}${T("L")}</span> ${c.d}${T("D")}</span>
        <span class="wc">${c.winPct.toFixed(1)}%</span>
        <span class="opp">${t("home.avgOpp",{n:c.avgOpp.toFixed(1)})}</span>
      </div>
    </div>`).join(""),requestAnimationFrame(()=>{O("#fl-cards .bar-fill").forEach(c=>{c.style.width=c.dataset.w+"%"})}),et(),oe();let f=m("#last-updated");f&&(f.textContent=t("home.lastUpdated",{when:V(N.generated)||"today"}))}function oe(){let e=B().filter(s=>s.date).slice(0,10);m("#battles-grid").innerHTML=e.length?e.map(s=>{let a=s.sa>s.sb,n=s.sb>s.sa;return`
    <div class="battle-row reveal" data-goto="${y(a?s.a:s.b)}">
      <div class="who ${a?"win":"lose"}" data-goto="${y(s.a)}">${y(s.a)}</div>
      <div class="vs">${t("vs")}</div>
      <div class="who r ${n?"win":"lose"}" data-goto="${y(s.b)}">${y(s.b)}</div>
      <div class="sc mono"><span class="${a?"win":"lose"}">${s.sa}</span> \u2013 <span class="${n?"win":"lose"}">${s.sb}</span></div>
      <div class="dt">${V(s.date)||(s.admin&&!s.published?t("battles.justNow"):t("misc.historical"))}</div>
    </div>`}).join(""):`<div class="empty" style="padding:26px;text-align:center;color:var(--dim);grid-column:1/-1">${t("battles.empty")}</div>`}var Ie=500,Fe="cubic-bezier(.22,.8,.24,1)",Pe=12;function _e(e,s){matchMedia("(prefers-reduced-motion: reduce)").matches||O(".lb-row",e).forEach((a,n)=>{let r=s.get(a.dataset.name);if(r===void 0||typeof a.animate!="function")return;let v=r-a.getBoundingClientRect().top;Math.abs(v)<=1||a.animate([{transform:`translateY(${v}px)`},{transform:"none"}],{duration:Ie,easing:Fe,delay:Math.min(n*Pe,220),fill:"backwards"})})}function et(e="all",s="rank",a=1){let n=m("#lb-body"),v=(e==="all"&&ht?j:H.players).slice().map(i=>({...i,rank:i.rank!=null?i.rank:9999}));jt&&(v=v.filter(i=>i.name.toLowerCase().includes(jt))),e==="provisional"?v=v.filter(i=>(_[i.name]||{}).provisional):e==="inactive"?v=v.filter(i=>(_[i.name]||{}).inactive):e==="veterans"?v=v.filter(i=>i.matches>=15):e==="rising"&&(v=v.filter(i=>i.winPct>=60&&i.matches>=5)),v.sort((i,d)=>{let p=i[s],l=d[s];return(typeof p=="string"?p.localeCompare(l):p-l)*a});let f=new Map;O(".lb-row",n).forEach(i=>f.set(i.dataset.name,i.getBoundingClientRect().top));let c=$e();n.innerHTML=v.map(i=>`
    <div class="lb-row ${i.rank<=3?"top"+i.rank:""}" data-name="${y(i.name)}" data-goto="${y(i.name)}">
      <div class="rank">${i.rank<=j.length?$t(i.rank,"sm")+ke(i,c):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="name-stack"><div class="pname">${y(i.name)}</div></div>${typeof cardsRowChip=="function"?cardsRowChip(i.name):""}</div>
      <div class="rating-cell mono">${St(i)}${bt(i,!0)}</div>
      <div class="num-cell mono col-hide">${i.rd.toFixed(1)}</div>
      <div class="num-cell mono col-hide">${i.matches}</div>
      <div class="num-cell mono col-hide"><span class="w">${i.w}</span></div>
      <div class="num-cell mono col-hide"><span class="l">${i.l}</span></div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${i.winPct>=60?"":i.winPct>=40?"mid":"low"}" data-w="${i.winPct}"></div></div>
        <div class="pct mono">${i.winPct.toFixed(1)}%</div>
      </div>
      <div class="num-cell mono col-hide">${i.opponents}</div>
      <div class="num-cell mono col-hide">${i.avgOpp.toFixed(1)}</div>
      <div class="col-status">${we(i.name)||ye(i.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?t("lb.emptyInactive"):e==="provisional"?t("lb.emptyProv"):t("lb.emptyNone")}</div>`,_e(n,f),requestAnimationFrame(()=>{O(".bar-fill",n).forEach(i=>{i.style.width=i.dataset.w+"%"})})}var G="all",R={key:"rank",dir:1},jt="",ht=!0;function _t(){O(".sortable").forEach(s=>s.classList.remove("sorted","asc"));let e=m(`.sortable[data-key="${R.key}"]`);e&&(e.classList.add("sorted"),R.dir===1&&e.classList.add("asc"))}function Be(){O("#stat-strip .cu").forEach(e=>yt(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),O(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}m("#lb-qual").addEventListener("click",()=>{ht=!ht,m("#lb-qual").classList.toggle("on",ht),et(G,R.key,R.dir)});m("#lb-filter").addEventListener("input",e=>{jt=e.target.value.trim().toLowerCase(),et(G,R.key,R.dir)});var rt=m("#theme-toggle");function Bt(){if(!rt)return;let e=document.documentElement.dataset.theme==="light",s=e?t("top.toDark"):t("top.toLight");rt.setAttribute("aria-pressed",String(e)),rt.setAttribute("aria-label",s),rt.title=s}rt.addEventListener("click",()=>{let s=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=s;try{localStorage.setItem("tt1v1_theme",s)}catch{}Bt()});Bt();document.addEventListener("click",e=>{let s=e.target.closest(".chip");if(s&&s.dataset.filter){O(".chip[data-filter]").forEach(r=>r.classList.remove("on")),s.classList.add("on"),G=s.dataset.filter,et(G,R.key,R.dir);return}let a=e.target.closest(".sortable");if(a){let r=a.dataset.key;R.key===r&&R.dir===-1?R={key:"rank",dir:1}:R.key===r?R={key:r,dir:-R.dir}:R={key:r,dir:1},_t(),et(G,R.key,R.dir);return}let n=e.target.closest("[data-goto]");n&&(e.stopPropagation(),location.hash="#/player/"+D(n.dataset.goto))});function De(e){let s=e.slice();for(let a=s.length-1;a>0;a--){let n=Math.floor(Math.random()*(a+1));[s[a],s[n]]=[s[n],s[a]]}return s}function Ut(e,s){let a=document.getElementById(e);if(!a)return;let n=a.querySelector(".pick-btn"),r=a.querySelector(".pick-search"),v=[...a.querySelectorAll(".pick-opt")],f=a.querySelector(".pick-empty"),c=-1,i=()=>v.filter(g=>!g.classList.contains("hide")),d=g=>{let b=i();if(!b.length){c=-1;return}c=(g%b.length+b.length)%b.length,v.forEach(k=>k.classList.remove("hover")),b[c].classList.add("hover"),b[c].scrollIntoView({block:"nearest"})},p=g=>{let b=g.trim().toLowerCase(),k=0;v.forEach(S=>{let A=!b||S.dataset.name.toLowerCase().includes(b);S.classList.toggle("hide",!A),A&&k++}),f.classList.toggle("show",k===0),c=-1,k&&d(0)},l=()=>{document.querySelectorAll(".pick.open").forEach(g=>{if(g!==a){g.classList.remove("open");let b=g.querySelector(".pick-btn");b&&b.setAttribute("aria-expanded","false")}}),a.classList.add("open"),n.setAttribute("aria-expanded","true"),r.value="",p(""),requestAnimationFrame(()=>r.focus())},u=()=>{a.classList.remove("open"),n.setAttribute("aria-expanded","false")};n.addEventListener("click",()=>{a.classList.contains("open")?u():l()}),r.addEventListener("input",()=>p(r.value)),r.addEventListener("keydown",g=>{if(g.key==="ArrowDown")g.preventDefault(),d(c+1);else if(g.key==="ArrowUp")g.preventDefault(),d(c-1);else if(g.key==="Enter"){g.preventDefault();let b=i();b[c]&&b[c].click()}else g.key==="Escape"&&(u(),n.focus())}),v.forEach(g=>{g.addEventListener("click",()=>{a.dataset.value=g.dataset.name,a.querySelector(".pick-cur").textContent=g.dataset.name,u(),s()}),g.addEventListener("mousemove",()=>{let b=i().indexOf(g);b>=0&&b!==c&&(c=b,v.forEach(k=>k.classList.remove("hover")),g.classList.add("hover"))})})}document.addEventListener("click",e=>{document.querySelectorAll(".pick.open").forEach(s=>{if(!s.contains(e.target)){s.classList.remove("open");let a=s.querySelector(".pick-btn");a&&a.setAttribute("aria-expanded","false")}})});function re(e,s){let a=m("#cmp-wrap"),r=H.players.slice().sort((w,M)=>(w.rank!=null?w.rank:9999)-(M.rank!=null?M.rank:9999)||w.name.localeCompare(M.name)).map(w=>w.name);if(r.length<2){a.innerHTML=`<div class="empty">${t("cmp.notEnough")}</div>`;return}let v=w=>w[Math.floor(Math.random()*w.length)],f=w=>v(r.filter(M=>M!==w)),c=_[e]?e:v(r),i=_[s]?s:f(c);i===c&&(i=f(c)),(c!==e||i!==s)&&history.replaceState(null,"","#/compare/"+D(c)+"/"+D(i));let d=_[c],p=_[i],l=j.find(w=>w.name===c),u=j.find(w=>w.name===i),g=Nt(d.glicko,p.glicko,p.rd),b=Nt(p.glicko,d.glicko,d.rd),k=Math.round(g/(g+b)*1e3)/10,S=Math.round(1e3-k*10)/10,A=B().filter(w=>w.a===c&&w.b===i||w.a===i&&w.b===c).map(w=>{let M=w.a===c,q=M?w.sa:w.sb,P=M?w.sb:w.sa;return{fa:q,fb:P,res:q>P?"W":q<P?"L":"D",date:w.date}}),F=A.reduce((w,M)=>(M.res==="W"?w.w++:M.res==="L"?w.l++:w.d++,w),{w:0,l:0,d:0}),J=De(r),o=(w,M,q)=>`
    <div class="pick" id="${w}" data-value="${y(M)}">
      <button type="button" class="pick-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="${y(q)}">
        <span class="pick-cur">${y(M)}</span>
        <svg class="pick-caret" width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true"><path d="M1.2 1.2 5.5 5.6 9.8 1.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="pick-menu">
        <input class="pick-search" type="text" autocomplete="off" spellcheck="false"
          placeholder="${t("cmp.searchPlaceholder")}" aria-label="${y(q)}">
        <div class="pick-list" role="listbox" aria-label="${y(q)}">
          ${J.map(P=>{let st=_[P];return`<button type="button" class="pick-opt${P===M?" on":""}" role="option" data-name="${y(P)}" aria-selected="${P===M?"true":"false"}">
              <span class="pick-n">${y(P)}</span>
              <span class="pick-meta mono">${st&&st.rating!=null?st.rating.toFixed(1):""}</span>
            </button>`}).join("")}
          <div class="pick-empty">${t("cmp.noResults")}</div>
        </div>
      </div>
    </div>`,h=(w,M,q,P,st)=>`
    <div class="cmp-trow">
      <div class="va mono${P?" win":""}">${M}</div>
      <div class="k">${w}</div>
      <div class="vb mono${st?" win":""}">${q}</div>
    </div>`,L='<span style="color:var(--dimmer)">\u2014</span>';a.innerHTML=`
    <div class="kicker anim">${t("cmp.versus")}</div>
    <h2 class="section-head anim" style="margin:6px 0 2px">${t("cmp.title")}</h2>
    <div class="cmp-pickers anim">
      ${o("cmp-a",c,t("cmp.firstPlayer"))}
      <button class="btn btn-ghost" id="cmp-swap" style="width:auto;margin:0" title="${t("cmp.swap")}">\u21C4</button>
      ${o("cmp-b",i,t("cmp.secondPlayer"))}
    </div>
    <div class="cmp-share anim">
      <button class="btn btn-ghost" id="cmp-copy" style="width:auto;margin:0">${t("cmp.copyLink")}</button>
      <span class="caption" id="cmp-copy-msg"></span>
    </div>

    <div class="cmp-hero anim">
      <div class="cmp-side a">
        <div class="cmp-sub">${l?t("cmp.rankN",{n:l.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${D(c)}">${y(c)}</a></div>
        <div class="cmp-rating mono">${d.provisional?dt(d):d.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",d.matches,{rd:d.rd.toFixed(1)})}</div>
      </div>
      <div class="cmp-vs">
        <div class="vs-mark">${t("cmp.vsMark")}</div>
        <div class="mono" style="font-size:11px;color:var(--dimmer)">${t("cmp.h2hShort",{n:A.length})}</div>
      </div>
      <div class="cmp-side b">
        <div class="cmp-sub">${u?t("cmp.rankN",{n:u.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${D(i)}">${y(i)}</a></div>
        <div class="cmp-rating mono">${p.provisional?dt(p):p.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",p.matches,{rd:p.rd.toFixed(1)})}</div>
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.probTitle")} <span class="n">${t("cmp.probSub")}</span></h3>
      <div class="cmp-prob-labels">
        <span style="color:var(--gold)">${y(c)} ${k.toFixed(1)}%</span>
        <span style="color:var(--blue)">${S.toFixed(1)}% ${y(i)}</span>
      </div>
      <div class="cmp-probbar"><i class="pa" style="width:${k}%"></i><i class="pb" style="width:${S}%"></i></div>
      <div class="cmp-prob-note">${t("cmp.probNote")}</div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.tale")}</h3>
      <div class="cmp-table">
        ${h(t("cmp.rating"),bt(d),bt(p),!d.provisional&&d.rating>p.rating,!p.provisional&&p.rating>d.rating)}
        ${h(t("cmp.rank"),l?"#"+l.rank:L,u?"#"+u.rank:L,l&&u&&l.rank<u.rank,l&&u&&u.rank<l.rank)}
        ${h(t("cmp.rdUnc"),d.rd.toFixed(1),p.rd.toFixed(1),d.rd<p.rd,p.rd<d.rd)}
        ${h(t("cmp.glicko"),d.glicko.toFixed(1),p.glicko.toFixed(1),d.glicko>p.glicko,p.glicko>d.glicko)}
        ${h(t("cmp.record"),`<span style="color:var(--green)">${d.w}${T("W")}</span> <span style="color:var(--red)">${d.l}${T("L")}</span> ${d.d}${T("D")}`,`<span style="color:var(--green)">${p.w}${T("W")}</span> <span style="color:var(--red)">${p.l}${T("L")}</span> ${p.d}${T("D")}`,d.winPct>p.winPct,p.winPct>d.winPct)}
        ${h(t("cmp.winRate"),d.winPct+"%",p.winPct+"%",d.winPct>p.winPct,p.winPct>d.winPct)}
        ${h(t("cmp.matchesPlayed"),d.matches,p.matches,!1,!1)}
        ${h(t("cmp.uniqueOpp"),d.opponents,p.opponents,d.opponents>p.opponents,p.opponents>d.opponents)}
        ${h(t("cmp.avgOppRating"),d.avgOpp.toFixed(1),p.avgOpp.toFixed(1),d.avgOpp>p.avgOpp,p.avgOpp>d.avgOpp)}
        ${h(t("cmp.h2h"),`${F.w}${T("W")} \u2013 ${F.l}${T("L")} \u2013 ${F.d}${T("D")}`,`${F.l}${T("W")} \u2013 ${F.w}${T("L")} \u2013 ${F.d}${T("D")}`,F.w>F.l,F.l>F.w)}
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.prevMeetings")} <span class="n">${tp("cmp.meetings",A.length)}</span></h3>
      <div class="match-list">
        ${A.map(w=>`
          <div class="match-row">
            <div class="res-chip ${w.res}">${T(w.res)}</div>
            <div class="who">${y(c)}</div>
            <div class="score mono">${w.fa} \u2013 ${w.fb}</div>
            <div class="who opp"><a href="#/player/${D(i)}" style="color:var(--blue)">${y(i)}</a></div>
            <div class="date mono" title="${Kt(w.date)}">${V(w.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("cmp.neverMet")}</div>`}
      </div>
      <div class="caption" style="margin-top:12px">${t("cmp.legacyNote")}</div>
    </div>`;let $=()=>{let w=m("#cmp-a").dataset.value,M=m("#cmp-b").dataset.value,q="#/compare/"+D(w)+"/"+D(M);location.hash!==q&&(It=!0,location.hash=q),re(w,M)};Ut("cmp-a",$),Ut("cmp-b",$),m("#cmp-swap").addEventListener("click",()=>{let w=m("#cmp-a"),M=m("#cmp-b"),q=w.dataset.value;w.dataset.value=M.dataset.value,M.dataset.value=q,$()}),m("#cmp-copy").addEventListener("click",()=>{let w=location.href.split("#")[0]+"#/compare/"+D(c)+"/"+D(i),M=()=>{m("#cmp-copy-msg").textContent=t("cmp.linkCopied")};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(w).then(M,()=>{m("#cmp-copy-msg").textContent=w}):m("#cmp-copy-msg").textContent=w})}var It=!1;function He(e){let s=_[e],a=m("#page-player");if(!s){a.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("pl.notFound",{name:y(e)})}</div></div></div>`;return}let n=j.find(l=>l.name===e),r=kt(e),v=r.slice(0,10),f=zt(e),c=Math.max(3,Math.min(100,100-s.rd/120*100)),i=(typeof window.lbTankFor=="function"?window.lbTankFor(e):null)||(window.LB_TANKS||{})[e]||(window.LB_TANKS_SNAPSHOT||{})[e]||null,d=i&&i.lastLogin?Zt(i.lastLogin):"",p=i&&i.lastLogin?Qt(i.lastLogin):"";a.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">${t("pl.back")}</a>
    <div class="pv-layout">
    <div class="pv-main">
    <div class="player-hero anim">
      <div class="player-top">
        ${n?$t(n.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${y(s.name)}</div>
          ${be(s.name)}
          <button class="pc-share pv-share" data-share="link" data-target="profile" data-name="${y(s.name)}"><svg class="pc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg><span>${t("cards.shareLink")}</span></button>
          <div class="player-rankline">
            ${n?t("pl.rankedOf",{rank:n.rank,total:j.length}):t("pl.unranked")}
            ${s.provisional?` \xB7 <span class="tag prov">${t("tag.provisional")}</span>`:""}
            ${s.inactive?` \xB7 <span class="tag inact">${t("tag.inactive")}</span>`:""}
            ${d?` \xB7 <span class="pv-seen" title="${y(p)}">${t("cards.lastSeen")} ${y(d)}</span>`:""}
          </div>
        </div>
        <div class="player-rating-block">
          <div class="lbl">${s.provisional?t("pl.estRange"):t("pl.visible")}</div>
          <div class="big mono${s.provisional?" prov-range":""}" id="pv-rating">${s.provisional?dt(s):"0"}</div>
          ${St(s)}
          <div class="rd-bar">
            <div class="bar-track"><div class="bar-fill" style="width:${c}%"></div></div>
            <div class="caption"><span>${t("pl.certainty")}</span><span class="mono">RD ${s.rd.toFixed(1)}</span></div>
          </div>
        </div>
      </div>
      <div class="pstat-grid">
        <div class="pstat"><div class="k">${t("pl.glicko")}</div><div class="v mono">${s.glicko.toFixed(1)}</div></div>
        <div class="pstat"><div class="k">${t("pl.matches")}</div><div class="v mono">${s.matches}</div></div>
        <div class="pstat"><div class="k">${t("pl.record")}</div><div class="v mono" style="font-size:19px"><span style="color:var(--green)">${s.w}${T("W")}</span> <span style="color:var(--red)">${s.l}${T("L")}</span> <span style="color:var(--dim)">${s.d}${T("D")}</span></div></div>
        <div class="pstat"><div class="k">${t("pl.winRate")}</div><div class="v mono">${s.winPct}%</div></div>
        <div class="pstat"><div class="k">${t("pl.opponents")}</div><div class="v mono">${s.opponents}</div></div>
        <div class="pstat"><div class="k">${t("pl.avgOppRating")}</div><div class="v mono">${s.avgOpp.toFixed(1)}</div></div>
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.recentForm")} <span class="n">${t("pl.lastN",{n:Math.min(10,r.length)})}</span></h3>
      <div class="form-strip">
        ${v.map((l,u)=>`<div class="form-pill ${l.res}" style="animation-delay:${u*55}ms"
           title="${t("pl.vsOpp",{opp:y(l.opp)})} ${l.for_}-${l.against}">${T(l.res)}</div>`).join("")||`<span class="empty">${t("pl.noGames")}</span>`}
      </div>
    </div>
    </div>
    <div class="pv-side">${typeof cardsHeroHTML=="function"?cardsHeroHTML(e):""}</div>
    </div>

    <div class="pv-lower">
    <div class="panel reveal">
      <h3>${t("pl.matchHistory")} <span class="n">${tp("pl.nGames",r.length)}</span></h3>
      <div class="match-list">
        ${r.map(l=>`
          <div class="match-row">
            <div class="res-chip ${l.res}">${T(l.res)}</div>
            <div class="who">${y(s.name)}</div>
            <div class="score mono">${l.for_} \u2013 ${l.against}</div>
            <div class="who opp"><a href="#/player/${D(l.opp)}" style="color:var(--blue)">${y(l.opp)}</a></div>
            <div class="date mono" title="${Kt(l.date)}">${V(l.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.h2h")} <span class="n">${tp("pl.nOpponents",f.length)}</span></h3>
      <div class="h2h-grid">
        ${f.map(l=>`
          <div class="h2h-card" data-goto="${y(l.opp)}">
            <div class="opp">${y(l.opp)}</div>
            <div class="rec mono"><span class="w">${l.w}${T("W")}</span> \xB7 <span class="l">${l.l}${T("L")}</span> \xB7 <span>${l.d}${T("D")}</span> \xB7 ${t("pl.pts",{pf:l.pf,pa:l.pa})}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>
    </div>
  </div>`,s.provisional||yt(m("#pv-rating"),s.rating,{dec:1,dur:900}),typeof cardsMountAll=="function"&&cardsMountAll(a),Tt()}function Ue(){oe();let e=m("#gm-body"),s=B();m("#gm-count").textContent=tp("gm.count",s.length),e.innerHTML=s.map(a=>{let n=a.sa>a.sb,r=a.sb>a.sa;return`
    <div class="gm-row">
      <div class="side ${n?"winner":"loser"}">
        <div class="dot ${n?"w":"l"}"></div>
        <div class="nm" data-goto="${y(a.a)}">${y(a.a)}</div>
      </div>
      <div class="sc mono" style="color:${n?"var(--green)":"var(--red)"}">${a.sa}</div>
      <div class="dash mono">\u2013</div>
      <div class="sc mono" style="color:${r?"var(--green)":"var(--red)"}">${a.sb}</div>
      <div class="side right ${r?"winner":"loser"}">
        <div class="dot ${r?"w":"l"}"></div>
        <div class="nm" data-goto="${y(a.b)}">${y(a.b)}</div>
      </div>
      <div class="dt mono">${a.admin&&!a.published?`<span class="tag fresh">${t("tag.new")}</span>`:V(a.date)||t("misc.historical")}</div>
    </div>`}).join("")}function We(){let e=H.players.filter(s=>s.provisional).sort((s,a)=>a.rating-s.rating);m("#roster-grid").innerHTML=e.map(s=>{let a=Math.min(100,Math.round(Math.min(1,s.matches/5)*50+Math.min(1,s.opponents/3)*50));return`
    <div class="roster-card reveal" data-goto="${y(s.name)}">
      <div class="top">
        <div class="nm">${y(s.name)}</div>
        <svg class="shield" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"/></svg>
      </div>
      <div class="rating"><span class="unit">${t("roster.estRange")}</span><span class="big prov-range">${dt(s)}</span></div>
      <div class="req-row"><span>${t("roster.matches")}</span><span class="${s.matches>=5?"ok":""}">${s.matches} / 5 ${s.matches>=5?"\u2713":""}</span></div>
      <div class="req-row"><span>${t("roster.opponents")}</span><span class="${s.opponents>=3?"ok":""}">${s.opponents} / 3 ${s.opponents>=3?"\u2713":""}</span></div>
      <div class="prog-track"><div class="prog-fill" data-w="${a}"></div></div>
      <div class="prog-label">${t("roster.progress",{pct:a})}</div>
    </div>`}).join(""),requestAnimationFrame(()=>O("#roster-grid .prog-fill").forEach(s=>{s.style.width=s.dataset.w+"%"}))}function Ge(){let e=H.players,s=j.slice().sort((o,h)=>h.winPct-o.winPct).slice(0,10),a=e.slice().sort((o,h)=>h.matches-o.matches).slice(0,10),n=[];B().forEach(o=>{let h=_[o.a],L=_[o.b];if(!h||!L)return;let $=h.rating-L.rating;if(o.sa===o.sb)return;let w=o.sa>o.sb?o.a:o.b,M=Math.abs($);($<0&&w===o.a||$>0&&w===o.b)&&n.push({winner:w,loser:w===o.a?o.b:o.a,gap:M,score:w===o.a?`${o.sa}-${o.sb}`:`${o.sb}-${o.sa}`})}),n.sort((o,h)=>h.gap-o.gap);let r={};B().forEach(o=>{let h=[o.a,o.b].sort().join(" vs ");r[h]=(r[h]||0)+1});let v=Object.entries(r).sort((o,h)=>h[1]-o[1]).slice(0,10),f=e.map(o=>o.rating),c=Math.min(...f),i=Math.max(...f),d=8,p=(i-c)/d||1,l=Array.from({length:d},()=>0);f.forEach(o=>{l[Math.min(d-1,Math.max(0,Math.floor((o-c)/p)))]++});let u=Math.max(...l,1),g=l.map((o,h)=>{let L=Math.round((c+h*p)/10)*10,$=Math.round((c+(h+1)*p)/10)*10;return`
    <div class="hcol" title="${tp("an.histTip",o,{lo:L,hi:$})}">
      <div class="hbar" data-h="${Math.round(o/u*100)}"></div>
      <div class="hlbl">${L}\u2013${$}</div>
    </div>`}).join(""),b=e.slice().sort((o,h)=>h.opponents-o.opponents).slice(0,8),k=Math.max(...b.map(o=>o.opponents),1),S=b.map(o=>`
    <div class="mrow reveal" data-goto="${y(o.name)}">
      <div class="nm">${y(o.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(o.opponents/k*100)}"></div></div>
      <div class="val mono">${o.opponents}</div>
    </div>`).join(""),A=(o,h,L)=>o.map(($,w)=>`
    <div class="an-row reveal" data-goto="${y($.name)}">
      <div class="idx mono">${w+1}</div>
      <div class="nm">${y($.name)}</div>
      <div class="val mono">${h($)}</div>
      <div class="unit mono">${L($)}</div>
    </div>`).join(""),F=o=>tp("an.nMatches",o.matches);m("#an-grid").innerHTML=`
    <div class="an-panel">
      <div class="head"><h3>${t("an.topWinRate")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${A(s,o=>o.winPct+"%",F)}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.mostActive")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/></svg>
      </div>
      ${A(a,o=>o.matches,o=>t("an.matchesUnit"))}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.biggestUpsets")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${n.length?n.slice(0,8).map((o,h)=>`
        <div class="an-row reveal" data-goto="${y(o.winner)}">
          <div class="idx mono">${h+1}</div>
          <div class="nm">${y(o.winner)} <span style="color:var(--dimmer);font-weight:500">${t("an.def")}</span> ${y(o.loser)}</div>
          <div class="val mono">${o.score}</div>
          <div class="unit mono">${t("an.plusPts",{n:Math.round(o.gap)})}</div>
        </div>`).join(""):`<div class="empty">${t("an.noUpsets")}</div>`}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.rivalries")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${v.map(([o,h],L)=>`
        <div class="an-row reveal">
          <div class="idx mono">${L+1}</div>
          <div class="nm">${o.split(" vs ").map(y).join(` <span style="color:var(--dimmer);font-weight:500">${t("vs")}</span> `)}</div>
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
      ${S}
    </div>`;let J=()=>{O("#an-grid .hbar").forEach(o=>{o.style.height=o.dataset.h+"%"}),O("#an-grid .abar").forEach(o=>{o.style.width=o.dataset.w+"%"})};requestAnimationFrame(J),setTimeout(J,140),Tt()}function Je(){m("#settings-body").innerHTML=ie().map(e=>`
    <tr><td><b>${y(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${y(e.desc)}</div></td>
        <td class="val">${y(String(e.value))}</td></tr>`).join("")}function Ye(){return Array.from({length:11},(e,s)=>({q:t("faq.q"+(s+1)),a:t("faq.a"+(s+1))}))}function gt(){let e=I().faq;return Array.isArray(e)&&e.length?e:Ye()}function ze(){let e=window.cardsTiers;if(!e)return"";let{TIER_KEYS:s,tierOf:a,tierIdx:n,tierMin:r,tierLabel:v,crestSVG:f}=e,c={};s.forEach(p=>{c[p]=0}),(H.players||[]).forEach(p=>{p&&p.rating!=null&&(c[a(p.rating)]+=1)});let i=s.reduce((p,l)=>p+c[l],0),d=s.slice().reverse().map(p=>{let l=n(p),u=r(p),g=s[l+1]!=null?r(s[l+1]):null,b=l===0?`&lt; ${Math.round(g)}`:g!=null?`${Math.round(u)}\u2013${Math.round(g)-1}`:`${Math.round(u)}+`,k=i?c[p]/i*100:0;return`
      <tr class="tier-${p}">
        <td class="fd-badge"><span class="fd-badge-in">${f(p)}<span class="fd-name">${v(p)}</span></span></td>
        <td class="fd-range mono">${b}</td>
        <td class="fd-count"><b class="mono">${c[p]}</b><i style="width:${k.toFixed(1)}%"></i></td>
      </tr>`}).join("");return`
    <p class="fd-note">${t("faq.distNote")}</p>
    <table class="fd-table">
      <thead><tr><th>${t("faq.distBadge")}</th><th>${t("faq.distRange")}</th><th>${t("faq.distPlayers")}</th></tr></thead>
      <tbody>${d}</tbody>
    </table>`}function Ve(){let e='<svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',s=(a,n,r)=>`
    <div class="faq-item reveal" data-faq="${r}">
      <button class="faq-q" aria-expanded="false">
        <span>${a}</span>
        ${e}
      </button>
      <div class="faq-a"><div class="faq-a-in">${n}</div></div>
    </div>`;m("#faq-list").innerHTML=s(y(t("faq.distTitle")),ze(),"dist")+gt().map((a,n)=>s(y(String(a.q||"")),y(String(a.a||"")),n)).join(""),Tt()}document.addEventListener("click",e=>{let s=e.target.closest(".faq-q");if(!s)return;let a=s.closest(".faq-item"),n=a.classList.contains("open");O(".faq-item.open").forEach(r=>{r.classList.remove("open"),r.querySelector(".faq-q").setAttribute("aria-expanded","false")}),n||(a.classList.add("open"),s.setAttribute("aria-expanded","true"))});function Z(){let e=m("#admin-wrap");if(!Le()){e.innerHTML=`
    <div class="admin-gate">
      <div class="admin-card">
        <div class="lock">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
        </div>
        <div class="ac-eyebrow">Restricted \xB7 owners only</div>
        <h2>Command <span style="color:var(--gold)">centre</span></h2>
        <div class="sub">Enter the admin password to continue.</div>
        <label for="admin-pw">Password</label>
        <input id="admin-pw" type="password" autocomplete="off">
        <label class="remember"><input type="checkbox" id="admin-remember"> Remember me on this device</label>
        <button class="btn btn-primary" id="admin-auth">\u2192 Authenticate</button>
      </div>
    </div>`;let i=async()=>{let d=m("#admin-pw").value;try{let p=await fetch(Me,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:d})});if(p.ok){let l=await p.json().catch(()=>({}));Se(l.token||d,m("#admin-remember").checked),Z(),E("Welcome back, commander.");return}if(p.status===429){E("Too many attempts \u2014 wait a few minutes.");return}}catch{}m("#admin-pw").style.borderColor="var(--red)",E("Wrong password.")};m("#admin-auth").addEventListener("click",i),m("#admin-pw").addEventListener("keydown",d=>{d.key==="Enter"&&i()});return}let a=I(),n='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',r=a.inactive.map(i=>`
    <div class="log-item">
      <div class="txt"><b>${y(i)}</b> <span style="color:var(--dimmer)">\u2014 inactive</span></div>
      <button class="icon-btn" data-inact-del="${y(i)}" title="Mark active again">${n}</button>
    </div>`).join("")||'<div class="empty">Nobody marked inactive.</div>';e.innerHTML=`
  <div class="admin-hero anim">
    <div class="ah-copy">
      <div class="ah-eyebrow"><i class="d"></i> Owner console \xB7 live</div>
      <h2>Command <span style="color:var(--gold)">centre</span></h2>
      <div class="ah-sub">Sheet sync, inactive status, Q&amp;A and player messages. Edits apply here instantly \u2014 <b>Publish to everyone</b> makes them public.</div>
    </div>
    <div class="ah-actions">
      <button class="btn btn-primary" id="admin-publish">\u2191 Publish to everyone</button>
      <button class="btn btn-ghost" id="admin-export">Export log</button>
      <button class="btn btn-danger" id="admin-lock">Lock</button>
    </div>
  </div>

  <div class="admin-strip anim">
    <div class="as-icon" aria-hidden="true">\u27F3</div>
    <div class="as-copy">
      <h3>Sheet <span class="n">auto-sync</span></h3>
      <div class="form-note">The live site rebuilds from the master Google Sheet every 5 minutes \u2014 and instantly when someone presses <b>Update website</b> in the sheet.</div>
    </div>
    <button class="btn btn-primary" id="admin-sync">\u27F3 Sync now</button>
    <span id="admin-sync-status" class="mono" style="font-size:11px;color:var(--dimmer)"></span>
  </div>

  <div class="sec-head anim">
    <div class="k">Customize</div>
    <h3>Roster &amp; <span class="n">content</span></h3>
  </div>

  <div class="admin-stack anim">
    <div class="panel">
      <div class="p-eyebrow">01 \xB7 Roster</div>
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

    <div class="panel">
      <div class="p-eyebrow">02 \xB7 Content</div>
      <h3>Manage <span class="n">Q &amp; A</span> <span class="muted-inline">\u2014 shown on the FAQ page</span></h3>
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

    <div class="panel">
      <div class="p-eyebrow">03 \xB7 Inbox</div>
      <h3>Feedback <span class="n">inbox</span> <span class="muted-inline">\u2014 messages sent from the site</span>
        <button class="btn btn-ghost" id="fb-refresh" style="margin:0 0 0 14px;padding:8px 16px;width:auto">\u27F3 Refresh</button></h3>
      <div class="log-list" id="fb-inbox"><div class="empty">Loading messages\u2026</div></div>
    </div>
  </div>

  <datalist id="player-list">${H.players.map(i=>`<option value="${y(i.name)}">`).join("")}</datalist>`,m("#admin-lock").addEventListener("click",()=>{xe(),Z()}),m("#admin-publish").addEventListener("click",()=>v()),m("#admin-sync").addEventListener("click",async()=>{let i=m("#admin-sync"),d=m("#admin-sync-status");i.disabled=!0,d.textContent="syncing\u2026";try{let p=await fetch(Ee,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:ot()})}),l=await p.json().catch(()=>({}));p.ok&&l.ok?(d.textContent=l.changed?`synced \u2713 ${l.matches} matches / ${l.players} players`:"already up to date \u2713",E(l.changed?"Sheet synced \u2014 the live site was updated.":"Site already matches the sheet.")):p.status===429?(d.textContent="rate limited",E("Too many attempts \u2014 wait a few minutes.")):(d.textContent="sync failed",E("Sync failed: "+(l.error||p.status)))}catch{d.textContent="network error",E("Sync failed (network).")}i.disabled=!1});async function v(i){let d=!!(i&&i.silent),p=ot()||(d?"":(window.prompt("Admin password:")||"").trim());if(!p){E(d?'Saved here \u2014 auto-publish needs a stored password. Use "Publish to everyone".':"Publish cancelled.");return}Ot=!0;let l=I(),u={},g=[];for(let[S,A]of Object.entries(l.matchEdits||{}))S.startsWith("a:")&&(u[S]=A);for(let S of l.matchRemoved||[])S.startsWith("a:")&&g.push(S);let b=B().filter(S=>S.admin).map(S=>({a:S.a,b:S.b,sa:S.sa,sb:S.sb,date:S.date||""})),k={matches:b,aliases:l.aliases||{},aliasNotes:l.aliasNotes||{},aliasRemoved:l.aliasRemoved||[],inactive:l.inactive||[],seeds:l.seeds||{},seedGlicko:l.seedGlicko||{},seedRd:l.seedRd||{},seedRemoved:l.seedRemoved||[],settings:l.settings||{},matchEdits:u,matchRemoved:g,faq:l.faq!=null?l.faq:[]};try{let S=await fetch(pt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:p,doc:k,message:`Publish match log (${b.length} matches)`})}),A=await S.json().catch(()=>({}));if(!S.ok||!A.ok){S.status===403&&sessionStorage.removeItem(z),E("Publish failed: "+(A.error||"HTTP "+S.status));return}window.LB_PUB=k,window.LB_LOG=b,Te([]),K({}),lt(),d||Z(),E(d?"Saved \u2014 live for everyone \u2713":"Published! Everyone sees it on their next visit.")}catch{E("Publish failed: network error.")}finally{Ot=!1}}m("#admin-export").addEventListener("click",()=>{let i=new Blob([JSON.stringify(ee(),null,2)],{type:"application/json"}),d=document.createElement("a");d.href=URL.createObjectURL(i),d.download="match-log.json",d.click(),URL.revokeObjectURL(d.href),E("Log exported.")}),m("#ov-inact-toggle").addEventListener("click",()=>{let i=m("#ov-inact-n").value.trim();if(!i){E("Type a player name first.");return}let d=Q(),p=I().inactive||[],l=p.includes(i)?p.filter(u=>u!==i):[...p,i];K({...d,inactive:l}),lt(),Z(),E(l.includes(i)?`${i} marked inactive.`:`${i} marked active again.`)}),m("#ov-inact-list").addEventListener("click",i=>{let d=i.target.closest("[data-inact-del]");if(!d)return;let p=Q();K({...p,inactive:(I().inactive||[]).filter(l=>l!==d.dataset.inactDel)}),lt(),Z()});let f=()=>{let i=gt();m("#faq-admin-list").innerHTML=i.map((d,p)=>`
      <div class="log-item fix-row" data-faq-idx="${p}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${y(String(d.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${y(String(d.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${p}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${p}" title="Delete question">${n}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};f(),m("#faq-admin-list").addEventListener("click",i=>{let d=i.target.closest("[data-faq-save]"),p=i.target.closest("[data-faq-del]"),l=gt().map(g=>({...g}));if(d){let g=d.closest("[data-faq-idx]");l[parseInt(d.dataset.faqSave,10)]={q:g.querySelector('[data-fq="q"]').value.trim(),a:g.querySelector('[data-fq="a"]').value.trim()}}else if(p)l.splice(parseInt(p.dataset.faqDel,10),1);else return;let u=Q();K({...u,faq:l}),f(),E("Q&A updated \u2014 publish to make it public.")}),m("#faq-add").addEventListener("click",()=>{let i=m("#faq-new-q").value.trim(),d=m("#faq-new-a").value.trim();if(!i||!d){E("Fill in both the question and the answer.");return}let p=Q();K({...p,faq:[...gt().map(l=>({...l})),{q:i,a:d}]}),f(),E("Question added.")}),m("#faq-reset").addEventListener("click",()=>{let i=Q();K({...i,faq:null}),f(),E("Q&A back to the built-in list.")}),window._fbTimer&&(clearInterval(window._fbTimer),window._fbTimer=null);async function c(){let i=m("#fb-inbox");if(!i||document.querySelector("#fb-inbox [data-fb-reply]:focus"))return;let d=ot();if(!d){i.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let p=await fetch(Y+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:d})}),l=await p.json().catch(()=>({}));if(!p.ok||!l.ok){i.innerHTML=`<div class="empty">Could not load messages (${y(l.error||"HTTP "+p.status)}).</div>`;return}let u=l.items||[],g={};i.querySelectorAll("[data-fb-id]").forEach(b=>{let k=b.querySelector("[data-fb-reply]");k&&k.value&&(g[b.dataset.fbId]=k.value)}),i.innerHTML=u.map(b=>`
        <div class="log-item fb-row${b.resolved?" fb-done":""}" data-fb-id="${y(b.id)}" data-fb-resolved="${b.resolved?"1":""}">
          <div class="txt">
            <b>${y(b.name||"Anonymous")}</b>${b.contact?` <span style="color:var(--dimmer)">\xB7 ${y(b.contact)}</span>`:""}
            <span class="mono" style="color:var(--dimmer);font-size:11px;margin-left:6px">ticket ${y(b.id)}</span>
            ${b.resolved?'<span class="tag resolved" style="margin-left:6px">resolved \u2713</span>':`<span class="tag ${b.status==="replied"?"live":"fresh"}" style="margin-left:6px">${y(b.status)}</span>`}
            <div style="color:var(--dim);font-size:13px;margin-top:4px">${y(b.message)}</div>
            ${b.reply?`<div style="color:var(--gold);font-size:12.5px;margin-top:4px">\u21A9 ${y(b.reply)}</div>`:""}
          </div>
          <input class="set-val fb-reply-in" data-fb-reply placeholder="Write a reply\u2026" value="${y(b.reply||"")}">
          <button class="icon-btn" data-fb-send title="Send reply"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-resolve title="${b.resolved?"Reopen \u2014 mark as not resolved":"Mark as resolved"}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.6L16 9.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-del title="Delete message">${n}</button>
        </div>`).join("")||'<div class="empty">No messages yet.</div>',i.querySelectorAll("[data-fb-id]").forEach(b=>{let k=b.querySelector("[data-fb-reply]");k&&g[b.dataset.fbId]!=null&&(k.value=g[b.dataset.fbId])})}catch{i.innerHTML='<div class="empty">Network error loading messages.</div>'}}c(),m("#fb-refresh").addEventListener("click",()=>{c(),E("Inbox refreshed.")}),window._fbTimer=setInterval(()=>{if(!m("#fb-inbox")){clearInterval(window._fbTimer),window._fbTimer=null;return}document.hidden||c()},2e3),m("#fb-inbox").addEventListener("click",async i=>{let d=i.target.closest("[data-fb-send]"),p=i.target.closest("[data-fb-del]"),l=i.target.closest("[data-fb-resolve]");if(!d&&!p&&!l)return;let u=i.target.closest("[data-fb-id]"),g=u.dataset.fbId,b=ot();try{if(l){let k=u.dataset.fbResolved!=="1";if(!(await fetch(Y+"/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:b,id:g,resolved:k})}).then(A=>A.json())).ok){E("Could not update \u2014 try again.");return}E(k?"Marked as resolved \u2713":"Message reopened."),c()}else if(d){let k=u.querySelector("[data-fb-reply]").value;if(!(await fetch(Y+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:b,id:g,reply:k})}).then(A=>A.json())).ok){E("Reply failed.");return}E("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(Y+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:b,id:g})}).then(S=>S.json())).ok){E("Delete failed.");return}u.remove(),E("Message deleted.")}}catch{E("Network error.")}})}var vt=document.getElementById("fl-cards");vt&&window.matchMedia("(hover: hover)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(vt.addEventListener("pointermove",e=>{let s=e.target.closest&&e.target.closest(".fl-card");if(!s)return;let a=s.getBoundingClientRect(),n=(e.clientX-a.left)/a.width-.5,r=(e.clientY-a.top)/a.height-.5;s.classList.add("tilt"),s.style.transform=`perspective(1000px) rotateY(${(n*7).toFixed(2)}deg) rotateX(${(-r*6).toFixed(2)}deg) translateY(-6px)`}),vt.addEventListener("pointerleave",()=>{vt.querySelectorAll(".fl-card").forEach(e=>{e.style.transform="",e.classList.remove("tilt")})}));m("#search").addEventListener("input",e=>{let s=e.target.value.trim().toLowerCase(),a=m("#search-drop");if(!s){a.classList.remove("show");return}let n=H.players.filter(r=>r.name.toLowerCase().includes(s)).slice(0,8);if(!n.length){a.classList.remove("show");return}a.innerHTML=n.map(r=>`
    <a class="drop-row" href="#/player/${D(r.name)}">
      ${r.rank?$t(r.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${y(r.name)}</span>        <span class="mono" style="margin-left:auto;color:var(--dim)">${bt(r,!0)}</span>
    </a>`).join(""),a.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||m("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(m("#search-drop").classList.remove("show"),m("#search").value="")});var Y=pt.replace(/\/publish$/,"/feedback"),Et="tt1v1_fb_tickets";function Ke(){try{return JSON.parse(localStorage.getItem(Et)||"[]")}catch{return[]}}function Qe(e){let s=Ke();s.push({id:e,ts:Date.now()});try{localStorage.setItem(Et,JSON.stringify(s.slice(-20)))}catch{}}function Ze(){let e=m("#fb-overlay"),s=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>m("#fb-msg").focus(),180)},a=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};m("#fab-feedback").addEventListener("click",s),m("#fb-close").addEventListener("click",a),m("#fb-done").addEventListener("click",a),e.addEventListener("click",i=>{i.target===e&&a()}),document.addEventListener("keydown",i=>{i.key==="Escape"&&e.classList.contains("show")&&a()});let n=m("#faq-feedback-btn");n&&n.addEventListener("click",s);let r=m("#fb-msg"),v=m("#fb-count-n");r.addEventListener("input",()=>{v.textContent=String(r.value.length);try{localStorage.setItem("tt1v1_fb_draft",r.value)}catch{}});try{let i=localStorage.getItem("tt1v1_fb_draft");i&&(r.value=i,v.textContent=String(i.length))}catch{}let f=m("#fb-send");f.addEventListener("click",async()=>{let i=r.value.trim();if(i.length<5){r.focus(),r.classList.add("fb-nudge"),setTimeout(()=>r.classList.remove("fb-nudge"),500),E(t("fb.writeFirst"));return}f.classList.add("busy"),f.disabled=!0;try{let d=await fetch(Y,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:m("#fb-name").value.trim(),contact:m("#fb-contact").value.trim(),message:i})}),p=await d.json().catch(()=>({}));if(!d.ok||!p.ok){E(t("fb.couldNotSend",{err:p.error||"HTTP "+d.status}));return}Qe(p.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}m("#fb-ticket-code").textContent=p.id,m("#fb-view-form").hidden=!0,m("#fb-view-done").hidden=!1}catch{E(t("fb.netError"))}finally{f.classList.remove("busy"),f.disabled=!1}});let c=document.querySelector(".fb-ticket");c&&c.addEventListener("click",async()=>{let i=(m("#fb-ticket-code").textContent||"").trim();if(!i||i==="\u2014")return;try{await navigator.clipboard.writeText(i)}catch{let l=document.createElement("textarea");l.value=i,document.body.appendChild(l),l.select();try{document.execCommand("copy")}catch{}l.remove()}let d=m("#fb-copied");d&&(d.classList.add("show"),clearTimeout(window._fbCopiedT),window._fbCopiedT=setTimeout(()=>d.classList.remove("show"),1800)),E(t("fb.ticketCopied"))}),m("#fb-check").addEventListener("click",async()=>{let i=m("#fb-ticket-in").value.trim(),d=m("#fb-reply-out");if(i){d.classList.add("show"),d.textContent=t("fb.checking");try{let p=await fetch(Y+"/status?id="+encodeURIComponent(i)),l=await p.json().catch(()=>({}));if(!p.ok||!l.ok){d.textContent=t("fb.noTicket");return}d.innerHTML=l.resolved?`${t("fb.statusResolved")}${l.reply?`<br>${t("fb.replyFrom",{reply:y(l.reply)})}`:""}`:l.reply?t("fb.replyFrom",{reply:y(l.reply)}):t("fb.statusPending",{status:y(l.status)})}catch{d.textContent=t("fb.netErrorShort")}}})}function Xe(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let s=null,a=null,n=null,r=0,v=0,f=0,c=l=>{let u=l&&l.closest?l.closest("[title],[data-tip]"):null;return u&&u.hasAttribute("title")&&(u.setAttribute("data-tip",u.getAttribute("title")),u.removeAttribute("title")),u&&u.getAttribute("data-tip")?u:null},i=(l,u)=>{let g=e.offsetWidth,b=e.offsetHeight,k=l+14,S=u+18;k+g>window.innerWidth-8&&(k=l-g-14),S+b>window.innerHeight-8&&(S=u-b-14),k=Math.max(8,k),S=Math.max(8,S);let A=e.classList.contains("show")&&e.style.left?Math.abs(parseFloat(e.style.left)-k)+Math.abs(parseFloat(e.style.top)-S)<150:!1;e.classList.toggle("snap",!A),e.style.left=k+"px",e.style.top=S+"px"},d=(l,u,g)=>{s=l,e.textContent=l.getAttribute("data-tip"),i(u,g),e.classList.add("show")},p=()=>{clearTimeout(a),clearTimeout(n),a=n=null,e.classList.remove("show"),s=null};document.addEventListener("mousemove",l=>{v=l.clientX,f=l.clientY;let u=c(l.target);if(u){if(clearTimeout(n),n=null,u===s){e.classList.contains("show")&&(cancelAnimationFrame(r),r=requestAnimationFrame(()=>i(v,f)));return}clearTimeout(a),e.classList.contains("show")?d(u,v,f):a=setTimeout(()=>d(u,v,f),90);return}s&&!n&&(n=setTimeout(p,110))},{passive:!0}),window.addEventListener("scroll",p,{passive:!0}),document.addEventListener("mousedown",p,{passive:!0})}var Wt;function E(e){let s=m("#toast");s.textContent=e,s.classList.add("show"),clearTimeout(Wt),Wt=setTimeout(()=>s.classList.remove("show"),2600)}var at;function Tt(){at&&at.disconnect(),at=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&(s.target.classList.add("in"),O(".cu",s.target).forEach(a=>yt(a,parseFloat(a.dataset.target),{dec:parseInt(a.dataset.dec||0)})),at.unobserve(s.target))})},{threshold:.12}),O(".reveal").forEach(e=>at.observe(e))}(function(){let s=m("#scroll-progress"),a=m("#to-top"),n=m("#page-home .hero-row"),r=document.querySelector(".topbar"),v=!1,f=()=>{v=!1;let d=window.scrollY,p=document.documentElement.scrollHeight-window.innerHeight;s&&(s.style.transform=`scaleX(${p>0?Math.min(1,d/p):0})`),a&&a.classList.toggle("show",d>640),r&&r.classList.toggle("scrolled",d>10),n&&d<1400&&(n.style.transform=`translateY(${d*.14}px)`,n.style.opacity=String(Math.max(.3,1-d/950)))},c,i=()=>{r&&(r.classList.add("scrolling"),clearTimeout(c),c=setTimeout(()=>r.classList.remove("scrolling"),160)),v||(v=!0,requestAnimationFrame(f))};window.addEventListener("scroll",i,{passive:!0}),a&&a.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),f()})();var ce=()=>{};window.lbScrollNow=e=>{ce(),window.scrollTo({top:e||0,behavior:"instant"})};(function(){if(matchMedia("(prefers-reduced-motion: reduce)").matches||!matchMedia("(pointer: fine)").matches)return;let s=window.scrollY,a=s,n=0,r=()=>Math.max(0,document.documentElement.scrollHeight-window.innerHeight),v=c=>{a=c,window.scrollTo({top:c,behavior:"instant"})};ce=()=>{n&&(cancelAnimationFrame(n),n=0),s=a=window.scrollY};function f(){let c=s-a;if(Math.abs(c)<.5){v(s),n=0;return}v(a+c*.16),n=requestAnimationFrame(f)}window.addEventListener("wheel",c=>{if(c.ctrlKey||c.defaultPrevented||c.deltaY===0)return;let i=c.target instanceof Element?c.target:null;if(i&&i.closest("textarea, input, select, [data-native-scroll]"))return;for(let p=i;p&&p!==document.documentElement;p=p.parentElement){let l=getComputedStyle(p).overflowY;if((l==="auto"||l==="scroll")&&p.scrollHeight>p.clientHeight+1){if(!(c.deltaY>0?p.scrollTop+p.clientHeight>=p.scrollHeight-1:p.scrollTop<=0))return;break}}c.preventDefault();let d=c.deltaY;c.deltaMode===1?d*=16:c.deltaMode===2&&(d*=window.innerHeight),s=Math.min(r(),Math.max(0,s+d)),n||(n=requestAnimationFrame(f))},{passive:!1}),window.addEventListener("scroll",()=>{n||(s=a=window.scrollY)},{passive:!0})})();window.lbCards={topOf:()=>j,all:()=>H.players,byName:()=>_,histOf:kt,h2hOf:zt,deltaTag:St,resLetter:T,fmtDate:V,canon:C,allMatches:B,ratingTimeline:rs,altsOf:Yt,lastSeenText:Zt,lastSeenExact:Qt};lt();Pt();Mt();Ze();Xe();window.addEventListener("lb-lang",()=>{let e=window.scrollY,s=G,a={...R};Mt(),m("#page-home").classList.contains("active")&&(s!=="all"||a.key!=="rank"||a.dir!==1)&&(G=s,R=a,O(".chip[data-filter]").forEach(n=>n.classList.toggle("on",n.dataset.filter===s)),_t(),et(s,a.key,a.dir)),Bt(),window.lbScrollNow(e)});function nt(e,s){let a=e.indexOf("window."+s);if(a<0)return null;let n=e.indexOf("=",a);for(;n<e.length&&"{[".indexOf(e[n])<0;)n++;let r=0,v=!1,f="",c=!1;for(let i=n;i<e.length;i++){let d=e[i];if(v){c?c=!1:d==="\\"?c=!0:d===f&&(v=!1);continue}if(d==='"'||d==="'"){v=!0,f=d;continue}if(d==="{"||d==="[")r++;else if((d==="}"||d==="]")&&(r--,r<=0))return JSON.parse(e.slice(n,i+1))}return null}var Gt="https://tierstats.github.io/";async function Jt(e,s){for(let a of e)try{let n=await fetch(a+(a.includes("?")?"&":"?")+s,{cache:"no-store"});if(n.ok)return await n.text()}catch{}return null}async function qt(e){try{let s="cb="+Date.now(),[a,n]=await Promise.all([Jt([Gt+"data.js","data.js"],s),Jt([Gt+"log.js","log.js"],s)]);if(!a||!n)throw new Error("data unavailable");let r=nt(a,"LB_TANKS");r&&(window.LB_TANKS={...window.LB_TANKS_SNAPSHOT||{},...r});let v=nt(a,"LB_DATA"),f=nt(n,"LB_PUB")||(nt(n,"LB_LOG")?{matches:nt(n,"LB_LOG")}:null),c=[];if(v&&JSON.stringify(v)!==JSON.stringify(N)&&(N=v,window.LB_DATA=v,c.push("data")),f&&JSON.stringify(f)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=f,window.LB_LOG=f.matches||[],c.push("log")),c.length){lt(),Pt(),Mt();let i=m("#last-updated");i&&(i.textContent=t("home.lastUpdated",{when:V(N.generated)||"today"}))}e&&E(c.length?t("misc.refreshed"):t("misc.upToDate"))}catch{e&&E(t("misc.refreshFailed"))}}qt(!1);var ft=m("#lb-refresh-btn");ft&&ft.addEventListener("click",async()=>{ft.classList.add("spinning"),await qt(!0),setTimeout(()=>ft.classList.remove("spinning"),400)});setInterval(()=>qt(!1),6e4);document.addEventListener("visibilitychange",()=>{document.hidden||qt(!1)});var le="tt1v1_fb_seen",U=null;function ts(){try{return JSON.parse(localStorage.getItem(Et)||"[]")}catch{return[]}}function de(){try{return JSON.parse(localStorage.getItem(le)||"{}")||{}}catch{return{}}}function es(){let e=m("#fab-feedback");if(e&&!e.querySelector(".fb-dot")){let a=document.createElement("span");a.className="fb-dot",e.appendChild(a),requestAnimationFrame(()=>a.classList.add("in"))}let s=m("#fb-view-form");if(s&&!m("#fb-reply-banner")&&U){let a=document.createElement("div");a.id="fb-reply-banner",a.innerHTML=`${t("fb.teamReplied",{id:y(U.id)})}
      <div class="r">${y(U.reply)}</div>
      <button class="btn btn-ghost" id="fb-got-it" style="margin-top:9px;padding:6px 13px">${t("fb.gotIt")}</button>`,s.insertAdjacentElement("beforebegin",a),requestAnimationFrame(()=>a.classList.add("show")),m("#fb-got-it").addEventListener("click",ss)}}function ss(){if(U){let a=de();a[U.id]=1;try{localStorage.setItem(le,JSON.stringify(a))}catch{}U=null}let e=m(".fb-dot");e&&(e.classList.add("out"),setTimeout(()=>e.remove(),420));let s=m("#fb-reply-banner");s&&(s.classList.remove("show"),setTimeout(()=>s.remove(),420))}async function pe(){let e=de();U=null;let s=ts(),a=s.slice(0,Math.max(0,s.length-6)),n=[];for(let r of s.slice(-6))try{let v=await fetch(Y+"/status?id="+encodeURIComponent(r.id),{cache:"no-store"}),f=await v.json().catch(()=>({}));if(v.status===404||v.ok&&f.ok===!1)continue;n.push(r),v.ok&&f.ok&&f.reply&&!e[r.id]&&!U&&(U={id:r.id,reply:f.reply})}catch{n.push(r)}if(n.length!==s.slice(-6).length)try{localStorage.setItem(Et,JSON.stringify([...a,...n]))}catch{}U&&es()}setTimeout(pe,3500);setInterval(pe,9e4);var as=pt.replace(/\/publish$/,"/api/ttstats"),ns=15e3;function is(e,s){let a=e&&e.stats||{};return s==="kd"?a.deaths?a.kills/a.deaths:a.kills!=null?a.kills:null:a[s]!=null?a[s]:null}function os(e){let s=a=>String(a).replace(/["\\]/g,"\\$&");Object.keys(e).forEach(a=>{let n=e[a];window.LB_TANKS=Object.assign({},window.LB_TANKS||{},{[a]:n}),document.querySelectorAll(`[data-live-name="${s(a)}"][data-live]`).forEach(r=>{let v=r.dataset.live,f=is(n,v);if(f==null)return;let c=v==="kd"&&n.stats&&n.stats.deaths?2:0,i=Number(f.toFixed(c)),d=parseFloat(String(r.textContent).replace(/[^0-9.\-]/g,""));(isNaN(d)||d!==i)&&yt(r,i,{dec:c,dur:900})}),document.querySelectorAll(`canvas[data-tank-name="${s(a)}"]`).forEach(r=>{r.dataset.mounted&&window.TankRender&&window.TankRender.render(r,n,r.dataset.tankSize||"medium")})})}(function(){let s=!1,a=0,n=new Set,r=0,v=c=>{a||(a=setTimeout(()=>{a=0,f()},c))};window.lbTankWant=c=>{c&&n.add(String(c)),s&&v(350)};let f=async()=>{if(s){v(300);return}if(document.visibilityState!=="visible")return;let c=new Set;document.querySelectorAll("[data-live-name]").forEach(g=>c.add(g.dataset.liveName)),document.querySelectorAll("canvas[data-tank-name]").forEach(g=>c.add(g.dataset.tankName)),n.forEach(g=>c.add(g));let i=[...c].filter(Boolean);if(!i.length)return;let d=i.filter(g=>n.has(g)),p=i.filter(g=>!n.has(g)),l=12;p.length>l&&(r=(r+l)%p.length);let u=[...new Set([...d,...p.slice(r),...p.slice(0,r)])].slice(0,l);s=!0;try{let b=await(await fetch(as+"?names="+encodeURIComponent(u.join(",")),{cache:"no-store"})).json();b&&b.ok&&b.tanks&&(os(b.tanks),typeof window.lbTankFreshMark=="function"&&window.lbTankFreshMark(Object.keys(b.tanks))),u.forEach(k=>n.delete(k))}catch{}s=!1};window.lbLiveStatsTick=()=>v(0),f(),setTimeout(f,900),setInterval(f,ns)})();function rs(){let e={},s=(c,i,d,p)=>{let l=i-x.conservative*d;(!e[c]||l>e[c].rating)&&(e[c]={rating:l,date:p||""})},a={},n=c=>{if(!a[c]){let[i,d]=ne(c);a[c]={r:i,rd:d,lastIdx:null}}return a[c]},r={};for(let c of B()){if(c.date)continue;let i=c.sa>c.sb?1:c.sa<c.sb?0:.5;(r[c.a]=r[c.a]||[]).push([c.b,i]),(r[c.b]=r[c.b]||[]).push([c.a,1-i]),n(c.a).lastIdx=W,n(c.b).lastIdx=W}let v={};for(let c in r)v[c]=[n(c).r,n(c).rd];for(let c in r){let i=n(c),[d,p]=wt(i.r,i.rd,r[c].map(([l,u])=>[v[l][0],v[l][1],u]));i.r=d,i.rd=p,s(c,d,p,x.graceStart)}let f=new Map;for(let c of B().filter(i=>i.date).slice().reverse()){let i=xt(c.date);f.has(i)||f.set(i,[]),f.get(i).push({a:C(c.a),b:C(c.b),sa:+c.sa,sb:+c.sb,date:c.date})}for(let c of[...f.keys()].sort((i,d)=>i-d)){for(let l in a){let u=a[l],g=c-(u.lastIdx==null?W:u.lastIdx);g>0&&(u.rd=Math.min(Math.sqrt(u.rd*u.rd+x.growth*x.growth*g),x.maxRd))}let i={},d="";for(let l of f.get(c)){let u=l.sa>l.sb?1:l.sa<l.sb?0:.5;(i[l.a]=i[l.a]||[]).push([l.b,u]),(i[l.b]=i[l.b]||[]).push([l.a,1-u]),n(l.a).lastIdx=c,n(l.b).lastIdx=c,l.date>d&&(d=l.date)}let p={};for(let l in i)p[l]=[n(l).r,n(l).rd];for(let l in i){let u=n(l),[g,b]=wt(u.r,u.rd,i[l].map(([k,S])=>[p[k][0],p[k][1],S]));u.r=g,u.rd=b,s(l,g,b,d)}}return e}})();
