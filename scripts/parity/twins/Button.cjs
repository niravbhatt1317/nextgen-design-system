/* Parity twins: the library's Button (New Components, the merged console button: 13/20 text, 32 tall at md, 12 against
 * a glyph and 16 against a word) beside the console's own header buttons on Users, which are this same Button as the
 * console's kit wraps it (compat/om/atoms.jsx: primary→primary, secondary→outline). Both sides carry a leading glyph at
 * md, so the 12/16 padding and the 32 height meet like for like. The console draws its hero actions twice - a compact
 * copy for the scrolled state sits first in the DOM, aria-hidden and invisible - so the frames name the visible one. */
const STORY = 'new-components-button--all-variants';
/* "With a leading glyph", in variant order: primary · secondary · outline · ghost · destructive · destructiveGhost · link */
const ROW = '#storybook-root > div > div:nth-child(1) > div:nth-child(2)';
const HERO = '.hero-actions:not([aria-hidden])';
const PRIMARY = { story: `${ROW} > button:nth-child(1)`, console: `${HERO} > button:nth-child(2)` }; /* Invite users */
const OUTLINE = { story: `${ROW} > button:nth-child(3)`, console: `${HERO} > button:nth-child(1)` }; /* Manage invitations */
const PROPS = [
  'backgroundColor', 'color', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius',
  'height', 'paddingLeft', 'paddingRight', 'columnGap', 'fontSize', 'fontWeight', 'lineHeight',
];

module.exports = {
  component: 'Button',
  frames: [
    {
      name: 'primary at rest (Invite users)',
      props: PROPS,
      story: { id: STORY, select: PRIMARY.story },
      console: { path: '/users', select: PRIMARY.console },
      mock: null,
    },
    {
      name: 'primary under the pointer',
      props: ['backgroundColor', 'color'],
      state: 'hover',
      story: { id: STORY, select: PRIMARY.story },
      console: { path: '/users', select: PRIMARY.console },
      mock: null,
    },
    {
      name: 'outline at rest (Manage invitations)',
      props: PROPS,
      story: { id: STORY, select: OUTLINE.story },
      console: { path: '/users', select: OUTLINE.console },
      mock: null,
    },
    {
      name: 'outline under the pointer',
      props: ['backgroundColor', 'color', 'borderTopColor'],
      state: 'hover',
      story: { id: STORY, select: OUTLINE.story },
      console: { path: '/users', select: OUTLINE.console },
      mock: null,
    },
  ],
};
