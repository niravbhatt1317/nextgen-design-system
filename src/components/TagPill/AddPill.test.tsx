/* AddPill - ported from the console's AddChip (Pranjal, 2026-10-13). */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { AddPill } from './AddPill';

const PILL = 'add-pill';
const getPill = () => screen.getByTestId(PILL);

describe('AddPill', () => {
  describe('rendering', () => {
    it('is a button that never submits a form', () => {
      render(<AddPill>Add tag</AddPill>);
      const pill = screen.getByRole('button', { name: 'Add tag' });
      expect(pill).toHaveAttribute('type', 'button');
    });

    it('says "Add" when given no label', () => {
      render(<AddPill />);
      expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    });

    it('draws a plus before the label, hidden from screen readers', () => {
      render(<AddPill>Add tag</AddPill>);
      const svg = getPill().querySelector('svg');
      expect(svg).not.toBeNull();
      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(getPill().firstElementChild).toBe(svg);
    });

    it("wears the console's dashed neutral capsule", () => {
      render(<AddPill>Add tag</AddPill>);
      expect(getPill()).toHaveClass(
        'mdt-border-dashed',
        'mdt-border-neutral-40',
        'mdt-bg-transparent',
        'mdt-text-neutral-90',
        'mdt-rounded-full',
        'mdt-h-5',
        'mdt-px-2',
        'mdt-gap-1',
        'mdt-text-xs',
        'mdt-font-medium'
      );
    });

    it("lifts on hover the console's way: neutral-10 fill, neutral-110 ink", () => {
      render(<AddPill>Add tag</AddPill>);
      expect(getPill()).toHaveClass('hover:mdt-bg-neutral-10', 'hover:mdt-text-neutral-110');
    });

    it('merges a custom className and forwards the ref', () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <AddPill ref={ref} className="mdt-ml-2">
          Add tag
        </AddPill>
      );
      expect(getPill()).toHaveClass('mdt-ml-2');
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('passes a title through, as the console does', () => {
      render(<AddPill title="Create or add a tag">Add tag</AddPill>);
      expect(getPill()).toHaveAttribute('title', 'Create or add a tag');
    });
  });

  describe('interaction', () => {
    it('calls onClick when pressed', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<AddPill onClick={onClick}>Add tag</AddPill>);
      await user.click(getPill());
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('is reached by Tab and fires on Enter and Space', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<AddPill onClick={onClick}>Add tag</AddPill>);
      await user.tab();
      expect(getPill()).toHaveFocus();
      await user.keyboard('{Enter}');
      await user.keyboard(' ');
      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it('does nothing when disabled', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <AddPill onClick={onClick} disabled>
          Add tag
        </AddPill>
      );
      await user.click(getPill());
      expect(onClick).not.toHaveBeenCalled();
      expect(getPill()).toBeDisabled();
    });
  });
});
