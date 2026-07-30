import type { ReactNode } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type { ToastPromoProps } from './Toast.types';

/**
 * The promotional toast - an announcement rather than a report.
 *
 * The other six tones say what just happened. This one says what is new, so it
 * is a different shape: room for a picture, a paragraph rather than a line, and
 * a way to act on it.
 *
 * It deliberately does not take a tone. An announcement is not good news or bad
 * news, and tinting it would make it argue with the six that are.
 *
 * Everything here is our own tokens - the card surface, the border, the radius
 * and the type all come from the same places a Card or a Dialog would use, so
 * it reads as part of this system rather than a borrowed one.
 */
export const ToastPromo = ({
  title,
  description,
  media,
  action,
  closable = true,
  onClose,
  className,
}: ToastPromoProps) => (
  <output
    className={cn(
      'mdt-flex mdt-w-full mdt-flex-col mdt-gap-3',
      'mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-3',
      'mdt-shadow-lg',
      className
    )}
    data-testid="toast-promo"
  >
    <div className="mdt-flex mdt-items-start mdt-gap-2">
      <Icon
        name="megaphone"
        size="sm"
        aria-hidden
        className="mdt-mt-0.5 mdt-shrink-0 mdt-text-foreground"
      />

      <span
        className="mdt-min-w-0 mdt-flex-1 mdt-text-sm mdt-font-semibold mdt-text-foreground"
        data-testid="toast-promo-title"
      >
        {title}
      </span>

      {closable ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className={cn(
            'mdt-mt-0.5 mdt-shrink-0 mdt-rounded-sm mdt-p-0.5',
            'mdt-text-muted-foreground hover:mdt-bg-muted hover:mdt-text-foreground',
            'mdt-transition-colors',
            'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring'
          )}
          data-testid="toast-promo-close"
        >
          <Icon name="x" size="sm" />
        </button>
      ) : null}
    </div>

    {/* The picture is optional. A promotional toast with nothing to show is
        still a promotional toast, and the layout should not collapse without
        it. `[&>*]` sizes whatever the caller passed - an img, a video, a
        gradient - rather than demanding one particular element. */}
    {media !== undefined && media !== null ? (
      <div
        className="mdt-h-24 mdt-w-full mdt-overflow-hidden mdt-rounded-md mdt-bg-muted [&>*]:mdt-h-full [&>*]:mdt-w-full [&>*]:mdt-object-cover"
        data-testid="toast-promo-media"
      >
        {media}
      </div>
    ) : null}

    {description !== undefined && description !== '' ? (
      <span
        className="mdt-text-xs mdt-leading-relaxed mdt-text-muted-foreground"
        data-testid="toast-promo-description"
      >
        {description}
      </span>
    ) : null}

    {action ? (
      <div>
        <button
          type="button"
          onClick={action.onClick}
          className={cn(
            'mdt-inline-flex mdt-h-8 mdt-items-center mdt-rounded-md mdt-px-3',
            'mdt-border mdt-border-input mdt-bg-background',
            'mdt-text-xs mdt-font-medium mdt-text-foreground',
            'hover:mdt-bg-muted',
            'mdt-transition-colors',
            'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring'
          )}
          data-testid="toast-promo-action"
        >
          {action.label}
        </button>
      </div>
    ) : null}
  </output>
);

ToastPromo.displayName = 'ToastPromo';

/** Re-exported so a story can build a placeholder without reaching outside. */
export type { ReactNode };
