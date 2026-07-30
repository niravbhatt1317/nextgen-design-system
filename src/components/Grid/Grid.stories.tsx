import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './Grid';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A flexible layout primitive for creating CSS Grid layouts. Supports responsive columns, rows, gaps, alignment, and grid flow control.',
      },
    },
  },
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'auto'],
      description: 'Number of columns in the grid',
    },
    rows: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 'auto'],
      description: 'Number of rows in the grid',
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Gap between all grid items',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    gapX: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Horizontal gap between grid items',
    },
    gapY: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Vertical gap between grid items',
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch'],
      description: 'Justify items along the inline (row) axis',
    },
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch'],
      description: 'Align items along the block (column) axis',
    },
    justifyContent: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
      description: 'Justify grid tracks along the inline axis',
    },
    alignContent: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
      description: 'Align grid tracks along the block axis',
    },
    autoFlow: {
      control: 'select',
      options: ['row', 'col', 'dense', 'rowDense', 'colDense'],
      description: 'Control how auto-placed items get inserted',
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
      description: 'Content to display inside the grid container',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for demo items
const GridItem = ({ children }: { children: React.ReactNode }) => (
  <div className="mdt-rounded-md mdt-border mdt-border-border mdt-bg-muted mdt-p-4 mdt-text-center mdt-text-sm">
    {children}
  </div>
);

/**
 * Default grid with 3 columns.
 */
export const Default: Story = {
  args: {
    columns: 3,
  },
  render: (args) => (
    <Grid {...args}>
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
      <GridItem>Item 4</GridItem>
      <GridItem>Item 5</GridItem>
      <GridItem>Item 6</GridItem>
    </Grid>
  ),
};

/**
 * Different column configurations.
 */
export const Columns: Story = {
  render: () => (
    <div className="mdt-space-y-8">
      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">2 Columns</p>
        <Grid columns={2}>
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
          <GridItem>4</GridItem>
        </Grid>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">3 Columns</p>
        <Grid columns={3}>
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
          <GridItem>4</GridItem>
          <GridItem>5</GridItem>
          <GridItem>6</GridItem>
        </Grid>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">4 Columns</p>
        <Grid columns={4}>
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
          <GridItem>4</GridItem>
        </Grid>
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
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Small gap (8px)</p>
        <Grid columns={3} gap="sm">
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
        </Grid>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Medium gap (16px)</p>
        <Grid columns={3} gap="md">
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
        </Grid>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Large gap (24px)</p>
        <Grid columns={3} gap="lg">
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
        </Grid>
      </div>
    </div>
  ),
};

/**
 * Different horizontal and vertical gaps.
 */
export const AsymmetricGaps: Story = {
  render: () => (
    <div className="mdt-space-y-8">
      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Large horizontal, small vertical</p>
        <Grid columns={3} gapX="lg" gapY="sm">
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
          <GridItem>4</GridItem>
          <GridItem>5</GridItem>
          <GridItem>6</GridItem>
        </Grid>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Small horizontal, large vertical</p>
        <Grid columns={3} gapX="sm" gapY="lg">
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
          <GridItem>4</GridItem>
          <GridItem>5</GridItem>
          <GridItem>6</GridItem>
        </Grid>
      </div>
    </div>
  ),
};

/**
 * Alignment options for grid items.
 */
export const Alignment: Story = {
  render: () => (
    <div className="mdt-space-y-8">
      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Justify center, align start</p>
        <Grid columns={3} justify="center" align="start" className="mdt-h-40">
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
        </Grid>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Justify end, align center</p>
        <Grid columns={3} justify="end" align="center" className="mdt-h-40">
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
        </Grid>
      </div>
    </div>
  ),
};

/**
 * Card grid example.
 */
export const CardGrid: Story = {
  render: () => (
    <Grid columns={3} gap="lg">
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          className="mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-6 mdt-shadow-sm"
        >
          <h3 className="mdt-mb-2 mdt-text-lg mdt-font-semibold">Card {i + 1}</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            This is a card component in a grid layout.
          </p>
        </div>
      ))}
    </Grid>
  ),
};

/**
 * Image gallery example.
 */
export const ImageGallery: Story = {
  render: () => (
    <Grid columns={4} gap="md">
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="mdt-flex mdt-aspect-square mdt-items-center mdt-justify-center mdt-rounded-lg mdt-bg-muted mdt-text-sm mdt-text-muted-foreground"
        >
          Image {i + 1}
        </div>
      ))}
    </Grid>
  ),
};

/**
 * Dashboard layout example.
 */
export const Dashboard: Story = {
  render: () => (
    <Grid columns={4} rows={3} gap="md" className="mdt-h-96">
      <div className="mdt-col-span-3 mdt-row-span-2 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-6">
        <h3 className="mdt-mb-2 mdt-text-lg mdt-font-semibold">Main Chart</h3>
        <p className="mdt-text-sm mdt-text-muted-foreground">Large chart area</p>
      </div>

      <div className="mdt-row-span-3 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-6">
        <h3 className="mdt-mb-2 mdt-text-base mdt-font-semibold">Sidebar</h3>
        <p className="mdt-text-sm mdt-text-muted-foreground">Quick stats</p>
      </div>

      <div className="mdt-col-span-3 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-6">
        <h3 className="mdt-mb-2 mdt-text-base mdt-font-semibold">Recent Activity</h3>
        <p className="mdt-text-sm mdt-text-muted-foreground">Activity feed</p>
      </div>
    </Grid>
  ),
};

/**
 * Product grid with different sized items.
 */
export const ProductGrid: Story = {
  render: () => (
    <Grid columns={6} gap="md">
      <div className="mdt-col-span-2 mdt-row-span-2 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-6">
        <h3 className="mdt-mb-2 mdt-text-lg mdt-font-semibold">Featured Product</h3>
        <p className="mdt-text-sm mdt-text-muted-foreground">Large featured item</p>
      </div>

      <div className="mdt-col-span-2 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-4">
        <h4 className="mdt-mb-1 mdt-text-sm mdt-font-medium">Product 1</h4>
        <p className="mdt-text-xs mdt-text-muted-foreground">Description</p>
      </div>

      <div className="mdt-col-span-2 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-4">
        <h4 className="mdt-mb-1 mdt-text-sm mdt-font-medium">Product 2</h4>
        <p className="mdt-text-xs mdt-text-muted-foreground">Description</p>
      </div>

      <div className="mdt-col-span-2 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-4">
        <h4 className="mdt-mb-1 mdt-text-sm mdt-font-medium">Product 3</h4>
        <p className="mdt-text-xs mdt-text-muted-foreground">Description</p>
      </div>

      <div className="mdt-col-span-2 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-4">
        <h4 className="mdt-mb-1 mdt-text-sm mdt-font-medium">Product 4</h4>
        <p className="mdt-text-xs mdt-text-muted-foreground">Description</p>
      </div>

      <div className="mdt-col-span-3 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-4">
        <h4 className="mdt-mb-1 mdt-text-sm mdt-font-medium">Product 5</h4>
        <p className="mdt-text-xs mdt-text-muted-foreground">Wide item</p>
      </div>

      <div className="mdt-col-span-3 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-4">
        <h4 className="mdt-mb-1 mdt-text-sm mdt-font-medium">Product 6</h4>
        <p className="mdt-text-xs mdt-text-muted-foreground">Wide item</p>
      </div>
    </Grid>
  ),
};

/**
 * Grid with auto flow dense to fill gaps.
 */
export const AutoFlowDense: Story = {
  render: () => (
    <div className="mdt-space-y-8">
      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Normal flow (with gaps)</p>
        <Grid columns={4} gap="md">
          <div className="mdt-col-span-2 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-4">
            Wide
          </div>
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
          <GridItem>4</GridItem>
        </Grid>
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Dense flow (fills gaps)</p>
        <Grid columns={4} gap="md" autoFlow="dense">
          <div className="mdt-col-span-2 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-4">
            Wide
          </div>
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
          <GridItem>4</GridItem>
        </Grid>
      </div>
    </div>
  ),
};

/**
 * Form layout using grid.
 */
export const FormLayout: Story = {
  render: () => (
    <Grid columns={2} gap="md" className="mdt-max-w-2xl">
      <div className="mdt-col-span-2">
        <label htmlFor="fullName" className="mdt-mb-1 mdt-block mdt-text-sm mdt-font-medium">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="mdt-mb-1 mdt-block mdt-text-sm mdt-font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mdt-mb-1 mdt-block mdt-text-sm mdt-font-medium">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <div className="mdt-col-span-2">
        <label htmlFor="address" className="mdt-mb-1 mdt-block mdt-text-sm mdt-font-medium">
          Address
        </label>
        <input
          id="address"
          type="text"
          className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"
          placeholder="123 Main St"
        />
      </div>

      <div>
        <label htmlFor="city" className="mdt-mb-1 mdt-block mdt-text-sm mdt-font-medium">
          City
        </label>
        <input
          id="city"
          type="text"
          className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"
          placeholder="New York"
        />
      </div>

      <div>
        <label htmlFor="zipCode" className="mdt-mb-1 mdt-block mdt-text-sm mdt-font-medium">
          Zip Code
        </label>
        <input
          id="zipCode"
          type="text"
          className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"
          placeholder="10001"
        />
      </div>
    </Grid>
  ),
};

/**
 * Polymorphic usage as a list.
 */
export const AsList: Story = {
  render: () => (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Grid as={'ul' as any} columns={3} gap="md">
      <li className="mdt-rounded-md mdt-border mdt-border-border mdt-bg-muted mdt-p-4 mdt-text-center mdt-text-sm">
        List item 1
      </li>
      <li className="mdt-rounded-md mdt-border mdt-border-border mdt-bg-muted mdt-p-4 mdt-text-center mdt-text-sm">
        List item 2
      </li>
      <li className="mdt-rounded-md mdt-border mdt-border-border mdt-bg-muted mdt-p-4 mdt-text-center mdt-text-sm">
        List item 3
      </li>
    </Grid>
  ),
};
