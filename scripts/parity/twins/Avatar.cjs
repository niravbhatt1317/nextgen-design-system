/* Parity twins: where the same frame lives in the story, the console and the mock. */
const D = '[role="dialog"]';
const PROPS = [
  'width', 'height', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'borderTopWidth', 'borderTopStyle', 'borderTopColor',
  'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius',
  'backgroundColor', 'color', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'textTransform',
  'boxShadow', 'opacity', 'outlineStyle',
];
/* the tone alone - everything the size does not set */
const TONE_PROPS = PROPS.filter((p) => !['width', 'height', 'fontSize', 'lineHeight'].includes(p));
/* the Users drawer: click the first row's name cell */
const openUsersDrawer = async (page) => {
  await page.locator('tbody tr').first().locator('td').nth(1).click();
  await page.waitForSelector(D, { timeout: 8000 });
  await page.waitForTimeout(600);
};

/* THE STORY SELECTORS READ THE PART'S OWN HOOKS (2026-09-26): the size class (mdt-h-6 · h-8 · h-10 · h-14 for
 * 24 · 32 · 40 · 56), the tone class (mdt-bg-blue-10, mdt-bg-green-10 ...) and the shape class (mdt-rounded-full, the
 * written pixel mdt-rounded-[6px], mdt-rounded-xl at 56). The stories were reworked and PERSON_TONES reordered, so a
 * positional :nth-child picked the wrong avatar - the Tones story's explicit row is lg (40), not md.
 *
 * NO STORY RENDERS A GREEN LETTER AVATAR AT MD: the Tones row is lg, and of the six PEOPLE Sarah Johnson and Tom
 * Green hash to blue, Ravi Patel / Mei Chen / Ana Silva to purple, Ken Watts to rose. Michael Smith's row (green, 32)
 * is therefore measured for its TONE against the Tones story's green at lg - the four size-set properties left out -
 * rather than bending a selector onto a 40 and reading it as a 32. */
const MOCK = 'mocks/foundation/avatar.html';

module.exports = {
  component: 'Avatar',
  frames: [
    {
      name: 'md · one letter · blue (Sarah Johnson, the Users row)',
      props: PROPS,
      story: { id: 'new-components-avatar--default', select: '[role="img"].mdt-h-8.mdt-rounded-full.mdt-bg-blue-10' },
      console: { path: '/users', select: 'tbody tr:nth-child(1) [role="img"]' },
      mock: { file: MOCK, select: '.av.circle.s32.blue' },
    },
    {
      name: 'green tone (Michael Smith, the second Users row; the story has green at lg only - size left out)',
      props: TONE_PROPS,
      story: { id: 'new-components-avatar--tones', select: '[role="img"].mdt-rounded-full.mdt-bg-green-10' },
      console: { path: '/users', select: 'tbody tr:nth-child(2) [role="img"]' },
      mock: { file: MOCK, select: '.av.circle.s32.green' },
    },
    {
      name: 'xl · one letter · the drawer head (56)',
      props: PROPS,
      story: { id: 'new-components-avatar--sizes', select: '[role="img"].mdt-h-14.mdt-rounded-full' },
      console: { path: '/users', open: openUsersDrawer, select: `${D} [role="img"]` },
      mock: null,
    },
    {
      name: 'md · icon · the rounded square (32, corners 6)',
      props: [...PROPS, 'glyphW', 'glyphH', 'glyphColor'],
      story: { id: 'new-components-avatar--with-icon', select: '[role="img"].mdt-h-8[class~="mdt-rounded-[6px]"]:has(svg)' },
      console: null,
      mock: { file: MOCK, select: '.av.rounded.s32.blue.icon' },
    },
    {
      name: 'xl · icon · the identity mark (56, corners 12)',
      props: [...PROPS, 'glyphW', 'glyphH', 'glyphColor'],
      story: { id: 'new-components-avatar--with-icon', select: '[role="img"].mdt-h-14.mdt-rounded-xl:has(svg)' },
      console: null,
      mock: { file: MOCK, select: '.av.rounded.s56.blue.icon' },
    },
    {
      name: 'sm · ring · in a stack (24)',
      props: PROPS,
      story: { id: 'new-components-avatar--stack', select: '[role="img"].mdt-h-6.mdt-ring-2.mdt-bg-blue-10' },
      console: null,
      mock: { file: MOCK, select: '.av.circle.s24.ring.blue' },
    },
    {
      /* the story draws its photos at lg (40); the mock's 40 photo circle is in "Photo, letters, and no name" */
      name: 'photo · fills the circle (40)',
      props: ['width', 'height', 'borderTopLeftRadius', 'backgroundColor', 'boxShadow', 'opacity'],
      story: { id: 'new-components-avatar--with-photo', select: '[role="img"].mdt-h-10.mdt-rounded-full:has(img)' },
      console: null /* no photo avatar on the console yet */,
      mock: { file: MOCK, select: '.av.circle.s40:has(use)' },
    },
  ],
};
