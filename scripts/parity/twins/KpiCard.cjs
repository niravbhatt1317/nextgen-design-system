/* Parity twins: the library's KpiCard / KpiStrip beside the console's Users hero row, which since 2026-09-24 IS this
 * card through the thin adapter in ui/KpiTile.jsx (KpiRow -> KpiStrip; the two invitation metrics share one grouped
 * card). The console is the reference for the card's box and its three lines of type; the strip for the row. */
const PROPS = [
  'backgroundColor', 'color', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius',
  'paddingTop', 'paddingLeft', 'fontSize', 'fontWeight',
];
const CARD = '.kpi-card[data-kpi="card"]';
const GROUP = '[data-kpi="group"]';

module.exports = {
  component: 'KpiCard',
  frames: [
    {
      name: 'the card (Total users, the first tile of the row)',
      props: PROPS,
      story: { id: 'new-components-kpi-card--default', select: CARD },
      console: { path: '/users', select: CARD },
      mock: null,
    },
    {
      name: 'the label (12/500 in neutral-90)',
      props: PROPS,
      story: { id: 'new-components-kpi-card--default', select: `${CARD} .kpi-label` },
      console: { path: '/users', select: `${CARD} .kpi-label` },
      mock: null,
    },
    {
      name: 'the value (24/500 in neutral-130)',
      props: PROPS,
      story: { id: 'new-components-kpi-card--default', select: `${CARD} .kpi-value` },
      console: { path: '/users', select: `${CARD} .kpi-value` },
      mock: null,
    },
    {
      name: 'the hint (12/500 in neutral-50)',
      props: PROPS,
      story: { id: 'new-components-kpi-card--default', select: `${CARD} .kpi-hint` },
      console: { path: '/users', select: `${CARD} .kpi-hint` },
      mock: null,
    },
    {
      name: 'the grouped card (the two invitation metrics behind one edge)',
      props: PROPS,
      story: { id: 'new-components-kpi-card--group', select: GROUP },
      console: { path: '/users', select: GROUP },
      mock: null,
    },
    {
      /* the console's segments are clickable (the Invitations drawer); the story's are plain - same box either way */
      name: 'a segment of the grouped card (16 sides, 12 top)',
      props: PROPS,
      story: { id: 'new-components-kpi-card--group', select: `${GROUP} .kpi-seg` },
      console: { path: '/users', select: `${GROUP} .kpi-seg` },
      mock: null,
    },
    {
      name: 'the strip (the scrolling row, no box of its own)',
      props: PROPS,
      story: { id: 'new-components-kpi-card-strip--fits', select: '.kpi-strip' },
      console: { path: '/users', select: '.kpi-strip' },
      mock: null,
    },
  ],
};

/* The zones gauge (KpiGauge shape="zones", 2026-10-28) beside the console Health's headline gauge (charts.tsx
 * ZonesGauge, .hl-zg): Agent Fleet → Health → Overview, the first card ("Agents sending data", 98.5%, On target). */
const ZG_STORY = 'new-components-kpi-card--gauge-zones';
const toHealth = async (page) => {
  const customer = page.getByText('Northwind Retail', { exact: true }).first();
  if ((await customer.count()) && !(await page.getByRole('tab', { name: 'Health' }).count())) {
    await customer.click().catch(() => {});
    await page.waitForTimeout(1500);
  }
  await page.getByRole('tab', { name: 'Health' }).first().click();
  await page.waitForTimeout(1500);
};
const zg = (name, props, storySel, consoleSel) => ({
  name,
  props,
  story: { id: ZG_STORY, select: storySel },
  console: { path: '/agent-fleet', select: consoleSel, open: toHealth },
  mock: null,
});
module.exports.frames.push(
  zg(
    'zones · the drawing, 104 × 62',
    ['rectWidth', 'rectHeight', 'display'],
    '.kpi-zones',
    '.hl-zg'
  ),
  zg(
    'zones · the red zone, faint',
    ['stroke', 'strokeOpacity', 'strokeWidth', 'fill'],
    '.kpi-zones .kpi-zones-zone[data-tone="crit"]',
    '.hl-zg .hl-zg__zone[data-tone="crit"]'
  ),
  zg(
    'zones · the amber zone',
    ['stroke', 'strokeOpacity'],
    '.kpi-zones .kpi-zones-zone[data-tone="warn"]',
    '.hl-zg .hl-zg__zone[data-tone="warn"]'
  ),
  zg(
    'zones · the green zone',
    ['stroke', 'strokeOpacity'],
    '.kpi-zones .kpi-zones-zone[data-tone="good"]',
    '.hl-zg .hl-zg__zone[data-tone="good"]'
  ),
  zg(
    'zones · the dot, full colour, ringed in the ground',
    ['fill', 'stroke', 'strokeWidth', 'rectWidth'],
    '.kpi-zones .kpi-zones-dot',
    '.hl-zg .hl-zg__dot'
  ),
  zg(
    'zones · the value',
    ['fill', 'fontSize', 'fontWeight', 'fontVariantNumeric'],
    '.kpi-zones .kpi-zones-number',
    '.hl-zg .hl-zg__n'
  ),
  zg(
    'zones · the zone word, in its ink',
    ['fill', 'fontSize', 'fontWeight'],
    '.kpi-zones .kpi-zones-word',
    '.hl-zg .hl-zg__w'
  ),
  zg(
    'zones · an end label',
    ['fill', 'fontSize'],
    '.kpi-zones .kpi-zones-end',
    '.hl-zg .hl-zg__end'
  ),
  {
    ...zg(
      'zones · the version card, rolling out (info)',
      ['stroke', 'strokeOpacity'],
      '.kpi-card:nth-child(3) .kpi-zones-zone[data-tone="info"]',
      '.hl-zg__zone[data-tone="info"]'
    ),
  }
);
