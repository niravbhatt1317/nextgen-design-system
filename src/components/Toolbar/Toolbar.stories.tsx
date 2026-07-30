import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toolbar, ToolbarSection, ToolbarSpacer } from './Toolbar';
import { Button } from '../Button';
import { Input } from '../Input';

const meta: Meta<typeof Toolbar> = {
  title: 'Components/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullwidth',
    docs: {
      description: {
        component:
          'Toolbar component for displaying search bars, filters, and action buttons. Provides flexible sections and spacing for custom layouts.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'spacious'],
      description: 'Spacing variant of the toolbar',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'string' },
      },
    },
    border: {
      control: 'boolean',
      description: 'Show or hide bottom border',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    noPaddingLeft: {
      control: 'boolean',
      description: 'Remove left padding',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    noPaddingRight: {
      control: 'boolean',
      description: 'Remove right padding',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    noPaddingTop: {
      control: 'boolean',
      description: 'Remove top padding',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    noPaddingBottom: {
      control: 'boolean',
      description: 'Remove bottom padding',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    children: {
      control: false,
      description: 'Toolbar content including sections, spacers, and other elements',
      table: {
        type: { summary: 'ReactNode' },
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
 * Default toolbar with search and action buttons.
 */
export const Default: Story = {
  render: () => (
    <Toolbar>
      <ToolbarSection>
        <Input
          type="search"
          placeholder="Search..."
          aria-label="Search input"
          className="mdt-w-64"
        />
      </ToolbarSection>
      <ToolbarSpacer />
      <ToolbarSection>
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button size="sm">New</Button>
      </ToolbarSection>
    </Toolbar>
  ),
};

/**
 * Toolbar with search, filters, and multiple action buttons.
 */
export const WithMultipleActions: Story = {
  render: () => (
    <Toolbar>
      <ToolbarSection>
        <Input
          type="search"
          placeholder="Search..."
          aria-label="Search input"
          className="mdt-w-72"
        />
        <Button variant="ghost" size="sm" aria-label="Search">
          🔍
        </Button>
      </ToolbarSection>
      <ToolbarSection>
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button variant="outline" size="sm" aria-label="Sort">
          ⬍
        </Button>
        <Button variant="outline" size="sm" aria-label="View options">
          ⚙
        </Button>
      </ToolbarSection>
      <ToolbarSpacer />
      <ToolbarSection>
        <Button variant="outline" size="sm" aria-label="Share">
          📤
        </Button>
        <Button size="sm">+ New</Button>
      </ToolbarSection>
    </Toolbar>
  ),
};

/**
 * Compact toolbar variant with reduced padding.
 */
export const Compact: Story = {
  render: () => (
    <Toolbar variant="compact">
      <ToolbarSection>
        <Input
          type="search"
          placeholder="Search..."
          aria-label="Search input"
          className="mdt-w-64"
        />
      </ToolbarSection>
      <ToolbarSpacer />
      <ToolbarSection>
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button size="sm">New</Button>
      </ToolbarSection>
    </Toolbar>
  ),
};

/**
 * Spacious toolbar variant with increased padding.
 */
export const Spacious: Story = {
  render: () => (
    <Toolbar variant="spacious">
      <ToolbarSection>
        <Input
          type="search"
          placeholder="Search..."
          aria-label="Search input"
          className="mdt-w-64"
        />
      </ToolbarSection>
      <ToolbarSpacer />
      <ToolbarSection>
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button size="sm">New</Button>
      </ToolbarSection>
    </Toolbar>
  ),
};

/**
 * Toolbar with only left-aligned content.
 */
export const LeftAligned: Story = {
  render: () => (
    <Toolbar>
      <ToolbarSection>
        <Input
          type="search"
          placeholder="Search..."
          aria-label="Search input"
          className="mdt-w-96"
        />
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button variant="outline" size="sm" aria-label="More options">
          ⋮
        </Button>
      </ToolbarSection>
    </Toolbar>
  ),
};

/**
 * Toolbar with only right-aligned content.
 */
export const RightAligned: Story = {
  render: () => (
    <Toolbar>
      <ToolbarSpacer />
      <ToolbarSection>
        <Button variant="outline" size="sm">
          Export
        </Button>
        <Button variant="outline" size="sm">
          Import
        </Button>
        <Button size="sm">+ Create</Button>
      </ToolbarSection>
    </Toolbar>
  ),
};

/**
 * Toolbar with three sections: left, center, and right.
 */
export const ThreeSections: Story = {
  render: () => (
    <Toolbar>
      <ToolbarSection>
        <Input
          type="search"
          placeholder="Search..."
          aria-label="Search input"
          className="mdt-w-64"
        />
      </ToolbarSection>
      <ToolbarSpacer />
      <ToolbarSection>
        <span className="mdt-text-sm mdt-text-muted-foreground">1,234 items</span>
      </ToolbarSection>
      <ToolbarSpacer />
      <ToolbarSection>
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button size="sm">+ New</Button>
      </ToolbarSection>
    </Toolbar>
  ),
};

/**
 * Borderless toolbar without bottom border.
 */
export const Borderless: Story = {
  render: () => (
    <Toolbar border={false}>
      <ToolbarSection>
        <Input
          type="search"
          placeholder="Search..."
          aria-label="Search input"
          className="mdt-w-64"
        />
      </ToolbarSection>
      <ToolbarSpacer />
      <ToolbarSection>
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button size="sm">New</Button>
      </ToolbarSection>
    </Toolbar>
  ),
};

/**
 * Toolbar with no left padding - useful for edge-to-edge layouts.
 */
export const NoPaddingLeft: Story = {
  render: () => (
    <Toolbar noPaddingLeft>
      <ToolbarSection>
        <Input
          type="search"
          placeholder="Search..."
          aria-label="Search input"
          className="mdt-w-64"
        />
      </ToolbarSection>
      <ToolbarSpacer />
      <ToolbarSection>
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button size="sm">New</Button>
      </ToolbarSection>
    </Toolbar>
  ),
};

/**
 * Toolbar with no right padding - useful for edge-to-edge layouts.
 */
export const NoPaddingRight: Story = {
  render: () => (
    <Toolbar noPaddingRight>
      <ToolbarSection>
        <Input
          type="search"
          placeholder="Search..."
          aria-label="Search input"
          className="mdt-w-64"
        />
      </ToolbarSection>
      <ToolbarSpacer />
      <ToolbarSection>
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button size="sm">New</Button>
      </ToolbarSection>
    </Toolbar>
  ),
};

/**
 * Toolbar with no horizontal padding (left and right).
 */
export const NoPaddingHorizontal: Story = {
  render: () => (
    <Toolbar noPaddingLeft noPaddingRight>
      <ToolbarSection>
        <Input
          type="search"
          placeholder="Search..."
          aria-label="Search input"
          className="mdt-w-64"
        />
      </ToolbarSection>
      <ToolbarSpacer />
      <ToolbarSection>
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button size="sm">New</Button>
      </ToolbarSection>
    </Toolbar>
  ),
};
