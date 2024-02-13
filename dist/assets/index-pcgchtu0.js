(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const F=globalThis,st=F.ShadowRoot&&(F.ShadyCSS===void 0||F.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,rt=Symbol(),nt=new WeakMap;let gt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==rt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(st&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=nt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&nt.set(e,t))}return t}toString(){return this.cssText}};const kt=r=>new gt(typeof r=="string"?r:r+"",void 0,rt),Pt=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((i,s,n)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[n+1],r[0]);return new gt(e,r,rt)},St=(r,t)=>{if(st)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),s=F.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,r.appendChild(i)}},ot=st?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return kt(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Et,defineProperty:xt,getOwnPropertyDescriptor:Ct,getOwnPropertyNames:Ut,getOwnPropertySymbols:Rt,getPrototypeOf:Lt}=Object,k=globalThis,lt=k.trustedTypes,Ot=lt?lt.emptyScript:"",Y=k.reactiveElementPolyfillSupport,M=(r,t)=>r,J={toAttribute(r,t){switch(t){case Boolean:r=r?Ot:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},at=(r,t)=>!Et(r,t),ht={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:at};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),k.litPropertyMetadata??(k.litPropertyMetadata=new WeakMap);class U extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ht){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&xt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=Ct(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get(){return s==null?void 0:s.call(this)},set(a){const o=s==null?void 0:s.call(this);n.call(this,a),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ht}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;const t=Lt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){const e=this.properties,i=[...Ut(e),...Rt(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(ot(s))}else t!==void 0&&e.push(ot(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return St(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){var n;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const a=(((n=i.converter)==null?void 0:n.toAttribute)!==void 0?i.converter:J).toAttribute(e,i.type);this._$Em=t,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){var n;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const a=i.getPropertyOptions(s),o=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)==null?void 0:n.fromAttribute)!==void 0?a.converter:J;this._$Em=s,this[s]=o.fromAttribute(e,a.type),this._$Em=null}}requestUpdate(t,e,i){if(t!==void 0){if(i??(i=this.constructor.getPropertyOptions(t)),!(i.hasChanged??at)(this[t],e))return;this.P(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,a]of this._$Ep)this[n]=a;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,a]of s)a.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],a)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(e)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}U.elementStyles=[],U.shadowRootOptions={mode:"open"},U[M("elementProperties")]=new Map,U[M("finalized")]=new Map,Y==null||Y({ReactiveElement:U}),(k.reactiveElementVersions??(k.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=globalThis,G=D.trustedTypes,ct=G?G.createPolicy("lit-html",{createHTML:r=>r}):void 0,$t="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,bt="?"+A,qt=`<${bt}>`,C=document,Q=()=>C.createComment(""),I=r=>r===null||typeof r!="object"&&typeof r!="function",vt=Array.isArray,Tt=r=>vt(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",tt=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pt=/-->/g,dt=/>/g,E=RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ut=/'/g,ft=/"/g,_t=/^(?:script|style|textarea|title)$/i,Ht=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),m=Ht(1),R=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),mt=new WeakMap,x=C.createTreeWalker(C,129);function wt(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ct!==void 0?ct.createHTML(t):t}const Nt=(r,t)=>{const e=r.length-1,i=[];let s,n=t===2?"<svg>":"",a=N;for(let o=0;o<e;o++){const l=r[o];let c,f,p=-1,d=0;for(;d<l.length&&(a.lastIndex=d,f=a.exec(l),f!==null);)d=a.lastIndex,a===N?f[1]==="!--"?a=pt:f[1]!==void 0?a=dt:f[2]!==void 0?(_t.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=E):f[3]!==void 0&&(a=E):a===E?f[0]===">"?(a=s??N,p=-1):f[1]===void 0?p=-2:(p=a.lastIndex-f[2].length,c=f[1],a=f[3]===void 0?E:f[3]==='"'?ft:ut):a===ft||a===ut?a=E:a===pt||a===dt?a=N:(a=E,s=void 0);const g=a===E&&r[o+1].startsWith("/>")?" ":"";n+=a===N?l+qt:p>=0?(i.push(c),l.slice(0,p)+$t+l.slice(p)+A+g):l+A+(p===-2?o:g)}return[wt(r,n+(r[e]||"<?>")+(t===2?"</svg>":"")),i]};class z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,a=0;const o=t.length-1,l=this.parts,[c,f]=Nt(t,e);if(this.el=z.createElement(c,i),x.currentNode=this.el.content,e===2){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=x.nextNode())!==null&&l.length<o;){if(s.nodeType===1){if(s.hasAttributes())for(const p of s.getAttributeNames())if(p.endsWith($t)){const d=f[a++],g=s.getAttribute(p).split(A),_=/([.?@])?(.*)/.exec(d);l.push({type:1,index:n,name:_[2],strings:g,ctor:_[1]==="."?Dt:_[1]==="?"?jt:_[1]==="@"?Qt:K}),s.removeAttribute(p)}else p.startsWith(A)&&(l.push({type:6,index:n}),s.removeAttribute(p));if(_t.test(s.tagName)){const p=s.textContent.split(A),d=p.length-1;if(d>0){s.textContent=G?G.emptyScript:"";for(let g=0;g<d;g++)s.append(p[g],Q()),x.nextNode(),l.push({type:2,index:++n});s.append(p[d],Q())}}}else if(s.nodeType===8)if(s.data===bt)l.push({type:2,index:n});else{let p=-1;for(;(p=s.data.indexOf(A,p+1))!==-1;)l.push({type:7,index:n}),p+=A.length-1}n++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function L(r,t,e=r,i){var a,o;if(t===R)return t;let s=i!==void 0?(a=e._$Co)==null?void 0:a[i]:e._$Cl;const n=I(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((o=s==null?void 0:s._$AO)==null||o.call(s,!1),n===void 0?s=void 0:(s=new n(r),s._$AT(r,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=L(r,s._$AS(r,t.values),s,i)),t}class Mt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??C).importNode(e,!0);x.currentNode=s;let n=x.nextNode(),a=0,o=0,l=i[0];for(;l!==void 0;){if(a===l.index){let c;l.type===2?c=new W(n,n.nextSibling,this,t):l.type===1?c=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(c=new It(n,this,t)),this._$AV.push(c),l=i[++o]}a!==(l==null?void 0:l.index)&&(n=x.nextNode(),a++)}return x.currentNode=C,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class W{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=L(this,t,e),I(t)?t===y||t==null||t===""?(this._$AH!==y&&this._$AR(),this._$AH=y):t!==this._$AH&&t!==R&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Tt(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==y&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=z.createElement(wt(i.h,i.h[0]),this.options)),i);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(e);else{const a=new Mt(s,this),o=a.u(this.options);a.p(e),this.T(o),this._$AH=a}}_$AC(t){let e=mt.get(t.strings);return e===void 0&&mt.set(t.strings,e=new z(t)),e}k(t){vt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new W(this.S(Q()),this.S(Q()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class K{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=y}_$AI(t,e=this,i,s){const n=this.strings;let a=!1;if(n===void 0)t=L(this,t,e,0),a=!I(t)||t!==this._$AH&&t!==R,a&&(this._$AH=t);else{const o=t;let l,c;for(t=n[0],l=0;l<n.length-1;l++)c=L(this,o[i+l],e,l),c===R&&(c=this._$AH[l]),a||(a=!I(c)||c!==this._$AH[l]),c===y?t=y:t!==y&&(t+=(c??"")+n[l+1]),this._$AH[l]=c}a&&!s&&this.j(t)}j(t){t===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Dt extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===y?void 0:t}}class jt extends K{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==y)}}class Qt extends K{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=L(this,t,e,0)??y)===R)return;const i=this._$AH,s=t===y&&i!==y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==y&&(i===y||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class It{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){L(this,t)}}const et=D.litHtmlPolyfillSupport;et==null||et(z,W),(D.litHtmlVersions??(D.litHtmlVersions=[])).push("3.1.2");const zt=(r,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const n=(e==null?void 0:e.renderBefore)??null;i._$litPart$=s=new W(t.insertBefore(Q(),n),n,void 0,e??{})}return s._$AI(r),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class j extends U{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=zt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return R}}var yt;j._$litElement$=!0,j.finalized=!0,(yt=globalThis.litElementHydrateSupport)==null||yt.call(globalThis,{LitElement:j});const it=globalThis.litElementPolyfillSupport;it==null||it({LitElement:j});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wt=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Vt={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:at},Bt=(r=Vt,t,e)=>{const{kind:i,metadata:s}=e;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),n.set(e.name,r),i==="accessor"){const{name:a}=e;return{set(o){const l=t.get.call(this);t.set.call(this,o),this.requestUpdate(a,l,r)},init(o){return o!==void 0&&this.P(a,void 0,r),o}}}if(i==="setter"){const{name:a}=e;return function(o){const l=this[a];t.call(this,o),this.requestUpdate(a,l,r)}}throw Error("Unsupported decorator location: "+i)};function P(r){return(t,e)=>typeof e=="object"?Bt(r,t,e):((i,s,n)=>{const a=s.hasOwnProperty(n);return s.constructor.createProperty(n,a?{...i,wrapped:!0}:i),a?Object.getOwnPropertyDescriptor(s,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Z(r){return P({...r,state:!0,attribute:!1})}const Ft=["Q865","Q2036942","Q148","Q794","Q836","Q843","Q159","Q851","Q858","Q948","Q43","Q717","Q212","Q219060","Q801","Q801"],w={wikidataSPARQLEndpoint:"https://query.wikidata.org/sparql",defaultPropertySets:{en:"title,image,abstract,line,P27,P569,P19,P570,P20,P26,P103,P106,P101,P135,P136,P69,P800,P172,P108,P463,P166,P361,P6,P571,P138,P1549,P30,P17,P1376,P610,P1082,P793,P2238,P856,disclaimer"},camel2Dash:function(r){return r.replace(/([a-zA-Z])(?=[A-Z])/g,"$1-").toLowerCase()},storeWikidataProperty:async function(r,t){typeof r=="string"&&(r=r.split(","));const e=new RegExp("^P[0-9]+$","i"),i=r.filter(n=>e.test(n)),s=`
      SELECT ?property ?propertyLabel 
      WHERE 
      {
        VALUES ?property {wd:${i.join(" wd:")}}
        SERVICE wikibase:label { bd:serviceParam wikibase:language "${t}". }
      }
    `;if(localStorage.getItem(`vanes-wikidata-property-label-map-${t}`)===null){let n=await this.wikiSPARQLQuery(s),a={};for(let o of n.results.bindings){let l=o.property.value.split("/")[4];a[l]=o.propertyLabel.value}return localStorage.setItem(`vanes-wikidata-property-label-map-${t}`,JSON.stringify({ts:Math.floor(Date.now()/1e3),map:a})),a}else{let n=!1,a=localStorage.getItem(`vanes-wikidata-property-label-map-${t}`);if(a==null)return console.log("Error could not find ",`vanes-wikidata-property-label-map-${t}`,"in local storage"),!1;let o=JSON.parse(a),l=o.ts,c=o.map;Math.floor(Date.now()/1e3)-l>=86400&&(n=!0);for(let f of i)Object.keys(c).indexOf(f)==-1&&(n=!0);if(n){let f=await this.wikiSPARQLQuery(s),p={};for(let d of f.results.bindings)p[d.property.value.split("/")[4]]=d.propertyLabel.value;localStorage.setItem(`vanes-wikidata-property-label-map-${t}`,JSON.stringify({ts:Math.floor(Date.now()/1e3),map:p}))}return c}},wikiSPARQLQuery:async function(r){const t={method:"GET",headers:new Headers({Accept:"application/sparql-results+json","User-Agent":"Vanes - Javascript Knowledge Panel Library"})};return await(await fetch(this.wikidataSPARQLEndpoint+"?origin=*&format=json&"+new URLSearchParams({query:r}),t)).json()},getQidFromAuthHeading:async function(r,t){let e="";t=="names"?e="https://id.loc.gov/authorities/names/label/"+window.encodeURI(r):console.error("could not build URL for authheading -> lccn process");let i="";const s=await fetch(e,{method:"HEAD"});s!==null?i=s.headers.get("x-uri").split("/").pop():console.error("Could not talk to id.loc.gov service to return the lccn for the label");let n=`
      SELECT ?item ?itemLabel 
      WHERE 
      {
        ?item wdt:P244 "${i}".
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
    `,a=null,o=await this.wikiSPARQLQuery(n);if(o&&o.results&&o.results.bindings)for(let l of o.results.bindings){a=l.item.value.split("/").pop();break}return{qid:a,lccn:i}},getQidFromLccn:async function(r){r=r.replace(/\s+/g,"");let t=null,e=`
      SELECT ?item ?itemLabel 
      WHERE 
      {
        ?item wdt:P244 "${r}".
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
    `,i=await this.wikiSPARQLQuery(e);if(i&&i.results&&i.results.bindings)for(let s of i.results.bindings){t=s.item.value.split("/").pop();break}return t},requestWikidata:async function(r,t,e){let i={qid:"",abstract:[],thumbnail:"",claims:{},title:"",pediaLink:"",error:!1};if(Ft.indexOf(r)>-1)return i.error=!0,i;typeof t=="string"&&(t=t.split(","));const s=new RegExp("^P[0-9]+$","i"),n=t.filter(p=>s.test(p));for(let p of n);const o=await(await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${r}.json`)).json();if(o&&o.entities&&o.entities[r]){var l=o.entities[r].sitelinks,c={},f=o.entities[r].claims;if(Object.keys(l).forEach(p=>{var d=p.split("wiki")[0];if(d.indexOf("_old")>-1)return!1;var g=l[p].url.split("/wiki/")[1],_=l[p].url.split("/wiki/")[0],O=_+"/w/api.php?action=query&titles="+g+"&prop=pageimages&format=json&pithumbsize=640&origin=*",q=_+"/w/api.php?format=json&action=query&prop=extracts&exintro=1&explaintext=1&titles="+g+"&origin=*",X=l[p].title,V=l[p].url;V.indexOf("wikipedia")>-1&&(c[d]={qid:r,lang:d,titleEncoded:g,server:_,thumbInfoUrl:O,articleInfoUrl:q,title:X,link:V,allData:c})}),c[e]){let p={},d={};for(let u of n)if(f[u]){d[u]=[];for(let h of f[u])h.mainsnak.datatype=="wikibase-item"?(console.log(h),d[u].push({qid:h.mainsnak.datavalue.value.id,label:null,type:h.mainsnak.datatype,rank:h.rank}),p[h.mainsnak.datavalue.value.id]=null):h.mainsnak.datatype=="string"?d[u].push({qid:null,label:h.mainsnak.datavalue.value,type:h.mainsnak.datatype,rank:h.rank}):h.mainsnak.datatype=="url"?d[u].push({qid:null,label:h.mainsnak.datavalue.value,type:h.mainsnak.datatype,rank:h.rank}):h.mainsnak.datatype=="time"?d[u].push({qid:null,label:h.mainsnak.datavalue.value.time.split("T")[0].replace("+",""),type:h.mainsnak.datatype,rank:h.rank}):h.mainsnak.datatype=="external-id"?d[u].push({qid:null,label:h.mainsnak.datavalue.value,type:h.mainsnak.datatype,rank:h.rank}):h.mainsnak.datatype=="commonsMedia"?d[u].push({qid:null,label:h.mainsnak.datavalue.value,type:h.mainsnak.datatype,rank:h.rank}):h.mainsnak.datatype=="monolingualtext"?d[u].push({qid:null,label:h.mainsnak.datavalue.value.text,type:h.mainsnak.datatype,rank:h.rank}):h.mainsnak.datatype=="quantity"&&d[u].push({qid:null,label:h.mainsnak.datavalue.value.amount,type:h.mainsnak.datatype,rank:h.rank})}for(let u in d){d[u]=d[u].filter(v=>v.rank!="deprecated");let h=d[u].filter(v=>v.rank=="preferred");h.length>0&&(d[u]=h)}let g=`
            SELECT ?item ?itemLabel 
            WHERE 
            {              
              VALUES ?item {wd:${Object.keys(p).join(" wd:").trim()}}              
              SERVICE wikibase:label { bd:serviceParam wikibase:language "${e}". }
            }                         
          `,_=this.wikiSPARQLQuery(g),O;c[e].articleInfoUrl?O=fetch(c[e].articleInfoUrl):O=Promise.resolve(null);let q;c[e].thumbInfoUrl?q=fetch(c[e].thumbInfoUrl):q=Promise.resolve(null);const[X,V,At]=await Promise.all([_,O,q]);let T=await V.json();if(T&&T.query&&T.query.pages){let u=Object.keys(T.query.pages);i.abstract=T.query.pages[u[0]].extract.split(`
`)}if(i.abstract[0]&&i.abstract[0].length>=725){let u=[],h=i.abstract[0].substring(0,725),v=i.abstract[0].substring(725);u.push(h),u.push(v),i.abstract.forEach(function(H,B){B!=0&&u.push(H)}),i.abstract=u}let S=await At.json();if(S&&S.query&&S.query.pages){let u=Object.keys(S.query.pages);S.query.pages[u[0]].thumbnail&&S.query.pages[u[0]].thumbnail.source&&(i.thumbnail=S.query.pages[u[0]].thumbnail.source)}for(let u of X.results.bindings){let h=u.item.value.split("/").pop(),v=u.itemLabel.value;for(let H in d)for(let B of d[H])B.qid===h&&(B.label=v)}for(let u in d){let h={pid:u,values:[]};for(let v of d[u]){let H={qid:v.qid,label:v.label,type:v.type};h.values.push(H)}h.values.length>0&&(i.claims[u]=h)}return i.title=c[e].title,i.qid=c[e].qid,i.pediaLink=c[e].link,i}else return i.error=!0,i}else return i.error=!0,i},enrichLCCN:async function(r,t){let e={authorityType:[]};const s=await(await fetch(`https://id.loc.gov/authorities/${t}/${r}.madsrdf.json`)).json();let n=`http://id.loc.gov/authorities/${t}/${r}`;for(let a of s)if(a["@id"]==n&&a["@type"]){Array.isArray(a["@type"])||(a["@type"]=[a["@type"]]);for(let o of a["@type"])o=o.split("#").pop(),e.authorityType.push(o)}return console.log(e),e}};var Jt=Object.defineProperty,Gt=Object.getOwnPropertyDescriptor,b=(r,t,e,i)=>{for(var s=i>1?void 0:i?Gt(t,e):t,n=r.length-1,a;n>=0;n--)(a=r[n])&&(s=(i?a(t,e,s):a(s))||s);return i&&s&&Jt(t,e,s),s};let $=class extends j{constructor(){super(),this.authHeading="",this.lccn="",this.qid="",this.lang="",this.properties="",this.layout="",this.authority="",this.wikidata={qid:"",abstract:[],thumbnail:"",claims:{},title:"",pediaLink:"",error:!0},this.showFullAbstract=!1,this.wikidataPropertyMap={},this.enhancementData={authorityType:[]},this.properties=w.defaultPropertySets.en,this.lang="en",this.authority="names",this.layout="default",this.showFullAbstract=!1}connectedCallback(){super.connectedCallback(),console.log("connected",this.properties)}async firstUpdated(){if(console.log("firstupdate",this.properties),this.wikidataPropertyMap=await w.storeWikidataProperty(this.properties,this.lang),!this.qid){if(this.lccn){let r=await w.getQidFromLccn(this.lccn);r?this.wikidata=await w.requestWikidata(r,this.properties,this.lang):console.warn("Meta-vane: Could not resolve ",this.lccn,"to Wikidata Qid"),this.enhancementData=await w.enrichLCCN(this.lccn,this.authority)}else if(this.authHeading){let r=await w.getQidFromAuthHeading(this.authHeading,this.authority);typeof r.lccn=="string"&&(this.lccn=r.lccn),r.qid?this.wikidata=await w.requestWikidata(r.qid,this.properties,this.lang):console.warn("Meta-vane: Could not resolve ",this.authHeading,"to Wikidata Qid"),this.enhancementData=await w.enrichLCCN(this.lccn,this.authority)}}}_moreAbstractClick(r){return this.showFullAbstract=!0,r.preventDefault(),!1}_wikiThisDisplayClick(r){return r.preventDefault(),!1}render(){let r=m``;if(this.layout=="default"){let t=m``,e=m``;if(this.wikidata.thumbnail!=""){let a="thumbnail-round";(this.enhancementData.authorityType.indexOf("Geographic")>-1||this.enhancementData.authorityType.indexOf("CorporateName")>-1)&&(a="thumbnail-square"),console.log(a),t=m`<div class="${a}" style="background-image: url(${this.wikidata.thumbnail});">`}this.wikidata.title!=""&&(e=m`<h1 class="title">${this.wikidata.title}</h1>`);let i=[],s=[];for(let a of this.properties.split(","))if(a==="title")i.push(e);else if(a==="image")i.push(t);else if(a==="line")s.push(m`<hr/>`);else if(a==="abstract"){if(this.wikidata.abstract.length>0)if(this.showFullAbstract)for(let o of this.wikidata.abstract)s.push(m`<div class="abstract">${o}</div>`);else s.push(m`<div class="abstract">${this.wikidata.abstract[0]}...<a href="" @click="${this._moreAbstractClick}">more</a></div>`)}else if(a==="disclaimer"){let o=[];this.wikidata.qid!=null&&this.wikidata.qid!=""&&o.push(m`<a href="https://www.wikidata.org/entity/${this.wikidata.qid}" target="_blank">Wikidata</a>`),this.wikidata.abstract!=null&&this.wikidata.abstract.length>0&&(o.length>0&&o.push(m`<span>&nbsp;/&nbsp;</span>`),o.push(m`<a href="${this.wikidata.pediaLink}" target="_blank">Wikipedia</a>`)),s.push(m`
          <div class="disclaimer">
            Information in this <a href="#" title="Hover to draw a box around the data this statement is referring to" @click="${this._wikiThisDisplayClick}" class="display-trigger">display</a> is provided by the external data sources ${o} and is not created by the Library of Congress.
          </div>`)}else if(this.wikidata.claims[a]){let o=[];o.push(m`<div class="p-label">${this.wikidataPropertyMap[a]}</div>`);for(let c of this.wikidata.claims[a].values)c.qid?o.push(m`<div class="p-value"><a target="_blank"  href="https://www.wikidata.org/entity/${this.wikidata.qid}#${this.wikidata.claims[a].pid}">${c.label}</a></div>`):c.type=="url"?o.push(m`<div class="p-value"><a target="_blank"  href="${c.label}">${c.label}</a></div>`):o.push(m`<div class="p-value">${c.label}</div>`);let l=m`<div class="plist">${o}</div>`;s.push(l)}let n=m`
        <div class="display-hilite">
        ${i} 
        <div class="content">       
          ${s}
        </div>
        </div>
      `;this.wikidata.qid==""&&(n=m``),r=m`
        <section>
          ${n}
        </section>
        
      
      
      `}return m`
      ${r}
    `}};$.styles=Pt`
    :host {
      max-width: 400px;
      padding: 2rem;
      font-family: BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
      color: #333;      
      
    }
    .title{
      text-align: center;
      font-size: 1.25em;
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }
    img{
      object-fit: cover;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    .content{
      border: solid 1px #e1e1e1;
      border-radius: 0.5em;
      padding: 0.25em;
    }
    
    .abstract{
      text-align: justify;
      font-size: 0.85em;
      margin-top: 0.25em;
    }
    .abstract-more{
      font-size: 0.85em;
    
    }
    .thumbnail-round{
      border-radius: 20em;
      height: 250px;
      width: 250px;
      background-size: cover;
        background-position-x: center;
        background-repeat: no-repeat;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 1em;
        border: solid 1px #e1e1e1;
    }

    .thumbnail-square{
      border-radius: 0em;
      height: 250px;
      width: 250px;
      background-size: cover;
        background-position-x: center;
        background-repeat: no-repeat;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 1em;
        border: solid 1px #e1e1e1;

    }
    
    hr{
      border: none;
      border-top: solid 1px #e1e1e1;
    }
    .plist{
      margin-top: 0.15em;
      margin-bottom: 0.15em;
    }
    div.plist:nth-of-type(even){
      background-color: #fafafa;
    }
    
    .p-label{
      font-style: oblique;
    }
    .p-value{
      text-align: right;
    
    }
    .p-value a{
      color: #333 !important;
      display: inline-block;
      margin-bottom: 0.1em;
      text-decoration: none;
    }
    .p-value a:hover{
      text-decoration: underline;
    }
    .p-value a:focus{
      text-decoration: underline;
    }
    .p-value a:active{
      text-decoration: underline;
    }

    .disclaimer a, .disclaimer a:visited{
      color: #333;
      text-decoration: none;

    }
    .display-hilite{
      padding: 1px;
    }
    .display-hilite:has(.display-trigger:hover) {
      border: dashed 1px red;
      padding: 0;
    }

    .disclaimer{
      font-size:0.9em;
      padding: 1em;
      text-align:center;
      color: tomato;
    }

  `;b([P({type:String})],$.prototype,"authHeading",2);b([P({type:String})],$.prototype,"lccn",2);b([P({type:String})],$.prototype,"qid",2);b([P({type:String})],$.prototype,"lang",2);b([P({type:String})],$.prototype,"properties",2);b([P({type:String})],$.prototype,"layout",2);b([P({type:String})],$.prototype,"authority",2);b([Z()],$.prototype,"wikidata",2);b([Z()],$.prototype,"showFullAbstract",2);b([Z()],$.prototype,"wikidataPropertyMap",2);b([Z()],$.prototype,"enhancementData",2);$=b([Wt("meta-vane")],$);
