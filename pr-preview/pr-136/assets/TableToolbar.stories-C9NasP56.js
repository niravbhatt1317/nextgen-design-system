import{r as p,j as o}from"./iframe-3aDErp2w.js";import"./index-DkSUl2wM.js";import"./index-BgugIDqY.js";import"./index-DXf-30mB.js";import{T as I,a as A,b,c as M,d as R,e as k}from"./TableOld-JIl35JdU.js";import{u as $,a as H,T as F}from"./useTableColumns-CapF0xy5.js";import{u as E,T as q,a as P}from"./useTableSort-B3t7d_cn.js";import{T as L,a as D}from"./TableToolbar-Crt8e7ph.js";import{I as G}from"./Input-BV9txsza.js";import{B as v}from"./Button-Bf3_7zSS.js";import{I as i}from"./Icon-y-zWa_Ic.js";import{B as x}from"./Badge-DpoFXxTL.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./index-CVGdmYF-.js";import"./index-DEcWuuwm.js";import"./Popover-BQ9elchD.js";import"./index-B-C5R3wd.js";import"./index-8OhScVVJ.js";import"./index-CiUzL2Uf.js";import"./index-jcio3iBc.js";import"./index-s0oW9cRd.js";import"./index-CfC0RBm5.js";import"./Combination-DPwXZCn4.js";import"./index-Cl-6LPMW.js";import"./index-DhnHQ_s5.js";import"./index-D4v8Yt16.js";import"./index-CXI7Mnvj.js";import"./index-XhlMewt2.js";import"./Command-BrB_U8Fo.js";import"./index-C0zLL9rw.js";import"./index-BQpybUfR.js";import"./DropdownMenu-8gXDt6ub.js";import"./index-DeeK0HxR.js";import"./index-ZBJj9nSI.js";import"./index-D48r5OER.js";import"./Separator-BbTwMhCC.js";import"./Checkbox-DBQtvZla.js";import"./index-BEOcp-bB.js";const Me={title:"Deprecated/Table Toolbar",tags:["autodocs"],parameters:{layout:"padded",status:{type:"deprecated",since:"0.4.0",deprecation:{deprecatedSince:"0.4.0",removalIn:"1.0.0",replacement:"Toolbar with ToolbarButton",message:"The merged console strip replaced this one on 4 September 2026: Toolbar (60px, 24px inset, 10px gaps) holding ToolbarButton controls with the four states. Applied filters are never shown as chips. It stays for side-by-side comparison until the removal pull request."}},docs:{description:{component:["## ⚠️ Deprecated — use `Toolbar` with `ToolbarButton`","","The strip the merged console uses replaced this one: 60px tall, a 24px inset, 10px between","controls, and one 32px control with four states for Filters, the quick filter, Sort and","Columns. Applied filters light the Filters button with a count; they are never shown as","chips, so `TableFilterChipsOld` is deprecated with it.","","**Do not start anything new on it.** The sort and view menus stay: they are used inside the","new strip."].join(`
`)}}}},y=[{key:"id",label:"ID"},{key:"subject",label:"Subject"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"assignee",label:"Assignee"}],V=[{id:"TKT-245",subject:"Network Connectivity Problem",status:"Open",priority:"High",assignee:"Ada Lovelace"},{id:"TKT-246",subject:"VPN drops every few minutes",status:"In Process",priority:"High",assignee:"Grace Hopper"},{id:"TKT-247",subject:"Printer queue stuck on floor 3",status:"Open",priority:"Low",assignee:"Alan Turing"},{id:"TKT-248",subject:"Password reset for contractor",status:"Resolved",priority:"Medium",assignee:"Katherine Johnson"},{id:"TKT-249",subject:"Laptop will not wake from sleep",status:"Open",priority:"Medium",assignee:"Ada Lovelace"}],_={Open:"info","In Process":"warning",Resolved:"success"},U={High:0,Medium:1,Low:2},O=(u,s)=>s==="priority"?U[u.priority]:u[s],d={render:function(){var g;const s=E(),r=$(y),h=H({columns:r.visible,frozenCount:r.frozenCount,onMove:(e,t)=>{r.move(e,t)}}),[a,N]=p.useState(""),[c,K]=p.useState(null),f=p.useMemo(()=>{const e=V.filter(t=>a.trim()===""?!0:`${t.id} ${t.subject} ${t.assignee}`.toLowerCase().includes(a.trim().toLowerCase()));return s.rules.length===0?e:[...e].sort((t,l)=>{for(const n of s.rules){const m=O(t,n.column),w=O(l,n.column);if(m===w)continue;const T=m<w?-1:1;return n.direction==="ascend"?T:-T}return 0})},[a,s.rules]);return o.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[o.jsxs(L,{label:"Ticket controls",children:[o.jsx(G,{type:"search","aria-label":"Search tickets",placeholder:"Search",value:a,onChange:e=>{N(e.target.value)},className:"mdt-w-56"}),o.jsxs(v,{variant:"outline",size:"sm",children:[o.jsx(i,{name:"list-filter",size:"sm","aria-hidden":!0}),"Filters"]}),o.jsxs(D,{children:[o.jsx(q,{columns:r.visible,rules:s.rules,onSortBy:e=>{s.sortBy(e,"ascend")},onToggleDirection:e=>{const t=s.directionOf(e);s.sortBy(e,t==="ascend"?"descend":"ascend")},onRemove:e=>{s.remove(e)},onMove:s.move,onClear:s.clear}),o.jsx(P,{columns:r.columns.map(e=>({key:e.key,label:e.label,visible:e.visible,...e.locked===!0?{locked:!0}:{}})),groupBy:c,onGroupBy:e=>{K(e)},onToggleColumn:e=>{r.hidden.some(t=>t.key===e)?r.show(e):r.hide(e)},onShowAll:()=>{r.hidden.forEach(e=>{r.show(e.key)})},onHideAll:()=>{r.visible.slice(1).forEach(e=>{r.hide(e.key)})}}),o.jsx(v,{variant:"outline",size:"sm",className:"mdt-w-8 mdt-px-0","aria-label":"Download CSV",children:o.jsx(i,{name:"download",size:"sm","aria-hidden":!0})})]})]}),o.jsxs(I,{containerClassName:"mdt-rounded-md mdt-border",children:[o.jsx(A,{children:o.jsx(b,{children:r.visible.map((e,t)=>{const l=s.orderOf(e.key),n=s.directionOf(e.key);return o.jsx(M,{columnKey:e.key,frozen:e.frozen?e.index:!1,style:h.styleFor(e.key),resizable:!0,insertColumns:r.hidden,onInsert:m=>{r.show(m,t+1)},insertLabel:`Insert a column after ${e.label}`,className:"mdt-group/col mdt-whitespace-nowrap",children:o.jsxs("span",{className:"mdt-flex mdt-w-full mdt-items-center mdt-gap-2",children:[o.jsx(F,{label:e.label,align:"start",frozen:e.frozen,canFreeze:r.canFreeze(e.key),onToggleFreeze:()=>{e.frozen?r.unfreeze(e.key):r.freeze(e.key)},onMoveToStart:()=>{r.moveToStart(e.key)},onMoveToEnd:()=>{r.moveToEnd(e.key)},onHide:()=>{r.hide(e.key)}}),o.jsx("button",{type:"button","aria-label":`Sort by ${e.label}`,onClick:()=>{s.toggle(e.key)},className:["mdt-flex mdt-items-center mdt-rounded-sm","focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring",n===null?"mdt-opacity-0 mdt-transition-opacity focus-visible:mdt-opacity-100 group-hover/col:mdt-opacity-100":""].join(" "),children:n===null?o.jsx(i,{name:"arrow-up-down",className:"mdt-h-3.5 mdt-w-3.5 mdt-opacity-50","aria-hidden":!0}):o.jsx(x,{tone:"info",shape:"pill",size:"sm",icon:o.jsx(i,{name:n==="ascend"?"arrow-up":"arrow-down","aria-hidden":!0}),className:"mdt-tabular-nums",children:s.rules.length>1?l:""})}),!e.frozen&&o.jsx("button",{type:"button",...h.gripProps(e.key),className:["mdt-ml-auto mdt-mr-2 mdt-cursor-grab mdt-touch-none mdt-rounded-sm","mdt-text-muted-foreground hover:mdt-text-foreground","mdt-opacity-0 mdt-transition-opacity","focus-visible:mdt-opacity-100 group-hover/col:mdt-opacity-100","focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring"].join(" "),children:o.jsx(i,{name:"grip-vertical",size:"sm","aria-hidden":!0})})]})},e.key)})})}),o.jsxs(R,{children:[f.map(e=>o.jsx(b,{children:r.visible.map(t=>o.jsx(k,{columnKey:t.key,frozen:t.frozen?t.index:!1,style:h.styleFor(t.key),className:t.key==="id"?"mdt-font-medium":void 0,children:t.key==="status"?o.jsx(x,{tone:_[e.status],shape:"square",size:"sm",dot:!0,children:e.status}):e[t.key]},t.key))},e.id)),f.length===0&&o.jsx(b,{interactive:!1,children:o.jsxs(k,{colSpan:5,className:"mdt-py-8 mdt-text-center mdt-text-muted-foreground",children:["Nothing matches “",a,"”."]})})]})]}),o.jsxs("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:[c!==null&&`Grouped by ${((g=y.find(e=>e.key===c))==null?void 0:g.label)??c}. `,s.rules.length===0?"Unsorted.":`Sorted by ${s.rules.map(e=>{var t;return`${((t=y.find(l=>l.key===e.column))==null?void 0:t.label)??e.column} ${e.direction==="ascend"?"↑":"↓"}`}).join(", then ")}.`]})]})}};var j,z,S,C,B;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: function ToolbarDemo() {
    const sort = useTableSortOld<Key>();
    const cols = useTableColumnsOld<Key>(sortableColumns);
    const reorder = useColumnReorderOld({
      columns: cols.visible,
      frozenCount: cols.frozenCount,
      onMove: (key, to) => {
        cols.move(key, to);
      }
    });
    const [query, setQuery] = useState('');
    const [groupBy, setGroupBy] = useState<Key | null>(null);
    const rows = useMemo(() => {
      const matched = tickets.filter(ticket => query.trim() === '' ? true : \`\${ticket.id} \${ticket.subject} \${ticket.assignee}\`.toLowerCase().includes(query.trim().toLowerCase()));
      if (sort.rules.length === 0) return matched;
      return [...matched].sort((a, b) => {
        for (const rule of sort.rules) {
          const left = valueOf(a, rule.column);
          const right = valueOf(b, rule.column);
          if (left === right) continue;
          const order = left < right ? -1 : 1;
          return rule.direction === 'ascend' ? order : -order;
        }
        return 0;
      });
    }, [query, sort.rules]);
    return <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <TableToolbarOld label="Ticket controls">
          <Input type="search" aria-label="Search tickets" placeholder="Search" value={query} onChange={event => {
          setQuery(event.target.value);
        }} className="mdt-w-56" />
          <Button variant="outline" size="sm">
            <Icon name="list-filter" size="sm" aria-hidden />
            Filters
          </Button>

          <TableToolbarActionsOld>
            <TableSortMenuOld columns={cols.visible} rules={sort.rules} onSortBy={column => {
            sort.sortBy(column as Key, 'ascend');
          }} onToggleDirection={column => {
            const current = sort.directionOf(column as Key);
            sort.sortBy(column as Key, current === 'ascend' ? 'descend' : 'ascend');
          }} onRemove={column => {
            sort.remove(column as Key);
          }} onMove={sort.move} onClear={sort.clear} />
            <TableViewMenuOld columns={cols.columns.map(column => ({
            key: column.key,
            label: column.label,
            visible: column.visible,
            ...(column.locked === true ? {
              locked: true
            } : {})
          }))} groupBy={groupBy} onGroupBy={key => {
            setGroupBy(key as Key | null);
          }} onToggleColumn={key => {
            if (cols.hidden.some(column => column.key === key)) cols.show(key as Key);else cols.hide(key as Key);
          }} onShowAll={() => {
            cols.hidden.forEach(column => {
              cols.show(column.key);
            });
          }} onHideAll={() => {
            // The first column stays: a table with no columns is not a view
            // of anything, and there would be nothing left to click.
            cols.visible.slice(1).forEach(column => {
              cols.hide(column.key);
            });
          }} />
            <Button variant="outline" size="sm" className="mdt-w-8 mdt-px-0" aria-label="Download CSV">
              <Icon name="download" size="sm" aria-hidden />
            </Button>
          </TableToolbarActionsOld>
        </TableToolbarOld>

        <TableOld containerClassName="mdt-rounded-md mdt-border">
          <TableHeaderOld>
            <TableRowOld>
              {cols.visible.map((column, index) => {
              const rank = sort.orderOf(column.key);
              const direction = sort.directionOf(column.key);
              return <TableHeadOld key={column.key} columnKey={column.key} frozen={column.frozen ? column.index : false} style={reorder.styleFor(column.key)} resizable insertColumns={cols.hidden} onInsert={key => {
                cols.show(key as Key, index + 1);
              }} insertLabel={\`Insert a column after \${column.label}\`} className="mdt-group/col mdt-whitespace-nowrap">
                    {/*
                      Three separate controls rather than one.
                       \`TableHeadOld\`'s own \`sortable\` wraps the whole cell in a
                      button, which is right for a table whose header only
                      sorts. Here the header does three jobs, and one button
                      cannot hold the other two - nesting a menu trigger and a
                      drag grip inside a sort button makes every drag a sort and
                      is invalid markup besides.
                       So: the name opens the menu, the arrow sorts, the grip
                      drags.
                     */}
                    <span className="mdt-flex mdt-w-full mdt-items-center mdt-gap-2">
                      <TableColumnMenuOld label={column.label} align="start" frozen={column.frozen} canFreeze={cols.canFreeze(column.key)} onToggleFreeze={() => {
                    if (column.frozen) cols.unfreeze(column.key);else cols.freeze(column.key);
                  }} onMoveToStart={() => {
                    cols.moveToStart(column.key);
                  }} onMoveToEnd={() => {
                    cols.moveToEnd(column.key);
                  }} onHide={() => {
                    cols.hide(column.key);
                  }} />

                      <button type="button" aria-label={\`Sort by \${column.label}\`} onClick={() => {
                    sort.toggle(column.key);
                  }} className={['mdt-flex mdt-items-center mdt-rounded-sm', 'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring',
                  // An unsorted column only offers the control on
                  // hover; a sorted one always shows its badge, because
                  // that badge is not an offer, it is the answer to
                  // "how is this table ordered".
                  direction === null ? 'mdt-opacity-0 mdt-transition-opacity focus-visible:mdt-opacity-100 group-hover/col:mdt-opacity-100' : ''].join(' ')}>
                        {/*
                          A sorted column always wears the badge; the rank only
                          appears once there is more than one sort, because a
                          lone "1" is noise. An unsorted column stays a faded
                          arrow - a badge on every column would make the header
                          a row of chips and say nothing.
                         */}
                        {direction === null ? <Icon name="arrow-up-down"
                    // 14px: between the scale's 12 and 16, which is
                    // where it sits right against a \`sm\` badge. Sizing
                    // has no tokens, so a standard step is the correct
                    // thing to reach for.
                    className="mdt-h-3.5 mdt-w-3.5 mdt-opacity-50" aria-hidden /> : <Badge tone="info" shape="pill" size="sm" icon={<Icon name={direction === 'ascend' ? 'arrow-up' : 'arrow-down'} aria-hidden />} className="mdt-tabular-nums">
                            {sort.rules.length > 1 ? rank : ''}
                          </Badge>}
                      </button>

                      {!column.frozen && <button type="button" {...reorder.gripProps(column.key)} className={[
                  // Hard right, clear of the label and the sort
                  // control - and clear of the resize line, which
                  // owns the last 8px of the cell.
                  'mdt-ml-auto mdt-mr-2 mdt-cursor-grab mdt-touch-none mdt-rounded-sm', 'mdt-text-muted-foreground hover:mdt-text-foreground', 'mdt-opacity-0 mdt-transition-opacity', 'focus-visible:mdt-opacity-100 group-hover/col:mdt-opacity-100', 'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring'].join(' ')}>
                          <Icon name="grip-vertical" size="sm" aria-hidden />
                        </button>}
                    </span>
                  </TableHeadOld>;
            })}
            </TableRowOld>
          </TableHeaderOld>
          <TableBodyOld>
            {rows.map(ticket => <TableRowOld key={ticket.id}>
                {cols.visible.map(column => <TableCellOld key={column.key} columnKey={column.key} frozen={column.frozen ? column.index : false} style={reorder.styleFor(column.key)} className={column.key === 'id' ? 'mdt-font-medium' : undefined}>
                    {column.key === 'status' ? <Badge tone={STATUS_TONE[ticket.status]} shape="square" size="sm" dot>
                        {ticket.status}
                      </Badge> : ticket[column.key]}
                  </TableCellOld>)}
              </TableRowOld>)}
            {rows.length === 0 && <TableRowOld interactive={false}>
                <TableCellOld colSpan={5} className="mdt-py-8 mdt-text-center mdt-text-muted-foreground">
                  Nothing matches “{query}”.
                </TableCellOld>
              </TableRowOld>}
          </TableBodyOld>
        </TableOld>

        <p className="mdt-text-xs mdt-text-muted-foreground">
          {groupBy !== null && \`Grouped by \${sortableColumns.find(c => c.key === groupBy)?.label ?? groupBy}. \`}
          {sort.rules.length === 0 ? 'Unsorted.' : \`Sorted by \${sort.rules.map(rule => \`\${sortableColumns.find(c => c.key === rule.column)?.label ?? rule.column} \${rule.direction === 'ascend' ? '↑' : '↓'}\`).join(', then ')}.\`}
        </p>
      </div>;
  }
}`,...(S=(z=d.parameters)==null?void 0:z.docs)==null?void 0:S.source},description:{story:`The whole toolbar, wired to real state.

Worth trying:

- **Sort by two columns.** Open the sort menu, choose Status, then Priority.
  The headers show **1** and **2** beside their arrows - with two sorts an
  arrow alone says both are sorted and nothing about which wins, and people
  reasonably assume the leftmost column decides.
- **Reorder the stack.** Move Priority above Status and the table changes,
  because status-then-priority is a different table from priority-then-status.
- **Click a header's arrow three times.** Ascending, descending, gone. Without
  that last step there is no way to stop sorting from the column itself.`,...(B=(C=d.parameters)==null?void 0:C.docs)==null?void 0:B.description}}};const Re=["Toolbar"];export{d as Toolbar,Re as __namedExportsOrder,Me as default};
//# sourceMappingURL=TableToolbar.stories-C9NasP56.js.map
