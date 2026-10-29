import type { ReactNode } from 'react';

/* A row's own words, on the table cell's type roles (the console's CellText, src/ui/TableCore.jsx):
 *
 *   primary    12 / 500 / 1.45, the reading ink (neutral-150)
 *   secondary  11 / 400 / 1.45, the secondary ink (neutral-90) - outside a table the supporting line is this ink
 *   mono       12 / 500 / 1.45, the monospace face
 *
 * One line with "…" by default, and then a plain-string value carries itself as the tooltip, so a cut value is never
 * lost (the console's gap C19). Internal to the row family: a product puts words in a row through RowTitle, or through
 * the message / meta / time / label props of the other rows. */
export type RowTextKind = 'primary' | 'secondary' | 'mono';

interface RowTextProps {
  kind?: RowTextKind;
  truncate?: boolean;
  children?: ReactNode;
}

export function RowText({ kind = 'primary', truncate = true, children }: RowTextProps) {
  return (
    <span
      className="mdt-rowlist__text"
      data-role={kind}
      data-truncate={truncate ? '' : undefined}
      title={truncate && typeof children === 'string' ? children : undefined}
    >
      {children}
    </span>
  );
}

/** Something to show - neither left out, nor null, nor an empty string. */
export function hasContent(node: ReactNode): boolean {
  return node !== undefined && node !== null && node !== false && node !== '';
}
