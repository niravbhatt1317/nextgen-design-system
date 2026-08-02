import { forwardRef } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type { DialogSubmitHintProps } from './Dialog.types';

/**
 * DialogSubmitHint - the ⏎ chip that sits inside a primary button.
 *
 * The product puts one on every primary action: *Generate link*, *Next*, *Send
 * invite*, *Update grant*, *Create group*, *Done, I've copied it*. A shortcut
 * nobody knows about is worth nothing, and the button is the only place anybody
 * is looking when they are deciding to press it.
 *
 * **Never on a destructive action.** *Permanently delete* and *Continue* carry
 * no hint, deliberately: nobody should be able to delete something by muscle
 * memory, and a keyboard path to an irreversible act is exactly that. Pair this
 * with `useSubmitShortcut` and leave both off anything that destroys.
 *
 * **The glyph is Lucide's `corner-down-left`, not the ⏎ character.** The
 * character carries its own sidebearings and sits off its own baseline, so it
 * can never be centred in a box - it read as leaning into one corner however
 * the padding was set. An icon has neither problem, and it is the same arrow
 * the product draws.
 *
 * Inherits its colour from the button it sits in, so it works on the dark
 * primary and on the pale disabled state without knowing which it is on.
 *
 * @example
 * ```tsx
 * <Button onClick={save}>Send invite <DialogSubmitHint /></Button>
 * ```
 */
const DialogSubmitHint = forwardRef<HTMLSpanElement, DialogSubmitHintProps>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      // Not announced. A screen reader gets the shortcut from the button's own
      // description if it needs it; read out here it becomes "Send invite
      // return symbol", which helps nobody.
      aria-hidden
      className={cn(
        // 20 square around a 12 icon: 4px of room on all four sides, which is
        // what makes it read as a key rather than as a glyph that drifted. In a
        // 36px button that leaves 8 above and below.
        'mdt-inline-flex mdt-h-5 mdt-w-5 mdt-items-center mdt-justify-center',
        'mdt-rounded',
        // 14 from the label, and 10 to the button's edge. The 14 is the
        // button's own 8px gap plus this 6; the 10 is its 16px padding pulled
        // in by 6. A chip is not reading, so it does not need the room a
        // word after it would; at 16 it sat marooned from the edge. Both live
        // on the chip rather than as a "has a chip" variant on Button, so they
        // only ever apply where there is actually a chip.
        '-mdt-mr-1.5 mdt-ml-1.5',
        // Outlined, not filled. A filled chip reads as a second, smaller button
        // sitting inside the first - two things to press where there is one. A
        // hairline square around the glyph says "this is a key" instead, which
        // is what it is.
        //
        // The whole chip fades rather than the border carrying an alpha of its
        // own. `border-current/25` looks like it would do that and does not:
        // Tailwind cannot mix an alpha into `currentColor` here, so it fell
        // through to the theme's own border token - a fixed slate with no
        // relation to the button it sat on, measured at rgb(203,211,225) on a
        // near-black button and rgb(81,98,129) on a white one. Fading the whole
        // element keeps both the rule and the glyph as the button's own ink,
        // which is also how the product draws it: the chip is quieter than the
        // label beside it.
        'mdt-border mdt-border-current mdt-opacity-50',
        className
      )}
      {...props}
    >
      {children ?? <Icon name="corner-down-left" size="xs" aria-hidden />}
    </span>
  )
);
DialogSubmitHint.displayName = 'DialogSubmitHint';

export { DialogSubmitHint };
