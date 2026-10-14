---
'@mtdt/nextgen-design-system': minor
---

Button gains two looks, taking it from seven to nine (Kevin, 2026-10-13).

`variant="fixed"` is the outline face that does **not** follow the theme: the same white fill, light border and dark
label on a light page and a dark one. It runs on seven new `--mdt-fixed-*` tokens - in light they point at the steps
`outline` already uses, and the dark block repeats those light values rather than inverting them. No new colours.

`variant="dashed"` is the "+ Add tag" action: a dashed blue edge and label on no fill, going solid over a light blue
wash under the pointer. It adds no tokens, reusing `--mdt-badge-info-ink` and `-fill`, so dark follows on its own.

Every existing variant is untouched, including its held-on face.
