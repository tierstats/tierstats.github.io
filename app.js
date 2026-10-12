/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var I=window.LB_DATA,mt="https://tierstats-publish.tierstats.workers.dev/publish",d=(e,s=document)=>s.querySelector(e),j=(e,s=document)=>[...s.querySelectorAll(e)],w=e=>String(e).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),z=e=>encodeURIComponent(String(e)),Ct=e=>decodeURIComponent(e);function kt(e,s,a={}){let i=a.dur||1200,o=a.dec||0,v=performance.now(),g=parseFloat(e.textContent)||0;function c(l){let f=Math.min(1,(l-v)/i),b=1-Math.pow(1-f,3);e.textContent=(g+(s-g)*b).toFixed(o),f<1&&requestAnimationFrame(c)}requestAnimationFrame(c),setTimeout(()=>{e.textContent=s.toFixed(o)},i+300)}var ve='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',pe='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function Lt(e,s=""){let a=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",i=e<=3?e===1?ve:pe:"";return`<div class="rank-badge ${a} ${s}" title="${t("home.rankTip",{n:e})}">${i}<span class="num">${e}</span></div>`}var C=e=>t(e==="W"?"rec.wLetter":e==="L"?"rec.lLetter":"rec.dLetter"),U={},F=[],J={players:[],byName:{},qualified:[]},rt={},ht={},et={},At=new Set,Ft={prevRatings:{},prevRanks:{}};function me(){try{localStorage.removeItem("tt1v1_baseline")}catch{}Ft={prevRatings:{...I.prevRatings||{}},prevRanks:{...I.prevRanks||{}}}}function ue(){for(let a in rt)delete rt[a];let e=new Set(H().aliasRemoved||[]);Object.entries(I.aliases).forEach(([a,i])=>{e.has(a)||(rt[a.toLowerCase()]=i)}),Object.entries(H().aliases||{}).forEach(([a,i])=>{rt[String(a).toLowerCase()]=i});for(let a of Object.keys(ht))delete ht[a];for(let a of Object.keys(et))delete et[a];At.clear();let s=(a,i)=>{Object.keys(a||{}).forEach(o=>{let v=O(o);v!==o&&(i[v]=a[o])}),Object.keys(a||{}).forEach(o=>{let v=O(o);v===o&&(i[v]=a[o])})};s(I.seeds,ht),s(Ft.prevRatings,et),(I.inactiveList||[]).forEach(a=>At.add(O(a)))}var Ot={},Ut=e=>String(e).toLowerCase().replace(/[^a-z0-9]/g,"").replace(/0/g,"o").replace(/1/g,"i").replace(/3/g,"e").replace(/5/g,"s");function fe(e,s){if(Math.abs(e.length-s.length)>3)return 99;let a=Array.from({length:s.length+1},(i,o)=>o);for(let i=1;i<=e.length;i++){let o=[i];for(let v=1;v<=s.length;v++)o[v]=Math.min(a[v]+1,o[v-1]+1,a[v-1]+(e[i-1]===s[v-1]?0:1));if(a=o,Math.min(...a)>3)return 99}return a[s.length]}function he(){let e={},s=new Set(H().aliasRemoved||[]),a=o=>{let v=String(o).trim(),g=O(v);!v||Ut(v)===Ut(g)||fe(v.toLowerCase(),g.toLowerCase())<=2||(e[g]=e[g]||[]).push(v)};Object.keys(I.aliases).forEach(o=>{s.has(o)||a(o)}),Object.keys(H().aliases||{}).forEach(a);for(let o of Object.keys(e)){let v=new Set([o.toLowerCase()]);e[o]=e[o].filter(g=>{let c=g.toLowerCase();return v.has(c)?!1:(v.add(c),!0)}).sort((g,c)=>g.localeCompare(c))}let i=I.cards&&I.cards.alts||{};Object.keys(i).forEach(o=>{let v=O(o),g=i[o];e[v]=(Array.isArray(g)?g:String(g||"").split(/[,;]/)).map(c=>String(c).trim()).filter(Boolean)}),Ot=e}function Vt(e){return Ot[e]||Ot[O(e)]||[]}function ge(e){let s=Vt(e);if(!s.length)return"";let a=s.slice(0,2).join(", ")+(s.length>2?` +${s.length-2}`:"");return`<div class="p-alt" title="${w(s.join(", "))}">${t("lb.aka",{names:w(a)})}</div>`}var O=e=>{let s=String(e).trim(),a=new Set;for(;;){let i=rt[s.toLowerCase()];if(!i||i===s||a.has(s))return s;a.add(s),s=i}};function xt(e){let s=[];return G().forEach(a=>{let i=(o,v,g)=>({opp:o,for_:v,against:g,res:v>g?"W":v<g?"L":"D",date:a.date});a.a===e?s.push(i(a.b,a.sa,a.sb)):a.b===e&&s.push(i(a.a,a.sb,a.sa))}),s}function Kt(e){let s={};return xt(e).forEach(a=>{let i=s[a.opp]||(s[a.opp]={w:0,l:0,d:0,pf:0,pa:0});i[a.res.toLowerCase()]+=1,i.pf+=a.for_,i.pa+=a.against}),Object.entries(s).map(([a,i])=>({opp:a,...i})).sort((a,i)=>i.w+i.l+i.d-(a.w+a.l+a.d)||i.w-a.w)}function be(e){let s=U[e]||{};return s.provisional?`<span class="tag prov">${t("tag.provisional")}</span>`:s.inactive?`<span class="tag inact">${t("tag.inactive")}</span>`:""}function ye(e){let s=xt(e).slice(0,5).reverse();if(!s.length)return"";let a=s.map(i=>C(i.res)).join(" ");return`<span class="form" title="${t("form.title",{n:s.length,seq:a})}">${s.map(i=>`<i class="${i.res.toLowerCase()}">${C(i.res)}</i>`).join("")}</span>`}function Qt(){let e=typeof getLang=="function"?getLang():"en";return{en:"en-US",zh:"zh-CN",ja:"ja-JP",ru:"ru-RU"}[e]||"en-US"}function Zt(e){let s=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||"").slice(0,10));return s?new Date(+s[1],+s[2]-1,+s[3]):null}function tt(e){let s=Zt(e);if(!s)return"";let a=s.getFullYear()===new Date().getFullYear();try{return new Intl.DateTimeFormat(Qt(),a?{month:"short",day:"numeric"}:{year:"numeric",month:"short",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Xt(e){let s=Zt(e);if(!s)return"";try{return new Intl.DateTimeFormat(Qt(),{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function St(e){let s=e.delta!=null?e.delta:0;if(Math.abs(s)<.05)return"";let a=s>0,i=Math.abs(s).toFixed(1);return`<span class="delta ${a?"up":"down"}" title="${a?t("delta.upTitle",{n:i}):t("delta.downTitle",{n:i})}">${a?"\u25B2":"\u25BC"} ${i}</span>`}function we(){let e=Ft.prevRanks||{},s=Object.keys(e);if(s.length){let o={};return s.forEach(v=>{o[O(v)]=e[v]}),o}let a={};F.forEach(o=>{et[o.name]!=null&&(a[o.name]=et[o.name])});let i={};return Object.entries(a).sort((o,v)=>v[1]-o[1]).forEach(([o],v)=>{i[o]=v+1}),i}function $e(e,s){let a=s[e.name]!=null?s[e.name]:s[O(e.name)];if(a==null){let o=(I.newSince||{})[e.name];return!o||(Date.now()-Date.parse(o))/864e5>5?"":`<span class="mv new" title="${t("mv.newTitle")}">${t("mv.new")}</span>`}let i=a-e.rank;return i>0?`<span class="mv up" title="${tp("mv.up",i)}">\u25B2${i}</span>`:i<0?`<span class="mv down" title="${tp("mv.down",-i)}">\u25BC${-i}</span>`:""}function pt(e){return`${Math.round(e.rating-100)} \u2013 ${Math.round(e.rating+100)}`}function wt(e,s){if(!e.provisional)return e.rating.toFixed(1);let a=s?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:pt(e);return`<span class="prov-range" title="${t("rating.provTitle")}">${a}</span>`}var te="tt1v1_admin_log_v1",st="tt1v1_admin_ok",X="tt1v1_admin_pw",ke=()=>sessionStorage.getItem(st)==="1"||localStorage.getItem(st)==="1",ct=()=>sessionStorage.getItem(X)||localStorage.getItem(X)||"";function Le(e,s){s?(localStorage.setItem(st,"1"),localStorage.setItem(X,e)):(sessionStorage.setItem(st,"1"),sessionStorage.setItem(X,e),localStorage.removeItem(st),localStorage.removeItem(X))}function xe(){[sessionStorage,localStorage].forEach(e=>{e.removeItem(st),e.removeItem(X)})}var Gt=null,Nt=!1;function ee(){Nt||!ct()||(clearTimeout(Gt),Gt=setTimeout(()=>publishLog({silent:!0}),1500))}var Se=mt.replace(/\/publish$/,"/verify"),Me=mt.replace(/\/publish$/,"/sync");function Q(){try{return JSON.parse(localStorage.getItem(te)||"[]")}catch{return[]}}function it(e){try{localStorage.setItem(te,JSON.stringify(e))}catch{}ee()}var se="tt1v1_admin_over_v1";function B(){try{return JSON.parse(localStorage.getItem(se)||"{}")||{}}catch{return{}}}function _(e){try{localStorage.setItem(se,JSON.stringify(e))}catch{}ee()}function H(){let e=window.LB_PUB||{},s=B(),a=new Set([...e.aliasRemoved||[],...s.aliasRemoved||[]]),i=new Set([...e.seedRemoved||[],...s.seedRemoved||[]]),o=s.aliases||{},v={...s.seeds||{},...s.seedGlicko||{},...s.seedRd||{}},g=x=>Object.fromEntries(Object.entries(x||{}).filter(([r])=>!a.has(r)||o[r]!=null)),c=x=>Object.fromEntries(Object.entries(x||{}).filter(([r])=>!i.has(r)||v[r]!=null)),l=g({...e.aliases||{},...s.aliases||{}}),f=g({...e.aliasNotes||{},...s.aliasNotes||{}}),b=c({...e.seeds||{},...s.seeds||{}}),u=c({...e.seedGlicko||{},...s.seedGlicko||{}}),$=c({...e.seedRd||{},...s.seedRd||{}});return{aliases:l,aliasNotes:f,seeds:b,seedGlicko:u,seedRd:$,aliasRemoved:[...a].filter(x=>l[x]==null),seedRemoved:[...i].filter(x=>b[x]==null&&u[x]==null&&$[x]==null),settings:{...e.settings||{},...s.settings||{}},matchEdits:{...e.matchEdits||{},...s.matchEdits||{}},inactive:s.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...s.matchRemoved||[]])],faq:s.faq!=null?s.faq:e.faq!=null?e.faq:null}}function ae(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function G(){let e=H(),s=e.matchEdits||{},a=new Set(e.matchRemoved||[]),i=(u,$)=>{if(a.has($))return null;let x=s[$],r=x?{...u,sa:x.sa,sb:x.sb,date:x.date!=null?x.date:u.date}:u;return{...r,a:O(r.a),b:O(r.b),sa:+r.sa,sb:+r.sb,key:$}},o=Q().map((u,$)=>i({...u,admin:!0,published:!1},"l:"+$)).filter(Boolean),v=ae().map((u,$)=>i({...u,admin:!0,published:!0},"p:"+$)).filter(Boolean),g=I.matches.map((u,$)=>i({...u,admin:!1,published:!1},"a:"+$)).filter(Boolean).reverse(),c=u=>{let $=u.a>u.b;return[$?u.b:u.a,$?u.a:u.b,$?u.sb:u.sa,$?u.sa:u.sb,u.date||""].join("|")},l={};g.forEach(u=>{let $=c(u);l[$]=(l[$]||0)+1});let f={};return o.concat(v).filter(u=>{let $=c(u);return f[$]=(f[$]||0)+1,f[$]>(l[$]||0)}).concat(g)}var q={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},gt=864e5,vt=Math.log(10)/400,ne=e=>1/Math.sqrt(1+3*vt*vt*e*e/(Math.PI*Math.PI)),jt=(e,s,a)=>1/(1+Math.pow(10,-ne(a)*(e-s)/400));function Ee(e){let s=H().seeds||{};return s[e]!=null&&s[e]!==""?Number(s[e]):ht[e]}function ie(e){let s=(H().seedGlicko||{})[e],a=(H().seedRd||{})[e],i=s!=null&&s!==""?Number(s):null,o=a!=null&&a!==""?Number(a):null;if(i!=null||o!=null)return[i??q.unratedR,o??q.unratedRd];let v=Ee(e);return v!=null?[Math.max(q.seedMid+(v-q.oldMid)*q.ptsPer,q.minSeed),q.knownRd]:[q.unratedR,q.unratedRd]}function $t(e,s,a){let i=0,o=0;for(let[g,c,l]of a){let f=ne(c),b=jt(e,g,c);i+=f*f*b*(1-b),o+=f*(l-b)}if(i*=vt*vt,i<=0)return[e,s];let v=1/(s*s)+i;return[e+vt/v*o,Math.sqrt(1/v)]}function Te(e,s){let a=Math.pow(10,s),i=e*a,o=Math.floor(i);return Math.abs(i-o-.5)<1e-6?(o+1)/a:Math.round(i)/a}var Mt=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(q.periodDays*gt)),V=Mt(q.graceStart),Re={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function _t(){let e=H().settings||{};return(I.settings||[]).map(s=>({...s,value:Object.prototype.hasOwnProperty.call(e,s.name)?e[s.name]:s.value}))}function qe(){for(let e of _t()){let s=Re[e.name];if(!s)continue;if(s==="graceStart"){let i=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(i)&&(q.graceStart=i);continue}let a=Number(e.value);Number.isFinite(a)&&(q[s]=a)}V=Mt(q.graceStart),j(".cons-val").forEach(e=>{e.textContent=String(q.conservative)}),j(".min-matches-val").forEach(e=>{e.textContent=String(q.minMatches)}),j(".min-opp-val").forEach(e=>{e.textContent=String(q.minOpp)})}function Ce(){qe(),ue(),he();let e={},s=n=>{if(!e[n]){let[p,L]=ie(n);e[n]={name:n,r:p,rd:L,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[n]},a=(n,p,L,S,k,R)=>{let A=s(n);A.games++,A.opps.add(p),L>S?A.w++:L<S?A.l++:A.d++,A.lastIdx=R,k&&(A.lastDate=k)},i={};for(let n of G()){if(n.date)continue;let p=O(n.a),L=O(n.b),S=n.sa>n.sb?1:n.sa<n.sb?0:.5;(i[p]=i[p]||[]).push([L,S]),(i[L]=i[L]||[]).push([p,1-S]),a(p,L,n.sa,n.sb,"",V),a(L,p,n.sb,n.sa,"",V)}let o={};for(let n in i)o[n]=[s(n).r,s(n).rd];for(let n in i){let[p,L]=$t(o[n][0],o[n][1],i[n].map(([S,k])=>[o[S][0],o[S][1],k]));s(n).r=p,s(n).rd=L}let v=new Map;for(let n of G().filter(p=>p.date).slice().reverse()){let p=n.date,L=Mt(p);v.has(L)||v.set(L,[]),v.get(L).push({a:O(n.a),b:O(n.b),sa:+n.sa,sb:+n.sb,date:p})}for(let n of[...v.keys()].sort((p,L)=>p-L)){for(let S in e){let k=e[S],R=n-(k.lastIdx==null?V:k.lastIdx);R>0&&(k.rd=Math.min(Math.sqrt(k.rd*k.rd+q.growth*q.growth*R),q.maxRd))}let p={};for(let S of v.get(n)){let k=S.sa>S.sb?1:S.sa<S.sb?0:.5;(p[S.a]=p[S.a]||[]).push([S.b,k]),(p[S.b]=p[S.b]||[]).push([S.a,1-k]),a(S.a,S.b,S.sa,S.sb,S.date,n),a(S.b,S.a,S.sb,S.sa,S.date,n)}let L={};for(let S in p)L[S]=[s(S).r,s(S).rd];for(let S in p){let[k,R]=$t(L[S][0],L[S][1],p[S].map(([A,W])=>[L[A][0],L[A][1],W]));s(S).r=k,s(S).rd=R}}let g=Object.values(e).map(n=>({name:n.name,glicko:n.r,rd:n.rd,rating:n.r-q.conservative*n.rd,matches:n.games,w:n.w,l:n.l,d:n.d,winPct:n.games?Te(n.w/n.games*100,1):0,opponents:n.opps.size,avgOpp:0,lastMatch:n.lastDate||"",provisional:!(n.games>=q.minMatches&&n.opps.size>=q.minOpp),inactive:!1})),c={};g.forEach(n=>{c[n.name]=n.glicko}),g.forEach(n=>{let p=0;e[n.name].opps.forEach(L=>{p+=c[L]!=null?c[L]:q.unratedR}),n.avgOpp=e[n.name].opps.size?p/e[n.name].opps.size:0});let l=Date.now(),f=Math.floor(l/(q.periodDays*gt));for(let n in e){let p=e[n],L=f-(p.lastIdx==null?V:p.lastIdx);L>0&&(p.rd=Math.min(Math.sqrt(p.rd*p.rd+q.growth*q.growth*L),q.maxRd))}g.forEach(n=>{n.glicko=e[n.name].r,n.rd=e[n.name].rd,n.rating=n.glicko-q.conservative*n.rd;let p=et[n.name],L=(I.curRatings||{})[n.name];n.delta=p!=null?(L??n.rating)-p:0});let b=Date.parse(q.graceStart+"T00:00:00Z")+q.graceDays*gt,u=new Set([...At,...H().inactive||[]]);g.forEach(n=>{n.inactive=u.has(n.name)||(n.lastMatch?l-Date.parse(n.lastMatch+"T00:00:00Z")>q.inactiveDays*gt:l>b)});let $={},x={};(I.players||[]).forEach((n,p)=>{let L=O(n.name);$[L]=n,x[L]=p});let r={};g.forEach(n=>{r[n.name]=n}),g.forEach(n=>{let p=$[n.name];p&&(n.rating=p.rating,n.glicko=p.glicko,n.rd=p.rd,n.matches=p.matches,n.w=p.w,n.l=p.l,n.d=p.d,n.winPct=p.winPct,n.opponents=p.opponents,n.avgOpp=p.avgOpp,p.lastMatch&&(n.lastMatch=p.lastMatch))});let m=[];(I.qualified||[]).forEach(n=>{let p=r[O(n.name)];p&&(p.provisional=!1,p.rank=n.rank!=null?n.rank:m.length+1,m.push(p))});let y=new Set(m.map(n=>n.name)),h=g.filter(n=>!y.has(n.name)&&!$[n.name]&&!$[O(n.name)]&&!n.provisional&&!n.inactive).sort((n,p)=>p.rating-n.rating);h.forEach((n,p)=>{n.rank=m.length+p+1});let M=m.concat(h);g.sort((n,p)=>p.rating-n.rating||(x[n.name]!=null?x[n.name]:1e9)-(x[p.name]!=null?x[p.name]:1e9));let T={};return g.forEach(n=>{T[n.name]=n}),{players:g,byName:T,qualified:M}}function P(){me(),J=Ce(),U=J.byName,F=J.qualified}var Ae=["page-home","page-player","page-compare","page-matches","page-cards","page-roster","page-analytics","page-method","page-faq","page-admin"];function Et(){if(Pt){Pt=!1;return}let e=location.hash||"#/";Ae.forEach(o=>d("#"+o).classList.remove("active"));let s="#/"+(e.split("/")[1]||"");j(".nav a, .foot-nav a").forEach(o=>{let v=o.getAttribute("href");o.classList.toggle("active",v===s||e==="#/"&&v==="#/")});let a=d("#nav-glide"),i=document.querySelector(".nav a.active");if(a&&i&&i.offsetWidth>0?(a.style.width=i.offsetWidth+"px",a.style.transform=`translateX(${i.offsetLeft}px)`,a.style.opacity="1"):a&&(a.style.opacity="0"),e==="#/compare"||e.startsWith("#/compare/")){let o=e.split("/").slice(2).map(Ct);le(o[0]||"",o[1]||""),d("#page-compare").classList.add("active"),window.scrollTo(0,0)}else if(e.startsWith("#/player/"))_e(Ct(e.slice(9))),d("#page-player").classList.add("active"),window.scrollTo({top:0,behavior:"instant"in window?"instant":"auto"});else if(e==="#/matches")Be(),d("#page-matches").classList.add("active"),window.scrollTo(0,0);else if(e==="#/cards")typeof renderCards=="function"&&renderCards(),d("#page-cards").classList.add("active"),window.scrollTo(0,0);else if(e.startsWith("#/card/")){typeof renderCards=="function"&&renderCards(),d("#page-cards").classList.add("active"),window.scrollTo(0,0);let o=Ct(e.slice(7));requestAnimationFrame(()=>{typeof window.cardsFocus=="function"&&window.cardsFocus(o)})}else e==="#/roster"?(De(),d("#page-roster").classList.add("active"),window.scrollTo(0,0)):e==="#/analytics"?(He(),d("#page-analytics").classList.add("active"),window.scrollTo(0,0)):e==="#/method"?(Ue(),d("#page-method").classList.add("active"),window.scrollTo(0,0)):e==="#/faq"?(ze(),d("#page-faq").classList.add("active"),window.scrollTo(0,0)):e==="#/admin"?(D(),d("#page-admin").classList.add("active"),window.scrollTo(0,0)):(Bt(),d("#page-home").classList.add("active"),requestAnimationFrame(Pe));Rt()}window.addEventListener("hashchange",Et);function Bt(){K="all",N={key:"rank",dir:1},j(".chip[data-filter]").forEach(c=>c.classList.toggle("on",c.dataset.filter==="all")),Dt();let e=G().length,s=J.players.length,a=F[0],i=Math.round(F.reduce((c,l)=>c+l.rd,0)/F.length),o=d("#hero-chip-matches");o&&(o.innerHTML=t("home.chipMatches",{n:e})),d("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">${t("stat.ranked")}</div>
      <div class="v"><span class="cu" data-target="${F.length}">0</span><small>${t("stat.ofTotal",{n:s})}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.matches")}</div>
      <div class="v"><span class="cu" data-target="${e}">0</span></div></div>
    <div class="stat-card"><div class="k">${t("stat.highest")}</div>
      <div class="v"><span class="cu" data-target="${a.rating}" data-dec="1">0</span><small>${w(a.name)}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.avgRd")}</div>
      <div class="v"><span class="cu" data-target="${i}" data-dec="1">0</span><small>${t("stat.certainty")}</small></div></div>`;let v=[F[1],F[0],F[2]].filter(Boolean);d("#fl-cards").innerHTML=v.map(c=>`
    <div class="fl-card r${c.rank}${c.rank===1?" champ":""} reveal" data-goto="${w(c.name)}">
      <div class="fl-top">
        ${Lt(c.rank)}
        <div class="rd">RD ${c.rd.toFixed(0)}</div>
      </div>
      ${c.rank===1?`<div class="champ-tag">${t("home.champTag")}</div>`:""}
      <div class="nm">${w(c.name)}</div>
      <div class="rating">
        <span class="unit">${t("home.ratingUnit")}</span>
        <div class="big-row"><span class="big">${Math.round(c.rating)}</span>${St(c)}</div>
      </div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${c.winPct>=60?"":c.winPct>=40?"mid":"low"}" data-w="${c.winPct}"></div></div>
      </div>
      <div class="meta">
        <span><span class="w">${c.w}${C("W")}</span> <span class="l">${c.l}${C("L")}</span> ${c.d}${C("D")}</span>
        <span class="wc">${c.winPct.toFixed(1)}%</span>
        <span class="opp">${t("home.avgOpp",{n:c.avgOpp.toFixed(1)})}</span>
      </div>
    </div>`).join(""),requestAnimationFrame(()=>{j("#fl-cards .bar-fill").forEach(c=>{c.style.width=c.dataset.w+"%"})}),at(),oe();let g=d("#last-updated");g&&(g.textContent=t("home.lastUpdated",{when:tt(I.generated)||"today"}))}function oe(){let e=G().filter(s=>s.date).slice(0,10);d("#battles-grid").innerHTML=e.length?e.map(s=>{let a=s.sa>s.sb,i=s.sb>s.sa;return`
    <div class="battle-row reveal" data-goto="${w(a?s.a:s.b)}">
      <div class="who ${a?"win":"lose"}" data-goto="${w(s.a)}">${w(s.a)}</div>
      <div class="vs">${t("vs")}</div>
      <div class="who r ${i?"win":"lose"}" data-goto="${w(s.b)}">${w(s.b)}</div>
      <div class="sc mono"><span class="${a?"win":"lose"}">${s.sa}</span> \u2013 <span class="${i?"win":"lose"}">${s.sb}</span></div>
      <div class="dt">${tt(s.date)||(s.admin&&!s.published?t("battles.justNow"):t("misc.historical"))}</div>
    </div>`}).join(""):`<div class="empty" style="padding:26px;text-align:center;color:var(--dim);grid-column:1/-1">${t("battles.empty")}</div>`}var Oe=500,Ne="cubic-bezier(.22,.8,.24,1)",je=12;function Ie(e,s){matchMedia("(prefers-reduced-motion: reduce)").matches||j(".lb-row",e).forEach((a,i)=>{let o=s.get(a.dataset.name);if(o===void 0||typeof a.animate!="function")return;let v=o-a.getBoundingClientRect().top;Math.abs(v)<=1||a.animate([{transform:`translateY(${v}px)`},{transform:"none"}],{duration:Oe,easing:Ne,delay:Math.min(i*je,220),fill:"backwards"})})}function at(e="all",s="rank",a=1){let i=d("#lb-body"),v=(e==="all"&&bt?F:J.players).slice().map(l=>({...l,rank:l.rank!=null?l.rank:9999}));It&&(v=v.filter(l=>l.name.toLowerCase().includes(It))),e==="provisional"?v=v.filter(l=>(U[l.name]||{}).provisional):e==="inactive"?v=v.filter(l=>(U[l.name]||{}).inactive):e==="veterans"?v=v.filter(l=>l.matches>=15):e==="rising"&&(v=v.filter(l=>l.winPct>=60&&l.matches>=5)),v.sort((l,f)=>{let b=l[s],u=f[s];return(typeof b=="string"?b.localeCompare(u):b-u)*a});let g=new Map;j(".lb-row",i).forEach(l=>g.set(l.dataset.name,l.getBoundingClientRect().top));let c=we();i.innerHTML=v.map(l=>`
    <div class="lb-row ${l.rank<=3?"top"+l.rank:""}" data-name="${w(l.name)}" data-goto="${w(l.name)}">
      <div class="rank">${l.rank<=F.length?Lt(l.rank,"sm")+$e(l,c):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="name-stack"><div class="pname">${w(l.name)}</div></div>${typeof cardsRowChip=="function"?cardsRowChip(l.name):""}</div>
      <div class="rating-cell mono">${St(l)}${wt(l,!0)}</div>
      <div class="num-cell mono col-hide">${l.rd.toFixed(1)}</div>
      <div class="num-cell mono col-hide">${l.matches}</div>
      <div class="num-cell mono col-hide"><span class="w">${l.w}</span></div>
      <div class="num-cell mono col-hide"><span class="l">${l.l}</span></div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${l.winPct>=60?"":l.winPct>=40?"mid":"low"}" data-w="${l.winPct}"></div></div>
        <div class="pct mono">${l.winPct.toFixed(1)}%</div>
      </div>
      <div class="num-cell mono col-hide">${l.opponents}</div>
      <div class="num-cell mono col-hide">${l.avgOpp.toFixed(1)}</div>
      <div class="col-status">${be(l.name)||ye(l.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?t("lb.emptyInactive"):e==="provisional"?t("lb.emptyProv"):t("lb.emptyNone")}</div>`,Ie(i,g),requestAnimationFrame(()=>{j(".bar-fill",i).forEach(l=>{l.style.width=l.dataset.w+"%"})})}var K="all",N={key:"rank",dir:1},It="",bt=!0;function Dt(){j(".sortable").forEach(s=>s.classList.remove("sorted","asc"));let e=d(`.sortable[data-key="${N.key}"]`);e&&(e.classList.add("sorted"),N.dir===1&&e.classList.add("asc"))}function Pe(){j("#stat-strip .cu").forEach(e=>kt(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),j(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}d("#lb-qual").addEventListener("click",()=>{bt=!bt,d("#lb-qual").classList.toggle("on",bt),at(K,N.key,N.dir)});d("#lb-filter").addEventListener("input",e=>{It=e.target.value.trim().toLowerCase(),at(K,N.key,N.dir)});var dt=d("#theme-toggle");function Ht(){if(!dt)return;let e=document.documentElement.dataset.theme==="light",s=e?t("top.toDark"):t("top.toLight");dt.setAttribute("aria-pressed",String(e)),dt.setAttribute("aria-label",s),dt.title=s}dt.addEventListener("click",()=>{let s=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=s;try{localStorage.setItem("tt1v1_theme",s)}catch{}Ht()});Ht();document.addEventListener("click",e=>{let s=e.target.closest(".chip");if(s&&s.dataset.filter){j(".chip[data-filter]").forEach(o=>o.classList.remove("on")),s.classList.add("on"),K=s.dataset.filter,at(K,N.key,N.dir);return}let a=e.target.closest(".sortable");if(a){let o=a.dataset.key;N.key===o&&N.dir===-1?N={key:"rank",dir:1}:N.key===o?N={key:o,dir:-N.dir}:N={key:o,dir:1},Dt(),at(K,N.key,N.dir);return}let i=e.target.closest("[data-goto]");i&&(e.stopPropagation(),location.hash="#/player/"+z(i.dataset.goto))});function Fe(e){let s=e.slice();for(let a=s.length-1;a>0;a--){let i=Math.floor(Math.random()*(a+1));[s[a],s[i]]=[s[i],s[a]]}return s}function Wt(e,s){let a=document.getElementById(e);if(!a)return;let i=a.querySelector(".pick-btn"),o=a.querySelector(".pick-search"),v=[...a.querySelectorAll(".pick-opt")],g=a.querySelector(".pick-empty"),c=-1,l=()=>v.filter(x=>!x.classList.contains("hide")),f=x=>{let r=l();if(!r.length){c=-1;return}c=(x%r.length+r.length)%r.length,v.forEach(m=>m.classList.remove("hover")),r[c].classList.add("hover"),r[c].scrollIntoView({block:"nearest"})},b=x=>{let r=x.trim().toLowerCase(),m=0;v.forEach(y=>{let h=!r||y.dataset.name.toLowerCase().includes(r);y.classList.toggle("hide",!h),h&&m++}),g.classList.toggle("show",m===0),c=-1,m&&f(0)},u=()=>{document.querySelectorAll(".pick.open").forEach(x=>{if(x!==a){x.classList.remove("open");let r=x.querySelector(".pick-btn");r&&r.setAttribute("aria-expanded","false")}}),a.classList.add("open"),i.setAttribute("aria-expanded","true"),o.value="",b(""),requestAnimationFrame(()=>o.focus())},$=()=>{a.classList.remove("open"),i.setAttribute("aria-expanded","false")};i.addEventListener("click",()=>{a.classList.contains("open")?$():u()}),o.addEventListener("input",()=>b(o.value)),o.addEventListener("keydown",x=>{if(x.key==="ArrowDown")x.preventDefault(),f(c+1);else if(x.key==="ArrowUp")x.preventDefault(),f(c-1);else if(x.key==="Enter"){x.preventDefault();let r=l();r[c]&&r[c].click()}else x.key==="Escape"&&($(),i.focus())}),v.forEach(x=>{x.addEventListener("click",()=>{a.dataset.value=x.dataset.name,a.querySelector(".pick-cur").textContent=x.dataset.name,$(),s()}),x.addEventListener("mousemove",()=>{let r=l().indexOf(x);r>=0&&r!==c&&(c=r,v.forEach(m=>m.classList.remove("hover")),x.classList.add("hover"))})})}document.addEventListener("click",e=>{document.querySelectorAll(".pick.open").forEach(s=>{if(!s.contains(e.target)){s.classList.remove("open");let a=s.querySelector(".pick-btn");a&&a.setAttribute("aria-expanded","false")}})});function le(e,s){let a=d("#cmp-wrap"),o=J.players.slice().sort((k,R)=>(k.rank!=null?k.rank:9999)-(R.rank!=null?R.rank:9999)||k.name.localeCompare(R.name)).map(k=>k.name);if(o.length<2){a.innerHTML=`<div class="empty">${t("cmp.notEnough")}</div>`;return}let v=k=>k[Math.floor(Math.random()*k.length)],g=k=>v(o.filter(R=>R!==k)),c=U[e]?e:v(o),l=U[s]?s:g(c);l===c&&(l=g(c)),(c!==e||l!==s)&&history.replaceState(null,"","#/compare/"+z(c)+"/"+z(l));let f=U[c],b=U[l],u=F.find(k=>k.name===c),$=F.find(k=>k.name===l),x=jt(f.glicko,b.glicko,b.rd),r=jt(b.glicko,f.glicko,f.rd),m=Math.round(x/(x+r)*1e3)/10,y=Math.round(1e3-m*10)/10,h=G().filter(k=>k.a===c&&k.b===l||k.a===l&&k.b===c).map(k=>{let R=k.a===c,A=R?k.sa:k.sb,W=R?k.sb:k.sa;return{fa:A,fb:W,res:A>W?"W":A<W?"L":"D",date:k.date}}),M=h.reduce((k,R)=>(R.res==="W"?k.w++:R.res==="L"?k.l++:k.d++,k),{w:0,l:0,d:0}),T=Fe(o),n=(k,R,A)=>`
    <div class="pick" id="${k}" data-value="${w(R)}">
      <button type="button" class="pick-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="${w(A)}">
        <span class="pick-cur">${w(R)}</span>
        <svg class="pick-caret" width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true"><path d="M1.2 1.2 5.5 5.6 9.8 1.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="pick-menu">
        <input class="pick-search" type="text" autocomplete="off" spellcheck="false"
          placeholder="${t("cmp.searchPlaceholder")}" aria-label="${w(A)}">
        <div class="pick-list" role="listbox" aria-label="${w(A)}">
          ${T.map(W=>{let nt=U[W];return`<button type="button" class="pick-opt${W===R?" on":""}" role="option" data-name="${w(W)}" aria-selected="${W===R?"true":"false"}">
              <span class="pick-n">${w(W)}</span>
              <span class="pick-meta mono">${nt&&nt.rating!=null?nt.rating.toFixed(1):""}</span>
            </button>`}).join("")}
          <div class="pick-empty">${t("cmp.noResults")}</div>
        </div>
      </div>
    </div>`,p=(k,R,A,W,nt)=>`
    <div class="cmp-trow">
      <div class="va mono${W?" win":""}">${R}</div>
      <div class="k">${k}</div>
      <div class="vb mono${nt?" win":""}">${A}</div>
    </div>`,L='<span style="color:var(--dimmer)">\u2014</span>';a.innerHTML=`
    <div class="kicker anim">${t("cmp.versus")}</div>
    <h2 class="section-head anim" style="margin:6px 0 2px">${t("cmp.title")}</h2>
    <div class="cmp-pickers anim">
      ${n("cmp-a",c,t("cmp.firstPlayer"))}
      <button class="btn btn-ghost" id="cmp-swap" style="width:auto;margin:0" title="${t("cmp.swap")}">\u21C4</button>
      ${n("cmp-b",l,t("cmp.secondPlayer"))}
    </div>
    <div class="cmp-share anim">
      <button class="btn btn-ghost" id="cmp-copy" style="width:auto;margin:0">${t("cmp.copyLink")}</button>
      <span class="caption" id="cmp-copy-msg"></span>
    </div>

    <div class="cmp-hero anim">
      <div class="cmp-side a">
        <div class="cmp-sub">${u?t("cmp.rankN",{n:u.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${z(c)}">${w(c)}</a></div>
        <div class="cmp-rating mono">${f.provisional?pt(f):f.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",f.matches,{rd:f.rd.toFixed(1)})}</div>
      </div>
      <div class="cmp-vs">
        <div class="vs-mark">${t("cmp.vsMark")}</div>
        <div class="mono" style="font-size:11px;color:var(--dimmer)">${t("cmp.h2hShort",{n:h.length})}</div>
      </div>
      <div class="cmp-side b">
        <div class="cmp-sub">${$?t("cmp.rankN",{n:$.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${z(l)}">${w(l)}</a></div>
        <div class="cmp-rating mono">${b.provisional?pt(b):b.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",b.matches,{rd:b.rd.toFixed(1)})}</div>
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.probTitle")} <span class="n">${t("cmp.probSub")}</span></h3>
      <div class="cmp-prob-labels">
        <span style="color:var(--gold)">${w(c)} ${m.toFixed(1)}%</span>
        <span style="color:var(--blue)">${y.toFixed(1)}% ${w(l)}</span>
      </div>
      <div class="cmp-probbar"><i class="pa" style="width:${m}%"></i><i class="pb" style="width:${y}%"></i></div>
      <div class="cmp-prob-note">${t("cmp.probNote")}</div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.tale")}</h3>
      <div class="cmp-table">
        ${p(t("cmp.rating"),wt(f),wt(b),!f.provisional&&f.rating>b.rating,!b.provisional&&b.rating>f.rating)}
        ${p(t("cmp.rank"),u?"#"+u.rank:L,$?"#"+$.rank:L,u&&$&&u.rank<$.rank,u&&$&&$.rank<u.rank)}
        ${p(t("cmp.rdUnc"),f.rd.toFixed(1),b.rd.toFixed(1),f.rd<b.rd,b.rd<f.rd)}
        ${p(t("cmp.glicko"),f.glicko.toFixed(1),b.glicko.toFixed(1),f.glicko>b.glicko,b.glicko>f.glicko)}
        ${p(t("cmp.record"),`<span style="color:var(--green)">${f.w}${C("W")}</span> <span style="color:var(--red)">${f.l}${C("L")}</span> ${f.d}${C("D")}`,`<span style="color:var(--green)">${b.w}${C("W")}</span> <span style="color:var(--red)">${b.l}${C("L")}</span> ${b.d}${C("D")}`,f.winPct>b.winPct,b.winPct>f.winPct)}
        ${p(t("cmp.winRate"),f.winPct+"%",b.winPct+"%",f.winPct>b.winPct,b.winPct>f.winPct)}
        ${p(t("cmp.matchesPlayed"),f.matches,b.matches,!1,!1)}
        ${p(t("cmp.uniqueOpp"),f.opponents,b.opponents,f.opponents>b.opponents,b.opponents>f.opponents)}
        ${p(t("cmp.avgOppRating"),f.avgOpp.toFixed(1),b.avgOpp.toFixed(1),f.avgOpp>b.avgOpp,b.avgOpp>f.avgOpp)}
        ${p(t("cmp.h2h"),`${M.w}${C("W")} \u2013 ${M.l}${C("L")} \u2013 ${M.d}${C("D")}`,`${M.l}${C("W")} \u2013 ${M.w}${C("L")} \u2013 ${M.d}${C("D")}`,M.w>M.l,M.l>M.w)}
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.prevMeetings")} <span class="n">${tp("cmp.meetings",h.length)}</span></h3>
      <div class="match-list">
        ${h.map(k=>`
          <div class="match-row">
            <div class="res-chip ${k.res}">${C(k.res)}</div>
            <div class="who">${w(c)}</div>
            <div class="score mono">${k.fa} \u2013 ${k.fb}</div>
            <div class="who opp"><a href="#/player/${z(l)}" style="color:var(--blue)">${w(l)}</a></div>
            <div class="date mono" title="${Xt(k.date)}">${tt(k.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("cmp.neverMet")}</div>`}
      </div>
      <div class="caption" style="margin-top:12px">${t("cmp.legacyNote")}</div>
    </div>`;let S=()=>{let k=d("#cmp-a").dataset.value,R=d("#cmp-b").dataset.value,A="#/compare/"+z(k)+"/"+z(R);location.hash!==A&&(Pt=!0,location.hash=A),le(k,R)};Wt("cmp-a",S),Wt("cmp-b",S),d("#cmp-swap").addEventListener("click",()=>{let k=d("#cmp-a"),R=d("#cmp-b"),A=k.dataset.value;k.dataset.value=R.dataset.value,R.dataset.value=A,S()}),d("#cmp-copy").addEventListener("click",()=>{let k=location.href.split("#")[0]+"#/compare/"+z(c)+"/"+z(l),R=()=>{d("#cmp-copy-msg").textContent=t("cmp.linkCopied")};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(k).then(R,()=>{d("#cmp-copy-msg").textContent=k}):d("#cmp-copy-msg").textContent=k})}var Pt=!1;function _e(e){let s=U[e],a=d("#page-player");if(!s){a.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("pl.notFound",{name:w(e)})}</div></div></div>`;return}let i=F.find(l=>l.name===e),o=xt(e),v=o.slice(0,10),g=Kt(e),c=Math.max(3,Math.min(100,100-s.rd/120*100));a.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">${t("pl.back")}</a>
    <div class="pv-layout">
    <div class="pv-main">
    <div class="player-hero anim">
      <div class="player-top">
        ${i?Lt(i.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${w(s.name)}</div>
          ${ge(s.name)}
          <button class="pc-share pv-share" data-share="link" data-target="profile" data-name="${w(s.name)}"><svg class="pc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg><span>${t("cards.shareLink")}</span></button>
          <div class="player-rankline">
            ${i?t("pl.rankedOf",{rank:i.rank,total:F.length}):t("pl.unranked")}
            ${s.provisional?` \xB7 <span class="tag prov">${t("tag.provisional")}</span>`:""}
            ${s.inactive?` \xB7 <span class="tag inact">${t("tag.inactive")}</span>`:""}
          </div>
        </div>
        <div class="player-rating-block">
          <div class="lbl">${s.provisional?t("pl.estRange"):t("pl.visible")}</div>
          <div class="big mono${s.provisional?" prov-range":""}" id="pv-rating">${s.provisional?pt(s):"0"}</div>
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
        <div class="pstat"><div class="k">${t("pl.record")}</div><div class="v mono" style="font-size:19px"><span style="color:var(--green)">${s.w}${C("W")}</span> <span style="color:var(--red)">${s.l}${C("L")}</span> <span style="color:var(--dim)">${s.d}${C("D")}</span></div></div>
        <div class="pstat"><div class="k">${t("pl.winRate")}</div><div class="v mono">${s.winPct}%</div></div>
        <div class="pstat"><div class="k">${t("pl.opponents")}</div><div class="v mono">${s.opponents}</div></div>
        <div class="pstat"><div class="k">${t("pl.avgOppRating")}</div><div class="v mono">${s.avgOpp.toFixed(1)}</div></div>
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.recentForm")} <span class="n">${t("pl.lastN",{n:Math.min(10,o.length)})}</span></h3>
      <div class="form-strip">
        ${v.map((l,f)=>`<div class="form-pill ${l.res}" style="animation-delay:${f*55}ms"
           title="${t("pl.vsOpp",{opp:w(l.opp)})} ${l.for_}-${l.against}">${C(l.res)}</div>`).join("")||`<span class="empty">${t("pl.noGames")}</span>`}
      </div>
    </div>
    </div>
    <div class="pv-side">${typeof cardsHeroHTML=="function"?cardsHeroHTML(e):""}</div>
    </div>

    <div class="pv-lower">
    <div class="panel reveal">
      <h3>${t("pl.matchHistory")} <span class="n">${tp("pl.nGames",o.length)}</span></h3>
      <div class="match-list">
        ${o.map(l=>`
          <div class="match-row">
            <div class="res-chip ${l.res}">${C(l.res)}</div>
            <div class="who">${w(s.name)}</div>
            <div class="score mono">${l.for_} \u2013 ${l.against}</div>
            <div class="who opp"><a href="#/player/${z(l.opp)}" style="color:var(--blue)">${w(l.opp)}</a></div>
            <div class="date mono" title="${Xt(l.date)}">${tt(l.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.h2h")} <span class="n">${tp("pl.nOpponents",g.length)}</span></h3>
      <div class="h2h-grid">
        ${g.map(l=>`
          <div class="h2h-card" data-goto="${w(l.opp)}">
            <div class="opp">${w(l.opp)}</div>
            <div class="rec mono"><span class="w">${l.w}${C("W")}</span> \xB7 <span class="l">${l.l}${C("L")}</span> \xB7 <span>${l.d}${C("D")}</span> \xB7 ${t("pl.pts",{pf:l.pf,pa:l.pa})}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>
    </div>
  </div>`,s.provisional||kt(d("#pv-rating"),s.rating,{dec:1,dur:900}),typeof cardsMountAll=="function"&&cardsMountAll(a),Rt()}function Be(){oe();let e=d("#gm-body"),s=G();d("#gm-count").textContent=tp("gm.count",s.length),e.innerHTML=s.map(a=>{let i=a.sa>a.sb,o=a.sb>a.sa;return`
    <div class="gm-row">
      <div class="side ${i?"winner":"loser"}">
        <div class="dot ${i?"w":"l"}"></div>
        <div class="nm" data-goto="${w(a.a)}">${w(a.a)}</div>
      </div>
      <div class="sc mono" style="color:${i?"var(--green)":"var(--red)"}">${a.sa}</div>
      <div class="dash mono">\u2013</div>
      <div class="sc mono" style="color:${o?"var(--green)":"var(--red)"}">${a.sb}</div>
      <div class="side right ${o?"winner":"loser"}">
        <div class="dot ${o?"w":"l"}"></div>
        <div class="nm" data-goto="${w(a.b)}">${w(a.b)}</div>
      </div>
      <div class="dt mono">${a.admin&&!a.published?`<span class="tag fresh">${t("tag.new")}</span>`:tt(a.date)||t("misc.historical")}</div>
    </div>`}).join("")}function De(){let e=J.players.filter(s=>s.provisional).sort((s,a)=>a.rating-s.rating);d("#roster-grid").innerHTML=e.map(s=>{let a=Math.min(100,Math.round(Math.min(1,s.matches/5)*50+Math.min(1,s.opponents/3)*50));return`
    <div class="roster-card reveal" data-goto="${w(s.name)}">
      <div class="top">
        <div class="nm">${w(s.name)}</div>
        <svg class="shield" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"/></svg>
      </div>
      <div class="rating"><span class="unit">${t("roster.estRange")}</span><span class="big prov-range">${pt(s)}</span></div>
      <div class="req-row"><span>${t("roster.matches")}</span><span class="${s.matches>=5?"ok":""}">${s.matches} / 5 ${s.matches>=5?"\u2713":""}</span></div>
      <div class="req-row"><span>${t("roster.opponents")}</span><span class="${s.opponents>=3?"ok":""}">${s.opponents} / 3 ${s.opponents>=3?"\u2713":""}</span></div>
      <div class="prog-track"><div class="prog-fill" data-w="${a}"></div></div>
      <div class="prog-label">${t("roster.progress",{pct:a})}</div>
    </div>`}).join(""),requestAnimationFrame(()=>j("#roster-grid .prog-fill").forEach(s=>{s.style.width=s.dataset.w+"%"}))}function He(){let e=J.players,s=F.slice().sort((n,p)=>p.winPct-n.winPct).slice(0,10),a=e.slice().sort((n,p)=>p.matches-n.matches).slice(0,10),i=[];G().forEach(n=>{let p=U[n.a],L=U[n.b];if(!p||!L)return;let S=p.rating-L.rating;if(n.sa===n.sb)return;let k=n.sa>n.sb?n.a:n.b,R=Math.abs(S);(S<0&&k===n.a||S>0&&k===n.b)&&i.push({winner:k,loser:k===n.a?n.b:n.a,gap:R,score:k===n.a?`${n.sa}-${n.sb}`:`${n.sb}-${n.sa}`})}),i.sort((n,p)=>p.gap-n.gap);let o={};G().forEach(n=>{let p=[n.a,n.b].sort().join(" vs ");o[p]=(o[p]||0)+1});let v=Object.entries(o).sort((n,p)=>p[1]-n[1]).slice(0,10),g=e.map(n=>n.rating),c=Math.min(...g),l=Math.max(...g),f=8,b=(l-c)/f||1,u=Array.from({length:f},()=>0);g.forEach(n=>{u[Math.min(f-1,Math.max(0,Math.floor((n-c)/b)))]++});let $=Math.max(...u,1),x=u.map((n,p)=>{let L=Math.round((c+p*b)/10)*10,S=Math.round((c+(p+1)*b)/10)*10;return`
    <div class="hcol" title="${tp("an.histTip",n,{lo:L,hi:S})}">
      <div class="hbar" data-h="${Math.round(n/$*100)}"></div>
      <div class="hlbl">${L}\u2013${S}</div>
    </div>`}).join(""),r=e.slice().sort((n,p)=>p.opponents-n.opponents).slice(0,8),m=Math.max(...r.map(n=>n.opponents),1),y=r.map(n=>`
    <div class="mrow reveal" data-goto="${w(n.name)}">
      <div class="nm">${w(n.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(n.opponents/m*100)}"></div></div>
      <div class="val mono">${n.opponents}</div>
    </div>`).join(""),h=(n,p,L)=>n.map((S,k)=>`
    <div class="an-row reveal" data-goto="${w(S.name)}">
      <div class="idx mono">${k+1}</div>
      <div class="nm">${w(S.name)}</div>
      <div class="val mono">${p(S)}</div>
      <div class="unit mono">${L(S)}</div>
    </div>`).join(""),M=n=>tp("an.nMatches",n.matches);d("#an-grid").innerHTML=`
    <div class="an-panel">
      <div class="head"><h3>${t("an.topWinRate")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${h(s,n=>n.winPct+"%",M)}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.mostActive")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/></svg>
      </div>
      ${h(a,n=>n.matches,n=>t("an.matchesUnit"))}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.biggestUpsets")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${i.length?i.slice(0,8).map((n,p)=>`
        <div class="an-row reveal" data-goto="${w(n.winner)}">
          <div class="idx mono">${p+1}</div>
          <div class="nm">${w(n.winner)} <span style="color:var(--dimmer);font-weight:500">${t("an.def")}</span> ${w(n.loser)}</div>
          <div class="val mono">${n.score}</div>
          <div class="unit mono">${t("an.plusPts",{n:Math.round(n.gap)})}</div>
        </div>`).join(""):`<div class="empty">${t("an.noUpsets")}</div>`}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.rivalries")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${v.map(([n,p],L)=>`
        <div class="an-row reveal">
          <div class="idx mono">${L+1}</div>
          <div class="nm">${n.split(" vs ").map(w).join(` <span style="color:var(--dimmer);font-weight:500">${t("vs")}</span> `)}</div>
          <div class="val mono">${p}</div>
          <div class="unit mono">${t("an.meetingsUnit")}</div>
        </div>`).join("")}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.ratingDist")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 20V10M10 20V4M16 20v-8M2 20h20" stroke-linecap="round"/></svg>
      </div>
      <div class="hist">${x}</div>
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.uniqueOpp")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v5M12 15v5" stroke-linecap="round"/></svg>
      </div>
      ${y}
    </div>`;let T=()=>{j("#an-grid .hbar").forEach(n=>{n.style.height=n.dataset.h+"%"}),j("#an-grid .abar").forEach(n=>{n.style.width=n.dataset.w+"%"})};requestAnimationFrame(T),setTimeout(T,140),Rt()}function Ue(){d("#settings-body").innerHTML=_t().map(e=>`
    <tr><td><b>${w(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${w(e.desc)}</div></td>
        <td class="val">${w(String(e.value))}</td></tr>`).join("")}function Ge(){return Array.from({length:11},(e,s)=>({q:t("faq.q"+(s+1)),a:t("faq.a"+(s+1))}))}function yt(){let e=H().faq;return Array.isArray(e)&&e.length?e:Ge()}function We(){let e=window.cardsTiers;if(!e)return"";let{TIER_KEYS:s,tierOf:a,tierIdx:i,tierMin:o,tierLabel:v,crestSVG:g}=e,c={};s.forEach(b=>{c[b]=0}),(J.players||[]).forEach(b=>{b&&b.rating!=null&&(c[a(b.rating)]+=1)});let l=s.reduce((b,u)=>b+c[u],0),f=s.slice().reverse().map(b=>{let u=i(b),$=o(b),x=s[u+1]!=null?o(s[u+1]):null,r=u===0?`&lt; ${Math.round(x)}`:x!=null?`${Math.round($)}\u2013${Math.round(x)-1}`:`${Math.round($)}+`,m=l?c[b]/l*100:0;return`
      <tr class="tier-${b}">
        <td class="fd-badge"><span class="fd-badge-in">${g(b)}<span class="fd-name">${v(b)}</span></span></td>
        <td class="fd-range mono">${r}</td>
        <td class="fd-count"><b class="mono">${c[b]}</b><i style="width:${m.toFixed(1)}%"></i></td>
      </tr>`}).join("");return`
    <p class="fd-note">${t("faq.distNote")}</p>
    <table class="fd-table">
      <thead><tr><th>${t("faq.distBadge")}</th><th>${t("faq.distRange")}</th><th>${t("faq.distPlayers")}</th></tr></thead>
      <tbody>${f}</tbody>
    </table>`}function ze(){let e='<svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',s=(a,i,o)=>`
    <div class="faq-item reveal" data-faq="${o}">
      <button class="faq-q" aria-expanded="false">
        <span>${a}</span>
        ${e}
      </button>
      <div class="faq-a"><div class="faq-a-in">${i}</div></div>
    </div>`;d("#faq-list").innerHTML=s(w(t("faq.distTitle")),We(),"dist")+yt().map((a,i)=>s(w(String(a.q||"")),w(String(a.a||"")),i)).join(""),Rt()}document.addEventListener("click",e=>{let s=e.target.closest(".faq-q");if(!s)return;let a=s.closest(".faq-item"),i=a.classList.contains("open");j(".faq-item.open").forEach(o=>{o.classList.remove("open"),o.querySelector(".faq-q").setAttribute("aria-expanded","false")}),i||(a.classList.add("open"),s.setAttribute("aria-expanded","true"))});function D(){let e=d("#admin-wrap");if(!ke()){e.innerHTML=`
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
    </div>`;let r=async()=>{let m=d("#admin-pw").value;try{let y=await fetch(Se,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:m})});if(y.ok){let h=await y.json().catch(()=>({}));Le(h.token||m,d("#admin-remember").checked),D(),E("Welcome back, commander.");return}if(y.status===429){E("Too many attempts \u2014 wait a few minutes.");return}}catch{}d("#admin-pw").style.borderColor="var(--red)",E("Wrong password.")};d("#admin-auth").addEventListener("click",r),d("#admin-pw").addEventListener("keydown",m=>{m.key==="Enter"&&r()});return}let a=Q(),i=ae().length,o=H(),v='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',g=Object.entries(o.aliases).map(([r,m])=>`
    <div class="log-item">
      <div class="txt"><b>${w(r)}</b> \u2192 <b>${w(m)}</b>${o.aliasNotes&&o.aliasNotes[r]?` <span style="color:var(--dimmer)">\u2014 ${w(o.aliasNotes[r])}</span>`:""}</div>
      <button class="icon-btn" data-alias-del="${w(r)}" title="Remove name fix">${v}</button>
    </div>`).join("")||'<div class="empty">No name fixes yet.</div>',c=o.inactive.map(r=>`
    <div class="log-item">
      <div class="txt"><b>${w(r)}</b> <span style="color:var(--dimmer)">\u2014 inactive</span></div>
      <button class="icon-btn" data-inact-del="${w(r)}" title="Mark active again">${v}</button>
    </div>`).join("")||'<div class="empty">Nobody marked inactive.</div>',l=Object.keys({...o.seeds||{},...o.seedGlicko||{},...o.seedRd||{}}).map(r=>`
    <div class="log-item">
      <div class="txt"><b>${w(r)}</b> \xB7 <span style="color:var(--dimmer)">old</span> <b class="mono">${w(String((o.seeds||{})[r]!=null?(o.seeds||{})[r]:"\u2014"))}</b>${(o.seedGlicko||{})[r]!=null?` \xB7 <span style="color:var(--dimmer)">glicko</span> <b class="mono">${w(String(o.seedGlicko[r]))}</b>`:""}${(o.seedRd||{})[r]!=null?` \xB7 <span style="color:var(--dimmer)">rd</span> <b class="mono">${w(String(o.seedRd[r]))}</b>`:""}</div>
      <button class="icon-btn" data-seed-del="${w(r)}" title="Remove seed">${v}</button>
    </div>`).join("")||'<div class="empty">No seed overrides \u2014 players start from the sheet values.</div>',f=_t().map(r=>`
    <div class="set-row">
      <div class="lbl"><b>${w(r.name)}</b><div class="d">${w(String(r.desc||""))}</div></div>
      <input class="set-val mono" data-set-name="${w(r.name)}" value="${w(String(r.value))}">
    </div>`).join(""),b=r=>{let m=(r||"").trim().toLowerCase();return G().filter(h=>!m||h.a.toLowerCase().includes(m)||h.b.toLowerCase().includes(m)).slice(0,20).map(h=>`
      <div class="log-item fix-row" data-mkey="${h.key}">
        <div class="txt"><b>${w(h.a)}</b> <span style="color:var(--dimmer)">vs</span> <b>${w(h.b)}</b>${h.date?"":' <span class="tag legacy">legacy</span>'}</div>
        <input class="mono" data-f="sa" type="number" min="0" value="${h.sa}" title="Score 1">
        <input class="mono" data-f="sb" type="number" min="0" value="${h.sb}" title="Score 2">
        <input data-f="date" type="date" value="${h.date||""}" title="Match date">
        <button class="icon-btn" data-msave="${h.key}" title="Save fix"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-mdel="${h.key}" title="Delete match">${v}</button>
      </div>`).join("")||'<div class="empty">No matches found.</div>'};e.innerHTML=`
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

  <div class="admin-grid anim">
    <div class="panel" style="margin:0">
      <h3>Log a <span class="n">match</span></h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Player 1</label>
          <input id="adm-a" list="player-list" placeholder="e.g. Kobi" autocomplete="off">
        </div>
        <div class="form-field">
          <label>Player 2</label>
          <input id="adm-b" list="player-list" placeholder="e.g. Slayer" autocomplete="off">
        </div>
        <div class="form-field">
          <label>Score 1</label>
          <input id="adm-sa" type="number" min="0" placeholder="15">
        </div>
        <div class="form-field">
          <label>Score 2</label>
          <input id="adm-sb" type="number" min="0" placeholder="12">
        </div>
        <div class="form-field full">
          <label>Match date</label>
          <input id="adm-date" type="date">
        </div>
        <div class="form-field full">
          <button class="btn btn-primary" id="adm-add" style="margin-top:6px">+) Add to log</button>
        </div>
      </div>
      <div class="form-note" style="margin-top:14px">
        Logged matches feed the same Dynamic Glicko engine as the official sheet \u2014
        ratings, ranks, records and head-to-heads recalculate instantly here.
        Hit <b style="color:var(--gold)">Publish to everyone</b> to push the log to
        the site so every visitor sees it \u2014 one click, no tokens needed.
        Use <b>Customize everything</b>
        below to fix names, dates, seeds, settings or any past match.
      </div>
    </div>

    <div class="panel" style="margin:0">
      <h3>Pending <span class="n">log</span> \u2014 ${a.length} local \xB7 ${i} published</h3>
      <div class="log-list" id="adm-list">
        ${a.length?a.map((r,m)=>`
          <div class="log-item">
            <div class="txt"><b>${w(r.a)}</b> ${r.sa}\u2013${r.sb} <b>${w(r.b)}</b></div>
            <div class="txt" style="color:var(--dimmer)">${w(r.date||"")}</div>
            <button class="icon-btn" data-del="${m}" title="Remove">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>`).join(""):'<div class="empty">Nothing pending \u2014 the log is clean.</div>'}
      </div>
    </div>
  </div>

  <div class="admin-bar anim" style="margin-top:22px">
    <div class="title"><span>\u25CF</span> Customize everything</div>
    <div class="spacer"></div>
    <div class="form-note" style="margin:0">Everything the master sheet can do \u2014 names, inactive, seeds, settings, match fixes & dates. Changes apply live here; <b style="color:var(--gold)">Publish to everyone</b> makes them public.</div>
  </div>

  <div class="admin-grid anim">
    <div class="panel" style="margin:0">
      <h3>Fix <span class="n">names</span> & merge players</h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Name as written</label>
          <input id="ov-alias-a" placeholder="e.g. sneakyonyxdragon" autocomplete="off">
        </div>
        <div class="form-field">
          <label>Correct player</label>
          <input id="ov-alias-b" list="player-list" placeholder="e.g. _Eddie_" autocomplete="off">
        </div>
        <div class="form-field full">
          <label>Note (optional)</label>
          <input id="ov-alias-note" placeholder="e.g. same person, alt account" autocomplete="off">
        </div>
        <div class="form-field full">
          <button class="btn btn-primary" id="ov-alias-add" style="margin-top:6px">+) Save name fix</button>
        </div>
      </div>
      <div class="log-list" id="ov-alias-list" style="margin-top:12px">${g}</div>
    </div>

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
      <div class="log-list" id="ov-inact-list" style="margin-top:12px">${c}</div>
    </div>

    <div class="panel" style="margin:0">
      <h3>Start <span class="n">ratings</span> (seeds)</h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Player</label>
          <input id="ov-seed-n" list="player-list" autocomplete="off">
        </div>
        <div class="form-field">
          <label>Old 0\u2013100 rating</label>
          <input id="ov-seed-v" type="number" step="0.5" placeholder="90">
        </div>
        <div class="form-field">
          <label>Starting Glicko <span style="color:var(--dimmer)">(opt)</span></label>
          <input id="ov-seed-g" type="number" step="1" placeholder="auto">
        </div>
        <div class="form-field">
          <label>Starting RD <span style="color:var(--dimmer)">(opt)</span></label>
          <input id="ov-seed-rd" type="number" step="1" placeholder="auto">
        </div>
        <div class="form-field full">
          <button class="btn btn-primary" id="ov-seed-add" style="margin-top:6px">+) Save seed</button>
        </div>
      </div>
      <div class="log-list" id="ov-seed-list" style="margin-top:12px">${l}</div>
    </div>

    <div class="panel" style="margin:0">
      <h3>Model <span class="n">settings</span></h3>
      <div id="ov-settings">${f}</div>
      <button class="btn btn-ghost" id="ov-set-reset" style="margin-top:12px">Reset to sheet values</button>
    </div>

    <div class="panel" style="margin:0;grid-column:1/-1">
      <h3>Fix or delete <span class="n">any match</span></h3>
      <div class="form-note" style="margin:0 0 10px">Search a player, then fix scores, set or fix the date, or delete the match. Ratings recalculate instantly.</div>
      <input id="ov-mq" placeholder="Search a player to find their matches\u2026" autocomplete="off" style="width:100%">
      <div class="fix-row" style="margin-top:12px;opacity:.5">
        <div class="txt" style="font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--dimmer)">Players</div>
        <div style="font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:var(--dimmer)">Score</div>
        <div style="font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:var(--dimmer)">Score</div>
        <div style="font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:var(--dimmer)">Date</div>
        <div></div><div></div>
      </div>
      <div class="log-list" id="ov-mresults"><div class="empty">Search to edit scores, dates, or delete a match.</div></div>
    </div>

    <div class="panel" style="margin:0;grid-column:1/-1">
      <h3>Add / remove <span class="n">players</span></h3>
      <div class="form-note" style="margin:0 0 10px">A player exists through their results \u2014 so adding a player means logging their <b>first 1v1 result</b> (required). Removing a player deletes every match they played.</div>
      <div class="form-grid">
        <div class="form-field">
          <label>New player</label>
          <input id="pl-name" placeholder="e.g. NewFighter" autocomplete="off">
        </div>
        <div class="form-field">
          <label>First opponent</label>
          <input id="pl-opp" list="player-list" placeholder="e.g. Kobi" autocomplete="off">
        </div>
        <div class="form-field">
          <label>Score 1</label>
          <input id="pl-sa" type="number" min="0" placeholder="15">
        </div>
        <div class="form-field">
          <label>Score 2</label>
          <input id="pl-sb" type="number" min="0" placeholder="10">
        </div>
        <div class="form-field">
          <label>Match date</label>
          <input id="pl-date" type="date">
        </div>
        <div class="form-field">
          <label>Old 0\u2013100 rating <span style="color:var(--dimmer)">(opt)</span></label>
          <input id="pl-seed" type="number" step="0.5" placeholder="auto">
        </div>
        <div class="form-field full">
          <button class="btn btn-primary" id="pl-add" style="margin-top:6px">+) Add player with first result</button>
        </div>
      </div>
      <div class="form-grid" style="margin-top:18px;border-top:1px solid var(--line);padding-top:16px">
        <div class="form-field">
          <label>Remove player (and all their matches)</label>
          <input id="pl-del" list="player-list" placeholder="e.g. Warren" autocomplete="off">
        </div>
        <div class="form-field">
          <label>&nbsp;</label>
          <button class="btn btn-danger" id="pl-del-btn">Remove player</button>
        </div>
      </div>
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

  <datalist id="player-list">${J.players.map(r=>`<option value="${w(r.name)}">`).join("")}</datalist>`,d("#admin-lock").addEventListener("click",()=>{xe(),D()}),d("#admin-publish").addEventListener("click",()=>u()),d("#admin-sync").addEventListener("click",async()=>{let r=d("#admin-sync"),m=d("#admin-sync-status");r.disabled=!0,m.textContent="syncing\u2026";try{let y=await fetch(Me,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:ct()})}),h=await y.json().catch(()=>({}));y.ok&&h.ok?(m.textContent=h.changed?`synced \u2713 ${h.matches} matches / ${h.players} players`:"already up to date \u2713",E(h.changed?"Sheet synced \u2014 the live site was updated.":"Site already matches the sheet.")):y.status===429?(m.textContent="rate limited",E("Too many attempts \u2014 wait a few minutes.")):(m.textContent="sync failed",E("Sync failed: "+(h.error||y.status)))}catch{m.textContent="network error",E("Sync failed (network).")}r.disabled=!1});async function u(r){let m=!!(r&&r.silent),y=ct()||(m?"":(window.prompt("Admin password:")||"").trim());if(!y){E(m?'Saved here \u2014 auto-publish needs a stored password. Use "Publish to everyone".':"Publish cancelled.");return}Nt=!0;let h=H(),M={},T=[];for(let[L,S]of Object.entries(h.matchEdits||{}))L.startsWith("a:")&&(M[L]=S);for(let L of h.matchRemoved||[])L.startsWith("a:")&&T.push(L);let n=G().filter(L=>L.admin).map(L=>({a:L.a,b:L.b,sa:L.sa,sb:L.sb,date:L.date||""})),p={matches:n,aliases:h.aliases||{},aliasNotes:h.aliasNotes||{},aliasRemoved:h.aliasRemoved||[],inactive:h.inactive||[],seeds:h.seeds||{},seedGlicko:h.seedGlicko||{},seedRd:h.seedRd||{},seedRemoved:h.seedRemoved||[],settings:h.settings||{},matchEdits:M,matchRemoved:T,faq:h.faq!=null?h.faq:[]};try{let L=await fetch(mt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:y,doc:p,message:`Publish match log (${n.length} matches)`})}),S=await L.json().catch(()=>({}));if(!L.ok||!S.ok){L.status===403&&sessionStorage.removeItem(X),E("Publish failed: "+(S.error||"HTTP "+L.status));return}window.LB_PUB=p,window.LB_LOG=n,it([]),_({}),P(),m||D(),E(m?"Saved \u2014 live for everyone \u2713":"Published! Everyone sees it on their next visit.")}catch{E("Publish failed: network error.")}finally{Nt=!1}}d("#admin-export").addEventListener("click",()=>{let r=new Blob([JSON.stringify(Q(),null,2)],{type:"application/json"}),m=document.createElement("a");m.href=URL.createObjectURL(r),m.download="match-log.json",m.click(),URL.revokeObjectURL(m.href),E("Log exported.")}),d("#adm-add").addEventListener("click",()=>{let r=d("#adm-a").value.trim(),m=d("#adm-b").value.trim(),y=parseInt(d("#adm-sa").value,10),h=parseInt(d("#adm-sb").value,10);if(!r||!m||r.toLowerCase()===m.toLowerCase()||!Number.isFinite(y)||!Number.isFinite(h)){E("Fill in both players and scores.");return}let M=Q();M.unshift({a:r,b:m,sa:y,sb:h,date:d("#adm-date")?d("#adm-date").value||new Date().toISOString().slice(0,10):new Date().toISOString().slice(0,10)}),it(M),P(),D(),E(`${r} ${y}\u2013${h} ${m} added \u2014 site recalculated live.`)}),d("#adm-list").addEventListener("click",r=>{let m=r.target.closest("[data-del]");if(!m)return;let y=Q();y.splice(parseInt(m.dataset.del,10),1),it(y),P(),D()}),d("#ov-alias-add").addEventListener("click",()=>{let r=d("#ov-alias-a").value.trim(),m=d("#ov-alias-b").value.trim(),y=(d("#ov-alias-note")||{}).value.trim();if(!r||!m){E("Fill both: the wrong name and the correct player.");return}let h=Object.keys(U).find(T=>T.toLowerCase()===m.toLowerCase())||m,M=B();_({...M,aliases:{...M.aliases||{},[r]:h},aliasNotes:y?{...M.aliasNotes||{},[r]:y}:M.aliasNotes||{},aliasRemoved:(M.aliasRemoved||[]).filter(T=>T!==r)}),P(),D(),E(`Name fix saved \u2014 "${r}" now counts as ${h}.`)}),d("#ov-alias-list").addEventListener("click",r=>{let m=r.target.closest("[data-alias-del]");if(!m)return;let y=m.dataset.aliasDel,h=B(),M={...h.aliases||{}},T={...h.aliasNotes||{}};delete M[y],delete T[y],_({...h,aliases:M,aliasNotes:T,aliasRemoved:[...new Set([...h.aliasRemoved||[],y])]}),P(),D(),E("Name fix removed.")}),d("#ov-inact-toggle").addEventListener("click",()=>{let r=d("#ov-inact-n").value.trim();if(!r){E("Type a player name first.");return}let m=B(),y=H().inactive||[],h=y.includes(r)?y.filter(M=>M!==r):[...y,r];_({...m,inactive:h}),P(),D(),E(h.includes(r)?`${r} marked inactive.`:`${r} marked active again.`)}),d("#ov-inact-list").addEventListener("click",r=>{let m=r.target.closest("[data-inact-del]");if(!m)return;let y=B();_({...y,inactive:(H().inactive||[]).filter(h=>h!==m.dataset.inactDel)}),P(),D()}),d("#ov-seed-add").addEventListener("click",()=>{let r=d("#ov-seed-n").value.trim(),m=d("#ov-seed-v").value.trim(),y=d("#ov-seed-g").value.trim(),h=d("#ov-seed-rd").value.trim();if(!r){E("Pick a player first.");return}if(m===""&&y===""&&h===""){E("Enter an Old 0\u2013100 rating, or a Starting Glicko / RD.");return}let M=B(),T={...M.seeds||{}},n={...M.seedGlicko||{}},p={...M.seedRd||{}};m!==""&&Number.isFinite(Number(m))?T[r]=Number(m):delete T[r],y!==""&&Number.isFinite(Number(y))?n[r]=Number(y):delete n[r],h!==""&&Number.isFinite(Number(h))?p[r]=Number(h):delete p[r],_({...M,seeds:T,seedGlicko:n,seedRd:p,seedRemoved:(M.seedRemoved||[]).filter(L=>L!==r)}),P(),D(),E(`Seed saved for ${r}.`)}),d("#ov-seed-list").addEventListener("click",r=>{let m=r.target.closest("[data-seed-del]");if(!m)return;let y=m.dataset.seedDel,h=B(),M={...h.seeds||{}};delete M[y];let T={...h.seedGlicko||{}};delete T[y];let n={...h.seedRd||{}};delete n[y],_({...h,seeds:M,seedGlicko:T,seedRd:n,seedRemoved:[...new Set([...h.seedRemoved||[],y])]}),P(),D()}),d("#ov-settings").addEventListener("change",r=>{let m=r.target.closest("[data-set-name]");if(!m)return;let y=B();_({...y,settings:{...y.settings||{},[m.dataset.setName]:m.value}}),P(),D(),E("Setting applied \u2014 everything recalculated.")}),d("#ov-set-reset").addEventListener("click",()=>{let r=B();_({...r,settings:{}}),P(),D(),E("Settings back to the master sheet values.")}),d("#ov-mq").addEventListener("input",()=>{d("#ov-mresults").innerHTML=b(d("#ov-mq").value)}),d("#ov-mresults").addEventListener("click",r=>{let m=r.target.closest("[data-msave]"),y=r.target.closest("[data-mdel]");if(m){let h=m.closest("[data-mkey]"),M=h.dataset.mkey,T=p=>h.querySelector(`[data-f="${p}"]`).value,n=B();_({...n,matchEdits:{...n.matchEdits||{},[M]:{sa:+T("sa"),sb:+T("sb"),date:T("date")}}}),P(),d("#ov-mresults").innerHTML=b(d("#ov-mq").value),E("Match fixed \u2014 ratings recalculated.")}else if(y){let h=y.dataset.mdel,M=B();_({...M,matchRemoved:[...new Set([...M.matchRemoved||[],h])]}),P(),d("#ov-mresults").innerHTML=b(d("#ov-mq").value),E("Match deleted \u2014 ratings recalculated.")}}),d("#pl-add").addEventListener("click",()=>{let r=d("#pl-name").value.trim(),m=d("#pl-opp").value.trim(),y=parseInt(d("#pl-sa").value,10),h=parseInt(d("#pl-sb").value,10);if(!r||!m||r.toLowerCase()===m.toLowerCase()||!Number.isFinite(y)||!Number.isFinite(h)){E("A player needs a name, an opponent and both scores \u2014 at least 1 result.");return}if(U[O(r)]){E(`${r} already exists \u2014 log a match for them instead.`);return}let M=Q();M.unshift({a:r,b:m,sa:y,sb:h,date:(d("#pl-date")||{}).value||new Date().toISOString().slice(0,10)}),it(M);let T=(d("#pl-seed")||{}).value.trim();if(T!==""&&Number.isFinite(Number(T))){let n=B();_({...n,seeds:{...n.seeds||{},[O(r)]:Number(T)},seedRemoved:(n.seedRemoved||[]).filter(p=>p!==O(r))})}P(),D(),E(`${r} added with their first result \u2014 ${y}\u2013${h} vs ${m}.`)}),d("#pl-del-btn").addEventListener("click",()=>{let r=d("#pl-del").value.trim(),m=O(r),y=G().filter(k=>k.a===m||k.b===m);if(!y.length){E(`No player called "${r}" with matches found.`);return}if(!window.confirm(`Remove ${m} and ${y.length} match${y.length===1?"":"es"}? This recalculates every rating.`))return;let h=B(),M=[...h.matchRemoved||[]],T=[];y.forEach(k=>{k.key.startsWith("l:")?T.push(parseInt(k.key.slice(2),10)):M.push(k.key)});let n=Q();T.sort((k,R)=>R-k).forEach(k=>n.splice(k,1)),it(n);let p={...h.seeds||{}},L={...h.seedGlicko||{}},S={...h.seedRd||{}};delete p[m],delete L[m],delete S[m],_({...h,matchRemoved:[...new Set(M)],seeds:p,seedGlicko:L,seedRd:S,seedRemoved:[...new Set([...h.seedRemoved||[],m])],inactive:(H().inactive||[]).filter(k=>k!==m)}),P(),D(),E(`${m} removed with ${y.length} match${y.length===1?"":"es"}. Publish to make it public.`)});let $=()=>{let r=yt();d("#faq-admin-list").innerHTML=r.map((m,y)=>`
      <div class="log-item fix-row" data-faq-idx="${y}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${w(String(m.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${w(String(m.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${y}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${y}" title="Delete question">${v}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};$(),d("#faq-admin-list").addEventListener("click",r=>{let m=r.target.closest("[data-faq-save]"),y=r.target.closest("[data-faq-del]"),h=yt().map(T=>({...T}));if(m){let T=m.closest("[data-faq-idx]");h[parseInt(m.dataset.faqSave,10)]={q:T.querySelector('[data-fq="q"]').value.trim(),a:T.querySelector('[data-fq="a"]').value.trim()}}else if(y)h.splice(parseInt(y.dataset.faqDel,10),1);else return;let M=B();_({...M,faq:h}),$(),E("Q&A updated \u2014 publish to make it public.")}),d("#faq-add").addEventListener("click",()=>{let r=d("#faq-new-q").value.trim(),m=d("#faq-new-a").value.trim();if(!r||!m){E("Fill in both the question and the answer.");return}let y=B();_({...y,faq:[...yt().map(h=>({...h})),{q:r,a:m}]}),$(),E("Question added.")}),d("#faq-reset").addEventListener("click",()=>{let r=B();_({...r,faq:null}),$(),E("Q&A back to the built-in list.")}),window._fbTimer&&(clearInterval(window._fbTimer),window._fbTimer=null);async function x(){let r=d("#fb-inbox");if(!r||document.querySelector("#fb-inbox [data-fb-reply]:focus"))return;let m=ct();if(!m){r.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let y=await fetch(Z+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:m})}),h=await y.json().catch(()=>({}));if(!y.ok||!h.ok){r.innerHTML=`<div class="empty">Could not load messages (${w(h.error||"HTTP "+y.status)}).</div>`;return}let M=h.items||[],T={};r.querySelectorAll("[data-fb-id]").forEach(n=>{let p=n.querySelector("[data-fb-reply]");p&&p.value&&(T[n.dataset.fbId]=p.value)}),r.innerHTML=M.map(n=>`
        <div class="log-item fb-row${n.resolved?" fb-done":""}" data-fb-id="${w(n.id)}" data-fb-resolved="${n.resolved?"1":""}">
          <div class="txt">
            <b>${w(n.name||"Anonymous")}</b>${n.contact?` <span style="color:var(--dimmer)">\xB7 ${w(n.contact)}</span>`:""}
            <span class="mono" style="color:var(--dimmer);font-size:11px;margin-left:6px">ticket ${w(n.id)}</span>
            ${n.resolved?'<span class="tag resolved" style="margin-left:6px">resolved \u2713</span>':`<span class="tag ${n.status==="replied"?"live":"fresh"}" style="margin-left:6px">${w(n.status)}</span>`}
            <div style="color:var(--dim);font-size:13px;margin-top:4px">${w(n.message)}</div>
            ${n.reply?`<div style="color:var(--gold);font-size:12.5px;margin-top:4px">\u21A9 ${w(n.reply)}</div>`:""}
          </div>
          <input class="set-val fb-reply-in" data-fb-reply placeholder="Write a reply\u2026" value="${w(n.reply||"")}">
          <button class="icon-btn" data-fb-send title="Send reply"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-resolve title="${n.resolved?"Reopen \u2014 mark as not resolved":"Mark as resolved"}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.6L16 9.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-del title="Delete message">${v}</button>
        </div>`).join("")||'<div class="empty">No messages yet.</div>',r.querySelectorAll("[data-fb-id]").forEach(n=>{let p=n.querySelector("[data-fb-reply]");p&&T[n.dataset.fbId]!=null&&(p.value=T[n.dataset.fbId])})}catch{r.innerHTML='<div class="empty">Network error loading messages.</div>'}}x(),d("#fb-refresh").addEventListener("click",()=>{x(),E("Inbox refreshed.")}),window._fbTimer=setInterval(()=>{if(!d("#fb-inbox")){clearInterval(window._fbTimer),window._fbTimer=null;return}document.hidden||x()},2e3),d("#fb-inbox").addEventListener("click",async r=>{let m=r.target.closest("[data-fb-send]"),y=r.target.closest("[data-fb-del]"),h=r.target.closest("[data-fb-resolve]");if(!m&&!y&&!h)return;let M=r.target.closest("[data-fb-id]"),T=M.dataset.fbId,n=ct();try{if(h){let p=M.dataset.fbResolved!=="1";if(!(await fetch(Z+"/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:n,id:T,resolved:p})}).then(S=>S.json())).ok){E("Could not update \u2014 try again.");return}E(p?"Marked as resolved \u2713":"Message reopened."),x()}else if(m){let p=M.querySelector("[data-fb-reply]").value;if(!(await fetch(Z+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:n,id:T,reply:p})}).then(S=>S.json())).ok){E("Reply failed.");return}E("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(Z+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:n,id:T})}).then(L=>L.json())).ok){E("Delete failed.");return}M.remove(),E("Message deleted.")}}catch{E("Network error.")}})}var ut=document.getElementById("fl-cards");ut&&window.matchMedia("(hover: hover)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(ut.addEventListener("pointermove",e=>{let s=e.target.closest&&e.target.closest(".fl-card");if(!s)return;let a=s.getBoundingClientRect(),i=(e.clientX-a.left)/a.width-.5,o=(e.clientY-a.top)/a.height-.5;s.classList.add("tilt"),s.style.transform=`perspective(1000px) rotateY(${(i*7).toFixed(2)}deg) rotateX(${(-o*6).toFixed(2)}deg) translateY(-6px)`}),ut.addEventListener("pointerleave",()=>{ut.querySelectorAll(".fl-card").forEach(e=>{e.style.transform="",e.classList.remove("tilt")})}));d("#search").addEventListener("input",e=>{let s=e.target.value.trim().toLowerCase(),a=d("#search-drop");if(!s){a.classList.remove("show");return}let i=J.players.filter(o=>o.name.toLowerCase().includes(s)).slice(0,8);if(!i.length){a.classList.remove("show");return}a.innerHTML=i.map(o=>`
    <a class="drop-row" href="#/player/${z(o.name)}">
      ${o.rank?Lt(o.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${w(o.name)}</span>        <span class="mono" style="margin-left:auto;color:var(--dim)">${wt(o,!0)}</span>
    </a>`).join(""),a.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||d("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(d("#search-drop").classList.remove("show"),d("#search").value="")});var Z=mt.replace(/\/publish$/,"/feedback"),Tt="tt1v1_fb_tickets";function Je(){try{return JSON.parse(localStorage.getItem(Tt)||"[]")}catch{return[]}}function Ye(e){let s=Je();s.push({id:e,ts:Date.now()});try{localStorage.setItem(Tt,JSON.stringify(s.slice(-20)))}catch{}}function Ve(){let e=d("#fb-overlay"),s=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>d("#fb-msg").focus(),180)},a=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};d("#fab-feedback").addEventListener("click",s),d("#fb-close").addEventListener("click",a),d("#fb-done").addEventListener("click",a),e.addEventListener("click",l=>{l.target===e&&a()}),document.addEventListener("keydown",l=>{l.key==="Escape"&&e.classList.contains("show")&&a()});let i=d("#faq-feedback-btn");i&&i.addEventListener("click",s);let o=d("#fb-msg"),v=d("#fb-count-n");o.addEventListener("input",()=>{v.textContent=String(o.value.length);try{localStorage.setItem("tt1v1_fb_draft",o.value)}catch{}});try{let l=localStorage.getItem("tt1v1_fb_draft");l&&(o.value=l,v.textContent=String(l.length))}catch{}let g=d("#fb-send");g.addEventListener("click",async()=>{let l=o.value.trim();if(l.length<5){o.focus(),o.classList.add("fb-nudge"),setTimeout(()=>o.classList.remove("fb-nudge"),500),E(t("fb.writeFirst"));return}g.classList.add("busy"),g.disabled=!0;try{let f=await fetch(Z,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:d("#fb-name").value.trim(),contact:d("#fb-contact").value.trim(),message:l})}),b=await f.json().catch(()=>({}));if(!f.ok||!b.ok){E(t("fb.couldNotSend",{err:b.error||"HTTP "+f.status}));return}Ye(b.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}d("#fb-ticket-code").textContent=b.id,d("#fb-view-form").hidden=!0,d("#fb-view-done").hidden=!1}catch{E(t("fb.netError"))}finally{g.classList.remove("busy"),g.disabled=!1}});let c=document.querySelector(".fb-ticket");c&&c.addEventListener("click",async()=>{let l=(d("#fb-ticket-code").textContent||"").trim();if(!l||l==="\u2014")return;try{await navigator.clipboard.writeText(l)}catch{let u=document.createElement("textarea");u.value=l,document.body.appendChild(u),u.select();try{document.execCommand("copy")}catch{}u.remove()}let f=d("#fb-copied");f&&(f.classList.add("show"),clearTimeout(window._fbCopiedT),window._fbCopiedT=setTimeout(()=>f.classList.remove("show"),1800)),E(t("fb.ticketCopied"))}),d("#fb-check").addEventListener("click",async()=>{let l=d("#fb-ticket-in").value.trim(),f=d("#fb-reply-out");if(l){f.classList.add("show"),f.textContent=t("fb.checking");try{let b=await fetch(Z+"/status?id="+encodeURIComponent(l)),u=await b.json().catch(()=>({}));if(!b.ok||!u.ok){f.textContent=t("fb.noTicket");return}f.innerHTML=u.resolved?`${t("fb.statusResolved")}${u.reply?`<br>${t("fb.replyFrom",{reply:w(u.reply)})}`:""}`:u.reply?t("fb.replyFrom",{reply:w(u.reply)}):t("fb.statusPending",{status:w(u.status)})}catch{f.textContent=t("fb.netErrorShort")}}})}function Ke(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let s=null,a=null,i=null,o=0,v=0,g=0,c=u=>{let $=u&&u.closest?u.closest("[title],[data-tip]"):null;return $&&$.hasAttribute("title")&&($.setAttribute("data-tip",$.getAttribute("title")),$.removeAttribute("title")),$&&$.getAttribute("data-tip")?$:null},l=(u,$)=>{let x=e.offsetWidth,r=e.offsetHeight,m=u+14,y=$+18;m+x>window.innerWidth-8&&(m=u-x-14),y+r>window.innerHeight-8&&(y=$-r-14),m=Math.max(8,m),y=Math.max(8,y);let h=e.classList.contains("show")&&e.style.left?Math.abs(parseFloat(e.style.left)-m)+Math.abs(parseFloat(e.style.top)-y)<150:!1;e.classList.toggle("snap",!h),e.style.left=m+"px",e.style.top=y+"px"},f=(u,$,x)=>{s=u,e.textContent=u.getAttribute("data-tip"),l($,x),e.classList.add("show")},b=()=>{clearTimeout(a),clearTimeout(i),a=i=null,e.classList.remove("show"),s=null};document.addEventListener("mousemove",u=>{v=u.clientX,g=u.clientY;let $=c(u.target);if($){if(clearTimeout(i),i=null,$===s){e.classList.contains("show")&&(cancelAnimationFrame(o),o=requestAnimationFrame(()=>l(v,g)));return}clearTimeout(a),e.classList.contains("show")?f($,v,g):a=setTimeout(()=>f($,v,g),90);return}s&&!i&&(i=setTimeout(b,110))},{passive:!0}),window.addEventListener("scroll",b,{passive:!0}),document.addEventListener("mousedown",b,{passive:!0})}var zt;function E(e){let s=d("#toast");s.textContent=e,s.classList.add("show"),clearTimeout(zt),zt=setTimeout(()=>s.classList.remove("show"),2600)}var ot;function Rt(){ot&&ot.disconnect(),ot=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&(s.target.classList.add("in"),j(".cu",s.target).forEach(a=>kt(a,parseFloat(a.dataset.target),{dec:parseInt(a.dataset.dec||0)})),ot.unobserve(s.target))})},{threshold:.12}),j(".reveal").forEach(e=>ot.observe(e))}(function(){let s=d("#scroll-progress"),a=d("#to-top"),i=d("#page-home .hero-row"),o=document.querySelector(".topbar"),v=()=>{let g=window.scrollY,c=document.documentElement.scrollHeight-window.innerHeight;s&&(s.style.width=(c>0?g/c*100:0)+"%"),a&&a.classList.toggle("show",g>640),o&&o.classList.toggle("scrolled",g>10),i&&g<1400&&(i.style.transform=`translateY(${g*.14}px)`,i.style.opacity=String(Math.max(.3,1-g/950)))};window.addEventListener("scroll",v,{passive:!0}),a&&a.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),v()})();window.lbCards={topOf:()=>F,all:()=>J.players,byName:()=>U,histOf:xt,h2hOf:Kt,deltaTag:St,resLetter:C,fmtDate:tt,canon:O,allMatches:G,ratingTimeline:ns,altsOf:Vt};P();Bt();Et();Ve();Ke();window.addEventListener("lb-lang",()=>{let e=window.scrollY,s=K,a={...N};Et(),d("#page-home").classList.contains("active")&&(s!=="all"||a.key!=="rank"||a.dir!==1)&&(K=s,N=a,j(".chip[data-filter]").forEach(i=>i.classList.toggle("on",i.dataset.filter===s)),Dt(),at(s,a.key,a.dir)),Ht(),window.scrollTo(0,e)});function lt(e,s){let a=e.indexOf("window."+s);if(a<0)return null;let i=e.indexOf("=",a);for(;i<e.length&&"{[".indexOf(e[i])<0;)i++;let o=0,v=!1,g="",c=!1;for(let l=i;l<e.length;l++){let f=e[l];if(v){c?c=!1:f==="\\"?c=!0:f===g&&(v=!1);continue}if(f==='"'||f==="'"){v=!0,g=f;continue}if(f==="{"||f==="[")o++;else if((f==="}"||f==="]")&&(o--,o<=0))return JSON.parse(e.slice(i,l+1))}return null}var Jt="https://tierstats.github.io/";async function Yt(e,s){for(let a of e)try{let i=await fetch(a+(a.includes("?")?"&":"?")+s,{cache:"no-store"});if(i.ok)return await i.text()}catch{}return null}async function qt(e){try{let s="cb="+Date.now(),[a,i]=await Promise.all([Yt([Jt+"data.js","data.js"],s),Yt([Jt+"log.js","log.js"],s)]);if(!a||!i)throw new Error("data unavailable");let o=lt(a,"LB_TANKS");o&&(window.LB_TANKS={...window.LB_TANKS_SNAPSHOT||{},...o});let v=lt(a,"LB_DATA"),g=lt(i,"LB_PUB")||(lt(i,"LB_LOG")?{matches:lt(i,"LB_LOG")}:null),c=[];if(v&&JSON.stringify(v)!==JSON.stringify(I)&&(I=v,window.LB_DATA=v,c.push("data")),g&&JSON.stringify(g)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=g,window.LB_LOG=g.matches||[],c.push("log")),c.length){P(),Bt(),Et();let l=d("#last-updated");l&&(l.textContent=t("home.lastUpdated",{when:tt(I.generated)||"today"}))}e&&E(c.length?t("misc.refreshed"):t("misc.upToDate"))}catch{e&&E(t("misc.refreshFailed"))}}qt(!1);var ft=d("#lb-refresh-btn");ft&&ft.addEventListener("click",async()=>{ft.classList.add("spinning"),await qt(!0),setTimeout(()=>ft.classList.remove("spinning"),400)});setInterval(()=>qt(!1),6e4);document.addEventListener("visibilitychange",()=>{document.hidden||qt(!1)});var re="tt1v1_fb_seen",Y=null;function Qe(){try{return JSON.parse(localStorage.getItem(Tt)||"[]")}catch{return[]}}function ce(){try{return JSON.parse(localStorage.getItem(re)||"{}")||{}}catch{return{}}}function Ze(){let e=d("#fab-feedback");if(e&&!e.querySelector(".fb-dot")){let a=document.createElement("span");a.className="fb-dot",e.appendChild(a),requestAnimationFrame(()=>a.classList.add("in"))}let s=d("#fb-view-form");if(s&&!d("#fb-reply-banner")&&Y){let a=document.createElement("div");a.id="fb-reply-banner",a.innerHTML=`${t("fb.teamReplied",{id:w(Y.id)})}
      <div class="r">${w(Y.reply)}</div>
      <button class="btn btn-ghost" id="fb-got-it" style="margin-top:9px;padding:6px 13px">${t("fb.gotIt")}</button>`,s.insertAdjacentElement("beforebegin",a),requestAnimationFrame(()=>a.classList.add("show")),d("#fb-got-it").addEventListener("click",Xe)}}function Xe(){if(Y){let a=ce();a[Y.id]=1;try{localStorage.setItem(re,JSON.stringify(a))}catch{}Y=null}let e=d(".fb-dot");e&&(e.classList.add("out"),setTimeout(()=>e.remove(),420));let s=d("#fb-reply-banner");s&&(s.classList.remove("show"),setTimeout(()=>s.remove(),420))}async function de(){let e=ce();Y=null;let s=Qe(),a=s.slice(0,Math.max(0,s.length-6)),i=[];for(let o of s.slice(-6))try{let v=await fetch(Z+"/status?id="+encodeURIComponent(o.id),{cache:"no-store"}),g=await v.json().catch(()=>({}));if(v.status===404||v.ok&&g.ok===!1)continue;i.push(o),v.ok&&g.ok&&g.reply&&!e[o.id]&&!Y&&(Y={id:o.id,reply:g.reply})}catch{i.push(o)}if(i.length!==s.slice(-6).length)try{localStorage.setItem(Tt,JSON.stringify([...a,...i]))}catch{}Y&&Ze()}setTimeout(de,3500);setInterval(de,9e4);var ts=mt.replace(/\/publish$/,"/api/ttstats"),es=15e3;function ss(e,s){let a=e&&e.stats||{};return s==="kd"?a.deaths?a.kills/a.deaths:a.kills!=null?a.kills:null:a[s]!=null?a[s]:null}function as(e){let s=a=>String(a).replace(/["\\]/g,"\\$&");Object.keys(e).forEach(a=>{let i=e[a];window.LB_TANKS=Object.assign({},window.LB_TANKS||{},{[a]:i}),document.querySelectorAll(`[data-live-name="${s(a)}"][data-live]`).forEach(o=>{let v=o.dataset.live;if(v==="badge"){o.textContent=t("cards.badge",{n:i&&i.badge||"0"});return}let g=ss(i,v);if(g==null)return;let c=v==="kd"&&i.stats&&i.stats.deaths?2:0,l=Number(g.toFixed(c)),f=parseFloat(String(o.textContent).replace(/[^0-9.\-]/g,""));(isNaN(f)||f!==l)&&kt(o,l,{dec:c,dur:900})}),document.querySelectorAll(`canvas[data-tank-name="${s(a)}"]`).forEach(o=>{o.dataset.mounted&&window.TankRender&&window.TankRender.render(o,i,o.dataset.tankSize||"medium")})})}(function(){let s=!1,a=async()=>{if(s||document.visibilityState!=="visible")return;let i=new Set;document.querySelectorAll("[data-live-name]").forEach(v=>i.add(v.dataset.liveName)),document.querySelectorAll("canvas[data-tank-name]").forEach(v=>i.add(v.dataset.tankName));let o=[...i].filter(Boolean).slice(0,12);if(o.length){s=!0;try{let g=await(await fetch(ts+"?names="+encodeURIComponent(o.join(",")),{cache:"no-store"})).json();g&&g.ok&&g.tanks&&as(g.tanks)}catch{}s=!1}};setTimeout(a,2500),setInterval(a,es)})();function ns(){let e={},s=(c,l,f,b)=>{let u=l-q.conservative*f;(!e[c]||u>e[c].rating)&&(e[c]={rating:u,date:b||""})},a={},i=c=>{if(!a[c]){let[l,f]=ie(c);a[c]={r:l,rd:f,lastIdx:null}}return a[c]},o={};for(let c of G()){if(c.date)continue;let l=c.sa>c.sb?1:c.sa<c.sb?0:.5;(o[c.a]=o[c.a]||[]).push([c.b,l]),(o[c.b]=o[c.b]||[]).push([c.a,1-l]),i(c.a).lastIdx=V,i(c.b).lastIdx=V}let v={};for(let c in o)v[c]=[i(c).r,i(c).rd];for(let c in o){let l=i(c),[f,b]=$t(l.r,l.rd,o[c].map(([u,$])=>[v[u][0],v[u][1],$]));l.r=f,l.rd=b,s(c,f,b,q.graceStart)}let g=new Map;for(let c of G().filter(l=>l.date).slice().reverse()){let l=Mt(c.date);g.has(l)||g.set(l,[]),g.get(l).push({a:O(c.a),b:O(c.b),sa:+c.sa,sb:+c.sb,date:c.date})}for(let c of[...g.keys()].sort((l,f)=>l-f)){for(let u in a){let $=a[u],x=c-($.lastIdx==null?V:$.lastIdx);x>0&&($.rd=Math.min(Math.sqrt($.rd*$.rd+q.growth*q.growth*x),q.maxRd))}let l={},f="";for(let u of g.get(c)){let $=u.sa>u.sb?1:u.sa<u.sb?0:.5;(l[u.a]=l[u.a]||[]).push([u.b,$]),(l[u.b]=l[u.b]||[]).push([u.a,1-$]),i(u.a).lastIdx=c,i(u.b).lastIdx=c,u.date>f&&(f=u.date)}let b={};for(let u in l)b[u]=[i(u).r,i(u).rd];for(let u in l){let $=i(u),[x,r]=$t($.r,$.rd,l[u].map(([m,y])=>[b[m][0],b[m][1],y]));$.r=x,$.rd=r,s(u,x,r,f)}}return e}})();
