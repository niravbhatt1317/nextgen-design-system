# The migration prompt

Paste everything below the line into a fresh Claude Code session, opened in the
React project you want to migrate. It assumes the session knows nothing.

Send it once. It sets the project up, surveys it, and migrates one flow. After
that, ask for the next flow by name.

---

I need you to migrate this React project onto our company design system,
`@mtdt/nextgen-design-system`. Read this whole message before doing anything.

## Why this is happening

Five teams built the same product in five separate React projects. Only the
colours ended up matching, because colours were the one thing anybody had
written down. Every other part — buttons, dialogs, tables, spacing, empty states
— diverged, and the five will eventually be merged into one product.

The design system exists to stop that. Your job is to make this project use it,
so that when these projects merge they look like one thing.

**I am not a designer and I will not be reviewing your component choices.** You
are making every design-system decision here. Do not ask me which component to
use — look it up. Ask me only about product behaviour you cannot infer from the
code.

## The single most important constraint

**This is a look-and-feel migration. Behaviour must not change.**

- Do not rename routes, change URLs, or alter navigation structure.
- Do not refactor state management, data fetching, or business logic.
- Do not "improve" anything while you are in there. Do not fix unrelated bugs.
- Do not delete features you think are unused.
- If a screen did something before, it does exactly the same thing after.

A migration that also refactors is impossible to review and impossible to
revert. Swap the UI. Nothing else.

## Step 1 — Install and wire it up

```bash
npm install @mtdt/nextgen-design-system
```

Then import the stylesheet **once**, at the root of the app — wherever
`ReactDOM.createRoot` is called, or the top-level `App`:

```tsx
import '@mtdt/nextgen-design-system/styles.css';
```

**This import is load-bearing and fails silently.** Without it every component
renders correct, accessible, and completely unstyled, with no error anywhere. If
anything looks like raw HTML later, check this first.

Confirm the app still builds and runs before continuing.

## Step 2 — Read the rules, then write them into this project

Read `node_modules/@mtdt/nextgen-design-system/AGENTS.md` in full. It is the
design system's own instructions for agents and it governs everything below.

Then create or update **`CLAUDE.md`** in the root of this project, adding this
section (keep anything already in the file):

```markdown
## Design system — @mtdt/nextgen-design-system

This project uses our company design system. **Follow the rules in
`node_modules/@mtdt/nextgen-design-system/AGENTS.md` for every UI change**, not
just ones that mention the design system.

The short version, which does not replace reading that file:

1. **Search before building.** Check `CAPABILITIES.md` and
   `capability-catalog.json` in that package before writing any component.
   Search by what a thing _does_ — a Notification is `Toast`, an Alert is
   `Callout`, a Modal is `Dialog`. There are ~196 components; it very probably
   exists.
2. **Never invent a colour, size or spacing value.** No raw hex, no unprefixed
   Tailwind, no arbitrary values. Use `mdt-` utilities or
   `hsl(var(--mdt-token))`. Prefer semantic tokens (`mdt-bg-primary`) over
   primitives (`mdt-bg-neutral-160`).
3. **Log anything genuinely missing** in `DESIGN-SYSTEM-GAPS.md` at the root of
   this project, including what you searched for.
4. **Verify mechanically after every screen** — grep for hex, arbitrary values
   and unprefixed classes. Do not judge by looking; a hand-built component that
   resembles the real one is worse than one that obviously does not.
```

## Step 3 — Start the gap file

Create **`DESIGN-SYSTEM-GAPS.md`** at the root of this project:

```markdown
# Design system gaps

Things `@mtdt/nextgen-design-system` did not have, found while migrating this
project. Each entry is evidence for the design system team — please keep it
specific.

_Nothing logged yet._
```

Everything you have to hand-build goes here. **Say what you searched for, not
just what was absent** — the next person searches with words, and yours are the
evidence that the words did not work.

## Step 4 — Survey before you touch anything

Do not start migrating yet. First, tell me what is here:

1. **List every screen or flow** in this project, with the route and roughly
   what it does.
2. **List every hand-built UI component** — anything in a `components/`,
   `ui/`, `common/` or `shared/` folder, plus anything defined inline that is
   really a component.
3. **For each one, say what replaces it** in the design system, having actually
   searched the catalogue. Where nothing replaces it, say so and say what you
   searched for.
4. **Flag anything that will be hard** — a bespoke table, a custom date picker,
   anything with a lot of state tangled into its markup.

Show me that as a table and **stop**. I want to see it before you change code.

## Step 5 — Migrate one flow, not the project

When I tell you which flow to start with, migrate **that flow only**.

Work in this order within it:

1. **The page shell** — layout, headings, spacing. Use design-system layout
   parts rather than bespoke wrappers.
2. **Inputs and controls** — buttons, fields, selects, checkboxes.
3. **Composite pieces** — tables, dialogs, banners, empty states.
4. **The leftovers** — anything that did not map cleanly. Hand-build only here,
   and log every one.

Rules while you work:

- **Keep the app running.** Small commits, each one leaving the app working.
- **Do not batch.** Finish and verify one screen before starting the next.
- **Delete the component you replaced** once nothing imports it. A dead
  hand-built `Button` sitting next to the real one is how this drifts back.
- **If a design-system component looks wrong**, it is far more likely you are
  using it wrong than that it is broken. Check its stories in the catalogue
  before working around it — and if you do work around it, log that.

## Step 6 — Verify, mechanically, after every flow

Do not skip this because the screen looks right. Looking right is the failure
mode.

**Pass one — did you actually use the design system?**

Go through every element you touched. For each, search the catalogue again, with
different words than last time. Most often hand-built when they already exist:
buttons, inputs, modals, tooltips, tabs, badges, tables, empty states, banners,
toasts, breadcrumbs, pagination, avatars, keyboard hints, steppers.

**Pass two — are there invented values left?**

```bash
grep -rnE "#[0-9a-fA-F]{3,8}\b" src/ --include=*.tsx --include=*.ts
grep -rnE "\[[0-9]+px\]|\[#" src/ --include=*.tsx
grep -rnE 'className="[^"]*\b(bg|text|border|p|m|gap)-(slate|gray|zinc|blue|red|green|yellow|purple|[0-9])' src/ --include=*.tsx
```

Every hit is either a token you should have used, or a gap to log. There is no
third category.

**Pass three — is the gap file honest?**

Anything you built by hand must appear in `DESIGN-SYSTEM-GAPS.md`. If you built
something and did not log it, log it now. An unlogged workaround becomes
permanent, and unlogged workarounds are exactly how the five projects diverged.

**Pass four — does it still behave the same?**

Click through the flow. Every action that worked before works now, with the same
result. If you cannot verify something by hand, say so rather than assuming.

## Step 7 — Report back

When the flow is done, tell me:

- **What you migrated**, screen by screen
- **Which design-system components you used**
- **What you had to hand-build**, and why the catalogue did not cover it
- **What is in `DESIGN-SYSTEM-GAPS.md`** now
- **Anything you are unsure about** — a component you picked but are not
  confident in, or behaviour you could not verify

Then stop and wait. I will tell you the next flow.

## If you get stuck

- **Everything looks unstyled** → the stylesheet import in Step 1 is missing.
- **A `mdt-` class does nothing** → the stylesheet ships every _token_ but only
  the utility classes the design system's own components use. Use the custom
  property directly: `style={{ background: 'hsl(var(--mdt-blue-50))' }}`.
- **You cannot find a component** → search two or three more ways before
  concluding it is missing. Then log it and build the simplest thing that works,
  using design-system tokens.
- **Something genuinely seems broken in the design system** → do not work around
  it silently. Log it in `DESIGN-SYSTEM-GAPS.md` and tell me.

Start with Step 1 and stop after Step 4's survey.
