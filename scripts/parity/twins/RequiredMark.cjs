/* Parity twins: RequiredMark, measured 2026-10-28. The console's own part is ui/RequiredMark.jsx (Pranjal 2026-10-22);
 * Create team on /teams draws it after each field label (the dialog's labels pass it inside the label). The story's
 * Default draws it after a hand-written label at the console's label face (13/500 neutral-90), and InTheFields shows
 * every library field that takes `required` - each must draw the same star, 3 off the word, as the console. */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const openCreateTeam = async (page) => {
  await page.getByRole('button', { name: /create team/i }).first().click();
  await page.waitForSelector('[role=dialog] label', { timeout: 10000 });
  await wait(300);
};
const CONSOLE_STAR = '[role=dialog] label span.mdt-text-destructive[aria-hidden="true"]';
const STAR = ['color', 'marginLeft', 'fontSize', 'fontWeight', 'lineHeight'];
/* the field's own label sets the size; the mark only carries its colour and its gap */
const MARK = ['color', 'marginLeft', 'fontWeight'];
const WORD = ['position', 'width', 'height', 'overflow', 'whiteSpace'];
const FIELD = (n) => `#storybook-root > div > :nth-child(${n}) [data-slot="required-mark"]`;
const CONSOLE = { path: '/teams', open: openCreateTeam, select: CONSOLE_STAR };

module.exports = {
  component: 'RequiredMark',
  frames: [
    {
      name: 'the star (danger red, 3 off the word)',
      props: STAR,
      story: { id: 'new-components-requiredmark--default', select: '[data-slot="required-mark"]' },
      console: CONSOLE,
      mock: null,
    },
    {
      name: 'the hidden word "required" (screen reader only)',
      props: WORD,
      story: { id: 'new-components-requiredmark--default', select: '[data-slot="required-mark"] + .mdt-sr-only' },
      console: { path: '/teams', open: openCreateTeam, select: `${CONSOLE_STAR} + .mdt-sr-only` },
      mock: null,
    },
    { name: 'Input draws the same star', props: MARK, story: { id: 'new-components-requiredmark--in-the-fields', select: FIELD(1) }, console: CONSOLE, mock: null },
    { name: 'Select draws the same star (was 4 off)', props: MARK, story: { id: 'new-components-requiredmark--in-the-fields', select: FIELD(2) }, console: CONSOLE, mock: null },
    { name: 'Combobox draws the same star (was 4 off)', props: MARK, story: { id: 'new-components-requiredmark--in-the-fields', select: FIELD(3) }, console: CONSOLE, mock: null },
    { name: 'Textarea draws the same star', props: MARK, story: { id: 'new-components-requiredmark--in-the-fields', select: FIELD(4) }, console: CONSOLE, mock: null },
    { name: 'FormLabel draws the same star (was 4 off)', props: MARK, story: { id: 'new-components-requiredmark--in-the-fields', select: FIELD(5) }, console: CONSOLE, mock: null },
  ],
};
