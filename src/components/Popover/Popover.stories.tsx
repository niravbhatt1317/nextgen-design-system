import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'New Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'Rich content that floats over the page from a trigger, built on Radix Popover. The part that owns',
          "**the overlay surface**: its ground is `--mdt-popover`, the colour map's `elevation.surface.overlay`",
          "- white in light, neutral-150 in dark (the storybook's neutral-150; Pranjal, 2026-09-25/26) - a step",
          'DARKER than a card, so a menu reads as its own thing on any surface, with the hairline visible on it.',
          'The ink is `--mdt-popover-foreground`. It carries no private dark rule: the theme comes from the tokens.',
          '',
          'The same frame is exported as `popoverSurface` for the other parts that float - the row menu, a',
          'select list, the date panel, the filter panel - so they share one ground and one edge.',
          '',
          'Replaces the earlier Popover (now `PopoverOld`, under Deprecated) as of 26 September 2026.',
        ].join('\n'),
      },
    },
    controls: {
      exclude: ['class'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default popover example.
 */
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <h4 className="mdt-font-medium mdt-leading-none">Dimensions</h4>
          <p className="mdt-text-sm mdt-text-muted-foreground">Set the dimensions for the layer.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * The surface itself: the popover's ground beside the page and a card, so the step reads in both themes. In dark the
 * card is the page colour with an edge (cards are flat), and the popover steps DOWN to neutral-150 with the hairline on it.
 */
export const TheSurface: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-start mdt-gap-6">
      <div className="mdt-flex mdt-w-56 mdt-flex-col mdt-gap-2 mdt-rounded-md mdt-border mdt-border-neutral-30 mdt-bg-card mdt-p-4">
        <h4 className="mdt-m-0 mdt-text-sm mdt-font-medium">A card</h4>
        <p className="mdt-m-0 mdt-text-sm mdt-text-muted-foreground">--mdt-card, with its edge.</p>
      </div>
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="outline">The popover</Button>
        </PopoverTrigger>
        <PopoverContent align="start" sideOffset={8}>
          <div className="mdt-flex mdt-flex-col mdt-gap-2">
            <h4 className="mdt-m-0 mdt-text-sm mdt-font-medium">The overlay surface</h4>
            <p className="mdt-m-0 mdt-text-sm mdt-text-muted-foreground">
              --mdt-popover: white in light, neutral-150 in dark, the hairline visible on it.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/**
 * Popover with form inputs.
 */
export const WithForm: Story = {
  render: function WithFormComponent() {
    const [width, setWidth] = useState('100%');
    const [maxWidth, setMaxWidth] = useState('300px');
    const [height, setHeight] = useState('25px');
    const [maxHeight, setMaxHeight] = useState('none');

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open dimensions</Button>
        </PopoverTrigger>
        <PopoverContent className="mdt-w-80">
          <div className="mdt-flex mdt-flex-col mdt-gap-4">
            <div className="mdt-space-y-2">
              <h4 className="mdt-font-medium mdt-leading-none">Dimensions</h4>
              <p className="mdt-text-sm mdt-text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
            <div className="mdt-flex mdt-flex-col mdt-gap-3">
              <div className="mdt-flex mdt-flex-col mdt-gap-2">
                <label htmlFor="width" className="mdt-text-sm mdt-font-medium">
                  Width
                </label>
                <Input
                  id="width"
                  value={width}
                  onChange={(e) => {
                    setWidth(e.target.value);
                  }}
                />
              </div>
              <div className="mdt-flex mdt-flex-col mdt-gap-2">
                <label htmlFor="maxWidth" className="mdt-text-sm mdt-font-medium">
                  Max width
                </label>
                <Input
                  id="maxWidth"
                  value={maxWidth}
                  onChange={(e) => {
                    setMaxWidth(e.target.value);
                  }}
                />
              </div>
              <div className="mdt-flex mdt-flex-col mdt-gap-2">
                <label htmlFor="height" className="mdt-text-sm mdt-font-medium">
                  Height
                </label>
                <Input
                  id="height"
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value);
                  }}
                />
              </div>
              <div className="mdt-flex mdt-flex-col mdt-gap-2">
                <label htmlFor="maxHeight" className="mdt-text-sm mdt-font-medium">
                  Max height
                </label>
                <Input
                  id="maxHeight"
                  value={maxHeight}
                  onChange={(e) => {
                    setMaxHeight(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

/**
 * Controlled popover - you can control the open state.
 */
export const Controlled: Story = {
  render: function ControlledComponent() {
    const [open, setOpen] = useState(false);

    return (
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">Toggle popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="mdt-flex mdt-flex-col mdt-gap-2">
              <h4 className="mdt-font-medium mdt-leading-none">Controlled Popover</h4>
              <p className="mdt-text-sm mdt-text-muted-foreground">
                This popover&apos;s open state is controlled externally.
              </p>
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
          </PopoverContent>
        </Popover>
        <p className="mdt-text-sm mdt-text-muted-foreground">
          Popover is {open ? 'open' : 'closed'}
        </p>
      </div>
    );
  },
};

/**
 * Popover with different alignments.
 */
export const Alignment: Story = {
  render: () => (
    <div className="mdt-flex mdt-gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Start</Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <p className="mdt-text-sm">Aligned to start</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Center</Button>
        </PopoverTrigger>
        <PopoverContent align="center">
          <p className="mdt-text-sm">Aligned to center</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">End</Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <p className="mdt-text-sm">Aligned to end</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/**
 * Popover with custom side offset.
 */
export const CustomSideOffset: Story = {
  render: () => (
    <div className="mdt-flex mdt-gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Offset 0</Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={0}>
          <p className="mdt-text-sm">No offset from trigger</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Offset 20</Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={20}>
          <p className="mdt-text-sm">20px offset from trigger</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/**
 * Popover with custom width.
 */
export const CustomWidth: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open wide popover</Button>
      </PopoverTrigger>
      <PopoverContent className="mdt-w-96">
        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <h4 className="mdt-font-medium mdt-leading-none">Custom Width</h4>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            This popover has a custom width of 24rem (384px). You can customize the width by passing
            a className to PopoverContent.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Example: Settings popover with actions.
 */
export const SettingsExample: Story = {
  render: function SettingsExampleComponent() {
    const [notifications, setNotifications] = useState(true);
    const [emails, setEmails] = useState(false);

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Settings</Button>
        </PopoverTrigger>
        <PopoverContent className="mdt-w-80">
          <div className="mdt-flex mdt-flex-col mdt-gap-4">
            <div className="mdt-space-y-2">
              <h4 className="mdt-font-medium mdt-leading-none">Preferences</h4>
              <p className="mdt-text-sm mdt-text-muted-foreground">
                Manage your notification settings.
              </p>
            </div>
            <div className="mdt-flex mdt-flex-col mdt-gap-3">
              <div className="mdt-flex mdt-items-center mdt-justify-between">
                <label
                  htmlFor="notifications"
                  className="mdt-cursor-pointer mdt-text-sm mdt-font-medium"
                >
                  Push Notifications
                </label>
                <input
                  type="checkbox"
                  id="notifications"
                  checked={notifications}
                  onChange={(e) => {
                    setNotifications(e.target.checked);
                  }}
                  className="mdt-h-4 mdt-w-4 mdt-cursor-pointer"
                />
              </div>
              <div className="mdt-flex mdt-items-center mdt-justify-between">
                <label htmlFor="emails" className="mdt-cursor-pointer mdt-text-sm mdt-font-medium">
                  Email Notifications
                </label>
                <input
                  type="checkbox"
                  id="emails"
                  checked={emails}
                  onChange={(e) => {
                    setEmails(e.target.checked);
                  }}
                  className="mdt-h-4 mdt-w-4 mdt-cursor-pointer"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

/**
 * Example: User profile popover.
 */
export const ProfileExample: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">View Profile</Button>
      </PopoverTrigger>
      <PopoverContent className="mdt-w-80">
        <div className="mdt-flex mdt-flex-col mdt-gap-4">
          <div className="mdt-flex mdt-items-center mdt-gap-4">
            <div className="mdt-flex mdt-h-12 mdt-w-12 mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-primary mdt-text-primary-foreground">
              JD
            </div>
            <div className="mdt-flex mdt-flex-col">
              <p className="mdt-font-medium">John Doe</p>
              <p className="mdt-text-sm mdt-text-muted-foreground">john.doe@example.com</p>
            </div>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-gap-2">
            <Button variant="outline" size="sm">
              View Profile
            </Button>
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
            <Button variant="outline" size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
