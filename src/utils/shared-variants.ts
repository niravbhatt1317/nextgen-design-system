/**
 * Shared CVA variant definitions to reduce code duplication.
 * These variants are used across multiple layout components (Flex, Grid).
 */

/**
 * Gap size type used across layout components
 */
export type GapSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

/**
 * CVA variant record type for string values
 */
type CVAVariantRecord = Record<string, string>;

/**
 * Shared gap variants for uniform spacing across Flex and Grid components.
 * Maps semantic size names to Tailwind gap classes with mdt- prefix.
 */
export const gapVariants: CVAVariantRecord = {
  none: 'mdt-gap-0',
  xs: 'mdt-gap-1',
  sm: 'mdt-gap-2',
  md: 'mdt-gap-4',
  lg: 'mdt-gap-6',
  xl: 'mdt-gap-8',
  '2xl': 'mdt-gap-12',
  '3xl': 'mdt-gap-16',
};

/**
 * Shared horizontal gap variants (gap-x) for layout components.
 */
export const gapXVariants: CVAVariantRecord = {
  none: 'mdt-gap-x-0',
  xs: 'mdt-gap-x-1',
  sm: 'mdt-gap-x-2',
  md: 'mdt-gap-x-4',
  lg: 'mdt-gap-x-6',
  xl: 'mdt-gap-x-8',
  '2xl': 'mdt-gap-x-12',
  '3xl': 'mdt-gap-x-16',
};

/**
 * Shared vertical gap variants (gap-y) for layout components.
 */
export const gapYVariants: CVAVariantRecord = {
  none: 'mdt-gap-y-0',
  xs: 'mdt-gap-y-1',
  sm: 'mdt-gap-y-2',
  md: 'mdt-gap-y-4',
  lg: 'mdt-gap-y-6',
  xl: 'mdt-gap-y-8',
  '2xl': 'mdt-gap-y-12',
  '3xl': 'mdt-gap-y-16',
};

/**
 * Shared alignment variants for items alignment.
 */
export const alignItemsVariants: CVAVariantRecord = {
  start: 'mdt-items-start',
  end: 'mdt-items-end',
  center: 'mdt-items-center',
  stretch: 'mdt-items-stretch',
};
