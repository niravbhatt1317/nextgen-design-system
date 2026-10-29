import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox } from '../Combobox';
import { FormLabel } from '../Form';
import { Input } from '../Input';
import { Select } from '../Select';
import { Textarea } from '../Textarea';
import { RequiredMark } from './RequiredMark';

const meta: Meta<typeof RequiredMark> = {
  title: 'New Components/RequiredMark',
  component: RequiredMark,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'The red asterisk after the label of a field that must be filled in. 3 off the word, in the danger red.',
          'The star is for the eye only; a screen reader hears the word "required" instead.',
          '',
          '**Every library field draws it by itself** when given `required` - Input, Textarea, Select, Combobox and',
          'FormLabel. Put `<RequiredMark />` after the text of a label you draw yourself.',
          '',
          '`announce={false}` keeps the star and drops the hidden word, for a label whose field already tells a screen',
          'reader it is required (`required` or `aria-required` on the control) - so the word is not heard twice.',
          '',
          '**Ported from the console\'s RequiredMark (Pranjal, 2026-10-22)**: "In many forms we have mandatory fields but',
          'we are not showing asterisk, so give that symbol beside label".',
        ].join('\n'),
      },
    },
  },
  argTypes: { announce: { control: 'boolean' } },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** After the words of a label you draw yourself. */
export const Default: Story = {
  render: (args) => (
    <span className="mdt-text-[13px] mdt-font-medium mdt-text-neutral-90" data-testid="hand-label">
      Organization name
      <RequiredMark {...args} />
    </span>
  ),
};

const OPTIONS = [
  { value: 'admin', label: 'Administrator' },
  { value: 'viewer', label: 'Viewer' },
];

/** The same mark in every library field that takes `required`. */
export const InTheFields: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-flex mdt-w-[22rem] mdt-max-w-full mdt-flex-col mdt-gap-4">
      <Input label="Full name" placeholder="Enter full name" required />
      <Select label="Role" options={OPTIONS} placeholder="Select a role" required />
      <Combobox label="Owner" options={OPTIONS} placeholder="Select an owner" required />
      <Textarea label="Reason" placeholder="Why this change" required />
      <div className="mdt-flex mdt-flex-col mdt-gap-1.5">
        <FormLabel htmlFor="story-email" weight="medium" required>
          Email
        </FormLabel>
        <Input id="story-email" placeholder="name@company.com" required />
      </div>
    </div>
  ),
};
