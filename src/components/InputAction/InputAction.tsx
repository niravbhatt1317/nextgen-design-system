'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type { InputActionProps } from './InputAction.types';
import './inputAction.css';

/* PORTED FROM THE CONSOLE (Ronak, 2026-10-09). The credential form's Reference path field carried Browse inside it
 * (features/credential-profiles/CredentialForm.jsx, credentialProfiles.css .cp-browse-wrap / .cp-browse): "merge the
 * browse button in the input so both in the single block", then "vertical divider line left side of the browse
 * button, and make little more prominent but it's should be simple", "vertical line should touch the top and bottom
 * border" and "browse button is not vertical center aligned". The same control then rode two more fields - Replace
 * on a stored secret (atoms.jsx StoredSecret, 2026-10-13: "make that component like we did in the browse fields") and
 * Copy in the store dialog (storeDialogs.jsx, "the Browse control's twin") - so it comes across as one part, the
 * action, with the word and glyph the caller's. A disabled button swallows hover, so the reason rides the wrapper's
 * title (CredentialForm: "No path-list API on this store"). */

/* THE WIDTH EASES (Ronak, 2026-10-28: "when we click on the copy or replace ... change the width of the button ...
 * we need to smooth transition that change like smooth animation instead of the instant"): the word changes - Copy
 * to Copied, Replace to Undo - so the control's width does. The width is measured from the words and set on the
 * button, which the stylesheet eases over 180 ms, the new words fading in as it moves. A control that mounts just as
 * another left (Undo in the typed field, where Replace stood in the stored one) starts at the width the other had and
 * eases to its own, so a swap of fields still reads as one control changing its word. */
const lastLeft = { width: 0, at: 0 };
const HANDOFF_MS = 400;
const now = (): number => (typeof performance === 'undefined' ? 0 : performance.now());

/**
 * InputAction - an action that rides inside a field, at its right end, behind a hairline that runs border to border:
 * a glyph and a word ("Browse", "Replace", "Copy") on a quiet ghost control. Give it to the Input's `endAdornment`
 * and keep the field's text clear of it with a right padding as wide as the control. When its word changes, the
 * control's width eases to the new word rather than jumping.
 *
 * @example
 * ```tsx
 * <Input
 *   label="Reference path"
 *   placeholder="secret/data/<path>"
 *   style={{ paddingRight: 116 }}
 *   endAdornment={
 *     <InputAction icon="folder" onClick={openBrowser} disabled={!store} disabledReason="Pick a store first">
 *       Browse
 *     </InputAction>
 *   }
 * />
 * ```
 */
const InputAction = forwardRef<HTMLButtonElement, InputActionProps>(function InputAction(
  {
    children,
    icon,
    disabled = false,
    disabledReason,
    copyText,
    copiedLabel = 'Copied',
    copiedDuration = 1500,
    wrapperClassName,
    className,
    onClick,
    style,
    ...rest
  },
  ref
) {
  /* a copy action: "Copied" with a check in the success ink for a moment, as the console's ReadOnlyCopy does
   * (storeDialogs.jsx, 1500) - the clipboard may be blocked, and the value is still in the field then */
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(
    () => () => {
      clearTimeout(timer.current);
    },
    []
  );

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    if (copyText !== undefined) {
      const board = navigator.clipboard as Clipboard | undefined; // missing outside a secure context
      board?.writeText(copyText).catch(() => undefined);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setCopied(false);
      }, copiedDuration);
    }
    onClick?.(event);
  };

  const isCopy = copyText !== undefined;
  const glyph = copied ? 'check' : icon;
  const word = copied ? copiedLabel : children;
  /* what the control says right now; a change of it is a swap the width eases to and the words fade in on */
  const wordKey = `${glyph ?? ''}|${typeof word === 'string' ? word : ''}|${String(copied)}`;

  const button = useRef<HTMLButtonElement | null>(null);
  const label = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const started = useRef(false); // true once the control has a width of its own (a hand-off has eased)
  const [swaps, setSwaps] = useState(0);
  const mountedWord = useRef(wordKey);

  /* the control's width: its words, plus the padding either side of them (the stylesheet's) */
  const fit = useCallback(() => {
    const b = button.current;
    const l = label.current;
    if (!b || !l) return;
    const words = l.getBoundingClientRect().width;
    if (words <= 0) return; // nothing drawn yet (or no layout at all, as in a test)
    const cs = getComputedStyle(b);
    setWidth(words + parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight));
  }, []);

  /* before paint on every change of word or glyph. On mount, a control that follows one that just left (its width
   * left behind below, in the same commit) paints once at that width, with its words fading in, then eases to its
   * own on the next frame. */
  useLayoutEffect(() => {
    if (!started.current && now() - lastLeft.at < HANDOFF_MS) {
      setWidth(lastLeft.width);
      setSwaps(1);
      // two frames: the first paints the inherited width, the second sets the control's own, which then eases
      // (a development double-run of this effect lands here again and simply re-arms the frames)
      let inner = 0;
      const settle = (): void => {
        clearTimeout(fallback);
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
        started.current = true;
        fit();
      };
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(settle);
      });
      // frames can be held back (a hidden tab, a throttled window); the control still takes its own width in time
      const fallback = setTimeout(settle, 120);
      return () => {
        clearTimeout(fallback);
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }
    started.current = true;
    fit();
    return undefined;
  }, [fit, wordKey]);

  /* a swap after mount fades the new words in */
  useEffect(() => {
    if (mountedWord.current === wordKey) return;
    mountedWord.current = wordKey;
    setSwaps((n) => n + 1);
  }, [wordKey]);

  /* the words can change size without a swap - a web font arriving, a zoom - so the width follows them. The observer
   * reports once on sight; that first report is skipped, or it would set the width in the frame a hand-off is
   * meant to paint the leaving control's width in, and nothing would ease. */
  useEffect(() => {
    const l = label.current;
    if (!l || typeof ResizeObserver === 'undefined') return undefined;
    let first = true;
    const observer = new ResizeObserver(() => {
      if (first) {
        first = false;
        return;
      }
      fit();
    });
    observer.observe(l);
    return () => {
      observer.disconnect();
    };
  }, [fit]);

  /* on the way out, leave the width behind for a control that takes this one's place - a layout cleanup, which runs
   * while the button is still in the page and before the newcomer's layout effect reads it */
  useLayoutEffect(
    () => () => {
      const b = button.current;
      // a control still easing in from a hand-off has no width of its own to leave (and a development double-run
      // of the effects unmounts it once in exactly that state - leaving its width would overwrite the real one)
      if (!b || !started.current) return;
      lastLeft.width = b.getBoundingClientRect().width;
      lastLeft.at = now();
    },
    []
  );

  const setRefs = (node: HTMLButtonElement | null): void => {
    button.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  return (
    <span
      className={cn('mdt-inaction', wrapperClassName)}
      title={disabled ? disabledReason : undefined}
    >
      <button
        ref={setRefs}
        type="button"
        className={cn('mdt-inaction__btn', copied && 'mdt-inaction__btn--done', className)}
        style={width === undefined ? style : { ...style, width }}
        disabled={disabled}
        {...(isCopy
          ? { title: copied ? copiedLabel : typeof children === 'string' ? children : undefined }
          : {})}
        {...rest}
        onClick={handleClick}
      >
        <span ref={label} className="mdt-inaction__label">
          <span
            key={`${wordKey}#${String(swaps)}`}
            className="mdt-inaction__words"
            data-swap={swaps > 0 ? '' : undefined}
          >
            {glyph ? <Icon name={glyph} size={14} aria-hidden /> : null}
            {isCopy ? <span aria-live="polite">{word}</span> : word}
          </span>
        </span>
      </button>
    </span>
  );
});

InputAction.displayName = 'InputAction';

export { InputAction };
