import{j as t,r as X}from"./iframe-BPQmvBd6.js";import{r as O}from"./index-B7VXfFwd.js";import{T as y,a as f,b as d,c as g,d as w,e as k}from"./TableOld-BCPGQt19.js";import{u as x,T as Y,a as Z}from"./useTableColumns-tdGx7-x8.js";import{u as ee}from"./useColumnWidths-BoaliNTL.js";import{B as i}from"./Button-CJ5_FV-9.js";import{I as te}from"./Icon-C33eTJLz.js";import{B as oe}from"./Badge-CS6wrRrg.js";import"./preload-helper-Dp1pzeXC.js";import"./index-C2qun89A.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./Popover-VVGKGEjf.js";import"./index-BlQNPi05.js";import"./index-D9jrm0YQ.js";import"./index-1lRNtYnt.js";import"./index-B8Qqfh9g.js";import"./index-DbNDE_LK.js";import"./index-CilHHr0n.js";import"./Combination-BURC4MZE.js";import"./index-CbqvR2W_.js";import"./index-BsjrQxD-.js";import"./index-DdnsaQLy.js";import"./index-Dh0k1yT9.js";import"./index-Cbjbqv7g.js";import"./Command-DSPxg92g.js";import"./index-CyDnyFq6.js";import"./index-DrWs0N3J.js";import"./DropdownMenu-DydsVHsm.js";import"./index-_6cqIuUN.js";import"./index-gqQFaK1Z.js";import"./index-dHenILUt.js";const Me={title:"Deprecated/Table Old Column Controls",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`Column controls - who decides what the table shows.

Layer 5a. One piece of state, \`useTableColumnsOld\`, and every control on this
page is a view onto it: the header menu, the insertion point, and later the
columns picker in the toolbar and the drag handle. That is the whole reason
the state exists separately - two controls that each kept their own idea of
column order would disagree the first time you used both.

As everywhere else in TableOld, **it holds state and never touches your rows.**
Hiding a column does not filter anything; it tells you not to render that
column.`}}}},v=[{key:"id",label:"ID",locked:!0},{key:"subject",label:"Subject"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"assignee",label:"Assignee"},{key:"category",label:"Category"},{key:"due",label:"Due date"},{key:"created",label:"Created on"}],T=[{id:"TKT-245",subject:"Network Connectivity Problem",status:"Open",priority:"High",assignee:"Ada Lovelace",category:"Network",due:"12 Aug",created:"01 Aug"},{id:"TKT-246",subject:"VPN drops every few minutes",status:"In Process",priority:"High",assignee:"Grace Hopper",category:"Network",due:"13 Aug",created:"02 Aug"},{id:"TKT-247",subject:"Printer queue stuck on floor 3",status:"Open",priority:"Low",assignee:"Alan Turing",category:"Hardware",due:"19 Aug",created:"02 Aug"},{id:"TKT-248",subject:"Password reset for contractor",status:"Resolved",priority:"Medium",assignee:"Katherine Johnson",category:"Access",due:"09 Aug",created:"03 Aug"}],ne={Open:"info","In Process":"warning",Resolved:"success"},z=(l,o)=>o==="status"?t.jsx(oe,{tone:ne[l.status],shape:"square",size:"sm",dot:!0,children:l.status}):l[o],m={render:function(){const o=x(v),{widths:a,setWidth:n}=ee({id:88,subject:236,status:120,priority:81,assignee:155,category:92,due:89});return t.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3",children:[t.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3",children:[t.jsx(i,{variant:"outline",size:"sm",onClick:o.reset,disabled:!o.isChanged,children:"Reset layout"}),t.jsxs("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:[o.visible.length," shown, ",o.hidden.length," hidden, ",o.frozenCount," pinned"]})]}),t.jsxs(y,{layout:"fixed",containerClassName:"mdt-rounded-md mdt-border",children:[t.jsx(f,{children:t.jsx(d,{children:o.visible.map((e,r)=>t.jsx(g,{frozen:e.frozen?e.index:!1,className:"mdt-whitespace-nowrap",resizable:e.key!=="created",...e.key==="created"?{}:{width:a[e.key]},onResize:s=>{e.key!=="created"&&n(e.key,s)},insertColumns:o.hidden,insertSuggested:["due","category"],onInsert:s=>{o.show(s,r+1)},insertLabel:`Insert a column after ${e.label}`,children:t.jsx(Y,{label:e.label,...e.locked?{}:{onHide:()=>{o.hide(e.key)},onMoveToStart:()=>{o.moveToStart(e.key)},onMoveToEnd:()=>{o.moveToEnd(e.key)}},frozen:e.frozen,canFreeze:o.canFreeze(e.key),onToggleFreeze:()=>{e.frozen?o.unfreeze(e.key):o.freeze(e.key)}})},e.key))})}),t.jsx(w,{children:T.map(e=>t.jsx(d,{children:o.visible.map(r=>t.jsx(k,{frozen:r.frozen?r.index:!1,className:"mdt-whitespace-nowrap",children:z(e,r.key)},r.key))},e.id))})]})]})}},h={render:function(){const o=x(v);return t.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3",children:[t.jsxs("div",{className:"mdt-flex mdt-gap-2",children:[t.jsx(i,{variant:"outline",size:"sm",onClick:()=>{o.freeze("id")},children:"Pin 1"}),t.jsx(i,{variant:"outline",size:"sm",onClick:()=>{o.freeze("subject")},children:"Pin 2"}),t.jsx(i,{variant:"outline",size:"sm",onClick:()=>{o.unfreeze("id")},children:"Unpin"})]}),t.jsxs(y,{containerClassName:"mdt-rounded-md mdt-border",children:[t.jsx(f,{children:t.jsx(d,{children:o.visible.map(a=>t.jsx(g,{frozen:a.frozen?a.index:!1,className:"mdt-whitespace-nowrap",children:a.label},a.key))})}),t.jsx(w,{children:T.map(a=>t.jsx(d,{children:o.visible.map(n=>t.jsx(k,{frozen:n.frozen?n.index:!1,className:"mdt-whitespace-nowrap",children:z(a,n.key)},n.key))},a.id))})]})]})}},u={render:function(){const o=x(v),a=o.hidden.length>0;return t.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3",children:[!a&&t.jsx(i,{variant:"outline",size:"sm",onClick:()=>{o.hide("category"),o.hide("due"),o.hide("created")},children:"Hide three columns first"}),a&&t.jsxs("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:["Hidden: ",o.hidden.map(n=>n.label).join(", "),". Hover a boundary between two headers."]}),t.jsxs(y,{containerClassName:"mdt-rounded-md mdt-border",children:[t.jsx(f,{children:t.jsx(d,{children:o.visible.map((n,e)=>t.jsx(g,{className:"mdt-whitespace-nowrap",insertColumns:o.hidden,insertSuggested:["due"],onInsert:r=>{o.show(r,e+1)},insertLabel:`Insert a column after ${n.label}`,children:n.label},n.key))})}),t.jsx(w,{children:T.map(n=>t.jsx(d,{children:o.visible.map(e=>t.jsx(k,{className:"mdt-whitespace-nowrap",children:z(n,e.key)},e.key))},n.id))})]})]})}},p={render:function(){const o=x(v.slice(0,5)),[a,n]=X.useState(null);return t.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3",children:[t.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3",children:[t.jsx(i,{variant:"outline",size:"sm",onClick:o.reset,disabled:!o.isChanged,children:"Reset layout"}),t.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:a??"Open a column menu."})]}),t.jsxs(y,{containerClassName:"mdt-rounded-md mdt-border",children:[t.jsx(f,{children:t.jsx(d,{children:o.visible.map(e=>t.jsx(g,{frozen:e.frozen?e.index:!1,className:"mdt-whitespace-nowrap",children:t.jsx(Y,{label:e.label,onFilter:()=>{n(`Filter by ${e.label} - arrives with the toolbar`)},onGroup:()=>{n(`Group by ${e.label} - arrives with the toolbar`)},onSort:()=>{n(`Sort by ${e.label} - arrives with the toolbar`)},frozen:e.frozen,canFreeze:o.canFreeze(e.key),onToggleFreeze:()=>{e.frozen?o.unfreeze(e.key):o.freeze(e.key),n(`${e.frozen?"Unfroze":"Froze"} ${e.label}`)},...e.locked?{}:{onMoveToStart:()=>{o.moveToStart(e.key),n(`Moved ${e.label} to the start`)},onMoveToEnd:()=>{o.moveToEnd(e.key),n(`Moved ${e.label} to the end`)},onHide:()=>{o.hide(e.key),n(`Hid ${e.label}`)}}})},e.key))})}),t.jsx(w,{children:T.map(e=>t.jsx(d,{children:o.visible.map(r=>t.jsx(k,{frozen:r.frozen?r.index:!1,className:"mdt-whitespace-nowrap",children:z(e,r.key)},r.key))},e.id))})]})]})}},b={render:function(){var r;const o=x(v.map(s=>({key:s.key,label:s.label}))),a=X.useRef(null),n=(r=a.current)==null?void 0:r.getBoundingClientRect(),e=Z({columns:o.visible,frozenCount:o.frozenCount,onMove:(s,c)=>{o.move(s,c)}});return t.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3",children:[t.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3",children:[t.jsx(i,{variant:"outline",size:"sm",onClick:o.reset,disabled:!o.isChanged,children:"Reset order"}),t.jsx(i,{variant:"outline",size:"sm",onClick:()=>{o.frozenCount>0?o.unfreeze("id"):o.freeze("id")},children:o.frozenCount>0?"Unpin ID":"Pin ID"}),t.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:o.visible.map(s=>s.label).join(" · ")})]}),t.jsxs(y,{ref:a,containerClassName:"mdt-rounded-md mdt-border",children:[t.jsx(f,{children:t.jsx(d,{children:o.visible.map(s=>t.jsx(g,{columnKey:s.key,style:e.styleFor(s.key),className:"mdt-group/col mdt-whitespace-nowrap",children:t.jsxs("span",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[s.label,!s.frozen&&t.jsx("button",{type:"button",...e.gripProps(s.key),className:["mdt-ml-auto mdt-cursor-grab mdt-touch-none mdt-rounded-sm","mdt-text-muted-foreground hover:mdt-text-foreground","mdt-opacity-0 mdt-transition-opacity","focus-visible:mdt-opacity-100 group-hover/col:mdt-opacity-100","focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring"].join(" "),children:t.jsx(te,{name:"grip-vertical",size:"sm","aria-hidden":!0})})]})},s.key))})}),t.jsx(w,{children:T.map(s=>t.jsx(d,{children:o.visible.map(c=>t.jsx(k,{columnKey:c.key,style:e.styleFor(c.key),className:"mdt-whitespace-nowrap",children:z(s,c.key)},c.key))},s.id))})]}),e.dropLine!==null&&O.createPortal(t.jsx("span",{"aria-hidden":!0,className:"mdt-pointer-events-none mdt-fixed mdt-z-popover mdt-w-0.5 mdt-bg-primary",style:{left:e.dropLine,top:(n==null?void 0:n.top)??0,height:(n==null?void 0:n.height)??0}}),document.body),e.ghost!==null&&O.createPortal(t.jsx("span",{"aria-hidden":!0,className:["mdt-pointer-events-none mdt-fixed mdt-z-popover","mdt-flex mdt-items-center mdt-rounded-md mdt-border mdt-border-border","mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm mdt-font-medium mdt-shadow-lg",e.ghost.canDrop?"":"mdt-border-dashed mdt-opacity-50"].join(" "),style:{left:e.ghost.left,top:e.ghost.top,width:e.ghost.width,transform:"translate(-50%, -50%)"},children:e.ghost.label}),document.body)]})}};var C,j,N,H,R;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: function ColumnControlsDemo() {
    const cols = useTableColumnsOld(definitions);
    // One line does both jobs, so the demo needs widths as well as columns.
    //
    // \`Created on\` is deliberately unsized, and the table is \`layout="fixed"\`.
    // A fixed table still fills its container, so if every column carries a
    // width the browser scales all of them and the drag stops tracking the
    // cursor - one unsized column absorbs the slack instead.
    const {
      widths,
      setWidth
    } = useColumnWidthsOld({
      id: 88,
      subject: 236,
      status: 120,
      priority: 81,
      assignee: 155,
      category: 92,
      due: 89
    });
    return <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <div className="mdt-flex mdt-items-center mdt-gap-3">
          <Button variant="outline" size="sm" onClick={cols.reset} disabled={!cols.isChanged}>
            Reset layout
          </Button>
          <p className="mdt-text-xs mdt-text-muted-foreground">
            {cols.visible.length} shown, {cols.hidden.length} hidden, {cols.frozenCount} pinned
          </p>
        </div>

        <TableOld layout="fixed" containerClassName="mdt-rounded-md mdt-border">
          <TableHeaderOld>
            <TableRowOld>
              {cols.visible.map((column, index) => <TableHeadOld key={column.key} frozen={column.frozen ? column.index : false} className="mdt-whitespace-nowrap" resizable={column.key !== 'created'} {...column.key === 'created' ? {} : {
              width: widths[column.key]
            }} onResize={next => {
              if (column.key !== 'created') setWidth(column.key, next);
            }} insertColumns={cols.hidden} insertSuggested={['due', 'category']} onInsert={key => {
              // The boundary belongs to the column on its left, so the
              // new column lands after it.
              cols.show(key as Key, index + 1);
            }} insertLabel={\`Insert a column after \${column.label}\`}>
                  <TableColumnMenuOld label={column.label} {...column.locked ? {} : {
                onHide: () => {
                  cols.hide(column.key);
                },
                onMoveToStart: () => {
                  cols.moveToStart(column.key);
                },
                onMoveToEnd: () => {
                  cols.moveToEnd(column.key);
                }
              }} frozen={column.frozen} canFreeze={cols.canFreeze(column.key)} onToggleFreeze={() => {
                if (column.frozen) cols.unfreeze(column.key);else cols.freeze(column.key);
              }} />
                </TableHeadOld>)}
            </TableRowOld>
          </TableHeaderOld>
          <TableBodyOld>
            {tickets.map(ticket => <TableRowOld key={ticket.id}>
                {cols.visible.map(column => <TableCellOld key={column.key} frozen={column.frozen ? column.index : false} className="mdt-whitespace-nowrap">
                    {cellFor(ticket, column.key)}
                  </TableCellOld>)}
              </TableRowOld>)}
          </TableBodyOld>
        </TableOld>
      </div>;
  }
}`,...(N=(j=m.parameters)==null?void 0:j.docs)==null?void 0:N.source},description:{story:`Everything in 5a at once: the header menu on every column, an insertion point
at every boundary, and two columns pinned.

Things worth trying, because each one is a decision rather than a feature:

- **Open a column's menu.** ID offers nothing but its name - it is \`locked\`,
  so it cannot be hidden or moved, and rather than show four dead items it
  shows none.
- **Freeze Subject.** Both ID and Subject pin, because freezing is a prefix:
  you cannot pin the second column while the first scrolls, there would be
  nowhere for it to sit. Scroll sideways and the pinned pair keeps one
  boundary between them and the rest, not one each.
- **Try to freeze Priority.** There is no Freeze item past the second column
  - hidden rather than disabled, because it is not a thing that could happen.
- **Hide a column, then hover a boundary.** The \`+\` puts it back *where you
  are*, not where it used to be. The strip is 20px wide, so you need to be
  near the boundary rather than anywhere in the header - a hover zone the
  width of a column would fire constantly.

**Filter, Group and Sort are deliberately absent here.** They need the
pickers that arrive with the toolbar, and passing a handler that does nothing
would put three dead items in every menu - which is the exact thing this
component avoids by only rendering what it was given. The Header menu story
below shows the full set.`,...(R=(H=m.parameters)==null?void 0:H.docs)==null?void 0:R.description}}};var F,B,S,I,D;h.parameters={...h.parameters,docs:{...(F=h.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: function TwoFrozen() {
    const cols = useTableColumnsOld(definitions);
    return <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <div className="mdt-flex mdt-gap-2">
          <Button variant="outline" size="sm" onClick={() => {
          cols.freeze('id');
        }}>
            Pin 1
          </Button>
          <Button variant="outline" size="sm" onClick={() => {
          cols.freeze('subject');
        }}>
            Pin 2
          </Button>
          <Button variant="outline" size="sm" onClick={() => {
          cols.unfreeze('id');
        }}>
            Unpin
          </Button>
        </div>

        <TableOld containerClassName="mdt-rounded-md mdt-border">
          <TableHeaderOld>
            <TableRowOld>
              {cols.visible.map(column => <TableHeadOld key={column.key} frozen={column.frozen ? column.index : false} className="mdt-whitespace-nowrap">
                  {column.label}
                </TableHeadOld>)}
            </TableRowOld>
          </TableHeaderOld>
          <TableBodyOld>
            {tickets.map(ticket => <TableRowOld key={ticket.id}>
                {cols.visible.map(column => <TableCellOld key={column.key} frozen={column.frozen ? column.index : false} className="mdt-whitespace-nowrap">
                    {cellFor(ticket, column.key)}
                  </TableCellOld>)}
              </TableRowOld>)}
          </TableBodyOld>
        </TableOld>
      </div>;
  }
}`,...(S=(B=h.parameters)==null?void 0:B.docs)==null?void 0:S.source},description:{story:`Two pinned columns, which is the piece that was not additive.

\`frozen\` used to be a boolean pinned at \`left: 0\`, which is correct for
exactly one column. A second one has to start at the measured width of the
first - a runtime value that depends on the content, the layout mode and
whatever the column was dragged to - so \`TableOld\` measures its own header and
hands each pinned cell its offset.

The boundary and the shadow belong to the **last** pinned column only. Draw
them on each one and the two pinned columns get a divider between them that
no other pair has, which reads as two stuck columns rather than one pinned
block.

Scroll sideways to see it.`,...(D=(I=h.parameters)==null?void 0:I.docs)==null?void 0:D.description}}};var M,P,$,A,E;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: function Insertion() {
    const cols = useTableColumnsOld(definitions);
    const started = cols.hidden.length > 0;
    return <div className="mdt-flex mdt-flex-col mdt-gap-3">
        {!started && <Button variant="outline" size="sm" onClick={() => {
        cols.hide('category');
        cols.hide('due');
        cols.hide('created');
      }}>
            Hide three columns first
          </Button>}
        {started && <p className="mdt-text-xs mdt-text-muted-foreground">
            Hidden: {cols.hidden.map(column => column.label).join(', ')}. Hover a boundary between
            two headers.
          </p>}

        <TableOld containerClassName="mdt-rounded-md mdt-border">
          <TableHeaderOld>
            <TableRowOld>
              {cols.visible.map((column, index) => <TableHeadOld key={column.key} className="mdt-whitespace-nowrap" insertColumns={cols.hidden} insertSuggested={['due']} onInsert={key => {
              cols.show(key as Key, index + 1);
            }} insertLabel={\`Insert a column after \${column.label}\`}>
                  {column.label}
                </TableHeadOld>)}
            </TableRowOld>
          </TableHeaderOld>
          <TableBodyOld>
            {tickets.map(ticket => <TableRowOld key={ticket.id}>
                {cols.visible.map(column => <TableCellOld key={column.key} className="mdt-whitespace-nowrap">
                    {cellFor(ticket, column.key)}
                  </TableCellOld>)}
              </TableRowOld>)}
          </TableBodyOld>
        </TableOld>
      </div>;
  }
}`,...($=(P=u.parameters)==null?void 0:P.docs)==null?void 0:$.source},description:{story:`The insertion point on its own, with three columns already hidden so there is
something to add.

Hover any boundary between two headers. The line and the \`+\` appear together
on one hover rather than the button waiting behind a second, more precise
one - quieter, but it hides the affordance behind a gesture nobody has been
taught.

The button sits **inside** the header's height rather than above it. The
table scrolls sideways inside an \`overflow-auto\` container, and anything
drawn above the header row is clipped by it.`,...(E=(A=u.parameters)==null?void 0:A.docs)==null?void 0:E.description}}};var K,L,G,U,W;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: function HeaderMenuDemo() {
    const cols = useTableColumnsOld(definitions.slice(0, 5));
    const [chosen, setChosen] = useState<string | null>(null);
    return <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <div className="mdt-flex mdt-items-center mdt-gap-3">
          <Button variant="outline" size="sm" onClick={cols.reset} disabled={!cols.isChanged}>
            Reset layout
          </Button>
          <p className="mdt-text-xs mdt-text-muted-foreground">{chosen ?? 'Open a column menu.'}</p>
        </div>

        <TableOld containerClassName="mdt-rounded-md mdt-border">
          <TableHeaderOld>
            <TableRowOld>
              {cols.visible.map(column => <TableHeadOld key={column.key} frozen={column.frozen ? column.index : false} className="mdt-whitespace-nowrap">
                  <TableColumnMenuOld label={column.label} onFilter={() => {
                setChosen(\`Filter by \${column.label} - arrives with the toolbar\`);
              }} onGroup={() => {
                setChosen(\`Group by \${column.label} - arrives with the toolbar\`);
              }} onSort={() => {
                setChosen(\`Sort by \${column.label} - arrives with the toolbar\`);
              }} frozen={column.frozen} canFreeze={cols.canFreeze(column.key)} onToggleFreeze={() => {
                if (column.frozen) cols.unfreeze(column.key);else cols.freeze(column.key);
                setChosen(\`\${column.frozen ? 'Unfroze' : 'Froze'} \${column.label}\`);
              }} {...column.locked ? {} : {
                onMoveToStart: () => {
                  cols.moveToStart(column.key);
                  setChosen(\`Moved \${column.label} to the start\`);
                },
                onMoveToEnd: () => {
                  cols.moveToEnd(column.key);
                  setChosen(\`Moved \${column.label} to the end\`);
                },
                onHide: () => {
                  cols.hide(column.key);
                  setChosen(\`Hid \${column.label}\`);
                }
              }} />
                </TableHeadOld>)}
            </TableRowOld>
          </TableHeaderOld>
          <TableBodyOld>
            {tickets.map(ticket => <TableRowOld key={ticket.id}>
                {cols.visible.map(column => <TableCellOld key={column.key} frozen={column.frozen ? column.index : false} className="mdt-whitespace-nowrap">
                    {cellFor(ticket, column.key)}
                  </TableCellOld>)}
              </TableRowOld>)}
          </TableBodyOld>
        </TableOld>
      </div>;
  }
}`,...(G=(L=p.parameters)==null?void 0:L.docs)==null?void 0:G.source},description:{story:`The header menu, wired to real state.

**Move, Freeze and Hide work here** - they are column layout, which is what
5a is. **Filter, Group and Sort report what you chose and do nothing else**,
because sorting and grouping arrive with the toolbar and its pickers; wiring
them to a no-op would be the dead item this component exists to avoid, so
they are wired to a readout instead.

A column shows only the items it was given a handler for. ID is \`locked\` and
gets no menu at all rather than four items it would refuse to obey.`,...(W=(U=p.parameters)==null?void 0:U.docs)==null?void 0:W.description}}};var q,_,J,V,Q;b.parameters={...b.parameters,docs:{...(q=b.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: function DragToReorderDemo() {
    // ID is an ordinary column here, unlike in the other stories on this page.
    // Reordering should be blocked by *pinning*, which you can undo, rather
    // than by \`locked\`, which is permanent - otherwise "why will this not
    // move" has no answer on screen.
    const cols = useTableColumnsOld(definitions.map(column => ({
      key: column.key,
      label: column.label
    })));
    // The drop line runs the height of the table, so it needs the table's box.
    const tableRef = useRef<HTMLTableElement>(null);
    const lineBox = tableRef.current?.getBoundingClientRect();
    const reorder = useColumnReorderOld({
      columns: cols.visible,
      frozenCount: cols.frozenCount,
      onMove: (key, to) => {
        cols.move(key, to);
      }
    });
    return <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <div className="mdt-flex mdt-items-center mdt-gap-3">
          <Button variant="outline" size="sm" onClick={cols.reset} disabled={!cols.isChanged}>
            Reset order
          </Button>
          <Button variant="outline" size="sm" onClick={() => {
          if (cols.frozenCount > 0) cols.unfreeze('id');else cols.freeze('id');
        }}>
            {cols.frozenCount > 0 ? 'Unpin ID' : 'Pin ID'}
          </Button>
          <p className="mdt-text-xs mdt-text-muted-foreground">
            {cols.visible.map(column => column.label).join(' · ')}
          </p>
        </div>

        <TableOld ref={tableRef} containerClassName="mdt-rounded-md mdt-border">
          <TableHeaderOld>
            <TableRowOld>
              {cols.visible.map(column => <TableHeadOld key={column.key} columnKey={column.key} style={reorder.styleFor(column.key)} className="mdt-group/col mdt-whitespace-nowrap">
                  <span className="mdt-flex mdt-items-center mdt-gap-2">
                    {column.label}
                    {!column.frozen && <button type="button" {...reorder.gripProps(column.key)} className={['mdt-ml-auto mdt-cursor-grab mdt-touch-none mdt-rounded-sm', 'mdt-text-muted-foreground hover:mdt-text-foreground', 'mdt-opacity-0 mdt-transition-opacity', 'focus-visible:mdt-opacity-100 group-hover/col:mdt-opacity-100', 'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring'].join(' ')}>
                        <Icon name="grip-vertical" size="sm" aria-hidden />
                      </button>}
                  </span>
                </TableHeadOld>)}
            </TableRowOld>
          </TableHeaderOld>
          <TableBodyOld>
            {tickets.map(ticket => <TableRowOld key={ticket.id}>
                {cols.visible.map(column => <TableCellOld key={column.key} columnKey={column.key} style={reorder.styleFor(column.key)} className="mdt-whitespace-nowrap">
                    {cellFor(ticket, column.key)}
                  </TableCellOld>)}
              </TableRowOld>)}
          </TableBodyOld>
        </TableOld>

        {/*
          The ghost and the line are the only things that move. Both are
          \`fixed\`, so they sit above the table's own scroll container - which
          clips anything inside it - and neither touches layout, which is what
          keeps the drag smooth.
         */}
        {reorder.dropLine !== null && createPortal(<span aria-hidden className="mdt-pointer-events-none mdt-fixed mdt-z-popover mdt-w-0.5 mdt-bg-primary" style={{
        left: reorder.dropLine,
        top: lineBox?.top ?? 0,
        height: lineBox?.height ?? 0
      }} />, document.body)}

        {reorder.ghost !== null && createPortal(<span aria-hidden className={['mdt-pointer-events-none mdt-fixed mdt-z-popover', 'mdt-flex mdt-items-center mdt-rounded-md mdt-border mdt-border-border', 'mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm mdt-font-medium mdt-shadow-lg',
      // Nowhere to drop it: a locked or pinned column is in the way.
      reorder.ghost.canDrop ? '' : 'mdt-border-dashed mdt-opacity-50'].join(' ')} style={{
        left: reorder.ghost.left,
        top: reorder.ghost.top,
        width: reorder.ghost.width,
        transform: 'translate(-50%, -50%)'
      }}>
              {reorder.ghost.label}
            </span>, document.body)}
      </div>;
  }
}`,...(J=(_=b.parameters)==null?void 0:_.docs)==null?void 0:J.source},description:{story:`**Drag a column sideways to move it.** Hover a header and a grip appears on
its trailing side; drag it and the other columns step aside.

**The columns move as you drag, rather than a line showing where it will
land.** A drop indicator tells you an index; watching the table rearrange
tells you what you are going to get, which is the actual question. It works
because \`table-cell\` is a transformable element - only table *column* boxes
are excluded - so each cell slides on a transform without touching layout.

**Nothing is committed until you let go.** The transforms are visual; the
order changes once, on drop. A drag you abandon costs nothing, and undo has
one thing to undo rather than thirty.

**Pin ID and it stops moving.** Pinning is what makes a column immovable
here, and unpinning gives it its grip back - so the block is a state you can
see and undo, not a property of that column. (\`locked\` is a different thing,
for columns that are not really data - a checkbox, a row number - and the
other stories on this page use it.)

**Keyboard:** Tab to a grip and use the arrow keys. One position per press,
committed immediately - there is no "let go" to commit on.`,...(Q=(V=b.parameters)==null?void 0:V.docs)==null?void 0:Q.description}}};const Pe=["ColumnControls","TwoFrozenColumns","InsertionPoints","HeaderMenu","DragToReorder"];export{m as ColumnControls,b as DragToReorder,p as HeaderMenu,u as InsertionPoints,h as TwoFrozenColumns,Pe as __namedExportsOrder,Me as default};
//# sourceMappingURL=TableColumnControls.stories-BR9mSpBi.js.map
