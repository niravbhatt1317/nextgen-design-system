# Changelog

## 0.6.0

### Packaging

- The package can be loaded by Node. Both entry points carried `import './x.css'` statements that Rollup preserved from source, so `require('@mtdt/nextgen-design-system')` failed with `SyntaxError: Unexpected token '.'` — CSS being parsed as JavaScript — and anything rendering on the server hit it. 0.5.1 and every release before it shipped that way.

  The seven per-component stylesheets are now folded into `dist/styles.css` instead, appended after the utilities so the cascade is unchanged. **If you import the package but have never imported `@mtdt/nextgen-design-system/styles.css`, do — component rules now arrive only through that file.** It is the import the README, `AGENTS.md` and the migration prompt have always specified.

### Minor Changes

- bb99ce1: IconTile: a `2xl` size (56, glyph 24, radius 12 when square) - the identity mark at the top of an object drawer, the height of the 56 avatar Users puts there.
- 4a13a21: Table: `expand` — the table drives its own morph **by default**, and one row behaves like a thousand

  Until now the Table only _rendered_ a morph value someone else computed. Its own
  documentation said so: "the page decides when, the table only decides how it
  looks. The page also sets the card's height once docked." That left Pranjal's
  rule living in whoever called the table rather than in the table.

  `expand` moves it inside, and it is **on unless you turn it off** — a rule that
  has to be remembered at every call site is a rule that gets forgotten at one of
  them. Every table:
  - takes the full height under the page's dock line **whatever it holds**
  - widens to the page as it reaches that line, and hands the scroll to its rows
  - keeps its pager on screen instead of letting it float up under a short list

  One rule, two consequences, and neither can now be got wrong by a caller: a
  table expands on scroll **even holding a single row**, and a filtered-down list
  does not suddenly behave like a different component.

  The dock line is read from the page rather than typed: the frame's own published
  offset where that is a plain value, otherwise the band heights it is derived
  from — so changing a band height cannot leave the table docking in the wrong
  place. `dockOffset` is there for pages that are not a `PageFrame`.

  ### What the default does not touch

  The default is safe wherever a table lands because it only engages once it has
  actually found a page to fill — a scrolling ancestor, and room under the dock
  line worth taking. A table in a drawer, a modal or a card finds neither, stays
  an ordinary card and keeps its own `maxHeight`, exactly as before.

  A scrolling box that is **taller than the window** does not count as a page
  either. That is a box growing with its content, not a viewport — the gallery's
  own docs page wraps every story in one — and filling it ratchets: the table
  stretches to the box, the box grows to the table, again and again, until every
  table on the page is 8,000px tall. The table skips such a box and keeps looking
  upward, and a page with no real scroller above the table stays an ordinary card.

  `docked` also keeps its exact contract: pass one and the page keeps the job of
  driving the morph, because `expand` stands down unless it is passed explicitly
  alongside. `expand={false}` opts out of everything.

  ### What it does change

  Any table sitting directly in a scrolling page now fills the height under its
  dock line instead of ending where its rows end. That is the point of the change,
  and it is visible on every list at once — including lists nobody had got round
  to switching on.

- bb99ce1: Table: the lead column is one thing with two faces — a checkbox where the table has bulk actions, a row number under a `#` where it does not.
  - `TableLeadHead` / `TableLeadCell` are new. Pass `selectable` and they draw the right face; a page declares whether it acts on many rows and the component does the rest.
  - The heading over the row numbers now shows `#`. It used to be blank by design, which read as a column somebody forgot to label.
  - Story: Table → Pieces → The lead column, both faces side by side.

- bb99ce1: DataTable: one icon for a quick filter, and pills in its menu.
  - The quick-filter square wears the glyph of the column it filters unless given its own icon, so the strip and the heading always show one mark.
  - `quickFilter.renderOption` draws each value in the menu the way the page asks — Users draws each status as its own Badge, so the menu reads like the column.
  - The Users story's Status mark is the library's own eight-spoke `loader` icon, on the heading and the square alike.

- bb99ce1: Table: the pager strip only appears when there is something to page.

  `pager="auto"` (the default) draws it once there IS a second page — 25 rows at 25 a page have none, 26 have one — and never while loading or in a blank state, where six disabled controls under an empty table were furniture and the blank state already carries the message. A "Load more" footer likewise goes once everything is loaded. `pager="always"` keeps the strip for a list about to grow; `pager="never"` drops it for a list that shows all it has.

- bb99ce1: DataTable: `quickFilter` takes one quick filter or several — each gets its own square and menu in the strip, and a row must satisfy every one that has a tick. A filter's `value` may return several strings; the row passes when any of them is ticked (a service account's home organisation and its reach).
- bb99ce1: Toolbar and DataTable: three details of the strip, by ruling.
  - **Every quick-filter row carries a checkbox**, on or off, like the Filters panel's rows: a person sees at a glance which values are on and that several can be. The menu's own tick, which only appeared once checked, gives way to the box.
  - **The Filters button wears Tabler's funnel.** A new `funnel` icon joins the set — Tabler's `filter`, inlined — and every Filters button in the library draws it in place of the three lines.
  - **A search box inside a Toolbar wears the strip's border**, the same neutral-30 as a ToolbarButton, so the pair reads as one family of controls.

- bb99ce1: DataTable: `toolbar` can take the page's own Toolbar element.

  A page with no tab strip keeps the 60px `Toolbar` band as page structure. Hand its element to the table (`toolbar={stripEl}`) and the table draws its own search, Filters, quick filter, Sort and Columns inside it instead of in a strip of its own — every control keeps working, and the page has no copy to keep in step. `true` still draws the table's own strip; `false` still draws none. Use a callback ref or state for the element so the table sees it once it exists.

- bb99ce1: Table: `toolbar={false}` — the table without its own strip above it.

  On a screen with a tab strip the page carries its own toolbar up there, and a second strip on the table would draw search, Filters, Sort and Columns twice. Pass `toolbar={false}` and the page supplies its own `Toolbar` instead; everything inside the card — frozen columns, grips, heading menus, pager — is unchanged. On by default.

- bb99ce1: Table: three rules the card and its columns now keep.
  - **The reshaping runs over the travel the card actually has.** It was measured against a flat 140px, so a card starting 81px above its dock line rested 42% reshaped, corners half flattened before anyone scrolled. Every card now rests at 0 and reaches 1 exactly at the dock line, however far from it it starts.
  - **A declared column width is held to the minimum (120)**, the same floor the resize handle keeps. A page can no longer declare 110 and get it.
  - **Spare width is shared equally among the content columns**, so a wide card shows wider columns rather than a blank run past the last one. The lead, Name and Action columns keep their ruled widths; a card narrower than its columns still scrolls sideways.

### Patch Changes

- bb99ce1: IconTile: the tile sizes its own glyph — 14 in the 24px tile, 16 in 32, 20 in 40, 24 in 48. A page no longer has to know the ratio, and an icon that arrives at its default 20px no longer overflows the small tile.
- bb99ce1: Input: the border is neutral-30 (neutral-110 in dark), the same edge as the outline Button and the Toolbar's controls. The Toolbar had been forcing that colour onto any input inside it; an Input anywhere else - a search above a table in a drawer - came out darker (the --mdt-input token, neutral-40).
- bb99ce1: DataTable: the Name column resizes like any content column - drag or arrow keys on its heading, a floor of 160 (nameColumn.minWidth overrides it), the shared 720 ceiling, and the width is remembered under the table's storageKey with the other widths. The lead column (checkbox or row number) and Action stay fixed. useTableColumns gains hasWidth(key).
- bb99ce1: DataTable: the column resize handle sits fully inside its own heading (12px ending at the boundary line). It used to straddle the boundary, and because every heading is sticky with a z-index the next heading painted over its far half - only about three pixels could be grabbed with the mouse.
- bb99ce1: Table: the table's own toolbar sits flush with the card's edges — the search box starts where the card starts, the last button ends where it ends — is only as tall as its controls, and keeps 16px to the card. A standalone `Toolbar` keeps its 60px band and 24px inset; a table without its own toolbar leaves the spacing to the page's structure.
- bb99ce1: DataTable: widening one column never narrows another. At rest the content columns share the card's spare width; the first drag freezes every column at its rendered width, after which the elastic tail takes the spare and the table scrolls sideways when the columns outgrow the card. Reset columns brings the sharing back. useTableColumns gains hasAnyWidth and setWidths; TableColGroup takes a tail width.

## 0.5.1

### Patch Changes

- f04a714: `PageFrame` is now actually exported.

  It shipped in 0.5.0 and the changelog announced it, but nothing exported it from
  the package root, so `import { PageFrame } from '@mtdt/nextgen-design-system'`
  returned nothing. The bundle entry is `src/index.ts`, and the component was not
  reachable from it, so no part of it reached `dist/` — the release described a
  component nobody could import.

  `PageFrame`, `PageHeader`, `PageHero`, `PageBand` and `PageSurface` are exported
  now, with their prop types and `PageBandVariant`.

  Nothing about the component changed. This is the export line it should have had
  in 0.5.0.

## 0.5.0

### Minor Changes

- 624296d: Button is the merged console's button (10 September 2026). Seven looks — primary, secondary, outline, ghost, destructive, destructiveGhost and link — at three heights of 28, 32 and 36, with 32 the default.

  One text size everywhere, 13/20 at weight 500, and one glyph size everywhere, 16 drawn at a 1.5 stroke. The height is not set directly: it falls out of the 20px line the label sits on, so 6 above and 6 below make 32, 4 and 4 make 28, 8 and 8 make 36. Padding is decided by what meets each edge rather than by the size — 16 against a word, 12 against a glyph — so a button with a leading glyph is 12 on the left and 16 on the right, and the two figures swap when the glyph trails. Icon-only is a square the height of its size. Corner 8 throughout.

  `secondary` is now a quiet fill with no border, which is what separates it from `outline`; together with `primary` that gives three volumes a reader can rank without reading the labels. Hover and press move along the neutral ramp instead of fading the fill, because fading blends a colour toward the page behind it and costs a white label its contrast.

  `loading` wears the disabled face with a spinner on it: in both cases there is nothing for the reader to do, and the turning glyph is what says wait rather than no. It works on an icon-only square too. Keyboard focus lights the button's own edge and lifts its fill, with nothing drawn outside the box, so the mark can never touch a neighbour and the layout never moves. A `link` carries an outbound marker that holds its place at all times and only shows on hover, so a sentence containing one never reflows.

  The previous Button is `ButtonOld`, deprecated, kept until 1.0.0 for everything left out on purpose: the success and AI families, the soft and outlined destructive steps, the extra-small and extra-large heights, the pill, circle and square shapes, elevation, uppercase, ripple, corner badges, shortcut chips and the built-in tooltip. Stories that demonstrate those now import `ButtonOld`.

- 5fce5b1: KpiCard and KpiStrip: the merged console's KPI tile (7 September 2026). One metric on one card (label, rounded number, quiet line, an optional trend chip as a Badge, a chart area pinned right with KpiGauge and KpiBars first), or a group of two to n metrics sharing one card split by inset hairlines. Clickable is a switch per card or segment, off by default, with the console's hover cue. A plain card has a 174px floor and no ceiling; a chart card no floor and 270 natural. KpiStrip is the row: cards grow evenly until the row is full, then it scrolls sideways instead of squeezing, bleeding through the page inset so a cut card is cut at the page edge. Nothing deprecated: the library had no KPI piece; Card and IconTile are untouched.
- 6065087: PageFrame: the default page layout of the merged console

  The layer above the components — where things go, rather than what they look
  like. A navigation rail that never moves sits beside ONE scroll container, and
  that container holds four bands in a fixed order:
  - `PageHeader` (B1) — 60 tall, pinned at 0, always rendered because it is the
    page's fixed anchor. Carries the breadcrumb, never a global control. The one
    band that keeps a hairline.
  - `PageHero` (B2) — the page's single H1 with its badge, supporting line and an
    action cluster of one to three buttons; banners and the KPI strip go in as
    children. Never pinned.
  - `PageBand` (B2t/B3) — 60 tall, pinned at 58. `variant="tabs"` or
    `variant="toolbar"`, and a page renders exactly one of them, never both.
  - `PageSurface` (B4) — a natural-height stack riding the page scroll, never a
    scroller of its own.

  Two things are derived rather than typed, so they cannot drift:
  - `--mdt-thead-top` is calculated from the two band heights, so a table inside
    the frame docks at the right offset without knowing what the bands are.
  - The surface's inset comes from the band actually rendered above it, through a
    CSS sibling rule. Under a toolbar band it is 6 above and 20 below; under a tab
    band it is 16 on both sides, because a tab band ends in the active tab's 2px
    underline and at 6px of air that line and the table's own top edge read as a
    single line.

  The hero hands its action cluster to the header band once it scrolls out of
  view, so the page's main verbs never leave the screen; the hero's own copy stays
  rendered and reachable throughout.

- 8ecb987: Colours: five new families, and a Foundation page that reads itself

  **Five families the palette did not have** — indigo, teal, magenta, cyan and
  lime, 55 shades. Category colours: hues that carry no meaning, so a source chip
  or an avatar never reads as success, warning or danger. Until now they were
  written by hand into chip code because there was nothing here to reach for. The
  anchor shades are exactly the values those chips already painted, so nothing on
  screen moves.

  This is **purely additive**. Not one of the existing 87 shades is touched.

  **Foundation/Colors is rebuilt.** Every swatch is now read live from the running
  stylesheet, so the page cannot drift from the tokens it describes. The page it
  replaces typed out more than a thousand lines of hex by hand and had already
  drifted — several of its values no longer matched what the token resolved to.

  Four short pages instead of one long one:
  - **Palette** — twelve families, 141 shades, click a swatch to copy its token.
  - **What each shade is for** — a stated job per rung, so picking a shade is a
    decision rather than a guess at brightness.
  - **Text on a tint** — each family's published text shade, with its contrast
    measured as the page renders. Red reaches 4.5:1 at -70, most families need
    -80, and yellow and purple have to go to -90.
  - **Where the console and the library disagree** — the 24 token names that paint
    one colour here and another in the console. Still open, and Nirav's call.

  The previous page is kept at **Deprecated/Colors Old** until 1.0.0.

- 23077ed: Tooltip is the merged console's hover bubble on the library's engine (7 September 2026): the console fill and text (neutral-130 with white; neutral-10 with neutral-130 in dark), the library's 6/12 padding, 12/16 type, 10 × 5 arrow, four sides with edge flipping, keyboard focus and screen-reader wiring. A 100ms wait by default, `instant` for chips and counters. Two content pieces from the console: `hint`, a quieter 10px second line, and `items`, a bullet list that scrolls past seven lines. Plain text wraps at `maxWidth` 280 and reads centred. No tones, no sizes. The previous Tooltip is `TooltipOld`, deprecated, kept for side-by-side review until 1.0.0. The Table's ContactChips carry the hint bubble and say "Copied!" after a click; TagList's "+N" lists the rest.

## 0.4.0

### Minor Changes

- fa0191a: **Breaking for anyone using `Badge`.** The name now means the badge ported from the merged console: the same three sizes (20 / 24 / 28px), the console's colours, and no stroke by default. What changed: `emphasis="subtle"` is now `fill` (still the default); `slate` and `inverse` join the tones and `ai` stays; a small badge is text or dot only, so its 12px icon is gone; `palette` takes category colours (LDAP, SCIM…). `max`, `truncate`, the icon-only square and the dot on its own work as before, and `badgeVariants` is still exported. A badge is set by the system and is never removable: a label a person adds and can take away is `TagPill`. Dark mode carries the previous pairings until the console's dark pass. Six console colours have no palette name yet and are flagged in `badge.css`.

  The previous badge is `BadgeOld` (`BadgeOldProps`, `badgeOldVariants`), deprecated and shown under `Deprecated/Badge Old` in Storybook. To keep the old look, rename the import.

  `TagPill` takes the same neutral tint as a neutral `Badge`, so the pair reads as one family, and gains `emphasis="outline"` (a light inset stroke, no fill) on request; fill stays the default and the geometry does not change.

  Inside the library, the sort-order chip in `Table` and `DataTable` steps up from small to medium so the arrow and the rank still travel together in one chip.

- 7f6cc1e: The merged console's foundation colours join the palette as new steps, values untouched (names provisional): `ink-400` #9B9EAA, `ink-500` #727283, `azure-60` #0262DE, `emerald-60` #34A853. In light mode `muted-foreground` now points at `ink-500`, `info` and `ring` at `azure-60`, `success` at `emerald-60`; a new `muted-foreground-subtle` (`ink-400`) covers quiet headings. Dark mode is unchanged. LeftNav New drops its scoped overrides for these and snaps three near-miss values (control border, chip tint, Soon badge fill) to palette steps.

  Flagged for review: `emerald-60` measures 3.06:1 as text on white, under the 4.5 floor, and `success` is used as ink in Badge, Button, Form messages and Icon. `ink-400` is 2.67:1 by design.

- 7f6cc1e: **Breaking for anyone importing `LeftNav`.** The name now means the product navigation ported from the merged console: the workspace rail (account card, search, folder tree, pinned Settings) and beneath it the Settings and Agent Fleet floors reached through the crumb strip. It is exported from the package root as `LeftNav` with `LeftNavTrigger` and its types.

  The previous settings-only navigation is `LeftNavOld` (`LeftNavOldProps`), deprecated and shown under `Deprecated/LeftNav Old` in Storybook; its parts (`LeftNavItem`, `LeftNavGroup`, `DataLeftNav`, `useLeftNavLevels`…) keep their names until the removal pull request. To keep the old look, rename the import; to move, see the LeftNav stories.

- 42c25a0: Table family deprecated: the previous Table, DataTable and their menus, pager, bulk bar and hooks are now TableOld / DataTableOld under Deprecated, kept for side-by-side comparison until the removal pull request. A new Table, the merged console Users table, replaces them.
- 42c25a0: Table is the merged console Users table (7 September 2026): a card with 54px rows under a 40px header; a row-number column that becomes checkboxes on hover, on focus, and everywhere once one row is picked; a select-all scope menu (this page, all matching, a number); headings that sort on click, carry a "⋯" menu, drag to a new place by their grip, insert hidden columns in place, and resize by drag or arrow keys; a bulk bar inside the card; a pager built for hundreds of pages, or a "Load more" footer; loading, nothing-found, no-users-yet and could-not-load states; the console's dark mode through the library tokens. DataTable assembles it with the Toolbar strip: search, Filters with a count and no chips, a quick filter that washes its heading, Sort and Columns. Every pill is Badge; PersonCell, ContactChips and TagList carry the Users cells.
  - `docked` on Table and DataTable: the card becomes the page. Square corners, no side edges, a 24px inset on the end cells, header and pager pinned while the rows scroll inside; a number from 0 to 1 is the in-between while the page scrolls the card to its dock line. The page decides when; the table only decides how it looks.
  - The header checkbox sits on the selection column's axis; the scope chevron hangs off its right edge instead of pushing it left.
  - A picked checkbox is one solid fill: the grey border is drawn only while unchecked.
  - A table without selection keeps its row-number column: the numbers never become checkboxes, and "Row number" is a toggle in the Columns panel (remembered with the layout). In a table with selection the column is locked, since it carries the checkboxes.

- fa0191a: `TagPill` follows the merged console's tag: 28px tall, a 12px left inset, an 8px corner on the square shape (the pill stays round), the same neutral tint as a neutral `Badge`, and an opt-in `emphasis="outline"` (a 1px inset stroke, no fill). The 8px gap before the cross, the hover lift and the plain "Remove" name stay as they were. The cross now draws in a 16px well; an invisible ring keeps its 24 × 24 pointer target.

  The previous tag is `TagPillOld` (`TagPillOldProps`, `tagPillOldVariants`), deprecated and shown under `Deprecated/TagPill Old` in Storybook for side-by-side review.

- 64a8cf0: **Breaking for anyone using `Toolbar`.** The name now means the strip the merged console draws above a list: 60px tall, a 24px inset, 10px between controls, on the page ground, with no sizes. `ToolbarSection` (8px between its controls) and `ToolbarSpacer` stay. The previous general-purpose strip, with its `compact` and `spacious` variants and padding switches, is `ToolbarOld` (`ToolbarOldSection`, `ToolbarOldSpacer`, `toolbarOldVariants`), deprecated and shown under `Deprecated/Toolbar Old`.

  Adds `ToolbarButton`, the 32px control that lives in the strip (Filters, a quick filter, Sort, Columns). One look, four states: rest (white ground, neutral-30 edge, slate glyph and 13px label), hover and keyboard focus (ground lifts to neutral-10, edge turns slate), open (the same as hover; a Radix trigger reports it through `data-state`), and active (white ground, slate edge, plus a `count` Badge 12px after the label capped at 9+, or a `dot` on the top-right corner). Applied filters are never shown as chips.

  `TableToolbar`, `TableToolbarActions` and `TableFilterChips` are deprecated: the strip and `ToolbarButton` replace the first two, and applied filters are never shown as chips. They stay under `Deprecated/Table Toolbar` until the removal pull request. `TableSortMenu` and `TableViewMenu` are unaffected. `DataTable` still renders `TableToolbar` and `TableFilterChips` inside itself; it moves to the new strip with the table port, the next piece of this work.

## 0.3.0

### Minor Changes

- a8dd808: Ship `MIGRATION-PROMPT.md` — a single prompt to paste into a fresh Claude Code session opened in a
  project being migrated onto this design system.

  It assumes the session knows nothing and the person running it has never chosen a component. It
  installs the package, writes the design-system rules into that project's own `CLAUDE.md`, starts a
  `DESIGN-SYSTEM-GAPS.md`, surveys what is already there before touching anything, and then migrates
  one flow at a time with a four-pass verification after each.

  Its firmest rule is the one that keeps a migration reviewable: **behaviour must not change.** No
  route renames, no refactors, no fixing unrelated things on the way past. A migration that also
  refactors cannot be reviewed and cannot be reverted.

## 0.2.0

### Minor Changes

- da42134: Ship `AGENTS.md`, `CAPABILITIES.md` and `capability-catalog.json` in the package.

  `AGENTS.md` is the set of rules an AI coding agent must follow inside a project that consumes this
  system: search the catalogue before building, never invent a colour or a size, import the
  stylesheet, log anything genuinely missing to `DESIGN-SYSTEM-GAPS.md`, and check the work twice
  with grep rather than by eye.

  Point a consuming project's agent at it once and the constraints travel with the version:

  ```
  Follow the rules in node_modules/@mtdt/nextgen-design-system/AGENTS.md
  ```

  The catalogue ships alongside it because a rule to "use the design system's component" is
  unenforceable if there is nothing to check against — an agent with no catalogue guesses from type
  definitions, and guesses that a component is missing.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial project setup with Vite, TypeScript, and Tailwind CSS
- Storybook 8.x configuration with essential addons
- Jest testing setup with React Testing Library
- ESLint and Prettier configuration
- Husky pre-commit hooks with lint-staged
- GitHub Actions CI/CD workflows
- Changesets for version management

### Components

- **Button**: Primary button component with variants (primary, secondary, outline, ghost, destructive, link)
- **Input**: Text input with label, error state, and adornment support
- **Card**: Container component with Header, Title, Description, Content, and Footer
- **Dialog**: Modal dialog built on Radix UI Dialog primitive
- **Dropdown**: Dropdown menu built on Radix UI Dropdown Menu primitive

### Utilities

- `cn()`: Class name utility combining clsx and tailwind-merge

## [0.1.0] - YYYY-MM-DD

### Added

- Initial release
