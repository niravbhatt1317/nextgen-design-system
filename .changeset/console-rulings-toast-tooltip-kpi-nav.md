---
'@mtdt/nextgen-design-system': patch
---

Toast, Tooltip, KpiCard and LeftNav take the console's held-back rulings.

- **Toast** draws no border (2026-09-29: "we should remove borders from every
  toast") - the tint and the shadow carry the shape. It is as wide as its
  content rather than the full toaster, and a custom icon is fitted to the tone
  glyph's own box, so an oversized one no longer pushes the text off its line.
  The tone glyphs are Tabler's outline set, with the blue info toast on the bulb;
  neutral keeps the information circle.
- **Tooltip** is 8 at the corners with 12 on every side (2026-10-03).
- **KpiCard** opens elsewhere, so the gear becomes the external-link glyph at 14.
  The segment no longer shrinks under the pointer - the divider shrank with it -
  and the hover wash moves a step up so it shows on a grey card too.
- **LeftNav** gives "powered by Motadata" its own grey band at the foot of the
  switcher, with the wordmark in its own colours (2026-10-06).

Two new semantic tokens, both pointing at ramp steps that already existed:
`--mdt-overlay-hover` (the hover ground inside a floating panel) and
`--mdt-tile-blue-ink` (the blue icon tile's glyph, which was unreadable on the
dark Name tiles).
