import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { CopyField } from './CopyField';
import { CopyTip } from './CopyTip';

const meta: Meta<typeof CopyField> = {
  title: 'New Components/CopyField',
  component: CopyField,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'One line holding a value an admin carries somewhere else - an endpoint, an ID, a token - with an icon-only copy button at its right end. The button says **Copy** in a tooltip under the pointer and **Copied** for 1.4 seconds after a press: never a toast, never a label that changes.',
          '',
          'The line is 36 tall on the sunken ground. A long value is cut with an ellipsis and shown whole on hover; the button always copies all of it. `masked` shows the dots instead and still copies the real value - pass `copyable={false}` when it must not.',
          '',
          '**Ported from the console (Pranjal, 2026-10-13)**, which had built it by hand five times: the copy feedback (CopyTip), the one-line field (the SSO drawer), the icon-only copy (SCIM), the label row with its ⓘ (the setup drawers). For a multi-line command or log output, use CodeWell.',
          '',
          '**CopyTip** is the copy feedback on its own, for a copy control that is not in a field - the icon-only copy beside an ID in a drawer row, or a "Copy link" button. Wrap the control; a press copies `text` and still runs the control\'s own `onClick`. `hoverTip={false}` for a control that already reads "Copy": the bubble then shows only once it has copied. CopyField\'s own button goes through it, so the two always say the same thing.',
        ].join('\n'),
      },
    },
  },
  args: { label: 'Base URL', value: 'https://scim.oneops.example.com/v2/tenants/8f3a2c' },
  argTypes: {
    masked: { control: 'boolean' },
    mono: { control: 'boolean' },
    copyable: { control: 'boolean' },
    info: { control: false },
    onCopy: { action: 'copied' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Stack = ({ children }: { children: ReactNode }) => (
  <div className="mdt-flex mdt-w-[28rem] mdt-max-w-full mdt-flex-col mdt-gap-4">{children}</div>
);

export const Default: Story = {
  render: (args) => (
    <Stack>
      <CopyField {...args} />
    </Stack>
  ),
};

/** A value wider than the line: cut with an ellipsis, whole on hover, copied in full. */
export const LongValue: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <CopyField
        label="Assertion consumer service URL"
        value="https://login.oneops.example.com/sso/saml2/acs/8f3a2c91-4b7e-4c1d-a2f0-3e9b6d5c7a10"
      />
    </Stack>
  ),
};

/** The dots in place of the value. The button still copies the real one. */
export const Masked: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <CopyField label="Bearer token" value="sk-live-9f2c7e1a4b8d" masked />
      <CopyField label="Client secret" value="never-copied" masked copyable={false} />
    </Stack>
  ),
};

/** Plain words, out of the monospace face; and a field with no label. */
export const Variations: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <CopyField label="Organization name" value="Acme Health Partners" mono={false} />
      <CopyField value="oneops-entity-8f3a2c" copyLabel="Copy the entity ID" />
    </Stack>
  ),
};

/** CopyTip around the icon-only ghost copy: "Copy" under the pointer, "Copied" for 1.4 s after a press. */
export const CopyTipIconOnly: Story = {
  name: 'CopyTip · icon only',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-2 mdt-pt-10 mdt-text-sm mdt-text-foreground">
      <span className="mdt-font-mono mdt-text-xs">agt-7f3c91e2</span>
      {/* in its own slot, as the console's code blocks hold it - CopyTip's inline anchor is not a flex item there */}
      <span>
        <CopyTip text="agt-7f3c91e2">
          <Button
            iconOnly
            variant="ghost"
            size="sm"
            ariaLabel="Copy agent ID"
            leftIcon={<Icon name="copy" size="sm" aria-hidden />}
          />
        </CopyTip>
      </span>
    </div>
  ),
};

/** CopyTip around buttons that already say "Copy": no bubble under the pointer, "Copied" after a press. */
export const CopyTipOnAButton: Story = {
  name: 'CopyTip · on a button that says Copy',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-pt-10">
      <CopyTip text="https://login.oneops.example.com/invite/8f3a2c" hoverTip={false}>
        <Button variant="secondary" leftIcon={<Icon name="copy" size="sm" aria-hidden />}>
          Copy link
        </Button>
      </CopyTip>
      <CopyTip text="urn:ietf:params:scim:schemas:core:2.0:User" hoverTip={false}>
        <Button variant="outline" size="sm" leftIcon={<Icon name="copy" size="sm" aria-hidden />}>
          Copy
        </Button>
      </CopyTip>
    </div>
  ),
};
