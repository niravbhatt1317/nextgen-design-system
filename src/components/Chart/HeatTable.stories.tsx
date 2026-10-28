import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { HeatTable } from './HeatTable';
import type { HeatRow } from './Chart.types';

const noun = (n: number, one: string, many: string) =>
  `${n.toLocaleString('en-US')} ${n === 1 ? one : many}`;
/* Agent Fleet's "Where the problems are" by zone: 2,134 agents (the console's figures) */
const COLS = [
  'Silent',
  'With a problem or holding data',
  'Crashing module',
  'Over budget',
  'Behind 7.4.0',
];
const FLEET = [32, 50, 125, 24, 1048].map((k) => k / 2134);
const zone = (label: string, n: number, counts: number[]): HeatRow => ({
  label,
  n,
  cells: counts.map((k, i) => ({
    n: k,
    of: n,
    fleetRate: FLEET[i] ?? 0,
    tip: `${label} · ${COLS[i] ?? ''} · ${noun(k, 'agent', 'agents')}`,
    onPick: () => undefined,
  })),
});
const ZONES: HeatRow[] = [
  zone('Retail stores', 1075, [16, 27, 66, 15, 528]),
  zone('Retail core', 1059, [16, 23, 59, 9, 520]),
];
/* Collector Fleet's, by network zone: a few collectors each, so most cells are none or all */
const CF_COLS = [
  'Not reporting',
  'Module fault',
  'At capacity',
  'Unverified build',
  'Behind 4.9.0',
];
const CF_FLEET = [1, 1, 2, 2, 14].map((k) => k / 14);
const cfZone = (label: string, n: number, counts: number[]): HeatRow => ({
  label,
  n,
  cells: counts.map((k, i) => ({
    n: k,
    of: n,
    fleetRate: CF_FLEET[i] ?? 0,
    tip: `${label} · ${CF_COLS[i] ?? ''} · ${noun(k, 'collector', 'collectors')}`,
    onPick: () => undefined,
  })),
});
const CF_ZONES: HeatRow[] = [
  cfZone('zone-fra-eu-1', 2, [1, 1, 0, 0, 2]),
  cfZone('zone-iad-east-1', 2, [0, 0, 0, 0, 2]),
  cfZone('zone-sfo-west', 2, [0, 0, 1, 0, 2]),
  cfZone('No zone', 1, [0, 0, 0, 0, 1]),
];

const meta: Meta<typeof HeatTable> = {
  title: 'New Components/Chart/Heat table',
  component: HeatTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          "Groups by problems, as shaded cells: each cell holds its count and, under it, its share of the row, shaded against the whole's rate for that problem - lighter is better than the fleet, darker worse, in five steps, named by the ramp under the table. A cell with none is the quiet ground and disabled. Each cell is a button opening its members, with a one-line hover; hover darkens the cell's own shade, keyboard focus rings it. On the two darkest shades the share reads in the full ink.",
          '',
          '**Ported from the console (Pranjal, 2026-10-28)**: "Where the problems are" on both fleets\' Health Overview (afm/screens/health/charts.tsx `HeatTable`). Dark comes from the theme toggle.',
        ].join('\n'),
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mdt-w-[842px]">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof meta>;

const AF_ARGS = { head: 'Zone', countLabel: 'Agents', cols: COLS, rows: ZONES };

/** Agent Fleet by zone. */
export const Default: Story = { args: AF_ARGS };

/** Collector Fleet by network zone: the count column says "Collectors"; empty cells sit on the quiet ground. */
export const Collectors: Story = {
  args: { head: 'Network zone', countLabel: 'Collectors', cols: CF_COLS, rows: CF_ZONES },
};

/** The hover: one line, the cell and its count - "Retail stores · Over budget · 15 agents". */
export const Hover: Story = {
  args: AF_ARGS,
  play: async ({ canvasElement }) => {
    /* the browser names the cell "15 1.4%" (its two lines are blocks), jsdom "151.4%" */
    await userEvent.hover(within(canvasElement).getByRole('button', { name: /^15\s?1\.4%$/ }));
    await expect(await within(document.body).findByRole('tooltip')).toHaveTextContent(
      'Retail stores · Over budget · 15 agents'
    );
  },
};
