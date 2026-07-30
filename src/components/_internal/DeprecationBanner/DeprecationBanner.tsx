import type { DeprecationBannerProps } from './DeprecationBanner.types';

/**
 * DeprecationBanner component
 *
 * Displays a warning banner for deprecated components in Storybook.
 * This component is for internal use in Storybook stories only.
 *
 * @internal
 */
export const DeprecationBanner = ({ componentName, deprecationInfo }: DeprecationBannerProps) => {
  const { deprecatedSince, removalIn, replacement, migrationGuide, message } = deprecationInfo;

  return (
    <div
      className="mdt-mb-6 mdt-rounded-md mdt-border-2 mdt-border-orange-500 mdt-bg-orange-30 mdt-p-4"
      role="alert"
    >
      <div className="mdt-flex mdt-items-start mdt-gap-3">
        <div className="mdt-flex-shrink-0 mdt-text-2xl" aria-hidden="true">
          ⚠️
        </div>
        <div className="mdt-flex-1">
          <h3 className="mdt-mb-2 mdt-text-lg mdt-font-bold mdt-text-orange-900">
            Deprecated Component
          </h3>
          <p className="mdt-mb-2 mdt-text-sm mdt-text-orange-800">
            <strong>{componentName}</strong> is deprecated
            {deprecatedSince && ` since version ${deprecatedSince}`}
            {removalIn && ` and will be removed in version ${removalIn}`}.
          </p>

          {message && <p className="mdt-mb-2 mdt-text-sm mdt-text-orange-800">{message}</p>}

          {replacement && (
            <p className="mdt-mb-2 mdt-text-sm mdt-text-orange-800">
              <strong>Replacement:</strong> Please use{' '}
              <code className="mdt-rounded mdt-bg-orange-30 mdt-px-1 mdt-py-0.5 mdt-font-mono mdt-text-xs">
                {replacement}
              </code>{' '}
              instead.
            </p>
          )}

          {migrationGuide && (
            <p className="mdt-text-sm mdt-text-orange-800">
              <a
                href={migrationGuide}
                className="mdt-font-medium mdt-text-orange-90 mdt-underline hover:mdt-text-orange-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Migration Guide →
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

DeprecationBanner.displayName = 'DeprecationBanner';
