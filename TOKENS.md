# Design Tokens

The complete token reference for this design system. Every colour, radius and font in every
component comes from this file. Nothing is hardcoded.

**Source of truth:** [`src/styles/globals.css`](./src/styles/globals.css) defines the values.
[`tailwind.config.ts`](./tailwind.config.ts) exposes them as Tailwind classes.

---

## The rule

> **Always use a token. Never hardcode a value.**
>
> If the token you need does not exist, **stop and ask** — do not invent a value,
> do not reach for a raw hex code, and do not pick "the closest Tailwind colour".
> A missing token is a design decision, not an implementation detail.

```tsx
// ✅ Correct — semantic token
className = 'mdt-bg-primary mdt-text-primary-foreground';

// ⚠️ Allowed, but only when no semantic token fits — primitive token
className = 'mdt-bg-blue-50';

// ❌ Never — raw value
className = 'mdt-bg-[#3d7dff]';
style = { backgroundColor: '#3d7dff' };
```

**Prefer semantic over primitive.** Semantic tokens adapt to light and dark mode automatically.
Primitive tokens do not.

---

## How tokens are used

Every token exists in two forms:

| Form           | Looks like                | Use it in              |
| -------------- | ------------------------- | ---------------------- |
| Tailwind class | `mdt-bg-primary`          | Component `className`  |
| CSS variable   | `hsl(var(--mdt-primary))` | Raw CSS, inline styles |

All Tailwind classes in this system carry the **`mdt-`** prefix. A class without that prefix
is not part of this design system.

---

## 1 · Semantic colours

**Use these first.** They are the layer that flips automatically between light and dark mode.

Each pairs a surface with the text colour that belongs on it — `primary` with
`primary-foreground`, `card` with `card-foreground`, and so on.

**Two quieter steps of the ink that sits on the primary surface** were added for the ⏎ chip:
`primary-foreground-muted` for a glyph one step off the label, and `primary-foreground-subtle` for
a hairline quieter again. No new colours - both point at ramp steps that already existed.

They have to be tokens rather than the label faded by a percentage, because `primary` **inverts**
between themes: near-black with white ink in light mode, white with black ink in dark. "A tone
softer than the label" is therefore a different direction on each side, which is the same reason
`--mdt-primary-foreground` is a token rather than the word `white`.

### Surfaces

| Token                      | Tailwind                      | Light   | Dark          |
| -------------------------- | ----------------------------- | ------- | ------------- |
| `--mdt-background`         | `mdt-bg-background`           | `white` | `neutral-160` |
| `--mdt-foreground`         | `mdt-text-foreground`         | `black` | `neutral-10`  |
| `--mdt-card`               | `mdt-bg-card`                 | `white` | `neutral-150` |
| `--mdt-card-foreground`    | `mdt-text-card-foreground`    | `black` | `neutral-10`  |
| `--mdt-popover`            | `mdt-bg-popover`              | `white` | `neutral-150` |
| `--mdt-popover-foreground` | `mdt-text-popover-foreground` | `black` | `neutral-10`  |

### Actions

| Token                             | Tailwind                               | Light         | Dark          |
| --------------------------------- | -------------------------------------- | ------------- | ------------- |
| `--mdt-primary`                   | `mdt-bg-primary`                       | `black`       | `white`       |
| `--mdt-primary-foreground`        | `mdt-text-primary-foreground`          | `white`       | `black`       |
| `--mdt-primary-foreground-muted`  | `mdt-text-primary-foreground-muted`    | `neutral-30`  | `neutral-130` |
| `--mdt-primary-foreground-subtle` | `mdt-border-primary-foreground-subtle` | `neutral-100` | `neutral-50`  |
| `--mdt-secondary`                 | `mdt-bg-secondary`                     | `neutral-20`  | `neutral-130` |
| `--mdt-secondary-foreground`      | `mdt-text-secondary-foreground`        | `black`       | `neutral-10`  |
| `--mdt-accent`                    | `mdt-bg-accent`                        | `blue-10`     | `blue-90`     |
| `--mdt-accent-foreground`         | `mdt-text-accent-foreground`           | `blue-50`     | `blue-20`     |
| `--mdt-muted`                     | `mdt-bg-muted`                         | `neutral-30`  | `neutral-120` |
| `--mdt-muted-foreground`          | `mdt-text-muted-foreground`            | `neutral-100` | `neutral-40`  |

### Status

| Token                          | Tailwind                          | Light       | Dark        | Meaning                     |
| ------------------------------ | --------------------------------- | ----------- | ----------- | --------------------------- |
| `--mdt-destructive`            | `mdt-bg-destructive`              | `red-65`    | `red-60`    | Errors, destructive actions |
| `--mdt-destructive-foreground` | `mdt-text-destructive-foreground` | `white`     | `white`     |                             |
| `--mdt-warning`                | `mdt-bg-warning`                  | `orange-50` | `orange-60` | Warnings, needs attention   |
| `--mdt-warning-foreground`     | `mdt-text-warning-foreground`     | `black`     | `black`     |                             |
| `--mdt-success`                | `mdt-bg-success`                  | `green-70`  | `green-70`  | Success, confirmation       |
| `--mdt-success-foreground`     | `mdt-text-success-foreground`     | `white`     | `white`     |                             |
| `--mdt-info`                   | `mdt-bg-info`                     | `blue-50`   | `blue-50`   | Information, neutral notice |
| `--mdt-info-foreground`        | `mdt-text-info-foreground`        | `white`     | `black`     |                             |

---

## Feedback surface — the tinted background behind a Toast or a Banner

**No new colours.** Every one of these points at a step on a ramp already listed below. The set
exists so a component can ask for _"the danger tint"_ rather than _"red 10"_ — but it is the same
red 10 a Badge uses.

**`Toast` and `Callout`.** A button or a badge still reaches for `--mdt-success` and friends. The
two share the table through `src/utils/feedback-tones.ts`, so a seventh tone is one edit rather
than two that drift.

**The rule that makes the set work,** borrowed from Org Mgmt's banner: the text stays one colour in
every tone, and only the icon and the border carry it. That rule is what makes six tones read as a
family — not the particular colours.

| Tone    | Background   | Border       | Icon          |
| ------- | ------------ | ------------ | ------------- |
| info    | `blue-05`    | `blue-20`    | `blue-60`     |
| warning | `yellow-05`  | `orange-20`  | `orange-80`   |
| danger  | `red-05`     | `red-20`     | `red-70`      |
| success | `green-05`   | `green-20`   | `green-70`    |
| ai      | `purple-05`  | `purple-20`  | `purple-80`   |
| neutral | `neutral-10` | `neutral-30` | `neutral-130` |

**Every fill is the `05` step**, except neutral where `neutral-10` is the lightest there is. It was
not always so: four of them sat at `10` while `info` sat at `05`, which is why `info` looked right
and the other four looked heavy. `success` was the worst of it — `green-10` is 89% lightness where
the rest of the row is 95–98%, so one tone in six was visibly a block of colour while the others
were a tint.

They are backgrounds behind body text. A fill has one job here, which is to say _"this is a
group"_; the icon and the border are what say which group.

Plus two shared: `--mdt-feedback-title` (`neutral-150`) and `--mdt-feedback-text` (`neutral-130`).

Tailwind classes follow the same shape: `mdt-bg-feedback-success-bg`,
`mdt-border-feedback-success-border`, `mdt-text-feedback-success-icon`.

**Dark mode** uses the deep end of the same ramps, at the steps `Badge` already uses — so a dark
toast and a dark badge belong to each other.

---

## Sizes

| Token               | Tailwind      | Value   | Meaning                                                                                                                                     |
| ------------------- | ------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `--mdt-toast-width` | `mdt-w-toast` | `356px` | How wide a toast is. The promotional toast sits on its own layer outside the toaster, so both read the width from here or they drift apart. |

> **The only size token in the system.** Everything else uses Tailwind's default scale — see
> [`MISSING-TOKENS.md`](./MISSING-TOKENS.md), where spacing and type scale are both listed as
> categories with no tokens at all.

### Controls

| Token          | Tailwind            | Light        | Dark         | Used for                 |
| -------------- | ------------------- | ------------ | ------------ | ------------------------ |
| `--mdt-border` | `mdt-border-border` | `neutral-40` | `neutral-90` | All borders and dividers |
| `--mdt-input`  | `mdt-border-input`  | `neutral-40` | `neutral-90` | Form field borders       |
| `--mdt-ring`   | `mdt-ring-ring`     | `black`      | `neutral-50` | Focus rings              |

---

## 2 · Primitive colours

The raw palette. **Reach for these only when no semantic token fits** — they do not change
between light and dark mode.

### Core

| Token         | Tailwind       | HSL          | Hex       |
| ------------- | -------------- | ------------ | --------- |
| `--mdt-white` | `mdt-bg-white` | `0 0% 100%`  | `#FFFFFF` |
| `--mdt-black` | `mdt-bg-black` | `218 63% 7%` | —         |

### Neutral — 16 steps

The backbone of the system. Surfaces, borders, and text.

| Token               | Tailwind             | Hex       |                |
| ------------------- | -------------------- | --------- | -------------- |
| `--mdt-neutral-10`  | `mdt-bg-neutral-10`  | `#F6F9FC` | Lightest       |
| `--mdt-neutral-20`  | `mdt-bg-neutral-20`  | `#ECF1F9` |                |
| `--mdt-neutral-30`  | `mdt-bg-neutral-30`  | `#E3E8F2` |                |
| `--mdt-neutral-40`  | `mdt-bg-neutral-40`  | `#CAD3E2` | Default border |
| `--mdt-neutral-50`  | `mdt-bg-neutral-50`  | `#8E9FBC` |                |
| `--mdt-neutral-60`  | `mdt-bg-neutral-60`  | `#7186A8` |                |
| `--mdt-neutral-70`  | `mdt-bg-neutral-70`  | `#697FA0` |                |
| `--mdt-neutral-80`  | `mdt-bg-neutral-80`  | `#5A6D8C` |                |
| `--mdt-neutral-90`  | `mdt-bg-neutral-90`  | `#516381` |                |
| `--mdt-neutral-100` | `mdt-bg-neutral-100` | `#485975` | Muted text     |
| `--mdt-neutral-110` | `mdt-bg-neutral-110` | `#2B394F` |                |
| `--mdt-neutral-120` | `mdt-bg-neutral-120` | `#243147` |                |
| `--mdt-neutral-130` | `mdt-bg-neutral-130` | `#1D2A3E` |                |
| `--mdt-neutral-140` | `mdt-bg-neutral-140` | `#172336` |                |
| `--mdt-neutral-150` | `mdt-bg-neutral-150` | `#111C2C` | Dark card      |
| `--mdt-neutral-160` | `mdt-bg-neutral-160` | `#0B1628` | Darkest        |

### Red — destructive / error

| Token           | Tailwind         | Hex       |                        |
| --------------- | ---------------- | --------- | ---------------------- |
| `--mdt-red-05`  | `mdt-bg-red-5`   | `#fef5f5` |                        |
| `--mdt-red-10`  | `mdt-bg-red-10`  | `#feecec` |                        |
| `--mdt-red-20`  | `mdt-bg-red-20`  | `#fccfcf` |                        |
| `--mdt-red-30`  | `mdt-bg-red-30`  | `#f6b1b1` |                        |
| `--mdt-red-40`  | `mdt-bg-red-40`  | `#f58a8a` |                        |
| `--mdt-red-50`  | `mdt-bg-red-50`  | `#ec5b5b` | Primary red            |
| `--mdt-red-60`  | `mdt-bg-red-60`  | `#db132a` | Dark-mode destructive  |
| `--mdt-red-65`  | `mdt-bg-red-65`  | `#c72323` | Light-mode destructive |
| `--mdt-red-70`  | `mdt-bg-red-70`  | `#ad1111` |                        |
| `--mdt-red-80`  | `mdt-bg-red-80`  | `#750c0c` |                        |
| `--mdt-red-90`  | `mdt-bg-red-90`  | `#4a090b` |                        |
| `--mdt-red-100` | `mdt-bg-red-100` | `#310c0c` |                        |

### Orange — warning

| Token              | Tailwind            | Hex       |                               |
| ------------------ | ------------------- | --------- | ----------------------------- |
| `--mdt-orange-05`  | `mdt-bg-orange-5`   | `#fdf7f4` |                               |
| `--mdt-orange-10`  | `mdt-bg-orange-10`  | `#fef5ee` |                               |
| `--mdt-orange-20`  | `mdt-bg-orange-20`  | `#ffe8cc` |                               |
| `--mdt-orange-30`  | `mdt-bg-orange-30`  | `#ffd199` |                               |
| `--mdt-orange-40`  | `mdt-bg-orange-40`  | `#ffbb66` |                               |
| `--mdt-orange-50`  | `mdt-bg-orange-50`  | `#ff8329` | Primary orange, light warning |
| `--mdt-orange-60`  | `mdt-bg-orange-60`  | `#ff6600` | Dark-mode warning             |
| `--mdt-orange-65`  | `mdt-bg-orange-65`  | `#e65c00` |                               |
| `--mdt-orange-70`  | `mdt-bg-orange-70`  | `#cc5200` |                               |
| `--mdt-orange-80`  | `mdt-bg-orange-80`  | `#993d00` |                               |
| `--mdt-orange-90`  | `mdt-bg-orange-90`  | `#662900` |                               |
| `--mdt-orange-100` | `mdt-bg-orange-100` | `#331400` |                               |

### Yellow — caution

| Token              | Tailwind            | Hex       |
| ------------------ | ------------------- | --------- |
| `--mdt-yellow-05`  | `mdt-bg-yellow-5`   | `#fffbf0` |
| `--mdt-yellow-10`  | `mdt-bg-yellow-10`  | `#fff6d9` |
| `--mdt-yellow-20`  | `mdt-bg-yellow-20`  | `#ffecb3` |
| `--mdt-yellow-30`  | `mdt-bg-yellow-30`  | `#ffe28c` |
| `--mdt-yellow-40`  | `mdt-bg-yellow-40`  | `#ffd866` |
| `--mdt-yellow-50`  | `mdt-bg-yellow-50`  | `#ffce40` |
| `--mdt-yellow-60`  | `mdt-bg-yellow-60`  | `#f5c71a` |
| `--mdt-yellow-70`  | `mdt-bg-yellow-70`  | `#ccab00` |
| `--mdt-yellow-80`  | `mdt-bg-yellow-80`  | `#998000` |
| `--mdt-yellow-90`  | `mdt-bg-yellow-90`  | `#665600` |
| `--mdt-yellow-100` | `mdt-bg-yellow-100` | `#332b00` |

### Green — success

| Token             | Tailwind           | Hex       |                      |
| ----------------- | ------------------ | --------- | -------------------- |
| `--mdt-green-05`  | `mdt-bg-green-5`   | `#e6f7f0` |                      |
| `--mdt-green-10`  | `mdt-bg-green-10`  | `#ccefe0` |                      |
| `--mdt-green-20`  | `mdt-bg-green-20`  | `#99dfc2` |                      |
| `--mdt-green-30`  | `mdt-bg-green-30`  | `#66cfa3` |                      |
| `--mdt-green-40`  | `mdt-bg-green-40`  | `#33bf85` |                      |
| `--mdt-green-50`  | `mdt-bg-green-50`  | `#37b97d` | Primary green        |
| `--mdt-green-60`  | `mdt-bg-green-60`  | `#2b9a69` |                      |
| `--mdt-green-70`  | `mdt-bg-green-70`  | `#248055` | Success, both themes |
| `--mdt-green-80`  | `mdt-bg-green-80`  | `#1b6040` |                      |
| `--mdt-green-90`  | `mdt-bg-green-90`  | `#12402b` |                      |
| `--mdt-green-100` | `mdt-bg-green-100` | `#092015` |                      |

### Blue — info / accent

| Token            | Tailwind          | Hex       |                    |
| ---------------- | ----------------- | --------- | ------------------ |
| `--mdt-blue-05`  | `mdt-bg-blue-5`   | `#f0f6ff` |                    |
| `--mdt-blue-10`  | `mdt-bg-blue-10`  | `#e8f1ff` | Light accent       |
| `--mdt-blue-20`  | `mdt-bg-blue-20`  | `#a8c8ff` | Dark accent text   |
| `--mdt-blue-30`  | `mdt-bg-blue-30`  | `#85b3ff` |                    |
| `--mdt-blue-40`  | `mdt-bg-blue-40`  | `#619eff` |                    |
| `--mdt-blue-50`  | `mdt-bg-blue-50`  | `#3d7dff` | Primary blue, info |
| `--mdt-blue-55`  | `mdt-bg-blue-55`  | `#2970ff` |                    |
| `--mdt-blue-60`  | `mdt-bg-blue-60`  | `#0052ff` |                    |
| `--mdt-blue-65`  | `mdt-bg-blue-65`  | `#0047e6` |                    |
| `--mdt-blue-70`  | `mdt-bg-blue-70`  | `#003dcc` |                    |
| `--mdt-blue-80`  | `mdt-bg-blue-80`  | `#002e99` |                    |
| `--mdt-blue-90`  | `mdt-bg-blue-90`  | `#001f66` | Dark accent        |
| `--mdt-blue-100` | `mdt-bg-blue-100` | `#000f33` |                    |

### Purple — creative / premium

| Token              | Tailwind            | Hex       |
| ------------------ | ------------------- | --------- |
| `--mdt-purple-05`  | `mdt-bg-purple-5`   | `#f8f3ff` |
| `--mdt-purple-10`  | `mdt-bg-purple-10`  | `#f0e6ff` |
| `--mdt-purple-20`  | `mdt-bg-purple-20`  | `#e1ccff` |
| `--mdt-purple-30`  | `mdt-bg-purple-30`  | `#d1b3ff` |
| `--mdt-purple-40`  | `mdt-bg-purple-40`  | `#c299ff` |
| `--mdt-purple-50`  | `mdt-bg-purple-50`  | `#b380ff` |
| `--mdt-purple-60`  | `mdt-bg-purple-60`  | `#a366ff` |
| `--mdt-purple-70`  | `mdt-bg-purple-70`  | `#8a4dff` |
| `--mdt-purple-80`  | `mdt-bg-purple-80`  | `#6633cc` |
| `--mdt-purple-90`  | `mdt-bg-purple-90`  | `#442299` |
| `--mdt-purple-100` | `mdt-bg-purple-100` | `#221166` |

---

## 3 · Radius

One base value; the smaller steps are derived from it.

| Token          | Tailwind         | Value          |
| -------------- | ---------------- | -------------- |
| `--mdt-radius` | `mdt-rounded-lg` | `0.5rem` (8px) |
| derived        | `mdt-rounded-md` | `radius − 2px` |
| derived        | `mdt-rounded-sm` | `radius − 4px` |

Change `--mdt-radius` and the whole system re-rounds together.

---

## 3a · Elevation

How far off the page a surface sits. Pick by **what the thing is**, not by how strong you want it
to look — that is what keeps a dropdown in one product matching a dropdown in another.

| Token               | Tailwind          | Use for                                  |
| ------------------- | ----------------- | ---------------------------------------- |
| `--mdt-shadow-none` | `mdt-shadow-none` | Flat, on-surface                         |
| `--mdt-shadow-xs`   | `mdt-shadow-xs`   | Subtle lift — inputs, toggles            |
| `--mdt-shadow-sm`   | `mdt-shadow-sm`   | Raised — buttons, cards                  |
| `--mdt-shadow-md`   | `mdt-shadow-md`   | Floating — dropdowns, popovers, tooltips |
| `--mdt-shadow-lg`   | `mdt-shadow-lg`   | Overlay — dialogs, sheets                |
| `--mdt-shadow-xl`   | `mdt-shadow-xl`   | Peak — toasts, command palette           |

**Dark mode is not the same shadow.** A black shadow at 10% opacity is invisible on a dark surface,
so each token carries a second definition in `.dark`: the same geometry at roughly four times the
opacity, **plus a hairline light edge** baked in as a `0 0 0 1px` ring.

That ring is part of the token deliberately. It means no component has to remember to add a border
in dark mode, and no component can forget — asking for `mdt-shadow-md` gets the right treatment in
both themes. `none` stays truly none: flat means flat, with no edge.

---

## 3b · Layering

Which floating thing wins when two are open at once. Before these existed, almost everything used
`z-50` and the winner was decided by DOM order rather than by intent.

| Token              | Tailwind         | Layer                          |
| ------------------ | ---------------- | ------------------------------ |
| `--mdt-z-base`     | `mdt-z-base`     | Page content                   |
| `--mdt-z-sticky`   | `mdt-z-sticky`   | Sticky headers, table headers  |
| `--mdt-z-overlay`  | `mdt-z-overlay`  | Dialog / Sheet backdrop        |
| `--mdt-z-modal`    | `mdt-z-modal`    | Dialog, Sheet                  |
| `--mdt-z-dropdown` | `mdt-z-dropdown` | Select, Combobox, DropdownMenu |
| `--mdt-z-popover`  | `mdt-z-popover`  | Popover, HoverCard             |
| `--mdt-z-tooltip`  | `mdt-z-tooltip`  | Tooltip                        |
| `--mdt-z-toast`    | `mdt-z-toast`    | Toast — always on top          |

**Yes, a tooltip sits above a modal.** Anything triggered _from_ something else must render above
it, or it gets clipped by the very surface that opened it — a `Select` inside a `Dialog` is the
everyday case. That is why `dropdown`, `popover` and `tooltip` all sit above `modal`.

`toast` is last because a toast reports on the whole application, not on whatever is open.

---

## 4 · Typography

| Token             | Tailwind        | Stack                                               |
| ----------------- | --------------- | --------------------------------------------------- |
| `--mdt-font-sans` | `mdt-font-sans` | System UI stack — no webfont required               |
| `--mdt-font-mono` | `mdt-font-mono` | `ui-monospace`, JetBrains Mono, Fira Code, Consolas |

Consumers can override either variable to apply their own brand typeface.

---

## 5 · Theming

Light mode is defined on `:root`. Dark mode is defined on `.dark`.

```html
<html class="dark">
  <!-- every semantic token flips automatically -->
</html>
```

Only **semantic** tokens change between modes. Primitive tokens are fixed — which is exactly
why components should reach for semantic tokens first.

---

## 6 · When a token is missing

If you need a value that no token provides:

1. **Stop.** Do not hardcode it, and do not approximate with a nearby token.
2. **Check the semantic layer first** — the token you want may exist under a different name.
3. **Raise it.** A new token is a design decision. It gets added to
   [`src/styles/globals.css`](./src/styles/globals.css) and
   [`tailwind.config.ts`](./tailwind.config.ts) together, then documented here.

A hardcoded value is invisible debt. A missing token is a five-minute conversation.

---

## Token count

| Group               | Count  |
| ------------------- | ------ |
| Core                | 2      |
| Neutral             | 16     |
| Red                 | 12     |
| Orange              | 12     |
| Yellow              | 11     |
| Green               | 11     |
| Blue                | 13     |
| Purple              | 11     |
| **Primitive total** | **88** |
| Semantic            | 25     |
| Radius              | 1      |
| Typography          | 2      |
