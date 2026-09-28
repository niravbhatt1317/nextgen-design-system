/* Parity twins: where the same frame lives in the story, the console and the mock. */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const M = (n) => `.matrix > div:nth-child(${n}) > .fld`; // the dropdown row of the inputs mock: cells 30..35; the multi-select row: 44..49
const TRIGGER = ['height', 'paddingLeft', 'paddingRight', 'borderTopWidth', 'borderTopColor', 'borderRadius', 'backgroundColor', 'fontSize', 'fontWeight', 'boxShadow', 'cursor', 'opacity'];
const openMoreFilters = async (page) => {
  await page.getByRole('button', { name: /more filters/i }).first().click();
  await page.waitForSelector('[role=dialog] button[role=combobox]', { timeout: 10000 });
  await wait(300);
};
const openMoreFiltersMenu = async (page) => {
  await openMoreFilters(page);
  await page.locator('[role=dialog] button[role=combobox]').first().click();
  await wait(400);
};
const openCreateTeam = async (page) => {
  await page.getByRole('button', { name: /create team/i }).first().click();
  await page.waitForSelector('[role=dialog] button.mdt-group', { timeout: 10000 });
  await wait(300);
};
const consoleSingle = '[role=dialog] button[role=combobox]';
const consoleMulti = '[role=dialog] button.mdt-group';
const S = (label) => ({ id: 'new-components-select--the-field', select: `button[role=combobox][aria-label="${label}"]` });
/* THE MULTI STORY'S FIELDS ARE NAMED (2026-09-26): the first button.mdt-group in the Multi story is no longer the empty
 * Default field (it read a 41-high wrapped field with no placeholder), so each multi frame names its cell by aria-label -
 * Owner (Default) · Held · Roles (Error) - as the single frames already do. */
const openStory = async (page) => {
  await page.click('button[role=combobox]');
  await wait(400);
};

module.exports = {
  component: 'Select',
  frames: [
    { name: 'single sm · rest', props: TRIGGER, story: S('Default'), console: { path: '/users', open: openMoreFilters, select: consoleSingle }, mock: { file: 'mocks/foundation/inputs.html', select: M(30) } },
    { name: 'single sm · placeholder (13, faint)', props: ['fontSize', 'color'], story: { id: 'new-components-select--the-field', select: 'button[role=combobox][aria-label="Default"] > span' }, console: { path: '/users', open: openMoreFilters, select: `${consoleSingle} > span` }, mock: { file: 'mocks/foundation/inputs.html', select: `${M(30)} .ph` } },
    { name: 'single sm · chevron (16; console 50% faint at 12, mock neutral-90 at 10 - reported)', props: ['width', 'height', 'color', 'opacity'], story: { id: 'new-components-select--the-field', select: 'button[role=combobox][aria-label="Default"] svg' }, console: { path: '/users', open: openMoreFilters, select: `${consoleSingle} svg` }, mock: null },
    { name: 'single sm · hover', props: TRIGGER, state: 'hover', story: S('Hover'), console: { path: '/users', open: openMoreFilters, select: consoleSingle }, mock: { file: 'mocks/foundation/inputs.html', select: M(31) } },
    { name: 'single sm · open (the halo)', props: ['borderTopColor', 'boxShadow'], story: { id: 'new-components-select--the-field', select: 'button[role=combobox][aria-label="Default"]', open: openStory }, console: { path: '/users', open: openMoreFiltersMenu, select: consoleSingle }, mock: { file: 'mocks/foundation/inputs.html', select: M(32) } },
    { name: 'single sm · open menu (console = library: corners 6, rows 32 at 14 - the mock says 10 / 34 / 13, reported)', props: ['borderRadius', 'paddingTop', 'borderTopColor', 'backgroundColor', 'boxShadow'], story: { id: 'new-components-select--the-field', select: '[role=listbox]', open: openStory }, console: { path: '/users', open: openMoreFiltersMenu, select: '[role=listbox]' }, mock: null },
    { name: 'single sm · menu row', props: ['height', 'paddingLeft', 'borderRadius', 'fontSize', 'fontWeight', 'color'], story: { id: 'new-components-select--the-field', select: '[role=option]', open: openStory }, console: { path: '/users', open: openMoreFiltersMenu, select: '[role=option]' }, mock: null },
    { name: 'single sm · filled', props: TRIGGER, story: S('Filled'), console: null, mock: { file: 'mocks/foundation/inputs.html', select: M(33) } },
    { name: 'single sm · disabled', props: TRIGGER, story: S('Disabled'), console: null, mock: { file: 'mocks/foundation/inputs.html', select: M(34) } },
    { name: 'single sm · held (the lock)', props: ['width', 'height', 'color'], story: { id: 'new-components-select--the-field', select: 'button[role=combobox][aria-label="Held"] svg' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: `${M(34)} .lock svg` } },
    { name: 'single sm · error', props: TRIGGER, story: S('Error'), console: null, mock: { file: 'mocks/foundation/inputs.html', select: M(35) } },
    { name: 'multi sm · rest', props: TRIGGER, story: { id: 'new-components-select--multi', select: '#storybook-root button.mdt-group[aria-label="Owner"]' }, console: { path: '/teams', open: openCreateTeam, select: consoleMulti }, mock: { file: 'mocks/foundation/inputs.html', select: M(44) } },
    { name: 'multi sm · placeholder (13, faint)', props: ['fontSize', 'color'], story: { id: 'new-components-select--multi', select: '#storybook-root button.mdt-group[aria-label="Owner"] span.mdt-text-faint' }, console: { path: '/teams', open: openCreateTeam, select: `${consoleMulti} > span` }, mock: { file: 'mocks/foundation/inputs.html', select: `${M(44)} .ph` } },
    { name: 'multi sm · the first pick as a pill (22 high, neutral-20, 12/500, corners 6)', props: ['height', 'backgroundColor', 'color', 'fontSize', 'fontWeight', 'borderRadius', 'paddingLeft', 'paddingRight'], story: { id: 'new-components-select--multi', select: '.mdt-select-pill' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: `${M(47)} .pill` } },
    { name: 'multi sm · the +N badge', props: ['height', 'backgroundColor', 'color', 'fontSize', 'fontWeight', 'borderRadius', 'paddingLeft'], story: { id: 'new-components-select--multi', select: '.mdt-select-overflow' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: `${M(47)} .plus` } },
    { name: 'multi sm · held', props: TRIGGER, story: { id: 'new-components-select--multi', select: '#storybook-root button.mdt-group[aria-label="Held"]' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: M(48) } },
    { name: 'multi sm · error', props: TRIGGER, story: { id: 'new-components-select--multi', select: '#storybook-root button.mdt-group[aria-label="Roles"]' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: M(49) } },
  ],
};
