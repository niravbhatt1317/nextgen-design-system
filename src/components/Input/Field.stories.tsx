import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DateInput } from '../DateInput';
import { Icon } from '../Icon';
import { NumberInput } from '../NumberInput';
import { Select } from '../Select';
import { Textarea } from '../Textarea';
import { Input } from './Input';

/**
 * THE FIELD - one field, seven kinds, its states (Pranjal, 2026-09-17, from the
 * mock "Input fields"; the date field joined 2026-09-22). 32 high, corners 8,
 * the text 13 in neutral-90, the placeholder in neutral-70, a neutral-30
 * border. Under the pointer the border turns to the primary colour; focused,
 * the same border with a soft 3-px halo of it. Disabled sits on neutral-10 in
 * the placeholder colour. Held is a disabled field something else owns: the
 * lock inside at the right, 14 like the search glyph, 12 from the edge, the
 * value truncating before it, the lock in place of the chevron, the stepper or
 * the calendar glyph. An error keeps the danger border and turns the halo red.
 * The date field is the same box as a button, the 16 calendar glyph at the
 * right, 12 from the edge; it opens the calendar below and shows "22 Oct 2026".
 * Hover and focus are live here - move the pointer over a field, click into it.
 */
const meta = {
  title: 'Foundation/Field',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'One field, seven kinds, five resting states. Hover and focus are live: move the pointer over a field and click into it. Held is a disabled field something else owns - the lock sits inside at the right (14, 12 from the edge) and the value truncates before it. The search keeps 12 to its glyph, 6 to the text, 12 at the right. The number field draws its own stepper. The multi-select shows the first pick as a pill and folds the rest into a +N badge; a long first pick truncates. The date field is the same box as a button with the 16 calendar glyph at the right, 12 from the edge; it opens the calendar below, keeps the halo while open, and shows the day as "22 Oct 2026" - held, the lock takes the glyph\'s place.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const DAYS = [
  { value: '7', label: '7 days' },
  { value: '14', label: '14 days' },
  { value: '30', label: '30 days' },
  { value: '90', label: '90 days' },
];
const PEOPLE = [
  'Natasha Manglore',
  'Sarah Johnson',
  'Michael Smith',
  'Emily Davis',
  'Enterprise Sales Operations Leadership Team',
].map((name) => ({ value: name, label: name }));

const COLUMNS = ['Default', 'Filled', 'Disabled', 'Held', 'Error'] as const;

function Row({ kind, cells }: { kind: string; cells: React.ReactNode[] }) {
  return (
    <>
      <div className="mdt-flex mdt-items-center mdt-text-sm mdt-font-medium mdt-text-foreground">
        {kind}
      </div>
      {cells.map((cell, i) => (
        <div key={COLUMNS[i] ?? String(i)} className="mdt-min-w-0">
          {cell}
        </div>
      ))}
    </>
  );
}

function Matrix() {
  const [text, setText] = useState('Night Shift');
  const [search, setSearch] = useState('helpdesk');
  const [count, setCount] = useState('10');
  const [days, setDays] = useState<string | null>('14');
  const [notes, setNotes] = useState('Covers the overnight queue and the weekend hand-over.');
  const [when, setWhen] = useState('2026-10-22');
  const [owners, setOwners] = useState<string[]>([
    'Natasha Manglore',
    'Sarah Johnson',
    'Michael Smith',
  ]);
  const [longOwners, setLongOwners] = useState<string[]>([
    'Enterprise Sales Operations Leadership Team',
    'Sarah Johnson',
    'Michael Smith',
    'Emily Davis',
  ]);
  const single = (v: string | string[] | null) => (Array.isArray(v) ? (v[0] ?? null) : v);
  const many = (v: string | string[] | null) => (Array.isArray(v) ? v : v === null ? [] : [v]);
  return (
    <div className="mdt-grid mdt-grid-cols-[120px_repeat(5,220px)] mdt-gap-x-6 mdt-gap-y-7">
      <div />
      {COLUMNS.map((c) => (
        <div
          key={c}
          className="mdt-text-[11px] mdt-font-semibold mdt-uppercase mdt-tracking-wide mdt-text-neutral-90"
        >
          {c}
        </div>
      ))}
      <Row
        kind="Text"
        cells={[
          <Input key="a" label="Team name" placeholder="Enter team name" />,
          <Input
            key="b"
            label="Team name"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />,
          <Input key="c" label="Email" value="emily.davis@company.com" disabled readOnly />,
          <Input
            key="h"
            label="Email"
            value="alexandra.konstantinopoulos-whitfield@company.com"
            locked
            readOnly
          />,
          <Input
            key="d"
            label="Team name"
            defaultValue="IT Support"
            error="A team with this name already exists"
          />,
        ]}
      />
      <Row
        kind="Search"
        cells={[
          <Input
            key="a"
            placeholder="Search grants"
            startAdornment={<Icon name="search" size={14} />}
            aria-label="Search grants"
          />,
          <Input
            key="b"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            startAdornment={<Icon name="search" size={14} />}
            endAdornment={
              <button
                type="button"
                aria-label="Clear search"
                className="mdt-flex mdt-cursor-pointer mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-neutral-70"
                onClick={() => {
                  setSearch('');
                }}
              >
                <Icon name="x" size={14} />
              </button>
            }
            aria-label="Search grants"
          />,
          <Input
            key="c"
            placeholder="Search grants"
            startAdornment={<Icon name="search" size={14} />}
            disabled
            aria-label="Search grants"
          />,
          <Input
            key="h"
            placeholder="Search grants"
            startAdornment={<Icon name="search" size={14} />}
            locked
            aria-label="Search grants"
          />,
          <div key="d" className="mdt-pt-2 mdt-text-xs mdt-text-neutral-70">
            — a search has no error
          </div>,
        ]}
      />
      <Row
        kind="Number"
        cells={[
          <NumberInput key="a" label="Maximum uses" placeholder="0" min={0} />,
          <NumberInput key="b" label="Maximum uses" value={count} onChange={setCount} min={0} />,
          <NumberInput key="c" label="Maximum uses" value="10" disabled />,
          <NumberInput key="h" label="Maximum uses" value="10" locked />,
          <NumberInput key="d" label="Maximum uses" value="0" error="Must be at least 1" min={1} />,
        ]}
      />
      <Row
        kind="Dropdown"
        cells={[
          <Select
            key="a"
            mode="single"
            label="Link expires after"
            placeholder="Select days…"
            options={DAYS}
          />,
          <Select
            key="b"
            mode="single"
            label="Link expires after"
            options={DAYS}
            value={days}
            onChange={(v) => {
              setDays(single(v));
            }}
          />,
          <Select
            key="c"
            mode="single"
            label="Link expires after"
            options={DAYS}
            value="14"
            disabled
          />,
          <Select
            key="h"
            mode="single"
            label="Link expires after"
            options={DAYS}
            value="14"
            locked
          />,
          <Select
            key="d"
            mode="single"
            label="Link expires after"
            placeholder="Select days…"
            options={DAYS}
            error="Pick how long the link lives"
          />,
        ]}
      />
      <Row
        kind="Text area"
        cells={[
          <Textarea
            key="a"
            label="Description"
            placeholder="Describe the purpose and responsibilities of this team"
          />,
          <Textarea
            key="b"
            label="Description"
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
            }}
          />,
          <Textarea
            key="c"
            label="Description"
            value="Technical support team for internal systems and devices"
            disabled
            readOnly
          />,
          <Textarea
            key="h"
            label="Description"
            value="Technical support team for internal systems and devices"
            locked
            readOnly
          />,
          <Textarea key="d" label="Description" error="A description is required" />,
        ]}
      />
      <Row
        kind="Multi-select"
        cells={[
          <Select
            key="a"
            mode="multiple"
            label="Owner"
            placeholder="Select one or more owners"
            options={PEOPLE}
            showPills
            searchable
          />,
          <div key="b" className="mdt-flex mdt-flex-col mdt-gap-3">
            <Select
              mode="multiple"
              label="Owner"
              options={PEOPLE}
              value={owners}
              onChange={(v) => {
                setOwners(many(v));
              }}
              onRemovePill={(v) => {
                setOwners(owners.filter((x) => x !== v));
              }}
              showPills
              searchable
            />
            <Select
              mode="multiple"
              aria-label="Owner, long first pick"
              options={PEOPLE}
              value={longOwners}
              onChange={(v) => {
                setLongOwners(many(v));
              }}
              onRemovePill={(v) => {
                setLongOwners(longOwners.filter((x) => x !== v));
              }}
              showPills
              searchable
            />
          </div>,
          <Select
            key="c"
            mode="multiple"
            label="Owner"
            options={PEOPLE}
            value={['Natasha Manglore', 'Sarah Johnson', 'Michael Smith']}
            showPills
            disabled
          />,
          <Select
            key="h"
            mode="multiple"
            label="Owner"
            options={PEOPLE}
            value={['Natasha Manglore', 'Sarah Johnson', 'Michael Smith']}
            showPills
            locked
          />,
          <Select
            key="d"
            mode="multiple"
            label="Roles"
            placeholder="You can select more than one…"
            options={PEOPLE}
            showPills
            error="Pick at least one role"
          />,
        ]}
      />
      <Row
        kind="Date"
        cells={[
          <DateInput key="a" label="Expires on" placeholder="Pick a date" />,
          <DateInput key="b" label="Expires on" value={when} onChange={setWhen} />,
          <DateInput key="c" label="Expires on" value="2026-10-22" disabled />,
          <DateInput key="h" label="Expires on" value="2026-10-22" locked />,
          <DateInput key="d" label="Expires on" value="2026-01-05" error="That day has passed" />,
        ]}
      />
    </div>
  );
}

/** Every kind in its resting states. Hover and focus are live. */
export const TheMatrix: Story = {
  render: () => <Matrix />,
};

/** The pieces of the search: the glyph 12 from the left, 6 to the text, the clear 12 from the right. */
export const Search: Story = {
  render: () => (
    <div className="mdt-w-[320px]">
      <Input
        placeholder="Search grants"
        startAdornment={<Icon name="search" size={14} />}
        aria-label="Search grants"
      />
    </div>
  ),
};

function NumberDemo() {
  const [v, setV] = useState('10');
  return (
    <div className="mdt-w-[220px]">
      <NumberInput label="Maximum uses" value={v} onChange={setV} min={0} max={100} />
    </div>
  );
}

/** The number field with its own stepper: two 18 × 11 buttons, 9-px chevrons, neutral-20 under the pointer. */
export const Number: Story = {
  render: () => <NumberDemo />,
};
