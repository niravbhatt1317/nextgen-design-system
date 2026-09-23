# Handoff — 2026-09-23

## Read first

**The next release is 1.0.0.** Six changesets are queued and **two are `major`** —
that is a deliberate consequence of the work below, not changeset arithmetic. Nothing
is published yet; `main` and npm both sit at **0.6.0**.

```
2256b30  feat(deprecated-2): the seven replaced components, tested and tagged   (#112)
c74c0ce  feat(field, tabs, avatar)!: the rework from #109, on current main      (#111)
1b545cd  feat(deprecate)!: AiMark, Callout, Item and OTPInput move to Deprecated (#104)
2336786  docs(storybook): Foundation leads the sidebar                          (#103)
```

Working tree clean, local branches `main` and `islamabad`. **One PR open: #109.**

Then `CLAUDE.md` — and note it still says the project lives at `G:\Claude Project\...`,
which is the old Windows machine. It is `~/Claude-Projects/Next-Gen/AI Ready Design System`.

---

## What breaks in 1.0.0

Four changes, each with a changeset that names it:

|                                                | before                                          | now                                                     |
| ---------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------- |
| `Input` / `Textarea` / `Select` default `size` | `md` (36px)                                     | **`sm` (32px)**                                         |
| `Avatar` `MAX_INITIALS`                        | `2`                                             | **`1`**                                                 |
| `Avatar` person tones                          | includes `slate`                                | **`slate` removed** — every name-derived colour changes |
| `Tabs`                                         | `'default' \| 'underline' \| 'card' \| 'pills'` | **`'underline' \| 'filled'`**                           |
| `--mdt-destructive` (light)                    | red 65 `#C72323`                                | **red 60 `#DB132A`**                                    |

The `destructive` move is a **fix**: light pointed at red 65 and dark at red 60 from
the first commit, so the themes never agreed, and red 60 is the ruled value
(K-Field-10). White on the fill measures **5.07:1**, down from 5.69 but clear of 4.5.

---

## What we worked on

Taking #109 apart and landing it. That PR is 161 files, conflicting, has **never had
CI run on it**, and its four predecessors (#105–#108) all closed without review. It
was not one change; it was four decisions in a trench coat. Split, each part landed
green.

### Landed

- **#110** (closed, superseded) → **#111** — `Breadcrumb`, `DatePicker`, Pranjal's
  sidebar order, the tokens, and the whole field / Tabs / Avatar rework, plus
  `DateInput` and `NumberInput`.
- **#112** — the seven `Deprecated 2` families, with their original test suites ported
  onto them.

### Defects found on the way, each verified rather than assumed

|                                                            |                                                                                                                                                                                        |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`DateInput` was coupled to the rework**                  | Its test asserts `rounded-lg`/`text-[13px]`, which come from the reworked `Input`. Held out of #110; passed untouched in #111.                                                         |
| **`NumberInput` hand-drew its chevrons** as inline `<svg>` | Against the icon rule. Both glyphs were in the registry; now `<Icon name="chevron-up" />`.                                                                                             |
| **`NumberInput` had no tests**, as a public export         | 18 written. 96.8% statements, 92.1% branches.                                                                                                                                          |
| **`--mdt-faint` duplicated `--mdt-neutral-50`**            | Same HSL triple. The note said the ramp does not hold `#8FA0BD` — it does, at neutral-50, whose own comment wrongly read `#8E9FBC`. Now `var(--mdt-neutral-50)`.                       |
| **`check:exports` was wrong about star exports**           | It reported 21 orphaned `TableOld2` names. `export * from './TableOld2'` genuinely re-exports them. **My bug, from #100**, not his code. Fixed and verified against the built package. |

---

## In progress

**Nothing mid-flight.** `main` clean at `2256b30`, 3443 tests, branches 90.47%,
typecheck and lint clean, **74 components reachable**, build and `verify-package`
green, package loads in Node.

---

## Next steps

**1. Cut 1.0.0 — deliberately.** Six changesets, two major. Follow the order that
caught three defects last time: **merge, dry run, install the tarball, then publish.**
That dry run is not optional; see the gotchas.

**2. The token count is 202**, from 100 at the start of this stretch. Roughly half
arrived with the `Old2` copies — duplicates of violations that already existed — and
the rest with the rework's arbitrary values (`mdt-text-[13px]` alone appears 36
times). `check:tokens` reports without failing, so nothing stopped it. **Grandfather
the current count and block new ones**, the shape `check:exports` uses.

**3. `#109` is still open** with what did not come across: `AdvancedFilter` (777
lines, **no test file**), the `Foundation/Colors` page changes, and assorted story
edits. The review comment on it lists everything.

**4. A palette decision is parked in `MISSING-TOKENS.md`** under _"Colour — a neutral
step between 40 and 50"_. The ramp jumps `#CBD3E1 → #8FA0BD`, its widest gap, so a
control needing a hover one shade off a neutral-40 resting state has nowhere to land.
`Switch` hit it first and carries a raw `#B9C3D4`. Any other control will hit the
same wall.

**5. `TableOld2` is not a faithful snapshot.** It imports the _current_ `Avatar`,
`Input`, `Toolbar` and `Checkbox`, so it renders the old table wearing this release's
one-letter avatar and 32px field. Fine as a structural reference, misleading as a
side-by-side.

**6. Fourteen deprecated families now ship** — seven `*Old` and seven `*Old2`. That is
a lot of surface to carry to 1.0.0 and nobody has scheduled a removal.

**7. Close issues #1, #2, #5** — Stat/KPI tile, Banner, Wizard stepper are all built.
Still open: **#4** Empty state, **#6** Tag input, **#7** `Select.tsx` over the
1000-line limit (now doubled by `SelectOld2.tsx` at 2,702), **#8** hand-drawn `<svg>`
in stories, **#9** nothing checks one-glyph-one-meaning, **#10** two broken Skeleton
stories.

**8. The machine-readable layer is still unserved.** `capability-catalog.json` ships
in the package, but nothing serves it at a URL and there is no `llms.txt`. This is
what makes the "AI-ready" claim true.

---

## Decisions made

- **#109 was split rather than re-cut.** Four attempts had already died as one large
  PR; a fifth would have too. Each slice landed green on its own.

- **`Deprecated 2` keeps its own group**, per Pranjal, and the sidebar took his order:
  `Foundation · Layout · New Components · Components · Deprecated 2 · Deprecated`.
  The empty `On the way out` group from #103 was dropped — it was a shelf with
  nothing on it, and `Deprecated 2` is the same idea with real work behind it.

- **The `Old2` families are excluded from the coverage threshold, not from the
  suite.** Their original test suites were ported onto them — 424 tests, the level
  they were tested to as live code — and those tests still run. Only the percentage
  ignores them, on the same footing as `Sidebar`. **The gate measures code the library
  is still writing**; 12,000 lines of frozen copies dragged it 90.47% → 89.72% while
  saying nothing about anything anyone is working on, and new tests for code scheduled
  for deletion only make the deletion harder. The exclusion goes when the families do.

- **`--mdt-faint` points at the ramp rather than restating a value.** A second name
  for a colour we own is the "second way to do something" this repo treats as a
  defect.

- **Component CSS is appended to `styles.css`, never prepended** (from 0.6.0, still
  true). Prepending would reorder every component rule against the utilities.

- **Merges into someone else's branch go through their own pull request**, and a merge
  of `main` into a feature branch is merged with a **merge commit, not a squash**.

- **`no changeset` is a label plus a written reason.**

---

## Gotchas & notes

- **The release dry run is not optional.** It found three defects in 0.6.0, two of
  which had been shipping silently for months. **Download the artifact and actually
  load it** — `verify-package` checking that files exist is precisely the check that
  passed while the package could not be `require`d at all.

- **Ported tests need three passes of renaming, not one.** The exported identifiers,
  then the CSS classes (`TableOld2` namespaces its own to `tbl-old2`), then the names
  that live in the component file rather than the barrel — `useTableMorph`,
  `tableMorphOf`, `TableMorphContext` were all missed by a map built from `index.ts`.

- **`@deprecated` only works in the JSDoc block immediately before the declaration.**
  A second block above it reads perfectly in a diff and does nothing — no
  strike-through, no lint error. Check the block closes on the line before the
  declaration.

- **A star export defeats a name-level check.** `export * from './X'` makes every name
  reachable without listing any, so a check that greps the barrel for names reports
  them all as orphans. `check-exports.mjs` now knows.

- **Never `--delete-branch` a PR that has another stacked on it.** It auto-closes the
  dependent, and GitHub will neither reopen a PR whose base is missing nor retarget a
  closed one. Check `gh pr list` first.

- **Re-running a failed check does not pick up a label you just added** — a re-run
  replays the original event payload. The `labeled` event fires its own run.

- **`gh pr edit` can fail on a GraphQL `projectCards` error** and silently not apply.
  `gh api -X PATCH .../pulls/N --input file.json` works.

- **This machine is memory-bound.** 16 GB, and Storybook + Vite + headless Chromium
  together get processes killed mid-run. Use `npx vitest run --coverage
--maxWorkers=2`, and stop Storybook before the suite.

- **The npm registry is unreachable from the sandbox** (`npm install` fails on a proxy
  error; `npm view` works). Smoke-test a tarball by unpacking it with `tar` and
  requiring the built entry, symlinking the repo's `node_modules` for React.

- **Row checkboxes need `getByLabelText`**, not `getByRole('checkbox', { name })` —
  they sit in an `aria-hidden` subtree.

- **Commit messages go through a file** (`git commit -F`).
- **`exactOptionalPropertyTypes` is on**; the lint config forbids `as` casts and `!`.
- **Test files are lint-ignored but typechecked** — run `npx tsc --noEmit -p
tsconfig.test.json` separately; `npm run typecheck` does not cover them.
- **`COMPONENT-GAP.md` is public and names four colleagues.** Still undecided. Raise
  it before touching that file.

---

## Waiting on the design owner

| Question                                                                                                    | Cost to act                   |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **Cut 1.0.0?** Six changesets, two major, four real breaking changes.                                       | Half an hour with the dry run |
| **The token count is 202 and climbing.** Grandfather and block new ones?                                    | An hour to wire the gate      |
| **A neutral step between 40 and 50** — the ramp's widest gap, and `Switch` carries a raw hex because of it. | A palette decision            |
| **Fourteen deprecated families** ship. Schedule removal for 1.0.0, or carry them?                           | A release decision            |
| **`AdvancedFilter`** — 777 lines with no tests, still in #109. Take it, or leave it with Pranjal?           | A day with tests              |
| **Close issues #1, #2, #5?** All three are built.                                                           | Minutes                       |
| `CLAUDE.md` still points at `G:\Claude Project\...` on a Mac.                                               | One line                      |
| `COMPONENT-GAP.md` names four colleagues on a public page.                                                  | Minutes either way            |
