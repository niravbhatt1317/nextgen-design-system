import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { ToolbarProps } from './Toolbar.types';

/**
 * Toolbar styles.
 *
 * The strip above a list, as the merged console draws it (Pranjal's ruling of
 * 4 September 2026): 60px tall, a 24px inset, 10px between the controls, on
 * the page ground. It has no sizes: every list page wears the same strip, and
 * its controls are ToolbarButton, which are all 32px.
 *
 * The right-hand run goes in a ToolbarSection after a ToolbarSpacer; a section
 * keeps 8px between its own controls.
 *
 * The previous general-purpose strip, with its compact and spacious sizes and
 * padding switches, is ToolbarOld, deprecated.
 */
export const toolbarVariants = cva(
  [
    'mdt-flex mdt-w-full mdt-items-center mdt-gap-2.5',
    'mdt-h-[60px] mdt-px-6',
    'mdt-bg-background',
  ],
  {
    variants: {
      /** A hairline under the strip, for when the table below has no card of its own. */
      border: {
        true: 'mdt-border-b mdt-border-border',
        false: '',
      },
    },
    defaultVariants: {
      border: false,
    },
  }
);

/**
 * Toolbar - the strip above a list: search, filters, then sort and columns on the right.
 *
 * @example
 * ```tsx
 * <Toolbar label="User controls">
 *   <Input size="sm" placeholder="Search by name or email" startAdornment={<Icon name="search" size={14} />} />
 *   <ToolbarButton icon={<Icon name="list-filter" />} count={2} onClick={openDrawer}>Filters</ToolbarButton>
 *   <ToolbarButton icon={<Icon name="check-circle" />} dot aria-label="Status" />
 *   <ToolbarSpacer />
 *   <ToolbarSection>
 *     <ToolbarButton icon={<Icon name="arrow-up-down" />} aria-label="Sort" />
 *     <ToolbarButton icon={<Icon name="columns" />} aria-label="Columns" />
 *   </ToolbarSection>
 * </Toolbar>
 * ```
 */
const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
  { className, border, label = 'Toolbar', children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      role="toolbar"
      aria-label={label}
      className={cn(toolbarVariants({ border }), className)}
      {...props}
    >
      {children}
    </div>
  );
});

Toolbar.displayName = 'Toolbar';

/** A run of controls that keeps 8px between them: the right-hand end of the strip. */
const ToolbarSection = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  function ToolbarSection({ className, children, ...props }, ref) {
    return (
      <div ref={ref} className={cn('mdt-flex mdt-items-center mdt-gap-2', className)} {...props}>
        {children}
      </div>
    );
  }
);

ToolbarSection.displayName = 'ToolbarSection';

/** Pushes what follows it to the far end of the strip. */
const ToolbarSpacer = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  function ToolbarSpacer({ className, ...props }, ref) {
    return <div ref={ref} className={cn('mdt-flex-1', className)} aria-hidden="true" {...props} />;
  }
);

ToolbarSpacer.displayName = 'ToolbarSpacer';

export { Toolbar, ToolbarSection, ToolbarSpacer };
