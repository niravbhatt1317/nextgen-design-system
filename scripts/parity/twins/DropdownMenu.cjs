/* Parity twins: the library's DropdownMenu beside the console's Users row menu (the one dropdown, ruled
 * 2026-09-16; at the root since 2026-09-22). Repaired 2026-09-26 (evening): the console's row menu is THIS library
 * DropdownMenu now - the library DataTable draws the row's door as a ghost Button named "Row actions" and the Users
 * page fills the menu with DropdownMenuItems (features/users/UsersTable.jsx rowActions: Edit details · Disable user ·
 * Delete user, the last `variant="destructive"`). The old console side looked for a "User actions" door and a
 * portaled plain div (the retired console Popover): none of it exists any more, so every frame missed. Both sides now
 * read the same Radix DOM: [role="menu"], [role="menuitem"], [data-variant="destructive"]. */
const park = (page) => page.mouse.move(0, 0);
const openUsersMenu = async (page) => {
  const row = page.locator('table tbody tr').first();
  await row.hover();
  await row.locator('button[aria-label="Row actions"]').first().click();
  await page.waitForSelector('[role="menu"]', { timeout: 5000 });
  await park(page);
  await page.waitForTimeout(350);
};
const STORY = 'new-components-dropdownmenu--the-menu';
/* the story opens its menu with a real click after render (a menu open on its first render is placed
 * off screen by the popper); the runner clicks the door itself if the menu is not open yet */
const openStoryMenu = async (page) => {
  /* the story's play clicks the door a moment after render; give it that moment, or a second click closes it */
  const opened = await page.waitForSelector('[role="menu"]', { timeout: 4000 }).catch(() => null);
  if (!opened) {
    await page.locator('button[aria-label="Row actions"]').first().click();
    await page.waitForSelector('[role="menu"]', { timeout: 5000 });
  }
  await park(page);
  await page.waitForTimeout(300);
};

const ITEM_PROPS = ['rectHeight', 'borderTopLeftRadius', 'paddingLeft', 'paddingRight', 'paddingTop', 'columnGap', 'fontSize', 'fontWeight', 'lineHeight', 'color', 'backgroundColor'];
const MENU = '[role="menu"]';
const ITEM = '[role="menuitem"]';
const DANGER = '[role="menuitem"][data-variant="destructive"]';

module.exports = {
  component: 'DropdownMenu',
  frames: [
    {
      name: 'the box',
      props: ['borderTopLeftRadius', 'paddingTop', 'paddingLeft', 'borderTopWidth', 'borderTopColor', 'boxShadow', 'backgroundColor', 'rectWidth'],
      story: { id: STORY, open: openStoryMenu, select: MENU },
      console: { path: '/users', open: openUsersMenu, select: MENU },
      mock: null,
    },
    {
      name: 'an item at rest',
      props: ITEM_PROPS,
      story: { id: STORY, open: openStoryMenu, select: ITEM },
      console: { path: '/users', open: openUsersMenu, select: ITEM },
      mock: null,
    },
    {
      name: 'the glyph',
      props: ['rectWidth', 'rectHeight', 'color', 'strokeWidth'],
      story: { id: STORY, open: openStoryMenu, select: `${ITEM} > svg` },
      console: { path: '/users', open: openUsersMenu, select: `${ITEM} > svg` },
      mock: null,
    },
    {
      name: 'an item under the pointer',
      props: ['backgroundColor', 'color'],
      state: 'hover',
      story: { id: STORY, open: openStoryMenu, select: ITEM },
      console: { path: '/users', open: openUsersMenu, select: ITEM },
      mock: null,
    },
    {
      name: 'the destructive row at rest',
      props: ITEM_PROPS,
      story: { id: STORY, open: openStoryMenu, select: DANGER },
      console: { path: '/users', open: openUsersMenu, select: DANGER },
      mock: null,
    },
    {
      name: 'the destructive glyph at rest',
      props: ['rectWidth', 'rectHeight', 'color'],
      story: { id: STORY, open: openStoryMenu, select: `${DANGER} > svg` },
      console: { path: '/users', open: openUsersMenu, select: `${DANGER} > svg` },
      mock: null,
    },
    {
      name: 'the destructive row under the pointer',
      props: ['backgroundColor', 'color'],
      state: 'hover',
      story: { id: STORY, open: openStoryMenu, select: DANGER },
      console: { path: '/users', open: openUsersMenu, select: DANGER },
      mock: null,
    },
    {
      name: 'the destructive glyph under the pointer',
      props: ['color'],
      state: 'hover',
      story: { id: STORY, open: openStoryMenu, select: `${DANGER} > svg` },
      console: { path: '/users', open: openUsersMenu, select: `${DANGER} > svg` },
      mock: null,
    },
  ],
};
