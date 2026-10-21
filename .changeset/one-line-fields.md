---
'@mtdt/nextgen-design-system': minor
---

`Select` keeps every field and every option on one line (Pranjal, 2026-10-16/17: "we really need to
set some standard which you cannot break"). The console drew this with two stylesheet stopgaps; the
library now draws it itself, so the console can delete them.

**This changes defaults.** No prop changes, but every `Select` looks different without any code
change:

- **The closed single field shows the chosen label only.** An option's `description` used to be
  mirrored into the closed field under the value, centred; it now shows only in the open list. The
  value reads from the left on one line and ends in "…" when long. (The old `mdt-truncate` on the
  value never applied: Radix drops a `className` given to `Select.Value`, so the rule now sits on a
  span around it.)
- **A single option's accessible name is its label only.** The description is announced as the
  option's description (`aria-describedby`) instead of being part of its name, and type-to-find
  matches the label only.
- **A multi-pick field never grows past its height.** Its picks no longer wrap onto more lines: they
  stay on one line, a pill shrinks to "…", and the "+N" never shrinks. A pill now takes whatever room
  the "+N" leaves - it used to stop 64px short of the row's end. "N selected" and the placeholder
  end in "…" too.
- **The open list is at least the field's width and grows to fit its longest option, up to 320px**
  (or the window less 16px a side). The multi and searchable lists were held to the field's width,
  so long names wrapped; the single list had no ceiling. A field wider than 320 still gets a list as
  wide as itself.
- **Every option reads from the left on one line**, ending in "…". Multi options are buttons and
  used to centre their text.
- **Option text:** the name is 14/500 in the reading ink (`neutral-130`, was the near-black
  foreground at 400); the description is 12 in the new `--mdt-option-subtext` ink with 2px above it
  (was the muted grey, no gap); every option takes 8px above and below, one line or two (was 6).

**New token:** `--mdt-option-subtext` - `neutral-80` (#5A6D8C, 5.25:1 on white) in light, #7186A8
(the dark `neutral-60`, 4.9:1 on the dark list) in dark. Read it as
`mdt-text-[hsl(var(--mdt-option-subtext))]`.

**Markup a page may have leaned on:** the multi trigger's pick row no longer carries `mdt-flex-wrap`;
it carries `mdt-select-picks` (a name for the row, no styles), `mdt-flex-nowrap`, `mdt-min-w-0` and
`mdt-overflow-hidden`. A description line no longer carries `mdt-text-muted-foreground`. Selectors
written against either - the console's `field-check.cjs` finds multi fields by `mdt-flex-wrap` - need
updating.

`SelectOld2` (deprecated) is unchanged.
