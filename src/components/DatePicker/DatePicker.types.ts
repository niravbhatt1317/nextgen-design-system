/**
 * Props for the DatePicker - the calendar on its own.
 *
 * It renders inline and carries no surface of its own: the DateInput wraps it
 * in the library Popover, and a page can lay it into a Card or a Dialog.
 */
export interface DatePickerProps {
  /** The chosen day, as "YYYY-MM-DD". Anything else reads as no choice. */
  value?: string | undefined;
  /** Fires with the picked day as "YYYY-MM-DD". */
  onChange?: ((day: string) => void) | undefined;
  /** The earliest day that can be picked, "YYYY-MM-DD". Days before it grey out and the month nav stops. */
  min?: string | undefined;
  /** The latest day that can be picked, "YYYY-MM-DD". Days after it grey out and the month nav stops. */
  max?: string | undefined;
  /** Given, the Clear button (ghost, sm) shows at the left of the footer and fires here. */
  onClear?: (() => void) | undefined;
  /** Given, the Done button (primary, sm) shows at the right of the footer and fires here. */
  onDone?: (() => void) | undefined;
  /** Class name for the calendar's root. */
  className?: string | undefined;
  /** Names the calendar for assistive tech. Defaults to "Calendar". */
  'aria-label'?: string | undefined;
}
