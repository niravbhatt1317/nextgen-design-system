import type { Meta, StoryObj } from '@storybook/react-vite';
import { forwardRef, useState, type ComponentPropsWithoutRef } from 'react';
import { userEvent, within } from 'storybook/test';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Popover, PopoverActionMenu, PopoverContent, PopoverQuickFilter, PopoverTrigger } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'New Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'One popover, three variants (Pranjal, 2026-10-29). Pick the variant on `<Popover variant>`:',
          '',
          '- **`card`** (the default) - **the empty card**: the overlay surface and nothing else, for anything a page',
          '  puts in it. `<PopoverContent>` inside. The Popover as it was, unchanged.',
          '- **`action-menu`** - **the action menu** (a row\'s or a header\'s ⋯): `<PopoverActionMenu groups danger />`.',
          '  Its rules are built in: an icon on every item; a divider between groups (any number, or none); at most',
          '  **one red action**, always **last**, always **under a divider**; at least 224 wide (a longer item widens it).',
          '- **`quick-filter`** - **the quick filter**, the table toolbar\'s tick menu:',
          '  `<PopoverQuickFilter heading options value onValueChange />` - the heading naming what it filters, an',
          '  optional search, a checkbox per value.',
          '',
          'The two menus are menus underneath (the DropdownMenu parts), so they keep the menu\'s keys - arrows, type to',
          'jump, Escape back to the trigger - and read as a menu to a screen reader.',
          '',
          "The surface: `--mdt-popover`, the colour map's `elevation.surface.overlay` - white in light, neutral-150 in",
          'dark, a step DARKER than a card, with the hairline visible on it. Exported as `popoverSurface` for the other',
          'parts that float.',
          '',
          'Replaces the Popover before it (now `PopoverOld2`, under Deprecated 2) as of 29 October 2026.',
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

/* the ⋯ trigger as the table's row draws it; it takes the trigger's props and ref, or the menu never hears the click */
const MoreButton = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>((props, ref) => (
  <button
    ref={ref}
    type="button"
    className="mdt-inline-flex mdt-h-6 mdt-w-6 mdt-items-center mdt-justify-center mdt-rounded-lg mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-faint hover:mdt-bg-neutral-20 hover:mdt-text-neutral-90 data-[state=open]:mdt-bg-neutral-20 data-[state=open]:mdt-text-neutral-90"
    aria-label="Row actions"
    {...props}
  >
    <Icon name="more-horizontal" size={16} />
  </button>
));
MoreButton.displayName = 'MoreButton';

const noop = () => undefined;

/* a menu open on its first render is placed off screen by the popper, so the menu stories open with a real click a
   moment after render, as the DropdownMenu stories do */
const openWith =
  (name: string) =>
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await new Promise((r) => setTimeout(r, 150));
    await userEvent.click(within(canvasElement).getByRole('button', { name }));
  };

/**
 * The empty card: the overlay surface, 16 inside, 288 wide unless told otherwise - anything goes in it.
 */
export const EmptyCard: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <h4 className="mdt-m-0 mdt-text-sm mdt-font-medium">Dimensions</h4>
          <p className="mdt-m-0 mdt-text-sm mdt-text-muted-foreground">Set the dimensions for the layer.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * The surface itself: the popover's ground beside a card, so the step reads in both themes. In dark the card is the
 * page colour with an edge (cards are flat), and the popover steps DOWN to neutral-150 with the hairline on it.
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
 * The action menu as the Users table's row draws it: Edit details · Disable user, then the one red action - Delete user
 * - last, under its divider.
 */
export const ActionMenu: Story = {
  play: openWith('Row actions'),
  render: () => (
    <Popover variant="action-menu">
      <PopoverTrigger asChild>
        <MoreButton />
      </PopoverTrigger>
      <PopoverActionMenu
        groups={[
          [
            { label: 'Edit details', icon: <Icon name="pencil" />, onSelect: noop },
            { label: 'Disable user', icon: <Icon name="user-x" />, onSelect: noop },
          ],
        ]}
        danger={{ label: 'Delete user', icon: <Icon name="trash-2" />, onSelect: noop }}
      />
    </Popover>
  ),
};

/**
 * More than one divider: each group is split from the next where the page wants it. The red action's divider is the
 * one that is never left out.
 */
export const ActionMenuGroups: Story = {
  play: openWith('Row actions'),
  render: () => (
    <Popover variant="action-menu">
      <PopoverTrigger asChild>
        <MoreButton />
      </PopoverTrigger>
      <PopoverActionMenu
        groups={[
          [
            { label: 'Edit details', icon: <Icon name="pencil" />, onSelect: noop },
            { label: 'Duplicate', icon: <Icon name="copy" />, onSelect: noop },
          ],
          [
            { label: 'Export as CSV', icon: <Icon name="download" />, onSelect: noop },
            { label: 'Copy link', icon: <Icon name="link" />, onSelect: noop },
          ],
        ]}
        danger={{ label: 'Delete team', icon: <Icon name="trash-2" />, onSelect: noop }}
      />
    </Popover>
  ),
};

/**
 * No red action: no divider is owed - one group draws none.
 */
export const ActionMenuNoDanger: Story = {
  play: openWith('Row actions'),
  render: () => (
    <Popover variant="action-menu">
      <PopoverTrigger asChild>
        <MoreButton />
      </PopoverTrigger>
      <PopoverActionMenu
        groups={[
          [
            { label: 'Edit details', icon: <Icon name="pencil" />, onSelect: noop },
            { label: 'Resend invitation', icon: <Icon name="mail" />, onSelect: noop },
            { label: 'Copy link', icon: <Icon name="link" />, onSelect: noop, disabled: true },
          ],
        ]}
      />
    </Popover>
  ),
};

const STATUS = [
  { value: 'active', label: 'Active' },
  { value: 'invited', label: 'Invited' },
  { value: 'disabled', label: 'Disabled' },
  { value: 'locked', label: 'Locked' },
];

/**
 * The quick filter as the table toolbar draws it: the heading naming what it filters, a checkbox per value, several at
 * once - a tick does not close it.
 */
export const QuickFilter: Story = {
  play: openWith('Status'),
  render: function QuickFilterStory() {
    const [value, setValue] = useState<string[]>(['active']);
    return (
      <Popover variant="quick-filter">
        <PopoverTrigger asChild>
          <Button variant="outline" leftIcon={<Icon name="check-circle" />}>
            Status
          </Button>
        </PopoverTrigger>
        <PopoverQuickFilter heading="Filter by status" options={STATUS} value={value} onValueChange={setValue} />
      </Popover>
    );
  },
};

const ORGS = [
  'Acme Corp',
  'Finserve Bank',
  'Helios Energy',
  'Lighthouse Health',
  'Northwind Retail',
  'Orbit Logistics',
  'Summit Insurance',
].map((name) => ({ value: name.toLowerCase().replace(/\s+/g, '-'), label: name }));

/**
 * With a search over the values, focused on open (a long list - organizations). Keys typed in the box stay in it.
 */
export const QuickFilterSearchable: Story = {
  play: openWith('Organization'),
  render: function QuickFilterSearchableStory() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <Popover variant="quick-filter">
        <PopoverTrigger asChild>
          <Button variant="outline" leftIcon={<Icon name="building-2" />}>
            Organization
          </Button>
        </PopoverTrigger>
        <PopoverQuickFilter
          heading="Filter by organization"
          options={ORGS}
          value={value}
          onValueChange={setValue}
          searchable
        />
      </Popover>
    );
  },
};
