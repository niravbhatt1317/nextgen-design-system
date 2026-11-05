/* Parity twins: the library's SecretDots beside the masked secret the console draws in the place the part is for - a
 * stored secret, read-only, in a labelled row on a detail panel. The console's frame is the API token on the SCIM card:
 * My Organization -> Settings -> SCIM provisioning (iei/ScimSection.jsx ValueRow masked, settings.css
 * .sc-grow__v[data-masked]). The story's In context is the same arrangement: a label, then the dots.
 *
 * WHY NOT THE LIBRARY PART ITSELF. No console screen draws it: inside the library it renders only under CodeWell's
 * maskable and CopyField's masked, and no console call sets maskable or uses CopyField. The console's own SecretDots atom
 * (credential-profiles/atoms.jsx) has no caller left, since the Secret row left the credential drawer (2026-10-09).
 *
 * LOOKED AT AND LEFT OUT, because each is a form field or a partial value, not a line of dots: StoredSecret (the
 * credential and secret-store edit forms, a read-only Input), .sso-masked and the email credential box (boxes beside
 * Replace), the LDAP bind password (a disabled Input), and the fleets' enrollment keys (eak_9f2c…41ab shows part of the
 * value, so it is a different thing).
 *
 * NOT MEASURED, because the runner reads styles and not text: the count of dots. The part always draws 8, this row 24. */
const DOTS = 'code.sc-grow__v[data-masked]';
const waitForCard = async (page) => {
  await page.waitForSelector(DOTS, { timeout: 15000 });
};

module.exports = {
  component: 'SecretDots',
  frames: [
    {
      name: 'the dots · a stored secret in a labelled row',
      props: ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color'],
      story: { id: 'new-components-secretdots--in-context', select: '[data-testid="secret-dots-bullets"]' },
      console: { path: '/organizations/org_msp?tab=settings&section=scim', open: waitForCard, select: DOTS },
      mock: null,
    },
  ],
};
