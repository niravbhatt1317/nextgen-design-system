import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { FormFieldProps } from './Form.types';

/**
 * FormField component that wraps individual form fields with consistent spacing.
 *
 * @example
 * ```tsx
 * <FormField>
 *   <FormLabel>Username</FormLabel>
 *   <Input />
 *   <FormMessage error="Username is required" />
 * </FormField>
 * ```
 */
const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('mdt-space-y-2', className)} {...props}>
        {children}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export { FormField };
