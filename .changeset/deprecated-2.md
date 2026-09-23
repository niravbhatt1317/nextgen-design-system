---
'@mtdt/nextgen-design-system': minor
---

**Deprecated 2** — the seven components this release replaced, kept under their old behaviour so products can move across at their own pace: `InputOld2`, `TextareaOld2`, `SelectOld2`, `AvatarOld2`, `MotadataSwitchOld2`, `TabsOld2` and the `TableOld2` family.

Each is the component exactly as it was, and each carries an `@deprecated` tag naming its replacement — so an editor strikes the name through and the linter says what to use instead. They appear under **Deprecated 2** in the gallery. The removal version is the design owner's to set.

**One caveat worth knowing before you rely on them for comparison:** `TableOld2` imports the _current_ `Avatar`, `Input`, `Toolbar` and `Checkbox`, so it renders the old table's structure wearing this release's one-letter avatar and 32px field. It is a snapshot of the table, not of the page around it.
