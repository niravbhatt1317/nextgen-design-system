import { render, renderHook, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Button } from '../Button';
import { Kbd } from './Kbd';
import { describeKeys, isModifier, resolveKey } from './keys';
import { usePlatform } from './usePlatform';

/** The rendered element, since a `<kbd>` has no implicit role. */
const kbd = (container: HTMLElement) => container.querySelector('kbd') as HTMLElement;

describe('Kbd', () => {
  describe('the keys', () => {
    it('draws one cap per key', () => {
      const { container } = render(<Kbd keys={['mod', 'shift', 'e']} />);
      expect(kbd(container).querySelectorAll('span')).toHaveLength(3);
    });

    it('draws a glyph where there is one and the letters where there is not', () => {
      const { container } = render(<Kbd keys={['enter', 'esc']} />);
      // Enter is an icon; Esc is a word, because no symbol for it is read the
      // same way by everybody.
      expect(container.querySelector('svg')).toBeInTheDocument();
      expect(container).toHaveTextContent('Esc');
    });

    it('takes a key it has never heard of', () => {
      // A registry that refused unknown keys would mean a pull request every
      // time somebody added a shortcut.
      const { container } = render(<Kbd keys={['F5', '/']} />);
      expect(container).toHaveTextContent('F5');
      expect(container).toHaveTextContent('/');
    });

    it('upper-cases a single letter but leaves a word alone', () => {
      expect(resolveKey('e', 'mac').text).toBe('E');
      expect(resolveKey('F5', 'mac').text).toBe('F5');
    });

    it('can press the same key twice', () => {
      // `g g` is a real binding, and keying the list by the key alone would
      // collapse it to one.
      const { container } = render(<Kbd keys={['g', 'g']} />);
      expect(kbd(container).querySelectorAll('span')).toHaveLength(2);
    });
  });

  describe('the machine it is read on', () => {
    it('draws mod as Command on a Mac', () => {
      const { container } = render(<Kbd keys={['mod']} platform="mac" />);
      expect(container.querySelector('svg')).toBeInTheDocument();
      expect(container).not.toHaveTextContent('Ctrl');
    });

    it('draws mod as Ctrl everywhere else', () => {
      // The whole point of `mod`. `useSubmitShortcut` accepts either at the
      // event level, so a hint naming one of them told half the people the
      // wrong thing.
      const { container } = render(<Kbd keys={['mod']} platform="windows" />);
      expect(container).toHaveTextContent('Ctrl');
    });

    it('does the same for alt', () => {
      const { container } = render(<Kbd keys={['alt']} platform="windows" />);
      expect(container).toHaveTextContent('Alt');
    });

    it('says which key it is, not which symbol', () => {
      expect(describeKeys(['mod', 'shift', 'e'], 'mac')).toBe('Command + Shift + E');
      expect(describeKeys(['mod', 'shift', 'e'], 'windows')).toBe('Control + Shift + E');
    });
  });

  describe('accessibility', () => {
    it('is announced, spelled out', () => {
      // The symbols are the one thing a screen reader cannot help with: "⌘"
      // read aloud is "place of interest sign".
      render(<Kbd keys={['mod', 'k']} platform="mac" />);
      expect(screen.getByLabelText('Command + K')).toBeInTheDocument();
    });

    it('hides the glyphs from the label so they are not read twice', () => {
      const { container } = render(<Kbd keys={['mod', 'k']} />);
      const caps = [...kbd(container).querySelectorAll('span')];
      expect(caps.every((cap) => cap.getAttribute('aria-hidden') === 'true')).toBe(true);
    });

    it('steps aside entirely when it is decoration', () => {
      const { container } = render(<Kbd keys={['enter']} decorative />);
      expect(kbd(container)).toHaveAttribute('aria-hidden', 'true');
      expect(kbd(container)).not.toHaveAttribute('aria-label');
    });

    it('takes a label of its own', () => {
      render(<Kbd keys={['mod', 'k']} label="Open the command palette" />);
      expect(screen.getByLabelText('Open the command palette')).toBeInTheDocument();
    });

    it('is a kbd element, because that is what this is', () => {
      const { container } = render(<Kbd keys={['enter']} />);
      expect(container.firstElementChild?.tagName).toBe('KBD');
    });
  });

  describe('arrangement', () => {
    it('gives each key its own surface when separate', () => {
      const { container } = render(<Kbd keys={['mod', 'k']} layout="separate" />);
      const caps = [...kbd(container).querySelectorAll('span')];
      expect(caps.every((cap) => cap.className.includes('mdt-border'))).toBe(true);
      expect(kbd(container).className).not.toContain('mdt-border');
    });

    it('gives them one surface between them when joined', () => {
      const { container } = render(<Kbd keys={['mod', 'k']} layout="joined" />);
      expect(kbd(container).className).toContain('mdt-border');
      const caps = [...kbd(container).querySelectorAll('span')];
      expect(caps.every((cap) => !cap.className.includes('mdt-border'))).toBe(true);
    });

    it('pulls the caps together when told to', () => {
      const { container } = render(<Kbd keys={['mod', 'k']} tight />);
      expect(kbd(container).className).toContain('mdt-gap-0.5');
    });
  });

  describe('variant and tone', () => {
    it('is a hairline by default and a block when filled', () => {
      const { container: outlined } = render(<Kbd keys={['enter']} />);
      expect(kbd(outlined).querySelector('span')?.className).toContain('mdt-border');

      const { container: filled } = render(<Kbd keys={['enter']} variant="filled" />);
      const cap = filled.querySelector('kbd span');
      expect(cap?.className).toContain('mdt-bg-muted');
      expect(cap?.className).not.toContain('mdt-border-border');
    });

    it('uses the on-primary ink when inverted', () => {
      // Two named tones rather than currentColor faded by a percentage:
      // Tailwind cannot mix an alpha into currentColor here.
      const { container } = render(<Kbd keys={['enter']} tone="inverted" />);
      expect(container.querySelector('kbd span')?.className).toContain(
        'mdt-border-primary-foreground-subtle'
      );
    });

    it('takes each size', () => {
      const at = (size: 'sm' | 'md' | 'lg') => {
        const { container } = render(<Kbd keys={['enter']} size={size} />);
        return container.querySelector('kbd span')?.className ?? '';
      };
      expect(at('sm')).toContain('mdt-h-4');
      expect(at('md')).toContain('mdt-h-5');
      expect(at('lg')).toContain('mdt-h-6');
    });
  });

  describe('dimModifiers', () => {
    it('lifts the key on an ordinary surface', () => {
      // Everything is already muted there, so the key is what moves.
      const { container } = render(<Kbd keys={['mod', 'e']} dimModifiers />);
      const caps = [...container.querySelectorAll('kbd span')];
      expect(caps[0]?.className).not.toContain('mdt-text-foreground');
      expect(caps[1]?.className).toContain('mdt-text-foreground');
    });

    it('drops the modifiers on a primary one', () => {
      // There the key is already near-white, so the modifiers move instead.
      const { container } = render(<Kbd keys={['mod', 'e']} tone="inverted" dimModifiers />);
      const caps = [...container.querySelectorAll('kbd span')];
      expect(caps[0]?.className).toContain('mdt-text-primary-foreground-subtle');
      expect(caps[1]?.className).not.toContain('mdt-text-primary-foreground-subtle');
    });

    it('knows which keys are modifiers', () => {
      expect(isModifier('mod')).toBe(true);
      expect(isModifier('Shift')).toBe(true);
      expect(isModifier('e')).toBe(false);
      expect(isModifier('enter')).toBe(false);
    });

    it('changes nothing when it is not asked for', () => {
      const { container } = render(<Kbd keys={['mod', 'e']} />);
      const caps = [...container.querySelectorAll('kbd span')];
      expect(caps.some((cap) => cap.className.includes('mdt-text-foreground'))).toBe(false);
    });
  });
});

describe('Button shortcut', () => {
  it('draws the caps at the end of the button', () => {
    render(<Button shortcut={['mod', 'enter']}>Send invite</Button>);
    const button = screen.getByRole('button');
    expect(button.querySelector('kbd')).toBeInTheDocument();
  });

  it('hides them, because the button already says what it does', () => {
    render(<Button shortcut={['enter']}>Send invite</Button>);
    // Read out, "Send invite Enter" is noise. A shortcuts list is the opposite
    // case, and Kbd announces by default there.
    expect(screen.getByRole('button')).toHaveAccessibleName('Send invite');
  });

  it('inverts the ink on a solid button and leaves it alone otherwise', () => {
    const { container: solid } = render(<Button shortcut={['enter']}>Go</Button>);
    expect(solid.querySelector('kbd span')?.className).toContain(
      'mdt-border-primary-foreground-subtle'
    );

    const { container: quiet } = render(
      <Button variant="outline" shortcut={['enter']}>
        Go
      </Button>
    );
    expect(quiet.querySelector('kbd span')?.className).toContain('mdt-border-border');
  });

  it('follows the button down a size', () => {
    const { container } = render(
      <Button size="sm" shortcut={['enter']}>
        Go
      </Button>
    );
    expect(container.querySelector('kbd span')?.className).toContain('mdt-h-4');
  });

  it('withdraws the offer while the button is busy', () => {
    // The shortcut is an offer, and a loading button is not accepting one.
    const { container } = render(
      <Button loading shortcut={['enter']}>
        Go
      </Button>
    );
    expect(container.querySelector('kbd')).not.toBeInTheDocument();
  });

  it('draws nothing when no shortcut was asked for', () => {
    const { container } = render(<Button>Go</Button>);
    expect(container.querySelector('kbd')).not.toBeInTheDocument();
  });
});

describe('usePlatform', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  /** Whatever a browser might be answering with today. */
  const on = (nav: unknown) => {
    vi.stubGlobal('navigator', nav);
    const { result, unmount } = renderHook(() => usePlatform());
    // Unmounted rather than left standing, so the store's unsubscribe runs -
    // it is a no-op here, and a no-op that is never called is a no-op nobody
    // has checked.
    unmount();
    return result.current;
  };

  it('believes userAgentData first, since it is the one that is not deprecated', () => {
    expect(on({ userAgentData: { platform: 'macOS' }, platform: 'Win32' })).toBe('mac');
  });

  it('falls back to navigator.platform, which every browser still answers', () => {
    expect(on({ platform: 'MacIntel' })).toBe('mac');
    expect(on({ platform: 'Win32' })).toBe('windows');
  });

  it('counts an iPad as a Mac', () => {
    // It takes a keyboard, and that keyboard has a Command key.
    expect(on({ platform: 'iPad' })).toBe('mac');
  });

  it('guesses Control when the browser says nothing', () => {
    expect(on({})).toBe('windows');
  });

  it('guesses Control when there is no browser at all', () => {
    // Server rendering. Getting this wrong is a hydration mismatch, not a
    // wrong glyph.
    expect(on(undefined)).toBe('windows');
  });

  it('lets a caller say otherwise', () => {
    vi.stubGlobal('navigator', { platform: 'Win32' });
    expect(renderHook(() => usePlatform('mac')).result.current).toBe('mac');
  });
});
