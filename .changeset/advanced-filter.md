---
'@mtdt/nextgen-design-system': minor
---

**`AdvancedFilter`** — the "More filters" panel, ported from the console (Pranjal, 2026-09-22).

A page describes the keys its list can be filtered on; the panel builds rows of **key · operator · value** from them, joined by And or Or, and stacking one level deep into groups with their own join. A key is text, a list of options, or a date, and each offers only the operators it can answer — `contains` for text, `within the last` for a date, neither for a list.

It comes with the functions that make the value mean something: **`applyAdvanced(rows, value, keys)`** filters a list, **`countConditions(value)`** is the number for the door, and `matchRow`, `liveItems`, `isComplete` and `isGroup` are there for a page that needs to reason about a filter itself. A half-built row is ignored rather than fought, so the list stays usable while someone is still typing.
