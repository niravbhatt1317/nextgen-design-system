import { useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Toaster as Sonner, toast as sonnerToast, type ExternalToast } from 'sonner';
import { cn } from '@/utils';
import { promoStore } from './promoStore';
import { ToastBody } from './ToastBody';
import { ToastPromo } from './ToastPromo';
import type {
  PromiseToastOptions,
  ToastFunction,
  ToastPosition,
  ToastPromoProps,
  ToastProps,
  ToastTone,
  ToasterProps,
} from './Toast.types';

/** The library's own edge gap, matched so the two stacks line up. */
const EDGE = 24;

/** Space between the promotional toast and the stack above it. */
const STACK_GAP = 12;

/** Where the promotional layer pins itself, per toaster position. */
const ANCHOR: Record<ToastPosition, string> = {
  'top-left': 'mdt-top-6 mdt-left-6',
  'top-center': 'mdt-top-6 mdt-left-1/2 -mdt-translate-x-1/2',
  'top-right': 'mdt-top-6 mdt-right-6',
  'bottom-left': 'mdt-bottom-6 mdt-left-6',
  'bottom-center': 'mdt-bottom-6 mdt-left-1/2 -mdt-translate-x-1/2',
  'bottom-right': 'mdt-bottom-6 mdt-right-6',
};

/**
 * The promotional layer - its own stack, anchored to the same corner as the
 * toaster and never moved by anything the toaster does.
 *
 * It reports its own height so the toaster can be pushed clear of it, which is
 * what keeps the two stacks from overlapping.
 */
const PromoLayer = ({
  position,
  onHeight,
}: Readonly<{ position: ToastPosition; onHeight: (height: number) => void }>) => {
  const entry = useSyncExternalStore(
    promoStore.subscribe,
    promoStore.get,
    promoStore.getServerSnapshot
  );
  const ref = useRef<HTMLDivElement>(null);

  // Measured rather than assumed: a promotional toast with a picture and three
  // lines is a very different height from one with a single line, and the stack
  // above it has to clear whichever it is.
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      onHeight(0);
      return undefined;
    }

    const measure = (): void => {
      onHeight(element.getBoundingClientRect().height);
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => {
      observer.disconnect();
      onHeight(0);
    };
  }, [entry?.key, onHeight]);

  if (!entry) return null;

  const { key, ...promo } = entry;

  return (
    <div
      ref={ref}
      key={key}
      className={cn(
        'mdt-fixed mdt-z-50 mdt-w-toast mdt-max-w-[calc(100vw-3rem)]',
        ANCHOR[position]
      )}
      data-testid="toast-promo-layer"
    >
      <ToastPromo {...promo} onClose={promoStore.dismiss} />
    </div>
  );
};

/**
 * Toast - notifications, wearing Org Mgmt's banner.
 *
 * The surface is Om Vekariya's banner taken exactly: a tint, a one-pixel edge
 * and a tone glyph, with the text held at one colour in every tone. See
 * `ToastBody` for the anatomy and `globals.css` for the palette.
 *
 * Every toast is rendered by us rather than by the toast library. The library
 * still does the work worth having - stacking, timing, entry and exit, swipe to
 * dismiss - but it only knows four tones and this component needs six. Owning
 * the markup is also what makes the close control and the icon rule possible.
 *
 * @example
 * ```tsx
 * // Once, at the root of the app
 * <Toast />
 *
 * // Then from anywhere
 * toast.success('Domain verified', { description: 'portal.acme.com is live.' });
 * toast.ai('Three orgs match this scope', { description: 'Apply it to all?' });
 * toast.danger('Could not save', { closable: false });
 * ```
 */
const Toast = ({
  position = 'bottom-right',
  theme = 'light',
  expand = false,
  duration = 4000,
  visibleToasts = 3,
  className,
  toastOptions,
  offset,
  ...props
}: ToasterProps) => {
  const [promoHeight, setPromoHeight] = useState(0);

  // The stack is pushed clear of the promotional toast rather than stacked on
  // top of it, which is what makes them two piles instead of one.
  const pushed = promoHeight > 0 ? EDGE + promoHeight + STACK_GAP : EDGE;
  const shifted = position.startsWith('bottom') ? { bottom: pushed } : { top: pushed };

  return (
    <>
      <PromoLayer position={position} onHeight={setPromoHeight} />
      <Sonner
        position={position}
        theme={theme}
        expand={expand}
        duration={duration}
        visibleToasts={visibleToasts}
        offset={offset ?? { top: EDGE, right: EDGE, bottom: EDGE, left: EDGE, ...shifted }}
        className={cn('mdt-toaster', className)}
        // Every toast draws its own surface, so the library must not draw one too.
        toastOptions={{ unstyled: true, ...toastOptions }}
        {...props}
      />
    </>
  );
};

Toast.displayName = 'Toast';

/**
 * Options that belong to the surface rather than to the toast library.
 *
 * Written out rather than `Pick`ed because `exactOptionalPropertyTypes` treats
 * "absent" and "present but undefined" as different things, and destructuring
 * always produces the second.
 */
type BodyOptions = {
  [K in 'description' | 'icon' | 'closable' | 'size' | 'action']?: ToastProps[K] | undefined;
};

/** Splits our options from the library's, so neither sees the other's. */
const splitOptions = (options?: ToastProps): { body: BodyOptions; sonner: ExternalToast } => {
  const { description, icon, closable, size, action, ...rest } = options ?? {};
  return {
    body: { description, icon, closable, size, action },
    sonner: rest as ExternalToast,
  };
};

/** Renders one toast in a given tone. */
const show = (
  tone: ToastTone,
  message: ToastProps['message'],
  options?: ToastProps,
  loading = false
): string | number => {
  const { body, sonner } = splitOptions(options);

  return sonnerToast.custom(
    (id) => (
      <ToastBody
        tone={tone}
        size={body.size ?? 'sm'}
        title={message}
        description={body.description}
        icon={body.icon}
        loading={loading}
        closable={body.closable ?? true}
        action={body.action as { label: string; onClick: () => void } | undefined}
        onClose={() => {
          sonnerToast.dismiss(id);
        }}
      />
    ),
    sonner
  );
};

/**
 * Renders the promotional toast.
 *
 * Its own function rather than another tone, because it takes different things:
 * a picture, a paragraph, a call to action. Longer on screen by default too -
 * four seconds is enough to read "Saved", not enough to read an announcement.
 */
const showPromo = (options: Omit<ToastPromoProps, 'onClose'> & { duration?: number }): void => {
  // Eight seconds, matching Blade. Four is enough to read "Saved"; it is not
  // enough to read an announcement.
  const { duration = 8000, ...promo } = options;
  promoStore.show(promo, duration);
};

/**
 * Whether a promotional toast is on screen.
 *
 * Blade disables its trigger while one is open, and this is what lets an app do
 * the same. Only one can exist - showing a second replaces the first - so this
 * is about telling the person, not about enforcing the rule.
 */
export const usePromotionalOpen = (): boolean => {
  const entry = useSyncExternalStore(
    promoStore.subscribe,
    promoStore.get,
    promoStore.getServerSnapshot
  );
  return entry !== null;
};

/**
 * Runs a promise through one toast: spinner, then the outcome in its place.
 *
 * The toast library ships its own version of this, but it draws its own
 * surface. Re-running it over our toasts keeps a loading toast and a success
 * toast looking like the same component, which is the point of borrowing one
 * banner in the first place.
 */
const runPromise = <T,>(
  input: Promise<T> | (() => Promise<T>),
  options: PromiseToastOptions<T>
): string | number => {
  const id = show('neutral', options.loading, { closable: false, duration: Infinity }, true);

  const resolve = (value: unknown, arg: unknown): ToastProps['message'] =>
    typeof value === 'function'
      ? (value as (a: unknown) => ToastProps['message'])(arg)
      : (value as ToastProps['message']);

  const settle = (tone: ToastTone, message: ToastProps['message']): void => {
    show(tone, message, {
      id,
      description: options.description,
      duration: options.duration ?? 4000,
    });
  };

  void Promise.resolve(typeof input === 'function' ? input() : input)
    .then((data) => {
      settle('success', resolve(options.success, data));
    })
    .catch((error: unknown) => {
      settle('danger', resolve(options.error, error));
    });

  return id;
};

/**
 * Toast trigger function.
 *
 * @example
 * ```tsx
 * toast('Retention is a platform standard');            // neutral
 * toast.success('Domain verified');
 * toast.warning('Suspension scheduled');
 * toast.danger('This action cannot be undone');
 * toast.info('Subdomain is immutable');
 * toast.ai('Three orgs match this scope');
 *
 * // With a second line and an action
 * toast.success('Domain verified', {
 *   description: 'portal.acmehealth.com now serves the branded portal.',
 *   action: { label: 'View', onClick: open },
 * });
 *
 * // Without the close control
 * toast.danger('Session expired', { closable: false });
 *
 * // Dismiss from code
 * const id = toast.info('Working');
 * toast.dismiss(id);
 * ```
 */
const toast: ToastFunction = Object.assign(
  (message: ToastProps['message'], options?: ToastProps) => show('neutral', message, options),
  {
    success: (message: ToastProps['message'], options?: ToastProps) =>
      show('success', message, options),
    danger: (message: ToastProps['message'], options?: ToastProps) =>
      show('danger', message, options),
    // The name the rest of the codebase already calls. Same tone.
    error: (message: ToastProps['message'], options?: ToastProps) =>
      show('danger', message, options),
    warning: (message: ToastProps['message'], options?: ToastProps) =>
      show('warning', message, options),
    info: (message: ToastProps['message'], options?: ToastProps) => show('info', message, options),
    ai: (message: ToastProps['message'], options?: ToastProps) => show('ai', message, options),
    promotional: showPromo,
    dismissPromotional: promoStore.dismiss,
    neutral: (message: ToastProps['message'], options?: ToastProps) =>
      show('neutral', message, options),
    loading: (message: ToastProps['message'], options?: ToastProps) =>
      show('neutral', message, { closable: false, duration: Infinity, ...options }, true),
    promise: runPromise as ToastFunction['promise'],
    dismiss: sonnerToast.dismiss,
    message: (message: ToastProps['message'], options?: ToastProps) =>
      show('neutral', message, options),
    custom: (jsx: (id: number | string) => React.ReactElement, options?: ToastProps) =>
      sonnerToast.custom(jsx, options as ExternalToast),
  }
);

export { Toast, toast };
