import{j as e}from"./iframe-B4s2k7w1.js";import{useMDXComponents as o}from"./index-BQ7G6jfD.js";import{M as r}from"./blocks-D9BMtwkd.js";import"./preload-helper-Dp1pzeXC.js";import"./index-D9dDYVyu.js";import"./index-Bci4Pf7K.js";function s(t){const n={code:"code",em:"em",h1:"h1",h2:"h2",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Foundation/Table columns"}),`
`,e.jsx(n.h1,{id:"table-columns",children:"Table columns"}),`
`,e.jsx(n.p,{children:`Five rules decide what a table's columns do. They were settled on the Users
screen and lived only in that file, so every table built afterwards started
without them — and the difference only showed when somebody put two screens
side by side. They are written here so that stops happening.`}),`
`,e.jsxs(n.p,{children:["Each one is a rule about ",e.jsx(n.strong,{children:"placement and behaviour"}),`, not about styling. The
Table already gives you the right row height, insets and type; these five are
the decisions it cannot make for you.`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"1-every-table-opens-with-a-lead-column-and-it-has-two-faces",children:"1. Every table opens with a lead column, and it has two faces"}),`
`,e.jsxs(n.p,{children:["A ",e.jsx(n.strong,{children:"60px leading column"}),`, pinned at the left edge. What it shows depends on
one fact about the table:`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"The table acts on many rows at once"})," → a ",e.jsx(n.strong,{children:"checkbox"}),`. The heading carries
the select-all box; each row shows its number at rest and its checkbox on
hover, and a picked row keeps the checkbox once you move away.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"It does not"})," → a ",e.jsx(n.strong,{children:"row number"}),", under a ",e.jsx(n.strong,{children:e.jsx(n.code,{children:"#"})}),` heading. Nothing to tick,
so nothing pretends to be tickable.`]}),`
`]}),`
`,e.jsxs(n.p,{children:["The two never sit side by side; it is one slot with two occupants. ",e.jsx(n.code,{children:"DataTable"}),`
picks the face from whether you give it `,e.jsx(n.code,{children:"bulkActions"}),`. Hand-built tables use
`,e.jsx(n.code,{children:"TableLeadHead"})," / ",e.jsx(n.code,{children:"TableLeadCell"})," and pass ",e.jsx(n.code,{children:"selectable"}),` — see
Table → Pieces → The lead column.`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Why it is not optional."}),` Without it, nobody can say "row 14" to anybody, and
a table that later grows selection has to re-flow every column to make room.
The `,e.jsx(n.code,{children:"#"}),` heading used to be blank, which read as a column somebody forgot to
label (Pranjal, 2026-09-11).`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"2-action-sits-second-right-after-the-name",children:"2. Action sits second, right after the name"}),`
`,e.jsxs(n.p,{children:["Not last. ",e.jsx(n.strong,{children:"100px"}),`, which deliberately overrides the 200px floor every other
content column has, and the row's menu sits `,e.jsx(n.strong,{children:"centred"})," in its cell."]}),`
`,e.jsx(n.p,{children:`What you do to a row is a property of the row, not its final fact. A table that
scrolls sideways puts a trailing action menu off-screen, and a menu you have to
scroll to reach is a menu nobody uses.`}),`
`,e.jsx(n.p,{children:"The 100px is so the frozen group stays lean — see rule 3."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"3-the-leading-group-is-frozen",children:"3. The leading group is frozen"}),`
`,e.jsxs(n.p,{children:["Frozen ",e.jsx(n.strong,{children:"up to and including Action"}),": lead column, name, action."]}),`
`,e.jsxs(n.p,{children:[`Those three hold at the left edge while everything else scrolls sideways, so
you always know which row you are reading and can always act on it.
`,e.jsx(n.code,{children:"DataTable"})," does this itself; a hand-built table passes ",e.jsx(n.code,{children:"frozen"}),` (the left
offset) to each of the three and `,e.jsx(n.code,{children:"frozenEdge"})," to the last."]}),`
`,e.jsxs(n.p,{children:["The frozen edge's shadow appears ",e.jsx(n.strong,{children:`only while the table is actually scrolled
sideways`}),`. At rest there is no shadow, because at rest nothing is being held
back — and there is no scrollbar either: the shadow is the whole cue that there
is more to the right.`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"4-columns-are-draggable-except-the-ones-that-are-not",children:"4. Columns are draggable, except the ones that are not"}),`
`,e.jsx(n.p,{children:`Every content column moves: drag the grip that appears on its heading, or use
the heading's menu to send it to either end. The order sticks, per browser.`}),`
`,e.jsx(n.p,{children:"Two groups never move:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"The frozen group"}),` — lead, name, action. Their whole job is to be in a
known place.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"The elastic tail"}),` — the blank last column that soaks up leftover width so
the table always fills its card. It has no grip and no entry in the Columns
panel.`]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"5-every-heading-carries-the-nick",children:"5. Every heading carries the nick"}),`
`,e.jsxs(n.p,{children:["A ",e.jsx(n.strong,{children:"16px mark"}),` at the right edge of every heading — the lead column's
included — sitting the same on every one of them, whether or not that boundary
can be dragged to resize.`]}),`
`,e.jsxs(n.p,{children:[`It is a mark, not a line: it does not run the full height of the heading, and
it says nothing about what the boundary can do. The resize handle is a
separate, invisible thing that sits over it only where resizing is allowed.
`,e.jsx(n.em,{children:'"It might work for some, might not, but it will look the same"'}),` (Pranjal,
2026-09-11).`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"the-order-is-a-rule-not-an-array-position",children:"The order is a rule, not an array position"}),`
`,e.jsxs(n.p,{children:["The five rules together mean a column's position is ",e.jsx(n.strong,{children:"decided"}),`, not typed. A
page hands `,e.jsx(n.code,{children:"DataTable"}),` its content columns and nothing else; the component
places the lead column, Name, Action and the tail itself, so a column added
later cannot land in the wrong place by being written on the wrong line.`]}),`
`,e.jsx(n.p,{children:"Which lays a table out like this, every time:"}),`
`,e.jsxs(n.p,{children:[`| Position | Column                  | Moves?                | Width          |
| -------- | ----------------------- | --------------------- | -------------- |
| 1        | Lead: `,e.jsx(n.code,{children:"#"}),` or checkbox   | No — frozen           | 60             |
| 2        | Name                    | No — frozen           | 200            |
| 3        | Action                  | No — frozen           | 100            |
| 4 … n    | Everything else         | `,e.jsx(n.strong,{children:"Yes, dragged"}),`      | 200 floor      |
| last     | Elastic tail            | No                    | 60, grows      |`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"where-these-came-from",children:"Where these came from"}),`
`,e.jsx(n.p,{children:`The first four were ruled on by Pranjal during the Users work in August 2026,
and recorded here on 2026-09-11 after the Service accounts screen was built
without any of them and the gap had to be found by eye. The lead column's two
faces, the centred action, the missing scrollbar and the nick were ruled the
same day.`}),`
`,e.jsx(n.p,{children:`If you are building a new table and one of these does not fit your screen, that
is worth a conversation — it is not worth quietly leaving out.`})]})}function u(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{u as default};
//# sourceMappingURL=TableColumns-DG4jIXRD.js.map
