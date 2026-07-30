'use client';

import {
  Group as PanelGroup,
  Panel,
  Separator as PanelResizeHandle,
  type GroupProps,
  type PanelProps,
  type SeparatorProps,
} from 'react-resizable-panels';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import { Icon } from '@/components/Icon';

/**
 * Props for the ResizablePanelGroup component
 */
export type ResizablePanelGroupProps = Omit<GroupProps, 'ref'>;

/**
 * Props for the ResizablePanel component
 */
export type ResizablePanelProps = Omit<PanelProps, 'ref'>;

/**
 * Props for the ResizableHandle component
 */
export interface ResizableHandleProps extends Omit<SeparatorProps, 'ref'> {
  /**
   * Whether to show the grip handle icon
   * @default false
   */
  withHandle?: boolean;
}

/**
 * ResizablePanelGroup - Container for resizable panels.
 * Controls the layout direction and panel behavior.
 *
 * @example
 * ```tsx
 * <ResizablePanelGroup orientation="horizontal">
 *   <ResizablePanel defaultSize={50}>Left Content</ResizablePanel>
 *   <ResizableHandle />
 *   <ResizablePanel defaultSize={50}>Right Content</ResizablePanel>
 * </ResizablePanelGroup>
 * ```
 */
const ResizablePanelGroup = forwardRef<HTMLDivElement, ResizablePanelGroupProps>(
  ({ className, ...props }, ref) => (
    <PanelGroup
      elementRef={ref}
      className={cn(
        'mdt-flex mdt-h-full mdt-w-full data-[panel-group-direction=vertical]:mdt-flex-col',
        className
      )}
      {...props}
    />
  )
);
ResizablePanelGroup.displayName = 'ResizablePanelGroup';

/**
 * ResizablePanel - Individual panel within a ResizablePanelGroup.
 * Can be resized by dragging the ResizableHandle.
 */
const ResizablePanel = Panel;

/**
 * ResizableHandle - Draggable handle between panels for resizing.
 * Can optionally show a grip handle icon.
 */
const ResizableHandle = forwardRef<HTMLDivElement, ResizableHandleProps>(
  ({ withHandle, className, ...props }, ref) => (
    <PanelResizeHandle
      elementRef={ref}
      className={cn(
        // Base styles for horizontal layout (vertical separator line)
        'mdt-relative mdt-flex mdt-w-px mdt-items-center mdt-justify-center mdt-bg-border',
        // Hover area for easier grabbing (horizontal layout)
        'after:mdt-absolute after:mdt-inset-y-0 after:mdt-left-1/2 after:mdt-w-1 after:-mdt-translate-x-1/2',
        // Focus styles
        'focus-visible:mdt-outline-none focus-visible:mdt-ring-1 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-1',
        // Horizontal separator line (aria-orientation=horizontal means vertical panel layout)
        '[&[aria-orientation=horizontal]]:mdt-h-px',
        '[&[aria-orientation=horizontal]]:mdt-w-full',
        // Reset after pseudo-element for horizontal separator
        '[&[aria-orientation=horizontal]]:after:mdt-left-0',
        '[&[aria-orientation=horizontal]]:after:mdt-h-1',
        '[&[aria-orientation=horizontal]]:after:mdt-w-full',
        '[&[aria-orientation=horizontal]]:after:-mdt-translate-y-1/2',
        '[&[aria-orientation=horizontal]]:after:mdt-translate-x-0',
        '[&[aria-orientation=horizontal]]:after:mdt-inset-y-auto',
        '[&[aria-orientation=horizontal]]:after:mdt-top-1/2',
        // Rotate the grip handle icon for horizontal separator
        '[&[aria-orientation=horizontal]>div]:mdt-rotate-90',
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="mdt-z-10 mdt-flex mdt-h-4 mdt-w-3 mdt-items-center mdt-justify-center mdt-rounded-sm mdt-border mdt-border-border mdt-bg-border">
          <Icon name="grip-vertical" size={10} aria-hidden />
        </div>
      )}
    </PanelResizeHandle>
  )
);
ResizableHandle.displayName = 'ResizableHandle';

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
