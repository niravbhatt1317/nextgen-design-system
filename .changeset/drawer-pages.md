---
'@mtdt/nextgen-design-system': minor
---

The drawer grows the parts and the navigation the console's drawers were hand-building (Kevin, 2026-10-13).

`SheetContent` gains `closeOnOutsideClick`, `closeOnEscape` and `overlay`, and a `width` that takes pixels (`600`) or
any CSS length (`'40%'`, `'50vw'`); it wins over `size` and never grows past the screen. `modal={false}` on `Sheet`
keeps the page live beside the panel.

New parts: `SheetIdentity` (mark, name, status, meta lines, actions), `SheetSection` (heading, hint, action, a hairline
between sections) and `SheetField` (a 50/50 label - value row that both reads a record and edits it).

New in-drawer navigation: `SheetNavigation`, `SheetPage`, `SheetNavigationTitle` and `useSheetNavigation()` with
`push`, `back`, `reset`, `current` and `depth`. Edit swaps the drawer's content in place and the header becomes the
trail with a back button - "User management › Edit details" - to any depth. `useSheetLeaveGuard` lets a page stop
back from leaving it, so an unsaved form can ask first.
