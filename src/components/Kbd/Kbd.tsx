import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import { describeKeys, isModifier, resolveKey } from './keys';
import { usePlatform } from './usePlatform';
import type { KbdProps, KbdSize, KbdTone } from './Kbd.types';

/**
 * One key cap.
 *
 * `min-w` rather than a fixed width, because `Esc` and `Ctrl` are words and `E`
 * is a letter, and a square that fits the word is a rectangle round the letter.
 */
const capVariants = cva(
  'mdt-inline-flex mdt-shrink-0 mdt-items-center mdt-justify-center mdt-font-medium',
  {
    variants: {
      size: {
        sm: 'mdt-h-4 mdt-min-w-4 mdt-rounded-sm mdt-px-1 mdt-text-xs',
        md: 'mdt-h-5 mdt-min-w-5 mdt-rounded mdt-px-1 mdt-text-xs',
        lg: 'mdt-h-6 mdt-min-w-6 mdt-rounded-md mdt-px-1.5 mdt-text-sm',
      },
      variant: { outline: 'mdt-border', filled: '' },
      tone: { default: '', inverted: '' },
    },
    compoundVariants: [
      // The four surfaces this is drawn on. Written out rather than composed
      // from two independent variants, because a border colour and a fill
      // colour are one decision per surface, not two that happen to meet.
      {
        variant: 'outline',
        tone: 'default',
        class: 'mdt-border-border mdt-text-muted-foreground',
      },
      {
        variant: 'outline',
        tone: 'inverted',
        class: 'mdt-border-primary-foreground-subtle mdt-text-primary-foreground-muted',
      },
      {
        variant: 'filled',
        tone: 'default',
        class: 'mdt-bg-muted mdt-text-muted-foreground',
      },
      {
        variant: 'filled',
        tone: 'inverted',
        class: 'mdt-bg-primary-foreground-subtle mdt-text-primary-foreground-muted',
      },
    ],
    defaultVariants: { size: 'md', variant: 'outline', tone: 'default' },
  }
);

/** How far apart separate caps sit, and how far apart glyphs sit inside one. */
const GAP: Record<KbdSize, { loose: string; tight: string; inner: string }> = {
  sm: { loose: 'mdt-gap-0.5', tight: 'mdt-gap-px', inner: 'mdt-gap-1' },
  md: { loose: 'mdt-gap-1', tight: 'mdt-gap-0.5', inner: 'mdt-gap-1.5' },
  lg: { loose: 'mdt-gap-1.5', tight: 'mdt-gap-1', inner: 'mdt-gap-2' },
};

/** Extra room inside a joined cap, since it holds more than one glyph. */
const JOINED_PAD: Record<KbdSize, string> = {
  sm: 'mdt-px-1',
  md: 'mdt-px-1.5',
  lg: 'mdt-px-2',
};

/**
 * A tone quieter, for the modifiers.
 *
 * Two directions for the same result. On an ordinary surface everything is
 * already muted, so the *key* is lifted to full ink; on a primary button the
 * key is already near-white, so the *modifiers* drop. Either way the part that
 * changes between shortcuts is the part you read.
 */
const DIM: Record<KbdTone, { key: string; modifier: string }> = {
  default: { key: 'mdt-text-foreground', modifier: '' },
  inverted: { key: '', modifier: 'mdt-text-primary-foreground-subtle' },
};

const ICON_SIZE: Record<KbdSize, 'xs' | 'sm'> = { sm: 'xs', md: 'xs', lg: 'sm' };

/**
 * Kbd - a keyboard shortcut, drawn as keys.
 *
 * **Reach for this anywhere a shortcut is shown**: inside a button, at the end
 * of a menu row, in a search field, in a legend, in a help panel. Before it
 * existed this library drew shortcuts five different ways in five files -
 * `CommandShortcut`, `DropdownMenuShortcut`, a hand-written `<kbd>` in
 * `Sidebar`, and two more - none of which knew about the others.
 *
 * **Keys go in as data.** `keys={['mod', 'shift', 'e']}`, not a hand-assembled
 * row of icons. That is what makes it something a model can write correctly,
 * which is the point of this library, and it is also what lets the component
 * know which keys are modifiers and what to say out loud.
 *
 * **`'mod'` is the key to reach for.** Command on a Mac, Control everywhere
 * else - which is what almost every shortcut actually means. `useSubmitShortcut`
 * already accepts either at the event level, so a hint naming one of them was
 * telling half the people the wrong thing.
 *
 * **It is announced, not hidden.** The keys are read out spelled - "Command +
 * Shift + E" - because the symbols are the one thing a screen reader cannot
 * help with. Pass `decorative` where the shortcut really is decoration on
 * something that already says it; never in a list where the keys *are* the
 * information.
 *
 * For a button, do not compose this by hand - `Button` has a `shortcut` prop
 * that seats it correctly and picks the tone from the button's own variant.
 *
 * @example
 * ```tsx
 * <Kbd keys={['mod', 'k']} />                        // a menu row, a search field
 * <Kbd keys={['mod', 'shift', 'e']} dimModifiers />  // the E is what you read
 * <Kbd keys={['esc']} variant="filled" size="sm" />  // a legend
 * <Button shortcut={['mod', 'enter']}>Send</Button>  // not <Kbd> by hand
 * ```
 */
const Kbd = forwardRef<HTMLElement, KbdProps>(
  (
    {
      className,
      keys,
      layout = 'separate',
      variant = 'outline',
      size = 'md',
      tone = 'default',
      tight = false,
      dimModifiers = false,
      platform,
      decorative = false,
      label,
      ...props
    },
    ref
  ) => {
    const resolvedPlatform = usePlatform(platform);
    const joined = layout === 'joined';

    const glyphs = keys.map((key, index) => {
      const { icon, text, name } = resolveKey(key, resolvedPlatform);
      const quiet = dimModifiers && isModifier(key);
      const loud = dimModifiers && !isModifier(key);

      return (
        <span
          // The key plus its position: a shortcut may legitimately press the
          // same key twice, and `g g` is a real Vim-style binding.
          key={`${String(key)}-${String(index)}`}
          aria-hidden
          className={cn(
            'mdt-inline-flex mdt-items-center mdt-justify-center mdt-leading-none',
            // A joined cap carries the surface; the glyphs inside it are bare.
            !joined && capVariants({ size, variant, tone }),
            // After the surface, never before: the cap's own ink is a text
            // colour too, and the merger keeps whichever comes last. Written
            // above, these silently did nothing.
            quiet && DIM[tone].modifier,
            loud && DIM[tone].key
          )}
          title={name}
        >
          {icon === undefined ? text : <Icon name={icon} size={ICON_SIZE[size]} aria-hidden />}
        </span>
      );
    });

    const shared = {
      ref,
      // `font-normal` because a `<kbd>` is monospace by default in every
      // browser, and a monospace ⌘ is a different ⌘.
      className: cn(
        'mdt-inline-flex mdt-items-center mdt-font-sans',
        joined
          ? [capVariants({ size, variant, tone }), JOINED_PAD[size], GAP[size].inner]
          : tight
            ? GAP[size].tight
            : GAP[size].loose,
        className
      ),
      ...(decorative
        ? { 'aria-hidden': true }
        : { 'aria-label': label ?? describeKeys(keys, resolvedPlatform) }),
      ...props,
    };

    return <kbd {...shared}>{glyphs}</kbd>;
  }
);
Kbd.displayName = 'Kbd';

export { Kbd, capVariants as KbdVariants };
