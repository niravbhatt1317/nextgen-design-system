---
'@mtdt/nextgen-design-system': minor
---

`DataTable`'s quick-filter menu is now headed, the way the Sort menu is headed.

**This changes a default.** Every quick-filter menu gains a heading whether or not the page asks for
one, so a toolbar that has several of them will look different without any code change. The heading
defaults to the filter's own `label`, which already reads "Filter by status" — so nothing needs
passing to get the sensible text. **Pass `heading: null` to keep the bare menu.**

`heading?: ReactNode | null` on `DataTableQuickFilter` overrides it with anything else.

Asked for by the console (`DESIGN-SYSTEM-GAPS.md`, 2026-10-09): the Sort menu carried a "Sort by"
label and the quick-filter menu carried nothing, so a page could not say which column a column of
ticks belonged to. It had reverse-engineered the name off the square's `aria-label` and redrawn it
with a `::before` in `quickFilterHeading.js`, which that fix can now delete.

The 11px/600/uppercase heading rules Pranjal set on the Sort menu (2026-09-11: "users … other
modules sort should look the same") are now one `MENU_HEADING` constant that both menus read, so the
two cannot drift apart. The Sort menu's own appearance is unchanged — same string, same rules.

The heading is a `DropdownMenuLabel`, not a tickable row: the menu's checkbox items, its keyboard
handling and its search box are all untouched.
