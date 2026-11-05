/* Parity twins: the library's Upload beside the console's library Upload at rest - Users › Invite users › Import users
 * (features/users/CsvImport.jsx: <Upload kind="file"> imported from the package). Repaired 2026-11-05.
 *
 * Until then this twin read the dropzone from an organisation's Branding tab. That route is gone: Branding was redesigned
 * into features/organizations/BrandingStudio.jsx, whose logo and favicon close-up cards (.bs-zc__act) and .bs-drop are that
 * page's own drawing, not this part. There is no Clear button and no [data-slot="upload-box"] on the tab any more, and the
 * comment in BrandingTab.jsx that still names <Upload kind="image"> is out of date.
 *
 * The story is Resting, not Picks its own image: no console screen passes kind="image" today. `kind` only decides what
 * replaces the box once a file is chosen, so the box measured here is the same in both.
 * The console's other library Uploads: credential-profiles/dialogs.jsx, credential-profiles/storeDialogs.jsx,
 * esm/ServicePoliciesPage.jsx.
 *
 * The tile in the box is not read here: it is the library's IconTile in slate, and IconTile's twin owns it. */
const PROPS = [
  'backgroundColor', 'color', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius',
  'paddingTop', 'paddingLeft', 'fontSize', 'fontWeight',
];
const BOX = '[data-slot="upload-box"]';
const SENTENCE = `${BOX} > span > span:nth-child(2)`;
const SECOND_LINE = `${BOX} > span > span:nth-child(3)`;
const STORY = 'new-components-upload--resting';
const openImportUsers = async (page) => {
  await page.getByRole('button', { name: /invite users/i }).first().click();
  await page.waitForSelector('[role=dialog]', { timeout: 10000 });
  await page.locator('[role=dialog]').getByText('Import users', { exact: true }).first().click();
  await page.waitForSelector(BOX, { timeout: 10000 });
  await page.waitForTimeout(400);
};

module.exports = {
  component: 'Upload',
  frames: [
    {
      name: 'the dropzone at rest (dashed edge one step darker than the card, the page ground)',
      props: [...PROPS, 'borderTopStyle'],
      story: { id: STORY, select: BOX },
      console: { path: '/users', open: openImportUsers, select: BOX },
      mock: null,
    },
    {
      /* the column that holds the tile and the words: what it reads is inherited, so the words have frames of their own */
      name: 'the resting layer around the words',
      props: PROPS,
      story: { id: STORY, select: `${BOX} > span` },
      console: { path: '/users', open: openImportUsers, select: `${BOX} > span` },
      mock: null,
    },
    {
      name: 'the sentence inside the dropzone',
      props: PROPS,
      story: { id: STORY, select: SENTENCE },
      console: { path: '/users', open: openImportUsers, select: SENTENCE },
      mock: null,
    },
    {
      name: 'the second line inside the dropzone',
      props: [...PROPS, 'opacity'],
      story: { id: STORY, select: SECOND_LINE },
      console: { path: '/users', open: openImportUsers, select: SECOND_LINE },
      mock: null,
    },
  ],
};
