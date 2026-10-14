/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var D=window.LB_DATA,Et="https://tierstats-publish.tierstats.workers.dev/publish",y=(e,s=document)=>s.querySelector(e),B=(e,s=document)=>[...s.querySelectorAll(e)],x=e=>String(e).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),z=e=>encodeURIComponent(String(e)),Xt=e=>decodeURIComponent(e);function Pt(e,s,a={}){let i=a.dur||1200,c=a.dec||0,p=performance.now(),m=parseFloat(e.textContent)||0;function g(n){let l=Math.min(1,(n-p)/i),o=1-Math.pow(1-l,3);e.textContent=(m+(s-m)*o).toFixed(c),l<1&&requestAnimationFrame(g)}requestAnimationFrame(g),setTimeout(()=>{e.textContent=s.toFixed(c)},i+300)}var Ve='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',Qe='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function Bt(e,s=""){let a=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",i=e<=3?e===1?Ve:Qe:"";return`<div class="rank-badge ${a} ${s}" title="${t("home.rankTip",{n:e})}">${i}<span class="num">${e}</span></div>`}var F=e=>t(e==="W"?"rec.wLetter":e==="L"?"rec.lLetter":"rec.dLetter"),V={},U=[],Z={players:[],byName:{},qualified:[]},wt={},Rt={},ut={},te=new Set,le={prevRatings:{},prevRanks:{}};function Ke(){try{localStorage.removeItem("tt1v1_baseline")}catch{}le={prevRatings:{...D.prevRatings||{}},prevRanks:{...D.prevRanks||{}}}}function Ze(){for(let a in wt)delete wt[a];let e=new Set(J().aliasRemoved||[]);Object.entries(D.aliases).forEach(([a,i])=>{e.has(a)||(wt[a.toLowerCase()]=i)}),Object.entries(J().aliases||{}).forEach(([a,i])=>{wt[String(a).toLowerCase()]=i});for(let a of Object.keys(Rt))delete Rt[a];for(let a of Object.keys(ut))delete ut[a];te.clear();let s=(a,i)=>{Object.keys(a||{}).forEach(c=>{let p=j(c);p!==c&&(i[p]=a[c])}),Object.keys(a||{}).forEach(c=>{let p=j(c);p===c&&(i[p]=a[c])})};s(D.seeds,Rt),s(le.prevRatings,ut),(D.inactiveList||[]).forEach(a=>te.add(j(a)))}var ee={},we=e=>String(e).toLowerCase().replace(/[^a-z0-9]/g,"").replace(/0/g,"o").replace(/1/g,"i").replace(/3/g,"e").replace(/5/g,"s");function Xe(e,s){if(Math.abs(e.length-s.length)>3)return 99;let a=Array.from({length:s.length+1},(i,c)=>c);for(let i=1;i<=e.length;i++){let c=[i];for(let p=1;p<=s.length;p++)c[p]=Math.min(a[p]+1,c[p-1]+1,a[p-1]+(e[i-1]===s[p-1]?0:1));if(a=c,Math.min(...a)>3)return 99}return a[s.length]}function ts(){let e={},s=new Set(J().aliasRemoved||[]),a=c=>{let p=String(c).trim(),m=j(p);!p||we(p)===we(m)||Xe(p.toLowerCase(),m.toLowerCase())<=2||(e[m]=e[m]||[]).push(p)};Object.keys(D.aliases).forEach(c=>{s.has(c)||a(c)}),Object.keys(J().aliases||{}).forEach(a);for(let c of Object.keys(e)){let p=new Set([c.toLowerCase()]);e[c]=e[c].filter(m=>{let g=m.toLowerCase();return p.has(g)?!1:(p.add(g),!0)}).sort((m,g)=>m.localeCompare(g))}let i=D.cards&&D.cards.alts||{};Object.keys(i).forEach(c=>{let p=j(c),m=i[c];e[p]=(Array.isArray(m)?m:String(m||"").split(/[,;]/)).map(g=>String(g).trim()).filter(Boolean)}),ee=e}function Me(e){return ee[e]||ee[j(e)]||[]}function es(e){let s=Me(e);if(!s.length)return"";let a=s.slice(0,2).join(", ")+(s.length>2?` +${s.length-2}`:"");return`<div class="p-alt" title="${x(s.join(", "))}">${t("lb.aka",{names:x(a)})}</div>`}var j=e=>{let s=String(e).trim(),a=new Set;for(;;){let i=wt[s.toLowerCase()];if(!i||i===s||a.has(s))return s;a.add(s),s=i}};function Tt(e){let s=[];return Q().forEach(a=>{let i=(c,p,m)=>({opp:c,for_:p,against:m,res:p>m?"W":p<m?"L":"D",date:a.date});a.a===e?s.push(i(a.b,a.sa,a.sb)):a.b===e&&s.push(i(a.a,a.sb,a.sa))}),s}function Se(e){let s={};return Tt(e).forEach(a=>{let i=s[a.opp]||(s[a.opp]={w:0,l:0,d:0,pf:0,pa:0});i[a.res.toLowerCase()]+=1,i.pf+=a.for_,i.pa+=a.against}),Object.entries(s).map(([a,i])=>({opp:a,...i})).sort((a,i)=>i.w+i.l+i.d-(a.w+a.l+a.d)||i.w-a.w)}function ss(e){let s=V[e]||{};return s.provisional?`<span class="tag prov">${t("tag.provisional")}</span>`:s.inactive?`<span class="tag inact">${t("tag.inactive")}</span>`:""}function as(e){let s=Tt(e).slice(0,5).reverse();if(!s.length)return"";let a=s.map(i=>F(i.res)).join(" ");return`<span class="form" title="${t("form.title",{n:s.length,seq:a})}">${s.map(i=>`<i class="${i.res.toLowerCase()}">${F(i.res)}</i>`).join("")}</span>`}function _t(){let e=typeof getLang=="function"?getLang():"en";return{en:"en-US",zh:"zh-CN",ja:"ja-JP",ru:"ru-RU"}[e]||"en-US"}function Ee(e){let s=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||"").slice(0,10));return s?new Date(+s[1],+s[2]-1,+s[3]):null}function tt(e){let s=Ee(e);if(!s)return"";let a=s.getFullYear()===new Date().getFullYear();try{return new Intl.DateTimeFormat(_t(),a?{month:"short",day:"numeric"}:{year:"numeric",month:"short",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Te(e){let s=Ee(e);if(!s)return"";try{return new Intl.DateTimeFormat(_t(),{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function qe(e){let s=new Date(Number(e)*1e3);if(!Number.isFinite(s.getTime()))return"";try{return new Intl.DateTimeFormat(_t(),{dateStyle:"medium",timeStyle:"short"}).format(s)}catch{return s.toISOString().slice(0,16).replace("T"," ")}}function Ce(e){let s=Math.floor(Date.now()/1e3)-Number(e);if(!Number.isFinite(s))return"";let a=[["year",31536e3],["month",2592e3],["week",604800],["day",86400],["hour",3600],["minute",60]];try{let i=new Intl.RelativeTimeFormat(_t(),{numeric:"auto"});for(let[c,p]of a)if(s>=p)return i.format(-Math.floor(s/p),c);return i.format(-Math.max(0,s),"second")}catch{let c=Math.floor(s/86400);return c>0?c+"d":"<1d"}}function Dt(e){let s=e.delta!=null?e.delta:0;if(Math.abs(s)<.05)return"";let a=s>0,i=Math.abs(s).toFixed(1);return`<span class="delta ${a?"up":"down"}" title="${a?t("delta.upTitle",{n:i}):t("delta.downTitle",{n:i})}">${a?"\u25B2":"\u25BC"} ${i}</span>`}function ns(){let e=le.prevRanks||{},s=Object.keys(e);if(s.length){let c={};return s.forEach(p=>{c[j(p)]=e[p]}),c}let a={};U.forEach(c=>{ut[c.name]!=null&&(a[c.name]=ut[c.name])});let i={};return Object.entries(a).sort((c,p)=>p[1]-c[1]).forEach(([c],p)=>{i[c]=p+1}),i}function is(e,s){let a=s[e.name]!=null?s[e.name]:s[j(e.name)];if(a==null){let c=(D.newSince||{})[e.name];return!c||(Date.now()-Date.parse(c))/864e5>5?"":`<span class="mv new" title="${t("mv.newTitle")}">${t("mv.new")}</span>`}let i=a-e.rank;return i>0?`<span class="mv up" title="${tp("mv.up",i)}">\u25B2${i}</span>`:i<0?`<span class="mv down" title="${tp("mv.down",-i)}">\u25BC${-i}</span>`:""}function Mt(e){return`${Math.round(e.rating-100)} \u2013 ${Math.round(e.rating+100)}`}function jt(e,s){if(!e.provisional)return e.rating.toFixed(1);let a=s?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:Mt(e);return`<span class="prov-range" title="${t("rating.provTitle")}">${a}</span>`}var Ae="tt1v1_admin_log_v1",ht="tt1v1_admin_ok",ot="tt1v1_admin_pw",os=()=>sessionStorage.getItem(ht)==="1"||localStorage.getItem(ht)==="1",yt=()=>sessionStorage.getItem(ot)||localStorage.getItem(ot)||"";function rs(e,s){s?(localStorage.setItem(ht,"1"),localStorage.setItem(ot,e)):(sessionStorage.setItem(ht,"1"),sessionStorage.setItem(ot,e),localStorage.removeItem(ht),localStorage.removeItem(ot))}function cs(){[sessionStorage,localStorage].forEach(e=>{e.removeItem(ht),e.removeItem(ot)})}var ye=null,se=!1;function Re(){se||!yt()||(clearTimeout(ye),ye=setTimeout(()=>publishLog({silent:!0}),1500))}var ls=Et.replace(/\/publish$/,"/verify"),ds=Et.replace(/\/publish$/,"/sync");function Oe(){try{return JSON.parse(localStorage.getItem(Ae)||"[]")}catch{return[]}}function ps(e){try{localStorage.setItem(Ae,JSON.stringify(e))}catch{}Re()}var Fe="tt1v1_admin_over_v1";function lt(){try{return JSON.parse(localStorage.getItem(Fe)||"{}")||{}}catch{return{}}}function ct(e){try{localStorage.setItem(Fe,JSON.stringify(e))}catch{}Re()}function J(){let e=window.LB_PUB||{},s=lt(),a=new Set([...e.aliasRemoved||[],...s.aliasRemoved||[]]),i=new Set([...e.seedRemoved||[],...s.seedRemoved||[]]),c=s.aliases||{},p={...s.seeds||{},...s.seedGlicko||{},...s.seedRd||{}},m=w=>Object.fromEntries(Object.entries(w||{}).filter(([h])=>!a.has(h)||c[h]!=null)),g=w=>Object.fromEntries(Object.entries(w||{}).filter(([h])=>!i.has(h)||p[h]!=null)),n=m({...e.aliases||{},...s.aliases||{}}),l=m({...e.aliasNotes||{},...s.aliasNotes||{}}),o=g({...e.seeds||{},...s.seeds||{}}),r=g({...e.seedGlicko||{},...s.seedGlicko||{}}),u=g({...e.seedRd||{},...s.seedRd||{}});return{aliases:n,aliasNotes:l,seeds:o,seedGlicko:r,seedRd:u,aliasRemoved:[...a].filter(w=>n[w]==null),seedRemoved:[...i].filter(w=>o[w]==null&&r[w]==null&&u[w]==null),settings:{...e.settings||{},...s.settings||{}},matchEdits:{...e.matchEdits||{},...s.matchEdits||{}},inactive:s.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...s.matchRemoved||[]])],faq:s.faq!=null?s.faq:e.faq!=null?e.faq:null}}function vs(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function Q(){let e=J(),s=e.matchEdits||{},a=new Set(e.matchRemoved||[]),i=(r,u)=>{if(a.has(u))return null;let w=s[u],h=w?{...r,sa:w.sa,sb:w.sb,date:w.date!=null?w.date:r.date}:r;return{...h,a:j(h.a),b:j(h.b),sa:+h.sa,sb:+h.sb,key:u}},c=Oe().map((r,u)=>i({...r,admin:!0,published:!1},"l:"+u)).filter(Boolean),p=vs().map((r,u)=>i({...r,admin:!0,published:!0},"p:"+u)).filter(Boolean),m=D.matches.map((r,u)=>i({...r,admin:!1,published:!1},"a:"+u)).filter(Boolean).reverse(),g=r=>{let u=r.a>r.b;return[u?r.b:r.a,u?r.a:r.b,u?r.sb:r.sa,u?r.sa:r.sb,r.date||""].join("|")},n={};m.forEach(r=>{let u=g(r);n[u]=(n[u]||0)+1});let l={};return c.concat(p).filter(r=>{let u=g(r);return l[u]=(l[u]||0)+1,l[u]>(n[u]||0)}).concat(m)}var E={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},Ot=864e5,xt=Math.log(10)/400,Ne=e=>1/Math.sqrt(1+3*xt*xt*e*e/(Math.PI*Math.PI)),ae=(e,s,a)=>1/(1+Math.pow(10,-Ne(a)*(e-s)/400));function us(e){let s=J().seeds||{};return s[e]!=null&&s[e]!==""?Number(s[e]):Rt[e]}function ne(e){let s=(J().seedGlicko||{})[e],a=(J().seedRd||{})[e],i=s!=null&&s!==""?Number(s):null,c=a!=null&&a!==""?Number(a):null;if(i!=null||c!=null)return[i??E.unratedR,c??E.unratedRd];let p=us(e);return p!=null?[Math.max(E.seedMid+(p-E.oldMid)*E.ptsPer,E.minSeed),E.knownRd]:[E.unratedR,E.unratedRd]}function vt(e,s,a){let i=0,c=0;for(let[m,g,n]of a){let l=Ne(g),o=ae(e,m,g);i+=l*l*o*(1-o),c+=l*(n-o)}if(i*=xt*xt,i<=0)return[e,s];let p=1/(s*s)+i;return[e+xt/p*c,Math.sqrt(1/p)]}function hs(e,s){let a=Math.pow(10,s),i=e*a,c=Math.floor(i);return Math.abs(i-c-.5)<1e-6?(c+1)/a:Math.round(i)/a}var St=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(E.periodDays*Ot)),et=St(E.graceStart),fs={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function je(){let e=J().settings||{};return(D.settings||[]).map(s=>({...s,value:Object.prototype.hasOwnProperty.call(e,s.name)?e[s.name]:s.value}))}function ms(){for(let e of je()){let s=fs[e.name];if(!s)continue;if(s==="graceStart"){let i=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(i)&&(E.graceStart=i);continue}let a=Number(e.value);Number.isFinite(a)&&(E[s]=a)}et=St(E.graceStart),B(".cons-val").forEach(e=>{e.textContent=String(E.conservative)}),B(".min-matches-val").forEach(e=>{e.textContent=String(E.minMatches)}),B(".min-opp-val").forEach(e=>{e.textContent=String(E.minOpp)})}function gs(){ms(),Ze(),ts();let e={},s=d=>{if(!e[d]){let[$,v]=ne(d);e[d]={name:d,r:$,rd:v,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[d]},a=(d,$,v,b,f,L)=>{let S=s(d);S.games++,S.opps.add($),v>b?S.w++:v<b?S.l++:S.d++,S.lastIdx=L,f&&(S.lastDate=f)},i={};for(let d of Q()){if(d.date)continue;let $=j(d.a),v=j(d.b),b=d.sa>d.sb?1:d.sa<d.sb?0:.5;(i[$]=i[$]||[]).push([v,b]),(i[v]=i[v]||[]).push([$,1-b]),a($,v,d.sa,d.sb,"",et),a(v,$,d.sb,d.sa,"",et)}let c={};for(let d in i)c[d]=[s(d).r,s(d).rd];for(let d in i){let[$,v]=vt(c[d][0],c[d][1],i[d].map(([b,f])=>[c[b][0],c[b][1],f]));s(d).r=$,s(d).rd=v}let p=new Map;for(let d of Q().filter($=>$.date).slice().reverse()){let $=d.date,v=St($);p.has(v)||p.set(v,[]),p.get(v).push({a:j(d.a),b:j(d.b),sa:+d.sa,sb:+d.sb,date:$})}for(let d of[...p.keys()].sort(($,v)=>$-v)){for(let b in e){let f=e[b],L=d-(f.lastIdx==null?et:f.lastIdx);L>0&&(f.rd=Math.min(Math.sqrt(f.rd*f.rd+E.growth*E.growth*L),E.maxRd))}let $={};for(let b of p.get(d)){let f=b.sa>b.sb?1:b.sa<b.sb?0:.5;($[b.a]=$[b.a]||[]).push([b.b,f]),($[b.b]=$[b.b]||[]).push([b.a,1-f]),a(b.a,b.b,b.sa,b.sb,b.date,d),a(b.b,b.a,b.sb,b.sa,b.date,d)}let v={};for(let b in $)v[b]=[s(b).r,s(b).rd];for(let b in $){let[f,L]=vt(v[b][0],v[b][1],$[b].map(([S,A])=>[v[S][0],v[S][1],A]));s(b).r=f,s(b).rd=L}}let m=Object.values(e).map(d=>({name:d.name,glicko:d.r,rd:d.rd,rating:d.r-E.conservative*d.rd,matches:d.games,w:d.w,l:d.l,d:d.d,winPct:d.games?hs(d.w/d.games*100,1):0,opponents:d.opps.size,avgOpp:0,lastMatch:d.lastDate||"",provisional:!(d.games>=E.minMatches&&d.opps.size>=E.minOpp),inactive:!1})),g={};m.forEach(d=>{g[d.name]=d.glicko}),m.forEach(d=>{let $=0;e[d.name].opps.forEach(v=>{$+=g[v]!=null?g[v]:E.unratedR}),d.avgOpp=e[d.name].opps.size?$/e[d.name].opps.size:0});let n=Date.now(),l=Math.floor(n/(E.periodDays*Ot));for(let d in e){let $=e[d],v=l-($.lastIdx==null?et:$.lastIdx);v>0&&($.rd=Math.min(Math.sqrt($.rd*$.rd+E.growth*E.growth*v),E.maxRd))}m.forEach(d=>{d.glicko=e[d.name].r,d.rd=e[d.name].rd,d.rating=d.glicko-E.conservative*d.rd;let $=ut[d.name],v=(D.curRatings||{})[d.name];d.delta=$!=null?(v??d.rating)-$:0});let o=Date.parse(E.graceStart+"T00:00:00Z")+E.graceDays*Ot,r=new Set([...te,...J().inactive||[]]);m.forEach(d=>{d.inactive=r.has(d.name)||(d.lastMatch?n-Date.parse(d.lastMatch+"T00:00:00Z")>E.inactiveDays*Ot:n>o)});let u={},w={};(D.players||[]).forEach((d,$)=>{let v=j(d.name);u[v]=d,w[v]=$});let h={};m.forEach(d=>{h[d.name]=d}),m.forEach(d=>{let $=u[d.name];$&&(d.rating=$.rating,d.glicko=$.glicko,d.rd=$.rd,d.matches=$.matches,d.w=$.w,d.l=$.l,d.d=$.d,d.winPct=$.winPct,d.opponents=$.opponents,d.avgOpp=$.avgOpp,$.lastMatch&&(d.lastMatch=$.lastMatch))});let k=[];(D.qualified||[]).forEach(d=>{let $=h[j(d.name)];$&&($.provisional=!1,$.rank=d.rank!=null?d.rank:k.length+1,k.push($))});let M=new Set(k.map(d=>d.name)),q=m.filter(d=>!M.has(d.name)&&!u[d.name]&&!u[j(d.name)]&&!d.provisional&&!d.inactive).sort((d,$)=>$.rating-d.rating);q.forEach((d,$)=>{d.rank=k.length+$+1});let N=k.concat(q);m.sort((d,$)=>$.rating-d.rating||(w[d.name]!=null?w[d.name]:1e9)-(w[$.name]!=null?w[$.name]:1e9));let I={};return m.forEach(d=>{I[d.name]=d}),{players:m,byName:I,qualified:N}}function Lt(){Ke(),Z=gs(),V=Z.byName,U=Z.qualified,kt=null}var bs=["page-home","page-player","page-compare","page-matches","page-cards","page-roster","page-analytics","page-method","page-faq","page-admin"];function Ht(){if(oe){oe=!1;return}let e=location.hash||"#/";bs.forEach(c=>y("#"+c).classList.remove("active"));let s="#/"+(e.split("/")[1]||"");B(".nav a, .foot-nav a").forEach(c=>{let p=c.getAttribute("href");c.classList.toggle("active",p===s||e==="#/"&&p==="#/")});let a=y("#nav-glide"),i=document.querySelector(".nav a.active");if(a&&i&&i.offsetWidth>0?(a.style.width=i.offsetWidth+"px",a.style.transform=`translateX(${i.offsetLeft}px)`,a.style.opacity="1"):a&&(a.style.opacity="0"),e==="#/compare"||e.startsWith("#/compare/")){let c=e.split("/").slice(2).map(Xt);Pe(c[0]||"",c[1]||""),y("#page-compare").classList.add("active"),window.lbScrollNow(0)}else if(e.startsWith("#/player/"))Es(Xt(e.slice(9))),y("#page-player").classList.add("active"),window.lbScrollNow(0);else if(e==="#/matches")Cs(),y("#page-matches").classList.add("active"),window.lbScrollNow(0);else if(e==="#/cards")typeof renderCards=="function"&&renderCards(),typeof window.lbLiveStatsTick=="function"&&window.lbLiveStatsTick(),y("#page-cards").classList.add("active"),window.lbScrollNow(0);else if(e.startsWith("#/card/")){typeof renderCards=="function"&&renderCards(),y("#page-cards").classList.add("active"),window.lbScrollNow(0);let c=Xt(e.slice(7));requestAnimationFrame(()=>{typeof window.cardsFocus=="function"&&window.cardsFocus(c)})}else e==="#/roster"?(As(),y("#page-roster").classList.add("active"),window.lbScrollNow(0)):e==="#/analytics"?(he(),y("#page-analytics").classList.add("active"),window.lbScrollNow(0)):e==="#/method"?(Os(),y("#page-method").classList.add("active"),window.lbScrollNow(0)):e==="#/faq"?(js(),y("#page-faq").classList.add("active"),window.lbScrollNow(0)):e==="#/admin"?(pt(),y("#page-admin").classList.add("active"),window.lbScrollNow(0)):(de(),y("#page-home").classList.add("active"),requestAnimationFrame(xs));Wt()}window.addEventListener("hashchange",Ht);function de(){at="all",P={key:"rank",dir:1},B(".chip[data-filter]").forEach(n=>n.classList.toggle("on",n.dataset.filter==="all")),pe();let e=Q().length,s=Z.players.length,a=U[0],i=Math.round(U.reduce((n,l)=>n+l.rd,0)/U.length),c=y("#hero-chip-matches");c&&(c.innerHTML=t("home.chipMatches",{n:e})),y("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">${t("stat.ranked")}</div>
      <div class="v"><span class="cu" data-target="${U.length}">0</span><small>${t("stat.ofTotal",{n:s})}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.matches")}</div>
      <div class="v"><span class="cu" data-target="${e}">0</span></div></div>
    <div class="stat-card"><div class="k">${t("stat.highest")}</div>
      <div class="v"><span class="cu" data-target="${a.rating}" data-dec="1">0</span><small>${x(a.name)}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.avgRd")}</div>
      <div class="v"><span class="cu" data-target="${i}" data-dec="1">0</span><small>${t("stat.certainty")}</small></div></div>`;let p=[U[1],U[0],U[2]].filter(Boolean);y("#fl-cards").innerHTML=p.map(n=>`
    <div class="fl-card r${n.rank}${n.rank===1?" champ":""} reveal" data-goto="${x(n.name)}">
      <div class="fl-top">
        ${Bt(n.rank)}
        <div class="rd">RD ${n.rd.toFixed(0)}</div>
      </div>
      ${n.rank===1?`<div class="champ-tag">${t("home.champTag")}</div>`:""}
      <div class="nm">${x(n.name)}</div>
      <div class="rating">
        <span class="unit">${t("home.ratingUnit")}</span>
        <div class="big-row"><span class="big">${Math.round(n.rating)}</span>${Dt(n)}</div>
      </div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${n.winPct>=60?"":n.winPct>=40?"mid":"low"}" data-w="${n.winPct}"></div></div>
      </div>
      <div class="meta">
        <span><span class="w">${n.w}${F("W")}</span> <span class="l">${n.l}${F("L")}</span> ${n.d}${F("D")}</span>
        <span class="wc">${n.winPct.toFixed(1)}%</span>
        <span class="opp">${t("home.avgOpp",{n:n.avgOpp.toFixed(1)})}</span>
      </div>
    </div>`).join(""),requestAnimationFrame(()=>{B("#fl-cards .bar-fill").forEach(n=>{n.style.width=n.dataset.w+"%"})});let m=y("#home-guide");m&&(m.innerHTML=typeof window.cardsGuideHTML=="function"?window.cardsGuideHTML("home"):""),ft(),Ie();let g=y("#last-updated");g&&(g.textContent=t("home.lastUpdated",{when:tt(D.generated)||"today"}))}function Ie(){let e=Q().filter(s=>s.date).slice(0,10);y("#battles-grid").innerHTML=e.length?e.map(s=>{let a=s.sa>s.sb,i=s.sb>s.sa;return`
    <div class="battle-row reveal" data-goto="${x(a?s.a:s.b)}" tabindex="0" role="link">
      <div class="who ${a?"win":"lose"}" data-goto="${x(s.a)}">${x(s.a)}</div>
      <div class="vs">${t("vs")}</div>
      <div class="who r ${i?"win":"lose"}" data-goto="${x(s.b)}">${x(s.b)}</div>
      <div class="sc mono"><span class="${a?"win":"lose"}">${s.sa}</span> \u2013 <span class="${i?"win":"lose"}">${s.sb}</span></div>
      <div class="dt">${tt(s.date)||(s.admin&&!s.published?t("battles.justNow"):t("misc.historical"))}</div>
    </div>`}).join(""):`<div class="empty" style="padding:26px;text-align:center;color:var(--dim);grid-column:1/-1">${t("battles.empty")}</div>`}var ws=500,ys="cubic-bezier(.22,.8,.24,1)",$s=12;function ks(e,s){matchMedia("(prefers-reduced-motion: reduce)").matches||B(".lb-row",e).forEach((a,i)=>{let c=s.get(a.dataset.name);if(c===void 0||typeof a.animate!="function")return;let p=c-a.getBoundingClientRect().top;Math.abs(p)<=1||a.animate([{transform:`translateY(${p}px)`},{transform:"none"}],{duration:ws,easing:ys,delay:Math.min(i*$s,220),fill:"backwards"})})}function ft(e="all",s="rank",a=1){let i=y("#lb-body"),p=(e==="all"&&Ft?U:Z.players).slice().map(n=>({...n,rank:n.rank!=null?n.rank:9999}));ie&&(p=p.filter(n=>n.name.toLowerCase().includes(ie))),e==="provisional"?p=p.filter(n=>(V[n.name]||{}).provisional):e==="inactive"?p=p.filter(n=>(V[n.name]||{}).inactive):e==="veterans"?p=p.filter(n=>n.matches>=15):e==="rising"&&(p=p.filter(n=>n.winPct>=60&&n.matches>=5)),p.sort((n,l)=>{let o=n[s],r=l[s];return(typeof o=="string"?o.localeCompare(r):o-r)*a});let m=new Map;B(".lb-row",i).forEach(n=>m.set(n.dataset.name,n.getBoundingClientRect().top));let g=ns();i.innerHTML=p.map(n=>`
    <div class="lb-row ${n.rank<=3?"top"+n.rank:""}" data-name="${x(n.name)}" data-goto="${x(n.name)}" tabindex="0" role="link">
      <div class="rank">${n.rank<=U.length?Bt(n.rank,"sm")+is(n,g):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="name-stack"><div class="pname">${x(n.name)}</div></div>${typeof cardsRowChip=="function"?cardsRowChip(n.name):""}</div>
      <div class="rating-cell mono">${Dt(n)}${jt(n,!0)}</div>
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
      <div class="col-status">${ss(n.name)||as(n.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?t("lb.emptyInactive"):e==="provisional"?t("lb.emptyProv"):t("lb.emptyNone")}</div>`,ks(i,m),requestAnimationFrame(()=>{B(".bar-fill",i).forEach(n=>{n.style.width=n.dataset.w+"%"})})}var at="all",P={key:"rank",dir:1},ie="",Ft=!0;function pe(){B(".sortable").forEach(s=>s.classList.remove("sorted","asc"));let e=y(`.sortable[data-key="${P.key}"]`);e&&(e.classList.add("sorted"),P.dir===1&&e.classList.add("asc"))}function xs(){B("#stat-strip .cu").forEach(e=>Pt(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),B(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}y("#lb-qual").addEventListener("click",()=>{Ft=!Ft,y("#lb-qual").classList.toggle("on",Ft),ft(at,P.key,P.dir)});y("#lb-filter").addEventListener("input",e=>{ie=e.target.value.trim().toLowerCase(),ft(at,P.key,P.dir)});var $t=y("#theme-toggle");function ve(){if(!$t)return;let e=document.documentElement.dataset.theme==="light",s=e?t("top.toDark"):t("top.toLight");$t.setAttribute("aria-pressed",String(e)),$t.setAttribute("aria-label",s),$t.title=s}$t.addEventListener("click",()=>{let s=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=s;try{localStorage.setItem("tt1v1_theme",s)}catch{}ve()});ve();document.addEventListener("click",e=>{let s=e.target.closest(".chip");if(s&&s.dataset.filter){B(".chip[data-filter]").forEach(c=>c.classList.remove("on")),s.classList.add("on"),at=s.dataset.filter,ft(at,P.key,P.dir);return}let a=e.target.closest(".sortable");if(a){let c=a.dataset.key;P.key===c&&P.dir===-1?P={key:"rank",dir:1}:P.key===c?P={key:c,dir:-P.dir}:P={key:c,dir:1},pe(),ft(at,P.key,P.dir);return}let i=e.target.closest("[data-goto]");i&&(e.stopPropagation(),location.hash="#/player/"+z(i.dataset.goto))});document.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;let s=document.activeElement;!s||!s.dataset||!s.dataset.goto||s.tagName==="A"||s.tagName==="BUTTON"||s.tagName==="INPUT"||(e.preventDefault(),location.hash="#/player/"+z(s.dataset.goto))});function Ls(e){let s=e.slice();for(let a=s.length-1;a>0;a--){let i=Math.floor(Math.random()*(a+1));[s[a],s[i]]=[s[i],s[a]]}return s}function $e(e,s){let a=document.getElementById(e);if(!a)return;let i=a.querySelector(".pick-btn"),c=a.querySelector(".pick-search"),p=[...a.querySelectorAll(".pick-opt")],m=a.querySelector(".pick-empty"),g=-1,n=()=>p.filter(w=>!w.classList.contains("hide")),l=w=>{let h=n();if(!h.length){g=-1;return}g=(w%h.length+h.length)%h.length,p.forEach(k=>k.classList.remove("hover")),h[g].classList.add("hover"),h[g].scrollIntoView({block:"nearest"})},o=w=>{let h=w.trim().toLowerCase(),k=0;p.forEach(M=>{let q=!h||M.dataset.name.toLowerCase().includes(h);M.classList.toggle("hide",!q),q&&k++}),m.classList.toggle("show",k===0),g=-1,k&&l(0)},r=()=>{document.querySelectorAll(".pick.open").forEach(w=>{if(w!==a){w.classList.remove("open");let h=w.querySelector(".pick-btn");h&&h.setAttribute("aria-expanded","false")}}),a.classList.add("open"),i.setAttribute("aria-expanded","true"),c.value="",o(""),requestAnimationFrame(()=>c.focus())},u=()=>{a.classList.remove("open"),i.setAttribute("aria-expanded","false")};i.addEventListener("click",()=>{a.classList.contains("open")?u():r()}),c.addEventListener("input",()=>o(c.value)),c.addEventListener("keydown",w=>{if(w.key==="ArrowDown")w.preventDefault(),l(g+1);else if(w.key==="ArrowUp")w.preventDefault(),l(g-1);else if(w.key==="Enter"){w.preventDefault();let h=n();h[g]&&h[g].click()}else w.key==="Escape"&&(u(),i.focus())}),p.forEach(w=>{w.addEventListener("click",()=>{a.dataset.value=w.dataset.name,a.querySelector(".pick-cur").textContent=w.dataset.name,u(),s()}),w.addEventListener("mousemove",()=>{let h=n().indexOf(w);h>=0&&h!==g&&(g=h,p.forEach(k=>k.classList.remove("hover")),w.classList.add("hover"))})})}document.addEventListener("click",e=>{document.querySelectorAll(".pick.open").forEach(s=>{if(!s.contains(e.target)){s.classList.remove("open");let a=s.querySelector(".pick-btn");a&&a.setAttribute("aria-expanded","false")}})});function Pe(e,s){let a=y("#cmp-wrap"),c=Z.players.slice().sort((f,L)=>(f.rank!=null?f.rank:9999)-(L.rank!=null?L.rank:9999)||f.name.localeCompare(L.name)).map(f=>f.name);if(c.length<2){a.innerHTML=`<div class="empty">${t("cmp.notEnough")}</div>`;return}let p=f=>f[Math.floor(Math.random()*f.length)],m=f=>p(c.filter(L=>L!==f)),g=V[e]?e:p(c),n=V[s]?s:m(g);n===g&&(n=m(g)),(g!==e||n!==s)&&history.replaceState(null,"","#/compare/"+z(g)+"/"+z(n));let l=V[g],o=V[n],r=U.find(f=>f.name===g),u=U.find(f=>f.name===n),w=ae(l.glicko,o.glicko,o.rd),h=ae(o.glicko,l.glicko,l.rd),k=Math.round(w/(w+h)*1e3)/10,M=Math.round(1e3-k*10)/10,q=Q().filter(f=>f.a===g&&f.b===n||f.a===n&&f.b===g).map(f=>{let L=f.a===g,S=L?f.sa:f.sb,A=L?f.sb:f.sa;return{fa:S,fb:A,res:S>A?"W":S<A?"L":"D",date:f.date}}),N=q.reduce((f,L)=>(L.res==="W"?f.w++:L.res==="L"?f.l++:f.d++,f),{w:0,l:0,d:0}),I=Ls(c),d=(f,L,S)=>`
    <div class="pick" id="${f}" data-value="${x(L)}">
      <button type="button" class="pick-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="${x(S)}">
        <span class="pick-cur">${x(L)}</span>
        <svg class="pick-caret" width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true"><path d="M1.2 1.2 5.5 5.6 9.8 1.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="pick-menu">
        <input class="pick-search" type="text" autocomplete="off" spellcheck="false"
          placeholder="${t("cmp.searchPlaceholder")}" aria-label="${x(S)}">
        <div class="pick-list" role="listbox" aria-label="${x(S)}">
          ${I.map(A=>{let G=V[A];return`<button type="button" class="pick-opt${A===L?" on":""}" role="option" data-name="${x(A)}" aria-selected="${A===L?"true":"false"}">
              <span class="pick-n">${x(A)}</span>
              <span class="pick-meta mono">${G&&G.rating!=null?G.rating.toFixed(1):""}</span>
            </button>`}).join("")}
          <div class="pick-empty">${t("cmp.noResults")}</div>
        </div>
      </div>
    </div>`,$=(f,L,S,A,G)=>`
    <div class="cmp-trow">
      <div class="va mono${A?" win":""}">${L}</div>
      <div class="k">${f}</div>
      <div class="vb mono${G?" win":""}">${S}</div>
    </div>`,v='<span style="color:var(--dimmer)">\u2014</span>';a.innerHTML=`
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
        <div class="cmp-sub">${r?t("cmp.rankN",{n:r.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${z(g)}">${x(g)}</a></div>
        <div class="cmp-rating mono">${l.provisional?Mt(l):l.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",l.matches,{rd:l.rd.toFixed(1)})}</div>
      </div>
      <div class="cmp-vs">
        <div class="vs-mark">${t("cmp.vsMark")}</div>
        <div class="mono" style="font-size:11px;color:var(--dimmer)">${t("cmp.h2hShort",{n:q.length})}</div>
      </div>
      <div class="cmp-side b">
        <div class="cmp-sub">${u?t("cmp.rankN",{n:u.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${z(n)}">${x(n)}</a></div>
        <div class="cmp-rating mono">${o.provisional?Mt(o):o.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",o.matches,{rd:o.rd.toFixed(1)})}</div>
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.probTitle")} <span class="n">${t("cmp.probSub")}</span></h3>
      <div class="cmp-prob-labels">
        <span style="color:var(--gold)">${x(g)} ${k.toFixed(1)}%</span>
        <span style="color:var(--blue)">${M.toFixed(1)}% ${x(n)}</span>
      </div>
      <div class="cmp-probbar"><i class="pa" style="width:${k}%"></i><i class="pb" style="width:${M}%"></i></div>
      <div class="cmp-prob-note">${t("cmp.probNote")}</div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.tale")}</h3>
      <div class="cmp-table">
        ${$(t("cmp.rating"),jt(l),jt(o),!l.provisional&&l.rating>o.rating,!o.provisional&&o.rating>l.rating)}
        ${$(t("cmp.rank"),r?"#"+r.rank:v,u?"#"+u.rank:v,r&&u&&r.rank<u.rank,r&&u&&u.rank<r.rank)}
        ${$(t("cmp.rdUnc"),l.rd.toFixed(1),o.rd.toFixed(1),l.rd<o.rd,o.rd<l.rd)}
        ${$(t("cmp.glicko"),l.glicko.toFixed(1),o.glicko.toFixed(1),l.glicko>o.glicko,o.glicko>l.glicko)}
        ${$(t("cmp.record"),`<span style="color:var(--green)">${l.w}${F("W")}</span> <span style="color:var(--red)">${l.l}${F("L")}</span> ${l.d}${F("D")}`,`<span style="color:var(--green)">${o.w}${F("W")}</span> <span style="color:var(--red)">${o.l}${F("L")}</span> ${o.d}${F("D")}`,l.winPct>o.winPct,o.winPct>l.winPct)}
        ${$(t("cmp.winRate"),l.winPct+"%",o.winPct+"%",l.winPct>o.winPct,o.winPct>l.winPct)}
        ${$(t("cmp.matchesPlayed"),l.matches,o.matches,!1,!1)}
        ${$(t("cmp.uniqueOpp"),l.opponents,o.opponents,l.opponents>o.opponents,o.opponents>l.opponents)}
        ${$(t("cmp.avgOppRating"),l.avgOpp.toFixed(1),o.avgOpp.toFixed(1),l.avgOpp>o.avgOpp,o.avgOpp>l.avgOpp)}
        ${$(t("cmp.h2h"),`${N.w}${F("W")} \u2013 ${N.l}${F("L")} \u2013 ${N.d}${F("D")}`,`${N.l}${F("W")} \u2013 ${N.w}${F("L")} \u2013 ${N.d}${F("D")}`,N.w>N.l,N.l>N.w)}
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.prevMeetings")} <span class="n">${tp("cmp.meetings",q.length)}</span></h3>
      <div class="match-list">
        ${q.map(f=>`
          <div class="match-row">
            <div class="res-chip ${f.res}">${F(f.res)}</div>
            <div class="who">${x(g)}</div>
            <div class="score mono">${f.fa} \u2013 ${f.fb}</div>
            <div class="who opp"><a href="#/player/${z(n)}" style="color:var(--blue)">${x(n)}</a></div>
            <div class="date mono" title="${Te(f.date)}">${tt(f.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("cmp.neverMet")}</div>`}
      </div>
      <div class="caption" style="margin-top:12px">${t("cmp.legacyNote")}</div>
    </div>`;let b=()=>{let f=y("#cmp-a").dataset.value,L=y("#cmp-b").dataset.value,S="#/compare/"+z(f)+"/"+z(L);location.hash!==S&&(oe=!0,location.hash=S),Pe(f,L)};$e("cmp-a",b),$e("cmp-b",b),y("#cmp-swap").addEventListener("click",()=>{let f=y("#cmp-a"),L=y("#cmp-b"),S=f.dataset.value;f.dataset.value=L.dataset.value,L.dataset.value=S,b()}),y("#cmp-copy").addEventListener("click",()=>{let f=location.href.split("#")[0]+"#/compare/"+z(g)+"/"+z(n),L=()=>{y("#cmp-copy-msg").textContent=t("cmp.linkCopied")};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(f).then(L,()=>{y("#cmp-copy-msg").textContent=f}):y("#cmp-copy-msg").textContent=f})}var oe=!1;function Ms(e){let s=window.lbCards||{},a=s.ratingSeries?s.ratingSeries(e):null;if(!a||a.length<3)return"";let i=V[e],c=Math.max(i.rating,...a.map(l=>l.r)),p=Tt(e).slice().reverse(),m=0,g=0;for(let l of p)l.res==="W"?(g++,g>m&&(m=g)):g=0;let n=[20,50,100].filter(l=>a.length>l);return`
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
        <div class="rc-stat"><span class="ric ic-star"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.45 6.2 20.5l1.1-6.45-4.7-4.6 6.5-.95z"/></svg></span><div class="tx"><div class="k">${t("chart.peak")}</div><div class="v mono">${c.toFixed(1)}</div></div></div>
        <div class="rc-stat"><span class="ric ic-fire"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2s1.2 3.2-1 6.2c-2 2.7-4.6 4.3-4.6 8A7.6 7.6 0 0 0 12 22a7.6 7.6 0 0 0 5.6-5.8c0-2.6-1.3-4.3-2.3-6-.4 1.2-1.2 2-2.2 2.3.9-2.9.2-7.4-.9-10.5z"/></svg></span><div class="tx"><div class="k">${t("chart.streak")}</div><div class="v mono ${m>0?"up":""}">${m>0?"+"+m:"\u2014"}</div></div></div>
      </div>
      <div class="hist-wrap"><svg class="rating-chart" viewBox="0 0 900 330" role="img" aria-label="${t("pl.history")}"></svg></div>
      <div class="rc-legend">
        <span class="lg-item"><span class="lg-dots"><span class="lg-dot"></span><span class="lg-dot down"></span></span>${t("chart.perGame")}</span>
        <button class="toggle-btn rc-trend" aria-pressed="false">
          <span class="sw" aria-hidden="true"></span>
          <span>${t("chart.showTrend")}</span>
        </button>
      </div>
    </div>`}function Ss(e){let s=document.querySelector(".pv-lower .rating-chart");if(!s)return;let a=window.lbCards||{},i=a.ratingSeries?a.ratingSeries(e):null;if(!i||i.length<3)return;let c="http://www.w3.org/2000/svg",p=900,m=330,g=56,n=18,l=18,o=58,r="all",u=!1,w=null,h=matchMedia("(prefers-reduced-motion: reduce)").matches,k=(b,f)=>{let L=document.createElementNS(c,b);for(let S in f)L.setAttribute(S,f[S]);return L},M=(b,f,L)=>{let A=(f-b||1)/L,G=Math.pow(10,Math.floor(Math.log10(A))),H=[1,2,2.5,5,10].map(W=>W*G).find(W=>W>=A)||10*G,_=[];for(let W=Math.ceil(b/H)*H;W<=f+1e-9;W+=H)_.push(W);return _},q=()=>((!w||!w.isConnected)&&(w=document.getElementById("rc-tip"),w||(w=document.createElement("div"),w.id="rc-tip",w.className="x-tip",document.body.appendChild(w))),w),N=(b,f,L)=>{let S=q();S.innerHTML=b,S.classList.add("show");let A=s.getBoundingClientRect(),G=S.offsetWidth,H=S.offsetHeight,_=f+16,W=L-H-14;_+G>A.right-8&&(_=f-G-16),W<A.top+8&&(W=L+18),_=Math.max(A.left+8,Math.min(_,A.right-G-8)),W=Math.max(A.top+8,Math.min(W,A.bottom-H-8)),S.style.left=_+"px",S.style.top=W+"px"},I=()=>{w&&w.classList.remove("show")};function d(){let b=r==="all"?i.slice():i.slice(-r),f=i.length-b.length,L=b.map(T=>T.r),S=Math.min(...L),A=Math.max(...L),G=(A-S)*.12||6;S-=G,A+=G;let H=T=>g+T/Math.max(1,b.length-1)*(p-g-n),_=T=>l+(1-(T-S)/(A-S))*(m-l-o);s.innerHTML="";for(let T of M(S,A,5)){s.appendChild(k("line",{x1:g,x2:p-n,y1:_(T).toFixed(1),y2:_(T).toFixed(1),class:"rc-grid"}));let R=k("text",{x:g-8,y:(_(T)+3.5).toFixed(1),class:"rc-lbl"});R.textContent=Math.round(T),s.appendChild(R)}let W=k("clipPath",{id:"rh-reveal"}),Yt=k("rect",{x:0,y:0,width:p,height:m});W.appendChild(Yt),s.appendChild(W);let mt=k("g",{"clip-path":"url(#rh-reveal)"});s.appendChild(mt);let fe=(m-o).toFixed(1);for(let T=1;T<b.length;T++){let R=b[T].r>=b[T-1].r?"up":"down",Y=H(T-1),O=H(T),K=_(b[T-1].r),st=_(b[T].r);mt.appendChild(k("path",{d:`M${Y.toFixed(1)} ${fe} L${Y.toFixed(1)} ${K.toFixed(1)} L${O.toFixed(1)} ${st.toFixed(1)} L${O.toFixed(1)} ${fe} Z`,class:`rc-seg-area ${R}`})),mt.appendChild(k("path",{d:`M${Y.toFixed(1)} ${K.toFixed(1)} L${O.toFixed(1)} ${st.toFixed(1)}`,class:`rc-seg ${R}`}))}if(u){let T=Math.max(3,Math.round(b.length/10)),R=b.map((Y,O)=>{let K=0,st=0;for(let rt=Math.max(0,O-T+1);rt<=O;rt++)K+=b[rt].r,st++;return K/st});mt.appendChild(k("path",{d:R.map((Y,O)=>(O?"L":"M")+H(O).toFixed(1)+" "+_(Y).toFixed(1)).join(" "),class:"rc-trend-line"}))}let Ue=b.length>90?Math.ceil(b.length/90):1;b.forEach((T,R)=>{if(R%Ue&&R!==b.length-1)return;let Y=R===0?b[1].r>=b[0].r:T.r>=b[R-1].r;mt.appendChild(k("circle",{cx:H(R).toFixed(1),cy:_(T.r).toFixed(1),r:2.6,class:`rc-dot-static ${Y?"up":"down"}`}))});let me=Math.min(6,b.length),ge=[];for(let T=0;T<me;T++)ge.push(Math.round(T/Math.max(1,me-1)*(b.length-1)));for(let T of ge){let R=T===0?"start":T===b.length-1?"end":"middle",Y=k("text",{x:H(T).toFixed(1),y:m-o+24,class:"rc-lbl rc-x1","text-anchor":R});Y.textContent=t("chart.gameN",{n:f+T+1}),s.appendChild(Y);let O=k("text",{x:H(T).toFixed(1),y:m-o+40,class:"rc-lbl rc-x2","text-anchor":R});O.textContent=tt(b[T].date),s.appendChild(O)}let nt=k("g",{class:"rc-cross",style:"display:none"});nt.appendChild(k("line",{x1:0,x2:0,y1:l,y2:m-o,class:"rc-cross-line"})),nt.appendChild(k("circle",{cx:0,cy:0,r:6.5,class:"rc-cross-dot"})),s.appendChild(nt);let zt=k("rect",{x:g,y:l,width:p-g-n,height:m-l-o,class:"rc-overlay"});if(s.appendChild(zt),!h){Yt.setAttribute("width",0);let T=performance.now(),R=Y=>{let O=Math.min(1,(Y-T)/900);Yt.setAttribute("width",(p*(1-Math.pow(1-O,3))).toFixed(1)),O<1&&requestAnimationFrame(R)};requestAnimationFrame(R)}let Jt=0,qt=null,We=T=>{let R=s.getBoundingClientRect(),Y=(T.clientX-R.left)/R.width*p,O=Math.round((Y-g)/(p-g-n)*(b.length-1));O=Math.max(0,Math.min(b.length-1,O));let K=b[O];nt.style.display="";let st=nt.children[0],rt=nt.children[1];st.setAttribute("x1",H(O).toFixed(1)),st.setAttribute("x2",H(O).toFixed(1)),rt.setAttribute("cx",H(O).toFixed(1)),rt.setAttribute("cy",_(K.r).toFixed(1));let be=O>0?b[O-1].r:i[f+O-1]?i[f+O-1].r:null,Vt=[t("chart.hashN",{n:f+O+1}),`${t("chart.ratingLabel")}: ${K.r.toFixed(1)}`];if(be!=null){let Qt=K.r-be,Kt=Qt>.05,Zt=Qt<-.05,Ye=Kt?"var(--green)":Zt?"var(--red)":"var(--dim)",ze=Kt?"\u25B2":Zt?"\u25BC":"\u2014",Je=Kt?"+":Zt?"-":"";Vt.push(`<span style="color:${Ye}">${ze} ${Je}${Math.abs(Qt).toFixed(1)} ${t("chart.deltaWord")}</span>`)}K.date&&Vt.push(tt(K.date)),N(Vt.join(`
`),R.left+H(O)/p*R.width,R.top+_(K.r)/m*R.height)},Ge=T=>{qt=T,!Jt&&(Jt=requestAnimationFrame(()=>{if(Jt=0,qt){let R=qt;qt=null,We(R)}}))};zt.addEventListener("mousemove",Ge),zt.addEventListener("mouseleave",()=>{nt.style.display="none",I()})}d();let $=s.closest(".panel");$.querySelectorAll(".rc-range-btn").forEach(b=>{b.addEventListener("click",()=>{$.querySelectorAll(".rc-range-btn").forEach(f=>f.classList.remove("on")),b.classList.add("on"),r=b.dataset.range==="all"?"all":parseInt(b.dataset.range,10),I(),d()})});let v=$.querySelector(".rc-trend");v&&v.addEventListener("click",()=>{u=!u,v.classList.toggle("on",u),v.setAttribute("aria-pressed",String(u)),I(),d()})}function Es(e){let s=V[e],a=y("#page-player");if(!s){a.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("pl.notFound",{name:x(e)})}</div></div></div>`;return}let i=U.find(r=>r.name===e),c=Tt(e),p=c.slice(0,10),m=Se(e),g=Math.max(3,Math.min(100,100-s.rd/120*100)),n=(typeof window.lbTankFor=="function"?window.lbTankFor(e):null)||(window.LB_TANKS||{})[e]||(window.LB_TANKS_SNAPSHOT||{})[e]||null,l=n&&n.lastLogin?Ce(n.lastLogin):"",o=n&&n.lastLogin?qe(n.lastLogin):"";a.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">${t("pl.back")}</a>
    <div class="pv-layout">
    <div class="pv-main">
    <div class="player-hero anim">
      <div class="player-top">
        ${i?Bt(i.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${x(s.name)}</div>
          ${es(s.name)}
          <button class="pc-share pv-share" data-share="link" data-target="profile" data-name="${x(s.name)}"><svg class="pc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg><span>${t("cards.shareLink")}</span></button>
          <div class="player-rankline">
            ${i?t("pl.rankedOf",{rank:i.rank,total:U.length}):t("pl.unranked")}
            ${s.provisional?` \xB7 <span class="tag prov">${t("tag.provisional")}</span>`:""}
            ${s.inactive?` \xB7 <span class="tag inact">${t("tag.inactive")}</span>`:""}
            ${l?` \xB7 <span class="pv-seen" title="${x(o)}">${t("cards.lastSeen")} ${x(l)}</span>`:""}
          </div>
        </div>
        <div class="player-rating-block">
          <div class="lbl">${s.provisional?t("pl.estRange"):t("pl.visible")}</div>
          <div class="big mono${s.provisional?" prov-range":""}" id="pv-rating">${s.provisional?Mt(s):"0"}</div>
          ${Dt(s)}
          <div class="rd-bar">
            <div class="bar-track"><div class="bar-fill" style="width:${g}%"></div></div>
            <div class="caption"><span>${t("pl.certainty")}</span><span class="mono">RD ${s.rd.toFixed(1)}</span></div>
          </div>
        </div>
      </div>
      <div class="pstat-grid">
        <div class="pstat"><div class="k">${t("pl.glicko")}</div><div class="v mono">${s.glicko.toFixed(1)}</div></div>
        <div class="pstat"><div class="k">${t("pl.matches")}</div><div class="v mono">${s.matches}</div></div>
        <div class="pstat"><div class="k">${t("pl.record")}</div><div class="v mono" style="font-size:19px"><span style="color:var(--green)">${s.w}${F("W")}</span> <span style="color:var(--red)">${s.l}${F("L")}</span> <span style="color:var(--dim)">${s.d}${F("D")}</span></div></div>
        <div class="pstat"><div class="k">${t("pl.winRate")}</div><div class="v mono">${s.winPct}%</div></div>
        <div class="pstat"><div class="k">${t("pl.opponents")}</div><div class="v mono">${s.opponents}</div></div>
        <div class="pstat"><div class="k">${t("pl.avgOppRating")}</div><div class="v mono">${s.avgOpp.toFixed(1)}</div></div>
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.recentForm")} <span class="n">${t("pl.lastN",{n:Math.min(10,c.length)})}</span></h3>
      <div class="form-strip">
        ${p.map((r,u)=>`<div class="form-pill ${r.res}" style="animation-delay:${u*55}ms"
           title="${t("pl.vsOpp",{opp:x(r.opp)})} ${r.for_}-${r.against}">${F(r.res)}</div>`).join("")||`<span class="empty">${t("pl.noGames")}</span>`}
      </div>
    </div>
    </div>
    <div class="pv-side">${typeof cardsHeroHTML=="function"?cardsHeroHTML(e):""}</div>
    </div>

    <div class="pv-lower">
    ${Ms(e)}
    <div class="panel reveal">
      <h3>${t("pl.matchHistory")} <span class="n">${tp("pl.nGames",c.length)}</span></h3>
      <div class="match-list">
        ${c.map(r=>`
          <div class="match-row">
            <div class="res-chip ${r.res}">${F(r.res)}</div>
            <div class="who">${x(s.name)}</div>
            <div class="score mono">${r.for_} \u2013 ${r.against}</div>
            <div class="who opp"><a href="#/player/${z(r.opp)}" style="color:var(--blue)">${x(r.opp)}</a></div>
            <div class="date mono" title="${Te(r.date)}">${tt(r.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.h2h")} <span class="n">${tp("pl.nOpponents",m.length)}</span></h3>
      <div class="h2h-grid">
        ${m.map(r=>`
          <div class="h2h-card" data-goto="${x(r.opp)}" tabindex="0" role="link">
            <div class="opp">${x(r.opp)}</div>
            <div class="rec mono"><span class="w">${r.w}${F("W")}</span> \xB7 <span class="l">${r.l}${F("L")}</span> \xB7 <span>${r.d}${F("D")}</span> \xB7 ${t("pl.pts",{pf:r.pf,pa:r.pa})}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>
    </div>
  </div>`,s.provisional||Pt(y("#pv-rating"),s.rating,{dec:1,dur:900}),typeof cardsMountAll=="function"&&cardsMountAll(a),Ss(e),Wt()}var re="",ce="all";function Ts(){return Q().filter(e=>{if(ce==="dated"&&!e.date||ce==="legacy"&&e.date)return!1;if(!re)return!0;let s=re;return e.a.toLowerCase().includes(s)||e.b.toLowerCase().includes(s)||`${e.sa}-${e.sb}`.includes(s)||`${e.sb}-${e.sa}`.includes(s)||e.date&&(e.date.includes(s)||tt(e.date).toLowerCase().includes(s))||s==="legacy"&&!e.date})}function qs(e){return e.map(s=>{let a=s.sa>s.sb,i=s.sb>s.sa;return`
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
    </div>`}).join("")||`<div class="empty">${t("matches.noResults")}</div>`}function ue(){let e=y("#gm-body"),s=Ts();y("#gm-count").textContent=tp("gm.count",s.length),e.innerHTML=qs(s)}function Cs(){Ie(),ue()}y("#gm-search")&&y("#gm-search").addEventListener("input",e=>{re=e.target.value.trim().toLowerCase(),ue()});document.querySelectorAll("#gm-filters [data-scope]").forEach(e=>{e.addEventListener("click",()=>{ce=e.dataset.scope,document.querySelectorAll("#gm-filters [data-scope]").forEach(s=>s.classList.toggle("on",s===e)),ue()})});function As(){let e=Z.players.filter(s=>s.provisional).sort((s,a)=>a.rating-s.rating);y("#roster-grid").innerHTML=e.map(s=>{let a=Math.min(100,Math.round(Math.min(1,s.matches/5)*50+Math.min(1,s.opponents/3)*50));return`
    <div class="roster-card reveal" data-goto="${x(s.name)}" tabindex="0" role="link">
      <div class="top">
        <div class="nm">${x(s.name)}</div>
        <svg class="shield" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"/></svg>
      </div>
      <div class="rating"><span class="unit">${t("roster.estRange")}</span><span class="big prov-range">${Mt(s)}</span></div>
      <div class="req-row"><span>${t("roster.matches")}</span><span class="${s.matches>=5?"ok":""}">${s.matches} / 5 ${s.matches>=5?"\u2713":""}</span></div>
      <div class="req-row"><span>${t("roster.opponents")}</span><span class="${s.opponents>=3?"ok":""}">${s.opponents} / 3 ${s.opponents>=3?"\u2713":""}</span></div>
      <div class="prog-track"><div class="prog-fill" data-w="${a}"></div></div>
      <div class="prog-label">${t("roster.progress",{pct:a})}</div>
    </div>`}).join(""),requestAnimationFrame(()=>B("#roster-grid .prog-fill").forEach(s=>{s.style.width=s.dataset.w+"%"}))}var It="all",dt=0;function Rs(){if(It==="all")return Q();let e=Date.now(),s=Number(It);return Q().filter(a=>a.date&&(e-Date.parse(a.date))/864e5<=s)}function he(){let e=Z.players,s=Rs(),a=It!=="all",i,c;if(!a)i=U.filter(v=>v.matches>=dt).sort((v,b)=>b.winPct-v.winPct).slice(0,10),c=e.filter(v=>v.matches>=dt).sort((v,b)=>b.matches-v.matches).slice(0,10);else{let v={};s.forEach(f=>{[f.a,f.b].forEach(L=>{let S=v[L]=v[L]||{name:L,w:0,l:0,d:0,matches:0};S.matches+=1}),f.sa===f.sb?(v[f.a].d+=1,v[f.b].d+=1):f.sa>f.sb?(v[f.a].w+=1,v[f.b].l+=1):(v[f.a].l+=1,v[f.b].w+=1)});let b=Object.values(v).map(f=>({...f,winPct:f.matches?Math.round(f.w/f.matches*1e3)/10:0})).filter(f=>f.matches>=Math.max(dt,1));i=b.slice().sort((f,L)=>L.winPct-f.winPct).slice(0,10),c=b.slice().sort((f,L)=>L.matches-f.matches).slice(0,10)}let p=[];s.forEach(v=>{let b=V[v.a],f=V[v.b];if(!b||!f)return;let L=b.rating-f.rating;if(v.sa===v.sb)return;let S=v.sa>v.sb?v.a:v.b,A=Math.abs(L);(L<0&&S===v.a||L>0&&S===v.b)&&p.push({winner:S,loser:S===v.a?v.b:v.a,gap:A,score:S===v.a?`${v.sa}-${v.sb}`:`${v.sb}-${v.sa}`})}),p.sort((v,b)=>b.gap-v.gap);let m={};s.forEach(v=>{let b=[v.a,v.b].sort().join(" vs ");m[b]=(m[b]||0)+1});let g=Object.entries(m).sort((v,b)=>b[1]-v[1]).slice(0,10),n=e.filter(v=>v.matches>=dt).map(v=>v.rating),l=n.length?Math.min(...n):Math.min(...e.map(v=>v.rating)),o=n.length?Math.max(...n):Math.max(...e.map(v=>v.rating)),r=8,u=(o-l)/r||1,w=Array.from({length:r},()=>0);n.forEach(v=>{w[Math.min(r-1,Math.max(0,Math.floor((v-l)/u)))]++});let h=Math.max(...w,1),k=w.map((v,b)=>{let f=Math.round((l+b*u)/10)*10,L=Math.round((l+(b+1)*u)/10)*10;return`
    <div class="hcol" title="${tp("an.histTip",v,{lo:f,hi:L})}">
      <div class="hbar" data-h="${Math.round(v/h*100)}"></div>
      <div class="hlbl">${f}\u2013${L}</div>
    </div>`}).join(""),M=e.filter(v=>v.matches>=dt).sort((v,b)=>b.opponents-v.opponents).slice(0,8),q=Math.max(...M.map(v=>v.opponents),1),N=M.map(v=>`
    <div class="mrow reveal" data-goto="${x(v.name)}" tabindex="0" role="link">
      <div class="nm">${x(v.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(v.opponents/q*100)}"></div></div>
      <div class="val mono">${v.opponents}</div>
    </div>`).join(""),I=(v,b,f)=>v.map((L,S)=>`
    <div class="an-row reveal" data-goto="${x(L.name)}" tabindex="0" role="link">
      <div class="idx mono">${S+1}</div>
      <div class="nm">${x(L.name)}</div>
      <div class="val mono">${b(L)}</div>
      <div class="unit mono">${f(L)}</div>
    </div>`).join(""),d=v=>tp("an.nMatches",v.matches);y("#an-grid").innerHTML=`
    <div class="an-panel">
      <div class="head"><h3>${t("an.topWinRate")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${I(i,v=>v.winPct+"%",d)}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.mostActive")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/></svg>
      </div>
      ${I(c,v=>v.matches,v=>t("an.matchesUnit"))}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.biggestUpsets")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${p.length?p.slice(0,8).map((v,b)=>`
        <div class="an-row reveal" data-goto="${x(v.winner)}" tabindex="0" role="link" aria-label="${x(v.winner)}">
          <div class="idx mono">${b+1}</div>
          <div class="nm"><span class="an-link">${x(v.winner)}</span> <span class="an-def">${t("an.def")}</span> <span class="an-link alt" data-goto="${x(v.loser)}">${x(v.loser)}</span></div>
          <div class="val mono">${v.score}</div>
          <div class="unit mono">${t("an.plusPts",{n:Math.round(v.gap)})}</div>
        </div>`).join(""):`<div class="empty">${t("an.noUpsets")}</div>`}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.rivalries")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${g.map(([v,b],f)=>{let[L,S]=v.split(" vs ");return`
        <a class="an-row reveal" href="#/compare/${z(L)}/${z(S)}" title="${t("an.openCmp")}">
          <div class="idx mono">${f+1}</div>
          <div class="nm"><span class="an-link">${x(L)}</span> <span class="an-def">${t("vs")}</span> <span class="an-link">${x(S)}</span></div>
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
      ${N}
    </div>`;let $=()=>{B("#an-grid .hbar").forEach(v=>{v.style.height=v.dataset.h+"%"}),B("#an-grid .abar").forEach(v=>{v.style.width=v.dataset.w+"%"})};requestAnimationFrame($),setTimeout($,140),Wt()}document.querySelectorAll("#an-controls [data-an-range]").forEach(e=>{e.addEventListener("click",()=>{It=e.dataset.anRange==="all"?"all":Number(e.dataset.anRange),document.querySelectorAll("#an-controls [data-an-range]").forEach(s=>s.classList.toggle("on",s===e)),he()})});document.querySelectorAll("#an-controls [data-an-min]").forEach(e=>{e.addEventListener("click",()=>{dt=Number(e.dataset.anMin),document.querySelectorAll("#an-controls [data-an-min]").forEach(s=>s.classList.toggle("on",s===e)),he()})});function Os(){y("#settings-body").innerHTML=je().map(e=>`
    <tr><td><b>${x(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${x(e.desc)}</div></td>
        <td class="val">${x(String(e.value))}</td></tr>`).join("")}function Fs(){return Array.from({length:11},(e,s)=>({q:t("faq.q"+(s+1)),a:t("faq.a"+(s+1))}))}function Nt(){let e=J().faq;return Array.isArray(e)&&e.length?e:Fs()}function Ns(){let e=window.cardsTiers;if(!e)return"";let{TIER_KEYS:s,tierOf:a,tierIdx:i,tierMin:c,tierLabel:p,crestSVG:m}=e,g={};s.forEach(o=>{g[o]=0}),(Z.players||[]).forEach(o=>{o&&o.rating!=null&&(g[a(o.rating)]+=1)});let n=s.reduce((o,r)=>o+g[r],0),l=s.slice().reverse().map(o=>{let r=i(o),u=c(o),w=s[r+1]!=null?c(s[r+1]):null,h=r===0?`&lt; ${Math.round(w)}`:w!=null?`${Math.round(u)}\u2013${Math.round(w)-1}`:`${Math.round(u)}+`,k=n?g[o]/n*100:0;return`
      <tr class="tier-${o}">
        <td class="fd-badge"><span class="fd-badge-in">${m(o)}<span class="fd-name">${p(o)}</span></span></td>
        <td class="fd-range mono">${h}</td>
        <td class="fd-count"><b class="mono">${g[o]}</b><i style="width:${k.toFixed(1)}%"></i></td>
      </tr>`}).join("");return`
    <p class="fd-note">${t("faq.distNote")}</p>
    <table class="fd-table">
      <thead><tr><th>${t("faq.distBadge")}</th><th>${t("faq.distRange")}</th><th>${t("faq.distPlayers")}</th></tr></thead>
      <tbody>${l}</tbody>
    </table>`}function js(){let e='<svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',s=(a,i,c)=>`
    <div class="faq-item reveal" data-faq="${c}">
      <button class="faq-q" aria-expanded="false">
        <span>${a}</span>
        ${e}
      </button>
      <div class="faq-a"><div class="faq-a-in">${i}</div></div>
    </div>`;y("#faq-list").innerHTML=s(x(t("faq.distTitle")),Ns(),"dist")+Nt().map((a,i)=>s(x(String(a.q||"")),x(String(a.a||"")),i)).join(""),Wt()}document.addEventListener("click",e=>{let s=e.target.closest(".faq-q");if(!s)return;let a=s.closest(".faq-item"),i=a.classList.contains("open");B(".faq-item.open").forEach(c=>{c.classList.remove("open"),c.querySelector(".faq-q").setAttribute("aria-expanded","false")}),i||(a.classList.add("open"),s.setAttribute("aria-expanded","true"))});function pt(){let e=y("#admin-wrap");if(!os()){e.innerHTML=`
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
    </div>`;let n=async()=>{let l=y("#admin-pw").value;try{let o=await fetch(ls,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:l})});if(o.ok){let r=await o.json().catch(()=>({}));rs(r.token||l,y("#admin-remember").checked),pt(),C("Welcome back, commander.");return}if(o.status===429){C("Too many attempts \u2014 wait a few minutes.");return}}catch{}y("#admin-pw").style.borderColor="var(--red)",C("Wrong password.")};y("#admin-auth").addEventListener("click",n),y("#admin-pw").addEventListener("keydown",l=>{l.key==="Enter"&&n()});return}let a=J(),i='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',c=a.inactive.map(n=>`
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

  <datalist id="player-list">${Z.players.map(n=>`<option value="${x(n.name)}">`).join("")}</datalist>`,y("#admin-lock").addEventListener("click",()=>{cs(),pt()}),y("#admin-publish").addEventListener("click",()=>p()),y("#admin-sync").addEventListener("click",async()=>{let n=y("#admin-sync"),l=y("#admin-sync-status");n.disabled=!0,l.textContent="syncing\u2026";try{let o=await fetch(ds,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:yt()})}),r=await o.json().catch(()=>({}));o.ok&&r.ok?(l.textContent=r.changed?`synced \u2713 ${r.matches} matches / ${r.players} players`:"already up to date \u2713",C(r.changed?"Sheet synced \u2014 the live site was updated.":"Site already matches the sheet.")):o.status===429?(l.textContent="rate limited",C("Too many attempts \u2014 wait a few minutes.")):(l.textContent="sync failed",C("Sync failed: "+(r.error||o.status)))}catch{l.textContent="network error",C("Sync failed (network).")}n.disabled=!1});async function p(n){let l=!!(n&&n.silent),o=yt()||(l?"":(window.prompt("Admin password:")||"").trim());if(!o){C(l?'Saved here \u2014 auto-publish needs a stored password. Use "Publish to everyone".':"Publish cancelled.");return}se=!0;let r=J(),u={},w=[];for(let[M,q]of Object.entries(r.matchEdits||{}))M.startsWith("a:")&&(u[M]=q);for(let M of r.matchRemoved||[])M.startsWith("a:")&&w.push(M);let h=Q().filter(M=>M.admin).map(M=>({a:M.a,b:M.b,sa:M.sa,sb:M.sb,date:M.date||""})),k={matches:h,aliases:r.aliases||{},aliasNotes:r.aliasNotes||{},aliasRemoved:r.aliasRemoved||[],inactive:r.inactive||[],seeds:r.seeds||{},seedGlicko:r.seedGlicko||{},seedRd:r.seedRd||{},seedRemoved:r.seedRemoved||[],settings:r.settings||{},matchEdits:u,matchRemoved:w,faq:r.faq!=null?r.faq:[]};try{let M=await fetch(Et,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:o,doc:k,message:`Publish match log (${h.length} matches)`})}),q=await M.json().catch(()=>({}));if(!M.ok||!q.ok){M.status===403&&sessionStorage.removeItem(ot),C("Publish failed: "+(q.error||"HTTP "+M.status));return}window.LB_PUB=k,window.LB_LOG=h,ps([]),ct({}),Lt(),l||pt(),C(l?"Saved \u2014 live for everyone \u2713":"Published! Everyone sees it on their next visit.")}catch{C("Publish failed: network error.")}finally{se=!1}}y("#admin-export").addEventListener("click",()=>{let n=new Blob([JSON.stringify(Oe(),null,2)],{type:"application/json"}),l=document.createElement("a");l.href=URL.createObjectURL(n),l.download="match-log.json",l.click(),URL.revokeObjectURL(l.href),C("Log exported.")}),y("#ov-inact-toggle").addEventListener("click",()=>{let n=y("#ov-inact-n").value.trim();if(!n){C("Type a player name first.");return}let l=lt(),o=J().inactive||[],r=o.includes(n)?o.filter(u=>u!==n):[...o,n];ct({...l,inactive:r}),Lt(),pt(),C(r.includes(n)?`${n} marked inactive.`:`${n} marked active again.`)}),y("#ov-inact-list").addEventListener("click",n=>{let l=n.target.closest("[data-inact-del]");if(!l)return;let o=lt();ct({...o,inactive:(J().inactive||[]).filter(r=>r!==l.dataset.inactDel)}),Lt(),pt()});let m=()=>{let n=Nt();y("#faq-admin-list").innerHTML=n.map((l,o)=>`
      <div class="log-item fix-row" data-faq-idx="${o}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${x(String(l.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${x(String(l.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${o}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${o}" title="Delete question">${i}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};m(),y("#faq-admin-list").addEventListener("click",n=>{let l=n.target.closest("[data-faq-save]"),o=n.target.closest("[data-faq-del]"),r=Nt().map(w=>({...w}));if(l){let w=l.closest("[data-faq-idx]");r[parseInt(l.dataset.faqSave,10)]={q:w.querySelector('[data-fq="q"]').value.trim(),a:w.querySelector('[data-fq="a"]').value.trim()}}else if(o)r.splice(parseInt(o.dataset.faqDel,10),1);else return;let u=lt();ct({...u,faq:r}),m(),C("Q&A updated \u2014 publish to make it public.")}),y("#faq-add").addEventListener("click",()=>{let n=y("#faq-new-q").value.trim(),l=y("#faq-new-a").value.trim();if(!n||!l){C("Fill in both the question and the answer.");return}let o=lt();ct({...o,faq:[...Nt().map(r=>({...r})),{q:n,a:l}]}),m(),C("Question added.")}),y("#faq-reset").addEventListener("click",()=>{let n=lt();ct({...n,faq:null}),m(),C("Q&A back to the built-in list.")}),window._fbTimer&&(clearInterval(window._fbTimer),window._fbTimer=null);async function g(){let n=y("#fb-inbox");if(!n||document.querySelector("#fb-inbox [data-fb-reply]:focus"))return;let l=yt();if(!l){n.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let o=await fetch(it+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:l})}),r=await o.json().catch(()=>({}));if(!o.ok||!r.ok){n.innerHTML=`<div class="empty">Could not load messages (${x(r.error||"HTTP "+o.status)}).</div>`;return}let u=r.items||[],w={};n.querySelectorAll("[data-fb-id]").forEach(h=>{let k=h.querySelector("[data-fb-reply]");k&&k.value&&(w[h.dataset.fbId]=k.value)}),n.innerHTML=u.map(h=>`
        <div class="log-item fb-row${h.resolved?" fb-done":""}" data-fb-id="${x(h.id)}" data-fb-resolved="${h.resolved?"1":""}">
          <div class="txt">
            <b>${x(h.name||"Anonymous")}</b>${h.contact?` <span style="color:var(--dimmer)">\xB7 ${x(h.contact)}</span>`:""}
            <span class="mono" style="color:var(--dimmer);font-size:11px;margin-left:6px">ticket ${x(h.id)}</span>
            ${h.resolved?'<span class="tag resolved" style="margin-left:6px">resolved \u2713</span>':`<span class="tag ${h.status==="replied"?"live":"fresh"}" style="margin-left:6px">${x(h.status)}</span>`}
            <div style="color:var(--dim);font-size:13px;margin-top:4px">${x(h.message)}</div>
            ${h.reply?`<div style="color:var(--gold);font-size:12.5px;margin-top:4px">\u21A9 ${x(h.reply)}</div>`:""}
          </div>
          <input class="set-val fb-reply-in" data-fb-reply placeholder="Write a reply\u2026" value="${x(h.reply||"")}">
          <button class="icon-btn" data-fb-send title="Send reply"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-resolve title="${h.resolved?"Reopen \u2014 mark as not resolved":"Mark as resolved"}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.6L16 9.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn" data-fb-del title="Delete message">${i}</button>
        </div>`).join("")||'<div class="empty">No messages yet.</div>',n.querySelectorAll("[data-fb-id]").forEach(h=>{let k=h.querySelector("[data-fb-reply]");k&&w[h.dataset.fbId]!=null&&(k.value=w[h.dataset.fbId])})}catch{n.innerHTML='<div class="empty">Network error loading messages.</div>'}}g(),y("#fb-refresh").addEventListener("click",()=>{g(),C("Inbox refreshed.")}),window._fbTimer=setInterval(()=>{if(!y("#fb-inbox")){clearInterval(window._fbTimer),window._fbTimer=null;return}document.hidden||g()},2e3),y("#fb-inbox").addEventListener("click",async n=>{let l=n.target.closest("[data-fb-send]"),o=n.target.closest("[data-fb-del]"),r=n.target.closest("[data-fb-resolve]");if(!l&&!o&&!r)return;let u=n.target.closest("[data-fb-id]"),w=u.dataset.fbId,h=yt();try{if(r){let k=u.dataset.fbResolved!=="1";if(!(await fetch(it+"/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:h,id:w,resolved:k})}).then(q=>q.json())).ok){C("Could not update \u2014 try again.");return}C(k?"Marked as resolved \u2713":"Message reopened."),g()}else if(l){let k=u.querySelector("[data-fb-reply]").value;if(!(await fetch(it+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:h,id:w,reply:k})}).then(q=>q.json())).ok){C("Reply failed.");return}C("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(it+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:h,id:w})}).then(M=>M.json())).ok){C("Delete failed.");return}u.remove(),C("Message deleted.")}}catch{C("Network error.")}})}var Ct=document.getElementById("fl-cards");Ct&&window.matchMedia("(hover: hover)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(Ct.addEventListener("pointermove",e=>{let s=e.target.closest&&e.target.closest(".fl-card");if(!s)return;let a=s.getBoundingClientRect(),i=(e.clientX-a.left)/a.width-.5,c=(e.clientY-a.top)/a.height-.5;s.classList.add("tilt"),s.style.transform=`perspective(1000px) rotateY(${(i*7).toFixed(2)}deg) rotateX(${(-c*6).toFixed(2)}deg) translateY(-6px)`}),Ct.addEventListener("pointerleave",()=>{Ct.querySelectorAll(".fl-card").forEach(e=>{e.style.transform="",e.classList.remove("tilt")})}));y("#search").addEventListener("input",e=>{let s=e.target.value.trim().toLowerCase(),a=y("#search-drop");if(!s){a.classList.remove("show");return}let i=Z.players.filter(c=>c.name.toLowerCase().includes(s)).slice(0,8);if(!i.length){a.classList.remove("show");return}a.innerHTML=i.map(c=>`
    <a class="drop-row" href="#/player/${z(c.name)}">
      ${c.rank?Bt(c.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${x(c.name)}</span>        <span class="mono" style="margin-left:auto;color:var(--dim)">${jt(c,!0)}</span>
    </a>`).join(""),a.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||y("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(y("#search-drop").classList.remove("show"),y("#search").value="")});var it=Et.replace(/\/publish$/,"/feedback"),Ut="tt1v1_fb_tickets";function Is(){try{return JSON.parse(localStorage.getItem(Ut)||"[]")}catch{return[]}}function Ps(e){let s=Is();s.push({id:e,ts:Date.now()});try{localStorage.setItem(Ut,JSON.stringify(s.slice(-20)))}catch{}}function Bs(){let e=y("#fb-overlay"),s=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>y("#fb-msg").focus(),180)},a=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};y("#fab-feedback").addEventListener("click",s),y("#fb-close").addEventListener("click",a),y("#fb-done").addEventListener("click",a),e.addEventListener("click",n=>{n.target===e&&a()}),document.addEventListener("keydown",n=>{n.key==="Escape"&&e.classList.contains("show")&&a()});let i=y("#faq-feedback-btn");i&&i.addEventListener("click",s);let c=y("#fb-msg"),p=y("#fb-count-n");c.addEventListener("input",()=>{p.textContent=String(c.value.length);try{localStorage.setItem("tt1v1_fb_draft",c.value)}catch{}});try{let n=localStorage.getItem("tt1v1_fb_draft");n&&(c.value=n,p.textContent=String(n.length))}catch{}let m=y("#fb-send");m.addEventListener("click",async()=>{let n=c.value.trim();if(n.length<5){c.focus(),c.classList.add("fb-nudge"),setTimeout(()=>c.classList.remove("fb-nudge"),500),C(t("fb.writeFirst"));return}m.classList.add("busy"),m.disabled=!0;try{let l=await fetch(it,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:y("#fb-name").value.trim(),contact:y("#fb-contact").value.trim(),message:n})}),o=await l.json().catch(()=>({}));if(!l.ok||!o.ok){C(t("fb.couldNotSend",{err:o.error||"HTTP "+l.status}));return}Ps(o.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}y("#fb-ticket-code").textContent=o.id,y("#fb-view-form").hidden=!0,y("#fb-view-done").hidden=!1}catch{C(t("fb.netError"))}finally{m.classList.remove("busy"),m.disabled=!1}});let g=document.querySelector(".fb-ticket");g&&g.addEventListener("click",async()=>{let n=(y("#fb-ticket-code").textContent||"").trim();if(!n||n==="\u2014")return;try{await navigator.clipboard.writeText(n)}catch{let r=document.createElement("textarea");r.value=n,document.body.appendChild(r),r.select();try{document.execCommand("copy")}catch{}r.remove()}let l=y("#fb-copied");l&&(l.classList.add("show"),clearTimeout(window._fbCopiedT),window._fbCopiedT=setTimeout(()=>l.classList.remove("show"),1800)),C(t("fb.ticketCopied"))}),y("#fb-check").addEventListener("click",async()=>{let n=y("#fb-ticket-in").value.trim(),l=y("#fb-reply-out");if(n){l.classList.add("show"),l.textContent=t("fb.checking");try{let o=await fetch(it+"/status?id="+encodeURIComponent(n)),r=await o.json().catch(()=>({}));if(!o.ok||!r.ok){l.textContent=t("fb.noTicket");return}l.innerHTML=r.resolved?`${t("fb.statusResolved")}${r.reply?`<br>${t("fb.replyFrom",{reply:x(r.reply)})}`:""}`:r.reply?t("fb.replyFrom",{reply:x(r.reply)}):t("fb.statusPending",{status:x(r.status)})}catch{l.textContent=t("fb.netErrorShort")}}})}function _s(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let s=null,a=null,i=null,c=0,p=0,m=0,g=r=>{let u=r&&r.closest?r.closest("[title],[data-tip]"):null;return u&&u.hasAttribute("title")&&(u.setAttribute("data-tip",u.getAttribute("title")),u.removeAttribute("title")),u&&u.getAttribute("data-tip")?u:null},n=(r,u)=>{let w=e.offsetWidth,h=e.offsetHeight,k=r+14,M=u+18;k+w>window.innerWidth-8&&(k=r-w-14),M+h>window.innerHeight-8&&(M=u-h-14),k=Math.max(8,k),M=Math.max(8,M);let q=e.classList.contains("show")&&e.style.left?Math.abs(parseFloat(e.style.left)-k)+Math.abs(parseFloat(e.style.top)-M)<150:!1;e.classList.toggle("snap",!q),e.style.left=k+"px",e.style.top=M+"px"},l=(r,u,w)=>{s=r,e.textContent=r.getAttribute("data-tip"),n(u,w),e.classList.add("show")},o=()=>{clearTimeout(a),clearTimeout(i),a=i=null,e.classList.remove("show"),s=null};document.addEventListener("mousemove",r=>{p=r.clientX,m=r.clientY;let u=g(r.target);if(u){if(clearTimeout(i),i=null,u===s){e.classList.contains("show")&&(cancelAnimationFrame(c),c=requestAnimationFrame(()=>n(p,m)));return}clearTimeout(a),e.classList.contains("show")?l(u,p,m):a=setTimeout(()=>l(u,p,m),90);return}s&&!i&&(i=setTimeout(o,110))},{passive:!0}),window.addEventListener("scroll",o,{passive:!0}),document.addEventListener("mousedown",o,{passive:!0})}var ke;function C(e){let s=y("#toast");s.textContent=e,s.classList.add("show"),clearTimeout(ke),ke=setTimeout(()=>s.classList.remove("show"),2600)}var gt;function Wt(){gt&&gt.disconnect(),gt=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&(s.target.classList.add("in"),B(".cu",s.target).forEach(a=>Pt(a,parseFloat(a.dataset.target),{dec:parseInt(a.dataset.dec||0)})),gt.unobserve(s.target))})},{threshold:.12}),B(".reveal").forEach(e=>gt.observe(e))}(function(){let s=y("#scroll-progress"),a=y("#to-top"),i=y("#page-home .hero-row"),c=document.querySelector(".topbar"),p=!1,m=null,g=null,n=()=>{p=!1;let u=window.scrollY,w=document.documentElement.scrollHeight-window.innerHeight;if(s&&(s.style.transform=`scaleX(${w>0?Math.min(1,u/w):0})`),a&&a.classList.toggle("show",u>640),c&&c.classList.toggle("scrolled",u>10),i&&u<1400){let h=Math.round(u*.14),k=Math.max(.3,1-u/950).toFixed(2);h!==m&&(i.style.transform=`translateY(${h}px)`,m=h),k!==g&&(i.style.opacity=k,g=k)}},l,o=document.documentElement,r=()=>{o.classList.add("is-scrolling"),c&&c.classList.add("scrolling"),clearTimeout(l),l=setTimeout(()=>{o.classList.remove("is-scrolling"),c&&c.classList.remove("scrolling")},160),p||(p=!0,requestAnimationFrame(n))};window.addEventListener("scroll",r,{passive:!0}),a&&a.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),n()})();window.lbScrollNow=e=>{window.scrollTo({top:e||0,behavior:"instant"})};window.lbCards={topOf:()=>U,all:()=>Z.players,byName:()=>V,histOf:Tt,h2hOf:Se,deltaTag:Dt,resLetter:F,fmtDate:tt,canon:j,allMatches:Q,ratingTimeline:Js,ratingSeries:Vs,altsOf:Me,lastSeenText:Ce,lastSeenExact:qe};Lt();de();Ht();Bs();_s();window.addEventListener("lb-lang",()=>{let e=window.scrollY,s=at,a={...P};Ht(),y("#page-home").classList.contains("active")&&(s!=="all"||a.key!=="rank"||a.dir!==1)&&(at=s,P=a,B(".chip[data-filter]").forEach(i=>i.classList.toggle("on",i.dataset.filter===s)),pe(),ft(s,a.key,a.dir)),ve(),window.lbScrollNow(e)});function bt(e,s){let a=e.indexOf("window."+s);if(a<0)return null;let i=e.indexOf("=",a);for(;i<e.length&&"{[".indexOf(e[i])<0;)i++;let c=0,p=!1,m="",g=!1;for(let n=i;n<e.length;n++){let l=e[n];if(p){g?g=!1:l==="\\"?g=!0:l===m&&(p=!1);continue}if(l==='"'||l==="'"){p=!0,m=l;continue}if(l==="{"||l==="[")c++;else if((l==="}"||l==="]")&&(c--,c<=0))return JSON.parse(e.slice(i,n+1))}return null}var xe="https://tierstats.github.io/";async function Le(e,s){for(let a of e)try{let i=await fetch(a+(a.includes("?")?"&":"?")+s,{cache:"no-store"});if(i.ok)return await i.text()}catch{}return null}async function Gt(e){try{let s="cb="+Date.now(),[a,i]=await Promise.all([Le([xe+"data.js","data.js"],s),Le([xe+"log.js","log.js"],s)]);if(!a||!i)throw new Error("data unavailable");let c=bt(a,"LB_TANKS");c&&(window.LB_TANKS={...window.LB_TANKS_SNAPSHOT||{},...c});let p=bt(a,"LB_DATA"),m=bt(i,"LB_PUB")||(bt(i,"LB_LOG")?{matches:bt(i,"LB_LOG")}:null),g=[];if(p&&JSON.stringify(p)!==JSON.stringify(D)&&(D=p,window.LB_DATA=p,g.push("data")),m&&JSON.stringify(m)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=m,window.LB_LOG=m.matches||[],g.push("log")),g.length){let n=window.scrollY;Lt(),de(),Ht(),window.scrollTo({top:n,behavior:"instant"}),document.querySelectorAll(".reveal:not(.in), .anim:not(.in)").forEach(o=>o.classList.add("in"));let l=y("#last-updated");l&&(l.textContent=t("home.lastUpdated",{when:tt(D.generated)||"today"}))}e&&C(g.length?t("misc.refreshed"):t("misc.upToDate"))}catch{e&&C(t("misc.refreshFailed"))}}Gt(!1);var At=y("#lb-refresh-btn");At&&At.addEventListener("click",async()=>{At.classList.add("spinning"),await Gt(!0),setTimeout(()=>At.classList.remove("spinning"),400)});setInterval(()=>Gt(!1),6e4);document.addEventListener("visibilitychange",()=>{document.hidden||Gt(!1)});var Be="tt1v1_fb_seen",X=null;function Ds(){try{return JSON.parse(localStorage.getItem(Ut)||"[]")}catch{return[]}}function _e(){try{return JSON.parse(localStorage.getItem(Be)||"{}")||{}}catch{return{}}}function Hs(){let e=y("#fab-feedback");if(e&&!e.querySelector(".fb-dot")){let a=document.createElement("span");a.className="fb-dot",e.appendChild(a),requestAnimationFrame(()=>a.classList.add("in"))}let s=y("#fb-view-form");if(s&&!y("#fb-reply-banner")&&X){let a=document.createElement("div");a.id="fb-reply-banner",a.innerHTML=`${t("fb.teamReplied",{id:x(X.id)})}
      <div class="r">${x(X.reply)}</div>
      <button class="btn btn-ghost" id="fb-got-it" style="margin-top:9px;padding:6px 13px">${t("fb.gotIt")}</button>`,s.insertAdjacentElement("beforebegin",a),requestAnimationFrame(()=>a.classList.add("show")),y("#fb-got-it").addEventListener("click",Us)}}function Us(){if(X){let a=_e();a[X.id]=1;try{localStorage.setItem(Be,JSON.stringify(a))}catch{}X=null}let e=y(".fb-dot");e&&(e.classList.add("out"),setTimeout(()=>e.remove(),420));let s=y("#fb-reply-banner");s&&(s.classList.remove("show"),setTimeout(()=>s.remove(),420))}async function De(){let e=_e();X=null;let s=Ds(),a=s.slice(0,Math.max(0,s.length-6)),i=[];for(let c of s.slice(-6))try{let p=await fetch(it+"/status?id="+encodeURIComponent(c.id),{cache:"no-store"}),m=await p.json().catch(()=>({}));if(p.status===404||p.ok&&m.ok===!1)continue;i.push(c),p.ok&&m.ok&&m.reply&&!e[c.id]&&!X&&(X={id:c.id,reply:m.reply})}catch{i.push(c)}if(i.length!==s.slice(-6).length)try{localStorage.setItem(Ut,JSON.stringify([...a,...i]))}catch{}X&&Hs()}setTimeout(De,3500);setInterval(De,9e4);var Ws=Et.replace(/\/publish$/,"/api/ttstats"),Gs=15e3;function Ys(e,s){let a=e&&e.stats||{};return s==="kd"?a.deaths?a.kills/a.deaths:a.kills!=null?a.kills:null:a[s]!=null?a[s]:null}function zs(e){let s=a=>String(a).replace(/["\\]/g,"\\$&");Object.keys(e).forEach(a=>{let i=e[a];window.LB_TANKS=Object.assign({},window.LB_TANKS||{},{[a]:i}),document.querySelectorAll(`[data-live-name="${s(a)}"][data-live]`).forEach(c=>{let p=c.dataset.live,m=Ys(i,p);if(m==null)return;let g=p==="kd"&&i.stats&&i.stats.deaths?2:0,n=Number(m.toFixed(g)),l=parseFloat(String(c.textContent).replace(/[^0-9.\-]/g,""));(isNaN(l)||l!==n)&&Pt(c,n,{dec:g,dur:900})}),document.querySelectorAll(`canvas[data-tank-name="${s(a)}"]`).forEach(c=>{c.dataset.mounted&&window.TankRender&&window.TankRender.render(c,i,c.dataset.tankSize||"medium")})})}(function(){let s=!1,a=0,i=new Set,c=0,p=0,m=n=>{a||(a=setTimeout(()=>{a=0,g()},n))};window.lbTankWant=n=>{n&&i.add(String(n)),s&&m(350)};let g=async()=>{if(s){m(300);return}if(document.visibilityState!=="visible")return;let n=[...new Set([...[...document.querySelectorAll("[data-live-name]")].map(d=>d.dataset.liveName),...[...document.querySelectorAll("canvas[data-tank-name]")].map(d=>d.dataset.tankName)])].filter(Boolean),l=window.LB_DATA||{},o=[...new Set([...l.qualified||[],...l.players||[]].map(d=>d&&d.name).filter(Boolean))],r=12,u=new Set,w=(d,$,v)=>{let b=[];for(let f=0;f<d.length&&b.length<v;f++){let L=d[($+f)%d.length];u.has(L)||(u.add(L),b.push(L))}return b},h=[...i].filter(Boolean);h.forEach(d=>u.add(d));let k=n.filter(d=>!u.has(d)),M=w(k,c,Math.min(6,Math.max(0,r-u.size)));k.length>M.length&&(c=(c+M.length)%k.length);let q=o.filter(d=>!u.has(d)),N=w(q,p,Math.max(0,r-u.size));q.length>N.length&&(p=(p+N.length)%q.length);let I=[...h,...M,...N].slice(0,r);if(I.length){s=!0;try{let $=await(await fetch(Ws+"?names="+encodeURIComponent(I.join(",")),{cache:"no-store"})).json();$&&$.ok&&$.tanks&&(zs($.tanks),typeof window.lbTankFreshMark=="function"&&window.lbTankFreshMark(Object.keys($.tanks))),I.forEach(v=>i.delete(v))}catch{}s=!1}};window.lbLiveStatsTick=()=>m(0),g(),setTimeout(g,900),setInterval(g,Gs)})();var kt=null;function He(){if(kt)return kt;let e={},s=(o,r,u,w)=>{let h=r-E.conservative*u;(!e[o]||h>e[o].rating)&&(e[o]={rating:h,date:w||""})},a={},i=o=>{if(!a[o]){let[r,u]=ne(o);a[o]={r,rd:u,lastIdx:null}}return a[o]},c={};for(let o of Q()){if(o.date)continue;let r=o.sa>o.sb?1:o.sa<o.sb?0:.5;(c[o.a]=c[o.a]||[]).push([o.b,r]),(c[o.b]=c[o.b]||[]).push([o.a,1-r]),i(o.a).lastIdx=et,i(o.b).lastIdx=et}let p={};for(let o in c)p[o]=[i(o).r,i(o).rd];for(let o in c){let r=i(o),[u,w]=vt(r.r,r.rd,c[o].map(([h,k])=>[p[h][0],p[h][1],k]));r.r=u,r.rd=w,s(o,u,w,E.graceStart)}let m={},g={};for(let o in a)g[j(o)]={r:a[o].r,rd:a[o].rd,lastIdx:a[o].lastIdx};let n=o=>{if(!g[o]){let[r,u]=ne(o);g[o]={r,rd:u,lastIdx:null}}return g[o]};for(let o of Q().filter(r=>r.date).slice().reverse()){let r=St(o.date),u=j(o.a),w=j(o.b),h=n(u),k=n(w);for(let $ of[h,k]){let v=r-($.lastIdx==null?et:$.lastIdx);v>0&&($.rd=Math.min(Math.sqrt($.rd*$.rd+E.growth*E.growth*v),E.maxRd))}let M=o.sa>o.sb?1:o.sa<o.sb?0:.5,[q,N]=vt(h.r,h.rd,[[k.r,k.rd,M]]),[I,d]=vt(k.r,k.rd,[[h.r,h.rd,1-M]]);h.r=q,h.rd=N,h.lastIdx=r,k.r=I,k.rd=d,k.lastIdx=r,(m[u]=m[u]||[]).push({date:o.date,r:q-E.conservative*N,opp:w,w:M}),(m[w]=m[w]||[]).push({date:o.date,r:I-E.conservative*d,opp:u,w:1-M})}let l=new Map;for(let o of Q().filter(r=>r.date).slice().reverse()){let r=St(o.date);l.has(r)||l.set(r,[]),l.get(r).push({a:j(o.a),b:j(o.b),sa:+o.sa,sb:+o.sb,date:o.date})}for(let o of[...l.keys()].sort((r,u)=>r-u)){for(let h in a){let k=a[h],M=o-(k.lastIdx==null?et:k.lastIdx);M>0&&(k.rd=Math.min(Math.sqrt(k.rd*k.rd+E.growth*E.growth*M),E.maxRd))}let r={},u="";for(let h of l.get(o)){let k=h.sa>h.sb?1:h.sa<h.sb?0:.5;(r[h.a]=r[h.a]||[]).push([h.b,k]),(r[h.b]=r[h.b]||[]).push([h.a,1-k]),i(h.a).lastIdx=o,i(h.b).lastIdx=o,h.date>u&&(u=h.date)}let w={};for(let h in r)w[h]=[i(h).r,i(h).rd];for(let h in r){let k=i(h),[M,q]=vt(k.r,k.rd,r[h].map(([N,I])=>[w[N][0],w[N][1],I]));k.r=M,k.rd=q,s(h,M,q,u)}}return kt={peaks:e,series:m},kt}function Js(){return He().peaks}function Vs(e){let s=j(e);return(He().series[s]||[]).slice()}})();
