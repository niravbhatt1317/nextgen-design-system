/* Parity twins: the CopyField folder - CopyTip, measured 2026-10-28 (CopyField itself has no console twin yet: the
 * console still draws its one-line fields by hand; its button now goes through CopyTip, measured here).
 * The console's part is ui/CopyTip.jsx. Agent Fleet → Northwind Retail → Enroll agents → Linux base image → Generate
 * command draws it round the icon-only ghost copy on the install command (EnrollFlow.jsx CodeBlock): its own inline-flex
 * span as the anchor, "Copy" under the pointer, "Copied" after a press - the library Tooltip in both. The story's
 * CopyTipIconOnly is the same control round an ID. (Client Organizations → Contacts was tried first: contacts.css pulls
 * that button into its 24 row with negative margins, so its anchor measures 22 x 24 - the row's, not CopyTip's.) */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const BTN = 'button[aria-label^="Copy"]';
const CONSOLE_ANCHOR = `.cb-copy > span[style*="inline-flex"]`;
const STORY = 'new-components-copyfield--copy-tip-icon-only';

const openEnroll = async (page) => {
  await page.waitForSelector('text=Northwind Retail', { timeout: 20000 });
  await page.getByText('Northwind Retail', { exact: true }).first().click();
  await page.getByRole('button', { name: /^Enroll agents$/ }).first().click();
  await page.getByText('Linux base image').first().click();
  await page.getByRole('button', { name: /^Next$/ }).first().click();
  await wait(600);
  await page.getByRole('button', { name: /^Next$/ }).first().click();
  await page.getByRole('button', { name: /^Generate command$/ }).first().click();
  await page.waitForSelector(CONSOLE_ANCHOR, { timeout: 15000 });
  await page.mouse.move(0, 0);
  await wait(300);
};
const hoverConsole = async (page) => {
  await openEnroll(page);
  await page.locator(`${CONSOLE_ANCHOR} > ${BTN}`).first().hover();
  await page.waitForSelector('.tt', { timeout: 5000 });
  await wait(300);
};
const pressConsole = async (page) => {
  await openEnroll(page);
  await page.locator(`${CONSOLE_ANCHOR} > ${BTN}`).first().click();
  await wait(250);
};
const hoverStory = async (page) => {
  await page.locator(BTN).first().hover();
  await page.waitForSelector('.tt', { timeout: 5000 });
  await wait(300);
};
const pressStory = async (page) => {
  await page.locator(BTN).first().click();
  await wait(250);
};
const AF = (open, select) => ({ path: '/agent-fleet', open, select });
const BUBBLE = [
  'backgroundColor', 'color', 'fontSize', 'lineHeight', 'paddingTop', 'paddingLeft', 'borderTopLeftRadius', 'maxWidth',
  'zIndex',
];

module.exports = {
  component: 'CopyField',
  frames: [
    {
      name: 'CopyTip · the anchor (its own inline-flex span)',
      props: ['display', 'flexShrink', 'width', 'height'],
      story: { id: STORY, select: '[data-slot="copy-tip"]' },
      console: AF(openEnroll, CONSOLE_ANCHOR),
      mock: null,
    },
    {
      name: 'CopyTip · the ghost copy inside (28, icon only)',
      props: ['width', 'height', 'borderTopLeftRadius', 'backgroundColor', 'color', 'cursor'],
      story: { id: STORY, select: `[data-slot="copy-tip"] > ${BTN}` },
      console: AF(openEnroll, `${CONSOLE_ANCHOR} > ${BTN}`),
      mock: null,
    },
    {
      name: 'CopyTip · "Copy" under the pointer (the library bubble)',
      props: BUBBLE,
      story: { id: STORY, open: hoverStory, select: '.tt' },
      console: AF(hoverConsole, '.tt'),
      mock: null,
    },
    {
      name: 'CopyTip · "Copied" after a press',
      props: BUBBLE,
      story: { id: STORY, open: pressStory, select: '.tt' },
      console: AF(pressConsole, '.tt'),
      mock: null,
    },
  ],
};
