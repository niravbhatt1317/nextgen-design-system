/* Parity twins: where the same frame lives in the story, the console and the mock. */
const D = '[role="dialog"]';
const SEG = '[role="radiogroup"] [role="radio"]';
const PROPS = [
  'height', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'gap',
  'borderTopWidth', 'borderLeftWidth', 'borderLeftColor',
  'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius',
  'backgroundColor', 'color', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing',
  'boxShadow', 'opacity', 'outlineStyle', 'cursor', 'transitionDuration',
  'afterBorder', 'afterOpacity', 'afterRadius',
];
/* the expiry card with the switch on: Users → a row → Access profiles → Add access → pick one → Next → the switch */
const openExpiryOn = async (page) => {
  await page.locator('tbody tr').first().locator('td').nth(1).click();
  await page.waitForSelector(D, { timeout: 8000 });
  await page.waitForTimeout(600);
  /* the drawer band is the library Tabs since 2026-09-26: [role="tab"], not .kit-tab */
  await page.locator(`${D} [role="tab"]`, { hasText: 'Access profiles' }).first().click();
  await page.waitForTimeout(300);
  await page.locator(`${D} button`, { hasText: 'Add access' }).first().click();
  await page.waitForTimeout(500);
  await page.locator(`${D} [role="checkbox"]`).first().click({ force: true });
  await page.waitForTimeout(200);
  await page.locator(`${D} button`, { hasText: /^Next$/ }).first().click();
  await page.waitForSelector(`${D} [role="switch"]`, { timeout: 8000 });
  await page.locator(`${D} [role="switch"]`).first().click();
  await page.waitForSelector(`${D} [role="radiogroup"]`, { timeout: 8000 });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(400);
};
/* THE KEYBOARD FRAME (2026-09-26): the ring is :focus-visible on both sides, and Chromium paints it on a script focus()
 * only when the last interaction was the keyboard. The story is reached with no click at all (so the ring shows), the
 * console by six clicks (so it does not) - the same heuristic the Switch and Dialog twins met. One Tab and one Shift+Tab
 * inside the open drawer make the keyboard the last interaction before the runner focuses the segment. */
const openExpiryOnByKeyboard = async (page) => {
  await openExpiryOn(page);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await page.waitForTimeout(150);
};
const MOCK = 'mocks/grants/access-profile.html';

module.exports = {
  component: 'Radio',
  frames: [
    {
      name: 'segmented · the chosen segment (tint + semibold + the 1px primary edge)',
      props: PROPS,
      story: { id: 'new-components-radio--segmented-width', select: `${SEG}[data-state="checked"]` },
      console: { path: '/users', open: openExpiryOn, select: `${D} ${SEG}[data-state="checked"]` },
      mock: { file: MOCK, select: '.seg.on' } /* the mock draws sm (32 / 13) where the console runs md (36 / 14) */,
    },
    {
      name: 'segmented · an unchosen segment · rest',
      props: PROPS,
      story: { id: 'new-components-radio--segmented-width', select: `${SEG}[data-state="unchecked"]` },
      console: { path: '/users', open: openExpiryOn, select: `${D} ${SEG}[data-state="unchecked"]` },
      mock: { file: MOCK, select: '.seg:not(.on)' },
    },
    {
      name: 'segmented · an unchosen segment · hover',
      props: PROPS,
      story: { id: 'new-components-radio--segmented-width', select: `${SEG}[data-state="unchecked"]` },
      console: { path: '/users', open: openExpiryOn, select: `${D} ${SEG}[data-state="unchecked"]` },
      mock: null,
      state: 'hover',
    },
    {
      name: 'segmented · an unchosen segment · focus (the ring drawn inside)',
      props: PROPS,
      story: { id: 'new-components-radio--segmented-width', select: `${SEG}[data-state="unchecked"]` },
      console: { path: '/users', open: openExpiryOnByKeyboard, select: `${D} ${SEG}[data-state="unchecked"]` },
      mock: null,
      state: 'focus',
    },
    {
      name: 'segmented · the strip (one border, the two ends rounded)',
      props: ['height', 'borderTopWidth', 'borderTopStyle', 'borderTopColor', 'borderTopLeftRadius', 'borderBottomRightRadius', 'backgroundColor', 'paddingLeft', 'gap'],
      story: { id: 'new-components-radio--segmented-width', select: '[role="radiogroup"].mdt-w-full' },
      console: { path: '/users', open: openExpiryOn, select: `${D} [role="radiogroup"]` },
      mock: { file: MOCK, select: '.strip' },
    },
  ],
};
