import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type { TagPillProps } from './TagPill.types';

/**
 * TagPill variants using Class Variance Authority (CVA)
 */
export const tagPillVariants = cva(
  // Base styles
  [
    'mdt-inline-flex mdt-items-center mdt-justify-center',
    'mdt-rounded mdt-px-2 mdt-py-0.5',
    'mdt-text-xs mdt-font-normal',
    'mdt-whitespace-nowrap',
    'mdt-border',
  ],
  {
    variants: {
      variant: {
        default: 'mdt-border-border mdt-bg-muted/5 mdt-text-muted-foreground',
        yellow:
          'mdt-border-yellow-300/50 mdt-bg-yellow-400/10 mdt-text-yellow-700 dark:mdt-border-yellow-700/50 dark:mdt-bg-yellow-400/10 dark:mdt-text-yellow-400',
        blue: 'mdt-border-blue-300/50 mdt-bg-blue-400/10 mdt-text-blue-700 dark:mdt-border-blue-700/50 dark:mdt-bg-blue-400/10 dark:mdt-text-blue-400',
        green:
          'mdt-border-green-300/50 mdt-bg-green-400/10 mdt-text-green-700 dark:mdt-border-green-700/50 dark:mdt-bg-green-400/10 dark:mdt-text-green-400',
        red: 'mdt-border-red-300/50 mdt-bg-red-400/10 mdt-text-red-700 dark:mdt-border-red-700/50 dark:mdt-bg-red-400/10 dark:mdt-text-red-400',
        purple:
          'mdt-border-purple-300/50 mdt-bg-purple-400/10 mdt-text-purple-700 dark:mdt-border-purple-700/50 dark:mdt-bg-purple-400/10 dark:mdt-text-purple-400',
        orange:
          'mdt-border-orange-300/50 mdt-bg-orange-400/10 mdt-text-orange-700 dark:mdt-border-orange-700/50 dark:mdt-bg-orange-400/10 dark:mdt-text-orange-400',
        pink: 'mdt-border-pink-300/50 mdt-bg-pink-400/10 mdt-text-pink-700 dark:mdt-border-pink-700/50 dark:mdt-bg-pink-400/10 dark:mdt-text-pink-400',
        teal: 'mdt-border-teal-300/50 mdt-bg-teal-400/10 mdt-text-teal-700 dark:mdt-border-teal-700/50 dark:mdt-bg-teal-400/10 dark:mdt-text-teal-400',
        cyan: 'mdt-border-cyan-300/50 mdt-bg-cyan-400/10 mdt-text-cyan-700 dark:mdt-border-cyan-700/50 dark:mdt-bg-cyan-400/10 dark:mdt-text-cyan-400',
      },
      size: {
        sm: 'mdt-px-1.5 mdt-py-0.5 mdt-text-[10px]',
        md: 'mdt-px-2 mdt-py-0.5 mdt-text-xs',
        lg: 'mdt-px-2.5 mdt-py-1 mdt-text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * TagPill component for displaying colored tag badges.
 *
 * @example
 * ```tsx
 * <TagPill variant="blue">Components</TagPill>
 * <TagPill variant="green">Network</TagPill>
 * <TagPill variant="yellow">+2</TagPill>
 *
 * // With icon
 * <TagPill variant="blue" icon={<SparklesIcon />}>
 *   Internet
 * </TagPill>
 *
 * // Closable
 * <TagPill variant="green" onClose={() => console.log('closed')}>
 *   User Management
 * </TagPill>
 * ```
 */
const TagPill = forwardRef<HTMLSpanElement, TagPillProps>(
  ({ className, variant, size, children, icon, onClose, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          tagPillVariants({ variant, size }),
          (icon ?? onClose) && 'mdt-gap-1.5',
          className
        )}
        {...props}
      >
        {icon && (
          <span
            className="-mdt-ml-0.5 mdt-inline-flex mdt-shrink-0 mdt-items-center"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <span className="mdt-inline-flex mdt-items-center">{children}</span>
        {onClose && (
          <>
            <span
              className="-mdt-my-0.5 mdt-inline-block mdt-w-px mdt-self-stretch mdt-bg-foreground mdt-opacity-15"
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={onClose}
              className={cn(
                'mdt-inline-flex mdt-items-center mdt-justify-center',
                '-mdt-mr-0.5 mdt-shrink-0',
                'mdt-transition-opacity hover:mdt-opacity-70',
                'focus:mdt-outline-none focus:mdt-ring-1 focus:mdt-ring-offset-0',
                'mdt-text-muted-foreground'
              )}
              aria-label="Remove tag"
            >
              {/* xs is the smallest step on the scale. Lucide's cross fills half
                  its box against the six-tenths the hand-drawn one used, so at 12px
                  the visible mark stays the 6px it always was. */}
              <Icon name="x" size="xs" aria-hidden />
            </button>
          </>
        )}
      </span>
    );
  }
);

TagPill.displayName = 'TagPill';

export { TagPill };
