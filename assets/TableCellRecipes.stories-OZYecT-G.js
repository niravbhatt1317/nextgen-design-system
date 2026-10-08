import{j as e,r as D}from"./iframe-DZn6zJ_A.js";import"./index-DkSUl2wM.js";import"./index-BgugIDqY.js";import"./index-DXf-30mB.js";import{T as i,a as m,b as s,c as a,d as c,e as n}from"./TableOld-4i6yqO_I.js";import{B as w}from"./Badge-hVOOPlKv.js";import{A as Ke}from"./Avatar-Dvn_NOI2.js";import{B as T}from"./Button-CQwv0u3c.js";import{I as u}from"./Icon-C7A5kxOO.js";import{D as I,a as B,b as E,c as p,e as $,d as Ge}from"./DropdownMenu-BAgWnrA-.js";import{P as Ve}from"./Progress-XHNGihBF.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./index-CyeSJejy.js";import"./index-NjEcKSwJ.js";import"./Popover-C9zI_wr7.js";import"./index-C-EDAaRI.js";import"./index-BBA8wSts.js";import"./index-DP0-UvgX.js";import"./index-DVSg9WGH.js";import"./index-m0aIvVNQ.js";import"./index-D5o8v84F.js";import"./Combination-D0C4XXDH.js";import"./index-D7jyVfbj.js";import"./index-C2C_zpI7.js";import"./index-BiY8Nw4V.js";import"./index-BvKV4uDa.js";import"./index-B9HE7bOh.js";import"./Command-qz6A5UXC.js";import"./index-B1_v8VAp.js";import"./index-CWN2Lbcj.js";import"./index-CTC17vF_.js";import"./index-CRGAu5Bd.js";import"./index-lbMH1uK7.js";const At={title:"Deprecated/Table Old Cell Recipes",tags:["autodocs"],parameters:{status:{type:"deprecated",since:"0.4.0",deprecation:{deprecatedSince:"0.4.0",removalIn:"1.0.0",replacement:"Table",message:"The Table family is now the merged console Users table (7 September 2026): 54px rows under a 40px header, row numbers that become checkboxes, a select-all scope, header sort, a column menu, drag-to-move, insert-in-place, and the library Badge in every cell. This is the earlier family, kept for side-by-side comparison until the removal pull request."}},layout:"padded",docs:{description:{component:`Cell recipes - what goes *inside* a table cell.

Layers 1 to 3 cover what the table does: the frame, the structure, and
column control. This page covers what a cell contains, which is where four
product teams currently diverge most.

**These are recipes, not components.** Every one is a composition of parts
the library already ships. Turning them into \`TableStatusCell\`,
\`TableAvatarCell\` and so on would multiply the API without adding a single
capability, and would freeze choices products need to vary. A recipe teaches
the pattern; a component would force it.

Drawn from 27 real product tables. **Eight cell patterns appeared and all
eight are here.** Six are built from components the library already ships.
Two of them - sparkline and media thumbnail - need components that do not
exist yet, so they are built against throwaway placeholders defined at the
bottom of this file: the arrangement can be agreed now, and the real
components drop in later without redesigning the cell. What is still missing
is listed in the final story rather than left implied.

The inline-control pattern has two shapes here, because they solve different
problems: **Editable status tag** for a value you change in place, and
**In-cell actions** for actions that belong beside their subject rather than
in a column of their own.`}}}},U={active:"success",pending:"warning",failed:"danger",archived:"neutral"},_={active:"Active",pending:"Pending",failed:"Failed",archived:"Archived"},b=[{id:"1",name:"Ada Lovelace",email:"ada@example.com",role:"Owner",status:"active",usage:82,spend:1204.5},{id:"2",name:"Grace Hopper",email:"grace@example.com",role:"Admin",status:"pending",usage:46,spend:318},{id:"3",name:"Alan Turing",email:"alan@example.com",role:"Editor",status:"failed",usage:97,spend:null},{id:"4",name:"Katherine Johnson",email:"katherine@example.com",role:"Viewer",status:"archived",usage:12,spend:26.75}],L=()=>e.jsxs(e.Fragment,{children:[e.jsx("span",{"aria-hidden":"true",children:"—"}),e.jsx("span",{className:"mdt-sr-only",children:"Not set"})]}),x="mdt-w-8 mdt-px-0",q=t=>t.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),O={name:"Status",render:()=>e.jsxs(i,{children:[e.jsx(m,{children:e.jsxs(s,{children:[e.jsx(a,{children:"Name"}),e.jsx(a,{children:"Status"})]})}),e.jsx(c,{children:b.map(t=>e.jsxs(s,{children:[e.jsx(n,{children:t.name}),e.jsx(n,{children:e.jsx(w,{tone:U[t.status],shape:"square",size:"sm",children:_[t.status]})})]},t.id))})]})},v={render:()=>e.jsxs(i,{density:"compact",children:[e.jsx(m,{children:e.jsxs(s,{children:[e.jsx(a,{children:"User"}),e.jsx(a,{children:"Role"})]})}),e.jsx(c,{children:b.map(t=>e.jsxs(s,{children:[e.jsxs(n,{children:[e.jsx("div",{className:"mdt-font-medium mdt-leading-tight",children:t.name}),e.jsx("div",{className:"mdt-text-xs mdt-leading-tight mdt-text-muted-foreground",children:t.email})]}),e.jsx(n,{children:t.role})]},t.id))})]})},j={render:()=>e.jsxs(i,{children:[e.jsx(m,{children:e.jsxs(s,{children:[e.jsx(a,{children:"User"}),e.jsx(a,{children:"Role"})]})}),e.jsx(c,{children:b.map(t=>e.jsxs(s,{children:[e.jsx(n,{children:e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[e.jsx(Ke,{name:t.name,size:"sm","aria-hidden":!0}),e.jsx("span",{className:"mdt-font-medium",children:t.name})]})}),e.jsx(n,{children:t.role})]},t.id))})]})},y={render:()=>e.jsxs(i,{children:[e.jsx(m,{children:e.jsxs(s,{children:[e.jsx(a,{children:"Name"}),e.jsx(a,{align:"right",children:"Spend"})]})}),e.jsx(c,{children:b.map(t=>e.jsxs(s,{children:[e.jsx(n,{children:t.name}),e.jsx(n,{align:"right",className:"mdt-tabular-nums",children:t.spend===null?e.jsx(L,{}):`$${q(t.spend)}`})]},t.id))})]})},N={render:function(){const[g,o]=D.useState(null);return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3",children:[e.jsxs(i,{children:[e.jsx(m,{children:e.jsxs(s,{children:[e.jsx(a,{children:"Name"}),e.jsx(a,{children:"Role"}),e.jsx(a,{align:"right",children:e.jsx("span",{className:"mdt-sr-only",children:"Actions"})})]})}),e.jsx(c,{children:b.map(r=>e.jsxs(s,{className:"mdt-group/row",children:[e.jsx(n,{className:"mdt-font-medium",children:r.name}),e.jsx(n,{children:r.role}),e.jsx(n,{align:"right",children:e.jsxs("div",{className:["mdt-flex mdt-justify-end mdt-gap-1","mdt-opacity-0 mdt-transition-opacity","group-focus-within/row:mdt-opacity-100 group-hover/row:mdt-opacity-100","pointer-coarse:mdt-opacity-100"].join(" "),children:[e.jsx(T,{variant:"ghost",size:"sm",className:x,"aria-label":`Edit ${r.name}`,onClick:()=>{o(`Edit - ${r.name}`)},children:e.jsx(u,{name:"pencil",size:"sm","aria-hidden":!0})}),e.jsxs(I,{children:[e.jsx(B,{asChild:!0,children:e.jsx(T,{variant:"ghost",size:"sm",className:x,"aria-label":`More actions for ${r.name}`,children:e.jsx(u,{name:"more-vertical",size:"sm","aria-hidden":!0})})}),e.jsxs(E,{align:"end",children:[["View details","Duplicate"].map(l=>e.jsx(p,{onSelect:()=>{o(`${l} - ${r.name}`)},children:l},l)),e.jsx($,{}),e.jsx(p,{onSelect:()=>{o(`Remove - ${r.name}`)},children:"Remove"})]})]})]})})]},r.id))})]}),e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:g===null?"Hover a row, then use an action.":`Fired: ${g}`})]})}},C={render:()=>e.jsxs(i,{children:[e.jsx(m,{children:e.jsxs(s,{children:[e.jsx(a,{children:"Name"}),e.jsx(a,{children:"Usage"})]})}),e.jsx(c,{children:b.map(t=>e.jsxs(s,{children:[e.jsx(n,{className:"mdt-font-medium",children:t.name}),e.jsx(n,{children:e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[e.jsx(Ve,{value:t.usage,size:"sm",tone:t.usage>=90?"danger":"default","aria-label":`Usage for ${t.name}`,className:"mdt-w-24"}),e.jsxs("span",{className:"mdt-w-10 mdt-text-right mdt-text-xs mdt-tabular-nums mdt-text-muted-foreground",children:[t.usage,"%"]})]})})]},t.id))})]})},S={name:"Empty value",render:()=>e.jsxs(i,{children:[e.jsx(m,{children:e.jsxs(s,{children:[e.jsx(a,{children:"Name"}),e.jsx(a,{align:"right",children:"Spend"}),e.jsx(a,{children:"Status"})]})}),e.jsx(c,{children:b.map(t=>e.jsxs(s,{children:[e.jsx(n,{className:"mdt-font-medium",children:t.name}),e.jsx(n,{align:"right",className:"mdt-tabular-nums",children:t.spend===null?e.jsx(L,{}):`$${q(t.spend)}`}),e.jsx(n,{children:e.jsx(w,{tone:U[t.status],shape:"square",size:"sm",children:_[t.status]})})]},t.id))})]})},k={render:()=>e.jsxs(i,{children:[e.jsx(m,{children:e.jsxs(s,{children:[e.jsx(a,{children:"User"}),e.jsx(a,{children:"Status"}),e.jsx(a,{children:"Usage"}),e.jsx(a,{align:"right",children:"Spend"}),e.jsx(a,{align:"right",children:e.jsx("span",{className:"mdt-sr-only",children:"Actions"})})]})}),e.jsx(c,{children:b.map(t=>e.jsxs(s,{className:"mdt-group/row",children:[e.jsx(n,{children:e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[e.jsx(Ke,{name:t.name,size:"sm","aria-hidden":!0}),e.jsxs("div",{children:[e.jsx("div",{className:"mdt-font-medium",children:t.name}),e.jsx("div",{className:"mdt-text-xs mdt-text-muted-foreground",children:t.email})]})]})}),e.jsx(n,{children:e.jsx(w,{tone:U[t.status],shape:"square",size:"sm",children:_[t.status]})}),e.jsx(n,{children:e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[e.jsx(Ve,{value:t.usage,size:"sm",tone:t.usage>=90?"danger":"default","aria-label":`Usage for ${t.name}`,className:"mdt-w-24"}),e.jsxs("span",{className:"mdt-w-10 mdt-text-right mdt-text-xs mdt-tabular-nums mdt-text-muted-foreground",children:[t.usage,"%"]})]})}),e.jsx(n,{align:"right",className:"mdt-tabular-nums",children:t.spend===null?e.jsx(L,{}):`$${q(t.spend)}`}),e.jsx(n,{align:"right",children:e.jsxs("div",{className:["mdt-flex mdt-justify-end mdt-gap-1","mdt-opacity-0 mdt-transition-opacity","group-focus-within/row:mdt-opacity-100 group-hover/row:mdt-opacity-100","pointer-coarse:mdt-opacity-100"].join(" "),children:[e.jsx(T,{variant:"ghost",size:"sm",className:x,"aria-label":`Edit ${t.name}`,children:e.jsx(u,{name:"pencil",size:"sm","aria-hidden":!0})}),e.jsxs(I,{children:[e.jsx(B,{asChild:!0,children:e.jsx(T,{variant:"ghost",size:"sm",className:x,"aria-label":`More actions for ${t.name}`,children:e.jsx(u,{name:"more-vertical",size:"sm","aria-hidden":!0})})}),e.jsxs(E,{align:"end",children:[e.jsx(p,{children:"View details"}),e.jsx(p,{children:"Duplicate"}),e.jsx($,{}),e.jsx(p,{children:"Remove"})]})]})]})})]},t.id))})]})},P={open:"info",reopened:"info",inProcess:"warning",onHold:"neutral",resolved:"success",closed:"neutral",cancelled:"danger"},M={open:"Open",inProcess:"In Process",onHold:"On Hold",resolved:"Resolved",closed:"Closed",reopened:"Reopened",cancelled:"Cancelled"},Je=["open","inProcess","onHold","resolved","closed","reopened","cancelled"],z=[{id:"TKT-245",subject:"Network Connectivity Problem",status:"open"},{id:"TKT-246",subject:"VPN drops every few minutes",status:"inProcess"},{id:"TKT-247",subject:"Printer queue stuck on floor 3",status:"onHold"},{id:"TKT-248",subject:"Password reset for contractor",status:"resolved"}],H={render:function(){const[g,o]=D.useState(Object.fromEntries(z.map(d=>[d.id,d.status]))),[r,l]=D.useState(null);return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3",children:[e.jsxs(i,{children:[e.jsx(m,{children:e.jsxs(s,{children:[e.jsx(a,{children:"ID"}),e.jsx(a,{children:"Subject"}),e.jsx(a,{children:"Status"})]})}),e.jsx(c,{children:z.map(d=>{const f=g[d.id]??d.status;return e.jsxs(s,{onClick:()=>{l(d.id)},children:[e.jsx(n,{className:"mdt-font-medium",children:d.id}),e.jsx(n,{children:d.subject}),e.jsx(n,{className:"mdt-p-0",onClick:h=>{h.stopPropagation()},children:e.jsxs(I,{children:[e.jsx(B,{asChild:!0,children:e.jsx("button",{type:"button","aria-label":`Status ${M[f]} for ${d.id}. Change it`,className:["mdt-flex mdt-h-full mdt-w-full mdt-items-center","mdt-rounded-md mdt-px-3 mdt-py-2","mdt-border mdt-border-transparent mdt-transition-colors","hover:mdt-border-border hover:mdt-bg-muted/40","data-[state=open]:mdt-border-border data-[state=open]:mdt-bg-muted/40","focus-visible:mdt-border-border focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring"].join(" "),children:e.jsx(w,{tone:P[f],shape:"square",size:"sm",dot:!0,children:M[f]})})}),e.jsxs(E,{align:"start",children:[e.jsx(Ge,{children:"Update status"}),Je.map(h=>e.jsxs(p,{className:"mdt-flex mdt-items-center mdt-gap-6",onSelect:()=>{o(We=>({...We,[d.id]:h}))},children:[e.jsx(w,{tone:P[h],shape:"square",size:"sm",dot:!0,children:M[h]}),h===f&&e.jsx(u,{name:"check",size:"sm",className:"mdt-ml-auto","aria-hidden":!0}),h===f&&e.jsx("span",{className:"mdt-sr-only",children:"Current"})]},h))]})]})})]},d.id)})})]}),e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:r===null?"Change a status - the row is not opened.":`Row opened: ${r}. Changing a status never does this.`})]})}},R={render:function(){const[g,o]=D.useState(null),r=["mdt-flex mdt-shrink-0 mdt-items-center mdt-gap-1","mdt-opacity-0 mdt-transition-opacity","group-focus-within/row:mdt-opacity-100 group-hover/row:mdt-opacity-100","pointer-coarse:mdt-opacity-100"].join(" ");return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3",children:[e.jsxs(i,{children:[e.jsx(m,{children:e.jsxs(s,{children:[e.jsx(a,{children:"ID"}),e.jsx(a,{children:"Subject"})]})}),e.jsx(c,{children:z.map(l=>e.jsxs(s,{className:"mdt-group/row",children:[e.jsx(n,{className:"mdt-font-medium",children:l.id}),e.jsx(n,{children:e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[e.jsx("span",{className:"mdt-truncate group-hover/row:mdt-underline",children:l.subject}),e.jsxs("div",{className:`mdt-ml-auto ${r}`,children:[e.jsxs(T,{variant:"outline",size:"sm",onClick:()=>{o(`Open - ${l.id}`)},children:[e.jsx(u,{name:"panel-right-open",size:"sm","aria-hidden":!0}),"Open"]}),e.jsx(T,{variant:"ghost",size:"sm",className:x,"aria-label":`Edit ${l.id}`,onClick:()=>{o(`Edit - ${l.id}`)},children:e.jsx(u,{name:"pencil",size:"sm","aria-hidden":!0})}),e.jsxs(I,{children:[e.jsx(B,{asChild:!0,children:e.jsx(T,{variant:"ghost",size:"sm",className:x,"aria-label":`More actions for ${l.id}`,children:e.jsx(u,{name:"more-vertical",size:"sm","aria-hidden":!0})})}),e.jsxs(E,{align:"end",children:[["Assign","Duplicate"].map(d=>e.jsx(p,{onSelect:()=>{o(`${d} - ${l.id}`)},children:d},d)),e.jsx($,{}),e.jsx(p,{onSelect:()=>{o(`Delete - ${l.id}`)},children:"Delete"})]})]})]})]})})]},l.id))})]}),e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:g===null?"Hover a row, then use an action.":`Fired: ${g}`})]})}},A={name:"Still missing",render:()=>e.jsx("div",{className:"mdt-flex mdt-max-w-2xl mdt-flex-col mdt-gap-4",children:[{title:"Chart / sparkline component",seen:"3 of 27",blocked:"The Sparkline recipe draws its line with a local stand-in. A real component owns the scale, the empty and single-point cases, and the tones."},{title:"Thumbnail component",seen:"3 of 27",blocked:"The Media recipe draws the fallback only. A real component owns the aspect ratio, the loading state and what happens when the image fails."}].map(t=>e.jsxs("div",{className:"mdt-rounded-md mdt-border mdt-border-dashed mdt-p-4",children:[e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[e.jsx("span",{className:"mdt-font-medium",children:t.title}),e.jsx(w,{tone:"warning",shape:"square",size:"sm",children:"placeholder in use"}),e.jsxs(w,{tone:"neutral",shape:"square",size:"sm",children:["seen in ",t.seen]})]}),e.jsx("p",{className:"mdt-mt-1 mdt-text-sm mdt-text-muted-foreground",children:t.blocked})]},t.title))})};var F,K,V,W,G;O.parameters={...O.parameters,docs:{...(F=O.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: 'Status',
  render: () => <TableOld>
      <TableHeaderOld>
        <TableRowOld>
          <TableHeadOld>Name</TableHeadOld>
          <TableHeadOld>Status</TableHeadOld>
        </TableRowOld>
      </TableHeaderOld>
      <TableBodyOld>
        {rows.map(row => <TableRowOld key={row.id}>
            <TableCellOld>{row.name}</TableCellOld>
            <TableCellOld>
              <Badge tone={STATUS_TONE[row.status]} shape="square" size="sm">
                {STATUS_LABEL[row.status]}
              </Badge>
            </TableCellOld>
          </TableRowOld>)}
      </TableBodyOld>
    </TableOld>
}`,...(V=(K=O.parameters)==null?void 0:K.docs)==null?void 0:V.source},description:{story:`**Status** - the most common thing in any table, in roughly 20 of the 27
references.

\`shape="square"\` rather than the default pill: a square badge sits into a
column of data quietly, where a row of pills reads as a row of objects
floating on top of the table.

Keep \`emphasis="subtle"\`. A solid badge is for counts whose whole job is to
be seen; used as a status label it shouts down every other cell.

\`size="sm"\` throughout. A status is an annotation on the row, not a heading
for it - at the default size the chip is taller than the text beside it and
starts setting the row height, which is the wrong thing for a value to do.`,...(G=(W=O.parameters)==null?void 0:W.docs)==null?void 0:G.description}}};var J,Q,X,Y,Z;v.parameters={...v.parameters,docs:{...(J=v.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <TableOld density="compact">
      <TableHeaderOld>
        <TableRowOld>
          <TableHeadOld>User</TableHeadOld>
          <TableHeadOld>Role</TableHeadOld>
        </TableRowOld>
      </TableHeaderOld>
      <TableBodyOld>
        {rows.map(row => <TableRowOld key={row.id}>
            <TableCellOld>
              <div className="mdt-font-medium mdt-leading-tight">{row.name}</div>
              <div className="mdt-text-xs mdt-leading-tight mdt-text-muted-foreground">
                {row.email}
              </div>
            </TableCellOld>
            <TableCellOld>{row.role}</TableCellOld>
          </TableRowOld>)}
      </TableBodyOld>
    </TableOld>
}`,...(X=(Q=v.parameters)==null?void 0:Q.docs)==null?void 0:X.source},description:{story:`**Two-line** - a primary value with something quieter underneath, in 7 of
the 27 references.

The second line is \`text-muted-foreground\` and one step smaller. It is not a
second column: it belongs to the value above it, so it must never be sorted
or aligned independently.

**Tighten the leading rather than reaching for a looser density.** Two lines
of default leading do not fit a \`compact\` row, and the easy fix - moving the
whole table to \`default\` - pays for one column by padding every other one.
\`leading-tight\` on both lines buys back enough to keep the table compact, and
the pair still reads as one value because they are closer to each other than
either is to the row above.`,...(Z=(Y=v.parameters)==null?void 0:Y.docs)==null?void 0:Z.description}}};var ee,te,ae,ne,se;j.parameters={...j.parameters,docs:{...(ee=j.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => <TableOld>
      <TableHeaderOld>
        <TableRowOld>
          <TableHeadOld>User</TableHeadOld>
          <TableHeadOld>Role</TableHeadOld>
        </TableRowOld>
      </TableHeaderOld>
      <TableBodyOld>
        {rows.map(row => <TableRowOld key={row.id}>
            <TableCellOld>
              <div className="mdt-flex mdt-items-center mdt-gap-2">
                <Avatar name={row.name} size="sm" aria-hidden />
                <span className="mdt-font-medium">{row.name}</span>
              </div>
            </TableCellOld>
            <TableCellOld>{row.role}</TableCellOld>
          </TableRowOld>)}
      </TableBodyOld>
    </TableOld>
}`,...(ae=(te=j.parameters)==null?void 0:te.docs)==null?void 0:ae.source},description:{story:'**Avatar and text** - identity, in 6 of the 27 references.\n\n`size="sm"` is the largest that fits a `compact` row without setting the\nheight for the whole table. The avatar is decorative here because the name\nis right beside it - `Avatar` takes `name` for its initials, and the text\ncell carries the accessible name.',...(se=(ne=j.parameters)==null?void 0:ne.docs)==null?void 0:se.description}}};var le,de,re,oe,ie;y.parameters={...y.parameters,docs:{...(le=y.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: () => <TableOld>
      <TableHeaderOld>
        <TableRowOld>
          <TableHeadOld>Name</TableHeadOld>
          <TableHeadOld align="right">Spend</TableHeadOld>
        </TableRowOld>
      </TableHeaderOld>
      <TableBodyOld>
        {rows.map(row => <TableRowOld key={row.id}>
            <TableCellOld>{row.name}</TableCellOld>
            <TableCellOld align="right" className="mdt-tabular-nums">
              {row.spend === null ? <EmptyValue /> : \`$\${money(row.spend)}\`}
            </TableCellOld>
          </TableRowOld>)}
      </TableBodyOld>
    </TableOld>
}`,...(re=(de=y.parameters)==null?void 0:de.docs)==null?void 0:re.source},description:{story:'**Numeric** - right-aligned figures, in 6 of the 27 references.\n\nTwo things, and the second is the one everyone forgets:\n\n- `align="right"` on **both** the header and the cell. A right-aligned\n  column under a left-aligned header looks like a mistake.\n- `mdt-tabular-nums`. Without it the digits are proportionally spaced, so\n  `1` is narrower than `8` and the decimal points wander from row to row.\n  It is the difference between a column of numbers and a list of numbers.',...(ie=(oe=y.parameters)==null?void 0:oe.docs)==null?void 0:ie.description}}};var me,ce,he,ue,pe;N.parameters={...N.parameters,docs:{...(me=N.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: function RowActionsRecipe() {
    const [fired, setFired] = useState<string | null>(null);
    return <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <TableOld>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld>Name</TableHeadOld>
              <TableHeadOld>Role</TableHeadOld>
              <TableHeadOld align="right">
                <span className="mdt-sr-only">Actions</span>
              </TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
          <TableBodyOld>
            {rows.map(row => <TableRowOld key={row.id} className="mdt-group/row">
                <TableCellOld className="mdt-font-medium">{row.name}</TableCellOld>
                <TableCellOld>{row.role}</TableCellOld>
                <TableCellOld align="right">
                  <div className={['mdt-flex mdt-justify-end mdt-gap-1', 'mdt-opacity-0 mdt-transition-opacity', 'group-focus-within/row:mdt-opacity-100 group-hover/row:mdt-opacity-100', 'pointer-coarse:mdt-opacity-100'].join(' ')}>
                    <Button variant="ghost" size="sm" className={ACTION_ICON} aria-label={\`Edit \${row.name}\`} onClick={() => {
                  setFired(\`Edit - \${row.name}\`);
                }}>
                      <Icon name="pencil" size="sm" aria-hidden />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className={ACTION_ICON} aria-label={\`More actions for \${row.name}\`}>
                          <Icon name="more-vertical" size="sm" aria-hidden />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {['View details', 'Duplicate'].map(label => <DropdownMenuItem key={label} onSelect={() => {
                      setFired(\`\${label} - \${row.name}\`);
                    }}>
                            {label}
                          </DropdownMenuItem>)}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={() => {
                      setFired(\`Remove - \${row.name}\`);
                    }}>
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCellOld>
              </TableRowOld>)}
          </TableBodyOld>
        </TableOld>
        <p className="mdt-text-xs mdt-text-muted-foreground">
          {fired === null ? 'Hover a row, then use an action.' : \`Fired: \${fired}\`}
        </p>
      </div>;
  }
}`,...(he=(ce=N.parameters)==null?void 0:ce.docs)==null?void 0:he.source},description:{story:`**Row actions** - a menu or buttons on the trailing edge, in 7 of the 27
references.

Revealed on hover, because a column of identical buttons on every row is
visual noise. But hover alone is unusable, so this recipe also shows them:

- **on keyboard focus**, via \`group-focus-within\` - otherwise you Tab into
  buttons you cannot see
- **on touch**, via \`pointer-coarse\` - a phone has no hover at all, and
  hover-only actions are simply unreachable there

The column keeps its width whether or not the buttons are showing, because
they fade rather than mount. A column that appears on hover reflows the
table under the cursor.

**What the actions are.** Two tiers, and the split matters: the *one* thing
people do constantly gets its own button, everything else goes behind the
menu. A row of five icon buttons is unreadable, and a menu holding a single
item is a button wearing a costume. Here Edit is the frequent one; view,
duplicate and remove sit in the menu, with remove separated because it is
the one that cannot be undone. Click either and this story tells you what
fired.

**The group must be named.** \`TableOld\` already puts an unnamed \`group\` on its
scroll container, for the scrolled-edge shadows. A plain \`group-hover:\` here
would match that container instead of the row, so hovering anywhere in the
table would light up every row's actions at once. Adding an unnamed \`group\`
to the row does not help either - the container still matches. \`group/row\`
and \`group-hover/row:\` bind the two together explicitly.`,...(pe=(ue=N.parameters)==null?void 0:ue.docs)==null?void 0:pe.description}}};var be,ge,Te,we,xe;C.parameters={...C.parameters,docs:{...(be=C.parameters)==null?void 0:be.docs,source:{originalSource:`{
  render: () => <TableOld>
      <TableHeaderOld>
        <TableRowOld>
          <TableHeadOld>Name</TableHeadOld>
          <TableHeadOld>Usage</TableHeadOld>
        </TableRowOld>
      </TableHeaderOld>
      <TableBodyOld>
        {rows.map(row => <TableRowOld key={row.id}>
            <TableCellOld className="mdt-font-medium">{row.name}</TableCellOld>
            <TableCellOld>
              <div className="mdt-flex mdt-items-center mdt-gap-2">
                <Progress value={row.usage} size="sm" tone={row.usage >= 90 ? 'danger' : 'default'} aria-label={\`Usage for \${row.name}\`} className="mdt-w-24" />
                <span className="mdt-w-10 mdt-text-right mdt-text-xs mdt-tabular-nums mdt-text-muted-foreground">
                  {row.usage}%
                </span>
              </div>
            </TableCellOld>
          </TableRowOld>)}
      </TableBodyOld>
    </TableOld>
}`,...(Te=(ge=C.parameters)==null?void 0:ge.docs)==null?void 0:Te.source},description:{story:`**Progress in a cell** - a proportion you can compare down the column, part
of the mini-viz pattern in 3 of the 27 references.

The bar alone is not enough. A bar answers "roughly how full", never "how
full" - so the number goes beside it, right-aligned and tabular, and the bar
is capped in width so the column does not stretch with the table.

\`Progress\` requires \`aria-label\`, and it must name the row, not the column.
Four bars all labelled "Usage" tell a screen-reader user nothing.`,...(xe=(we=C.parameters)==null?void 0:we.docs)==null?void 0:xe.description}}};var fe,Oe,ve,je,ye;S.parameters={...S.parameters,docs:{...(fe=S.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  name: 'Empty value',
  render: () => <TableOld>
      <TableHeaderOld>
        <TableRowOld>
          <TableHeadOld>Name</TableHeadOld>
          <TableHeadOld align="right">Spend</TableHeadOld>
          <TableHeadOld>Status</TableHeadOld>
        </TableRowOld>
      </TableHeaderOld>
      <TableBodyOld>
        {rows.map(row => <TableRowOld key={row.id}>
            <TableCellOld className="mdt-font-medium">{row.name}</TableCellOld>
            <TableCellOld align="right" className="mdt-tabular-nums">
              {row.spend === null ? <EmptyValue /> : \`$\${money(row.spend)}\`}
            </TableCellOld>
            <TableCellOld>
              <Badge tone={STATUS_TONE[row.status]} shape="square" size="sm">
                {STATUS_LABEL[row.status]}
              </Badge>
            </TableCellOld>
          </TableRowOld>)}
      </TableBodyOld>
    </TableOld>
}`,...(ve=(Oe=S.parameters)==null?void 0:Oe.docs)==null?void 0:ve.source},description:{story:`**Empty value** - a dash, never a blank cell.

A blank cell is ambiguous: it reads as "the table failed to load this" as
readily as "there is nothing here". A dash says someone looked and there was
nothing.

The dash is \`aria-hidden\` with the real meaning in \`sr-only\` text, because a
screen reader announcing "em dash" is worse than silence.`,...(ye=(je=S.parameters)==null?void 0:je.docs)==null?void 0:ye.description}}};var Ne,Ce,Se,ke,He;k.parameters={...k.parameters,docs:{...(Ne=k.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
  render: () => <TableOld>
      <TableHeaderOld>
        <TableRowOld>
          <TableHeadOld>User</TableHeadOld>
          <TableHeadOld>Status</TableHeadOld>
          <TableHeadOld>Usage</TableHeadOld>
          <TableHeadOld align="right">Spend</TableHeadOld>
          <TableHeadOld align="right">
            <span className="mdt-sr-only">Actions</span>
          </TableHeadOld>
        </TableRowOld>
      </TableHeaderOld>
      <TableBodyOld>
        {rows.map(row => <TableRowOld key={row.id} className="mdt-group/row">
            <TableCellOld>
              <div className="mdt-flex mdt-items-center mdt-gap-2">
                <Avatar name={row.name} size="sm" aria-hidden />
                <div>
                  <div className="mdt-font-medium">{row.name}</div>
                  <div className="mdt-text-xs mdt-text-muted-foreground">{row.email}</div>
                </div>
              </div>
            </TableCellOld>
            <TableCellOld>
              <Badge tone={STATUS_TONE[row.status]} shape="square" size="sm">
                {STATUS_LABEL[row.status]}
              </Badge>
            </TableCellOld>
            <TableCellOld>
              <div className="mdt-flex mdt-items-center mdt-gap-2">
                <Progress value={row.usage} size="sm" tone={row.usage >= 90 ? 'danger' : 'default'} aria-label={\`Usage for \${row.name}\`} className="mdt-w-24" />
                <span className="mdt-w-10 mdt-text-right mdt-text-xs mdt-tabular-nums mdt-text-muted-foreground">
                  {row.usage}%
                </span>
              </div>
            </TableCellOld>
            <TableCellOld align="right" className="mdt-tabular-nums">
              {row.spend === null ? <EmptyValue /> : \`$\${money(row.spend)}\`}
            </TableCellOld>
            <TableCellOld align="right">
              <div className={['mdt-flex mdt-justify-end mdt-gap-1', 'mdt-opacity-0 mdt-transition-opacity', 'group-focus-within/row:mdt-opacity-100 group-hover/row:mdt-opacity-100', 'pointer-coarse:mdt-opacity-100'].join(' ')}>
                <Button variant="ghost" size="sm" className={ACTION_ICON} aria-label={\`Edit \${row.name}\`}>
                  <Icon name="pencil" size="sm" aria-hidden />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className={ACTION_ICON} aria-label={\`More actions for \${row.name}\`}>
                      <Icon name="more-vertical" size="sm" aria-hidden />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCellOld>
          </TableRowOld>)}
      </TableBodyOld>
    </TableOld>
}`,...(Se=(Ce=k.parameters)==null?void 0:Ce.docs)==null?void 0:Se.source},description:{story:`Every recipe on this page in one table, which is how they actually appear.

Note what the combination costs: the avatar and the action buttons are both
taller than a line of text, so this table cannot run at \`short\` density. The
tallest cell in a row sets the row.`,...(He=(ke=k.parameters)==null?void 0:ke.docs)==null?void 0:He.description}}};var Re,Ae,De,Ie,Be;H.parameters={...H.parameters,docs:{...(Re=H.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  render: function EditableStatusTagRecipe() {
    const [statuses, setStatuses] = useState<Record<string, TicketStatus>>(Object.fromEntries(tickets.map(ticket => [ticket.id, ticket.status])));
    const [opened, setOpened] = useState<string | null>(null);
    return <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <TableOld>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld>ID</TableHeadOld>
              <TableHeadOld>Subject</TableHeadOld>
              <TableHeadOld>Status</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
          <TableBodyOld>
            {tickets.map(ticket => {
            const current = statuses[ticket.id] ?? ticket.status;
            return <TableRowOld key={ticket.id} onClick={() => {
              setOpened(ticket.id);
            }}>
                  <TableCellOld className="mdt-font-medium">{ticket.id}</TableCellOld>
                  <TableCellOld>{ticket.subject}</TableCellOld>
                  {/*
                    The row's click handler would fire when the menu is used.
                    Stopping it on the cell keeps the whole control out of the
                    row's reach, without the control needing to know it is in a
                    table.
                   */}
                  <TableCellOld
              // The frame belongs on the cell edge, so the cell gives up
              // its padding and the trigger takes it. Anything less and
              // the outline floats inside the cell with a gap around it,
              // which reads as a control sitting in the cell rather than
              // the cell being editable.
              className="mdt-p-0" onClick={event => {
                event.stopPropagation();
              }}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button type="button" aria-label={\`Status \${TICKET_LABEL[current]} for \${ticket.id}. Change it\`} className={[
                    // Fills the cell it replaced, and carries the
                    // padding the cell gave up. \`px-3 py-2\` is
                    // \`compact\` density - this recipe is pinned to the
                    // table's density, and a table at \`default\` needs
                    // \`p-4\` here instead.
                    'mdt-flex mdt-h-full mdt-w-full mdt-items-center', 'mdt-rounded-md mdt-px-3 mdt-py-2',
                    // Transparent at rest so the cell reads as a value.
                    // The border is always there, so nothing shifts when
                    // it becomes visible.
                    'mdt-border mdt-border-transparent mdt-transition-colors', 'hover:mdt-border-border hover:mdt-bg-muted/40',
                    // Keep the frame while the menu is open, or the
                    // trigger looks untouched under its own popup.
                    'data-[state=open]:mdt-border-border data-[state=open]:mdt-bg-muted/40', 'focus-visible:mdt-border-border focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring'].join(' ')}>
                          <Badge tone={TICKET_TONE[current]} shape="square" size="sm" dot>
                            {TICKET_LABEL[current]}
                          </Badge>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Update status</DropdownMenuLabel>
                        {TICKET_ORDER.map(status => <DropdownMenuItem key={status} className="mdt-flex mdt-items-center mdt-gap-6" onSelect={() => {
                      setStatuses(prev => ({
                        ...prev,
                        [ticket.id]: status
                      }));
                    }}>
                            <Badge tone={TICKET_TONE[status]} shape="square" size="sm" dot>
                              {TICKET_LABEL[status]}
                            </Badge>
                            {status === current && <Icon name="check" size="sm" className="mdt-ml-auto" aria-hidden />}
                            {status === current && <span className="mdt-sr-only">Current</span>}
                          </DropdownMenuItem>)}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCellOld>
                </TableRowOld>;
          })}
          </TableBodyOld>
        </TableOld>
        <p className="mdt-text-xs mdt-text-muted-foreground">
          {opened === null ? 'Change a status - the row is not opened.' : \`Row opened: \${opened}. Changing a status never does this.\`}
        </p>
      </div>;
  }
}`,...(De=(Ae=H.parameters)==null?void 0:Ae.docs)==null?void 0:De.source},description:{story:`**Editable status tag** - the cell shows the value, not a control.

This is the inline-control pattern, and the important move is what the cell
looks like *at rest*: a plain status tag, exactly as it reads in a
non-editable column. No chevron, no select frame, no border. A column of
dropdown triggers turns a table you read into a form you fill in, and most of
the time people are reading.

The affordance arrives on hover - a quiet outline around the tag saying "this
one is yours to change". Editability is discovered, not advertised.

The menu names itself (**Update status**) rather than relying on the column
header, because by the time it is open the header may be scrolled away, and
it marks the current value with a check. Every option is the same tag you
would see in the cell, so choosing one is a direct preview of the result.

Three collisions this recipe has to settle, all of them real:

- **The row and the control both want the click.** On a clickable row,
  opening this would also open the record. The cell stops the event - a
  decision the recipe has to make visible, since \`TableCellOld\` cannot guess it.
- **The menu must escape the table.** The table lives in an \`overflow-auto\`
  container for horizontal scrolling, so anything not portalled out of it is
  clipped at the table edge. \`DropdownMenu\` portals.
- **It sets the row height** - a hit target big enough to click is taller
  than a bare line of text, so this cannot run at \`short\` density.`,...(Be=(Ie=H.parameters)==null?void 0:Ie.docs)==null?void 0:Be.description}}};var Ee,Me,ze,$e,Ue;R.parameters={...R.parameters,docs:{...(Ee=R.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
  render: function InCellActionsRecipe() {
    const [fired, setFired] = useState<string | null>(null);
    const reveal = ['mdt-flex mdt-shrink-0 mdt-items-center mdt-gap-1', 'mdt-opacity-0 mdt-transition-opacity', 'group-focus-within/row:mdt-opacity-100 group-hover/row:mdt-opacity-100', 'pointer-coarse:mdt-opacity-100'].join(' ');
    return <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <TableOld>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld>ID</TableHeadOld>
              <TableHeadOld>Subject</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
          <TableBodyOld>
            {tickets.map(ticket => <TableRowOld key={ticket.id} className="mdt-group/row">
                <TableCellOld className="mdt-font-medium">{ticket.id}</TableCellOld>
                <TableCellOld>
                  <div className="mdt-flex mdt-items-center mdt-gap-2">
                    <span className="mdt-truncate group-hover/row:mdt-underline">
                      {ticket.subject}
                    </span>
                    <div className={\`mdt-ml-auto \${reveal}\`}>
                      <Button variant="outline" size="sm" onClick={() => {
                    setFired(\`Open - \${ticket.id}\`);
                  }}>
                        <Icon name="panel-right-open" size="sm" aria-hidden />
                        Open
                      </Button>
                      <Button variant="ghost" size="sm" className={ACTION_ICON} aria-label={\`Edit \${ticket.id}\`} onClick={() => {
                    setFired(\`Edit - \${ticket.id}\`);
                  }}>
                        <Icon name="pencil" size="sm" aria-hidden />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className={ACTION_ICON} aria-label={\`More actions for \${ticket.id}\`}>
                            <Icon name="more-vertical" size="sm" aria-hidden />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {['Assign', 'Duplicate'].map(label => <DropdownMenuItem key={label} onSelect={() => {
                        setFired(\`\${label} - \${ticket.id}\`);
                      }}>
                              {label}
                            </DropdownMenuItem>)}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onSelect={() => {
                        setFired(\`Delete - \${ticket.id}\`);
                      }}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </TableCellOld>
              </TableRowOld>)}
          </TableBodyOld>
        </TableOld>
        <p className="mdt-text-xs mdt-text-muted-foreground">
          {fired === null ? 'Hover a row, then use an action.' : \`Fired: \${fired}\`}
        </p>
      </div>;
  }
}`,...(ze=(Me=R.parameters)==null?void 0:Me.docs)==null?void 0:ze.source},description:{story:`**In-cell actions** - actions revealed inside a content cell, not in a column
of their own.

The trailing actions column has a cost: it is dead space on every row, and in
a wide table it ends up miles from the thing it acts on. Putting the actions
at the end of the cell they belong to keeps them next to their subject and
gives the column back.

**The space is reserved, not created on hover.** The buttons are always in
the layout and only their opacity changes. Mounting them on hover would
reflow the sentence under the cursor, and absolutely positioning them over
the text would need a background that exactly matches the row's hover
colour - which is a mix of two tokens and not expressible as one. The cost is
honest and visible: the subject column is permanently narrower by the width
of the actions, and long subjects truncate.

The primary action is **labelled**, not another icon. Three unlabelled icons
in a content cell is a puzzle; the one people use constantly earns a word.

Same reveal rules as the actions column - hover, keyboard focus, and always
on touch - and the same named group, because \`TableOld\` already owns the
unnamed one.`,...(Ue=($e=R.parameters)==null?void 0:$e.docs)==null?void 0:Ue.description}}};var _e,Le,qe,Pe,Fe;A.parameters={...A.parameters,docs:{...(_e=A.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  name: 'Still missing',
  render: () => <div className="mdt-flex mdt-max-w-2xl mdt-flex-col mdt-gap-4">
      {[{
      title: 'Chart / sparkline component',
      seen: '3 of 27',
      blocked: 'The Sparkline recipe draws its line with a local stand-in. A real component owns the scale, the empty and single-point cases, and the tones.'
    }, {
      title: 'Thumbnail component',
      seen: '3 of 27',
      blocked: 'The Media recipe draws the fallback only. A real component owns the aspect ratio, the loading state and what happens when the image fails.'
    }].map(gap => <div key={gap.title} className="mdt-rounded-md mdt-border mdt-border-dashed mdt-p-4">
          <div className="mdt-flex mdt-items-center mdt-gap-2">
            <span className="mdt-font-medium">{gap.title}</span>
            <Badge tone="warning" shape="square" size="sm">
              placeholder in use
            </Badge>
            <Badge tone="neutral" shape="square" size="sm">
              seen in {gap.seen}
            </Badge>
          </div>
          <p className="mdt-mt-1 mdt-text-sm mdt-text-muted-foreground">{gap.blocked}</p>
        </div>)}
    </div>
}`,...(qe=(Le=A.parameters)==null?void 0:Le.docs)==null?void 0:qe.source},description:{story:`**What is still missing.**

The two recipes above are arrangements agreed against placeholders. They are
not finished until the components underneath them exist, and until then a
product copying them would be copying a stand-in.`,...(Fe=(Pe=A.parameters)==null?void 0:Pe.docs)==null?void 0:Fe.description}}};const Dt=["StatusRecipe","TwoLine","AvatarAndText","Numeric","RowActions","ProgressInCell","EmptyValueRecipe","AllTogether","EditableStatusTag","InCellActions","StillMissing"];export{k as AllTogether,j as AvatarAndText,H as EditableStatusTag,S as EmptyValueRecipe,R as InCellActions,y as Numeric,C as ProgressInCell,N as RowActions,O as StatusRecipe,A as StillMissing,v as TwoLine,Dt as __namedExportsOrder,At as default};
//# sourceMappingURL=TableCellRecipes.stories-OZYecT-G.js.map
