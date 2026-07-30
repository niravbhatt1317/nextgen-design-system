import React from 'react';
import type { Decorator } from '@storybook/react';
import type { ComponentStatusInfo, DeprecationInfo } from '../../src/types/component-status';

/**
 * Status badge configuration
 */
interface StatusConfig {
  emoji: string;
  label: string;
  bg: string;
  text: string;
  border: string;
}

/**
 * Inline StatusBadge component
 */
const StatusBadge = ({ status, message }: { status: string; message?: string }) => {
  const statusConfigs: Record<string, StatusConfig> = {
    experimental: {
      emoji: '🧪',
      label: 'Experimental',
      bg: 'mdt-bg-yellow-10',
      text: 'mdt-text-yellow-100',
      border: 'mdt-border-yellow-300',
    },
    beta: {
      emoji: '🔶',
      label: 'Beta',
      bg: 'mdt-bg-orange-10',
      text: 'mdt-text-orange-100',
      border: 'mdt-border-orange-300',
    },
    stable: {
      emoji: '✅',
      label: 'Stable',
      bg: 'mdt-bg-green-100',
      text: 'mdt-text-green-800',
      border: 'mdt-border-green-300',
    },
    deprecated: {
      emoji: '🚫',
      label: 'Deprecated',
      bg: 'mdt-bg-red-10',
      text: 'mdt-text-red-100',
      border: 'mdt-border-red-300',
    },
  };

  const config = statusConfigs[status] ?? {
    emoji: '❓',
    label: status,
    bg: 'mdt-bg-gray-100',
    text: 'mdt-text-gray-800',
    border: 'mdt-border-gray-300',
  };

  return (
    <span
      className={`mdt-inline-flex mdt-items-center mdt-gap-1 mdt-rounded-full mdt-border mdt-px-2.5 mdt-py-0.5 mdt-text-xs mdt-font-semibold ${config.bg} ${config.text} ${config.border}`}
      title={message ?? `This component is ${status}`}
    >
      <span>{config.emoji}</span>
      <span>{config.label}</span>
    </span>
  );
};

/**
 * Inline DeprecationBanner component
 */
const DeprecationBanner = ({
  componentName,
  deprecationInfo,
}: {
  componentName: string;
  deprecationInfo: DeprecationInfo;
}) => {
  const { deprecatedSince, removalIn, replacement, migrationGuide, message } = deprecationInfo;

  return (
    <div className="mdt-mb-6 mdt-rounded-md mdt-border-2 mdt-border-orange-30 mdt-bg-orange-20 mdt-p-4">
      <div className="mdt-flex mdt-items-start mdt-gap-3">
        <div className="mdt-text-2xl">⚠️</div>
        <div className="mdt-flex-1">
          <h3 className="mdt-mb-2 mdt-text-lg mdt-font-bold mdt-text-orange-900">
            Deprecated Component
          </h3>
          <p className="mdt-mb-2 mdt-text-sm mdt-text-orange-800">
            <strong>{componentName}</strong> is deprecated
            {deprecatedSince ? ` since version ${deprecatedSince}` : ''}
            {removalIn ? ` and will be removed in version ${removalIn}` : ''}.
          </p>
          {message ? <p className="mdt-mb-2 mdt-text-sm mdt-text-orange-800">{message}</p> : null}
          {replacement ? (
            <p className="mdt-mb-2 mdt-text-sm mdt-text-orange-800">
              <strong>Replacement:</strong> Please use{' '}
              <code className="mdt-rounded mdt-bg-orange-30 mdt-px-1 mdt-py-0.5 mdt-font-mono mdt-text-xs">
                {replacement}
              </code>{' '}
              instead.
            </p>
          ) : null}
          {migrationGuide ? (
            <p className="mdt-text-sm mdt-text-orange-800">
              <a
                href={migrationGuide}
                className="mdt-font-medium mdt-text-orange-90 mdt-underline hover:mdt-text-orange-100"
              >
                View Migration Guide →
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

/**
 * Decorator to show deprecation warnings for deprecated components
 */
export const withDeprecationWarning: Decorator = (Story, context) => {
  const status = context.parameters.status as ComponentStatusInfo | undefined;

  if (!status) {
    return <Story />;
  }

  const isDeprecated = status.type === 'deprecated';
  const showBadge = status.type !== 'stable';

  return (
    <div>
      {showBadge && (
        <div className="mdt-mb-4">
          <StatusBadge status={status.type} message={status.message} />
        </div>
      )}

      {isDeprecated && status.deprecation && (
        <DeprecationBanner
          componentName={context.title.split('/').pop() ?? 'Component'}
          deprecationInfo={status.deprecation}
        />
      )}

      <Story />
    </div>
  );
};
