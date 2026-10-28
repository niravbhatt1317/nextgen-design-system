/* Parity twins: where the same frame lives in the story, the console and the mock.
 * Breadcrumb, measured 2026-09-22; repaired 2026-09-26 (evening); the drawer form re-pointed 2026-10-28. No mock
 * exists for the crumb - the console is the only twin.
 * Console facts: BOTH forms are the library's Breadcrumb. The PAGE form is ui/Breadcrumb.jsx, a 12-line adapter
 * over <Breadcrumb variant="page">, in the B1 header band - drawn on /fields (Settings › User attributes, the
 * first place clickable). The DRAWER form (2026-10-26: a real breadcrumb, no back button, 14/20, even 12 gaps) is
 * the fleets' DrawerTrail and the IAM DrawerCrumb over <Breadcrumb variant="drawer">, each earlier step handed in
 * as a `.drawer-crumb__link` button, the 14/20 and the 7 gaps from global.css (`.kit-drawer-head`). It is read on
 * Agent Fleet › Health: a "Needs attention" row opens its page under «Needs attention › Crashing modules», and
 * on the Users drawer's Edit («User management › Edit details»). The drawer crumb is named after its place, so it
 * is found by its data-slot; the way back is the console's inner button. The runner signs in and opens `path`
 * itself; the opens below only wait and click. */

const D = '[role="dialog"]';
const openFields = async (page) => {
  await page.mouse.move(0, 0);
  await page.waitForSelector('nav[aria-label="Breadcrumb"]', { timeout: 20000 });
};

/* Agent Fleet › Health: pick the customer if the list shows, open the Health tab, press the first "Needs
 * attention" row - the drawer opens on that problem's page, under the trail */
const openNeedsAttentionPage = async (page) => {
  const customer = page.getByText('Northwind Retail').first();
  if (await customer.count()) {
    await customer.click().catch(() => {});
    await page.waitForTimeout(1500);
  }
  await page.getByText('Health', { exact: true }).first().click();
  await page.waitForSelector('.hl-rows button', { timeout: 20000 });
  await page.locator('.hl-rows button').first().click();
  await page.waitForSelector(`${D} h2 nav[data-slot="breadcrumb"]`, { timeout: 10000 });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(400);
};

/* Agent Fleet with a customer picked: the header band's crumb reads «Agent Fleet › Northwind Retail», the first
 * place clickable (/fields holds a single place since the console dropped "Settings" from it) */
const openFleetCrumb = async (page) => {
  const customer = page.getByText('Northwind Retail').first();
  if (await customer.count()) {
    await customer.click().catch(() => {});
  }
  await page.waitForSelector('nav[aria-label="Breadcrumb"] li:nth-child(2)', { timeout: 20000 });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(300);
};

/* keyboard focus, as a person tabbing gets it: a programmatic focus after a mouse click does not light
 * :focus-visible, so both sides step off the target and back with the keyboard (the drawer traps focus, so
 * Shift+Tab from its first stop wraps to the last and Tab wraps back) */
const keyboardOnto = (sel) => async (page) => {
  await page.locator(sel).first().focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  await page.waitForTimeout(200);
};

const openUserEdit = async (page) => {
  await page.waitForSelector('table tbody tr', { timeout: 20000 });
  await page.locator('table tbody tr').filter({ hasText: 'Sarah Johnson' }).first().locator('td').nth(1).click();
  await page.waitForSelector(`${D} [role="tablist"]`, { timeout: 15000 });
  await page
    .locator(`${D} button`)
    .filter({ hasText: /^Edit( details)?$/ })
    .first()
    .click();
  await page.waitForSelector(`${D} h2 nav[data-slot="breadcrumb"]`, { timeout: 10000 });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(300);
};

const TEXT = ['fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'cursor', 'whiteSpace'];
const ROW = ['columnGap', 'fontSize', 'fontWeight', 'lineHeight', 'color', 'alignItems'];
const GLYPH = ['width', 'height', 'color', 'strokeWidth'];
/* the way back: its type at rest, then what the pointer and the keyboard change */
const WAY = [...TEXT, 'borderTopLeftRadius', 'paddingLeft', 'textDecorationLine'];
const WAY_HOVER = ['color', 'textDecorationLine', 'textDecorationColor', 'textUnderlineOffset'];
const WAY_FOCUS = ['outlineStyle', 'outlineWidth', 'outlineOffset', 'outlineColor'];

const PAGE = 'new-components-breadcrumb--page';
const DRAWER = 'new-components-breadcrumb--drawer';
const N = '#storybook-root nav[data-slot="breadcrumb"]';
/* the console: the header band's crumb keeps the library's default name; the drawer's is named after its place */
const CN = 'nav[aria-label="Breadcrumb"]';
const H = `${D} h2 nav[data-slot="breadcrumb"]`;
/* the story's way back IS the label; the console's is the button inside the label */
const STORY_WAY = `${N} li:first-child [data-slot="breadcrumb-label"]`;
const CONSOLE_WAY = `${H} li:first-child button`;
const FLEET = { path: '/agent-fleet', open: openNeedsAttentionPage };
const USERS = { path: '/users', open: openUserEdit };

module.exports = {
  component: 'Breadcrumb',
  frames: [
    // ── the page form (B1 header band) ──
    {
      name: 'page · the row',
      props: ROW,
      story: { id: PAGE, select: N },
      console: { path: '/fields', open: openFields, select: CN },
      mock: null,
    },
    {
      /* the story's clickable place is its middle one; the console's (/fields: Settings) is its first */
      name: 'page · ancestor (clickable)',
      props: TEXT,
      story: { id: PAGE, select: `${N} li:nth-child(2) [data-slot="breadcrumb-label"]` },
      console: { path: '/agent-fleet', open: openFleetCrumb, select: `${CN} li:first-child [data-slot="breadcrumb-label"]` },
      mock: null,
    },
    {
      name: 'page · ancestor · hover (nothing changes but the pointer)',
      props: TEXT,
      story: { id: PAGE, select: `${N} li:nth-child(2) [data-slot="breadcrumb-label"]` },
      console: { path: '/agent-fleet', open: openFleetCrumb, select: `${CN} li:first-child [data-slot="breadcrumb-label"]` },
      mock: null,
      state: 'hover',
    },
    {
      name: 'page · chevron (12)',
      props: GLYPH,
      story: { id: PAGE, select: `${N} [data-slot="breadcrumb-separator"]` },
      console: { path: '/agent-fleet', open: openFleetCrumb, select: `${CN} [data-slot="breadcrumb-separator"]` },
      mock: null,
    },
    {
      name: 'page · current (foreground, cursor default)',
      props: TEXT,
      story: { id: PAGE, select: `${N} [aria-current="page"] [data-slot="breadcrumb-label"]` },
      console: { path: '/fields', open: openFields, select: `${CN} [aria-current="page"] [data-slot="breadcrumb-label"]` },
      mock: null,
    },
    // ── the drawer form (the drawer head's title slot), on the fleet's Needs attention page ──
    {
      /* the nav holds only the trail now (no back button), so its own gap draws nothing - the type is what counts */
      name: 'drawer · the row (14/20, faint)',
      props: ['fontSize', 'lineHeight', 'color', 'alignItems'],
      story: { id: DRAWER, select: N },
      console: { ...FLEET, select: H },
      mock: null,
    },
    {
      name: 'drawer · the trail (7 apart, 12 to the eye)',
      props: ['columnGap', 'alignItems'],
      story: { id: DRAWER, select: `${N} ol` },
      console: { ...FLEET, select: `${H} ol` },
      mock: null,
    },
    {
      name: 'drawer · a step (chevron 7 from the words)',
      props: ['columnGap', 'alignItems', 'rectHeight'],
      story: { id: DRAWER, select: `${N} li:last-child` },
      console: { ...FLEET, select: `${H} li:last-child` },
      mock: null,
    },
    {
      name: 'drawer · the way back (14/400, faint)',
      props: WAY,
      story: { id: DRAWER, select: STORY_WAY },
      console: { ...FLEET, select: CONSOLE_WAY },
      mock: null,
    },
    {
      name: 'drawer · the way back · hover (foreground, underline)',
      props: WAY_HOVER,
      story: { id: DRAWER, select: STORY_WAY },
      console: { ...FLEET, select: CONSOLE_WAY },
      mock: null,
      state: 'hover',
    },
    {
      name: 'drawer · the way back · focus (2 ring outline, 2 out)',
      props: WAY_FOCUS,
      story: { id: DRAWER, open: keyboardOnto(STORY_WAY), select: STORY_WAY },
      console: {
        path: FLEET.path,
        open: async (page) => {
          await FLEET.open(page);
          await keyboardOnto(CONSOLE_WAY)(page);
        },
        select: CONSOLE_WAY,
      },
      mock: null,
      state: 'focus',
    },
    {
      name: 'drawer · chevron (14, faint)',
      props: GLYPH,
      story: { id: DRAWER, select: `${N} [data-slot="breadcrumb-separator"]` },
      console: { ...FLEET, select: `${H} [data-slot="breadcrumb-separator"]` },
      mock: null,
    },
    {
      name: 'drawer · step (14/600, the soft ink)',
      props: TEXT,
      story: { id: DRAWER, select: `${N} [aria-current="page"] [data-slot="breadcrumb-label"]` },
      console: { ...FLEET, select: `${H} [aria-current="page"] [data-slot="breadcrumb-label"]` },
      mock: null,
    },
    // ── the same crumb in IAM (the Users drawer's Edit) ──
    {
      name: 'drawer · IAM row (14/20, faint)',
      props: ['fontSize', 'lineHeight', 'color', 'alignItems'],
      story: { id: DRAWER, select: N },
      console: { ...USERS, select: H },
      mock: null,
    },
    {
      name: 'drawer · IAM way back (14/400, faint)',
      props: WAY,
      story: { id: DRAWER, select: STORY_WAY },
      console: { ...USERS, select: CONSOLE_WAY },
      mock: null,
    },
  ],
};
