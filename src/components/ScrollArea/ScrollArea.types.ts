import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

/**
 * Extended orientation type to support both scrollbars
 */
export type ScrollOrientation = 'vertical' | 'horizontal' | 'both';

/**
 * Props for the ScrollArea component
 */
export interface ScrollAreaProps extends Omit<
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>,
  'children'
> {
  /**
   * Content to be rendered inside the scroll area
   */
  children?: ReactNode;

  /**
   * Scrollbar orientation
   * @default 'vertical'
   */
  orientation?: ScrollOrientation;

  /**
   * The type of scrollbar to use
   * - "auto": Scrollbars are visible when content is overflowing
   * - "always": Scrollbars are always visible
   * - "scroll": Scrollbars are visible when scrolling
   * - "hover": Scrollbars are visible on hover
   * @default 'hover'
   */
  type?: 'auto' | 'always' | 'scroll' | 'hover';

  /**
   * The delay in milliseconds before scrollbars are hidden (for type="scroll" or "hover")
   * @default 600
   */
  scrollHideDelay?: number;

  /**
   * The direction of the scroll area
   * @default 'ltr'
   */
  dir?: 'ltr' | 'rtl';
}

/**
 * Props for the ScrollAreaViewport component
 */
export interface ScrollAreaViewportProps extends ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.Viewport
> {
  /**
   * Content to be rendered inside the viewport
   */
  children?: ReactNode;
}

/**
 * Props for the ScrollBar component
 */
export interface ScrollBarProps extends ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
> {
  /**
   * Scrollbar orientation
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';
}

/**
 * Props for the ScrollAreaCorner component
 */
export type ScrollAreaCornerProps = ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Corner>;
