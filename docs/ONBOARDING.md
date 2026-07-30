# Onboarding

Getting from nothing to your first merged change. Assumes no prior knowledge of this repository, and
very little terminal experience.

If you only want to _look_ at the design system, you do not need any of this —
**[browse the live Storybook](https://niravbhatt1317.github.io/nextgen-design-system/)**. It rebuilds
on every change, so it is always current.

---

## The short version

### Starting from nothing — no folder, nothing cloned

Open Claude Code anywhere on your machine and paste this. It is the whole setup:

```text
Set me up to work on the NextGen Design System.

Repository:  https://github.com/niravbhatt1317/nextgen-design-system
Live docs:   https://niravbhatt1317.github.io/nextgen-design-system/

Please do all of this, in order:

1. ASK ME FIRST where I want the project to live, and suggest a sensible default
   for my operating system. Do not clone anything until I answer. Check the
   folder does not already exist, and never overwrite an existing one.
2. Clone the repository there.
3. Check I have Node 20 or newer. If not, stop and tell me.
4. Run npm install.
5. Do NOT download any test browser without asking me. Run
   "npx playwright install --dry-run" to see what is already there, explain that
   these are Playwright's own private builds and have nothing to do with whatever
   browser I personally use, tell me the sizes, and let me choose: nothing at all
   (everyday work needs none), chromium only for visual checks, or all three
   engines if I want the full e2e suite.
6. Check my git user.name and user.email are set to me, and tell me if they are
   not - commits attributed to the wrong person are tedious to fix later.
7. ASK before setting anything global, then optionally add the git alias
   "start" and fetch.prune, as described in the repo's docs/ONBOARDING.md.
8. Read the file .claude/commands/onboard.md in the cloned repo and follow it
   exactly. That is this project's own onboarding routine - it will tell you
   which files to read to understand the design system, which to skip, and what
   to check.
9. Brief me on what you found, then STOP. Do not start building anything.

I am a designer, not a developer. Explain what you are doing in plain language,
and tell me if anything looks wrong rather than working around it.
```

Claude will ask where to put it, clone it, set everything up, learn the whole design system, and
brief you. Then it waits for you to pick something to build.

### If you already have the project cloned

Start a Claude session in the project folder and type:

```text
/onboard
```

Same routine, minus the cloning.

---

The rest of this page explains what those are doing, and how to do it by hand if you would rather.

---

## Before you start

**You need to be a collaborator on the repository.** Ask the design owner for an invitation, and
accept it at
[github.com/niravbhatt1317/nextgen-design-system/invitations](https://github.com/niravbhatt1317/nextgen-design-system/invitations).
Without it you can read everything but push nothing, and you will only discover that at the end of
your first change.

**You need [Node.js 20 or newer](https://nodejs.org).** Take the LTS build. Check with `node -v`.

### ⚠️ If you already have an older copy of this project

Some people have a folder from when this library lived elsewhere. **Do not reuse it, and do not
re-point its remote at this repository.** The two share no common ancestor — this repository began
with a fresh `git init` — so pushing from the old folder is rejected as unrelated histories, and
forcing it through would destroy what is here.

Before you abandon that folder, check whether it holds work nobody else has:

```bash
cd <your-old-folder>
git status
```

If anything is listed, **stop and raise it with the design owner** before going further. If it is
clean, you have lost nothing — clone fresh and carry on.

---

## Setting up

### Clone

```bash
git clone https://github.com/niravbhatt1317/nextgen-design-system.git
cd nextgen-design-system
```

> **Always clone. Never copy the folder from someone else.** `node_modules` is compiled for the
> operating system it was installed on, so a folder copied from Windows to macOS — or the reverse —
> produces a project where every command fails with `Permission denied`. If that happens to you:
> `rm -rf node_modules && npm install`.

### Open it in your editor and start Claude there

```bash
code .
```

Start a **new** Claude session with this folder open. It reads `CLAUDE.md` on start, so it picks up
the project's rules automatically.

If you have an existing session pointed at a different folder and want to keep its context, you can
add this one with `/add-dir <full path>` — but a fresh session is tidier, because a session carrying
context about a different repository will keep reaching for paths that no longer exist.

### Let Claude do the rest

```text
/onboard
```

It will:

1. Check your Node version and whether the installed dependencies actually work
2. Run `npm install` if needed, and **ask** before downloading any test browser
3. Offer to set up two git conveniences (asking first, since they are global)
4. Read the rulebook — `CLAUDE.md`, the designer guide, the token files, the component gap
5. Run typecheck, lint, the full test suite and the token check, and report the **real** numbers
6. Brief you on what this system is, what the rules are, and what is missing

Then it stops and waits. It will not start building anything on its own.

### Or do it by hand

```bash
npm install
```

### Test browsers — optional, and probably not yet

**Playwright's browsers are not your browser.** They are private builds kept in a cache folder.
Installing them does not change your default browser, does not touch the Chrome, Firefox, Edge, Arc
or Safari you already use, and you will never see one open unless a test runs it. Whatever you
personally browse with makes no difference here.

They are also large, so only install what you actually need:

| What you want to do                                        | What you need     | Rough size |
| ---------------------------------------------------------- | ----------------- | ---------- |
| Unit tests, lint, typecheck, Storybook — the everyday work | **Nothing**       | —          |
| Screenshot stories to check a visual change                | Chromium          | ~500 MB    |
| Run the full `npm run test:e2e` suite                      | All three engines | Over 1 GB  |

```bash
npx playwright install --dry-run                 # see what you already have
npx playwright install chromium                  # visual checks only
npx playwright install chromium firefox webkit   # the whole e2e suite
```

The e2e suite genuinely needs all three: `playwright.config.ts` defines chromium, firefox and webkit
projects, and the repository carries 13 committed snapshots for each. Chromium alone leaves two
thirds of it failing.

**You can skip this entirely for now.** Everything else works without it. You will know when you
need it, because you will see:

```text
Executable doesn't exist at .../chrome-headless-shell
```

That is a missing download, not a broken project. Once per machine.

Two git conveniences, also once per machine:

```bash
git config --global alias.start '!f() { if [ -z "$1" ]; then echo "usage: git start <name>/<what-changed>"; return 1; fi; git checkout main && git pull --prune && git checkout -b "$1"; }; f'
git config --global fetch.prune true
```

And check your commits will be attributed to you:

```bash
git config user.name
git config user.email
```

---

## Check it works before you start

```bash
npm test          # ~1382 tests, about 20 seconds
npm run lint
npm run typecheck
npm run storybook # opens http://localhost:6006
```

The first three should pass **silently**. Silence is success. Storybook should open and let you
browse every component, with a theme toggle in the toolbar.

If any of them fail before you have changed anything, something is wrong with the setup rather than
with you — say so rather than working around it.

---

## Your first change

### 1. Claim something

Open [the issues](https://github.com/niravbhatt1317/nextgen-design-system/issues) and comment on the
one you are taking. This is the entire coordination mechanism — without it, two people build the
same component.

Issues are ranked by how many of the four product design systems built the same thing independently.
Anything labelled **`4-of-4`** was needed by every team without them talking to each other, so it is
not optional.

### 2. Branch

```bash
git start your-name/what-youre-changing
```

Or without the alias:

```bash
git checkout main && git pull
git checkout -b your-name/what-youre-changing
```

Branches are named **`person/what-changed`** — `sam/banner`, `sam/banner-spacing`,
`sam/fix-toast-gap`. Name it after the change, not the component: you will touch Banner many times,
and three branches all called `sam/banner` collide with each other.

**Never commit to `main`.** It is protected and will reject you.

### 3. Build it

A component is a folder of five files:

```text
src/components/Banner/
├── Banner.tsx           # the component
├── Banner.types.ts      # its types
├── Banner.test.tsx      # its tests
├── Banner.stories.tsx   # its Storybook page
└── index.ts             # its exports
```

Export it from `src/components/index.ts` **in alphabetical position** — that file is sorted on
purpose, so that two people adding components at once do not collide.

Keep `npm run storybook` open while you work. It reloads as you save.

### 4. Check it the way CI will

```bash
npm test && npm run lint && npm run typecheck
```

And **look at it in a real browser, in both themes.** Tests pass while pixels are wrong — badge text
here once measured 2.0:1 contrast, unreadable, with every test green.

### 5. Open a pull request

```bash
git add -A
git commit -F msg.txt          # message in a file, not inline
git push -u origin your-name/what-youre-changing
gh pr create
```

CI runs automatically. When it is green, ask the other designers to look, then merge. The live
Storybook updates a few minutes later.

Reviews here are for **design**, not correctness — CI already checked that it works. What CI cannot
check: does this match the system, does it need a token we do not have, is that icon already used
for something else.

---

## The four rules

These exist because breaking each one already caused a real bug in this repository.

### 🔒 Components always use tokens

Every colour, radius and shadow comes from a named token. **If the token you need does not exist,
stop and say so** — do not hardcode a value, and do not approximate with a nearby token. A missing
token is a design decision for the owner to make.

**Do not add colours.** The palette is 88 primitives and 25 semantic pairs and it stays that size. If
a borrowed design needs a colour we do not have, map it to the nearest step we own and say what
shifted — a second green makes "which green" a live question on every component after it.

_Spacing and type are the exception: they have no tokens at all yet, so Tailwind's default steps
(`px-3`, `text-sm`) are correct rather than a violation. A raw `p-[13px]` is not._

### 🎨 Lucide is the only icon source

One glyph means one thing — never reuse an icon for a second feature. An icon is often the only label
a control has, so a repeated glyph teaches the wrong meaning. Every icon goes through
`<Icon name="..." />`; never paste an inline `<svg>`.

### ⚠️ The last class wins

`cn()` merges classes knowing the `mdt-` prefix, so when two conflict the one written **last** takes
effect:

```tsx
cn(closable && 'mdt-pr-9', 'mdt-px-3'); // ❌ px-3 wipes out pr-9
cn('mdt-px-3', closable && 'mdt-pr-9'); // ✅ narrower rule last
```

### 👀 Look at it in a browser

In both themes, every time. If you check stories with a script, build first and serve
`storybook-static` — never the dev server, which compiles on demand and will report hundreds of
perfectly good stories as broken.

---

## Where to go next

| File                                            | What is in it                                                 |
| ----------------------------------------------- | ------------------------------------------------------------- |
| [`docs/DESIGNER-GUIDE.md`](./DESIGNER-GUIDE.md) | The working guide — branching, collaboration, troubleshooting |
| [`CLAUDE.md`](../CLAUDE.md)                     | The full rulebook                                             |
| [`TOKENS.md`](../TOKENS.md)                     | Every token that exists                                       |
| [`MISSING-TOKENS.md`](../MISSING-TOKENS.md)     | Every category that does not exist yet                        |
| [`COMPONENT-GAP.md`](../COMPONENT-GAP.md)       | This library against the four product design systems          |
| [`HANDOFF.md`](../HANDOFF.md)                   | What the last substantial session did, and what it left open  |

The other files in `docs/` predate design ownership. They are accurate about how the code works, but
they describe a SonarQube pipeline that does not run against this repository.
