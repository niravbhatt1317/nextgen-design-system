import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { FormProps } from './Form.types';

/**
 * Form component that wraps form elements with consistent styling and behavior.
 *
 * @example
 * ```tsx
 * <Form onSubmit={handleSubmit}>
 *   <FormField>
 *     <FormLabel>Email</FormLabel>
 *     <Input type="email" />
 *   </FormField>
 * </Form>
 * ```
 */
const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, onSubmit, children, ...props }, ref) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit?.(e);
    };

    return (
      <form ref={ref} className={cn('mdt-space-y-4', className)} onSubmit={handleSubmit} {...props}>
        {children}
      </form>
    );
  }
);

Form.displayName = 'Form';

export { Form };
