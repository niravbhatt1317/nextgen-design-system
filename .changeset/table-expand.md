---
'@mdt/design-system': minor
---

Table: `expand` — the table drives its own morph **by default**, and one row behaves like a thousand

Until now the Table only _rendered_ a morph value someone else computed. Its own
documentation said so: "the page decides when, the table only decides how it
looks. The page also sets the card's height once docked." That left Pranjal's
rule living in whoever called the table rather than in the table.

`expand` moves it inside, and it is **on unless you turn it off** — a rule that
has to be remembered at every call site is a rule that gets forgotten at one of
them. Every table:

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

### What the default does not touch

The default is safe wherever a table lands because it only engages once it has
actually found a page to fill — a scrolling ancestor, and room under the dock
line worth taking. A table in a drawer, a modal or a card finds neither, stays
an ordinary card and keeps its own `maxHeight`, exactly as before.

`docked` also keeps its exact contract: pass one and the page keeps the job of
driving the morph, because `expand` stands down unless it is passed explicitly
alongside. `expand={false}` opts out of everything.

### What it does change

Any table sitting directly in a scrolling page now fills the height under its
dock line instead of ending where its rows end. That is the point of the change,
and it is visible on every list at once — including lists nobody had got round
to switching on.
