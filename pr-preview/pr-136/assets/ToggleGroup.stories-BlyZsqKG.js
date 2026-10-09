import{a as c,j as e,r as p}from"./iframe-3aDErp2w.js";import{c as pa}from"./index-jcio3iBc.js";import{P}from"./index-8OhScVVJ.js";import{c as la,I as ha,R as Aa}from"./index-D48r5OER.js";import{T as fa}from"./index-Z5p_vffC.js";import{u as ta}from"./index-XhlMewt2.js";import{u as va}from"./index-ZBJj9nSI.js";import{c as na}from"./index-ChEho857.js";import{c as ra}from"./index-CcRgbaMz.js";import"./index-DXf-30mB.js";import{I as l}from"./Icon-y-zWa_Ic.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CVGdmYF-.js";import"./index-DEcWuuwm.js";import"./index-CiUzL2Uf.js";import"./index-DeeK0HxR.js";import"./index-Cl-6LPMW.js";import"./index-CfC0RBm5.js";var A="ToggleGroup",[ia]=pa(A,[la]),oa=la(),M=c.forwardRef((n,r)=>{const{type:i,...d}=n;if(i==="single"){const s=d;return e.jsx(xa,{...s,ref:r})}if(i==="multiple"){const s=d;return e.jsx(ba,{...s,ref:r})}throw new Error(`Missing prop \`type\` expected on \`${A}\``)});M.displayName=A;var[da,sa]=ia(A),xa=c.forwardRef((n,r)=>{const{value:i,defaultValue:d,onValueChange:s=()=>{},...u}=n,[m,g]=ta({prop:i,defaultProp:d??"",onChange:s,caller:A});return e.jsx(da,{scope:n.__scopeToggleGroup,type:"single",value:c.useMemo(()=>m?[m]:[],[m]),onItemActivate:g,onItemDeactivate:c.useCallback(()=>g(""),[g]),children:e.jsx(ua,{...u,ref:r})})}),ba=c.forwardRef((n,r)=>{const{value:i,defaultValue:d,onValueChange:s=()=>{},...u}=n,[m,g]=ta({prop:i,defaultProp:d??[],onChange:s,caller:A}),h=c.useCallback(f=>g((v=[])=>[...v,f]),[g]),z=c.useCallback(f=>g((v=[])=>v.filter(ca=>ca!==f)),[g]);return e.jsx(da,{scope:n.__scopeToggleGroup,type:"multiple",value:m,onItemActivate:h,onItemDeactivate:z,children:e.jsx(ua,{...u,ref:r})})});M.displayName=A;var[Ta,Ga]=ia(A),ua=c.forwardRef((n,r)=>{const{__scopeToggleGroup:i,disabled:d=!1,rovingFocus:s=!0,orientation:u,dir:m,loop:g=!0,...h}=n,z=oa(i),f=va(m),v={role:"group",dir:f,...h};return e.jsx(Ta,{scope:i,rovingFocus:s,disabled:d,children:s?e.jsx(Aa,{asChild:!0,...z,orientation:u,dir:f,loop:g,children:e.jsx(P.div,{...v,ref:r})}):e.jsx(P.div,{...v,ref:r})})}),E="ToggleGroupItem",ma=c.forwardRef((n,r)=>{const i=sa(E,n.__scopeToggleGroup),d=Ga(E,n.__scopeToggleGroup),s=oa(n.__scopeToggleGroup),u=i.value.includes(n.value),m=d.disabled||n.disabled,g={...n,pressed:u,disabled:m},h=c.useRef(null);return d.rovingFocus?e.jsx(ha,{asChild:!0,...s,focusable:!m,active:u,ref:h,children:e.jsx(q,{...g,ref:r})}):e.jsx(q,{...g,ref:r})});ma.displayName=E;var q=c.forwardRef((n,r)=>{const{__scopeToggleGroup:i,value:d,...s}=n,u=sa(E,i),m={role:"radio","aria-checked":n.pressed,"aria-pressed":void 0},g=u.type==="single"?m:void 0;return e.jsx(fa,{...g,...s,ref:r,onPressedChange:h=>{h?u.onItemActivate(d):u.onItemDeactivate(d)}})}),Ia=M,ja=ma;function t(){var n="/home/runner/work/nextgen-design-system/nextgen-design-system/src/components/ToggleGroup/ToggleGroup.tsx",r="87dc9e66f5fe539bbfbfa87a4b1c24f4a9efd874",i=globalThis,d="__coverage__",s={path:"/home/runner/work/nextgen-design-system/nextgen-design-system/src/components/ToggleGroup/ToggleGroup.tsx",statementMap:{0:{start:{line:7,column:27},end:{line:10,column:2}},1:{start:{line:11,column:35},end:{line:53,column:1}},2:{start:{line:54,column:39},end:{line:103,column:1}},3:{start:{line:104,column:20},end:{line:134,column:1}},4:{start:{line:114,column:25},end:{line:114,column:76}},5:{start:{line:114,column:40},end:{line:114,column:57}},6:{start:{line:115,column:4},end:{line:132,column:9}},7:{start:{line:135,column:0},end:{line:135,column:40}},8:{start:{line:136,column:24},end:{line:153,column:2}},9:{start:{line:137,column:18},end:{line:137,column:48}},10:{start:{line:138,column:2},end:{line:152,column:4}},11:{start:{line:154,column:0},end:{line:154,column:48}},12:{start:{line:156,column:0},end:{line:162,column:50}},13:{start:{line:158,column:4},end:{line:158,column:60}},14:{start:{line:160,column:4},end:{line:160,column:1161}},15:{start:{line:162,column:50},end:{line:168,column:50}},16:{start:{line:164,column:4},end:{line:164,column:68}},17:{start:{line:166,column:4},end:{line:166,column:955}},18:{start:{line:168,column:50},end:{line:174,column:50}},19:{start:{line:170,column:4},end:{line:170,column:44}},20:{start:{line:172,column:4},end:{line:172,column:2174}},21:{start:{line:174,column:50},end:{line:180,column:50}},22:{start:{line:176,column:4},end:{line:176,column:52}},23:{start:{line:178,column:4},end:{line:178,column:924}}},fnMap:{0:{name:"(anonymous_0)",decl:{start:{line:105,column:2},end:{line:105,column:3}},loc:{start:{line:113,column:13},end:{line:133,column:3}},line:113},1:{name:"(anonymous_1)",decl:{start:{line:114,column:33},end:{line:114,column:34}},loc:{start:{line:114,column:40},end:{line:114,column:57}},line:114},2:{name:"(anonymous_2)",decl:{start:{line:136,column:35},end:{line:136,column:36}},loc:{start:{line:136,column:94},end:{line:153,column:1}},line:136}},branchMap:{0:{loc:{start:{line:107,column:4},end:{line:107,column:23}},type:"default-arg",locations:[{start:{line:107,column:14},end:{line:107,column:23}}],line:107},1:{loc:{start:{line:108,column:4},end:{line:108,column:15}},type:"default-arg",locations:[{start:{line:108,column:11},end:{line:108,column:15}}],line:108},2:{loc:{start:{line:109,column:4},end:{line:109,column:30}},type:"default-arg",locations:[{start:{line:109,column:18},end:{line:109,column:30}}],line:109},3:{loc:{start:{line:110,column:4},end:{line:110,column:21}},type:"default-arg",locations:[{start:{line:110,column:16},end:{line:110,column:21}}],line:110},4:{loc:{start:{line:144,column:19},end:{line:144,column:45}},type:"binary-expr",locations:[{start:{line:144,column:19},end:{line:144,column:26}},{start:{line:144,column:30},end:{line:144,column:45}}],line:144},5:{loc:{start:{line:145,column:16},end:{line:145,column:36}},type:"binary-expr",locations:[{start:{line:145,column:16},end:{line:145,column:20}},{start:{line:145,column:24},end:{line:145,column:36}}],line:145}},s:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0,21:0,22:0,23:0},f:{0:0,1:0,2:0},b:{0:[0],1:[0],2:[0],3:[0],4:[0,0],5:[0,0]},inputSourceMap:{version:3,file:null,sources:["/home/runner/work/nextgen-design-system/nextgen-design-system/src/components/ToggleGroup/ToggleGroup.tsx"],names:[],mappings:";AAwLQ;AAtLR;AACA;AACA;AACA;AAUA;AAAkE;AACvD;AAEX;AAKO;AAA4B;AAAA;AAEiB;AAClD;AACY;AAAA;AAAA;AAAA;AAIC;AACE;AACA;AACX;AAAA;AAAA;AAAA;AAIa;AACC;AACF;AACZ;AAAA;AAAA;AAAA;AAIM;AACA;AACA;AACA;AACN;AAAA;AAAA;AAAA;AAIW;AACH;AACC;AACT;AACF;AACiB;AACN;AACI;AACP;AACK;AACb;AAEJ;AAKO;AAAgC;AAAA;AAErC;AACE;AACA;AACA;AACA;AACA;AACA;AACF;AACA;AACY;AAAA;AAAA;AAAA;AAIC;AACE;AACP;AACA;AACA;AACF;AACS;AACP;AACA;AACA;AACF;AACF;AAAA;AAAA;AAAA;AAIM;AACA;AACA;AACA;AACN;AAAA;AAAA;AAAA;AAIW;AACH;AACC;AACT;AACF;AACiB;AACN;AACH;AACK;AACb;AAEJ;AA4CA;AAAoB;AAKhB;AACE;AACU;AACH;AACO;AACF;AACZ;AACG;AAKL;AAEA;AAEI;AAAsB;AAArB;AACC;AACA;AACW;AACW;AAClB;AACA;AACA;AACA;AACD;AACD;AACF;AACI;AAEH;AAAA;AAEL;AAGN;AAEA;AAqBA;AAIE;AAEA;AACE;AAAsB;AAArB;AACC;AACW;AACe;AACM;AACN;AACvB;AACD;AACF;AACI;AAEH;AAAA;AAGP;AAEA;AAEA;;;;;;;;;;;;;;;;;;;;;;;;;"},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"87dc9e66f5fe539bbfbfa87a4b1c24f4a9efd874"},u=i[d]||(i[d]={});(!u[n]||u[n].hash!==r)&&(u[n]=s);var m=u[n];return t=function(){return m},m}t();const ga=(t().s[0]++,p.createContext({variant:"default",size:"md"})),D=(t().s[1]++,na(["mdt-inline-flex mdt-items-center mdt-rounded-md"],{variants:{variant:{default:"mdt-bg-muted mdt-p-1",outline:"mdt-border mdt-border-input mdt-bg-transparent mdt-p-1"},orientation:{horizontal:"mdt-flex-row",vertical:"mdt-flex-col"},size:{sm:"mdt-gap-0.5",md:"mdt-gap-1",lg:"mdt-gap-1"},fullWidth:{true:"mdt-w-full",false:""}},defaultVariants:{variant:"default",orientation:"horizontal",size:"md",fullWidth:!1}})),W=(t().s[2]++,na(["mdt-inline-flex mdt-items-center mdt-justify-center","mdt-rounded-sm mdt-font-medium","mdt-transition-all","focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-2","disabled:mdt-pointer-events-none disabled:mdt-opacity-50","[&_svg]:mdt-pointer-events-none [&_svg]:mdt-shrink-0"],{variants:{variant:{default:["mdt-bg-transparent mdt-text-muted-foreground","hover:mdt-bg-background/60 hover:mdt-text-foreground","data-[state=on]:mdt-bg-background data-[state=on]:mdt-text-foreground data-[state=on]:mdt-shadow-sm"],outline:["mdt-bg-transparent mdt-text-muted-foreground","hover:mdt-bg-muted hover:mdt-text-foreground","data-[state=on]:mdt-bg-primary data-[state=on]:mdt-text-primary-foreground"]},size:{sm:"mdt-h-7 mdt-min-w-7 mdt-gap-1 mdt-px-2 mdt-text-xs [&_svg]:mdt-h-3.5 [&_svg]:mdt-w-3.5",md:"mdt-h-8 mdt-min-w-8 mdt-gap-1.5 mdt-px-3 mdt-text-sm [&_svg]:mdt-h-4 [&_svg]:mdt-w-4",lg:"mdt-h-10 mdt-min-w-10 mdt-gap-2 mdt-px-4 mdt-text-base [&_svg]:mdt-h-5 [&_svg]:mdt-w-5"},fullWidth:{true:"mdt-flex-1",false:""}},defaultVariants:{variant:"default",size:"md",fullWidth:!1}})),o=(t().s[3]++,p.forwardRef(({className:n,variant:r=(t().b[0][0]++,"default"),size:i=(t().b[1][0]++,"md"),orientation:d=(t().b[2][0]++,"horizontal"),fullWidth:s=(t().b[3][0]++,!1),children:u,...m},g)=>{t().f[0]++;const h=(t().s[4]++,p.useMemo(()=>(t().f[1]++,t().s[5]++,{variant:r,size:i}),[r,i]));return t().s[6]++,e.jsx(ga.Provider,{value:h,children:e.jsx(Ia,{ref:g,orientation:d,className:ra(D({variant:r,orientation:d,size:i,fullWidth:s}),n),...m,children:u})})}));t().s[7]++;o.displayName="ToggleGroup";const a=(t().s[8]++,p.forwardRef(({className:n,variant:r,size:i,children:d,...s},u)=>{t().f[2]++;const m=(t().s[9]++,p.useContext(ga));return t().s[10]++,e.jsx(ja,{ref:u,className:ra(W({variant:(t().b[4][0]++,r??(t().b[4][1]++,m.variant)),size:(t().b[5][0]++,i??(t().b[5][1]++,m.size))}),n),...s,children:d})}));t().s[11]++;a.displayName="ToggleGroupItem";t().s[12]++;try{t().s[13]++,D.displayName="toggleGroupVariants",t().s[14]++,D.__docgenInfo={description:"ToggleGroup container variants using Class Variance Authority (CVA)",displayName:"toggleGroupVariants",props:{variant:{defaultValue:{value:"default"},description:"Visual style variant",name:"variant",required:!1,type:{name:'"outline" | "default" | null'}},orientation:{defaultValue:{value:"horizontal"},description:"Orientation of the group",name:"orientation",required:!1,type:{name:'"horizontal" | "vertical" | null'}},size:{defaultValue:{value:"md"},description:"Size variant",name:"size",required:!1,type:{name:'"sm" | "md" | "lg" | null'}},fullWidth:{defaultValue:{value:"false"},description:"Full width modifier",name:"fullWidth",required:!1,type:{name:"boolean | null"}},class:{defaultValue:null,description:"",name:"class",required:!1,type:{name:"ClassValue"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"ClassValue"}}}}}catch{}t().s[15]++;try{t().s[16]++,W.displayName="toggleGroupItemVariants",t().s[17]++,W.__docgenInfo={description:"ToggleGroup item variants using Class Variance Authority (CVA)",displayName:"toggleGroupItemVariants",props:{variant:{defaultValue:{value:"default"},description:"Visual style variant",name:"variant",required:!1,type:{name:'"outline" | "default" | null'}},size:{defaultValue:{value:"md"},description:"Size variant",name:"size",required:!1,type:{name:'"sm" | "md" | "lg" | null'}},fullWidth:{defaultValue:{value:"false"},description:"Full width item",name:"fullWidth",required:!1,type:{name:"boolean | null"}},class:{defaultValue:null,description:"",name:"class",required:!1,type:{name:"ClassValue"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"ClassValue"}}}}}catch{}t().s[18]++;try{t().s[19]++,o.displayName="ToggleGroup",t().s[20]++,o.__docgenInfo={description:`ToggleGroup component built on Radix UI ToggleGroup primitive.
A set of two-state buttons that can be toggled on or off.

Supports both single and multiple selection modes.`,displayName:"ToggleGroup",props:{type:{defaultValue:null,description:"Type of selection",name:"type",required:!0,type:{name:"enum",value:[{value:'"multiple"'},{value:'"single"'}]}},value:{defaultValue:null,description:`The controlled value of the pressed item
The controlled value of the pressed items`,name:"value",required:!1,type:{name:"string | string[]"}},defaultValue:{defaultValue:null,description:`The default value of the pressed item (uncontrolled)
The default value of the pressed items (uncontrolled)`,name:"defaultValue",required:!1,type:{name:"string | string[]"}},onValueChange:{defaultValue:null,description:"Callback when the value changes",name:"onValueChange",required:!1,type:{name:"((value: string) => void) | ((value: string[]) => void)"}},asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},variant:{defaultValue:{value:"default"},description:"Visual style variant",name:"variant",required:!1,type:{name:"enum",value:[{value:'"outline"'},{value:'"default"'}]}},size:{defaultValue:{value:"md"},description:"Size of the toggle items",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},orientation:{defaultValue:{value:"horizontal"},description:"Orientation of the toggle group",name:"orientation",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}},fullWidth:{defaultValue:{value:"false"},description:"Whether the toggle group should take full width",name:"fullWidth",required:!1,type:{name:"boolean"}}}}}catch{}t().s[21]++;try{t().s[22]++,a.displayName="ToggleGroupItem",t().s[23]++,a.__docgenInfo={description:"ToggleGroupItem - individual toggle button within a ToggleGroup.",displayName:"ToggleGroupItem",props:{value:{defaultValue:null,description:"The unique value for this item",name:"value",required:!0,type:{name:"string"}},variant:{defaultValue:{value:"default"},description:"Visual style variant (overrides parent)",name:"variant",required:!1,type:{name:"enum",value:[{value:'"outline"'},{value:'"default"'}]}},size:{defaultValue:{value:"md"},description:"Size variant (overrides parent)",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}const Ba={title:"Components/ToggleGroup",component:o,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A set of two-state buttons that can be toggled on or off. Supports single and multiple selection modes with various visual variants."}},controls:{exclude:["class"]}},argTypes:{type:{control:"select",options:["single","multiple"],description:"Selection mode - single or multiple items",table:{defaultValue:{summary:"single"},type:{summary:"'single' | 'multiple'"}}},variant:{control:"select",options:["default","outline"],description:"Visual style variant",table:{defaultValue:{summary:"default"}}},size:{control:"select",options:["sm","md","lg"],description:"Size of the toggle items",table:{defaultValue:{summary:"md"}}},orientation:{control:"select",options:["horizontal","vertical"],description:"Orientation of the toggle group",table:{defaultValue:{summary:"horizontal"}}},fullWidth:{control:"boolean",description:"Whether the toggle group should take full width",table:{defaultValue:{summary:"false"}}},disabled:{control:"boolean",description:"Whether the toggle group is disabled",table:{defaultValue:{summary:"false"}}},className:{control:"text",description:"Additional CSS classes to apply",table:{type:{summary:"string"}}}}},x={render:()=>e.jsxs(o,{type:"single",defaultValue:"center",children:[e.jsx(a,{value:"left","aria-label":"Align left",children:e.jsx(l,{name:"align-left","aria-hidden":!0})}),e.jsx(a,{value:"center","aria-label":"Align center",children:e.jsx(l,{name:"align-center","aria-hidden":!0})}),e.jsx(a,{value:"right","aria-label":"Align right",children:e.jsx(l,{name:"align-right","aria-hidden":!0})})]})},b={render:()=>e.jsxs(o,{type:"multiple",defaultValue:["bold"],children:[e.jsx(a,{value:"bold","aria-label":"Toggle bold",children:e.jsx(l,{name:"bold","aria-hidden":!0})}),e.jsx(a,{value:"italic","aria-label":"Toggle italic",children:e.jsx(l,{name:"italic","aria-hidden":!0})}),e.jsx(a,{value:"underline","aria-label":"Toggle underline",children:e.jsx(l,{name:"underline","aria-hidden":!0})}),e.jsx(a,{value:"strikethrough","aria-label":"Toggle strikethrough",children:e.jsx(l,{name:"strikethrough","aria-hidden":!0})})]})},T={render:()=>e.jsxs(o,{type:"single",variant:"outline",defaultValue:"list",children:[e.jsx(a,{value:"list","aria-label":"List view",children:e.jsx(l,{name:"list","aria-hidden":!0})}),e.jsx(a,{value:"grid","aria-label":"Grid view",children:e.jsx(l,{name:"layout-grid","aria-hidden":!0})}),e.jsx(a,{value:"kanban","aria-label":"Kanban view",children:e.jsx(l,{name:"kanban","aria-hidden":!0})})]})},G={render:()=>e.jsxs(o,{type:"single",defaultValue:"week",children:[e.jsx(a,{value:"day",children:"Day"}),e.jsx(a,{value:"week",children:"Week"}),e.jsx(a,{value:"month",children:"Month"}),e.jsx(a,{value:"year",children:"Year"})]})},I={render:()=>e.jsxs(o,{type:"single",variant:"outline",defaultValue:"grid",children:[e.jsxs(a,{value:"list",children:[e.jsx(l,{name:"list","aria-hidden":!0}),"List"]}),e.jsxs(a,{value:"grid",children:[e.jsx(l,{name:"layout-grid","aria-hidden":!0}),"Grid"]})]})},j={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-start mdt-gap-4",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-1",children:[e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Small"}),e.jsxs(o,{type:"single",size:"sm",defaultValue:"center",children:[e.jsx(a,{value:"left","aria-label":"Align left",children:e.jsx(l,{name:"align-left","aria-hidden":!0})}),e.jsx(a,{value:"center","aria-label":"Align center",children:e.jsx(l,{name:"align-center","aria-hidden":!0})}),e.jsx(a,{value:"right","aria-label":"Align right",children:e.jsx(l,{name:"align-right","aria-hidden":!0})})]})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-1",children:[e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Medium (default)"}),e.jsxs(o,{type:"single",size:"md",defaultValue:"center",children:[e.jsx(a,{value:"left","aria-label":"Align left",children:e.jsx(l,{name:"align-left","aria-hidden":!0})}),e.jsx(a,{value:"center","aria-label":"Align center",children:e.jsx(l,{name:"align-center","aria-hidden":!0})}),e.jsx(a,{value:"right","aria-label":"Align right",children:e.jsx(l,{name:"align-right","aria-hidden":!0})})]})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-1",children:[e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Large"}),e.jsxs(o,{type:"single",size:"lg",defaultValue:"center",children:[e.jsx(a,{value:"left","aria-label":"Align left",children:e.jsx(l,{name:"align-left","aria-hidden":!0})}),e.jsx(a,{value:"center","aria-label":"Align center",children:e.jsx(l,{name:"align-center","aria-hidden":!0})}),e.jsx(a,{value:"right","aria-label":"Align right",children:e.jsx(l,{name:"align-right","aria-hidden":!0})})]})]})]})},y={render:()=>e.jsxs("div",{className:"mdt-flex mdt-gap-8",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-1",children:[e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Default"}),e.jsxs(o,{type:"single",orientation:"vertical",defaultValue:"inbox",children:[e.jsx(a,{value:"inbox","aria-label":"Inbox",children:e.jsx(l,{name:"inbox","aria-hidden":!0})}),e.jsx(a,{value:"drafts","aria-label":"Drafts",children:e.jsx(l,{name:"file-text","aria-hidden":!0})}),e.jsx(a,{value:"sent","aria-label":"Sent",children:e.jsx(l,{name:"send","aria-hidden":!0})}),e.jsx(a,{value:"archive","aria-label":"Archive",children:e.jsx(l,{name:"archive","aria-hidden":!0})})]})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-1",children:[e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Outline"}),e.jsxs(o,{type:"single",orientation:"vertical",variant:"outline",defaultValue:"inbox",children:[e.jsx(a,{value:"inbox","aria-label":"Inbox",children:e.jsx(l,{name:"inbox","aria-hidden":!0})}),e.jsx(a,{value:"drafts","aria-label":"Drafts",children:e.jsx(l,{name:"file-text","aria-hidden":!0})}),e.jsx(a,{value:"sent","aria-label":"Sent",children:e.jsx(l,{name:"send","aria-hidden":!0})}),e.jsx(a,{value:"archive","aria-label":"Archive",children:e.jsx(l,{name:"archive","aria-hidden":!0})})]})]})]})},C={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-1",children:[e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Entire group disabled"}),e.jsxs(o,{type:"single",defaultValue:"center",disabled:!0,children:[e.jsx(a,{value:"left","aria-label":"Align left",children:e.jsx(l,{name:"align-left","aria-hidden":!0})}),e.jsx(a,{value:"center","aria-label":"Align center",children:e.jsx(l,{name:"align-center","aria-hidden":!0})}),e.jsx(a,{value:"right","aria-label":"Align right",children:e.jsx(l,{name:"align-right","aria-hidden":!0})})]})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-1",children:[e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Individual item disabled"}),e.jsxs(o,{type:"single",defaultValue:"left",children:[e.jsx(a,{value:"left","aria-label":"Align left",children:e.jsx(l,{name:"align-left","aria-hidden":!0})}),e.jsx(a,{value:"center","aria-label":"Align center",disabled:!0,children:e.jsx(l,{name:"align-center","aria-hidden":!0})}),e.jsx(a,{value:"right","aria-label":"Align right",children:e.jsx(l,{name:"align-right","aria-hidden":!0})})]})]})]})},V={render:()=>e.jsx("div",{className:"mdt-w-80",children:e.jsxs(o,{type:"single",fullWidth:!0,defaultValue:"weekly",children:[e.jsx(a,{value:"daily",children:"Daily"}),e.jsx(a,{value:"weekly",children:"Weekly"}),e.jsx(a,{value:"monthly",children:"Monthly"})]})})},N={render:function(){const[r,i]=p.useState("center");return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-4",children:[e.jsxs(o,{type:"single",value:r,onValueChange:i,children:[e.jsx(a,{value:"left","aria-label":"Align left",children:e.jsx(l,{name:"align-left","aria-hidden":!0})}),e.jsx(a,{value:"center","aria-label":"Align center",children:e.jsx(l,{name:"align-center","aria-hidden":!0})}),e.jsx(a,{value:"right","aria-label":"Align right",children:e.jsx(l,{name:"align-right","aria-hidden":!0})})]}),e.jsxs("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:["Selected: ",e.jsx("span",{className:"mdt-font-medium mdt-text-foreground",children:r||"none"})]})]})}},w={render:function(){const[r,i]=p.useState(["bold"]);return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-4",children:[e.jsxs(o,{type:"multiple",value:r,onValueChange:i,children:[e.jsx(a,{value:"bold","aria-label":"Toggle bold",children:e.jsx(l,{name:"bold","aria-hidden":!0})}),e.jsx(a,{value:"italic","aria-label":"Toggle italic",children:e.jsx(l,{name:"italic","aria-hidden":!0})}),e.jsx(a,{value:"underline","aria-label":"Toggle underline",children:e.jsx(l,{name:"underline","aria-hidden":!0})})]}),e.jsxs("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:["Selected:"," ",e.jsx("span",{className:"mdt-font-medium mdt-text-foreground",children:r.length>0?r.join(", "):"none"})]})]})}},_={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx("h4",{className:"mdt-text-sm mdt-font-medium mdt-text-foreground",children:"Default Variant"}),e.jsxs("div",{className:"mdt-flex mdt-gap-4",children:[e.jsxs(o,{type:"single",variant:"default",defaultValue:"center",children:[e.jsx(a,{value:"left","aria-label":"Align left",children:e.jsx(l,{name:"align-left","aria-hidden":!0})}),e.jsx(a,{value:"center","aria-label":"Align center",children:e.jsx(l,{name:"align-center","aria-hidden":!0})}),e.jsx(a,{value:"right","aria-label":"Align right",children:e.jsx(l,{name:"align-right","aria-hidden":!0})})]}),e.jsxs(o,{type:"single",variant:"default",defaultValue:"week",children:[e.jsx(a,{value:"day",children:"Day"}),e.jsx(a,{value:"week",children:"Week"}),e.jsx(a,{value:"month",children:"Month"})]})]})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx("h4",{className:"mdt-text-sm mdt-font-medium mdt-text-foreground",children:"Outline Variant"}),e.jsxs("div",{className:"mdt-flex mdt-gap-4",children:[e.jsxs(o,{type:"single",variant:"outline",defaultValue:"center",children:[e.jsx(a,{value:"left","aria-label":"Align left",children:e.jsx(l,{name:"align-left","aria-hidden":!0})}),e.jsx(a,{value:"center","aria-label":"Align center",children:e.jsx(l,{name:"align-center","aria-hidden":!0})}),e.jsx(a,{value:"right","aria-label":"Align right",children:e.jsx(l,{name:"align-right","aria-hidden":!0})})]}),e.jsxs(o,{type:"single",variant:"outline",defaultValue:"week",children:[e.jsx(a,{value:"day",children:"Day"}),e.jsx(a,{value:"week",children:"Week"}),e.jsx(a,{value:"month",children:"Month"})]})]})]})]})},S={render:function(){const[r,i]=p.useState(["bold"]),[d,s]=p.useState("left");return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsx("div",{className:"mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background mdt-p-3",children:e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[e.jsxs(o,{type:"multiple",value:r,onValueChange:i,children:[e.jsx(a,{value:"bold","aria-label":"Toggle bold",children:e.jsx(l,{name:"bold","aria-hidden":!0})}),e.jsx(a,{value:"italic","aria-label":"Toggle italic",children:e.jsx(l,{name:"italic","aria-hidden":!0})}),e.jsx(a,{value:"underline","aria-label":"Toggle underline",children:e.jsx(l,{name:"underline","aria-hidden":!0})})]}),e.jsx("div",{className:"mdt-h-6 mdt-w-px mdt-bg-border"}),e.jsxs(o,{type:"single",value:d,onValueChange:s,children:[e.jsx(a,{value:"left","aria-label":"Align left",children:e.jsx(l,{name:"align-left","aria-hidden":!0})}),e.jsx(a,{value:"center","aria-label":"Align center",children:e.jsx(l,{name:"align-center","aria-hidden":!0})}),e.jsx(a,{value:"right","aria-label":"Align right",children:e.jsx(l,{name:"align-right","aria-hidden":!0})}),e.jsx(a,{value:"justify","aria-label":"Justify",children:e.jsx(l,{name:"align-justify","aria-hidden":!0})})]})]})}),e.jsxs("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:["Formatting: ",r.length>0?r.join(", "):"none"," | Alignment:"," ",d]})]})}},k={render:function(){const[r,i]=p.useState("grid");return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-justify-between mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background mdt-p-4",children:[e.jsx("span",{className:"mdt-text-sm mdt-font-medium mdt-text-foreground",children:"Projects"}),e.jsxs(o,{type:"single",variant:"outline",value:r,onValueChange:i,children:[e.jsx(a,{value:"list","aria-label":"List view",children:e.jsx(l,{name:"list","aria-hidden":!0})}),e.jsx(a,{value:"grid","aria-label":"Grid view",children:e.jsx(l,{name:"layout-grid","aria-hidden":!0})}),e.jsx(a,{value:"kanban","aria-label":"Kanban view",children:e.jsx(l,{name:"kanban","aria-hidden":!0})})]})]}),e.jsxs("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:["Current view: ",r]})]})}};var F,O,R,B,L;x.parameters={...x.parameters,docs:{...(F=x.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left">
        <Icon name="align-left" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <Icon name="align-center" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <Icon name="align-right" aria-hidden />
      </ToggleGroupItem>
    </ToggleGroup>
}`,...(R=(O=x.parameters)==null?void 0:O.docs)==null?void 0:R.source},description:{story:"Default toggle group with icon buttons.",...(L=(B=x.parameters)==null?void 0:B.docs)==null?void 0:L.description}}};var K,H,J,U,Y;b.parameters={...b.parameters,docs:{...(K=b.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <ToggleGroup type="multiple" defaultValue={['bold']}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Icon name="bold" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Icon name="italic" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Icon name="underline" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <Icon name="strikethrough" aria-hidden />
      </ToggleGroupItem>
    </ToggleGroup>
}`,...(J=(H=b.parameters)==null?void 0:H.docs)==null?void 0:J.source},description:{story:"Multiple selection mode allows selecting multiple items.",...(Y=(U=b.parameters)==null?void 0:U.docs)==null?void 0:Y.description}}};var $,X,Z,Q,ee;T.parameters={...T.parameters,docs:{...($=T.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <ToggleGroup type="single" variant="outline" defaultValue="list">
      <ToggleGroupItem value="list" aria-label="List view">
        <Icon name="list" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <Icon name="layout-grid" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="kanban" aria-label="Kanban view">
        <Icon name="kanban" aria-hidden />
      </ToggleGroupItem>
    </ToggleGroup>
}`,...(Z=(X=T.parameters)==null?void 0:X.docs)==null?void 0:Z.source},description:{story:"Outline variant with border styling.",...(ee=(Q=T.parameters)==null?void 0:Q.docs)==null?void 0:ee.description}}};var ae,le,te,ne,re;G.parameters={...G.parameters,docs:{...(ae=G.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: () => <ToggleGroup type="single" defaultValue="week">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
      <ToggleGroupItem value="year">Year</ToggleGroupItem>
    </ToggleGroup>
}`,...(te=(le=G.parameters)==null?void 0:le.docs)==null?void 0:te.source},description:{story:"Toggle group with text labels.",...(re=(ne=G.parameters)==null?void 0:ne.docs)==null?void 0:re.description}}};var ie,oe,de,se,ue;I.parameters={...I.parameters,docs:{...(ie=I.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: () => <ToggleGroup type="single" variant="outline" defaultValue="grid">
      <ToggleGroupItem value="list">
        <Icon name="list" aria-hidden />
        List
      </ToggleGroupItem>
      <ToggleGroupItem value="grid">
        <Icon name="layout-grid" aria-hidden />
        Grid
      </ToggleGroupItem>
    </ToggleGroup>
}`,...(de=(oe=I.parameters)==null?void 0:oe.docs)==null?void 0:de.source},description:{story:"Toggle items with both icons and text.",...(ue=(se=I.parameters)==null?void 0:se.docs)==null?void 0:ue.description}}};var me,ge,ce,pe,he;j.parameters={...j.parameters,docs:{...(me=j.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-items-start mdt-gap-4">
      <div className="mdt-flex mdt-flex-col mdt-gap-1">
        <span className="mdt-text-xs mdt-text-muted-foreground">Small</span>
        <ToggleGroup type="single" size="sm" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Align left">
            <Icon name="align-left" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <Icon name="align-center" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <Icon name="align-right" aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-1">
        <span className="mdt-text-xs mdt-text-muted-foreground">Medium (default)</span>
        <ToggleGroup type="single" size="md" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Align left">
            <Icon name="align-left" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <Icon name="align-center" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <Icon name="align-right" aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-1">
        <span className="mdt-text-xs mdt-text-muted-foreground">Large</span>
        <ToggleGroup type="single" size="lg" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Align left">
            <Icon name="align-left" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <Icon name="align-center" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <Icon name="align-right" aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
}`,...(ce=(ge=j.parameters)==null?void 0:ge.docs)==null?void 0:ce.source},description:{story:"All size variants displayed together.",...(he=(pe=j.parameters)==null?void 0:pe.docs)==null?void 0:he.description}}};var Ae,fe,ve,xe,be;y.parameters={...y.parameters,docs:{...(Ae=y.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-gap-8">
      <div className="mdt-flex mdt-flex-col mdt-gap-1">
        <span className="mdt-text-xs mdt-text-muted-foreground">Default</span>
        <ToggleGroup type="single" orientation="vertical" defaultValue="inbox">
          <ToggleGroupItem value="inbox" aria-label="Inbox">
            <Icon name="inbox" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="drafts" aria-label="Drafts">
            <Icon name="file-text" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="sent" aria-label="Sent">
            <Icon name="send" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="archive" aria-label="Archive">
            <Icon name="archive" aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-1">
        <span className="mdt-text-xs mdt-text-muted-foreground">Outline</span>
        <ToggleGroup type="single" orientation="vertical" variant="outline" defaultValue="inbox">
          <ToggleGroupItem value="inbox" aria-label="Inbox">
            <Icon name="inbox" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="drafts" aria-label="Drafts">
            <Icon name="file-text" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="sent" aria-label="Sent">
            <Icon name="send" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="archive" aria-label="Archive">
            <Icon name="archive" aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
}`,...(ve=(fe=y.parameters)==null?void 0:fe.docs)==null?void 0:ve.source},description:{story:"Vertical orientation for stacked toggle buttons.",...(be=(xe=y.parameters)==null?void 0:xe.docs)==null?void 0:be.description}}};var Te,Ge,Ie,je,ye;C.parameters={...C.parameters,docs:{...(Te=C.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <div className="mdt-flex mdt-flex-col mdt-gap-1">
        <span className="mdt-text-xs mdt-text-muted-foreground">Entire group disabled</span>
        <ToggleGroup type="single" defaultValue="center" disabled>
          <ToggleGroupItem value="left" aria-label="Align left">
            <Icon name="align-left" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <Icon name="align-center" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <Icon name="align-right" aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-1">
        <span className="mdt-text-xs mdt-text-muted-foreground">Individual item disabled</span>
        <ToggleGroup type="single" defaultValue="left">
          <ToggleGroupItem value="left" aria-label="Align left">
            <Icon name="align-left" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center" disabled>
            <Icon name="align-center" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <Icon name="align-right" aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
}`,...(Ie=(Ge=C.parameters)==null?void 0:Ge.docs)==null?void 0:Ie.source},description:{story:"Disabled toggle group.",...(ye=(je=C.parameters)==null?void 0:je.docs)==null?void 0:ye.description}}};var Ce,Ve,Ne,we,_e;V.parameters={...V.parameters,docs:{...(Ce=V.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-80">
      <ToggleGroup type="single" fullWidth defaultValue="weekly">
        <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
        <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
        <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
      </ToggleGroup>
    </div>
}`,...(Ne=(Ve=V.parameters)==null?void 0:Ve.docs)==null?void 0:Ne.source},description:{story:"Full width toggle group that spans the container.",...(_e=(we=V.parameters)==null?void 0:we.docs)==null?void 0:_e.description}}};var Se,ke,Ee,ze,De;N.parameters={...N.parameters,docs:{...(Se=N.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  render: function ControlledExample() {
    const [value, setValue] = useState('center');
    return <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-4">
        <ToggleGroup type="single" value={value} onValueChange={setValue}>
          <ToggleGroupItem value="left" aria-label="Align left">
            <Icon name="align-left" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <Icon name="align-center" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <Icon name="align-right" aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="mdt-text-sm mdt-text-muted-foreground">
          Selected: <span className="mdt-font-medium mdt-text-foreground">{value || 'none'}</span>
        </p>
      </div>;
  }
}`,...(Ee=(ke=N.parameters)==null?void 0:ke.docs)==null?void 0:Ee.source},description:{story:"Controlled toggle group with state management.",...(De=(ze=N.parameters)==null?void 0:ze.docs)==null?void 0:De.description}}};var We,Me,Pe,qe,Fe;w.parameters={...w.parameters,docs:{...(We=w.parameters)==null?void 0:We.docs,source:{originalSource:`{
  render: function ControlledMultipleExample() {
    const [values, setValues] = useState<string[]>(['bold']);
    return <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-4">
        <ToggleGroup type="multiple" value={values} onValueChange={setValues}>
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Icon name="bold" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Icon name="italic" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Icon name="underline" aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="mdt-text-sm mdt-text-muted-foreground">
          Selected:{' '}
          <span className="mdt-font-medium mdt-text-foreground">
            {values.length > 0 ? values.join(', ') : 'none'}
          </span>
        </p>
      </div>;
  }
}`,...(Pe=(Me=w.parameters)==null?void 0:Me.docs)==null?void 0:Pe.source},description:{story:"Controlled multiple selection toggle group.",...(Fe=(qe=w.parameters)==null?void 0:qe.docs)==null?void 0:Fe.description}}};var Oe,Re,Be,Le,Ke;_.parameters={..._.parameters,docs:{...(Oe=_.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <h4 className="mdt-text-sm mdt-font-medium mdt-text-foreground">Default Variant</h4>
        <div className="mdt-flex mdt-gap-4">
          <ToggleGroup type="single" variant="default" defaultValue="center">
            <ToggleGroupItem value="left" aria-label="Align left">
              <Icon name="align-left" aria-hidden />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <Icon name="align-center" aria-hidden />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <Icon name="align-right" aria-hidden />
            </ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" variant="default" defaultValue="week">
            <ToggleGroupItem value="day">Day</ToggleGroupItem>
            <ToggleGroupItem value="week">Week</ToggleGroupItem>
            <ToggleGroupItem value="month">Month</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <h4 className="mdt-text-sm mdt-font-medium mdt-text-foreground">Outline Variant</h4>
        <div className="mdt-flex mdt-gap-4">
          <ToggleGroup type="single" variant="outline" defaultValue="center">
            <ToggleGroupItem value="left" aria-label="Align left">
              <Icon name="align-left" aria-hidden />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <Icon name="align-center" aria-hidden />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <Icon name="align-right" aria-hidden />
            </ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" variant="outline" defaultValue="week">
            <ToggleGroupItem value="day">Day</ToggleGroupItem>
            <ToggleGroupItem value="week">Week</ToggleGroupItem>
            <ToggleGroupItem value="month">Month</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
}`,...(Be=(Re=_.parameters)==null?void 0:Re.docs)==null?void 0:Be.source},description:{story:"All variants side by side for comparison.",...(Ke=(Le=_.parameters)==null?void 0:Le.docs)==null?void 0:Ke.description}}};var He,Je,Ue,Ye,$e;S.parameters={...S.parameters,docs:{...(He=S.parameters)==null?void 0:He.docs,source:{originalSource:`{
  render: function TextEditorExample() {
    const [formatting, setFormatting] = useState<string[]>(['bold']);
    const [alignment, setAlignment] = useState('left');
    return <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background mdt-p-3">
          <div className="mdt-flex mdt-items-center mdt-gap-2">
            <ToggleGroup type="multiple" value={formatting} onValueChange={setFormatting}>
              <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Icon name="bold" aria-hidden />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <Icon name="italic" aria-hidden />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Icon name="underline" aria-hidden />
              </ToggleGroupItem>
            </ToggleGroup>

            <div className="mdt-h-6 mdt-w-px mdt-bg-border" />

            <ToggleGroup type="single" value={alignment} onValueChange={setAlignment}>
              <ToggleGroupItem value="left" aria-label="Align left">
                <Icon name="align-left" aria-hidden />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Align center">
                <Icon name="align-center" aria-hidden />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Align right">
                <Icon name="align-right" aria-hidden />
              </ToggleGroupItem>
              <ToggleGroupItem value="justify" aria-label="Justify">
                <Icon name="align-justify" aria-hidden />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <p className="mdt-text-sm mdt-text-muted-foreground">
          Formatting: {formatting.length > 0 ? formatting.join(', ') : 'none'} | Alignment:{' '}
          {alignment}
        </p>
      </div>;
  }
}`,...(Ue=(Je=S.parameters)==null?void 0:Je.docs)==null?void 0:Ue.source},description:{story:"Real-world example: Text editor toolbar.",...($e=(Ye=S.parameters)==null?void 0:Ye.docs)==null?void 0:$e.description}}};var Xe,Ze,Qe,ea,aa;k.parameters={...k.parameters,docs:{...(Xe=k.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
  render: function ViewSwitcherExample() {
    const [view, setView] = useState('grid');
    return <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <div className="mdt-flex mdt-items-center mdt-justify-between mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background mdt-p-4">
          <span className="mdt-text-sm mdt-font-medium mdt-text-foreground">Projects</span>
          <ToggleGroup type="single" variant="outline" value={view} onValueChange={setView}>
            <ToggleGroupItem value="list" aria-label="List view">
              <Icon name="list" aria-hidden />
            </ToggleGroupItem>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Icon name="layout-grid" aria-hidden />
            </ToggleGroupItem>
            <ToggleGroupItem value="kanban" aria-label="Kanban view">
              <Icon name="kanban" aria-hidden />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <p className="mdt-text-sm mdt-text-muted-foreground">Current view: {view}</p>
      </div>;
  }
}`,...(Qe=(Ze=k.parameters)==null?void 0:Ze.docs)==null?void 0:Qe.source},description:{story:"Real-world example: View switcher.",...(aa=(ea=k.parameters)==null?void 0:ea.docs)==null?void 0:aa.description}}};const La=["Default","MultipleSelection","OutlineVariant","WithTextLabels","IconsAndText","Sizes","VerticalOrientation","Disabled","FullWidth","Controlled","ControlledMultiple","AllVariants","TextEditorToolbar","ViewSwitcher"];export{_ as AllVariants,N as Controlled,w as ControlledMultiple,x as Default,C as Disabled,V as FullWidth,I as IconsAndText,b as MultipleSelection,T as OutlineVariant,j as Sizes,S as TextEditorToolbar,y as VerticalOrientation,k as ViewSwitcher,G as WithTextLabels,La as __namedExportsOrder,Ba as default};
//# sourceMappingURL=ToggleGroup.stories-BlyZsqKG.js.map
