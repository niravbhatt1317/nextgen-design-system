---
'@mtdt/nextgen-design-system': major
---

**`Tabs` and `Avatar` on Pranjal's rulings** (2026-09-17). Both are breaking.

**`Tabs` has two looks, not four.** `TabsVariant = 'default' | 'underline' | 'card' | 'pills'` becomes `TabsType = 'underline' | 'filled'`. **`'default'`, `'card'` and `'pills'` no longer exist** — code passing them stops typechecking. `variant` survives as a deprecated alias of `type`. New: `count` and `countMax` on a trigger, and `ignoreWhenActive`, so clicking the tab you are already on no longer fires `onValueChange`.

**`Avatar` shows one letter, at every size.** `MAX_INITIALS` goes 2 → 1, so an avatar that read `SJ` now reads `S`. `slate` also leaves the person-tone rotation, which means **every name-derived avatar colour changes**. New `icon` prop for an avatar that carries a glyph rather than a photo or initials.

Smaller, with them: `Switch` gains a hover on its track; `Radio`'s segmented strip stops clipping and paints the chosen segment's edge; `Dialog` and `Sheet` rebuild their close buttons on a 28px box with a focus-visible halo.
