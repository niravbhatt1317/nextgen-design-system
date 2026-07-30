import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  describe('Rendering', () => {
    it('renders spinner element', () => {
      render(<Spinner />);
      const spinner = screen.getByLabelText('Loading');
      expect(spinner).toBeInTheDocument();
    });

    it('has default aria-label', () => {
      render(<Spinner />);
      const spinner = screen.getByLabelText('Loading');
      expect(spinner).toBeInTheDocument();
    });

    it('renders with custom aria-label', () => {
      render(<Spinner aria-label="Loading data..." />);
      const spinner = screen.getByLabelText('Loading data...');
      expect(spinner).toBeInTheDocument();
    });

    it('has animate-spin class', () => {
      render(<Spinner data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('mdt-animate-spin');
    });

    it('renders with custom className', () => {
      render(<Spinner className="custom-spinner" />);
      const spinner = screen.getByLabelText('Loading');
      expect(spinner).toHaveClass('custom-spinner');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Spinner variant="default" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('mdt-text-primary');
    });

    it('renders primary variant', () => {
      render(<Spinner variant="primary" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('mdt-text-primary');
    });

    it('renders secondary variant', () => {
      render(<Spinner variant="secondary" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('mdt-text-muted-foreground');
    });

    it('renders success variant', () => {
      render(<Spinner variant="success" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('mdt-text-green-50');
    });

    it('renders destructive variant', () => {
      render(<Spinner variant="destructive" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('mdt-text-destructive');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Spinner size="sm" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('mdt-h-4');
      expect(spinner).toHaveClass('mdt-w-4');
    });

    it('renders medium size (default)', () => {
      render(<Spinner size="md" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('mdt-h-6');
      expect(spinner).toHaveClass('mdt-w-6');
    });

    it('renders large size', () => {
      render(<Spinner size="lg" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('mdt-h-8');
      expect(spinner).toHaveClass('mdt-w-8');
    });

    it('renders extra large size', () => {
      render(<Spinner size="xl" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('mdt-h-12');
      expect(spinner).toHaveClass('mdt-w-12');
    });
  });

  describe('SVG Structure', () => {
    it('renders SVG with correct namespace', () => {
      render(<Spinner data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner.tagName).toBe('svg');
      expect(spinner).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    });

    it('renders SVG with correct viewBox', () => {
      render(<Spinner data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveAttribute('viewBox', '0 0 24 24');
    });

    it('renders SVG with fill none', () => {
      render(<Spinner data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveAttribute('fill', 'none');
    });

    it('contains circle element', () => {
      const { container } = render(<Spinner />);
      const circle = container.querySelector('circle');
      expect(circle).toBeInTheDocument();
    });

    it('contains path element', () => {
      const { container } = render(<Spinner />);
      const path = container.querySelector('path');
      expect(path).toBeInTheDocument();
    });

    it('circle has correct attributes', () => {
      const { container } = render(<Spinner />);
      const circle = container.querySelector('circle');
      expect(circle).toHaveAttribute('cx', '12');
      expect(circle).toHaveAttribute('cy', '12');
      expect(circle).toHaveAttribute('r', '10');
      expect(circle).toHaveAttribute('stroke', 'currentColor');
      expect(circle).toHaveAttribute('stroke-width', '3');
    });

    it('circle has opacity class', () => {
      const { container } = render(<Spinner />);
      const circle = container.querySelector('circle');
      expect(circle).toHaveClass('mdt-opacity-20');
    });

    it('path has opacity class', () => {
      const { container } = render(<Spinner />);
      const path = container.querySelector('path');
      expect(path).toHaveClass('mdt-opacity-100');
    });

    it('path has currentColor fill', () => {
      const { container } = render(<Spinner />);
      const path = container.querySelector('path');
      expect(path).toHaveAttribute('fill', 'currentColor');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null as SVGSVGElement | null };
      render(<Spinner ref={ref} />);
      expect(ref.current).toBeInstanceOf(SVGSVGElement);
    });
  });

  describe('Custom Props', () => {
    it('accepts custom style prop', () => {
      render(<Spinner style={{ opacity: 0.5 }} data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveStyle({ opacity: '0.5' });
    });

    it('accepts data attributes', () => {
      render(<Spinner data-custom="test-value" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveAttribute('data-custom', 'test-value');
    });
  });

  describe('Accessibility', () => {
    it('has aria-live="polite" for screen reader announcements', () => {
      render(<Spinner data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveAttribute('aria-live', 'polite');
      expect(spinner).toHaveAttribute('aria-busy', 'true');
    });

    it('can be labelled for screen readers', () => {
      render(<Spinner aria-label="Processing request" />);
      expect(screen.getByLabelText('Processing request')).toBeInTheDocument();
    });
  });

  describe('Combination of variants and sizes', () => {
    it('renders primary variant with large size', () => {
      render(<Spinner variant="primary" size="lg" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('mdt-text-primary');
      expect(spinner).toHaveClass('mdt-h-8');
      expect(spinner).toHaveClass('mdt-w-8');
    });

    it('renders destructive variant with small size', () => {
      render(<Spinner variant="destructive" size="sm" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('mdt-text-destructive');
      expect(spinner).toHaveClass('mdt-h-4');
      expect(spinner).toHaveClass('mdt-w-4');
    });
  });
});
