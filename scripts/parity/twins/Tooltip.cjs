/* Parity twins: the library's Tooltip bubble (New Components, the console's tooltip on the library's engine, his
 * rulings of 7 September 2026) beside the console's own tooltip - the scheduled-suspension clock in the Organisations
 * list, which renders this same TooltipContent. The frame compared is the bubble: ground, ink, type, padding, corner,
 * shadow and width cap - never the words inside. */
const BUBBLE = '[data-radix-popper-content-wrapper] > [data-state]';
const PROPS = [
  'backgroundColor', 'color', 'fontSize', 'lineHeight', 'fontWeight',
  'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'borderTopLeftRadius', 'borderTopWidth', 'boxShadow', 'maxWidth',
];
/* the story: hover the "Hover me" button and give the delay its moment */
const openStory = async (page) => {
  await page.locator('button', { hasText: 'Hover me' }).first().hover();
  await page.waitForSelector(BUBBLE, { timeout: 5000 });
  await page.waitForTimeout(400);
};
/* the console: an active organisation with a scheduled suspension carries a clock glyph beside its status pill;
 * hovering it opens the tooltip (the data seeds five such rows, every ninth from the fifth) */
const openConsole = async (page) => {
  await page.waitForSelector('table tbody tr', { timeout: 15000 });
  const clock = page.locator('[aria-label^="Suspends"]').first();
  await clock.scrollIntoViewIfNeeded();
  await clock.hover();
  await page.waitForSelector(BUBBLE, { timeout: 5000 });
  await page.waitForTimeout(400);
};

module.exports = {
  component: 'Tooltip',
  frames: [
    {
      name: 'the bubble',
      props: PROPS,
      story: { id: 'new-components-tooltip--default', open: openStory, select: BUBBLE },
      console: { path: '/organizations', open: openConsole, select: BUBBLE },
      mock: null,
    },
  ],
};
