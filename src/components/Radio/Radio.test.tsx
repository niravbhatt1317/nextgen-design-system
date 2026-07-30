import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup, RadioGroupItem } from './Radio';

describe('RadioGroup', () => {
  it('renders radio group', () => {
    render(
      <RadioGroup aria-label="Test options">
        <RadioGroupItem value="option1" />
      </RadioGroup>
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('selects radio item on click', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup aria-label="Test options">
        <RadioGroupItem value="option1" aria-label="Option 1" />
        <RadioGroupItem value="option2" aria-label="Option 2" />
      </RadioGroup>
    );

    const radio1 = screen.getByLabelText('Option 1');
    await user.click(radio1);
    expect(radio1).toBeChecked();
  });

  it('renders with default value', () => {
    render(
      <RadioGroup defaultValue="option2" aria-label="Test options">
        <RadioGroupItem value="option1" aria-label="Option 1" />
        <RadioGroupItem value="option2" aria-label="Option 2" />
      </RadioGroup>
    );

    expect(screen.getByLabelText('Option 2')).toBeChecked();
  });

  it('handles disabled state', () => {
    render(
      <RadioGroup aria-label="Test options">
        <RadioGroupItem value="option1" disabled aria-label="Disabled option" />
      </RadioGroup>
    );

    expect(screen.getByLabelText('Disabled option')).toBeDisabled();
  });

  it('renders card variant', () => {
    render(
      <RadioGroup aria-label="Test options">
        <RadioGroupItem value="option1" variant="card" aria-label="Card option">
          <div>Card content</div>
        </RadioGroupItem>
      </RadioGroup>
    );

    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('calls onValueChange when selection changes', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <RadioGroup onValueChange={handleChange} aria-label="Test options">
        <RadioGroupItem value="option1" aria-label="Option 1" />
        <RadioGroupItem value="option2" aria-label="Option 2" />
      </RadioGroup>
    );

    await user.click(screen.getByLabelText('Option 1'));
    expect(handleChange).toHaveBeenCalledWith('option1');
  });

  it('applies custom className to RadioGroup', () => {
    render(
      <RadioGroup className="custom-group-class" aria-label="Test options">
        <RadioGroupItem value="option1" aria-label="Option 1" />
      </RadioGroup>
    );
    expect(screen.getByRole('radiogroup')).toHaveClass('custom-group-class');
  });

  it('applies custom className to RadioGroupItem', () => {
    render(
      <RadioGroup aria-label="Test options">
        <RadioGroupItem value="option1" className="custom-item-class" aria-label="Option 1" />
      </RadioGroup>
    );
    expect(screen.getByLabelText('Option 1')).toHaveClass('custom-item-class');
  });

  it('handles controlled value', () => {
    const { rerender } = render(
      <RadioGroup value="option1" aria-label="Test options">
        <RadioGroupItem value="option1" aria-label="Option 1" />
        <RadioGroupItem value="option2" aria-label="Option 2" />
      </RadioGroup>
    );

    expect(screen.getByLabelText('Option 1')).toBeChecked();
    expect(screen.getByLabelText('Option 2')).not.toBeChecked();

    rerender(
      <RadioGroup value="option2" aria-label="Test options">
        <RadioGroupItem value="option1" aria-label="Option 1" />
        <RadioGroupItem value="option2" aria-label="Option 2" />
      </RadioGroup>
    );

    expect(screen.getByLabelText('Option 1')).not.toBeChecked();
    expect(screen.getByLabelText('Option 2')).toBeChecked();
  });

  it('switches selection between radio items', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup aria-label="Test options">
        <RadioGroupItem value="option1" aria-label="Option 1" />
        <RadioGroupItem value="option2" aria-label="Option 2" />
      </RadioGroup>
    );

    const radio1 = screen.getByLabelText('Option 1');
    const radio2 = screen.getByLabelText('Option 2');

    await user.click(radio1);
    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();

    await user.click(radio2);
    expect(radio1).not.toBeChecked();
    expect(radio2).toBeChecked();
  });

  it('handles form attributes on RadioGroupItem', () => {
    render(
      <RadioGroup aria-label="Test options">
        <RadioGroupItem value="option1" id="test-id" aria-label="Option 1" />
      </RadioGroup>
    );
    const radio = screen.getByLabelText('Option 1');
    expect(radio.getAttribute('id')).toBe('test-id');
    expect(radio.getAttribute('value')).toBe('option1');
  });

  it('does not trigger events when RadioGroupItem is disabled', () => {
    const handleChange = vi.fn();
    render(
      <RadioGroup onValueChange={handleChange} aria-label="Test options">
        <RadioGroupItem value="option1" disabled aria-label="Disabled option" />
      </RadioGroup>
    );

    const radio = screen.getByLabelText('Disabled option');
    expect(radio).toBeDisabled();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders card variant without children', () => {
    render(
      <RadioGroup aria-label="Test options">
        <RadioGroupItem value="option1" variant="card" aria-label="Card option" />
      </RadioGroup>
    );
    expect(screen.getByLabelText('Card option')).toBeInTheDocument();
  });

  it('disables all items when RadioGroup is disabled', () => {
    render(
      <RadioGroup disabled aria-label="Test options">
        <RadioGroupItem value="option1" aria-label="Option 1" />
        <RadioGroupItem value="option2" aria-label="Option 2" />
      </RadioGroup>
    );

    expect(screen.getByLabelText('Option 1')).toBeDisabled();
    expect(screen.getByLabelText('Option 2')).toBeDisabled();
  });

  describe('card-with-radio variant', () => {
    it('renders card-with-radio variant with children', () => {
      render(
        <RadioGroup aria-label="Test options">
          <RadioGroupItem value="option1" variant="card-with-radio" aria-label="Card radio">
            <div>Card radio content</div>
          </RadioGroupItem>
        </RadioGroup>
      );

      expect(screen.getByText('Card radio content')).toBeInTheDocument();
      expect(screen.getByLabelText('Card radio')).toBeInTheDocument();
    });

    it('shows indicator when card-with-radio is selected', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup aria-label="Test options">
          <RadioGroupItem value="option1" variant="card-with-radio" aria-label="Card option 1">
            <div>Option 1 content</div>
          </RadioGroupItem>
          <RadioGroupItem value="option2" variant="card-with-radio" aria-label="Card option 2">
            <div>Option 2 content</div>
          </RadioGroupItem>
        </RadioGroup>
      );

      const radio1 = screen.getByLabelText('Card option 1');
      await user.click(radio1);
      expect(radio1).toBeChecked();
    });

    it('applies custom className to card-with-radio', () => {
      render(
        <RadioGroup aria-label="Test options">
          <RadioGroupItem
            value="option1"
            variant="card-with-radio"
            className="custom-card-radio"
            aria-label="Custom card radio"
          >
            <div>Content</div>
          </RadioGroupItem>
        </RadioGroup>
      );

      expect(screen.getByLabelText('Custom card radio')).toHaveClass('custom-card-radio');
    });

    it('supports disabled state in card-with-radio variant', () => {
      render(
        <RadioGroup aria-label="Test options">
          <RadioGroupItem
            value="option1"
            variant="card-with-radio"
            disabled
            aria-label="Disabled card radio"
          >
            <div>Disabled content</div>
          </RadioGroupItem>
        </RadioGroup>
      );

      expect(screen.getByLabelText('Disabled card radio')).toBeDisabled();
    });

    it('renders card-with-radio with default value selected', () => {
      render(
        <RadioGroup defaultValue="option1" aria-label="Test options">
          <RadioGroupItem value="option1" variant="card-with-radio" aria-label="Card option 1">
            <div>Option 1</div>
          </RadioGroupItem>
          <RadioGroupItem value="option2" variant="card-with-radio" aria-label="Card option 2">
            <div>Option 2</div>
          </RadioGroupItem>
        </RadioGroup>
      );

      expect(screen.getByLabelText('Card option 1')).toBeChecked();
      expect(screen.getByLabelText('Card option 2')).not.toBeChecked();
    });
  });
});
