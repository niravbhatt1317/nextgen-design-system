'use client';

import { cloneElement, useEffect, useRef, useState, type MouseEvent } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../Tooltip';
import type { CopyTipProps } from './CopyTip.types';

/* PORTED FROM THE CONSOLE (Pranjal, 2026-10-28) - ui/CopyTip.jsx, the copy feedback of his 2026-10-11 design picks (from
 * the SSO break-glass sign-in link of 2026-10-03): a copy says so in the library Tooltip - "Copy" under the pointer,
 * "Copied" for 1.4 s after the press - never a toast, never a label that changes. The console wraps every copy control in
 * it: the icon-only ghost copy beside an ID, and the "Copy" / "Copy link" buttons that already say what they do
 * (`hoverTip={false}`). CopyField's own button goes through it too, so the library has one copy mechanism, not two. */

/** How long the tooltip says "Copied" after a press. */
const COPIED_FOR_MS = 1400;

/** Writes to the clipboard; a refused or blocked clipboard is swallowed, as the console's copyToClipboard does. */
const writeClipboard = (text: string): void => {
  try {
    void navigator.clipboard.writeText(text).catch(() => undefined);
  } catch {
    /* clipboard blocked */
  }
};

/**
 * CopyTip - wraps a copy control so a press copies the text and the library
 * tooltip says "Copied"; under the pointer it says "Copy".
 *
 * @example
 * ```tsx
 * <CopyTip text={entityId}>
 *   <Button iconOnly variant="ghost" size="sm" ariaLabel="Copy entity ID" leftIcon={<Icon name="copy" size="sm" />} />
 * </CopyTip>
 *
 * <CopyTip text={inviteUrl} hoverTip={false}>
 *   <Button variant="secondary" leftIcon={<Icon name="copy" size="sm" />}>Copy link</Button>
 * </CopyTip>
 * ```
 */
const CopyTip = ({
  text,
  tip = 'Copy',
  hoverTip = true,
  side = 'top',
  onCopy,
  children,
}: CopyTipProps) => {
  const [hover, setHover] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(
    () => () => {
      clearTimeout(timer.current);
    },
    []
  );

  const onClick = (event: MouseEvent<HTMLElement>): void => {
    children.props.onClick?.(event);
    const value = typeof text === 'function' ? text() : text;
    writeClipboard(value);
    onCopy?.(value);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCopied(false);
    }, COPIED_FOR_MS);
  };

  return (
    <TooltipProvider>
      <Tooltip open={copied || (hoverTip && hover)} onOpenChange={setHover} disableHoverableContent>
        {/* its own inline span as the anchor (the console's): any control fits, ref or not, and the bubble sits on it */}
        <TooltipTrigger asChild>
          <span className="mdt-inline-flex mdt-shrink-0" data-slot="copy-tip">
            {cloneElement(children, { onClick })}
            {/* said once, politely - the bubble's own words mount too late to be announced */}
            <span className="mdt-sr-only" aria-live="polite">
              {copied ? 'Copied' : ''}
            </span>
          </span>
        </TooltipTrigger>
        <TooltipContent side={side}>{copied ? 'Copied' : tip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

CopyTip.displayName = 'CopyTip';

export { CopyTip };
