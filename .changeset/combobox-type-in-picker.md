---
'@mtdt/nextgen-design-system': minor
---

`Combobox` gains a type-in mode, `search="field"` (Pranjal, 2026-10-21: "input field itself will act as search …
there should not be two different input field for search and shown results").

**The field itself is the search box; the list only shows results.** There is one input, not a field plus a second
search box inside the open list. A click or ArrowDown opens every option; typing narrows them (by label, value or
description, ignoring case) and lights the first match, so Enter picks it. Escape, Tab or a click elsewhere closes the
list and keeps the last pick; Escape does not reach the drawer or dialog underneath. Reopening shows the whole list
again with the pick ticked and its name selected in the field, so typing replaces it.

- **One-line and two-line options.** An option without a `description` is one line; with one, the description is the
  second line ("353 agents").
- **The pick reads "label | description".** Closed, the field shows the label, a 1px hairline and the description
  (`env:staging | 353 agents`), or the label alone for a one-line option. `renderValue` still overrides it.
- **`emptyMessage` can be a function of the query** - `(query) => string` - so it can say `No tag matches "prod-eu"`.
  This works in both modes.
- `clearable` shows a clear button at rest when something is picked, and a second one while typing that clears only
  the typed text. Disabled options are skipped by the arrow keys and cannot be picked. `name` writes the value into a
  hidden input. In this mode the forwarded ref is the field's `<input role="combobox">`.
- **Icons and groups.** An option may carry an `icon` (a flag, the plus on a "New ..." row), drawn before its label in
  the list and in the picked field, and a `group`: options of one group sit under its heading, in the order given.
- `aria-labelledby` names the field when its label is a heading elsewhere on the page. A reopened long list starts
  scrolled to the pick. The error line wears the Select's alert mark.
- New exported type `ComboboxSearch` (`'list' | 'field'`).

**No default changes.** `search` defaults to `'list'`, which is the Combobox exactly as before: a button with its own
search box at the top of the open list.
