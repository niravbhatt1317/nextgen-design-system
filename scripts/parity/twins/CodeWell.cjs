/* Parity twins: the library's CodeWell. The console does not render it (compat/afm/kit.jsx names it in prose only)
 * and no mock draws a code well, so there is no twin yet: the frames below name the story side and the runner
 * flags them until a console or mock twin exists. */
const PROPS = [
  'backgroundColor', 'color', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius',
  'paddingTop', 'paddingLeft', 'fontSize', 'fontWeight',
];
const WELL = 'pre[data-testid="codewell-body"]';

module.exports = {
  component: 'CodeWell',
  frames: [
    {
      name: 'light · the well (the muted ground behind a value in a panel)',
      props: PROPS,
      story: { id: 'components-codewell--default', select: WELL },
      console: null,
      mock: null,
    },
    {
      name: 'dark · the well (terminal output)',
      props: PROPS,
      story: { id: 'components-codewell--surfaces', select: `${WELL}.mdt-bg-neutral-160` },
      console: null,
      mock: null,
    },
  ],
};
