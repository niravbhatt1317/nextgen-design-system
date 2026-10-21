---
'@mtdt/nextgen-design-system': patch
---

Table: a quick-filter column's heading no longer jumps 1.6 px when the pointer reaches it. The name now gives the
heading's baseline in both states (it was the glyph at rest and the name under the pointer), so quick-filter headings
also sit on the same line as every other heading. CSS only (`table.css`, `.tbl-label { align-self: baseline }`); no
default, token or public name changes.
