import type { DeprecationInfo } from '../types/component-status';

/**
 * Track which components have already shown deprecation warnings
 * to avoid showing the same warning multiple times
 */
const warnedComponents = new Set<string>();

/**
 * Show a deprecation warning for a component
 *
 * @param componentName - Name of the deprecated component
 * @param deprecationInfo - Deprecation details
 *
 * @example
 * ```tsx
 * export const OldButton = (props) => {
 *   deprecated('OldButton', {
 *     deprecatedSince: '2.0.0',
 *     removalIn: '3.0.0',
 *     replacement: 'MotadataButton',
 *     migrationGuide: 'https://docs.example.com/migration/button'
 *   });
 *   return <button {...props} />;
 * }
 * ```
 */
export function deprecated(componentName: string, deprecationInfo: DeprecationInfo): void {
  // Only show warnings in development
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // Only warn once per component
  if (warnedComponents.has(componentName)) {
    return;
  }

  warnedComponents.add(componentName);

  const { deprecatedSince, removalIn, replacement, migrationGuide, message } = deprecationInfo;

  // Build warning message
  let warningMessage = `⚠️  Component "${componentName}" is deprecated`;

  if (deprecatedSince) {
    warningMessage += ` since version ${deprecatedSince}`;
  }

  if (removalIn) {
    warningMessage += ` and will be removed in version ${removalIn}`;
  }

  warningMessage += '.';

  if (replacement) {
    warningMessage += `\n   Please use "${replacement}" instead.`;
  }

  if (migrationGuide) {
    warningMessage += `\n   Migration guide: ${migrationGuide}`;
  }

  if (message) {
    warningMessage += `\n   ${message}`;
  }

  console.warn(warningMessage);
}

/**
 * Reset the warned components set (useful for testing)
 * @internal
 */
export function resetDeprecationWarnings(): void {
  warnedComponents.clear();
}
