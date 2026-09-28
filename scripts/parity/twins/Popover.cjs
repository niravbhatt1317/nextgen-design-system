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
  ],
};
