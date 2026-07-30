# Designer's guide

This design system is owned by design, not by engineering. That means the two of us decide what a
Button looks like, what a token is worth, and when something is ready — and we make those changes
ourselves rather than filing a ticket.

This guide is how you do that. It assumes no terminal experience and builds up from there.

---

## First: just look at it

**https://niravbhatt1317.github.io/nextgen-design-system/**

Nothing to install. This rebuilds automatically every time either of us changes anything, so it is
always current.

Three things worth knowing about the interface:

- **The sidebar** lists every component. Each one has a **Docs** page (everything at once) and
  individual stories (one variant at a time).
- **The Controls tab** at the bottom lets you change props live — switch a Button's variant, turn on
  loading, type a different label. Nothing you do here is saved; it's a sandbox.
- **The theme toggle** in the top toolbar flips the entire page between light and dark. Always check
  both. Most bugs this system has had were visible in exactly one theme.

---

## Making a change

There are two ways in. Start with the first; move to the second when it stops being enough.

### Path A — change something without a terminal

Good for: fixing wording, editing docs, adjusting a colour token, changing a single value.

1. Find the file on GitHub and click the **pencil icon** (Edit this file).
2. Make your change.
3. At the bottom, choose **"Create a new branch for this commit and start a pull request."**
   Give the branch a short name like `fix-toast-wording`.
4. Click **Propose changes**, then **Create pull request**.

That's it. GitHub will automatically run every check — lint, types, all 1382 tests, the token
check, and both builds. You'll see a green tick or a red cross within a few minutes.

**If it goes red**, click **Details** on the failed check to see why. Nothing is broken and nothing
is live — that's what the check is for. Fix it with another edit on the same branch, or close the
pull request.

**If it goes green**, ask the other person to look, then **Merge**. The live Storybook updates a few
minutes later.

### Path B — run it on your own machine

Necessary for: building a new component, anything visual, anything you want to _see_ before pushing.

**One-time setup.** Install [Node.js 20 or newer](https://nodejs.org) — take the LTS version — then:

```bash
git clone https://github.com/niravbhatt1317/nextgen-design-system.git
cd nextgen-design-system
npm install
```

`npm install` takes a few minutes the first time. It only needs doing again when dependencies change.

**Then install the browser Playwright drives.** This is a separate download that `npm install` does
not do for you:

```bash
npx playwright install chromium
```

Skip it and anything that opens a real browser — the `e2e/` tests, or screenshotting a story to
check it — fails with `Executable doesn't exist at .../chrome-headless-shell`. It looks like a
broken project; it is a missing download. Once per machine.

**Every time you work:**

```bash
npm run storybook
```

Storybook opens at http://localhost:6006 and reloads as you save. This is where you'll spend
your time.

**Before you push**, run the same checks CI will run:

```bash
npm test
npm run lint
npm run typecheck
```

All three should pass silently. Silence is success.

> ⚠️ **Always clone. Never copy the folder.** `node_modules` is built for the operating system it was
> installed on — copying a folder from Windows to Mac (or the reverse) produces a project where
> nothing runs. If that happens, `rm -rf node_modules && npm install` fixes it.

---

## Working together without stepping on each other

### One change, one branch, one pull request

**Never commit straight to `main`.** `main` is what's live, and it is protected — a direct push is
rejected. Every change goes through a branch and a pull request, even a one-word fix. It costs about
thirty seconds and it is the whole safety net for a two-person team.

```bash
git checkout main && git pull     # always start from current main
git checkout -b nirav/banner      # your name, then what's changing
npm run storybook                 # build it, and look at it in both themes
npm test && npm run lint          # the same checks CI will run
git add -A
git commit -F msg.txt             # message in a file - see below
git push -u origin nirav/banner
gh pr create
```

CI runs on the pull request. Merge when it's green.

### Naming a branch: `your-name/what-changed`

```text
nirav/banner                 pranjal/stat-tile
nirav/banner-spacing         pranjal/stat-tile-no-data
nirav/banner-dark-border     pranjal/fix-toast-gap
```

The name prefix means the branch list tells you at a glance who is on what — which is the genuinely
useful half of "a branch each".

**Name it after the change, not the component.** You will touch Banner many times: the first build,
a spacing fix three weeks later, a dark border after that. If all three are called `nirav/banner`
you collide with your own deleted branch names, and six months of history reads as one word.

### Starting a branch in one command

Set these up once per machine:

```bash
git config --global alias.start '!f() { if [ -z "$1" ]; then echo "usage: git start <name>/<what-changed>"; return 1; fi; git checkout main && git pull --prune && git checkout -b "$1"; }; f'
git config --global fetch.prune true
```

Then starting work is one line, and it always pulls latest `main` first — so you can't forget:

```bash
git start nirav/banner
```

`fetch.prune` makes deleted branches disappear from your local list instead of lingering as stale
references.

### Branches are disposable — this is the part that trips people up

A merged branch is finished. Its work is in `main` now, permanently. That is why the branch gets
deleted straight after merging.

**So what if Banner needs changing after five more components have shipped?** You do _not_ go back
to the old `nirav/banner` branch. That branch is stale, and deleted. You cut a **new** one from
current `main`:

```bash
git checkout main && git pull
git checkout -b nirav/banner-spacing
```

That branch has Banner **and** all five later components, because `main` has all of it.

|           |                                                                                 |
| --------- | ------------------------------------------------------------------------------- |
| Day 1     | `nirav/banner` → pull request → merge. **Banner is in `main`.** Branch deleted. |
| Days 2–10 | Five more components merge. `main` = Banner + 5.                                |
| Day 11    | `nirav/banner-spacing` cut from `main` — contains Banner **and** all 5.         |

A branch is not a shelf where a component lives; it is a shopping trip. Once the shopping is put
away, the trip is over. You do not return to Tuesday's trip to buy milk on Friday.

The staleness worry is real — but it is what a **long-lived** branch causes, and what cutting a
fresh one every time prevents. This is also exactly why a single permanent branch per person does
not work: your finished Banner would be stuck behind your half-written Card, unable to ship.

### One branch per thing you'd merge or revert as a unit

Usually that is one component. Not always:

- Three small documentation fixes → one branch is fine
- Banner, plus the token it needs, plus its stories → one branch, it's all one thing
- Banner and Card → always two, because they ship independently

### Divide the work by component, not by file

A component is a self-contained folder:

```text
src/components/Card/
├── Card.tsx  Card.types.ts  Card.test.tsx  Card.stories.tsx  index.ts
```

If one of us builds `Card` and the other builds `Banner`, we touch **no files in common** and git
merges the two without a word. So the unit of work is a whole component, and we claim one before
starting it — a GitHub Issue each, so it's visible rather than remembered.

### The one file that always collides

`src/components/index.ts`. Every new component adds an export line there, so it is the single file
both of us are guaranteed to edit.

**It is sorted alphabetically, and that is deliberate.** Add your component in its alphabetical
place — never append to the end. When the list was in append-order, both of us wrote at the last
line and conflicted on every pull request. Alphabetical insertion puts two new components hundreds
of lines apart, and git merges them silently.

### The one thing to talk about first

`src/styles/globals.css`. If either of us needs a **new token**, that is a design decision, not an
implementation detail — so agree it before writing it. Two people adding tokens in parallel is how a
palette grows a second green, and then "which green" becomes a live question on every component
after it. See the token rule below.

### Three habits that matter more than the commands

- **Pull `main` before starting anything.** The commonest two-person collision is one of us working
  from a copy that is three days old.
- **Merge small and often.** A branch that lives a week diverges from everything. One component,
  merged, then the next.
- **Review each other's pull requests for _design_, not correctness.** CI already checks that it
  works. What CI cannot check: does this match the system, does it need a token we don't have, is
  that icon already being used for something else.

### Commit messages

Write the message in a file and pass it with `-F`:

```bash
git commit -F msg.txt
```

A long message passed inline gets mis-parsed by the shell here and git fails with
_"'/' is outside repository"_. Conventional prefixes (`feat:`, `fix:`, `docs:`) are suggested but
never enforced — your commit will not be rejected for its wording.

---

## The rules

Four rules carry most of the weight of this system. They exist because breaking each one already
caused a real bug here.

### 🔒 Components always use tokens

Every colour, radius and shadow comes from a named token. If the token you need doesn't exist,
**stop and say so** — don't hardcode a hex, and don't approximate with a nearby token.

- What exists → [`TOKENS.md`](../TOKENS.md)
- What doesn't exist yet → [`MISSING-TOKENS.md`](../MISSING-TOKENS.md)

**Don't add colours.** The palette is 88 primitives and 25 semantic pairs. If a borrowed design needs
a colour we don't have, map it to the nearest step we own and say what shifted. A second green makes
"which green" a live question on every component after it.

_Spacing and type are the exception — they have no tokens at all yet, so Tailwind's default steps
(`px-3`, `text-sm`) are correct rather than a violation. A raw `p-[13px]` is not._

### 🎨 Lucide is the only icon source

One glyph means one thing — never reuse an icon for a second feature. An icon is often the only
label a control has, so a repeated glyph teaches the wrong meaning. Every icon goes through
`<Icon name="..." />`; never paste an inline `<svg>`.

### ⚠️ The last class wins

When two classes conflict, the one written **last** takes effect:

```tsx
cn(closable && 'mdt-pr-9', 'mdt-px-3'); // ❌ px-3 wipes out pr-9
cn('mdt-px-3', closable && 'mdt-pr-9'); // ✅ narrower rule last
```

### 👀 Look at it in a browser

Tests pass while the pixels are wrong. Badge text once measured 2.0:1 contrast — unreadable, every
test green. After any visual change, open the story in both themes and actually look.

**If you check stories automatically, check the built site — never the dev server.**

`npm run storybook` compiles each story the first time something asks for it. That is exactly what
you want while working, and exactly wrong for a script: ask it for hundreds of stories at once and
compilation queues up behind itself, so stories report as broken when they are merely still
building. A sweep of all 522 stories against the dev server reported **467 of them empty**. Every
one was fine. The only stories that "passed" were the handful already compiled by being looked at a
minute earlier — which is the dangerous half, because a sweep that only visits what it already
warmed up will happily report all-clear.

Build it first, serve the output, and point the script at that:

```bash
npm run build-storybook                       # produces storybook-static/
npx http-server storybook-static -p 6007      # serve it
```

Re-run against `localhost:6007` and the same sweep reports **522 of 522, zero failures** — because
nothing is compiling on demand. This is also what CI builds and what GitHub Pages serves, so it is
the honest target.

One more trap: **some surfaces render nothing until you click.** Dialogs, toasts and popovers are
empty until something opens them. "0 changed pixels" on those stories means you photographed an
empty page, not that nothing changed.

---

## When something goes wrong

| What you see                                            | What it means                                              | What to do                                         |
| ------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------- |
| `Permission denied` on any npm command                  | `node_modules` came from another operating system          | `rm -rf node_modules && npm install`               |
| `Executable doesn't exist at .../chrome-headless-shell` | Playwright's browser was never downloaded                  | `npx playwright install chromium`                  |
| A sweep says most stories are empty                     | You pointed it at the dev server, which compiles on demand | Build first, serve `storybook-static`              |
| Red X on your pull request                              | A check failed                                             | Click **Details** — it names the file and line     |
| Storybook shows a spinner forever                       | It compiles pages on demand                                | Wait ~10s on first load of a page                  |
| A `dark:` class does nothing                            | Probably the config trap — see `CLAUDE.md`                 | Don't "simplify" `tailwind.config.ts`              |
| Changed `tailwind.config.ts`, nothing happened          | Tailwind config needs a restart                            | Stop Storybook, start it again on 6006             |
| `the branch is not fully merged` when deleting          | False alarm — squash-merge lands work as a new commit      | `git diff <branch> main`; if empty `git branch -D` |
| A deleted branch still appears in `git branch -a`       | Stale remote-tracking ref                                  | `git fetch --prune`                                |

---

## Where things live

| File                                        | What's in it                                           |
| ------------------------------------------- | ------------------------------------------------------ |
| [`CLAUDE.md`](../CLAUDE.md)                 | The full rulebook — read before any substantial change |
| [`HANDOFF.md`](../HANDOFF.md)               | What the last working session did, and what's open     |
| [`TOKENS.md`](../TOKENS.md)                 | Every design token that exists                         |
| [`MISSING-TOKENS.md`](../MISSING-TOKENS.md) | Every category that doesn't exist yet                  |
| [`COMPONENT-GAP.md`](../COMPONENT-GAP.md)   | This library vs the four product design systems        |
| `src/components/`                           | All 46 components, one folder each                     |
| `src/styles/globals.css`                    | Every design token, light and dark                     |

The other files in `docs/` are from the developer-owned era. They're accurate about how the code
works, but they describe a SonarQube pipeline that doesn't run against this repository.
