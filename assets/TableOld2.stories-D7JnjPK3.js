import{j as e,r as T}from"./iframe-Bjx_Kh3y.js";import"./index-DkSUl2wM.js";import"./index-DXf-30mB.js";import{T as h,a as _,b as G,c as J,d as Z,e as o,f as S,g as Q,s as ee,h as X,i as Y,j as d,P as f,C as z,k as ae,l as w,m as te,n as $,o as se,p as le,q as ne}from"./sampleUsers-BhwJ71bY.js";import{I as O}from"./Icon-S4pcH5d6.js";import{B as n}from"./Badge-B-ZqXXR2.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./Checkbox-D3wWw7Mo.js";import"./index-DnOxuaGU.js";import"./index-CCNESHD5.js";import"./index-CMDREd8O.js";import"./index-BM5wpaMB.js";import"./index-j3hSFoY8.js";import"./index-CGr31MeA.js";import"./index-D-Lp5d4x.js";import"./index-vy9OShmA.js";import"./index-D0Vbjczh.js";import"./DropdownMenu-BZsYSMk-.js";import"./index-CKnNcxg0.js";import"./index-U-bLp-ae.js";import"./index-vfatFlHq.js";import"./index-OPfqS8Z0.js";import"./Combination-DhTZJdhn.js";import"./index-BTD45hXP.js";import"./index-Dcoy6Ihn.js";import"./index-Dz24nEHm.js";import"./Avatar-DLRAm_WK.js";import"./Tooltip-BP-M5SIr.js";import"./index-CNXMDnE7.js";import"./index-nKbUvald.js";const j=ee(8),v=[60,200,217,200,200],Me={title:"Deprecated 2/DataTable Old/Pieces",component:h,tags:["autodocs"],parameters:{layout:"padded",status:{type:"deprecated",since:"0.5.1",deprecation:{deprecatedSince:"0.5.1",removalIn:"to be set by Nirav",replacement:"Table",message:"The Table pieces as they were before 11 September 2026. Deprecated 2026-09-22 when Pranjal ruled the new ones in; kept for side-by-side review; Nirav sets the removal version."}},docs:{description:{component:["## ⚠️ Deprecated — use `Table`","","The Table pieces as they were before 11 September 2026. Deprecated 2026-09-22 when","Pranjal ruled the new ones in; kept for side-by-side review; Nirav sets the removal version.","","**Do not start anything new on them.**","","The pieces `DataTableOld2` is built from, shown on their own so each can be compared","with the live one: the headings and their states, the selection column, the bulk bar,","the two footers, and the cells the Users list uses."].join(`
`)}}}},m={render:()=>e.jsx(h,{label:"Headings",children:e.jsxs(_,{tableWidth:v.reduce((s,t)=>s+t,60),children:[e.jsx(G,{widths:v}),e.jsx(J,{children:e.jsxs("tr",{children:[e.jsx(Z,{state:"none",onToggle:()=>{},onScope:()=>{}}),e.jsx(o,{columnKey:"name",label:"Name",width:200,frozen:60,frozenEdge:!0,sortable:!0,sort:"asc"}),e.jsx(o,{columnKey:"email",label:"Email",width:217,sortable:!0,movable:!0,resizable:!0,menu:e.jsx("span",{className:"mdt-px-2 mdt-text-xs",children:"Menu items go here"})}),e.jsx(o,{columnKey:"contact",label:"Contact",width:200,movable:!0,resizable:!0,menu:e.jsx("span",{className:"mdt-px-2 mdt-text-xs",children:"Menu items go here"})}),e.jsx(o,{columnKey:"status",label:"Status",width:200,sortable:!0,movable:!0,resizable:!0,filtered:!0,glyph:e.jsx(O,{name:"loader",size:14}),menu:e.jsx("span",{className:"mdt-px-2 mdt-text-xs",children:"Menu items go here"})}),e.jsx(S,{head:!0})]})}),e.jsx(Q,{children:j.slice(0,3).map((s,t)=>e.jsxs(X,{children:[e.jsx(Y,{index:t+1,selected:!1,label:s.name,onToggle:()=>{}}),e.jsx(d,{frozen:60,frozenEdge:!0,children:e.jsx(f,{name:s.name,owner:s.owner})}),e.jsx(d,{children:e.jsx("span",{className:"mdt-text-muted-foreground",children:s.email})}),e.jsx(d,{children:e.jsx(z,{email:s.email,phone:s.phone})}),e.jsx(d,{children:e.jsx(n,{size:"sm",tone:"success",dot:!0,children:"Active"})}),e.jsx(S,{})]},s.id))})]})})},c={render:function(){const[t,r]=T.useState(new Set),g=a=>{r(i=>{const l=new Set(i);return l.has(a)?l.delete(a):l.add(a),l})},b=j.filter(a=>a.status!=="Invited").map(a=>a.id),x=t.size===0?"none":b.every(a=>t.has(a))?"all":"some";return e.jsxs(h,{label:"Selection",children:[e.jsxs(_,{tableWidth:537,hasSelection:t.size>0,children:[e.jsx(G,{widths:[60,200,217]}),e.jsx(J,{children:e.jsxs("tr",{children:[e.jsx(Z,{state:x,onToggle:()=>{r(x==="all"?new Set:new Set(b))},onScope:()=>{}}),e.jsx(o,{columnKey:"name",label:"Name",width:200,frozen:60,frozenEdge:!0}),e.jsx(o,{columnKey:"email",label:"Email",width:217}),e.jsx(S,{head:!0})]})}),e.jsx(Q,{children:j.map((a,i)=>{const l=a.status==="Invited";return e.jsxs(X,{selected:t.has(a.id),inert:l,onToggle:()=>{g(a.id)},children:[e.jsx(Y,{index:i+1,selected:t.has(a.id),inert:l,label:a.name,onToggle:()=>{g(a.id)}}),e.jsx(d,{frozen:60,frozenEdge:!0,children:e.jsx(f,{name:a.name,owner:a.owner,muted:l})}),e.jsx(d,{children:e.jsx("span",{className:"mdt-text-muted-foreground",children:a.email})}),e.jsx(S,{})]},a.id)})})]}),e.jsxs(ae,{count:t.size,onClear:()=>{r(new Set)},children:[e.jsx(w,{icon:e.jsx(O,{name:"toggle-right"}),children:"Activate"}),e.jsx(w,{icon:e.jsx(O,{name:"toggle-left"}),children:"Deactivate"}),e.jsx(te,{}),e.jsx(w,{icon:e.jsx(O,{name:"trash-2"}),children:"Delete"})]}),e.jsx($,{total:j.length,page:1,pageSize:25,onPage:()=>{},onPageSize:()=>{},noun:"users"})]})}},p={render:function(){const[t,r]=T.useState(1),[g,b]=T.useState(25),[x,a]=T.useState(25);return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:[e.jsx(h,{label:"Pager",children:e.jsx($,{total:10001,page:t,pageSize:g,onPage:r,onPageSize:b,noun:"users"})}),e.jsx(h,{label:"Load more",children:e.jsx(se,{shown:x,total:10001,noun:"users",onMore:()=>{a(i=>i+25)}})})]})}},u={render:()=>e.jsxs("div",{className:"mdt-grid mdt-grid-cols-[160px_1fr] mdt-items-center mdt-gap-x-6 mdt-gap-y-4 mdt-text-xs",children:[e.jsx("span",{className:"mdt-text-muted-foreground",children:"Person, owner"}),e.jsx(f,{name:"Sarah Johnson",owner:!0}),e.jsx("span",{className:"mdt-text-muted-foreground",children:"Person, invited"}),e.jsx(f,{name:"Priya Natarajan",muted:!0}),e.jsx("span",{className:"mdt-text-muted-foreground",children:"Contact"}),e.jsx(z,{email:"sarah.johnson@company.com",phone:"+1 415 555 0100"}),e.jsx("span",{className:"mdt-text-muted-foreground",children:"Contact, none"}),e.jsx(z,{}),e.jsx("span",{className:"mdt-text-muted-foreground",children:"Status"}),e.jsxs("span",{className:"mdt-flex mdt-gap-2",children:[e.jsx(n,{size:"sm",tone:"success",dot:!0,children:"Active"}),e.jsx(n,{size:"sm",tone:"slate",dot:!0,children:"Inactive"}),e.jsx(n,{size:"sm",tone:"warning",dot:!0,children:"Invited"})]}),e.jsx("span",{className:"mdt-text-muted-foreground",children:"Source"}),e.jsxs("span",{className:"mdt-flex mdt-gap-2",children:[e.jsx(n,{size:"sm",shape:"square",children:"Manual"}),e.jsx(n,{size:"sm",shape:"square",palette:{fill:"#F2F3FD",ink:"#4F5BC4"},children:"LDAP"}),e.jsx(n,{size:"sm",shape:"square",palette:{fill:"#EDF8F7",ink:"#1F7A71"},children:"SCIM"})]}),e.jsx("span",{className:"mdt-text-muted-foreground",children:"Teams"}),e.jsx(le,{items:["Platform","Security","Finance","Design"]}),e.jsx("span",{className:"mdt-text-muted-foreground",children:"Missing value"}),e.jsx(ne,{})]})};var y,C,N,P,k;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <TableOld2 label="Headings">
      <TableViewportOld2 tableWidth={WIDTHS.reduce((a, b) => a + b, 60)}>
        <TableColGroupOld2 widths={WIDTHS} />
        <TableHeaderOld2>
          <tr>
            <TableSelectAllOld2 state="none" onToggle={() => undefined} onScope={() => undefined} />
            <TableHeadOld2 columnKey="name" label="Name" width={200} frozen={60} frozenEdge sortable sort="asc" />
            <TableHeadOld2 columnKey="email" label="Email" width={217} sortable movable resizable menu={<span className="mdt-px-2 mdt-text-xs">Menu items go here</span>} />
            <TableHeadOld2 columnKey="contact" label="Contact" width={200} movable resizable menu={<span className="mdt-px-2 mdt-text-xs">Menu items go here</span>} />
            <TableHeadOld2 columnKey="status" label="Status" width={200} sortable movable resizable filtered glyph={<Icon name="loader" size={14} />} menu={<span className="mdt-px-2 mdt-text-xs">Menu items go here</span>} />
            <TableTailCellOld2 head />
          </tr>
        </TableHeaderOld2>
        <TableBodyOld2>
          {USERS.slice(0, 3).map((u, i) => <TableRowOld2 key={u.id}>
              <TableSelectionCellOld2 index={i + 1} selected={false} label={u.name} onToggle={() => undefined} />
              <TableCellOld2 frozen={60} frozenEdge>
                <PersonCellOld2 name={u.name} owner={u.owner} />
              </TableCellOld2>
              <TableCellOld2>
                <span className="mdt-text-muted-foreground">{u.email}</span>
              </TableCellOld2>
              <TableCellOld2>
                <ContactChipsOld2 email={u.email} phone={u.phone} />
              </TableCellOld2>
              <TableCellOld2>
                <Badge size="sm" tone="success" dot>
                  Active
                </Badge>
              </TableCellOld2>
              <TableTailCellOld2 />
            </TableRowOld2>)}
        </TableBodyOld2>
      </TableViewportOld2>
    </TableOld2>
}`,...(N=(C=m.parameters)==null?void 0:C.docs)==null?void 0:N.source},description:{story:'Name sorted A to Z; Status carrying its quick filter: the wash and the azure glyph. Hover Email for the grip, the faint arrow and the "⋯".',...(k=(P=m.parameters)==null?void 0:P.docs)==null?void 0:k.description}}};var B,E,D,A,F;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
    return <TableOld2 label="Selection">
        <TableViewportOld2 tableWidth={60 + 200 + 217 + 60} hasSelection={picked.size > 0}>
          <TableColGroupOld2 widths={[60, 200, 217]} />
          <TableHeaderOld2>
            <tr>
              <TableSelectAllOld2 state={state} onToggle={() => {
              setPicked(state === 'all' ? new Set() : new Set(ids));
            }} onScope={() => undefined} />
              <TableHeadOld2 columnKey="name" label="Name" width={200} frozen={60} frozenEdge />
              <TableHeadOld2 columnKey="email" label="Email" width={217} />
              <TableTailCellOld2 head />
            </tr>
          </TableHeaderOld2>
          <TableBodyOld2>
            {USERS.map((u, i) => {
            const inert = u.status === 'Invited';
            return <TableRowOld2 key={u.id} selected={picked.has(u.id)} inert={inert} onToggle={() => {
              toggle(u.id);
            }}>
                  <TableSelectionCellOld2 index={i + 1} selected={picked.has(u.id)} inert={inert} label={u.name} onToggle={() => {
                toggle(u.id);
              }} />
                  <TableCellOld2 frozen={60} frozenEdge>
                    <PersonCellOld2 name={u.name} owner={u.owner} muted={inert} />
                  </TableCellOld2>
                  <TableCellOld2>
                    <span className="mdt-text-muted-foreground">{u.email}</span>
                  </TableCellOld2>
                  <TableTailCellOld2 />
                </TableRowOld2>;
          })}
          </TableBodyOld2>
        </TableViewportOld2>
        <TableBulkBarOld2 count={picked.size} onClear={() => {
        setPicked(new Set());
      }}>
          <TableBulkActionOld2 icon={<Icon name="toggle-right" />}>Activate</TableBulkActionOld2>
          <TableBulkActionOld2 icon={<Icon name="toggle-left" />}>Deactivate</TableBulkActionOld2>
          <TableBulkSeparatorOld2 />
          <TableBulkActionOld2 icon={<Icon name="trash-2" />}>Delete</TableBulkActionOld2>
        </TableBulkBarOld2>
        <TablePagerOld2 total={USERS.length} page={1} pageSize={25} onPage={() => undefined} onPageSize={() => undefined} noun="users" />
      </TableOld2>;
  }
}`,...(D=(E=c.parameters)==null?void 0:E.docs)==null?void 0:D.source},description:{story:"Row numbers at rest; pick one and every row shows its checkbox. Tab to a row: Space picks, Enter opens, ↑ ↓ move.",...(F=(A=c.parameters)==null?void 0:A.docs)==null?void 0:F.description}}};var H,I,M,K,R;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: function FootersStory() {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(25);
    const [shown, setShown] = useState(25);
    return <div className="mdt-flex mdt-flex-col mdt-gap-6">
        <TableOld2 label="Pager">
          <TablePagerOld2 total={10001} page={page} pageSize={size} onPage={setPage} onPageSize={setSize} noun="users" />
        </TableOld2>
        <TableOld2 label="Load more">
          <TableLoadMoreOld2 shown={shown} total={10001} noun="users" onMore={() => {
          setShown(n => n + 25);
        }} />
        </TableOld2>
      </div>;
  }
}`,...(M=(I=p.parameters)==null?void 0:I.docs)==null?void 0:M.source},description:{story:'The two footers: the pager built for 401 pages, and the "Load more" strip.',...(R=(K=p.parameters)==null?void 0:K.docs)==null?void 0:R.description}}};var L,q,U,V,W;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div className="mdt-grid mdt-grid-cols-[160px_1fr] mdt-items-center mdt-gap-x-6 mdt-gap-y-4 mdt-text-xs">
      <span className="mdt-text-muted-foreground">Person, owner</span>
      <PersonCellOld2 name="Sarah Johnson" owner />
      <span className="mdt-text-muted-foreground">Person, invited</span>
      <PersonCellOld2 name="Priya Natarajan" muted />
      <span className="mdt-text-muted-foreground">Contact</span>
      <ContactChipsOld2 email="sarah.johnson@company.com" phone="+1 415 555 0100" />
      <span className="mdt-text-muted-foreground">Contact, none</span>
      <ContactChipsOld2 />
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
        fill: '#F2F3FD',
        ink: '#4F5BC4'
      }}>
          LDAP
        </Badge>
        <Badge size="sm" shape="square" palette={{
        fill: '#EDF8F7',
        ink: '#1F7A71'
      }}>
          SCIM
        </Badge>
      </span>
      <span className="mdt-text-muted-foreground">Teams</span>
      <TagListOld2 items={['Platform', 'Security', 'Finance', 'Design']} />
      <span className="mdt-text-muted-foreground">Missing value</span>
      <TableEmptyValueOld2 />
    </div>
}`,...(U=(q=u.parameters)==null?void 0:q.docs)==null?void 0:U.source},description:{story:`Nothing yet, nothing found, could not load. Centred in the card: an icon, a title, one line, one button.
The cells the Users list uses: the person, the contact chips, teams with a "+N", a missing value. Every pill is Badge.`,...(W=(V=u.parameters)==null?void 0:V.docs)==null?void 0:W.description}}};const Ke=["Headings","Selection","Footers","Cells"];export{u as Cells,p as Footers,m as Headings,c as Selection,Ke as __namedExportsOrder,Me as default};
//# sourceMappingURL=TableOld2.stories-D7JnjPK3.js.map
