# Handoff — 2026-09-14

## Read first

**The PR queue is empty and `main` is clean.** Everything that was open has landed:

```
34997ec  docs: the design links, six page-structure entries      (#90)
bb99ce1  table, strip, icon tile, input: twenty refinements      (#94)
4a13a21  feat(table): expand — the table drives its own morph     (#89)
0751c79  ci: fail when a component exists but cannot be imported  (#93)
```

Then `CLAUDE.md`. Nothing in it changed today, but two of its sections did the work:
**⚠️ Class order matters** and **🔒 The token rule** are still the ones people break.

**The project now lives at `~/Claude-Projects/Next-Gen/AI Ready Design System` on macOS.**
The path written in `CLAUDE.md` (`G:\Claude Project\...`) is from the Windows machine and is
stale — worth correcting next time someone touches that file.

---

## What we worked on this session

Clearing a three-PR backlog that had been stuck for three days. **All three were stuck on the same
gate**: the 90% global branch-coverage threshold. None of them was stuck on anything hard — they
were stuck because nobody had written tests for the feature each one added.

Four pull requests were opened to unblock the three: **#95**, **#96**, **#97**, all merged and
their branches deleted.

---

## Completed

### #89 — Table `expand`, and the tests it was missing

The table now drives its own morph from the page scroll instead of rendering a value the page
computed. It failed CI on one number — **branches 89.46% against a 90% threshold**, with every test
passing.

The gap was the feature itself. `useSelfDrivenMorph` and `dockLineOf` had **33 uncovered branches**
between them, which is every branch they have past the first `if`. All nine existing `expand` tests
mount a table with nothing scrolling above it, so each stops at `if (found === null) return` — a
real case worth keeping, but it meant the filling, the morph, the scroll listener and the cleanup
had never run once.

**#95** added 17 tests that give the table a real page to fill. jsdom has no layout and the elements
do not exist until first render, so the table mounts with `expand={false}`, takes its measurements,
then switches on — the effect reads the page once, and by then the numbers are in place.
`requestAnimationFrame` is stubbed to hand back its callbacks rather than wait for a frame, with a
non-zero handle, since the table reads `0` as "no frame pending".

**89.46% → 90.31%.**

### #94 — twenty refinements from the IAM console build

The big one: 40 files, 16 changesets. Table gains `pager="auto"`, several quick filters at once, a
resizable Name column, an elastic tail, and `toolbar={element}` so a page can host the table's own
controls. Plus the funnel icon, IconTile `2xl`, and Input's `neutral-30` border.

**#94 already contained the whole of #89's `expand` work independently, plus fixes on top** — an
`isViewport` guard and a travel-based morph. That is why it landed second and #90 third; see
_Decisions made_.

**#96** merged `main` into it: five `Table.tsx` conflicts, all resolved to #94's side because in
every one `main` held the earlier cut of the very lines #94 improved.

**89.61% → 90.34%.**

### #90 — collapsed to what its title always said

Once #94 was on `main`, #90's `Table.tsx` contribution was **byte-identical to what was already
there**, as was its `TableColumns.mdx`, its `TheLeadColumn` story (it carried a duplicate) and its
changeset. **#97** dropped all of it.

What remains and landed: `PageFrame.stories.tsx` (+306) and four one-line design links on Button,
KpiCard, Colors and DataTable. **313 lines, five files, no component code.**

### Five defects found, none of which a green test run would have caught

|                                                             |                                                                                                                                                                                                                                       |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TableLeadCell` spoke **"Select Select row 4"**             | It hands `label` to `TableSelectionCell`, which already writes `` `Select ${label}` ``. The documented example (`label="Select Sarah Johnson"`) was wrong too, and the story hit it. `label` now means the subject, not the sentence. |
| The `table-expand` changeset named **`@mdt/design-system`** | Not a package here — every other changeset says `@mtdt/nextgen-design-system`. `expand` would have reached npm with **no version bump and no changelog entry**.                                                                       |
| #90's `tbl-sep` killed the resize handle's focus ring       | See _Decisions made_. **WCAG 2.4.7**, and invisible to every test.                                                                                                                                                                    |
| A test asserted `0.5` morph at rest                         | It pinned the exact bug #94 fixes. Rewritten to assert `0` and say why.                                                                                                                                                               |
| `component-catalog.json` was stale                          | In neither PR; did not know about IconTile's `2xl`. Regenerated.                                                                                                                                                                      |

### Verified in a browser, both themes

Before #94 reached `main`: the Users table is healthy end to end in dark — strip, funnel icon,
lead-column checkbox, Action column, status marks, badges, pager. The Lead Column story proves what
it claims: `#` and row numbers in one table, a checkbox in the _same_ 60px slot in the other.
Toolbar in light shows the funnel, the new border, the count badge and the applied dots.

---

## In progress

**Nothing mid-flight. No open pull requests.** `main` is clean, all 63 components reachable,
branches at 90.3%, typecheck and lint clean.

**16 changesets are queued** for the next release — that is 0.6.0 whenever someone cuts it. The
published version is still **0.5.1**, which is live on npm.

---

## Next steps

**1. Cut 0.6.0.** Sixteen changesets are waiting and the biggest of them is a whole console
migration. Nothing blocks it.

**2. The token count went from 14 to 100.** That is the single biggest regression in the repo right
now, and it arrived with the console merge work. `npm run check:tokens` reports but does not fail,
so nothing stopped it. Worst files:

```
10  Upload.tsx        9  DataTable.tsx     7  Table.tsx      6  Stepper.tsx
10  TableStates.tsx   8  TableBulkBar.tsx  6  TablePager.tsx 6  KpiCard.tsx
```

The plan in `CLAUDE.md` was to switch CI to `check:tokens:strict` once the count reached zero. It is
going the wrong way. Grandfathering the existing 100 and blocking _new_ ones is the move.

**3. Two stories look broken though the component is not.** `Pieces → The Lead Column` and
`Pieces → Headings` set `tableWidth={620}` inside a full-width card, so the row dividers, the header
underline and the selected-row highlight all stop dead mid-card. It contradicts #94's own
elastic-tail rule, on the two stories a designer browsing is most likely to open. Flagged on #94,
not changed — widening them is a call about what each story is meant to show.

**4. Seven deprecated `*Old` families are still shipping**: `BadgeOld`, `ButtonOld`, `LeftNavOld`,
`TableOld`, `TagPillOld`, `ToolbarOld`, `TooltipOld`. Removing them is a major-version decision
nobody has scheduled.

**5. The nine open issues**, three of which are stale and can be closed: #1 (Stat/KPI tile), #2
(Banner) and #5 (Wizard stepper) are all built. Genuinely open: #4 Empty state and #6 Tag input
(both confirmed absent via `npm run find`), #7 `Select.tsx` still 2299 lines against a documented
1000 limit, #8 hand-drawn `<svg>` in stories (now **119**, up from 89), #9 nothing checks
one-glyph-one-meaning, #10 two Skeleton stories broken.

**6. `CLAUDE.md` says exactly two inline `<svg>` are allowed in shipped code. There are now 14** —
`Icon` (5) and `Spinner` (1) are the documented two; `LeftNav` (2), `KpiCharts` (2), `Button` (2),
`Upload` (1) and `AiMark` (1) are not. Some are probably fine by intent — a sparkline is not an icon
— but the rule and the code have drifted and nobody wrote the exception down.

**7. The machine-readable layer is still unpublished.** `component-catalog.json` and
`capability-catalog.json` exist and are regenerated, but nothing serves them. This is what makes the
"AI-ready" claim true, and Storybook cannot do it — it builds an app, so a machine fetching it gets
an empty shell. An MCP server sits behind this, not before it.

---

## Decisions made

- **#94 landed before #90**, though #90 was older. #94 was the _later revision_ of every line the
  two shared — it contained #90's `TableLeadHead`/`TableLeadCell` byte-for-byte plus fixes #90 did
  not have. Landing #90 first would have left #94 re-resolving eight `Table.tsx` blocks in the
  "take theirs" direction, where picking wrong silently reverts console-found fixes. The reverse
  made most of them resolve as "already have it".

- **The separator: `main`'s 16px `<TableNick />` wins over #90's full-height `tbl-sep`, and it was
  never really a design disagreement.** Both branches wrote down the same reasoning — the mark is
  not the resize handle, so draw it on every heading rather than only the draggable ones. They
  differed only in height. But #90's was not wired up: `tbl-sep` appeared exactly once on that
  branch, as a `className`, with no rule defining it, while both rules that give the handle its
  feedback still said `.tbl-nick`. Worse, `.tbl-rz:focus-visible { outline: none }` _does_ still
  apply — it targets the handle, not the mark — so the native focus ring was suppressed and the
  replacement never arrived. **A keyboard user reaching the resize handle would have seen nothing.**
  If full height is the preference, it is a one-line change to `TableNick` plus its two CSS rules,
  on top of a version that works.

- **Merges into someone else's branch go through their own pull request**, never a direct push.
  That is the precedent #85–#87 set and #95–#97 followed.

- **A merge of `main` into a feature branch is merged with a merge commit, not a squash.** Squashing
  throws the merge away and every conflict comes straight back. Both #96 and #97 say so in their
  titles.

- **`no changeset` is a label plus a written reason.** The label alone records _that_ a decision was
  made; the comment records _why_. #96 and #97 both carry one.

---

## Gotchas & notes

- **The `Table.test.tsx` merge trap.** All three branches append a `describe` block at the same
  anchor, so git offers you one side or the other. **Taking either alone silently deletes tests** —
  and in #94's case the deleted set was the one holding coverage above the gate. Both merges kept
  both sides by splicing, not by `--ours`/`--theirs`.

- **Never `--delete-branch` a PR that has another stacked on it.** Merging #89 that way deleted
  `pranjal/table-expand`, which was #90's base, and GitHub **auto-closed #90**. Recovering it is a
  catch-22: GitHub will not reopen a PR whose base branch is missing, and will not retarget a closed
  PR. The way out is to push the base branch back at its old tip, reopen, retarget to `main`, then
  delete it again. Check `gh pr list` for dependents before deleting.

- **Re-running a failed check does not pick up a label you just added.** A re-run replays the
  original event payload. The `labeled` event fires its own fresh run — wait for that one. The stale
  red row stays visible on the PR and means nothing.

- **This machine is memory-bound.** 16 GB, and Storybook + Vite + headless Chromium together will
  get processes killed mid-run. Three died this session. `npx vitest run --coverage --maxWorkers=2`
  completes where `npm run test:coverage` does not; stop Storybook before running the suite.

- **The screenshot wait rule in `CLAUDE.md` is for text-heavy stories only.** Waiting for
  `#storybook-root` to hold >15 characters times out on sparse stories — IconTile, Input — where the
  story is boxes, not words. Wait for rendered children and a non-zero box instead.

- **Row checkboxes need `getByLabelText`, not `getByRole('checkbox', { name })`.** They sit in an
  `aria-hidden` subtree, so the accessible-name computation returns empty even with `hidden: true`.
  The existing tests already do this at `Table.test.tsx:154`.

- **Commit messages must go through a file.** `git commit -F <file>`. Still true.
- **`exactOptionalPropertyTypes` is on**, and the lint config forbids `as` casts and `!` assertions.
- **Test files are lint-ignored but typechecked** (`tsconfig.test.json`). `npm run typecheck` does
  _not_ cover them — run `npx tsc --noEmit -p tsconfig.test.json` separately.
- **`COMPONENT-GAP.md` is public and names four colleagues** alongside an audit of their work.
  Flagged many times, still undecided. **Raise it before doing anything with that file.**

---

## Waiting on the design owner

| Question                                                                                                                                                 | Cost to act              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Cut 0.6.0?** Sixteen changesets are queued, including the whole console migration.                                                                     | One command              |
| **The two stories that read as broken** — widen them so the table fills its card and demonstrates the elastic tail, or leave them at `tableWidth={620}`? | Ten minutes              |
| **The token count is 100 and climbing.** Grandfather them and block new ones, or keep reporting only?                                                    | An hour to wire the gate |
| **The full-height separator** — now that a working 16px version is on `main`, is full height still wanted? One line plus two CSS rules if so.            | Fifteen minutes          |
| **Seven `*Old` families** still ship. Schedule their removal for a major?                                                                                | A release decision       |
| **Close issues #1, #2, #5?** All three are built.                                                                                                        | Minutes                  |
| `COMPONENT-GAP.md` names four colleagues on a public page — strip, rewrite history, or leave it?                                                         | Minutes either way       |
