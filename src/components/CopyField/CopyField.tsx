'use client';

import { forwardRef, useId } from 'react';
import { cn } from '@/utils';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { SecretDots } from '../SecretDots';
import type { CopyFieldProps } from './CopyField.types';
import { CopyTip } from './CopyTip';

/* PORTED FROM THE CONSOLE (Pranjal, 2026-10-13). The console built this by hand several times over:
 *
 *   ui/CopyTip.jsx                    the copy feedback - "Copy" under the pointer, "Copied" for 1.4 s after the
 *                                     press, in the library Tooltip; never a toast, never a label that changes
 *                                     (Pranjal 2026-10-11 design picks)
 *   features/iei/ConnectionDrawer     WashValue - the one-line field: 36 tall, the sunken ground, 8 radius, 12 in
 *                                     from the left, the value mono 12 and cut with an ellipsis (whole on hover),
 *                                     the button 4 in from the right (2026-10-08)
 *   features/iei/ScimSection          CopyIconTip - the icon-only ghost copy "every copy in IAM and Organizations
 *                                     wears" (2026-10-11); its hover one step up, because the ghost's own hover is
 *                                     the field's colour (2026-10-03); a masked value in the muted ink
 *   features/iei/setupParts           ValueField - the label row: label, then an optional ⓘ, 4 apart, 22 tall
 *   features/iei/parts.jsx            CopyRow - `mono`, on by default (no call site left in the console)
 *
 * Where they disagreed: the button is icon-only (CopyIconTip), not the "Copy" text button inside the field
 * (ValueField, Branding's ValueField, WashValue, CopyRow); the field is one line (WashValue), not a wrapping box
 * (ValueField); the ground is the sunken step (WashValue and SCIM's panel agree), not neutral-20 at 60%
 * (ValueField); the button is always in view (WashValue, CopyIconTip), not shown on hover (ValueField); "Copied"
 * stays 1.4 s (CopyTip, which every copy now goes through), not the 1.2 s two older comments mention.
 *
 * Since 2026-10-28 the button goes through the library's CopyTip (the console's own part, ported): one copy mechanism,
 * the same feedback for a bare copy control as for this field. */

/**
 * CopyField - one line holding a value, with an icon-only copy button at its
 * right end. The button says "Copy" in a tooltip under the pointer and
 * "Copied" for a moment after a press. The value can be masked.
 *
 * @example
 * ```tsx
 * <CopyField label="Base URL" value="https://scim.oneops.example.com/v2" />
 * <CopyField label="Bearer token" value={token} masked />
 * <CopyField label="Entity ID" value={entityId} info={<InfoTip label="About Entity ID">…</InfoTip>} />
 * ```
 */
const CopyField = forwardRef<HTMLDivElement, CopyFieldProps>(function CopyField(
  {
    value,
    label,
    info,
    masked = false,
    mono = true,
    copyable = true,
    copyLabel,
    tip = 'Copy',
    onCopy,
    className,
    ...rest
  },
  ref
) {
  const labelId = useId();

  const hasLabel = label !== undefined && label !== '';
  const buttonName = copyLabel ?? (hasLabel ? `Copy ${label}` : 'Copy');

  return (
    <div
      ref={ref}
      className={cn('mdt-flex mdt-min-w-0 mdt-flex-col mdt-gap-1.5', className)}
      {...(hasLabel ? { role: 'group', 'aria-labelledby': labelId } : {})}
      {...rest}
    >
      {hasLabel ? (
        <div className="mdt-flex mdt-min-h-[22px] mdt-items-center mdt-gap-1">
          <span id={labelId} className="mdt-text-[13px] mdt-font-medium mdt-text-neutral-90">
            {label}
          </span>
          {info}
        </div>
      ) : null}

      <div
        className={cn(
          'mdt-flex mdt-h-9 mdt-min-w-0 mdt-items-center mdt-gap-2 mdt-rounded-lg mdt-bg-secondary mdt-pl-3',
          copyable ? 'mdt-pr-1' : 'mdt-pr-3'
        )}
        data-testid="copyfield-line"
      >
        {masked ? (
          <SecretDots
            size="sm"
            label={hasLabel ? `Hidden ${label}` : 'Hidden value'}
            className="mdt-min-w-0 mdt-flex-1"
          />
        ) : (
          <span
            className={cn(
              'mdt-min-w-0 mdt-flex-1 mdt-truncate mdt-text-xs mdt-text-foreground',
              mono && 'mdt-font-mono'
            )}
            title={value}
          >
            {value}
          </span>
        )}

        {copyable ? (
          <CopyTip text={value} tip={tip} onCopy={onCopy}>
            <Button
              iconOnly
              variant="ghost"
              size="sm"
              ariaLabel={buttonName}
              leftIcon={<Icon name="copy" size="sm" aria-hidden />}
              /* the ghost's hover is the field's own ground; one step up so it shows (console, 2026-10-03) */
              className="mdt-shrink-0 hover:mdt-bg-neutral-20"
            />
          </CopyTip>
        ) : null}
      </div>
    </div>
  );
});

CopyField.displayName = 'CopyField';

export { CopyField };
