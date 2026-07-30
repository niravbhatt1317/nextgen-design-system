import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from 'react';

/**
 * Extract props from a component while excluding ref
 */
export type ComponentProps<T extends React.ElementType> = ComponentPropsWithoutRef<T>;

/**
 * Extract the ref type from a component
 */
export type ComponentRef<T extends React.ElementType> = ElementRef<T>;

/**
 * Common size variants used across components
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Common color/intent variants used across components
 */
export type Intent = 'primary' | 'secondary' | 'destructive' | 'success' | 'warning' | 'info';

/**
 * Props that support both controlled and uncontrolled behavior
 */
export interface ControlledProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

/**
 * Common props for components that can have children
 */
export interface WithChildren {
  children?: ReactNode;
}

/**
 * Common props for components that can be disabled
 */
export interface WithDisabled {
  disabled?: boolean;
}

/**
 * Common props for components with loading state
 */
export interface WithLoading {
  loading?: boolean;
}

/**
 * Common props for components with custom className
 */
export interface WithClassName {
  className?: string;
}

/**
 * Props for polymorphic components that can render as different elements
 */
export interface AsChildProps {
  asChild?: boolean;
}

/**
 * Utility type to make specific properties required
 */
export type RequiredProps<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Utility type to make all properties optional except specified ones
 */
export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;
