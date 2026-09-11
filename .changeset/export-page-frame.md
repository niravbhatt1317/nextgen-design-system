---
'@mtdt/nextgen-design-system': patch
---

`PageFrame` is now actually exported.

It shipped in 0.5.0 and the changelog announced it, but nothing exported it from
the package root, so `import { PageFrame } from '@mtdt/nextgen-design-system'`
returned nothing. The bundle entry is `src/index.ts`, and the component was not
reachable from it, so no part of it reached `dist/` — the release described a
component nobody could import.

`PageFrame`, `PageHeader`, `PageHero`, `PageBand` and `PageSurface` are exported
now, with their prop types and `PageBandVariant`.

Nothing about the component changed. This is the export line it should have had
in 0.5.0.
