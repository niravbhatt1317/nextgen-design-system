import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetBand,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SHEET_SIZES,
} from './Sheet';
import { Stepper } from '../Stepper';
import { Tabs, TabsList, TabsTrigger } from '../Tabs';

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

  /* the console drawer's additions, ported (Pranjal, 2026-10-13) */
  describe('Size scale', () => {
    it('holds the console scale', () => {
      expect(SHEET_SIZES).toEqual({ sm: 480, md: 560, lg: 720, xl: 780 });
    });

    it.each([
      ['sm', 'mdt-w-[480px]'],
      ['md', 'mdt-w-[560px]'],
      ['lg', 'mdt-w-[720px]'],
      ['xl', 'mdt-w-[780px]'],
    ] as const)('size %s sets %s and replaces the default width', (size, cls) => {
      render(
        <Sheet open>
          <SheetContent size={size} aria-describedby={undefined}>
            <SheetTitle>Sized</SheetTitle>
          </SheetContent>
        </Sheet>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass(cls, 'mdt-max-w-[100vw]');
      expect(dialog).not.toHaveClass('mdt-w-3/4');
      expect(dialog).toHaveAttribute('data-size', size);
    });

    it('ignores size on a top or bottom sheet', () => {
      render(
        <Sheet open>
          <SheetContent side="top" size="lg" aria-describedby={undefined}>
            <SheetTitle>Top</SheetTitle>
          </SheetContent>
        </Sheet>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).not.toHaveClass('mdt-w-[720px]');
      expect(dialog).not.toHaveAttribute('data-size');
    });

    it('lets a width class in className win over size', () => {
      render(
        <Sheet open>
          <SheetContent size="lg" className="mdt-w-[300px]" aria-describedby={undefined}>
            <SheetTitle>Custom</SheetTitle>
          </SheetContent>
        </Sheet>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass('mdt-w-[300px]');
      expect(dialog).not.toHaveClass('mdt-w-[720px]');
    });
  });

  describe('Drawer layout', () => {
    const renderDrawer = (
      opts: {
        onOpenChange?: (open: boolean) => void;
        actions?: React.ReactNode;
        showClose?: boolean;
        showCloseButton?: boolean;
        inset?: 16 | 20 | 24;
      } = {}
    ) =>
      render(
        <Sheet open {...(opts.onOpenChange ? { onOpenChange: opts.onOpenChange } : {})}>
          <SheetContent
            layout="drawer"
            size="md"
            aria-describedby={undefined}
            {...(opts.inset ? { inset: opts.inset } : {})}
            {...(opts.showCloseButton !== undefined
              ? { showCloseButton: opts.showCloseButton }
              : {})}
          >
            <SheetHeader
              data-testid="header"
              {...(opts.actions ? { actions: opts.actions } : {})}
              {...(opts.showClose !== undefined ? { showClose: opts.showClose } : {})}
            >
              <SheetTitle>Edit team</SheetTitle>
            </SheetHeader>
            <SheetBand data-testid="band">band</SheetBand>
            <SheetBody data-testid="body">body</SheetBody>
            <SheetFooter data-testid="footer" start={<button type="button">Delete</button>}>
              <button type="button">Cancel</button>
              <button type="button">Save</button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );

    it('is the frame: no padding, no edge, a column', () => {
      renderDrawer();
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('data-layout', 'drawer');
      expect(dialog).toHaveClass(
        'mdt-flex',
        'mdt-flex-col',
        'mdt-gap-0',
        'mdt-p-0',
        'mdt-border-0'
      );
      expect(dialog).not.toHaveClass('mdt-p-6', 'mdt-border-l');
    });

    it('puts the one close in the header row, not the corner', () => {
      renderDrawer();
      const closes = screen.getAllByRole('button', { name: 'Close' });
      expect(closes).toHaveLength(1);
      expect(screen.getByTestId('header')).toContainElement(closes[0] ?? null);
      expect(closes[0]).not.toHaveClass('mdt-absolute');
    });

    it('still shows the corner close when asked', () => {
      renderDrawer({ showCloseButton: true });
      expect(screen.getAllByRole('button', { name: 'Close' })).toHaveLength(2);
    });

    it('drops the header close with showClose={false}', () => {
      renderDrawer({ showClose: false });
      expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
    });

    it('closes from the header close', () => {
      const onOpenChange = vi.fn();
      renderDrawer({ onOpenChange });
      fireEvent.click(screen.getByRole('button', { name: 'Close' }));
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('lays the header out as one row: title, actions, close', () => {
      renderDrawer({ actions: <button type="button">More actions</button> });
      const header = screen.getByTestId('header');
      expect(header).toHaveClass(
        'mdt-flex-row',
        'mdt-items-center',
        'mdt-min-h-[60px]',
        'mdt-border-b',
        'mdt-border-border'
      );
      const order = Array.from(header.querySelectorAll('h2, button')).map((el) => el.textContent);
      expect(order).toEqual(['Edit team', 'More actions', 'Close']);
    });

    it('sets the title at 14/600 on a 20 line in the heading ink, taking the free width', () => {
      renderDrawer();
      const title = screen.getByText('Edit team');
      expect(title).toHaveClass(
        'mdt-text-sm',
        'mdt-leading-5',
        'mdt-font-semibold',
        'mdt-text-neutral-150',
        'mdt-flex-1',
        'mdt-min-w-0'
      );
      expect(title).not.toHaveClass('mdt-text-base');
    });

    it('gives header, band, body and footer the 24 inset by default', () => {
      renderDrawer();
      for (const id of ['header', 'band', 'body', 'footer']) {
        expect(screen.getByTestId(id)).toHaveClass('mdt-px-6');
      }
    });

    it('takes the 20 inset', () => {
      renderDrawer({ inset: 20 });
      for (const id of ['header', 'band', 'body', 'footer']) {
        expect(screen.getByTestId(id)).toHaveClass('mdt-px-5');
        expect(screen.getByTestId(id)).not.toHaveClass('mdt-px-6');
      }
    });

    it('scrolls the body only', () => {
      renderDrawer();
      expect(screen.getByTestId('body')).toHaveClass(
        'mdt-flex-1',
        'mdt-min-h-0',
        'mdt-overflow-y-auto',
        'mdt-py-5'
      );
    });

    it('pins the footer under a hairline', () => {
      renderDrawer();
      expect(screen.getByTestId('footer')).toHaveClass(
        'mdt-shrink-0',
        'mdt-border-t',
        'mdt-border-border',
        'mdt-py-4'
      );
    });

    it('keeps Escape inside a control marked data-escape-stays', () => {
      const onOpenChange = vi.fn();
      render(
        <Sheet open onOpenChange={onOpenChange}>
          <SheetContent layout="drawer" aria-describedby={undefined}>
            <SheetTitle>Tags</SheetTitle>
            <div data-escape-stays>
              <input aria-label="Tag" />
            </div>
            <input aria-label="Other" />
          </SheetContent>
        </Sheet>
      );
      fireEvent.keyDown(screen.getByLabelText('Tag'), { key: 'Escape' });
      expect(onOpenChange).not.toHaveBeenCalled();
      fireEvent.keyDown(screen.getByLabelText('Other'), { key: 'Escape' });
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("still calls the caller's onEscapeKeyDown", () => {
      const onEscapeKeyDown = vi.fn();
      render(
        <Sheet open>
          <SheetContent
            layout="drawer"
            onEscapeKeyDown={onEscapeKeyDown}
            aria-describedby={undefined}
          >
            <SheetTitle>Esc</SheetTitle>
          </SheetContent>
        </Sheet>
      );
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
      expect(onEscapeKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe('Stack layout stays as it was', () => {
    it('keeps the column header and ignores the drawer-only slots', () => {
      render(
        <Sheet open>
          <SheetContent aria-describedby={undefined}>
            <SheetHeader data-testid="header" actions={<button type="button">More</button>}>
              <SheetTitle>Plain</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      );
      const header = screen.getByTestId('header');
      expect(header).toHaveClass('mdt-flex-col', 'mdt-space-y-2');
      expect(screen.queryByText('More')).not.toBeInTheDocument();
      expect(screen.getByText('Plain')).toHaveClass('mdt-text-lg', 'mdt-text-foreground');
      const close = screen.getByRole('button', { name: 'Close' });
      expect(close).toHaveClass('mdt-absolute', 'mdt-right-2.5', 'mdt-top-2.5');
      expect(screen.getByRole('dialog')).toHaveAttribute('data-layout', 'stack');
    });
  });

  describe('SheetBand hairline', () => {
    it('draws the line by default, with the rules that take it away', () => {
      render(
        <Sheet open>
          <SheetContent layout="drawer" aria-describedby={undefined}>
            <SheetTitle>Band</SheetTitle>
            <SheetBand data-testid="band">x</SheetBand>
          </SheetContent>
        </Sheet>
      );
      const band = screen.getByTestId('band');
      expect(band).toHaveAttribute('data-border', 'on');
      expect(band).toHaveClass(
        'mdt-border-b',
        'mdt-border-border',
        'has-[[data-slot="stepper"][data-layout="underline"]]:mdt-border-b-0',
        'has-[[data-hairline="true"]]:mdt-border-b-0'
      );
    });

    it('switches the line off with hairline={false}', () => {
      render(
        <Sheet open>
          <SheetContent layout="drawer" aria-describedby={undefined}>
            <SheetTitle>Band</SheetTitle>
            <SheetBand data-testid="band" hairline={false}>
              x
            </SheetBand>
          </SheetContent>
        </Sheet>
      );
      const band = screen.getByTestId('band');
      expect(band).toHaveAttribute('data-border', 'off');
      expect(band).not.toHaveClass('mdt-border-b');
    });

    it('finds the underline stepper the rule keys on, however deep', () => {
      render(
        <Sheet open>
          <SheetContent layout="drawer" aria-describedby={undefined}>
            <SheetTitle>Steps</SheetTitle>
            <SheetBand data-testid="band">
              <div className="mdt-py-3">
                <Stepper
                  layout="underline"
                  current={0}
                  aria-label="Steps"
                  steps={[
                    { id: 'a', label: 'Details' },
                    { id: 'b', label: 'Review' },
                  ]}
                />
              </div>
            </SheetBand>
          </SheetContent>
        </Sheet>
      );
      expect(
        screen.getByTestId('band').querySelector('[data-slot="stepper"][data-layout="underline"]')
      ).not.toBeNull();
    });

    it('finds the tab strip hairline the rule keys on', () => {
      render(
        <Sheet open>
          <SheetContent layout="drawer" aria-describedby={undefined}>
            <SheetTitle>Tabs</SheetTitle>
            <SheetBand data-testid="band">
              <Tabs value="a">
                <TabsList type="underline" hairline>
                  <TabsTrigger value="a">Details</TabsTrigger>
                  <TabsTrigger value="b">Teams</TabsTrigger>
                </TabsList>
              </Tabs>
            </SheetBand>
          </SheetContent>
        </Sheet>
      );
      expect(screen.getByTestId('band').querySelector('[data-hairline="true"]')).not.toBeNull();
    });
  });

  describe('SheetFooter slots', () => {
    it('lays out start, a spacer, then the end group', () => {
      render(
        <Sheet open>
          <SheetContent aria-describedby={undefined}>
            <SheetTitle>Footer</SheetTitle>
            <SheetFooter data-testid="footer" start={<button type="button">Delete</button>}>
              <button type="button">Cancel</button>
              <button type="button">Save</button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveClass('mdt-flex-row', 'mdt-items-center', 'mdt-gap-2');
      const slots = Array.from(footer.children).map(
        (el) => el.getAttribute('data-slot') ?? el.className
      );
      expect(slots).toEqual(['sheet-footer-start', 'mdt-flex-1', 'sheet-footer-end']);
      const end = footer.querySelector('[data-slot="sheet-footer-end"]');
      expect(end).toHaveTextContent('CancelSave');
      expect(end).toHaveClass('mdt-gap-2');
    });

    it('renders start alone with no end group', () => {
      render(
        <Sheet open>
          <SheetContent aria-describedby={undefined}>
            <SheetTitle>Footer</SheetTitle>
            <SheetFooter data-testid="footer" start={<button type="button">Close</button>} />
          </SheetContent>
        </Sheet>
      );
      const footer = screen.getByTestId('footer');
      expect(footer.querySelector('[data-slot="sheet-footer-end"]')).toBeNull();
      expect(footer.querySelector('[data-slot="sheet-footer-start"]')).toHaveTextContent('Close');
    });

    it('keeps the original right-aligned footer without start', () => {
      render(
        <Sheet open>
          <SheetContent aria-describedby={undefined}>
            <SheetTitle>Footer</SheetTitle>
            <SheetFooter data-testid="footer">
              <button type="button">Save</button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveClass('mdt-flex-col-reverse', 'sm:mdt-justify-end', 'sm:mdt-space-x-2');
      expect(footer).not.toHaveClass('mdt-border-t');
      expect(footer.querySelector('[data-slot="sheet-footer-start"]')).toBeNull();
    });
  });
});
