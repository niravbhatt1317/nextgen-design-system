/* Parity twins: Slider, measured 2026-10-28. The console's part is organizations/settingsKit.jsx PolicySlider (with its
 * Ruler and settings.css .pc-range / .pc-tag / .pc-saved / .st-ruler) - NOT ui/RangeSlider.jsx, which no page renders.
 * Agent Fleet → Northwind Retail → Govern → Policies draws four of them as the Typeable story does: the explanation in
 * an ⓘ, no end names, a tag you can type into, each at its saved value. Moving one with the arrow key gives the
 * unsaved state (solid tag, the yellow mark, the reset chip), which the Changed story draws. The track's own paint
 * (pseudo-elements) cannot be read off computed style; the screenshots carry it. */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const openPolicies = async (page) => {
  await page.waitForSelector('text=Northwind Retail', { timeout: 20000 });
  await page.getByText('Northwind Retail', { exact: true }).first().click();
  await page.getByRole('tab', { name: /^Govern/ }).first().click();
  await page.getByText('Policies', { exact: true }).first().click();
  await page.waitForSelector('input.pc-range', { timeout: 15000 });
  await page.mouse.move(0, 0);
  await wait(400);
};
const openMoved = async (page) => {
  await openPolicies(page);
  await page.locator('input.pc-range').first().focus();
  await page.keyboard.press('ArrowRight');
  await page.mouse.move(0, 0);
  await wait(400);
};
const openTyping = async (page) => {
  await openPolicies(page);
  await page.locator('button.pc-tag').first().click();
  await page.waitForSelector('.pc-tag-edit input', { timeout: 5000 });
  await wait(200);
};

/* Client Organizations → Finserve Bank → Settings → Security policy: the same part with its hint written out, the two
 * limits named under the panel, and the second row divided from the first */
const openOrgPolicy = async (page) => {
  await page.getByRole('tab', { name: /^Settings/ }).first().click();
  await page.getByText('Security policy', { exact: true }).first().click();
  await page.waitForSelector('input.pc-range', { timeout: 15000 });
  await page.mouse.move(0, 0);
  await wait(400);
};
const ORG = (select) => ({ path: '/organizations/org_001', open: openOrgPolicy, select });
const ENDS = 'div[style*="justify-content: space-between"][style*="margin-top: 8px"]';

const NAME_ROW = 'div[style*="line-height: 1.4"]:has(> button.st-info)';

const TYPEABLE = 'new-components-slider--typeable';
const SAVED = 'new-components-slider--saved';
const IN_A_CARD = 'new-components-slider--in-a-card';
const CHANGED = 'new-components-slider--changed';
const TYPING = 'new-components-slider--typing';
const AF = (open, select) => ({ path: '/agent-fleet', open, select });
const TAG = [
  'height', 'paddingTop', 'paddingRight', 'borderTopLeftRadius', 'borderTopWidth', 'borderTopStyle', 'borderTopColor',
  'backgroundColor', 'color', 'fontSize', 'fontWeight', 'lineHeight', 'fontVariantNumeric', 'bottom', 'cursor', 'whiteSpace',
];

module.exports = {
  component: 'Slider',
  frames: [
    {
      name: 'name row (14/500 on 1.4, the ink, 4 apart)',
      props: ['fontSize', 'fontWeight', 'lineHeight', 'color', 'columnGap', 'alignItems', 'display'],
      story: { id: TYPEABLE, select: '[data-slot="slider"] > div:first-child > div:first-child' },
      /* the slider's own name row (the page heading above also holds an ⓘ) */
      console: AF(openPolicies, NAME_ROW),
      mock: null,
    },
    {
      /* the library InfoTip: pointer, because a press opens it (its own ruling, InfoTip.tsx); the console's SInfo
       * keeps the help cursor - reported, not changed here */
      name: 'the ⓘ beside the name',
      props: ['width', 'height', 'color', 'backgroundColor', 'borderTopLeftRadius', 'cursor'],
      story: { id: TYPEABLE, select: '[data-slot="slider"] button[aria-label^="About"]' },
      console: AF(openPolicies, `${NAME_ROW} > button.st-info`),
      mock: null,
    },
    {
      name: 'the panel (sunken, 8 corners, 10 / 16 in, 12 under the name)',
      props: ['marginTop', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'borderTopLeftRadius', 'backgroundColor', 'opacity'],
      story: { id: TYPEABLE, select: '[data-slot="slider-panel"]' },
      console: AF(openPolicies, 'div:has(> div > input.pc-range)'),
      mock: null,
    },
    {
      name: 'the value row (28)',
      props: ['height', 'position'],
      story: { id: TYPEABLE, select: '[data-slot="slider-panel"] > div:first-child' },
      console: AF(openPolicies, 'div:has(> button.pc-tag)'),
      mock: null,
    },
    {
      name: 'tag at the saved value (the quiet outline, typeable)',
      props: TAG,
      story: { id: TYPEABLE, select: 'button.mdt-slider__tag' },
      console: AF(openPolicies, 'button.pc-tag'),
      mock: null,
    },
    {
      name: 'tag · hover (the soft ring)',
      props: ['boxShadow', 'cursor'],
      state: 'hover',
      story: { id: TYPEABLE, select: 'button.mdt-slider__tag' },
      console: AF(openPolicies, 'button.pc-tag'),
      mock: null,
    },
    {
      name: 'tag number (the dotted underline)',
      props: ['textDecorationLine', 'textDecorationStyle', 'textUnderlineOffset'],
      story: { id: TYPEABLE, select: '.mdt-slider__tag-n' },
      console: AF(openPolicies, '.pc-tag__n'),
      mock: null,
    },
    {
      name: 'the track (20 tall, a hand)',
      props: ['height', 'display', 'cursor', 'marginTop', 'backgroundColor'],
      story: { id: TYPEABLE, select: 'input.mdt-slider__range' },
      console: AF(openPolicies, 'input.pc-range'),
      mock: null,
    },
    {
      name: 'the ruler (24, 4 under the track)',
      props: ['height', 'marginTop', 'position'],
      story: { id: TYPEABLE, select: '.mdt-slider__ruler' },
      console: AF(openPolicies, '.st-ruler'),
      mock: null,
    },
    {
      name: 'a minor tick (5, the ink at 16%)',
      props: ['width', 'height', 'top', 'marginLeft', 'backgroundColor'],
      story: { id: TYPEABLE, select: '.mdt-slider__tick:not([data-major])' },
      console: AF(openPolicies, '.st-ruler__tick:not(.is-major)'),
      mock: null,
    },
    {
      name: 'a major tick (8, the ink at 34%)',
      props: ['width', 'height', 'top', 'marginLeft', 'backgroundColor'],
      story: { id: TYPEABLE, select: '.mdt-slider__tick[data-major]' },
      console: AF(openPolicies, '.st-ruler__tick.is-major'),
      mock: null,
    },
    {
      name: 'a ruler number (11, muted)',
      props: ['fontSize', 'lineHeight', 'color', 'top', 'fontVariantNumeric', 'whiteSpace'],
      story: { id: TYPEABLE, select: '.mdt-slider__num' },
      console: AF(openPolicies, '.st-ruler__label'),
      mock: null,
    },
    {
      name: 'typing: the field in the tag',
      props: ['display', 'columnGap', 'borderTopColor', 'backgroundColor', 'color', 'boxShadow'],
      story: { id: TYPING, select: '.mdt-slider__tag--edit' },
      console: AF(openTyping, '.pc-tag-edit'),
      mock: null,
    },
    {
      name: 'typing: the number',
      props: ['fontSize', 'fontWeight', 'textAlign', 'color'],
      story: { id: TYPING, select: '.mdt-slider__tag-input' },
      console: AF(openTyping, '.pc-tag-edit input'),
      mock: null,
    },
    {
      name: 'typing: the unit after it',
      props: ['fontSize', 'fontWeight', 'color'],
      story: { id: TYPING, select: '.mdt-slider__tag-unit' },
      console: AF(openTyping, '.pc-tag-edit > span'),
      mock: null,
    },
    {
      name: 'moved: the tag in the solid ink',
      props: ['borderTopColor', 'backgroundColor', 'color'],
      story: { id: CHANGED, select: '.mdt-slider__tag' },
      console: AF(openMoved, 'button.pc-tag'),
      mock: null,
    },
    {
      name: 'moved: the reset chip (dashed, neutral)',
      props: [
        'height', 'top', 'paddingLeft', 'borderTopWidth', 'borderTopStyle', 'borderTopColor', 'borderTopLeftRadius',
        'backgroundColor', 'color', 'fontSize', 'fontWeight', 'lineHeight', 'cursor',
      ],
      story: { id: CHANGED, select: '.mdt-slider__saved' },
      console: AF(openMoved, '.pc-saved'),
      mock: null,
    },
    {
      name: 'moved: the yellow mark where the saved value sits',
      props: ['width', 'height', 'top', 'marginLeft', 'borderTopLeftRadius', 'backgroundColor'],
      story: { id: CHANGED, select: '.mdt-slider__saved-mark' },
      console: AF(openMoved, 'span[aria-hidden="true"][style*="badge-warning-dot"]'),
      mock: null,
    },
    {
      name: 'the hint under the name (12 on 1.5, neutral-60, 2 under)',
      props: ['fontSize', 'lineHeight', 'color', 'marginTop'],
      story: { id: SAVED, select: '[data-slot="slider"] > div:first-child > div:nth-child(2)' },
      console: ORG('div[style*="line-height: 1.5"][style*="margin-top: 2px"]'),
      mock: null,
    },
    {
      name: 'the limits under the panel (12, neutral-60, 8 under)',
      props: ['display', 'justifyContent', 'alignItems', 'columnGap', 'marginTop', 'fontSize', 'lineHeight', 'color', 'fontVariantNumeric'],
      story: { id: SAVED, select: '[data-slot="slider"] > div:last-child' },
      console: ORG(ENDS),
      mock: null,
    },
    {
      name: 'a limit value (500, neutral-90)',
      props: ['fontWeight', 'color'],
      story: { id: SAVED, select: '[data-slot="slider"] > div:last-child > span:first-child > span' },
      console: ORG(`${ENDS} > span:first-child > span`),
      mock: null,
    },
    {
      name: 'divided: the hairline above a second row, 20 either side',
      props: ['paddingTop', 'marginTop', 'borderTopWidth', 'borderTopStyle', 'borderTopColor'],
      story: { id: IN_A_CARD, select: '[data-slot="slider"] + [data-slot="slider"]' },
      console: ORG('div[style*="padding-top: 20px"]:has(input.pc-range)'),
      mock: null,
    },
  ],
};
