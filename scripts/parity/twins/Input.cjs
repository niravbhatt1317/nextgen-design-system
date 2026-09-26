/* Parity twins: where the same frame lives in the story, the console and the mock. */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const M = (n) => `.matrix > div:nth-child(${n}) > .fld`; // the text row of the inputs mock: cells 9..14, the search row 16..20
const FIELD = ['height', 'paddingLeft', 'paddingRight', 'borderTopWidth', 'borderTopColor', 'borderRadius', 'backgroundColor', 'color', 'fontSize', 'fontWeight', 'boxShadow', 'cursor', 'opacity'];
const openCreateTeam = async (page) => {
  await page.getByRole('button', { name: /create team/i }).first().click();
  await page.waitForSelector('[role=dialog] input', { timeout: 10000 });
  await wait(300);
};
const teamName = '[role=dialog] input[placeholder="Enter team name"]';

module.exports = {
  component: 'Input',
  frames: [
    { name: 'sm · rest', props: FIELD, story: { id: 'new-components-input--the-field', select: 'input[aria-label="Default"]' }, console: { path: '/teams', open: openCreateTeam, select: teamName }, mock: { file: 'mocks/foundation/inputs.html', select: M(9) } },
    { name: 'sm · hover', props: FIELD, state: 'hover', story: { id: 'new-components-input--the-field', select: 'input[aria-label="Hover"]' }, console: { path: '/teams', open: openCreateTeam, select: teamName }, mock: { file: 'mocks/foundation/inputs.html', select: M(10) } },
    { name: 'sm · focus', props: FIELD, state: 'focus', story: { id: 'new-components-input--the-field', select: 'input[aria-label="Focused"]' }, console: { path: '/teams', open: openCreateTeam, select: teamName }, mock: { file: 'mocks/foundation/inputs.html', select: M(11) } },
    { name: 'sm · filled', props: FIELD, story: { id: 'new-components-input--the-field', select: 'input[aria-label="Filled"]' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: M(12) } },
    { name: 'sm · disabled', props: FIELD, story: { id: 'new-components-input--the-field', select: 'input[aria-label="Disabled"]' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: M(13) } },
    { name: 'sm · held (the lock)', props: ['width', 'height', 'color'], story: { id: 'new-components-input--the-field', select: 'input[aria-label="Held"] + div > svg' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: `${M(13)} .lock svg` } },
    { name: 'sm · error', props: FIELD, story: { id: 'new-components-input--the-field', select: 'input[aria-label="Error"]' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: M(14) } },
    /* no 'error · focus' frame (2026-09-26): the mock draws error at rest only (cell 14; it has no .fld.error.focus rule anywhere),
     * so a focused story field against it read the red halo as a difference by construction - a comparison with no twin, not
     * a reading. The mock's one disabled cell (13) is disabled AND locked (34 right for the lock) where the story splits Disabled
     * from Held (locked + read-only): the 'sm · disabled' padding it reads is that split, left for his ruling, not a twin fault. */
    { name: 'error message (12, the alert mark)', props: ['fontSize', 'color', 'gap'], story: { id: 'new-components-input--the-field', select: 'p[role=alert]' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: '.matrix > div:nth-child(14) .err' } },
    { name: 'search glyph (14, faint, 12 in)', props: ['width', 'height', 'color'], story: { id: 'new-components-input--adornments', select: 'input[placeholder="Search grants"] ~ div svg, div:has(> input[placeholder="Search grants"]) > div > svg' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: `${M(16)} .ic svg` } },
    { name: 'search · text starts at 32', props: ['paddingLeft'], story: { id: 'new-components-input--adornments', select: 'input[placeholder="Search grants"]' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: M(16) } },
    { name: 'label (13 neutral-90) and the asterisk 3 after it', props: ['fontSize', 'fontWeight', 'color'], story: { id: 'new-components-input--with-label', select: 'label[for]' }, console: { path: '/teams', open: openCreateTeam, select: '[role=dialog] label' }, mock: { file: 'mocks/foundation/inputs.html', select: '.matrix > div:nth-child(9) > .lbl' } },
    { name: 'asterisk', props: ['color', 'marginLeft'], story: { id: 'new-components-input--with-label', select: 'label[for] > span' }, console: { path: '/teams', open: openCreateTeam, select: '[role=dialog] label > span' }, mock: null },
  ],
};
