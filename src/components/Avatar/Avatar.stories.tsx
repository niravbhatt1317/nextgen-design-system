import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import { AvatarStack } from './AvatarStack';
import { Icon } from '@/components/Icon';

const meta: Meta<typeof Avatar> = {
  title: 'New Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'A person or a thing, as a photo, **one letter**, or an icon.',
          '',
          '| Prop | Values |',
          '| --- | --- |',
          '| `shape` | circle · rounded — left unset it follows the content: a letter or a photo is a circle, an icon a rounded square |',
          '| `size` | xs 20 · sm 24 · md 32 · lg 40 · xl 56 |',
          '| `tone` | slate · blue · green · amber · rose · purple |',
          '| `icon` | a thing rather than a person — the glyph sizes itself: 12 · 14 · 16 · 20 · 24 |',
          '| `logo` | a logo that fills the square edge to edge, no ground; the letter stands when there is none |',
          '| `status` | active · suspended · offboarded — a dot on the bottom-right corner, ringed in the card colour |',
          '| `onEdit` | a camera button on the corner; opens the file picker and hands back the chosen image |',
          '',
          'Ruled on the avatar mock (Pranjal, 2026-09-20 → 21): **one letter at every size**; the type a',
          'step smaller than the scale (11 · 11 · 12 · 16 · 18); **a person is a circle, a thing is a',
          "square**; the square's corners are 6, and 12 at xl; a photo falls back to the letter.",
          '',
          '**Leave `tone` unset and the colour is derived from the name**, so one person is',
          'always one colour — and never slate, which keeps to the +N chip, to a thing, and to an',
          "avatar with no name. IAM's audit records the failure this avoids: a palette assigned per",
          'row rather than per identity, so the same person appears in two colours on two screens.',
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

/** A person is a circle, a thing is a rounded square. Either can be forced. */
export const Shapes: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Group>
      <div>
        <Label>circle — a person</Label>
        <Row>
          {PEOPLE.slice(0, 4).map((n) => (
            <Avatar key={n} name={n} shape="circle" />
          ))}
        </Row>
      </div>
      <div>
        <Label>rounded — a thing, or a person when forced</Label>
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

/** A thing rather than a person: a team, a role, a service account, an organization. The square is the default; the glyph sizes itself to the tile. */
export const WithIcon: Story = {
  name: 'With an icon',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Group>
      <div>
        <Label>The things the console marks — team · role · service account · organization</Label>
        <Row>
          <Avatar name="Design team" icon={<Icon name="users" />} tone="blue" />
          <Avatar name="Administrator role" icon={<Icon name="shield" />} tone="blue" />
          <Avatar name="Backup runner" icon={<Icon name="bot" />} tone="blue" />
          <Avatar name="Acme Corp" icon={<Icon name="building" />} tone="blue" />
        </Row>
      </div>
      <div>
        <Label>
          At every size — the glyph follows: 12 · 14 · 16 · 20 · 24; the corners 6, and 12 at xl
        </Label>
        <Row>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <Avatar key={s} name="Design team" icon={<Icon name="users" />} tone="blue" size={s} />
          ))}
        </Row>
      </div>
      <div>
        <Label>Forced into a circle, and a person beside it for scale</Label>
        <Row>
          <Avatar name="Design team" icon={<Icon name="users" />} tone="blue" shape="circle" />
          <Avatar name="Sarah Johnson" />
        </Row>
      </div>
      <div>
        <Label>No name at all — a glyph on slate</Label>
        <Row>
          <Avatar icon={<Icon name="user" />} />
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

/* ── Ported from the console (Pranjal, 2026-10-13) ───────────────────────── */

const LOGO =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23101828'/%3E%3Cpath d='M20 58 40 18 60 58Z' fill='%2336d576'/%3E%3C/svg%3E";

/** An organization's logo FILLS the square edge to edge — no frame, no ground (the console's OrgMark). Without one, the letter stands. */
export const WithLogo: Story = {
  name: 'With a logo',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Group>
      <div>
        <Label>The logo fills the box at every size; the corners round it</Label>
        <Row>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <Avatar key={s} name="Acme Corp" logo={LOGO} size={s} />
          ))}
        </Row>
      </div>
      <div>
        <Label>No logo, or a broken one — the letter on its tone, still a square</Label>
        <Row>
          <Avatar name="Acme Corp" size="xl" shape="rounded" />
          <Avatar name="Acme Corp" size="xl" logo="https://example.invalid/missing.png" />
        </Row>
      </div>
    </Group>
  ),
};

/** A state on the corner — the console's presence dot on the organization mark, ringed in the card colour so it reads as a cut-out in both themes. */
export const WithStatus: Story = {
  name: 'With a status dot',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Group>
      <div>
        <Label>active · suspended · offboarded</Label>
        <Row>
          <Avatar name="Acme Corp" size="xl" shape="rounded" status="active" />
          <Avatar name="Globex" size="xl" shape="rounded" status="suspended" />
          <Avatar name="Initech" size="xl" shape="rounded" status="offboarded" />
          <Avatar name="Acme Corp" size="xl" logo={LOGO} status="active" />
        </Row>
      </div>
      <div>
        <Label>Rounded, at every size — the dot is 10/64 of the avatar, the ring 1/16</Label>
        <Row>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <Avatar key={s} name="Acme Corp" shape="rounded" size={s} status="active" />
          ))}
        </Row>
      </div>
      <div>
        <Label>Circle, at every size</Label>
        <Row>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <Avatar key={s} name="Sarah Johnson" size={s} status="active" />
          ))}
        </Row>
      </div>
    </Group>
  ),
};

/** The camera button on the corner — the console's profile drawer in edit mode. It opens the file picker; the chosen image is handed back. */
export const WithEditButton: Story = {
  name: 'With an edit button',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Row>
      <Avatar
        name="Sarah Johnson"
        size="xl"
        shape="rounded"
        onEdit={() => {
          /* a story: the file is not kept */
        }}
      />
      <Avatar
        name="Acme Corp"
        size="xl"
        logo={LOGO}
        editLabel="Change logo"
        onEdit={() => {
          /* a story: the file is not kept */
        }}
      />
    </Row>
  ),
};
