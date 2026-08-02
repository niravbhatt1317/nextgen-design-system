/**
 * The soft edge on a scrolling region.
 *
 * **Rows fade out rather than being sliced off.** A hard edge under a sticky
 * header reads as a mistake - half a line of text cut through the middle looks
 * like something failed to render. A fade says the list continues.
 *
 * **A fade with nothing behind it says the same thing and is wrong**, which is
 * why each one waits for its own end of the content to actually be off screen.
 * That is what `SCROLL_FADE_OFF` is for, and it is the half people leave out.
 *
 * First drawn in `LeftNav`; shared from here the moment `Dialog` wanted the
 * same edge, rather than copied. The **colour is not here**: a fade has to end
 * in whatever surface it sits on, and `LeftNav`'s panel and a dialog's card are
 * not the same colour. Each caller brings its own `from-*`.
 *
 * @example
 * ```tsx
 * <span aria-hidden className={cn(SCROLL_FADE_STRIP, SCROLL_FADE_TOP, SCROLL_FADE_DOWN,
 *   'mdt-from-background', atTop && SCROLL_FADE_OFF)} />
 * ```
 */
export const SCROLL_FADE_STRIP =
  'mdt-pointer-events-none mdt-absolute mdt-inset-x-0 mdt-transition-opacity';

/** At the top of the region. Shorter than the bottom - see below. */
export const SCROLL_FADE_TOP = 'mdt-top-0 mdt-h-4';

/**
 * At the bottom. Taller, at 24 against the top's 16.
 *
 * Not symmetry for its own sake: the bottom edge is the one somebody is reading
 * towards, so it has to say "there is more" from further away. The top edge is
 * only confirming what they have already been through.
 */
export const SCROLL_FADE_BOTTOM = 'mdt-bottom-0 mdt-h-6';

/** Fading downward, for the strip at the top. */
export const SCROLL_FADE_DOWN = 'mdt-bg-gradient-to-b mdt-to-transparent';

/** Fading upward, for the strip at the bottom. */
export const SCROLL_FADE_UP = 'mdt-bg-gradient-to-t mdt-to-transparent';

/** When that end of the content is already in view. */
export const SCROLL_FADE_OFF = 'mdt-opacity-0';
