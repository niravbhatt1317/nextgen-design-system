/* Parity twins: the library's Callout. The console does not render it (LifecycleModals and om/atoms name a callout
 * of their own) and no mock draws one, so there is no twin yet: the frames below name the story side and the
 * runner flags them until a console or mock twin exists. */
const PROPS = [
  'backgroundColor', 'color', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius',
  'paddingTop', 'paddingLeft', 'fontSize', 'fontWeight',
];

module.exports = {
  component: 'Callout',
  frames: [
    {
      name: 'neutral · tinted (the default block)',
      props: PROPS,
      story: { id: 'components-callout--default', select: '[data-tone]' },
      console: null,
      mock: null,
    },
    {
      name: 'danger · tinted (only the edge and the glyph carry the tone)',
      props: PROPS,
      story: { id: 'components-callout--tones', select: '[data-tone="danger"]' },
      console: null,
      mock: null,
    },
  ],
};
