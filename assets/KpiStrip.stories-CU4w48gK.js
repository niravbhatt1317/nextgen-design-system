import{r as Y,j as e}from"./iframe-DZn6zJ_A.js";import{K as n,a as Z}from"./KpiCharts-DkYT5_q7.js";import{c as $}from"./index-CcRgbaMz.js";import"./preload-helper-Dp1pzeXC.js";import"./index-DkSUl2wM.js";import"./index-DXf-30mB.js";import"./Icon-C7A5kxOO.js";import"./index-ChEho857.js";import"./Badge-hVOOPlKv.js";function r(){var a="/home/runner/work/nextgen-design-system/nextgen-design-system/src/components/KpiCard/KpiStrip.tsx",t="fc7699f2910f1b599848adde32ec3951ee1b723e",s=globalThis,g="__coverage__",f={path:"/home/runner/work/nextgen-design-system/nextgen-design-system/src/components/KpiCard/KpiStrip.tsx",statementMap:{0:{start:{line:5,column:17},end:{line:18,column:2}},1:{start:{line:6,column:2},end:{line:17,column:4}},2:{start:{line:19,column:0},end:{line:19,column:34}},3:{start:{line:21,column:0},end:{line:27,column:50}},4:{start:{line:23,column:4},end:{line:23,column:38}},5:{start:{line:25,column:4},end:{line:25,column:1321}}},fnMap:{0:{name:"KpiStrip2",decl:{start:{line:5,column:37},end:{line:5,column:46}},loc:{start:{line:5,column:127},end:{line:18,column:1}},line:5}},branchMap:{0:{loc:{start:{line:5,column:59},end:{line:5,column:69}},type:"default-arg",locations:[{start:{line:5,column:67},end:{line:5,column:69}}],line:5},1:{loc:{start:{line:5,column:71},end:{line:5,column:79}},type:"default-arg",locations:[{start:{line:5,column:77},end:{line:5,column:79}}],line:5},2:{loc:{start:{line:5,column:88},end:{line:5,column:100}},type:"default-arg",locations:[{start:{line:5,column:95},end:{line:5,column:100}}],line:5},3:{loc:{start:{line:13,column:62},end:{line:13,column:86}},type:"binary-expr",locations:[{start:{line:13,column:62},end:{line:13,column:66}},{start:{line:13,column:70},end:{line:13,column:86}}],line:13}},s:{0:0,1:0,2:0,3:0,4:0,5:0},f:{0:0},b:{0:[0],1:[0],2:[0],3:[0,0]},inputSourceMap:{version:3,file:null,sources:["/home/runner/work/nextgen-design-system/nextgen-design-system/src/components/KpiCard/KpiStrip.tsx"],names:[],mappings:"AAgBI;AAhBJ;AACA;AAEA;AAQA;AAIE;AACE;AAAC;AAAA;AACC;AACK;AACO;AAEF;AACiF;AACxB;AAElE;AAAA;AAGP;AACA;AAEA;;;;;;;"},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"fc7699f2910f1b599848adde32ec3951ee1b723e"},l=s[g]||(s[g]={});(!l[a]||l[a].hash!==t)&&(l[a]=f);var v=l[a];return r=function(){return v},v}r();const i=(r().s[0]++,Y.forwardRef(function({children:t,inset:s=(r().b[0][0]++,24),gap:g=(r().b[1][0]++,12),label:f,snap:l=(r().b[2][0]++,!1),className:v,style:U},X){return r().f[0]++,r().s[1]++,e.jsx("div",{ref:X,role:"region","aria-label":f,tabIndex:0,className:$("kpi-strip mdt-flex mdt-overflow-x-auto",(r().b[3][0]++,l&&(r().b[3][1]++,"kpi-strip-snap")),v),style:{...U,gap:g,marginInline:-s,paddingInline:s},children:t})}));r().s[2]++;i.displayName="KpiStrip";r().s[3]++;try{r().s[4]++,i.displayName="KpiStrip",r().s[5]++,i.__docgenInfo={description:`KpiStrip - the row that holds KpiCards. Every card keeps its floor, they grow
evenly until the row is full, and past the fit the row scrolls sideways
instead of squeezing. It bleeds through the page's side margin so a cut card
is cut at the page edge. Reachable by keyboard; arrow keys scroll it.`,displayName:"KpiStrip",props:{inset:{defaultValue:{value:"24"},description:"The page's side margin the strip bleeds through, so a cut card is cut at the page edge.",name:"inset",required:!1,type:{name:"number"}},gap:{defaultValue:{value:"12"},description:"",name:"gap",required:!1,type:{name:"number"}},label:{defaultValue:null,description:'Spoken name of the row ("Key figures").',name:"label",required:!1,type:{name:"string"}},snap:{defaultValue:{value:"false"},description:"Scrolling stops on a card's left edge.",name:"snap",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}}}}}catch{}const ce={title:"New Components/KPI Card/Strip",component:i,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:["The row that holds KPI cards and groups. It gives every card its floor, lets them grow evenly until the row is full, and when the row cannot fit them all it scrolls sideways instead of squeezing anything. It bleeds through the page's side margin, so a card that is cut off is cut at the page edge, which is the cue that there is more.","The page decides what goes in, how wide its margin is (`inset`, 24 by default) and where the row sits. The strip decides the rest. Each frame below is a page 984px wide with a 24px margin, so the row is 936."].join(`

`)}}}},o=({width:a=984,children:t})=>e.jsx("div",{className:"mdt-bg-neutral-10 mdt-px-6 mdt-py-5 mdt-font-sans",style:{width:a},children:t}),b=[["Total users",8200,"across all organisations"],["Active users",7640,"93% of total"],["Dormant users",256,"no sign-in in 90+ days"],["Pending invites",11,"awaiting acceptance"],["Privileged accounts",12,"admin / elevated"]],c={render:()=>e.jsx(o,{children:e.jsx(i,{label:"Key figures",children:b.map(([a,t,s])=>e.jsx(n,{label:a,value:t,hint:s},a))})})},d={render:()=>e.jsx(o,{children:e.jsxs(i,{label:"Key figures",children:[e.jsx(n,{label:"Total users",value:8200,hint:"across all organisations"}),e.jsx(n,{label:"Active users",value:7640,hint:"93% of total"})]})})},p={render:()=>e.jsx(o,{children:e.jsxs(i,{label:"Key figures",children:[b.map(([a,t,s])=>e.jsx(n,{label:a,value:t,hint:s},a)),e.jsx(n,{label:"Active invitation links",value:4,hint:"37 issued"}),e.jsx(n,{label:"Anomalous growth",value:47,hint:"users in last 24h"})]})})},u={render:()=>e.jsx(o,{children:e.jsxs(i,{label:"Key figures",children:[e.jsx(n,{label:"Total users",value:8200,hint:"across all organisations"}),e.jsx(n,{label:"Invitations",items:[{label:"Pending invites",value:11,hint:"awaiting acceptance"},{label:"Active invitation links",value:4,hint:"37 issued"}]}),e.jsx(n,{label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(Z,{percent:82,caption:"capacity"})}),e.jsx(n,{label:"Privileged accounts",value:12,hint:"admin / elevated",delta:{label:"4.5%",direction:"up",tone:"caution"}})]})})},m={render:()=>e.jsx(o,{width:600,children:e.jsx(i,{label:"Key figures",children:b.map(([a,t,s])=>e.jsx(n,{label:a,value:t,hint:s},a))})})},h={render:()=>e.jsx(o,{width:600,children:e.jsx(i,{label:"Key figures",snap:!0,children:b.map(([a,t,s])=>e.jsx(n,{label:a,value:t,hint:s},a))})})};var y,A,K,x,w;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <Frame>
      <KpiStrip label="Key figures">
        {FIVE.map(([label, value, hint]) => <KpiCard key={label} label={label} value={value} hint={hint} />)}
      </KpiStrip>
    </Frame>
}`,...(K=(A=c.parameters)==null?void 0:A.docs)==null?void 0:K.source},description:{story:"Five cards in a 936 row: each starts at its 174 floor and the spare room is shared evenly, so they land at 178.",...(w=(x=c.parameters)==null?void 0:x.docs)==null?void 0:w.description}}};var S,C,j,k,F;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <Frame>
      <KpiStrip label="Key figures">
        <KpiCard label="Total users" value={8200} hint="across all organisations" />
        <KpiCard label="Active users" value={7640} hint="93% of total" />
      </KpiStrip>
    </Frame>
}`,...(j=(C=d.parameters)==null?void 0:C.docs)==null?void 0:j.source},description:{story:"Two cards grow until the row is full: 462 each. There is no ceiling; the number stays put and the card has more quiet room.",...(F=(k=d.parameters)==null?void 0:k.docs)==null?void 0:F.description}}};var E,I,_,T,q;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <Frame>
      <KpiStrip label="Key figures">
        {FIVE.map(([label, value, hint]) => <KpiCard key={label} label={label} value={value} hint={hint} />)}
        <KpiCard label="Active invitation links" value={4} hint="37 issued" />
        <KpiCard label="Anomalous growth" value={47} hint="users in last 24h" />
      </KpiStrip>
    </Frame>
}`,...(_=(I=p.parameters)==null?void 0:I.docs)==null?void 0:_.source},description:{story:"Seven cards need 1290. Every card keeps its floor, the row scrolls sideways, and the sixth card is cut at the page edge. Tab to the row and use the arrow keys.",...(q=(T=p.parameters)==null?void 0:T.docs)==null?void 0:q.description}}};var V,N,P,M,z;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <Frame>
      <KpiStrip label="Key figures">
        <KpiCard label="Total users" value={8200} hint="across all organisations" />
        <KpiCard label="Invitations" items={[{
        label: 'Pending invites',
        value: 11,
        hint: 'awaiting acceptance'
      }, {
        label: 'Active invitation links',
        value: 4,
        hint: '37 issued'
      }]} />
        <KpiCard label="Licensed users limit" value={8200} hint="10k allowed" chart={<KpiGauge percent={82} caption="capacity" />} />
        <KpiCard label="Privileged accounts" value={12} hint="admin / elevated" delta={{
        label: '4.5%',
        direction: 'up',
        tone: 'caution'
      }} />
      </KpiStrip>
    </Frame>
}`,...(P=(N=u.parameters)==null?void 0:N.docs)==null?void 0:P.source},description:{story:"A group takes one share per segment; a chart card starts at 270 and grows like the others, its chart pinned right.",...(z=(M=u.parameters)==null?void 0:M.docs)==null?void 0:z.description}}};var B,G,R,D,L;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <Frame width={600}>
      <KpiStrip label="Key figures">
        {FIVE.map(([label, value, hint]) => <KpiCard key={label} label={label} value={value} hint={hint} />)}
      </KpiStrip>
    </Frame>
}`,...(R=(G=m.parameters)==null?void 0:G.docs)==null?void 0:R.source},description:{story:"The same five cards on a 600px page: three fit, the rest scroll. Cards never squeeze below 174.",...(L=(D=m.parameters)==null?void 0:D.docs)==null?void 0:L.description}}};var O,W,J,Q,H;h.parameters={...h.parameters,docs:{...(O=h.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <Frame width={600}>
      <KpiStrip label="Key figures" snap>
        {FIVE.map(([label, value, hint]) => <KpiCard key={label} label={label} value={value} hint={hint} />)}
      </KpiStrip>
    </Frame>
}`,...(J=(W=h.parameters)==null?void 0:W.docs)==null?void 0:J.source},description:{story:"Scrolling stops on a card's left edge.",...(H=(Q=h.parameters)==null?void 0:Q.docs)==null?void 0:H.description}}};const de=["Fits","Wide","Scrolls","Mixed","Narrow","Snapping"];export{c as Fits,u as Mixed,m as Narrow,p as Scrolls,h as Snapping,d as Wide,de as __namedExportsOrder,ce as default};
//# sourceMappingURL=KpiStrip.stories-CU4w48gK.js.map
