import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { ContainerProps } from './Container.types';

/**
 * Container variants using Class Variance Authority (CVA)
 */
export const containerVariants = cva(['mdt-w-full'], {
  variants: {
    /**
     * Maximum width of the container
     */
    maxWidth: {
      sm: 'mdt-max-w-screen-sm', // 640px
      md: 'mdt-max-w-screen-md', // 768px
      lg: 'mdt-max-w-screen-lg', // 1024px
      xl: 'mdt-max-w-screen-xl', // 1280px
      '2xl': 'mdt-max-w-screen-2xl', // 1536px
      full: 'mdt-max-w-full',
    },
    /**
     * Padding around the container
     */
    padding: {
      none: 'mdt-px-0',
      sm: 'mdt-px-4',
      md: 'mdt-px-6',
      lg: 'mdt-px-8',
      xl: 'mdt-px-12',
    },
    /**
     * Vertical padding
     */
    paddingY: {
      none: 'mdt-py-0',
      sm: 'mdt-py-4',
      md: 'mdt-py-6',
      lg: 'mdt-py-8',
      xl: 'mdt-py-12',
    },
    /**
     * Whether the container should be centered
     */
    centered: {
      true: 'mdt-mx-auto',
      false: '',
    },
  },
  defaultVariants: {
    maxWidth: 'lg',
    padding: 'md',
    paddingY: 'none',
    centered: true,
  },
});

/**
 * Container component for consistent page layouts with max-width and padding.
 *
 * @example
 * ```tsx
 * // Default container (lg max-width, centered)
 * <Container>
 *   <h1>Welcome</h1>
 * </Container>
 *
 * // Full-width container with no padding
 * <Container maxWidth="full" padding="none">
 *   <Image src="banner.jpg" />
 * </Container>
 *
 * // Small container with large padding
 * <Container maxWidth="sm" padding="lg">
 *   <LoginForm />
 * </Container>
 *
 * // Container as semantic section
 * <Container as="section" paddingY="lg">
 *   <ArticleContent />
 * </Container>
 * ```
 */
const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    { as: Component = 'div', className, maxWidth, padding, paddingY, centered, children, ...props },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(containerVariants({ maxWidth, padding, paddingY, centered }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

export { Container };
