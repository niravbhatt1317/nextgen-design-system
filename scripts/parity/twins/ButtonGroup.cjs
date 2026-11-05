/* Parity twins: the library's ButtonGroup, measured 2026-11-05. The console draws it once for real: the Enroll agents split
 * button on /agent-fleet, in the Agents tab's control strip (features/fleet-new/afm/screens/EnrollFlow.jsx, SplitButton;
 * used only in Agents.tsx). The ButtonWithDropdown story's first group is the same thing: a primary action joined to a
 * chevron that opens a menu. The group owns the row, the missing gap, the squared inner corners and the join between the
 * two buttons, so each button is read as well as the box. The console's seam on the chevron (enroll-flow.css, .split-chevron)
 * is its own addition and is left on show. Its split-outline look is written but nothing draws it, so it has no frame. */
const GROUP = {
  story: '#storybook-root [class*="mdt-inline-flex"]:has(> button)',
  console: '.ef-split',
};
const STORY = 'new-components-buttongroup--button-with-dropdown';
const onScreen = async (page) => { await page.waitForSelector(GROUP.console, { timeout: 15000 }); };
const frame = (name, props, part, state) => ({
  name,
  props,
  ...(state ? { state } : {}),
  story: { id: STORY, select: GROUP.story + part },
  console: { path: '/agent-fleet', open: onScreen, select: GROUP.console + part },
  mock: null,
});
const CORNERS = ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'];
const MAIN = ' > button:first-child';
const CHEVRON = ' > button:last-child';

module.exports = {
  component: 'ButtonGroup',
  frames: [
    frame('the group (one row, no gap, as tall as its buttons)', ['display', 'flexDirection', 'columnGap', 'rowGap', 'rectHeight'], ''),
    frame('the main button (square where it joins)', [
      'backgroundColor', 'color', 'fontSize', 'fontWeight', 'lineHeight', 'rectHeight', 'paddingLeft', 'paddingRight',
      'borderTopWidth', 'borderLeftWidth', 'borderRightWidth', ...CORNERS,
    ], MAIN),
    frame('the main button under the pointer', ['backgroundColor', 'color'], MAIN, 'hover'),
    frame('the chevron (square where it joins, the seam)', [
      'backgroundColor', 'color', 'rectWidth', 'rectHeight', 'paddingLeft', 'paddingRight',
      'borderTopWidth', 'borderLeftWidth', 'borderLeftColor', 'borderRightWidth', ...CORNERS,
    ], CHEVRON),
    frame('the chevron under the pointer', ['backgroundColor', 'color'], CHEVRON, 'hover'),
    frame('the chevron glyph', ['width', 'height', 'color'], CHEVRON + ' svg'),
  ],
};
