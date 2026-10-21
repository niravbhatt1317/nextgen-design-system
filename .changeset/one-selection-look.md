---
'@mtdt/nextgen-design-system': minor
---

Every dropdown, list and menu now shows a picked option the same way (Pranjal, 2026-10-21): **the
picked row sits on the pale `blue-10` ground with its tick on the right** in the row's own ink; the
row under the pointer or the keyboard takes only the grey `neutral-10` ground and **no tick**; a
picked row keeps its pale ground under the pointer.

**This changes defaults.** No prop changes, but these parts look different without any code change:

- `Select` — the faint grey tick that appeared on an unpicked row under the pointer is gone (the
  16px slot stays, so labels do not move). Multi-select picked rows gain the pale ground. The
  searchable single select keeps its tick on the picked row under the pointer instead of swapping it
  for an X. The keyboard highlight in the plain single select now takes the grey ground.
- `SelectOld2` (deprecated) — the same three changes.
- `Combobox` — the tick moves from the left of the label to the right, and the picked row is pale
  blue instead of the grey it shared with the highlight.
- `DropdownMenuCheckboxItem` — the tick moves from the left to the right (the 32px reserved on the
  left is now reserved on the right) and a checked row takes the pale ground. The tick stays the
  row's first child, so a consumer hiding it with `[&>span:first-child]:mdt-hidden` (as
  `DataTable`'s quick filters do) still hides it — but **a ticked quick-filter row now also wears
  the pale ground**.
- `DropdownMenuRadioItem` — the dot on the left becomes a tick on the right, with the pale ground on
  the chosen row.
- `DataTable` — the Sort menu's active field takes the pale ground; its ↑/↓ stays on the right.
- `TablePager` / `TablePagerOld2` — the current rows-per-page option takes the pale ground.
- `TableViewMenuOld` (Group by) and `TableViewSwitcherOld` (saved views) — the picked row takes the
  pale ground; the saved-view tick moves from the left to the right.

The ground lives in one place, `src/utils/picked-row.ts` (internal, not exported), so the parts
cannot drift apart again.
