import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { StatusBlocks } from './StatusBlocks';
import type { StatusBlock } from './Chart.types';

const hh = (h: number) => String(h % 24).padStart(2, '0');
/* the last 24 hours in half hours: steady around 99%, one dip mid-afternoon, now 98.2% (example figures) */
const DIPS: Record<number, number> = { 30: 97.2, 31: 96.4, 32: 95.7, 33: 97.6 };
const halfHours = (n: number): StatusBlock[] =>
  Array.from({ length: n }, (_, i) => {
    const h = Math.floor(i / 2);
    const m = i % 2 ? '30' : '00';
    const end = i % 2 ? `${hh(h + 1)}:00` : `${hh(h)}:30`;
    const value = i === n - 1 ? 98.2 : (DIPS[i] ?? 98.9 + ((i * 37) % 7) / 10);
    return { label: i === n - 1 ? 'Now' : `${hh(h)}:${m}–${end}`, value };
  });

const meta: Meta<typeof StatusBlocks> = {
  title: 'New Components/Chart/Status blocks',
  component: StatusBlocks,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A status history: one block per period, coloured by its share - green at or above `good` (98%), amber at or above `warn` (96%), red under it - with the legend above, the axis under, and a quiet note naming the lowest period. Each block takes keyboard focus and opens its one-line hover. A `control` (a range switch) sits at the right of the legend row; past 60 blocks the gaps close to 2.',
          '',
          '**Ported from the console (Pranjal, 2026-10-28)**: the "Agents sending data" history (afm/screens/health/charts.tsx `StatusBlocks`). That card left the Overview on 2026-10-22, so there is no live console frame to measure it against. Dark comes from the theme toggle.',
        ].join('\n'),
      },
    },
  },
  args: {
    blocks: halfHours(48),
    axis: ['24h ago', '12h ago', 'Now'],
    label: 'Agents sending data, the last 24 hours',
    what: 'sending data',
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

/** The last 24 hours in half hours. */
export const Default: Story = {};

/** The last 90 days: past 60 blocks the gaps close from 4 to 2. */
export const Dense: Story = {
  args: {
    blocks: Array.from({ length: 90 }, (_, i) => ({
      label: `Day ${String(i + 1)}`,
      value: [22, 23, 70, 71].includes(i) ? 96.1 + (i % 2) : 99.2,
    })),
    axis: ['90 days ago', '45 days ago', 'Now'],
    label: 'Agents sending data, the last 90 days',
  },
};

/** The hover: one line, the period and its share - "Now · 98.2% sending data". */
export const Hover: Story = {
  play: async ({ canvasElement }) => {
    const now = canvasElement.querySelector<HTMLElement>('.mdt-chart-block:last-child');
    if (now) await userEvent.hover(now);
    await expect(await within(document.body).findByRole('tooltip')).toHaveTextContent(
      'Now · 98.2% sending data'
    );
  },
};
