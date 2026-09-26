/* Parity twins: where the same frame lives in the story, the console and the mock. */
const D = '[role="dialog"]';
const PROPS = [
  'width', 'height', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'borderTopWidth', 'borderTopStyle', 'borderTopColor',
  'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius',
  'backgroundColor', 'color', 'boxShadow', 'opacity',
  'glyphW', 'glyphH', 'glyphColor', 'glyphStroke', 'glyphStrokeWidth',
];
const openFirstRow = async (page) => {
  await page.locator('tbody tr').first().locator('td').nth(1).click();
  await page.waitForSelector(D, { timeout: 8000 });
  await page.waitForTimeout(600);
};
/* the lead tile in a table: the tinted square that leads the Name cell (aria-hidden, 32 wide) */
const LEAD = 'tbody tr:nth-child(1) span[aria-hidden="true"].mdt-w-8';

module.exports = {
  component: 'IconTile',
  frames: [
    {
      name: 'md · blue · the Name tile on Teams (two-people glyph)',
      props: PROPS,
      story: { id: 'new-components-icontile--tones', select: 'span.mdt-bg-blue-10' },
      console: { path: '/teams', select: LEAD },
      mock: null,
    },
    {
      name: 'md · blue · the Name tile on Fields (the type glyph)',
      props: PROPS,
      story: { id: 'new-components-icontile--default', select: 'span[aria-hidden="true"]' },
      console: { path: '/fields', select: LEAD },
      mock: null,
    },
    {
      name: 'md · blue · square · the Name tile on Access profiles (key-round)',
      props: PROPS,
      story: { id: 'new-components-icontile--sizes', select: 'span.mdt-w-8' },
      console: { path: '/access-profiles', select: LEAD },
      mock: null,
    },
    {
      name: '2xl · blue · the identity mark in the Teams drawer band (56, corners 12)',
      props: PROPS,
      story: { id: 'new-components-icontile--sizes', select: 'span.mdt-w-14' },
      console: { path: '/teams', open: openFirstRow, select: `${D} span[aria-hidden="true"].mdt-w-14` },
      mock: null,
    },
    {
      /* the Grant drawer's detail rows (Shield · Check · building) wear the library's lg slate as shipped;
       * Add access's GrantTile is the same part under a console inline override (neutral-10, corners 8,
       * key at 18) and is NOT a twin - see the audit report 2026-09-22 */
      name: 'lg · slate · a glyph beside a drawer row (40)',
      /* geometry only: the Sizes story draws its lg tile in blue - no story frame is lg AND slate yet */
      props: ['width', 'height', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius', 'glyphW', 'glyphH', 'glyphStrokeWidth', 'opacity', 'boxShadow'],
      story: { id: 'new-components-icontile--sizes', select: 'span.mdt-w-10' },
      console: { path: '/access-profiles', open: openFirstRow, select: `${D} span[aria-hidden="true"].mdt-w-10.mdt-bg-neutral-30` },
      mock: null,
    },
  ],
};
