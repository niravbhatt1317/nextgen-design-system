import { cn } from '@/utils';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import { TABLE_GUTTER_OLD2, tableCellOld2Variants } from './TableOld2';
import type {
  TableBlankKindOld2,
  TableBlankOld2Props,
  TableSkeletonOld2Props,
} from './TableOld2.types';

const COPY: Record<
  TableBlankKindOld2,
  { icon: IconName; title: string; body: string; action: string }
> = {
  first: {
    icon: 'user-plus',
    title: 'No users yet',
    body: 'Invite people by email, or connect a directory to bring them in.',
    action: 'Invite users',
  },
  empty: {
    icon: 'search-x',
    title: 'No users match',
    body: 'Try another spelling, or clear the filters you applied.',
    action: 'Clear filters',
  },
  error: {
    icon: 'alert-triangle',
    title: 'Couldn’t load users',
    body: 'Something went wrong on our side. Your search and filters are kept.',
    action: 'Try again',
  },
};

/**
 * The three blank states, centred in the visible card: nothing yet, nothing
 * found, could not load. An icon, a title, one line, one button.
 */
function TableBlankOld2({ kind, title, body, action, onAction }: TableBlankOld2Props) {
  const c = COPY[kind];
  const primary = kind === 'first';
  return (
    <div
      role="status"
      className="mdt-flex mdt-h-[300px] mdt-flex-col mdt-items-center mdt-justify-center mdt-gap-1.5 mdt-p-6 mdt-text-center"
    >
      <span
        className={cn(
          'mdt-mb-2 mdt-inline-flex mdt-h-11 mdt-w-11 mdt-items-center mdt-justify-center mdt-rounded-xl',
          kind === 'error'
            ? 'mdt-bg-yellow-5 mdt-text-[#8A5A00]'
            : 'mdt-bg-neutral-10 mdt-text-neutral-90'
        )}
      >
        <Icon name={c.icon} size={22} />
      </span>
      <span className="mdt-text-sm mdt-font-semibold mdt-leading-[1.4] mdt-text-neutral-130">
        {title ?? c.title}
      </span>
      <span className="mdt-max-w-[360px] mdt-text-xs mdt-text-muted-foreground">
        {body ?? c.body}
      </span>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className={cn(
            'mdt-mt-3 mdt-inline-flex mdt-h-8 mdt-items-center mdt-rounded-lg mdt-border mdt-border-solid mdt-px-3 mdt-text-[13px] mdt-font-medium',
            primary
              ? 'mdt-border-neutral-150 mdt-bg-neutral-150 mdt-text-white'
              : 'mdt-border-neutral-30 mdt-bg-background mdt-text-neutral-90 hover:mdt-border-neutral-90 hover:mdt-bg-neutral-10'
          )}
        >
          {action ?? c.action}
        </button>
      )}
    </div>
  );
}

const BAR = 'mdt-inline-block mdt-h-2.5 mdt-rounded-[5px] mdt-bg-neutral-20 mdt-align-middle';
const SHAPES = [120, 96, 132, 108, 124];

/** Five grey rows while the list loads. Bars fall where the content will. */
function TableSkeletonOld2({ widths, rows = 5 }: TableSkeletonOld2Props) {
  return (
    <tbody aria-hidden="true" className="tbl-old2-body">
      {Array.from({ length: rows }, (_, i) => (
        <tr key={i} className="tbl-old2-row">
          {widths.map((w, j) => (
            // eslint-disable-next-line react/no-array-index-key -- skeleton cells have no identity but their position
            <td key={j} className={tableCellOld2Variants({ align: j === 0 ? 'center' : 'left' })}>
              {j === 0 ? (
                <span className={BAR} style={{ width: 12 }} />
              ) : j === 1 ? (
                <span className="mdt-inline-flex mdt-items-center mdt-gap-2.5">
                  <span className={cn(BAR, 'mdt-h-8 mdt-w-8 mdt-rounded-full')} />
                  <span className={BAR} style={{ width: SHAPES[i % SHAPES.length] }} />
                </span>
              ) : (
                <span
                  className={BAR}
                  style={{ width: Math.min(w - 32, 40 + ((i * 37 + j * 53) % 120)) }}
                />
              )}
            </td>
          ))}
          <td className={tableCellOld2Variants({})} style={{ width: TABLE_GUTTER_OLD2 }} />
        </tr>
      ))}
    </tbody>
  );
}

export { TableBlankOld2, TableSkeletonOld2 };
