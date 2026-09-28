/* Parity twins: where the same frame lives in the story, the console and the mock. */
const D = '[role="dialog"]';
const PROPS = [
  'width', 'height', 'borderTopWidth', 'borderTopStyle', 'borderTopColor',
  'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius',
  'backgroundColor', 'boxShadow', 'opacity', 'outlineStyle', 'cursor', 'transitionDuration',
  'thumbW', 'thumbH', 'thumbBg', 'thumbShadow', 'thumbRadius', 'thumbInset', 'thumbTransition',
];
/* the Fields drawer's behaviour switches (2026-09-25, the type-first form): Create attribute opens the TYPE MENU
 * first (FieldsPage → TypeMenu, a library Popover with a search field and the type rows); the drawer opens once a type
 * is picked. The hero band renders the button twice (a hidden docked copy for the sticky band), so the visible one is
 * taken. Inside the drawer the three switches sit behind "More settings", closed by default - a new Text attribute
 * gives checked (Show on member forms) · unchecked (Members can edit) · checked (Required).
 * The path ends on ONE Tab press (it lands in the Field name input, the switch stays at rest): the ring is
 * focus-visible on both sides, and Chromium paints it on a script focus() only when the last interaction was the
 * keyboard - after the three clicks above the "focus" frame read no ring in the console while a real Tab draws the
 * same 2px white + 4px blue ring the story draws (probed 2026-09-26). */
const openFieldsDrawer = async (page) => {
  await page.locator('button:visible', { hasText: 'Create attribute' }).first().click();
  await page.waitForSelector('[role="menu"] [role="menuitemradio"]', { timeout: 8000 });
  await page.locator('[role="menu"] [role="menuitemradio"]', { hasText: /^Text$/ }).first().click();
  await page.waitForSelector(D, { timeout: 8000 });
  await page.locator(`${D} button`, { hasText: 'More settings' }).first().click();
  await page.waitForSelector(`${D} [role="switch"]`, { timeout: 8000 });
  await page.mouse.move(0, 0); /* leave the pointer, or "rest" reads as hover */
  await page.keyboard.press('Tab'); /* the last interaction is the keyboard - see above */
  await page.waitForTimeout(600);
};
/* the expiry card: Users → a row → Access profiles → Add access → pick one → Next */
const openExpiry = async (page) => {
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
  await page.waitForTimeout(400);
};
const openExpiryOn = async (page) => {
  await openExpiry(page);
  await page.locator(`${D} [role="switch"]`).first().click();
  await page.mouse.move(0, 0); /* leave the pointer, or "rest" reads as hover */
  await page.waitForTimeout(400);
};
/* THE MOCK'S TRACK IS A UNIT OFF THE TOKEN: it types neutral-40 as #CBD3E1, the value the token rendered before C-115
 * (2026-09-22) corrected it to 218 29% 84% = #CAD3E2 = rgb(202, 211, 226). The story and the console both paint the
 * token, so every "off the mock" on backgroundColor below is the mock being older, not a difference in the part. */
const MOCK = 'mocks/foundation/switch.html';
const mockMdOff = '.sw.md:not(.on):not(.hover):not(.focus):not(.dis):not(.square)';
const mockMdOn = '.sw.md.on:not(.hover):not(.focus):not(.dis):not(.square)';

module.exports = {
  component: 'Switch',
  frames: [
    {
      name: 'sm · off · rest (a Fields drawer toggle)',
      props: PROPS,
      story: { id: 'new-components-switch--sizes', select: '[role="switch"].mdt-h-5' },
      console: { path: '/fields', open: openFieldsDrawer, select: `${D} [role="switch"][data-state="unchecked"]` },
      mock: { file: MOCK, select: '.sw.sm:not(.on)' },
    },
    {
      name: 'sm · off · hover',
      props: PROPS,
      story: { id: 'new-components-switch--sizes', select: '[role="switch"].mdt-h-5' },
      console: { path: '/fields', open: openFieldsDrawer, select: `${D} [role="switch"][data-state="unchecked"]` },
      mock: null /* the mock draws hover at md only */,
      state: 'hover',
    },
    {
      name: 'sm · off · focus (keyboard ring)',
      props: PROPS,
      story: { id: 'new-components-switch--sizes', select: '[role="switch"].mdt-h-5' },
      console: { path: '/fields', open: openFieldsDrawer, select: `${D} [role="switch"][data-state="unchecked"]` },
      mock: null,
      state: 'focus',
    },
    {
      name: 'sm · on · rest',
      props: PROPS,
      story: { id: 'new-components-switch--in-a-table-row', select: '[role="switch"][data-state="checked"]' },
      console: { path: '/fields', open: openFieldsDrawer, select: `${D} [role="switch"][data-state="checked"]` },
      mock: null,
    },
    {
      name: 'md · off · rest (the expiry card)',
      props: PROPS,
      story: { id: 'new-components-switch--sizes', select: '[role="switch"].mdt-h-6' },
      console: { path: '/users', open: openExpiry, select: `${D} [role="switch"]` },
      mock: { file: MOCK, select: mockMdOff },
    },
    {
      name: 'md · off · hover',
      props: PROPS,
      story: { id: 'new-components-switch--sizes', select: '[role="switch"].mdt-h-6' },
      console: { path: '/users', open: openExpiry, select: `${D} [role="switch"]` },
      mock: { file: MOCK, select: '.sw.md.hover' },
      state: 'hover',
    },
    {
      name: 'md · on · rest',
      props: PROPS,
      story: { id: 'new-components-switch--states', select: '[role="switch"][data-state="checked"]' },
      console: { path: '/users', open: openExpiryOn, select: `${D} [role="switch"]` },
      mock: { file: MOCK, select: mockMdOn },
    },
    {
      name: 'md · on · hover',
      props: PROPS,
      story: { id: 'new-components-switch--states', select: '[role="switch"][data-state="checked"]' },
      console: { path: '/users', open: openExpiryOn, select: `${D} [role="switch"]` },
      mock: { file: MOCK, select: '.sw.md.on.hover' },
      state: 'hover',
    },
    {
      name: 'md · disabled (mock only)',
      props: PROPS,
      story: { id: 'new-components-switch--states', select: '[role="switch"]:disabled' },
      console: null,
      mock: { file: MOCK, select: '.sw.md.dis' },
    },
    {
      name: 'lg · off (mock only)',
      props: PROPS,
      story: { id: 'new-components-switch--sizes', select: '[role="switch"].mdt-h-7' },
      console: null,
      mock: { file: MOCK, select: '.sw.lg:not(.on)' },
    },
  ],
};
