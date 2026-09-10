---
'@mdt/design-system': minor
---

PageFrame: the default page layout of the merged console

The layer above the components — where things go, rather than what they look
like. A navigation rail that never moves sits beside ONE scroll container, and
that container holds four bands in a fixed order:

- `PageHeader` (B1) — 60 tall, pinned at 0, always rendered because it is the
  page's fixed anchor. Carries the breadcrumb, never a global control. The one
  band that keeps a hairline.
- `PageHero` (B2) — the page's single H1 with its badge, supporting line and an
  action cluster of one to three buttons; banners and the KPI strip go in as
  children. Never pinned.
- `PageBand` (B2t/B3) — 60 tall, pinned at 58. `variant="tabs"` or
  `variant="toolbar"`, and a page renders exactly one of them, never both.
- `PageSurface` (B4) — a natural-height stack riding the page scroll, never a
  scroller of its own.

Two things are derived rather than typed, so they cannot drift:

- `--mdt-thead-top` is calculated from the two band heights, so a table inside
  the frame docks at the right offset without knowing what the bands are.
- The surface's inset comes from the band actually rendered above it, through a
  CSS sibling rule. Under a toolbar band it is 6 above and 20 below; under a tab
  band it is 16 on both sides, because a tab band ends in the active tab's 2px
  underline and at 6px of air that line and the table's own top edge read as a
  single line.

The hero hands its action cluster to the header band once it scrolls out of
view, so the page's main verbs never leave the screen; the hero's own copy stays
rendered and reachable throughout.
