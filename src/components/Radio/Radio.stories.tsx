import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from './Radio';
import { FormLabel } from '../Form';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Radio buttons for selecting a single option from a list. Supports default and card variants.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default radio buttons with labels.
 */
export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" aria-label="Select an option">
      <div className="mdt-flex mdt-items-center mdt-space-x-2">
        <RadioGroupItem value="option1" id="r1" />
        <FormLabel htmlFor="r1">Option 1</FormLabel>
      </div>
      <div className="mdt-flex mdt-items-center mdt-space-x-2">
        <RadioGroupItem value="option2" id="r2" />
        <FormLabel htmlFor="r2">Option 2</FormLabel>
      </div>
      <div className="mdt-flex mdt-items-center mdt-space-x-2">
        <RadioGroupItem value="option3" id="r3" />
        <FormLabel htmlFor="r3">Option 3</FormLabel>
      </div>
    </RadioGroup>
  ),
};

/**
 * Card variant for more prominent selection options.
 */
export const CardVariant: Story = {
  render: () => (
    <div className="mdt-w-[400px]">
      <RadioGroup defaultValue="card1">
        <RadioGroupItem value="card1" id="card1" variant="card">
          <div className="mdt-flex mdt-items-start mdt-justify-between">
            <div>
              <div className="mdt-font-medium">Free Plan</div>
              <div className="mdt-text-sm mdt-text-muted-foreground">
                Perfect for trying out our service
              </div>
            </div>
            <div className="mdt-text-2xl mdt-font-bold">$0</div>
          </div>
        </RadioGroupItem>

        <RadioGroupItem value="card2" id="card2" variant="card">
          <div className="mdt-flex mdt-items-start mdt-justify-between">
            <div>
              <div className="mdt-font-medium">Pro Plan</div>
              <div className="mdt-text-sm mdt-text-muted-foreground">
                For professionals and small teams
              </div>
            </div>
            <div className="mdt-text-2xl mdt-font-bold">$29</div>
          </div>
        </RadioGroupItem>

        <RadioGroupItem value="card3" id="card3" variant="card">
          <div className="mdt-flex mdt-items-start mdt-justify-between">
            <div>
              <div className="mdt-font-medium">Enterprise Plan</div>
              <div className="mdt-text-sm mdt-text-muted-foreground">For large organizations</div>
            </div>
            <div className="mdt-text-2xl mdt-font-bold">$99</div>
          </div>
        </RadioGroupItem>
      </RadioGroup>
    </div>
  ),
};

/**
 * Card with radio button inside - matches the Figma design.
 */
export const CardWithRadio: Story = {
  render: () => (
    <div className="mdt-w-[450px]">
      <RadioGroup defaultValue="custom-mix" aria-label="Select service option">
        <RadioGroupItem value="it-ops" variant="card-with-radio">
          <div className="mdt-flex mdt-flex-1 mdt-items-start mdt-justify-between">
            <div className="mdt-flex-1">
              <div className="mdt-font-medium mdt-text-foreground">IT Operations</div>
              <div className="mdt-text-sm mdt-text-muted-foreground">
                Monitor incidents, track problems, manage your CMDB.
              </div>
            </div>
            <div className="mdt-ml-4 mdt-shrink-0 mdt-text-muted-foreground">
              <span className="mdt-text-xs">1+</span>
            </div>
          </div>
        </RadioGroupItem>

        <RadioGroupItem value="change-release" variant="card-with-radio">
          <div className="mdt-flex mdt-flex-1 mdt-items-start">
            <div className="mdt-flex-1">
              <div className="mdt-font-medium mdt-text-foreground">Change & Release Management</div>
              <div className="mdt-text-sm mdt-text-muted-foreground">
                Plan, approve, and deploy changes.
              </div>
            </div>
          </div>
        </RadioGroupItem>

        <RadioGroupItem value="service-desk" variant="card-with-radio">
          <div className="mdt-flex mdt-flex-1 mdt-items-start mdt-justify-between">
            <div className="mdt-flex-1">
              <div className="mdt-font-medium mdt-text-foreground">Service Desk / Catalog</div>
              <div className="mdt-text-sm mdt-text-muted-foreground">
                Handle incoming requests, share knowledge, automate support.
              </div>
            </div>
            <div className="mdt-ml-4 mdt-shrink-0 mdt-text-muted-foreground">
              <span className="mdt-text-xs">4+</span>
            </div>
          </div>
        </RadioGroupItem>

        <RadioGroupItem value="major-incident" variant="card-with-radio">
          <div className="mdt-flex mdt-flex-1 mdt-items-start">
            <div className="mdt-flex-1">
              <div className="mdt-font-medium mdt-text-foreground">Major Incident Room</div>
              <div className="mdt-text-sm mdt-text-muted-foreground">
                Manage critical issues and root-cause fixes together.
              </div>
            </div>
          </div>
        </RadioGroupItem>

        <RadioGroupItem value="custom-mix" variant="card-with-radio">
          <div className="mdt-flex mdt-flex-1 mdt-items-start">
            <div className="mdt-flex-1">
              <div className="mdt-font-medium mdt-text-foreground">Custom Mix</div>
              <div className="mdt-text-sm mdt-text-muted-foreground">
                Pick the apps you want manually.
              </div>
            </div>
          </div>
        </RadioGroupItem>
      </RadioGroup>
    </div>
  ),
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" aria-label="Select an option">
      <div className="mdt-flex mdt-items-center mdt-space-x-2">
        <RadioGroupItem value="option1" id="d1" />
        <FormLabel htmlFor="d1">Enabled Option</FormLabel>
      </div>
      <div className="mdt-flex mdt-items-center mdt-space-x-2">
        <RadioGroupItem value="option2" id="d2" disabled />
        <FormLabel htmlFor="d2">Disabled Option</FormLabel>
      </div>
    </RadioGroup>
  ),
};
