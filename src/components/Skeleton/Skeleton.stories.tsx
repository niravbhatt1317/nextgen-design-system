import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Use skeleton screens to indicate loading states. Skeletons reduce load-time frustration and provide a better user experience.',
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
      options: ['default', 'lighter', 'darker'],
      description: 'Visual variant of the skeleton',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default skeleton example.
 */
export const Default: Story = {
  args: {
    className: 'mdt-h-12 mdt-w-12',
  },
};

/**
 * Rectangular skeleton.
 */
export const Rectangle: Story = {
  render: () => <Skeleton className="mdt-h-32 mdt-w-64" />,
};

/**
 * Circle skeleton - perfect for avatars.
 */
export const Circle: Story = {
  render: () => <Skeleton className="mdt-h-12 mdt-w-12 mdt-rounded-full" />,
};

/**
 * Text line skeleton.
 */
export const TextLine: Story = {
  render: () => <Skeleton className="mdt-h-4 mdt-w-full mdt-max-w-md" />,
};

/**
 * Multiple text lines with varying widths.
 */
export const TextLines: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-full mdt-max-w-md mdt-flex-col mdt-gap-2">
      <Skeleton className="mdt-h-4 mdt-w-full" />
      <Skeleton className="mdt-h-4 mdt-w-5/6" />
      <Skeleton className="mdt-h-4 mdt-w-4/6" />
    </div>
  ),
};

/**
 * Card skeleton with avatar, title, and description.
 */
export const Card: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-full mdt-max-w-md mdt-flex-col mdt-gap-4 mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
      <div className="mdt-flex mdt-items-center mdt-gap-4">
        <Skeleton className="mdt-h-12 mdt-w-12 mdt-rounded-full" />
        <div className="mdt-flex mdt-flex-1 mdt-flex-col mdt-gap-2">
          <Skeleton className="mdt-h-4 mdt-w-1/2" />
          <Skeleton className="mdt-h-3 mdt-w-3/4" />
        </div>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <Skeleton className="mdt-h-4 mdt-w-full" />
        <Skeleton className="mdt-h-4 mdt-w-full" />
        <Skeleton className="mdt-h-4 mdt-w-2/3" />
      </div>
    </div>
  ),
};

/**
 * Profile skeleton with avatar and details.
 */
export const Profile: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-full mdt-max-w-sm mdt-flex-col mdt-items-center mdt-gap-4">
      <Skeleton className="mdt-h-24 mdt-w-24 mdt-rounded-full" />
      <div className="mdt-flex mdt-w-full mdt-flex-col mdt-items-center mdt-gap-2">
        <Skeleton className="mdt-h-6 mdt-w-1/2" />
        <Skeleton className="mdt-h-4 mdt-w-3/4" />
        <Skeleton className="mdt-h-4 mdt-w-full" />
        <Skeleton className="mdt-h-4 mdt-w-5/6" />
      </div>
    </div>
  ),
};

/**
 * List skeleton with multiple items.
 */
export const List: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-full mdt-max-w-md mdt-flex-col mdt-gap-3">
      {[...Array(5)].map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="mdt-flex mdt-items-center mdt-gap-3">
          <Skeleton className="mdt-h-10 mdt-w-10 mdt-rounded-md" />
          <div className="mdt-flex mdt-flex-1 mdt-flex-col mdt-gap-2">
            <Skeleton className="mdt-h-4 mdt-w-3/4" />
            <Skeleton className="mdt-h-3 mdt-w-1/2" />
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Table skeleton with rows and columns.
 */
export const Table: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-full mdt-max-w-2xl mdt-flex-col mdt-gap-2">
      {/* Header */}
      <div className="mdt-flex mdt-gap-4">
        <Skeleton className="mdt-h-10 mdt-w-1/4" />
        <Skeleton className="mdt-h-10 mdt-w-1/3" />
        <Skeleton className="mdt-h-10 mdt-w-1/4" />
        <Skeleton className="mdt-h-10 mdt-w-1/6" />
      </div>
      {/* Rows */}
      {[...Array(5)].map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="mdt-flex mdt-gap-4">
          <Skeleton className="mdt-h-8 mdt-w-1/4" />
          <Skeleton className="mdt-h-8 mdt-w-1/3" />
          <Skeleton className="mdt-h-8 mdt-w-1/4" />
          <Skeleton className="mdt-h-8 mdt-w-1/6" />
        </div>
      ))}
    </div>
  ),
};

/**
 * Form skeleton with labels and inputs.
 */
export const Form: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-full mdt-max-w-md mdt-flex-col mdt-gap-4">
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <Skeleton className="mdt-h-4 mdt-w-24" />
        <Skeleton className="mdt-h-10 mdt-w-full" />
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <Skeleton className="mdt-h-4 mdt-w-32" />
        <Skeleton className="mdt-h-10 mdt-w-full" />
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <Skeleton className="mdt-h-4 mdt-w-28" />
        <Skeleton className="mdt-h-24 mdt-w-full" />
      </div>
      <Skeleton className="mdt-h-10 mdt-w-32" />
    </div>
  ),
};

/**
 * Lighter variant skeleton.
 */
export const Lighter: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <Skeleton variant="lighter" className="mdt-h-12 mdt-w-64" />
      <Skeleton variant="lighter" className="mdt-h-12 mdt-w-12 mdt-rounded-full" />
    </div>
  ),
};

/**
 * Darker variant skeleton.
 */
export const Darker: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <Skeleton variant="darker" className="mdt-h-12 mdt-w-64" />
      <Skeleton variant="darker" className="mdt-h-12 mdt-w-12 mdt-rounded-full" />
    </div>
  ),
};

/**
 * Full page loading skeleton - Dashboard layout.
 */
export const PageLoadingDashboard: Story = {
  render: () => (
    <div className="mdt-flex mdt-h-screen mdt-w-full mdt-flex-col mdt-bg-background">
      {/* Header */}
      <div className="mdt-flex mdt-h-16 mdt-items-center mdt-gap-4 mdt-border-b mdt-border-border mdt-px-6">
        <Skeleton className="mdt-h-8 mdt-w-32" />
        <div className="mdt-flex-1" />
        <Skeleton className="mdt-h-9 mdt-w-48" />
        <Skeleton className="mdt-h-9 mdt-w-9 mdt-rounded-full" />
      </div>

      <div className="mdt-flex mdt-flex-1 mdt-overflow-hidden">
        {/* Sidebar */}
        <div className="mdt-flex mdt-w-64 mdt-flex-col mdt-gap-2 mdt-border-r mdt-border-border mdt-p-4">
          {[...Array(8)].map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={i} className="mdt-h-10 mdt-w-full" />
          ))}
        </div>

        {/* Main Content */}
        <div className="mdt-flex-1 mdt-overflow-auto mdt-p-6">
          {/* Stats Cards */}
          <div className="mdt-mb-6 mdt-grid mdt-grid-cols-1 mdt-gap-4 md:mdt-grid-cols-4">
            {[...Array(4)].map((_, i) => {
              return (
                <div
                  key={i} // eslint-disable-line react/no-array-index-key
                  className="mdt-flex mdt-flex-col mdt-gap-2 mdt-rounded-lg mdt-border mdt-border-border mdt-p-4"
                >
                  <Skeleton className="mdt-h-4 mdt-w-24" />
                  <Skeleton className="mdt-h-8 mdt-w-20" />
                  <Skeleton className="mdt-h-3 mdt-w-16" />
                </div>
              );
            })}
          </div>

          {/* Chart Section */}
          <div className="mdt-mb-6 mdt-rounded-lg mdt-border mdt-border-border mdt-p-6">
            <Skeleton className="mdt-mb-4 mdt-h-6 mdt-w-32" />
            <Skeleton className="mdt-h-64 mdt-w-full" />
          </div>

          {/* Table Section */}
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-6">
            <Skeleton className="mdt-mb-4 mdt-h-6 mdt-w-40" />
            <div className="mdt-flex mdt-flex-col mdt-gap-3">
              {[...Array(6)].map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i} className="mdt-flex mdt-gap-4">
                  <Skeleton className="mdt-h-10 mdt-w-12" />
                  <Skeleton className="mdt-h-10 mdt-flex-1" />
                  <Skeleton className="mdt-h-10 mdt-w-24" />
                  <Skeleton className="mdt-h-10 mdt-w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Full page loading skeleton - Simple content page.
 */
export const PageLoadingContent: Story = {
  render: () => (
    <div className="mdt-flex mdt-min-h-screen mdt-flex-col mdt-bg-background">
      {/* Header */}
      <div className="mdt-flex mdt-h-16 mdt-items-center mdt-justify-between mdt-border-b mdt-border-border mdt-px-6">
        <Skeleton className="mdt-h-8 mdt-w-32" />
        <div className="mdt-flex mdt-gap-3">
          <Skeleton className="mdt-h-9 mdt-w-20" />
          <Skeleton className="mdt-h-9 mdt-w-20" />
          <Skeleton className="mdt-h-9 mdt-w-9 mdt-rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="mdt-mx-auto mdt-w-full mdt-max-w-4xl mdt-p-6">
        <Skeleton className="mdt-mb-4 mdt-h-12 mdt-w-3/4" />
        <Skeleton className="mdt-mb-8 mdt-h-6 mdt-w-48" />

        <div className="mdt-flex mdt-flex-col mdt-gap-4">
          <Skeleton className="mdt-h-4 mdt-w-full" />
          <Skeleton className="mdt-h-4 mdt-w-full" />
          <Skeleton className="mdt-h-4 mdt-w-5/6" />
          <Skeleton className="mdt-h-4 mdt-w-full" />
          <Skeleton className="mdt-h-4 mdt-w-4/6" />
        </div>

        <Skeleton className="mdt-my-6 mdt-h-64 mdt-w-full mdt-rounded-lg" />

        <div className="mdt-flex mdt-flex-col mdt-gap-4">
          <Skeleton className="mdt-h-4 mdt-w-full" />
          <Skeleton className="mdt-h-4 mdt-w-full" />
          <Skeleton className="mdt-h-4 mdt-w-3/4" />
        </div>
      </div>
    </div>
  ),
};

/**
 * Full page loading skeleton - List/Grid page.
 */
export const PageLoadingList: Story = {
  render: () => (
    <div className="mdt-flex mdt-min-h-screen mdt-flex-col mdt-bg-background">
      {/* Header */}
      <div className="mdt-flex mdt-h-16 mdt-items-center mdt-gap-4 mdt-border-b mdt-border-border mdt-px-6">
        <Skeleton className="mdt-h-8 mdt-w-32" />
        <Skeleton className="mdt-h-9 mdt-max-w-md mdt-flex-1" />
        <Skeleton className="mdt-h-9 mdt-w-24" />
        <Skeleton className="mdt-h-9 mdt-w-9 mdt-rounded-full" />
      </div>

      {/* Content */}
      <div className="mdt-p-6">
        <div className="mdt-mb-6 mdt-flex mdt-items-center mdt-justify-between">
          <Skeleton className="mdt-h-8 mdt-w-48" />
          <Skeleton className="mdt-h-10 mdt-w-32" />
        </div>

        {/* Grid of items */}
        <div className="mdt-grid mdt-grid-cols-1 mdt-gap-6 md:mdt-grid-cols-2 lg:mdt-grid-cols-3">
          {[...Array(9)].map((_, i) => {
            return (
              <div
                key={i} // eslint-disable-line react/no-array-index-key
                className="mdt-flex mdt-flex-col mdt-gap-3 mdt-rounded-lg mdt-border mdt-border-border mdt-p-4"
              >
                <Skeleton className="mdt-h-48 mdt-w-full mdt-rounded-md" />
                <Skeleton className="mdt-h-6 mdt-w-3/4" />
                <Skeleton className="mdt-h-4 mdt-w-full" />
                <Skeleton className="mdt-h-4 mdt-w-5/6" />
                <div className="mdt-flex mdt-gap-2">
                  <Skeleton className="mdt-h-9 mdt-flex-1" />
                  <Skeleton className="mdt-h-9 mdt-w-9" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ),
};
