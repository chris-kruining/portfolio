import{c as Z,a as T,b as g,g as G,o as J,S as U,d as X,e as Y,f as B,h as Q,u as tt,s as et,m as R,l as rt,i as nt,E as ot}from"./solid-4c629049.js";import{d as st,g as I,s as x,i as it,r as P,t as S,h as at}from"./web-3196b614.js";import{l as ct,g as ut}from"./invoices-5077fd2a.js";import{a as lt,c as j,b as dt}from"./server-runtime-7cf80ad8.js";import{l as W,g as pt}from"./products-773fb53a.js";import{A as ft}from"./auth-689a503f.js";import{c as mt,a as ht,R as _t,g as gt,b as Et,d as z,e as vt,m as bt,k as $t,s as wt,f as kt,n as At}from"./routing-5942bcce.js";const Tt="modulepreload",Rt=function(t){return"/portfolio/_build/"+t},C={},l=function(r,e,n){if(!e||e.length===0)return r();const o=document.getElementsByTagName("link");return Promise.all(e.map(s=>{if(s=Rt(s),s in C)return;C[s]=!0;const i=s.endsWith(".css"),a=i?'[rel="stylesheet"]':"";if(!!n)for(let m=o.length-1;m>=0;m--){const f=o[m];if(f.href===s&&(!i||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${a}`))return;const p=document.createElement("link");if(p.rel=i?"stylesheet":Tt,i||(p.as="script",p.crossOrigin=""),p.href=s,document.head.appendChild(p),i)return new Promise((m,f)=>{p.addEventListener("load",m),p.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>r()).catch(s=>{const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=s,window.dispatchEvent(i),!i.defaultPrevented)throw s})},L="Invariant Violation",{setPrototypeOf:It=function(t,r){return t.__proto__=r,t}}=Object;class O extends Error{framesToPop=1;name=L;constructor(r=L){super(typeof r=="number"?`${L}: ${r} (see https://github.com/apollographql/invariant-packages)`:r),It(this,O.prototype)}}function y(t,r){if(!t)throw new O(r)}const xt=/^[A-Za-z]:\//;function Pt(t=""){return t&&t.replace(/\\/g,"/").replace(xt,r=>r.toUpperCase())}const Lt=/^[/\\]{2}/,yt=/^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/,St=/^[A-Za-z]:$/,Ot=function(t){if(t.length===0)return".";t=Pt(t);const r=t.match(Lt),e=V(t),n=t[t.length-1]==="/";return t=Dt(t,!e),t.length===0?e?"/":n?"./":".":(n&&(t+="/"),St.test(t)&&(t+="/"),r?e?`//${t}`:`//./${t}`:e&&!V(t)?`/${t}`:t)},Nt=function(...t){if(t.length===0)return".";let r;for(const e of t)e&&e.length>0&&(r===void 0?r=e:r+=`/${e}`);return r===void 0?".":Ot(r.replace(/\/\/+/g,"/"))};function Dt(t,r){let e="",n=0,o=-1,s=0,i=null;for(let a=0;a<=t.length;++a){if(a<t.length)i=t[a];else{if(i==="/")break;i="/"}if(i==="/"){if(!(o===a-1||s===1))if(s===2){if(e.length<2||n!==2||e[e.length-1]!=="."||e[e.length-2]!=="."){if(e.length>2){const d=e.lastIndexOf("/");d===-1?(e="",n=0):(e=e.slice(0,d),n=e.length-1-e.lastIndexOf("/")),o=a,s=0;continue}else if(e.length>0){e="",n=0,o=a,s=0;continue}}r&&(e+=e.length>0?"/..":"..",n=2)}else e.length>0?e+=`/${t.slice(o+1,a)}`:e=t.slice(o+1,a),n=a-o-1;o=a,s=0}else i==="."&&s!==-1?++s:s=-1}return e}const V=function(t){return yt.test(t)};function Ct(t){return`virtual:${t}`}function Vt(t){return t.handler?.endsWith(".html")?t.handler:`#vinxi/handler/${t.name}`}const Ft=new Proxy({},{get(t,r){return y(typeof r=="string","Bundler name should be a string"),{handler:Ct(Vt({name:r})),chunks:new Proxy({},{get(e,n){y(typeof n=="string","Chunk expected");let o=Nt("/portfolio/_build",n+".js");return{import(){return l(()=>import(o),[])},output:{path:o}}}}),inputs:new Proxy({},{get(e,n){y(typeof n=="string","Input must be string");let o=window.manifest[n].output;return{async import(){return l(()=>import(o),[])},async assets(){return window.manifest[n].assets},output:{path:o}}}})}}});globalThis.MANIFEST=Ft;const Mt=t=>r=>{const{base:e}=r,n=Z(()=>r.children),o=T(()=>mt(r.root?{component:r.root,load:r.rootLoad,children:n()}:n(),r.base||""));let s;const i=ht(t,()=>s,o,{base:e,singleFlight:r.singleFlight});return t.create&&t.create(i),g(_t.Provider,{value:i,get children(){return[T(()=>(s=G())&&null),g(qt,{routerState:i,get branches(){return o()}})]}})};function qt(t){const r=T(()=>gt(t.branches,t.routerState.location.pathname)),e=Et(()=>{const i=r(),a={};for(let d=0;d<i.length;d++)Object.assign(a,i[d].params);return a}),n=[];let o;const s=T(J(r,(i,a,d)=>{let p=a&&i.length===a.length;const m=[];for(let f=0,k=i.length;f<k;f++){const $=a&&a[f],c=i[f];d&&$&&c.route.key===$.route.key?m[f]=d[f]:(p=!1,n[f]&&n[f](),X(u=>{n[f]=u,m[f]=vt(t.routerState,m[f-1]||t.routerState.base,Ut(()=>s()[f+1]),()=>r()[f],e)}))}return n.splice(i.length).forEach(f=>f()),d&&p?d:(o=m[0],m)}));return g(U,{get when(){return s()&&o},keyed:!0,children:i=>g(z.Provider,{value:i,get children(){return i.outlet()}})})}const Ut=t=>()=>g(U,{get when(){return t()},keyed:!0,children:r=>g(z.Provider,{value:r,get children(){return r.outlet()}})});function Bt([t,r],e,n){return[e?()=>e(t()):t,n?o=>r(n(o)):r]}function jt(t){if(t==="#")return null;try{return document.querySelector(t)}catch{return null}}function Wt(t){let r=!1;const e=o=>typeof o=="string"?{value:o}:o,n=Bt(Y(e(t.get()),{equals:(o,s)=>o.value===s.value}),void 0,o=>(!r&&t.set(o),o));return t.init&&B(t.init((o=t.get())=>{r=!0,n[1](e(o)),r=!1})),Mt({signal:n,create:t.create,utils:t.utils})}function zt(t,r,e){return t.addEventListener(r,e),()=>t.removeEventListener(r,e)}function Ht(t,r){const e=jt(`#${t}`);e?e.scrollIntoView():r&&window.scrollTo(0,0)}function Kt(t=!0,r=!1,e="/_server"){return n=>{const o=n.base.path(),s=n.navigatorFactory(n.base);let i={};function a(c){return c.namespaceURI==="http://www.w3.org/2000/svg"}function d(c){if(c.defaultPrevented||c.button!==0||c.metaKey||c.altKey||c.ctrlKey||c.shiftKey)return;const u=c.composedPath().find(D=>D instanceof Node&&D.nodeName.toUpperCase()==="A");if(!u||r&&!u.hasAttribute("link"))return;const _=a(u),h=_?u.href.baseVal:u.href;if((_?u.target.baseVal:u.target)||!h&&!u.hasAttribute("state"))return;const w=(u.getAttribute("rel")||"").split(/\s+/);if(u.hasAttribute("download")||w&&w.includes("external"))return;const A=_?new URL(h,document.baseURI):new URL(h);if(!(A.origin!==window.location.origin||o&&A.pathname&&!A.pathname.toLowerCase().startsWith(o.toLowerCase())))return[u,A]}function p(c){const u=d(c);if(!u)return;const[_,h]=u,N=n.parsePath(h.pathname+h.search+h.hash),w=_.getAttribute("state");c.preventDefault(),s(N,{resolve:!1,replace:_.hasAttribute("replace"),scroll:!_.hasAttribute("noscroll"),state:w&&JSON.parse(w)})}function m(c){const u=d(c);if(!u)return;const[_,h]=u;i[h.pathname]||n.preloadRoute(h,_.getAttribute("preload")!=="false")}function f(c){const u=d(c);if(!u)return;const[_,h]=u;i[h.pathname]||(i[h.pathname]=setTimeout(()=>{n.preloadRoute(h,_.getAttribute("preload")!=="false"),delete i[h.pathname]},200))}function k(c){const u=d(c);if(!u)return;const[,_]=u;i[_.pathname]&&(clearTimeout(i[_.pathname]),delete i[_.pathname])}function $(c){let u=c.submitter&&c.submitter.hasAttribute("formaction")?c.submitter.getAttribute("formaction"):c.target.getAttribute("action");if(!u)return;if(!u.startsWith("https://action/")){const h=new URL(u,bt);if(u=n.parsePath(h.pathname+h.search),!u.startsWith(e))return}if(c.target.method.toUpperCase()!=="POST")throw new Error("Only POST forms are supported for Actions");const _=lt.get(u);if(_){c.preventDefault();const h=new FormData(c.target);c.submitter&&c.submitter.name&&h.append(c.submitter.name,c.submitter.value),_.call(n,h)}}st(["click","submit"]),document.addEventListener("click",p),t&&(document.addEventListener("mouseover",f),document.addEventListener("mouseout",k),document.addEventListener("focusin",m),document.addEventListener("touchstart",m)),document.addEventListener("submit",$),B(()=>{document.removeEventListener("click",p),t&&(document.removeEventListener("mouseover",f),document.removeEventListener("mouseout",k),document.removeEventListener("focusin",m),document.removeEventListener("touchstart",m)),document.removeEventListener("submit",$)})}}function Zt(t){const r=()=>({value:window.location.pathname+window.location.search+window.location.hash,state:window.history.state}),e=kt();return Wt({get:r,set({value:n,replace:o,scroll:s,state:i}){o?window.history.replaceState($t(i),"",n):window.history.pushState(i,"",n),Ht(window.location.hash.slice(1),s),wt()},init:n=>zt(window,"popstate",At(n,o=>{if(o&&o<0)return!e.confirm(o);{const s=r();return!e.confirm(s.value,{state:s.state})}})),create:Kt(t.preload,t.explicitLinks,t.actionBase),utils:{go:n=>window.history.go(n),beforeLeave:e}})(t)}function b(t,r){let e,n=()=>!e||e.state==="unresolved"?void 0:e.latest;return[e]=Q(()=>Gt(t,tt(n)),o=>o,r),()=>e()}class E{static all(){return new E}static allSettled(){return new E}static any(){return new E}static race(){return new E}static reject(){return new E}static resolve(){return new E}catch(){return new E}then(){return new E}finally(){return new E}}function Gt(t,r){if(!et.context)return t(r);const e=fetch,n=Promise;try{return window.fetch=()=>new E,Promise=E,t(r)}finally{window.fetch=e,Promise=n}}function Jt(t){t.forEach(r=>{if(!r.attrs.href)return;let e=document.head.querySelector(`link[href="${r.attrs.href}"]`);e||(e=document.createElement("link"),e.setAttribute("rel","preload"),e.setAttribute("as","style"),e.setAttribute("href",r.attrs.href),document.head.appendChild(e))})}var Xt=S("<style>"),Yt=S("<link>"),Qt=S("<script> ");const te={style:t=>(()=>{var r=I(Xt);return x(r,R(()=>t.attrs),!1,!0),it(r,()=>t.children),P(),r})(),link:t=>(()=>{var r=I(Yt);return x(r,R(()=>t.attrs),!1,!1),P(),r})(),script:t=>t.attrs.src?(()=>{var r=I(Qt);return x(r,R(()=>t.attrs,{get id(){return t.key}}),!1,!0),P(),r})():null};function ee(t){let{tag:r,attrs:{key:e,...n}={key:void 0},children:o}=t;return te[r]({attrs:n,key:e,children:o})}function re(t,r,e,n="default"){return rt(async()=>{{const s=(await t.import())[n],a=(await r.inputs?.[t.src].assets()).filter(p=>p.tag==="style"||p.attrs.rel==="stylesheet");return typeof window<"u"&&Jt(a),{default:p=>[...a.map(m=>ee(m)),g(s,p)]}}})}const v={NORMAL:0,WILDCARD:1,PLACEHOLDER:2};function ne(t={}){const r={options:t,rootNode:H(),staticRoutesMap:{}},e=n=>t.strictTrailingSlash?n:n.replace(/\/$/,"")||"/";if(t.routes)for(const n in t.routes)F(r,e(n),t.routes[n]);return{ctx:r,lookup:n=>oe(r,e(n)),insert:(n,o)=>F(r,e(n),o),remove:n=>se(r,e(n))}}function oe(t,r){const e=t.staticRoutesMap[r];if(e)return e.data;const n=r.split("/"),o={};let s=!1,i=null,a=t.rootNode,d=null;for(let p=0;p<n.length;p++){const m=n[p];a.wildcardChildNode!==null&&(i=a.wildcardChildNode,d=n.slice(p).join("/"));const f=a.children.get(m);if(f!==void 0)a=f;else if(a=a.placeholderChildNode,a!==null)o[a.paramName]=m,s=!0;else break}return(a===null||a.data===null)&&i!==null&&(a=i,o[a.paramName||"_"]=d,s=!0),a?s?{...a.data,params:s?o:void 0}:a.data:null}function F(t,r,e){let n=!0;const o=r.split("/");let s=t.rootNode,i=0;for(const a of o){let d;if(d=s.children.get(a))s=d;else{const p=ie(a);d=H({type:p,parent:s}),s.children.set(a,d),p===v.PLACEHOLDER?(d.paramName=a==="*"?`_${i++}`:a.slice(1),s.placeholderChildNode=d,n=!1):p===v.WILDCARD&&(s.wildcardChildNode=d,d.paramName=a.slice(3)||"_",n=!1),s=d}}return s.data=e,n===!0&&(t.staticRoutesMap[r]=s),s}function se(t,r){let e=!1;const n=r.split("/");let o=t.rootNode;for(const s of n)if(o=o.children.get(s),!o)return e;if(o.data){const s=n[n.length-1];if(o.data=null,Object.keys(o.children).length===0){const i=o.parent;i.children.delete(s),i.wildcardChildNode=null,i.placeholderChildNode=null}e=!0}return e}function H(t={}){return{type:t.type||v.NORMAL,parent:t.parent||null,children:new Map,data:t.data||null,paramName:t.paramName||null,wildcardChildNode:null,placeholderChildNode:null}}function ie(t){return t.startsWith("**")?v.WILDCARD:t[0]===":"||t==="*"?v.PLACEHOLDER:v.NORMAL}const ae=j(ct,"invoices"),ce={load:()=>b(()=>ae())},ue=dt(le,"c_7194","$$function0");async function le(t){}const de={load:({params:t})=>{const r=ue(Number(t.brandId));return{brand:b(()=>r),products:b(async()=>{const e=await r;return(await W()).filter(o=>o.brand.id==e?.id)})}}},pe={load:({params:t})=>b(()=>pt(Number(t.productId)))},fe={load:()=>b(()=>W())},me=j(ut,"invoice"),he={load:({params:t})=>b(()=>me(Number(t.invoiceId)))},K=[{$component:{src:"src/routes/(admin).tsx?pick=default&pick=$css",build:()=>l(()=>import("./(admin)-4d554f28.js"),["assets/(admin)-4d554f28.js","assets/web-3196b614.js","assets/solid-4c629049.js","assets/components-8bef54ce.js","assets/routing-5942bcce.js","assets/(admin)-21e82f0e.css"]),import:()=>{const t="src/routes/(admin).tsx?pick=default&pick=$css";return l(()=>import(globalThis.MANIFEST.client.inputs[t].output.path),[])}},path:"/(admin)",filePath:"/home/runner/work/portfolio/portfolio/solid-start/src/routes/(admin).tsx"},{$component:{src:"src/routes/(customer).tsx?pick=default&pick=$css",build:()=>l(()=>import("./(customer)-2b7b6fd4.js"),["assets/(customer)-2b7b6fd4.js","assets/web-3196b614.js","assets/solid-4c629049.js","assets/price-da1a1d14.js","assets/products-773fb53a.js","assets/server-runtime-7cf80ad8.js","assets/routing-5942bcce.js","assets/auth-689a503f.js","assets/components-8bef54ce.js","assets/(customer)-610abc3a.css"]),import:()=>{const t="src/routes/(customer).tsx?pick=default&pick=$css";return l(()=>import(globalThis.MANIFEST.client.inputs[t].output.path),[])}},path:"/(customer)",filePath:"/home/runner/work/portfolio/portfolio/solid-start/src/routes/(customer).tsx"},{$component:{src:"src/routes/(admin)/[...notFound].tsx?pick=default&pick=$css",build:()=>l(()=>import("./_...notFound_-b678b669.js"),[]),import:()=>{const t="src/routes/(admin)/[...notFound].tsx?pick=default&pick=$css";return l(()=>import(globalThis.MANIFEST.client.inputs[t].output.path),[])}},path:"/(admin)/*notFound",filePath:"/home/runner/work/portfolio/portfolio/solid-start/src/routes/(admin)/[...notFound].tsx"},{$component:{src:"src/routes/(admin)/index.tsx?pick=default&pick=$css",build:()=>l(()=>import("./index-1d8a2c87.js"),[]),import:()=>{const t="src/routes/(admin)/index.tsx?pick=default&pick=$css";return l(()=>import(globalThis.MANIFEST.client.inputs[t].output.path),[])}},path:"/(admin)/",filePath:"/home/runner/work/portfolio/portfolio/solid-start/src/routes/(admin)/index.tsx"},{$component:{src:"src/routes/(admin)/sales.tsx?pick=default&pick=$css",build:()=>l(()=>import("./sales-beed7ef5.js"),["assets/sales-beed7ef5.js","assets/web-3196b614.js","assets/solid-4c629049.js","assets/components-8bef54ce.js","assets/routing-5942bcce.js","assets/sales-4ae176e3.css"]),import:()=>{const t="src/routes/(admin)/sales.tsx?pick=default&pick=$css";return l(()=>import(globalThis.MANIFEST.client.inputs[t].output.path),[])}},path:"/(admin)/sales",filePath:"/home/runner/work/portfolio/portfolio/solid-start/src/routes/(admin)/sales.tsx"},{$component:{src:"src/routes/(customer)/shop.tsx?pick=default&pick=$css",build:()=>l(()=>import("./shop-edb484dd.js"),["assets/shop-edb484dd.js","assets/solid-4c629049.js"]),import:()=>{const t="src/routes/(customer)/shop.tsx?pick=default&pick=$css";return l(()=>import(globalThis.MANIFEST.client.inputs[t].output.path),[])}},path:"/(customer)/shop",filePath:"/home/runner/work/portfolio/portfolio/solid-start/src/routes/(customer)/shop.tsx"},{$component:{src:"src/routes/(admin)/sales/index.tsx?pick=default&pick=$css",build:()=>l(()=>import("./index-938eeb37.js"),[]),import:()=>{const t="src/routes/(admin)/sales/index.tsx?pick=default&pick=$css";return l(()=>import(globalThis.MANIFEST.client.inputs[t].output.path),[])}},path:"/(admin)/sales/",filePath:"/home/runner/work/portfolio/portfolio/solid-start/src/routes/(admin)/sales/index.tsx"},{$component:{src:"src/routes/(admin)/sales/invoices.tsx?pick=default&pick=$css",build:()=>l(()=>import("./invoices-4a0885b1.js"),["assets/invoices-4a0885b1.js","assets/web-3196b614.js","assets/solid-4c629049.js","assets/components-8bef54ce.js","assets/routing-5942bcce.js","assets/invoices-d5adfe01.css"]),import:()=>{const t="src/routes/(admin)/sales/invoices.tsx?pick=default&pick=$css";return l(()=>import(globalThis.MANIFEST.client.inputs[t].output.path),[])}},$$route:{require:()=>({route:ce}),src:"src/routes/(admin)/sales/invoices.tsx?pick=route"},path:"/(admin)/sales/invoices",filePath:"/home/runner/work/portfolio/portfolio/solid-start/src/routes/(admin)/sales/invoices.tsx"},{$component:{src:"src/routes/(customer)/brand/[brandId].tsx?pick=default&pick=$css",build:()=>l(()=>import("./_brandId_-f5c319da.js"),["assets/_brandId_-f5c319da.js","assets/web-3196b614.js","assets/solid-4c629049.js"]),import:()=>{const t="src/routes/(customer)/brand/[brandId].tsx?pick=default&pick=$css";return l(()=>import(globalThis.MANIFEST.client.inputs[t].output.path),[])}},$$route:{require:()=>({route:de}),src:"src/routes/(customer)/brand/[brandId].tsx?pick=route"},path:"/(customer)/brand/:brandId",filePath:"/home/runner/work/portfolio/portfolio/solid-start/src/routes/(customer)/brand/[brandId].tsx"},{$component:{src:"src/routes/(customer)/brand/index.tsx?pick=default&pick=$css",build:()=>l(()=>import("./index-99eeb0db.js"),[]),import:()=>{const t="src/routes/(customer)/brand/index.tsx?pick=default&pick=$css";return l(()=>import(globalThis.MANIFEST.client.inputs[t].output.path),[])}},path:"/(customer)/brand/",filePath:"/home/runner/work/portfolio/portfolio/solid-start/src/routes/(customer)/brand/index.tsx"},{$component:{src:"src/routes/(customer)/shop/[productId].tsx?pick=default&pick=$css",build:()=>l(()=>import("./_productId_-bfacccbc.js"),["assets/_productId_-bfacccbc.js","assets/web-3196b614.js","assets/solid-4c629049.js","assets/price-da1a1d14.js","assets/products-773fb53a.js","assets/server-runtime-7cf80ad8.js","assets/routing-5942bcce.js","assets/components-8bef54ce.js","assets/_productId_-fd666aba.css"]),import:()=>{const t="src/routes/(customer)/shop/[productId].tsx?pick=default&pick=$css";return l(()=>import(globalThis.MANIFEST.client.inputs[t].output.path),[])}},$$route:{require:()=>({route:pe}),src:"src/routes/(customer)/shop/[productId].tsx?pick=route"},path:"/(customer)/shop/:productId",filePath:"/home/runner/work/portfolio/portfolio/solid-start/src/routes/(customer)/shop/[productId].tsx"},{$component:{src:"src/routes/(customer)/shop/index.tsx?pick=default&pick=$css",build:()=>l(()=>import("./index-b095f09a.js"),["assets/index-b095f09a.js","assets/web-3196b614.js","assets/solid-4c629049.js","assets/components-8bef54ce.js","assets/routing-5942bcce.js"]),import:()=>{const t="src/routes/(customer)/shop/index.tsx?pick=default&pick=$css";return l(()=>import(globalThis.MANIFEST.client.inputs[t].output.path),[])}},$$route:{require:()=>({route:fe}),src:"src/routes/(customer)/shop/index.tsx?pick=route"},path:"/(customer)/shop/",filePath:"/home/runner/work/portfolio/portfolio/solid-start/src/routes/(customer)/shop/index.tsx"},{$component:{src:"src/routes/(admin)/sales/invoices/[invoiceId].tsx?pick=default&pick=$css",build:()=>l(()=>import("./_invoiceId_-8229420b.js"),["assets/_invoiceId_-8229420b.js","assets/web-3196b614.js","assets/solid-4c629049.js"]),import:()=>{const t="src/routes/(admin)/sales/invoices/[invoiceId].tsx?pick=default&pick=$css";return l(()=>import(globalThis.MANIFEST.client.inputs[t].output.path),[])}},$$route:{require:()=>({route:he}),src:"src/routes/(admin)/sales/invoices/[invoiceId].tsx?pick=route"},path:"/(admin)/sales/invoices/:invoiceId",filePath:"/home/runner/work/portfolio/portfolio/solid-start/src/routes/(admin)/sales/invoices/[invoiceId].tsx"},{$component:{src:"src/routes/(admin)/sales/invoices/index.tsx?pick=default&pick=$css",build:()=>l(()=>import("./index-20d1198d.js"),[]),import:()=>{const t="src/routes/(admin)/sales/invoices/index.tsx?pick=default&pick=$css";return l(()=>import(globalThis.MANIFEST.client.inputs[t].output.path),[])}},path:"/(admin)/sales/invoices/",filePath:"/home/runner/work/portfolio/portfolio/solid-start/src/routes/(admin)/sales/invoices/index.tsx"},{$component:{src:"src/routes/(admin)/sales/invoices/new.tsx?pick=default&pick=$css",build:()=>l(()=>import("./new-84cb8500.js"),["assets/new-84cb8500.js","assets/web-3196b614.js","assets/solid-4c629049.js","assets/invoices-5077fd2a.js","assets/server-runtime-7cf80ad8.js","assets/routing-5942bcce.js","assets/new-efa924ba.css"]),import:()=>{const t="src/routes/(admin)/sales/invoices/new.tsx?pick=default&pick=$css";return l(()=>import(globalThis.MANIFEST.client.inputs[t].output.path),[])}},path:"/(admin)/sales/invoices/new",filePath:"/home/runner/work/portfolio/portfolio/solid-start/src/routes/(admin)/sales/invoices/new.tsx"}],_e=ge(K.filter(t=>t.$component));function ge(t){function r(e,n,o,s){const i=Object.values(e).find(a=>o.startsWith(a.id+"/"));return i?(r(i.children||(i.children=[]),n,o.slice(i.id.length)),e):(e.push({...n,id:o,path:o.replace(/\/\([^)/]+\)/g,"")}),e)}return t.sort((e,n)=>e.path.length-n.path.length).reduce((e,n)=>r(e,n,n.path,n.path),[])}function Ee(t){return t.$GET||t.$POST||t.$PUT||t.$PATCH||t.$DELETE}ne({routes:K.reduce((t,r)=>{if(!Ee(r))return t;let e=r.path.replace(/\(.*\)\/?/g,"").replace(/\*([^/]*)/g,(n,o)=>`**:${o}`);if(/:[^/]*\?/g.test(e))throw new Error(`Optional parameters are not supported in API routes: ${e}`);if(t[e])throw new Error(`Duplicate API routes for "${e}" found at "${t[e].route.path}" and "${r.path}"`);return t[e]={route:r},t},{})});function ve(){function t(e){return{...e,...e.$$route?e.$$route.require().route:void 0,info:{...e.$$route?e.$$route.require().route.info:{},filesystem:!0},component:re(e.$component,globalThis.MANIFEST.client,globalThis.MANIFEST.ssr),children:e.children?e.children.map(t):void 0}}return _e.map(t)}let M;const be=()=>M||(M=ve());function $e(t){return null}function we(){return g(ft,{get children(){return g(Zt,{get base(){return"/portfolio/"},root:t=>g(nt,{get children(){return t.children}}),get children(){return g(be,{})}})}})}function ke(t){return g(ot,{get fallback(){return g($e,{code:500})},get children(){return t.children}})}function Ae(t,r){return at(t,r)}function q(t){return t.children}function Te(){return g(q,{get children(){return g(q,{get children(){return g(ke,{get children(){return g(we,{})}})}})}})}Ae(()=>g(Te,{}),document.body);const Oe=void 0;export{Oe as default};
