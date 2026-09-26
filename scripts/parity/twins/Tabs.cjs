/* Parity twins: where the same frame lives in the story, the console and the mock.
 * Tabs, measured 2026-09-22; repaired 2026-09-26 (evening). The runner signs in and opens `path` itself - the opens
 * below only wait and click, on whichever console the runner was pointed at (the old hard-coded :4187 read a stale
 * server).
 * Console facts (2026-09-26): the UNDERLINE tab is the library's own Tabs now, on both bands. The drawer band is
 * compat/om/atoms.jsx DrawerTabs over <TabsList type="underline" hairline> ([role="dialog"] [role="tablist"], 48 high
 * in the profile drawer, the hairline the strip's own); the page band is compat/iam/PageScaffold.jsx TabBand over
 * <TabsList type="underline" hairline={false}> on /fleet/inventory (60 high, the tabs stretched); a count is the
 * library's own [data-testid="tab-count"] pill. The FILLED tab is still the console's hand-built `.kit-ftab` in
 * `.kit-ftabs` (compat/afm/kit.jsx Segmented): the Source of truth switch, shown only while EDITING a user who has a
 * live source (Madison Thomas: LDAP + SCIM). No IAM tab carries an icon and no console switch carries a count - those
 * frames twin the mock. */

const D = '[role="dialog"]';
const park = (page) => page.mouse.move(0, 0);

const openUser = (who) => async (page) => {
  await page.waitForSelector('table tbody tr', { timeout: 20000 });
  await page.locator('table tbody tr').filter({ hasText: who }).first().locator('td').nth(1).click();
  await page.waitForSelector(`${D} [role="tablist"]`, { timeout: 15000 });
  await park(page);
  await page.waitForTimeout(300);
};

const openUserEdit = (who) => async (page) => {
  await openUser(who)(page);
  await page
    .locator(`${D} button`)
    .filter({ hasText: /^Edit( details)?$/ })
    .first()
    .click();
  await page.waitForSelector(`${D} .kit-ftabs`, { timeout: 10000 });
  await park(page);
  await page.waitForTimeout(300);
};

const openPageBand = async (page) => {
  await page.waitForSelector('[role="tablist"] [role="tab"]', { timeout: 20000 });
  await park(page);
};

const LABEL = ['height', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'columnGap', 'borderBottomWidth', 'borderBottomColor', 'backgroundColor', 'color', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'cursor', 'opacity', 'transitionDuration'];
/* a filled chip has no bottom border on either side (width 0), so its border COLOUR is only the stylesheet's default - the
 * gallery's preflight neutral-40, the console's currentColor - noise, not a reading; the width still proves there is none */
const CHIP = [...LABEL.filter((p) => p !== 'borderBottomColor'), 'borderRadius', 'boxShadow'];
const COUNT = ['height', 'minWidth', 'paddingLeft', 'paddingRight', 'borderRadius', 'backgroundColor', 'color', 'fontSize', 'fontWeight', 'lineHeight'];

const STORY_U = 'new-components-tabs--underline';
const STORY_F = 'new-components-tabs--filled';
const MOCK = 'mocks/foundation/tabs.html';
const cell = (n) => `.matrix > div:nth-child(${n})`;
/* the same library DOM on both sides: the story's under #storybook-root, the console's inside the drawer or the band */
const ACTIVE = '[role="tab"][data-state="active"]';
const REST = '[role="tab"][data-state="inactive"]';

module.exports = {
  component: 'Tabs',
  frames: [
    // ── underline: the drawer band (the Users drawer) ──
    {
      name: 'underline · active · rest',
      props: LABEL,
      story: { id: STORY_U, select: `#storybook-root ${ACTIVE}` },
      console: { path: '/users', open: openUser('Sarah Johnson'), select: `${D} ${ACTIVE}` },
      mock: { file: MOCK, select: `${cell(9)} .utab.on` },
    },
    {
      name: 'underline · rest',
      props: LABEL,
      story: { id: STORY_U, select: `#storybook-root ${REST}` },
      console: { path: '/users', open: openUser('Sarah Johnson'), select: `${D} ${REST}` },
      mock: { file: MOCK, select: `${cell(9)} .utab:not(.on)` },
    },
    {
      name: 'underline · rest · hover',
      props: LABEL,
      story: { id: STORY_U, select: `#storybook-root ${REST}` },
      console: { path: '/users', open: openUser('Sarah Johnson'), select: `${D} ${REST}` },
      mock: { file: MOCK, select: `${cell(10)} .utab.hover` }, // drawn, not pointed at
      state: 'hover',
    },
    {
      name: 'underline · active · hover (stays primary)',
      props: LABEL,
      story: { id: STORY_U, select: `#storybook-root ${ACTIVE}` },
      console: { path: '/users', open: openUser('Sarah Johnson'), select: `${D} ${ACTIVE}` },
      mock: null,
      state: 'hover',
    },
    {
      name: 'underline · disabled',
      props: LABEL,
      story: { id: 'new-components-tabs--with-counts', select: '#storybook-root [data-type="underline"][role="tab"]:disabled' },
      console: null, // no IAM drawer tab is disabled
      mock: { file: MOCK, select: `${cell(12)} .utab.off` },
    },
    {
      name: 'underline · the strip (drawer band, 48, the hairline)',
      props: ['height', 'alignItems', 'columnGap', 'borderBottomWidth', 'borderBottomColor'],
      story: { id: 'new-components-tabs--in-a-drawer-band', select: '#storybook-root [role="tablist"]' },
      console: { path: '/users', open: openUser('Sarah Johnson'), select: `${D} [role="tablist"]` },
      mock: { file: MOCK, select: '.band > .ustrip:not(.pulled)' },
    },
    {
      name: 'underline · icon (14, 6 before the label)',
      props: ['width', 'height', 'color', 'strokeWidth'],
      story: { id: 'new-components-tabs--states', select: '#storybook-root [data-type="underline"][role="tab"] [data-testid="tab-icon"] svg' },
      console: null, // no IAM tab carries an icon
      mock: { file: MOCK, select: `${cell(13)} .utab .i` },
    },
    // ── the count pill: the library's own pill on the page band ──
    {
      name: 'count · active (inverted)',
      props: COUNT,
      story: { id: 'new-components-tabs--in-a-page-band', select: `#storybook-root ${ACTIVE} [data-testid="tab-count"]` },
      console: { path: '/fleet/inventory', open: openPageBand, select: `[role="tablist"] ${ACTIVE} [data-testid="tab-count"]` },
      mock: { file: MOCK, select: `${cell(14)} .utab.on .cnt` },
    },
    {
      name: 'count · rest (neutral-10 ground)',
      props: COUNT,
      story: { id: 'new-components-tabs--in-a-page-band', select: `#storybook-root ${REST} [data-testid="tab-count"]` },
      console: { path: '/fleet/inventory', open: openPageBand, select: `[role="tablist"] ${REST} [data-testid="tab-count"]` },
      mock: null, // the mock draws the rest count on neutral-20; the part sits it on --mdt-muted = neutral-10
    },
    // ── underline: the page band (TabBand: 60, stretched, no hairline) ──
    {
      name: 'page band · the strip',
      props: ['height', 'alignItems', 'columnGap', 'borderBottomWidth'],
      story: { id: 'new-components-tabs--in-a-page-band', select: '#storybook-root [role="tablist"]' },
      console: { path: '/fleet/inventory', open: openPageBand, select: '[role="tablist"]' },
      mock: null,
    },
    {
      name: 'page band · active tab (stretched to 60)',
      props: [...LABEL, 'marginBottom'],
      story: { id: 'new-components-tabs--in-a-page-band', select: `#storybook-root ${ACTIVE}` },
      console: { path: '/fleet/inventory', open: openPageBand, select: `[role="tablist"] ${ACTIVE}` },
      mock: null,
    },
    // ── filled: the Source of truth switch (still the console's own .kit-ftab) ──
    {
      name: 'filled · the track',
      props: ['height', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'columnGap', 'borderRadius', 'backgroundColor', 'alignItems'],
      story: { id: STORY_F, select: '#storybook-root [role="tablist"][data-type="filled"]' },
      console: { path: '/users', open: openUserEdit('Madison Thomas'), select: `${D} .kit-ftabs` },
      mock: { file: MOCK, select: `${cell(16)} .fstrip` },
    },
    {
      name: 'filled · active chip · rest',
      props: CHIP,
      story: { id: STORY_F, select: '#storybook-root [data-type="filled"][role="tab"][data-state="active"]' },
      console: { path: '/users', open: openUserEdit('Madison Thomas'), select: `${D} .kit-ftab[data-on]` },
      mock: { file: MOCK, select: `${cell(16)} .ftab.on` },
    },
    {
      name: 'filled · rest chip',
      props: CHIP,
      story: { id: STORY_F, select: '#storybook-root [data-type="filled"][role="tab"][data-state="inactive"]' },
      console: { path: '/users', open: openUserEdit('Madison Thomas'), select: `${D} .kit-ftab:not([data-on])` },
      mock: { file: MOCK, select: `${cell(16)} .ftab:not(.on)` },
    },
    {
      name: 'filled · rest chip · hover (4% primary)',
      props: CHIP,
      story: { id: STORY_F, select: '#storybook-root [data-type="filled"][role="tab"][data-state="inactive"]' },
      console: { path: '/users', open: openUserEdit('Madison Thomas'), select: `${D} .kit-ftab:not([data-on])` },
      mock: { file: MOCK, select: `${cell(17)} .ftab.hover` },
      state: 'hover',
    },
    {
      name: 'filled · active chip · hover (stays white)',
      props: CHIP,
      story: { id: STORY_F, select: '#storybook-root [data-type="filled"][role="tab"][data-state="active"]' },
      console: { path: '/users', open: openUserEdit('Madison Thomas'), select: `${D} .kit-ftab[data-on]` },
      mock: null,
      state: 'hover',
    },
    {
      name: 'filled · disabled chip',
      props: CHIP,
      story: { id: 'new-components-tabs--with-counts', select: '#storybook-root [data-type="filled"][role="tab"]:disabled' },
      console: null, // no console switch option is disabled; the rule is .kit-ftab:disabled (global.css 958)
      mock: { file: MOCK, select: `${cell(19)} .ftab.off` },
    },
    {
      name: 'filled · count (mock only - no console switch carries one)',
      props: COUNT,
      story: { id: 'new-components-tabs--with-counts', select: '#storybook-root [data-type="filled"][role="tab"][data-state="inactive"] [data-testid="tab-count"]' },
      console: null,
      mock: { file: MOCK, select: `${cell(21)} .ftab:not(.on) .cnt` },
    },
  ],
};
