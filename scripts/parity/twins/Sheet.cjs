/* Parity twins: where the same frame lives in the story, the console and the mock.
 * The panel frames (2026-10-28): the console's drawer is compat/om/atoms.jsx `Drawer` (a Sheet styled in place:
 * the head `.kit-drawer-head`, its title 14/600 on 20 since 2026-10-26); its pages are the fleets' (the Agent Fleet
 * Health "Needs attention" drawer - a list whose rows open as pages of the same 720 drawer, under the trail). The
 * library's twin is the Drawer story "List to page" (SheetNavigation), opened by real clicks. */
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
const TITLE = ['fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color'];
const HEAD = [
  'minHeight', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
  'borderBottomWidth', 'columnGap', 'alignItems', 'justifyContent',
];
const WAY = ['fontSize', 'fontWeight', 'lineHeight', 'color', 'cursor', 'textDecorationLine', 'borderTopLeftRadius'];
const WAY_HOVER = ['color', 'textDecorationLine', 'textDecorationColor', 'textUnderlineOffset'];

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
/* Agent Fleet › Health, the customer picked if the list shows */
const toHealth = async (page) => {
  const customer = page.getByText('Northwind Retail').first();
  if (await customer.count()) {
    await customer.click().catch(() => {});
    await page.waitForTimeout(1500);
  }
  await page.getByText('Health', { exact: true }).first().click();
  await page.waitForSelector('.hl-rows button', { timeout: 20000 });
};
/* View all: the Needs attention drawer on its list */
const openNeedsList = async (page) => {
  await toHealth(page);
  await page.getByRole('button', { name: /^View all/ }).first().click();
  await page.waitForSelector(`${D} h2`, { timeout: 10000 });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(600);
};
/* a Needs attention row: the drawer on that problem's page, under the trail */
const openNeedsPage = async (page) => {
  await toHealth(page);
  await page.locator('.hl-rows button').first().click();
  await page.waitForSelector(`${D} h2 nav[data-slot="breadcrumb"]`, { timeout: 10000 });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(600);
};
/* the agent drawer: the first agent's name */
const openAgentDrawer = async (page) => {
  const customer = page.getByText('Northwind Retail').first();
  if (await customer.count()) {
    await customer.click().catch(() => {});
    await page.waitForTimeout(1500);
  }
  await page.waitForSelector('table tbody tr', { timeout: 20000 });
  await page.locator('table tbody tr').first().getByText(/^(edge|node)-/).first().click();
  await page.waitForSelector(`${D} h2`, { timeout: 10000 });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(600);
};

/* the agent drawer's Health tab: a section head with its Note under it */
const openAgentHealth = async (page) => {
  await openAgentDrawer(page);
  await page.locator(`${D} [role="tab"]`).filter({ hasText: 'Health' }).first().click();
  await page.waitForSelector(`${D} .afm-note`, { timeout: 10000 });
  await page.waitForTimeout(400);
};
/* the console's drawer section (afm/screens/drawer/parts.tsx): SectionHead (.afm-sechead, its words the first inner
 * span's span), Note (.afm-note), Rows (.afm-rows, 16 under the head); sections 32 apart (SectionGap), no line */
const C_HEAD = `${D} .afm-sechead`;
const C_HEADING = `${D} .afm-sechead > span > span:first-child`;
const C_CONTENT = `${D} .afm-sechead + .afm-rows`;
const C_HINT = `${D} .afm-note`;
const S_SECTION = `${D} [data-slot="sheet-section"]`;
const S_HEAD = `${S_SECTION} > [data-slot="sheet-section-head"]`;

/* the library's twin: the Drawer story "List to page", opened - and on a page - by real clicks */
const LIST = 'new-components-drawer--list-to-page';
const openStoryList = async (page) => {
  await page.getByRole('button', { name: 'Open Needs attention' }).click();
  await page.waitForSelector(`${D} h2`, { timeout: 8000 });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(600);
};
const openStoryPage = async (page) => {
  await openStoryList(page);
  await page.getByRole('button', { name: /125 hosts/ }).click();
  await page.waitForSelector(`${D} h2 nav[data-slot="breadcrumb"]`, { timeout: 8000 });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(400);
};

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
    // ── the panel's title: 14/600 on 20 (Pranjal 2026-10-26) ──
    {
      name: 'panel title · Needs attention (14/600/20, heading ink)',
      props: TITLE,
      story: { id: LIST, open: openStoryList, select: `${D} h2` },
      console: { path: '/agent-fleet', open: openNeedsList, select: `${D} h2` },
      mock: null,
    },
    {
      name: 'panel title · Agent details (14/600/20)',
      props: TITLE,
      story: { id: LIST, open: openStoryList, select: `${D} h2` },
      console: { path: '/agent-fleet', open: openAgentDrawer, select: `${D} h2` },
      mock: null,
    },
    {
      name: 'panel head (60, 6 · 24, hairline)',
      props: HEAD,
      story: { id: LIST, open: openStoryList, select: `${D} [data-slot="sheet-header"]` },
      console: { path: '/agent-fleet', open: openNeedsList, select: `${D} .kit-drawer-head` },
      mock: null,
    },
    {
      name: 'panel width · the list (720)',
      props: ['rectWidth'],
      story: { id: LIST, open: openStoryList, select: D },
      console: { path: '/agent-fleet', open: openNeedsList, select: D },
      mock: null,
    },
    // ── the panel's next page: in place, same width, under the trail ──
    {
      name: 'panel width · on the page (still 720)',
      props: ['rectWidth'],
      story: { id: LIST, open: openStoryPage, select: D },
      console: { path: '/agent-fleet', open: openNeedsPage, select: D },
      mock: null,
    },
    {
      name: 'page trail · the row (14/20)',
      props: ['fontSize', 'lineHeight', 'color'],
      story: { id: LIST, open: openStoryPage, select: `${D} h2 nav[data-slot="breadcrumb"]` },
      console: { path: '/agent-fleet', open: openNeedsPage, select: `${D} h2 nav[data-slot="breadcrumb"]` },
      mock: null,
    },
    {
      name: 'page trail · the way back (faint, 400)',
      props: WAY,
      story: { id: LIST, open: openStoryPage, select: `${D} h2 nav li:first-child [data-slot="breadcrumb-label"]` },
      console: { path: '/agent-fleet', open: openNeedsPage, select: `${D} h2 nav li:first-child button` },
      mock: null,
    },
    {
      name: 'page trail · the way back · hover (foreground, underline)',
      props: WAY_HOVER,
      story: { id: LIST, open: openStoryPage, select: `${D} h2 nav li:first-child [data-slot="breadcrumb-label"]` },
      console: { path: '/agent-fleet', open: openNeedsPage, select: `${D} h2 nav li:first-child button` },
      mock: null,
      state: 'hover',
    },
    // ── a section of the panel's body (SheetSection; the console's SectionHead / Note / Rows) ──
    {
      name: 'section head (24 at least, 12 to the action)',
      props: ['minHeight', 'columnGap', 'alignItems', 'justifyContent', 'rectHeight'],
      story: { id: LIST, open: openStoryPage, select: S_HEAD },
      console: { path: '/agent-fleet', open: openAgentDrawer, select: C_HEAD },
      mock: null,
    },
    {
      name: 'section heading (14/600 on 1.5, title ink)',
      props: ['fontSize', 'fontWeight', 'lineHeight', 'color'],
      story: { id: LIST, open: openStoryPage, select: `${S_HEAD} h3` },
      console: { path: '/agent-fleet', open: openAgentDrawer, select: C_HEADING },
      mock: null,
    },
    {
      name: 'section hint (12 on 1.5, quiet ink, 4 under)',
      props: ['fontSize', 'fontWeight', 'lineHeight', 'color', 'marginTop'],
      story: { id: LIST, open: openStoryPage, select: `${S_SECTION} > p` },
      console: { path: '/agent-fleet', open: openAgentHealth, select: C_HINT },
      mock: null,
    },
    {
      name: 'section content (16 under the head)',
      props: ['marginTop', 'display', 'flexDirection'],
      story: { id: LIST, open: openStoryPage, select: `${S_SECTION} > div:last-child` },
      console: { path: '/agent-fleet', open: openAgentDrawer, select: C_CONTENT },
      mock: null,
    },
    {
      name: 'page trail · the step (14/600)',
      props: ['fontSize', 'fontWeight', 'lineHeight', 'color'],
      story: { id: LIST, open: openStoryPage, select: `${D} h2 nav [aria-current="page"] [data-slot="breadcrumb-label"]` },
      console: { path: '/agent-fleet', open: openNeedsPage, select: `${D} h2 nav [aria-current="page"] [data-slot="breadcrumb-label"]` },
      mock: null,
    },
  ],
};
