import { Children, cloneElement, isValidElement } from 'react';
import type { ReactElement } from 'react';
import { cn } from '@/utils';
import { Avatar, avatarVariants } from './Avatar';
import type { AvatarProps, AvatarSize, AvatarStackProps } from './Avatar.types';

const DEFAULT_MAX = 4;

/**
 * Overlap per size, held at a quarter of the avatar's width.
 *
 * Org Mgmt and Agent Fleet both use -8px on a 32px avatar, which is exactly a
 * quarter. Applying that flat would bury the small sizes: at 20px, -8px hides
 * 40% of each face and the initials become unreadable. Scaling keeps the same
 * proportion visible at every size.
 *
 *   xs 20px -> 5px    sm 24px -> 6px    md 32px -> 8px
 *   lg 40px -> 10px   xl 56px -> 14px
 */
const OVERLAP: Record<AvatarSize, string> = {
  xs: '-mdt-ml-1',
  sm: '-mdt-ml-1.5',
  md: '-mdt-ml-2',
  lg: '-mdt-ml-2.5',
  xl: '-mdt-ml-3.5',
};

/**
 * AvatarStack - overlapping avatars with a "+N" chip for the rest.
 *
 * Size, shape and the separating ring are applied to every child, so a stack
 * cannot end up with mismatched avatars in it.
 *
 * @example
 * ```tsx
 * <AvatarStack max={3}>
 *   <Avatar name="Sarah Johnson" />
 *   <Avatar name="Ravi Patel" />
 *   <Avatar name="Mei Chen" />
 *   <Avatar name="Tom Green" />
 * </AvatarStack>
 * ```
 */
export const AvatarStack = ({
  children,
  max = DEFAULT_MAX,
  size = 'md',
  shape = 'circle',
  className,
}: AvatarStackProps) => {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<AvatarProps>[];
  const shown = items.slice(0, max);
  const hidden = items.length - shown.length;

  return (
    <span className={cn('mdt-inline-flex mdt-items-center', className)}>
      {shown.map((child, index) => (
        <span key={child.key ?? index} className={index === 0 ? '' : OVERLAP[size]}>
          {cloneElement(child, { size, shape, ring: true })}
        </span>
      ))}

      {hidden > 0 ? (
        <span className={OVERLAP[size]}>
          <span
            className={cn(
              avatarVariants({ tone: 'slate', size, shape, ring: true }),
              // Not an Avatar: it represents a count, not a person, so it takes
              // no name and derives no colour.
              'mdt-normal-case'
            )}
            data-testid="avatar-stack-overflow"
          >
            +{hidden}
          </span>
        </span>
      ) : null}
    </span>
  );
};

AvatarStack.displayName = 'AvatarStack';

export { Avatar };
