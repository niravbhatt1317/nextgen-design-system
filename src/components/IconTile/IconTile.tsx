import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

/**
 * IconTile styles - a tinted container holding a single icon.
 *
 * Org Mgmt's audit calls this "the most duplicated inline pattern" in that
 * system, and records the cost of leaving it inline: the warning foreground
 * alternates between two values, the success background between two more, and
 * some sites reference tokens that do not exist at all.
 *
 * Tones match Avatar's palette, so a tile and an avatar sitting next to each
 * other agree on what green means.
 */
export const iconTileVariants = cva(
  'mdt-inline-flex mdt-shrink-0 mdt-items-center mdt-justify-center [&_svg]:mdt-shrink-0',
  {
    variants: {
      tone: {
        slate:
          'mdt-bg-neutral-30 mdt-text-neutral-110 dark:mdt-bg-neutral-120 dark:mdt-text-neutral-30',
        blue: 'mdt-bg-blue-10 mdt-text-blue-80 dark:mdt-bg-blue-90 dark:mdt-text-blue-30',
        green: 'mdt-bg-green-10 mdt-text-green-80 dark:mdt-bg-green-90 dark:mdt-text-green-30',
        amber: 'mdt-bg-orange-20 mdt-text-orange-80 dark:mdt-bg-orange-90 dark:mdt-text-orange-30',
        rose: 'mdt-bg-red-10 mdt-text-red-80 dark:mdt-bg-red-90 dark:mdt-text-red-30',
        purple:
          'mdt-bg-purple-10 mdt-text-purple-90 dark:mdt-bg-purple-100 dark:mdt-text-purple-30',
      },
      size: {
        sm: 'mdt-h-6 mdt-w-6',
        md: 'mdt-h-8 mdt-w-8',
        lg: 'mdt-h-10 mdt-w-10',
        xl: 'mdt-h-12 mdt-w-12',
      },
      shape: {
        square: 'mdt-rounded-md',
        circle: 'mdt-rounded-full',
      },
    },
    defaultVariants: { tone: 'slate', size: 'md', shape: 'square' },
  }
);

export type IconTileVariantsType = VariantProps<typeof iconTileVariants>;
export type IconTileTone = 'slate' | 'blue' | 'green' | 'amber' | 'rose' | 'purple';
export type IconTileSize = 'sm' | 'md' | 'lg' | 'xl';
export type IconTileShape = 'square' | 'circle';

export interface IconTileProps extends Omit<
  ComponentPropsWithoutRef<'span'>,
  'className' | 'children' | 'color'
> {
  /** The icon to hold. */
  icon: ReactNode;
  /** @default 'slate' */
  tone?: IconTileTone;
  /** @default 'md' */
  size?: IconTileSize;
  /** @default 'square' */
  shape?: IconTileShape;
  /**
   * What the icon means. Leave it out and the tile is hidden from screen
   * readers, which is right when the icon only decorates something already
   * labelled beside it.
   */
  'aria-label'?: string;
  className?: string;
}

/**
 * IconTile - a tinted container for a single icon.
 *
 * @example
 * ```tsx
 * <IconTile icon={<Icon name="server" />} tone="blue" />
 * <IconTile icon={<Icon name="check" />} tone="green" shape="circle" size="xl" />
 * ```
 */
const IconTile = forwardRef<HTMLSpanElement, IconTileProps>(
  ({ icon, tone, size, shape, className, ...rest }, ref) => {
    const label = rest['aria-label'];
    return (
      <span
        ref={ref}
        className={cn(iconTileVariants({ tone, size, shape }), className)}
        role={label === undefined ? undefined : 'img'}
        aria-hidden={label === undefined ? true : undefined}
        {...rest}
      >
        {icon}
      </span>
    );
  }
);

IconTile.displayName = 'IconTile';

export { IconTile };
