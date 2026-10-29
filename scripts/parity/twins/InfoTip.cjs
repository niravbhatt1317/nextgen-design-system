/* Parity twins: the library's InfoTip beside the console's ⓘ. The console has no library InfoTip yet (it runs 2.2.0);
 * its ⓘ is the Agent Fleet drawer's own (afm/screens/drawer/parts.tsx InfoTip, `.afm-info` in agentDrawer.css), which is
 * My Organization > Settings > Security policy's ⓘ (`.st-info`) value for value - a 20 square, corners 6, the filled
 * glyph at 14, neutral-40 at rest and neutral-60 on hover, focus or open, and since 2026-10-27 NO ground behind it
 * (Pranjal: "i button had a white bg hover? thats should not be there. only icon should have hover"). The agent drawer's
 * About tab carries four of them (the first agent of Northwind Retail).
 *
 * `cursor`: both show the help cursor since 2026-10-28 (Pranjal: every ⓘ shows the help cursor), so it is no longer
 * a difference. `transitionDuration` neither: both fade in 100ms, but the console lists it per property ("0.1s, 0.1s")
 * where the library's one transition-colors rule lists it once ("0.1s"). */
const D = '[role="dialog"]';
const park = (page) => page.mouse.move(0, 0);

/* the runner signs in and opens /agent-fleet; a customer list may come first (the MSP view) - step into Northwind
 * Retail, then open the first agent's drawer on its About tab */
const openAgentDrawer = async (page) => {
  const customer = page.getByText('Northwind Retail').first();
  if (await customer.count()) {
    await customer.click().catch(() => {});
    await page.waitForTimeout(1500);
  }
  await page.waitForSelector('table tbody tr', { timeout: 20000 });
  await page
    .locator('table tbody tr td')
    .filter({ hasText: /-\d{2}-\d{4}/ })
    .first()
    .click();
  await page.waitForSelector(`${D} .afm-info`, { timeout: 15000 });
  await park(page);
  await page.waitForTimeout(400);
};

const STORY = 'new-components-infotip--default';
const S_INFO = '#storybook-root button[aria-label="About Security policy"]';
const C_INFO = `${D} .afm-info`;
const BUTTON = [
  'width', 'height', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'borderTopWidth', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius',
  'backgroundColor', 'color', 'boxShadow', 'opacity',
];
const BUBBLE = '[data-radix-popper-content-wrapper] > [data-state]';
const hoverInfo = (select) => async (page) => {
  await page.locator(select).first().hover();
  await page.waitForSelector(BUBBLE, { timeout: 5000 });
  await page.waitForTimeout(400);
};

module.exports = {
  component: 'InfoTip',
  frames: [
    {
      name: 'the ⓘ at rest',
      props: BUTTON,
      story: { id: STORY, select: S_INFO },
      console: { path: '/agent-fleet', open: openAgentDrawer, select: C_INFO },
      mock: null,
    },
    {
      name: 'the ⓘ under the pointer (glyph only, no ground)',
      props: ['backgroundColor', 'color', 'boxShadow'],
      state: 'hover',
      story: { id: STORY, select: S_INFO },
      console: { path: '/agent-fleet', open: openAgentDrawer, select: C_INFO },
      mock: null,
    },
    {
      name: 'the glyph (filled, 14)',
      props: ['width', 'height', 'color', 'fill'],
      story: { id: STORY, select: `${S_INFO} > svg` },
      console: { path: '/agent-fleet', open: openAgentDrawer, select: `${C_INFO} > svg` },
      mock: null,
    },
    {
      name: 'the explainer, open (under its start, 340, from the left)',
      props: ['maxWidth', 'textAlign', 'backgroundColor', 'color', 'fontSize', 'lineHeight', 'paddingTop', 'paddingLeft'],
      story: { id: STORY, open: hoverInfo(S_INFO), select: BUBBLE },
      console: {
        path: '/agent-fleet',
        open: async (page) => {
          await openAgentDrawer(page);
          await hoverInfo(C_INFO)(page);
        },
        select: BUBBLE,
      },
      mock: null,
    },
  ],
};
