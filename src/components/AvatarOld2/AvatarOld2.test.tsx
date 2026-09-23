import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { AvatarOld2, toneForNameOld2, initialsForNameOld2 } from './AvatarOld2';
import { AvatarStackOld2 } from './AvatarStackOld2';
import type { AvatarShapeOld2, AvatarSizeOld2, AvatarToneOld2 } from './AvatarOld2.types';

const NAME = 'Sarah Johnson';
const IMG = 'avatar-image';
const OVERFLOW = 'avatar-stack-overflow';

const getAvatar = () => screen.getByRole('img', { name: NAME });

describe('initialsForNameOld2', () => {
  it.each([
    ['Sarah Johnson', 'SJ'],
    ['Ravi Kumar Patel', 'RP'],
    ['monitoring', 'mo'],
    ['  spaced   out  ', 'so'],
    ['', ''],
  ])('turns %o into %o', (input, expected) => {
    expect(initialsForNameOld2(input)).toBe(expected);
  });

  it('never returns more than two characters', () => {
    expect(initialsForNameOld2('Extraordinarily Long Name Here')).toHaveLength(2);
  });
});

describe('toneForNameOld2', () => {
  it('gives the same name the same tone every time', () => {
    const first = toneForNameOld2(NAME);
    for (let i = 0; i < 20; i += 1) {
      expect(toneForNameOld2(NAME)).toBe(first);
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
    const tones = new Set(names.map(toneForNameOld2));
    expect(tones.size).toBeGreaterThan(1);
  });

  it('only ever returns a tone from the palette', () => {
    const palette: AvatarToneOld2[] = ['slate', 'blue', 'green', 'amber', 'rose', 'purple'];
    for (const n of ['a', 'bb', 'ccc', 'Zebra', '12345', 'Sarah Johnson']) {
      expect(palette).toContain(toneForNameOld2(n));
    }
  });
});

describe('AvatarOld2', () => {
  describe('rendering', () => {
    it('shows initials derived from the name', () => {
      render(<AvatarOld2 name={NAME} />);
      expect(getAvatar()).toHaveTextContent('SJ');
    });

    it('lets initials be overridden', () => {
      render(<AvatarOld2 name={NAME} initials="XY" />);
      expect(getAvatar()).toHaveTextContent('XY');
    });

    it('trims overridden initials to two characters', () => {
      render(<AvatarOld2 name={NAME} initials="ABCDEF" />);
      expect(getAvatar()).toHaveTextContent('AB');
    });

    it.each([
      ['xs', 'S'],
      ['sm', 'S'],
      ['md', 'SJ'],
      ['lg', 'SJ'],
      ['xl', 'SJ'],
    ] as const)('shows the right number of letters at %s', (size, expected) => {
      render(<AvatarOld2 name={NAME} size={size} />);
      expect(getAvatar()).toHaveTextContent(new RegExp(`^${expected}$`));
    });

    it.each(['xs', 'sm'] as const)('cuts overridden initials to one letter at %s', (size) => {
      // The size decides how many letters fit, not where the letters came from.
      render(<AvatarOld2 name={NAME} initials="XY" size={size} />);
      expect(getAvatar()).toHaveTextContent(/^X$/);
    });

    it('carries the name as its accessible label', () => {
      render(<AvatarOld2 name={NAME} />);
      expect(screen.getByRole('img', { name: NAME })).toBeInTheDocument();
    });

    it('hides the initials from screen readers, since the label already says the name', () => {
      render(<AvatarOld2 name={NAME} />);
      expect(screen.getByText('SJ')).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders with no name at all', () => {
      const { container } = render(<AvatarOld2 />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('merges a custom className', () => {
      render(<AvatarOld2 name={NAME} className="mdt-ml-2" />);
      expect(getAvatar()).toHaveClass('mdt-ml-2');
    });

    it('forwards a ref', () => {
      const ref = createRef<HTMLSpanElement>();
      render(<AvatarOld2 name={NAME} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('shape', () => {
    const cases: [AvatarShapeOld2, string][] = [
      ['circle', 'mdt-rounded-full'],
      ['rounded', 'mdt-rounded-md'],
    ];

    it.each(cases)('applies the %s shape', (shape, expected) => {
      render(<AvatarOld2 name={NAME} shape={shape} />);
      expect(getAvatar()).toHaveClass(expected);
    });

    it('is a circle by default', () => {
      render(<AvatarOld2 name={NAME} />);
      expect(getAvatar()).toHaveClass('mdt-rounded-full');
    });

    it('softens the corners further at large sizes when rounded', () => {
      render(<AvatarOld2 name={NAME} shape="rounded" size="xl" />);
      expect(getAvatar()).toHaveClass('mdt-rounded-lg');
    });

    it('does not soften a circle at large sizes', () => {
      render(<AvatarOld2 name={NAME} shape="circle" size="xl" />);
      expect(getAvatar()).toHaveClass('mdt-rounded-full');
      expect(getAvatar()).not.toHaveClass('mdt-rounded-lg');
    });
  });

  describe('size', () => {
    const cases: [AvatarSizeOld2, string][] = [
      ['xs', 'mdt-h-5'],
      ['sm', 'mdt-h-6'],
      ['md', 'mdt-h-8'],
      ['lg', 'mdt-h-10'],
      ['xl', 'mdt-h-14'],
    ];

    it.each(cases)('applies the %s size', (size, expected) => {
      render(<AvatarOld2 name={NAME} size={size} />);
      expect(getAvatar()).toHaveClass(expected);
    });

    it('is square at every size', () => {
      render(<AvatarOld2 name={NAME} size="lg" />);
      expect(getAvatar()).toHaveClass('mdt-h-10');
      expect(getAvatar()).toHaveClass('mdt-w-10');
    });
  });

  describe('tone', () => {
    it('derives the tone from the name when none is given', () => {
      const expected = toneForNameOld2(NAME);
      render(<AvatarOld2 name={NAME} />);
      // slate is the fallback, so a derived slate would be indistinguishable
      const toneClass: Record<AvatarToneOld2, string> = {
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
      render(<AvatarOld2 name={NAME} tone="green" />);
      expect(getAvatar()).toHaveClass('mdt-bg-green-10');
    });

    it('falls back to slate with no name', () => {
      const { container } = render(<AvatarOld2 />);
      expect(container.firstChild).toHaveClass('mdt-bg-neutral-30');
    });

    it('renders the same colour for the same name twice', () => {
      const { container } = render(
        <>
          <AvatarOld2 name={NAME} />
          <AvatarOld2 name={NAME} />
        </>
      );
      const [a, b] = [...container.querySelectorAll('[role="img"]')];
      expect(a.className).toBe(b.className);
    });
  });

  describe('photo', () => {
    it('renders an image when src is given', () => {
      render(<AvatarOld2 name={NAME} src="/sarah.png" />);
      expect(screen.getByTestId(IMG)).toHaveAttribute('src', '/sarah.png');
    });

    it('hides the image from screen readers, since the avatar is already labelled', () => {
      render(<AvatarOld2 name={NAME} src="/sarah.png" />);
      expect(screen.getByTestId(IMG)).toHaveAttribute('alt', '');
    });

    it('falls back to initials when the image fails', () => {
      render(<AvatarOld2 name={NAME} src="/broken.png" />);
      fireEvent.error(screen.getByTestId(IMG));
      expect(screen.queryByTestId(IMG)).not.toBeInTheDocument();
      expect(getAvatar()).toHaveTextContent('SJ');
    });

    it('shows initials when src is an empty string', () => {
      render(<AvatarOld2 name={NAME} src="" />);
      expect(screen.queryByTestId(IMG)).not.toBeInTheDocument();
    });
  });

  describe('ring', () => {
    it('is off by default', () => {
      render(<AvatarOld2 name={NAME} />);
      expect(getAvatar()).not.toHaveClass('mdt-ring-2');
    });

    it('can be turned on', () => {
      render(<AvatarOld2 name={NAME} ring />);
      expect(getAvatar()).toHaveClass('mdt-ring-2');
    });
  });
});

describe('AvatarStackOld2', () => {
  const names = ['Sarah Johnson', 'Ravi Patel', 'Mei Chen', 'Tom Green', 'Ana Silva', 'Ken Watts'];
  const stack = (props: { max?: number; size?: AvatarSizeOld2; shape?: AvatarShapeOld2 } = {}) =>
    render(
      <AvatarStackOld2 {...props}>
        {names.map((n) => (
          <AvatarOld2 key={n} name={n} />
        ))}
      </AvatarStackOld2>
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
      <AvatarStackOld2 max={6}>
        {names.slice(0, 3).map((n) => (
          <AvatarOld2 key={n} name={n} />
        ))}
      </AvatarStackOld2>
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
      expect(a).toHaveClass('mdt-rounded-md');
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
      <AvatarStackOld2>
        <AvatarOld2 name={NAME} />
        {null}
        {false}
      </AvatarStackOld2>
    );
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });
});
