---
'@mtdt/nextgen-design-system': minor
---

Table is the merged console Users table (7 September 2026): a card with 54px rows under a 40px header; a row-number column that becomes checkboxes on hover, on focus, and everywhere once one row is picked; a select-all scope menu (this page, all matching, a number); headings that sort on click, carry a "⋯" menu, drag to a new place by their grip, insert hidden columns in place, and resize by drag or arrow keys; a bulk bar inside the card; a pager built for hundreds of pages, or a "Load more" footer; loading, nothing-found, no-users-yet and could-not-load states; the console's dark mode through the library tokens. DataTable assembles it with the Toolbar strip: search, Filters with a count and no chips, a quick filter that washes its heading, Sort and Columns. Every pill is Badge; PersonCell, ContactChips and TagList carry the Users cells.

- `docked` on Table and DataTable: the card becomes the page. Square corners, no side edges, a 24px inset on the end cells, header and pager pinned while the rows scroll inside; a number from 0 to 1 is the in-between while the page scrolls the card to its dock line. The page decides when; the table only decides how it looks.
- The header checkbox sits on the selection column's axis; the scope chevron hangs off its right edge instead of pushing it left.
- A picked checkbox is one solid fill: the grey border is drawn only while unchecked.
