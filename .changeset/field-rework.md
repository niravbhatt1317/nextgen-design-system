---
'@mtdt/nextgen-design-system': major
---

**The field, rebuilt against the artifact** (Pranjal, 2026-09-17 and 2026-09-22). `Input`, `Textarea` and `Select` change shape, and two of the changes are breaking.

**`size` now defaults to `sm` (32px), not `md` (36px).** Every `<Input>`, `<Textarea>` and `<Select>` that does not name a size gets shorter, and its text goes from `text-sm` to 13px. Name `size="md"` to keep the old height.

Also: corners go `rounded-md` → `rounded-lg`; the border is `neutral-30`; placeholders use the new `faint` ink; a hover border and a focus halo arrive; a disabled field becomes a neutral ground rather than 50% opacity; error messages gain a 12px `alert-circle`; and a required field gets its asterisk.

**New `locked` prop** on all three — a held field: disabled, with a lock inside where the adornment would sit, and the value truncated rather than wrapped. `Select` also gains `overflowLabel` for folded multi-select pills.

Two new fields join the family: **`NumberInput`** (its own stepper, the native spinner hidden) and **`DateInput`** (the field's box as a button, opening `DatePicker` below). Both are on the new **Foundation → Field** page alongside the rest.
