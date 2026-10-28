---
'@mtdt/nextgen-design-system': minor
---

**Changed default: every button corner is 8.** A `<button>` that uses the medium corner (`mdt-rounded-md`, 6px) now
gets the full radius, 8px - select and combobox triggers, icon buttons, a banner's close, pager and table buttons.
Fields, menus, popovers and cards keep their radii; round buttons stay round. Pranjal, 2026-10-28: "8, library
follows". The console has drawn every library button at 8 since September through its own `button.mdt-rounded-md`
rule in `global.css`, so the product does not change; the console can delete that rule once it runs this release.
