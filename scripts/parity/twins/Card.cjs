/* Parity twins: the library's Card beside the console's one library Card - the expiry card in the Users drawer's
 * Add access flow (features/grants/ExpiryStep.jsx, surface="outline"). Reached the way the DatePicker twin reaches
 * its calendar, stopping at the expiry step. The console's other cards are its own kit Card, not twins. */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const PROPS = [
  'backgroundColor', 'color', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius',
  'paddingTop', 'paddingLeft', 'fontSize', 'fontWeight',
];
const D = '[role="dialog"]';
const openExpiry = async (page) => {
  await page.locator('table tbody tr').first().click();
  await page.waitForSelector(D, { timeout: 10000 }); await wait(500);
  await page.locator(`${D} button.kit-tab`, { hasText: /access profiles/i }).first().click(); await wait(500);
  await page.locator(D).getByRole('button', { name: /add access/i }).first().click(); await wait(700);
  await page.locator(`${D} label.kit-row-selectable`).first().click(); await wait(300);
  await page.locator(D).last().getByRole('button', { name: /^next$/i }).first().click(); await wait(700);
  await page.waitForSelector(`${D} [data-slot="card"]`, { timeout: 8000 });
};
/* the Surfaces story lays its four cards in a grid: filled, secondary, outline, elevated */
const OUTLINE = '[data-slot="card"]:nth-child(3)';

module.exports = {
  component: 'Card',
  frames: [
    {
      name: 'outline · the surface (edge only, no fill, corners 12)',
      props: PROPS,
      story: { id: 'components-card--surfaces', select: OUTLINE },
      console: { path: '/users', open: openExpiry, select: `${D} [data-slot="card"]` },
      mock: null,
    },
    {
      name: 'outline · the body inset (20)',
      props: PROPS,
      story: { id: 'components-card--surfaces', select: `${OUTLINE} [data-slot="card-body"]` },
      console: { path: '/users', open: openExpiry, select: `${D} [data-slot="card"] [data-slot="card-body"]` },
      mock: null,
    },
  ],
};
