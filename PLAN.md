# Plan — what still needs fixing

A running list of everything known to be wrong or missing, so nothing gets lost while other work
takes priority. **Most of this is deliberately not urgent.** The point of the file is that it exists.

**Owner:** Pranjal · **Started:** 30 July 2026 · **Last updated:** 31 July 2026

---

The modal work has its own list: **[DIALOG-PLAN.md](DIALOG-PLAN.md)**.

## Progress

|             |                               |
| ----------- | ----------------------------- |
| Total items | **21**                        |
| Done        | **1**                         |
| Left        | **20**                        |
| In progress | TagPill — in review as PR #17 |

**When you tick something, update those four numbers.** A count that has to be recalculated by
reading the whole file is a count nobody trusts.

---

## In progress now

One branch each — they ship independently, so they never share one.

- [x] **Badge** — merged, PR #14. Gained an emphasis axis, a square shape and count content.
- [ ] **TagPill** — in review, PR #17. Rebuilt as the removable tag, neutral only.
      **Closes item 1 below**, and turned up items 10 and 11.

---

## Found in review, not yet on the issue list

These came out of a read-through on 30 July 2026 and are not tracked anywhere else yet.

### 1 · TagPill's colours were not from this design system — DONE

- [x] Put TagPill's tones on the palette

**Fixed in PR #17.** The ten colour-named tones are gone and TagPill is neutral until the colour
question is answered. Kept here so the reason survives.

Badge's red compiles to `hsl(var(--mdt-red-80))` — it points at the palette. TagPill's red compiles
to `rgb(185 28 28)`, a fixed value that is the CSS framework's own stock red. All ten tones are built
that way, and three of them — pink, teal, cyan — are colour families this palette does not contain at
all.

**Cost while it stands:** change a red in the palette and every red in the library moves except
TagPill's. Its colours also do not come from the theme when the page flips to dark.

**Blocked on a design decision.** Doing it properly needs a pale background and a deep text colour
per tone — the missing quiet-variant pair in [`MISSING-TOKENS.md`](./MISSING-TOKENS.md), 12 proposed
tokens. There is a second question tangled in: the tones are currently colour names (`red`, `teal`)
rather than meanings (`danger`, `info`), which is the more significant gap of the two.

**Estimate:** 1.5–3 hrs once the tokens are agreed, most likely 2.

### 2 · The token check cannot see this kind of violation

- [ ] Teach `check:tokens` to reject colour steps outside the palette

The check reports 14 violations and says nothing about TagPill's ten off-palette tones, because the
classes carry the `mdt-` prefix and look legitimate. Every number the check reports understates the
real position until this is fixed.

**Estimate:** 30–60 min, most likely 40.

### 3 · Error text fails readability in dark mode

- [ ] Add the dark-mode step for error text in `Icon`, `FormLabel`, `FormMessage`, `FormDescription`

Success got a dark-mode step in all four files; error never did. Measured at 3.6 against a 4.5
minimum — the accessibility standard — on the most important text in any form.

**Not blocked.** Copy the pattern success already uses.

**Estimate:** 10–20 min, most likely 12. → **Cheapest real win on this list.**

### 4 · Ten floating things share one stacking layer

- [ ] Add layering tokens and move the ten components onto them

`Dialog`, `Sheet`, `Select`, `Popover`, `Tooltip`, `DropdownMenu`, `Command`, `Combobox`,
`HoverCard` and `Toast` all use the same stacking value. When two are open at once, which one covers
which is decided by document order rather than intent — a menu inside a dialog is a coin flip.

**One decision needed:** should a tooltip sit above a dialog? Undefined today.

**Estimate:** 40–80 min, most likely 55.

### 5 · Tabs' four styles are missing from the catalogue

- [ ] Move Tabs' styles into the switch table so the generator can see them

`component-catalog.json` covers 33 of 46 components. Ten of the absent ones have no options to list —
they are kits of named parts. Three genuinely lose real options: **Tabs** (default, underline, card,
pills), `OTPInput` (three sizes), `SecretDots` (two sizes).

Tabs matters most. Four tab styles exist and work; the catalogue says it has none, so an AI reading it
would never produce three of the four. That undercuts the AI-ready claim more directly than anything
else found.

**Estimate:** 20–40 min, most likely 25. Needs every page re-rendered — the last-class-wins rule
bites when styles move.

### 6 · The repository's own notes describe a different copy

- [ ] Correct `CLAUDE.md`, `HANDOFF.md` and `COMPONENT-GAP.md`

| File               | What is wrong                                                                                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLAUDE.md`        | States the project lives at a path that belongs to a _different, unrelated_ copy, and tells the reader not to work anywhere else                           |
| `HANDOFF.md`       | Dated 30 July 2026 and describes 1,256 uncommitted files. Not true of this repository. It is the file every rule says to read first                        |
| `COMPONENT-GAP.md` | Lists `Avatar`, `Badge`, `Progress`, `CodeWell`, `IconTile` and `SecretDots` as missing — all six exist. Also flags a README example that no longer exists |

**Estimate:** 30–60 min, most likely 40.

### 7 · `COMPONENT-GAP.md` names four colleagues on a public page

- [ ] Decide: strip the names, rewrite the history, or leave it

Alongside an audit of their work. Flagged as pushed by accident and still undecided.
**Raise this before touching that file.**

**Estimate:** minutes to act, once decided.

### 8 · Fourteen hardcoded sizes

- [ ] Replace with size tokens, then switch the check to blocking

`Textarea` (three), `ScrollArea` (two), `Sidebar`, `TagPill`, `Button`, `Combobox`, `Command`,
`InputGroup`, `Select`, `DropdownMenu` (two). Reported but not blocking, deliberately, because they
predate the rule. Switch `check:tokens` to strict once the count reaches zero.

**Estimate:** 45–90 min, most likely 60. Each one is a small design decision about what the value
should be.

### 9 · Ten categories have no tokens at all

- [ ] Work through [`MISSING-TOKENS.md`](./MISSING-TOKENS.md) in its stated order

677 uses across the library sit on framework defaults rather than decisions: spacing, type scale,
font weight, elevation, layering, motion, opacity, border width, breakpoints, plus the quiet-variant
colour pair. Radius is partial.

**Every one of these is a design decision, not an implementation task.** Order in that file is by
impact: spacing first, then type scale.

**Estimate:** the largest thing on this page. Spacing alone is a half-day once decided, and it touches
every component.

### 10 · The palette has no light, genuinely grey step

- [ ] Add a light neutral that is actually neutral

The neutral ramp **gains a blue tint as it lightens**. neutral-30 sits at 30% saturation, but
neutral-20 and neutral-10 sit at 52% and 50%. So the lighter you go, the bluer it gets, and there is
no quiet grey to reach for.

Found while lightening TagPill's chip: the request was for something lighter _and_ more neutral, and
the palette can only offer one of those at a time.

**Affects anything wanting a quiet grey surface** — hover states, empty rows, disabled backgrounds,
not only tags.

**Estimate:** the change itself is minutes. Deciding the value is a colour decision.

### 11 · Colours cannot be used at partial strength

- [ ] Give every colour an opacity setting

Figma gives every fill an opacity slider. This palette has the colours but not the slider — every
colour is only available at full strength.

That matters when the value you need sits _between_ two steps on a ramp. TagPill's hover wants about
1.15 against its rest state; the palette offers 1.07 or 1.32 and nothing in between, so the hover
ships knowingly weak.

Colours are declared as `hsl(var(--x))` without the alpha placeholder Tailwind needs, so
`mdt-bg-neutral-40/50` compiles to nothing. Verified by compiling it, not assumed. No shipped
component uses that pattern, which is consistent with it never having worked.

**Also blocks the ordinary way of building** overlays behind dialogs, faded disabled states, and soft
hover surfaces — each currently has to jump a whole step or hardcode a value and break the token rule.

**Estimate:** 20–40 min including proving nothing moves. One line per colour family, and it should
not change a single existing pixel.

---

## Already on the issue list

Tracked on GitHub — the issue is the source of truth, this is only the overview. Claim one by
commenting on it.

**Components to build.** Ranked by how many of the four product teams built the same thing
independently, which is the most useful signal in the whole audit.

- [ ] **#1 Stat / KPI tile** — 4 of 4 teams
- [ ] **#2 Banner** — 4 of 4 teams
- [ ] **#3 Card** — 3 of 4 teams · _two documents argue this should come first, because stat tiles,
      empty states and key-value rows all sit inside one_
- [ ] **#4 Empty state** — 3 of 4 teams
- [ ] **#5 Wizard stepper** — 3 of 4 teams
- [ ] **#6 Tag input / removable chip** — 2 of 4 teams

**Cleanup.**

- [ ] **#7 `Select` is 2,299 lines** against a documented 1,000-line limit · 1.5–3 hrs, and the
      highest regression risk of anything on this page
- [ ] **#8 89 hand-drawn icons remain in demo pages** — they ship to nobody, but they are what a
      designer sees while browsing, so they teach the wrong habit
- [ ] **#9 Nothing checks that one glyph means one thing** — the rule is written down and unenforced
- [ ] **#10 Two `Skeleton` pages fail to render** · 15–45 min, most likely 25 — cause unknown until
      someone looks

---

## Known and deliberately not on this list

Not oversights. Recorded so nobody re-raises them.

|                                                     |                                                                                                   |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Spacing and type use framework defaults             | Correct, not a violation — those categories have no tokens yet. A raw `p-[13px]` _is_ a violation |
| The dark-mode config looks wrong                    | It is correct, and must not be simplified. See `CLAUDE.md`                                        |
| The registry stays at 1,209 icons                   | Refreshing artwork must never quietly widen what the library publicly offers                      |
| `Icon` and `Spinner` contain hand-drawn shapes      | The only two with a reason to                                                                     |
| Nothing is published to the public package registry | Fully configured, never released. A decision, not a bug                                           |

---

## Rules that apply to everything above

- **`main` is protected.** Every change goes through a parallel copy and a review, even a one-word
  documentation fix. Branch names are `person/what-changed`.
- **One parallel copy per thing you would ship or undo as a unit.** Badge and TagPill are always two.
- **If a token you need does not exist, stop and say so.** Do not hardcode, do not approximate with a
  nearby token, and never add a colour.
- **Look at it in a real browser, in both themes.** Tests pass while pixels are wrong.

## `CommandDialog` is not a dialog

It renders its own fixed overlay and a centred box by hand: no portal, no focus trap, no escape
key, no overlay dismiss, and nothing that returns focus to whatever opened it. A command palette
is one of the few surfaces where all of that matters, since it is opened by keyboard and dismissed
by keyboard.

Its centring was fixed alongside `Dialog` (1 Aug 2026) so it cannot inherit the transform bug, but
the component still needs rebuilding on the same Radix primitive `Dialog` uses.
