/**
 * Props for RequiredMark - the red asterisk after the label of a field that must be filled in.
 */
export interface RequiredMarkProps {
  /**
   * Says "required" to a screen reader, after the label's own words. The star
   * itself is for the eye only. Turn it off where the field already tells a
   * screen reader it is required - a native `required` or `aria-required` on
   * the control - so the word is not heard twice.
   * @default true
   */
  announce?: boolean | undefined;

  className?: string | undefined;
}
