import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from './Stack';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible layout component that arranges children vertically or horizontally with consistent spacing. Supports dividers, alignment, and gap control.',
      },
    },
    controls: {
      exclude: ['class'],
    },
  },
  argTypes: {
    children: {
      control: false,
      description: 'Content to be stacked',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Direction of the stack',
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Gap between items',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Main axis alignment',
      table: {
        defaultValue: { summary: 'start' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Cross axis alignment',
      table: {
        defaultValue: { summary: 'stretch' },
      },
    },
    wrap: {
      control: 'boolean',
      description: 'Whether items should wrap',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width stack',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    divider: {
      control: 'boolean',
      description: 'Show dividers between items',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Add custom Tailwind classes here to test',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for demo items
const DemoBox = ({ children, ...props }: { children: React.ReactNode }) => (
  <div
    className="mdt-rounded-lg mdt-bg-primary mdt-p-4 mdt-text-center mdt-text-primary-foreground"
    {...props}
  >
    {children}
  </div>
);

/**
 * Default vertical stack with medium gap.
 */
export const Default: Story = {
  args: {
    children: (
      <>
        <DemoBox>Item 1</DemoBox>
        <DemoBox>Item 2</DemoBox>
        <DemoBox>Item 3</DemoBox>
      </>
    ),
  },
};

/**
 * Horizontal stack for button groups.
 */
export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    gap: 'md',
    children: (
      <>
        <DemoBox>Button 1</DemoBox>
        <DemoBox>Button 2</DemoBox>
        <DemoBox>Button 3</DemoBox>
      </>
    ),
  },
};

/**
 * All gap sizes displayed.
 */
export const GapSizes: Story = {
  render: () => (
    <div className="mdt-space-y-8">
      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Gap: none</p>
        <Stack gap="none">
          <DemoBox>Item 1</DemoBox>
          <DemoBox>Item 2</DemoBox>
          <DemoBox>Item 3</DemoBox>
        </Stack>
      </div>

      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Gap: xs (4px)</p>
        <Stack gap="xs">
          <DemoBox>Item 1</DemoBox>
          <DemoBox>Item 2</DemoBox>
          <DemoBox>Item 3</DemoBox>
        </Stack>
      </div>

      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Gap: sm (8px)</p>
        <Stack gap="sm">
          <DemoBox>Item 1</DemoBox>
          <DemoBox>Item 2</DemoBox>
          <DemoBox>Item 3</DemoBox>
        </Stack>
      </div>

      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Gap: md (16px)</p>
        <Stack gap="md">
          <DemoBox>Item 1</DemoBox>
          <DemoBox>Item 2</DemoBox>
          <DemoBox>Item 3</DemoBox>
        </Stack>
      </div>

      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Gap: lg (24px)</p>
        <Stack gap="lg">
          <DemoBox>Item 1</DemoBox>
          <DemoBox>Item 2</DemoBox>
          <DemoBox>Item 3</DemoBox>
        </Stack>
      </div>

      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Gap: xl (32px)</p>
        <Stack gap="xl">
          <DemoBox>Item 1</DemoBox>
          <DemoBox>Item 2</DemoBox>
          <DemoBox>Item 3</DemoBox>
        </Stack>
      </div>
    </div>
  ),
};

/**
 * Stack with dividers between items.
 */
export const WithDivider: Story = {
  args: {
    divider: true,
    gap: 'md',
    children: (
      <>
        <div className="mdt-p-4">
          <h3 className="mdt-font-semibold">Section 1</h3>
          <p className="mdt-text-sm mdt-text-secondary-foreground">Content for section 1</p>
        </div>
        <div className="mdt-p-4">
          <h3 className="mdt-font-semibold">Section 2</h3>
          <p className="mdt-text-sm mdt-text-secondary-foreground">Content for section 2</p>
        </div>
        <div className="mdt-p-4">
          <h3 className="mdt-font-semibold">Section 3</h3>
          <p className="mdt-text-sm mdt-text-secondary-foreground">Content for section 3</p>
        </div>
      </>
    ),
  },
};

/**
 * Horizontal stack with dividers.
 */
export const HorizontalWithDivider: Story = {
  args: {
    direction: 'horizontal',
    divider: true,
    gap: 'lg',
    children: (
      <>
        <div className="mdt-text-center">
          <div className="mdt-text-2xl mdt-font-bold">1.2K</div>
          <div className="mdt-text-sm mdt-text-secondary-foreground">Followers</div>
        </div>
        <div className="mdt-text-center">
          <div className="mdt-text-2xl mdt-font-bold">543</div>
          <div className="mdt-text-sm mdt-text-secondary-foreground">Following</div>
        </div>
        <div className="mdt-text-center">
          <div className="mdt-text-2xl mdt-font-bold">89</div>
          <div className="mdt-text-sm mdt-text-secondary-foreground">Posts</div>
        </div>
      </>
    ),
  },
};

/**
 * Centered alignment examples.
 */
export const CenteredAlignment: Story = {
  render: () => (
    <div className="mdt-space-y-8">
      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Align: center, Justify: center</p>
        <Stack align="center" justify="center" className="mdt-h-40 mdt-bg-muted">
          <DemoBox>Centered Content</DemoBox>
        </Stack>
      </div>

      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Horizontal - Justify: between</p>
        <Stack direction="horizontal" justify="between" className="mdt-bg-muted mdt-p-4">
          <DemoBox>Left</DemoBox>
          <DemoBox>Right</DemoBox>
        </Stack>
      </div>

      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Horizontal - Justify: evenly</p>
        <Stack direction="horizontal" justify="evenly" className="mdt-bg-muted mdt-p-4">
          <DemoBox>One</DemoBox>
          <DemoBox>Two</DemoBox>
          <DemoBox>Three</DemoBox>
        </Stack>
      </div>
    </div>
  ),
};

/**
 * Wrapping stack for responsive layouts.
 */
export const Wrapping: Story = {
  args: {
    direction: 'horizontal',
    wrap: true,
    gap: 'md',
    className: 'mdt-max-w-md',
    children: (
      <>
        <DemoBox>Tag 1</DemoBox>
        <DemoBox>Tag 2</DemoBox>
        <DemoBox>Tag 3</DemoBox>
        <DemoBox>Long Tag 4</DemoBox>
        <DemoBox>Tag 5</DemoBox>
        <DemoBox>Another Long Tag 6</DemoBox>
        <DemoBox>Tag 7</DemoBox>
        <DemoBox>Tag 8</DemoBox>
      </>
    ),
  },
};

/**
 * Form layout example.
 */
export const FormLayout: Story = {
  render: () => (
    <Stack gap="lg" className="mdt-w-96">
      <div>
        <label htmlFor="stackFullName" className="mdt-mb-1 mdt-block mdt-text-sm mdt-font-medium">
          Full Name
        </label>
        <input
          id="stackFullName"
          type="text"
          placeholder="John Doe"
          className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2"
        />
      </div>

      <div>
        <label htmlFor="stackEmail" className="mdt-mb-1 mdt-block mdt-text-sm mdt-font-medium">
          Email
        </label>
        <input
          id="stackEmail"
          type="email"
          placeholder="john@example.com"
          className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2"
        />
      </div>

      <div>
        <label htmlFor="stackMessage" className="mdt-mb-1 mdt-block mdt-text-sm mdt-font-medium">
          Message
        </label>
        <textarea
          id="stackMessage"
          rows={4}
          placeholder="Your message..."
          className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2"
        />
      </div>

      <Stack direction="horizontal" justify="end" gap="sm">
        <button className="mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-py-2 mdt-text-sm hover:mdt-bg-muted">
          Cancel
        </button>
        <button className="mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90">
          Submit
        </button>
      </Stack>
    </Stack>
  ),
};

/**
 * Card list with dividers.
 */
export const CardList: Story = {
  render: () => (
    <Stack divider gap="none" className="mdt-w-96 mdt-rounded-lg mdt-border mdt-border-border">
      <div className="mdt-p-4">
        <h4 className="mdt-font-medium">Notification 1</h4>
        <p className="mdt-text-sm mdt-text-secondary-foreground">You have a new message</p>
        <span className="mdt-text-xs mdt-text-secondary-foreground">2 min ago</span>
      </div>
      <div className="mdt-p-4">
        <h4 className="mdt-font-medium">Notification 2</h4>
        <p className="mdt-text-sm mdt-text-secondary-foreground">New comment on your post</p>
        <span className="mdt-text-xs mdt-text-secondary-foreground">1 hour ago</span>
      </div>
      <div className="mdt-p-4">
        <h4 className="mdt-font-medium">Notification 3</h4>
        <p className="mdt-text-sm mdt-text-secondary-foreground">Someone liked your photo</p>
        <span className="mdt-text-xs mdt-text-secondary-foreground">3 hours ago</span>
      </div>
    </Stack>
  ),
};

/**
 * Full width stack.
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    gap: 'md',
    children: (
      <>
        <DemoBox>Full Width Item 1</DemoBox>
        <DemoBox>Full Width Item 2</DemoBox>
        <DemoBox>Full Width Item 3</DemoBox>
      </>
    ),
  },
};

/**
 * Nested stacks for complex layouts.
 */
export const NestedStacks: Story = {
  render: () => (
    <Stack gap="lg" className="mdt-w-96">
      <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
        <h3 className="mdt-mb-4 mdt-text-lg mdt-font-bold">Profile Card</h3>
        <Stack gap="md">
          <div className="mdt-text-center">
            <div className="mdt-mx-auto mdt-mb-2 mdt-h-20 mdt-w-20 mdt-rounded-full mdt-bg-primary" />
            <h4 className="mdt-font-semibold">John Doe</h4>
            <p className="mdt-text-sm mdt-text-secondary-foreground">Software Engineer</p>
          </div>

          <Stack direction="horizontal" justify="around" gap="sm">
            <div className="mdt-text-center">
              <div className="mdt-font-bold">1.2K</div>
              <div className="mdt-text-xs mdt-text-secondary-foreground">Posts</div>
            </div>
            <div className="mdt-text-center">
              <div className="mdt-font-bold">5.4K</div>
              <div className="mdt-text-xs mdt-text-secondary-foreground">Followers</div>
            </div>
            <div className="mdt-text-center">
              <div className="mdt-font-bold">890</div>
              <div className="mdt-text-xs mdt-text-secondary-foreground">Following</div>
            </div>
          </Stack>

          <Stack direction="horizontal" gap="sm">
            <button className="mdt-flex-1 mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-text-primary-foreground">
              Follow
            </button>
            <button className="mdt-flex-1 mdt-rounded-md mdt-border mdt-border-input mdt-px-4 mdt-py-2 mdt-text-sm">
              Message
            </button>
          </Stack>
        </Stack>
      </div>
    </Stack>
  ),
};
