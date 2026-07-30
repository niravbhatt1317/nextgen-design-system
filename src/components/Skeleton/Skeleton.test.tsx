import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  describe('Rendering', () => {
    it('renders skeleton element', () => {
      render(<Skeleton data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    });

    it('has animate-pulse class', () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('mdt-animate-pulse');
    });

    it('has rounded class', () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('mdt-rounded-md');
    });

    it('renders with custom className', () => {
      render(<Skeleton className="mdt-h-12 mdt-w-12" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('mdt-h-12');
      expect(skeleton).toHaveClass('mdt-w-12');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Skeleton variant="default" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('mdt-bg-muted');
    });

    it('renders lighter variant', () => {
      render(<Skeleton variant="lighter" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('mdt-bg-muted/50');
    });

    it('renders darker variant', () => {
      render(<Skeleton variant="darker" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('mdt-bg-muted-foreground/20');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom style prop', () => {
      render(<Skeleton style={{ width: '100px', height: '20px' }} data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ width: '100px', height: '20px' });
    });

    it('accepts data attributes', () => {
      render(<Skeleton data-custom="test-value" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveAttribute('data-custom', 'test-value');
    });

    it('accepts aria attributes', () => {
      render(<Skeleton aria-label="Loading content" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveAttribute('aria-label', 'Loading content');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<Skeleton ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Common use cases', () => {
    it('renders as text skeleton', () => {
      render(<Skeleton className="mdt-h-4 mdt-w-full" data-testid="text-skeleton" />);
      const skeleton = screen.getByTestId('text-skeleton');
      expect(skeleton).toHaveClass('mdt-h-4');
      expect(skeleton).toHaveClass('mdt-w-full');
    });

    it('renders as circular skeleton (avatar)', () => {
      render(<Skeleton className="mdt-h-12 mdt-w-12 mdt-rounded-full" data-testid="avatar" />);
      const skeleton = screen.getByTestId('avatar');
      expect(skeleton).toHaveClass('mdt-h-12');
      expect(skeleton).toHaveClass('mdt-w-12');
      expect(skeleton).toHaveClass('mdt-rounded-full');
    });

    it('renders as card skeleton', () => {
      render(
        <div>
          <Skeleton className="mdt-mb-4 mdt-h-48 mdt-w-full" data-testid="card-image" />
          <Skeleton className="mdt-mb-2 mdt-h-4 mdt-w-3/4" data-testid="card-title" />
          <Skeleton className="mdt-h-4 mdt-w-1/2" data-testid="card-subtitle" />
        </div>
      );
      expect(screen.getByTestId('card-image')).toBeInTheDocument();
      expect(screen.getByTestId('card-title')).toBeInTheDocument();
      expect(screen.getByTestId('card-subtitle')).toBeInTheDocument();
    });
  });
});
