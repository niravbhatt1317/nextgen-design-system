/* Parity twins: the library's Toolbar beside the console's Users page, which hands this same Toolbar (label
 * "User controls") to the table; the table draws its ToolbarButtons inside it (More filters, Sort, Columns). Every
 * list page (Users, Teams, Roles, Fields, Service accounts, Access profiles) wears the strip the same way. */
const PROPS = [
  'backgroundColor', 'color', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius',
  'paddingTop', 'paddingLeft', 'fontSize', 'fontWeight',
];
const STRIP = '[role="toolbar"]';
const CSTRIP = '[role="toolbar"][aria-label="User controls"]';

module.exports = {
  component: 'Toolbar',
  frames: [
    {
      name: 'the strip (60 high, 24 sides, the page ground, no edge)',
      props: [...PROPS, 'height', 'borderBottomWidth'],
      story: { id: 'new-components-toolbar--default', select: STRIP },
      console: { path: '/users', select: CSTRIP },
      mock: null,
    },
    {
      name: 'a ToolbarButton with a label (Filters / the More filters door)',
      props: [...PROPS, 'height', 'paddingRight'],
      story: { id: 'new-components-toolbarbutton--default', select: '#storybook-root button' },
      console: { path: '/users', select: `${CSTRIP} button:not([aria-haspopup]):not([aria-label])` } /* the More filters door: the one button in the strip with no aria attribute (its words are its label); the menu and dialog ones are Status, Sort and Columns */,
      mock: null,
    },
    {
      name: 'a square ToolbarButton (Columns)',
      props: [...PROPS, 'height', 'width'],
      story: { id: 'new-components-toolbar--default', select: `${STRIP} button[aria-label="Columns"]` },
      console: { path: '/users', select: `${CSTRIP} button[aria-label="Manage columns"]` },
      mock: null,
    },
  ],
};
