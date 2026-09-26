/* Parity twins: where the same frame lives in the story, the console and the mock. */
const D = '[role="dialog"]';
/* the 28 close box (K-Dialog-09): the same button on the Dialog, the Sheet and the drawer */
const CLOSE = `${D} button.mdt-h-7.mdt-w-7`;
const PROPS = [
  'width', 'height', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'borderTopWidth', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius',
  'backgroundColor', 'color', 'boxShadow', 'opacity', 'outlineStyle', 'cursor', 'transitionDuration',
  'glyphW', 'glyphH', 'glyphColor', 'glyphStroke', 'glyphStrokeWidth',
];
/* Users → the first row's menu → Delete user → the dialog */
const openDeleteUser = async (page) => {
  const row = page.locator('tbody tr').first();
  await row.hover();
  /* the row menu is the library table's since 2026-09-26: its button is named "Row actions" */
  await row.locator('button[aria-label="Row actions"]').click();
  await page.getByText('Delete user', { exact: true }).first().click();
  await page.waitForSelector(CLOSE, { timeout: 8000 });
  await page.waitForTimeout(400);
};
/* THE KEYBOARD FRAME (2026-09-26): both sides draw the ring on :focus-visible, and Chromium paints that on a script
 * focus() only when the last interaction was the keyboard. Each side reaches its dialog by clicks, so the runner's
 * focus() read no ring on the story while the console - whose menu hands focus on by the keyboard path - showed it.
 * One Tab and one Shift+Tab inside the open dialog make the keyboard the last interaction on both sides, the same
 * way the Switch twin does it; the rest and hover frames keep the plain opens. */
const byKeyboard = (open) => async (page) => {
  await open(page);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await page.waitForTimeout(150);
};
/* the story renders a trigger; press it */
const openStory = async (page) => {
  await page.locator('#storybook-root button').first().click();
  await page.waitForSelector(D, { timeout: 8000 });
  await page.waitForTimeout(500);
};

module.exports = {
  component: 'Dialog',
  frames: [
    {
      name: 'close box · rest (28 × 28, corners 6, x at 16 in neutral-90)',
      props: PROPS,
      story: { id: 'new-components-dialog--default', open: openStory, select: CLOSE },
      console: { path: '/users', open: openDeleteUser, select: CLOSE },
      mock: null,
    },
    {
      name: 'close box · hover (neutral-20 ground, glyph in primary)',
      props: PROPS,
      story: { id: 'new-components-dialog--default', open: openStory, select: CLOSE },
      console: { path: '/users', open: openDeleteUser, select: CLOSE },
      mock: null,
      state: 'hover',
    },
    {
      name: 'close box · keyboard focus (1px primary ring, 4px halo at 8%)',
      props: PROPS,
      story: { id: 'new-components-dialog--default', open: byKeyboard(openStory), select: CLOSE },
      console: { path: '/users', open: byKeyboard(openDeleteUser), select: CLOSE },
      mock: null,
      state: 'focus',
    },
  ],
};
