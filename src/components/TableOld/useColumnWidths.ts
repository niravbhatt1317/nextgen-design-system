import { useCallback, useMemo, useState } from 'react';

/**
 * Column widths in pixels, keyed by whatever you call your columns.
 */
export type ColumnWidthsOld<K extends string = string> = Record<K, number>;

export interface UseColumnWidthsOldOptions {
  /**
   * How narrow any column may get, unless a column overrides it.
   *
   * A column that can reach zero cannot be grabbed again, which is the one way
   * a resizable table can trap someone.
   *
   * @default 64
   */
  minWidth?: number;

  /**
   * How wide any column may get, unless a column overrides it.
   * @default 720
   */
  maxWidth?: number;
}

export interface UseColumnWidthsOld<K extends string = string> {
  /**
   * The current width of every column, keyed as you supplied them.
   *
   * Generic over the keys you passed in, so `widths.name` is a `number` rather
   * than `number | undefined` - this project has `noUncheckedIndexedAccess` on,
   * and a plain `Record<string, number>` would make every lookup nullable at
   * the call site for no reason.
   */
  widths: ColumnWidthsOld<K>;

  /** Sets one column's width, clamped to its bounds. Only a key you supplied. */
  setWidth: (column: K, width: number) => void;

  /** Puts every column back to the width it started at. */
  reset: () => void;

  /**
   * Whether anything has been resized. Useful for showing a "reset widths"
   * control only once there is something to reset.
   */
  isResized: boolean;
}

const DEFAULT_MIN = 64;
const DEFAULT_MAX = 720;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Holds column widths for a resizable table.
 *
 * `TableHeadOld` provides the handle and its keyboard behaviour but deliberately
 * owns no state, the same way sorting is a contract rather than an
 * implementation. This is the arithmetic, kept separate so a table driven by
 * TanStack, a server, or a user's saved layout can ignore it entirely.
 *
 * The pattern follows `useEditableTabs`: props on the component, rules in a
 * hook beside it.
 *
 * @example
 * ```tsx
 * const { widths, setWidth, reset, isResized } = useColumnWidthsOld({
 *   name: 220,
 *   email: 280,
 * });
 *
 * <TableOld layout="fixed">
 *   <TableHeaderOld>
 *     <TableRowOld>
 *       <TableHeadOld
 *         resizable
 *         width={widths.name}
 *         onResize={(w) => { setWidth('name', w); }}
 *       >
 *         Name
 *       </TableHeadOld>
 *     </TableRowOld>
 *   </TableHeaderOld>
 * </TableOld>
 * ```
 *
 * @deprecated Since 0.4.0. Use `Table` / `DataTable`, now the merged console
 * Users table. This earlier family stays only for side-by-side comparison until
 * the removal pull request.
 */
export function useColumnWidthsOld<K extends string>(
  initial: ColumnWidthsOld<K>,
  options: UseColumnWidthsOldOptions = {}
): UseColumnWidthsOld<K> {
  const { minWidth = DEFAULT_MIN, maxWidth = DEFAULT_MAX } = options;

  // The initial widths are captured once. Re-reading them on every render would
  // undo a resize the moment the caller re-rendered for any other reason.
  const [initialWidths] = useState<ColumnWidthsOld<K>>(initial);
  const [widths, setWidths] = useState<ColumnWidthsOld<K>>(initial);

  const setWidth = useCallback(
    (column: K, width: number) => {
      setWidths((prev) => {
        const next = clamp(Math.round(width), minWidth, maxWidth);
        return prev[column] === next ? prev : { ...prev, [column]: next };
      });
    },
    [minWidth, maxWidth]
  );

  const reset = useCallback(() => {
    setWidths(initialWidths);
  }, [initialWidths]);

  const isResized = useMemo(
    () => (Object.keys(initialWidths) as K[]).some((key) => widths[key] !== initialWidths[key]),
    [widths, initialWidths]
  );

  return { widths, setWidth, reset, isResized };
}
