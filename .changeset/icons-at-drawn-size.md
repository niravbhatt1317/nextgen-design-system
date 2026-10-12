---
'@mtdt/nextgen-design-system': patch
---

Button and ToolbarButton give an Icon handed in without a size the size they draw it at (16 / 14px), so the stroke
ladder picks the small-icon line instead of the 20px default the button then squeezed down. DataTable's row actions and
LeftNav's more button stop pinning a 1.5 line.
