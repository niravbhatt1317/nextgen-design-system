import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders checkbox', () => {
    render(<Checkbox aria-label="Test checkbox" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('toggles checked state on click', async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Test checkbox" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('renders with default checked state', () => {
    render(<Checkbox defaultChecked aria-label="Test checkbox" />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('handles disabled state', () => {
    render(<Checkbox disabled aria-label="Disabled checkbox" />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('renders card variant with content', () => {
    render(
      <Checkbox variant="card" aria-label="Card checkbox">
        <div>Card content</div>
      </Checkbox>
    );

    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('calls onCheckedChange when toggled', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox onCheckedChange={handleChange} aria-label="Test checkbox" />);

    await user.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('applies custom className', () => {
    render(<Checkbox className="custom-class" aria-label="Test checkbox" />);
    expect(screen.getByRole('checkbox')).toHaveClass('custom-class');
  });

  it('handles controlled checked state', () => {
    const { rerender } = render(<Checkbox checked={false} aria-label="Test checkbox" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    rerender(<Checkbox checked={true} aria-label="Test checkbox" />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('supports indeterminate state', () => {
    render(<Checkbox checked="indeterminate" aria-label="Test checkbox" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.getAttribute('data-state')).toBe('indeterminate');
  });

  it('handles id attribute', () => {
    render(<Checkbox id="test-id" aria-label="Test checkbox" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.getAttribute('id')).toBe('test-id');
  });

  it('does not trigger events when disabled', () => {
    const handleChange = vi.fn();
    render(<Checkbox disabled onCheckedChange={handleChange} aria-label="Test checkbox" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders card variant without children', () => {
    render(<Checkbox variant="card" aria-label="Card checkbox" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  describe('card-with-checkbox variant', () => {
    it('renders card-with-checkbox variant with children', () => {
      render(
        <Checkbox variant="card-with-checkbox" aria-label="Card with checkbox">
          <div>Card content with checkbox</div>
        </Checkbox>
      );

      expect(screen.getByText('Card content with checkbox')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders checked state in card-with-checkbox variant', () => {
      render(
        <Checkbox variant="card-with-checkbox" defaultChecked aria-label="Checked card">
          <div>Checked card content</div>
        </Checkbox>
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('toggles card-with-checkbox variant', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Checkbox
          variant="card-with-checkbox"
          onCheckedChange={handleChange}
          aria-label="Toggle card"
        >
          <div>Toggleable card</div>
        </Checkbox>
      );

      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('applies custom className to card-with-checkbox', () => {
      render(
        <Checkbox variant="card-with-checkbox" className="my-custom-class" aria-label="Custom card">
          <div>Custom class card</div>
        </Checkbox>
      );

      expect(screen.getByRole('checkbox')).toHaveClass('my-custom-class');
    });

    it('supports disabled state in card-with-checkbox variant', () => {
      render(
        <Checkbox variant="card-with-checkbox" disabled aria-label="Disabled card">
          <div>Disabled card</div>
        </Checkbox>
      );

      expect(screen.getByRole('checkbox')).toBeDisabled();
    });
  });

  describe('stable layout', () => {
    it('sits off the text baseline so ticking it cannot move the line box', () => {
      // The tick indicator only exists while checked. On a baseline-aligned
      // inline-block that meant checking the box grew the surrounding line box -
      // a table row measurably jumped from 53px to 55px on every click.
      const { container } = render(<Checkbox aria-label="Select" />);
      const root = container.querySelector('[role="checkbox"]');
      expect(root).toHaveClass('mdt-align-middle');
      expect(root).toHaveClass('mdt-inline-flex');
    });

    it('keeps the same classes checked and unchecked', () => {
      const { container: off } = render(<Checkbox aria-label="a" />);
      const { container: on } = render(<Checkbox aria-label="b" checked />);
      const cls = (c: HTMLElement) =>
        (c.querySelector('[role="checkbox"]') as HTMLElement).className
          .split(' ')
          .filter((x) => !x.includes('data-'))
          .sort()
          .join(' ');
      expect(cls(off)).toBe(cls(on));
    });
  });
});
