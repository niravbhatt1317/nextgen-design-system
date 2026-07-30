import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Every class in this library carries the `mdt-` prefix, and the merger has to
 * be told that or it cannot tell two classes apart.
 *
 * Without it, `mdt-bg-primary` and `mdt-bg-destructive` look like unrelated
 * classes rather than two answers to the same question, so both survive and the
 * browser falls back to whichever Tailwind happened to emit later - which is
 * alphabetical. That is why a `color="error"` button rendered black while
 * `color="success"` rendered green: `destructive` sorts before `primary` and
 * `success` sorts after it. Nothing to do with either being right.
 */
const twMerge = extendTailwindMerge({ prefix: 'mdt-' });

/**
 * Utility function for merging Tailwind CSS classes with proper conflict resolution.
 * Combines clsx for conditional classes and tailwind-merge for deduplication.
 *
 * @example
 * ```tsx
 * cn('px-2 py-1', 'px-4') // => 'py-1 px-4'
 * cn('bg-red-500', condition && 'bg-blue-500') // Conditional classes
 * cn({ 'text-red-500': isError, 'text-green-500': !isError })
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
