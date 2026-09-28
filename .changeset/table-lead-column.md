---
'@mtdt/nextgen-design-system': minor
---

Table: the lead column is one thing with two faces — a checkbox where the table has bulk actions, a row number under a `#` where it does not.

- `TableLeadHead` / `TableLeadCell` are new. Pass `selectable` and they draw the right face; a page declares whether it acts on many rows and the component does the rest.
- The heading over the row numbers now shows `#`. It used to be blank by design, which read as a column somebody forgot to label.
- Story: Table → Pieces → The lead column, both faces side by side.
