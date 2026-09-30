import{r as l,j as r}from"./iframe-C8tv4kmi.js";import{P as W,c as C,u as vt}from"./index-BcJ60Uik.js";import{P as Q}from"./index-BfpYDi01.js";import{c as yt}from"./index-Ow5foHCc.js";import{u as _}from"./index-EjukwdR4.js";import{u as N}from"./index-B-7aNIMI.js";import{u as St}from"./index-BSTFQ0C-.js";import{c as wt}from"./index-BdQq_4o_.js";import{c as Z}from"./index-CcRgbaMz.js";import{S as nt}from"./Separator-BSAb54Pg.js";import"./preload-helper-Dp1pzeXC.js";import"./index-X5zQSBs5.js";import"./index-CoFyBxJP.js";import"./index-ChEho857.js";function Nt(e,t){return l.useReducer((o,s)=>t[o][s]??o,e)}var ne="ScrollArea",[st]=yt(ne),[Ct,v]=st(ne),at=l.forwardRef((e,t)=>{const{__scopeScrollArea:o,type:s="hover",dir:n,scrollHideDelay:a=600,...d}=e,[i,m]=l.useState(null),[h,c]=l.useState(null),[f,p]=l.useState(null),[g,A]=l.useState(null),[T,ee]=l.useState(null),[w,F]=l.useState(0),[te,O]=l.useState(0),[U,R]=l.useState(!1),[Y,q]=l.useState(!1),b=_(t,P=>m(P)),y=St(n);return r.jsx(Ct,{scope:o,type:s,dir:y,scrollHideDelay:a,scrollArea:i,viewport:h,onViewportChange:c,content:f,onContentChange:p,scrollbarX:g,onScrollbarXChange:A,scrollbarXEnabled:U,onScrollbarXEnabledChange:R,scrollbarY:T,onScrollbarYChange:ee,scrollbarYEnabled:Y,onScrollbarYEnabledChange:q,onCornerWidthChange:F,onCornerHeightChange:O,children:r.jsx(W.div,{dir:y,...d,ref:b,style:{position:"relative","--radix-scroll-area-corner-width":w+"px","--radix-scroll-area-corner-height":te+"px",...e.style}})})});at.displayName=ne;var lt="ScrollAreaViewport",dt=l.forwardRef((e,t)=>{const{__scopeScrollArea:o,children:s,nonce:n,...a}=e,d=v(lt,o),i=l.useRef(null),m=_(t,i,d.onViewportChange);return r.jsxs(r.Fragment,{children:[r.jsx("style",{dangerouslySetInnerHTML:{__html:"[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"},nonce:n}),r.jsx(W.div,{"data-radix-scroll-area-viewport":"",...a,ref:m,style:{overflowX:d.scrollbarXEnabled?"scroll":"hidden",overflowY:d.scrollbarYEnabled?"scroll":"hidden",...e.style},children:r.jsx("div",{ref:d.onContentChange,style:{minWidth:"100%",display:"table"},children:s})})]})});dt.displayName=lt;var S="ScrollAreaScrollbar",it=l.forwardRef((e,t)=>{const{forceMount:o,...s}=e,n=v(S,e.__scopeScrollArea),{onScrollbarXEnabledChange:a,onScrollbarYEnabledChange:d}=n,i=e.orientation==="horizontal";return l.useEffect(()=>(i?a(!0):d(!0),()=>{i?a(!1):d(!1)}),[i,a,d]),n.type==="hover"?r.jsx(jt,{...s,ref:t,forceMount:o}):n.type==="scroll"?r.jsx(Pt,{...s,ref:t,forceMount:o}):n.type==="auto"?r.jsx(mt,{...s,ref:t,forceMount:o}):n.type==="always"?r.jsx(se,{...s,ref:t}):null});it.displayName=S;var jt=l.forwardRef((e,t)=>{const{forceMount:o,...s}=e,n=v(S,e.__scopeScrollArea),[a,d]=l.useState(!1);return l.useEffect(()=>{const i=n.scrollArea;let m=0;if(i){const h=()=>{window.clearTimeout(m),d(!0)},c=()=>{m=window.setTimeout(()=>d(!1),n.scrollHideDelay)};return i.addEventListener("pointerenter",h),i.addEventListener("pointerleave",c),()=>{window.clearTimeout(m),i.removeEventListener("pointerenter",h),i.removeEventListener("pointerleave",c)}}},[n.scrollArea,n.scrollHideDelay]),r.jsx(Q,{present:o||a,children:r.jsx(mt,{"data-state":a?"visible":"hidden",...s,ref:t})})}),Pt=l.forwardRef((e,t)=>{const{forceMount:o,...s}=e,n=v(S,e.__scopeScrollArea),a=e.orientation==="horizontal",d=K(()=>m("SCROLL_END"),100),[i,m]=Nt("hidden",{hidden:{SCROLL:"scrolling"},scrolling:{SCROLL_END:"idle",POINTER_ENTER:"interacting"},interacting:{SCROLL:"interacting",POINTER_LEAVE:"idle"},idle:{HIDE:"hidden",SCROLL:"scrolling",POINTER_ENTER:"interacting"}});return l.useEffect(()=>{if(i==="idle"){const h=window.setTimeout(()=>m("HIDE"),n.scrollHideDelay);return()=>window.clearTimeout(h)}},[i,n.scrollHideDelay,m]),l.useEffect(()=>{const h=n.viewport,c=a?"scrollLeft":"scrollTop";if(h){let f=h[c];const p=()=>{const g=h[c];f!==g&&(m("SCROLL"),d()),f=g};return h.addEventListener("scroll",p),()=>h.removeEventListener("scroll",p)}},[n.viewport,a,m,d]),r.jsx(Q,{present:o||i!=="hidden",children:r.jsx(se,{"data-state":i==="hidden"?"hidden":"visible",...s,ref:t,onPointerEnter:C(e.onPointerEnter,()=>m("POINTER_ENTER")),onPointerLeave:C(e.onPointerLeave,()=>m("POINTER_LEAVE"))})})}),mt=l.forwardRef((e,t)=>{const o=v(S,e.__scopeScrollArea),{forceMount:s,...n}=e,[a,d]=l.useState(!1),i=e.orientation==="horizontal",m=K(()=>{if(o.viewport){const h=o.viewport.offsetWidth<o.viewport.scrollWidth,c=o.viewport.offsetHeight<o.viewport.scrollHeight;d(i?h:c)}},10);return M(o.viewport,m),M(o.content,m),r.jsx(Q,{present:s||a,children:r.jsx(se,{"data-state":a?"visible":"hidden",...n,ref:t})})}),se=l.forwardRef((e,t)=>{const{orientation:o="vertical",...s}=e,n=v(S,e.__scopeScrollArea),a=l.useRef(null),d=l.useRef(0),[i,m]=l.useState({content:0,viewport:0,scrollbar:{size:0,paddingStart:0,paddingEnd:0}}),h=ft(i.viewport,i.content),c={...s,sizes:i,onSizesChange:m,hasThumb:h>0&&h<1,onThumbChange:p=>a.current=p,onThumbPointerUp:()=>d.current=0,onThumbPointerDown:p=>d.current=p};function f(p,g){return It(p,d.current,i,g)}return o==="horizontal"?r.jsx(Mt,{...c,ref:t,onThumbPositionChange:()=>{if(n.viewport&&a.current){const p=n.viewport.scrollLeft,g=le(p,i,n.dir);a.current.style.transform=`translate3d(${g}px, 0, 0)`}},onWheelScroll:p=>{n.viewport&&(n.viewport.scrollLeft=p)},onDragScroll:p=>{n.viewport&&(n.viewport.scrollLeft=f(p,n.dir))}}):o==="vertical"?r.jsx(_t,{...c,ref:t,onThumbPositionChange:()=>{if(n.viewport&&a.current){const p=n.viewport.scrollTop,g=le(p,i);a.current.style.transform=`translate3d(0, ${g}px, 0)`}},onWheelScroll:p=>{n.viewport&&(n.viewport.scrollTop=p)},onDragScroll:p=>{n.viewport&&(n.viewport.scrollTop=f(p))}}):null}),Mt=l.forwardRef((e,t)=>{const{sizes:o,onSizesChange:s,...n}=e,a=v(S,e.__scopeScrollArea),[d,i]=l.useState(),m=l.useRef(null),h=_(t,m,a.onScrollbarXChange);return l.useEffect(()=>{m.current&&i(getComputedStyle(m.current))},[m]),r.jsx(ut,{"data-orientation":"horizontal",...n,ref:h,sizes:o,style:{bottom:0,left:a.dir==="rtl"?"var(--radix-scroll-area-corner-width)":0,right:a.dir==="ltr"?"var(--radix-scroll-area-corner-width)":0,"--radix-scroll-area-thumb-width":J(o)+"px",...e.style},onThumbPointerDown:c=>e.onThumbPointerDown(c.x),onDragScroll:c=>e.onDragScroll(c.x),onWheelScroll:(c,f)=>{if(a.viewport){const p=a.viewport.scrollLeft+c.deltaX;e.onWheelScroll(p),bt(p,f)&&c.preventDefault()}},onResize:()=>{m.current&&a.viewport&&d&&s({content:a.viewport.scrollWidth,viewport:a.viewport.offsetWidth,scrollbar:{size:m.current.clientWidth,paddingStart:G(d.paddingLeft),paddingEnd:G(d.paddingRight)}})}})}),_t=l.forwardRef((e,t)=>{const{sizes:o,onSizesChange:s,...n}=e,a=v(S,e.__scopeScrollArea),[d,i]=l.useState(),m=l.useRef(null),h=_(t,m,a.onScrollbarYChange);return l.useEffect(()=>{m.current&&i(getComputedStyle(m.current))},[m]),r.jsx(ut,{"data-orientation":"vertical",...n,ref:h,sizes:o,style:{top:0,right:a.dir==="ltr"?0:void 0,left:a.dir==="rtl"?0:void 0,bottom:"var(--radix-scroll-area-corner-height)","--radix-scroll-area-thumb-height":J(o)+"px",...e.style},onThumbPointerDown:c=>e.onThumbPointerDown(c.y),onDragScroll:c=>e.onDragScroll(c.y),onWheelScroll:(c,f)=>{if(a.viewport){const p=a.viewport.scrollTop+c.deltaY;e.onWheelScroll(p),bt(p,f)&&c.preventDefault()}},onResize:()=>{m.current&&a.viewport&&d&&s({content:a.viewport.scrollHeight,viewport:a.viewport.offsetHeight,scrollbar:{size:m.current.clientHeight,paddingStart:G(d.paddingTop),paddingEnd:G(d.paddingBottom)}})}})}),[Tt,ct]=st(S),ut=l.forwardRef((e,t)=>{const{__scopeScrollArea:o,sizes:s,hasThumb:n,onThumbChange:a,onThumbPointerUp:d,onThumbPointerDown:i,onThumbPositionChange:m,onDragScroll:h,onWheelScroll:c,onResize:f,...p}=e,g=v(S,o),[A,T]=l.useState(null),ee=_(t,b=>T(b)),w=l.useRef(null),F=l.useRef(""),te=g.viewport,O=s.content-s.viewport,U=N(c),R=N(m),Y=K(f,10);function q(b){if(w.current){const y=b.clientX-w.current.left,P=b.clientY-w.current.top;h({x:y,y:P})}}return l.useEffect(()=>{const b=y=>{const P=y.target;(A==null?void 0:A.contains(P))&&U(y,O)};return document.addEventListener("wheel",b,{passive:!1}),()=>document.removeEventListener("wheel",b,{passive:!1})},[te,A,O,U]),l.useEffect(R,[s,R]),M(A,Y),M(g.content,Y),r.jsx(Tt,{scope:o,scrollbar:A,hasThumb:n,onThumbChange:N(a),onThumbPointerUp:N(d),onThumbPositionChange:R,onThumbPointerDown:N(i),children:r.jsx(W.div,{...p,ref:ee,style:{position:"absolute",...p.style},onPointerDown:C(e.onPointerDown,b=>{b.button===0&&(b.target.setPointerCapture(b.pointerId),w.current=A.getBoundingClientRect(),F.current=document.body.style.webkitUserSelect,document.body.style.webkitUserSelect="none",g.viewport&&(g.viewport.style.scrollBehavior="auto"),q(b))}),onPointerMove:C(e.onPointerMove,q),onPointerUp:C(e.onPointerUp,b=>{const y=b.target;y.hasPointerCapture(b.pointerId)&&y.releasePointerCapture(b.pointerId),document.body.style.webkitUserSelect=F.current,g.viewport&&(g.viewport.style.scrollBehavior=""),w.current=null})})})}),X="ScrollAreaThumb",pt=l.forwardRef((e,t)=>{const{forceMount:o,...s}=e,n=ct(X,e.__scopeScrollArea);return r.jsx(Q,{present:o||n.hasThumb,children:r.jsx(Rt,{ref:t,...s})})}),Rt=l.forwardRef((e,t)=>{const{__scopeScrollArea:o,style:s,...n}=e,a=v(X,o),d=ct(X,o),{onThumbPositionChange:i}=d,m=_(t,f=>d.onThumbChange(f)),h=l.useRef(void 0),c=K(()=>{h.current&&(h.current(),h.current=void 0)},100);return l.useEffect(()=>{const f=a.viewport;if(f){const p=()=>{if(c(),!h.current){const g=kt(f,i);h.current=g,i()}};return i(),f.addEventListener("scroll",p),()=>f.removeEventListener("scroll",p)}},[a.viewport,c,i]),r.jsx(W.div,{"data-state":d.hasThumb?"visible":"hidden",...n,ref:m,style:{width:"var(--radix-scroll-area-thumb-width)",height:"var(--radix-scroll-area-thumb-height)",...s},onPointerDownCapture:C(e.onPointerDownCapture,f=>{const g=f.target.getBoundingClientRect(),A=f.clientX-g.left,T=f.clientY-g.top;d.onThumbPointerDown({x:A,y:T})}),onPointerUp:C(e.onPointerUp,d.onThumbPointerUp)})});pt.displayName=X;var ae="ScrollAreaCorner",ht=l.forwardRef((e,t)=>{const o=v(ae,e.__scopeScrollArea),s=!!(o.scrollbarX&&o.scrollbarY);return o.type!=="scroll"&&s?r.jsx(Et,{...e,ref:t}):null});ht.displayName=ae;var Et=l.forwardRef((e,t)=>{const{__scopeScrollArea:o,...s}=e,n=v(ae,o),[a,d]=l.useState(0),[i,m]=l.useState(0),h=!!(a&&i);return M(n.scrollbarX,()=>{var f;const c=((f=n.scrollbarX)==null?void 0:f.offsetHeight)||0;n.onCornerHeightChange(c),m(c)}),M(n.scrollbarY,()=>{var f;const c=((f=n.scrollbarY)==null?void 0:f.offsetWidth)||0;n.onCornerWidthChange(c),d(c)}),h?r.jsx(W.div,{...s,ref:t,style:{width:a,height:i,position:"absolute",right:n.dir==="ltr"?0:void 0,left:n.dir==="rtl"?0:void 0,bottom:0,...e.style}}):null});function G(e){return e?parseInt(e,10):0}function ft(e,t){const o=e/t;return isNaN(o)?0:o}function J(e){const t=ft(e.viewport,e.content),o=e.scrollbar.paddingStart+e.scrollbar.paddingEnd,s=(e.scrollbar.size-o)*t;return Math.max(s,18)}function It(e,t,o,s="ltr"){const n=J(o),a=n/2,d=t||a,i=n-d,m=o.scrollbar.paddingStart+d,h=o.scrollbar.size-o.scrollbar.paddingEnd-i,c=o.content-o.viewport,f=s==="ltr"?[0,c]:[c*-1,0];return gt([m,h],f)(e)}function le(e,t,o="ltr"){const s=J(t),n=t.scrollbar.paddingStart+t.scrollbar.paddingEnd,a=t.scrollbar.size-n,d=t.content-t.viewport,i=a-s,m=o==="ltr"?[0,d]:[d*-1,0],h=wt(e,m);return gt([0,d],[0,i])(h)}function gt(e,t){return o=>{if(e[0]===e[1]||t[0]===t[1])return t[0];const s=(t[1]-t[0])/(e[1]-e[0]);return t[0]+s*(o-e[0])}}function bt(e,t){return e>0&&e<t}var kt=(e,t=()=>{})=>{let o={left:e.scrollLeft,top:e.scrollTop},s=0;return(function n(){const a={left:e.scrollLeft,top:e.scrollTop},d=o.left!==a.left,i=o.top!==a.top;(d||i)&&t(),o=a,s=window.requestAnimationFrame(n)})(),()=>window.cancelAnimationFrame(s)};function K(e,t){const o=N(e),s=l.useRef(0);return l.useEffect(()=>()=>window.clearTimeout(s.current),[]),l.useCallback(()=>{window.clearTimeout(s.current),s.current=window.setTimeout(o,t)},[o,t])}function M(e,t){const o=N(t);vt(()=>{let s=0;if(e){const n=new ResizeObserver(()=>{cancelAnimationFrame(s),s=window.requestAnimationFrame(o)});return n.observe(e),()=>{window.cancelAnimationFrame(s),n.unobserve(e)}}},[e,o])}var Dt=at,xt=dt,At=ht;function u(){var e="/home/runner/work/nextgen-design-system/nextgen-design-system/src/components/ScrollArea/ScrollArea.tsx",t="d3c53b397e6ef5f3ae07129c8c37ace038d61e79",o=globalThis,s="__coverage__",n={path:"/home/runner/work/nextgen-design-system/nextgen-design-system/src/components/ScrollArea/ScrollArea.tsx",statementMap:{0:{start:{line:6,column:19},end:{line:31,column:1}},1:{start:{line:8,column:31},end:{line:8,column:80}},2:{start:{line:9,column:4},end:{line:29,column:6}},3:{start:{line:32,column:0},end:{line:32,column:38}},4:{start:{line:33,column:27},end:{line:41,column:2}},5:{start:{line:33,column:88},end:{line:41,column:1}},6:{start:{line:42,column:0},end:{line:42,column:54}},7:{start:{line:43,column:18},end:{line:57,column:2}},8:{start:{line:43,column:105},end:{line:57,column:1}},9:{start:{line:58,column:0},end:{line:58,column:36}},10:{start:{line:59,column:25},end:{line:59,column:179}},11:{start:{line:59,column:86},end:{line:59,column:178}},12:{start:{line:60,column:0},end:{line:60,column:50}},13:{start:{line:62,column:0},end:{line:68,column:50}},14:{start:{line:64,column:4},end:{line:64,column:42}},15:{start:{line:66,column:4},end:{line:66,column:1710}},16:{start:{line:68,column:50},end:{line:74,column:50}},17:{start:{line:70,column:4},end:{line:70,column:58}},18:{start:{line:72,column:4},end:{line:72,column:527}},19:{start:{line:74,column:50},end:{line:80,column:50}},20:{start:{line:76,column:4},end:{line:76,column:40}},21:{start:{line:78,column:4},end:{line:78,column:547}},22:{start:{line:80,column:50},end:{line:86,column:50}},23:{start:{line:82,column:4},end:{line:82,column:54}},24:{start:{line:84,column:4},end:{line:84,column:291}}},fnMap:{0:{name:"(anonymous_0)",decl:{start:{line:7,column:2},end:{line:7,column:3}},loc:{start:{line:7,column:72},end:{line:30,column:3}},line:7},1:{name:"(anonymous_1)",decl:{start:{line:33,column:38},end:{line:33,column:39}},loc:{start:{line:33,column:88},end:{line:41,column:1}},line:33},2:{name:"(anonymous_2)",decl:{start:{line:43,column:29},end:{line:43,column:30}},loc:{start:{line:43,column:105},end:{line:57,column:1}},line:43},3:{name:"(anonymous_3)",decl:{start:{line:59,column:36},end:{line:59,column:37}},loc:{start:{line:59,column:86},end:{line:59,column:178}},line:59}},branchMap:{0:{loc:{start:{line:7,column:26},end:{line:7,column:50}},type:"default-arg",locations:[{start:{line:7,column:40},end:{line:7,column:50}}],line:7},1:{loc:{start:{line:8,column:31},end:{line:8,column:80}},type:"cond-expr",locations:[{start:{line:8,column:56},end:{line:8,column:66}},{start:{line:8,column:69},end:{line:8,column:80}}],line:8},2:{loc:{start:{line:25,column:10},end:{line:25,column:97}},type:"binary-expr",locations:[{start:{line:25,column:10},end:{line:25,column:32}},{start:{line:25,column:52},end:{line:25,column:97}}],line:25},3:{loc:{start:{line:43,column:43},end:{line:43,column:67}},type:"default-arg",locations:[{start:{line:43,column:57},end:{line:43,column:67}}],line:43},4:{loc:{start:{line:50,column:6},end:{line:50,column:108}},type:"binary-expr",locations:[{start:{line:50,column:6},end:{line:50,column:32}},{start:{line:50,column:36},end:{line:50,column:108}}],line:50},5:{loc:{start:{line:51,column:6},end:{line:51,column:112}},type:"binary-expr",locations:[{start:{line:51,column:6},end:{line:51,column:34}},{start:{line:51,column:38},end:{line:51,column:112}}],line:51}},s:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0,21:0,22:0,23:0,24:0},f:{0:0,1:0,2:0,3:0},b:{0:[0],1:[0,0],2:[0,0],3:[0],4:[0,0],5:[0,0]},inputSourceMap:{version:3,file:null,sources:["/home/runner/work/nextgen-design-system/nextgen-design-system/src/components/ScrollArea/ScrollArea.tsx"],names:[],mappings:";AA6BM;AA3BN;AACA;AACA;AAmBA;AAAmB;AAGf;AAEA;AACE;AAAqB;AAApB;AACC;AAC2D;AACvD;AAEJ;AAAA;AAAqB;AAApB;AACW;AACA;AAET;AAAA;AACH;AAC4C;AACmB;AACnC;AAAA;AAAA;AAC9B;AAGN;AACA;AAMA;AAIE;AAAqB;AAApB;AACC;AACsE;AAC5D;AACN;AACN;AAEF;AAMA;AAIE;AAAqB;AAApB;AACC;AACA;AACW;AACT;AAEE;AAEA;AACF;AACF;AACI;AAEoG;AAC1G;AAEF;AAKA;AAMA;AAEA;;;;;;;;;;;;;;;;;;;;;;;;;"},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"d3c53b397e6ef5f3ae07129c8c37ace038d61e79"},a=o[s]||(o[s]={});(!a[e]||a[e].hash!==t)&&(a[e]=n);var d=a[e];return u=function(){return d},d}u();const x=(u().s[0]++,l.forwardRef(({className:e,children:t,orientation:o=(u().b[0][0]++,"vertical"),...s},n)=>{u().f[0]++;const a=(u().s[1]++,o==="both"?(u().b[1][0]++,"vertical"):(u().b[1][1]++,o));return u().s[2]++,r.jsxs(Dt,{ref:n,className:Z("mdt-relative mdt-overflow-hidden",e),...s,children:[r.jsx(xt,{className:"mdt-h-full mdt-w-full mdt-rounded-[inherit]",tabIndex:0,children:t}),r.jsx(j,{orientation:a}),(u().b[2][0]++,o==="both"&&(u().b[2][1]++,r.jsx(j,{orientation:"horizontal"}))),r.jsx(At,{})]})}));u().s[3]++;x.displayName="ScrollArea";const re=(u().s[4]++,l.forwardRef(({className:e,...t},o)=>(u().f[1]++,u().s[5]++,r.jsx(xt,{ref:o,className:Z("mdt-h-full mdt-w-full mdt-rounded-[inherit]",e),tabIndex:0,...t}))));u().s[6]++;re.displayName="ScrollAreaViewport";const j=(u().s[7]++,l.forwardRef(({className:e,orientation:t=(u().b[3][0]++,"vertical"),...o},s)=>(u().f[2]++,u().s[8]++,r.jsx(it,{ref:s,orientation:t,className:Z("mdt-flex mdt-touch-none mdt-select-none mdt-transition-colors",(u().b[4][0]++,t==="vertical"&&(u().b[4][1]++,"mdt-h-full mdt-w-2.5 mdt-border-l mdt-border-l-transparent mdt-p-[1px]")),(u().b[5][0]++,t==="horizontal"&&(u().b[5][1]++,"mdt-h-2.5 mdt-flex-col mdt-border-t mdt-border-t-transparent mdt-p-[1px]")),e),...o,children:r.jsx(pt,{className:"mdt-relative mdt-flex-1 mdt-rounded-full mdt-bg-border"})}))));u().s[9]++;j.displayName="ScrollBar";const oe=(u().s[10]++,l.forwardRef(({className:e,...t},o)=>(u().f[3]++,u().s[11]++,r.jsx(At,{ref:o,className:Z("mdt-bg-muted",e),...t}))));u().s[12]++;oe.displayName="ScrollAreaCorner";u().s[13]++;try{u().s[14]++,x.displayName="ScrollArea",u().s[15]++,x.__docgenInfo={description:`ScrollArea - A custom scrollable area with styled scrollbars.
Built on top of Radix UI ScrollArea primitive.`,displayName:"ScrollArea",props:{children:{defaultValue:null,description:"Content to be rendered inside the scroll area",name:"children",required:!1,type:{name:"ReactNode"}},orientation:{defaultValue:{value:"vertical"},description:"Scrollbar orientation",name:"orientation",required:!1,type:{name:"enum",value:[{value:'"both"'},{value:'"horizontal"'},{value:'"vertical"'}]}},type:{defaultValue:{value:"'hover'"},description:`The type of scrollbar to use
- "auto": Scrollbars are visible when content is overflowing
- "always": Scrollbars are always visible
- "scroll": Scrollbars are visible when scrolling
- "hover": Scrollbars are visible on hover`,name:"type",required:!1,type:{name:"enum",value:[{value:'"auto"'},{value:'"scroll"'},{value:'"always"'},{value:'"hover"'}]}},scrollHideDelay:{defaultValue:{value:"600"},description:'The delay in milliseconds before scrollbars are hidden (for type="scroll" or "hover")',name:"scrollHideDelay",required:!1,type:{name:"number"}},dir:{defaultValue:{value:"'ltr'"},description:"The direction of the scroll area",name:"dir",required:!1,type:{name:"enum",value:[{value:'"ltr"'},{value:'"rtl"'}]}},asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}u().s[16]++;try{u().s[17]++,re.displayName="ScrollAreaViewport",u().s[18]++,re.__docgenInfo={description:`ScrollAreaViewport - The viewport element for the scroll area.
Use when you need more control over the viewport styling.`,displayName:"ScrollAreaViewport",props:{children:{defaultValue:null,description:"Content to be rendered inside the viewport",name:"children",required:!1,type:{name:"ReactNode"}},asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}u().s[19]++;try{u().s[20]++,j.displayName="ScrollBar",u().s[21]++,j.__docgenInfo={description:`ScrollBar - The scrollbar element.
Can be used for both vertical and horizontal scrolling.`,displayName:"ScrollBar",props:{orientation:{defaultValue:{value:"vertical"},description:"Scrollbar orientation",name:"orientation",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}},asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}u().s[22]++;try{u().s[23]++,oe.displayName="ScrollAreaCorner",u().s[24]++,oe.__docgenInfo={description:"ScrollAreaCorner - The corner element where scrollbars meet.",displayName:"ScrollAreaCorner",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}const Jt={title:"Components/ScrollArea",component:x,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Augments native scroll functionality for custom, cross-browser styling. Built on top of Radix UI ScrollArea."}},controls:{exclude:["class"]}},argTypes:{className:{control:"text",description:"Additional CSS classes to apply",table:{type:{summary:"string"}}},orientation:{control:"select",options:["vertical","horizontal","both"],description:"Scrollbar orientation",table:{defaultValue:{summary:"vertical"}}},type:{control:"select",options:["auto","always","scroll","hover"],description:"Scrollbar visibility behavior",table:{defaultValue:{summary:"hover"}}}}},Lt=Array.from({length:50}).map((e,t,o)=>`v1.2.0-beta.${String(o.length-t)}`),E={render:()=>r.jsx(x,{className:"mdt-h-72 mdt-w-48 mdt-rounded-md mdt-border mdt-border-border",children:r.jsxs("div",{className:"mdt-p-4",children:[r.jsx("h4",{className:"mdt-mb-4 mdt-text-sm mdt-font-medium mdt-leading-none",children:"Tags"}),Lt.map(e=>r.jsxs("div",{children:[r.jsx("div",{className:"mdt-text-sm",children:e}),r.jsx(nt,{className:"mdt-my-2"})]},e))]})})},I={render:()=>r.jsxs(x,{className:"mdt-w-96 mdt-whitespace-nowrap mdt-rounded-md mdt-border mdt-border-border",children:[r.jsx("div",{className:"mdt-flex mdt-w-max mdt-space-x-4 mdt-p-4",children:Array.from({length:20}).map((e,t)=>r.jsxs("figure",{className:"mdt-shrink-0",children:[r.jsx("div",{className:"mdt-flex mdt-h-24 mdt-w-36 mdt-items-center mdt-justify-center mdt-overflow-hidden mdt-rounded-md mdt-bg-muted",children:r.jsx("span",{className:"mdt-text-xl mdt-font-semibold mdt-text-foreground",children:t+1})}),r.jsxs("figcaption",{className:"mdt-pt-2 mdt-text-xs mdt-text-muted-foreground",children:["Photo by Artist ",t+1]})]},`photo-${String(t)}`))}),r.jsx(j,{orientation:"horizontal"})]})},k={render:()=>r.jsx(x,{className:"mdt-h-72 mdt-w-96 mdt-rounded-md mdt-border mdt-border-border",orientation:"both",children:r.jsxs("div",{className:"mdt-w-[600px] mdt-p-4",children:[r.jsx("h4",{className:"mdt-mb-4 mdt-text-sm mdt-font-medium mdt-leading-none",children:"Wide & Tall Content"}),r.jsx("div",{className:"mdt-space-y-4",children:Array.from({length:30}).map((e,t)=>r.jsx("div",{className:"mdt-flex mdt-space-x-4",children:Array.from({length:5}).map((o,s)=>r.jsx("div",{className:"mdt-flex mdt-h-12 mdt-w-24 mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded mdt-bg-muted",children:r.jsxs("span",{className:"mdt-text-xs mdt-text-foreground",children:[t+1,"-",s+1]})},`cell-${String(t)}-${String(s)}`))},`row-${String(t)}`))})]})})},D={render:()=>r.jsx(x,{type:"always",className:"mdt-h-72 mdt-w-48 mdt-rounded-md mdt-border mdt-border-border",children:r.jsxs("div",{className:"mdt-p-4",children:[r.jsx("h4",{className:"mdt-mb-4 mdt-text-sm mdt-font-medium mdt-leading-none",children:"Always Visible"}),Array.from({length:30}).map((e,t)=>r.jsxs("div",{children:[r.jsxs("div",{className:"mdt-text-sm",children:["Item ",t+1]}),r.jsx(nt,{className:"mdt-my-2"})]},`item-${String(t)}`))]})})},L={render:()=>{const e=[{id:1,sender:"Alice",message:"Hey, how are you?",time:"10:00 AM",isMe:!1},{id:2,sender:"Me",message:"I'm doing great, thanks!",time:"10:01 AM",isMe:!0},{id:3,sender:"Alice",message:"Did you see the new design specs?",time:"10:02 AM",isMe:!1},{id:4,sender:"Me",message:"Yes, they look amazing! Great work on the UI.",time:"10:03 AM",isMe:!0},{id:5,sender:"Alice",message:"Thanks! I spent a lot of time on the details.",time:"10:05 AM",isMe:!1},{id:6,sender:"Me",message:"It really shows. The color palette is perfect.",time:"10:06 AM",isMe:!0},{id:7,sender:"Alice",message:"Let's schedule a meeting to discuss implementation.",time:"10:08 AM",isMe:!1},{id:8,sender:"Me",message:"Sounds good! How about 2 PM?",time:"10:09 AM",isMe:!0},{id:9,sender:"Alice",message:"Perfect, see you then!",time:"10:10 AM",isMe:!1},{id:10,sender:"Me",message:"Great, I'll send a calendar invite.",time:"10:11 AM",isMe:!0},{id:11,sender:"Alice",message:"By the way, have you checked the latest analytics?",time:"10:15 AM",isMe:!1},{id:12,sender:"Me",message:"Not yet, anything interesting?",time:"10:16 AM",isMe:!0},{id:13,sender:"Alice",message:"User engagement is up 25% this month!",time:"10:17 AM",isMe:!1},{id:14,sender:"Me",message:"That's fantastic news!",time:"10:18 AM",isMe:!0}];return r.jsxs("div",{className:"mdt-w-80 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background",children:[r.jsxs("div",{className:"mdt-border-b mdt-border-border mdt-p-3",children:[r.jsx("h4",{className:"mdt-font-semibold",children:"Chat with Alice"}),r.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Online"})]}),r.jsx(x,{className:"mdt-h-80",children:r.jsx("div",{className:"mdt-space-y-4 mdt-p-4",children:e.map(t=>r.jsx("div",{className:`mdt-flex ${t.isMe?"mdt-justify-end":"mdt-justify-start"}`,children:r.jsxs("div",{className:`mdt-max-w-[70%] mdt-rounded-lg mdt-px-3 mdt-py-2 ${t.isMe?"mdt-bg-primary mdt-text-primary-foreground":"mdt-bg-muted mdt-text-foreground"}`,children:[r.jsx("p",{className:"mdt-text-sm",children:t.message}),r.jsx("p",{className:`mdt-mt-1 mdt-text-xs ${t.isMe?"mdt-text-primary-foreground/70":"mdt-text-muted-foreground"}`,children:t.time})]})},t.id))})})]})}},z={render:()=>{const e=[{section:"Getting Started",items:["Introduction","Installation","Quick Start"]},{section:"Components",items:["Button","Input","Select","Checkbox","Radio","Switch","Tabs","Dialog","Popover","Tooltip"]},{section:"Layout",items:["Container","Grid","Flex","Stack","Separator","ScrollArea","Resizable"]},{section:"Forms",items:["Form","FormField","FormLabel","FormMessage","Validation"]},{section:"Advanced",items:["Theming","Dark Mode","Customization","TypeScript","Testing"]}];return r.jsx(x,{className:"mdt-h-80 mdt-w-64 mdt-rounded-md mdt-border mdt-border-border mdt-bg-background",children:r.jsx("div",{className:"mdt-p-4",children:e.map(t=>r.jsxs("div",{className:"mdt-mb-4",children:[r.jsx("h4",{className:"mdt-mb-2 mdt-text-sm mdt-font-semibold mdt-text-foreground",children:t.section}),r.jsx("div",{className:"mdt-space-y-1",children:t.items.map(o=>r.jsx("div",{className:"mdt-cursor-pointer mdt-rounded-md mdt-px-2 mdt-py-1.5 mdt-text-sm mdt-text-muted-foreground hover:mdt-bg-muted hover:mdt-text-foreground",children:o},o))})]},t.section))})})}},B={render:()=>r.jsx(x,{className:"mdt-h-64 mdt-w-96 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-zinc-950",children:r.jsx("div",{className:"mdt-p-4 mdt-font-mono mdt-text-sm",children:r.jsx("pre",{className:"mdt-text-zinc-100",children:`import { ScrollArea } from '@/components';

function App() {
  const items = Array.from({ length: 50 })
    .map((_, i) => \`Item \${i + 1}\`);

  return (
    <ScrollArea className="h-72 w-48">
      <div className="p-4">
        {items.map((item) => (
          <div key={item} className="py-2">
            {item}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default App;`})})})},V={render:()=>{const e=[{title:"Project Alpha",description:"A revolutionary new approach to data processing",status:"Active"},{title:"Project Beta",description:"Machine learning pipeline optimization",status:"In Progress"},{title:"Project Gamma",description:"Real-time analytics dashboard",status:"Completed"},{title:"Project Delta",description:"Cloud infrastructure migration",status:"Planning"},{title:"Project Epsilon",description:"Mobile app redesign initiative",status:"Active"},{title:"Project Zeta",description:"Security audit and improvements",status:"In Progress"},{title:"Project Eta",description:"Performance optimization sprint",status:"Completed"},{title:"Project Theta",description:"API versioning and documentation",status:"Planning"}],t={Active:"mdt-bg-success mdt-text-success-foreground","In Progress":"mdt-bg-warning mdt-text-warning-foreground",Completed:"mdt-bg-primary mdt-text-primary-foreground",Planning:"mdt-bg-muted mdt-text-muted-foreground"};return r.jsx(x,{className:"mdt-h-80 mdt-w-80",children:r.jsx("div",{className:"mdt-space-y-3 mdt-pr-4",children:e.map(o=>r.jsxs("div",{className:"mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background mdt-p-4",children:[r.jsxs("div",{className:"mdt-flex mdt-items-start mdt-justify-between",children:[r.jsx("h4",{className:"mdt-font-semibold",children:o.title}),r.jsx("span",{className:`mdt-rounded-full mdt-px-2 mdt-py-0.5 mdt-text-xs ${t[o.status]??""}`,children:o.status})]}),r.jsx("p",{className:"mdt-mt-2 mdt-text-sm mdt-text-muted-foreground",children:o.description})]},o.title))})})}},$={render:()=>{const e=Array.from({length:10}).map((t,o)=>({id:o+1,title:`Image ${String(o+1)}`,aspectRatio:o%2===0?"portrait":"landscape"}));return r.jsxs(x,{className:"mdt-w-full mdt-max-w-2xl mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background",children:[r.jsx("div",{className:"mdt-flex mdt-gap-4 mdt-p-4",children:e.map(t=>r.jsxs("div",{className:`mdt-shrink-0 ${t.aspectRatio==="portrait"?"mdt-w-32":"mdt-w-48"}`,children:[r.jsx("div",{className:`mdt-flex mdt-items-center mdt-justify-center mdt-rounded-lg mdt-bg-gradient-to-br mdt-from-primary/20 mdt-to-primary/5 ${t.aspectRatio==="portrait"?"mdt-h-48":"mdt-h-32"}`,children:r.jsx("span",{className:"mdt-text-2xl mdt-font-bold mdt-text-primary",children:t.id})}),r.jsx("p",{className:"mdt-mt-2 mdt-text-center mdt-text-sm mdt-text-muted-foreground",children:t.title})]},t.id))}),r.jsx(j,{orientation:"horizontal"})]})}},H={render:()=>{const e=Array.from({length:20}).map((t,o)=>({id:o+1,name:`User ${String(o+1)}`,email:`user${String(o+1)}@example.com`,role:["Admin","Editor","Viewer"][o%3],status:["Active","Inactive","Pending"][o%3]}));return r.jsx(x,{className:"mdt-h-80 mdt-w-full mdt-max-w-lg mdt-rounded-lg mdt-border mdt-border-border",children:r.jsxs("table",{className:"mdt-w-full",children:[r.jsx("thead",{className:"mdt-sticky mdt-top-0 mdt-bg-muted",children:r.jsxs("tr",{children:[r.jsx("th",{className:"mdt-px-4 mdt-py-3 mdt-text-left mdt-text-sm mdt-font-medium",children:"ID"}),r.jsx("th",{className:"mdt-px-4 mdt-py-3 mdt-text-left mdt-text-sm mdt-font-medium",children:"Name"}),r.jsx("th",{className:"mdt-px-4 mdt-py-3 mdt-text-left mdt-text-sm mdt-font-medium",children:"Role"}),r.jsx("th",{className:"mdt-px-4 mdt-py-3 mdt-text-left mdt-text-sm mdt-font-medium",children:"Status"})]})}),r.jsx("tbody",{children:e.map(t=>r.jsxs("tr",{className:"mdt-border-t mdt-border-border",children:[r.jsx("td",{className:"mdt-px-4 mdt-py-3 mdt-text-sm",children:t.id}),r.jsx("td",{className:"mdt-px-4 mdt-py-3 mdt-text-sm",children:t.name}),r.jsx("td",{className:"mdt-px-4 mdt-py-3 mdt-text-sm",children:t.role}),r.jsx("td",{className:"mdt-px-4 mdt-py-3 mdt-text-sm",children:r.jsx("span",{className:`mdt-rounded-full mdt-px-2 mdt-py-0.5 mdt-text-xs ${t.status==="Active"?"mdt-bg-green-80 mdt-text-white":t.status==="Inactive"?"mdt-bg-red-80 mdt-text-white":"mdt-bg-orange-80 mdt-text-white"}`,children:t.status})})]},t.id))})]})})}};var de,ie,me,ce,ue;E.parameters={...E.parameters,docs:{...(de=E.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: () => <ScrollArea className="mdt-h-72 mdt-w-48 mdt-rounded-md mdt-border mdt-border-border">
      <div className="mdt-p-4">
        <h4 className="mdt-mb-4 mdt-text-sm mdt-font-medium mdt-leading-none">Tags</h4>
        {tags.map(tag => <div key={tag}>
            <div className="mdt-text-sm">{tag}</div>
            <Separator className="mdt-my-2" />
          </div>)}
      </div>
    </ScrollArea>
}`,...(me=(ie=E.parameters)==null?void 0:ie.docs)==null?void 0:me.source},description:{story:"Default vertical scroll area with a list of items.",...(ue=(ce=E.parameters)==null?void 0:ce.docs)==null?void 0:ue.description}}};var pe,he,fe,ge,be;I.parameters={...I.parameters,docs:{...(pe=I.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  render: () => <ScrollArea className="mdt-w-96 mdt-whitespace-nowrap mdt-rounded-md mdt-border mdt-border-border">
      <div className="mdt-flex mdt-w-max mdt-space-x-4 mdt-p-4">
        {Array.from({
        length: 20
      }).map((_, i) => <figure key={\`photo-\${String(i)}\`} className="mdt-shrink-0">
            <div className="mdt-flex mdt-h-24 mdt-w-36 mdt-items-center mdt-justify-center mdt-overflow-hidden mdt-rounded-md mdt-bg-muted">
              <span className="mdt-text-xl mdt-font-semibold mdt-text-foreground">{i + 1}</span>
            </div>
            <figcaption className="mdt-pt-2 mdt-text-xs mdt-text-muted-foreground">
              Photo by Artist {i + 1}
            </figcaption>
          </figure>)}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
}`,...(fe=(he=I.parameters)==null?void 0:he.docs)==null?void 0:fe.source},description:{story:"Horizontal scroll area for wide content.",...(be=(ge=I.parameters)==null?void 0:ge.docs)==null?void 0:be.description}}};var xe,Ae,ve,ye,Se;k.parameters={...k.parameters,docs:{...(xe=k.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  render: () => <ScrollArea className="mdt-h-72 mdt-w-96 mdt-rounded-md mdt-border mdt-border-border" orientation="both">
      <div className="mdt-w-[600px] mdt-p-4">
        <h4 className="mdt-mb-4 mdt-text-sm mdt-font-medium mdt-leading-none">
          Wide & Tall Content
        </h4>
        <div className="mdt-space-y-4">
          {Array.from({
          length: 30
        }).map((_, i) => <div key={\`row-\${String(i)}\`} className="mdt-flex mdt-space-x-4">
              {Array.from({
            length: 5
          }).map((_, j) => <div key={\`cell-\${String(i)}-\${String(j)}\`} className="mdt-flex mdt-h-12 mdt-w-24 mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded mdt-bg-muted">
                  <span className="mdt-text-xs mdt-text-foreground">
                    {i + 1}-{j + 1}
                  </span>
                </div>)}
            </div>)}
        </div>
      </div>
    </ScrollArea>
}`,...(ve=(Ae=k.parameters)==null?void 0:Ae.docs)==null?void 0:ve.source},description:{story:"Both vertical and horizontal scrolling.",...(Se=(ye=k.parameters)==null?void 0:ye.docs)==null?void 0:Se.description}}};var we,Ne,Ce,je,Pe;D.parameters={...D.parameters,docs:{...(we=D.parameters)==null?void 0:we.docs,source:{originalSource:`{
  render: () => <ScrollArea type="always" className="mdt-h-72 mdt-w-48 mdt-rounded-md mdt-border mdt-border-border">
      <div className="mdt-p-4">
        <h4 className="mdt-mb-4 mdt-text-sm mdt-font-medium mdt-leading-none">Always Visible</h4>
        {Array.from({
        length: 30
      }).map((_, i) => <div key={\`item-\${String(i)}\`}>
            <div className="mdt-text-sm">Item {i + 1}</div>
            <Separator className="mdt-my-2" />
          </div>)}
      </div>
    </ScrollArea>
}`,...(Ce=(Ne=D.parameters)==null?void 0:Ne.docs)==null?void 0:Ce.source},description:{story:"Always visible scrollbars.",...(Pe=(je=D.parameters)==null?void 0:je.docs)==null?void 0:Pe.description}}};var Me,_e,Te,Re,Ee;L.parameters={...L.parameters,docs:{...(Me=L.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  render: () => {
    const messages = [{
      id: 1,
      sender: 'Alice',
      message: 'Hey, how are you?',
      time: '10:00 AM',
      isMe: false
    }, {
      id: 2,
      sender: 'Me',
      message: "I'm doing great, thanks!",
      time: '10:01 AM',
      isMe: true
    }, {
      id: 3,
      sender: 'Alice',
      message: 'Did you see the new design specs?',
      time: '10:02 AM',
      isMe: false
    }, {
      id: 4,
      sender: 'Me',
      message: 'Yes, they look amazing! Great work on the UI.',
      time: '10:03 AM',
      isMe: true
    }, {
      id: 5,
      sender: 'Alice',
      message: 'Thanks! I spent a lot of time on the details.',
      time: '10:05 AM',
      isMe: false
    }, {
      id: 6,
      sender: 'Me',
      message: 'It really shows. The color palette is perfect.',
      time: '10:06 AM',
      isMe: true
    }, {
      id: 7,
      sender: 'Alice',
      message: "Let's schedule a meeting to discuss implementation.",
      time: '10:08 AM',
      isMe: false
    }, {
      id: 8,
      sender: 'Me',
      message: 'Sounds good! How about 2 PM?',
      time: '10:09 AM',
      isMe: true
    }, {
      id: 9,
      sender: 'Alice',
      message: 'Perfect, see you then!',
      time: '10:10 AM',
      isMe: false
    }, {
      id: 10,
      sender: 'Me',
      message: "Great, I'll send a calendar invite.",
      time: '10:11 AM',
      isMe: true
    }, {
      id: 11,
      sender: 'Alice',
      message: 'By the way, have you checked the latest analytics?',
      time: '10:15 AM',
      isMe: false
    }, {
      id: 12,
      sender: 'Me',
      message: 'Not yet, anything interesting?',
      time: '10:16 AM',
      isMe: true
    }, {
      id: 13,
      sender: 'Alice',
      message: 'User engagement is up 25% this month!',
      time: '10:17 AM',
      isMe: false
    }, {
      id: 14,
      sender: 'Me',
      message: "That's fantastic news!",
      time: '10:18 AM',
      isMe: true
    }];
    return <div className="mdt-w-80 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background">
        <div className="mdt-border-b mdt-border-border mdt-p-3">
          <h4 className="mdt-font-semibold">Chat with Alice</h4>
          <p className="mdt-text-xs mdt-text-muted-foreground">Online</p>
        </div>
        <ScrollArea className="mdt-h-80">
          <div className="mdt-space-y-4 mdt-p-4">
            {messages.map(msg => <div key={msg.id} className={\`mdt-flex \${msg.isMe ? 'mdt-justify-end' : 'mdt-justify-start'}\`}>
                <div className={\`mdt-max-w-[70%] mdt-rounded-lg mdt-px-3 mdt-py-2 \${msg.isMe ? 'mdt-bg-primary mdt-text-primary-foreground' : 'mdt-bg-muted mdt-text-foreground'}\`}>
                  <p className="mdt-text-sm">{msg.message}</p>
                  <p className={\`mdt-mt-1 mdt-text-xs \${msg.isMe ? 'mdt-text-primary-foreground/70' : 'mdt-text-muted-foreground'}\`}>
                    {msg.time}
                  </p>
                </div>
              </div>)}
          </div>
        </ScrollArea>
      </div>;
  }
}`,...(Te=(_e=L.parameters)==null?void 0:_e.docs)==null?void 0:Te.source},description:{story:"Scroll area with chat messages example.",...(Ee=(Re=L.parameters)==null?void 0:Re.docs)==null?void 0:Ee.description}}};var Ie,ke,De,Le,ze;z.parameters={...z.parameters,docs:{...(Ie=z.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
  render: () => {
    const menuItems = [{
      section: 'Getting Started',
      items: ['Introduction', 'Installation', 'Quick Start']
    }, {
      section: 'Components',
      items: ['Button', 'Input', 'Select', 'Checkbox', 'Radio', 'Switch', 'Tabs', 'Dialog', 'Popover', 'Tooltip']
    }, {
      section: 'Layout',
      items: ['Container', 'Grid', 'Flex', 'Stack', 'Separator', 'ScrollArea', 'Resizable']
    }, {
      section: 'Forms',
      items: ['Form', 'FormField', 'FormLabel', 'FormMessage', 'Validation']
    }, {
      section: 'Advanced',
      items: ['Theming', 'Dark Mode', 'Customization', 'TypeScript', 'Testing']
    }];
    return <ScrollArea className="mdt-h-80 mdt-w-64 mdt-rounded-md mdt-border mdt-border-border mdt-bg-background">
        <div className="mdt-p-4">
          {menuItems.map(menu => <div key={menu.section} className="mdt-mb-4">
              <h4 className="mdt-mb-2 mdt-text-sm mdt-font-semibold mdt-text-foreground">
                {menu.section}
              </h4>
              <div className="mdt-space-y-1">
                {menu.items.map(item => <div key={item} className="mdt-cursor-pointer mdt-rounded-md mdt-px-2 mdt-py-1.5 mdt-text-sm mdt-text-muted-foreground hover:mdt-bg-muted hover:mdt-text-foreground">
                    {item}
                  </div>)}
              </div>
            </div>)}
        </div>
      </ScrollArea>;
  }
}`,...(De=(ke=z.parameters)==null?void 0:ke.docs)==null?void 0:De.source},description:{story:"Scroll area with a menu list.",...(ze=(Le=z.parameters)==null?void 0:Le.docs)==null?void 0:ze.description}}};var Be,Ve,$e,He,We;B.parameters={...B.parameters,docs:{...(Be=B.parameters)==null?void 0:Be.docs,source:{originalSource:`{
  render: () => <ScrollArea className="mdt-h-64 mdt-w-96 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-zinc-950">
      <div className="mdt-p-4 mdt-font-mono mdt-text-sm">
        <pre className="mdt-text-zinc-100">
          {\`import { ScrollArea } from '@/components';

function App() {
  const items = Array.from({ length: 50 })
    .map((_, i) => \\\`Item \\\${i + 1}\\\`);

  return (
    <ScrollArea className="h-72 w-48">
      <div className="p-4">
        {items.map((item) => (
          <div key={item} className="py-2">
            {item}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default App;\`}
        </pre>
      </div>
    </ScrollArea>
}`,...($e=(Ve=B.parameters)==null?void 0:Ve.docs)==null?void 0:$e.source},description:{story:"Code block with scroll.",...(We=(He=B.parameters)==null?void 0:He.docs)==null?void 0:We.description}}};var Fe,Oe,Ue,Ye,qe;V.parameters={...V.parameters,docs:{...(Fe=V.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  render: () => {
    const cards = [{
      title: 'Project Alpha',
      description: 'A revolutionary new approach to data processing',
      status: 'Active'
    }, {
      title: 'Project Beta',
      description: 'Machine learning pipeline optimization',
      status: 'In Progress'
    }, {
      title: 'Project Gamma',
      description: 'Real-time analytics dashboard',
      status: 'Completed'
    }, {
      title: 'Project Delta',
      description: 'Cloud infrastructure migration',
      status: 'Planning'
    }, {
      title: 'Project Epsilon',
      description: 'Mobile app redesign initiative',
      status: 'Active'
    }, {
      title: 'Project Zeta',
      description: 'Security audit and improvements',
      status: 'In Progress'
    }, {
      title: 'Project Eta',
      description: 'Performance optimization sprint',
      status: 'Completed'
    }, {
      title: 'Project Theta',
      description: 'API versioning and documentation',
      status: 'Planning'
    }];
    const statusColors: Record<string, string> = {
      Active: 'mdt-bg-success mdt-text-success-foreground',
      'In Progress': 'mdt-bg-warning mdt-text-warning-foreground',
      Completed: 'mdt-bg-primary mdt-text-primary-foreground',
      Planning: 'mdt-bg-muted mdt-text-muted-foreground'
    };
    return <ScrollArea className="mdt-h-80 mdt-w-80">
        <div className="mdt-space-y-3 mdt-pr-4">
          {cards.map(card => <div key={card.title} className="mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background mdt-p-4">
              <div className="mdt-flex mdt-items-start mdt-justify-between">
                <h4 className="mdt-font-semibold">{card.title}</h4>
                <span className={\`mdt-rounded-full mdt-px-2 mdt-py-0.5 mdt-text-xs \${statusColors[card.status] ?? ''}\`}>
                  {card.status}
                </span>
              </div>
              <p className="mdt-mt-2 mdt-text-sm mdt-text-muted-foreground">{card.description}</p>
            </div>)}
        </div>
      </ScrollArea>;
  }
}`,...(Ue=(Oe=V.parameters)==null?void 0:Oe.docs)==null?void 0:Ue.source},description:{story:"Card list with scroll.",...(qe=(Ye=V.parameters)==null?void 0:Ye.docs)==null?void 0:qe.description}}};var Xe,Ge,Qe,Ze,Je;$.parameters={...$.parameters,docs:{...(Xe=$.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
  render: () => {
    const images = Array.from({
      length: 10
    }).map((_, i) => ({
      id: i + 1,
      title: \`Image \${String(i + 1)}\`,
      aspectRatio: i % 2 === 0 ? 'portrait' : 'landscape'
    }));
    return <ScrollArea className="mdt-w-full mdt-max-w-2xl mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background">
        <div className="mdt-flex mdt-gap-4 mdt-p-4">
          {images.map(image => <div key={image.id} className={\`mdt-shrink-0 \${image.aspectRatio === 'portrait' ? 'mdt-w-32' : 'mdt-w-48'}\`}>
              <div className={\`mdt-flex mdt-items-center mdt-justify-center mdt-rounded-lg mdt-bg-gradient-to-br mdt-from-primary/20 mdt-to-primary/5 \${image.aspectRatio === 'portrait' ? 'mdt-h-48' : 'mdt-h-32'}\`}>
                <span className="mdt-text-2xl mdt-font-bold mdt-text-primary">{image.id}</span>
              </div>
              <p className="mdt-mt-2 mdt-text-center mdt-text-sm mdt-text-muted-foreground">
                {image.title}
              </p>
            </div>)}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>;
  }
}`,...(Qe=(Ge=$.parameters)==null?void 0:Ge.docs)==null?void 0:Qe.source},description:{story:"Image gallery with horizontal scroll.",...(Je=(Ze=$.parameters)==null?void 0:Ze.docs)==null?void 0:Je.description}}};var Ke,et,tt,rt,ot;H.parameters={...H.parameters,docs:{...(Ke=H.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  render: () => {
    const data = Array.from({
      length: 20
    }).map((_, i) => ({
      id: i + 1,
      name: \`User \${String(i + 1)}\`,
      email: \`user\${String(i + 1)}@example.com\`,
      role: ['Admin', 'Editor', 'Viewer'][i % 3],
      status: ['Active', 'Inactive', 'Pending'][i % 3]
    }));
    return <ScrollArea className="mdt-h-80 mdt-w-full mdt-max-w-lg mdt-rounded-lg mdt-border mdt-border-border">
        <table className="mdt-w-full">
          <thead className="mdt-sticky mdt-top-0 mdt-bg-muted">
            <tr>
              <th className="mdt-px-4 mdt-py-3 mdt-text-left mdt-text-sm mdt-font-medium">ID</th>
              <th className="mdt-px-4 mdt-py-3 mdt-text-left mdt-text-sm mdt-font-medium">Name</th>
              <th className="mdt-px-4 mdt-py-3 mdt-text-left mdt-text-sm mdt-font-medium">Role</th>
              <th className="mdt-px-4 mdt-py-3 mdt-text-left mdt-text-sm mdt-font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => <tr key={row.id} className="mdt-border-t mdt-border-border">
                <td className="mdt-px-4 mdt-py-3 mdt-text-sm">{row.id}</td>
                <td className="mdt-px-4 mdt-py-3 mdt-text-sm">{row.name}</td>
                <td className="mdt-px-4 mdt-py-3 mdt-text-sm">{row.role}</td>
                <td className="mdt-px-4 mdt-py-3 mdt-text-sm">
                  <span className={\`mdt-rounded-full mdt-px-2 mdt-py-0.5 mdt-text-xs \${row.status === 'Active' ? 'mdt-bg-green-80 mdt-text-white' : row.status === 'Inactive' ? 'mdt-bg-red-80 mdt-text-white' : 'mdt-bg-orange-80 mdt-text-white'}\`}>
                    {row.status}
                  </span>
                </td>
              </tr>)}
          </tbody>
        </table>
      </ScrollArea>;
  }
}`,...(tt=(et=H.parameters)==null?void 0:et.docs)==null?void 0:tt.source},description:{story:"Table with scroll.",...(ot=(rt=H.parameters)==null?void 0:rt.docs)==null?void 0:ot.description}}};const Kt=["Default","Horizontal","BothDirections","AlwaysVisible","ChatMessages","MenuList","CodeBlock","CardList","ImageGallery","TableWithScroll"];export{D as AlwaysVisible,k as BothDirections,V as CardList,L as ChatMessages,B as CodeBlock,E as Default,I as Horizontal,$ as ImageGallery,z as MenuList,H as TableWithScroll,Kt as __namedExportsOrder,Jt as default};
//# sourceMappingURL=ScrollArea.stories-AI-3VUUj.js.map
