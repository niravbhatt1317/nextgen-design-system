/* Parity twins: the library's Stepper beside the console's, measured 2026-11-05. The console draws its own copy of this
 * design (src/ui/Stepper.jsx + stepper.css, "until the library ships it"), which is the same part with the same data-slot
 * names, so the same selectors read both sides. One real flow per layout the console uses:
 *   · vertical  - /organizations/new, the Create organization rail: the very flow the Vertical story is written from, the
 *                 same seven steps. Essentials filled and Next pressed gives a done step, the current one and steps ahead.
 *   · underline - Agent Fleet → Northwind Retail → Enroll agents, the band of the drawer. Linux base image + Next.
 *   · inline    - /roles/new, the Role builder's band. Role name + description + Next.
 * Nothing is saved by any of these: the flows stop on their second step and the page is reloaded for the next frame.
 *
 * WHICH STORIES. The console's steps are buttons once you can go back to them, so the across layouts read the clickable
 * strips of "Clickable or not, the same box". The Vertical story opens on current 2, reached 3, which is the revisit
 * state (the current step wears a tick inside a ring): the plain current step is reached by clicking its step 4, as a
 * person would, and the revisit state has its own frames against the console after going back to Essentials.
 * NOT MEASURED: the stacked layout. The only console code that draws it is StepList in features/collector-fleet/shell.jsx,
 * on the old /fleet screens the checks leave out.
 *
 * WHAT IT SHOWS, 2026-11-05, left showing for the owner's ruling (18 differences, four causes):
 *   · 15 × the rounding: the library's mdt-rounded-full reads 9999px, the console copy's CSS 999px. Both draw a full circle.
 *   · the rail's tick: stroke 2.5 in the library, 1.75 in the console copy, which passes no stroke. A visible difference.
 *   · the hover halo: the library's value carries one more shadow, 0 wide, which draws nothing.
 *   · the chevron: the same token at 60% on both sides, --mdt-muted-foreground, whose value the two palettes disagree on.
 *     The palette matching does not recognise a colour with opacity, so it counts as a difference.
 * The console's real library Stepper (2.2.0, /discovery-profiles/new) already reads 9999px and stroke 2.5, so the rounding and
 * the tick come from the console's copy, not from the library's version.
 * WHAT IT CANNOT SEE: the library's rail, underline and inline marks have a 1.5px edge, the console copy's 1px. This browser
 * rounds 1.5px down to 1px, so the frames read 1px on both sides although the two sources differ. */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const DISC_PROPS = [
  'display', 'alignItems', 'justifyContent', 'width', 'height', 'borderTopWidth', 'borderTopStyle', 'borderTopColor',
  'borderTopLeftRadius', 'backgroundColor', 'color', 'fontSize', 'fontWeight', 'lineHeight', 'fontVariantNumeric', 'boxShadow',
];
const LABEL_PROPS = [
  'fontSize', 'fontWeight', 'lineHeight', 'color', 'whiteSpace', 'textDecorationLine', 'textDecorationStyle',
  'textDecorationColor', 'textDecorationThickness', 'textUnderlineOffset',
];
const LABEL_CLIP_PROPS = [...LABEL_PROPS, 'overflowX', 'textOverflow', 'paddingBottom', 'marginBottom'];
const GLYPH_PROPS = ['width', 'height', 'color', 'strokeWidth'];
const RAIL_LINE_PROPS = ['position', 'top', 'bottom', 'left', 'width', 'borderTopLeftRadius', 'backgroundColor'];
const BAR_PROPS = ['height', 'borderTopLeftRadius', 'backgroundColor'];
const DESC_PROPS = ['fontSize', 'fontWeight', 'lineHeight', 'color', 'whiteSpace', 'overflowX', 'textOverflow'];

const step = (state) => `[data-slot="stepper-step"][data-state="${state}"]`;
const disc = (state) => `${step(state)} [data-slot="stepper-disc"]`;
const label = (state) => `${step(state)} [data-slot="stepper-label"]`;
const line = (state) => `${step(state)} [data-slot="stepper-connector"]`;
const bar = (state) => `${step(state)} [data-slot="stepper-bar"]`;
const desc = (state) => `${step(state)} [data-slot="stepper-description"]`;
const trigger = `${step('complete')} [data-slot="stepper-trigger"]`;

const rest = async (page) => { await page.mouse.move(0, 0); await wait(300); };

/* ── vertical · Create organization ────────────────────────────────────────────────────────────── */
const essentialsDone = async (page) => {
  await page.waitForSelector('[data-slot="stepper"][data-layout="vertical"]', { timeout: 20000 });
  await page.getByPlaceholder('e.g. Acme Healthcare').fill('Parity Check Org');
  await page.getByPlaceholder('contact@company.com').fill('parity@example.com');
  await page.getByRole('button', { name: /^next$/i }).first().click();
  await page.waitForSelector(step('complete'), { timeout: 8000 });
  await rest(page);
};
/* got to Security policy, then back to Essentials: the revisit state, as the story opens */
const backToEssentials = async (page) => {
  await essentialsDone(page);
  await page.getByRole('button', { name: /^skip & next$/i }).first().click();
  await wait(400);
  await page.locator(trigger).first().click();
  await page.waitForSelector('[data-slot="stepper-disc"][data-here]', { timeout: 8000 });
  await rest(page);
};
/* the story's rail opens on the revisit state; its "where you left off" step takes it to a plain current step */
const onPlainCurrent = async (page) => {
  await page.locator(`${step('reached')} [data-slot="stepper-trigger"]`).first().click();
  await rest(page);
};

const RAIL_STORY = 'new-components-stepper--vertical';
const RAIL_PAGE = '/organizations/new';
const rail = (name, props, select, extra = {}) => ({
  name: `vertical · ${name}`,
  props,
  story: { id: RAIL_STORY, open: onPlainCurrent, select },
  console: { path: RAIL_PAGE, open: essentialsDone, select },
  mock: null,
  ...extra,
});
const revisit = (name, props, select) => ({
  name: `vertical · back · ${name}`,
  props,
  story: { id: RAIL_STORY, select },
  console: { path: RAIL_PAGE, open: backToEssentials, select },
  mock: null,
});

/* ── underline · Enroll agents ─────────────────────────────────────────────────────────────────── */
const enrollSecondStep = async (page) => {
  await wait(1500);
  const crumb = page.locator('.fsc-crumb').first();
  if (await crumb.count()) {
    await crumb.click(); await wait(300);
    await page.locator('.fsc-row', { hasText: 'Northwind Retail' }).first().click(); await wait(1000);
  }
  await page.getByRole('button', { name: /^Enroll agents$/ }).first().click();
  await page.waitForSelector('[data-slot="stepper"][data-layout="underline"]', { timeout: 20000 });
  await page.getByText('Linux base image').first().click();
  await page.getByRole('button', { name: /^Next$/ }).first().click();
  await page.waitForSelector(step('complete'), { timeout: 8000 });
  await rest(page);
};
const STRIPS = 'new-components-stepper--clickable-or-not';
const UNDERLINE = '[data-slot="stepper"][data-layout="underline"]';
const across = (name, props, select) => ({
  name: `underline · ${name}`,
  props,
  story: { id: STRIPS, select: `[data-testid="clickable-underline"] ${select}` },
  console: { path: '/agent-fleet', open: enrollSecondStep, select: `${UNDERLINE} ${select}` },
  mock: null,
});

/* ── inline · Role builder ─────────────────────────────────────────────────────────────────────── */
const INLINE = '[data-slot="stepper"][data-layout="inline"]';
const roleBand = async (page) => {
  await page.waitForSelector(INLINE, { timeout: 20000 });
  await rest(page);
};
const roleSecondStep = async (page) => {
  await page.waitForSelector(INLINE, { timeout: 20000 });
  await page.getByPlaceholder('Enter role name').fill('Parity check role');
  await page.getByPlaceholder('Add a description about this role').fill('Measured, never saved');
  await page.getByRole('button', { name: /^Next$/ }).first().click();
  await page.waitForSelector(step('complete'), { timeout: 8000 });
  await rest(page);
};
const inline = (name, props, select, open = roleSecondStep) => ({
  name: `inline · ${name}`,
  props,
  story: { id: STRIPS, select: `[data-testid="clickable-inline"] ${select}` },
  console: { path: '/roles/new', open, select: `${INLINE} ${select}` },
  mock: null,
});

module.exports = {
  component: 'Stepper',
  frames: [
    /* the rail: the mark, the name, the line, in each state */
    rail('mark · current', DISC_PROPS, disc('current')),
    rail('mark · done', DISC_PROPS, disc('complete')),
    rail('mark · ahead', DISC_PROPS, disc('upcoming')),
    rail('the tick on a done mark', GLYPH_PROPS, `${disc('complete')} svg`),
    rail('name · current', LABEL_PROPS, label('current')),
    rail('name · done', LABEL_PROPS, label('complete')),
    rail('name · ahead', LABEL_PROPS, label('upcoming')),
    rail('line · filled, under a done step', RAIL_LINE_PROPS, line('complete')),
    rail('line · empty, under a step ahead', RAIL_LINE_PROPS, line('upcoming')),
    rail('second line · done', DESC_PROPS, desc('complete')),
    rail('the step: 20 down to the next', ['position', 'paddingBottom'], step('complete')),
    rail('the row: mark 12 from its words', ['display', 'alignItems', 'columnGap', 'textAlign', 'cursor'], trigger),
    rail('the words beside the mark', ['display', 'flexDirection', 'rowGap', 'paddingTop'], `${disc('complete')} + span`),
    rail('hover · halo on the mark', ['boxShadow'], disc('complete'), { state: 'hover' }),
    rail('hover · dashed line under the name', ['textDecorationColor'], label('complete'), { state: 'hover' }),

    /* the rail after going back: the tick inside its ring, and where you left off */
    revisit('mark · you are here', DISC_PROPS, '[data-slot="stepper-disc"][data-here]'),
    revisit('name · you are here', LABEL_PROPS, label('current')),
    revisit('mark · where you left off', DISC_PROPS, disc('reached')),
    revisit('name · where you left off', LABEL_PROPS, label('reached')),

    /* the band across a drawer */
    across('mark · current', DISC_PROPS, disc('current')),
    across('mark · done', DISC_PROPS, disc('complete')),
    across('mark · ahead', DISC_PROPS, disc('upcoming')),
    across('the tick on a done mark', GLYPH_PROPS, `${disc('complete')} svg`),
    across('name · current', LABEL_CLIP_PROPS, label('current')),
    across('name · done', LABEL_CLIP_PROPS, label('complete')),
    across('name · ahead', LABEL_CLIP_PROPS, label('upcoming')),
    across('bar · filled', BAR_PROPS, bar('current')),
    across('bar · empty', BAR_PROPS, bar('upcoming')),
    across('the step: bar 8 under its row', ['display', 'flexDirection', 'rowGap', 'minWidth'], step('complete')),
    {
      name: 'underline · the strip: 12 between steps',
      props: ['display', 'alignItems', 'columnGap'],
      story: { id: STRIPS, select: '[data-testid="clickable-underline"] [data-slot="stepper"]' },
      console: { path: '/agent-fleet', open: enrollSecondStep, select: UNDERLINE },
      mock: null,
    },

    /* the band above a page */
    inline('mark · current', DISC_PROPS, disc('current')),
    inline('mark · done', DISC_PROPS, disc('complete')),
    inline('mark · ahead', DISC_PROPS, disc('upcoming'), roleBand),
    inline('name · current', LABEL_PROPS, label('current')),
    inline('name · done', LABEL_PROPS, label('complete')),
    inline('name · ahead', LABEL_PROPS, label('upcoming'), roleBand),
    {
      /* the connector here is a chevron: the library's Icon carries the data-slot itself, the console's a span around it */
      name: 'inline · the chevron between steps',
      props: GLYPH_PROPS,
      story: { id: STRIPS, select: '[data-testid="clickable-inline"] svg[data-slot="stepper-connector"]' },
      console: { path: '/roles/new', open: roleSecondStep, select: `${INLINE} [data-slot="stepper-connector"] svg` },
      mock: null,
    },
    {
      name: 'inline · the strip: 12 across, 8 down',
      props: ['display', 'flexWrap', 'alignItems', 'columnGap', 'rowGap'],
      story: { id: STRIPS, select: '[data-testid="clickable-inline"] [data-slot="stepper"]' },
      console: { path: '/roles/new', open: roleSecondStep, select: INLINE },
      mock: null,
    },
  ],
};
