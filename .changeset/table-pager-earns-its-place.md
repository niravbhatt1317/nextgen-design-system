---
'@mtdt/nextgen-design-system': minor
---

Table: the pager strip only appears when there is something to page.

`pager="auto"` (the default) draws it once there IS a second page — 25 rows at 25 a page have none, 26 have one — and never while loading or in a blank state, where six disabled controls under an empty table were furniture and the blank state already carries the message. A "Load more" footer likewise goes once everything is loaded. `pager="always"` keeps the strip for a list about to grow; `pager="never"` drops it for a list that shows all it has.
