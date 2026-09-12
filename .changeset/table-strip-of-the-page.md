---
'@mtdt/nextgen-design-system': minor
---

DataTable: `toolbar` can take the page's own Toolbar element.

A page with no tab strip keeps the 60px `Toolbar` band as page structure. Hand its element to the table (`toolbar={stripEl}`) and the table draws its own search, Filters, quick filter, Sort and Columns inside it instead of in a strip of its own — every control keeps working, and the page has no copy to keep in step. `true` still draws the table's own strip; `false` still draws none. Use a callback ref or state for the element so the table sees it once it exists.
