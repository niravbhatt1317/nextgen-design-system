import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TagPill } from './TagPill';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';

const meta: Meta<typeof TagPill> = {
  title: 'Components/TagPill',
  component: TagPill,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'A label a person put there and can take away.',
          '',
          '`Badge` is the other half of that pair — a label the *system* applies, which',
          'nobody removes. If nothing about it can be deleted, it is a Badge.',
          '',
          '| Prop | What it does |',
          '| --- | --- |',
          '| `shape` | pill · square |',
          '| `emphasis` | fill (default) · outline — a light inset stroke, no fill, on request |',
          '| `icon` | a 12px mark before the label |',
          '| `avatar` | a 20px person or thing before the label |',
          '| `onRemove` | adds the cross |',
          '| `readOnly` | never yours to remove |',
          '| `disabled` | yours, but not right now |',
          '| `truncate` | cut a long label off |',
          '',
          '**Neutral only, by ruling.** Colour on a chip means the system set it, which makes it',
          "a Badge. A tag is the person's, so it keeps the neutral Badge tint and the eye reads",
          'the two as one family.',
          '',
          "**One size, 28px.** The console's height, corner and left inset; the library's gap, hover",
          'and cross. The × sits in a 16px well with an invisible 24 × 24 pointer target around it.',
          '',
          '**The cross is always visible.** It never appears on hover: there is no hover on',
          'a phone, and a chip that grows to reveal a control shoves its neighbours',
          'sideways while you are aiming at them.',
        ].join('\n'),
      },
    },
    controls: { exclude: ['class'] },
  },
  args: { onRemove: fn() },
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
  args: { children: 'Production' },
};

/**
 * The states carry the whole design here. Hover belongs to the chip; the remove
 * control has its own hover on top of it, so it is clear which of the two you
 * are about to hit. Hover them rather than reading them.
 */
export const States: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: (args) => (
    <Group>
      <div>
        <Label>Removable — hover the chip, then hover the cross</Label>
        <Row>
          <TagPill onRemove={args.onRemove}>Infrastructure</TagPill>
          <TagPill shape="square" onRemove={args.onRemove}>
            Infrastructure
          </TagPill>
        </Row>
      </div>
      <div>
        <Label>Read-only — never yours to remove. No cross, no hover, skipped by Tab</Label>
        <Row>
          <TagPill readOnly>Owned by IAM</TagPill>
          <TagPill shape="square" readOnly>
            Owned by IAM
          </TagPill>
        </Row>
      </div>
      <div>
        <Label>Disabled — yours, but not at this moment. Still visible, still readable</Label>
        <Row>
          <TagPill disabled onRemove={args.onRemove}>
            Infrastructure
          </TagPill>
          <TagPill shape="square" disabled onRemove={args.onRemove}>
            Infrastructure
          </TagPill>
        </Row>
      </div>
      <div>
        <Label>A plain label — nothing to remove, but not read-only either</Label>
        <Row>
          <TagPill>Production</TagPill>
          <TagPill shape="square">Production</TagPill>
        </Row>
      </div>
    </Group>
  ),
};

/** Fill is the default. Outline clears the fill and draws a light inset stroke; nothing moves. */
export const Emphasis: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: (args) => (
    <Group>
      <div>
        <Label>Fill — the default, the same neutral as a Badge</Label>
        <Row>
          <TagPill onRemove={args.onRemove}>Production</TagPill>
          <TagPill shape="square" onRemove={args.onRemove}>
            Production
          </TagPill>
          <TagPill readOnly>Owned by IAM</TagPill>
        </Row>
      </div>
      <div>
        <Label>Outline — on request, never by default</Label>
        <Row>
          <TagPill emphasis="outline" onRemove={args.onRemove}>
            Production
          </TagPill>
          <TagPill emphasis="outline" shape="square" onRemove={args.onRemove}>
            Production
          </TagPill>
          <TagPill emphasis="outline" readOnly>
            Owned by IAM
          </TagPill>
        </Row>
      </div>
    </Group>
  ),
};

/**
 * A pill reads as an object sitting on the page. A square sits into a column of
 * data more quietly.
 */
export const Shapes: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: (args) => (
    <Group>
      <div>
        <Label>Pill</Label>
        <Row>
          <TagPill onRemove={args.onRemove}>Production</TagPill>
          <TagPill icon={<Icon name="tag" />} onRemove={args.onRemove}>
            Platform
          </TagPill>
          <TagPill avatar={<Avatar name="Nirav Bhatt" size="xs" />} onRemove={args.onRemove}>
            Nirav Bhatt
          </TagPill>
        </Row>
      </div>
      <div>
        <Label>Square — the avatar takes the matching corner</Label>
        <Row>
          <TagPill shape="square" onRemove={args.onRemove}>
            Production
          </TagPill>
          <TagPill shape="square" icon={<Icon name="tag" />} onRemove={args.onRemove}>
            Platform
          </TagPill>
          <TagPill
            shape="square"
            avatar={<Avatar name="Nirav Bhatt" size="xs" shape="rounded" />}
            onRemove={args.onRemove}
          >
            Nirav Bhatt
          </TagPill>
        </Row>
      </div>
    </Group>
  ),
};

/**
 * Two different things share the leading slot, and they need different
 * treatment. An icon is a line drawing that carries its own air, so it sits
 * small and 10px in. An avatar is a filled circle with none at all, so it runs
 * nearly the chip's full height and sits 2px in.
 *
 * Measured from the ink rather than the boxes, a tag with an icon comes out at
 * 12px of air on each side.
 */
export const LeadingSlot: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: (args) => (
    <Group>
      <div>
        <Label>Nothing · icon at 12px · avatar at 20px</Label>
        <Row>
          <TagPill onRemove={args.onRemove}>Production</TagPill>
          <TagPill icon={<Icon name="tag" />} onRemove={args.onRemove}>
            Platform
          </TagPill>
          <TagPill avatar={<Avatar name="Nirav Bhatt" size="xs" />} onRemove={args.onRemove}>
            Nirav Bhatt
          </TagPill>
        </Row>
      </div>
      <div>
        <Label>A row of people, an icon and a plain word — the left edges line up</Label>
        <Row>
          <TagPill avatar={<Avatar name="Nirav Bhatt" size="xs" />} onRemove={args.onRemove}>
            Nirav Bhatt
          </TagPill>
          <TagPill avatar={<Avatar name="Om Vekariya" size="xs" />} onRemove={args.onRemove}>
            Om Vekariya
          </TagPill>
          <TagPill avatar={<Avatar name="Kaivalya Pandit" size="xs" />} onRemove={args.onRemove}>
            Kaivalya Pandit
          </TagPill>
          <TagPill icon={<Icon name="tag" />} onRemove={args.onRemove}>
            Platform
          </TagPill>
          <TagPill onRemove={args.onRemove}>Production</TagPill>
        </Row>
      </div>
    </Group>
  ),
};

/**
 * A tag's text is written by a person, so its length is not yours to control.
 * With `truncate` it cuts off rather than stretching whatever holds it.
 */
export const LongLabels: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: (args) => (
    <div className="mdt-flex mdt-flex-col mdt-items-start mdt-gap-3">
      <TagPill truncate onRemove={args.onRemove}>
        Infrastructure and platform
      </TagPill>
      <TagPill onRemove={args.onRemove}>Infrastructure and platform</TagPill>
      <p className="mdt-text-xs mdt-text-muted-foreground">Cut off above, loose below.</p>
    </div>
  ),
};

/**
 * Tags almost never appear alone. This is the honest check — spacing that looks
 * fine on one chip can still be wrong beside its neighbours.
 */
export const InPlace: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: (args) => (
    <div className="mdt-flex mdt-w-full mdt-max-w-xl mdt-flex-col mdt-gap-3">
      <p className="mdt-text-xs mdt-text-muted-foreground">Applied to payments-gateway</p>
      <Row>
        <TagPill icon={<Icon name="tag" />} onRemove={args.onRemove}>
          Infrastructure
        </TagPill>
        <TagPill onRemove={args.onRemove}>Production</TagPill>
        <TagPill avatar={<Avatar name="Nirav Bhatt" size="xs" />} onRemove={args.onRemove}>
          Nirav Bhatt
        </TagPill>
        <TagPill truncate onRemove={args.onRemove}>
          Needs security review
        </TagPill>
        <TagPill readOnly>Owned by IAM</TagPill>
      </Row>
      <p className="mdt-text-xs mdt-text-muted-foreground">
        The last one is read-only — applied by a policy, not by a person, so there is nothing to
        remove.
      </p>
    </div>
  ),
};
