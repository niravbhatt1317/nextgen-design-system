/* Parity twins: the library's Command beside the one list of its kind the console draws - the list a Combobox opens, a
 * search box over rows you pick from, built on the same engine (cmdk), read here by that engine's own attributes.
 *
 * WHAT THIS DOES AND DOES NOT PROVE. The console renders no Command, CommandInput or CommandItem by name, and neither
 * does the installed library's Combobox: it writes the cmdk parts out itself, with near-identical classes. So these
 * frames say "Command's list looks like the console's list". They do not say the console uses Command.
 *
 * THE FRAMES. Sites & Departments -> Add site -> the country list on the phone field (organizations/PhoneField.jsx), on
 * My Organization. One frame also reads the service hours on /services/policies, because the phone list's rows carry a
 * flag and a dial code and only the hours' rows are plain text like the story's. Nothing is saved on either. The third
 * Combobox place, Agent Fleet's enrollment profile, has custom rows too and is not read.
 *
 * LEFT OUT. The rail's "Search settings" (ShellNav.jsx: an input that filters the rail's rows, no list of its own) and the
 * hand-built pickers ZoneSearch.tsx and ui/TypeInPicker.jsx (no cmdk) are different parts. The console draws no group
 * heading, separator, shortcut hint or CommandDialog, so those have no frame. The border and shadow are not measured:
 * Command owns neither, the story adds them itself and the console's come from the popover around the list. */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const STORY = 'new-components-command--default';
const SITES = '/organizations/org_msp?tab=sites';
const SEARCH_ROW = 'div:has(> [cmdk-input])';

const openList = async (page) => {
  await page.getByRole('button', { name: /^Add site$/ }).first().click();
  await page.waitForSelector('.ph-cc__trigger', { timeout: 10000 });
  await page.locator('.ph-cc__trigger').first().click();
  await page.waitForSelector('[cmdk-item]', { timeout: 8000 });
  await wait(400);
};
const typeNoMatch = async (page) => {
  await page.locator('[cmdk-input]').first().fill('zzzz');
  await page.waitForSelector('[cmdk-empty]', { timeout: 5000 });
  await wait(200);
};
const openListNoMatch = async (page) => {
  await openList(page);
  await typeNoMatch(page);
};
const openPlainList = async (page) => {
  await page.locator('[role=tab]', { hasText: /^Business hours/ }).first().click();
  await page.getByText('Default calendar', { exact: true }).first().click();
  await page.getByRole('button', { name: /^Edit$/ }).first().click();
  await page.locator('[aria-label="Opens at"]').first().click();
  await page.waitForSelector('[cmdk-item]', { timeout: 8000 });
  await wait(400);
};
const LIST = (select, open = openList) => ({ path: SITES, open, select });

module.exports = {
  component: 'Command',
  frames: [
    {
      name: 'the panel',
      props: ['backgroundColor', 'color', 'borderTopLeftRadius'],
      story: { id: STORY, select: '[cmdk-root]' },
      console: LIST('[cmdk-root]'),
      mock: null,
    },
    {
      name: 'the search row',
      props: ['paddingLeft', 'paddingRight', 'borderBottomWidth', 'borderBottomColor'],
      story: { id: STORY, select: SEARCH_ROW },
      console: LIST(SEARCH_ROW),
      mock: null,
    },
    {
      /* Command draws a magnifying glass in the search row and the console's list draws none: this frame stays missing
       * on the console side until one of them changes. */
      name: 'the search row\'s glyph',
      props: ['width', 'height'],
      story: { id: STORY, select: `${SEARCH_ROW} > svg` },
      console: LIST(`${SEARCH_ROW} > svg`),
      mock: null,
    },
    {
      name: 'the search box',
      props: ['height', 'fontSize', 'fontWeight', 'lineHeight', 'color', 'backgroundColor', 'paddingTop', 'paddingBottom', 'paddingLeft'],
      story: { id: STORY, select: '[cmdk-input]' },
      console: LIST('[cmdk-input]'),
      mock: null,
    },
    {
      /* the 4 inset around the rows: Command keeps it on the group, the console's list on the list */
      name: 'the list',
      props: ['maxHeight', 'overflowY', 'paddingTop', 'paddingLeft'],
      story: { id: STORY, select: '[cmdk-list]' },
      console: LIST('[cmdk-list]'),
      mock: null,
    },
    {
      /* height follows what the row holds: the story's plain text is 20 tall, the phone list's flag row 18.2 */
      name: 'a row at rest',
      props: ['height', 'fontSize', 'fontWeight', 'lineHeight', 'color', 'backgroundColor', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'borderTopLeftRadius', 'cursor'],
      story: { id: STORY, select: '[cmdk-item]:nth-child(2)' },
      console: LIST('[cmdk-item]:nth-child(2)'),
      mock: null,
    },
    {
      /* the console's global.css pads a Combobox row by 8 when its default content is there
       * ([role="listbox"] [role="option"]:has(.mdt-flex-col)); Command's rows do not carry that content */
      name: 'a row of plain text (the service hours)',
      props: ['height', 'lineHeight', 'paddingTop', 'paddingBottom'],
      story: { id: STORY, select: '[cmdk-item]:nth-child(2)' },
      console: { path: '/services/policies', open: openPlainList, select: '[cmdk-item]:nth-child(2)' },
      mock: null,
    },
    {
      /* the same bridge sets the words: 14/500 in neutral-130, "reads like the chosen value in the closed field" */
      name: 'the words on that row',
      props: ['fontSize', 'fontWeight', 'lineHeight', 'color'],
      story: { id: STORY, select: '[cmdk-item]:nth-child(2) > span' },
      console: { path: '/services/policies', open: openPlainList, select: '[cmdk-item]:nth-child(2) .mdt-flex-col > span:first-child' },
      mock: null,
    },
    {
      name: 'the row the keys are on (the first, on opening)',
      props: ['backgroundColor', 'color', 'borderTopLeftRadius'],
      story: { id: STORY, select: '[cmdk-item][aria-selected="true"]' },
      console: LIST('[cmdk-item][aria-selected="true"]'),
      mock: null,
    },
    {
      name: 'a row under the pointer',
      state: 'hover',
      props: ['backgroundColor', 'color'],
      story: { id: STORY, select: '[cmdk-item]:nth-child(3)' },
      console: LIST('[cmdk-item]:nth-child(3)'),
      mock: null,
    },
    {
      name: 'nothing found',
      props: ['fontSize', 'lineHeight', 'color', 'textAlign', 'paddingTop', 'paddingBottom'],
      story: { id: STORY, open: typeNoMatch, select: '[cmdk-empty]' },
      console: LIST('[cmdk-empty]', openListNoMatch),
      mock: null,
    },
  ],
};
