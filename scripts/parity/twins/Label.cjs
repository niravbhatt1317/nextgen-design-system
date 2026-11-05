/* Parity twins: the library's Label, measured 2026-11-05. This part is the UPPERCASE MICRO-HEADING that names a group of
 * fields, a section or a column (12/600, tracked 0.05em, the muted ink) - its own docs and story say so. The console draws
 * it for real: every <Label> in its 23 files is ui/kit.js -> compat/afm/kit.jsx -> the library's Label at size sm. Two
 * current pages show it, each doing the job the story shows:
 *   · Create profile on /credential-profiles, the protocol step: WMI, SSH, PowerShell... each names a group of type cards
 *     (features/credential-profiles/dialogs.jsx, SectionLabel -> kit Label);
 *   · /authentication: "What each OneOps value is called in..." names the table under it (features/iei/ProviderCatalog.jsx).
 * The form field label is deliberately NOT a frame. Users' Invite via email draws a <label> at 13/500 in sentence case:
 * that is another part (the Form twin's FormLabel), and measuring this one against it would only report that two different
 * parts differ. The console only ever asks for size sm, so the md step and the `as` elements have no console frame. */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const PROPS = ['display', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'textTransform', 'color'];
const LABEL = 'span.mdt-uppercase.mdt-tracking-wider';
const openProtocolStep = async (page) => {
  await page.getByRole('button', { name: /create profile/i }).first().click();
  await page.waitForSelector('[role="dialog"]', { timeout: 15000 }); await wait(500);
  await page.locator('[role="dialog"]').getByText(/create manually/i).first().click();
  await page.waitForSelector(`[role="dialog"] ${LABEL}`, { timeout: 15000 }); await wait(300);
};
const openAuthentication = async (page) => {
  await page.waitForSelector(LABEL, { timeout: 15000 });
};

module.exports = {
  component: 'Label',
  frames: [
    {
      name: 'naming a group (Create profile: WMI, SSH...)',
      props: PROPS,
      story: { id: 'new-components-label--in-context', select: `#storybook-root ${LABEL}` },
      console: { path: '/credential-profiles', open: openProtocolStep, select: `[role="dialog"] ${LABEL}` },
      mock: null,
    },
    {
      name: 'naming a table (Authentication: what each value is called)',
      props: PROPS,
      story: { id: 'new-components-label--default', select: `#storybook-root ${LABEL}` },
      console: { path: '/authentication', open: openAuthentication, select: LABEL },
      mock: null,
    },
  ],
};
