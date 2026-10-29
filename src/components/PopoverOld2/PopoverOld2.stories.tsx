import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { PopoverOld2, PopoverOld2Content, PopoverOld2Trigger } from './PopoverOld2';

const meta: Meta<typeof PopoverOld2> = {
  title: 'Deprecated 2/Popover Old',
  component: PopoverOld2,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    status: {
      type: 'deprecated',
      since: '2.3.0',
      deprecation: {
        deprecatedSince: '2.3.0',
        removalIn: 'to be set by Nirav',
        replacement: 'Popover',
        message:
          'The Popover as it was before 29 October 2026. Deprecated 2026-10-29 when Pranjal ruled the new one in (one Popover with three variants: empty card, action menu, quick filter); kept for side-by-side review; Nirav sets the removal version.',
      },
    },
    docs: {
      description: {
        component: [
          '## ⚠️ Deprecated — use `Popover`',
          '',
          'The Popover as it was before 29 October 2026 - the overlay surface only. Deprecated 2026-10-29 when',
          'Pranjal ruled the new one in: one `Popover` with three variants, the empty card (this surface, unchanged),',
          'the action menu and the quick filter. Kept for side-by-side review; Nirav sets the removal version.',
          '',
          '**Do not start anything new on it.**',
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
    <PopoverOld2>
      <PopoverOld2Trigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverOld2Trigger>
      <PopoverOld2Content>
        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <h4 className="mdt-font-medium mdt-leading-none">Dimensions</h4>
          <p className="mdt-text-sm mdt-text-muted-foreground">Set the dimensions for the layer.</p>
        </div>
      </PopoverOld2Content>
    </PopoverOld2>
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
      <PopoverOld2 defaultOpen>
        <PopoverOld2Trigger asChild>
          <Button variant="outline">The popover</Button>
        </PopoverOld2Trigger>
        <PopoverOld2Content align="start" sideOffset={8}>
          <div className="mdt-flex mdt-flex-col mdt-gap-2">
            <h4 className="mdt-m-0 mdt-text-sm mdt-font-medium">The overlay surface</h4>
            <p className="mdt-m-0 mdt-text-sm mdt-text-muted-foreground">
              --mdt-popover: white in light, neutral-150 in dark, the hairline visible on it.
            </p>
          </div>
        </PopoverOld2Content>
      </PopoverOld2>
    </div>
  ),
};

/**
 * PopoverOld2 with form inputs.
 */
export const WithForm: Story = {
  render: function WithFormComponent() {
    const [width, setWidth] = useState('100%');
    const [maxWidth, setMaxWidth] = useState('300px');
    const [height, setHeight] = useState('25px');
    const [maxHeight, setMaxHeight] = useState('none');

    return (
      <PopoverOld2>
        <PopoverOld2Trigger asChild>
          <Button variant="outline">Open dimensions</Button>
        </PopoverOld2Trigger>
        <PopoverOld2Content className="mdt-w-80">
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
        </PopoverOld2Content>
      </PopoverOld2>
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
        <PopoverOld2 open={open} onOpenChange={setOpen}>
          <PopoverOld2Trigger asChild>
            <Button variant="outline">Toggle popover</Button>
          </PopoverOld2Trigger>
          <PopoverOld2Content>
            <div className="mdt-flex mdt-flex-col mdt-gap-2">
              <h4 className="mdt-font-medium mdt-leading-none">Controlled PopoverOld2</h4>
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
          </PopoverOld2Content>
        </PopoverOld2>
        <p className="mdt-text-sm mdt-text-muted-foreground">
          PopoverOld2 is {open ? 'open' : 'closed'}
        </p>
      </div>
    );
  },
};

/**
 * PopoverOld2 with different alignments.
 */
export const Alignment: Story = {
  render: () => (
    <div className="mdt-flex mdt-gap-4">
      <PopoverOld2>
        <PopoverOld2Trigger asChild>
          <Button variant="outline">Start</Button>
        </PopoverOld2Trigger>
        <PopoverOld2Content align="start">
          <p className="mdt-text-sm">Aligned to start</p>
        </PopoverOld2Content>
      </PopoverOld2>

      <PopoverOld2>
        <PopoverOld2Trigger asChild>
          <Button variant="outline">Center</Button>
        </PopoverOld2Trigger>
        <PopoverOld2Content align="center">
          <p className="mdt-text-sm">Aligned to center</p>
        </PopoverOld2Content>
      </PopoverOld2>

      <PopoverOld2>
        <PopoverOld2Trigger asChild>
          <Button variant="outline">End</Button>
        </PopoverOld2Trigger>
        <PopoverOld2Content align="end">
          <p className="mdt-text-sm">Aligned to end</p>
        </PopoverOld2Content>
      </PopoverOld2>
    </div>
  ),
};

/**
 * PopoverOld2 with custom side offset.
 */
export const CustomSideOffset: Story = {
  render: () => (
    <div className="mdt-flex mdt-gap-4">
      <PopoverOld2>
        <PopoverOld2Trigger asChild>
          <Button variant="outline">Offset 0</Button>
        </PopoverOld2Trigger>
        <PopoverOld2Content sideOffset={0}>
          <p className="mdt-text-sm">No offset from trigger</p>
        </PopoverOld2Content>
      </PopoverOld2>

      <PopoverOld2>
        <PopoverOld2Trigger asChild>
          <Button variant="outline">Offset 20</Button>
        </PopoverOld2Trigger>
        <PopoverOld2Content sideOffset={20}>
          <p className="mdt-text-sm">20px offset from trigger</p>
        </PopoverOld2Content>
      </PopoverOld2>
    </div>
  ),
};

/**
 * PopoverOld2 with custom width.
 */
export const CustomWidth: Story = {
  render: () => (
    <PopoverOld2>
      <PopoverOld2Trigger asChild>
        <Button variant="outline">Open wide popover</Button>
      </PopoverOld2Trigger>
      <PopoverOld2Content className="mdt-w-96">
        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <h4 className="mdt-font-medium mdt-leading-none">Custom Width</h4>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            This popover has a custom width of 24rem (384px). You can customize the width by passing
            a className to PopoverOld2Content.
          </p>
        </div>
      </PopoverOld2Content>
    </PopoverOld2>
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
      <PopoverOld2>
        <PopoverOld2Trigger asChild>
          <Button variant="outline">Settings</Button>
        </PopoverOld2Trigger>
        <PopoverOld2Content className="mdt-w-80">
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
        </PopoverOld2Content>
      </PopoverOld2>
    );
  },
};

/**
 * Example: User profile popover.
 */
export const ProfileExample: Story = {
  render: () => (
    <PopoverOld2>
      <PopoverOld2Trigger asChild>
        <Button variant="outline">View Profile</Button>
      </PopoverOld2Trigger>
      <PopoverOld2Content className="mdt-w-80">
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
      </PopoverOld2Content>
    </PopoverOld2>
  ),
};
