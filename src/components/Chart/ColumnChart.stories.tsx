import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Card, CardBody, CardHeader } from '../Card';
import { ColumnChart } from './ColumnChart';
import type { ColumnChartColumn } from './Chart.types';

const agents = (n: number) => `${String(n)} ${n === 1 ? 'agent' : 'agents'}`;
/* Agent Fleet's "Silent for how long": grey while an agent may come back on its own, red from a day on */
const SILENT: ColumnChartColumn[] = [
  ['Under 1h', 0],
  ['1–6h', 4],
  ['6–24h', 10],
  ['1–2 days', 18],
  ['Over 2 days', 0],
].map(([label, n], i) => ({
  label: String(label),
  n: Number(n),
  tone: i >= 3 ? 'crit' : 'quiet',
  tip: `${String(label)} silent · ${agents(Number(n))}`,
  onPick: () => undefined,
}));
/* Collector Fleet's "How full they are", on the busiest measure */
const FULL: ColumnChartColumn[] = [
  { label: 'Under 60%', n: 9, tone: 'quiet', tip: 'Room to spare · 9 collectors' },
  { label: '60 to 85%', n: 1, tone: 'quiet', tip: 'Getting full · 1 collector' },
  { label: '85% and over', n: 2, tone: 'crit', tip: 'At capacity · 2 collectors' },
];

/* the console's Overview card around the chart: the heading, then the body the columns fill */
const InCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="mdt-flex mdt-w-[436px] mdt-flex-col mdt-rounded-xl">
    <CardHeader plain heading={title} />
    <CardBody className="mdt-flex mdt-flex-1 mdt-flex-col">{children}</CardBody>
  </Card>
);

const meta: Meta<typeof ColumnChart> = {
  title: 'New Components/Chart/Columns',
  component: ColumnChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'One column per group, its count above it, scaled to the biggest. Each column is a button that opens its members, with a one-line hover - the mark and its value, never a list. A zero column is disabled and its count is quiet.',
          '',
          '`fill` lets the columns fill their card (at least 210 high, gaps of 12, counts 14/600, columns at most 64 wide); each column can carry its own `tone` - grey while it may come back, red from a day on - and `marker` draws a dashed line with its word where that starts.',
          '',
          '**Ported from the console (Pranjal, 2026-10-28)**: Agent Fleet Health\'s "Silent for how long" and Collector Fleet\'s "How full they are" (afm/screens/health/charts.tsx `Columns`). Dark comes from the theme toggle.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Agent Fleet's "Silent for how long", filling its card: grey under a day, red from a day on, the dashed "1 day" line. */
const renderDefault = () => (
  <InCard title="Silent for how long">
    <ColumnChart fill marker={{ at: 3, label: '1 day' }} cols={SILENT} />
  </InCard>
);

export const Default: Story = { render: renderDefault };

/** Collector Fleet's "How full they are": three columns, "At capacity" marked. */
export const Collectors: Story = {
  render: () => (
    <InCard title="How full they are">
      <ColumnChart fill marker={{ at: 2, label: 'At capacity' }} cols={FULL} />
    </InCard>
  ),
};

/** Without `fill`: 132 high, gaps of 8, every column in the chart blue (or `tone="crit"` for all of them). */
export const Plain: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-[436px] mdt-flex-col mdt-gap-8">
      <ColumnChart cols={SILENT.map(({ tone: _tone, ...c }) => c)} />
      <ColumnChart tone="crit" cols={SILENT.map(({ tone: _tone, ...c }) => c)} />
    </div>
  ),
};

/** The hover: one line, the column and its count - "1–2 days silent · 18 agents". */
export const Hover: Story = {
  render: renderDefault,
  play: async ({ canvasElement }) => {
    await userEvent.hover(within(canvasElement).getByRole('button', { name: '18' }));
    await expect(await within(document.body).findByRole('tooltip')).toHaveTextContent(
      '1–2 days silent · 18 agents'
    );
  },
};
