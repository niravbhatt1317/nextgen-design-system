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
