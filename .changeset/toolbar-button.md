---
'@mtdt/nextgen-design-system': minor
---

Adds `ToolbarButton`, the 32px control that lives in a Toolbar strip (Filters, a quick filter, Sort, Columns), ported from the merged console. One look, four states: rest (white ground, neutral-30 edge, slate glyph and 13px label), hover and keyboard focus (ground lifts to neutral-10, edge turns slate), open (the same as hover; a Radix trigger reports it through `data-state`), and active (white ground, slate edge, plus a `count` Badge 12px after the label capped at 9+, or a `dot` on the top-right corner). Applied filters are never shown as chips. `Toolbar` gains a `band` variant: the console's 60px list-page strip with a 24px inset and 10px between controls.

`TableToolbar`, `TableToolbarActions` and `TableFilterChips` are deprecated: the band strip and `ToolbarButton` replace the first two, and applied filters are never shown as chips. They stay, shown under `Deprecated/Table Toolbar` in Storybook, until the removal pull request. `TableSortMenu` and `TableViewMenu` are unaffected.

`DataTable` still renders `TableToolbar` and `TableFilterChips` inside itself; it moves to the band strip and `ToolbarButton` with the table port, the next piece of this work.
