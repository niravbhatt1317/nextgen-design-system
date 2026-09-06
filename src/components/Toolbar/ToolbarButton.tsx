import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import { Badge } from '../Badge';
import type { ToolbarButtonProps } from './ToolbarButton.types';

/**
 * ToolbarButton styles.
 *
 * The console's toolbar control, measured on 4 September 2026: 32px tall, an
 * 8px corner, a 14px glyph and 13px medium label in slate (neutral-90), a
 * neutral-30 edge at rest. Hover, keyboard focus and open lift the ground to
 * neutral-10 and turn the edge slate. Active keeps the ground white and the
 * edge slate, and adds a count or a dot.
 *
 * The edge is always 1px. The three "on" looks share one edge colour so the
 * strip never shows two darknesses side by side.
 */
export const toolbarButtonVariants = cva(
  [
    'mdt-relative mdt-inline-flex mdt-h-8 mdt-shrink-0 mdt-items-center mdt-gap-1.5',
    'mdt-rounded-lg mdt-border mdt-border-solid mdt-border-neutral-30 mdt-bg-background',
    // 13px is the console's toolbar type: between the library's 12 and 14.
    'mdt-whitespace-nowrap mdt-text-[13px] mdt-font-medium mdt-leading-none mdt-text-neutral-90',
    'mdt-transition-colors',
    '[&_svg]:mdt-pointer-events-none [&_svg]:mdt-size-3.5 [&_svg]:mdt-shrink-0',
    // hover and keyboard focus: the ground lifts one step, the edge turns slate
    'hover:mdt-border-neutral-90 hover:mdt-bg-neutral-10',
    'focus-visible:mdt-border-neutral-90 focus-visible:mdt-bg-neutral-10 focus-visible:mdt-outline-none',
    // open, as a Radix trigger reports it: the same as hover
    'data-[state=open]:mdt-border-neutral-90 data-[state=open]:mdt-bg-neutral-10',
    'disabled:mdt-pointer-events-none disabled:mdt-opacity-50',
    'dark:mdt-border-neutral-110 dark:mdt-text-neutral-40',
    'dark:hover:mdt-border-neutral-60 dark:hover:mdt-bg-neutral-120',
    'dark:focus-visible:mdt-border-neutral-60 dark:focus-visible:mdt-bg-neutral-120',
    'dark:data-[state=open]:mdt-border-neutral-60 dark:data-[state=open]:mdt-bg-neutral-120',
  ],
  {
    variants: {
      /** Set by the component: a label gets 10px before the glyph and 12px after the text; no label makes a square. */
      shape: {
        label: 'mdt-pl-2.5 mdt-pr-3',
        square: 'mdt-w-8 mdt-justify-center mdt-px-0',
      },
      /** The menu or drawer is showing: the hover look, held. */
      open: {
        true: 'mdt-border-neutral-90 mdt-bg-neutral-10 dark:mdt-border-neutral-60 dark:mdt-bg-neutral-120',
        false: '',
      },
      /** Something is applied: the edge stays slate, the ground stays white. */
      active: {
        true: 'mdt-border-neutral-90 dark:mdt-border-neutral-60',
        false: '',
      },
    },
    defaultVariants: {
      shape: 'label',
      open: false,
      active: false,
    },
  }
);

/**
 * The count wears the slate the glyph wears, on a white ground, so it reads as
 * part of the button rather than a second signal. `palette` is the Badge's
 * door for a colour that is not one of its tones.
 */
const COUNT_PALETTE = {
  fill: 'hsl(var(--mdt-neutral-90))',
  ink: 'hsl(var(--mdt-white))',
  dot: 'hsl(var(--mdt-neutral-90))',
};

/**
 * ToolbarButton - a control in a Toolbar strip: Filters, a quick filter, Sort, Columns.
 *
 * @example
 * ```tsx
 * <ToolbarButton icon={<Icon name="list-filter" />} count={2} onClick={openDrawer}>Filters</ToolbarButton>
 * <ToolbarButton icon={<Icon name="check-circle" />} dot aria-label="Status" />
 * <PopoverTrigger asChild><ToolbarButton icon={<Icon name="arrow-up-down" />} aria-label="Sort" /></PopoverTrigger>
 * ```
 */
const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(function ToolbarButton(
  {
    icon,
    open = false,
    active,
    count,
    dot = false,
    activeLabel = 'applied',
    className,
    children,
    type = 'button',
    ...rest
  },
  ref
) {
  const hasLabel = children !== undefined && children !== null && children !== '';
  const hasCount = typeof count === 'number' && count > 0;
  const isActive = active ?? (hasCount || dot);

  return (
    <button
      ref={ref}
      type={type}
      aria-expanded={open ? true : undefined}
      data-active={isActive ? 'true' : undefined}
      className={cn(
        toolbarButtonVariants({ shape: hasLabel ? 'label' : 'square', open, active: isActive }),
        className
      )}
      {...rest}
    >
      {icon}
      {hasLabel ? <span>{children}</span> : null}
      {hasCount ? (
        <>
          {/* 6px of gap plus 6px of margin: the count sits 12px after the label. */}
          <Badge
            size="sm"
            emphasis="solid"
            palette={COUNT_PALETTE}
            max={9}
            className="mdt-ml-1.5"
            aria-hidden="true"
            data-testid="toolbar-button-count"
          >
            {count}
          </Badge>
          <span className="mdt-sr-only">
            , {count} {activeLabel}
          </span>
        </>
      ) : null}
      {dot ? (
        <>
          <span
            className="mdt-absolute -mdt-right-px -mdt-top-px mdt-size-1.5 mdt-rounded-full mdt-bg-info mdt-ring-2 mdt-ring-background"
            aria-hidden="true"
            data-testid="toolbar-button-dot"
          />
          <span className="mdt-sr-only">, {activeLabel}</span>
        </>
      ) : null}
    </button>
  );
});

ToolbarButton.displayName = 'ToolbarButton';

export { ToolbarButton };
