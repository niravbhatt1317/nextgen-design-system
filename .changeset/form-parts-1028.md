---
'@mtdt/nextgen-design-system': minor
---

Four parts the console built by hand move into the library (Pranjal, 2026-10-28: "push everything in storybook now.
Dont leave anything"), each read from its console source and not redesigned.

- **`RequiredMark`** (new) - the red asterisk after the label of a field that must be filled in: 3 off the word in the
  danger red, the star hidden from a screen reader and the word "required" said instead (console `ui/RequiredMark.jsx`,
  2026-10-22). `announce={false}` keeps the star and drops the word, for a field whose control already says it is
  required.
- **`CopyTip`** (new, in the CopyField family) - wraps any copy control: "Copy" in the library tooltip under the
  pointer, "Copied" for 1.4 s after a press, never a toast (console `ui/CopyTip.jsx`). `hoverTip={false}` for a button
  that already reads "Copy"; `text` may be a function read at the press; `onCopy` after every copy. `CopyField`'s own
  button now goes through it, so the library has one copy mechanism.
- **`OverflowTip`** (new) - mounted once near the root: anything cut short with "…" or a line clamp shows its whole
  text in the library tooltip on hover; text that fits gets nothing; it stands aside inside a tooltip, on a trigger
  that owns one, and inside `data-no-overflow-tip` (console `ui/OverflowTip.jsx`, 2026-10-15).
- **`Slider`** (new) - one number between two limits: the name and its hint (or an ⓘ), a sunken panel with the value
  riding on the handle, a flat 8px track and a ruler, the limits named under it. `saved` shows where the saved value
  sits (a yellow mark and a chip that sets it back) and turns the tag the solid ink once moved; `typeable` makes the
  tag the field; `mark`, `aside`, `folded`, `endsOnRuler`, `hideEnds`, `divided`, `disabled` (console
  `organizations/settingsKit.jsx` PolicySlider - Security policy, Create organization, both fleets' Policies and
  Changes). The console's `ui/RangeSlider.jsx` is not what was ported: no page renders it.

**Changed defaults, named:**

- **Select, Combobox (both modes) and FormLabel draw their asterisk 3 off the word, not 4** - every field now renders
  the one `RequiredMark`, matching the console and Input / Textarea, which were already at 3.
- **The asterisk is hidden from a screen reader in every field.** Input, Textarea, Select (single) and
  Combobox `search="field"` already tell a screen reader through `required` / `aria-required`, so the star is
  silent there; a Combobox list trigger, a multi Select and FormLabel say "required" after the label instead. A
  FormLabel's mark was a `<span aria-label="required">`, which most screen readers ignore on a span.
- **A field's accessible name no longer ends in "\*"** - Combobox `search="field"` was named "Which tag\*"; it is now
  "Which tag", with `aria-required` saying the rest.
- **`FormDescription` is 12, not 14** - the line under a field, in the muted ink as before, now the size the console
  draws it (the form ladder's "line 12") and the size of the library's own helper line under Input, Select and
  Textarea. Its `color` choices are unchanged.
