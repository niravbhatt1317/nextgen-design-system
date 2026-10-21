---
'@mtdt/nextgen-design-system': minor
---

Four of the console's hand-made bridges move into the library, so the console can delete them. Three are **changed
defaults** - no opt-out, every consumer gets them - and one is a new opt-in size.

**Changed defaults, named:**

- **The dark neutral badge reads in the reading ink.** `--mdt-badge-neutral-ink` in dark goes from `#8e9fbc` (the
  secondary grey, 4.6:1 on the badge's `#2a3546` fill) to `#cad3e2` (`neutral-130` in dark, 8.2:1). Light already
  reads `neutral-130`, so the light hierarchy now holds in dark; before, every grey badge in dark looked switched off.
  Changed in the colour map (`scripts/dark-theme/tokens.cjs`, the badge tier) and regenerated. Pranjal, 2026-10-17:
  "color still looks dull in badge". Light is unchanged.
- **A table's row number reads in the cell's own ink**, like every other column: `neutral-130` (`#1D2B3E`, 14.3:1 on
  white; `#CAD3E2` in dark), where it was the faint grey (`#8FA0BD`, 2.65:1). Both the number that swaps to a checkbox
  (`TableSelectionCell`, so every `DataTable`) and the plain one (`TableNumberCell`). **An inert row's number is no
  longer dimmed to 60% either** - its other columns never were. `TableNumberCellProps.inert` is still accepted and now
  changes nothing. Pranjal, 2026-10-15: "serial number ... should have a dark color atleast" and "all columns should
  have same color text".
- **A `CollapsibleCard`'s header is even top and bottom, open or shut.** It was 20 top / 0 bottom shut (so its words
  sat on the card's lower edge) and 20 / 20 open; it is now 16 / 16 in both states at `padding="normal"`, 14 / 14 at
  `compact`, 0 at `none`, so the title does not move when the card opens. The sides keep the inset (20 / 14 / 0). A
  shut card with a heading and a sentence grows from 67 to 79px; an open one shrinks by 8px. Only `CollapsibleCard`
  changes - a `CardHeader` on a plain `Card` keeps its 20.

**New, opt-in:** `KpiCard size="sm"` - the number at 16/24 and 600 instead of 24 at 500, for a card that sits beside a
section's content (Pranjal, 2026-10-15, on the two-column settings pages: "use smaller text so that it doesnt get that
much attention just enough to show its there"). Only the number changes. A card holding a chart keeps the 24 figure
whatever it is given, on every segment, because the chart is drawn to that size. The card says which it drew in
`data-size="md" | "sm"`. Default `md`, so nothing changes until a page asks.

**New public name:** the type `KpiCardSize` (`'md' | 'sm'`). No new tokens.

The console bridges these replace, deletable once the console takes this release: `DARK NEUTRAL BADGE INK` and the
row-number rule (`.tbl .tbl-num.mdt-text-faint`) in `src/styles/global.css`, `QUIETER FIGURES IN THE TWO COLUMNS` in
`src/features/organizations/settings.css` (the pages pass `size="sm"` instead), and the `.sum-card` header padding in
`src/features/fleet-new/afm/screens/enroll-flow.css`.
