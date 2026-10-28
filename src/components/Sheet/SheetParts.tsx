import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { metaLine } from '../_internal/MetaLine/metaLine';
import { InfoTip } from '../InfoTip';
import type {
  SheetFieldProps,
  SheetFieldsProps,
  SheetIdentityProps,
  SheetSectionProps,
} from './Sheet.types';

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
 * follow one another are split by a hairline, never by a card inside a drawer.
 *
 * @example
 * <SheetSection title="Access details" hint="Set how long guest users can access your organization">
 *   <SheetField label="Access started">Apr 1, 2026</SheetField>
 * </SheetSection>
 */
const SheetSection = forwardRef<HTMLElement, SheetSectionProps>(
  ({ title, hint, action, children, className, ...props }, ref) => (
    <section
      ref={ref}
      data-slot="sheet-section"
      className={cn(
        'mdt-flex mdt-flex-col',
        // the hairline between sections, 20 above and below it
        '[&+&]:mdt-mt-5 [&+&]:mdt-border-t [&+&]:mdt-border-border [&+&]:mdt-pt-5',
        className
      )}
      {...props}
    >
      <div className="mdt-flex mdt-min-h-8 mdt-items-center mdt-justify-between mdt-gap-2.5">
        <h3 className="mdt-text-sm mdt-font-semibold mdt-leading-5 mdt-text-foreground">{title}</h3>
        {action}
      </div>
      {hint !== undefined && (
        <p className="mdt-text-[13px] mdt-leading-5 mdt-text-muted-foreground">{hint}</p>
      )}
      {children !== undefined && (
        <div className="mdt-mt-3 mdt-flex mdt-flex-col mdt-gap-3">{children}</div>
      )}
    </section>
  )
);
SheetSection.displayName = 'SheetSection';

/* THE FACT ROW (Pranjal, 2026-10-28: the row family's most used part). The console draws a record's label · value rows
 * by hand in every About tab and profile - the Users drawer's ROW / L / V (ProfileDrawer.jsx), copied value for value
 * into Agent Fleet's drawer parts (afm/screens/drawer/parts.tsx Row / Rows) and from there into Collector Fleet's. Its
 * numbers, measured in the console at :4191 (the agent drawer's About tab and a user's profile):
 *
 *   row     a grid, the label and the value in two halves (rulebook S-98, "rows split 50/50", 2026-09-10) or 3 : 7 (the
 *           agent's About, 2026-10-13), 12 between, centred; a value that is a list of chips can top-align
 *   label   13 / 1.5 in the secondary ink (neutral-90), an ⓘ 4 after it when it needs explaining
 *   value   13 / 500 / 1.5 in the reading ink (neutral-150); text, badges and a control sit in it on one line, 6 apart,
 *           wrapping when they must
 *   stack   18 between two rows (S-98) - SheetFields
 *
 * No floor on the height: a row is as tall as its words (19.5), so a record reads at the console's pitch; a row that
 * holds a 32 field is 32 because the field is. */
const RATIO_COLUMNS = {
  '1:1': 'mdt-grid-cols-2',
  '3:7': 'mdt-grid-cols-[minmax(0,3fr)_minmax(0,7fr)]',
} as const;

/**
 * SheetField - one label · value row of a drawer (the fact row of every About
 * tab and profile): the label in the secondary ink with an optional ⓘ, the
 * value (13/500) or its control beside it, in halves or 3 : 7. The same row
 * reads a record and edits it.
 *
 * @example
 * <SheetField label="Email">sarah.johnson@company.com</SheetField>
 * <SheetField label="Network zone" info="Taken from the agent's address." ratio="3:7">Retail core</SheetField>
 * <SheetField label="Job title" htmlFor="job"><Input id="job" defaultValue="HR Coordinator" /></SheetField>
 */
const SheetField = forwardRef<HTMLDivElement, SheetFieldProps>(
  (
    {
      label,
      htmlFor,
      info,
      infoLabel,
      ratio = '1:1',
      align = 'center',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const named = typeof label === 'string' ? `About ${label.toLowerCase()}` : 'About this';
    return (
      <div
        ref={ref}
        data-slot="sheet-field"
        className={cn(
          /* no gap between the label and the value: the Users profile's rows (Pranjal, 2026-10-28: "Users'"), not
           * Agent Fleet's 12 - both fleets' About rows follow Users' too */
          'mdt-grid mdt-gap-0',
          RATIO_COLUMNS[ratio],
          align === 'top' ? 'mdt-items-start' : 'mdt-items-center',
          className
        )}
        {...props}
      >
        <span className="mdt-inline-flex mdt-min-w-0 mdt-items-center mdt-gap-1 mdt-text-[13px] mdt-leading-normal mdt-text-neutral-90">
          {htmlFor === undefined ? label : <label htmlFor={htmlFor}>{label}</label>}
          {info !== undefined && info !== null ? (
            <InfoTip label={infoLabel ?? named}>{info}</InfoTip>
          ) : null}
        </span>
        <div className="mdt-flex mdt-min-w-0 mdt-flex-wrap mdt-items-center mdt-gap-1.5 mdt-text-[13px] mdt-font-medium mdt-leading-normal mdt-text-neutral-150">
          {children ?? '-'}
        </div>
      </div>
    );
  }
);
SheetField.displayName = 'SheetField';

/**
 * SheetFields - the stack a drawer's fact rows sit in: SheetField rows 18
 * apart, the console's About-tab pitch (rulebook S-98).
 *
 * @example
 * <SheetSection title="Overview">
 *   <SheetFields>
 *     <SheetField label="Agent version">7.4.0</SheetField>
 *     <SheetField label="Address">10.32.0.14</SheetField>
 *   </SheetFields>
 * </SheetSection>
 */
const SheetFields = forwardRef<HTMLDivElement, SheetFieldsProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="sheet-fields"
      className={cn('mdt-flex mdt-flex-col mdt-gap-[18px]', className)}
      {...props}
    >
      {children}
    </div>
  )
);
SheetFields.displayName = 'SheetFields';

export { SheetIdentity, SheetSection, SheetField, SheetFields };
