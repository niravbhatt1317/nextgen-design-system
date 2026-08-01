import { cva } from 'class-variance-authority';
import {
  Children,
  Fragment,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import type { BannerProps, BannerTone } from './Banner.types';

/**
 * The banner surface - the same tint, edge and glyph Toast wears.
 *
 * Om Vekariya's rule carries over exactly: *only the icon and the border carry
 * the tone.* The words stay one colour in every tone, so a danger banner is not
 * also harder to read than an info one.
 *
 * No shadow, and that is the difference you can see. A toast is lifted off the
 * page because it arrived from somewhere else; a banner is part of the layout
 * and sits flat in it.
 */
export const bannerVariants = cva(['mdt-flex mdt-w-full mdt-text-sm mdt-leading-normal'], {
  variants: {
    tone: {
      info: 'mdt-border-feedback-info-border mdt-bg-feedback-info-bg',
      warning: 'mdt-border-feedback-warning-border mdt-bg-feedback-warning-bg',
      danger: 'mdt-border-feedback-danger-border mdt-bg-feedback-danger-bg',
      success: 'mdt-border-feedback-success-border mdt-bg-feedback-success-bg',
      ai: 'mdt-border-feedback-ai-border mdt-bg-feedback-ai-bg',
      neutral: 'mdt-border-feedback-neutral-border mdt-bg-feedback-neutral-bg',
    },
    placement: {
      inline: 'mdt-gap-2.5 mdt-rounded-lg mdt-border mdt-py-3 mdt-pl-3.5 mdt-pr-3',
      // Edge to edge: no rounding and no side edges, because there is nothing
      // beside it to be edged against. A touch more room at the sides, since
      // the banner is now as wide as the view.
      page: 'mdt-gap-2.5 mdt-rounded-none mdt-border-x-0 mdt-border-y mdt-py-3 mdt-pl-5 mdt-pr-4',
    },
    /**
     * A single row of content - everything centres on it together. Once the
     * banner has a paragraph under the title, or the actions have dropped to
     * their own line, the glyph and the cross belong beside the *first* line
     * rather than halfway down the block.
     *
     * Switched on what the banner is *made of*, never on how it happens to
     * wrap: a title that runs onto a second line by itself still centres,
     * because measuring the wrap would mean the same banner rendered two ways
     * at two window widths. A wrapped title is a sentence; a description is a
     * second thing to read, and that is the line worth drawing.
     */
    stacked: {
      true: 'mdt-items-start',
      false: 'mdt-items-center',
    },
  },
  defaultVariants: { tone: 'neutral', placement: 'inline', stacked: false },
});

/** Only the icon carries the tone. */
const ICON_TONE: Record<BannerTone, string> = {
  info: 'mdt-text-feedback-info-icon',
  warning: 'mdt-text-feedback-warning-icon',
  danger: 'mdt-text-feedback-danger-icon',
  success: 'mdt-text-feedback-success-icon',
  ai: 'mdt-text-feedback-ai-icon',
  neutral: 'mdt-text-feedback-neutral-icon',
};

/** The same glyph per tone that Toast uses - same meaning, same mark. */
const TONE_ICON: Record<BannerTone, IconName> = {
  info: 'info',
  neutral: 'info',
  warning: 'alert-triangle',
  danger: 'alert-circle',
  success: 'check',
  ai: 'sparkles',
};

/**
 * The glyph sits in a box exactly one line tall and centres itself inside it.
 *
 * That single rule does both jobs. On a one-line banner the box *is* the line,
 * so the glyph lands on its centre. On a stacked one the row is top-aligned and
 * the box still only covers the first line, so the glyph stays beside it -
 * measured at 0.00px off the first line's centre across a five-line body, in
 * both engines and both themes. Nothing switches between the two.
 */
const GLYPH_BOX = 'mdt-flex mdt-h-[1.5em] mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center';

/**
 * The actions, flattened to one list.
 *
 * `Children.toArray` counts a fragment as one child, and a fragment is exactly
 * how anyone writes two actions - `<><Button/><Button/></>`. Left uncounted,
 * two buttons look like one and stay wedged beside the words. So fragments are
 * opened up before anything is counted.
 */
const flattenActions = (node: ReactNode): ReactNode[] =>
  Children.toArray(node).flatMap((child) =>
    isValidElement(child) && child.type === Fragment
      ? flattenActions((child as ReactElement<{ children?: ReactNode }>).props.children)
      : [child]
  );

/**
 * Warns, in development only, about a primary button in a banner.
 *
 * A solid button is the loudest thing on a page and a banner is not the page -
 * put one in a warning and it outranks the Save button the person came for. The
 * rule is easy to forget and impossible to see in a diff, so it is checked.
 */
const useNoPrimaryActions = (flat: readonly ReactNode[]): void => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;

    const offender = flat.some(
      (child) => isValidElement<{ variant?: unknown }>(child) && child.props.variant === 'primary'
    );

    if (offender) {
      console.warn(
        '[Banner] An action is using variant="primary". A banner is not the page - ' +
          'a solid button in one outranks the real primary action of the screen. ' +
          'Use "secondary", "ghost" or "link".'
      );
    }
  }, [flat]);
};

/**
 * Banner - a message that sits in the page and stays there.
 *
 * It is about the thing it sits above, it waits for you, and it can carry as
 * many actions as the situation actually needs.
 *
 * **It is not a Toast**, though they share the six tones and the same palette
 * deliberately. A toast floats over the page, arrives on its own and leaves on
 * a timer, so you may not be looking when it appears and it can never hold the
 * only copy of something important. A banner is in the layout, has no timer,
 * and leaves only when the reason for it has gone. *The one-line test: if you
 * would still need the message after a refresh, it is a banner.*
 *
 * It is announced as a region and read in the order it appears, not as a live
 * region that interrupts - which is the other half of the same difference. The
 * region takes its name from the title, so a banner with no title is not a
 * landmark at all.
 *
 * @example
 * ```tsx
 * <Banner
 *   tone="warning"
 *   title="Your trial ends in 3 days"
 *   description="After that, agents keep read-only access until a plan is chosen."
 *   actions={<Button variant="secondary" size="sm">Choose a plan</Button>}
 *   onDismiss={hide}
 * />
 * ```
 */
export const Banner = ({
  tone = 'neutral',
  placement = 'inline',
  title,
  description,
  icon,
  actions,
  actionPlacement = 'auto',
  onDismiss,
  dismissLabel = 'Dismiss',
  className,
  ...props
}: BannerProps) => {
  const titleId = useId();
  const flat = useMemo(() => flattenActions(actions), [actions]);
  useNoPrimaryActions(flat);

  const hasActions = flat.length > 0;

  // One action sits beside the words; two or more go on their own line. Counted
  // rather than measured, so the same banner always renders the same way.
  const below =
    hasActions && (actionPlacement === 'below' || (actionPlacement === 'auto' && flat.length > 1));

  const beside = hasActions && !below;
  const hasTitle = title !== undefined && title !== null && title !== '';
  const stacked =
    below || (description !== undefined && description !== null && description !== '');

  const renderGlyph = (): ReactNode => {
    if (icon === null) return null;
    return (
      <span className={cn(GLYPH_BOX, ICON_TONE[tone])} data-slot="banner-icon" aria-hidden="true">
        {icon ?? <Icon name={TONE_ICON[tone]} size="sm" />}
      </span>
    );
  };

  return (
    <section
      className={cn(bannerVariants({ tone, placement, stacked }), className)}
      data-tone={tone}
      data-slot="banner"
      // A `section` is only a landmark once it has a name, which is exactly the
      // behaviour wanted here - a titled banner joins the landmark list, an
      // untitled one-liner does not clutter it.
      {...(hasTitle ? { 'aria-labelledby': titleId } : {})}
      {...props}
    >
      {renderGlyph()}

      {/* min-w-0 lets a long word wrap instead of forcing the banner wider */}
      <div className="mdt-min-w-0 mdt-flex-1 mdt-text-feedback-text">
        {hasTitle ? (
          <p
            id={titleId}
            className="mdt-font-semibold mdt-text-feedback-title"
            data-slot="banner-title"
          >
            {title}
          </p>
        ) : null}

        {description !== undefined && description !== null && description !== '' ? (
          <p className={cn(hasTitle && 'mdt-mt-0.5')} data-slot="banner-description">
            {description}
          </p>
        ) : null}

        {below ? (
          <div
            className="mdt-mt-2.5 mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-2"
            data-slot="banner-actions"
          >
            {actions}
          </div>
        ) : null}
      </div>

      {beside || onDismiss ? (
        <div
          className={cn(
            'mdt-flex mdt-shrink-0 mdt-items-center mdt-gap-2',
            // On one line the banner grows to hold whatever is in here, so the
            // slot takes its natural height and everything centres together.
            //
            // Once the text stacks, the slot is pinned to one line tall and its
            // contents are allowed to overflow it evenly - which centres a 32px
            // button on a 21px first line without anyone having to know either
            // number. Nothing is clipped; the box is an alignment reference,
            // not a container.
            stacked && 'mdt-h-[1.5em]'
          )}
          data-slot="banner-end"
        >
          {beside ? (
            <div className="mdt-flex mdt-items-center mdt-gap-2" data-slot="banner-actions">
              {actions}
            </div>
          ) : null}

          {onDismiss ? (
            <button
              type="button"
              onClick={onDismiss}
              aria-label={dismissLabel}
              data-slot="banner-dismiss"
              // Deliberately outside the tone system, exactly as Toast's is. Only
              // the icon and the border carry the tone, and a coloured cross
              // would compete with the glyph for the same job.
              className={cn(
                'mdt-flex mdt-h-7 mdt-w-7 mdt-shrink-0 mdt-items-center mdt-justify-center',
                'mdt-rounded-md mdt-transition-colors',
                'mdt-text-feedback-text/70 hover:mdt-bg-feedback-text/10 hover:mdt-text-feedback-text',
                'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring'
              )}
            >
              <Icon name="x" size="sm" aria-hidden />
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
};

Banner.displayName = 'Banner';
