import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuFooter,
  DropdownMenuGroup,
  DropdownMenuHeader,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuList,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSearch,
  DropdownMenuSelectAll,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './DropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'A panel of things you **do**, opened from a control.',
          '',
          '**It is not a Select.** A menu is things you do; a select is a value you submit.',
          'Sort-by and filter sit between the two — you are not submitting a form, but you are',
          'choosing rather than acting — so they live here as the choosing variants rather than',
          'as three more components.',
          '',
          '| | What it is for | Announced as |',
          '| --- | --- | --- |',
          '| `DropdownMenu` | Things you **do**, and choosing that does not submit | A menu |',
          '| `Select` | A value in a **form** | A form control with a value |',
          '| `Combobox` | A form value from a long list you **type into** | A text box with suggestions |',
          '| `Command` | Search everything by name — the ⌘K palette | A search dialog |',
          '| `Popover` | Anything at all — a blank floating box | Nothing in particular |',
          '',
          '## The parts',
          '',
          'One surface with a row on it. Everything else is a slot you can leave out.',
          '',
          '- **`DropdownMenuHeader`** names the whole panel. Words **or** a search box, never both',
          '- **`DropdownMenuLabel`** names a group *inside* the list — small, uppercase, quiet',
          '- **`DropdownMenuSelectAll`** goes above a several-of-these list and nowhere else',
          '- **`DropdownMenuList`** caps the height so a long menu scrolls instead of running off',
          '  the bottom of the screen',
          '- **`DropdownMenuFooter`** holds a decision, quieter action on the left',
          '',
          'A row has two ends and they are independent: the left carries what the item *is*, the',
          'right carries what happens to it. **One trailing thing per row** — a shortcut, a count,',
          'a tick, or the arrow that promises another panel. Nothing reserves room it is not using.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ICON = (name: IconName) => <Icon name={name} size="sm" aria-hidden />;

/** The plainest form: things you do, and one of them is destructive. */
export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem icon={ICON('pencil')} shortcut={['mod', 'r']}>
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem icon={ICON('copy')} shortcut={['mod', 'd']}>
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem icon={ICON('link')}>Copy link</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={ICON('trash-2')} tone="danger">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * A row has **two ends and they are independent**. The left carries what the
 * item *is*; the right carries what happens to it.
 *
 * With a second line the trailing thing sits on the **middle of the whole row**.
 * The leading icon does not — it belongs to the label and is read as part of it.
 */
export const RowSlots: Story = {
  name: 'Both ends of a row',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Export</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Export as</DropdownMenuLabel>
        <DropdownMenuItem icon={ICON('file-text')} description="Opens in any spreadsheet">
          CSV
        </DropdownMenuItem>
        <DropdownMenuItem
          icon={ICON('file-json')}
          description="Keeps every field, including empty ones"
          shortcut={['mod', 'j']}
        >
          JSON
        </DropdownMenuItem>
        <DropdownMenuItem icon={ICON('users')} trailing="12">
          Owners
        </DropdownMenuItem>
        <DropdownMenuItem
          icon={ICON('file')}
          description="Not available above 10,000 rows"
          disabled
        >
          PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * **Sort by** — one of these is true and the others are not.
 *
 * `indicator="dot"` leads, like a radio button. Right for a small set of named
 * choices where the dots read as a column waiting to be filled.
 */
export const SortBy: Story = {
  name: 'Sort by — one choice',
  render: function Render() {
    const [sort, setSort] = useState('recent');
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Sort</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuHeader title="Sort by" />
          <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
            <DropdownMenuRadioItem value="recent" indicator="dot">
              Most recent
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="oldest" indicator="dot">
              Oldest first
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="az" indicator="dot">
              Name A–Z
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="severity" indicator="dot">
              Severity
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

const SEVERITIES = ['Critical', 'High', 'Medium', 'Low', 'Informational'];

/**
 * **Filter** — several of these, and it waits for you.
 *
 * The band above the list is what makes it a filter: press the box to take
 * everything, press it again to drop everything, and the in-between state is a
 * **dash rather than a tick** because a tick would claim everything is chosen.
 *
 * `Clear` empties it. `Reset` puts back what was chosen when the menu opened.
 * They are not the same action, which is why both are here.
 */
export const Filter: Story = {
  name: 'Filter — several, with select all',
  render: function Render() {
    const opened = useMemo(() => ['Critical', 'High'], []);
    const [picked, setPicked] = useState<string[]>(opened);

    const toggle = (name: string) => {
      setPicked((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Severity ({picked.length})</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mdt-w-72">
          <DropdownMenuHeader title="Choose severity" />
          <DropdownMenuSelectAll
            selected={picked.length}
            total={SEVERITIES.length}
            onSelectAll={() => {
              setPicked([...SEVERITIES]);
            }}
            onClear={() => {
              setPicked([]);
            }}
          />
          <DropdownMenuList>
            {SEVERITIES.map((name) => (
              <DropdownMenuCheckboxItem
                key={name}
                checked={picked.includes(name)}
                // Stays open: you are picking several, not one.
                onSelect={(event) => {
                  event.preventDefault();
                }}
                onCheckedChange={() => {
                  toggle(name);
                }}
              >
                {name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuList>
          <DropdownMenuFooter>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setPicked(opened);
              }}
            >
              Reset
            </Button>
            <Button size="sm">Apply</Button>
          </DropdownMenuFooter>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

const PEOPLE = [
  'Aarav Shah',
  'Bhavna Rao',
  'Chetan Iyer',
  'Divya Menon',
  'Farhan Qureshi',
  'Gauri Deshpande',
  'Harsh Vora',
  'Ishita Nair',
  'Jatin Bhatt',
  'Kavya Pillai',
  'Manav Trivedi',
  'Nisha Kulkarni',
];

/**
 * **A long list** — search, and a height it will not grow past.
 *
 * Search is worth reaching for past about eight rows. It sits in the header,
 * outside the scrolling part, so it never leaves while the names move under it.
 *
 * The tick **trails** here. On a list of names a leading column would push
 * every unchosen row to the right of nothing.
 */
export const LongList: Story = {
  name: 'A long list — search and scroll',
  render: function Render() {
    const [query, setQuery] = useState('');
    const [owner, setOwner] = useState('Divya Menon');
    const shown = PEOPLE.filter((n) => n.toLowerCase().includes(query.toLowerCase()));

    return (
      <DropdownMenu
        onOpenChange={(open) => {
          if (!open) setQuery('');
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{owner}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mdt-w-72">
          <DropdownMenuHeader>
            <DropdownMenuSearch
              placeholder="Search people"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
          </DropdownMenuHeader>
          <DropdownMenuList>
            {shown.length > 0 ? (
              <DropdownMenuRadioGroup value={owner} onValueChange={setOwner}>
                {shown.map((name) => (
                  <DropdownMenuRadioItem key={name} value={name}>
                    {name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            ) : (
              <p className="mdt-px-3 mdt-py-3.5 mdt-text-sm mdt-text-muted-foreground">
                No one matches “{query}”.
              </p>
            )}
          </DropdownMenuList>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * The header names the whole panel and can carry a live second line — a count,
 * or what this applies to. **Words or a search box, never both.**
 */
export const WithHeader: Story = {
  name: 'A panel header',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Bulk actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mdt-w-72">
        <DropdownMenuHeader title="Bulk actions" description="20 of 248 selected" />
        <DropdownMenuItem icon={ICON('refresh-cw')} shortcut={['mod', 'r']}>
          Refresh profiles
        </DropdownMenuItem>
        <DropdownMenuItem icon={ICON('zap')} description="Up to 20 at a time">
          Unlock
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={ICON('trash-2')} tone="danger">
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * A row that opens another panel beside it.
 *
 * **One level deep.** A menu inside a menu inside a menu is a page, not a menu.
 * Never nest a checkbox list — you would lose sight of what you had ticked.
 */
export const Nested: Story = {
  name: 'A nested menu',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Bulk actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mdt-w-72">
        <DropdownMenuHeader title="Bulk actions" description="20 of 248 selected" />
        <DropdownMenuItem icon={ICON('refresh-cw')} shortcut={['mod', 'r']}>
          Refresh profiles
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger icon={ICON('folder')}>Add to a plan</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Autumn launch</DropdownMenuItem>
            <DropdownMenuItem>Always-on</DropdownMenuItem>
            <DropdownMenuItem>Q4 retention</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={ICON('plus')}>New plan</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem icon={ICON('zap')}>Unlock</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={ICON('trash-2')} tone="danger">
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * `DropdownMenuLabel` names a group **inside** the list. Small, uppercase and
 * quiet — it used to be 14px semibold in the same ink as a row, so a heading
 * read as something you could press.
 */
export const Grouped: Story = {
  name: 'Groups inside the list',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">More</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Navigation</DropdownMenuLabel>
          <DropdownMenuItem icon={ICON('chevron-left')}>Back</DropdownMenuItem>
          <DropdownMenuItem icon={ICON('chevron-right')}>Forward</DropdownMenuItem>
          <DropdownMenuItem icon={ICON('rotate-cw')} shortcut={['mod', 'r']}>
            Reload
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Tools</DropdownMenuLabel>
          <DropdownMenuItem icon={ICON('code')}>Developer tools</DropdownMenuItem>
          <DropdownMenuItem icon={ICON('activity')}>Task manager</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Help</DropdownMenuLabel>
          <DropdownMenuItem icon={ICON('help-circle')}>Documentation</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * `check` trails, `dot` leads. **Pick one and hold it across a product** — a
 * sort menu and a filter menu that disagree about which side the mark lives on
 * read as two different components.
 */
export const IndicatorSides: Story = {
  name: 'Which side the mark sits on',
  render: function Render() {
    const [a, setA] = useState('recent');
    const [b, setB] = useState('recent');
    return (
      <div className="mdt-flex mdt-gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">check — trails</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={a} onValueChange={setA}>
              <DropdownMenuRadioItem value="recent">Most recent</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest">Oldest first</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="az">Name A–Z</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">dot — leads</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={b} onValueChange={setB}>
              <DropdownMenuRadioItem value="recent" indicator="dot">
                Most recent
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest" indicator="dot">
                Oldest first
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="az" indicator="dot">
                Name A–Z
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};
