---
'@mtdt/nextgen-design-system': minor
---

Tooltip is the merged console's hover bubble on the library's engine (7 September 2026): the console fill and text (neutral-130 with white; neutral-10 with neutral-130 in dark), the library's 6/12 padding, 12/16 type, 10 × 5 arrow, four sides with edge flipping, keyboard focus and screen-reader wiring. A 100ms wait by default, `instant` for chips and counters. Two content pieces from the console: `hint`, a quieter 10px second line, and `items`, a bullet list that scrolls past seven lines. Plain text wraps at `maxWidth` 280 and reads centred. No tones, no sizes. The previous Tooltip is `TooltipOld`, deprecated, kept for side-by-side review until 1.0.0. The Table's ContactChips carry the hint bubble and say "Copied!" after a click; TagList's "+N" lists the rest.
