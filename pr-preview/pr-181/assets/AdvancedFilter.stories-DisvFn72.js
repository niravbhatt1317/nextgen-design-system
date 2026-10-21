import{j as e,r as g}from"./iframe-B8E0WCEE.js";import{A as B,E as U,a as z,c as G}from"./AdvancedFilter-CnTN0bZv.js";import{I as K}from"./Icon-DV19pkaF.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CcRgbaMz.js";import"./Button-rGRZvtEO.js";import"./index-ChEho857.js";import"./icon-at-drawn-size-BK59rBXO.js";import"./DropdownMenu-BsxSIT1K.js";import"./index-DWm8ojYn.js";import"./index-Dfs8bva7.js";import"./index-DK2emkFu.js";import"./index-ud8VZtT_.js";import"./index-C88Dujf4.js";import"./index-CXC2j4Yj.js";import"./index-DoF713fl.js";import"./index-BXyLu1MU.js";import"./index-C8C7Nz7H.js";import"./index-D142f4lv.js";import"./index-BWqGVtTL.js";import"./index-DTZyPRwV.js";import"./index-DGeUZ8Xh.js";import"./index-MuxkFZ_S.js";import"./index-Cy6EfnvS.js";import"./index-BDTytKEQ.js";import"./Select-B7XLBAV3.js";import"./index-BxRJzr4g.js";import"./index-BdQq_4o_.js";import"./index-CQXm_VLS.js";import"./index-B6-zWdvH.js";import"./index-CaEHPtAT.js";import"./Input-CG5QD0CY.js";import"./HoverCard-DUavoYoU.js";const W=["mdt-inline-flex mdt-h-8 mdt-shrink-0 mdt-cursor-pointer mdt-items-center mdt-gap-1.5 mdt-rounded-[8px]","mdt-border mdt-border-solid mdt-border-neutral-30 mdt-bg-background mdt-pl-2.5 mdt-pr-3","mdt-text-[13px] mdt-font-medium mdt-text-neutral-90 hover:mdt-bg-neutral-10","focus-visible:mdt-outline focus-visible:mdt-outline-2 focus-visible:mdt-outline-offset-2 focus-visible:mdt-outline-[#0262DE]"].join(" "),X="mdt-inline-flex mdt-h-[18px] mdt-min-w-[18px] mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded-[9px] mdt-bg-neutral-90 mdt-px-[5px] mdt-text-[11px] mdt-font-semibold mdt-leading-none mdt-text-primary-foreground",De={title:"New Components/AdvancedFilter",component:B,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Key · operator · value rows that stack; the one And / Or switch on the second row; a key with options takes many values; a key is used once; a row can become a group with its own And / Or. Apply, or Enter, hands the page a filter to run through applyAdvanced()."}}}},a=t=>{const n=new Date;return n.setDate(n.getDate()-t),n},x=[{name:"Michael Smith",email:"michael.smith@company.com",role:"Account Manager",team:"HR Manager",source:"Manual",org:"Acme Corp",vip:!0,lastLogin:a(0)},{name:"Emily Davis",email:"emily.davis@company.com",role:"Approver",team:"Developer - Full Stack",source:"LDAP",org:"Beta Innovations",vip:!1,lastLogin:a(2)},{name:"Ava Thompson",email:"ava.thompson@company.com",role:"Client Operator",team:"UX Designer",source:"LDAP",org:"Acme Corp",vip:!1,lastLogin:a(9)},{name:"Noah White",email:"noah.white@company.com",role:"Client Technician",team:"Product Owner",source:"LDAP",org:"Gamma Ltd",vip:!1,lastLogin:a(1)},{name:"Owen Green",email:"owen.green@company.com",role:"Content Strategist",team:"Data Scientist",source:"SCIM",org:"Beta Innovations",vip:!0,lastLogin:a(30)},{name:"Reyansh Patel",email:"reyansh.patel@company.com",role:"Data Scientist",team:"Marketing Specialist",source:"Manual",org:"Acme Corp",vip:!1,lastLogin:null},{name:"Zoya Patel",email:"zoya.patel@company.com",role:"Developer - Full Stack",team:"Product Manager",source:"Manual",org:"Gamma Ltd",vip:!1,lastLogin:a(4)},{name:"Diya Iyer",email:"diya.iyer@company.com",role:"End User",team:"UX Designer",source:"Manual",org:"Beta Innovations",vip:!1,lastLogin:a(12)},{name:"Vihaan Iyer",email:"vihaan.iyer@company.com",role:"Finance",team:"Support Ops",source:"SCIM",org:"Acme Corp",vip:!0,lastLogin:a(0)},{name:"Aditya Iyer",email:"aditya.iyer@company.com",role:"Account Manager",team:"Developer - Full Stack",source:"LDAP",org:"Gamma Ltd",vip:!1,lastLogin:a(60)},{name:"Isha Khan",email:"isha.khan@company.com",role:"Approver",team:"Contractors",source:"Manual",org:"Beta Innovations",vip:!1,lastLogin:a(3)},{name:"Arjun Khan",email:"arjun.khan@company.com",role:"End User",team:"Interns",source:"SCIM",org:"Acme Corp",vip:!1,lastLogin:null}],h=t=>[...new Set(x.map(t))].sort(),f=[{id:"name",label:"Name",type:"text"},{id:"email",label:"Email",type:"text"},{id:"role",label:"Role",type:"pick",options:h(t=>t.role)},{id:"team",label:"Team",type:"pick",options:h(t=>t.team)},{id:"source",label:"Source of truth",type:"pick",options:["Manual","LDAP","SCIM"]},{id:"org",label:"Organization",type:"pick",options:h(t=>t.org)},{id:"vip",label:"VIP",type:"pick",options:["Yes","No"],get:t=>t.vip?"Yes":"No"},{id:"lastLogin",label:"Last login",type:"date"}];function c({initial:t=U,startOpen:n=!0}){const[r,d]=g.useState(t),[u,k]=g.useState(n),y=g.useMemo(()=>z(x,r,f),[r]),s=G(r);return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",style:{minHeight:560},children:[e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2.5",children:[e.jsxs("span",{className:"mdt-relative mdt-inline-flex",children:[e.jsxs("button",{type:"button",className:W,onClick:()=>{k(o=>!o)},children:[e.jsx(K,{name:"filter",size:14,"aria-hidden":!0}),"More filters",s>0&&e.jsx("span",{className:X,children:s})]}),e.jsx(B,{open:u,onClose:()=>{k(!1)},keys:f,value:r,onApply:d})]}),e.jsxs("span",{className:"mdt-ml-auto mdt-text-xs mdt-text-neutral-90",children:[s?String(s)+(s===1?" filter · ":" filters · "):"",y.length," of ",x.length," people"]})]}),e.jsxs("table",{className:"mdt-w-full mdt-border-collapse mdt-text-[13px]",children:[e.jsx("thead",{children:e.jsx("tr",{className:"mdt-bg-neutral-10 mdt-text-left mdt-text-[11px] mdt-font-semibold mdt-uppercase mdt-tracking-[0.04em] mdt-text-neutral-90",children:["Name","Role","Team","Source","Organization"].map(o=>e.jsx("th",{className:"mdt-border-b mdt-border-neutral-20 mdt-px-3 mdt-py-2 mdt-font-semibold",children:o},o))})}),e.jsxs("tbody",{children:[y.map(o=>e.jsxs("tr",{children:[e.jsx("td",{className:"mdt-border-b mdt-border-neutral-20 mdt-px-3 mdt-py-2.5 mdt-text-foreground",children:o.name}),e.jsx("td",{className:"mdt-border-b mdt-border-neutral-20 mdt-px-3 mdt-py-2.5 mdt-text-neutral-90",children:o.role}),e.jsx("td",{className:"mdt-border-b mdt-border-neutral-20 mdt-px-3 mdt-py-2.5 mdt-text-neutral-90",children:o.team}),e.jsx("td",{className:"mdt-border-b mdt-border-neutral-20 mdt-px-3 mdt-py-2.5 mdt-text-neutral-90",children:o.source}),e.jsx("td",{className:"mdt-border-b mdt-border-neutral-20 mdt-px-3 mdt-py-2.5 mdt-text-neutral-90",children:o.org})]},o.email)),y.length===0&&e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"mdt-px-3 mdt-py-6 mdt-text-center mdt-text-neutral-90",children:"Nobody matches these filters."})})]})]})]})}const i={render:()=>e.jsx(c,{})},m={render:()=>e.jsx(c,{initial:{join:"and",rows:[{key:"team",op:"is",value:["UX Designer","Developer - Full Stack","Data Scientist"]},{group:!0,join:"or",rows:[{key:"source",op:"is",value:["LDAP"]},{key:"org",op:"is",value:["Beta Innovations"]}]}]}})},l={render:()=>e.jsx(c,{startOpen:!1,initial:{join:"and",rows:[{key:"vip",op:"is",value:["Yes"]},{key:"lastLogin",op:"within",value:"7"}]}})},v=t=>{var d;const n=(d=f.find(u=>u.id===t))==null?void 0:d.options;return(typeof n=="function"?n():n??[])[0]??""},p={render:()=>e.jsx(c,{initial:{join:"and",rows:[{key:"name",op:"contains",value:"a"},{key:"email",op:"contains",value:"@"},{key:"role",op:"is",value:[v("role")]},{group:!0,join:"or",rows:[{key:"team",op:"is",value:[v("team")]},{key:"source",op:"is",value:["LDAP"]}]},{key:"org",op:"is",value:[v("org")]},{key:"vip",op:"is",value:["Yes"]}]}})};var b,j,w,A,D;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <Demo />
}`,...(w=(j=i.parameters)==null?void 0:j.docs)==null?void 0:w.source},description:{story:"The panel open on one empty row: Where · Select key · Select operator · Select value.",...(D=(A=i.parameters)==null?void 0:A.docs)==null?void 0:D.description}}};var S,L,N,O,M;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <Demo initial={{
    join: 'and',
    rows: [{
      key: 'team',
      op: 'is',
      value: ['UX Designer', 'Developer - Full Stack', 'Data Scientist']
    }, {
      group: true,
      join: 'or',
      rows: [{
        key: 'source',
        op: 'is',
        value: ['LDAP']
      }, {
        key: 'org',
        op: 'is',
        value: ['Beta Innovations']
      }]
    }]
  }} />
}`,...(N=(L=m.parameters)==null?void 0:L.docs)==null?void 0:N.source},description:{story:"The worked example from the mock: Team is three teams · And a group (Source of truth is LDAP · Or Organization is Beta Innovations).",...(M=(O=m.parameters)==null?void 0:O.docs)==null?void 0:M.description}}};var I,C,E,P,T;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <Demo startOpen={false} initial={{
    join: 'and',
    rows: [{
      key: 'vip',
      op: 'is',
      value: ['Yes']
    }, {
      key: 'lastLogin',
      op: 'within',
      value: '7'
    }]
  }} />
}`,...(E=(C=l.parameters)==null?void 0:C.docs)==null?void 0:E.source},description:{story:"Closed, with two conditions applied: the door counts them and the list is already narrowed.",...(T=(P=l.parameters)==null?void 0:P.docs)==null?void 0:T.description}}};var F,R,Y;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <Demo initial={{
    join: 'and',
    rows: [{
      key: 'name',
      op: 'contains',
      value: 'a'
    }, {
      key: 'email',
      op: 'contains',
      value: '@'
    }, {
      key: 'role',
      op: 'is',
      value: [firstOf('role')]
    }, {
      group: true,
      join: 'or',
      rows: [{
        key: 'team',
        op: 'is',
        value: [firstOf('team')]
      }, {
        key: 'source',
        op: 'is',
        value: ['LDAP']
      }]
    }, {
      key: 'org',
      op: 'is',
      value: [firstOf('org')]
    }, {
      key: 'vip',
      op: 'is',
      value: ['Yes']
    }]
  }} />
}`,...(Y=(R=p.parameters)==null?void 0:R.docs)==null?void 0:Y.source}}};const Se=["Empty","WorkedExample","Applied","ManyRows"];export{l as Applied,i as Empty,p as ManyRows,m as WorkedExample,Se as __namedExportsOrder,De as default};
//# sourceMappingURL=AdvancedFilter.stories-DisvFn72.js.map
