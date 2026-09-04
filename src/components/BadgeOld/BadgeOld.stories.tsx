import type { Meta, StoryObj } from '@storybook/react-vite';
import { BadgeOld } from './BadgeOld';
import { Icon } from '../Icon';

const meta: Meta<typeof BadgeOld> = {
  title: 'Deprecated/Badge Old',
  component: BadgeOld,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    status: {
      type: 'deprecated',
      since: '0.4.0',
      deprecation: {
        deprecatedSince: '0.4.0',
        removalIn: '1.0.0',
        replacement: 'Badge',
        message:
          'The Badge ported from the merged console replaced this one on 4 September 2026: the same spacing, the console colours, no stroke by default. It stays for side-by-side comparison until the removal pull request.',
      },
    },
    docs: {
      description: {
        component: [
          '## ⚠️ Deprecated — use `Badge`',
          '',
          '`Badge` is now the badge ported from the merged console: the same three sizes, the',
          'console colours, no stroke by default, `slate` and `inverse` tones, `palette` for category',
          'colours and a × for filter chips. This is the earlier version, kept so the two can be',
          'reviewed side by side. `emphasis="subtle"` there is `emphasis="fill"` here.',
          '',
          '**Do not start anything new on it.**',
          '',
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
          <BadgeOld tone="neutral">Draft</BadgeOld>
          <BadgeOld tone="info">Reviewing</BadgeOld>
          <BadgeOld tone="success">Active</BadgeOld>
          <BadgeOld tone="warning">Expiring</BadgeOld>
          <BadgeOld tone="danger">Failed</BadgeOld>
          <BadgeOld tone="ai">AI</BadgeOld>
        </Row>
      </div>
      <div>
        <Label>Outline — no fill; the edge and the label carry the tone</Label>
        <Row>
          <BadgeOld tone="neutral" emphasis="outline">
            Draft
          </BadgeOld>
          <BadgeOld tone="info" emphasis="outline">
            Reviewing
          </BadgeOld>
          <BadgeOld tone="success" emphasis="outline">
            Active
          </BadgeOld>
          <BadgeOld tone="warning" emphasis="outline">
            Expiring
          </BadgeOld>
          <BadgeOld tone="danger" emphasis="outline">
            Failed
          </BadgeOld>
          <BadgeOld tone="ai" emphasis="outline">
            AI
          </BadgeOld>
        </Row>
      </div>
      <div>
        <Label>Solid — counts only. Not for status labels</Label>
        <Row>
          <BadgeOld tone="neutral" emphasis="solid">
            12
          </BadgeOld>
          <BadgeOld tone="info" emphasis="solid">
            4
          </BadgeOld>
          <BadgeOld tone="success" emphasis="solid">
            9
          </BadgeOld>
          <BadgeOld tone="warning" emphasis="solid">
            7
          </BadgeOld>
          <BadgeOld tone="danger" emphasis="solid">
            3
          </BadgeOld>
          <BadgeOld tone="ai" emphasis="solid">
            2
          </BadgeOld>
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
          <BadgeOld tone="neutral">Draft</BadgeOld>
          <BadgeOld tone="info">Reviewing</BadgeOld>
          <BadgeOld tone="success">Active</BadgeOld>
          <BadgeOld tone="warning">Expiring</BadgeOld>
          <BadgeOld tone="danger">Failed</BadgeOld>
          <BadgeOld tone="ai">AI</BadgeOld>
        </Row>
      </div>
      <div>
        <Label>Square</Label>
        <Row>
          <BadgeOld shape="square" tone="neutral">
            Draft
          </BadgeOld>
          <BadgeOld shape="square" tone="info">
            Reviewing
          </BadgeOld>
          <BadgeOld shape="square" tone="success">
            Active
          </BadgeOld>
          <BadgeOld shape="square" tone="warning">
            Expiring
          </BadgeOld>
          <BadgeOld shape="square" tone="danger">
            Failed
          </BadgeOld>
          <BadgeOld shape="square" tone="ai">
            AI
          </BadgeOld>
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
          <BadgeOld size="sm" tone="success">
            Active
          </BadgeOld>
          <BadgeOld size="sm" shape="square" tone="warning">
            Expiring
          </BadgeOld>
          <BadgeOld size="sm" tone="info" emphasis="outline">
            Draft
          </BadgeOld>
          <BadgeOld size="sm" tone="danger" dot>
            Offline
          </BadgeOld>
          <BadgeOld size="sm" tone="success" icon={<Icon name="check" />}>
            Verified
          </BadgeOld>
          <BadgeOld size="sm" tone="danger" icon={<Icon name="x" />} aria-label="Failed" />
          <BadgeOld size="sm" tone="danger" emphasis="solid">
            3
          </BadgeOld>
        </Row>
      </div>
      <div>
        <Label>Medium · 24px chip, 14px icon</Label>
        <Row>
          <BadgeOld tone="success">Active</BadgeOld>
          <BadgeOld shape="square" tone="warning">
            Expiring
          </BadgeOld>
          <BadgeOld tone="info" emphasis="outline">
            Draft
          </BadgeOld>
          <BadgeOld tone="danger" dot>
            Offline
          </BadgeOld>
          <BadgeOld tone="success" icon={<Icon name="check" />}>
            Verified
          </BadgeOld>
          <BadgeOld tone="danger" icon={<Icon name="x" />} aria-label="Failed" />
          <BadgeOld tone="danger" emphasis="solid">
            3
          </BadgeOld>
        </Row>
      </div>
      <div>
        <Label>Large · 28px chip, 16px icon</Label>
        <Row>
          <BadgeOld size="lg" tone="success">
            Active
          </BadgeOld>
          <BadgeOld size="lg" shape="square" tone="warning">
            Expiring
          </BadgeOld>
          <BadgeOld size="lg" tone="info" emphasis="outline">
            Draft
          </BadgeOld>
          <BadgeOld size="lg" tone="danger" dot>
            Offline
          </BadgeOld>
          <BadgeOld size="lg" tone="success" icon={<Icon name="check" />}>
            Verified
          </BadgeOld>
          <BadgeOld size="lg" tone="danger" icon={<Icon name="x" />} aria-label="Failed" />
          <BadgeOld size="lg" tone="danger" emphasis="solid">
            3
          </BadgeOld>
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
          <BadgeOld tone="success">Active</BadgeOld>
          <BadgeOld tone="warning" icon={<Icon name="clock" />}>
            Timed out
          </BadgeOld>
          <BadgeOld tone="danger" icon={<Icon name="x" />} aria-label="Failed" />
          <BadgeOld
            shape="square"
            tone="success"
            icon={<Icon name="check" />}
            aria-label="Verified"
          />
        </Row>
      </div>
      <div>
        <Label>A dot for live state — and a dot on its own for the unread marker</Label>
        <Row>
          <BadgeOld tone="success" dot>
            Healthy
          </BadgeOld>
          <BadgeOld tone="warning" dot>
            Degraded
          </BadgeOld>
          <BadgeOld tone="danger" dot>
            Offline
          </BadgeOld>
          <BadgeOld tone="success" dot aria-label="Healthy" />
          <BadgeOld tone="danger" dot aria-label="Offline" />
        </Row>
      </div>
      <div>
        <Label>Counts — and a cap, so a four-figure total cannot stretch a sidebar</Label>
        <Row>
          <BadgeOld tone="danger" emphasis="solid">
            3
          </BadgeOld>
          <BadgeOld tone="neutral" emphasis="solid">
            18
          </BadgeOld>
          <BadgeOld tone="danger" emphasis="solid" max={99}>
            1284
          </BadgeOld>
          <BadgeOld tone="danger" emphasis="solid" max={9}>
            42
          </BadgeOld>
        </Row>
      </div>
      <div>
        <Label>
          A long label, cut off rather than widening its column — truncated above, loose below
        </Label>
        <div className="mdt-flex mdt-flex-col mdt-items-start mdt-gap-2">
          <BadgeOld tone="info" truncate>
            Partially reconciled, pending review
          </BadgeOld>
          <BadgeOld tone="info">Partially reconciled, pending review</BadgeOld>
        </div>
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
              <BadgeOld size="sm" tone="success" dot>
                Healthy
              </BadgeOld>
            </td>
            <td className="mdt-py-3">
              <BadgeOld size="sm" shape="square" tone="neutral">
                Standard
              </BadgeOld>
            </td>
            <td className="mdt-py-3 mdt-text-right mdt-text-muted-foreground">—</td>
          </tr>
          <tr className="mdt-border-b mdt-border-border">
            <td className="mdt-py-3">Identity provider</td>
            <td className="mdt-py-3">
              <BadgeOld size="sm" tone="warning" dot>
                Degraded
              </BadgeOld>
            </td>
            <td className="mdt-py-3">
              <BadgeOld size="sm" shape="square" tone="info">
                Enterprise
              </BadgeOld>
            </td>
            <td className="mdt-py-3 mdt-text-right">
              <BadgeOld size="sm" tone="warning" emphasis="solid">
                7
              </BadgeOld>
            </td>
          </tr>
          <tr className="mdt-border-b mdt-border-border">
            <td className="mdt-py-3">Log forwarder</td>
            <td className="mdt-py-3">
              <BadgeOld size="sm" tone="danger" dot>
                Offline
              </BadgeOld>
            </td>
            <td className="mdt-py-3">
              <BadgeOld size="sm" shape="square" tone="neutral">
                Standard
              </BadgeOld>
            </td>
            <td className="mdt-py-3 mdt-text-right">
              <BadgeOld size="sm" tone="danger" emphasis="solid" max={99}>
                1284
              </BadgeOld>
            </td>
          </tr>
          <tr>
            <td className="mdt-py-3">Anomaly detection</td>
            <td className="mdt-py-3">
              <BadgeOld size="sm" tone="ai" dot>
                Generating
              </BadgeOld>
            </td>
            <td className="mdt-py-3">
              <BadgeOld size="sm" shape="square" tone="ai">
                Beta
              </BadgeOld>
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
          <BadgeOld tone={tone}>Pill</BadgeOld>
          <BadgeOld tone={tone} shape="square">
            Square
          </BadgeOld>
          <BadgeOld tone={tone} emphasis="outline">
            Outline
          </BadgeOld>
          <BadgeOld tone={tone} emphasis="outline" shape="square">
            Outline
          </BadgeOld>
          <BadgeOld tone={tone} emphasis="solid">
            8
          </BadgeOld>
          <BadgeOld tone={tone} dot>
            Dot
          </BadgeOld>
          <BadgeOld tone={tone} icon={<Icon name="circle" />}>
            Icon
          </BadgeOld>
          <BadgeOld tone={tone} icon={<Icon name="circle" />} aria-label={`${tone} mark`} />
          <BadgeOld tone={tone} dot aria-label={`${tone} state`} />
        </div>
      ))}
    </div>
  ),
};
