---
'@mtdt/nextgen-design-system': minor
---

Button is the merged console's button (10 September 2026). Seven looks — primary, secondary, outline, ghost, destructive, destructiveGhost and link — at three heights of 28, 32 and 36, with 32 the default.

One text size everywhere, 13/20 at weight 500, and one glyph size everywhere, 16 drawn at a 1.5 stroke. The height is not set directly: it falls out of the 20px line the label sits on, so 6 above and 6 below make 32, 4 and 4 make 28, 8 and 8 make 36. Padding is decided by what meets each edge rather than by the size — 16 against a word, 12 against a glyph — so a button with a leading glyph is 12 on the left and 16 on the right, and the two figures swap when the glyph trails. Icon-only is a square the height of its size. Corner 8 throughout.

`secondary` is now a quiet fill with no border, which is what separates it from `outline`; together with `primary` that gives three volumes a reader can rank without reading the labels. Hover and press move along the neutral ramp instead of fading the fill, because fading blends a colour toward the page behind it and costs a white label its contrast.

`loading` wears the disabled face with a spinner on it: in both cases there is nothing for the reader to do, and the turning glyph is what says wait rather than no. It works on an icon-only square too. Keyboard focus lights the button's own edge and lifts its fill, with nothing drawn outside the box, so the mark can never touch a neighbour and the layout never moves. A `link` carries an outbound marker that holds its place at all times and only shows on hover, so a sentence containing one never reflows.

The previous Button is `ButtonOld`, deprecated, kept until 1.0.0 for everything left out on purpose: the success and AI families, the soft and outlined destructive steps, the extra-small and extra-large heights, the pill, circle and square shapes, elevation, uppercase, ripple, corner badges, shortcut chips and the built-in tooltip. Stories that demonstrate those now import `ButtonOld`.
