/* Parity twins: the library's Icon (Components/Icon) beside the same registry glyph as the console renders it on
 * Users. An Icon has no colour or size of its own - it takes both from where it sits (currentColor, the size prop
 * or its container) and contributes the glyph and the stroke - so each frame pairs the story's Icon with a console
 * Icon that sits in the same kind of place:
 *   · the rail's row glyph is a plain <Icon size={16} /> (ShellNav.jsx) in the page ink, which the Sizes story's sm
 *     step matches property for property;
 *   · the Users table's search glyph is <Icon name="search" size={14} /> as the Input's start adornment
 *     (DataTable.tsx), in the faint ink the Input gives it, which the Input story's Adornments field matches.
 * The Columns door's glyph is deliberately NOT a frame: the ToolbarButton owns its size ([&_svg]:mdt-size-3.5 = 14)
 * and its ink (neutral-90), so against any Icon story it reads 14-against-16 and neutral-90-against-foreground by
 * design - the Toolbar twin is where that square is measured. */
const PROPS = ['width', 'height', 'color', 'strokeWidth'];

module.exports = {
  component: 'Icon',
  frames: [
    {
      name: 'rail row glyph · 16, stroke 2, the page ink (the first Settings row)',
      props: PROPS,
      story: { id: 'components-icon--sizes', select: 'svg[aria-label="Small user icon"]' },
      console: { path: '/users', select: 'nav[aria-label="Settings"] button.snv-row svg' },
      mock: null,
    },
    {
      name: 'search glyph · 14, stroke 2, the faint ink (the Users table\'s search field)',
      props: PROPS,
      story: { id: 'new-components-input--adornments', select: 'div:has(> input[placeholder="Search grants"]) > div > svg' },
      console: { path: '/users', select: 'div:has(> input[aria-label="Search users"]) > div > svg' },
      mock: null,
    },
  ],
};
