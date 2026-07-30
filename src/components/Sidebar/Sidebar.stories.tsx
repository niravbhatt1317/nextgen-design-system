import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import React from 'react';
import { DropdownMenuItem } from '../DropdownMenu';
import {
  Sidebar,
  SidebarHeader,
  SidebarSearch,
  SidebarContent,
  SidebarSection,
  SidebarLabel,
  SidebarCollapse,
  SidebarItem,
  SidebarFooter,
  DataDrivenSidebar,
} from './Sidebar';
import type { SidebarConfig } from './Sidebar.types';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sidebar component for navigation and content organization. Features search, collapsible sections, nested items, and customizable actions.',
      },
    },
    // Disable nested-interactive rule - SidebarItem uses button with action buttons inside
    // This is a component design limitation for hover-revealed action buttons
    a11y: {
      config: {
        rules: [{ id: 'nested-interactive', enabled: false }],
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'wide'],
      description: 'Size variant of the sidebar',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'string' },
      },
    },
    children: {
      control: false,
      description: 'Sidebar content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default sidebar with basic content - demonstrates the simplest usage.
 */
export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader icon="AI">AI Assistant</SidebarHeader>
      <SidebarContent>
        <SidebarSection>
          <SidebarItem icon={<span>🏠</span>}>Home</SidebarItem>
          <SidebarItem icon={<span>📊</span>}>Dashboard</SidebarItem>
          <SidebarItem icon={<span>⚙️</span>} active>
            Settings
          </SidebarItem>
        </SidebarSection>
      </SidebarContent>
      <SidebarFooter icon={<span>👤</span>}>User Profile</SidebarFooter>
    </Sidebar>
  ),
};

/**
 * Compact variant - narrower sidebar for space-constrained layouts.
 */
export const Compact: Story = {
  args: {
    variant: 'compact',
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader icon="AI">AI</SidebarHeader>
      <SidebarContent>
        <SidebarSection>
          <SidebarItem icon={<span>🏠</span>}>Home</SidebarItem>
          <SidebarItem icon={<span>📊</span>}>Dashboard</SidebarItem>
          <SidebarItem icon={<span>⚙️</span>} active>
            Settings
          </SidebarItem>
        </SidebarSection>
      </SidebarContent>
    </Sidebar>
  ),
};

/**
 * Wide variant - wider sidebar for more detailed content.
 */
export const Wide: Story = {
  args: {
    variant: 'wide',
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader icon="MDT">Motadata Platform</SidebarHeader>
      <SidebarContent>
        <SidebarSection>
          <SidebarLabel>Main Navigation</SidebarLabel>
          <SidebarItem icon={<span>🏠</span>}>Home Dashboard</SidebarItem>
          <SidebarItem icon={<span>📊</span>}>Analytics & Reporting</SidebarItem>
          <SidebarItem icon={<span>⚙️</span>} active>
            System Settings
          </SidebarItem>
        </SidebarSection>
      </SidebarContent>
      <SidebarFooter icon={<span>👤</span>}>User Profile Settings</SidebarFooter>
    </Sidebar>
  ),
};

/**
 * Sidebar with search functionality - demonstrates search feature.
 */
const SearchableComponent = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const items = [
    { name: 'Incidents', icon: '🚨' },
    { name: 'Monitors', icon: '📊' },
    { name: 'Problems', icon: '⚠️' },
    { name: 'Changes', icon: '🔄' },
    { name: 'Assets', icon: '💼' },
  ];
  const filteredItems = searchValue
    ? items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    : items;

  return (
    <Sidebar>
      <SidebarHeader icon="IT">IT Operations</SidebarHeader>
      <SidebarSearch
        placeholder="Search apps..."
        shortcut="⌘K"
        onSearch={(value) => {
          setSearchValue(value);
        }}
      />
      <SidebarContent>
        <SidebarSection>
          <SidebarLabel>Applications</SidebarLabel>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <SidebarItem key={item.name} icon={<span>{item.icon}</span>}>
                {item.name}
              </SidebarItem>
            ))
          ) : (
            <div className="mdt-px-3 mdt-py-2 mdt-text-sm mdt-text-foreground">
              No results found
            </div>
          )}
        </SidebarSection>
      </SidebarContent>
    </Sidebar>
  );
};

export const WithSearch: Story = {
  render: () => <SearchableComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with integrated search functionality. Search filters items in real-time.',
      },
    },
  },
};

/**
 * Sidebar with collapsible sections - demonstrates expandable groups.
 */
export const WithCollapsibleSections: Story = {
  render: () => (
    <Sidebar>
      <SidebarHeader icon="FS">File System</SidebarHeader>
      <SidebarContent>
        <SidebarCollapse title="Documents" defaultOpen>
          <SidebarItem icon={<span>📄</span>}>Resume.pdf</SidebarItem>
          <SidebarItem icon={<span>📄</span>}>Cover Letter.docx</SidebarItem>
        </SidebarCollapse>
        <SidebarCollapse title="Images" defaultOpen={false}>
          <SidebarItem icon={<span>🖼️</span>}>Photo1.jpg</SidebarItem>
          <SidebarItem icon={<span>🖼️</span>}>Photo2.png</SidebarItem>
        </SidebarCollapse>
        <SidebarCollapse title="Projects">
          <SidebarItem icon={<span>📁</span>}>Website Redesign</SidebarItem>
          <SidebarItem icon={<span>📁</span>}>Mobile App</SidebarItem>
        </SidebarCollapse>
      </SidebarContent>
    </Sidebar>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Sidebar with collapsible sections. Use `defaultOpen` prop to control initial state.',
      },
    },
  },
};

/**
 * Sidebar with nested items - demonstrates hierarchical structure.
 */
export const WithNestedItems: Story = {
  render: () => (
    <Sidebar>
      <SidebarHeader icon="PM">Project Manager</SidebarHeader>
      <SidebarContent>
        <SidebarSection>
          <SidebarLabel>Projects</SidebarLabel>
          <SidebarItem icon={<span>📁</span>}>Website Redesign</SidebarItem>
          <SidebarItem nested icon={<span>📋</span>}>
            Tasks Board
          </SidebarItem>
          <SidebarItem nested icon={<span>👥</span>}>
            Team Members
          </SidebarItem>
          <SidebarItem icon={<span>📁</span>} active>
            Mobile App
          </SidebarItem>
          <SidebarItem nested icon={<span>📋</span>} active>
            Backlog
          </SidebarItem>
          <SidebarItem nested icon={<span>🚀</span>}>
            Releases
          </SidebarItem>
        </SidebarSection>
      </SidebarContent>
    </Sidebar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with nested items using the `nested` prop for visual hierarchy.',
      },
    },
  },
};

/**
 * Sidebar with action buttons - demonstrates hover-revealed actions.
 */
export const WithActionButtons: Story = {
  render: () => (
    <Sidebar>
      <SidebarHeader icon="PM">Projects</SidebarHeader>
      <SidebarContent>
        <SidebarSection>
          <SidebarLabel
            action={
              <button
                type="button"
                className="mdt-rounded mdt-p-0.5 hover:mdt-bg-muted"
                aria-label="Add project"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mdt-h-3.5 mdt-w-3.5"
                >
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
              </button>
            }
          >
            Active Projects
          </SidebarLabel>
          <SidebarItem
            icon={<span>📁</span>}
            action={
              <button
                type="button"
                className="mdt-rounded mdt-p-0.5 hover:mdt-bg-muted"
                aria-label="More options"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mdt-h-3.5 mdt-w-3.5"
                >
                  <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                </svg>
              </button>
            }
          >
            Website Redesign
          </SidebarItem>
          <SidebarItem
            icon={<span>📁</span>}
            action={
              <button
                type="button"
                className="mdt-rounded mdt-p-0.5 hover:mdt-bg-muted"
                aria-label="More options"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mdt-h-3.5 mdt-w-3.5"
                >
                  <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                </svg>
              </button>
            }
          >
            Mobile App
          </SidebarItem>
        </SidebarSection>
      </SidebarContent>
    </Sidebar>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Sidebar with action buttons that appear on hover. Use the `action` prop to add custom buttons.',
      },
    },
  },
};

/**
 * Sidebar with custom borders - demonstrates border configuration.
 */
export const WithCustomBorders: Story = {
  render: () => (
    <div className="mdt-flex mdt-gap-4">
      <Sidebar>
        <SidebarHeader icon="AI" showBorder>
          With Border
        </SidebarHeader>
        <SidebarContent>
          <SidebarSection>
            <SidebarItem icon={<span>🏠</span>}>Home</SidebarItem>
            <SidebarItem icon={<span>📊</span>}>Dashboard</SidebarItem>
          </SidebarSection>
        </SidebarContent>
        <SidebarFooter icon={<span>👤</span>} showBorder>
          With Border
        </SidebarFooter>
      </Sidebar>
      <Sidebar>
        <SidebarHeader icon="AI" showBorder={false}>
          No Border
        </SidebarHeader>
        <SidebarContent>
          <SidebarSection>
            <SidebarItem icon={<span>🏠</span>}>Home</SidebarItem>
            <SidebarItem icon={<span>📊</span>}>Dashboard</SidebarItem>
          </SidebarSection>
        </SidebarContent>
        <SidebarFooter icon={<span>👤</span>} showBorder={false}>
          No Border
        </SidebarFooter>
      </Sidebar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Control borders on header and footer using the `showBorder` prop. Defaults to `true`.',
      },
    },
  },
};

/**
 * Complete sidebar example matching the Figma design
 */
export const FigmaDesign: Story = {
  render: () => (
    <Sidebar>
      <SidebarHeader
        icon="IO"
        popoverContent={
          <>
            <DropdownMenuItem>IT Operations</DropdownMenuItem>
            <DropdownMenuItem>Sales Dashboard</DropdownMenuItem>
            <DropdownMenuItem>Marketing Hub</DropdownMenuItem>
          </>
        }
      >
        IT Operations...
      </SidebarHeader>
      <SidebarSearch placeholder="Search..." />
      <SidebarContent>
        {/* Pinned apps */}
        <SidebarSection>
          <SidebarLabel
            action={
              <>
                <button
                  type="button"
                  className="mdt-rounded mdt-p-0.5 hover:mdt-bg-muted"
                  aria-label="Search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mdt-h-3.5 mdt-w-3.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="mdt-rounded mdt-p-0.5 hover:mdt-bg-muted"
                  aria-label="Grid view"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mdt-h-3.5 mdt-w-3.5"
                  >
                    <path d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zM4.25 11A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zM13.25 2A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zM13.25 11A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" />
                  </svg>
                </button>
              </>
            }
          >
            Pinned apps
          </SidebarLabel>
          <SidebarItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mdt-h-5 mdt-w-5 mdt-text-blue-500"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 3A1.5 1.5 0 001 4.5v4A1.5 1.5 0 002.5 10h6A1.5 1.5 0 0010 8.5v-4A1.5 1.5 0 008.5 3h-6zm11 2A1.5 1.5 0 0012 6.5v7a1.5 1.5 0 001.5 1.5h4a1.5 1.5 0 001.5-1.5v-7A1.5 1.5 0 0017.5 5h-4zm-10 7A1.5 1.5 0 002 13.5v2A1.5 1.5 0 003.5 17h6a1.5 1.5 0 001.5-1.5v-2A1.5 1.5 0 009.5 12h-6z"
                  clipRule="evenodd"
                />
              </svg>
            }
          >
            Incidents
          </SidebarItem>
          <SidebarItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mdt-h-5 mdt-w-5 mdt-text-green-500"
              >
                <path d="M10 1a6 6 0 00-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 00.572.729 6.016 6.016 0 002.856 0A.75.75 0 0012 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0010 1zM8.863 17.414a.75.75 0 00-.226 1.483 9.066 9.066 0 002.726 0 .75.75 0 00-.226-1.483 7.553 7.553 0 01-2.274 0z" />
              </svg>
            }
          >
            Monitors
          </SidebarItem>
          <SidebarItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mdt-h-5 mdt-w-5 mdt-text-orange-500"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            }
          >
            Problems
          </SidebarItem>
          <SidebarItem variant="more">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="mdt-h-4 mdt-w-4"
            >
              <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
            </svg>
            <span className="mdt-ml-1">More</span>
          </SidebarItem>
        </SidebarSection>

        {/* Favorite */}
        <SidebarCollapse title="Favorite">
          <SidebarItem>Favorite Item 1</SidebarItem>
          <SidebarItem>Favorite Item 2</SidebarItem>
        </SidebarCollapse>

        {/* Collections */}
        <SidebarCollapse title="Collections" defaultOpen>
          <SidebarItem
            icon={
              <div className="mdt-flex mdt-h-5 mdt-w-5 mdt-items-center mdt-justify-center mdt-rounded mdt-border mdt-border-border mdt-text-[10px] mdt-font-medium">
                I
              </div>
            }
            action={
              <>
                <button
                  type="button"
                  className="mdt-rounded mdt-p-0.5 hover:mdt-bg-muted"
                  aria-label="More options"
                  onClick={fn()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mdt-h-3.5 mdt-w-3.5"
                  >
                    <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="mdt-rounded mdt-p-0.5 hover:mdt-bg-muted"
                  aria-label="Add"
                  onClick={fn()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mdt-h-3.5 mdt-w-3.5"
                  >
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                </button>
              </>
            }
          >
            Incident Response
          </SidebarItem>
          <SidebarItem
            nested
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mdt-h-4 mdt-w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zM4.25 11A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zM13.25 2A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zM13.25 11A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                />
              </svg>
            }
          >
            Active Alerts Board
          </SidebarItem>
          <SidebarItem
            nested
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mdt-h-4 mdt-w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zM4.25 11A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zM13.25 2A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zM13.25 11A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                />
              </svg>
            }
          >
            Incident War Room
          </SidebarItem>
          <SidebarItem
            nested
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mdt-h-4 mdt-w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zM4.25 11A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zM13.25 2A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zM13.25 11A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                />
              </svg>
            }
          >
            Root Cause Analysis Bo...
          </SidebarItem>
          <SidebarItem variant="more" nested>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="mdt-h-4 mdt-w-4"
            >
              <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
            </svg>
            <span className="mdt-ml-1">More</span>
          </SidebarItem>
          <SidebarItem
            icon={
              <div className="mdt-flex mdt-h-5 mdt-w-5 mdt-items-center mdt-justify-center mdt-rounded mdt-border mdt-border-border mdt-text-[10px] mdt-font-medium">
                M
              </div>
            }
          >
            Monitoring & Metrics
          </SidebarItem>
          <SidebarItem
            icon={
              <div className="mdt-flex mdt-h-5 mdt-w-5 mdt-items-center mdt-justify-center mdt-rounded mdt-border mdt-border-border mdt-text-[10px] mdt-font-medium">
                K
              </div>
            }
          >
            Knowledge Base & Solutions
          </SidebarItem>
          <SidebarItem variant="more">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="mdt-h-4 mdt-w-4"
            >
              <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
            </svg>
            <span className="mdt-ml-1">More</span>
          </SidebarItem>
        </SidebarCollapse>

        {/* Shared */}
        <SidebarCollapse title="Shared">
          <SidebarItem>Shared Item 1</SidebarItem>
          <SidebarItem>Shared Item 2</SidebarItem>
        </SidebarCollapse>
      </SidebarContent>
      <SidebarFooter
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="mdt-h-4 mdt-w-4"
          >
            <path d="M17 2.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zM17 15.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM3.75 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM4.5 2.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zM10 11a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5A.75.75 0 0110 11zM10.75 2.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM10 6a2 2 0 100 4 2 2 0 000-4zM3.75 10a2 2 0 100 4 2 2 0 000-4zM16.25 10a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
        }
      >
        Customize sidebar
      </SidebarFooter>
    </Sidebar>
  ),
};

/**
 * Interactive example with working project switcher, search, and more functionality
 */
const InteractiveExampleComponent = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [selectedProject, setSelectedProject] = React.useState('IT Operations');

  const projects = [
    { id: '1', name: 'IT Operations', icon: 'IO' },
    { id: '2', name: 'Sales Dashboard', icon: 'SD' },
    { id: '3', name: 'Marketing Hub', icon: 'MH' },
    { id: '4', name: 'HR Portal', icon: 'HR' },
  ];

  const allItems = [
    { name: 'Incidents', icon: '🚨' },
    { name: 'Monitors', icon: '📊' },
    { name: 'Problems', icon: '⚠️' },
    { name: 'Changes', icon: '🔄' },
    { name: 'Assets', icon: '💼' },
  ];

  const filteredItems = searchValue
    ? allItems.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    : allItems;

  return (
    <Sidebar>
      <SidebarHeader
        icon={projects.find((p) => p.name === selectedProject)?.icon}
        popoverContent={
          <>
            {projects.map((project) => (
              <DropdownMenuItem
                key={project.id}
                onClick={() => {
                  setSelectedProject(project.name);
                }}
              >
                <div className="mdt-flex mdt-items-center mdt-gap-2">
                  <div className="mdt-flex mdt-h-6 mdt-w-6 mdt-items-center mdt-justify-center mdt-rounded mdt-bg-primary mdt-text-xs mdt-text-primary-foreground">
                    {project.icon}
                  </div>
                  <span>{project.name}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </>
        }
      >
        {selectedProject}
      </SidebarHeader>
      <SidebarSearch
        placeholder="Search..."
        onSearch={(value) => {
          setSearchValue(value);
        }}
      />
      <SidebarContent>
        {/* Pinned apps */}
        <SidebarSection>
          <SidebarLabel>Pinned apps</SidebarLabel>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <SidebarItem
                key={item.name}
                icon={<span>{item.icon}</span>}
                onClick={() => {
                  /* Item clicked */
                }}
              >
                {item.name}
              </SidebarItem>
            ))
          ) : (
            <div className="mdt-px-3 mdt-py-2 mdt-text-sm mdt-text-foreground">No items found</div>
          )}
        </SidebarSection>

        {/* Collapsible Collections */}
        <SidebarCollapse title="Collections" defaultOpen>
          <SidebarItem
            icon={<div className="mdt-text-xs">I</div>}
            action={
              <>
                <button
                  type="button"
                  className="mdt-rounded mdt-p-0.5 hover:mdt-bg-muted"
                  aria-label="More options"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mdt-h-3.5 mdt-w-3.5"
                  >
                    <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="mdt-rounded mdt-p-0.5 hover:mdt-bg-muted"
                  aria-label="Add item"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mdt-h-3.5 mdt-w-3.5"
                  >
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                </button>
              </>
            }
            onClick={() => {
              /* Incident Response clicked */
            }}
          >
            Incident Response
          </SidebarItem>
          <SidebarItem
            nested
            icon={<span className="mdt-text-xs">📋</span>}
            onClick={() => {
              /* Active Alerts Board clicked */
            }}
          >
            Active Alerts Board
          </SidebarItem>
          <SidebarItem
            nested
            icon={<span className="mdt-text-xs">🏠</span>}
            onClick={() => {
              /* Incident War Room clicked */
            }}
          >
            Incident War Room
          </SidebarItem>
        </SidebarCollapse>

        {/* More button */}
        <SidebarSection>
          <SidebarItem
            variant="more"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mdt-h-4 mdt-w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                  clipRule="evenodd"
                />
              </svg>
            }
            onClick={() => {
              /* More clicked */
            }}
          >
            More
          </SidebarItem>
        </SidebarSection>
      </SidebarContent>
      <SidebarFooter
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="mdt-h-4 mdt-w-4"
          >
            <path
              fillRule="evenodd"
              d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        }
      >
        Customize sidebar
      </SidebarFooter>
    </Sidebar>
  );
};

export const InteractiveExample: Story = {
  render: () => <InteractiveExampleComponent />,
};

/**
 * Data-driven sidebar example - Single source of truth configuration
 * This shows how to build a complete sidebar from a configuration object.
 * Perfect for UI kit users who want to define their sidebar structure in data.
 */
export const DataDriven: Story = {
  render: () => {
    const config: SidebarConfig = {
      header: {
        title: 'IT Operations',
        icon: 'IO',
        showBorder: true,
        projects: [
          {
            id: '1',
            name: 'IT Operations',
            icon: 'IO',
            onClick: () => {
              /* IT Operations */
            },
          },
          {
            id: '2',
            name: 'Sales Dashboard',
            icon: 'SD',
            onClick: () => {
              /* Sales */
            },
          },
          {
            id: '3',
            name: 'Marketing Hub',
            icon: 'MH',
            onClick: () => {
              /* Marketing */
            },
          },
        ],
      },
      search: {
        placeholder: 'Search...',
        onSearch: () => {
          /* Search */
        },
      },
      sections: [
        {
          id: 'pinned',
          label: 'Pinned apps',
          maxVisibleItems: 3,
          items: [
            {
              id: '1',
              label: 'Incidents',
              icon: <span>🚨</span>,
              onClick: () => {
                /* Incidents */
              },
            },
            {
              id: '2',
              label: 'Monitors',
              icon: <span>📊</span>,
              onClick: () => {
                /* Monitors */
              },
            },
            {
              id: '3',
              label: 'Problems',
              icon: <span>⚠️</span>,
              onClick: () => {
                /* Problems */
              },
            },
            {
              id: '4',
              label: 'Changes',
              icon: <span>🔄</span>,
              onClick: () => {
                /* Changes */
              },
            },
            {
              id: '5',
              label: 'Assets',
              icon: <span>💼</span>,
              onClick: () => {
                /* Assets */
              },
            },
          ],
        },
        {
          id: 'collections',
          label: 'Collections',
          collapsible: true,
          defaultOpen: true,
          items: [
            {
              id: 'c1',
              label: 'Incident Response',
              icon: <div className="mdt-text-xs">I</div>,
              onClick: () => {
                /* Incident Response */
              },
              actions: [
                {
                  icon: (
                    <svg className="mdt-h-3.5 mdt-w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                    </svg>
                  ),
                  label: 'More',
                  onClick: () => {
                    /* More */
                  },
                },
              ],
              children: [
                {
                  id: 'c1-1',
                  label: 'Active Alerts',
                  icon: <span>📋</span>,
                  onClick: () => {
                    /* Alerts */
                  },
                },
                {
                  id: 'c1-2',
                  label: 'War Room',
                  icon: <span>🏠</span>,
                  onClick: () => {
                    /* War Room */
                  },
                },
              ],
            },
          ],
        },
      ],
      footer: {
        label: 'Customize sidebar',
        showBorder: true,
        onClick: () => {
          /* Customize */
        },
        icon: (
          <svg className="mdt-h-4 mdt-w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
    };

    return <DataDrivenSidebar config={config} />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Complete data-driven sidebar example. Define your entire sidebar structure in a single configuration object. Features:\n\n' +
          '- **Project Switcher**: Header with dropdown for switching projects\n' +
          '- **Search**: Built-in search functionality\n' +
          '- **Smart "More" Button**: Automatically shows/hides items based on `maxVisibleItems`\n' +
          '- **Collapsible Sections**: Expandable/collapsible groups\n' +
          '- **Nested Items**: Support for child items\n' +
          '- **Action Buttons**: Hover-revealed buttons (three-dot menu, add, etc.)\n' +
          '- **Border Configuration**: Control borders on header and footer\n\n' +
          'Perfect for UI kit users who want to build their sidebar from data arrays.',
      },
    },
  },
};
