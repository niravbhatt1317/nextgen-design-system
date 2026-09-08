import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { TooltipOld, TooltipContentOld, TooltipProviderOld, TooltipTriggerOld } from './TooltipOld';

const meta: Meta<typeof TooltipOld> = {
  title: 'Deprecated/Tooltip Old',
  component: TooltipOld,
  tags: ['autodocs'],
  parameters: {
    status: {
      type: 'deprecated',
      since: '0.4.0',
      deprecation: {
        deprecatedSince: '0.4.0',
        removalIn: '1.0.0',
        replacement: 'Tooltip',
        message:
          'Tooltip is now the merged console bubble on the library engine (7 September 2026): the console fill and text, a 100ms wait with instant chips, a quieter hint line, a value list that scrolls past seven, a 280px cap, and the same four sides, arrow and dark flip. This is the earlier one, kept for side-by-side comparison until the removal pull request.',
      },
    },
    layout: 'centered',
    docs: {
      description: {
        component:
          '## ⚠️ Deprecated — use `Tooltip`. Tooltip is now the merged console bubble on the library engine (7 September 2026); this earlier one stays only for side-by-side comparison. ' +
          'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it. Built on top of Radix UI TooltipOld.',
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
      <TooltipProviderOld>
        <div className="mdt-flex mdt-min-h-[200px] mdt-items-center mdt-justify-center">
          <Story />
        </div>
      </TooltipProviderOld>
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
    <TooltipOld {...args}>
      <TooltipTriggerOld asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTriggerOld>
      <TooltipContentOld>
        <p>This is a helpful tooltip</p>
      </TooltipContentOld>
    </TooltipOld>
  ),
};

/**
 * Tooltips on all sides - top, right, bottom, and left.
 */
export const AllSides: Story = {
  render: () => (
    <div className="mdt-flex mdt-gap-4">
      <TooltipOld>
        <TooltipTriggerOld asChild>
          <Button variant="outline">Top</Button>
        </TooltipTriggerOld>
        <TooltipContentOld side="top">
          <p>TooltipOld on top</p>
        </TooltipContentOld>
      </TooltipOld>

      <TooltipOld>
        <TooltipTriggerOld asChild>
          <Button variant="outline">Right</Button>
        </TooltipTriggerOld>
        <TooltipContentOld side="right">
          <p>TooltipOld on right</p>
        </TooltipContentOld>
      </TooltipOld>

      <TooltipOld>
        <TooltipTriggerOld asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTriggerOld>
        <TooltipContentOld side="bottom">
          <p>TooltipOld on bottom</p>
        </TooltipContentOld>
      </TooltipOld>

      <TooltipOld>
        <TooltipTriggerOld asChild>
          <Button variant="outline">Left</Button>
        </TooltipTriggerOld>
        <TooltipContentOld side="left">
          <p>TooltipOld on left</p>
        </TooltipContentOld>
      </TooltipOld>
    </div>
  ),
};

/**
 * TooltipOld with arrow pointing to the trigger element.
 */
export const WithArrow: Story = {
  render: () => (
    <TooltipOld>
      <TooltipTriggerOld asChild>
        <Button variant="outline">Hover for arrow</Button>
      </TooltipTriggerOld>
      <TooltipContentOld showArrow>
        <p>TooltipOld with arrow</p>
      </TooltipContentOld>
    </TooltipOld>
  ),
};

/**
 * TooltipOld without arrow.
 */
export const WithoutArrow: Story = {
  render: () => (
    <TooltipOld>
      <TooltipTriggerOld asChild>
        <Button variant="outline">No arrow</Button>
      </TooltipTriggerOld>
      <TooltipContentOld showArrow={false}>
        <p>TooltipOld without arrow</p>
      </TooltipContentOld>
    </TooltipOld>
  ),
};

/**
 * Different alignment options - start, center, and end.
 */
export const Alignment: Story = {
  render: () => (
    <div className="mdt-flex mdt-gap-4">
      <TooltipOld>
        <TooltipTriggerOld asChild>
          <Button variant="outline">Start</Button>
        </TooltipTriggerOld>
        <TooltipContentOld align="start">
          <p>Aligned to start</p>
        </TooltipContentOld>
      </TooltipOld>

      <TooltipOld>
        <TooltipTriggerOld asChild>
          <Button variant="outline">Center</Button>
        </TooltipTriggerOld>
        <TooltipContentOld align="center">
          <p>Aligned to center</p>
        </TooltipContentOld>
      </TooltipOld>

      <TooltipOld>
        <TooltipTriggerOld asChild>
          <Button variant="outline">End</Button>
        </TooltipTriggerOld>
        <TooltipContentOld align="end">
          <p>Aligned to end</p>
        </TooltipContentOld>
      </TooltipOld>
    </div>
  ),
};

/**
 * Custom delay duration before tooltip appears.
 */
export const WithDelay: Story = {
  render: () => (
    <TooltipProviderOld delayDuration={1000}>
      <div className="mdt-flex mdt-gap-4">
        <TooltipOld>
          <TooltipTriggerOld asChild>
            <Button variant="outline">Instant (0ms)</Button>
          </TooltipTriggerOld>
          <TooltipContentOld>
            <p>No delay</p>
          </TooltipContentOld>
        </TooltipOld>

        <TooltipOld delayDuration={500}>
          <TooltipTriggerOld asChild>
            <Button variant="outline">Medium (500ms)</Button>
          </TooltipTriggerOld>
          <TooltipContentOld>
            <p>500ms delay</p>
          </TooltipContentOld>
        </TooltipOld>

        <TooltipOld delayDuration={1000}>
          <TooltipTriggerOld asChild>
            <Button variant="outline">Long (1000ms)</Button>
          </TooltipTriggerOld>
          <TooltipContentOld>
            <p>1000ms delay</p>
          </TooltipContentOld>
        </TooltipOld>
      </div>
    </TooltipProviderOld>
  ),
};

/**
 * Rich content tooltip with formatted text and styling.
 */
export const RichContent: Story = {
  render: () => (
    <TooltipOld>
      <TooltipTriggerOld asChild>
        <Button variant="outline">Rich content</Button>
      </TooltipTriggerOld>
      <TooltipContentOld className="mdt-max-w-xs">
        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <p className="mdt-font-semibold">Advanced Features</p>
          <ul className="mdt-list-inside mdt-list-disc mdt-space-y-1 mdt-text-xs">
            <li>Keyboard navigation support</li>
            <li>Automatic positioning</li>
            <li>Collision detection</li>
            <li>Fully accessible</li>
          </ul>
        </div>
      </TooltipContentOld>
    </TooltipOld>
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
          <TooltipOld>
            <TooltipTriggerOld asChild>
              <Button variant="ghost" size="icon" aria-label="Username help">
                <Icon name="info" size="sm" color="muted" />
              </Button>
            </TooltipTriggerOld>
            <TooltipContentOld>
              <p>Your username must be unique and between 3-20 characters</p>
            </TooltipContentOld>
          </TooltipOld>
        </div>
        <Input id="username" placeholder="Enter username" aria-label="Username input" />
      </div>

      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <div className="mdt-flex mdt-items-center mdt-gap-2">
          <label htmlFor="email" className="mdt-text-sm mdt-font-medium">
            Email
          </label>
          <TooltipOld>
            <TooltipTriggerOld asChild>
              <Button variant="ghost" size="icon" aria-label="Email help">
                <Icon name="info" size="sm" color="muted" />
              </Button>
            </TooltipTriggerOld>
            <TooltipContentOld>
              <p>We&apos;ll never share your email with anyone else</p>
            </TooltipContentOld>
          </TooltipOld>
        </div>
        <Input id="email" type="email" placeholder="Enter email" aria-label="Email input" />
      </div>

      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <div className="mdt-flex mdt-items-center mdt-gap-2">
          <label htmlFor="password" className="mdt-text-sm mdt-font-medium">
            Password
          </label>
          <TooltipOld>
            <TooltipTriggerOld asChild>
              <Button variant="ghost" size="icon" aria-label="Password help">
                <Icon name="info" size="sm" color="muted" />
              </Button>
            </TooltipTriggerOld>
            <TooltipContentOld>
              <p>Must be at least 8 characters with uppercase, lowercase, and numbers</p>
            </TooltipContentOld>
          </TooltipOld>
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
 * TooltipOld on a disabled button - requires wrapper element.
 */
export const WithDisabledTrigger: Story = {
  render: () => (
    <TooltipOld>
      <TooltipTriggerOld asChild>
        <span role="button" tabIndex={0} className="mdt-inline-block">
          <Button disabled style={{ pointerEvents: 'none' }}>
            Disabled Button
          </Button>
        </span>
      </TooltipTriggerOld>
      <TooltipContentOld>
        <p>This action is currently unavailable</p>
      </TooltipContentOld>
    </TooltipOld>
  ),
};

/**
 * Multiple tooltips in a toolbar.
 */
export const MultipleTooltips: Story = {
  render: () => (
    <div className="mdt-inline-flex mdt-gap-1 mdt-rounded-md mdt-border mdt-border-border mdt-p-1">
      <TooltipOld>
        <TooltipTriggerOld asChild>
          <Button variant="ghost" size="icon" aria-label="Bold">
            <Icon name="bold" size="sm" />
          </Button>
        </TooltipTriggerOld>
        <TooltipContentOld>
          <p>Bold</p>
          <span className="mdt-text-[10px] mdt-opacity-60">Ctrl+B</span>
        </TooltipContentOld>
      </TooltipOld>

      <TooltipOld>
        <TooltipTriggerOld asChild>
          <Button variant="ghost" size="icon" aria-label="Italic">
            <Icon name="italic" size="sm" />
          </Button>
        </TooltipTriggerOld>
        <TooltipContentOld>
          <p>Italic</p>
          <span className="mdt-text-[10px] mdt-opacity-60">Ctrl+I</span>
        </TooltipContentOld>
      </TooltipOld>

      <TooltipOld>
        <TooltipTriggerOld asChild>
          <Button variant="ghost" size="icon" aria-label="Underline">
            <Icon name="underline" size="sm" />
          </Button>
        </TooltipTriggerOld>
        <TooltipContentOld>
          <p>Underline</p>
          <span className="mdt-text-[10px] mdt-opacity-60">Ctrl+U</span>
        </TooltipContentOld>
      </TooltipOld>

      <div className="mdt-mx-1 mdt-w-px mdt-bg-border" />

      <TooltipOld>
        <TooltipTriggerOld asChild>
          <Button variant="ghost" size="icon" aria-label="Insert link">
            <Icon name="link" size="sm" />
          </Button>
        </TooltipTriggerOld>
        <TooltipContentOld>
          <p>Insert Link</p>
          <span className="mdt-text-[10px] mdt-opacity-60">Ctrl+K</span>
        </TooltipContentOld>
      </TooltipOld>
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
        <TooltipOld open={open} onOpenChange={setOpen}>
          <TooltipTriggerOld asChild>
            <Button variant="outline">Controlled tooltip</Button>
          </TooltipTriggerOld>
          <TooltipContentOld>
            <p>This tooltip&apos;s state is controlled externally</p>
          </TooltipContentOld>
        </TooltipOld>

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
          TooltipOld is {open ? 'open' : 'closed'}
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
      <TooltipOld>
        <TooltipTriggerOld asChild>
          <Button variant="outline">Success</Button>
        </TooltipTriggerOld>
        <TooltipContentOld
          className="mdt-bg-success mdt-text-success-foreground"
          arrowClassName="mdt-fill-success"
        >
          <p>Success message</p>
        </TooltipContentOld>
      </TooltipOld>

      <TooltipOld>
        <TooltipTriggerOld asChild>
          <Button variant="outline">Warning</Button>
        </TooltipTriggerOld>
        <TooltipContentOld
          className="mdt-bg-warning mdt-text-warning-foreground"
          arrowClassName="mdt-fill-warning"
        >
          <p>Warning message</p>
        </TooltipContentOld>
      </TooltipOld>

      <TooltipOld>
        <TooltipTriggerOld asChild>
          <Button variant="outline">Error</Button>
        </TooltipTriggerOld>
        <TooltipContentOld
          className="mdt-bg-destructive mdt-text-destructive-foreground"
          arrowClassName="mdt-fill-destructive"
        >
          <p>Error message</p>
        </TooltipContentOld>
      </TooltipOld>

      <TooltipOld>
        <TooltipTriggerOld asChild>
          <Button variant="outline">Large</Button>
        </TooltipTriggerOld>
        <TooltipContentOld className="mdt-px-4 mdt-py-3 mdt-text-sm">
          <p>Large tooltip with more padding</p>
        </TooltipContentOld>
      </TooltipOld>
    </div>
  ),
};
