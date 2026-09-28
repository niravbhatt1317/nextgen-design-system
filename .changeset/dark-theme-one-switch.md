---
'@mtdt/nextgen-design-system': major
---

Dark mode is `[data-theme="dark"]`, and it is the colour map — not a second palette.

**Breaking.** An app that switched themes with `<html class="dark">` must now set
`<html data-theme="dark">`. There is no fallback: the `.dark` block is gone from
`globals.css`, replaced by a `[data-theme='dark']` block generated from the finalised
colour map by `scripts/theme-dark.cjs`. This is the switch the console has used since
2026-09-24, so the storybook and the console now read one dark theme rather than three.

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
