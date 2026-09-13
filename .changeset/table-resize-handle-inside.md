---
'@mtdt/nextgen-design-system': patch
---

DataTable: the column resize handle sits fully inside its own heading (12px ending at the boundary line). It used to straddle the boundary, and because every heading is sticky with a z-index the next heading painted over its far half - only about three pixels could be grabbed with the mouse.
