import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';
import type { SpinnerProps } from './Spinner.types';

/**
 * The Spinner component is used to indicate loading states.
 * It supports multiple variants and sizes for different use cases.
 */
const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile loading spinner component with multiple color variants and sizes. Perfect for indicating loading states in buttons, cards, or full-page scenarios.',
      },
    },
    controls: {
      exclude: ['class'],
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'destructive'],
      description: 'Visual color variant of the spinner',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size variant of the spinner',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'Accessibility label for screen readers',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Loading' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SpinnerProps>;

/**
 * Default spinner with medium size and default color.
 */
export const Default: Story = {
  args: {},
};

/**
 * Primary variant - uses primary theme color.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

/**
 * Secondary variant - uses secondary theme color.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

/**
 * Success variant - uses success theme color (green).
 */
export const Success: Story = {
  args: {
    variant: 'success',
  },
};

/**
 * Destructive variant - uses destructive theme color (red).
 */
export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
};

/**
 * All size variants displayed together.
 */
export const Sizes: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-6">
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Spinner size="sm" />
        <span className="mdt-text-xs mdt-text-muted-foreground">Small</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Spinner size="md" />
        <span className="mdt-text-xs mdt-text-muted-foreground">Medium</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Spinner size="lg" />
        <span className="mdt-text-xs mdt-text-muted-foreground">Large</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Spinner size="xl" />
        <span className="mdt-text-xs mdt-text-muted-foreground">Extra Large</span>
      </div>
    </div>
  ),
};

/**
 * All color variants displayed together.
 */
export const ColorVariants: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-6">
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Spinner variant="default" />
        <span className="mdt-text-xs mdt-text-muted-foreground">Default</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Spinner variant="primary" />
        <span className="mdt-text-xs mdt-text-muted-foreground">Primary</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Spinner variant="secondary" />
        <span className="mdt-text-xs mdt-text-muted-foreground">Secondary</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Spinner variant="success" />
        <span className="mdt-text-xs mdt-text-muted-foreground">Success</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Spinner variant="destructive" />
        <span className="mdt-text-xs mdt-text-muted-foreground">Destructive</span>
      </div>
    </div>
  ),
};

/**
 * Spinner with accompanying text label.
 */
export const WithTextLabel: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-3">
      <Spinner variant="primary" />
      <span className="mdt-text-sm mdt-text-foreground">Loading data...</span>
    </div>
  ),
};

/**
 * Inline spinner usage within a sentence or paragraph.
 */
export const InlineUsage: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-2 mdt-text-sm mdt-text-foreground">
      <span>Processing your request</span>
      <Spinner size="sm" variant="primary" />
      <span>please wait...</span>
    </div>
  ),
};

/**
 * Full page loading state with centered spinner and text.
 */
export const FullPageLoading: Story = {
  render: () => (
    <div className="mdt-flex mdt-h-64 mdt-w-96 mdt-flex-col mdt-items-center mdt-justify-center mdt-gap-4 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background">
      <Spinner size="lg" variant="primary" />
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-1">
        <p className="mdt-text-base mdt-font-medium mdt-text-foreground">Loading</p>
        <p className="mdt-text-sm mdt-text-muted-foreground">
          Please wait while we fetch your data
        </p>
      </div>
    </div>
  ),
};

/**
 * Spinner in a button loading state.
 */
export const ButtonLoadingState: Story = {
  render: () => (
    <div className="mdt-flex mdt-gap-4">
      <button
        className="mdt-inline-flex mdt-h-9 mdt-items-center mdt-gap-2 mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-text-sm mdt-font-medium mdt-text-primary-foreground mdt-transition-colors hover:mdt-bg-primary/90 disabled:mdt-pointer-events-none disabled:mdt-opacity-50"
        disabled
        aria-label="Save button in loading state"
      >
        <Spinner size="sm" className="mdt-text-primary-foreground" />
        <span>Saving...</span>
      </button>
      <button
        className="mdt-inline-flex mdt-h-9 mdt-items-center mdt-gap-2 mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-text-sm mdt-font-medium mdt-text-foreground mdt-transition-colors hover:mdt-bg-muted disabled:mdt-pointer-events-none disabled:mdt-opacity-50"
        disabled
        aria-label="Submit button in loading state"
      >
        <Spinner size="sm" variant="default" />
        <span>Submitting...</span>
      </button>
    </div>
  ),
};

/**
 * Spinner in a card loading state.
 */
export const CardLoadingState: Story = {
  render: () => (
    <div className="mdt-w-80 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-6 mdt-shadow-sm">
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-4">
        <Spinner size="lg" variant="primary" />
        <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-1">
          <h3 className="mdt-text-lg mdt-font-semibold mdt-text-card-foreground">
            Loading Content
          </h3>
          <p className="mdt-text-center mdt-text-sm mdt-text-muted-foreground">
            Fetching your dashboard data...
          </p>
        </div>
        <div className="mdt-w-full mdt-space-y-2">
          <div className="mdt-h-2 mdt-w-full mdt-animate-pulse mdt-rounded mdt-bg-muted" />
          <div className="mdt-h-2 mdt-w-4/5 mdt-animate-pulse mdt-rounded mdt-bg-muted" />
          <div className="mdt-h-2 mdt-w-3/5 mdt-animate-pulse mdt-rounded mdt-bg-muted" />
        </div>
      </div>
    </div>
  ),
};
