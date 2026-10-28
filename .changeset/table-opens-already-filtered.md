---
'@mtdt/nextgen-design-system': minor
---

**A `DataTable` can now open already filtered.** `advancedFilter` gains one optional field, `initial`: a filter to
start with, in the same rows of key · operator · value the More filters panel builds. Asked for by the console
(2026-10-28): the fleets' Change log has a View button that opens Agents or Collectors narrowed to one tag or one
network zone, as a real filter the person can edit or clear (Pranjal's pick over filling the search box).

```tsx
advancedFilter={{
  keys,
  initial: { join: 'and', rows: [{ key: 'zone', op: 'is', value: ['Retail core'] }] },
}}
```

- **It lands exactly as if the person applied it.** The door reads "1 applied", the quick filters are held, and the
  panel opens on that row ready to edit or clear.
- **Read once, when the table first appears** - the same rule as `initialQuery`. To start over, the page gives the
  table a new `key`.
- **A pick key's value is a list** (`['Retail core']`); a text key's value is the typed string (`'env:prod'`).

Nothing changes for a table that does not pass `initial`. No new tokens, no changed defaults.
