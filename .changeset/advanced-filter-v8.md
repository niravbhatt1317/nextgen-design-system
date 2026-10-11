---
'@mtdt/nextgen-design-system': minor
---

The More filters panel: a close ✕ in its header, a plain "Add filter", and it stays open.

Values and the operator box wear the reading ink. A press outside no longer closes
the panel: it glows for one second instead (the new `--mdt-nudge` token - the
interactive blue in light, the primary in dark); the ways out are the ✕, Apply,
Clear all, the button that opened it, and Escape. Its height is capped to the room
below it and the rows scroll inside. The Where and GROUP labels keep 2.0.0's ink.
