import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { within } from 'storybook/test';
import { DateInput } from '../DateInput';
import { Icon } from '../Icon';
import { NumberInput } from '../NumberInput';
import { Select } from '../Select';
import { Input } from './Input';

/*
 * THE FIELD, frame by frame from the artifact he ruled on (Pranjal, 2026-09-17,
 * mocks/foundation/inputs.html; DESIGN-LANGUAGE.md K-Field-01 to K-Field-19).
 * Every number here is the mock's number. The Foundation/Field story keeps the
 * seven-kinds matrix; this page is the Input itself.
 */

const RULE =
  'One field everywhere (K-Field-01 to K-Field-19; Pranjal, 2026-09-17). 32 high, corners 8, the text 13/400, 12 at the sides: the placeholder in the faint ink #8FA0BD, the typed value in neutral-90 #516281, a 1px neutral-30 border. Under the pointer the border turns to the primary colour #070F1D; focused, the same border with a 3px halo of it at 8%. Disabled sits on the neutral-10 ground #F7FAFC in the placeholder colour, not dimmed, with a not-allowed cursor. A held field is disabled with a 14 lock inside at the right, 12 from the edge, in the disabled text colour, and the value stops 34 short of the edge (12 + 14 + 8) in an ellipsis. Error is the danger border #DB132A in every state, the halo turning red (14%) on focus, and the message under the field at 12 in the danger colour with the alert mark. The default size, sm, IS this field; md 36 / 14 and lg 40 / 16 stay for the places that ask.';

const meta: Meta<typeof Input> = {
  title: 'New Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: RULE,
      },
    },
    controls: {
      exclude: ['class'],
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description:
        'sm is THE field (32 high, text 13, 12 at the sides) and the default; md (36 / 14) and lg (40 / 16) stay for the places that ask',
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: 'sm' },
      },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url'],
      description: 'The HTML input type; a number, a dropdown and a date are their own components',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Shown while the field is empty, in the faint ink #8FA0BD (K-Field-03)',
      table: { type: { summary: 'string' } },
    },
    value: {
      control: 'text',
      description: 'The typed value, in neutral-90 #516281 (K-Field-04)',
      table: { type: { summary: 'string' } },
    },
    defaultValue: {
      control: 'text',
      description: 'The starting value of an uncontrolled field',
      table: { type: { summary: 'string' } },
    },
    label: {
      control: 'text',
      description: 'Above the field: 13 in neutral-90, 6 under it (K-Field-05)',
      table: { type: { summary: 'string' } },
    },
    required: {
      control: 'boolean',
      description: 'Adds the asterisk in the danger red after the label (K-Field-05)',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    error: {
      control: 'text',
      description:
        'The danger border in every state, the red halo on focus, and this message at 12 under the field with the alert mark (K-Field-10)',
      table: { type: { summary: 'string' } },
    },
    helperText: {
      control: 'text',
      description: 'Under the field at 12 in the muted colour; hidden while there is an error',
      table: { type: { summary: 'string' } },
    },
    startAdornment: {
      control: false,
      description:
        'A glyph at the left: 14, at 12 from the edge, 6 to the text so the text starts at 32 (K-Field-15)',
      table: { type: { summary: 'ReactNode' } },
    },
    endAdornment: {
      control: false,
      description: 'A glyph at the right: 14, at 12 from the edge, the text stopping 32 short',
      table: { type: { summary: 'ReactNode' } },
    },
    disabled: {
      control: 'boolean',
      description:
        'Off for a moment: the neutral-10 ground, the placeholder colour for the text, opacity 1, a not-allowed cursor, no lock (K-Field-09, K-Field-13)',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    locked: {
      control: 'boolean',
      description:
        'Held: disabled with the 14 lock inside at the right, 12 from the edge; the value stops 34 short (K-Field-11)',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    readOnly: {
      control: 'boolean',
      description: 'Focusable but not editable',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    className: {
      control: 'text',
      description: 'Classes for the field itself',
      table: { type: { summary: 'string' } },
    },
    wrapperClassName: {
      control: 'text',
      description: 'Classes for the wrapper (the label, the field and the message)',
      table: { type: { summary: 'string' } },
    },
    onChange: {
      action: 'changed',
      table: { type: { summary: '(event: ChangeEvent<HTMLInputElement>) => void' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/* The mock's matrix cell: a 220 column with 16 in, so the field is 188 wide; the
 * head 11/600 upper-case in neutral-90, as the mock's column heads. */
function Cell({ head, note, children }: { head: string; note?: string; children: ReactNode }) {
  return (
    <div className="mdt-flex mdt-w-[188px] mdt-shrink-0 mdt-flex-col mdt-gap-2">
      <div className="mdt-text-[11px] mdt-font-semibold mdt-uppercase mdt-tracking-wide mdt-text-neutral-90">
        {head}
        {note && (
          <span className="mdt-ml-1.5 mdt-font-normal mdt-normal-case mdt-tracking-normal mdt-text-faint">
            {note}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="mdt-flex mdt-flex-wrap mdt-items-start mdt-gap-x-8 mdt-gap-y-6">{children}</div>
  );
}

const DAYS = [
  { value: '7', label: '7 days' },
  { value: '14', label: '14 days' },
  { value: '30', label: '30 days' },
  { value: '90', label: '90 days' },
];

const searchGlyph = <Icon name="search" size={14} aria-hidden />;

/**
 * The mock's first frame, the text kind in its states. 32 high, corners 8, the
 * text 13 in neutral-90 #516281, the placeholder in the faint ink #8FA0BD, a
 * 1px neutral-30 border, 12 at the sides. Hover: the border turns to the
 * primary colour #070F1D (move the pointer over the second field). Focused: the
 * same border with the 3px halo of it at 8% (the third field takes focus on
 * load). Disabled: the neutral-10 ground #F7FAFC, the text in the placeholder
 * colour, opacity 1, a not-allowed cursor. Held: disabled with the 14 lock at
 * 12 from the right and the value stopping 34 short. Error: the #DB132A border,
 * the red halo on focus, the message at 12 with the alert mark.
 */
export const TheField: Story = {
  name: 'The field',
  render: () => (
    <Frame>
      <Cell head="Default">
        <Input aria-label="Default" placeholder="Enter team name" />
      </Cell>
      <Cell head="Hover" note="move the pointer over it">
        <Input aria-label="Hover" placeholder="Enter team name" />
      </Cell>
      <Cell head="Focused" note="takes focus on load">
        <Input aria-label="Focused" defaultValue="Night Sh" />
      </Cell>
      <Cell head="Filled">
        <Input aria-label="Filled" defaultValue="Night Shift" />
      </Cell>
      <Cell head="Disabled">
        <Input aria-label="Disabled" placeholder="Enter team name" disabled />
      </Cell>
      <Cell head="Held">
        <Input aria-label="Held" defaultValue="emily.davis@company.com" locked readOnly />
      </Cell>
      <Cell head="Error">
        <Input
          aria-label="Error"
          defaultValue="IT Support"
          error="A team with this name already exists"
        />
      </Cell>
    </Frame>
  ),
  play: ({ canvasElement }) => {
    /* the Focused cell shows the focus look as the mock draws it: the primary border and the halo */
    within(canvasElement).getByLabelText('Focused').focus();
  },
};

/**
 * The mock's kinds, each at rest: text; search with the 14 glyph at 12 and the
 * text at 32; number with its own stepper (two 18 x 11 buttons stacked 4 from
 * the right, 9 chevrons); dropdown, which is the Select's trigger (the 16
 * chevron at 10 from the right); date, which is the DateInput (the 16 calendar
 * glyph at 12 from the right). One box, five doors. OPEN: the Select's own
 * default size is still md (36 high, text 14) although K-Field-17 rules the
 * trigger at sm; the dropdown here is set to sm by hand until that is settled.
 */
export const Kinds: Story = {
  render: () => (
    <Frame>
      <Cell head="Text">
        <Input label="Team name" placeholder="Enter team name" />
      </Cell>
      <Cell head="Search">
        <Input
          aria-label="Search grants"
          placeholder="Search grants"
          startAdornment={searchGlyph}
        />
      </Cell>
      <Cell head="Number">
        <NumberInput label="Maximum uses" placeholder="0" min={0} />
      </Cell>
      <Cell head="Dropdown">
        <Select
          mode="single"
          size="sm"
          label="Link expires after"
          placeholder="Select days…"
          options={DAYS}
        />
      </Cell>
      <Cell head="Date">
        <DateInput label="Expires on" placeholder="Select a date" />
      </Cell>
    </Frame>
  ),
};

/**
 * The label is 13/400 in neutral-90 #516281 with 6 under it; a required field
 * carries the asterisk in the danger red #DB132A after the label (K-Field-05).
 * Helper text sits under the field at 12 in the muted colour and gives way to
 * an error message.
 */
export const WithLabel: Story = {
  name: 'With label',
  render: () => (
    <Frame>
      <Cell head="Label">
        <Input label="Team name" placeholder="Enter team name" />
      </Cell>
      <Cell head="Required">
        <Input label="Team name" placeholder="Enter team name" required />
      </Cell>
      <Cell head="Helper">
        <Input label="Email" placeholder="you@company.com" helperText="Work addresses only" />
      </Cell>
    </Frame>
  ),
};

/**
 * Error is the danger border #DB132A in every state - at rest, under the
 * pointer and focused - and on focus the 3px halo turns red, destructive at
 * 14%. The message sits under the field at 12 in the danger colour with the
 * 12 alert mark, 6 before the text, as role="alert" (K-Field-10). Click into
 * the second field for the red halo.
 */
export const Error: Story = {
  render: () => (
    <Frame>
      <Cell head="At rest">
        <Input
          label="Team name"
          defaultValue="IT Support"
          error="A team with this name already exists"
        />
      </Cell>
      <Cell head="Focused" note="click into it">
        <Input
          label="Team name"
          defaultValue="IT Support"
          error="A team with this name already exists"
        />
      </Cell>
      <Cell head="Empty">
        <Input label="Team name" placeholder="Enter team name" error="A team name is required" />
      </Cell>
    </Frame>
  ),
};

/**
 * A held field is a disabled field something else owns - a directory, a fixed
 * identity. The 14 lock sits inside at the right, 12 from the edge, in the
 * disabled text colour; the value stops 34 short of the edge (12 + the 14 lock
 * + 8) and ends in an ellipsis, never running under the lock; the label stays
 * plain (K-Field-11). A field merely off for a moment is the plain grey field
 * with no lock (K-Field-13).
 */
export const Held: Story = {
  render: () => (
    <Frame>
      <Cell head="Held">
        <Input label="Email" defaultValue="emily.davis@company.com" locked readOnly />
      </Cell>
      <Cell head="A long value truncates">
        <Input
          label="Email"
          defaultValue="alexandra.konstantinopoulos@company.com"
          locked
          readOnly
        />
      </Cell>
      <Cell head="Off for a moment" note="no lock">
        <Input label="Email" defaultValue="emily.davis@company.com" disabled readOnly />
      </Cell>
    </Frame>
  ),
};

/**
 * A start glyph is 14, at 12 from the left, 6 to the text, so the text starts
 * at 32; an end glyph is the same from the right, the text stopping 32 short
 * (K-Field-15). The glyph is in the faint ink at rest and neutral-90 under the
 * pointer or while focused. Once a search has text, the clear cross sits at
 * the right where the end glyph goes.
 */
export const Adornments: Story = {
  render: () => (
    <Frame>
      <Cell head="Start glyph">
        <Input
          aria-label="Search grants"
          placeholder="Search grants"
          startAdornment={searchGlyph}
        />
      </Cell>
      <Cell head="Typed, with the clear">
        <Input
          aria-label="Search grants"
          defaultValue="helpdesk"
          startAdornment={searchGlyph}
          endAdornment={<Icon name="x" size={14} aria-label="Clear search" />}
        />
      </Cell>
      <Cell head="End glyph">
        <Input
          aria-label="Email"
          placeholder="you@company.com"
          endAdornment={<Icon name="mail" size={14} aria-hidden />}
        />
      </Cell>
    </Frame>
  ),
};

/**
 * sm - 32 high, text 13, 12 at the sides - IS the field and the default
 * (K-Field-01). md (36 high, text 14) and lg (40 high, text 16, 16 at the
 * sides) stay for the places that ask for them; nothing new is built on them.
 */
export const Sizes: Story = {
  render: () => (
    <Frame>
      <Cell head="sm · 32" note="the default">
        <Input aria-label="Small" placeholder="32 high, text 13" />
      </Cell>
      <Cell head="md · 36" note="for the places that ask">
        <Input aria-label="Medium" size="md" placeholder="36 high, text 14" />
      </Cell>
      <Cell head="lg · 40" note="for the places that ask">
        <Input aria-label="Large" size="lg" placeholder="40 high, text 16" />
      </Cell>
    </Frame>
  ),
};

/**
 * Every prop on the controls. The field starts as the rule leaves it: sm, a
 * placeholder, nothing else.
 */
export const Playground: Story = {
  args: {
    placeholder: 'Enter team name',
    'aria-label': 'Team name',
  },
  decorators: [
    (StoryFn) => (
      <div className="mdt-w-[320px]">
        <StoryFn />
      </div>
    ),
  ],
};
