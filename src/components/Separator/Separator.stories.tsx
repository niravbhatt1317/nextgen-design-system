import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
  title: 'Layout/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A separator component for visually dividing content. Supports horizontal and vertical orientations, different styles (solid, dashed, dotted), thickness, and spacing options.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the separator',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'Style variant of the separator',
      table: {
        defaultValue: { summary: 'solid' },
      },
    },
    thickness: {
      control: 'select',
      options: ['thin', 'medium', 'thick'],
      description: 'Thickness of the separator',
      table: {
        defaultValue: { summary: 'thin' },
      },
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Spacing around the separator',
      table: {
        defaultValue: { summary: 'none' },
      },
    },
    decorative: {
      control: 'boolean',
      description: 'Whether the separator is purely decorative',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    label: {
      control: 'text',
      description: 'Label to display on the separator (e.g., "OR")',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Position of the label on the separator',
      table: {
        defaultValue: { summary: 'center' },
      },
    },
    labelClassName: {
      control: 'text',
      description: 'Custom className for the label element',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default horizontal separator.
 */
export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="mdt-w-96">
      <p className="mdt-text-sm">Content above</p>
      <Separator {...args} />
      <p className="mdt-text-sm">Content below</p>
    </div>
  ),
};

/**
 * Vertical separator between items.
 */
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="mdt-flex mdt-h-20 mdt-items-center mdt-gap-4">
      <p className="mdt-text-sm">Left content</p>
      <Separator {...args} />
      <p className="mdt-text-sm">Right content</p>
    </div>
  ),
};

/**
 * Different style variants.
 */
export const Variants: Story = {
  render: () => (
    <div className="mdt-w-96 mdt-space-y-8">
      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Solid (default)</p>
        <Separator variant="solid" />
      </div>

      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Dashed</p>
        <Separator variant="dashed" />
      </div>

      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Dotted</p>
        <Separator variant="dotted" />
      </div>
    </div>
  ),
};

/**
 * Different thickness options.
 */
export const Thickness: Story = {
  render: () => (
    <div className="mdt-w-96 mdt-space-y-8">
      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Thin (1px)</p>
        <Separator thickness="thin" />
      </div>

      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Medium (2px)</p>
        <Separator thickness="medium" />
      </div>

      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Thick (4px)</p>
        <Separator thickness="thick" />
      </div>
    </div>
  ),
};

/**
 * Spacing around the separator.
 */
export const Spacing: Story = {
  render: () => (
    <div className="mdt-w-96 mdt-space-y-8">
      <div>
        <p className="mdt-text-sm mdt-font-medium">None (no spacing)</p>
        <Separator spacing="none" />
        <p className="mdt-text-sm mdt-font-medium">Next item</p>
      </div>

      <div>
        <p className="mdt-text-sm mdt-font-medium">Small spacing (8px)</p>
        <Separator spacing="sm" />
        <p className="mdt-text-sm mdt-font-medium">Next item</p>
      </div>

      <div>
        <p className="mdt-text-sm mdt-font-medium">Medium spacing (16px)</p>
        <Separator spacing="md" />
        <p className="mdt-text-sm mdt-font-medium">Next item</p>
      </div>

      <div>
        <p className="mdt-text-sm mdt-font-medium">Large spacing (24px)</p>
        <Separator spacing="lg" />
        <p className="mdt-text-sm mdt-font-medium">Next item</p>
      </div>

      <div>
        <p className="mdt-text-sm mdt-font-medium">Extra large spacing (32px)</p>
        <Separator spacing="xl" />
        <p className="mdt-text-sm mdt-font-medium">Next item</p>
      </div>
    </div>
  ),
};

/**
 * Separator with text label (centered).
 */
export const WithLabel: Story = {
  render: () => (
    <div className="mdt-w-96">
      <Separator label="OR" />
    </div>
  ),
};

/**
 * Separator with label in different positions.
 */
export const LabelPositions: Story = {
  render: () => (
    <div className="mdt-w-96 mdt-space-y-8">
      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Left aligned</p>
        <Separator label="Continue with" labelPosition="left" />
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Center aligned (default)</p>
        <Separator label="OR" labelPosition="center" />
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Right aligned</p>
        <Separator label="Continue with" labelPosition="right" />
      </div>
    </div>
  ),
};

/**
 * Separator with label and different variants.
 */
export const LabelWithVariants: Story = {
  render: () => (
    <div className="mdt-w-96 mdt-space-y-8">
      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Solid (default)</p>
        <Separator label="OR" variant="solid" />
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Dashed</p>
        <Separator label="OR" variant="dashed" />
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Dotted</p>
        <Separator label="OR" variant="dotted" />
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Thick</p>
        <Separator label="OR" thickness="thick" />
      </div>
    </div>
  ),
};

/**
 * Real-world login form example with separator label.
 */
export const LoginFormExample: Story = {
  render: () => (
    <div className="mdt-mx-auto mdt-w-96 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-6">
      <h2 className="mdt-mb-6 mdt-text-center mdt-text-2xl mdt-font-bold">Sign In</h2>

      <button className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-py-2 mdt-text-sm hover:mdt-bg-muted">
        Continue with Google
      </button>

      <button className="mdt-mt-2 mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-py-2 mdt-text-sm hover:mdt-bg-muted">
        Continue with GitHub
      </button>

      <Separator label="OR" className="mdt-my-6" />

      <input
        type="email"
        placeholder="Email"
        className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"
      />

      <input
        type="password"
        placeholder="Password"
        className="mdt-mt-2 mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"
      />

      <button className="mdt-mt-4 mdt-w-full mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90">
        Sign In
      </button>
    </div>
  ),
};

/**
 * Separator with custom label styling.
 */
export const CustomLabelStyling: Story = {
  render: () => (
    <div className="mdt-w-96 mdt-space-y-8">
      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Bold uppercase</p>
        <Separator label="OR" labelClassName="mdt-font-bold mdt-uppercase" />
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Primary color</p>
        <Separator label="OR" labelClassName="mdt-text-primary mdt-font-semibold" />
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Larger text</p>
        <Separator label="OR" labelClassName="mdt-text-base mdt-font-medium" />
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">With background</p>
        <Separator
          label="OR"
          labelClassName="mdt-bg-muted mdt-px-4 mdt-py-1 mdt-rounded-full mdt-font-medium"
        />
      </div>
    </div>
  ),
};

/**
 * Vertical separator with label.
 */
export const VerticalWithLabel: Story = {
  render: () => (
    <div className="mdt-space-y-8">
      <div className="mdt-flex mdt-h-32 mdt-items-center">
        <div className="mdt-flex-1 mdt-text-center">
          <p className="mdt-text-sm">Left content</p>
        </div>
        <Separator orientation="vertical" label="OR" className="mdt-h-full" />
        <div className="mdt-flex-1 mdt-text-center">
          <p className="mdt-text-sm">Right content</p>
        </div>
      </div>

      <div className="mdt-flex mdt-h-32 mdt-items-center">
        <div className="mdt-flex-1 mdt-text-center">
          <p className="mdt-text-sm">Left content</p>
        </div>
        <Separator orientation="vertical" label="OR" labelPosition="left" className="mdt-h-full" />
        <div className="mdt-flex-1 mdt-text-center">
          <p className="mdt-text-sm">Right content</p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Vertical separator with different heights.
 */
export const VerticalVariations: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-4">
      <div className="mdt-flex mdt-h-12 mdt-items-center mdt-gap-4">
        <span className="mdt-text-sm">Item 1</span>
        <Separator orientation="vertical" />
        <span className="mdt-text-sm">Item 2</span>
      </div>

      <div className="mdt-flex mdt-h-16 mdt-items-center mdt-gap-4">
        <span className="mdt-text-sm">Taller</span>
        <Separator orientation="vertical" thickness="medium" />
        <span className="mdt-text-sm">Items</span>
      </div>

      <div className="mdt-flex mdt-h-20 mdt-items-center mdt-gap-4">
        <span className="mdt-text-sm">Even</span>
        <Separator orientation="vertical" thickness="thick" />
        <span className="mdt-text-sm">Taller</span>
      </div>
    </div>
  ),
};

/**
 * List with separators.
 */
export const ListExample: Story = {
  render: () => (
    <div className="mdt-w-96 mdt-rounded-lg mdt-border mdt-border-border">
      <div className="mdt-p-4">
        <h4 className="mdt-font-medium">Item 1</h4>
        <p className="mdt-text-sm mdt-text-muted-foreground">Description for item 1</p>
      </div>
      <Separator />
      <div className="mdt-p-4">
        <h4 className="mdt-font-medium">Item 2</h4>
        <p className="mdt-text-sm mdt-text-muted-foreground">Description for item 2</p>
      </div>
      <Separator />
      <div className="mdt-p-4">
        <h4 className="mdt-font-medium">Item 3</h4>
        <p className="mdt-text-sm mdt-text-muted-foreground">Description for item 3</p>
      </div>
    </div>
  ),
};

/**
 * Navigation with vertical separators.
 */
export const NavigationExample: Story = {
  render: () => (
    <nav className="mdt-flex mdt-items-center mdt-gap-4 mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
      <button type="button" className="mdt-text-sm hover:mdt-text-primary">
        Home
      </button>
      <Separator orientation="vertical" className="mdt-h-4" />
      <button type="button" className="mdt-text-sm hover:mdt-text-primary">
        About
      </button>
      <Separator orientation="vertical" className="mdt-h-4" />
      <button type="button" className="mdt-text-sm hover:mdt-text-primary">
        Services
      </button>
      <Separator orientation="vertical" className="mdt-h-4" />
      <button type="button" className="mdt-text-sm hover:mdt-text-primary">
        Contact
      </button>
    </nav>
  ),
};

/**
 * Section divider example.
 */
export const SectionDivider: Story = {
  render: () => (
    <div className="mdt-w-96">
      <section>
        <h2 className="mdt-mb-2 mdt-text-lg mdt-font-bold">Section 1</h2>
        <p className="mdt-text-sm mdt-text-muted-foreground">
          This is the first section with some content explaining the first topic.
        </p>
      </section>

      <Separator spacing="lg" thickness="medium" />

      <section>
        <h2 className="mdt-mb-2 mdt-text-lg mdt-font-bold">Section 2</h2>
        <p className="mdt-text-sm mdt-text-muted-foreground">
          This is the second section with different content.
        </p>
      </section>

      <Separator spacing="lg" thickness="medium" />

      <section>
        <h2 className="mdt-mb-2 mdt-text-lg mdt-font-bold">Section 3</h2>
        <p className="mdt-text-sm mdt-text-muted-foreground">
          This is the third section continuing the content.
        </p>
      </section>
    </div>
  ),
};

/**
 * Card with sections.
 */
export const CardSections: Story = {
  render: () => (
    <div className="mdt-w-96 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-6">
      <div>
        <h3 className="mdt-mb-1 mdt-text-base mdt-font-semibold">Card Title</h3>
        <p className="mdt-text-sm mdt-text-muted-foreground">Card subtitle or description</p>
      </div>

      <Separator spacing="md" variant="dashed" />

      <div>
        <h4 className="mdt-mb-2 mdt-text-sm mdt-font-medium">Details</h4>
        <ul className="mdt-space-y-1 mdt-text-sm mdt-text-muted-foreground">
          <li>• Detail item 1</li>
          <li>• Detail item 2</li>
          <li>• Detail item 3</li>
        </ul>
      </div>

      <Separator spacing="md" variant="dashed" />

      <div className="mdt-flex mdt-justify-end mdt-gap-2">
        <button className="mdt-rounded-md mdt-border mdt-border-input mdt-px-3 mdt-py-1.5 mdt-text-sm hover:mdt-bg-muted">
          Cancel
        </button>
        <button className="mdt-rounded-md mdt-bg-primary mdt-px-3 mdt-py-1.5 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90">
          Submit
        </button>
      </div>
    </div>
  ),
};
