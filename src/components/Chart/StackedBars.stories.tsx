import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { InfoTip } from '../InfoTip';
import { StackedBars } from './StackedBars';
import type { StackedBarsRow, StackedBarsSeries, StackedBarsSide } from './Chart.types';

/* Agent Fleet's Module health: 2,134 agents, the most crashes first (the console's figures) */
const AF_SERIES: StackedBarsSeries[] = [
  { key: 'crashing', label: 'Crashing', tone: 'crit' },
  { key: 'degraded', label: 'Degraded', tone: 'warn' },
  { key: 'silent', label: 'Silent', tone: 'quiet' },
  { key: 'healthy', label: 'Healthy', tone: 'good' },
];
const mod = (name: string, c: number, d: number, s: number, h: number): StackedBarsRow => ({
  id: name,
  name,
  total: c + d + s + h,
  values: { crashing: c, degraded: d, silent: s, healthy: h },
});
const AF_ROWS = [
  mod('Metrics', 40, 63, 32, 1979),
  mod('Logs', 30, 61, 32, 1992),
  mod('Patch', 19, 24, 20, 1103),
  mod('Inventory', 16, 30, 20, 1123),
  mod('Remote actions', 14, 28, 18, 1091),
  mod('Traces', 8, 33, 21, 1099),
];
const RESTARTS: Record<string, number> = {
  Metrics: 184,
  Logs: 136,
  Patch: 83,
  Inventory: 70,
  'Remote actions': 63,
  Traces: 31,
  Discovery: 4,
};
const share = (a: number, b: number) => (b ? Math.round((a / b) * 1000) / 10 : 0);
/* the column beside: "40 crashing · 1.9%", red with its dot when there is any, then the restarts */
const sideOf =
  (word: string) =>
  (r: StackedBarsRow): StackedBarsSide => {
    const red = r.values.crashing ?? 0;
    return {
      lead: `${String(red)} ${word} · ${String(share(red, r.total))}%`,
      alert: red > 0,
      rest: ` · ${String(RESTARTS[r.name] ?? 0)} restarts`,
    };
  };
/* Collector Fleet's Performance: its own words and order for the same four colours */
const CF_SERIES: StackedBarsSeries[] = [
  { key: 'crashing', label: 'Restarting', tone: 'crit' },
  { key: 'silent', label: 'Not reporting', tone: 'quiet' },
  { key: 'degraded', label: 'At capacity', tone: 'warn' },
  { key: 'healthy', label: 'Running', tone: 'good' },
];
const CF_ROWS = [
  mod('Ingestion pipeline', 0, 2, 1, 11),
  mod('Discovery', 1, 2, 0, 6),
  mod('Alert evaluation', 0, 1, 0, 6),
  mod('Flow analytics', 0, 2, 0, 1),
  mod('Patch cache', 0, 1, 0, 1),
  mod('TFTP/PXE store', 0, 1, 0, 0),
  mod('Orchestrator bridge', 0, 0, 0, 1),
];

/* the console's heading: the title and its ⓘ */
const Title = ({ children }: { children: string }) => (
  <span className="mdt-inline-flex mdt-items-center mdt-gap-1">
    {children}
    <InfoTip label={`How to read ${children.toLowerCase()}`}>
      One bar per module, the most crashes first. Click a colour in the legend to hide or show it.
    </InfoTip>
  </span>
);

const meta: Meta<typeof StackedBars> = {
  title: 'New Components/Chart/Stacked bars',
  component: StackedBars,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'One stacked bar per row on a card, on a shared number axis: each bar splits into the series\' colours (red, amber, grey, green). A click on a row hands back `"all"`, a click on one colour that series\' key. The legend on the title row is the switch - each colour hides or shows itself, at least one stays on, and the scale follows what is shown. A segment carries its number only when it fits; every segment has a one-line hover, "Metrics · Crashing · 40 agents". `side` adds the column beside the bars: each row named again and a line of figures, its lead red with a dot when it is the problem. Under 640 wide the column goes under the chart and the axis hides.',
          '',
          "**Ported from the console (Pranjal, 2026-10-28)**: Module health on both fleets' Health (afm/screens/health/ModuleChart.tsx). Dark comes from the theme toggle.",
        ].join('\n'),
      },
    },
  },
  args: { onPick: () => undefined },
  decorators: [
    (Story) => (
      <div className="mdt-w-[884px]">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof meta>;

const AF_ARGS = {
  title: <Title>Module health</Title>,
  series: AF_SERIES,
  rows: AF_ROWS,
  unit: { one: 'agent', many: 'agents' },
  side: sideOf('crashing'),
  sideLabel: 'Crashing and restarts per module',
};

/** Agent Fleet's Module health. */
export const Default: Story = { args: AF_ARGS };

/** Collector Fleet's: a handful of collectors, so the scale starts on a step of 5 and most numbers sit off the bar. */
export const Collectors: Story = {
  args: {
    title: <Title>Module health</Title>,
    series: CF_SERIES,
    rows: CF_ROWS,
    unit: { one: 'collector', many: 'collectors' },
    side: sideOf('restarting'),
    sideLabel: 'Restarting and restarts per module',
  },
};

/** Without `side` the chart takes the card's width. */
export const ChartOnly: Story = {
  args: { ...AF_ARGS, side: undefined, sideLabel: undefined },
};

/** "Healthy" switched off in the legend: struck through, a hollow swatch, and the scale shrinks to what is left. */
export const LegendOff: Story = {
  args: AF_ARGS,
  play: async ({ canvasElement }) => {
    const legend = within(canvasElement).getByRole('group', { name: 'Show or hide' });
    await userEvent.click(within(legend).getByRole('button', { name: 'Healthy' }));
    await expect(within(legend).getByRole('button', { name: 'Healthy' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  },
};

/** The hover: one line, the module, the colour and its count - "Metrics · Crashing · 40 agents". */
export const Hover: Story = {
  args: AF_ARGS,
  play: async ({ canvasElement }) => {
    const seg = canvasElement.querySelector<HTMLElement>(
      '.mdt-chart-stack-seg[data-key="crashing"]'
    );
    if (seg) await userEvent.hover(seg);
    await expect(await within(document.body).findByRole('tooltip')).toHaveTextContent(
      'Metrics · Crashing · 40 agents'
    );
  },
};
