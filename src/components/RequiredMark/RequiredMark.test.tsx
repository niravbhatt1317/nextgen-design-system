import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Combobox } from '../Combobox';
import { FormLabel } from '../Form';
import { Input } from '../Input';
import { Select } from '../Select';
import { Textarea } from '../Textarea';
import { RequiredMark } from './RequiredMark';

const OPTIONS = [{ value: 'a', label: 'Alpha' }];

describe('RequiredMark', () => {
  describe('rendering', () => {
    it('draws the asterisk in the danger red, 3 off the word', () => {
      render(<RequiredMark />);
      const star = screen.getByText('*');
      expect(star).toHaveClass('mdt-ml-[3px]', 'mdt-text-destructive');
      expect(star).toHaveAttribute('data-slot', 'required-mark');
    });

    it('hides the star from a screen reader and says "required" instead', () => {
      render(<RequiredMark />);
      expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
      const word = screen.getByText('required');
      expect(word).toHaveClass('mdt-sr-only');
      expect(word.textContent).toBe(' required');
    });

    it('stays quiet when announce is off', () => {
      render(<RequiredMark announce={false} />);
      expect(screen.getByText('*')).toBeInTheDocument();
      expect(screen.queryByText('required')).toBeNull();
    });

    it('forwards the ref to the star and takes a className', () => {
      const ref = createRef<HTMLSpanElement>();
      render(<RequiredMark ref={ref} className="custom" />);
      expect(ref.current).toBe(screen.getByText('*'));
      expect(ref.current).toHaveClass('custom', 'mdt-text-destructive');
    });
  });

  describe('accessibility', () => {
    it('names a hand-drawn label "<word> required"', () => {
      render(
        <>
          <label htmlFor="org">
            Organization name
            <RequiredMark />
          </label>
          <input id="org" />
        </>
      );
      /* a browser reads the word's own leading space; the test library's name reader joins the two without it */
      expect(
        screen.getByRole('textbox', { name: /^Organization name ?required$/ })
      ).toBeInTheDocument();
    });
  });

  describe('every library field draws this one mark', () => {
    it('Input: the mark, quiet - the input says required itself', () => {
      render(<Input label="Name" required />);
      const box = screen.getByRole('textbox', { name: 'Name' });
      expect(box).toBeRequired();
      expect(screen.getByText('*')).toHaveAttribute('data-slot', 'required-mark');
      expect(screen.queryByText('required')).toBeNull();
    });

    it('Textarea: the mark, quiet', () => {
      render(<Textarea label="Notes" required />);
      expect(screen.getByRole('textbox', { name: 'Notes' })).toBeRequired();
      expect(screen.getByText('*')).toHaveAttribute('data-slot', 'required-mark');
    });

    it('Select: the mark, quiet - Radix marks the trigger aria-required', () => {
      render(<Select label="Role" options={OPTIONS} required />);
      expect(screen.getByText('*')).toHaveAttribute('data-slot', 'required-mark');
      expect(screen.getByRole('combobox', { name: 'Role' })).toHaveAttribute(
        'aria-required',
        'true'
      );
      expect(screen.queryByText('required')).toBeNull();
    });

    it('Select multi: the mark says "required" - its trigger has no required state', () => {
      render(<Select label="Teams" options={OPTIONS} mode="multiple" required />);
      expect(screen.getByText('*')).toHaveAttribute('data-slot', 'required-mark');
      expect(screen.getByText('required')).toHaveClass('mdt-sr-only');
    });

    it('Combobox: the mark says "required" - the list mode trigger has no required state', () => {
      render(<Combobox label="Owner" options={OPTIONS} required />);
      expect(screen.getByText('*')).toHaveAttribute('data-slot', 'required-mark');
      expect(screen.getByText('required')).toHaveClass('mdt-sr-only');
    });

    it('Combobox search="field": the mark, quiet - the field is aria-required', () => {
      render(<Combobox label="Owner" options={OPTIONS} search="field" required />);
      expect(screen.getByText('*')).toHaveAttribute('data-slot', 'required-mark');
      expect(screen.getByRole('combobox', { name: 'Owner' })).toHaveAttribute(
        'aria-required',
        'true'
      );
      expect(screen.queryByText('required')).toBeNull();
    });

    it('FormLabel: the mark says "required"', () => {
      render(<FormLabel required>Email</FormLabel>);
      expect(screen.getByText('*')).toHaveAttribute('data-slot', 'required-mark');
      expect(screen.getByText('required')).toHaveClass('mdt-sr-only');
    });
  });
});
