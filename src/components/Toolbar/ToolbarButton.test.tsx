import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { ToolbarButton } from './ToolbarButton';

const Glyph = () => (
  <svg data-testid="glyph" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 6h18M7 12h10M10 18h4" />
  </svg>
);

describe('ToolbarButton', () => {
  describe('rendering', () => {
    it('renders the glyph and the label, with the label insets', () => {
      render(<ToolbarButton icon={<Glyph />}>Filters</ToolbarButton>);
      const button = screen.getByRole('button', { name: 'Filters' });
      expect(screen.getByTestId('glyph')).toBeInTheDocument();
      expect(button).toHaveClass('mdt-h-8', 'mdt-rounded-lg', 'mdt-pl-2.5', 'mdt-pr-3');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('becomes a 32px square when there is no label', () => {
      render(<ToolbarButton icon={<Glyph />} aria-label="Sort" />);
      const button = screen.getByRole('button', { name: 'Sort' });
      expect(button).toHaveClass('mdt-w-8', 'mdt-px-0');
      expect(button).not.toHaveClass('mdt-pl-2.5');
    });

    it('merges a custom className, forwards the ref and fires onClick', async () => {
      const ref = createRef<HTMLButtonElement>();
      const onClick = vi.fn();
      render(
        <ToolbarButton ref={ref} className="mine" onClick={onClick}>
          Filters
        </ToolbarButton>
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toHaveClass('mine');
      await userEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('dims and stops responding when disabled', () => {
      render(<ToolbarButton disabled>Filters</ToolbarButton>);
      expect(screen.getByRole('button')).toBeDisabled();
      expect(screen.getByRole('button')).toHaveClass('disabled:mdt-opacity-50');
    });
  });

  describe('states', () => {
    it('is at rest by default: neutral edge, no expanded or active flags', () => {
      render(<ToolbarButton>Filters</ToolbarButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mdt-border-neutral-30');
      expect(button).not.toHaveAttribute('aria-expanded');
      expect(button).not.toHaveAttribute('data-active');
    });

    it('holds the hover look and says it is expanded while open', () => {
      render(<ToolbarButton open>Filters</ToolbarButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(button).toHaveClass('mdt-bg-neutral-10', 'mdt-border-neutral-90');
    });

    it('keeps a slate edge, and no ground change, when active', () => {
      render(<ToolbarButton active>Filters</ToolbarButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-active', 'true');
      expect(button).toHaveClass('mdt-border-neutral-90');
      expect(button).not.toHaveClass('mdt-bg-neutral-10');
    });
  });

  describe('the count', () => {
    it('renders a slate count after the label and reads it out', () => {
      render(<ToolbarButton count={2}>Filters</ToolbarButton>);
      const count = screen.getByTestId('toolbar-button-count');
      expect(count).toHaveTextContent('2');
      expect(count).toHaveClass('bdg-solid', 'mdt-ml-1.5');
      expect(count.style.getPropertyValue('--bdg-dot')).toBe('hsl(var(--mdt-neutral-90))');
      expect(screen.getByRole('button')).toHaveAccessibleName(/Filters,? ?2 applied/);
    });

    it('caps at 9+', () => {
      render(<ToolbarButton count={14}>Filters</ToolbarButton>);
      expect(screen.getByTestId('toolbar-button-count')).toHaveTextContent('9+');
    });

    it('implies active, and renders nothing at zero', () => {
      const { rerender } = render(<ToolbarButton count={3}>Filters</ToolbarButton>);
      expect(screen.getByRole('button')).toHaveAttribute('data-active', 'true');
      rerender(<ToolbarButton count={0}>Filters</ToolbarButton>);
      expect(screen.queryByTestId('toolbar-button-count')).not.toBeInTheDocument();
      expect(screen.getByRole('button')).not.toHaveAttribute('data-active');
    });

    it('takes a custom spoken meaning', () => {
      render(
        <ToolbarButton count={2} activeLabel="filters on">
          Filters
        </ToolbarButton>
      );
      expect(screen.getByRole('button')).toHaveAccessibleName(/Filters,? ?2 filters on/);
    });
  });

  describe('the dot', () => {
    it('draws the dot on the corner, hidden from readers, with a spoken meaning beside it', () => {
      render(<ToolbarButton icon={<Glyph />} dot aria-label="Status" />);
      const dot = screen.getByTestId('toolbar-button-dot');
      expect(dot).toHaveClass('mdt-bg-info', 'mdt-ring-2', '-mdt-top-px', '-mdt-right-px');
      expect(dot).toHaveAttribute('aria-hidden', 'true');
      expect(screen.getByRole('button')).toHaveAttribute('data-active', 'true');
    });

    it('is absent by default', () => {
      render(<ToolbarButton icon={<Glyph />} aria-label="Sort" />);
      expect(screen.queryByTestId('toolbar-button-dot')).not.toBeInTheDocument();
    });

    it('lets an explicit active={false} win over the markers', () => {
      render(
        <ToolbarButton active={false} dot count={2}>
          Filters
        </ToolbarButton>
      );
      expect(screen.getByRole('button')).not.toHaveAttribute('data-active');
      expect(screen.getByRole('button')).not.toHaveClass('mdt-border-neutral-90');
    });
  });
});
