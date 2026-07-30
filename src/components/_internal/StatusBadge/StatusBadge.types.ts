import type { ComponentStatus } from '../../../types/component-status';

export interface StatusBadgeProps {
  /** Component status type */
  status: ComponentStatus;
  /** Additional message to display in tooltip */
  message?: string;
}
