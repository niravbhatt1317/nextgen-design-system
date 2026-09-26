/* Parity twins: where the same frame lives in the story, the console and the mock. */
const D = '[role="dialog"]';
/* the story's close is the library's own 28 box; the console's drawer hides it and renders SheetClose as
 * `.kit-close` in the header row (K-Sheet-15) - the same 28 / 6 / 16 treatment, so the two are twins */
const STORY_CLOSE = `${D} button.mdt-h-7.mdt-w-7`;
const CONSOLE_CLOSE = `${D} button.kit-close`;
const PROPS = [
  'width', 'height', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'borderTopWidth', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius',
  'backgroundColor', 'color', 'boxShadow', 'opacity', 'outlineStyle', 'cursor', 'transitionDuration',
  'glyphW', 'glyphH', 'glyphColor', 'glyphStroke', 'glyphStrokeWidth',
];
/* the Users drawer: click the first row's name cell */
const openUsersDrawer = async (page) => {
  await page.locator('tbody tr').first().locator('td').nth(1).click();
  await page.waitForSelector(CONSOLE_CLOSE, { timeout: 8000 });
  await page.waitForTimeout(600);
};
/* the story renders a trigger; press it */
const openStory = async (page) => {
  await page.locator('#storybook-root button').first().click();
  await page.waitForSelector(D, { timeout: 8000 });
  await page.waitForTimeout(600);
};

module.exports = {
  component: 'Sheet',
  frames: [
    {
      name: 'close box · rest (28 × 28, corners 6, x at 16 in neutral-90, 120ms)',
      props: PROPS,
      story: { id: 'new-components-sheet--default', open: openStory, select: STORY_CLOSE },
      console: { path: '/users', open: openUsersDrawer, select: CONSOLE_CLOSE },
      mock: null,
    },
    {
      name: 'close box · hover (neutral-20 ground, glyph in primary)',
      props: PROPS,
      story: { id: 'new-components-sheet--default', open: openStory, select: STORY_CLOSE },
      console: { path: '/users', open: openUsersDrawer, select: CONSOLE_CLOSE },
      mock: null,
      state: 'hover',
    },
    {
      name: 'close box · keyboard focus (1px primary ring, 4px halo at 8%)',
      props: PROPS,
      story: { id: 'new-components-sheet--default', open: openStory, select: STORY_CLOSE },
      console: { path: '/users', open: openUsersDrawer, select: CONSOLE_CLOSE },
      mock: null,
      state: 'focus',
    },
  ],
};
