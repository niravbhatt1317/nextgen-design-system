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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './DropdownMenu';

/**
 * THE ONE DROPDOWN. The console's Users row menu, ruled 2026-09-16 ("the drop down which is in users is
 * good - proper text color, text sizes, icon sizes and everything. Use that drop down everywhere") and
 * carried at the root of this part since 2026-09-22. The box: corners 10, 6 inside, a neutral-30 hairline,
 * the lg shadow, 192 wide for an action menu. An item: 34 tall, 0 10 inside, corners 7, 13/500 in the
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
 * The row menu as the Users table draws it: Edit details · Disable user · Delete user, 192 wide.
 */
export const TheMenu: Story = {
  play: openTheMenu,
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <RowActionsButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mdt-w-48">
        <DropdownMenuItem>
          <Icon name="pencil" size={16} />
          Edit details
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="toggle-left" size={16} />
          Disable user
        </DropdownMenuItem>
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
      <DropdownMenuContent align="start" className="mdt-w-48">
        <DropdownMenuItem>
          <Icon name="pencil" size={16} />
          Edit team details
        </DropdownMenuItem>
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
 * The quick-filter menu's shape: a checkbox per row, several at once.
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
 * A disabled row: half opacity, no pointer.
 */
export const Disabled: Story = {
  play: openTheMenu,
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <RowActionsButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mdt-w-48">
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
