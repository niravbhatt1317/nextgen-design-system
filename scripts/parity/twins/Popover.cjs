/* Parity twins: the library's Popover (New Components, 2026-09-26 - the part that owns the overlay surface) beside the
 * console's quick-filter popover on Users, which is this same Popover as the DataTable renders it. The frame compared
 * is the surface itself - ground, ink, edge, radius, shadow - never the content, which each caller pads and sizes. */
const STORY = 'new-components-popover--the-surface';
/* the story opens its popover on render (defaultOpen); give the popper its moment */
const openStory = async (page) => {
  await page.waitForSelector('[data-surface="overlay"]', { timeout: 5000 });
  await page.waitForTimeout(300);
};
/* the console: the Columns door in the Users toolbar opens a library Popover (the Status quick filter is a dropdown menu) */
const openConsole = async (page) => {
  await page.locator('button[aria-label="Manage columns"]').first().click();
  await page.waitForSelector('[data-radix-popper-content-wrapper] [aria-label="Columns"]', { timeout: 5000 });
  await page.waitForTimeout(300);
};
const CONSOLE_PANEL = '[data-radix-popper-content-wrapper] [aria-label="Columns"]';

/* THE TWO MENU VARIANTS (2026-10-29): the action menu beside the Users row menu (Edit details · Disable user, the red
 * Delete user last under its divider - the same words as the story), the quick filter beside the Users Status quick
 * filter. Both sides are the same menu DOM: [role="menu"], [role="menuitem"], [role="menuitemcheckbox"]. The width is
 * left out: each menu is as wide as its own longest item. */
const park = (page) => page.mouse.move(0, 0);
const AM_STORY = 'new-components-popover--action-menu';
const QF_STORY = 'new-components-popover--quick-filter';
/* the story's play clicks the door a moment after render */
const openStoryMenu = async (page) => {
  await page.waitForSelector('[role="menu"]', { timeout: 6000 });
  await park(page);
  await page.waitForTimeout(300);
};
const openUsersMenu = async (page) => {
  const row = page.locator('table tbody tr').first();
  await row.hover();
  await row.locator('button[aria-label="Row actions"]').first().click();
  await page.waitForSelector('[role="menu"]', { timeout: 5000 });
  await park(page);
  await page.waitForTimeout(350);
};
const openUsersStatus = async (page) => {
  await page.locator('button[aria-label="Filter by status"]').first().click();
  await page.waitForSelector('[role="menu"]', { timeout: 5000 });
  await park(page);
  await page.waitForTimeout(350);
};
const BOX = ['borderTopLeftRadius', 'paddingTop', 'paddingLeft', 'borderTopWidth', 'borderTopColor', 'boxShadow', 'backgroundColor'];
const ROW = ['rectHeight', 'borderTopLeftRadius', 'paddingLeft', 'columnGap', 'fontSize', 'fontWeight', 'color', 'backgroundColor'];
const MENU = '[role="menu"]';
const ITEM = '[role="menuitem"]';
const DANGER = '[role="menuitem"][data-variant="destructive"]';
const TICK = '[role="menuitemcheckbox"]';

module.exports = {
  component: 'Popover',
  frames: [
    {
      name: 'the surface',
      props: ['backgroundColor', 'color', 'borderTopWidth', 'borderTopColor', 'boxShadow'], /* the radius is each caller's: the quick filter rounds its panel to 12 */
      story: { id: STORY, open: openStory, select: '[data-surface="overlay"]' },
      console: { path: '/users', open: openConsole, select: CONSOLE_PANEL },
      mock: null,
    },
    { name: 'action menu · the box', props: BOX, story: { id: AM_STORY, open: openStoryMenu, select: MENU }, console: { path: '/users', open: openUsersMenu, select: MENU }, mock: null },
    { name: 'action menu · an item', props: ROW, story: { id: AM_STORY, open: openStoryMenu, select: ITEM }, console: { path: '/users', open: openUsersMenu, select: ITEM }, mock: null },
    { name: 'action menu · the red action', props: ROW, story: { id: AM_STORY, open: openStoryMenu, select: DANGER }, console: { path: '/users', open: openUsersMenu, select: DANGER }, mock: null },
    { name: 'action menu · the divider', props: ['rectHeight', 'backgroundColor', 'marginTop', 'marginBottom'], story: { id: AM_STORY, open: openStoryMenu, select: '[role="separator"]' }, console: { path: '/users', open: openUsersMenu, select: '[role="separator"]' }, mock: null },
    { name: 'quick filter · the box', props: BOX, story: { id: QF_STORY, open: openStoryMenu, select: MENU }, console: { path: '/users', open: openUsersStatus, select: MENU }, mock: null },
    { name: 'quick filter · a row', props: ROW.filter((p) => p !== 'backgroundColor'), story: { id: QF_STORY, open: openStoryMenu, select: TICK }, console: { path: '/users', open: openUsersStatus, select: TICK }, mock: null },
  ],
};
