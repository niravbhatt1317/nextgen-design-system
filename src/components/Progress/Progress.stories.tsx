import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress, ProgressBreakdown } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'How far along something is.',
          '',
          'Org Mgmt and Agent Fleet both built this, and both audits call their version',
          '**"the cleanest atom in the set — zero drift"**. Two teams arrived at the same',
          'thing independently and neither found a fault in it, so this follows it closely.',
          '',
          '`aria-label` is required — a bar with no name tells a screen reader nothing.',
        ].join('\n'),
      },
    },
  },
  args: { value: 62, 'aria-label': 'Storage used' },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div className="mdt-flex mdt-w-96 mdt-flex-col mdt-gap-6">{children}</div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="mdt-mb-2 mdt-text-xs mdt-font-medium mdt-text-muted-foreground">{children}</p>
);

export const Default: Story = {};

export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <div>
        <Label>default</Label>
        <Progress value={62} aria-label="Storage used" />
      </div>
      <div>
        <Label>success</Label>
        <Progress value={100} tone="success" aria-label="Rollout complete" />
      </div>
      <div>
        <Label>warning</Label>
        <Progress value={81} tone="warning" aria-label="Seats used" />
      </div>
      <div>
        <Label>danger</Label>
        <Progress value={96} tone="danger" aria-label="Quota used" />
      </div>
    </Stack>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <Progress value={62} size="sm" aria-label="Small" />
      <Progress value={62} size="md" aria-label="Medium" />
      <Progress value={62} size="lg" aria-label="Large" />
    </Stack>
  ),
};

/** The markers Org Mgmt's ConstraintMeter uses to give a value context. */
export const WithMarkers: Story = {
  name: 'With markers',
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <div>
        <Label>Baseline — the value this tenant is measured against</Label>
        <Progress value={62} baseline={75} aria-label="Seats used against baseline" />
      </div>
      <div>
        <Label>Floor — a lower bound</Label>
        <Progress value={62} floor={20} aria-label="Seats used above floor" />
      </div>
      <div>
        <Label>Both, over the baseline</Label>
        <Progress
          value={88}
          tone="warning"
          baseline={75}
          floor={20}
          aria-label="Seats used, over baseline"
        />
      </div>
    </Stack>
  ),
};

/** Out-of-range values are clamped rather than overflowing the track. */
export const EdgeCases: Story = {
  name: 'Edge cases',
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <div>
        <Label>Empty</Label>
        <Progress value={0} aria-label="Nothing used" />
      </div>
      <div>
        <Label>Full</Label>
        <Progress value={100} tone="success" aria-label="All used" />
      </div>
      <div>
        <Label>Over 100 — clamped</Label>
        <Progress value={150} tone="danger" aria-label="Over quota" />
      </div>
      <div>
        <Label>Custom max — 5 of 20</Label>
        <Progress value={5} max={20} aria-label="Five of twenty" />
      </div>
    </Stack>
  ),
};

/**
 * ## The four slots
 *
 * A line above the bar and a line below, each with a left end and a right end.
 * Left and right sit at the two ends of the same line, which is what makes
 * **"Storage used"** and **"62%"** read as one sentence about one bar rather
 * than two labels that happen to be near each other.
 *
 * Any of the four can be left out. Pass a bare string and that is the left end
 * on its own.
 */
export const WithLabels: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-[420px] mdt-flex-col mdt-gap-7">
      <Progress
        value={62}
        above={{ left: 'Storage used', right: '62%' }}
        below={{ left: '62 GB of 100 GB', right: '38 GB left' }}
        aria-label="Storage used"
      />
      <Progress
        value={91}
        tone="danger"
        above={{ left: 'Seats used', right: '91 of 100' }}
        below={{ right: '9 left' }}
        aria-label="Seats used"
      />
      <Progress value={38} above="Uploading rollback-plan.pdf" aria-label="Uploading" />
      <Progress
        value={100}
        tone="success"
        below={{ left: 'Finished', right: '2 min ago' }}
        aria-label="Import"
      />
    </div>
  ),
};

/**
 * Four of them stacked, which is where the alignment earns its keep.
 *
 * **The figures on the right form a straight edge** because the digits are set
 * to a single width. Without that, 1,860 and 9 sit at different distances from
 * the edge and the column looks broken.
 */
export const Stacked: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-[420px] mdt-flex-col mdt-gap-5">
      <Progress
        value={62}
        above={{ left: 'Storage', right: '62%' }}
        below={{ left: '62 GB of 100 GB', right: '38 GB left' }}
        aria-label="Storage"
      />
      <Progress
        value={91}
        tone="danger"
        above={{ left: 'Seats', right: '91%' }}
        below={{ left: '91 of 100', right: '9 left' }}
        aria-label="Seats"
      />
      <Progress
        value={7}
        tone="success"
        above={{ left: 'Automations', right: '7%' }}
        below={{ left: '140 of 2,000', right: '1,860 left' }}
        aria-label="Automations"
      />
      <Progress
        value={78}
        tone="warning"
        above={{ left: 'API calls today', right: '78%' }}
        below={{ left: '7,800 of 10,000', right: '2,200 left' }}
        aria-label="API calls today"
      />
    </div>
  ),
};

/**
 * ## A key for the markers
 *
 * The bar takes a `baseline` marker and a `floor` marker, and without a key
 * nothing on screen says what those lines mean.
 *
 * **A key of one colour explains nothing**, so the legend earns its place only
 * when there is more than one thing on the track. A marker is a line, so its
 * swatch is a line too — a square would say "a band of the bar is this colour",
 * which is the opposite of what a marker is.
 */
export const WithLegend: Story = {
  render: () => (
    <div className="mdt-w-[420px]">
      <Progress
        value={91}
        tone="danger"
        baseline={75}
        above={{ left: 'Seats used', right: '91 of 100' }}
        below={{ right: '9 over your plan' }}
        legend={[
          { label: 'Used', value: 91, swatch: 'danger' },
          { label: 'Your plan allows', value: 75, swatch: 'baseline' },
        ]}
        aria-label="Seats used"
      />
    </div>
  ),
};

/**
 * ## ProgressBreakdown — one whole, divided into named parts
 *
 * Same track, same tones, same sizes — and a different question. Progress says
 * how far along one thing is; this says what a whole is made of.
 *
 * **It is not a progress bar and is not announced as one.** Nothing here is
 * advancing toward finishing and there is no single value, so it is one picture
 * with one sentence describing it — which is why `aria-label` has to carry the
 * whole story.
 *
 * The parts butt together and carry no rounding of their own; only the two ends
 * of the bar are round. That is what makes it read as one thing divided up
 * rather than several bars sitting next to each other.
 */
export const Breakdown: Story = {
  render: () => (
    <div className="mdt-w-[420px]">
      <ProgressBreakdown
        max={100}
        segments={[
          { label: 'Tickets', value: 48, valueLabel: '48 GB' },
          { label: 'Attachments', value: 22, valueLabel: '22 GB', tone: 'warning' },
          { label: 'Backups', value: 14, valueLabel: '14 GB', tone: 'success' },
        ]}
        remainderLabel="Free"
        formatValue={(n) => `${String(n)} GB`}
        above={{ left: 'Storage', right: '100 GB' }}
        below={{ left: 'Updated 4 minutes ago', right: '84 GB used' }}
        aria-label="Storage: 48 GB tickets, 22 GB attachments, 14 GB backups, 16 GB free of 100 GB"
      />
    </div>
  ),
};

/**
 * With no `max`, the parts **are** the whole and are drawn as shares of their
 * own total — so a breakdown of a queue does not need a denominator invented
 * for it.
 */
export const BreakdownWithoutMax: Story = {
  render: () => (
    <div className="mdt-w-[420px]">
      <ProgressBreakdown
        segments={[
          { label: 'Open', value: 34, tone: 'danger' },
          { label: 'In progress', value: 21, tone: 'warning' },
          { label: 'Resolved', value: 62, tone: 'success' },
        ]}
        above={{ left: 'Tickets this week', right: '117' }}
        aria-label="Tickets this week: 34 open, 21 in progress, 62 resolved"
      />
    </div>
  ),
};

/** The legend can be turned off when the parts are labelled somewhere else. */
export const BreakdownWithoutLegend: Story = {
  render: () => (
    <div className="mdt-w-[420px]">
      <ProgressBreakdown
        max={100}
        showLegend={false}
        segments={[
          { label: 'Tickets', value: 48 },
          { label: 'Attachments', value: 22, tone: 'warning' },
          { label: 'Backups', value: 14, tone: 'success' },
        ]}
        above={{ left: 'Storage', right: '84 GB of 100 GB' }}
        aria-label="Storage: 84 GB of 100 GB used"
      />
    </div>
  ),
};
