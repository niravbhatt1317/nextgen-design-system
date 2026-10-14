---
'@mtdt/nextgen-design-system': minor
---

`ActionCard` - the settings row card the console hand-built as `MethodCard` / `.st-method`, now in the library
(Kevin, 2026-10-13).

Three faces - `default`, a dashed `add` and an inline `edit` - plus `dim`, a badge and a meta line, and the full title in
a tooltip when it is cut off. Right-side slots take a switch, a button or a ⋯ menu. The whole card is clickable through
`onClick` or `href` (`clickable={false}` turns that off) while the controls inside it keep working on their own, so a
switch in the corner does not also open the card.
