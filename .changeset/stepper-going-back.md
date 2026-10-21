---
'@mtdt/nextgen-design-system': minor
---

**Every `Stepper` changes how it looks and reacts - in all four layouts, and in `DialogSteps`, which draws it.** These
are defaults, so nothing opts out. Approved by Pranjal on the Stepper lineup (2026-10-19), built 2026-10-21.

**Going back keeps your progress.** `reached` - the furthest step got to - now works in `stacked`, `inline` and
`underline` too (until now only `vertical` read it, and the others ignored it). Go back from step 4 to step 2 and
nothing is undone: step 3 keeps its tick, the line or bar stays filled up to step 4, step 4 shows as _where you left
off_ (outlined in primary, its name in full ink), and step 2 keeps its tick inside a "you are here" ring. Leave
`reached` out and it is `current`, which draws what a strip always drew.

**Changed defaults, named:**

- **Hover marks only the disc and the name.** A soft halo round the disc and a dashed underline under the name; the
  grey wash behind the whole step is gone. Keyboard focus now rings the disc, not the whole step.
- **Nothing moves when steps become clickable.** A clickable step is now exactly the same box as a plain one - the
  button lost its padding. Passing `onStepSelect` used to make the strip taller (underline 34 → 38px, inline
  24 → 32px, stacked 4px more); it no longer does. A page that leaned on that extra height will sit 4-8px tighter.
- **A finished step reads as finished.** Its name is now in full ink at regular weight (it was in the same quiet ink
  as the steps ahead). The current step stays the heaviest; steps ahead, skipped and disabled stay quiet. A
  description you have been through is in the secondary reading ink (`neutral-90`), one ahead in the quiet ink.
- **Clickable reaches further.** With `onStepSelect`, every step up to `reached` is clickable except the one you are
  on - not only the finished ones. Without `reached` that is still exactly the finished steps. A step set to
  `skipped` or `disabled` is never clickable; on `vertical` a skipped step used to be.
- **`vertical`:** the furthest step is now outlined as where you left off (it was a filled tick, and its `data-state`
  was `complete` - it is now `reached`). The rail fills down to that step and no further. Locked steps move from the
  faint ink to the quiet ink, the same as every other layout.
- **`inline`:** 12px either side of each chevron (it was 4px plus the button's padding before it, 8px after), 8px
  between wrapped rows (was 4px), and every label keeps the room its bold version needs, so the step you are on turning
  bold no longer pushes the steps after it along.
- **Screen readers** now hear ", done" after a finished step, ", done, you are here" on one you went back to,
  ", where you left off", ", skipped" and ", disabled".

No new public names, no new tokens. Every existing prop still works.
