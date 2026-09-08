import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TableScopeMenu } from './TableScopeMenu';

function setup(overrides: Partial<Parameters<typeof TableScopeMenu>[0]> = {}) {
  const onApply = vi.fn();
  const onOpenChange = vi.fn();
  const anchor = document.createElement('button');
  document.body.appendChild(anchor);

  const props = {
    open: true,
    onOpenChange,
    anchor,
    pageCount: 25,
    allCount: 1240,
    noun: 'people',
    onApply,
    ...overrides,
  };

  const view = render(<TableScopeMenu {...props} />);
  return { ...view, onApply, onOpenChange, user: userEvent.setup() };
}

const radio = (name: RegExp | string) => screen.getByRole('radio', { name });

describe('TableScopeMenu', () => {
  it('offers this page, everything, and a number you type', () => {
    setup();
    expect(radio(/select this page/i)).toBeInTheDocument();
    expect(radio(/select all people/i)).toBeInTheDocument();
    expect(radio(/custom/i)).toBeInTheDocument();
  });

  it('names the thing being selected', () => {
    setup({ noun: 'incidents' });
    expect(radio(/select all incidents/i)).toBeInTheDocument();
  });

  it('shows the counts with thousands separators', () => {
    setup();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('1,240')).toBeInTheDocument();
  });

  it('starts on this page', () => {
    setup();
    expect(radio(/select this page/i)).toHaveAttribute('aria-checked', 'true');
    expect(radio(/select all people/i)).toHaveAttribute('aria-checked', 'false');
  });

  it('moves the choice when another option is picked', async () => {
    const { user } = setup();
    await user.click(radio(/select all people/i));

    expect(radio(/select all people/i)).toHaveAttribute('aria-checked', 'true');
    expect(radio(/select this page/i)).toHaveAttribute('aria-checked', 'false');
  });

  it('shows no number field until Custom is chosen', () => {
    setup();
    expect(screen.queryByLabelText('How many')).not.toBeInTheDocument();
  });

  it('shows the number field once Custom is chosen', async () => {
    const { user } = setup();
    await user.click(radio(/custom/i));

    expect(screen.getByLabelText('How many')).toBeInTheDocument();
  });

  describe('applying', () => {
    it('applies this page', async () => {
      const { user, onApply, onOpenChange } = setup();
      await user.click(screen.getByRole('button', { name: 'Apply' }));

      expect(onApply).toHaveBeenCalledWith('page', 25);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('applies everything', async () => {
      const { user, onApply } = setup();
      await user.click(radio(/select all people/i));
      await user.click(screen.getByRole('button', { name: 'Apply' }));

      expect(onApply).toHaveBeenCalledWith('all', 1240);
    });

    it('applies the number typed', async () => {
      const { user, onApply } = setup();
      await user.click(radio(/custom/i));
      const field = screen.getByLabelText('How many');
      await user.clear(field);
      await user.type(field, '300');
      await user.click(screen.getByRole('button', { name: 'Apply' }));

      expect(onApply).toHaveBeenCalledWith('custom', 300);
    });

    // Typing more than exists should not select more than exists.
    it('never applies more than the total', async () => {
      const { user, onApply } = setup();
      await user.click(radio(/custom/i));
      const field = screen.getByLabelText('How many');
      await user.clear(field);
      await user.type(field, '99999');
      await user.click(screen.getByRole('button', { name: 'Apply' }));

      expect(onApply).toHaveBeenCalledWith('custom', 1240);
    });

    it('treats a number that is not one as none', async () => {
      const { user, onApply } = setup();
      await user.click(radio(/custom/i));
      const field = screen.getByLabelText('How many');
      await user.clear(field);
      await user.type(field, 'abc');
      await user.click(screen.getByRole('button', { name: 'Apply' }));

      expect(onApply).toHaveBeenCalledWith('custom', 0);
    });

    it('treats an empty field as none', async () => {
      const { user, onApply } = setup();
      await user.click(radio(/custom/i));
      await user.clear(screen.getByLabelText('How many'));
      await user.click(screen.getByRole('button', { name: 'Apply' }));

      expect(onApply).toHaveBeenCalledWith('custom', 0);
    });

    it('never applies a negative number', async () => {
      const { user, onApply } = setup();
      await user.click(radio(/custom/i));
      const field = screen.getByLabelText('How many');
      await user.clear(field);
      await user.type(field, '-40');
      await user.click(screen.getByRole('button', { name: 'Apply' }));

      expect(onApply).toHaveBeenCalledWith('custom', 0);
    });

    it('applies on Enter in the number field', async () => {
      const { user, onApply, onOpenChange } = setup();
      await user.click(radio(/custom/i));
      const field = screen.getByLabelText('How many');
      await user.clear(field);
      await user.type(field, '50{Enter}');

      expect(onApply).toHaveBeenCalledWith('custom', 50);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('does not apply on other keys', async () => {
      const { user, onApply } = setup();
      await user.click(radio(/custom/i));
      await user.type(screen.getByLabelText('How many'), '5');

      expect(onApply).not.toHaveBeenCalled();
    });

    // The field sits inside the radio button, so a click that reached the
    // button would flip the choice away from Custom mid-edit.
    it('does not change the choice when the field is clicked', async () => {
      const { user } = setup();
      await user.click(radio(/custom/i));
      await user.click(screen.getByLabelText('How many'));

      expect(radio(/custom/i)).toHaveAttribute('aria-checked', 'true');
      expect(screen.getByLabelText('How many')).toBeInTheDocument();
    });
  });

  it('closes without applying when cancelled', async () => {
    const { user, onApply, onOpenChange } = setup();
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(onApply).not.toHaveBeenCalled();
  });

  it('renders nothing while closed', () => {
    setup({ open: false });
    expect(screen.queryByRole('radio')).not.toBeInTheDocument();
  });

  // Reopening should not resume a choice made and abandoned last time.
  it('returns to this page each time it opens', async () => {
    const { user, rerender, onOpenChange, onApply } = setup();
    await user.click(radio(/select all people/i));
    expect(radio(/select all people/i)).toHaveAttribute('aria-checked', 'true');

    const anchor = document.createElement('button');
    const props = {
      onOpenChange,
      anchor,
      pageCount: 25,
      allCount: 1240,
      noun: 'people',
      onApply,
    };
    rerender(<TableScopeMenu {...props} open={false} />);
    rerender(<TableScopeMenu {...props} open />);

    expect(radio(/select this page/i)).toHaveAttribute('aria-checked', 'true');
  });
});
