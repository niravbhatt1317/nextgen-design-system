---
'@mtdt/nextgen-design-system': minor
---

Icon: the stroke ladder - the default line weight follows the size.

The artwork is a 24-unit viewBox, so the line a person sees is `strokeWidth x size / 24`. One
number for every size therefore does not give one line: a flat 1.5 draws 2px at `xl` and 0.75px
at `xs`, and measured at 1x that 0.75px line never exceeds 38% ink - an icon asked for in
`neutral-110` arrives at about a third of that contrast.

So the default steps once: **1.75 at 16px and under, 1.5 above.** Written against resolved pixels,
so a raw `size={14}` follows the same rule as `size="sm"`. Passing `strokeWidth` still overrides it.

`defaultStrokeFor(size)` is exported, so a surface drawing its own SVG can match the library
rather than guess.
