/* Parity twins: where the same frame lives in the story, the console and the mock.
 * OrgCard, measured 2026-10-28. The console's twin is src/ui/OrgCard.jsx as Create team draws it (/teams, Create
 * team: "Organization" · "MSP owner organization" · "The team belongs to the active frame..."), found by its own
 * data-org-card hook. The story's Default carries the same three words at the same 512 form width. The page's
 * docked copy of the Create team button hides the band's, so the last one is pressed. No mock exists. */

const openCreateTeam = async (page) => {
  await page.waitForTimeout(1200);
  await page
    .locator('button')
    .filter({ hasText: /^Create team$/ })
    .last()
    .click({ force: true });
  await page.waitForSelector('[data-org-card]', { timeout: 15000 });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(600);
};

const STORY = 'new-components-orgcard--default';
const CON = (select) => ({ path: '/teams', open: openCreateTeam, select });
const CB = '[data-org-card] > div:last-child';

module.exports = {
  component: 'OrgCard',
  frames: [
    {
      name: 'label · 13 / 500, neutral-90, 8 above',
      props: ['fontSize', 'fontWeight', 'lineHeight', 'color', 'marginBottom'],
      story: { id: STORY, select: '[data-slot="org-card-label"]' },
      console: CON('[data-org-card] > div:first-child'),
      mock: null,
    },
    {
      name: 'card · hairline at 10, no fill, 8 in, gap 12',
      props: [
        'display',
        'alignItems',
        'columnGap',
        'paddingTop',
        'paddingRight',
        'paddingBottom',
        'paddingLeft',
        'borderTopWidth',
        'borderTopStyle',
        'borderTopColor',
        'borderTopLeftRadius',
        'borderBottomRightRadius',
        'backgroundColor',
        'rectWidth',
        'rectHeight',
      ],
      story: { id: STORY, select: '[data-slot="org-card-body"]' },
      console: CON(CB),
      mock: null,
    },
    {
      name: 'tile · 40 at 10, the avatar-blue pair',
      props: ['width', 'height', 'borderTopLeftRadius', 'backgroundColor', 'color', 'display'],
      story: { id: STORY, select: '[data-slot="org-card-tile"]' },
      console: CON(`${CB} > span:first-child`),
      mock: null,
    },
    {
      name: 'tile · building glyph (20)',
      props: ['width', 'height', 'color', 'strokeWidth'],
      story: { id: STORY, select: '[data-slot="org-card-tile"] svg' },
      console: CON(`${CB} > span:first-child svg`),
      mock: null,
    },
    {
      name: 'name · 14 / 500, the reading ink',
      props: ['fontSize', 'fontWeight', 'lineHeight', 'color'],
      story: { id: STORY, select: '[data-slot="org-card-name"]' },
      console: CON(`${CB} > span:last-child > span:first-child`),
      mock: null,
    },
    {
      name: 'line · 12 / 1.5, faint, 1 under',
      props: ['fontSize', 'fontWeight', 'lineHeight', 'color', 'marginTop', 'rectHeight'],
      story: { id: STORY, select: '[data-slot="org-card-line"]' },
      console: CON(`${CB} > span:last-child > span:nth-child(2)`),
      mock: null,
    },
  ],
};
