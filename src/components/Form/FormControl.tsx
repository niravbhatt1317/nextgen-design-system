import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { FormControlProps } from './Form.types';

/**
 * FormControl component that wraps form input elements.
 * Provides consistent spacing and styling for form controls.
 *
 * @example
 * ```tsx
 * <FormControl>
 *   <Input type="email" />
 * </FormControl>
 * ```
 */
const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('mdt-relative', className)} {...props}>
        {children}
      </div>
    );
  }
);

FormControl.displayName = 'FormControl';

export { FormControl };
