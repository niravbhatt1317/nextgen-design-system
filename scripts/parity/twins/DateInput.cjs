/* Parity twins: where the same frame lives in the story, the console and the mock. */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const M = (n) => `.matrix > div:nth-child(${n}) > .fld`; // the date row of the inputs mock: cells 51..56
const FIELD = ['height', 'paddingLeft', 'borderTopWidth', 'borderTopColor', 'borderRadius', 'backgroundColor', 'fontSize', 'fontWeight', 'boxShadow', 'cursor', 'opacity'];
/* the console draws its own date field (.kit-datefield) on the Users drawer's Add access flow: row -> Access profiles -> Add access -> pick one -> Next -> the expiry switch on -> Custom */
const openDateField = async (page) => {
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
  await page.waitForSelector('.kit-datefield', { timeout: 10000 });
};
const openCalendar = async (page) => { await openDateField(page); await page.locator('.kit-datefield').first().click(); await wait(500); };
const STATES = 'new-components-dateinput--states';

module.exports = {
  component: 'DateInput',
  frames: [
    { name: 'sm · rest', props: FIELD, story: { id: 'new-components-dateinput--default', select: 'button[id]' }, console: { path: '/users', open: openDateField, select: '.kit-datefield' }, mock: { file: 'mocks/foundation/inputs.html', select: M(51) } },
    { name: 'sm · the value (13 neutral-90)', props: ['fontSize', 'color'], story: { id: 'new-components-dateinput--filled', select: 'button[id] > span' }, console: { path: '/users', open: openDateField, select: '.kit-datefield > span' }, mock: { file: 'mocks/foundation/inputs.html', select: `${M(54)} .val` } },
    { name: 'sm · the calendar glyph (faint ink; console box 20 and mock neutral-90 - reported)', props: ['color'], story: { id: 'new-components-dateinput--default', select: 'div:has(> button[id]) > span > svg' }, console: { path: '/users', open: openDateField, select: '.kit-datefield svg' }, mock: null },
    { name: 'sm · hover', props: FIELD, state: 'hover', story: { id: 'new-components-dateinput--default', select: 'button[id]' }, console: { path: '/users', open: openDateField, select: '.kit-datefield' }, mock: { file: 'mocks/foundation/inputs.html', select: M(52) } },
    { name: 'sm · focus (the halo)', props: ['borderTopColor', 'boxShadow'], state: 'focus', story: { id: 'new-components-dateinput--default', select: 'button[id]' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: M(53) } },
    { name: 'sm · open (the halo stays; the panel 6 under, corners 16, neutral-30 edge, the xl shadow)', props: ['borderRadius', 'paddingTop', 'borderTopColor', 'backgroundColor', 'boxShadow', 'width'], story: { id: 'new-components-dateinput--default', select: '[data-radix-popper-content-wrapper] > div', open: async (page) => { await page.click('button[id]'); await wait(400); } }, console: { path: '/users', open: openCalendar, select: 'div[style*="width: 336px"]' }, mock: null },
    { name: 'sm · filled', props: FIELD, story: { id: 'new-components-dateinput--filled', select: 'button[id]' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: M(54) } },
    { name: 'sm · disabled', props: FIELD, story: { id: STATES, select: '.mdt-grid > div:nth-child(3) button' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: M(55) } },
    { name: 'sm · held (the lock)', props: ['width', 'height', 'color'], story: { id: STATES, select: '.mdt-grid > div:nth-child(4) div:has(> button) > span > svg' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: `${M(55)} .lock svg` } },
    { name: 'sm · error', props: FIELD, story: { id: STATES, select: '.mdt-grid > div:nth-child(5) button' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: M(56) } },
  ],
};
