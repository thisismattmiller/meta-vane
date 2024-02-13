(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=globalThis,st=B.ShadowRoot&&(B.ShadyCSS===void 0||B.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,at=Symbol(),ot=new WeakMap;let $t=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==at)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(st&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=ot.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ot.set(e,t))}return t}toString(){return this.cssText}};const Pt=a=>new $t(typeof a=="string"?a:a+"",void 0,at),St=(a,...t)=>{const e=a.length===1?a[0]:t.reduce((i,s,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+a[n+1],a[0]);return new $t(e,a,at)},Et=(a,t)=>{if(st)a.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),s=B.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,a.appendChild(i)}},lt=st?a=>a:a=>a instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Pt(e)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:xt,defineProperty:Ct,getOwnPropertyDescriptor:Ut,getOwnPropertyNames:Rt,getOwnPropertySymbols:Ot,getPrototypeOf:Lt}=Object,A=globalThis,ht=A.trustedTypes,qt=ht?ht.emptyScript:"",Y=A.reactiveElementPolyfillSupport,M=(a,t)=>a,F={toAttribute(a,t){switch(t){case Boolean:a=a?qt:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,t){let e=a;switch(t){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},rt=(a,t)=>!xt(a,t),ct={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:rt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),A.litPropertyMetadata??(A.litPropertyMetadata=new WeakMap);class U extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ct){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Ct(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=Ut(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get(){return s==null?void 0:s.call(this)},set(r){const o=s==null?void 0:s.call(this);n.call(this,r),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ct}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;const t=Lt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){const e=this.properties,i=[...Rt(e),...Ot(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(lt(s))}else t!==void 0&&e.push(lt(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Et(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){var n;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const r=(((n=i.converter)==null?void 0:n.toAttribute)!==void 0?i.converter:F).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){var n;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const r=i.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:((n=r.converter)==null?void 0:n.fromAttribute)!==void 0?r.converter:F;this._$Em=s,this[s]=o.fromAttribute(e,r.type),this._$Em=null}}requestUpdate(t,e,i){if(t!==void 0){if(i??(i=this.constructor.getPropertyOptions(t)),!(i.hasChanged??rt)(this[t],e))return;this.P(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,r]of s)r.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],r)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(e)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}U.elementStyles=[],U.shadowRootOptions={mode:"open"},U[M("elementProperties")]=new Map,U[M("finalized")]=new Map,Y==null||Y({ReactiveElement:U}),(A.reactiveElementVersions??(A.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=globalThis,J=D.trustedTypes,pt=J?J.createPolicy("lit-html",{createHTML:a=>a}):void 0,bt="$lit$",k=`lit$${(Math.random()+"").slice(9)}$`,vt="?"+k,Tt=`<${vt}>`,C=document,Q=()=>C.createComment(""),I=a=>a===null||typeof a!="object"&&typeof a!="function",_t=Array.isArray,Ht=a=>_t(a)||typeof(a==null?void 0:a[Symbol.iterator])=="function",tt=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,ut=/>/g,E=RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ft=/'/g,mt=/"/g,wt=/^(?:script|style|textarea|title)$/i,Nt=a=>(t,...e)=>({_$litType$:a,strings:t,values:e}),y=Nt(1),R=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),yt=new WeakMap,x=C.createTreeWalker(C,129);function kt(a,t){if(!Array.isArray(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return pt!==void 0?pt.createHTML(t):t}const Mt=(a,t)=>{const e=a.length-1,i=[];let s,n=t===2?"<svg>":"",r=N;for(let o=0;o<e;o++){const l=a[o];let f,c,d=-1,m=0;for(;m<l.length&&(r.lastIndex=m,c=r.exec(l),c!==null);)m=r.lastIndex,r===N?c[1]==="!--"?r=dt:c[1]!==void 0?r=ut:c[2]!==void 0?(wt.test(c[2])&&(s=RegExp("</"+c[2],"g")),r=E):c[3]!==void 0&&(r=E):r===E?c[0]===">"?(r=s??N,d=-1):c[1]===void 0?d=-2:(d=r.lastIndex-c[2].length,f=c[1],r=c[3]===void 0?E:c[3]==='"'?mt:ft):r===mt||r===ft?r=E:r===dt||r===ut?r=N:(r=E,s=void 0);const p=r===E&&a[o+1].startsWith("/>")?" ":"";n+=r===N?l+Tt:d>=0?(i.push(f),l.slice(0,d)+bt+l.slice(d)+k+p):l+k+(d===-2?o:p)}return[kt(a,n+(a[e]||"<?>")+(t===2?"</svg>":"")),i]};class z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,l=this.parts,[f,c]=Mt(t,e);if(this.el=z.createElement(f,i),x.currentNode=this.el.content,e===2){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=x.nextNode())!==null&&l.length<o;){if(s.nodeType===1){if(s.hasAttributes())for(const d of s.getAttributeNames())if(d.endsWith(bt)){const m=c[r++],p=s.getAttribute(d).split(k),v=/([.?@])?(.*)/.exec(m);l.push({type:1,index:n,name:v[2],strings:p,ctor:v[1]==="."?jt:v[1]==="?"?Qt:v[1]==="@"?It:G}),s.removeAttribute(d)}else d.startsWith(k)&&(l.push({type:6,index:n}),s.removeAttribute(d));if(wt.test(s.tagName)){const d=s.textContent.split(k),m=d.length-1;if(m>0){s.textContent=J?J.emptyScript:"";for(let p=0;p<m;p++)s.append(d[p],Q()),x.nextNode(),l.push({type:2,index:++n});s.append(d[m],Q())}}}else if(s.nodeType===8)if(s.data===vt)l.push({type:2,index:n});else{let d=-1;for(;(d=s.data.indexOf(k,d+1))!==-1;)l.push({type:7,index:n}),d+=k.length-1}n++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function O(a,t,e=a,i){var r,o;if(t===R)return t;let s=i!==void 0?(r=e._$Co)==null?void 0:r[i]:e._$Cl;const n=I(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((o=s==null?void 0:s._$AO)==null||o.call(s,!1),n===void 0?s=void 0:(s=new n(a),s._$AT(a,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=O(a,s._$AS(a,t.values),s,i)),t}class Dt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??C).importNode(e,!0);x.currentNode=s;let n=x.nextNode(),r=0,o=0,l=i[0];for(;l!==void 0;){if(r===l.index){let f;l.type===2?f=new W(n,n.nextSibling,this,t):l.type===1?f=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(f=new zt(n,this,t)),this._$AV.push(f),l=i[++o]}r!==(l==null?void 0:l.index)&&(n=x.nextNode(),r++)}return x.currentNode=C,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class W{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=O(this,t,e),I(t)?t===g||t==null||t===""?(this._$AH!==g&&this._$AR(),this._$AH=g):t!==this._$AH&&t!==R&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ht(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==g&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=z.createElement(kt(i.h,i.h[0]),this.options)),i);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(e);else{const r=new Dt(s,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=yt.get(t.strings);return e===void 0&&yt.set(t.strings,e=new z(t)),e}k(t){_t(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new W(this.S(Q()),this.S(Q()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class G{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=g,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=g}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(n===void 0)t=O(this,t,e,0),r=!I(t)||t!==this._$AH&&t!==R,r&&(this._$AH=t);else{const o=t;let l,f;for(t=n[0],l=0;l<n.length-1;l++)f=O(this,o[i+l],e,l),f===R&&(f=this._$AH[l]),r||(r=!I(f)||f!==this._$AH[l]),f===g?t=g:t!==g&&(t+=(f??"")+n[l+1]),this._$AH[l]=f}r&&!s&&this.j(t)}j(t){t===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class jt extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===g?void 0:t}}class Qt extends G{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==g)}}class It extends G{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=O(this,t,e,0)??g)===R)return;const i=this._$AH,s=t===g&&i!==g||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==g&&(i===g||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class zt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){O(this,t)}}const et=D.litHtmlPolyfillSupport;et==null||et(z,W),(D.litHtmlVersions??(D.litHtmlVersions=[])).push("3.1.2");const Wt=(a,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const n=(e==null?void 0:e.renderBefore)??null;i._$litPart$=s=new W(t.insertBefore(Q(),n),n,void 0,e??{})}return s._$AI(a),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class j extends U{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Wt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return R}}var gt;j._$litElement$=!0,j.finalized=!0,(gt=globalThis.litElementHydrateSupport)==null||gt.call(globalThis,{LitElement:j});const it=globalThis.litElementPolyfillSupport;it==null||it({LitElement:j});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Vt=a=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(a,t)}):customElements.define(a,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bt={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:rt},Ft=(a=Bt,t,e)=>{const{kind:i,metadata:s}=e;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),n.set(e.name,a),i==="accessor"){const{name:r}=e;return{set(o){const l=t.get.call(this);t.set.call(this,o),this.requestUpdate(r,l,a)},init(o){return o!==void 0&&this.P(r,void 0,a),o}}}if(i==="setter"){const{name:r}=e;return function(o){const l=this[r];t.call(this,o),this.requestUpdate(r,l,a)}}throw Error("Unsupported decorator location: "+i)};function P(a){return(t,e)=>typeof e=="object"?Ft(a,t,e):((i,s,n)=>{const r=s.hasOwnProperty(n);return s.constructor.createProperty(n,r?{...i,wrapped:!0}:i),r?Object.getOwnPropertyDescriptor(s,n):void 0})(a,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function K(a){return P({...a,state:!0,attribute:!1})}const Jt=["Add_Qids_Here","Q865","Q148","Q794","Q836","Q843","Q159","Q851","Q858","Q948","Q43","Q717","Q212","Q219060","Q801"],w={wikidataSPARQLEndpoint:"https://query.wikidata.org/sparql",defaultPropertySets:{en:"title,image,abstract,line,P27,P569,P19,P570,P20,P26,P103,P106,P101,P135,P136,P69,P800,P172,P108,P463,P166,P361,P6,P571,P138,P1549,P30,P17,P1376,P610,P1082,P793,P2238,P856,disclaimer"},camel2Dash:function(a){return a.replace(/([a-zA-Z])(?=[A-Z])/g,"$1-").toLowerCase()},storeWikidataProperty:async function(a,t){typeof a=="string"&&(a=a.split(","));const e=new RegExp("^P[0-9]+$","i"),i=a.filter(n=>e.test(n)),s=`
      SELECT ?property ?propertyLabel 
      WHERE 
      {
        VALUES ?property {wd:${i.join(" wd:")}}
        SERVICE wikibase:label { bd:serviceParam wikibase:language "${t}". }
      }
    `;if(localStorage.getItem(`vanes-wikidata-property-label-map-${t}`)===null){let n=await this.wikiSPARQLQuery(s),r={};for(let o of n.results.bindings){let l=o.property.value.split("/")[4];r[l]=o.propertyLabel.value}return localStorage.setItem(`vanes-wikidata-property-label-map-${t}`,JSON.stringify({ts:Math.floor(Date.now()/1e3),map:r})),r}else{let n=!1,r=localStorage.getItem(`vanes-wikidata-property-label-map-${t}`);if(r==null)return console.log("Error could not find ",`vanes-wikidata-property-label-map-${t}`,"in local storage"),!1;let o=JSON.parse(r),l=o.ts,f=o.map;Math.floor(Date.now()/1e3)-l>=86400&&(n=!0);for(let c of i)Object.keys(f).indexOf(c)==-1&&(n=!0);if(n){let c=await this.wikiSPARQLQuery(s),d={};for(let m of c.results.bindings)d[m.property.value.split("/")[4]]=m.propertyLabel.value;localStorage.setItem(`vanes-wikidata-property-label-map-${t}`,JSON.stringify({ts:Math.floor(Date.now()/1e3),map:d}))}return f}},wikiSPARQLQuery:async function(a){const t={method:"GET",headers:new Headers({Accept:"application/sparql-results+json","User-Agent":"Vanes - Javascript Knowledge Panel Library"})};return await(await fetch(this.wikidataSPARQLEndpoint+"?origin=*&format=json&"+new URLSearchParams({query:a}),t)).json()},getQidFromAuthHeading:async function(a,t){let e="";t=="names"?e="https://id.loc.gov/authorities/names/label/"+window.encodeURI(a):console.error("could not build URL for authheading -> lccn process");let i="";const s=await fetch(e,{method:"HEAD"});s!==null?i=s.headers.get("x-uri").split("/").pop():console.error("Could not talk to id.loc.gov service to return the lccn for the label");let n=`
      SELECT ?item ?itemLabel 
      WHERE 
      {
        ?item wdt:P244 "${i}".
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
    `,r=null,o=await this.wikiSPARQLQuery(n);if(o&&o.results&&o.results.bindings)for(let l of o.results.bindings){r=l.item.value.split("/").pop();break}return{qid:r,lccn:i}},getQidFromLccn:async function(a){a=a.replace(/\s+/g,"");let t=null,e=`
      SELECT ?item ?itemLabel 
      WHERE 
      {
        ?item wdt:P244 "${a}".
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
    `,i=await this.wikiSPARQLQuery(e);if(i&&i.results&&i.results.bindings)for(let s of i.results.bindings){t=s.item.value.split("/").pop();break}return t},requestWikidata:async function(a,t,e){let i={qid:"",abstract:[],thumbnail:"",claims:{},title:"",pediaLink:"",error:!1};if(Jt.indexOf(a)>-1)return i.error=!0,i;typeof t=="string"&&(t=t.split(","));const s=new RegExp("^P[0-9]+$","i"),n=t.filter(m=>s.test(m));for(let m of n);const o=await(await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${a}.json`)).json();let l=!1;if(JSON.stringify(o).indexOf("Q82955")>-1&&(l=!0),o&&o.entities&&o.entities[a]){var f=o.entities[a].sitelinks,c={},d=o.entities[a].claims;if(Object.keys(f).forEach(m=>{var p=m.split("wiki")[0];if(p.indexOf("_old")>-1)return!1;var v=f[m].url.split("/wiki/")[1],L=f[m].url.split("/wiki/")[0],q=L+"/w/api.php?action=query&titles="+v+"&prop=pageimages&format=json&pithumbsize=640&origin=*",T=L+"/w/api.php?format=json&action=query&prop=extracts&exintro=1&explaintext=1&titles="+v+"&origin=*",Z=f[m].title,V=f[m].url;V.indexOf("wikipedia")>-1&&(c[p]={qid:a,lang:p,titleEncoded:v,server:L,thumbInfoUrl:q,articleInfoUrl:T,title:Z,link:V,allData:c})}),c[e]){let m={},p={};for(let u of n)if(d[u]){p[u]=[];for(let h of d[u])h.mainsnak.datatype=="wikibase-item"?(h.mainsnak&&h.mainsnak.datavalue&&p[u].push({qid:h.mainsnak.datavalue.value.id,label:null,type:h.mainsnak.datatype,rank:h.rank}),m[h.mainsnak.datavalue.value.id]=null):h.mainsnak.datatype=="string"?h.mainsnak&&h.mainsnak.datavalue&&p[u].push({qid:null,label:h.mainsnak.datavalue.value,type:h.mainsnak.datatype,rank:h.rank}):h.mainsnak.datatype=="url"?h.mainsnak&&h.mainsnak.datavalue&&p[u].push({qid:null,label:h.mainsnak.datavalue.value,type:h.mainsnak.datatype,rank:h.rank}):h.mainsnak.datatype=="time"?h.mainsnak&&h.mainsnak.datavalue&&p[u].push({qid:null,label:h.mainsnak.datavalue.value.time.split("T")[0].replace("+",""),type:h.mainsnak.datatype,rank:h.rank}):h.mainsnak.datatype=="external-id"?h.mainsnak&&h.mainsnak.datavalue&&p[u].push({qid:null,label:h.mainsnak.datavalue.value,type:h.mainsnak.datatype,rank:h.rank}):h.mainsnak.datatype=="commonsMedia"?h.mainsnak&&h.mainsnak.datavalue&&p[u].push({qid:null,label:h.mainsnak.datavalue.value,type:h.mainsnak.datatype,rank:h.rank}):h.mainsnak.datatype=="monolingualtext"?h.mainsnak&&h.mainsnak.datavalue&&p[u].push({qid:null,label:h.mainsnak.datavalue.value.text,type:h.mainsnak.datatype,rank:h.rank}):h.mainsnak.datatype=="quantity"&&h.mainsnak&&h.mainsnak.datavalue&&p[u].push({qid:null,label:h.mainsnak.datavalue.value.amount,type:h.mainsnak.datatype,rank:h.rank})}for(let u in p){p[u]=p[u].filter(_=>_.rank!="deprecated");let h=p[u].filter(_=>_.rank=="preferred");h.length>0&&(p[u]=h)}let v=`
            SELECT ?item ?itemLabel 
            WHERE 
            {              
              VALUES ?item {wd:${Object.keys(m).join(" wd:").trim()}}              
              SERVICE wikibase:label { bd:serviceParam wikibase:language "${e}". }
            }                         
          `,L=this.wikiSPARQLQuery(v),q;c[e].articleInfoUrl?q=fetch(c[e].articleInfoUrl):q=Promise.resolve(null);let T;c[e].thumbInfoUrl?T=fetch(c[e].thumbInfoUrl):T=Promise.resolve(null);const[Z,V,At]=await Promise.all([L,q,T]);let H=await V.json();if(H&&H.query&&H.query.pages){let u=Object.keys(H.query.pages);i.abstract=H.query.pages[u[0]].extract.split(`
`)}i.abstract[0]&&i.abstract[0].length>=725&&(i.abstract[0].substring(0,725),i.abstract[0].substring(725),i.abstract.forEach(function(u,h){}));let S=await At.json();if(S&&S.query&&S.query.pages){let u=Object.keys(S.query.pages);S.query.pages[u[0]].thumbnail&&S.query.pages[u[0]].thumbnail.source&&(i.thumbnail=S.query.pages[u[0]].thumbnail.source)}for(let u of Z.results.bindings){let h=u.item.value.split("/").pop(),_=u.itemLabel.value;for(let X in p)for(let nt of p[X])nt.qid===h&&(nt.label=_)}for(let u in p){let h={pid:u,values:[]};for(let _ of p[u]){let X={qid:_.qid,label:_.label,type:_.type};h.values.push(X)}h.values.length>0&&(i.claims[u]=h)}return l==!0&&(i.abstract=[]),i.title=c[e].title,i.qid=c[e].qid,i.pediaLink=c[e].link,i}else return i.error=!0,i}else return i.error=!0,i},enrichLCCN:async function(a,t){let e={authorityType:[]};const s=await(await fetch(`https://id.loc.gov/authorities/${t}/${a}.madsrdf.json`)).json();let n=`http://id.loc.gov/authorities/${t}/${a}`;for(let r of s)if(r["@id"]==n&&r["@type"]){Array.isArray(r["@type"])||(r["@type"]=[r["@type"]]);for(let o of r["@type"])o=o.split("#").pop(),e.authorityType.push(o)}return e}};var Gt=Object.defineProperty,Kt=Object.getOwnPropertyDescriptor,b=(a,t,e,i)=>{for(var s=i>1?void 0:i?Kt(t,e):t,n=a.length-1,r;n>=0;n--)(r=a[n])&&(s=(i?r(t,e,s):r(s))||s);return i&&s&&Gt(t,e,s),s};let $=class extends j{constructor(){super(),this.authHeading="",this.lccn="",this.qid="",this.lang="",this.properties="",this.layout="",this.authority="",this.wikidata={qid:"",abstract:[],thumbnail:"",claims:{},title:"",pediaLink:"",error:!0},this.showFullAbstract=!1,this.wikidataPropertyMap={},this.enhancementData={authorityType:[]},this.properties=w.defaultPropertySets.en,this.lang="en",this.authority="names",this.layout="default",this.showFullAbstract=!1}connectedCallback(){super.connectedCallback()}async firstUpdated(){if(this.wikidataPropertyMap=await w.storeWikidataProperty(this.properties,this.lang),!this.qid){if(this.lccn){let a=await w.getQidFromLccn(this.lccn);a?this.wikidata=await w.requestWikidata(a,this.properties,this.lang):console.warn("Meta-vane: Could not resolve ",this.lccn,"to Wikidata Qid"),this.enhancementData=await w.enrichLCCN(this.lccn,this.authority)}else if(this.authHeading){let a=await w.getQidFromAuthHeading(this.authHeading,this.authority);typeof a.lccn=="string"&&(this.lccn=a.lccn),a.qid?this.wikidata=await w.requestWikidata(a.qid,this.properties,this.lang):console.warn("Meta-vane: Could not resolve ",this.authHeading,"to Wikidata Qid"),this.enhancementData=await w.enrichLCCN(this.lccn,this.authority)}}}_moreAbstractClick(a){return this.showFullAbstract=!0,a.preventDefault(),!1}_wikiThisDisplayClick(a){return a.preventDefault(),!1}render(){let a=y``;if(this.layout=="default"){let t=y``,e=y``;if(this.wikidata.thumbnail!=""){let o="thumbnail-round";(this.enhancementData.authorityType.indexOf("Geographic")>-1||this.enhancementData.authorityType.indexOf("CorporateName")>-1)&&(o="thumbnail-square"),t=y`<div class="${o}" style="background-image: url(${this.wikidata.thumbnail});">`}this.wikidata.title!=""&&(e=y`<h1 class="title">${this.wikidata.title}</h1>`);let i=[],s=[],n="";for(let o of this.properties.split(",")){if(o==="title")i.push(e);else if(o==="image")i.push(t);else if(o==="line"){if(n=="abstract"&&this.wikidata.abstract.length==0)continue;s.push(y`<hr/>`)}else if(o==="abstract"){if(this.wikidata.abstract.length>0)if(this.showFullAbstract)for(let l of this.wikidata.abstract)s.push(y`<div class="abstract">${l}</div>`);else s.push(y`<div class="abstract">${this.wikidata.abstract[0]}...<a href="" @click="${this._moreAbstractClick}">more</a></div>`)}else if(o==="disclaimer"){let l=[];this.wikidata.qid!=null&&this.wikidata.qid!=""&&l.push(y`<a href="https://www.wikidata.org/entity/${this.wikidata.qid}" target="_blank">Wikidata</a>`),this.wikidata.abstract!=null&&this.wikidata.abstract.length>0&&(l.length>0&&l.push(y`<span>&nbsp;/&nbsp;</span>`),l.push(y`<a href="${this.wikidata.pediaLink}" target="_blank">Wikipedia</a>`)),s.push(y`
          <div class="disclaimer">
            Information in this <a href="#" title="Hover to draw a box around the data this statement is referring to" @click="${this._wikiThisDisplayClick}" class="display-trigger">display</a> is provided by the external data sources ${l} and is not created by the Library of Congress.
          </div>`)}else if(this.wikidata.claims[o]){let l=[];l.push(y`<div class="p-label">${this.wikidataPropertyMap[o]}</div>`);for(let c of this.wikidata.claims[o].values)c.qid?l.push(y`<div class="p-value"><a target="_blank"  href="https://www.wikidata.org/entity/${this.wikidata.qid}#${this.wikidata.claims[o].pid}">${c.label}</a></div>`):c.type=="url"?l.push(y`<div class="p-value"><a target="_blank"  href="${c.label}">${c.label}</a></div>`):l.push(y`<div class="p-value">${c.label}</div>`);let f=y`<div class="plist">${l}</div>`;s.push(f)}n=o}let r=y`
        <div class="display-hilite">
        ${i} 
        <div class="content">       
          ${s}
        </div>
        </div>
      `;this.wikidata.qid==""&&(r=y``),a=y`
        <section>
          ${r}
        </section>
        
      
      
      `}return y`
      ${a}
    `}};$.styles=St`
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

  `;b([P({type:String})],$.prototype,"authHeading",2);b([P({type:String})],$.prototype,"lccn",2);b([P({type:String})],$.prototype,"qid",2);b([P({type:String})],$.prototype,"lang",2);b([P({type:String})],$.prototype,"properties",2);b([P({type:String})],$.prototype,"layout",2);b([P({type:String})],$.prototype,"authority",2);b([K()],$.prototype,"wikidata",2);b([K()],$.prototype,"showFullAbstract",2);b([K()],$.prototype,"wikidataPropertyMap",2);b([K()],$.prototype,"enhancementData",2);$=b([Vt("meta-vane")],$);
