import { cva } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

/**
 * Label styles - the uppercase micro-heading that names a group of fields, a
 * section, or a column.
 *
 * Three of the four systems have one, and between them they use three different
 * letter-spacings: Org Mgmt at 0.04em, menu labels at 0.05em, Credential's
 * SectionLabel at 0.06em. Org Mgmt's audit also records its size and
 * line-height drifting across six files, and notes it is the only positive
 * tracking in the system with no token behind it.
 *
 * This settles on 0.05em - the middle of the three, and an existing step on the
 * scale rather than a fourth bespoke value.
 */
export const labelVariants = cva(
  'mdt-block mdt-font-semibold mdt-uppercase mdt-tracking-wider mdt-text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'mdt-text-xs',
        md: 'mdt-text-sm',
      },
    },
    defaultVariants: { size: 'sm' },
  }
);

export type LabelVariantsType = VariantProps<typeof labelVariants>;
export type LabelSize = 'sm' | 'md';

export interface LabelProps extends Omit<
  ComponentPropsWithoutRef<'span'>,
  'className' | 'children' | 'color'
> {
  children: ReactNode;
  /** @default 'sm' */
  size?: LabelSize;
  /**
   * Renders as a different element. Use `legend` inside a fieldset, or `h3` when
   * the label really is a heading, so the structure is not lost on a screen
   * reader.
   * @default 'span'
   */
  as?: 'span' | 'div' | 'h3' | 'h4' | 'legend';
  className?: string;
}

/**
 * Label - an uppercase micro-heading.
 *
 * @example
 * ```tsx
 * <Label>Connection</Label>
 * <Label as="h3" size="md">Credentials</Label>
 * ```
 */
/**
 * No forwarded ref on purpose. `as` can render a span, div, heading or legend,
 * and each has a different element type, so a single ref cannot type-check
 * against all four without making the whole component generic. A static text
 * label is not something callers reach for a ref on, so the simpler types win.
 */
const Label = ({ children, size, as: Tag = 'span', className, ...rest }: LabelProps) => (
  <Tag className={cn(labelVariants({ size }), className)} {...rest}>
    {children}
  </Tag>
);

Label.displayName = 'Label';

export { Label };
