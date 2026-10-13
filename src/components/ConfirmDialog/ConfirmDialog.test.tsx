import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ConfirmDialog } from './ConfirmDialog';
import type { ConfirmDialogProps } from './ConfirmDialog.types';

type HostProps = Partial<ConfirmDialogProps> & { startOpen?: boolean };

/** A controlled host, so closing really closes - as a page would hold it. */
function Host({ onOpenChange, startOpen = true, ...props }: HostProps) {
  const [open, setOpen] = useState(startOpen);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
        }}
      >
        Reopen
      </button>
      <ConfirmDialog
        title="Delete team"
        confirmLabel="Delete team"
        onConfirm={() => undefined}
        {...props}
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          onOpenChange?.(next);
        }}
      />
    </>
  );
}

const deferred = () => {
  let resolve: (value: boolean | undefined) => void = () => undefined;
  let reject: (reason: unknown) => void = () => undefined;
  const promise = new Promise<boolean | undefined>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

describe('ConfirmDialog', () => {
  describe('rendering', () => {
    it('shows the title, the body and both buttons', () => {
      render(
        <Host>
          This will permanently delete <b>Platform</b>.
        </Host>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Delete team' })).toBeInTheDocument();
      expect(screen.getByText('Platform')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Delete team' })).toBeInTheDocument();
    });

    it('renders nothing while closed', () => {
      render(<Host startOpen={false} />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('shows the description under the title and is described by it', () => {
      render(<Host description="Roles are definitions.">Body text here</Host>);
      const dialog = screen.getByRole('dialog');
      expect(screen.getByText('Roles are definitions.')).toBeInTheDocument();
      expect(dialog).toHaveAccessibleDescription('Roles are definitions.');
    });

    it('is described by its body when there is no description', () => {
      render(<Host>Access ends at once.</Host>);
      expect(screen.getByRole('dialog')).toHaveAccessibleDescription('Access ends at once.');
    });

    it('renders with neither a description nor a body', () => {
      render(<Host />);
      expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-describedby');
    });

    it('takes a custom Cancel label', () => {
      render(<Host cancelLabel="Keep it" />);
      expect(screen.getByRole('button', { name: 'Keep it' })).toBeInTheDocument();
    });

    it('hides Cancel for a one-button notice', () => {
      render(<Host hideCancel confirmLabel="Got it" />);
      expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Got it' })).toHaveFocus();
    });

    it('takes the md width and a class', () => {
      render(<Host width="md" className="extra-class" />);
      expect(screen.getByRole('dialog')).toHaveClass('extra-class');
    });
  });

  describe('the bin', () => {
    const hasSvg = (name: string) =>
      screen.getByRole('button', { name }).querySelector('svg') !== null;

    it('sits on a destructive delete verb', () => {
      render(<Host tone="destructive" confirmLabel="Delete team" />);
      expect(hasSvg('Delete team')).toBe(true);
    });

    it('sits on Permanently delete and Remove', () => {
      const { unmount } = render(<Host tone="destructive" confirmLabel="Permanently delete" />);
      expect(hasSvg('Permanently delete')).toBe(true);
      unmount();
      render(<Host tone="destructive" confirmLabel="Remove member" />);
      expect(hasSvg('Remove member')).toBe(true);
    });

    it('needs the whole verb, not a word that starts with it', () => {
      render(<Host tone="destructive" confirmLabel="Deletes nothing" />);
      expect(hasSvg('Deletes nothing')).toBe(false);
    });

    it('stays off a destructive Revoke', () => {
      render(<Host tone="destructive" confirmLabel="Revoke access" />);
      expect(hasSvg('Revoke access')).toBe(false);
    });

    it('stays off a default-tone delete', () => {
      render(<Host confirmLabel="Delete & reassign" />);
      expect(hasSvg('Delete & reassign')).toBe(false);
    });

    it('can be taken away with null', () => {
      render(<Host tone="destructive" confirmIcon={null} confirmLabel="Delete user" />);
      expect(hasSvg('Delete user')).toBe(false);
    });

    it('can be replaced', () => {
      render(
        <Host confirmIcon={<span data-testid="own-glyph" />} confirmLabel="Archive attribute" />
      );
      expect(screen.getByTestId('own-glyph')).toBeInTheDocument();
    });
  });

  describe('confirming', () => {
    it('runs the action and closes', async () => {
      const user = userEvent.setup();
      const onConfirm = vi.fn();
      const onOpenChange = vi.fn();
      const onCancel = vi.fn();
      render(<Host onConfirm={onConfirm} onOpenChange={onOpenChange} onCancel={onCancel} />);
      await user.click(screen.getByRole('button', { name: 'Delete team' }));
      expect(onConfirm).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(false);
      expect(onCancel).not.toHaveBeenCalled();
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('stays open when the action returns false', async () => {
      const user = userEvent.setup();
      render(<Host onConfirm={() => false} />);
      await user.click(screen.getByRole('button', { name: 'Delete team' }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('stays open when the action throws', async () => {
      const user = userEvent.setup();
      render(
        <Host
          onConfirm={() => {
            throw new Error('nope');
          }}
        />
      );
      await user.click(screen.getByRole('button', { name: 'Delete team' }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('is busy while a promise runs, and holds every way out shut', async () => {
      const user = userEvent.setup();
      const pending = deferred();
      const onCancel = vi.fn();
      render(<Host onConfirm={() => pending.promise} onCancel={onCancel} />);
      const action = screen.getByRole('button', { name: /Delete team/ });
      await user.click(action);

      expect(action).toHaveAttribute('aria-busy', 'true');
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
      await user.keyboard('{Escape}');
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(onCancel).not.toHaveBeenCalled();

      await act(async () => {
        pending.resolve(undefined);
        await pending.promise;
      });
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('comes back from busy and stays open when the promise rejects', async () => {
      const user = userEvent.setup();
      const pending = deferred();
      render(<Host onConfirm={() => pending.promise} />);
      const action = screen.getByRole('button', { name: /Delete team/ });
      await user.click(action);
      expect(action).toHaveAttribute('aria-busy', 'true');

      await act(async () => {
        pending.reject(new Error('server said no'));
        await pending.promise.catch(() => undefined);
      });
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(action).not.toHaveAttribute('aria-busy');
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeEnabled();
    });

    it('stays open when the promise resolves false', async () => {
      const user = userEvent.setup();
      render(<Host onConfirm={() => Promise.resolve(false)} />);
      await user.click(screen.getByRole('button', { name: 'Delete team' }));
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Delete team' })).not.toHaveAttribute(
          'aria-busy'
        );
      });
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('is locked by confirmDisabled', async () => {
      const user = userEvent.setup();
      const onConfirm = vi.fn();
      render(<Host confirmDisabled onConfirm={onConfirm} />);
      const action = screen.getByRole('button', { name: 'Delete team' });
      expect(action).toBeDisabled();
      await user.click(action);
      expect(onConfirm).not.toHaveBeenCalled();
    });
  });

  describe('cancelling', () => {
    it('Cancel calls onCancel and closes', async () => {
      const user = userEvent.setup();
      const onCancel = vi.fn();
      const onConfirm = vi.fn();
      render(<Host onCancel={onCancel} onConfirm={onConfirm} />);
      await user.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(onCancel).toHaveBeenCalledTimes(1);
      expect(onConfirm).not.toHaveBeenCalled();
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('Escape is a cancel too', async () => {
      const user = userEvent.setup();
      const onCancel = vi.fn();
      render(<Host onCancel={onCancel} />);
      await user.keyboard('{Escape}');
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('the close button is a cancel too', async () => {
      const user = userEvent.setup();
      const onCancel = vi.fn();
      render(<Host onCancel={onCancel} />);
      await user.click(screen.getByRole('button', { name: 'Close' }));
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('lands on Cancel when it opens', () => {
      render(<Host />);
      expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
    });

    it('works without onOpenChange or onCancel', async () => {
      const user = userEvent.setup();
      render(
        <ConfirmDialog open title="Bare" confirmLabel="Disable user" onConfirm={() => undefined} />
      );
      await user.click(screen.getByRole('button', { name: 'Cancel' }));
      await user.click(screen.getByRole('button', { name: 'Disable user' }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('typed word', () => {
    it('asks for the word and lands in the field', () => {
      render(<Host tone="destructive" typedWord="delete" />);
      const field = screen.getByLabelText('Type delete to confirm');
      expect(field).toHaveAttribute('placeholder', 'delete');
      expect(field).toHaveFocus();
    });

    it('keeps the action locked until the word matches', async () => {
      const user = userEvent.setup();
      const onConfirm = vi.fn();
      render(<Host tone="destructive" typedWord="delete" onConfirm={onConfirm} />);
      const action = screen.getByRole('button', { name: 'Delete team' });
      const field = screen.getByLabelText('Type delete to confirm');

      expect(action).toBeDisabled();
      await user.type(field, 'delet');
      expect(action).toBeDisabled();
      await user.type(field, 'e');
      expect(action).toBeEnabled();
      await user.click(action);
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('takes a pasted word, ignoring case and a trailing space', async () => {
      const user = userEvent.setup();
      render(<Host tone="destructive" typedWord="delete" />);
      await user.click(screen.getByLabelText('Type delete to confirm'));
      await user.paste('DELETE ');
      expect(screen.getByRole('button', { name: 'Delete team' })).toBeEnabled();
    });

    it('still honours confirmDisabled once the word matches', async () => {
      const user = userEvent.setup();
      render(<Host tone="destructive" typedWord="delete" confirmDisabled />);
      await user.type(screen.getByLabelText('Type delete to confirm'), 'delete');
      expect(screen.getByRole('button', { name: 'Delete team' })).toBeDisabled();
    });

    it('starts empty again on the next open', async () => {
      const user = userEvent.setup();
      render(<Host tone="destructive" typedWord="delete" />);
      await user.type(screen.getByLabelText('Type delete to confirm'), 'delete');
      await user.click(screen.getByRole('button', { name: 'Cancel' }));
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
      await user.click(screen.getByRole('button', { name: 'Reopen' }));
      expect(screen.getByLabelText('Type delete to confirm')).toHaveValue('');
      expect(screen.getByRole('button', { name: 'Delete team' })).toBeDisabled();
    });

    it('treats a blank word as no word at all', () => {
      render(<Host typedWord="  " />);
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Delete team' })).toBeEnabled();
    });
  });
});
