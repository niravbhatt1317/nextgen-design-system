import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './Resizable';

// Mock react-resizable-panels to avoid layout issues in tests
vi.mock('react-resizable-panels', () => ({
  Group: ({
    children,
    className,
    orientation,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    orientation?: string;
    elementRef?: React.Ref<HTMLDivElement>;
  }) => (
    <div
      className={className}
      data-panel-group-direction={orientation}
      data-testid="panel-group"
      {...props}
    >
      {children}
    </div>
  ),
  Panel: ({ children, className, ...props }: { children: React.ReactNode; className?: string }) => (
    <div className={className} data-testid="panel" {...props}>
      {children}
    </div>
  ),
  Separator: ({
    children,
    className,
    ...props
  }: {
    children?: React.ReactNode;
    className?: string;
    elementRef?: React.Ref<HTMLDivElement>;
  }) => (
    <div className={className} data-testid="resize-handle" role="separator" {...props}>
      {children}
    </div>
  ),
}));

describe('Resizable', () => {
  describe('ResizablePanelGroup', () => {
    it('renders correctly', () => {
      render(
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel>Content</ResizablePanel>
        </ResizablePanelGroup>
      );

      expect(screen.getByTestId('panel-group')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <ResizablePanelGroup orientation="horizontal" className="custom-class">
          <ResizablePanel>Content</ResizablePanel>
        </ResizablePanelGroup>
      );

      const group = screen.getByTestId('panel-group');
      expect(group).toHaveClass('custom-class');
    });

    it('applies orientation attribute', () => {
      render(
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel>Content</ResizablePanel>
        </ResizablePanelGroup>
      );

      const group = screen.getByTestId('panel-group');
      expect(group).toHaveAttribute('data-panel-group-direction', 'vertical');
    });

    it('applies base flex classes', () => {
      render(
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel>Content</ResizablePanel>
        </ResizablePanelGroup>
      );

      const group = screen.getByTestId('panel-group');
      expect(group).toHaveClass('mdt-flex', 'mdt-h-full', 'mdt-w-full');
    });
  });

  describe('ResizablePanel', () => {
    it('renders correctly', () => {
      render(
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel>Panel Content</ResizablePanel>
        </ResizablePanelGroup>
      );

      expect(screen.getByTestId('panel')).toBeInTheDocument();
      expect(screen.getByText('Panel Content')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel>
            <div data-testid="child">Child content</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
  });

  describe('ResizableHandle', () => {
    it('renders correctly', () => {
      render(
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel>Left</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>Right</ResizablePanel>
        </ResizablePanelGroup>
      );

      expect(screen.getByTestId('resize-handle')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel>Left</ResizablePanel>
          <ResizableHandle className="custom-handle" />
          <ResizablePanel>Right</ResizablePanel>
        </ResizablePanelGroup>
      );

      const handle = screen.getByTestId('resize-handle');
      expect(handle).toHaveClass('custom-handle');
    });

    it('renders without grip handle by default', () => {
      render(
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel>Left</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>Right</ResizablePanel>
        </ResizablePanelGroup>
      );

      const handle = screen.getByTestId('resize-handle');
      expect(handle.querySelector('svg')).not.toBeInTheDocument();
    });

    it('renders grip handle when withHandle is true', () => {
      render(
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel>Left</ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>Right</ResizablePanel>
        </ResizablePanelGroup>
      );

      const handle = screen.getByTestId('resize-handle');
      expect(handle.querySelector('svg')).toBeInTheDocument();
    });

    it('has correct ARIA role', () => {
      render(
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel>Left</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>Right</ResizablePanel>
        </ResizablePanelGroup>
      );

      const handle = screen.getByRole('separator');
      expect(handle).toBeInTheDocument();
    });

    it('applies base styling classes', () => {
      render(
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel>Left</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>Right</ResizablePanel>
        </ResizablePanelGroup>
      );

      const handle = screen.getByTestId('resize-handle');
      expect(handle).toHaveClass(
        'mdt-relative',
        'mdt-flex',
        'mdt-items-center',
        'mdt-justify-center'
      );
    });
  });

  describe('Combined Layout', () => {
    it('renders horizontal layout with multiple panels', () => {
      render(
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel>Panel 1</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>Panel 2</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>Panel 3</ResizablePanel>
        </ResizablePanelGroup>
      );

      const panels = screen.getAllByTestId('panel');
      const handles = screen.getAllByTestId('resize-handle');

      expect(panels).toHaveLength(3);
      expect(handles).toHaveLength(2);
    });

    it('renders vertical layout', () => {
      render(
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel>Top</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>Bottom</ResizablePanel>
        </ResizablePanelGroup>
      );

      const group = screen.getByTestId('panel-group');
      expect(group).toHaveAttribute('data-panel-group-direction', 'vertical');
    });

    it('renders nested resizable layouts', () => {
      render(
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel>
            <ResizablePanelGroup orientation="vertical">
              <ResizablePanel>Nested Top</ResizablePanel>
              <ResizableHandle />
              <ResizablePanel>Nested Bottom</ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>Right</ResizablePanel>
        </ResizablePanelGroup>
      );

      const groups = screen.getAllByTestId('panel-group');
      expect(groups).toHaveLength(2);
    });
  });
});
