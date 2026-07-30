import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Toast, toast } from './Toast';
import { ToastBody } from './ToastBody';
import { ToastPromo } from './ToastPromo';
import { promoStore } from './promoStore';

describe('Toast', () => {
  it('renders Toast component', () => {
    const { container } = render(<Toast />);
    // Sonner renders in a portal with specific class
    const toaster = container.querySelector('ol') || document.querySelector('ol');
    expect(toaster || container.firstChild).toBeTruthy();
  });

  it('renders with custom position', () => {
    const { container } = render(<Toast position="top-center" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with theme', () => {
    const { container } = render(<Toast theme="dark" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with custom duration', () => {
    const { container } = render(<Toast duration={5000} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with close button', () => {
    const { container } = render(<Toast closeButton />);
    expect(container.firstChild).toBeTruthy();
  });

  it('exports toast function', () => {
    expect(typeof toast).toBe('function');
    expect(typeof toast.success).toBe('function');
    expect(typeof toast.error).toBe('function');
    expect(typeof toast.warning).toBe('function');
    expect(typeof toast.info).toBe('function');
    expect(typeof toast.promise).toBe('function');
  });

  it('toast function creates notifications', () => {
    render(<Toast />);
    const toastId = toast('Test message');
    expect(toastId).toBeDefined();
  });

  it('toast.success creates success notification', () => {
    render(<Toast />);
    const toastId = toast.success('Success message');
    expect(toastId).toBeDefined();
  });

  it('toast.error creates error notification', () => {
    render(<Toast />);
    const toastId = toast.error('Error message');
    expect(toastId).toBeDefined();
  });

  it('toast.warning creates warning notification', () => {
    render(<Toast />);
    const toastId = toast.warning('Warning message');
    expect(toastId).toBeDefined();
  });

  it('toast.info creates info notification', () => {
    render(<Toast />);
    const toastId = toast.info('Info message');
    expect(toastId).toBeDefined();
  });

  it('toast.loading creates loading notification', () => {
    render(<Toast />);
    const toastId = toast.loading('Loading message');
    expect(toastId).toBeDefined();
  });

  it('toast.message creates message notification', () => {
    render(<Toast />);
    const toastId = toast.message('Message notification');
    expect(toastId).toBeDefined();
  });

  it('toast.custom creates custom notification', () => {
    render(<Toast />);
    const CustomComponent = () => <div>Custom content</div>;
    const toastId = toast.custom(CustomComponent);
    expect(toastId).toBeDefined();
  });
});

describe('ToastBody — the surface', () => {
  const TONES = ['info', 'warning', 'danger', 'success', 'ai', 'neutral'] as const;

  it.each(TONES)('renders the %s tone', (tone) => {
    render(<ToastBody tone={tone} title="Title" description="Body" />);
    expect(screen.getByTestId('toast')).toHaveAttribute('data-tone', tone);
  });

  it.each(TONES)('shows the close control on %s by default', (tone) => {
    render(<ToastBody tone={tone} description="Body" />);
    expect(screen.getByTestId('toast-close')).toBeInTheDocument();
  });

  it.each(TONES)('hides the close control on %s when closable is false', (tone) => {
    render(<ToastBody tone={tone} closable={false} description="Body" />);
    expect(screen.queryByTestId('toast-close')).not.toBeInTheDocument();
  });

  it('calls onClose when the close control is used', async () => {
    const onClose = vi.fn();
    render(<ToastBody description="Body" onClose={onClose} />);
    await userEvent.click(screen.getByTestId('toast-close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('labels the close control for screen readers', () => {
    render(<ToastBody description="Body" />);
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('keeps the text one colour whatever the tone', () => {
    // Om's rule: only the icon and the border carry the tone.
    const { rerender } = render(<ToastBody tone="danger" title="T" description="D" />);
    const danger = screen.getByTestId('toast-title').className;
    rerender(<ToastBody tone="success" title="T" description="D" />);
    expect(screen.getByTestId('toast-title').className).toBe(danger);
  });

  it('renders a title only when one is given', () => {
    render(<ToastBody description="Just a line" />);
    expect(screen.queryByTestId('toast-title')).not.toBeInTheDocument();
    expect(screen.getByTestId('toast-description')).toHaveTextContent('Just a line');
  });

  it('swaps the tone glyph for a spinner while loading', () => {
    const { container } = render(<ToastBody loading tone="neutral" description="Working" />);
    expect(container.querySelector('.mdt-animate-spin')).toBeInTheDocument();
  });

  it('lets a caller replace the glyph', () => {
    render(<ToastBody icon={<span data-testid="own-icon">*</span>} description="Body" />);
    expect(screen.getByTestId('own-icon')).toBeInTheDocument();
  });

  it('runs an action when it is clicked', async () => {
    const onClick = vi.fn();
    render(<ToastBody description="Body" action={{ label: 'Undo', onClick }} />);
    await userEvent.click(screen.getByTestId('toast-action'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['sm', 'mdt-text-xs'],
    ['md', 'mdt-text-sm'],
  ] as const)('applies the %s size', (size, expected) => {
    render(<ToastBody size={size} description="Body" />);
    expect(screen.getByTestId('toast')).toHaveClass(expected);
  });

  it('top-aligns the row, so the icon holds the first line when text wraps', () => {
    render(<ToastBody description="Body" />);
    expect(screen.getByTestId('toast')).toHaveClass('mdt-items-start');
  });

  it('announces itself without stealing focus', () => {
    render(<ToastBody description="Saved" />);
    expect(screen.getByTestId('toast').tagName).toBe('OUTPUT');
  });
});

describe('toast — the tones it offers', () => {
  it.each(['success', 'danger', 'error', 'warning', 'info', 'ai', 'neutral', 'loading'] as const)(
    'exposes toast.%s',
    (name) => {
      expect(typeof toast[name]).toBe('function');
    }
  );
});

describe('ToastPromo — the promotional toast', () => {
  it('renders its title', () => {
    render(<ToastPromo title="Introducing Agent Fleet" />);
    expect(screen.getByTestId('toast-promo-title')).toHaveTextContent('Introducing Agent Fleet');
  });

  it('shows the dismiss cross by default', () => {
    render(<ToastPromo title="News" />);
    expect(screen.getByTestId('toast-promo-close')).toBeInTheDocument();
  });

  it('hides the cross when closable is false', () => {
    render(<ToastPromo title="News" closable={false} />);
    expect(screen.queryByTestId('toast-promo-close')).not.toBeInTheDocument();
  });

  it('calls onClose when the cross is used', async () => {
    const onClose = vi.fn();
    render(<ToastPromo title="News" onClose={onClose} />);
    await userEvent.click(screen.getByTestId('toast-promo-close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('holds the layout together with no picture', () => {
    render(<ToastPromo title="News" description="Something happened." />);
    expect(screen.queryByTestId('toast-promo-media')).not.toBeInTheDocument();
    expect(screen.getByTestId('toast-promo-description')).toBeInTheDocument();
  });

  it('shows a picture when one is given', () => {
    render(<ToastPromo title="News" media={<span data-testid="art">art</span>} />);
    expect(screen.getByTestId('toast-promo-media')).toBeInTheDocument();
    expect(screen.getByTestId('art')).toBeInTheDocument();
  });

  it('shows no action unless one is given', () => {
    render(<ToastPromo title="News" description="Body" />);
    expect(screen.queryByTestId('toast-promo-action')).not.toBeInTheDocument();
  });

  it('runs the action when it is clicked', async () => {
    const onClick = vi.fn();
    render(<ToastPromo title="News" action={{ label: 'Take a look', onClick }} />);
    await userEvent.click(screen.getByTestId('toast-promo-action'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('takes no tone — an announcement is neither good news nor bad', () => {
    const { container } = render(<ToastPromo title="News" />);
    expect(container.querySelector('[data-tone]')).not.toBeInTheDocument();
  });

  it('announces itself without stealing focus', () => {
    render(<ToastPromo title="News" />);
    expect(screen.getByTestId('toast-promo').tagName).toBe('OUTPUT');
  });

  it('is offered on the toast function', () => {
    expect(typeof toast.promotional).toBe('function');
  });
});

describe('promotional toast — Blade’s rules', () => {
  afterEach(() => {
    promoStore.dismiss();
  });

  it('reports nothing open to begin with', () => {
    expect(promoStore.isOpen()).toBe(false);
  });

  it('opens one', () => {
    promoStore.show({ title: 'News' }, 0);
    expect(promoStore.isOpen()).toBe(true);
  });

  it('never holds two — a second replaces the first', () => {
    promoStore.show({ title: 'First' }, 0);
    const first = promoStore.get();
    promoStore.show({ title: 'Second' }, 0);
    const second = promoStore.get();

    expect(second?.title).toBe('Second');
    expect(second?.key).not.toBe(first?.key);
    expect(promoStore.isOpen()).toBe(true);
  });

  it('closes on dismiss', () => {
    promoStore.show({ title: 'News' }, 0);
    promoStore.dismiss();
    expect(promoStore.isOpen()).toBe(false);
  });

  it('tells subscribers when it opens and closes', () => {
    const heard = vi.fn();
    const stop = promoStore.subscribe(heard);
    promoStore.show({ title: 'News' }, 0);
    promoStore.dismiss();
    stop();
    expect(heard).toHaveBeenCalledTimes(2);
  });

  it('stops telling a subscriber that has unsubscribed', () => {
    const heard = vi.fn();
    promoStore.subscribe(heard)();
    promoStore.show({ title: 'News' }, 0);
    expect(heard).not.toHaveBeenCalled();
  });

  it('closes itself after its time is up', () => {
    vi.useFakeTimers();
    promoStore.show({ title: 'News' }, 8000);
    expect(promoStore.isOpen()).toBe(true);
    vi.advanceTimersByTime(8000);
    expect(promoStore.isOpen()).toBe(false);
    vi.useRealTimers();
  });

  it('restarts the clock when replaced, rather than inheriting it', () => {
    vi.useFakeTimers();
    promoStore.show({ title: 'First' }, 8000);
    vi.advanceTimersByTime(7000);
    promoStore.show({ title: 'Second' }, 8000);
    vi.advanceTimersByTime(7000);
    expect(promoStore.isOpen()).toBe(true);
    vi.advanceTimersByTime(1000);
    expect(promoStore.isOpen()).toBe(false);
    vi.useRealTimers();
  });

  it('stays put when nothing is open and dismiss is called anyway', () => {
    expect(() => {
      promoStore.dismiss();
    }).not.toThrow();
  });

  it('is offered on the toast function', () => {
    expect(typeof toast.promotional).toBe('function');
    expect(typeof toast.dismissPromotional).toBe('function');
  });
});
