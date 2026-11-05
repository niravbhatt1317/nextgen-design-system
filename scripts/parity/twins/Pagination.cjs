/* Parity twins: the library's Pagination. The console does not draw it anywhere, so these frames name the story side
 * and the runner flags them. The pager under the console's tables is a different part, TablePager, measured in Table's
 * twin: it has no numbered pages, no links and no filled current page. Pointing this twin at it would only compare two
 * things that look nothing alike. Searched 2026-11-05: the console's source, its installed package, all 122 fixed
 * routes, and the mocks. Give this a console frame the day the console uses Pagination. */
const PROPS = [
  'backgroundColor',
  'color',
  'borderTopWidth',
  'borderTopLeftRadius',
  'paddingLeft',
  'fontSize',
  'fontWeight',
];

module.exports = {
  component: 'Pagination',
  frames: [
    {
      name: 'the pager (nothing in the console to compare it with)',
      props: PROPS,
      story: { id: 'new-components-pagination--default', select: 'nav[aria-label="pagination"]' },
      console: null,
      mock: null,
    },
  ],
};
