import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import { FEEDBACK_ICON, FEEDBACK_ICON_COLOUR, FEEDBACK_SURFACE } from '@/utils/feedback-tones';
import { Icon } from '../Icon';
import type { CalloutProps, CalloutSize, CalloutTone } from './Callout.types';

/**
 * The callout surface.
 *
 * The tones are `Toast`'s, from the same table, because they are the same six
 * colours. Everything else differs, and the differences are the component:
 *
 * - **No shadow.** A toast floats over the page and a shadow says so. A callout
 *   is in the flow, and a shadow on something inline reads as a card that has
 *   come loose.
 * - **Roomier.** A toast is read in passing; a callout is read.
 */
export const calloutVariants = cva(
  'mdt-flex mdt-w-full mdt-items-start mdt-rounded-lg mdt-border',
  {
    variants: {
      tone: FEEDBACK_SURFACE,
      size: {
        sm: 'mdt-gap-2.5 mdt-px-3 mdt-py-2.5 mdt-text-xs mdt-leading-normal',
        md: 'mdt-gap-3 mdt-px-4 mdt-py-3 mdt-text-sm mdt-leading-normal',
      },
      variant: {
        tinted: '',
        // Keeps the edge, drops the fill. The class merger takes the later one,
        // so this has to come after the tone - see the `compoundVariants` note in
        // Badge.tsx for the same trick.
        outline: 'mdt-bg-transparent dark:mdt-bg-transparent',
      },
    },
    defaultVariants: { tone: 'neutral', size: 'md', variant: 'tinted' },
  }
);

/**
 * The glyph, a step under the text it sits beside.
 *
 * 14 against 14px body copy, 12 against 12. At 16 the icon was visibly the
 * largest thing in the callout and pulled the eye before the writing did -
 * which is backwards for something whose whole job is to be read.
 */
const ICON_SIZE: Record<CalloutSize, string> = {
  sm: 'mdt-h-3 mdt-w-3',
  md: 'mdt-h-3.5 mdt-w-3.5',
};

/**
 * The box the glyph is centred in: one line of the text beside it.
 *
 * Centring in the line rather than nudging down from the top is what makes the
 * icon sit on the title instead of near it. `mt-0.5` was a fudge that happened
 * to look close on one size and was measurably off on the other, and it went
 * wrong again the moment a title made the first line taller than the body.
 *
 * The close control uses the same box, so the two land on the same line.
 */
const LINE_BOX: Record<CalloutSize, string> = {
  sm: 'mdt-h-4',
  md: 'mdt-h-5',
};

const TITLE_SIZE: Record<CalloutSize, string> = {
  sm: 'mdt-text-xs',
  md: 'mdt-text-sm',
};

/**
 * Callout - a tinted block that says something about the content around it.
 *
 * **It is already there when you arrive.** That is the whole difference from
 * `Toast`, and it decides everything else: a callout does not animate in, does
 * not time out, is not announced as it appears, and is not dismissible unless
 * you ask. A toast interrupts you; a callout is part of the page.
 *
 * Reach for it for the consequences of a destructive action, a summary of what
 * is about to happen, a limit somebody should know about before they fill in a
 * form, or a group of settings that belong together - `tone="neutral"` with
 * `icon={false}` is a plain inset panel, and that is a callout too.
 *
 * **Only the icon and the border carry the tone.** The body text stays one calm
 * colour in all six. Six tones that differ by a tint, an edge and a glyph read
 * as one family; six tones of coloured text read as six problems. The rule and
 * the tokens are `Toast`'s, shared from `@/utils/feedback-tones` so a seventh
 * tone is one edit rather than two that drift.
 *
 * **It takes children, not two strings.** A toast takes a title and a
 * description because it is read in passing. A callout holds whatever the page
 * holds - a list of what is about to be deleted, a definition list, a pair of
 * controls.
 *
 * **On being announced:** a callout is read in document order like any other
 * content, so it needs no live region. If one *appears* in response to
 * something - a validation summary after a failed submit - the caller adds
 * `role="alert"`, because only the caller knows it is new.
 *
 * @example
 * ```tsx
 * <Callout tone="danger" title="This cannot be undone">
 *   Deleting this workspace removes 3 members and 12 files.
 * </Callout>
 *
 * <Callout tone="neutral" icon={false} title="Access limits">
 *   <dl>…</dl>
 * </Callout>
 * ```
 */
const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  (
    {
      className,
      tone = 'neutral',
      size = 'md',
      variant = 'tinted',
      title,
      children,
      icon,
      actions,
      onDismiss,
      dismissLabel = 'Dismiss',
      toneLabel,
      ...props
    },
    ref
  ) => {
    // A line-tall box with the glyph centred in it. Because the row is
    // `items-start`, that box sits on the first line and stays there when the
    // text wraps - beside the title, never drifting down the paragraph.
    const glyphClass = cn(
      'mdt-flex mdt-shrink-0 mdt-items-center mdt-justify-center',
      LINE_BOX[size],
      FEEDBACK_ICON_COLOUR[tone]
    );

    return (
      <div
        ref={ref}
        className={cn(calloutVariants({ tone, size, variant }), className)}
        data-tone={tone}
        {...props}
      >
        {icon === false ? null : (
          <span className={glyphClass}>
            {icon ?? <Icon name={FEEDBACK_ICON[tone]} className={ICON_SIZE[size]} aria-hidden />}
          </span>
        )}

        {/* min-w-0 lets a long word wrap instead of forcing the callout wider */}
        <div className="mdt-min-w-0 mdt-flex-1 mdt-text-feedback-text">
          {toneLabel !== undefined && <span className="mdt-sr-only">{toneLabel}: </span>}

          {title !== undefined && title !== '' ? (
            <span
              className={cn(
                'mdt-mb-0.5 mdt-block mdt-font-semibold mdt-text-feedback-title',
                TITLE_SIZE[size]
              )}
            >
              {title}
            </span>
          ) : null}

          {children}

          {/*
            Below the reading, never beside it. A callout's action is what you
            do after reading it, and putting it on the right invites pressing
            it first.
          */}
          {actions ? (
            <div className="mdt-mt-3 mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-2">
              {actions}
            </div>
          ) : null}
        </div>

        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            aria-label={dismissLabel}
            // Outside the tone system, deliberately: only the icon and the
            // border carry the tone, and a coloured close would compete with
            // the glyph for the same job.
            className={cn(
              // The same line-tall box as the tone glyph, so the two sit on the
              // title together rather than one on it and one near it.
              'mdt-flex mdt-shrink-0 mdt-items-center mdt-justify-center',
              LINE_BOX[size],
              'mdt-w-5 mdt-rounded-sm',
              'mdt-text-feedback-text/70 hover:mdt-text-feedback-text',
              'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring'
            )}
          >
            <Icon name="x" className={ICON_SIZE[size]} aria-hidden />
          </button>
        ) : null}
      </div>
    );
  }
);
Callout.displayName = 'Callout';

export { Callout };
export type { CalloutTone };
