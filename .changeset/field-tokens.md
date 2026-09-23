---
'@mtdt/nextgen-design-system': minor
---

The field's tokens, from Pranjal's 2026-09-22 rulings.

**`--mdt-destructive` now points at red 60 (`#DB132A`) in light mode, so every error border, halo and message changes colour.** This is visible wherever the library shows an error. The light block had pointed at red 65 (`#C72323`) since the first commit while the dark block already used red 60 — so light and dark have disagreed all along, and red 60 is the one in the rulebook (K-Field-10). White text on the fill measures **5.07:1**, down from 5.69:1 but still clear of the 4.5 minimum.

**`--mdt-faint` is new** — the faint ink for placeholders, resting tab labels, the meta line, and a disabled field's text and lock. It points at `--mdt-neutral-50` in light and `--mdt-neutral-60` in dark, and comes with a `faint` colour in the Tailwind config (`mdt-text-faint`, `mdt-bg-faint`, …). No new colour was added to the palette.

**Two ramp steps land on their documented hex.** `--mdt-neutral-30` rendered `#E4E9F1` against a documented `#E3E8F2`, and `--mdt-red-60` rendered `#DD132B` against `#DB132A` — one unit off in each case. Both now carry the decimals that make them exact, so the field border matches the ruled value. `--mdt-neutral-50`'s comment also said `#8E9FBC` when the value has always rendered `#8FA0BD`; the comment is corrected.
