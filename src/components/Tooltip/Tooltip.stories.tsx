import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it. Built on top of Radix UI Tooltip.',
      },
    },
    controls: {
      exclude: ['class'],
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'The controlled open state of the tooltip',
      table: {
        type: { summary: 'boolean' },
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'The open state of the tooltip when it is initially rendered',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    delayDuration: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'The duration from when the mouse enters until the tooltip opens (ms)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="mdt-flex mdt-min-h-[200px] mdt-items-center mdt-justify-center">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default tooltip example - hover over the button to see the tooltip.
 */
export const Default: Story = {
  args: {
    defaultOpen: false,
  },
  render: (args: { defaultOpen?: boolean }) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a helpful tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

/**
 * Tooltips on all sides - top, right, bottom, and left.
 */
export const AllSides: Story = {
  render: () => (
    <div className="mdt-flex mdt-gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Tooltip on top</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Tooltip on right</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Tooltip on bottom</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Tooltip on left</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

/**
 * Tooltip with arrow pointing to the trigger element.
 */
export const WithArrow: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover for arrow</Button>
      </TooltipTrigger>
      <TooltipContent showArrow>
        <p>Tooltip with arrow</p>
      </TooltipContent>
    </Tooltip>
  ),
};

/**
 * Tooltip without arrow.
 */
export const WithoutArrow: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">No arrow</Button>
      </TooltipTrigger>
      <TooltipContent showArrow={false}>
        <p>Tooltip without arrow</p>
      </TooltipContent>
    </Tooltip>
  ),
};

/**
 * Different alignment options - start, center, and end.
 */
export const Alignment: Story = {
  render: () => (
    <div className="mdt-flex mdt-gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Start</Button>
        </TooltipTrigger>
        <TooltipContent align="start">
          <p>Aligned to start</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Center</Button>
        </TooltipTrigger>
        <TooltipContent align="center">
          <p>Aligned to center</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">End</Button>
        </TooltipTrigger>
        <TooltipContent align="end">
          <p>Aligned to end</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

/**
 * Custom delay duration before tooltip appears.
 */
export const WithDelay: Story = {
  render: () => (
    <TooltipProvider delayDuration={1000}>
      <div className="mdt-flex mdt-gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Instant (0ms)</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>No delay</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={500}>
          <TooltipTrigger asChild>
            <Button variant="outline">Medium (500ms)</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>500ms delay</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={1000}>
          <TooltipTrigger asChild>
            <Button variant="outline">Long (1000ms)</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>1000ms delay</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

/**
 * Rich content tooltip with formatted text and styling.
 */
export const RichContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Rich content</Button>
      </TooltipTrigger>
      <TooltipContent className="mdt-max-w-xs">
        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <p className="mdt-font-semibold">Advanced Features</p>
          <ul className="mdt-list-inside mdt-list-disc mdt-space-y-1 mdt-text-xs">
            <li>Keyboard navigation support</li>
            <li>Automatic positioning</li>
            <li>Collision detection</li>
            <li>Fully accessible</li>
          </ul>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
};

/**
 * Tooltips with info icons in a form context.
 */
export const InForm: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-80 mdt-flex-col mdt-gap-4">
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <div className="mdt-flex mdt-items-center mdt-gap-2">
          <label htmlFor="username" className="mdt-text-sm mdt-font-medium">
            Username
          </label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Username help">
                <Icon name="info" size="sm" color="muted" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your username must be unique and between 3-20 characters</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Input id="username" placeholder="Enter username" aria-label="Username input" />
      </div>

      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <div className="mdt-flex mdt-items-center mdt-gap-2">
          <label htmlFor="email" className="mdt-text-sm mdt-font-medium">
            Email
          </label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Email help">
                <Icon name="info" size="sm" color="muted" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>We&apos;ll never share your email with anyone else</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Input id="email" type="email" placeholder="Enter email" aria-label="Email input" />
      </div>

      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <div className="mdt-flex mdt-items-center mdt-gap-2">
          <label htmlFor="password" className="mdt-text-sm mdt-font-medium">
            Password
          </label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Password help">
                <Icon name="info" size="sm" color="muted" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Must be at least 8 characters with uppercase, lowercase, and numbers</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="Enter password"
          aria-label="Password input"
        />
      </div>
    </div>
  ),
};

/**
 * Tooltip on a disabled button - requires wrapper element.
 */
export const WithDisabledTrigger: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span role="button" tabIndex={0} className="mdt-inline-block">
          <Button disabled style={{ pointerEvents: 'none' }}>
            Disabled Button
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>This action is currently unavailable</p>
      </TooltipContent>
    </Tooltip>
  ),
};

/**
 * Multiple tooltips in a toolbar.
 */
export const MultipleTooltips: Story = {
  render: () => (
    <div className="mdt-inline-flex mdt-gap-1 mdt-rounded-md mdt-border mdt-border-border mdt-p-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Bold">
            <Icon name="bold" size="sm" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Bold</p>
          <span className="mdt-text-[10px] mdt-opacity-60">Ctrl+B</span>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Italic">
            <Icon name="italic" size="sm" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Italic</p>
          <span className="mdt-text-[10px] mdt-opacity-60">Ctrl+I</span>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Underline">
            <Icon name="underline" size="sm" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Underline</p>
          <span className="mdt-text-[10px] mdt-opacity-60">Ctrl+U</span>
        </TooltipContent>
      </Tooltip>

      <div className="mdt-mx-1 mdt-w-px mdt-bg-border" />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Insert link">
            <Icon name="link" size="sm" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Insert Link</p>
          <span className="mdt-text-[10px] mdt-opacity-60">Ctrl+K</span>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

/**
 * Controlled tooltip - open state is managed externally.
 */
export const Controlled: Story = {
  render: function ControlledComponent() {
    const [open, setOpen] = useState(false);

    return (
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-4">
        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <Button variant="outline">Controlled tooltip</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This tooltip&apos;s state is controlled externally</p>
          </TooltipContent>
        </Tooltip>

        <div className="mdt-flex mdt-gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setOpen(true);
            }}
          >
            Open
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>
        </div>

        <p className="mdt-text-sm mdt-text-muted-foreground">
          Tooltip is {open ? 'open' : 'closed'}
        </p>
      </div>
    );
  },
};

/**
 * Custom styling example with different colors and sizes.
 */
export const CustomStyling: Story = {
  render: () => (
    <div className="mdt-flex mdt-gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Success</Button>
        </TooltipTrigger>
        <TooltipContent
          className="mdt-bg-success mdt-text-success-foreground"
          arrowClassName="mdt-fill-success"
        >
          <p>Success message</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Warning</Button>
        </TooltipTrigger>
        <TooltipContent
          className="mdt-bg-warning mdt-text-warning-foreground"
          arrowClassName="mdt-fill-warning"
        >
          <p>Warning message</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Error</Button>
        </TooltipTrigger>
        <TooltipContent
          className="mdt-bg-destructive mdt-text-destructive-foreground"
          arrowClassName="mdt-fill-destructive"
        >
          <p>Error message</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Large</Button>
        </TooltipTrigger>
        <TooltipContent className="mdt-px-4 mdt-py-3 mdt-text-sm">
          <p>Large tooltip with more padding</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};
