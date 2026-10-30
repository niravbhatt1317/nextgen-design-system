import { RowText, hasContent } from './RowText';
import type { LogRowProps } from './RowList.types';

/* The console had three near-identical logs with three time policies (fmtRel, fmtRelWl, toLocaleString()); its
 * src/ui/RowList.jsx collapsed them onto this row. The time is formatted by the caller and right-aligned by the row,
 * so one log can never disagree with another about where its time sits. */

/**
 * LogRow - one line of a log or an activity feed inside a RowList: a glyph,
 * what happened with who or why under it, and when at the right end.
 *
 * @example
 * ```tsx
 * <RowList density="compact">
 *   <LogRow icon={<Icon name="check" size={13} />} message="Connection tested" time="2h ago" />
 *   <LogRow icon={<Icon name="pencil" size={13} />} message="Rotation policy changed" meta="by Meera K." time="1d ago" />
 * </RowList>
 * ```
 */
function LogRow({ icon, message, meta, time }: LogRowProps) {
  return (
    <div className="mdt-rowlist__row" data-slot="log-row">
      {hasContent(icon) && <span className="mdt-rowlist__leading">{icon}</span>}
      <span className="mdt-rowlist__body">
        <RowText>{message}</RowText>
        {hasContent(meta) && <RowText kind="secondary">{meta}</RowText>}
      </span>
      {hasContent(time) && (
        <span className="mdt-rowlist__actions">
          <RowText kind="secondary" truncate={false}>
            {time}
          </RowText>
        </span>
      )}
    </div>
  );
}

export { LogRow };
