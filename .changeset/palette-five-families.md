---
'@mdt/design-system': minor
---

Colours: five new families, and a Foundation page that reads itself

**Five families the palette did not have** — indigo, teal, magenta, cyan and
lime, 55 shades. Category colours: hues that carry no meaning, so a source chip
or an avatar never reads as success, warning or danger. Until now they were
written by hand into chip code because there was nothing here to reach for. The
anchor shades are exactly the values those chips already painted, so nothing on
screen moves.

This is **purely additive**. Not one of the existing 87 shades is touched.

**Foundation/Colors is rebuilt.** Every swatch is now read live from the running
stylesheet, so the page cannot drift from the tokens it describes. The page it
replaces typed out more than a thousand lines of hex by hand and had already
drifted — several of its values no longer matched what the token resolved to.

Four short pages instead of one long one:

- **Palette** — twelve families, 141 shades, click a swatch to copy its token.
- **What each shade is for** — a stated job per rung, so picking a shade is a
  decision rather than a guess at brightness.
- **Text on a tint** — each family's published text shade, with its contrast
  measured as the page renders. Red reaches 4.5:1 at -70, most families need
  -80, and yellow and purple have to go to -90.
- **Where the console and the library disagree** — the 24 token names that paint
  one colour here and another in the console. Still open, and Nirav's call.

The previous page is kept at **Deprecated/Colors Old** until 1.0.0.
