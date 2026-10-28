import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Card, CardBody, CardHeader } from '../Card';
import { Histogram } from './Histogram';

/* Agent Fleet's Host cost, 2,134 hosts: how many fall in each tenth of the budget (the console's figures) */
const fromBins = (counts: number[], w: number) =>
  counts.flatMap((c, i) => Array.from({ length: c }, () => (i + 0.5) * w));
const CPU = fromBins(
  [43, 406, 392, 390, 405, 429, 45, 0, 0, 4, 1, 0, 1, 1, 1, 4, 0, 0, 2, 3, 2, 1, 0, 1, 1, 2],
  0.5
);
const MEMORY = fromBins([0, 0, 187, 502, 475, 500, 446, 0, 1, 1, 1, 2, 3, 1, 1, 1, 6, 1, 4, 2], 35);
const whole = (n: number) => Math.round(n).toLocaleString('en-US');

/* the console's Host cost card: the title, then the chart under a hairline */
const InCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="mdt-w-[436px] mdt-rounded-xl">
    <CardHeader plain heading={title} />
    <CardBody>
      <div className="mdt-border-0 mdt-border-t mdt-border-solid mdt-border-border mdt-pt-6">
        {children}
      </div>
    </CardBody>
  </Card>
);

const meta: Meta<typeof Histogram> = {
  title: 'New Components/Chart/Histogram',
  component: Histogram,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'How a group spreads for one reading against its budget: bar height is how many, across is the reading. Each bar is a tenth of the budget wide, so the budget sits on a bar edge and no bar mixes members under and over it; the scale ends just past the last reading or at 1.25 × the budget; the budget is named on its dashed red line; every bar past it is red (at least 4px), any other at least 3px.',
          '',
          '`onPick` makes every bar with members a button handing back which readings fall in it and its range. Each bar has a one-line hover: "0.5–1 % · 406 hosts", singular at one.',
          '',
          "**Ported from the console (Pranjal, 2026-10-28)**: Agent Fleet Health's Host cost, version C (afm/screens/health/charts.tsx `Histogram`). Dark comes from the theme toggle.",
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** CPU against a 5% budget, each bar opening its hosts. */
const renderDefault = () => (
  <InCard title="CPU">
    <Histogram vals={CPU} budget={5} unit="%" onPick={() => undefined} />
  </InCard>
);

export const Default: Story = { render: renderDefault };

/** Memory against 350 MB, whole numbers on the axis; plain bars (no `onPick`) still take focus for their hover. */
export const Memory: Story = {
  render: () => (
    <InCard title="Memory">
      <Histogram vals={MEMORY} budget={350} unit="MB" format={whole} />
    </InCard>
  ),
};

/** The hover: one line, the bar's range and its count - "0.5–1 % · 406 hosts". */
export const Hover: Story = {
  render: renderDefault,
  play: async ({ canvasElement }) => {
    await userEvent.hover(
      within(canvasElement).getByRole('button', { name: '0.5–1 %: 406 hosts' })
    );
    await expect(await within(document.body).findByRole('tooltip')).toHaveTextContent(
      '0.5–1 % · 406 hosts'
    );
  },
};
