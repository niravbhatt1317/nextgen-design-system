import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { RequiredMarkProps } from './RequiredMark.types';

/* PORTED FROM THE CONSOLE (Pranjal, 2026-10-28) - ui/RequiredMark.jsx, the mark of 2026-10-22 ("In many forms we have
 * mandatory fields but we not are showing asterisk, so give that symbol beside label"). 3 off the word in the danger red
 * (his 2026-10-11 design pick, K-Field-05 - the Input's own gap, measured on the console 2026-09-22); the star is for the
 * eye, the hidden word is what a screen reader says.
 *
 * ONE MARK. Before this, the library drew the asterisk six times by hand - Input and Textarea 3 off the word, Select
 * (twice), Combobox (both modes) and FormLabel 4 off it - so two gaps were live at once. Every field now renders this. */

/**
 * RequiredMark - the red asterisk after the label of a field that must be
 * filled in, with the word "required" for a screen reader.
 *
 * Input, Textarea, Select, Combobox and FormLabel draw it themselves when given
 * `required`. Put it after the text of a label you draw yourself.
 *
 * @example
 * ```tsx
 * <FormLabel htmlFor="name" required>Name</FormLabel>
 * <span className="my-label">Organization name<RequiredMark /></span>
 * ```
 */
const RequiredMark = forwardRef<HTMLSpanElement, RequiredMarkProps>(
  ({ announce = true, className }, ref) => (
    <>
      <span
        ref={ref}
        className={cn('mdt-ml-[3px] mdt-text-destructive', className)}
        aria-hidden="true"
        data-slot="required-mark"
      >
        *
      </span>
      {announce ? <span className="mdt-sr-only">{' required'}</span> : null}
    </>
  )
);

RequiredMark.displayName = 'RequiredMark';

export { RequiredMark };
