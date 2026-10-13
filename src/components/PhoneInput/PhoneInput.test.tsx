import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { PhoneInput } from './PhoneInput';
import { joinPhone, phonePlaceholder, splitPhone } from './countries';

const trigger = () => document.querySelector('[data-phone-cc]') as HTMLButtonElement;

describe('PhoneInput', () => {
  describe('the field', () => {
    it('renders the label, the number and the country with its dial code', () => {
      render(<PhoneInput label="Phone" defaultValue={{ country: 'IN', number: '98765 43210' }} />);
      expect(screen.getByLabelText('Phone')).toHaveValue('98765 43210');
      expect(trigger()).toHaveTextContent('+91');
      expect(trigger()).toHaveAccessibleName(/India, \+91/);
    });

    it("hints the chosen country's own format", () => {
      render(<PhoneInput label="Phone" defaultValue={{ country: 'US', number: '' }} />);
      expect(screen.getByLabelText('Phone')).toHaveAttribute('placeholder', '(000) 000-0000');
    });

    it('splits a stored string into its parts', () => {
      render(<PhoneInput label="Phone" value="+44 20 7946 0958" />);
      expect(screen.getByLabelText('Phone')).toHaveValue('20 7946 0958');
      expect(trigger()).toHaveTextContent('+44');
    });

    it('shows the code tile without a flag, and the drawn flag when given one', () => {
      const { rerender } = render(<PhoneInput defaultValue={{ country: 'FR', number: '' }} />);
      expect(document.querySelector('[data-phone-flag-tile]')).toHaveTextContent('FR');
      rerender(
        <PhoneInput
          defaultValue={{ country: 'FR', number: '' }}
          renderFlag={(code) => <span data-testid={`flag-${code}`} />}
        />
      );
      expect(screen.getByTestId('flag-FR')).toBeInTheDocument();
    });

    it('shows a dash and the generic name with no country', () => {
      render(<PhoneInput defaultValue={{ country: '', number: '' }} />);
      expect(document.querySelector('[data-phone-flag-tile]')).toHaveTextContent('—');
      expect(trigger()).toHaveAccessibleName('Country code');
    });

    it('forwards the ref to the number input', () => {
      const ref = createRef<HTMLInputElement>();
      render(<PhoneInput ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toHaveAttribute('inputmode', 'tel');
    });
  });

  describe('help and error', () => {
    it('shows the error and keeps the country in the description', () => {
      render(
        <PhoneInput
          id="p"
          label="Phone"
          defaultValue={{ country: 'IN', number: '1' }}
          error="Enter a full phone number"
        />
      );
      expect(screen.getByRole('alert')).toHaveTextContent('Enter a full phone number');
      const input = screen.getByLabelText('Phone');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', 'p-cc-name p-error');
    });

    it('shows the helper text', () => {
      render(<PhoneInput label="Phone" helperText="Used for recovery" />);
      expect(screen.getByText('Used for recovery')).toBeInTheDocument();
    });
  });

  describe('changes', () => {
    it('reports the typed number with the joined phone', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <PhoneInput
          label="Phone"
          defaultValue={{ country: 'GB', number: '' }}
          onChange={onChange}
        />
      );
      await user.type(screen.getByLabelText('Phone'), '0');
      expect(onChange).toHaveBeenLastCalledWith({ country: 'GB', number: '0' }, '+44 0');
    });

    it('picks a country from the searchable list', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <PhoneInput
          label="Phone"
          defaultValue={{ country: 'US', number: '555 0100' }}
          onChange={onChange}
        />
      );
      await user.click(trigger());
      const search = await screen.findByPlaceholderText('Search');
      await user.type(search, 'Japan');
      await user.click(await screen.findByText('Japan', {}, { timeout: 8000 }));
      expect(onChange).toHaveBeenLastCalledWith(
        { country: 'JP', number: '555 0100' },
        '+81 555 0100'
      );
      await waitFor(() => {
        expect(trigger()).toHaveTextContent('+81');
      });
    }, 20000);

    it('says when no country matches', async () => {
      const user = userEvent.setup();
      render(<PhoneInput defaultValue={{ country: 'US', number: '' }} />);
      await user.click(trigger());
      await user.type(await screen.findByPlaceholderText('Search'), 'zzzz');
      expect(
        await screen.findByText('No country matches', {}, { timeout: 8000 })
      ).toBeInTheDocument();
    }, 20000);

    it('focuses the search box and widens the list on open', async () => {
      const user = userEvent.setup();
      render(<PhoneInput id="w" defaultValue={{ country: 'US', number: '' }} />);
      await user.click(trigger());
      const search = await screen.findByPlaceholderText('Search');
      await waitFor(() => {
        expect(search).toHaveFocus();
      });
      expect(document.getElementById('w-cc-listbox')).toHaveStyle({ width: '300px' });
    });
  });

  describe('held and disabled', () => {
    it('keeps the country closed when locked', () => {
      render(<PhoneInput label="Phone" defaultValue="+91 98765 43210" locked />);
      expect(screen.getByLabelText('Phone')).toBeDisabled();
      expect(trigger()).toBeDisabled();
    });

    it('disables both parts', () => {
      render(<PhoneInput label="Phone" disabled />);
      expect(screen.getByLabelText('Phone')).toBeDisabled();
      expect(trigger()).toBeDisabled();
    });
  });
});

describe('phone helpers', () => {
  it('splits by the longest dial code and the usual holder', () => {
    expect(splitPhone('+1868 555 0100')).toEqual({ country: 'TT', number: '555 0100' });
    expect(splitPhone('+1 212 555 0100')).toEqual({ country: 'US', number: '212 555 0100' });
    expect(splitPhone('+1 416 555 0100', 'CA')).toEqual({ country: 'CA', number: '416 555 0100' });
    expect(splitPhone('020 7946', 'GB')).toEqual({ country: 'GB', number: '020 7946' });
    expect(splitPhone('', 'IN')).toEqual({ country: 'IN', number: '' });
  });

  it('joins with the trunk 0 dropped outside the NANP', () => {
    expect(joinPhone('GB', '020 7946 0958')).toBe('+44 20 7946 0958');
    expect(joinPhone('US', '0123')).toBe('+1 0123');
    expect(joinPhone('GB', '')).toBe('');
    expect(joinPhone('ZZ', '123')).toBe('123');
  });

  it('falls back to the generic format', () => {
    expect(phonePlaceholder('ZZ')).toBe('000 000 0000');
  });
});
