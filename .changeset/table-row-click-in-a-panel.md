---
'@mtdt/nextgen-design-system': patch
---

Table: **a row opens on a click inside a side panel or a dialog.** Up to now a row ignored any click whose target sat
inside `role="dialog"` - the test was meant for a menu or a confirm opened from the row, but it walked past the row and
also matched the panel the table itself sat in, so every `DataTable` inside a `Sheet` (or any dialog) opened nothing on
a click while Enter still worked (found by the console 2026-10-26; Agent Fleet and Collector Fleet read the click
themselves until this ships).

The row now counts only what is inside it: its own buttons, links, fields, menus, dialogs and `data-no-open` parts are
left alone as before, and so is anything it opened that is drawn elsewhere in the page (a portaled menu or confirm,
whose clicks still bubble through the row). No prop, default, token or public name changes.

The console workarounds this replaces, deletable once the console takes this release: the `rowClick` / `fired` wrappers
marked "A ROW'S CLICK INSIDE A DRAWER" in `afm/screens/health/AgentListTable.tsx`, `afm/screens/health/ModuleHealth.tsx`,
`cfm/screens/health/CollectorList.tsx` and `cfm/screens/Unplaced.tsx`.
