---
'@mtdt/nextgen-design-system': minor
---

**New: `KeyValuesBuilder` (New Components → TargetBuilder) - rows of a picked key and the values typed for it; and
`ChipInput` (New Components → Input) - the field that turns typing into chips.** First drawn as the console's network
discovery profile Custom ports (Probing & depth step, `wizard/PortRules.jsx`), Ronak 2026-10-15: "user select the
protocols and then add the port and user can also add the multiple port in the single input also user can add the
multiple protocols ... it should be in the group so user can understood these are the dependable of each other". Made
generic at his word (2026-10-26: "this is not only for the custom port we can use other ways also") - custom ports by
protocol, tags by category, addresses by site: only the props change. ChipInput sits with Input, also his call the same
day ("that is the part of input").

`KeyValuesBuilder`:

- One group on the sunken ground, a row per key: the key picker (224 wide; an option's `hint` shows after its name -
  "SSH (22)"), the values field (a `ChipInput`), the bin. The add button (`addLabel`) under the rows.
- A key another row holds is left out of the picker; the add button is off while a row has no key or every key is in
  use; a row's values field is off until it has a key; a lone blank row has no bin.
- `validateValue` checks each value (none by default); `mono` draws the values in mono; `keyLabel` / `valuesLabel` name
  the controls for a screen reader ("Ports for SSH"); `label` and `info` give the group its label and ⓘ.

`ChipInput`: Enter, a comma or a space adds what is typed; a pasted list adds every value in it; Backspace on an empty
field takes the last chip back; a duplicate is dropped; a value `validate` refuses stays in the field with the red edge
and the message under it, so nothing typed is lost.

New public names: `KeyValuesBuilder`, `KeyValuesBuilderProps`, `KeyValuesOption`, `KeyValuesRow`, `ChipInput`,
`ChipInputProps`. No new tokens, no changed defaults.
