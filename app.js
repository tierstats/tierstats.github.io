/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var j=window.LB_DATA,pt="https://tierstats-publish.tierstats.workers.dev/publish",h=(e,s=document)=>s.querySelector(e),O=(e,s=document)=>[...s.querySelectorAll(e)],y=e=>String(e).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),D=e=>encodeURIComponent(String(e)),At=e=>decodeURIComponent(e);function yt(e,s,a={}){let i=a.dur||1200,c=a.dec||0,v=performance.now(),m=parseFloat(e.textContent)||0;function l(n){let d=Math.min(1,(n-v)/i),p=1-Math.pow(1-d,3);e.textContent=(m+(s-m)*p).toFixed(c),d<1&&requestAnimationFrame(l)}requestAnimationFrame(l),setTimeout(()=>{e.textContent=s.toFixed(c)},i+300)}var ve='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',fe='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function $t(e,s=""){let a=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",i=e<=3?e===1?ve:fe:"";return`<div class="rank-badge ${a} ${s}" title="${t("home.rankTip",{n:e})}">${i}<span class="num">${e}</span></div>`}var q=e=>t(e==="W"?"rec.wLetter":e==="L"?"rec.lLetter":"rec.dLetter"),_={},I=[],H={players:[],byName:{},qualified:[]},it={},ut={},X={},Rt=new Set,Pt={prevRatings:{},prevRanks:{}};function ue(){try{localStorage.removeItem("tt1v1_baseline")}catch{}Pt={prevRatings:{...j.prevRatings||{}},prevRanks:{...j.prevRanks||{}}}}function me(){for(let a in it)delete it[a];let e=new Set(P().aliasRemoved||[]);Object.entries(j.aliases).forEach(([a,i])=>{e.has(a)||(it[a.toLowerCase()]=i)}),Object.entries(P().aliases||{}).forEach(([a,i])=>{it[String(a).toLowerCase()]=i});for(let a of Object.keys(ut))delete ut[a];for(let a of Object.keys(X))delete X[a];Rt.clear();let s=(a,i)=>{Object.keys(a||{}).forEach(c=>{let v=C(c);v!==c&&(i[v]=a[c])}),Object.keys(a||{}).forEach(c=>{let v=C(c);v===c&&(i[v]=a[c])})};s(j.seeds,ut),s(Pt.prevRatings,X),(j.inactiveList||[]).forEach(a=>Rt.add(C(a)))}var Ct={},Dt=e=>String(e).toLowerCase().replace(/[^a-z0-9]/g,"").replace(/0/g,"o").replace(/1/g,"i").replace(/3/g,"e").replace(/5/g,"s");function he(e,s){if(Math.abs(e.length-s.length)>3)return 99;let a=Array.from({length:s.length+1},(i,c)=>c);for(let i=1;i<=e.length;i++){let c=[i];for(let v=1;v<=s.length;v++)c[v]=Math.min(a[v]+1,c[v-1]+1,a[v-1]+(e[i-1]===s[v-1]?0:1));if(a=c,Math.min(...a)>3)return 99}return a[s.length]}function ge(){let e={},s=new Set(P().aliasRemoved||[]),a=c=>{let v=String(c).trim(),m=C(v);!v||Dt(v)===Dt(m)||he(v.toLowerCase(),m.toLowerCase())<=2||(e[m]=e[m]||[]).push(v)};Object.keys(j.aliases).forEach(c=>{s.has(c)||a(c)}),Object.keys(P().aliases||{}).forEach(a);for(let c of Object.keys(e)){let v=new Set([c.toLowerCase()]);e[c]=e[c].filter(m=>{let l=m.toLowerCase();return v.has(l)?!1:(v.add(l),!0)}).sort((m,l)=>m.localeCompare(l))}let i=j.cards&&j.cards.alts||{};Object.keys(i).forEach(c=>{let v=C(c),m=i[c];e[v]=(Array.isArray(m)?m:String(m||"").split(/[,;]/)).map(l=>String(l).trim()).filter(Boolean)}),Ct=e}function Yt(e){return Ct[e]||Ct[C(e)]||[]}function be(e){let s=Yt(e);if(!s.length)return"";let a=s.slice(0,2).join(", ")+(s.length>2?` +${s.length-2}`:"");return`<div class="p-alt" title="${y(s.join(", "))}">${t("lb.aka",{names:y(a)})}</div>`}var C=e=>{let s=String(e).trim(),a=new Set;for(;;){let i=it[s.toLowerCase()];if(!i||i===s||a.has(s))return s;a.add(s),s=i}};function kt(e){let s=[];return B().forEach(a=>{let i=(c,v,m)=>({opp:c,for_:v,against:m,res:v>m?"W":v<m?"L":"D",date:a.date});a.a===e?s.push(i(a.b,a.sa,a.sb)):a.b===e&&s.push(i(a.a,a.sb,a.sa))}),s}function zt(e){let s={};return kt(e).forEach(a=>{let i=s[a.opp]||(s[a.opp]={w:0,l:0,d:0,pf:0,pa:0});i[a.res.toLowerCase()]+=1,i.pf+=a.for_,i.pa+=a.against}),Object.entries(s).map(([a,i])=>({opp:a,...i})).sort((a,i)=>i.w+i.l+i.d-(a.w+a.l+a.d)||i.w-a.w)}function we(e){let s=_[e]||{};return s.provisional?`<span class="tag prov">${t("tag.provisional")}</span>`:s.inactive?`<span class="tag inact">${t("tag.inactive")}</span>`:""}function ye(e){let s=kt(e).slice(0,5).reverse();if(!s.length)return"";let a=s.map(i=>q(i.res)).join(" ");return`<span class="form" title="${t("form.title",{n:s.length,seq:a})}">${s.map(i=>`<i class="${i.res.toLowerCase()}">${q(i.res)}</i>`).join("")}</span>`}function Lt(){let e=typeof getLang=="function"?getLang():"en";return{en:"en-US",zh:"zh-CN",ja:"ja-JP",ru:"ru-RU"}[e]||"en-US"}function Vt(e){let s=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||"").slice(0,10));return s?new Date(+s[1],+s[2]-1,+s[3]):null}function V(e){let s=Vt(e);if(!s)return"";let a=s.getFullYear()===new Date().getFullYear();try{return new Intl.DateTimeFormat(Lt(),a?{month:"short",day:"numeric"}:{year:"numeric",month:"short",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Kt(e){let s=Vt(e);if(!s)return"";try{return new Intl.DateTimeFormat(Lt(),{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Qt(e){let s=new Date(Number(e)*1e3);if(!Number.isFinite(s.getTime()))return"";try{return new Intl.DateTimeFormat(Lt(),{dateStyle:"medium",timeStyle:"short"}).format(s)}catch{return s.toISOString().slice(0,16).replace("T"," ")}}function Zt(e){let s=Math.floor(Date.now()/1e3)-Number(e);if(!Number.isFinite(s))return"";let a=[["year",31536e3],["month",2592e3],["week",604800],["day",86400],["hour",3600],["minute",60]];try{let i=new Intl.RelativeTimeFormat(Lt(),{numeric:"auto"});for(let[c,v]of a)if(s>=v)return i.format(-Math.floor(s/v),c);return i.format(-Math.max(0,s),"second")}catch{let c=Math.floor(s/86400);return c>0?c+"d":"<1d"}}function St(e){let s=e.delta!=null?e.delta:0;if(Math.abs(s)<.05)return"";let a=s>0,i=Math.abs(s).toFixed(1);return`<span class="delta ${a?"up":"down"}" title="${a?t("delta.upTitle",{n:i}):t("delta.downTitle",{n:i})}">${a?"\u25B2":"\u25BC"} ${i}</span>`}function $e(){let e=Pt.prevRanks||{},s=Object.keys(e);if(s.length){let c={};return s.forEach(v=>{c[C(v)]=e[v]}),c}let a={};I.forEach(c=>{X[c.name]!=null&&(a[c.name]=X[c.name])});let i={};return Object.entries(a).sort((c,v)=>v[1]-c[1]).forEach(([c],v)=>{i[c]=v+1}),i}function ke(e,s){let a=s[e.name]!=null?s[e.name]:s[C(e.name)];if(a==null){let c=(j.newSince||{})[e.name];return!c||(Date.now()-Date.parse(c))/864e5>5?"":`<span class="mv new" title="${t("mv.newTitle")}">${t("mv.new")}</span>`}let i=a-e.rank;return i>0?`<span class="mv up" title="${tp("mv.up",i)}">\u25B2${i}</span>`:i<0?`<span class="mv down" title="${tp("mv.down",-i)}">\u25BC${-i}</span>`:""}function dt(e){return`${Math.round(e.rating-100)} \u2013 ${Math.round(e.rating+100)}`}function bt(e,s){if(!e.provisional)return e.rating.toFixed(1);let a=s?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:dt(e);return`<span class="prov-range" title="${t("rating.provTitle")}">${a}</span>`}var Xt="tt1v1_admin_log_v1",tt="tt1v1_admin_ok",z="tt1v1_admin_pw",Le=()=>sessionStorage.getItem(tt)==="1"||localStorage.getItem(tt)==="1",ot=()=>sessionStorage.getItem(z)||localStorage.getItem(z)||"";function Se(e,s){s?(localStorage.setItem(tt,"1"),localStorage.setItem(z,e)):(sessionStorage.setItem(tt,"1"),sessionStorage.setItem(z,e),localStorage.removeItem(tt),localStorage.removeItem(z))}function xe(){[sessionStorage,localStorage].forEach(e=>{e.removeItem(tt),e.removeItem(z)})}var Ht=null,Ot=!1;function te(){Ot||!ot()||(clearTimeout(Ht),Ht=setTimeout(()=>publishLog({silent:!0}),1500))}var Me=pt.replace(/\/publish$/,"/verify"),Ee=pt.replace(/\/publish$/,"/sync");function ee(){try{return JSON.parse(localStorage.getItem(Xt)||"[]")}catch{return[]}}function Te(e){try{localStorage.setItem(Xt,JSON.stringify(e))}catch{}te()}var se="tt1v1_admin_over_v1";function Q(){try{return JSON.parse(localStorage.getItem(se)||"{}")||{}}catch{return{}}}function K(e){try{localStorage.setItem(se,JSON.stringify(e))}catch{}te()}function P(){let e=window.LB_PUB||{},s=Q(),a=new Set([...e.aliasRemoved||[],...s.aliasRemoved||[]]),i=new Set([...e.seedRemoved||[],...s.seedRemoved||[]]),c=s.aliases||{},v={...s.seeds||{},...s.seedGlicko||{},...s.seedRd||{}},m=g=>Object.fromEntries(Object.entries(g||{}).filter(([b])=>!a.has(b)||c[b]!=null)),l=g=>Object.fromEntries(Object.entries(g||{}).filter(([b])=>!i.has(b)||v[b]!=null)),n=m({...e.aliases||{},...s.aliases||{}}),d=m({...e.aliasNotes||{},...s.aliasNotes||{}}),p=l({...e.seeds||{},...s.seeds||{}}),r=l({...e.seedGlicko||{},...s.seedGlicko||{}}),f=l({...e.seedRd||{},...s.seedRd||{}});return{aliases:n,aliasNotes:d,seeds:p,seedGlicko:r,seedRd:f,aliasRemoved:[...a].filter(g=>n[g]==null),seedRemoved:[...i].filter(g=>p[g]==null&&r[g]==null&&f[g]==null),settings:{...e.settings||{},...s.settings||{}},matchEdits:{...e.matchEdits||{},...s.matchEdits||{}},inactive:s.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...s.matchRemoved||[]])],faq:s.faq!=null?s.faq:e.faq!=null?e.faq:null}}function qe(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function B(){let e=P(),s=e.matchEdits||{},a=new Set(e.matchRemoved||[]),i=(r,f)=>{if(a.has(f))return null;let g=s[f],b=g?{...r,sa:g.sa,sb:g.sb,date:g.date!=null?g.date:r.date}:r;return{...b,a:C(b.a),b:C(b.b),sa:+b.sa,sb:+b.sb,key:f}},c=ee().map((r,f)=>i({...r,admin:!0,published:!1},"l:"+f)).filter(Boolean),v=qe().map((r,f)=>i({...r,admin:!0,published:!0},"p:"+f)).filter(Boolean),m=j.matches.map((r,f)=>i({...r,admin:!1,published:!1},"a:"+f)).filter(Boolean).reverse(),l=r=>{let f=r.a>r.b;return[f?r.b:r.a,f?r.a:r.b,f?r.sb:r.sa,f?r.sa:r.sb,r.date||""].join("|")},n={};m.forEach(r=>{let f=l(r);n[f]=(n[f]||0)+1});let d={};return c.concat(v).filter(r=>{let f=l(r);return d[f]=(d[f]||0)+1,d[f]>(n[f]||0)}).concat(m)}var M={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},mt=864e5,ct=Math.log(10)/400,ae=e=>1/Math.sqrt(1+3*ct*ct*e*e/(Math.PI*Math.PI)),Nt=(e,s,a)=>1/(1+Math.pow(10,-ae(a)*(e-s)/400));function Ae(e){let s=P().seeds||{};return s[e]!=null&&s[e]!==""?Number(s[e]):ut[e]}function ne(e){let s=(P().seedGlicko||{})[e],a=(P().seedRd||{})[e],i=s!=null&&s!==""?Number(s):null,c=a!=null&&a!==""?Number(a):null;if(i!=null||c!=null)return[i??M.unratedR,c??M.unratedRd];let v=Ae(e);return v!=null?[Math.max(M.seedMid+(v-M.oldMid)*M.ptsPer,M.minSeed),M.knownRd]:[M.unratedR,M.unratedRd]}function wt(e,s,a){let i=0,c=0;for(let[m,l,n]of a){let d=ae(l),p=Nt(e,m,l);i+=d*d*p*(1-p),c+=d*(n-p)}if(i*=ct*ct,i<=0)return[e,s];let v=1/(s*s)+i;return[e+ct/v*c,Math.sqrt(1/v)]}function Re(e,s){let a=Math.pow(10,s),i=e*a,c=Math.floor(i);return Math.abs(i-c-.5)<1e-6?(c+1)/a:Math.round(i)/a}var xt=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(M.periodDays*mt)),G=xt(M.graceStart),Ce={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function ie(){let e=P().settings||{};return(j.settings||[]).map(s=>({...s,value:Object.prototype.hasOwnProperty.call(e,s.name)?e[s.name]:s.value}))}function Oe(){for(let e of ie()){let s=Ce[e.name];if(!s)continue;if(s==="graceStart"){let i=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(i)&&(M.graceStart=i);continue}let a=Number(e.value);Number.isFinite(a)&&(M[s]=a)}G=xt(M.graceStart),O(".cons-val").forEach(e=>{e.textContent=String(M.conservative)}),O(".min-matches-val").forEach(e=>{e.textContent=String(M.minMatches)}),O(".min-opp-val").forEach(e=>{e.textContent=String(M.minOpp)})}function Ne(){Oe(),me(),ge();let e={},s=o=>{if(!e[o]){let[u,L]=ne(o);e[o]={name:o,r:u,rd:L,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[o]},a=(o,u,L,$,w,x)=>{let A=s(o);A.games++,A.opps.add(u),L>$?A.w++:L<$?A.l++:A.d++,A.lastIdx=x,w&&(A.lastDate=w)},i={};for(let o of B()){if(o.date)continue;let u=C(o.a),L=C(o.b),$=o.sa>o.sb?1:o.sa<o.sb?0:.5;(i[u]=i[u]||[]).push([L,$]),(i[L]=i[L]||[]).push([u,1-$]),a(u,L,o.sa,o.sb,"",G),a(L,u,o.sb,o.sa,"",G)}let c={};for(let o in i)c[o]=[s(o).r,s(o).rd];for(let o in i){let[u,L]=wt(c[o][0],c[o][1],i[o].map(([$,w])=>[c[$][0],c[$][1],w]));s(o).r=u,s(o).rd=L}let v=new Map;for(let o of B().filter(u=>u.date).slice().reverse()){let u=o.date,L=xt(u);v.has(L)||v.set(L,[]),v.get(L).push({a:C(o.a),b:C(o.b),sa:+o.sa,sb:+o.sb,date:u})}for(let o of[...v.keys()].sort((u,L)=>u-L)){for(let $ in e){let w=e[$],x=o-(w.lastIdx==null?G:w.lastIdx);x>0&&(w.rd=Math.min(Math.sqrt(w.rd*w.rd+M.growth*M.growth*x),M.maxRd))}let u={};for(let $ of v.get(o)){let w=$.sa>$.sb?1:$.sa<$.sb?0:.5;(u[$.a]=u[$.a]||[]).push([$.b,w]),(u[$.b]=u[$.b]||[]).push([$.a,1-w]),a($.a,$.b,$.sa,$.sb,$.date,o),a($.b,$.a,$.sb,$.sa,$.date,o)}let L={};for(let $ in u)L[$]=[s($).r,s($).rd];for(let $ in u){let[w,x]=wt(L[$][0],L[$][1],u[$].map(([A,F])=>[L[A][0],L[A][1],F]));s($).r=w,s($).rd=x}}let m=Object.values(e).map(o=>({name:o.name,glicko:o.r,rd:o.rd,rating:o.r-M.conservative*o.rd,matches:o.games,w:o.w,l:o.l,d:o.d,winPct:o.games?Re(o.w/o.games*100,1):0,opponents:o.opps.size,avgOpp:0,lastMatch:o.lastDate||"",provisional:!(o.games>=M.minMatches&&o.opps.size>=M.minOpp),inactive:!1})),l={};m.forEach(o=>{l[o.name]=o.glicko}),m.forEach(o=>{let u=0;e[o.name].opps.forEach(L=>{u+=l[L]!=null?l[L]:M.unratedR}),o.avgOpp=e[o.name].opps.size?u/e[o.name].opps.size:0});let n=Date.now(),d=Math.floor(n/(M.periodDays*mt));for(let o in e){let u=e[o],L=d-(u.lastIdx==null?G:u.lastIdx);L>0&&(u.rd=Math.min(Math.sqrt(u.rd*u.rd+M.growth*M.growth*L),M.maxRd))}m.forEach(o=>{o.glicko=e[o.name].r,o.rd=e[o.name].rd,o.rating=o.glicko-M.conservative*o.rd;let u=X[o.name],L=(j.curRatings||{})[o.name];o.delta=u!=null?(L??o.rating)-u:0});let p=Date.parse(M.graceStart+"T00:00:00Z")+M.graceDays*mt,r=new Set([...Rt,...P().inactive||[]]);m.forEach(o=>{o.inactive=r.has(o.name)||(o.lastMatch?n-Date.parse(o.lastMatch+"T00:00:00Z")>M.inactiveDays*mt:n>p)});let f={},g={};(j.players||[]).forEach((o,u)=>{let L=C(o.name);f[L]=o,g[L]=u});let b={};m.forEach(o=>{b[o.name]=o}),m.forEach(o=>{let u=f[o.name];u&&(o.rating=u.rating,o.glicko=u.glicko,o.rd=u.rd,o.matches=u.matches,o.w=u.w,o.l=u.l,o.d=u.d,o.winPct=u.winPct,o.opponents=u.opponents,o.avgOpp=u.avgOpp,u.lastMatch&&(o.lastMatch=u.lastMatch))});let k=[];(j.qualified||[]).forEach(o=>{let u=b[C(o.name)];u&&(u.provisional=!1,u.rank=o.rank!=null?o.rank:k.length+1,k.push(u))});let S=new Set(k.map(o=>o.name)),T=m.filter(o=>!S.has(o.name)&&!f[o.name]&&!f[C(o.name)]&&!o.provisional&&!o.inactive).sort((o,u)=>u.rating-o.rating);T.forEach((o,u)=>{o.rank=k.length+u+1});let N=k.concat(T);m.sort((o,u)=>u.rating-o.rating||(g[o.name]!=null?g[o.name]:1e9)-(g[u.name]!=null?g[u.name]:1e9));let U={};return m.forEach(o=>{U[o.name]=o}),{players:m,byName:U,qualified:N}}function lt(){ue(),H=Ne(),_=H.byName,I=H.qualified}var je=["page-home","page-player","page-compare","page-matches","page-cards","page-roster","page-analytics","page-method","page-faq","page-admin"];function Mt(){if(It){It=!1;return}let e=location.hash||"#/";je.forEach(c=>h("#"+c).classList.remove("active"));let s="#/"+(e.split("/")[1]||"");O(".nav a, .foot-nav a").forEach(c=>{let v=c.getAttribute("href");c.classList.toggle("active",v===s||e==="#/"&&v==="#/")});let a=h("#nav-glide"),i=document.querySelector(".nav a.active");if(a&&i&&i.offsetWidth>0?(a.style.width=i.offsetWidth+"px",a.style.transform=`translateX(${i.offsetLeft}px)`,a.style.opacity="1"):a&&(a.style.opacity="0"),e==="#/compare"||e.startsWith("#/compare/")){let c=e.split("/").slice(2).map(At);re(c[0]||"",c[1]||""),h("#page-compare").classList.add("active"),window.lbScrollNow(0)}else if(e.startsWith("#/player/"))He(At(e.slice(9))),h("#page-player").classList.add("active"),window.lbScrollNow(0);else if(e==="#/matches")Ue(),h("#page-matches").classList.add("active"),window.lbScrollNow(0);else if(e==="#/cards")typeof renderCards=="function"&&renderCards(),typeof window.lbLiveStatsTick=="function"&&window.lbLiveStatsTick(),h("#page-cards").classList.add("active"),window.lbScrollNow(0);else if(e.startsWith("#/card/")){typeof renderCards=="function"&&renderCards(),h("#page-cards").classList.add("active"),window.lbScrollNow(0);let c=At(e.slice(7));requestAnimationFrame(()=>{typeof window.cardsFocus=="function"&&window.cardsFocus(c)})}else e==="#/roster"?(We(),h("#page-roster").classList.add("active"),window.lbScrollNow(0)):e==="#/analytics"?(Ge(),h("#page-analytics").classList.add("active"),window.lbScrollNow(0)):e==="#/method"?(Je(),h("#page-method").classList.add("active"),window.lbScrollNow(0)):e==="#/faq"?(Ve(),h("#page-faq").classList.add("active"),window.lbScrollNow(0)):e==="#/admin"?(Z(),h("#page-admin").classList.add("active"),window.lbScrollNow(0)):(Ft(),h("#page-home").classList.add("active"),requestAnimationFrame(Be));Tt()}window.addEventListener("hashchange",Mt);function Ft(){J="all",R={key:"rank",dir:1},O(".chip[data-filter]").forEach(l=>l.classList.toggle("on",l.dataset.filter==="all")),_t();let e=B().length,s=H.players.length,a=I[0],i=Math.round(I.reduce((l,n)=>l+n.rd,0)/I.length),c=h("#hero-chip-matches");c&&(c.innerHTML=t("home.chipMatches",{n:e})),h("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">${t("stat.ranked")}</div>
      <div class="v"><span class="cu" data-target="${I.length}">0</span><small>${t("stat.ofTotal",{n:s})}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.matches")}</div>
      <div class="v"><span class="cu" data-target="${e}">0</span></div></div>
    <div class="stat-card"><div class="k">${t("stat.highest")}</div>
      <div class="v"><span class="cu" data-target="${a.rating}" data-dec="1">0</span><small>${y(a.name)}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.avgRd")}</div>
      <div class="v"><span class="cu" data-target="${i}" data-dec="1">0</span><small>${t("stat.certainty")}</small></div></div>`;let v=[I[1],I[0],I[2]].filter(Boolean);h("#fl-cards").innerHTML=v.map(l=>`
    <div class="fl-card r${l.rank}${l.rank===1?" champ":""} reveal" data-goto="${y(l.name)}">
      <div class="fl-top">
        ${$t(l.rank)}
        <div class="rd">RD ${l.rd.toFixed(0)}</div>
      </div>
      ${l.rank===1?`<div class="champ-tag">${t("home.champTag")}</div>`:""}
      <div class="nm">${y(l.name)}</div>
      <div class="rating">
        <span class="unit">${t("home.ratingUnit")}</span>
        <div class="big-row"><span class="big">${Math.round(l.rating)}</span>${St(l)}</div>
      </div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${l.winPct>=60?"":l.winPct>=40?"mid":"low"}" data-w="${l.winPct}"></div></div>
      </div>
      <div class="meta">
        <span><span class="w">${l.w}${q("W")}</span> <span class="l">${l.l}${q("L")}</span> ${l.d}${q("D")}</span>
        <span class="wc">${l.winPct.toFixed(1)}%</span>
        <span class="opp">${t("home.avgOpp",{n:l.avgOpp.toFixed(1)})}</span>
      </div>
    </div>`).join(""),requestAnimationFrame(()=>{O("#fl-cards .bar-fill").forEach(l=>{l.style.width=l.dataset.w+"%"})}),et(),oe();let m=h("#last-updated");m&&(m.textContent=t("home.lastUpdated",{when:V(j.generated)||"today"}))}function oe(){let e=B().filter(s=>s.date).slice(0,10);h("#battles-grid").innerHTML=e.length?e.map(s=>{let a=s.sa>s.sb,i=s.sb>s.sa;return`
    <div class="battle-row reveal" data-goto="${y(a?s.a:s.b)}">
      <div class="who ${a?"win":"lose"}" data-goto="${y(s.a)}">${y(s.a)}</div>
      <div class="vs">${t("vs")}</div>
      <div class="who r ${i?"win":"lose"}" data-goto="${y(s.b)}">${y(s.b)}</div>
      <div class="sc mono"><span class="${a?"win":"lose"}">${s.sa}</span> \u2013 <span class="${i?"win":"lose"}">${s.sb}</span></div>
      <div class="dt">${V(s.date)||(s.admin&&!s.published?t("battles.justNow"):t("misc.historical"))}</div>
    </div>`}).join(""):`<div class="empty" style="padding:26px;text-align:center;color:var(--dim);grid-column:1/-1">${t("battles.empty")}</div>`}var Ie=500,Pe="cubic-bezier(.22,.8,.24,1)",Fe=12;function _e(e,s){matchMedia("(prefers-reduced-motion: reduce)").matches||O(".lb-row",e).forEach((a,i)=>{let c=s.get(a.dataset.name);if(c===void 0||typeof a.animate!="function")return;let v=c-a.getBoundingClientRect().top;Math.abs(v)<=1||a.animate([{transform:`translateY(${v}px)`},{transform:"none"}],{duration:Ie,easing:Pe,delay:Math.min(i*Fe,220),fill:"backwards"})})}function et(e="all",s="rank",a=1){let i=h("#lb-body"),v=(e==="all"&&ht?I:H.players).slice().map(n=>({...n,rank:n.rank!=null?n.rank:9999}));jt&&(v=v.filter(n=>n.name.toLowerCase().includes(jt))),e==="provisional"?v=v.filter(n=>(_[n.name]||{}).provisional):e==="inactive"?v=v.filter(n=>(_[n.name]||{}).inactive):e==="veterans"?v=v.filter(n=>n.matches>=15):e==="rising"&&(v=v.filter(n=>n.winPct>=60&&n.matches>=5)),v.sort((n,d)=>{let p=n[s],r=d[s];return(typeof p=="string"?p.localeCompare(r):p-r)*a});let m=new Map;O(".lb-row",i).forEach(n=>m.set(n.dataset.name,n.getBoundingClientRect().top));let l=$e();i.innerHTML=v.map(n=>`
    <div class="lb-row ${n.rank<=3?"top"+n.rank:""}" data-name="${y(n.name)}" data-goto="${y(n.name)}">
      <div class="rank">${n.rank<=I.length?$t(n.rank,"sm")+ke(n,l):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="name-stack"><div class="pname">${y(n.name)}</div></div>${typeof cardsRowChip=="function"?cardsRowChip(n.name):""}</div>
      <div class="rating-cell mono">${St(n)}${bt(n,!0)}</div>
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
      <div class="col-status">${we(n.name)||ye(n.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?t("lb.emptyInactive"):e==="provisional"?t("lb.emptyProv"):t("lb.emptyNone")}</div>`,_e(i,m),requestAnimationFrame(()=>{O(".bar-fill",i).forEach(n=>{n.style.width=n.dataset.w+"%"})})}var J="all",R={key:"rank",dir:1},jt="",ht=!0;function _t(){O(".sortable").forEach(s=>s.classList.remove("sorted","asc"));let e=h(`.sortable[data-key="${R.key}"]`);e&&(e.classList.add("sorted"),R.dir===1&&e.classList.add("asc"))}function Be(){O("#stat-strip .cu").forEach(e=>yt(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),O(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}h("#lb-qual").addEventListener("click",()=>{ht=!ht,h("#lb-qual").classList.toggle("on",ht),et(J,R.key,R.dir)});h("#lb-filter").addEventListener("input",e=>{jt=e.target.value.trim().toLowerCase(),et(J,R.key,R.dir)});var rt=h("#theme-toggle");function Bt(){if(!rt)return;let e=document.documentElement.dataset.theme==="light",s=e?t("top.toDark"):t("top.toLight");rt.setAttribute("aria-pressed",String(e)),rt.setAttribute("aria-label",s),rt.title=s}rt.addEventListener("click",()=>{let s=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=s;try{localStorage.setItem("tt1v1_theme",s)}catch{}Bt()});Bt();document.addEventListener("click",e=>{let s=e.target.closest(".chip");if(s&&s.dataset.filter){O(".chip[data-filter]").forEach(c=>c.classList.remove("on")),s.classList.add("on"),J=s.dataset.filter,et(J,R.key,R.dir);return}let a=e.target.closest(".sortable");if(a){let c=a.dataset.key;R.key===c&&R.dir===-1?R={key:"rank",dir:1}:R.key===c?R={key:c,dir:-R.dir}:R={key:c,dir:1},_t(),et(J,R.key,R.dir);return}let i=e.target.closest("[data-goto]");i&&(e.stopPropagation(),location.hash="#/player/"+D(i.dataset.goto))});function De(e){let s=e.slice();for(let a=s.length-1;a>0;a--){let i=Math.floor(Math.random()*(a+1));[s[a],s[i]]=[s[i],s[a]]}return s}function Ut(e,s){let a=document.getElementById(e);if(!a)return;let i=a.querySelector(".pick-btn"),c=a.querySelector(".pick-search"),v=[...a.querySelectorAll(".pick-opt")],m=a.querySelector(".pick-empty"),l=-1,n=()=>v.filter(g=>!g.classList.contains("hide")),d=g=>{let b=n();if(!b.length){l=-1;return}l=(g%b.length+b.length)%b.length,v.forEach(k=>k.classList.remove("hover")),b[l].classList.add("hover"),b[l].scrollIntoView({block:"nearest"})},p=g=>{let b=g.trim().toLowerCase(),k=0;v.forEach(S=>{let T=!b||S.dataset.name.toLowerCase().includes(b);S.classList.toggle("hide",!T),T&&k++}),m.classList.toggle("show",k===0),l=-1,k&&d(0)},r=()=>{document.querySelectorAll(".pick.open").forEach(g=>{if(g!==a){g.classList.remove("open");let b=g.querySelector(".pick-btn");b&&b.setAttribute("aria-expanded","false")}}),a.classList.add("open"),i.setAttribute("aria-expanded","true"),c.value="",p(""),requestAnimationFrame(()=>c.focus())},f=()=>{a.classList.remove("open"),i.setAttribute("aria-expanded","false")};i.addEventListener("click",()=>{a.classList.contains("open")?f():r()}),c.addEventListener("input",()=>p(c.value)),c.addEventListener("keydown",g=>{if(g.key==="ArrowDown")g.preventDefault(),d(l+1);else if(g.key==="ArrowUp")g.preventDefault(),d(l-1);else if(g.key==="Enter"){g.preventDefault();let b=n();b[l]&&b[l].click()}else g.key==="Escape"&&(f(),i.focus())}),v.forEach(g=>{g.addEventListener("click",()=>{a.dataset.value=g.dataset.name,a.querySelector(".pick-cur").textContent=g.dataset.name,f(),s()}),g.addEventListener("mousemove",()=>{let b=n().indexOf(g);b>=0&&b!==l&&(l=b,v.forEach(k=>k.classList.remove("hover")),g.classList.add("hover"))})})}document.addEventListener("click",e=>{document.querySelectorAll(".pick.open").forEach(s=>{if(!s.contains(e.target)){s.classList.remove("open");let a=s.querySelector(".pick-btn");a&&a.setAttribute("aria-expanded","false")}})});function re(e,s){let a=h("#cmp-wrap"),c=H.players.slice().sort((w,x)=>(w.rank!=null?w.rank:9999)-(x.rank!=null?x.rank:9999)||w.name.localeCompare(x.name)).map(w=>w.name);if(c.length<2){a.innerHTML=`<div class="empty">${t("cmp.notEnough")}</div>`;return}let v=w=>w[Math.floor(Math.random()*w.length)],m=w=>v(c.filter(x=>x!==w)),l=_[e]?e:v(c),n=_[s]?s:m(l);n===l&&(n=m(l)),(l!==e||n!==s)&&history.replaceState(null,"","#/compare/"+D(l)+"/"+D(n));let d=_[l],p=_[n],r=I.find(w=>w.name===l),f=I.find(w=>w.name===n),g=Nt(d.glicko,p.glicko,p.rd),b=Nt(p.glicko,d.glicko,d.rd),k=Math.round(g/(g+b)*1e3)/10,S=Math.round(1e3-k*10)/10,T=B().filter(w=>w.a===l&&w.b===n||w.a===n&&w.b===l).map(w=>{let x=w.a===l,A=x?w.sa:w.sb,F=x?w.sb:w.sa;return{fa:A,fb:F,res:A>F?"W":A<F?"L":"D",date:w.date}}),N=T.reduce((w,x)=>(x.res==="W"?w.w++:x.res==="L"?w.l++:w.d++,w),{w:0,l:0,d:0}),U=De(c),o=(w,x,A)=>`
    <div class="pick" id="${w}" data-value="${y(x)}">
      <button type="button" class="pick-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="${y(A)}">
        <span class="pick-cur">${y(x)}</span>
        <svg class="pick-caret" width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true"><path d="M1.2 1.2 5.5 5.6 9.8 1.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="pick-menu">
        <input class="pick-search" type="text" autocomplete="off" spellcheck="false"
          placeholder="${t("cmp.searchPlaceholder")}" aria-label="${y(A)}">
        <div class="pick-list" role="listbox" aria-label="${y(A)}">
          ${U.map(F=>{let st=_[F];return`<button type="button" class="pick-opt${F===x?" on":""}" role="option" data-name="${y(F)}" aria-selected="${F===x?"true":"false"}">
              <span class="pick-n">${y(F)}</span>
              <span class="pick-meta mono">${st&&st.rating!=null?st.rating.toFixed(1):""}</span>
            </button>`}).join("")}
          <div class="pick-empty">${t("cmp.noResults")}</div>
        </div>
      </div>
    </div>`,u=(w,x,A,F,st)=>`
    <div class="cmp-trow">
      <div class="va mono${F?" win":""}">${x}</div>
      <div class="k">${w}</div>
      <div class="vb mono${st?" win":""}">${A}</div>
    </div>`,L='<span style="color:var(--dimmer)">\u2014</span>';a.innerHTML=`
    <div class="kicker anim">${t("cmp.versus")}</div>
    <h2 class="section-head anim" style="margin:6px 0 2px">${t("cmp.title")}</h2>
    <div class="cmp-pickers anim">
      ${o("cmp-a",l,t("cmp.firstPlayer"))}
      <button class="btn btn-ghost" id="cmp-swap" style="width:auto;margin:0" title="${t("cmp.swap")}">\u21C4</button>
      ${o("cmp-b",n,t("cmp.secondPlayer"))}
    </div>
    <div class="cmp-share anim">
      <button class="btn btn-ghost" id="cmp-copy" style="width:auto;margin:0">${t("cmp.copyLink")}</button>
      <span class="caption" id="cmp-copy-msg"></span>
    </div>

    <div class="cmp-hero anim">
      <div class="cmp-side a">
        <div class="cmp-sub">${r?t("cmp.rankN",{n:r.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${D(l)}">${y(l)}</a></div>
        <div class="cmp-rating mono">${d.provisional?dt(d):d.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",d.matches,{rd:d.rd.toFixed(1)})}</div>
      </div>
      <div class="cmp-vs">
        <div class="vs-mark">${t("cmp.vsMark")}</div>
        <div class="mono" style="font-size:11px;color:var(--dimmer)">${t("cmp.h2hShort",{n:T.length})}</div>
      </div>
      <div class="cmp-side b">
        <div class="cmp-sub">${f?t("cmp.rankN",{n:f.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${D(n)}">${y(n)}</a></div>
        <div class="cmp-rating mono">${p.provisional?dt(p):p.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",p.matches,{rd:p.rd.toFixed(1)})}</div>
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.probTitle")} <span class="n">${t("cmp.probSub")}</span></h3>
      <div class="cmp-prob-labels">
        <span style="color:var(--gold)">${y(l)} ${k.toFixed(1)}%</span>
        <span style="color:var(--blue)">${S.toFixed(1)}% ${y(n)}</span>
      </div>
      <div class="cmp-probbar"><i class="pa" style="width:${k}%"></i><i class="pb" style="width:${S}%"></i></div>
      <div class="cmp-prob-note">${t("cmp.probNote")}</div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.tale")}</h3>
      <div class="cmp-table">
        ${u(t("cmp.rating"),bt(d),bt(p),!d.provisional&&d.rating>p.rating,!p.provisional&&p.rating>d.rating)}
        ${u(t("cmp.rank"),r?"#"+r.rank:L,f?"#"+f.rank:L,r&&f&&r.rank<f.rank,r&&f&&f.rank<r.rank)}
        ${u(t("cmp.rdUnc"),d.rd.toFixed(1),p.rd.toFixed(1),d.rd<p.rd,p.rd<d.rd)}
        ${u(t("cmp.glicko"),d.glicko.toFixed(1),p.glicko.toFixed(1),d.glicko>p.glicko,p.glicko>d.glicko)}
        ${u(t("cmp.record"),`<span style="color:var(--green)">${d.w}${q("W")}</span> <span style="color:var(--red)">${d.l}${q("L")}</span> ${d.d}${q("D")}`,`<span style="color:var(--green)">${p.w}${q("W")}</span> <span style="color:var(--red)">${p.l}${q("L")}</span> ${p.d}${q("D")}`,d.winPct>p.winPct,p.winPct>d.winPct)}
        ${u(t("cmp.winRate"),d.winPct+"%",p.winPct+"%",d.winPct>p.winPct,p.winPct>d.winPct)}
        ${u(t("cmp.matchesPlayed"),d.matches,p.matches,!1,!1)}
        ${u(t("cmp.uniqueOpp"),d.opponents,p.opponents,d.opponents>p.opponents,p.opponents>d.opponents)}
        ${u(t("cmp.avgOppRating"),d.avgOpp.toFixed(1),p.avgOpp.toFixed(1),d.avgOpp>p.avgOpp,p.avgOpp>d.avgOpp)}
        ${u(t("cmp.h2h"),`${N.w}${q("W")} \u2013 ${N.l}${q("L")} \u2013 ${N.d}${q("D")}`,`${N.l}${q("W")} \u2013 ${N.w}${q("L")} \u2013 ${N.d}${q("D")}`,N.w>N.l,N.l>N.w)}
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.prevMeetings")} <span class="n">${tp("cmp.meetings",T.length)}</span></h3>
      <div class="match-list">
        ${T.map(w=>`
          <div class="match-row">
            <div class="res-chip ${w.res}">${q(w.res)}</div>
            <div class="who">${y(l)}</div>
            <div class="score mono">${w.fa} \u2013 ${w.fb}</div>
            <div class="who opp"><a href="#/player/${D(n)}" style="color:var(--blue)">${y(n)}</a></div>
            <div class="date mono" title="${Kt(w.date)}">${V(w.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("cmp.neverMet")}</div>`}
      </div>
      <div class="caption" style="margin-top:12px">${t("cmp.legacyNote")}</div>
    </div>`;let $=()=>{let w=h("#cmp-a").dataset.value,x=h("#cmp-b").dataset.value,A="#/compare/"+D(w)+"/"+D(x);location.hash!==A&&(It=!0,location.hash=A),re(w,x)};Ut("cmp-a",$),Ut("cmp-b",$),h("#cmp-swap").addEventListener("click",()=>{let w=h("#cmp-a"),x=h("#cmp-b"),A=w.dataset.value;w.dataset.value=x.dataset.value,x.dataset.value=A,$()}),h("#cmp-copy").addEventListener("click",()=>{let w=location.href.split("#")[0]+"#/compare/"+D(l)+"/"+D(n),x=()=>{h("#cmp-copy-msg").textContent=t("cmp.linkCopied")};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(w).then(x,()=>{h("#cmp-copy-msg").textContent=w}):h("#cmp-copy-msg").textContent=w})}var It=!1;function He(e){let s=_[e],a=h("#page-player");if(!s){a.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("pl.notFound",{name:y(e)})}</div></div></div>`;return}let i=I.find(r=>r.name===e),c=kt(e),v=c.slice(0,10),m=zt(e),l=Math.max(3,Math.min(100,100-s.rd/120*100)),n=(typeof window.lbTankFor=="function"?window.lbTankFor(e):null)||(window.LB_TANKS||{})[e]||(window.LB_TANKS_SNAPSHOT||{})[e]||null,d=n&&n.lastLogin?Zt(n.lastLogin):"",p=n&&n.lastLogin?Qt(n.lastLogin):"";a.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">${t("pl.back")}</a>
    <div class="pv-layout">
    <div class="pv-main">
    <div class="player-hero anim">
      <div class="player-top">
        ${i?$t(i.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${y(s.name)}</div>
          ${be(s.name)}
          <button class="pc-share pv-share" data-share="link" data-target="profile" data-name="${y(s.name)}"><svg class="pc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg><span>${t("cards.shareLink")}</span></button>
          <div class="player-rankline">
            ${i?t("pl.rankedOf",{rank:i.rank,total:I.length}):t("pl.unranked")}
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
            <div class="bar-track"><div class="bar-fill" style="width:${l}%"></div></div>
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
      <h3>${t("pl.recentForm")} <span class="n">${t("pl.lastN",{n:Math.min(10,c.length)})}</span></h3>
      <div class="form-strip">
        ${v.map((r,f)=>`<div class="form-pill ${r.res}" style="animation-delay:${f*55}ms"
           title="${t("pl.vsOpp",{opp:y(r.opp)})} ${r.for_}-${r.against}">${q(r.res)}</div>`).join("")||`<span class="empty">${t("pl.noGames")}</span>`}
      </div>
    </div>
    </div>
    <div class="pv-side">${typeof cardsHeroHTML=="function"?cardsHeroHTML(e):""}</div>
    </div>

    <div class="pv-lower">
    <div class="panel reveal">
      <h3>${t("pl.matchHistory")} <span class="n">${tp("pl.nGames",c.length)}</span></h3>
      <div class="match-list">
        ${c.map(r=>`
          <div class="match-row">
            <div class="res-chip ${r.res}">${q(r.res)}</div>
            <div class="who">${y(s.name)}</div>
            <div class="score mono">${r.for_} \u2013 ${r.against}</div>
            <div class="who opp"><a href="#/player/${D(r.opp)}" style="color:var(--blue)">${y(r.opp)}</a></div>
            <div class="date mono" title="${Kt(r.date)}">${V(r.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.h2h")} <span class="n">${tp("pl.nOpponents",m.length)}</span></h3>
      <div class="h2h-grid">
        ${m.map(r=>`
          <div class="h2h-card" data-goto="${y(r.opp)}">
            <div class="opp">${y(r.opp)}</div>
            <div class="rec mono"><span class="w">${r.w}${q("W")}</span> \xB7 <span class="l">${r.l}${q("L")}</span> \xB7 <span>${r.d}${q("D")}</span> \xB7 ${t("pl.pts",{pf:r.pf,pa:r.pa})}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>
    </div>
  </div>`,s.provisional||yt(h("#pv-rating"),s.rating,{dec:1,dur:900}),typeof cardsMountAll=="function"&&cardsMountAll(a),Tt()}function Ue(){oe();let e=h("#gm-body"),s=B();h("#gm-count").textContent=tp("gm.count",s.length),e.innerHTML=s.map(a=>{let i=a.sa>a.sb,c=a.sb>a.sa;return`
    <div class="gm-row">
      <div class="side ${i?"winner":"loser"}">
        <div class="dot ${i?"w":"l"}"></div>
        <div class="nm" data-goto="${y(a.a)}">${y(a.a)}</div>
      </div>
      <div class="sc mono" style="color:${i?"var(--green)":"var(--red)"}">${a.sa}</div>
      <div class="dash mono">\u2013</div>
      <div class="sc mono" style="color:${c?"var(--green)":"var(--red)"}">${a.sb}</div>
      <div class="side right ${c?"winner":"loser"}">
        <div class="dot ${c?"w":"l"}"></div>
        <div class="nm" data-goto="${y(a.b)}">${y(a.b)}</div>
      </div>
      <div class="dt mono">${a.admin&&!a.published?`<span class="tag fresh">${t("tag.new")}</span>`:V(a.date)||t("misc.historical")}</div>
    </div>`}).join("")}function We(){let e=H.players.filter(s=>s.provisional).sort((s,a)=>a.rating-s.rating);h("#roster-grid").innerHTML=e.map(s=>{let a=Math.min(100,Math.round(Math.min(1,s.matches/5)*50+Math.min(1,s.opponents/3)*50));return`
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
    </div>`}).join(""),requestAnimationFrame(()=>O("#roster-grid .prog-fill").forEach(s=>{s.style.width=s.dataset.w+"%"}))}function Ge(){let e=H.players,s=I.slice().sort((o,u)=>u.winPct-o.winPct).slice(0,10),a=e.slice().sort((o,u)=>u.matches-o.matches).slice(0,10),i=[];B().forEach(o=>{let u=_[o.a],L=_[o.b];if(!u||!L)return;let $=u.rating-L.rating;if(o.sa===o.sb)return;let w=o.sa>o.sb?o.a:o.b,x=Math.abs($);($<0&&w===o.a||$>0&&w===o.b)&&i.push({winner:w,loser:w===o.a?o.b:o.a,gap:x,score:w===o.a?`${o.sa}-${o.sb}`:`${o.sb}-${o.sa}`})}),i.sort((o,u)=>u.gap-o.gap);let c={};B().forEach(o=>{let u=[o.a,o.b].sort().join(" vs ");c[u]=(c[u]||0)+1});let v=Object.entries(c).sort((o,u)=>u[1]-o[1]).slice(0,10),m=e.map(o=>o.rating),l=Math.min(...m),n=Math.max(...m),d=8,p=(n-l)/d||1,r=Array.from({length:d},()=>0);m.forEach(o=>{r[Math.min(d-1,Math.max(0,Math.floor((o-l)/p)))]++});let f=Math.max(...r,1),g=r.map((o,u)=>{let L=Math.round((l+u*p)/10)*10,$=Math.round((l+(u+1)*p)/10)*10;return`
    <div class="hcol" title="${tp("an.histTip",o,{lo:L,hi:$})}">
      <div class="hbar" data-h="${Math.round(o/f*100)}"></div>
      <div class="hlbl">${L}\u2013${$}</div>
    </div>`}).join(""),b=e.slice().sort((o,u)=>u.opponents-o.opponents).slice(0,8),k=Math.max(...b.map(o=>o.opponents),1),S=b.map(o=>`
    <div class="mrow reveal" data-goto="${y(o.name)}">
      <div class="nm">${y(o.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(o.opponents/k*100)}"></div></div>
      <div class="val mono">${o.opponents}</div>
    </div>`).join(""),T=(o,u,L)=>o.map(($,w)=>`
    <div class="an-row reveal" data-goto="${y($.name)}">
      <div class="idx mono">${w+1}</div>
      <div class="nm">${y($.name)}</div>
      <div class="val mono">${u($)}</div>
      <div class="unit mono">${L($)}</div>
    </div>`).join(""),N=o=>tp("an.nMatches",o.matches);h("#an-grid").innerHTML=`
    <div class="an-panel">
      <div class="head"><h3>${t("an.topWinRate")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${T(s,o=>o.winPct+"%",N)}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.mostActive")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/></svg>
      </div>
      ${T(a,o=>o.matches,o=>t("an.matchesUnit"))}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.biggestUpsets")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${i.length?i.slice(0,8).map((o,u)=>`
        <div class="an-row reveal" data-goto="${y(o.winner)}">
          <div class="idx mono">${u+1}</div>
          <div class="nm">${y(o.winner)} <span style="color:var(--dimmer);font-weight:500">${t("an.def")}</span> ${y(o.loser)}</div>
          <div class="val mono">${o.score}</div>
          <div class="unit mono">${t("an.plusPts",{n:Math.round(o.gap)})}</div>
        </div>`).join(""):`<div class="empty">${t("an.noUpsets")}</div>`}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.rivalries")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${v.map(([o,u],L)=>`
        <div class="an-row reveal">
          <div class="idx mono">${L+1}</div>
          <div class="nm">${o.split(" vs ").map(y).join(` <span style="color:var(--dimmer);font-weight:500">${t("vs")}</span> `)}</div>
          <div class="val mono">${u}</div>
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
    </div>`;let U=()=>{O("#an-grid .hbar").forEach(o=>{o.style.height=o.dataset.h+"%"}),O("#an-grid .abar").forEach(o=>{o.style.width=o.dataset.w+"%"})};requestAnimationFrame(U),setTimeout(U,140),Tt()}function Je(){h("#settings-body").innerHTML=ie().map(e=>`
    <tr><td><b>${y(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${y(e.desc)}</div></td>
        <td class="val">${y(String(e.value))}</td></tr>`).join("")}function Ye(){return Array.from({length:11},(e,s)=>({q:t("faq.q"+(s+1)),a:t("faq.a"+(s+1))}))}function gt(){let e=P().faq;return Array.isArray(e)&&e.length?e:Ye()}function ze(){let e=window.cardsTiers;if(!e)return"";let{TIER_KEYS:s,tierOf:a,tierIdx:i,tierMin:c,tierLabel:v,crestSVG:m}=e,l={};s.forEach(p=>{l[p]=0}),(H.players||[]).forEach(p=>{p&&p.rating!=null&&(l[a(p.rating)]+=1)});let n=s.reduce((p,r)=>p+l[r],0),d=s.slice().reverse().map(p=>{let r=i(p),f=c(p),g=s[r+1]!=null?c(s[r+1]):null,b=r===0?`&lt; ${Math.round(g)}`:g!=null?`${Math.round(f)}\u2013${Math.round(g)-1}`:`${Math.round(f)}+`,k=n?l[p]/n*100:0;return`
      <tr class="tier-${p}">
        <td class="fd-badge"><span class="fd-badge-in">${m(p)}<span class="fd-name">${v(p)}</span></span></td>
        <td class="fd-range mono">${b}</td>
        <td class="fd-count"><b class="mono">${l[p]}</b><i style="width:${k.toFixed(1)}%"></i></td>
      </tr>`}).join("");return`
    <p class="fd-note">${t("faq.distNote")}</p>
    <table class="fd-table">
      <thead><tr><th>${t("faq.distBadge")}</th><th>${t("faq.distRange")}</th><th>${t("faq.distPlayers")}</th></tr></thead>
      <tbody>${d}</tbody>
    </table>`}function Ve(){let e='<svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',s=(a,i,c)=>`
    <div class="faq-item reveal" data-faq="${c}">
      <button class="faq-q" aria-expanded="false">
        <span>${a}</span>
        ${e}
      </button>
      <div class="faq-a"><div class="faq-a-in">${i}</div></div>
    </div>`;h("#faq-list").innerHTML=s(y(t("faq.distTitle")),ze(),"dist")+gt().map((a,i)=>s(y(String(a.q||"")),y(String(a.a||"")),i)).join(""),Tt()}document.addEventListener("click",e=>{let s=e.target.closest(".faq-q");if(!s)return;let a=s.closest(".faq-item"),i=a.classList.contains("open");O(".faq-item.open").forEach(c=>{c.classList.remove("open"),c.querySelector(".faq-q").setAttribute("aria-expanded","false")}),i||(a.classList.add("open"),s.setAttribute("aria-expanded","true"))});function Z(){let e=h("#admin-wrap");if(!Le()){e.innerHTML=`
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
    </div>`;let n=async()=>{let d=h("#admin-pw").value;try{let p=await fetch(Me,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:d})});if(p.ok){let r=await p.json().catch(()=>({}));Se(r.token||d,h("#admin-remember").checked),Z(),E("Welcome back, commander.");return}if(p.status===429){E("Too many attempts \u2014 wait a few minutes.");return}}catch{}h("#admin-pw").style.borderColor="var(--red)",E("Wrong password.")};h("#admin-auth").addEventListener("click",n),h("#admin-pw").addEventListener("keydown",d=>{d.key==="Enter"&&n()});return}let a=P(),i='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',c=a.inactive.map(n=>`
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
      <div class="log-list" id="ov-inact-list" style="margin-top:12px">${c}</div>
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

  <datalist id="player-list">${H.players.map(n=>`<option value="${y(n.name)}">`).join("")}</datalist>`,h("#admin-lock").addEventListener("click",()=>{xe(),Z()}),h("#admin-publish").addEventListener("click",()=>v()),h("#admin-sync").addEventListener("click",async()=>{let n=h("#admin-sync"),d=h("#admin-sync-status");n.disabled=!0,d.textContent="syncing\u2026";try{let p=await fetch(Ee,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:ot()})}),r=await p.json().catch(()=>({}));p.ok&&r.ok?(d.textContent=r.changed?`synced \u2713 ${r.matches} matches / ${r.players} players`:"already up to date \u2713",E(r.changed?"Sheet synced \u2014 the live site was updated.":"Site already matches the sheet.")):p.status===429?(d.textContent="rate limited",E("Too many attempts \u2014 wait a few minutes.")):(d.textContent="sync failed",E("Sync failed: "+(r.error||p.status)))}catch{d.textContent="network error",E("Sync failed (network).")}n.disabled=!1});async function v(n){let d=!!(n&&n.silent),p=ot()||(d?"":(window.prompt("Admin password:")||"").trim());if(!p){E(d?'Saved here \u2014 auto-publish needs a stored password. Use "Publish to everyone".':"Publish cancelled.");return}Ot=!0;let r=P(),f={},g=[];for(let[S,T]of Object.entries(r.matchEdits||{}))S.startsWith("a:")&&(f[S]=T);for(let S of r.matchRemoved||[])S.startsWith("a:")&&g.push(S);let b=B().filter(S=>S.admin).map(S=>({a:S.a,b:S.b,sa:S.sa,sb:S.sb,date:S.date||""})),k={matches:b,aliases:r.aliases||{},aliasNotes:r.aliasNotes||{},aliasRemoved:r.aliasRemoved||[],inactive:r.inactive||[],seeds:r.seeds||{},seedGlicko:r.seedGlicko||{},seedRd:r.seedRd||{},seedRemoved:r.seedRemoved||[],settings:r.settings||{},matchEdits:f,matchRemoved:g,faq:r.faq!=null?r.faq:[]};try{let S=await fetch(pt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:p,doc:k,message:`Publish match log (${b.length} matches)`})}),T=await S.json().catch(()=>({}));if(!S.ok||!T.ok){S.status===403&&sessionStorage.removeItem(z),E("Publish failed: "+(T.error||"HTTP "+S.status));return}window.LB_PUB=k,window.LB_LOG=b,Te([]),K({}),lt(),d||Z(),E(d?"Saved \u2014 live for everyone \u2713":"Published! Everyone sees it on their next visit.")}catch{E("Publish failed: network error.")}finally{Ot=!1}}h("#admin-export").addEventListener("click",()=>{let n=new Blob([JSON.stringify(ee(),null,2)],{type:"application/json"}),d=document.createElement("a");d.href=URL.createObjectURL(n),d.download="match-log.json",d.click(),URL.revokeObjectURL(d.href),E("Log exported.")}),h("#ov-inact-toggle").addEventListener("click",()=>{let n=h("#ov-inact-n").value.trim();if(!n){E("Type a player name first.");return}let d=Q(),p=P().inactive||[],r=p.includes(n)?p.filter(f=>f!==n):[...p,n];K({...d,inactive:r}),lt(),Z(),E(r.includes(n)?`${n} marked inactive.`:`${n} marked active again.`)}),h("#ov-inact-list").addEventListener("click",n=>{let d=n.target.closest("[data-inact-del]");if(!d)return;let p=Q();K({...p,inactive:(P().inactive||[]).filter(r=>r!==d.dataset.inactDel)}),lt(),Z()});let m=()=>{let n=gt();h("#faq-admin-list").innerHTML=n.map((d,p)=>`
      <div class="log-item fix-row" data-faq-idx="${p}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${y(String(d.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${y(String(d.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${p}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${p}" title="Delete question">${i}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};m(),h("#faq-admin-list").addEventListener("click",n=>{let d=n.target.closest("[data-faq-save]"),p=n.target.closest("[data-faq-del]"),r=gt().map(g=>({...g}));if(d){let g=d.closest("[data-faq-idx]");r[parseInt(d.dataset.faqSave,10)]={q:g.querySelector('[data-fq="q"]').value.trim(),a:g.querySelector('[data-fq="a"]').value.trim()}}else if(p)r.splice(parseInt(p.dataset.faqDel,10),1);else return;let f=Q();K({...f,faq:r}),m(),E("Q&A updated \u2014 publish to make it public.")}),h("#faq-add").addEventListener("click",()=>{let n=h("#faq-new-q").value.trim(),d=h("#faq-new-a").value.trim();if(!n||!d){E("Fill in both the question and the answer.");return}let p=Q();K({...p,faq:[...gt().map(r=>({...r})),{q:n,a:d}]}),m(),E("Question added.")}),h("#faq-reset").addEventListener("click",()=>{let n=Q();K({...n,faq:null}),m(),E("Q&A back to the built-in list.")}),window._fbTimer&&(clearInterval(window._fbTimer),window._fbTimer=null);async function l(){let n=h("#fb-inbox");if(!n||document.querySelector("#fb-inbox [data-fb-reply]:focus"))return;let d=ot();if(!d){n.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let p=await fetch(Y+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:d})}),r=await p.json().catch(()=>({}));if(!p.ok||!r.ok){n.innerHTML=`<div class="empty">Could not load messages (${y(r.error||"HTTP "+p.status)}).</div>`;return}let f=r.items||[],g={};n.querySelectorAll("[data-fb-id]").forEach(b=>{let k=b.querySelector("[data-fb-reply]");k&&k.value&&(g[b.dataset.fbId]=k.value)}),n.innerHTML=f.map(b=>`
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
        </div>`).join("")||'<div class="empty">No messages yet.</div>',n.querySelectorAll("[data-fb-id]").forEach(b=>{let k=b.querySelector("[data-fb-reply]");k&&g[b.dataset.fbId]!=null&&(k.value=g[b.dataset.fbId])})}catch{n.innerHTML='<div class="empty">Network error loading messages.</div>'}}l(),h("#fb-refresh").addEventListener("click",()=>{l(),E("Inbox refreshed.")}),window._fbTimer=setInterval(()=>{if(!h("#fb-inbox")){clearInterval(window._fbTimer),window._fbTimer=null;return}document.hidden||l()},2e3),h("#fb-inbox").addEventListener("click",async n=>{let d=n.target.closest("[data-fb-send]"),p=n.target.closest("[data-fb-del]"),r=n.target.closest("[data-fb-resolve]");if(!d&&!p&&!r)return;let f=n.target.closest("[data-fb-id]"),g=f.dataset.fbId,b=ot();try{if(r){let k=f.dataset.fbResolved!=="1";if(!(await fetch(Y+"/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:b,id:g,resolved:k})}).then(T=>T.json())).ok){E("Could not update \u2014 try again.");return}E(k?"Marked as resolved \u2713":"Message reopened."),l()}else if(d){let k=f.querySelector("[data-fb-reply]").value;if(!(await fetch(Y+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:b,id:g,reply:k})}).then(T=>T.json())).ok){E("Reply failed.");return}E("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(Y+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:b,id:g})}).then(S=>S.json())).ok){E("Delete failed.");return}f.remove(),E("Message deleted.")}}catch{E("Network error.")}})}var vt=document.getElementById("fl-cards");vt&&window.matchMedia("(hover: hover)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(vt.addEventListener("pointermove",e=>{let s=e.target.closest&&e.target.closest(".fl-card");if(!s)return;let a=s.getBoundingClientRect(),i=(e.clientX-a.left)/a.width-.5,c=(e.clientY-a.top)/a.height-.5;s.classList.add("tilt"),s.style.transform=`perspective(1000px) rotateY(${(i*7).toFixed(2)}deg) rotateX(${(-c*6).toFixed(2)}deg) translateY(-6px)`}),vt.addEventListener("pointerleave",()=>{vt.querySelectorAll(".fl-card").forEach(e=>{e.style.transform="",e.classList.remove("tilt")})}));h("#search").addEventListener("input",e=>{let s=e.target.value.trim().toLowerCase(),a=h("#search-drop");if(!s){a.classList.remove("show");return}let i=H.players.filter(c=>c.name.toLowerCase().includes(s)).slice(0,8);if(!i.length){a.classList.remove("show");return}a.innerHTML=i.map(c=>`
    <a class="drop-row" href="#/player/${D(c.name)}">
      ${c.rank?$t(c.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${y(c.name)}</span>        <span class="mono" style="margin-left:auto;color:var(--dim)">${bt(c,!0)}</span>
    </a>`).join(""),a.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||h("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(h("#search-drop").classList.remove("show"),h("#search").value="")});var Y=pt.replace(/\/publish$/,"/feedback"),Et="tt1v1_fb_tickets";function Ke(){try{return JSON.parse(localStorage.getItem(Et)||"[]")}catch{return[]}}function Qe(e){let s=Ke();s.push({id:e,ts:Date.now()});try{localStorage.setItem(Et,JSON.stringify(s.slice(-20)))}catch{}}function Ze(){let e=h("#fb-overlay"),s=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>h("#fb-msg").focus(),180)},a=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};h("#fab-feedback").addEventListener("click",s),h("#fb-close").addEventListener("click",a),h("#fb-done").addEventListener("click",a),e.addEventListener("click",n=>{n.target===e&&a()}),document.addEventListener("keydown",n=>{n.key==="Escape"&&e.classList.contains("show")&&a()});let i=h("#faq-feedback-btn");i&&i.addEventListener("click",s);let c=h("#fb-msg"),v=h("#fb-count-n");c.addEventListener("input",()=>{v.textContent=String(c.value.length);try{localStorage.setItem("tt1v1_fb_draft",c.value)}catch{}});try{let n=localStorage.getItem("tt1v1_fb_draft");n&&(c.value=n,v.textContent=String(n.length))}catch{}let m=h("#fb-send");m.addEventListener("click",async()=>{let n=c.value.trim();if(n.length<5){c.focus(),c.classList.add("fb-nudge"),setTimeout(()=>c.classList.remove("fb-nudge"),500),E(t("fb.writeFirst"));return}m.classList.add("busy"),m.disabled=!0;try{let d=await fetch(Y,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:h("#fb-name").value.trim(),contact:h("#fb-contact").value.trim(),message:n})}),p=await d.json().catch(()=>({}));if(!d.ok||!p.ok){E(t("fb.couldNotSend",{err:p.error||"HTTP "+d.status}));return}Qe(p.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}h("#fb-ticket-code").textContent=p.id,h("#fb-view-form").hidden=!0,h("#fb-view-done").hidden=!1}catch{E(t("fb.netError"))}finally{m.classList.remove("busy"),m.disabled=!1}});let l=document.querySelector(".fb-ticket");l&&l.addEventListener("click",async()=>{let n=(h("#fb-ticket-code").textContent||"").trim();if(!n||n==="\u2014")return;try{await navigator.clipboard.writeText(n)}catch{let r=document.createElement("textarea");r.value=n,document.body.appendChild(r),r.select();try{document.execCommand("copy")}catch{}r.remove()}let d=h("#fb-copied");d&&(d.classList.add("show"),clearTimeout(window._fbCopiedT),window._fbCopiedT=setTimeout(()=>d.classList.remove("show"),1800)),E(t("fb.ticketCopied"))}),h("#fb-check").addEventListener("click",async()=>{let n=h("#fb-ticket-in").value.trim(),d=h("#fb-reply-out");if(n){d.classList.add("show"),d.textContent=t("fb.checking");try{let p=await fetch(Y+"/status?id="+encodeURIComponent(n)),r=await p.json().catch(()=>({}));if(!p.ok||!r.ok){d.textContent=t("fb.noTicket");return}d.innerHTML=r.resolved?`${t("fb.statusResolved")}${r.reply?`<br>${t("fb.replyFrom",{reply:y(r.reply)})}`:""}`:r.reply?t("fb.replyFrom",{reply:y(r.reply)}):t("fb.statusPending",{status:y(r.status)})}catch{d.textContent=t("fb.netErrorShort")}}})}function Xe(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let s=null,a=null,i=null,c=0,v=0,m=0,l=r=>{let f=r&&r.closest?r.closest("[title],[data-tip]"):null;return f&&f.hasAttribute("title")&&(f.setAttribute("data-tip",f.getAttribute("title")),f.removeAttribute("title")),f&&f.getAttribute("data-tip")?f:null},n=(r,f)=>{let g=e.offsetWidth,b=e.offsetHeight,k=r+14,S=f+18;k+g>window.innerWidth-8&&(k=r-g-14),S+b>window.innerHeight-8&&(S=f-b-14),k=Math.max(8,k),S=Math.max(8,S);let T=e.classList.contains("show")&&e.style.left?Math.abs(parseFloat(e.style.left)-k)+Math.abs(parseFloat(e.style.top)-S)<150:!1;e.classList.toggle("snap",!T),e.style.left=k+"px",e.style.top=S+"px"},d=(r,f,g)=>{s=r,e.textContent=r.getAttribute("data-tip"),n(f,g),e.classList.add("show")},p=()=>{clearTimeout(a),clearTimeout(i),a=i=null,e.classList.remove("show"),s=null};document.addEventListener("mousemove",r=>{v=r.clientX,m=r.clientY;let f=l(r.target);if(f){if(clearTimeout(i),i=null,f===s){e.classList.contains("show")&&(cancelAnimationFrame(c),c=requestAnimationFrame(()=>n(v,m)));return}clearTimeout(a),e.classList.contains("show")?d(f,v,m):a=setTimeout(()=>d(f,v,m),90);return}s&&!i&&(i=setTimeout(p,110))},{passive:!0}),window.addEventListener("scroll",p,{passive:!0}),document.addEventListener("mousedown",p,{passive:!0})}var Wt;function E(e){let s=h("#toast");s.textContent=e,s.classList.add("show"),clearTimeout(Wt),Wt=setTimeout(()=>s.classList.remove("show"),2600)}var at;function Tt(){at&&at.disconnect(),at=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&(s.target.classList.add("in"),O(".cu",s.target).forEach(a=>yt(a,parseFloat(a.dataset.target),{dec:parseInt(a.dataset.dec||0)})),at.unobserve(s.target))})},{threshold:.12}),O(".reveal").forEach(e=>at.observe(e))}(function(){let s=h("#scroll-progress"),a=h("#to-top"),i=h("#page-home .hero-row"),c=document.querySelector(".topbar"),v=!1,m=null,l=null,n=()=>{v=!1;let f=window.scrollY,g=document.documentElement.scrollHeight-window.innerHeight;if(s&&(s.style.transform=`scaleX(${g>0?Math.min(1,f/g):0})`),a&&a.classList.toggle("show",f>640),c&&c.classList.toggle("scrolled",f>10),i&&f<1400){let b=Math.round(f*.14),k=Math.max(.3,1-f/950).toFixed(2);b!==m&&(i.style.transform=`translateY(${b}px)`,m=b),k!==l&&(i.style.opacity=k,l=k)}},d,p=document.documentElement,r=()=>{p.classList.add("is-scrolling"),c&&c.classList.add("scrolling"),clearTimeout(d),d=setTimeout(()=>{p.classList.remove("is-scrolling"),c&&c.classList.remove("scrolling")},160),v||(v=!0,requestAnimationFrame(n))};window.addEventListener("scroll",r,{passive:!0}),a&&a.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),n()})();var ce=()=>{};window.lbScrollNow=e=>{ce(),window.scrollTo({top:e||0,behavior:"instant"})};(function(){if(matchMedia("(prefers-reduced-motion: reduce)").matches||!matchMedia("(pointer: fine)").matches)return;let s=window.scrollY,a=s,i=0,c=0,v=()=>Math.max(0,document.documentElement.scrollHeight-window.innerHeight),m=n=>{a=n,window.scrollTo({top:Math.round(n),behavior:"instant"})};ce=()=>{i&&(cancelAnimationFrame(i),i=0),c=0,s=a=window.scrollY};function l(n){let d=c?Math.min(64,n-c):16.7;c=n;let p=s-a;if(Math.abs(p)<1){m(s),i=0,c=0;return}m(a+p*(1-Math.pow(.84,d/16.7))),i=requestAnimationFrame(l)}window.addEventListener("wheel",n=>{if(n.ctrlKey||n.defaultPrevented||n.deltaY===0)return;let d=n.target instanceof Element?n.target:null;if(d&&d.closest("textarea, input, select, [data-native-scroll]"))return;for(let r=d;r&&r!==document.documentElement;r=r.parentElement){let f=getComputedStyle(r).overflowY;if((f==="auto"||f==="scroll")&&r.scrollHeight>r.clientHeight+1){if(!(n.deltaY>0?r.scrollTop+r.clientHeight>=r.scrollHeight-1:r.scrollTop<=0))return;break}}n.preventDefault();let p=n.deltaY;n.deltaMode===1?p*=16:n.deltaMode===2&&(p*=window.innerHeight),s=Math.min(v(),Math.max(0,s+p)),i||(i=requestAnimationFrame(l))},{passive:!1}),window.addEventListener("scroll",()=>{i||(s=a=window.scrollY)},{passive:!0})})();window.lbCards={topOf:()=>I,all:()=>H.players,byName:()=>_,histOf:kt,h2hOf:zt,deltaTag:St,resLetter:q,fmtDate:V,canon:C,allMatches:B,ratingTimeline:rs,altsOf:Yt,lastSeenText:Zt,lastSeenExact:Qt};lt();Ft();Mt();Ze();Xe();window.addEventListener("lb-lang",()=>{let e=window.scrollY,s=J,a={...R};Mt(),h("#page-home").classList.contains("active")&&(s!=="all"||a.key!=="rank"||a.dir!==1)&&(J=s,R=a,O(".chip[data-filter]").forEach(i=>i.classList.toggle("on",i.dataset.filter===s)),_t(),et(s,a.key,a.dir)),Bt(),window.lbScrollNow(e)});function nt(e,s){let a=e.indexOf("window."+s);if(a<0)return null;let i=e.indexOf("=",a);for(;i<e.length&&"{[".indexOf(e[i])<0;)i++;let c=0,v=!1,m="",l=!1;for(let n=i;n<e.length;n++){let d=e[n];if(v){l?l=!1:d==="\\"?l=!0:d===m&&(v=!1);continue}if(d==='"'||d==="'"){v=!0,m=d;continue}if(d==="{"||d==="[")c++;else if((d==="}"||d==="]")&&(c--,c<=0))return JSON.parse(e.slice(i,n+1))}return null}var Gt="https://tierstats.github.io/";async function Jt(e,s){for(let a of e)try{let i=await fetch(a+(a.includes("?")?"&":"?")+s,{cache:"no-store"});if(i.ok)return await i.text()}catch{}return null}async function qt(e){try{let s="cb="+Date.now(),[a,i]=await Promise.all([Jt([Gt+"data.js","data.js"],s),Jt([Gt+"log.js","log.js"],s)]);if(!a||!i)throw new Error("data unavailable");let c=nt(a,"LB_TANKS");c&&(window.LB_TANKS={...window.LB_TANKS_SNAPSHOT||{},...c});let v=nt(a,"LB_DATA"),m=nt(i,"LB_PUB")||(nt(i,"LB_LOG")?{matches:nt(i,"LB_LOG")}:null),l=[];if(v&&JSON.stringify(v)!==JSON.stringify(j)&&(j=v,window.LB_DATA=v,l.push("data")),m&&JSON.stringify(m)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=m,window.LB_LOG=m.matches||[],l.push("log")),l.length){lt(),Ft(),Mt();let n=h("#last-updated");n&&(n.textContent=t("home.lastUpdated",{when:V(j.generated)||"today"}))}e&&E(l.length?t("misc.refreshed"):t("misc.upToDate"))}catch{e&&E(t("misc.refreshFailed"))}}qt(!1);var ft=h("#lb-refresh-btn");ft&&ft.addEventListener("click",async()=>{ft.classList.add("spinning"),await qt(!0),setTimeout(()=>ft.classList.remove("spinning"),400)});setInterval(()=>qt(!1),6e4);document.addEventListener("visibilitychange",()=>{document.hidden||qt(!1)});var le="tt1v1_fb_seen",W=null;function ts(){try{return JSON.parse(localStorage.getItem(Et)||"[]")}catch{return[]}}function de(){try{return JSON.parse(localStorage.getItem(le)||"{}")||{}}catch{return{}}}function es(){let e=h("#fab-feedback");if(e&&!e.querySelector(".fb-dot")){let a=document.createElement("span");a.className="fb-dot",e.appendChild(a),requestAnimationFrame(()=>a.classList.add("in"))}let s=h("#fb-view-form");if(s&&!h("#fb-reply-banner")&&W){let a=document.createElement("div");a.id="fb-reply-banner",a.innerHTML=`${t("fb.teamReplied",{id:y(W.id)})}
      <div class="r">${y(W.reply)}</div>
      <button class="btn btn-ghost" id="fb-got-it" style="margin-top:9px;padding:6px 13px">${t("fb.gotIt")}</button>`,s.insertAdjacentElement("beforebegin",a),requestAnimationFrame(()=>a.classList.add("show")),h("#fb-got-it").addEventListener("click",ss)}}function ss(){if(W){let a=de();a[W.id]=1;try{localStorage.setItem(le,JSON.stringify(a))}catch{}W=null}let e=h(".fb-dot");e&&(e.classList.add("out"),setTimeout(()=>e.remove(),420));let s=h("#fb-reply-banner");s&&(s.classList.remove("show"),setTimeout(()=>s.remove(),420))}async function pe(){let e=de();W=null;let s=ts(),a=s.slice(0,Math.max(0,s.length-6)),i=[];for(let c of s.slice(-6))try{let v=await fetch(Y+"/status?id="+encodeURIComponent(c.id),{cache:"no-store"}),m=await v.json().catch(()=>({}));if(v.status===404||v.ok&&m.ok===!1)continue;i.push(c),v.ok&&m.ok&&m.reply&&!e[c.id]&&!W&&(W={id:c.id,reply:m.reply})}catch{i.push(c)}if(i.length!==s.slice(-6).length)try{localStorage.setItem(Et,JSON.stringify([...a,...i]))}catch{}W&&es()}setTimeout(pe,3500);setInterval(pe,9e4);var as=pt.replace(/\/publish$/,"/api/ttstats"),ns=15e3;function is(e,s){let a=e&&e.stats||{};return s==="kd"?a.deaths?a.kills/a.deaths:a.kills!=null?a.kills:null:a[s]!=null?a[s]:null}function os(e){let s=a=>String(a).replace(/["\\]/g,"\\$&");Object.keys(e).forEach(a=>{let i=e[a];window.LB_TANKS=Object.assign({},window.LB_TANKS||{},{[a]:i}),document.querySelectorAll(`[data-live-name="${s(a)}"][data-live]`).forEach(c=>{let v=c.dataset.live,m=is(i,v);if(m==null)return;let l=v==="kd"&&i.stats&&i.stats.deaths?2:0,n=Number(m.toFixed(l)),d=parseFloat(String(c.textContent).replace(/[^0-9.\-]/g,""));(isNaN(d)||d!==n)&&yt(c,n,{dec:l,dur:900})}),document.querySelectorAll(`canvas[data-tank-name="${s(a)}"]`).forEach(c=>{c.dataset.mounted&&window.TankRender&&window.TankRender.render(c,i,c.dataset.tankSize||"medium")})})}(function(){let s=!1,a=0,i=new Set,c=0,v=0,m=n=>{a||(a=setTimeout(()=>{a=0,l()},n))};window.lbTankWant=n=>{n&&i.add(String(n)),s&&m(350)};let l=async()=>{if(s){m(300);return}if(document.visibilityState!=="visible")return;let n=[...new Set([...[...document.querySelectorAll("[data-live-name]")].map(o=>o.dataset.liveName),...[...document.querySelectorAll("canvas[data-tank-name]")].map(o=>o.dataset.tankName)])].filter(Boolean),d=window.LB_DATA||{},p=[...new Set([...d.qualified||[],...d.players||[]].map(o=>o&&o.name).filter(Boolean))],r=12,f=new Set,g=(o,u,L)=>{let $=[];for(let w=0;w<o.length&&$.length<L;w++){let x=o[(u+w)%o.length];f.has(x)||(f.add(x),$.push(x))}return $},b=[...i].filter(Boolean);b.forEach(o=>f.add(o));let k=n.filter(o=>!f.has(o)),S=g(k,c,Math.min(6,Math.max(0,r-f.size)));k.length>S.length&&(c=(c+S.length)%k.length);let T=p.filter(o=>!f.has(o)),N=g(T,v,Math.max(0,r-f.size));T.length>N.length&&(v=(v+N.length)%T.length);let U=[...b,...S,...N].slice(0,r);if(U.length){s=!0;try{let u=await(await fetch(as+"?names="+encodeURIComponent(U.join(",")),{cache:"no-store"})).json();u&&u.ok&&u.tanks&&(os(u.tanks),typeof window.lbTankFreshMark=="function"&&window.lbTankFreshMark(Object.keys(u.tanks))),U.forEach(L=>i.delete(L))}catch{}s=!1}};window.lbLiveStatsTick=()=>m(0),l(),setTimeout(l,900),setInterval(l,ns)})();function rs(){let e={},s=(l,n,d,p)=>{let r=n-M.conservative*d;(!e[l]||r>e[l].rating)&&(e[l]={rating:r,date:p||""})},a={},i=l=>{if(!a[l]){let[n,d]=ne(l);a[l]={r:n,rd:d,lastIdx:null}}return a[l]},c={};for(let l of B()){if(l.date)continue;let n=l.sa>l.sb?1:l.sa<l.sb?0:.5;(c[l.a]=c[l.a]||[]).push([l.b,n]),(c[l.b]=c[l.b]||[]).push([l.a,1-n]),i(l.a).lastIdx=G,i(l.b).lastIdx=G}let v={};for(let l in c)v[l]=[i(l).r,i(l).rd];for(let l in c){let n=i(l),[d,p]=wt(n.r,n.rd,c[l].map(([r,f])=>[v[r][0],v[r][1],f]));n.r=d,n.rd=p,s(l,d,p,M.graceStart)}let m=new Map;for(let l of B().filter(n=>n.date).slice().reverse()){let n=xt(l.date);m.has(n)||m.set(n,[]),m.get(n).push({a:C(l.a),b:C(l.b),sa:+l.sa,sb:+l.sb,date:l.date})}for(let l of[...m.keys()].sort((n,d)=>n-d)){for(let r in a){let f=a[r],g=l-(f.lastIdx==null?G:f.lastIdx);g>0&&(f.rd=Math.min(Math.sqrt(f.rd*f.rd+M.growth*M.growth*g),M.maxRd))}let n={},d="";for(let r of m.get(l)){let f=r.sa>r.sb?1:r.sa<r.sb?0:.5;(n[r.a]=n[r.a]||[]).push([r.b,f]),(n[r.b]=n[r.b]||[]).push([r.a,1-f]),i(r.a).lastIdx=l,i(r.b).lastIdx=l,r.date>d&&(d=r.date)}let p={};for(let r in n)p[r]=[i(r).r,i(r).rd];for(let r in n){let f=i(r),[g,b]=wt(f.r,f.rd,n[r].map(([k,S])=>[p[k][0],p[k][1],S]));f.r=g,f.rd=b,s(r,g,b,d)}}return e}})();
