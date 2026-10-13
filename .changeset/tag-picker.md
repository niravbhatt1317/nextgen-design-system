---
'@mtdt/nextgen-design-system': minor
---

InlineTags: the tag picker, and a `popover` variant for table cells.

**Selected / Suggested, and ticks are a draft.** The picker lists the record's tags under Selected and
everything else under Suggested - `suggestions` first, then by how many records use each (`counts`).
Ticking slides a tag between the groups; typing narrows both and offers Create "…" for a word nothing
matches. The footer counts the draft ("1 to add · 1 to remove") with Cancel and Apply.

**`onChange` now fires on Apply**, not on every tick - and still at once when a pill's ✕ is pressed with
the picker closed. Nothing is removed from the API, so a caller that saved on every change still works;
it is simply called once per Apply instead of once per tag.

**New props:** `variant` (`inline` | `popover`), `counts`, `trigger`, `emptyLabel`, `label`.
`suggestions` and `options` keep their names and meanings; suggestions now head the Suggested list
rather than appearing as dashed chips.

**The search field is a `combobox`.** It drives a listbox that lives in a popover, so it carries
`aria-controls` and `aria-activedescendant` - without those the arrow keys move a highlight that only a
sighted person can follow. A test querying it by the `textbox` role should ask for `combobox` instead;
it is the same element with the role the pattern requires.
