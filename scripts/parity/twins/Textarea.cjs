/* Parity twins: where the same frame lives in the story, the console and the mock. */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const M = (n) => `.matrix > div:nth-child(${n}) > .fld`; // the text-area row of the inputs mock: cells 37..42
const BOX = ['minHeight', 'paddingTop', 'paddingLeft', 'paddingRight', 'borderTopWidth', 'borderTopColor', 'borderRadius', 'backgroundColor', 'color', 'fontSize', 'fontWeight', 'boxShadow', 'cursor', 'opacity'];
const openCreateTeam = async (page) => {
  await page.getByRole('button', { name: /create team/i }).first().click();
  await page.waitForSelector('[role=dialog] textarea', { timeout: 10000 });
  await wait(300);
};
const consoleArea = '[role=dialog] textarea';
const S = (label) => ({ id: 'new-components-textarea--the-field', select: `textarea[aria-label="${label}"]` });

module.exports = {
  component: 'Textarea',
  frames: [
    /* the console's textarea is the library's (rows=4, so 96 high); the mock draws 80 with 7 x 12 - the console wins on padding, minHeight is read on the story and the mock only */
    { name: 'sm · rest', props: BOX, story: S('Default'), console: { path: '/teams', open: openCreateTeam, select: consoleArea }, mock: { file: 'mocks/foundation/inputs.html', select: M(37) } },
    { name: 'sm · hover', props: BOX, state: 'hover', story: S('Hover'), console: { path: '/teams', open: openCreateTeam, select: consoleArea }, mock: { file: 'mocks/foundation/inputs.html', select: M(38) } },
    { name: 'sm · focus', props: BOX, state: 'focus', story: S('Focused'), console: { path: '/teams', open: openCreateTeam, select: consoleArea }, mock: { file: 'mocks/foundation/inputs.html', select: M(39) } },
    { name: 'sm · filled', props: BOX, story: S('Filled'), console: null, mock: { file: 'mocks/foundation/inputs.html', select: M(40) } },
    { name: 'sm · disabled', props: BOX, story: S('Disabled'), console: null, mock: { file: 'mocks/foundation/inputs.html', select: M(41) } },
    { name: 'sm · held (the lock, 9 down at the top right)', props: ['width', 'height', 'color'], story: { id: 'new-components-textarea--the-field', select: 'textarea[aria-label="Held"] + div > svg' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: `${M(41)} .lock svg` } },
    { name: 'sm · error', props: BOX, story: S('Error'), console: null, mock: { file: 'mocks/foundation/inputs.html', select: M(42) } },
    { name: 'error message', props: ['fontSize', 'color', 'gap'], story: { id: 'new-components-textarea--the-field', select: 'p[role=alert]' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: '.matrix > div:nth-child(42) .err' } },
    { name: 'label and the asterisk', props: ['fontSize', 'fontWeight', 'color'], story: { id: 'new-components-textarea--with-label', select: 'label[for]' }, console: { path: '/teams', open: openCreateTeam, select: '[role=dialog] label:has(+ div textarea), [role=dialog] div:has(> textarea) > label, [role=dialog] label' }, mock: { file: 'mocks/foundation/inputs.html', select: '.matrix > div:nth-child(37) > .lbl' } },
  ],
};
