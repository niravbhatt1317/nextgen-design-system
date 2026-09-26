/* Parity twins: where the same frame lives in the story, the console and the mock.
 * Breadcrumb, measured 2026-09-22; repaired 2026-09-26 (evening). No mock exists for the crumb - the console is the
 * only twin.
 * Console facts (2026-09-26): BOTH forms are the library's Breadcrumb now. The PAGE form is ui/Breadcrumb.jsx, a
 * 12-line adapter over <Breadcrumb variant="page">, in the B1 header band - drawn on /fields (Settings › User
 * attributes, the first place clickable). The DRAWER form is ui/DrawerCrumb.jsx over <Breadcrumb variant="drawer">,
 * standing inside the drawer head's h2 while a page is open inside the drawer - reached by opening a user and
 * pressing Edit. The drawer crumb is named after its place ("User management › Edit details"), not "Breadcrumb", so
 * it is found by its data-slot. The runner signs in and opens `path` itself; the opens below only wait and click.
 * The drawer's band is the library Tabs since 2026-09-26 ([role="tablist"]), not .kit-tabs. */

const D = '[role="dialog"]';
const openFields = async (page) => {
  await page.mouse.move(0, 0);
  await page.waitForSelector('nav[aria-label="Breadcrumb"]', { timeout: 20000 });
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

const PAGE = 'new-components-breadcrumb--page';
const DRAWER = 'new-components-breadcrumb--drawer';
const N = '#storybook-root nav[data-slot="breadcrumb"]';
/* the console: the header band's crumb keeps the library's default name; the drawer's is named after its place */
const CN = 'nav[aria-label="Breadcrumb"]';
const H = `${D} h2 nav[data-slot="breadcrumb"]`;

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
      console: { path: '/fields', open: openFields, select: `${CN} li:first-child [data-slot="breadcrumb-label"]` },
      mock: null,
    },
    {
      name: 'page · ancestor · hover (nothing changes but the pointer)',
      props: TEXT,
      story: { id: PAGE, select: `${N} li:nth-child(2) [data-slot="breadcrumb-label"]` },
      console: { path: '/fields', open: openFields, select: `${CN} li:first-child [data-slot="breadcrumb-label"]` },
      mock: null,
      state: 'hover',
    },
    {
      name: 'page · chevron (12)',
      props: GLYPH,
      story: { id: PAGE, select: `${N} [data-slot="breadcrumb-separator"]` },
      console: { path: '/fields', open: openFields, select: `${CN} [data-slot="breadcrumb-separator"]` },
      mock: null,
    },
    {
      name: 'page · current (foreground, cursor default)',
      props: TEXT,
      story: { id: PAGE, select: `${N} [aria-current="page"] [data-slot="breadcrumb-label"]` },
      console: { path: '/fields', open: openFields, select: `${CN} [aria-current="page"] [data-slot="breadcrumb-label"]` },
      mock: null,
    },
    // ── the drawer form (the drawer head's title slot) ──
    {
      name: 'drawer · the row (gap 10)',
      props: ['columnGap', 'alignItems', 'fontSize', 'lineHeight'],
      story: { id: DRAWER, select: N },
      console: { path: '/users', open: openUserEdit, select: H },
      mock: null,
    },
    {
      name: 'drawer · back button (ghost, 28)',
      props: ['width', 'height', 'borderRadius', 'backgroundColor', 'color'],
      story: { id: DRAWER, select: `${N} [data-slot="breadcrumb-back"]` },
      console: { path: '/users', open: openUserEdit, select: `${H} [data-slot="breadcrumb-back"]` },
      mock: null,
    },
    {
      name: 'drawer · back button · hover',
      props: ['backgroundColor', 'color'],
      story: { id: DRAWER, select: `${N} [data-slot="breadcrumb-back"]` },
      console: { path: '/users', open: openUserEdit, select: `${H} [data-slot="breadcrumb-back"]` },
      mock: null,
      state: 'hover',
    },
    {
      name: 'drawer · back glyph (16)',
      props: GLYPH,
      story: { id: DRAWER, select: `${N} [data-slot="breadcrumb-back"] svg` },
      console: { path: '/users', open: openUserEdit, select: `${H} [data-slot="breadcrumb-back"] svg` },
      mock: null,
    },
    {
      name: 'drawer · nick (1 x 16, neutral-30)',
      props: ['width', 'height', 'backgroundColor'],
      story: { id: DRAWER, select: `${N} [data-slot="breadcrumb-nick"]` },
      console: { path: '/users', open: openUserEdit, select: `${H} [data-slot="breadcrumb-nick"]` },
      mock: null,
    },
    {
      name: 'drawer · parent (16/400, faint)',
      props: TEXT,
      story: { id: DRAWER, select: `${N} li:first-child [data-slot="breadcrumb-label"]` },
      console: { path: '/users', open: openUserEdit, select: `${H} li:first-child [data-slot="breadcrumb-label"]` },
      mock: null,
    },
    {
      name: 'drawer · chevron (14, faint)',
      props: GLYPH,
      story: { id: DRAWER, select: `${N} [data-slot="breadcrumb-separator"]` },
      console: { path: '/users', open: openUserEdit, select: `${H} [data-slot="breadcrumb-separator"]` },
      mock: null,
    },
    {
      name: 'drawer · step (16/600, the soft ink)',
      props: TEXT,
      story: { id: DRAWER, select: `${N} [aria-current="page"] [data-slot="breadcrumb-label"]` },
      console: { path: '/users', open: openUserEdit, select: `${H} [aria-current="page"] [data-slot="breadcrumb-label"]` },
      mock: null,
    },
  ],
};
