# Handoff — 2026-10-11

## Read first

**2.1.0 is published.** `@mtdt/nextgen-design-system@2.1.0` is live on npm — 1.3 MB,
2,921 files, 423 runtime exports, provenance attested (sigstore `logIndex
3203839666`). `main` and npm both read **2.1.0**. Nothing is open: no pull
requests, no changesets, clean tree.

```
d317362  chore(release): 2.1.0                                          (#153)
174b7d3  Date field: withTime, choices are a draft until Apply          (#145)
8db4ef1  Table: quick filters greyed out, not hidden                    (#144)
07b8658  More filters: the close ✕, a plain Add filter, the value ink   (#141)
8746ef4  docs(stepper): the barrel said vertical was separate; it is not (#150)
77c8864  Tabs: version-8 spacing                                        (#143)
14b6d6a  Fields: typed value 14/500 in the reading ink                  (#142)
e9a5515  feat(stepper): layout="vertical"                               (#147)
947bf78  feat(inline-tags): InlineTags                                  (#146)
39a7902  feat(input, select, textarea): the typed value is reading text  (#140)
```

**2.1.0 closed the console's report.** All nine entries from
`console-upgrade-report-2026-10-10.md` are in it, every changeset `minor`, so
nothing in 2.0.0 breaks. **One blocker is left and it is the console's, not
ours**: the console imports `VerticalStepper`, a name that has never existed
here — see **The console's upgrade** below.

Then `CLAUDE.md` — and note it still says the project lives at
`G:\Claude Project\...`, which is the old Windows machine. It is
`~/Claude-Projects/Next-Gen/AI Ready Design System`.

---

## The one thing to understand about 2.0.0

**Dark mode is `[data-theme="dark"]` and the values come from the colour map.**
A theme built against 1.0.0's hand-written dark block will shift — the switch
survives an upgrade, the exact colours do not. That is the whole of the major.

**`class="dark"` still works**, deliberately, as a dated migration aid: the
generated block carries both selectors (`.dark,[data-theme=dark]` in the shipped
CSS) and the `dark:` variant is configured for both. **It goes in 3.0.0**, and
nothing in this library sets it.

**The second selector must stay an attribute selector.** `tailwind.config.ts`
writes it `[class~="dark"]`, not `.dark`, and that is not style: with
`prefix: 'mdt-'` Tailwind prefixes a class even inside a literal variant string,
so `&:is(.dark *)` compiles to `:is(.mdt-dark *)` and matches nothing. I walked
into that trap while adding the aid — the first attempt emitted `:is(.mdt-dark`
beside the good one, under a comment claiming it had been verified. Measure the
built CSS; it is the only way to know.

**Every ramp step carries its own dark value**, so do not write `dark:` classes:
`mdt-bg-blue-10 mdt-text-blue-80` is a pale wash under a dark ink in light and
the reverse in dark, unaided. A `dark:` twin names the _other_ end of the ramp.

---

## In progress

**Nothing.** `main` clean at `d317362` and published. **3,678 tests** across 119
files, branches **90.35%** (statements 93.75, functions 92.82, lines 95.6), lint
and both typechecks clean, **77 components reachable**, `check:api` **958 names
and 279 tokens, none ever dropped**, `check:theme` green, colour gate green,
build and `verify:package` green. The 2.1.0 tarball was installed from npm into
an empty app before and after publishing and loads under `require()`.

---

## The console's upgrade — the live thread

The console runs a **repacked 0.5.1** built from Pranjal's local library copy,
which was 113 files ahead of anything published. Their 9 Oct report listed what
breaks on upgrading; their 10 Oct report turned the rest into rulings. **All of
it is now published in 2.1.0.**

**What 2.1.0 carries for them**, with the pull request to read the diff in:

|                             |                                                                                                                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| the form ladder             | the typed value is reading text again — 14/500, `neutral-130`, placeholder faint at 400; the clear ✕, the picked dropdown row, the searchable single `Select` (#140, #142) |
| More filters                | the close ✕, a plain "Add filter", the value ink, and the panel stays open on an outside press — the `--mdt-nudge` glow (#141)                                             |
| Tabs                        | version-8 spacing: no line under page tabs, the 25 chip, the paper chip, no panel margin (#143)                                                                            |
| Table                       | quick filters **greyed out rather than hidden** under an applied advanced filter; the search ✕; the empty state clears what is applied (#144)                              |
| `DateInput`                 | `withTime`, and choices are a **draft until Apply** — what makes their "Suspend at" cancellable (#145)                                                                     |
| `InlineTags`                | a row of `TagPill`s with a dashed "Add tag" (#146)                                                                                                                         |
| `Stepper layout="vertical"` | the rail as a variant, not a new component (#147)                                                                                                                          |
| earlier                     | Banner's edge and Tabler glyphs (#133), the five filter helpers under both names (#136), the Windows build (#135) — all in 2.0.0                                           |

**The one blocker left is theirs.** The console imports **`VerticalStepper`**,
and that name has never existed in this library — the rail is
`Stepper layout="vertical"`. Verified by installing 2.1.0 from npm and reading
the names out of the package: `InlineTags` yes, `Stepper` yes, `StepperLayout`
yes, `VerticalStepper` no. Until that import changes, Create organization does
not load.

**It is a rename, not a gap**, and that distinction is load-bearing. The upgrade
guide we sent says "if the package does not have it, keep the console's own
copy". Applied here that would vendor a second step rail that drifts from ours
forever. The reply spells out that the rule does not apply to a renamed export.

**What was sent** (`~/Downloads/library-reply-to-console-report-2026-10-11.md`):
2.1.0 is live and install it from the registry rather than packing the repo; the
nine entries with their pull requests; the one import to change; **leave the local
`VerticalStepper` file in place** — switching the import and deleting a component
are two changes that would fail as one; and then **stop and have Pranjal look at
the rail on Create organization**, in both themes, because a green build proves
the name resolves and not that ours is the right component. `InlineTags` gets the
same review on Create organization, the Edit details drawer and the organization
header. Where it differs, the photo decides — and if the console's is right, the
library changes to match rather than the console patching locally.

**A claim this file used to make, now withdrawn.** It said the console's "text in
fields is lighter and smaller" was just 1.0.0's documented `md` → `sm` default
and that `size="md"` restored it, no library change needed. **That was wrong, and
it was measured wrong.** `md` leaves the 32px height alone but would push fields
to 36px, and it does not restore the ink or the weight at all — the real change
was size 14→13, weight 500→400 and ink `#1D2B3E`→`#516281`. #140 and #142 fixed
it properly in the library. Four mentions of the bad advice were corrected in the
shared guide before it went out.

---

## Pull request previews, and the trap in them

`gh-pages` is the site now, not an artifact. `main` publishes to its root and each
open pull request to `pr-preview/pr-<number>/`. Pages is `build_type=legacy`,
source `gh-pages` at `/`. The public URL did not change.

**Two things will bite whoever touches this next, and both cost an afternoon:**

**1. `.nojekyll` is not optional, and losing it fails silently.** A branch-served
Pages site runs through Jekyll unless the root carries that file, and Jekyll does
not copy Storybook's `assets/` - where every story chunk lives. When it went
missing, the site returned **200**, `index.html` hashed identical to the branch,
and `iframe.html`, `sb-manager/`, `sb-addons/`, `index.json` and the fonts all
served. Only `assets/` was gone, so the shell loaded, the sidebar rendered its
full tree, and **not one story opened**. Nothing reported an error anywhere.

**2. `upload-artifact` drops dotfiles.** The first fix - `touch
storybook-static/.nojekyll` - did nothing, because `actions/upload-artifact@v4`
skips hidden files unless `include-hidden-files: true`, and says so only as one
line in the run log. Both lines are in `ci.yml` now, with the reasoning beside
them. Merging the broken fix would have deleted the hand-restored `.nojekyll` and
emptied the site again, behind a green run and a 200.

The lesson both times: **a 200 from the site proves nothing.** Check a
content-hashed asset, or open a story in a browser.

**Worth watching, not acting on:** `gh-pages` gains a whole Storybook build per
merge, so the repository will grow. The console's design system does not hit this
because its root is pushed by hand. In a few months, truncate that branch's
history.

---

## Next steps

**1. `CodeWell surface="dark"` is wrong in dark mode**, and it is the only live
`dark:` pair left that is a colour. The terminal look wants a ground that
deliberately does **not** follow the theme, and `neutral-160` flips to `#E3E8F2`,
so the well renders as a near-white slab. Written up in `MISSING-TOKENS.md` under
_"A surface that does not follow the theme"_ — it needs a token, not a guess.
`Components/CodeWell → Surfaces` in dark shows it.

**2. `Select` nests a button inside a button.** Its many-value field renders an
option button inside the trigger button — invalid HTML, and the inner control is
**unreachable by keyboard**. It predates all of this, was live in 0.6.0, and has
now shipped in 1.0.0, **2.0.0 and 2.1.0**. Still the most serious thing
outstanding, and it has survived two majors and a minor without anybody deciding
on it. A 2.1.1.

**3. `check:tokens` reports 231 violations** across 10 untokenised categories,
from 216 a day ago and 100 five weeks ago. **This number is hardcoded values, not
tokens** — the handoff called it "the token count" for weeks, which is why it read
as healthy growth rather than a ratchet nobody is holding. (The package defines
279 tokens; that is the separate number `check:api` guards.) `check:tokens`
reports without failing, so nothing has stopped the climb. **Grandfather the
current count and block new ones** — the shape `check:exports` and the colour gate
both use.

**4. A palette decision is parked in `MISSING-TOKENS.md`** under _"Colour — a
neutral step between 40 and 50"_. The ramp jumps `#CBD3E1 → #8FA0BD`, its widest
gap. `Switch` hit it first and carries a raw `#B9C3D4` — which is also why its
`dark:` twin is the second one still standing.

**5. The parity gate has never run here.** `scripts/parity.cjs` needs the console
on `:4187`; without it the gate stays off. Nobody has run it on this machine, so
the twins in `scripts/parity/twins/` are unverified against anything.

**6. Fourteen deprecated families have now shipped under two majors** — seven
`*Old`, seven `*Old2`. 1.0.0 was the moment to say when they go, then 2.0.0 was,
then 2.1.0, and nobody has. `check:api` makes retiring them a deliberate act now: dropping
their names needs `--record --reason`, which is the right shape, but somebody
still has to name the release.

**7. `TableOld2` is not a faithful snapshot.** It imports the _current_ `Avatar`,
`Input`, `Toolbar` and `Checkbox`, so it renders the old table wearing this
release's one-letter avatar and 32px field. And since the switch moved, the two
`.dark .tbl-old2` rules in `tableOld2.css` (lines 85 and 249) are **dead** — the
only ones left in the library. They bump a wash from 6% to 18% and swap a
divider, so the deprecated table still renders in dark, just a shade flatter than
the snapshot it is meant to be. Left alone deliberately: spelling them
`[data-theme='dark']` would restore the look while sliding past the colour gate,
which counts `.dark` and not the attribute — and whether a frozen copy should
carry a private dark rule at all is a question for whoever retires the family.

**8. Close issues #1, #2, #5** — Stat/KPI tile, Banner, Wizard stepper are built.
Still open: **#4** Empty state, **#6** Tag input, **#7** `Select.tsx` over the
1000-line limit, **#8** hand-drawn `<svg>` in stories, **#9** nothing checks
one-glyph-one-meaning, **#10** two broken Skeleton stories.

**9. The machine-readable layer is still unserved.** `capability-catalog.json`
ships in the package, but nothing serves it at a URL and there is no `llms.txt`.
**Note:** an `observeops-ds` MCP server is connected to this workspace
(`get_component`, `search_components`, `resolve_token`, `list_gaps`,
`validate_usage`) and has never been used — worth finding out whether it already
serves this before building one.

---

## Decisions made

- **The ratchet records additions, not just removals.** Every release runs
  `check-api --record` so new names enter the baseline. An addition left out is
  free to vanish later with every gate green — which is exactly the route the five
  `AdvancedFilter` helpers took out of the package. 2.1.0 recorded six names
  (`InlineTags` and its two prop types, `formatDateTime`, `parseTime`,
  `timeSlots`) and one token (`--mdt-nudge`). Each of the three date helpers was
  checked against the barrel first: recording a name freezes it into the public
  API, so leakage must not be recorded by accident. All three are deliberate, with
  a note at `src/components/index.ts:230`.

- **A renamed export is not a missing capability**, and the two get opposite
  advice. The console upgrade guide says to keep a local copy of anything the
  package lacks — right for a gap, wrong for `VerticalStepper`, where the library
  has the rail under another name. Following it there would vendor a second step
  rail to drift from ours forever. Any guide that carries the keep-it-local rule
  has to carve out renames explicitly.

- **An upgrade does not also delete things.** The reply tells the console to switch
  the `VerticalStepper` import and **leave the local file alone**. We cannot see
  what else imports it, and an upgrade that also removes a component is two
  changes failing as one. Retiring it is a separate, visible decision.

- **A resolving import is not a passing review.** `Stepper layout="vertical"` and
  `InlineTags` replace components built here from the ruling, while the console's
  were built against a design. So the reply names the screens — Create
  organization for the rail; Create organization, Edit details and the
  organization header for the tags — and asks for a designer's eyes in both
  themes before the upgrade counts as done. Where they differ the photo decides,
  and if the console's is right **the library changes to match**, rather than the
  console patching locally and drifting.

- **A published name never leaves by accident.** `check:api` compares the built
  `dist/` against `scripts/api-baseline.json` and fails on any removal; a
  deliberate one needs `--record --reason`, which keeps the reason in the file
  and shows the dropped names as deleted lines in review. It reads a committed
  baseline rather than querying npm, because a gate that needs the network fails
  when the network does. **It was tested by reproducing the break it exists for**
  — take the five AdvancedFilter aliases back out and it names all five, exits 1.

- **When a name moves, export both.** The old beside the new costs nothing and
  breaks nobody. "One or the other" was the wrong shape for the question during
  the #121 fold, and the console paid for it three weeks later.

- **The fold is a merge commit, not a squash.** #121's five commits are in the
  history; the resolution is the merge commit's own diff.

- **Every conflict went to the newer side, file by file** — not to a branch. That
  is why seven of main's fixes survived a merge of a branch that post-dates them.

- **The `dark:` sweep went in with the switch, not after it.** The PR retired them
  family by family "so every removal changes nothing on screen"; once the switch
  is `data-theme`, that stops being true for the files it did not reach, and the
  merge would have shipped a visible regression in ten components.

- **`CodeWell` was left broken rather than guessed at.** A missing token is a
  design decision. `mdt-bg-black` would have worked and would have been a raw
  value wearing a token's name.

- **A renamed public export is breaking**, so the PR's aliased `AdvancedFilter`
  barrel lost to the one 1.0.0 published.

- **`--mdt-faint` points at the ramp rather than restating a value.** The ramp
  _does_ hold `#8FA0BD`; `neutral-50`'s own comment was wrong.

---

## Gotchas & notes

- **Check for stacked pull requests before `--delete-branch`.** Already below as
  a rule; this session it was finally done the right way — `gh pr list --state
open --base <branch>` on each of #141, #144 and #145 before merging, all zero.
  Run the check, do not remember whether anything was stacked.

- **`npm view` lags a successful publish by about two minutes.** 2.1.0 reported
  `2.0.0` for five consecutive checks after `+ @mtdt/nextgen-design-system@2.1.0`
  appeared in the log, then flipped. Read the publish step — it names the sigstore
  log index — and treat a stale `npm view` as lag, not failure.

- **A child process gets the project path unquoted.** `changeset version` printed
  `/bin/sh: /Users/niravbhatt/Claude-Projects/Next-Gen/AI: No such file or
directory` and carried on: the directory name has spaces. It did the work, but
  anything it delegates to a shell can silently not run. Check the result rather
  than the exit code.

- **A monitor whose `jq` is malformed reports nothing and looks patient.** One
  watch here had an unclosed quote in its filter, so it emitted no events for its
  whole window while `main` went green — indistinguishable from "still running".
  An expiry with zero events is a bug in the filter, not quiet success.

- **A green local run says nothing about the pixels.** Every one of the nineteen
  dark twins passed 3,600 tests while painting a near-white control. Render the
  story in both themes and look at it: `npx http-server storybook-static -p 4196`,
  then `iframe.html?id=<story>&globals=theme:dark`, and wait for the story root to
  hold real text — Storybook answers instantly with a spinner.

- **Do not stack test runs on this machine.** 16 GB. Three suites failed under a
  stacked run and all three passed alone; two of them were the known flake and one
  was a genuine 5-second timeout. One at a time, `--maxWorkers=2`.

- **A `describe` gets its own timeout.** `describe('DataTable', { timeout: 20000 })`
  does not cover a sibling `describe` in the same file.

- **`git commit` after a merge writes the merge commit.** Resolve, `git add -A`,
  then `git commit -F <file>` — the two parents are kept automatically.

- **Piping a long run through `grep` buffers everything** — the output file stays
  empty until it finishes, and if you redirect the _grep_ you cannot read the
  detail afterwards. Redirect the run, grep the file.

- **A successful publish and `npm view` agreeing are not simultaneous.** 2.0.0
  took about 2½ minutes; 1.0.0 took 210 seconds. Read the step log — it names the
  sigstore log index — rather than a `npm view` a minute later.

- **Ported tests need three passes of renaming, not one** — exported identifiers,
  then CSS classes, then the names that live in the component file rather than the
  barrel.

- **`@deprecated` only works in the JSDoc block immediately before the
  declaration.** A second block above it reads perfectly in a diff and does nothing.

- **A star export defeats a name-level check.** `check-exports.mjs` now knows.

- **Never `--delete-branch` a PR that has another stacked on it.** It auto-closes
  the dependent, and GitHub will neither reopen a PR whose base is missing nor
  retarget a closed one.

- **`gh pr edit` can fail on a GraphQL `projectCards` error** and silently not
  apply. `gh api -X PATCH .../pulls/N --input file.json` works.

- **Row checkboxes need `getByLabelText`** — they sit in an `aria-hidden` subtree.
- **Date tests are timezone-fragile.** Use midday on both sides.
- **The npm registry is unreachable for installs from the sandbox.** Unpack the
  tarball with `tar` and require the built entry, symlinking `node_modules`.
- **`exactOptionalPropertyTypes` is on**; the lint config forbids `as` and `!`.
- **Test files are lint-ignored but typechecked** — `npx tsc --noEmit -p
tsconfig.test.json` separately.
- **`COMPONENT-GAP.md` is public and names four colleagues.** Still undecided.

---

## Waiting on the design owner

| Question                                                                                                                                                                                 | Cost to act              |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **The console's review of the two new parts.** 2.1.0 published everything; the rail and `InlineTags` now need a designer's eyes on Create organization before the upgrade is signed off. | An hour with the screens |
| **`Select` nests a button in a button** — invalid, keyboard-unreachable, and has now shipped through two majors **and 2.1.0** without a decision.                                        | Half a day               |
| **`CodeWell` needs a theme-invariant surface token** — the terminal ground, still near-white in dark.                                                                                    | A palette decision       |
| **Banner's tint is 1.03–1.08:1 on white** now the edge is gone. Deliberate on a card; invisible on a bare page.                                                                          | Confirm or revisit       |
| **Six orphaned `--mdt-feedback-*-border` tokens** — nothing uses them since Banner dropped its edge.                                                                                     | Keep or retire           |
| **`check:tokens` is at 231 hardcoded values and climbing** (216 a day ago). Grandfather and block new ones, the shape `check:api` now uses?                                              | An hour to wire the gate |
| **A neutral step between 40 and 50** — the ramp's widest gap, why `Switch` carries a raw hex.                                                                                            | A palette decision       |
| **Fourteen deprecated families** have shipped under two majors and a minor. When do they go?                                                                                             | A release decision       |
| **Has anyone run the parity gate?** It needs the console on `:4187`.                                                                                                                     | An hour to find out      |
| **`required_approvals` is 0** with four people now holding write access.                                                                                                                 | One API call             |
| **Close issues #1, #2, #5?** All three are built.                                                                                                                                        | Minutes                  |
| `CLAUDE.md` still points at `G:\Claude Project\...` on a Mac.                                                                                                                            | One line                 |
