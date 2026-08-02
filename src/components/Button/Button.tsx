import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { createContext, forwardRef, useContext, type MouseEvent } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type {
  ButtonProps,
  ButtonColor,
  IconSize,
  IconSpacing,
  BadgePosition,
  ButtonSize,
  SpinnerSize,
} from './Button.types';

/**
 * The size buttons take when nobody says otherwise.
 *
 * A surface that wants all its buttons at one size - a dialog footer, a table's
 * bulk bar - sets it once here rather than every caller remembering. An explicit
 * `size` on a button still wins, and outside a provider nothing changes: the
 * default is `undefined`, which falls through to `md` exactly as before.
 *
 * @example
 * ```tsx
 * <ButtonSizeContext.Provider value="sm">{children}</ButtonSizeContext.Provider>
 * ```
 */
export const ButtonSizeContext = createContext<ButtonProps['size']>(undefined);

/**
 * Button variants using Class Variance Authority (CVA)
 * Provides consistent styling with support for multiple variants, sizes, and states
 */
export const ButtonVariants = cva(
  // Base styles applied to all buttons
  [
    'mdt-inline-flex mdt-items-center mdt-justify-center',
    'mdt-whitespace-nowrap mdt-text-sm mdt-font-medium',
    'mdt-transition-all mdt-duration-200',
    'focus-visible:mdt-outline-none',
    'disabled:mdt-pointer-events-none disabled:mdt-opacity-50',
    '[&_svg]:mdt-pointer-events-none [&_svg]:mdt-shrink-0',
    'mdt-relative', // For badge positioning
  ],
  {
    variants: {
      /**
       * Visual style variant of the button
       */
      variant: {
        primary:
          'mdt-bg-primary mdt-text-primary-foreground hover:mdt-bg-primary/90 active:mdt-bg-primary/80',
        secondary:
          'mdt-bg-secondary mdt-text-secondary-foreground hover:mdt-bg-secondary/80 active:mdt-bg-secondary/70',
        outline:
          'mdt-border mdt-border-input mdt-bg-background mdt-text-foreground hover:mdt-bg-muted hover:mdt-text-foreground active:mdt-bg-muted/80',
        ghost:
          'mdt-text-foreground hover:mdt-bg-muted hover:mdt-text-foreground active:mdt-bg-muted/80',
        link: 'mdt-text-foreground mdt-underline-offset-4 hover:mdt-text-muted-foreground hover:mdt-underline active:mdt-text-muted-foreground/80',

        // ── Destructive and success run the same four steps ────────────────
        //
        // solid → soft → outline → ghost, loudest to quietest. A destructive
        // action and its positive counterpart should be equally easy to pitch
        // at the right volume, so neither family gets steps the other lacks.
        //
        // Solid uses the semantic tokens. The quieter three need a pale
        // background and a deep text colour per tone, and there are no tokens
        // for that pair - so they are built from the primitive ramps and flip
        // in dark mode, exactly as Badge does. That missing pair is logged in
        // MISSING-TOKENS.md; it is one gap, not nine.
        //
        // Hover and press move along the ramp rather than through opacity. The
        // `/90` shortcut blends the fill toward whatever is behind it, so on a
        // white page a mid-tone fill gets *lighter* on hover and its white text
        // falls under 4.5:1 - measured at 3.8 hovering and 3.2 pressed before
        // this changed. Named steps keep contrast climbing instead of dropping.
        //
        // On the pale variants the text deepens alongside the background for the
        // same reason. In dark mode hover lifts a step and press sinks to the
        // darkest, which reads as pressed without ever thinning the text.
        destructive:
          'mdt-bg-destructive mdt-text-destructive-foreground hover:mdt-bg-red-70 active:mdt-bg-red-80',
        destructiveSoft:
          'mdt-bg-red-10 mdt-text-red-80 hover:mdt-bg-red-20 hover:mdt-text-red-90 active:mdt-bg-red-30 active:mdt-text-red-100 dark:mdt-bg-red-90 dark:mdt-text-red-30 dark:hover:mdt-bg-red-80 dark:hover:mdt-text-red-20 dark:active:mdt-bg-red-100 dark:active:mdt-text-red-20',
        destructiveOutline:
          'mdt-border mdt-border-destructive mdt-bg-transparent mdt-text-destructive hover:mdt-bg-red-5 hover:mdt-text-red-80 active:mdt-bg-red-10 active:mdt-text-red-80 dark:mdt-border-red-40 dark:mdt-text-red-40 dark:hover:mdt-bg-red-90 dark:active:mdt-bg-red-100',
        destructiveGhost:
          'mdt-bg-transparent mdt-text-destructive hover:mdt-bg-red-5 hover:mdt-text-red-80 active:mdt-bg-red-10 active:mdt-text-red-80 dark:mdt-text-red-40 dark:hover:mdt-bg-red-90 dark:active:mdt-bg-red-100',

        success:
          'mdt-bg-success mdt-text-success-foreground hover:mdt-bg-green-80 active:mdt-bg-green-90',
        successSoft:
          'mdt-bg-green-10 mdt-text-green-80 hover:mdt-bg-green-20 hover:mdt-text-green-90 active:mdt-bg-green-30 active:mdt-text-green-100 dark:mdt-bg-green-90 dark:mdt-text-green-30 dark:hover:mdt-bg-green-80 dark:hover:mdt-text-green-20 dark:active:mdt-bg-green-100 dark:active:mdt-text-green-20',
        successOutline:
          'mdt-border mdt-border-success mdt-bg-transparent mdt-text-success hover:mdt-bg-green-5 hover:mdt-text-green-80 active:mdt-bg-green-10 active:mdt-text-green-80 dark:mdt-border-green-40 dark:mdt-text-green-40 dark:hover:mdt-bg-green-90 dark:active:mdt-bg-green-100',
        successGhost:
          'mdt-bg-transparent mdt-text-success hover:mdt-bg-green-5 hover:mdt-text-green-80 active:mdt-bg-green-10 active:mdt-text-green-80 dark:mdt-text-green-40 dark:hover:mdt-bg-green-90 dark:active:mdt-bg-green-100',

        // ── AI ─────────────────────────────────────────────────────────────
        //
        // Org Mgmt, Agent Fleet and Credential each built one independently and
        // arrived at the same values: pale purple ground, deep purple text, a
        // faint purple edge, sparkle on the left. Not a recoloured primary -
        // the point is that it reads as a different kind of action.
        //
        // The text deepens along with the background on hover and press, so
        // contrast climbs rather than drops as the tint gets stronger.
        ai: 'mdt-border mdt-border-purple-20 mdt-bg-purple-10 mdt-text-purple-80 hover:mdt-bg-purple-20 hover:mdt-text-purple-90 active:mdt-bg-purple-30 active:mdt-text-purple-90 dark:mdt-border-purple-70 dark:mdt-bg-purple-90 dark:mdt-text-purple-20 dark:hover:mdt-bg-purple-80 dark:hover:mdt-text-purple-10 dark:active:mdt-bg-purple-100 dark:active:mdt-text-purple-10',
      },
      /**
       * Size variant of the button
       */
      size: {
        xs: 'mdt-h-7 mdt-px-2 mdt-text-xs',
        sm: 'mdt-h-8 mdt-px-3 mdt-text-xs',
        md: 'mdt-h-9 mdt-px-4 mdt-text-sm',
        lg: 'mdt-h-10 mdt-px-6 mdt-text-base',
        xl: 'mdt-h-12 mdt-px-8 mdt-text-lg',
        icon: 'mdt-h-9 mdt-w-9',
      },
      /**
       * Full width button that spans its container
       */
      fullWidth: {
        true: 'mdt-w-full',
        false: '',
      },
      /**
       * Button shape (corner style)
       */
      shape: {
        square: 'mdt-rounded-none',
        rounded: 'mdt-rounded-md',
        pill: 'mdt-rounded-full',
        circle: 'mdt-rounded-full',
      },
      /**
       * Shadow elevation
       */
      elevation: {
        0: '',
        1: 'mdt-shadow-sm',
        2: 'mdt-shadow-md',
        3: 'mdt-shadow-lg',
      },
      /**
       * Active/selected state
       */
      active: {
        true: 'mdt-ring-2 mdt-ring-ring mdt-ring-offset-2',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      shape: 'rounded',
      elevation: 0,
      active: false,
    },
  }
);

/**
 * Color variant class mapping - using new color palette
 */
const colorClasses: Record<ButtonColor, string> = {
  primary: 'mdt-bg-primary mdt-text-primary-foreground hover:mdt-bg-primary/90',
  secondary: 'mdt-bg-secondary mdt-text-secondary-foreground hover:mdt-bg-secondary/80',
  success: 'mdt-bg-success mdt-text-success-foreground hover:mdt-bg-success/90',
  warning: 'mdt-bg-warning mdt-text-warning-foreground hover:mdt-bg-warning/90',
  error: 'mdt-bg-destructive mdt-text-destructive-foreground hover:mdt-bg-destructive/90',
  info: 'mdt-bg-info mdt-text-info-foreground hover:mdt-bg-info/90',
};

/**
 * Icon size class mapping
 */
const iconSizeClasses: Record<IconSize, string> = {
  xs: 'mdt-size-3',
  sm: 'mdt-size-3.5',
  md: 'mdt-size-4',
  lg: 'mdt-size-5',
};

/**
 * Icon spacing (gap) class mapping
 */
const iconSpacingClasses: Record<IconSpacing, string> = {
  compact: 'mdt-gap-1',
  normal: 'mdt-gap-2',
  relaxed: 'mdt-gap-3',
};

/**
 * Badge position class mapping
 */
const badgePositionClasses: Record<BadgePosition, string> = {
  'top-right': 'mdt-top-0 mdt-right-0 mdt-translate-x-1/2 -mdt-translate-y-1/2',
  'top-left': 'mdt-top-0 mdt-left-0 -mdt-translate-x-1/2 -mdt-translate-y-1/2',
  'bottom-right': 'mdt-bottom-0 mdt-right-0 mdt-translate-x-1/2 mdt-translate-y-1/2',
};

/**
 * Spinner size mapping for loading state
 */
const spinnerSizeMap: Record<ButtonSize, SpinnerSize> = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
};

/**
 * Loading spinner component using Icon
 */
function LoadingSpinner({ size = 'md' }: Readonly<{ size?: ButtonSize }>) {
  return (
    <Icon name="loader" size={spinnerSizeMap[size]} className="mdt-animate-spin" aria-hidden />
  );
}

/**
 * Success checkmark icon using Icon component
 */
function SuccessIcon() {
  return <Icon name="check" size="sm" aria-hidden />;
}

/**
 * Badge component for button
 */
function ButtonBadge({
  content,
  position,
}: Readonly<{
  content: string | number | React.ReactNode;
  position: BadgePosition;
}>) {
  // Use direct object lookup instead of switch statement (SonarQube: S1479)
  const positionClass = badgePositionClasses[position];

  return (
    <span
      className={cn(
        'mdt-absolute mdt-flex mdt-h-5 mdt-min-w-[1.25rem] mdt-items-center mdt-justify-center',
        'mdt-rounded-full mdt-bg-destructive mdt-px-1 mdt-text-xs mdt-font-semibold mdt-text-destructive-foreground',
        'mdt-ring-2 mdt-ring-background',
        positionClass
      )}
    >
      {content}
    </span>
  );
}

// ============================================================================
// Helper functions to reduce cognitive complexity (SonarJS: cognitive-complexity)
// ============================================================================

/**
 * Determine the component type to render
 */
function getButtonComponent(asChild: boolean, isLink: boolean): typeof Slot | 'a' | 'button' {
  if (asChild) return Slot;
  if (isLink) return 'a';
  return 'button';
}

/**
 * Get spinner size based on button size
 */
function getSpinnerSizeFromButtonSize(size: ButtonProps['size']): ButtonSize {
  if (size === 'xs' || size === 'sm') return 'sm';
  if (size === 'lg' || size === 'xl') return 'lg';
  return 'md';
}

/**
 * The sparkle an `ai` button carries.
 *
 * All three product systems that built an AI button put a sparkle on the left,
 * so the variant supplies it rather than leaving every caller to remember. An
 * explicit `leftIcon` or `rightIcon` always wins.
 */
function resolveAiSparkle(props: {
  variant: ButtonProps['variant'];
  leftIcon: React.ReactNode;
  rightIcon: React.ReactNode;
  size: ButtonProps['size'];
}): React.ReactNode {
  const { variant, leftIcon, rightIcon, size } = props;
  if (variant !== 'ai' || leftIcon || rightIcon) return leftIcon;

  return (
    <Icon name="sparkles" size={spinnerSizeMap[getSpinnerSizeFromButtonSize(size)]} aria-hidden />
  );
}

/**
 * Compute button classes based on props
 */
function computeButtonClasses(props: {
  color: ButtonColor | undefined;
  variant: ButtonProps['variant'];
  size: ButtonProps['size'];
  iconOnly: boolean;
  fullWidth: boolean | null | undefined;
  shape: ButtonProps['shape'];
  elevation: ButtonProps['elevation'];
  active: boolean;
  uppercase: boolean;
  error: boolean;
  success: boolean;
  iconSpacing: IconSpacing;
  iconSize: IconSize | undefined;
  ripple: boolean;
  className: string | undefined;
}) {
  const {
    color,
    variant,
    size,
    iconOnly,
    fullWidth,
    shape,
    elevation,
    active,
    uppercase,
    error,
    success,
    iconSpacing,
    iconSize,
    ripple,
    className,
  } = props;

  /**
   * An icon-only button squared off at the size you asked for.
   *
   * `iconOnly` used to force `size: 'icon'`, which is a fixed 36px - so a
   * labelled button and an icon button beside it could never line up at any size
   * but `md`. In a table row or a toolbar that mismatch is glaring, and the only
   * workaround was overriding width and padding at the call site.
   *
   * `size="icon"` still means 36px, so nothing that already uses it moves.
   */
  const iconOnlySizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
    xs: 'mdt-h-7 mdt-w-7 mdt-p-0',
    sm: 'mdt-h-8 mdt-w-8 mdt-p-0',
    md: 'mdt-h-9 mdt-w-9 mdt-p-0',
    lg: 'mdt-h-10 mdt-w-10 mdt-p-0',
    xl: 'mdt-h-12 mdt-w-12 mdt-p-0',
    icon: 'mdt-h-9 mdt-w-9 mdt-p-0',
  };

  const baseClasses = ButtonVariants({
    variant: color ? undefined : variant,
    size,
    fullWidth,
    shape: iconOnly && shape === 'rounded' ? 'circle' : shape,
    elevation,
    active,
  });

  // Applied after the size variant so the square wins the height and padding.
  // `md` matches the old behaviour: `iconOnly` used to force a 36px square.
  const iconOnlyClass = iconOnly ? iconOnlySizeClasses[size ?? 'md'] : '';
  const colorClass = color ? colorClasses[color] : '';
  const iconSpacingClass = iconOnly ? '' : iconSpacingClasses[iconSpacing];
  const iconSizeClass = iconSize ? iconSizeClasses[iconSize] : undefined;

  return {
    classes: cn(
      baseClasses,
      iconOnlyClass,
      colorClass,
      uppercase && 'mdt-uppercase',
      error && 'mdt-bg-destructive mdt-text-destructive-foreground hover:mdt-bg-destructive/90',
      success && 'mdt-bg-success mdt-text-success-foreground hover:mdt-bg-success/90',
      iconSpacingClass,
      ripple && 'mdt-overflow-hidden',
      className
    ),
    iconSizeClass,
  };
}

/**
 * Build button content JSX
 */
function buildButtonContent(props: {
  badge?: ButtonProps['badge'];
  badgePosition: BadgePosition;
  loading: boolean;
  loadingPosition: ButtonProps['loadingPosition'];
  spinnerSize: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  success: boolean;
  successIcon?: React.ReactNode;
  wrappedLeftIcon?: React.ReactNode;
  wrappedRightIcon?: React.ReactNode;
  iconOnly: boolean;
  children: React.ReactNode;
  loadingText?: ButtonProps['loadingText'];
  successText?: ButtonProps['successText'];
}) {
  const {
    badge,
    badgePosition,
    loading,
    loadingPosition,
    spinnerSize,
    success,
    successIcon,
    wrappedLeftIcon,
    wrappedRightIcon,
    iconOnly,
    children,
    loadingText,
    successText,
  } = props;

  // Determine content to display
  const getDisplayContent = () => {
    if (loading && loadingText) return loadingText;
    return children;
  };

  const renderContent = () => {
    if (success && successText) return successText;
    return getDisplayContent();
  };

  return (
    <>
      {badge && <ButtonBadge content={badge} position={badgePosition} />}
      {loading && loadingPosition === 'left' && <LoadingSpinner size={spinnerSize} />}
      {loading && loadingPosition === 'center' && !wrappedLeftIcon && !wrappedRightIcon && (
        <LoadingSpinner size={spinnerSize} />
      )}
      {success && !loading && (successIcon ?? <SuccessIcon />)}
      {!loading && !success && wrappedLeftIcon}
      {!iconOnly && renderContent()}
      {!loading && !success && wrappedRightIcon}
      {loading && loadingPosition === 'right' && <LoadingSpinner size={spinnerSize} />}
    </>
  );
}

/**
 * Render button as link (anchor tag)
 */
function renderAsLink(props: {
  ref: React.Ref<HTMLAnchorElement>;
  href: string;
  target: string | undefined;
  isDisabled: boolean;
  style: React.CSSProperties | undefined;
  classes: string;
  ariaLabel: string | undefined;
  tooltipContent: ButtonProps['tooltipContent'];
  handleClick: React.MouseEventHandler<HTMLAnchorElement>;
  onFocus: ((event: React.FocusEvent<HTMLAnchorElement>) => void) | undefined;
  onBlur: ((event: React.FocusEvent<HTMLAnchorElement>) => void) | undefined;
  restProps: React.AnchorHTMLAttributes<HTMLAnchorElement>;
  buttonContent: React.ReactNode;
}) {
  const {
    ref,
    href,
    target,
    isDisabled,
    style,
    classes,
    ariaLabel,
    tooltipContent,
    handleClick,
    onFocus,
    onBlur,
    restProps,
    buttonContent,
  } = props;

  const anchorProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
    ...restProps,
    href: isDisabled ? undefined : href,
    className: classes,
    'aria-disabled': isDisabled,
    onClick: handleClick,
  };

  if (target) anchorProps.target = target;
  if (style) anchorProps.style = style;
  if (ariaLabel) anchorProps['aria-label'] = ariaLabel;
  if (onFocus) anchorProps.onFocus = onFocus;
  if (onBlur) anchorProps.onBlur = onBlur;
  if (typeof tooltipContent === 'string') anchorProps.title = tooltipContent;

  return (
    <a ref={ref} {...anchorProps}>
      {buttonContent}
    </a>
  );
}

/**
 * Build props object for button element
 */
function buildButtonProps(props: {
  restProps: Record<string, unknown>;
  ref: React.ForwardedRef<HTMLButtonElement | HTMLAnchorElement>;
  type: string;
  style: React.CSSProperties | undefined;
  classes: string;
  isDisabled: boolean;
  loading: boolean;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  onFocus: ((event: React.FocusEvent<HTMLButtonElement>) => void) | undefined;
  onBlur: ((event: React.FocusEvent<HTMLButtonElement>) => void) | undefined;
  ariaLabel: string | undefined;
  tooltipContent: ButtonProps['tooltipContent'];
}): Record<string, unknown> {
  const {
    restProps,
    ref,
    type,
    style,
    classes,
    isDisabled,
    loading,
    handleClick,
    onFocus,
    onBlur,
    ariaLabel,
    tooltipContent,
  } = props;

  const propsForButton: Record<string, unknown> = {
    ...restProps,
    ref,
    type,
    className: classes,
    disabled: isDisabled,
    'aria-busy': loading,
    onClick: handleClick,
  };

  if (style) propsForButton.style = style;
  if (onFocus) propsForButton.onFocus = onFocus;
  if (onBlur) propsForButton.onBlur = onBlur;
  if (ariaLabel) propsForButton['aria-label'] = ariaLabel;
  if (typeof tooltipContent === 'string') propsForButton.title = tooltipContent;

  return propsForButton;
}

/**
 * Wrap icon with size and rotation classes
 */
function wrapIcon(
  icon: React.ReactNode | undefined,
  iconSizeClass: string | undefined,
  iconClassName: string | undefined,
  rotateIcon: boolean
): React.ReactNode | null {
  if (!icon) return null;

  return (
    <span
      className={cn(
        iconSizeClass,
        iconClassName,
        rotateIcon && 'mdt-rotate-180 mdt-transition-transform'
      )}
    >
      {icon}
    </span>
  );
}

/**
 * Create ripple effect element
 */
function createRippleEffect(
  e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>
): void {
  const button = e.currentTarget;
  const rippleElement = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  rippleElement.style.width = `${size.toString()}px`;
  rippleElement.style.height = `${size.toString()}px`;
  rippleElement.style.left = `${x.toString()}px`;
  rippleElement.style.top = `${y.toString()}px`;
  rippleElement.className =
    'mdt-absolute mdt-rounded-full mdt-bg-white/30 mdt-animate-ping mdt-pointer-events-none';

  button.appendChild(rippleElement);

  const RIPPLE_ANIMATION_DURATION_MS = 600;
  setTimeout(() => {
    rippleElement.remove();
  }, RIPPLE_ANIMATION_DURATION_MS);
}

/**
 * Button component with extensive features and variants.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button variant="primary">Click me</Button>
 *
 * // With loading state
 * <Button loading loadingText="Saving...">Save</Button>
 *
 * // With icons
 * <Button leftIcon={<PlusIcon />}>Add Item</Button>
 *
 * // Icon only
 * <Button iconOnly shape="circle"><TrashIcon /></Button>
 *
 * // With badge
 * <Button badge={3}>Notifications</Button>
 *
 * // As link
 * <Button href="/dashboard" target="_blank">Dashboard</Button>
 *
 * // With tooltip
 * <Button tooltipContent="Click to save">Save</Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props, ref) => {
  const {
    className,
    style,
    variant,
    size: sizeProp,
    fullWidth,
    shape = 'rounded',
    elevation = 0,
    color,
    uppercase = false,
    iconOnly = false,
    asChild = false,
    loading = false,
    loadingText,
    loadingPosition = 'left',
    success = false,
    successIcon,
    successText,
    error = false,
    active = false,
    type = 'button',
    preventDefaultOnClick = false,
    ariaLabel,
    tooltipContent,
    onFocus,
    onBlur,
    leftIcon,
    rightIcon,
    iconSize,
    iconClassName,
    iconSpacing = 'normal',
    rotateIcon = false,
    badge,
    badgePosition = 'top-right',
    ripple = false,
    disabled,
    children,
    onClick,
    ...restProps
  } = props;

  // What the surface asked for, if it asked. An explicit prop still wins.
  const inherited = useContext(ButtonSizeContext);
  const size = sizeProp ?? inherited;

  // Determine if rendering as link
  const isLink = 'href' in props;

  // Determine the component to render
  const Comp = getButtonComponent(asChild, isLink);

  // Handle disabled state
  const isDisabled = disabled ?? loading;

  // Compute classes using helper function
  const { classes: additionalClasses, iconSizeClass } = computeButtonClasses({
    color,
    variant,
    size,
    iconOnly,
    fullWidth,
    shape,
    elevation,
    active,
    uppercase,
    error,
    success,
    iconSpacing,
    iconSize,
    ripple,
    className,
  });

  // An `ai` button brings its own sparkle unless the caller supplied an icon
  const resolvedLeftIcon = resolveAiSparkle({ variant, leftIcon, rightIcon, size });

  // Wrap icons with size and rotation
  const wrappedLeftIcon = wrapIcon(resolvedLeftIcon, iconSizeClass, iconClassName, rotateIcon);
  const wrappedRightIcon = wrapIcon(rightIcon, iconSizeClass, iconClassName, rotateIcon);

  // Handle click event
  const handleClick = (e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>) => {
    if (preventDefaultOnClick) {
      e.preventDefault();
    }

    if (onClick && !isDisabled) {
      const handler = onClick as (
        event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>
      ) => void;
      handler(e);
    }

    if (ripple) {
      createRippleEffect(e);
    }
  };

  // Determine loading spinner size
  const spinnerSize = getSpinnerSizeFromButtonSize(size);

  // Build button content using helper function
  const buttonContent = buildButtonContent({
    badge,
    badgePosition,
    loading,
    loadingPosition,
    spinnerSize,
    leftIcon: resolvedLeftIcon,
    rightIcon,
    success,
    successIcon,
    wrappedLeftIcon,
    wrappedRightIcon,
    iconOnly,
    children,
    loadingText,
    successText,
  });

  // Render as link using helper function
  if (isLink) {
    const { href, target } = props as { href: string; target?: string };

    return renderAsLink({
      ref: ref as React.Ref<HTMLAnchorElement>,
      href,
      target: target ?? undefined,
      isDisabled,
      style: style ?? undefined,
      classes: additionalClasses,
      ariaLabel: ariaLabel ?? undefined,
      tooltipContent: tooltipContent ?? undefined,
      handleClick: handleClick as React.MouseEventHandler<HTMLAnchorElement>,
      onFocus: onFocus ? (onFocus as React.FocusEventHandler<HTMLAnchorElement>) : undefined,
      onBlur: onBlur ? (onBlur as React.FocusEventHandler<HTMLAnchorElement>) : undefined,
      restProps: restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>,
      buttonContent,
    });
  }

  // Build button props using helper function
  const propsForButton = buildButtonProps({
    restProps,
    ref,
    type,
    style: style ?? undefined,
    classes: additionalClasses,
    isDisabled,
    loading,
    handleClick: handleClick as React.MouseEventHandler<HTMLButtonElement>,
    onFocus: onFocus ?? undefined,
    onBlur: onBlur ?? undefined,
    ariaLabel: ariaLabel ?? undefined,
    tooltipContent: tooltipContent ?? undefined,
  });

  return <Comp {...propsForButton}>{buttonContent}</Comp>;
});

Button.displayName = 'Button';

export { Button };
