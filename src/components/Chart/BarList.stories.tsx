import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { BarList } from './BarList';
import type { BarListRow } from './Chart.types';

const agents = (n: number) => `${n.toLocaleString('en-US')} ${n === 1 ? 'agent' : 'agents'}`;
/* Fleet state's versions: the current one in green */
const VERSIONS: BarListRow[] = [
  ['7.4.0', 1086],
  ['7.3.2', 702],
  ['7.2.9', 287],
  ['7.1.4', 58],
  ['6.9.0', 1],
].map(([label, n], i) => ({
  label: String(label),
  n: Number(n),
  current: i === 0,
  tip: `${String(label)} · ${agents(Number(n))}`,
  onPick: () => undefined,
}));
/* "Silent for how long", option B (Pranjal 2026-10-22): grey while it may come back, red past a day, on a track */
const SILENT: BarListRow[] = [
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
}));

const meta: Meta<typeof BarList> = {
  title: 'New Components/Chart/Bar list',
  component: BarList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'One row per group: its name, its bar scaled to the biggest group, then the count and its share of the total. A chart, not a progress bar - no track - unless `track` lays a pale one under every bar. A row can be `current` (green, with a quiet "current") or carry a `tone` (red, grey). Every row is a button with a one-line hover.',
          '',
          "**Ported from the console (Pranjal, 2026-10-28)**: Agent Fleet Health's Fleet state lists (afm/screens/health/charts.tsx `BarList`). Fleet state is not on a page today, so there is no live console frame to measure it against. Dark comes from the theme toggle.",
        ].join('\n'),
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mdt-w-[436px]">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof meta>;

/** The versions running, the current one in green. */
export const Default: Story = { args: { rows: VERSIONS } };

/** `track`: a pale track under every bar, 12px bars with round ends; the tones grey and red. */
export const WithTrack: Story = { args: { rows: SILENT, track: true } };

/** No rows reads "Nothing in this scope." */
export const Empty: Story = { args: { rows: [] } };

/** The hover: one line, the row and its count - "7.3.2 · 702 agents". */
export const Hover: Story = {
  args: { rows: VERSIONS },
  play: async ({ canvasElement }) => {
    await userEvent.hover(within(canvasElement).getByRole('button', { name: /^7\.3\.2/ }));
    await expect(await within(document.body).findByRole('tooltip')).toHaveTextContent(
      '7.3.2 · 702 agents'
    );
  },
};
