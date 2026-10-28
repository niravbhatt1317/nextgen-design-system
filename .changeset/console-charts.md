---
'@mtdt/nextgen-design-system': minor
---

The console's hand-drawn Health charts move into the library (Pranjal, 2026-10-28: "push everything in storybook
now. Dont leave anything"), each ported from its console source in Agent Fleet and Collector Fleet Health, none
redesigned.

**New: a chart palette - ten colour tokens, light and dark.** `--mdt-chart-good`, `--mdt-chart-warn`,
`--mdt-chart-crit` (a mark's status), `--mdt-chart-info` (a neutral line), `--mdt-chart-bar` (a count bar) and the
`--mdt-chart-s1` to `--mdt-chart-s5` ramp (lighter is better). They are the Health mock's palette that Pranjal asked
for on 2026-10-15 ("why are you not using the colors which were given in artifact"), checked for colour-blind readers
in both themes; the console has carried them in its own token file since. The dark values are in the colour map
(`scripts/theme-dark.cjs`) and regenerated. The palette grows by ten names: no existing ramp step carries these
colours (the nearest sit 12 to 54 apart).

**`KpiGauge` gains two shapes of status** - both opt-in:

- `shape="zones"` with `zones`, `min` and `max`: the console Health's headline gauge. The half ring split into its
  zones, each faint in its status colour, a dot in the full colour where the value sits, the value and its zone's
  word in the middle ("On target", "Below target"), the ends labelled. Drawn on 120 × 76, shown at the card's 104 × 62.
- `tone` and `target` on the half gauge: the fill in a status colour from the chart palette, and a tick at the
  "good at" line. A toned gauge keeps one decimal (96.4%) and shows its dot even at 0%.
- New exported types `KpiGaugeTone` and `KpiGaugeZone`; `KpiGaugeShape` adds `'zones'`.

**New: `Chart` - seven charts and their one-line hover**, every mark a button or a focusable element:

- `ChartTip`: the hover on any chart mark. One line, the mark and its value ("6–24h silent · 10 agents"), never a list
  or a breakdown - it takes one string, so a second line cannot creep back (Pranjal, 2026-10-28).
- `ColumnChart`: one column per group with its count above; `fill`, per-column tones and a dashed `marker`.
- `BarList`: rows scaled to the biggest with the count and its share; `current`, tones and an optional `track`.
- `StatusBlocks`: one block per period coloured by threshold, with its legend, axis and the lowest period named.
- `TrendLine`: a line with its wash, a three-step scale and a hover on every point.
- `Histogram`: bars a tenth of a budget wide, the budget's dashed line, red past it; `onPick` hands back a bar's
  readings.
- `HeatTable`: cells shaded against the whole's rate in five steps, with the ramp named under it.
- `StackedBars`: Module health - one stacked bar per row on a card, a legend that hides and shows a colour, the scale
  following what is shown, and an optional column of figures beside the bars.

**No default changes.** `KpiGauge` without the new props draws exactly as before; its fill's end point is now written
to two decimals instead of one (the same drawing to a hundredth of a pixel).
