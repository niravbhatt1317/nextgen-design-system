import { forwardRef } from 'react';
import type { KeyboardEvent, MouseEvent, Ref } from 'react';
import { cn } from '@/utils';
import { RowText, hasContent } from './RowText';
import type { RowListProps, RowProps, RowTitleProps } from './RowList.types';
import './rowList.css';

/* PORTED FROM THE CONSOLE (Pranjal, 2026-10-28: "push everything in storybook now. Dont leave anything"). The console's
 * src/ui/RowList.jsx is the non-<table> half of its table family: the target that about 135 hand-rolled "lists that
 * behave like a table" converged on (eight row heights, eleven paddings, six separator strategies and three hover
 * implementations before it). Used in 32 product files - Users profile and invitations, Teams, Roles, Service
 * accounts, Access profiles, Organizations, Agent Fleet's Health, Collector Fleet, Credential profiles. Every value is
 * that file's and its CSS layer's (global.css `.kit-row-list`), in rowList.css. */

/**
 * RowList - the frame a list of rows sits in: one edge, one separator between
 * rows, one hover, the table's three row heights. Rows inside it are `Row`,
 * `SelectableRow` (a pick list with a tick box or radio) or `LogRow`.
 *
 * @example
 * ```tsx
 * <RowList density="two-line">
 *   <Row onClick={open} actions={<Icon name="chevron-right" size={16} />}>
 *     <RowTitle primary="Inventory" secondary="Last run 2m ago" />
 *   </Row>
 * </RowList>
 * ```
 */
const RowList = forwardRef<HTMLDivElement, RowListProps>(
  ({ density = 'default', bordered = true, className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('mdt-rowlist', className)}
      data-density={density}
      data-bordered={bordered ? '' : undefined}
      {...rest}
    >
      {children}
    </div>
  )
);
RowList.displayName = 'RowList';

/* the actions slot keeps its presses and keys to itself */
const stop = (event: MouseEvent | KeyboardEvent): void => {
  event.stopPropagation();
};

/**
 * Row - one record in a RowList: something before the text, the text, and
 * controls at the right end. With `onClick` it is a real button, so the
 * keyboard reaches it and it tints under the pointer; without, it is a plain
 * block.
 *
 * @example
 * ```tsx
 * <Row leading={<Avatar initials="Sahil Thadani" size="sm" />} actions={menu}>
 *   <RowTitle primary="Sahil Thadani" secondary="Platform Ops" />
 * </Row>
 * ```
 */
const Row = forwardRef<HTMLElement, RowProps>(
  (
    { onClick, disabled, selected, state, leading, children, actions, title, className, ...rest },
    ref
  ) => {
    const interactive = onClick !== undefined && !disabled;
    const shared = {
      className: cn('mdt-rowlist__row', className),
      'data-interactive': interactive ? '' : undefined,
      'data-selected': selected ? '' : undefined,
      'data-row-state': state ?? (disabled ? 'disabled' : undefined),
      title,
      ...rest,
    };
    const inner = (
      <>
        {hasContent(leading) && <span className="mdt-rowlist__leading">{leading}</span>}
        <span className="mdt-rowlist__body">{children}</span>
        {hasContent(actions) && (
          /* a press or a key on a control in here is the control's, never the row's */
          <span
            role="presentation"
            className="mdt-rowlist__actions"
            onClick={stop}
            onKeyDown={stop}
          >
            {actions}
          </span>
        )}
      </>
    );
    if (interactive) {
      return (
        <button ref={ref as Ref<HTMLButtonElement>} type="button" onClick={onClick} {...shared}>
          {inner}
        </button>
      );
    }
    return (
      <div ref={ref as Ref<HTMLDivElement>} {...shared}>
        {inner}
      </div>
    );
  }
);
Row.displayName = 'Row';

/**
 * RowTitle - a row's own two-line lockup: the name on the first line (badges
 * beside it), one quiet line under it; on the table cell's type, so a list and
 * a table read alike.
 *
 * @example
 * ```tsx
 * <RowTitle primary="Helpdesk Access" secondary="IT Support, Security Team" badges={<Badge size="sm">Custom</Badge>} />
 * ```
 */
function RowTitle({ primary, secondary, mono, badges }: RowTitleProps) {
  return (
    <span className="mdt-rowlist__title">
      <span className="mdt-rowlist__title-line">
        <RowText kind={mono ? 'mono' : 'primary'}>{primary}</RowText>
        {badges}
      </span>
      {hasContent(secondary) && <RowText kind="secondary">{secondary}</RowText>}
    </span>
  );
}

export { RowList, Row, RowTitle };
