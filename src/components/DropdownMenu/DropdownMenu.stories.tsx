import type { Meta, StoryObj } from '@storybook/react-vite';
import { forwardRef, useState, type ComponentPropsWithoutRef } from 'react';
import { userEvent, within } from 'storybook/test';
import { Icon } from '../Icon';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './DropdownMenu';

/**
 * THE ONE DROPDOWN. The console's Users row menu, ruled 2026-09-16 ("the drop down which is in users is
 * good - proper text color, text sizes, icon sizes and everything. Use that drop down everywhere") and
 * carried at the root of this part since 2026-09-22. The box: corners 10, 6 inside, a neutral-30 hairline,
 * the lg shadow, at least 224 wide for an action menu (a longer item widens it). An item: 34 tall, 0 10 inside, corners 7, 13/500 in the
 * reading ink, 10 to its 16 glyph; neutral-10 under the pointer and the text keeps its colour. A
 * destructive item (`variant="destructive"`) is red-60 with a red glyph and takes the danger wash under
 * the pointer - it never goes dark.
 */
const meta: Meta<typeof DropdownMenu> = {
  title: 'New Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Users row menu, at the root: a 10-cornered box with 6 inside, items 34 tall at 13/500 with corners 7, a destructive item that stays red under its wash. Every action menu, the Sort menu, the Columns panel and the quick-filter menu are this one part.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/* Every frame opens its menu with a real click after render. A menu that is open on its very first render is
 * placed off screen by the popper (translate -200%) until something moves - a reader, and the parity check,
 * must find it in place. */
const openTheMenu = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  await userEvent.click(within(canvasElement).getByRole('button', { name: 'Row actions' }));
};

/* The console's row-action door: a 28 box, the vertical ellipsis at 16, the faint ink, neutral-20 under the
 * pointer. It forwards its ref and takes the trigger's props, or the Radix trigger (asChild) cannot open the
 * menu from it. */
const RowActionsButton = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(
  function RowActionsButton(props, ref) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label="Row actions"
        {...props}
        className="mdt-inline-flex mdt-h-7 mdt-w-7 mdt-items-center mdt-justify-center mdt-rounded-lg mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-faint hover:mdt-bg-neutral-20 hover:mdt-text-neutral-90 data-[state=open]:mdt-bg-neutral-20 data-[state=open]:mdt-text-neutral-90"
      >
        <Icon name="more-vertical" size={16} />
      </button>
    );
  }
);

/**
 * The row menu as the Users table draws it: Edit details · Disable user, a hairline, then Delete user in red.
 * Every ⋯ action menu follows it (Pranjal, 2026-10-14 and 2026-10-27): an icon on every item, never a "…" on a
 * label, the destructive item last and red after a divider, and the menu at least 224 wide - `mdt-min-w-56`, a
 * floor and not a width, so a longer item widens it.
 */
export const TheMenu: Story = {
  play: openTheMenu,
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <RowActionsButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mdt-min-w-56">
        <DropdownMenuItem>
          <Icon name="pencil" size={16} />
          Edit details
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="toggle-left" size={16} />
          Disable user
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Icon name="trash-2" size={16} />
          Delete user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * A destructive item: red-60 text and glyph at rest; under the pointer the danger wash, and the text and
 * glyph STAY red. Hover the last rows.
 */
export const Destructive: Story = {
  play: openTheMenu,
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <RowActionsButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mdt-min-w-56">
        <DropdownMenuItem>
          <Icon name="pencil" size={16} />
          Edit team details
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Icon name="trash-2" size={16} />
          Delete team
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <Icon name="x-circle" size={16} />
          Revoke access
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * 224 is a floor, not a width: an item longer than the floor widens the menu instead of being cut off or touching
 * its edge (Pranjal, 2026-10-09 and 2026-10-27, on a fleet row menu: "increase the width by a little bit").
 */
export const ALongItemWidensIt: Story = {
  play: openTheMenu,
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <RowActionsButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mdt-min-w-56">
        <DropdownMenuItem>
          <Icon name="activity" size={16} />
          Diagnose
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="power" size={16} />
          Restart or stop collector
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="pause-circle" size={16} />
          Hold work on every module it runs
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Icon name="trash-2" size={16} />
          Retire collector
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * The Sort menu's shape: a SORT BY heading at 11/600 in the muted grey, one row per field with the active
 * one carrying its arrow, a hairline, and Clear sort in the muted grey. 220 wide.
 */
export const WithAHeading: Story = {
  play: openTheMenu,
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <RowActionsButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mdt-w-[220px]">
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuItem>
          Name
          <span className="mdt-ml-auto mdt-text-sm" aria-label="ascending">
            {'↑'}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem className="mdt-text-neutral-90">Status</DropdownMenuItem>
        <DropdownMenuItem className="mdt-text-neutral-90">Last active</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="mdt-text-neutral-50">Clear sort</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * Several at once. A ticked row sits on the pale blue-10 ground with its tick on the RIGHT in the reading ink; the
 * row under the pointer takes only the grey ground and no tick (Pranjal, 2026-10-21: every selection looks the same).
 * The quick-filter menu swaps the tick for a checkbox square and keeps the pale ground.
 */
export const WithCheckboxes: Story = {
  play: openTheMenu,
  render: function WithCheckboxesStory() {
    const [picked, setPicked] = useState<string[]>(['Active']);
    const toggle = (v: string) => {
      setPicked((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));
    };
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <RowActionsButton />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="mdt-w-48">
          {['Active', 'Inactive', 'Invited', 'Suspended'].map((v) => (
            <DropdownMenuCheckboxItem
              key={v}
              checked={picked.includes(v)}
              onCheckedChange={() => {
                toggle(v);
              }}
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              {v}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * One of several, as a module switcher picks one: the chosen row looks exactly like a ticked checkbox row - the pale
 * ground, the tick on the right (Pranjal, 2026-10-21; a dot on the left until then).
 */
export const WithRadioItems: Story = {
  play: openTheMenu,
  render: function WithRadioItemsStory() {
    const [module, setModule] = useState('Users');
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <RowActionsButton />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="mdt-w-48">
          <DropdownMenuLabel>Switch to</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={module} onValueChange={setModule}>
            {['Users', 'Teams', 'Roles', 'Access profiles'].map((v) => (
              <DropdownMenuRadioItem key={v} value={v}>
                {v}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * A disabled row: half opacity, no pointer.
 */
export const Disabled: Story = {
  play: openTheMenu,
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <RowActionsButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mdt-min-w-56">
        <DropdownMenuItem disabled>
          <Icon name="lock" size={16} />
          Read-only
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="copy" size={16} />
          Duplicate
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
