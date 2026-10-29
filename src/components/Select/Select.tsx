'use client';

import { cva } from 'class-variance-authority';
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { cn } from '@/utils';
import { CHECKED_ROW_CLASSES, PICKED_ROW_CLASSES } from '@/utils/picked-row';
import { Icon } from '../Icon';
import { Input } from '../Input';
import type {
  SelectOption,
  SelectProps,
  SelectSize,
  SelectTriggerVariant,
  SelectValue,
} from './Select.types';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useVirtualizer } from '@tanstack/react-virtual';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../HoverCard';

// ============================================================================
// Shared CSS class constants to reduce duplication (SonarJS: no-duplicate-string)
// ============================================================================
/* EVERY OPTION READS LEFT, ON ONE LINE (Pranjal, 2026-10-17: "we really need to set some standard which you cannot
 * break"): a multi option is a <button>, which centres its text by default, so the row says left itself; the 8 gap keeps
 * a long name's "…" off the tick slot. */
const OPTION_ITEM_BASE_CLASSES =
  'mdt-group mdt-relative mdt-flex mdt-w-full mdt-cursor-default mdt-select-none mdt-items-center mdt-justify-between mdt-gap-2 mdt-text-left';
/* every option takes 8 above and below, one line or two (Pranjal, 2026-10-16: "8 of padding top and bottom per option" -
 * what the console has drawn since) */
const OPTION_ITEM_STYLE_CLASSES =
  'mdt-rounded-sm mdt-py-2 mdt-pl-2 mdt-pr-2 mdt-text-sm mdt-outline-none';
/* the option's prefix and words: they take the room the tick slot leaves and may shrink, so the words can end in "…" */
const OPTION_LEAD_CLASSES = 'mdt-flex mdt-min-w-0 mdt-flex-1 mdt-items-center mdt-gap-2';
/* THE CLOSED FIELD'S VALUE (Pranjal, 2026-10-16: "only show the selection" + "and truncate it"): the chosen label alone,
 * left, on one line, ending in "…" - it fills the room between the prefix and the chevron and may shrink */
const TRIGGER_VALUE_CLASSES = 'mdt-min-w-0 mdt-flex-1 mdt-truncate mdt-text-left';
/* THE OPEN LIST'S WIDTH (Pranjal, 2026-10-17): at least the field, growing to fit its longest option, never past 320 -
 * or the window less 16 a side on a narrow screen. Past that an option ends in "…". */
const LIST_MAX_WIDTH_CLASSES = 'mdt-max-w-[min(320px,calc(100vw_-_32px))]';
const OPTION_ITEM_STATE_CLASSES =
  'mdt-text-foreground hover:mdt-bg-neutral-10 disabled:mdt-pointer-events-none disabled:mdt-opacity-50';
const OPTION_ITEM_DATA_STATE_CLASSES =
  'data-[disabled]:mdt-pointer-events-none data-[disabled]:mdt-opacity-50';
const SHRINK_TRANSITION_OPACITY = 'mdt-shrink-0 mdt-transition-opacity';
const OPACITY_HIDDEN_ON_HOVER = 'mdt-opacity-0 group-hover:mdt-opacity-50';

// ============================================================================
// Helper Components to reduce cognitive complexity
// ============================================================================

/**
 * Renders the option icon/avatar prefix
 */
function OptionPrefix({ option }: Readonly<{ option: SelectOption }>) {
  return (
    <>
      {option.avatar && (
        <img
          src={option.avatar}
          alt={option.label}
          className="mdt-h-5 mdt-w-5 mdt-flex-shrink-0 mdt-rounded-full"
        />
      )}
      {option.icon && (
        <span className="mdt-flex mdt-flex-shrink-0 mdt-items-center">{option.icon}</span>
      )}
    </>
  );
}

/**
 * Renders the selection indicator in a fixed 16 slot on the right, so labels never shift.
 *
 * A picked row keeps its tick in every state, the pointer included (Nirav, 2026-10-21). An unpicked row shows
 * nothing, under the pointer too (Pranjal, 2026-10-21): the grey ground says "here", the tick says "picked", and a
 * faint tick on hover said both at once.
 *
 * The multi list used to swap a picked row's tick for an X under the pointer, to advertise that a click there
 * deselects. That is the same defect one step along: it took the "picked" mark away exactly when you pointed at the
 * row, so running the mouse down a list of picks blanked each one in turn. The pale blue-10 ground already says
 * "picked" and the row is still a toggle - the X only cost the tick. Removed with `deselectable`, the flag that
 * existed solely to switch it (Pranjal, 2026-09-25: "why does it show x icon when hovered on selected one").
 */
function SelectionIndicator({ isSelected }: Readonly<{ isSelected: boolean }>) {
  return (
    <span className="mdt-flex mdt-h-4 mdt-w-4 mdt-flex-shrink-0 mdt-items-center mdt-justify-center">
      {isSelected && <Icon name="check" size={16} aria-hidden />}
    </span>
  );
}

/**
 * Renders option content with label and description, each on one line ending in "…" when it does not fit.
 *
 * The name reads like the chosen value in the closed field - 14/500 in the reading ink, neutral-130 (Pranjal,
 * 2026-10-16: "SELECTED TEXT AND THE TEXT INSIDE DROPDOWN LOOKS DIFFERENT"). The description sits 2 below it, one step
 * lighter but still readable: --mdt-option-subtext, neutral-80 in light (5.25:1 on white) and neutral-60 in dark (4.9:1
 * on the dark list) - never the faint grey (2.6:1).
 *
 * `label` replaces the name's content: the single list passes Radix's ItemText there, so that only the name - never
 * the description - is what the closed field mirrors.
 */
function OptionContent({
  option,
  asColumn = false,
  label,
  descriptionId,
}: Readonly<{
  option: SelectOption;
  asColumn?: boolean;
  label?: ReactNode;
  descriptionId?: string | undefined;
}>) {
  return (
    <div className={cn('mdt-flex mdt-min-w-0 mdt-flex-col', asColumn && 'mdt-items-start')}>
      <span className="mdt-max-w-full mdt-truncate mdt-font-medium mdt-text-neutral-130">
        {label ?? option.label}
      </span>
      {option.description && (
        <span
          id={descriptionId}
          className="mdt-mt-0.5 mdt-max-w-full mdt-truncate mdt-text-xs mdt-text-[hsl(var(--mdt-option-subtext))]"
        >
          {option.description}
        </span>
      )}
    </div>
  );
}

/**
 * Renders the separator line between selected and unselected items
 */
function OptionSeparator({ show }: Readonly<{ show: boolean }>) {
  if (!show) return null;
  return <div className="mdt-my-1 mdt-h-px mdt-bg-border" />;
}

/**
 * Props for the multi-select option button
 */
interface MultiSelectOptionButtonProps {
  option: SelectOption;
  isSelected: boolean;
  onToggle: (value: string) => void;
}

/**
 * Renders a multi-select option as a button. The picked row wears the pale blue-10 ground in every state, the pointer
 * included (Pranjal, 2026-10-21) - the merger drops the grey hover ground because the picked classes come last.
 */
function MultiSelectOptionButton({
  option,
  isSelected,
  onToggle,
}: Readonly<MultiSelectOptionButtonProps>) {
  return (
    <button
      type="button"
      onClick={() => {
        onToggle(option.value.toString());
      }}
      disabled={option.disabled}
      className={cn(
        OPTION_ITEM_BASE_CLASSES,
        OPTION_ITEM_STYLE_CLASSES,
        OPTION_ITEM_STATE_CLASSES,
        isSelected && PICKED_ROW_CLASSES
      )}
    >
      <div className={OPTION_LEAD_CLASSES}>
        <OptionPrefix option={option} />
        <OptionContent option={option} asColumn />
      </div>
      <SelectionIndicator isSelected={isSelected} />
    </button>
  );
}

/**
 * Props for custom render item wrapper
 */
interface CustomRenderItemWrapperProps {
  option: SelectOption;
  isSelected: boolean;
  onToggle: (value: string) => void;
  renderItem: (props: { option: SelectOption; selected: boolean; disabled: boolean }) => ReactNode;
}

/**
 * Wrapper for custom rendered items with accessibility
 */
function CustomRenderItemWrapper({
  option,
  isSelected,
  onToggle,
  renderItem,
}: Readonly<CustomRenderItemWrapperProps>) {
  return (
    <button
      type="button"
      disabled={option.disabled}
      aria-label={`${isSelected ? 'Deselect' : 'Select'} ${option.label}`}
      onClick={() => {
        if (!option.disabled) {
          onToggle(option.value.toString());
        }
      }}
      className="mdt-w-full mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-left"
    >
      {renderItem({
        option,
        selected: isSelected,
        disabled: option.disabled ?? false,
      })}
    </button>
  );
}

/**
 * Select trigger variants using Class Variance Authority (CVA)
 */
export const selectTriggerVariants = cva(
  [
    /* THE FIELD (Pranjal, 2026-09-17; the value's ink 2026-09-27): the trigger is the Input's box - corners 8, the value in the reading ink (neutral-130, 14/500), the primary border
     * under the pointer and, open or focused, with the 3-px halo; disabled on neutral-10 */
    'mdt-flex mdt-w-full mdt-items-center mdt-justify-between',
    'mdt-rounded-lg',
    /* THE FORM LADDER (Pranjal, 2026-09-17; the value's ink 2026-09-27): what a
     * person typed is READING text - the reading ink at 14/500, the same as a
     * picked Select value - and the placeholder stays faint at 400. The two had
     * been one weight and one ink apart from each other, so a filled field read
     * like an empty one. The weight is set here and undone on the placeholder,
     * because a placeholder inherits it otherwise. */
    'mdt-bg-background mdt-font-medium mdt-text-neutral-130',
    'mdt-transition-[border-color,box-shadow]',
    'focus-visible:mdt-border-primary focus-visible:mdt-shadow-[0_0_0_3px_hsl(var(--mdt-primary)/0.08)] focus-visible:mdt-outline-none',
    'data-[state=open]:mdt-border-primary data-[state=open]:mdt-shadow-[0_0_0_3px_hsl(var(--mdt-primary)/0.08)]',
    'aria-expanded:mdt-border-primary aria-expanded:mdt-shadow-[0_0_0_3px_hsl(var(--mdt-primary)/0.08)]',
    'disabled:mdt-cursor-not-allowed disabled:mdt-bg-neutral-10 disabled:mdt-text-faint',
    'data-[placeholder]:mdt-font-normal data-[placeholder]:mdt-text-faint',
  ],
  {
    variants: {
      variant: {
        default:
          'mdt-border mdt-border-neutral-30 hover:mdt-border-primary disabled:hover:mdt-border-neutral-30',
        borderless: 'mdt-border mdt-border-transparent hover:mdt-border-neutral-30',
      },
      size: {
        /* 14, not 13: the ladder's reading text, in the 32 box (2026-09-17). */
        sm: 'mdt-h-8 mdt-gap-1 mdt-px-3 mdt-text-sm',
        md: 'mdt-h-9 mdt-gap-2 mdt-px-3 mdt-text-sm',
        lg: 'mdt-h-10 mdt-gap-2 mdt-px-4 mdt-text-base',
      },
      hasError: {
        true: 'mdt-border-destructive hover:mdt-border-destructive',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
      hasError: false,
    },
  }
);

// ============================================================================
// Single Select Mode Renderer - Extracted to reduce cognitive complexity
// ============================================================================

/**
 * Renders single select mode using Radix UI Select primitive
 */
function renderSingleSelectMode(props: {
  currentValue: SelectValue;
  wrapperClassName?: string;
  label?: string;
  selectId: string;
  required?: boolean;
  handleValueChange: (value: string | null) => void;
  open: boolean;
  handleOpenChange: (isOpen: boolean) => void;
  disabled?: boolean;
  name?: string;
  ref: React.Ref<HTMLButtonElement>;
  variant: SelectTriggerVariant;
  size: SelectSize;
  hasError: boolean;
  className?: string;
  ariaLabel?: string;
  errorId: string;
  helperText?: string;
  helperId: string;
  ariaDescribedBy?: string;
  ariaInvalid?: boolean;
  prefixIcon?: ReactNode;
  placeholder?: string;
  _clearable: boolean;
  locked: boolean;
  position: 'item-aligned' | 'popper';
  placement: 'bottom' | 'overlay';
  maxHeight: number;
  sortedOptions: SelectOption[];
  showSelectedOnTop: boolean;
  filteredOptions: SelectOption[];
  renderEmpty?: () => ReactNode;
  emptyMessage: string;
  error?: string;
}) {
  const {
    currentValue,
    wrapperClassName,
    label,
    selectId,
    required,
    handleValueChange,
    open,
    handleOpenChange,
    disabled,
    name,
    ref,
    variant,
    size,
    hasError,
    className,
    ariaLabel,
    errorId,
    helperText,
    helperId,
    ariaDescribedBy,
    ariaInvalid,
    prefixIcon,
    placeholder,
    _clearable,
    locked,
    position,
    placement,
    maxHeight,
    sortedOptions,
    showSelectedOnTop,
    filteredOptions,
    renderEmpty,
    emptyMessage,
    error,
  } = props;

  const singleValue = Array.isArray(currentValue) ? currentValue[0] : currentValue;

  let describedBy: string | undefined;
  if (hasError) {
    describedBy = errorId;
  } else if (helperText) {
    describedBy = helperId;
  } else {
    describedBy = ariaDescribedBy;
  }

  return (
    <div className={cn('mdt-flex mdt-flex-col mdt-gap-1.5', wrapperClassName)}>
      {label && (
        <label htmlFor={selectId} className="mdt-text-[13px] mdt-font-medium mdt-text-neutral-90">
          {label}
          {required && <span className="mdt-ml-1 mdt-text-destructive">*</span>}
        </label>
      )}

      <SelectPrimitive.Root
        /* Radix is driven by this wrapper in both modes - `currentValue` is authoritative either way (see
         * `isControlled` below), so the value is always handed over, and "nothing picked" is the empty string.
         * It was a `&&` spread, which dropped the prop for null and "" alike: a controlled field cleared to null
         * left Radix uncontrolled holding its last pick, so re-picking that same option fired nothing. */
        value={typeof singleValue === 'string' ? singleValue : ''}
        onValueChange={(val) => {
          handleValueChange(val || null);
        }}
        open={open}
        onOpenChange={handleOpenChange}
        {...(disabled && { disabled })}
        {...(name && { name })}
        {...(required && { required })}
      >
        <SelectPrimitive.Trigger
          ref={ref}
          id={selectId}
          className={cn('mdt-group', selectTriggerVariants({ variant, size, hasError }), className)}
          aria-label={ariaLabel}
          aria-describedby={describedBy}
          aria-invalid={ariaInvalid ?? hasError}
        >
          {prefixIcon && (
            <span className="mdt-flex mdt-shrink-0 mdt-items-center mdt-text-muted-foreground">
              {prefixIcon}
            </span>
          )}
          {/* Radix drops any className given to Value (it is not meant to be styled), so the one-line rule sits on a
           * span around it - the `mdt-truncate` the Value carried before never reached the page */}
          <span className={TRIGGER_VALUE_CLASSES}>
            <SelectPrimitive.Value placeholder={placeholder} />
          </span>
          {renderSingleSelectIcons({ _clearable, singleValue, handleValueChange, variant, locked })}
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position={position}
            side="bottom"
            align="start"
            className={cn(
              /* the list's floor and ceiling sit on the same box, so a field wider than 320 still gets a list as wide
               * as itself (a floor beats a ceiling); 8rem stays the floor under a very narrow field */
              'mdt-relative mdt-z-50 mdt-overflow-hidden',
              'mdt-min-w-[max(8rem,var(--radix-select-trigger-width,0px))]',
              LIST_MAX_WIDTH_CLASSES,
              'mdt-rounded-md mdt-border mdt-bg-popover mdt-text-popover-foreground mdt-shadow-md',
              'data-[state=open]:mdt-animate-in data-[state=closed]:mdt-animate-out',
              'data-[state=closed]:mdt-fade-out-0 data-[state=open]:mdt-fade-in-0',
              'data-[state=closed]:mdt-zoom-out-95 data-[state=open]:mdt-zoom-in-95',
              'data-[side=bottom]:mdt-slide-in-from-top-2',
              'data-[side=left]:mdt-slide-in-from-right-2',
              'data-[side=right]:mdt-slide-in-from-left-2',
              'data-[side=top]:mdt-slide-in-from-bottom-2'
            )}
            sideOffset={placement === 'overlay' ? -40 : 4}
            alignOffset={0}
          >
            <SelectPrimitive.Viewport
              className={cn(
                'mdt-p-1',
                position === 'popper' &&
                  'mdt-h-[var(--radix-select-trigger-height)] mdt-w-full mdt-min-w-[var(--radix-select-trigger-width)]'
              )}
              style={{ maxHeight: `${String(maxHeight)}px` }}
            >
              {sortedOptions.map((option, index) => {
                const selectedValues = currentValue ? [currentValue] : [];
                const selectedCount = sortedOptions.filter((opt) =>
                  selectedValues.includes(opt.value.toString())
                ).length;
                const showSeparator =
                  showSelectedOnTop && selectedCount > 0 && index === selectedCount - 1;
                const isSelected = currentValue === option.value.toString();
                /* the description is not part of the option's name any more (only the name is ItemText), so it is
                 * announced as the option's description instead */
                const descriptionId = option.description
                  ? `${selectId}-option-${String(index)}-description`
                  : undefined;

                return (
                  <div key={option.value}>
                    <SelectPrimitive.Item
                      value={option.value.toString()}
                      {...(option.disabled && { disabled: option.disabled })}
                      {...(descriptionId && { 'aria-describedby': descriptionId })}
                      className={cn(
                        OPTION_ITEM_BASE_CLASSES,
                        OPTION_ITEM_STYLE_CLASSES,
                        /* the keyboard highlight takes the same grey ground as the pointer (Pranjal, 2026-10-21) */
                        'mdt-text-foreground hover:mdt-bg-neutral-10 data-[highlighted]:mdt-bg-neutral-10',
                        /* the picked option wears blue-10 - the ground a selected row wears everywhere else (Pranjal,
                         * 2026-09-25: "give some bg color to selected option otherwise its not visible properly"),
                         * and keeps it under the pointer and the keyboard (2026-10-21) */
                        CHECKED_ROW_CLASSES,
                        OPTION_ITEM_DATA_STATE_CLASSES
                      )}
                    >
                      <div className={OPTION_LEAD_CLASSES}>
                        <OptionPrefix option={option} />
                        {/* ONLY THE NAME IS ItemText (Pranjal, 2026-10-16): Radix mirrors ItemText into the closed
                         * field whole, so the description and its line used to show under the chosen value there */}
                        <OptionContent
                          option={option}
                          label={
                            <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                          }
                          descriptionId={descriptionId}
                        />
                      </div>
                      <SelectionIndicator isSelected={isSelected} />
                    </SelectPrimitive.Item>
                    <OptionSeparator show={showSeparator} />
                  </div>
                );
              })}

              {filteredOptions.length === 0 && (
                <div className="mdt-py-6 mdt-text-center mdt-text-sm mdt-text-muted-foreground">
                  {renderEmpty ? renderEmpty() : emptyMessage}
                </div>
              )}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {error && (
        <p
          id={errorId}
          className="mdt-flex mdt-items-center mdt-gap-1.5 mdt-text-xs mdt-text-destructive"
          role="alert"
        >
          {/* the alert mark, 12, before the message (K-Field-10) */}
          <Icon name="alert-circle" size={12} aria-hidden />
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={helperId} className="mdt-text-xs mdt-text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  );
}

/**
 * Renders clear/chevron icons for single select trigger
 */
function renderSingleSelectIcons(props: {
  _clearable: boolean;
  singleValue: string | null | undefined;
  handleValueChange: (value: string | null) => void;
  variant: SelectTriggerVariant;
  locked: boolean;
}) {
  const { _clearable, singleValue, handleValueChange, variant, locked } = props;

  /* A HELD FIELD (Pranjal, 2026-09-17): the lock in place of the chevron - a held field cannot open */
  if (locked) {
    return (
      <span className="mdt-flex mdt-shrink-0 mdt-items-center mdt-text-faint">
        <Icon name="lock" size={14} aria-hidden />
      </span>
    );
  }

  return (
    <span className="mdt-group/icon mdt-relative mdt-flex mdt-shrink-0 mdt-items-center">
      {_clearable && singleValue ? (
        <>
          {/* Clear button - visible on hover */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleValueChange(null);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
                e.preventDefault();
                handleValueChange(null);
              }
            }}
            className="mdt-absolute mdt-inset-0 mdt-flex mdt-cursor-pointer mdt-items-center mdt-justify-center mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-muted-foreground mdt-opacity-0 mdt-transition-colors hover:mdt-text-foreground focus:mdt-opacity-100 group-hover/icon:mdt-opacity-100"
            aria-label="Clear selection"
          >
            <Icon name="x" size={14} aria-hidden />
          </button>
          {/* Chevron - hidden on hover */}
          <SelectPrimitive.Icon asChild>
            <Icon
              name="chevron-down"
              size={16}
              className={cn(
                SHRINK_TRANSITION_OPACITY,
                variant === 'borderless'
                  ? OPACITY_HIDDEN_ON_HOVER
                  : 'mdt-opacity-50 group-hover/icon:mdt-opacity-0'
              )}
              aria-hidden
            />
          </SelectPrimitive.Icon>
        </>
      ) : (
        /* No clear button - just show chevron */
        <SelectPrimitive.Icon asChild>
          <Icon
            name="chevron-down"
            size={16}
            className={cn(
              SHRINK_TRANSITION_OPACITY,
              variant === 'borderless' ? OPACITY_HIDDEN_ON_HOVER : 'mdt-opacity-50'
            )}
            aria-hidden
          />
        </SelectPrimitive.Icon>
      )}
    </span>
  );
}

// ============================================================================
// Multi-Select Mode Helper Functions - Extracted to reduce cognitive complexity
// ============================================================================

/**
 * Renders a single pill in the multi-select trigger. A pill shrinks before the field grows: its name ends in "…". It
 * takes whatever room the "+N" leaves - it used to stop 64 short of the row's end to keep a "+N" off a second line,
 * which a row that never wraps does not need, and which left a gap beside the "+N" or cut a lone pick early.
 */
function renderPill(
  option: SelectOption,
  handlePillRemove: (value: string) => void,
  _pillHoverCard: boolean,
  _renderPillHoverCard?: (props: { option: SelectOption }) => ReactNode
) {
  const pillContent = (
    <span
      key={option.value}
      className="mdt-select-pill mdt-inline-flex mdt-h-[22px] mdt-min-w-0 mdt-max-w-full mdt-shrink mdt-items-center mdt-gap-1 mdt-rounded-md mdt-bg-neutral-20 mdt-py-0 mdt-pl-2 mdt-pr-1 mdt-text-xs mdt-font-medium mdt-text-neutral-90"
    >
      {option.avatar && (
        <img src={option.avatar} alt={option.label} className="mdt-h-4 mdt-w-4 mdt-rounded-full" />
      )}
      {option.icon && (
        <span className="mdt-flex mdt-h-4 mdt-w-4 mdt-items-center">{option.icon}</span>
      )}
      <span className="mdt-truncate">{option.label}</span>
      <button
        type="button"
        aria-label={`Remove ${option.label}`}
        onClick={(e) => {
          e.stopPropagation();
          handlePillRemove(option.value.toString());
        }}
        /* a disabled or held trigger offers no removal (the field mock, 2026-09-17) */
        className="mdt-hover:bg-accent mdt-hover:text-accent-foreground mdt-ml-0.5 mdt-cursor-pointer mdt-rounded-sm mdt-border-0 mdt-bg-transparent mdt-p-0 group-disabled:mdt-hidden"
      >
        <Icon name="x" size={12} aria-hidden />
      </button>
    </span>
  );

  // Wrap with HoverCard if enabled
  if (_pillHoverCard && _renderPillHoverCard) {
    return (
      <HoverCard key={option.value}>
        <HoverCardTrigger asChild>{pillContent}</HoverCardTrigger>
        <HoverCardContent>{_renderPillHoverCard({ option })}</HoverCardContent>
      </HoverCard>
    );
  }

  return pillContent;
}

/**
 * Renders the selected value display based on showPills configuration
 */
function renderSelectedValueDisplay(props: {
  _showPills: boolean;
  selectedOptions: SelectOption[];
  _maxPills: number;
  _overflowLabel: (hidden: number) => string;
  handlePillRemove: (value: string) => void;
  _pillHoverCard: boolean;
  _renderPillHoverCard: ((props: { option: SelectOption }) => ReactNode) | undefined;
  placeholder: string;
}): ReactNode {
  const {
    _showPills,
    selectedOptions,
    _maxPills,
    _overflowLabel,
    handlePillRemove,
    _pillHoverCard,
    _renderPillHoverCard,
    placeholder,
  } = props;

  // Show pills if enabled and there are selected options
  if (_showPills && selectedOptions.length > 0) {
    return (
      <>
        {selectedOptions
          .slice(0, _maxPills)
          .map((option) =>
            renderPill(option, handlePillRemove, _pillHoverCard, _renderPillHoverCard)
          )}
        {/* the "+N" never shrinks: a pill gives way to it */}
        {selectedOptions.length > _maxPills && (
          <span className="mdt-select-overflow mdt-inline-flex mdt-h-[22px] mdt-shrink-0 mdt-items-center mdt-whitespace-nowrap mdt-rounded-md mdt-bg-neutral-20 mdt-px-1.5 mdt-text-xs mdt-font-medium mdt-text-neutral-90">
            {_overflowLabel(selectedOptions.length - _maxPills)}
          </span>
        )}
      </>
    );
  }

  // Show count if there are selected options
  if (selectedOptions.length > 0) {
    return <span className="mdt-truncate">{selectedOptions.length} selected</span>;
  }

  // Show placeholder when no selection
  /* the placeholder at the trigger's own size in the faint ink #8FA0BD (K-Field-02, K-Field-03) - it read 14 in the
   * muted grey before (measured 2026-09-22 against the mock); one line, "…" when long, like every value */
  return <span className="mdt-truncate mdt-text-faint">{placeholder}</span>;
}

/**
 * Renders the trigger content for multi-select mode
 */
function renderMultiSelectTriggerContent(props: {
  prefixIcon?: ReactNode;
  _showPills: boolean;
  selectedOptions: SelectOption[];
  _maxPills: number;
  _overflowLabel: (hidden: number) => string;
  handlePillRemove: (value: string) => void;
  _pillHoverCard: boolean;
  _renderPillHoverCard?: (props: { option: SelectOption }) => ReactNode;
  placeholder: string;
}) {
  const {
    prefixIcon,
    _showPills,
    selectedOptions,
    _maxPills,
    _overflowLabel,
    handlePillRemove,
    _pillHoverCard,
    _renderPillHoverCard,
    placeholder,
  } = props;

  /* A MULTI-PICK FIELD NEVER GROWS PAST ITS HEIGHT (Pranjal, 2026-10-17, on picks stacked three lines out of their
   * field: "we really need to set some standard which you cannot break"): its picks stay on one line - they used to
   * wrap - a pill shrinks to "…", and the row clips rather than spilling over the chevron. `mdt-select-picks` names the
   * row for a page's own checks. */
  return (
    <div className="mdt-select-picks mdt-flex mdt-min-w-0 mdt-flex-1 mdt-flex-nowrap mdt-items-center mdt-gap-1 mdt-overflow-hidden">
      {prefixIcon && (
        <span className="mdt-flex mdt-shrink-0 mdt-items-center mdt-text-muted-foreground">
          {prefixIcon}
        </span>
      )}
      {renderSelectedValueDisplay({
        _showPills,
        selectedOptions,
        _maxPills,
        _overflowLabel,
        handlePillRemove,
        _pillHoverCard,
        _renderPillHoverCard,
        placeholder,
      })}
    </div>
  );
}

/**
 * Renders the default multi-select trigger button
 */
function renderDefaultMultiSelectTrigger(props: {
  ref: React.Ref<HTMLButtonElement>;
  selectId: string;
  disabled?: boolean;
  variant: SelectTriggerVariant;
  size: SelectSize;
  hasError: boolean;
  className?: string;
  ariaLabel?: string;
  multiSelectDescribedBy?: string;
  open: boolean;
  prefixIcon?: ReactNode;
  _showPills: boolean;
  selectedOptions: SelectOption[];
  _maxPills: number;
  _overflowLabel: (hidden: number) => string;
  handlePillRemove: (value: string) => void;
  _pillHoverCard: boolean;
  _renderPillHoverCard?: (props: { option: SelectOption }) => ReactNode;
  placeholder: string;
  _clearable: boolean;
  locked: boolean;
  handleClearAll: () => void;
}): ReactNode {
  const {
    ref,
    selectId,
    disabled,
    variant,
    size,
    hasError,
    className,
    ariaLabel,
    multiSelectDescribedBy,
    open,
    prefixIcon,
    _showPills,
    selectedOptions,
    _maxPills,
    _overflowLabel,
    handlePillRemove,
    _pillHoverCard,
    _renderPillHoverCard,
    placeholder,
    _clearable,
    locked,
    handleClearAll,
  } = props;

  const showClearButton = _clearable && selectedOptions.length > 0 && !locked;

  return (
    <button
      ref={ref}
      id={selectId}
      type="button"
      disabled={disabled}
      className={cn(
        'mdt-group',
        selectTriggerVariants({ variant, size, hasError }),
        'mdt-min-h-fit',
        className
      )}
      aria-label={ariaLabel}
      aria-describedby={multiSelectDescribedBy}
      aria-expanded={open}
    >
      {renderMultiSelectTriggerContent({
        ...(prefixIcon && { prefixIcon }),
        _showPills,
        selectedOptions,
        _maxPills,
        _overflowLabel,
        handlePillRemove,
        _pillHoverCard,
        ...(_renderPillHoverCard && { _renderPillHoverCard }),
        placeholder,
      })}
      {showClearButton && (
        <button
          type="button"
          aria-label="Clear all selections"
          onClick={(e) => {
            e.stopPropagation();
            handleClearAll();
          }}
          className="mdt-hover:bg-accent mdt-hover:text-accent-foreground mdt-flex mdt-shrink-0 mdt-cursor-pointer mdt-items-center mdt-rounded-sm mdt-border-0 mdt-bg-transparent mdt-p-1"
        >
          <Icon name="x" size={16} aria-hidden />
        </button>
      )}
      {locked ? (
        /* A HELD FIELD (Pranjal, 2026-09-17): the lock in place of the chevron */
        <Icon name="lock" size={14} className="mdt-shrink-0 mdt-text-faint" aria-hidden />
      ) : (
        <Icon
          name="chevron-down"
          size={16}
          className={cn(
            SHRINK_TRANSITION_OPACITY,
            variant === 'borderless' ? OPACITY_HIDDEN_ON_HOVER : 'mdt-opacity-50'
          )}
          aria-hidden
        />
      )}
    </button>
  );
}

/**
 * Renders the search input for multi-select dropdown
 */
function renderMultiSelectSearchInput(props: {
  _searchPlaceholder: string;
  searchQuery: string;
  handleSearchChange: (query: string) => void;
  _autoFocus: boolean;
}): ReactNode {
  const { _searchPlaceholder, searchQuery, handleSearchChange, _autoFocus } = props;

  return (
    <div className="mdt-border-b mdt-p-2">
      {/* the library field (Pranjal, 2026-10-11: every search clears with its ✕ and Escape); with nothing typed, Escape
       * passes through and closes the list as before */}
      <Input
        type="text"
        size="sm"
        placeholder={_searchPlaceholder}
        aria-label={_searchPlaceholder}
        value={searchQuery}
        onChange={(e) => {
          handleSearchChange(e.target.value);
        }}
        onClear={() => {
          handleSearchChange('');
        }}
        clearLabel="Clear search"
        // eslint-disable-next-line jsx-a11y/no-autofocus -- the list opens to type into its search
        autoFocus={_autoFocus}
      />
    </div>
  );
}

/**
 * Renders the select all button for multi-select dropdown
 */
function renderSelectAllButton(props: {
  handleSelectAll: () => void;
  filteredOptions: SelectOption[];
}): ReactNode {
  const { handleSelectAll, filteredOptions } = props;
  const enabledCount = filteredOptions.filter((o) => !o.disabled).length;

  return (
    <div className="mdt-border-b mdt-p-2">
      <button
        type="button"
        onClick={handleSelectAll}
        className="mdt-hover:underline mdt-w-full mdt-text-left mdt-text-sm mdt-text-primary"
      >
        Select all ({enabledCount})
      </button>
    </div>
  );
}

/**
 * Renders the load more button for multi-select dropdown
 */
function renderLoadMoreButton(props: { _loadMore: () => Promise<void> }): ReactNode {
  const { _loadMore } = props;

  return (
    <div className="mdt-border-t mdt-p-2">
      <button
        type="button"
        onClick={() => {
          _loadMore().catch((err: unknown) => {
            console.error('Failed to load more options:', err);
          });
        }}
        className="mdt-hover:underline mdt-w-full mdt-text-center mdt-text-sm mdt-text-primary"
      >
        Load more...
      </button>
    </div>
  );
}

/**
 * Renders the helper text or error message
 */
function renderHelperOrError(props: {
  error?: string;
  errorId: string;
  helperText?: string;
  helperId: string;
}): ReactNode {
  const { error, errorId, helperText, helperId } = props;

  if (error) {
    return (
      <p
        id={errorId}
        className="mdt-flex mdt-items-center mdt-gap-1.5 mdt-text-xs mdt-text-destructive"
        role="alert"
      >
        {/* the alert mark, 12, before the message (K-Field-10) */}
        <Icon name="alert-circle" size={12} aria-hidden />
        {error}
      </p>
    );
  }

  if (helperText) {
    return (
      <p id={helperId} className="mdt-text-xs mdt-text-muted-foreground">
        {helperText}
      </p>
    );
  }

  return null;
}

/**
 * Renders the label for the select component
 */
function renderSelectLabel(props: {
  label?: string;
  selectId: string;
  required?: boolean;
}): ReactNode {
  const { label, selectId, required } = props;

  if (!label) return null;

  return (
    <label htmlFor={selectId} className="mdt-text-[13px] mdt-font-medium mdt-text-neutral-90">
      {label}
      {required && <span className="mdt-ml-1 mdt-text-destructive">*</span>}
    </label>
  );
}

/**
 * Renders the popover dropdown content (search, select all, options, load more)
 */
function renderPopoverDropdownContent(props: {
  showSearchInput: boolean;
  _searchPlaceholder: string;
  searchQuery: string;
  handleSearchChange: (query: string) => void;
  _autoFocus: boolean;
  showSelectAllButton: boolean;
  handleSelectAll: () => void;
  filteredOptions: SelectOption[];
  parentRef: React.RefObject<HTMLDivElement>;
  maxHeight: number;
  _loading: boolean;
  displayOptions: SelectOption[];
  renderEmpty?: () => ReactNode;
  emptyMessage: string;
  _grouped: boolean;
  groupedOptions: { label: string; options: SelectOption[] }[] | null;
  multiValue: string[];
  _renderItem?: (props: {
    option: SelectOption;
    selected: boolean;
    disabled: boolean;
  }) => ReactNode;
  handleMultiSelectToggle: (value: string) => void;
  _virtual: boolean;
  itemsToRender:
    | SelectOption[]
    | ReturnType<ReturnType<typeof useVirtualizer<HTMLDivElement, Element>>['getVirtualItems']>;
  virtualizer: ReturnType<typeof useVirtualizer<HTMLDivElement, Element>>;
  sortedOptions: SelectOption[];
  showSelectedOnTop: boolean;
  showLoadMoreButton: boolean;
  _loadMore?: () => Promise<void>;
}): ReactNode {
  const {
    showSearchInput,
    _searchPlaceholder,
    searchQuery,
    handleSearchChange,
    _autoFocus,
    showSelectAllButton,
    handleSelectAll,
    filteredOptions,
    parentRef,
    maxHeight,
    _loading,
    displayOptions,
    renderEmpty,
    emptyMessage,
    _grouped,
    groupedOptions,
    multiValue,
    _renderItem,
    handleMultiSelectToggle,
    _virtual,
    itemsToRender,
    virtualizer,
    sortedOptions,
    showSelectedOnTop,
    showLoadMoreButton,
    _loadMore,
  } = props;

  return (
    <div className="mdt-flex mdt-flex-col">
      {showSearchInput &&
        renderMultiSelectSearchInput({
          _searchPlaceholder,
          searchQuery,
          handleSearchChange,
          _autoFocus,
        })}

      {showSelectAllButton && renderSelectAllButton({ handleSelectAll, filteredOptions })}

      <div
        ref={parentRef}
        className="mdt-overflow-y-auto mdt-p-1"
        style={{ maxHeight: `${String(maxHeight)}px` }}
      >
        {renderMultiSelectOptionsContent({
          _loading,
          displayOptions,
          ...(renderEmpty && { renderEmpty }),
          emptyMessage,
          _grouped,
          groupedOptions,
          multiValue,
          ...(_renderItem && { _renderItem }),
          handleMultiSelectToggle,
          _virtual,
          itemsToRender,
          virtualizer,
          sortedOptions,
          showSelectedOnTop,
        })}
      </div>

      {showLoadMoreButton && _loadMore && renderLoadMoreButton({ _loadMore })}
    </div>
  );
}

/**
 * Renders options list content for multi-select based on rendering mode
 */
function renderMultiSelectOptionsContent(props: {
  _loading: boolean;
  displayOptions: SelectOption[];
  renderEmpty?: () => ReactNode;
  emptyMessage: string;
  _grouped: boolean;
  groupedOptions: { label: string; options: SelectOption[] }[] | null;
  multiValue: string[];
  _renderItem?: (props: {
    option: SelectOption;
    selected: boolean;
    disabled: boolean;
  }) => ReactNode;
  handleMultiSelectToggle: (value: string) => void;
  _virtual: boolean;
  itemsToRender:
    | SelectOption[]
    | ReturnType<ReturnType<typeof useVirtualizer<HTMLDivElement, Element>>['getVirtualItems']>;
  virtualizer: ReturnType<typeof useVirtualizer<HTMLDivElement, Element>>;
  sortedOptions: SelectOption[];
  showSelectedOnTop: boolean;
}) {
  const {
    _loading,
    displayOptions,
    renderEmpty,
    emptyMessage,
    _grouped,
    groupedOptions,
    multiValue,
    _renderItem,
    handleMultiSelectToggle,
    _virtual,
    itemsToRender,
    virtualizer,
    sortedOptions,
    showSelectedOnTop,
  } = props;

  if (_loading) {
    return (
      <div className="mdt-py-6 mdt-text-center mdt-text-sm mdt-text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (displayOptions.length === 0) {
    return (
      <div className="mdt-py-6 mdt-text-center mdt-text-sm mdt-text-muted-foreground">
        {renderEmpty ? renderEmpty() : emptyMessage}
      </div>
    );
  }

  if (_grouped && groupedOptions) {
    return (
      <>
        {groupedOptions.map((group) => (
          <div key={group.label} className="mdt-py-1">
            <div className="mdt-px-2 mdt-py-1.5 mdt-text-xs mdt-font-semibold mdt-text-muted-foreground">
              {group.label}
            </div>
            {group.options.map((option) => {
              const isSelected = multiValue.includes(option.value.toString());

              if (_renderItem) {
                return (
                  <CustomRenderItemWrapper
                    key={option.value}
                    option={option}
                    isSelected={isSelected}
                    onToggle={handleMultiSelectToggle}
                    renderItem={_renderItem}
                  />
                );
              }

              return (
                <MultiSelectOptionButton
                  key={option.value}
                  option={option}
                  isSelected={isSelected}
                  onToggle={handleMultiSelectToggle}
                />
              );
            })}
          </div>
        ))}
      </>
    );
  }

  if (_virtual) {
    return (
      <div
        style={{
          height: `${String(virtualizer.getTotalSize())}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {(itemsToRender as ReturnType<typeof virtualizer.getVirtualItems>).map((virtualItem) => {
          const option = sortedOptions[virtualItem.index];
          if (!option) return null;
          const isSelected = multiValue.includes(option.value.toString());

          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${String(virtualItem.start)}px)`,
              }}
            >
              {_renderItem ? (
                <CustomRenderItemWrapper
                  option={option}
                  isSelected={isSelected}
                  onToggle={handleMultiSelectToggle}
                  renderItem={_renderItem}
                />
              ) : (
                <MultiSelectOptionButton
                  option={option}
                  isSelected={isSelected}
                  onToggle={handleMultiSelectToggle}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Regular rendering
  return (
    <>
      {(itemsToRender as SelectOption[]).map((option, index) => {
        const isSelected = multiValue.includes(option.value.toString());
        const selectedCount = (itemsToRender as SelectOption[]).filter((opt) =>
          multiValue.includes(opt.value.toString())
        ).length;
        const showSeparator = showSelectedOnTop && selectedCount > 0 && index === selectedCount - 1;

        // Custom item renderer
        if (_renderItem) {
          return (
            <div key={option.value}>
              <CustomRenderItemWrapper
                option={option}
                isSelected={isSelected}
                onToggle={handleMultiSelectToggle}
                renderItem={_renderItem}
              />
              <OptionSeparator show={showSeparator} />
            </div>
          );
        }

        return (
          <div key={option.value}>
            <MultiSelectOptionButton
              option={option}
              isSelected={isSelected}
              onToggle={handleMultiSelectToggle}
            />
            <OptionSeparator show={showSeparator} />
          </div>
        );
      })}
    </>
  );
}

/**
 * Custom hook for managing Select component state
 */
function useSelectState(props: {
  controlledValue: SelectValue | undefined;
  defaultValue: string | string[] | undefined;
  mode: 'single' | 'multiple';
  onChange: ((value: SelectValue) => void) | undefined;
}) {
  const { controlledValue, defaultValue, mode, onChange } = props;

  const initialValue = defaultValue ?? (mode === 'multiple' ? [] : null);
  const [internalValue, setInternalValue] = useState<SelectValue>(initialValue);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleValueChange = useCallback(
    (newValue: SelectValue) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  return {
    currentValue,
    open,
    setOpen,
    searchQuery,
    setSearchQuery,
    handleValueChange,
  };
}

/**
 * Custom hook for multi-select specific logic
 */
function useMultiSelectHandlers(props: {
  mode: 'single' | 'multiple';
  currentValue: SelectValue;
  options: SelectOption[];
  handleValueChange: (value: SelectValue) => void;
  onRemovePill: ((value: string) => void) | undefined;
}) {
  const { mode, currentValue, options, handleValueChange, onRemovePill } = props;

  const multiValue = useMemo(
    () => (Array.isArray(currentValue) ? currentValue : []),
    [currentValue]
  );

  const selectedOptions = useMemo(() => {
    if (mode !== 'multiple') return [];
    return options.filter((opt) => multiValue.includes(opt.value.toString()));
  }, [mode, options, multiValue]);

  const handleMultiSelectToggle = useCallback(
    (optionValue: string) => {
      const newValue = multiValue.includes(optionValue)
        ? multiValue.filter((v) => v !== optionValue)
        : [...multiValue, optionValue];
      handleValueChange(newValue);
    },
    [multiValue, handleValueChange]
  );

  const handlePillRemove = useCallback(
    (valueToRemove: string) => {
      const newValue = multiValue.filter((v) => v !== valueToRemove);
      handleValueChange(newValue);
      onRemovePill?.(valueToRemove);
    },
    [multiValue, handleValueChange, onRemovePill]
  );

  const handleClearAll = useCallback(() => {
    handleValueChange([]);
  }, [handleValueChange]);

  const handleSelectAll = useCallback(
    (filteredOptions: SelectOption[]) => {
      const allValues = filteredOptions
        .filter((opt) => !opt.disabled)
        .map((opt) => opt.value.toString());
      handleValueChange(allValues);
    },
    [handleValueChange]
  );

  return {
    multiValue,
    selectedOptions,
    handleMultiSelectToggle,
    handlePillRemove,
    handleClearAll,
    handleSelectAll,
  };
}

/**
 * Custom hook for search handling with debounce
 */
function useSelectSearch(props: {
  onSearch: ((query: string) => void) | undefined;
  onLoadOptions: ((query: string) => Promise<SelectOption[]>) | undefined;
  searchDebounce: number;
  setSearchQuery: (query: string) => void;
}) {
  const { onSearch, onLoadOptions, searchDebounce, setSearchQuery } = props;
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);

      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        onSearch?.(query);
        const loadPromise = onLoadOptions?.(query);
        if (loadPromise) {
          loadPromise.catch((error: unknown) => {
            console.error('Failed to load options:', error);
          });
        }
      }, searchDebounce);
    },
    [onSearch, onLoadOptions, searchDebounce, setSearchQuery]
  );

  useEffect(() => {
    const currentTimeout = searchTimeoutRef.current;
    return () => {
      if (currentTimeout) {
        clearTimeout(currentTimeout);
      }
    };
  }, []);

  return { handleSearchChange };
}

/**
 * Custom hook for sorting and grouping options
 */
function useOptionsProcessing(props: {
  filteredOptions: SelectOption[];
  showSelectedOnTop: boolean;
  mode: 'single' | 'multiple';
  multiValue: string[];
  currentValue: SelectValue;
  grouped: boolean;
}) {
  const { filteredOptions, showSelectedOnTop, mode, multiValue, currentValue, grouped } = props;

  // Sort options: show selected items on top if enabled
  const sortedOptions = useMemo(() => {
    if (!showSelectedOnTop) {
      return filteredOptions;
    }

    // Determine selected values based on mode
    let selectedValues: string[];
    if (mode === 'multiple') {
      selectedValues = multiValue;
    } else if (currentValue && typeof currentValue === 'string') {
      selectedValues = [currentValue];
    } else {
      selectedValues = [];
    }

    const selected = filteredOptions.filter((opt) => selectedValues.includes(opt.value.toString()));
    const unselected = filteredOptions.filter(
      (opt) => !selectedValues.includes(opt.value.toString())
    );

    return [...selected, ...unselected];
  }, [filteredOptions, showSelectedOnTop, mode, multiValue, currentValue]);

  // Group options if grouped prop is true
  const groupedOptions = useMemo(() => {
    if (!grouped) return null;

    const groups = new Map<string, SelectOption[]>();

    sortedOptions.forEach((option) => {
      const groupName = option.group ?? 'Other';
      if (!groups.has(groupName)) {
        groups.set(groupName, []);
      }
      groups.get(groupName)?.push(option);
    });

    return Array.from(groups.entries()).map(([label, opts]) => ({
      label,
      options: opts,
    }));
  }, [grouped, sortedOptions]);

  return { sortedOptions, groupedOptions };
}

/**
 * Custom hook for filtering options based on search query
 */
function useFilteredOptions(props: {
  options: SelectOption[];
  searchQuery: string;
  filterFn: ((option: SelectOption, query: string) => boolean) | undefined;
}) {
  const { options, searchQuery, filterFn } = props;

  return useMemo(() => {
    if (!searchQuery) return options;

    const defaultFilter = (option: SelectOption, query: string) => {
      const searchLower = query.toLowerCase();
      const labelMatch = option.label.toLowerCase().includes(searchLower);
      const descriptionMatch = option.description?.toLowerCase().includes(searchLower) ?? false;
      const valueMatch = option.value.toString().toLowerCase().includes(searchLower);
      return labelMatch || descriptionMatch || valueMatch;
    };

    const filter = filterFn ?? defaultFilter;
    return options.filter((option) => filter(option, searchQuery));
  }, [options, searchQuery, filterFn]);
}

/**
 * Custom hook for handling open/close state changes
 */
function useOpenChangeHandler(props: {
  setOpen: (isOpen: boolean) => void;
  setSearchQuery: (query: string) => void;
  onOpen: (() => void) | undefined;
  onClose: (() => void) | undefined;
}) {
  const { setOpen, setSearchQuery, onOpen, onClose } = props;

  return useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (isOpen) {
        onOpen?.();
      } else {
        onClose?.();
        setSearchQuery('');
      }
    },
    [setOpen, setSearchQuery, onOpen, onClose]
  );
}

/**
 * Computes aria-describedby value based on error/helper state
 */
function computeAriaDescribedBy(
  hasError: boolean,
  errorId: string,
  helperText: string | undefined,
  helperId: string,
  ariaDescribedBy: string | undefined
): string | undefined {
  if (hasError) return errorId;
  if (helperText) return helperId;
  return ariaDescribedBy;
}

/**
 * Computes popover offset based on placement
 */
function computePopoverOffset(placement: 'bottom' | 'overlay'): number {
  return placement === 'overlay' ? -40 : 4;
}

/**
 * Computes whether to show select all button
 */
function computeShowSelectAll(selectAll: boolean, optionsCount: number): boolean {
  return selectAll && optionsCount > 0;
}

/**
 * Assigns a value to a result object only if the value is defined (not undefined)
 * This helps with TypeScript's exactOptionalPropertyTypes
 */
function assignIfDefined<T extends object, K extends keyof T>(
  result: T,
  key: K,
  value: T[K] | undefined
): void {
  if (value !== undefined) {
    result[key] = value;
  }
}

/**
 * Builds props object for single select mode, handling optional properties
 */
function buildSingleSelectProps(params: {
  currentValue: SelectValue;
  wrapperClassName: string | undefined;
  label: string | undefined;
  selectId: string;
  required: boolean | undefined;
  handleValueChange: (value: string | null) => void;
  open: boolean;
  handleOpenChange: (isOpen: boolean) => void;
  disabled: boolean | undefined;
  name: string | undefined;
  ref: React.Ref<HTMLButtonElement>;
  variant: SelectTriggerVariant;
  size: SelectSize;
  hasError: boolean;
  className: string | undefined;
  ariaLabel: string | undefined;
  errorId: string;
  helperText: string | undefined;
  helperId: string;
  ariaDescribedBy: string | undefined;
  ariaInvalid: boolean | undefined;
  prefixIcon: ReactNode | undefined;
  placeholder: string | undefined;
  _clearable: boolean;
  locked: boolean;
  position: 'item-aligned' | 'popper';
  placement: 'bottom' | 'overlay';
  maxHeight: number;
  sortedOptions: SelectOption[];
  showSelectedOnTop: boolean;
  filteredOptions: SelectOption[];
  renderEmpty: (() => ReactNode) | undefined;
  emptyMessage: string;
  error: string | undefined;
}): Parameters<typeof renderSingleSelectMode>[0] {
  const result: Parameters<typeof renderSingleSelectMode>[0] = {
    currentValue: params.currentValue,
    selectId: params.selectId,
    handleValueChange: params.handleValueChange,
    open: params.open,
    handleOpenChange: params.handleOpenChange,
    ref: params.ref,
    variant: params.variant,
    size: params.size,
    hasError: params.hasError,
    errorId: params.errorId,
    helperId: params.helperId,
    _clearable: params._clearable,
    locked: params.locked,
    position: params.position,
    placement: params.placement,
    maxHeight: params.maxHeight,
    sortedOptions: params.sortedOptions,
    showSelectedOnTop: params.showSelectedOnTop,
    filteredOptions: params.filteredOptions,
    emptyMessage: params.emptyMessage,
  };

  assignIfDefined(result, 'wrapperClassName', params.wrapperClassName);
  assignIfDefined(result, 'label', params.label);
  assignIfDefined(result, 'required', params.required);
  assignIfDefined(result, 'disabled', params.disabled);
  assignIfDefined(result, 'name', params.name);
  assignIfDefined(result, 'className', params.className);
  assignIfDefined(result, 'ariaLabel', params.ariaLabel);
  assignIfDefined(result, 'helperText', params.helperText);
  assignIfDefined(result, 'ariaDescribedBy', params.ariaDescribedBy);
  assignIfDefined(result, 'ariaInvalid', params.ariaInvalid);
  assignIfDefined(result, 'prefixIcon', params.prefixIcon);
  assignIfDefined(result, 'placeholder', params.placeholder);
  assignIfDefined(result, 'renderEmpty', params.renderEmpty);
  assignIfDefined(result, 'error', params.error);

  return result;
}

/**
 * Builds props object for multi-select trigger
 */
function buildMultiSelectTriggerProps(params: {
  _renderTrigger:
    | ((props: {
        value: SelectValue;
        selectedOptions: SelectOption[];
        placeholder: string;
        open: boolean;
        disabled: boolean;
      }) => ReactNode)
    | undefined;
  currentValue: SelectValue;
  selectedOptions: SelectOption[];
  placeholder: string;
  open: boolean;
  disabled: boolean;
  ref: React.Ref<HTMLButtonElement>;
  selectId: string;
  variant: SelectTriggerVariant;
  size: SelectSize;
  hasError: boolean;
  className: string | undefined;
  ariaLabel: string | undefined;
  multiSelectDescribedBy: string | undefined;
  prefixIcon: ReactNode | undefined;
  _showPills: boolean;
  _maxPills: number;
  _overflowLabel: (hidden: number) => string;
  handlePillRemove: (value: string) => void;
  _pillHoverCard: boolean;
  _renderPillHoverCard: ((props: { option: SelectOption }) => ReactNode) | undefined;
  _clearable: boolean;
  locked: boolean;
  handleClearAll: () => void;
}): Parameters<typeof createMultiSelectTrigger>[0] {
  const result: Parameters<typeof createMultiSelectTrigger>[0] = {
    currentValue: params.currentValue,
    selectedOptions: params.selectedOptions,
    placeholder: params.placeholder,
    open: params.open,
    disabled: params.disabled,
    ref: params.ref,
    selectId: params.selectId,
    variant: params.variant,
    size: params.size,
    hasError: params.hasError,
    _showPills: params._showPills,
    _maxPills: params._maxPills,
    _overflowLabel: params._overflowLabel,
    handlePillRemove: params.handlePillRemove,
    _pillHoverCard: params._pillHoverCard,
    _clearable: params._clearable,
    locked: params.locked,
    handleClearAll: params.handleClearAll,
  };

  assignIfDefined(result, '_renderTrigger', params._renderTrigger);
  assignIfDefined(result, 'className', params.className);
  assignIfDefined(result, 'ariaLabel', params.ariaLabel);
  assignIfDefined(result, 'multiSelectDescribedBy', params.multiSelectDescribedBy);
  assignIfDefined(result, 'prefixIcon', params.prefixIcon);
  assignIfDefined(result, '_renderPillHoverCard', params._renderPillHoverCard);

  return result;
}

/**
 * Builds props object for multi-select mode
 */
function buildMultiSelectModeProps(params: {
  wrapperClassName: string | undefined;
  label: string | undefined;
  selectId: string;
  required: boolean | undefined;
  open: boolean;
  handleOpenChange: (isOpen: boolean) => void;
  triggerElement: ReactNode;
  popoverSideOffset: number;
  showSearchInput: boolean;
  _searchPlaceholder: string;
  searchQuery: string;
  handleSearchChange: (query: string) => void;
  _autoFocus: boolean;
  showSelectAllButton: boolean;
  handleSelectAll: () => void;
  filteredOptions: SelectOption[];
  parentRef: React.RefObject<HTMLDivElement>;
  maxHeight: number;
  _loading: boolean;
  displayOptions: SelectOption[];
  renderEmpty: (() => ReactNode) | undefined;
  emptyMessage: string;
  _grouped: boolean;
  groupedOptions: { label: string; options: SelectOption[] }[] | null;
  multiValue: string[];
  _renderItem:
    | ((props: { option: SelectOption; selected: boolean; disabled: boolean }) => ReactNode)
    | undefined;
  handleMultiSelectToggle: (value: string) => void;
  _virtual: boolean;
  itemsToRender:
    | SelectOption[]
    | ReturnType<ReturnType<typeof useVirtualizer<HTMLDivElement, Element>>['getVirtualItems']>;
  virtualizer: ReturnType<typeof useVirtualizer<HTMLDivElement, Element>>;
  sortedOptions: SelectOption[];
  showSelectedOnTop: boolean;
  showLoadMoreButton: boolean;
  _loadMore: (() => Promise<void>) | undefined;
  error: string | undefined;
  errorId: string;
  helperText: string | undefined;
  helperId: string;
}): MultiSelectModeProps {
  const result: MultiSelectModeProps = {
    selectId: params.selectId,
    open: params.open,
    handleOpenChange: params.handleOpenChange,
    triggerElement: params.triggerElement,
    popoverSideOffset: params.popoverSideOffset,
    showSearchInput: params.showSearchInput,
    _searchPlaceholder: params._searchPlaceholder,
    searchQuery: params.searchQuery,
    handleSearchChange: params.handleSearchChange,
    _autoFocus: params._autoFocus,
    showSelectAllButton: params.showSelectAllButton,
    handleSelectAll: params.handleSelectAll,
    filteredOptions: params.filteredOptions,
    parentRef: params.parentRef,
    maxHeight: params.maxHeight,
    _loading: params._loading,
    displayOptions: params.displayOptions,
    emptyMessage: params.emptyMessage,
    _grouped: params._grouped,
    groupedOptions: params.groupedOptions,
    multiValue: params.multiValue,
    handleMultiSelectToggle: params.handleMultiSelectToggle,
    _virtual: params._virtual,
    itemsToRender: params.itemsToRender,
    virtualizer: params.virtualizer,
    sortedOptions: params.sortedOptions,
    showSelectedOnTop: params.showSelectedOnTop,
    showLoadMoreButton: params.showLoadMoreButton,
    errorId: params.errorId,
    helperId: params.helperId,
  };

  assignIfDefined(result, 'wrapperClassName', params.wrapperClassName);
  assignIfDefined(result, 'label', params.label);
  assignIfDefined(result, 'required', params.required);
  assignIfDefined(result, 'renderEmpty', params.renderEmpty);
  assignIfDefined(result, '_renderItem', params._renderItem);
  assignIfDefined(result, '_loadMore', params._loadMore);
  assignIfDefined(result, 'error', params.error);
  assignIfDefined(result, 'helperText', params.helperText);

  return result;
}

// ============================================================================
// Multi-Select Mode Renderer - Extracted to reduce cognitive complexity
// ============================================================================

/**
 * Props for multi-select mode renderer
 */
interface MultiSelectModeProps {
  wrapperClassName?: string;
  label?: string;
  selectId: string;
  required?: boolean;
  open: boolean;
  handleOpenChange: (isOpen: boolean) => void;
  triggerElement: ReactNode;
  popoverSideOffset: number;
  showSearchInput: boolean;
  _searchPlaceholder: string;
  searchQuery: string;
  handleSearchChange: (query: string) => void;
  _autoFocus: boolean;
  showSelectAllButton: boolean;
  handleSelectAll: () => void;
  filteredOptions: SelectOption[];
  parentRef: React.RefObject<HTMLDivElement>;
  maxHeight: number;
  _loading: boolean;
  displayOptions: SelectOption[];
  renderEmpty?: () => ReactNode;
  emptyMessage: string;
  _grouped: boolean;
  groupedOptions: { label: string; options: SelectOption[] }[] | null;
  multiValue: string[];
  _renderItem?: (props: {
    option: SelectOption;
    selected: boolean;
    disabled: boolean;
  }) => ReactNode;
  handleMultiSelectToggle: (value: string) => void;
  _virtual: boolean;
  itemsToRender:
    | SelectOption[]
    | ReturnType<ReturnType<typeof useVirtualizer<HTMLDivElement, Element>>['getVirtualItems']>;
  virtualizer: ReturnType<typeof useVirtualizer<HTMLDivElement, Element>>;
  sortedOptions: SelectOption[];
  showSelectedOnTop: boolean;
  showLoadMoreButton: boolean;
  _loadMore?: () => Promise<void>;
  error?: string;
  errorId: string;
  helperText?: string;
  helperId: string;
}

/**
 * Renders multi-select mode using Radix UI Popover primitive
 */
function renderMultiSelectMode(props: MultiSelectModeProps): ReactNode {
  const {
    wrapperClassName,
    label,
    selectId,
    required,
    open,
    handleOpenChange,
    triggerElement,
    popoverSideOffset,
    showSearchInput,
    _searchPlaceholder,
    searchQuery,
    handleSearchChange,
    _autoFocus,
    showSelectAllButton,
    handleSelectAll,
    filteredOptions,
    parentRef,
    maxHeight,
    _loading,
    displayOptions,
    renderEmpty,
    emptyMessage,
    _grouped,
    groupedOptions,
    multiValue,
    _renderItem,
    handleMultiSelectToggle,
    _virtual,
    itemsToRender,
    virtualizer,
    sortedOptions,
    showSelectedOnTop,
    showLoadMoreButton,
    _loadMore,
    error,
    errorId,
    helperText,
    helperId,
  } = props;

  return (
    <div className={cn('mdt-flex mdt-flex-col mdt-gap-1.5', wrapperClassName)}>
      {renderSelectLabel({ ...(label && { label }), selectId, ...(required && { required }) })}

      <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
        <PopoverPrimitive.Trigger asChild>{triggerElement}</PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            side="bottom"
            align="start"
            sideOffset={popoverSideOffset}
            alignOffset={0}
            className={cn(
              /* at least the field, as wide as its longest option, never past 320 (Pranjal, 2026-10-17) - it was held
               * to the field's width, so long names wrapped */
              'mdt-z-50 mdt-w-max mdt-min-w-[var(--radix-popover-trigger-width)] mdt-rounded-md',
              LIST_MAX_WIDTH_CLASSES,
              'mdt-border mdt-bg-popover mdt-text-popover-foreground mdt-shadow-md',
              'data-[state=open]:mdt-animate-in data-[state=closed]:mdt-animate-out',
              'data-[state=closed]:mdt-fade-out-0 data-[state=open]:mdt-fade-in-0',
              'data-[state=closed]:mdt-zoom-out-95 data-[state=open]:mdt-zoom-in-95',
              'data-[side=bottom]:mdt-slide-in-from-top-2',
              'data-[side=top]:mdt-slide-in-from-bottom-2'
            )}
          >
            {renderPopoverDropdownContent({
              showSearchInput,
              _searchPlaceholder,
              searchQuery,
              handleSearchChange,
              _autoFocus,
              showSelectAllButton,
              handleSelectAll,
              filteredOptions,
              parentRef,
              maxHeight,
              _loading,
              displayOptions,
              ...(renderEmpty && { renderEmpty }),
              emptyMessage,
              _grouped,
              groupedOptions,
              multiValue,
              ...(_renderItem && { _renderItem }),
              handleMultiSelectToggle,
              _virtual,
              itemsToRender,
              virtualizer,
              sortedOptions,
              showSelectedOnTop,
              showLoadMoreButton,
              ...(_loadMore && { _loadMore }),
            })}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>

      {renderHelperOrError({
        ...(error && { error }),
        errorId,
        ...(helperText && { helperText }),
        helperId,
      })}
    </div>
  );
}

/**
 * Creates trigger element for multi-select mode
 */
function createMultiSelectTrigger(props: {
  _renderTrigger?: (props: {
    value: SelectValue;
    selectedOptions: SelectOption[];
    placeholder: string;
    open: boolean;
    disabled: boolean;
  }) => ReactNode;
  currentValue: SelectValue;
  selectedOptions: SelectOption[];
  placeholder: string;
  open: boolean;
  disabled: boolean;
  ref: React.Ref<HTMLButtonElement>;
  selectId: string;
  variant: SelectTriggerVariant;
  size: SelectSize;
  hasError: boolean;
  className?: string;
  ariaLabel?: string;
  multiSelectDescribedBy?: string;
  prefixIcon?: ReactNode;
  _showPills: boolean;
  _maxPills: number;
  _overflowLabel: (hidden: number) => string;
  handlePillRemove: (value: string) => void;
  _pillHoverCard: boolean;
  _renderPillHoverCard?: (props: { option: SelectOption }) => ReactNode;
  _clearable: boolean;
  locked: boolean;
  handleClearAll: () => void;
}): ReactNode {
  const {
    _renderTrigger,
    currentValue,
    selectedOptions,
    placeholder,
    open,
    disabled,
    ref,
    selectId,
    variant,
    size,
    hasError,
    className,
    ariaLabel,
    multiSelectDescribedBy,
    prefixIcon,
    _showPills,
    _maxPills,
    _overflowLabel,
    handlePillRemove,
    _pillHoverCard,
    _renderPillHoverCard,
    _clearable,
    locked,
    handleClearAll,
  } = props;

  if (_renderTrigger) {
    return _renderTrigger({
      value: currentValue,
      selectedOptions,
      placeholder,
      open,
      disabled,
    });
  }

  return renderDefaultMultiSelectTrigger({
    ref,
    selectId,
    ...(disabled && { disabled }),
    variant,
    size,
    hasError,
    ...(className && { className }),
    ...(ariaLabel && { ariaLabel }),
    ...(multiSelectDescribedBy && { multiSelectDescribedBy }),
    open,
    ...(prefixIcon && { prefixIcon }),
    _showPills,
    selectedOptions,
    _maxPills,
    _overflowLabel,
    handlePillRemove,
    _pillHoverCard,
    ...(_renderPillHoverCard && { _renderPillHoverCard }),
    placeholder,
    _clearable,
    locked,
    handleClearAll,
  });
}

/**
 * Select component with single/multi-select support, search, pills, and advanced features.
 *
 * @example
 * ```tsx
 * // Simple single select
 * <Select
 *   options={users}
 *   value={selectedUser}
 *   onChange={setSelectedUser}
 *   placeholder="Select user..."
 * />
 *
 * // Multi-select with search and pills
 * <Select
 *   mode="multiple"
 *   options={tags}
 *   value={selectedTags}
 *   onChange={setSelectedTags}
 *   searchable
 *   showPills
 *   maxPills={3}
 * />
 * ```
 */
const Select = forwardRef<HTMLButtonElement, SelectProps>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T = any,>(
    {
      // Core props
      mode = 'single',
      value: controlledValue,
      defaultValue,
      onChange,
      options = [],

      // UI props
      placeholder = 'Select...',
      size = 'sm', // the field's default is sm 32 (K-Field-01 / K-Field-17, 2026-09-17; was md)
      variant = 'default',
      placement = 'bottom',
      disabled: disabledProp = false,
      /* A HELD FIELD (Pranjal, 2026-09-17): disabled, the lock in place of the chevron */
      locked = false,
      required = false,
      error,
      label,
      helperText,
      name,
      id: propId,
      className,
      wrapperClassName,

      // Search props
      searchable: _searchable = false,
      searchPlaceholder: _searchPlaceholder = 'Search...',
      onSearch: _onSearch,
      filterFn,
      searchDebounce: _searchDebounce = 300,

      // Customization props
      renderTrigger: _renderTrigger,
      renderItem: _renderItem,
      renderValue: _renderValue,
      prefixIcon,
      showAvatar: _showAvatar = false,

      // Pills props
      /* pills are the ruled multi-select (K-Field-21) and the console passes showPills on every multi Select; the default
       * stays false as pushed - seven tests hold "N selected" as the default - flagged 2026-09-22 for the main session */
      showPills: _showPills = false,
      /* ONE pick shows, the rest fold into a "+N" badge (Pranjal, 2026-09-17) */
      maxPills: _maxPills = 1,
      overflowLabel: _overflowLabel = (hidden: number) => '+' + String(hidden),
      pillHoverCard: _pillHoverCard = false,
      renderPillHoverCard: _renderPillHoverCard,
      onRemovePill: _onRemovePill,

      // Advanced props
      virtual: _virtual = false,
      itemHeight: _itemHeight = 40,
      loading: _loading = false,
      loadMore: _loadMore,
      hasMore: _hasMore = false,
      onLoadOptions: _onLoadOptions,

      // UX props
      clearable: _clearable = false,
      selectAll: _selectAll = false,
      closeOnSelect: _closeOnSelect,
      autoFocus: _autoFocus = false,
      grouped: _grouped = false,
      sortOptions: _sortOptions,
      position = 'popper',
      maxHeight = 300,
      showSelectedOnTop = false,

      // Empty/Error states
      renderEmpty,
      renderError: _renderError,
      emptyMessage = 'No options found',

      // Event handlers
      onOpen,
      onClose,
      onFocus: _onFocus,
      onBlur: _onBlur,

      // ARIA props
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
    }: SelectProps<T>,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const disabled = disabledProp || locked;
    // Generate IDs
    const generatedId = useId();
    const selectId = propId ?? generatedId;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;
    const hasError = Boolean(error);

    // Use custom hooks for state management
    const { currentValue, open, setOpen, searchQuery, setSearchQuery, handleValueChange } =
      useSelectState({
        controlledValue,
        defaultValue,
        mode,
        onChange,
      });

    // Multi-select specific handlers
    const {
      multiValue,
      selectedOptions,
      handleMultiSelectToggle,
      handlePillRemove: handlePillRemoveBase,
      handleClearAll,
      handleSelectAll: handleSelectAllBase,
    } = useMultiSelectHandlers({
      mode,
      currentValue,
      options,
      handleValueChange,
      onRemovePill: _onRemovePill,
    });

    // Search handling with debounce
    const { handleSearchChange } = useSelectSearch({
      onSearch: _onSearch,
      onLoadOptions: _onLoadOptions,
      searchDebounce: _searchDebounce,
      setSearchQuery,
    });

    // Filter options based on search (extracted to hook to reduce complexity)
    const filteredOptions = useFilteredOptions({
      options,
      searchQuery,
      filterFn,
    });

    // Wrap handlers to use filtered options
    const handlePillRemove = handlePillRemoveBase;
    const handleSelectAll = useCallback(() => {
      handleSelectAllBase(filteredOptions);
    }, [handleSelectAllBase, filteredOptions]);

    // Virtual scrolling setup
    const parentRef = useRef<HTMLDivElement>(null);
    const virtualizer = useVirtualizer({
      count: filteredOptions.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => _itemHeight,
      enabled: _virtual && mode === 'multiple',
    });

    // Use custom hook for options sorting and grouping
    const { sortedOptions, groupedOptions } = useOptionsProcessing({
      filteredOptions,
      showSelectedOnTop,
      mode,
      multiValue,
      currentValue,
      grouped: _grouped,
    });

    // Handle open/close (extracted to hook to reduce complexity)
    const handleOpenChange = useOpenChangeHandler({
      setOpen,
      setSearchQuery,
      onOpen,
      onClose,
    });

    /* SEARCH IN A SINGLE SELECT (Pranjal, 2026-09-27): `mode="single" searchable` opens the multiple mode's searchable
     * list (the search box, the empty message, the tick on the picked row); a pick sets the one value and closes. The
     * box is the single trigger: the value in the reading ink, the chevron (the lock when held), the placeholder faint. */
    if (mode === 'single' && _searchable) {
      const one = Array.isArray(currentValue) ? currentValue[0] : currentValue;
      const picked =
        one === undefined ? undefined : sortedOptions.find((o) => String(o.value) === one);
      const singleDescribedBy = computeAriaDescribedBy(
        hasError,
        errorId,
        helperText,
        helperId,
        ariaDescribedBy
      );
      const singleTrigger = (
        <button
          ref={ref}
          type="button"
          id={selectId}
          // aria-controls is set at run time: the Popover trigger this sits in (asChild) stamps it with the list's id
          // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={ariaLabel}
          aria-describedby={singleDescribedBy}
          aria-invalid={ariaInvalid ?? hasError}
          disabled={disabled || locked}
          data-state={open ? 'open' : 'closed'}
          {...(picked ? {} : { 'data-placeholder': '' })}
          className={cn('mdt-group', selectTriggerVariants({ variant, size, hasError }), className)}
        >
          {prefixIcon && (
            <span className="mdt-flex mdt-shrink-0 mdt-items-center mdt-text-muted-foreground">
              {prefixIcon}
            </span>
          )}
          <span className={TRIGGER_VALUE_CLASSES}>{picked ? picked.label : placeholder}</span>
          {locked ? (
            <span className="mdt-flex mdt-shrink-0 mdt-items-center mdt-text-faint">
              <Icon name="lock" size={14} aria-hidden />
            </span>
          ) : (
            <Icon
              name="chevron-down"
              size={14}
              aria-hidden
              className="mdt-shrink-0 mdt-text-muted-foreground mdt-transition-transform group-data-[state=open]:mdt-rotate-180"
            />
          )}
        </button>
      );
      const pickOne = (value: string) => {
        handleValueChange(value);
        handleOpenChange(false);
      };
      const singleListProps = buildMultiSelectModeProps({
        wrapperClassName,
        label,
        selectId,
        required,
        open,
        handleOpenChange,
        triggerElement: singleTrigger,
        popoverSideOffset: computePopoverOffset(placement),
        showSearchInput: true,
        _searchPlaceholder,
        searchQuery,
        handleSearchChange,
        _autoFocus,
        showSelectAllButton: false,
        handleSelectAll,
        filteredOptions,
        parentRef,
        maxHeight,
        _loading,
        displayOptions: sortedOptions,
        renderEmpty,
        emptyMessage,
        _grouped,
        groupedOptions,
        multiValue: picked ? [String(picked.value)] : [],
        _renderItem,
        handleMultiSelectToggle: pickOne,
        _virtual: false,
        itemsToRender: sortedOptions,
        virtualizer,
        sortedOptions,
        showSelectedOnTop,
        showLoadMoreButton: Boolean(_hasMore && _loadMore),
        _loadMore,
        error,
        errorId,
        helperText,
        helperId,
      });
      return renderMultiSelectMode(singleListProps);
    }

    // Single select: Radix UI Select handles this natively
    if (mode === 'single') {
      const singleSelectProps = buildSingleSelectProps({
        currentValue,
        wrapperClassName,
        label,
        selectId,
        required,
        handleValueChange,
        open,
        handleOpenChange,
        disabled,
        name,
        ref,
        variant,
        size,
        hasError,
        className,
        ariaLabel,
        errorId,
        helperText,
        helperId,
        ariaDescribedBy,
        ariaInvalid,
        prefixIcon,
        placeholder,
        _clearable,
        locked,
        position,
        placement,
        maxHeight,
        sortedOptions,
        showSelectedOnTop,
        filteredOptions,
        renderEmpty,
        emptyMessage,
        error,
      });
      return renderSingleSelectMode(singleSelectProps);
    }

    // Multi-select mode - use extracted renderer with builder functions
    const displayOptions = sortedOptions;
    const itemsToRender = _virtual ? virtualizer.getVirtualItems() : displayOptions;
    const multiSelectDescribedBy = computeAriaDescribedBy(
      hasError,
      errorId,
      helperText,
      helperId,
      ariaDescribedBy
    );
    const popoverSideOffset = computePopoverOffset(placement);
    const showSearchInput = _searchable;
    const showSelectAllButton = computeShowSelectAll(_selectAll, filteredOptions.length);
    const showLoadMoreButton = Boolean(_hasMore && _loadMore);

    const triggerProps = buildMultiSelectTriggerProps({
      _renderTrigger,
      currentValue,
      selectedOptions,
      placeholder,
      open,
      disabled,
      ref,
      selectId,
      variant,
      size,
      hasError,
      className,
      ariaLabel,
      multiSelectDescribedBy,
      prefixIcon,
      _showPills,
      _maxPills,
      _overflowLabel,
      handlePillRemove,
      _pillHoverCard,
      _renderPillHoverCard,
      _clearable,
      locked,
      handleClearAll,
    });
    const triggerElement = createMultiSelectTrigger(triggerProps);

    const multiSelectProps = buildMultiSelectModeProps({
      wrapperClassName,
      label,
      selectId,
      required,
      open,
      handleOpenChange,
      triggerElement,
      popoverSideOffset,
      showSearchInput,
      _searchPlaceholder,
      searchQuery,
      handleSearchChange,
      _autoFocus,
      showSelectAllButton,
      handleSelectAll,
      filteredOptions,
      parentRef,
      maxHeight,
      _loading,
      displayOptions,
      renderEmpty,
      emptyMessage,
      _grouped,
      groupedOptions,
      multiValue,
      _renderItem,
      handleMultiSelectToggle,
      _virtual,
      itemsToRender,
      virtualizer,
      sortedOptions,
      showSelectedOnTop,
      showLoadMoreButton,
      _loadMore,
      error,
      errorId,
      helperText,
      helperId,
    });
    return renderMultiSelectMode(multiSelectProps);
  }
);

Select.displayName = 'Select';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SelectComponent = Select as <T = any>(
  props: SelectProps<T> & { ref?: React.Ref<HTMLButtonElement> }
) => React.ReactElement;

export { SelectComponent as Select };
