'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type {
  TabsAddProps,
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from './Tabs.types';

/**
 * Tabs root component - controls the tab state and behavior.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * ```
 */
const Tabs = forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Root ref={ref} className={cn('mdt-w-full', className)} {...props} />
  )
);
Tabs.displayName = 'Tabs';

/**
 * TabsList - container for tab triggers.
 */
const TabsList = forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, variant = 'default', fullWidth = false, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'mdt-inline-flex mdt-items-center mdt-gap-1',
        // Variant styles
        variant === 'default' &&
          'mdt-h-10 mdt-rounded-md mdt-bg-muted mdt-p-1 mdt-text-muted-foreground',
        variant === 'underline' &&
          'mdt-h-10 mdt-gap-6 mdt-border-b mdt-border-border mdt-bg-transparent',
        variant === 'card' &&
          'mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background mdt-p-1 mdt-shadow-sm',
        variant === 'pills' && 'mdt-h-10 mdt-gap-2 mdt-bg-transparent',
        // Full width modifier
        fullWidth && 'mdt-w-full mdt-justify-stretch',
        className
      )}
      {...props}
    />
  )
);
TabsList.displayName = 'TabsList';

/**
 * TabsTrigger - individual tab button.
 *
 * Takes an `icon` before the label and a `badge` after it, and either, both or
 * neither is fine. They are props rather than something you assemble in
 * `children` so that the spacing is decided once here instead of by whoever
 * writes the next tab bar.
 */
const TabsTrigger = forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
  (
    {
      className,
      variant = 'default',
      fullWidth = false,
      icon,
      badge,
      closable = false,
      onClose,
      closeLabel,
      children,
      ...props
    },
    ref
  ) => {
    const trigger = (
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          // Only when there is something to space. A label on its own has one
          // child and no gap to close, and adding one anyway would nudge every
          // tab bar already in the product.
          (icon !== undefined || badge !== undefined) && 'mdt-gap-2',
          // Base styles
          'mdt-inline-flex mdt-items-center mdt-justify-center mdt-whitespace-nowrap',
          'mdt-px-3 mdt-py-1.5 mdt-text-sm mdt-font-medium mdt-ring-offset-background',
          'mdt-transition-all',
          'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-2',
          'disabled:mdt-pointer-events-none disabled:mdt-opacity-50',
          // Variant-specific styles
          variant === 'default' &&
            cn(
              'mdt-rounded-sm',
              'data-[state=active]:mdt-bg-background data-[state=active]:mdt-text-foreground data-[state=active]:mdt-shadow-sm'
            ),
          variant === 'underline' &&
            cn(
              'mdt-relative mdt-border-b-2 mdt-border-transparent mdt-bg-transparent mdt-pb-3',
              'data-[state=active]:mdt-border-primary data-[state=active]:mdt-text-foreground',
              'hover:mdt-text-foreground'
            ),
          variant === 'card' &&
            cn(
              'mdt-rounded-md',
              'data-[state=active]:mdt-bg-primary data-[state=active]:mdt-text-primary-foreground data-[state=active]:mdt-shadow-sm',
              'hover:mdt-bg-muted/50'
            ),
          variant === 'pills' &&
            cn(
              'mdt-rounded-full mdt-border mdt-border-transparent',
              'data-[state=active]:mdt-border-border data-[state=active]:mdt-bg-background data-[state=active]:mdt-text-foreground data-[state=active]:mdt-shadow-sm',
              'hover:mdt-bg-muted/50'
            ),
          // Full width modifier
          fullWidth && 'mdt-flex-1',
          // Room for the close control, which sits over the tab's right edge
          // rather than inside it.
          //
          // This has to come *after* the base padding, not before it. `px-3`
          // sets both sides, so a `pr` written earlier is overwritten by it and
          // the label ends up running under the cross.
          //
          // 36px of padding against a 20px cross sitting 4px from the edge
          // leaves exactly 12px between the label and the cross. The padding
          // stays whether the cross is showing or not, so the tab does not
          // change width when you hover it.
          closable && 'mdt-pr-9',
          className
        )}
        {...props}
      >
        {icon !== undefined ? (
          // `shrink-0` so a long label never squeezes the glyph out of shape, and
          // `[&_svg]` sizes whatever was passed rather than demanding a set size.
          <span
            className="mdt-inline-flex mdt-shrink-0 [&_svg]:mdt-size-4"
            aria-hidden="true"
            data-testid="tab-icon"
          >
            {icon}
          </span>
        ) : null}

        {children}

        {badge !== undefined ? (
          <span className="mdt-inline-flex mdt-shrink-0" data-testid="tab-badge">
            {badge}
          </span>
        ) : null}
      </TabsPrimitive.Trigger>
    );

    if (!closable) return trigger;

    // The close sits *beside* the tab in the markup and only looks like it is
    // inside it. A button nested in a button is invalid HTML and leaves the
    // close unreachable by keyboard, which is exactly the control someone
    // navigating by keyboard needs most.
    return (
      <span className="mdt-group mdt-relative mdt-inline-flex mdt-items-center">
        {trigger}
        <button
          type="button"
          aria-label={
            closeLabel ?? (typeof children === 'string' ? `Close ${children}` : 'Close tab')
          }
          onClick={onClose}
          className={cn(
            'mdt-absolute mdt-right-1 mdt-top-1/2 -mdt-translate-y-1/2',
            'mdt-inline-flex mdt-size-5 mdt-items-center mdt-justify-center mdt-rounded-sm',
            'mdt-text-muted-foreground hover:mdt-bg-muted hover:mdt-text-foreground',
            'mdt-transition-colors mdt-transition-opacity',
            // Hidden until the tab is the one you are on, or the one you are
            // pointing at. A cross on every tab turns a row of names into a row
            // of things to be careful around.
            //
            // `pointer-events-none` matters as much as the opacity: an
            // invisible-but-clickable cross sits over the right edge of every
            // tab, so aiming at the tab would close it instead of opening it.
            'mdt-pointer-events-none mdt-opacity-0',
            'group-hover:mdt-pointer-events-auto group-hover:mdt-opacity-100',
            '[[data-state=active]+&]:mdt-pointer-events-auto [[data-state=active]+&]:mdt-opacity-100',
            // Keyboard users never hover, so tabbing to it has to reveal it too.
            'focus-visible:mdt-pointer-events-auto focus-visible:mdt-opacity-100',
            'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring'
          )}
          data-testid="tab-close"
        >
          <Icon name="x" size="xs" aria-hidden />
        </button>
      </span>
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

/**
 * TabsAdd - the control that makes a new tab.
 *
 * Sits at the end of the list, the way Notion and ClickUp put it. Not a tab
 * itself: it does not take part in arrow-key navigation between tabs, because
 * it does not select anything.
 */
const TabsAdd = forwardRef<HTMLButtonElement, TabsAddProps>(
  ({ className, label = 'New tab', ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={cn(
        'mdt-inline-flex mdt-size-8 mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded-sm',
        'mdt-text-muted-foreground hover:mdt-bg-muted hover:mdt-text-foreground',
        'mdt-transition-colors',
        'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-2 focus-visible:mdt-ring-offset-background',
        className
      )}
      data-testid="tab-add"
      {...props}
    >
      <Icon name="plus" size="sm" aria-hidden />
    </button>
  )
);
TabsAdd.displayName = 'TabsAdd';

/**
 * TabsContent - content panel for each tab.
 */
const TabsContent = forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, TabsContentProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        'mdt-mt-2 mdt-ring-offset-background',
        'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-2',
        className
      )}
      {...props}
    />
  )
);
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsAdd };
