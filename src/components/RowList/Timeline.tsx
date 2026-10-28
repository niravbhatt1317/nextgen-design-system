import { forwardRef } from 'react';
import { cn } from '@/utils';
import { RowText, hasContent } from './RowText';
import type { TimelineItemProps, TimelineProps } from './RowList.types';
import './rowList.css';

/* Three byte-identical builds in the console (CredentialProfileDrawer, SecretStoreDrawer, credential-profiles/dialogs)
 * on one part, src/ui/RowList.jsx Timeline (rulebook K-Timeline-01). Not a table: events in time, one column. The
 * console names its dot tones ok / warn / danger; here they are the library's tone names - success, warning, danger. */

/**
 * Timeline - an audit trail or history, newest first: a dot per event joined
 * by a thin rail, what happened with who or why under it, and when at the
 * right end.
 *
 * @example
 * ```tsx
 * <Timeline>
 *   <TimelineItem tone="success" title="Credential rotated" meta="automatic" time="2h ago" />
 *   <TimelineItem tone="warning" title="Test connection failed" meta="timeout after 30s" time="3d ago" />
 * </Timeline>
 * ```
 */
const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn('mdt-timeline', className)} {...rest}>
      {children}
    </div>
  )
);
Timeline.displayName = 'Timeline';

/**
 * TimelineItem - one event on a Timeline: its dot (grey, or the success,
 * warning or danger ink), the title, a quiet line and the time.
 *
 * @example
 * ```tsx
 * <TimelineItem tone="danger" title="Store unreachable" meta="3 retries" time="5d ago" last />
 * ```
 */
function TimelineItem({ title, meta, time, tone = 'neutral', last }: TimelineItemProps) {
  return (
    <div className="mdt-timeline__item" data-tone={tone} data-last={last ? '' : undefined}>
      <span className="mdt-timeline__dot" aria-hidden="true" />
      <span className="mdt-timeline__body">
        <RowText truncate={false}>{title}</RowText>
        {hasContent(meta) && (
          <RowText kind="secondary" truncate={false}>
            {meta}
          </RowText>
        )}
      </span>
      {hasContent(time) && (
        <span className="mdt-timeline__time">
          <RowText kind="secondary" truncate={false}>
            {time}
          </RowText>
        </span>
      )}
    </div>
  );
}

export { Timeline, TimelineItem };
