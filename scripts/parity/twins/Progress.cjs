/* Parity twins: the library's Progress beside the library's Progress as the console draws it, measured 2026-11-05.
 *   · the licence bar in the organization header (features/organizations/OrgHeader.jsx, "License utilization"): sm, its
 *     tone from the seats used - org_001 is 89% = warning, org_003 is 73% = success (the seed is a hash of the name, so
 *     these hold);
 *   · the Coverage column on Discovery runs (features/discovery-profiles/atoms.jsx Bar): sm, the default tone.
 * No story draws sm and a tone together: Sizes is the default tone, Tones is md. So those frames read the Default story
 * with its Controls set through the URL (args=size:sm;tone:warning;value:89), the same bar the console asks for.
 * The bar's width belongs to where it sits (the header pins it to 56, the Coverage column to 48, a story fills its
 * column), so it is not compared as such: the "reaches its value" frame gives the story's bar the header's 56 first, and
 * then the fill has to come out the same.
 * NOT MEASURED: the danger tone (every seeded organization has more seats than members, and no danger bar was found on
 * the organization, discovery or new fleet pages); the md and lg sizes (the Coverage column and the run drawer's bars are
 * sm; the one md found is the Collector drawer's verification countdown, shown only during a verification); the baseline
 * and floor markers and the lines of words (only the console's CompatGallery test page draws them); ProgressBreakdown
 * (the console never draws it).
 * Two colours pass as "palette", same token on both sides but a different value: --mdt-muted (the track) and --mdt-warning. */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const BAR_PROPS = ['display', 'position', 'rectHeight'];
const TRACK_PROPS = ['height', 'backgroundColor', 'borderTopLeftRadius', 'overflowX', 'overflowY'];
const FILL_PROPS = ['height', 'backgroundColor', 'borderTopLeftRadius', 'transitionProperty', 'transitionDuration'];

const FILL = '[data-testid="progress-fill"]';
const STORY_SMALL = '[role="progressbar"][aria-label="Small"]';
const STORY_BAR = '[role="progressbar"]';
const LICENCE = '[role="progressbar"][aria-label^="License utilization"]';
const COVERAGE = '[role="progressbar"][aria-label="Coverage"]';

const SIZES = 'new-components-progress--sizes';
const sized = (tone, value) => `new-components-progress--default&args=size:sm;tone:${tone};value:${value}`;

/* the console's own rule for this bar: .org-facts__bar { width: 56px !important } (orgHeader.css) */
const onTheHeadersWidth = async (page) => {
  await page.locator(STORY_BAR).first().evaluate((el) => { el.style.width = '56px'; });
  await wait(300); /* the fill's own transition */
};

module.exports = {
  component: 'Progress',
  frames: [
    {
      name: 'the bar (the box markers sit in)',
      props: BAR_PROPS,
      story: { id: SIZES, select: STORY_SMALL },
      console: { path: '/organizations/org_001', select: LICENCE },
      mock: null,
    },
    {
      name: 'track · sm, 4 tall, muted, round',
      props: TRACK_PROPS,
      story: { id: SIZES, select: `${STORY_SMALL} > div` },
      console: { path: '/organizations/org_001', select: `${LICENCE} > div` },
      mock: null,
    },
    {
      name: 'fill · warning (licence 89%)',
      props: FILL_PROPS,
      story: { id: sized('warning', 89), select: `${STORY_BAR} ${FILL}` },
      console: { path: '/organizations/org_001', select: `${LICENCE} ${FILL}` },
      mock: null,
    },
    {
      name: 'fill · success (licence 73%)',
      props: FILL_PROPS,
      story: { id: sized('success', 73), select: `${STORY_BAR} ${FILL}` },
      console: { path: '/organizations/org_003', select: `${LICENCE} ${FILL}` },
      mock: null,
    },
    {
      name: 'fill · default (Discovery runs Coverage)',
      props: FILL_PROPS,
      story: { id: SIZES, select: `${STORY_SMALL} ${FILL}` },
      console: { path: '/discovery-runs', select: `${COVERAGE} ${FILL}` },
      mock: null,
    },
    {
      name: 'the fill reaches its value (89% of a 56 bar)',
      props: ['width'],
      story: { id: sized('warning', 89), open: onTheHeadersWidth, select: `${STORY_BAR} ${FILL}` },
      console: { path: '/organizations/org_001', select: `${LICENCE} ${FILL}` },
      mock: null,
    },
  ],
};
