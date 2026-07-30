import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';
import { Icon } from '../Icon';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A set of two-state buttons that can be toggled on or off. Supports single and multiple selection modes with various visual variants.',
      },
    },
    controls: {
      exclude: ['class'],
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Selection mode - single or multiple items',
      table: {
        defaultValue: { summary: 'single' },
        type: { summary: "'single' | 'multiple'" },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the toggle items',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the toggle group',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the toggle group should take full width',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle group is disabled',
      table: {
        defaultValue: { summary: 'false' },
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
type Story = StoryObj<typeof ToggleGroup>;

/**
 * Default toggle group with icon buttons.
 */
export const Default: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left">
        <Icon name="align-left" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <Icon name="align-center" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <Icon name="align-right" aria-hidden />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/**
 * Multiple selection mode allows selecting multiple items.
 */
export const MultipleSelection: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={['bold']}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Icon name="bold" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Icon name="italic" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Icon name="underline" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <Icon name="strikethrough" aria-hidden />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/**
 * Outline variant with border styling.
 */
export const OutlineVariant: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline" defaultValue="list">
      <ToggleGroupItem value="list" aria-label="List view">
        <Icon name="list" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <Icon name="layout-grid" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="kanban" aria-label="Kanban view">
        <Icon name="kanban" aria-hidden />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/**
 * Toggle group with text labels.
 */
export const WithTextLabels: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="week">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
      <ToggleGroupItem value="year">Year</ToggleGroupItem>
    </ToggleGroup>
  ),
};

/**
 * Toggle items with both icons and text.
 */
export const IconsAndText: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline" defaultValue="grid">
      <ToggleGroupItem value="list">
        <Icon name="list" aria-hidden />
        List
      </ToggleGroupItem>
      <ToggleGroupItem value="grid">
        <Icon name="layout-grid" aria-hidden />
        Grid
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/**
 * All size variants displayed together.
 */
export const Sizes: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-items-start mdt-gap-4">
      <div className="mdt-flex mdt-flex-col mdt-gap-1">
        <span className="mdt-text-xs mdt-text-muted-foreground">Small</span>
        <ToggleGroup type="single" size="sm" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Align left">
            <Icon name="align-left" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <Icon name="align-center" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <Icon name="align-right" aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-1">
        <span className="mdt-text-xs mdt-text-muted-foreground">Medium (default)</span>
        <ToggleGroup type="single" size="md" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Align left">
            <Icon name="align-left" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <Icon name="align-center" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <Icon name="align-right" aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-1">
        <span className="mdt-text-xs mdt-text-muted-foreground">Large</span>
        <ToggleGroup type="single" size="lg" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Align left">
            <Icon name="align-left" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <Icon name="align-center" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <Icon name="align-right" aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

/**
 * Vertical orientation for stacked toggle buttons.
 */
export const VerticalOrientation: Story = {
  render: () => (
    <div className="mdt-flex mdt-gap-8">
      <div className="mdt-flex mdt-flex-col mdt-gap-1">
        <span className="mdt-text-xs mdt-text-muted-foreground">Default</span>
        <ToggleGroup type="single" orientation="vertical" defaultValue="inbox">
          <ToggleGroupItem value="inbox" aria-label="Inbox">
            <Icon name="inbox" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="drafts" aria-label="Drafts">
            <Icon name="file-text" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="sent" aria-label="Sent">
            <Icon name="send" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="archive" aria-label="Archive">
            <Icon name="archive" aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-1">
        <span className="mdt-text-xs mdt-text-muted-foreground">Outline</span>
        <ToggleGroup type="single" orientation="vertical" variant="outline" defaultValue="inbox">
          <ToggleGroupItem value="inbox" aria-label="Inbox">
            <Icon name="inbox" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="drafts" aria-label="Drafts">
            <Icon name="file-text" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="sent" aria-label="Sent">
            <Icon name="send" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="archive" aria-label="Archive">
            <Icon name="archive" aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

/**
 * Disabled toggle group.
 */
export const Disabled: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <div className="mdt-flex mdt-flex-col mdt-gap-1">
        <span className="mdt-text-xs mdt-text-muted-foreground">Entire group disabled</span>
        <ToggleGroup type="single" defaultValue="center" disabled>
          <ToggleGroupItem value="left" aria-label="Align left">
            <Icon name="align-left" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <Icon name="align-center" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <Icon name="align-right" aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-1">
        <span className="mdt-text-xs mdt-text-muted-foreground">Individual item disabled</span>
        <ToggleGroup type="single" defaultValue="left">
          <ToggleGroupItem value="left" aria-label="Align left">
            <Icon name="align-left" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center" disabled>
            <Icon name="align-center" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <Icon name="align-right" aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

/**
 * Full width toggle group that spans the container.
 */
export const FullWidth: Story = {
  render: () => (
    <div className="mdt-w-80">
      <ToggleGroup type="single" fullWidth defaultValue="weekly">
        <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
        <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
        <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

/**
 * Controlled toggle group with state management.
 */
export const Controlled: Story = {
  render: function ControlledExample() {
    const [value, setValue] = useState('center');

    return (
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-4">
        <ToggleGroup type="single" value={value} onValueChange={setValue}>
          <ToggleGroupItem value="left" aria-label="Align left">
            <Icon name="align-left" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <Icon name="align-center" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <Icon name="align-right" aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="mdt-text-sm mdt-text-muted-foreground">
          Selected: <span className="mdt-font-medium mdt-text-foreground">{value || 'none'}</span>
        </p>
      </div>
    );
  },
};

/**
 * Controlled multiple selection toggle group.
 */
export const ControlledMultiple: Story = {
  render: function ControlledMultipleExample() {
    const [values, setValues] = useState<string[]>(['bold']);

    return (
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-4">
        <ToggleGroup type="multiple" value={values} onValueChange={setValues}>
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Icon name="bold" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Icon name="italic" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Icon name="underline" aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="mdt-text-sm mdt-text-muted-foreground">
          Selected:{' '}
          <span className="mdt-font-medium mdt-text-foreground">
            {values.length > 0 ? values.join(', ') : 'none'}
          </span>
        </p>
      </div>
    );
  },
};

/**
 * All variants side by side for comparison.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <h4 className="mdt-text-sm mdt-font-medium mdt-text-foreground">Default Variant</h4>
        <div className="mdt-flex mdt-gap-4">
          <ToggleGroup type="single" variant="default" defaultValue="center">
            <ToggleGroupItem value="left" aria-label="Align left">
              <Icon name="align-left" aria-hidden />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <Icon name="align-center" aria-hidden />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <Icon name="align-right" aria-hidden />
            </ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" variant="default" defaultValue="week">
            <ToggleGroupItem value="day">Day</ToggleGroupItem>
            <ToggleGroupItem value="week">Week</ToggleGroupItem>
            <ToggleGroupItem value="month">Month</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <h4 className="mdt-text-sm mdt-font-medium mdt-text-foreground">Outline Variant</h4>
        <div className="mdt-flex mdt-gap-4">
          <ToggleGroup type="single" variant="outline" defaultValue="center">
            <ToggleGroupItem value="left" aria-label="Align left">
              <Icon name="align-left" aria-hidden />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <Icon name="align-center" aria-hidden />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <Icon name="align-right" aria-hidden />
            </ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" variant="outline" defaultValue="week">
            <ToggleGroupItem value="day">Day</ToggleGroupItem>
            <ToggleGroupItem value="week">Week</ToggleGroupItem>
            <ToggleGroupItem value="month">Month</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  ),
};

/**
 * Real-world example: Text editor toolbar.
 */
export const TextEditorToolbar: Story = {
  render: function TextEditorExample() {
    const [formatting, setFormatting] = useState<string[]>(['bold']);
    const [alignment, setAlignment] = useState('left');

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background mdt-p-3">
          <div className="mdt-flex mdt-items-center mdt-gap-2">
            <ToggleGroup type="multiple" value={formatting} onValueChange={setFormatting}>
              <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Icon name="bold" aria-hidden />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <Icon name="italic" aria-hidden />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Icon name="underline" aria-hidden />
              </ToggleGroupItem>
            </ToggleGroup>

            <div className="mdt-h-6 mdt-w-px mdt-bg-border" />

            <ToggleGroup type="single" value={alignment} onValueChange={setAlignment}>
              <ToggleGroupItem value="left" aria-label="Align left">
                <Icon name="align-left" aria-hidden />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Align center">
                <Icon name="align-center" aria-hidden />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Align right">
                <Icon name="align-right" aria-hidden />
              </ToggleGroupItem>
              <ToggleGroupItem value="justify" aria-label="Justify">
                <Icon name="align-justify" aria-hidden />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <p className="mdt-text-sm mdt-text-muted-foreground">
          Formatting: {formatting.length > 0 ? formatting.join(', ') : 'none'} | Alignment:{' '}
          {alignment}
        </p>
      </div>
    );
  },
};

/**
 * Real-world example: View switcher.
 */
export const ViewSwitcher: Story = {
  render: function ViewSwitcherExample() {
    const [view, setView] = useState('grid');

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <div className="mdt-flex mdt-items-center mdt-justify-between mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background mdt-p-4">
          <span className="mdt-text-sm mdt-font-medium mdt-text-foreground">Projects</span>
          <ToggleGroup type="single" variant="outline" value={view} onValueChange={setView}>
            <ToggleGroupItem value="list" aria-label="List view">
              <Icon name="list" aria-hidden />
            </ToggleGroupItem>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Icon name="layout-grid" aria-hidden />
            </ToggleGroupItem>
            <ToggleGroupItem value="kanban" aria-label="Kanban view">
              <Icon name="kanban" aria-hidden />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <p className="mdt-text-sm mdt-text-muted-foreground">Current view: {view}</p>
      </div>
    );
  },
};
