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

## 1 · Behaviour — the things nobody designs ✅

- [x] **Unsaved-changes guard.** ✅ `onRequestClose(reason)` — return `false` and it stays open.
      All three exits go through one gate, because answering the question in three places is how
      they drift and the overlay is the one that gets forgotten.
- [x] **Pending primary action.** ✅ `busy` refuses every exit and disables the close button
      rather than hiding it — the way out still exists, it is just not available yet. `Button`
      already had `loading`, so nothing new was drawn.
- [x] **Blocking.** ✅ `blocking` removes the close button entirely rather than disabling it — an
      X that refuses to work reads as broken rather than as deliberate.
- [x] **Stacked — supported.** ✅ A guard that refuses to close has to be able to ask, and the
      asking is a dialog. Both stay in the DOM; only the top one is reachable by role, so nobody
      is offered a form they cannot get to past the question in front of it.
- [x] **Small screens.** ✅ Full-bleed below `sm` — measured at 375px: width 375, flush left,
      square corners. A card with 16px of inset above it. Corners and a border on something that
      reaches every edge are decoration on a seam that does not exist.
- [x] **⌘↵ to submit.** ✅ `useSubmitShortcut`, accepting Command or Control so one shortcut
      works everywhere. Not plain Enter: Enter belongs to the field you are in, and requiring the
      modifier is what lets a form with a textarea have a keyboard submit at all.

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

- [x] **Size scale — five steps.** ✅ Measured: `sm` 448 · `md` 512 · `lg` 672 · `xl` 896 ·
      `full` fills. `full` uses `self-stretch` to beat the centring on the flex parent rather
      than computing a viewport height. The
      references cluster at roughly 440 / 600 / 720 / 900 / near-full, and five is the fewest that
      covers them without anyone reaching for `className`. Today there is exactly one width,
      `max-w-lg`, and the stories escape it with `sm:max-w-[425px]` and `sm:max-w-[800px]` —
      arbitrary values, which is the tell that the scale is missing.

- [x] **Footer, three rhythms.** ✅ And the rule above it, which the product has on every dialog
      and this had on none. It breaks out through the padding so it reaches both edges — inset by
      24px it reads as an underline on the buttons rather than the seam between reading and
      deciding. The header deliberately keeps none: that asymmetry is the house style.
  - [x] symmetric — Cancel / Confirm, right-aligned ✅
  - [x] **asymmetric** ✅ `align="between"` — a quiet link or a step back on the left, the way
        forward on the right
  - [x] none — `divider={false}` ✅

- [x] **Every region owns its own padding.** ✅ `DialogContent` has none horizontally. `DialogHeader`,
      `DialogSteps`, the new `DialogBody` and `DialogFooter` each pad their own contents by a single
      shared gutter, read from the density rather than written four times.

      This is what removed the footer's `-mx-4 px-4` breakout — a number that had to be kept in step
      with the container's padding by hand, and was wrong by 7px a side the first time anybody
      measured it. The rule reaches both edges now because the footer *is* full width, not because
      it tears back out through something.

      The one thing still on the container is the **bottom**, because no region knows whether it is
      the last thing in the box: a dialog with a footer wants 12 under its buttons and one without
      wants 12 under its body, and putting it on the container is what makes those the same number.

- [x] **Density, three steps — one number each.** ✅ `compact` 12 · `comfortable` 16 · `spacious` 24,
      and everything else in the dialog derived from it rather than listed beside it.

      | derived from the step | compact | comfortable | spacious |
      | --- | --- | --- | --- |
      | gutter, all four regions | 12 | 16 | 24 |
      | above the header | 12 | 16 | 24 |
      | between blocks | 12 | 16 | 24 |
      | rule → buttons (step − 4) | 8 | 12 | 20 |
      | buttons → floor (step − 4) | 8 | 12 | 20 |
      | close glyph to the edge | 12 | 16 | 24 |

      **`compact` was wrong before this** and the arithmetic is what caught it: it kept
      `comfortable`'s 12 above the buttons while using 8 below them, so the footer was uneven about
      its own contents at one density and even at the other. Nothing derived, so nothing noticed.

      The scale is not evenly spaced. 12 → 16 is a control panel against a form; 16 → 24 is a form
      against a page that happens to be in a box. A step in between would be a choice nobody could
      make from a screenshot.

      **Two things deliberately do not scale.** The gap between a title and its description (8, or
      6 when the title carries a tag) and the 4px `DialogSteps` adds beneath itself are
      relationships between two pieces of text, not between text and a box.

      The close button follows the gutter **by construction**: it is anchored at the step and
      pulled back by a constant 6 across and 4 up. Measured at all three, its glyph lands exactly
      on the gutter — 12, 16, 24 — and its centre exactly on the title's.

      The buttons stay at `md`, 36px, at every density. Tried at 32 and put back: the footer is the
      one row that has to stay pressable.

      A button carrying a `DialogSubmitHint` gets 14 before the chip and 10 after it, rather than
      the 16 its padding would give. A chip is not reading and does not need the room a word would.

- [x] **The close button lines up with the title.** ✅ It is a 28px hit area around a 16px glyph,
      positioned so the glyph's own edge sits on the gutter and the box centres on the title's line.
      Measured: it was 4px low before, and its centre is now exactly on the title's. Muted rather
      than near-black, because the way out of a dialog is not the thing to look at first.

- [ ] **Whether it ever moves into the header row.** Floating over the content is right when there
      is no header to sit in. Both appear in the references and the choice is not arbitrary.

---

## 4 · Compositions to confirm against the product screenshots

Named in review as things we may want. Each is a _composition_ of the above rather than a new
component — worth checking that stays true once the product designs arrive.

- [x] **Wizard / stepper** ✅ `DialogSteps` — the bar under each step is the progress, not a
      connector between dots. A finished step shows a tick rather than its number, and only
      finished steps are clickable.
- [ ] **Tabbed** — Panel + tabs
- [ ] **Split: information one side, image the other** — is this a Panel with a media slot, or does
      it need a genuine two-column body?
- [ ] **Left nav, right content** — Workspace + aside. The same shape as Notion Preferences.

---

## The house style, read from twelve product screens

Settled with the design owner on 2 August 2026.

- **The header has no rule; the footer has one.** That asymmetry is deliberate — a line above the
  buttons says the reading is over.
- **Every primary carries a ⏎ chip.** `DialogSubmitHint`. A shortcut nobody knows about is worth
  nothing, and the button is the only thing anybody is looking at when deciding to press it.
- **Destructive never gets it.** Confirmed as deliberate: nobody should be able to delete something
  by muscle memory, and a keyboard path to an irreversible act is exactly that. The rule is written
  into `DialogSubmitHint`'s own documentation so it travels with the thing it governs.
- **The ink is the system's** — `foreground` and `primary`, confirmed rather than matched by eye.
- **Red is reserved entirely for destructive.**

### Still missing, and now concrete

- [ ] **A `Callout` / inset panel.** Five of the twelve screens have one — the grouped "Access
      limits" block, the credential summary, the rule builder, the pair of auth-method cards. There
      is no `Callout`, `Alert` or `Banner` in the library at all. `COMPONENT-GAP.md` already lists
      Banner as 4-of-4; this makes it concrete.
- [ ] **A duration chip row.** `ToggleGroup` exists but its variants are a muted track, where the
      product uses white chips with a dark selected state and a tick. Probably one more variant
      rather than a new component.
- [ ] **The two-line label** — a small muted label above a darker instruction. Appears four times.
      Belongs to the form components rather than to `Dialog`.
- [ ] **Whole-dialog states.** _Generating credential…_ has no header, no footer and no close —
      the dialog becomes the state. A recipe rather than a prop, probably.

**Reused, confirmed by searching:** `Radio` already has a `card` variant for the auth-method cards,
and `Button` already has `loading`.

## Not yet decided

- Whether `Command`'s centring is fixed here or logged for later.
- Whether stacked dialogs are supported or explicitly refused.
- Whether density earns its place at all, or whether one padding is enough.
