import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../Button';
import { EmptyState } from './EmptyState';

const root = (container: HTMLElement) => container.firstElementChild as HTMLElement;
const tile = (container: HTMLElement) => root(container).firstElementChild as HTMLElement;

describe('EmptyState', () => {
  describe('rendering', () => {
    it('renders the title and the line', () => {
      render(<EmptyState title="No members yet" description="Add people to the team." />);
      expect(screen.getByText('No members yet')).toBeInTheDocument();
      expect(screen.getByText('Add people to the team.')).toBeInTheDocument();
    });

    it('leaves the line out when there is none', () => {
      const { container } = render(<EmptyState title="No attributes tracked yet" />);
      // tile + title, nothing else
      expect(root(container).children).toHaveLength(2);
    });

    it('is a status, so a search that empties the list is heard', () => {
      render(<EmptyState title="No people match" />);
      expect(screen.getByRole('status')).toHaveTextContent('No people match');
    });

    it('lets the caller override the role', () => {
      render(<EmptyState title="Nothing" role="none" />);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('forwards the ref, className and style', () => {
      const ref = createRef<HTMLDivElement>();
      const { container } = render(
        <EmptyState ref={ref} title="x" className="mdt-flex-1" style={{ minHeight: 220 }} />
      );
      expect(ref.current).toBe(root(container));
      expect(root(container).className).toContain('mdt-flex-1');
      expect(root(container).style.minHeight).toBe('220px');
    });
  });

  describe('the console look', () => {
    it('keeps the block spacing: gap 8, padding 40 / 24, centred', () => {
      const { container } = render(<EmptyState title="x" />);
      const cls = root(container).className;
      for (const c of ['mdt-gap-2', 'mdt-py-10', 'mdt-px-6', 'mdt-items-center', 'mdt-text-center'])
        expect(cls).toContain(c);
    });

    it('draws the 40 tile in muted fill and ink, radius 8, glyph 18', () => {
      const { container } = render(<EmptyState title="x" />);
      const cls = tile(container).className;
      for (const c of [
        'mdt-h-10',
        'mdt-w-10',
        'mdt-rounded-lg',
        'mdt-bg-muted',
        'mdt-text-muted-foreground',
        '[&_svg]:mdt-size-[18px]',
      ])
        expect(cls).toContain(c);
      // the slate tone's own fill, ink and radius are replaced, not stacked
      expect(cls).not.toContain('mdt-bg-neutral-30');
      expect(cls).not.toContain('mdt-text-neutral-110');
      expect(cls).not.toContain('mdt-rounded-md');
    });

    it('hides the tile from screen readers - the title says it', () => {
      const { container } = render(<EmptyState title="x" />);
      expect(tile(container)).toHaveAttribute('aria-hidden', 'true');
    });

    it('sets the title 13 / 600 in foreground ink, the line 12 in muted ink', () => {
      render(<EmptyState title="Title" description="Line" />);
      const title = screen.getByText('Title').className;
      expect(title).toContain('mdt-text-[13px]');
      expect(title).toContain('mdt-font-semibold');
      expect(title).toContain('mdt-text-foreground');
      const line = screen.getByText('Line').className;
      expect(line).toContain('mdt-text-xs');
      expect(line).toContain('mdt-text-muted-foreground');
      expect(line).toContain('mdt-max-w-[360px]');
    });
  });

  describe('icon', () => {
    it('defaults to inbox, drawn at 18', () => {
      const { container } = render(<EmptyState title="x" />);
      const svg = tile(container).querySelector('svg');
      expect(svg).not.toBeNull();
      expect(svg?.style.width).toBe('18px');
    });

    it('takes a node of its own', () => {
      const { container } = render(
        <EmptyState title="x" icon={<span data-testid="own-glyph">*</span>} />
      );
      expect(tile(container)).toContainElement(screen.getByTestId('own-glyph'));
    });
  });

  describe('action', () => {
    it('renders the action below the text and passes the press through', async () => {
      const onClick = vi.fn();
      render(
        <EmptyState
          title="No people match"
          description="Nothing here matches the search."
          action={
            <Button variant="outline" size="sm" onClick={onClick}>
              Clear search
            </Button>
          }
        />
      );
      const button = screen.getByRole('button', { name: 'Clear search' });
      expect(button.parentElement?.className).toContain('mdt-mt-1.5');
      await userEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('draws no action slot without one', () => {
      render(<EmptyState title="x" description="y" />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });
});
