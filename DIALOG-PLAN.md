# Dialog — the plan

Everything the modal work covers, in the order it gets done. Tick as it lands.

Analysed from twelve references across Wise, Jasper, Manus, Graphite, Better Stack, Cal.com,
Notion, Attio, LangGraph, Monarch, Uxcel and Conductor. The boundary against `Sheet` is settled
and written into both components — see their JSDoc.

---

## 0 · The opening is broken — fix this first

- [x] **The dialog animates in from the wrong place and snaps to centre.** ✅

      Measured before and after, in a browser: the dialog sat **256px right and 119px down**
      of centre for the first ~180ms and then snapped. 256 is half of `max-w-lg`, 119 is half
      its height — the box hanging by its own top-left corner at the viewport centre, which is
      exactly what a clobbered `translate(-50%, -50%)` does. Worst drift is now **0px**.

**Cause, confirmed in the source rather than guessed.** `DialogContent` centres itself with a
transform:

```
mdt-fixed mdt-left-[50%] mdt-top-[50%]
mdt-translate-x-[-50%] mdt-translate-y-[-50%]      ← the centring
data-[state=open]:mdt-animate-zoom-in               ← the animation
```

and the keyframe is:

```ts
'zoom-in': { from: { opacity: '0', transform: 'scale(0.95)' } }
```

A keyframe's `transform` **replaces** the element's transform for the whole animation. So for those
200ms the `translate(-50%, -50%)` does not exist: the box hangs with its own top-left corner at the
centre of the screen — down and to the right of where it belongs — then snaps back the instant the
animation ends. Same on close, via `zoom-out`.

**Scope.** Only components that centre with a transform are affected: `Dialog` and `Command`.
`DropdownMenu` and `HoverCard` use the same keyframes but are positioned by Radix, so they have
nothing to clobber.

**Fix.** Stop centring with a transform. A wrapper that is `fixed inset-0` and grid-centres its
child leaves `transform` free for the animation, and pays for itself twice over: it gives padding
against the viewport edge on small screens, and a place for a tall dialog to scroll.

- [x] Fix `Command` the same way. ✅ It centres with a transform but has no animation, so it
      never jolted — it was one `animate-*` class away from it.
- [ ] `CommandDialog` is not a dialog: no portal, no focus trap, no escape, no overlay dismiss.
      Out of scope here, logged in PLAN.md.
- [x] A test that would have caught it. ✅ Three of them: nothing may carry both a `translate-*`
      and an `animate-*` class, the centring belongs to a parent, and the dialog keeps `p-4`
      off the edge of a small screen.

---

## 1 · Behaviour — the things nobody designs

- [ ] **Unsaved-changes guard.** Closing a half-filled form loses it. Escape, the X, and the
      overlay all need to ask first. Every Panel needs this.
- [ ] **Pending primary action.** Submit takes two seconds: the button shows busy, and the dialog
      refuses to close while it is in flight.
- [ ] **Blocking.** No X, no Escape, no overlay dismiss. Session expired, forced upgrade.
- [ ] **Stacked.** A confirm over a form. There is already a `NestedDialogs` story, so it has been
      tried — decide whether it is supported or a trap, and make the answer true in the code.
- [ ] **Small screens.** Panel and Workspace become full-screen below a breakpoint, or they are
      unusable. Half of this landed with §0 — the dialog is now inset by 16px and scrolls when it
      is taller than the viewport, instead of growing past it.
- [ ] **⌘↵ to submit**, with the hint rendered in the button, as Conductor does.

---

## 2 · The three patterns

The thing that varies is not size or content — it is **how much structure the dialog owns**.

### Pattern 1 — Prompt · 1 of 12 references

One decision. ~440px, never scrolls, no tabs. Symmetric footer, affirmative on the right.

- [ ] The base: title, prose, two buttons
- [ ] **Consequence callout** — a list of what is about to be destroyed
- [ ] **Typed confirmation** — "type DELETE to confirm", primary stays disabled until it matches

_Reference: Wise, Delete connection._

### Pattern 2 — Panel · 7 of 12 references

A task. Header, a body that scrolls between a sticky header and a sticky footer, footer. The
workhorse — most of the effort goes here.

- [ ] The base: sticky header, scrolling body, sticky footer
- [ ] **Media above the header** — an image or product shot
- [ ] **Tabs under the header**
- [ ] **A back control in the header**
- [ ] **A step counter** — "2 of 5"

_References: Add Field, Create Series, Set up Conductor, Welcome!, Build skills, Manus upgrade,
Graphite plans._

### Pattern 3 — Workspace · 4 of 12 references

The dialog becomes a surface. Near-full-screen, owns its own navigation, usually **no footer** —
choosing is the action.

- [ ] The base: full size, no footer, close floating over content
- [ ] **An aside** — a left pane
- [ ] **A filter bar** above a grid
- [ ] Confirm `LeftNav` composes inside it — Notion's Preferences is exactly that, and if our parts
      do not fit, that is a finding about the parts

_References: Jasper Library, Notion Preferences, Cal.com embed, LangGraph config._

---

## 3 · Anatomy decisions

- [ ] **Size scale — five steps.** `sm` 400 · `md` 520 · `lg` 720 · `xl` 960 · `full`. The
      references cluster at roughly 440 / 600 / 720 / 900 / near-full, and five is the fewest that
      covers them without anyone reaching for `className`. Today there is exactly one width,
      `max-w-lg`, and the stories escape it with `sm:max-w-[425px]` and `sm:max-w-[800px]` —
      arbitrary values, which is the tell that the scale is missing.

- [ ] **Footer, three rhythms.** `DialogFooter` can only right-align today, which cannot express
      the one the modern references use most:
  - [ ] symmetric — Cancel / Confirm, right-aligned
  - [ ] **asymmetric** — a quiet link left, the primary right. "Having a problem?", "Get support",
        "Back … Skip / Next"
  - [ ] none — Workspace

- [ ] **Density, two steps.** `comfortable` (24px, the default) and `compact` (16px). Two, not
      three: a middle step never gets chosen. Worth confirming against the product screenshots
      before building.

- [ ] **Where the close button lives.** In the header row when there is a header to sit in;
      floating over the content when there is not. Both appear in the references and the choice is
      not arbitrary.

---

## 4 · Compositions to confirm against the product screenshots

Named in review as things we may want. Each is a _composition_ of the above rather than a new
component — worth checking that stays true once the product designs arrive.

- [ ] **Wizard / stepper** — Panel + step counter + back control + Back/Skip/Next footer
- [ ] **Tabbed** — Panel + tabs
- [ ] **Split: information one side, image the other** — is this a Panel with a media slot, or does
      it need a genuine two-column body?
- [ ] **Left nav, right content** — Workspace + aside. The same shape as Notion Preferences.

---

## Not yet decided

- Whether `Command`'s centring is fixed here or logged for later.
- Whether stacked dialogs are supported or explicitly refused.
- Whether density earns its place at all, or whether one padding is enough.
