import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { SeparatorProps } from './Separator.types';

/**
 * Separator variants using Class Variance Authority (CVA)
 */
export const separatorVariants = cva(['mdt-shrink-0 mdt-bg-border'], {
  variants: {
    /**
     * Orientation of the separator
     */
    orientation: {
      horizontal: 'mdt-h-px mdt-w-full',
      vertical: 'mdt-h-full mdt-w-px',
    },
    /**
     * Style variant of the separator
     */
    variant: {
      solid: '',
      dashed: 'mdt-border-dashed',
      dotted: 'mdt-border-dotted',
    },
    /**
     * Thickness of the separator
     */
    thickness: {
      thin: '',
      medium: '',
      thick: '',
    },
    /**
     * Spacing around the separator
     */
    spacing: {
      none: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
  },
  compoundVariants: [
    // Horizontal thickness variants
    {
      orientation: 'horizontal',
      thickness: 'thin',
      class: 'mdt-h-px',
    },
    {
      orientation: 'horizontal',
      thickness: 'medium',
      class: 'mdt-h-0.5',
    },
    {
      orientation: 'horizontal',
      thickness: 'thick',
      class: 'mdt-h-1',
    },
    // Vertical thickness variants
    {
      orientation: 'vertical',
      thickness: 'thin',
      class: 'mdt-w-px',
    },
    {
      orientation: 'vertical',
      thickness: 'medium',
      class: 'mdt-w-0.5',
    },
    {
      orientation: 'vertical',
      thickness: 'thick',
      class: 'mdt-w-1',
    },
    // Horizontal spacing variants
    {
      orientation: 'horizontal',
      spacing: 'sm',
      class: 'mdt-my-2',
    },
    {
      orientation: 'horizontal',
      spacing: 'md',
      class: 'mdt-my-4',
    },
    {
      orientation: 'horizontal',
      spacing: 'lg',
      class: 'mdt-my-6',
    },
    {
      orientation: 'horizontal',
      spacing: 'xl',
      class: 'mdt-my-8',
    },
    // Vertical spacing variants
    {
      orientation: 'vertical',
      spacing: 'sm',
      class: 'mdt-mx-2',
    },
    {
      orientation: 'vertical',
      spacing: 'md',
      class: 'mdt-mx-4',
    },
    {
      orientation: 'vertical',
      spacing: 'lg',
      class: 'mdt-mx-6',
    },
    {
      orientation: 'vertical',
      spacing: 'xl',
      class: 'mdt-mx-8',
    },
    // Dashed border styles
    {
      variant: 'dashed',
      orientation: 'horizontal',
      class: 'mdt-border-t mdt-border-border mdt-bg-transparent',
    },
    {
      variant: 'dashed',
      orientation: 'vertical',
      class: 'mdt-border-l mdt-border-border mdt-bg-transparent',
    },
    // Dotted border styles
    {
      variant: 'dotted',
      orientation: 'horizontal',
      class: 'mdt-border-t mdt-border-border mdt-bg-transparent',
    },
    {
      variant: 'dotted',
      orientation: 'vertical',
      class: 'mdt-border-l mdt-border-border mdt-bg-transparent',
    },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'solid',
    thickness: 'thin',
    spacing: 'none',
  },
});

/**
 * Separator component for visually dividing content.
 *
 * @example
 * ```tsx
 * // Horizontal separator
 * <Separator />
 *
 * // Vertical separator
 * <Separator orientation="vertical" />
 *
 * // Dashed separator with spacing
 * <Separator variant="dashed" spacing="md" />
 *
 * // Thick separator
 * <Separator thickness="thick" />
 *
 * // With label (centered)
 * <Separator label="OR" />
 *
 * // With label (left aligned)
 * <Separator label="Continue with" labelPosition="left" />
 *
 * // With custom label styling
 * <Separator label="OR" labelClassName="font-bold text-primary" />
 * ```
 */
const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = 'horizontal',
      variant = 'solid',
      thickness = 'thin',
      spacing = 'none',
      decorative = true,
      label,
      labelPosition = 'center',
      labelClassName,
      ...props
    },
    ref
  ) => {
    // If label is provided, render as flex container with label
    if (label && orientation === 'horizontal') {
      let justifyClass: string;
      if (labelPosition === 'left') {
        justifyClass = 'mdt-justify-start';
      } else if (labelPosition === 'right') {
        justifyClass = 'mdt-justify-end';
      } else {
        justifyClass = 'mdt-justify-center';
      }

      return (
        <div
          ref={ref}
          role="none"
          className={cn('mdt-relative mdt-flex mdt-items-center', justifyClass, className)}
          {...props}
        >
          {labelPosition !== 'left' && (
            <div className="mdt-flex-1">
              <div
                className={cn(
                  separatorVariants({ orientation, variant, thickness, spacing: 'none' })
                )}
              />
            </div>
          )}
          <span
            className={cn(
              'mdt-shrink-0 mdt-px-2 mdt-text-sm mdt-text-muted-foreground',
              labelClassName
            )}
          >
            {label}
          </span>
          {labelPosition !== 'right' && (
            <div className="mdt-flex-1">
              <div
                className={cn(
                  separatorVariants({ orientation, variant, thickness, spacing: 'none' })
                )}
              />
            </div>
          )}
        </div>
      );
    }

    // If label with vertical orientation, render as flex container with label between separators
    if (label && orientation === 'vertical') {
      return (
        <div
          ref={ref}
          role="none"
          className={cn('mdt-flex mdt-h-full mdt-items-center', className)}
          {...props}
        >
          <div className="mdt-flex mdt-h-full mdt-flex-col mdt-items-center">
            {labelPosition !== 'left' && (
              <div className="mdt-flex mdt-flex-1 mdt-items-center">
                <div
                  className={cn(
                    separatorVariants({ orientation, variant, thickness, spacing: 'none' })
                  )}
                />
              </div>
            )}
            <span
              className={cn(
                'mdt-shrink-0 mdt-whitespace-nowrap mdt-px-3 mdt-py-2 mdt-text-sm mdt-text-muted-foreground',
                labelClassName
              )}
            >
              {label}
            </span>
            {labelPosition !== 'right' && (
              <div className="mdt-flex mdt-flex-1 mdt-items-center">
                <div
                  className={cn(
                    separatorVariants({ orientation, variant, thickness, spacing: 'none' })
                  )}
                />
              </div>
            )}
          </div>
        </div>
      );
    }

    // Default separator without label
    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={decorative ? undefined : (orientation ?? undefined)}
        className={cn(separatorVariants({ orientation, variant, thickness, spacing }), className)}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

export { Separator };
