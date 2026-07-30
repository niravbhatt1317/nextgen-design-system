import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from './Sheet';

// Mock matchMedia for Radix UI
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe('Sheet', () => {
  describe('Basic Rendering', () => {
    it('renders trigger correctly', () => {
      render(
        <Sheet>
          <SheetTrigger>Open Sheet</SheetTrigger>
          <SheetContent aria-describedby={undefined}>
            <SheetTitle>Sheet Title</SheetTitle>
            <p>Content</p>
          </SheetContent>
        </Sheet>
      );

      expect(screen.getByText('Open Sheet')).toBeInTheDocument();
    });

    it('opens sheet when trigger is clicked', async () => {
      render(
        <Sheet>
          <SheetTrigger>Open Sheet</SheetTrigger>
          <SheetContent aria-describedby={undefined}>
            <SheetTitle>Sheet Title</SheetTitle>
            <p>Sheet Content</p>
          </SheetContent>
        </Sheet>
      );

      const trigger = screen.getByText('Open Sheet');
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Sheet Content')).toBeInTheDocument();
      });
    });

    it('renders with controlled open state', () => {
      render(
        <Sheet open>
          <SheetTrigger>Open Sheet</SheetTrigger>
          <SheetContent aria-describedby={undefined}>
            <SheetTitle>Sheet Title</SheetTitle>
            <p>Controlled Content</p>
          </SheetContent>
        </Sheet>
      );

      expect(screen.getByText('Controlled Content')).toBeInTheDocument();
    });
  });

  describe('SheetContent', () => {
    it('renders with default right side', async () => {
      render(
        <Sheet open>
          <SheetContent data-testid="sheet-content" aria-describedby={undefined}>
            <SheetTitle>Sheet Title</SheetTitle>
            <p>Content</p>
          </SheetContent>
        </Sheet>
      );

      const content = screen.getByTestId('sheet-content');
      expect(content).toHaveClass('mdt-right-0');
    });

    it('renders with left side', async () => {
      render(
        <Sheet open>
          <SheetContent side="left" data-testid="sheet-content" aria-describedby={undefined}>
            <SheetTitle>Sheet Title</SheetTitle>
            <p>Content</p>
          </SheetContent>
        </Sheet>
      );

      const content = screen.getByTestId('sheet-content');
      expect(content).toHaveClass('mdt-left-0');
    });

    it('renders with top side', async () => {
      render(
        <Sheet open>
          <SheetContent side="top" data-testid="sheet-content" aria-describedby={undefined}>
            <SheetTitle>Sheet Title</SheetTitle>
            <p>Content</p>
          </SheetContent>
        </Sheet>
      );

      const content = screen.getByTestId('sheet-content');
      expect(content).toHaveClass('mdt-top-0');
    });

    it('renders with bottom side', async () => {
      render(
        <Sheet open>
          <SheetContent side="bottom" data-testid="sheet-content" aria-describedby={undefined}>
            <SheetTitle>Sheet Title</SheetTitle>
            <p>Content</p>
          </SheetContent>
        </Sheet>
      );

      const content = screen.getByTestId('sheet-content');
      expect(content).toHaveClass('mdt-bottom-0');
    });

    it('applies custom className', async () => {
      render(
        <Sheet open>
          <SheetContent
            className="custom-sheet"
            data-testid="sheet-content"
            aria-describedby={undefined}
          >
            <SheetTitle>Sheet Title</SheetTitle>
            <p>Content</p>
          </SheetContent>
        </Sheet>
      );

      const content = screen.getByTestId('sheet-content');
      expect(content).toHaveClass('custom-sheet');
    });

    it('shows close button by default', async () => {
      render(
        <Sheet open>
          <SheetContent aria-describedby={undefined}>
            <SheetTitle>Sheet Title</SheetTitle>
            <p>Content</p>
          </SheetContent>
        </Sheet>
      );

      expect(screen.getByText('Close')).toBeInTheDocument();
    });

    it('hides close button when showCloseButton is false', async () => {
      render(
        <Sheet open>
          <SheetContent showCloseButton={false} aria-describedby={undefined}>
            <SheetTitle>Sheet Title</SheetTitle>
            <p>Content</p>
          </SheetContent>
        </Sheet>
      );

      expect(screen.queryByText('Close')).not.toBeInTheDocument();
    });

    it('applies default width class when no custom width is provided', async () => {
      render(
        <Sheet open>
          <SheetContent side="right" data-testid="sheet-content" aria-describedby={undefined}>
            <SheetTitle>Sheet Title</SheetTitle>
            <p>Content</p>
          </SheetContent>
        </Sheet>
      );

      const content = screen.getByTestId('sheet-content');
      expect(content).toHaveClass('mdt-w-3/4');
    });

    it('applies custom width class and removes default width', async () => {
      render(
        <Sheet open>
          <SheetContent
            side="right"
            className="mdt-w-[500px]"
            data-testid="sheet-content"
            aria-describedby={undefined}
          >
            <SheetTitle>Sheet Title</SheetTitle>
            <p>Content</p>
          </SheetContent>
        </Sheet>
      );

      const content = screen.getByTestId('sheet-content');
      expect(content).toHaveClass('mdt-w-[500px]');
      expect(content).not.toHaveClass('mdt-w-3/4');
    });

    it('applies full width class correctly', async () => {
      render(
        <Sheet open>
          <SheetContent
            side="right"
            className="mdt-w-full"
            data-testid="sheet-content"
            aria-describedby={undefined}
          >
            <SheetTitle>Sheet Title</SheetTitle>
            <p>Content</p>
          </SheetContent>
        </Sheet>
      );

      const content = screen.getByTestId('sheet-content');
      expect(content).toHaveClass('mdt-w-full');
      expect(content).not.toHaveClass('mdt-w-3/4');
    });

    it('applies max-width class and removes default width', async () => {
      render(
        <Sheet open>
          <SheetContent
            side="left"
            className="mdt-max-w-lg"
            data-testid="sheet-content"
            aria-describedby={undefined}
          >
            <SheetTitle>Sheet Title</SheetTitle>
            <p>Content</p>
          </SheetContent>
        </Sheet>
      );

      const content = screen.getByTestId('sheet-content');
      expect(content).toHaveClass('mdt-max-w-lg');
      expect(content).not.toHaveClass('mdt-w-3/4');
    });

    it('does not apply default width for top/bottom sides', async () => {
      render(
        <Sheet open>
          <SheetContent side="top" data-testid="sheet-content" aria-describedby={undefined}>
            <SheetTitle>Sheet Title</SheetTitle>
            <p>Content</p>
          </SheetContent>
        </Sheet>
      );

      const content = screen.getByTestId('sheet-content');
      expect(content).not.toHaveClass('mdt-w-3/4');
    });
  });

  describe('SheetHeader', () => {
    it('renders correctly', async () => {
      render(
        <Sheet open>
          <SheetContent aria-describedby={undefined}>
            <SheetHeader data-testid="sheet-header">
              <SheetTitle>Header Title</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      );

      const header = screen.getByTestId('sheet-header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('mdt-flex', 'mdt-flex-col');
    });

    it('applies custom className', async () => {
      render(
        <Sheet open>
          <SheetContent aria-describedby={undefined}>
            <SheetHeader className="custom-header" data-testid="sheet-header">
              <SheetTitle>Title</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      );

      const header = screen.getByTestId('sheet-header');
      expect(header).toHaveClass('custom-header');
    });
  });

  describe('SheetFooter', () => {
    it('renders correctly', async () => {
      render(
        <Sheet open>
          <SheetContent aria-describedby={undefined}>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetFooter data-testid="sheet-footer">
              <button>Save</button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );

      const footer = screen.getByTestId('sheet-footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('mdt-flex');
    });

    it('applies custom className', async () => {
      render(
        <Sheet open>
          <SheetContent aria-describedby={undefined}>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetFooter className="custom-footer" data-testid="sheet-footer">
              <button>Save</button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );

      const footer = screen.getByTestId('sheet-footer');
      expect(footer).toHaveClass('custom-footer');
    });
  });

  describe('SheetTitle', () => {
    it('renders correctly', async () => {
      render(
        <Sheet open>
          <SheetContent aria-describedby={undefined}>
            <SheetTitle data-testid="sheet-title">My Sheet Title</SheetTitle>
          </SheetContent>
        </Sheet>
      );

      const title = screen.getByTestId('sheet-title');
      expect(title).toHaveTextContent('My Sheet Title');
      expect(title).toHaveClass('mdt-text-lg', 'mdt-font-semibold');
    });

    it('applies custom className', async () => {
      render(
        <Sheet open>
          <SheetContent aria-describedby={undefined}>
            <SheetTitle className="custom-title" data-testid="sheet-title">
              Title
            </SheetTitle>
          </SheetContent>
        </Sheet>
      );

      const title = screen.getByTestId('sheet-title');
      expect(title).toHaveClass('custom-title');
    });
  });

  describe('SheetDescription', () => {
    it('renders correctly', async () => {
      render(
        <Sheet open>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription data-testid="sheet-description">
              This is a description
            </SheetDescription>
          </SheetContent>
        </Sheet>
      );

      const description = screen.getByTestId('sheet-description');
      expect(description).toHaveTextContent('This is a description');
      expect(description).toHaveClass('mdt-text-sm', 'mdt-text-muted-foreground');
    });

    it('applies custom className', async () => {
      render(
        <Sheet open>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription className="custom-description" data-testid="sheet-description">
              Description
            </SheetDescription>
          </SheetContent>
        </Sheet>
      );

      const description = screen.getByTestId('sheet-description');
      expect(description).toHaveClass('custom-description');
    });
  });

  describe('SheetClose', () => {
    it('renders correctly', async () => {
      render(
        <Sheet open>
          <SheetContent aria-describedby={undefined}>
            <SheetTitle>Title</SheetTitle>
            <SheetClose data-testid="close-button">Close</SheetClose>
          </SheetContent>
        </Sheet>
      );

      expect(screen.getByTestId('close-button')).toBeInTheDocument();
    });

    it('closes sheet when clicked', async () => {
      const onOpenChange = vi.fn();
      render(
        <Sheet open onOpenChange={onOpenChange}>
          <SheetContent aria-describedby={undefined}>
            <SheetTitle>Title</SheetTitle>
            <SheetClose data-testid="close-button">Close Sheet</SheetClose>
          </SheetContent>
        </Sheet>
      );

      const closeButton = screen.getByTestId('close-button');
      fireEvent.click(closeButton);

      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe('Accessibility', () => {
    it('has role dialog', async () => {
      render(
        <Sheet open>
          <SheetContent aria-describedby={undefined}>
            <SheetTitle>Accessible Sheet</SheetTitle>
            <p>Content</p>
          </SheetContent>
        </Sheet>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has aria-labelledby when SheetTitle is present', async () => {
      render(
        <Sheet open>
          <SheetContent aria-describedby={undefined}>
            <SheetTitle>My Title</SheetTitle>
          </SheetContent>
        </Sheet>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby');
    });

    it('has aria-describedby when SheetDescription is present', async () => {
      render(
        <Sheet open>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>Description for context</SheetDescription>
          </SheetContent>
        </Sheet>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-describedby');
    });

    it('close button has sr-only text', async () => {
      render(
        <Sheet open>
          <SheetContent aria-describedby={undefined}>
            <SheetTitle>Title</SheetTitle>
          </SheetContent>
        </Sheet>
      );

      const srOnlyText = screen.getByText('Close');
      expect(srOnlyText).toHaveClass('mdt-sr-only');
    });
  });

  describe('Complete Layout', () => {
    it('renders full sheet with all components', async () => {
      render(
        <Sheet open>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit Profile</SheetTitle>
              <SheetDescription>Make changes to your profile here.</SheetDescription>
            </SheetHeader>
            <div data-testid="main-content">Form goes here</div>
            <SheetFooter>
              <SheetClose>Cancel</SheetClose>
              <button type="submit">Save</button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );

      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
      expect(screen.getByText('Make changes to your profile here.')).toBeInTheDocument();
      expect(screen.getByTestId('main-content')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });
  });
});
