/**
 * Props for the DatePicker - the calendar (and, with `withTime`, the time column) on its own.
 *
 * It renders inline and carries no surface of its own: the DateInput wraps it in the library
 * Popover, and a page can lay it into a Card or a Dialog.
 *
 * THE DRAFT (2026-09-28): a day and a time picked in the panel are a draft. Nothing is reported
 * until Apply; Reset empties the draft. The footer - Reset (ghost, sm) and Apply (primary, sm) -
 * is always there. Apply stays off until a day is picked (and a time, with `withTime`).
 *
 * WHAT THE OLDER HANDLERS DO NOW (kept so existing callers still compile and behave):
 * - `onChange` used to fire on every day click; it now fires once, on Apply, with the draft.
 * - `onClear` used to be the Clear button; Clear is now Reset. Given, `onClear` fires on Reset
 *   AND turns `clearable` on, so an emptied draft can be applied (Apply then reports "" through
 *   `onChange`).
 * - `onDone` used to be the Done button; Done is now Apply. It fires after every Apply, after
 *   `onChange` - the place to close a panel.
 */
export interface DatePickerProps {
  /**
   * The saved value. "YYYY-MM-DD" for a day; with `withTime`, "YYYY-MM-DDTHH:mm" (local, 24-hour).
   * Anything else reads as no choice. The draft starts from it, and starts again when it changes.
   */
  value?: string | undefined;
  /** Fires on Apply with the draft: "YYYY-MM-DD", or "YYYY-MM-DDTHH:mm" with `withTime`; "" when an emptied draft is applied. */
  onChange?: ((value: string) => void) | undefined;
  /**
   * A developer setting, never a switch shown to people: adds the 184-wide time column at the
   * right - the picked day on top, then a time every `timeStep` minutes - and the value carries
   * the time. Default false.
   */
  withTime?: boolean | undefined;
  /** Minutes between the times in the column. Default 30 (00:00 .. 23:30). */
  timeStep?: number | undefined;
  /** The earliest day that can be picked, "YYYY-MM-DD". Days, months and years before it grey out and the arrows stop. */
  min?: string | undefined;
  /** The latest day that can be picked, "YYYY-MM-DD". Days, months and years after it grey out and the arrows stop. */
  max?: string | undefined;
  /** Lets an emptied draft be applied: after Reset, Apply stays on and reports "". Default false. */
  clearable?: boolean | undefined;
  /** Fires when Reset empties the draft. */
  onReset?: (() => void) | undefined;
  /**
   * @deprecated Clear became Reset (2026-09-28). Fires on Reset; given, it also turns `clearable` on.
   */
  onClear?: (() => void) | undefined;
  /** @deprecated Done became Apply (2026-09-28). Fires after every Apply, after `onChange`. */
  onDone?: (() => void) | undefined;
  /** Class name for the picker's root. */
  className?: string | undefined;
  /** Names the calendar for assistive tech. Defaults to "Calendar". */
  'aria-label'?: string | undefined;
}
