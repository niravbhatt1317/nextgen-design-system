/* Parity twins: the library's Upload beside the console's one library Upload - an organisation's Branding tab
 * (features/organizations/BrandingTab.jsx: AssetSlot's empty state is <Upload kind="image">). The seed marks both
 * workspace slots as set, so the page shows the SET tile; the slot's Clear button (in-memory only) empties the Logo
 * slot and the dropzone appears. Reached from the org detail page through the Branding tab. */
const PROPS = [
  'backgroundColor', 'color', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius',
  'paddingTop', 'paddingLeft', 'fontSize', 'fontWeight',
];
const BOX = '[data-slot="upload-box"]';
const openBranding = async (page) => {
  /* the organisation page's band is the library Tabs since 2026-09-26 (PageScaffold TabBand): [role=tab], not .kit-tab */
  await page.locator('[role="tablist"] [role="tab"]', { hasText: /branding/i }).first().click();
  await page.waitForTimeout(600);
  await page.getByRole('button', { name: /^clear$/i }).first().click();
  await page.waitForSelector(BOX, { timeout: 8000 });
  await page.waitForTimeout(400);
};

module.exports = {
  component: 'Upload',
  frames: [
    {
      name: 'the image dropzone at rest (dashed edge one step darker than the card, the page ground)',
      props: [...PROPS, 'borderTopStyle'],
      story: { id: 'components-upload--picks-its-own-image', select: BOX },
      console: { path: '/organizations/org_msp', open: openBranding, select: BOX },
      mock: null,
    },
    {
      name: 'the resting words inside the dropzone',
      props: PROPS,
      story: { id: 'components-upload--picks-its-own-image', select: `${BOX} > span` },
      console: { path: '/organizations/org_msp', open: openBranding, select: `${BOX} > span` },
      mock: null,
    },
  ],
};
