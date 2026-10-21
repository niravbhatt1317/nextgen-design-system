---
'@mtdt/nextgen-design-system': minor
---

**A picked row keeps its tick while the pointer is on it** (Nirav, 2026-10-21). This completes the
one selection look: the multi-select used to replace a picked row's tick with a 12px X under the
pointer, to say that a click there removes the pick.

**This changes a default.** `Select` and `SelectOld2`, every mode, in any list with picks.

Taking the tick away under the pointer blanked the "picked" mark on whichever row the mouse was
on — so running down a list of five picks blanked each one in turn. That is the same fault this
release removed from unpicked rows, with the roles swapped. The pale `blue-10` ground still says
"picked" and the row is still a toggle, so **only the cue is gone, not the behaviour**: clicking a
picked row still removes it, and the pills in the field keep their own ✕, which is where removal is
genuinely the only job that control has.

If a flow taught people to look for that X in the list, this is the line to read.

No public name changes. `deselectable` — the internal flag that existed only to switch the X — is
removed with it, and it was never exported.
