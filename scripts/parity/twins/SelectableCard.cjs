/* Parity twins: where the same frame lives in the story, the console and the mock.
 * SelectableCard folder, measured 2026-10-28 for the Pick card (PickCard).
 *
 * THE PICK CARD IS NOT LIVE IN THE CONSOLE. Its source is features/fleet-new/afm/shell/PickCard.tsx + pickCard.css,
 * kept for later since 2026-10-19 ("in profile drawer make it into all three option visible for now, keep this
 * element for future use"), and nothing mounts it. What it wears is the option card it folds from - Create profile's
 * "How it ships" card (the console's kit SelectableCard inside Agent Fleet's .afm-tilecards: 14 in, the 40 tile at 6
 * corners, the 20 glyph, 12 to the words, the title on 20, the line 12 on 18) - so that live card is its twin for
 * everything the two share. The first card ("Direct to SaaS") is not the chosen one, so its edge is the resting
 * hairline once the pointer is moved off it.
 *
 * NOT MEASURED HERE, because no console frame draws them: the selector glyph / "Change" door on the right, and the
 * Pick card's own hover fill (the sunken step, with the tile turning to the page ground) - the option card keeps its
 * white on hover. Those were read from pickCard.css by hand. The library SelectableCard itself has no twin yet. */

const openCreateProfile = async (page) => {
  await page.waitForTimeout(1500);
  const tenant = page.locator('text=Northwind Retail').first();
  if (await tenant.count()) {
    await tenant.click().catch(() => {});
    await page.waitForTimeout(1500);
  }
  await page
    .locator('[role="tab"]')
    .filter({ hasText: /^Profiles$/ })
    .first()
    .click();
  await page.waitForTimeout(1200);
  await page
    .locator('button')
    .filter({ hasText: /^Create profile$/ })
    .last()
    .click({ force: true });
  await page.waitForSelector('.afm-ship .kit-sc', { timeout: 15000 });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(600);
};

const STORY = 'new-components-selectablecard--pick-card-at-rest';
const S = '#storybook-root [data-slot="pick-card"]';
const C = '.afm-ship .kit-sc:nth-child(1)';
const CON = (select) => ({ path: '/agent-fleet', open: openCreateProfile, select });

module.exports = {
  component: 'SelectableCard',
  frames: [
    {
      name: 'Pick card · the card at rest (14 in, 12 corners, the 1.5 hairline)',
      props: [
        'display',
        'flexDirection',
        'paddingTop',
        'paddingRight',
        'paddingBottom',
        'paddingLeft',
        'borderTopWidth',
        'borderTopStyle',
        'borderTopColor',
        'boxShadow',
        'borderTopLeftRadius',
        'backgroundColor',
        'color',
        'cursor',
        'userSelect',
        'rectHeight',
      ],
      story: { id: STORY, select: S },
      console: CON(C),
      mock: null,
    },
    {
      name: 'Pick card · the edge under the pointer (the field edge)',
      props: ['borderTopColor', 'boxShadow'],
      story: { id: STORY, select: S },
      console: CON(C),
      mock: null,
      state: 'hover',
    },
    {
      name: 'Pick card · the row (centred, 12 to the words)',
      props: ['display', 'alignItems', 'columnGap'],
      story: { id: STORY, select: `${S} > span` },
      console: CON(`${C} .kit-sc__row`),
      mock: null,
    },
    {
      name: 'Pick card · the 40 tile (sunken fill, 6 corners)',
      props: ['width', 'height', 'borderTopLeftRadius', 'backgroundColor', 'color'],
      story: { id: STORY, select: `${S} [data-slot="pick-card-tile"]` },
      console: CON(`${C} .afm-tile`),
      mock: null,
    },
    {
      name: 'Pick card · the glyph (20)',
      props: ['width', 'height', 'color', 'strokeWidth'],
      story: { id: STORY, select: `${S} [data-slot="pick-card-tile"] svg` },
      console: CON(`${C} .afm-tile svg`),
      mock: null,
    },
    {
      name: 'Pick card · the title (14 / 500 / 20)',
      props: ['fontSize', 'fontWeight', 'lineHeight', 'color'],
      story: { id: STORY, select: `${S} [data-slot="pick-card-title"]` },
      console: CON(`${C} .kit-sc__title`),
      mock: null,
    },
    {
      name: 'Pick card · the line (12 / 18, faint)',
      props: ['fontSize', 'fontWeight', 'lineHeight', 'color'],
      story: { id: STORY, select: `${S} [data-slot="pick-card-description"]` },
      console: CON(`${C} .kit-sc__desc`),
      mock: null,
    },
  ],
};
