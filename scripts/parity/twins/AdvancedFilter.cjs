/* Parity twins: the More filters panel (AdvancedFilter) beside the console's Users page and the ruled mock.
 *
 * The console renders THIS library part (src/ui/AdvancedFilter.jsx is a 39-line adapter, no CSS patch), so
 * the console frame and the story frame are the same code under two stylesheets: what differs is what the
 * console's global.css does to the part, and what the story's demo door invents. The mock
 * (mocks/users/advanced-filter.html) is his ruled visualisation and stands in for frames the console lacks.
 *
 * Every frame is reached by driving the real panel the same way on both sides: open the door, pick
 * Team · is · two values, add a row (the And/Or switch), pick Source of truth · is · LDAP, open the row's
 * three-dot menu, Create group, add a third row (the plain And), pick Name · contains (the text field),
 * Apply (the door's count). The story's Empty frame starts open on one blank row; the console starts closed.
 *
 * REPAIRED 2026-09-26 (evening): the console's door is no longer its own .tool-square - the Users page hands the library
 * Toolbar to the table and the table draws the door as a library ToolbarButton inside one relative span, exactly the
 * shape the story's demo door has (span.mdt-relative > button). The old selector found nothing, every console read
 * timed out after 30 s and the mock stood in for all 67 frames. The pointer is parked at 0,0 before every frame is
 * built, so a frame after a hover frame never reads under the pointer. The panel's new manners (the header ✕, the
 * outside press swallowed, Escape closes) change no selector below: the rows are still the panel's second child. */
const DLG = '[role="dialog"][aria-label="Filters"]';
const ROWS = DLG + ' > div:nth-child(2)';
const ROW = (i) => ROWS + ' > :nth-child(' + (i + 1) + ')';
const MULTI = '[data-radix-popper-content-wrapper] [role="dialog"]';
const STORY = 'new-components-advancedfilter--empty';
const STORY_DOOR = '#storybook-root span.mdt-relative > button';
const CONSOLE_DOOR = '[role="toolbar"] span.mdt-relative > button'; // the table's More filters ToolbarButton in its relative span
const MOCK = 'mocks/users/advanced-filter.html';

const W = (page, ms) => page.waitForTimeout(ms);
/* the pointer parked before a frame is built: a frame that follows a hover frame must not read under the pointer */
const park = (page) => page.mouse.move(0, 0);
const option = (page, text) => page.locator('[role="listbox"] [role="option"]', { hasText: new RegExp('^' + text + '$') }).first();
const multiRow = (page, text) => page.locator(MULTI + ' button', { hasText: new RegExp('^' + text + '$') }).first();

/* the stages, in order; reach(n) walks every stage up to n */
const STAGES = ['open', 'listbox', 'row0', 'multi', 'rows2', 'row1', 'menu', 'group', 'rows3', 'text', 'applied', 'reopened'];
const reach = (stage) => async (page) => {
  await park(page);
  const door = (await page.locator(STORY_DOOR).count()) ? STORY_DOOR : CONSOLE_DOOR;
  const upTo = STAGES.indexOf(stage);
  const step = async (name, fn) => { if (STAGES.indexOf(name) <= upTo) await fn(); };
  /* every frame rebuilds the whole path from a fresh page (twenty-odd clicks). A click that misses once is a stale
   * path - a menu that closed a beat late, a listbox not yet mounted - never a reading, so the path is walked again
   * once from a reloaded page before the frame is given up as missing. Each click waits 10 s, not Playwright's 30. */
  const walk = async () => {
  await step('open', async () => { if (!(await page.locator(DLG).count())) { await page.click(door, { timeout: 10000 }); await W(page, 350); } });
  await step('listbox', async () => { await page.click(ROW(0) + ' > :nth-child(2) > button', { timeout: 10000 }); await W(page, 350); });
  await step('row0', async () => {
    await option(page, 'Team').click(); await W(page, 250);
    await page.click(ROW(0) + ' > :nth-child(3) > button', { timeout: 10000 }); await W(page, 300);
    await option(page, 'is').click(); await W(page, 250);
    await page.click(ROW(0) + ' > :nth-child(4) > button', { timeout: 10000 }); await W(page, 350);
  });
  await step('multi', async () => {
    const rows = page.locator(MULTI + ' > div > div:last-child button');
    await rows.nth(0).click(); await W(page, 200); await rows.nth(1).click(); await W(page, 200);
    await page.keyboard.press('Escape'); await W(page, 250);
  });
  await step('rows2', async () => { await page.click(DLG + ' > div:nth-child(3) > button', { timeout: 10000 }); await W(page, 300); });
  await step('row1', async () => {
    await page.click(ROW(1) + ' > :nth-child(2) > button', { timeout: 10000 }); await W(page, 300);
    await option(page, 'Source of truth').click(); await W(page, 250);
    await page.click(ROW(1) + ' > :nth-child(3) > button', { timeout: 10000 }); await W(page, 300);
    await option(page, 'is').click(); await W(page, 250);
    await page.click(ROW(1) + ' > :nth-child(4) > button', { timeout: 10000 }); await W(page, 350);
    await multiRow(page, 'LDAP').click(); await W(page, 200);
    await page.keyboard.press('Escape'); await W(page, 250);
  });
  await step('menu', async () => { await page.click(ROW(1) + ' [data-action]', { timeout: 10000 }); await W(page, 350); });
  await step('group', async () => { await page.locator('[role="menu"] [role="menuitem"]', { hasText: /^Create group$/ }).click(); await W(page, 350); });
  await step('rows3', async () => { await page.click(DLG + ' > div:nth-child(3) > button', { timeout: 10000 }); await W(page, 300); });
  await step('text', async () => {
    await page.click(ROW(2) + ' > :nth-child(2) > button', { timeout: 10000 }); await W(page, 300);
    await option(page, 'Name').click(); await W(page, 250);
    await page.click(ROW(2) + ' > :nth-child(3) > button', { timeout: 10000 }); await W(page, 300);
    await option(page, 'contains').click(); await W(page, 250);
    await page.click(ROW(2) + ' > :nth-child(4) input', { timeout: 10000 }); await page.keyboard.type('a'); await W(page, 150);
  });
  await step('applied', async () => { await page.click(DLG + ' > div:last-child > button:last-child', { timeout: 10000 }); await W(page, 400); });
  await step('reopened', async () => { await page.click(door, { timeout: 10000 }); await W(page, 350); });
  };
  try {
    await walk();
  } catch (first) {
    await page.goto(page.url(), { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#storybook-root *, [role="toolbar"]', { state: 'visible', timeout: 20000 }).catch(() => {});
    await W(page, 1200);
    await park(page);
    await walk();
  }
};
/* the story's Empty frame opens by itself; for the door at rest it must be shut first */
const shutStory = async (page) => { await park(page); if (await page.locator(DLG).count()) { await page.keyboard.press('Escape'); await W(page, 300); } };
/* the console's door at rest: nothing to open, only the pointer to park */
const restConsole = async (page) => { await park(page); };
/* the mock opens on the worked example; its menus open on a click */
const mockOpen = (sel) => async (page) => { await park(page); await page.click(sel, { timeout: 10000 }); await W(page, 200); };

const BOX = ['rectWidth', 'rectHeight', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius', 'backgroundColor', 'boxShadow'];
const TEXT = ['fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'textTransform'];
const FIELD = ['rectHeight', 'paddingLeft', 'paddingRight', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius', 'backgroundColor', 'color', 'fontSize', 'fontWeight', 'boxShadow', 'cursor', 'textAlign'];
const GLYPH = ['rectWidth', 'rectHeight', 'color', 'strokeWidth'];
const BTN = ['rectHeight', 'paddingLeft', 'paddingRight', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius', 'backgroundColor', 'color', 'fontSize', 'fontWeight', 'lineHeight', 'columnGap'];

const S = (select, stage, extra) => ({ id: STORY, select, open: stage ? reach(stage) : undefined, ...(extra || {}) });
const C = (select, stage) => ({ path: '/users', select, open: reach(stage || 'open') });
const M = (select, open) => ({ file: MOCK, select, open });

module.exports = {
  component: 'AdvancedFilter',
  frames: [
    /* ── the door (the console's own MoreFiltersButton; the story's demo door must wear the same) ── */
    { name: 'door · rest', props: [...BTN, 'columnGap'], story: { id: STORY, select: STORY_DOOR, open: shutStory }, console: { path: '/users', select: CONSOLE_DOOR, open: restConsole }, mock: M('#door', mockOpen('#door')) },
    { name: 'door · glyph', props: GLYPH, story: { id: STORY, select: STORY_DOOR + ' > svg', open: shutStory }, console: { path: '/users', select: CONSOLE_DOOR + ' > svg', open: restConsole }, mock: M('#door > svg', mockOpen('#door')) },
    { name: 'door · hover', props: ['backgroundColor', 'borderTopColor', 'color'], state: 'hover', story: { id: STORY, select: STORY_DOOR, open: shutStory }, console: { path: '/users', select: CONSOLE_DOOR, open: restConsole }, mock: M('#door', mockOpen('#door')) },
    { name: 'door · applied · count', props: ['rectWidth', 'rectHeight', 'minWidth', 'paddingLeft', 'borderTopLeftRadius', 'backgroundColor', 'color', 'fontSize', 'fontWeight', 'lineHeight'], story: S(STORY_DOOR + ' > span:last-child', 'applied'), console: C(CONSOLE_DOOR + ' [data-testid="toolbar-button-count"]', 'applied') /* the ToolbarButton's count is a Badge; its last span is the sr-only words */, mock: M('#door .cnt') },
    /* ── the panel ── */
    { name: 'panel', props: [...BOX, 'position', 'zIndex'], story: S(DLG), console: C(DLG), mock: M('#pop') },
    { name: 'panel · title row', props: ['rectHeight', 'marginBottom'], story: S(DLG + ' > div:first-child'), console: C(DLG + ' > div:first-child'), mock: M('#pop .head') },
    { name: 'panel · title', props: TEXT, story: S(DLG + ' h3'), console: C(DLG + ' h3'), mock: M('#pop .head h3') },
    { name: 'rows · rhythm', props: ['rowGap'], story: S(ROWS), console: C(ROWS), mock: M('#rows') },
    /* ── a row ── */
    { name: 'row · outer grid', props: ['gridTemplateColumns', 'columnGap', 'rectHeight'], story: S(ROW(0)), console: C(ROW(0)), mock: M('#rows > .row:first-child') },
    { name: 'row · Where', props: ['rectHeight', 'paddingLeft', ...TEXT], story: S(ROW(0) + ' [data-prefix]'), console: C(ROW(0) + ' [data-prefix]'), mock: M('#rows > .row:first-child > .pre') },
    { name: 'row · key select · placeholder', props: FIELD, story: S(ROW(0) + ' > :nth-child(2) > button'), console: C(ROW(0) + ' > :nth-child(2) > button'), mock: M('#rows > .row:last-child > :nth-child(2)') },
    { name: 'row · key select · placeholder text', props: ['color', 'fontSize'], story: S(ROW(0) + ' > :nth-child(2) > button > span:first-child'), console: C(ROW(0) + ' > :nth-child(2) > button > span:first-child'), mock: M('#rows > .row:last-child > :nth-child(2) .ph') },
    { name: 'row · key select · hover', props: ['borderTopColor', 'boxShadow'], state: 'hover', story: S(ROW(0) + ' > :nth-child(2) > button'), console: C(ROW(0) + ' > :nth-child(2) > button'), mock: M('#rows > .row:last-child > :nth-child(2)') },
    { name: 'row · key select · open', props: ['borderTopColor', 'boxShadow'], story: S(ROW(0) + ' > :nth-child(2) > button', 'listbox'), console: C(ROW(0) + ' > :nth-child(2) > button', 'listbox'), mock: M('#rows > .row:last-child > :nth-child(2)', mockOpen('#rows > .row:last-child > :nth-child(2)')) },
    { name: 'row · chevron', props: GLYPH, story: S(ROW(0) + ' > :nth-child(2) > button svg'), console: C(ROW(0) + ' > :nth-child(2) > button svg'), mock: M('#rows > .row:last-child > :nth-child(2) .chev svg') },
    { name: 'row · operator · disabled', props: FIELD, story: S(ROW(0) + ' > :nth-child(3) > button'), console: C(ROW(0) + ' > :nth-child(3) > button'), mock: M('#rows > .row:last-child > :nth-child(3)') },
    { name: 'row · value · disabled', props: FIELD, story: S(ROW(0) + ' > :nth-child(4) > button'), console: C(ROW(0) + ' > :nth-child(4) > button'), mock: M('#rows > .row:last-child > :nth-child(4)') },
    { name: 'row · key select · value', props: FIELD, story: S(ROW(0) + ' > :nth-child(2) > button', 'multi'), console: C(ROW(0) + ' > :nth-child(2) > button', 'multi'), mock: M('#rows > .row:first-child > :nth-child(2)') },
    { name: 'row · value · many · pill', props: ['rectHeight', 'paddingLeft', 'paddingRight', 'borderTopLeftRadius', 'backgroundColor', 'color', 'fontSize', 'fontWeight'], story: S(ROW(0) + ' > :nth-child(4) .mdt-select-pill', 'multi'), console: C(ROW(0) + ' > :nth-child(4) .mdt-select-pill', 'multi'), mock: M('#rows > .row:first-child .pill') },
    { name: 'row · value · many · +N', props: ['rectHeight', 'paddingLeft', 'paddingRight', 'borderTopLeftRadius', 'backgroundColor', 'color', 'fontSize', 'fontWeight'], story: S(ROW(0) + ' > :nth-child(4) .mdt-select-overflow', 'multi'), console: C(ROW(0) + ' > :nth-child(4) .mdt-select-overflow', 'multi'), mock: M('#rows > .row:first-child .plus') },
    { name: 'row · value · text input', props: FIELD, story: S(ROW(2) + ' > :nth-child(4) input', 'text'), console: C(ROW(2) + ' > :nth-child(4) input', 'text'), mock: null },
    /* ── the menus opened from inside ── */
    { name: 'key listbox · box', props: ['borderTopLeftRadius', 'borderTopWidth', 'borderTopColor', 'boxShadow', 'backgroundColor', 'zIndex'], story: S('[role="listbox"]', 'listbox'), console: C('[role="listbox"]', 'listbox'), mock: M('#rows > .row:last-child > :nth-child(2) .menu', mockOpen('#rows > .row:last-child > :nth-child(2)')) },
    { name: 'key listbox · padding', props: ['paddingTop', 'paddingLeft'], story: S('[role="listbox"] [data-radix-select-viewport]', 'listbox'), console: C('[role="listbox"] [data-radix-select-viewport]', 'listbox'), mock: M('#rows > .row:last-child > :nth-child(2) .menu', mockOpen('#rows > .row:last-child > :nth-child(2)')) },
    { name: 'key option · rest', props: ['rectHeight', 'paddingLeft', 'paddingRight', 'borderTopLeftRadius', 'fontSize', 'fontWeight', 'color', 'backgroundColor'], story: S('[role="listbox"] [role="option"]', 'listbox'), console: C('[role="listbox"] [role="option"]', 'listbox'), mock: M('#rows > .row:last-child > :nth-child(2) .menu > div', mockOpen('#rows > .row:last-child > :nth-child(2)')) },
    { name: 'key option · hover', props: ['backgroundColor', 'color'], state: 'hover', story: S('[role="listbox"] [role="option"]', 'listbox'), console: C('[role="listbox"] [role="option"]', 'listbox'), mock: M('#rows > .row:last-child > :nth-child(2) .menu > div', mockOpen('#rows > .row:last-child > :nth-child(2)')) },
    { name: 'many-value menu · box', props: ['rectWidth', 'borderTopLeftRadius', 'borderTopWidth', 'borderTopColor', 'boxShadow', 'backgroundColor'], story: S(MULTI, 'row0'), console: C(MULTI, 'row0'), mock: M('#rows > .row:first-child .menu', mockOpen('#rows > .row:first-child > :nth-child(4)')) },
    { name: 'many-value menu · Select all', props: ['rectHeight', 'paddingLeft', 'fontSize', 'fontWeight', 'color', 'backgroundColor'], story: S(MULTI + ' > div > div:first-child > button', 'row0'), console: C(MULTI + ' > div > div:first-child > button', 'row0'), mock: M('#rows > .row:first-child .menu .all', mockOpen('#rows > .row:first-child > :nth-child(4)')) },
    { name: 'many-value menu · option row', props: ['rectHeight', 'paddingLeft', 'paddingRight', 'borderTopLeftRadius', 'fontSize', 'fontWeight', 'color', 'backgroundColor'], story: S(MULTI + ' > div > div:last-child button', 'row0'), console: C(MULTI + ' > div > div:last-child button', 'row0'), mock: M('#rows > .row:first-child .menu label', mockOpen('#rows > .row:first-child > :nth-child(4)')) },
    { name: 'many-value menu · option hover', props: ['backgroundColor', 'color'], state: 'hover', story: S(MULTI + ' > div > div:last-child button', 'row0'), console: C(MULTI + ' > div > div:last-child button', 'row0'), mock: M('#rows > .row:first-child .menu label', mockOpen('#rows > .row:first-child > :nth-child(4)')) },
    { name: 'many-value menu · the mark (the mock draws the table checkbox)', props: ['rectWidth', 'rectHeight', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius', 'backgroundColor', 'color'], story: S(MULTI + ' > div > div:last-child button > span:last-child', 'row0'), console: C(MULTI + ' > div > div:last-child button > span:last-child', 'row0'), mock: M('#rows > .row:first-child .menu label i', mockOpen('#rows > .row:first-child > :nth-child(4)')) },
    /* ── the And / Or switch and the plain word ── */
    { name: 'And/Or switch · rest', props: [...BTN, 'borderTopLeftRadius'], story: S(ROW(1) + ' [data-join]', 'rows2'), console: C(ROW(1) + ' [data-join]', 'rows2'), mock: M('.gwrap > .join') },
    { name: 'And/Or switch · glyph', props: GLYPH, story: S(ROW(1) + ' [data-join] > svg', 'rows2'), console: C(ROW(1) + ' [data-join] > svg', 'rows2'), mock: M('.gwrap > .join > svg') },
    { name: 'And/Or switch · hover', props: ['borderTopColor', 'color'], state: 'hover', story: S(ROW(1) + ' [data-join]', 'rows2'), console: C(ROW(1) + ' [data-join]', 'rows2'), mock: M('.gwrap > .join') },
    { name: 'And/Or switch · glyph · hover', props: ['color'], state: 'hover', story: S(ROW(1) + ' [data-join] > svg', 'rows2'), console: C(ROW(1) + ' [data-join] > svg', 'rows2'), mock: M('.gwrap > .join > svg') },
    { name: 'And word (third row)', props: ['rectHeight', 'paddingLeft', ...TEXT], story: S(ROW(2) + ' [data-prefix]', 'rows3'), console: C(ROW(2) + ' [data-prefix]', 'rows3'), mock: M('#rows > .row:last-child > .pre') },
    /* ── the row's action box and its menu ── */
    { name: 'action box · rest', props: ['rectWidth', 'rectHeight', 'borderTopWidth', 'borderTopLeftRadius', 'backgroundColor', 'color', 'cursor'], story: S(ROW(0) + ' [data-action]'), console: C(ROW(0) + ' [data-action]'), mock: M('#rows > .row:first-child .act > button') },
    { name: 'action box · glyph', props: GLYPH, story: S(ROW(0) + ' [data-action] > svg'), console: C(ROW(0) + ' [data-action] > svg'), mock: M('#rows > .row:first-child .act > button > svg') },
    { name: 'action box · hover', props: ['backgroundColor', 'color'], state: 'hover', story: S(ROW(0) + ' [data-action]'), console: C(ROW(0) + ' [data-action]'), mock: M('#rows > .row:first-child .act > button') },
    { name: 'action box · open', props: ['backgroundColor', 'color'], story: S(ROW(1) + ' [data-action]', 'menu'), console: C(ROW(1) + ' [data-action]', 'menu'), mock: M('#rows > .row:first-child .act > button', mockOpen('#rows > .row:first-child .act > button')) },
    { name: 'action menu · box', props: ['rectWidth', 'borderTopLeftRadius', 'paddingTop', 'paddingLeft', 'borderTopWidth', 'borderTopColor', 'boxShadow', 'backgroundColor'], story: S('[role="menu"]', 'menu'), console: C('[role="menu"]', 'menu'), mock: M('#rows > .row:first-child .act .menu', mockOpen('#rows > .row:first-child .act > button')) },
    { name: 'action menu · item', props: ['rectHeight', 'paddingLeft', 'paddingRight', 'borderTopLeftRadius', 'columnGap', 'fontSize', 'fontWeight', 'color', 'backgroundColor'], story: S('[role="menu"] [role="menuitem"]:first-child', 'menu'), console: C('[role="menu"] [role="menuitem"]:first-child', 'menu'), mock: M('#rows > .row:first-child .act .menu > div:first-child', mockOpen('#rows > .row:first-child .act > button')) },
    { name: 'action menu · item glyph', props: GLYPH, story: S('[role="menu"] [role="menuitem"]:first-child > svg', 'menu'), console: C('[role="menu"] [role="menuitem"]:first-child > svg', 'menu'), mock: M('#rows > .row:first-child .act .menu > div:first-child > svg', mockOpen('#rows > .row:first-child .act > button')) },
    { name: 'action menu · item hover', props: ['backgroundColor', 'color'], state: 'hover', story: S('[role="menu"] [role="menuitem"]:first-child', 'menu'), console: C('[role="menu"] [role="menuitem"]:first-child', 'menu'), mock: M('#rows > .row:first-child .act .menu > div:first-child', mockOpen('#rows > .row:first-child .act > button')) },
    { name: 'action menu · danger item', props: ['color', 'backgroundColor'], story: S('[role="menu"] [role="menuitem"]:last-child', 'menu'), console: C('[role="menu"] [role="menuitem"]:last-child', 'menu'), mock: M('#rows > .row:first-child .act .menu > div.danger', mockOpen('#rows > .row:first-child .act > button')) },
    { name: 'action menu · danger item hover', props: ['color', 'backgroundColor'], state: 'hover', story: S('[role="menu"] [role="menuitem"]:last-child', 'menu'), console: C('[role="menu"] [role="menuitem"]:last-child', 'menu'), mock: M('#rows > .row:first-child .act .menu > div.danger', mockOpen('#rows > .row:first-child .act > button')) },
    /* ── a group ── */
    { name: 'group · wrap', props: ['gridTemplateColumns', 'columnGap'], story: S(DLG + ' [data-group]', 'group'), console: C(DLG + ' [data-group]', 'group'), mock: M('.gwrap') },
    { name: 'group · outer join · offset', props: ['marginTop'], story: S(DLG + ' [data-group] > div:first-child', 'group'), console: C(DLG + ' [data-group] > div:first-child', 'group'), mock: M('.gwrap > .join') },
    { name: 'group · panel', props: [...BOX, 'rowGap'], story: S(DLG + ' [data-panel]', 'group'), console: C(DLG + ' [data-panel]', 'group'), mock: M('.grp') },
    { name: 'group · head', props: ['rectHeight', 'gridTemplateColumns', 'columnGap'], story: S(DLG + ' [data-group-head]', 'group'), console: C(DLG + ' [data-group-head]', 'group'), mock: M('.grp .ghead') },
    { name: 'group · label', props: TEXT, story: S(DLG + ' [data-group-label]', 'group'), console: C(DLG + ' [data-group-label]', 'group'), mock: M('.grp .glabel') },
    { name: 'group · inner row grid', props: ['gridTemplateColumns', 'columnGap'], story: S(DLG + ' [data-row][data-level="inner"]', 'group'), console: C(DLG + ' [data-row][data-level="inner"]', 'group'), mock: M('.grp .row') },
    { name: 'group · inner field', props: FIELD, story: S(DLG + ' [data-row][data-level="inner"] > :nth-child(2) > button', 'group'), console: C(DLG + ' [data-row][data-level="inner"] > :nth-child(2) > button', 'group'), mock: M('.grp .row > :nth-child(2)') },
    { name: 'group · ✕ · rest', props: ['rectWidth', 'rectHeight', 'borderTopWidth', 'borderTopLeftRadius', 'backgroundColor', 'color', 'cursor'], story: S(DLG + ' [data-remove]', 'group'), console: C(DLG + ' [data-remove]', 'group'), mock: M('.grp .x') },
    { name: 'group · ✕ · glyph', props: GLYPH, story: S(DLG + ' [data-remove] > svg', 'group'), console: C(DLG + ' [data-remove] > svg', 'group'), mock: M('.grp .x > svg') },
    { name: 'group · ✕ · hover', props: ['backgroundColor', 'color'], state: 'hover', story: S(DLG + ' [data-remove]', 'group'), console: C(DLG + ' [data-remove]', 'group'), mock: M('.grp .x') },
    { name: 'group · Add filter', props: BTN, story: S(DLG + ' [data-panel] > div:last-child > button', 'group'), console: C(DLG + ' [data-panel] > div:last-child > button', 'group'), mock: M('.grp .add') },
    /* ── Add filter and the footer ── */
    { name: 'Add filter · disabled', props: [...BTN, 'opacity', 'marginTop'], story: S(DLG + ' > div:nth-child(3) > button'), console: C(DLG + ' > div:nth-child(3) > button'), mock: null },
    { name: 'Add filter · enabled', props: [...BTN, 'opacity'], story: S(DLG + ' > div:nth-child(3) > button', 'multi'), console: C(DLG + ' > div:nth-child(3) > button', 'multi'), mock: M('#add') },
    { name: 'Add filter · glyph', props: GLYPH, story: S(DLG + ' > div:nth-child(3) > button svg', 'multi'), console: C(DLG + ' > div:nth-child(3) > button svg', 'multi'), mock: M('#add svg') },
    { name: 'Add filter · hover', props: ['backgroundColor', 'borderTopColor', 'color'], state: 'hover', story: S(DLG + ' > div:nth-child(3) > button', 'multi'), console: C(DLG + ' > div:nth-child(3) > button', 'multi'), mock: M('#add') },
    { name: 'footer', props: ['marginTop', 'paddingTop', 'borderTopWidth', 'borderTopColor'], story: S(DLG + ' > div:last-child'), console: C(DLG + ' > div:last-child'), mock: M('.foot') },
    { name: 'Clear all · rest', props: BTN, story: S(DLG + ' > div:last-child > button:first-child'), console: C(DLG + ' > div:last-child > button:first-child'), mock: M('#clear') },
    { name: 'Clear all · hover', props: ['backgroundColor', 'borderTopColor', 'color'], state: 'hover', story: S(DLG + ' > div:last-child > button:first-child'), console: C(DLG + ' > div:last-child > button:first-child'), mock: M('#clear') },
    { name: 'Apply · rest', props: BTN, story: S(DLG + ' > div:last-child > button:last-child'), console: C(DLG + ' > div:last-child > button:last-child'), mock: M('#apply') },
    { name: 'Apply · hover', props: ['backgroundColor', 'borderTopColor', 'color'], state: 'hover', story: S(DLG + ' > div:last-child > button:last-child'), console: C(DLG + ' > div:last-child > button:last-child'), mock: M('#apply') },
    { name: 'Apply · ↵ hint', props: ['rectWidth', 'rectHeight', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius', 'marginLeft'], story: S(DLG + ' > div:last-child > button:last-child > span'), console: C(DLG + ' > div:last-child > button:last-child > span'), mock: M('#apply .kbd') },
    { name: 'Apply · ↵ glyph', props: GLYPH, story: S(DLG + ' > div:last-child > button:last-child > span > svg'), console: C(DLG + ' > div:last-child > button:last-child > span > svg'), mock: M('#apply .kbd svg') },
  ],
};
