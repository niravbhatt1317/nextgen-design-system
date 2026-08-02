import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { CodeWell } from './CodeWell';

const CMD = 'npm install @mtdt/nextgen-design-system';
const BODY = 'codewell-body';

const writeText = vi.fn(() => Promise.resolve());

beforeEach(() => {
  writeText.mockClear();
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
    writable: true,
  });
});

describe('CodeWell', () => {
  describe('rendering', () => {
    it('renders its content', () => {
      render(<CodeWell>{CMD}</CodeWell>);
      expect(screen.getByTestId(BODY)).toHaveTextContent(CMD);
    });

    it('is monospaced', () => {
      render(<CodeWell>{CMD}</CodeWell>);
      expect(screen.getByTestId(BODY)).toHaveClass('mdt-font-mono');
    });

    it('is light by default', () => {
      render(<CodeWell>{CMD}</CodeWell>);
      expect(screen.getByTestId(BODY)).toHaveClass('mdt-bg-muted');
    });

    it('has a dark surface for terminal output', () => {
      render(<CodeWell surface="dark">{CMD}</CodeWell>);
      expect(screen.getByTestId(BODY)).toHaveClass('mdt-bg-neutral-160');
    });

    it('scrolls rather than wrapping a long line', () => {
      render(<CodeWell>{CMD}</CodeWell>);
      expect(screen.getByTestId(BODY)).toHaveClass('mdt-overflow-x-auto');
    });

    it('shows a label when given one', () => {
      render(<CodeWell label="Install command">{CMD}</CodeWell>);
      expect(screen.getByText('Install command')).toBeInTheDocument();
    });

    it('shows no label otherwise', () => {
      render(<CodeWell>{CMD}</CodeWell>);
      expect(screen.queryByText('Install command')).not.toBeInTheDocument();
    });

    it('merges a custom className', () => {
      const { container } = render(<CodeWell className="mdt-mt-4">{CMD}</CodeWell>);
      expect(container.firstChild).toHaveClass('mdt-mt-4');
    });

    it('forwards a ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<CodeWell ref={ref}>{CMD}</CodeWell>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('copy', () => {
    it('shows no copy button unless asked', () => {
      render(<CodeWell>{CMD}</CodeWell>);
      expect(screen.queryByRole('button', { name: 'Copy' })).not.toBeInTheDocument();
    });

    it('copies its content', async () => {
      render(<CodeWell copyable>{CMD}</CodeWell>);
      await userEvent.click(screen.getByRole('button', { name: 'Copy' }));
      expect(writeText).toHaveBeenCalledWith(CMD);
    });

    it('confirms it copied', async () => {
      render(<CodeWell copyable>{CMD}</CodeWell>);
      await userEvent.click(screen.getByRole('button', { name: 'Copy' }));
      expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument();
    });

    it('copies the raw value rather than the rendered children', async () => {
      render(
        <CodeWell copyable value="raw-secret">
          <span>decorated</span>
        </CodeWell>
      );
      await userEvent.click(screen.getByRole('button', { name: 'Copy' }));
      expect(writeText).toHaveBeenCalledWith('raw-secret');
    });

    it('copies an empty string when children are not text and no value is given', async () => {
      render(
        <CodeWell copyable>
          <span>decorated</span>
        </CodeWell>
      );
      await userEvent.click(screen.getByRole('button', { name: 'Copy' }));
      expect(writeText).toHaveBeenCalledWith('');
    });
  });

  describe('mask', () => {
    it('shows the content by default', () => {
      render(<CodeWell>{CMD}</CodeWell>);
      expect(screen.getByTestId(BODY)).toHaveTextContent(CMD);
    });

    it('hides the content when maskable', () => {
      render(<CodeWell maskable>{CMD}</CodeWell>);
      expect(screen.getByTestId(BODY)).not.toHaveTextContent(CMD);
    });

    it('says something is hidden rather than showing an unexplained blank', () => {
      render(<CodeWell maskable>{CMD}</CodeWell>);
      expect(screen.getByText('Hidden value')).toBeInTheDocument();
    });

    it('reveals on request', async () => {
      render(<CodeWell maskable>{CMD}</CodeWell>);
      await userEvent.click(screen.getByRole('button', { name: 'Reveal' }));
      expect(screen.getByTestId(BODY)).toHaveTextContent(CMD);
    });

    it('hides again', async () => {
      render(<CodeWell maskable>{CMD}</CodeWell>);
      await userEvent.click(screen.getByRole('button', { name: 'Reveal' }));
      await userEvent.click(screen.getByRole('button', { name: 'Hide' }));
      expect(screen.getByTestId(BODY)).not.toHaveTextContent(CMD);
    });

    it('still copies the real value while masked', async () => {
      render(
        <CodeWell maskable copyable>
          {CMD}
        </CodeWell>
      );
      await userEvent.click(screen.getByRole('button', { name: 'Copy' }));
      expect(writeText).toHaveBeenCalledWith(CMD);
    });

    it('is the same height masked and revealed', async () => {
      // The dots used to render a text size larger than the well, which made
      // the well 4px taller while masked and shrink the moment it was revealed.
      render(<CodeWell maskable>{CMD}</CodeWell>);
      const dots = screen.getByTestId('secret-dots-bullets').parentElement;
      expect(dots).toHaveClass('mdt-text-xs');
      expect(screen.getByTestId(BODY)).toHaveClass('mdt-text-xs');
    });
  });

  describe('truncate', () => {
    const LONG = 'a'.repeat(200);

    /** jsdom reports every width as 0, so overflow has to be faked to test it. */
    const withWidths = (scroll: number, client: number) => {
      const scrollSpy = vi
        .spyOn(HTMLElement.prototype, 'scrollWidth', 'get')
        .mockReturnValue(scroll);
      const clientSpy = vi
        .spyOn(HTMLElement.prototype, 'clientWidth', 'get')
        .mockReturnValue(client);
      return () => {
        scrollSpy.mockRestore();
        clientSpy.mockRestore();
      };
    };

    it('cuts the value to one line', () => {
      render(<CodeWell truncate>{LONG}</CodeWell>);
      expect(screen.getByTestId(BODY)).toHaveClass(
        'mdt-overflow-hidden',
        'mdt-text-ellipsis',
        'mdt-whitespace-nowrap'
      );
    });

    it('scrolls sideways instead when truncate is off', () => {
      render(<CodeWell>{LONG}</CodeWell>);
      expect(screen.getByTestId(BODY)).toHaveClass('mdt-overflow-x-auto');
      expect(screen.getByTestId(BODY)).not.toHaveClass('mdt-overflow-hidden');
    });

    it('becomes focusable when the value is actually cut', () => {
      const restore = withWidths(900, 300);
      render(<CodeWell truncate>{LONG}</CodeWell>);
      expect(screen.getByTestId(BODY)).toHaveAttribute('tabindex', '0');
      restore();
    });

    it('stays unfocusable when the value already fits', () => {
      const restore = withWidths(120, 300);
      render(<CodeWell truncate>short</CodeWell>);
      expect(screen.getByTestId(BODY)).not.toHaveAttribute('tabindex');
      restore();
    });

    it('shows the whole value on hover when it is cut', async () => {
      const restore = withWidths(900, 300);
      render(<CodeWell truncate>{LONG}</CodeWell>);
      await userEvent.hover(screen.getByTestId(BODY));
      expect(await screen.findAllByText(LONG)).not.toHaveLength(0);
      restore();
    });

    it('offers no tooltip while the value is masked', async () => {
      const restore = withWidths(900, 300);
      render(
        <CodeWell truncate maskable value={LONG}>
          {LONG}
        </CodeWell>
      );
      await userEvent.hover(screen.getByTestId(BODY));
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      restore();
    });

    it('still copies the whole value when it is cut', async () => {
      const restore = withWidths(900, 300);
      render(
        <CodeWell truncate copyable>
          {LONG}
        </CodeWell>
      );
      await userEvent.click(screen.getByRole('button', { name: 'Copy' }));
      expect(writeText).toHaveBeenCalledWith(LONG);
      restore();
    });
  });

  describe('controls', () => {
    it('reserves room so the content never runs under one control', () => {
      render(<CodeWell copyable>{CMD}</CodeWell>);
      expect(screen.getByTestId(BODY)).toHaveClass('mdt-pr-16');
    });

    it('reserves more room for two controls', () => {
      render(
        <CodeWell copyable maskable>
          {CMD}
        </CodeWell>
      );
      expect(screen.getByTestId(BODY)).toHaveClass('mdt-pr-32');
    });

    it('reserves nothing when there are no controls', () => {
      render(<CodeWell>{CMD}</CodeWell>);
      const body = screen.getByTestId(BODY);
      expect(body).not.toHaveClass('mdt-pr-16');
      expect(body).not.toHaveClass('mdt-pr-32');
    });
  });
});
