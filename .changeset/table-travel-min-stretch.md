---
'@mtdt/nextgen-design-system': minor
---

Table: three rules the card and its columns now keep.

- **The reshaping runs over the travel the card actually has.** It was measured against a flat 140px, so a card starting 81px above its dock line rested 42% reshaped, corners half flattened before anyone scrolled. Every card now rests at 0 and reaches 1 exactly at the dock line, however far from it it starts.
- **A declared column width is held to the minimum (120)**, the same floor the resize handle keeps. A page can no longer declare 110 and get it.
- **Spare width is shared equally among the content columns**, so a wide card shows wider columns rather than a blank run past the last one. The lead, Name and Action columns keep their ruled widths; a card narrower than its columns still scrolls sideways.
