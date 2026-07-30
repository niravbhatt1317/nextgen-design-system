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
          'badges, tinted protocol pills, and the bare icon+text label.',
          '',
          '| Prop | Values |',
          '| --- | --- |',
          '| `tone` | neutral · success · warning · danger · info · purple |',
          '| `shape` | pill · tag · bare |',
          '| `size` | sm · md · lg |',
          '| `dot` | on / off |',
          '',
          '**Tones are named by meaning, not colour.** `tone="danger"` still reads',
          'correctly if the brand red changes, and it tells a reader what the badge is',
          'for. `red` tells them neither.',
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

/** Six tones, each named for what it means. */
export const Tones: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Group>
      <div>
        <Label>Meaning, not colour</Label>
        <Row>
          <Badge tone="neutral">Neutral</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="danger">Danger</Badge>
          <Badge tone="info">Info</Badge>
          <Badge tone="purple">Purple</Badge>
        </Row>
      </div>
      <div>
        <Label>What each is for</Label>
        <Row>
          <Badge tone="neutral">Draft</Badge>
          <Badge tone="success">Verified</Badge>
          <Badge tone="warning">Expiring soon</Badge>
          <Badge tone="danger">Failed</Badge>
          <Badge tone="info">12 users</Badge>
          <Badge tone="purple">AI managed</Badge>
        </Row>
      </div>
    </Group>
  ),
};

/** Three outlines for three jobs. */
export const Shapes: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Group>
      <div>
        <Label>pill — lifecycle and status</Label>
        <Row>
          <Badge shape="pill" tone="success" dot>
            Active
          </Badge>
          <Badge shape="pill" tone="neutral" dot>
            Dormant
          </Badge>
          <Badge shape="pill" tone="danger" dot>
            Expired
          </Badge>
        </Row>
      </div>
      <div>
        <Label>tag — tags, counts and metadata</Label>
        <Row>
          <Badge shape="tag" tone="neutral">
            production
          </Badge>
          <Badge shape="tag" tone="info">
            3 users
          </Badge>
          <Badge shape="tag" tone="purple">
            Direct
          </Badge>
        </Row>
      </div>
      <div>
        <Label>bare — no background, for dense table cells</Label>
        <Row>
          <Badge shape="bare" tone="success" icon={<Icon name="check-circle" size="sm" />}>
            Connected
          </Badge>
          <Badge shape="bare" tone="danger" icon={<Icon name="x-circle" size="sm" />}>
            Timed out
          </Badge>
        </Row>
      </div>
    </Group>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Row>
      <Badge size="sm" tone="success" dot>
        Small
      </Badge>
      <Badge size="md" tone="success" dot>
        Medium
      </Badge>
      <Badge size="lg" tone="success" dot>
        Large
      </Badge>
    </Row>
  ),
};

/** The dot marks a live state. Every tone carries its own. */
export const WithDot: Story = {
  name: 'With a dot',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Row>
      <Badge tone="success" dot>
        Active
      </Badge>
      <Badge tone="warning" dot>
        Suspended
      </Badge>
      <Badge tone="danger" dot>
        Offboarded
      </Badge>
      <Badge tone="neutral" dot>
        Never connected
      </Badge>
    </Row>
  ),
};

/**
 * A count badge is not a separate component. Each size sets a minimum width
 * equal to its height, so a short number stays compact and round-ended rather
 * than collapsing into a sliver, while a word-length label is unaffected.
 */
export const Counts: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Group>
      <div>
        <Label>Counts — a short number stays compact</Label>
        <Row>
          <Badge tone="info">3</Badge>
          <Badge tone="info">12</Badge>
          <Badge tone="info">148</Badge>
          <Badge tone="danger">9</Badge>
          <Badge tone="neutral">+2</Badge>
        </Row>
      </div>
      <div>
        <Label>At every size</Label>
        <Row>
          <Badge size="sm" tone="danger">
            3
          </Badge>
          <Badge size="md" tone="danger">
            3
          </Badge>
          <Badge size="lg" tone="danger">
            3
          </Badge>
        </Row>
      </div>
      <div>
        <Label>Overflow chip, next to what it counts</Label>
        <Row>
          <Badge shape="tag" tone="neutral">
            production
          </Badge>
          <Badge shape="tag" tone="neutral">
            eu-west
          </Badge>
          <Badge tone="neutral">+4</Badge>
        </Row>
      </div>
    </Group>
  ),
};

export const WithIcon: Story = {
  name: 'With an icon',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Row>
      <Badge tone="info" icon={<Icon name="lock" size="sm" />}>
        SSH
      </Badge>
      <Badge tone="purple" icon={<Icon name="sparkles" size="sm" />}>
        AI managed
      </Badge>
      <Badge shape="tag" tone="warning" icon={<Icon name="clock" size="sm" />}>
        Pending
      </Badge>
    </Row>
  ),
};

/** Every job the five original components did, now from one atom. */
export const Matrix: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const tones = ['neutral', 'success', 'warning', 'danger', 'info', 'purple'] as const;
    const shapes = ['pill', 'tag', 'bare'] as const;
    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-5">
        {shapes.map((shape) => (
          <div key={shape}>
            <Label>{shape}</Label>
            <Row>
              {tones.map((tone) => (
                <Badge key={tone} shape={shape} tone={tone} dot={shape === 'pill'}>
                  {tone}
                </Badge>
              ))}
            </Row>
          </div>
        ))}
      </div>
    );
  },
};
