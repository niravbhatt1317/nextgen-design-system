/* Parity twins: the library's charts (src/components/Chart) beside the console's Health, where they were drawn by hand
 * (afm/screens/health/charts.tsx and ModuleChart.tsx, health.css and moduleHealth.css). Agent Fleet is /agent-fleet →
 * Health (Overview: "Silent for how long" = ColumnChart, "Where the problems are" = HeatTable; Modules: Module health =
 * StackedBars; Host cost: the histograms). Collector Fleet is /collectors → Health (Overview; Performance = its Module
 * health). The stories carry the console's own figures, so sizes that follow the data (a 4px red bar, a 3px blue one)
 * are compared too.
 *
 * NOT TWINNED, on purpose: BarList, StatusBlocks and TrendLine are on no console page today - Fleet state left Health on
 * 2026-10-26 and the "Agents sending data" history on 2026-10-22 (their source is still in charts.tsx / FleetState.tsx).
 * There is no live frame to measure them against; their stories are ported from the source alone. */
const PALETTE = ['backgroundColor', 'color'];
const TYPE = ['color', 'fontSize', 'fontWeight', 'lineHeight'];

/* the console's Health tab, and one of its sections */
const health = (section) => async (page) => {
  const customer = page.getByText('Northwind Retail', { exact: true }).first();
  if ((await customer.count()) && !(await page.getByRole('tab', { name: 'Health' }).count())) {
    await customer.click().catch(() => {});
    await page.waitForTimeout(1500);
  }
  await page.getByRole('tab', { name: 'Health' }).first().click();
  await page.waitForTimeout(1500);
  if (section) {
    await page.getByText(section, { exact: true }).first().click();
    await page.waitForTimeout(1500);
  }
};
/* the same, then the pointer on a mark so its one-line hover opens */
const hoverIn = (section, mark) => async (page) => {
  await health(section)(page);
  await page.locator(mark).first().hover();
  await page.waitForTimeout(500);
};

const AF = '/agent-fleet';
const CF = '/collectors';
const COLS = 'new-components-chart-columns--default';
const COLS_CF = 'new-components-chart-columns--collectors';
const HEAT = 'new-components-chart-heat-table--default';
const HEAT_CF = 'new-components-chart-heat-table--collectors';
const STACK = 'new-components-chart-stacked-bars--default';
const STACK_CF = 'new-components-chart-stacked-bars--collectors';
const HISTO = 'new-components-chart-histogram--default';

/* one frame: the same part on both sides */
const twin = (name, props, story, storySel, path, consoleSel, open) => ({
  name,
  props,
  story: { id: story, select: storySel },
  console: { path, select: consoleSel, open },
  mock: null,
});

module.exports = {
  component: 'Chart',
  frames: [
    /* ── ColumnChart: Agent Fleet's "Silent for how long" ── */
    twin(
      'columns · the baseline and the room above (fill)',
      ['borderBottomColor', 'borderBottomWidth', 'columnGap', 'paddingTop'],
      COLS,
      '.mdt-chart-cols',
      AF,
      '.hl-cols',
      health()
    ),
    twin(
      'columns · a red column, at most 64 wide, 6 corners',
      ['backgroundColor', 'rectWidth', 'borderTopLeftRadius', 'borderTopRightRadius'],
      COLS,
      '.mdt-chart-cols > button:nth-of-type(4) .mdt-chart-col__b',
      AF,
      '.hl-cols > button:nth-of-type(4) .hl-col__b',
      health()
    ),
    twin(
      'columns · a grey column (may come back)',
      ['backgroundColor', 'rectWidth'],
      COLS,
      '.mdt-chart-cols > button:nth-of-type(2) .mdt-chart-col__b',
      AF,
      '.hl-cols > button:nth-of-type(2) .hl-col__b',
      health()
    ),
    twin(
      'columns · the count, 14/600',
      TYPE,
      COLS,
      '.mdt-chart-cols > button:nth-of-type(4) .mdt-chart-col__n',
      AF,
      '.hl-cols > button:nth-of-type(4) .hl-col__n',
      health()
    ),
    twin(
      'columns · a zero count, quiet',
      TYPE,
      COLS,
      '.mdt-chart-cols > button:nth-of-type(1) .mdt-chart-col__n',
      AF,
      '.hl-cols > button:nth-of-type(1) .hl-col__n',
      health()
    ),
    twin(
      'columns · a group label',
      TYPE,
      COLS,
      '.mdt-chart-cols-x span',
      AF,
      '.hl-cols-x span',
      health()
    ),
    twin(
      'columns · the dashed marker',
      ['borderLeftStyle', 'borderLeftColor', 'borderLeftWidth'],
      COLS,
      '.mdt-chart-cols__mark',
      AF,
      '.hl-cols__mark',
      health()
    ),
    twin(
      'columns · the marker word',
      TYPE,
      COLS,
      '.mdt-chart-cols__mark span',
      AF,
      '.hl-cols__mark span',
      health()
    ),
    twin(
      'columns · Collector Fleet, the "At capacity" column',
      ['backgroundColor', 'rectWidth', 'borderTopLeftRadius'],
      COLS_CF,
      '.mdt-chart-cols > button:nth-of-type(3) .mdt-chart-col__b',
      CF,
      '.hl-cols > button:nth-of-type(3) .hl-col__b',
      health()
    ),

    /* ── ChartTip: the one-line hover ── */
    twin(
      'hover · the bubble (320 cap)',
      ['maxWidth', ...PALETTE, 'fontSize', 'paddingTop', 'borderTopLeftRadius'],
      'new-components-chart-columns--hover',
      '.tt',
      AF,
      '.tt',
      hoverIn(null, '.hl-cols > button:nth-of-type(4)')
    ),
    twin(
      'hover · its one line',
      ['display', 'textAlign', 'whiteSpace', 'fontSize'],
      'new-components-chart-columns--hover',
      '.tt > .mdt-chart-tip',
      AF,
      '.tt > .hl-tip',
      hoverIn(null, '.hl-cols > button:nth-of-type(4)')
    ),

    /* ── HeatTable: Agent Fleet's "Where the problems are", by zone ── */
    twin(
      'heat · a problem heading',
      [...TYPE, 'textAlign', 'paddingTop', 'paddingLeft'],
      HEAT,
      '.mdt-chart-heat th:nth-child(3)',
      AF,
      '.hl-heat th:nth-child(3)',
      health()
    ),
    twin(
      'heat · the group name',
      TYPE,
      HEAT,
      '.mdt-chart-heat tbody tr:first-child td:first-child',
      AF,
      '.hl-heat tbody tr:first-child td:first-child',
      health()
    ),
    twin(
      'heat · the count column',
      [...TYPE, 'textAlign'],
      HEAT,
      '.mdt-chart-heat__n',
      AF,
      '.hl-heat__n',
      health()
    ),
    twin(
      'heat · a cell at the fleet rate (step 3)',
      ['backgroundColor', 'rectHeight', 'borderTopLeftRadius'],
      HEAT,
      '.mdt-chart-heat__c[data-level="3"]',
      AF,
      '.hl-heat__c[data-level="3"]',
      health()
    ),
    twin(
      'heat · a worse cell (step 4)',
      ['backgroundColor'],
      HEAT,
      '.mdt-chart-heat__c[data-level="4"]',
      AF,
      '.hl-heat__c[data-level="4"]',
      health()
    ),
    twin(
      'heat · a better cell (step 2)',
      ['backgroundColor'],
      HEAT,
      '.mdt-chart-heat__c[data-level="2"]',
      AF,
      '.hl-heat__c[data-level="2"]',
      health()
    ),
    twin(
      'heat · the count in a cell',
      [...TYPE, 'paddingRight'],
      HEAT,
      '.mdt-chart-heat__c[data-level="3"] button',
      AF,
      '.hl-heat__c[data-level="3"] button',
      health()
    ),
    twin(
      'heat · the share under it',
      TYPE,
      HEAT,
      '.mdt-chart-heat__c[data-level="3"] button span',
      AF,
      '.hl-heat__c[data-level="3"] button span',
      health()
    ),
    twin(
      'heat · the share on a dark step reads in the full ink',
      TYPE,
      HEAT,
      '.mdt-chart-heat__c[data-level="4"] button span',
      AF,
      '.hl-heat__c[data-level="4"] button span',
      health()
    ),
    twin(
      'heat · the ramp line',
      ['color', 'fontSize', 'columnGap', 'marginTop'],
      HEAT,
      '.mdt-chart-ramp',
      AF,
      '.hl-ramp',
      health()
    ),
    twin(
      'heat · the darkest ramp swatch',
      ['backgroundColor', 'rectWidth', 'rectHeight', 'borderTopLeftRadius'],
      HEAT,
      '.mdt-chart-ramp i[data-level="5"]',
      AF,
      '.hl-ramp i[data-level="5"]',
      health()
    ),
    twin(
      'heat · Collector Fleet, an empty cell (the quiet ground)',
      ['backgroundColor'],
      HEAT_CF,
      '.mdt-chart-heat__c[data-level="0"]',
      CF,
      '.hl-heat__c[data-level="0"]',
      health()
    ),
    twin(
      'heat · Collector Fleet, the darkest cell',
      ['backgroundColor'],
      HEAT_CF,
      '.mdt-chart-heat__c[data-level="5"]',
      CF,
      '.hl-heat__c[data-level="5"]',
      health()
    ),

    /* ── StackedBars: Module health ── */
    twin(
      'stack · a legend switch (a pill, 28 high)',
      [...TYPE, 'rectHeight', 'paddingLeft', 'borderTopLeftRadius'],
      STACK,
      '.mdt-chart-stack-legend__b',
      AF,
      '.mh-legend__b',
      health('Modules')
    ),
    twin(
      'stack · the red swatch',
      ['backgroundColor', 'rectWidth', 'borderTopLeftRadius'],
      STACK,
      '.mdt-chart-stack-key[data-tone="crit"]',
      AF,
      '.mh-key[data-k="crashing"]',
      health('Modules')
    ),
    twin(
      'stack · the amber swatch',
      ['backgroundColor'],
      STACK,
      '.mdt-chart-stack-key[data-tone="warn"]',
      AF,
      '.mh-key[data-k="degraded"]',
      health('Modules')
    ),
    twin(
      'stack · the grey swatch',
      ['backgroundColor'],
      STACK,
      '.mdt-chart-stack-key[data-tone="quiet"]',
      AF,
      '.mh-key[data-k="silent"]',
      health('Modules')
    ),
    twin(
      'stack · the green swatch',
      ['backgroundColor'],
      STACK,
      '.mdt-chart-stack-key[data-tone="good"]',
      AF,
      '.mh-key[data-k="healthy"]',
      health('Modules')
    ),
    twin(
      'stack · a row (54 high, 8 corners)',
      ['rectHeight', 'paddingLeft', 'borderTopLeftRadius', 'columnGap'],
      STACK,
      '.mdt-chart-stack-row',
      AF,
      '.mh-row',
      health('Modules')
    ),
    twin(
      'stack · the row name',
      TYPE,
      STACK,
      '.mdt-chart-stack-nm__t',
      AF,
      '.mh-nm__t',
      health('Modules')
    ),
    twin(
      'stack · "on N agents"',
      TYPE,
      STACK,
      '.mdt-chart-stack-nm__s',
      AF,
      '.mh-nm__s',
      health('Modules')
    ),
    twin(
      'stack · the red segment',
      ['backgroundColor', 'rectHeight', 'fontSize', 'fontWeight'],
      STACK,
      '.mdt-chart-stack-seg[data-tone="crit"]',
      AF,
      '.mh-seg[data-k="crashing"]',
      health('Modules')
    ),
    twin(
      'stack · the amber segment and its ink',
      PALETTE,
      STACK,
      '.mdt-chart-stack-seg[data-tone="warn"]',
      AF,
      '.mh-seg[data-k="degraded"]',
      health('Modules')
    ),
    twin(
      'stack · the grey segment',
      PALETTE,
      STACK,
      '.mdt-chart-stack-seg[data-tone="quiet"]',
      AF,
      '.mh-seg[data-k="silent"]',
      health('Modules')
    ),
    twin(
      'stack · the green segment, its number and its round end',
      [...PALETTE, 'borderTopRightRadius', 'rectWidth'],
      STACK,
      '.mdt-chart-stack-seg[data-tone="good"]',
      AF,
      '.mh-seg[data-k="healthy"]',
      health('Modules')
    ),
    twin(
      'stack · a grid line',
      ['backgroundColor', 'opacity'],
      STACK,
      '.mdt-chart-stack-grid i:nth-child(2)',
      AF,
      '.mh-grid i:nth-child(2)',
      health('Modules')
    ),
    twin(
      'stack · an axis number',
      TYPE,
      STACK,
      '.mdt-chart-stack-axis span:nth-child(2)',
      AF,
      '.mh-axis span:nth-child(2)',
      health('Modules')
    ),
    twin(
      'stack · the axis caption',
      [...TYPE, 'textAlign'],
      STACK,
      '.mdt-chart-stack-cap',
      AF,
      '.mh-cap',
      health('Modules')
    ),
    twin(
      'stack · the hairline between the chart and the column',
      ['borderRightColor', 'borderRightWidth', 'paddingRight'],
      STACK,
      '.mdt-chart-stack-left',
      AF,
      '.mh-left',
      health('Modules')
    ),
    twin(
      'stack · the column, the name again',
      TYPE,
      STACK,
      '.mdt-chart-stack-side-name',
      AF,
      '.mh-side-name',
      health('Modules')
    ),
    twin(
      'stack · the column, its figures',
      TYPE,
      STACK,
      '.mdt-chart-stack-side-fig',
      AF,
      '.mh-side-fig',
      health('Modules')
    ),
    twin(
      'stack · the column, the red lead',
      ['color', 'fontWeight'],
      STACK,
      '.mdt-chart-stack-lead[data-bad]',
      AF,
      '.mh-crash[data-bad]',
      health('Modules')
    ),
    twin(
      'stack · Collector Fleet, the red segment',
      ['backgroundColor', 'rectHeight'],
      STACK_CF,
      '.mdt-chart-stack-seg[data-tone="crit"]',
      CF,
      '.mh-seg[data-k="crashing"]',
      health('Performance')
    ),
    twin(
      'stack · Collector Fleet, a legend word',
      TYPE,
      STACK_CF,
      '.mdt-chart-stack-legend__b:nth-child(2)',
      CF,
      '.mh-legend__b:nth-child(2)',
      health('Performance')
    ),

    /* ── Histogram: Host cost, CPU ── */
    twin(
      'histo · the plot (120 high, 20 above, 40 for the scale)',
      ['rectHeight', 'marginTop', 'marginLeft', 'borderBottomColor', 'columnGap'],
      HISTO,
      '.mdt-chart-histo',
      AF,
      '.hl-histo',
      health('Host cost')
    ),
    twin(
      'histo · a blue bar',
      ['backgroundColor', 'borderTopLeftRadius', 'rectWidth'],
      HISTO,
      '.mdt-chart-histo > button:nth-of-type(2) .mdt-chart-histo__b',
      AF,
      '.hl-histo > button:nth-of-type(2) .hl-histo__b',
      health('Host cost')
    ),
    twin(
      'histo · a nearly empty blue bar keeps 3px',
      ['backgroundColor', 'rectHeight'],
      HISTO,
      '.mdt-chart-histo > button:nth-of-type(10) .mdt-chart-histo__b',
      AF,
      '.hl-histo > button:nth-of-type(10) .hl-histo__b',
      health('Host cost')
    ),
    twin(
      'histo · a red bar past the budget keeps 4px',
      ['backgroundColor', 'rectHeight'],
      HISTO,
      '.mdt-chart-histo > button:nth-of-type(11) .mdt-chart-histo__b',
      AF,
      '.hl-histo > button:nth-of-type(11) .hl-histo__b',
      health('Host cost')
    ),
    twin(
      'histo · the budget line',
      ['borderLeftStyle', 'borderLeftColor', 'borderLeftWidth'],
      HISTO,
      '.mdt-chart-histo__budget',
      AF,
      '.hl-histo__budget',
      health('Host cost')
    ),
    twin(
      'histo · the budget word',
      TYPE,
      HISTO,
      '.mdt-chart-histo__budget-l',
      AF,
      '.hl-histo__budget-l',
      health('Host cost')
    ),
    twin(
      'histo · the count scale',
      TYPE,
      HISTO,
      '.mdt-chart-histo__y',
      AF,
      '.hl-histo__y',
      health('Host cost')
    ),
    twin(
      'histo · a grid line',
      ['backgroundColor'],
      HISTO,
      '.mdt-chart-histo__grid',
      AF,
      '.hl-histo__grid',
      health('Host cost')
    ),
    twin(
      'histo · the axis under it',
      ['color', 'fontSize', 'paddingLeft', 'marginTop'],
      HISTO,
      '.mdt-chart-axis--histo',
      AF,
      '.hl-axis--histo',
      health('Host cost')
    ),
  ],
};
