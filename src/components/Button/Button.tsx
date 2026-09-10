import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';
import './button.css';

/**
 * Hover and press move along the neutral ramp rather than through opacity.
 *
 * Fading a fill blends it toward whatever sits behind it, so on a white page a
 * mid-tone gets *lighter* on hover and the white label loses contrast. Named
 * steps climb instead. The neutral ramp does not flip in dark, so every fixed
 * neutral carries a `dark:` partner.
 */
export const buttonVariants = cva(
  [
    'mdt-btn mdt-inline-flex mdt-items-center mdt-justify-center mdt-gap-1.5',
    'mdt-whitespace-nowrap mdt-rounded-lg mdt-border mdt-border-transparent',
    'mdt-text-[13px] mdt-font-medium mdt-leading-5',
    'mdt-transition-colors mdt-duration-150',
    'focus-visible:mdt-outline-none',
    'disabled:mdt-pointer-events-none disabled:mdt-opacity-50',
    'aria-disabled:mdt-pointer-events-none aria-disabled:mdt-opacity-50',
    '[&_svg]:mdt-pointer-events-none [&_svg]:mdt-size-4 [&_svg]:mdt-shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'mdt-bg-primary mdt-text-primary-foreground',
          'hover:mdt-bg-neutral-110 active:mdt-bg-neutral-100',
          'dark:mdt-bg-neutral-20 dark:mdt-text-neutral-160',
          'dark:hover:mdt-bg-neutral-10 dark:active:mdt-bg-neutral-40',
        ].join(' '),
        secondary: [
          'mdt-bg-neutral-20 mdt-text-neutral-130',
          'hover:mdt-bg-neutral-30 active:mdt-bg-neutral-40',
          'dark:mdt-bg-neutral-120 dark:mdt-text-neutral-20',
          'dark:hover:mdt-bg-neutral-110 dark:active:mdt-bg-neutral-100',
        ].join(' '),
        outline: [
          'mdt-border-neutral-30 mdt-bg-background mdt-text-neutral-90',
          'hover:mdt-border-neutral-40 hover:mdt-bg-neutral-10 hover:mdt-text-neutral-130',
          'active:mdt-bg-neutral-20',
          'dark:mdt-border-neutral-100 dark:mdt-text-neutral-40',
          'dark:hover:mdt-border-neutral-90 dark:hover:mdt-bg-neutral-130 dark:hover:mdt-text-neutral-20',
          'dark:active:mdt-bg-neutral-120',
        ].join(' '),
        ghost: [
          'mdt-text-neutral-90',
          'hover:mdt-bg-neutral-10 hover:mdt-text-neutral-130 active:mdt-bg-neutral-20',
          'dark:mdt-text-neutral-40',
          'dark:hover:mdt-bg-neutral-130 dark:hover:mdt-text-neutral-20 dark:active:mdt-bg-neutral-120',
        ].join(' '),
        destructive: [
          'mdt-bg-destructive mdt-text-destructive-foreground',
          'hover:mdt-bg-red-70 active:mdt-bg-red-80',
        ].join(' '),
        destructiveGhost: [
          'mdt-text-destructive',
          'hover:mdt-bg-red-10 hover:mdt-text-red-70 active:mdt-bg-red-20',
          'dark:hover:mdt-bg-red-80 dark:hover:mdt-text-red-10 dark:active:mdt-bg-red-80',
        ].join(' '),
        link: [
          'mdt-h-auto mdt-rounded-sm mdt-border-0 mdt-bg-transparent mdt-p-0',
          'mdt-text-blue-60 mdt-underline-offset-4 hover:mdt-underline',
          'dark:mdt-text-blue-30',
        ].join(' '),
      },
      size: {
        sm: 'mdt-h-7',
        md: 'mdt-h-8',
        lg: 'mdt-h-9',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

/**
 * Padding is decided by what meets each edge, not by the size.
 *
 * Text against the edge takes 16, because a word needs room to sit in. A glyph
 * against the edge takes 12, because it already carries its own air. So the
 * same button is 12 on the left and 16 on the right when a glyph leads it, and
 * the two figures simply swap when the glyph trails.
 */
const EDGE = { text: 'mdt-pl-4', textR: 'mdt-pr-4', icon: 'mdt-pl-3', iconR: 'mdt-pr-3' } as const;

/** Icon-only is a square the height of its size, so its padding falls out of the box. */
const SQUARE: Record<ButtonSize, string> = {
  sm: 'mdt-w-7 mdt-p-0',
  md: 'mdt-w-8 mdt-p-0',
  lg: 'mdt-w-9 mdt-p-0',
};

/**
 * The focus edge.
 *
 * The button's own edge takes a muted blue and doubles to 2, and the fill lifts
 * to its hover step. Nothing is drawn outside the button, so the ring can never
 * touch a neighbour and the layout never moves. Two gentle signals rather than
 * one loud one — a bright ring around a 32px control shouts.
 */
const FOCUS = [
  'focus-visible:mdt-border-blue-40',
  'focus-visible:mdt-shadow-[inset_0_0_0_1px_hsl(var(--mdt-blue-40))]',
].join(' ');

const SPINNER = (
  <svg
    className="mdt-btn-spin"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    aria-hidden
  >
    <circle cx="12" cy="12" r="9" strokeOpacity="0.3" />
    <path d="M21 12a9 9 0 0 0-9-9" />
  </svg>
);

/** The outbound marker a link wears while the pointer is on it. */
const OUTBOUND = (
  <svg
    className="mdt-btn-out"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M14 4h6v6M20 4l-8.5 8.5M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
);

/** A slot counts as filled only when something will actually draw in it. */
const filled = (node: ReactNode): boolean => node !== null && node !== undefined && node !== false;

/** An accessible name, only when one was given. */
const named = (label: string | undefined): { 'aria-label'?: string } =>
  label !== undefined && label !== '' ? { 'aria-label': label } : {};

/** Where an anchor opens, and the guard a new tab needs. */
const outbound = (target: ButtonProps['target']): { target?: string; rel?: string } => {
  if (target === undefined) return {};
  return target === '_blank' ? { target, rel: 'noopener noreferrer' } : { target };
};

/** Whether there is a real address to follow. */
const linkable = (href: string | undefined): href is string => href !== undefined && href !== '';

/** Which two padding classes the edges call for. */
function paddingFor(
  iconOnly: boolean,
  isLink: boolean,
  hasLead: boolean,
  hasTrail: boolean,
  size: ButtonSize
): string {
  if (iconOnly) return SQUARE[size];
  if (isLink) return '';
  return cn(hasLead ? EDGE.icon : EDGE.text, hasTrail ? EDGE.iconR : EDGE.textR);
}

/**
 * Button — the merged console's button.
 *
 * Seven looks, three heights, one text size and one glyph size. Everything a
 * reader can see is settled by the variant and the content: the height comes
 * from the 20px line the label sits on, and the padding comes from whether a
 * word or a glyph meets each edge.
 *
 * @example
 * <Button leftIcon={<Icon name="plus" />}>Invite users</Button>
 * <Button variant="outline" size="sm">Cancel</Button>
 * <Button iconOnly variant="ghost" ariaLabel="Row actions" leftIcon={<Icon name="more-vertical" />} />
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    children,
    leftIcon,
    rightIcon,
    iconOnly = false,
    loading = false,
    loadingText,
    fullWidth = false,
    active = false,
    href,
    target,
    ariaLabel,
    className,
    style,
    disabled = false,
    type = 'button',
    ...rest
  },
  ref
) {
  const isLink = variant === 'link';
  const off = disabled || loading;

  // A spinner takes the leading glyph's place, or the whole square when there
  // is no label to sit beside.
  const lead = loading ? SPINNER : leftIcon;
  const trail = isLink && !loading ? OUTBOUND : rightIcon;
  const label = loading && loadingText ? loadingText : children;

  const hasLead = filled(lead);
  const hasTrail = filled(trail);
  const padding = paddingFor(iconOnly, isLink, hasLead, hasTrail, size);

  const classes = cn(
    buttonVariants({ variant, size: isLink ? undefined : size }),
    padding,
    FOCUS,
    fullWidth && 'mdt-w-full',
    active && !off && 'mdt-bg-neutral-20 dark:mdt-bg-neutral-120',
    className
  );

  const body = iconOnly ? (
    (lead ?? rightIcon)
  ) : (
    <>
      {hasLead ? lead : null}
      {/* The label is a bare child, not a wrapper: a run of text is its own flex
          item, so the 6px gap still applies, and a caller's getByText lands on
          the button rather than on a span nobody asked for. */}
      {filled(label) ? label : null}
      {hasTrail ? trail : null}
    </>
  );

  const shared = { className: classes, ...(style ? { style } : {}), ...named(ariaLabel) };

  // A link that cannot be followed is not a link. Held off, it falls back to a
  // disabled button rather than an anchor nothing happens on.
  if (linkable(href) && !off) {
    return (
      <a href={href} {...outbound(target)} {...shared}>
        {body}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={off}
      {...(loading ? { 'aria-busy': true } : {})}
      {...(active ? { 'aria-pressed': true } : {})}
      {...shared}
      {...rest}
    >
      {body}
    </button>
  );
});

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
