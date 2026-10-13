import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Props for AddPill - the dashed "+ Add" pill that sits at the end of a row of
 * tags and adds one.
 *
 * Ported from the console (Pranjal, 2026-10-13): `AddChip` in
 * compat/om/atoms.jsx, used for "Add tag" on an organization and for every
 * catalogue tag in the Fleet tag drawer.
 *
 * It is a real `<button>`, so everything a button takes (`onClick`, `disabled`,
 * `title`, `aria-*`) passes straight through.
 */
export interface AddPillOwnProps {
  /** The label after the plus. @default 'Add' */
  children?: ReactNode | undefined;

  /** Extra classes. Must use the `mdt-` prefix. */
  className?: string | undefined;
}

export type AddPillProps = AddPillOwnProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'className' | 'type' | 'color'>;
