import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox, CheckboxGroup } from './Checkbox';
import { TagPill } from '../TagPill';
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

/**
 * ## Chips
 *
 * Several short answers side by side, wrapping onto the next line when the row
 * runs out. **Press one to choose it, press it again to change your mind.**
 *
 * Always an outline — it never fills solid, because a row of solid chips reads
 * as a row of buttons waiting to be pressed, and these are answers rather than
 * actions. Choosing one puts the edge at full strength, lifts the ground a step
 * and shows a tick on the right.
 */
export const Chips: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-[380px] mdt-flex-col mdt-gap-2">
      <FormLabel>Which of these affected the service?</FormLabel>
      <CheckboxGroup label="Which of these affected the service?">
        <Checkbox defaultChecked>Network</Checkbox>
        <Checkbox>Storage</Checkbox>
        <Checkbox defaultChecked>Database</Checkbox>
        <Checkbox>Authentication</Checkbox>
        <Checkbox>Email</Checkbox>
        <Checkbox>Printing</Checkbox>
      </CheckboxGroup>
      <p className="mdt-text-xs mdt-text-muted-foreground">Choose as many as apply.</p>
    </div>
  ),
};

/**
 * **Nothing moves when you press a chip.**
 *
 * The tick's place is held whether it is shown or not. Let the chip grow as the
 * tick arrives and every chip after it shifts along — in a wrapping row that can
 * tip the whole block onto another line, so the chip you were about to press
 * moves out from under your cursor mid-press.
 *
 * This column is deliberately narrow, which is where it would show. Press along
 * the top row: the rows below stay exactly where they are.
 */
export const ChipsWrap: Story = {
  render: () => (
    <div className="mdt-w-[300px]">
      <CheckboxGroup label="Affected services">
        <Checkbox>Network</Checkbox>
        <Checkbox>Storage</Checkbox>
        <Checkbox>Database</Checkbox>
        <Checkbox>Authentication</Checkbox>
        <Checkbox>Email</Checkbox>
        <Checkbox>Printing</Checkbox>
      </CheckboxGroup>
    </div>
  ),
};

/** Medium is the default. Small is for a filter panel where a dozen share the space. */
export const ChipSizes: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <p className="mdt-text-xs mdt-font-semibold mdt-uppercase mdt-tracking-wider mdt-text-muted-foreground">
          Medium · 32px
        </p>
        <CheckboxGroup label="Priority">
          <Checkbox defaultChecked>Network</Checkbox>
          <Checkbox>Storage</Checkbox>
          <Checkbox>Database</Checkbox>
        </CheckboxGroup>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <p className="mdt-text-xs mdt-font-semibold mdt-uppercase mdt-tracking-wider mdt-text-muted-foreground">
          Small · 28px
        </p>
        <CheckboxGroup size="sm" label="Priority">
          <Checkbox defaultChecked>Network</Checkbox>
          <Checkbox>Storage</Checkbox>
          <Checkbox>Database</Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  ),
};

/**
 * A chip that cannot be pressed fades and stops responding, but **stays where it
 * is**. Taking it out would move every chip after it and hide the fact that the
 * option exists at all.
 */
export const ChipsDisabled: Story = {
  render: () => (
    <CheckboxGroup label="Affected services">
      <Checkbox defaultChecked>Network</Checkbox>
      <Checkbox disabled>Storage</Checkbox>
      <Checkbox defaultChecked disabled>
        Database
      </Checkbox>
      <Checkbox>Email</Checkbox>
    </CheckboxGroup>
  ),
};

/**
 * Wired up, so the answers can be watched.
 *
 * Nothing here manages the chips — each one holds its own state and reports it.
 */
export const ChipsInteractive: Story = {
  render: () => {
    const Demo = () => {
      const OPTIONS = ['Network', 'Storage', 'Database', 'Authentication', 'Email', 'Printing'];
      const [chosen, setChosen] = useState<string[]>(['Network']);
      return (
        <div className="mdt-flex mdt-w-[380px] mdt-flex-col mdt-gap-2">
          <FormLabel>Which of these affected the service?</FormLabel>
          <CheckboxGroup label="Which of these affected the service?">
            {OPTIONS.map((name) => (
              <Checkbox
                key={name}
                checked={chosen.includes(name)}
                onCheckedChange={(next) => {
                  setChosen((prev) =>
                    next === true ? [...prev, name] : prev.filter((n) => n !== name)
                  );
                }}
              >
                {name}
              </Checkbox>
            ))}
          </CheckboxGroup>
          <p className="mdt-text-xs mdt-text-muted-foreground">
            {chosen.length === 0 ? 'Nothing chosen yet.' : `Chosen: ${chosen.join(', ')}`}
          </p>
        </div>
      );
    };
    return <Demo />;
  },
};

/**
 * ## It is not a TagPill
 *
 * Same rounded shape, opposite meaning. A **TagPill** says *"here is something
 * already chosen — press the cross to take it away"*. A **chip** says *"press me
 * to choose, press me again to change your mind"*.
 *
 * Eight pixels of height and a different corner is what keeps them apart. Build
 * the chip as a 24px pill with a cross and people will press it expecting the
 * option to disappear from the list rather than simply come unchosen.
 */
export const ChipsVersusTags: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <p className="mdt-text-xs mdt-font-semibold mdt-uppercase mdt-tracking-wider mdt-text-muted-foreground">
          TagPill — 24px, a pill, carries a cross
        </p>
        <div className="mdt-flex mdt-gap-2">
          <TagPill onRemove={() => undefined}>Network</TagPill>
          <TagPill onRemove={() => undefined}>Database</TagPill>
        </div>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <p className="mdt-text-xs mdt-font-semibold mdt-uppercase mdt-tracking-wider mdt-text-muted-foreground">
          Chip — 32px, rounded, carries a tick
        </p>
        <CheckboxGroup label="Affected services">
          <Checkbox defaultChecked>Network</Checkbox>
          <Checkbox>Database</Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  ),
};
