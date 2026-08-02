import { createContext, useContext } from 'react';
import type { DialogDensity } from './Dialog.types';

/**
 * The density the surrounding `DialogContent` was set to.
 *
 * Every region reads it rather than being told, so a caller sets the density in
 * one place and the header, steps, body and footer all move together.
 */
export const DialogDensityContext = createContext<DialogDensity>('comfortable');

/**
 * One number per density, and everything else derived from it.
 *
 * `compact` 12 · `comfortable` 16 · `spacious` 24.
 *
 * Not evenly spaced, on purpose. 12 → 16 is the difference between a control
 * panel and a form; 16 → 24 is the difference between a form and a page that
 * happens to be in a box. A step between 16 and 24 would be a choice nobody
 * could make from a screenshot.
 *
 * Two things fall out of the number rather than being listed beside it:
 *
 * - **The bottom is the number minus 4.** The buttons sit closer to the bottom
 *   edge than the reading does to the top, because the footer already carries
 *   its rule and a full gutter under it as well left the actions floating away
 *   from the box. Measured once at `comfortable`, and it holds at every step -
 *   which is why it is arithmetic here rather than a third map to keep in sync.
 * - **The rule above the buttons is the same minus 4**, so the footer is even
 *   about its own contents. This is what `compact` was getting wrong: it kept
 *   `comfortable`'s 12 above the buttons while using 8 below them.
 *
 * What deliberately does **not** scale: the gap between a title and its
 * description, and the 4px `DialogSteps` adds beneath itself. Both are
 * relationships between two pieces of text rather than between text and a box.
 */
const GUTTER = {
  compact: 'mdt-px-3',
  comfortable: 'mdt-px-4',
  spacious: 'mdt-px-6',
} as const;

/** The space above the first region. The bottom belongs to the content. */
const TOP = {
  compact: 'mdt-pt-3',
  comfortable: 'mdt-pt-4',
  spacious: 'mdt-pt-6',
} as const;

/** The step minus 4: the room between the footer's rule and its buttons. */
const FOOTER_TOP = {
  compact: 'mdt-pt-2',
  comfortable: 'mdt-pt-3',
  spacious: 'mdt-pt-5',
} as const;

/**
 * Where the close button starts, before `CLOSE_PULL` moves it.
 *
 * The same number as the gutter, so the two follow each other by construction
 * rather than by two maps that happen to agree today.
 *
 * A plain map rather than a hook - `DialogContent` is what provides the
 * density, so it cannot read its own context.
 */
export const CLOSE_POSITION = {
  compact: 'mdt-right-3 mdt-top-3',
  comfortable: 'mdt-right-4 mdt-top-4',
  spacious: 'mdt-right-6 mdt-top-6',
} as const;

/**
 * And then pulled back onto the title, by the same amount at every density.
 *
 * The close button is a 28px hit area around a 16px glyph, so it comes out of
 * the gutter by 6 to put the glyph's own edge on it, and up by 4 to centre the
 * box on the title's line rather than on the padding above it. Measured before
 * this existed: the glyph sat 4px low of the title beside it.
 */
export const CLOSE_PULL = '-mdt-mr-1.5 -mdt-mt-1';

/** The left and right padding every region in this dialog shares. */
export const useDialogGutter = () => GUTTER[useContext(DialogDensityContext)];

/** The padding above the first region. */
export const useDialogTop = () => TOP[useContext(DialogDensityContext)];

/** The room between the footer's rule and its buttons. */
export const useDialogFooterTop = () => FOOTER_TOP[useContext(DialogDensityContext)];
