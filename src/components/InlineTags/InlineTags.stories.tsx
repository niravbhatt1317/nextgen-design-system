import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { InlineTags } from './InlineTags';

const POOL = [
  'Gold tier',
  'Silver tier',
  'Pilot',
  'APAC',
  'EMEA',
  'North America',
  'Healthcare',
  'FinServ',
  'Renewal Q3',
  'VIP',
  'Strategic',
];
/** How many records use each tag - the counts on the rows and the order of Suggested. Example data. */
const COUNTS: Record<string, number> = {
  'Gold tier': 14,
  'Silver tier': 11,
  Pilot: 4,
  APAC: 12,
  EMEA: 21,
  'North America': 17,
  Healthcare: 8,
  FinServ: 9,
  'Renewal Q3': 5,
  VIP: 3,
  Strategic: 6,
};

const meta: Meta<typeof InlineTags> = {
  title: 'Components/InlineTags',
  component: InlineTags,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          "A record's tags, and the place to change them. Two variants share one picker.",
          '',
          '**Inline** (a header or a details row): the tags as square `TagPill`s and a blue dashed **Add tag**. Pressed,',
          'it turns into the search field in the same spot and the picker opens under it.',
          '',
          '**Popover** (a table cell): the cell shows the tags - two, then a quiet "+N" - or **Add tags**. Pressed, a',
          'popover opens with the search on top.',
          '',
          'The picker: **Selected** (the tags on the record) and **Suggested** (every other tag, `suggestions` first, then',
          'by `counts`). Ticking a suggestion slides it up into Selected; unticking slides it back. Typing narrows both',
          'groups and offers **Create "…"** for a new word. Ticks are a draft: **Apply** hands back the whole list,',
          '**Cancel** or Escape drops it. The row behind holds still until Apply. A press outside with unapplied ticks is',
          'swallowed and the picker glows for a second, as the More filters panel does.',
        ].join('\n'),
      },
    },
  },
  argTypes: { value: { control: false }, onChange: { control: false } },
};

export default meta;
type Story = StoryObj<typeof InlineTags>;

function Live(props: { start: string[]; disabled?: boolean; variant?: 'inline' | 'popover' }) {
  const [tags, setTags] = useState(props.start);
  return (
    <div style={{ maxWidth: 640, minHeight: 460 }}>
      <InlineTags
        value={tags}
        onChange={setTags}
        options={POOL}
        counts={COUNTS}
        variant={props.variant}
        disabled={props.disabled}
      />
    </div>
  );
}

/** A header's or a details row's tags: the field opens in place of Add tag. */
export const Default: Story = { render: () => <Live start={['Healthcare', 'VIP']} /> };
export const Empty: Story = { render: () => <Live start={[]} /> };
export const Disabled: Story = { render: () => <Live start={['Healthcare', 'VIP']} disabled /> };

/** A table cell's tags: two pills and a quiet "+N"; pressed, the picker opens with its own search. */
export const Popover: Story = {
  render: () => (
    <div style={{ width: 260 }}>
      <Live start={['Gold tier', 'FinServ', 'EMEA']} variant="popover" />
    </div>
  ),
};

/** A table cell with no tags yet. */
export const PopoverEmpty: Story = {
  render: () => (
    <div style={{ width: 260 }}>
      <Live start={[]} variant="popover" />
    </div>
  ),
};
