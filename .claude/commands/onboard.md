---
description: Set up this project on a new machine and learn it end to end, then report what you found and stand ready to build.
---

You are onboarding someone onto this design system for the first time. Do the work below in order,
then give the briefing at the end. Be concise while working — the briefing is the deliverable, not a
running commentary.

Assume the person is a **designer, not a developer**. Explain in plain language, and when something
looks wrong, say so rather than working around it.

## The project

|            |                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------- |
| Repository | `https://github.com/niravbhatt1317/nextgen-design-system`                                         |
| Live docs  | `https://niravbhatt1317.github.io/nextgen-design-system/`                                         |
| What it is | React component library, owned by design, built so AI-generated UI comes out on-system by default |
| Stack      | React 18, TypeScript strict, Tailwind (`mdt-` prefix), Radix UI, CVA, Vite, Vitest, Storybook     |

## 0. If the project is not cloned yet

Normally `/onboard` runs inside the repository and you can skip this. But if you were handed these
instructions from outside a clone:

- **Ask where the person wants the project to live before cloning anything**, and suggest a sensible
  default for their operating system. Do not pick for them.
- Check the target folder does not already exist. **Never overwrite an existing folder.**
- Clone the repository there, then continue from step 1.

## 1. Check the environment

- Node version against `.nvmrc`. If it is older, say so and stop — nothing else will work.
- Whether `node_modules` exists and actually runs (`npx tsc --version`). A `node_modules` copied
  between operating systems produces `Permission denied` on every binary; the fix is
  `rm -rf node_modules && npm install`, not debugging.

## 2. Install what is missing

- `npm install` if `node_modules` is absent or broken.
- `npx playwright install chromium` unless the browser is already present. This is a separate
  download `npm install` does not perform, and without it every browser check fails with
  `Executable doesn't exist at .../chrome-headless-shell`.

Skip either step if it is already done. Do not reinstall for the sake of it.

## 3. Offer the git conveniences

Check whether `git config --get alias.start` and `git config --get fetch.prune` are set. If not,
**ask** before setting them — they are global, so they affect the person's other repositories:

```bash
git config --global alias.start '!f() { if [ -z "$1" ]; then echo "usage: git start <name>/<what-changed>"; return 1; fi; git checkout main && git pull --prune && git checkout -b "$1"; }; f'
git config --global fetch.prune true
```

Also check `git config user.name` and `user.email` are the person's own, and say so if they look
wrong — commits attributed to the wrong person are tedious to correct later.

## 4. Learn the project

Read these, in this order. They are the whole rulebook:

| File                     | What you need from it                                                              |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `CLAUDE.md`              | The rules. The four that matter most: tokens, icons, class order, dark mode        |
| `docs/DESIGNER-GUIDE.md` | How people work here — branching, review, verification                             |
| `TOKENS.md`              | Every token that exists                                                            |
| `MISSING-TOKENS.md`      | Every category that does not exist yet — this is what "the token is missing" means |
| `COMPONENT-GAP.md`       | This library against the four product design systems, and what is still missing    |
| `HANDOFF.md`             | What the last substantial session did and what it left open                        |

Then look at the code itself, without reading it all:

- `src/components/` — the component list and the five-file folder shape
- `src/components/index.ts` — note it is **alphabetical on purpose**
- `src/styles/globals.css` — how tokens are defined for light and dark
- One complete component as a worked example — `Badge` is a good one: CVA variants, semantic
  tokens, a `compoundVariants` reset
- `component-catalog.json` — the machine-readable variant catalogue

**Do not read `src/components/Icon/icons/`.** It is 1209 generated files and will teach you nothing.

## 5. Check the current state

Run these and report the real numbers, not the ones the documentation claims:

```bash
npm run typecheck
npm run lint
npm test
npm run check:tokens
```

Also fetch the open issues (`gh issue list`) if `gh` is authenticated — that is the work queue.

## 6. Brief the person

Finish with a short briefing, written for someone who has not seen this codebase:

1. **What this is** — one paragraph, including what makes it "AI-ready"
2. **The state right now** — components, tokens, stories, tests, and whether everything passes
3. **The four rules**, one line each, and what breaking each one already cost
4. **What is missing** — the highest-priority unbuilt components, and why they rank that way
5. **Anything that looked wrong** while you were reading — a documented rule the code does not
   actually follow, a stale number, a broken link. Say so plainly rather than smoothing over it.
6. **What to do next** — the exact command to start a branch, and which issues are unclaimed

Then stop and wait. Do not start building anything.

## Rules that apply from this moment

- **`main` is protected.** Never commit to it. Branch, pull request, green CI, merge.
- **Branches are named `person/what-changed`** — `sam/banner`, `sam/banner-spacing`.
- **If a token you need does not exist, stop and say so.** Do not hardcode a value, do not
  approximate with a nearby token, and never add a colour.
- **Verify visual work in a real browser, in both themes.** Tests pass while pixels are wrong.
