import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { tagPillVariants as TagPillVariantsCVA } from './TagPill';

export type TagPillVariants = VariantProps<typeof TagPillVariantsCVA>;

/**
 * The tag's outline.
 *
 * - `pill`   fully rounded. The default, and what a tag field expects.
 * - `square` gently rounded, for sitting into a column of data.
 */
export type TagPillShape = 'pill' | 'square';

/**
 * How the tag is drawn. `fill` is the default: the same neutral tint as a
 * neutral Badge, no stroke. `outline` clears the fill and draws a light inset
 * stroke; the geometry does not change.
 */
export type TagPillEmphasis = 'fill' | 'outline';

/**
 * Props for the TagPill component.
 *
 * ## What a tag is, and is not
 *
 * A tag is something a **person** put there and can take away - a filter they
 * applied, a label they assigned. `Badge` is the other half of that pair: a
 * label the **system** applies, which nobody removes.
 *
 * ## What is deliberately absent
 *
 * - **Colour.** Neutral only, by ruling (4 September 2026). Colour on a chip
 *   means the system set it, which makes it a Badge; a tag is the person's, so
 *   it keeps the neutral Badge tint and the eye reads the two as one family.
 *   all, so they were never really on offer.
 * - **Clicking the tag itself**, renaming in place, and a field that creates
 *   tags. Those are three separate pieces of work, and two of them are the same
 *   problem twice over.
 * - **More than one size.** A remove control needs a 24 x 24 target to be
 *   reliably hittable, and a chip shorter than 24px cannot hold one.
 * - **Removing with Backspace.** Tab still reaches the cross and Enter still
 *   fires it, so nothing is lost.
 * - **Moving focus after a removal.** Decided against.
 */
export interface TagPillOwnProps {
  /** The tag's outline. @default 'pill' */
  shape?: TagPillShape | undefined;

  /** Fill by default; outline on request, never by default. @default 'fill' */
  emphasis?: TagPillEmphasis | undefined;

  /**
   * A small mark before the label, drawn at 12px.
   *
   * The tag sizes it, so the caller never picks a glyph size. Use it when the
   * icon adds meaning the word cannot carry alone - most tags are text alone.
   *
   * Ignored when `avatar` is also given; a tag has one leading mark, not two.
   */
  icon?: ReactNode | undefined;

  /**
   * A person or thing before the label, drawn at 20px and sitting close to the
   * edge.
   *
   * An avatar is not an icon. A filled circle carries no air inside it, so it
   * runs nearly the chip's full height and takes a 2px inset rather than the
   * 10px an icon or a plain word gets. Padded like an icon it reads lopsided.
   */
  avatar?: ReactNode | undefined;

  /**
   * Called when the remove control is used. Without it there is no cross, and
   * the tag is simply a label.
   */
  onRemove?: (() => void) | undefined;

  /**
   * The tag was never yours to remove - applied by a policy, or inherited.
   *
   * No cross, no hover, and skipped by Tab entirely. Different from `disabled`,
   * which means it *is* yours but not at this moment.
   * @default false
   */
  readOnly?: boolean | undefined;

  /**
   * Yours to remove, but not right now - while a form saves, or until you have
   * permission. Still visible and still readable.
   * @default false
   */
  disabled?: boolean | undefined;

  /**
   * Cuts a long label off with an ellipsis instead of letting the tag widen.
   *
   * A tag's text is written by a person, so its length is not yours to control.
   * Off by default, because hiding text is worse than a wide tag unless the
   * space is genuinely fixed.
   * @default false
   */
  truncate?: boolean | undefined;

  /** The label. */
  children: ReactNode;

  /** Extra classes. Must use the `mdt-` prefix. */
  className?: string | undefined;
}

export type TagPillProps = TagPillOwnProps &
  Omit<ComponentPropsWithoutRef<'span'>, 'children' | 'className' | 'color'>;
