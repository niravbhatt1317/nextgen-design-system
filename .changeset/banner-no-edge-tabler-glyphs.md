---
'@mtdt/nextgen-design-system': patch
---

Banner drops its edge and takes Toast's Tabler glyphs.

- **No border, in either placement** (Pranjal, 2026-09-28: "in banner we will
  remove the borders"). The tint alone marks the banner out; an outline around
  it was one line too many inside a form card, which is where most banners sit.
  `inline` keeps its rounding, `page` still loses it - there is nothing beside
  an edge-to-edge banner to be rounded against.
- **The tone glyphs are Tabler's**, the same set Toast moved to on 2026-09-29,
  with the bulb on the blue info banner. Om Vekariya's rule is unchanged: only
  the icon and the tint carry the tone, and the words stay one colour.
- **The stories moved to New Components/Banner**, with the rest of the parts
  reworked for the console.

Worth knowing before you place one on a bare page: with the edge gone, the tint
is all there is, and on white it is faint - 1.03:1 for warning, 1.08:1 at best.
That is by design on a card, where the card draws the boundary. On a plain page
the icon and the text are what say a banner is there.
