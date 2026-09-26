/* Parity twins: the library's Form parts (FormLabel, FormDescription). The console does not render them (its
 * drawers draw their own labels through compat/iam); the grants mocks draw the same two lines - a field label and
 * the hint under a field - so those stand in where the console has nothing. */
const PROPS = [
  'backgroundColor', 'color', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius',
  'paddingTop', 'paddingLeft', 'fontSize', 'fontWeight',
];

module.exports = {
  component: 'Form',
  frames: [
    {
      name: 'the label (14/500 in the foreground ink)',
      props: PROPS,
      story: { id: 'components-form--default', select: 'form label' },
      console: null,
      mock: { file: 'mocks/grants/access-profile.html', select: 'label.flabel' },
    },
    {
      name: 'the description under a field (12 in the muted ink)',
      props: PROPS,
      story: { id: 'components-form--default', select: 'form p' },
      console: null,
      mock: { file: 'mocks/grants/assign-grant.html', select: '.f .hint' },
    },
  ],
};
