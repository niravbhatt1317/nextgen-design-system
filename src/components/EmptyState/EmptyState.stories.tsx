import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { EmptyState } from './EmptyState';

/**
 * An empty list anywhere outside a table: a drawer section, a tab, a panel.
 *
 * Ported from the console's hand-built `EmptyStateBlock` (Pranjal, 2026-10-13),
 * which about twenty drawers and tabs use - same tile, type, spacing and ink.
 * Inside a table, the table draws its own blank; this is everywhere else.
 */
const meta: Meta<typeof EmptyState> = {
  title: 'New Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'An icon tile, a **title**, one muted line and an optional action, centred.',
          '',
          '| Prop | Values |',
          '| --- | --- |',
          '| `icon` | an icon name (default `inbox`) or a node of your own, drawn at 18 |',
          '| `title` | what is empty - no full stop |',
          '| `description` | one muted line: why, or what fills it |',
          '| `action` | one control, usually an outline `Button` at `sm` |',
          '',
          'Ported from the console (Pranjal, 2026-10-13). Inside a table, use the table’s own blank.',
        ].join('\n'),
      },
    },
  },
  args: {
    icon: 'users',
    title: 'No members yet',
    description: "Add people to give them this team's access.",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Nothing here yet - a title and the line that says what fills it. */
export const Default: Story = {};

/** A search or a filter emptied the list: the action undoes it. */
export const WithAction: Story = {
  args: {
    icon: 'search',
    title: 'No people match',
    description: 'Nothing here matches the search.',
    action: (
      <Button variant="outline" size="sm">
        Clear search
      </Button>
    ),
  },
};

/** The link went nowhere: the action goes back to the list. */
export const NotFound: Story = {
  args: {
    icon: 'building-2',
    title: 'Organization not found',
    description: 'It may have been removed, or the link is out of date.',
    action: <Button variant="secondary">All organizations</Button>,
  },
};

/** Some states need nothing more than the title. */
export const TitleOnly: Story = {
  args: { icon: 'file-text', title: 'No attributes tracked yet', description: undefined },
};

/** A node instead of a name. It is drawn at the tile's 18 whatever it asks for. */
export const CustomIcon: Story = {
  args: {
    icon: <Icon name="log-out" size="md" />,
    title: 'Asha Rao has no active sessions',
    description: 'A session shows here the next time they sign in.',
  },
};

/** In a drawer section, the way the console's drawers place it - 8 under the section above. */
export const InADrawerSection: Story = {
  render: () => (
    <div className="mdt-max-w-lg mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background mdt-p-6">
      <div className="mdt-text-sm mdt-font-semibold mdt-text-foreground">Invitations</div>
      <div className="mdt-mt-2">
        <EmptyState
          icon="mail"
          title="No pending invitations"
          description="Invite users to see their invitations here."
        />
      </div>
    </div>
  ),
};
