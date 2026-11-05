/* Parity twins: the library's Card beside two cards in the console.
 *
 * THE CORNER IS READ ON HEALTH'S CARD. The rulebook says cards are 12, and Health's Needs attention card draws it
 * (afm/screens/health/Overview.tsx patches 12 on with a class, the bug report this fix answers). The expiry card in the
 * Users drawer's Add access flow (features/grants/ExpiryStep.jsx, surface="outline") has no patch, so it still draws the
 * library's old 8 until the console takes this version: its corner is left out of its frame on purpose, and every other
 * property of it is still read. */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const PROPS = [
  'backgroundColor', 'color', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius',
  'paddingTop', 'paddingLeft', 'fontSize', 'fontWeight',
];
const NO_CORNER = PROPS.filter((p) => p !== 'borderTopLeftRadius');
const TEXT = ['color', 'fontSize', 'fontWeight', 'lineHeight'];
const ROW = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'columnGap', 'borderTopLeftRadius', 'rectHeight'];

const D = '[role="dialog"]';
const openExpiry = async (page) => {
  await page.locator('table tbody tr').first().click();
  await page.waitForSelector(D, { timeout: 10000 }); await wait(500);
  /* the drawer band is the library Tabs since 2026-09-26: [role="tab"], not .kit-tab */
  await page.locator(`${D} [role="tab"]`, { hasText: /access profiles/i }).first().click(); await wait(500);
  await page.locator(D).getByRole('button', { name: /add access/i }).first().click(); await wait(700);
  await page.locator(`${D} label.kit-row-selectable`).first().click(); await wait(300);
  await page.locator(D).last().getByRole('button', { name: /^next$/i }).first().click(); await wait(700);
  await page.waitForSelector(`${D} [data-slot="card"]`, { timeout: 8000 });
};
const enterHealth = async (page) => {
  await wait(1500);
  const crumb = page.locator('.fsc-crumb').first();
  if (await crumb.count()) {
    await crumb.click(); await wait(300);
    await page.locator('.fsc-row', { hasText: 'Northwind Retail' }).first().click(); await wait(1000);
  }
  await page.locator('[role="tab"]').filter({ hasText: /^Health$/ }).first().click();
  await page.waitForSelector('.hl-row', { timeout: 20000 });
  await page.mouse.move(0, 0); await wait(500);
};
const HEALTH = { path: '/agent-fleet', open: enterHealth };
const HEALTH_CARD = '[data-slot="card"]:has(.hl-rows)';
const HEALTH_ROW = '.hl-rows .hl-row:nth-child(1)';
const PROBLEM_ROW = '[data-frame="problem-row"]:first-child';

/* the Surfaces story has one row per look, each on the page and on a tinted area */
const look = (surface) => `[data-look="${surface}"] [data-ground="page"] [data-slot="card"]`;

module.exports = {
  component: 'Card',
  frames: [
    {
      name: 'filled · the surface (corners 12, the hairline edge)',
      props: PROPS,
      story: { id: 'new-components-card--surfaces', select: look('filled') },
      console: { ...HEALTH, select: HEALTH_CARD },
      mock: null,
    },
    {
      name: 'outline · the surface (edge only, no fill)',
      props: NO_CORNER,
      story: { id: 'new-components-card--surfaces', select: look('outline') },
      console: { path: '/users', open: openExpiry, select: `${D} [data-slot="card"]` },
      mock: null,
    },
    {
      name: 'the body inset (20)',
      props: PROPS,
      story: { id: 'new-components-card--header-body-footer', select: '[data-slot="card-body"]' },
      console: { path: '/users', open: openExpiry, select: `${D} [data-slot="card"] [data-slot="card-body"]` },
      mock: null,
    },
    {
      name: 'problem card · the heading',
      props: TEXT,
      story: { id: 'new-components-card--problem-card', select: '[data-frame="problem-card"] [data-testid="card-header-heading"]' },
      console: { ...HEALTH, select: `${HEALTH_CARD} [data-testid="card-header-heading"]` },
      mock: null,
    },
    {
      name: 'problem card · a row (the 32 tile, 16 to the words, corners 8)',
      props: ROW,
      story: { id: 'new-components-card--problem-card', select: PROBLEM_ROW },
      console: { ...HEALTH, select: HEALTH_ROW },
      mock: null,
    },
    {
      name: 'problem card · the row title (13 / 500 / 20)',
      props: TEXT,
      story: { id: 'new-components-card--problem-card', select: `${PROBLEM_ROW} > :nth-child(2) > :first-child` },
      console: { ...HEALTH, select: `${HEALTH_ROW} > :nth-child(2) > :first-child` },
      mock: null,
    },
    {
      name: 'problem card · the one detail line (12 / 16, faint)',
      props: TEXT,
      story: { id: 'new-components-card--problem-card', select: `${PROBLEM_ROW} > :nth-child(2) > :last-child` },
      console: { ...HEALTH, select: `${HEALTH_ROW} > :nth-child(2) > :last-child` },
      mock: null,
    },
  ],
};
