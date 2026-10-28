import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import { IconTile } from '../IconTile';
import type { IconTileTone } from '../IconTile';
import type { ProblemListProps, ProblemRowProps, ProblemSeverity } from './ProblemRow.types';

/* PORTED FROM THE CONSOLE (Pranjal, 2026-10-28). The Health tab's "Needs attention" row in both fleets -
 * features/fleet-new/afm/screens/health/Overview.tsx `issueRow` and its twin in cfm/screens/health/Overview.tsx -
 * with health.css `.hl-rows` / `.hl-row`. Every value below is that row's:
 *
 *   row     a button, the whole row (2026-10-26: "full row should be clickable not the view button"): a grid of
 *           32 / the words / the end, gaps 16 across and 12 down, 10 in (18 on the right), bleeding 10 into the
 *           card's padding on both sides so the tile lines up with the card's heading; 8 corners; the accent wash
 *           on hover and keyboard focus, with the ring 2 inside
 *   line    a hairline between two rows, 10 in from each side; hidden under a hovered or focused row and the
 *           row after it, so the wash never sits on a line
 *   tile    the library IconTile at md (32), round, tinted by the level - rose, amber, blue - with the level's
 *           glyph at 16 (option B, 2026-10-22; the banners' three glyphs since 2026-10-26)
 *   title   13 / 500 / 20, the foreground ink, one line; a leading count in 600
 *   detail  12 / 16, the faint ink, one line (2026-10-26: "Second subtext should be one liner only")
 *   View    13 / 500 / 20, neutral-90, underlined 3 below, shown only while the row is hovered or focused
 *           ("just view with underline text when hovered on that row") */

const SEVERITY: Record<ProblemSeverity, { icon: IconName; tone: IconTileTone; word: string }> = {
  danger: { icon: 'alert-octagon', tone: 'rose', word: 'Critical' },
  warning: { icon: 'alert-triangle', tone: 'amber', word: 'Warning' },
  info: { icon: 'info', tone: 'blue', word: 'Notice' },
};

/** The glyph's size in the 32 tile. */
const GLYPH_PX = 16;

/** "125 hosts with a crashing module" - a number, a space, the rest. */
const LEADING_COUNT = /^([\d,]+)\s+(.+)$/;

/** The count in semibold, the rest as it is said (the console's `lead`). */
const lead = (text: string): ReactNode => {
  const match = LEADING_COUNT.exec(text);
  if (!match) return text;
  return (
    <>
      <span className="mdt-font-semibold">{match[1]}</span> {match[2]}
    </>
  );
};

const asText = (node: ReactNode): string | undefined =>
  typeof node === 'string' ? node : undefined;

/* the hairline is the row's own ::before, drawn only on a row that follows a row; a hovered or focused row hides
 * its own line and the next row's. (Tailwind 3 applies variants from the right, so `before:` leads: the sibling
 * selector is built first and the pseudo-element is added to its end.) */
const LINE = [
  "before:[&+&]:mdt-absolute before:[&+&]:mdt-left-2.5 before:[&+&]:mdt-right-2.5 before:[&+&]:mdt-top-0 before:[&+&]:mdt-content-['']",
  'before:[&+&]:mdt-border-0 before:[&+&]:mdt-border-t before:[&+&]:mdt-border-solid before:[&+&]:mdt-border-neutral-20',
  'before:[&+&:hover]:mdt-border-transparent before:[&+&:focus-visible]:mdt-border-transparent',
  'before:[&:hover+&]:mdt-border-transparent before:[&:focus-visible+&]:mdt-border-transparent',
].join(' ');

const ROW = [
  'mdt-group mdt-relative mdt-box-border mdt-grid mdt-w-auto mdt-cursor-pointer mdt-grid-cols-[32px_minmax(0,1fr)_auto]',
  'mdt-items-center mdt-gap-x-4 mdt-gap-y-3 -mdt-mx-2.5 mdt-rounded-lg mdt-border-0 mdt-bg-transparent',
  'mdt-py-2.5 mdt-pl-2.5 mdt-pr-[18px] mdt-text-left mdt-font-[inherit] mdt-text-sm mdt-leading-normal mdt-text-foreground',
  'hover:mdt-bg-accent focus-visible:mdt-bg-accent',
  'focus-visible:mdt-outline focus-visible:mdt-outline-2 focus-visible:-mdt-outline-offset-2 focus-visible:mdt-outline-ring',
  LINE,
].join(' ');

/**
 * ProblemRow - one problem in a "Needs attention" list: its severity tile, what
 * it is, one line of detail, and "View" on hover; the whole row is the button.
 *
 * Put the rows in a `ProblemList`, worst first. The level's word is said by the
 * tile; give the row an `aria-label` that says what pressing it opens.
 *
 * @example
 * ```tsx
 * <ProblemList>
 *   <ProblemRow
 *     severity="warning"
 *     title="125 hosts with a crashing module"
 *     detail="Metrics on 40 · Logs on 30 · Patch on 19"
 *     aria-label="125 hosts with a crashing module. Warning. Open its agents."
 *     onClick={() => openProblem('crashing')}
 *   />
 * </ProblemList>
 * ```
 */
const ProblemRow = forwardRef<HTMLButtonElement, ProblemRowProps>(function ProblemRow(
  { severity, title, detail, icon, severityLabel, viewLabel = 'View', className, ...rest },
  ref
) {
  const level = SEVERITY[severity];
  const word = severityLabel ?? level.word;
  const titleText = asText(title);
  const detailText = asText(detail);
  const label = titleText === undefined ? undefined : `${titleText}. ${word}.`;
  const hasDetail = detail !== undefined && detail !== null && detail !== '';

  return (
    <button
      ref={ref}
      type="button"
      data-slot="problem-row"
      data-severity={severity}
      aria-label={label}
      className={cn(ROW, className)}
      {...rest}
    >
      <span title={word} className="mdt-inline-flex">
        <IconTile
          size="md"
          shape="circle"
          tone={level.tone}
          aria-label={word}
          icon={icon ?? <Icon name={level.icon} size={GLYPH_PX} />}
        />
      </span>
      <span className="mdt-flex mdt-min-w-0 mdt-flex-col">
        <span
          className="mdt-truncate mdt-text-[13px] mdt-font-medium mdt-leading-5 mdt-text-foreground"
          title={titleText}
          data-slot="problem-row-title"
        >
          {titleText === undefined ? title : lead(titleText)}
        </span>
        {hasDetail ? (
          <span
            className="mdt-truncate mdt-text-xs mdt-leading-4 mdt-text-faint"
            title={detailText}
            data-slot="problem-row-detail"
          >
            {detail}
          </span>
        ) : null}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'mdt-whitespace-nowrap mdt-text-[13px] mdt-font-medium mdt-leading-5 mdt-text-neutral-90',
          'mdt-underline mdt-underline-offset-[3px] mdt-opacity-0',
          'group-hover:mdt-opacity-100 group-focus-visible:mdt-opacity-100'
        )}
        data-slot="problem-row-view"
      >
        {viewLabel}
      </span>
    </button>
  );
});

ProblemRow.displayName = 'ProblemRow';

/**
 * ProblemList - the column a "Needs attention" list's `ProblemRow`s stack in,
 * a hairline between each.
 *
 * Inside a card body, the rows bleed 10px into its padding on both sides, so
 * their tiles line up with the card's heading and the hover wash reaches past
 * the words.
 */
const ProblemList = forwardRef<HTMLDivElement, ProblemListProps>(function ProblemList(
  { className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="problem-list"
      className={cn('mdt-flex mdt-flex-col', className)}
      {...rest}
    />
  );
});

ProblemList.displayName = 'ProblemList';

export { ProblemRow, ProblemList };
