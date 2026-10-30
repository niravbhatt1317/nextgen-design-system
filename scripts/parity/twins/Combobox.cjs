/* Parity twins: Combobox - its required mark only, measured 2026-10-28 (the first twin for this folder; the field itself
 * is not measured here yet). Since 2026-10-28 the Combobox draws the library's one RequiredMark instead of its own star
 * 4 off the word. The console draws RequiredMark (ui/RequiredMark.jsx) after every required label; Create team on
 * /teams is where the RequiredMark twin reads it, so the same frame stands in here. */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const openCreateTeam = async (page) => {
  await page.getByRole('button', { name: /create team/i }).first().click();
  await page.waitForSelector('[role=dialog] label', { timeout: 10000 });
  await wait(300);
};
const CONSOLE = { path: '/teams', open: openCreateTeam, select: '[role=dialog] label span.mdt-text-destructive[aria-hidden="true"]' };

module.exports = {
  component: 'Combobox',
  frames: [
    {
      name: 'the required mark (RequiredMark: danger red, 3 off the word)',
      props: ['color', 'marginLeft', 'fontWeight'],
      story: { id: 'components-combobox--required', select: 'label [data-slot="required-mark"]' },
      console: CONSOLE,
      mock: null,
    },
    {
      name: 'the hidden word "required" after it',
      props: ['position', 'width', 'height', 'overflow', 'whiteSpace'],
      story: { id: 'components-combobox--required', select: 'label [data-slot="required-mark"] + .mdt-sr-only' },
      console: { ...CONSOLE, select: `${CONSOLE.select} + .mdt-sr-only` },
      mock: null,
    },
  ],
};
