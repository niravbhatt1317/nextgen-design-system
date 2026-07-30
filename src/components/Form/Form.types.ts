import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { formLabelVariants as FormLabelVariantsCVA } from './FormLabel';
import type { formMessageVariants as FormMessageVariantsCVA } from './FormMessage';
import type { formDescriptionVariants as FormDescriptionVariantsCVA } from './FormDescription';

/**
 * FormLabel variants derived from CVA configuration
 */
export type FormLabelVariants = VariantProps<typeof FormLabelVariantsCVA>;

/**
 * FormMessage variants derived from CVA configuration
 */
export type FormMessageVariants = VariantProps<typeof FormMessageVariantsCVA>;

/**
 * FormDescription variants derived from CVA configuration
 */
export type FormDescriptionVariants = VariantProps<typeof FormDescriptionVariantsCVA>;

/**
 * Props for the Form component
 */
export interface FormProps extends ComponentPropsWithoutRef<'form'> {
  /**
   * Content to display inside the form
   */
  children: ReactNode;
  /**
   * Form submit handler
   */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * Props for the FormField component
 */
export interface FormFieldProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Content to display inside the form field
   */
  children: ReactNode;
}

/**
 * Props for the FormLabel component
 */
export interface FormLabelProps
  extends Omit<ComponentPropsWithoutRef<'label'>, 'color'>, FormLabelVariants {
  /**
   * Content to display inside the label
   */
  children: ReactNode;
  /**
   * Whether the field is required (shows asterisk)
   */
  required?: boolean;
}

/**
 * Props for the FormControl component
 */
export interface FormControlProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Form control element (Input, Select, etc.)
   */
  children: ReactNode;
}

/**
 * Props for the FormMessage component
 */
export interface FormMessageProps
  extends Omit<ComponentPropsWithoutRef<'p'>, 'color'>, FormMessageVariants {
  /**
   * Content to display inside the message
   */
  children?: ReactNode;
  /**
   * Error message to display (takes precedence over children)
   */
  error?: string;
}

/**
 * Props for the FormDescription component
 */
export interface FormDescriptionProps
  extends Omit<ComponentPropsWithoutRef<'p'>, 'color'>, FormDescriptionVariants {
  /**
   * Content to display inside the description
   */
  children: ReactNode;
}
