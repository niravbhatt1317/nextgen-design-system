---
'@mtdt/nextgen-design-system': patch
---

IconTile's blue glyph reads `--mdt-tile-blue-ink`, and a popover opened inside a drawer scrolls.

The blue tile glyph was blue-60 in both themes; in dark it is now the info badge's ink
(#7FB2E0), as the 2026-09-28 ruling asked - the bright blue was hard to see on the dark
tile. A popover portalled out of a drawer or dialog had its wheel and touch scrolling
swallowed by the dialog's scroll lock (the date picker's time list did not move); the
popover now stops those events from reaching it.
