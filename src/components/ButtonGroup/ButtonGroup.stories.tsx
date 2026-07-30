import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button';
import { Input } from '../Input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../DropdownMenu';
import { Icon } from '../Icon';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ButtonGroup component for grouping related buttons together. Supports horizontal and vertical orientations, with seamless attached or spaced layouts.',
      },
    },
  },
  argTypes: {
    children: {
      control: false,
      description: 'Button elements to group together',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the button group',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    variant: {
      control: 'select',
      options: ['attached', 'default'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'attached' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size variant',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button group should take full width',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default horizontal attached button group with outline buttons.
 */
export const Default: Story = {
  args: {
    children: (
      <>
        <Button variant="outline">Left</Button>
        <Button variant="outline">Middle</Button>
        <Button variant="outline">Right</Button>
      </>
    ),
  },
};

/**
 * Horizontal button group with primary buttons.
 */
export const Primary: Story = {
  args: {
    children: (
      <>
        <Button>Save</Button>
        <Button>Submit</Button>
        <Button>Publish</Button>
      </>
    ),
  },
};

/**
 * Vertical button group showing stacked buttons.
 */
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    children: (
      <>
        <Button variant="outline">Top</Button>
        <Button variant="outline">Middle</Button>
        <Button variant="outline">Bottom</Button>
      </>
    ),
  },
};

/**
 * Icon-only button group for toolbar actions.
 */
export const IconButtons: Story = {
  args: {
    children: (
      <>
        <Button variant="outline" size="icon" aria-label="Settings">
          <Icon name="settings" aria-hidden />
        </Button>
        <Button variant="outline" size="icon" aria-label="Download">
          <Icon name="download" aria-hidden />
        </Button>
        <Button variant="outline" size="icon" aria-label="Share">
          <Icon name="share-2" aria-hidden />
        </Button>
      </>
    ),
  },
};

/**
 * Button group with separated buttons instead of attached.
 */
export const Separated: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <Button>Save</Button>
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </>
    ),
  },
};

/**
 * Full width button group where buttons share equal space.
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: (
      <>
        <Button variant="outline">Cancel</Button>
        <Button variant="outline">Preview</Button>
        <Button>Publish</Button>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
  },
};

/**
 * Button group with different button sizes.
 */
export const Sizes: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <ButtonGroup>
        <Button variant="outline" size="xs">
          Extra Small
        </Button>
        <Button variant="outline" size="xs">
          Button
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm">
          Small
        </Button>
        <Button variant="outline" size="sm">
          Button
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="md">
          Medium
        </Button>
        <Button variant="outline" size="md">
          Button
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="lg">
          Large
        </Button>
        <Button variant="outline" size="lg">
          Button
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="xl">
          Extra Large
        </Button>
        <Button variant="outline" size="xl">
          Button
        </Button>
      </ButtonGroup>
    </div>
  ),
};

/**
 * Button group with mixed button variants.
 */
export const MixedVariants: Story = {
  args: {
    children: (
      <>
        <Button variant="outline">Cancel</Button>
        <Button variant="secondary">Draft</Button>
        <Button>Publish</Button>
      </>
    ),
  },
};

/**
 * Toolbar example with grouped action buttons.
 */
export const Toolbar: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-4 mdt-rounded-md mdt-border mdt-bg-background mdt-p-2">
      <ButtonGroup>
        <Button variant="outline" size="sm" aria-label="Copy">
          <Icon name="copy" size="sm" aria-hidden />
        </Button>
        <Button variant="outline" size="sm" aria-label="Edit">
          <Icon name="edit" size="sm" aria-hidden />
        </Button>
        <Button variant="outline" size="sm" aria-label="Delete">
          <Icon name="trash-2" size="sm" aria-hidden />
        </Button>
      </ButtonGroup>
      <div className="mdt-h-6 mdt-w-px mdt-bg-border" />
      <ButtonGroup>
        <Button variant="outline" size="sm" aria-label="Download">
          <Icon name="download" size="sm" aria-hidden />
        </Button>
        <Button variant="outline" size="sm" aria-label="Share">
          <Icon name="share-2" size="sm" aria-hidden />
        </Button>
      </ButtonGroup>
    </div>
  ),
};

/**
 * Pagination example using button group.
 */
export const Pagination: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Previous</Button>
      <Button variant="outline">1</Button>
      <Button variant="outline">2</Button>
      <Button>3</Button>
      <Button variant="outline">4</Button>
      <Button variant="outline">5</Button>
      <Button variant="outline">Next</Button>
    </ButtonGroup>
  ),
};

/**
 * Vertical button group with icons and text.
 */
export const VerticalWithIcons: Story = {
  args: {
    orientation: 'vertical',
    children: (
      <>
        <Button variant="outline" className="mdt-justify-start">
          <Icon name="settings" size="sm" className="mdt-mr-2" aria-hidden />
          Settings
        </Button>
        <Button variant="outline" className="mdt-justify-start">
          <Icon name="download" size="sm" className="mdt-mr-2" aria-hidden />
          Download
        </Button>
        <Button variant="outline" className="mdt-justify-start">
          <Icon name="share-2" size="sm" className="mdt-mr-2" aria-hidden />
          Share
        </Button>
      </>
    ),
  },
};

/**
 * Button group with disabled buttons.
 */
export const WithDisabled: Story = {
  args: {
    children: (
      <>
        <Button variant="outline">Active</Button>
        <Button variant="outline" disabled>
          Disabled
        </Button>
        <Button variant="outline">Active</Button>
      </>
    ),
  },
};

/**
 * Input group with attached buttons for search functionality.
 * Clean API - just wrap Input and Button in ButtonGroup!
 */
export const InputGroup: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-full mdt-flex-col mdt-gap-4" style={{ maxWidth: '400px' }}>
      {/* Search with button - Simple and clean! */}
      <ButtonGroup>
        <Input placeholder="Search..." aria-label="Search input" />
        <Button variant="outline" aria-label="Search">
          <Icon name="search" size="sm" aria-hidden />
        </Button>
      </ButtonGroup>

      {/* Input with prefix and suffix buttons */}
      <ButtonGroup>
        <Button variant="outline">Prefix</Button>
        <Input placeholder="Enter text..." aria-label="Text input" />
        <Button variant="outline">Suffix</Button>
      </ButtonGroup>

      {/* Email input with action buttons */}
      <ButtonGroup>
        <Input type="email" placeholder="Email address..." aria-label="Email input" />
        <Button variant="outline">Copy</Button>
        <Button>Subscribe</Button>
      </ButtonGroup>

      {/* URL input with protocol selector */}
      <ButtonGroup>
        <Button variant="outline">https://</Button>
        <Input type="url" placeholder="example.com" aria-label="URL input" />
      </ButtonGroup>

      {/* Price input with currency */}
      <ButtonGroup>
        <Button variant="outline">$</Button>
        <Input type="number" placeholder="0.00" aria-label="Price input" />
        <Button variant="outline">USD</Button>
      </ButtonGroup>
    </div>
  ),
};

/**
 * Button with dropdown menu (split button).
 */
export const ButtonWithDropdown: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      {/* Split button with dropdown */}
      <ButtonGroup>
        <Button>Save Changes</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="mdt-px-2" aria-label="More save options">
              <Icon name="chevron-down" size="sm" aria-hidden />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <span>Save and Close</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Save and New</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Save as Template</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>

      {/* Multiple split buttons */}
      <ButtonGroup>
        <Button variant="outline">Edit</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="mdt-px-2" aria-label="More edit options">
              <Icon name="chevron-down" size="sm" aria-hidden />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <span>Edit Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Edit Permissions</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Edit Settings</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>

      {/* Action group with dropdowns */}
      <ButtonGroup>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" aria-label="File menu">
              File
              <Icon name="chevron-down" size="sm" className="mdt-ml-2" aria-hidden />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span>New</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Open</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Save</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" aria-label="Edit menu">
              Edit
              <Icon name="chevron-down" size="sm" className="mdt-ml-2" aria-hidden />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span>Undo</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Redo</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Cut</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" aria-label="View menu">
              View
              <Icon name="chevron-down" size="sm" className="mdt-ml-2" aria-hidden />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span>Zoom In</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Zoom Out</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Full Screen</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </div>
  ),
};

/**
 * Advanced toolbar with mixed components.
 */
export const AdvancedToolbar: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-2 mdt-rounded-md mdt-border mdt-bg-background mdt-p-2">
      {/* Text formatting */}
      <ButtonGroup>
        <Button variant="outline" size="sm" aria-label="Bold">
          <span className="mdt-font-bold">B</span>
        </Button>
        <Button variant="outline" size="sm" aria-label="Italic">
          <span className="mdt-italic">I</span>
        </Button>
        <Button variant="outline" size="sm" aria-label="Underline">
          <span className="mdt-underline">U</span>
        </Button>
      </ButtonGroup>

      <div className="mdt-h-6 mdt-w-px mdt-bg-border" />

      {/* Alignment with dropdown */}
      <ButtonGroup>
        <Button variant="outline" size="sm">
          Left
        </Button>
        <Button variant="outline" size="sm">
          Center
        </Button>
        <Button variant="outline" size="sm">
          Right
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="mdt-px-2"
              aria-label="More alignment options"
            >
              <Icon name="chevron-down" size="sm" aria-hidden />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span>Justify</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Distribute</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>

      <div className="mdt-h-6 mdt-w-px mdt-bg-border" />

      {/* Actions */}
      <ButtonGroup>
        <Button variant="outline" size="sm" aria-label="Copy">
          <Icon name="copy" size="sm" aria-hidden />
        </Button>
        <Button variant="outline" size="sm" aria-label="Download">
          <Icon name="download" size="sm" aria-hidden />
        </Button>
        <Button variant="outline" size="sm" aria-label="Share">
          <Icon name="share-2" size="sm" aria-hidden />
        </Button>
      </ButtonGroup>
    </div>
  ),
};
