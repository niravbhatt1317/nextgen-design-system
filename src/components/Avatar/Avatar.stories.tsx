import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import { AvatarStack } from './AvatarStack';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'A person or thing, as a photo or their initials.',
          '',
          '| Prop | Values |',
          '| --- | --- |',
          '| `shape` | circle · rounded |',
          '| `size` | xs · sm · md · lg · xl |',
          '| `tone` | slate · blue · green · amber · rose · purple |',
          '',
          'Both shapes come from the source systems: Org Mgmt and Agent Fleet render',
          'circles, IAM renders rounded squares.',
          '',
          '**Leave `tone` unset and the colour is derived from the name**, so one person is',
          "always one colour. IAM's audit records the failure this avoids — its palette is",
          'assigned per row rather than per identity, so the same person appears in two',
          'different colours on two different screens.',
        ].join('\n'),
      },
    },
  },
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

const PEOPLE = ['Sarah Johnson', 'Ravi Patel', 'Mei Chen', 'Tom Green', 'Ana Silva', 'Ken Watts'];

export const Default: Story = {
  args: { name: 'Sarah Johnson' },
};

/** Circles and rounded squares. Both are in use across the source systems. */
export const Shapes: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Group>
      <div>
        <Label>circle — Org Mgmt and Agent Fleet</Label>
        <Row>
          {PEOPLE.slice(0, 4).map((n) => (
            <Avatar key={n} name={n} shape="circle" />
          ))}
        </Row>
      </div>
      <div>
        <Label>rounded — IAM</Label>
        <Row>
          {PEOPLE.slice(0, 4).map((n) => (
            <Avatar key={n} name={n} shape="rounded" />
          ))}
        </Row>
      </div>
      <div>
        <Label>Both, at every size</Label>
        <Row>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <Avatar key={s} name="Sarah Johnson" size={s} shape="circle" />
          ))}
          <span className="mdt-w-4" />
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <Avatar key={s} name="Sarah Johnson" size={s} shape="rounded" />
          ))}
        </Row>
      </div>
    </Group>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Row>
      <Avatar name="Sarah Johnson" size="xs" />
      <Avatar name="Sarah Johnson" size="sm" />
      <Avatar name="Sarah Johnson" size="md" />
      <Avatar name="Sarah Johnson" size="lg" />
      <Avatar name="Sarah Johnson" size="xl" />
    </Row>
  ),
};

/** Six tones. Set one explicitly, or let the name choose. */
export const Tones: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Group>
      <div>
        <Label>Explicit</Label>
        <Row>
          {(['slate', 'blue', 'green', 'amber', 'rose', 'purple'] as const).map((t) => (
            <Avatar key={t} name={t} tone={t} size="lg" />
          ))}
        </Row>
      </div>
      <div>
        <Label>Derived from the name — the same person is always the same colour</Label>
        <Row>
          {PEOPLE.map((n) => (
            <Avatar key={n} name={n} size="lg" />
          ))}
        </Row>
      </div>
      <div>
        <Label>Sarah Johnson, rendered three times — identical every time</Label>
        <Row>
          <Avatar name="Sarah Johnson" size="lg" />
          <Avatar name="Sarah Johnson" size="lg" />
          <Avatar name="Sarah Johnson" size="lg" />
        </Row>
      </div>
    </Group>
  ),
};

/** A photo when there is one; initials when there isn't, or when it fails. */
export const WithPhoto: Story = {
  name: 'With a photo',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Group>
      <div>
        <Label>Photo</Label>
        <Row>
          <Avatar
            name="Sarah Johnson"
            size="lg"
            src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%233d7dff'/%3E%3Ccircle cx='40' cy='30' r='14' fill='%23fff'/%3E%3Cellipse cx='40' cy='68' rx='24' ry='18' fill='%23fff'/%3E%3C/svg%3E"
          />
          <Avatar
            name="Sarah Johnson"
            size="lg"
            shape="rounded"
            src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%2337b97d'/%3E%3Ccircle cx='40' cy='30' r='14' fill='%23fff'/%3E%3Cellipse cx='40' cy='68' rx='24' ry='18' fill='%23fff'/%3E%3C/svg%3E"
          />
        </Row>
      </div>
      <div>
        <Label>Broken image — falls back to initials rather than an empty box</Label>
        <Row>
          <Avatar name="Sarah Johnson" size="lg" src="https://example.invalid/missing.png" />
        </Row>
      </div>
    </Group>
  ),
};

/** Overlapping, with the rest collapsed into a count. */
export const Stack: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Group>
      <div>
        <Label>Default — shows 4, collapses the rest</Label>
        <AvatarStack>
          {PEOPLE.map((n) => (
            <Avatar key={n} name={n} />
          ))}
        </AvatarStack>
      </div>
      <div>
        <Label>Showing 3</Label>
        <AvatarStack max={3}>
          {PEOPLE.map((n) => (
            <Avatar key={n} name={n} />
          ))}
        </AvatarStack>
      </div>
      <div>
        <Label>Rounded, large</Label>
        <AvatarStack max={4} size="lg" shape="rounded">
          {PEOPLE.map((n) => (
            <Avatar key={n} name={n} />
          ))}
        </AvatarStack>
      </div>
      <div>
        <Label>Nothing hidden — no chip</Label>
        <AvatarStack max={6}>
          {PEOPLE.slice(0, 3).map((n) => (
            <Avatar key={n} name={n} />
          ))}
        </AvatarStack>
      </div>
      <div>
        <Label>Every size</Label>
        <div className="mdt-flex mdt-flex-col mdt-gap-3">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <AvatarStack key={s} size={s} max={4}>
              {PEOPLE.map((n) => (
                <Avatar key={n} name={n} />
              ))}
            </AvatarStack>
          ))}
        </div>
      </div>
    </Group>
  ),
};
