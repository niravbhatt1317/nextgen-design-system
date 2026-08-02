import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { cn } from '@/utils';
import { FEEDBACK_ICON, FEEDBACK_ICON_COLOUR, FEEDBACK_SURFACE } from '@/utils/feedback-tones';
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
    'mdt-flex mdt-w-full mdt-rounded-lg mdt-border',
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
    if (icon !== undefined) return <span className={glyphClass}>{icon}</span>;
    if (loading) return <Icon name="loader-2" className={cn(glyphClass, 'mdt-animate-spin')} />;
    return <Icon name={FEEDBACK_ICON[tone]} className={glyphClass} />;
  };

  return (
    <output
      className={cn(toastVariants({ tone, size }), className)}
      data-tone={tone}
      data-testid="toast"
    >
      {renderIcon()}

      {/* min-w-0 lets long words wrap instead of forcing the toast wider */}
      <div className="mdt-min-w-0 mdt-flex-1 mdt-text-feedback-text">
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
          // icon and the border carry the tone, and a coloured close would
          // compete with the icon for the same job.
          className={cn(
            'mdt-mt-0.5 mdt-shrink-0 mdt-rounded-sm mdt-p-0.5',
            // 70%, not 60. Held back so it does not compete with the tone
            // glyph, but a dismiss has to be findable - 60% measured at 3.8
            // against the palest tint, 70% lands at 5.1.
            'mdt-text-feedback-text/70 hover:mdt-text-feedback-text',
            'hover:mdt-bg-feedback-text/10',
            'mdt-transition-colors',
            'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring',
            ICON_SIZE[size],
            'mdt-box-content'
          )}
          data-testid="toast-close"
        >
          <Icon name="x" className={ICON_SIZE[size]} />
        </button>
      ) : null}
    </output>
  );
};

ToastBody.displayName = 'ToastBody';
