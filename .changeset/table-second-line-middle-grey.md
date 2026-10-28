---
'@mtdt/nextgen-design-system': minor
---

Table: **a cell's second line is the middle grey** (Pranjal, 2026-10-28: he picked "Middle grey" for every table's
second line, both fleets and IAM / Organizations).

**This changes a default.** No prop changes, but every `DataTable` cell that stacks a line under its value - a flex
column (`mdt-flex-col`) whose later child is, or holds, a `mdt-text-neutral-90` line - now draws that line in
`neutral-60` (`#7186A8`) instead of `neutral-90` (`#516381` light, `#8E9FBC` dark). Light measures 3.7:1 on
white (dark 5.2:1 on the dark card), under the 4.5 text rule - his pick, measured and shown to him. Only inside a table cell: a drawer row's hint, a menu's or a
field's second line keep their own ink. The rule lives in `table.css` (`.tbl-cell { --tbl-cell-sub }`); no token or
public name is added. The console's bridge it replaces, deletable once the console takes this release: `A TABLE'S
SECOND LINE IS THE MIDDLE GREY` (`td { --cell-sub }` and its two selectors) in `src/styles/global.css`.

Also: `TableAlign` and `TableColumnDef.align` no longer say "numbers sit right". The table never right-aligned on its
own (`align` defaults to `left`), and the docs now say so: no right-aligned columns, figures included (the console's
rulebook item 65, 2026-09-12). `align="right"` stays for a caller who names it.

New stories: Table → "Two-line cells and figures" and "Rows open from a side panel".
