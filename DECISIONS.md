# Decisions

Rulings made in this repository, newest first, each with who made it and when.

**Why this file exists.** The design rulebook is `Functional/next-gen-ui/DESIGN-LANGUAGE.md`
on Azure DevOps, and it remains the book of record for anything a part's numbers rest on. But no
session working in this repository can reach it, so rulings made here were living only in pull
request comments — findable by whoever remembered the pull request number, and by nobody else. A
decision nobody can find gets made again differently.

**What belongs here:** a ruling that settles a question someone could reasonably ask again. Not a
bug fix, not a refactor. If the answer is "because Nirav decided so on this date", it goes here.

**What does not:** anything the code already says. A token's value lives in `TOKENS.md`, a missing
one in `MISSING-TOKENS.md`, a capability in `CAPABILITIES.md`. This file is for the _why_.

---

## 2026-10-28

### The ⓘ answers the pointer with its glyph only

**Pranjal**, 2026-10-27: "i button had a white bg hover? thats should not be there. only icon should have hover.
Update this even in the storybook." `InfoTip` draws nothing behind its glyph on hover, focus or while its explainer is
open; neutral-40 darkens to neutral-60 and the keyboard keeps its focus ring. A ground read as a pale box, worst on a
tinted card. Any new ⓘ copies this and never adds a hover background.

### The slate `IconTile` is a step lighter than the slate `Avatar`

**Pranjal**, 2026-10-23, on the fleets' Approvals trays: "it is very dark ... use a lighter bg tone for it". The tile's
slate is `neutral-20` under `neutral-90` (it was `neutral-30` under `neutral-110`), in both themes. The slate avatar is
not part of the ruling and keeps its colours, so "tones match Avatar" now holds for every tone but slate.

### Filled tabs are a 40 track with a 32 chip (option C)

**Pranjal**, 2026-10-23: "in secondary tabs why does most of the paces it looks cramped", then "Option c". The chip is
the regular button's height, 4 in from the track on every side; corners, side padding and the gap between chips are
unchanged. It supersedes the 2026-09-17 32 / 25 at 3.5 in (rulebook K-Tabs-09; K-Tabs-10 superseded).

### Every ⋯ action menu is at least 224 wide

**Pranjal**, 2026-10-27, on a fleet row menu: "increase the width by a little bit" - 192 left the longest item touching
the edge. A floor (`mdt-min-w-56`), not a width, so a longer item still widens the menu (his 2026-10-09 ruling). With
it, from 2026-10-14: an icon on every item, never a "…" on a label, the destructive item last and red after a divider.
A menu of ticks or choices (a quick filter, Sort) is not an action menu and keeps its own width.

All four are **defaults with no opt-out**, named in their changeset (`small-parts-1028`).

## 2026-10-21

### Every field is one line

**Pranjal**, ruled in the console on 2026-10-16/17 and moved into `Select` on 2026-10-21: "we
really need to set some standard which you cannot break". A closed field shows the chosen label
only - never its description - on one line from the left, ending in "…". A multi-pick never grows
past its height: one pick, then "+N"; the pill shrinks, the "+N" never does. An open list is at
least the field's width and grows to fit its longest option, up to 320; every option reads from the
left on one line. The option's name is 14/500 in the reading ink; its description one step lighter
(`--mdt-option-subtext`: `neutral-80` light, the dark `neutral-60` in dark), 2 below it, never the
faint grey. Showing the full name on hover stays the page's job (the console's `OverflowTip`).

### A picked option looks the same in every list

**Pranjal.** Every dropdown, list and menu marks a pick one way: the picked row on the pale
`blue-10` ground with the tick on the right in the row's own ink; the row under the pointer or the
keyboard on the grey `neutral-10` ground with no tick; a picked row keeps its pale ground under the
pointer. No tick on the left anywhere, and no picked row without the ground.

The ground is one pair of constants in `src/utils/picked-row.ts`: `PICKED_ROW_CLASSES` for a row
whose state is known in code (it goes last in `cn()`, so the merger drops the row's own grey
grounds), `CHECKED_ROW_CLASSES` for a Radix row that stamps `data-state="checked"` (every state is
doubled with the checked selector, so it outranks the grey whatever order the stylesheet prints).

A row that carries a checkbox square instead of a tick (the quick filters) takes the pale ground
too, by the same rule.

### The picked row keeps its tick under the pointer — the X is gone

**Nirav**, closing the question left open above. The multi-select used to swap a picked row's tick
for a 12px X while the pointer was on it, to advertise that a click there removes the pick. It no
longer does: a picked row shows its tick in every state, in every list.

**The reason is the ruling above applied one step further.** That ruling took the faint tick off
unpicked rows because "the grey ground says _here_, the tick says _picked_, and a faint tick on
hover said both at once". The X is the same fault with the roles swapped — it takes the _picked_
mark away precisely when you point at the row, so running the mouse down a list of five picks blanks
each tick in turn. The pale ground already says "picked" and the row is still a toggle, so the X
only ever cost the tick.

It also matches what Pranjal asked for in the first place. His 2026-09-25 words were "why does it
show x icon when hovered on selected one. It should just reselect it again"; keeping the X in the
multi list while removing it from the single list was an inference drawn from that, not part of it.
The console draws no X-on-hover anywhere, so nothing live depended on it.

`deselectable`, the internal flag that existed only to switch the X, is removed with it — fifteen
pass-through lines through `Select.tsx` and its twin. It was never exported and is not in
`scripts/api-baseline.json`, so no published name changes.

### The console's `blue-10` stays overridden, and that is not a drift

**Nirav.** The console paints `--mdt-blue-10` as `214 90% 97%` (#F0F6FE) in its own
`src/styles/global.css:121`; the library holds `213 100% 96%` (#EBF4FF). Since the picked row now
uses that token, the same row is a shade apart in the two repositories. **It stays that way.**

A consumer overriding a token is the theming mechanism working, not a defect to reconcile — which is
worth stating plainly, because it was raised as a mismatch. The measured difference is 5, 2, −1 per
channel and the row's label ink reads 12.89:1 against 13.17:1, so there is nothing to win either
direction.

`blue-10` was named in the submission the **2026-10-14** ruling rejected, but it was not what that
ruling was about — the grounds were the collapsed `neutral-110/-130/-150` and `muted-foreground`
at 2.65:1. So it is the safe member of a rejected bundle, and it is now written up on its own in
`MISSING-TOKENS.md` with what shifts if adopted, which is what that ruling said to do with a console
value we do not take. If the two are ever reconciled it is the console dropping its override.

### Underline tabs: every label on the content edge, the line the label's width (option B)

**Pranjal**, 2026-10-14, on the Agent Fleet tab mock: "b is the only valid solution ... keep it for agent fleet
first I will get it approved than we will move it to library". Sent to the library 2026-10-21 as the underline
default.

The first tab steps 12 into the margin, so every label starts on the edge the text under the strip starts on; the
2px line is drawn 12 in from each side of the tab, under the label, not across the tab. It supersedes two console
rulings from 2026-09-17: K-Tabs-06 (the line spanning "the label plus 12 at both sides") and the half of K-Tabs-08
that put the first label 12 in.

**This is not the pulled strip K-Tabs-08 ruled out.** That moved the whole strip, hairline and all, 12 into the
margin. Here the strip and its hairline stay on the content edge; only the first tab's invisible click area goes
past it. Anyone reading K-Tabs-08 and thinking this was settled the other way: it was, for a different thing.

**A default with no opt-out**, so it has its own changeset (`tabs-labels-on-the-edge`).

## 2026-10-14

### The console's light palette is not adopted — the ramp keeps its steps

**Nirav.** A submission re-pointed eight tokens to the console's values: `neutral-70`,
`neutral-110`, `neutral-150`, `blue-10`, `blue-60`, and `muted-foreground`, `border` and
`feedback-info-bg` with them.

Rejected on two grounds. It collapsed five light ramp steps into three values — `neutral-110`,
`-130` and `-150` all becoming `#1D2A3E`, `blue-60` becoming `azure-60` — so a component that
tells a body ink from a heading ink by picking 110 against 150 silently stops telling them apart.
And `muted-foreground` moved from `ink-500` `#727283` to `#8FA0BD`, which measures **2.65:1 on
white against AA's 4.5:1**, down from 4.72:1. That token sets every piece of secondary text in the
library.

**The dark block already collapses that way** — 110/130/150 are all `#CAD3E2` there today — so the
submission was making light match dark rather than inventing the problem. That argument is real and
is noted. The direction is still wrong: the fix is to give the dark ramp its steps back, not to
flatten light to match.

A console value we do not own goes in `MISSING-TOKENS.md` with its nearest step and what shifts if
adopted. It does not get closed by overwriting the ramp.

### A theme-invariant surface is allowed, for a button

**Nirav.** The seven `--mdt-fixed-*` tokens and `Button variant="fixed"` are approved: a white
fill, light border and dark label that stay the same on a dark page.

They are additive — used only by that variant, with no existing variant's colour changed — and in
light they point at ramp steps `outline` already uses, with the dark block repeating those light
values. Pinning them in `scripts/theme-dark.cjs`'s `explicit` map is the right mechanism.

This is the first thing in the library that does not follow the theme. It is deliberately scoped to
one button. A theme-invariant card or panel is a new question, not a precedent already set.

### Dialog titles are 16/24, and a tabless header carries a rule

**Nirav**, on a change by Kevin. `DialogTitle` drops from 18px to 16/24 and `DialogHeader` gains a
border and 14 below the words, except when it carries tabs, which bring their own underline.

A dialog title and a drawer title are the same thing at the same level and should read at the same
size. `ConfirmDialog` drops its own copy of that styling and inherits it, so the two can no longer
drift.

**This is a default with no opt-out**, so it has its own changeset and led the 2.3.0 upgrade note.
Any future change of this shape does the same.

### Circle `IconTile`s overlap only when they are pressable

**Nirav.** `STACKED` is applied inside the `pressable` branch. Deliberate, not an oversight —
recorded because the comment next to it explains the hover lift rather than the overlap, so it
reads like a bug otherwise.

### `metaLine` stays a function, in `_internal`

**Nirav.** It joins a meta line's parts with a hairline, and it should not become a component.

Both call sites make its parts **direct flex children** of a parent that owns the row, the text size
and the wrapping. A wrapper element would make them grandchildren, so `flex-wrap` would wrap inside
the wrapper and the `min-w-0` truncation chain would break; returning a Fragment to avoid the
wrapper rules out `forwardRef`. It is a formatting helper, like `cn`, and it is already in the
generated catalogue — `npm run find -- separator` answers with it.

### A type is named after the prop it types

**Nirav.** `SelectableCardType` was queried and kept. This library names a type after its prop —
`IconTileTone`/`tone`, `ConfirmDialogTone`/`tone`, `ActionCardVariant`/`variant`,
`SheetLayout`/`layout` — so renaming it alone would make it the one type that does not match. The
prop itself mirrors `<input type="radio">`, which is a better vocabulary than one we would invent.

### A per-person changelog is not a record; changesets are

**Nirav.** A `KEVIN-CHANGES.md` at the repository root was removed. It does not scale past the first
person who adds one, and it duplicates what changesets already do.

What was worth keeping from it is the attribution, and a changeset carries that: name who decided
and when, in the body, the way the existing ones do.

### An approval means the design owner's approval

**Nirav.** `main` requires one approving review, `CODEOWNERS` names the design owner for every path,
and `require_code_owner_reviews` is on.

Five people hold write access. "One approval" without `CODEOWNERS` meant any two of them could clear
a change between themselves, which is not what requiring a review was for.

GitHub does not allow self-approval, so the owner's own pull requests merge through the admin
bypass. That is deliberate, not a gap.

---

## 2026-10-12

### The 27 dot icons stay hollow, for now

**Nirav.** Twenty-seven icons draw their dots as `r="1"` stroked circles, so at the 1.5 default a
hole of radius 0.25 units opens and the dot becomes a tiny ring — sub-pixel at 16–24px, visible at
32px and above. `more-horizontal` is the row-actions menu on every table.

Deferred deliberately, not overlooked. The fix is one rule in `scripts/generate-icons.mjs` beside
the carve-out that keeps `fill` on a child, then a re-cut. Consumers must **not** work around it
locally — no overrides, no substituted icons. A named screen where a dot reads wrong is the argument
for doing it sooner.

---

## 2026-10-08

### Two icon sources, and nothing outside them

**Nirav.** Tabler and Lucide. Tabler is what the console draws and what Toast and Banner take their
tone glyphs from; Lucide is the fallback and still the bulk of the set. If neither has what you
need, say what you looked for — do not quietly substitute, and do not bring in a third set.

See the icon rule in `CLAUDE.md` for how the two are named and why neither is imported as a package.
