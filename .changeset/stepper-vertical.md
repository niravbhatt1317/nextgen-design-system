---
'@mtdt/nextgen-design-system': minor
---

Stepper takes `layout="vertical"`: the journey set down a rail, as the navigation of a two-column flow.

A second counter, `reached`, is the furthest step unlocked so far: somebody can go back
to step 2 and forward again to step 4 without redoing 3. Every unlocked step but the
current one is clickable; a locked step is faint and says what opens it. `reached` is
ignored by the horizontal layouts. Nothing changes for `stacked`, `inline` or `underline`.
