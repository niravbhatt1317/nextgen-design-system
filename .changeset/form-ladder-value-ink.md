---
'@mtdt/nextgen-design-system': minor
---

Input, Select and Textarea: the typed value is reading text again.

The form ladder (Pranjal, 2026-09-17; the value's ink 2026-09-27): what a person
typed wears the **reading ink at 14/500** — `neutral-130`, the same as a picked
Select value — and the placeholder stays **faint at 400**. The small size's text
goes from 13 to 14; the 32px box is unchanged.

The console reported this as _"a filled value looks like an empty placeholder"_,
on every form. It was: value and placeholder sat one weight and one ink apart in
the same size, so the only thing telling them apart was the words.

Measured in both themes, in a browser:

```
light   value 14px w500 #1D2B3E    placeholder 14px w400 #8FA0BD
dark    value 14px w500 #CAD3E2    placeholder 14px w400 #6A7FA0
```

`DateInput` borrows the Input's box, so it moves with it.

**`size="md"` was never the answer** and is not what changed here: the console's
fields were always the 32px box, and all three of the differences were in the
text — size, weight and ink. `md` would have made every field 36px.
