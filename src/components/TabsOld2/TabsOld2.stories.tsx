import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { TabsOld2, TabsAddOld2, TabsContentOld2, TabsListOld2, TabsTriggerOld2 } from './TabsOld2';
import { useEditableTabsOld2 } from './useEditableTabsOld2';
import type { TabsOld2Variant } from './TabsOld2.types';
import { Badge } from '../Badge';
import { Icon } from '../Icon';

const DEPRECATION =
  "The Tabs as they were before 2026-09-22, when Pranjal's tabs ruling (2026-09-17) came into the library; kept for side-by-side review; Nirav sets the removal version.";

/**
 * The Tabs as they were before 2026-09-22. Kept for side-by-side review only.
 */
const meta: Meta<typeof TabsOld2> = {
  title: 'Deprecated 2/Tabs Old',
  component: TabsOld2,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    status: {
      type: 'deprecated',
      since: '0.4.0',
      deprecation: {
        deprecatedSince: '0.4.0',
        removalIn: 'set by Nirav',
        replacement: 'Tabs',
        message: DEPRECATION,
      },
    },
    docs: {
      description: {
        component: [
          '## ⚠️ Deprecated — use `Tabs`',
          '',
          DEPRECATION,
          '',
          '**Do not start anything new on it.** `Tabs` now carries the two ruled types, `underline`',
          '(the default, for a drawer or page band) and `filled` (a switch inside a body), at the',
          'ruled numbers. This is the earlier component with its four looks (default, underline,',
          'card, pills) at 14/500, unchanged.',
          '',
          'A set of layered sections of content—known as tab panels—that are displayed one at a time. Provides keyboard navigation and ARIA support out of the box.',
        ].join('\n'),
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
    defaultValue: {
      control: 'text',
      description: 'The value of the tab that should be active when initially rendered',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'The controlled value of the active tab',
      table: {
        type: { summary: 'string' },
      },
    },
    onValueChange: {
      action: 'value changed',
      description: 'Event handler called when the value changes',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tabs',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    dir: {
      control: 'select',
      options: ['ltr', 'rtl'],
      description: 'The reading direction',
      table: {
        defaultValue: { summary: 'ltr' },
      },
    },
    activationMode: {
      control: 'select',
      options: ['automatic', 'manual'],
      description: 'Whether tabs are activated automatically on focus or manually on click',
      table: {
        defaultValue: { summary: 'automatic' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default tabs example with basic content.
 */
export const Default: Story = {
  render: () => (
    <TabsOld2 defaultValue="account" className="mdt-w-[400px]">
      <TabsListOld2>
        <TabsTriggerOld2 value="account">Account</TabsTriggerOld2>
        <TabsTriggerOld2 value="password">Password</TabsTriggerOld2>
        <TabsTriggerOld2 value="settings">Settings</TabsTriggerOld2>
      </TabsListOld2>
      <TabsContentOld2 value="account">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Account</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Make changes to your account here. Click save when you're done.
          </p>
        </div>
      </TabsContentOld2>
      <TabsContentOld2 value="password">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Password</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Change your password here. After saving, you'll be logged out.
          </p>
        </div>
      </TabsContentOld2>
      <TabsContentOld2 value="settings">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Settings</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Manage your application settings and preferences.
          </p>
        </div>
      </TabsContentOld2>
    </TabsOld2>
  ),
};

/**
 * Vertical orientation for tabs - great for sidebars or navigation.
 */
export const VerticalOrientation: Story = {
  render: () => (
    <TabsOld2 defaultValue="overview" orientation="vertical" className="mdt-flex mdt-gap-4">
      <TabsListOld2 className="mdt-h-auto mdt-flex-col mdt-items-stretch">
        <TabsTriggerOld2 value="overview">Overview</TabsTriggerOld2>
        <TabsTriggerOld2 value="analytics">Analytics</TabsTriggerOld2>
        <TabsTriggerOld2 value="reports">Reports</TabsTriggerOld2>
        <TabsTriggerOld2 value="notifications">Notifications</TabsTriggerOld2>
      </TabsListOld2>
      <div className="mdt-flex-1">
        <TabsContentOld2 value="overview" className="mdt-m-0">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Overview</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">
              Get a quick overview of your key metrics and performance indicators.
            </p>
          </div>
        </TabsContentOld2>
        <TabsContentOld2 value="analytics" className="mdt-m-0">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Analytics</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">
              Detailed analytics and insights about your data.
            </p>
          </div>
        </TabsContentOld2>
        <TabsContentOld2 value="reports" className="mdt-m-0">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Reports</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">
              Generate and view comprehensive reports.
            </p>
          </div>
        </TabsContentOld2>
        <TabsContentOld2 value="notifications" className="mdt-m-0">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Notifications</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">
              Manage your notification preferences.
            </p>
          </div>
        </TabsContentOld2>
      </div>
    </TabsOld2>
  ),
};

/**
 * All style variants displayed together for comparison.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="mdt-space-y-8">
      <div>
        <h3 className="mdt-mb-2 mdt-text-sm mdt-font-semibold mdt-text-muted-foreground">
          Default Variant
        </h3>
        <TabsOld2 defaultValue="tab1" className="mdt-w-[400px]">
          <TabsListOld2>
            <TabsTriggerOld2 value="tab1">Tab 1</TabsTriggerOld2>
            <TabsTriggerOld2 value="tab2">Tab 2</TabsTriggerOld2>
            <TabsTriggerOld2 value="tab3">Tab 3</TabsTriggerOld2>
          </TabsListOld2>
          <TabsContentOld2 value="tab1">
            <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
              <p className="mdt-text-sm">Default variant with muted background</p>
            </div>
          </TabsContentOld2>
          <TabsContentOld2 value="tab2">
            <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
              <p className="mdt-text-sm">Tab 2 content</p>
            </div>
          </TabsContentOld2>
          <TabsContentOld2 value="tab3">
            <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
              <p className="mdt-text-sm">Tab 3 content</p>
            </div>
          </TabsContentOld2>
        </TabsOld2>
      </div>

      <div>
        <h3 className="mdt-mb-2 mdt-text-sm mdt-font-semibold mdt-text-muted-foreground">
          Underline Variant
        </h3>
        <TabsOld2 defaultValue="tab1" className="mdt-w-[400px]">
          <TabsListOld2 variant="underline">
            <TabsTriggerOld2 value="tab1" variant="underline">
              Tab 1
            </TabsTriggerOld2>
            <TabsTriggerOld2 value="tab2" variant="underline">
              Tab 2
            </TabsTriggerOld2>
            <TabsTriggerOld2 value="tab3" variant="underline">
              Tab 3
            </TabsTriggerOld2>
          </TabsListOld2>
          <TabsContentOld2 value="tab1">
            <div className="mdt-pt-4">
              <p className="mdt-text-sm">Clean underline style for minimal interfaces</p>
            </div>
          </TabsContentOld2>
          <TabsContentOld2 value="tab2">
            <div className="mdt-pt-4">
              <p className="mdt-text-sm">Tab 2 content</p>
            </div>
          </TabsContentOld2>
          <TabsContentOld2 value="tab3">
            <div className="mdt-pt-4">
              <p className="mdt-text-sm">Tab 3 content</p>
            </div>
          </TabsContentOld2>
        </TabsOld2>
      </div>

      <div>
        <h3 className="mdt-mb-2 mdt-text-sm mdt-font-semibold mdt-text-muted-foreground">
          Card Variant
        </h3>
        <TabsOld2 defaultValue="tab1" className="mdt-w-[400px]">
          <TabsListOld2 variant="card">
            <TabsTriggerOld2 value="tab1" variant="card">
              Tab 1
            </TabsTriggerOld2>
            <TabsTriggerOld2 value="tab2" variant="card">
              Tab 2
            </TabsTriggerOld2>
            <TabsTriggerOld2 value="tab3" variant="card">
              Tab 3
            </TabsTriggerOld2>
          </TabsListOld2>
          <TabsContentOld2 value="tab1">
            <div className="mdt-pt-2">
              <p className="mdt-text-sm">Elevated card style with border and shadow</p>
            </div>
          </TabsContentOld2>
          <TabsContentOld2 value="tab2">
            <div className="mdt-pt-2">
              <p className="mdt-text-sm">Tab 2 content</p>
            </div>
          </TabsContentOld2>
          <TabsContentOld2 value="tab3">
            <div className="mdt-pt-2">
              <p className="mdt-text-sm">Tab 3 content</p>
            </div>
          </TabsContentOld2>
        </TabsOld2>
      </div>

      <div>
        <h3 className="mdt-mb-2 mdt-text-sm mdt-font-semibold mdt-text-muted-foreground">
          Pills Variant
        </h3>
        <TabsOld2 defaultValue="tab1" className="mdt-w-[400px]">
          <TabsListOld2 variant="pills">
            <TabsTriggerOld2 value="tab1" variant="pills">
              Tab 1
            </TabsTriggerOld2>
            <TabsTriggerOld2 value="tab2" variant="pills">
              Tab 2
            </TabsTriggerOld2>
            <TabsTriggerOld2 value="tab3" variant="pills">
              Tab 3
            </TabsTriggerOld2>
          </TabsListOld2>
          <TabsContentOld2 value="tab1">
            <div className="mdt-pt-2">
              <p className="mdt-text-sm">Rounded pill style for modern interfaces</p>
            </div>
          </TabsContentOld2>
          <TabsContentOld2 value="tab2">
            <div className="mdt-pt-2">
              <p className="mdt-text-sm">Tab 2 content</p>
            </div>
          </TabsContentOld2>
          <TabsContentOld2 value="tab3">
            <div className="mdt-pt-2">
              <p className="mdt-text-sm">Tab 3 content</p>
            </div>
          </TabsContentOld2>
        </TabsOld2>
      </div>
    </div>
  ),
};

/**
 * Tabs with icons alongside text for better visual identification.
 */
export const WithIcons: Story = {
  render: () => (
    <TabsOld2 defaultValue="home" className="mdt-w-[500px]">
      <TabsListOld2>
        <TabsTriggerOld2 value="home">
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
            className="mdt-mr-2"
            aria-hidden="true"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Home
        </TabsTriggerOld2>
        <TabsTriggerOld2 value="profile">
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
            className="mdt-mr-2"
            aria-hidden="true"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Profile
        </TabsTriggerOld2>
        <TabsTriggerOld2 value="messages">
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
            className="mdt-mr-2"
            aria-hidden="true"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Messages
        </TabsTriggerOld2>
      </TabsListOld2>
      <TabsContentOld2 value="home">
        <div className="mdt-space-y-2">
          <h3 className="mdt-text-lg mdt-font-semibold">Home Dashboard</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Welcome to your home dashboard. Here you'll find an overview of your activity.
          </p>
        </div>
      </TabsContentOld2>
      <TabsContentOld2 value="profile">
        <div className="mdt-space-y-2">
          <h3 className="mdt-text-lg mdt-font-semibold">Profile Settings</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Manage your profile information and preferences.
          </p>
        </div>
      </TabsContentOld2>
      <TabsContentOld2 value="messages">
        <div className="mdt-space-y-2">
          <h3 className="mdt-text-lg mdt-font-semibold">Messages</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">View and manage your messages.</p>
        </div>
      </TabsContentOld2>
    </TabsOld2>
  ),
};

/**
 * Controlled tabs with external state management.
 */
export const ControlledState: Story = {
  render: function ControlledExample() {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
      <div className="mdt-space-y-4">
        <div className="mdt-flex mdt-gap-2">
          <button
            onClick={() => {
              setActiveTab('tab1');
            }}
            className="mdt-rounded mdt-bg-primary mdt-px-3 mdt-py-1.5 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90"
            aria-label="Switch to tab 1"
          >
            Activate Tab 1
          </button>
          <button
            onClick={() => {
              setActiveTab('tab2');
            }}
            className="mdt-rounded mdt-bg-primary mdt-px-3 mdt-py-1.5 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90"
            aria-label="Switch to tab 2"
          >
            Activate Tab 2
          </button>
          <button
            onClick={() => {
              setActiveTab('tab3');
            }}
            className="mdt-rounded mdt-bg-primary mdt-px-3 mdt-py-1.5 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90"
            aria-label="Switch to tab 3"
          >
            Activate Tab 3
          </button>
        </div>
        <TabsOld2 value={activeTab} onValueChange={setActiveTab} className="mdt-w-[400px]">
          <TabsListOld2>
            <TabsTriggerOld2 value="tab1">Tab 1</TabsTriggerOld2>
            <TabsTriggerOld2 value="tab2">Tab 2</TabsTriggerOld2>
            <TabsTriggerOld2 value="tab3">Tab 3</TabsTriggerOld2>
          </TabsListOld2>
          <TabsContentOld2 value="tab1">
            <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
              <h3 className="mdt-text-lg mdt-font-semibold">Tab 1 Content</h3>
              <p className="mdt-text-sm mdt-text-muted-foreground">
                This tab is controlled externally. Active tab: {activeTab}
              </p>
            </div>
          </TabsContentOld2>
          <TabsContentOld2 value="tab2">
            <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
              <h3 className="mdt-text-lg mdt-font-semibold">Tab 2 Content</h3>
              <p className="mdt-text-sm mdt-text-muted-foreground">
                This tab is controlled externally. Active tab: {activeTab}
              </p>
            </div>
          </TabsContentOld2>
          <TabsContentOld2 value="tab3">
            <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
              <h3 className="mdt-text-lg mdt-font-semibold">Tab 3 Content</h3>
              <p className="mdt-text-sm mdt-text-muted-foreground">
                This tab is controlled externally. Active tab: {activeTab}
              </p>
            </div>
          </TabsContentOld2>
        </TabsOld2>
      </div>
    );
  },
};

/**
 * Default value example - tab starts on a specific value.
 */
export const WithDefaultValue: Story = {
  render: () => (
    <TabsOld2 defaultValue="advanced" className="mdt-w-[400px]">
      <TabsListOld2>
        <TabsTriggerOld2 value="basic">Basic</TabsTriggerOld2>
        <TabsTriggerOld2 value="intermediate">Intermediate</TabsTriggerOld2>
        <TabsTriggerOld2 value="advanced">Advanced</TabsTriggerOld2>
      </TabsListOld2>
      <TabsContentOld2 value="basic">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Basic Level</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Start with basic features and fundamentals.
          </p>
        </div>
      </TabsContentOld2>
      <TabsContentOld2 value="intermediate">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Intermediate Level</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Build on your knowledge with intermediate concepts.
          </p>
        </div>
      </TabsContentOld2>
      <TabsContentOld2 value="advanced">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Advanced Level</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            This tab is active by default. Master advanced techniques and features.
          </p>
        </div>
      </TabsContentOld2>
    </TabsOld2>
  ),
};

/**
 * Tab with disabled state - prevents interaction with specific tabs.
 */
export const DisabledTab: Story = {
  render: () => (
    <TabsOld2 defaultValue="available" className="mdt-w-[400px]">
      <TabsListOld2>
        <TabsTriggerOld2 value="available">Available</TabsTriggerOld2>
        <TabsTriggerOld2 value="disabled" disabled>
          Disabled
        </TabsTriggerOld2>
        <TabsTriggerOld2 value="enabled">Enabled</TabsTriggerOld2>
      </TabsListOld2>
      <TabsContentOld2 value="available">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Available Tab</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">This tab is available for use.</p>
        </div>
      </TabsContentOld2>
      <TabsContentOld2 value="disabled">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Disabled Tab</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            This tab is disabled and cannot be accessed.
          </p>
        </div>
      </TabsContentOld2>
      <TabsContentOld2 value="enabled">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Enabled Tab</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">This tab is enabled.</p>
        </div>
      </TabsContentOld2>
    </TabsOld2>
  ),
};

/**
 * Tabs with badge or counter - showing notifications or counts.
 */
export const WithBadgeCounter: Story = {
  render: () => (
    <TabsOld2 defaultValue="inbox" className="mdt-w-[500px]">
      <TabsListOld2>
        <TabsTriggerOld2 value="inbox" className="mdt-gap-2">
          Inbox
          <span className="mdt-flex mdt-h-5 mdt-min-w-[20px] mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-primary mdt-px-1.5 mdt-text-xs mdt-font-semibold mdt-text-primary-foreground">
            12
          </span>
        </TabsTriggerOld2>
        <TabsTriggerOld2 value="sent" className="mdt-gap-2">
          Sent
          <span className="mdt-flex mdt-h-5 mdt-min-w-[20px] mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-muted mdt-px-1.5 mdt-text-xs mdt-font-semibold mdt-text-muted-foreground">
            5
          </span>
        </TabsTriggerOld2>
        <TabsTriggerOld2 value="drafts" className="mdt-gap-2">
          Drafts
          <span className="mdt-flex mdt-h-5 mdt-min-w-[20px] mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-destructive/20 mdt-px-1.5 mdt-text-xs mdt-font-semibold mdt-text-destructive">
            3
          </span>
        </TabsTriggerOld2>
      </TabsListOld2>
      <TabsContentOld2 value="inbox">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Inbox</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            You have 12 new messages in your inbox.
          </p>
        </div>
      </TabsContentOld2>
      <TabsContentOld2 value="sent">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Sent</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">You have sent 5 messages today.</p>
        </div>
      </TabsContentOld2>
      <TabsContentOld2 value="drafts">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Drafts</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            You have 3 draft messages waiting to be sent.
          </p>
        </div>
      </TabsContentOld2>
    </TabsOld2>
  ),
};

/**
 * Full width tabs that stretch across the container.
 */
export const FullWidth: Story = {
  render: () => (
    <TabsOld2 defaultValue="overview" className="mdt-w-full">
      <TabsListOld2 fullWidth>
        <TabsTriggerOld2 value="overview" fullWidth>
          Overview
        </TabsTriggerOld2>
        <TabsTriggerOld2 value="details" fullWidth>
          Details
        </TabsTriggerOld2>
        <TabsTriggerOld2 value="settings" fullWidth>
          Settings
        </TabsTriggerOld2>
      </TabsListOld2>
      <TabsContentOld2 value="overview">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Overview</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Full width tabs stretch across the entire container, perfect for mobile layouts.
          </p>
        </div>
      </TabsContentOld2>
      <TabsContentOld2 value="details">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Details</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">View detailed information here.</p>
        </div>
      </TabsContentOld2>
      <TabsContentOld2 value="settings">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Settings</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">Manage your settings.</p>
        </div>
      </TabsContentOld2>
    </TabsOld2>
  ),
};

/**
 * Scrollable tabs - when you have many tabs that don't fit on screen.
 */
export const ScrollableTabs: Story = {
  render: () => (
    <TabsOld2 defaultValue="tab1" className="mdt-w-[500px]">
      <TabsListOld2 className="mdt-w-full mdt-justify-start">
        <TabsTriggerOld2 value="tab1">Dashboard</TabsTriggerOld2>
        <TabsTriggerOld2 value="tab2">Analytics</TabsTriggerOld2>
        <TabsTriggerOld2 value="tab3">Reports</TabsTriggerOld2>
        <TabsTriggerOld2 value="tab4">Customers</TabsTriggerOld2>
        <TabsTriggerOld2 value="tab5">Products</TabsTriggerOld2>
        <TabsTriggerOld2 value="tab6">Orders</TabsTriggerOld2>
        <TabsTriggerOld2 value="tab7">Invoices</TabsTriggerOld2>
        <TabsTriggerOld2 value="tab8">Settings</TabsTriggerOld2>
      </TabsListOld2>
      <div className="mdt-max-w-[500px] mdt-overflow-x-auto">
        <TabsContentOld2 value="tab1">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Dashboard</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">
              Main dashboard with key metrics.
            </p>
          </div>
        </TabsContentOld2>
        <TabsContentOld2 value="tab2">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Analytics</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">Detailed analytics view.</p>
          </div>
        </TabsContentOld2>
        <TabsContentOld2 value="tab3">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Reports</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">Generate and view reports.</p>
          </div>
        </TabsContentOld2>
        <TabsContentOld2 value="tab4">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Customers</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">Manage customer data.</p>
          </div>
        </TabsContentOld2>
        <TabsContentOld2 value="tab5">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Products</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">View and edit products.</p>
          </div>
        </TabsContentOld2>
        <TabsContentOld2 value="tab6">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Orders</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">Track and manage orders.</p>
          </div>
        </TabsContentOld2>
        <TabsContentOld2 value="tab7">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Invoices</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">Create and manage invoices.</p>
          </div>
        </TabsContentOld2>
        <TabsContentOld2 value="tab8">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Settings</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">Configure application settings.</p>
          </div>
        </TabsContentOld2>
      </div>
    </TabsOld2>
  ),
};

/**
 * Multi-step form example using tabs.
 */
export const MultiStepForm: Story = {
  render: function FormExample() {
    const [currentStep, setCurrentStep] = useState('account');

    return (
      <TabsOld2 value={currentStep} onValueChange={setCurrentStep} className="mdt-w-[500px]">
        <TabsListOld2 className="mdt-grid mdt-w-full mdt-grid-cols-3">
          <TabsTriggerOld2 value="account">Account</TabsTriggerOld2>
          <TabsTriggerOld2 value="profile">Profile</TabsTriggerOld2>
          <TabsTriggerOld2 value="finish">Finish</TabsTriggerOld2>
        </TabsListOld2>

        <TabsContentOld2 value="account">
          <div className="mdt-space-y-4 mdt-rounded-lg mdt-border mdt-border-border mdt-p-6">
            <div className="mdt-space-y-2">
              <h3 className="mdt-text-lg mdt-font-semibold">Create Account</h3>
              <p className="mdt-text-sm mdt-text-muted-foreground">
                Enter your email and password to create an account.
              </p>
            </div>
            <div className="mdt-space-y-4">
              <div className="mdt-space-y-2">
                <label htmlFor="email" className="mdt-text-sm mdt-font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"
                />
              </div>
              <div className="mdt-space-y-2">
                <label htmlFor="password" className="mdt-text-sm mdt-font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"
                />
              </div>
              <button
                onClick={() => {
                  setCurrentStep('profile');
                }}
                className="mdt-w-full mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-font-medium mdt-text-primary-foreground hover:mdt-bg-primary/90"
              >
                Next Step
              </button>
            </div>
          </div>
        </TabsContentOld2>

        <TabsContentOld2 value="profile">
          <div className="mdt-space-y-4 mdt-rounded-lg mdt-border mdt-border-border mdt-p-6">
            <div className="mdt-space-y-2">
              <h3 className="mdt-text-lg mdt-font-semibold">Profile Information</h3>
              <p className="mdt-text-sm mdt-text-muted-foreground">Tell us a bit about yourself.</p>
            </div>
            <div className="mdt-space-y-4">
              <div className="mdt-space-y-2">
                <label htmlFor="name" className="mdt-text-sm mdt-font-medium">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"
                />
              </div>
              <div className="mdt-space-y-2">
                <label htmlFor="bio" className="mdt-text-sm mdt-font-medium">
                  Bio
                </label>
                <textarea
                  id="bio"
                  placeholder="Tell us about yourself"
                  rows={3}
                  className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"
                />
              </div>
              <div className="mdt-flex mdt-gap-2">
                <button
                  onClick={() => {
                    setCurrentStep('account');
                  }}
                  className="mdt-flex-1 mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-py-2 mdt-text-sm mdt-font-medium hover:mdt-bg-muted"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    setCurrentStep('finish');
                  }}
                  className="mdt-flex-1 mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-font-medium mdt-text-primary-foreground hover:mdt-bg-primary/90"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        </TabsContentOld2>

        <TabsContentOld2 value="finish">
          <div className="mdt-space-y-4 mdt-rounded-lg mdt-border mdt-border-border mdt-p-6">
            <div className="mdt-space-y-2">
              <h3 className="mdt-text-lg mdt-font-semibold">All Done!</h3>
              <p className="mdt-text-sm mdt-text-muted-foreground">
                Review your information and complete the registration.
              </p>
            </div>
            <div className="mdt-space-y-4">
              <div className="mdt-rounded-md mdt-bg-muted mdt-p-4">
                <p className="mdt-text-sm mdt-text-muted-foreground">
                  Your account has been created successfully. You can now start using the
                  application.
                </p>
              </div>
              <div className="mdt-flex mdt-gap-2">
                <button
                  onClick={() => {
                    setCurrentStep('profile');
                  }}
                  className="mdt-flex-1 mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-py-2 mdt-text-sm mdt-font-medium hover:mdt-bg-muted"
                >
                  Previous
                </button>
                <button className="mdt-flex-1 mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-font-medium mdt-text-primary-foreground hover:mdt-bg-primary/90">
                  Complete
                </button>
              </div>
            </div>
          </div>
        </TabsContentOld2>
      </TabsOld2>
    );
  },
};

// ============================================================================
// Icon + label + badge — the shape most navigation actually needs
// ============================================================================

/** The same three tabs, so the four looks can be compared without noise. */
const NAV = [
  { value: 'inbox', icon: 'inbox', label: 'Inbox', count: 12, tone: 'info' },
  { value: 'flagged', icon: 'flag', label: 'Flagged', count: 3, tone: 'danger' },
  { value: 'archive', icon: 'archive', label: 'Archive', count: 128, tone: 'neutral' },
] as const;

const NavTabs = ({ variant }: Readonly<{ variant: TabsOld2Variant }>) => (
  <TabsOld2 defaultValue="inbox" className="mdt-w-[520px] mdt-max-w-full">
    <TabsListOld2 variant={variant}>
      {NAV.map((tab) => (
        <TabsTriggerOld2
          key={tab.value}
          value={tab.value}
          variant={variant}
          icon={<Icon name={tab.icon} />}
          badge={
            <Badge tone={tab.tone} size="sm">
              {tab.count}
            </Badge>
          }
        >
          {tab.label}
        </TabsTriggerOld2>
      ))}
    </TabsListOld2>
    {NAV.map((tab) => (
      <TabsContentOld2 key={tab.value} value={tab.value}>
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">{tab.label}</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            {tab.count} items in {tab.label.toLowerCase()}.
          </p>
        </div>
      </TabsContentOld2>
    ))}
  </TabsOld2>
);

/**
 * **A glyph, a label and a count on the same tab.**
 *
 * `icon` and `badge` are props on `TabsTriggerOld2`, so either, both or neither is
 * fine and the spacing is the same everywhere. Before this, a tab bar with both
 * meant assembling the pieces by hand in `children` and picking your own
 * margins — which is why the icon story and the badge story never quite lined
 * up with each other.
 *
 * The count is a real `Badge`, so it inherits the tones the rest of the system
 * uses rather than a one-off span.
 */
export const IconLabelAndBadge: Story = {
  name: 'Icon, label and badge',
  parameters: { controls: { disable: true } },
  render: () => <NavTabs variant="default" />,
};

/**
 * The same tab bar in all four looks, so you can see the combination holds up
 * everywhere rather than only in the one it was designed against.
 */
export const IconLabelAndBadgeVariants: Story = {
  name: 'Icon, label and badge — every look',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-8">
      {(['default', 'underline', 'card', 'pills'] as const).map((variant) => (
        <div key={variant} className="mdt-flex mdt-flex-col mdt-gap-2">
          <span className="mdt-text-xs mdt-font-medium mdt-uppercase mdt-tracking-wider mdt-text-muted-foreground">
            {variant}
          </span>
          <NavTabs variant={variant} />
        </div>
      ))}
    </div>
  ),
};

/**
 * The three ways a tab can be built, side by side — label only, label with a
 * glyph, label with a count, and all three together.
 */
export const TabAnatomy: Story = {
  name: 'What a tab can carry',
  parameters: { controls: { disable: true } },
  render: () => (
    <TabsOld2 defaultValue="all" className="mdt-w-[620px] mdt-max-w-full">
      <TabsListOld2>
        <TabsTriggerOld2 value="all">Label only</TabsTriggerOld2>
        <TabsTriggerOld2 value="icon" icon={<Icon name="inbox" />}>
          Icon and label
        </TabsTriggerOld2>
        <TabsTriggerOld2
          value="badge"
          badge={
            <Badge tone="info" size="sm">
              9
            </Badge>
          }
        >
          Label and badge
        </TabsTriggerOld2>
        <TabsTriggerOld2
          value="both"
          icon={<Icon name="flag" />}
          badge={
            <Badge tone="danger" size="sm">
              3
            </Badge>
          }
        >
          All three
        </TabsTriggerOld2>
      </TabsListOld2>
      <TabsContentOld2 value="all">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4 mdt-text-sm mdt-text-muted-foreground">
          Just a label.
        </div>
      </TabsContentOld2>
      <TabsContentOld2 value="icon">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4 mdt-text-sm mdt-text-muted-foreground">
          A glyph helps you find the tab you want without reading.
        </div>
      </TabsContentOld2>
      <TabsContentOld2 value="badge">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4 mdt-text-sm mdt-text-muted-foreground">
          A count tells you there is something waiting.
        </div>
      </TabsContentOld2>
      <TabsContentOld2 value="both">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4 mdt-text-sm mdt-text-muted-foreground">
          Both at once — what most real navigation needs.
        </div>
      </TabsContentOld2>
    </TabsOld2>
  ),
};

// ============================================================================
// Editable tabs — add and close, the way Notion and ClickUp work
// ============================================================================

const EditableTabsDemo = ({ variant }: Readonly<{ variant: TabsOld2Variant }>) => {
  const { tabs, active, setActive, add, close, canClose } = useEditableTabsOld2({
    initialTabs: [
      { id: 'a', label: 'Overview' },
      { id: 'b', label: 'Agents' },
      { id: 'c', label: 'Credentials' },
    ],
    newTabLabel: (n) => `View ${n.toString()}`,
  });

  return (
    <TabsOld2 value={active} onValueChange={setActive} className="mdt-w-[620px] mdt-max-w-full">
      <TabsListOld2 variant={variant}>
        {tabs.map((tab) => (
          <TabsTriggerOld2
            key={tab.id}
            value={tab.id}
            variant={variant}
            closable={canClose(tab.id)}
            onClose={() => {
              close(tab.id);
            }}
          >
            {tab.label}
          </TabsTriggerOld2>
        ))}
        <TabsAddOld2
          onClick={() => {
            add();
          }}
        />
      </TabsListOld2>

      {tabs.map((tab) => (
        <TabsContentOld2 key={tab.id} value={tab.id}>
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">{tab.label}</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">
              Close this tab and the one to its right takes its place. Close the last one and the
              one to its left does.
            </p>
          </div>
        </TabsContentOld2>
      ))}
    </TabsOld2>
  );
};

/**
 * **Tabs the person builds themselves** — add with the plus, close with the
 * cross.
 *
 * The concept is Notion's and ClickUp's, not their look: a tab bar that is a set
 * of things you opened rather than fixed navigation.
 *
 * Adding and closing sounds like two lines of code until you close the tab you
 * are looking at, and then something has to decide where you land. `useEditableTabsOld2`
 * holds those answers so every tab bar in the product behaves the same way:
 *
 * - **Closing a tab you are not on changes nothing else** — you keep looking at
 *   what you were looking at.
 * - **Closing the tab you are on selects its right-hand neighbour**, or the left
 *   one if it was last.
 * - **The last tab has no cross.** An empty tab bar has nothing to select and no
 *   way back.
 * - **A new tab is selected straight away**, because you made it to use it.
 *
 * The cross is a real button sitting beside the tab rather than inside it — a
 * button nested in a button is invalid, and it leaves the cross unreachable by
 * keyboard.
 */
export const EditableTabs: Story = {
  name: 'Add and close tabs',
  parameters: { controls: { disable: true } },
  render: () => <EditableTabsDemo variant="default" />,
};

/**
 * The same behaviour in all four looks.
 */
export const EditableTabsVariants: Story = {
  name: 'Add and close — every look',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-8">
      {(['default', 'underline', 'card', 'pills'] as const).map((variant) => (
        <div key={variant} className="mdt-flex mdt-flex-col mdt-gap-2">
          <span className="mdt-text-xs mdt-font-medium mdt-uppercase mdt-tracking-wider mdt-text-muted-foreground">
            {variant}
          </span>
          <EditableTabsDemo variant={variant} />
        </div>
      ))}
    </div>
  ),
};
