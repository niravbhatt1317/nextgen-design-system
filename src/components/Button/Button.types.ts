import type { KbdKey } from '../Kbd';
import type { VariantProps } from 'class-variance-authority';
import type {
  ComponentPropsWithoutRef,
  ReactNode,
  AnchorHTMLAttributes,
  CSSProperties,
  FocusEvent,
} from 'react';
import type { ButtonVariants } from './Button';

/**
 * Button component variants derived from CVA configuration
 */
export type ButtonVariantsType = VariantProps<typeof ButtonVariants>;

/**
 * Shape options for button corners
 */
export type ButtonShape = 'square' | 'rounded' | 'pill' | 'circle';

/**
 * Semantic color options
 */
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

/**
 * Shadow elevation levels
 */
export type ButtonElevation = 0 | 1 | 2 | 3;

/**
 * Loading spinner position
 */
export type LoadingPosition = 'left' | 'right' | 'center';

/**
 * Badge position on button
 */
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right';

/**
 * Icon size options
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Icon spacing options
 */
export type IconSpacing = 'compact' | 'normal' | 'relaxed';

/**
 * Button size options (for internal mappings)
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Spinner size options (for loading states)
 */
export type SpinnerSize = 'xs' | 'sm' | 'md';

/**
 * Base button props (when not using href)
 */
interface BaseButtonProps extends ComponentPropsWithoutRef<'button'>, ButtonVariantsType {
  /**
   * If true, renders as anchor tag
   */
  href?: never;
  /**
   * Link target attribute
   */
  target?: never;
}

/**
 * Link button props (when using href)
 */
interface LinkButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>, ButtonVariantsType {
  /**
   * URL to navigate to (renders button as <a> tag)
   */
  href: string;
  /**
   * Link target attribute
   */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /**
   * Disabled state (for link buttons)
   */
  disabled?: boolean;
}

/**
 * Common props shared by both button and link variants
 */
interface CommonButtonProps {
  /**
   * A keyboard shortcut, shown as key caps at the end of the button.
   *
   * `shortcut={['mod', 'enter']}` - Command on a Mac, Control elsewhere. The
   * cap's ink follows this button's variant and its size follows this button's
   * size, which is why it is a prop rather than a `<Kbd>` a caller composes:
   * both are things the button knows and a caller would have to guess.
   *
   * **Never on a destructive action.** Nobody should be able to delete
   * something by muscle memory, and a keyboard path to an irreversible act is
   * exactly that. Leave this off anything that destroys, and leave
   * `useSubmitShortcut` off with it.
   *
   * Hidden while `loading` or `success`, like the icons - the shortcut is an
   * offer and neither state is accepting one.
   */
  shortcut?: KbdKey[];

  /**
   * Content to display inside the button
   */
  children: ReactNode;

  // === Visual Variants & Styling ===

  /**
   * Inline CSS styles
   */
  style?: CSSProperties;

  /**
   * Button corner shape style
   * @default 'rounded'
   */
  shape?: ButtonShape;

  /**
   * Semantic color variant
   */
  color?: ButtonColor;

  /**
   * Shadow depth elevation (0=flat, 3=raised)
   * @default 0
   */
  elevation?: ButtonElevation;

  /**
   * Transform text to uppercase
   * @default false
   */
  uppercase?: boolean;

  /**
   * Square button with only icon (no text padding)
   * @default false
   */
  iconOnly?: boolean;

  // === Loading & States ===

  /**
   * Shows a loading spinner and disables the button
   * @default false
   */
  loading?: boolean;

  /**
   * Custom text or content shown during loading state
   */
  loadingText?: string | ReactNode;

  /**
   * Position of the loading spinner
   * @default 'left'
   */
  loadingPosition?: LoadingPosition;

  /**
   * Momentary "that worked" state - swaps the label for a checkmark and turns
   * the button green, whatever variant it started as.
   *
   * Not the same thing as `variant="success"`, which is what kind of button
   * this is. `variant` describes the action; `success` describes the moment
   * just after it finished. They compose:
   * `<Button variant="ai" success>` is an AI button reporting that it is done.
   *
   * @default false
   */
  success?: boolean;

  /**
   * Custom success icon to display instead of default checkmark
   */
  successIcon?: ReactNode;

  /**
   * Custom success text to display with success state
   */
  successText?: string | ReactNode;

  /**
   * Error state with error styling
   * @default false
   */
  error?: boolean;

  // === Interactive Behavior ===

  /**
   * Active/selected state styling
   * @default false
   */
  active?: boolean;

  /**
   * Prevents default click behavior
   * @default false
   */
  preventDefaultOnClick?: boolean;

  /**
   * Accessibility label for screen readers
   */
  ariaLabel?: string;

  /**
   * Tooltip content to show on hover
   */
  tooltipContent?: string | ReactNode;

  /**
   * Focus event handler
   */
  onFocus?: (event: FocusEvent<HTMLButtonElement> | FocusEvent<HTMLAnchorElement>) => void;

  /**
   * Blur event handler
   */
  onBlur?: (event: FocusEvent<HTMLButtonElement> | FocusEvent<HTMLAnchorElement>) => void;

  // === Icon Management ===

  /**
   * Icon to display before the button text
   */
  leftIcon?: ReactNode;

  /**
   * Icon to display after the button text
   */
  rightIcon?: ReactNode;

  /**
   * Override icon size independently from button size
   */
  iconSize?: IconSize;

  /**
   * Custom className for icon elements
   */
  iconClassName?: string;

  /**
   * Gap spacing between icon and text
   * @default 'normal'
   */
  iconSpacing?: IconSpacing;

  /**
   * Rotate icon 180 degrees (useful for dropdown chevrons)
   * @default false
   */
  rotateIcon?: boolean;

  // === Advanced Features ===

  /**
   * Badge content (number, text, or custom element)
   */
  badge?: string | number | ReactNode;

  /**
   * Position of the badge indicator
   * @default 'top-right'
   */
  badgePosition?: BadgePosition;

  /**
   * Enable Material-style ripple effect on click
   * @default false
   */
  ripple?: boolean;

  // === Radix Slot ===

  /**
   * If true, the button will render as a child component using Radix Slot
   * @default false
   */
  asChild?: boolean;
}

/**
 * Props for the Button component
 * Supports both button and link (anchor) rendering
 */
export type ButtonProps = (BaseButtonProps | LinkButtonProps) & CommonButtonProps;
