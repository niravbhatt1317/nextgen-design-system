import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { Breadcrumb } from '../Breadcrumb';
import type {
  SheetLeaveGuard,
  SheetNavigationEntry,
  SheetNavigationProps,
  UseSheetNavigationReturn,
  SheetPageProps,
} from './Sheet.types';

const NavigationContext = createContext<UseSheetNavigationReturn | null>(null);
/** The pages' leave guards by depth - private to useSheetLeaveGuard. */
const GuardContext = createContext<Map<number, SheetLeaveGuard>>(new Map());

/** Plain words for a title, for the accessible name the trail needs. */
const words = (node: ReactNode): string =>
  typeof node === 'string' || typeof node === 'number' ? String(node) : '';

/**
 * SheetNavigation - pages inside one drawer: a side panel turns into its next
 * page in place, at the same width, under a breadcrumb of the way it came.
 * Press Edit (or a row of a list) and the drawer's content becomes that page,
 * its header shows the path ("Needs attention › Crashing modules"), and any
 * earlier step of that path goes back to it - there is no back button (Pranjal,
 * 2026-10-26, for every side drawer). Generic: any page can push any other, as
 * deep as it needs.
 *
 * Put it inside `SheetContent`; it starts over at `root` every time the drawer
 * opens, because the content unmounts when it closes. A page brings its own
 * band, body and footer; a footer every page shares (Close) can sit after the
 * pages instead. A panel written as its own drawer becomes a page of another by
 * moving its band, body and footer into a `SheetPage` - its title becomes the
 * last step of the trail.
 *
 * @example
 * <SheetContent layout="drawer" size="lg">
 *   <SheetNavigation root={{ id: 'list', title: 'Needs attention' }}>
 *     <SheetHeader><SheetTitle><SheetNavigationTitle /></SheetTitle></SheetHeader>
 *     <SheetPage id="list"><ProblemList /></SheetPage>
 *     <SheetPage id="problem"><ProblemAgents /></SheetPage>
 *   </SheetNavigation>
 * </SheetContent>
 *
 * // anywhere inside: const { push, back, backTo } = useSheetNavigation();
 * // push({ id: 'problem', title: 'Crashing modules' })
 */
const SheetNavigation = ({ root, onPageChange, children }: SheetNavigationProps) => {
  const [stack, setStack] = useState<readonly SheetNavigationEntry[]>([root]);

  const change = useCallback(
    (next: readonly SheetNavigationEntry[]) => {
      setStack(next);
      onPageChange?.(next[next.length - 1] ?? root, next);
    },
    [onPageChange, root]
  );

  const push = useCallback(
    (entry: SheetNavigationEntry) => {
      change([...stack, entry]);
    },
    [change, stack]
  );

  // what each page asks before it is left, by its place in the stack
  const guards = useRef(new Map<number, SheetLeaveGuard>());

  const backTo = useCallback(
    (depth: number, options?: { force?: boolean }) => {
      const top = stack.length - 1;
      if (depth < 0 || depth >= top) return;
      const leave = () => {
        change(stack.slice(0, depth + 1));
      };
      if (!options?.force && guards.current.get(top)?.(leave) === false) return;
      leave();
    },
    [change, stack]
  );

  const back = useCallback(
    (options?: { force?: boolean }) => {
      backTo(stack.length - 2, options);
    },
    [backTo, stack.length]
  );

  const reset = useCallback(() => {
    change([root]);
  }, [change, root]);

  const value = useMemo<UseSheetNavigationReturn>(
    () => ({
      stack,
      current: stack[stack.length - 1] ?? root,
      depth: stack.length - 1,
      push,
      back,
      backTo,
      reset,
    }),
    [stack, root, push, back, backTo, reset]
  );

  return (
    <NavigationContext.Provider value={value}>
      <GuardContext.Provider value={guards.current}>{children}</GuardContext.Provider>
    </NavigationContext.Provider>
  );
};

/**
 * useSheetNavigation - the drawer's page stack, from anywhere inside a
 * SheetNavigation: `push` a page, go `back` one, `backTo` an earlier one,
 * `reset` to the first, and read where you are (`current`, `depth`, `stack`).
 */
const useSheetNavigation = (): UseSheetNavigationReturn => {
  const value = useContext(NavigationContext);
  if (value === null) throw new Error('useSheetNavigation must be used inside a SheetNavigation.');
  return value;
};

/**
 * useSheetLeaveGuard - lets a page stop the trail or back from leaving it:
 * return `false` to stay (open "Discard unsaved changes?", say), and call the
 * `leave` it is handed once the answer is yes - it goes where the person asked,
 * one step back or straight to the first page. It guards the page it is used in,
 * and only while that page is mounted.
 *
 * @example
 * useSheetLeaveGuard((leave) => {
 *   if (!dirty) return true;
 *   setAsking(() => leave);
 *   return false;
 * });
 */
const useSheetLeaveGuard = (canLeave: SheetLeaveGuard) => {
  const { depth } = useSheetNavigation();
  const guards = useContext(GuardContext);
  const latest = useRef(canLeave);
  latest.current = canLeave;
  useEffect(() => {
    guards.set(depth, (leave) => latest.current(leave));
    return () => {
      guards.delete(depth);
    };
  }, [depth, guards]);
};

/**
 * SheetPage - one page of a SheetNavigation: its children render only while it
 * is the current page. A page brings its own SheetBand, SheetBody and SheetFooter.
 */
const SheetPage = ({ id, children }: SheetPageProps) => {
  const { current } = useSheetNavigation();
  return current.id === id ? <>{children}</> : null;
};

/**
 * SheetNavigationTitle - the header's words: the first page's title on its own,
 * and on any page after it the trail (the Breadcrumb's drawer form), every
 * earlier step a way back to that page. Put it inside SheetTitle, so the drawer
 * is named by its place ("Needs attention › Crashing modules").
 *
 * Focus follows the page: after a push it lands on the step before the last -
 * the way back one page - and on the first page again, on the title; the button
 * that was pressed has gone with its page.
 */
const SheetNavigationTitle = () => {
  const { stack, depth, backTo } = useSheetNavigation();
  const holder = useRef<HTMLSpanElement | null>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const steps = Array.from(holder.current?.querySelectorAll<HTMLElement>('button') ?? []);
    const target = steps[steps.length - 1] ?? holder.current;
    target?.focus();
  }, [depth]);

  const root = stack[0];
  const place = stack
    .map((entry) => words(entry.title))
    .filter(Boolean)
    .join(' › ');

  return (
    <span ref={holder} tabIndex={-1} className="mdt-outline-none">
      {depth === 0 ? (
        root?.title
      ) : (
        <Breadcrumb
          variant="drawer"
          items={stack.map((entry, index) => ({
            id: entry.id,
            label: entry.title,
            onSelect: () => {
              backTo(index);
            },
          }))}
          {...(place ? { 'aria-label': place } : {})}
        />
      )}
    </span>
  );
};

export { SheetNavigation, SheetPage, SheetNavigationTitle, useSheetNavigation, useSheetLeaveGuard };
