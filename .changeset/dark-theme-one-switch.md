---
'@mtdt/nextgen-design-system': major
---

Dark mode is `[data-theme="dark"]`, and it is the colour map — not a second palette.

`<html data-theme="dark">` is the switch - the console's since 2026-09-24, so the
storybook and the console now read one dark theme rather than three. The block is
generated from the finalised colour map by `scripts/theme-dark.cjs`.

**`<html class="dark">` keeps working**, and is a migration aid rather than a second
switch: the generated block carries both selectors and the `dark:` variant matches
both, so an app on 1.0.0 upgrades without moving its toggle in the same breath as
everything else here. It goes in 3.0.0. Nothing in this library sets it.

**Still breaking, for a different reason.** The dark values themselves come from the
map now, so a theme built against 1.0.0's hand-written dark block will shift - the
switch survives the upgrade, the exact colours do not.

Under the map, **every ramp step carries its own dark value** — `blue-10` is `#EBF4FF`
in light and `#1D3754` in dark, `blue-80` is `#003899` and `#A3CDFF`. A component that
names a wash and an ink gets a dark wash under a light ink without being told, so the
`dark:` twins that used to sit beside them are not just redundant, they name the wrong
end of the ramp. Nineteen were removed across Avatar, Input, Form, Upload, DatePicker,
AdvancedFilter and Table — each one had begun painting a near-white control on the dark
page. Nothing changes in light mode.

`CodeWell surface="dark"` is the one left standing, and it is logged in
`MISSING-TOKENS.md`: the terminal look needs a ground that deliberately does _not_
follow the theme, and the palette has no such token yet.
