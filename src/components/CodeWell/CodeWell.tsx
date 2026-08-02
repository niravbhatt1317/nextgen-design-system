import { cva } from 'class-variance-authority';
import { forwardRef, useEffect, useRef, useState } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { Label } from '../Label';
import { SecretDots } from '../SecretDots';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../Tooltip';

/**
 * CodeWell styles - a read-only monospace surface for commands, tokens,
 * generated config and log output.
 *
 * Both Org Mgmt and Agent Fleet asked for exactly this in their own audits. Org
 * Mgmt has three separate wells and recommends extracting one CodeWell with
 * copy and mask options. Agent Fleet has a light CodeBlock and a hand-rolled
 * DarkTerminalWell, records three screens bypassing both, and recommends
 * folding them into a single component with a surface option. This is that
 * component.
 */
export const codeWellVariants = cva(
  'mdt-block mdt-w-full mdt-rounded-md mdt-font-mono mdt-text-xs',
  {
    variants: {
      /**
       * `true` keeps the well one line tall and cuts the value with an ellipsis;
       * the whole value arrives in a tooltip on hover or focus.
       *
       * Overflow lives here rather than in the base classes on purpose. Setting
       * `overflow-x: auto` in the base and `overflow: hidden` here would leave
       * two rules fighting over the same property, and which one won would come
       * down to the order Tailwind happened to emit them in.
       */
      truncate: {
        true: 'mdt-overflow-hidden mdt-text-ellipsis mdt-whitespace-nowrap',
        false: 'mdt-overflow-x-auto',
      },
      surface: {
        light: 'mdt-border mdt-border-border mdt-bg-muted mdt-text-foreground',
        // In dark mode neutral-160 IS the page background, so a dark well would
        // read as a bordered hole rather than a surface - and the light variant
        // would stand out more than the dark one, inverting the relationship.
        // Lifting it one step keeps dark darker than light in both themes.
        dark: 'mdt-border mdt-border-neutral-130 mdt-bg-neutral-160 mdt-text-neutral-20 dark:mdt-border-neutral-120 dark:mdt-bg-neutral-150',
      },
      padded: {
        true: 'mdt-p-3',
        false: 'mdt-px-3 mdt-py-2',
      },
      /**
       * Controls sit on the well's vertical centre line, which is exactly where
       * a single line of content is. Without room reserved on the right, the
       * text runs underneath them - so the well reserves it rather than leaving
       * the overlap to chance.
       */
      controls: {
        none: '',
        one: 'mdt-pr-16',
        two: 'mdt-pr-32',
      },
    },
    defaultVariants: { surface: 'light', padded: true, controls: 'none', truncate: false },
  }
);

export type CodeWellVariantsType = VariantProps<typeof codeWellVariants>;
export type CodeWellSurface = 'light' | 'dark';

export interface CodeWellProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'className' | 'children' | 'color'
> {
  /** The text to show. */
  children: ReactNode;

  /**
   * The raw value used for copying and for deciding what to reveal. Falls back
   * to `children` when it is already a string.
   */
  value?: string;

  /** @default 'light' */
  surface?: CodeWellSurface;

  /** An uppercase heading above the well. */
  label?: string;

  /** Shows a copy button. @default false */
  copyable?: boolean;

  /**
   * Starts masked, with a reveal control. Use for tokens and secrets.
   * @default false
   */
  maskable?: boolean;

  /**
   * Holds the well to a single line and cuts the value with an ellipsis. The
   * whole value appears in a tooltip on hover or keyboard focus, and copying
   * still takes all of it.
   *
   * The tooltip only appears when the value is genuinely too wide - a short
   * value in a truncating well is fully readable, so a tooltip repeating it
   * would be noise. It never appears while a value is masked.
   *
   * Needs `value`, or a `children` that is already a string, for the tooltip to
   * have something to show.
   *
   * @default false
   */
  truncate?: boolean;

  className?: string;
}

const CONTROL =
  'mdt-rounded-sm mdt-px-2 mdt-py-1 mdt-text-xs mdt-font-medium mdt-transition-colors focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring';

const CONTROL_SURFACE: Record<CodeWellSurface, string> = {
  light: 'mdt-text-muted-foreground hover:mdt-bg-background hover:mdt-text-foreground',
  dark: 'mdt-text-neutral-40 hover:mdt-bg-neutral-140 hover:mdt-text-neutral-10',
};

/**
 * CodeWell - a read-only monospace surface.
 *
 * @example
 * ```tsx
 * <CodeWell>npm install @mtdt/nextgen-design-system</CodeWell>
 * <CodeWell surface="dark" label="Install command" copyable>curl -sSL ...</CodeWell>
 * <CodeWell maskable copyable value="sk-live-abc123">sk-live-abc123</CodeWell>
 * ```
 */
const CodeWell = forwardRef<HTMLDivElement, CodeWellProps>(
  (
    {
      children,
      value,
      surface = 'light',
      label,
      copyable = false,
      maskable = false,
      truncate = false,
      className,
      ...rest
    },
    ref
  ) => {
    const [revealed, setRevealed] = useState(false);
    const [copied, setCopied] = useState(false);
    const [clipped, setClipped] = useState(false);
    const bodyRef = useRef<HTMLPreElement>(null);

    const raw = value ?? (typeof children === 'string' ? children : '');
    const hidden = maskable && !revealed;

    // Whether the ellipsis is actually doing anything. A value that fits needs
    // no tooltip, and the answer changes when the container is resized.
    useEffect(() => {
      const element = bodyRef.current;
      if (!truncate || !element) {
        setClipped(false);
        return undefined;
      }

      const measure = (): void => {
        setClipped(element.scrollWidth > element.clientWidth);
      };
      measure();

      const observer = new ResizeObserver(measure);
      observer.observe(element);
      return () => {
        observer.disconnect();
      };
    }, [truncate, children, hidden]);

    const copy = (): void => {
      void navigator.clipboard.writeText(raw);
      setCopied(true);
    };

    const controlCount = (copyable ? 1 : 0) + (maskable ? 1 : 0);
    const showControls = controlCount > 0;
    const controls = (['none', 'one', 'two'] as const).at(controlCount) ?? 'none';

    // Nothing to reveal, nothing to reveal it to, or it is deliberately masked.
    const showTooltip = truncate && clipped && !hidden && raw !== '';

    const body = (
      <pre
        ref={bodyRef}
        className={codeWellVariants({ surface, controls, truncate })}
        data-testid="codewell-body"
        // Focusable only while there is a tooltip to reach, so keyboard users
        // are not made to tab through wells that have nothing hidden.
        //
        // The lint rule guards against making arbitrary elements focusable, and
        // it is right to. This is the case it does not model: WCAG 1.4.13 asks
        // that anything shown on hover also be reachable on focus, and the only
        // thing to focus here is the well itself. Not focusable would mean a
        // keyboard user simply cannot read the value.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={showTooltip ? 0 : undefined}
      >
        {/* `sm` matches the well's own text size. SecretDots defaults to a
            step larger, which made the well 4px taller while masked and
            shrink the moment it was revealed. */}
        {hidden ? <SecretDots size="sm" label="Hidden value" /> : children}
      </pre>
    );

    return (
      <div ref={ref} className={cn('mdt-flex mdt-flex-col mdt-gap-1.5', className)} {...rest}>
        {label !== undefined ? <Label>{label}</Label> : null}

        <div className="mdt-relative">
          {/* The wrapper is tied to `truncate`, not to `showTooltip`. Swapping
              the tree shape as the value happens to fit or not would remount
              the <pre>, which would detach the ResizeObserver watching it. */}
          {truncate ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>{body}</TooltipTrigger>
                {showTooltip ? (
                  <TooltipContent className="mdt-max-w-sm mdt-whitespace-normal mdt-break-all mdt-font-mono">
                    {raw}
                  </TooltipContent>
                ) : null}
              </Tooltip>
            </TooltipProvider>
          ) : (
            body
          )}

          {showControls ? (
            // Controls sit on the vertical centre line, not pinned to the top.
            // A well is usually one line tall, and a top-pinned control reads as
            // slightly off in that case. Centring holds for every variant, so
            // there is one rule rather than one per height.
            <div className="mdt-absolute mdt-right-1.5 mdt-top-1/2 mdt-flex -mdt-translate-y-1/2 mdt-gap-1">
              {maskable ? (
                <button
                  type="button"
                  className={cn(CONTROL, CONTROL_SURFACE[surface])}
                  onClick={() => {
                    setRevealed((r) => !r);
                  }}
                >
                  {revealed ? 'Hide' : 'Reveal'}
                </button>
              ) : null}
              {copyable ? (
                <button
                  type="button"
                  className={cn(CONTROL, CONTROL_SURFACE[surface])}
                  onClick={copy}
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

CodeWell.displayName = 'CodeWell';

export { CodeWell };
