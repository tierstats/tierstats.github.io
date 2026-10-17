/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var D=window.LB_DATA,qt="https://tierstats-publish.tierstats.workers.dev/publish",$=(e,s=document)=>s.querySelector(e),B=(e,s=document)=>[...s.querySelectorAll(e)],x=e=>String(e).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),J=e=>encodeURIComponent(String(e)),ne=e=>decodeURIComponent(e),Mt=e=>{let s=String(e||"").replace(/^#/,"");return s&&s!=="/"?s:"/"},Xe=()=>"#/"+location.pathname.replace(/\/+$/,"").replace(/^\//,"");function ue(e){history.pushState(null,"",Mt(e)),ft()}function Ht(e,s,a={}){let i=a.dur||1200,r=a.dec||0,p=performance.now(),h=parseFloat(e.textContent)||0;function g(n){let l=Math.min(1,(n-p)/i),o=1-Math.pow(1-l,3);e.textContent=(h+(s-h)*o).toFixed(r),l<1&&requestAnimationFrame(g)}requestAnimationFrame(g),setTimeout(()=>{e.textContent=s.toFixed(r)},i+300)}var Le=0;function et(){let e=document.querySelector("#page-player .player-name");if(!e)return;if(!e.offsetWidth){Le++<15&&setTimeout(et,80);return}Le=0,e.style.fontSize="";let s=parseFloat(getComputedStyle(e).fontSize)||48,a=16;for(let i=s;i>a;i-=1)if(e.style.fontSize=i+"px",e.scrollWidth<=e.clientWidth+1)return;e.style.fontSize=a+"px"}var ts='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',es='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function Ut(e,s=""){let a=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",i=e<=3?e===1?ts:es:"",r=s.includes("lg")?`<span class="num"><span class="rk-hash">#</span>${e}</span>`:`<span class="num">${e}</span>`;return`<div class="rank-badge ${a} ${s}" title="${t("home.rankTip",{n:e})}">${i}${r}</div>`}var j=e=>t(e==="W"?"rec.wLetter":e==="L"?"rec.lLetter":"rec.dLetter"),K={},U=[],Z={players:[],byName:{},qualified:[]},yt={},jt={},vt={},ie=new Set,he={prevRatings:{},prevRanks:{}};function ss(){try{localStorage.removeItem("tt1v1_baseline")}catch{}he={prevRatings:{...D.prevRatings||{}},prevRanks:{...D.prevRanks||{}}}}function as(){for(let a in yt)delete yt[a];let e=new Set(V().aliasRemoved||[]);Object.entries(D.aliases).forEach(([a,i])=>{e.has(a)||(yt[a.toLowerCase()]=i)}),Object.entries(V().aliases||{}).forEach(([a,i])=>{yt[String(a).toLowerCase()]=i});for(let a of Object.keys(jt))delete jt[a];for(let a of Object.keys(vt))delete vt[a];ie.clear();let s=(a,i)=>{Object.keys(a||{}).forEach(r=>{let p=P(r);p!==r&&(i[p]=a[r])}),Object.keys(a||{}).forEach(r=>{let p=P(r);p===r&&(i[p]=a[r])})};s(D.seeds,jt),s(he.prevRatings,vt),(D.inactiveList||[]).forEach(a=>ie.add(P(a)))}var oe={},Se=e=>String(e).toLowerCase().replace(/[^a-z0-9]/g,"").replace(/0/g,"o").replace(/1/g,"i").replace(/3/g,"e").replace(/5/g,"s");function ns(e,s){if(Math.abs(e.length-s.length)>3)return 99;let a=Array.from({length:s.length+1},(i,r)=>r);for(let i=1;i<=e.length;i++){let r=[i];for(let p=1;p<=s.length;p++)r[p]=Math.min(a[p]+1,r[p-1]+1,a[p-1]+(e[i-1]===s[p-1]?0:1));if(a=r,Math.min(...a)>3)return 99}return a[s.length]}function is(){let e={},s=new Set(V().aliasRemoved||[]),a=r=>{let p=String(r).trim(),h=P(p);!p||Se(p)===Se(h)||ns(p.toLowerCase(),h.toLowerCase())<=2||(e[h]=e[h]||[]).push(p)};Object.keys(D.aliases).forEach(r=>{s.has(r)||a(r)}),Object.keys(V().aliases||{}).forEach(a);for(let r of Object.keys(e)){let p=new Set([r.toLowerCase()]);e[r]=e[r].filter(h=>{let g=h.toLowerCase();return p.has(g)?!1:(p.add(g),!0)}).sort((h,g)=>h.localeCompare(g))}let i=D.cards&&D.cards.alts||{};Object.keys(i).forEach(r=>{let p=P(r),h=i[r];e[p]=(Array.isArray(h)?h:String(h||"").split(/[,;]/)).map(g=>String(g).trim()).filter(Boolean)}),oe=e}function Re(e){return oe[e]||oe[P(e)]||[]}function os(e,s=""){let a=Re(e);if(!a.length)return"";if(s==="hero"){let r=a.map((h,g)=>`<span class="alt-chip${g>1?" alt-extra":""}">${x(h)}</span>`).join(""),p=a.length>2?`<button type="button" class="alt-more" data-alt-toggle="${a.length-2}" aria-expanded="false" title="${x(a.slice(2).join(", "))}">+${a.length-2}</button>`:"";return`<div class="p-alt hero-alt" title="${x(a.join(", "))}">${t("lb.aka",{names:r+p})}</div>`}let i=a.slice(0,2).join(", ")+(a.length>2?` +${a.length-2}`:"");return`<div class="p-alt" title="${x(a.join(", "))}">${t("lb.aka",{names:x(i)})}</div>`}var P=e=>{let s=String(e).trim(),a=new Set;for(;;){let i=yt[s.toLowerCase()];if(!i||i===s||a.has(s))return s;a.add(s),s=i}};function At(e){let s=[];return Q().forEach(a=>{let i=(r,p,h)=>({opp:r,for_:p,against:h,res:p>h?"W":p<h?"L":"D",date:a.date});a.a===e?s.push(i(a.b,a.sa,a.sb)):a.b===e&&s.push(i(a.a,a.sb,a.sa))}),s}function Fe(e){let s={};return At(e).forEach(a=>{let i=s[a.opp]||(s[a.opp]={w:0,l:0,d:0,pf:0,pa:0});i[a.res.toLowerCase()]+=1,i.pf+=a.for_,i.pa+=a.against}),Object.entries(s).map(([a,i])=>({opp:a,...i})).sort((a,i)=>i.w+i.l+i.d-(a.w+a.l+a.d)||i.w-a.w)}function rs(e){let s=K[e]||{};return s.provisional?`<span class="tag prov">${t("tag.provisional")}</span>`:s.inactive?`<span class="tag inact">${t("tag.inactive")}</span>`:""}function cs(e){let s=At(e).slice(0,5).reverse();if(!s.length)return"";let a=s.map(i=>j(i.res)).join(" ");return`<span class="form" title="${t("form.title",{n:s.length,seq:a})}">${s.map(i=>`<i class="${i.res.toLowerCase()}">${j(i.res)}</i>`).join("")}</span>`}function Gt(){let e=typeof getLang=="function"?getLang():"en";return{en:"en-US",zh:"zh-CN",ja:"ja-JP",ru:"ru-RU"}[e]||"en-US"}function Oe(e){let s=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||"").slice(0,10));return s?new Date(+s[1],+s[2]-1,+s[3]):null}function tt(e){let s=Oe(e);if(!s)return"";let a=s.getFullYear()===new Date().getFullYear();try{return new Intl.DateTimeFormat(Gt(),a?{month:"short",day:"numeric"}:{year:"numeric",month:"short",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Ne(e){let s=Oe(e);if(!s)return"";try{return new Intl.DateTimeFormat(Gt(),{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function je(e){let s=new Date(Number(e)*1e3);if(!Number.isFinite(s.getTime()))return"";try{return new Intl.DateTimeFormat(Gt(),{dateStyle:"medium",timeStyle:"short"}).format(s)}catch{return s.toISOString().slice(0,16).replace("T"," ")}}function Pe(e){let s=Math.floor(Date.now()/1e3)-Number(e);if(!Number.isFinite(s))return"";let a=[["year",31536e3],["month",2592e3],["week",604800],["day",86400],["hour",3600],["minute",60]];try{let i=new Intl.RelativeTimeFormat(Gt(),{numeric:"auto"});for(let[r,p]of a)if(s>=p)return i.format(-Math.floor(s/p),r);return i.format(-Math.max(0,s),"second")}catch{let r=Math.floor(s/86400);return r>0?r+"d":"<1d"}}function Wt(e){let s=e.delta!=null?e.delta:0;if(Math.abs(s)<.05)return"";let a=s>0,i=Math.abs(s).toFixed(1);return`<span class="delta ${a?"up":"down"}" title="${a?t("delta.upTitle",{n:i}):t("delta.downTitle",{n:i})}">${a?"\u25B2":"\u25BC"} ${i}</span>`}function ls(){let e=he.prevRanks||{},s=Object.keys(e);if(s.length){let r={};return s.forEach(p=>{r[P(p)]=e[p]}),r}let a={};U.forEach(r=>{vt[r.name]!=null&&(a[r.name]=vt[r.name])});let i={};return Object.entries(a).sort((r,p)=>p[1]-r[1]).forEach(([r],p)=>{i[r]=p+1}),i}function ds(e,s){let a=s[e.name]!=null?s[e.name]:s[P(e.name)];if(a==null){let r=(D.newSince||{})[e.name];return!r||(Date.now()-Date.parse(r))/864e5>5?"":`<span class="mv new" title="${t("mv.newTitle")}">${t("mv.new")}</span>`}let i=a-e.rank;return i>0?`<span class="mv up" title="${tp("mv.up",i)}">\u25B2${i}</span>`:i<0?`<span class="mv down" title="${tp("mv.down",-i)}">\u25BC${-i}</span>`:""}function Et(e){return`${Math.round(e.rating-100)} \u2013 ${Math.round(e.rating+100)}`}function _t(e,s){if(!e.provisional)return e.rating.toFixed(1);let a=s?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:Et(e);return`<span class="prov-range" title="${t("rating.provTitle")}">${a}</span>`}var Ie="tt1v1_admin_log_v1",ut="tt1v1_admin_ok",ot="tt1v1_admin_pw",ps=()=>sessionStorage.getItem(ut)==="1"||localStorage.getItem(ut)==="1",$t=()=>sessionStorage.getItem(ot)||localStorage.getItem(ot)||"";function vs(e,s){s?(localStorage.setItem(ut,"1"),localStorage.setItem(ot,e)):(sessionStorage.setItem(ut,"1"),sessionStorage.setItem(ot,e),localStorage.removeItem(ut),localStorage.removeItem(ot))}function us(){[sessionStorage,localStorage].forEach(e=>{e.removeItem(ut),e.removeItem(ot)})}var Me=null,re=!1;function Be(){re||!$t()||(clearTimeout(Me),Me=setTimeout(()=>publishLog({silent:!0}),1500))}var hs=qt.replace(/\/publish$/,"/verify"),fs=qt.replace(/\/publish$/,"/sync");function _e(){try{return JSON.parse(localStorage.getItem(Ie)||"[]")}catch{return[]}}function ms(e){try{localStorage.setItem(Ie,JSON.stringify(e))}catch{}Be()}var De="tt1v1_admin_over_v1";function ct(){try{return JSON.parse(localStorage.getItem(De)||"{}")||{}}catch{return{}}}function rt(e){try{localStorage.setItem(De,JSON.stringify(e))}catch{}Be()}function V(){let e=window.LB_PUB||{},s=ct(),a=new Set([...e.aliasRemoved||[],...s.aliasRemoved||[]]),i=new Set([...e.seedRemoved||[],...s.seedRemoved||[]]),r=s.aliases||{},p={...s.seeds||{},...s.seedGlicko||{},...s.seedRd||{}},h=y=>Object.fromEntries(Object.entries(y||{}).filter(([f])=>!a.has(f)||r[f]!=null)),g=y=>Object.fromEntries(Object.entries(y||{}).filter(([f])=>!i.has(f)||p[f]!=null)),n=h({...e.aliases||{},...s.aliases||{}}),l=h({...e.aliasNotes||{},...s.aliasNotes||{}}),o=g({...e.seeds||{},...s.seeds||{}}),c=g({...e.seedGlicko||{},...s.seedGlicko||{}}),v=g({...e.seedRd||{},...s.seedRd||{}});return{aliases:n,aliasNotes:l,seeds:o,seedGlicko:c,seedRd:v,aliasRemoved:[...a].filter(y=>n[y]==null),seedRemoved:[...i].filter(y=>o[y]==null&&c[y]==null&&v[y]==null),settings:{...e.settings||{},...s.settings||{}},matchEdits:{...e.matchEdits||{},...s.matchEdits||{}},inactive:s.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...s.matchRemoved||[]])],faq:s.faq!=null?s.faq:e.faq!=null?e.faq:null}}function gs(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function Q(){let e=V(),s=e.matchEdits||{},a=new Set(e.matchRemoved||[]),i=(c,v)=>{if(a.has(v))return null;let y=s[v],f=y?{...c,sa:y.sa,sb:y.sb,date:y.date!=null?y.date:c.date}:c;return{...f,a:P(f.a),b:P(f.b),sa:+f.sa,sb:+f.sb,key:v}},r=_e().map((c,v)=>i({...c,admin:!0,published:!1},"l:"+v)).filter(Boolean),p=gs().map((c,v)=>i({...c,admin:!0,published:!0},"p:"+v)).filter(Boolean),h=D.matches.map((c,v)=>i({...c,admin:!1,published:!1},"a:"+v)).filter(Boolean).reverse(),g=c=>{let v=c.a>c.b;return[v?c.b:c.a,v?c.a:c.b,v?c.sb:c.sa,v?c.sa:c.sb,c.date||""].join("|")},n={};h.forEach(c=>{let v=g(c);n[v]=(n[v]||0)+1});let l={};return r.concat(p).filter(c=>{let v=g(c);return l[v]=(l[v]||0)+1,l[v]>(n[v]||0)}).concat(h)}var C={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},Pt=864e5,Lt=Math.log(10)/400,He=e=>1/Math.sqrt(1+3*Lt*Lt*e*e/(Math.PI*Math.PI)),ce=(e,s,a)=>1/(1+Math.pow(10,-He(a)*(e-s)/400));function bs(e){let s=V().seeds||{};return s[e]!=null&&s[e]!==""?Number(s[e]):jt[e]}function le(e){let s=(V().seedGlicko||{})[e],a=(V().seedRd||{})[e],i=s!=null&&s!==""?Number(s):null,r=a!=null&&a!==""?Number(a):null;if(i!=null||r!=null)return[i??C.unratedR,r??C.unratedRd];let p=bs(e);return p!=null?[Math.max(C.seedMid+(p-C.oldMid)*C.ptsPer,C.minSeed),C.knownRd]:[C.unratedR,C.unratedRd]}function pt(e,s,a){let i=0,r=0;for(let[h,g,n]of a){let l=He(g),o=ce(e,h,g);i+=l*l*o*(1-o),r+=l*(n-o)}if(i*=Lt*Lt,i<=0)return[e,s];let p=1/(s*s)+i;return[e+Lt/p*r,Math.sqrt(1/p)]}function ws(e,s){let a=Math.pow(10,s),i=e*a,r=Math.floor(i);return Math.abs(i-r-.5)<1e-6?(r+1)/a:Math.round(i)/a}var Tt=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(C.periodDays*Pt)),st=Tt(C.graceStart),ys={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function Ue(){let e=V().settings||{};return(D.settings||[]).map(s=>({...s,value:Object.prototype.hasOwnProperty.call(e,s.name)?e[s.name]:s.value}))}function $s(){for(let e of Ue()){let s=ys[e.name];if(!s)continue;if(s==="graceStart"){let i=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(i)&&(C.graceStart=i);continue}let a=Number(e.value);Number.isFinite(a)&&(C[s]=a)}st=Tt(C.graceStart),B(".cons-val").forEach(e=>{e.textContent=String(C.conservative)}),B(".min-matches-val").forEach(e=>{e.textContent=String(C.minMatches)}),B(".min-opp-val").forEach(e=>{e.textContent=String(C.minOpp)})}function ks(){$s(),as(),is();let e={},s=d=>{if(!e[d]){let[w,u]=le(d);e[d]={name:d,r:w,rd:u,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[d]},a=(d,w,u,b,m,L)=>{let M=s(d);M.games++,M.opps.add(w),u>b?M.w++:u<b?M.l++:M.d++,M.lastIdx=L,m&&(M.lastDate=m)},i={};for(let d of Q()){if(d.date)continue;let w=P(d.a),u=P(d.b),b=d.sa>d.sb?1:d.sa<d.sb?0:.5;(i[w]=i[w]||[]).push([u,b]),(i[u]=i[u]||[]).push([w,1-b]),a(w,u,d.sa,d.sb,"",st),a(u,w,d.sb,d.sa,"",st)}let r={};for(let d in i)r[d]=[s(d).r,s(d).rd];for(let d in i){let[w,u]=pt(r[d][0],r[d][1],i[d].map(([b,m])=>[r[b][0],r[b][1],m]));s(d).r=w,s(d).rd=u}let p=new Map;for(let d of Q().filter(w=>w.date).slice().reverse()){let w=d.date,u=Tt(w);p.has(u)||p.set(u,[]),p.get(u).push({a:P(d.a),b:P(d.b),sa:+d.sa,sb:+d.sb,date:w})}for(let d of[...p.keys()].sort((w,u)=>w-u)){for(let b in e){let m=e[b],L=d-(m.lastIdx==null?st:m.lastIdx);L>0&&(m.rd=Math.min(Math.sqrt(m.rd*m.rd+C.growth*C.growth*L),C.maxRd))}let w={};for(let b of p.get(d)){let m=b.sa>b.sb?1:b.sa<b.sb?0:.5;(w[b.a]=w[b.a]||[]).push([b.b,m]),(w[b.b]=w[b.b]||[]).push([b.a,1-m]),a(b.a,b.b,b.sa,b.sb,b.date,d),a(b.b,b.a,b.sb,b.sa,b.date,d)}let u={};for(let b in w)u[b]=[s(b).r,s(b).rd];for(let b in w){let[m,L]=pt(u[b][0],u[b][1],w[b].map(([M,F])=>[u[M][0],u[M][1],F]));s(b).r=m,s(b).rd=L}}let h=Object.values(e).map(d=>({name:d.name,glicko:d.r,rd:d.rd,rating:d.r-C.conservative*d.rd,matches:d.games,w:d.w,l:d.l,d:d.d,winPct:d.games?ws(d.w/d.games*100,1):0,opponents:d.opps.size,avgOpp:0,lastMatch:d.lastDate||"",provisional:!(d.games>=C.minMatches&&d.opps.size>=C.minOpp),inactive:!1})),g={};h.forEach(d=>{g[d.name]=d.glicko}),h.forEach(d=>{let w=0;e[d.name].opps.forEach(u=>{w+=g[u]!=null?g[u]:C.unratedR}),d.avgOpp=e[d.name].opps.size?w/e[d.name].opps.size:0});let n=Date.now(),l=Math.floor(n/(C.periodDays*Pt));for(let d in e){let w=e[d],u=l-(w.lastIdx==null?st:w.lastIdx);u>0&&(w.rd=Math.min(Math.sqrt(w.rd*w.rd+C.growth*C.growth*u),C.maxRd))}h.forEach(d=>{d.glicko=e[d.name].r,d.rd=e[d.name].rd,d.rating=d.glicko-C.conservative*d.rd;let w=vt[d.name],u=(D.curRatings||{})[d.name];d.delta=w!=null?(u??d.rating)-w:0});let o=Date.parse(C.graceStart+"T00:00:00Z")+C.graceDays*Pt,c=new Set([...ie,...V().inactive||[]]);h.forEach(d=>{d.inactive=c.has(d.name)||(d.lastMatch?n-Date.parse(d.lastMatch+"T00:00:00Z")>C.inactiveDays*Pt:n>o)});let v={},y={};(D.players||[]).forEach((d,w)=>{let u=P(d.name);v[u]=d,y[u]=w});let f={};h.forEach(d=>{f[d.name]=d}),h.forEach(d=>{let w=v[d.name];w&&(d.rating=w.rating,d.glicko=w.glicko,d.rd=w.rd,d.matches=w.matches,d.w=w.w,d.l=w.l,d.d=w.d,d.winPct=w.winPct,d.opponents=w.opponents,d.avgOpp=w.avgOpp,w.lastMatch&&(d.lastMatch=w.lastMatch))});let k=[];(D.qualified||[]).forEach(d=>{let w=f[P(d.name)];w&&(w.provisional=!1,w.rank=d.rank!=null?d.rank:k.length+1,k.push(w))});let S=new Set(k.map(d=>d.name)),q=h.filter(d=>!S.has(d.name)&&!v[d.name]&&!v[P(d.name)]&&!d.provisional&&!d.inactive).sort((d,w)=>w.rating-d.rating);q.forEach((d,w)=>{d.rank=k.length+w+1});let E=k.concat(q);h.sort((d,w)=>w.rating-d.rating||(y[d.name]!=null?y[d.name]:1e9)-(y[w.name]!=null?y[w.name]:1e9));let A={};return h.forEach(d=>{A[d.name]=d}),{players:h,byName:A,qualified:E}}function St(){ss(),Z=ks(),K=Z.byName,U=Z.qualified,xt=null}var xs=["page-home","page-player","page-compare","page-matches","page-cards","page-roster","page-analytics","page-method","page-faq","page-admin"];function Ct(){let e=$("#nav-glide"),s=document.querySelector(".nav a.active");if(e&&s&&s.offsetWidth>0){let a=s.getBoundingClientRect(),i=e.parentElement.getBoundingClientRect();e.style.width=a.width+"px",e.style.transform=`translate(${a.left-i.left}px, ${a.bottom-i.top-1}px)`,e.style.opacity="1"}else e&&(e.style.opacity="0")}window.addEventListener("resize",()=>{Ct(),et(),clearTimeout(window.__glideRz),window.__glideRz=setTimeout(()=>{Ct(),et()},150)});document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>{Ct(),et()});document.fonts&&document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",()=>{Ct(),et()});function ft(){if(Te){Te=!1;return}let e;location.hash&&location.hash.startsWith("#/")&&location.hash!=="#/"?(e=location.hash,history.replaceState(null,"",Mt(e))):e=Xe(),xs.forEach(a=>$("#"+a).classList.remove("active"));let s="#/"+(e.split("/")[1]||"");if(s==="#/card"&&(s="#/cards"),s==="#/player"&&(s="#/"),B(".nav a, .foot-nav a").forEach(a=>{let i=a.getAttribute("href");a.classList.toggle("active",i===s||e==="#/"&&i==="#/")}),Ct(),e==="#/compare"||e.startsWith("#/compare/")){let a=e.split("/").slice(2).map(ne);We(a[0]||"",a[1]||""),$("#page-compare").classList.add("active"),window.lbScrollNow(0)}else if(e.startsWith("#/player/"))Rs(ne(e.slice(9))),$("#page-player").classList.add("active"),window.lbScrollNow(0);else if(e==="#/matches")Ns(),$("#page-matches").classList.add("active"),window.lbScrollNow(0);else if(e==="#/cards")typeof renderCards=="function"&&renderCards(),typeof window.lbLiveStatsTick=="function"&&window.lbLiveStatsTick(),$("#page-cards").classList.add("active"),window.lbScrollNow(0);else if(e.startsWith("#/card/")){typeof renderCards=="function"&&renderCards(),$("#page-cards").classList.add("active"),window.lbScrollNow(0);let a=ne(e.slice(7));requestAnimationFrame(()=>{typeof window.cardsFocus=="function"&&window.cardsFocus(a)})}else e==="#/roster"?(js(),$("#page-roster").classList.add("active"),window.lbScrollNow(0)):e==="#/analytics"?(we(),$("#page-analytics").classList.add("active"),window.lbScrollNow(0)):e==="#/method"?(Is(),$("#page-method").classList.add("active"),window.lbScrollNow(0)):e==="#/faq"?(Ds(),$("#page-faq").classList.add("active"),window.lbScrollNow(0)):e==="#/admin"?(dt(),$("#page-admin").classList.add("active"),window.lbScrollNow(0)):(fe(),$("#page-home").classList.add("active"),requestAnimationFrame(Ts));Yt()}window.addEventListener("hashchange",ft);window.addEventListener("popstate",ft);document.addEventListener("click",e=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;let s=e.target instanceof Element?e.target.closest('a[href^="#/"]'):null;if(!s)return;e.preventDefault();let a=s.getAttribute("href");Mt(a)!==(location.pathname.replace(/\/+$/,"")||"/")&&ue(a)});function fe(){nt="all",I={key:"rank",dir:1},B(".chip[data-filter]").forEach(n=>n.classList.toggle("on",n.dataset.filter==="all")),me();let e=Q().length,s=Z.players.length,a=U[0],i=Math.round(U.reduce((n,l)=>n+l.rd,0)/U.length),r=$("#hero-chip-matches");r&&(r.innerHTML=t("home.chipMatches",{n:e})),$("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">${t("stat.ranked")}</div>
      <div class="v"><span class="cu" data-target="${U.length}">0</span><small>${t("stat.ofTotal",{n:s})}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.matches")}</div>
      <div class="v"><span class="cu" data-target="${e}">0</span></div></div>
    <div class="stat-card"><div class="k">${t("stat.highest")}</div>
      <div class="v"><span class="cu" data-target="${a.rating}" data-dec="1">0</span><small>${x(a.name)}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.avgRd")}</div>
      <div class="v"><span class="cu" data-target="${i}" data-dec="1">0</span><small>${t("stat.certainty")}</small></div></div>`;let p=[U[1],U[0],U[2]].filter(Boolean);$("#fl-cards").innerHTML=p.map(n=>`
    <div class="fl-card r${n.rank}${n.rank===1?" champ":""} reveal" data-goto="${x(n.name)}">
      <div class="fl-top">
        ${Ut(n.rank)}
        <div class="rd">RD ${n.rd.toFixed(0)}</div>
      </div>
      ${n.rank===1?`<div class="champ-tag">${t("home.champTag")}</div>`:""}
      <div class="nm">${x(n.name)}</div>
      <div class="rating">
        <span class="unit">${t("home.ratingUnit")}</span>
        <div class="big-row"><span class="big">${Math.round(n.rating)}</span>${Wt(n)}</div>
      </div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${n.winPct>=60?"":n.winPct>=40?"mid":"low"}" data-w="${n.winPct}"></div></div>
      </div>
      <div class="meta">
        <span><span class="w">${n.w}${j("W")}</span> <span class="l">${n.l}${j("L")}</span> ${n.d}${j("D")}</span>
        <span class="wc">${n.winPct.toFixed(1)}%</span>
        <span class="opp">${t("home.avgOpp",{n:n.avgOpp.toFixed(1)})}</span>
      </div>
    </div>`).join(""),requestAnimationFrame(()=>{B("#fl-cards .bar-fill").forEach(n=>{n.style.width=n.dataset.w+"%"})});let h=$("#home-guide");h&&(h.innerHTML=typeof window.cardsGuideHTML=="function"?window.cardsGuideHTML("home"):""),ht(),Ge();let g=$("#last-updated");g&&(g.textContent=t("home.lastUpdated",{when:tt(D.generated)||"today"}))}function Ge(){let e=Q().filter(s=>s.date).slice(0,10);$("#battles-grid").innerHTML=e.length?e.map(s=>{let a=s.sa>s.sb,i=s.sb>s.sa;return`
    <div class="battle-row reveal" data-goto="${x(a?s.a:s.b)}" tabindex="0" role="link">
      <div class="who ${a?"win":"lose"}" data-goto="${x(s.a)}">${x(s.a)}</div>
      <div class="vs">${t("vs")}</div>
      <div class="who r ${i?"win":"lose"}" data-goto="${x(s.b)}">${x(s.b)}</div>
      <div class="sc mono"><span class="${a?"win":"lose"}">${s.sa}</span> \u2013 <span class="${i?"win":"lose"}">${s.sb}</span></div>
      <div class="dt">${tt(s.date)||(s.admin&&!s.published?t("battles.justNow"):t("misc.historical"))}</div>
    </div>`}).join(""):`<div class="empty" style="padding:26px;text-align:center;color:var(--dim);grid-column:1/-1">${t("battles.empty")}</div>`}var Ls=500,Ss="cubic-bezier(.22,.8,.24,1)",Ms=12;function Es(e,s){matchMedia("(prefers-reduced-motion: reduce)").matches||B(".lb-row",e).forEach((a,i)=>{let r=s.get(a.dataset.name);if(r===void 0||typeof a.animate!="function")return;let p=r-a.getBoundingClientRect().top;Math.abs(p)<=1||a.animate([{transform:`translateY(${p}px)`},{transform:"none"}],{duration:Ls,easing:Ss,delay:Math.min(i*Ms,220),fill:"backwards"})})}function ht(e="all",s="rank",a=1){let i=$("#lb-body"),p=(e==="all"&&It?U:Z.players).slice().map(n=>({...n,rank:n.rank!=null?n.rank:9999}));de&&(p=p.filter(n=>n.name.toLowerCase().includes(de))),e==="provisional"?p=p.filter(n=>(K[n.name]||{}).provisional):e==="inactive"?p=p.filter(n=>(K[n.name]||{}).inactive):e==="veterans"?p=p.filter(n=>n.matches>=15):e==="rising"&&(p=p.filter(n=>n.winPct>=60&&n.matches>=5)),p.sort((n,l)=>{let o=n[s],c=l[s];return(typeof o=="string"?o.localeCompare(c):o-c)*a});let h=new Map;B(".lb-row",i).forEach(n=>h.set(n.dataset.name,n.getBoundingClientRect().top));let g=ls();i.innerHTML=p.map(n=>`
    <div class="lb-row ${n.rank<=3?"top"+n.rank:""}" data-name="${x(n.name)}" data-goto="${x(n.name)}" tabindex="0" role="link">
      <div class="rank">${n.rank<=U.length?Ut(n.rank,"sm")+ds(n,g):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="name-stack"><div class="pname">${x(n.name)}</div></div>${typeof cardsRowChip=="function"?cardsRowChip(n.name):""}</div>
      <div class="rating-cell mono">${Wt(n)}${_t(n,!0)}</div>
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
      <div class="col-status">${rs(n.name)||cs(n.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?t("lb.emptyInactive"):e==="provisional"?t("lb.emptyProv"):t("lb.emptyNone")}</div>`,Es(i,h),requestAnimationFrame(()=>{B(".bar-fill",i).forEach(n=>{n.style.width=n.dataset.w+"%"})})}var nt="all",I={key:"rank",dir:1},de="",It=!0;function me(){B(".sortable").forEach(s=>s.classList.remove("sorted","asc"));let e=$(`.sortable[data-key="${I.key}"]`);e&&(e.classList.add("sorted"),I.dir===1&&e.classList.add("asc"))}function Ts(){B("#stat-strip .cu").forEach(e=>Ht(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),B(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}$("#lb-qual").addEventListener("click",()=>{It=!It,$("#lb-qual").classList.toggle("on",It),ht(nt,I.key,I.dir)});$("#lb-filter").addEventListener("input",e=>{de=e.target.value.trim().toLowerCase(),ht(nt,I.key,I.dir)});var kt=$("#theme-toggle");function ge(){if(!kt)return;let e=document.documentElement.dataset.theme==="light",s=e?t("top.toDark"):t("top.toLight");kt.setAttribute("aria-pressed",String(e)),kt.setAttribute("aria-label",s),kt.title=s}kt.addEventListener("click",()=>{let s=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=s;try{localStorage.setItem("tt1v1_theme",s)}catch{}ge()});ge();(function(){if(!window.matchMedia||matchMedia("(pointer: coarse)").matches)return;let s=document.documentElement,a=E=>{let A=[],d=/url\("?([^")]+)"?\)\s*([\d.]+)x/g,w;for(;(w=d.exec(E))!==null;)A.push({url:w[1],dpr:parseFloat(w[2])});if(!A.length)return null;let u=E.match(/\)\s*(\d+(?:\.\d+)?)(?:px)?\s+(\d+(?:\.\d+)?)(?:px)?\s*,\s*\w+\s*$/);return{urls:A,hx:u?parseFloat(u[1]):0,hy:u?parseFloat(u[2]):0}},i=E=>{let A=window.devicePixelRatio||1,d=null;for(let w of E.urls)w.dpr<=A+.01&&(d=w);return(d||E.urls[0]).url},r=null,p=()=>{let E=getComputedStyle(s),A={arrow:a(E.getPropertyValue("--cur-arrow")),pointer:a(E.getPropertyValue("--cur-pointer"))};return!A.arrow||!A.pointer?!1:(r=A,!0)};if(!p())return;let h="",g=()=>{let E=[],A=d=>{for(let w of d){if(w.style&&w.selectorText){let u=w.style.getPropertyValue("cursor");u&&u.trim()==="var(--cur-pointer)"&&E.push(w.selectorText)}w.cssRules&&w.cssRules.length&&A(w.cssRules)}};for(let d of document.styleSheets)try{A(d.cssRules)}catch{}h=E.join(",")};g();let n=document.createElement("div");n.className="cursor-fx",n.setAttribute("aria-hidden","true");let l="arrow",o=r.arrow.hx,c=r.arrow.hy,v=-100,y=-100,f=!1,k=()=>{n.style.transform="translate3d("+(v-o)+"px,"+(y-c)+"px,0)"},S=()=>{let E=l==="pointer"?r.pointer:r.arrow;n.style.backgroundImage='url("'+i(E)+'")',o=E.hx,c=E.hy,f&&k()};document.addEventListener("mousemove",E=>{v=E.clientX,y=E.clientY,f||(f=!0,n.classList.add("on")),k()},{passive:!0}),document.addEventListener("mouseover",E=>{if(!(E.target instanceof Element))return;h||g();let A="arrow";if(h)try{E.target.closest(h)&&(A="pointer")}catch{}A!==l&&(l=A,S())},{passive:!0}),document.addEventListener("mouseout",E=>{E.relatedTarget||(f=!1,n.classList.remove("on"))},{passive:!0}),new MutationObserver(()=>{p()&&S()}).observe(s,{attributes:!0,attributeFilter:["data-theme"]});let q=new Image;q.onload=()=>{document.body.appendChild(n),S(),s.classList.add("cur-js")},q.src=i(r.arrow)})();document.addEventListener("click",e=>{let s=e.target.closest("[data-alt-toggle]");if(s){let p=s.closest(".hero-alt"),h=p?p.classList.toggle("alt-open"):!0;s.setAttribute("aria-expanded",String(h)),s.textContent=h?"\u2212":`+${s.dataset.altToggle}`;return}let a=e.target.closest(".chip");if(a&&a.dataset.filter){B(".chip[data-filter]").forEach(p=>p.classList.remove("on")),a.classList.add("on"),nt=a.dataset.filter,ht(nt,I.key,I.dir);return}let i=e.target.closest(".sortable");if(i){let p=i.dataset.key;I.key===p&&I.dir===-1?I={key:"rank",dir:1}:I.key===p?I={key:p,dir:-I.dir}:I={key:p,dir:1},me(),ht(nt,I.key,I.dir);return}let r=e.target.closest("[data-goto]");r&&(e.stopPropagation(),ue("#/player/"+J(r.dataset.goto)))});document.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;let s=document.activeElement;!s||!s.dataset||!s.dataset.goto||s.tagName==="A"||s.tagName==="BUTTON"||s.tagName==="INPUT"||(e.preventDefault(),ue("#/player/"+J(s.dataset.goto)))});function Cs(e){let s=e.slice();for(let a=s.length-1;a>0;a--){let i=Math.floor(Math.random()*(a+1));[s[a],s[i]]=[s[i],s[a]]}return s}function Ee(e,s){let a=document.getElementById(e);if(!a)return;let i=a.querySelector(".pick-btn"),r=a.querySelector(".pick-search"),p=[...a.querySelectorAll(".pick-opt")],h=a.querySelector(".pick-empty"),g=-1,n=()=>p.filter(y=>!y.classList.contains("hide")),l=y=>{let f=n();if(!f.length){g=-1;return}g=(y%f.length+f.length)%f.length,p.forEach(k=>k.classList.remove("hover")),f[g].classList.add("hover"),f[g].scrollIntoView({block:"nearest"})},o=y=>{let f=y.trim().toLowerCase(),k=0;p.forEach(S=>{let q=!f||S.dataset.name.toLowerCase().includes(f);S.classList.toggle("hide",!q),q&&k++}),h.classList.toggle("show",k===0),g=-1,k&&l(0)},c=()=>{document.querySelectorAll(".pick.open").forEach(y=>{if(y!==a){y.classList.remove("open");let f=y.querySelector(".pick-btn");f&&f.setAttribute("aria-expanded","false")}}),a.classList.add("open"),i.setAttribute("aria-expanded","true"),r.value="",o(""),requestAnimationFrame(()=>r.focus())},v=()=>{a.classList.remove("open"),i.setAttribute("aria-expanded","false")};i.addEventListener("click",()=>{a.classList.contains("open")?v():c()}),r.addEventListener("input",()=>o(r.value)),r.addEventListener("keydown",y=>{if(y.key==="ArrowDown")y.preventDefault(),l(g+1);else if(y.key==="ArrowUp")y.preventDefault(),l(g-1);else if(y.key==="Enter"){y.preventDefault();let f=n();f[g]&&f[g].click()}else y.key==="Escape"&&(v(),i.focus())}),p.forEach(y=>{y.addEventListener("click",()=>{a.dataset.value=y.dataset.name,a.querySelector(".pick-cur").textContent=y.dataset.name,v(),s()}),y.addEventListener("mousemove",()=>{let f=n().indexOf(y);f>=0&&f!==g&&(g=f,p.forEach(k=>k.classList.remove("hover")),y.classList.add("hover"))})})}document.addEventListener("click",e=>{document.querySelectorAll(".pick.open").forEach(s=>{if(!s.contains(e.target)){s.classList.remove("open");let a=s.querySelector(".pick-btn");a&&a.setAttribute("aria-expanded","false")}})});function We(e,s){let a=$("#cmp-wrap"),r=Z.players.slice().sort((m,L)=>(m.rank!=null?m.rank:9999)-(L.rank!=null?L.rank:9999)||m.name.localeCompare(L.name)).map(m=>m.name);if(r.length<2){a.innerHTML=`<div class="empty">${t("cmp.notEnough")}</div>`;return}let p=m=>m[Math.floor(Math.random()*m.length)],h=m=>p(r.filter(L=>L!==m)),g=K[e]?e:p(r),n=K[s]?s:h(g);n===g&&(n=h(g)),(g!==e||n!==s)&&history.replaceState(null,"","#/compare/"+J(g)+"/"+J(n));let l=K[g],o=K[n],c=U.find(m=>m.name===g),v=U.find(m=>m.name===n),y=ce(l.glicko,o.glicko,o.rd),f=ce(o.glicko,l.glicko,l.rd),k=Math.round(y/(y+f)*1e3)/10,S=Math.round(1e3-k*10)/10,q=Q().filter(m=>m.a===g&&m.b===n||m.a===n&&m.b===g).map(m=>{let L=m.a===g,M=L?m.sa:m.sb,F=L?m.sb:m.sa;return{fa:M,fb:F,res:M>F?"W":M<F?"L":"D",date:m.date}}),E=q.reduce((m,L)=>(L.res==="W"?m.w++:L.res==="L"?m.l++:m.d++,m),{w:0,l:0,d:0}),A=Cs(r),d=(m,L,M)=>`
    <div class="pick" id="${m}" data-value="${x(L)}">
      <button type="button" class="pick-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="${x(M)}">
        <span class="pick-cur">${x(L)}</span>
        <svg class="pick-caret" width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true"><path d="M1.2 1.2 5.5 5.6 9.8 1.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="pick-menu">
        <input class="pick-search" type="text" autocomplete="off" spellcheck="false"
          placeholder="${t("cmp.searchPlaceholder")}" aria-label="${x(M)}">
        <div class="pick-list" role="listbox" aria-label="${x(M)}">
          ${A.map(F=>{let z=K[F];return`<button type="button" class="pick-opt${F===L?" on":""}" role="option" data-name="${x(F)}" aria-selected="${F===L?"true":"false"}">
              <span class="pick-n">${x(F)}</span>
              <span class="pick-meta mono">${z&&z.rating!=null?z.rating.toFixed(1):""}</span>
            </button>`}).join("")}
          <div class="pick-empty">${t("cmp.noResults")}</div>
        </div>
      </div>
    </div>`,w=(m,L,M,F,z)=>`
    <div class="cmp-trow">
      <div class="va mono${F?" win":""}">${L}</div>
      <div class="k">${m}</div>
      <div class="vb mono${z?" win":""}">${M}</div>
    </div>`,u='<span style="color:var(--dimmer)">\u2014</span>';a.innerHTML=`
    <div class="kicker anim">${t("cmp.versus")}</div>
    <h2 class="section-head anim" style="margin:6px 0 2px">${t("cmp.title")}</h2>
    <div class="cmp-pickers anim">
      ${d("cmp-a",g,t("cmp.firstPlayer"))}
      <button class="btn btn-ghost" id="cmp-swap" style="width:auto;margin:0" title="${t("cmp.swap")}">\u21C4</button>
      ${d("cmp-b",n,t("cmp.secondPlayer"))}
    </div>
    <div class="cmp-share anim">
      <button class="btn btn-ghost" id="cmp-copy" style="width:auto;margin:0">${t("cmp.copyLink")}</button>
      <span class="caption" id="cmp-copy-msg"></span>
    </div>

    <div class="cmp-hero anim">
      <div class="cmp-side a">
        <div class="cmp-sub">${c?t("cmp.rankN",{n:c.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${J(g)}">${x(g)}</a></div>
        <div class="cmp-rating mono">${l.provisional?Et(l):l.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",l.matches,{rd:l.rd.toFixed(1)})}</div>
      </div>
      <div class="cmp-vs">
        <div class="vs-mark">${t("cmp.vsMark")}</div>
        <div class="mono" style="font-size:11px;color:var(--dimmer)">${t("cmp.h2hShort",{n:q.length})}</div>
      </div>
      <div class="cmp-side b">
        <div class="cmp-sub">${v?t("cmp.rankN",{n:v.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${J(n)}">${x(n)}</a></div>
        <div class="cmp-rating mono">${o.provisional?Et(o):o.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",o.matches,{rd:o.rd.toFixed(1)})}</div>
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.probTitle")} <span class="n">${t("cmp.probSub")}</span></h3>
      <div class="cmp-prob-labels">
        <span style="color:var(--gold)">${x(g)} ${k.toFixed(1)}%</span>
        <span style="color:var(--blue)">${S.toFixed(1)}% ${x(n)}</span>
      </div>
      <div class="cmp-probbar"><i class="pa" style="width:${k}%"></i><i class="pb" style="width:${S}%"></i></div>
      <div class="cmp-prob-note">${t("cmp.probNote")}</div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.tale")}</h3>
      <div class="cmp-table">
        ${w(t("cmp.rating"),_t(l),_t(o),!l.provisional&&l.rating>o.rating,!o.provisional&&o.rating>l.rating)}
        ${w(t("cmp.rank"),c?"#"+c.rank:u,v?"#"+v.rank:u,c&&v&&c.rank<v.rank,c&&v&&v.rank<c.rank)}
        ${w(t("cmp.rdUnc"),l.rd.toFixed(1),o.rd.toFixed(1),l.rd<o.rd,o.rd<l.rd)}
        ${w(t("cmp.glicko"),l.glicko.toFixed(1),o.glicko.toFixed(1),l.glicko>o.glicko,o.glicko>l.glicko)}
        ${w(t("cmp.record"),`<span style="color:var(--green)">${l.w}${j("W")}</span> <span style="color:var(--red)">${l.l}${j("L")}</span> ${l.d}${j("D")}`,`<span style="color:var(--green)">${o.w}${j("W")}</span> <span style="color:var(--red)">${o.l}${j("L")}</span> ${o.d}${j("D")}`,l.winPct>o.winPct,o.winPct>l.winPct)}
        ${w(t("cmp.winRate"),l.winPct+"%",o.winPct+"%",l.winPct>o.winPct,o.winPct>l.winPct)}
        ${w(t("cmp.matchesPlayed"),l.matches,o.matches,!1,!1)}
        ${w(t("cmp.uniqueOpp"),l.opponents,o.opponents,l.opponents>o.opponents,o.opponents>l.opponents)}
        ${w(t("cmp.avgOppRating"),l.avgOpp.toFixed(1),o.avgOpp.toFixed(1),l.avgOpp>o.avgOpp,o.avgOpp>l.avgOpp)}
        ${w(t("cmp.h2h"),`${E.w}${j("W")} \u2013 ${E.l}${j("L")} \u2013 ${E.d}${j("D")}`,`${E.l}${j("W")} \u2013 ${E.w}${j("L")} \u2013 ${E.d}${j("D")}`,E.w>E.l,E.l>E.w)}
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.prevMeetings")} <span class="n">${tp("cmp.meetings",q.length)}</span></h3>
      <div class="match-list">
        ${q.map(m=>`
          <div class="match-row">
            <div class="res-chip ${m.res}">${j(m.res)}</div>
            <div class="who">${x(g)}</div>
            <div class="score mono">${m.fa} \u2013 ${m.fb}</div>
            <div class="who opp"><a href="#/player/${J(n)}" style="color:var(--blue)">${x(n)}</a></div>
            <div class="date mono" title="${Ne(m.date)}">${tt(m.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("cmp.neverMet")}</div>`}
      </div>
      <div class="caption" style="margin-top:12px">${t("cmp.legacyNote")}</div>
    </div>`;let b=()=>{let m=$("#cmp-a").dataset.value,L=$("#cmp-b").dataset.value,M="#/compare/"+J(m)+"/"+J(L);Mt(M)!==(location.pathname.replace(/\/+$/,"")||"/")&&history.replaceState(null,"",Mt(M)),We(m,L)};Ee("cmp-a",b),Ee("cmp-b",b),$("#cmp-swap").addEventListener("click",()=>{let m=$("#cmp-a"),L=$("#cmp-b"),M=m.dataset.value;m.dataset.value=L.dataset.value,L.dataset.value=M,b()}),$("#cmp-copy").addEventListener("click",()=>{let m=location.href.split("#")[0]+"#/compare/"+J(g)+"/"+J(n),L=()=>{$("#cmp-copy-msg").textContent=t("cmp.linkCopied")};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(m).then(L,()=>{$("#cmp-copy-msg").textContent=m}):$("#cmp-copy-msg").textContent=m})}var Te=!1;function qs(e){let s=window.lbCards||{},a=s.ratingSeries?s.ratingSeries(e):null;if(!a||a.length<3)return"";let i=K[e],r=Math.max(i.rating,...a.map(l=>l.r)),p=At(e).slice().reverse(),h=0,g=0;for(let l of p)l.res==="W"?(g++,g>h&&(h=g)):g=0;let n=[20,50,100].filter(l=>a.length>l);return`
    <div class="panel reveal">
      <div class="rc-head">
        <h3>${t("pl.history")} <span class="n">${tp("pl.nGames",a.length)}</span></h3>
        <div class="rc-range">
          ${n.map(l=>`<button class="chip rc-range-btn" data-range="${l}">${tp("chart.nGames",l)}</button>`).join("")}
          <button class="chip rc-range-btn on" data-range="all">${t("chart.allTime")}</button>
        </div>
      </div>
      <div class="rc-stats">
        <div class="rc-stat"><span class="ric ic-up"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg></span><div class="tx"><div class="k">${t("chart.current")}</div><div class="v mono">${i.rating.toFixed(1)}</div></div></div>
        <div class="rc-stat"><span class="ric ic-star"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.45 6.2 20.5l1.1-6.45-4.7-4.6 6.5-.95z"/></svg></span><div class="tx"><div class="k">${t("chart.peak")}</div><div class="v mono">${r.toFixed(1)}</div></div></div>
        <div class="rc-stat"><span class="ric ic-fire"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2s1.2 3.2-1 6.2c-2 2.7-4.6 4.3-4.6 8A7.6 7.6 0 0 0 12 22a7.6 7.6 0 0 0 5.6-5.8c0-2.6-1.3-4.3-2.3-6-.4 1.2-1.2 2-2.2 2.3.9-2.9.2-7.4-.9-10.5z"/></svg></span><div class="tx"><div class="k">${t("chart.streak")}</div><div class="v mono ${h>0?"up":""}">${h>0?"+"+h:"\u2014"}</div></div></div>
      </div>
      <div class="hist-wrap"><svg class="rating-chart" viewBox="0 0 900 330" role="img" aria-label="${t("pl.history")}"></svg></div>
      <div class="rc-legend">
        <span class="lg-item"><span class="lg-dots"><span class="lg-dot"></span><span class="lg-dot down"></span></span>${t("chart.perGame")}</span>
        <button class="toggle-btn rc-trend" aria-pressed="false">
          <span class="sw" aria-hidden="true"></span>
          <span>${t("chart.showTrend")}</span>
        </button>
      </div>
    </div>`}function As(e){let s=document.querySelector(".pv-lower .rating-chart");if(!s)return;let a=window.lbCards||{},i=a.ratingSeries?a.ratingSeries(e):null;if(!i||i.length<3)return;let r="http://www.w3.org/2000/svg",p=900,h=330,g=56,n=18,l=18,o=58,c="all",v=!1,y=null,f=matchMedia("(prefers-reduced-motion: reduce)").matches,k=(b,m)=>{let L=document.createElementNS(r,b);for(let M in m)L.setAttribute(M,m[M]);return L},S=(b,m,L)=>{let F=(m-b||1)/L,z=Math.pow(10,Math.floor(Math.log10(F))),G=[1,2,2.5,5,10].map(W=>W*z).find(W=>W>=F)||10*z,_=[];for(let W=Math.ceil(b/G)*G;W<=m+1e-9;W+=G)_.push(W);return _},q=()=>((!y||!y.isConnected)&&(y=document.getElementById("rc-tip"),y||(y=document.createElement("div"),y.id="rc-tip",y.className="x-tip",document.body.appendChild(y))),y),E=(b,m,L)=>{let M=q();M.innerHTML=b,M.classList.add("show");let F=s.getBoundingClientRect(),z=M.offsetWidth,G=M.offsetHeight,_=m+16,W=L-G-14;_+z>F.right-8&&(_=m-z-16),W<F.top+8&&(W=L+18),_=Math.max(F.left+8,Math.min(_,F.right-z-8)),W=Math.max(F.top+8,Math.min(W,F.bottom-G-8)),M.style.left=_+"px",M.style.top=W+"px"},A=()=>{y&&y.classList.remove("show")};function d(){let b=c==="all"?i.slice():i.slice(-c),m=i.length-b.length,L=b.map(T=>T.r),M=Math.min(...L),F=Math.max(...L),z=(F-M)*.12||6;M-=z,F+=z;let G=T=>g+T/Math.max(1,b.length-1)*(p-g-n),_=T=>l+(1-(T-M)/(F-M))*(h-l-o);s.innerHTML="";for(let T of S(M,F,5)){s.appendChild(k("line",{x1:g,x2:p-n,y1:_(T).toFixed(1),y2:_(T).toFixed(1),class:"rc-grid"}));let O=k("text",{x:g-8,y:(_(T)+3.5).toFixed(1),class:"rc-lbl"});O.textContent=Math.round(T),s.appendChild(O)}let W=k("clipPath",{id:"rh-reveal"}),Vt=k("rect",{x:0,y:0,width:p,height:h});W.appendChild(Vt),s.appendChild(W);let mt=k("g",{"clip-path":"url(#rh-reveal)"});s.appendChild(mt);let ye=(h-o).toFixed(1);for(let T=1;T<b.length;T++){let O=b[T].r>=b[T-1].r?"up":"down",Y=G(T-1),N=G(T),H=_(b[T-1].r),at=_(b[T].r);mt.appendChild(k("path",{d:`M${Y.toFixed(1)} ${ye} L${Y.toFixed(1)} ${H.toFixed(1)} L${N.toFixed(1)} ${at.toFixed(1)} L${N.toFixed(1)} ${ye} Z`,class:`rc-seg-area ${O}`})),mt.appendChild(k("path",{d:`M${Y.toFixed(1)} ${H.toFixed(1)} L${N.toFixed(1)} ${at.toFixed(1)}`,class:`rc-seg ${O}`}))}if(v){let T=Math.max(3,Math.round(b.length/10)),O=b.map((Y,N)=>{let H=0,at=0;for(let Ft=Math.max(0,N-T+1);Ft<=N;Ft++)H+=b[Ft].r,at++;return H/at});mt.appendChild(k("path",{d:O.map((Y,N)=>(N?"L":"M")+G(N).toFixed(1)+" "+_(Y).toFixed(1)).join(" "),class:"rc-trend-line"}))}let Ke=b.length>90?Math.ceil(b.length/90):1;b.forEach((T,O)=>{if(O%Ke&&O!==b.length-1)return;let Y=O===0?b[1].r>=b[0].r:T.r>=b[O-1].r;mt.appendChild(k("circle",{cx:G(O).toFixed(1),cy:_(T.r).toFixed(1),r:2.6,class:`rc-dot-static ${Y?"up":"down"}`}))});let $e=Math.min(6,b.length),ke=[];for(let T=0;T<$e;T++)ke.push(Math.round(T/Math.max(1,$e-1)*(b.length-1)));for(let T of ke){let O=T===0?"start":T===b.length-1?"end":"middle",Y=k("text",{x:G(T).toFixed(1),y:h-o+24,class:"rc-lbl rc-x1","text-anchor":O});if(Y.textContent=t("chart.gameN",{n:m+T+1}),s.appendChild(Y),b[T].date){let N=k("text",{x:G(T).toFixed(1),y:h-o+40,class:"rc-lbl rc-x2","text-anchor":O});N.textContent=tt(b[T].date),s.appendChild(N)}}let gt=k("g",{class:"rc-cross",style:"display:none"}),Kt=k("g",{class:"rc-slide"});Kt.appendChild(k("line",{x1:0,x2:0,y1:l,y2:h-o,class:"rc-cross-line"}));let Qt=k("g",{class:"rc-slide"});Qt.appendChild(k("circle",{cx:0,cy:0,r:6.5,class:"rc-cross-dot"})),gt.appendChild(Kt),gt.appendChild(Qt),s.appendChild(gt);let Zt=k("rect",{x:g,y:l,width:p-g-n,height:h-l-o,class:"rc-overlay"});if(s.appendChild(Zt),!f){Vt.setAttribute("width",0);let T=performance.now(),O=Y=>{let N=Math.max(0,Math.min(1,(Y-T)/900));Vt.setAttribute("width",(p*(1-Math.pow(1-N,3))).toFixed(1)),N<1&&requestAnimationFrame(O)};requestAnimationFrame(O)}let Xt=0,Rt=null,Qe=T=>{let O=s.getBoundingClientRect(),Y=(T.clientX-O.left)/O.width*p,N=Math.round((Y-g)/(p-g-n)*(b.length-1));N=Math.max(0,Math.min(b.length-1,N));let H=b[N];gt.style.display="",Kt.style.transform=`translate(${G(N).toFixed(1)}px, 0px)`,Qt.style.transform=`translate(${G(N).toFixed(1)}px, ${_(H.r).toFixed(1)}px)`;let at=N>0?b[N-1].r:i[m+N-1]?i[m+N-1].r:null,te=[`<span style="color:${H.w>.5?"var(--green)":H.w<.5?"var(--red)":"var(--dim)"};font-weight:700">${t("pl.vsOpp",{opp:x(H.opp)})} ${H.pf}-${H.pa}</span>`],xe=`${t("chart.ratingLabel")}: ${H.r.toFixed(1)}`;if(at!=null){let ee=H.r-at,se=ee>.05,ae=ee<-.05;xe+=` <span style="color:${se?"var(--green)":ae?"var(--red)":"var(--dim)"}">${se?"\u25B2":ae?"\u25BC":"\u2014"} ${se?"+":ae?"-":""}${Math.abs(ee).toFixed(1)}</span>`}te.push(xe),te.push(`<span style="color:var(--dimmer);font-size:11px">${t("chart.hashN",{n:m+N+1})}${H.date?" \xB7 "+tt(H.date):""}</span>`),E(te.join(`
`),O.left+G(N)/p*O.width,O.top+_(H.r)/h*O.height)},Ze=T=>{Rt=T,!Xt&&(Xt=requestAnimationFrame(()=>{if(Xt=0,Rt){let O=Rt;Rt=null,Qe(O)}}))};Zt.addEventListener("mousemove",Ze),Zt.addEventListener("mouseleave",()=>{gt.style.display="none",A()})}d();let w=s.closest(".panel");w.querySelectorAll(".rc-range-btn").forEach(b=>{b.addEventListener("click",()=>{w.querySelectorAll(".rc-range-btn").forEach(m=>m.classList.remove("on")),b.classList.add("on"),c=b.dataset.range==="all"?"all":parseInt(b.dataset.range,10),A(),d()})});let u=w.querySelector(".rc-trend");u&&u.addEventListener("click",()=>{v=!v,u.classList.toggle("on",v),u.setAttribute("aria-pressed",String(v)),A(),d()})}function Rs(e){let s=K[e],a=$("#page-player");if(!s){a.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("pl.notFound",{name:x(e)})}</div></div></div>`;return}let i=U.find(v=>v.name===e),r=At(e),p=r.slice(0,10),h=Fe(e),g=Math.max(3,Math.min(100,100-s.rd/120*100)),n=(typeof window.lbTankFor=="function"?window.lbTankFor(e):null)||(window.LB_TANKS||{})[e]||(window.LB_TANKS_SNAPSHOT||{})[e]||null,l=n&&n.lastLogin?Pe(n.lastLogin):"",o=n&&n.lastLogin?je(n.lastLogin):"",c=n&&n.created?new Date((n.created||0)*1e3).getFullYear():0;a.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">${t("pl.back")}</a>
    <div class="pv-layout">
    <div class="pv-main">
    <div class="player-hero anim">
      <div class="pv-hero-top">
        <div class="pv-id">
          ${i?Ut(i.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
          <div class="pv-id-text">
            <div class="pv-eyebrow">
              <span class="mi">${i?t("pl.rankedOf",{rank:i.rank,total:U.length}):t("pl.unranked")}</span>
              ${s.provisional?`<span class="tag prov">${t("tag.provisional")}</span>`:""}
              ${s.inactive?`<span class="tag inact">${t("tag.inactive")}</span>`:""}
            </div>
            <h1 class="player-name">${x(s.name)}</h1>
            <div class="pv-meta">
              ${c?`<span class="mi pv-since">${t("cards.since",{year:c})}</span>`:""}
              ${l?`<span class="mi pv-seen"><span title="${x(o)}">${t("cards.lastSeen")} ${x(l)}</span></span>`:""}
            </div>
            ${os(s.name,"hero")}
            <button class="pc-share pv-share" data-share="link" data-target="profile" data-name="${x(s.name)}"><svg class="pc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg><span>${t("cards.shareLink")}</span></button>
          </div>
        </div>
        <div class="player-rating-block">
          <div class="lbl">${s.provisional?t("pl.estRange"):t("pl.visible")}</div>
          <div class="pv-rating-row"><div class="big mono${s.provisional?" prov-range":""}" id="pv-rating">${s.provisional?Et(s):"0"}</div>${Wt(s)}</div>
          <div class="rd-bar">
            <div class="bar-track"><div class="bar-fill" style="width:${g}%"></div></div>
            <div class="caption"><span>${t("pl.certainty")}</span><span class="mono">RD ${s.rd.toFixed(1)}</span></div>
          </div>
        </div>
      </div>
      <div class="pstat-ribbon">
        <div class="rs"><div class="k">${t("pl.record")}</div><div class="v rec"><span class="w">${s.w}${j("W")}</span> <span class="l">${s.l}${j("L")}</span> <span class="d">${s.d}${j("D")}</span></div></div>
        <div class="rs"><div class="k">${t("pl.winRate")}</div><div class="v mono">${s.winPct}%</div></div>
        <div class="rs"><div class="k">${t("pl.matches")}</div><div class="v mono">${s.matches}</div></div>
        <div class="rs"><div class="k">${t("pl.opponents")}</div><div class="v mono">${s.opponents}</div></div>
        <div class="rs"><div class="k">${t("pl.avgOppRating")}</div><div class="v mono">${s.avgOpp.toFixed(1)}</div></div>
        <div class="rs"><div class="k">${t("pl.glicko")}</div><div class="v mono">${s.glicko.toFixed(1)}</div></div>
        <div class="pv-form">
          <div class="fl-label">${t("pl.recentForm")} <span class="n">${t("pl.lastN",{n:Math.min(10,r.length)})}</span></div>
          <div class="form-strip">
            ${p.map((v,y)=>`<div class="form-pill ${v.res}" style="animation-delay:${y*55}ms"
               title="${t("pl.vsOpp",{opp:x(v.opp)})} ${v.for_}-${v.against}">${j(v.res)}</div>`).join("")||`<span class="empty">${t("pl.noGames")}</span>`}
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="pv-side">${typeof cardsHeroHTML=="function"?cardsHeroHTML(e):""}</div>
    </div>

    <div class="pv-lower">
    ${qs(e)}
    <div class="panel reveal">
      <h3>${t("pl.matchHistory")} <span class="n">${tp("pl.nGames",r.length)}</span></h3>
      <div class="match-list">
        ${r.map(v=>`
          <div class="match-row">
            <div class="res-chip ${v.res}">${j(v.res)}</div>
            <div class="who">${x(s.name)}</div>
            <div class="score mono"><b>${v.for_}</b><span class="dash">\u2013</span><span class="ag">${v.against}</span></div>
            <div class="who opp"><a href="#/player/${J(v.opp)}" style="color:var(--blue)">${x(v.opp)}</a></div>
            <div class="date mono" title="${Ne(v.date)}">${tt(v.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.h2h")} <span class="n">${tp("pl.nOpponents",h.length)}</span></h3>
      <div class="h2h-grid">
        ${h.map(v=>`
          <div class="h2h-card" data-goto="${x(v.opp)}" tabindex="0" role="link">
            <div class="opp">${x(v.opp)}</div>
            <div class="rec mono"><span class="w">${v.w}${j("W")}</span> \xB7 <span class="l">${v.l}${j("L")}</span> \xB7 <span>${v.d}${j("D")}</span> \xB7 ${t("pl.pts",{pf:v.pf,pa:v.pa})}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>
    </div>
  </div>`,s.provisional||Ht($("#pv-rating"),s.rating,{dec:1,dur:900}),typeof cardsMountAll=="function"&&cardsMountAll(a),As(e),requestAnimationFrame(et),setTimeout(et,140),setTimeout(et,450),document.fonts&&document.fonts.ready&&document.fonts.ready.then(et),Yt()}var pe="",ve="all";function Fs(){return Q().filter(e=>{if(ve==="dated"&&!e.date||ve==="legacy"&&e.date)return!1;if(!pe)return!0;let s=pe;return e.a.toLowerCase().includes(s)||e.b.toLowerCase().includes(s)||`${e.sa}-${e.sb}`.includes(s)||`${e.sb}-${e.sa}`.includes(s)||e.date&&(e.date.includes(s)||tt(e.date).toLowerCase().includes(s))||s==="legacy"&&!e.date})}function Os(e){return e.map(s=>{let a=s.sa>s.sb,i=s.sb>s.sa;return`
    <div class="gm-row">
      <div class="side ${a?"winner":"loser"}">
        <div class="dot ${a?"w":"l"}"></div>
        <div class="nm" data-goto="${x(s.a)}" tabindex="0" role="link">${x(s.a)}</div>
      </div>
      <div class="sc mono" style="color:${a?"var(--green)":"var(--red)"}">${s.sa}</div>
      <div class="dash mono">\u2013</div>
      <div class="sc mono" style="color:${i?"var(--green)":"var(--red)"}">${s.sb}</div>
      <div class="side right ${i?"winner":"loser"}">
        <div class="dot ${i?"w":"l"}"></div>
        <div class="nm" data-goto="${x(s.b)}" tabindex="0" role="link">${x(s.b)}</div>
      </div>
      <div class="dt mono">${s.admin&&!s.published?`<span class="tag fresh">${t("tag.new")}</span>`:tt(s.date)||t("misc.historical")}</div>
    </div>`}).join("")||`<div class="empty">${t("matches.noResults")}</div>`}function be(){let e=$("#gm-body"),s=Fs();$("#gm-count").textContent=tp("gm.count",s.length),e.innerHTML=Os(s)}function Ns(){Ge(),be()}$("#gm-search")&&$("#gm-search").addEventListener("input",e=>{pe=e.target.value.trim().toLowerCase(),be()});document.querySelectorAll("#gm-filters [data-scope]").forEach(e=>{e.addEventListener("click",()=>{ve=e.dataset.scope,document.querySelectorAll("#gm-filters [data-scope]").forEach(s=>s.classList.toggle("on",s===e)),be()})});function js(){let e=Z.players.filter(s=>s.provisional).sort((s,a)=>a.rating-s.rating);$("#roster-grid").innerHTML=e.map(s=>{let a=Math.min(100,Math.round(Math.min(1,s.matches/5)*50+Math.min(1,s.opponents/3)*50));return`
    <div class="roster-card reveal" data-goto="${x(s.name)}" tabindex="0" role="link">
      <div class="top">
        <div class="nm">${x(s.name)}</div>
        <svg class="shield" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"/></svg>
      </div>
      <div class="rating"><span class="unit">${t("roster.estRange")}</span><span class="big prov-range">${Et(s)}</span></div>
      <div class="req-row"><span>${t("roster.matches")}</span><span class="${s.matches>=5?"ok":""}">${s.matches} / 5 ${s.matches>=5?"\u2713":""}</span></div>
      <div class="req-row"><span>${t("roster.opponents")}</span><span class="${s.opponents>=3?"ok":""}">${s.opponents} / 3 ${s.opponents>=3?"\u2713":""}</span></div>
      <div class="prog-track"><div class="prog-fill" data-w="${a}"></div></div>
      <div class="prog-label">${t("roster.progress",{pct:a})}</div>
    </div>`}).join(""),requestAnimationFrame(()=>B("#roster-grid .prog-fill").forEach(s=>{s.style.width=s.dataset.w+"%"}))}var Dt="all",lt=0;function Ps(){if(Dt==="all")return Q();let e=Date.now(),s=Number(Dt);return Q().filter(a=>a.date&&(e-Date.parse(a.date))/864e5<=s)}function we(){let e=Z.players,s=Ps(),a=Dt!=="all",i,r;if(!a)i=U.filter(u=>u.matches>=lt).sort((u,b)=>b.winPct-u.winPct).slice(0,10),r=e.filter(u=>u.matches>=lt).sort((u,b)=>b.matches-u.matches).slice(0,10);else{let u={};s.forEach(m=>{[m.a,m.b].forEach(L=>{let M=u[L]=u[L]||{name:L,w:0,l:0,d:0,matches:0};M.matches+=1}),m.sa===m.sb?(u[m.a].d+=1,u[m.b].d+=1):m.sa>m.sb?(u[m.a].w+=1,u[m.b].l+=1):(u[m.a].l+=1,u[m.b].w+=1)});let b=Object.values(u).map(m=>({...m,winPct:m.matches?Math.round(m.w/m.matches*1e3)/10:0})).filter(m=>m.matches>=Math.max(lt,1));i=b.slice().sort((m,L)=>L.winPct-m.winPct).slice(0,10),r=b.slice().sort((m,L)=>L.matches-m.matches).slice(0,10)}let p=[];s.forEach(u=>{let b=K[u.a],m=K[u.b];if(!b||!m)return;let L=b.rating-m.rating;if(u.sa===u.sb)return;let M=u.sa>u.sb?u.a:u.b,F=Math.abs(L);(L<0&&M===u.a||L>0&&M===u.b)&&p.push({winner:M,loser:M===u.a?u.b:u.a,gap:F,score:M===u.a?`${u.sa}-${u.sb}`:`${u.sb}-${u.sa}`})}),p.sort((u,b)=>b.gap-u.gap);let h={};s.forEach(u=>{let b=[u.a,u.b].sort().join(" vs ");h[b]=(h[b]||0)+1});let g=Object.entries(h).sort((u,b)=>b[1]-u[1]).slice(0,10),n=e.filter(u=>u.matches>=lt).map(u=>u.rating),l=n.length?Math.min(...n):Math.min(...e.map(u=>u.rating)),o=n.length?Math.max(...n):Math.max(...e.map(u=>u.rating)),c=8,v=(o-l)/c||1,y=Array.from({length:c},()=>0);n.forEach(u=>{y[Math.min(c-1,Math.max(0,Math.floor((u-l)/v)))]++});let f=Math.max(...y,1),k=y.map((u,b)=>{let m=Math.round((l+b*v)/10)*10,L=Math.round((l+(b+1)*v)/10)*10;return`
    <div class="hcol" title="${tp("an.histTip",u,{lo:m,hi:L})}">
      <div class="hbar" data-h="${Math.round(u/f*100)}"></div>
      <div class="hlbl">${m}\u2013${L}</div>
    </div>`}).join(""),S=e.filter(u=>u.matches>=lt).sort((u,b)=>b.opponents-u.opponents).slice(0,8),q=Math.max(...S.map(u=>u.opponents),1),E=S.map(u=>`
    <div class="mrow reveal" data-goto="${x(u.name)}" tabindex="0" role="link">
      <div class="nm">${x(u.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(u.opponents/q*100)}"></div></div>
      <div class="val mono">${u.opponents}</div>
    </div>`).join(""),A=(u,b,m)=>u.map((L,M)=>`
    <div class="an-row reveal" data-goto="${x(L.name)}" tabindex="0" role="link">
      <div class="idx mono">${M+1}</div>
      <div class="nm">${x(L.name)}</div>
      <div class="val mono">${b(L)}</div>
      <div class="unit mono">${m(L)}</div>
    </div>`).join(""),d=u=>tp("an.nMatches",u.matches);$("#an-grid").innerHTML=`
    <div class="an-panel">
      <div class="head"><h3>${t("an.topWinRate")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${A(i,u=>u.winPct+"%",d)}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.mostActive")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/></svg>
      </div>
      ${A(r,u=>u.matches,u=>t("an.matchesUnit"))}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.biggestUpsets")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${p.length?p.slice(0,8).map((u,b)=>`
        <div class="an-row reveal" data-goto="${x(u.winner)}" tabindex="0" role="link" aria-label="${x(u.winner)}">
          <div class="idx mono">${b+1}</div>
          <div class="nm"><span class="an-link">${x(u.winner)}</span> <span class="an-def">${t("an.def")}</span> <span class="an-link alt" data-goto="${x(u.loser)}">${x(u.loser)}</span></div>
          <div class="val mono">${u.score}</div>
          <div class="unit mono">${t("an.plusPts",{n:Math.round(u.gap)})}</div>
        </div>`).join(""):`<div class="empty">${t("an.noUpsets")}</div>`}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.rivalries")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${g.map(([u,b],m)=>{let[L,M]=u.split(" vs ");return`
        <a class="an-row reveal" href="#/compare/${J(L)}/${J(M)}" title="${t("an.openCmp")}">
          <div class="idx mono">${m+1}</div>
          <div class="nm"><span class="an-link">${x(L)}</span> <span class="an-def">${t("vs")}</span> <span class="an-link">${x(M)}</span></div>
          <div class="val mono">${b}</div>
          <div class="unit mono">${t("an.meetingsUnit")}</div>
        </a>`}).join("")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.ratingDist")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 20V10M10 20V4M16 20v-8M2 20h20" stroke-linecap="round"/></svg>
      </div>
      <div class="hist">${k}</div>
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.uniqueOpp")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v5M12 15v5" stroke-linecap="round"/></svg>
      </div>
      ${E}
    </div>`;let w=()=>{B("#an-grid .hbar").forEach(u=>{u.style.height=u.dataset.h+"%"}),B("#an-grid .abar").forEach(u=>{u.style.width=u.dataset.w+"%"})};requestAnimationFrame(w),setTimeout(w,140),Yt()}document.querySelectorAll("#an-controls [data-an-range]").forEach(e=>{e.addEventListener("click",()=>{Dt=e.dataset.anRange==="all"?"all":Number(e.dataset.anRange),document.querySelectorAll("#an-controls [data-an-range]").forEach(s=>s.classList.toggle("on",s===e)),we()})});document.querySelectorAll("#an-controls [data-an-min]").forEach(e=>{e.addEventListener("click",()=>{lt=Number(e.dataset.anMin),document.querySelectorAll("#an-controls [data-an-min]").forEach(s=>s.classList.toggle("on",s===e)),we()})});function Is(){$("#settings-body").innerHTML=Ue().map(e=>`
    <tr><td><b>${x(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${x(e.desc)}</div></td>
        <td class="val">${x(String(e.value))}</td></tr>`).join("")}function Bs(){return Array.from({length:11},(e,s)=>({q:t("faq.q"+(s+1)),a:t("faq.a"+(s+1))}))}function Bt(){let e=V().faq;return Array.isArray(e)&&e.length?e:Bs()}function _s(){let e=window.cardsTiers;if(!e)return"";let{TIER_KEYS:s,tierOf:a,tierIdx:i,tierMin:r,tierLabel:p,crestSVG:h}=e,g={};s.forEach(o=>{g[o]=0}),(Z.players||[]).forEach(o=>{o&&o.rating!=null&&(g[a(o.rating)]+=1)});let n=s.reduce((o,c)=>o+g[c],0),l=s.slice().reverse().map(o=>{let c=i(o),v=r(o),y=s[c+1]!=null?r(s[c+1]):null,f=c===0?`&lt; ${Math.round(y)}`:y!=null?`${Math.round(v)}\u2013${Math.round(y)-1}`:`${Math.round(v)}+`,k=n?g[o]/n*100:0;return`
      <tr class="tier-${o}">
        <td class="fd-badge"><span class="fd-badge-in">${h(o)}<span class="fd-name">${p(o)}</span></span></td>
        <td class="fd-range mono">${f}</td>
        <td class="fd-count"><b class="mono">${g[o]}</b><i style="width:${k.toFixed(1)}%"></i></td>
      </tr>`}).join("");return`
    <p class="fd-note">${t("faq.distNote")}</p>
    <table class="fd-table">
      <thead><tr><th>${t("faq.distBadge")}</th><th>${t("faq.distRange")}</th><th>${t("faq.distPlayers")}</th></tr></thead>
      <tbody>${l}</tbody>
    </table>`}function Ds(){let e='<svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',s=(a,i,r)=>`
    <div class="faq-item reveal" data-faq="${r}">
      <button class="faq-q" aria-expanded="false">
        <span>${a}</span>
        ${e}
      </button>
      <div class="faq-a"><div class="faq-a-in">${i}</div></div>
    </div>`;$("#faq-list").innerHTML=s(x(t("faq.distTitle")),_s(),"dist")+Bt().map((a,i)=>s(x(String(a.q||"")),x(String(a.a||"")),i)).join(""),Yt()}document.addEventListener("click",e=>{let s=e.target.closest(".faq-q");if(!s)return;let a=s.closest(".faq-item"),i=a.classList.contains("open");B(".faq-item.open").forEach(r=>{r.classList.remove("open"),r.querySelector(".faq-q").setAttribute("aria-expanded","false")}),i||(a.classList.add("open"),s.setAttribute("aria-expanded","true"))});function dt(){let e=$("#admin-wrap");if(!ps()){e.innerHTML=`
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
    </div>`;let n=async()=>{let l=$("#admin-pw").value;try{let o=await fetch(hs,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:l})});if(o.ok){let c=await o.json().catch(()=>({}));vs(c.token||l,$("#admin-remember").checked),dt(),R("Welcome back, commander.");return}if(o.status===429){R("Too many attempts \u2014 wait a few minutes.");return}}catch{}$("#admin-pw").style.borderColor="var(--red)",R("Wrong password.")};$("#admin-auth").addEventListener("click",n),$("#admin-pw").addEventListener("keydown",l=>{l.key==="Enter"&&n()});return}let a=V(),i='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',r=a.inactive.map(n=>`
    <div class="log-item">
      <div class="txt"><b>${x(n)}</b> <span style="color:var(--dimmer)">\u2014 inactive</span></div>
      <button class="icon-btn" data-inact-del="${x(n)}" title="Mark active again">${i}</button>
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

  <datalist id="player-list">${Z.players.map(n=>`<option value="${x(n.name)}">`).join("")}</datalist>`,$("#admin-lock").addEventListener("click",()=>{us(),dt()}),$("#admin-publish").addEventListener("click",()=>p()),$("#admin-sync").addEventListener("click",async()=>{let n=$("#admin-sync"),l=$("#admin-sync-status");n.disabled=!0,l.textContent="syncing\u2026";try{let o=await fetch(fs,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:$t()})}),c=await o.json().catch(()=>({}));o.ok&&c.ok?(l.textContent=c.changed?`synced \u2713 ${c.matches} matches / ${c.players} players`:"already up to date \u2713",R(c.changed?"Sheet synced \u2014 the live site was updated.":"Site already matches the sheet.")):o.status===429?(l.textContent="rate limited",R("Too many attempts \u2014 wait a few minutes.")):(l.textContent="sync failed",R("Sync failed: "+(c.error||o.status)))}catch{l.textContent="network error",R("Sync failed (network).")}n.disabled=!1});async function p(n){let l=!!(n&&n.silent),o=$t()||(l?"":(window.prompt("Admin password:")||"").trim());if(!o){R(l?'Saved here \u2014 auto-publish needs a stored password. Use "Publish to everyone".':"Publish cancelled.");return}re=!0;let c=V(),v={},y=[];for(let[S,q]of Object.entries(c.matchEdits||{}))S.startsWith("a:")&&(v[S]=q);for(let S of c.matchRemoved||[])S.startsWith("a:")&&y.push(S);let f=Q().filter(S=>S.admin).map(S=>({a:S.a,b:S.b,sa:S.sa,sb:S.sb,date:S.date||""})),k={matches:f,aliases:c.aliases||{},aliasNotes:c.aliasNotes||{},aliasRemoved:c.aliasRemoved||[],inactive:c.inactive||[],seeds:c.seeds||{},seedGlicko:c.seedGlicko||{},seedRd:c.seedRd||{},seedRemoved:c.seedRemoved||[],settings:c.settings||{},matchEdits:v,matchRemoved:y,faq:c.faq!=null?c.faq:[]};try{let S=await fetch(qt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:o,doc:k,message:`Publish match log (${f.length} matches)`})}),q=await S.json().catch(()=>({}));if(!S.ok||!q.ok){S.status===403&&sessionStorage.removeItem(ot),R("Publish failed: "+(q.error||"HTTP "+S.status));return}window.LB_PUB=k,window.LB_LOG=f,ms([]),rt({}),St(),l||dt(),R(l?"Saved \u2014 live for everyone \u2713":"Published! Everyone sees it on their next visit.")}catch{R("Publish failed: network error.")}finally{re=!1}}$("#admin-export").addEventListener("click",()=>{let n=new Blob([JSON.stringify(_e(),null,2)],{type:"application/json"}),l=document.createElement("a");l.href=URL.createObjectURL(n),l.download="match-log.json",l.click(),URL.revokeObjectURL(l.href),R("Log exported.")}),$("#ov-inact-toggle").addEventListener("click",()=>{let n=$("#ov-inact-n").value.trim();if(!n){R("Type a player name first.");return}let l=ct(),o=V().inactive||[],c=o.includes(n)?o.filter(v=>v!==n):[...o,n];rt({...l,inactive:c}),St(),dt(),R(c.includes(n)?`${n} marked inactive.`:`${n} marked active again.`)}),$("#ov-inact-list").addEventListener("click",n=>{let l=n.target.closest("[data-inact-del]");if(!l)return;let o=ct();rt({...o,inactive:(V().inactive||[]).filter(c=>c!==l.dataset.inactDel)}),St(),dt()});let h=()=>{let n=Bt();$("#faq-admin-list").innerHTML=n.map((l,o)=>`
      <div class="log-item fix-row" data-faq-idx="${o}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${x(String(l.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${x(String(l.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${o}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${o}" title="Delete question">${i}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};h(),$("#faq-admin-list").addEventListener("click",n=>{let l=n.target.closest("[data-faq-save]"),o=n.target.closest("[data-faq-del]"),c=Bt().map(y=>({...y}));if(l){let y=l.closest("[data-faq-idx]");c[parseInt(l.dataset.faqSave,10)]={q:y.querySelector('[data-fq="q"]').value.trim(),a:y.querySelector('[data-fq="a"]').value.trim()}}else if(o)c.splice(parseInt(o.dataset.faqDel,10),1);else return;let v=ct();rt({...v,faq:c}),h(),R("Q&A updated \u2014 publish to make it public.")}),$("#faq-add").addEventListener("click",()=>{let n=$("#faq-new-q").value.trim(),l=$("#faq-new-a").value.trim();if(!n||!l){R("Fill in both the question and the answer.");return}let o=ct();rt({...o,faq:[...Bt().map(c=>({...c})),{q:n,a:l}]}),h(),R("Question added.")}),$("#faq-reset").addEventListener("click",()=>{let n=ct();rt({...n,faq:null}),h(),R("Q&A back to the built-in list.")}),window._fbTimer&&(clearInterval(window._fbTimer),window._fbTimer=null);async function g(){let n=$("#fb-inbox");if(!n||document.querySelector("#fb-inbox [data-fb-reply]:focus"))return;let l=$t();if(!l){n.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let o=await fetch(it+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:l})}),c=await o.json().catch(()=>({}));if(!o.ok||!c.ok){n.innerHTML=`<div class="empty">Could not load messages (${x(c.error||"HTTP "+o.status)}).</div>`;return}let v=c.items||[],y={};n.querySelectorAll("[data-fb-id]").forEach(f=>{let k=f.querySelector("[data-fb-reply]");k&&k.value&&(y[f.dataset.fbId]=k.value)}),n.innerHTML=v.map(f=>`
        <div class="log-item fb-row${f.resolved?" fb-done":""}" data-fb-id="${x(f.id)}" data-fb-resolved="${f.resolved?"1":""}">
          <div class="txt">
            <b>${x(f.name||"Anonymous")}</b>${f.contact?` <span style="color:var(--dimmer)">\xB7 ${x(f.contact)}</span>`:""}
            <span class="mono" style="color:var(--dimmer);font-size:11px;margin-left:6px">ticket ${x(f.id)}</span>
            ${f.resolved?'<span class="tag resolved" style="margin-left:6px">resolved \u2713</span>':`<span class="tag ${f.status==="replied"?"live":"fresh"}" style="margin-left:6px">${x(f.status)}</span>`}
            <div style="color:var(--dim);font-size:13px;margin-top:4px">${x(f.message)}</div>
            ${f.reply?`<div style="color:var(--gold);font-size:12.5px;margin-top:4px">\u21A9 ${x(f.reply)}</div>`:""}
          </div>
          <input class="set-val fb-reply-in" data-fb-reply placeholder="Write a reply\u2026" value="${x(f.reply||"")}">
          <button class="icon-btn" data-fb-send title="Send reply"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-resolve title="${f.resolved?"Reopen \u2014 mark as not resolved":"Mark as resolved"}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.6L16 9.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-del title="Delete message">${i}</button>
        </div>`).join("")||'<div class="empty">No messages yet.</div>',n.querySelectorAll("[data-fb-id]").forEach(f=>{let k=f.querySelector("[data-fb-reply]");k&&y[f.dataset.fbId]!=null&&(k.value=y[f.dataset.fbId])})}catch{n.innerHTML='<div class="empty">Network error loading messages.</div>'}}g(),$("#fb-refresh").addEventListener("click",()=>{g(),R("Inbox refreshed.")}),window._fbTimer=setInterval(()=>{if(!$("#fb-inbox")){clearInterval(window._fbTimer),window._fbTimer=null;return}document.hidden||g()},2e3),$("#fb-inbox").addEventListener("click",async n=>{let l=n.target.closest("[data-fb-send]"),o=n.target.closest("[data-fb-del]"),c=n.target.closest("[data-fb-resolve]");if(!l&&!o&&!c)return;let v=n.target.closest("[data-fb-id]"),y=v.dataset.fbId,f=$t();try{if(c){let k=v.dataset.fbResolved!=="1";if(!(await fetch(it+"/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:f,id:y,resolved:k})}).then(q=>q.json())).ok){R("Could not update \u2014 try again.");return}R(k?"Marked as resolved \u2713":"Message reopened."),g()}else if(l){let k=v.querySelector("[data-fb-reply]").value;if(!(await fetch(it+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:f,id:y,reply:k})}).then(q=>q.json())).ok){R("Reply failed.");return}R("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(it+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:f,id:y})}).then(S=>S.json())).ok){R("Delete failed.");return}v.remove(),R("Message deleted.")}}catch{R("Network error.")}})}var Ot=document.getElementById("fl-cards");Ot&&window.matchMedia("(hover: hover)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(Ot.addEventListener("pointermove",e=>{let s=e.target.closest&&e.target.closest(".fl-card");if(!s)return;let a=s.getBoundingClientRect(),i=(e.clientX-a.left)/a.width-.5,r=(e.clientY-a.top)/a.height-.5;s.classList.add("tilt"),s.style.transform=`perspective(1000px) rotateY(${(i*7).toFixed(2)}deg) rotateX(${(-r*6).toFixed(2)}deg) translateY(-6px)`}),Ot.addEventListener("pointerleave",()=>{Ot.querySelectorAll(".fl-card").forEach(e=>{e.style.transform="",e.classList.remove("tilt")})}));$("#search").addEventListener("input",e=>{let s=e.target.value.trim().toLowerCase(),a=$("#search-drop");if(!s){a.classList.remove("show");return}let i=Z.players.filter(r=>r.name.toLowerCase().includes(s)).slice(0,8);if(!i.length){a.classList.remove("show");return}a.innerHTML=i.map(r=>`
    <a class="drop-row" href="#/player/${J(r.name)}">
      ${r.rank?Ut(r.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${x(r.name)}</span>        <span class="mono" style="margin-left:auto;color:var(--dim)">${_t(r,!0)}</span>
    </a>`).join(""),a.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||$("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&($("#search-drop").classList.remove("show"),$("#search").value="")});var it=qt.replace(/\/publish$/,"/feedback"),zt="tt1v1_fb_tickets";function Hs(){try{return JSON.parse(localStorage.getItem(zt)||"[]")}catch{return[]}}function Us(e){let s=Hs();s.push({id:e,ts:Date.now()});try{localStorage.setItem(zt,JSON.stringify(s.slice(-20)))}catch{}}function Gs(){let e=$("#fb-overlay"),s=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>$("#fb-msg").focus(),180)},a=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};$("#fab-feedback").addEventListener("click",s),$("#fb-close").addEventListener("click",a),$("#fb-done").addEventListener("click",a),e.addEventListener("click",n=>{n.target===e&&a()}),document.addEventListener("keydown",n=>{n.key==="Escape"&&e.classList.contains("show")&&a()});let i=$("#faq-feedback-btn");i&&i.addEventListener("click",s);let r=$("#fb-msg"),p=$("#fb-count-n");r.addEventListener("input",()=>{p.textContent=String(r.value.length);try{localStorage.setItem("tt1v1_fb_draft",r.value)}catch{}});try{let n=localStorage.getItem("tt1v1_fb_draft");n&&(r.value=n,p.textContent=String(n.length))}catch{}let h=$("#fb-send");h.addEventListener("click",async()=>{let n=r.value.trim();if(n.length<5){r.focus(),r.classList.add("fb-nudge"),setTimeout(()=>r.classList.remove("fb-nudge"),500),R(t("fb.writeFirst"));return}h.classList.add("busy"),h.disabled=!0;try{let l=await fetch(it,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:$("#fb-name").value.trim(),contact:$("#fb-contact").value.trim(),message:n})}),o=await l.json().catch(()=>({}));if(!l.ok||!o.ok){R(t("fb.couldNotSend",{err:o.error||"HTTP "+l.status}));return}Us(o.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}$("#fb-ticket-code").textContent=o.id,$("#fb-view-form").hidden=!0,$("#fb-view-done").hidden=!1}catch{R(t("fb.netError"))}finally{h.classList.remove("busy"),h.disabled=!1}});let g=document.querySelector(".fb-ticket");g&&g.addEventListener("click",async()=>{let n=($("#fb-ticket-code").textContent||"").trim();if(!n||n==="\u2014")return;try{await navigator.clipboard.writeText(n)}catch{let c=document.createElement("textarea");c.value=n,document.body.appendChild(c),c.select();try{document.execCommand("copy")}catch{}c.remove()}let l=$("#fb-copied");l&&(l.classList.add("show"),clearTimeout(window._fbCopiedT),window._fbCopiedT=setTimeout(()=>l.classList.remove("show"),1800)),R(t("fb.ticketCopied"))}),$("#fb-check").addEventListener("click",async()=>{let n=$("#fb-ticket-in").value.trim(),l=$("#fb-reply-out");if(n){l.classList.add("show"),l.textContent=t("fb.checking");try{let o=await fetch(it+"/status?id="+encodeURIComponent(n)),c=await o.json().catch(()=>({}));if(!o.ok||!c.ok){l.textContent=t("fb.noTicket");return}l.innerHTML=c.resolved?`${t("fb.statusResolved")}${c.reply?`<br>${t("fb.replyFrom",{reply:x(c.reply)})}`:""}`:c.reply?t("fb.replyFrom",{reply:x(c.reply)}):t("fb.statusPending",{status:x(c.status)})}catch{l.textContent=t("fb.netErrorShort")}}})}function Ws(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let s=null,a=null,i=null,r=0,p=0,h=0,g=c=>{let v=c&&c.closest?c.closest("[title],[data-tip]"):null;return v&&v.hasAttribute("title")&&(v.setAttribute("data-tip",v.getAttribute("title")),v.removeAttribute("title")),v&&v.getAttribute("data-tip")?v:null},n=(c,v)=>{let y=e.offsetWidth,f=e.offsetHeight,k=c+14,S=v+18;k+y>window.innerWidth-8&&(k=c-y-14),S+f>window.innerHeight-8&&(S=v-f-14),k=Math.max(8,k),S=Math.max(8,S);let q=e.classList.contains("show")&&e.style.left?Math.abs(parseFloat(e.style.left)-k)+Math.abs(parseFloat(e.style.top)-S)<150:!1;e.classList.toggle("snap",!q),e.style.left=k+"px",e.style.top=S+"px"},l=(c,v,y)=>{s=c,e.textContent=c.getAttribute("data-tip"),n(v,y),e.classList.add("show")},o=()=>{clearTimeout(a),clearTimeout(i),a=i=null,e.classList.remove("show"),s=null};document.addEventListener("mousemove",c=>{p=c.clientX,h=c.clientY;let v=g(c.target);if(v){if(clearTimeout(i),i=null,v===s){e.classList.contains("show")&&(cancelAnimationFrame(r),r=requestAnimationFrame(()=>n(p,h)));return}clearTimeout(a),e.classList.contains("show")?l(v,p,h):a=setTimeout(()=>l(v,p,h),90);return}s&&!i&&(i=setTimeout(o,110))},{passive:!0}),window.addEventListener("scroll",o,{passive:!0}),document.addEventListener("mousedown",o,{passive:!0})}var Ce;function R(e){let s=$("#toast");s.textContent=e,s.classList.add("show"),clearTimeout(Ce),Ce=setTimeout(()=>s.classList.remove("show"),2600)}var bt;function Yt(){bt&&bt.disconnect(),bt=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&(s.target.classList.add("in"),B(".cu",s.target).forEach(a=>Ht(a,parseFloat(a.dataset.target),{dec:parseInt(a.dataset.dec||0)})),bt.unobserve(s.target))})},{threshold:.12}),B(".reveal").forEach(e=>bt.observe(e))}(function(){let s=$("#scroll-progress"),a=$("#to-top"),i=$("#page-home .hero-row"),r=document.querySelector(".topbar"),p=!1,h=null,g=null,n=()=>{p=!1;let v=window.scrollY,y=document.documentElement.scrollHeight-window.innerHeight;if(s&&(s.style.transform=`scaleX(${y>0?Math.min(1,v/y):0})`),a&&a.classList.toggle("show",v>640),r&&r.classList.toggle("scrolled",v>10),i&&v<1400){let f=Math.round(v*.14),k=Math.max(.3,1-v/950).toFixed(2);f!==h&&(i.style.transform=`translateY(${f}px)`,h=f),k!==g&&(i.style.opacity=k,g=k)}},l,o=document.documentElement,c=()=>{o.classList.add("is-scrolling"),r&&r.classList.add("scrolling"),clearTimeout(l),l=setTimeout(()=>{o.classList.remove("is-scrolling"),r&&r.classList.remove("scrolling")},160),p||(p=!0,requestAnimationFrame(n))};window.addEventListener("scroll",c,{passive:!0}),a&&a.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),n()})();window.lbScrollNow=e=>{window.scrollTo({top:e||0,behavior:"instant"})};window.lbCards={topOf:()=>U,all:()=>Z.players,byName:()=>K,histOf:At,h2hOf:Fe,deltaTag:Wt,resLetter:j,fmtDate:tt,canon:P,allMatches:Q,ratingTimeline:Xs,ratingSeries:ta,altsOf:Re,lastSeenText:Pe,lastSeenExact:je};St();fe();ft();Gs();Ws();window.addEventListener("lb-lang",()=>{let e=window.scrollY,s=nt,a={...I};ft(),$("#page-home").classList.contains("active")&&(s!=="all"||a.key!=="rank"||a.dir!==1)&&(nt=s,I=a,B(".chip[data-filter]").forEach(i=>i.classList.toggle("on",i.dataset.filter===s)),me(),ht(s,a.key,a.dir)),ge(),window.lbScrollNow(e)});function wt(e,s){let a=e.indexOf("window."+s);if(a<0)return null;let i=e.indexOf("=",a);for(;i<e.length&&"{[".indexOf(e[i])<0;)i++;let r=0,p=!1,h="",g=!1;for(let n=i;n<e.length;n++){let l=e[n];if(p){g?g=!1:l==="\\"?g=!0:l===h&&(p=!1);continue}if(l==='"'||l==="'"){p=!0,h=l;continue}if(l==="{"||l==="[")r++;else if((l==="}"||l==="]")&&(r--,r<=0))return JSON.parse(e.slice(i,n+1))}return null}var qe="https://tierstats.github.io/";async function Ae(e,s){for(let a of e)try{let i=await fetch(a+(a.includes("?")?"&":"?")+s,{cache:"no-store"});if(i.ok)return await i.text()}catch{}return null}async function Jt(e){try{let s="cb="+Date.now(),[a,i]=await Promise.all([Ae([qe+"data.js","data.js"],s),Ae([qe+"log.js","log.js"],s)]);if(!a||!i)throw new Error("data unavailable");let r=wt(a,"LB_TANKS");r&&(window.LB_TANKS={...window.LB_TANKS_SNAPSHOT||{},...r});let p=wt(a,"LB_DATA"),h=wt(i,"LB_PUB")||(wt(i,"LB_LOG")?{matches:wt(i,"LB_LOG")}:null),g=[];if(p&&JSON.stringify(p)!==JSON.stringify(D)&&(D=p,window.LB_DATA=p,g.push("data")),h&&JSON.stringify(h)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=h,window.LB_LOG=h.matches||[],g.push("log")),g.length){let n=window.scrollY;St(),fe(),ft(),window.scrollTo({top:n,behavior:"instant"}),document.querySelectorAll(".reveal:not(.in), .anim:not(.in)").forEach(o=>o.classList.add("in"));let l=$("#last-updated");l&&(l.textContent=t("home.lastUpdated",{when:tt(D.generated)||"today"}))}e&&R(g.length?t("misc.refreshed"):t("misc.upToDate"))}catch{e&&R(t("misc.refreshFailed"))}}Jt(!1);var Nt=$("#lb-refresh-btn");Nt&&Nt.addEventListener("click",async()=>{Nt.classList.add("spinning"),await Jt(!0),setTimeout(()=>Nt.classList.remove("spinning"),400)});setInterval(()=>Jt(!1),6e4);document.addEventListener("visibilitychange",()=>{document.hidden||Jt(!1)});var ze="tt1v1_fb_seen",X=null;function zs(){try{return JSON.parse(localStorage.getItem(zt)||"[]")}catch{return[]}}function Ye(){try{return JSON.parse(localStorage.getItem(ze)||"{}")||{}}catch{return{}}}function Ys(){let e=$("#fab-feedback");if(e&&!e.querySelector(".fb-dot")){let a=document.createElement("span");a.className="fb-dot",e.appendChild(a),requestAnimationFrame(()=>a.classList.add("in"))}let s=$("#fb-view-form");if(s&&!$("#fb-reply-banner")&&X){let a=document.createElement("div");a.id="fb-reply-banner",a.innerHTML=`${t("fb.teamReplied",{id:x(X.id)})}
      <div class="r">${x(X.reply)}</div>
      <button class="btn btn-ghost" id="fb-got-it" style="margin-top:9px;padding:6px 13px">${t("fb.gotIt")}</button>`,s.insertAdjacentElement("beforebegin",a),requestAnimationFrame(()=>a.classList.add("show")),$("#fb-got-it").addEventListener("click",Js)}}function Js(){if(X){let a=Ye();a[X.id]=1;try{localStorage.setItem(ze,JSON.stringify(a))}catch{}X=null}let e=$(".fb-dot");e&&(e.classList.add("out"),setTimeout(()=>e.remove(),420));let s=$("#fb-reply-banner");s&&(s.classList.remove("show"),setTimeout(()=>s.remove(),420))}async function Je(){let e=Ye();X=null;let s=zs(),a=s.slice(0,Math.max(0,s.length-6)),i=[];for(let r of s.slice(-6))try{let p=await fetch(it+"/status?id="+encodeURIComponent(r.id),{cache:"no-store"}),h=await p.json().catch(()=>({}));if(p.status===404||p.ok&&h.ok===!1)continue;i.push(r),p.ok&&h.ok&&h.reply&&!e[r.id]&&!X&&(X={id:r.id,reply:h.reply})}catch{i.push(r)}if(i.length!==s.slice(-6).length)try{localStorage.setItem(zt,JSON.stringify([...a,...i]))}catch{}X&&Ys()}setTimeout(Je,3500);setInterval(Je,9e4);var Vs=qt.replace(/\/publish$/,"/api/ttstats"),Ks=15e3;function Qs(e,s){let a=e&&e.stats||{};return s==="kd"?a.deaths?a.kills/a.deaths:a.kills!=null?a.kills:null:a[s]!=null?a[s]:null}function Zs(e){let s=a=>String(a).replace(/["\\]/g,"\\$&");Object.keys(e).forEach(a=>{let i=e[a];window.LB_TANKS=Object.assign({},window.LB_TANKS||{},{[a]:i}),document.querySelectorAll(`[data-live-name="${s(a)}"][data-live]`).forEach(r=>{let p=r.dataset.live,h=Qs(i,p);if(h==null)return;let g=p==="kd"&&i.stats&&i.stats.deaths?2:0,n=Number(h.toFixed(g)),l=parseFloat(String(r.textContent).replace(/[^0-9.\-]/g,""));(isNaN(l)||l!==n)&&Ht(r,n,{dec:g,dur:900})}),document.querySelectorAll(`canvas[data-tank-name="${s(a)}"]`).forEach(r=>{r.dataset.mounted&&window.TankRender&&window.TankRender.render(r,i,r.dataset.tankSize||"medium")})})}(function(){let s=!1,a=0,i=new Set,r=0,p=0,h=n=>{a||(a=setTimeout(()=>{a=0,g()},n))};window.lbTankWant=n=>{n&&i.add(String(n)),s&&h(350)};let g=async()=>{if(s){h(300);return}if(document.visibilityState!=="visible")return;let n=[...new Set([...[...document.querySelectorAll("[data-live-name]")].map(d=>d.dataset.liveName),...[...document.querySelectorAll("canvas[data-tank-name]")].map(d=>d.dataset.tankName)])].filter(Boolean),l=window.LB_DATA||{},o=[...new Set([...l.qualified||[],...l.players||[]].map(d=>d&&d.name).filter(Boolean))],c=12,v=new Set,y=(d,w,u)=>{let b=[];for(let m=0;m<d.length&&b.length<u;m++){let L=d[(w+m)%d.length];v.has(L)||(v.add(L),b.push(L))}return b},f=[...i].filter(Boolean);f.forEach(d=>v.add(d));let k=n.filter(d=>!v.has(d)),S=y(k,r,Math.min(6,Math.max(0,c-v.size)));k.length>S.length&&(r=(r+S.length)%k.length);let q=o.filter(d=>!v.has(d)),E=y(q,p,Math.max(0,c-v.size));q.length>E.length&&(p=(p+E.length)%q.length);let A=[...f,...S,...E].slice(0,c);if(A.length){s=!0;try{let w=await(await fetch(Vs+"?names="+encodeURIComponent(A.join(",")),{cache:"no-store"})).json();w&&w.ok&&w.tanks&&(Zs(w.tanks),typeof window.lbTankFreshMark=="function"&&window.lbTankFreshMark(Object.keys(w.tanks))),A.forEach(u=>i.delete(u))}catch{}s=!1}};window.lbLiveStatsTick=()=>h(0),g(),setTimeout(g,900),setInterval(g,Ks)})();var xt=null;function Ve(){if(xt)return xt;let e={},s=(o,c,v,y)=>{let f=c-C.conservative*v;(!e[o]||f>e[o].rating)&&(e[o]={rating:f,date:y||""})},a={},i=o=>{if(!a[o]){let[c,v]=le(o);a[o]={r:c,rd:v,lastIdx:null}}return a[o]},r={};for(let o of Q()){if(o.date)continue;let c=o.sa>o.sb?1:o.sa<o.sb?0:.5;(r[o.a]=r[o.a]||[]).push([o.b,c]),(r[o.b]=r[o.b]||[]).push([o.a,1-c]),i(o.a).lastIdx=st,i(o.b).lastIdx=st}let p={};for(let o in r)p[o]=[i(o).r,i(o).rd];for(let o in r){let c=i(o),[v,y]=pt(c.r,c.rd,r[o].map(([f,k])=>[p[f][0],p[f][1],k]));c.r=v,c.rd=y,s(o,v,y,C.graceStart)}let h={},g={};for(let o in a)g[P(o)]={r:a[o].r,rd:a[o].rd,lastIdx:a[o].lastIdx};let n=o=>{if(!g[o]){let[c,v]=le(o);g[o]={r:c,rd:v,lastIdx:null}}return g[o]};for(let o of Q().slice().reverse()){let c=o.date?Tt(o.date):null,v=P(o.a),y=P(o.b),f=n(v),k=n(y);if(c!=null)for(let w of[f,k]){let u=c-(w.lastIdx==null?st:w.lastIdx);u>0&&(w.rd=Math.min(Math.sqrt(w.rd*w.rd+C.growth*C.growth*u),C.maxRd))}let S=o.sa>o.sb?1:o.sa<o.sb?0:.5,[q,E]=pt(f.r,f.rd,[[k.r,k.rd,S]]),[A,d]=pt(k.r,k.rd,[[f.r,f.rd,1-S]]);f.r=q,f.rd=E,c!=null&&(f.lastIdx=c),k.r=A,k.rd=d,c!=null&&(k.lastIdx=c),o.date&&((h[v]=h[v]||[]).push({date:o.date,r:q-C.conservative*E,opp:o.b,pf:o.sa,pa:o.sb,w:S}),(h[y]=h[y]||[]).push({date:o.date,r:A-C.conservative*d,opp:o.a,pf:o.sb,pa:o.sa,w:1-S}))}let l=new Map;for(let o of Q().filter(c=>c.date).slice().reverse()){let c=Tt(o.date);l.has(c)||l.set(c,[]),l.get(c).push({a:P(o.a),b:P(o.b),sa:+o.sa,sb:+o.sb,date:o.date})}for(let o of[...l.keys()].sort((c,v)=>c-v)){for(let f in a){let k=a[f],S=o-(k.lastIdx==null?st:k.lastIdx);S>0&&(k.rd=Math.min(Math.sqrt(k.rd*k.rd+C.growth*C.growth*S),C.maxRd))}let c={},v="";for(let f of l.get(o)){let k=f.sa>f.sb?1:f.sa<f.sb?0:.5;(c[f.a]=c[f.a]||[]).push([f.b,k]),(c[f.b]=c[f.b]||[]).push([f.a,1-k]),i(f.a).lastIdx=o,i(f.b).lastIdx=o,f.date>v&&(v=f.date)}let y={};for(let f in c)y[f]=[i(f).r,i(f).rd];for(let f in c){let k=i(f),[S,q]=pt(k.r,k.rd,c[f].map(([E,A])=>[y[E][0],y[E][1],A]));k.r=S,k.rd=q,s(f,S,q,v)}}return xt={peaks:e,series:h},xt}function Xs(){return Ve().peaks}function ta(e){let s=P(e);return(Ve().series[s]||[]).slice()}})();
