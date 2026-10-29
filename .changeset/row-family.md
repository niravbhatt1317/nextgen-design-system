---
'@mtdt/nextgen-design-system': minor
---

**The console's row family joins the library** (Pranjal, 2026-10-28: "push everything in storybook now. Dont leave
anything"). Every list that is not a table, on one geometry - ported value for value from the console's
`src/ui/RowList.jsx` and its CSS layer, which 32 product files use (Users, Teams, Roles, Service accounts, Access
profiles, Organizations, Agent Fleet's Health, Collector Fleet, Credential profiles).

New, all in **New Components → RowList**:

- **`RowList`** - the frame a list of rows sits in: one 1px neutral-20 edge with 8 corners (`bordered={false}` drops
  it), one separator under every row but the last, the table's three row heights (`density` default 54 / two-line /
  compact 36).
- **`Row`** - one record: `leading`, the text, `actions` at the right end. With `onClick` it is a real button (keyboard,
  focus ring inside the row, the neutral-10 hover); without, a plain block. `selected` (blue-10), `state` dimmed /
  disabled, `disabled`. A press or a key inside `actions` never reaches the row.
- **`RowTitle`** - a row's name 12/500 over a quiet 11 line, badges beside the name, `mono` for ids; a cut name shows
  in full on hover.
- **`SelectableRow`** - a pick list's row: the whole row is the label of a library Checkbox or Radio, `control="end"`
  puts the box at the right end (the Add access list), `right` holds a badge or a note.
- **`LogRow`** - a log line: a glyph, the message with who or why under it, the time at the right.
- **`KeyValueList` / `KeyValueItem`** - a compact key · value summary on the table's type: one label width per list
  (`labelWidth`, default 150), top-aligned, `separated` lines between rows. The console calls the row `KeyValueRow`; it
  is `KeyValueItem` here so it cannot be mistaken for `KeyValuesRow`, the KeyValuesBuilder's row data type.
- **`Timeline` / `TimelineItem`** - an audit trail: a 7 dot per event on a 1px rail that ends at the last; the dot's
  `tone` is neutral, success, warning or danger (the console's ok / warn / danger).

**The fact row is `SheetField`, extended rather than built again.** New, opt-in props: `info` (an InfoTip after the
label, named "About <label>", or `infoLabel`), `ratio="3:7"` (the agent About's narrow label beside a wide value),
`align="top"`. New export **`SheetFields`**: the stack the rows sit in, 18 apart (rulebook S-98).

**Changed defaults, named - `SheetField` now draws as the console's fact row:**

- **No 32px floor on the row's height.** A text row is as tall as its words (19.5), so a record reads at the console's
  pitch; a row holding a 32 field is still 32.
- **13 / 1.5 type** for the label and the value (was 13 / 20 - half a pixel).
- **The value reads in `neutral-150`** (the console's reading ink, `#111C2C` / dark `#CAD3E2`), where it was
  `foreground` (`#070F1D` / dark `#E3E8F2`).
- **The value is a line of items 6 apart that wraps** (text, a quiet word, badges, pills, a control) instead of a
  block, so "7.4.0 Latest" or two badges sit side by side.

Nothing in the console uses `SheetField` yet, so no product screen moves.

**Fact rows follow the Users profile** (Pranjal, 2026-10-28): no gap between the label and the value (`mdt-gap-0`), as `users/ProfileDrawer.jsx` draws them; the fleets' About rows follow the same rule.
