import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { ToolbarOldProps } from './ToolbarOld.types';

/**
 * ToolbarOld variants using Class Variance Authority (CVA)
 */
export const toolbarOldVariants = cva(
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
 * ToolbarOld component for displaying search, filters, and action buttons.
 *
 * @example
 * ```tsx
 * <ToolbarOld>
 *   <ToolbarOldSection>
 *     <ToolbarSearch placeholder="Search..." />
 *   </ToolbarOldSection>
 *   <ToolbarOldSection>
 *     <ToolbarButton>Filters</ToolbarButton>
 *     <ToolbarButton>New</ToolbarButton>
 *   </ToolbarOldSection>
 * </ToolbarOld>
 * ```
 *
 * @deprecated Since 0.4.0. Use `Toolbar`, now the merged console strip, with
 * `ToolbarButton` controls. This general-purpose strip stays only for
 * side-by-side comparison until the removal pull request.
 */
const ToolbarOld = forwardRef<HTMLDivElement, ToolbarOldProps>(
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
          toolbarOldVariants({
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

ToolbarOld.displayName = 'ToolbarOld';

/**
 * ToolbarOldSection component for grouping toolbar items.
 *
 * @example
 * ```tsx
 * <ToolbarOldSection>
 *   <button>Action 1</button>
 *   <button>Action 2</button>
 * </ToolbarOldSection>
 * ```
 */
const ToolbarOldSection = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('mdt-flex mdt-items-center mdt-gap-2', className)} {...props}>
        {children}
      </div>
    );
  }
);

ToolbarOldSection.displayName = 'ToolbarOldSection';

/**
 * ToolbarOldSpacer component for adding flexible space between toolbar sections.
 *
 * @example
 * ```tsx
 * <ToolbarOld>
 *   <ToolbarOldSection>Left content</ToolbarOldSection>
 *   <ToolbarOldSpacer />
 *   <ToolbarOldSection>Right content</ToolbarOldSection>
 * </ToolbarOld>
 * ```
 */
const ToolbarOldSpacer = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('mdt-flex-1', className)} {...props} />;
  }
);

ToolbarOldSpacer.displayName = 'ToolbarOldSpacer';

export { ToolbarOld, ToolbarOldSection, ToolbarOldSpacer };
