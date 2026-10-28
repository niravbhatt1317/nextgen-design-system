/* Parity twins: where the same frame lives in the story, the console and the mock.
 * ProblemRow, measured 2026-10-28. The console's twin is Agent Fleet's Health tab, the "Needs attention" card
 * (features/fleet-new/afm/screens/health/Overview.tsx issueRow, health.css .hl-row); Collector Fleet's Health draws
 * the same row from the same classes. The console's first row is a warning ("125 hosts with a crashing module"), so
 * the story's second row (the same words, the same level) stands against it. No mock exists - the console is the
 * only twin. The hairline between rows is a ::before and is not read here (the runner reads elements only). */

const enterHealth = async (page) => {
  await page.waitForTimeout(1500);
  const tenant = page.locator('text=Northwind Retail').first();
  if (await tenant.count()) {
    await tenant.click().catch(() => {});
    await page.waitForTimeout(1500);
  }
  await page
    .locator('[role="tab"]')
    .filter({ hasText: /^Health$/ })
    .first()
    .click();
  await page.waitForSelector('.hl-row', { timeout: 20000 });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(500);
};

const STORY = 'new-components-problemrow--needs-attention';
const S = '#storybook-root [data-slot="problem-row"]:nth-child(2)';
const C = '.hl-rows .hl-row:nth-child(1)';
const CONSOLE = (select) => ({ path: '/agent-fleet', open: enterHealth, select });

const ROW = [
  'display',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'marginLeft',
  'marginRight',
  'columnGap',
  'rowGap',
  'alignItems',
  'borderTopLeftRadius',
  'borderTopWidth',
  'backgroundColor',
  'color',
  'cursor',
  'rectHeight',
  'outlineStyle',
];
const TEXT = [
  'fontSize',
  'fontWeight',
  'lineHeight',
  'color',
  'whiteSpace',
  'overflow',
  'textOverflow',
];

module.exports = {
  component: 'ProblemRow',
  frames: [
    {
      name: 'row · rest (grid, 10 / 18 in, 10 bleed, 8 corners)',
      props: ROW,
      story: { id: STORY, select: S },
      console: CONSOLE(C),
      mock: null,
    },
    {
      name: 'row · hover (the accent wash)',
      props: ['backgroundColor', 'cursor'],
      story: { id: STORY, select: S },
      console: CONSOLE(C),
      mock: null,
      state: 'hover',
    },
    {
      name: 'tile · md round, warning (amber)',
      props: ['width', 'height', 'borderTopLeftRadius', 'backgroundColor', 'color'],
      story: { id: STORY, select: `${S} [role="img"]` },
      console: CONSOLE(`${C} [role="img"]`),
      mock: null,
    },
    {
      name: 'tile · glyph (16, alert-triangle)',
      props: ['width', 'height', 'color', 'strokeWidth'],
      story: { id: STORY, select: `${S} [role="img"] svg` },
      console: CONSOLE(`${C} [role="img"] svg`),
      mock: null,
    },
    {
      name: 'title · 13 / 500 / 20, one line',
      props: TEXT,
      story: { id: STORY, select: `${S} [data-slot="problem-row-title"]` },
      console: CONSOLE(`${C} .hl-row__t`),
      mock: null,
    },
    {
      name: 'title · the leading count (600)',
      props: ['fontWeight', 'color'],
      story: { id: STORY, select: `${S} [data-slot="problem-row-title"] > span` },
      console: CONSOLE(`${C} .hl-issue__n`),
      mock: null,
    },
    {
      name: 'detail · 12 / 16, faint, one line',
      props: TEXT,
      story: { id: STORY, select: `${S} [data-slot="problem-row-detail"]` },
      console: CONSOLE(`${C} .hl-row__d`),
      mock: null,
    },
    {
      name: 'View · rest (hidden)',
      props: [...TEXT, 'textDecorationLine', 'textUnderlineOffset', 'opacity'],
      story: { id: STORY, select: `${S} [data-slot="problem-row-view"]` },
      console: CONSOLE(`${C} .hl-row__view`),
      mock: null,
    },
    {
      name: 'View · on the row’s hover (shown)',
      props: ['opacity', 'color', 'textDecorationLine'],
      story: { id: STORY, select: `${S} [data-slot="problem-row-view"]` },
      console: CONSOLE(`${C} .hl-row__view`),
      mock: null,
      state: 'hover',
    },
  ],
};
