---
'@mtdt/nextgen-design-system': minor
---

The merged console's foundation colours join the palette as new steps, values untouched (names provisional): `ink-400` #9B9EAA, `ink-500` #727283, `azure-60` #0262DE, `emerald-60` #34A853. In light mode `muted-foreground` now points at `ink-500`, `info` and `ring` at `azure-60`, `success` at `emerald-60`; a new `muted-foreground-subtle` (`ink-400`) covers quiet headings. Dark mode is unchanged. LeftNav New drops its scoped overrides for these and snaps three near-miss values (control border, chip tint, Soon badge fill) to palette steps.

Flagged for review: `emerald-60` measures 3.06:1 as text on white, under the 4.5 floor, and `success` is used as ink in Badge, Button, Form messages and Icon. `ink-400` is 2.67:1 by design.
