<!--
  Fill this in. None of it is enforced by CI, deliberately - but an empty body is
  the single clearest sign a pull request has not been read by its own author.
  Delete any heading that genuinely does not apply, rather than leaving it blank.
-->

## What this changes, in one line

## Reuse — run `npm run find` BEFORE you build

<!-- The load-bearing step. Not what you remember having; what the search returned. -->

- **Reused:**
- **Built new:** <!-- for each: what you searched for, and what came back empty -->
- **Logged in `COMPONENT-GAP.md`:** <!-- anything you looked for and did not find -->

## Checklist

- [ ] **Changeset added** (`npx changeset`) — needed whenever `src/` changes, because the published package comes out different. If it genuinely ships nothing, label the pull request `no changeset`; the label is the record of that decision.
- [ ] **No default changed** — or, if one was, it is **named below** and has its own changeset. A default has no opt-out, so it reaches every consumer silently. `Dialog`'s title size and the icon stroke ladder are both examples of changes that needed saying out loud.
- [ ] **No new colour or token** — or, if one was added, it is named below. A missing token is a design decision for the design owner, not an implementation detail. Anything you needed and could not find goes in `MISSING-TOKENS.md` with its value and the nearest step we own.
- [ ] **Stories for anything new**, including a hook. An exported capability with no story is one the next person rebuilds.
- [ ] **Rendered in a browser, both themes.** Unit tests pass while the pixels are wrong.
- [ ] **No inline `<svg>`** outside `Icon.tsx` and `Spinner.tsx`.
- [ ] **Branch is up to date with `main`** and cut fresh from it, not reopened.

## Defaults, tokens or public names this adds or changes

<!--
  Public names are permanent: `check:api` is a one-way ratchet. List what you are
  adding so it gets read now rather than discovered in a release.
-->

## Anything you want a second opinion on
