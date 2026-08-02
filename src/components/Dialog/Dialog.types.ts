import type * as DialogPrimitive from '@radix-ui/react-dialog';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Props for the Dialog root component
 */
export type DialogProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

/**
 * Props for the DialogTrigger component
 */
export type DialogTriggerProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;

/**
 * Props for the DialogPortal component
 */
export type DialogPortalProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>;

/**
 * Props for the DialogOverlay component
 */
export type DialogOverlayProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;

/**
 * Props for the DialogContent component
 */
/** How wide the dialog is. */
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/** How much room the dialog gives its contents. */
export type DialogDensity = 'compact' | 'comfortable' | 'spacious';

/**
 * Which part of a tall dialog scrolls.
 *
 * `page` lets the whole dialog grow and scrolls the dimmed area behind it. Right
 * for a Prompt, and for anything short enough that scrolling is the exception.
 *
 * `body` caps the dialog at the viewport and scrolls only its body, leaving the
 * header and the footer where they are. That is the Panel pattern - seven of
 * the twelve product screens this was read from - and it is what keeps the
 * primary action reachable without scrolling to the bottom of a long form.
 */
export type DialogScroll = 'page' | 'body';

/** How a footer arranges what is in it. */
export type DialogFooterAlign = 'end' | 'between';

/** Why a dialog is being asked to close. */
export type DialogCloseReason = 'escape' | 'outside' | 'close-button';

export interface DialogContentProps extends ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> {
  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Nothing dismisses it: no close button, no Escape, no click outside.
   *
   * For the few things that genuinely must be answered - a session that has
   * expired, a plan that has lapsed. Reach for it rarely. A dialog with no way
   * out is the most hostile thing an interface can do, and every use of this is
   * a promise that the content contains the way forward.
   *
   * @default false
   */
  blocking?: boolean;

  /**
   * Work is in flight, so dismissal is refused until it clears.
   *
   * Submitting takes two seconds, and in those two seconds Escape, the close
   * button and a stray click outside would all abandon a request that is
   * already on its way to the server. The button shows `loading`; this stops
   * the dialog going anywhere while it does.
   *
   * @default false
   */
  busy?: boolean;

  /**
   * Asked before every dismissal. Return `false` to keep the dialog open.
   *
   * Anything other than `false` lets it close, so a handler that only wants to
   * observe can return nothing.
   *
   * Where an unsaved-changes guard lives: return `false` and open a
   * confirmation of your own. The reason says which way it was asked, because
   * "I pressed Escape" and "I clicked outside" sometimes deserve different
   * answers - the second is often an accident.
   */
  onRequestClose?: (reason: DialogCloseReason) => boolean | undefined;

  /**
   * How wide it is.
   *
   * `sm` a single decision · `md` the default · `lg` a form · `xl` something
   * with two columns or a builder in it · `full` a surface with its own
   * navigation.
   *
   * Five steps because the products cluster at five: confirmations near 520,
   * forms between 640 and 760, a rule builder around 800, and the occasional
   * near-full-screen picker. Before this there was one width, and the stories
   * escaped it with `sm:max-w-[425px]` and `sm:max-w-[800px]`.
   *
   * @default 'md'
   */
  size?: DialogSize;

  /**
   * How much room it gives its contents.
   *
   * `comfortable` is 24px and is what the product uses everywhere. `compact` is
   * 16px, for a dialog that is mostly chrome around one control.
   *
   * @default 'comfortable'
   */
  density?: DialogDensity;

  /**
   * Which part of a tall dialog scrolls. See {@link DialogScroll}.
   *
   * Defaults to `page`. `body` is what makes a Panel: the header stays, the
   * footer stays, and the reading between them moves.
   */
  scroll?: DialogScroll;
}

/**
 * Props for the DialogHeader component
 */
export interface DialogHeaderProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;

  /**
   * A way back, shown as an arrow before the title.
   *
   * For a dialog that is one step of something - the second page of a wizard,
   * a detail view opened from a list inside the same dialog. **Not a way out**:
   * the close button is that, and a dialog with two exits that do different
   * things has to make the difference visible, which is why this one is an
   * arrow on the left and close is a cross on the right.
   */
  onBack?: () => void;

  /** What the back control is called. Say where it goes, not that it goes. */
  backLabel?: string;

  /**
   * Where you are, as words - `2 of 5`.
   *
   * For a wizard too long to draw a step strip for, or one whose steps have no
   * names worth showing. With `DialogSteps` above, this is repeating what the
   * strip already says; use one or the other.
   */
  counter?: ReactNode;

  /**
   * A row of tabs belonging to this header.
   *
   * Rendered under the title and description, inside the header block, so it
   * stays put when the body scrolls. Tabs that scrolled away with the content
   * would leave somebody unable to switch back without scrolling up.
   */
  tabs?: ReactNode;
}

/**
 * Props for the DialogMedia component
 */
export interface DialogMediaProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

/**
 * Props for the DialogFooter component
 */
export interface DialogFooterProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;

  /**
   * How the footer arranges what is in it.
   *
   * `end` puts everything on the right - Cancel then the primary, the rhythm of
   * a decision. `between` pushes the first child to the left and the rest to
   * the right, which is what a step back, a support link or a "having a
   * problem?" wants: quiet on one side, the way forward on the other.
   *
   * @default 'end'
   */
  align?: DialogFooterAlign;

  /**
   * Draws the rule above it. On by default, because the product always has one.
   *
   * The footer is the only part of a dialog that is separated by a line - the
   * header flows into the body without one. That asymmetry is deliberate: a
   * line above the buttons says "the reading is over, now decide".
   *
   * @default true
   */
  divider?: boolean;
}

/**
 * Props for the DialogBody component
 */
export type DialogBodyProps = ComponentPropsWithoutRef<'div'>;

/**
 * Props for the DialogTitle component
 */
export interface DialogTitleProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
  /**
   * A short status beside the title - `Guest`, `Beta`, `Draft`.
   *
   * Passed rather than written inline so the title knows it is there: a tag
   * makes the line taller, and the gap to the description is tightened by 2px
   * to match. A `<Badge>` written straight into `children` looks identical and
   * leaves the spacing wrong.
   */
  tag?: ReactNode;
}

/**
 * Props for the DialogDescription component
 */
export type DialogDescriptionProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Description>;

/**
 * Props for the DialogClose component
 */
export type DialogCloseProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;

/** One part of a multi-step dialog. */
export interface DialogStep {
  /** Stable identity, reported to `onStepSelect`. */
  key: string;

  /** What it is called. */
  label: string;
}

export interface DialogStepsProps extends Omit<ComponentPropsWithoutRef<'ol'>, 'onSelect'> {
  /** The parts, in order. */
  steps: DialogStep[];

  /** Which one you are on, zero-based. Everything before it counts as done. */
  current: number;

  /**
   * Lets a finished step be gone back to. Omit it and none are clickable.
   *
   * Only steps already passed. Jumping ahead to one whose inputs depend on a
   * step you have not filled in is how a form ends up half-complete in an order
   * nobody designed for.
   */
  onStepSelect?: (key: string, index: number) => void;

  /** The list's accessible name. @default 'Progress' */
  label?: string;
}
