import type { UploadRejection, UploadRejectionReason } from './Upload.types';

/** 1 KB is 1024 bytes here, matching what an operating system reports. */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${String(bytes)} B`;
  const units = ['KB', 'MB', 'GB', 'TB'] as const;
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  const shown =
    value >= 10 || Number.isInteger(value) ? String(Math.round(value)) : value.toFixed(1);
  return `${shown} ${units[unit] ?? 'TB'}`;
}

/**
 * Does this file match the `accept` string?
 *
 * The same three forms the file input itself understands: an extension
 * (`.pdf`), a whole family (`image/*`), or an exact type (`application/pdf`).
 * An empty `accept` means everything is fine.
 *
 * Extension first, type second. A `.log` file usually arrives with no MIME type
 * at all, and a `.csv` arrives as `application/vnd.ms-excel` on some machines
 * and `text/csv` on others - the name is the more reliable of the two.
 */
export function matchesAccept(file: File, accept: string | undefined): boolean {
  const parts = (accept ?? '')
    .split(',')
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean);
  if (parts.length === 0) return true;

  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();

  return parts.some((p) => {
    if (p.startsWith('.')) return name.endsWith(p);
    if (p.endsWith('/*')) return type.startsWith(p.slice(0, -1));
    return type === p;
  });
}

/**
 * `accept` in words, for a message a person has to read.
 *
 * ".pdf,.docx" becomes "PDF or DOCX"; "image/*" becomes "images". A message
 * that repeats the raw attribute back at you - `.pdf,.doc,.docx` - is a message
 * written for the machine that rejected the file.
 */
export function describeAccept(accept: string | undefined): string {
  const parts = (accept ?? '')
    .split(',')
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean)
    .map((p) => {
      if (p.startsWith('.')) return p.slice(1).toUpperCase();
      if (p.endsWith('/*')) return `${p.slice(0, -2)}s`;
      return (p.split('/')[1] ?? p).toUpperCase();
    });

  const unique = [...new Set(parts)];
  const last = unique.at(-1);
  if (last === undefined) return 'any file';
  if (unique.length === 1) return last;
  return `${unique.slice(0, -1).join(', ')} or ${last}`;
}

export interface ValidateOptions {
  accept?: string | undefined;
  /** In bytes. */
  maxSize?: number | undefined;
  maxFiles?: number | undefined;
  /** How many are already in the list. */
  current?: number | undefined;
}

export interface ValidateResult {
  accepted: File[];
  rejected: UploadRejection[];
  /** What to put in the hint slot, or `undefined` when nothing was refused. */
  message?: string | undefined;
}

const reasonOf = (r: UploadRejection): UploadRejectionReason => r.reason;

/**
 * Check a selection before any of it becomes a row.
 *
 * **Every message names the number.** "That file is 24 MB, the limit is 10 MB"
 * tells you what to do next; "Invalid file" does not.
 *
 * Room is counted first, then each file is judged on its own. A selection is
 * never all-or-nothing: three good files and one that is too big means three
 * files go in and one message comes back, rather than a form that refuses
 * everything because of one mistake.
 */
export function validateSelection(files: File[], options: ValidateOptions = {}): ValidateResult {
  const { accept, maxSize, maxFiles, current = 0 } = options;
  const accepted: File[] = [];
  const rejected: UploadRejection[] = [];

  const room = maxFiles === undefined ? Number.POSITIVE_INFINITY : Math.max(0, maxFiles - current);

  files.forEach((file, i) => {
    if (i >= room) {
      rejected.push({ file, reason: 'too-many', message: '' });
      return;
    }
    if (!matchesAccept(file, accept)) {
      rejected.push({
        file,
        reason: 'wrong-format',
        message: `${extensionLabel(file.name)} files are not accepted. Use ${describeAccept(accept)}.`,
      });
      return;
    }
    if (maxSize !== undefined && file.size > maxSize) {
      rejected.push({
        file,
        reason: 'too-big',
        message: `${file.name} is ${formatFileSize(file.size)}. The limit is ${formatFileSize(maxSize)}.`,
      });
      return;
    }
    accepted.push(file);
  });

  return { accepted, rejected, ...(summarise(rejected, files.length, maxFiles) ?? {}) };
}

function extensionLabel(name: string): string {
  const dot = name.lastIndexOf('.');
  return dot < 0 ? 'Those' : name.slice(dot).toLowerCase();
}

/**
 * One line, whatever went wrong.
 *
 * Several messages stacked under a field is a wall nobody reads, so the most
 * actionable one wins: being out of room first, because it explains why files
 * you can see nothing wrong with were left out.
 */
function summarise(
  rejected: UploadRejection[],
  picked: number,
  maxFiles: number | undefined
): { message: string } | undefined {
  if (rejected.length === 0) return undefined;

  const tooMany = rejected.filter((r) => reasonOf(r) === 'too-many').length;
  if (tooMany > 0 && maxFiles !== undefined) {
    return {
      message: `You picked ${String(picked)} files. ${String(maxFiles)} is the limit, so ${String(tooMany)} ${tooMany === 1 ? 'was' : 'were'} left out.`,
    };
  }

  const first = rejected[0];
  if (first === undefined) return undefined;
  if (rejected.length === 1) return { message: first.message };

  const sameReason = rejected.every((r) => reasonOf(r) === reasonOf(first));
  if (sameReason && reasonOf(first) === 'wrong-format') {
    return { message: `${String(rejected.length)} files were not an accepted format.` };
  }
  if (sameReason && reasonOf(first) === 'too-big') {
    return { message: `${String(rejected.length)} files were over the size limit.` };
  }
  return { message: `${String(rejected.length)} files were not accepted.` };
}
