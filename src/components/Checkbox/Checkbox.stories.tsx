import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { FormLabel } from '../Form';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Checkbox for toggling selection. Supports default and card variants.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default checkbox with label.
 */
export const Default: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-space-x-2">
      <Checkbox id="terms" />
      <FormLabel htmlFor="terms">Accept terms and conditions</FormLabel>
    </div>
  ),
};

/**
 * Card variant for more prominent options.
 */
export const CardVariant: Story = {
  render: () => (
    <div className="mdt-w-[400px] mdt-space-y-2">
      <Checkbox id="feature1" variant="card">
        <div>
          <div className="mdt-font-medium">Email Notifications</div>
          <div className="mdt-text-sm mdt-text-muted-foreground">
            Receive email updates about your account activity
          </div>
        </div>
      </Checkbox>

      <Checkbox id="feature2" variant="card">
        <div>
          <div className="mdt-font-medium">SMS Notifications</div>
          <div className="mdt-text-sm mdt-text-muted-foreground">
            Receive SMS alerts for important updates
          </div>
        </div>
      </Checkbox>

      <Checkbox id="feature3" variant="card">
        <div>
          <div className="mdt-font-medium">Push Notifications</div>
          <div className="mdt-text-sm mdt-text-muted-foreground">
            Get push notifications on your mobile device
          </div>
        </div>
      </Checkbox>
    </div>
  ),
};

/**
 * Multiple checkboxes for selecting multiple options.
 */
export const MultipleSelection: Story = {
  render: () => (
    <div className="mdt-space-y-2">
      <div className="mdt-flex mdt-items-center mdt-space-x-2">
        <Checkbox id="apple" defaultChecked />
        <FormLabel htmlFor="apple">Apple</FormLabel>
      </div>
      <div className="mdt-flex mdt-items-center mdt-space-x-2">
        <Checkbox id="banana" />
        <FormLabel htmlFor="banana">Banana</FormLabel>
      </div>
      <div className="mdt-flex mdt-items-center mdt-space-x-2">
        <Checkbox id="orange" defaultChecked />
        <FormLabel htmlFor="orange">Orange</FormLabel>
      </div>
    </div>
  ),
};

/**
 * Card with checkbox inside - matches the Figma design.
 */
export const CardWithCheckbox: Story = {
  render: () => (
    <div className="mdt-w-[450px] mdt-space-y-2">
      <Checkbox id="notifications" defaultChecked variant="card-with-checkbox">
        <div className="mdt-flex mdt-flex-1 mdt-items-start mdt-justify-between">
          <div className="mdt-flex-1">
            <div className="mdt-font-medium mdt-text-foreground">Email Notifications</div>
            <div className="mdt-text-sm mdt-text-muted-foreground">
              Receive email updates about your account activity and important changes.
            </div>
          </div>
        </div>
      </Checkbox>

      <Checkbox id="sms-alerts" variant="card-with-checkbox">
        <div className="mdt-flex mdt-flex-1 mdt-items-start mdt-justify-between">
          <div className="mdt-flex-1">
            <div className="mdt-font-medium mdt-text-foreground">SMS Alerts</div>
            <div className="mdt-text-sm mdt-text-muted-foreground">
              Get text messages for critical alerts and security updates.
            </div>
          </div>
          <div className="mdt-ml-4 mdt-shrink-0 mdt-text-muted-foreground">
            <span className="mdt-text-xs">Premium</span>
          </div>
        </div>
      </Checkbox>

      <Checkbox id="push-notifications" defaultChecked variant="card-with-checkbox">
        <div className="mdt-flex mdt-flex-1 mdt-items-start">
          <div className="mdt-flex-1">
            <div className="mdt-font-medium mdt-text-foreground">Push Notifications</div>
            <div className="mdt-text-sm mdt-text-muted-foreground">
              Receive push notifications on your mobile device.
            </div>
          </div>
        </div>
      </Checkbox>

      <Checkbox id="marketing" variant="card-with-checkbox">
        <div className="mdt-flex mdt-flex-1 mdt-items-start">
          <div className="mdt-flex-1">
            <div className="mdt-font-medium mdt-text-foreground">Marketing Communications</div>
            <div className="mdt-text-sm mdt-text-muted-foreground">
              Receive promotional offers, product updates, and newsletters.
            </div>
          </div>
        </div>
      </Checkbox>
    </div>
  ),
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  render: () => (
    <div className="mdt-space-y-2">
      <div className="mdt-flex mdt-items-center mdt-space-x-2">
        <Checkbox id="enabled" />
        <FormLabel htmlFor="enabled">Enabled Checkbox</FormLabel>
      </div>
      <div className="mdt-flex mdt-items-center mdt-space-x-2">
        <Checkbox id="disabled" disabled />
        <FormLabel htmlFor="disabled">Disabled Checkbox</FormLabel>
      </div>
      <div className="mdt-flex mdt-items-center mdt-space-x-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <FormLabel htmlFor="disabled-checked">Disabled & Checked</FormLabel>
      </div>
    </div>
  ),
};
