/* Parity twins: the library's Badge (New Components; since 2026-09-26 its tone colours are the --mdt-badge-<tone>-*
 * tokens) beside the console's status pill in the Users DRAWER (ProfileDrawer.jsx: <Badge size="sm" tone=... dot>),
 * which is this same Badge at the small size. The pill in the table cell is the same part too, but the console lays
 * a page rule over every badge inside a table cell (global.css: `main tbody td [data-tone][data-size] { font-size:
 * 11px }`), so a cell frame measures the console's page, not the part - the drawer frame measures the part. The frame
 * compared is the chip itself - ground, ink, edge, radius, height, side padding, type - never the dot. */
const PROPS = [
  'backgroundColor',
  'color',
  'borderTopWidth',
  'borderTopColor',
  'borderTopLeftRadius',
  'height',
  'paddingLeft',
  'fontSize',
  'fontWeight',
];
const CHIP = '[data-testid="badge"]';
const D = '[role="dialog"]';
/* the Users drawer: click the name cell of the given row */
const openDrawer = (row) => async (page) => {
  await page.locator('tbody tr').nth(row - 1).locator('td').nth(1).click();
  await page.waitForSelector(`${D} ${CHIP}`, { timeout: 8000 });
  await page.waitForTimeout(500);
};

module.exports = {
  component: 'Badge',
  frames: [
    {
      name: 'sm · pill · success with dot (Sarah Johnson, Active - the first Users row, in her drawer)',
      props: PROPS,
      story: { id: 'new-components-badge--tones', select: `${CHIP}[data-tone="success"][data-size="sm"]` },
      console: { path: '/users', open: openDrawer(1), select: `${D} ${CHIP}[data-tone="success"]` },
      mock: null,
    },
    {
      name: 'sm · pill · slate with dot (Michael Smith, Inactive - the second Users row, in his drawer)',
      props: PROPS,
      story: { id: 'new-components-badge--tones', select: `${CHIP}[data-tone="slate"][data-size="sm"]` },
      console: { path: '/users', open: openDrawer(2), select: `${D} ${CHIP}[data-tone="slate"]` },
      mock: null,
    },
  ],
};
