import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { MotadataSwitch } from './Switch';

const meta: Meta<typeof MotadataSwitch> = {
  title: 'Components/Switch',
  component: MotadataSwitch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A toggle switch control built on Radix UI. Provides accessible on/off switching with keyboard support and form integration.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the switch',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'The controlled checked state',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'The default checked state (uncontrolled mode)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the switch is required in a form',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    name: {
      control: 'text',
      description: 'The name of the switch (for form submission)',
    },
    value: {
      control: 'text',
      description: 'The value submitted with the form',
      table: {
        defaultValue: { summary: 'on' },
      },
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Callback when checked state changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default switch in unchecked state.
 */
export const Default: Story = {
  args: {
    'aria-label': 'Toggle setting',
  },
};

/**
 * Switch in checked state by default.
 */
export const Checked: Story = {
  args: {
    defaultChecked: true,
    'aria-label': 'Toggle setting',
  },
};

/**
 * All size variants displayed together.
 */
export const Sizes: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-6">
      <div className="mdt-flex mdt-items-center mdt-gap-2">
        <MotadataSwitch size="sm" aria-label="Small switch" />
        <span className="mdt-text-sm mdt-text-muted-foreground">Small</span>
      </div>
      <div className="mdt-flex mdt-items-center mdt-gap-2">
        <MotadataSwitch size="md" aria-label="Medium switch" />
        <span className="mdt-text-sm mdt-text-muted-foreground">Medium</span>
      </div>
      <div className="mdt-flex mdt-items-center mdt-gap-2">
        <MotadataSwitch size="lg" aria-label="Large switch" />
        <span className="mdt-text-sm mdt-text-muted-foreground">Large</span>
      </div>
    </div>
  ),
};

/**
 * Disabled switch cannot be toggled.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Toggle setting',
  },
};

/**
 * Disabled switch in checked state.
 */
export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    'aria-label': 'Toggle setting',
  },
};

/**
 * Controlled switch with state management.
 */
export const Controlled: Story = {
  render: function ControlledSwitch() {
    const [checked, setChecked] = useState(false);

    return (
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-4">
        <div className="mdt-flex mdt-items-center mdt-gap-2">
          <MotadataSwitch
            checked={checked}
            onCheckedChange={setChecked}
            aria-label="Controlled switch"
          />
          <span className="mdt-text-sm mdt-text-muted-foreground">{checked ? 'On' : 'Off'}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setChecked(!checked);
          }}
          className="mdt-rounded mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90"
        >
          Toggle from outside
        </button>
      </div>
    );
  },
};

/**
 * Switch with a label using flex layout.
 */
export const WithLabel: Story = {
  render: () => (
    <label
      htmlFor="notifications-switch"
      className="mdt-flex mdt-cursor-pointer mdt-items-center mdt-gap-2"
    >
      <MotadataSwitch id="notifications-switch" />
      <span className="mdt-text-sm mdt-text-foreground">Enable notifications</span>
    </label>
  ),
};

/**
 * Multiple switches with labels in a settings panel.
 */
export const SettingsPanel: Story = {
  render: () => (
    <div className="mdt-w-80 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background mdt-p-6">
      <h3 className="mdt-mb-4 mdt-text-lg mdt-font-semibold mdt-text-foreground">
        Notification Settings
      </h3>
      <div className="mdt-space-y-4">
        <div className="mdt-flex mdt-items-center mdt-justify-between">
          <div className="mdt-space-y-0.5">
            <label
              htmlFor="email-notifications"
              className="mdt-text-sm mdt-font-medium mdt-text-foreground"
            >
              Email notifications
            </label>
            <p className="mdt-text-xs mdt-text-muted-foreground">Receive notifications via email</p>
          </div>
          <MotadataSwitch id="email-notifications" defaultChecked />
        </div>
        <div className="mdt-flex mdt-items-center mdt-justify-between">
          <div className="mdt-space-y-0.5">
            <label
              htmlFor="push-notifications"
              className="mdt-text-sm mdt-font-medium mdt-text-foreground"
            >
              Push notifications
            </label>
            <p className="mdt-text-xs mdt-text-muted-foreground">
              Receive push notifications on your device
            </p>
          </div>
          <MotadataSwitch id="push-notifications" />
        </div>
        <div className="mdt-flex mdt-items-center mdt-justify-between">
          <div className="mdt-space-y-0.5">
            <label
              htmlFor="sms-notifications"
              className="mdt-text-sm mdt-font-medium mdt-text-foreground"
            >
              SMS notifications
            </label>
            <p className="mdt-text-xs mdt-text-muted-foreground">Receive notifications via SMS</p>
          </div>
          <MotadataSwitch id="sms-notifications" />
        </div>
        <div className="mdt-flex mdt-items-center mdt-justify-between">
          <div className="mdt-space-y-0.5">
            <label htmlFor="marketing" className="mdt-text-sm mdt-font-medium mdt-text-foreground">
              Marketing emails
            </label>
            <p className="mdt-text-xs mdt-text-muted-foreground">
              Receive updates about new features
            </p>
          </div>
          <MotadataSwitch id="marketing" disabled />
        </div>
      </div>
    </div>
  ),
};

/**
 * Form integration example with multiple switches.
 */
export const FormIntegration: Story = {
  render: function FormIntegrationExample() {
    const [formData, setFormData] = useState({
      newsletter: false,
      terms: false,
      privacy: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="mdt-w-96 mdt-space-y-4 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background mdt-p-6"
      >
        <h3 className="mdt-mb-4 mdt-text-lg mdt-font-semibold mdt-text-foreground">
          Account Preferences
        </h3>

        <div className="mdt-space-y-4">
          <label
            htmlFor="newsletter-switch"
            className="mdt-flex mdt-cursor-pointer mdt-items-center mdt-justify-between"
          >
            <span className="mdt-text-sm mdt-text-foreground">Subscribe to newsletter</span>
            <MotadataSwitch
              id="newsletter-switch"
              checked={formData.newsletter}
              onCheckedChange={(checked) => {
                setFormData((prev) => ({ ...prev, newsletter: checked }));
              }}
              name="newsletter"
            />
          </label>

          <label
            htmlFor="terms-switch"
            className="mdt-flex mdt-cursor-pointer mdt-items-center mdt-justify-between"
          >
            <span className="mdt-text-sm mdt-text-foreground">
              I agree to terms and conditions
              <span className="mdt-text-destructive"> *</span>
            </span>
            <MotadataSwitch
              id="terms-switch"
              checked={formData.terms}
              onCheckedChange={(checked) => {
                setFormData((prev) => ({ ...prev, terms: checked }));
              }}
              name="terms"
              required
            />
          </label>

          <label
            htmlFor="privacy-switch"
            className="mdt-flex mdt-cursor-pointer mdt-items-center mdt-justify-between"
          >
            <span className="mdt-text-sm mdt-text-foreground">
              I agree to privacy policy
              <span className="mdt-text-destructive"> *</span>
            </span>
            <MotadataSwitch
              id="privacy-switch"
              checked={formData.privacy}
              onCheckedChange={(checked) => {
                setFormData((prev) => ({ ...prev, privacy: checked }));
              }}
              name="privacy"
              required
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={!formData.terms || !formData.privacy}
          className="mdt-w-full mdt-rounded mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90 disabled:mdt-cursor-not-allowed disabled:mdt-opacity-50"
        >
          Submit
        </button>
      </form>
    );
  },
};

/**
 * All states displayed together for visual testing.
 */
export const AllStates: Story = {
  render: () => (
    <div className="mdt-space-y-8">
      <div>
        <h4 className="mdt-mb-3 mdt-text-sm mdt-font-medium mdt-text-foreground">Sizes</h4>
        <div className="mdt-flex mdt-gap-4">
          <div className="mdt-flex mdt-flex-col mdt-gap-2">
            <MotadataSwitch size="sm" aria-label="Small unchecked" />
            <MotadataSwitch size="sm" defaultChecked aria-label="Small checked" />
          </div>
          <div className="mdt-flex mdt-flex-col mdt-gap-2">
            <MotadataSwitch size="md" aria-label="Medium unchecked" />
            <MotadataSwitch size="md" defaultChecked aria-label="Medium checked" />
          </div>
          <div className="mdt-flex mdt-flex-col mdt-gap-2">
            <MotadataSwitch size="lg" aria-label="Large unchecked" />
            <MotadataSwitch size="lg" defaultChecked aria-label="Large checked" />
          </div>
        </div>
      </div>

      <div>
        <h4 className="mdt-mb-3 mdt-text-sm mdt-font-medium mdt-text-foreground">Disabled</h4>
        <div className="mdt-flex mdt-gap-4">
          <MotadataSwitch disabled aria-label="Disabled unchecked" />
          <MotadataSwitch disabled defaultChecked aria-label="Disabled checked" />
        </div>
      </div>
    </div>
  ),
};
