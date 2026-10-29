---
'@mtdt/nextgen-design-system': minor
---

`Popover` is one popover with three variants (Pranjal, 2026-10-29: "create a new popover component with just two
variant one will be empty card and another will be action menu popover with the rule that there should be divider,
only one red action, and that red cta should be placed below divider and it should always be at bottom"; "divider can
be more than one its just divider with red action is mandatory"; "also include quick filter variant as well in
popover"). Pick it on `<Popover variant>`:

- **`card`** (the default) - the empty card: `<PopoverContent>`, the overlay surface and nothing else. **Unchanged** -
  every part already on `Popover` (the console's 35, and the library's own Combobox, DateInput, InlineTags, LeftNav,
  DataTable and its panels) keeps working as it was.
- **`action-menu`** (new) - a ⋯ menu: `<PopoverActionMenu groups danger />`. The rules are the component's: an icon on
  every item (`icon` is required); a divider between groups, as many as the page groups, or none; **at most one red
  action** (`danger`, a single item), **always last, always under a divider**; a label's trailing "…" is dropped; at
  least 224 wide, a floor.
- **`quick-filter`** (new) - the table toolbar's tick menu: `<PopoverQuickFilter heading options value onValueChange
  searchable />` - the heading naming what it filters, an optional search (the cursor starts in it), a checkbox row per
  value, several at once, a tick does not close it; as wide as its longest value up to 380.

The two menus are menus underneath (the DropdownMenu parts), so they keep arrows, type-to-jump, Escape back to the
trigger, and `role="menu"` / `menuitem` / `menuitemcheckbox`. Measured against the console: the surface, the Users row
menu (box, item, red action, divider) and the Users Status quick filter - 46 properties over 7 frames, all equal.

**`PopoverOld2` (new, Deprecated 2)** - the Popover as it was before today, frozen for side-by-side review under
"Deprecated 2/Popover Old" (`PopoverOld2`, `PopoverOld2Trigger`, `PopoverOld2Content`, `PopoverOld2Anchor`,
`PopoverOld2Close`, `popoverOld2Surface`). Nirav sets the removal version.

New public names: `PopoverActionMenu`, `PopoverQuickFilter`, `PopoverVariant`, `PopoverAction`,
`PopoverActionMenuProps`, `PopoverQuickFilterOption`, `PopoverQuickFilterProps`, and the `PopoverOld2` family. No
tokens added. No default changes.
