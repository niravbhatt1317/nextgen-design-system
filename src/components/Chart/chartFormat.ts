/* How the charts write their numbers - the console Health's fmt / dec / pct, kept in one place so every chart writes
 * a count, a reading and a share the same way. */

/** A count as the charts print it: whole, with thousands separators ("1,979"). */
export const formatCount = (n: number) => Math.round(n).toLocaleString('en-US');

/** A reading with up to two decimals and no trailing zeros ("0.75", "12"). */
export const formatReading = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });

/** A share in percent to one decimal: 40 of 2,114 is 1.9. Zero when there is nothing to share. */
export const shareOf = (part: number, whole: number) =>
  whole ? Math.round((part / whole) * 1000) / 10 : 0;

/** The noun for a count: singular at exactly 1. */
export const nounFor = (n: number, noun: { one: string; many: string }) =>
  n === 1 ? noun.one : noun.many;
