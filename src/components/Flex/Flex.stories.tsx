import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from './Flex';

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  component: Flex,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A flexible layout primitive for creating flexbox layouts. Supports direction, wrapping, gaps, and alignment options.',
      },
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'col', 'col-reverse'],
      description: 'Flex direction',
      table: {
        defaultValue: { summary: 'row' },
      },
    },
    wrap: {
      control: 'select',
      options: ['wrap', 'nowrap', 'wrap-reverse'],
      description: 'Flex wrap behavior',
      table: {
        defaultValue: { summary: 'nowrap' },
      },
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
      description: 'Justify content along the main axis',
    },
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'baseline', 'stretch'],
      description: 'Align items along the cross axis',
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Gap between flex items',
    },
    gapX: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Horizontal gap between flex items',
    },
    gapY: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Vertical gap between flex items',
    },
    as: {
      control: 'text',
      description: 'HTML element to render as',
      table: {
        defaultValue: { summary: 'div' },
      },
    },
    children: {
      control: false,
      description: 'Content to display inside the flex container',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for demo items
const FlexItem = ({ children }: { children: React.ReactNode }) => (
  <div className="mdt-rounded-md mdt-border mdt-border-border mdt-bg-muted mdt-p-4 mdt-text-center mdt-text-sm">
    {children}
  </div>
);

/**
 * Default horizontal flex layout.
 */
export const Default: Story = {
  args: {
    gap: 'md',
  },
  render: (args) => (
    <Flex {...args}>
      <FlexItem>Item 1</FlexItem>
      <FlexItem>Item 2</FlexItem>
      <FlexItem>Item 3</FlexItem>
    </Flex>
  ),
};

/**
 * Different flex directions.
 */
export const Directions: Story = {
  render: () => (
    <div className="mdt-space-y-8">
      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Row (horizontal)</p>
        <Flex direction="row" gap="md">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Column (vertical)</p>
        <Flex direction="col" gap="md">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Row reverse</p>
        <Flex direction="row-reverse" gap="md">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Column reverse</p>
        <Flex direction="col-reverse" gap="md">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>
    </div>
  ),
};

/**
 * Justify content options (main axis alignment).
 */
export const JustifyContent: Story = {
  render: () => (
    <div className="mdt-space-y-8">
      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Start</p>
        <Flex justify="start" gap="md">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
        </Flex>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Center</p>
        <Flex justify="center" gap="md">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
        </Flex>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">End</p>
        <Flex justify="end" gap="md">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
        </Flex>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Between</p>
        <Flex justify="between" gap="md">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Around</p>
        <Flex justify="around" gap="md">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Evenly</p>
        <Flex justify="evenly" gap="md">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>
    </div>
  ),
};

/**
 * Align items options (cross axis alignment).
 */
export const AlignItems: Story = {
  render: () => (
    <div className="mdt-space-y-8">
      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Start</p>
        <Flex
          align="start"
          gap="md"
          className="mdt-h-24 mdt-border mdt-border-dashed mdt-border-border"
        >
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Center</p>
        <Flex
          align="center"
          gap="md"
          className="mdt-h-24 mdt-border mdt-border-dashed mdt-border-border"
        >
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">End</p>
        <Flex
          align="end"
          gap="md"
          className="mdt-h-24 mdt-border mdt-border-dashed mdt-border-border"
        >
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Stretch</p>
        <Flex
          align="stretch"
          gap="md"
          className="mdt-h-24 mdt-border mdt-border-dashed mdt-border-border"
        >
          <div className="mdt-rounded-md mdt-border mdt-border-border mdt-bg-muted mdt-p-4 mdt-text-center mdt-text-sm">
            1
          </div>
          <div className="mdt-rounded-md mdt-border mdt-border-border mdt-bg-muted mdt-p-4 mdt-text-center mdt-text-sm">
            2
          </div>
          <div className="mdt-rounded-md mdt-border mdt-border-border mdt-bg-muted mdt-p-4 mdt-text-center mdt-text-sm">
            3
          </div>
        </Flex>
      </div>
    </div>
  ),
};

/**
 * Different gap sizes.
 */
export const Gaps: Story = {
  render: () => (
    <div className="mdt-space-y-8">
      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">No gap</p>
        <Flex gap="none">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Small gap (8px)</p>
        <Flex gap="sm">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Medium gap (16px)</p>
        <Flex gap="md">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Large gap (24px)</p>
        <Flex gap="lg">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>
    </div>
  ),
};

/**
 * Flex wrap behavior.
 */
export const Wrapping: Story = {
  render: () => (
    <div className="mdt-space-y-8">
      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">No wrap (overflow)</p>
        <Flex wrap="nowrap" gap="md" className="mdt-w-80">
          <FlexItem>Item 1</FlexItem>
          <FlexItem>Item 2</FlexItem>
          <FlexItem>Item 3</FlexItem>
          <FlexItem>Item 4</FlexItem>
        </Flex>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Wrap</p>
        <Flex wrap="wrap" gap="md" className="mdt-w-80">
          <FlexItem>Item 1</FlexItem>
          <FlexItem>Item 2</FlexItem>
          <FlexItem>Item 3</FlexItem>
          <FlexItem>Item 4</FlexItem>
        </Flex>
      </div>
    </div>
  ),
};

/**
 * Header with logo and navigation.
 */
export const Header: Story = {
  render: () => (
    /* eslint-disable @typescript-eslint/no-explicit-any */
    <Flex
      as={'header' as any}
      justify="between"
      align="center"
      className="mdt-border-b mdt-border-border mdt-bg-background mdt-px-6 mdt-py-4"
    >
      <div className="mdt-text-lg mdt-font-bold">Logo</div>
      <Flex as={'nav' as any} gap="lg" align="center">
        {/* eslint-enable @typescript-eslint/no-explicit-any */}
        <button type="button" className="mdt-text-sm hover:mdt-text-primary">
          Home
        </button>
        <button type="button" className="mdt-text-sm hover:mdt-text-primary">
          About
        </button>
        <button type="button" className="mdt-text-sm hover:mdt-text-primary">
          Services
        </button>
        <button type="button" className="mdt-text-sm hover:mdt-text-primary">
          Contact
        </button>
      </Flex>
      <button className="mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-text-primary-foreground">
        Sign In
      </button>
    </Flex>
  ),
};

/**
 * Card with centered content.
 */
export const CenteredCard: Story = {
  render: () => (
    <Flex
      direction="col"
      align="center"
      justify="center"
      gap="md"
      className="mdt-h-64 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card"
    >
      <div className="mdt-text-2xl mdt-font-bold">Welcome</div>
      <p className="mdt-text-sm mdt-text-muted-foreground">This content is perfectly centered</p>
      <button className="mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-text-primary-foreground">
        Get Started
      </button>
    </Flex>
  ),
};

/**
 * Button group.
 */
export const ButtonGroup: Story = {
  render: () => (
    <div className="mdt-space-y-8">
      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Horizontal button group</p>
        <Flex gap="sm">
          <button className="mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-py-2 mdt-text-sm hover:mdt-bg-muted">
            Cancel
          </button>
          <button className="mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-py-2 mdt-text-sm hover:mdt-bg-muted">
            Save Draft
          </button>
          <button className="mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90">
            Publish
          </button>
        </Flex>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Vertical button group</p>
        <Flex direction="col" gap="sm" className="mdt-w-48">
          <button className="mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-py-2 mdt-text-sm hover:mdt-bg-muted">
            Edit Profile
          </button>
          <button className="mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-py-2 mdt-text-sm hover:mdt-bg-muted">
            Settings
          </button>
          <button className="mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-py-2 mdt-text-sm hover:mdt-bg-muted">
            Log Out
          </button>
        </Flex>
      </div>
    </div>
  ),
};

/**
 * Form actions aligned to the right.
 */
export const FormActions: Story = {
  render: () => (
    <div className="mdt-w-full mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-6">
      <h3 className="mdt-mb-4 mdt-text-lg mdt-font-semibold">Create Account</h3>
      <div className="mdt-mb-4 mdt-space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"
        />
        <input
          type="email"
          placeholder="Email"
          className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"
        />
      </div>
      <Flex justify="end" gap="sm">
        <button className="mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-py-2 mdt-text-sm hover:mdt-bg-muted">
          Cancel
        </button>
        <button className="mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90">
          Create
        </button>
      </Flex>
    </div>
  ),
};

/**
 * Sidebar layout.
 */
export const SidebarLayout: Story = {
  render: () => (
    <Flex gap="md" className="mdt-h-64">
      <aside className="mdt-w-48 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-muted mdt-p-4">
        <p className="mdt-text-sm mdt-font-medium">Sidebar</p>
      </aside>
      <main className="mdt-flex-1 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-6">
        <p className="mdt-text-sm">Main Content</p>
      </main>
    </Flex>
  ),
};

/**
 * Tag list with wrapping.
 */
export const TagList: Story = {
  render: () => (
    <Flex wrap="wrap" gap="sm" className="mdt-w-96">
      {[
        'React',
        'TypeScript',
        'Tailwind',
        'Vite',
        'Storybook',
        'Testing',
        'Accessibility',
        'Design System',
      ].map((tag) => (
        <span
          key={tag}
          className="mdt-rounded-md mdt-bg-secondary mdt-px-3 mdt-py-1 mdt-text-sm mdt-text-secondary-foreground"
        >
          {tag}
        </span>
      ))}
    </Flex>
  ),
};

/**
 * Polymorphic usage as a list.
 */
export const AsList: Story = {
  render: () => (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Flex as={'ul' as any} direction="col" gap="sm">
      <li className="mdt-rounded-md mdt-border mdt-border-border mdt-bg-muted mdt-p-3 mdt-text-sm">
        List item 1
      </li>
      <li className="mdt-rounded-md mdt-border mdt-border-border mdt-bg-muted mdt-p-3 mdt-text-sm">
        List item 2
      </li>
      <li className="mdt-rounded-md mdt-border mdt-border-border mdt-bg-muted mdt-p-3 mdt-text-sm">
        List item 3
      </li>
    </Flex>
  ),
};
