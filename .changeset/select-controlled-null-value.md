---
'@mtdt/nextgen-design-system': patch
---

**`Select` honours a controlled value cleared back to nothing.** `SelectPrimitive.Root` took its value through a
`&&` spread, which dropped the prop for `null` and `""` exactly as it did for `undefined`. A field that is being
controlled and is cleared to `null` therefore left Radix **uncontrolled**, holding its last pick: the trigger read
the placeholder correctly, but picking that same option again matched Radix's own state and fired nothing. A form
that clears its picker after each entry could not take the same option twice - `TargetBuilder` met this as "you
cannot add two targets of the same kind without choosing another kind first".

The value is now always handed to Radix, with "nothing picked" as the empty string, so this wrapper drives it in
both modes - which `currentValue` already decided. No API change, no visual change; two regression tests cover the
re-pick and the placeholder.
