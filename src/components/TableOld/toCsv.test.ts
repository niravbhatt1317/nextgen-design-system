import { describe, it, expect } from 'vitest';
import { toCsvOld } from './toCsv';

interface Row {
  id: string;
  subject: string;
  count: number;
  done: boolean;
  note: string | null;
}

const rows: Row[] = [
  { id: 'TKT-1', subject: 'Plain', count: 2, done: true, note: null },
  { id: 'TKT-2', subject: 'Has, a comma', count: 0, done: false, note: undefined as never },
  { id: 'TKT-3', subject: 'Has "quotes"', count: 10, done: true, note: 'line\nbreak' },
];

const columns = [
  { label: 'ID', value: (row: Row) => row.id },
  { label: 'Subject', value: (row: Row) => row.subject },
  { label: 'Count', value: (row: Row) => row.count },
  { label: 'Done', value: (row: Row) => row.done },
  { label: 'Note', value: (row: Row) => row.note },
];

const lines = (csv: string) => csv.replace(/^\uFEFF/, '').split('\r\n');

describe('toCsvOld', () => {
  it('writes a header from the column labels', () => {
    expect(lines(toCsvOld(rows, columns))[0]).toBe('ID,Subject,Count,Done,Note');
  });

  it('writes one line per row', () => {
    expect(lines(toCsvOld(rows, columns))).toHaveLength(4);
  });

  it('leaves a plain field alone', () => {
    expect(lines(toCsvOld(rows, columns))[1]).toBe('TKT-1,Plain,2,true,');
  });

  it('quotes a field containing a comma, which would otherwise split the cell', () => {
    expect(lines(toCsvOld(rows, columns))[2]).toContain('"Has, a comma"');
  });

  it('doubles quotes inside a quoted field', () => {
    expect(toCsvOld(rows, columns)).toContain('"Has ""quotes"""');
  });

  it('quotes a field containing a line break, which would otherwise split the row', () => {
    expect(toCsvOld(rows, columns)).toContain('"line\nbreak"');
  });

  it('writes nothing for null and undefined rather than the words', () => {
    const csv = lines(toCsvOld(rows, columns));
    expect(csv[1]?.endsWith(',')).toBe(true);
    expect(csv.join('\n')).not.toContain('null');
    expect(csv.join('\n')).not.toContain('undefined');
  });

  it('separates rows with CRLF, which is what a spreadsheet expects', () => {
    expect(toCsvOld(rows.slice(0, 2), columns)).toContain('\r\n');
  });

  it('starts with a byte order mark, or Excel mangles accents', () => {
    expect(toCsvOld(rows, columns).startsWith('\uFEFF')).toBe(true);
  });

  it('leaves the mark off when asked', () => {
    expect(toCsvOld(rows, columns, { bom: false }).startsWith('\uFEFF')).toBe(false);
  });

  it('writes a header alone when there are no rows', () => {
    expect(lines(toCsvOld([], columns))).toEqual(['ID,Subject,Count,Done,Note']);
  });

  it('escapes a label that needs it', () => {
    const csv = toCsvOld([], [{ label: 'Total, net', value: () => '' }]);
    expect(csv).toContain('"Total, net"');
  });
});
