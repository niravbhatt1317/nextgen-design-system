import type { ExternalToast, ToasterProps as SonnerToasterProps } from 'sonner';
import type { ReactNode } from 'react';

/**
 * Toast position options
 */
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

/**
 * Toast theme
 */
export type ToastTheme = 'light' | 'dark' | 'system';

/**
 * Toast type/variant
 */
export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';

/**
 * The six tones Org Mgmt's banner defines.
 *
 * `ai` and `neutral` are the two the old toast had no answer for: an assistant
 * suggesting something, and a plain statement of fact that is neither good news
 * nor bad.
 */
export type ToastTone = 'info' | 'warning' | 'danger' | 'success' | 'ai' | 'neutral';

/**
 * `sm` is Om's banner measured exactly. `md` runs one step larger.
 */
export type ToastSize = 'sm' | 'md';

/**
 * Props for the promotional toast.
 *
 * An announcement rather than a report, so it has room for a picture, a
 * paragraph and a way to act on it - and no tone, because "we built something"
 * is neither good news nor bad.
 */
export interface ToastPromoProps {
  /** The line beside the megaphone. */
  title: ReactNode;

  /** The paragraph under the picture. */
  description?: ReactNode | undefined;

  /**
   * Anything to show above the text - an `img`, a `video`, a gradient. It is
   * sized and clipped for you; pass the element, not a URL.
   */
  media?: ReactNode | undefined;

  /** One call to action, below the text. Optional - leave it out for news. */
  action?: { label: string; onClick: () => void } | undefined;

  /** Shows the dismiss cross. @default true */
  closable?: boolean | undefined;

  /** Called by the dismiss cross. */
  onClose?: (() => void) | undefined;

  className?: string | undefined;
}

/**
 * Props for the toast surface itself.
 */
export interface ToastBodyProps {
  /** @default 'neutral' */
  tone?: ToastTone | undefined;

  /** @default 'sm' */
  size?: ToastSize | undefined;

  /** The bold first line. */
  title?: ReactNode | undefined;

  /** The lighter line beneath it. */
  description?: ReactNode | undefined;

  /** Replaces the tone's own glyph. */
  icon?: ReactNode | undefined;

  /** Swaps the glyph for a spinner. @default false */
  loading?: boolean | undefined;

  /**
   * Shows the close control.
   *
   * On by default, on every tone. Turn it off for a toast that has to be
   * acknowledged some other way - a required action, say.
   *
   * Not the same as Sonner's `dismissible`, which governs whether a toast can
   * be swiped away. This one is about the visible cross.
   *
   * @default true
   */
  closable?: boolean | undefined;

  /** An inline text action beneath the message. */
  action?: { label: string; onClick: () => void } | undefined;

  /** Called by the close control. */
  onClose?: (() => void) | undefined;

  className?: string | undefined;
}

/**
 * Toast options extending Sonner's ExternalToast
 */
export interface ToastProps extends ExternalToast {
  /**
   * Toast message
   */
  message?: string | ReactNode;

  /**
   * Toast description (subtitle)
   */
  description?: string | ReactNode;

  /**
   * Duration in milliseconds
   * @default 4000
   */
  duration?: number;

  /**
   * Action button configuration
   */
  action?: {
    label: string;
    onClick: () => void;
  };

  /**
   * Cancel button configuration
   */
  cancel?: {
    label: string;
    onClick: () => void;
  };

  /**
   * Custom icon to display
   */
  icon?: ReactNode;

  /**
   * Shows the close control inside the toast.
   *
   * On by default, on every tone. Turn it off for a toast that has to be
   * acknowledged some other way.
   *
   * @default true
   */
  closable?: boolean | undefined;

  /**
   * Size of the toast. `sm` is Om's banner measured exactly.
   * @default 'sm'
   */
  size?: ToastSize | undefined;

  /**
   * Text action shown inside the toast, beneath the message.
   */
  actionLabel?: string;

  /**
   * Whether the toast can be dismissed by swiping
   * @default true
   */
  dismissible?: boolean;

  /**
   * Unique identifier for the toast
   */
  id?: number | string;

  /**
   * Custom className for the toast
   */
  className?: string;

  /**
   * Custom style for the toast
   */
  style?: React.CSSProperties;

  /**
   * Callback when toast is dismissed
   */
  onDismiss?: (toast: { id: number | string }) => void;

  /**
   * Callback when action button is clicked
   */
  onAutoClose?: (toast: { id: number | string }) => void;
}

/**
 * Promise toast configuration
 */
export interface PromiseToastOptions<T> {
  loading: string | ReactNode;
  success: string | ReactNode | ((data: T) => string | ReactNode);
  error: string | ReactNode | ((error: Error) => string | ReactNode);
  description?: string | ReactNode;
  duration?: number;
}

/**
 * Toaster component props
 */
export interface ToasterProps extends Omit<SonnerToasterProps, 'position' | 'theme'> {
  /**
   * Position of the toaster
   * @default 'bottom-right'
   */
  position?: ToastPosition;

  /**
   * Theme of the toaster
   * @default 'light'
   */
  theme?: ToastTheme;

  /**
   * Whether to use rich colors for different toast types
   * @default true
   */
  richColors?: boolean;

  /**
   * Whether toasts should expand on hover
   * @default false
   */
  expand?: boolean;

  /**
   * Default duration for all toasts (in milliseconds)
   * @default 4000
   */
  duration?: number;

  /**
   * Maximum number of visible toasts
   * @default 3
   */
  visibleToasts?: number;

  /**
   * Whether to show a close button
   * @default false
   */
  closeButton?: boolean;

  /**
   * Custom className for the toaster container
   */
  className?: string;

  /**
   * Gap between toasts (in pixels)
   */
  gap?: number;

  /**
   * Offset from the edge of the screen (in pixels)
   */
  offset?: string | number;
}

/**
 * Toast function signature
 */
export interface ToastFunction {
  /**
   * Show a default toast
   */
  (message: string | ReactNode, options?: ToastProps): string | number;

  /**
   * Show a success toast
   */
  success: (message: string | ReactNode, options?: ToastProps) => string | number;

  /**
   * Show a danger toast
   */
  danger: (message: string | ReactNode, options?: ToastProps) => string | number;

  /**
   * Show a danger toast. Kept as the name the rest of the codebase already
   * uses; `danger` is the name the tone actually has.
   */
  error: (message: string | ReactNode, options?: ToastProps) => string | number;

  /**
   * Show an AI toast - the assistant suggesting something.
   */
  ai: (message: string | ReactNode, options?: ToastProps) => string | number;

  /**
   * Show a promotional toast - an announcement, with room for a picture and a
   * call to action. A different shape from the six tones, not a seventh tone.
   *
   * It lives on its own layer, anchored below the ordinary stack, and there is
   * only ever one: showing a second replaces the first. Nothing is returned
   * because there is no id to hold - use `dismissPromotional` to close it.
   */
  promotional: (options: Omit<ToastPromoProps, 'onClose'> & { duration?: number }) => void;

  /** Closes the promotional toast, if one is open. */
  dismissPromotional: () => void;

  /**
   * Show a neutral toast - a plain statement that is neither good nor bad.
   */
  neutral: (message: string | ReactNode, options?: ToastProps) => string | number;

  /**
   * Show a warning toast
   */
  warning: (message: string | ReactNode, options?: ToastProps) => string | number;

  /**
   * Show an info toast
   */
  info: (message: string | ReactNode, options?: ToastProps) => string | number;

  /**
   * Show a loading toast
   */
  loading: (message: string | ReactNode, options?: ToastProps) => string | number;

  /**
   * Show a promise toast that updates based on promise state
   */
  promise: <T = unknown>(
    promise: Promise<T> | (() => Promise<T>),
    options: PromiseToastOptions<T>
  ) => string | number | { unwrap: () => Promise<T> };

  /**
   * Dismiss a specific toast or all toasts
   */
  dismiss: (id?: number | string) => void;

  /**
   * Show a message toast (alias for default)
   */
  message: (message: string | ReactNode, options?: ToastProps) => string | number;

  /**
   * Show a custom toast with JSX
   */
  custom: (
    jsx: (id: number | string) => React.ReactElement,
    options?: ToastProps
  ) => string | number;
}
