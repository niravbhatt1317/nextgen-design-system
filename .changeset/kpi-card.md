---
'@mtdt/nextgen-design-system': minor
---

KpiCard and KpiStrip: the merged console's KPI tile (7 September 2026). One metric on one card (label, rounded number, quiet line, an optional trend chip as a Badge, a chart area pinned right with KpiGauge and KpiBars first), or a group of two to n metrics sharing one card split by inset hairlines. Clickable is a switch per card or segment, off by default, with the console's hover cue. A plain card has a 174px floor and no ceiling; a chart card no floor and 270 natural. KpiStrip is the row: cards grow evenly until the row is full, then it scrolls sideways instead of squeezing, bleeding through the page inset so a cut card is cut at the page edge. Nothing deprecated: the library had no KPI piece; Card and IconTile are untouched.
