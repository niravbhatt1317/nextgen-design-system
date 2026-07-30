import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ScrollArea, ScrollBar, ScrollAreaViewport, ScrollAreaCorner } from './ScrollArea';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

describe('ScrollArea', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(
        <ScrollArea data-testid="scroll-area">
          <div>Scroll content</div>
        </ScrollArea>
      );

      expect(screen.getByTestId('scroll-area')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(
        <ScrollArea>
          <div data-testid="content">Test Content</div>
        </ScrollArea>
      );

      expect(screen.getByTestId('content')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <ScrollArea className="custom-class" data-testid="scroll-area">
          <div>Content</div>
        </ScrollArea>
      );

      const scrollArea = screen.getByTestId('scroll-area');
      expect(scrollArea).toHaveClass('custom-class');
    });

    it('applies base overflow-hidden class', () => {
      render(
        <ScrollArea data-testid="scroll-area">
          <div>Content</div>
        </ScrollArea>
      );

      const scrollArea = screen.getByTestId('scroll-area');
      expect(scrollArea).toHaveClass('mdt-relative', 'mdt-overflow-hidden');
    });
  });

  describe('ScrollBar', () => {
    // Note: Radix UI scrollbars only render when content actually overflows,
    // which doesn't happen in JSDOM. We test the component renders without errors
    // and integrates properly with ScrollArea.
    it('renders vertical scrollbar with type="always"', () => {
      const { container } = render(
        <ScrollArea type="always">
          <div>Content</div>
        </ScrollArea>
      );

      // Query by orientation attribute which is set on the scrollbar
      const scrollbar = container.querySelector('[data-orientation="vertical"]');
      expect(scrollbar).toBeInTheDocument();
    });

    it('renders horizontal scrollbar when specified with type="always"', () => {
      const { container } = render(
        <ScrollArea orientation="horizontal" type="always">
          <div>Wide content</div>
        </ScrollArea>
      );

      const scrollbar = container.querySelector('[data-orientation="horizontal"]');
      expect(scrollbar).toBeInTheDocument();
    });

    it('renders both scrollbars when orientation is both with type="always"', () => {
      const { container } = render(
        <ScrollArea orientation="both" type="always">
          <div>Large content</div>
        </ScrollArea>
      );

      const verticalScrollbar = container.querySelector('[data-orientation="vertical"]');
      const horizontalScrollbar = container.querySelector('[data-orientation="horizontal"]');

      expect(verticalScrollbar).toBeInTheDocument();
      expect(horizontalScrollbar).toBeInTheDocument();
    });

    it('applies styles from ScrollBar component', () => {
      const { container } = render(
        <ScrollArea type="always">
          <div>Content</div>
        </ScrollArea>
      );

      const scrollbar = container.querySelector('[data-orientation="vertical"]');
      expect(scrollbar).toHaveClass('mdt-flex', 'mdt-touch-none', 'mdt-select-none');
    });
  });

  describe('ScrollAreaViewport', () => {
    it('renders correctly within ScrollArea context', () => {
      render(
        <ScrollAreaPrimitive.Root>
          <ScrollAreaViewport data-testid="viewport">
            <div>Content</div>
          </ScrollAreaViewport>
        </ScrollAreaPrimitive.Root>
      );

      expect(screen.getByTestId('viewport')).toBeInTheDocument();
    });

    it('applies base classes', () => {
      render(
        <ScrollAreaPrimitive.Root>
          <ScrollAreaViewport data-testid="viewport">
            <div>Content</div>
          </ScrollAreaViewport>
        </ScrollAreaPrimitive.Root>
      );

      const viewport = screen.getByTestId('viewport');
      expect(viewport).toHaveClass('mdt-h-full', 'mdt-w-full');
    });

    it('applies custom className', () => {
      render(
        <ScrollAreaPrimitive.Root>
          <ScrollAreaViewport className="custom-viewport" data-testid="viewport">
            <div>Content</div>
          </ScrollAreaViewport>
        </ScrollAreaPrimitive.Root>
      );

      const viewport = screen.getByTestId('viewport');
      expect(viewport).toHaveClass('custom-viewport');
    });
  });

  describe('ScrollAreaCorner', () => {
    // Note: ScrollAreaCorner only renders visibly when both scrollbars are active
    // and content overflows in both directions. We verify it can be used without errors.
    it('can be used within ScrollArea without errors', () => {
      // ScrollAreaCorner is already included in the main ScrollArea component
      // This test verifies it doesn't cause any runtime errors
      expect(() => {
        render(
          <ScrollArea orientation="both" type="always">
            <div>Large content</div>
          </ScrollArea>
        );
      }).not.toThrow();
    });
  });

  describe('Props Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(
        <ScrollArea ref={ref}>
          <div>Content</div>
        </ScrollArea>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards additional props', () => {
      render(
        <ScrollArea data-testid="scroll-area" id="my-scroll-area" aria-label="Scrollable content">
          <div>Content</div>
        </ScrollArea>
      );

      const scrollArea = screen.getByTestId('scroll-area');
      expect(scrollArea).toHaveAttribute('id', 'my-scroll-area');
      expect(scrollArea).toHaveAttribute('aria-label', 'Scrollable content');
    });

    it('forwards type prop for scrollbar visibility', () => {
      const { container } = render(
        <ScrollArea type="always" data-testid="scroll-area">
          <div>Content</div>
        </ScrollArea>
      );

      // With type="always", scrollbar should be rendered
      const scrollbar = container.querySelector('[data-orientation="vertical"]');
      expect(scrollbar).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('renders with proper structure', () => {
      render(
        <ScrollArea data-testid="scroll-area">
          <div>Accessible content</div>
        </ScrollArea>
      );

      const scrollArea = screen.getByTestId('scroll-area');
      expect(scrollArea).toBeInTheDocument();
    });

    it('supports custom aria attributes', () => {
      render(
        <ScrollArea aria-label="Document scroll area" aria-describedby="scroll-desc">
          <div>Content</div>
        </ScrollArea>
      );

      const scrollArea = screen.getByLabelText('Document scroll area');
      expect(scrollArea).toBeInTheDocument();
      expect(scrollArea).toHaveAttribute('aria-describedby', 'scroll-desc');
    });
  });

  describe('Content Handling', () => {
    it('renders long content', () => {
      const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

      render(
        <ScrollArea className="mdt-h-[200px]">
          <div>
            {items.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </ScrollArea>
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 50')).toBeInTheDocument();
    });

    it('renders nested scroll areas', () => {
      render(
        <ScrollArea data-testid="outer" className="mdt-h-[300px]">
          <div>Outer content</div>
          <ScrollArea data-testid="inner" className="mdt-h-[150px]">
            <div>Inner content</div>
          </ScrollArea>
        </ScrollArea>
      );

      expect(screen.getByTestId('outer')).toBeInTheDocument();
      expect(screen.getByTestId('inner')).toBeInTheDocument();
    });
  });
});
