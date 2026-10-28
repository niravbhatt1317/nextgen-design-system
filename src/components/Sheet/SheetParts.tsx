import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { metaLine } from '../_internal/MetaLine/metaLine';
import type { SheetFieldProps, SheetIdentityProps, SheetSectionProps } from './Sheet.types';

/**
 * SheetIdentity - the identity block an object drawer opens with: the mark, the
 * name and its status, the quiet lines under them, and Edit / ⋯ at the top right
 * (the console's IdentityBand, Users and Access profiles).
 *
 * @example
 * <SheetIdentity
 *   mark={<IconTile icon={<Icon name="key-round" />} tone="blue" size="xl" />}
 *   name="Helpdesk Access"
 *   status={<Badge tone="success" dot>Active</Badge>}
 *   lines={[['IT Support, Security Team', 'Teams'], ['Created by Natasha Manglore', '12 Aug 2026']]}
 *   actions={<Button variant="outline" size="sm">Edit</Button>}
 * />
 */
const SheetIdentity = forwardRef<HTMLDivElement, SheetIdentityProps>(
  ({ mark, name, status, lines, actions, children, className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="sheet-identity"
      className={cn('mdt-flex mdt-flex-col mdt-gap-4', className)}
      {...props}
    >
      <div className="mdt-flex mdt-items-center mdt-gap-3.5">
        {mark}
        <div className="mdt-flex mdt-min-w-0 mdt-flex-1 mdt-flex-col mdt-gap-1">
          <div className="mdt-flex mdt-min-w-0 mdt-items-center mdt-gap-2">
            <span className="mdt-truncate mdt-text-base mdt-font-semibold mdt-leading-6 mdt-text-foreground">
              {name}
            </span>
            {status}
          </div>
          {lines?.map((line, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key -- the lines are positional and never reorder
              key={i}
              className="mdt-flex mdt-min-w-0 mdt-items-center mdt-text-[13px] mdt-leading-5 mdt-text-muted-foreground"
            >
              {Array.isArray(line) ? metaLine(line) : line}
            </div>
          ))}
        </div>
        {actions !== undefined && (
          <div className="mdt-flex mdt-shrink-0 mdt-items-center mdt-gap-2 mdt-self-start">
            {actions}
          </div>
        )}
      </div>
      {children}
    </div>
  )
);
SheetIdentity.displayName = 'SheetIdentity';

/**
 * SheetSection - a titled section of a drawer's body: a 14/600 heading with an
 * action at its right end, an optional hint, then the content. Sections that
 * follow one another stand 32 apart with nothing drawn between them, never a
 * card inside a drawer.
 *
 * The console's drawer section (the fleets' agent and collector drawers,
 * `SectionHead` / `Note` / `Rows` / `SectionGap`, Nikhil 2026-10-13, step 309:
 * "remove the dividers, and follow the text herirchy following the design
 * system"): the heading row 24 high at least, the heading 14/600 in the title
 * ink on its 1.5 line, 12 to the action; the hint 12 on a 1.5 line in the quiet
 * ink, 4 under the heading; the content 16 under them; sections the library's
 * section margin (32) apart.
 *
 * @example
 * <SheetSection title="Health" hint="The last 24 hours.">
 *   <SheetField label="Uptime">99.2%</SheetField>
 * </SheetSection>
 */
const SheetSection = forwardRef<HTMLElement, SheetSectionProps>(
  ({ title, hint, action, children, className, ...props }, ref) => (
    <section
      ref={ref}
      data-slot="sheet-section"
      className={cn(
        'mdt-flex mdt-flex-col',
        // sections stand 32 apart, nothing drawn between them
        '[&+&]:mdt-mt-8',
        className
      )}
      {...props}
    >
      <div
        data-slot="sheet-section-head"
        className="mdt-flex mdt-min-h-6 mdt-items-center mdt-justify-between mdt-gap-3"
      >
        <h3 className="mdt-text-sm mdt-font-semibold mdt-leading-normal mdt-text-neutral-150">
          {title}
        </h3>
        {action}
      </div>
      {hint !== undefined && (
        <p className="mdt-mt-1 mdt-text-xs mdt-leading-normal mdt-text-neutral-70">{hint}</p>
      )}
      {children !== undefined && (
        <div className="mdt-mt-4 mdt-flex mdt-flex-col mdt-gap-3">{children}</div>
      )}
    </section>
  )
);
SheetSection.displayName = 'SheetSection';

/**
 * SheetField - one label · value row of a drawer, half and half: the label in
 * the slate ink on the left, the value (13/500) or its control on the right.
 * The same row reads a record and edits it.
 *
 * @example
 * <SheetField label="Email">sarah.johnson@company.com</SheetField>
 * <SheetField label="Job title" htmlFor="job"><Input id="job" defaultValue="HR Coordinator" /></SheetField>
 */
const SheetField = forwardRef<HTMLDivElement, SheetFieldProps>(
  ({ label, htmlFor, children, className, ...props }, ref) => {
    const labelClass = 'mdt-text-[13px] mdt-leading-5 mdt-text-neutral-90';
    return (
      <div
        ref={ref}
        data-slot="sheet-field"
        className={cn('mdt-grid mdt-min-h-8 mdt-grid-cols-2 mdt-items-center mdt-gap-3', className)}
        {...props}
      >
        {htmlFor === undefined ? (
          <span className={labelClass}>{label}</span>
        ) : (
          <label htmlFor={htmlFor} className={labelClass}>
            {label}
          </label>
        )}
        <div className="mdt-min-w-0 mdt-text-[13px] mdt-font-medium mdt-leading-5 mdt-text-foreground">
          {children ?? '-'}
        </div>
      </div>
    );
  }
);
SheetField.displayName = 'SheetField';

export { SheetIdentity, SheetSection, SheetField };
