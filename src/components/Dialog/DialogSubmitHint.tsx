import { forwardRef } from 'react';
import { cn } from '@/utils';
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
 * Inherits its colour from the button it sits in, so it works on the dark
 * primary and on the pale disabled state without knowing which it is on.
 *
 * @example
 * ```tsx
 * <Button onClick={save}>Send invite <DialogSubmitHint /></Button>
 * ```
 */
const DialogSubmitHint = forwardRef<HTMLSpanElement, DialogSubmitHintProps>(
  ({ className, children = '⏎', ...props }, ref) => (
    <span
      ref={ref}
      // Not announced. A screen reader gets the shortcut from the button's own
      // description if it needs it; read out here it becomes "Send invite
      // return symbol", which helps nobody.
      aria-hidden
      className={cn(
        // Square, and half the height of the 32px button it sits in. At 20 it
        // left 6px above and below and read as crowding the label; at 16 there
        // is 8, which is the proportion the product's own chip has.
        'mdt-ml-1 mdt-inline-flex mdt-h-4 mdt-w-4 mdt-items-center mdt-justify-center',
        'mdt-rounded mdt-text-xs mdt-leading-none',
        // Outlined, not filled. A filled chip reads as a second, smaller button
        // sitting inside the first - two things to press where there is one. A
        // hairline square around the glyph says "this is a key" instead, which
        // is what it is.
        //
        // Both the rule and the glyph are the button's own ink at reduced
        // strength, so one chip works on the dark primary and on the pale
        // disabled state without being told which it is on.
        'mdt-border-current/25 mdt-border',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
);
DialogSubmitHint.displayName = 'DialogSubmitHint';

export { DialogSubmitHint };
