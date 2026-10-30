import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { iconAtDrawnSize } from '../../utils/icon-at-drawn-size';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../Tooltip';
import { metaLine } from '../_internal/MetaLine/metaLine';
import type { ActionCardProps, ActionCardVariant } from './ActionCard.types';

/**
 * ActionCard styles - the console's settings card (the mock's `MethodCard` and
 * `.st-method`): 14 between the parts, 16 across and 14 down, a 12 corner.
 *
 * The edge is neutral-20, the quiet text `faint` and the add blue azure-60 - the colours the console
 * page draws (its global.css points --mdt-border and --mdt-muted-foreground at
 * them); the library's own border token is a step darker.
 *
 * Hover lifts the fill one step only when the card can be clicked, so a card
 * that does nothing never looks like it might.
 */
export const actionCardVariants = cva(
  [
    'mdt-group mdt-relative mdt-flex mdt-min-w-0 mdt-items-center mdt-gap-3.5',
    'mdt-rounded-xl mdt-border mdt-px-4 mdt-py-3.5',
    'mdt-transition-colors mdt-duration-150',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'mdt-border-neutral-20 mdt-bg-background',
        add: 'mdt-border-dashed mdt-border-azure-60/45 mdt-bg-transparent',
        /* the field is 32 tall, so the card gives back 8 down to stay the height of its neighbours */
        edit: 'mdt-border-neutral-20 mdt-bg-background mdt-py-2.5',
        /* the Browse popup's endpoint card (console CredentialForm.jsx PathBrowserModal, Ronak 2026-10-09): the quiet
         * ground, an 8 corner, 12 across and 10 down, 12 to the control */
        compact:
          'mdt-gap-3 mdt-rounded-lg mdt-border-neutral-20 mdt-bg-neutral-10 mdt-px-3 mdt-py-2.5',
      },
      interactive: {
        true: 'hover:mdt-bg-secondary',
        false: '',
      },
    },
    compoundVariants: [{ variant: 'add', interactive: true, class: 'hover:mdt-border-azure-60' }],
    defaultVariants: { variant: 'default', interactive: false },
  }
);

/** The 36px tile. `add` draws it hollow and dashed, in the card's blue. */
const TILE: Record<ActionCardVariant, string> = {
  default: 'mdt-bg-secondary mdt-text-faint',
  edit: 'mdt-bg-secondary mdt-text-faint',
  compact: '',
  add: 'mdt-border mdt-border-dashed mdt-border-azure-60/45 mdt-text-azure-60 group-hover:mdt-border-azure-60',
};

/** The glyph size the tile draws at - it must match `[&_svg]:mdt-size-4`. */
const ICON_PX = 16;

/**
 * The click target is the title, stretched over the whole card by its
 * `::after`. The controls on the right sit above that layer, so a click on a
 * switch only flips the switch - no nested buttons, no stopPropagation, and the
 * keyboard reaches the card and each control as separate stops.
 */
const TARGET = [
  'mdt-min-w-0 mdt-text-left mdt-no-underline focus-visible:mdt-outline-none',
  "after:mdt-absolute after:-mdt-inset-px after:mdt-rounded-xl after:mdt-content-['']",
  'focus-visible:after:mdt-ring-2 focus-visible:after:mdt-ring-ring',
].join(' ');

/**
 * The title, truncated, with the whole name in a tooltip (the mock's `title=`
 * on `.st-method__title`). The tooltip hangs on this inner span, not on the
 * stretched target, so it opens over the words and not anywhere on the card.
 */
const titleText = (title: ReactNode): ReactNode => {
  const label = <span className="mdt-block mdt-min-w-0 mdt-truncate">{title}</span>;
  if (typeof title !== 'string' || title === '') return label;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{label}</TooltipTrigger>
        <TooltipContent>{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

/**
 * ActionCard - one item on a settings page, as a row: a tile, a title with its
 * badge, a line under it, and controls on the right.
 *
 * The whole card is clickable when it has `onClick` or `href` - open a modal,
 * a drawer, an inline edit, or go somewhere - and `clickable={false}` holds it
 * still. The switch, buttons and menu inside keep working on their own.
 *
 * @example
 * <ActionCard variant="add" icon={<Icon name="plus" />} title="Add domain" onClick={startAdd} />
 * <ActionCard
 *   icon={<Icon name="globe" />}
 *   title="northbridge.io"
 *   actions={<MotadataSwitch checked aria-label="Enable northbridge.io" />}
 *   menu={<Button iconOnly variant="ghost" size="sm" ariaLabel="More" leftIcon={<Icon name="more-horizontal" />} />}
 *   onClick={openDrawer}
 * />
 */
const ActionCard = forwardRef<HTMLDivElement, ActionCardProps>(function ActionCard(
  {
    variant = 'default',
    icon,
    title,
    badge,
    description,
    actions,
    menu,
    dim = false,
    onClick,
    href,
    target,
    clickable = true,
    children,
    className,
    ...rest
  },
  ref
) {
  const interactive =
    clickable &&
    variant !== 'edit' &&
    (onClick !== undefined || (href !== undefined && href !== ''));

  const compact = variant === 'compact';
  const titleTone = variant === 'add' ? 'mdt-text-azure-60' : 'mdt-text-foreground';
  const text = titleText(title);
  let name: ReactNode = text;
  if (interactive && href) {
    name = (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        className={TARGET}
      >
        {text}
      </a>
    );
  } else if (interactive) {
    name = (
      <button type="button" onClick={onClick} className={TARGET}>
        {text}
      </button>
    );
  }

  const body =
    variant === 'edit' ? (
      <div className="mdt-min-w-0 mdt-max-w-sm mdt-flex-1">{children}</div>
    ) : (
      <div className={cn('mdt-flex mdt-min-w-0 mdt-flex-1 mdt-flex-col', compact && 'mdt-gap-0.5')}>
        <div
          className={cn(
            'mdt-flex mdt-min-w-0 mdt-items-center mdt-gap-2',
            compact
              ? 'mdt-text-xs mdt-font-medium mdt-leading-normal mdt-text-neutral-130'
              : cn('mdt-text-sm mdt-font-medium mdt-leading-5', titleTone)
          )}
        >
          {name}
          {badge}
        </div>
        {description !== undefined && (
          <div className="mdt-flex mdt-min-w-0 mdt-flex-wrap mdt-items-center mdt-text-xs mdt-leading-normal mdt-text-faint">
            {Array.isArray(description) ? metaLine(description) : description}
          </div>
        )}
      </div>
    );

  return (
    <div
      ref={ref}
      data-slot="action-card"
      className={cn(actionCardVariants({ variant, interactive }), className)}
      {...rest}
    >
      {compact ? (
        /* the glyph leads the two lines, 2 down so it sits on the title's line; 6 to the words */
        <div className="mdt-flex mdt-min-w-0 mdt-flex-1 mdt-items-start mdt-gap-1.5">
          {icon !== undefined && (
            <span
              className="mdt-mt-0.5 mdt-inline-flex mdt-shrink-0 mdt-text-faint [&_svg]:mdt-size-3.5"
              aria-hidden
            >
              {iconAtDrawnSize(icon, 14)}
            </span>
          )}
          {body}
        </div>
      ) : null}
      {!compact && icon !== undefined && (
        <span
          className={cn(
            'mdt-inline-flex mdt-size-9 mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded-lg',
            '[&_svg]:mdt-size-4 [&_svg]:mdt-shrink-0',
            TILE[variant],
            dim && 'mdt-opacity-50'
          )}
          aria-hidden
        >
          {iconAtDrawnSize(icon, ICON_PX)}
        </span>
      )}
      {compact ? null : body}
      {(Boolean(actions) || Boolean(menu)) && (
        /* above the stretched target, so these stay their own controls */
        <div className="mdt-relative mdt-z-10 mdt-flex mdt-shrink-0 mdt-items-center mdt-gap-2.5">
          {actions}
          {actions && menu && <span className="mdt-h-4 mdt-w-px mdt-bg-neutral-20" aria-hidden />}
          {menu}
        </div>
      )}
    </div>
  );
});

export { ActionCard };
