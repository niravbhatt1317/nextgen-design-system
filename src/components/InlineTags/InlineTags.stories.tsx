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
const SUGGESTED = [
  'Gold tier',
  'Silver tier',
  'Pilot',
  'APAC',
  'EMEA',
  'North America',
  'FinServ',
  'Renewal Q3',
];

const meta: Meta<typeof InlineTags> = {
  title: 'Components/InlineTags',
  component: InlineTags,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Tags added in place, one at a time - the Tags field of Create organization.',
          '',
          'At rest it is the tags (square `TagPill`s with a tag glyph) and a blue dashed **Add tag**. Pressed, that',
          'button becomes a field with a ✕ beside it, and the suggested tags appear under it as dashed chips. Typing',
          'lists the earlier tags that match, with **Add "…"** at the end for a new word. There is no tick and no',
          'Enter - a tag is added from the list. Escape, the ✕ or a press outside closes it.',
        ].join('\n'),
      },
    },
  },
  argTypes: { value: { control: false }, onChange: { control: false } },
};

export default meta;
type Story = StoryObj<typeof InlineTags>;

function Live(props: { start: string[]; disabled?: boolean }) {
  const [tags, setTags] = useState(props.start);
  return (
    <div style={{ maxWidth: 640, minHeight: 280 }}>
      <InlineTags
        value={tags}
        onChange={setTags}
        suggestions={SUGGESTED}
        options={POOL}
        disabled={props.disabled}
      />
    </div>
  );
}

export const Default: Story = { render: () => <Live start={['Healthcare', 'VIP']} /> };
export const Empty: Story = { render: () => <Live start={[]} /> };
export const Disabled: Story = { render: () => <Live start={['Healthcare', 'VIP']} disabled /> };
