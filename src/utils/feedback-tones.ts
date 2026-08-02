import type { IconName } from '../components/Icon';

/**
 * The six tones a piece of feedback can take.
 *
 * Shared by `Toast` and `Callout`, which are the same six colours doing two
 * different jobs - one floats over the page and announces itself, the other is
 * already there when you arrive. Held here so a seventh tone is one edit rather
 * than two that drift.
 */
export type FeedbackTone = 'info' | 'warning' | 'danger' | 'success' | 'ai' | 'neutral';

/** Every tone, in the order they are usually shown. */
export const FEEDBACK_TONES: FeedbackTone[] = [
  'neutral',
  'info',
  'success',
  'warning',
  'danger',
  'ai',
];

/**
 * The tint and the edge.
 *
 * **Only the icon and the border carry the tone** - the body text stays one
 * calm colour in all six.
 *
 * The fill is laid on solid in light mode and **washed back to 30% in dark**.
 * The ramps have no low-saturation dark step, so the coloured fills available
 * there are 17-20% lightness at up to 100% saturation against a 10% page -
 * six blocks of colour rather than six tints. The steps below them are 9-10%,
 * level with the page or darker, and a fill darker than its page reads as a
 * hole. Compositing keeps the hue and takes the weight off.
 *
 * `neutral` is not washed: it is already a neutral lift off the page, and
 * fading it would leave nothing. That rule came from Org Mgmt's banner and it is the
 * whole design: six tones that differ by a tint, an edge and a glyph read as
 * one family, while six tones of coloured text read as six problems.
 */
export const FEEDBACK_SURFACE: Record<FeedbackTone, string> = {
  info: 'mdt-border-feedback-info-border mdt-bg-feedback-info-bg dark:mdt-bg-feedback-info-bg/30',
  warning:
    'mdt-border-feedback-warning-border mdt-bg-feedback-warning-bg dark:mdt-bg-feedback-warning-bg/30',
  danger:
    'mdt-border-feedback-danger-border mdt-bg-feedback-danger-bg dark:mdt-bg-feedback-danger-bg/30',
  success:
    'mdt-border-feedback-success-border mdt-bg-feedback-success-bg dark:mdt-bg-feedback-success-bg/30',
  ai: 'mdt-border-feedback-ai-border mdt-bg-feedback-ai-bg dark:mdt-bg-feedback-ai-bg/30',
  neutral: 'mdt-border-feedback-neutral-border mdt-bg-feedback-neutral-bg',
};

/** The one thing that is allowed to be the tone's own colour. */
export const FEEDBACK_ICON_COLOUR: Record<FeedbackTone, string> = {
  info: 'mdt-text-feedback-info-icon',
  warning: 'mdt-text-feedback-warning-icon',
  danger: 'mdt-text-feedback-danger-icon',
  success: 'mdt-text-feedback-success-icon',
  ai: 'mdt-text-feedback-ai-icon',
  neutral: 'mdt-text-feedback-neutral-icon',
};

/**
 * One registry glyph per tone.
 *
 * `ai` shares the Button's sparkle deliberately: same feature, same mark.
 */
export const FEEDBACK_ICON: Record<FeedbackTone, IconName> = {
  info: 'info',
  neutral: 'info',
  warning: 'alert-triangle',
  danger: 'alert-circle',
  success: 'check',
  ai: 'sparkles',
};

/**
 * The tones whose glyph is a mark rather than an icon.
 *
 * `ai` draws `AiMark` — three colours sweeping across a star — instead of a
 * Lucide glyph in the tone's own colour. It is the one tone that is a brand
 * rather than a status, and the gradient is the thing that says so.
 *
 * The set lives here so `Toast` and `Callout` reach the same conclusion from
 * the same line, rather than each deciding for itself and drifting.
 */
export const FEEDBACK_MARK_TONES = new Set<FeedbackTone>(['ai']);
