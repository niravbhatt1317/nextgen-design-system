import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconTile } from './IconTile';
import { Icon } from '../Icon';

const meta: Meta<typeof IconTile> = {
  title: 'Components/IconTile',
  component: IconTile,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A tinted container holding a single icon.',
          '',
          "Org Mgmt's audit calls this **the most duplicated inline pattern** in that system,",
          'and records what leaving it inline cost: the warning foreground alternates between',
          'two values, the success background between two more, and some sites reference',
          'tokens that do not exist at all.',
          '',
          'Tones match `Avatar`, so a tile and an avatar side by side agree on what green means.',
          '',
          'Leave `aria-label` off and the tile is hidden from screen readers — right when the',
          'icon only decorates something already labelled beside it.',
        ].join('\n'),
      },
    },
  },
  args: { icon: <Icon name="server" />, tone: 'blue' },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-3">{children}</div>
);

const Group = ({ children }: { children: React.ReactNode }) => (
  <div className="mdt-flex mdt-flex-col mdt-gap-6">{children}</div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="mdt-mb-2 mdt-text-xs mdt-font-medium mdt-text-muted-foreground">{children}</p>
);

export const Default: Story = {};

export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      <IconTile icon={<Icon name="server" />} tone="slate" />
      <IconTile icon={<Icon name="database" />} tone="blue" />
      <IconTile icon={<Icon name="check-circle" />} tone="green" />
      <IconTile icon={<Icon name="alert-triangle" />} tone="amber" />
      <IconTile icon={<Icon name="x-circle" />} tone="rose" />
      <IconTile icon={<Icon name="sparkles" />} tone="purple" />
    </Row>
  ),
};

export const Shapes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Group>
      <div>
        <Label>square</Label>
        <Row>
          <IconTile icon={<Icon name="server" />} tone="blue" shape="square" />
          <IconTile icon={<Icon name="check-circle" />} tone="green" shape="square" />
          <IconTile icon={<Icon name="alert-triangle" />} tone="amber" shape="square" />
        </Row>
      </div>
      <div>
        <Label>circle</Label>
        <Row>
          <IconTile icon={<Icon name="server" />} tone="blue" shape="circle" />
          <IconTile icon={<Icon name="check-circle" />} tone="green" shape="circle" />
          <IconTile icon={<Icon name="alert-triangle" />} tone="amber" shape="circle" />
        </Row>
      </div>
    </Group>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Group>
      <div>
        <Label>square</Label>
        <Row>
          <IconTile icon={<Icon name="server" size="xs" />} tone="blue" size="sm" />
          <IconTile icon={<Icon name="server" size="sm" />} tone="blue" size="md" />
          <IconTile icon={<Icon name="server" size="md" />} tone="blue" size="lg" />
          <IconTile icon={<Icon name="server" size="lg" />} tone="blue" size="xl" />
        </Row>
      </div>
      <div>
        <Label>circle</Label>
        <Row>
          <IconTile
            icon={<Icon name="server" size="xs" />}
            tone="purple"
            shape="circle"
            size="sm"
          />
          <IconTile
            icon={<Icon name="server" size="sm" />}
            tone="purple"
            shape="circle"
            size="md"
          />
          <IconTile
            icon={<Icon name="server" size="md" />}
            tone="purple"
            shape="circle"
            size="lg"
          />
          <IconTile
            icon={<Icon name="server" size="lg" />}
            tone="purple"
            shape="circle"
            size="xl"
          />
        </Row>
      </div>
    </Group>
  ),
};

/** Next to an avatar, to show the palettes agree. */
export const AlongsideContent: Story = {
  name: 'Alongside content',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-flex mdt-w-96 mdt-flex-col mdt-gap-3">
      {[
        { icon: 'server', tone: 'blue', title: 'prod-db-01', meta: '10.4.22.9' },
        { icon: 'check-circle', tone: 'green', title: 'Backup complete', meta: '2 minutes ago' },
        { icon: 'alert-triangle', tone: 'amber', title: 'Certificate expiring', meta: 'in 6 days' },
      ].map((r) => (
        <div
          key={r.title}
          className="mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-md mdt-border mdt-border-border mdt-p-3"
        >
          <IconTile
            icon={<Icon name={r.icon as 'server'} size="sm" />}
            tone={r.tone as 'blue'}
            size="lg"
          />
          <div className="mdt-flex mdt-flex-col">
            <span className="mdt-text-sm mdt-font-medium mdt-text-foreground">{r.title}</span>
            <span className="mdt-text-xs mdt-text-muted-foreground">{r.meta}</span>
          </div>
        </div>
      ))}
    </div>
  ),
};
