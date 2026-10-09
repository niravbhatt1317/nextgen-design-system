---
'@mtdt/nextgen-design-system': minor
---

AdvancedFilter's five helpers are also exported under qualified names.

`ADVANCED_FILTER_OPERATORS`, `isFilterGroup`, `isFilterComplete`,
`liveFilterItems` and `matchFilterRow` are aliases of `OPERATORS`, `isGroup`,
`isComplete`, `liveItems` and `matchRow` - the same functions, not copies.

The plain names are specific inside `AdvancedFilter.tsx` and vague at the
package root, where `isComplete` could belong to anything. The qualified forms
say what they filter. Prefer them in new code; nothing is deprecated, and
nothing is renamed - renaming a name 1.0.0 published would break every consumer
of it to tidy a word.
