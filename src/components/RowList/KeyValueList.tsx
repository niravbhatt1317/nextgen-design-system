import { forwardRef } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '@/utils';
import { RowText, hasContent } from './RowText';
import type { KeyValueListProps, KeyValueItemProps } from './RowList.types';
import './rowList.css';

/* The console counted eighteen key / value lists across ten geometries (its gap C24). They describe ONE record, label
 * to value, so they are description lists, not tables: <dl> semantics, one label width, one row padding, one
 * separator rule (src/ui/RowList.jsx KeyValueList; rulebook K-KeyValue-01). Live in Email / LDAP setup and the
 * Service account summary card.
 *
 * Not the drawer's fact row: a record's About tab reads `SheetField` (13 type, the label half the row). This list is
 * the compact summary - table type, a fixed label column - for a card, a confirm or a setup step.
 *
 * The console calls the row `KeyValueRow`; here it is `KeyValueItem`, so it cannot be mistaken for `KeyValuesRow`, the
 * data type of one row of the KeyValuesBuilder editor (a different job: that one edits, this one reads). */

const DEFAULT_LABEL_WIDTH = 150;

/**
 * KeyValueList - a compact description list (key · value) on the table's
 * type, one label width for every row, top-aligned, with an optional line
 * between rows. For a summary card or a setup step; a drawer's About tab uses
 * SheetField.
 *
 * @example
 * ```tsx
 * <KeyValueList separated labelWidth={180}>
 *   <KeyValueItem label="Store type">HashiCorp Vault</KeyValueItem>
 *   <KeyValueItem label="Endpoint" hint="mutual TLS">vault.acmehealth.org</KeyValueItem>
 * </KeyValueList>
 * ```
 */
const KeyValueList = forwardRef<HTMLDListElement, KeyValueListProps>(
  ({ labelWidth = DEFAULT_LABEL_WIDTH, separated, className, style, children, ...rest }, ref) => (
    <dl
      ref={ref}
      className={cn('mdt-kvlist', className)}
      data-separated={separated ? '' : undefined}
      style={{ '--mdt-kv-label': `${String(labelWidth)}px`, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </dl>
  )
);
KeyValueList.displayName = 'KeyValueList';

/**
 * KeyValueItem - one key and its value in a KeyValueList; the value wraps
 * rather than cuts, with an optional quiet line under it.
 *
 * @example
 * ```tsx
 * <KeyValueItem label="Expires" hint="in 83 days">20 Jan 2027</KeyValueItem>
 * ```
 */
function KeyValueItem({ label, children, hint }: KeyValueItemProps) {
  return (
    <div className="mdt-kvlist__row">
      <dt className="mdt-kvlist__label">
        <RowText kind="secondary" truncate={false}>
          {label}
        </RowText>
      </dt>
      <dd className="mdt-kvlist__value">
        <RowText truncate={false}>{children}</RowText>
        {hasContent(hint) && (
          <RowText kind="secondary" truncate={false}>
            {hint}
          </RowText>
        )}
      </dd>
    </div>
  );
}

export { KeyValueList, KeyValueItem };
