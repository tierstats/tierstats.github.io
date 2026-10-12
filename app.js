/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var j=window.LB_DATA,pt="https://tierstats-publish.tierstats.workers.dev/publish",u=(e,s=document)=>s.querySelector(e),O=(e,s=document)=>[...s.querySelectorAll(e)],y=e=>String(e).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),D=e=>encodeURIComponent(String(e)),qt=e=>decodeURIComponent(e);function yt(e,s,a={}){let i=a.dur||1200,r=a.dec||0,v=performance.now(),f=parseFloat(e.textContent)||0;function c(n){let d=Math.min(1,(n-v)/i),p=1-Math.pow(1-d,3);e.textContent=(f+(s-f)*p).toFixed(r),d<1&&requestAnimationFrame(c)}requestAnimationFrame(c),setTimeout(()=>{e.textContent=s.toFixed(r)},i+300)}var de='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',pe='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function $t(e,s=""){let a=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",i=e<=3?e===1?de:pe:"";return`<div class="rank-badge ${a} ${s}" title="${t("home.rankTip",{n:e})}">${i}<span class="num">${e}</span></div>`}var T=e=>t(e==="W"?"rec.wLetter":e==="L"?"rec.lLetter":"rec.dLetter"),F={},N=[],H={players:[],byName:{},qualified:[]},it={},ut={},X={},At=new Set,It={prevRatings:{},prevRanks:{}};function ve(){try{localStorage.removeItem("tt1v1_baseline")}catch{}It={prevRatings:{...j.prevRatings||{}},prevRanks:{...j.prevRanks||{}}}}function fe(){for(let a in it)delete it[a];let e=new Set(I().aliasRemoved||[]);Object.entries(j.aliases).forEach(([a,i])=>{e.has(a)||(it[a.toLowerCase()]=i)}),Object.entries(I().aliases||{}).forEach(([a,i])=>{it[String(a).toLowerCase()]=i});for(let a of Object.keys(ut))delete ut[a];for(let a of Object.keys(X))delete X[a];At.clear();let s=(a,i)=>{Object.keys(a||{}).forEach(r=>{let v=C(r);v!==r&&(i[v]=a[r])}),Object.keys(a||{}).forEach(r=>{let v=C(r);v===r&&(i[v]=a[r])})};s(j.seeds,ut),s(It.prevRatings,X),(j.inactiveList||[]).forEach(a=>At.add(C(a)))}var Rt={},Bt=e=>String(e).toLowerCase().replace(/[^a-z0-9]/g,"").replace(/0/g,"o").replace(/1/g,"i").replace(/3/g,"e").replace(/5/g,"s");function ue(e,s){if(Math.abs(e.length-s.length)>3)return 99;let a=Array.from({length:s.length+1},(i,r)=>r);for(let i=1;i<=e.length;i++){let r=[i];for(let v=1;v<=s.length;v++)r[v]=Math.min(a[v]+1,r[v-1]+1,a[v-1]+(e[i-1]===s[v-1]?0:1));if(a=r,Math.min(...a)>3)return 99}return a[s.length]}function me(){let e={},s=new Set(I().aliasRemoved||[]),a=r=>{let v=String(r).trim(),f=C(v);!v||Bt(v)===Bt(f)||ue(v.toLowerCase(),f.toLowerCase())<=2||(e[f]=e[f]||[]).push(v)};Object.keys(j.aliases).forEach(r=>{s.has(r)||a(r)}),Object.keys(I().aliases||{}).forEach(a);for(let r of Object.keys(e)){let v=new Set([r.toLowerCase()]);e[r]=e[r].filter(f=>{let c=f.toLowerCase();return v.has(c)?!1:(v.add(c),!0)}).sort((f,c)=>f.localeCompare(c))}let i=j.cards&&j.cards.alts||{};Object.keys(i).forEach(r=>{let v=C(r),f=i[r];e[v]=(Array.isArray(f)?f:String(f||"").split(/[,;]/)).map(c=>String(c).trim()).filter(Boolean)}),Rt=e}function Jt(e){return Rt[e]||Rt[C(e)]||[]}function he(e){let s=Jt(e);if(!s.length)return"";let a=s.slice(0,2).join(", ")+(s.length>2?` +${s.length-2}`:"");return`<div class="p-alt" title="${y(s.join(", "))}">${t("lb.aka",{names:y(a)})}</div>`}var C=e=>{let s=String(e).trim(),a=new Set;for(;;){let i=it[s.toLowerCase()];if(!i||i===s||a.has(s))return s;a.add(s),s=i}};function kt(e){let s=[];return B().forEach(a=>{let i=(r,v,f)=>({opp:r,for_:v,against:f,res:v>f?"W":v<f?"L":"D",date:a.date});a.a===e?s.push(i(a.b,a.sa,a.sb)):a.b===e&&s.push(i(a.a,a.sb,a.sa))}),s}function Yt(e){let s={};return kt(e).forEach(a=>{let i=s[a.opp]||(s[a.opp]={w:0,l:0,d:0,pf:0,pa:0});i[a.res.toLowerCase()]+=1,i.pf+=a.for_,i.pa+=a.against}),Object.entries(s).map(([a,i])=>({opp:a,...i})).sort((a,i)=>i.w+i.l+i.d-(a.w+a.l+a.d)||i.w-a.w)}function ge(e){let s=F[e]||{};return s.provisional?`<span class="tag prov">${t("tag.provisional")}</span>`:s.inactive?`<span class="tag inact">${t("tag.inactive")}</span>`:""}function be(e){let s=kt(e).slice(0,5).reverse();if(!s.length)return"";let a=s.map(i=>T(i.res)).join(" ");return`<span class="form" title="${t("form.title",{n:s.length,seq:a})}">${s.map(i=>`<i class="${i.res.toLowerCase()}">${T(i.res)}</i>`).join("")}</span>`}function zt(){let e=typeof getLang=="function"?getLang():"en";return{en:"en-US",zh:"zh-CN",ja:"ja-JP",ru:"ru-RU"}[e]||"en-US"}function Vt(e){let s=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||"").slice(0,10));return s?new Date(+s[1],+s[2]-1,+s[3]):null}function V(e){let s=Vt(e);if(!s)return"";let a=s.getFullYear()===new Date().getFullYear();try{return new Intl.DateTimeFormat(zt(),a?{month:"short",day:"numeric"}:{year:"numeric",month:"short",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Qt(e){let s=Vt(e);if(!s)return"";try{return new Intl.DateTimeFormat(zt(),{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Lt(e){let s=e.delta!=null?e.delta:0;if(Math.abs(s)<.05)return"";let a=s>0,i=Math.abs(s).toFixed(1);return`<span class="delta ${a?"up":"down"}" title="${a?t("delta.upTitle",{n:i}):t("delta.downTitle",{n:i})}">${a?"\u25B2":"\u25BC"} ${i}</span>`}function we(){let e=It.prevRanks||{},s=Object.keys(e);if(s.length){let r={};return s.forEach(v=>{r[C(v)]=e[v]}),r}let a={};N.forEach(r=>{X[r.name]!=null&&(a[r.name]=X[r.name])});let i={};return Object.entries(a).sort((r,v)=>v[1]-r[1]).forEach(([r],v)=>{i[r]=v+1}),i}function ye(e,s){let a=s[e.name]!=null?s[e.name]:s[C(e.name)];if(a==null){let r=(j.newSince||{})[e.name];return!r||(Date.now()-Date.parse(r))/864e5>5?"":`<span class="mv new" title="${t("mv.newTitle")}">${t("mv.new")}</span>`}let i=a-e.rank;return i>0?`<span class="mv up" title="${tp("mv.up",i)}">\u25B2${i}</span>`:i<0?`<span class="mv down" title="${tp("mv.down",-i)}">\u25BC${-i}</span>`:""}function dt(e){return`${Math.round(e.rating-100)} \u2013 ${Math.round(e.rating+100)}`}function bt(e,s){if(!e.provisional)return e.rating.toFixed(1);let a=s?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:dt(e);return`<span class="prov-range" title="${t("rating.provTitle")}">${a}</span>`}var Kt="tt1v1_admin_log_v1",tt="tt1v1_admin_ok",z="tt1v1_admin_pw",$e=()=>sessionStorage.getItem(tt)==="1"||localStorage.getItem(tt)==="1",ot=()=>sessionStorage.getItem(z)||localStorage.getItem(z)||"";function ke(e,s){s?(localStorage.setItem(tt,"1"),localStorage.setItem(z,e)):(sessionStorage.setItem(tt,"1"),sessionStorage.setItem(z,e),localStorage.removeItem(tt),localStorage.removeItem(z))}function Le(){[sessionStorage,localStorage].forEach(e=>{e.removeItem(tt),e.removeItem(z)})}var Dt=null,Ct=!1;function Zt(){Ct||!ot()||(clearTimeout(Dt),Dt=setTimeout(()=>publishLog({silent:!0}),1500))}var Se=pt.replace(/\/publish$/,"/verify"),xe=pt.replace(/\/publish$/,"/sync");function Xt(){try{return JSON.parse(localStorage.getItem(Kt)||"[]")}catch{return[]}}function Me(e){try{localStorage.setItem(Kt,JSON.stringify(e))}catch{}Zt()}var te="tt1v1_admin_over_v1";function K(){try{return JSON.parse(localStorage.getItem(te)||"{}")||{}}catch{return{}}}function Q(e){try{localStorage.setItem(te,JSON.stringify(e))}catch{}Zt()}function I(){let e=window.LB_PUB||{},s=K(),a=new Set([...e.aliasRemoved||[],...s.aliasRemoved||[]]),i=new Set([...e.seedRemoved||[],...s.seedRemoved||[]]),r=s.aliases||{},v={...s.seeds||{},...s.seedGlicko||{},...s.seedRd||{}},f=g=>Object.fromEntries(Object.entries(g||{}).filter(([b])=>!a.has(b)||r[b]!=null)),c=g=>Object.fromEntries(Object.entries(g||{}).filter(([b])=>!i.has(b)||v[b]!=null)),n=f({...e.aliases||{},...s.aliases||{}}),d=f({...e.aliasNotes||{},...s.aliasNotes||{}}),p=c({...e.seeds||{},...s.seeds||{}}),l=c({...e.seedGlicko||{},...s.seedGlicko||{}}),h=c({...e.seedRd||{},...s.seedRd||{}});return{aliases:n,aliasNotes:d,seeds:p,seedGlicko:l,seedRd:h,aliasRemoved:[...a].filter(g=>n[g]==null),seedRemoved:[...i].filter(g=>p[g]==null&&l[g]==null&&h[g]==null),settings:{...e.settings||{},...s.settings||{}},matchEdits:{...e.matchEdits||{},...s.matchEdits||{}},inactive:s.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...s.matchRemoved||[]])],faq:s.faq!=null?s.faq:e.faq!=null?e.faq:null}}function Ee(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function B(){let e=I(),s=e.matchEdits||{},a=new Set(e.matchRemoved||[]),i=(l,h)=>{if(a.has(h))return null;let g=s[h],b=g?{...l,sa:g.sa,sb:g.sb,date:g.date!=null?g.date:l.date}:l;return{...b,a:C(b.a),b:C(b.b),sa:+b.sa,sb:+b.sb,key:h}},r=Xt().map((l,h)=>i({...l,admin:!0,published:!1},"l:"+h)).filter(Boolean),v=Ee().map((l,h)=>i({...l,admin:!0,published:!0},"p:"+h)).filter(Boolean),f=j.matches.map((l,h)=>i({...l,admin:!1,published:!1},"a:"+h)).filter(Boolean).reverse(),c=l=>{let h=l.a>l.b;return[h?l.b:l.a,h?l.a:l.b,h?l.sb:l.sa,h?l.sa:l.sb,l.date||""].join("|")},n={};f.forEach(l=>{let h=c(l);n[h]=(n[h]||0)+1});let d={};return r.concat(v).filter(l=>{let h=c(l);return d[h]=(d[h]||0)+1,d[h]>(n[h]||0)}).concat(f)}var x={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},mt=864e5,ct=Math.log(10)/400,ee=e=>1/Math.sqrt(1+3*ct*ct*e*e/(Math.PI*Math.PI)),Ot=(e,s,a)=>1/(1+Math.pow(10,-ee(a)*(e-s)/400));function Te(e){let s=I().seeds||{};return s[e]!=null&&s[e]!==""?Number(s[e]):ut[e]}function se(e){let s=(I().seedGlicko||{})[e],a=(I().seedRd||{})[e],i=s!=null&&s!==""?Number(s):null,r=a!=null&&a!==""?Number(a):null;if(i!=null||r!=null)return[i??x.unratedR,r??x.unratedRd];let v=Te(e);return v!=null?[Math.max(x.seedMid+(v-x.oldMid)*x.ptsPer,x.minSeed),x.knownRd]:[x.unratedR,x.unratedRd]}function wt(e,s,a){let i=0,r=0;for(let[f,c,n]of a){let d=ee(c),p=Ot(e,f,c);i+=d*d*p*(1-p),r+=d*(n-p)}if(i*=ct*ct,i<=0)return[e,s];let v=1/(s*s)+i;return[e+ct/v*r,Math.sqrt(1/v)]}function qe(e,s){let a=Math.pow(10,s),i=e*a,r=Math.floor(i);return Math.abs(i-r-.5)<1e-6?(r+1)/a:Math.round(i)/a}var St=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(x.periodDays*mt)),W=St(x.graceStart),Ae={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function ae(){let e=I().settings||{};return(j.settings||[]).map(s=>({...s,value:Object.prototype.hasOwnProperty.call(e,s.name)?e[s.name]:s.value}))}function Re(){for(let e of ae()){let s=Ae[e.name];if(!s)continue;if(s==="graceStart"){let i=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(i)&&(x.graceStart=i);continue}let a=Number(e.value);Number.isFinite(a)&&(x[s]=a)}W=St(x.graceStart),O(".cons-val").forEach(e=>{e.textContent=String(x.conservative)}),O(".min-matches-val").forEach(e=>{e.textContent=String(x.minMatches)}),O(".min-opp-val").forEach(e=>{e.textContent=String(x.minOpp)})}function Ce(){Re(),fe(),me();let e={},s=o=>{if(!e[o]){let[m,k]=se(o);e[o]={name:o,r:m,rd:k,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[o]},a=(o,m,k,$,w,M)=>{let q=s(o);q.games++,q.opps.add(m),k>$?q.w++:k<$?q.l++:q.d++,q.lastIdx=M,w&&(q.lastDate=w)},i={};for(let o of B()){if(o.date)continue;let m=C(o.a),k=C(o.b),$=o.sa>o.sb?1:o.sa<o.sb?0:.5;(i[m]=i[m]||[]).push([k,$]),(i[k]=i[k]||[]).push([m,1-$]),a(m,k,o.sa,o.sb,"",W),a(k,m,o.sb,o.sa,"",W)}let r={};for(let o in i)r[o]=[s(o).r,s(o).rd];for(let o in i){let[m,k]=wt(r[o][0],r[o][1],i[o].map(([$,w])=>[r[$][0],r[$][1],w]));s(o).r=m,s(o).rd=k}let v=new Map;for(let o of B().filter(m=>m.date).slice().reverse()){let m=o.date,k=St(m);v.has(k)||v.set(k,[]),v.get(k).push({a:C(o.a),b:C(o.b),sa:+o.sa,sb:+o.sb,date:m})}for(let o of[...v.keys()].sort((m,k)=>m-k)){for(let $ in e){let w=e[$],M=o-(w.lastIdx==null?W:w.lastIdx);M>0&&(w.rd=Math.min(Math.sqrt(w.rd*w.rd+x.growth*x.growth*M),x.maxRd))}let m={};for(let $ of v.get(o)){let w=$.sa>$.sb?1:$.sa<$.sb?0:.5;(m[$.a]=m[$.a]||[]).push([$.b,w]),(m[$.b]=m[$.b]||[]).push([$.a,1-w]),a($.a,$.b,$.sa,$.sb,$.date,o),a($.b,$.a,$.sb,$.sa,$.date,o)}let k={};for(let $ in m)k[$]=[s($).r,s($).rd];for(let $ in m){let[w,M]=wt(k[$][0],k[$][1],m[$].map(([q,_])=>[k[q][0],k[q][1],_]));s($).r=w,s($).rd=M}}let f=Object.values(e).map(o=>({name:o.name,glicko:o.r,rd:o.rd,rating:o.r-x.conservative*o.rd,matches:o.games,w:o.w,l:o.l,d:o.d,winPct:o.games?qe(o.w/o.games*100,1):0,opponents:o.opps.size,avgOpp:0,lastMatch:o.lastDate||"",provisional:!(o.games>=x.minMatches&&o.opps.size>=x.minOpp),inactive:!1})),c={};f.forEach(o=>{c[o.name]=o.glicko}),f.forEach(o=>{let m=0;e[o.name].opps.forEach(k=>{m+=c[k]!=null?c[k]:x.unratedR}),o.avgOpp=e[o.name].opps.size?m/e[o.name].opps.size:0});let n=Date.now(),d=Math.floor(n/(x.periodDays*mt));for(let o in e){let m=e[o],k=d-(m.lastIdx==null?W:m.lastIdx);k>0&&(m.rd=Math.min(Math.sqrt(m.rd*m.rd+x.growth*x.growth*k),x.maxRd))}f.forEach(o=>{o.glicko=e[o.name].r,o.rd=e[o.name].rd,o.rating=o.glicko-x.conservative*o.rd;let m=X[o.name],k=(j.curRatings||{})[o.name];o.delta=m!=null?(k??o.rating)-m:0});let p=Date.parse(x.graceStart+"T00:00:00Z")+x.graceDays*mt,l=new Set([...At,...I().inactive||[]]);f.forEach(o=>{o.inactive=l.has(o.name)||(o.lastMatch?n-Date.parse(o.lastMatch+"T00:00:00Z")>x.inactiveDays*mt:n>p)});let h={},g={};(j.players||[]).forEach((o,m)=>{let k=C(o.name);h[k]=o,g[k]=m});let b={};f.forEach(o=>{b[o.name]=o}),f.forEach(o=>{let m=h[o.name];m&&(o.rating=m.rating,o.glicko=m.glicko,o.rd=m.rd,o.matches=m.matches,o.w=m.w,o.l=m.l,o.d=m.d,o.winPct=m.winPct,o.opponents=m.opponents,o.avgOpp=m.avgOpp,m.lastMatch&&(o.lastMatch=m.lastMatch))});let L=[];(j.qualified||[]).forEach(o=>{let m=b[C(o.name)];m&&(m.provisional=!1,m.rank=o.rank!=null?o.rank:L.length+1,L.push(m))});let S=new Set(L.map(o=>o.name)),A=f.filter(o=>!S.has(o.name)&&!h[o.name]&&!h[C(o.name)]&&!o.provisional&&!o.inactive).sort((o,m)=>m.rating-o.rating);A.forEach((o,m)=>{o.rank=L.length+m+1});let P=L.concat(A);f.sort((o,m)=>m.rating-o.rating||(g[o.name]!=null?g[o.name]:1e9)-(g[m.name]!=null?g[m.name]:1e9));let J={};return f.forEach(o=>{J[o.name]=o}),{players:f,byName:J,qualified:P}}function lt(){ve(),H=Ce(),F=H.byName,N=H.qualified}var Oe=["page-home","page-player","page-compare","page-matches","page-cards","page-roster","page-analytics","page-method","page-faq","page-admin"];function xt(){if(Nt){Nt=!1;return}let e=location.hash||"#/";Oe.forEach(r=>u("#"+r).classList.remove("active"));let s="#/"+(e.split("/")[1]||"");O(".nav a, .foot-nav a").forEach(r=>{let v=r.getAttribute("href");r.classList.toggle("active",v===s||e==="#/"&&v==="#/")});let a=u("#nav-glide"),i=document.querySelector(".nav a.active");if(a&&i&&i.offsetWidth>0?(a.style.width=i.offsetWidth+"px",a.style.transform=`translateX(${i.offsetLeft}px)`,a.style.opacity="1"):a&&(a.style.opacity="0"),e==="#/compare"||e.startsWith("#/compare/")){let r=e.split("/").slice(2).map(qt);ie(r[0]||"",r[1]||""),u("#page-compare").classList.add("active"),window.lbScrollNow(0)}else if(e.startsWith("#/player/"))Be(qt(e.slice(9))),u("#page-player").classList.add("active"),window.lbScrollNow(0);else if(e==="#/matches")De(),u("#page-matches").classList.add("active"),window.lbScrollNow(0);else if(e==="#/cards")typeof renderCards=="function"&&renderCards(),u("#page-cards").classList.add("active"),window.lbScrollNow(0);else if(e.startsWith("#/card/")){typeof renderCards=="function"&&renderCards(),u("#page-cards").classList.add("active"),window.lbScrollNow(0);let r=qt(e.slice(7));requestAnimationFrame(()=>{typeof window.cardsFocus=="function"&&window.cardsFocus(r)})}else e==="#/roster"?(He(),u("#page-roster").classList.add("active"),window.lbScrollNow(0)):e==="#/analytics"?(Ue(),u("#page-analytics").classList.add("active"),window.lbScrollNow(0)):e==="#/method"?(We(),u("#page-method").classList.add("active"),window.lbScrollNow(0)):e==="#/faq"?(Ye(),u("#page-faq").classList.add("active"),window.lbScrollNow(0)):e==="#/admin"?(Z(),u("#page-admin").classList.add("active"),window.lbScrollNow(0)):(Pt(),u("#page-home").classList.add("active"),requestAnimationFrame(_e));Et()}window.addEventListener("hashchange",xt);function Pt(){G="all",R={key:"rank",dir:1},O(".chip[data-filter]").forEach(c=>c.classList.toggle("on",c.dataset.filter==="all")),_t();let e=B().length,s=H.players.length,a=N[0],i=Math.round(N.reduce((c,n)=>c+n.rd,0)/N.length),r=u("#hero-chip-matches");r&&(r.innerHTML=t("home.chipMatches",{n:e})),u("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">${t("stat.ranked")}</div>
      <div class="v"><span class="cu" data-target="${N.length}">0</span><small>${t("stat.ofTotal",{n:s})}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.matches")}</div>
      <div class="v"><span class="cu" data-target="${e}">0</span></div></div>
    <div class="stat-card"><div class="k">${t("stat.highest")}</div>
      <div class="v"><span class="cu" data-target="${a.rating}" data-dec="1">0</span><small>${y(a.name)}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.avgRd")}</div>
      <div class="v"><span class="cu" data-target="${i}" data-dec="1">0</span><small>${t("stat.certainty")}</small></div></div>`;let v=[N[1],N[0],N[2]].filter(Boolean);u("#fl-cards").innerHTML=v.map(c=>`
    <div class="fl-card r${c.rank}${c.rank===1?" champ":""} reveal" data-goto="${y(c.name)}">
      <div class="fl-top">
        ${$t(c.rank)}
        <div class="rd">RD ${c.rd.toFixed(0)}</div>
      </div>
      ${c.rank===1?`<div class="champ-tag">${t("home.champTag")}</div>`:""}
      <div class="nm">${y(c.name)}</div>
      <div class="rating">
        <span class="unit">${t("home.ratingUnit")}</span>
        <div class="big-row"><span class="big">${Math.round(c.rating)}</span>${Lt(c)}</div>
      </div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${c.winPct>=60?"":c.winPct>=40?"mid":"low"}" data-w="${c.winPct}"></div></div>
      </div>
      <div class="meta">
        <span><span class="w">${c.w}${T("W")}</span> <span class="l">${c.l}${T("L")}</span> ${c.d}${T("D")}</span>
        <span class="wc">${c.winPct.toFixed(1)}%</span>
        <span class="opp">${t("home.avgOpp",{n:c.avgOpp.toFixed(1)})}</span>
      </div>
    </div>`).join(""),requestAnimationFrame(()=>{O("#fl-cards .bar-fill").forEach(c=>{c.style.width=c.dataset.w+"%"})}),et(),ne();let f=u("#last-updated");f&&(f.textContent=t("home.lastUpdated",{when:V(j.generated)||"today"}))}function ne(){let e=B().filter(s=>s.date).slice(0,10);u("#battles-grid").innerHTML=e.length?e.map(s=>{let a=s.sa>s.sb,i=s.sb>s.sa;return`
    <div class="battle-row reveal" data-goto="${y(a?s.a:s.b)}">
      <div class="who ${a?"win":"lose"}" data-goto="${y(s.a)}">${y(s.a)}</div>
      <div class="vs">${t("vs")}</div>
      <div class="who r ${i?"win":"lose"}" data-goto="${y(s.b)}">${y(s.b)}</div>
      <div class="sc mono"><span class="${a?"win":"lose"}">${s.sa}</span> \u2013 <span class="${i?"win":"lose"}">${s.sb}</span></div>
      <div class="dt">${V(s.date)||(s.admin&&!s.published?t("battles.justNow"):t("misc.historical"))}</div>
    </div>`}).join(""):`<div class="empty" style="padding:26px;text-align:center;color:var(--dim);grid-column:1/-1">${t("battles.empty")}</div>`}var je=500,Ne="cubic-bezier(.22,.8,.24,1)",Ie=12;function Pe(e,s){matchMedia("(prefers-reduced-motion: reduce)").matches||O(".lb-row",e).forEach((a,i)=>{let r=s.get(a.dataset.name);if(r===void 0||typeof a.animate!="function")return;let v=r-a.getBoundingClientRect().top;Math.abs(v)<=1||a.animate([{transform:`translateY(${v}px)`},{transform:"none"}],{duration:je,easing:Ne,delay:Math.min(i*Ie,220),fill:"backwards"})})}function et(e="all",s="rank",a=1){let i=u("#lb-body"),v=(e==="all"&&ht?N:H.players).slice().map(n=>({...n,rank:n.rank!=null?n.rank:9999}));jt&&(v=v.filter(n=>n.name.toLowerCase().includes(jt))),e==="provisional"?v=v.filter(n=>(F[n.name]||{}).provisional):e==="inactive"?v=v.filter(n=>(F[n.name]||{}).inactive):e==="veterans"?v=v.filter(n=>n.matches>=15):e==="rising"&&(v=v.filter(n=>n.winPct>=60&&n.matches>=5)),v.sort((n,d)=>{let p=n[s],l=d[s];return(typeof p=="string"?p.localeCompare(l):p-l)*a});let f=new Map;O(".lb-row",i).forEach(n=>f.set(n.dataset.name,n.getBoundingClientRect().top));let c=we();i.innerHTML=v.map(n=>`
    <div class="lb-row ${n.rank<=3?"top"+n.rank:""}" data-name="${y(n.name)}" data-goto="${y(n.name)}">
      <div class="rank">${n.rank<=N.length?$t(n.rank,"sm")+ye(n,c):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="name-stack"><div class="pname">${y(n.name)}</div></div>${typeof cardsRowChip=="function"?cardsRowChip(n.name):""}</div>
      <div class="rating-cell mono">${Lt(n)}${bt(n,!0)}</div>
      <div class="num-cell mono col-hide">${n.rd.toFixed(1)}</div>
      <div class="num-cell mono col-hide">${n.matches}</div>
      <div class="num-cell mono col-hide"><span class="w">${n.w}</span></div>
      <div class="num-cell mono col-hide"><span class="l">${n.l}</span></div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${n.winPct>=60?"":n.winPct>=40?"mid":"low"}" data-w="${n.winPct}"></div></div>
        <div class="pct mono">${n.winPct.toFixed(1)}%</div>
      </div>
      <div class="num-cell mono col-hide">${n.opponents}</div>
      <div class="num-cell mono col-hide">${n.avgOpp.toFixed(1)}</div>
      <div class="col-status">${ge(n.name)||be(n.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?t("lb.emptyInactive"):e==="provisional"?t("lb.emptyProv"):t("lb.emptyNone")}</div>`,Pe(i,f),requestAnimationFrame(()=>{O(".bar-fill",i).forEach(n=>{n.style.width=n.dataset.w+"%"})})}var G="all",R={key:"rank",dir:1},jt="",ht=!0;function _t(){O(".sortable").forEach(s=>s.classList.remove("sorted","asc"));let e=u(`.sortable[data-key="${R.key}"]`);e&&(e.classList.add("sorted"),R.dir===1&&e.classList.add("asc"))}function _e(){O("#stat-strip .cu").forEach(e=>yt(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),O(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}u("#lb-qual").addEventListener("click",()=>{ht=!ht,u("#lb-qual").classList.toggle("on",ht),et(G,R.key,R.dir)});u("#lb-filter").addEventListener("input",e=>{jt=e.target.value.trim().toLowerCase(),et(G,R.key,R.dir)});var rt=u("#theme-toggle");function Ft(){if(!rt)return;let e=document.documentElement.dataset.theme==="light",s=e?t("top.toDark"):t("top.toLight");rt.setAttribute("aria-pressed",String(e)),rt.setAttribute("aria-label",s),rt.title=s}rt.addEventListener("click",()=>{let s=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=s;try{localStorage.setItem("tt1v1_theme",s)}catch{}Ft()});Ft();document.addEventListener("click",e=>{let s=e.target.closest(".chip");if(s&&s.dataset.filter){O(".chip[data-filter]").forEach(r=>r.classList.remove("on")),s.classList.add("on"),G=s.dataset.filter,et(G,R.key,R.dir);return}let a=e.target.closest(".sortable");if(a){let r=a.dataset.key;R.key===r&&R.dir===-1?R={key:"rank",dir:1}:R.key===r?R={key:r,dir:-R.dir}:R={key:r,dir:1},_t(),et(G,R.key,R.dir);return}let i=e.target.closest("[data-goto]");i&&(e.stopPropagation(),location.hash="#/player/"+D(i.dataset.goto))});function Fe(e){let s=e.slice();for(let a=s.length-1;a>0;a--){let i=Math.floor(Math.random()*(a+1));[s[a],s[i]]=[s[i],s[a]]}return s}function Ht(e,s){let a=document.getElementById(e);if(!a)return;let i=a.querySelector(".pick-btn"),r=a.querySelector(".pick-search"),v=[...a.querySelectorAll(".pick-opt")],f=a.querySelector(".pick-empty"),c=-1,n=()=>v.filter(g=>!g.classList.contains("hide")),d=g=>{let b=n();if(!b.length){c=-1;return}c=(g%b.length+b.length)%b.length,v.forEach(L=>L.classList.remove("hover")),b[c].classList.add("hover"),b[c].scrollIntoView({block:"nearest"})},p=g=>{let b=g.trim().toLowerCase(),L=0;v.forEach(S=>{let A=!b||S.dataset.name.toLowerCase().includes(b);S.classList.toggle("hide",!A),A&&L++}),f.classList.toggle("show",L===0),c=-1,L&&d(0)},l=()=>{document.querySelectorAll(".pick.open").forEach(g=>{if(g!==a){g.classList.remove("open");let b=g.querySelector(".pick-btn");b&&b.setAttribute("aria-expanded","false")}}),a.classList.add("open"),i.setAttribute("aria-expanded","true"),r.value="",p(""),requestAnimationFrame(()=>r.focus())},h=()=>{a.classList.remove("open"),i.setAttribute("aria-expanded","false")};i.addEventListener("click",()=>{a.classList.contains("open")?h():l()}),r.addEventListener("input",()=>p(r.value)),r.addEventListener("keydown",g=>{if(g.key==="ArrowDown")g.preventDefault(),d(c+1);else if(g.key==="ArrowUp")g.preventDefault(),d(c-1);else if(g.key==="Enter"){g.preventDefault();let b=n();b[c]&&b[c].click()}else g.key==="Escape"&&(h(),i.focus())}),v.forEach(g=>{g.addEventListener("click",()=>{a.dataset.value=g.dataset.name,a.querySelector(".pick-cur").textContent=g.dataset.name,h(),s()}),g.addEventListener("mousemove",()=>{let b=n().indexOf(g);b>=0&&b!==c&&(c=b,v.forEach(L=>L.classList.remove("hover")),g.classList.add("hover"))})})}document.addEventListener("click",e=>{document.querySelectorAll(".pick.open").forEach(s=>{if(!s.contains(e.target)){s.classList.remove("open");let a=s.querySelector(".pick-btn");a&&a.setAttribute("aria-expanded","false")}})});function ie(e,s){let a=u("#cmp-wrap"),r=H.players.slice().sort((w,M)=>(w.rank!=null?w.rank:9999)-(M.rank!=null?M.rank:9999)||w.name.localeCompare(M.name)).map(w=>w.name);if(r.length<2){a.innerHTML=`<div class="empty">${t("cmp.notEnough")}</div>`;return}let v=w=>w[Math.floor(Math.random()*w.length)],f=w=>v(r.filter(M=>M!==w)),c=F[e]?e:v(r),n=F[s]?s:f(c);n===c&&(n=f(c)),(c!==e||n!==s)&&history.replaceState(null,"","#/compare/"+D(c)+"/"+D(n));let d=F[c],p=F[n],l=N.find(w=>w.name===c),h=N.find(w=>w.name===n),g=Ot(d.glicko,p.glicko,p.rd),b=Ot(p.glicko,d.glicko,d.rd),L=Math.round(g/(g+b)*1e3)/10,S=Math.round(1e3-L*10)/10,A=B().filter(w=>w.a===c&&w.b===n||w.a===n&&w.b===c).map(w=>{let M=w.a===c,q=M?w.sa:w.sb,_=M?w.sb:w.sa;return{fa:q,fb:_,res:q>_?"W":q<_?"L":"D",date:w.date}}),P=A.reduce((w,M)=>(M.res==="W"?w.w++:M.res==="L"?w.l++:w.d++,w),{w:0,l:0,d:0}),J=Fe(r),o=(w,M,q)=>`
    <div class="pick" id="${w}" data-value="${y(M)}">
      <button type="button" class="pick-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="${y(q)}">
        <span class="pick-cur">${y(M)}</span>
        <svg class="pick-caret" width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true"><path d="M1.2 1.2 5.5 5.6 9.8 1.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="pick-menu">
        <input class="pick-search" type="text" autocomplete="off" spellcheck="false"
          placeholder="${t("cmp.searchPlaceholder")}" aria-label="${y(q)}">
        <div class="pick-list" role="listbox" aria-label="${y(q)}">
          ${J.map(_=>{let st=F[_];return`<button type="button" class="pick-opt${_===M?" on":""}" role="option" data-name="${y(_)}" aria-selected="${_===M?"true":"false"}">
              <span class="pick-n">${y(_)}</span>
              <span class="pick-meta mono">${st&&st.rating!=null?st.rating.toFixed(1):""}</span>
            </button>`}).join("")}
          <div class="pick-empty">${t("cmp.noResults")}</div>
        </div>
      </div>
    </div>`,m=(w,M,q,_,st)=>`
    <div class="cmp-trow">
      <div class="va mono${_?" win":""}">${M}</div>
      <div class="k">${w}</div>
      <div class="vb mono${st?" win":""}">${q}</div>
    </div>`,k='<span style="color:var(--dimmer)">\u2014</span>';a.innerHTML=`
    <div class="kicker anim">${t("cmp.versus")}</div>
    <h2 class="section-head anim" style="margin:6px 0 2px">${t("cmp.title")}</h2>
    <div class="cmp-pickers anim">
      ${o("cmp-a",c,t("cmp.firstPlayer"))}
      <button class="btn btn-ghost" id="cmp-swap" style="width:auto;margin:0" title="${t("cmp.swap")}">\u21C4</button>
      ${o("cmp-b",n,t("cmp.secondPlayer"))}
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
        <div class="cmp-sub">${h?t("cmp.rankN",{n:h.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${D(n)}">${y(n)}</a></div>
        <div class="cmp-rating mono">${p.provisional?dt(p):p.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",p.matches,{rd:p.rd.toFixed(1)})}</div>
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.probTitle")} <span class="n">${t("cmp.probSub")}</span></h3>
      <div class="cmp-prob-labels">
        <span style="color:var(--gold)">${y(c)} ${L.toFixed(1)}%</span>
        <span style="color:var(--blue)">${S.toFixed(1)}% ${y(n)}</span>
      </div>
      <div class="cmp-probbar"><i class="pa" style="width:${L}%"></i><i class="pb" style="width:${S}%"></i></div>
      <div class="cmp-prob-note">${t("cmp.probNote")}</div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.tale")}</h3>
      <div class="cmp-table">
        ${m(t("cmp.rating"),bt(d),bt(p),!d.provisional&&d.rating>p.rating,!p.provisional&&p.rating>d.rating)}
        ${m(t("cmp.rank"),l?"#"+l.rank:k,h?"#"+h.rank:k,l&&h&&l.rank<h.rank,l&&h&&h.rank<l.rank)}
        ${m(t("cmp.rdUnc"),d.rd.toFixed(1),p.rd.toFixed(1),d.rd<p.rd,p.rd<d.rd)}
        ${m(t("cmp.glicko"),d.glicko.toFixed(1),p.glicko.toFixed(1),d.glicko>p.glicko,p.glicko>d.glicko)}
        ${m(t("cmp.record"),`<span style="color:var(--green)">${d.w}${T("W")}</span> <span style="color:var(--red)">${d.l}${T("L")}</span> ${d.d}${T("D")}`,`<span style="color:var(--green)">${p.w}${T("W")}</span> <span style="color:var(--red)">${p.l}${T("L")}</span> ${p.d}${T("D")}`,d.winPct>p.winPct,p.winPct>d.winPct)}
        ${m(t("cmp.winRate"),d.winPct+"%",p.winPct+"%",d.winPct>p.winPct,p.winPct>d.winPct)}
        ${m(t("cmp.matchesPlayed"),d.matches,p.matches,!1,!1)}
        ${m(t("cmp.uniqueOpp"),d.opponents,p.opponents,d.opponents>p.opponents,p.opponents>d.opponents)}
        ${m(t("cmp.avgOppRating"),d.avgOpp.toFixed(1),p.avgOpp.toFixed(1),d.avgOpp>p.avgOpp,p.avgOpp>d.avgOpp)}
        ${m(t("cmp.h2h"),`${P.w}${T("W")} \u2013 ${P.l}${T("L")} \u2013 ${P.d}${T("D")}`,`${P.l}${T("W")} \u2013 ${P.w}${T("L")} \u2013 ${P.d}${T("D")}`,P.w>P.l,P.l>P.w)}
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
            <div class="who opp"><a href="#/player/${D(n)}" style="color:var(--blue)">${y(n)}</a></div>
            <div class="date mono" title="${Qt(w.date)}">${V(w.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("cmp.neverMet")}</div>`}
      </div>
      <div class="caption" style="margin-top:12px">${t("cmp.legacyNote")}</div>
    </div>`;let $=()=>{let w=u("#cmp-a").dataset.value,M=u("#cmp-b").dataset.value,q="#/compare/"+D(w)+"/"+D(M);location.hash!==q&&(Nt=!0,location.hash=q),ie(w,M)};Ht("cmp-a",$),Ht("cmp-b",$),u("#cmp-swap").addEventListener("click",()=>{let w=u("#cmp-a"),M=u("#cmp-b"),q=w.dataset.value;w.dataset.value=M.dataset.value,M.dataset.value=q,$()}),u("#cmp-copy").addEventListener("click",()=>{let w=location.href.split("#")[0]+"#/compare/"+D(c)+"/"+D(n),M=()=>{u("#cmp-copy-msg").textContent=t("cmp.linkCopied")};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(w).then(M,()=>{u("#cmp-copy-msg").textContent=w}):u("#cmp-copy-msg").textContent=w})}var Nt=!1;function Be(e){let s=F[e],a=u("#page-player");if(!s){a.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("pl.notFound",{name:y(e)})}</div></div></div>`;return}let i=N.find(n=>n.name===e),r=kt(e),v=r.slice(0,10),f=Yt(e),c=Math.max(3,Math.min(100,100-s.rd/120*100));a.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">${t("pl.back")}</a>
    <div class="pv-layout">
    <div class="pv-main">
    <div class="player-hero anim">
      <div class="player-top">
        ${i?$t(i.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${y(s.name)}</div>
          ${he(s.name)}
          <button class="pc-share pv-share" data-share="link" data-target="profile" data-name="${y(s.name)}"><svg class="pc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg><span>${t("cards.shareLink")}</span></button>
          <div class="player-rankline">
            ${i?t("pl.rankedOf",{rank:i.rank,total:N.length}):t("pl.unranked")}
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
        <div class="pstat"><div class="k">${t("pl.record")}</div><div class="v mono" style="font-size:19px"><span style="color:var(--green)">${s.w}${T("W")}</span> <span style="color:var(--red)">${s.l}${T("L")}</span> <span style="color:var(--dim)">${s.d}${T("D")}</span></div></div>
        <div class="pstat"><div class="k">${t("pl.winRate")}</div><div class="v mono">${s.winPct}%</div></div>
        <div class="pstat"><div class="k">${t("pl.opponents")}</div><div class="v mono">${s.opponents}</div></div>
        <div class="pstat"><div class="k">${t("pl.avgOppRating")}</div><div class="v mono">${s.avgOpp.toFixed(1)}</div></div>
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.recentForm")} <span class="n">${t("pl.lastN",{n:Math.min(10,r.length)})}</span></h3>
      <div class="form-strip">
        ${v.map((n,d)=>`<div class="form-pill ${n.res}" style="animation-delay:${d*55}ms"
           title="${t("pl.vsOpp",{opp:y(n.opp)})} ${n.for_}-${n.against}">${T(n.res)}</div>`).join("")||`<span class="empty">${t("pl.noGames")}</span>`}
      </div>
    </div>
    </div>
    <div class="pv-side">${typeof cardsHeroHTML=="function"?cardsHeroHTML(e):""}</div>
    </div>

    <div class="pv-lower">
    <div class="panel reveal">
      <h3>${t("pl.matchHistory")} <span class="n">${tp("pl.nGames",r.length)}</span></h3>
      <div class="match-list">
        ${r.map(n=>`
          <div class="match-row">
            <div class="res-chip ${n.res}">${T(n.res)}</div>
            <div class="who">${y(s.name)}</div>
            <div class="score mono">${n.for_} \u2013 ${n.against}</div>
            <div class="who opp"><a href="#/player/${D(n.opp)}" style="color:var(--blue)">${y(n.opp)}</a></div>
            <div class="date mono" title="${Qt(n.date)}">${V(n.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.h2h")} <span class="n">${tp("pl.nOpponents",f.length)}</span></h3>
      <div class="h2h-grid">
        ${f.map(n=>`
          <div class="h2h-card" data-goto="${y(n.opp)}">
            <div class="opp">${y(n.opp)}</div>
            <div class="rec mono"><span class="w">${n.w}${T("W")}</span> \xB7 <span class="l">${n.l}${T("L")}</span> \xB7 <span>${n.d}${T("D")}</span> \xB7 ${t("pl.pts",{pf:n.pf,pa:n.pa})}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>
    </div>
  </div>`,s.provisional||yt(u("#pv-rating"),s.rating,{dec:1,dur:900}),typeof cardsMountAll=="function"&&cardsMountAll(a),Et()}function De(){ne();let e=u("#gm-body"),s=B();u("#gm-count").textContent=tp("gm.count",s.length),e.innerHTML=s.map(a=>{let i=a.sa>a.sb,r=a.sb>a.sa;return`
    <div class="gm-row">
      <div class="side ${i?"winner":"loser"}">
        <div class="dot ${i?"w":"l"}"></div>
        <div class="nm" data-goto="${y(a.a)}">${y(a.a)}</div>
      </div>
      <div class="sc mono" style="color:${i?"var(--green)":"var(--red)"}">${a.sa}</div>
      <div class="dash mono">\u2013</div>
      <div class="sc mono" style="color:${r?"var(--green)":"var(--red)"}">${a.sb}</div>
      <div class="side right ${r?"winner":"loser"}">
        <div class="dot ${r?"w":"l"}"></div>
        <div class="nm" data-goto="${y(a.b)}">${y(a.b)}</div>
      </div>
      <div class="dt mono">${a.admin&&!a.published?`<span class="tag fresh">${t("tag.new")}</span>`:V(a.date)||t("misc.historical")}</div>
    </div>`}).join("")}function He(){let e=H.players.filter(s=>s.provisional).sort((s,a)=>a.rating-s.rating);u("#roster-grid").innerHTML=e.map(s=>{let a=Math.min(100,Math.round(Math.min(1,s.matches/5)*50+Math.min(1,s.opponents/3)*50));return`
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
    </div>`}).join(""),requestAnimationFrame(()=>O("#roster-grid .prog-fill").forEach(s=>{s.style.width=s.dataset.w+"%"}))}function Ue(){let e=H.players,s=N.slice().sort((o,m)=>m.winPct-o.winPct).slice(0,10),a=e.slice().sort((o,m)=>m.matches-o.matches).slice(0,10),i=[];B().forEach(o=>{let m=F[o.a],k=F[o.b];if(!m||!k)return;let $=m.rating-k.rating;if(o.sa===o.sb)return;let w=o.sa>o.sb?o.a:o.b,M=Math.abs($);($<0&&w===o.a||$>0&&w===o.b)&&i.push({winner:w,loser:w===o.a?o.b:o.a,gap:M,score:w===o.a?`${o.sa}-${o.sb}`:`${o.sb}-${o.sa}`})}),i.sort((o,m)=>m.gap-o.gap);let r={};B().forEach(o=>{let m=[o.a,o.b].sort().join(" vs ");r[m]=(r[m]||0)+1});let v=Object.entries(r).sort((o,m)=>m[1]-o[1]).slice(0,10),f=e.map(o=>o.rating),c=Math.min(...f),n=Math.max(...f),d=8,p=(n-c)/d||1,l=Array.from({length:d},()=>0);f.forEach(o=>{l[Math.min(d-1,Math.max(0,Math.floor((o-c)/p)))]++});let h=Math.max(...l,1),g=l.map((o,m)=>{let k=Math.round((c+m*p)/10)*10,$=Math.round((c+(m+1)*p)/10)*10;return`
    <div class="hcol" title="${tp("an.histTip",o,{lo:k,hi:$})}">
      <div class="hbar" data-h="${Math.round(o/h*100)}"></div>
      <div class="hlbl">${k}\u2013${$}</div>
    </div>`}).join(""),b=e.slice().sort((o,m)=>m.opponents-o.opponents).slice(0,8),L=Math.max(...b.map(o=>o.opponents),1),S=b.map(o=>`
    <div class="mrow reveal" data-goto="${y(o.name)}">
      <div class="nm">${y(o.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(o.opponents/L*100)}"></div></div>
      <div class="val mono">${o.opponents}</div>
    </div>`).join(""),A=(o,m,k)=>o.map(($,w)=>`
    <div class="an-row reveal" data-goto="${y($.name)}">
      <div class="idx mono">${w+1}</div>
      <div class="nm">${y($.name)}</div>
      <div class="val mono">${m($)}</div>
      <div class="unit mono">${k($)}</div>
    </div>`).join(""),P=o=>tp("an.nMatches",o.matches);u("#an-grid").innerHTML=`
    <div class="an-panel">
      <div class="head"><h3>${t("an.topWinRate")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${A(s,o=>o.winPct+"%",P)}
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
      ${i.length?i.slice(0,8).map((o,m)=>`
        <div class="an-row reveal" data-goto="${y(o.winner)}">
          <div class="idx mono">${m+1}</div>
          <div class="nm">${y(o.winner)} <span style="color:var(--dimmer);font-weight:500">${t("an.def")}</span> ${y(o.loser)}</div>
          <div class="val mono">${o.score}</div>
          <div class="unit mono">${t("an.plusPts",{n:Math.round(o.gap)})}</div>
        </div>`).join(""):`<div class="empty">${t("an.noUpsets")}</div>`}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.rivalries")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${v.map(([o,m],k)=>`
        <div class="an-row reveal">
          <div class="idx mono">${k+1}</div>
          <div class="nm">${o.split(" vs ").map(y).join(` <span style="color:var(--dimmer);font-weight:500">${t("vs")}</span> `)}</div>
          <div class="val mono">${m}</div>
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
    </div>`;let J=()=>{O("#an-grid .hbar").forEach(o=>{o.style.height=o.dataset.h+"%"}),O("#an-grid .abar").forEach(o=>{o.style.width=o.dataset.w+"%"})};requestAnimationFrame(J),setTimeout(J,140),Et()}function We(){u("#settings-body").innerHTML=ae().map(e=>`
    <tr><td><b>${y(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${y(e.desc)}</div></td>
        <td class="val">${y(String(e.value))}</td></tr>`).join("")}function Ge(){return Array.from({length:11},(e,s)=>({q:t("faq.q"+(s+1)),a:t("faq.a"+(s+1))}))}function gt(){let e=I().faq;return Array.isArray(e)&&e.length?e:Ge()}function Je(){let e=window.cardsTiers;if(!e)return"";let{TIER_KEYS:s,tierOf:a,tierIdx:i,tierMin:r,tierLabel:v,crestSVG:f}=e,c={};s.forEach(p=>{c[p]=0}),(H.players||[]).forEach(p=>{p&&p.rating!=null&&(c[a(p.rating)]+=1)});let n=s.reduce((p,l)=>p+c[l],0),d=s.slice().reverse().map(p=>{let l=i(p),h=r(p),g=s[l+1]!=null?r(s[l+1]):null,b=l===0?`&lt; ${Math.round(g)}`:g!=null?`${Math.round(h)}\u2013${Math.round(g)-1}`:`${Math.round(h)}+`,L=n?c[p]/n*100:0;return`
      <tr class="tier-${p}">
        <td class="fd-badge"><span class="fd-badge-in">${f(p)}<span class="fd-name">${v(p)}</span></span></td>
        <td class="fd-range mono">${b}</td>
        <td class="fd-count"><b class="mono">${c[p]}</b><i style="width:${L.toFixed(1)}%"></i></td>
      </tr>`}).join("");return`
    <p class="fd-note">${t("faq.distNote")}</p>
    <table class="fd-table">
      <thead><tr><th>${t("faq.distBadge")}</th><th>${t("faq.distRange")}</th><th>${t("faq.distPlayers")}</th></tr></thead>
      <tbody>${d}</tbody>
    </table>`}function Ye(){let e='<svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',s=(a,i,r)=>`
    <div class="faq-item reveal" data-faq="${r}">
      <button class="faq-q" aria-expanded="false">
        <span>${a}</span>
        ${e}
      </button>
      <div class="faq-a"><div class="faq-a-in">${i}</div></div>
    </div>`;u("#faq-list").innerHTML=s(y(t("faq.distTitle")),Je(),"dist")+gt().map((a,i)=>s(y(String(a.q||"")),y(String(a.a||"")),i)).join(""),Et()}document.addEventListener("click",e=>{let s=e.target.closest(".faq-q");if(!s)return;let a=s.closest(".faq-item"),i=a.classList.contains("open");O(".faq-item.open").forEach(r=>{r.classList.remove("open"),r.querySelector(".faq-q").setAttribute("aria-expanded","false")}),i||(a.classList.add("open"),s.setAttribute("aria-expanded","true"))});function Z(){let e=u("#admin-wrap");if(!$e()){e.innerHTML=`
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
    </div>`;let n=async()=>{let d=u("#admin-pw").value;try{let p=await fetch(Se,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:d})});if(p.ok){let l=await p.json().catch(()=>({}));ke(l.token||d,u("#admin-remember").checked),Z(),E("Welcome back, commander.");return}if(p.status===429){E("Too many attempts \u2014 wait a few minutes.");return}}catch{}u("#admin-pw").style.borderColor="var(--red)",E("Wrong password.")};u("#admin-auth").addEventListener("click",n),u("#admin-pw").addEventListener("keydown",d=>{d.key==="Enter"&&n()});return}let a=I(),i='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',r=a.inactive.map(n=>`
    <div class="log-item">
      <div class="txt"><b>${y(n)}</b> <span style="color:var(--dimmer)">\u2014 inactive</span></div>
      <button class="icon-btn" data-inact-del="${y(n)}" title="Mark active again">${i}</button>
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

  <datalist id="player-list">${H.players.map(n=>`<option value="${y(n.name)}">`).join("")}</datalist>`,u("#admin-lock").addEventListener("click",()=>{Le(),Z()}),u("#admin-publish").addEventListener("click",()=>v()),u("#admin-sync").addEventListener("click",async()=>{let n=u("#admin-sync"),d=u("#admin-sync-status");n.disabled=!0,d.textContent="syncing\u2026";try{let p=await fetch(xe,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:ot()})}),l=await p.json().catch(()=>({}));p.ok&&l.ok?(d.textContent=l.changed?`synced \u2713 ${l.matches} matches / ${l.players} players`:"already up to date \u2713",E(l.changed?"Sheet synced \u2014 the live site was updated.":"Site already matches the sheet.")):p.status===429?(d.textContent="rate limited",E("Too many attempts \u2014 wait a few minutes.")):(d.textContent="sync failed",E("Sync failed: "+(l.error||p.status)))}catch{d.textContent="network error",E("Sync failed (network).")}n.disabled=!1});async function v(n){let d=!!(n&&n.silent),p=ot()||(d?"":(window.prompt("Admin password:")||"").trim());if(!p){E(d?'Saved here \u2014 auto-publish needs a stored password. Use "Publish to everyone".':"Publish cancelled.");return}Ct=!0;let l=I(),h={},g=[];for(let[S,A]of Object.entries(l.matchEdits||{}))S.startsWith("a:")&&(h[S]=A);for(let S of l.matchRemoved||[])S.startsWith("a:")&&g.push(S);let b=B().filter(S=>S.admin).map(S=>({a:S.a,b:S.b,sa:S.sa,sb:S.sb,date:S.date||""})),L={matches:b,aliases:l.aliases||{},aliasNotes:l.aliasNotes||{},aliasRemoved:l.aliasRemoved||[],inactive:l.inactive||[],seeds:l.seeds||{},seedGlicko:l.seedGlicko||{},seedRd:l.seedRd||{},seedRemoved:l.seedRemoved||[],settings:l.settings||{},matchEdits:h,matchRemoved:g,faq:l.faq!=null?l.faq:[]};try{let S=await fetch(pt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:p,doc:L,message:`Publish match log (${b.length} matches)`})}),A=await S.json().catch(()=>({}));if(!S.ok||!A.ok){S.status===403&&sessionStorage.removeItem(z),E("Publish failed: "+(A.error||"HTTP "+S.status));return}window.LB_PUB=L,window.LB_LOG=b,Me([]),Q({}),lt(),d||Z(),E(d?"Saved \u2014 live for everyone \u2713":"Published! Everyone sees it on their next visit.")}catch{E("Publish failed: network error.")}finally{Ct=!1}}u("#admin-export").addEventListener("click",()=>{let n=new Blob([JSON.stringify(Xt(),null,2)],{type:"application/json"}),d=document.createElement("a");d.href=URL.createObjectURL(n),d.download="match-log.json",d.click(),URL.revokeObjectURL(d.href),E("Log exported.")}),u("#ov-inact-toggle").addEventListener("click",()=>{let n=u("#ov-inact-n").value.trim();if(!n){E("Type a player name first.");return}let d=K(),p=I().inactive||[],l=p.includes(n)?p.filter(h=>h!==n):[...p,n];Q({...d,inactive:l}),lt(),Z(),E(l.includes(n)?`${n} marked inactive.`:`${n} marked active again.`)}),u("#ov-inact-list").addEventListener("click",n=>{let d=n.target.closest("[data-inact-del]");if(!d)return;let p=K();Q({...p,inactive:(I().inactive||[]).filter(l=>l!==d.dataset.inactDel)}),lt(),Z()});let f=()=>{let n=gt();u("#faq-admin-list").innerHTML=n.map((d,p)=>`
      <div class="log-item fix-row" data-faq-idx="${p}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${y(String(d.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${y(String(d.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${p}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${p}" title="Delete question">${i}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};f(),u("#faq-admin-list").addEventListener("click",n=>{let d=n.target.closest("[data-faq-save]"),p=n.target.closest("[data-faq-del]"),l=gt().map(g=>({...g}));if(d){let g=d.closest("[data-faq-idx]");l[parseInt(d.dataset.faqSave,10)]={q:g.querySelector('[data-fq="q"]').value.trim(),a:g.querySelector('[data-fq="a"]').value.trim()}}else if(p)l.splice(parseInt(p.dataset.faqDel,10),1);else return;let h=K();Q({...h,faq:l}),f(),E("Q&A updated \u2014 publish to make it public.")}),u("#faq-add").addEventListener("click",()=>{let n=u("#faq-new-q").value.trim(),d=u("#faq-new-a").value.trim();if(!n||!d){E("Fill in both the question and the answer.");return}let p=K();Q({...p,faq:[...gt().map(l=>({...l})),{q:n,a:d}]}),f(),E("Question added.")}),u("#faq-reset").addEventListener("click",()=>{let n=K();Q({...n,faq:null}),f(),E("Q&A back to the built-in list.")}),window._fbTimer&&(clearInterval(window._fbTimer),window._fbTimer=null);async function c(){let n=u("#fb-inbox");if(!n||document.querySelector("#fb-inbox [data-fb-reply]:focus"))return;let d=ot();if(!d){n.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let p=await fetch(Y+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:d})}),l=await p.json().catch(()=>({}));if(!p.ok||!l.ok){n.innerHTML=`<div class="empty">Could not load messages (${y(l.error||"HTTP "+p.status)}).</div>`;return}let h=l.items||[],g={};n.querySelectorAll("[data-fb-id]").forEach(b=>{let L=b.querySelector("[data-fb-reply]");L&&L.value&&(g[b.dataset.fbId]=L.value)}),n.innerHTML=h.map(b=>`
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
          <button class="icon-btn" data-fb-del title="Delete message">${i}</button>
        </div>`).join("")||'<div class="empty">No messages yet.</div>',n.querySelectorAll("[data-fb-id]").forEach(b=>{let L=b.querySelector("[data-fb-reply]");L&&g[b.dataset.fbId]!=null&&(L.value=g[b.dataset.fbId])})}catch{n.innerHTML='<div class="empty">Network error loading messages.</div>'}}c(),u("#fb-refresh").addEventListener("click",()=>{c(),E("Inbox refreshed.")}),window._fbTimer=setInterval(()=>{if(!u("#fb-inbox")){clearInterval(window._fbTimer),window._fbTimer=null;return}document.hidden||c()},2e3),u("#fb-inbox").addEventListener("click",async n=>{let d=n.target.closest("[data-fb-send]"),p=n.target.closest("[data-fb-del]"),l=n.target.closest("[data-fb-resolve]");if(!d&&!p&&!l)return;let h=n.target.closest("[data-fb-id]"),g=h.dataset.fbId,b=ot();try{if(l){let L=h.dataset.fbResolved!=="1";if(!(await fetch(Y+"/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:b,id:g,resolved:L})}).then(A=>A.json())).ok){E("Could not update \u2014 try again.");return}E(L?"Marked as resolved \u2713":"Message reopened."),c()}else if(d){let L=h.querySelector("[data-fb-reply]").value;if(!(await fetch(Y+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:b,id:g,reply:L})}).then(A=>A.json())).ok){E("Reply failed.");return}E("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(Y+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:b,id:g})}).then(S=>S.json())).ok){E("Delete failed.");return}h.remove(),E("Message deleted.")}}catch{E("Network error.")}})}var vt=document.getElementById("fl-cards");vt&&window.matchMedia("(hover: hover)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(vt.addEventListener("pointermove",e=>{let s=e.target.closest&&e.target.closest(".fl-card");if(!s)return;let a=s.getBoundingClientRect(),i=(e.clientX-a.left)/a.width-.5,r=(e.clientY-a.top)/a.height-.5;s.classList.add("tilt"),s.style.transform=`perspective(1000px) rotateY(${(i*7).toFixed(2)}deg) rotateX(${(-r*6).toFixed(2)}deg) translateY(-6px)`}),vt.addEventListener("pointerleave",()=>{vt.querySelectorAll(".fl-card").forEach(e=>{e.style.transform="",e.classList.remove("tilt")})}));u("#search").addEventListener("input",e=>{let s=e.target.value.trim().toLowerCase(),a=u("#search-drop");if(!s){a.classList.remove("show");return}let i=H.players.filter(r=>r.name.toLowerCase().includes(s)).slice(0,8);if(!i.length){a.classList.remove("show");return}a.innerHTML=i.map(r=>`
    <a class="drop-row" href="#/player/${D(r.name)}">
      ${r.rank?$t(r.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${y(r.name)}</span>        <span class="mono" style="margin-left:auto;color:var(--dim)">${bt(r,!0)}</span>
    </a>`).join(""),a.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||u("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(u("#search-drop").classList.remove("show"),u("#search").value="")});var Y=pt.replace(/\/publish$/,"/feedback"),Mt="tt1v1_fb_tickets";function ze(){try{return JSON.parse(localStorage.getItem(Mt)||"[]")}catch{return[]}}function Ve(e){let s=ze();s.push({id:e,ts:Date.now()});try{localStorage.setItem(Mt,JSON.stringify(s.slice(-20)))}catch{}}function Qe(){let e=u("#fb-overlay"),s=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>u("#fb-msg").focus(),180)},a=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};u("#fab-feedback").addEventListener("click",s),u("#fb-close").addEventListener("click",a),u("#fb-done").addEventListener("click",a),e.addEventListener("click",n=>{n.target===e&&a()}),document.addEventListener("keydown",n=>{n.key==="Escape"&&e.classList.contains("show")&&a()});let i=u("#faq-feedback-btn");i&&i.addEventListener("click",s);let r=u("#fb-msg"),v=u("#fb-count-n");r.addEventListener("input",()=>{v.textContent=String(r.value.length);try{localStorage.setItem("tt1v1_fb_draft",r.value)}catch{}});try{let n=localStorage.getItem("tt1v1_fb_draft");n&&(r.value=n,v.textContent=String(n.length))}catch{}let f=u("#fb-send");f.addEventListener("click",async()=>{let n=r.value.trim();if(n.length<5){r.focus(),r.classList.add("fb-nudge"),setTimeout(()=>r.classList.remove("fb-nudge"),500),E(t("fb.writeFirst"));return}f.classList.add("busy"),f.disabled=!0;try{let d=await fetch(Y,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:u("#fb-name").value.trim(),contact:u("#fb-contact").value.trim(),message:n})}),p=await d.json().catch(()=>({}));if(!d.ok||!p.ok){E(t("fb.couldNotSend",{err:p.error||"HTTP "+d.status}));return}Ve(p.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}u("#fb-ticket-code").textContent=p.id,u("#fb-view-form").hidden=!0,u("#fb-view-done").hidden=!1}catch{E(t("fb.netError"))}finally{f.classList.remove("busy"),f.disabled=!1}});let c=document.querySelector(".fb-ticket");c&&c.addEventListener("click",async()=>{let n=(u("#fb-ticket-code").textContent||"").trim();if(!n||n==="\u2014")return;try{await navigator.clipboard.writeText(n)}catch{let l=document.createElement("textarea");l.value=n,document.body.appendChild(l),l.select();try{document.execCommand("copy")}catch{}l.remove()}let d=u("#fb-copied");d&&(d.classList.add("show"),clearTimeout(window._fbCopiedT),window._fbCopiedT=setTimeout(()=>d.classList.remove("show"),1800)),E(t("fb.ticketCopied"))}),u("#fb-check").addEventListener("click",async()=>{let n=u("#fb-ticket-in").value.trim(),d=u("#fb-reply-out");if(n){d.classList.add("show"),d.textContent=t("fb.checking");try{let p=await fetch(Y+"/status?id="+encodeURIComponent(n)),l=await p.json().catch(()=>({}));if(!p.ok||!l.ok){d.textContent=t("fb.noTicket");return}d.innerHTML=l.resolved?`${t("fb.statusResolved")}${l.reply?`<br>${t("fb.replyFrom",{reply:y(l.reply)})}`:""}`:l.reply?t("fb.replyFrom",{reply:y(l.reply)}):t("fb.statusPending",{status:y(l.status)})}catch{d.textContent=t("fb.netErrorShort")}}})}function Ke(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let s=null,a=null,i=null,r=0,v=0,f=0,c=l=>{let h=l&&l.closest?l.closest("[title],[data-tip]"):null;return h&&h.hasAttribute("title")&&(h.setAttribute("data-tip",h.getAttribute("title")),h.removeAttribute("title")),h&&h.getAttribute("data-tip")?h:null},n=(l,h)=>{let g=e.offsetWidth,b=e.offsetHeight,L=l+14,S=h+18;L+g>window.innerWidth-8&&(L=l-g-14),S+b>window.innerHeight-8&&(S=h-b-14),L=Math.max(8,L),S=Math.max(8,S);let A=e.classList.contains("show")&&e.style.left?Math.abs(parseFloat(e.style.left)-L)+Math.abs(parseFloat(e.style.top)-S)<150:!1;e.classList.toggle("snap",!A),e.style.left=L+"px",e.style.top=S+"px"},d=(l,h,g)=>{s=l,e.textContent=l.getAttribute("data-tip"),n(h,g),e.classList.add("show")},p=()=>{clearTimeout(a),clearTimeout(i),a=i=null,e.classList.remove("show"),s=null};document.addEventListener("mousemove",l=>{v=l.clientX,f=l.clientY;let h=c(l.target);if(h){if(clearTimeout(i),i=null,h===s){e.classList.contains("show")&&(cancelAnimationFrame(r),r=requestAnimationFrame(()=>n(v,f)));return}clearTimeout(a),e.classList.contains("show")?d(h,v,f):a=setTimeout(()=>d(h,v,f),90);return}s&&!i&&(i=setTimeout(p,110))},{passive:!0}),window.addEventListener("scroll",p,{passive:!0}),document.addEventListener("mousedown",p,{passive:!0})}var Ut;function E(e){let s=u("#toast");s.textContent=e,s.classList.add("show"),clearTimeout(Ut),Ut=setTimeout(()=>s.classList.remove("show"),2600)}var at;function Et(){at&&at.disconnect(),at=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&(s.target.classList.add("in"),O(".cu",s.target).forEach(a=>yt(a,parseFloat(a.dataset.target),{dec:parseInt(a.dataset.dec||0)})),at.unobserve(s.target))})},{threshold:.12}),O(".reveal").forEach(e=>at.observe(e))}(function(){let s=u("#scroll-progress"),a=u("#to-top"),i=u("#page-home .hero-row"),r=document.querySelector(".topbar"),v=!1,f=()=>{v=!1;let n=window.scrollY,d=document.documentElement.scrollHeight-window.innerHeight;s&&(s.style.transform=`scaleX(${d>0?Math.min(1,n/d):0})`),a&&a.classList.toggle("show",n>640),r&&r.classList.toggle("scrolled",n>10),i&&n<1400&&(i.style.transform=`translateY(${n*.14}px)`,i.style.opacity=String(Math.max(.3,1-n/950)))},c=()=>{v||(v=!0,requestAnimationFrame(f))};window.addEventListener("scroll",c,{passive:!0}),a&&a.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),f()})();var oe=()=>{};window.lbScrollNow=e=>{oe(),window.scrollTo({top:e||0,behavior:"instant"})};(function(){if(matchMedia("(prefers-reduced-motion: reduce)").matches||!matchMedia("(pointer: fine)").matches)return;let s=window.scrollY,a=s,i=0,r=()=>Math.max(0,document.documentElement.scrollHeight-window.innerHeight),v=c=>{a=c,window.scrollTo({top:c,behavior:"instant"})};oe=()=>{i&&(cancelAnimationFrame(i),i=0),s=a=window.scrollY};function f(){let c=s-a;if(Math.abs(c)<.5){v(s),i=0;return}v(a+c*.16),i=requestAnimationFrame(f)}window.addEventListener("wheel",c=>{if(c.ctrlKey||c.defaultPrevented||c.deltaY===0)return;let n=c.target instanceof Element?c.target:null;if(n&&n.closest("textarea, input, select, [data-native-scroll]"))return;for(let p=n;p&&p!==document.documentElement;p=p.parentElement){let l=getComputedStyle(p).overflowY;if((l==="auto"||l==="scroll")&&p.scrollHeight>p.clientHeight+1){if(!(c.deltaY>0?p.scrollTop+p.clientHeight>=p.scrollHeight-1:p.scrollTop<=0))return;break}}c.preventDefault();let d=c.deltaY;c.deltaMode===1?d*=16:c.deltaMode===2&&(d*=window.innerHeight),s=Math.min(r(),Math.max(0,s+d)),i||(i=requestAnimationFrame(f))},{passive:!1}),window.addEventListener("scroll",()=>{i||(s=a=window.scrollY)},{passive:!0})})();window.lbCards={topOf:()=>N,all:()=>H.players,byName:()=>F,histOf:kt,h2hOf:Yt,deltaTag:Lt,resLetter:T,fmtDate:V,canon:C,allMatches:B,ratingTimeline:is,altsOf:Jt};lt();Pt();xt();Qe();Ke();window.addEventListener("lb-lang",()=>{let e=window.scrollY,s=G,a={...R};xt(),u("#page-home").classList.contains("active")&&(s!=="all"||a.key!=="rank"||a.dir!==1)&&(G=s,R=a,O(".chip[data-filter]").forEach(i=>i.classList.toggle("on",i.dataset.filter===s)),_t(),et(s,a.key,a.dir)),Ft(),window.lbScrollNow(e)});function nt(e,s){let a=e.indexOf("window."+s);if(a<0)return null;let i=e.indexOf("=",a);for(;i<e.length&&"{[".indexOf(e[i])<0;)i++;let r=0,v=!1,f="",c=!1;for(let n=i;n<e.length;n++){let d=e[n];if(v){c?c=!1:d==="\\"?c=!0:d===f&&(v=!1);continue}if(d==='"'||d==="'"){v=!0,f=d;continue}if(d==="{"||d==="[")r++;else if((d==="}"||d==="]")&&(r--,r<=0))return JSON.parse(e.slice(i,n+1))}return null}var Wt="https://tierstats.github.io/";async function Gt(e,s){for(let a of e)try{let i=await fetch(a+(a.includes("?")?"&":"?")+s,{cache:"no-store"});if(i.ok)return await i.text()}catch{}return null}async function Tt(e){try{let s="cb="+Date.now(),[a,i]=await Promise.all([Gt([Wt+"data.js","data.js"],s),Gt([Wt+"log.js","log.js"],s)]);if(!a||!i)throw new Error("data unavailable");let r=nt(a,"LB_TANKS");r&&(window.LB_TANKS={...window.LB_TANKS_SNAPSHOT||{},...r});let v=nt(a,"LB_DATA"),f=nt(i,"LB_PUB")||(nt(i,"LB_LOG")?{matches:nt(i,"LB_LOG")}:null),c=[];if(v&&JSON.stringify(v)!==JSON.stringify(j)&&(j=v,window.LB_DATA=v,c.push("data")),f&&JSON.stringify(f)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=f,window.LB_LOG=f.matches||[],c.push("log")),c.length){lt(),Pt(),xt();let n=u("#last-updated");n&&(n.textContent=t("home.lastUpdated",{when:V(j.generated)||"today"}))}e&&E(c.length?t("misc.refreshed"):t("misc.upToDate"))}catch{e&&E(t("misc.refreshFailed"))}}Tt(!1);var ft=u("#lb-refresh-btn");ft&&ft.addEventListener("click",async()=>{ft.classList.add("spinning"),await Tt(!0),setTimeout(()=>ft.classList.remove("spinning"),400)});setInterval(()=>Tt(!1),6e4);document.addEventListener("visibilitychange",()=>{document.hidden||Tt(!1)});var re="tt1v1_fb_seen",U=null;function Ze(){try{return JSON.parse(localStorage.getItem(Mt)||"[]")}catch{return[]}}function ce(){try{return JSON.parse(localStorage.getItem(re)||"{}")||{}}catch{return{}}}function Xe(){let e=u("#fab-feedback");if(e&&!e.querySelector(".fb-dot")){let a=document.createElement("span");a.className="fb-dot",e.appendChild(a),requestAnimationFrame(()=>a.classList.add("in"))}let s=u("#fb-view-form");if(s&&!u("#fb-reply-banner")&&U){let a=document.createElement("div");a.id="fb-reply-banner",a.innerHTML=`${t("fb.teamReplied",{id:y(U.id)})}
      <div class="r">${y(U.reply)}</div>
      <button class="btn btn-ghost" id="fb-got-it" style="margin-top:9px;padding:6px 13px">${t("fb.gotIt")}</button>`,s.insertAdjacentElement("beforebegin",a),requestAnimationFrame(()=>a.classList.add("show")),u("#fb-got-it").addEventListener("click",ts)}}function ts(){if(U){let a=ce();a[U.id]=1;try{localStorage.setItem(re,JSON.stringify(a))}catch{}U=null}let e=u(".fb-dot");e&&(e.classList.add("out"),setTimeout(()=>e.remove(),420));let s=u("#fb-reply-banner");s&&(s.classList.remove("show"),setTimeout(()=>s.remove(),420))}async function le(){let e=ce();U=null;let s=Ze(),a=s.slice(0,Math.max(0,s.length-6)),i=[];for(let r of s.slice(-6))try{let v=await fetch(Y+"/status?id="+encodeURIComponent(r.id),{cache:"no-store"}),f=await v.json().catch(()=>({}));if(v.status===404||v.ok&&f.ok===!1)continue;i.push(r),v.ok&&f.ok&&f.reply&&!e[r.id]&&!U&&(U={id:r.id,reply:f.reply})}catch{i.push(r)}if(i.length!==s.slice(-6).length)try{localStorage.setItem(Mt,JSON.stringify([...a,...i]))}catch{}U&&Xe()}setTimeout(le,3500);setInterval(le,9e4);var es=pt.replace(/\/publish$/,"/api/ttstats"),ss=15e3;function as(e,s){let a=e&&e.stats||{};return s==="kd"?a.deaths?a.kills/a.deaths:a.kills!=null?a.kills:null:a[s]!=null?a[s]:null}function ns(e){let s=a=>String(a).replace(/["\\]/g,"\\$&");Object.keys(e).forEach(a=>{let i=e[a];window.LB_TANKS=Object.assign({},window.LB_TANKS||{},{[a]:i}),document.querySelectorAll(`[data-live-name="${s(a)}"][data-live]`).forEach(r=>{let v=r.dataset.live,f=as(i,v);if(f==null)return;let c=v==="kd"&&i.stats&&i.stats.deaths?2:0,n=Number(f.toFixed(c)),d=parseFloat(String(r.textContent).replace(/[^0-9.\-]/g,""));(isNaN(d)||d!==n)&&yt(r,n,{dec:c,dur:900})}),document.querySelectorAll(`canvas[data-tank-name="${s(a)}"]`).forEach(r=>{r.dataset.mounted&&window.TankRender&&window.TankRender.render(r,i,r.dataset.tankSize||"medium")})})}(function(){let s=!1,a=async()=>{if(s||document.visibilityState!=="visible")return;let i=new Set;document.querySelectorAll("[data-live-name]").forEach(v=>i.add(v.dataset.liveName)),document.querySelectorAll("canvas[data-tank-name]").forEach(v=>i.add(v.dataset.tankName));let r=[...i].filter(Boolean).slice(0,12);if(r.length){s=!0;try{let f=await(await fetch(es+"?names="+encodeURIComponent(r.join(",")),{cache:"no-store"})).json();f&&f.ok&&f.tanks&&ns(f.tanks)}catch{}s=!1}};setTimeout(a,2500),setInterval(a,ss)})();function is(){let e={},s=(c,n,d,p)=>{let l=n-x.conservative*d;(!e[c]||l>e[c].rating)&&(e[c]={rating:l,date:p||""})},a={},i=c=>{if(!a[c]){let[n,d]=se(c);a[c]={r:n,rd:d,lastIdx:null}}return a[c]},r={};for(let c of B()){if(c.date)continue;let n=c.sa>c.sb?1:c.sa<c.sb?0:.5;(r[c.a]=r[c.a]||[]).push([c.b,n]),(r[c.b]=r[c.b]||[]).push([c.a,1-n]),i(c.a).lastIdx=W,i(c.b).lastIdx=W}let v={};for(let c in r)v[c]=[i(c).r,i(c).rd];for(let c in r){let n=i(c),[d,p]=wt(n.r,n.rd,r[c].map(([l,h])=>[v[l][0],v[l][1],h]));n.r=d,n.rd=p,s(c,d,p,x.graceStart)}let f=new Map;for(let c of B().filter(n=>n.date).slice().reverse()){let n=St(c.date);f.has(n)||f.set(n,[]),f.get(n).push({a:C(c.a),b:C(c.b),sa:+c.sa,sb:+c.sb,date:c.date})}for(let c of[...f.keys()].sort((n,d)=>n-d)){for(let l in a){let h=a[l],g=c-(h.lastIdx==null?W:h.lastIdx);g>0&&(h.rd=Math.min(Math.sqrt(h.rd*h.rd+x.growth*x.growth*g),x.maxRd))}let n={},d="";for(let l of f.get(c)){let h=l.sa>l.sb?1:l.sa<l.sb?0:.5;(n[l.a]=n[l.a]||[]).push([l.b,h]),(n[l.b]=n[l.b]||[]).push([l.a,1-h]),i(l.a).lastIdx=c,i(l.b).lastIdx=c,l.date>d&&(d=l.date)}let p={};for(let l in n)p[l]=[i(l).r,i(l).rd];for(let l in n){let h=i(l),[g,b]=wt(h.r,h.rd,n[l].map(([L,S])=>[p[L][0],p[L][1],S]));h.r=g,h.rd=b,s(l,g,b,d)}}return e}})();
