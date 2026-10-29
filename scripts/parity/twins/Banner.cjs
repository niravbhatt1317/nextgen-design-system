/* Parity twins: where the same frame lives in the story, the console and the mock.
 * Banner, measured 2026-10-28 for placement="strip" - the page's notice strip.
 *
 * The console's twin is Collector Fleet's "A collector isn't placed in a network zone" (/collectors, inside Northwind
 * Retail): features/organizations/Strip.jsx - a .strip wrapper (the gutter 22 / 24, at least 44, the tone's bottom
 * hairline, the wash) around the library Banner at placement "page" with its own sides zeroed. The library draws the
 * same strip as ONE element, so the bar's outside (gutter, hairline, wash, height) is read off the console's wrapper
 * and the inside (the 12 top and bottom, the 10 gap, the type) off its banner; the story's single section answers both.
 * The strip shows while its collectors are new to this browser - a fresh headless profile always sees it. No mock. */

const enterCollectors = async (page) => {
  await page.waitForTimeout(1500);
  const tenant = page.locator('text=Northwind Retail').first();
  if (await tenant.count()) {
    await tenant.click().catch(() => {});
    await page.waitForTimeout(1500);
  }
  await page.waitForSelector('.org-strips .strip', { timeout: 20000 });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(400);
};

const STORY = 'new-components-banner--strip';
const S = '#storybook-root [data-slot="banner"]';
const CW = '.org-strips .strip--warning';
const CB = `${CW} [data-slot="banner"]`;
const CON = (select) => ({ path: '/collectors', open: enterCollectors, select });

module.exports = {
  component: 'Banner',
  frames: [
    {
      name: 'strip · the bar (gutter 22 / 24, 44 at least, the hairline, the wash)',
      props: [
        'paddingLeft',
        'paddingRight',
        'minHeight',
        'boxSizing',
        'borderBottomWidth',
        'borderBottomStyle',
        'borderBottomColor',
        'borderTopWidth',
        'borderTopLeftRadius',
        'backgroundColor',
        'rectHeight',
      ],
      story: { id: STORY, select: S },
      console: CON(CW),
      mock: null,
    },
    {
      name: 'strip · inside (12 top and bottom, 10 gap, 14 / 21)',
      props: [
        'display',
        'paddingTop',
        'paddingBottom',
        'columnGap',
        'alignItems',
        'fontSize',
        'lineHeight',
      ],
      story: { id: STORY, select: S },
      console: CON(CB),
      mock: null,
    },
    {
      name: 'strip · the tone glyph (warning triangle, 16)',
      props: ['width', 'height', 'color'],
      story: { id: STORY, select: `${S} [data-slot="banner-icon"] svg` },
      console: CON(`${CB} [data-slot="banner-icon"] svg`),
      mock: null,
    },
    {
      name: 'strip · title (600, the feedback title ink)',
      props: ['fontSize', 'fontWeight', 'lineHeight', 'color'],
      story: { id: STORY, select: `${S} [data-slot="banner-title"]` },
      console: CON(`${CB} [data-slot="banner-title"]`),
      mock: null,
    },
    {
      name: 'strip · its line',
      props: ['fontSize', 'fontWeight', 'lineHeight', 'color', 'marginTop'],
      story: { id: STORY, select: `${S} [data-slot="banner-description"]` },
      console: CON(`${CB} [data-slot="banner-description"]`),
      mock: null,
    },
    {
      name: 'strip · the action, on the row (ghost sm)',
      props: [
        'height',
        'paddingLeft',
        'paddingRight',
        'fontSize',
        'fontWeight',
        'color',
        'backgroundColor',
        'borderTopLeftRadius',
      ],
      story: { id: STORY, select: `${S} [data-slot="banner-actions"] button` },
      console: CON(`${CB} [data-slot="banner-actions"] button`),
      mock: null,
    },
    {
      name: 'strip · the cross (28)',
      props: ['width', 'height', 'color', 'borderTopLeftRadius'],
      story: { id: STORY, select: `${S} [data-slot="banner-dismiss"]` },
      console: CON(`${CB} [data-slot="banner-dismiss"]`),
      mock: null,
    },
    {
      name: 'strip · the row’s end (the actions then the cross, 8 apart)',
      props: ['display', 'columnGap', 'alignItems', 'alignSelf'],
      story: { id: STORY, select: `${S} [data-slot="banner-end"]` },
      console: CON(`${CB} [data-slot="banner-end"]`),
      mock: null,
    },
  ],
};
