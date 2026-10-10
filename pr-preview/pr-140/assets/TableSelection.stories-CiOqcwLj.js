import{r as m,j as e}from"./iframe-DR_89Exp.js";import"./index-DkSUl2wM.js";import"./index-BgugIDqY.js";import"./index-DXf-30mB.js";import{T as f,a as j,b as h,c as i,d as C,e as l}from"./TableOld-CSkrwyYe.js";import{T as y,a as o,b as v}from"./TableBulkBar-Bfa85cja.js";import{T as B,a as A}from"./TableToolbar-BaQMpbB4.js";import{u as N}from"./useTableSelection-RyLGj6ZY.js";import{I as $}from"./Input-siL0IQAT.js";import{B as b}from"./Button-CI6tLuky.js";import{I as s}from"./Icon-CcIoBMuR.js";import{C as p}from"./Checkbox-BauCA02w.js";import{B as z}from"./Badge-C6B8VIuU.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./index-CzhJ6YSH.js";import"./index-CRXh8zJ8.js";import"./Popover-B-gEz9al.js";import"./index-Cr3o3GlC.js";import"./index-BhWiwAUA.js";import"./index-ZUB_R04-.js";import"./index-dLrkiDs2.js";import"./index-QIoRB-ox.js";import"./index-Dgnkn68Z.js";import"./Combination-BFuVJ_kl.js";import"./index-CE_dZPCx.js";import"./index-gOdF6Wiy.js";import"./index-BLGoxSD2.js";import"./index-BeXiGEHV.js";import"./index-Z2WAbxhx.js";import"./Command-CXQPgIVA.js";import"./index-DdyaL8r9.js";import"./index-CVWjPP35.js";import"./index-5Vl0cmDy.js";const ge={title:"Deprecated/Table Old Bulk Actions",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`What you can do with the rows you have picked.

Layer 5d. The Selectable rows story shows the checkboxes; this shows what
they are for - \`useTableSelectionOld\` holding the state, and the bar that
appears once there is something to act on.`}}}},I=[{id:"TKT-245",subject:"Network Connectivity Problem",status:"Open",assignee:"Ada Lovelace"},{id:"TKT-246",subject:"VPN drops every few minutes",status:"In Process",assignee:"Grace Hopper"},{id:"TKT-247",subject:"Printer queue stuck on floor 3",status:"Open",assignee:"Alan Turing"},{id:"TKT-248",subject:"Password reset for contractor",status:"Resolved",assignee:"Katherine Johnson"},{id:"TKT-249",subject:"Laptop will not wake from sleep",status:"Open",assignee:"Ada Lovelace"}],R={Open:"info","In Process":"warning",Resolved:"success"},r={render:function(){const[c,u]=m.useState(""),[w,a]=m.useState(null),d=m.useMemo(()=>I.filter(t=>c.trim()===""?!0:`${t.id} ${t.subject} ${t.assignee}`.toLowerCase().includes(c.trim().toLowerCase())),[c]),n=N({rowIds:d.map(t=>t.id)});return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsxs(B,{label:"Ticket controls",children:[e.jsx($,{type:"search","aria-label":"Search tickets",placeholder:"Search",value:c,onChange:t=>{u(t.target.value)},className:"mdt-w-56"}),e.jsx(A,{children:e.jsxs(b,{variant:"outline",size:"sm",children:[e.jsx(s,{name:"list-filter",size:"sm","aria-hidden":!0}),"Filters"]})})]}),e.jsxs(y,{count:n.count,onClear:n.clear,children:[e.jsx(o,{icon:e.jsx(s,{name:"circle-dot",size:"sm","aria-hidden":!0}),onClick:()=>{a(`Set status on ${String(n.count)}`)},children:"Status"}),e.jsx(o,{icon:e.jsx(s,{name:"flag",size:"sm","aria-hidden":!0}),onClick:()=>{a(`Set priority on ${String(n.count)}`)},children:"Priority"}),e.jsx(o,{icon:e.jsx(s,{name:"user",size:"sm","aria-hidden":!0}),onClick:()=>{a(`Assigned ${String(n.count)}`)},children:"Assignee"}),e.jsx(v,{}),e.jsx(o,{icon:e.jsx(s,{name:"merge",size:"sm","aria-hidden":!0}),onClick:()=>{a(`Merged ${String(n.count)}`)},children:"Merge"}),e.jsx(o,{icon:e.jsx(s,{name:"copy",size:"sm","aria-hidden":!0}),onClick:()=>{a(`Cloned ${String(n.count)}`)},children:"Clone"}),e.jsx(o,{"aria-label":"More actions",icon:e.jsx(s,{name:"more-vertical",size:"sm","aria-hidden":!0}),onClick:()=>{a("More actions")}})]}),e.jsxs(f,{containerClassName:"mdt-rounded-md mdt-border",children:[e.jsx(j,{children:e.jsxs(h,{children:[e.jsx(i,{className:"mdt-w-10",children:e.jsx(p,{checked:n.headerState,onCheckedChange:n.toggleAll,"aria-label":"Select all rows"})}),e.jsx(i,{children:"ID"}),e.jsx(i,{children:"Subject"}),e.jsx(i,{children:"Status"}),e.jsx(i,{children:"Assignee"})]})}),e.jsxs(C,{children:[d.map(t=>e.jsxs(h,{selected:n.isSelected(t.id),children:[e.jsx(l,{children:e.jsx(p,{checked:n.isSelected(t.id),onClick:S=>{n.toggle(t.id,{extend:S.shiftKey})},"aria-label":`Select ${t.id}`})}),e.jsx(l,{className:"mdt-font-medium",children:t.id}),e.jsx(l,{children:t.subject}),e.jsx(l,{children:e.jsx(z,{tone:R[t.status],shape:"square",size:"sm",dot:!0,children:t.status})}),e.jsx(l,{children:t.assignee})]},t.id)),d.length===0&&e.jsx(h,{interactive:!1,children:e.jsx(l,{colSpan:5,className:"mdt-p-0",children:e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2 mdt-py-10",children:[e.jsx("p",{className:"mdt-text-sm mdt-font-medium",children:"No tickets match your search."}),e.jsx(b,{variant:"outline",size:"sm",onClick:()=>{u("")},children:"Clear search"})]})})})]})]}),e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:w??`${String(n.count)} selected of ${String(d.length)} shown.`})]})}};var T,g,k,x,O;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: function RowSelectionDemo() {
    const [query, setQuery] = useState('');
    const [done, setDone] = useState<string | null>(null);
    const rows = useMemo(() => tickets.filter(ticket => query.trim() === '' ? true : \`\${ticket.id} \${ticket.subject} \${ticket.assignee}\`.toLowerCase().includes(query.trim().toLowerCase())), [query]);
    const selection = useTableSelectionOld({
      rowIds: rows.map(ticket => ticket.id)
    });
    return <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <TableToolbarOld label="Ticket controls">
          <Input type="search" aria-label="Search tickets" placeholder="Search" value={query} onChange={event => {
          setQuery(event.target.value);
        }} className="mdt-w-56" />
          <TableToolbarActionsOld>
            <Button variant="outline" size="sm">
              <Icon name="list-filter" size="sm" aria-hidden />
              Filters
            </Button>
          </TableToolbarActionsOld>
        </TableToolbarOld>

        <TableBulkBarOld count={selection.count} onClear={selection.clear}>
          <TableBulkActionOld icon={<Icon name="circle-dot" size="sm" aria-hidden />} onClick={() => {
          setDone(\`Set status on \${String(selection.count)}\`);
        }}>
            Status
          </TableBulkActionOld>
          <TableBulkActionOld icon={<Icon name="flag" size="sm" aria-hidden />} onClick={() => {
          setDone(\`Set priority on \${String(selection.count)}\`);
        }}>
            Priority
          </TableBulkActionOld>
          <TableBulkActionOld icon={<Icon name="user" size="sm" aria-hidden />} onClick={() => {
          setDone(\`Assigned \${String(selection.count)}\`);
        }}>
            Assignee
          </TableBulkActionOld>

          {/* Routine actions on one side of the rule, the rest on the other. */}
          <TableBulkSeparatorOld />

          <TableBulkActionOld icon={<Icon name="merge" size="sm" aria-hidden />} onClick={() => {
          setDone(\`Merged \${String(selection.count)}\`);
        }}>
            Merge
          </TableBulkActionOld>
          <TableBulkActionOld icon={<Icon name="copy" size="sm" aria-hidden />} onClick={() => {
          setDone(\`Cloned \${String(selection.count)}\`);
        }}>
            Clone
          </TableBulkActionOld>
          <TableBulkActionOld aria-label="More actions" icon={<Icon name="more-vertical" size="sm" aria-hidden />} onClick={() => {
          setDone('More actions');
        }} />
        </TableBulkBarOld>

        <TableOld containerClassName="mdt-rounded-md mdt-border">
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld className="mdt-w-10">
                <Checkbox checked={selection.headerState} onCheckedChange={selection.toggleAll} aria-label="Select all rows" />
              </TableHeadOld>
              <TableHeadOld>ID</TableHeadOld>
              <TableHeadOld>Subject</TableHeadOld>
              <TableHeadOld>Status</TableHeadOld>
              <TableHeadOld>Assignee</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
          <TableBodyOld>
            {rows.map(ticket => <TableRowOld key={ticket.id} selected={selection.isSelected(ticket.id)}>
                <TableCellOld>
                  {/*
                    The shift key reaches the hook through the click, not the
                    change: \`onCheckedChange\` reports the new value and nothing
                    about the modifiers, and the range is the whole reason a
                    long selection is bearable.
                   */}
                  <Checkbox checked={selection.isSelected(ticket.id)} onClick={event => {
                selection.toggle(ticket.id, {
                  extend: event.shiftKey
                });
              }} aria-label={\`Select \${ticket.id}\`} />
                </TableCellOld>
                <TableCellOld className="mdt-font-medium">{ticket.id}</TableCellOld>
                <TableCellOld>{ticket.subject}</TableCellOld>
                <TableCellOld>
                  <Badge tone={STATUS_TONE[ticket.status]} shape="square" size="sm" dot>
                    {ticket.status}
                  </Badge>
                </TableCellOld>
                <TableCellOld>{ticket.assignee}</TableCellOld>
              </TableRowOld>)}
            {rows.length === 0 && <TableRowOld interactive={false}>
                <TableCellOld colSpan={5} className="mdt-p-0">
                  <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2 mdt-py-10">
                    <p className="mdt-text-sm mdt-font-medium">No tickets match your search.</p>
                    {/*
                      A filtered empty table is not an empty table. "No tickets
                      yet" would be a lie and would send someone off to create
                      one; the way out is to clear the thing that hid them.
                     */}
                    <Button variant="outline" size="sm" onClick={() => {
                  setQuery('');
                }}>
                      Clear search
                    </Button>
                  </div>
                </TableCellOld>
              </TableRowOld>}
          </TableBodyOld>
        </TableOld>

        <p className="mdt-text-xs mdt-text-muted-foreground">
          {done ?? \`\${String(selection.count)} selected of \${String(rows.length)} shown.\`}
        </p>
      </div>;
  }
}`,...(k=(g=r.parameters)==null?void 0:g.docs)==null?void 0:k.source},description:{story:`**Shift-click a second checkbox** and everything between takes that row's new
state. Without it a range of thirty rows is thirty clicks, which is where
people give up and select all.

**The bar joins the toolbar rather than replacing it.** Replacing was the
first instinct and it was wrong: a selection survives filtering on purpose,
so building one across two searches is a thing people do - and hiding the
search box the moment they tick a row makes that impossible.

**Search while rows are selected.** The selection survives - someone who ticks
two rows, searches for a third and ticks that expects three. But the header
checkbox reports only what is on screen, because a tick there while a filter
hides other selected rows would claim something untrue of this view.`,...(O=(x=r.parameters)==null?void 0:x.docs)==null?void 0:O.description}}};const ke=["RowSelection"];export{r as RowSelection,ke as __namedExportsOrder,ge as default};
//# sourceMappingURL=TableSelection.stories-CiOqcwLj.js.map
