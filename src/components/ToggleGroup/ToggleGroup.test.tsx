import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

describe('ToggleGroup', () => {
  describe('Rendering', () => {
    it('renders correctly with items', () => {
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
          <ToggleGroupItem value="b">Option B</ToggleGroupItem>
          <ToggleGroupItem value="c">Option C</ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByText('Option A')).toBeInTheDocument();
      expect(screen.getByText('Option B')).toBeInTheDocument();
      expect(screen.getByText('Option C')).toBeInTheDocument();
    });

    it('renders with default value in single mode', () => {
      render(
        <ToggleGroup type="single" defaultValue="b">
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
          <ToggleGroupItem value="b">Option B</ToggleGroupItem>
          <ToggleGroupItem value="c">Option C</ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByText('Option B').closest('button')).toHaveAttribute('data-state', 'on');
      expect(screen.getByText('Option A').closest('button')).toHaveAttribute('data-state', 'off');
    });

    it('renders with default values in multiple mode', () => {
      render(
        <ToggleGroup type="multiple" defaultValue={['a', 'c']}>
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
          <ToggleGroupItem value="b">Option B</ToggleGroupItem>
          <ToggleGroupItem value="c">Option C</ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByText('Option A').closest('button')).toHaveAttribute('data-state', 'on');
      expect(screen.getByText('Option B').closest('button')).toHaveAttribute('data-state', 'off');
      expect(screen.getByText('Option C').closest('button')).toHaveAttribute('data-state', 'on');
    });

    it('applies custom className', () => {
      render(
        <ToggleGroup type="single" className="custom-class" data-testid="toggle-group">
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByTestId('toggle-group')).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(
        <ToggleGroup type="single" variant="default" data-testid="toggle-group">
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByTestId('toggle-group')).toHaveClass('mdt-bg-muted');
    });

    it('renders outline variant', () => {
      render(
        <ToggleGroup type="single" variant="outline" data-testid="toggle-group">
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByTestId('toggle-group')).toHaveClass('mdt-border', 'mdt-border-input');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(
        <ToggleGroup type="single" size="sm">
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByText('Option A').closest('button')).toHaveClass('mdt-h-7');
    });

    it('renders medium size', () => {
      render(
        <ToggleGroup type="single" size="md">
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByText('Option A').closest('button')).toHaveClass('mdt-h-8');
    });

    it('renders large size', () => {
      render(
        <ToggleGroup type="single" size="lg">
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByText('Option A').closest('button')).toHaveClass('mdt-h-10');
    });
  });

  describe('Orientation', () => {
    it('renders horizontal orientation by default', () => {
      render(
        <ToggleGroup type="single" data-testid="toggle-group">
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByTestId('toggle-group')).toHaveClass('mdt-flex-row');
    });

    it('renders vertical orientation', () => {
      render(
        <ToggleGroup type="single" orientation="vertical" data-testid="toggle-group">
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByTestId('toggle-group')).toHaveClass('mdt-flex-col');
    });
  });

  describe('Interaction - Single Mode', () => {
    it('selects item on click', async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
          <ToggleGroupItem value="b">Option B</ToggleGroupItem>
        </ToggleGroup>
      );

      const optionA = screen.getByText('Option A').closest('button')!;
      await user.click(optionA);

      expect(optionA).toHaveAttribute('data-state', 'on');
    });

    it('only allows one selection in single mode', async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="single" defaultValue="a">
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
          <ToggleGroupItem value="b">Option B</ToggleGroupItem>
        </ToggleGroup>
      );

      const optionA = screen.getByText('Option A').closest('button')!;
      const optionB = screen.getByText('Option B').closest('button')!;

      expect(optionA).toHaveAttribute('data-state', 'on');

      await user.click(optionB);

      expect(optionA).toHaveAttribute('data-state', 'off');
      expect(optionB).toHaveAttribute('data-state', 'on');
    });

    it('calls onValueChange when selection changes', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <ToggleGroup type="single" onValueChange={handleChange}>
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
          <ToggleGroupItem value="b">Option B</ToggleGroupItem>
        </ToggleGroup>
      );

      await user.click(screen.getByText('Option B'));

      expect(handleChange).toHaveBeenCalledWith('b');
    });
  });

  describe('Interaction - Multiple Mode', () => {
    it('allows multiple selections', async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
          <ToggleGroupItem value="b">Option B</ToggleGroupItem>
          <ToggleGroupItem value="c">Option C</ToggleGroupItem>
        </ToggleGroup>
      );

      const optionA = screen.getByText('Option A').closest('button')!;
      const optionB = screen.getByText('Option B').closest('button')!;

      await user.click(optionA);
      await user.click(optionB);

      expect(optionA).toHaveAttribute('data-state', 'on');
      expect(optionB).toHaveAttribute('data-state', 'on');
    });

    it('toggles selection off on second click', async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="multiple" defaultValue={['a']}>
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
          <ToggleGroupItem value="b">Option B</ToggleGroupItem>
        </ToggleGroup>
      );

      const optionA = screen.getByText('Option A').closest('button')!;

      expect(optionA).toHaveAttribute('data-state', 'on');

      await user.click(optionA);

      expect(optionA).toHaveAttribute('data-state', 'off');
    });

    it('calls onValueChange with array in multiple mode', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <ToggleGroup type="multiple" defaultValue={['a']} onValueChange={handleChange}>
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
          <ToggleGroupItem value="b">Option B</ToggleGroupItem>
        </ToggleGroup>
      );

      await user.click(screen.getByText('Option B'));

      expect(handleChange).toHaveBeenCalledWith(['a', 'b']);
    });
  });

  describe('Disabled State', () => {
    it('disables entire group when disabled prop is set', () => {
      render(
        <ToggleGroup type="single" disabled>
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
          <ToggleGroupItem value="b">Option B</ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByText('Option A').closest('button')).toBeDisabled();
      expect(screen.getByText('Option B').closest('button')).toBeDisabled();
    });

    it('disables individual item when disabled prop is set on item', () => {
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
          <ToggleGroupItem value="b" disabled>
            Option B
          </ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByText('Option A').closest('button')).not.toBeDisabled();
      expect(screen.getByText('Option B').closest('button')).toBeDisabled();
    });

    it('does not trigger selection when disabled item is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <ToggleGroup type="single" onValueChange={handleChange}>
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
          <ToggleGroupItem value="b" disabled>
            Option B
          </ToggleGroupItem>
        </ToggleGroup>
      );

      await user.click(screen.getByText('Option B'));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has correct role', () => {
      render(
        <ToggleGroup type="single" data-testid="toggle-group">
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByTestId('toggle-group')).toHaveAttribute('role', 'group');
    });

    it('supports aria-label on items', () => {
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="a" aria-label="Select option A">
            A
          </ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByLabelText('Select option A')).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
          <ToggleGroupItem value="b">Option B</ToggleGroupItem>
          <ToggleGroupItem value="c">Option C</ToggleGroupItem>
        </ToggleGroup>
      );

      // Focus first item
      await user.tab();
      expect(screen.getByText('Option A').closest('button')).toHaveFocus();

      // Navigate with arrow key
      await user.keyboard('{ArrowRight}');
      expect(screen.getByText('Option B').closest('button')).toHaveFocus();

      // Select with Enter
      await user.keyboard('{Enter}');
      expect(screen.getByText('Option B').closest('button')).toHaveAttribute('data-state', 'on');
    });
  });

  describe('Full Width', () => {
    it('applies full width class when fullWidth is true', () => {
      render(
        <ToggleGroup type="single" fullWidth data-testid="toggle-group">
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByTestId('toggle-group')).toHaveClass('mdt-w-full');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to ToggleGroup', () => {
      const ref = { current: null };
      render(
        <ToggleGroup type="single" ref={ref}>
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        </ToggleGroup>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to ToggleGroupItem', () => {
      const ref = { current: null };
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="a" ref={ref}>
            Option A
          </ToggleGroupItem>
        </ToggleGroup>
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });
});
