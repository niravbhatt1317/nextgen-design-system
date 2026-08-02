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
 * calm colour in all six. That rule came from Org Mgmt's banner and it is the
 * whole design: six tones that differ by a tint, an edge and a glyph read as
 * one family, while six tones of coloured text read as six problems.
 */
export const FEEDBACK_SURFACE: Record<FeedbackTone, string> = {
  info: 'mdt-border-feedback-info-border mdt-bg-feedback-info-bg',
  warning: 'mdt-border-feedback-warning-border mdt-bg-feedback-warning-bg',
  danger: 'mdt-border-feedback-danger-border mdt-bg-feedback-danger-bg',
  success: 'mdt-border-feedback-success-border mdt-bg-feedback-success-bg',
  ai: 'mdt-border-feedback-ai-border mdt-bg-feedback-ai-bg',
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
