/** A column, as far as an export is concerned. */
export interface CsvColumn<Row> {
  /** The heading in the first line. */
  label: string;

  /** How to get this column's value out of a row. */
  value: (row: Row) => string | number | boolean | null | undefined;
}

export interface ToCsvOptions {
  /**
   * Whether to start the file with a byte order mark.
   *
   * Excel reads a UTF-8 CSV as the local codepage unless it finds one, which
   * turns every accented name into mojibake. Everything else ignores it.
   *
   * @default true
   */
  bom?: boolean;
}

/**
 * A field, escaped so a spreadsheet reads it back as one value.
 *
 * Quotes are doubled and the whole field wrapped whenever it contains a comma,
 * a quote or a line break - the three things that otherwise split one cell into
 * two, or one row into two. A subject line with a comma in it is not an edge
 * case; it is most subject lines.
 */
const escape = (value: string | number | boolean | null | undefined): string => {
  if (value === null || value === undefined) return '';
  const text = String(value);
  if (!/[",\r\n]/.test(text)) return text;
  return `"${text.replace(/"/g, '""')}"`;
};

/**
 * Turns rows into CSV text.
 *
 * Deliberately returns a string rather than downloading anything. Whether the
 * export is a download, a clipboard copy, an email attachment or a request to a
 * server that renders it properly is the product's decision, and a function
 * that reaches for `document` cannot be used on a server or tested without one.
 *
 * **Only what is on screen.** Pass the rows you are showing; a table backed by a
 * paged API has 10,000 rows the browser has never seen, and exporting the
 * current page while calling it "export" is a lie best avoided by making the
 * caller choose.
 *
 * @example
 * ```ts
 * const csv = toCsv(rows, [
 *   { label: 'ID', value: (row) => row.id },
 *   { label: 'Subject', value: (row) => row.subject },
 * ]);
 * ```
 */
export function toCsv<Row>(
  rows: Row[],
  columns: CsvColumn<Row>[],
  { bom = true }: ToCsvOptions = {}
): string {
  const header = columns.map((column) => escape(column.label)).join(',');
  const body = rows.map((row) => columns.map((column) => escape(column.value(row))).join(','));
  // CRLF, which is what the CSV spec says and what Excel expects. A lone \n is
  // read correctly by almost everything and mangled by the one tool most people
  // open these in.
  const text = [header, ...body].join('\r\n');
  return bom ? `\uFEFF${text}` : text;
}
