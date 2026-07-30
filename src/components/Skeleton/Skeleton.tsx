import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { SkeletonProps } from './Skeleton.types';

/**
 * Skeleton variants using CVA
 */
export const skeletonVariants = cva(['mdt-animate-pulse mdt-rounded-md mdt-bg-muted'], {
  variants: {
    variant: {
      default: 'mdt-bg-muted',
      lighter: 'mdt-bg-muted/50',
      darker: 'mdt-bg-muted-foreground/20',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

/**
 * Skeleton component for loading states.
 *
 * @example
 * ```tsx
 * <Skeleton className="mdt-h-12 mdt-w-12" />
 * ```
 */
const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return <div ref={ref} className={cn(skeletonVariants({ variant }), className)} {...props} />;
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
