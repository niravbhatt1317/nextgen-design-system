import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TagPill } from './TagPill';

const meta: Meta<typeof TagPill> = {
  title: 'Components/TagPill',
  component: TagPill,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tag pill component for displaying colored tag badges for categorization and labeling.',
      },
    },
    controls: {
      exclude: ['class'],
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'yellow',
        'blue',
        'green',
        'red',
        'purple',
        'orange',
        'pink',
        'teal',
        'cyan',
      ],
      description: 'Color variant of the tag',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'text',
      description: 'Content to display inside the tag pill',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    icon: {
      control: false,
      description: 'Icon element to display before the text',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    onClose: {
      control: false,
      description:
        'Callback function when close button is clicked. Shows close button when provided.',
      table: {
        type: { summary: '() => void' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default tag pill example.
 */
export const Default: Story = {
  args: {
    children: 'Tag',
    variant: 'default',
  },
};

/**
 * Blue variant for components and systems.
 */
export const Blue: Story = {
  args: {
    variant: 'blue',
    children: 'Components',
  },
};

/**
 * Green variant for success states.
 */
export const Green: Story = {
  args: {
    variant: 'green',
    children: 'Equipment',
  },
};

/**
 * Yellow variant for warnings or highlights.
 */
export const Yellow: Story = {
  args: {
    variant: 'yellow',
    children: 'Peripherals',
  },
};

/**
 * Red variant for errors or important tags.
 */
export const Red: Story = {
  args: {
    variant: 'red',
    children: 'Devices',
  },
};

/**
 * Purple variant for special categories.
 */
export const Purple: Story = {
  args: {
    variant: 'purple',
    children: 'Signal',
  },
};

/**
 * Orange variant for alerts.
 */
export const Orange: Story = {
  args: {
    variant: 'orange',
    children: 'Systems',
  },
};

/**
 * All color variants displayed together.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
      <TagPill variant="default">Default</TagPill>
      <TagPill variant="blue">Components</TagPill>
      <TagPill variant="green">Equipment</TagPill>
      <TagPill variant="yellow">Peripherals</TagPill>
      <TagPill variant="red">Devices</TagPill>
      <TagPill variant="purple">Signal</TagPill>
      <TagPill variant="orange">Systems</TagPill>
      <TagPill variant="pink">Access</TagPill>
      <TagPill variant="teal">Router</TagPill>
      <TagPill variant="cyan">Infrastructure</TagPill>
    </div>
  ),
};

/**
 * All size variants displayed together.
 */
export const Sizes: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-4">
      <TagPill size="sm" variant="blue">
        Small
      </TagPill>
      <TagPill size="md" variant="green">
        Medium
      </TagPill>
      <TagPill size="lg" variant="purple">
        Large
      </TagPill>
    </div>
  ),
};

/**
 * Example with multiple tags as seen in the incidents table.
 */
export const MultipleTags: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-wrap mdt-gap-1.5">
      <TagPill variant="yellow">Components</TagPill>
      <TagPill variant="blue">Network</TagPill>
      <TagPill variant="default">+1</TagPill>
    </div>
  ),
};

/**
 * Example with count indicators.
 */
export const WithCount: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
      <TagPill variant="red">Devices</TagPill>
      <TagPill variant="purple">Internet</TagPill>
      <TagPill variant="default">+2</TagPill>
    </div>
  ),
};

/**
 * Closable tag pills with close button.
 */
export const Closable: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
      <TagPill variant="yellow" onClose={fn()}>
        User Management
      </TagPill>
      <TagPill variant="pink" onClose={fn()}>
        API
      </TagPill>
      <TagPill variant="green" onClose={fn()}>
        Equipment
      </TagPill>
      <TagPill variant="purple" onClose={fn()}>
        Server
      </TagPill>
    </div>
  ),
};

/**
 * Tag pills with icons.
 */
export const WithIcon: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
      <TagPill
        variant="purple"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="mdt-h-3 mdt-w-3"
          >
            <path d="M8 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 1ZM10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM12.95 4.11a.75.75 0 1 0-1.06-1.06l-1.062 1.06a.75.75 0 0 0 1.061 1.062l1.06-1.061ZM15 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 15 8ZM11.89 12.95a.75.75 0 0 0 1.06-1.06l-1.06-1.062a.75.75 0 0 0-1.062 1.061l1.061 1.06ZM8 12a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 12ZM5.172 11.89a.75.75 0 0 0-1.061-1.062L3.05 11.89a.75.75 0 1 0 1.06 1.06l1.06-1.06ZM4 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 4 8ZM4.11 5.172A.75.75 0 0 0 5.173 4.11L4.11 3.05a.75.75 0 1 0-1.06 1.06l1.06 1.06Z" />
          </svg>
        }
      >
        Internet
      </TagPill>
      <TagPill
        variant="blue"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="mdt-h-3 mdt-w-3"
          >
            <path d="M2.5 3.5A1.5 1.5 0 0 1 4 2h8a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 12 14H4a1.5 1.5 0 0 1-1.5-1.5v-9Z" />
          </svg>
        }
      >
        Components
      </TagPill>
      <TagPill
        variant="green"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="mdt-h-3 mdt-w-3"
          >
            <path
              fillRule="evenodd"
              d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z"
              clipRule="evenodd"
            />
          </svg>
        }
      >
        Network
      </TagPill>
    </div>
  ),
};

/**
 * Combined: Closable tags with icons.
 */
export const ClosableWithIcon: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
      <TagPill
        variant="purple"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="mdt-h-3 mdt-w-3"
          >
            <path d="M8 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 1ZM10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM12.95 4.11a.75.75 0 1 0-1.06-1.06l-1.062 1.06a.75.75 0 0 0 1.061 1.062l1.06-1.061ZM15 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 15 8ZM11.89 12.95a.75.75 0 0 0 1.06-1.06l-1.06-1.062a.75.75 0 0 0-1.062 1.061l1.061 1.06ZM8 12a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 12ZM5.172 11.89a.75.75 0 0 0-1.061-1.062L3.05 11.89a.75.75 0 1 0 1.06 1.06l1.06-1.06ZM4 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 4 8ZM4.11 5.172A.75.75 0 0 0 5.173 4.11L4.11 3.05a.75.75 0 1 0-1.06 1.06l1.06 1.06Z" />
          </svg>
        }
        onClose={fn()}
      >
        AI Suggested
      </TagPill>
      <TagPill
        variant="yellow"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="mdt-h-3 mdt-w-3"
          >
            <path
              fillRule="evenodd"
              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25a.75.75 0 0 0-1.5 0v4.69L4.22 12.47a.75.75 0 0 0 1.06 1.06l3.25-3.25a.75.75 0 0 0 .22-.53V4.75Z"
              clipRule="evenodd"
            />
          </svg>
        }
        onClose={fn()}
      >
        Recent
      </TagPill>
    </div>
  ),
};

/**
 * Tags layout from Figma design - accent colors with transparent backgrounds.
 * This demonstrates the subtle, non-solid color approach.
 */
export const FigmaDesignExample: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-3 mdt-bg-background mdt-p-4">
      <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
        <TagPill variant="yellow">Components</TagPill>
        <TagPill variant="blue">Network</TagPill>
        <TagPill variant="default">+1</TagPill>
      </div>
      <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
        <TagPill variant="red">Devices</TagPill>
        <TagPill variant="purple">Internet</TagPill>
        <TagPill variant="default">+2</TagPill>
      </div>
      <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
        <TagPill variant="green">Equipment</TagPill>
        <TagPill variant="orange">Wireless</TagPill>
        <TagPill variant="default">+5</TagPill>
      </div>
      <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
        <TagPill variant="default">Default</TagPill>
      </div>
      <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
        <TagPill variant="yellow">Peripherals</TagPill>
        <TagPill variant="purple">Signal</TagPill>
        <TagPill variant="default">+3</TagPill>
      </div>
      <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
        <TagPill variant="orange">Systems</TagPill>
        <TagPill variant="red">Access</TagPill>
      </div>
      <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
        <TagPill variant="teal">Infrastructure</TagPill>
        <TagPill variant="green">Router</TagPill>
        <TagPill variant="default">+1</TagPill>
      </div>
      <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
        <TagPill variant="cyan">Hardware</TagPill>
        <TagPill variant="purple">Server</TagPill>
        <TagPill variant="default">+3</TagPill>
      </div>
      <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
        <TagPill variant="yellow">User Management</TagPill>
        <TagPill variant="pink">API</TagPill>
        <TagPill variant="default">+2</TagPill>
      </div>
      <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
        <TagPill variant="teal">Data Management</TagPill>
      </div>
      <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
        <TagPill variant="teal">Infrastructure</TagPill>
        <TagPill variant="orange">Router</TagPill>
        <TagPill variant="default">+4</TagPill>
      </div>
    </div>
  ),
};
