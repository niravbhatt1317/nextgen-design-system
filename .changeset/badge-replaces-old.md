---
'@mtdt/nextgen-design-system': minor
---

**Breaking for anyone using `Badge`.** The name now means the badge ported from the merged console: the same three sizes (20 / 24 / 28px), the console's colours, and no stroke by default. What changed: `emphasis="subtle"` is now `fill` (still the default); `slate` and `inverse` join the tones and `ai` stays; a small badge is text or dot only, so its 12px icon is gone; `palette` takes category colours (LDAP, SCIM…). `max`, `truncate`, the icon-only square and the dot on its own work as before, and `badgeVariants` is still exported. A badge is set by the system and is never removable: a label a person adds and can take away is `TagPill`. Dark mode carries the previous pairings until the console's dark pass. Six console colours have no palette name yet and are flagged in `badge.css`.

The previous badge is `BadgeOld` (`BadgeOldProps`, `badgeOldVariants`), deprecated and shown under `Deprecated/Badge Old` in Storybook. To keep the old look, rename the import.

`TagPill` takes the same neutral tint as a neutral `Badge`, so the pair reads as one family, and gains `emphasis="outline"` (a light inset stroke, no fill) on request; fill stays the default and the geometry does not change.

Inside the library, the sort-order chip in `Table` and `DataTable` steps up from small to medium so the arrow and the rank still travel together in one chip.
