import type * as SwitchPrimitives from '@radix-ui/react-switch';
import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';
import type { motadataSwitchOld2RootVariants as SwitchRootVariantsCVA } from './SwitchOld2';

/**
 * Switch variants derived from CVA configuration
 */
export type MotadataSwitchOld2Variants = VariantProps<typeof SwitchRootVariantsCVA>;

/**
 * Props for the MotadataSwitchOld2 component
 */
export interface MotadataSwitchOld2Props
  extends ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, MotadataSwitchOld2Variants {
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
