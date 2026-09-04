---
'@mtdt/nextgen-design-system': minor
---

Adds `BadgeNew` as a parallel component for review, not yet exported from the package root. It is the merged console's badge as it would ship here: the existing Badge's spacing (20 / 24 / 28px), the console's colours, and no stroke by default. Two shapes (pill, 4px rounded square), three sizes, a dot or an icon (small is text or dot only), an outline emphasis with a light tinted stroke, a solid emphasis for counts, a `palette` prop for category colours, and a × for removable chips at medium and large. Six console colours have no palette name yet and are flagged in `badge-new.css`.
