---
'@mtdt/nextgen-design-system': minor
---

Small console rulings move into the library, so the console can delete its stopgaps. All of them are **changed
defaults** - no opt-out, every consumer gets them.

**Changed defaults, named:**

- **`InfoTip`: only the glyph answers the pointer.** On hover, keyboard focus and while its explainer is open, the ⓘ
  no longer draws the sunken step (`--mdt-secondary`) behind its glyph; the glyph alone darkens, neutral-40 to
  neutral-60, as before. The keyboard focus ring is unchanged. Pranjal, 2026-10-27: "i button had a white bg hover?
  thats should not be there. only icon should have hover" - the ground read as a white box, worst on a tinted card.
- **`InfoTip` shows the help cursor**, the question mark, instead of the pointer (Pranjal, 2026-10-28: every ⓘ
  shows the help cursor; it replaces the pointer ruled at the #162 port).
- **`IconTile tone="slate"` is a step lighter.** The fill goes from `neutral-30` to `neutral-20` and the glyph from
  `neutral-110` to the secondary ink `neutral-90`, in both themes (light `#ECF1F9` under `#516281`; dark the dark
  values of the same two steps, `#1D2A3E` under `#8E9FBC`). `slate` is the default tone, so **every IconTile that
  names no tone changes too**. The slate `Avatar` is not changed, so a slate tile and a slate avatar side by side no
  longer match. Pranjal, 2026-10-23, on the fleets' Approvals trays: "it is very dark ... use a lighter bg tone for it".
- **The filled `Tabs` track is 40 tall and its chip 32** (the regular button's height), 4 in at the sides so 4 sit
  above and below each chip. It was a 32 track with a 25 chip at 3.5 in. Corners (8 / 5), the 10 at a chip's sides
  and the 2 between chips are unchanged; every `TabsList type="filled"` grows by 8px. Pranjal, 2026-10-23, option C:
  "in secondary tabs why does most of the paces it looks cramped" (rulebook K-Tabs-09; K-Tabs-10's 26-in-32 is
  superseded). The underline type does not change.
- **A tab's icon takes the small-icon line.** `TabsTrigger` draws its `icon` at 14, so an `Icon` handed in without a
  size is now told 14 and the stroke ladder gives it 1.75 - before, it drew the 20's 1.5 squeezed to 14, a lighter
  line than every other 14 glyph. The same fix #159 made for `Button` and `ToolbarButton`, through the same shared
  helper; an icon with an explicit size or `strokeWidth` is left as the caller asked. No console tab carries an icon
  today, so no console page changes.
- The table's own ⋯ menus reach 224 in the table request (pranjal/library-2026-10-28-table), not here.

No new public names, no new tokens. `DropdownMenuContent`'s documentation now states the action-menu rules (224 floor
with `mdt-min-w-56`, an icon on every item, the destructive item last and red after a separator), and its stories
follow them.

The console bridges these replace, deletable once the console takes this release:
`THE KIND TILE` bridge in `afm/shell/approvals.css` and `cfm/shell/approvals.css`, the
`BRIDGE (2026-10-23 ...)` filled-tab rule in `src/styles/global.css`, and, for the table's own two menus, the
`EVERY ⋯ ACTION MENU IS AT LEAST 224 WIDE` rule in `src/styles/global.css` (it still covers the console's own `mdt-w-48`
menus until those pass `mdt-min-w-56`).
