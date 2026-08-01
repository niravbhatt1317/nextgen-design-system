import { cva } from 'class-variance-authority';
import { forwardRef, useCallback, useId, useRef, useState } from 'react';
import type { DragEvent, ReactNode } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import { IconTile } from '../IconTile';
import type { UploadFailure, UploadFileRowProps, UploadItem, UploadProps } from './Upload.types';

/**
 * Upload styles.
 *
 * ## It is a form field, not a panel
 *
 * It sits in a form beside inputs and selects, so it takes the input's width
 * (100% of its column) and the input's 6px corner rather than a card's 8px. A
 * card's corner makes it read as a panel that happens to be in a form.
 *
 * ## The floor
 *
 * 180px minimum, and it never bends. A crowded screen is not a reason to make a
 * drop target too small to aim at. It may grow with its content; it may not
 * shrink.
 *
 * ## Where each kind of problem is reported
 *
 * | What went wrong                        | Where it is said                    |
 * | -------------------------------------- | ----------------------------------- |
 * | Too big, wrong format, too many        | The **box** turns, message beneath  |
 * | Anything after the file was accepted   | The **row** turns, reason inside it |
 *
 * The first group is known before a byte moves, so those files never become
 * rows. The second group can only be discovered later, and with several files
 * in flight there is no single message that could serve them all - one may have
 * lost the connection while another was refused by the server.
 *
 * ## Not blue
 *
 * Blue is the accent. A surface reacting to a cursor is not an accent moment,
 * so hover lifts a neutral step. Dragging is told apart without colour at all:
 * **the dashed edge closes up into a solid line.**
 */
export const uploadVariants = cva(
  [
    'mdt-relative mdt-w-full mdt-min-w-[180px]',
    'mdt-grid mdt-place-items-center',
    'mdt-rounded-md mdt-border mdt-border-dashed',
    'mdt-p-[18px] mdt-text-center',
    'mdt-transition-[background-color,border-color] mdt-duration-150',
  ],
  {
    variants: {
      state: {
        // One step darker than the card's own edge. At `border` weight a dashed
        // line reads as a smudge on white, and the dash is the whole affordance.
        rest: [
          'mdt-border-neutral-50 mdt-bg-background mdt-text-muted-foreground',
          'hover:mdt-border-neutral-100 hover:mdt-bg-secondary',
          'dark:hover:mdt-border-neutral-40',
        ],
        // Mid-drag there is nothing to click, so the action never arrives. The
        // dash closing up says "you have arrived" without reaching for a colour.
        over: 'mdt-border-solid mdt-border-foreground mdt-bg-secondary mdt-text-foreground',
        // The border turns and nothing else, which is what Input does. A red
        // fill shouts about a wrong file type.
        error: 'mdt-border-destructive mdt-bg-background mdt-text-muted-foreground',
        disabled:
          'mdt-border-neutral-50 mdt-bg-background mdt-text-muted-foreground mdt-opacity-45',
      },
    },
    defaultVariants: { state: 'rest' },
  }
);

/** The two layers share one grid cell, so nothing moves as they cross-fade. */
const LAYER = 'mdt-col-start-1 mdt-row-start-1 mdt-flex mdt-flex-col mdt-items-center';

/**
 * The action is drawn to Button's `outline` values - h-9, px-4, text-sm,
 * border-input on background, muted on hover.
 *
 * It is a `<span>`, not a `<Button>`. The whole box is the control; a real
 * button inside it would be a control inside a control, which is ambiguous to
 * click and invalid to nest. Outline rather than primary: attaching a logo is
 * not the loudest thing on a settings page.
 */
const ACTION_LOOK = cn(
  'mdt-inline-flex mdt-h-9 mdt-items-center mdt-gap-2 mdt-px-4',
  'mdt-rounded-md mdt-border mdt-border-input mdt-bg-background',
  'mdt-text-sm mdt-font-medium mdt-text-foreground',
  // `hover:`, never `group-hover:`. The group is the whole box, so a group hover
  // would leave the action filled from the moment the cursor arrived anywhere on
  // it - the button read as pressed before anyone had pressed it.
  'mdt-transition-colors hover:mdt-bg-muted'
);

/**
 * Which failures are worth offering a Retry for.
 *
 * A row saying "Storage full" or "Blocked by scan" gets the cross alone.
 * Offering a button that cannot succeed is worse than not offering one.
 */
const NO_RETRY: readonly UploadFailure[] = ['storage-full', 'blocked-by-scan', 'damaged'];

/**
 * Two or three words, no punctuation. The line is 12px and sits beside a
 * filename that may already be long; a sentence there wraps and takes the row
 * off its 74px. Anything needing a sentence is a field-level problem.
 */
const FAILURE_TEXT: Record<UploadFailure, string> = {
  'connection-lost': 'Connection lost',
  'timed-out': 'Timed out',
  'server-error': 'Server error',
  'storage-full': 'Storage full',
  'blocked-by-scan': 'Blocked by scan',
  damaged: 'File is damaged',
  'signed-out': 'Signed out',
  cancelled: 'Cancelled',
};

const isKnownFailure = (f: string): f is UploadFailure => f in FAILURE_TEXT;

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

/** The three letters a mark carries, capped so a long extension cannot overflow. */
function extensionOf(name: string): string {
  const dot = name.lastIndexOf('.');
  if (dot < 0 || dot === name.length - 1) return 'FILE';
  return name
    .slice(dot + 1)
    .toUpperCase()
    .slice(0, 4);
}

/**
 * The file's mark: one document shape carrying its extension.
 *
 * Deliberately **not** an `<Icon>`. The icon rule exists so that one glyph never
 * means two things, and every name in the set is a fixed drawing. This is not a
 * fixed drawing - it is a frame around a string that changes per file, and
 * adding `file-pdf`, `file-csv`, `file-xlsx` … to the icon set is exactly the
 * sprawl that rule prevents. A new file type needs no new artwork here; it needs
 * three letters.
 */
function FileMark({ name }: { readonly name: string }) {
  return (
    <span className="mdt-h-12 mdt-w-10 mdt-shrink-0 mdt-text-muted-foreground" aria-hidden="true">
      <svg viewBox="0 0 40 48" className="mdt-block mdt-h-full mdt-w-full">
        <path
          d="M3 1h22l14 14v31a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2Z"
          fill="currentColor"
          opacity=".13"
        />
        <path d="M25 1l14 14H27a2 2 0 0 1-2-2V1Z" fill="currentColor" opacity=".34" />
        <text
          x="20"
          y="36"
          textAnchor="middle"
          fontSize={extensionOf(name).length > 3 ? 9 : 10}
          fontWeight="700"
          fill="currentColor"
        >
          {extensionOf(name)}
        </text>
      </svg>
    </span>
  );
}

/**
 * One file, as a row.
 *
 * ## 74px, whatever state it is in
 *
 * The floor is the 48px mark plus its padding. Without it a failed row comes out
 * 8px shorter than the others - an error tile is square and a file mark is not -
 * and the list would jump the moment an upload gave up.
 *
 * ## The second line is the reason, not the word "Failed"
 *
 * The red border already says it failed. That line is the only place left to say
 * *why*, and spending it on a word you can already see wastes it.
 */
const UploadFileRow = forwardRef<HTMLDivElement, UploadFileRowProps>(
  ({ item, onRemove, onRetry, className, ...rest }, ref) => {
    const status = item.status ?? 'done';
    const failed = status === 'failed';
    const failure = item.failure;
    const reason =
      typeof failure === 'string' && isKnownFailure(failure) ? FAILURE_TEXT[failure] : failure;
    const canRetry =
      typeof failure === 'string' && isKnownFailure(failure)
        ? !NO_RETRY.includes(failure)
        : failure !== undefined;

    return (
      <div
        ref={ref}
        data-slot="upload-file"
        data-status={status}
        className={cn(
          'mdt-flex mdt-w-full mdt-items-center mdt-gap-3.5',
          'mdt-min-h-[74px] mdt-rounded-md mdt-border mdt-py-3 mdt-pl-3.5 mdt-pr-3',
          'mdt-bg-card mdt-text-card-foreground',
          failed ? 'mdt-border-destructive' : 'mdt-border-border',
          className
        )}
        {...rest}
      >
        {failed ? (
          <IconTile icon={<Icon name="alert-circle" size="md" />} tone="rose" size="lg" />
        ) : (
          <FileMark name={item.name} />
        )}

        <span className="mdt-flex mdt-min-w-0 mdt-flex-1 mdt-flex-col mdt-gap-1">
          <span className="mdt-truncate mdt-text-sm mdt-font-medium">{item.name}</span>

          {failed ? (
            // Red at token strength measures 3.62 as words on a dark page. Badge
            // and Button already work around it the same way - the token for
            // fills, a lighter ramp step for text.
            <span role="alert" className="mdt-text-xs mdt-text-destructive dark:mdt-text-red-30">
              {reason}
            </span>
          ) : null}

          {status === 'uploading' ? (
            // The bar sits where the size will be, so the row is exactly as tall
            // as a finished one and nothing shifts when it lands.
            <span className="mdt-flex mdt-items-center mdt-gap-3">
              <span
                role="progressbar"
                aria-label={`Uploading ${item.name}`}
                aria-valuenow={Math.round(item.progress ?? 0)}
                aria-valuemin={0}
                aria-valuemax={100}
                className="mdt-h-1.5 mdt-flex-1 mdt-overflow-hidden mdt-rounded-full mdt-bg-muted"
              >
                <span
                  className="mdt-block mdt-h-full mdt-rounded-full mdt-bg-foreground mdt-transition-[width] mdt-duration-200"
                  style={{ width: `${String(Math.min(100, Math.max(0, item.progress ?? 0)))}%` }}
                />
              </span>
              <span className="mdt-shrink-0 mdt-text-xs mdt-text-muted-foreground">
                {String(Math.round(item.progress ?? 0))}%
              </span>
            </span>
          ) : null}

          {status === 'done' && item.size !== undefined ? (
            <span className="mdt-text-xs mdt-text-muted-foreground">
              {formatFileSize(item.size)}
            </span>
          ) : null}
        </span>

        <span className="mdt-flex mdt-shrink-0 mdt-items-center">
          {failed && canRetry ? (
            <>
              <button
                type="button"
                aria-label={`Try ${item.name} again`}
                onClick={() => onRetry?.(item.id)}
                className="mdt-inline-flex mdt-h-8 mdt-w-8 mdt-items-center mdt-justify-center mdt-rounded-md mdt-text-muted-foreground mdt-transition-colors hover:mdt-bg-secondary hover:mdt-text-foreground"
              >
                <Icon name="rotate-ccw" size="sm" />
              </button>
              {/* so retry and remove do not read as one pair you might hit by mistake */}
              <span
                aria-hidden="true"
                className="mdt-mx-[3px] mdt-my-1 mdt-w-px mdt-self-stretch mdt-bg-border"
              />
            </>
          ) : null}
          <button
            type="button"
            aria-label={status === 'uploading' ? `Cancel ${item.name}` : `Remove ${item.name}`}
            onClick={() => onRemove?.(item.id)}
            className="mdt-inline-flex mdt-h-8 mdt-w-8 mdt-items-center mdt-justify-center mdt-rounded-md mdt-text-muted-foreground mdt-transition-colors hover:mdt-bg-red-10 hover:mdt-text-destructive dark:hover:mdt-bg-red-90 dark:hover:mdt-text-red-30"
          >
            <Icon name="x" size="sm" />
          </button>
        </span>
      </div>
    );
  }
);
UploadFileRow.displayName = 'UploadFileRow';

interface UploadBoxProps {
  readonly state: 'rest' | 'over' | 'error' | 'disabled';
  readonly locked: boolean;
  readonly dragging: boolean;
  readonly inputId: string;
  readonly label: ReactNode;
  readonly supporting: ReactNode;
  readonly actionLabel: ReactNode;
  readonly minHeight: number;
  readonly onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  readonly onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  readonly onDrop: (e: DragEvent<HTMLDivElement>) => void;
}

/**
 * The drop target.
 *
 * The whole area is the control, so it is a `<label>` over a hidden input - not
 * a div with a click handler, which a keyboard cannot reach and a screen reader
 * cannot name. Once it is locked the label goes, because a label that does
 * nothing is worse than no label.
 */
function UploadBox({
  state,
  locked,
  dragging,
  inputId,
  label,
  supporting,
  actionLabel,
  minHeight,
  onDragOver,
  onDragLeave,
  onDrop,
}: UploadBoxProps) {
  const resting = (
    <>
      <IconTile
        icon={<Icon name="upload" size="sm" />}
        tone="slate"
        size="lg"
        className={cn(dragging && 'mdt-bg-foreground mdt-text-background')}
      />
      <span className="mdt-text-sm mdt-text-foreground">{label}</span>
      {supporting !== undefined && supporting !== null ? (
        <span className="mdt-text-xs mdt-opacity-80">{supporting}</span>
      ) : null}
    </>
  );

  return (
    // The keyboard path is the input this wraps; drag is a pointer-only
    // affordance layered on top of it, never the only way in.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      data-slot="upload-box"
      data-state={state}
      className={cn(uploadVariants({ state }), 'mdt-group')}
      style={{ minHeight }}
      onDragOver={onDragOver}
      onDragEnter={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {locked ? (
        <span className={cn(LAYER, 'mdt-gap-3')}>{resting}</span>
      ) : (
        <>
          <label
            htmlFor={inputId}
            className="mdt-absolute mdt-inset-0 mdt-cursor-pointer mdt-rounded-md"
          >
            <span className="mdt-sr-only">
              {typeof label === 'string' ? label : 'Choose a file'}
            </span>
          </label>
          {/*
            Resting and hovered live in the same grid cell and cross-fade.
            Nothing slides, and the box holds its floor as the sentence gives way
            to the action.
          */}
          <span
            aria-hidden="true"
            className={cn(
              LAYER,
              'mdt-gap-3 mdt-transition-opacity mdt-duration-150',
              dragging ? 'mdt-opacity-100' : 'group-hover:mdt-opacity-0'
            )}
          >
            {resting}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              LAYER,
              'mdt-opacity-0 mdt-transition-opacity mdt-duration-150',
              dragging ? '' : 'group-hover:mdt-opacity-100'
            )}
          >
            <span className={ACTION_LOOK}>
              <Icon name="upload" size="sm" />
              {actionLabel}
            </span>
          </span>
        </>
      )}
    </div>
  );
}

interface UploadImagePreviewProps {
  readonly item: UploadItem;
  readonly minHeight: number;
  readonly onChange: () => void;
  readonly onRemove?: ((id: string) => void) | undefined;
}

/**
 * The picture, once one has been chosen.
 *
 * A glimpse, not a fill: **20px in from every side, at any size.** An inset, not
 * a proportion - make the field taller and the picture gets bigger, never the
 * frame thinner. It never crops, so a square logo and a wide banner both arrive
 * whole.
 *
 * Hover blurs it and offers Change and Remove. **The blur is the whole
 * treatment** - a dark panel over the top was tried and dropped, because that is
 * two things where one will do.
 */
function UploadImagePreview({ item, minHeight, onChange, onRemove }: UploadImagePreviewProps) {
  return (
    <div
      data-slot="upload-preview"
      className={cn(
        'mdt-group mdt-relative mdt-w-full mdt-overflow-hidden mdt-rounded-md mdt-border mdt-bg-card',
        item.status === 'failed' ? 'mdt-border-destructive' : 'mdt-border-border'
      )}
      style={{ minHeight, height: minHeight }}
    >
      <img
        src={item.previewUrl}
        alt={item.name}
        className="mdt-absolute mdt-inset-5 mdt-h-[calc(100%-40px)] mdt-w-[calc(100%-40px)] mdt-rounded-sm mdt-object-contain mdt-transition-[filter] mdt-duration-200 group-hover:mdt-blur-[5px]"
      />
      <div className="mdt-absolute mdt-inset-0 mdt-flex mdt-items-center mdt-justify-center mdt-gap-3 mdt-opacity-0 mdt-transition-opacity mdt-duration-150 focus-within:mdt-opacity-100 group-hover:mdt-opacity-100">
        <button type="button" onClick={onChange} className={ACTION_LOOK}>
          <Icon name="upload" size="sm" />
          Change image
        </button>
        <button
          type="button"
          onClick={() => {
            onRemove?.(item.id);
          }}
          className={cn(
            'mdt-inline-flex mdt-h-9 mdt-items-center mdt-gap-2 mdt-rounded-md mdt-border mdt-px-4 mdt-text-sm mdt-font-medium',
            'mdt-border-destructive mdt-bg-background mdt-text-destructive',
            'hover:mdt-bg-red-10 dark:mdt-border-red-30 dark:mdt-text-red-30 dark:hover:mdt-bg-red-90'
          )}
        >
          <Icon name="trash-2" size="sm" />
          Remove image
        </button>
      </div>
    </div>
  );
}

/** One place decides how the box looks, in the order the states override each other. */
function boxState({
  locked,
  dragging,
  hasError,
}: {
  readonly locked: boolean;
  readonly dragging: boolean;
  readonly hasError: boolean;
}): 'rest' | 'over' | 'error' | 'disabled' {
  if (locked) return 'disabled';
  if (dragging) return 'over';
  if (hasError) return 'error';
  return 'rest';
}

interface RowHandlers {
  readonly onRemove?: ((id: string) => void) | undefined;
  readonly onRetry?: ((id: string) => void) | undefined;
}

interface UploadListProps {
  readonly items: UploadItem[];
  readonly listLabel: ReactNode;
  readonly full: boolean;
  readonly maxFiles?: number | undefined;
  readonly rowHandlers: RowHandlers;
}

/**
 * The list under the box, once more than one file is allowed.
 *
 * The heading names the rows; the count says how much room is left. The count is
 * a fact rather than a warning, so it sits at hint weight - and even at the
 * limit it goes **firm, not red**: using what you were given is not a mistake.
 * It is right-aligned with the box and the rows, where the eye already is when
 * reading down the list.
 */
function UploadList({ items, listLabel, full, maxFiles, rowHandlers }: UploadListProps) {
  return (
    <>
      <div className="mdt-mt-2 mdt-flex mdt-items-baseline mdt-justify-between mdt-gap-3">
        <span className="mdt-text-[13px] mdt-font-medium mdt-text-foreground">{listLabel}</span>
        {maxFiles !== undefined ? (
          <span
            className={cn(
              'mdt-shrink-0 mdt-text-xs',
              full ? 'mdt-font-medium mdt-text-foreground' : 'mdt-text-muted-foreground'
            )}
          >
            Limit {String(items.length)} of {String(maxFiles)}
          </span>
        ) : null}
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        {items.map((item) => (
          <UploadFileRow key={item.id} item={item} {...rowHandlers} />
        ))}
      </div>
    </>
  );
}

/**
 * The line under the box.
 *
 * One slot, whatever is in it. Resting it states the rules; on error it turns
 * and takes an icon. Same place, same height, so the form never jumps between
 * the two.
 *
 * The icon's box is exactly as tall as one line of the message and the drawing
 * centres inside it, so it stays on the middle of the first line however many
 * lines the message runs to. A fixed nudge only ever lines up at one font size.
 */
function UploadHint({
  id,
  hint,
  error,
}: {
  readonly id: string;
  readonly hint: ReactNode;
  readonly error: ReactNode;
}) {
  if (error === undefined && hint === undefined) return null;
  const isError = error !== undefined;
  return (
    <p
      id={id}
      {...(isError ? { role: 'alert' as const } : {})}
      className={cn(
        'mdt-m-0 mdt-flex mdt-min-h-[18px] mdt-items-start mdt-gap-1.5 mdt-text-xs',
        isError ? 'mdt-text-destructive dark:mdt-text-red-30' : 'mdt-text-muted-foreground'
      )}
    >
      {isError ? (
        <Icon
          name="alert-circle"
          className="mdt-h-[1.55em] mdt-w-[13px] mdt-shrink-0"
          aria-hidden
        />
      ) : null}
      {error ?? hint}
    </p>
  );
}

/**
 * Upload - one file or many, as a form field.
 *
 * @example
 * ```tsx
 * <Upload
 *   label="Choose a file or drop it here"
 *   supporting="PDF, DOC or XLSX · up to 10 MB"
 *   hint="PDF, DOC or XLSX · up to 10 MB"
 *   items={files}
 *   onSelect={handleSelect}
 *   onRemove={handleRemove}
 * />
 * ```
 */
const Upload = forwardRef<HTMLDivElement, UploadProps>(
  (
    {
      items = [],
      kind = 'file',
      multiple = false,
      maxFiles,
      accept,
      label = 'Choose a file or drop it here',
      supporting,
      actionLabel = 'Upload file',
      hint,
      error,
      listLabel = 'Uploaded files',
      disabled = false,
      minHeight = 180,
      onSelect,
      onRemove,
      onRetry,
      className,
      ...rest
    },
    ref
  ) => {
    const inputId = useId();
    const hintId = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);

    const full = multiple && maxFiles !== undefined && items.length >= maxFiles;
    const locked = disabled || full;

    // A single file that has landed replaces the box: the image keeps the frame
    // because there is a picture to look at, the document collapses to a row.
    const single = !multiple && items.length > 0 ? items[0] : undefined;
    const showBox = multiple || single === undefined;

    const openPicker = useCallback(() => inputRef.current?.click(), []);

    const handleFiles = useCallback(
      (list: FileList | null) => {
        if (!list || list.length === 0) return;
        onSelect?.(Array.from(list));
      },
      [onSelect]
    );

    const stop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
      stop(e);
      if (!locked) setDragging(true);
    };
    const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
      stop(e);
      setDragging(false);
    };
    const onDrop = (e: DragEvent<HTMLDivElement>) => {
      stop(e);
      setDragging(false);
      if (!locked) handleFiles(e.dataTransfer.files);
    };

    const state = boxState({ locked, dragging, hasError: error !== undefined });

    // Worked out once. Under exactOptionalPropertyTypes an absent handler has to
    // be absent, not undefined, so this spread is the only way to pass them on.
    const rowHandlers = {
      ...(onRemove !== undefined ? { onRemove } : {}),
      ...(onRetry !== undefined ? { onRetry } : {}),
    };

    const boxLabel = full ? `All ${String(maxFiles)} files added` : label;
    const boxSupporting = full ? 'Remove one to add another' : supporting;

    return (
      <div
        ref={ref}
        className={cn('mdt-flex mdt-w-full mdt-flex-col mdt-gap-2', className)}
        {...rest}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          className="mdt-sr-only"
          multiple={multiple}
          disabled={locked}
          {...(accept !== undefined ? { accept } : {})}
          onChange={(e) => {
            handleFiles(e.target.files);
            // so choosing the same file twice in a row still fires
            e.target.value = '';
          }}
        />

        {showBox ? (
          <UploadBox
            state={state}
            locked={locked}
            dragging={dragging}
            inputId={inputId}
            label={boxLabel}
            supporting={boxSupporting}
            actionLabel={actionLabel}
            minHeight={minHeight}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          />
        ) : null}

        {/* ── one image, chosen ── */}
        {single !== undefined && kind === 'image' ? (
          <UploadImagePreview
            item={single}
            minHeight={minHeight}
            onChange={openPicker}
            {...(onRemove !== undefined ? { onRemove } : {})}
          />
        ) : null}

        {/* ── one document, chosen: the box keeps its shape and the file moves in ── */}
        {single !== undefined && kind === 'file' ? (
          <div
            data-slot="upload-single"
            className="mdt-grid mdt-w-full mdt-place-items-center mdt-rounded-md mdt-border mdt-border-border mdt-bg-background mdt-p-[18px]"
            style={{ minHeight }}
          >
            <UploadFileRow item={single} {...rowHandlers} />
          </div>
        ) : null}

        {/* ── many files: a heading names the rows, a count says what is left ── */}
        {multiple && items.length > 0 ? (
          <UploadList
            items={items}
            listLabel={listLabel}
            full={full}
            {...(maxFiles !== undefined ? { maxFiles } : {})}
            rowHandlers={rowHandlers}
          />
        ) : null}

        <UploadHint id={hintId} hint={hint} error={error} />
      </div>
    );
  }
);
Upload.displayName = 'Upload';

export { Upload, UploadFileRow };
export type { ReactNode as UploadNode, UploadItem };
