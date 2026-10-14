---
'@mtdt/nextgen-design-system': minor
---

**Every dialog in the library changes.** `DialogTitle` drops from 18px to **16/24**, and `DialogHeader` gains a rule
under it with 14 below the words - except when the header carries tabs, which bring their own underline (Kevin,
2026-10-13; approved Nirav, 2026-10-14).

This is a default, not a variant, so nothing opts out. A dialog title and a drawer title are the same thing at the same
level and now read at the same size, which is how the console draws both.

`ConfirmDialog` drops its own copy of that styling and inherits it, so the two stop being able to drift apart.
