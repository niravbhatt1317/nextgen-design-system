/* Parity twins: where the same frame lives in the story, the console and the mock. */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
/* the console's calendar is compat/iam/DatePicker.jsx, opened from the Users drawer's date field (see DateInput.cjs) */
const openCalendar = async (page) => {
  await page.locator('table tbody tr').first().click();
  await page.waitForSelector('[role=dialog]', { timeout: 10000 }); await wait(500);
  /* the drawer band is the library Tabs since 2026-09-26: [role=tab], not .kit-tab */
  await page.locator('[role=dialog] [role=tab]', { hasText: /access profiles/i }).first().click(); await wait(500);
  await page.locator('[role=dialog]').getByRole('button', { name: /add access/i }).first().click(); await wait(700);
  await page.locator('[role=dialog] label.kit-row-selectable').first().click(); await wait(300);
  await page.locator('[role=dialog]').last().getByRole('button', { name: /^next$/i }).first().click(); await wait(700);
  const sw = page.locator('[role=dialog] [role=switch]').last();
  if ((await sw.getAttribute('aria-checked')) !== 'true') { await sw.click(); await wait(400); }
  const custom = page.locator('[role=dialog] [role=radio]', { hasText: /custom/i }).first();
  if (await custom.count()) await custom.click(); else await page.locator('[role=dialog]').last().getByText(/^custom$/i).first().click();
  await wait(400);
  await page.locator('.kit-datefield').first().click(); await wait(500);
};
const CAL = 'div[style*="width: 336px"]';
const STORY = 'new-components-datepicker--with-clear';

module.exports = {
  component: 'DatePicker',
  frames: [
    { name: 'the grid (294 wide, 7 columns, gap 2)', props: ['width', 'gap'], story: { id: STORY, select: '[role=group] > div:nth-child(3)' }, console: { path: '/users', open: openCalendar, select: `${CAL} > div:nth-child(4)` }, mock: null },
    { name: 'the month (14/600 in the ink)', props: ['fontSize', 'fontWeight', 'color'], story: { id: STORY, select: '[role=group] span[aria-live]' }, console: { path: '/users', open: openCalendar, select: `${CAL} > div:nth-child(2) > span` }, mock: null },
    /* prev / next: the BOX is the button, the INK is the chevron's own (re-paired 2026-09-26). The console's button sets no
     * colour - its computed color is the body's foreground, inherited, and paints nothing, the button holds no text - while
     * its Icon wrapper puts hsl(var(--mdt-neutral-90)) on the svg as `color`, which currentColor strokes with. The library
     * puts neutral-90 on the button and the svg inherits it. So the ink is read off the svg on both sides, like with like. */
    { name: 'prev / next (30 square on neutral-10, corners 8)', props: ['width', 'height', 'borderRadius', 'backgroundColor', 'opacity'], story: { id: STORY, select: '[role=group] button[aria-label="Next month"]' }, console: { path: '/users', open: openCalendar, select: `${CAL} > div:nth-child(2) > button:last-child` }, mock: null },
    { name: 'the nav chevron (neutral-90, the ink the glyph strokes with)', props: ['color', 'stroke'], story: { id: STORY, select: '[role=group] button[aria-label="Next month"] svg' }, console: { path: '/users', open: openCalendar, select: `${CAL} > div:nth-child(2) > button:last-child svg` }, mock: null },
    { name: 'the weekday initial (11/600, faint)', props: ['fontSize', 'fontWeight', 'color'], story: { id: STORY, select: '[role=group] > div:nth-child(2) > div' }, console: { path: '/users', open: openCalendar, select: `${CAL} > div:nth-child(3) > div` }, mock: null },
    { name: 'a day (34 high, corners 8, 13/500 in the ink, no fill)', props: ['height', 'borderRadius', 'fontSize', 'fontWeight', 'color', 'backgroundColor'], story: { id: STORY, select: '[role=group] > div:nth-child(3) > button:not([aria-pressed=true]):not([disabled])' }, console: { path: '/users', open: openCalendar, select: `${CAL} > div:nth-child(4) > div:nth-child(8)` }, mock: null },
    { name: 'a day under the pointer (no wash)', props: ['backgroundColor', 'color'], state: 'hover', story: { id: STORY, select: '[role=group] > div:nth-child(3) > button:not([aria-pressed=true]):not([disabled])' }, console: { path: '/users', open: openCalendar, select: `${CAL} > div:nth-child(4) > div:nth-child(8)` }, mock: null },
    { name: 'the picked day (white on the ink)', props: ['backgroundColor', 'color', 'borderRadius'], story: { id: STORY, select: '[role=group] button[aria-pressed=true]' }, console: { path: '/users', open: async (page) => { await openCalendar(page); await page.locator(`${CAL} > div:nth-child(4) > div`).nth(20).click(); await wait(300); }, select: `${CAL} > div:nth-child(4) > div:nth-child(21)` }, mock: null },
    /* Clear / Done are REAL GAPS, kept measured (confirmed 2026-09-26). The console hand-draws both - compat/iam/DatePicker.jsx
     * lines 158-159, a bare <button style=...> with no class, not a Button of any size - at 38 high: Done 14/500 on the
     * primary fill, corners 8, padding 0 22; Clear 13/500 in t.muted = hsl(var(--mdt-neutral-70)), which the console's
     * palette renders #8FA0BD (the library's faint). The library composes them from Button sm (28 high, one text size 13/500,
     * ghost ink neutral-90 #516281 - Button.tsx). No Button size is 38, so there is nothing alike to pair; reported, not accepted. */
    { name: 'Done', props: ['height', 'backgroundColor', 'color', 'fontSize', 'fontWeight', 'borderRadius'], story: { id: STORY, select: '[role=group] > div:last-child > button:last-child' }, console: { path: '/users', open: openCalendar, select: `${CAL} > div:nth-child(6) > button:last-child` }, mock: null },
    { name: 'Clear', props: ['height', 'backgroundColor', 'color', 'fontSize', 'fontWeight'], story: { id: STORY, select: '[role=group] > div:last-child > button:first-child' }, console: { path: '/users', open: openCalendar, select: `${CAL} > div:nth-child(6) > button:first-child` }, mock: null },
  ],
};
