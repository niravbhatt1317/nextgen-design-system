/* Parity twins: the library's LeftNav (New Components, the console's workspace navigation ported as a parallel part)
 * beside the rail the console draws on Users today - which is LeftNavOld, imported AS LeftNav in ShellNav.jsx
 * ("LeftNavOld ON PURPOSE", 2026-09-11). The frame compared is the panel itself: its ground, its ink, its width and
 * the hairline on its right. Both panels read mdt-bg-neutral-10 / --mdt-nav-background and mdt-border-border. */
const PANEL = ['backgroundColor', 'color', 'width', 'borderRightWidth', 'borderRightStyle', 'borderRightColor'];

module.exports = {
  component: 'LeftNav',
  frames: [
    {
      name: 'the settings rail · the panel (256 wide, one shade back from the page, a hairline on the right)',
      props: PANEL,
      story: { id: 'new-components-leftnav--settings', select: 'nav.lnn-scope' },
      console: { path: '/users', select: 'nav[aria-label="Settings"]' },
      mock: null,
    },
  ],
};
