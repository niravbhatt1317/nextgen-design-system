---
'@mtdt/nextgen-design-system': minor
---

Ship `MIGRATION-PROMPT.md` — a single prompt to paste into a fresh Claude Code session opened in a
project being migrated onto this design system.

It assumes the session knows nothing and the person running it has never chosen a component. It
installs the package, writes the design-system rules into that project's own `CLAUDE.md`, starts a
`DESIGN-SYSTEM-GAPS.md`, surveys what is already there before touching anything, and then migrates
one flow at a time with a four-pass verification after each.

Its firmest rule is the one that keeps a migration reviewable: **behaviour must not change.** No
route renames, no refactors, no fixing unrelated things on the way past. A migration that also
refactors cannot be reviewed and cannot be reverted.
