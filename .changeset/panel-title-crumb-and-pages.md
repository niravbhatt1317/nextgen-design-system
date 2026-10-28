---
'@mtdt/nextgen-design-system': minor
---

The side panel (`Sheet` with `layout="drawer"`) and its breadcrumb catch up with the console (Pranjal,
2026-10-26: "make all breadcrumbs in sidedrawer like this only ... Where first or other options will be
clickable so no need for back button. Update it in all the sidedrawers", and "actually make the sidedrawer
heading to be 14px").

**Three changed defaults, named - no opt-out, every consumer gets them:**

- **The panel title is 14/600 on a 20 line** (was 16/600 on 24). `SheetTitle` inside `layout="drawer"` only;
  the stack layout's title is unchanged.
- **The Breadcrumb's `drawer` form is 14 on a 20 line, every visible gap 12** (its boxes 7 apart, the 14
  chevron's own inset making up the rest; was 16/24, 10 apart).
- **The Breadcrumb's `drawer` form draws no back button and no nick.** It is a real breadcrumb: every step
  before the last that has an `onSelect` (or an `href`) is the way back - the faint ink at rest, the foreground
  and an underline (neutral-60, 3 below the text) under the pointer, a 2 outline in the ring colour on keyboard
  focus - and is named "Back to <step>". Before, only the back button navigated and an item's `onSelect` /
  `href` were ignored in this form. `onBack` keeps working: it is now what the step before the last does when
  that step has nothing of its own, and `backLabel` names that step.

**A fourth changed default - `SheetSection` takes the console's drawer section** (the fleets' agent and collector
drawers: `SectionHead` / `Note` / `Rows` / `SectionGap`, Nikhil 2026-10-13, step 309: "remove the dividers"):

- the heading row is 24 high at least (was 32), 12 to its action (was 10); the heading 14/600 on its 1.5 line in the
  title ink, `neutral-150` (was 20 line, `foreground`);
- the hint is 12 on a 1.5 line in `neutral-70`, 4 under the heading (was 13/20 in `muted-foreground`, touching it);
- the content sits 16 under the heading (was 12);
- **sections stand 32 apart with no line between them** (was a hairline with 20 above and below).

**Panel pages:** a side panel turns into its next page in place, at the same width, under that breadcrumb.

- `SheetNavigationTitle` draws the trail with every earlier step a way back to its page (was: a back button,
  one step at a time). After a push the focus lands on the step before the last.
- `useSheetNavigation()` gains `backTo(depth, { force? })` - back to any earlier page, what a trail step does.
- `useSheetLeaveGuard` hands its guard a `leave` function (`SheetLeaveGuard`, new type export): call it once the
  person agrees, and the drawer goes where they asked - one step back, or straight to the trail step they
  pressed. A guard that ignores it keeps working; `back({ force: true })` still goes one step.
- New stories: Drawer "List to page" (the console's Agent Fleet Health "Needs attention": a list whose rows open
  as pages of the same 720 drawer, Close shared in the footer) and Breadcrumb "Drawer · three steps".
