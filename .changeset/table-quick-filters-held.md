---
'@mtdt/nextgen-design-system': minor
---

DataTable: quick filters are disabled, not hidden, while More filters holds a filter.

The squares stay in the strip with a tooltip, "Set inside More filters while a
filter is applied". Every search in the table carries a clear ✕. The empty state's
button reads Clear search, Clear filters or Clear all by what is applied, and the
blank state sits in the middle of the visible table. Row and heading menus widen
for a long item. DataTable passes `dockOffset` to the card.
