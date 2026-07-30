# Handoff — 2026-07-30 13:15

## Read first

**The project moved drives today.** It now lives at
`G:\Claude Project\Service_Ops\AI Ready Design System`, alongside the owner's other projects.
Nothing remains on `C:\Users\Pranjal Gupta\`. Git history, the GitHub remote and all 1252
uncommitted changes came across intact — 2024 source files were checksummed on both sides and
matched byte for byte before the old copy was deleted. Dependencies were reinstalled fresh rather
than copied, and the full suite was re-run at the new location before anything was removed.

Then `CLAUDE.md`, and these sections above all:

- **🎨 The icon rule** — new. Lucide is the only icon source, one glyph never means two things, and
  the artwork is copied in rather than imported. Includes the two traps the generator exists to stop.
- **⚠️ Class order matters** — the class merger now works properly, which means the last class wins.
  Code written before this fix assumed both classes survived.
- **🔒 The token rule** — extended with two hard lines: do not add colours, and spacing/type have no
  tokens at all, so Tailwind's default steps are correct rather than a violation.
- **⚠️ Dark mode** — a config trap that silently disabled every `dark:` class. Fixed, looks odd,
  must not be tidied up.
- **Verify in a browser** — every real bug this session passed its tests first.
- **Git Workflow** — commit messages have to go through a file, not inline.

---

## What we worked on this session

A long one, in four parts:

1. **Fixed the real cause of a colour bug** the owner spotted — the class merger did not know our
   prefix, so alphabetical order was silently picking which style won.
2. **Reworked Toast and Tabs** — the toast onto Org Mgmt's banner design with a promotional variant,
   and tabs with icon-plus-badge and a Notion-style add-and-close.
3. **Put the whole icon set on Lucide.** All 1209 re-cut from Lucide's own source, and all 16
   hand-drawn icons in shipped components routed through `<Icon>`.
4. **Moved the project from C: to G:** at the owner's request.

---

## Completed

### The icon set — re-cut from Lucide, and a dead prop fixed

The icons were traced from an old Lucide via Figma, which welds every shape into one path and turns
arcs into bezier curves. That renders the same but is impossible to diff against upstream, so nobody
could tell an outdated icon from a current one. All 1209 are now cut from Lucide 1.27's own source.

- `scripts/generate-icons.mjs` replaces the old `.ts` script, which ran through `npx ts-node --esm`
  and read a folder you had to supply by hand. It now defaults to `node_modules/lucide-static/icons`.
- **`strokeWidth` was a dead prop on 1208 of 1209 icons.** The old generator wrote `strokeWidth="2"`
  onto every path, and an element's own attribute beats an inherited one. The Icon "Stroke Width"
  story showed four identical icons and had done since it was written. Fixed by regenerating.
- **1192 of 1192 now match Lucide pixel for pixel**, checked by rendering each one twice in a browser
  and comparing the alpha channel. None render empty. 1382 tests, types and lint all pass.
- **289 drawings genuinely changed**; only **two are in component code** — `megaphone` in the
  promotional toast and `sparkles` in the AI button. The other 287 are in demo pages or unused.
- **No names were lost.** The registry is frozen at 1209 on purpose — refreshing artwork must not
  quietly add names to a public API. `--all` opts into the 815 Lucide icons we do not carry.
- **17 brand logos** (`github`, `figma`, `slack`, `twitter`, …) were dropped by Lucide for trademark
  reasons, so there is nothing upstream to refresh them from. Our artwork is kept — path data is
  byte-identical and all 17 render the same at the default weight — but they now run through the same
  pipeline as everything else. The first pass skipped them entirely, which left them as the only 17
  icons in the set where `strokeWidth` still did nothing. Verified: 0 of 17 responded before, 17 of
  17 respond now. The generator is idempotent, so a second run changes nothing.
- Review page with every changed drawing, old beside new:
  https://claude.ai/code/artifact/79fd717d-fbed-4516-a974-c25f09bb4fb6

Three bugs were caught in the new generator before it shipped, all by rendering rather than reading:
a name pattern that excluded digits turned every `<line x1= …>` into a blank `<line />`; stripping
`fill` turned the solid dots in `scatter-chart` into hollow rings; and skipping the brand logos left
them behind on the very bug the rewrite existed to fix.

### Every component now asks `<Icon>` for its icons

Eight components drew **18 icons by hand**. Sixteen were replaced; the two that remain are the only
two with a reason to (`Icon`'s own fallback, `Spinner`'s animated circle).

- **Sidebar was on a different icon set entirely** — four solid glyphs on a 20-unit grid rather than
  Lucide's outlined 24. At 12–16px the swap turns out to be nearly invisible, which is the good news;
  the value was consistency, not appearance.
- **Pagination and Tabs are pixel-identical** before and after. Their hand-drawn shapes were already
  copies of the right Lucide paths — they simply bypassed the component.
- **The close cross existed five times over** — Dialog, Tabs, TagPill and both toasts each carried
  their own. All five now share `<Icon name="x" />`.
- **Toast's tone glyphs** were hand-traced from Om's banner. Five of the six are near-identical to
  their Lucide counterpart. `ai` is the exception: a solid four-point diamond became Lucide's
  outlined `sparkles`, the same mark the AI button already uses. That was the deliberate choice —
  one feature, one icon — but it is the one change worth a second opinion.
- The tone glyphs also moved from stroke weight 1.5 to Lucide's 2, so they read slightly heavier.
  Left at the default on purpose: every other icon in the library is weight 2, and making the toast
  special would put back the inconsistency this pass removed.

Verified by driving the real UI, not by reading the diff: every surface screenshotted before and
after, the dialog opened and all six toast tones fired. 1382 tests, types and lint all pass.

**Still hand-drawn: 84 icons across 10 story files.** Sidebar's own demo holds 23, Toggle 19. They
ship to nobody but they teach the wrong habit. Separate pass.

### The class merger — the root fix, and the biggest change of the day

The owner asked why the Error and Info buttons rendered black. Cause: `cn()` did not know our `mdt-`
prefix, so conflicting classes both survived and alphabetical order decided the winner.
`destructive` and `info` sort before `primary` and lost; `success` and `warning` sort after and won.

- Fixed with `extendTailwindMerge({ prefix: 'mdt-' })`
- Snapshotted all 521 stories before and after: **39 changed, every one a latent bug finally
  applying** — error borders that had been grey, `lg`/`xl` buttons stuck at 14px, skeleton circles
  that were not round, TagPill sizes that were all identical. Nothing regressed.
- Exposed a second bug: `Badge`'s bare shape kept padding it should drop. Its reset moved to
  `compoundVariants`, which run last.
- Two Skeleton stories (`text-line`, `text-lines`) fail to render — **broken before this change
  too**, identical in both snapshots. Out of scope, still broken.

### Button

- `success` became a real variant, not a colour setting bolted on the side
- Both families gained volume: `successSoft`/`Outline`/`Ghost` and `destructiveSoft`/`Outline`/`Ghost`.
  Destructive had been solid-only.
- `ai` — pale purple with a sparkle, the treatment three of four product systems arrived at
  independently. It supplies its own sparkle unless the caller passes an icon.
- Hover and press now step along the colour ramp instead of using opacity. `/90` blends toward the
  page, so a mid-tone fill got _lighter_ on hover and its white text fell to 3.8 hovering, 3.2
  pressed. Six more states measured between 2.6 and 4.2. All fixed.

### Tokens — success moved from green 50 to green 70, foreground to white

White on green 50 measured 2.5 against a 4.5 minimum. Green 70 measures 4.9 and matches
destructive's weight. It also fixed the green tick and green form text, which had been failing at
2.5 against a white page.

`Icon` and the three `Form*` files carry a `dark:` flip to green 40, because one token cannot be
both a fill under white text and text on a dark page.

### CodeWell

- Controls sit on the vertical centre line, and the content reserves room so nothing runs under them
- Fixed a 4px jump when revealing a masked value — `SecretDots` rendered a text size larger than the
  well
- `truncate` holds the well to one line, with the full value on hover or keyboard focus. No tooltip
  when the value already fits, and never while masked.

### Avatar

`xs` and `sm` show one letter, not two. Follows the size automatically, so stacks do it too. Also
caps a caller-supplied `initials`.

### Toast — rebuilt on Org Mgmt's banner

- Six tones: `success`, `danger`, `warning`, `info`, `neutral`, `ai`. Om's rule holds — the text is
  one colour in every tone, only the icon and border carry it.
- A dismiss cross inside every toast; `closable: false` removes it
- Icon centres on a single line and holds the first line when the text wraps. One rule does both: the
  row is top-aligned with a nudge equal to half the gap between the line box and the glyph.
- **Promotional toast** — its own layer anchored at the bottom, with the ordinary stack pushed clear
  above it. Only one at a time; a second replaces the first. `usePromotionalOpen()` lets an app grey
  out its trigger, which is how Blade signals the limit. Eight seconds on screen, not four.
- Rendered by us rather than the library, because the library knows four tones and this needs six.

### Toast Storybook page — collapsed from 17 pages to 3

- `Default` — one toast, driven by the props table
- `Toast variants` — 31 triggers in seven labelled rows, everything on one page
- The props table now actually works. It never did: the page rendered one toaster for the button and
  a different one for the controls, so changing anything did nothing. `tone` is in the table too.
- `richColors` and `closeButton` removed from the table — they did nothing to this toast

### Tabs

- `icon` and `badge` are real props on `TabsTrigger`, so a tab can carry a glyph, a label and a count
  at once. They were hand-assembled in two separate stories before, with their own margins.
- `closable` + `onClose`, and a `TabsAdd` control — the Notion/ClickUp concept of a tab bar you build
- `useEditableTabs` holds the rules: closing an inactive tab changes nothing; closing the active one
  selects its right-hand neighbour, or the left if it was last; the last tab has no cross
- The cross sits _beside_ the tab in the markup, not inside it. A button nested in a button is
  invalid and leaves the cross unreachable by keyboard.
- 12px between label and cross, and the cross only shows on the selected or hovered tab. A hidden
  cross is also unclickable — otherwise aiming at a tab would close it.

### Colour audit, at the owner's request

Om's 18 exact values went in as `--mdt-feedback-*` tokens, then came back out. Measured against our
palette: 16 of 20 were within a hair of a step we already owned, and only four icons differed. All
20 now point at existing ramps. **The palette is back to 88 primitives — no colours were added.**

Audited the rest of the day's diff: no new text sizes, weights, line heights or letter spacing, and
no new spacing steps. One hand-written value survives — `mdt-max-w-[calc(100vw-3rem)]` on the
promotional layer, stopping it overflowing a narrow phone. One new size token,
`--mdt-toast-width`.

---

## In progress

Nothing mid-flight. **1382 tests pass, types and lint clean, build succeeds**, token check at 14 —
the same count as the start of the day.

**Nothing is committed.** All 1256 changed files are uncommitted working changes, and `HANDOFF.md`
is untracked. A blanket `git checkout` would destroy the whole day. That number is large mostly
because every one of the 1209 icon files was rewritten.

---

## Next steps

**0. Build the Card component.** Agreed as the next piece of work. The owner's standing rule applies:
research current best-in-class references first, present directions, let him pick, then build.

**1. Finish the icon work — two smaller jobs left.** The artwork and the shipped components are done.

- **84 hand-drawn icons remain across 10 story files** — Sidebar's own demo has 23, Toggle 19, then
  Icon's test 10, Input 9, Item 6, Select 6, TagPill 5, Tabs 3, Toggle's test 2, Icon's stories 1.
  None of them ship, but they are what a designer sees while browsing, so they teach the wrong habit.
- **Nothing checks that one glyph means one thing.** The rule is written into `CLAUDE.md` and
  unenforced. A check alongside `check:tokens` would make it real.

**2. Settle the open questions below.** Most are one-line changes; one is about a public page naming
colleagues. 3. **Publish the machine-readable layer.** `component-catalog.json` exists and is doing nothing.
Serve it at a fixed URL, add an `llms.txt`, write a rules file aimed at people _using_ the
library. This is what makes the "AI-ready" claim true, and Storybook cannot produce it — it builds
an app, so a machine fetching it gets an empty shell. 4. **Decision flow and a real gate.** Rules for _which_ component to use. Then flip `check:tokens`
from reporting to blocking new violations while grandfathering the 14. 5. **An MCP server**, thin over step 3. Do not start it before step 3. 6. **Publish to npm.** Fully configured, never released — 404 on the public registry. 7. **Fix the two broken Skeleton stories** and the faint `outline` button border, which measures 1.5
against a white page. Both predate this session.

---

## Decisions made

- **Success matches destructive in weight.** Both are a solid fill with white text, and both run the
  same four volume levels. Neither family gets a step the other lacks.
- **Hover and press step along the ramp, never through opacity.** Opacity blends toward whatever is
  behind the element, so it makes a mid-tone fill lighter on a white page and darker on a dark one —
  the opposite of what a press should feel like, and it breaks contrast in one of the two themes.
- **The toast is rendered by us, not the library.** It knows four tones; this needs six. Owning the
  markup is also what makes the cross and the icon rule possible.
- **The promotional toast is a different shape, not a seventh tone.** An announcement is neither good
  news nor bad, so tinting it would make it argue with the six that are.
- **No new colours.** Borrowed designs get mapped to the nearest step we own, with the shift named
  out loud. A second green makes "which green" a question on every component after it.
- **Blade's colours were not copied.** Its toast measures 3.2 to 3.5 for white text against a 4.5
  minimum. Its _shape_ was worth taking; its hexes were not. That whole build was reverted anyway —
  the owner wanted Blade's Storybook page structure, not its component.
- **`ai` was kept through every rework.** Three of four product systems built an AI action
  independently, so it is not a product quirk.
- **The icon artwork is copied in, not imported.** `lucide-static` is a devDependency that only feeds
  the generator. Importing `lucide-react` at runtime would put a dependency into every product using
  this library, hand Lucide the power to rename our public API, and let an icon change shape without
  a commit. Copying costs 1209 files in the repo and a manual `npm run generate-icons`; that is the
  cheaper side of the trade for a library other teams install.
- **The AI toast now shares the AI button's sparkle.** Om's version was a solid four-point diamond;
  Lucide's is outlined. Same feature, same mark — that is the whole point of the one-icon-one-meaning
  rule. It is also the single most visible change of the icon pass, so it is on the open list below.
- **Toast tone glyphs kept Lucide's stroke weight, not Om's lighter 1.5.** They read slightly heavier
  than before. Every other icon in the library is weight 2, and giving Toast its own weight would put
  back exactly the inconsistency this pass removed.
- **The registry stays frozen at 1209 names.** Refreshing artwork must never quietly widen a public
  API. Adding the 815 Lucide icons we do not carry is a deliberate act (`--all`), not a side effect.
- **The project lives on G:, not C:.** The owner keeps every project under `G:\Claude Project\`.
  Nothing should ever be left on the system drive.

---

## Gotchas & notes

- **Class order now matters.** See `CLAUDE.md`. Code written before the merger fix assumed both
  classes survived, so a narrower rule written _before_ a broader one is now silently overridden.
  That is exactly what made the tab label run under the cross.
- **A Storybook screenshot can catch the loading spinner instead of the story.** It happened during
  the icon verification and would have passed as "verified" on a blank page. Wait for the story root
  to hold real content, not for a selector that hidden control-panel markup also matches:
  ```js
  await page.waitForFunction(() => {
    const r = document.querySelector('#storybook-root');
    return !!r && (r.innerText || '').trim().length > 15;
  });
  ```
- **Removing an inline `<svg>` leaves its closing tag behind** if the edit only matches the opening
  tag and the path. It happened once in `Sidebar.tsx`. Grep for `</svg>` after any such swap.
- **Do not simplify the Tailwind `darkMode` config.** It looks wrong and is correct.
- **Restart Storybook in place, on 6006.** A change to `tailwind.config.ts` needs a restart, and the
  port takes a few seconds to release afterwards. Waiting for it beats taking the next port — doing
  that left six servers running at once and the owner looking at a stale one.
- **Commit messages must go through a file.** `git commit -F <file>`. A long inline message gets
  mis-parsed and git fails with _"'/' is outside repository"_.
- **`exactOptionalPropertyTypes` is on.** An optional prop needs `?: X | undefined` written out, and
  a `Pick` of optional props will not accept a destructured object.
- **The lint config forbids `as` casts, `!` assertions, and methods passed around unbound.** Write
  store functions as arrow properties, not shorthand methods.
- **Heredocs in Bash break on curly apostrophes and nested quotes.** Use the Write or Edit tool for
  anything with typographic punctuation in it.
- **`COMPONENT-GAP.md` is public and names four colleagues** alongside an audit of their work. Pushed
  by accident, flagged many times, still undecided. **Raise this before doing anything with that
  file.**
- The original repo is still at `dev.azure.com/Motadata/NextGen/_git/motadata-react-library`, still
  developer-owned. Nothing here has been merged back.

---

## Waiting on the design owner

| Question                                                                                                                                                                                                                 | Cost to act                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| **The AI toast sparkle changed shape.** Om's solid four-point diamond became Lucide's outlined `sparkles`, matching the AI button. The most visible change of the icon pass. Keep it, or restore Om's?                   | One line in `ToastBody.tsx`                |
| **Happy with the redrawn `megaphone` and `sparkles`?** They are the only two changed icons in real component code. Both are on the review page. If either is wrong, that one icon can be pinned back to the old drawing. | One file each                              |
| **Add the 815 Lucide icons we do not carry?** Deliberately left out — that would nearly double the public icon list as a side effect of a maintenance refresh. `npm run generate-icons -- --all`.                        | One command, but it is a public API change |
| `COMPONENT-GAP.md` names four colleagues on a public page — strip, rewrite history, or leave it?                                                                                                                         | Minutes either way                         |
| Destructive's hover changed as a bug fix; it measured 4.2 pressed. Keep or revert?                                                                                                                                       | One line                                   |
| `maxLines` for long logs in CodeWell — a 200-line log still grows forever                                                                                                                                                | Half an hour                               |
| Should the promotional toast's phone-width limit become a token?                                                                                                                                                         | One line                                   |
| The old Tabs icon and badge stories still build theirs by hand. Switch them to the new props?                                                                                                                            | Ten minutes                                |
