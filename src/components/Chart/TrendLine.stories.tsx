import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { TrendLine } from './TrendLine';
import type { TrendPoint } from './Chart.types';

const HALF_HOUR = 30 * 60e3;
const START = Date.UTC(2026, 9, 27, 17, 0);
const hh = (n: number) => String(n).padStart(2, '0');
const timeOf = (t: number) => {
  const d = new Date(t);
  return `${hh(d.getUTCHours())}:${hh(d.getUTCMinutes())}`;
};
/* "On the current version" over the last 24 hours, rising to 50.9% (example figures) */
const ROLLOUT: TrendPoint[] = Array.from({ length: 48 }, (_, i) => ({
  t: START + i * HALF_HOUR,
  v: i === 47 ? 50.9 : 50 + (0.9 * i) / 47 + (((i * 13) % 5) - 2) * 0.03,
}));
/* agents sending data, around 99% with one dip */
const SENDING: TrendPoint[] = ROLLOUT.map((p, i) => ({
  t: p.t,
  v: [30, 31, 32].includes(i) ? 96.4 + (i - 30) * 0.4 : 98.9 + ((i * 7) % 5) / 10,
}));

const meta: Meta<typeof TrendLine> = {
  title: 'New Components/Chart/Trend line',
  component: TrendLine,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A reading over time: the line, a pale wash under it, a three-step side scale and three labels under it. Each point is a full-height strip; under the pointer or keyboard focus it shows a hairline and a dot and opens its one-line hover. The line wears the neutral blue (`info`) or the good green.',
          '',
          '**Ported from the console (Pranjal, 2026-10-28)**: Fleet state\'s "On the current version" (afm/screens/health/charts.tsx `TrendLine`). Fleet state is not on a page today, so there is no live console frame to measure it against. Dark comes from the theme toggle.',
        ].join('\n'),
      },
    },
  },
  args: {
    points: ROLLOUT,
    lo: 0,
    hi: 60,
    tone: 'good',
    axis: ['17:00', '05:00', 'Now'],
    tip: (p: TrendPoint, i: number) => `${i === 47 ? 'Now' : timeOf(p.t)} · ${p.v.toFixed(1)}%`,
  },
  decorators: [
    (Story) => (
      <div className="mdt-w-[720px]">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof meta>;

/** On the current version, in the good green. */
export const Default: Story = {};

/** The neutral blue, on a zoomed scale. */
export const Info: Story = { args: { points: SENDING, lo: 95, hi: 100, tone: 'info' } };

/** The hover: the point's hairline and dot, and one line - "Now · 50.9%". */
export const Hover: Story = {
  play: async ({ canvasElement }) => {
    const now = canvasElement.querySelector<HTMLElement>('.mdt-chart-trend__hit:last-child');
    if (now) await userEvent.hover(now);
    await expect(await within(document.body).findByRole('tooltip')).toHaveTextContent(
      'Now · 50.9%'
    );
  },
};
