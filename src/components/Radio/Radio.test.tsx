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

describe('RadioGroup · segmented', () => {
  const strip = (c: HTMLElement) => c.querySelector('[role="radiogroup"]');
  const segments = (c: HTMLElement) => [...c.querySelectorAll('[data-slot="radio-segment"]')];

  const render3 = (props: Record<string, unknown> = {}) =>
    render(
      <RadioGroup variant="segmented" defaultValue="medium" aria-label="Priority" {...props}>
        <RadioGroupItem value="low">Low</RadioGroupItem>
        <RadioGroupItem value="medium">Medium</RadioGroupItem>
        <RadioGroupItem value="high">High</RadioGroupItem>
      </RadioGroup>
    );

  it('is still a radio group, so it is announced as a choice', () => {
    render3();
    expect(screen.getByRole('radiogroup', { name: 'Priority' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(screen.getByRole('radio', { name: 'Medium' })).toBeChecked();
  });

  it('makes one strip: one border, ends rounded, nothing behind it', () => {
    const { container } = render3();
    const group = strip(container);
    expect(group).toHaveClass('mdt-border');
    expect(group).toHaveClass('mdt-rounded-md');
    expect(group).toHaveClass('mdt-overflow-hidden');
    // no tray and no gaps - the joint is the shape
    expect(group).not.toHaveClass('mdt-gap-2');
    expect(group).not.toHaveClass('mdt-p-1');
  });

  it('shares the dividing line rather than drawing two', () => {
    const { container } = render3();
    expect(strip(container)).toHaveClass('[&>*:not(:first-child)]:mdt-border-l');
  });

  it('drops the circle, and marks the chosen one with a tint and a heavier word', () => {
    const { container } = render3();
    const chosen = segments(container)[1];
    expect(chosen).toHaveClass('data-[state=checked]:mdt-bg-secondary');
    expect(chosen).toHaveClass('data-[state=checked]:mdt-font-semibold');
    // the circle belongs to the default variant, not this one
    expect(chosen).not.toHaveClass('mdt-rounded-full');
    expect(container.querySelector('[data-slot="radio-segment"] .mdt-bg-current')).toBeNull();
  });

  it('draws focus inside the segment, because the strip clips its own edges', () => {
    const { container } = render3();
    const seg = segments(container)[0];
    expect(seg).toHaveClass('focus-visible:mdt-ring-inset');
    expect(seg).not.toHaveClass('focus-visible:mdt-ring-offset-2');
  });

  it('takes the variant from the group, so a segment does not repeat it', () => {
    const { container } = render3();
    expect(segments(container)).toHaveLength(3);
  });

  it('hugs its labels by default, and does not stretch to its column', () => {
    const { container } = render3();
    expect(strip(container)).not.toHaveClass('mdt-w-full');
    // a flex column would stretch it and leave a tail of empty border
    expect(strip(container)).toHaveClass('mdt-w-fit');
    segments(container).forEach((s) => {
      expect(s).not.toHaveClass('mdt-flex-1');
    });
  });

  it('shares the width equally when asked to fill the column', () => {
    const { container } = render3({ fullWidth: true });
    expect(strip(container)).toHaveClass('mdt-w-full');
    segments(container).forEach((s) => {
      expect(s).toHaveClass('mdt-flex-1');
      // so a long label gives way instead of pushing the strip wider
      expect(s).toHaveClass('mdt-min-w-0');
    });
  });

  it('matches a button at the same size name', () => {
    const { container: md } = render3();
    expect(segments(md)[0]).toHaveClass('mdt-h-9');
    const { container: sm } = render3({ size: 'sm' });
    expect(segments(sm)[0]).toHaveClass('mdt-h-8');
  });

  it('lets one segment override the group size', () => {
    const { container } = render(
      <RadioGroup variant="segmented" defaultValue="a" aria-label="Size">
        <RadioGroupItem value="a">A</RadioGroupItem>
        <RadioGroupItem value="b" size="sm">
          B
        </RadioGroupItem>
      </RadioGroup>
    );
    const [a, b] = segments(container);
    expect(a).toHaveClass('mdt-h-9');
    expect(b).toHaveClass('mdt-h-8');
  });

  it('changes the value when a segment is pressed', async () => {
    const onValueChange = vi.fn();
    render3({ onValueChange });
    await userEvent.click(screen.getByRole('radio', { name: 'High' }));
    expect(onValueChange).toHaveBeenCalledWith('high');
  });

  it('keeps a segment that cannot be chosen in the strip', () => {
    const { container } = render(
      <RadioGroup variant="segmented" defaultValue="draft" aria-label="Stage">
        <RadioGroupItem value="draft">Draft</RadioGroupItem>
        <RadioGroupItem value="published" disabled>
          Published
        </RadioGroupItem>
      </RadioGroup>
    );
    // still there, still readable, just not selectable
    expect(segments(container)).toHaveLength(2);
    expect(screen.getByRole('radio', { name: 'Published' })).toBeDisabled();
  });

  it('leaves the other variants exactly as they were', () => {
    const { container } = render(
      <RadioGroup defaultValue="a" aria-label="Plain">
        <RadioGroupItem value="a" id="pa" />
        <RadioGroupItem value="b" id="pb" />
      </RadioGroup>
    );
    expect(strip(container)).toHaveClass('mdt-grid');
    expect(strip(container)).toHaveClass('mdt-gap-2');
    expect(container.querySelectorAll('[data-slot="radio-segment"]')).toHaveLength(0);
    expect(container.querySelector('#pa')).toHaveClass('mdt-rounded-full');
  });
});
