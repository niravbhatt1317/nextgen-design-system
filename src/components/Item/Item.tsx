import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { ItemProps } from './Item.types';

/**
 * Item variants using CVA
 */
export const itemVariants = cva(
  [
    'mdt-flex mdt-items-center mdt-gap-3',
    'mdt-rounded-md mdt-px-3 mdt-py-2',
    'mdt-text-sm mdt-font-medium',
    'mdt-transition-colors',
    'focus-visible:mdt-outline-none focus-visible:mdt-ring-2',
    'disabled:mdt-pointer-events-none disabled:mdt-opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'mdt-text-foreground hover:mdt-bg-muted',
        ghost: 'mdt-text-foreground hover:mdt-bg-muted/50',
        active: 'mdt-bg-muted mdt-text-foreground',
        destructive: 'mdt-text-destructive hover:mdt-bg-destructive/10',
      },
      size: {
        sm: 'mdt-gap-2 mdt-px-2 mdt-py-1 mdt-text-xs',
        md: 'mdt-gap-3 mdt-px-3 mdt-py-2 mdt-text-sm',
        lg: 'mdt-gap-3 mdt-px-4 mdt-py-3 mdt-text-base',
      },
      clickable: {
        true: 'mdt-cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      clickable: true,
    },
  }
);

/**
 * Item component - a flexible list item for menus, dropdowns, and lists.
 *
 * @example
 * ```tsx
 * <Item>
 *   <UserIcon />
 *   <span>Profile</span>
 * </Item>
 * ```
 */
const Item = forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      label,
      description,
      disabled,
      active,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    // Determine if the item should be interactive
    const hasClickHandler = Boolean(onClick);
    const isNonDefaultVariant = variant !== 'default';
    const isClickable = !disabled && (hasClickHandler || isNonDefaultVariant);

    // Use semantic button when clickable, div otherwise
    if (isClickable) {
      return (
        <button
          ref={ref as React.ForwardedRef<HTMLButtonElement>}
          type="button"
          disabled={disabled}
          className={cn(
            itemVariants({
              variant: active ? 'active' : variant,
              size,
              clickable: true,
            }),
            className
          )}
          onClick={onClick}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {icon && <span className="mdt-flex-shrink-0">{icon}</span>}
          {label || description ? (
            <div className="mdt-flex mdt-flex-1 mdt-flex-col mdt-gap-0.5">
              {label && <span className="mdt-leading-none">{label}</span>}
              {description && (
                <span className="mdt-text-xs mdt-leading-none mdt-text-muted-foreground">
                  {description}
                </span>
              )}
            </div>
          ) : (
            <div className="mdt-flex mdt-flex-1 mdt-items-center">{children}</div>
          )}
        </button>
      );
    }

    return (
      <div
        ref={ref}
        aria-disabled={disabled}
        className={cn(
          itemVariants({
            variant: active ? 'active' : variant,
            size,
            clickable: false,
          }),
          className
        )}
        {...props}
      >
        {icon && <span className="mdt-flex-shrink-0">{icon}</span>}
        {label || description ? (
          <div className="mdt-flex mdt-flex-1 mdt-flex-col mdt-gap-0.5">
            {label && <span className="mdt-leading-none">{label}</span>}
            {description && (
              <span className="mdt-text-xs mdt-leading-none mdt-text-muted-foreground">
                {description}
              </span>
            )}
          </div>
        ) : (
          <div className="mdt-flex mdt-flex-1 mdt-items-center">{children}</div>
        )}
      </div>
    );
  }
);

Item.displayName = 'Item';

export { Item };
