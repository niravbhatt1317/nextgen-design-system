import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Item } from './Item';

const meta: Meta<typeof Item> = {
  title: 'Components/Item',
  component: Item,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible list item component for menus, dropdowns, and lists. Supports icons, labels, descriptions, and various states.',
      },
    },
    controls: {
      exclude: ['class'],
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'active', 'destructive'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the item is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    active: {
      control: 'boolean',
      description: 'Whether the item is currently active/selected',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// SVG Icons for stories
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const InboxIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

/**
 * Default item with label and description.
 */
export const Default: Story = {
  args: {
    label: 'Item Label',
    description: 'Item description',
    icon: <UserIcon />,
  },
};

/**
 * All size variants.
 */
export const Sizes: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-64 mdt-flex-col mdt-gap-2">
      <Item icon={<UserIcon />} label="Small Item" description="Small size" size="sm" />
      <Item icon={<UserIcon />} label="Medium Item" description="Medium size (default)" size="md" />
      <Item icon={<UserIcon />} label="Large Item" description="Large size" size="lg" />
    </div>
  ),
};

/**
 * All variants.
 */
export const Variants: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-64 mdt-flex-col mdt-gap-2">
      <Item icon={<UserIcon />} label="Default" description="Default variant" />
      <Item icon={<UserIcon />} label="Ghost" description="Ghost variant" variant="ghost" />
      <Item icon={<UserIcon />} label="Active" description="Active variant" variant="active" />
      <Item
        icon={<TrashIcon />}
        label="Destructive"
        description="Destructive variant"
        variant="destructive"
      />
    </div>
  ),
};

/**
 * Items with icons only.
 */
export const WithIcon: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-64 mdt-flex-col mdt-gap-2">
      <Item icon={<UserIcon />} label="Profile" />
      <Item icon={<SettingsIcon />} label="Settings" />
      <Item icon={<FileIcon />} label="Documents" />
      <Item icon={<BellIcon />} label="Notifications" />
    </div>
  ),
};

/**
 * Items without icons.
 */
export const WithoutIcon: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-64 mdt-flex-col mdt-gap-2">
      <Item label="Profile" />
      <Item label="Settings" />
      <Item label="Documents" />
      <Item label="Notifications" />
    </div>
  ),
};

/**
 * Clickable items with hover states.
 */
export const Clickable: Story = {
  render: function ClickableComponent() {
    const [clicked, setClicked] = useState<string>('');

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <div className="mdt-flex mdt-w-64 mdt-flex-col mdt-gap-2">
          <Item
            icon={<UserIcon />}
            label="Profile"
            description="View your profile"
            onClick={() => {
              setClicked('Profile');
            }}
          />
          <Item
            icon={<SettingsIcon />}
            label="Settings"
            description="Manage settings"
            onClick={() => {
              setClicked('Settings');
            }}
          />
          <Item
            icon={<FileIcon />}
            label="Documents"
            description="Browse documents"
            onClick={() => {
              setClicked('Documents');
            }}
          />
        </div>
        {clicked && <p className="mdt-text-sm mdt-text-muted-foreground">Clicked: {clicked}</p>}
      </div>
    );
  },
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-64 mdt-flex-col mdt-gap-2">
      <Item icon={<UserIcon />} label="Enabled Item" description="You can click this" />
      <Item icon={<UserIcon />} label="Disabled Item" description="Cannot click this" disabled />
      <Item
        icon={<TrashIcon />}
        label="Disabled Destructive"
        description="Cannot delete"
        variant="destructive"
        disabled
      />
    </div>
  ),
};

/**
 * Active/selected state.
 */
export const ActiveState: Story = {
  render: function ActiveStateComponent() {
    const [active, setActive] = useState('profile');

    return (
      <div className="mdt-flex mdt-w-64 mdt-flex-col mdt-gap-2">
        <Item
          icon={<UserIcon />}
          label="Profile"
          description="Your profile page"
          active={active === 'profile'}
          onClick={() => {
            setActive('profile');
          }}
        />
        <Item
          icon={<SettingsIcon />}
          label="Settings"
          description="Application settings"
          active={active === 'settings'}
          onClick={() => {
            setActive('settings');
          }}
        />
        <Item
          icon={<FileIcon />}
          label="Documents"
          description="Your documents"
          active={active === 'documents'}
          onClick={() => {
            setActive('documents');
          }}
        />
        <Item
          icon={<BellIcon />}
          label="Notifications"
          description="View notifications"
          active={active === 'notifications'}
          onClick={() => {
            setActive('notifications');
          }}
        />
      </div>
    );
  },
};

/**
 * Menu/dropdown list.
 */
export const MenuList: Story = {
  render: () => (
    <div className="mdt-w-64 mdt-rounded-md mdt-border mdt-border-border mdt-bg-popover mdt-p-1 mdt-shadow-md">
      <Item icon={<UserIcon />} label="Profile" />
      <Item icon={<SettingsIcon />} label="Settings" />
      <Item icon={<InboxIcon />} label="Inbox" />
      <div className="mdt-my-1 mdt-h-px mdt-bg-border" />
      <Item icon={<TrashIcon />} label="Delete" variant="destructive" />
    </div>
  ),
};

/**
 * Sidebar navigation.
 */
export const SidebarNav: Story = {
  render: function SidebarNavComponent() {
    const [active, setActive] = useState('inbox');

    return (
      <div className="mdt-flex mdt-h-96 mdt-w-64 mdt-flex-col mdt-gap-1 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background mdt-p-3">
        <h3 className="mdt-mb-2 mdt-px-3 mdt-text-sm mdt-font-semibold mdt-text-foreground">
          Navigation
        </h3>
        <Item
          icon={<InboxIcon />}
          label="Inbox"
          description="12 new"
          active={active === 'inbox'}
          onClick={() => {
            setActive('inbox');
          }}
        />
        <Item
          icon={<FileIcon />}
          label="Documents"
          description="24 files"
          active={active === 'documents'}
          onClick={() => {
            setActive('documents');
          }}
        />
        <Item
          icon={<BellIcon />}
          label="Notifications"
          description="5 unread"
          active={active === 'notifications'}
          onClick={() => {
            setActive('notifications');
          }}
        />
        <div className="mdt-my-2 mdt-h-px mdt-bg-border" />
        <h3 className="mdt-mb-2 mdt-px-3 mdt-text-sm mdt-font-semibold mdt-text-foreground">
          Account
        </h3>
        <Item
          icon={<UserIcon />}
          label="Profile"
          active={active === 'profile'}
          onClick={() => {
            setActive('profile');
          }}
        />
        <Item
          icon={<SettingsIcon />}
          label="Settings"
          active={active === 'settings'}
          onClick={() => {
            setActive('settings');
          }}
        />
      </div>
    );
  },
};

/**
 * Custom children content.
 */
export const CustomContent: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-80 mdt-flex-col mdt-gap-2">
      <Item>
        <div className="mdt-flex mdt-w-full mdt-items-center mdt-justify-between">
          <span>Custom Layout</span>
          <span className="mdt-rounded mdt-bg-primary mdt-px-2 mdt-py-0.5 mdt-text-xs mdt-text-primary-foreground">
            New
          </span>
        </div>
      </Item>
      <Item>
        <div className="mdt-flex mdt-w-full mdt-items-center mdt-justify-between">
          <div className="mdt-flex mdt-items-center mdt-gap-2">
            <UserIcon />
            <span>With Badge</span>
          </div>
          <span className="mdt-rounded-full mdt-bg-destructive mdt-px-2 mdt-py-0.5 mdt-text-xs mdt-text-destructive-foreground">
            3
          </span>
        </div>
      </Item>
      <Item>
        <div className="mdt-flex mdt-w-full mdt-items-center mdt-justify-between">
          <span>Progress Item</span>
          <div className="mdt-h-2 mdt-w-24 mdt-rounded-full mdt-bg-muted">
            <div className="mdt-h-full mdt-w-2/3 mdt-rounded-full mdt-bg-primary" />
          </div>
        </div>
      </Item>
    </div>
  ),
};

/**
 * Keyboard navigation test.
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <div className="mdt-flex mdt-w-64 mdt-flex-col mdt-gap-2">
        <Item
          icon={<UserIcon />}
          label="First Item"
          description="Tab to focus, Enter to activate"
        />
        <Item icon={<SettingsIcon />} label="Second Item" description="Use keyboard to navigate" />
        <Item icon={<FileIcon />} label="Third Item" description="Press Enter or Space" />
      </div>
      <p className="mdt-max-w-xs mdt-text-xs mdt-text-muted-foreground">
        Try using Tab to navigate between items, then press Enter or Space to activate them.
      </p>
    </div>
  ),
};
