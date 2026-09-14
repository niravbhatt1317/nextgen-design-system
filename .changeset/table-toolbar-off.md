---
'@mtdt/nextgen-design-system': minor
---

Table: `toolbar={false}` — the table without its own strip above it.

On a screen with a tab strip the page carries its own toolbar up there, and a second strip on the table would draw search, Filters, Sort and Columns twice. Pass `toolbar={false}` and the page supplies its own `Toolbar` instead; everything inside the card — frozen columns, grips, heading menus, pager — is unchanged. On by default.
