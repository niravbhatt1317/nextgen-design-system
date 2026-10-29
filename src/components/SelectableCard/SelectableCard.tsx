import { createContext, forwardRef, useContext, useId, useMemo, useRef } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import type {
  SelectableCardGroupProps,
  SelectableCardLayout,
  SelectableCardProps,
  SelectableCardType,
} from './SelectableCard.types';

/**
 * SelectableCard - the console's option card (the mock's `ui/SelectableCard.jsx`,
 * Nikhil's approved spec of 2026-10-01): an answer drawn as a card, with its
 * radio or checkbox at the top right.
 *
 * The whole card is the control (role radio or checkbox, named by its title,
 * described by its line; Space or Enter picks it). The control drawn in the
 * corner is decorative. A picker, link or button in the card's body keeps its
 * press to itself, so a Select can live inside the chosen answer.
 *
 * The edge is 1.5 in every state - a 1px border and a 0.5px inset ring of the
 * same colour - so a choice never moves anything: the hairline at rest, the
 * field edge under the pointer, the ink edge when chosen.
 */

interface GroupContextValue {
  type: SelectableCardType;
  value: string | undefined;
  onValueChange: ((value: string) => void) | undefined;
  disabled: boolean;
  layout: SelectableCardLayout;
}

const GroupContext = createContext<GroupContextValue | null>(null);

/** A press on one of these inside a card is its own, not a pick. */
const INTERACTIVE =
  "button, a[href], input, textarea, select, label, [role='button'], [role='link'], [role='combobox'], [contenteditable]";

const LAYOUT: Record<SelectableCardLayout, string> = {
  stack: 'mdt-flex mdt-flex-col mdt-gap-2',
  chips: 'mdt-flex mdt-flex-row mdt-flex-wrap mdt-items-center mdt-gap-2',
  grid: 'mdt-grid mdt-gap-3 mdt-grid-cols-[repeat(auto-fit,minmax(220px,1fr))]',
  tiles: 'mdt-grid mdt-gap-3 mdt-grid-cols-5',
};
const COLUMNS = {
  2: 'mdt-grid-cols-2',
  3: 'mdt-grid-cols-3',
  4: 'mdt-grid-cols-4',
  5: 'mdt-grid-cols-5',
} as const;

/* THE TILE (Ronak 2026-10-15, the console's cloud Provider picker - "there are 10 types and in the future may be comes
 * more so could we make provider type user friendly, clean and attractive"): the same card re-flowed - the mark on top,
 * the name and its one faint word centred under it, the dot in the top-right corner (a tile has no title line for it
 * to sit on). 12 down and 10 across inside, the parts 8 apart, at the console card's SMALL size - the name 13, corners
 * 10, the dot 15 (its chosen ring 4.5). Each part reads its class from here, so a card that is not a tile reads the
 * empty set and nothing else changes. */
const TILE = {
  card: 'mdt-rounded-[10px] mdt-px-2.5 mdt-py-3',
  row: 'mdt-flex-col mdt-items-center mdt-gap-2',
  icon: 'mdt-h-auto [&_svg]:mdt-size-auto',
  text: 'mdt-w-full mdt-items-center mdt-pr-0 mdt-text-center',
  title: 'mdt-max-w-full mdt-justify-center mdt-text-[13px] mdt-leading-[1.4]',
  desc: 'mdt-max-w-full mdt-truncate mdt-leading-[1.45]',
  control: 'mdt-absolute mdt-right-2.5 mdt-top-2.5 mdt-m-0 mdt-size-[15px]',
  controlOn: 'mdt-border-[4.5px]',
};
const NOT_TILE: Record<keyof typeof TILE, undefined> = {
  card: undefined,
  row: undefined,
  icon: undefined,
  text: undefined,
  title: undefined,
  desc: undefined,
  control: undefined,
  controlOn: undefined,
};

/** The three edges, each a 1px border plus a 0.5px inset ring of the same colour. */
const EDGE = {
  rest: 'mdt-border-neutral-20 mdt-shadow-[inset_0_0_0_0.5px_hsl(var(--mdt-neutral-20))]',
  hover: 'hover:mdt-border-input hover:mdt-shadow-[inset_0_0_0_0.5px_hsl(var(--mdt-input))]',
  chosen: 'mdt-border-foreground mdt-shadow-[inset_0_0_0_0.5px_hsl(var(--mdt-foreground))]',
};

/** Whether the press landed on something interactive inside the card. */
const innerPress = (event: MouseEvent<HTMLElement>): boolean => {
  const hit = (event.target as HTMLElement).closest(INTERACTIVE);
  return hit !== null && hit !== event.currentTarget && event.currentTarget.contains(hit);
};

/** The decorative control: a ring or a box, filled in the ink when chosen. */
const Control = ({ radio, on, className }: { radio: boolean; on: boolean; className?: string | undefined }) => (
  <span
    aria-hidden
    className={cn(
      'mdt-ml-2 mdt-mt-0.5 mdt-inline-flex mdt-size-4 mdt-shrink-0 mdt-items-center mdt-justify-center',
      'mdt-border-[1.5px] mdt-border-input mdt-bg-background mdt-text-background',
      'mdt-transition-[border-color,border-width,background-color] mdt-duration-100',
      'group-hover:mdt-border-faint',
      radio ? 'mdt-rounded-full' : 'mdt-rounded',
      on && 'mdt-border-foreground group-hover:mdt-border-foreground',
      on && (radio ? 'mdt-border-[5px]' : 'mdt-bg-foreground'),
      className
    )}
  >
    {!radio && on && <Icon name="check" size={12} strokeWidth={2.5} />}
  </span>
);

/**
 * SelectableCardGroup - a set of option cards: a radio set (one answer, the
 * arrows move it) or a checkbox set.
 *
 * @example
 * <SelectableCardGroup value={mode} onValueChange={setMode} aria-labelledby="mode-label">
 *   <SelectableCard value="replace" title="Replace with an existing profile" description="…" />
 *   <SelectableCard value="remove" title="Remove without replacement" description="…" />
 * </SelectableCardGroup>
 */
const SelectableCardGroup = forwardRef<HTMLDivElement, SelectableCardGroupProps>(
  function SelectableCardGroup(
    {
      type = 'radio',
      value,
      onValueChange,
      layout,
      columns,
      disabled = false,
      className,
      onKeyDown,
      children,
      ...rest
    },
    ref
  ) {
    const own = useRef<HTMLDivElement | null>(null);
    const lay: SelectableCardLayout = layout ?? (columns ? 'grid' : 'stack');
    const ctx = useMemo(
      () => ({ type, value, onValueChange, disabled, layout: lay }),
      [type, value, onValueChange, disabled, lay]
    );

    // A radio set: the arrows move the choice to the next card that can take it, wrapping.
    const handleKeys = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
      const target = event.target as HTMLElement;
      if (type !== 'radio' || event.defaultPrevented || !step || !own.current) return;
      if (target.getAttribute('role') !== 'radio') return;
      const cards = [
        ...own.current.querySelectorAll<HTMLElement>('[role="radio"]:not([aria-disabled="true"])'),
      ];
      const at = cards.indexOf(target);
      if (at === -1) return;
      event.preventDefault();
      const next = cards[(at + step + cards.length) % cards.length];
      next?.focus();
      next?.click();
    };

    return (
      <GroupContext.Provider value={ctx}>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- the role is set (radiogroup/group); the rule cannot read a ternary */}
        <div
          ref={(node) => {
            own.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          role={type === 'radio' ? 'radiogroup' : 'group'}
          data-layout={lay}
          className={cn('mdt-min-w-0', LAYOUT[lay], columns && COLUMNS[columns], className)}
          onKeyDown={handleKeys}
          {...rest}
        >
          {children}
        </div>
      </GroupContext.Provider>
    );
  }
);

/**
 * SelectableCard - one answer in a SelectableCardGroup, or a checkbox card on
 * its own. Put a picker in `children` to ask the follow-up in place.
 *
 * @example
 * <SelectableCard value="existing" title="Replace with an existing access profile"
 *   description="Every holder moves to the chosen profile.">
 *   {mode === 'existing' && <Select … />}
 * </SelectableCard>
 */
const SelectableCard = forwardRef<HTMLDivElement, SelectableCardProps>(function SelectableCard(
  {
    value,
    checked = false,
    onCheckedChange,
    type,
    title,
    description,
    icon,
    tag,
    disabled = false,
    className,
    children,
    onClick,
    onKeyDown,
    ...rest
  },
  ref
) {
  const group = useContext(GroupContext);
  const kind = group?.type ?? type ?? 'checkbox';
  const radio = kind === 'radio';
  const inRadio = radio && group !== null;
  const on = inRadio ? group.value === value : checked;
  const off = disabled || (group?.disabled ?? false);
  const chip = group?.layout === 'chips';
  const face = group?.layout === 'tiles' ? TILE : NOT_TILE;
  const id = useId();
  const titleId = `${id}-t`;
  const descId = `${id}-d`;
  const hasDesc = description !== undefined && !chip;

  // The chosen card is a radio set's tab stop; every card while nothing is chosen.
  const chosen = inRadio && group.value !== undefined && group.value !== '';
  const tabIndex = off || (chosen && !on) ? -1 : 0;

  const pick = () => {
    if (off) return;
    if (inRadio) {
      if (!on && value !== undefined) group.onValueChange?.(value);
      return;
    }
    onCheckedChange?.(!on);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions -- the role is set (radio/checkbox, radiogroup/group); the rule cannot read a ternary
    <div
      ref={ref}
      role={radio ? 'radio' : 'checkbox'}
      aria-checked={on}
      aria-disabled={off || undefined}
      aria-labelledby={titleId}
      aria-describedby={hasDesc ? descId : undefined}
      tabIndex={tabIndex}
      data-state={on ? 'checked' : 'unchecked'}
      className={cn(
        'mdt-group mdt-relative mdt-flex mdt-min-w-0 mdt-cursor-pointer mdt-select-none mdt-flex-col mdt-gap-1.5',
        'mdt-rounded-xl mdt-border mdt-bg-background mdt-p-3 mdt-text-left mdt-text-foreground',
        'mdt-transition-[border-color,box-shadow] mdt-duration-100',
        'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-2',
        on ? EDGE.chosen : [EDGE.rest, EDGE.hover],
        chip && 'mdt-inline-flex mdt-w-auto mdt-flex-row mdt-items-center',
        off && 'mdt-pointer-events-none mdt-opacity-50',
        face.card,
        className
      )}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || innerPress(event)) return;
        pick();
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || event.target !== event.currentTarget) return;
        if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault();
          pick();
        }
      }}
      {...rest}
    >
      <span
        className={cn(
          'mdt-flex mdt-min-w-0 mdt-gap-2',
          chip ? 'mdt-items-center' : 'mdt-items-start',
          face.row
        )}
      >
        {icon !== undefined && (
          <span
            aria-hidden
            className={cn(
              'mdt-inline-flex mdt-h-5 mdt-shrink-0 mdt-items-center [&_svg]:mdt-size-4',
              on ? 'mdt-text-foreground' : 'mdt-text-faint',
              face.icon
            )}
          >
            {icon}
          </span>
        )}
        <span
          className={cn(
            'mdt-flex mdt-min-w-0 mdt-flex-1 mdt-flex-col mdt-gap-0.5',
            !chip && 'mdt-pr-1',
            face.text
          )}
        >
          <span
            id={titleId}
            className={cn(
              'mdt-inline-flex mdt-min-w-0 mdt-items-center mdt-gap-1.5 mdt-text-sm mdt-font-medium mdt-leading-5',
              chip ? 'mdt-whitespace-nowrap' : 'mdt-flex-wrap',
              face.title
            )}
          >
            {title}
            {tag !== undefined && (
              <span className="mdt-inline-flex mdt-h-[18px] mdt-shrink-0 mdt-items-center mdt-rounded-full mdt-border mdt-border-neutral-20 mdt-px-1.5 mdt-text-[11px] mdt-font-medium mdt-leading-none mdt-text-faint">
                {tag}
              </span>
            )}
          </span>
          {hasDesc && (
            <span id={descId} className={cn('mdt-text-xs mdt-leading-normal mdt-text-faint', face.desc)}>
              {description}
            </span>
          )}
        </span>
        <Control radio={radio} on={on} className={cn(face.control, on && radio && face.controlOn)} />
      </span>
      {children !== undefined && children !== null && children !== false && (
        <span className="mdt-mt-auto mdt-flex mdt-min-w-0 mdt-flex-col mdt-gap-1.5 mdt-pt-0.5">
          {children}
        </span>
      )}
    </div>
  );
});

export { SelectableCard, SelectableCardGroup };
