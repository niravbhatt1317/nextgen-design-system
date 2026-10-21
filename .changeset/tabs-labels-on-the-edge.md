---
'@mtdt/nextgen-design-system': minor
---

**Every underline `Tabs` strip changes how it looks - option B.** This is a default, so nothing opts out: every
`TabsList` of `type="underline"` (the default type), with or without its hairline, draws it. Approved by Pranjal for
Agent Fleet on 2026-10-14 ("b is the only valid solution ... keep it for agent fleet first I will get it approved than
we will move it to library"), sent to the library on 2026-10-21.

**Changed defaults, named:**

- **Every label sits on the content edge.** The first tab now steps 12px into the margin (an inline-start margin of
  -12px, its own padding), so the first label starts on the same edge as the text under the strip - it used to sit
  12px in. Only the first tab's click area goes into the margin; the strip, its hairline and the tabs after the first
  stay where they were, so the strip is no wider and the hairline does not move. A closable first tab steps out
  together with its close control. A strip whose container has less than 12px of space before it will have the first
  tab's click area clipped or touching that edge - every drawer inset (16, 20, 24) and page band (24) has room.
- **The active line is the label's width, not the tab's.** The 2px line is now drawn 12px in from each side of the tab,
  under the label (and its icon and count), instead of across the whole tab, with round ends. On a closable tab it ends
  36px in, before the close cross. It still sits on the strip's hairline, in the primary colour, and still fades in
  over 120ms.
- **How the line is drawn changed.** It is the tab's `::after` now, not its bottom border. The tab keeps a clear 2px
  bottom border so its height is exactly what it was; a page that coloured the active tab's `border-bottom-color` to
  restyle the line will no longer see that colour - restyle the `::after` instead.

Unchanged: the label sizes and colours, the 24 between labels, the 9 above and 11 below, the bold width each label
already holds (choosing a tab still moves nothing), the `filled` type, and every prop. No new public names, no new
tokens.

The console can now delete its stopgap: `src/features/fleet-new/afm/fleet-tabs.css` and the `afm-tabs-b` /
`afm-tabs-b-scope` classes in Agent Fleet and Collector Fleet.
