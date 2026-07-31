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
 * - **Colour.** Neutral only for now. The palette holds seven usable hues, and
 *   deciding whether a tag's colour carries meaning or is a free choice is a
 *   design decision that has not been made. Three of the ten colours this
 *   component used to offer - pink, teal and cyan - are not in the palette at
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
