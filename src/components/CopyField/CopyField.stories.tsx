import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { CopyField } from './CopyField';

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
