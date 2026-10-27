'use client';

import { forwardRef, useEffect, useRef, useState, type MouseEvent } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type { InputActionProps } from './InputAction.types';
import './inputAction.css';

/* PORTED FROM THE CONSOLE (Ronak, 2026-10-09). The credential form's Reference path field carried Browse inside it
 * (features/credential-profiles/CredentialForm.jsx, credentialProfiles.css .cp-browse-wrap / .cp-browse): "merge the
 * browse button in the input so both in the single block", then "vertical divider line left side of the browse
 * button, and make little more prominent but it's should be simple", "vertical line should touch the top and bottom
 * border" and "browse button is not vertical center aligned". The same control then rode two more fields - Replace
 * on a stored secret (atoms.jsx StoredSecret, 2026-10-13: "make that component like we did in the browse fields") and
 * Copy in the store dialog (storeDialogs.jsx, "the Browse control's twin") - so it comes across as one part, the
 * action, with the word and glyph the caller's. A disabled button swallows hover, so the reason rides the wrapper's
 * title (CredentialForm: "No path-list API on this store"). */

/**
 * InputAction - an action that rides inside a field, at its right end, behind a hairline that runs border to border:
 * a glyph and a word ("Browse", "Replace", "Copy") on a quiet ghost control. Give it to the Input's `endAdornment`
 * and keep the field's text clear of it with a right padding as wide as the control.
 *
 * @example
 * ```tsx
 * <Input
 *   label="Reference path"
 *   placeholder="secret/data/<path>"
 *   style={{ paddingRight: 116 }}
 *   endAdornment={
 *     <InputAction icon="folder" onClick={openBrowser} disabled={!store} disabledReason="Pick a store first">
 *       Browse
 *     </InputAction>
 *   }
 * />
 * ```
 */
const InputAction = forwardRef<HTMLButtonElement, InputActionProps>(function InputAction(
  {
    children,
    icon,
    disabled = false,
    disabledReason,
    copyText,
    copiedLabel = 'Copied',
    copiedDuration = 1500,
    wrapperClassName,
    className,
    onClick,
    ...rest
  },
  ref
) {
  /* a copy action: "Copied" with a check in the success ink for a moment, as the console's ReadOnlyCopy does
   * (storeDialogs.jsx, 1500) - the clipboard may be blocked, and the value is still in the field then */
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(
    () => () => {
      clearTimeout(timer.current);
    },
    []
  );

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    if (copyText !== undefined) {
      const board = navigator.clipboard as Clipboard | undefined; // missing outside a secure context
      board?.writeText(copyText).catch(() => undefined);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setCopied(false);
      }, copiedDuration);
    }
    onClick?.(event);
  };

  const isCopy = copyText !== undefined;
  const glyph = copied ? 'check' : icon;

  return (
    <span
      className={cn('mdt-inaction', wrapperClassName)}
      title={disabled ? disabledReason : undefined}
    >
      <button
        ref={ref}
        type="button"
        className={cn('mdt-inaction__btn', copied && 'mdt-inaction__btn--done', className)}
        disabled={disabled}
        {...(isCopy
          ? { title: copied ? copiedLabel : typeof children === 'string' ? children : undefined }
          : {})}
        {...rest}
        onClick={handleClick}
      >
        {glyph ? <Icon name={glyph} size={14} aria-hidden /> : null}
        {isCopy ? <span aria-live="polite">{copied ? copiedLabel : children}</span> : children}
      </button>
    </span>
  );
});

InputAction.displayName = 'InputAction';

export { InputAction };
