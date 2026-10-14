import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { SelectableCard, SelectableCardGroup } from './SelectableCard';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import { Select } from '../Select';

const meta: Meta<typeof SelectableCard> = {
  title: 'New Components/SelectableCard',
  component: SelectableCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "An answer drawn as a card, its radio or checkbox at the top right - the console's option card. " +
          'The whole card is the control: press it, or Space / Enter; in a radio set the arrows move the answer. ' +
          "A picker or button in the card's body keeps its press to itself, so the chosen answer can ask its follow-up in place. " +
          'The edge is 1.5 in every state, so a choice never moves anything.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SelectableCard>;

const Box = ({ children, width = 560 }: { children: React.ReactNode; width?: number }) => (
  <div style={{ width }}>{children}</div>
);

/** A radio set: one answer, and the chosen one asks its follow-up in place. */
export const RadioWithFollowUp: Story = {
  render: function RadioStory() {
    const [mode, setMode] = useState('existing');
    const [target, setTarget] = useState('');
    return (
      <Box>
        <SelectableCardGroup
          aria-label="How should its holders be handled?"
          value={mode}
          onValueChange={setMode}
        >
          <SelectableCard
            value="existing"
            title="Replace with an existing access profile"
            description="Every holder moves to the chosen profile with the end date they have today."
          >
            {mode === 'existing' && (
              <Select
                aria-label="Replacement access profile"
                placeholder="Select an access profile…"
                options={[
                  { value: 'helpdesk', label: 'Helpdesk Access' },
                  { value: 'special', label: 'Special Access' },
                ]}
                value={target}
                onChange={(v) => {
                  setTarget(typeof v === 'string' ? v : '');
                }}
              />
            )}
          </SelectableCard>
          <SelectableCard
            value="fresh"
            title="Replace with a new access profile"
            description="Open the create drawer prefilled from this one - shape the replacement, and its holders move to it when you create it."
          />
          <SelectableCard
            value="remove"
            title="Remove without replacement"
            description="Every holder loses this access. The record stays in the audit trail."
          />
        </SelectableCardGroup>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('radio', { name: 'Remove without replacement' }));
    await expect(canvas.getByRole('radio', { name: 'Remove without replacement' })).toHaveAttribute(
      'aria-checked',
      'true'
    );
    await userEvent.click(
      canvas.getByRole('radio', { name: 'Replace with an existing access profile' })
    );
  },
};

/** A checkbox set in a grid of two, with an icon, a tag and a held card. */
export const CheckboxGrid: Story = {
  render: function CheckboxStory() {
    const [on, setOn] = useState<Record<string, boolean>>({ email: true });
    const card = (key: string, title: string, description: string, icon: IconName, extra = {}) => (
      <SelectableCard
        title={title}
        description={description}
        icon={<Icon name={icon} />}
        checked={on[key] ?? false}
        onCheckedChange={(next) => {
          setOn((s) => ({ ...s, [key]: next }));
        }}
        {...extra}
      />
    );
    return (
      <Box>
        <SelectableCardGroup type="checkbox" columns={2} aria-label="Notify by">
          {card('email', 'Email', 'A message to the address on file.', 'mail', { tag: 'Fastest' })}
          {card('sms', 'SMS', 'A text to the verified number.', 'phone')}
          {card('slack', 'Slack', 'A direct message in the workspace.', 'slack')}
          {card('pager', 'Pager', 'Not set up for this organization.', 'bell', { disabled: true })}
        </SelectableCardGroup>
      </Box>
    );
  },
};

/** Chips: one row as wide as their words, no line under the title. */
export const Chips: Story = {
  render: function ChipsStory() {
    const [value, setValue] = useState('saml');
    return (
      <SelectableCardGroup
        layout="chips"
        aria-label="Protocol"
        value={value}
        onValueChange={setValue}
      >
        <SelectableCard value="saml" title="SAML 2.0" icon={<Icon name="shield" />} />
        <SelectableCard value="oidc" title="OpenID Connect" icon={<Icon name="key-round" />} />
        <SelectableCard value="ldap" title="LDAP" icon={<Icon name="server" />} />
      </SelectableCardGroup>
    );
  },
};
