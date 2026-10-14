---
'@mtdt/nextgen-design-system': minor
---

`IconTile` gains a `tone="outline"` and a copy behaviour (Kevin, 2026-10-13).

Give a tile `copyValue` (or an `onClick`) and it becomes a real button: hovering lifts it above the tile it overlaps,
a bubble shows the value or a `tooltip` with `hint` under it, and a click copies and says `copiedLabel`. Round tiles in
a row overlap by 6px - only when they are pressable (Nirav, 2026-10-14).

The table's `ContactChips` is built on this now instead of carrying its own copy of the same chip.
