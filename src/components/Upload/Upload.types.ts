import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { uploadVariants } from './Upload';

export type UploadVariantsType = VariantProps<typeof uploadVariants>;

/**
 * What the field is collecting.
 *
 * `image` keeps the 180px frame after a file is chosen and shows the picture
 * inside it, because there is something worth looking at. `file` collapses to a
 * row - a document has nothing to preview, so a frame around it is empty space.
 */
export type UploadKind = 'image' | 'file';

/** Where a file has got to. */
export type UploadStatus = 'uploading' | 'done' | 'failed';

/**
 * Why a file failed **after it was accepted**.
 *
 * Too big and wrong format are deliberately absent. Both are known the instant
 * the file is picked, before a single byte moves, so they are refused at the
 * box and the file never becomes a row at all - the message goes in the field's
 * hint slot instead. These are only the things that can go wrong once a file is
 * already in the list.
 */
export type UploadFailure =
  | 'connection-lost'
  | 'timed-out'
  | 'server-error'
  | 'storage-full'
  | 'blocked-by-scan'
  | 'damaged'
  | 'signed-out'
  | 'cancelled';

/**
 * One file, as the caller describes it.
 *
 * **The component never touches a server.** It renders the state you give it
 * and tells you when someone acts. Every product has its own upload rules -
 * chunking, retries, signed URLs, virus scanning - and none of them belong in a
 * design system.
 */
export interface UploadItem {
  /** Stable across renders. It is what `onRemove` and `onRetry` hand back. */
  id: string;

  /** Shown in full, truncated with an ellipsis when the row runs out of room. */
  name: string;

  /** In bytes. Formatted for display; leave it out and the line is omitted. */
  size?: number | undefined;

  /** @default 'done' */
  status?: UploadStatus | undefined;

  /** 0-100. Only read while `status` is `uploading`. */
  progress?: number | undefined;

  /**
   * Only read while `status` is `failed`. A known reason gets standard wording
   * and decides whether Retry appears at all; a string of your own is shown as
   * written and always offers Retry.
   */
  // `string & {}` keeps the eight known reasons in autocomplete while still
  // accepting wording of your own. A plain `| string` swallows the union.
  failure?: UploadFailure | (string & {}) | undefined;

  /**
   * For an image, the URL to draw. An object URL is fine - revoking it is the
   * caller's job, since the caller is what created it.
   */
  previewUrl?: string | undefined;
}

export interface UploadOwnProps {
  /**
   * The files, as they stand. Leave it empty and the box is in its resting
   * state.
   */
  items?: UploadItem[] | undefined;

  /** @default 'file' */
  kind?: UploadKind | undefined;

  /** More than one file at a time. Turns on the list, its heading and count. */
  multiple?: boolean | undefined;

  /**
   * How many files are allowed. Shown beside the heading as `Limit 3 of 5`, and
   * the box stops accepting once it is reached. Only read when `multiple`.
   */
  maxFiles?: number | undefined;

  /** Passed straight to the file input, e.g. `image/png,image/jpeg`. */
  accept?: string | undefined;

  /** The one line inside the box. */
  label?: ReactNode | undefined;

  /** The smaller line under it - formats and size limit belong here. */
  supporting?: ReactNode | undefined;

  /** What the button says once the cursor is over the box. */
  actionLabel?: ReactNode | undefined;

  /**
   * The line under the box. It states the rules while nothing is wrong.
   *
   * **Only ever a reason the box refused a file** - too big, wrong format, too
   * many. Anything that goes wrong after a file is accepted belongs in that
   * file's own row, not here.
   */
  hint?: ReactNode | undefined;

  /**
   * The field is wrong: the border turns and the message replaces the hint,
   * with an icon. Nothing else changes - a red-filled box shouts about a wrong
   * file type.
   */
  error?: ReactNode | undefined;

  /** The heading over the list. @default 'Uploaded files' */
  listLabel?: ReactNode | undefined;

  /** @default false */
  disabled?: boolean | undefined;

  /**
   * The floor, in pixels. It may grow past this; it may never shrink below it.
   * @default 180
   */
  minHeight?: number | undefined;

  /**
   * Someone chose files, by picking or by dropping. **The component does not
   * add them** - put them in `items` yourself, so validation and upload stay
   * yours.
   */
  onSelect?: ((files: File[]) => void) | undefined;

  /** The cross was pressed. Cancels an upload in flight, removes a finished one. */
  onRemove?: ((id: string) => void) | undefined;

  /** Retry was pressed. Only offered when retrying could actually work. */
  onRetry?: ((id: string) => void) | undefined;

  className?: string;
}

export type UploadProps = UploadOwnProps &
  Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'onSelect' | 'children'>;

export interface UploadFileRowOwnProps {
  /** The file this row is about. */
  item: UploadItem;

  onRemove?: ((id: string) => void) | undefined;
  onRetry?: ((id: string) => void) | undefined;
  className?: string;
}

export type UploadFileRowProps = UploadFileRowOwnProps &
  Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'children'>;
