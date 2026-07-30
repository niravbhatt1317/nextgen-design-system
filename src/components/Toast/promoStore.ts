import type { ToastPromoProps } from './Toast.types';

/**
 * The one promotional toast, held outside the toast library.
 *
 * Blade keeps promotional and informational toasts in two separate stacks: the
 * promotional anchors the bottom and never moves, the informational ones pile
 * up above it, and neither dismisses the other. The library we use has one
 * global stack shared by every toaster on the page, so a second toaster would
 * simply show the same toasts again - there is no way to scope one.
 *
 * So the promotional lives here instead, and `Toast` renders it on its own
 * layer. That also makes "only one at a time" true by construction rather than
 * by discipline: there is one slot, and showing a second fills the same slot.
 *
 * These are arrow properties rather than methods on purpose - every one of them
 * is handed to a subscriber or an event handler, detached from the object, and
 * a method would carry a `this` nobody wants.
 */
export type PromoEntry = (Omit<ToastPromoProps, 'onClose'> & { key: number }) | null;

let current: PromoEntry = null;
let timer: ReturnType<typeof setTimeout> | undefined;
let counter = 0;

const listeners = new Set<() => void>();

const emit = (): void => {
  for (const listener of listeners) listener();
};

const clearTimer = (): void => {
  if (timer !== undefined) {
    clearTimeout(timer);
    timer = undefined;
  }
};

const dismiss = (): void => {
  clearTimer();
  if (current === null) return;
  current = null;
  emit();
};

export const promoStore = {
  subscribe: (listener: () => void): (() => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  get: (): PromoEntry => current,

  /** Server render has nothing on screen, so nothing to report. */
  getServerSnapshot: (): PromoEntry => null,

  /**
   * Shows the promotional toast. A second call replaces the first rather than
   * queueing behind it - there is only ever one slot.
   */
  show: (entry: Omit<ToastPromoProps, 'onClose'>, duration: number): void => {
    clearTimer();
    counter += 1;
    current = { ...entry, key: counter };
    emit();

    if (Number.isFinite(duration) && duration > 0) {
      timer = setTimeout(dismiss, duration);
    }
  },

  dismiss,

  isOpen: (): boolean => current !== null,
};
