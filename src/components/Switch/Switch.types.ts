import type * as SwitchPrimitives from '@radix-ui/react-switch';
import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';
import type { motadataSwitchRootVariants as SwitchRootVariantsCVA } from './Switch';

/**
 * Switch variants derived from CVA configuration
 */
export type MotadataSwitchVariants = VariantProps<typeof SwitchRootVariantsCVA>;

/**
 * Props for the MotadataSwitch component
 */
export interface MotadataSwitchProps
  extends ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, MotadataSwitchVariants {
  /**
   * The controlled checked state of the switch
   */
  checked?: boolean;

  /**
   * The default checked state when uncontrolled
   */
  defaultChecked?: boolean;

  /**
   * Event handler called when the checked state changes
   */
  onCheckedChange?: (checked: boolean) => void;

  /**
   * When true, prevents the user from interacting with the switch
   */
  disabled?: boolean;

  /**
   * When true, indicates that the user must check the switch before form submission
   */
  required?: boolean;

  /**
   * The name of the switch (used in form submission)
   */
  name?: string;

  /**
   * The value given as data when submitted with a form
   */
  value?: string;
}
