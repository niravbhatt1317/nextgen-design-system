---
'@mtdt/nextgen-design-system': patch
---

A published name can no longer leave the package by accident.

`npm run check:api` compares the built `dist/` against a committed baseline of
every name the package exports, and fails if one is gone. Added names are free.

It exists because five of them already did leave. 1.0.0 published `OPERATORS`,
`isGroup`, `isComplete`, `liveItems` and `matchRow`; the console imported the
qualified forms, which a pull request had carried and the fold of that pull
request did not keep. Lint, 3,600 tests and the build were green the whole way,
and the first anyone knew was every table with More filters failing to load.

Nothing about the package changes for a consumer - this is a gate, not an API
change.
