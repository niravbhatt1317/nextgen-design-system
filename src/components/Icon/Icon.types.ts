import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';
import type { iconVariants as IconVariantsCVA } from './Icon';
import type { IconName } from './icons';

/**
 * Icon size options
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

/**
 * Icon color options - supports semantic colors from theme
 */
export type IconColor =
  | 'current'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'destructive'
  | 'warning'
  | 'info'
  | 'muted'
  | 'foreground';

/**
 * Icon variants derived from CVA configuration
 */
export type IconVariants = VariantProps<typeof IconVariantsCVA>;

/**
 * Base props shared by all icon variants
 */
interface IconBaseProps
  extends
    Omit<ComponentPropsWithoutRef<'svg'>, 'color' | 'size' | 'aria-hidden'>,
    Omit<IconVariants, 'size' | 'color'> {
  /**
   * Size of the icon
   * Can be a preset size or a custom number (in pixels)
   * @default "md"
   */
  size?: IconSize;

  /**
   * Color of the icon
   * Supports semantic colors from the theme
   * @default "current"
   */
  color?: IconColor;

  /**
   * Stroke width for the icon
   * @default 2
   */
  strokeWidth?: number;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Accessibility label for screen readers
   * Required if the icon conveys meaning
   */
  'aria-label'?: string;

  /**
   * Whether the icon is decorative (hidden from screen readers)
   * @default false
   */
  'aria-hidden'?: boolean;
}

/**
 * Props for using a registered icon by name
 */
interface IconWithName extends IconBaseProps {
  /**
   * Name of the icon to display from the registry
   * @example "user", "settings", "file"
   */
  name: IconName;

  /**
   * URL/path to external SVG (not used when name is provided)
   */
  src?: never;
}

/**
 * Props for using a custom/external SVG by URL
 */
interface IconWithSrc extends IconBaseProps {
  /**
   * Name of the icon (not used when src is provided)
   */
  name?: never;

  /**
   * URL or path to an external SVG file
   * Supports local paths (e.g., "/icons/custom.svg") or CDN URLs
   * @example "/icons/custom-icon.svg", "https://cdn.example.com/icon.svg"
   */
  src: string;
}

/**
 * Props for the Icon component
 *
 * Use either `name` for registered icons or `src` for custom/external SVGs
 *
 * @example
 * // Using registered icon
 * <Icon name="user" size="lg" color="primary" />
 *
 * // Using custom SVG
 * <Icon src="/icons/custom.svg" size="md" />
 */
export type IconProps = IconWithName | IconWithSrc;

/**
 * Export IconName type for external use
 */
export type { IconName };
