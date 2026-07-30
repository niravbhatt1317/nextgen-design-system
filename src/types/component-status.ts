/**
 * Component status type definitions for versioning and deprecation
 */

/**
 * Component lifecycle status
 */
export type ComponentStatus = 'experimental' | 'beta' | 'stable' | 'deprecated';

/**
 * Deprecation information
 */
export interface DeprecationInfo {
  /** Version when the component was deprecated */
  deprecatedSince: string;
  /** Version when the component will be removed */
  removalIn: string;
  /** Name of the replacement component */
  replacement?: string;
  /** URL to migration guide */
  migrationGuide?: string;
  /** Additional deprecation message */
  message?: string;
}

/**
 * Component status metadata
 */
export interface ComponentStatusInfo {
  /** Current status of the component */
  type: ComponentStatus;
  /** Version when this status was set */
  since?: string;
  /** Additional status message */
  message?: string;
  /** Deprecation details (required if type is 'deprecated') */
  deprecation?: DeprecationInfo;
}

/**
 * Extended parameters for Storybook stories with status information
 */
export interface StoryStatusParameters {
  status?: ComponentStatusInfo;
}
