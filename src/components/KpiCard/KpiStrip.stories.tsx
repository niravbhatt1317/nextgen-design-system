import type { Meta, StoryObj } from '@storybook/react-vite';
import { KpiCard } from './KpiCard';
import { KpiGauge } from './KpiCharts';
import { KpiStrip } from './KpiStrip';

const meta: Meta<typeof KpiStrip> = {
  title: 'Components/KPI Card/Strip',
  component: KpiStrip,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          "The row that holds KPI cards and groups. It gives every card its floor, lets them grow evenly until the row is full, and when the row cannot fit them all it scrolls sideways instead of squeezing anything. It bleeds through the page's side margin, so a card that is cut off is cut at the page edge, which is the cue that there is more.",
          'The page decides what goes in, how wide its margin is (`inset`, 24 by default) and where the row sits. The strip decides the rest. Each frame below is a page 984px wide with a 24px margin, so the row is 936.',
        ].join('\n\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** A page-like frame: a 24px margin on the hero ground. */
const Frame = ({ width = 984, children }: { width?: number; children: React.ReactNode }) => (
  <div
    className="mdt-bg-neutral-10 mdt-px-6 mdt-py-5 mdt-font-sans dark:mdt-bg-neutral-130"
    style={{ width }}
  >
    {children}
  </div>
);

const FIVE = [
  ['Total users', 8200, 'across all organisations'],
  ['Active users', 7640, '93% of total'],
  ['Dormant users', 256, 'no sign-in in 90+ days'],
  ['Pending invites', 11, 'awaiting acceptance'],
  ['Privileged accounts', 12, 'admin / elevated'],
] as const;

/** Five cards in a 936 row: each starts at its 174 floor and the spare room is shared evenly, so they land at 178. */
export const Fits: Story = {
  render: () => (
    <Frame>
      <KpiStrip label="Key figures">
        {FIVE.map(([label, value, hint]) => (
          <KpiCard key={label} label={label} value={value} hint={hint} />
        ))}
      </KpiStrip>
    </Frame>
  ),
};

/** Two cards grow until the row is full: 462 each. There is no ceiling; the number stays put and the card has more quiet room. */
export const Wide: Story = {
  render: () => (
    <Frame>
      <KpiStrip label="Key figures">
        <KpiCard label="Total users" value={8200} hint="across all organisations" />
        <KpiCard label="Active users" value={7640} hint="93% of total" />
      </KpiStrip>
    </Frame>
  ),
};

/** Seven cards need 1290. Every card keeps its floor, the row scrolls sideways, and the sixth card is cut at the page edge. Tab to the row and use the arrow keys. */
export const Scrolls: Story = {
  render: () => (
    <Frame>
      <KpiStrip label="Key figures">
        {FIVE.map(([label, value, hint]) => (
          <KpiCard key={label} label={label} value={value} hint={hint} />
        ))}
        <KpiCard label="Active invitation links" value={4} hint="37 issued" />
        <KpiCard label="Anomalous growth" value={47} hint="users in last 24h" />
      </KpiStrip>
    </Frame>
  ),
};

/** A group takes one share per segment; a chart card starts at 270 and grows like the others, its chart pinned right. */
export const Mixed: Story = {
  render: () => (
    <Frame>
      <KpiStrip label="Key figures">
        <KpiCard label="Total users" value={8200} hint="across all organisations" />
        <KpiCard
          label="Invitations"
          items={[
            { label: 'Pending invites', value: 11, hint: 'awaiting acceptance' },
            { label: 'Active invitation links', value: 4, hint: '37 issued' },
          ]}
        />
        <KpiCard
          label="Licensed users limit"
          value={8200}
          hint="10k allowed"
          chart={<KpiGauge percent={82} caption="capacity" />}
        />
        <KpiCard
          label="Privileged accounts"
          value={12}
          hint="admin / elevated"
          delta={{ label: '4.5%', direction: 'up', tone: 'caution' }}
        />
      </KpiStrip>
    </Frame>
  ),
};

/** The same five cards on a 600px page: three fit, the rest scroll. Cards never squeeze below 174. */
export const Narrow: Story = {
  render: () => (
    <Frame width={600}>
      <KpiStrip label="Key figures">
        {FIVE.map(([label, value, hint]) => (
          <KpiCard key={label} label={label} value={value} hint={hint} />
        ))}
      </KpiStrip>
    </Frame>
  ),
};

/** Scrolling stops on a card's left edge. */
export const Snapping: Story = {
  render: () => (
    <Frame width={600}>
      <KpiStrip label="Key figures" snap>
        {FIVE.map(([label, value, hint]) => (
          <KpiCard key={label} label={label} value={value} hint={hint} />
        ))}
      </KpiStrip>
    </Frame>
  ),
};
