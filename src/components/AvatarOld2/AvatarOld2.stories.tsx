import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarOld2 } from './AvatarOld2';
import { AvatarStackOld2 } from './AvatarStackOld2';

const meta: Meta<typeof AvatarOld2> = {
  title: 'Deprecated 2/Avatar Old',
  component: AvatarOld2,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    status: {
      type: 'deprecated',
      since: '0.5.1',
      deprecation: {
        deprecatedSince: '0.5.1',
        removalIn: 'to be set by Nirav',
        replacement: 'Avatar',
        message:
          'The Avatar as it was before 21 September 2026. Deprecated 2026-09-22 when Pranjal ruled the new one in; kept for side-by-side review; Nirav sets the removal version.',
      },
    },
    docs: {
      description: {
        component: [
          '## ⚠️ Deprecated — use `Avatar`',
          '',
          'The Avatar as it was before 21 September 2026. Deprecated 2026-09-22 when Pranjal',
          'ruled the new one in; kept for side-by-side review; Nirav sets the removal version.',
          '',
          '**Do not start anything new on it.**',
          '',
          'A person or thing, as a photo or their initials.',
          '',
          '| Prop | Values |',
          '| --- | --- |',
          '| `shape` | circle · rounded |',
          '| `size` | xs · sm · md · lg · xl |',
          '| `tone` | slate · blue · green · amber · rose · purple |',
          '',
          '**Leave `tone` unset and the colour is derived from the name**, so one person is',
          'always one colour. `AvatarStackOld2` overlaps them with a "+N" chip for the rest.',
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
            <AvatarOld2 key={n} name={n} shape="circle" />
          ))}
        </Row>
      </div>
      <div>
        <Label>rounded — IAM</Label>
        <Row>
          {PEOPLE.slice(0, 4).map((n) => (
            <AvatarOld2 key={n} name={n} shape="rounded" />
          ))}
        </Row>
      </div>
      <div>
        <Label>Both, at every size</Label>
        <Row>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <AvatarOld2 key={s} name="Sarah Johnson" size={s} shape="circle" />
          ))}
          <span className="mdt-w-4" />
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <AvatarOld2 key={s} name="Sarah Johnson" size={s} shape="rounded" />
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
      <AvatarOld2 name="Sarah Johnson" size="xs" />
      <AvatarOld2 name="Sarah Johnson" size="sm" />
      <AvatarOld2 name="Sarah Johnson" size="md" />
      <AvatarOld2 name="Sarah Johnson" size="lg" />
      <AvatarOld2 name="Sarah Johnson" size="xl" />
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
            <AvatarOld2 key={t} name={t} tone={t} size="lg" />
          ))}
        </Row>
      </div>
      <div>
        <Label>Derived from the name — the same person is always the same colour</Label>
        <Row>
          {PEOPLE.map((n) => (
            <AvatarOld2 key={n} name={n} size="lg" />
          ))}
        </Row>
      </div>
      <div>
        <Label>Sarah Johnson, rendered three times — identical every time</Label>
        <Row>
          <AvatarOld2 name="Sarah Johnson" size="lg" />
          <AvatarOld2 name="Sarah Johnson" size="lg" />
          <AvatarOld2 name="Sarah Johnson" size="lg" />
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
          <AvatarOld2
            name="Sarah Johnson"
            size="lg"
            src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%233d7dff'/%3E%3Ccircle cx='40' cy='30' r='14' fill='%23fff'/%3E%3Cellipse cx='40' cy='68' rx='24' ry='18' fill='%23fff'/%3E%3C/svg%3E"
          />
          <AvatarOld2
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
          <AvatarOld2 name="Sarah Johnson" size="lg" src="https://example.invalid/missing.png" />
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
        <AvatarStackOld2>
          {PEOPLE.map((n) => (
            <AvatarOld2 key={n} name={n} />
          ))}
        </AvatarStackOld2>
      </div>
      <div>
        <Label>Showing 3</Label>
        <AvatarStackOld2 max={3}>
          {PEOPLE.map((n) => (
            <AvatarOld2 key={n} name={n} />
          ))}
        </AvatarStackOld2>
      </div>
      <div>
        <Label>Rounded, large</Label>
        <AvatarStackOld2 max={4} size="lg" shape="rounded">
          {PEOPLE.map((n) => (
            <AvatarOld2 key={n} name={n} />
          ))}
        </AvatarStackOld2>
      </div>
      <div>
        <Label>Nothing hidden — no chip</Label>
        <AvatarStackOld2 max={6}>
          {PEOPLE.slice(0, 3).map((n) => (
            <AvatarOld2 key={n} name={n} />
          ))}
        </AvatarStackOld2>
      </div>
      <div>
        <Label>Every size</Label>
        <div className="mdt-flex mdt-flex-col mdt-gap-3">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <AvatarStackOld2 key={s} size={s} max={4}>
              {PEOPLE.map((n) => (
                <AvatarOld2 key={n} name={n} />
              ))}
            </AvatarStackOld2>
          ))}
        </div>
      </div>
    </Group>
  ),
};
