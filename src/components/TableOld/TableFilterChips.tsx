import { cn } from '@/utils';
import { Button } from '../Button';
import { TagPill } from '../TagPill';
import type { TableFilterChipsOldProps } from './TableOld.types';

/**
 * TableFilterChipsOld - what is currently narrowing the table.
 *
 * **A filter you cannot see is a bug report.** A table showing four rows out of
 * two hundred, with the reason hidden inside a panel, is the single most common
 * way people conclude their data is missing. The chips are the answer to "why
 * am I not seeing it".
 *
 * `TagPill` rather than `Badge`, deliberately: a tag is something a person put
 * there and can take away, a badge is something the system applied. These are
 * the former, and they carry the remove control to prove it.
 *
 * **Each chip names its attribute.** "Open" alone is ambiguous the moment two
 * attributes share a value; "Status: Open" never is.
 *
 * **Known gap:** `TagPill` hardcodes `aria-label="Remove"` on its cross, so a
 * screen reader hears "Remove" once per chip with nothing to tell them apart.
 * The chip's own text carries the answer visually, but not to anyone listening.
 * Naming that control needs a prop on `TagPill`; it cannot be fixed from here.
 *
 * @deprecated Since 0.4.0. Applied filters are never shown as chips; the Filters
 * `ToolbarButton` carries a count instead (ruling of 4 September 2026).
 */
const TableFilterChipsOld = ({
  filters,
  labelFor,
  onRemove,
  onClear,
  className,
  ...props
}: TableFilterChipsOldProps) => {
  // Nothing filtered, nothing to explain.
  if (filters.length === 0) return null;

  return (
    <div className={cn('mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-2', className)} {...props}>
      {filters.map((filter) => (
        <TagPill
          key={filter.attribute}
          shape="square"
          onRemove={() => {
            onRemove(filter.attribute);
          }}
        >
          {/*
            Values joined rather than one chip each: "Status: Open, In Process"
            is one condition, and splitting it into two chips reads as two
            filters that would have to both be true - which is the opposite of
            what it does.
          */}
          {labelFor(filter.attribute)}: {filter.values.join(', ')}
        </TagPill>
      ))}

      {onClear !== undefined && filters.length > 1 && (
        <Button variant="link" size="sm" className="mdt-h-auto mdt-p-0" onClick={onClear}>
          Clear all
        </Button>
      )}
    </div>
  );
};

TableFilterChipsOld.displayName = 'TableFilterChipsOld';

export { TableFilterChipsOld };
