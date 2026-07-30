import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './Progress';

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
