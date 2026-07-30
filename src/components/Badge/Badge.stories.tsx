import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { Icon } from '../Icon';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'A small label that says what something is.',
          '',
          'One component covering what the four product systems built as five:',
          'the status pill with its dot, the squarer meta chip, count and confidence',
          'badges, tinted protocol pills, and icon-only status marks.',
          '',
          '| Prop | Values |',
          '| --- | --- |',
          '| `tone` | neutral · info · success · warning · danger · ai |',
          '| `emphasis` | subtle · outline · solid |',
          '| `shape` | pill · square |',
          '| `size` | sm · md · lg |',
          '| `dot` | on / off |',
          '',
          '**Tones are named by meaning, not colour.** `tone="danger"` still reads',
          'correctly if the brand red changes, and it tells a reader what the badge is',
          'for. `red` tells them neither.',
          '',
          '**`emphasis="solid"` is for counts.** A filled chip whose whole job is to be',
          'seen — a notification total. Used as a status label it shouts down everything',
          'around it, so `subtle` is the default and should stay the common case.',
          '',
          '**The icon sizes itself.** 12, 14 and 16px at `sm`, `md` and `lg`. Whatever',
          '`size` you set on an `<Icon>` passed to `icon` is overridden, so nobody has to',
          'pick a glyph size that matches the chip.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-2">{children}</div>
);

const Group = ({ children }: { children: React.ReactNode }) => (
  <div className="mdt-flex mdt-flex-col mdt-gap-6">{children}</div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="mdt-mb-2 mdt-text-xs mdt-font-medium mdt-text-muted-foreground">{children}</p>
);

export const Default: Story = {
  args: { children: 'Label' },
};

/** Six tones, each named for what it means rather than what colour it is. */
export const Tones: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Group>
      <div>
        <Label>Subtle — the default, and what almost everything should use</Label>
        <Row>
          <Badge tone="neutral">Draft</Badge>
          <Badge tone="info">Reviewing</Badge>
          <Badge tone="success">Active</Badge>
          <Badge tone="warning">Expiring</Badge>
          <Badge tone="danger">Failed</Badge>
          <Badge tone="ai">AI</Badge>
        </Row>
      </div>
      <div>
        <Label>Outline — no fill; the edge and the label carry the tone</Label>
        <Row>
          <Badge tone="neutral" emphasis="outline">
            Draft
          </Badge>
          <Badge tone="info" emphasis="outline">
            Reviewing
          </Badge>
          <Badge tone="success" emphasis="outline">
            Active
          </Badge>
          <Badge tone="warning" emphasis="outline">
            Expiring
          </Badge>
          <Badge tone="danger" emphasis="outline">
            Failed
          </Badge>
          <Badge tone="ai" emphasis="outline">
            AI
          </Badge>
        </Row>
      </div>
      <div>
        <Label>Solid — counts only. Not for status labels</Label>
        <Row>
          <Badge tone="neutral" emphasis="solid">
            12
          </Badge>
          <Badge tone="info" emphasis="solid">
            4
          </Badge>
          <Badge tone="success" emphasis="solid">
            9
          </Badge>
          <Badge tone="warning" emphasis="solid">
            7
          </Badge>
          <Badge tone="danger" emphasis="solid">
            3
          </Badge>
          <Badge tone="ai" emphasis="solid">
            2
          </Badge>
        </Row>
      </div>
    </Group>
  ),
};

/**
 * A pill reads as an object sitting on the page. A square sits into a table
 * cell or a column of data more quietly. Same tones, same rules.
 */
export const Shapes: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Group>
      <div>
        <Label>Pill</Label>
        <Row>
          <Badge tone="neutral">Draft</Badge>
          <Badge tone="info">Reviewing</Badge>
          <Badge tone="success">Active</Badge>
          <Badge tone="warning">Expiring</Badge>
          <Badge tone="danger">Failed</Badge>
          <Badge tone="ai">AI</Badge>
        </Row>
      </div>
      <div>
        <Label>Square</Label>
        <Row>
          <Badge shape="square" tone="neutral">
            Draft
          </Badge>
          <Badge shape="square" tone="info">
            Reviewing
          </Badge>
          <Badge shape="square" tone="success">
            Active
          </Badge>
          <Badge shape="square" tone="warning">
            Expiring
          </Badge>
          <Badge shape="square" tone="danger">
            Failed
          </Badge>
          <Badge shape="square" tone="ai">
            AI
          </Badge>
        </Row>
      </div>
    </Group>
  ),
};

/**
 * Three sizes. The icon has its own step — 12, 14 and 16px — so it grows with
 * the chip instead of sitting undersized in a large one.
 */
export const Sizes: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Group>
      <div>
        <Label>Small · 20px chip, 12px icon</Label>
        <Row>
          <Badge size="sm" tone="success">
            Active
          </Badge>
          <Badge size="sm" shape="square" tone="warning">
            Expiring
          </Badge>
          <Badge size="sm" tone="info" emphasis="outline">
            Draft
          </Badge>
          <Badge size="sm" tone="danger" dot>
            Offline
          </Badge>
          <Badge size="sm" tone="success" icon={<Icon name="check" />}>
            Verified
          </Badge>
          <Badge size="sm" tone="danger" icon={<Icon name="x" />} aria-label="Failed" />
          <Badge size="sm" tone="danger" emphasis="solid">
            3
          </Badge>
        </Row>
      </div>
      <div>
        <Label>Medium · 24px chip, 14px icon</Label>
        <Row>
          <Badge tone="success">Active</Badge>
          <Badge shape="square" tone="warning">
            Expiring
          </Badge>
          <Badge tone="info" emphasis="outline">
            Draft
          </Badge>
          <Badge tone="danger" dot>
            Offline
          </Badge>
          <Badge tone="success" icon={<Icon name="check" />}>
            Verified
          </Badge>
          <Badge tone="danger" icon={<Icon name="x" />} aria-label="Failed" />
          <Badge tone="danger" emphasis="solid">
            3
          </Badge>
        </Row>
      </div>
      <div>
        <Label>Large · 28px chip, 16px icon</Label>
        <Row>
          <Badge size="lg" tone="success">
            Active
          </Badge>
          <Badge size="lg" shape="square" tone="warning">
            Expiring
          </Badge>
          <Badge size="lg" tone="info" emphasis="outline">
            Draft
          </Badge>
          <Badge size="lg" tone="danger" dot>
            Offline
          </Badge>
          <Badge size="lg" tone="success" icon={<Icon name="check" />}>
            Verified
          </Badge>
          <Badge size="lg" tone="danger" icon={<Icon name="x" />} aria-label="Failed" />
          <Badge size="lg" tone="danger" emphasis="solid">
            3
          </Badge>
        </Row>
      </div>
    </Group>
  ),
};

/** Everything that can sit inside a badge. */
export const Content: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Group>
      <div>
        <Label>Text · icon and text · icon on its own</Label>
        <Row>
          <Badge tone="success">Active</Badge>
          <Badge tone="warning" icon={<Icon name="clock" />}>
            Timed out
          </Badge>
          <Badge tone="danger" icon={<Icon name="x" />} aria-label="Failed" />
          <Badge shape="square" tone="success" icon={<Icon name="check" />} aria-label="Verified" />
        </Row>
      </div>
      <div>
        <Label>A dot for live state — and a dot on its own for the unread marker</Label>
        <Row>
          <Badge tone="success" dot>
            Healthy
          </Badge>
          <Badge tone="warning" dot>
            Degraded
          </Badge>
          <Badge tone="danger" dot>
            Offline
          </Badge>
          <Badge tone="success" dot aria-label="Healthy" />
          <Badge tone="danger" dot aria-label="Offline" />
        </Row>
      </div>
      <div>
        <Label>Counts — and a cap, so a four-figure total cannot stretch a sidebar</Label>
        <Row>
          <Badge tone="danger" emphasis="solid">
            3
          </Badge>
          <Badge tone="neutral" emphasis="solid">
            18
          </Badge>
          <Badge tone="danger" emphasis="solid" max={99}>
            1284
          </Badge>
          <Badge tone="danger" emphasis="solid" max={9}>
            42
          </Badge>
        </Row>
      </div>
      <div>
        <Label>A long label, cut off rather than widening its column</Label>
        <Row>
          <Badge tone="info" truncate>
            Partially reconciled
          </Badge>
          <Badge tone="info">Partially reconciled</Badge>
        </Row>
      </div>
    </Group>
  ),
};

/**
 * Badges never appear alone. This is the same set doing its actual job — the
 * check that matters, because a tone that looks fine on its own can still be
 * wrong beside its neighbours.
 */
export const InPlace: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div className="mdt-w-full mdt-max-w-2xl">
      <table className="mdt-w-full mdt-text-sm">
        <thead>
          <tr className="mdt-border-b mdt-border-border mdt-text-left mdt-text-muted-foreground">
            <th className="mdt-py-2 mdt-font-medium">Integration</th>
            <th className="mdt-py-2 mdt-font-medium">State</th>
            <th className="mdt-py-2 mdt-font-medium">Plan</th>
            <th className="mdt-py-2 mdt-text-right mdt-font-medium">Alerts</th>
          </tr>
        </thead>
        <tbody>
          <tr className="mdt-border-b mdt-border-border">
            <td className="mdt-py-3">Payments gateway</td>
            <td className="mdt-py-3">
              <Badge size="sm" tone="success" dot>
                Healthy
              </Badge>
            </td>
            <td className="mdt-py-3">
              <Badge size="sm" shape="square" tone="neutral">
                Standard
              </Badge>
            </td>
            <td className="mdt-py-3 mdt-text-right mdt-text-muted-foreground">—</td>
          </tr>
          <tr className="mdt-border-b mdt-border-border">
            <td className="mdt-py-3">Identity provider</td>
            <td className="mdt-py-3">
              <Badge size="sm" tone="warning" dot>
                Degraded
              </Badge>
            </td>
            <td className="mdt-py-3">
              <Badge size="sm" shape="square" tone="info">
                Enterprise
              </Badge>
            </td>
            <td className="mdt-py-3 mdt-text-right">
              <Badge size="sm" tone="warning" emphasis="solid">
                7
              </Badge>
            </td>
          </tr>
          <tr className="mdt-border-b mdt-border-border">
            <td className="mdt-py-3">Log forwarder</td>
            <td className="mdt-py-3">
              <Badge size="sm" tone="danger" dot>
                Offline
              </Badge>
            </td>
            <td className="mdt-py-3">
              <Badge size="sm" shape="square" tone="neutral">
                Standard
              </Badge>
            </td>
            <td className="mdt-py-3 mdt-text-right">
              <Badge size="sm" tone="danger" emphasis="solid" max={99}>
                1284
              </Badge>
            </td>
          </tr>
          <tr>
            <td className="mdt-py-3">Anomaly detection</td>
            <td className="mdt-py-3">
              <Badge size="sm" tone="ai" dot>
                Generating
              </Badge>
            </td>
            <td className="mdt-py-3">
              <Badge size="sm" shape="square" tone="ai">
                Beta
              </Badge>
            </td>
            <td className="mdt-py-3 mdt-text-right mdt-text-muted-foreground">—</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

/**
 * Every tone against every emphasis, in one place. This is the page to look at
 * after any change to the colours — in both themes.
 */
export const EveryCombination: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-3">
      {(['neutral', 'info', 'success', 'warning', 'danger', 'ai'] as const).map((tone) => (
        <div key={tone} className="mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-2">
          <span className="mdt-w-16 mdt-text-xs mdt-font-medium mdt-text-muted-foreground">
            {tone}
          </span>
          <Badge tone={tone}>Pill</Badge>
          <Badge tone={tone} shape="square">
            Square
          </Badge>
          <Badge tone={tone} emphasis="outline">
            Outline
          </Badge>
          <Badge tone={tone} emphasis="outline" shape="square">
            Outline
          </Badge>
          <Badge tone={tone} emphasis="solid">
            8
          </Badge>
          <Badge tone={tone} dot>
            Dot
          </Badge>
          <Badge tone={tone} icon={<Icon name="circle" />}>
            Icon
          </Badge>
          <Badge tone={tone} icon={<Icon name="circle" />} aria-label={`${tone} mark`} />
          <Badge tone={tone} dot aria-label={`${tone} state`} />
        </div>
      ))}
    </div>
  ),
};
