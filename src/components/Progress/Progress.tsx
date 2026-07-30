import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { ProgressProps, ProgressTone } from './Progress.types';

const PERCENT = 100;
const DEFAULT_MAX = 100;

/**
 * Progress styles.
 *
 * Org Mgmt and Agent Fleet both built this, and both audits call their version
 * "the cleanest atom in the set - zero drift". Two teams arrived at the same
 * thing independently and neither found a fault in it, so this follows it
 * closely: a tinted track, a value fill, and optional markers on the track.
 */
export const progressVariants = cva('mdt-w-full mdt-overflow-hidden mdt-rounded-full mdt-bg-muted', {
  variants: {
    size: {
      sm: 'mdt-h-1',
      md: 'mdt-h-1.5',
      lg: 'mdt-h-2',
    },
  },
  defaultVariants: { size: 'md' },
});

const FILL_TONE: Record<ProgressTone, string> = {
  default: 'mdt-bg-info',
  success: 'mdt-bg-success',
  warning: 'mdt-bg-warning',
  danger: 'mdt-bg-destructive',
};

const clamp = (n: number, min: number, max: number): number => Math.min(Math.max(n, min), max);

/**
 * Progress - how far along something is.
 *
 * @example
 * ```tsx
 * <Progress value={62} aria-label="Storage used" />
 * <Progress value={91} tone="danger" baseline={75} aria-label="Seats used" />
 * ```
 */
const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    { value, max = DEFAULT_MAX, tone = 'default', size = 'md', baseline, floor, className, ...rest },
    ref
  ) => {
    const safeMax = max > 0 ? max : DEFAULT_MAX;
    const clamped = clamp(value, 0, safeMax);
    const percent = (clamped / safeMax) * PERCENT;

    return (
      <div
        ref={ref}
        // A native progressbar role, so assistive tech reads the value rather
        // than announcing a nameless box.
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        className={cn('mdt-relative', className)}
        {...rest}
      >
        <div className={progressVariants({ size })}>
          <div
            className={cn('mdt-h-full mdt-rounded-full mdt-transition-all', FILL_TONE[tone])}
            style={{ width: `${percent.toFixed(3)}%` }}
            data-testid="progress-fill"
          />
        </div>

        {baseline !== undefined ? (
          <span
            className="mdt-absolute mdt-top-1/2 mdt-h-3 mdt-w-0.5 mdt--translate-y-1/2 mdt-rounded-full mdt-bg-purple-70"
            style={{ left: `${clamp(baseline, 0, PERCENT).toFixed(3)}%` }}
            aria-hidden="true"
            data-testid="progress-baseline"
          />
        ) : null}

        {floor !== undefined ? (
          <span
            className="mdt-absolute mdt-top-1/2 mdt-h-2 mdt-w-px mdt--translate-y-1/2 mdt-bg-muted-foreground"
            style={{ left: `${clamp(floor, 0, PERCENT).toFixed(3)}%` }}
            aria-hidden="true"
            data-testid="progress-floor"
          />
        ) : null}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };
