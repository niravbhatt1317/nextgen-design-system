---
'@mtdt/nextgen-design-system': patch
---

Tabs: the underline row no longer shifts when you change tabs.

K-Tabs-07 puts the active underline label at 600 while the rest stay at 500, and
600 is wider - so selecting a tab widened its own label and pushed every tab
after it sideways. Measured at **1.31px** across the five-tab Underline story,
and worse than that sounds: the shift is sub-pixel and the browser rounds it
differently per tab, so the row read as jitter rather than a slide.

The label now sits in a one-column grid holding the real text and an `::after`
copy of it fixed at 600 with no height. The column is as wide as the wider of the
two - always the 600 copy - so the width is identical whether or not the tab is
active. **1.31px becomes 0.00px**, and the real 500 and 600 weights still render:
K-Tabs-07 is untouched.

- **Only `underline`.** The chip holds its label at 500 in every state
  (K-Tabs-11), so reserving a 600 width there would widen every filled tab for a
  weight it never reaches. Filled already measured 0.00px and is unchanged.
- **Only a string label.** `attr(data-text)` can read nothing else, and
  duplicating an arbitrary node to measure it would run whatever is inside it
  twice. A non-string label passes straight through, exactly as before.
- **The inactive tabs widen** to their 600 width - +4px across the five in that
  story, absorbed by the row's existing slack. The active tab does not move at
  all, since it was already 600.
- **Nothing is read twice.** `visibility: hidden` drops the copy from the
  accessibility tree, so the accessible names are unchanged - checked against
  Chrome's own tree, since jsdom renders no pseudo-element and could not tell.
