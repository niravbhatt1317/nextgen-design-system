import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { IconTile } from './IconTile';
import type { IconTileShape, IconTileSize, IconTileTone } from './IconTile';

const icon = <span data-testid="icon" />;

describe('IconTile', () => {
  it('renders its icon', () => {
    render(<IconTile icon={icon} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  describe('tone', () => {
    const cases: [IconTileTone, string][] = [
      ['slate', 'mdt-bg-neutral-30'],
      ['blue', 'mdt-bg-blue-10'],
      ['green', 'mdt-bg-green-10'],
      ['amber', 'mdt-bg-orange-20'],
      ['rose', 'mdt-bg-red-10'],
      ['purple', 'mdt-bg-purple-10'],
      ['outline', 'mdt-border-neutral-30'],
    ];

    it.each(cases)('applies the %s tone', (tone, expected) => {
      const { container } = render(<IconTile icon={icon} tone={tone} />);
      expect(container.firstChild).toHaveClass(expected);
    });

    it('is slate by default', () => {
      const { container } = render(<IconTile icon={icon} />);
      expect(container.firstChild).toHaveClass('mdt-bg-neutral-30');
    });
  });

  describe('size', () => {
    const cases: [IconTileSize, string][] = [
      ['sm', 'mdt-h-6'],
      ['md', 'mdt-h-8'],
      ['lg', 'mdt-h-10'],
      ['xl', 'mdt-h-12'],
      ['2xl', 'mdt-h-14'],
    ];

    it.each(cases)('applies the %s size', (size, expected) => {
      const { container } = render(<IconTile icon={icon} size={size} />);
      expect(container.firstChild).toHaveClass(expected);
    });

    it('is square at every size', () => {
      const { container } = render(<IconTile icon={icon} size="lg" />);
      expect(container.firstChild).toHaveClass('mdt-h-10');
      expect(container.firstChild).toHaveClass('mdt-w-10');
    });
  });

  describe('shape', () => {
    const cases: [IconTileShape, string][] = [
      ['square', 'mdt-rounded-md'],
      ['circle', 'mdt-rounded-full'],
    ];

    it.each(cases)('applies the %s shape', (shape, expected) => {
      const { container } = render(<IconTile icon={icon} shape={shape} />);
      expect(container.firstChild).toHaveClass(expected);
    });
  });

  describe('accessibility', () => {
    it('is hidden from screen readers when it has no label, since it only decorates', () => {
      const { container } = render(<IconTile icon={icon} />);
      expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    });

    it('becomes an image with a name when labelled', () => {
      render(<IconTile icon={icon} aria-label="Server" />);
      expect(screen.getByRole('img', { name: 'Server' })).toBeInTheDocument();
    });

    it('is not hidden once it is labelled', () => {
      render(<IconTile icon={icon} aria-label="Server" />);
      expect(screen.getByRole('img', { name: 'Server' })).not.toHaveAttribute('aria-hidden');
    });
  });

  it('merges a custom className', () => {
    const { container } = render(<IconTile icon={icon} className="mdt-mr-2" />);
    expect(container.firstChild).toHaveClass('mdt-mr-2');
  });

  it('forwards a ref', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<IconTile icon={icon} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  /* Pranjal, 2026-09-12: "icon size is too big" - the tile sizes its own glyph */
  it.each([
    ['sm', '[&_svg]:mdt-size-3.5'],
    ['md', '[&_svg]:mdt-size-4'],
    ['lg', '[&_svg]:mdt-size-5'],
    ['xl', '[&_svg]:mdt-size-6'],
    ['2xl', '[&_svg]:mdt-size-6'],
  ])('sizes the glyph to a little over half the %s tile', (size, cls) => {
    const { container } = render(
      <IconTile icon={<svg data-testid="g" />} size={size as IconTileSize} />
    );
    expect(container.firstElementChild?.className).toContain(cls);
  });

  /* Pranjal, 2026-09-12: the 56 mark at the top of an object drawer rounds to 12 */
  it('rounds the square 2xl tile to 12, the identity-mark radius', () => {
    const { container } = render(<IconTile icon={icon} size="2xl" />);
    expect(container.firstChild).toHaveClass('mdt-rounded-xl');
    expect(container.firstChild).not.toHaveClass('mdt-rounded-md');
  });

  it('keeps the circle round at 2xl', () => {
    const { container } = render(<IconTile icon={icon} size="2xl" shape="circle" />);
    expect(container.firstChild).toHaveClass('mdt-rounded-full');
  });
});

describe('IconTile as a button', () => {
  it('copies its value on click, says so in the bubble, and reports it', async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);
    const onCopy = vi.fn();
    const onRow = vi.fn();
    render(
      <div onClick={onRow} role="presentation">
        <IconTile
          icon={icon}
          tone="outline"
          shape="circle"
          copyValue="sarah@company.com"
          hint="Click the icon to copy the mail"
          onCopy={onCopy}
        />
      </div>
    );
    const button = screen.getByRole('button', { name: 'Copy sarah@company.com' });
    expect(button).toHaveClass('hover:mdt-bg-neutral-10', '[&+&]:-mdt-ml-1.5');
    await user.hover(button);
    await waitFor(() => {
      expect(document.querySelector('.tt')).toHaveTextContent('sarah@company.com');
    });
    expect(document.querySelector('.tt')).toHaveTextContent('Click the icon to copy the mail');
    await user.click(button);
    expect(writeText).toHaveBeenCalledWith('sarah@company.com');
    expect(onCopy).toHaveBeenCalledWith('sarah@company.com');
    expect(onRow).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(document.querySelector('.tt')).toHaveTextContent('Copied!');
    });
    await user.unhover(button);
    writeText.mockRestore();
  });

  it('shows its own words and copied label when given', async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);
    render(
      <IconTile
        icon={icon}
        copyValue="x"
        tooltip="Invite link"
        copiedLabel="Link copied"
        aria-label="Copy link"
      />
    );
    const button = screen.getByRole('button', { name: 'Copy link' });
    expect(button).not.toHaveClass('hover:mdt-bg-neutral-10');
    await user.hover(button);
    await waitFor(() => {
      expect(document.querySelector('.tt')).toHaveTextContent('Invite link');
    });
    await user.click(button);
    await waitFor(() => {
      expect(document.querySelector('.tt')).toHaveTextContent('Link copied');
    });
  });

  it('is a plain button with no bubble when it only has onClick', async () => {
    const onClick = vi.fn();
    const ref = createRef<HTMLElement>();
    render(<IconTile ref={ref} icon={icon} aria-label="Refresh" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button', { name: 'Refresh' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(document.querySelector('.tt')).toBeNull();
  });
});

describe('IconTile brand tone', () => {
  it('is the white plate with its hairline, the mark 32 inside at xl with corners 10', () => {
    render(
      <IconTile
        tone="brand"
        size="xl"
        shape="square"
        icon={<img src="/aws.svg" alt="" />}
        data-testid="plate"
      />
    );
    const plate = screen.getByTestId('plate');
    expect(plate.className).toContain('--mdt-fixed-fill');
    expect(plate).toHaveClass('mdt-border-neutral-20');
    expect(plate).toHaveClass('mdt-h-12', 'mdt-w-12', 'mdt-rounded-[10px]', '[&_img]:mdt-size-8');
    expect(plate.querySelector('img')).toHaveAttribute('alt', '');
  });

  it('holds a monogram in black, 12/600', () => {
    render(<IconTile tone="brand" size="xl" shape="square" icon={<>OCI</>} data-testid="plate" />);
    const plate = screen.getByTestId('plate');
    expect(plate).toHaveTextContent('OCI');
    expect(plate).toHaveClass('mdt-text-xs', 'mdt-font-semibold');
    expect(plate.className).toContain('--mdt-black');
  });
});
