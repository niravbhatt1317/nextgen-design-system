import { cloneElement, isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';

/**
 * Hands an `Icon` the size it will actually be drawn at.
 *
 * **The stroke ladder reads the size an icon is _asked_ to be, not the size it
 * ends up.** A control that passes `<Icon name="…" />` with no size gets `md`
 * (20px), which takes the 20px line of 1.5 - and then a `[&_svg]` rule scales
 * the whole SVG down. The stroke scales with it: 1.5 x 16/24 draws a 1.0px
 * line where a real 16px icon draws 1.16px. The glyph lands a shade lighter
 * than its neighbours, and nothing in the markup says why.
 *
 * So a control that squeezes its icon says so, and the ladder reads the true
 * size. **An explicit size is never touched** - a caller who asked for one has
 * already made the decision this is covering for.
 *
 * First needed by `Button` and `ToolbarButton` on the same day; shared from
 * here rather than copied, because the next control that squeezes an icon will
 * want it too.
 *
 * @param node  whatever was handed in as the icon - returned untouched if it is
 *              not an element, not an `Icon`, or already carries a size
 * @param px    the size this control draws its icon at, matching its `[&_svg]` rule
 *
 * @example
 * ```tsx
 * // Button draws its glyph at 16px via [&_svg]:mdt-size-4
 * const lead = iconAtDrawnSize(leftIcon, ICON_PX);
 * ```
 */
export const iconAtDrawnSize = (node: ReactNode, px: number): ReactNode => {
  if (!isValidElement(node)) return node;
  const props = node.props as { name?: unknown; size?: unknown };
  if (typeof props.name !== 'string' || props.size !== undefined) return node;
  return cloneElement(node as ReactElement<{ size?: number }>, { size: px });
};
