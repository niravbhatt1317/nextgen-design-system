import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToolbarOld, ToolbarOldSection, ToolbarOldSpacer } from './ToolbarOld';
import { Button } from '../Button';
import { Input } from '../Input';

const meta: Meta<typeof ToolbarOld> = {
  title: 'Deprecated/Toolbar Old',
  component: ToolbarOld,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullwidth',
    status: {
      type: 'deprecated',
      since: '0.4.0',
      deprecation: {
        deprecatedSince: '0.4.0',
        removalIn: '1.0.0',
        replacement: 'Toolbar',
        message:
          'Toolbar is now the merged console strip (4 September 2026): 60px tall, a 24px inset, 10px between controls, holding ToolbarButton. This is the earlier general-purpose strip with its compact, spacious and padding switches, kept for side-by-side comparison until the removal pull request.',
      },
    },
    docs: {
      description: {
        component: [
          '## ⚠️ Deprecated — use `Toolbar`',
          '',
          '`Toolbar` is now the strip the merged console uses: 60px tall, a 24px inset, 10px between',
          'controls, holding `ToolbarButton` controls with their four states. This is the earlier',
          'general-purpose strip with its compact, spacious and padding switches, kept so the two',
          'can be reviewed side by side.',
          '',
          '**Do not start anything new on it.**',
          '',
          'The earlier strip: search bars, filters and action buttons, with flexible sections and',
          'spacing for custom layouts.',
        ].join('\n'),
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
      description: 'ToolbarOld content including sections, spacers, and other elements',
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
    <ToolbarOld>
      <ToolbarOldSection>
        <Input
          type="search"
          placeholder="Search..."
          aria-label="Search input"
          className="mdt-w-64"
        />
      </ToolbarOldSection>
      <ToolbarOldSpacer />
      <ToolbarOldSection>
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button size="sm">New</Button>
      </ToolbarOldSection>
    </ToolbarOld>
  ),
};

/**
 * ToolbarOld with search, filters, and multiple action buttons.
 */
export const WithMultipleActions: Story = {
  render: () => (
    <ToolbarOld>
      <ToolbarOldSection>
        <Input
          type="search"
          placeholder="Search..."
          aria-label="Search input"
          className="mdt-w-72"
        />
        <Button variant="ghost" size="sm" aria-label="Search">
          🔍
        </Button>
      </ToolbarOldSection>
      <ToolbarOldSection>
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button variant="outline" size="sm" aria-label="Sort">
          ⬍
        </Button>
        <Button variant="outline" size="sm" aria-label="View options">
          ⚙
        </Button>
      </ToolbarOldSection>
      <ToolbarOldSpacer />
      <ToolbarOldSection>
        <Button variant="outline" size="sm" aria-label="Share">
          📤
        </Button>
        <Button size="sm">+ New</Button>
      </ToolbarOldSection>
    </ToolbarOld>
  ),
};

/**
 * Compact toolbar variant with reduced padding.
 */
export const Compact: Story = {
  render: () => (
    <ToolbarOld variant="compact">
      <ToolbarOldSection>
        <Input
          type="search"
          placeholder="Search..."
          aria-label="Search input"
          className="mdt-w-64"
        />
      </ToolbarOldSection>
      <ToolbarOldSpacer />
      <ToolbarOldSection>
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button size="sm">New</Button>
      </ToolbarOldSection>
    </ToolbarOld>
  ),
};

/**
 * Spacious toolbar variant with increased padding.
 */
export const Spacious: Story = {
  render: () => (
    <ToolbarOld variant="spacious">
      <ToolbarOldSection>
        <Input
          type="search"
          placeholder="Search..."
          aria-label="Search input"
          className="mdt-w-64"
        />
      </ToolbarOldSection>
      <ToolbarOldSpacer />
      <ToolbarOldSection>
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button size="sm">New</Button>
      </ToolbarOldSection>
    </ToolbarOld>
  ),
};

/**
 * ToolbarOld with only left-aligned content.
 */
export const LeftAligned: Story = {
  render: () => (
    <ToolbarOld>
      <ToolbarOldSection>
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
      </ToolbarOldSection>
    </ToolbarOld>
  ),
};

/**
 * ToolbarOld with only right-aligned content.
 */
export const RightAligned: Story = {
  render: () => (
    <ToolbarOld>
      <ToolbarOldSpacer />
      <ToolbarOldSection>
        <Button variant="outline" size="sm">
          Export
        </Button>
        <Button variant="outline" size="sm">
          Import
        </Button>
        <Button size="sm">+ Create</Button>
      </ToolbarOldSection>
    </ToolbarOld>
  ),
};

/**
 * ToolbarOld with three sections: left, center, and right.
 */
export const ThreeSections: Story = {
  render: () => (
    <ToolbarOld>
      <ToolbarOldSection>
        <Input
          type="search"
          placeholder="Search..."
          aria-label="Search input"
          className="mdt-w-64"
        />
      </ToolbarOldSection>
      <ToolbarOldSpacer />
      <ToolbarOldSection>
        <span className="mdt-text-sm mdt-text-muted-foreground">1,234 items</span>
      </ToolbarOldSection>
      <ToolbarOldSpacer />
      <ToolbarOldSection>
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button size="sm">+ New</Button>
      </ToolbarOldSection>
    </ToolbarOld>
  ),
};

/**
 * Borderless toolbar without bottom border.
 */
export const Borderless: Story = {
  render: () => (
    <ToolbarOld border={false}>
      <ToolbarOldSection>
        <Input
          type="search"
          placeholder="Search..."
          aria-label="Search input"
          className="mdt-w-64"
        />
      </ToolbarOldSection>
      <ToolbarOldSpacer />
      <ToolbarOldSection>
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button size="sm">New</Button>
      </ToolbarOldSection>
    </ToolbarOld>
  ),
};

/**
 * ToolbarOld with no left padding - useful for edge-to-edge layouts.
 */
export const NoPaddingLeft: Story = {
  render: () => (
    <ToolbarOld noPaddingLeft>
      <ToolbarOldSection>
        <Input
          type="search"
          placeholder="Search..."
          aria-label="Search input"
          className="mdt-w-64"
        />
      </ToolbarOldSection>
      <ToolbarOldSpacer />
      <ToolbarOldSection>
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button size="sm">New</Button>
      </ToolbarOldSection>
    </ToolbarOld>
  ),
};

/**
 * ToolbarOld with no right padding - useful for edge-to-edge layouts.
 */
export const NoPaddingRight: Story = {
  render: () => (
    <ToolbarOld noPaddingRight>
      <ToolbarOldSection>
        <Input
          type="search"
          placeholder="Search..."
          aria-label="Search input"
          className="mdt-w-64"
        />
      </ToolbarOldSection>
      <ToolbarOldSpacer />
      <ToolbarOldSection>
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button size="sm">New</Button>
      </ToolbarOldSection>
    </ToolbarOld>
  ),
};

/**
 * ToolbarOld with no horizontal padding (left and right).
 */
export const NoPaddingHorizontal: Story = {
  render: () => (
    <ToolbarOld noPaddingLeft noPaddingRight>
      <ToolbarOldSection>
        <Input
          type="search"
          placeholder="Search..."
          aria-label="Search input"
          className="mdt-w-64"
        />
      </ToolbarOldSection>
      <ToolbarOldSpacer />
      <ToolbarOldSection>
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button size="sm">New</Button>
      </ToolbarOldSection>
    </ToolbarOld>
  ),
};
