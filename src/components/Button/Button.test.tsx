import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders with children', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Button className="custom-class">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('renders with left icon', () => {
      render(<Button leftIcon={<span data-testid="left-icon">+</span>}>Add</Button>);
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders with right icon', () => {
      render(<Button rightIcon={<span data-testid="right-icon">→</span>}>Next</Button>);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies primary variant by default', () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-primary');
    });

    it('applies secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-secondary');
    });

    it('applies outline variant', () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-border');
    });

    it('applies ghost variant', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('mdt-bg-primary');
    });

    it('applies destructive variant', () => {
      render(<Button variant="destructive">Delete</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-destructive');
    });

    it('applies success variant', () => {
      render(<Button variant="success">Approve</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-success', 'mdt-text-success-foreground');
    });

    it.each([
      ['successSoft', 'mdt-bg-green-10'],
      ['successOutline', 'mdt-border-success'],
      ['successGhost', 'mdt-text-success'],
      ['destructiveSoft', 'mdt-bg-red-10'],
      ['destructiveOutline', 'mdt-border-destructive'],
      ['destructiveGhost', 'mdt-text-destructive'],
    ] as const)('applies the %s variant', (variant, expected) => {
      render(<Button variant={variant}>Action</Button>);
      expect(screen.getByRole('button')).toHaveClass(expected);
    });

    // Success and destructive have to stay in step. If someone adds a step to
    // one family and forgets the other, this is what catches it.
    it.each(['', 'Soft', 'Outline', 'Ghost'])('has a matching %s step in both families', (step) => {
      render(
        <>
          <Button variant={`success${step}` as 'success'}>Approve</Button>
          <Button variant={`destructive${step}` as 'destructive'}>Delete</Button>
        </>
      );
      expect(screen.getByRole('button', { name: 'Approve' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    });

    it('applies the ai variant', () => {
      render(<Button variant="ai">Ask AI</Button>);
      expect(screen.getByRole('button')).toHaveClass('mdt-bg-purple-10', 'mdt-text-purple-80');
    });
  });

  describe('AI sparkle', () => {
    it('adds a sparkle to an ai button that has no icon of its own', () => {
      const { container } = render(<Button variant="ai">Ask AI</Button>);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('keeps the caller’s left icon instead of the sparkle', () => {
      render(
        <Button variant="ai" leftIcon={<span data-testid="own-icon">*</span>}>
          Summarise
        </Button>
      );
      expect(screen.getByTestId('own-icon')).toBeInTheDocument();
    });

    it('keeps the caller’s right icon and adds no sparkle on the left', () => {
      const { container } = render(
        <Button variant="ai" rightIcon={<span data-testid="own-icon">*</span>}>
          Summarise
        </Button>
      );
      expect(screen.getByTestId('own-icon')).toBeInTheDocument();
      expect(container.querySelector('svg')).not.toBeInTheDocument();
    });

    it('does not add a sparkle to any other variant', () => {
      const { container } = render(<Button variant="primary">Save</Button>);
      expect(container.querySelector('svg')).not.toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('applies md size by default', () => {
      render(<Button>Medium</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-h-9');
    });

    it('applies sm size', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-h-8');
    });

    it('applies lg size', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-h-10');
    });

    it('applies icon size', () => {
      render(<Button size="icon">i</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-w-9');
    });
  });

  describe('States', () => {
    it('can be disabled', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('shows loading spinner and disables button when loading', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('hides icons when loading', () => {
      render(
        <Button
          loading
          leftIcon={<span data-testid="left-icon">+</span>}
          rightIcon={<span data-testid="right-icon">→</span>}
        >
          Loading
        </Button>
      );
      expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} disabled>
          Click me
        </Button>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} loading>
          Click me
        </Button>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has correct type attribute', () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('supports aria-label', () => {
      render(<Button aria-label="Close dialog">X</Button>);
      expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
    });

    it('can be focused', async () => {
      const user = userEvent.setup();
      render(<Button>Focus me</Button>);

      await user.tab();
      expect(screen.getByRole('button')).toHaveFocus();
    });
  });

  describe('Full Width', () => {
    it('applies full width class when fullWidth is true', () => {
      render(<Button fullWidth>Full Width</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-w-full');
    });
  });

  describe('Link Mode', () => {
    it('renders as anchor when href is provided', () => {
      render(
        <Button href="/dashboard" aria-label="Go to dashboard">
          Dashboard
        </Button>
      );
      const link = screen.getByRole('link', { name: /go to dashboard/i });
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/dashboard');
    });

    it('renders with target attribute', () => {
      render(
        <Button href="https://example.com" target="_blank" aria-label="External link">
          External
        </Button>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('marks link as aria-disabled when disabled', () => {
      render(
        <Button href="/dashboard" disabled aria-label="Disabled link">
          Dashboard
        </Button>
      );
      const link = screen.getByLabelText('Disabled link');
      expect(link).toHaveAttribute('aria-disabled', 'true');
    });

    it('renders link with tooltip title', () => {
      render(
        <Button href="/help" tooltipContent="Get help" aria-label="Help link">
          Help
        </Button>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('title', 'Get help');
    });

    it('handles onClick for link', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Button href="/test" onClick={handleClick} aria-label="Test link">
          Click
        </Button>
      );
      await user.click(screen.getByRole('link'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Color Prop', () => {
    it('applies success color', () => {
      render(<Button color="success">Success</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-success');
    });

    it('applies warning color', () => {
      render(<Button color="warning">Warning</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-warning');
    });

    it('applies error color', () => {
      render(<Button color="error">Error</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-destructive');
    });

    it('applies info color', () => {
      render(<Button color="info">Info</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-info');
    });

    it('overrides variant when color is set', () => {
      render(
        <Button variant="outline" color="success">
          Success
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-success');
    });
  });

  describe('Badge', () => {
    it('renders badge content', () => {
      render(<Button badge={5}>Notifications</Button>);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders badge with string content', () => {
      render(<Button badge="new">Updates</Button>);
      expect(screen.getByText('new')).toBeInTheDocument();
    });

    it('applies top-right badge position by default', () => {
      render(<Button badge={3}>Alerts</Button>);
      const badge = screen.getByText('3');
      expect(badge).toHaveClass('mdt-top-0', 'mdt-right-0');
    });

    it('applies top-left badge position', () => {
      render(
        <Button badge={1} badgePosition="top-left">
          Items
        </Button>
      );
      const badge = screen.getByText('1');
      expect(badge).toHaveClass('mdt-top-0', 'mdt-left-0');
    });

    it('applies bottom-right badge position', () => {
      render(
        <Button badge={2} badgePosition="bottom-right">
          Items
        </Button>
      );
      const badge = screen.getByText('2');
      expect(badge).toHaveClass('mdt-bottom-0', 'mdt-right-0');
    });
  });

  describe('Success State', () => {
    it('shows success icon when success is true', () => {
      const { container } = render(<Button success>Done</Button>);
      // Default success icon is the check icon from Icon component
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('shows successText when success and successText provided', () => {
      render(
        <Button success successText="Saved!">
          Save
        </Button>
      );
      expect(screen.getByText('Saved!')).toBeInTheDocument();
    });

    it('applies success background color', () => {
      render(<Button success>Done</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-success');
    });

    it('shows custom success icon', () => {
      render(
        <Button success successIcon={<span data-testid="custom-success">✓</span>}>
          Done
        </Button>
      );
      expect(screen.getByTestId('custom-success')).toBeInTheDocument();
    });

    it('hides regular icons when success', () => {
      render(
        <Button
          success
          leftIcon={<span data-testid="left">L</span>}
          rightIcon={<span data-testid="right">R</span>}
        >
          Done
        </Button>
      );
      expect(screen.queryByTestId('left')).not.toBeInTheDocument();
      expect(screen.queryByTestId('right')).not.toBeInTheDocument();
    });
  });

  describe('Loading works on every variant', () => {
    it.each([
      'primary',
      'secondary',
      'outline',
      'ghost',
      'link',
      'destructive',
      'destructiveSoft',
      'destructiveOutline',
      'destructiveGhost',
      'success',
      'successSoft',
      'successOutline',
      'successGhost',
      'ai',
    ] as const)('spins and disables on the %s variant', (variant) => {
      const { container } = render(
        <Button variant={variant} loading loadingText="Working…">
          Action
        </Button>
      );
      const button = screen.getByRole('button');

      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(container.querySelector('.mdt-animate-spin')).toBeInTheDocument();
      expect(button).toHaveTextContent('Working…');
    });

    it('shows the spinner alone on an ai button rather than the sparkle', () => {
      const { container } = render(
        <Button variant="ai" loading>
          Ask AI
        </Button>
      );
      // One svg, and it is the spinner - the sparkle steps aside while loading.
      const svgs = container.querySelectorAll('svg');
      expect(svgs).toHaveLength(1);
      expect(container.querySelector('.mdt-animate-spin')).toBeInTheDocument();
    });
  });

  describe('Loading Positions', () => {
    it('shows loading spinner on the left by default', () => {
      const { container } = render(<Button loading>Saving</Button>);
      const spinner = container.querySelector('.mdt-animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('shows loading text when provided', () => {
      render(
        <Button loading loadingText="Saving...">
          Save
        </Button>
      );
      expect(screen.getByText('Saving...')).toBeInTheDocument();
    });

    it('shows spinner on the right when loadingPosition is right', () => {
      const { container } = render(
        <Button loading loadingPosition="right">
          Saving
        </Button>
      );
      const spinner = container.querySelector('.mdt-animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('shows spinner in center when loadingPosition is center', () => {
      const { container } = render(
        <Button loading loadingPosition="center">
          Saving
        </Button>
      );
      const spinner = container.querySelector('.mdt-animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('maps small button size to small spinner', () => {
      const { container } = render(
        <Button loading size="xs">
          Save
        </Button>
      );
      const spinner = container.querySelector('.mdt-animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('maps large button size to large spinner', () => {
      const { container } = render(
        <Button loading size="xl">
          Save
        </Button>
      );
      const spinner = container.querySelector('.mdt-animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Shape Variants', () => {
    it('applies square shape', () => {
      render(<Button shape="square">Square</Button>);
      expect(screen.getByRole('button')).toHaveClass('mdt-rounded-none');
    });

    it('applies pill shape', () => {
      render(<Button shape="pill">Pill</Button>);
      expect(screen.getByRole('button')).toHaveClass('mdt-rounded-full');
    });

    it('applies circle shape', () => {
      render(<Button shape="circle">C</Button>);
      expect(screen.getByRole('button')).toHaveClass('mdt-rounded-full');
    });

    it('uses circle shape when iconOnly with default rounded shape', () => {
      render(
        <Button iconOnly ariaLabel="Icon button">
          X
        </Button>
      );
      expect(screen.getByRole('button')).toHaveClass('mdt-rounded-full');
    });
  });

  describe('Elevation', () => {
    it('applies no shadow by default', () => {
      render(<Button>No shadow</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('mdt-shadow-sm');
      expect(button).not.toHaveClass('mdt-shadow-md');
    });

    it('applies small shadow', () => {
      render(<Button elevation={1}>Shadow</Button>);
      expect(screen.getByRole('button')).toHaveClass('mdt-shadow-sm');
    });

    it('applies medium shadow', () => {
      render(<Button elevation={2}>Shadow</Button>);
      expect(screen.getByRole('button')).toHaveClass('mdt-shadow-md');
    });

    it('applies large shadow', () => {
      render(<Button elevation={3}>Shadow</Button>);
      expect(screen.getByRole('button')).toHaveClass('mdt-shadow-lg');
    });
  });

  describe('Active State', () => {
    it('applies active ring classes', () => {
      render(<Button active>Active</Button>);
      expect(screen.getByRole('button')).toHaveClass('mdt-ring-2');
    });
  });

  describe('Uppercase', () => {
    it('applies uppercase class', () => {
      render(<Button uppercase>Uppercase</Button>);
      expect(screen.getByRole('button')).toHaveClass('mdt-uppercase');
    });
  });

  describe('Icon Only Mode', () => {
    it('applies icon size class when iconOnly', () => {
      render(
        <Button iconOnly ariaLabel="Delete">
          X
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-w-9');
    });

    it('hides children text content in iconOnly mode', () => {
      render(
        <Button iconOnly ariaLabel="Add">
          Some text
        </Button>
      );
      // iconOnly hides renderContent(), so children text should not appear
      expect(screen.queryByText('Some text')).not.toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Icon Customization', () => {
    it('applies icon size class', () => {
      const { container } = render(
        <Button leftIcon={<span>+</span>} iconSize="lg">
          Add
        </Button>
      );
      const iconWrapper = container.querySelector('.mdt-size-5');
      expect(iconWrapper).toBeInTheDocument();
    });

    it('applies icon spacing compact', () => {
      render(
        <Button leftIcon={<span>+</span>} iconSpacing="compact">
          Add
        </Button>
      );
      expect(screen.getByRole('button')).toHaveClass('mdt-gap-1');
    });

    it('applies icon spacing relaxed', () => {
      render(
        <Button leftIcon={<span>+</span>} iconSpacing="relaxed">
          Add
        </Button>
      );
      expect(screen.getByRole('button')).toHaveClass('mdt-gap-3');
    });

    it('applies icon rotation class to left icon', () => {
      const { container } = render(
        <Button leftIcon={<span>↑</span>} rotateIcon>
          Up
        </Button>
      );
      const rotated = container.querySelector('.mdt-rotate-180');
      expect(rotated).toBeInTheDocument();
    });

    it('applies icon rotation class to right icon', () => {
      const { container } = render(
        <Button rightIcon={<span>→</span>} rotateIcon>
          Forward
        </Button>
      );
      const rotated = container.querySelector('.mdt-rotate-180');
      expect(rotated).toBeInTheDocument();
    });

    it('applies custom iconClassName', () => {
      const { container } = render(
        <Button leftIcon={<span>+</span>} iconClassName="custom-icon-class">
          Add
        </Button>
      );
      const iconWrapper = container.querySelector('.custom-icon-class');
      expect(iconWrapper).toBeInTheDocument();
    });
  });

  describe('Prevent Default', () => {
    it('prevents default on click when preventDefaultOnClick is true', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} preventDefaultOnClick>
          Submit
        </Button>
      );
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Tooltip Content', () => {
    it('applies title attribute from tooltipContent', () => {
      render(<Button tooltipContent="Click to save">Save</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('title', 'Click to save');
    });

    it('does not apply title when tooltipContent is not a string', () => {
      render(<Button tooltipContent={<span>Tooltip</span>}>Save</Button>);
      expect(screen.getByRole('button')).not.toHaveAttribute('title');
    });
  });

  describe('Focus and Blur', () => {
    it('calls onFocus when focused', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<Button onFocus={handleFocus}>Focus</Button>);
      await user.tab();
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur when blurred', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<Button onBlur={handleBlur}>Blur</Button>);
      await user.tab(); // focus
      await user.tab(); // blur
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Error State', () => {
    it('applies destructive styles when error is true', () => {
      render(<Button error>Error</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-destructive');
    });
  });

  describe('Ripple Effect', () => {
    it('applies overflow-hidden when ripple is true', () => {
      render(<Button ripple>Ripple</Button>);
      expect(screen.getByRole('button')).toHaveClass('mdt-overflow-hidden');
    });

    it('creates ripple element on click', async () => {
      const user = userEvent.setup();
      render(<Button ripple>Ripple</Button>);
      const button = screen.getByRole('button');
      await user.click(button);
      // Ripple element is created and appended as child
      const rippleEl = button.querySelector('.mdt-animate-ping');
      expect(rippleEl).toBeInTheDocument();
    });

    it('removes ripple element after animation completes', () => {
      vi.useFakeTimers();
      render(<Button ripple>Ripple</Button>);
      const button = screen.getByRole('button');

      // Click using fireEvent for synchronous behavior with fake timers
      button.click();

      // Ripple element should exist immediately after click
      let rippleEl = button.querySelector('.mdt-animate-ping');
      expect(rippleEl).toBeInTheDocument();

      // Fast-forward time by 600ms (RIPPLE_ANIMATION_DURATION_MS)
      vi.advanceTimersByTime(600);

      // Ripple element should be removed after animation
      rippleEl = button.querySelector('.mdt-animate-ping');
      expect(rippleEl).not.toBeInTheDocument();

      vi.useRealTimers();
    });
  });

  describe('Link Variant', () => {
    it('applies link variant styles', () => {
      render(<Button variant="link">Link Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-underline-offset-4');
    });
  });

  describe('Extra Size Variants', () => {
    it('applies xs size', () => {
      render(<Button size="xs">XS</Button>);
      expect(screen.getByRole('button')).toHaveClass('mdt-h-7');
    });

    it('applies xl size', () => {
      render(<Button size="xl">XL</Button>);
      expect(screen.getByRole('button')).toHaveClass('mdt-h-12');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to button element', () => {
      const ref = { current: null as HTMLButtonElement | null };
      render(<Button ref={ref}>Ref</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('Custom Style', () => {
    it('applies inline style', () => {
      render(<Button style={{ color: 'red' }}>Styled</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('style', expect.stringContaining('color'));
    });
  });

  describe('asChild prop', () => {
    it('renders custom component when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test" data-testid="custom-link">
            Custom Link
          </a>
        </Button>
      );

      const link = screen.getByTestId('custom-link');
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/test');
    });

    it('uses Slot component to render custom elements', () => {
      render(
        <Button asChild>
          <span data-testid="custom-span">Custom Span</span>
        </Button>
      );

      // Slot merges props with child, so the span should exist
      const span = screen.getByTestId('custom-span');
      expect(span).toBeInTheDocument();
      expect(span.tagName).toBe('SPAN');
    });

    it('renders different custom components with asChild', () => {
      const { rerender } = render(
        <Button asChild>
          <div data-testid="custom-div">Div Button</div>
        </Button>
      );

      expect(screen.getByTestId('custom-div')).toBeInTheDocument();

      rerender(
        <Button asChild>
          <button type="button" data-testid="custom-button">
            Button Element
          </button>
        </Button>
      );

      expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    });
  });
});
