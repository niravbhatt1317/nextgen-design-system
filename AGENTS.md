# Rules for agents working in a project that uses this design system

**You are reading this because the project you are working in installed
`@mtdt/nextgen-design-system`. These rules apply to every edit you make in that
project, not just to ones that mention the design system.**

The people you are working for have not chosen which components to use and will
not review that choice. They asked for a screen and expect it to look like the
rest of the product. **You are the one making every design-system decision.**
That is why these rules are absolute rather than advisory.

The problem this exists to fix: five teams built the same product in five
separate React projects. Only the colours matched, because colours were the one
thing somebody had written down. Everything else diverged. You are here to stop
that happening again, and the way it happens again is one reasonable-looking
local decision at a time.

---

## Rule 1 — Search before you build. Every time.

**Before writing any UI, search what already exists.** The catalogue ships with
the package:

```bash
# Everything, human-readable
cat node_modules/@mtdt/nextgen-design-system/CAPABILITIES.md

# Search it — components, hooks, utilities, and what each one is for
grep -i "dialog"  node_modules/@mtdt/nextgen-design-system/CAPABILITIES.md
grep -i "banner"  node_modules/@mtdt/nextgen-design-system/CAPABILITIES.md

# Machine-readable, if you want to filter properly
cat node_modules/@mtdt/nextgen-design-system/capability-catalog.json
```

**Search by what the thing does, not by what you would have called it.** A
component you would name `Notification` is `Toast` here. `Alert` is `Callout`.
`Modal` is `Dialog`. `Snackbar` is `Toast`. `Chip` may be `Badge` or `TagPill`
depending on whether it can be removed. Try two or three words before concluding
it is missing.

**Read what you find before believing it.** The catalogue matches on words near
each other, so a search for "row drag" returns `TableCell` because its
documentation mentions measuring a header row to work out where a dragged column
would land. Adjacent, genuine, and the wrong answer.

There are ~196 components. It is very unlikely the thing you want is absent.

---

## Rule 2 — Never invent a colour, a size, or a spacing value

**This is the rule with no exceptions.**

Forbidden, always:

```tsx
style={{ color: '#0B1628' }}        // no raw hex, ever
className="bg-blue-500"             // no unprefixed Tailwind
className="text-[#333]"             // no arbitrary colour
style={{ padding: '13px' }}         // no invented spacing
```

Correct:

```tsx
className="mdt-bg-primary mdt-text-primary-foreground"
className="mdt-border-border mdt-text-muted-foreground"
style={{ background: 'hsl(var(--mdt-blue-50))' }}   // when you need a raw value
```

**Every colour in this system is a token.** 88 primitives, 25 semantic pairs, six
feedback tones, and an AI gradient — all shipped as CSS custom properties in
`dist/styles.css`, in light and dark. If you think you need a colour that is not
there, you are wrong about the colour, not about the system. Use the nearest
token and log it (Rule 4).

**Use semantic tokens over primitives.** `mdt-bg-primary`, not
`mdt-bg-neutral-160`. The semantic name survives a theme change; the primitive
does not.

**The prefix is `mdt-`.** Every utility class this system provides carries it.
An unprefixed Tailwind class in your markup is either your own project's
Tailwind (fine, if the project has its own) or a mistake (usually). If the
project has no Tailwind of its own, an unprefixed class does nothing at all —
silently.

### One limit you will hit

The stylesheet contains **every token**, but only the **utility classes the
design system's own components use**. If you write `mdt-bg-blue-50` and no
component uses it, that class does not exist and your element will be unstyled
with no error.

When you need a token the utilities do not cover, reach for the custom property
directly:

```tsx
<div style={{ background: 'hsl(var(--mdt-blue-50))' }} />
```

That always works. The tokens always ship.

---

## Rule 3 — Import it correctly, or nothing is styled

```tsx
// Once, at the root of the app. Without this every component renders
// correct, accessible, and completely unstyled — with no error anywhere.
import '@mtdt/nextgen-design-system/styles.css';

import { Button, Dialog, Callout } from '@mtdt/nextgen-design-system';
```

If a screen looks like unstyled HTML, this import is missing. Check it first,
before assuming anything else is wrong.

---

## Rule 4 — When it genuinely does not exist, write it down

If you have searched properly (Rule 1) and the design system truly lacks a
component, or lacks the variant you need, **you may build it — but you must
record it.**

Create or append to **`DESIGN-SYSTEM-GAPS.md`** in the root of the project you
are working in:

```markdown
# Design system gaps

Things `@mtdt/nextgen-design-system` did not have, found while building this
project. Each entry is evidence for the design system team.

## Missing: a component

### Split button

- **Where:** Settings → Integrations, the "Add" control
- **What it needs to do:** a primary action with a dropdown of related actions
- **Searched for:** "split button", "dropdown button", "button menu"
- **What I built instead:** `Button` + `DropdownMenu` composed by hand in
  `src/settings/integrations/AddControl.tsx`

## Missing: a variant

### Callout, `compact` density

- **Where:** Settings → Notifications, inside a table row
- **What it needs to do:** the existing `Callout` at roughly half the padding
- **What I did instead:** `Callout` with `className="mdt-p-2"` overriding it
```

**Say what you searched for, not just what was absent.** The next person
searches with words, and yours are the evidence that the words did not work.

**Anything you build yourself still obeys Rule 2.** A component the design
system does not have is not permission to invent a colour.

---

## Rule 5 — Check your work twice, mechanically

**After finishing any screen or flow, go back over what you wrote and verify
these, one at a time.** Do not skip this because the screen looks right — it
looking right is exactly the failure mode, because a hand-built component that
resembles the real one is worse than one that obviously does not.

**Pass one — did you use the design system at all?**

For each element you created, ask: is there a component in the catalogue that
does this? If yes, replace what you wrote with it. Search again, with different
words than last time.

Things most often hand-built when they already exist: buttons, inputs, modals,
tooltips, tabs, badges, tables, empty states, banners, toasts, breadcrumbs,
pagination, avatars, keyboard-shortcut hints, steppers.

**Pass two — are there any invented values?**

Grep your own changes:

```bash
# Any raw hex you left behind
grep -rnE "#[0-9a-fA-F]{3,8}\b" src/ --include=*.tsx --include=*.ts

# Any arbitrary Tailwind value
grep -rnE "\[[0-9]+px\]|\[#" src/ --include=*.tsx

# Any unprefixed Tailwind colour or spacing
grep -rnE 'className="[^"]*\b(bg|text|border|p|m|gap)-(slate|gray|zinc|blue|red|green|yellow|purple|[0-9])' src/ --include=*.tsx
```

Every hit is either a token you should have used, or a gap for
`DESIGN-SYSTEM-GAPS.md`. There is no third category.

**Pass three — is the gap file honest?**

Anything you built by hand should appear in `DESIGN-SYSTEM-GAPS.md`. If you
built something and did not log it, log it now. An unlogged workaround becomes
permanent, and five unlogged workarounds are how the last five projects
diverged.

---

## What this system deliberately does not have

Do not build these, and do not work around them silently — ask, or log them:

- **A second green, or a second anything.** The palette is fixed at 88
  primitives. If a design calls for a colour that is not there, map it to the
  nearest step and say what shifted.
- **Spacing and type-scale tokens.** The system uses Tailwind's default steps
  for both, on purpose. `mdt-p-3` is normal. `mdt-p-[13px]` is not.
- **Icons other than Lucide.** Every icon goes through `<Icon name="..." />`.
  Do not paste inline `<svg>`. If Lucide has nothing suitable, say what you
  looked for.

---

## The short version

1. **Search first.** ~196 components. It probably exists.
2. **Never invent a colour or a size.** Tokens only, no exceptions.
3. **Import the stylesheet**, or nothing is styled and nothing says so.
4. **Log what is missing** in `DESIGN-SYSTEM-GAPS.md`, with what you searched for.
5. **Check twice afterwards**, mechanically, with grep — not by looking.

If you are unsure whether something counts as a design-system decision: it does.
Ask, or log it. Do not decide quietly.
