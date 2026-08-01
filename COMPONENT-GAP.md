# Component Gap — merged library vs Storybook

What the four product design systems actually built, checked against what exists in this
Storybook today.

**Source:** the merged comparison library at `design-systems/merged/` — every component from four
systems, matched by type:

| System      | Owner           |
| ----------- | --------------- |
| Org Mgmt    | Om Vekariya     |
| IAM         | Kaivalya Pandit |
| Agent Fleet | Keertan Zala    |
| Credential  | Harshil Thesia  |

**Audited:** 28 July 2026. Foundations (colour, typography, radius/elevation/spacing, icons) are
excluded — this is components only, from Button onwards.

---

## The short version

|                                      | Count  |
| ------------------------------------ | ------ |
| Component rows in the merged library | 42     |
| Fully covered in Storybook           | **16** |
| Partially covered                    | **4**  |
| Missing entirely                     | **22** |

**Storybook covers about 38% of what the four teams actually built.**

The gap is not evenly spread. Forms, overlays and navigation are in good shape. **Data display and
feedback are almost empty.**

---

## How to read the priority

The most useful signal in this data: **how many of the four teams independently built the same
thing.** If all four built it without talking to each other, it is not optional.

| Built by | Meaning                              |
| -------- | ------------------------------------ |
| 4 of 4   | Universal need. Build first.         |
| 3 of 4   | Strong need.                         |
| 1–2 of 4 | Product-specific. Probably not core. |

---

## ✅ Covered — 16

| Merged row                       | Built by | Storybook component                                |
| -------------------------------- | -------- | -------------------------------------------------- |
| Button                           | 4        | `Button`, `ButtonGroup`                            |
| Icon button                      | 3        | `Button` (`size="icon"`)                           |
| Field wrapper                    | 3        | `Form` + `FormField` / `FormLabel` / `FormMessage` |
| Text input                       | 2        | `Input`, `InputGroup`                              |
| Select · Search input · Textarea | 3        | `Select`, `Combobox`, `Input`, `Textarea`          |
| Checkbox · Radio · Switch        | 4        | `Checkbox`, `Radio`, `Switch`                      |
| Status pill                      | 4        | `TagPill`                                          |
| Chip / meta pill                 | 4        | `TagPill`                                          |
| Data table                       | 4        | `Table`                                            |
| Pagination bar                   | 1        | `Pagination`                                       |
| Toast                            | 2        | `Toast`                                            |
| Tabs                             | 3        | `Tabs`                                             |
| Sidebar navigation               | 4        | `Sidebar`                                          |
| Menu / popover                   | 3        | `DropdownMenu`, `Popover`, `HoverCard`             |
| Modal                            | 4        | `Dialog`                                           |
| Drawer                           | 3        | `Sheet`                                            |

---

## ⚠️ Partial — 4

Something close exists, but it is not the same component and would need work.

| Merged row                      | Built by | What exists           | What's missing                             |
| ------------------------------- | -------- | --------------------- | ------------------------------------------ |
| Choice chip group               | 2        | `ToggleGroup`         | Chip styling and multi-select behaviour    |
| Segmented control               | 2        | `ToggleGroup`, `Tabs` | The segmented visual treatment             |
| Card · Section header · Divider | 2        | `Separator` only      | **`Card` and section header do not exist** |
| Key-value rows                  | 2        | `Item`                | The label/value pairing layout             |

> **Correction:** an earlier version of this file listed **Radio card** as missing. It is not —
> `Radio` ships `variant: card` and `card-with-radio`, and `Checkbox` ships the same. That was a
> component-level comparison missing a variant-level fact, which is exactly the failure mode the
> next section exists to catch.

> **Worth flagging:** the README's very first example imports `Card`. There is no `Card`
> component. That code does not work.

---

## ❌ Missing — 22

Ordered by how many teams built it.

### Built by all four — build these first

| Merged row          | Notes                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------- |
| **KPI / stat tile** | Every team built one. Dashboards are core to all four products.                          |
| **Banner**          | Every team built one. Only `_internal/DeprecationBanner` exists, and it is not exported. |

### Built by three

| Merged row                     | Notes                              |
| ------------------------------ | ---------------------------------- |
| **Avatar & avatar stack**      | No avatar of any kind in Storybook |
| **Micro-label & count badges** | `TagPill` is not a count badge     |
| **Empty state**                | Nothing exists                     |
| **Wizard stepper**             | Nothing exists                     |

### Built by two

| Merged row                 | Notes                                              |
| -------------------------- | -------------------------------------------------- |
| Progress meters & bars     | `Skeleton` and `Spinner` are loading, not progress |
| Code / mono wells          | Font tokens exist; the component does not          |
| Contextual strip           | Inline contextual messaging                        |
| High-risk action gate      | Confirm-before-destructive pattern                 |
| Tag input / removable chip | `TagPill` renders a pill but cannot be typed into  |

### Built by one

| Merged row              |
| ----------------------- |
| Toggle setting row      |
| Test status label       |
| Protocol & store badges |
| Icon tile               |
| Secret dots             |
| Inline editable field   |
| Activity timeline       |
| Tree row                |
| Unsaved changes bar     |
| Page header             |

_(Two further rows — "Zero-drift extraction wins" and "Module component layer" — are audit
findings rather than components, and are not counted.)_

---

## Variant gaps — the component exists, the variant doesn't

A component counting as "covered" does not mean it can do what the four teams needed. These gaps
sit _inside_ components Storybook already has, and they are the easiest kind to miss.

Storybook's variants were read straight out of the CVA definitions
(`node scripts/extract-variants.mjs`) — 26 components, 91 variant groups, 317 values.

### Button — 5 missing variants

| Variant              | Org Mgmt | IAM | Agent Fleet | Credential |    Storybook     |
| -------------------- | :------: | :-: | :---------: | :--------: | :--------------: |
| primary              |    ✅    | ✅  |     ✅      |     ✅     |        ✅        |
| secondary            |    ✅    | ✅  |     ✅      |     ✅     |        ✅        |
| ghost                |    ✅    | ✅  |     ✅      |     ✅     |        ✅        |
| danger / destructive |    ✅    | ✅  |     ✅      |     ✅     |        ✅        |
| link                 |    ✅    |  —  |     ✅      |     —      |        ✅        |
| **ai**               |    ✅    |  —  |     ✅      |     ✅     |        ❌        |
| **tertiary**         |    ✅    |  —  |     ✅      |     ✅     |        ❌        |
| **dangerGhost**      |    ✅    |  —  |     ✅      |     —      |        ❌        |
| **warning**          |    ✅    |  —  |     ✅      |     —      |        ❌        |
| **mono**             |    —     |  —  |     ✅      |     —      |        ❌        |
| outline              |    —     |  —  |      —      |     —      | ✅ _(only here)_ |

**`ai` and `tertiary` were each built by three of four teams independently.** Those are not
product quirks — they are missing from the library.

`ai` is a genuinely distinct treatment (Org Mgmt renders it as `✦ Ask AI`), not a recolour of
`primary`. Given the whole point of this project, an AI action button arguably belongs in the
system regardless of the count.

Storybook is ahead in other directions: `shape` (square/rounded/pill/circle), `elevation` (0–3),
sizes `xs`/`xl`/`icon` and an `active` state appear in none of the four systems.

### TagPill — variants are colours, not meanings

|                  |                                                                       |
| ---------------- | --------------------------------------------------------------------- |
| Storybook        | `default, yellow, blue, green, red, purple, orange, pink, teal, cyan` |
| The four systems | success, warning, danger, info, neutral — **semantic tones**          |

This is the most structurally significant gap in the file. Colour-named variants cannot be
re-themed and carry no meaning: `red` does not tell an AI tool, or a developer, that this is an
error state. IAM's expiry map (`never` / `soon` / `expired`) is called out in its own audit as
"the one fully-tokenized map" — that is the model to copy.

Also missing: **the status dot.** Credential's status pill renders a coloured dot before the
label; `TagPill` has no dot.

### Input

| Variant   | Systems    |      Storybook      |
| --------- | ---------- | :-----------------: |
| invalid   | Credential |  ✅ as `hasError`   |
| with icon | Credential | ✅ via `InputGroup` |
| **mono**  | Credential |         ❌          |

`mono` also appears on Agent Fleet's status pill and table cells — it looks like a system-wide
need for monospaced data display, not a one-off.

### Checkbox · Radio · Switch

Broadly covered, and better than the source systems in one respect: IAM's audit records **four
contradictory disabled treatments** and **three different radio implementations** across its own
codebase. Storybook has one of each, plus `card` variants on both `Checkbox` and `Radio`.

The one gap: `Switch` exposes only `size`. The systems show explicit on/off/disabled states.

---

## What Storybook has that the merged library doesn't

Not everything is a gap in one direction. These exist here and appear in none of the four systems:

| Component                            | Why it matters                       |
| ------------------------------------ | ------------------------------------ |
| `Command`                            | Command palette                      |
| `OTPInput`                           | One-time code entry                  |
| `Tooltip`                            | Notably absent from all four systems |
| `ScrollArea`, `Resizable`            | Layout primitives                    |
| `Container`, `Flex`, `Grid`, `Stack` | Layout system                        |
| `Skeleton`, `Spinner`                | Loading states                       |
| `Toolbar`, `Item`, `Toggle`          | —                                    |
| `Icon`                               | 500+ icons, already tokenised        |

This is real ground already won. The merged library is four product teams' needs; Storybook is a
library. It is reasonable for it to hold primitives none of them named.

---

## Recommended order

| Order | Component                       | Why                                                                 |
| ----- | ------------------------------- | ------------------------------------------------------------------- |
| 1     | **Card** + section header       | Blocks the most other work, and the README already claims it exists |
| 2     | **Banner / Alert**              | All four teams built one                                            |
| 3     | **KPI / stat tile**             | All four teams built one                                            |
| 4     | **Avatar** + stack              | Three teams; nothing close exists                                   |
| 5     | **Badge** (count / micro-label) | Three teams; `TagPill` does not cover it                            |
| 6     | **Empty state**                 | Three teams; cheap to build                                         |
| 7     | **Wizard stepper**              | Three teams; more involved                                          |
| 8     | Progress                        | Two teams                                                           |

**Cards first.** Almost every other missing component — stat tile, empty state, key-value rows,
activity timeline — sits inside one.

---

## From the table references — a separate source

The 27 real product tables reviewed while building the Table component turned up eight cell
patterns. All eight are now documented as recipes (Storybook → Components → Table → **Cell
Recipes**). Six are built from components that already exist. Two are built against **throwaway
placeholders**, because the pattern is agreed but the component underneath it is missing.

| Pattern                      | Seen in | Placeholder stands in for                                                                                                                    |
| ---------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sparkline / inline chart** | 3 of 27 | A chart component — owns the scale, the empty and single-point cases, and the tones. The recipe draws one polyline and nothing else.         |
| **Media thumbnail**          | 3 of 27 | A thumbnail component — owns the aspect ratio, the loading state, and what happens when the image fails. The recipe draws the fallback only. |

The placeholders live in the stories file, are not exported, and are not in `src/components`. When
the real components land, the two definitions are deleted and the recipes keep working. Until then
a product copying either recipe is copying a stand-in, which is what the **Still missing** story
says on the page itself.

These are **not** counted in the totals at the top of this file, which compare only against the four
product design systems. This is a different source and a smaller claim: three teams' tables wanted
them, not four teams' component libraries.

---

## Searched for, not found

A running log, in the shape of `MISSING-TOKENS.md`: a list of decisions rather than an
inventory. Anything looked for under the reuse rule in `CLAUDE.md` and not found goes here,
**with the words that were searched** — the next person searches with words too, and yours
are evidence about which ones fail.

Add a row when a search comes back empty. Delete it when the thing gets built, and say in
the commit that it did.

| Searched for                | Words used                     | Found                                         | Decision                                                                                                                                                                                                                                                                             | When     |
| --------------------------- | ------------------------------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| A sparkline in a table cell | `sparkline`, `spark`, `trend`  | nothing                                       | Drawn inline in the cell recipe as a placeholder. A real one is a charting component, which is a project rather than a component — see the data-viz gap above.                                                                                                                       | Jul 2026 |
| A thumbnail / media cell    | `thumbnail`, `media`, `image`  | `Avatar` only, which is a person              | Placeholder in the recipe. `Avatar` deliberately not stretched to cover it: one thing, one component.                                                                                                                                                                                | Jul 2026 |
| A small icon-only button    | `icon button`, `iconOnly`      | `Button` has `iconOnly`, and it does not work | `iconOnly` hides children and takes the glyph as `leftIcon`, which leaves no children — and children are what tell `ButtonProps` from `LinkButtonProps`, so the type then demands an `href`. Worked around with `mdt-w-8 mdt-px-0` in **four** places now. Needs fixing in `Button`. | Jul 2026 |
| A remove-label on a tag     | `TagPill`, `remove`, `dismiss` | `TagPill`                                     | It hardcodes `aria-label="Remove"`, so a screen reader hears "Remove" for every tag on the page rather than which one. Needs a prop.                                                                                                                                                 | Jul 2026 |

## Table — searched for, not found

Found by running `npm run find` against every part a table needs, on 1 August 2026. Verified
in source afterwards, because the tool produced two false gaps as well: `sticky footer` is
covered by `stickyHeader` plus sticky summary rows, and `column alignment` by `TableAlign` on
both `TableCell` and `TableHead`. Neither is missing. The rest are.

| Missing                             | Words searched                        | Notes                                                                                                                                                                               |
| ----------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cell truncation / text overflow     | `cell truncate`, `text overflow`      | Nothing in Table. `Sidebar`, `CodeWell` and `TagPill` each truncate their own way — three private implementations and no shared one. The duplication problem again, one level down. |
| Row reordering — dragging rows      | `row drag`, `reorder rows`            | Only columns move. `useColumnReorder` is columns, and the search returning it for "row drag" is a tool defect, not a capability.                                                    |
| Column groups / multi-level headers | `column groups`, `multi level header` | Nothing. A header spanning several columns has no expression.                                                                                                                       |
| Inline cell editing                 | `inline edit`, `editable cell`        | Nothing. `EditableStatusTag` is a display recipe, not editing.                                                                                                                      |
| Aggregate / computed totals         | `aggregate total`                     | Summary rows render; nothing computes them. The product supplies the number.                                                                                                        |
| Copy a cell, print a table          | `copy cell`, `print table`            | Nothing — and arguably neither belongs to Table.                                                                                                                                    |

## A note on method

This compares component **types**, not implementations. Where four teams built the same type, they
almost certainly built it four different ways — different padding, different states, different
naming. Picking a winner per row is a design decision, and the merged library's own "choose the
best variant, then save" flow is built for exactly that.

The count above says what is missing. It does not say which team's version to keep.
