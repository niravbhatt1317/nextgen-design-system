import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { vi } from 'vitest';
import { Avatar, toneForName, initialsForName } from './Avatar';
import { AvatarStack } from './AvatarStack';
import type { AvatarShape, AvatarSize, AvatarTone } from './Avatar.types';

const NAME = 'Sarah Johnson';
const IMG = 'avatar-image';
const OVERFLOW = 'avatar-stack-overflow';

const getAvatar = () => screen.getByRole('img', { name: NAME });

describe('initialsForName', () => {
  it.each([
    ['Sarah Johnson', 'S'],
    ['Ravi Kumar Patel', 'R'],
    ['monitoring', 'm'],
    ['  spaced   out  ', 's'],
    ['', ''],
  ])('turns %o into %o', (input, expected) => {
    expect(initialsForName(input)).toBe(expected);
  });

  it('never returns more than one character (Pranjal, 2026-09-20: one letter)', () => {
    expect(initialsForName('Extraordinarily Long Name Here')).toHaveLength(1);
  });
});

describe('toneForName', () => {
  it('gives the same name the same tone every time', () => {
    const first = toneForName(NAME);
    for (let i = 0; i < 20; i += 1) {
      expect(toneForName(NAME)).toBe(first);
    }
  });

  it('spreads different names across the palette', () => {
    const names = [
      'Sarah Johnson',
      'Ravi Patel',
      'Mei Chen',
      'Tom Green',
      'Ana Silva',
      'Ken Watts',
    ];
    const tones = new Set(names.map(toneForName));
    expect(tones.size).toBeGreaterThan(1);
  });

  it('only ever returns a tone from the palette, and never slate for a person', () => {
    const palette: AvatarTone[] = ['blue', 'green', 'amber', 'rose', 'purple'];
    for (const n of ['a', 'bb', 'ccc', 'Zebra', '12345', 'Sarah Johnson']) {
      expect(palette).toContain(toneForName(n));
      expect(toneForName(n)).not.toBe('slate');
    }
  });
});

describe('Avatar', () => {
  describe('rendering', () => {
    it('shows the one letter derived from the name', () => {
      render(<Avatar name={NAME} />);
      expect(getAvatar()).toHaveTextContent(/^S$/);
    });

    it('lets the letter be overridden', () => {
      render(<Avatar name={NAME} initials="X" />);
      expect(getAvatar()).toHaveTextContent(/^X$/);
    });

    it('trims an overridden value to one character', () => {
      render(<Avatar name={NAME} initials="ABCDEF" />);
      expect(getAvatar()).toHaveTextContent(/^A$/);
    });

    it('renders an icon in place of the letter, as a rounded square by default', () => {
      render(<Avatar name="Design team" icon={<svg data-testid="glyph" />} />);
      const el = screen.getByRole('img', { name: 'Design team' });
      expect(screen.getByTestId('glyph')).toBeInTheDocument();
      expect(el).not.toHaveTextContent(/\S/);
      expect(el.className).toContain('mdt-rounded-[6px]');
    });

    it('lets an icon be forced into a circle', () => {
      render(<Avatar name="Design team" icon={<svg data-testid="glyph" />} shape="circle" />);
      expect(screen.getByRole('img', { name: 'Design team' }).className).toContain(
        'mdt-rounded-full'
      );
    });

    it.each([
      ['xs', 'S'],
      ['sm', 'S'],
      ['md', 'S'],
      ['lg', 'S'],
      ['xl', 'S'],
    ] as const)('shows one letter at %s', (size, expected) => {
      render(<Avatar name={NAME} size={size} />);
      expect(getAvatar()).toHaveTextContent(new RegExp(`^${expected}$`));
    });

    it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
      'cuts an overridden value to one letter at %s',
      (size) => {
        render(<Avatar name={NAME} initials="XY" size={size} />);
        expect(getAvatar()).toHaveTextContent(/^X$/);
      }
    );

    it('carries the name as its accessible label', () => {
      render(<Avatar name={NAME} />);
      expect(screen.getByRole('img', { name: NAME })).toBeInTheDocument();
    });

    it('hides the initials from screen readers, since the label already says the name', () => {
      render(<Avatar name={NAME} />);
      expect(screen.getByText('S')).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders with no name at all', () => {
      const { container } = render(<Avatar />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('merges a custom className', () => {
      render(<Avatar name={NAME} className="mdt-ml-2" />);
      expect(getAvatar()).toHaveClass('mdt-ml-2');
    });

    it('forwards a ref', () => {
      const ref = createRef<HTMLSpanElement>();
      render(<Avatar name={NAME} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('shape', () => {
    const cases: [AvatarShape, string][] = [
      ['circle', 'mdt-rounded-full'],
      ['rounded', 'mdt-rounded-[6px]'],
    ];

    it.each(cases)('applies the %s shape', (shape, expected) => {
      render(<Avatar name={NAME} shape={shape} />);
      expect(getAvatar()).toHaveClass(expected);
    });

    it('is a circle by default', () => {
      render(<Avatar name={NAME} />);
      expect(getAvatar()).toHaveClass('mdt-rounded-full');
    });

    it('softens the corners to 12 at xl when rounded (the drawer identity mark)', () => {
      render(<Avatar name={NAME} shape="rounded" size="xl" />);
      expect(getAvatar()).toHaveClass('mdt-rounded-xl');
    });

    it('keeps corners 6 at lg when rounded', () => {
      render(<Avatar name={NAME} shape="rounded" size="lg" />);
      expect(getAvatar()).toHaveClass('mdt-rounded-[6px]');
    });

    it('does not soften a circle at large sizes', () => {
      render(<Avatar name={NAME} shape="circle" size="xl" />);
      expect(getAvatar()).toHaveClass('mdt-rounded-full');
      expect(getAvatar()).not.toHaveClass('mdt-rounded-lg');
    });
  });

  describe('size', () => {
    const cases: [AvatarSize, string][] = [
      ['xs', 'mdt-h-5'],
      ['sm', 'mdt-h-6'],
      ['md', 'mdt-h-8'],
      ['lg', 'mdt-h-10'],
      ['xl', 'mdt-h-14'],
    ];

    it.each(cases)('applies the %s size', (size, expected) => {
      render(<Avatar name={NAME} size={size} />);
      expect(getAvatar()).toHaveClass(expected);
    });

    it('is square at every size', () => {
      render(<Avatar name={NAME} size="lg" />);
      expect(getAvatar()).toHaveClass('mdt-h-10');
      expect(getAvatar()).toHaveClass('mdt-w-10');
    });
  });

  describe('tone', () => {
    it('derives the tone from the name when none is given', () => {
      const expected = toneForName(NAME);
      render(<Avatar name={NAME} />);
      // slate is the fallback, so a derived slate would be indistinguishable
      const toneClass: Record<AvatarTone, string> = {
        slate: 'mdt-bg-neutral-30',
        blue: 'mdt-bg-blue-10',
        green: 'mdt-bg-green-10',
        amber: 'mdt-bg-orange-20',
        rose: 'mdt-bg-red-10',
        purple: 'mdt-bg-purple-10',
      };
      expect(getAvatar()).toHaveClass(toneClass[expected]);
    });

    it('lets an explicit tone win over the derived one', () => {
      render(<Avatar name={NAME} tone="green" />);
      expect(getAvatar()).toHaveClass('mdt-bg-green-10');
    });

    it('falls back to slate with no name', () => {
      const { container } = render(<Avatar />);
      expect(container.firstChild).toHaveClass('mdt-bg-neutral-30');
    });

    it('renders the same colour for the same name twice', () => {
      const { container } = render(
        <>
          <Avatar name={NAME} />
          <Avatar name={NAME} />
        </>
      );
      const [a, b] = [...container.querySelectorAll('[role="img"]')];
      expect(a.className).toBe(b.className);
    });
  });

  describe('photo', () => {
    it('renders an image when src is given', () => {
      render(<Avatar name={NAME} src="/sarah.png" />);
      expect(screen.getByTestId(IMG)).toHaveAttribute('src', '/sarah.png');
    });

    it('hides the image from screen readers, since the avatar is already labelled', () => {
      render(<Avatar name={NAME} src="/sarah.png" />);
      expect(screen.getByTestId(IMG)).toHaveAttribute('alt', '');
    });

    it('falls back to initials when the image fails', () => {
      render(<Avatar name={NAME} src="/broken.png" />);
      fireEvent.error(screen.getByTestId(IMG));
      expect(screen.queryByTestId(IMG)).not.toBeInTheDocument();
      expect(getAvatar()).toHaveTextContent(/^S$/);
    });

    it('shows initials when src is an empty string', () => {
      render(<Avatar name={NAME} src="" />);
      expect(screen.queryByTestId(IMG)).not.toBeInTheDocument();
    });
  });

  /* ported from the console (Pranjal, 2026-10-13) */
  describe('logo', () => {
    it('fills the box with the logo, with no ground behind it', () => {
      render(<Avatar name="Acme Corp" logo="/acme.png" />);
      const el = screen.getByRole('img', { name: 'Acme Corp' });
      expect(screen.getByTestId(IMG)).toHaveAttribute('src', '/acme.png');
      expect(screen.getByTestId(IMG)).toHaveClass('mdt-object-cover', 'mdt-h-full', 'mdt-w-full');
      expect(el).toHaveClass('mdt-bg-transparent');
    });

    it('is a rounded square by default, and can be forced into a circle', () => {
      const { rerender } = render(<Avatar name="Acme Corp" logo="/acme.png" size="xl" />);
      expect(screen.getByRole('img', { name: 'Acme Corp' })).toHaveClass('mdt-rounded-xl');
      rerender(<Avatar name="Acme Corp" logo="/acme.png" shape="circle" />);
      expect(screen.getByRole('img', { name: 'Acme Corp' })).toHaveClass('mdt-rounded-full');
    });

    it('wins over src', () => {
      render(<Avatar name="Acme Corp" logo="/acme.png" src="/photo.png" />);
      expect(screen.getByTestId(IMG)).toHaveAttribute('src', '/acme.png');
    });

    it('falls back to the letter on its tone when the logo fails', () => {
      render(<Avatar name="Acme Corp" logo="/broken.png" tone="blue" />);
      fireEvent.error(screen.getByTestId(IMG));
      const el = screen.getByRole('img', { name: 'Acme Corp' });
      expect(el).toHaveTextContent(/^A$/);
      expect(el).toHaveClass('mdt-bg-blue-10');
      expect(el).toHaveClass('mdt-rounded-[6px]');
    });

    it('shows the letter when the logo is an empty string', () => {
      render(<Avatar name="Acme Corp" logo="" />);
      expect(screen.queryByTestId(IMG)).not.toBeInTheDocument();
    });
  });

  describe('status dot', () => {
    it('is absent by default, and the avatar is not framed', () => {
      render(<Avatar name={NAME} />);
      expect(screen.queryByTestId('avatar-status')).not.toBeInTheDocument();
      expect(screen.queryByTestId('avatar-frame')).not.toBeInTheDocument();
    });

    it.each([
      ['active', 'mdt-bg-success', 'Active'],
      ['suspended', 'mdt-bg-warning', 'Suspended'],
      ['offboarded', 'mdt-bg-feedback-neutral-icon', 'Offboarded'],
    ] as const)('paints %s in its state token and names it', (status, fill, label) => {
      render(<Avatar name={NAME} status={status} />);
      const dot = screen.getByRole('img', { name: label });
      expect(dot).toHaveClass(fill);
      expect(dot).toHaveAttribute('title', label);
    });

    it('rings the dot in the card colour', () => {
      render(<Avatar name={NAME} status="active" />);
      expect(screen.getByTestId('avatar-status')).toHaveClass('mdt-ring-card', 'mdt-rounded-full');
    });

    it('takes a custom label', () => {
      render(<Avatar name={NAME} status="active" statusLabel="Online" />);
      expect(screen.getByRole('img', { name: 'Online' })).toBeInTheDocument();
    });

    it('sizes the dot to the avatar (10/64 of it, ring 1/16)', () => {
      render(<Avatar name={NAME} status="active" size="xl" />);
      expect(screen.getByTestId('avatar-status')).toHaveClass(
        'mdt-size-[8.75px]',
        'mdt-ring-[3.5px]'
      );
    });

    it('straddles the corner by the shape', () => {
      const { rerender } = render(<Avatar name={NAME} status="active" size="md" shape="rounded" />);
      expect(screen.getByTestId('avatar-status')).toHaveClass('mdt-right-[-3.36px]');
      rerender(<Avatar name={NAME} status="active" size="md" shape="circle" />);
      expect(screen.getByTestId('avatar-status')).toHaveClass('mdt-right-[-0.43px]');
    });

    it('keeps the ref and className on the avatar itself', () => {
      const ref = createRef<HTMLSpanElement>();
      render(<Avatar name={NAME} status="active" className="mdt-ml-2" ref={ref} />);
      expect(getAvatar()).toHaveClass('mdt-ml-2');
      expect(ref.current).toBe(getAvatar());
      expect(screen.getByTestId('avatar-frame')).not.toHaveClass('mdt-ml-2');
    });
  });

  describe('edit button', () => {
    const file = new File(['x'], 'me.png', { type: 'image/png' });

    it('is absent by default', () => {
      render(<Avatar name={NAME} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders the camera button, named', () => {
      render(<Avatar name={NAME} onEdit={() => undefined} />);
      const btn = screen.getByRole('button', { name: 'Upload photo' });
      expect(btn).toHaveAttribute('title', 'Upload photo');
      expect(btn).toHaveClass('mdt-absolute', '-mdt-right-1.5', '-mdt-bottom-1.5');
    });

    it('takes a custom label', () => {
      render(<Avatar name={NAME} onEdit={() => undefined} editLabel="Change logo" />);
      expect(screen.getByRole('button', { name: 'Change logo' })).toBeInTheDocument();
    });

    it('opens the hidden file picker, images only', () => {
      render(<Avatar name={NAME} onEdit={() => undefined} />);
      const input = screen.getByTestId<HTMLInputElement>('avatar-edit-input');
      expect(input).toHaveAttribute('type', 'file');
      expect(input).toHaveAttribute('accept', 'image/*');
      const click = vi.spyOn(input, 'click');
      fireEvent.click(screen.getByRole('button', { name: 'Upload photo' }));
      expect(click).toHaveBeenCalledTimes(1);
    });

    it('hands the chosen file to onEdit', () => {
      const onEdit = vi.fn();
      render(<Avatar name={NAME} onEdit={onEdit} />);
      fireEvent.change(screen.getByTestId('avatar-edit-input'), { target: { files: [file] } });
      expect(onEdit).toHaveBeenCalledWith(file);
    });

    it('does nothing when the picker is cancelled', () => {
      const onEdit = vi.fn();
      render(<Avatar name={NAME} onEdit={onEdit} />);
      fireEvent.change(screen.getByTestId('avatar-edit-input'), { target: { files: [] } });
      expect(onEdit).not.toHaveBeenCalled();
    });

    it('sits beside a status dot', () => {
      render(<Avatar name={NAME} onEdit={() => undefined} status="active" />);
      expect(screen.getByTestId('avatar-status')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Upload photo' })).toBeInTheDocument();
    });
  });

  describe('ring', () => {
    it('is off by default', () => {
      render(<Avatar name={NAME} />);
      expect(getAvatar()).not.toHaveClass('mdt-ring-2');
    });

    it('can be turned on', () => {
      render(<Avatar name={NAME} ring />);
      expect(getAvatar()).toHaveClass('mdt-ring-2');
    });
  });
});

describe('AvatarStack', () => {
  const names = ['Sarah Johnson', 'Ravi Patel', 'Mei Chen', 'Tom Green', 'Ana Silva', 'Ken Watts'];
  const stack = (props: { max?: number; size?: AvatarSize; shape?: AvatarShape } = {}) =>
    render(
      <AvatarStack {...props}>
        {names.map((n) => (
          <Avatar key={n} name={n} />
        ))}
      </AvatarStack>
    );

  it('shows four by default and collapses the rest', () => {
    stack();
    expect(screen.getAllByRole('img')).toHaveLength(4);
    expect(screen.getByTestId(OVERFLOW)).toHaveTextContent('+2');
  });

  it('respects max', () => {
    stack({ max: 3 });
    expect(screen.getAllByRole('img')).toHaveLength(3);
    expect(screen.getByTestId(OVERFLOW)).toHaveTextContent('+3');
  });

  it('shows no chip when nothing is hidden', () => {
    render(
      <AvatarStack max={6}>
        {names.slice(0, 3).map((n) => (
          <Avatar key={n} name={n} />
        ))}
      </AvatarStack>
    );
    expect(screen.queryByTestId(OVERFLOW)).not.toBeInTheDocument();
  });

  it('applies its size to every avatar, so a stack cannot be mismatched', () => {
    stack({ size: 'lg' });
    for (const a of screen.getAllByRole('img')) {
      expect(a).toHaveClass('mdt-h-10');
    }
  });

  it('applies its shape to every avatar', () => {
    stack({ shape: 'rounded' });
    for (const a of screen.getAllByRole('img')) {
      expect(a).toHaveClass('mdt-rounded-[6px]');
    }
  });

  it('rings every avatar so overlapping faces stay separated', () => {
    stack();
    for (const a of screen.getAllByRole('img')) {
      expect(a).toHaveClass('mdt-ring-2');
    }
  });

  it('sizes the overflow chip to match', () => {
    stack({ size: 'lg' });
    expect(screen.getByTestId(OVERFLOW)).toHaveClass('mdt-h-10');
  });

  it('overlaps all but the first', () => {
    const { container } = stack({ max: 3 });
    const wrappers = [...container.querySelectorAll('span > span')].slice(0, 3);
    expect(wrappers[0]).not.toHaveClass('-mdt-ml-2');
  });

  it('ignores non-element children', () => {
    render(
      <AvatarStack>
        <Avatar name={NAME} />
        {null}
        {false}
      </AvatarStack>
    );
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });
});
