---
'@mtdt/nextgen-design-system': patch
---

Table: the action menu rules (Pranjal, 2026-10-27).

- **Every ⋯ menu is at least 224 wide** - the row ⋯ in `DataTable` and a heading's ⋯ in `TableHead` (were 192,
  `mdt-min-w-48` → `mdt-min-w-56`). Still a floor, not a width: a longer item widens the menu. His words, on the
  collector row menu: "increase the width by a little bit". The quick-filter and Sort menus are not action menus and
  keep their widths.
- **A row with nothing to do shows no ⋯.** When `rowActions(row)` answers nothing renderable - `null`, `undefined`,
  `false`, `''`, an empty list or an empty fragment - that row draws no ⋯; its Action cell stays, so the columns stay
  aligned. Before, every row drew a ⋯ that opened an empty menu. His words: "do not ever show view in the three dot
  ever. row click already do that. If only view is visible in a table action then remove the full column" (a page whose
  rows never have an action leaves `rowActions` out, as before, and gets no column).

**Changed defaults, named:** both are visible without any code change. No prop, token or public name changes.

The console bridges these replace, deletable once the console takes this release: `EVERY ⋯ ACTION MENU IS AT LEAST
224 WIDE` (for the table's menus) and `A ROW WITH NOTHING TO DO SHOWS NO ⋯` (`tr:has([data-row-actions="none"])` and
the marks it reads) in `src/styles/global.css`.
