---
'@mtdt/nextgen-design-system': minor
---

Rework `DropdownMenu`, and give it the five shapes a product actually needs.

`DropdownMenu` and `Popover` were the only two components in the set never redesigned — the
library they were copied from, untouched. Opened and measured, the menu had **no maximum height and
no scrolling**, so seven grouped items ran off the bottom of the screen with the rest unreachable;
group headings were 14px semibold in **the exact same ink as a row** (19.18 in light, 16.34 in
dark) so a heading read as something you could press; and every tickable row reserved a 32px
column whether anything was selectable or not.

**New parts, each optional and each leaving no gap when absent:**

|                         |                                                                        |
| ----------------------- | ---------------------------------------------------------------------- |
| `DropdownMenuHeader`    | Names the whole panel. Words **or** a search box, never both           |
| `DropdownMenuSearch`    | Narrows the list. Sits outside the scrolling part, so it never leaves  |
| `DropdownMenuSelectAll` | The band above a several-of-these list, with a real in-between state   |
| `DropdownMenuList`      | Caps the height at 260px and scrolls instead of running off the screen |
| `DropdownMenuFooter`    | Holds a decision, quieter action on the left                           |

**A row now has two ends and they are independent.** `icon` leads and stays with the label when a
`description` pushes the row to two lines; `shortcut`, `trailing` or a submenu arrow trails and
centres on the whole row. Nothing reserves room it is not using — a row with no icon has no icon
column, which is what threw a plan list 29px out of line with its own header.

`DropdownMenuRadioItem` gains `indicator`: `check` trails (the default, right for a long list of
names) or `dot` leads (right for a small set of named choices). Pick one and hold it across a
product — a sort menu and a filter menu that disagree read as two components.

**`DropdownMenuShortcut` now draws `Kbd`** rather than letter-spaced text dimmed with
`opacity-60`. That clears one of the three migrations `COMPONENT-GAP.md` lists as outstanding;
`CommandShortcut` and `Sidebar` are still to do. Prefer `<DropdownMenuItem shortcut={['mod','d']}>`
— the loose component stays for a row composed by hand.

**One new token, and it fixes a live contrast failure.** `--mdt-danger-text` exists because
`--mdt-destructive` is tuned to carry white text _on_ it, which is a different job from being read
_as_ text: on a dark popover it measures **3.43**, under the 4.5 floor. One step lighter clears it
at **5.07** and light mode does not move. Exactly why `--mdt-success` already points at green-70
rather than the brighter green-50.

`Popover`'s fixed 288px width and 16px padding are now defaults rather than facts, and it picks up
the same 16px corner.

Measured in Firefox and Edge, light and dark: 16px panel corner over an 8px row ground, the
select-all band holds one height across all three of its states, its box lands **0.0px** from the
boxes below it, and typing in the search box keeps the letters in the box rather than jumping to a
row. 45 tests on the component, 2,425 across the suite.
