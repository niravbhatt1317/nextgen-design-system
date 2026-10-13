---
'@mtdt/nextgen-design-system': minor
---

Twelve parts the console had hand-built, now in the library - ported from their console sources with the same
look and behaviour, nothing redesigned (Pranjal, 2026-10-13).

**New:** `OverflowCount` (the quiet "+N" with its hidden values in a tooltip), `AddPill` (the dashed "+ Add" that
ends a row of tags), `CopyField`, `InfoTip`, `EmptyState`, `BannerStack`, `ConfirmDialog`, `PhoneInput`.

**Changed, every existing prop still working:** `Badge` (a small badge keeps its 12px icon; icon-only small is a
20px square), `Avatar` (`status` corner dot, `logo`, `onEdit`), `KpiGauge` (`shape="ring"`, and `bad` turns it
red), `Sheet` (`size`, `layout="drawer"`, `SheetBand`, `SheetBody`, footer `start`, header `actions`).

**One "+N" everywhere.** `Table`'s TagList now renders `OverflowCount` instead of its own copy of the same
markup - the two were drawn identically in one release, which is how a pair starts to drift.

42 new public names, none dropped.
