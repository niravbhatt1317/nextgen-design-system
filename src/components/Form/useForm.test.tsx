import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from './Form';
import { useForm } from './useForm';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Profile = ({
  onSubmit = vi.fn(),
  initial = { name: 'Sarah', email: '', tags: [] as string[], vip: false },
}: {
  onSubmit?: (values: Record<string, unknown>) => unknown;
  initial?: { name: string; email: string; tags: string[]; vip: boolean };
}) => {
  const form = useForm({
    initialValues: initial,
    rules: {
      name: { required: 'Enter a name' },
      email: {
        required: true,
        validate: (v) => (EMAIL.test(v) ? undefined : 'Enter a valid email'),
      },
      tags: { validate: (v) => (v.length > 2 ? 'Three at most' : undefined) },
    },
    onSubmit,
  });
  return (
    <>
      <Form id="profile" onSubmit={form.handleSubmit}>
        {(['name', 'email'] as const).map((n) => {
          const f = form.field(n);
          return (
            <div key={n}>
              <label htmlFor={f.id}>{n}</label>
              <input {...f} value={f.value} />
              {f.error && <p>{f.error}</p>}
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => {
            form.setValue('tags', ['a', 'b', 'c']);
          }}
        >
          Many tags
        </button>
        <button
          type="button"
          onClick={() => {
            form.field('vip').onChange(true);
          }}
        >
          VIP
        </button>
        <button
          type="button"
          onClick={() => {
            form.reset();
          }}
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => {
            form.reset({ ...initial, name: 'Saved' });
          }}
        >
          Saved
        </button>
      </Form>
      <button type="submit" form="profile" disabled={!form.canSubmit}>
        Save changes
      </button>
      <output>{`${String(form.dirty)} ${String(form.valid)} ${String(form.requiredFilled)} ${String(form.submitting)}`}</output>
    </>
  );
};

const save = () => screen.getByRole('button', { name: 'Save changes' });
const state = () => screen.getByRole('status').textContent;

describe('useForm', () => {
  it('holds Save until something changes and every required field is filled', async () => {
    render(<Profile />);
    expect(save()).toBeDisabled();
    await userEvent.type(screen.getByLabelText('email'), 'x');
    expect(save()).toBeEnabled();
    await userEvent.clear(screen.getByLabelText('name'));
    expect(save()).toBeDisabled();
    expect(state()).toBe('true false false false');
  });

  it('turns Save off again when the value is typed back to where it started', async () => {
    render(<Profile initial={{ name: 'Sarah', email: 'a@b.co', tags: [], vip: false }} />);
    await userEvent.type(screen.getByLabelText('name'), 'h');
    expect(save()).toBeEnabled();
    await userEvent.type(screen.getByLabelText('name'), '{Backspace}');
    expect(save()).toBeDisabled();
  });

  it('shows a format message when the field is left, not while typing', async () => {
    render(<Profile />);
    await userEvent.type(screen.getByLabelText('email'), 'nope');
    expect(screen.queryByText('Enter a valid email')).toBeNull();
    await userEvent.tab();
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
    expect(screen.getByLabelText('email')).toHaveAttribute('aria-invalid', 'true');
    await userEvent.clear(screen.getByLabelText('email'));
    await userEvent.type(screen.getByLabelText('email'), 'a@b.co');
    expect(screen.queryByText('Enter a valid email')).toBeNull();
  });

  it('on a submit with a problem shows every message and focuses the first field that has one', async () => {
    const onSubmit = vi.fn();
    render(
      <Profile
        onSubmit={onSubmit}
        initial={{ name: 'Sarah', email: 'bad', tags: [], vip: false }}
      />
    );
    screen.getByRole('button', { name: 'Many tags' }).click();
    await userEvent.click(screen.getByRole('button', { name: 'VIP' }));
    expect(save()).toBeEnabled();
    await userEvent.click(save());
    expect(onSubmit).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByLabelText('email')).toHaveFocus();
    });
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
  });

  it('keeps Save off while a required field is empty, and says so when the field is left', async () => {
    render(<Profile />);
    await userEvent.clear(screen.getByLabelText('name'));
    await userEvent.tab();
    expect(screen.getByText('Enter a name')).toBeInTheDocument();
    expect(save()).toBeDisabled();
  });

  it('says Required when the rule gives no message, and submits once all is well', async () => {
    const onSubmit = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          setTimeout(resolve, 20);
        })
    );
    render(<Profile onSubmit={onSubmit} />);
    await userEvent.click(screen.getByLabelText('email'));
    await userEvent.tab();
    expect(screen.getByText('Required')).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText('email'), 'a@b.co');
    await userEvent.click(save());
    expect(onSubmit).toHaveBeenCalledWith({ name: 'Sarah', email: 'a@b.co', tags: [], vip: false });
    expect(state()).toContain('true');
    expect(save()).toBeDisabled();
    await waitFor(() => {
      expect(state()?.endsWith('false')).toBe(true);
    });
  });

  it('ends submitting when the submit rejects', async () => {
    const onSubmit = vi.fn(() => Promise.reject(new Error('down')));
    render(
      <Profile
        onSubmit={onSubmit}
        initial={{ name: 'Sarah', email: 'a@b.co', tags: [], vip: false }}
      />
    );
    await userEvent.type(screen.getByLabelText('name'), 'h');
    await userEvent.click(save());
    await waitFor(() => {
      expect(save()).toBeEnabled();
    });
  });

  it('resets to the start, or to saved values that become the new start', async () => {
    render(<Profile />);
    await userEvent.type(screen.getByLabelText('name'), 'x');
    await userEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByLabelText('name')).toHaveValue('Sarah');
    await userEvent.click(screen.getByRole('button', { name: 'Saved' }));
    expect(screen.getByLabelText('name')).toHaveValue('Saved');
    expect(state()?.startsWith('false')).toBe(true);
  });

  it('works without rules, and handleSubmit without an event', async () => {
    const onSubmit = vi.fn();
    const Bare = () => {
      const form = useForm({ initialValues: { note: '' }, onSubmit });
      return (
        <button
          type="button"
          onClick={() => {
            form.handleSubmit();
          }}
        >
          Go {String(form.field('note').required ?? 'optional')}
        </button>
      );
    };
    render(<Bare />);
    await userEvent.click(screen.getByRole('button', { name: 'Go optional' }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ note: '' });
    });
  });

  it('takes a required that depends on another value', async () => {
    const Orgs = () => {
      const form = useForm({
        initialValues: { all: false, orgs: ['acme'] as string[] },
        rules: { orgs: { required: (v) => (v.all ? false : 'Pick an organization') } },
        onSubmit: vi.fn(),
      });
      return (
        <>
          <button
            type="button"
            onClick={() => {
              form.setValue('orgs', []);
            }}
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => {
              form.setValue('all', true);
            }}
          >
            All
          </button>
          <output>{`${String(form.requiredFilled)} ${String(form.field('orgs').required ?? false)}`}</output>
        </>
      );
    };
    render(<Orgs />);
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.getByRole('status')).toHaveTextContent('false true');
    await userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByRole('status')).toHaveTextContent('true false');
  });
});
