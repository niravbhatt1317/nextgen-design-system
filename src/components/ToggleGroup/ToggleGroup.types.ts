import type * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import type { VariantProps } from 'class-variance-authority';
import type {
  toggleGroupVariants as ToggleGroupVariantsCVA,
  toggleGroupItemVariants as ToggleGroupItemVariantsCVA,
} from './ToggleGroup';

/**
 * ToggleGroup variants derived from CVA configuration
 */
export type ToggleGroupVariants = VariantProps<typeof ToggleGroupVariantsCVA>;

/**
 * ToggleGroup item variants derived from CVA configuration
 */
export type ToggleGroupItemVariants = VariantProps<typeof ToggleGroupItemVariantsCVA>;

/**
 * Visual style variant type
 */
export type ToggleGroupVariant = 'default' | 'outline';

/**
 * Size variant type
 */
export type ToggleGroupSize = 'sm' | 'md' | 'lg';

/**
 * Orientation type
 */
export type ToggleGroupOrientation = 'horizontal' | 'vertical';

/**
 * Base props for ToggleGroup
 */
interface ToggleGroupBaseProps {
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: ToggleGroupVariant;

  /**
   * Size of the toggle items
   * @default 'md'
   */
  size?: ToggleGroupSize;

  /**
   * Orientation of the toggle group
   * @default 'horizontal'
   */
  orientation?: ToggleGroupOrientation;

  /**
   * Whether the toggle group should take full width
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Props for single-selection ToggleGroup
 */
export interface ToggleGroupSingleProps
  extends
    Omit<
      React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>,
      'type' | 'value' | 'defaultValue' | 'onValueChange' | 'orientation'
    >,
    ToggleGroupBaseProps {
  /**
   * Type of selection
   */
  type: 'single';

  /**
   * The controlled value of the pressed item
   */
  value?: string;

  /**
   * The default value of the pressed item (uncontrolled)
   */
  defaultValue?: string;

  /**
   * Callback when the value changes
   */
  onValueChange?: (value: string) => void;
}

/**
 * Props for multiple-selection ToggleGroup
 */
export interface ToggleGroupMultipleProps
  extends
    Omit<
      React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>,
      'type' | 'value' | 'defaultValue' | 'onValueChange' | 'orientation'
    >,
    ToggleGroupBaseProps {
  /**
   * Type of selection
   */
  type: 'multiple';

  /**
   * The controlled value of the pressed items
   */
  value?: string[];

  /**
   * The default value of the pressed items (uncontrolled)
   */
  defaultValue?: string[];

  /**
   * Callback when the value changes
   */
  onValueChange?: (value: string[]) => void;
}

/**
 * Union type for ToggleGroup props
 */
export type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;

/**
 * Props for ToggleGroupItem component
 */
export interface ToggleGroupItemProps extends React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Item
> {
  /**
   * The unique value for this item
   */
  value: string;

  /**
   * Visual style variant (overrides parent)
   */
  variant?: ToggleGroupVariant;

  /**
   * Size variant (overrides parent)
   */
  size?: ToggleGroupSize;
}

/**
 * Context value for ToggleGroup
 */
export interface ToggleGroupContextValue {
  variant: ToggleGroupVariant;
  size: ToggleGroupSize;
}
