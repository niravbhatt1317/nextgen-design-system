import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { cn } from '@/utils';
import {
  FEEDBACK_ICON_TABLER,
  FEEDBACK_ICON_COLOUR,
  FEEDBACK_MARK_TONES,
  FEEDBACK_SURFACE,
} from '@/utils/feedback-tones';
import { AiMark } from '../AiMark';
import { Icon } from '../Icon';
import type { ToastBodyProps, ToastSize } from './Toast.types';

/**
 * The toast surface, taken from Org Mgmt's banner.
 *
 * Om's own note on that component is the whole design: *"Body text stays
 * ink-700 in every tone - only icon and border carry the tone. Calm by
 * design."* Six tones that differ only in a tint, an edge and a glyph read as
 * one family; six tones of coloured text read as six problems.
 *
 * Colours are Om's exact values, held as their own `feedback-*` tokens rather
 * than folded into the general palette - his greens and ambers are different
 * hues from ours, and rounding them to fit would have looked like a mistake.
 */
export const toastVariants = cva(
  [
    // No border (Pranjal, 2026-09-29: "we should remove borders from every toast"): the tint and the shadow carry the
    // shape; the tone's edge colour stays in FEEDBACK_SURFACE for Callout, and draws nothing here without a width.
    // As wide as its content, never wider (Pranjal, 2026-10-04: "it should be almost same as text and other elements no extra
    // space. only 20 px between cross and text"); the toaster still caps it at the toast width.
    'mdt-flex mdt-w-fit mdt-max-w-full mdt-rounded-lg',
    // Top-aligned, with the icon nudged down by half the gap between the line
    // box and the glyph. On a single line that nudge lands the icon exactly on
    // the centre line; the moment the text wraps, the same rule leaves it
    // beside the first line. One rule, both behaviours - which is how Om's
    // banner does it.
    'mdt-items-start',
    'mdt-shadow-lg',
  ],
  {
    variants: {
      tone: FEEDBACK_SURFACE,
      /**
       * `sm` is Om's banner measured exactly - 12px text, 10px/12px padding.
       * `md` runs a step larger for a notification read in passing rather than
       * inline in a form.
       */
      size: {
        sm: 'mdt-gap-2.5 mdt-px-3 mdt-py-2.5 mdt-text-xs mdt-leading-normal',
        md: 'mdt-gap-3 mdt-px-3.5 mdt-py-3 mdt-text-sm mdt-leading-normal',
      },
    },
    defaultVariants: { tone: 'neutral', size: 'sm' },
  }
);

const ICON_SIZE: Record<ToastSize, string> = {
  sm: 'mdt-h-3.5 mdt-w-3.5',
  md: 'mdt-h-4 mdt-w-4',
};

const TITLE_SIZE: Record<ToastSize, string> = {
  sm: 'mdt-text-xs',
  md: 'mdt-text-sm',
};

/**
 * ToastBody - one toast, rendered as Om's banner.
 *
 * Every toast carries a close control. `closable={false}` takes it away for the
 * rare toast that must be acknowledged some other way.
 */
export const ToastBody = ({
  tone = 'neutral',
  size = 'sm',
  title,
  description,
  icon,
  loading = false,
  closable = true,
  action,
  onClose,
  className,
}: ToastBodyProps) => {
  const glyphClass = cn(ICON_SIZE[size], 'mdt-mt-0.5 mdt-shrink-0', FEEDBACK_ICON_COLOUR[tone]);

  const renderIcon = (): ReactNode => {
    // A custom icon is fitted to the tone glyph's own box (Pranjal, 2026-09-29: the Icons examples sat bigger than the
    // tone glyphs and pushed the text off its line): any svg fills the box, an emoji is set at the box's size.
    if (icon !== undefined && icon !== null)
      return (
        <span
          className={cn(
            glyphClass,
            'mdt-inline-flex mdt-items-center mdt-justify-center mdt-leading-none [&>svg]:mdt-h-full [&>svg]:mdt-w-full',
            size === 'sm' ? 'mdt-text-[14px]' : 'mdt-text-[16px]'
          )}
          aria-hidden="true"
        >
          {icon}
        </span>
      );
    if (icon === null) return null;
    if (loading) return <Icon name="tabler-loader-2" className={cn(glyphClass, 'mdt-animate-spin')} />;
    // The `ai` tone is a brand rather than a status, and the gradient is what
    // says so - see FEEDBACK_MARK_TONES. Line, because every other tone glyph
    // in this row is an outline (Tabler's, since 2026-09-29).
    if (FEEDBACK_MARK_TONES.has(tone)) return <AiMark appearance="line" className={glyphClass} />;
    return <Icon name={FEEDBACK_ICON_TABLER[tone]} className={glyphClass} />;
  };

  return (
    <output
      className={cn(toastVariants({ tone, size }), className)}
      data-tone={tone}
      data-testid="toast"
    >
      {renderIcon()}

      {/* min-w-0 lets long words wrap instead of forcing the toast wider */}
      <div className="mdt-min-w-0 mdt-text-feedback-text">
        {title !== undefined && title !== '' ? (
          <span
            className={cn(
              'mdt-mb-0.5 mdt-block mdt-font-semibold mdt-text-feedback-title',
              TITLE_SIZE[size]
            )}
            data-testid="toast-title"
          >
            {title}
          </span>
        ) : null}

        {description !== undefined && description !== '' ? (
          <span className="mdt-block" data-testid="toast-description">
            {description}
          </span>
        ) : null}

        {action ? (
          <button
            type="button"
            onClick={action.onClick}
            className={cn(
              'mdt-mt-2 mdt-rounded-sm mdt-font-semibold mdt-underline-offset-2',
              'hover:mdt-underline',
              'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring',
              FEEDBACK_ICON_COLOUR[tone]
            )}
            data-testid="toast-action"
          >
            {action.label}
          </button>
        ) : null}
      </div>

      {closable ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          // Deliberately outside the tone system. Om's rule is that only the
          // tint and the icon carry the tone, and a coloured close would
          // compete with the icon for the same job.
          className={cn(
            // No top nudge (Pranjal, 2026-09-29, the ✕ sat 2px under the text): the 2px well around the glyph already
            // makes the box one line tall, so its centre is the first line's centre.
            // The glyph is centred IN the box, not set on a text line: as an inline svg it sat on the button's baseline
            // and landed 4px under the box's centre (Pranjal, 2026-09-29: "even now all elements are not aligning").
            'mdt-inline-flex mdt-items-center mdt-justify-center',
            'mdt-shrink-0 mdt-rounded-sm mdt-p-0.5',
            // 70%, not 60. Held back so it does not compete with the tone
            // glyph, but a dismiss has to be findable - 60% measured at 3.8
            // against the palest tint, 70% lands at 5.1.
            'mdt-text-feedback-text/70 hover:mdt-text-feedback-text',
            'hover:mdt-bg-feedback-text/10',
            'mdt-transition-colors',
            'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring',
            ICON_SIZE[size],
            // 20px from the text to the close: the row gap plus this (sm 10 + 10, md 12 + 8)
            size === 'sm' ? 'mdt-ml-2.5' : 'mdt-ml-2',
            'mdt-box-content'
          )}
          data-testid="toast-close"
        >
          <Icon name="tabler-x" className={ICON_SIZE[size]} />
        </button>
      ) : null}
    </output>
  );
};

ToastBody.displayName = 'ToastBody';
