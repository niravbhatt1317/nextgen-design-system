# Missing Tokens

A record of every design decision in this system that is **not** currently a token.

[`TOKENS.md`](./TOKENS.md) lists what exists. This file lists what should exist and doesn't —
places where components are silently using framework defaults or hardcoded values instead of a
decision we made on purpose.

> **Why this matters:** a value that isn't a token can't be changed centrally, can't be
> documented, and can't be handed to an AI tool as a rule. Every gap below is somewhere the
> system quietly stops being a system.

**Audited:** 28 July 2026, across all 39 components. Colour re-audited 29 July 2026.

---

## Summary

| Category                             | Status        | Where it leaks                     |
| ------------------------------------ | ------------- | ---------------------------------- |
| **Colour — the quiet-variant pair**  | ❌ Missing    | Badge, Button (7 variants)         |
| **Colour — status tones beyond six** | ⚠️ Decision   | Table cell recipes (status column) |
| Border radius                        | ⚠️ Partial    | One base value only, no scale      |
| Typography — family                  | ✅ Complete   | —                                  |
| Elevation / shadow                   | ✅ Complete   | —                                  |
| Layering / z-index                   | ✅ Complete   | —                                  |
| **Spacing**                          | ❌ Missing    | Every component                    |
| **Type scale (size)**                | ❌ Missing    | Every component                    |
| **Font weight**                      | ❌ Missing    | Most components                    |
| **Letter spacing**                   | ❌ Missing    | Command                            |
| **Opacity**                          | ❌ Missing    | ~25 components                     |
| **Border width**                     | ❌ Missing    | ~10 components                     |
| **Motion — duration & easing**       | ❌ Missing    | ~8 components + all 14 animations  |
| **Breakpoints**                      | ❌ Missing    | Container only                     |
| **Hardcoded sizes**                  | ❌ Violations | 10 shipped components              |

**12 categories missing, 1 partial, 1 set of live violations.**

---

## Colour — status tones beyond six

`BadgeTone` ships six values: `neutral`, `info`, `success`, `warning`, `danger`, `ai`. One of them,
`ai`, is named for what it is for, so borrowing its purple for an unrelated state would make the
name a lie. **Five are usable for status.**

A service-desk lifecycle needs seven distinct states, and the reference design gives each its own
colour — blue, amber, orange, green, grey, purple, red. Per the token rule this was mapped to the
nearest tones we own rather than a seventh colour being invented, and two pairs now share:

| State    | Tone given | Shares with                                      |
| -------- | ---------- | ------------------------------------------------ |
| Reopened | `info`     | Open — defensible: it _is_ open again            |
| On Hold  | `neutral`  | Closed — defensible: nobody is working on either |

So colour carries the _class_ of state and the label carries which one. That is a workable position,
not a bug — but whether a seventh tone should exist is a **palette decision for the design owner**,
not something to settle in a story. Live example: Storybook → Components → Table → Cell Recipes →
**Editable status tag**.

---

## Colour — the quiet-variant pair

Colour used to be the one complete category. It is not, and the gap is worth reading before the
rest, because it is the only one that has already forced components to work around it.

**The gap:** each tone has a token for the loud version and nothing for the quiet one.

| What exists                                               | What is missing                            |
| --------------------------------------------------------- | ------------------------------------------ |
| `--mdt-success` — the solid green fill                    | a **pale** green to tint a background with |
| `--mdt-success-foreground` — white, for text on that fill | a **deep** green to write on that tint     |
| same for `destructive`, `warning`, `info`                 | same for all four                          |

Two things follow from that, and both are already in the code:

**1 · A tinted button or badge has to reach for the primitive ramps.**
`Badge` builds all six of its tones from `green-10` / `green-80` style pairs with `dark:` flips,
and `Button` now does the same for its seven quiet variants. Neither is hardcoding — the ramps are
tokens — but neither is using a semantic token either, so the pairing is a decision repeated in two
places instead of stated once.

**2 · A tone cannot be both a fill and a text colour.**
`--mdt-success` has to be deep enough for white text to sit on it. That same green, used as _text_
on the dark page, only reaches 3.7:1 — under the 4.5:1 minimum. So `Icon`, `FormLabel`,
`FormMessage` and `FormDescription` all carry a `dark:mdt-text-green-40` override. `destructive`
has the identical problem and does not yet have the override — its dark-mode error text measures
**3.6:1 and fails today**.

**The proposal — three tokens per tone instead of two:**

| Token                      | Job                          | Success would be                  |
| -------------------------- | ---------------------------- | --------------------------------- |
| `--mdt-success`            | solid fill                   | `green-70` light, `green-70` dark |
| `--mdt-success-foreground` | text on that fill            | `white`, `white`                  |
| `--mdt-success-subtle`     | tinted background            | `green-10` light, `green-90` dark |
| `--mdt-success-on-subtle`  | text on the tint             | `green-80` light, `green-30` dark |
| `--mdt-success-text`       | the tone as text on the page | `green-70` light, `green-40` dark |

Repeat for `destructive`, `warning` and `info`. That is 12 new tokens, and it would let `Badge` and
`Button` delete every primitive-ramp class they currently carry — plus fix the destructive dark-mode
text failure in one place rather than eleven.

**Not built.** This is a design decision, so it is written down rather than assumed.

---

## 1 · Elevation / shadow — ✅ DONE

Six tokens, `--mdt-shadow-none` through `--mdt-shadow-xl`. Defined in `globals.css`, wired into
`tailwind.config.ts`. See [`TOKENS.md`](TOKENS.md).

The light values are **identical to the Tailwind defaults** the 37 existing uses already resolved
to, so migrating a component from `mdt-shadow-md` to the token is a rename rather than a restyle.

**The dark-mode question is answered.** A black shadow at 10% is invisible on a dark surface, so in
dark mode the drop shadow roughly quadruples in opacity _and_ a hairline light edge is baked into
the token as a `0 0 0 1px` ring. Both, not either — the ring is what actually separates an overlay
from the page on very dark surfaces. It lives inside the token so no component has to remember it
and none can forget it.

**Still to do:** ~18 components use `mdt-shadow-sm/md/lg`, which now resolve to the tokens
automatically. That works, but the intent is not stated in the code. A migration pass to make each
component name the step it means is worth doing as its own change.

---

## 2 · Layering / z-index — ✅ DONE

Eight tokens, `--mdt-z-base` through `--mdt-z-toast`. See [`TOKENS.md`](TOKENS.md).

**The open question is answered: yes, a tooltip sits above a modal.** Anything triggered _from_
something else has to render above it or it is clipped by the very surface that opened it — which
is why `dropdown`, `popover` and `tooltip` all sit above `modal` rather than below it. `toast` is
last, because a toast reports on the application rather than on whatever happens to be open.

**Still to do:** 15 uses of `mdt-z-50` and 2 of `mdt-z-10` remain in components. They are not
broken, but they are still the coin-toss this token set exists to end. Migrating them is its own
change.

---

## 3 · Spacing — MISSING

**Priority: HIGH.** The single biggest driver of whether a UI feels like one system.

Components use Tailwind's default spacing (`mdt-p-4`, `mdt-px-3`, `mdt-gap-2`, `mdt-h-8`).
`tailwind.config.ts` defines no spacing scale, so every padding and gap in the system is an
inherited default rather than a design decision.

**Found in:** every component.

**Proposed tokens** — a named scale on a 4px base

| Token           | Value | Typical use               |
| --------------- | ----- | ------------------------- |
| `--mdt-space-0` | 0     | Reset                     |
| `--mdt-space-1` | 2px   | Hairline gaps             |
| `--mdt-space-2` | 4px   | Icon-to-label             |
| `--mdt-space-3` | 8px   | Inside small controls     |
| `--mdt-space-4` | 12px  | Inside inputs and buttons |
| `--mdt-space-5` | 16px  | Between related items     |
| `--mdt-space-6` | 24px  | Between groups            |
| `--mdt-space-7` | 32px  | Section padding           |
| `--mdt-space-8` | 48px  | Page sections             |
| `--mdt-space-9` | 64px  | Page margins              |

**Open question for design:** confirm the base unit is 4px. The existing component heights
(32px, 36px) suggest 4px, but it has never been written down.

---

## 4 · Type scale — MISSING

**Priority: HIGH.** Font _families_ are tokenised. Everything else about type is not.

### 4a · Size

Components use `mdt-text-xs`, `mdt-text-sm`, `mdt-text-base`, `mdt-text-lg` — Tailwind defaults.

**Proposed tokens:** `--mdt-font-size-xs` through `--mdt-font-size-4xl`, each paired with a
deliberate line height rather than a framework default.

### 4b · Weight

Components use `mdt-font-medium`, `mdt-font-semibold`, `mdt-font-bold` — Tailwind defaults.

**Proposed tokens:** `--mdt-font-weight-regular`, `-medium`, `-semibold`, `-bold`

### 4c · Line height

Not tokenised at all. Currently inherited from whatever font-size class is applied.

**Proposed tokens:** `--mdt-line-height-tight`, `-normal`, `-relaxed`

### 4d · Letter spacing

`mdt-tracking-widest` appears in Command with no token behind it.

**Proposed tokens:** `--mdt-tracking-tight`, `-normal`, `-wide`

**Open question for design:** is there an agreed type scale anywhere — a Figma file, a spec, a
screenshot? If one exists we tokenise it. If not, this is a decision to make.

---

## 5 · Motion — duration & easing — MISSING

**Priority: MEDIUM.**

Two separate problems:

1. Components use `mdt-duration-200`, `mdt-duration-300`, `mdt-duration-500` and
   `mdt-ease-in-out` — Tailwind defaults, inconsistently chosen.
2. All **14 animations** in `tailwind.config.ts` hardcode `0.2s ease-out`. Changing the system's
   animation feel means editing 14 lines.

**Found in:** Button, Dialog, Sheet, Command, HoverCard, plus every keyframe animation

**Proposed tokens**

| Token                    | Value | Use                          |
| ------------------------ | ----- | ---------------------------- |
| `--mdt-duration-instant` | 100ms | Hover, focus                 |
| `--mdt-duration-fast`    | 150ms | Toggles, small state changes |
| `--mdt-duration-normal`  | 200ms | Dropdowns, tooltips          |
| `--mdt-duration-slow`    | 300ms | Dialogs, sheets              |
| `--mdt-ease-out`         | —     | Entering                     |
| `--mdt-ease-in`          | —     | Leaving                      |
| `--mdt-ease-in-out`      | —     | Moving                       |

**Accessibility note:** there is currently no `prefers-reduced-motion` handling anywhere in the
system. Users who ask their operating system to reduce animation still get all of it. This is a
WCAG concern and should be handled at the token layer.

---

## 6 · Opacity — MISSING

**Priority: MEDIUM.**

Found across ~25 components: `mdt-opacity-0`, `-15`, `-20`, `-50`, `-60`, `-70`, `-100`.

Seven different values with no rule about which means what. `opacity-50` and `opacity-60` both
appear to mean "disabled" in different components.

**Proposed tokens**

| Token                    | Meaning                      |
| ------------------------ | ---------------------------- |
| `--mdt-opacity-disabled` | Disabled controls            |
| `--mdt-opacity-muted`    | De-emphasised text and icons |
| `--mdt-opacity-overlay`  | Backdrops behind modals      |
| `--mdt-opacity-hidden`   | Fully transparent            |

**Open question for design:** confirm one value for "disabled" and apply it everywhere. Today it
is inconsistent between components — a visible inconsistency users can notice.

---

## 7 · Border width — MISSING

**Priority: LOW.**

`mdt-border-0` and `mdt-border-2` used across ~10 components. Default width is never stated.

**Proposed tokens:** `--mdt-border-width-none`, `-thin` (1px), `-thick` (2px)

---

## 8 · Border radius — PARTIAL

**Priority: MEDIUM.**

One base token exists (`--mdt-radius: 0.5rem`) with `md` and `sm` derived by subtraction. That
is a clever trick but an incomplete scale — there is no `xs`, `xl`, or `full`, and pill-shaped
elements have nowhere to point.

**Proposed additions:** `--mdt-radius-xs`, `--mdt-radius-xl`, `--mdt-radius-full`

---

## 9 · Breakpoints — MISSING

**Priority: LOW** for a component library, **HIGH** the moment anyone builds a page with it.

Only the container has a breakpoint (`2xl: 1400px`). No responsive scale is defined, so any
product built on this library will invent its own.

**Proposed tokens:** `--mdt-screen-sm`, `-md`, `-lg`, `-xl`, `-2xl`

---

## 10 · Hardcoded sizes — ACTIVE VIOLATIONS

**Priority: HIGH.** These are not gaps in the token system — they are the token rule already
being broken, in shipped code.

| Component          | Hardcoded value                | Should be                  |
| ------------------ | ------------------------------ | -------------------------- |
| `Textarea.tsx`     | `[80px]`, `[100px]`, `[120px]` | Size tokens                |
| `ScrollArea.tsx`   | `[200px]`, `[350px]`, `[1px]`  | Size + border-width tokens |
| `Select.tsx`       | `[8rem]`                       | Min-width token            |
| `DropdownMenu.tsx` | `[8rem]`                       | Min-width token            |
| `Command.tsx`      | `[300px]`                      | Min-width token            |
| `Combobox.tsx`     | `[300px]`                      | Min-width token            |
| `Table.tsx`        | `[100px]`                      | Size token                 |
| `InputGroup.tsx`   | `[60px]`                       | Size token                 |
| `Sidebar.tsx`      | `[10px]`                       | Type-size token            |
| `TagPill.tsx`      | `[10px]`                       | Type-size token            |

_(Hardcoded values inside `.stories.tsx` files are excluded — those are demo layout, not
shipped product.)_

**Note:** `[10px]` in Sidebar and TagPill is a font size smaller than anything in the type
scale. That is either a deliberate micro-label size that needs a token, or an accessibility
problem. It needs a design decision either way.

---

## What happens next

Each category above is a **design decision**, not an implementation task. The order below is by
impact, not effort.

| Order | Category                          | Why first                                        |
| ----- | --------------------------------- | ------------------------------------------------ |
| 1     | Spacing                           | Touches every component; biggest consistency win |
| 2     | Type scale                        | Second biggest; currently entirely inherited     |
| 3     | Elevation                         | Most visible; needs a dark-mode answer           |
| 4     | Layering                          | Prevents real stacking bugs                      |
| 5     | Hardcoded sizes                   | Fix the live violations                          |
| 6     | Motion                            | Includes the reduced-motion accessibility gap    |
| 7     | Opacity                           | Resolve the disabled-state inconsistency         |
| 8     | Radius, border width, breakpoints | Tidy-up                                          |

**Rule for adding any of these:** a token is added to
[`src/styles/globals.css`](./src/styles/globals.css) and
[`tailwind.config.ts`](./tailwind.config.ts) together, then documented in
[`TOKENS.md`](./TOKENS.md), then removed from this file.
