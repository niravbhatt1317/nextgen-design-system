# Kevin - Design System Changes

Branch `kevin`. One line per change.

- **2026-10-13 · Button `fixed` variant** - new `variant="fixed"`: the outline look (white fill, light border, dark label) that stays the same in light and dark mode, on 7 new `--mdt-fixed-*` tokens (no new colours); see Storybook → New Components → Button → Fixed.
- **2026-10-13 · ActionCard (new)** - the settings row card from the console mock (`MethodCard` / `.st-method`): `default`, dashed `add` and inline `edit` faces, `dim`, a badge and meta line, the full title in a tooltip on hover, and right-side slots for a switch, button or ⋯ menu; the whole card is clickable with `onClick` or `href` (`clickable={false}` turns it off) while the inner controls keep working on their own; see Storybook → New Components → ActionCard.
- **2026-10-13 · Button `dashed` variant** - new `variant="dashed"` for "+ Add tag" style actions: dashed blue border and label on no fill, solid border over a light blue fill on hover and when held on; uses the existing `--mdt-badge-info-ink` / `-fill` tokens, so dark mode follows; see Storybook → New Components → Button → Dashed.
