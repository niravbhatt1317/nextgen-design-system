/* Parity twins: the library's Kbd, measured 2026-11-05. The console does not draw this part anywhere. It shows shortcuts in
 * two ways of its own, and both are the job Kbd exists for, so both are frames and their differences stay on show:
 *   · the rail's "Search settings" field writes the words "⌘K" as bare text (layout/ShellNav.jsx span.snv-kbd, styled by the
 *     library's own LeftNav css): no cap, no fill, no corners. The Usage story's "In a search field" is the same place;
 *   · the internal team bar's version list draws the one real <kbd> on screen (internal/InternalBar.jsx, its local Kbd, ⇧G
 *     and ⇧H): one bordered cap holding two glyphs, which is the story's joined outline cap. Team only, never customer-visible.
 * Rendered width is not read: the words differ (⌘K against Ctrl, ⇧G against Ctrl + the enter glyph), so it says nothing.
 * The rail chip reads no border colour: neither side has a border, and a borderless element's colour is noise (see Form). */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const CAP = [
  'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'backgroundColor',
  'height', 'minWidth', 'paddingLeft', 'paddingRight', 'borderTopWidth', 'borderTopLeftRadius',
];
const openVersionList = async (page) => {
  await page.getByRole('button', { name: 'Open internal bar' }).click();
  await page.waitForSelector('button[aria-label="Switch version"]', { timeout: 10000 }); await wait(300);
  await page.getByRole('button', { name: 'Switch version' }).click();
  await page.waitForSelector('kbd', { timeout: 10000 }); await wait(300);
};

module.exports = {
  component: 'Kbd',
  frames: [
    {
      name: 'in a search field (the rail: ⌘K in Search settings)',
      props: CAP,
      story: { id: 'new-components-kbd--usage', select: '.mdt-relative:has(input[aria-label="Search"]) > kbd > span' },
      console: { path: '/users', select: '.snv-srch .snv-kbd' },
      mock: null,
    },
    {
      name: 'one bordered cap, two glyphs (internal bar: ⇧G)',
      props: [...CAP, 'borderTopColor'],
      story: { id: 'new-components-kbd--every', select: 'kbd.mdt-border' },
      console: { path: '/users', open: openVersionList, select: 'kbd' },
      mock: null,
    },
  ],
};
