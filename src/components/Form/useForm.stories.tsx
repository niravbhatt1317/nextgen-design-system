import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Input } from '../Input';
import { MotadataSwitch } from '../Switch';
import { Form } from './Form';
import { useForm } from './useForm';

/**
 * The rules a form follows, and the one that decides whether Save is on.
 *
 * `useForm` holds one form's values, its checks and its Save rule. The stories
 * below each isolate one rule, because every one of them is a decision a form
 * would otherwise make differently each time it is built: when Save turns on,
 * when a message is allowed to appear, where focus goes when a submit fails.
 *
 * The readout under each form is the hook's own state, not a copy of it.
 */
const meta: Meta = {
  title: 'New Components/Form/useForm',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof meta>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PANEL = 'mdt-flex mdt-max-w-md mdt-flex-col mdt-gap-4';
const READOUT = 'mdt-rounded-md mdt-bg-muted mdt-p-3 mdt-font-mono mdt-text-xs mdt-text-foreground';

/** The hook's state, shown as it is. Every story ends with one of these. */
const Readout = ({ rows }: { rows: readonly (readonly [string, boolean | string])[] }) => (
  <dl className={READOUT}>
    {rows.map(([label, value]) => (
      <div key={label} className="mdt-flex mdt-justify-between mdt-gap-4">
        <dt>{label}</dt>
        <dd>{typeof value === 'boolean' ? String(value) : value}</dd>
      </div>
    ))}
  </dl>
);

/**
 * **Save waits for three things at once**: something has changed, every required
 * field holds a value, and no submit is already running. That is `canSubmit`.
 *
 * Type into Name and Save turns on. Delete what you typed, back to "Helpdesk
 * Access", and it turns off again — the form compares against where it started,
 * not against whether you have touched it.
 */
const SaveRuleDemo = () => {
  const form = useForm({
    initialValues: { name: 'Helpdesk Access', owner: 'sarah@example.com' },
    rules: { name: { required: 'Enter a name' }, owner: { required: true } },
    onSubmit: () => undefined,
  });
  return (
    <div className={PANEL}>
      <Form id="save-rule" onSubmit={form.handleSubmit}>
        <Input label="Name" {...form.field('name')} />
        <Input label="Owner" {...form.field('owner')} />
      </Form>
      <Button type="submit" form="save-rule" disabled={!form.canSubmit}>
        Save changes
      </Button>
      <Readout
        rows={[
          ['dirty', form.dirty],
          ['requiredFilled', form.requiredFilled],
          ['canSubmit', form.canSubmit],
        ]}
      />
    </div>
  );
};

export const TheSaveRule: Story = { render: () => <SaveRuleDemo /> };

/**
 * **A message waits until you leave the field.** Typing a half-written address is
 * not yet a mistake, so nothing is said while you are still in it. Leave the
 * field — or press Save — and the message appears.
 *
 * Try it: type `sarah@` in Recovery email and stay there. Nothing. Tab away.
 */
const BlurDemo = () => {
  const form = useForm({
    initialValues: { recovery: '' },
    rules: {
      recovery: {
        required: 'Enter a recovery address',
        validate: (v) => (EMAIL.test(v) ? undefined : 'Enter a valid email address'),
      },
    },
    onSubmit: () => undefined,
  });
  return (
    <div className={PANEL}>
      <Form id="blur" onSubmit={form.handleSubmit}>
        <Input label="Recovery email" {...form.field('recovery')} />
      </Form>
      <Readout
        rows={[
          ['valid', form.valid],
          ['showing a message', form.errors.recovery ?? '—'],
        ]}
      />
    </div>
  );
};

export const MessagesWaitForBlur: Story = { render: () => <BlurDemo /> };

/**
 * **A failed submit puts focus on the first field with a problem.** Press Save
 * without filling anything: every message appears at once, and the caret lands
 * in Full name rather than leaving you to hunt for what is wrong.
 *
 * The order is the order of the `rules`, not the order of the markup.
 */
const FocusDemo = () => {
  const form = useForm({
    initialValues: { fullName: '', jobTitle: '', recovery: '' },
    rules: {
      fullName: { required: 'Enter a full name' },
      jobTitle: { required: true },
      recovery: { validate: (v) => (v === '' || EMAIL.test(v) ? undefined : 'Not an email') },
    },
    onSubmit: () => undefined,
  });
  return (
    <div className={PANEL}>
      <Form id="focus" onSubmit={form.handleSubmit}>
        <Input label="Full name" {...form.field('fullName')} />
        <Input label="Job title" {...form.field('jobTitle')} />
        <Input label="Recovery email" {...form.field('recovery')} />
      </Form>
      <Button type="submit" form="focus">
        Save changes
      </Button>
      <Readout rows={[['messages showing', String(Object.keys(form.errors).length)]]} />
    </div>
  );
};

export const SubmitFocusesTheFirstProblem: Story = { render: () => <FocusDemo /> };

/**
 * **Required can depend on another answer.** Give `required` a function and it is
 * asked again on every change.
 *
 * Here Organizations is required only while "All organizations" is off. Turn the
 * switch on and the requirement — and its message — go away.
 */
const DependsDemo = () => {
  const form = useForm({
    initialValues: { all: false, orgs: '' },
    rules: { orgs: { required: (v) => (v.all ? false : 'Pick at least one organization') } },
    onSubmit: () => undefined,
  });
  return (
    <div className={PANEL}>
      <div className="mdt-flex mdt-items-center mdt-gap-3">
        <MotadataSwitch
          checked={form.values.all}
          onCheckedChange={(next) => {
            form.setValue('all', next);
          }}
        />
        <span className="mdt-text-sm">All organizations</span>
      </div>
      <Form id="depends" onSubmit={form.handleSubmit}>
        <Input label="Organizations" {...form.field('orgs')} />
      </Form>
      <Readout
        rows={[
          ['orgs required', form.values.all ? 'no' : 'yes'],
          ['requiredFilled', form.requiredFilled],
          ['canSubmit', form.canSubmit],
        ]}
      />
    </div>
  );
};

export const RequiredThatDepends: Story = { render: () => <DependsDemo /> };

/**
 * **A slow save keeps Save busy, and a finished one moves the goalposts.**
 *
 * `onSubmit` returning a promise holds `submitting` true until it settles, and
 * `canSubmit` is false throughout. After it resolves, `reset(values)` makes what
 * was just saved the new starting point — so Save goes quiet again rather than
 * offering to save the same thing twice.
 */
const BusyDemo = () => {
  const form = useForm({
    initialValues: { name: 'Helpdesk Access' },
    rules: { name: { required: true } },
    onSubmit: (values) =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          form.reset(values);
          resolve();
        }, 1200);
      }),
  });
  return (
    <div className={PANEL}>
      <Form id="busy" onSubmit={form.handleSubmit}>
        <Input label="Name" {...form.field('name')} />
      </Form>
      <Button type="submit" form="busy" disabled={!form.canSubmit} loading={form.submitting}>
        {form.submitting ? 'Saving' : 'Save changes'}
      </Button>
      <Readout
        rows={[
          ['dirty', form.dirty],
          ['submitting', form.submitting],
          ['canSubmit', form.canSubmit],
        ]}
      />
    </div>
  );
};

export const SubmittingThenReset: Story = { render: () => <BusyDemo /> };
