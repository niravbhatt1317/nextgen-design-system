import type { DeprecationInfo } from '../../../types/component-status';

export interface DeprecationBannerProps {
  /** Name of the deprecated component */
  componentName: string;
  /** Deprecation information */
  deprecationInfo: DeprecationInfo;
}
