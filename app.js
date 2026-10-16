/* 1v1 Leaderboard — © Alternator & interstellar. Proprietary. Do not copy. */
"use strict";(()=>{var D=window.LB_DATA,Tt="https://tierstats-publish.tierstats.workers.dev/publish",y=(e,s=document)=>s.querySelector(e),B=(e,s=document)=>[...s.querySelectorAll(e)],x=e=>String(e).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),J=e=>encodeURIComponent(String(e)),ne=e=>decodeURIComponent(e),St=e=>{let s=String(e||"").replace(/^#/,"");return s&&s!=="/"?s:"/"},Ze=()=>"#/"+location.pathname.replace(/\/+$/,"").replace(/^\//,"");function ue(e){history.pushState(null,"",St(e)),ht()}function Ht(e,s,a={}){let n=a.dur||1200,r=a.dec||0,v=performance.now(),m=parseFloat(e.textContent)||0;function g(i){let l=Math.min(1,(i-v)/n),o=1-Math.pow(1-l,3);e.textContent=(m+(s-m)*o).toFixed(r),l<1&&requestAnimationFrame(g)}requestAnimationFrame(g),setTimeout(()=>{e.textContent=s.toFixed(r)},n+300)}function Pt(){let e=document.querySelector("#page-player .player-name");if(!e||!e.offsetWidth)return;e.style.fontSize="";let s=parseFloat(getComputedStyle(e).fontSize)||48,a=16;for(let n=s;n>a;n-=1)if(e.style.fontSize=n+"px",e.scrollWidth<=e.clientWidth+1)return;e.style.fontSize=a+"px"}var Xe='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>',ts='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';function Ut(e,s=""){let a=e===1?"rb1":e===2?"rb2":e===3?"rb3":"",n=e<=3?e===1?Xe:ts:"",r=s.includes("lg")?`<span class="num"><span class="rk-hash">#</span>${e}</span>`:`<span class="num">${e}</span>`;return`<div class="rank-badge ${a} ${s}" title="${t("home.rankTip",{n:e})}">${n}${r}</div>`}var F=e=>t(e==="W"?"rec.wLetter":e==="L"?"rec.lLetter":"rec.dLetter"),V={},U=[],Z={players:[],byName:{},qualified:[]},wt={},Ft={},pt={},ie=new Set,he={prevRatings:{},prevRanks:{}};function es(){try{localStorage.removeItem("tt1v1_baseline")}catch{}he={prevRatings:{...D.prevRatings||{}},prevRanks:{...D.prevRanks||{}}}}function ss(){for(let a in wt)delete wt[a];let e=new Set(K().aliasRemoved||[]);Object.entries(D.aliases).forEach(([a,n])=>{e.has(a)||(wt[a.toLowerCase()]=n)}),Object.entries(K().aliases||{}).forEach(([a,n])=>{wt[String(a).toLowerCase()]=n});for(let a of Object.keys(Ft))delete Ft[a];for(let a of Object.keys(pt))delete pt[a];ie.clear();let s=(a,n)=>{Object.keys(a||{}).forEach(r=>{let v=j(r);v!==r&&(n[v]=a[r])}),Object.keys(a||{}).forEach(r=>{let v=j(r);v===r&&(n[v]=a[r])})};s(D.seeds,Ft),s(he.prevRatings,pt),(D.inactiveList||[]).forEach(a=>ie.add(j(a)))}var oe={},Le=e=>String(e).toLowerCase().replace(/[^a-z0-9]/g,"").replace(/0/g,"o").replace(/1/g,"i").replace(/3/g,"e").replace(/5/g,"s");function as(e,s){if(Math.abs(e.length-s.length)>3)return 99;let a=Array.from({length:s.length+1},(n,r)=>r);for(let n=1;n<=e.length;n++){let r=[n];for(let v=1;v<=s.length;v++)r[v]=Math.min(a[v]+1,r[v-1]+1,a[v-1]+(e[n-1]===s[v-1]?0:1));if(a=r,Math.min(...a)>3)return 99}return a[s.length]}function ns(){let e={},s=new Set(K().aliasRemoved||[]),a=r=>{let v=String(r).trim(),m=j(v);!v||Le(v)===Le(m)||as(v.toLowerCase(),m.toLowerCase())<=2||(e[m]=e[m]||[]).push(v)};Object.keys(D.aliases).forEach(r=>{s.has(r)||a(r)}),Object.keys(K().aliases||{}).forEach(a);for(let r of Object.keys(e)){let v=new Set([r.toLowerCase()]);e[r]=e[r].filter(m=>{let g=m.toLowerCase();return v.has(g)?!1:(v.add(g),!0)}).sort((m,g)=>m.localeCompare(g))}let n=D.cards&&D.cards.alts||{};Object.keys(n).forEach(r=>{let v=j(r),m=n[r];e[v]=(Array.isArray(m)?m:String(m||"").split(/[,;]/)).map(g=>String(g).trim()).filter(Boolean)}),oe=e}function Ae(e){return oe[e]||oe[j(e)]||[]}function is(e,s=""){let a=Ae(e);if(!a.length)return"";if(s==="hero"){let r=a.slice(0,2).map(g=>`<span class="alt-chip">${x(g)}</span>`),v=a.length>2?`<span class="alt-more">+${a.length-2}</span>`:"",m=r.slice(0,-1).join("")+`<span class="alt-tail">${r.slice(-1).join("")}${v}</span>`;return`<div class="p-alt hero-alt" title="${x(a.join(", "))}">${t("lb.aka",{names:m})}</div>`}let n=a.slice(0,2).join(", ")+(a.length>2?` +${a.length-2}`:"");return`<div class="p-alt" title="${x(a.join(", "))}">${t("lb.aka",{names:x(n)})}</div>`}var j=e=>{let s=String(e).trim(),a=new Set;for(;;){let n=wt[s.toLowerCase()];if(!n||n===s||a.has(s))return s;a.add(s),s=n}};function Ct(e){let s=[];return Q().forEach(a=>{let n=(r,v,m)=>({opp:r,for_:v,against:m,res:v>m?"W":v<m?"L":"D",date:a.date});a.a===e?s.push(n(a.b,a.sa,a.sb)):a.b===e&&s.push(n(a.a,a.sb,a.sa))}),s}function Re(e){let s={};return Ct(e).forEach(a=>{let n=s[a.opp]||(s[a.opp]={w:0,l:0,d:0,pf:0,pa:0});n[a.res.toLowerCase()]+=1,n.pf+=a.for_,n.pa+=a.against}),Object.entries(s).map(([a,n])=>({opp:a,...n})).sort((a,n)=>n.w+n.l+n.d-(a.w+a.l+a.d)||n.w-a.w)}function os(e){let s=V[e]||{};return s.provisional?`<span class="tag prov">${t("tag.provisional")}</span>`:s.inactive?`<span class="tag inact">${t("tag.inactive")}</span>`:""}function rs(e){let s=Ct(e).slice(0,5).reverse();if(!s.length)return"";let a=s.map(n=>F(n.res)).join(" ");return`<span class="form" title="${t("form.title",{n:s.length,seq:a})}">${s.map(n=>`<i class="${n.res.toLowerCase()}">${F(n.res)}</i>`).join("")}</span>`}function Gt(){let e=typeof getLang=="function"?getLang():"en";return{en:"en-US",zh:"zh-CN",ja:"ja-JP",ru:"ru-RU"}[e]||"en-US"}function Oe(e){let s=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||"").slice(0,10));return s?new Date(+s[1],+s[2]-1,+s[3]):null}function tt(e){let s=Oe(e);if(!s)return"";let a=s.getFullYear()===new Date().getFullYear();try{return new Intl.DateTimeFormat(Gt(),a?{month:"short",day:"numeric"}:{year:"numeric",month:"short",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Fe(e){let s=Oe(e);if(!s)return"";try{return new Intl.DateTimeFormat(Gt(),{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(s)}catch{return String(e).slice(0,10)}}function Ne(e){let s=new Date(Number(e)*1e3);if(!Number.isFinite(s.getTime()))return"";try{return new Intl.DateTimeFormat(Gt(),{dateStyle:"medium",timeStyle:"short"}).format(s)}catch{return s.toISOString().slice(0,16).replace("T"," ")}}function je(e){let s=Math.floor(Date.now()/1e3)-Number(e);if(!Number.isFinite(s))return"";let a=[["year",31536e3],["month",2592e3],["week",604800],["day",86400],["hour",3600],["minute",60]];try{let n=new Intl.RelativeTimeFormat(Gt(),{numeric:"auto"});for(let[r,v]of a)if(s>=v)return n.format(-Math.floor(s/v),r);return n.format(-Math.max(0,s),"second")}catch{let r=Math.floor(s/86400);return r>0?r+"d":"<1d"}}function Wt(e){let s=e.delta!=null?e.delta:0;if(Math.abs(s)<.05)return"";let a=s>0,n=Math.abs(s).toFixed(1);return`<span class="delta ${a?"up":"down"}" title="${a?t("delta.upTitle",{n}):t("delta.downTitle",{n})}">${a?"\u25B2":"\u25BC"} ${n}</span>`}function cs(){let e=he.prevRanks||{},s=Object.keys(e);if(s.length){let r={};return s.forEach(v=>{r[j(v)]=e[v]}),r}let a={};U.forEach(r=>{pt[r.name]!=null&&(a[r.name]=pt[r.name])});let n={};return Object.entries(a).sort((r,v)=>v[1]-r[1]).forEach(([r],v)=>{n[r]=v+1}),n}function ls(e,s){let a=s[e.name]!=null?s[e.name]:s[j(e.name)];if(a==null){let r=(D.newSince||{})[e.name];return!r||(Date.now()-Date.parse(r))/864e5>5?"":`<span class="mv new" title="${t("mv.newTitle")}">${t("mv.new")}</span>`}let n=a-e.rank;return n>0?`<span class="mv up" title="${tp("mv.up",n)}">\u25B2${n}</span>`:n<0?`<span class="mv down" title="${tp("mv.down",-n)}">\u25BC${-n}</span>`:""}function Mt(e){return`${Math.round(e.rating-100)} \u2013 ${Math.round(e.rating+100)}`}function Bt(e,s){if(!e.provisional)return e.rating.toFixed(1);let a=s?`${Math.round(e.rating-100)}\u2013${Math.round(e.rating+100)}`:Mt(e);return`<span class="prov-range" title="${t("rating.provTitle")}">${a}</span>`}var Ie="tt1v1_admin_log_v1",vt="tt1v1_admin_ok",it="tt1v1_admin_pw",ds=()=>sessionStorage.getItem(vt)==="1"||localStorage.getItem(vt)==="1",yt=()=>sessionStorage.getItem(it)||localStorage.getItem(it)||"";function ps(e,s){s?(localStorage.setItem(vt,"1"),localStorage.setItem(it,e)):(sessionStorage.setItem(vt,"1"),sessionStorage.setItem(it,e),localStorage.removeItem(vt),localStorage.removeItem(it))}function vs(){[sessionStorage,localStorage].forEach(e=>{e.removeItem(vt),e.removeItem(it)})}var Se=null,re=!1;function Pe(){re||!yt()||(clearTimeout(Se),Se=setTimeout(()=>publishLog({silent:!0}),1500))}var us=Tt.replace(/\/publish$/,"/verify"),hs=Tt.replace(/\/publish$/,"/sync");function Be(){try{return JSON.parse(localStorage.getItem(Ie)||"[]")}catch{return[]}}function fs(e){try{localStorage.setItem(Ie,JSON.stringify(e))}catch{}Pe()}var _e="tt1v1_admin_over_v1";function rt(){try{return JSON.parse(localStorage.getItem(_e)||"{}")||{}}catch{return{}}}function ot(e){try{localStorage.setItem(_e,JSON.stringify(e))}catch{}Pe()}function K(){let e=window.LB_PUB||{},s=rt(),a=new Set([...e.aliasRemoved||[],...s.aliasRemoved||[]]),n=new Set([...e.seedRemoved||[],...s.seedRemoved||[]]),r=s.aliases||{},v={...s.seeds||{},...s.seedGlicko||{},...s.seedRd||{}},m=w=>Object.fromEntries(Object.entries(w||{}).filter(([h])=>!a.has(h)||r[h]!=null)),g=w=>Object.fromEntries(Object.entries(w||{}).filter(([h])=>!n.has(h)||v[h]!=null)),i=m({...e.aliases||{},...s.aliases||{}}),l=m({...e.aliasNotes||{},...s.aliasNotes||{}}),o=g({...e.seeds||{},...s.seeds||{}}),c=g({...e.seedGlicko||{},...s.seedGlicko||{}}),p=g({...e.seedRd||{},...s.seedRd||{}});return{aliases:i,aliasNotes:l,seeds:o,seedGlicko:c,seedRd:p,aliasRemoved:[...a].filter(w=>i[w]==null),seedRemoved:[...n].filter(w=>o[w]==null&&c[w]==null&&p[w]==null),settings:{...e.settings||{},...s.settings||{}},matchEdits:{...e.matchEdits||{},...s.matchEdits||{}},inactive:s.inactive||e.inactive||[],matchRemoved:[...new Set([...e.matchRemoved||[],...s.matchRemoved||[]])],faq:s.faq!=null?s.faq:e.faq!=null?e.faq:null}}function ms(){return window.LB_PUB&&Array.isArray(window.LB_PUB.matches)?window.LB_PUB.matches:Array.isArray(window.LB_LOG)?window.LB_LOG:[]}function Q(){let e=K(),s=e.matchEdits||{},a=new Set(e.matchRemoved||[]),n=(c,p)=>{if(a.has(p))return null;let w=s[p],h=w?{...c,sa:w.sa,sb:w.sb,date:w.date!=null?w.date:c.date}:c;return{...h,a:j(h.a),b:j(h.b),sa:+h.sa,sb:+h.sb,key:p}},r=Be().map((c,p)=>n({...c,admin:!0,published:!1},"l:"+p)).filter(Boolean),v=ms().map((c,p)=>n({...c,admin:!0,published:!0},"p:"+p)).filter(Boolean),m=D.matches.map((c,p)=>n({...c,admin:!1,published:!1},"a:"+p)).filter(Boolean).reverse(),g=c=>{let p=c.a>c.b;return[p?c.b:c.a,p?c.a:c.b,p?c.sb:c.sa,p?c.sa:c.sb,c.date||""].join("|")},i={};m.forEach(c=>{let p=g(c);i[p]=(i[p]||0)+1});let l={};return r.concat(v).filter(c=>{let p=g(c);return l[p]=(l[p]||0)+1,l[p]>(i[p]||0)}).concat(m)}var T={seedMid:1500,oldMid:80,ptsPer:30,knownRd:80,unratedR:1500,unratedRd:250,maxRd:250,growth:20,periodDays:30,conservative:.5,minMatches:5,minOpp:3,inactiveDays:365,graceStart:"2026-10-04",graceDays:365,minSeed:700},Nt=864e5,xt=Math.log(10)/400,De=e=>1/Math.sqrt(1+3*xt*xt*e*e/(Math.PI*Math.PI)),ce=(e,s,a)=>1/(1+Math.pow(10,-De(a)*(e-s)/400));function gs(e){let s=K().seeds||{};return s[e]!=null&&s[e]!==""?Number(s[e]):Ft[e]}function le(e){let s=(K().seedGlicko||{})[e],a=(K().seedRd||{})[e],n=s!=null&&s!==""?Number(s):null,r=a!=null&&a!==""?Number(a):null;if(n!=null||r!=null)return[n??T.unratedR,r??T.unratedRd];let v=gs(e);return v!=null?[Math.max(T.seedMid+(v-T.oldMid)*T.ptsPer,T.minSeed),T.knownRd]:[T.unratedR,T.unratedRd]}function dt(e,s,a){let n=0,r=0;for(let[m,g,i]of a){let l=De(g),o=ce(e,m,g);n+=l*l*o*(1-o),r+=l*(i-o)}if(n*=xt*xt,n<=0)return[e,s];let v=1/(s*s)+n;return[e+xt/v*r,Math.sqrt(1/v)]}function bs(e,s){let a=Math.pow(10,s),n=e*a,r=Math.floor(n);return Math.abs(n-r-.5)<1e-6?(r+1)/a:Math.round(n)/a}var Et=e=>Math.floor(Date.parse(e+"T00:00:00Z")/(T.periodDays*Nt)),et=Et(T.graceStart),ws={"Seed Glicko midpoint":"seedMid","Old rating midpoint":"oldMid","Glicko points per old rating point":"ptsPer","Known-player starting RD":"knownRd","Unrated-player starting rating":"unratedR","Unrated-player starting RD":"unratedRd","Maximum RD":"maxRd","RD growth per rating period":"growth","Rating period length (days)":"periodDays","Conservative RD multiplier":"conservative","Minimum matches for leaderboard":"minMatches","Minimum different opponents":"minOpp","Inactive after days":"inactiveDays","Legacy grace start date":"graceStart","Legacy grace days":"graceDays"};function He(){let e=K().settings||{};return(D.settings||[]).map(s=>({...s,value:Object.prototype.hasOwnProperty.call(e,s.name)?e[s.name]:s.value}))}function ys(){for(let e of He()){let s=ws[e.name];if(!s)continue;if(s==="graceStart"){let n=String(e.value==null?"":e.value).slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(n)&&(T.graceStart=n);continue}let a=Number(e.value);Number.isFinite(a)&&(T[s]=a)}et=Et(T.graceStart),B(".cons-val").forEach(e=>{e.textContent=String(T.conservative)}),B(".min-matches-val").forEach(e=>{e.textContent=String(T.minMatches)}),B(".min-opp-val").forEach(e=>{e.textContent=String(T.minOpp)})}function $s(){ys(),ss(),ns();let e={},s=d=>{if(!e[d]){let[$,u]=le(d);e[d]={name:d,r:$,rd:u,w:0,l:0,d:0,games:0,opps:new Set,lastIdx:null,lastDate:null}}return e[d]},a=(d,$,u,b,f,L)=>{let M=s(d);M.games++,M.opps.add($),u>b?M.w++:u<b?M.l++:M.d++,M.lastIdx=L,f&&(M.lastDate=f)},n={};for(let d of Q()){if(d.date)continue;let $=j(d.a),u=j(d.b),b=d.sa>d.sb?1:d.sa<d.sb?0:.5;(n[$]=n[$]||[]).push([u,b]),(n[u]=n[u]||[]).push([$,1-b]),a($,u,d.sa,d.sb,"",et),a(u,$,d.sb,d.sa,"",et)}let r={};for(let d in n)r[d]=[s(d).r,s(d).rd];for(let d in n){let[$,u]=dt(r[d][0],r[d][1],n[d].map(([b,f])=>[r[b][0],r[b][1],f]));s(d).r=$,s(d).rd=u}let v=new Map;for(let d of Q().filter($=>$.date).slice().reverse()){let $=d.date,u=Et($);v.has(u)||v.set(u,[]),v.get(u).push({a:j(d.a),b:j(d.b),sa:+d.sa,sb:+d.sb,date:$})}for(let d of[...v.keys()].sort(($,u)=>$-u)){for(let b in e){let f=e[b],L=d-(f.lastIdx==null?et:f.lastIdx);L>0&&(f.rd=Math.min(Math.sqrt(f.rd*f.rd+T.growth*T.growth*L),T.maxRd))}let $={};for(let b of v.get(d)){let f=b.sa>b.sb?1:b.sa<b.sb?0:.5;($[b.a]=$[b.a]||[]).push([b.b,f]),($[b.b]=$[b.b]||[]).push([b.a,1-f]),a(b.a,b.b,b.sa,b.sb,b.date,d),a(b.b,b.a,b.sb,b.sa,b.date,d)}let u={};for(let b in $)u[b]=[s(b).r,s(b).rd];for(let b in $){let[f,L]=dt(u[b][0],u[b][1],$[b].map(([M,A])=>[u[M][0],u[M][1],A]));s(b).r=f,s(b).rd=L}}let m=Object.values(e).map(d=>({name:d.name,glicko:d.r,rd:d.rd,rating:d.r-T.conservative*d.rd,matches:d.games,w:d.w,l:d.l,d:d.d,winPct:d.games?bs(d.w/d.games*100,1):0,opponents:d.opps.size,avgOpp:0,lastMatch:d.lastDate||"",provisional:!(d.games>=T.minMatches&&d.opps.size>=T.minOpp),inactive:!1})),g={};m.forEach(d=>{g[d.name]=d.glicko}),m.forEach(d=>{let $=0;e[d.name].opps.forEach(u=>{$+=g[u]!=null?g[u]:T.unratedR}),d.avgOpp=e[d.name].opps.size?$/e[d.name].opps.size:0});let i=Date.now(),l=Math.floor(i/(T.periodDays*Nt));for(let d in e){let $=e[d],u=l-($.lastIdx==null?et:$.lastIdx);u>0&&($.rd=Math.min(Math.sqrt($.rd*$.rd+T.growth*T.growth*u),T.maxRd))}m.forEach(d=>{d.glicko=e[d.name].r,d.rd=e[d.name].rd,d.rating=d.glicko-T.conservative*d.rd;let $=pt[d.name],u=(D.curRatings||{})[d.name];d.delta=$!=null?(u??d.rating)-$:0});let o=Date.parse(T.graceStart+"T00:00:00Z")+T.graceDays*Nt,c=new Set([...ie,...K().inactive||[]]);m.forEach(d=>{d.inactive=c.has(d.name)||(d.lastMatch?i-Date.parse(d.lastMatch+"T00:00:00Z")>T.inactiveDays*Nt:i>o)});let p={},w={};(D.players||[]).forEach((d,$)=>{let u=j(d.name);p[u]=d,w[u]=$});let h={};m.forEach(d=>{h[d.name]=d}),m.forEach(d=>{let $=p[d.name];$&&(d.rating=$.rating,d.glicko=$.glicko,d.rd=$.rd,d.matches=$.matches,d.w=$.w,d.l=$.l,d.d=$.d,d.winPct=$.winPct,d.opponents=$.opponents,d.avgOpp=$.avgOpp,$.lastMatch&&(d.lastMatch=$.lastMatch))});let k=[];(D.qualified||[]).forEach(d=>{let $=h[j(d.name)];$&&($.provisional=!1,$.rank=d.rank!=null?d.rank:k.length+1,k.push($))});let S=new Set(k.map(d=>d.name)),C=m.filter(d=>!S.has(d.name)&&!p[d.name]&&!p[j(d.name)]&&!d.provisional&&!d.inactive).sort((d,$)=>$.rating-d.rating);C.forEach((d,$)=>{d.rank=k.length+$+1});let N=k.concat(C);m.sort((d,$)=>$.rating-d.rating||(w[d.name]!=null?w[d.name]:1e9)-(w[$.name]!=null?w[$.name]:1e9));let I={};return m.forEach(d=>{I[d.name]=d}),{players:m,byName:I,qualified:N}}function Lt(){es(),Z=$s(),V=Z.byName,U=Z.qualified,kt=null}var ks=["page-home","page-player","page-compare","page-matches","page-cards","page-roster","page-analytics","page-method","page-faq","page-admin"];function _t(){let e=y("#nav-glide"),s=document.querySelector(".nav a.active");if(e&&s&&s.offsetWidth>0){let a=s.getBoundingClientRect(),n=e.parentElement.getBoundingClientRect();e.style.width=a.width+"px",e.style.transform=`translate(${a.left-n.left}px, ${a.bottom-n.top-1}px)`,e.style.opacity="1"}else e&&(e.style.opacity="0")}window.addEventListener("resize",()=>{_t(),Pt(),clearTimeout(window.__glideRz),window.__glideRz=setTimeout(()=>{_t(),Pt()},150)});document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>{_t(),Pt()});function ht(){if(Ee){Ee=!1;return}let e;location.hash&&location.hash.startsWith("#/")&&location.hash!=="#/"?(e=location.hash,history.replaceState(null,"",St(e))):e=Ze(),ks.forEach(a=>y("#"+a).classList.remove("active"));let s="#/"+(e.split("/")[1]||"");if(s==="#/card"&&(s="#/cards"),s==="#/player"&&(s="#/"),B(".nav a, .foot-nav a").forEach(a=>{let n=a.getAttribute("href");a.classList.toggle("active",n===s||e==="#/"&&n==="#/")}),_t(),e==="#/compare"||e.startsWith("#/compare/")){let a=e.split("/").slice(2).map(ne);Ge(a[0]||"",a[1]||""),y("#page-compare").classList.add("active"),window.lbScrollNow(0)}else if(e.startsWith("#/player/"))As(ne(e.slice(9))),y("#page-player").classList.add("active"),window.lbScrollNow(0);else if(e==="#/matches")Fs(),y("#page-matches").classList.add("active"),window.lbScrollNow(0);else if(e==="#/cards")typeof renderCards=="function"&&renderCards(),typeof window.lbLiveStatsTick=="function"&&window.lbLiveStatsTick(),y("#page-cards").classList.add("active"),window.lbScrollNow(0);else if(e.startsWith("#/card/")){typeof renderCards=="function"&&renderCards(),y("#page-cards").classList.add("active"),window.lbScrollNow(0);let a=ne(e.slice(7));requestAnimationFrame(()=>{typeof window.cardsFocus=="function"&&window.cardsFocus(a)})}else e==="#/roster"?(Ns(),y("#page-roster").classList.add("active"),window.lbScrollNow(0)):e==="#/analytics"?(we(),y("#page-analytics").classList.add("active"),window.lbScrollNow(0)):e==="#/method"?(Is(),y("#page-method").classList.add("active"),window.lbScrollNow(0)):e==="#/faq"?(_s(),y("#page-faq").classList.add("active"),window.lbScrollNow(0)):e==="#/admin"?(lt(),y("#page-admin").classList.add("active"),window.lbScrollNow(0)):(fe(),y("#page-home").classList.add("active"),requestAnimationFrame(Es));Yt()}window.addEventListener("hashchange",ht);window.addEventListener("popstate",ht);document.addEventListener("click",e=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;let s=e.target instanceof Element?e.target.closest('a[href^="#/"]'):null;if(!s)return;e.preventDefault();let a=s.getAttribute("href");St(a)!==(location.pathname.replace(/\/+$/,"")||"/")&&ue(a)});function fe(){at="all",P={key:"rank",dir:1},B(".chip[data-filter]").forEach(i=>i.classList.toggle("on",i.dataset.filter==="all")),me();let e=Q().length,s=Z.players.length,a=U[0],n=Math.round(U.reduce((i,l)=>i+l.rd,0)/U.length),r=y("#hero-chip-matches");r&&(r.innerHTML=t("home.chipMatches",{n:e})),y("#stat-strip").innerHTML=`
    <div class="stat-card"><div class="k">${t("stat.ranked")}</div>
      <div class="v"><span class="cu" data-target="${U.length}">0</span><small>${t("stat.ofTotal",{n:s})}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.matches")}</div>
      <div class="v"><span class="cu" data-target="${e}">0</span></div></div>
    <div class="stat-card"><div class="k">${t("stat.highest")}</div>
      <div class="v"><span class="cu" data-target="${a.rating}" data-dec="1">0</span><small>${x(a.name)}</small></div></div>
    <div class="stat-card"><div class="k">${t("stat.avgRd")}</div>
      <div class="v"><span class="cu" data-target="${n}" data-dec="1">0</span><small>${t("stat.certainty")}</small></div></div>`;let v=[U[1],U[0],U[2]].filter(Boolean);y("#fl-cards").innerHTML=v.map(i=>`
    <div class="fl-card r${i.rank}${i.rank===1?" champ":""} reveal" data-goto="${x(i.name)}">
      <div class="fl-top">
        ${Ut(i.rank)}
        <div class="rd">RD ${i.rd.toFixed(0)}</div>
      </div>
      ${i.rank===1?`<div class="champ-tag">${t("home.champTag")}</div>`:""}
      <div class="nm">${x(i.name)}</div>
      <div class="rating">
        <span class="unit">${t("home.ratingUnit")}</span>
        <div class="big-row"><span class="big">${Math.round(i.rating)}</span>${Wt(i)}</div>
      </div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${i.winPct>=60?"":i.winPct>=40?"mid":"low"}" data-w="${i.winPct}"></div></div>
      </div>
      <div class="meta">
        <span><span class="w">${i.w}${F("W")}</span> <span class="l">${i.l}${F("L")}</span> ${i.d}${F("D")}</span>
        <span class="wc">${i.winPct.toFixed(1)}%</span>
        <span class="opp">${t("home.avgOpp",{n:i.avgOpp.toFixed(1)})}</span>
      </div>
    </div>`).join(""),requestAnimationFrame(()=>{B("#fl-cards .bar-fill").forEach(i=>{i.style.width=i.dataset.w+"%"})});let m=y("#home-guide");m&&(m.innerHTML=typeof window.cardsGuideHTML=="function"?window.cardsGuideHTML("home"):""),ut(),Ue();let g=y("#last-updated");g&&(g.textContent=t("home.lastUpdated",{when:tt(D.generated)||"today"}))}function Ue(){let e=Q().filter(s=>s.date).slice(0,10);y("#battles-grid").innerHTML=e.length?e.map(s=>{let a=s.sa>s.sb,n=s.sb>s.sa;return`
    <div class="battle-row reveal" data-goto="${x(a?s.a:s.b)}" tabindex="0" role="link">
      <div class="who ${a?"win":"lose"}" data-goto="${x(s.a)}">${x(s.a)}</div>
      <div class="vs">${t("vs")}</div>
      <div class="who r ${n?"win":"lose"}" data-goto="${x(s.b)}">${x(s.b)}</div>
      <div class="sc mono"><span class="${a?"win":"lose"}">${s.sa}</span> \u2013 <span class="${n?"win":"lose"}">${s.sb}</span></div>
      <div class="dt">${tt(s.date)||(s.admin&&!s.published?t("battles.justNow"):t("misc.historical"))}</div>
    </div>`}).join(""):`<div class="empty" style="padding:26px;text-align:center;color:var(--dim);grid-column:1/-1">${t("battles.empty")}</div>`}var xs=500,Ls="cubic-bezier(.22,.8,.24,1)",Ss=12;function Ms(e,s){matchMedia("(prefers-reduced-motion: reduce)").matches||B(".lb-row",e).forEach((a,n)=>{let r=s.get(a.dataset.name);if(r===void 0||typeof a.animate!="function")return;let v=r-a.getBoundingClientRect().top;Math.abs(v)<=1||a.animate([{transform:`translateY(${v}px)`},{transform:"none"}],{duration:xs,easing:Ls,delay:Math.min(n*Ss,220),fill:"backwards"})})}function ut(e="all",s="rank",a=1){let n=y("#lb-body"),v=(e==="all"&&jt?U:Z.players).slice().map(i=>({...i,rank:i.rank!=null?i.rank:9999}));de&&(v=v.filter(i=>i.name.toLowerCase().includes(de))),e==="provisional"?v=v.filter(i=>(V[i.name]||{}).provisional):e==="inactive"?v=v.filter(i=>(V[i.name]||{}).inactive):e==="veterans"?v=v.filter(i=>i.matches>=15):e==="rising"&&(v=v.filter(i=>i.winPct>=60&&i.matches>=5)),v.sort((i,l)=>{let o=i[s],c=l[s];return(typeof o=="string"?o.localeCompare(c):o-c)*a});let m=new Map;B(".lb-row",n).forEach(i=>m.set(i.dataset.name,i.getBoundingClientRect().top));let g=cs();n.innerHTML=v.map(i=>`
    <div class="lb-row ${i.rank<=3?"top"+i.rank:""}" data-name="${x(i.name)}" data-goto="${x(i.name)}" tabindex="0" role="link">
      <div class="rank">${i.rank<=U.length?Ut(i.rank,"sm")+ls(i,g):'<div class="rank-badge sm">\u2013</div>'}</div>
      <div class="name-cell"><div class="name-stack"><div class="pname">${x(i.name)}</div></div>${typeof cardsRowChip=="function"?cardsRowChip(i.name):""}</div>
      <div class="rating-cell mono">${Wt(i)}${Bt(i,!0)}</div>
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
      <div class="col-status">${os(i.name)||rs(i.name)}</div>
      <div class="row-arrow">\u2192</div>
    </div>`).join("")||`<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${e==="inactive"?t("lb.emptyInactive"):e==="provisional"?t("lb.emptyProv"):t("lb.emptyNone")}</div>`,Ms(n,m),requestAnimationFrame(()=>{B(".bar-fill",n).forEach(i=>{i.style.width=i.dataset.w+"%"})})}var at="all",P={key:"rank",dir:1},de="",jt=!0;function me(){B(".sortable").forEach(s=>s.classList.remove("sorted","asc"));let e=y(`.sortable[data-key="${P.key}"]`);e&&(e.classList.add("sorted"),P.dir===1&&e.classList.add("asc"))}function Es(){B("#stat-strip .cu").forEach(e=>Ht(e,parseFloat(e.dataset.target),{dec:parseInt(e.dataset.dec||0)})),B(".bar-fill").forEach(e=>{e.style.width=e.dataset.w+"%"})}y("#lb-qual").addEventListener("click",()=>{jt=!jt,y("#lb-qual").classList.toggle("on",jt),ut(at,P.key,P.dir)});y("#lb-filter").addEventListener("input",e=>{de=e.target.value.trim().toLowerCase(),ut(at,P.key,P.dir)});var $t=y("#theme-toggle");function ge(){if(!$t)return;let e=document.documentElement.dataset.theme==="light",s=e?t("top.toDark"):t("top.toLight");$t.setAttribute("aria-pressed",String(e)),$t.setAttribute("aria-label",s),$t.title=s}$t.addEventListener("click",()=>{let s=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=s;try{localStorage.setItem("tt1v1_theme",s)}catch{}ge()});ge();document.addEventListener("click",e=>{let s=e.target.closest(".chip");if(s&&s.dataset.filter){B(".chip[data-filter]").forEach(r=>r.classList.remove("on")),s.classList.add("on"),at=s.dataset.filter,ut(at,P.key,P.dir);return}let a=e.target.closest(".sortable");if(a){let r=a.dataset.key;P.key===r&&P.dir===-1?P={key:"rank",dir:1}:P.key===r?P={key:r,dir:-P.dir}:P={key:r,dir:1},me(),ut(at,P.key,P.dir);return}let n=e.target.closest("[data-goto]");n&&(e.stopPropagation(),ue("#/player/"+J(n.dataset.goto)))});document.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;let s=document.activeElement;!s||!s.dataset||!s.dataset.goto||s.tagName==="A"||s.tagName==="BUTTON"||s.tagName==="INPUT"||(e.preventDefault(),ue("#/player/"+J(s.dataset.goto)))});function Ts(e){let s=e.slice();for(let a=s.length-1;a>0;a--){let n=Math.floor(Math.random()*(a+1));[s[a],s[n]]=[s[n],s[a]]}return s}function Me(e,s){let a=document.getElementById(e);if(!a)return;let n=a.querySelector(".pick-btn"),r=a.querySelector(".pick-search"),v=[...a.querySelectorAll(".pick-opt")],m=a.querySelector(".pick-empty"),g=-1,i=()=>v.filter(w=>!w.classList.contains("hide")),l=w=>{let h=i();if(!h.length){g=-1;return}g=(w%h.length+h.length)%h.length,v.forEach(k=>k.classList.remove("hover")),h[g].classList.add("hover"),h[g].scrollIntoView({block:"nearest"})},o=w=>{let h=w.trim().toLowerCase(),k=0;v.forEach(S=>{let C=!h||S.dataset.name.toLowerCase().includes(h);S.classList.toggle("hide",!C),C&&k++}),m.classList.toggle("show",k===0),g=-1,k&&l(0)},c=()=>{document.querySelectorAll(".pick.open").forEach(w=>{if(w!==a){w.classList.remove("open");let h=w.querySelector(".pick-btn");h&&h.setAttribute("aria-expanded","false")}}),a.classList.add("open"),n.setAttribute("aria-expanded","true"),r.value="",o(""),requestAnimationFrame(()=>r.focus())},p=()=>{a.classList.remove("open"),n.setAttribute("aria-expanded","false")};n.addEventListener("click",()=>{a.classList.contains("open")?p():c()}),r.addEventListener("input",()=>o(r.value)),r.addEventListener("keydown",w=>{if(w.key==="ArrowDown")w.preventDefault(),l(g+1);else if(w.key==="ArrowUp")w.preventDefault(),l(g-1);else if(w.key==="Enter"){w.preventDefault();let h=i();h[g]&&h[g].click()}else w.key==="Escape"&&(p(),n.focus())}),v.forEach(w=>{w.addEventListener("click",()=>{a.dataset.value=w.dataset.name,a.querySelector(".pick-cur").textContent=w.dataset.name,p(),s()}),w.addEventListener("mousemove",()=>{let h=i().indexOf(w);h>=0&&h!==g&&(g=h,v.forEach(k=>k.classList.remove("hover")),w.classList.add("hover"))})})}document.addEventListener("click",e=>{document.querySelectorAll(".pick.open").forEach(s=>{if(!s.contains(e.target)){s.classList.remove("open");let a=s.querySelector(".pick-btn");a&&a.setAttribute("aria-expanded","false")}})});function Ge(e,s){let a=y("#cmp-wrap"),r=Z.players.slice().sort((f,L)=>(f.rank!=null?f.rank:9999)-(L.rank!=null?L.rank:9999)||f.name.localeCompare(L.name)).map(f=>f.name);if(r.length<2){a.innerHTML=`<div class="empty">${t("cmp.notEnough")}</div>`;return}let v=f=>f[Math.floor(Math.random()*f.length)],m=f=>v(r.filter(L=>L!==f)),g=V[e]?e:v(r),i=V[s]?s:m(g);i===g&&(i=m(g)),(g!==e||i!==s)&&history.replaceState(null,"","#/compare/"+J(g)+"/"+J(i));let l=V[g],o=V[i],c=U.find(f=>f.name===g),p=U.find(f=>f.name===i),w=ce(l.glicko,o.glicko,o.rd),h=ce(o.glicko,l.glicko,l.rd),k=Math.round(w/(w+h)*1e3)/10,S=Math.round(1e3-k*10)/10,C=Q().filter(f=>f.a===g&&f.b===i||f.a===i&&f.b===g).map(f=>{let L=f.a===g,M=L?f.sa:f.sb,A=L?f.sb:f.sa;return{fa:M,fb:A,res:M>A?"W":M<A?"L":"D",date:f.date}}),N=C.reduce((f,L)=>(L.res==="W"?f.w++:L.res==="L"?f.l++:f.d++,f),{w:0,l:0,d:0}),I=Ts(r),d=(f,L,M)=>`
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
    </div>`,u='<span style="color:var(--dimmer)">\u2014</span>';a.innerHTML=`
    <div class="kicker anim">${t("cmp.versus")}</div>
    <h2 class="section-head anim" style="margin:6px 0 2px">${t("cmp.title")}</h2>
    <div class="cmp-pickers anim">
      ${d("cmp-a",g,t("cmp.firstPlayer"))}
      <button class="btn btn-ghost" id="cmp-swap" style="width:auto;margin:0" title="${t("cmp.swap")}">\u21C4</button>
      ${d("cmp-b",i,t("cmp.secondPlayer"))}
    </div>
    <div class="cmp-share anim">
      <button class="btn btn-ghost" id="cmp-copy" style="width:auto;margin:0">${t("cmp.copyLink")}</button>
      <span class="caption" id="cmp-copy-msg"></span>
    </div>

    <div class="cmp-hero anim">
      <div class="cmp-side a">
        <div class="cmp-sub">${c?t("cmp.rankN",{n:c.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${J(g)}">${x(g)}</a></div>
        <div class="cmp-rating mono">${l.provisional?Mt(l):l.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",l.matches,{rd:l.rd.toFixed(1)})}</div>
      </div>
      <div class="cmp-vs">
        <div class="vs-mark">${t("cmp.vsMark")}</div>
        <div class="mono" style="font-size:11px;color:var(--dimmer)">${t("cmp.h2hShort",{n:C.length})}</div>
      </div>
      <div class="cmp-side b">
        <div class="cmp-sub">${p?t("cmp.rankN",{n:p.rank}):t("cmp.unranked")}</div>
        <div class="cmp-name"><a href="#/player/${J(i)}">${x(i)}</a></div>
        <div class="cmp-rating mono">${o.provisional?Mt(o):o.rating.toFixed(1)}</div>
        <div class="cmp-sub">${tp("cmp.meta",o.matches,{rd:o.rd.toFixed(1)})}</div>
      </div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.probTitle")} <span class="n">${t("cmp.probSub")}</span></h3>
      <div class="cmp-prob-labels">
        <span style="color:var(--gold)">${x(g)} ${k.toFixed(1)}%</span>
        <span style="color:var(--blue)">${S.toFixed(1)}% ${x(i)}</span>
      </div>
      <div class="cmp-probbar"><i class="pa" style="width:${k}%"></i><i class="pb" style="width:${S}%"></i></div>
      <div class="cmp-prob-note">${t("cmp.probNote")}</div>
    </div>

    <div class="panel anim">
      <h3>${t("cmp.tale")}</h3>
      <div class="cmp-table">
        ${$(t("cmp.rating"),Bt(l),Bt(o),!l.provisional&&l.rating>o.rating,!o.provisional&&o.rating>l.rating)}
        ${$(t("cmp.rank"),c?"#"+c.rank:u,p?"#"+p.rank:u,c&&p&&c.rank<p.rank,c&&p&&p.rank<c.rank)}
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
            <div class="who">${x(g)}</div>
            <div class="score mono">${f.fa} \u2013 ${f.fb}</div>
            <div class="who opp"><a href="#/player/${J(i)}" style="color:var(--blue)">${x(i)}</a></div>
            <div class="date mono" title="${Fe(f.date)}">${tt(f.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("cmp.neverMet")}</div>`}
      </div>
      <div class="caption" style="margin-top:12px">${t("cmp.legacyNote")}</div>
    </div>`;let b=()=>{let f=y("#cmp-a").dataset.value,L=y("#cmp-b").dataset.value,M="#/compare/"+J(f)+"/"+J(L);St(M)!==(location.pathname.replace(/\/+$/,"")||"/")&&history.replaceState(null,"",St(M)),Ge(f,L)};Me("cmp-a",b),Me("cmp-b",b),y("#cmp-swap").addEventListener("click",()=>{let f=y("#cmp-a"),L=y("#cmp-b"),M=f.dataset.value;f.dataset.value=L.dataset.value,L.dataset.value=M,b()}),y("#cmp-copy").addEventListener("click",()=>{let f=location.href.split("#")[0]+"#/compare/"+J(g)+"/"+J(i),L=()=>{y("#cmp-copy-msg").textContent=t("cmp.linkCopied")};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(f).then(L,()=>{y("#cmp-copy-msg").textContent=f}):y("#cmp-copy-msg").textContent=f})}var Ee=!1;function Cs(e){let s=window.lbCards||{},a=s.ratingSeries?s.ratingSeries(e):null;if(!a||a.length<3)return"";let n=V[e],r=Math.max(n.rating,...a.map(l=>l.r)),v=Ct(e).slice().reverse(),m=0,g=0;for(let l of v)l.res==="W"?(g++,g>m&&(m=g)):g=0;let i=[20,50,100].filter(l=>a.length>l);return`
    <div class="panel reveal">
      <div class="rc-head">
        <h3>${t("pl.history")} <span class="n">${tp("pl.nGames",a.length)}</span></h3>
        <div class="rc-range">
          ${i.map(l=>`<button class="chip rc-range-btn" data-range="${l}">${tp("chart.nGames",l)}</button>`).join("")}
          <button class="chip rc-range-btn on" data-range="all">${t("chart.allTime")}</button>
        </div>
      </div>
      <div class="rc-stats">
        <div class="rc-stat"><span class="ric ic-up"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg></span><div class="tx"><div class="k">${t("chart.current")}</div><div class="v mono">${n.rating.toFixed(1)}</div></div></div>
        <div class="rc-stat"><span class="ric ic-star"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.45 6.2 20.5l1.1-6.45-4.7-4.6 6.5-.95z"/></svg></span><div class="tx"><div class="k">${t("chart.peak")}</div><div class="v mono">${r.toFixed(1)}</div></div></div>
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
    </div>`}function qs(e){let s=document.querySelector(".pv-lower .rating-chart");if(!s)return;let a=window.lbCards||{},n=a.ratingSeries?a.ratingSeries(e):null;if(!n||n.length<3)return;let r="http://www.w3.org/2000/svg",v=900,m=330,g=56,i=18,l=18,o=58,c="all",p=!1,w=null,h=matchMedia("(prefers-reduced-motion: reduce)").matches,k=(b,f)=>{let L=document.createElementNS(r,b);for(let M in f)L.setAttribute(M,f[M]);return L},S=(b,f,L)=>{let A=(f-b||1)/L,z=Math.pow(10,Math.floor(Math.log10(A))),G=[1,2,2.5,5,10].map(W=>W*z).find(W=>W>=A)||10*z,_=[];for(let W=Math.ceil(b/G)*G;W<=f+1e-9;W+=G)_.push(W);return _},C=()=>((!w||!w.isConnected)&&(w=document.getElementById("rc-tip"),w||(w=document.createElement("div"),w.id="rc-tip",w.className="x-tip",document.body.appendChild(w))),w),N=(b,f,L)=>{let M=C();M.innerHTML=b,M.classList.add("show");let A=s.getBoundingClientRect(),z=M.offsetWidth,G=M.offsetHeight,_=f+16,W=L-G-14;_+z>A.right-8&&(_=f-z-16),W<A.top+8&&(W=L+18),_=Math.max(A.left+8,Math.min(_,A.right-z-8)),W=Math.max(A.top+8,Math.min(W,A.bottom-G-8)),M.style.left=_+"px",M.style.top=W+"px"},I=()=>{w&&w.classList.remove("show")};function d(){let b=c==="all"?n.slice():n.slice(-c),f=n.length-b.length,L=b.map(E=>E.r),M=Math.min(...L),A=Math.max(...L),z=(A-M)*.12||6;M-=z,A+=z;let G=E=>g+E/Math.max(1,b.length-1)*(v-g-i),_=E=>l+(1-(E-M)/(A-M))*(m-l-o);s.innerHTML="";for(let E of S(M,A,5)){s.appendChild(k("line",{x1:g,x2:v-i,y1:_(E).toFixed(1),y2:_(E).toFixed(1),class:"rc-grid"}));let R=k("text",{x:g-8,y:(_(E)+3.5).toFixed(1),class:"rc-lbl"});R.textContent=Math.round(E),s.appendChild(R)}let W=k("clipPath",{id:"rh-reveal"}),Kt=k("rect",{x:0,y:0,width:v,height:m});W.appendChild(Kt),s.appendChild(W);let ft=k("g",{"clip-path":"url(#rh-reveal)"});s.appendChild(ft);let ye=(m-o).toFixed(1);for(let E=1;E<b.length;E++){let R=b[E].r>=b[E-1].r?"up":"down",Y=G(E-1),O=G(E),H=_(b[E-1].r),st=_(b[E].r);ft.appendChild(k("path",{d:`M${Y.toFixed(1)} ${ye} L${Y.toFixed(1)} ${H.toFixed(1)} L${O.toFixed(1)} ${st.toFixed(1)} L${O.toFixed(1)} ${ye} Z`,class:`rc-seg-area ${R}`})),ft.appendChild(k("path",{d:`M${Y.toFixed(1)} ${H.toFixed(1)} L${O.toFixed(1)} ${st.toFixed(1)}`,class:`rc-seg ${R}`}))}if(p){let E=Math.max(3,Math.round(b.length/10)),R=b.map((Y,O)=>{let H=0,st=0;for(let At=Math.max(0,O-E+1);At<=O;At++)H+=b[At].r,st++;return H/st});ft.appendChild(k("path",{d:R.map((Y,O)=>(O?"L":"M")+G(O).toFixed(1)+" "+_(Y).toFixed(1)).join(" "),class:"rc-trend-line"}))}let Ke=b.length>90?Math.ceil(b.length/90):1;b.forEach((E,R)=>{if(R%Ke&&R!==b.length-1)return;let Y=R===0?b[1].r>=b[0].r:E.r>=b[R-1].r;ft.appendChild(k("circle",{cx:G(R).toFixed(1),cy:_(E.r).toFixed(1),r:2.6,class:`rc-dot-static ${Y?"up":"down"}`}))});let $e=Math.min(6,b.length),ke=[];for(let E=0;E<$e;E++)ke.push(Math.round(E/Math.max(1,$e-1)*(b.length-1)));for(let E of ke){let R=E===0?"start":E===b.length-1?"end":"middle",Y=k("text",{x:G(E).toFixed(1),y:m-o+24,class:"rc-lbl rc-x1","text-anchor":R});if(Y.textContent=t("chart.gameN",{n:f+E+1}),s.appendChild(Y),b[E].date){let O=k("text",{x:G(E).toFixed(1),y:m-o+40,class:"rc-lbl rc-x2","text-anchor":R});O.textContent=tt(b[E].date),s.appendChild(O)}}let mt=k("g",{class:"rc-cross",style:"display:none"}),Vt=k("g",{class:"rc-slide"});Vt.appendChild(k("line",{x1:0,x2:0,y1:l,y2:m-o,class:"rc-cross-line"}));let Qt=k("g",{class:"rc-slide"});Qt.appendChild(k("circle",{cx:0,cy:0,r:6.5,class:"rc-cross-dot"})),mt.appendChild(Vt),mt.appendChild(Qt),s.appendChild(mt);let Zt=k("rect",{x:g,y:l,width:v-g-i,height:m-l-o,class:"rc-overlay"});if(s.appendChild(Zt),!h){Kt.setAttribute("width",0);let E=performance.now(),R=Y=>{let O=Math.max(0,Math.min(1,(Y-E)/900));Kt.setAttribute("width",(v*(1-Math.pow(1-O,3))).toFixed(1)),O<1&&requestAnimationFrame(R)};requestAnimationFrame(R)}let Xt=0,qt=null,Ve=E=>{let R=s.getBoundingClientRect(),Y=(E.clientX-R.left)/R.width*v,O=Math.round((Y-g)/(v-g-i)*(b.length-1));O=Math.max(0,Math.min(b.length-1,O));let H=b[O];mt.style.display="",Vt.style.transform=`translate(${G(O).toFixed(1)}px, 0px)`,Qt.style.transform=`translate(${G(O).toFixed(1)}px, ${_(H.r).toFixed(1)}px)`;let st=O>0?b[O-1].r:n[f+O-1]?n[f+O-1].r:null,te=[`<span style="color:${H.w>.5?"var(--green)":H.w<.5?"var(--red)":"var(--dim)"};font-weight:700">${t("pl.vsOpp",{opp:x(H.opp)})} ${H.pf}-${H.pa}</span>`],xe=`${t("chart.ratingLabel")}: ${H.r.toFixed(1)}`;if(st!=null){let ee=H.r-st,se=ee>.05,ae=ee<-.05;xe+=` <span style="color:${se?"var(--green)":ae?"var(--red)":"var(--dim)"}">${se?"\u25B2":ae?"\u25BC":"\u2014"} ${se?"+":ae?"-":""}${Math.abs(ee).toFixed(1)}</span>`}te.push(xe),te.push(`<span style="color:var(--dimmer);font-size:11px">${t("chart.hashN",{n:f+O+1})}${H.date?" \xB7 "+tt(H.date):""}</span>`),N(te.join(`
`),R.left+G(O)/v*R.width,R.top+_(H.r)/m*R.height)},Qe=E=>{qt=E,!Xt&&(Xt=requestAnimationFrame(()=>{if(Xt=0,qt){let R=qt;qt=null,Ve(R)}}))};Zt.addEventListener("mousemove",Qe),Zt.addEventListener("mouseleave",()=>{mt.style.display="none",I()})}d();let $=s.closest(".panel");$.querySelectorAll(".rc-range-btn").forEach(b=>{b.addEventListener("click",()=>{$.querySelectorAll(".rc-range-btn").forEach(f=>f.classList.remove("on")),b.classList.add("on"),c=b.dataset.range==="all"?"all":parseInt(b.dataset.range,10),I(),d()})});let u=$.querySelector(".rc-trend");u&&u.addEventListener("click",()=>{p=!p,u.classList.toggle("on",p),u.setAttribute("aria-pressed",String(p)),I(),d()})}function As(e){let s=V[e],a=y("#page-player");if(!s){a.innerHTML=`<div class="wrap"><div class="panel"><div class="empty">${t("pl.notFound",{name:x(e)})}</div></div></div>`;return}let n=U.find(p=>p.name===e),r=Ct(e),v=r.slice(0,10),m=Re(e),g=Math.max(3,Math.min(100,100-s.rd/120*100)),i=(typeof window.lbTankFor=="function"?window.lbTankFor(e):null)||(window.LB_TANKS||{})[e]||(window.LB_TANKS_SNAPSHOT||{})[e]||null,l=i&&i.lastLogin?je(i.lastLogin):"",o=i&&i.lastLogin?Ne(i.lastLogin):"",c=i&&i.created?new Date((i.created||0)*1e3).getFullYear():0;a.innerHTML=`
  <div class="wrap">
    <a class="back-link" href="#/">${t("pl.back")}</a>
    <div class="pv-layout">
    <div class="pv-main">
    <div class="player-hero anim">
      <div class="pv-hero-top">
        <div class="pv-id">
          ${n?Ut(n.rank,"lg"):'<div class="rank-badge lg"><span class="num">\u2013</span></div>'}
          <div class="pv-id-text">
            <div class="pv-eyebrow">
              <span class="mi">${n?t("pl.rankedOf",{rank:n.rank,total:U.length}):t("pl.unranked")}</span>
              ${s.provisional?`<span class="tag prov">${t("tag.provisional")}</span>`:""}
              ${s.inactive?`<span class="tag inact">${t("tag.inactive")}</span>`:""}
            </div>
            <h1 class="player-name">${x(s.name)}</h1>
            <div class="pv-meta">
              ${c?`<span class="mi pv-since">${t("cards.since",{year:c})}</span>`:""}
              ${l?`<span class="mi pv-seen"><span title="${x(o)}">${t("cards.lastSeen")} ${x(l)}</span></span>`:""}
            </div>
            ${is(s.name,"hero")}
            <button class="pc-share pv-share" data-share="link" data-target="profile" data-name="${x(s.name)}"><svg class="pc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg><span>${t("cards.shareLink")}</span></button>
          </div>
        </div>
        <div class="player-rating-block">
          <div class="lbl">${s.provisional?t("pl.estRange"):t("pl.visible")}</div>
          <div class="pv-rating-row"><div class="big mono${s.provisional?" prov-range":""}" id="pv-rating">${s.provisional?Mt(s):"0"}</div>${Wt(s)}</div>
          <div class="rd-bar">
            <div class="bar-track"><div class="bar-fill" style="width:${g}%"></div></div>
            <div class="caption"><span>${t("pl.certainty")}</span><span class="mono">RD ${s.rd.toFixed(1)}</span></div>
          </div>
        </div>
      </div>
      <div class="pstat-ribbon">
        <div class="rs"><div class="k">${t("pl.record")}</div><div class="v rec"><span class="w">${s.w}${F("W")}</span> <span class="l">${s.l}${F("L")}</span> <span class="d">${s.d}${F("D")}</span></div></div>
        <div class="rs"><div class="k">${t("pl.winRate")}</div><div class="v mono">${s.winPct}%</div></div>
        <div class="rs"><div class="k">${t("pl.matches")}</div><div class="v mono">${s.matches}</div></div>
        <div class="rs"><div class="k">${t("pl.opponents")}</div><div class="v mono">${s.opponents}</div></div>
        <div class="rs"><div class="k">${t("pl.avgOppRating")}</div><div class="v mono">${s.avgOpp.toFixed(1)}</div></div>
        <div class="rs"><div class="k">${t("pl.glicko")}</div><div class="v mono">${s.glicko.toFixed(1)}</div></div>
      </div>
      <div class="pv-form">
        <div class="fl-label">${t("pl.recentForm")} <span class="n">${t("pl.lastN",{n:Math.min(10,r.length)})}</span></div>
        <div class="form-strip">
          ${v.map((p,w)=>`<div class="form-pill ${p.res}" style="animation-delay:${w*55}ms"
             title="${t("pl.vsOpp",{opp:x(p.opp)})} ${p.for_}-${p.against}">${F(p.res)}</div>`).join("")||`<span class="empty">${t("pl.noGames")}</span>`}
        </div>
      </div>
    </div>
    </div>
    <div class="pv-side">${typeof cardsHeroHTML=="function"?cardsHeroHTML(e):""}</div>
    </div>

    <div class="pv-lower">
    ${Cs(e)}
    <div class="panel reveal">
      <h3>${t("pl.matchHistory")} <span class="n">${tp("pl.nGames",r.length)}</span></h3>
      <div class="match-list">
        ${r.map(p=>`
          <div class="match-row">
            <div class="res-chip ${p.res}">${F(p.res)}</div>
            <div class="who">${x(s.name)}</div>
            <div class="score mono"><b>${p.for_}</b><span class="dash">\u2013</span><span class="ag">${p.against}</span></div>
            <div class="who opp"><a href="#/player/${J(p.opp)}" style="color:var(--blue)">${x(p.opp)}</a></div>
            <div class="date mono" title="${Fe(p.date)}">${tt(p.date)||t("misc.historical")}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>

    <div class="panel reveal">
      <h3>${t("pl.h2h")} <span class="n">${tp("pl.nOpponents",m.length)}</span></h3>
      <div class="h2h-grid">
        ${m.map(p=>`
          <div class="h2h-card" data-goto="${x(p.opp)}" tabindex="0" role="link">
            <div class="opp">${x(p.opp)}</div>
            <div class="rec mono"><span class="w">${p.w}${F("W")}</span> \xB7 <span class="l">${p.l}${F("L")}</span> \xB7 <span>${p.d}${F("D")}</span> \xB7 ${t("pl.pts",{pf:p.pf,pa:p.pa})}</div>
          </div>`).join("")||`<div class="empty">${t("pl.noGamesRec")}</div>`}
      </div>
    </div>
    </div>
  </div>`,s.provisional||Ht(y("#pv-rating"),s.rating,{dec:1,dur:900}),typeof cardsMountAll=="function"&&cardsMountAll(a),qs(e),requestAnimationFrame(Pt),Yt()}var pe="",ve="all";function Rs(){return Q().filter(e=>{if(ve==="dated"&&!e.date||ve==="legacy"&&e.date)return!1;if(!pe)return!0;let s=pe;return e.a.toLowerCase().includes(s)||e.b.toLowerCase().includes(s)||`${e.sa}-${e.sb}`.includes(s)||`${e.sb}-${e.sa}`.includes(s)||e.date&&(e.date.includes(s)||tt(e.date).toLowerCase().includes(s))||s==="legacy"&&!e.date})}function Os(e){return e.map(s=>{let a=s.sa>s.sb,n=s.sb>s.sa;return`
    <div class="gm-row">
      <div class="side ${a?"winner":"loser"}">
        <div class="dot ${a?"w":"l"}"></div>
        <div class="nm" data-goto="${x(s.a)}" tabindex="0" role="link">${x(s.a)}</div>
      </div>
      <div class="sc mono" style="color:${a?"var(--green)":"var(--red)"}">${s.sa}</div>
      <div class="dash mono">\u2013</div>
      <div class="sc mono" style="color:${n?"var(--green)":"var(--red)"}">${s.sb}</div>
      <div class="side right ${n?"winner":"loser"}">
        <div class="dot ${n?"w":"l"}"></div>
        <div class="nm" data-goto="${x(s.b)}" tabindex="0" role="link">${x(s.b)}</div>
      </div>
      <div class="dt mono">${s.admin&&!s.published?`<span class="tag fresh">${t("tag.new")}</span>`:tt(s.date)||t("misc.historical")}</div>
    </div>`}).join("")||`<div class="empty">${t("matches.noResults")}</div>`}function be(){let e=y("#gm-body"),s=Rs();y("#gm-count").textContent=tp("gm.count",s.length),e.innerHTML=Os(s)}function Fs(){Ue(),be()}y("#gm-search")&&y("#gm-search").addEventListener("input",e=>{pe=e.target.value.trim().toLowerCase(),be()});document.querySelectorAll("#gm-filters [data-scope]").forEach(e=>{e.addEventListener("click",()=>{ve=e.dataset.scope,document.querySelectorAll("#gm-filters [data-scope]").forEach(s=>s.classList.toggle("on",s===e)),be()})});function Ns(){let e=Z.players.filter(s=>s.provisional).sort((s,a)=>a.rating-s.rating);y("#roster-grid").innerHTML=e.map(s=>{let a=Math.min(100,Math.round(Math.min(1,s.matches/5)*50+Math.min(1,s.opponents/3)*50));return`
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
    </div>`}).join(""),requestAnimationFrame(()=>B("#roster-grid .prog-fill").forEach(s=>{s.style.width=s.dataset.w+"%"}))}var Dt="all",ct=0;function js(){if(Dt==="all")return Q();let e=Date.now(),s=Number(Dt);return Q().filter(a=>a.date&&(e-Date.parse(a.date))/864e5<=s)}function we(){let e=Z.players,s=js(),a=Dt!=="all",n,r;if(!a)n=U.filter(u=>u.matches>=ct).sort((u,b)=>b.winPct-u.winPct).slice(0,10),r=e.filter(u=>u.matches>=ct).sort((u,b)=>b.matches-u.matches).slice(0,10);else{let u={};s.forEach(f=>{[f.a,f.b].forEach(L=>{let M=u[L]=u[L]||{name:L,w:0,l:0,d:0,matches:0};M.matches+=1}),f.sa===f.sb?(u[f.a].d+=1,u[f.b].d+=1):f.sa>f.sb?(u[f.a].w+=1,u[f.b].l+=1):(u[f.a].l+=1,u[f.b].w+=1)});let b=Object.values(u).map(f=>({...f,winPct:f.matches?Math.round(f.w/f.matches*1e3)/10:0})).filter(f=>f.matches>=Math.max(ct,1));n=b.slice().sort((f,L)=>L.winPct-f.winPct).slice(0,10),r=b.slice().sort((f,L)=>L.matches-f.matches).slice(0,10)}let v=[];s.forEach(u=>{let b=V[u.a],f=V[u.b];if(!b||!f)return;let L=b.rating-f.rating;if(u.sa===u.sb)return;let M=u.sa>u.sb?u.a:u.b,A=Math.abs(L);(L<0&&M===u.a||L>0&&M===u.b)&&v.push({winner:M,loser:M===u.a?u.b:u.a,gap:A,score:M===u.a?`${u.sa}-${u.sb}`:`${u.sb}-${u.sa}`})}),v.sort((u,b)=>b.gap-u.gap);let m={};s.forEach(u=>{let b=[u.a,u.b].sort().join(" vs ");m[b]=(m[b]||0)+1});let g=Object.entries(m).sort((u,b)=>b[1]-u[1]).slice(0,10),i=e.filter(u=>u.matches>=ct).map(u=>u.rating),l=i.length?Math.min(...i):Math.min(...e.map(u=>u.rating)),o=i.length?Math.max(...i):Math.max(...e.map(u=>u.rating)),c=8,p=(o-l)/c||1,w=Array.from({length:c},()=>0);i.forEach(u=>{w[Math.min(c-1,Math.max(0,Math.floor((u-l)/p)))]++});let h=Math.max(...w,1),k=w.map((u,b)=>{let f=Math.round((l+b*p)/10)*10,L=Math.round((l+(b+1)*p)/10)*10;return`
    <div class="hcol" title="${tp("an.histTip",u,{lo:f,hi:L})}">
      <div class="hbar" data-h="${Math.round(u/h*100)}"></div>
      <div class="hlbl">${f}\u2013${L}</div>
    </div>`}).join(""),S=e.filter(u=>u.matches>=ct).sort((u,b)=>b.opponents-u.opponents).slice(0,8),C=Math.max(...S.map(u=>u.opponents),1),N=S.map(u=>`
    <div class="mrow reveal" data-goto="${x(u.name)}" tabindex="0" role="link">
      <div class="nm">${x(u.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round(u.opponents/C*100)}"></div></div>
      <div class="val mono">${u.opponents}</div>
    </div>`).join(""),I=(u,b,f)=>u.map((L,M)=>`
    <div class="an-row reveal" data-goto="${x(L.name)}" tabindex="0" role="link">
      <div class="idx mono">${M+1}</div>
      <div class="nm">${x(L.name)}</div>
      <div class="val mono">${b(L)}</div>
      <div class="unit mono">${f(L)}</div>
    </div>`).join(""),d=u=>tp("an.nMatches",u.matches);y("#an-grid").innerHTML=`
    <div class="an-panel">
      <div class="head"><h3>${t("an.topWinRate")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${I(n,u=>u.winPct+"%",d)}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.mostActive")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/></svg>
      </div>
      ${I(r,u=>u.matches,u=>t("an.matchesUnit"))}
    </div>
    <div class="an-panel">
      <div class="head"><h3>${t("an.biggestUpsets")}</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${v.length?v.slice(0,8).map((u,b)=>`
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
      ${g.map(([u,b],f)=>{let[L,M]=u.split(" vs ");return`
        <a class="an-row reveal" href="#/compare/${J(L)}/${J(M)}" title="${t("an.openCmp")}">
          <div class="idx mono">${f+1}</div>
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
      ${N}
    </div>`;let $=()=>{B("#an-grid .hbar").forEach(u=>{u.style.height=u.dataset.h+"%"}),B("#an-grid .abar").forEach(u=>{u.style.width=u.dataset.w+"%"})};requestAnimationFrame($),setTimeout($,140),Yt()}document.querySelectorAll("#an-controls [data-an-range]").forEach(e=>{e.addEventListener("click",()=>{Dt=e.dataset.anRange==="all"?"all":Number(e.dataset.anRange),document.querySelectorAll("#an-controls [data-an-range]").forEach(s=>s.classList.toggle("on",s===e)),we()})});document.querySelectorAll("#an-controls [data-an-min]").forEach(e=>{e.addEventListener("click",()=>{ct=Number(e.dataset.anMin),document.querySelectorAll("#an-controls [data-an-min]").forEach(s=>s.classList.toggle("on",s===e)),we()})});function Is(){y("#settings-body").innerHTML=He().map(e=>`
    <tr><td><b>${x(e.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${x(e.desc)}</div></td>
        <td class="val">${x(String(e.value))}</td></tr>`).join("")}function Ps(){return Array.from({length:11},(e,s)=>({q:t("faq.q"+(s+1)),a:t("faq.a"+(s+1))}))}function It(){let e=K().faq;return Array.isArray(e)&&e.length?e:Ps()}function Bs(){let e=window.cardsTiers;if(!e)return"";let{TIER_KEYS:s,tierOf:a,tierIdx:n,tierMin:r,tierLabel:v,crestSVG:m}=e,g={};s.forEach(o=>{g[o]=0}),(Z.players||[]).forEach(o=>{o&&o.rating!=null&&(g[a(o.rating)]+=1)});let i=s.reduce((o,c)=>o+g[c],0),l=s.slice().reverse().map(o=>{let c=n(o),p=r(o),w=s[c+1]!=null?r(s[c+1]):null,h=c===0?`&lt; ${Math.round(w)}`:w!=null?`${Math.round(p)}\u2013${Math.round(w)-1}`:`${Math.round(p)}+`,k=i?g[o]/i*100:0;return`
      <tr class="tier-${o}">
        <td class="fd-badge"><span class="fd-badge-in">${m(o)}<span class="fd-name">${v(o)}</span></span></td>
        <td class="fd-range mono">${h}</td>
        <td class="fd-count"><b class="mono">${g[o]}</b><i style="width:${k.toFixed(1)}%"></i></td>
      </tr>`}).join("");return`
    <p class="fd-note">${t("faq.distNote")}</p>
    <table class="fd-table">
      <thead><tr><th>${t("faq.distBadge")}</th><th>${t("faq.distRange")}</th><th>${t("faq.distPlayers")}</th></tr></thead>
      <tbody>${l}</tbody>
    </table>`}function _s(){let e='<svg class="faq-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',s=(a,n,r)=>`
    <div class="faq-item reveal" data-faq="${r}">
      <button class="faq-q" aria-expanded="false">
        <span>${a}</span>
        ${e}
      </button>
      <div class="faq-a"><div class="faq-a-in">${n}</div></div>
    </div>`;y("#faq-list").innerHTML=s(x(t("faq.distTitle")),Bs(),"dist")+It().map((a,n)=>s(x(String(a.q||"")),x(String(a.a||"")),n)).join(""),Yt()}document.addEventListener("click",e=>{let s=e.target.closest(".faq-q");if(!s)return;let a=s.closest(".faq-item"),n=a.classList.contains("open");B(".faq-item.open").forEach(r=>{r.classList.remove("open"),r.querySelector(".faq-q").setAttribute("aria-expanded","false")}),n||(a.classList.add("open"),s.setAttribute("aria-expanded","true"))});function lt(){let e=y("#admin-wrap");if(!ds()){e.innerHTML=`
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
    </div>`;let i=async()=>{let l=y("#admin-pw").value;try{let o=await fetch(us,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:l})});if(o.ok){let c=await o.json().catch(()=>({}));ps(c.token||l,y("#admin-remember").checked),lt(),q("Welcome back, commander.");return}if(o.status===429){q("Too many attempts \u2014 wait a few minutes.");return}}catch{}y("#admin-pw").style.borderColor="var(--red)",q("Wrong password.")};y("#admin-auth").addEventListener("click",i),y("#admin-pw").addEventListener("keydown",l=>{l.key==="Enter"&&i()});return}let a=K(),n='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>',r=a.inactive.map(i=>`
    <div class="log-item">
      <div class="txt"><b>${x(i)}</b> <span style="color:var(--dimmer)">\u2014 inactive</span></div>
      <button class="icon-btn" data-inact-del="${x(i)}" title="Mark active again">${n}</button>
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

  <datalist id="player-list">${Z.players.map(i=>`<option value="${x(i.name)}">`).join("")}</datalist>`,y("#admin-lock").addEventListener("click",()=>{vs(),lt()}),y("#admin-publish").addEventListener("click",()=>v()),y("#admin-sync").addEventListener("click",async()=>{let i=y("#admin-sync"),l=y("#admin-sync-status");i.disabled=!0,l.textContent="syncing\u2026";try{let o=await fetch(hs,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:yt()})}),c=await o.json().catch(()=>({}));o.ok&&c.ok?(l.textContent=c.changed?`synced \u2713 ${c.matches} matches / ${c.players} players`:"already up to date \u2713",q(c.changed?"Sheet synced \u2014 the live site was updated.":"Site already matches the sheet.")):o.status===429?(l.textContent="rate limited",q("Too many attempts \u2014 wait a few minutes.")):(l.textContent="sync failed",q("Sync failed: "+(c.error||o.status)))}catch{l.textContent="network error",q("Sync failed (network).")}i.disabled=!1});async function v(i){let l=!!(i&&i.silent),o=yt()||(l?"":(window.prompt("Admin password:")||"").trim());if(!o){q(l?'Saved here \u2014 auto-publish needs a stored password. Use "Publish to everyone".':"Publish cancelled.");return}re=!0;let c=K(),p={},w=[];for(let[S,C]of Object.entries(c.matchEdits||{}))S.startsWith("a:")&&(p[S]=C);for(let S of c.matchRemoved||[])S.startsWith("a:")&&w.push(S);let h=Q().filter(S=>S.admin).map(S=>({a:S.a,b:S.b,sa:S.sa,sb:S.sb,date:S.date||""})),k={matches:h,aliases:c.aliases||{},aliasNotes:c.aliasNotes||{},aliasRemoved:c.aliasRemoved||[],inactive:c.inactive||[],seeds:c.seeds||{},seedGlicko:c.seedGlicko||{},seedRd:c.seedRd||{},seedRemoved:c.seedRemoved||[],settings:c.settings||{},matchEdits:p,matchRemoved:w,faq:c.faq!=null?c.faq:[]};try{let S=await fetch(Tt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:o,doc:k,message:`Publish match log (${h.length} matches)`})}),C=await S.json().catch(()=>({}));if(!S.ok||!C.ok){S.status===403&&sessionStorage.removeItem(it),q("Publish failed: "+(C.error||"HTTP "+S.status));return}window.LB_PUB=k,window.LB_LOG=h,fs([]),ot({}),Lt(),l||lt(),q(l?"Saved \u2014 live for everyone \u2713":"Published! Everyone sees it on their next visit.")}catch{q("Publish failed: network error.")}finally{re=!1}}y("#admin-export").addEventListener("click",()=>{let i=new Blob([JSON.stringify(Be(),null,2)],{type:"application/json"}),l=document.createElement("a");l.href=URL.createObjectURL(i),l.download="match-log.json",l.click(),URL.revokeObjectURL(l.href),q("Log exported.")}),y("#ov-inact-toggle").addEventListener("click",()=>{let i=y("#ov-inact-n").value.trim();if(!i){q("Type a player name first.");return}let l=rt(),o=K().inactive||[],c=o.includes(i)?o.filter(p=>p!==i):[...o,i];ot({...l,inactive:c}),Lt(),lt(),q(c.includes(i)?`${i} marked inactive.`:`${i} marked active again.`)}),y("#ov-inact-list").addEventListener("click",i=>{let l=i.target.closest("[data-inact-del]");if(!l)return;let o=rt();ot({...o,inactive:(K().inactive||[]).filter(c=>c!==l.dataset.inactDel)}),Lt(),lt()});let m=()=>{let i=It();y("#faq-admin-list").innerHTML=i.map((l,o)=>`
      <div class="log-item fix-row" data-faq-idx="${o}">
        <div class="txt" style="flex:1">
          <input class="set-val" data-fq="q" value="${x(String(l.q||""))}" style="width:100%;margin-bottom:4px">
          <input class="set-val" data-fq="a" value="${x(String(l.a||""))}" style="width:100%">
        </div>
        <button class="icon-btn" data-faq-save="${o}" title="Save"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-faq-del="${o}" title="Delete question">${n}</button>
      </div>`).join("")||'<div class="empty">No questions yet \u2014 add one below.</div>'};m(),y("#faq-admin-list").addEventListener("click",i=>{let l=i.target.closest("[data-faq-save]"),o=i.target.closest("[data-faq-del]"),c=It().map(w=>({...w}));if(l){let w=l.closest("[data-faq-idx]");c[parseInt(l.dataset.faqSave,10)]={q:w.querySelector('[data-fq="q"]').value.trim(),a:w.querySelector('[data-fq="a"]').value.trim()}}else if(o)c.splice(parseInt(o.dataset.faqDel,10),1);else return;let p=rt();ot({...p,faq:c}),m(),q("Q&A updated \u2014 publish to make it public.")}),y("#faq-add").addEventListener("click",()=>{let i=y("#faq-new-q").value.trim(),l=y("#faq-new-a").value.trim();if(!i||!l){q("Fill in both the question and the answer.");return}let o=rt();ot({...o,faq:[...It().map(c=>({...c})),{q:i,a:l}]}),m(),q("Question added.")}),y("#faq-reset").addEventListener("click",()=>{let i=rt();ot({...i,faq:null}),m(),q("Q&A back to the built-in list.")}),window._fbTimer&&(clearInterval(window._fbTimer),window._fbTimer=null);async function g(){let i=y("#fb-inbox");if(!i||document.querySelector("#fb-inbox [data-fb-reply]:focus"))return;let l=yt();if(!l){i.innerHTML='<div class="empty">Unlock the admin panel to see messages.</div>';return}try{let o=await fetch(nt+"/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:l})}),c=await o.json().catch(()=>({}));if(!o.ok||!c.ok){i.innerHTML=`<div class="empty">Could not load messages (${x(c.error||"HTTP "+o.status)}).</div>`;return}let p=c.items||[],w={};i.querySelectorAll("[data-fb-id]").forEach(h=>{let k=h.querySelector("[data-fb-reply]");k&&k.value&&(w[h.dataset.fbId]=k.value)}),i.innerHTML=p.map(h=>`
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
          <button class="icon-btn" data-fb-del title="Delete message">${n}</button>
        </div>`).join("")||'<div class="empty">No messages yet.</div>',i.querySelectorAll("[data-fb-id]").forEach(h=>{let k=h.querySelector("[data-fb-reply]");k&&w[h.dataset.fbId]!=null&&(k.value=w[h.dataset.fbId])})}catch{i.innerHTML='<div class="empty">Network error loading messages.</div>'}}g(),y("#fb-refresh").addEventListener("click",()=>{g(),q("Inbox refreshed.")}),window._fbTimer=setInterval(()=>{if(!y("#fb-inbox")){clearInterval(window._fbTimer),window._fbTimer=null;return}document.hidden||g()},2e3),y("#fb-inbox").addEventListener("click",async i=>{let l=i.target.closest("[data-fb-send]"),o=i.target.closest("[data-fb-del]"),c=i.target.closest("[data-fb-resolve]");if(!l&&!o&&!c)return;let p=i.target.closest("[data-fb-id]"),w=p.dataset.fbId,h=yt();try{if(c){let k=p.dataset.fbResolved!=="1";if(!(await fetch(nt+"/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:h,id:w,resolved:k})}).then(C=>C.json())).ok){q("Could not update \u2014 try again.");return}q(k?"Marked as resolved \u2713":"Message reopened."),g()}else if(l){let k=p.querySelector("[data-fb-reply]").value;if(!(await fetch(nt+"/reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:h,id:w,reply:k})}).then(C=>C.json())).ok){q("Reply failed.");return}q("Reply saved \u2014 the sender can see it with their ticket code.")}else{if(!(await fetch(nt+"/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:h,id:w})}).then(S=>S.json())).ok){q("Delete failed.");return}p.remove(),q("Message deleted.")}}catch{q("Network error.")}})}var Rt=document.getElementById("fl-cards");Rt&&window.matchMedia("(hover: hover)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(Rt.addEventListener("pointermove",e=>{let s=e.target.closest&&e.target.closest(".fl-card");if(!s)return;let a=s.getBoundingClientRect(),n=(e.clientX-a.left)/a.width-.5,r=(e.clientY-a.top)/a.height-.5;s.classList.add("tilt"),s.style.transform=`perspective(1000px) rotateY(${(n*7).toFixed(2)}deg) rotateX(${(-r*6).toFixed(2)}deg) translateY(-6px)`}),Rt.addEventListener("pointerleave",()=>{Rt.querySelectorAll(".fl-card").forEach(e=>{e.style.transform="",e.classList.remove("tilt")})}));y("#search").addEventListener("input",e=>{let s=e.target.value.trim().toLowerCase(),a=y("#search-drop");if(!s){a.classList.remove("show");return}let n=Z.players.filter(r=>r.name.toLowerCase().includes(s)).slice(0,8);if(!n.length){a.classList.remove("show");return}a.innerHTML=n.map(r=>`
    <a class="drop-row" href="#/player/${J(r.name)}">
      ${r.rank?Ut(r.rank,"sm"):'<div class="rank-badge sm">\u2013</div>'}
      <span>${x(r.name)}</span>        <span class="mono" style="margin-left:auto;color:var(--dim)">${Bt(r,!0)}</span>
    </a>`).join(""),a.classList.add("show")});document.addEventListener("click",e=>{e.target.closest(".search-box")||y("#search-drop").classList.remove("show"),e.target.closest(".drop-row")&&(y("#search-drop").classList.remove("show"),y("#search").value="")});var nt=Tt.replace(/\/publish$/,"/feedback"),zt="tt1v1_fb_tickets";function Ds(){try{return JSON.parse(localStorage.getItem(zt)||"[]")}catch{return[]}}function Hs(e){let s=Ds();s.push({id:e,ts:Date.now()});try{localStorage.setItem(zt,JSON.stringify(s.slice(-20)))}catch{}}function Us(){let e=y("#fb-overlay"),s=()=>{e.classList.add("show"),e.setAttribute("aria-hidden","false"),setTimeout(()=>y("#fb-msg").focus(),180)},a=()=>{e.classList.remove("show"),e.setAttribute("aria-hidden","true")};y("#fab-feedback").addEventListener("click",s),y("#fb-close").addEventListener("click",a),y("#fb-done").addEventListener("click",a),e.addEventListener("click",i=>{i.target===e&&a()}),document.addEventListener("keydown",i=>{i.key==="Escape"&&e.classList.contains("show")&&a()});let n=y("#faq-feedback-btn");n&&n.addEventListener("click",s);let r=y("#fb-msg"),v=y("#fb-count-n");r.addEventListener("input",()=>{v.textContent=String(r.value.length);try{localStorage.setItem("tt1v1_fb_draft",r.value)}catch{}});try{let i=localStorage.getItem("tt1v1_fb_draft");i&&(r.value=i,v.textContent=String(i.length))}catch{}let m=y("#fb-send");m.addEventListener("click",async()=>{let i=r.value.trim();if(i.length<5){r.focus(),r.classList.add("fb-nudge"),setTimeout(()=>r.classList.remove("fb-nudge"),500),q(t("fb.writeFirst"));return}m.classList.add("busy"),m.disabled=!0;try{let l=await fetch(nt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:y("#fb-name").value.trim(),contact:y("#fb-contact").value.trim(),message:i})}),o=await l.json().catch(()=>({}));if(!l.ok||!o.ok){q(t("fb.couldNotSend",{err:o.error||"HTTP "+l.status}));return}Hs(o.id);try{localStorage.removeItem("tt1v1_fb_draft")}catch{}y("#fb-ticket-code").textContent=o.id,y("#fb-view-form").hidden=!0,y("#fb-view-done").hidden=!1}catch{q(t("fb.netError"))}finally{m.classList.remove("busy"),m.disabled=!1}});let g=document.querySelector(".fb-ticket");g&&g.addEventListener("click",async()=>{let i=(y("#fb-ticket-code").textContent||"").trim();if(!i||i==="\u2014")return;try{await navigator.clipboard.writeText(i)}catch{let c=document.createElement("textarea");c.value=i,document.body.appendChild(c),c.select();try{document.execCommand("copy")}catch{}c.remove()}let l=y("#fb-copied");l&&(l.classList.add("show"),clearTimeout(window._fbCopiedT),window._fbCopiedT=setTimeout(()=>l.classList.remove("show"),1800)),q(t("fb.ticketCopied"))}),y("#fb-check").addEventListener("click",async()=>{let i=y("#fb-ticket-in").value.trim(),l=y("#fb-reply-out");if(i){l.classList.add("show"),l.textContent=t("fb.checking");try{let o=await fetch(nt+"/status?id="+encodeURIComponent(i)),c=await o.json().catch(()=>({}));if(!o.ok||!c.ok){l.textContent=t("fb.noTicket");return}l.innerHTML=c.resolved?`${t("fb.statusResolved")}${c.reply?`<br>${t("fb.replyFrom",{reply:x(c.reply)})}`:""}`:c.reply?t("fb.replyFrom",{reply:x(c.reply)}):t("fb.statusPending",{status:x(c.status)})}catch{l.textContent=t("fb.netErrorShort")}}})}function Gs(){let e=document.createElement("div");e.className="x-tip",document.body.appendChild(e);let s=null,a=null,n=null,r=0,v=0,m=0,g=c=>{let p=c&&c.closest?c.closest("[title],[data-tip]"):null;return p&&p.hasAttribute("title")&&(p.setAttribute("data-tip",p.getAttribute("title")),p.removeAttribute("title")),p&&p.getAttribute("data-tip")?p:null},i=(c,p)=>{let w=e.offsetWidth,h=e.offsetHeight,k=c+14,S=p+18;k+w>window.innerWidth-8&&(k=c-w-14),S+h>window.innerHeight-8&&(S=p-h-14),k=Math.max(8,k),S=Math.max(8,S);let C=e.classList.contains("show")&&e.style.left?Math.abs(parseFloat(e.style.left)-k)+Math.abs(parseFloat(e.style.top)-S)<150:!1;e.classList.toggle("snap",!C),e.style.left=k+"px",e.style.top=S+"px"},l=(c,p,w)=>{s=c,e.textContent=c.getAttribute("data-tip"),i(p,w),e.classList.add("show")},o=()=>{clearTimeout(a),clearTimeout(n),a=n=null,e.classList.remove("show"),s=null};document.addEventListener("mousemove",c=>{v=c.clientX,m=c.clientY;let p=g(c.target);if(p){if(clearTimeout(n),n=null,p===s){e.classList.contains("show")&&(cancelAnimationFrame(r),r=requestAnimationFrame(()=>i(v,m)));return}clearTimeout(a),e.classList.contains("show")?l(p,v,m):a=setTimeout(()=>l(p,v,m),90);return}s&&!n&&(n=setTimeout(o,110))},{passive:!0}),window.addEventListener("scroll",o,{passive:!0}),document.addEventListener("mousedown",o,{passive:!0})}var Te;function q(e){let s=y("#toast");s.textContent=e,s.classList.add("show"),clearTimeout(Te),Te=setTimeout(()=>s.classList.remove("show"),2600)}var gt;function Yt(){gt&&gt.disconnect(),gt=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&(s.target.classList.add("in"),B(".cu",s.target).forEach(a=>Ht(a,parseFloat(a.dataset.target),{dec:parseInt(a.dataset.dec||0)})),gt.unobserve(s.target))})},{threshold:.12}),B(".reveal").forEach(e=>gt.observe(e))}(function(){let s=y("#scroll-progress"),a=y("#to-top"),n=y("#page-home .hero-row"),r=document.querySelector(".topbar"),v=!1,m=null,g=null,i=()=>{v=!1;let p=window.scrollY,w=document.documentElement.scrollHeight-window.innerHeight;if(s&&(s.style.transform=`scaleX(${w>0?Math.min(1,p/w):0})`),a&&a.classList.toggle("show",p>640),r&&r.classList.toggle("scrolled",p>10),n&&p<1400){let h=Math.round(p*.14),k=Math.max(.3,1-p/950).toFixed(2);h!==m&&(n.style.transform=`translateY(${h}px)`,m=h),k!==g&&(n.style.opacity=k,g=k)}},l,o=document.documentElement,c=()=>{o.classList.add("is-scrolling"),r&&r.classList.add("scrolling"),clearTimeout(l),l=setTimeout(()=>{o.classList.remove("is-scrolling"),r&&r.classList.remove("scrolling")},160),v||(v=!0,requestAnimationFrame(i))};window.addEventListener("scroll",c,{passive:!0}),a&&a.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),i()})();window.lbScrollNow=e=>{window.scrollTo({top:e||0,behavior:"instant"})};window.lbCards={topOf:()=>U,all:()=>Z.players,byName:()=>V,histOf:Ct,h2hOf:Re,deltaTag:Wt,resLetter:F,fmtDate:tt,canon:j,allMatches:Q,ratingTimeline:Zs,ratingSeries:Xs,altsOf:Ae,lastSeenText:je,lastSeenExact:Ne};Lt();fe();ht();Us();Gs();window.addEventListener("lb-lang",()=>{let e=window.scrollY,s=at,a={...P};ht(),y("#page-home").classList.contains("active")&&(s!=="all"||a.key!=="rank"||a.dir!==1)&&(at=s,P=a,B(".chip[data-filter]").forEach(n=>n.classList.toggle("on",n.dataset.filter===s)),me(),ut(s,a.key,a.dir)),ge(),window.lbScrollNow(e)});function bt(e,s){let a=e.indexOf("window."+s);if(a<0)return null;let n=e.indexOf("=",a);for(;n<e.length&&"{[".indexOf(e[n])<0;)n++;let r=0,v=!1,m="",g=!1;for(let i=n;i<e.length;i++){let l=e[i];if(v){g?g=!1:l==="\\"?g=!0:l===m&&(v=!1);continue}if(l==='"'||l==="'"){v=!0,m=l;continue}if(l==="{"||l==="[")r++;else if((l==="}"||l==="]")&&(r--,r<=0))return JSON.parse(e.slice(n,i+1))}return null}var Ce="https://tierstats.github.io/";async function qe(e,s){for(let a of e)try{let n=await fetch(a+(a.includes("?")?"&":"?")+s,{cache:"no-store"});if(n.ok)return await n.text()}catch{}return null}async function Jt(e){try{let s="cb="+Date.now(),[a,n]=await Promise.all([qe([Ce+"data.js","data.js"],s),qe([Ce+"log.js","log.js"],s)]);if(!a||!n)throw new Error("data unavailable");let r=bt(a,"LB_TANKS");r&&(window.LB_TANKS={...window.LB_TANKS_SNAPSHOT||{},...r});let v=bt(a,"LB_DATA"),m=bt(n,"LB_PUB")||(bt(n,"LB_LOG")?{matches:bt(n,"LB_LOG")}:null),g=[];if(v&&JSON.stringify(v)!==JSON.stringify(D)&&(D=v,window.LB_DATA=v,g.push("data")),m&&JSON.stringify(m)!==JSON.stringify(window.LB_PUB||null)&&(window.LB_PUB=m,window.LB_LOG=m.matches||[],g.push("log")),g.length){let i=window.scrollY;Lt(),fe(),ht(),window.scrollTo({top:i,behavior:"instant"}),document.querySelectorAll(".reveal:not(.in), .anim:not(.in)").forEach(o=>o.classList.add("in"));let l=y("#last-updated");l&&(l.textContent=t("home.lastUpdated",{when:tt(D.generated)||"today"}))}e&&q(g.length?t("misc.refreshed"):t("misc.upToDate"))}catch{e&&q(t("misc.refreshFailed"))}}Jt(!1);var Ot=y("#lb-refresh-btn");Ot&&Ot.addEventListener("click",async()=>{Ot.classList.add("spinning"),await Jt(!0),setTimeout(()=>Ot.classList.remove("spinning"),400)});setInterval(()=>Jt(!1),6e4);document.addEventListener("visibilitychange",()=>{document.hidden||Jt(!1)});var We="tt1v1_fb_seen",X=null;function Ws(){try{return JSON.parse(localStorage.getItem(zt)||"[]")}catch{return[]}}function ze(){try{return JSON.parse(localStorage.getItem(We)||"{}")||{}}catch{return{}}}function zs(){let e=y("#fab-feedback");if(e&&!e.querySelector(".fb-dot")){let a=document.createElement("span");a.className="fb-dot",e.appendChild(a),requestAnimationFrame(()=>a.classList.add("in"))}let s=y("#fb-view-form");if(s&&!y("#fb-reply-banner")&&X){let a=document.createElement("div");a.id="fb-reply-banner",a.innerHTML=`${t("fb.teamReplied",{id:x(X.id)})}
      <div class="r">${x(X.reply)}</div>
      <button class="btn btn-ghost" id="fb-got-it" style="margin-top:9px;padding:6px 13px">${t("fb.gotIt")}</button>`,s.insertAdjacentElement("beforebegin",a),requestAnimationFrame(()=>a.classList.add("show")),y("#fb-got-it").addEventListener("click",Ys)}}function Ys(){if(X){let a=ze();a[X.id]=1;try{localStorage.setItem(We,JSON.stringify(a))}catch{}X=null}let e=y(".fb-dot");e&&(e.classList.add("out"),setTimeout(()=>e.remove(),420));let s=y("#fb-reply-banner");s&&(s.classList.remove("show"),setTimeout(()=>s.remove(),420))}async function Ye(){let e=ze();X=null;let s=Ws(),a=s.slice(0,Math.max(0,s.length-6)),n=[];for(let r of s.slice(-6))try{let v=await fetch(nt+"/status?id="+encodeURIComponent(r.id),{cache:"no-store"}),m=await v.json().catch(()=>({}));if(v.status===404||v.ok&&m.ok===!1)continue;n.push(r),v.ok&&m.ok&&m.reply&&!e[r.id]&&!X&&(X={id:r.id,reply:m.reply})}catch{n.push(r)}if(n.length!==s.slice(-6).length)try{localStorage.setItem(zt,JSON.stringify([...a,...n]))}catch{}X&&zs()}setTimeout(Ye,3500);setInterval(Ye,9e4);var Js=Tt.replace(/\/publish$/,"/api/ttstats"),Ks=15e3;function Vs(e,s){let a=e&&e.stats||{};return s==="kd"?a.deaths?a.kills/a.deaths:a.kills!=null?a.kills:null:a[s]!=null?a[s]:null}function Qs(e){let s=a=>String(a).replace(/["\\]/g,"\\$&");Object.keys(e).forEach(a=>{let n=e[a];window.LB_TANKS=Object.assign({},window.LB_TANKS||{},{[a]:n}),document.querySelectorAll(`[data-live-name="${s(a)}"][data-live]`).forEach(r=>{let v=r.dataset.live,m=Vs(n,v);if(m==null)return;let g=v==="kd"&&n.stats&&n.stats.deaths?2:0,i=Number(m.toFixed(g)),l=parseFloat(String(r.textContent).replace(/[^0-9.\-]/g,""));(isNaN(l)||l!==i)&&Ht(r,i,{dec:g,dur:900})}),document.querySelectorAll(`canvas[data-tank-name="${s(a)}"]`).forEach(r=>{r.dataset.mounted&&window.TankRender&&window.TankRender.render(r,n,r.dataset.tankSize||"medium")})})}(function(){let s=!1,a=0,n=new Set,r=0,v=0,m=i=>{a||(a=setTimeout(()=>{a=0,g()},i))};window.lbTankWant=i=>{i&&n.add(String(i)),s&&m(350)};let g=async()=>{if(s){m(300);return}if(document.visibilityState!=="visible")return;let i=[...new Set([...[...document.querySelectorAll("[data-live-name]")].map(d=>d.dataset.liveName),...[...document.querySelectorAll("canvas[data-tank-name]")].map(d=>d.dataset.tankName)])].filter(Boolean),l=window.LB_DATA||{},o=[...new Set([...l.qualified||[],...l.players||[]].map(d=>d&&d.name).filter(Boolean))],c=12,p=new Set,w=(d,$,u)=>{let b=[];for(let f=0;f<d.length&&b.length<u;f++){let L=d[($+f)%d.length];p.has(L)||(p.add(L),b.push(L))}return b},h=[...n].filter(Boolean);h.forEach(d=>p.add(d));let k=i.filter(d=>!p.has(d)),S=w(k,r,Math.min(6,Math.max(0,c-p.size)));k.length>S.length&&(r=(r+S.length)%k.length);let C=o.filter(d=>!p.has(d)),N=w(C,v,Math.max(0,c-p.size));C.length>N.length&&(v=(v+N.length)%C.length);let I=[...h,...S,...N].slice(0,c);if(I.length){s=!0;try{let $=await(await fetch(Js+"?names="+encodeURIComponent(I.join(",")),{cache:"no-store"})).json();$&&$.ok&&$.tanks&&(Qs($.tanks),typeof window.lbTankFreshMark=="function"&&window.lbTankFreshMark(Object.keys($.tanks))),I.forEach(u=>n.delete(u))}catch{}s=!1}};window.lbLiveStatsTick=()=>m(0),g(),setTimeout(g,900),setInterval(g,Ks)})();var kt=null;function Je(){if(kt)return kt;let e={},s=(o,c,p,w)=>{let h=c-T.conservative*p;(!e[o]||h>e[o].rating)&&(e[o]={rating:h,date:w||""})},a={},n=o=>{if(!a[o]){let[c,p]=le(o);a[o]={r:c,rd:p,lastIdx:null}}return a[o]},r={};for(let o of Q()){if(o.date)continue;let c=o.sa>o.sb?1:o.sa<o.sb?0:.5;(r[o.a]=r[o.a]||[]).push([o.b,c]),(r[o.b]=r[o.b]||[]).push([o.a,1-c]),n(o.a).lastIdx=et,n(o.b).lastIdx=et}let v={};for(let o in r)v[o]=[n(o).r,n(o).rd];for(let o in r){let c=n(o),[p,w]=dt(c.r,c.rd,r[o].map(([h,k])=>[v[h][0],v[h][1],k]));c.r=p,c.rd=w,s(o,p,w,T.graceStart)}let m={},g={};for(let o in a)g[j(o)]={r:a[o].r,rd:a[o].rd,lastIdx:a[o].lastIdx};let i=o=>{if(!g[o]){let[c,p]=le(o);g[o]={r:c,rd:p,lastIdx:null}}return g[o]};for(let o of Q().slice().reverse()){let c=o.date?Et(o.date):null,p=j(o.a),w=j(o.b),h=i(p),k=i(w);if(c!=null)for(let $ of[h,k]){let u=c-($.lastIdx==null?et:$.lastIdx);u>0&&($.rd=Math.min(Math.sqrt($.rd*$.rd+T.growth*T.growth*u),T.maxRd))}let S=o.sa>o.sb?1:o.sa<o.sb?0:.5,[C,N]=dt(h.r,h.rd,[[k.r,k.rd,S]]),[I,d]=dt(k.r,k.rd,[[h.r,h.rd,1-S]]);h.r=C,h.rd=N,c!=null&&(h.lastIdx=c),k.r=I,k.rd=d,c!=null&&(k.lastIdx=c),o.date&&((m[p]=m[p]||[]).push({date:o.date,r:C-T.conservative*N,opp:o.b,pf:o.sa,pa:o.sb,w:S}),(m[w]=m[w]||[]).push({date:o.date,r:I-T.conservative*d,opp:o.a,pf:o.sb,pa:o.sa,w:1-S}))}let l=new Map;for(let o of Q().filter(c=>c.date).slice().reverse()){let c=Et(o.date);l.has(c)||l.set(c,[]),l.get(c).push({a:j(o.a),b:j(o.b),sa:+o.sa,sb:+o.sb,date:o.date})}for(let o of[...l.keys()].sort((c,p)=>c-p)){for(let h in a){let k=a[h],S=o-(k.lastIdx==null?et:k.lastIdx);S>0&&(k.rd=Math.min(Math.sqrt(k.rd*k.rd+T.growth*T.growth*S),T.maxRd))}let c={},p="";for(let h of l.get(o)){let k=h.sa>h.sb?1:h.sa<h.sb?0:.5;(c[h.a]=c[h.a]||[]).push([h.b,k]),(c[h.b]=c[h.b]||[]).push([h.a,1-k]),n(h.a).lastIdx=o,n(h.b).lastIdx=o,h.date>p&&(p=h.date)}let w={};for(let h in c)w[h]=[n(h).r,n(h).rd];for(let h in c){let k=n(h),[S,C]=dt(k.r,k.rd,c[h].map(([N,I])=>[w[N][0],w[N][1],I]));k.r=S,k.rd=C,s(h,S,C,p)}}return kt={peaks:e,series:m},kt}function Zs(){return Je().peaks}function Xs(e){let s=j(e);return(Je().series[s]||[]).slice()}})();
