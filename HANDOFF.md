# Handoff — 2026-09-24

## Read first

**1.0.0 is ready to cut.** Eight changesets are queued, **two of them `major`** —
four real breaking changes, not changeset arithmetic. Nothing is published yet;
`main` and npm both sit at **0.6.0**.

**PR #109 is closed and empty.** Every part of it landed. There are **no open pull
requests**, the tree is clean, and local branches are `main` and `islamabad`.

```
de76802  docs(storybook): Sheet belongs in Components, not New Components   (#117)
e4db8d6  docs(storybook): finish the New Components taxonomy                (#116)
b876fc5  feat(advanced-filter): the More filters panel, with its tests      (#115)
5ee8001  feat(table): a searchable quick filter, and drag-to-reorder        (#114)
2256b30  feat(deprecated-2): the seven replaced components                  (#112)
c74c0ce  feat(field, tabs, avatar)!: the rework from #109                   (#111)
```

Then `CLAUDE.md` — and note it still says the project lives at
`G:\Claude Project\...`, which is the old Windows machine. It is
`~/Claude-Projects/Next-Gen/AI Ready Design System`.

---

## What breaks in 1.0.0

|                                                | before                                          | now                                                     |
| ---------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------- |
| `Input` / `Textarea` / `Select` default `size` | `md` (36px)                                     | **`sm` (32px)**                                         |
| `Avatar` `MAX_INITIALS`                        | `2`                                             | **`1`**                                                 |
| `Avatar` person tones                          | includes `slate`                                | **`slate` removed** — every name-derived colour changes |
| `Tabs`                                         | `'default' \| 'underline' \| 'card' \| 'pills'` | **`'underline' \| 'filled'`**                           |
| `--mdt-destructive` (light)                    | red 65 `#C72323`                                | **red 60 `#DB132A`**                                    |

The `destructive` move is a **fix**: light pointed at red 65 and dark at red 60
from the first commit, so the themes never agreed, and red 60 is the ruled value
(K-Field-10). White on the fill measures **5.07:1**, down from 5.69 but clear of
the 4.5 minimum.

---

## What we worked on

Taking **#109** apart and landing it. That PR was 161 files, conflicting, had
**never had CI run on it**, and its four predecessors (#105–#108) all closed
without review. It was not one change; it was four decisions in a trench coat.

Split into six reviewable pieces, each green on its own:

|          |                                                                                                                                                                                           |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **#111** | the tokens, the field rework (Input · Textarea · Select), Tabs, Avatar, Switch, Radio, Dialog, Sheet, `DateInput`, `NumberInput`, `Breadcrumb`, `DatePicker`, and Pranjal's sidebar order |
| **#112** | the seven **Deprecated 2** families, with their originals' suites ported onto them                                                                                                        |
| **#114** | the table delta — searchable quick filter, drag-to-reorder in the Columns panel, menus sized to their longest option                                                                      |
| **#115** | **`AdvancedFilter`**, with the 73 tests it arrived without                                                                                                                                |
| **#116** | the last thirteen story titles, completing the taxonomy                                                                                                                                   |
| **#117** | `Sheet` back to `Components`                                                                                                                                                              |

**#109 was closed, not merged.** It had gone behind `main` in every file it still
touched: merging would have **deleted 7,172 lines** and restored four things
fixed since — the "Select Select row 4" bug, `NumberInput`'s hand-drawn `<svg>`,
the four `@deprecated` notes, and the wrong `#8E9FBC` comment on `neutral-50`.
The closing comment says where each piece went.

### Defects found while landing it

Every one was invisible to a green local run.

|                                                            |                                                                                                                                             |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`DateInput` was coupled to the rework**                  | Its test asserts `rounded-lg`/`text-[13px]`, which come from the reworked `Input`. Held back, then passed untouched once that Input landed. |
| **`NumberInput` hand-drew its chevrons** as inline `<svg>` | Against the icon rule; both glyphs were in the registry.                                                                                    |
| **`NumberInput` had no test file**, as a public export     | 18 written.                                                                                                                                 |
| **`AdvancedFilter` had no test file**, 777 lines           | 73 written.                                                                                                                                 |
| **`isGroup` returned `undefined`**, not `false`            | Declared `it is FilterGroup`, a boolean predicate, but read a property rows do not have. Now `'group' in it`.                               |
| **`AdvancedFilter`'s group box had no `dark:` pairing**    | Rendered as a near-white block on a dark panel.                                                                                             |
| **`--mdt-faint` duplicated `--mdt-neutral-50`**            | Same HSL triple. The ramp _does_ hold `#8FA0BD`; neutral-50's own comment wrongly read `#8E9FBC`, which is what sent the search elsewhere.  |
| **`void hasActions;`** in `DataTable`                      | A dead expression silencing an unused warning.                                                                                              |
| **`check:exports` was wrong about star exports**           | Reported 21 orphaned `TableOld2` names that `export *` makes reachable. **My bug from #100**, not his code.                                 |

---

## In progress

**Nothing.** `main` clean at `de76802`, **3527 tests**, branches **90.14%**,
typecheck and lint clean, **75 components reachable**, build and
`verify-package` green, package loads in Node.

The gallery:

```
Foundation 7 · Layout 5 · New Components 25 · Components 27 ·
Deprecated 2 8 · Deprecated 20
```

---

## Next steps

**1. Cut 1.0.0 — deliberately.** Eight changesets, two major. Follow the order
that caught three defects last time: **merge, dry run, install the tarball, then
publish.** The dry run is not optional; see the gotchas.

**2. `Select` nests a button inside a button.** Its many-value field renders an
option button inside the trigger button — invalid HTML, and the inner one is
unreachable by keyboard. It predates all of this work and warns on `main` today,
in `Select`'s own suite. **This is the most serious thing outstanding.**

**3. The token count is 220**, from 100 three weeks ago. About half arrived with
the `Old2` copies — duplicates of violations that already existed — and the rest
with the rework's arbitrary values (`mdt-text-[13px]` alone appears 36 times).
`check:tokens` reports without failing, so nothing stopped it. **Grandfather the
current count and block new ones**, the shape `check:exports` uses.

**4. A palette decision is parked in `MISSING-TOKENS.md`** under _"Colour — a
neutral step between 40 and 50"_. The ramp jumps `#CBD3E1 → #8FA0BD`, its widest
gap, so a control needing a hover one shade off a neutral-40 resting state has
nowhere to land. `Switch` hit it first and carries a raw `#B9C3D4`.

**5. `TableOld2` is not a faithful snapshot.** It imports the _current_ `Avatar`,
`Input`, `Toolbar` and `Checkbox`, so it renders the old table wearing this
release's one-letter avatar and 32px field. Fine as a structural reference,
misleading as a side-by-side.

**6. Fourteen deprecated families ship** — seven `*Old` and seven `*Old2`. A lot
of surface to carry into 1.0.0, and nobody has scheduled a removal.

**7. `AdvancedFilter` carries a file-level
`eslint-disable jsx-a11y/no-noninteractive-element-interactions`.** Worth a look
now that it has tests to protect a change.

**8. Close issues #1, #2, #5** — Stat/KPI tile, Banner, Wizard stepper are all
built. Still open: **#4** Empty state, **#6** Tag input, **#7** `Select.tsx` over
the 1000-line limit (now doubled by `SelectOld2.tsx` at 2,702), **#8**
hand-drawn `<svg>` in stories, **#9** nothing checks one-glyph-one-meaning,
**#10** two broken Skeleton stories.

**9. The machine-readable layer is still unserved.** `capability-catalog.json`
ships in the package, but nothing serves it at a URL and there is no `llms.txt`.
This is what makes the "AI-ready" claim true.

---

## Decisions made

- **#109 was split, not re-cut.** Four attempts had already died as one large PR;
  a fifth would have too. Six pieces, each green on its own.

- **The sidebar is Pranjal's taxonomy**, completed:
  `Foundation · Layout · New Components · Components · Deprecated 2 · Deprecated`.
  The empty `On the way out` group from #103 was dropped — `Deprecated 2` is the
  same idea with real work behind it. **New Components means "reworked in the
  console workstream"**, which is why `Sheet` came back out of it: its only
  change was the shared close button.

- **The `Old2` families are excluded from the coverage threshold, not the
  suite.** Their originals' test suites were ported onto them — 424 tests, the
  level they were tested to as live code — and those tests still run. Only the
  percentage ignores them, on the same footing as `Sidebar`. The gate measures
  code the library is **still writing**; 12,000 lines of frozen copies dragged it
  90.47% → 89.72% while saying nothing about anything anyone is working on. The
  exclusion goes when the families do.

- **`--mdt-faint` points at the ramp rather than restating a value.** A second
  name for a colour we own is the "second way to do something" this repo treats
  as a defect.

- **Anything taken from a stale branch is checked against `main` first.** Half of
  #109's remaining diff was reverts by the end. Merging wholesale would have
  undone four fixes.

- **Merges into someone else's branch go through their own pull request**, and a
  merge of `main` into a feature branch is merged with a **merge commit, not a
  squash**.

- **`no changeset` is a label plus a written reason.**

---

## Gotchas & notes

- **The release dry run is not optional.** It found three defects in 0.6.0, two
  of which had been shipping silently for months. **Download the artifact and
  actually load it** — `verify-package` checking that files exist is precisely
  the check that passed while the package could not be `require`d at all.

- **Do not stack test runs on this machine.** 16 GB, and two `vitest` runs plus
  Storybook will make a suite fail that passes alone. One flake cost half an hour
  chasing a failure that did not exist. `npx vitest run --coverage
--maxWorkers=2`, one at a time, and stop Storybook first.

- **Piping a long run through `grep` buffers everything** — the output file stays
  empty until it finishes. Redirect to a file, then read it.

- **Ported tests need three passes of renaming, not one.** The exported
  identifiers, then the CSS classes (`TableOld2` namespaces its own to
  `tbl-old2`), then the names that live in the component file rather than the
  barrel — `useTableMorph`, `tableMorphOf`, `TableMorphContext` were all missed
  by a map built from `index.ts`.

- **`@deprecated` only works in the JSDoc block immediately before the
  declaration.** A second block above it reads perfectly in a diff and does
  nothing.

- **A star export defeats a name-level check.** `export * from './X'` makes every
  name reachable without listing any. `check-exports.mjs` now knows.

- **Never `--delete-branch` a PR that has another stacked on it.** It auto-closes
  the dependent, and GitHub will neither reopen a PR whose base is missing nor
  retarget a closed one.

- **Re-running a failed check does not pick up a label you just added** — a
  re-run replays the original event payload. The `labeled` event fires its own
  run.

- **`gh pr edit` can fail on a GraphQL `projectCards` error** and silently not
  apply. `gh api -X PATCH .../pulls/N --input file.json` works.

- **Date tests are timezone-fragile.** `dayStart` reads local components, so a
  value near midnight UTC lands on a different day depending on the machine
  (this one is Asia/Calcutta). Use midday on both sides.

- **The npm registry is unreachable from the sandbox** (`npm install` fails on a
  proxy error; `npm view` works). Smoke-test a tarball by unpacking it with `tar`
  and requiring the built entry, symlinking the repo's `node_modules` for React.

- **Row checkboxes need `getByLabelText`**, not `getByRole('checkbox', { name })`
  — they sit in an `aria-hidden` subtree.

- **Commit messages go through a file** (`git commit -F`).
- **`exactOptionalPropertyTypes` is on**; the lint config forbids `as` and `!`.
- **Test files are lint-ignored but typechecked** — run `npx tsc --noEmit -p
tsconfig.test.json` separately.
- **`COMPONENT-GAP.md` is public and names four colleagues.** Still undecided.

---

## Waiting on the design owner

| Question                                                                                          | Cost to act                   |
| ------------------------------------------------------------------------------------------------- | ----------------------------- |
| **Cut 1.0.0?** Eight changesets, two major, four breaking changes.                                | Half an hour with the dry run |
| **`Select` nests a button in a button** — invalid and keyboard-unreachable. Fix before 1.0.0?     | Half a day                    |
| **The token count is 220 and climbing.** Grandfather and block new ones?                          | An hour to wire the gate      |
| **A neutral step between 40 and 50** — the ramp's widest gap, and why `Switch` carries a raw hex. | A palette decision            |
| **Fourteen deprecated families** ship. Schedule removal for 1.0.0, or carry them?                 | A release decision            |
| **Close issues #1, #2, #5?** All three are built.                                                 | Minutes                       |
| `CLAUDE.md` still points at `G:\Claude Project\...` on a Mac.                                     | One line                      |
| `COMPONENT-GAP.md` names four colleagues on a public page.                                        | Minutes either way            |
