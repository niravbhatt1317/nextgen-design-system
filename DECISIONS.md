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
