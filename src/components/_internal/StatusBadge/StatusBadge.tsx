import type { StatusBadgeProps } from './StatusBadge.types';

/**
 * Status badge configuration
 */
const STATUS_CONFIG = {
  experimental: {
    emoji: '🧪',
    label: 'Experimental',
    bgColor: 'mdt-bg-yellow-100',
    textColor: 'mdt-text-yellow-800',
    borderColor: 'mdt-border-yellow-300',
  },
  beta: {
    emoji: '🔶',
    label: 'Beta',
    bgColor: 'mdt-bg-orange-100',
    textColor: 'mdt-text-orange-800',
    borderColor: 'mdt-border-orange-300',
  },
  stable: {
    emoji: '✅',
    label: 'Stable',
    bgColor: 'mdt-bg-green-100',
    textColor: 'mdt-text-green-800',
    borderColor: 'mdt-border-green-300',
  },
  deprecated: {
    emoji: '🚫',
    label: 'Deprecated',
    bgColor: 'mdt-bg-red-100',
    textColor: 'mdt-text-red-800',
    borderColor: 'mdt-border-red-300',
  },
};

/**
 * StatusBadge component
 *
 * Displays a status badge for components in Storybook.
 * This component is for internal use in Storybook stories only.
 *
 * @internal
 */
export const StatusBadge = ({ status, message }: StatusBadgeProps) => {
  const config = STATUS_CONFIG[status];

  return (
    <output
      className={`mdt-inline-flex mdt-items-center mdt-gap-1 mdt-rounded-full mdt-border mdt-px-2.5 mdt-py-0.5 mdt-text-xs mdt-font-semibold ${config.bgColor} ${config.textColor} ${config.borderColor}`}
      title={message ?? `This component is ${status}`}
      aria-label={`Component status: ${config.label}`}
    >
      <span aria-hidden="true">{config.emoji}</span>
      <span>{config.label}</span>
    </output>
  );
};

StatusBadge.displayName = 'StatusBadge';
