import type { HTMLAttributes } from 'react';

/**
 * Props for the OTPInput component
 */
export interface OTPInputProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Number of OTP input boxes
   * @default 6
   */
  length?: number;

  /**
   * Current OTP value
   * @default ''
   */
  value?: string;

  /**
   * Callback when OTP value changes
   */
  onChange?: (value: string) => void;

  /**
   * Callback when OTP is completely filled
   */
  onComplete?: (value: string) => void;

  /**
   * Type of input allowed
   * - numeric: Only numbers (0-9)
   * - alphanumeric: Letters and numbers (a-z, A-Z, 0-9)
   * @default 'numeric'
   */
  type?: 'numeric' | 'alphanumeric';

  /**
   * Disable all inputs
   * @default false
   */
  disabled?: boolean;

  /**
   * Auto-focus first input on mount
   * @default true
   */
  autoFocus?: boolean;

  /**
   * Placeholder character for empty inputs
   * @default '○'
   */
  placeholder?: string;

  /**
   * Size of the OTP inputs
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}
