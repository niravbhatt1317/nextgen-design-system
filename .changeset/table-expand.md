---
'@mdt/design-system': minor
---

Table: `expand` — the table drives its own morph, and one row behaves like a thousand

Until now the Table only _rendered_ a morph value someone else computed. Its own
documentation said so: "the page decides when, the table only decides how it
looks. The page also sets the card's height once docked." That left Pranjal's
rule living in whoever called the table rather than in the table.

`expand` moves it inside. With it on, the table:

- takes the full height under the page's dock line **whatever it holds**
- widens to the page as it reaches that line, and hands the scroll to its rows
- keeps its pager on screen instead of letting it float up under a short list

One rule, two consequences, and neither can now be got wrong by a caller: a
table expands on scroll **even holding a single row**, and a filtered-down list
does not suddenly behave like a different component.

The dock line is read from the page rather than typed: the frame's own published
offset where that is a plain value, otherwise the band heights it is derived
from — so changing a band height cannot leave the table docking in the wrong
place. `dockOffset` is there for pages that are not a `PageFrame`.

Nothing existing changes. `docked` keeps its exact contract for callers that
drive the morph themselves, and is ignored only while `expand` is on.
