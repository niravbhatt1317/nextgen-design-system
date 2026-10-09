import{j as e,r as h}from"./iframe-BG5W6PCm.js";import"./index-DkSUl2wM.js";import"./index-DXf-30mB.js";import{T as g,a as H,b as D,c as K,d as W,e as r,f as G,g as A,h as U,i as c,j as Je,k as Ye}from"./Table-BNpXvJkZ.js";import{s as _e,T as Oe,a as w,b as Ue,c as R,d as $e,e as Ze,f as Qe}from"./sampleUsers-CwZ5tcGr.js";import{P as I,C as O,T as Ve,a as Xe}from"./TableCells-tIFutYsZ.js";import{I as f}from"./Icon-Clhn8wyD.js";import{B as T}from"./Badge-DZBqUuBp.js";import{T as et,a as V,b as tt,c as q}from"./ToolbarButton-Dl0APDzZ.js";import{I as at}from"./Input-C__d-bUb.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";/* empty css              */import"./Checkbox-DG6gr0a2.js";import"./index-C5X_MeRP.js";import"./index-CnGwWL1Q.js";import"./index-CnFITRtU.js";import"./index-CwJfMhLw.js";import"./index-Cb6XB6gv.js";import"./index-aGBdsVFu.js";import"./index-D_MScWPD.js";import"./index-BFA-kARO.js";import"./index-DdCv_z2P.js";import"./DropdownMenu-B0z8hOMF.js";import"./index-Dwpvj15c.js";import"./index-nBDbhovr.js";import"./index-cRskBikk.js";import"./index-DVeJPn8A.js";import"./Combination-C3z4IqxE.js";import"./index-Bn-AX9VO.js";import"./index-Wu9ozdzO.js";import"./index-DRAYeJX4.js";import"./Tooltip-Bx7knF1D.js";import"./index-LJdkCmVO.js";import"./index-BbGcy6Br.js";import"./Avatar-B5DP5KKf.js";const M=_e(8),E=[60,200,217,200,200],F=_e(25),qe=[60,200,217,200,200,200,200],st=qe.reduce((n,s)=>n+s,0)+60,J=118,Y=140,$=24;function nt(n,s,d){const[p,u]=h.useState(0),[i,t]=h.useState(void 0);return h.useEffect(()=>{const l=n.current,o=s.current;if(!l||!o)return;let b=0,v=0;const L=()=>{t(l.clientHeight-J)},a=()=>{b=0;const Fe=o.getBoundingClientRect().top-l.getBoundingClientRect().top,_=Math.min(1,Math.max(0,(J+Y-Fe)/Y));v>=1&&_<1&&d.current&&(d.current.scrollTop=0),v=_,u(_)},x=()=>{b||(b=requestAnimationFrame(a))};L(),a(),l.addEventListener("scroll",x,{passive:!0});const m=new ResizeObserver(()=>{L(),x()});return m.observe(l),()=>{l.removeEventListener("scroll",x),m.disconnect(),b&&cancelAnimationFrame(b)}},[n,s,d]),{morph:p,height:i}}const _t={title:"New Components/Table/Pieces",component:g,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["The pieces `DataTable` is built from, shown on their own so each can be reviewed: the headings and their states, the selection column, the bulk bar, the two footers, the blank states, the skeleton, and the cells the Users list uses.","Compose them by hand when a list needs something DataTable does not offer."].join(`
`)}}}},j={render:()=>e.jsx(g,{label:"Headings",children:e.jsxs(H,{tableWidth:E.reduce((n,s)=>n+s,60),children:[e.jsx(D,{widths:E,tail:0}),e.jsx(K,{children:e.jsxs("tr",{children:[e.jsx(W,{state:"none",onToggle:()=>{}}),e.jsx(r,{columnKey:"name",label:"Name",width:200,frozen:60,frozenEdge:!0,sortable:!0,sort:"asc"}),e.jsx(r,{columnKey:"email",label:"Email",width:217,sortable:!0,movable:!0,resizable:!0,menu:e.jsx("span",{className:"mdt-px-2 mdt-text-xs",children:"Menu items go here"})}),e.jsx(r,{columnKey:"contact",label:"Contact",width:200,movable:!0,resizable:!0,menu:e.jsx("span",{className:"mdt-px-2 mdt-text-xs",children:"Menu items go here"})}),e.jsx(r,{columnKey:"status",label:"Status",width:200,sortable:!0,movable:!0,resizable:!0,filtered:!0,glyph:e.jsx(f,{name:"loader",size:14}),menu:e.jsx("span",{className:"mdt-px-2 mdt-text-xs",children:"Menu items go here"})})]})}),e.jsx(G,{children:M.slice(0,3).map((n,s)=>e.jsxs(A,{children:[e.jsx(U,{index:s+1,selected:!1,label:n.name,onToggle:()=>{}}),e.jsx(c,{frozen:60,frozenEdge:!0,children:e.jsx(I,{name:n.name,owner:n.owner})}),e.jsx(c,{children:e.jsx("span",{className:"mdt-text-muted-foreground",children:n.email})}),e.jsx(c,{children:e.jsx(O,{email:n.email,phone:n.phone})}),e.jsx(c,{children:e.jsx(T,{size:"sm",tone:"success",dot:!0,children:"Active"})})]},n.id))})]})})},S={render:function(){const[s,d]=h.useState(new Set),p=t=>{d(l=>{const o=new Set(l);return o.has(t)?o.delete(t):o.add(t),o})},u=M.filter(t=>t.status!=="Invited").map(t=>t.id),i=s.size===0?"none":u.every(t=>s.has(t))?"all":"some";return e.jsxs(g,{label:"Selection",children:[e.jsxs(H,{tableWidth:537,hasSelection:s.size>0,children:[e.jsx(D,{widths:[60,200,217],tail:0}),e.jsx(K,{children:e.jsxs("tr",{children:[e.jsx(W,{state:i,onToggle:()=>{d(i==="all"?new Set:new Set(u))}}),e.jsx(r,{columnKey:"name",label:"Name",width:200,frozen:60,frozenEdge:!0}),e.jsx(r,{columnKey:"email",label:"Email",width:217})]})}),e.jsx(G,{children:M.map((t,l)=>{const o=t.status==="Invited";return e.jsxs(A,{selected:s.has(t.id),inert:o,onToggle:()=>{p(t.id)},children:[e.jsx(U,{index:l+1,selected:s.has(t.id),inert:o,label:t.name,onToggle:()=>{p(t.id)}}),e.jsx(c,{frozen:60,frozenEdge:!0,children:e.jsx(I,{name:t.name,owner:t.owner,muted:o})}),e.jsx(c,{children:e.jsx("span",{className:"mdt-text-muted-foreground",children:t.email})})]},t.id)})})]}),e.jsxs(Oe,{count:s.size,onClear:()=>{d(new Set)},children:[e.jsx(w,{icon:e.jsx(f,{name:"toggle-right"}),children:"Activate"}),e.jsx(w,{icon:e.jsx(f,{name:"toggle-left"}),children:"Deactivate"}),e.jsx(Ue,{}),e.jsx(w,{icon:e.jsx(f,{name:"trash-2"}),children:"Delete"})]}),e.jsx(R,{total:M.length,page:1,pageSize:25,onPage:()=>{},onPageSize:()=>{},noun:"users"})]})}},y={render:function(){const[s,d]=h.useState(1),[p,u]=h.useState(25),[i,t]=h.useState(25);return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:[e.jsx(g,{label:"Pager",children:e.jsx(R,{total:10001,page:s,pageSize:p,onPage:d,onPageSize:u,noun:"users"})}),e.jsx(g,{label:"Load more",children:e.jsx($e,{shown:i,total:10001,noun:"users",onMore:()=>{t(l=>l+25)}})})]})}},k={render:()=>e.jsx("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:["first","empty","error"].map(n=>e.jsxs(g,{label:n,children:[e.jsx(Ze,{kind:n,onAction:()=>{}}),e.jsx(R,{total:0,page:1,pageSize:25,onPage:()=>{},onPageSize:()=>{},noun:"users",message:n==="first"?"No users":n==="empty"?"No users match":"Users not loaded"})]},n))})},z={render:()=>e.jsxs(g,{label:"Loading",children:[e.jsxs(H,{tableWidth:E.reduce((n,s)=>n+s,60),children:[e.jsx(D,{widths:E,tail:0}),e.jsx(K,{children:e.jsxs("tr",{children:[e.jsx(W,{state:"none",onToggle:()=>{}}),e.jsx(r,{columnKey:"name",label:"Name",width:200,frozen:60,frozenEdge:!0}),e.jsx(r,{columnKey:"email",label:"Email",width:217}),e.jsx(r,{columnKey:"contact",label:"Contact",width:200}),e.jsx(r,{columnKey:"status",label:"Status",width:200})]})}),e.jsx(Qe,{widths:E})]}),e.jsx(R,{total:0,page:1,pageSize:25,onPage:()=>{},onPageSize:()=>{},noun:"users",message:"Loading users…"})]})},N={render:()=>e.jsxs("div",{className:"mdt-grid mdt-grid-cols-[160px_1fr] mdt-items-center mdt-gap-x-6 mdt-gap-y-4 mdt-text-xs",children:[e.jsx("span",{className:"mdt-text-muted-foreground",children:"Person, owner"}),e.jsx(I,{name:"Sarah Johnson",owner:!0}),e.jsx("span",{className:"mdt-text-muted-foreground",children:"Person, invited"}),e.jsx(I,{name:"Priya Natarajan",muted:!0}),e.jsx("span",{className:"mdt-text-muted-foreground",children:"Contact"}),e.jsx(O,{email:"sarah.johnson@company.com",phone:"+1 415 555 0100"}),e.jsx("span",{className:"mdt-text-muted-foreground",children:"Contact, none"}),e.jsx(O,{}),e.jsx("span",{className:"mdt-text-muted-foreground",children:"Status"}),e.jsxs("span",{className:"mdt-flex mdt-gap-2",children:[e.jsx(T,{size:"sm",tone:"success",dot:!0,children:"Active"}),e.jsx(T,{size:"sm",tone:"slate",dot:!0,children:"Inactive"}),e.jsx(T,{size:"sm",tone:"warning",dot:!0,children:"Invited"})]}),e.jsx("span",{className:"mdt-text-muted-foreground",children:"Source"}),e.jsxs("span",{className:"mdt-flex mdt-gap-2",children:[e.jsx(T,{size:"sm",shape:"square",children:"Manual"}),e.jsx(T,{size:"sm",shape:"square",palette:{fill:"hsl(var(--mdt-indigo-10))",ink:"hsl(var(--mdt-indigo-60))"},children:"LDAP"}),e.jsx(T,{size:"sm",shape:"square",palette:{fill:"hsl(var(--mdt-teal-20))",ink:"hsl(var(--mdt-teal-80))"},children:"SCIM"})]}),e.jsx("span",{className:"mdt-text-muted-foreground",children:"Teams"}),e.jsx(Ve,{items:["Platform","Security","Finance","Design"]}),e.jsx("span",{className:"mdt-text-muted-foreground",children:"Missing value"}),e.jsx(Xe,{})]})},C={parameters:{layout:"fullscreen"},render:function(){const s=h.useRef(null),d=h.useRef(null),p=h.useRef(null),{morph:u,height:i}=nt(s,d,p),[t,l]=h.useState(new Set),o=a=>{l(x=>{const m=new Set(x);return m.has(a)?m.delete(a):m.add(a),m})},b=F.filter(a=>a.status!=="Invited").map(a=>a.id),v=t.size===0?"none":b.every(a=>t.has(a))?"all":"some",L=[["Total users","10,001","+120 this month"],["Active","7,004","70% of everyone"],["Invited","1,012","38 waiting a week or more"]];return e.jsxs("div",{ref:s,className:"mdt-h-[720px] mdt-overflow-y-auto mdt-bg-neutral-10 mdt-font-sans mdt-text-neutral-130",style:{scrollbarWidth:"none"},children:[e.jsxs("div",{className:"mdt-sticky mdt-top-0 mdt-z-10 mdt-bg-neutral-10 mdt-px-6",children:[e.jsx("div",{className:"mdt-flex mdt-h-[72px] mdt-items-center",children:e.jsx("h1",{className:"mdt-m-0 mdt-text-xl mdt-font-semibold",children:"Users"})}),e.jsxs(et,{className:"mdt-h-12",children:[e.jsx(V,{children:e.jsx(at,{size:"sm",placeholder:"Search users",className:"mdt-w-[300px]"})}),e.jsx(tt,{}),e.jsxs(V,{children:[e.jsx(q,{icon:e.jsx(f,{name:"arrow-up-down"}),"aria-label":"Sort"}),e.jsx(q,{icon:e.jsx(f,{name:"columns"}),"aria-label":"Manage columns"})]})]})]}),e.jsxs("div",{className:"mdt-px-6 mdt-pt-6",children:[e.jsx("div",{className:"mdt-mb-6 mdt-grid mdt-grid-cols-3 mdt-gap-4",children:L.map(([a,x,m])=>e.jsxs("div",{className:"mdt-rounded-xl mdt-border mdt-border-solid mdt-border-neutral-20 mdt-bg-background mdt-p-5",children:[e.jsx("div",{className:"mdt-text-xs mdt-text-muted-foreground",children:a}),e.jsx("div",{className:"mdt-mt-1 mdt-text-2xl mdt-font-semibold mdt-tabular-nums",children:x}),e.jsx("div",{className:"mdt-mt-1 mdt-text-xs mdt-text-muted-foreground",children:m})]},a))}),e.jsxs(g,{ref:d,label:"Users",docked:u,style:{height:i,width:`calc(100% + ${String($*2*u)}px)`,marginInline:-$*u},children:[e.jsxs(H,{ref:p,tableWidth:st,hasSelection:t.size>0,children:[e.jsx(D,{widths:qe,tail:0}),e.jsx(K,{children:e.jsxs("tr",{children:[e.jsx(W,{state:v,onToggle:()=>{l(v==="all"?new Set:new Set(b))}}),e.jsx(r,{columnKey:"name",label:"Name",width:200,frozen:60,frozenEdge:!0}),e.jsx(r,{columnKey:"email",label:"Email",width:217,movable:!0,resizable:!0}),e.jsx(r,{columnKey:"status",label:"Status",width:200,movable:!0,sortable:!0}),e.jsx(r,{columnKey:"source",label:"Source",width:200,movable:!0}),e.jsx(r,{columnKey:"teams",label:"Teams",width:200,movable:!0}),e.jsx(r,{columnKey:"role",label:"Role",width:200,movable:!0})]})}),e.jsx(G,{children:F.map((a,x)=>{const m=a.status==="Invited";return e.jsxs(A,{selected:t.has(a.id),inert:m,onToggle:()=>{o(a.id)},children:[e.jsx(U,{index:x+1,selected:t.has(a.id),inert:m,label:a.name,onToggle:()=>{o(a.id)}}),e.jsx(c,{frozen:60,frozenEdge:!0,children:e.jsx(I,{name:a.name,owner:a.owner,muted:m})}),e.jsx(c,{children:e.jsx("span",{className:"mdt-text-muted-foreground",children:a.email})}),e.jsx(c,{children:e.jsx(T,{size:"sm",tone:a.status==="Active"?"success":a.status==="Inactive"?"slate":"warning",dot:!0,children:a.status})}),e.jsx(c,{children:e.jsx(T,{size:"sm",shape:"square",children:a.source})}),e.jsx(c,{children:e.jsx(Ve,{items:a.teams})}),e.jsx(c,{children:a.role})]},a.id)})})]}),e.jsxs(Oe,{count:t.size,onClear:()=>{l(new Set)},children:[e.jsx(w,{icon:e.jsx(f,{name:"toggle-right"}),children:"Activate"}),e.jsx(w,{icon:e.jsx(f,{name:"toggle-left"}),children:"Deactivate"}),e.jsx(Ue,{}),e.jsx(w,{icon:e.jsx(f,{name:"trash-2"}),children:"Delete"})]}),e.jsx(R,{total:10001,page:1,pageSize:25,onPage:()=>{},onPageSize:()=>{},noun:"users"})]})]})]})}},P={render:function(){const[s,d]=h.useState([2]),p=["Sarah Johnson","Michael Smith","Emily Davis"],u=[{selectable:!1,caption:"No bulk actions — a hash, and the row number"},{selectable:!0,caption:"With bulk actions — a checkbox in the same slot"}];return e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:28},children:u.map(i=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsx("div",{style:{fontSize:12,color:"hsl(var(--mdt-neutral-90))"},children:i.caption}),e.jsx(g,{label:i.caption,children:e.jsxs(H,{tableWidth:620,label:i.caption,children:[e.jsx(D,{widths:[60,240,200],tail:0}),e.jsx(K,{children:e.jsxs(A,{inert:!0,children:[e.jsx(Je,{selectable:i.selectable,state:s.length===0?"none":s.length===3?"all":"some",onToggle:()=>{d(t=>t.length===0?[0,1,2]:[])}}),e.jsx(r,{columnKey:"name",label:"Name",width:240}),e.jsx(r,{columnKey:"role",label:"Role",width:200})]})}),e.jsx(G,{children:p.map((t,l)=>e.jsxs(A,{selected:i.selectable&&s.includes(l),children:[e.jsx(Ye,{index:l+1,label:t,selectable:i.selectable,selected:s.includes(l),onToggle:()=>{d(o=>o.includes(l)?o.filter(b=>b!==l):[...o,l])}}),e.jsx(c,{children:t}),e.jsx(c,{children:"Operator"})]},t))})]})})]},i.caption))})}},B={render:()=>e.jsxs("div",{style:{height:460,overflowY:"auto",border:"1px solid hsl(var(--mdt-neutral-20))","--mdt-band-b1-h":"60px","--mdt-band-b2t-h":"60px"},children:[e.jsx("div",{style:{position:"sticky",top:0,zIndex:36,height:60,background:"hsl(var(--mdt-background))",borderBottom:"1px solid hsl(var(--mdt-neutral-20))"}}),e.jsx("div",{style:{height:140,padding:16},children:"A hero band, which scrolls away."}),e.jsx("div",{style:{position:"sticky",top:58,zIndex:35,height:60,background:"hsl(var(--mdt-background))"}}),e.jsx("div",{style:{padding:"6px 24px 20px"},children:e.jsx(g,{label:"One row, expanding",expand:!0,children:e.jsx("div",{style:{padding:16},children:"A single row."})})})]})};var Z,Q,X,ee,te;j.parameters={...j.parameters,docs:{...(Z=j.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => <Table label="Headings">
      <TableViewport tableWidth={WIDTHS.reduce((a, b) => a + b, 60)}>
        <TableColGroup widths={WIDTHS} tail={0} />
        <TableHeader>
          <tr>
            <TableSelectAll state="none" onToggle={() => undefined} />
            <TableHead columnKey="name" label="Name" width={200} frozen={60} frozenEdge sortable sort="asc" />
            <TableHead columnKey="email" label="Email" width={217} sortable movable resizable menu={<span className="mdt-px-2 mdt-text-xs">Menu items go here</span>} />
            <TableHead columnKey="contact" label="Contact" width={200} movable resizable menu={<span className="mdt-px-2 mdt-text-xs">Menu items go here</span>} />
            <TableHead columnKey="status" label="Status" width={200} sortable movable resizable filtered glyph={<Icon name="loader" size={14} />} menu={<span className="mdt-px-2 mdt-text-xs">Menu items go here</span>} />
          </tr>
        </TableHeader>
        <TableBody>
          {USERS.slice(0, 3).map((u, i) => <TableRow key={u.id}>
              <TableSelectionCell index={i + 1} selected={false} label={u.name} onToggle={() => undefined} />
              <TableCell frozen={60} frozenEdge>
                <PersonCell name={u.name} owner={u.owner} />
              </TableCell>
              <TableCell>
                <span className="mdt-text-muted-foreground">{u.email}</span>
              </TableCell>
              <TableCell>
                <ContactChips email={u.email} phone={u.phone} />
              </TableCell>
              <TableCell>
                <Badge size="sm" tone="success" dot>
                  Active
                </Badge>
              </TableCell>
            </TableRow>)}
        </TableBody>
      </TableViewport>
    </Table>
}`,...(X=(Q=j.parameters)==null?void 0:Q.docs)==null?void 0:X.source},description:{story:'Name sorted A to Z; Status carrying its quick filter: the wash and the azure glyph. Hover Email for the grip, the faint arrow and the "⋯".',...(te=(ee=j.parameters)==null?void 0:ee.docs)==null?void 0:te.description}}};var ae,se,ne,le,oe;S.parameters={...S.parameters,docs:{...(ae=S.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: function SelectionStory() {
    const [picked, setPicked] = useState<Set<string>>(new Set());
    const toggle = (id: string) => {
      setPicked(s => {
        const n = new Set(s);
        if (n.has(id)) n.delete(id);else n.add(id);
        return n;
      });
    };
    const ids = USERS.filter(u => u.status !== 'Invited').map(u => u.id);
    const state = picked.size === 0 ? 'none' : ids.every(id => picked.has(id)) ? 'all' : 'some';
    return <Table label="Selection">
        <TableViewport tableWidth={60 + 200 + 217 + 60} hasSelection={picked.size > 0}>
          <TableColGroup widths={[60, 200, 217]} tail={0} />
          <TableHeader>
            <tr>
              <TableSelectAll state={state} onToggle={() => {
              setPicked(state === 'all' ? new Set() : new Set(ids));
            }} />
              <TableHead columnKey="name" label="Name" width={200} frozen={60} frozenEdge />
              <TableHead columnKey="email" label="Email" width={217} />
            </tr>
          </TableHeader>
          <TableBody>
            {USERS.map((u, i) => {
            const inert = u.status === 'Invited';
            return <TableRow key={u.id} selected={picked.has(u.id)} inert={inert} onToggle={() => {
              toggle(u.id);
            }}>
                  <TableSelectionCell index={i + 1} selected={picked.has(u.id)} inert={inert} label={u.name} onToggle={() => {
                toggle(u.id);
              }} />
                  <TableCell frozen={60} frozenEdge>
                    <PersonCell name={u.name} owner={u.owner} muted={inert} />
                  </TableCell>
                  <TableCell>
                    <span className="mdt-text-muted-foreground">{u.email}</span>
                  </TableCell>
                </TableRow>;
          })}
          </TableBody>
        </TableViewport>
        <TableBulkBar count={picked.size} onClear={() => {
        setPicked(new Set());
      }}>
          <TableBulkAction icon={<Icon name="toggle-right" />}>Activate</TableBulkAction>
          <TableBulkAction icon={<Icon name="toggle-left" />}>Deactivate</TableBulkAction>
          <TableBulkSeparator />
          <TableBulkAction icon={<Icon name="trash-2" />}>Delete</TableBulkAction>
        </TableBulkBar>
        <TablePager total={USERS.length} page={1} pageSize={25} onPage={() => undefined} onPageSize={() => undefined} noun="users" />
      </Table>;
  }
}`,...(ne=(se=S.parameters)==null?void 0:se.docs)==null?void 0:ne.source},description:{story:"Row numbers at rest; pick one and every row shows its checkbox. Tab to a row: Space picks, Enter opens, ↑ ↓ move.",...(oe=(le=S.parameters)==null?void 0:le.docs)==null?void 0:oe.description}}};var re,ie,de,ce,me;y.parameters={...y.parameters,docs:{...(re=y.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: function FootersStory() {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(25);
    const [shown, setShown] = useState(25);
    return <div className="mdt-flex mdt-flex-col mdt-gap-6">
        <Table label="Pager">
          <TablePager total={10001} page={page} pageSize={size} onPage={setPage} onPageSize={setSize} noun="users" />
        </Table>
        <Table label="Load more">
          <TableLoadMore shown={shown} total={10001} noun="users" onMore={() => {
          setShown(n => n + 25);
        }} />
        </Table>
      </div>;
  }
}`,...(de=(ie=y.parameters)==null?void 0:ie.docs)==null?void 0:de.source},description:{story:'The two footers: the pager built for 401 pages, and the "Load more" strip.',...(me=(ce=y.parameters)==null?void 0:ce.docs)==null?void 0:me.description}}};var ue,he,pe,be,ge;k.parameters={...k.parameters,docs:{...(ue=k.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-6">
      {(['first', 'empty', 'error'] as const).map(kind => <Table key={kind} label={kind}>
          <TableBlank kind={kind} onAction={() => undefined} />
          <TablePager total={0} page={1} pageSize={25} onPage={() => undefined} onPageSize={() => undefined} noun="users" message={kind === 'first' ? 'No users' : kind === 'empty' ? 'No users match' : 'Users not loaded'} />
        </Table>)}
    </div>
}`,...(pe=(he=k.parameters)==null?void 0:he.docs)==null?void 0:pe.source},description:{story:"Nothing yet, nothing found, could not load. Centred in the card: an icon, a title, one line, one button.",...(ge=(be=k.parameters)==null?void 0:be.docs)==null?void 0:ge.description}}};var xe,Te,fe,we,ve;z.parameters={...z.parameters,docs:{...(xe=z.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  render: () => <Table label="Loading">
      <TableViewport tableWidth={WIDTHS.reduce((a, b) => a + b, 60)}>
        <TableColGroup widths={WIDTHS} tail={0} />
        <TableHeader>
          <tr>
            <TableSelectAll state="none" onToggle={() => undefined} />
            <TableHead columnKey="name" label="Name" width={200} frozen={60} frozenEdge />
            <TableHead columnKey="email" label="Email" width={217} />
            <TableHead columnKey="contact" label="Contact" width={200} />
            <TableHead columnKey="status" label="Status" width={200} />
          </tr>
        </TableHeader>
        <TableSkeleton widths={WIDTHS} />
      </TableViewport>
      <TablePager total={0} page={1} pageSize={25} onPage={() => undefined} onPageSize={() => undefined} noun="users" message="Loading users…" />
    </Table>
}`,...(fe=(Te=z.parameters)==null?void 0:Te.docs)==null?void 0:fe.source},description:{story:"Five grey rows while the list loads.",...(ve=(we=z.parameters)==null?void 0:we.docs)==null?void 0:ve.description}}};var je,Se,ye,ke,ze;N.parameters={...N.parameters,docs:{...(je=N.parameters)==null?void 0:je.docs,source:{originalSource:`{
  render: () => <div className="mdt-grid mdt-grid-cols-[160px_1fr] mdt-items-center mdt-gap-x-6 mdt-gap-y-4 mdt-text-xs">
      <span className="mdt-text-muted-foreground">Person, owner</span>
      <PersonCell name="Sarah Johnson" owner />
      <span className="mdt-text-muted-foreground">Person, invited</span>
      <PersonCell name="Priya Natarajan" muted />
      <span className="mdt-text-muted-foreground">Contact</span>
      <ContactChips email="sarah.johnson@company.com" phone="+1 415 555 0100" />
      <span className="mdt-text-muted-foreground">Contact, none</span>
      <ContactChips />
      <span className="mdt-text-muted-foreground">Status</span>
      <span className="mdt-flex mdt-gap-2">
        <Badge size="sm" tone="success" dot>
          Active
        </Badge>
        <Badge size="sm" tone="slate" dot>
          Inactive
        </Badge>
        <Badge size="sm" tone="warning" dot>
          Invited
        </Badge>
      </span>
      <span className="mdt-text-muted-foreground">Source</span>
      <span className="mdt-flex mdt-gap-2">
        <Badge size="sm" shape="square">
          Manual
        </Badge>
        <Badge size="sm" shape="square" palette={{
        fill: 'hsl(var(--mdt-indigo-10))',
        ink: 'hsl(var(--mdt-indigo-60))'
      }}>
          LDAP
        </Badge>
        <Badge size="sm" shape="square" palette={{
        fill: 'hsl(var(--mdt-teal-20))',
        ink: 'hsl(var(--mdt-teal-80))'
      }}>
          SCIM
        </Badge>
      </span>
      <span className="mdt-text-muted-foreground">Teams</span>
      <TagList items={['Platform', 'Security', 'Finance', 'Design']} />
      <span className="mdt-text-muted-foreground">Missing value</span>
      <TableEmptyValue />
    </div>
}`,...(ye=(Se=N.parameters)==null?void 0:Se.docs)==null?void 0:ye.source},description:{story:'The cells the Users list uses: the person, the contact chips, teams with a "+N", a missing value. Every pill is Badge.',...(ze=(ke=N.parameters)==null?void 0:ke.docs)==null?void 0:ze.description}}};var Ne,Ce,Pe,Be,Ee;C.parameters={...C.parameters,docs:{...(Ne=C.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: function DocksOnScrollStory() {
    const scroller = useRef<HTMLDivElement>(null);
    const card = useRef<HTMLDivElement>(null);
    const rows = useRef<HTMLDivElement>(null);
    const {
      morph,
      height
    } = useDockOnScroll(scroller, card, rows);
    const [picked, setPicked] = useState<Set<string>>(new Set());
    const toggle = (id: string) => {
      setPicked(s => {
        const n = new Set(s);
        if (n.has(id)) n.delete(id);else n.add(id);
        return n;
      });
    };
    const ids = PAGE.filter(u => u.status !== 'Invited').map(u => u.id);
    const state = picked.size === 0 ? 'none' : ids.every(id => picked.has(id)) ? 'all' : 'some';
    const kpi = [['Total users', '10,001', '+120 this month'], ['Active', '7,004', '70% of everyone'], ['Invited', '1,012', '38 waiting a week or more']];
    return <div ref={scroller} className="mdt-h-[720px] mdt-overflow-y-auto mdt-bg-neutral-10 mdt-font-sans mdt-text-neutral-130" style={{
      scrollbarWidth: 'none'
    }}>
        <div className="mdt-sticky mdt-top-0 mdt-z-10 mdt-bg-neutral-10 mdt-px-6">
          <div className="mdt-flex mdt-h-[72px] mdt-items-center">
            <h1 className="mdt-m-0 mdt-text-xl mdt-font-semibold">Users</h1>
          </div>
          <Toolbar className="mdt-h-12">
            <ToolbarSection>
              <Input size="sm" placeholder="Search users" className="mdt-w-[300px]" />
            </ToolbarSection>
            <ToolbarSpacer />
            <ToolbarSection>
              <ToolbarButton icon={<Icon name="arrow-up-down" />} aria-label="Sort" />
              <ToolbarButton icon={<Icon name="columns" />} aria-label="Manage columns" />
            </ToolbarSection>
          </Toolbar>
        </div>
        <div className="mdt-px-6 mdt-pt-6">
          <div className="mdt-mb-6 mdt-grid mdt-grid-cols-3 mdt-gap-4">
            {kpi.map(([k, v, note]) => <div key={k} className="mdt-rounded-xl mdt-border mdt-border-solid mdt-border-neutral-20 mdt-bg-background mdt-p-5">
                <div className="mdt-text-xs mdt-text-muted-foreground">{k}</div>
                <div className="mdt-mt-1 mdt-text-2xl mdt-font-semibold mdt-tabular-nums">{v}</div>
                <div className="mdt-mt-1 mdt-text-xs mdt-text-muted-foreground">{note}</div>
              </div>)}
          </div>
          <Table ref={card} label="Users" docked={morph} style={{
          height,
          width: \`calc(100% + \${String(PAGE_INSET * 2 * morph)}px)\`,
          marginInline: -PAGE_INSET * morph
        }}>
            <TableViewport ref={rows} tableWidth={PAGE_TABLE_WIDTH} hasSelection={picked.size > 0}>
              <TableColGroup widths={PAGE_WIDTHS} tail={0} />
              <TableHeader>
                <tr>
                  <TableSelectAll state={state} onToggle={() => {
                  setPicked(state === 'all' ? new Set() : new Set(ids));
                }} />
                  <TableHead columnKey="name" label="Name" width={200} frozen={60} frozenEdge />
                  <TableHead columnKey="email" label="Email" width={217} movable resizable />
                  <TableHead columnKey="status" label="Status" width={200} movable sortable />
                  <TableHead columnKey="source" label="Source" width={200} movable />
                  <TableHead columnKey="teams" label="Teams" width={200} movable />
                  <TableHead columnKey="role" label="Role" width={200} movable />
                </tr>
              </TableHeader>
              <TableBody>
                {PAGE.map((u, i) => {
                const inert = u.status === 'Invited';
                return <TableRow key={u.id} selected={picked.has(u.id)} inert={inert} onToggle={() => {
                  toggle(u.id);
                }}>
                      <TableSelectionCell index={i + 1} selected={picked.has(u.id)} inert={inert} label={u.name} onToggle={() => {
                    toggle(u.id);
                  }} />
                      <TableCell frozen={60} frozenEdge>
                        <PersonCell name={u.name} owner={u.owner} muted={inert} />
                      </TableCell>
                      <TableCell>
                        <span className="mdt-text-muted-foreground">{u.email}</span>
                      </TableCell>
                      <TableCell>
                        <Badge size="sm" tone={u.status === 'Active' ? 'success' : u.status === 'Inactive' ? 'slate' : 'warning'} dot>
                          {u.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge size="sm" shape="square">
                          {u.source}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <TagList items={u.teams} />
                      </TableCell>
                      <TableCell>{u.role}</TableCell>
                    </TableRow>;
              })}
              </TableBody>
            </TableViewport>
            <TableBulkBar count={picked.size} onClear={() => {
            setPicked(new Set());
          }}>
              <TableBulkAction icon={<Icon name="toggle-right" />}>Activate</TableBulkAction>
              <TableBulkAction icon={<Icon name="toggle-left" />}>Deactivate</TableBulkAction>
              <TableBulkSeparator />
              <TableBulkAction icon={<Icon name="trash-2" />}>Delete</TableBulkAction>
            </TableBulkBar>
            <TablePager total={10001} page={1} pageSize={25} onPage={() => undefined} onPageSize={() => undefined} noun="users" />
          </Table>
        </div>
      </div>;
  }
}`,...(Pe=(Ce=C.parameters)==null?void 0:Ce.docs)==null?void 0:Pe.source},description:{story:"The card becomes the page. Scroll the frame: the card grows into the 24px margins, its corners square off, and at the dock line under the toolbar the rows scroll inside it with the header and pager pinned. Scroll the rows back to their top and the page takes over again. The table only decides how the docked card looks; the small helper in this story is the page's half, and belongs with the page scaffold.",...(Ee=(Be=C.parameters)==null?void 0:Be.docs)==null?void 0:Ee.description}}};var Ae,Ie,He,De,Ke;P.parameters={...P.parameters,docs:{...(Ae=P.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  render: function LeadColumn() {
    const [picked, setPicked] = useState<number[]>([2]);
    const people = ['Sarah Johnson', 'Michael Smith', 'Emily Davis'];
    const both: {
      selectable: boolean;
      caption: string;
    }[] = [{
      selectable: false,
      caption: 'No bulk actions — a hash, and the row number'
    }, {
      selectable: true,
      caption: 'With bulk actions — a checkbox in the same slot'
    }];
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }}>
        {both.map(v => <div key={v.caption} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}>
            <div style={{
          fontSize: 12,
          color: 'hsl(var(--mdt-neutral-90))'
        }}>{v.caption}</div>
            <Table label={v.caption}>
              <TableViewport tableWidth={620} label={v.caption}>
                <TableColGroup widths={[60, 240, 200]} tail={0} />
                <TableHeader>
                  <TableRow inert>
                    <TableLeadHead selectable={v.selectable} state={picked.length === 0 ? 'none' : picked.length === 3 ? 'all' : 'some'} onToggle={() => {
                  setPicked(p => p.length === 0 ? [0, 1, 2] : []);
                }} />
                    <TableHead columnKey="name" label="Name" width={240} />
                    <TableHead columnKey="role" label="Role" width={200} />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {people.map((name, i) => <TableRow key={name} selected={v.selectable && picked.includes(i)}>
                      <TableLeadCell index={i + 1} label={name} selectable={v.selectable} selected={picked.includes(i)} onToggle={() => {
                  setPicked(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
                }} />
                      <TableCell>{name}</TableCell>
                      <TableCell>Operator</TableCell>
                    </TableRow>)}
                </TableBody>
              </TableViewport>
            </Table>
          </div>)}
      </div>;
  }
}`,...(He=(Ie=P.parameters)==null?void 0:Ie.docs)==null?void 0:He.source},description:{story:`**The lead column is one slot with two occupants.**

A table that can act on many rows at once puts a checkbox here. A table that
cannot puts the row number, under a **hash** — not a blank heading, which
read as a column somebody forgot to label and left the numbers underneath
with no name.

Same slot, same 60px, same alignment. A page that later grows bulk actions
changes nothing about its columns, and a page that loses them leaves no hole.

**The page does not choose which.** It says whether it has bulk actions and
\`TableLeadHead\` / \`TableLeadCell\` draw the right one. That is the whole
reason this is one component rather than two the caller has to keep in step.

(Pranjal, 2026-09-11.)`,...(Ke=(De=P.parameters)==null?void 0:De.docs)==null?void 0:Ke.description}}};var Re,Le,Me,We,Ge;B.parameters={...B.parameters,docs:{...(Re=B.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  render: () => <div style={{
    height: 460,
    overflowY: 'auto',
    border: '1px solid hsl(var(--mdt-neutral-20))',
    // the two band heights a PageFrame publishes; the table reads them
    ['--mdt-band-b1-h' as string]: '60px',
    ['--mdt-band-b2t-h' as string]: '60px'
  }}>
      <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 36,
      height: 60,
      background: 'hsl(var(--mdt-background))',
      borderBottom: '1px solid hsl(var(--mdt-neutral-20))'
    }} />
      <div style={{
      height: 140,
      padding: 16
    }}>A hero band, which scrolls away.</div>
      <div style={{
      position: 'sticky',
      top: 58,
      zIndex: 35,
      height: 60,
      background: 'hsl(var(--mdt-background))'
    }} />
      <div style={{
      padding: '6px 24px 20px'
    }}>
        <Table label="One row, expanding" expand>
          <div style={{
          padding: 16
        }}>A single row.</div>
        </Table>
      </div>
    </div>
}`,...(Me=(Le=B.parameters)==null?void 0:Le.docs)==null?void 0:Me.source},description:{story:`**Scroll this one.** The table drives itself: it takes the whole height under
the dock line, widens to the page as it reaches it, then hands the scroll to
its own rows.

It holds **one row**. That is the point — expansion is a property of the
table, not of how much happens to be in it, so a filtered-down list does not
suddenly behave like a different component, and the pager does not float up
under a short list. (Pranjal's rule, 2026-09-10.)

**This is the default.** \`expand\` is written out below only to say so out
loud; leave it off and you get the same table. A table with no page to fill —
in a drawer, a modal or a card — quietly stays an ordinary card instead, so
the default costs nothing where it does not apply. \`expand={false}\` opts out.`,...(Ge=(We=B.parameters)==null?void 0:We.docs)==null?void 0:Ge.description}}};const Ot=["Headings","Selection","Footers","BlankStates","Skeleton","Cells","DocksOnScroll","TheLeadColumn","ExpandsWithASingleRow"];export{k as BlankStates,N as Cells,C as DocksOnScroll,B as ExpandsWithASingleRow,y as Footers,j as Headings,S as Selection,z as Skeleton,P as TheLeadColumn,Ot as __namedExportsOrder,_t as default};
//# sourceMappingURL=Table.stories-ra3TlQFJ.js.map
