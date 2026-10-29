---
'@mtdt/nextgen-design-system': minor
---

Three parts the console built for itself, now in the library (Pranjal, 2026-10-28: "push everything in storybook
now. Dont leave anything"). Each was read from its console source and ported as it is - the measurements, colours (as
library tokens), behaviour and words; none redesigned.

- **`PickCard` (new, SelectableCard folder)** - a choice already made, shown as one card with a "Change" door
  (Shopify's checkout summary; Pranjal's named element, 2026-10-19). The option card's look - 14 in, 12 corners, the
  1.5 edge, the 40 tile in the sunken fill - and the whole card is the button: the selector glyph at rest, the
  underlined "Change" in its place on hover or keyboard focus, the sunken fill on hover. Props: `icon`, `title`,
  `description`, `onChange`, `changeLabel`. From `features/fleet-new/afm/shell/PickCard.tsx` + `pickCard.css`.
- **`Banner placement="strip"` (new placement)** - the page's notice strip: edge to edge, a hairline under it in the
  tone's own feedback border, at least 44 tall, the glyph 22 in and the actions ending 24 in (the header band's
  insets); its actions stay on its one row (`actionPlacement` defaults to `inline` on a strip only). From
  `features/organizations/Strip.jsx` + `strip.css`, as Collector Fleet and Organization detail draw it.
- **`useDismissUntilNew` (new hook, Banner folder)** - a notice's ✕ that hides it until something new happens: give
  it the ids the notice is about; dismissing remembers that set (in `localStorage` unless told otherwise) and the
  notice returns as soon as an id outside it appears. From Collector Fleet's "A collector isn't placed in a network
  zone" strip (`cfm/App.tsx`, Pranjal 2026-10-26, option A).

Also: `SelectableCard`'s three edges moved into a shared file so `PickCard` wears the same ones; `SelectableCard`
renders exactly as before. The console's organization mark (`ui/OrgMark.jsx`) was already here - it is `Avatar` with
`logo` (#162) - so nothing was added for it.

The organization card and the "Needs attention" problem row are not components: each is a `Card` composed with
`Avatar` / `IconTile` (Pranjal, 2026-10-29: "Problem card, org card, are just card no need for additional component").

**No default changes.** Every addition is opt-in: `Banner`'s existing placements keep `actionPlacement="auto"`.

New public names: `PickCard`, `PickCardProps`, `useDismissUntilNew`, `DismissStorage`,
`DismissUntilNewOptions`, `DismissUntilNewState`; the `BannerPlacement` type gains `'strip'`. No tokens added.
