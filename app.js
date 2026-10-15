/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var D=window.LB_DATA,Tt="https://tierstats-publish.tierstats.workers.dev/publish",y=(e,s=document)=>s.querySelector(e),B=(e,s=document)=>[...s.querySelectorAll(e)],x=e=>String(e).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),J=e=>encodeURIComponent(String(e)),ae=e=>decodeURIComponent(e),St=e=>{let s=String(e||"").replace(/^#/,"");return s&&s!=="/"?s:"/"},Qe=()=>"#/"+location.pathname.replace(/\/+$/,"").replace(/^\//,"");function ve(e){history.pushState(null,"",St(e)),ht()}function Dt(e,s,a={}){let i=a.dur||1200,c=a.dec||0,v=performance.now(),m=parseFloat(e.textContent)||0;function b(n){let l=Math.min(1,(n-v)/i),o=1-Math.pow(1-l,3);e.textContent=(m+(s-m)*o).toFixed(c),l<1&&requestAnimationFrame(b)}requestAnimationFrame(b),setTimeout(()=>{e.textContent=s.toFixed(c)},i+300)}var Ze='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',Xe='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function Ht(e,s=""){let a=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",i=e<=3?e===1?Ze:Xe:"";return`<div class="rank-badge ${a} ${s}" title="${t("home.rankTip",{n:e})}">${i}<span class="num">${e}</span></div>`}var F=e=>t(e==="W"?"rec.wLetter":e==="L"?"rec.lLetter":"rec.dLetter"),V={},U=[],Z={players:[],byName:{},qualified:[]},wt={},Ft={},pt={},ne=new Set,ue={prevRatings:{},prevRanks:{}};function ts(){try{localStorage.removeItem("tt1v1_baseline")}catch{}ue={prevRatings:{...D.prevRatings||{}},prevRanks:{...D.prevRanks||{}}}}function es(){for(let a in wt)delete wt[a];let e=new Set(K().aliasRemoved||[]);Object.entries(D.aliases).forEach(([a,i])=>{e.has(a)||(wt[a.toLowerCase()]=i)}),Object.entries(K().aliases||{}).forEach(([a,i])=>{wt[String(a).toLowerCase()]=i});for(let a of Object.keys(Ft))delete Ft[a];for(let a of Object.keys(pt))delete pt[a];ne.clear();let s=(a,i)=>{Object.keys(a||{}).forEach(c=>{let v=j(c);v!==c&&(i[v]=a[c])}),Object.keys(a||{}).forEach(c=>{let v=j(c);v===c&&(i[v]=a[c])})};s(D.seeds,Ft),s(ue.prevRatings,pt),(D.inactiveList||[]).forEach(a=>ne.add(j(a)))}var ie={},xe=e=>String(e).toLowerCase().replace(/[^a-z0-9]/g,"").replace(/0/g,"o").replace(/1/g,"i").replace(/3/g,"e").replace(/5/g,"s");function ss(e,s){if(Math.abs(e.length-s.length)>3)return 99;let a=Array.from({length:s.length+1},(i,c)=>c);for(let i=1;i<=e.length;i++){let c=[i];for(let v=1;v<=s.length;v++)c[v]=Math.min(a[v]+1,c[v-1]+1,a[v-1]+(e[i-1]===s[v-1]?0:1));if(a=c,Math.min(...a)>3)return 99}return a[s.length]}function as(){let e={},s=new Set(K().aliasRemoved||[]),a=c=>{let v=String(c).trim(),m=j(v);!v||xe(v)===xe(m)||ss(v.toLowerCase(),m.toLowerCase())<=2||(e[m]=e[m]||[]).push(v)};Object.keys(D.aliases).forEach(c=>{s.has(c)||a(c)}),Object.keys(K().aliases||{}).forEach(a);for(let c of Object.keys(e)){let v=new Set([c.toLowerCase()]);e[c]=e[c].filter(m=>{let b=m.toLowerCase();return v.has(b)?!1:(v.add(b),!0)}).sort((m,b)=>m.localeCompare(b))}let i=D.cards&&D.cards.alts||{};Object.keys(i).forEach(c=>{let v=j(c),m=i[c];e[v]=(Array.isArray(m)?m:String(m||"").split(/[,;]/)).map(b=>String(b).trim()).filter(Boolean)}),ie=e}function qe(e){return ie[e]||ie[j(e)]||[]}function ns(e){let s=qe(e);if(!s.length)return"";let a=s.slice(0,2).join(", ")+(s.length>2?` +${s.length-2}`:"");return`<div class="p-alt" title="${x(s.join(", "))}">${t("lb.aka",{names:x(a)})}</div>`}var j=e=>{let s=String(e).trim(),a=new Set;for(;;){let i=wt[s.toLowerCase()];if(!i||i===s||a.has(s))return s;a.add(s),s=i}};function Ct(e){let s=[];return Q().forEach(a=>{let i=(c,v,m)=>({opp:c,for_:v,against:m,res:v>m?"W":v<m?"L":"D",date:a.date});a.a===e?s.push(i(a.b,a.sa,a.sb)):a.b===e&&s.push(i(a.a,a.sb,a.sa))}),s}function Ae(e){let s={};return Ct(e).forEach(a=>{let i=s[a.opp]||(s[a.opp]={w:0,l:0,d:0,pf:0,pa:0});i[a.res.toLowerCase()]+=1,i.pf+=a.for_,i.pa+=a.against}),Object.entries(s).map(([a,i])=>({opp:a,...i})).sort((a,i)=>i.w+i.l+i.d-(a.w+a.l+a.d)||i.w-a.w)}function is(e){let s=V[e]||{};return s.provisional?`<span class="tag prov">${t("tag.provisional")}</span>`:s.inactive?`<span class="tag inact">${t("tag.inactive")}</span>`:""}function os(e){let s=Ct(e).slice(0,5).reverse();if(!s.length)return"";let a=s.map(i=>F(i.res)).join(" ");return`<span class="form" title="${t("form.title",{n:s.length,seq:a})}">${s.map(i=>`<i class="${i.res.toLowerCase()}">${F(i.res)}</i>`).join("")}</span>`}function Ut(){let e=typeof getLang=="function"?getLang():"en";return{en:"en-US",zh:"zh-CN",ja:"ja-JP",ru:"ru-RU"}[e]||"en-US"}function Re(e){let s=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||"").slice(0,10));return s?new Date(+s[1],+s[2]-1,+s[3]):null}function tt(e){let s=Re(e);if(!s)return"";let a=s.getFullYear()===new Date().getFullYear();try{return new Intl.DateTimeFormat(Ut(),a?{month:"short",day:"numeric"}:{year:"numeric",month:"short",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Oe(e){let s=Re(e);if(!s)return"";try{return new Intl.DateTimeFormat(Ut(),{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Fe(e){let s=new Date(Number(e)*1e3);if(!Number.isFinite(s.getTime()))return"";try{return new Intl.DateTimeFormat(Ut(),{dateStyle:"medium",timeStyle:"short"}).format(s)}catch{return s.toISOString().slice(0,16).replace("T"," ")}}function Ne(e){let s=Math.floor(Date.now()/1e3)-Number(e);if(!Number.isFinite(s))return"";let a=[["year",31536e3],["month",2592e3],["week",604800],["day",86400],["hour",3600],["minute",60]];try{let i=new Intl.RelativeTimeFormat(Ut(),{numeric:"auto"});for(let[c,v]of a)if(s>=v)return i.format(-Math.floor(s/v),c);return i.format(-Math.max(0,s),"second")}catch{let c=Math.floor(s/86400);return c>0?c+"d":"<1d"}}function Gt(e){let s=e.delta!=null?e.delta:0;if(Math.abs(s)<.05)return"";let a=s>0,i=Math.abs(s).toFixed(1);return`<span class="delta ${a?"up":"down"}" title="${a?t("delta.upTitle",{n:i}):t("delta.downTitle",{n:i})}">${a?"\u25B2":"\u25BC"} ${i}</span>`}function rs(){let e=ue.prevRanks||{},s=Object.keys(e);if(s.length){let c={};return s.forEach(v=>{c[j(v)]=e[v]}),c}let a={};U.forEach(c=>{pt[c.name]!=null&&(a[c.name]=pt[c.name])});let i={};return Object.entries(a).sort((c,v)=>v[1]-c[1]).forEach(([c],v)=>{i[c]=v+1}),i}function cs(e,s){let a=s[e.name]!=null?s[e.name]:s[j(e.name)];if(a==null){let c=(D.newSince||{})[e.name];return!c||(Date.now()-Date.parse(c))/864e5>5?"":`<span class="mv new" title="${t("mv.newTitle")}">${t("mv.new")}</span>`}let i=a-e.rank;return i>0?`<span class="mv up" title="${tp("mv.up",i)}">\u25B2${i}</span>`:i<0?`<span class="mv down" title="${tp("mv.down",-i)}">\u25BC${-i}</span>`:""}function Mt(e){return`${Math.round(e.rating-100)} \u2013 ${Math.round(e.rating+100)}`}function Pt(e,s){if(!e.provisional)return e.rating.toFixed(1);let a=s?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:Mt(e);return`<span class="prov-range" title="${t("rating.provTitle")}">${a}</span>`}var je="tt1v1_admin_log_v1",vt="tt1v1_admin_ok",it="tt1v1_admin_pw",ls=()=>sessionStorage.getItem(vt)==="1"||localStorage.getItem(vt)==="1",yt=()=>sessionStorage.getItem(it)||localStorage.getItem(it)||"";function ds(e,s){s?(localStorage.setItem(vt,"1"),localStorage.setItem(it,e)):(sessionStorage.setItem(vt,"1"),sessionStorage.setItem(it,e),localStorage.removeItem(vt),localStorage.removeItem(it))}function ps(){[sessionStorage,localStorage].forEach(e=>{e.removeItem(vt),e.removeItem(it)})}var Le=null,oe=!1;function Ie(){oe||!yt()||(clearTimeout(Le),Le=setTimeout(()=>publishLog({silent:!0}),1500))}var vs=Tt.replace(/\/publish$/,"/verify"),us=Tt.replace(/\/publish$/,"/sync");function Pe(){try{return JSON.parse(localStorage.getItem(je)||"[]")}catch{return[]}}function hs(e){try{localStorage.setItem(je,JSON.stringify(e))}catch{}Ie()}var Be="tt1v1_admin_over_v1";function rt(){try{return JSON.parse(localStorage.getItem(Be)||"{}")||{}}catch{return{}}}function ot(e){try{localStorage.setItem(Be,JSON.stringify(e))}catch{}Ie()}function K(){let e=window.LB_PUB||{},s=rt(),a=new Set([...e.aliasRemoved||[],...s.aliasRemoved||[]]),i=new Set([...e.seedRemoved||[],...s.seedRemoved||[]]),c=s.aliases||{},v={...s.seeds||{},...s.seedGlicko||{},...s.seedRd||{}},m=w=>Object.fromEntries(Object.entries(w||{}).filter(([h])=>!a.has(h)||c[h]!=null)),b=w=>Object.fromEntries(Object.entries(w||{}).filter(([h])=>!i.has(h)||v[h]!=null)),n=m({...e.aliases||{},...s.aliases||{}}),l=m({...e.aliasNotes||{},...s.aliasNotes||{}}),o=b({...e.seeds||{},...s.seeds||{}}),r=b({...e.seedGlicko||{},...s.seedGlicko||{}}),u=b({...e.seedRd||{},...s.seedRd||{}});return{aliases:n,aliasNotes:l,seeds:o,seedGlicko:r,seedRd:u,aliasRemoved:[...a].filter(w=>n[w]==null),seedRemoved:[...i].filter(w=>o[w]==null&&r[w]==null&&u[w]==null),settings:{...e.settings||{},...s.settings||{}},matchEdits:{...e.matchEdits||{},...s.matchEdits||{}},inactive:s.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...s.matchRemoved||[]])],faq:s.faq!=null?s.faq:e.faq!=null?e.faq:null}}function fs(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function Q(){let e=K(),s=e.matchEdits||{},a=new Set(e.matchRemoved||[]),i=(r,u)=>{if(a.has(u))return null;let w=s[u],h=w?{...r,sa:w.sa,sb:w.sb,date:w.date!=null?w.date:r.date}:r;return{...h,a:j(h.a),b:j(h.b),sa:+h.sa,sb:+h.sb,key:u}},c=Pe().map((r,u)=>i({...r,admin:!0,published:!1},"l:"+u)).filter(Boolean),v=fs().map((r,u)=>i({...r,admin:!0,published:!0},"p:"+u)).filter(Boolean),m=D.matches.map((r,u)=>i({...r,admin:!1,published:!1},"a:"+u)).filter(Boolean).reverse(),b=r=>{let u=r.a>r.b;return[u?r.b:r.a,u?r.a:r.b,u?r.sb:r.sa,u?r.sa:r.sb,r.date||""].join("|")},n={};m.forEach(r=>{let u=b(r);n[u]=(n[u]||0)+1});let l={};return c.concat(v).filter(r=>{let u=b(r);return l[u]=(l[u]||0)+1,l[u]>(n[u]||0)}).concat(m)}var T={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},Nt=864e5,xt=Math.log(10)/400,_e=e=>1/Math.sqrt(1+3*xt*xt*e*e/(Math.PI*Math.PI)),re=(e,s,a)=>1/(1+Math.pow(10,-_e(a)*(e-s)/400));function ms(e){let s=K().seeds||{};return s[e]!=null&&s[e]!==""?Number(s[e]):Ft[e]}function ce(e){let s=(K().seedGlicko||{})[e],a=(K().seedRd||{})[e],i=s!=null&&s!==""?Number(s):null,c=a!=null&&a!==""?Number(a):null;if(i!=null||c!=null)return[i??T.unratedR,c??T.unratedRd];let v=ms(e);return v!=null?[Math.max(T.seedMid+(v-T.oldMid)*T.ptsPer,T.minSeed),T.knownRd]:[T.unratedR,T.unratedRd]}function dt(e,s,a){let i=0,c=0;for(let[m,b,n]of a){let l=_e(b),o=re(e,m,b);i+=l*l*o*(1-o),c+=l*(n-o)}if(i*=xt*xt,i<=0)return[e,s];let v=1/(s*s)+i;return[e+xt/v*c,Math.sqrt(1/v)]}function gs(e,s){let a=Math.pow(10,s),i=e*a,c=Math.floor(i);return Math.abs(i-c-.5)<1e-6?(c+1)/a:Math.round(i)/a}var Et=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(T.periodDays*Nt)),et=Et(T.graceStart),bs={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function De(){let e=K().settings||{};return(D.settings||[]).map(s=>({...s,value:Object.prototype.hasOwnProperty.call(e,s.name)?e[s.name]:s.value}))}function ws(){for(let e of De()){let s=bs[e.name];if(!s)continue;if(s==="graceStart"){let i=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(i)&&(T.graceStart=i);continue}let a=Number(e.value);Number.isFinite(a)&&(T[s]=a)}et=Et(T.graceStart),B(".cons-val").forEach(e=>{e.textContent=String(T.conservative)}),B(".min-matches-val").forEach(e=>{e.textContent=String(T.minMatches)}),B(".min-opp-val").forEach(e=>{e.textContent=String(T.minOpp)})}function ys(){ws(),es(),as();let e={},s=d=>{if(!e[d]){let[$,p]=ce(d);e[d]={name:d,r:$,rd:p,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[d]},a=(d,$,p,g,f,L)=>{let M=s(d);M.games++,M.opps.add($),p>g?M.w++:p<g?M.l++:M.d++,M.lastIdx=L,f&&(M.lastDate=f)},i={};for(let d of Q()){if(d.date)continue;let $=j(d.a),p=j(d.b),g=d.sa>d.sb?1:d.sa<d.sb?0:.5;(i[$]=i[$]||[]).push([p,g]),(i[p]=i[p]||[]).push([$,1-g]),a($,p,d.sa,d.sb,"",et),a(p,$,d.sb,d.sa,"",et)}let c={};for(let d in i)c[d]=[s(d).r,s(d).rd];for(let d in i){let[$,p]=dt(c[d][0],c[d][1],i[d].map(([g,f])=>[c[g][0],c[g][1],f]));s(d).r=$,s(d).rd=p}let v=new Map;for(let d of Q().filter($=>$.date).slice().reverse()){let $=d.date,p=Et($);v.has(p)||v.set(p,[]),v.get(p).push({a:j(d.a),b:j(d.b),sa:+d.sa,sb:+d.sb,date:$})}for(let d of[...v.keys()].sort(($,p)=>$-p)){for(let g in e){let f=e[g],L=d-(f.lastIdx==null?et:f.lastIdx);L>0&&(f.rd=Math.min(Math.sqrt(f.rd*f.rd+T.growth*T.growth*L),T.maxRd))}let $={};for(let g of v.get(d)){let f=g.sa>g.sb?1:g.sa<g.sb?0:.5;($[g.a]=$[g.a]||[]).push([g.b,f]),($[g.b]=$[g.b]||[]).push([g.a,1-f]),a(g.a,g.b,g.sa,g.sb,g.date,d),a(g.b,g.a,g.sb,g.sa,g.date,d)}let p={};for(let g in $)p[g]=[s(g).r,s(g).rd];for(let g in $){let[f,L]=dt(p[g][0],p[g][1],$[g].map(([M,A])=>[p[M][0],p[M][1],A]));s(g).r=f,s(g).rd=L}}let m=Object.values(e).map(d=>({name:d.name,glicko:d.r,rd:d.rd,rating:d.r-T.conservative*d.rd,matches:d.games,w:d.w,l:d.l,d:d.d,winPct:d.games?gs(d.w/d.games*100,1):0,opponents:d.opps.size,avgOpp:0,lastMatch:d.lastDate||"",provisional:!(d.games>=T.minMatches&&d.opps.size>=T.minOpp),inactive:!1})),b={};m.forEach(d=>{b[d.name]=d.glicko}),m.forEach(d=>{let $=0;e[d.name].opps.forEach(p=>{$+=b[p]!=null?b[p]:T.unratedR}),d.avgOpp=e[d.name].opps.size?$/e[d.name].opps.size:0});let n=Date.now(),l=Math.floor(n/(T.periodDays*Nt));for(let d in e){let $=e[d],p=l-($.lastIdx==null?et:$.lastIdx);p>0&&($.rd=Math.min(Math.sqrt($.rd*$.rd+T.growth*T.growth*p),T.maxRd))}m.forEach(d=>{d.glicko=e[d.name].r,d.rd=e[d.name].rd,d.rating=d.glicko-T.conservative*d.rd;let $=pt[d.name],p=(D.curRatings||{})[d.name];d.delta=$!=null?(p??d.rating)-$:0});let o=Date.parse(T.graceStart+"T00:00:00Z")+T.graceDays*Nt,r=new Set([...ne,...K().inactive||[]]);m.forEach(d=>{d.inactive=r.has(d.name)||(d.lastMatch?n-Date.parse(d.lastMatch+"T00:00:00Z")>T.inactiveDays*Nt:n>o)});let u={},w={};(D.players||[]).forEach((d,$)=>{let p=j(d.name);u[p]=d,w[p]=$});let h={};m.forEach(d=>{h[d.name]=d}),m.forEach(d=>{let $=u[d.name];$&&(d.rating=$.rating,d.glicko=$.glicko,d.rd=$.rd,d.matches=$.matches,d.w=$.w,d.l=$.l,d.d=$.d,d.winPct=$.winPct,d.opponents=$.opponents,d.avgOpp=$.avgOpp,$.lastMatch&&(d.lastMatch=$.lastMatch))});let k=[];(D.qualified||[]).forEach(d=>{let $=h[j(d.name)];$&&($.provisional=!1,$.rank=d.rank!=null?d.rank:k.length+1,k.push($))});let S=new Set(k.map(d=>d.name)),C=m.filter(d=>!S.has(d.name)&&!u[d.name]&&!u[j(d.name)]&&!d.provisional&&!d.inactive).sort((d,$)=>$.rating-d.rating);C.forEach((d,$)=>{d.rank=k.length+$+1});let N=k.concat(C);m.sort((d,$)=>$.rating-d.rating||(w[d.name]!=null?w[d.name]:1e9)-(w[$.name]!=null?w[$.name]:1e9));let I={};return m.forEach(d=>{I[d.name]=d}),{players:m,byName:I,qualified:N}}function Lt(){ts(),Z=ys(),V=Z.byName,U=Z.qualified,kt=null}var $s=["page-home","page-player","page-compare","page-matches","page-cards","page-roster","page-analytics","page-method","page-faq","page-admin"];function Bt(){let e=y("#nav-glide"),s=document.querySelector(".nav a.active");if(e&&s&&s.offsetWidth>0){let a=s.getBoundingClientRect(),i=e.parentElement.getBoundingClientRect();e.style.width=a.width+"px",e.style.transform=`translate(${a.left-i.left}px, ${a.bottom-i.top-1}px)`,e.style.opacity="1"}else e&&(e.style.opacity="0")}window.addEventListener("resize",()=>{Bt(),clearTimeout(window.__glideRz),window.__glideRz=setTimeout(Bt,150)});document.fonts&&document.fonts.ready&&document.fonts.ready.then(Bt);function ht(){if(Me){Me=!1;return}let e;location.hash&&location.hash.startsWith("#/")&&location.hash!=="#/"?(e=location.hash,history.replaceState(null,"",St(e))):e=Qe(),$s.forEach(a=>y("#"+a).classList.remove("active"));let s="#/"+(e.split("/")[1]||"");if(s==="#/card"&&(s="#/cards"),s==="#/player"&&(s="#/"),B(".nav a, .foot-nav a").forEach(a=>{let i=a.getAttribute("href");a.classList.toggle("active",i===s||e==="#/"&&i==="#/")}),Bt(),e==="#/compare"||e.startsWith("#/compare/")){let a=e.split("/").slice(2).map(ae);Ue(a[0]||"",a[1]||""),y("#page-compare").classList.add("active"),window.lbScrollNow(0)}else if(e.startsWith("#/player/"))qs(ae(e.slice(9))),y("#page-player").classList.add("active"),window.lbScrollNow(0);else if(e==="#/matches")Os(),y("#page-matches").classList.add("active"),window.lbScrollNow(0);else if(e==="#/cards")typeof renderCards=="function"&&renderCards(),typeof window.lbLiveStatsTick=="function"&&window.lbLiveStatsTick(),y("#page-cards").classList.add("active"),window.lbScrollNow(0);else if(e.startsWith("#/card/")){typeof renderCards=="function"&&renderCards(),y("#page-cards").classList.add("active"),window.lbScrollNow(0);let a=ae(e.slice(7));requestAnimationFrame(()=>{typeof window.cardsFocus=="function"&&window.cardsFocus(a)})}else e==="#/roster"?(Fs(),y("#page-roster").classList.add("active"),window.lbScrollNow(0)):e==="#/analytics"?(be(),y("#page-analytics").classList.add("active"),window.lbScrollNow(0)):e==="#/method"?(js(),y("#page-method").classList.add("active"),window.lbScrollNow(0)):e==="#/faq"?(Bs(),y("#page-faq").classList.add("active"),window.lbScrollNow(0)):e==="#/admin"?(lt(),y("#page-admin").classList.add("active"),window.lbScrollNow(0)):(he(),y("#page-home").classList.add("active"),requestAnimationFrame(Ms));zt()}window.addEventListener("hashchange",ht);window.addEventListener("popstate",ht);document.addEventListener("click",e=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;let s=e.target instanceof Element?e.target.closest('a[href^="#/"]'):null;if(!s)return;e.preventDefault();let a=s.getAttribute("href");St(a)!==(location.pathname.replace(/\/+$/,"")||"/")&&ve(a)});function he(){at="all",P={key:"rank",dir:1},B(".chip[data-filter]").forEach(n=>n.classList.toggle("on",n.dataset.filter==="all")),fe();let e=Q().length,s=Z.players.length,a=U[0],i=Math.round(U.reduce((n,l)=>n+l.rd,0)/U.length),c=y("#hero-chip-matches");c&&(c.innerHTML=t("home.chipMatches",{n:e})),y("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">${t("stat.ranked")}</div>
      <div class="v"><span class="cu" data-target="${U.length}">0</span><small>${t("stat.ofTotal",{n:s})}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.matches")}</div>
      <div class="v"><span class="cu" data-target="${e}">0</span></div></div>
    <div class="stat-card"><div class="k">${t("stat.highest")}</div>
      <div class="v"><span class="cu" data-target="${a.rating}" data-dec="1">0</span><small>${x(a.name)}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.avgRd")}</div>
      <div class="v"><span class="cu" data-target="${i}" data-dec="1">0</span><small>${t("stat.certainty")}</small></div></div>`;let v=[U[1],U[0],U[2]].filter(Boolean);y("#fl-cards").innerHTML=v.map(n=>`
    <div class="fl-card r${n.rank}${n.rank===1?" champ":""} reveal" data-goto="${x(n.name)}">
      <div class="fl-top">
        ${Ht(n.rank)}
        <div class="rd">RD ${n.rd.toFixed(0)}</div>
      </div>
      ${n.rank===1?`<div class="champ-tag">${t("home.champTag")}</div>`:""}
      <div class="nm">${x(n.name)}</div>
      <div class="rating">
        <span class="unit">${t("home.ratingUnit")}</span>
        <div class="big-row"><span class="big">${Math.round(n.rating)}</span>${Gt(n)}</div>
      </div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${n.winPct>=60?"":n.winPct>=40?"mid":"low"}" data-w="${n.winPct}"></div></div>
      </div>
      <div class="meta">
        <span><span class="w">${n.w}${F("W")}</span> <span class="l">${n.l}${F("L")}</span> ${n.d}${F("D")}</span>
        <span class="wc">${n.winPct.toFixed(1)}%</span>
        <span class="opp">${t("home.avgOpp",{n:n.avgOpp.toFixed(1)})}</span>
      </div>
    </div>`).join(""),requestAnimationFrame(()=>{B("#fl-cards .bar-fill").forEach(n=>{n.style.width=n.dataset.w+"%"})});let m=y("#home-guide");m&&(m.innerHTML=typeof window.cardsGuideHTML=="function"?window.cardsGuideHTML("home"):""),ut(),He();let b=y("#last-updated");b&&(b.textContent=t("home.lastUpdated",{when:tt(D.generated)||"today"}))}function He(){let e=Q().filter(s=>s.date).slice(0,10);y("#battles-grid").innerHTML=e.length?e.map(s=>{let a=s.sa>s.sb,i=s.sb>s.sa;return`
    <div class="battle-row reveal" data-goto="${x(a?s.a:s.b)}" tabindex="0" role="link">
      <div class="who ${a?"win":"lose"}" data-goto="${x(s.a)}">${x(s.a)}</div>
      <div class="vs">${t("vs")}</div>
      <div class="who r ${i?"win":"lose"}" data-goto="${x(s.b)}">${x(s.b)}</div>
      <div class="sc mono"><span class="${a?"win":"lose"}">${s.sa}</span> \u2013 <span class="${i?"win":"lose"}">${s.sb}</span></div>
      <div class="dt">${tt(s.date)||(s.admin&&!s.published?t("battles.justNow"):t("misc.historical"))}</div>
    </div>`}).join(""):`<div class="empty" style="padding:26px;text-align:center;color:var(--dim);grid-column:1/-1">${t("battles.empty")}</div>`}var ks=500,xs="cubic-bezier(.22,.8,.24,1)",Ls=12;function Ss(e,s){matchMedia("(prefers-reduced-motion: reduce)").matches||B(".lb-row",e).forEach((a,i)=>{let c=s.get(a.dataset.name);if(c===void 0||typeof a.animate!="function")return;let v=c-a.getBoundingClientRect().top;Math.abs(v)<=1||a.animate([{transform:`translateY(${v}px)`},{transform:"none"}],{duration:ks,easing:xs,delay:Math.min(i*Ls,220),fill:"backwards"})})}function ut(e="all",s="rank",a=1){let i=y("#lb-body"),v=(e==="all"&&jt?U:Z.players).slice().map(n=>({...n,rank:n.rank!=null?n.rank:9999}));le&&(v=v.filter(n=>n.name.toLowerCase().includes(le))),e==="provisional"?v=v.filter(n=>(V[n.name]||{}).provisional):e==="inactive"?v=v.filter(n=>(V[n.name]||{}).inactive):e==="veterans"?v=v.filter(n=>n.matches>=15):e==="rising"&&(v=v.filter(n=>n.winPct>=60&&n.matches>=5)),v.sort((n,l)=>{let o=n[s],r=l[s];return(typeof o=="string"?o.localeCompare(r):o-r)*a});let m=new Map;B(".lb-row",i).forEach(n=>m.set(n.dataset.name,n.getBoundingClientRect().top));let b=rs();i.innerHTML=v.map(n=>`
    <div class="lb-row ${n.rank<=3?"top"+n.rank:""}" data-name="${x(n.name)}" data-goto="${x(n.name)}" tabindex="0" role="link">
      <div class="rank">${n.rank<=U.length?Ht(n.rank,"sm")+cs(n,b):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="name-stack"><div class="pname">${x(n.name)}</div></div>${typeof cardsRowChip=="function"?cardsRowChip(n.name):""}</div>
      <div class="rating-cell mono">${Gt(n)}${Pt(n,!0)}</div>
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
      <div class="col-status">${is(n.name)||os(n.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?t("lb.emptyInactive"):e==="provisional"?t("lb.emptyProv"):t("lb.emptyNone")}</div>`,Ss(i,m),requestAnimationFrame(()=>{B(".bar-fill",i).forEach(n=>{n.style.width=n.dataset.w+"%"})})}var at="all",P={key:"rank",dir:1},le="",jt=!0;function fe(){B(".sortable").forEach(s=>s.classList.remove("sorted","asc"));let e=y(`.sortable[data-key="${P.key}"]`);e&&(e.classList.add("sorted"),P.dir===1&&e.classList.add("asc"))}function Ms(){B("#stat-strip .cu").forEach(e=>Dt(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),B(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}y("#lb-qual").addEventListener("click",()=>{jt=!jt,y("#lb-qual").classList.toggle("on",jt),ut(at,P.key,P.dir)});y("#lb-filter").addEventListener("input",e=>{le=e.target.value.trim().toLowerCase(),ut(at,P.key,P.dir)});var $t=y("#theme-toggle");function me(){if(!$t)return;let e=document.documentElement.dataset.theme==="light",s=e?t("top.toDark"):t("top.toLight");$t.setAttribute("aria-pressed",String(e)),$t.setAttribute("aria-label",s),$t.title=s}$t.addEventListener("click",()=>{let s=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=s;try{localStorage.setItem("tt1v1_theme",s)}catch{}me()});me();document.addEventListener("click",e=>{let s=e.target.closest(".chip");if(s&&s.dataset.filter){B(".chip[data-filter]").forEach(c=>c.classList.remove("on")),s.classList.add("on"),at=s.dataset.filter,ut(at,P.key,P.dir);return}let a=e.target.closest(".sortable");if(a){let c=a.dataset.key;P.key===c&&P.dir===-1?P={key:"rank",dir:1}:P.key===c?P={key:c,dir:-P.dir}:P={key:c,dir:1},fe(),ut(at,P.key,P.dir);return}let i=e.target.closest("[data-goto]");i&&(e.stopPropagation(),ve("#/player/"+J(i.dataset.goto)))});document.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;let s=document.activeElement;!s||!s.dataset||!s.dataset.goto||s.tagName==="A"||s.tagName==="BUTTON"||s.tagName==="INPUT"||(e.preventDefault(),ve("#/player/"+J(s.dataset.goto)))});function Es(e){let s=e.slice();for(let a=s.length-1;a>0;a--){let i=Math.floor(Math.random()*(a+1));[s[a],s[i]]=[s[i],s[a]]}return s}function Se(e,s){let a=document.getElementById(e);if(!a)return;let i=a.querySelector(".pick-btn"),c=a.querySelector(".pick-search"),v=[...a.querySelectorAll(".pick-opt")],m=a.querySelector(".pick-empty"),b=-1,n=()=>v.filter(w=>!w.classList.contains("hide")),l=w=>{let h=n();if(!h.length){b=-1;return}b=(w%h.length+h.length)%h.length,v.forEach(k=>k.classList.remove("hover")),h[b].classList.add("hover"),h[b].scrollIntoView({block:"nearest"})},o=w=>{let h=w.trim().toLowerCase(),k=0;v.forEach(S=>{let C=!h||S.dataset.name.toLowerCase().includes(h);S.classList.toggle("hide",!C),C&&k++}),m.classList.toggle("show",k===0),b=-1,k&&l(0)},r=()=>{document.querySelectorAll(".pick.open").forEach(w=>{if(w!==a){w.classList.remove("open");let h=w.querySelector(".pick-btn");h&&h.setAttribute("aria-expanded","false")}}),a.classList.add("open"),i.setAttribute("aria-expanded","true"),c.value="",o(""),requestAnimationFrame(()=>c.focus())},u=()=>{a.classList.remove("open"),i.setAttribute("aria-expanded","false")};i.addEventListener("click",()=>{a.classList.contains("open")?u():r()}),c.addEventListener("input",()=>o(c.value)),c.addEventListener("keydown",w=>{if(w.key==="ArrowDown")w.preventDefault(),l(b+1);else if(w.key==="ArrowUp")w.preventDefault(),l(b-1);else if(w.key==="Enter"){w.preventDefault();let h=n();h[b]&&h[b].click()}else w.key==="Escape"&&(u(),i.focus())}),v.forEach(w=>{w.addEventListener("click",()=>{a.dataset.value=w.dataset.name,a.querySelector(".pick-cur").textContent=w.dataset.name,u(),s()}),w.addEventListener("mousemove",()=>{let h=n().indexOf(w);h>=0&&h!==b&&(b=h,v.forEach(k=>k.classList.remove("hover")),w.classList.add("hover"))})})}document.addEventListener("click",e=>{document.querySelectorAll(".pick.open").forEach(s=>{if(!s.contains(e.target)){s.classList.remove("open");let a=s.querySelector(".pick-btn");a&&a.setAttribute("aria-expanded","false")}})});function Ue(e,s){let a=y("#cmp-wrap"),c=Z.players.slice().sort((f,L)=>(f.rank!=null?f.rank:9999)-(L.rank!=null?L.rank:9999)||f.name.localeCompare(L.name)).map(f=>f.name);if(c.length<2){a.innerHTML=`<div class="empty">${t("cmp.notEnough")}</div>`;return}let v=f=>f[Math.floor(Math.random()*f.length)],m=f=>v(c.filter(L=>L!==f)),b=V[e]?e:v(c),n=V[s]?s:m(b);n===b&&(n=m(b)),(b!==e||n!==s)&&history.replaceState(null,"","#/compare/"+J(b)+"/"+J(n));let l=V[b],o=V[n],r=U.find(f=>f.name===b),u=U.find(f=>f.name===n),w=re(l.glicko,o.glicko,o.rd),h=re(o.glicko,l.glicko,l.rd),k=Math.round(w/(w+h)*1e3)/10,S=Math.round(1e3-k*10)/10,C=Q().filter(f=>f.a===b&&f.b===n||f.a===n&&f.b===b).map(f=>{let L=f.a===b,M=L?f.sa:f.sb,A=L?f.sb:f.sa;return{fa:M,fb:A,res:M>A?"W":M<A?"L":"D",date:f.date}}),N=C.reduce((f,L)=>(L.res==="W"?f.w++:L.res==="L"?f.l++:f.d++,f),{w:0,l:0,d:0}),I=Es(c),d=(f,L,M)=>`
    <div class="pick" id="${f}" data-value="${x(L)}">
      <button type="button" class="pick-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="${x(M)}">
        <span class="pick-cur">${x(L)}</span>
        <svg class="pick-caret" width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true"><path d="M1.2 1.2 5.5 5.6 9.8 1.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="pick-menu">
        <input class="pick-search" type="text" autocomplete="off" spellcheck="false"
          placeholder="${t("cmp.searchPlaceholder")}" aria-label="${x(M)}">
        <div class="pick-list" role="listbox" aria-label="${x(M)}">
          ${I.map(A=>{let z=V[A];return`<button type="button" class="pick-opt${A===L?" on":""}" role="option" data-name="${x(A)}" aria-selected="${A===L?"true":"false"}">
              <span class="pick-n">${x(A)}</span>
              <span class="pick-meta mono">${z&&z.rating!=null?z.rating.toFixed(1):""}</span>
            </button>`}).join("")}
          <div class="pick-empty">${t("cmp.noResults")}</div>
        </div>
      </div>
    </div>`,$=(f,L,M,A,z)=>`
    <div class="cmp-trow">
      <div class="va mono${A?" win":""}">${L}</div>
      <div class="k">${f}</div>
      <div class="vb mono${z?" win":""}">${M}</div>
    </div>`,p='<span style="color:var(--dimmer)">\u2014</span>';a.innerHTML=`
    <div class="kicker anim">${t("cmp.versus")}</div>
    <h2 class="section-head anim" style="margin:6px 0 2px">${t("cmp.title")}</h2>
    <div class="cmp-pickers anim">
      ${d("cmp-a",b,t("cmp.firstPlayer"))}
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
        <div class="cmp-name"><a href="#/player/${J(b)}">${x(b)}</a></div>
        <div class="cmp-rating mono">${l.provisional?Mt(l):l.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",l.matches,{rd:l.rd.toFixed(1)})}</div>
      </div>
      <div class="cmp-vs">
        <div class="vs-mark">${t("cmp.vsMark")}</div>
        <div class="mono" style="font-size:11px;color:var(--dimmer)">${t("cmp.h2hShort",{n:C.length})}</div>
      </div>
      <div class="cmp-side b">
        <div class="cmp-sub">${u?t("cmp.rankN",{n:u.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${J(n)}">${x(n)}</a></div>
        <div class="cmp-rating mono">${o.provisional?Mt(o):o.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",o.matches,{rd:o.rd.toFixed(1)})}</div>
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.probTitle")} <span class="n">${t("cmp.probSub")}</span></h3>
      <div class="cmp-prob-labels">
        <span style="color:var(--gold)">${x(b)} ${k.toFixed(1)}%</span>
        <span style="color:var(--blue)">${S.toFixed(1)}% ${x(n)}</span>
      </div>
      <div class="cmp-probbar"><i class="pa" style="width:${k}%"></i><i class="pb" style="width:${S}%"></i></div>
      <div class="cmp-prob-note">${t("cmp.probNote")}</div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.tale")}</h3>
      <div class="cmp-table">
        ${$(t("cmp.rating"),Pt(l),Pt(o),!l.provisional&&l.rating>o.rating,!o.provisional&&o.rating>l.rating)}
        ${$(t("cmp.rank"),r?"#"+r.rank:p,u?"#"+u.rank:p,r&&u&&r.rank<u.rank,r&&u&&u.rank<r.rank)}
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
      <h3>${t("cmp.prevMeetings")} <span class="n">${tp("cmp.meetings",C.length)}</span></h3>
      <div class="match-list">
        ${C.map(f=>`
          <div class="match-row">
            <div class="res-chip ${f.res}">${F(f.res)}</div>
            <div class="who">${x(b)}</div>
            <div class="score mono">${f.fa} \u2013 ${f.fb}</div>
            <div class="who opp"><a href="#/player/${J(n)}" style="color:var(--blue)">${x(n)}</a></div>
            <div class="date mono" title="${Oe(f.date)}">${tt(f.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("cmp.neverMet")}</div>`}
      </div>
      <div class="caption" style="margin-top:12px">${t("cmp.legacyNote")}</div>
    </div>`;let g=()=>{let f=y("#cmp-a").dataset.value,L=y("#cmp-b").dataset.value,M="#/compare/"+J(f)+"/"+J(L);St(M)!==(location.pathname.replace(/\/+$/,"")||"/")&&history.replaceState(null,"",St(M)),Ue(f,L)};Se("cmp-a",g),Se("cmp-b",g),y("#cmp-swap").addEventListener("click",()=>{let f=y("#cmp-a"),L=y("#cmp-b"),M=f.dataset.value;f.dataset.value=L.dataset.value,L.dataset.value=M,g()}),y("#cmp-copy").addEventListener("click",()=>{let f=location.href.split("#")[0]+"#/compare/"+J(b)+"/"+J(n),L=()=>{y("#cmp-copy-msg").textContent=t("cmp.linkCopied")};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(f).then(L,()=>{y("#cmp-copy-msg").textContent=f}):y("#cmp-copy-msg").textContent=f})}var Me=!1;function Ts(e){let s=window.lbCards||{},a=s.ratingSeries?s.ratingSeries(e):null;if(!a||a.length<3)return"";let i=V[e],c=Math.max(i.rating,...a.map(l=>l.r)),v=Ct(e).slice().reverse(),m=0,b=0;for(let l of v)l.res==="W"?(b++,b>m&&(m=b)):b=0;let n=[20,50,100].filter(l=>a.length>l);return`
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
    </div>`}function Cs(e){let s=document.querySelector(".pv-lower .rating-chart");if(!s)return;let a=window.lbCards||{},i=a.ratingSeries?a.ratingSeries(e):null;if(!i||i.length<3)return;let c="http://www.w3.org/2000/svg",v=900,m=330,b=56,n=18,l=18,o=58,r="all",u=!1,w=null,h=matchMedia("(prefers-reduced-motion: reduce)").matches,k=(g,f)=>{let L=document.createElementNS(c,g);for(let M in f)L.setAttribute(M,f[M]);return L},S=(g,f,L)=>{let A=(f-g||1)/L,z=Math.pow(10,Math.floor(Math.log10(A))),G=[1,2,2.5,5,10].map(W=>W*z).find(W=>W>=A)||10*z,_=[];for(let W=Math.ceil(g/G)*G;W<=f+1e-9;W+=G)_.push(W);return _},C=()=>((!w||!w.isConnected)&&(w=document.getElementById("rc-tip"),w||(w=document.createElement("div"),w.id="rc-tip",w.className="x-tip",document.body.appendChild(w))),w),N=(g,f,L)=>{let M=C();M.innerHTML=g,M.classList.add("show");let A=s.getBoundingClientRect(),z=M.offsetWidth,G=M.offsetHeight,_=f+16,W=L-G-14;_+z>A.right-8&&(_=f-z-16),W<A.top+8&&(W=L+18),_=Math.max(A.left+8,Math.min(_,A.right-z-8)),W=Math.max(A.top+8,Math.min(W,A.bottom-G-8)),M.style.left=_+"px",M.style.top=W+"px"},I=()=>{w&&w.classList.remove("show")};function d(){let g=r==="all"?i.slice():i.slice(-r),f=i.length-g.length,L=g.map(E=>E.r),M=Math.min(...L),A=Math.max(...L),z=(A-M)*.12||6;M-=z,A+=z;let G=E=>b+E/Math.max(1,g.length-1)*(v-b-n),_=E=>l+(1-(E-M)/(A-M))*(m-l-o);s.innerHTML="";for(let E of S(M,A,5)){s.appendChild(k("line",{x1:b,x2:v-n,y1:_(E).toFixed(1),y2:_(E).toFixed(1),class:"rc-grid"}));let R=k("text",{x:b-8,y:(_(E)+3.5).toFixed(1),class:"rc-lbl"});R.textContent=Math.round(E),s.appendChild(R)}let W=k("clipPath",{id:"rh-reveal"}),Jt=k("rect",{x:0,y:0,width:v,height:m});W.appendChild(Jt),s.appendChild(W);let ft=k("g",{"clip-path":"url(#rh-reveal)"});s.appendChild(ft);let we=(m-o).toFixed(1);for(let E=1;E<g.length;E++){let R=g[E].r>=g[E-1].r?"up":"down",Y=G(E-1),O=G(E),H=_(g[E-1].r),st=_(g[E].r);ft.appendChild(k("path",{d:`M${Y.toFixed(1)} ${we} L${Y.toFixed(1)} ${H.toFixed(1)} L${O.toFixed(1)} ${st.toFixed(1)} L${O.toFixed(1)} ${we} Z`,class:`rc-seg-area ${R}`})),ft.appendChild(k("path",{d:`M${Y.toFixed(1)} ${H.toFixed(1)} L${O.toFixed(1)} ${st.toFixed(1)}`,class:`rc-seg ${R}`}))}if(u){let E=Math.max(3,Math.round(g.length/10)),R=g.map((Y,O)=>{let H=0,st=0;for(let At=Math.max(0,O-E+1);At<=O;At++)H+=g[At].r,st++;return H/st});ft.appendChild(k("path",{d:R.map((Y,O)=>(O?"L":"M")+G(O).toFixed(1)+" "+_(Y).toFixed(1)).join(" "),class:"rc-trend-line"}))}let Je=g.length>90?Math.ceil(g.length/90):1;g.forEach((E,R)=>{if(R%Je&&R!==g.length-1)return;let Y=R===0?g[1].r>=g[0].r:E.r>=g[R-1].r;ft.appendChild(k("circle",{cx:G(R).toFixed(1),cy:_(E.r).toFixed(1),r:2.6,class:`rc-dot-static ${Y?"up":"down"}`}))});let ye=Math.min(6,g.length),$e=[];for(let E=0;E<ye;E++)$e.push(Math.round(E/Math.max(1,ye-1)*(g.length-1)));for(let E of $e){let R=E===0?"start":E===g.length-1?"end":"middle",Y=k("text",{x:G(E).toFixed(1),y:m-o+24,class:"rc-lbl rc-x1","text-anchor":R});if(Y.textContent=t("chart.gameN",{n:f+E+1}),s.appendChild(Y),g[E].date){let O=k("text",{x:G(E).toFixed(1),y:m-o+40,class:"rc-lbl rc-x2","text-anchor":R});O.textContent=tt(g[E].date),s.appendChild(O)}}let mt=k("g",{class:"rc-cross",style:"display:none"}),Kt=k("g",{class:"rc-slide"});Kt.appendChild(k("line",{x1:0,x2:0,y1:l,y2:m-o,class:"rc-cross-line"}));let Vt=k("g",{class:"rc-slide"});Vt.appendChild(k("circle",{cx:0,cy:0,r:6.5,class:"rc-cross-dot"})),mt.appendChild(Kt),mt.appendChild(Vt),s.appendChild(mt);let Qt=k("rect",{x:b,y:l,width:v-b-n,height:m-l-o,class:"rc-overlay"});if(s.appendChild(Qt),!h){Jt.setAttribute("width",0);let E=performance.now(),R=Y=>{let O=Math.max(0,Math.min(1,(Y-E)/900));Jt.setAttribute("width",(v*(1-Math.pow(1-O,3))).toFixed(1)),O<1&&requestAnimationFrame(R)};requestAnimationFrame(R)}let Zt=0,qt=null,Ke=E=>{let R=s.getBoundingClientRect(),Y=(E.clientX-R.left)/R.width*v,O=Math.round((Y-b)/(v-b-n)*(g.length-1));O=Math.max(0,Math.min(g.length-1,O));let H=g[O];mt.style.display="",Kt.style.transform=`translate(${G(O).toFixed(1)}px, 0px)`,Vt.style.transform=`translate(${G(O).toFixed(1)}px, ${_(H.r).toFixed(1)}px)`;let st=O>0?g[O-1].r:i[f+O-1]?i[f+O-1].r:null,Xt=[`<span style="color:${H.w>.5?"var(--green)":H.w<.5?"var(--red)":"var(--dim)"};font-weight:700">${t("pl.vsOpp",{opp:x(H.opp)})} ${H.pf}-${H.pa}</span>`],ke=`${t("chart.ratingLabel")}: ${H.r.toFixed(1)}`;if(st!=null){let te=H.r-st,ee=te>.05,se=te<-.05;ke+=` <span style="color:${ee?"var(--green)":se?"var(--red)":"var(--dim)"}">${ee?"\u25B2":se?"\u25BC":"\u2014"} ${ee?"+":se?"-":""}${Math.abs(te).toFixed(1)}</span>`}Xt.push(ke),Xt.push(`<span style="color:var(--dimmer);font-size:11px">${t("chart.hashN",{n:f+O+1})}${H.date?" \xB7 "+tt(H.date):""}</span>`),N(Xt.join(`
`),R.left+G(O)/v*R.width,R.top+_(H.r)/m*R.height)},Ve=E=>{qt=E,!Zt&&(Zt=requestAnimationFrame(()=>{if(Zt=0,qt){let R=qt;qt=null,Ke(R)}}))};Qt.addEventListener("mousemove",Ve),Qt.addEventListener("mouseleave",()=>{mt.style.display="none",I()})}d();let $=s.closest(".panel");$.querySelectorAll(".rc-range-btn").forEach(g=>{g.addEventListener("click",()=>{$.querySelectorAll(".rc-range-btn").forEach(f=>f.classList.remove("on")),g.classList.add("on"),r=g.dataset.range==="all"?"all":parseInt(g.dataset.range,10),I(),d()})});let p=$.querySelector(".rc-trend");p&&p.addEventListener("click",()=>{u=!u,p.classList.toggle("on",u),p.setAttribute("aria-pressed",String(u)),I(),d()})}function qs(e){let s=V[e],a=y("#page-player");if(!s){a.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("pl.notFound",{name:x(e)})}</div></div></div>`;return}let i=U.find(r=>r.name===e),c=Ct(e),v=c.slice(0,10),m=Ae(e),b=Math.max(3,Math.min(100,100-s.rd/120*100)),n=(typeof window.lbTankFor=="function"?window.lbTankFor(e):null)||(window.LB_TANKS||{})[e]||(window.LB_TANKS_SNAPSHOT||{})[e]||null,l=n&&n.lastLogin?Ne(n.lastLogin):"",o=n&&n.lastLogin?Fe(n.lastLogin):"";a.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">${t("pl.back")}</a>
    <div class="pv-layout">
    <div class="pv-main">
    <div class="player-hero anim">
      <div class="player-top">
        ${i?Ht(i.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
        <div>
          <div class="player-name">${x(s.name)}</div>
          ${ns(s.name)}
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
          ${Gt(s)}
          <div class="rd-bar">
            <div class="bar-track"><div class="bar-fill" style="width:${b}%"></div></div>
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
        ${v.map((r,u)=>`<div class="form-pill ${r.res}" style="animation-delay:${u*55}ms"
           title="${t("pl.vsOpp",{opp:x(r.opp)})} ${r.for_}-${r.against}">${F(r.res)}</div>`).join("")||`<span class="empty">${t("pl.noGames")}</span>`}
      </div>
    </div>
    </div>
    <div class="pv-side">${typeof cardsHeroHTML=="function"?cardsHeroHTML(e):""}</div>
    </div>

    <div class="pv-lower">
    ${Ts(e)}
    <div class="panel reveal">
      <h3>${t("pl.matchHistory")} <span class="n">${tp("pl.nGames",c.length)}</span></h3>
      <div class="match-list">
        ${c.map(r=>`
          <div class="match-row">
            <div class="res-chip ${r.res}">${F(r.res)}</div>
            <div class="who">${x(s.name)}</div>
            <div class="score mono">${r.for_} \u2013 ${r.against}</div>
            <div class="who opp"><a href="#/player/${J(r.opp)}" style="color:var(--blue)">${x(r.opp)}</a></div>
            <div class="date mono" title="${Oe(r.date)}">${tt(r.date)||t("misc.historical")}</div>
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
  </div>`,s.provisional||Dt(y("#pv-rating"),s.rating,{dec:1,dur:900}),typeof cardsMountAll=="function"&&cardsMountAll(a),Cs(e),zt()}var de="",pe="all";function As(){return Q().filter(e=>{if(pe==="dated"&&!e.date||pe==="legacy"&&e.date)return!1;if(!de)return!0;let s=de;return e.a.toLowerCase().includes(s)||e.b.toLowerCase().includes(s)||`${e.sa}-${e.sb}`.includes(s)||`${e.sb}-${e.sa}`.includes(s)||e.date&&(e.date.includes(s)||tt(e.date).toLowerCase().includes(s))||s==="legacy"&&!e.date})}function Rs(e){return e.map(s=>{let a=s.sa>s.sb,i=s.sb>s.sa;return`
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
    </div>`}).join("")||`<div class="empty">${t("matches.noResults")}</div>`}function ge(){let e=y("#gm-body"),s=As();y("#gm-count").textContent=tp("gm.count",s.length),e.innerHTML=Rs(s)}function Os(){He(),ge()}y("#gm-search")&&y("#gm-search").addEventListener("input",e=>{de=e.target.value.trim().toLowerCase(),ge()});document.querySelectorAll("#gm-filters [data-scope]").forEach(e=>{e.addEventListener("click",()=>{pe=e.dataset.scope,document.querySelectorAll("#gm-filters [data-scope]").forEach(s=>s.classList.toggle("on",s===e)),ge()})});function Fs(){let e=Z.players.filter(s=>s.provisional).sort((s,a)=>a.rating-s.rating);y("#roster-grid").innerHTML=e.map(s=>{let a=Math.min(100,Math.round(Math.min(1,s.matches/5)*50+Math.min(1,s.opponents/3)*50));return`
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
    </div>`}).join(""),requestAnimationFrame(()=>B("#roster-grid .prog-fill").forEach(s=>{s.style.width=s.dataset.w+"%"}))}var _t="all",ct=0;function Ns(){if(_t==="all")return Q();let e=Date.now(),s=Number(_t);return Q().filter(a=>a.date&&(e-Date.parse(a.date))/864e5<=s)}function be(){let e=Z.players,s=Ns(),a=_t!=="all",i,c;if(!a)i=U.filter(p=>p.matches>=ct).sort((p,g)=>g.winPct-p.winPct).slice(0,10),c=e.filter(p=>p.matches>=ct).sort((p,g)=>g.matches-p.matches).slice(0,10);else{let p={};s.forEach(f=>{[f.a,f.b].forEach(L=>{let M=p[L]=p[L]||{name:L,w:0,l:0,d:0,matches:0};M.matches+=1}),f.sa===f.sb?(p[f.a].d+=1,p[f.b].d+=1):f.sa>f.sb?(p[f.a].w+=1,p[f.b].l+=1):(p[f.a].l+=1,p[f.b].w+=1)});let g=Object.values(p).map(f=>({...f,winPct:f.matches?Math.round(f.w/f.matches*1e3)/10:0})).filter(f=>f.matches>=Math.max(ct,1));i=g.slice().sort((f,L)=>L.winPct-f.winPct).slice(0,10),c=g.slice().sort((f,L)=>L.matches-f.matches).slice(0,10)}let v=[];s.forEach(p=>{let g=V[p.a],f=V[p.b];if(!g||!f)return;let L=g.rating-f.rating;if(p.sa===p.sb)return;let M=p.sa>p.sb?p.a:p.b,A=Math.abs(L);(L<0&&M===p.a||L>0&&M===p.b)&&v.push({winner:M,loser:M===p.a?p.b:p.a,gap:A,score:M===p.a?`${p.sa}-${p.sb}`:`${p.sb}-${p.sa}`})}),v.sort((p,g)=>g.gap-p.gap);let m={};s.forEach(p=>{let g=[p.a,p.b].sort().join(" vs ");m[g]=(m[g]||0)+1});let b=Object.entries(m).sort((p,g)=>g[1]-p[1]).slice(0,10),n=e.filter(p=>p.matches>=ct).map(p=>p.rating),l=n.length?Math.min(...n):Math.min(...e.map(p=>p.rating)),o=n.length?Math.max(...n):Math.max(...e.map(p=>p.rating)),r=8,u=(o-l)/r||1,w=Array.from({length:r},()=>0);n.forEach(p=>{w[Math.min(r-1,Math.max(0,Math.floor((p-l)/u)))]++});let h=Math.max(...w,1),k=w.map((p,g)=>{let f=Math.round((l+g*u)/10)*10,L=Math.round((l+(g+1)*u)/10)*10;return`
    <div class="hcol" title="${tp("an.histTip",p,{lo:f,hi:L})}">
      <div class="hbar" data-h="${Math.round(p/h*100)}"></div>
      <div class="hlbl">${f}\u2013${L}</div>
    </div>`}).join(""),S=e.filter(p=>p.matches>=ct).sort((p,g)=>g.opponents-p.opponents).slice(0,8),C=Math.max(...S.map(p=>p.opponents),1),N=S.map(p=>`
    <div class="mrow reveal" data-goto="${x(p.name)}" tabindex="0" role="link">
      <div class="nm">${x(p.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(p.opponents/C*100)}"></div></div>
      <div class="val mono">${p.opponents}</div>
    </div>`).join(""),I=(p,g,f)=>p.map((L,M)=>`
    <div class="an-row reveal" data-goto="${x(L.name)}" tabindex="0" role="link">
      <div class="idx mono">${M+1}</div>
      <div class="nm">${x(L.name)}</div>
      <div class="val mono">${g(L)}</div>
      <div class="unit mono">${f(L)}</div>
    </div>`).join(""),d=p=>tp("an.nMatches",p.matches);y("#an-grid").innerHTML=`
    <div class="an-panel">
      <div class="head"><h3>${t("an.topWinRate")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${I(i,p=>p.winPct+"%",d)}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.mostActive")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/></svg>
      </div>
      ${I(c,p=>p.matches,p=>t("an.matchesUnit"))}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.biggestUpsets")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${v.length?v.slice(0,8).map((p,g)=>`
        <div class="an-row reveal" data-goto="${x(p.winner)}" tabindex="0" role="link" aria-label="${x(p.winner)}">
          <div class="idx mono">${g+1}</div>
          <div class="nm"><span class="an-link">${x(p.winner)}</span> <span class="an-def">${t("an.def")}</span> <span class="an-link alt" data-goto="${x(p.loser)}">${x(p.loser)}</span></div>
          <div class="val mono">${p.score}</div>
          <div class="unit mono">${t("an.plusPts",{n:Math.round(p.gap)})}</div>
        </div>`).join(""):`<div class="empty">${t("an.noUpsets")}</div>`}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.rivalries")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${b.map(([p,g],f)=>{let[L,M]=p.split(" vs ");return`
        <a class="an-row reveal" href="#/compare/${J(L)}/${J(M)}" title="${t("an.openCmp")}">
          <div class="idx mono">${f+1}</div>
          <div class="nm"><span class="an-link">${x(L)}</span> <span class="an-def">${t("vs")}</span> <span class="an-link">${x(M)}</span></div>
          <div class="val mono">${g}</div>
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
    </div>`;let $=()=>{B("#an-grid .hbar").forEach(p=>{p.style.height=p.dataset.h+"%"}),B("#an-grid .abar").forEach(p=>{p.style.width=p.dataset.w+"%"})};requestAnimationFrame($),setTimeout($,140),zt()}document.querySelectorAll("#an-controls [data-an-range]").forEach(e=>{e.addEventListener("click",()=>{_t=e.dataset.anRange==="all"?"all":Number(e.dataset.anRange),document.querySelectorAll("#an-controls [data-an-range]").forEach(s=>s.classList.toggle("on",s===e)),be()})});document.querySelectorAll("#an-controls [data-an-min]").forEach(e=>{e.addEventListener("click",()=>{ct=Number(e.dataset.anMin),document.querySelectorAll("#an-controls [data-an-min]").forEach(s=>s.classList.toggle("on",s===e)),be()})});function js(){y("#settings-body").innerHTML=De().map(e=>`
    <tr><td><b>${x(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${x(e.desc)}</div></td>
        <td class="val">${x(String(e.value))}</td></tr>`).join("")}function Is(){return Array.from({length:11},(e,s)=>({q:t("faq.q"+(s+1)),a:t("faq.a"+(s+1))}))}function It(){let e=K().faq;return Array.isArray(e)&&e.length?e:Is()}function Ps(){let e=window.cardsTiers;if(!e)return"";let{TIER_KEYS:s,tierOf:a,tierIdx:i,tierMin:c,tierLabel:v,crestSVG:m}=e,b={};s.forEach(o=>{b[o]=0}),(Z.players||[]).forEach(o=>{o&&o.rating!=null&&(b[a(o.rating)]+=1)});let n=s.reduce((o,r)=>o+b[r],0),l=s.slice().reverse().map(o=>{let r=i(o),u=c(o),w=s[r+1]!=null?c(s[r+1]):null,h=r===0?`&lt; ${Math.round(w)}`:w!=null?`${Math.round(u)}\u2013${Math.round(w)-1}`:`${Math.round(u)}+`,k=n?b[o]/n*100:0;return`
      <tr class="tier-${o}">
        <td class="fd-badge"><span class="fd-badge-in">${m(o)}<span class="fd-name">${v(o)}</span></span></td>
        <td class="fd-range mono">${h}</td>
        <td class="fd-count"><b class="mono">${b[o]}</b><i style="width:${k.toFixed(1)}%"></i></td>
      </tr>`}).join("");return`
    <p class="fd-note">${t("faq.distNote")}</p>
    <table class="fd-table">
      <thead><tr><th>${t("faq.distBadge")}</th><th>${t("faq.distRange")}</th><th>${t("faq.distPlayers")}</th></tr></thead>
      <tbody>${l}</tbody>
    </table>`}function Bs(){let e='<svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',s=(a,i,c)=>`
    <div class="faq-item reveal" data-faq="${c}">
      <button class="faq-q" aria-expanded="false">
        <span>${a}</span>
        ${e}
      </button>
      <div class="faq-a"><div class="faq-a-in">${i}</div></div>
    </div>`;y("#faq-list").innerHTML=s(x(t("faq.distTitle")),Ps(),"dist")+It().map((a,i)=>s(x(String(a.q||"")),x(String(a.a||"")),i)).join(""),zt()}document.addEventListener("click",e=>{let s=e.target.closest(".faq-q");if(!s)return;let a=s.closest(".faq-item"),i=a.classList.contains("open");B(".faq-item.open").forEach(c=>{c.classList.remove("open"),c.querySelector(".faq-q").setAttribute("aria-expanded","false")}),i||(a.classList.add("open"),s.setAttribute("aria-expanded","true"))});function lt(){let e=y("#admin-wrap");if(!ls()){e.innerHTML=`
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
    </div>`;let n=async()=>{let l=y("#admin-pw").value;try{let o=await fetch(vs,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:l})});if(o.ok){let r=await o.json().catch(()=>({}));ds(r.token||l,y("#admin-remember").checked),lt(),q("Welcome back, commander.");return}if(o.status===429){q("Too many attempts \u2014 wait a few minutes.");return}}catch{}y("#admin-pw").style.borderColor="var(--red)",q("Wrong password.")};y("#admin-auth").addEventListener("click",n),y("#admin-pw").addEventListener("keydown",l=>{l.key==="Enter"&&n()});return}let a=K(),i='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',c=a.inactive.map(n=>`
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

  <datalist id="player-list">${Z.players.map(n=>`<option value="${x(n.name)}">`).join("")}</datalist>`,y("#admin-lock").addEventListener("click",()=>{ps(),lt()}),y("#admin-publish").addEventListener("click",()=>v()),y("#admin-sync").addEventListener("click",async()=>{let n=y("#admin-sync"),l=y("#admin-sync-status");n.disabled=!0,l.textContent="syncing\u2026";try{let o=await fetch(us,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:yt()})}),r=await o.json().catch(()=>({}));o.ok&&r.ok?(l.textContent=r.changed?`synced \u2713 ${r.matches} matches / ${r.players} players`:"already up to date \u2713",q(r.changed?"Sheet synced \u2014 the live site was updated.":"Site already matches the sheet.")):o.status===429?(l.textContent="rate limited",q("Too many attempts \u2014 wait a few minutes.")):(l.textContent="sync failed",q("Sync failed: "+(r.error||o.status)))}catch{l.textContent="network error",q("Sync failed (network).")}n.disabled=!1});async function v(n){let l=!!(n&&n.silent),o=yt()||(l?"":(window.prompt("Admin password:")||"").trim());if(!o){q(l?'Saved here \u2014 auto-publish needs a stored password. Use "Publish to everyone".':"Publish cancelled.");return}oe=!0;let r=K(),u={},w=[];for(let[S,C]of Object.entries(r.matchEdits||{}))S.startsWith("a:")&&(u[S]=C);for(let S of r.matchRemoved||[])S.startsWith("a:")&&w.push(S);let h=Q().filter(S=>S.admin).map(S=>({a:S.a,b:S.b,sa:S.sa,sb:S.sb,date:S.date||""})),k={matches:h,aliases:r.aliases||{},aliasNotes:r.aliasNotes||{},aliasRemoved:r.aliasRemoved||[],inactive:r.inactive||[],seeds:r.seeds||{},seedGlicko:r.seedGlicko||{},seedRd:r.seedRd||{},seedRemoved:r.seedRemoved||[],settings:r.settings||{},matchEdits:u,matchRemoved:w,faq:r.faq!=null?r.faq:[]};try{let S=await fetch(Tt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:o,doc:k,message:`Publish match log (${h.length} matches)`})}),C=await S.json().catch(()=>({}));if(!S.ok||!C.ok){S.status===403&&sessionStorage.removeItem(it),q("Publish failed: "+(C.error||"HTTP "+S.status));return}window.LB_PUB=k,window.LB_LOG=h,hs([]),ot({}),Lt(),l||lt(),q(l?"Saved \u2014 live for everyone \u2713":"Published! Everyone sees it on their next visit.")}catch{q("Publish failed: network error.")}finally{oe=!1}}y("#admin-export").addEventListener("click",()=>{let n=new Blob([JSON.stringify(Pe(),null,2)],{type:"application/json"}),l=document.createElement("a");l.href=URL.createObjectURL(n),l.download="match-log.json",l.click(),URL.revokeObjectURL(l.href),q("Log exported.")}),y("#ov-inact-toggle").addEventListener("click",()=>{let n=y("#ov-inact-n").value.trim();if(!n){q("Type a player name first.");return}let l=rt(),o=K().inactive||[],r=o.includes(n)?o.filter(u=>u!==n):[...o,n];ot({...l,inactive:r}),Lt(),lt(),q(r.includes(n)?`${n} marked inactive.`:`${n} marked active again.`)}),y("#ov-inact-list").addEventListener("click",n=>{let l=n.target.closest("[data-inact-del]");if(!l)return;let o=rt();ot({...o,inactive:(K().inactive||[]).filter(r=>r!==l.dataset.inactDel)}),Lt(),lt()});let m=()=>{let n=It();y("#faq-admin-list").innerHTML=n.map((l,o)=>`
      <div class="log-item fix-row" data-faq-idx="${o}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${x(String(l.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${x(String(l.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${o}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${o}" title="Delete question">${i}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};m(),y("#faq-admin-list").addEventListener("click",n=>{let l=n.target.closest("[data-faq-save]"),o=n.target.closest("[data-faq-del]"),r=It().map(w=>({...w}));if(l){let w=l.closest("[data-faq-idx]");r[parseInt(l.dataset.faqSave,10)]={q:w.querySelector('[data-fq="q"]').value.trim(),a:w.querySelector('[data-fq="a"]').value.trim()}}else if(o)r.splice(parseInt(o.dataset.faqDel,10),1);else return;let u=rt();ot({...u,faq:r}),m(),q("Q&A updated \u2014 publish to make it public.")}),y("#faq-add").addEventListener("click",()=>{let n=y("#faq-new-q").value.trim(),l=y("#faq-new-a").value.trim();if(!n||!l){q("Fill in both the question and the answer.");return}let o=rt();ot({...o,faq:[...It().map(r=>({...r})),{q:n,a:l}]}),m(),q("Question added.")}),y("#faq-reset").addEventListener("click",()=>{let n=rt();ot({...n,faq:null}),m(),q("Q&A back to the built-in list.")}),window._fbTimer&&(clearInterval(window._fbTimer),window._fbTimer=null);async function b(){let n=y("#fb-inbox");if(!n||document.querySelector("#fb-inbox [data-fb-reply]:focus"))return;let l=yt();if(!l){n.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let o=await fetch(nt+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:l})}),r=await o.json().catch(()=>({}));if(!o.ok||!r.ok){n.innerHTML=`<div class="empty">Could not load messages (${x(r.error||"HTTP "+o.status)}).</div>`;return}let u=r.items||[],w={};n.querySelectorAll("[data-fb-id]").forEach(h=>{let k=h.querySelector("[data-fb-reply]");k&&k.value&&(w[h.dataset.fbId]=k.value)}),n.innerHTML=u.map(h=>`
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
        </div>`).join("")||'<div class="empty">No messages yet.</div>',n.querySelectorAll("[data-fb-id]").forEach(h=>{let k=h.querySelector("[data-fb-reply]");k&&w[h.dataset.fbId]!=null&&(k.value=w[h.dataset.fbId])})}catch{n.innerHTML='<div class="empty">Network error loading messages.</div>'}}b(),y("#fb-refresh").addEventListener("click",()=>{b(),q("Inbox refreshed.")}),window._fbTimer=setInterval(()=>{if(!y("#fb-inbox")){clearInterval(window._fbTimer),window._fbTimer=null;return}document.hidden||b()},2e3),y("#fb-inbox").addEventListener("click",async n=>{let l=n.target.closest("[data-fb-send]"),o=n.target.closest("[data-fb-del]"),r=n.target.closest("[data-fb-resolve]");if(!l&&!o&&!r)return;let u=n.target.closest("[data-fb-id]"),w=u.dataset.fbId,h=yt();try{if(r){let k=u.dataset.fbResolved!=="1";if(!(await fetch(nt+"/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:h,id:w,resolved:k})}).then(C=>C.json())).ok){q("Could not update \u2014 try again.");return}q(k?"Marked as resolved \u2713":"Message reopened."),b()}else if(l){let k=u.querySelector("[data-fb-reply]").value;if(!(await fetch(nt+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:h,id:w,reply:k})}).then(C=>C.json())).ok){q("Reply failed.");return}q("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(nt+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:h,id:w})}).then(S=>S.json())).ok){q("Delete failed.");return}u.remove(),q("Message deleted.")}}catch{q("Network error.")}})}var Rt=document.getElementById("fl-cards");Rt&&window.matchMedia("(hover: hover)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(Rt.addEventListener("pointermove",e=>{let s=e.target.closest&&e.target.closest(".fl-card");if(!s)return;let a=s.getBoundingClientRect(),i=(e.clientX-a.left)/a.width-.5,c=(e.clientY-a.top)/a.height-.5;s.classList.add("tilt"),s.style.transform=`perspective(1000px) rotateY(${(i*7).toFixed(2)}deg) rotateX(${(-c*6).toFixed(2)}deg) translateY(-6px)`}),Rt.addEventListener("pointerleave",()=>{Rt.querySelectorAll(".fl-card").forEach(e=>{e.style.transform="",e.classList.remove("tilt")})}));y("#search").addEventListener("input",e=>{let s=e.target.value.trim().toLowerCase(),a=y("#search-drop");if(!s){a.classList.remove("show");return}let i=Z.players.filter(c=>c.name.toLowerCase().includes(s)).slice(0,8);if(!i.length){a.classList.remove("show");return}a.innerHTML=i.map(c=>`
    <a class="drop-row" href="#/player/${J(c.name)}">
      ${c.rank?Ht(c.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${x(c.name)}</span>        <span class="mono" style="margin-left:auto;color:var(--dim)">${Pt(c,!0)}</span>
    </a>`).join(""),a.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||y("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(y("#search-drop").classList.remove("show"),y("#search").value="")});var nt=Tt.replace(/\/publish$/,"/feedback"),Wt="tt1v1_fb_tickets";function _s(){try{return JSON.parse(localStorage.getItem(Wt)||"[]")}catch{return[]}}function Ds(e){let s=_s();s.push({id:e,ts:Date.now()});try{localStorage.setItem(Wt,JSON.stringify(s.slice(-20)))}catch{}}function Hs(){let e=y("#fb-overlay"),s=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>y("#fb-msg").focus(),180)},a=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};y("#fab-feedback").addEventListener("click",s),y("#fb-close").addEventListener("click",a),y("#fb-done").addEventListener("click",a),e.addEventListener("click",n=>{n.target===e&&a()}),document.addEventListener("keydown",n=>{n.key==="Escape"&&e.classList.contains("show")&&a()});let i=y("#faq-feedback-btn");i&&i.addEventListener("click",s);let c=y("#fb-msg"),v=y("#fb-count-n");c.addEventListener("input",()=>{v.textContent=String(c.value.length);try{localStorage.setItem("tt1v1_fb_draft",c.value)}catch{}});try{let n=localStorage.getItem("tt1v1_fb_draft");n&&(c.value=n,v.textContent=String(n.length))}catch{}let m=y("#fb-send");m.addEventListener("click",async()=>{let n=c.value.trim();if(n.length<5){c.focus(),c.classList.add("fb-nudge"),setTimeout(()=>c.classList.remove("fb-nudge"),500),q(t("fb.writeFirst"));return}m.classList.add("busy"),m.disabled=!0;try{let l=await fetch(nt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:y("#fb-name").value.trim(),contact:y("#fb-contact").value.trim(),message:n})}),o=await l.json().catch(()=>({}));if(!l.ok||!o.ok){q(t("fb.couldNotSend",{err:o.error||"HTTP "+l.status}));return}Ds(o.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}y("#fb-ticket-code").textContent=o.id,y("#fb-view-form").hidden=!0,y("#fb-view-done").hidden=!1}catch{q(t("fb.netError"))}finally{m.classList.remove("busy"),m.disabled=!1}});let b=document.querySelector(".fb-ticket");b&&b.addEventListener("click",async()=>{let n=(y("#fb-ticket-code").textContent||"").trim();if(!n||n==="\u2014")return;try{await navigator.clipboard.writeText(n)}catch{let r=document.createElement("textarea");r.value=n,document.body.appendChild(r),r.select();try{document.execCommand("copy")}catch{}r.remove()}let l=y("#fb-copied");l&&(l.classList.add("show"),clearTimeout(window._fbCopiedT),window._fbCopiedT=setTimeout(()=>l.classList.remove("show"),1800)),q(t("fb.ticketCopied"))}),y("#fb-check").addEventListener("click",async()=>{let n=y("#fb-ticket-in").value.trim(),l=y("#fb-reply-out");if(n){l.classList.add("show"),l.textContent=t("fb.checking");try{let o=await fetch(nt+"/status?id="+encodeURIComponent(n)),r=await o.json().catch(()=>({}));if(!o.ok||!r.ok){l.textContent=t("fb.noTicket");return}l.innerHTML=r.resolved?`${t("fb.statusResolved")}${r.reply?`<br>${t("fb.replyFrom",{reply:x(r.reply)})}`:""}`:r.reply?t("fb.replyFrom",{reply:x(r.reply)}):t("fb.statusPending",{status:x(r.status)})}catch{l.textContent=t("fb.netErrorShort")}}})}function Us(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let s=null,a=null,i=null,c=0,v=0,m=0,b=r=>{let u=r&&r.closest?r.closest("[title],[data-tip]"):null;return u&&u.hasAttribute("title")&&(u.setAttribute("data-tip",u.getAttribute("title")),u.removeAttribute("title")),u&&u.getAttribute("data-tip")?u:null},n=(r,u)=>{let w=e.offsetWidth,h=e.offsetHeight,k=r+14,S=u+18;k+w>window.innerWidth-8&&(k=r-w-14),S+h>window.innerHeight-8&&(S=u-h-14),k=Math.max(8,k),S=Math.max(8,S);let C=e.classList.contains("show")&&e.style.left?Math.abs(parseFloat(e.style.left)-k)+Math.abs(parseFloat(e.style.top)-S)<150:!1;e.classList.toggle("snap",!C),e.style.left=k+"px",e.style.top=S+"px"},l=(r,u,w)=>{s=r,e.textContent=r.getAttribute("data-tip"),n(u,w),e.classList.add("show")},o=()=>{clearTimeout(a),clearTimeout(i),a=i=null,e.classList.remove("show"),s=null};document.addEventListener("mousemove",r=>{v=r.clientX,m=r.clientY;let u=b(r.target);if(u){if(clearTimeout(i),i=null,u===s){e.classList.contains("show")&&(cancelAnimationFrame(c),c=requestAnimationFrame(()=>n(v,m)));return}clearTimeout(a),e.classList.contains("show")?l(u,v,m):a=setTimeout(()=>l(u,v,m),90);return}s&&!i&&(i=setTimeout(o,110))},{passive:!0}),window.addEventListener("scroll",o,{passive:!0}),document.addEventListener("mousedown",o,{passive:!0})}var Ee;function q(e){let s=y("#toast");s.textContent=e,s.classList.add("show"),clearTimeout(Ee),Ee=setTimeout(()=>s.classList.remove("show"),2600)}var gt;function zt(){gt&&gt.disconnect(),gt=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&(s.target.classList.add("in"),B(".cu",s.target).forEach(a=>Dt(a,parseFloat(a.dataset.target),{dec:parseInt(a.dataset.dec||0)})),gt.unobserve(s.target))})},{threshold:.12}),B(".reveal").forEach(e=>gt.observe(e))}(function(){let s=y("#scroll-progress"),a=y("#to-top"),i=y("#page-home .hero-row"),c=document.querySelector(".topbar"),v=!1,m=null,b=null,n=()=>{v=!1;let u=window.scrollY,w=document.documentElement.scrollHeight-window.innerHeight;if(s&&(s.style.transform=`scaleX(${w>0?Math.min(1,u/w):0})`),a&&a.classList.toggle("show",u>640),c&&c.classList.toggle("scrolled",u>10),i&&u<1400){let h=Math.round(u*.14),k=Math.max(.3,1-u/950).toFixed(2);h!==m&&(i.style.transform=`translateY(${h}px)`,m=h),k!==b&&(i.style.opacity=k,b=k)}},l,o=document.documentElement,r=()=>{o.classList.add("is-scrolling"),c&&c.classList.add("scrolling"),clearTimeout(l),l=setTimeout(()=>{o.classList.remove("is-scrolling"),c&&c.classList.remove("scrolling")},160),v||(v=!0,requestAnimationFrame(n))};window.addEventListener("scroll",r,{passive:!0}),a&&a.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),n()})();window.lbScrollNow=e=>{window.scrollTo({top:e||0,behavior:"instant"})};window.lbCards={topOf:()=>U,all:()=>Z.players,byName:()=>V,histOf:Ct,h2hOf:Ae,deltaTag:Gt,resLetter:F,fmtDate:tt,canon:j,allMatches:Q,ratingTimeline:Qs,ratingSeries:Zs,altsOf:qe,lastSeenText:Ne,lastSeenExact:Fe};Lt();he();ht();Hs();Us();window.addEventListener("lb-lang",()=>{let e=window.scrollY,s=at,a={...P};ht(),y("#page-home").classList.contains("active")&&(s!=="all"||a.key!=="rank"||a.dir!==1)&&(at=s,P=a,B(".chip[data-filter]").forEach(i=>i.classList.toggle("on",i.dataset.filter===s)),fe(),ut(s,a.key,a.dir)),me(),window.lbScrollNow(e)});function bt(e,s){let a=e.indexOf("window."+s);if(a<0)return null;let i=e.indexOf("=",a);for(;i<e.length&&"{[".indexOf(e[i])<0;)i++;let c=0,v=!1,m="",b=!1;for(let n=i;n<e.length;n++){let l=e[n];if(v){b?b=!1:l==="\\"?b=!0:l===m&&(v=!1);continue}if(l==='"'||l==="'"){v=!0,m=l;continue}if(l==="{"||l==="[")c++;else if((l==="}"||l==="]")&&(c--,c<=0))return JSON.parse(e.slice(i,n+1))}return null}var Te="https://tierstats.github.io/";async function Ce(e,s){for(let a of e)try{let i=await fetch(a+(a.includes("?")?"&":"?")+s,{cache:"no-store"});if(i.ok)return await i.text()}catch{}return null}async function Yt(e){try{let s="cb="+Date.now(),[a,i]=await Promise.all([Ce([Te+"data.js","data.js"],s),Ce([Te+"log.js","log.js"],s)]);if(!a||!i)throw new Error("data unavailable");let c=bt(a,"LB_TANKS");c&&(window.LB_TANKS={...window.LB_TANKS_SNAPSHOT||{},...c});let v=bt(a,"LB_DATA"),m=bt(i,"LB_PUB")||(bt(i,"LB_LOG")?{matches:bt(i,"LB_LOG")}:null),b=[];if(v&&JSON.stringify(v)!==JSON.stringify(D)&&(D=v,window.LB_DATA=v,b.push("data")),m&&JSON.stringify(m)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=m,window.LB_LOG=m.matches||[],b.push("log")),b.length){let n=window.scrollY;Lt(),he(),ht(),window.scrollTo({top:n,behavior:"instant"}),document.querySelectorAll(".reveal:not(.in), .anim:not(.in)").forEach(o=>o.classList.add("in"));let l=y("#last-updated");l&&(l.textContent=t("home.lastUpdated",{when:tt(D.generated)||"today"}))}e&&q(b.length?t("misc.refreshed"):t("misc.upToDate"))}catch{e&&q(t("misc.refreshFailed"))}}Yt(!1);var Ot=y("#lb-refresh-btn");Ot&&Ot.addEventListener("click",async()=>{Ot.classList.add("spinning"),await Yt(!0),setTimeout(()=>Ot.classList.remove("spinning"),400)});setInterval(()=>Yt(!1),6e4);document.addEventListener("visibilitychange",()=>{document.hidden||Yt(!1)});var Ge="tt1v1_fb_seen",X=null;function Gs(){try{return JSON.parse(localStorage.getItem(Wt)||"[]")}catch{return[]}}function We(){try{return JSON.parse(localStorage.getItem(Ge)||"{}")||{}}catch{return{}}}function Ws(){let e=y("#fab-feedback");if(e&&!e.querySelector(".fb-dot")){let a=document.createElement("span");a.className="fb-dot",e.appendChild(a),requestAnimationFrame(()=>a.classList.add("in"))}let s=y("#fb-view-form");if(s&&!y("#fb-reply-banner")&&X){let a=document.createElement("div");a.id="fb-reply-banner",a.innerHTML=`${t("fb.teamReplied",{id:x(X.id)})}
      <div class="r">${x(X.reply)}</div>
      <button class="btn btn-ghost" id="fb-got-it" style="margin-top:9px;padding:6px 13px">${t("fb.gotIt")}</button>`,s.insertAdjacentElement("beforebegin",a),requestAnimationFrame(()=>a.classList.add("show")),y("#fb-got-it").addEventListener("click",zs)}}function zs(){if(X){let a=We();a[X.id]=1;try{localStorage.setItem(Ge,JSON.stringify(a))}catch{}X=null}let e=y(".fb-dot");e&&(e.classList.add("out"),setTimeout(()=>e.remove(),420));let s=y("#fb-reply-banner");s&&(s.classList.remove("show"),setTimeout(()=>s.remove(),420))}async function ze(){let e=We();X=null;let s=Gs(),a=s.slice(0,Math.max(0,s.length-6)),i=[];for(let c of s.slice(-6))try{let v=await fetch(nt+"/status?id="+encodeURIComponent(c.id),{cache:"no-store"}),m=await v.json().catch(()=>({}));if(v.status===404||v.ok&&m.ok===!1)continue;i.push(c),v.ok&&m.ok&&m.reply&&!e[c.id]&&!X&&(X={id:c.id,reply:m.reply})}catch{i.push(c)}if(i.length!==s.slice(-6).length)try{localStorage.setItem(Wt,JSON.stringify([...a,...i]))}catch{}X&&Ws()}setTimeout(ze,3500);setInterval(ze,9e4);var Ys=Tt.replace(/\/publish$/,"/api/ttstats"),Js=15e3;function Ks(e,s){let a=e&&e.stats||{};return s==="kd"?a.deaths?a.kills/a.deaths:a.kills!=null?a.kills:null:a[s]!=null?a[s]:null}function Vs(e){let s=a=>String(a).replace(/["\\]/g,"\\$&");Object.keys(e).forEach(a=>{let i=e[a];window.LB_TANKS=Object.assign({},window.LB_TANKS||{},{[a]:i}),document.querySelectorAll(`[data-live-name="${s(a)}"][data-live]`).forEach(c=>{let v=c.dataset.live,m=Ks(i,v);if(m==null)return;let b=v==="kd"&&i.stats&&i.stats.deaths?2:0,n=Number(m.toFixed(b)),l=parseFloat(String(c.textContent).replace(/[^0-9.\-]/g,""));(isNaN(l)||l!==n)&&Dt(c,n,{dec:b,dur:900})}),document.querySelectorAll(`canvas[data-tank-name="${s(a)}"]`).forEach(c=>{c.dataset.mounted&&window.TankRender&&window.TankRender.render(c,i,c.dataset.tankSize||"medium")})})}(function(){let s=!1,a=0,i=new Set,c=0,v=0,m=n=>{a||(a=setTimeout(()=>{a=0,b()},n))};window.lbTankWant=n=>{n&&i.add(String(n)),s&&m(350)};let b=async()=>{if(s){m(300);return}if(document.visibilityState!=="visible")return;let n=[...new Set([...[...document.querySelectorAll("[data-live-name]")].map(d=>d.dataset.liveName),...[...document.querySelectorAll("canvas[data-tank-name]")].map(d=>d.dataset.tankName)])].filter(Boolean),l=window.LB_DATA||{},o=[...new Set([...l.qualified||[],...l.players||[]].map(d=>d&&d.name).filter(Boolean))],r=12,u=new Set,w=(d,$,p)=>{let g=[];for(let f=0;f<d.length&&g.length<p;f++){let L=d[($+f)%d.length];u.has(L)||(u.add(L),g.push(L))}return g},h=[...i].filter(Boolean);h.forEach(d=>u.add(d));let k=n.filter(d=>!u.has(d)),S=w(k,c,Math.min(6,Math.max(0,r-u.size)));k.length>S.length&&(c=(c+S.length)%k.length);let C=o.filter(d=>!u.has(d)),N=w(C,v,Math.max(0,r-u.size));C.length>N.length&&(v=(v+N.length)%C.length);let I=[...h,...S,...N].slice(0,r);if(I.length){s=!0;try{let $=await(await fetch(Ys+"?names="+encodeURIComponent(I.join(",")),{cache:"no-store"})).json();$&&$.ok&&$.tanks&&(Vs($.tanks),typeof window.lbTankFreshMark=="function"&&window.lbTankFreshMark(Object.keys($.tanks))),I.forEach(p=>i.delete(p))}catch{}s=!1}};window.lbLiveStatsTick=()=>m(0),b(),setTimeout(b,900),setInterval(b,Js)})();var kt=null;function Ye(){if(kt)return kt;let e={},s=(o,r,u,w)=>{let h=r-T.conservative*u;(!e[o]||h>e[o].rating)&&(e[o]={rating:h,date:w||""})},a={},i=o=>{if(!a[o]){let[r,u]=ce(o);a[o]={r,rd:u,lastIdx:null}}return a[o]},c={};for(let o of Q()){if(o.date)continue;let r=o.sa>o.sb?1:o.sa<o.sb?0:.5;(c[o.a]=c[o.a]||[]).push([o.b,r]),(c[o.b]=c[o.b]||[]).push([o.a,1-r]),i(o.a).lastIdx=et,i(o.b).lastIdx=et}let v={};for(let o in c)v[o]=[i(o).r,i(o).rd];for(let o in c){let r=i(o),[u,w]=dt(r.r,r.rd,c[o].map(([h,k])=>[v[h][0],v[h][1],k]));r.r=u,r.rd=w,s(o,u,w,T.graceStart)}let m={},b={};for(let o in a)b[j(o)]={r:a[o].r,rd:a[o].rd,lastIdx:a[o].lastIdx};let n=o=>{if(!b[o]){let[r,u]=ce(o);b[o]={r,rd:u,lastIdx:null}}return b[o]};for(let o of Q().slice().reverse()){let r=o.date?Et(o.date):null,u=j(o.a),w=j(o.b),h=n(u),k=n(w);if(r!=null)for(let $ of[h,k]){let p=r-($.lastIdx==null?et:$.lastIdx);p>0&&($.rd=Math.min(Math.sqrt($.rd*$.rd+T.growth*T.growth*p),T.maxRd))}let S=o.sa>o.sb?1:o.sa<o.sb?0:.5,[C,N]=dt(h.r,h.rd,[[k.r,k.rd,S]]),[I,d]=dt(k.r,k.rd,[[h.r,h.rd,1-S]]);h.r=C,h.rd=N,r!=null&&(h.lastIdx=r),k.r=I,k.rd=d,r!=null&&(k.lastIdx=r),o.date&&((m[u]=m[u]||[]).push({date:o.date,r:C-T.conservative*N,opp:o.b,pf:o.sa,pa:o.sb,w:S}),(m[w]=m[w]||[]).push({date:o.date,r:I-T.conservative*d,opp:o.a,pf:o.sb,pa:o.sa,w:1-S}))}let l=new Map;for(let o of Q().filter(r=>r.date).slice().reverse()){let r=Et(o.date);l.has(r)||l.set(r,[]),l.get(r).push({a:j(o.a),b:j(o.b),sa:+o.sa,sb:+o.sb,date:o.date})}for(let o of[...l.keys()].sort((r,u)=>r-u)){for(let h in a){let k=a[h],S=o-(k.lastIdx==null?et:k.lastIdx);S>0&&(k.rd=Math.min(Math.sqrt(k.rd*k.rd+T.growth*T.growth*S),T.maxRd))}let r={},u="";for(let h of l.get(o)){let k=h.sa>h.sb?1:h.sa<h.sb?0:.5;(r[h.a]=r[h.a]||[]).push([h.b,k]),(r[h.b]=r[h.b]||[]).push([h.a,1-k]),i(h.a).lastIdx=o,i(h.b).lastIdx=o,h.date>u&&(u=h.date)}let w={};for(let h in r)w[h]=[i(h).r,i(h).rd];for(let h in r){let k=i(h),[S,C]=dt(k.r,k.rd,r[h].map(([N,I])=>[w[N][0],w[N][1],I]));k.r=S,k.rd=C,s(h,S,C,u)}}return kt={peaks:e,series:m},kt}function Qs(){return Ye().peaks}function Zs(e){let s=j(e);return(Ye().series[s]||[]).slice()}})();
