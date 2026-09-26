/* Parity twins: the library's TagPill (New Components, 28 tall by Pranjal's ruling of 4 September 2026) beside the
 * console's one removable chip - the address chip in the Invite users drawer on Users, which is this same TagPill as
 * the console imports it from the library. The console has no chip at rest: the frame types one address into the
 * "Invite by email" field, so both sides show a removable chip with a word and the cross. */
const STORY = 'new-components-tagpill--default';
/* the console: Users → Invite users (the visible header copy; a compact copy sits hidden above it) → Invite via
 * email → one address, Enter */
const openInviteEmail = async (page) => {
  await page.locator('.hero-actions button:visible', { hasText: 'Invite users' }).first().click();
  await page.waitForSelector('[role="dialog"]', { timeout: 8000 });
  await page.locator('[role="dialog"] button', { hasText: 'Invite via email' }).first().click();
  const input = page.locator('[role="dialog"] .kit-chipbox input').first();
  await input.waitFor({ timeout: 5000 });
  await input.fill('parity.twin@acme.com');
  await input.press('Enter');
  await page.waitForSelector('[role="dialog"] [data-testid="tag"]', { timeout: 5000 });
  await page.waitForTimeout(300);
};
const CHIP = '[data-testid="tag"]';
const CONSOLE_CHIP = '[role="dialog"] [data-testid="tag"]';
const CHIP_PROPS = [
  'backgroundColor', 'color', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius',
  'height', 'paddingLeft', 'paddingRight', 'columnGap', 'fontSize', 'fontWeight',
];

module.exports = {
  component: 'TagPill',
  frames: [
    {
      name: 'the chip at rest',
      props: CHIP_PROPS,
      story: { id: STORY, select: CHIP },
      console: { path: '/users', open: openInviteEmail, select: CONSOLE_CHIP },
      mock: null,
    },
    {
      name: 'the chip under the pointer',
      props: ['backgroundColor', 'color'],
      state: 'hover',
      story: { id: STORY, select: CHIP },
      console: { path: '/users', open: openInviteEmail, select: CONSOLE_CHIP },
      mock: null,
    },
    {
      name: 'the remove control',
      props: ['width', 'height', 'borderTopLeftRadius', 'backgroundColor', 'color'],
      story: { id: STORY, select: `${CHIP} [data-testid="tag-remove"]` },
      console: { path: '/users', open: openInviteEmail, select: `${CONSOLE_CHIP} [data-testid="tag-remove"]` },
      mock: null,
    },
  ],
};
