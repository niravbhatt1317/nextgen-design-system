# Handoff — 2026-09-15

## Read first

**0.6.0 is published.** `@mtdt/nextgen-design-system@0.6.0` is live on npm — 5 MB, 2845 files,
provenance attested, published by OIDC trusted publishing so no token exists anywhere.

**The PR queue is empty, `main` is clean, and nothing is pending.** No open pull requests, no
queued changesets, working tree clean, local branches pruned to `main` and `islamabad`.

```
0c6733e  fix(package): the package loads in Node, artifact holds one tarball  (#101)
d660df1  fix(table): export TableLeadHead and TableLeadCell, catch the next one (#100)
2b3887d  chore(release): 0.6.0                                                (#99)
7fa9ae3  docs(handoff)                                                        (#98)
34997ec  docs: the design links, six page-structure entries                   (#90)
bb99ce1  table, strip, icon tile, input: twenty refinements                   (#94)
4a13a21  feat(table): expand — the table drives its own morph                  (#89)
```

Then `CLAUDE.md`. Two of its sections did the real work over these two days:
**⚠️ Class order matters** and **🔒 The token rule**.

**The project lives at `~/Claude-Projects/Next-Gen/AI Ready Design System` on macOS.** `CLAUDE.md`
still says `G:\Claude Project\...`, which is the Windows machine and wrong. Fix it next time
anybody edits that file.

---

## What we worked on

Two days, one thread: get three stuck pull requests out, then get a release out. **Every single
thing that went wrong was invisible to a green test run.**

Seven pull requests were opened and merged: **#95**, **#96**, **#97** to unblock the backlog,
**#98** the handoff, **#99** the release, **#100** and **#101** to fix what the release dry run
found.

---

## Completed

### The backlog: three PRs, all stuck on the same gate

#89, #90 and #94 had been stuck for three days on the **90% global branch-coverage threshold**.
None was stuck on anything hard. Each was stuck because nobody had written tests for the feature
it added.

- **#89 — Table `expand`.** 89.46%, every test passing. `useSelfDrivenMorph` and `dockLineOf` had
  **33 uncovered branches** — every branch past the first `if`. All nine existing tests mounted a
  table with nothing scrolling above it, so each stopped at `if (found === null) return`. **#95**
  added 17 tests that give the table a real page to fill. → **90.31%**
- **#94 — twenty refinements from the IAM console build.** 40 files, 16 changesets. **#96** merged
  `main` in: five `Table.tsx` conflicts, all resolved to #94's side. → **90.34%**
- **#90 — collapsed to what its title said.** After #94 landed, its `Table.tsx` contribution was
  byte-identical to `main`. **#97** dropped all of it, leaving 313 lines of stories.

### The release: three defects caught between cutting it and publishing it

**This is the part worth reading.** All three were found by the dry run, and any of them would have
been permanent once published — npm cannot take a version back.

| Defect                                                                          | How it would have shipped                                                                                                                               |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TableLeadHead` / `TableLeadCell` **in the changelog, absent from the package** | Exported from `Table/index.ts`, never forwarded from `components/index.ts`. Confirmed against the real tarball: **0 occurrences** in `dist/index.d.ts`. |
| **The package could not be loaded by Node at all**                              | `require(...)` → `SyntaxError: Unexpected token '.'` — CSS parsed as JavaScript. **0.5.1 and every release before it shipped this way.**                |
| The release artifact carried **two tarballs**, six versions apart               | A stale `0.1.0.tgz` committed in August, swept up by `path: '*.tgz'`.                                                                                   |

Each now has a check that fails when it returns, and **each was verified by deliberately
reintroducing the bug**:

- `check:exports` compares the names a component's own `index.ts` publishes against the barrel.
  Revert the two lines and it exits naming both.
- `verify-package` fails if any `dist` file imports a `.css`, **and** if `styles.css` comes out
  without component rules — the fold cutting the imports and losing the rules would otherwise look
  exactly like success.

### Five more defects, found while merging

|                                                             |                                                                                                                               |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `TableLeadCell` spoke **"Select Select row 4"**             | It hands `label` to `TableSelectionCell`, which already writes `` `Select ${label}` ``. The documented example was wrong too. |
| The `table-expand` changeset named **`@mdt/design-system`** | Not a package here. `expand` would have reached npm with **no version bump and no changelog entry**.                          |
| #90's `tbl-sep` killed the resize handle's focus ring       | `.tbl-rz:focus-visible { outline: none }` still applied while the replacement matched nothing. **WCAG 2.4.7.**                |
| A test asserted `0.5` morph at rest                         | It pinned the exact bug #94 fixes. Rewritten to assert `0`.                                                                   |
| `component-catalog.json` was stale                          | In neither PR; did not know about IconTile's `2xl`.                                                                           |

---

## In progress

**Nothing.** No open pull requests, no pending changesets, `main` clean at `0c6733e`, 0.6.0 on npm.

Branches at **90.3%**, typecheck and lint clean, all 63 components reachable, `verify-package`
green on all three of its guarantees.

---

## Next steps

**1. The token count is 100, up from 14.** The single biggest regression in the repo, and the only
number moving the wrong way. It arrived with the console merge work; `check:tokens` reports without
failing, so nothing stopped it.

```
10  Upload.tsx        9  DataTable.tsx     7  Table.tsx      6  Stepper.tsx
10  TableStates.tsx   8  TableBulkBar.tsx  6  TablePager.tsx 6  KpiCard.tsx
```

`CLAUDE.md`'s plan was to switch CI to `check:tokens:strict` once the count reached zero. That is
receding. **Grandfather the existing 100 and block new ones** — the same shape as `check:exports`,
which works precisely because its baseline was clean and it blocks from day one.

**2. Two stories look broken though the component is not.** `Pieces → The Lead Column` and
`Pieces → Headings` set `tableWidth={620}` inside a full-width card, so row dividers, the header
underline and the selected-row highlight stop dead mid-card. It contradicts #94's own elastic-tail
rule, on the two stories a designer is most likely to open. Flagged on #94, not changed.

**3. `DataDrivenSidebar`.** 180 lines of real component in the deprecated Sidebar family,
unreachable from the root since it was written. Recorded in `DELIBERATELY_UNEXPORTED_NAMES` rather
than decided. If products want it, move it to `LeftNav` — do not publish it from a family people
are being moved off.

**4. The separator.** A working 16px `<TableNick />` is on `main`. If full height is still the
preference it is one line there plus its two CSS rules — deliberately, not as a merge resolution.

**5. Seven deprecated `*Old` families** still ship: `BadgeOld`, `ButtonOld`, `LeftNavOld`,
`TableOld`, `TagPillOld`, `ToolbarOld`, `TooltipOld`. A major-version decision nobody has scheduled.

**6. Close issues #1, #2, #5** — Stat/KPI tile, Banner and Wizard stepper are all built. Genuinely
open: **#4** Empty state and **#6** Tag input (both confirmed absent via `npm run find`), **#7**
`Select.tsx` at 2299 lines against a documented 1000, **#8** hand-drawn `<svg>` in stories (now
**119**, up from 89), **#9** nothing checks one-glyph-one-meaning, **#10** two broken Skeleton
stories.

**7. `CLAUDE.md` permits exactly two inline `<svg>` in shipped code. There are 14** — `Icon` (5)
and `Spinner` (1) are the documented two; `LeftNav` (2), `KpiCharts` (2), `Button` (2), `Upload`
(1) and `AiMark` (1) are not. Some are probably fine by intent — a sparkline is not an icon — but
the rule and the code have drifted and nobody wrote the exception down.

**8. The machine-readable layer is still unpublished.** `capability-catalog.json` now ships in the
package (it is in the `exports` map), which is a real step — but nothing serves it at a URL and
there is no `llms.txt`. This is what makes the "AI-ready" claim true. An MCP server sits behind it,
not before it.

---

## Decisions made

- **#94 landed before #90**, though #90 was older. #94 was the _later revision_ of every line the
  two shared — it contained #90's `TableLeadHead`/`TableLeadCell` byte-for-byte plus fixes #90 did
  not have. The reverse order would have left #94 re-resolving eight `Table.tsx` blocks in the
  "take theirs" direction, where picking wrong silently reverts console-found fixes.

- **The separator was never really a design disagreement.** Both branches wrote down the same
  reasoning — the mark is not the resize handle, so draw it on every heading. They differed only in
  height. `main`'s won because #90's was not wired up: `tbl-sep` appeared exactly once on that
  branch, as a `className`, with no rule defining it.

- **Component CSS is appended to `styles.css`, never prepended.** Prepending would reorder every
  component rule against the utilities — the hazard `CLAUDE.md`'s class-order note is about, and it
  would need a full 521-story diff to clear. Appending keeps the cascade consumers already have.

- **`src/` was not touched by the packaging fix.** The seven `import './x.css'` statements stay
  where they are: they are right for source, and Storybook, the dev server and the tests all read
  `src/`. Only the built output changes.

- **Merges into someone else's branch go through their own pull request**, never a direct push.
  The precedent #85–#87 set, and #95–#97 followed.

- **A merge of `main` into a feature branch is merged with a merge commit, not a squash.** Squashing
  throws the merge away and every conflict comes straight back.

- **`no changeset` is a label plus a written reason.** The label records _that_ somebody decided;
  a comment records _why_.

- **Publishing stayed a deliberate, separate act.** `release.yml` is `workflow_dispatch` only and
  stops before the irreversible step unless `publish` is ticked. Three dry runs preceded the real
  one, and all three defects above were found in them.

---

## Gotchas & notes

- **The dry run is not optional.** It found three defects in one release, two of which had been
  shipping silently for months. A dry run costs eight minutes; a bad version on npm is permanent.
  **Download the artifact and actually load it** — `verify-package` checks files exist, which is
  exactly the check that passed while the package could not be `require`d at all.

- **The `Table.test.tsx` merge trap.** Three branches append a `describe` block at the same anchor,
  so git offers you one side or the other. **Taking either alone silently deletes tests** — and in
  #94's case the deleted set was the one holding coverage above the gate. Splice, never `--ours` /
  `--theirs`.

- **Never `--delete-branch` a PR that has another stacked on it.** Merging #89 that way deleted
  `pranjal/table-expand`, which was #90's base, and GitHub **auto-closed #90**. Recovery is a
  catch-22: GitHub will not reopen a PR whose base is missing, and will not retarget a closed PR.
  Push the base branch back at its old tip, reopen, retarget to `main`, delete it again. Check
  `gh pr list` for dependents first.

- **Re-running a failed check does not pick up a label you just added.** A re-run replays the
  original event payload. The `labeled` event fires its own run — wait for that one. The stale red
  row stays on the PR and means nothing.

- **`npm pack --pack-destination` does not create the directory.** It exits `ENOENT` if missing,
  which it always is on a fresh runner. Found by running it, not by reading it.

- **This machine is memory-bound.** 16 GB, and Storybook + Vite + headless Chromium together will
  get processes killed mid-run — three died in one session. `npx vitest run --coverage
--maxWorkers=2` completes where `npm run test:coverage` does not. Stop Storybook before the suite.

- **The npm registry is unreachable from the sandbox** (`npm install` fails on a proxy error, though
  `npm view` works). To smoke-test a tarball, unpack it with `tar` and `require` the built entry
  directly, symlinking the repo's own `node_modules` for React.

- **The screenshot wait rule in `CLAUDE.md` is for text-heavy stories only.** Waiting for
  `#storybook-root` to hold >15 characters times out on sparse stories — IconTile, Input — where the
  story is boxes, not words. Wait for rendered children and a non-zero box instead.

- **Row checkboxes need `getByLabelText`, not `getByRole('checkbox', { name })`.** They sit in an
  `aria-hidden` subtree, so the accessible-name computation returns empty even with `hidden: true`.
  `Table.test.tsx:154` already does this.

- **`.bdg-label` and friends are hook classes with no rules**, used as `querySelector` targets. A
  check that every class in the markup exists in the stylesheet will flag them; that is the check
  being naive, not a defect.

- **Commit messages must go through a file.** `git commit -F <file>`.
- **`exactOptionalPropertyTypes` is on**, and the lint config forbids `as` casts and `!` assertions.
- **Test files are lint-ignored but typechecked** (`tsconfig.test.json`). `npm run typecheck` does
  _not_ cover them — run `npx tsc --noEmit -p tsconfig.test.json` separately.
- **`COMPONENT-GAP.md` is public and names four colleagues** alongside an audit of their work.
  Flagged many times, still undecided. **Raise it before doing anything with that file.**

---

## Waiting on the design owner

| Question                                                                                                                                          | Cost to act                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| **The token count is 100 and climbing.** Grandfather them and block new ones, or keep reporting only?                                             | An hour to wire the gate    |
| **The two stories that read as broken** — widen them so the table fills its card and shows the elastic tail, or leave them at `tableWidth={620}`? | Ten minutes                 |
| **`DataDrivenSidebar`** — move it to `LeftNav`, export it where it is, or delete it with Sidebar?                                                 | Depends on the answer       |
| **The full-height separator** — still wanted, now that a working 16px version is on `main`?                                                       | One line plus two CSS rules |
| **Seven `*Old` families** still ship. Schedule their removal for a major?                                                                         | A release decision          |
| **Close issues #1, #2, #5?** All three are built.                                                                                                 | Minutes                     |
| `CLAUDE.md` still points at `G:\Claude Project\...` on a Mac. Correct it?                                                                         | One line                    |
| `COMPONENT-GAP.md` names four colleagues on a public page — strip, rewrite history, or leave it?                                                  | Minutes either way          |
