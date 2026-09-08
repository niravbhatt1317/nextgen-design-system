---
'@mtdt/nextgen-design-system': minor
---

**Breaking for anyone using `Toolbar`.** The name now means the strip the merged console draws above a list: 60px tall, a 24px inset, 10px between controls, on the page ground, with no sizes. `ToolbarSection` (8px between its controls) and `ToolbarSpacer` stay. The previous general-purpose strip, with its `compact` and `spacious` variants and padding switches, is `ToolbarOld` (`ToolbarOldSection`, `ToolbarOldSpacer`, `toolbarOldVariants`), deprecated and shown under `Deprecated/Toolbar Old`.

Adds `ToolbarButton`, the 32px control that lives in the strip (Filters, a quick filter, Sort, Columns). One look, four states: rest (white ground, neutral-30 edge, slate glyph and 13px label), hover and keyboard focus (ground lifts to neutral-10, edge turns slate), open (the same as hover; a Radix trigger reports it through `data-state`), and active (white ground, slate edge, plus a `count` Badge 12px after the label capped at 9+, or a `dot` on the top-right corner). Applied filters are never shown as chips.

`TableToolbar`, `TableToolbarActions` and `TableFilterChips` are deprecated: the strip and `ToolbarButton` replace the first two, and applied filters are never shown as chips. They stay under `Deprecated/Table Toolbar` until the removal pull request. `TableSortMenu` and `TableViewMenu` are unaffected. `DataTable` still renders `TableToolbar` and `TableFilterChips` inside itself; it moves to the new strip with the table port, the next piece of this work.
