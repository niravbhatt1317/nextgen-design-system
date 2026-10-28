import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Icon } from '../Icon';
import { OrgCard } from './OrgCard';

const meta: Meta<typeof OrgCard> = {
  title: 'New Components/OrgCard',
  component: OrgCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'The card that says **which organization a thing belongs to**, in every drawer that creates something inside one: Create team, Create role, Create service account, Add access, Invite, Bulk import.',
          '',
          'A hairline outline at radius 10 with no fill; the 40 tile in the avatar-blue pair (a pale tint with a same-hue building glyph, never a solid square); the name 14/500 and one faint line under it. `label` prints the field label above it on the form ladder (13/500).',
          '',
          'It is a fact, not a choice: nothing in it can be pressed. To work in another organization, the person switches it in the organization switcher - which is what the line usually says.',
          '',
          '**Ported from the console (Pranjal, 2026-10-28)**: `src/ui/OrgCard.jsx`, the User attributes drawer’s "Applies to · This organization" card used everywhere (Pranjal, 2026-09-27).',
        ].join('\n'),
      },
    },
  },
  args: {
    label: 'Organization',
    name: 'MSP owner organization',
    line: 'The team belongs to the active frame. Switch to a client frame to create a client team.',
  },
  argTypes: { icon: { control: false } },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** The drawer's form width. */
const Form = ({ children }: { children: ReactNode }) => (
  <div className="mdt-flex mdt-w-[512px] mdt-max-w-full mdt-flex-col mdt-gap-4">{children}</div>
);

export const Default: Story = {
  render: (args) => (
    <Form>
      <OrgCard {...args} />
    </Form>
  ),
};

/** Invite: the name alone, no line under it. */
export const NameOnly: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Form>
      <OrgCard label="Organization" name="MSP owner organization" />
    </Form>
  ),
};

/** No label: the card on its own, where the drawer's section heading already names it. */
export const WithoutLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Form>
      <OrgCard
        name="Northwind Retail"
        line="These users are added to this organization. Switch organization from the organization switcher to import into another."
      />
    </Form>
  ),
};

/** Another glyph in the tile - a node is drawn at the tile's 20px. */
export const OtherGlyph: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Form>
      <OrgCard
        label="Applies to"
        name="This organization"
        line="Every member of MSP owner organization gets this attribute."
        icon={<Icon name="users" />}
      />
    </Form>
  ),
};
