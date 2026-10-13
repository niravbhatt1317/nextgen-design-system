'use client';

import { forwardRef, useCallback, useRef, useState } from 'react';
import type { KeyboardEvent, SyntheticEvent } from 'react';
import { cn } from '@/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../Tooltip';
import { InfoFilledGlyph } from './InfoFilledGlyph';
import type { InfoTipProps } from './InfoTip.types';

/* PORTED FROM THE CONSOLE (Pranjal, 2026-10-13). Three hand-made copies of one ⓘ, reconciled:
 *
 *   features/organizations/settingsKit SInfo  (what BrandingStudio's InfoPop renders) - the look, from the 2026-10-11
 *       design picks: a 20 box with the 6 radius, the filled glyph at 14, neutral-40 at rest and neutral-60 with the
 *       sunken step behind it on hover, focus or open ("keep the i icon neutral 40 and highlight neutral 60",
 *       2026-10-03); the explainer under it, from its start, 340 at most, read from the left
 *   features/organizations/LifecycleModals InfoPop - the same placement (bottom, start, 340); its own colours
 *       (neutral-70 / neutral-150) are the minority and were not taken
 *   features/iei/setupParts InfoPop (22 call sites, the most used) - the behaviour: hover or keyboard focus opens it,
 *       and so does a press, since touch has no hover; the press holds back the Tooltip's own close-on-press so a
 *       click never blinks it shut, and a second press on the ⓘ is not a dismissal; leaving, Escape, blur or a press
 *       anywhere else closes it. Also its `icon` (another glyph, the same explainer) and `className`.
 *
 * Where they disagreed: the placement is SInfo's and LifecycleModals' bottom/start (setupParts opened it on top); the
 * cursor is the pointer (setupParts, LifecycleModals) because a press opens it, not SInfo's help cursor.
 *
 * NEW, no console copy has it: `learnMore`. The bubble turns hoverable so the pointer can reach the link, and Tab on
 * the open ⓘ moves focus into it (the bubble is portalled, so it is not in the page's tab order by itself). From the
 * link, Tab moves on to whatever follows the ⓘ, Shift+Tab goes back to the ⓘ and Escape closes and returns there. */

const TABBABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** The trigger's own close-on-press runs only when the event is not prevented. */
const hold = (event: SyntheticEvent): void => {
  event.preventDefault();
};

/**
 * InfoTip - the ⓘ beside a heading or a label. Its explainer opens on hover,
 * on keyboard focus and on a press, in the library Tooltip, optionally with a
 * "Learn more" link.
 *
 * @example
 * ```tsx
 * <InfoTip label="About Security policy">Applies to every user in this organization.</InfoTip>
 * <InfoTip label="About SCIM" learnMore={{ href: '/docs/scim', newTab: true }}>
 *   Your identity provider creates, updates and removes users here.
 * </InfoTip>
 * ```
 */
const InfoTip = forwardRef<HTMLButtonElement, InfoTipProps>(function InfoTip(
  { label, children, learnMore, side = 'bottom', align = 'start', maxWidth = 340, icon, className },
  forwardedRef
) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  /* a change the Tooltip asks for while focus is being moved on purpose, to be let pass once */
  const ignore = useRef<boolean | null>(null);

  const setTrigger = useCallback(
    (node: HTMLButtonElement | null) => {
      triggerRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef]
  );

  const onOpenChange = (next: boolean): void => {
    if (ignore.current === next) return;
    setOpen(next);
  };

  /** Moves focus without the Tooltip reading the move as an open or a close. */
  const focusQuietly = (element: HTMLElement, ignored: boolean): void => {
    ignore.current = ignored;
    element.focus();
    ignore.current = null;
  };

  /* the visible link comes first; the hidden copy Radix keeps for screen readers follows it */
  const link = (): HTMLAnchorElement | null =>
    contentRef.current?.querySelector<HTMLAnchorElement>('[data-infotip-link]') ?? null;

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key !== 'Tab' || event.shiftKey || !open) return;
    const target = link();
    if (!target) return;
    event.preventDefault();
    focusQuietly(target, false);
  };

  const onLinkKeyDown = (event: KeyboardEvent<HTMLAnchorElement>): void => {
    const trigger = triggerRef.current;
    if (event.key !== 'Tab' || !trigger) return;
    event.preventDefault();
    if (event.shiftKey) {
      trigger.focus();
      return;
    }
    setOpen(false);
    const order = Array.from(document.querySelectorAll<HTMLElement>(TABBABLE)).filter(
      (element) => element.tabIndex >= 0 && !contentRef.current?.contains(element)
    );
    const after = order[order.indexOf(trigger) + 1];
    if (after) after.focus();
    else focusQuietly(trigger, true);
  };

  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={onOpenChange} disableHoverableContent={!learnMore}>
        <TooltipTrigger asChild>
          <button
            ref={setTrigger}
            type="button"
            aria-label={label}
            className={cn(
              'mdt-m-0 mdt-inline-flex mdt-h-5 mdt-w-5 mdt-shrink-0 mdt-cursor-pointer mdt-items-center mdt-justify-center',
              'mdt-rounded-md mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-neutral-40',
              'mdt-transition-colors mdt-duration-100',
              'hover:mdt-bg-secondary hover:mdt-text-neutral-60',
              'data-[state=delayed-open]:mdt-bg-secondary data-[state=delayed-open]:mdt-text-neutral-60',
              'data-[state=instant-open]:mdt-bg-secondary data-[state=instant-open]:mdt-text-neutral-60',
              'focus-visible:mdt-bg-secondary focus-visible:mdt-text-neutral-60',
              'focus-visible:mdt-outline focus-visible:mdt-outline-2 focus-visible:mdt-outline-offset-0 focus-visible:mdt-outline-ring',
              className
            )}
            onPointerDown={hold}
            onClick={(event) => {
              hold(event);
              setOpen(true);
            }}
            onKeyDown={onTriggerKeyDown}
          >
            {icon ?? <InfoFilledGlyph className="mdt-h-3.5 mdt-w-3.5" />}
          </button>
        </TooltipTrigger>
        <TooltipContent
          ref={contentRef}
          side={side}
          align={align}
          maxWidth={maxWidth}
          className="mdt-text-left"
          /* to the explainer, a press on its own ⓘ is a press outside it - that one is not a dismissal */
          onPointerDownOutside={(event) => {
            const trigger = triggerRef.current;
            if (trigger && event.target instanceof Node && trigger.contains(event.target)) {
              event.preventDefault();
            }
          }}
          onEscapeKeyDown={() => {
            const trigger = triggerRef.current;
            if (trigger && contentRef.current?.contains(document.activeElement)) {
              focusQuietly(trigger, true);
            }
          }}
        >
          {children}
          {learnMore ? (
            <span className="mdt-mt-1 mdt-block">
              <a
                data-infotip-link=""
                href={learnMore.href}
                /* out of the page's tab order: the bubble is portalled, so Tab from the ⓘ moves here instead */
                tabIndex={-1}
                {...(learnMore.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="mdt-rounded-sm mdt-font-medium mdt-text-inverse-foreground mdt-underline mdt-underline-offset-2 focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring"
                onKeyDown={onLinkKeyDown}
              >
                {learnMore.label ?? 'Learn more'}
                {learnMore.newTab ? (
                  <span className="mdt-sr-only"> (opens in a new tab)</span>
                ) : null}
              </a>
            </span>
          ) : null}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

InfoTip.displayName = 'InfoTip';

export { InfoTip };
