/* Parity twins: where the same frame lives in the story, the console and the mock. */
const D = '[role="dialog"]';
/* the story's close is the library's own 28 box; the console's drawer hides it and renders SheetClose as
 * `.kit-close` in the header row (K-Sheet-15) - the same 28 / 6 / 16 treatment, so the two are twins */
const STORY_CLOSE = `${D} button.mdt-h-7.mdt-w-7`;
const CONSOLE_CLOSE = `${D} button.kit-close`;
const PROPS = [
  'width', 'height', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'borderTopWidth', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius',
  'backgroundColor', 'color', 'boxShadow', 'opacity', 'outlineStyle', 'cursor', 'transitionDuration',
  'glyphW', 'glyphH', 'glyphColor', 'glyphStroke', 'glyphStrokeWidth',
];
/* the Users drawer: click the first row's name cell */
const openUsersDrawer = async (page) => {
  await page.locator('tbody tr').first().locator('td').nth(1).click();
  await page.waitForSelector(CONSOLE_CLOSE, { timeout: 8000 });
  await page.waitForTimeout(600);
};
/* the story renders a trigger; press it */
const openStory = async (page) => {
  await page.locator('#storybook-root button').first().click();
  await page.waitForSelector(D, { timeout: 8000 });
  await page.waitForTimeout(600);
};

/* THE FACT ROW (SheetField / SheetFields, 2026-10-28): a record's label · value rows - a user's About tab
 * (ProfileDrawer.jsx ROW / L / V, halves) and the agent drawer's About (afm drawer parts Row / Rows, 3 : 7). The
 * console's rows carry no class of their own, so `open` marks the one to read with data-parity. */
const FACT_ROW = ['display', 'gridTemplateColumns', 'columnGap', 'alignItems', 'rectHeight', 'minHeight'];
const FACT_LABEL = ['display', 'alignItems', 'columnGap', 'fontSize', 'lineHeight', 'fontWeight', 'color'];
const FACT_VALUE = ['display', 'alignItems', 'flexWrap', 'columnGap', 'fontSize', 'lineHeight', 'fontWeight', 'color'];
const FACT_STACK = ['display', 'flexDirection', 'rowGap'];
const markRow = (page, label) =>
  page.evaluate((text) => {
    const rows = [...document.querySelectorAll('[role="dialog"] div')].filter(
      (el) => getComputedStyle(el).display === 'grid' && el.children.length === 2 && el.children[0].textContent.trim() === text
    );
    const row = rows[0];
    if (!row) return;
    row.setAttribute('data-parity', 'fact-row');
    row.parentElement.setAttribute('data-parity', 'fact-stack');
  }, label);
const openUserAbout = async (page) => {
  await openUsersDrawer(page);
  await markRow(page, 'Email');
};
const openAgentAbout = async (page) => {
  await page.getByText('Northwind Retail').first().click();
  await page.waitForSelector('tbody tr', { timeout: 10000 });
  await page.waitForTimeout(1200);
  await page.getByText('edge-32-0012').first().click();
  await page.waitForSelector(`${D} .afm-rows`, { timeout: 8000 });
  await page.waitForTimeout(400);
  await markRow(page, 'Address');
};
const FACT = 'new-components-rowlist--fact-rows';
const FACT_WIDE = 'new-components-rowlist--fact-rows-wide';
const STORY_ROW = '[data-slot="sheet-field"]';
/* the story's second row is Address in the wide story, Phone number in the halves one; the first is read for both */
const STORY_ROW_2 = '[data-slot="sheet-fields"] > [data-slot="sheet-field"]:nth-child(2)';
const FACT_FRAMES = [
  {
    name: 'fact row · a user\'s About (halves, 13 / 1.5, no floor)',
    props: FACT_ROW,
    story: { id: FACT, select: STORY_ROW },
    console: { path: '/users', open: openUserAbout, select: '[data-parity="fact-row"]' },
    mock: null,
  },
  {
    name: 'fact row · the label (13, secondary ink)',
    props: FACT_LABEL,
    story: { id: FACT, select: `${STORY_ROW} > span` },
    console: { path: '/users', open: openUserAbout, select: '[data-parity="fact-row"] > :first-child' },
    mock: null,
  },
  {
    name: 'fact row · the value (13/500, reading ink)',
    props: FACT_VALUE,
    story: { id: FACT, select: `${STORY_ROW} > div` },
    console: { path: '/users', open: openUserAbout, select: '[data-parity="fact-row"] > :nth-child(2)' },
    mock: null,
  },
  {
    name: 'fact rows · the stack (18 apart)',
    props: FACT_STACK,
    story: { id: FACT, select: '[data-slot="sheet-fields"]' },
    console: { path: '/users', open: openUserAbout, select: '[data-parity="fact-stack"]' },
    mock: null,
  },
  {
    name: 'fact row · the agent\'s About (3 : 7, 12 between)',
    props: FACT_ROW,
    story: { id: FACT_WIDE, select: STORY_ROW_2 },
    console: { path: '/agent-fleet', open: openAgentAbout, select: '[data-parity="fact-row"]' },
    mock: null,
  },
  {
    name: 'fact row · the agent\'s label',
    props: FACT_LABEL,
    story: { id: FACT_WIDE, select: `${STORY_ROW_2} > span` },
    console: { path: '/agent-fleet', open: openAgentAbout, select: '[data-parity="fact-row"] > :first-child' },
    mock: null,
  },
  {
    name: 'fact row · the agent\'s value (a line of items 6 apart)',
    props: FACT_VALUE,
    story: { id: FACT_WIDE, select: `${STORY_ROW_2} > div` },
    console: { path: '/agent-fleet', open: openAgentAbout, select: '[data-parity="fact-row"] > :nth-child(2)' },
    mock: null,
  },
  {
    name: 'fact rows · the agent\'s stack (18 apart)',
    props: FACT_STACK,
    story: { id: FACT_WIDE, select: '[data-slot="sheet-fields"]' },
    console: { path: '/agent-fleet', open: openAgentAbout, select: '[data-parity="fact-stack"]' },
    mock: null,
  },
];

module.exports = {
  component: 'Sheet',
  frames: [
    ...FACT_FRAMES,
    {
      name: 'close box · rest (28 × 28, corners 6, x at 16 in neutral-90, 120ms)',
      props: PROPS,
      story: { id: 'new-components-sheet--default', open: openStory, select: STORY_CLOSE },
      console: { path: '/users', open: openUsersDrawer, select: CONSOLE_CLOSE },
      mock: null,
    },
    {
      name: 'close box · hover (neutral-20 ground, glyph in primary)',
      props: PROPS,
      story: { id: 'new-components-sheet--default', open: openStory, select: STORY_CLOSE },
      console: { path: '/users', open: openUsersDrawer, select: CONSOLE_CLOSE },
      mock: null,
      state: 'hover',
    },
    {
      name: 'close box · keyboard focus (1px primary ring, 4px halo at 8%)',
      props: PROPS,
      story: { id: 'new-components-sheet--default', open: openStory, select: STORY_CLOSE },
      console: { path: '/users', open: openUsersDrawer, select: CONSOLE_CLOSE },
      mock: null,
      state: 'focus',
    },
  ],
};
