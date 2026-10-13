'use client';

import { useId, useRef, useState } from 'react';
import type { MutableRefObject, ReactNode } from 'react';
import { cn } from '@/utils';
import { Button } from '../Button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  useTypedConfirmation,
} from '../Dialog';
import { Icon } from '../Icon';
import { Input } from '../Input';
import type { ConfirmDialogProps, ConfirmDialogWidth } from './ConfirmDialog.types';

/*
 * PORTED FROM THE CONSOLE (Pranjal, 2026-10-13). The console hand-builds this
 * dialog in seven places: `ConfirmDialog` in compat/om/atoms.jsx (the plain
 * confirm and the bin on delete verbs) and the typed "delete" confirms in
 * LifecycleModals, TeamModals, RoleModals, ServiceModals, FieldModals and
 * DeleteProfileDialog. Every number below is read off those files and the
 * console Modal they all ride (atoms.jsx `Modal`); nothing is new.
 */

/**
 * The console's two dialog widths (atoms.jsx `MODAL_WIDTHS`). The library's own
 * Dialog steps are 448 and 512, so neither lands on them - the console snaps
 * every modal to 480 or 560 and these are those two numbers.
 */
const WIDTH: Record<ConfirmDialogWidth, string> = {
  sm: 'sm:mdt-max-w-[480px]',
  md: 'sm:mdt-max-w-[560px]',
};

/**
 * The verbs that earn the bin (Pranjal, 2026-10-11 design picks: the
 * organizations confirm, everywhere). The atoms.jsx rule word for word - the
 * Roles and Access profile copies drop the word boundary, which would also
 * catch "Removed…" or "Deletes…"; the boundary is the stricter reading.
 */
const BIN_VERB = /^(delete|remove|permanently delete)\b/i;

/**
 * The body's reading: 14 / 1.5 in the reading ink (neutral-90). A name in
 * `<b>` or `<strong>` takes the heading ink (neutral-150) at 600, as the
 * console's `strong` style draws it.
 */
const BODY = cn(
  'mdt-text-sm mdt-leading-normal mdt-text-neutral-90',
  '[&_b]:mdt-font-semibold [&_b]:mdt-text-neutral-150',
  '[&_strong]:mdt-font-semibold [&_strong]:mdt-text-neutral-150'
);

/** Whether a body was given - `false` is what `cond && <x/>` leaves behind. */
const hasContent = (node: ReactNode) => node !== undefined && node !== null && node !== false;

/** Duck-typed so a thenable from any promise library counts. */
const isThenable = (value: unknown): value is PromiseLike<unknown> =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as { then?: unknown }).then === 'function';

interface PanelProps extends Omit<ConfirmDialogProps, 'open' | 'width' | 'className' | 'onCancel'> {
  busy: boolean;
  setBusy: (busy: boolean) => void;
  dismiss: () => void;
  focusRef: MutableRefObject<FocusTargets>;
}

/** The three places an open can land, filled in by the panel as it mounts. */
interface FocusTargets {
  field: HTMLInputElement | null;
  cancel: HTMLButtonElement | null;
  action: HTMLButtonElement | null;
}

/**
 * Everything inside the box.
 *
 * Its own component so it mounts with the dialog and unmounts with it: the
 * typed word starts empty on every open without anybody resetting it, which is
 * what the console's callers each did by hand with their own `confirmInput`.
 */
function ConfirmDialogPanel({
  title,
  description,
  children,
  confirmLabel,
  cancelLabel = 'Cancel',
  tone = 'default',
  confirmIcon,
  typedWord,
  confirmDisabled = false,
  hideCancel = false,
  onConfirm,
  onOpenChange,
  busy,
  setBusy,
  dismiss,
  focusRef,
}: PanelProps) {
  const fieldId = useId();
  const typed = useTypedConfirmation({ phrase: typedWord ?? '' });
  const needsWord = typedWord !== undefined && typedWord.trim() !== '';
  const armed = (!needsWord || typed.confirmed) && !confirmDisabled;
  const destructive = tone === 'destructive';

  const run = async () => {
    if (!armed || busy) return;
    let result: unknown;
    try {
      const out = onConfirm();
      if (isThenable(out)) {
        setBusy(true);
        result = await out;
      } else {
        result = out;
      }
    } catch {
      // The caller reports its own failure; the dialog only refuses to close
      // on it, so the person can try again without starting over.
      setBusy(false);
      return;
    }
    setBusy(false);
    if (result !== false) onOpenChange?.(false);
  };

  let leftIcon: ReactNode = confirmIcon;
  if (confirmIcon === undefined && destructive && BIN_VERB.test(confirmLabel)) {
    leftIcon = <Icon name="trash" aria-hidden />;
  }

  const hasBody = hasContent(children);

  return (
    <>
      {/* THE DIALOG HEADER = THE DRAWER HEADER (Pranjal, 2026-10-03): the title at 16 / 24, not the library
       * dialog's 18, and the border-token hairline under the header, 14 below the words (atoms.jsx `Modal`). */}
      <DialogHeader className="mdt-border-b mdt-border-border mdt-pb-3.5">
        <DialogTitle className="mdt-text-base mdt-leading-6">{title}</DialogTitle>
        {description !== undefined && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>

      {(hasBody || needsWord) && (
        <DialogBody>
          <div className="mdt-flex mdt-flex-col mdt-gap-4">
            {hasBody &&
              // Without a description line, the body is what the dialog is about, so it becomes
              // the dialog's description for a screen reader.
              (description === undefined ? (
                <DialogDescription asChild>
                  <div className={BODY}>{children}</div>
                </DialogDescription>
              ) : (
                <div className={BODY}>{children}</div>
              ))}
            {needsWord && (
              <div className="mdt-flex mdt-flex-col mdt-gap-1.5">
                {/* The label as the library Field draws its own (13 / 500, neutral-90), with the word
                 * itself lifted to the heading ink - the console's "Type <b>delete</b> to confirm". */}
                <label
                  htmlFor={fieldId}
                  className="mdt-text-[13px] mdt-font-medium mdt-text-neutral-90"
                >
                  Type <b className="mdt-font-bold mdt-text-neutral-150">{typedWord}</b> to confirm
                </label>
                <Input
                  id={fieldId}
                  ref={(node) => {
                    focusRef.current.field = node;
                  }}
                  value={typed.value}
                  onChange={typed.onChange}
                  placeholder={typedWord}
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            )}
          </div>
        </DialogBody>
      )}

      <DialogFooter>
        {!hideCancel && (
          <Button
            ref={(node) => {
              focusRef.current.cancel = node;
            }}
            variant="ghost"
            disabled={busy}
            onClick={dismiss}
          >
            {cancelLabel}
          </Button>
        )}
        <Button
          ref={(node) => {
            focusRef.current.action = node;
          }}
          variant={destructive ? 'destructive' : 'primary'}
          disabled={!armed}
          loading={busy}
          leftIcon={leftIcon}
          onClick={() => {
            void run();
          }}
        >
          {confirmLabel}
        </Button>
      </DialogFooter>
    </>
  );
}

/**
 * ConfirmDialog - a ready-made "are you sure".
 *
 * A title, what will happen and what will be lost, Cancel as the safe answer and
 * one action. Give it a `typedWord` and the action stays locked until that word
 * is typed (pasting counts). Return a promise from `onConfirm` and the action
 * turns busy until it settles, with every way out held shut meanwhile.
 *
 * Built on `Dialog` and `useTypedConfirmation`; it adds the console's header
 * (16 / 24 title over a hairline), its two widths and the bin on delete verbs.
 *
 * @example
 * ```tsx
 * <ConfirmDialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Delete team"
 *   tone="destructive"
 *   typedWord="delete"
 *   confirmLabel="Delete team"
 *   onConfirm={() => api.deleteTeam(id)}
 * >
 *   This will permanently delete <b>Platform</b> and revoke its access.
 * </ConfirmDialog>
 * ```
 */
function ConfirmDialog({
  open,
  onOpenChange,
  onCancel,
  width = 'sm',
  className,
  description,
  children,
  ...rest
}: ConfirmDialogProps) {
  const [busy, setBusy] = useState(false);
  const focusRef = useRef<FocusTargets>({ field: null, cancel: null, action: null });

  const dismiss = () => {
    onCancel?.();
    onOpenChange?.(false);
  };

  // The description line, or else the body, is linked by Radix on its own.
  // With neither there is nothing to describe the dialog, and Radix is told so
  // rather than left pointing at nothing.
  const noDescription =
    description === undefined && !hasContent(children) ? { 'aria-describedby': undefined } : {};

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) onOpenChange?.(true);
        else dismiss();
      }}
    >
      <DialogContent
        scroll="body"
        busy={busy}
        className={cn(WIDTH[width], className)}
        onOpenAutoFocus={(event) => {
          // A typed confirm lands in its field; every other one on Cancel, the
          // safe answer - and on the action only when there is no Cancel.
          const { field, cancel, action } = focusRef.current;
          const target = field ?? cancel ?? action;
          if (target) {
            event.preventDefault();
            target.focus();
          }
        }}
        {...noDescription}
      >
        <ConfirmDialogPanel
          {...rest}
          description={description}
          onOpenChange={onOpenChange}
          busy={busy}
          setBusy={setBusy}
          dismiss={dismiss}
          focusRef={focusRef}
        >
          {children}
        </ConfirmDialogPanel>
      </DialogContent>
    </Dialog>
  );
}

export { ConfirmDialog };
