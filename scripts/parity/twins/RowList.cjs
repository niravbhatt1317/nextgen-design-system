/* Parity twins: the row family (RowList, Row, RowTitle, SelectableRow, LogRow, KeyValueList, Timeline) beside the
 * console's src/ui/RowList.jsx as it renders in product pages - a user's Teams tab, the agent drawer's Health › Modules
 * - and, for the parts no live page reaches without a setup flow, the console's own gallery of them at /_compat (the
 * same component and the same global.css layer). */
const D = '[role="dialog"]';

const FRAME = [
  'display', 'flexDirection', 'minWidth',
  'borderTopWidth', 'borderTopStyle', 'borderTopColor',
  'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius',
  'overflow', 'backgroundColor',
];
const ROW = [
  'display', 'alignItems', 'columnGap', 'minHeight', 'rectHeight',
  'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'borderBottomWidth', 'borderBottomStyle', 'borderBottomColor',
  'backgroundColor', 'cursor', 'opacity', 'textAlign',
];
const TEXT = ['fontSize', 'fontWeight', 'lineHeight', 'color', 'whiteSpace', 'textOverflow', 'overflow'];

/* the first user's drawer, on its Teams tab: plain rows with a ⋯ at the right end */
const openUserTeams = async (page) => {
  await page.locator('tbody tr').first().locator('td').nth(1).click();
  await page.waitForSelector(D, { timeout: 8000 });
  await page.getByRole('tab', { name: /^Teams/ }).click();
  await page.waitForSelector(`${D} .kit-row`, { timeout: 8000 });
  await page.waitForTimeout(400);
};
/* Agent Fleet: the first customer, the first agent, its Health tab - pressable rows with a chevron */
const openAgentHealth = async (page) => {
  await page.getByText('Northwind Retail').first().click();
  await page.waitForSelector('tbody tr', { timeout: 10000 });
  await page.waitForTimeout(1200);
  await page.getByText('edge-32-0012').first().click();
  await page.waitForSelector(D, { timeout: 8000 });
  await page.getByRole('tab', { name: /^Health/ }).click();
  await page.waitForSelector(`${D} .kit-row`, { timeout: 8000 });
  await page.waitForTimeout(400);
};
/* a ring is read after a real Tab, never after .focus(): a pointer press just before (the tab that opened the panel)
 * keeps a programmatic focus from matching :focus-visible, so the console would read "no ring" that nobody sees */
const tabTo = async (page, selector) => {
  for (let i = 0; i < 60; i++) {
    await page.keyboard.press('Tab');
    if (await page.evaluate((s) => document.activeElement && document.activeElement.matches(s), selector)) return;
  }
};
const openAgentHealthByKeyboard = async (page) => {
  await openAgentHealth(page);
  await page.getByRole('tab', { name: /^Health/ }).focus();
  await tabTo(page, `${D} button.kit-row`);
  await page.waitForTimeout(200);
};
const storyByKeyboard = async (page) => {
  await tabTo(page, 'button.mdt-rowlist__row');
  await page.waitForTimeout(200);
};
/* My Organization › Settings › Directory sync (LDAP): its facts are a separated KeyValueList (180), and its Edit drawer
 * holds the on-premises collector picker - a two-line pick list of radio rows */
const openLdap = async (page) => {
  await page.getByRole('tab', { name: 'Settings' }).click();
  await page.waitForTimeout(800);
  await page.getByText('Directory sync (LDAP)').first().click();
  await page.waitForSelector('.kit-kv-list', { timeout: 8000 });
  await page.waitForTimeout(400);
};
const openLdapEdit = async (page) => {
  await openLdap(page);
  await page.getByRole('button', { name: 'Edit', exact: true }).last().click();
  await page.waitForSelector('label.kit-row-selectable', { timeout: 8000 });
  await page.waitForTimeout(400);
};
const toCompat = async (page) => {
  await page.waitForSelector('.kit-row-list', { timeout: 10000 });
  await page.locator('.kit-row-list').first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
};

const S = (id) => 'new-components-rowlist--' + id;

module.exports = {
  component: 'RowList',
  frames: [
    {
      name: 'frame · a user\'s Teams tab (edge, 8 corners, card ground)',
      props: FRAME,
      story: { id: S('with-row-menu'), select: '.mdt-rowlist' },
      console: { path: '/users', open: openUserTeams, select: `${D} .kit-row-list` },
      mock: null,
    },
    {
      name: 'row · plain, default density (54, 5 12, gap 10, separator)',
      props: ROW,
      story: { id: S('with-row-menu'), select: '.mdt-rowlist > .mdt-rowlist__row' },
      console: { path: '/users', open: openUserTeams, select: `${D} .kit-row-list > .kit-row` },
      mock: null,
    },
    {
      name: 'row · actions slot (gap 6, no shrink)',
      props: ['display', 'alignItems', 'columnGap', 'flexShrink'],
      story: { id: S('with-row-menu'), select: '.mdt-rowlist__actions' },
      console: { path: '/users', open: openUserTeams, select: `${D} .kit-row-actions` },
      mock: null,
    },
    {
      name: 'row · pressable, at rest (agent Health › Modules)',
      props: ROW,
      story: { id: S('default'), select: 'button.mdt-rowlist__row' },
      console: { path: '/agent-fleet', open: openAgentHealth, select: `${D} button.kit-row` },
      mock: null,
    },
    {
      name: 'row · pressable, hover (neutral-10)',
      props: ['backgroundColor', 'cursor'],
      story: { id: S('default'), select: 'button.mdt-rowlist__row' },
      console: { path: '/agent-fleet', open: openAgentHealth, select: `${D} button.kit-row` },
      mock: null,
      state: 'hover',
    },
    {
      name: 'row · pressable, keyboard focus (2px ring inside, after a real Tab)',
      props: ['outlineStyle', 'outlineWidth', 'outlineColor', 'outlineOffset'],
      story: { id: S('default'), open: storyByKeyboard, select: 'button.mdt-rowlist__row:focus' },
      console: { path: '/agent-fleet', open: openAgentHealthByKeyboard, select: `${D} button.kit-row:focus` },
      mock: null,
    },
    {
      name: 'row title · the name (12/500/1.45, reading ink, one line)',
      props: TEXT,
      story: { id: S('default'), select: '.mdt-rowlist__text[data-role="primary"]' },
      console: { path: '/_compat', open: toCompat, select: '.kit-row-list .kit-row-body > span > span > span' },
      mock: null,
    },
    {
      name: 'row title · the line under it (11/400, secondary ink)',
      props: TEXT,
      story: { id: S('default'), select: '.mdt-rowlist__text[data-role="secondary"]' },
      console: { path: '/_compat', open: toCompat, select: '.kit-row-list .kit-row-body > span > span:nth-child(2)' },
      mock: null,
    },
    {
      name: 'pick list · a ticked row (label, blue-10)',
      props: ROW,
      story: { id: S('pick-list'), select: 'label.mdt-rowlist__row' },
      console: { path: '/_compat', open: toCompat, select: 'label.kit-row-selectable' },
      mock: null,
    },
    {
      name: 'pick list · the box slot (16)',
      props: ['display', 'columnGap', 'rectWidth', 'rectHeight', 'flexShrink'],
      story: { id: S('pick-list'), select: 'label.mdt-rowlist__row > .mdt-rowlist__leading' },
      console: { path: '/_compat', open: toCompat, select: 'label.kit-row-selectable > .kit-row-leading' },
      mock: null,
    },
    {
      name: 'pick list · a radio row, two-line (the LDAP collector picker)',
      props: ROW.filter((p) => p !== 'rectHeight'),
      story: { id: S('radio-pick'), select: 'label.mdt-rowlist__row' },
      console: { path: '/organizations/org_msp', open: openLdapEdit, select: 'label.kit-row-selectable' },
      mock: null,
    },
    {
      name: 'pick list · the radio slot',
      props: ['display', 'columnGap', 'rectWidth', 'rectHeight', 'flexShrink'],
      story: { id: S('radio-pick'), select: 'label.mdt-rowlist__row > .mdt-rowlist__leading' },
      console: { path: '/organizations/org_msp', open: openLdapEdit, select: 'label.kit-row-selectable > .kit-row-leading' },
      mock: null,
    },
    {
      name: 'log row · compact (36, 4 8)',
      props: ROW,
      story: { id: S('log-rows'), select: '.mdt-rowlist[data-density="compact"] > .mdt-rowlist__row' },
      console: { path: '/_compat', open: toCompat, select: '.kit-row-list[data-density="compact"] > .kit-row' },
      mock: null,
    },
    {
      name: 'key / value · a row (grid 150 · 1fr, gap 12, 8 0, top)',
      props: ['display', 'gridTemplateColumns', 'columnGap', 'alignItems', 'paddingTop', 'paddingBottom',
        'borderBottomWidth', 'borderBottomStyle', 'borderBottomColor'],
      story: { id: S('key-values'), select: '.mdt-kvlist[data-separated] > .mdt-kvlist__row' },
      console: { path: '/_compat', open: toCompat, select: '.kit-kv-list[data-separated] > .kit-kv-row' },
      mock: null,
    },
    /* not a twin: the LDAP facts (/organizations/org_msp › Settings › Directory sync) are a KeyValueList restyled by
     * the page (settings.css .st-dconn - 13 type, centred, 4 0, no lines), so they measure the page, not the part */
    {
      name: 'key / value · the key (11, secondary ink)',
      props: ['fontSize', 'fontWeight', 'lineHeight', 'color'],
      story: { id: S('key-values'), select: '.mdt-kvlist__label > span' },
      console: { path: '/_compat', open: toCompat, select: '.kit-kv-label > span' },
      mock: null,
    },
    {
      name: 'key / value · the value (12/500, reading ink)',
      props: ['fontSize', 'fontWeight', 'lineHeight', 'color'],
      story: { id: S('key-values'), select: '.mdt-kvlist__value > span' },
      console: { path: '/_compat', open: toCompat, select: '.kit-kv-value > span' },
      mock: null,
    },
    {
      name: 'timeline · an event (gap 10, 0 0 14)',
      props: ['display', 'alignItems', 'columnGap', 'paddingTop', 'paddingBottom', 'position'],
      story: { id: S('timeline-trail'), select: '.mdt-timeline__item' },
      console: { path: '/_compat', open: toCompat, select: '.kit-timeline-item' },
      mock: null,
    },
    {
      name: 'timeline · the dot (7, success ink)',
      props: ['width', 'height', 'marginTop', 'borderTopLeftRadius', 'backgroundColor'],
      story: { id: S('timeline-trail'), select: '.mdt-timeline__dot' },
      console: { path: '/_compat', open: toCompat, select: '.kit-timeline-dot' },
      mock: null,
    },
  ],
};
