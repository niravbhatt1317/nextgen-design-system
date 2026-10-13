import { forwardRef } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type { AddPillProps } from './AddPill.types';

/**
 * AddPill styles.
 *
 * Ported from the console (Pranjal, 2026-10-13): `AddChip` in
 * compat/om/atoms.jsx, "the dashed add-affordance pill", where two hand-rolled
 * shapes had already collapsed into one. Its values, read off that source:
 *
 * | Console                                  | Here                                  |
 * | ---------------------------------------- | ------------------------------------- |
 * | 1px dashed neutral-40, no fill           | `mdt-border-dashed mdt-border-neutral-40 mdt-bg-transparent` |
 * | ink neutral-90                           | `mdt-text-neutral-90`                 |
 * | hover: fill neutral-10, ink neutral-110  | `hover:mdt-bg-neutral-10 hover:mdt-text-neutral-110` |
 * | corner 48 (a capsule)                    | `mdt-rounded-full`                    |
 * | padding 2 / 8, gap 4                     | `mdt-px-2 mdt-gap-1`                  |
 * | 11px / 500, line-height 1.5 (about 22 tall) | 12px / 500 at 20 tall: `mdt-h-5 mdt-text-xs` |
 * | plus glyph at 10px                       | the same, at 10px                     |
 *
 * The one translation is the type step. The console's 11px / 1.5 chip is the
 * same chip its `Chip` drew by hand before it moved onto the small Badge (20 tall,
 * 12px, 8px sides); 11px is not on the library's type scale, so the add pill
 * takes the small Badge's box the same way, and sits level with the chips it
 * ends a row of.
 *
 * Kept consistent with InlineTags' own "Add tag" button: a `<button>` that is
 * never a submit, the dashed edge, the plus before the label, the same focus
 * ring. The colour and size differ, and are listed for Pranjal, not decided:
 * InlineTags' button is the info badge's blue, 28 tall with an 8px corner and a
 * 14px plus, sized to the 28px TagPill it sits beside; the console's is neutral,
 * a capsule, 10px plus.
 */
const ADD_PILL_CLASSES = [
  'mdt-inline-flex mdt-h-5 mdt-shrink-0 mdt-items-center mdt-gap-1 mdt-rounded-full mdt-px-2',
  'mdt-border mdt-border-dashed mdt-border-neutral-40 mdt-bg-transparent',
  'mdt-cursor-pointer mdt-whitespace-nowrap mdt-text-xs mdt-font-medium mdt-text-neutral-90',
  'mdt-transition-colors hover:mdt-bg-neutral-10 hover:mdt-text-neutral-110',
  'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring',
  // Not in the console's AddChip (it had no disabled state); TagPill's disabled look, so a
  // button that cannot be pressed does not look pressable.
  'disabled:mdt-pointer-events-none disabled:mdt-opacity-50',
];

/** The console's plus, at its 10px. */
const PLUS_SIZE = 10;

/**
 * AddPill - the dashed pill that adds a tag to a row of them.
 *
 * @example
 * ```tsx
 * <AddPill onClick={openField} title="Create or add a tag">Add tag</AddPill>
 * <AddPill onClick={() => assign('production')}>Production</AddPill>
 * ```
 */
const AddPill = forwardRef<HTMLButtonElement, AddPillProps>(
  ({ children = 'Add', className, ...rest }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(ADD_PILL_CLASSES, className)}
      data-testid="add-pill"
      {...rest}
    >
      <Icon name="plus" size={PLUS_SIZE} aria-hidden />
      {children}
    </button>
  )
);

AddPill.displayName = 'AddPill';

export { AddPill };
