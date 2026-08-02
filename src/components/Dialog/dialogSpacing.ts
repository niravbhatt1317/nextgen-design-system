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
 * Left and right, shared by every region.
 *
 * **The content itself has no horizontal padding.** Each region is a full-width
 * block that pads its own contents, which is what lets the footer's rule reach
 * both edges without the negative margin it used to need - `-mx-4 px-4`, a
 * number that had to be kept in step with the container's padding by hand and
 * was wrong by 7px a side the first time anyone measured it.
 *
 * One value, one place, so the three regions cannot drift apart.
 */
const GUTTER = { comfortable: 'mdt-px-4', compact: 'mdt-px-3' } as const;

/** The space above the first region. The bottom belongs to the content. */
const TOP = { comfortable: 'mdt-pt-4', compact: 'mdt-pt-3' } as const;

/**
 * Where the close button sits, so its glyph lines up with the gutter.
 *
 * Inset by less than the gutter on both axes, because the button is a 28px hit
 * area around a 16px glyph. Horizontally 10 + 6 puts the glyph's own edge on
 * the 16 the title starts at. Vertically the top is pulled up so the 28px box
 * centres on the title's line rather than on the padding above it - measured,
 * the glyph sat 4px low of the title beside it before this.
 *
 * A plain map rather than a hook - `DialogContent` is what provides the
 * density, so it cannot read its own context.
 */
export const CLOSE_POSITION = {
  comfortable: 'mdt-right-2.5 mdt-top-3',
  compact: 'mdt-right-1.5 mdt-top-2',
} as const;

/** The left and right padding every region in this dialog shares. */
export const useDialogGutter = () => GUTTER[useContext(DialogDensityContext)];

/** The padding above the first region. */
export const useDialogTop = () => TOP[useContext(DialogDensityContext)];
