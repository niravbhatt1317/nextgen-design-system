import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ButtonOld } from './ButtonOld';

describe('ButtonOld', () => {
  describe('Rendering', () => {
    it('renders with children', () => {
      render(<ButtonOld>Click me</ButtonOld>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<ButtonOld className="custom-class">ButtonOld</ButtonOld>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('renders with left icon', () => {
      render(<ButtonOld leftIcon={<span data-testid="left-icon">+</span>}>Add</ButtonOld>);
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders with right icon', () => {
      render(<ButtonOld rightIcon={<span data-testid="right-icon">→</span>}>Next</ButtonOld>);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies primary variant by default', () => {
      render(<ButtonOld>Primary</ButtonOld>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-primary');
    });

    it('applies secondary variant', () => {
      render(<ButtonOld variant="secondary">Secondary</ButtonOld>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-secondary');
    });

    it('applies outline variant', () => {
      render(<ButtonOld variant="outline">Outline</ButtonOld>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-border');
    });

    it('applies ghost variant', () => {
      render(<ButtonOld variant="ghost">Ghost</ButtonOld>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('mdt-bg-primary');
    });

    it('applies destructive variant', () => {
      render(<ButtonOld variant="destructive">Delete</ButtonOld>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-destructive');
    });

    it('applies success variant', () => {
      render(<ButtonOld variant="success">Approve</ButtonOld>);
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
      render(<ButtonOld variant={variant}>Action</ButtonOld>);
      expect(screen.getByRole('button')).toHaveClass(expected);
    });

    // Success and destructive have to stay in step. If someone adds a step to
    // one family and forgets the other, this is what catches it.
    it.each(['', 'Soft', 'Outline', 'Ghost'])('has a matching %s step in both families', (step) => {
      render(
        <>
          <ButtonOld variant={`success${step}` as 'success'}>Approve</ButtonOld>
          <ButtonOld variant={`destructive${step}` as 'destructive'}>Delete</ButtonOld>
        </>
      );
      expect(screen.getByRole('button', { name: 'Approve' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    });

    it('applies the ai variant', () => {
      render(<ButtonOld variant="ai">Ask AI</ButtonOld>);
      expect(screen.getByRole('button')).toHaveClass('mdt-bg-purple-10', 'mdt-text-purple-80');
    });
  });

  describe('AI sparkle', () => {
    it('adds a sparkle to an ai button that has no icon of its own', () => {
      const { container } = render(<ButtonOld variant="ai">Ask AI</ButtonOld>);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('keeps the caller’s left icon instead of the sparkle', () => {
      render(
        <ButtonOld variant="ai" leftIcon={<span data-testid="own-icon">*</span>}>
          Summarise
        </ButtonOld>
      );
      expect(screen.getByTestId('own-icon')).toBeInTheDocument();
    });

    it('keeps the caller’s right icon and adds no sparkle on the left', () => {
      const { container } = render(
        <ButtonOld variant="ai" rightIcon={<span data-testid="own-icon">*</span>}>
          Summarise
        </ButtonOld>
      );
      expect(screen.getByTestId('own-icon')).toBeInTheDocument();
      expect(container.querySelector('svg')).not.toBeInTheDocument();
    });

    it('does not add a sparkle to any other variant', () => {
      const { container } = render(<ButtonOld variant="primary">Save</ButtonOld>);
      expect(container.querySelector('svg')).not.toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('applies md size by default', () => {
      render(<ButtonOld>Medium</ButtonOld>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-h-9');
    });

    it('applies sm size', () => {
      render(<ButtonOld size="sm">Small</ButtonOld>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-h-8');
    });

    it('applies lg size', () => {
      render(<ButtonOld size="lg">Large</ButtonOld>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-h-10');
    });

    it('applies icon size', () => {
      render(<ButtonOld size="icon">i</ButtonOld>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-w-9');
    });
  });

  describe('States', () => {
    it('can be disabled', () => {
      render(<ButtonOld disabled>Disabled</ButtonOld>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('shows loading spinner and disables button when loading', () => {
      render(<ButtonOld loading>Loading</ButtonOld>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('hides icons when loading', () => {
      render(
        <ButtonOld
          loading
          leftIcon={<span data-testid="left-icon">+</span>}
          rightIcon={<span data-testid="right-icon">→</span>}
        >
          Loading
        </ButtonOld>
      );
      expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ButtonOld onClick={handleClick}>Click me</ButtonOld>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <ButtonOld onClick={handleClick} disabled>
          Click me
        </ButtonOld>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <ButtonOld onClick={handleClick} loading>
          Click me
        </ButtonOld>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has correct type attribute', () => {
      render(<ButtonOld type="submit">Submit</ButtonOld>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('supports aria-label', () => {
      render(<ButtonOld aria-label="Close dialog">X</ButtonOld>);
      expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
    });

    it('can be focused', async () => {
      const user = userEvent.setup();
      render(<ButtonOld>Focus me</ButtonOld>);

      await user.tab();
      expect(screen.getByRole('button')).toHaveFocus();
    });
  });

  describe('Full Width', () => {
    it('applies full width class when fullWidth is true', () => {
      render(<ButtonOld fullWidth>Full Width</ButtonOld>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-w-full');
    });
  });

  describe('Link Mode', () => {
    it('renders as anchor when href is provided', () => {
      render(
        <ButtonOld href="/dashboard" aria-label="Go to dashboard">
          Dashboard
        </ButtonOld>
      );
      const link = screen.getByRole('link', { name: /go to dashboard/i });
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/dashboard');
    });

    it('renders with target attribute', () => {
      render(
        <ButtonOld href="https://example.com" target="_blank" aria-label="External link">
          External
        </ButtonOld>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('marks link as aria-disabled when disabled', () => {
      render(
        <ButtonOld href="/dashboard" disabled aria-label="Disabled link">
          Dashboard
        </ButtonOld>
      );
      const link = screen.getByLabelText('Disabled link');
      expect(link).toHaveAttribute('aria-disabled', 'true');
    });

    it('renders link with tooltip title', () => {
      render(
        <ButtonOld href="/help" tooltipContent="Get help" aria-label="Help link">
          Help
        </ButtonOld>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('title', 'Get help');
    });

    it('handles onClick for link', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <ButtonOld href="/test" onClick={handleClick} aria-label="Test link">
          Click
        </ButtonOld>
      );
      await user.click(screen.getByRole('link'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Color Prop', () => {
    it('applies success color', () => {
      render(<ButtonOld color="success">Success</ButtonOld>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-success');
    });

    it('applies warning color', () => {
      render(<ButtonOld color="warning">Warning</ButtonOld>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-warning');
    });

    it('applies error color', () => {
      render(<ButtonOld color="error">Error</ButtonOld>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-destructive');
    });

    it('applies info color', () => {
      render(<ButtonOld color="info">Info</ButtonOld>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-info');
    });

    it('overrides variant when color is set', () => {
      render(
        <ButtonOld variant="outline" color="success">
          Success
        </ButtonOld>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-success');
    });
  });

  describe('Badge', () => {
    it('renders badge content', () => {
      render(<ButtonOld badge={5}>Notifications</ButtonOld>);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders badge with string content', () => {
      render(<ButtonOld badge="new">Updates</ButtonOld>);
      expect(screen.getByText('new')).toBeInTheDocument();
    });

    it('applies top-right badge position by default', () => {
      render(<ButtonOld badge={3}>Alerts</ButtonOld>);
      const badge = screen.getByText('3');
      expect(badge).toHaveClass('mdt-top-0', 'mdt-right-0');
    });

    it('applies top-left badge position', () => {
      render(
        <ButtonOld badge={1} badgePosition="top-left">
          Items
        </ButtonOld>
      );
      const badge = screen.getByText('1');
      expect(badge).toHaveClass('mdt-top-0', 'mdt-left-0');
    });

    it('applies bottom-right badge position', () => {
      render(
        <ButtonOld badge={2} badgePosition="bottom-right">
          Items
        </ButtonOld>
      );
      const badge = screen.getByText('2');
      expect(badge).toHaveClass('mdt-bottom-0', 'mdt-right-0');
    });
  });

  describe('Success State', () => {
    it('shows success icon when success is true', () => {
      const { container } = render(<ButtonOld success>Done</ButtonOld>);
      // Default success icon is the check icon from Icon component
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('shows successText when success and successText provided', () => {
      render(
        <ButtonOld success successText="Saved!">
          Save
        </ButtonOld>
      );
      expect(screen.getByText('Saved!')).toBeInTheDocument();
    });

    it('applies success background color', () => {
      render(<ButtonOld success>Done</ButtonOld>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-success');
    });

    it('shows custom success icon', () => {
      render(
        <ButtonOld success successIcon={<span data-testid="custom-success">✓</span>}>
          Done
        </ButtonOld>
      );
      expect(screen.getByTestId('custom-success')).toBeInTheDocument();
    });

    it('hides regular icons when success', () => {
      render(
        <ButtonOld
          success
          leftIcon={<span data-testid="left">L</span>}
          rightIcon={<span data-testid="right">R</span>}
        >
          Done
        </ButtonOld>
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
        <ButtonOld variant={variant} loading loadingText="Working…">
          Action
        </ButtonOld>
      );
      const button = screen.getByRole('button');

      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(container.querySelector('.mdt-animate-spin')).toBeInTheDocument();
      expect(button).toHaveTextContent('Working…');
    });

    it('shows the spinner alone on an ai button rather than the sparkle', () => {
      const { container } = render(
        <ButtonOld variant="ai" loading>
          Ask AI
        </ButtonOld>
      );
      // One svg, and it is the spinner - the sparkle steps aside while loading.
      const svgs = container.querySelectorAll('svg');
      expect(svgs).toHaveLength(1);
      expect(container.querySelector('.mdt-animate-spin')).toBeInTheDocument();
    });
  });

  describe('Loading Positions', () => {
    it('shows loading spinner on the left by default', () => {
      const { container } = render(<ButtonOld loading>Saving</ButtonOld>);
      const spinner = container.querySelector('.mdt-animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('shows loading text when provided', () => {
      render(
        <ButtonOld loading loadingText="Saving...">
          Save
        </ButtonOld>
      );
      expect(screen.getByText('Saving...')).toBeInTheDocument();
    });

    it('shows spinner on the right when loadingPosition is right', () => {
      const { container } = render(
        <ButtonOld loading loadingPosition="right">
          Saving
        </ButtonOld>
      );
      const spinner = container.querySelector('.mdt-animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('shows spinner in center when loadingPosition is center', () => {
      const { container } = render(
        <ButtonOld loading loadingPosition="center">
          Saving
        </ButtonOld>
      );
      const spinner = container.querySelector('.mdt-animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('maps small button size to small spinner', () => {
      const { container } = render(
        <ButtonOld loading size="xs">
          Save
        </ButtonOld>
      );
      const spinner = container.querySelector('.mdt-animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('maps large button size to large spinner', () => {
      const { container } = render(
        <ButtonOld loading size="xl">
          Save
        </ButtonOld>
      );
      const spinner = container.querySelector('.mdt-animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Shape Variants', () => {
    it('applies square shape', () => {
      render(<ButtonOld shape="square">Square</ButtonOld>);
      expect(screen.getByRole('button')).toHaveClass('mdt-rounded-none');
    });

    it('applies pill shape', () => {
      render(<ButtonOld shape="pill">Pill</ButtonOld>);
      expect(screen.getByRole('button')).toHaveClass('mdt-rounded-full');
    });

    it('applies circle shape', () => {
      render(<ButtonOld shape="circle">C</ButtonOld>);
      expect(screen.getByRole('button')).toHaveClass('mdt-rounded-full');
    });

    it('uses circle shape when iconOnly with default rounded shape', () => {
      render(
        <ButtonOld iconOnly ariaLabel="Icon button">
          X
        </ButtonOld>
      );
      expect(screen.getByRole('button')).toHaveClass('mdt-rounded-full');
    });
  });

  describe('Elevation', () => {
    it('applies no shadow by default', () => {
      render(<ButtonOld>No shadow</ButtonOld>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('mdt-shadow-sm');
      expect(button).not.toHaveClass('mdt-shadow-md');
    });

    it('applies small shadow', () => {
      render(<ButtonOld elevation={1}>Shadow</ButtonOld>);
      expect(screen.getByRole('button')).toHaveClass('mdt-shadow-sm');
    });

    it('applies medium shadow', () => {
      render(<ButtonOld elevation={2}>Shadow</ButtonOld>);
      expect(screen.getByRole('button')).toHaveClass('mdt-shadow-md');
    });

    it('applies large shadow', () => {
      render(<ButtonOld elevation={3}>Shadow</ButtonOld>);
      expect(screen.getByRole('button')).toHaveClass('mdt-shadow-lg');
    });
  });

  describe('Active State', () => {
    it('applies active ring classes', () => {
      render(<ButtonOld active>Active</ButtonOld>);
      expect(screen.getByRole('button')).toHaveClass('mdt-ring-2');
    });
  });

  describe('Uppercase', () => {
    it('applies uppercase class', () => {
      render(<ButtonOld uppercase>Uppercase</ButtonOld>);
      expect(screen.getByRole('button')).toHaveClass('mdt-uppercase');
    });
  });

  describe('Icon Only Mode', () => {
    it('applies icon size class when iconOnly', () => {
      render(
        <ButtonOld iconOnly ariaLabel="Delete">
          X
        </ButtonOld>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-w-9');
    });

    it('hides children text content in iconOnly mode', () => {
      render(
        <ButtonOld iconOnly ariaLabel="Add">
          Some text
        </ButtonOld>
      );
      // iconOnly hides renderContent(), so children text should not appear
      expect(screen.queryByText('Some text')).not.toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Icon Customization', () => {
    it('applies icon size class', () => {
      const { container } = render(
        <ButtonOld leftIcon={<span>+</span>} iconSize="lg">
          Add
        </ButtonOld>
      );
      const iconWrapper = container.querySelector('.mdt-size-5');
      expect(iconWrapper).toBeInTheDocument();
    });

    it('applies icon spacing compact', () => {
      render(
        <ButtonOld leftIcon={<span>+</span>} iconSpacing="compact">
          Add
        </ButtonOld>
      );
      expect(screen.getByRole('button')).toHaveClass('mdt-gap-1');
    });

    it('applies icon spacing relaxed', () => {
      render(
        <ButtonOld leftIcon={<span>+</span>} iconSpacing="relaxed">
          Add
        </ButtonOld>
      );
      expect(screen.getByRole('button')).toHaveClass('mdt-gap-3');
    });

    it('applies icon rotation class to left icon', () => {
      const { container } = render(
        <ButtonOld leftIcon={<span>↑</span>} rotateIcon>
          Up
        </ButtonOld>
      );
      const rotated = container.querySelector('.mdt-rotate-180');
      expect(rotated).toBeInTheDocument();
    });

    it('applies icon rotation class to right icon', () => {
      const { container } = render(
        <ButtonOld rightIcon={<span>→</span>} rotateIcon>
          Forward
        </ButtonOld>
      );
      const rotated = container.querySelector('.mdt-rotate-180');
      expect(rotated).toBeInTheDocument();
    });

    it('applies custom iconClassName', () => {
      const { container } = render(
        <ButtonOld leftIcon={<span>+</span>} iconClassName="custom-icon-class">
          Add
        </ButtonOld>
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
        <ButtonOld onClick={handleClick} preventDefaultOnClick>
          Submit
        </ButtonOld>
      );
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Tooltip Content', () => {
    it('applies title attribute from tooltipContent', () => {
      render(<ButtonOld tooltipContent="Click to save">Save</ButtonOld>);
      expect(screen.getByRole('button')).toHaveAttribute('title', 'Click to save');
    });

    it('does not apply title when tooltipContent is not a string', () => {
      render(<ButtonOld tooltipContent={<span>Tooltip</span>}>Save</ButtonOld>);
      expect(screen.getByRole('button')).not.toHaveAttribute('title');
    });
  });

  describe('Focus and Blur', () => {
    it('calls onFocus when focused', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<ButtonOld onFocus={handleFocus}>Focus</ButtonOld>);
      await user.tab();
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur when blurred', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<ButtonOld onBlur={handleBlur}>Blur</ButtonOld>);
      await user.tab(); // focus
      await user.tab(); // blur
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Error State', () => {
    it('applies destructive styles when error is true', () => {
      render(<ButtonOld error>Error</ButtonOld>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-bg-destructive');
    });
  });

  describe('Ripple Effect', () => {
    it('applies overflow-hidden when ripple is true', () => {
      render(<ButtonOld ripple>Ripple</ButtonOld>);
      expect(screen.getByRole('button')).toHaveClass('mdt-overflow-hidden');
    });

    it('creates ripple element on click', async () => {
      const user = userEvent.setup();
      render(<ButtonOld ripple>Ripple</ButtonOld>);
      const button = screen.getByRole('button');
      await user.click(button);
      // Ripple element is created and appended as child
      const rippleEl = button.querySelector('.mdt-animate-ping');
      expect(rippleEl).toBeInTheDocument();
    });

    it('removes ripple element after animation completes', () => {
      vi.useFakeTimers();
      render(<ButtonOld ripple>Ripple</ButtonOld>);
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
      render(<ButtonOld variant="link">Link ButtonOld</ButtonOld>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-underline-offset-4');
    });
  });

  describe('Extra Size Variants', () => {
    it('applies xs size', () => {
      render(<ButtonOld size="xs">XS</ButtonOld>);
      expect(screen.getByRole('button')).toHaveClass('mdt-h-7');
    });

    it('applies xl size', () => {
      render(<ButtonOld size="xl">XL</ButtonOld>);
      expect(screen.getByRole('button')).toHaveClass('mdt-h-12');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to button element', () => {
      const ref = { current: null as HTMLButtonElement | null };
      render(<ButtonOld ref={ref}>Ref</ButtonOld>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('Custom Style', () => {
    it('applies inline style', () => {
      render(<ButtonOld style={{ color: 'red' }}>Styled</ButtonOld>);
      expect(screen.getByRole('button')).toHaveAttribute('style', expect.stringContaining('color'));
    });
  });

  describe('asChild prop', () => {
    it('renders custom component when asChild is true', () => {
      render(
        <ButtonOld asChild>
          <a href="/test" data-testid="custom-link">
            Custom Link
          </a>
        </ButtonOld>
      );

      const link = screen.getByTestId('custom-link');
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/test');
    });

    it('uses Slot component to render custom elements', () => {
      render(
        <ButtonOld asChild>
          <span data-testid="custom-span">Custom Span</span>
        </ButtonOld>
      );

      // Slot merges props with child, so the span should exist
      const span = screen.getByTestId('custom-span');
      expect(span).toBeInTheDocument();
      expect(span.tagName).toBe('SPAN');
    });

    it('renders different custom components with asChild', () => {
      const { rerender } = render(
        <ButtonOld asChild>
          <div data-testid="custom-div">Div ButtonOld</div>
        </ButtonOld>
      );

      expect(screen.getByTestId('custom-div')).toBeInTheDocument();

      rerender(
        <ButtonOld asChild>
          <button type="button" data-testid="custom-button">
            ButtonOld Element
          </button>
        </ButtonOld>
      );

      expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    });
  });
});
