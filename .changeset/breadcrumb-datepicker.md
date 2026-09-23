---
'@mtdt/nextgen-design-system': minor
---

Two new components, ported from the console (Pranjal, 2026-09-22).

**`Breadcrumb`** — says where you are and offers the way back. Two forms: `page`, a row of chevron-separated crumbs for the header band, and `drawer`, which leads with a back button. Depth, not sequence — a journey with steps still ahead is `Stepper`, and doors you can open in any order are `Tabs`.

**`DatePicker`** — the calendar on its own: a month grid with `min`/`max` bounds, a today mark, and Clear and Done. Day-only, as `YYYY-MM-DD`; the console's time picker was deliberately left out. `formatDay`, `parseDay`, `toDay` and `MONTHS_SHORT` come with it for callers that need to read or write the day string.
