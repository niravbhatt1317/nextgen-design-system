import { Fragment } from 'react';
import type { ReactNode } from 'react';

/**
 * metaLine - a meta line's parts split by a short hairline: "SAML 2.0 | 2,104 sign-ins".
 * Shared by ActionCard and SheetIdentity so the separator is drawn one way.
 */
export const metaLine = (parts: readonly ReactNode[]): ReactNode =>
  parts.map((part, i) => (
    // eslint-disable-next-line react/no-array-index-key -- the parts are positional and never reorder
    <Fragment key={i}>
      {i > 0 && (
        <span className="mdt-mx-2 mdt-h-2.5 mdt-w-px mdt-shrink-0 mdt-bg-neutral-20" aria-hidden />
      )}
      <span className="mdt-min-w-0">{part}</span>
    </Fragment>
  ));
