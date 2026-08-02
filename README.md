# NextGen Design System

A React component library owned by the design team, built so that **AI-generated UI comes out
on-system by default**.

Most design systems are written for people to read. This one is written for a machine to consume
first: every component's variants are extracted to a machine-readable catalogue, every design
decision is a named token, and the rules are explicit enough that a model can follow them without
guessing.

**[→ Browse the live Storybook](https://niravbhatt1317.github.io/nextgen-design-system/)**

---

## What's in here

|                       |                                                                      |
| --------------------- | -------------------------------------------------------------------- |
| **46 components**     | Button, Input, Select, Dialog, Toast, Tabs, Table, Sidebar, and more |
| **1209 icons**        | Cut from Lucide's own source, no runtime dependency                  |
| **113 colour tokens** | 88 primitives, 25 semantic pairs — light and dark                    |
| **522 stories**       | Every variant of every component, in both themes                     |

---

## Features

- **Accessible** — every overlay and form control is built on [Radix UI](https://www.radix-ui.com)
  primitives (16 components: Dialog, Select, Popover, Tooltip, Tabs, Switch, Checkbox, Radio and
  more), so keyboard navigation, focus management and screen-reader semantics come from a primitive
  that already got them right. Storybook runs `addon-a11y` on every story, and the end-to-end suite
  runs axe. The target is WCAG 2.1 AA.
- **Themeable** — every colour, radius and shadow is a CSS variable, not a hardcoded value. Light and
  dark both ship in `globals.css`, and a product can override any token without forking a component.
- **Type-safe** — TypeScript `strict`, and then five settings beyond it: `noUncheckedIndexedAccess`,
  `exactOptionalPropertyTypes`, `noUnusedLocals`, `noUnusedParameters` and
  `noFallthroughCasesInSwitch`. Zero `any` in the codebase.
- **Tree-shakeable** — `sideEffects` is declared and the build emits per-component chunks, so
  importing `Button` doesn't drag in `Table`.
- **Tested** — 1382 unit tests across 46 components, run on every push alongside lint, typecheck and
  both builds.
- **Documented** — 522 stories, every variant of every component, in both themes, with live prop
  controls.
- **Machine-readable** — `component-catalog.json` extracts every component and every variant straight
  from the CVA definitions, so a model can be _told_ what exists instead of guessing at it. This is
  the part that makes "AI-ready" a claim rather than a slogan.

---

## Using it in a product

```bash
npm install @mtdt/nextgen-design-system
```

```tsx
import '@mtdt/nextgen-design-system/styles.css';
import { Button, Callout, Dialog, DialogContent, DialogTitle } from '@mtdt/nextgen-design-system';
```

**The stylesheet is not optional and is not automatic.** Every component here is Tailwind utility
classes with an `mdt-` prefix; without that one import you get correct, accessible, completely
unstyled markup — and no error to tell you why. Import it once, at the root of your app.

**You do not need Tailwind to use this.** The stylesheet ships compiled, so the package works in any
React app. If you _do_ use Tailwind, the `mdt-` prefix means our classes cannot collide with yours —
that is what the prefix is for.

React 18 or 19, as a peer dependency. Both ESM and CommonJS, with types for each.

### Checking a build before it goes out

```bash
npm run build          # includes the stylesheet and the CommonJS types
npm run verify:package # everything `exports` promises actually exists
npm pack               # the tarball, to install in a scratch app and try
```

That last step is worth doing rather than trusting. This package spent months naming
`dist/styles.css` in its `exports` map without ever building the file: `npm pack` succeeded,
`npm install` succeeded, and every component rendered unstyled. A green build and a working artifact
are two different claims.

## Looking at it

You don't need to install anything. The Storybook is published on every change:

**https://niravbhatt1317.github.io/nextgen-design-system/**

Use the sidebar to browse components, the **Controls** tab to change props live, and the
**theme toggle** in the toolbar to flip the whole page between light and dark.

---

## Running it yourself

You need [Node.js 20+](https://nodejs.org) and npm.

```bash
git clone https://github.com/niravbhatt1317/nextgen-design-system.git
cd nextgen-design-system
npm install
npm run storybook
```

Storybook opens at http://localhost:6006.

> **Always `git clone` — never copy the folder.** Copying carries `node_modules` across, and a
> `node_modules` built on one operating system does not work on another. If you copied the folder
> and nothing runs, delete `node_modules` and run `npm install` again.

### New here?

Start with **[docs/ONBOARDING.md](./docs/ONBOARDING.md)** — nothing to nothing-to-first-merged-change.

If you use Claude Code, the whole setup is one command. Clone, open the folder, start a session and
type:

```text
/onboard
```

It installs what's missing, verifies the project runs, reads the entire rulebook, and briefs you on
what this system is and what's missing from it — then waits for you to pick something to build.

After that, **[docs/DESIGNER-GUIDE.md](./docs/DESIGNER-GUIDE.md)** is the day-to-day working guide.

---

## The rules that matter

Four rules carry most of the weight. Breaking any of them is how this system drifts.

### 🔒 Components always use tokens

If the token you need doesn't exist, **stop and say so** — don't hardcode a value, approximate with
a nearby token, or reach for a raw hex. A missing token is a design decision for the owner to make.

- Every token that exists → [`TOKENS.md`](./TOKENS.md)
- Every category that doesn't exist yet → [`MISSING-TOKENS.md`](./MISSING-TOKENS.md)
- Where the rule is currently broken → [`TOKEN-REPORT.md`](./TOKEN-REPORT.md)

**Do not add colours.** The palette is 88 primitives and 25 semantic pairs, and it stays that size
unless the design owner decides otherwise. A second green makes "which green" a live question on
every component after it.

### 🎨 Lucide is the only icon source

One icon means one thing — never use the same glyph for two features. Every icon goes through
`<Icon name="..." />`; never hand-draw an inline `<svg>`. The artwork is copied in rather than
imported, so products using this library gain no icon dependency and no icon changes shape without
a commit.

### ⚠️ Class order matters

`cn()` merges classes with the `mdt-` prefix registered, which means **the last class wins**.

```tsx
// ❌ `px-3` sets both sides, overwriting the `pr-9` written before it
cn(closable && 'mdt-pr-9', 'mdt-px-3 mdt-py-1.5');

// ✅ the narrower rule goes last
cn('mdt-px-3 mdt-py-1.5', closable && 'mdt-pr-9');
```

### 👀 Verify in a browser, not just in tests

Unit tests pass while the pixels are wrong. Badge text once measured 2.0:1 contrast — unreadable,
every test green. After any visual change, render the story in a real browser **in both themes**
and look at it.

Full detail on all four lives in [`CLAUDE.md`](./CLAUDE.md).

---

## Conventions

**CSS classes** all carry the `mdt-` prefix:

```tsx
className = 'mdt-flex mdt-items-center mdt-bg-primary'; // ✅
className = 'flex items-center bg-primary'; // ❌
```

**Colours** are always semantic, never hardcoded:

```tsx
'mdt-bg-primary mdt-text-primary-foreground'; // ✅
'mdt-bg-blue-500 mdt-text-white'; // ❌
```

**Every component** is a folder of five files:

```text
src/components/Button/
├── Button.tsx           # the component
├── Button.types.ts      # its types
├── Button.test.tsx      # its tests
├── Button.stories.tsx   # its Storybook page
└── index.ts             # its exports
```

---

## Commands

| Command                   | What it does                                                      |
| ------------------------- | ----------------------------------------------------------------- |
| `npm run storybook`       | Browse components at localhost:6006 — **the one you'll use most** |
| `npm test`                | Run every test                                                    |
| `npm run lint`            | Check code style                                                  |
| `npm run typecheck`       | Check types                                                       |
| `npm run check:tokens`    | Report hardcoded values that should be tokens                     |
| `npm run build`           | Build the library                                                 |
| `npm run build-storybook` | Build the static Storybook site                                   |
| `npm run generate-icons`  | Re-cut every icon from Lucide's source                            |

---

## How changes reach the live site

Every push to `main` runs [CI](./.github/workflows/ci.yml) — lint, typecheck, tests, token check,
and both builds — then [redeploys Storybook](./.github/workflows/storybook.yml) to GitHub Pages.
A change is live a few minutes after it merges.

---

## Origin

This library began life on Azure DevOps
(`dev.azure.com/Motadata/NextGen/_git/motadata-react-library`), developer-owned. It now lives here,
and ships as `@mtdt/nextgen-design-system`,
owned by design, with CI rebuilt to match. Nothing here has been merged back.

## License

MIT — see [LICENSE](./LICENSE).
