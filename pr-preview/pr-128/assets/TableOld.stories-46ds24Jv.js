import{j as e,r as x}from"./iframe-cnYAKx8Z.js";import"./index-DkSUl2wM.js";import{T as b,a as u,b as d,c as a,d as p,e as l,f as y,g as $l,h as Xl,i as Wl}from"./TableOld--Fk_gylq.js";import{u as Yl}from"./useColumnWidths-Cv5DZRrZ.js";import{u as ea}from"./useTableSelection-tQl31BY8.js";import{C as J}from"./Checkbox-7TEnswYH.js";import{S as G}from"./Skeleton-DOpkiKJk.js";import{P as Gl,a as Vl,b as j,c as _l,d as Z,e as Jl}from"./Pagination-Mabi2XAu.js";import{I as Zl}from"./Icon-CTc3l-UP.js";import{B as Ql}from"./Button-DUSuevds.js";import{B as la}from"./Badge-DkOKX2yr.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./index-DjNkL6UB.js";import"./index-DkLu7aWH.js";import"./Popover-D-17ljgr.js";import"./index-COXZrIaa.js";import"./index-Crra__E5.js";import"./index-BY-yvX2Q.js";import"./index-Co7zc9rv.js";import"./index-CaKrkMNx.js";import"./index-C3NHmhtL.js";import"./Combination-DheGjG76.js";import"./index-BkL8Gh-X.js";import"./index-DscgFdTr.js";import"./index-OeBrDgrG.js";import"./index-Dyxcol3D.js";import"./index-BjpqT214.js";import"./Command-wfYBmNy-.js";import"./index-w8XrwAaK.js";import"./index-Dgv0Y4lK.js";import"./index-DwxAOZ6f.js";const Ea={title:"Deprecated/Table Old",component:b,tags:["autodocs"],parameters:{status:{type:"deprecated",since:"0.4.0",deprecation:{deprecatedSince:"0.4.0",removalIn:"1.0.0",replacement:"Table",message:"The Table family is now the merged console Users table (7 September 2026): 54px rows under a 40px header, row numbers that become checkboxes, a select-all scope, header sort, a column menu, drag-to-move, insert-in-place, and the library Badge in every cell. This is the earlier family, kept for side-by-side comparison until the removal pull request."}},layout:"padded",docs:{description:{component:"## ⚠️ Deprecated — use `Table`. The Table family is now the merged console Users table (7 September 2026); this earlier family stays only for side-by-side comparison. A semantic HTML table component with sub-components for building accessible and well-structured data tables. Includes support for headers, body, footer, captions, and various interactive features."}},controls:{exclude:["class"]}},argTypes:{density:{control:"inline-radio",options:["short","compact","default","relaxed"],description:"Row height and cell padding. Four steps, following Airtable — the only reference that ships a row-height picker to the user rather than fixing it at design time.",table:{type:{summary:"'short' | 'compact' | 'default' | 'relaxed'"},defaultValue:{summary:"compact"}}},striped:{control:"boolean",description:"Zebra-stripe alternate body rows. Off by default — a single row divider carries the structure in most tables, but long dense ones read better striped.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},stickyHeader:{control:"boolean",description:"Keep the header visible while the body scrolls. **Needs `maxHeight`** — sticky positions against the nearest scrolling ancestor, and without a height the table never scrolls.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},maxHeight:{control:"text",description:"Caps the height and makes the table scroll internally. This is what a sticky header and a pinned summary row hold onto. Accepts anything CSS does.",table:{type:{summary:"string | number"}}},layout:{control:"inline-radio",options:["auto","fixed"],description:"How column widths are decided. Use `fixed` when rows appear and disappear — collapsing a group in an `auto` table visibly resizes every column.",table:{type:{summary:"'auto' | 'fixed'"},defaultValue:{summary:"auto"}}},containerClassName:{control:"text",description:"Classes for the scroll container. A border radius has to go here rather than on a wrapper of your own — the scroll container is what clips, so a radius outside it gets painted over by the sticky header.",table:{type:{summary:"string"}}},className:{control:"text",description:"Additional CSS classes applied to the `<table>` element",table:{type:{summary:"string"}}}}},f=[{invoice:"INV001",paymentStatus:"Paid",totalAmount:"$250.00",paymentMethod:"Credit Card"},{invoice:"INV002",paymentStatus:"Pending",totalAmount:"$150.00",paymentMethod:"PayPal"},{invoice:"INV003",paymentStatus:"Unpaid",totalAmount:"$350.00",paymentMethod:"Bank Transfer"},{invoice:"INV004",paymentStatus:"Paid",totalAmount:"$450.00",paymentMethod:"Credit Card"},{invoice:"INV005",paymentStatus:"Paid",totalAmount:"$550.00",paymentMethod:"PayPal"},{invoice:"INV006",paymentStatus:"Pending",totalAmount:"$200.00",paymentMethod:"Bank Transfer"},{invoice:"INV007",paymentStatus:"Unpaid",totalAmount:"$300.00",paymentMethod:"Credit Card"}],g=[{id:1,name:"John Doe",email:"john@example.com",role:"Admin",status:"Active"},{id:2,name:"Jane Smith",email:"jane@example.com",role:"User",status:"Active"},{id:3,name:"Bob Johnson",email:"bob@example.com",role:"User",status:"Inactive"},{id:4,name:"Alice Williams",email:"alice@example.com",role:"Editor",status:"Active"},{id:5,name:"Charlie Brown",email:"charlie@example.com",role:"User",status:"Active"}],S={args:{density:"compact",striped:!1,layout:"auto"},render:t=>e.jsxs(b,{...t,children:[e.jsx(u,{children:e.jsxs(d,{children:[e.jsx(a,{className:"mdt-w-[100px]",children:"Invoice"}),e.jsx(a,{children:"Status"}),e.jsx(a,{children:"Method"}),e.jsx(a,{className:"mdt-text-right",children:"Amount"})]})}),e.jsx(p,{children:f.map(s=>e.jsxs(d,{children:[e.jsx(l,{className:"mdt-font-medium",children:s.invoice}),e.jsx(l,{children:s.paymentStatus}),e.jsx(l,{children:s.paymentMethod}),e.jsx(l,{className:"mdt-text-right",children:s.totalAmount})]},s.invoice))})]})},N={render:()=>e.jsxs(b,{children:[e.jsx(y,{children:"A list of your recent invoices."}),e.jsx(u,{children:e.jsxs(d,{children:[e.jsx(a,{className:"mdt-w-[100px]",children:"Invoice"}),e.jsx(a,{children:"Status"}),e.jsx(a,{children:"Method"}),e.jsx(a,{className:"mdt-text-right",children:"Amount"})]})}),e.jsx(p,{children:f.slice(0,5).map(t=>e.jsxs(d,{children:[e.jsx(l,{className:"mdt-font-medium",children:t.invoice}),e.jsx(l,{children:t.paymentStatus}),e.jsx(l,{children:t.paymentMethod}),e.jsx(l,{className:"mdt-text-right",children:t.totalAmount})]},t.invoice))})]})},H={render:()=>e.jsxs(b,{children:[e.jsx(u,{children:e.jsxs(d,{children:[e.jsx(a,{className:"mdt-w-[100px]",children:"Invoice"}),e.jsx(a,{children:"Status"}),e.jsx(a,{children:"Method"}),e.jsx(a,{className:"mdt-text-right",children:"Amount"})]})}),e.jsx(p,{children:f.slice(0,5).map(t=>e.jsxs(d,{children:[e.jsx(l,{className:"mdt-font-medium",children:t.invoice}),e.jsx(l,{children:t.paymentStatus}),e.jsx(l,{children:t.paymentMethod}),e.jsx(l,{className:"mdt-text-right",children:t.totalAmount})]},t.invoice))}),e.jsx($l,{children:e.jsxs(d,{children:[e.jsx(l,{colSpan:3,children:"Total"}),e.jsx(l,{className:"mdt-text-right",children:"$2,500.00"})]})})]})},k={render:()=>e.jsxs(b,{striped:!0,children:[e.jsx(y,{children:"One prop. Striping applies to body rows only — a striped header reads as a mistake."}),e.jsx(u,{children:e.jsxs(d,{children:[e.jsx(a,{children:"Name"}),e.jsx(a,{children:"Email"}),e.jsx(a,{children:"Role"}),e.jsx(a,{children:"Status"})]})}),e.jsx(p,{children:g.map(t=>e.jsxs(d,{children:[e.jsx(l,{className:"mdt-font-medium",children:t.name}),e.jsx(l,{children:t.email}),e.jsx(l,{children:t.role}),e.jsx(l,{children:t.status})]},t.id))})]})},R={render:()=>e.jsx("div",{className:"mdt-flex mdt-flex-col mdt-gap-8",children:["short","compact","default","relaxed"].map(t=>e.jsxs("div",{children:[e.jsxs("p",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium mdt-text-muted-foreground",children:['density="',t,'"']}),e.jsxs(b,{density:t,children:[e.jsx(u,{children:e.jsxs(d,{children:[e.jsx(a,{children:"Name"}),e.jsx(a,{children:"Email"}),e.jsx(a,{children:"Role"})]})}),e.jsx(p,{children:g.slice(0,2).map(s=>e.jsxs(d,{children:[e.jsx(l,{className:"mdt-font-medium",children:s.name}),e.jsx(l,{children:s.email}),e.jsx(l,{children:s.role})]},s.id))})]})]},t))})},P={render:()=>e.jsxs(b,{children:[e.jsx(y,{children:"Numbers on the right. This one rule fixes most “messy table” complaints."}),e.jsx(u,{children:e.jsxs(d,{children:[e.jsx(a,{children:"Item"}),e.jsx(a,{align:"center",children:"Qty"}),e.jsx(a,{align:"right",children:"Unit price"}),e.jsx(a,{align:"right",children:"Total"})]})}),e.jsx(p,{children:[{item:"Annual licence",qty:12,unit:"1,204.00",total:"14,448.00"},{item:"Support hours",qty:3,unit:"95.50",total:"286.50"},{item:"Onboarding",qty:1,unit:"2,000.00",total:"2,000.00"}].map(t=>e.jsxs(d,{children:[e.jsx(l,{className:"mdt-font-medium",children:t.item}),e.jsx(l,{align:"center",children:t.qty}),e.jsx(l,{align:"right",children:t.unit}),e.jsx(l,{align:"right",children:t.total})]},t.item))}),e.jsx($l,{children:e.jsxs(d,{children:[e.jsx(l,{colSpan:3,children:"Total"}),e.jsx(l,{align:"right",children:"16,734.50"})]})})]})},A={render:()=>e.jsxs(b,{stickyHeader:!0,maxHeight:"16rem",density:"short",containerClassName:"mdt-rounded-md mdt-border",children:[e.jsx(u,{children:e.jsxs(d,{children:[e.jsx(a,{children:"#"}),e.jsx(a,{children:"Name"}),e.jsx(a,{children:"Email"}),e.jsx(a,{align:"right",children:"Score"})]})}),e.jsx(p,{children:Array.from({length:30},(t,s)=>e.jsxs(d,{children:[e.jsx(l,{children:s+1}),e.jsxs(l,{className:"mdt-font-medium",children:["Row ",s+1]}),e.jsxs(l,{children:["row",s+1,"@example.com"]}),e.jsx(l,{align:"right",children:(s+1)*7})]},s))})]})},I={render:function(){const[s,i]=x.useState(null),[m,T]=x.useState(null),r=c=>{if(s!==c){i(c),T("ascend");return}if(m==="ascend"){T("descend");return}i(null),T(null)},n=[...g].sort((c,w)=>{if(!s||!m)return 0;const O=m==="ascend"?1:-1;return c[s]>w[s]?O:-O}),o=[{key:"name",label:"Name"},{key:"email",label:"Email"},{key:"role",label:"Role"},{key:"status",label:"Status"}];return e.jsxs(b,{children:[e.jsx(y,{children:"Click a header to sort. Third click returns to the unsorted order."}),e.jsx(u,{children:e.jsx(d,{children:o.map(c=>e.jsx(a,{sortable:!0,sortOrder:s===c.key?m:null,onSort:()=>{r(c.key)},children:c.label},c.key))})}),e.jsx(p,{children:n.map(c=>e.jsxs(d,{children:[e.jsx(l,{className:"mdt-font-medium",children:c.name}),e.jsx(l,{children:c.email}),e.jsx(l,{children:c.role}),e.jsx(l,{children:c.status})]},c.id))})]})}},B={render:function(){const s=ea({rowIds:g.map(i=>i.id)});return e.jsxs("div",{children:[e.jsxs("div",{className:"mdt-mb-4 mdt-text-sm mdt-text-muted-foreground",children:[s.count," of ",g.length," row(s) selected."]}),e.jsxs(b,{children:[e.jsx(u,{children:e.jsxs(d,{children:[e.jsx(a,{className:"mdt-w-[50px]",children:e.jsx(J,{checked:s.headerState,onCheckedChange:s.toggleAll,"aria-label":"Select all rows"})}),e.jsx(a,{children:"Name"}),e.jsx(a,{children:"Email"}),e.jsx(a,{children:"Role"}),e.jsx(a,{children:"Status"})]})}),e.jsx(p,{children:g.map(i=>e.jsxs(d,{selected:s.isSelected(i.id),children:[e.jsx(l,{children:e.jsx(J,{checked:s.isSelected(i.id),onClick:m=>{s.toggle(i.id,{extend:m.shiftKey})},"aria-label":`Select ${i.name}`})}),e.jsx(l,{className:"mdt-font-medium",children:i.name}),e.jsx(l,{children:i.email}),e.jsx(l,{children:i.role}),e.jsx(l,{children:i.status})]},i.id))})]})]})}},V={render:()=>e.jsxs(b,{density:"short",children:[e.jsx(y,{children:"One prop on the table, not a class on every cell."}),e.jsx(u,{children:e.jsxs(d,{children:[e.jsx(a,{align:"right",children:"ID"}),e.jsx(a,{children:"Name"}),e.jsx(a,{children:"Email"}),e.jsx(a,{children:"Role"})]})}),e.jsx(p,{children:g.map(t=>e.jsxs(d,{children:[e.jsx(l,{align:"right",children:t.id}),e.jsx(l,{className:"mdt-font-medium",children:t.name}),e.jsx(l,{children:t.email}),e.jsx(l,{children:t.role})]},t.id))})]})},E={render:()=>e.jsxs(b,{children:[e.jsx(y,{children:"Loading table data..."}),e.jsx(u,{children:e.jsxs(d,{children:[e.jsx(a,{children:"Invoice"}),e.jsx(a,{children:"Status"}),e.jsx(a,{children:"Method"}),e.jsx(a,{className:"mdt-text-right",children:"Amount"})]})}),e.jsx(p,{children:[1,2,3,4,5].map(t=>e.jsxs(d,{children:[e.jsx(l,{children:e.jsx(G,{className:"mdt-h-4 mdt-w-[80px]"})}),e.jsx(l,{children:e.jsx(G,{className:"mdt-h-4 mdt-w-[100px]"})}),e.jsx(l,{children:e.jsx(G,{className:"mdt-h-4 mdt-w-[120px]"})}),e.jsx(l,{className:"mdt-text-right",children:e.jsx(G,{className:"mdt-ml-auto mdt-h-4 mdt-w-[80px]"})})]},t))})]})},M={render:function(){const[s,i]=x.useState(1),m=3,T=Math.ceil(f.length/m),r=f.slice((s-1)*m,s*m);return e.jsxs("div",{className:"mdt-space-y-4",children:[e.jsxs(b,{children:[e.jsxs(y,{children:["Showing ",(s-1)*m+1," to"," ",Math.min(s*m,f.length)," of ",f.length," invoices."]}),e.jsx(u,{children:e.jsxs(d,{children:[e.jsx(a,{className:"mdt-w-[100px]",children:"Invoice"}),e.jsx(a,{children:"Status"}),e.jsx(a,{children:"Method"}),e.jsx(a,{className:"mdt-text-right",children:"Amount"})]})}),e.jsx(p,{children:r.map(n=>e.jsxs(d,{children:[e.jsx(l,{className:"mdt-font-medium",children:n.invoice}),e.jsx(l,{children:n.paymentStatus}),e.jsx(l,{children:n.paymentMethod}),e.jsx(l,{className:"mdt-text-right",children:n.totalAmount})]},n.invoice))})]}),e.jsx(Gl,{children:e.jsxs(Vl,{children:[e.jsx(j,{children:e.jsx(_l,{href:"#",onClick:n=>{n.preventDefault(),i(o=>Math.max(1,o-1))}})}),[...Array(T)].map((n,o)=>e.jsx(j,{children:e.jsx(Z,{href:"#",isActive:s===o+1,onClick:c=>{c.preventDefault(),i(o+1)},children:o+1})},o+1)),e.jsx(j,{children:e.jsx(Jl,{href:"#",onClick:n=>{n.preventDefault(),i(o=>Math.min(T,o+1))}})})]})})]})}},F={render:()=>e.jsx("div",{className:"mdt-flex mdt-flex-col mdt-gap-8",children:[{state:"Empty",icon:"inbox",title:"No invoices yet.",body:"Raise one and it will appear here.",action:"New invoice"},{state:"Filtered empty",icon:"search-x",title:"No invoices match your filters.",body:"There are 248 invoices, none of them in this view.",action:"Clear filters"}].map(t=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx("p",{className:"mdt-text-xs mdt-font-medium mdt-text-muted-foreground",children:t.state}),e.jsxs(b,{children:[e.jsx(u,{children:e.jsxs(d,{children:[e.jsx(a,{className:"mdt-w-[100px]",children:"Invoice"}),e.jsx(a,{children:"Status"}),e.jsx(a,{children:"Method"}),e.jsx(a,{className:"mdt-text-right",children:"Amount"})]})}),e.jsx(p,{children:e.jsx(d,{interactive:!1,children:e.jsx(l,{colSpan:4,className:"mdt-p-0",children:e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2 mdt-py-10",children:[e.jsx(Zl,{name:t.icon,size:"xl",color:"muted",className:"mdt-opacity-50"}),e.jsx("p",{className:"mdt-text-sm mdt-font-medium",children:t.title}),e.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:t.body}),e.jsx(Ql,{variant:t.state==="Empty"?"primary":"outline",size:"sm",children:t.action})]})})})})]})]},t.state))})},_={render:function(){const[s,i]=x.useState(null),[m,T]=x.useState(null),[r,n]=x.useState([]),o=h=>{if(s!==h){i(h),T("ascend");return}if(m==="ascend"){T("descend");return}i(null),T(null)},c=[...g].sort((h,v)=>{if(!s||!m)return 0;const W=m==="ascend"?1:-1;return h[s]>v[s]?W:-W}),w=h=>{n(v=>v.includes(h)?v.filter(W=>W!==h):[...v,h])},O=r.length===g.length,C=[{key:"name",label:"Name"},{key:"email",label:"Email"},{key:"role",label:"Role"},{key:"status",label:"Status"}];return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:[r.length," of ",g.length," row(s) selected."]}),e.jsxs(b,{stickyHeader:!0,maxHeight:"18rem",layout:"fixed",containerClassName:"mdt-rounded-md mdt-border",children:[e.jsx(u,{children:e.jsxs(d,{children:[e.jsx(a,{className:"mdt-w-12",children:e.jsx(J,{checked:O,onCheckedChange:()=>{n(O?[]:g.map(h=>h.id))},"aria-label":"Select all rows"})}),C.map(h=>e.jsx(a,{sortable:!0,sortOrder:s===h.key?m:null,onSort:()=>{o(h.key)},children:h.label},h.key))]})}),e.jsx(p,{children:c.map(h=>e.jsxs(d,{selected:r.includes(h.id),children:[e.jsx(l,{children:e.jsx(J,{checked:r.includes(h.id),onCheckedChange:()=>{w(h.id)},"aria-label":`Select ${h.name}`})}),e.jsx(l,{className:"mdt-font-medium",children:h.name}),e.jsx(l,{children:h.email}),e.jsx(l,{children:h.role}),e.jsx(l,{children:h.status})]},h.id))})]}),e.jsx(Gl,{children:e.jsxs(Vl,{children:[e.jsx(j,{children:e.jsx(_l,{href:"#"})}),e.jsx(j,{children:e.jsx(Z,{href:"#",isActive:!0,children:"1"})}),e.jsx(j,{children:e.jsx(Z,{href:"#",children:"2"})}),e.jsx(j,{children:e.jsx(Jl,{href:"#"})})]})})]})}},D={render:function(){const s=[{name:"Mobile App",rows:g.slice(0,2)},{name:"Platform",rows:g.slice(2,5)}],[i,m]=x.useState([]),T=r=>{m(n=>n.includes(r)?n.filter(o=>o!==r):[...n,r])};return e.jsxs(b,{layout:"fixed",children:[e.jsx(y,{children:'Click a group heading to collapse it. `layout="fixed"` keeps the columns still — without it the browser re-measures from whatever rows are left and every column jumps.'}),e.jsx(u,{children:e.jsxs(d,{children:[e.jsx(a,{className:"mdt-w-1/3",children:"Name"}),e.jsx(a,{className:"mdt-w-1/2",children:"Email"}),e.jsx(a,{children:"Role"})]})}),e.jsx(p,{children:s.map(r=>e.jsxs(x.Fragment,{children:[e.jsx(Xl,{colSpan:3,count:r.rows.length,expanded:!i.includes(r.name),onToggle:()=>{T(r.name)},children:r.name}),!i.includes(r.name)&&r.rows.map(n=>e.jsxs(d,{children:[e.jsx(l,{className:"mdt-font-medium",children:n.name}),e.jsx(l,{children:n.email}),e.jsx(l,{children:n.role})]},n.id))]},r.name))})]})}},L={render:function(){const[s,i]=x.useState([1]),m={1:[{label:"06:51 – 09:21",hours:"2h 30m"},{label:"09:20 – 09:21",hours:"0h"}],2:[{label:"10:00 – 10:39",hours:"38m"}]},T=r=>{i(n=>n.includes(r)?n.filter(o=>o!==r):[...n,r])};return e.jsxs(b,{children:[e.jsx(y,{children:"Expand a task to see its time entries."}),e.jsx(u,{children:e.jsxs(d,{children:[e.jsx(a,{children:"Task"}),e.jsx(a,{align:"right",children:"Total"})]})}),e.jsx(p,{children:[1,2].map(r=>{var n;return e.jsxs(x.Fragment,{children:[e.jsxs(d,{children:[e.jsx(l,{children:e.jsxs("span",{className:"mdt-inline-flex mdt-items-center mdt-gap-2",children:[e.jsx(Wl,{expanded:s.includes(r),onToggle:()=>{T(r)},label:`Show entries for task ${String(r)}`}),e.jsxs("span",{className:"mdt-font-medium",children:["Feature ",r===1?"A":"B"]})]})}),e.jsx(l,{align:"right",children:r===1?"2h 30m":"38m"})]}),s.includes(r)&&((n=m[r])==null?void 0:n.map(o=>e.jsxs(d,{children:[e.jsx(l,{indent:1,className:"mdt-text-muted-foreground",children:o.label}),e.jsx(l,{align:"right",children:o.hours})]},o.label)))]},r)})})]})}},K={render:function(){const[s,i]=x.useState(["DAL03"]),m=o=>{i(c=>c.includes(o)?c.filter(w=>w!==o):[...c,o])},T=[{id:"DAL03",name:"Dallas-03",provider:"Equinix",kind:"Connect",status:"inProcess"},{id:"LON01",name:"London-01",provider:"Telehouse",kind:"Direct",status:"resolved"}],r=[["Date created","Mon, 15 Jul 2019 17:52:57 GMT"],["User IP address","10.123.11/29"],["BGP ASN","63888"],["Router","ZCV-DRK-TZ-03"]],n=[{icon:"info",tone:"mdt-text-muted-foreground",when:"10/23/2018 9:30AM",what:"LOA awaiting action"},{icon:"check-circle",tone:"mdt-text-success",when:"10/23/2018 9:31AM",what:"LOA approved"}];return e.jsxs(b,{children:[e.jsx(u,{children:e.jsxs(d,{children:[e.jsx(a,{children:"Name"}),e.jsx(a,{children:"Site"}),e.jsx(a,{children:"Provider"}),e.jsx(a,{children:"Status"})]})}),e.jsx(p,{children:T.map(o=>{const c=s.includes(o.id),w=`panel-${o.id}`;return e.jsxs(x.Fragment,{children:[e.jsxs(d,{children:[e.jsx(l,{children:e.jsxs("span",{className:"mdt-inline-flex mdt-items-center mdt-gap-2",children:[e.jsx(Wl,{expanded:c,onToggle:()=>{m(o.id)},label:`Show details for ${o.name}`,"aria-controls":w}),e.jsx("span",{className:"mdt-font-medium",children:o.name})]})}),e.jsx(l,{children:o.id}),e.jsx(l,{children:o.provider}),e.jsx(l,{children:e.jsx(la,{tone:o.status==="inProcess"?"warning":"success",shape:"square",size:"sm",dot:!0,children:o.status==="inProcess"?"In Process":"Resolved"})})]}),c&&e.jsx(d,{className:"hover:mdt-bg-transparent",children:e.jsx(l,{colSpan:4,id:w,className:"mdt-bg-muted/30 mdt-p-6 mdt-pl-14",children:e.jsxs("div",{className:"mdt-grid mdt-gap-8 md:mdt-grid-cols-3",children:[e.jsx("dl",{className:"mdt-grid mdt-grid-cols-[auto_1fr] mdt-gap-x-6 mdt-gap-y-2 mdt-text-sm",children:r.map(([O,C])=>e.jsxs(x.Fragment,{children:[e.jsx("dt",{className:"mdt-font-medium",children:O}),e.jsx("dd",{className:"mdt-text-muted-foreground",children:C})]},O))}),e.jsxs("div",{children:[e.jsx("h4",{className:"mdt-mb-3 mdt-text-sm mdt-font-medium",children:"Latest activity"}),e.jsx("ol",{className:"mdt-space-y-3",children:n.map((O,C)=>e.jsxs("li",{className:"mdt-flex mdt-gap-3",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center",children:[e.jsx(Zl,{name:O.icon,size:"sm",className:O.tone,"aria-hidden":!0}),C<n.length-1&&e.jsx("span",{className:"mdt-mt-1 mdt-w-px mdt-flex-1 mdt-bg-border"})]}),e.jsxs("div",{className:"mdt-text-sm mdt-leading-tight",children:[e.jsx("div",{children:O.when}),e.jsx("div",{className:"mdt-text-muted-foreground",children:O.what})]})]},O.what))})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"mdt-mb-3 mdt-text-sm mdt-font-medium",children:"Provision status"}),e.jsxs("p",{className:"mdt-text-sm mdt-leading-snug mdt-text-muted-foreground",children:["Case"," ",e.jsx("a",{href:"#case",className:"mdt-font-medium mdt-text-foreground mdt-underline mdt-underline-offset-2",children:"#00001"}),", created by RJ Smithson on 02/09/2019 9:30AM"]})]})]})})})]},o.id)})})]})}},z={render:()=>e.jsxs(b,{striped:!0,children:[e.jsx(y,{children:"A summary row is never striped and offers no hover — it is a conclusion, not a record."}),e.jsx(u,{children:e.jsxs(d,{children:[e.jsx(a,{children:"Post"}),e.jsx(a,{align:"right",children:"Impressions"}),e.jsx(a,{align:"right",children:"Engagements"})]})}),e.jsxs(p,{children:[e.jsxs(d,{summary:!0,children:[e.jsx(l,{children:"3 posts"}),e.jsx(l,{align:"right",children:"53"}),e.jsx(l,{align:"right",children:"11"})]}),[{post:"Launch announcement",impressions:29,engagements:5},{post:"Design system update",impressions:13,engagements:5},{post:"Hiring: product designer",impressions:11,engagements:1}].map(t=>e.jsxs(d,{children:[e.jsx(l,{children:t.post}),e.jsx(l,{align:"right",children:t.impressions}),e.jsx(l,{align:"right",children:t.engagements})]},t.post))]})]})},U={render:()=>e.jsxs(b,{maxHeight:"16rem",layout:"fixed",containerClassName:"mdt-rounded-md mdt-border",children:[e.jsx(u,{children:e.jsxs(d,{children:[e.jsx(a,{children:"Post"}),e.jsx(a,{align:"right",children:"Impressions"}),e.jsx(a,{align:"right",children:"Engagements"})]})}),e.jsxs(p,{children:[e.jsxs(d,{summary:!0,sticky:"top",children:[e.jsx(l,{children:"20 posts"}),e.jsx(l,{align:"right",children:"1,204"}),e.jsx(l,{align:"right",children:"318"})]}),Array.from({length:20},(t,s)=>e.jsxs(d,{children:[e.jsxs(l,{children:["Post ",s+1]}),e.jsx(l,{align:"right",children:(s+1)*13}),e.jsx(l,{align:"right",children:(s+1)*3})]},s)),e.jsxs(d,{summary:!0,sticky:"bottom",children:[e.jsx(l,{children:"Average"}),e.jsx(l,{align:"right",children:"60"}),e.jsx(l,{align:"right",children:"16"})]})]})]})},q={render:()=>e.jsxs(b,{stickyHeader:!0,maxHeight:"18rem",containerClassName:"mdt-max-w-2xl mdt-rounded-md mdt-border",className:"mdt-min-w-max",children:[e.jsx(u,{children:e.jsxs(d,{children:[e.jsx(a,{frozen:!0,className:"mdt-w-44",children:"Market"}),["Base","Quote","Price","24h low","24h high","24h change","Funding"].map(t=>e.jsx(a,{align:"right",className:"mdt-w-32",children:t},t))]})}),e.jsx(p,{children:Array.from({length:14},(t,s)=>e.jsxs(d,{children:[e.jsxs(l,{frozen:!0,className:"mdt-font-medium",children:["PAIR-",s+1]}),e.jsx(l,{align:"right",children:"Bitcoin"}),e.jsx(l,{align:"right",children:"US Dollar"}),e.jsx(l,{align:"right",children:(9e4+s*137).toLocaleString()}),e.jsx(l,{align:"right",children:(87e3+s*91).toLocaleString()}),e.jsx(l,{align:"right",children:(91e3+s*113).toLocaleString()}),e.jsxs(l,{align:"right",children:[(s*.13).toFixed(2),"%"]}),e.jsxs(l,{align:"right",children:["0.000",s,"%"]})]},s))})]})},$={render:function(){const{widths:s,setWidth:i,reset:m,isResized:T}=Yl({name:200,email:260,role:140}),r=[{key:"name",label:"Name"},{key:"email",label:"Email"},{key:"role",label:"Role"}];return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-start mdt-gap-3",children:[e.jsx(Ql,{variant:"outline",size:"sm",onClick:m,disabled:!T,children:"Reset widths"}),e.jsxs(b,{layout:"fixed",containerClassName:"mdt-rounded-md mdt-border",children:[e.jsx(u,{children:e.jsxs(d,{children:[r.map(n=>e.jsx(a,{resizable:!0,width:s[n.key],onResize:o=>{i(n.key,o)},children:n.label},n.key)),e.jsx(a,{children:"Status"})]})}),e.jsx(p,{children:g.map(n=>e.jsxs(d,{children:[e.jsx(l,{className:"mdt-truncate mdt-font-medium",children:n.name}),e.jsx(l,{className:"mdt-truncate",children:n.email}),e.jsx(l,{className:"mdt-truncate",children:n.role}),e.jsx(l,{className:"mdt-truncate",children:n.status})]},n.id))})]})]})}};var Q,X,Y,ee,le;S.parameters={...S.parameters,docs:{...(Q=S.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    density: 'compact',
    striped: false,
    layout: 'auto'
  },
  render: args => <TableOld {...args}>
      <TableHeaderOld>
        <TableRowOld>
          <TableHeadOld className="mdt-w-[100px]">Invoice</TableHeadOld>
          <TableHeadOld>Status</TableHeadOld>
          <TableHeadOld>Method</TableHeadOld>
          <TableHeadOld className="mdt-text-right">Amount</TableHeadOld>
        </TableRowOld>
      </TableHeaderOld>
      <TableBodyOld>
        {invoices.map(invoice => <TableRowOld key={invoice.invoice}>
            <TableCellOld className="mdt-font-medium">{invoice.invoice}</TableCellOld>
            <TableCellOld>{invoice.paymentStatus}</TableCellOld>
            <TableCellOld>{invoice.paymentMethod}</TableCellOld>
            <TableCellOld className="mdt-text-right">{invoice.totalAmount}</TableCellOld>
          </TableRowOld>)}
      </TableBodyOld>
    </TableOld>
}`,...(Y=(X=S.parameters)==null?void 0:X.docs)==null?void 0:Y.source},description:{story:"Default table with basic invoice data.",...(le=(ee=S.parameters)==null?void 0:ee.docs)==null?void 0:le.description}}};var ae,te,se,de,ne;N.parameters={...N.parameters,docs:{...(ae=N.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: () => <TableOld>
      <TableCaptionOld>A list of your recent invoices.</TableCaptionOld>
      <TableHeaderOld>
        <TableRowOld>
          <TableHeadOld className="mdt-w-[100px]">Invoice</TableHeadOld>
          <TableHeadOld>Status</TableHeadOld>
          <TableHeadOld>Method</TableHeadOld>
          <TableHeadOld className="mdt-text-right">Amount</TableHeadOld>
        </TableRowOld>
      </TableHeaderOld>
      <TableBodyOld>
        {invoices.slice(0, 5).map(invoice => <TableRowOld key={invoice.invoice}>
            <TableCellOld className="mdt-font-medium">{invoice.invoice}</TableCellOld>
            <TableCellOld>{invoice.paymentStatus}</TableCellOld>
            <TableCellOld>{invoice.paymentMethod}</TableCellOld>
            <TableCellOld className="mdt-text-right">{invoice.totalAmount}</TableCellOld>
          </TableRowOld>)}
      </TableBodyOld>
    </TableOld>
}`,...(se=(te=N.parameters)==null?void 0:te.docs)==null?void 0:se.source},description:{story:"TableOld with a caption describing the data.",...(ne=(de=N.parameters)==null?void 0:de.docs)==null?void 0:ne.description}}};var re,oe,ie,ce,me;H.parameters={...H.parameters,docs:{...(re=H.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => <TableOld>
      <TableHeaderOld>
        <TableRowOld>
          <TableHeadOld className="mdt-w-[100px]">Invoice</TableHeadOld>
          <TableHeadOld>Status</TableHeadOld>
          <TableHeadOld>Method</TableHeadOld>
          <TableHeadOld className="mdt-text-right">Amount</TableHeadOld>
        </TableRowOld>
      </TableHeaderOld>
      <TableBodyOld>
        {invoices.slice(0, 5).map(invoice => <TableRowOld key={invoice.invoice}>
            <TableCellOld className="mdt-font-medium">{invoice.invoice}</TableCellOld>
            <TableCellOld>{invoice.paymentStatus}</TableCellOld>
            <TableCellOld>{invoice.paymentMethod}</TableCellOld>
            <TableCellOld className="mdt-text-right">{invoice.totalAmount}</TableCellOld>
          </TableRowOld>)}
      </TableBodyOld>
      <TableFooterOld>
        <TableRowOld>
          <TableCellOld colSpan={3}>Total</TableCellOld>
          <TableCellOld className="mdt-text-right">$2,500.00</TableCellOld>
        </TableRowOld>
      </TableFooterOld>
    </TableOld>
}`,...(ie=(oe=H.parameters)==null?void 0:oe.docs)==null?void 0:ie.source},description:{story:"TableOld with a footer row showing totals.",...(me=(ce=H.parameters)==null?void 0:ce.docs)==null?void 0:me.description}}};var he,be,ue,pe,Te;k.parameters={...k.parameters,docs:{...(he=k.parameters)==null?void 0:he.docs,source:{originalSource:`{
  render: () => <TableOld striped>
      <TableCaptionOld>
        One prop. Striping applies to body rows only — a striped header reads as a mistake.
      </TableCaptionOld>
      <TableHeaderOld>
        <TableRowOld>
          <TableHeadOld>Name</TableHeadOld>
          <TableHeadOld>Email</TableHeadOld>
          <TableHeadOld>Role</TableHeadOld>
          <TableHeadOld>Status</TableHeadOld>
        </TableRowOld>
      </TableHeaderOld>
      <TableBodyOld>
        {users.map(user => <TableRowOld key={user.id}>
            <TableCellOld className="mdt-font-medium">{user.name}</TableCellOld>
            <TableCellOld>{user.email}</TableCellOld>
            <TableCellOld>{user.role}</TableCellOld>
            <TableCellOld>{user.status}</TableCellOld>
          </TableRowOld>)}
      </TableBodyOld>
    </TableOld>
}`,...(ue=(be=k.parameters)==null?void 0:be.docs)==null?void 0:ue.source},description:{story:"TableOld with alternating row colors (striped).",...(Te=(pe=k.parameters)==null?void 0:pe.docs)==null?void 0:Te.description}}};var Oe,ge,xe,ye,we;R.parameters={...R.parameters,docs:{...(Oe=R.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-8">
      {(['short', 'compact', 'default', 'relaxed'] as const).map(density => <div key={density}>
          <p className="mdt-mb-2 mdt-text-sm mdt-font-medium mdt-text-muted-foreground">
            density=&quot;{density}&quot;
          </p>
          <TableOld density={density}>
            <TableHeaderOld>
              <TableRowOld>
                <TableHeadOld>Name</TableHeadOld>
                <TableHeadOld>Email</TableHeadOld>
                <TableHeadOld>Role</TableHeadOld>
              </TableRowOld>
            </TableHeaderOld>
            <TableBodyOld>
              {users.slice(0, 2).map(user => <TableRowOld key={user.id}>
                  <TableCellOld className="mdt-font-medium">{user.name}</TableCellOld>
                  <TableCellOld>{user.email}</TableCellOld>
                  <TableCellOld>{user.role}</TableCellOld>
                </TableRowOld>)}
            </TableBodyOld>
          </TableOld>
        </div>)}
    </div>
}`,...(xe=(ge=R.parameters)==null?void 0:ge.docs)==null?void 0:xe.source},description:{story:"All three densities, side by side. `default` is exactly the spacing this table\nhad before density existed, so an existing table does not move.",...(we=(ye=R.parameters)==null?void 0:ye.docs)==null?void 0:we.description}}};var je,fe,Ce,ve,Se;P.parameters={...P.parameters,docs:{...(je=P.parameters)==null?void 0:je.docs,source:{originalSource:`{
  render: () => <TableOld>
      <TableCaptionOld>
        Numbers on the right. This one rule fixes most “messy table” complaints.
      </TableCaptionOld>
      <TableHeaderOld>
        <TableRowOld>
          <TableHeadOld>Item</TableHeadOld>
          <TableHeadOld align="center">Qty</TableHeadOld>
          <TableHeadOld align="right">Unit price</TableHeadOld>
          <TableHeadOld align="right">Total</TableHeadOld>
        </TableRowOld>
      </TableHeaderOld>
      <TableBodyOld>
        {[{
        item: 'Annual licence',
        qty: 12,
        unit: '1,204.00',
        total: '14,448.00'
      }, {
        item: 'Support hours',
        qty: 3,
        unit: '95.50',
        total: '286.50'
      }, {
        item: 'Onboarding',
        qty: 1,
        unit: '2,000.00',
        total: '2,000.00'
      }].map(row => <TableRowOld key={row.item}>
            <TableCellOld className="mdt-font-medium">{row.item}</TableCellOld>
            <TableCellOld align="center">{row.qty}</TableCellOld>
            <TableCellOld align="right">{row.unit}</TableCellOld>
            <TableCellOld align="right">{row.total}</TableCellOld>
          </TableRowOld>)}
      </TableBodyOld>
      <TableFooterOld>
        <TableRowOld>
          <TableCellOld colSpan={3}>Total</TableCellOld>
          <TableCellOld align="right">16,734.50</TableCellOld>
        </TableRowOld>
      </TableFooterOld>
    </TableOld>
}`,...(Ce=(fe=P.parameters)==null?void 0:fe.docs)==null?void 0:Ce.source},description:{story:`Alignment follows the **data type**, not preference: text left, numbers right
so digits line up by place value and magnitudes compare at a glance.`,...(Se=(ve=P.parameters)==null?void 0:ve.docs)==null?void 0:Se.description}}};var Ne,He,ke,Re,Pe;A.parameters={...A.parameters,docs:{...(Ne=A.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
  render: () => <TableOld stickyHeader maxHeight="16rem" density="short" containerClassName="mdt-rounded-md mdt-border">
      <TableHeaderOld>
        <TableRowOld>
          <TableHeadOld>#</TableHeadOld>
          <TableHeadOld>Name</TableHeadOld>
          <TableHeadOld>Email</TableHeadOld>
          <TableHeadOld align="right">Score</TableHeadOld>
        </TableRowOld>
      </TableHeaderOld>
      <TableBodyOld>
        {Array.from({
        length: 30
      }, (_, i) => <TableRowOld key={i}>
            <TableCellOld>{i + 1}</TableCellOld>
            <TableCellOld className="mdt-font-medium">Row {i + 1}</TableCellOld>
            <TableCellOld>row{i + 1}@example.com</TableCellOld>
            <TableCellOld align="right">{(i + 1) * 7}</TableCellOld>
          </TableRowOld>)}
      </TableBodyOld>
    </TableOld>
}`,...(ke=(He=A.parameters)==null?void 0:He.docs)==null?void 0:ke.source},description:{story:`A sticky header becomes necessary the moment a table is tall enough that the
column titles scroll out of view. Scroll the area below to see it hold.`,...(Pe=(Re=A.parameters)==null?void 0:Re.docs)==null?void 0:Pe.description}}};var Ae,Ie,Be,Ee,Me;I.parameters={...I.parameters,docs:{...(Ae=I.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  render: function SortableTable() {
    type SortKey = 'name' | 'email' | 'role' | 'status';
    const [sortKey, setSortKey] = useState<SortKey | null>(null);
    const [sortOrder, setSortOrder] = useState<TableSortOrderOld>(null);

    // Ascending, then descending, then off. Cycling back to unsorted matters:
    // without it there is no way back to the data's natural order.
    const handleSort = (key: SortKey) => {
      if (sortKey !== key) {
        setSortKey(key);
        setSortOrder('ascend');
        return;
      }
      if (sortOrder === 'ascend') {
        setSortOrder('descend');
        return;
      }
      setSortKey(null);
      setSortOrder(null);
    };
    const sortedUsers = [...users].sort((a, b) => {
      if (!sortKey || !sortOrder) return 0;
      const direction = sortOrder === 'ascend' ? 1 : -1;
      return a[sortKey] > b[sortKey] ? direction : -direction;
    });
    const columns: {
      key: SortKey;
      label: string;
    }[] = [{
      key: 'name',
      label: 'Name'
    }, {
      key: 'email',
      label: 'Email'
    }, {
      key: 'role',
      label: 'Role'
    }, {
      key: 'status',
      label: 'Status'
    }];
    return <TableOld>
        <TableCaptionOld>
          Click a header to sort. Third click returns to the unsorted order.
        </TableCaptionOld>
        <TableHeaderOld>
          <TableRowOld>
            {columns.map(column => <TableHeadOld key={column.key} sortable sortOrder={sortKey === column.key ? sortOrder : null} onSort={() => {
            handleSort(column.key);
          }}>
                {column.label}
              </TableHeadOld>)}
          </TableRowOld>
        </TableHeaderOld>
        <TableBodyOld>
          {sortedUsers.map(user => <TableRowOld key={user.id}>
              <TableCellOld className="mdt-font-medium">{user.name}</TableCellOld>
              <TableCellOld>{user.email}</TableCellOld>
              <TableCellOld>{user.role}</TableCellOld>
              <TableCellOld>{user.status}</TableCellOld>
            </TableRowOld>)}
        </TableBodyOld>
      </TableOld>;
  }
}`,...(Be=(Ie=I.parameters)==null?void 0:Ie.docs)==null?void 0:Be.source},description:{story:`Sorting is a contract, not an implementation. \`TableHeadOld\` renders the control
and the affordance and sets \`aria-sort\`; the sorting itself stays yours, so
you can sort locally, on a server, or through TanStack TableOld without the
component getting in the way.

A column that is sortable but not currently sorted shows a neutral
double-arrow rather than an arrow pointing somewhere arbitrary — an arrow with
no state is the commonest sort bug there is.`,...(Me=(Ee=I.parameters)==null?void 0:Ee.docs)==null?void 0:Me.description}}};var Fe,De,Le,Ke,ze;B.parameters={...B.parameters,docs:{...(Fe=B.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  render: function Selectable() {
    // \`useTableSelectionOld\` rather than a hand-rolled array: it brings shift-click
    // ranges and the indeterminate header state, both of which this story used
    // to be missing.
    const selection = useTableSelectionOld({
      rowIds: users.map(user => user.id)
    });
    return <div>
        <div className="mdt-mb-4 mdt-text-sm mdt-text-muted-foreground">
          {selection.count} of {users.length} row(s) selected.
        </div>
        <TableOld>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld className="mdt-w-[50px]">
                <Checkbox checked={selection.headerState} onCheckedChange={selection.toggleAll} aria-label="Select all rows" />
              </TableHeadOld>
              <TableHeadOld>Name</TableHeadOld>
              <TableHeadOld>Email</TableHeadOld>
              <TableHeadOld>Role</TableHeadOld>
              <TableHeadOld>Status</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
          <TableBodyOld>
            {users.map(user => <TableRowOld key={user.id} selected={selection.isSelected(user.id)}>
                <TableCellOld>
                  {/*
                    The shift key arrives on the click, not the change:
                    \`onCheckedChange\` reports the new value and nothing about
                    the modifiers.
                   */}
                  <Checkbox checked={selection.isSelected(user.id)} onClick={event => {
                selection.toggle(user.id, {
                  extend: event.shiftKey
                });
              }} aria-label={\`Select \${user.name}\`} />
                </TableCellOld>
                <TableCellOld className="mdt-font-medium">{user.name}</TableCellOld>
                <TableCellOld>{user.email}</TableCellOld>
                <TableCellOld>{user.role}</TableCellOld>
                <TableCellOld>{user.status}</TableCellOld>
              </TableRowOld>)}
          </TableBodyOld>
        </TableOld>
      </div>;
  }
}`,...(Le=(De=B.parameters)==null?void 0:De.docs)==null?void 0:Le.source},description:{story:"TableOld with selectable rows using checkboxes.",...(ze=(Ke=B.parameters)==null?void 0:Ke.docs)==null?void 0:ze.description}}};var Ue,qe,$e;V.parameters={...V.parameters,docs:{...(Ue=V.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  render: () => <TableOld density="short">
      <TableCaptionOld>One prop on the table, not a class on every cell.</TableCaptionOld>
      <TableHeaderOld>
        <TableRowOld>
          <TableHeadOld align="right">ID</TableHeadOld>
          <TableHeadOld>Name</TableHeadOld>
          <TableHeadOld>Email</TableHeadOld>
          <TableHeadOld>Role</TableHeadOld>
        </TableRowOld>
      </TableHeaderOld>
      <TableBodyOld>
        {users.map(user => <TableRowOld key={user.id}>
            <TableCellOld align="right">{user.id}</TableCellOld>
            <TableCellOld className="mdt-font-medium">{user.name}</TableCellOld>
            <TableCellOld>{user.email}</TableCellOld>
            <TableCellOld>{user.role}</TableCellOld>
          </TableRowOld>)}
      </TableBodyOld>
    </TableOld>
}`,...($e=(qe=V.parameters)==null?void 0:qe.docs)==null?void 0:$e.source}}};var We,Ge,Ve,_e,Je;E.parameters={...E.parameters,docs:{...(We=E.parameters)==null?void 0:We.docs,source:{originalSource:`{
  render: () => <TableOld>
      <TableCaptionOld>Loading table data...</TableCaptionOld>
      <TableHeaderOld>
        <TableRowOld>
          <TableHeadOld>Invoice</TableHeadOld>
          <TableHeadOld>Status</TableHeadOld>
          <TableHeadOld>Method</TableHeadOld>
          <TableHeadOld className="mdt-text-right">Amount</TableHeadOld>
        </TableRowOld>
      </TableHeaderOld>
      <TableBodyOld>
        {[1, 2, 3, 4, 5].map(i => <TableRowOld key={i}>
            <TableCellOld>
              <Skeleton className="mdt-h-4 mdt-w-[80px]" />
            </TableCellOld>
            <TableCellOld>
              <Skeleton className="mdt-h-4 mdt-w-[100px]" />
            </TableCellOld>
            <TableCellOld>
              <Skeleton className="mdt-h-4 mdt-w-[120px]" />
            </TableCellOld>
            <TableCellOld className="mdt-text-right">
              <Skeleton className="mdt-ml-auto mdt-h-4 mdt-w-[80px]" />
            </TableCellOld>
          </TableRowOld>)}
      </TableBodyOld>
    </TableOld>
}`,...(Ve=(Ge=E.parameters)==null?void 0:Ge.docs)==null?void 0:Ve.source},description:{story:"TableOld showing loading state with skeletons.",...(Je=(_e=E.parameters)==null?void 0:_e.docs)==null?void 0:Je.description}}};var Ze,Qe,Xe,Ye,el;M.parameters={...M.parameters,docs:{...(Ze=M.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
  render: function PaginatedTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(invoices.length / itemsPerPage);
    const paginatedData = invoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return <div className="mdt-space-y-4">
        <TableOld>
          <TableCaptionOld>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, invoices.length)} of {invoices.length} invoices.
          </TableCaptionOld>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld className="mdt-w-[100px]">Invoice</TableHeadOld>
              <TableHeadOld>Status</TableHeadOld>
              <TableHeadOld>Method</TableHeadOld>
              <TableHeadOld className="mdt-text-right">Amount</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
          <TableBodyOld>
            {paginatedData.map(invoice => <TableRowOld key={invoice.invoice}>
                <TableCellOld className="mdt-font-medium">{invoice.invoice}</TableCellOld>
                <TableCellOld>{invoice.paymentStatus}</TableCellOld>
                <TableCellOld>{invoice.paymentMethod}</TableCellOld>
                <TableCellOld className="mdt-text-right">{invoice.totalAmount}</TableCellOld>
              </TableRowOld>)}
          </TableBodyOld>
        </TableOld>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={e => {
              e.preventDefault();
              setCurrentPage(prev => Math.max(1, prev - 1));
            }} />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) =>
          // eslint-disable-next-line react/no-array-index-key
          <PaginationItem key={i + 1}>
                <PaginationLink href="#" isActive={currentPage === i + 1} onClick={e => {
              e.preventDefault();
              setCurrentPage(i + 1);
            }}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>)}
            <PaginationItem>
              <PaginationNext href="#" onClick={e => {
              e.preventDefault();
              setCurrentPage(prev => Math.min(totalPages, prev + 1));
            }} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>;
  }
}`,...(Xe=(Qe=M.parameters)==null?void 0:Qe.docs)==null?void 0:Xe.source},description:{story:"TableOld with pagination controls.",...(el=(Ye=M.parameters)==null?void 0:Ye.docs)==null?void 0:el.description}}};var ll,al,tl,sl,dl;F.parameters={...F.parameters,docs:{...(ll=F.parameters)==null?void 0:ll.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-8">
      {[{
      state: 'Empty',
      icon: 'inbox' as const,
      title: 'No invoices yet.',
      body: 'Raise one and it will appear here.',
      action: 'New invoice'
    }, {
      state: 'Filtered empty',
      icon: 'search-x' as const,
      title: 'No invoices match your filters.',
      body: 'There are 248 invoices, none of them in this view.',
      action: 'Clear filters'
    }].map(empty => <div key={empty.state} className="mdt-flex mdt-flex-col mdt-gap-2">
          <p className="mdt-text-xs mdt-font-medium mdt-text-muted-foreground">{empty.state}</p>
          <TableOld>
            <TableHeaderOld>
              <TableRowOld>
                <TableHeadOld className="mdt-w-[100px]">Invoice</TableHeadOld>
                <TableHeadOld>Status</TableHeadOld>
                <TableHeadOld>Method</TableHeadOld>
                <TableHeadOld className="mdt-text-right">Amount</TableHeadOld>
              </TableRowOld>
            </TableHeaderOld>
            <TableBodyOld>
              <TableRowOld interactive={false}>
                <TableCellOld colSpan={4} className="mdt-p-0">
                  <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2 mdt-py-10">
                    <Icon name={empty.icon} size="xl" color="muted" className="mdt-opacity-50" />
                    <p className="mdt-text-sm mdt-font-medium">{empty.title}</p>
                    <p className="mdt-text-sm mdt-text-muted-foreground">{empty.body}</p>
                    <Button variant={empty.state === 'Empty' ? 'primary' : 'outline'} size="sm">
                      {empty.action}
                    </Button>
                  </div>
                </TableCellOld>
              </TableRowOld>
            </TableBodyOld>
          </TableOld>
        </div>)}
    </div>
}`,...(tl=(al=F.parameters)==null?void 0:al.docs)==null?void 0:tl.source},description:{story:`TableOld showing empty state.
Three states, three different messages - and getting two of them the wrong
way round is the common mistake.

- **Empty** is the honest "there is nothing here yet", and offers the way to
  make something.
- **Filtered empty** has data; you just cannot see it. The way out is to undo
  the filter, not to create a record you do not need. Saying "no invoices
  yet" here sends someone off to duplicate something they already have.
- **Loading** says nothing, because it does not know yet. See the
  \`WithLoadingState\` story - skeleton rows keep the table's shape so the page
  does not jump when the data lands.`,...(dl=(sl=F.parameters)==null?void 0:sl.docs)==null?void 0:dl.description}}};var nl,rl,ol;_.parameters={..._.parameters,docs:{...(nl=_.parameters)==null?void 0:nl.docs,source:{originalSource:`{
  render: function FullFeaturedTable() {
    type SortKey = 'name' | 'email' | 'role' | 'status';
    const [sortKey, setSortKey] = useState<SortKey | null>(null);
    const [sortOrder, setSortOrder] = useState<TableSortOrderOld>(null);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const handleSort = (key: SortKey) => {
      if (sortKey !== key) {
        setSortKey(key);
        setSortOrder('ascend');
        return;
      }
      if (sortOrder === 'ascend') {
        setSortOrder('descend');
        return;
      }
      setSortKey(null);
      setSortOrder(null);
    };
    const sortedUsers = [...users].sort((a, b) => {
      if (!sortKey || !sortOrder) return 0;
      const direction = sortOrder === 'ascend' ? 1 : -1;
      return a[sortKey] > b[sortKey] ? direction : -direction;
    });
    const toggleRow = (id: number) => {
      setSelectedRows(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]);
    };
    const allSelected = selectedRows.length === users.length;
    const columns: {
      key: SortKey;
      label: string;
    }[] = [{
      key: 'name',
      label: 'Name'
    }, {
      key: 'email',
      label: 'Email'
    }, {
      key: 'role',
      label: 'Role'
    }, {
      key: 'status',
      label: 'Status'
    }];
    return <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <p className="mdt-text-sm mdt-text-muted-foreground">
          {selectedRows.length} of {users.length} row(s) selected.
        </p>

        <TableOld stickyHeader maxHeight="18rem" layout="fixed" containerClassName="mdt-rounded-md mdt-border">
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld className="mdt-w-12">
                <Checkbox checked={allSelected} onCheckedChange={() => {
                setSelectedRows(allSelected ? [] : users.map(u => u.id));
              }} aria-label="Select all rows" />
              </TableHeadOld>
              {columns.map(column => <TableHeadOld key={column.key} sortable sortOrder={sortKey === column.key ? sortOrder : null} onSort={() => {
              handleSort(column.key);
            }}>
                  {column.label}
                </TableHeadOld>)}
            </TableRowOld>
          </TableHeaderOld>
          <TableBodyOld>
            {sortedUsers.map(user => <TableRowOld key={user.id} selected={selectedRows.includes(user.id)}>
                <TableCellOld>
                  <Checkbox checked={selectedRows.includes(user.id)} onCheckedChange={() => {
                toggleRow(user.id);
              }} aria-label={\`Select \${user.name}\`} />
                </TableCellOld>
                <TableCellOld className="mdt-font-medium">{user.name}</TableCellOld>
                <TableCellOld>{user.email}</TableCellOld>
                <TableCellOld>{user.role}</TableCellOld>
                <TableCellOld>{user.status}</TableCellOld>
              </TableRowOld>)}
          </TableBodyOld>
        </TableOld>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>;
  }
}`,...(ol=(rl=_.parameters)==null?void 0:rl.docs)==null?void 0:ol.source}}};var il,cl,ml,hl,bl;D.parameters={...D.parameters,docs:{...(il=D.parameters)==null?void 0:il.docs,source:{originalSource:`{
  render: function Grouped() {
    const groups = [{
      name: 'Mobile App',
      rows: users.slice(0, 2)
    }, {
      name: 'Platform',
      rows: users.slice(2, 5)
    }];
    const [collapsed, setCollapsed] = useState<string[]>([]);
    const toggle = (name: string) => {
      setCollapsed(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
    };
    return <TableOld layout="fixed">
        <TableCaptionOld>
          Click a group heading to collapse it. \`layout=&quot;fixed&quot;\` keeps the columns still —
          without it the browser re-measures from whatever rows are left and every column jumps.
        </TableCaptionOld>
        <TableHeaderOld>
          <TableRowOld>
            <TableHeadOld className="mdt-w-1/3">Name</TableHeadOld>
            <TableHeadOld className="mdt-w-1/2">Email</TableHeadOld>
            <TableHeadOld>Role</TableHeadOld>
          </TableRowOld>
        </TableHeaderOld>
        <TableBodyOld>
          {groups.map(group => <Fragment key={group.name}>
              <TableGroupRowOld colSpan={3} count={group.rows.length} expanded={!collapsed.includes(group.name)} onToggle={() => {
            toggle(group.name);
          }}>
                {group.name}
              </TableGroupRowOld>
              {!collapsed.includes(group.name) && group.rows.map(user => <TableRowOld key={user.id}>
                    <TableCellOld className="mdt-font-medium">{user.name}</TableCellOld>
                    <TableCellOld>{user.email}</TableCellOld>
                    <TableCellOld>{user.role}</TableCellOld>
                  </TableRowOld>)}
            </Fragment>)}
        </TableBodyOld>
      </TableOld>;
  }
}`,...(ml=(cl=D.parameters)==null?void 0:cl.docs)==null?void 0:ml.source},description:{story:"Grouped rows were the commonest structure across the reference tables — Jira,\nHeight, ClickUp, GitHub Projects, Attio and bank statements all use them.\n\n`TableGroupRowOld` spans the whole table. Pass `onToggle` to make it collapsible;\nleave it off and no control is rendered, rather than a dead one.",...(bl=(hl=D.parameters)==null?void 0:hl.docs)==null?void 0:bl.description}}};var ul,pl,Tl,Ol,gl;L.parameters={...L.parameters,docs:{...(ul=L.parameters)==null?void 0:ul.docs,source:{originalSource:`{
  render: function Expandable() {
    const [open, setOpen] = useState<number[]>([1]);
    const entries: Record<number, {
      label: string;
      hours: string;
    }[]> = {
      1: [{
        label: '06:51 – 09:21',
        hours: '2h 30m'
      }, {
        label: '09:20 – 09:21',
        hours: '0h'
      }],
      2: [{
        label: '10:00 – 10:39',
        hours: '38m'
      }]
    };
    const toggle = (id: number) => {
      setOpen(prev => prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]);
    };
    return <TableOld>
        <TableCaptionOld>Expand a task to see its time entries.</TableCaptionOld>
        <TableHeaderOld>
          <TableRowOld>
            <TableHeadOld>Task</TableHeadOld>
            <TableHeadOld align="right">Total</TableHeadOld>
          </TableRowOld>
        </TableHeaderOld>
        <TableBodyOld>
          {[1, 2].map(id => <Fragment key={id}>
              <TableRowOld>
                <TableCellOld>
                  <span className="mdt-inline-flex mdt-items-center mdt-gap-2">
                    <TableExpandTriggerOld expanded={open.includes(id)} onToggle={() => {
                  toggle(id);
                }} label={\`Show entries for task \${String(id)}\`} />
                    <span className="mdt-font-medium">Feature {id === 1 ? 'A' : 'B'}</span>
                  </span>
                </TableCellOld>
                <TableCellOld align="right">{id === 1 ? '2h 30m' : '38m'}</TableCellOld>
              </TableRowOld>
              {open.includes(id) && entries[id]?.map(entry => <TableRowOld key={entry.label}>
                    <TableCellOld indent={1} className="mdt-text-muted-foreground">
                      {entry.label}
                    </TableCellOld>
                    <TableCellOld align="right">{entry.hours}</TableCellOld>
                  </TableRowOld>)}
            </Fragment>)}
        </TableBodyOld>
      </TableOld>;
  }
}`,...(Tl=(pl=L.parameters)==null?void 0:pl.docs)==null?void 0:Tl.source},description:{story:`A row that reveals child rows beneath it. \`TableExpandTriggerOld\` is a control you
place in a cell rather than a prop on the row — where the chevron belongs
differs from table to table, and the component has no business owning your
tree state.

Child rows use \`indent\` on their **first cell only**. Indenting every cell
shifts the whole row and breaks the column alignment that makes a table
readable.`,...(gl=(Ol=L.parameters)==null?void 0:Ol.docs)==null?void 0:gl.description}}};var xl,yl,wl,jl,fl;K.parameters={...K.parameters,docs:{...(xl=K.parameters)==null?void 0:xl.docs,source:{originalSource:`{
  render: function ExpandedRowContentRecipe() {
    const [open, setOpen] = useState<string[]>(['DAL03']);
    const toggle = (id: string) => {
      setOpen(prev => prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]);
    };
    const sites = [{
      id: 'DAL03',
      name: 'Dallas-03',
      provider: 'Equinix',
      kind: 'Connect',
      status: 'inProcess'
    }, {
      id: 'LON01',
      name: 'London-01',
      provider: 'Telehouse',
      kind: 'Direct',
      status: 'resolved'
    }] as const;
    const detail = [['Date created', 'Mon, 15 Jul 2019 17:52:57 GMT'], ['User IP address', '10.123.11/29'], ['BGP ASN', '63888'], ['Router', 'ZCV-DRK-TZ-03']];
    const activity = [{
      icon: 'info' as const,
      tone: 'mdt-text-muted-foreground',
      when: '10/23/2018 9:30AM',
      what: 'LOA awaiting action'
    }, {
      icon: 'check-circle' as const,
      tone: 'mdt-text-success',
      when: '10/23/2018 9:31AM',
      what: 'LOA approved'
    }];
    return <TableOld>
        <TableHeaderOld>
          <TableRowOld>
            <TableHeadOld>Name</TableHeadOld>
            <TableHeadOld>Site</TableHeadOld>
            <TableHeadOld>Provider</TableHeadOld>
            <TableHeadOld>Status</TableHeadOld>
          </TableRowOld>
        </TableHeaderOld>
        <TableBodyOld>
          {sites.map(site => {
          const isOpen = open.includes(site.id);
          const panelId = \`panel-\${site.id}\`;
          return <Fragment key={site.id}>
                <TableRowOld>
                  <TableCellOld>
                    <span className="mdt-inline-flex mdt-items-center mdt-gap-2">
                      <TableExpandTriggerOld expanded={isOpen} onToggle={() => {
                    toggle(site.id);
                  }} label={\`Show details for \${site.name}\`} aria-controls={panelId} />
                      <span className="mdt-font-medium">{site.name}</span>
                    </span>
                  </TableCellOld>
                  <TableCellOld>{site.id}</TableCellOld>
                  <TableCellOld>{site.provider}</TableCellOld>
                  <TableCellOld>
                    <Badge tone={site.status === 'inProcess' ? 'warning' : 'success'} shape="square" size="sm" dot>
                      {site.status === 'inProcess' ? 'In Process' : 'Resolved'}
                    </Badge>
                  </TableCellOld>
                </TableRowOld>
                {isOpen && <TableRowOld
            // Not a record: no hover feedback, and a quiet surface so it
            // reads as a drawer behind the row rather than another one.
            className="hover:mdt-bg-transparent">
                    <TableCellOld colSpan={4} id={panelId} className="mdt-bg-muted/30 mdt-p-6 mdt-pl-14">
                      <div className="mdt-grid mdt-gap-8 md:mdt-grid-cols-3">
                        <dl className="mdt-grid mdt-grid-cols-[auto_1fr] mdt-gap-x-6 mdt-gap-y-2 mdt-text-sm">
                          {detail.map(([label, value]) => <Fragment key={label}>
                              <dt className="mdt-font-medium">{label}</dt>
                              <dd className="mdt-text-muted-foreground">{value}</dd>
                            </Fragment>)}
                        </dl>

                        <div>
                          <h4 className="mdt-mb-3 mdt-text-sm mdt-font-medium">Latest activity</h4>
                          <ol className="mdt-space-y-3">
                            {activity.map((item, index) => <li key={item.what} className="mdt-flex mdt-gap-3">
                                <div className="mdt-flex mdt-flex-col mdt-items-center">
                                  <Icon name={item.icon} size="sm" className={item.tone} aria-hidden />
                                  {/* The connector stops after the last entry. */}
                                  {index < activity.length - 1 && <span className="mdt-mt-1 mdt-w-px mdt-flex-1 mdt-bg-border" />}
                                </div>
                                <div className="mdt-text-sm mdt-leading-tight">
                                  <div>{item.when}</div>
                                  <div className="mdt-text-muted-foreground">{item.what}</div>
                                </div>
                              </li>)}
                          </ol>
                        </div>

                        <div>
                          <h4 className="mdt-mb-3 mdt-text-sm mdt-font-medium">Provision status</h4>
                          <p className="mdt-text-sm mdt-leading-snug mdt-text-muted-foreground">
                            Case{' '}
                            <a href="#case" className="mdt-font-medium mdt-text-foreground mdt-underline mdt-underline-offset-2">
                              #00001
                            </a>
                            , created by RJ Smithson on 02/09/2019 9:30AM
                          </p>
                        </div>
                      </div>
                    </TableCellOld>
                  </TableRowOld>}
              </Fragment>;
        })}
        </TableBodyOld>
      </TableOld>;
  }
}`,...(wl=(yl=K.parameters)==null?void 0:yl.docs)==null?void 0:wl.source},description:{story:`**Expanded row content** - the panel behind a chevron, and what may live in
it.

The Expandable rows story shows one shape: expanding into **more rows of the
same columns**, a parent with children. That is not the only shape, and the
other one has different rules. Here the row opens into a **panel spanning
every column**, holding a layout of its own - key/value pairs, an activity
trail, a status block. The columns above it mean nothing to it.

Four things this arrangement has to get right, and three of them are easy to
miss:

- **One cell, \`colSpan\` across the lot.** The panel is not a row of cells. If
  you build it as cells it inherits the column widths, and a detail layout
  has no reason to agree with them.
- **It is not a record, so it must not behave like one.** Every body row gets
  hover feedback, which on a panel says "click me" about something that does
  nothing. It is switched off here. \`TableRowOld\` has no prop for this - a
  \`summary\` row opts out the same way and *does* have one, so this is a gap
  worth closing rather than a class worth copying.
- **It breaks striping.** A panel row is a row, so in a striped table it
  takes a stripe of its own and flips the odd/even parity of everything
  below it. Stripes and expandable panels do not combine; pick one.
- **\`aria-controls\` both ways.** The chevron says which panel it opens and
  the panel says nothing on its own, so the two need wiring by id. The
  trigger already handles \`aria-expanded\`.

The panel indents to the first *content* column rather than the chevron, so
the detail lines up with the thing it belongs to.`,...(fl=(jl=K.parameters)==null?void 0:jl.docs)==null?void 0:fl.description}}};var Cl,vl,Sl,Nl,Hl;z.parameters={...z.parameters,docs:{...(Cl=z.parameters)==null?void 0:Cl.docs,source:{originalSource:`{
  render: () => <TableOld striped>
      <TableCaptionOld>
        A summary row is never striped and offers no hover — it is a conclusion, not a record.
      </TableCaptionOld>
      <TableHeaderOld>
        <TableRowOld>
          <TableHeadOld>Post</TableHeadOld>
          <TableHeadOld align="right">Impressions</TableHeadOld>
          <TableHeadOld align="right">Engagements</TableHeadOld>
        </TableRowOld>
      </TableHeaderOld>
      <TableBodyOld>
        <TableRowOld summary>
          <TableCellOld>3 posts</TableCellOld>
          <TableCellOld align="right">53</TableCellOld>
          <TableCellOld align="right">11</TableCellOld>
        </TableRowOld>
        {[{
        post: 'Launch announcement',
        impressions: 29,
        engagements: 5
      }, {
        post: 'Design system update',
        impressions: 13,
        engagements: 5
      }, {
        post: 'Hiring: product designer',
        impressions: 11,
        engagements: 1
      }].map(row => <TableRowOld key={row.post}>
            <TableCellOld>{row.post}</TableCellOld>
            <TableCellOld align="right">{row.impressions}</TableCellOld>
            <TableCellOld align="right">{row.engagements}</TableCellOld>
          </TableRowOld>)}
      </TableBodyOld>
    </TableOld>
}`,...(Sl=(vl=z.parameters)==null?void 0:vl.docs)==null?void 0:Sl.source},description:{story:"A total that sits somewhere other than the table foot. `TableFooterOld` already\ntreats its rows as summaries — `summary` is for a subtotal inside the body, or\na total row at the top, which is what the analytics references do.",...(Hl=(Nl=z.parameters)==null?void 0:Nl.docs)==null?void 0:Hl.description}}};var kl,Rl,Pl,Al,Il;U.parameters={...U.parameters,docs:{...(kl=U.parameters)==null?void 0:kl.docs,source:{originalSource:`{
  render: () => <TableOld maxHeight="16rem" layout="fixed" containerClassName="mdt-rounded-md mdt-border">
      <TableHeaderOld>
        <TableRowOld>
          <TableHeadOld>Post</TableHeadOld>
          <TableHeadOld align="right">Impressions</TableHeadOld>
          <TableHeadOld align="right">Engagements</TableHeadOld>
        </TableRowOld>
      </TableHeaderOld>
      <TableBodyOld>
        <TableRowOld summary sticky="top">
          <TableCellOld>20 posts</TableCellOld>
          <TableCellOld align="right">1,204</TableCellOld>
          <TableCellOld align="right">318</TableCellOld>
        </TableRowOld>
        {Array.from({
        length: 20
      }, (_, i) => <TableRowOld key={i}>
            <TableCellOld>Post {i + 1}</TableCellOld>
            <TableCellOld align="right">{(i + 1) * 13}</TableCellOld>
            <TableCellOld align="right">{(i + 1) * 3}</TableCellOld>
          </TableRowOld>)}
        <TableRowOld summary sticky="bottom">
          <TableCellOld>Average</TableCellOld>
          <TableCellOld align="right">60</TableCellOld>
          <TableCellOld align="right">16</TableCellOld>
        </TableRowOld>
      </TableBodyOld>
    </TableOld>
}`,...(Pl=(Rl=U.parameters)==null?void 0:Rl.docs)==null?void 0:Pl.source},description:{story:`A summary row pinned to the top or bottom of the scroll area.

The shadow appears **only while something is scrolled underneath** the pinned
row. Scroll the table and watch the top row gain a shadow; scroll to the very
bottom and the pinned total loses its own, because at that point it is not
floating over anything.`,...(Il=(Al=U.parameters)==null?void 0:Al.docs)==null?void 0:Il.description}}};var Bl,El,Ml,Fl,Dl;q.parameters={...q.parameters,docs:{...(Bl=q.parameters)==null?void 0:Bl.docs,source:{originalSource:`{
  render: () => <TableOld stickyHeader maxHeight="18rem"
  // The scroll container is capped so the demo overflows at any viewport. On
  // a wide screen the table simply fitted, so there was nothing to scroll
  // and the frozen column had nothing to prove - it worked in the docs page,
  // where the container is narrow, and looked broken in the story canvas.
  containerClassName="mdt-max-w-2xl mdt-rounded-md mdt-border"
  // \`w-full\` alone would squeeze the columns back to the container width.
  className="mdt-min-w-max">
      <TableHeaderOld>
        <TableRowOld>
          <TableHeadOld frozen className="mdt-w-44">
            Market
          </TableHeadOld>
          {['Base', 'Quote', 'Price', '24h low', '24h high', '24h change', 'Funding'].map(h => <TableHeadOld key={h} align="right" className="mdt-w-32">
              {h}
            </TableHeadOld>)}
        </TableRowOld>
      </TableHeaderOld>
      <TableBodyOld>
        {Array.from({
        length: 14
      }, (_, i) => <TableRowOld key={i}>
            <TableCellOld frozen className="mdt-font-medium">
              PAIR-{i + 1}
            </TableCellOld>
            <TableCellOld align="right">Bitcoin</TableCellOld>
            <TableCellOld align="right">US Dollar</TableCellOld>
            <TableCellOld align="right">{(90000 + i * 137).toLocaleString()}</TableCellOld>
            <TableCellOld align="right">{(87000 + i * 91).toLocaleString()}</TableCellOld>
            <TableCellOld align="right">{(91000 + i * 113).toLocaleString()}</TableCellOld>
            <TableCellOld align="right">{(i * 0.13).toFixed(2)}%</TableCellOld>
            <TableCellOld align="right">0.000{i}%</TableCellOld>
          </TableRowOld>)}
      </TableBodyOld>
    </TableOld>
}`,...(Ml=(El=q.parameters)==null?void 0:El.docs)==null?void 0:Ml.source},description:{story:`A first column pinned while the rest scrolls sideways — the pattern Jira,
crypto exchanges and booking tables all use when a row has more columns than
fit.

Put \`frozen\` on the same column in **every** row, header included, or it will
pin in some rows and not others. Like a pinned row, the edge only asserts
itself once something has actually slid underneath: at rest it looks like any
other column.`,...(Dl=(Fl=q.parameters)==null?void 0:Fl.docs)==null?void 0:Dl.description}}};var Ll,Kl,zl,Ul,ql;$.parameters={...$.parameters,docs:{...(Ll=$.parameters)==null?void 0:Ll.docs,source:{originalSource:`{
  render: function Resizable() {
    // Status carries no width on purpose. A fixed-layout table still fills its
    // container, so if every column is sized the browser scales all of them to
    // cover the difference and the handle stops tracking the cursor. One
    // unsized column absorbs the slack instead.
    const {
      widths,
      setWidth,
      reset,
      isResized
    } = useColumnWidthsOld({
      name: 200,
      email: 260,
      role: 140
    });
    const columns: {
      key: keyof typeof widths;
      label: string;
    }[] = [{
      key: 'name',
      label: 'Name'
    }, {
      key: 'email',
      label: 'Email'
    }, {
      key: 'role',
      label: 'Role'
    }];
    return <div className="mdt-flex mdt-flex-col mdt-items-start mdt-gap-3">
        <Button variant="outline" size="sm" onClick={reset} disabled={!isResized}>
          Reset widths
        </Button>
        <TableOld layout="fixed" containerClassName="mdt-rounded-md mdt-border">
          <TableHeaderOld>
            <TableRowOld>
              {columns.map(column => <TableHeadOld key={column.key} resizable width={widths[column.key]} onResize={w => {
              setWidth(column.key, w);
            }}>
                  {column.label}
                </TableHeadOld>)}
              <TableHeadOld>Status</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
          <TableBodyOld>
            {users.map(user => <TableRowOld key={user.id}>
                <TableCellOld className="mdt-truncate mdt-font-medium">{user.name}</TableCellOld>
                <TableCellOld className="mdt-truncate">{user.email}</TableCellOld>
                <TableCellOld className="mdt-truncate">{user.role}</TableCellOld>
                <TableCellOld className="mdt-truncate">{user.status}</TableCellOld>
              </TableRowOld>)}
          </TableBodyOld>
        </TableOld>
      </div>;
  }
}`,...(zl=(Kl=$.parameters)==null?void 0:Kl.docs)==null?void 0:zl.source},description:{story:'Drag any column edge, or focus a handle and use the arrow keys — `Home` and\n`End` jump to the bounds.\n\nResizing is a contract, not an implementation: `TableHeadOld` provides the handle\nand its keyboard behaviour, the width stays yours. `useColumnWidthsOld` holds the\narithmetic if you want it, the same way `useEditableTabs` holds the rules for\nan editable tab bar.\n\n**`layout="fixed"` is required.** Under the default `auto` layout the browser\nre-derives widths from content and fights whatever you set.',...(ql=(Ul=$.parameters)==null?void 0:Ul.docs)==null?void 0:ql.description}}};const Ma=["Default","WithCaption","WithFooter","StripedRows","Density","Alignment","StickyHeader","SortableHeaders","SelectableRows","CompactDense","WithLoadingState","WithPagination","EmptyState","FullFeatured","GroupedRows","ExpandableRows","ExpandedRowContent","SummaryRows","StickySummaryRows","FrozenColumn","ResizableColumns"];export{P as Alignment,V as CompactDense,S as Default,R as Density,F as EmptyState,L as ExpandableRows,K as ExpandedRowContent,q as FrozenColumn,_ as FullFeatured,D as GroupedRows,$ as ResizableColumns,B as SelectableRows,I as SortableHeaders,A as StickyHeader,U as StickySummaryRows,k as StripedRows,z as SummaryRows,N as WithCaption,H as WithFooter,E as WithLoadingState,M as WithPagination,Ma as __namedExportsOrder,Ea as default};
//# sourceMappingURL=TableOld.stories-46ds24Jv.js.map
