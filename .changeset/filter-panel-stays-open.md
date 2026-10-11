---
'@mtdt/nextgen-design-system': minor
---

AdvancedFilter: a press outside no longer throws your filters away, and there is
a way out you can see.

**The ✕** (Pranjal, 2026-09-26: _"a cross ghost icon cta"_) sits in the panel's
header, in the same 28 box as a row's ✕ and the three-dot, so the header's right
edge lines up with the rows beneath it.

**A press outside is refused** (2026-09-26: _"if clicked outside it should not
get closed. in fact it should highlight the popover for 1 second"_). The panel is
a place of work — half-built rows are easy to lose and a stray press should not
discard them. The press is swallowed on capture, so nothing behind it is pressed
either, and the panel wears a light for a second instead.

**The press rule** (2026-09-27): the first press starts the second; a press
during that second is swallowed all the same but does not restart it; once the
light drops, the next press lights it again. Without that, holding the pointer
down outside keeps the panel lit for as long as you like and the light stops
meaning anything.

The ways out are all deliberate: the ✕, Apply, Clear all, the door that opened
it, and Escape.

**New token `--mdt-nudge`** — the light's colour, the interactive blue in light
and the primary in dark, used at 12% over the panel's own shadow so the edge
itself never moves. A blue glow on the dark ground reads as a border rather than
a light, which is why the two themes differ.
