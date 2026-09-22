import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Card, CardBody } from '../Card';
import { FormLabel } from '../Form';
import {
  Table,
  TableBody,
  TableCell,
  TableColGroup,
  TableHead,
  TableHeader,
  TableRow,
  TableTailCell,
  TableViewport,
} from '../Table';
import { MotadataSwitch } from './Switch';

const meta: Meta<typeof MotadataSwitch> = {
  title: 'Components/Switch',
  component: MotadataSwitch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'A switch turns one thing on or off, and the change lands the moment it is flipped.',
          'There is no Save behind it, and there must not be one.',
          '',
          '| The question | The control |',
          '| --- | --- |',
          '| It takes effect at once - a setting, a feature, an expiry | `Switch` |',
          '| It is a choice inside a form and lands when the form is submitted | `Checkbox` |',
          '| One of several, and only one | `Radio` |',
          '',
          '**One pill, three sizes.** Fully rounded, never a corner radius (Pranjal, 2026-09-22).',
          '`sm` is 20 × 36 for a table cell, `md` is 24 × 44 everywhere else and the default,',
          '`lg` is 28 × 56. The track is the input grey off and the primary ink on; the thumb is',
          'white with a soft shadow and travels in 150ms. Hover takes the track a step darker;',
          'keyboard focus draws a 2px ring, 2px out; disabled is 50%.',
          '',
          '**Where it sits.** At the *left* of its label in a plain settings list; at the *right*',
          'when it governs a card or a row of text; alone and `sm` in a table cell, where the',
          'column heading names it.',
        ].join('\n'),
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

const CAPTION = 'mdt-text-xs mdt-text-muted-foreground';

const SIZES = [
  { size: 'sm', caption: 'sm · 20 × 36 · thumb 16' },
  { size: 'md', caption: 'md · 24 × 44 · thumb 20 · default' },
  { size: 'lg', caption: 'lg · 28 × 56 · thumb 24' },
] as const;

/** The static focus look, for the page: the library's 2px ring with a 2px offset. */
const FOCUS_DRAWN = 'mdt-ring-2 mdt-ring-ring mdt-ring-offset-2 mdt-ring-offset-background';

/**
 * The playground: the default switch, `md` and off. Use the controls to try a size, a checked
 * start and disabled. Every other story on this page shows a rule; this one is for trying things.
 */
export const Default: Story = {
  args: {
    'aria-label': 'Toggle setting',
  },
};

/**
 * The three sizes, off, with their numbers: `sm` 20 × 36 with a 16 thumb, `md` 24 × 44 with a
 * 20 thumb (the default), `lg` 28 × 56 with a 24 thumb. All three are the same pill - a 2px
 * transparent border inside a fully rounded track, the thumb 2 in from the edge, travelling the
 * track's width minus its own. `sm` is for a table cell; `md` is everywhere else; `lg` only when
 * the switch has to carry a whole page. There is no fourth size: 20 already fits a 44 row.
 */
export const Sizes: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-end mdt-gap-8">
      {SIZES.map((s) => (
        <div key={s.size} className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
          <MotadataSwitch size={s.size} aria-label={`${s.size} switch`} />
          <span className={CAPTION}>{s.caption}</span>
        </div>
      ))}
    </div>
  ),
};

/**
 * Every state, at `md`. Rest, then hover: the track goes a step darker so the pointer gets an
 * answer - the off grey climbs one step up the neutral ramp, the on ink eases to 90%. Focus is
 * the library's 2px ring with a 2px offset, keyboard only, the same recipe the Checkbox wears.
 * Disabled is 50% with a not-allowed cursor, on or off. The hover and focus rows are drawn so
 * the page can show them; move the pointer over any switch, or Tab to one, for the real thing.
 */
export const States: Story = {
  render: () => (
    <div className="mdt-grid mdt-grid-cols-[120px_auto_auto] mdt-items-center mdt-gap-x-6 mdt-gap-y-4">
      <span />
      <span className={CAPTION}>off</span>
      <span className={CAPTION}>on</span>

      <span className={CAPTION}>Rest</span>
      <MotadataSwitch aria-label="Off" />
      <MotadataSwitch defaultChecked aria-label="On" />

      <span className={CAPTION}>Hover · drawn</span>
      <MotadataSwitch
        aria-label="Off, hovered"
        className="data-[state=unchecked]:mdt-bg-[#B9C3D4]"
      />
      <MotadataSwitch
        defaultChecked
        aria-label="On, hovered"
        className="data-[state=checked]:mdt-bg-primary/90"
      />

      <span className={CAPTION}>Focus · drawn</span>
      <MotadataSwitch aria-label="Off, focused" className={FOCUS_DRAWN} />
      <MotadataSwitch defaultChecked aria-label="On, focused" className={FOCUS_DRAWN} />

      <span className={CAPTION}>Disabled</span>
      <MotadataSwitch disabled aria-label="Off, disabled" />
      <MotadataSwitch disabled defaultChecked aria-label="On, disabled" />
    </div>
  ),
};

/**
 * A plain setting: the switch first, then its label, 10 apart, on one centre line. The label is
 * the library's `FormLabel`, wired with `htmlFor` so clicking the words flips the switch too.
 * This is the left-hand placement - a settings list, or a single option in a form step
 * ("Access to all organisations", "VIP"). `md`.
 */
export const InASettingRow: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-2.5">
      <MotadataSwitch id="setting-row-switch" defaultChecked />
      <FormLabel htmlFor="setting-row-switch">Enable notifications</FormLabel>
    </div>
  ),
};

/**
 * The switch governs a card: the title and its helper line at the left, the switch at the right,
 * the two centred on one line. This is the console's expiry card (Add access step 2, Change
 * expiry, Add holders): off means permanent, on reveals the date. `md`, in a `Card` with
 * `surface="outline"`. The rule: when the switch rules a block of text, it sits at the right.
 */
export const InACard: Story = {
  render: () => (
    <Card surface="outline" className="mdt-w-[440px]">
      <CardBody>
        <div className="mdt-flex mdt-items-center mdt-justify-between mdt-gap-4">
          <div className="mdt-flex mdt-min-w-0 mdt-flex-col mdt-gap-1">
            <FormLabel htmlFor="expiry-switch" weight="medium">
              Set an expiry
            </FormLabel>
            <span className={CAPTION}>
              Off means permanent access: it stays until someone revokes it.
            </span>
          </div>
          <MotadataSwitch id="expiry-switch" />
        </div>
      </CardBody>
    </Card>
  ),
};

const FIELD_WIDTHS = [220, 140, 160];

const FIELDS = [
  { id: 'employee-id', name: 'Employee ID', required: true, shown: false },
  { id: 'cost-centre', name: 'Cost centre', required: false, shown: true },
  { id: 'department', name: 'Department', required: true, shown: true },
];

/**
 * In a table cell the switch is `sm` and sits alone - no label beside it, because the column
 * heading already names it. This is the Field drawer's Required and Shown-in-list columns, in
 * the library's own `Table`: its 54 row leaves the 20-high pill clear above and below.
 */
export const InATableRow: Story = {
  render: () => (
    <Table label="Fields" expand={false} className="mdt-w-[580px]">
      <TableViewport tableWidth={FIELD_WIDTHS.reduce((a, b) => a + b, 60)}>
        <TableColGroup widths={FIELD_WIDTHS} />
        <TableHeader>
          <tr>
            <TableHead columnKey="field" label="Field" width={220} />
            <TableHead columnKey="required" label="Required" width={140} />
            <TableHead columnKey="shown" label="Shown in list" width={160} />
            <TableTailCell head />
          </tr>
        </TableHeader>
        <TableBody>
          {FIELDS.map((f) => (
            <TableRow key={f.id}>
              <TableCell>{f.name}</TableCell>
              <TableCell>
                <MotadataSwitch
                  size="sm"
                  defaultChecked={f.required}
                  aria-label={`${f.name} is required`}
                />
              </TableCell>
              <TableCell>
                <MotadataSwitch
                  size="sm"
                  defaultChecked={f.shown}
                  aria-label={`${f.name} is shown in the list`}
                />
              </TableCell>
              <TableTailCell />
            </TableRow>
          ))}
        </TableBody>
      </TableViewport>
    </Table>
  ),
};

/**
 * Controlled: the page owns the value through `checked` and `onCheckedChange`, so something
 * else on the page can flip it too. The switch itself looks and behaves exactly as before.
 */
export const Controlled: Story = {
  render: function ControlledSwitch() {
    const [checked, setChecked] = useState(false);

    return (
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-4">
        <div className="mdt-flex mdt-items-center mdt-gap-2.5">
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
 * A list of settings in one panel: every row puts its label and help at the left and its
 * switch at the right - the card rule, repeated down a list. Each change lands at once; there
 * is no Save button, and there must not be one.
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
 * A switch still submits with a form - `name`, `value` and `required` all work through the
 * hidden input Radix renders - for a set-up step that is one form and posts its switches with
 * it. Two-factor sign-in is `required` here, so Continue stays off until it is on. This is not a
 * place for a consent line ("I agree to the terms"): that is a choice, not a setting, and it is
 * a Checkbox.
 */
export const FormIntegration: Story = {
  render: function FormIntegrationExample() {
    const [formData, setFormData] = useState({
      twoFactor: false,
      digest: true,
      news: false,
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
          Sign-in and mail
        </h3>

        <div className="mdt-space-y-4">
          <div className="mdt-flex mdt-items-center mdt-justify-between mdt-gap-4">
            <div className="mdt-flex mdt-flex-col mdt-gap-1">
              <FormLabel htmlFor="two-factor-switch" weight="medium" required>
                Two-factor sign-in
              </FormLabel>
              <span className={CAPTION}>Required by the organisation&apos;s policy.</span>
            </div>
            <MotadataSwitch
              id="two-factor-switch"
              name="twoFactor"
              required
              checked={formData.twoFactor}
              onCheckedChange={(checked) => {
                setFormData((prev) => ({ ...prev, twoFactor: checked }));
              }}
            />
          </div>

          <div className="mdt-flex mdt-items-center mdt-justify-between mdt-gap-4">
            <div className="mdt-flex mdt-flex-col mdt-gap-1">
              <FormLabel htmlFor="digest-switch" weight="medium">
                Weekly digest
              </FormLabel>
              <span className={CAPTION}>One mail on Monday with the week&apos;s changes.</span>
            </div>
            <MotadataSwitch
              id="digest-switch"
              name="digest"
              checked={formData.digest}
              onCheckedChange={(checked) => {
                setFormData((prev) => ({ ...prev, digest: checked }));
              }}
            />
          </div>

          <div className="mdt-flex mdt-items-center mdt-justify-between mdt-gap-4">
            <div className="mdt-flex mdt-flex-col mdt-gap-1">
              <FormLabel htmlFor="news-switch" weight="medium">
                Product news
              </FormLabel>
              <span className={CAPTION}>New features, about once a month.</span>
            </div>
            <MotadataSwitch
              id="news-switch"
              name="news"
              checked={formData.news}
              onCheckedChange={(checked) => {
                setFormData((prev) => ({ ...prev, news: checked }));
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!formData.twoFactor}
          className="mdt-w-full mdt-rounded mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90 disabled:mdt-cursor-not-allowed disabled:mdt-opacity-50"
        >
          Continue
        </button>
      </form>
    );
  },
};

/**
 * Every size in both states, and disabled, in one grid - what the visual tests read. The rule
 * it shows is that nothing but the size changes between the three: same pill, same colours,
 * same travel.
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
