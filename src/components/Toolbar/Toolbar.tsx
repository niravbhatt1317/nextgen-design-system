import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { ToolbarProps } from './Toolbar.types';

/**
 * Toolbar variants using Class Variance Authority (CVA)
 */
export const toolbarVariants = cva(
  ['mdt-flex mdt-items-center mdt-gap-2', 'mdt-p-3', 'mdt-bg-background'],
  {
    variants: {
      variant: {
        default: '',
        compact: 'mdt-p-2',
        spacious: 'mdt-p-4',
      },
      border: {
        true: 'mdt-border-b mdt-border-border',
        false: '',
      },
      noPaddingLeft: {
        true: 'mdt-pl-0',
        false: '',
      },
      noPaddingRight: {
        true: 'mdt-pr-0',
        false: '',
      },
      noPaddingTop: {
        true: 'mdt-pt-0',
        false: '',
      },
      noPaddingBottom: {
        true: 'mdt-pb-0',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      border: true,
      noPaddingLeft: false,
      noPaddingRight: false,
      noPaddingTop: false,
      noPaddingBottom: false,
    },
  }
);

/**
 * Toolbar component for displaying search, filters, and action buttons.
 *
 * @example
 * ```tsx
 * <Toolbar>
 *   <ToolbarSection>
 *     <ToolbarSearch placeholder="Search..." />
 *   </ToolbarSection>
 *   <ToolbarSection>
 *     <ToolbarButton>Filters</ToolbarButton>
 *     <ToolbarButton>New</ToolbarButton>
 *   </ToolbarSection>
 * </Toolbar>
 * ```
 */
const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  (
    {
      className,
      variant,
      border,
      noPaddingLeft,
      noPaddingRight,
      noPaddingTop,
      noPaddingBottom,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          toolbarVariants({
            variant,
            border,
            noPaddingLeft,
            noPaddingRight,
            noPaddingTop,
            noPaddingBottom,
          }),
          className
        )}
        role="toolbar"
        {...props}
      >
        {children}
      </div>
    );
  }
);

Toolbar.displayName = 'Toolbar';

/**
 * ToolbarSection component for grouping toolbar items.
 *
 * @example
 * ```tsx
 * <ToolbarSection>
 *   <button>Action 1</button>
 *   <button>Action 2</button>
 * </ToolbarSection>
 * ```
 */
const ToolbarSection = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('mdt-flex mdt-items-center mdt-gap-2', className)} {...props}>
        {children}
      </div>
    );
  }
);

ToolbarSection.displayName = 'ToolbarSection';

/**
 * ToolbarSpacer component for adding flexible space between toolbar sections.
 *
 * @example
 * ```tsx
 * <Toolbar>
 *   <ToolbarSection>Left content</ToolbarSection>
 *   <ToolbarSpacer />
 *   <ToolbarSection>Right content</ToolbarSection>
 * </Toolbar>
 * ```
 */
const ToolbarSpacer = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('mdt-flex-1', className)} {...props} />;
  }
);

ToolbarSpacer.displayName = 'ToolbarSpacer';

export { Toolbar, ToolbarSection, ToolbarSpacer };
