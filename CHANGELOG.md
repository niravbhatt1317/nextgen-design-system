# Changelog

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
