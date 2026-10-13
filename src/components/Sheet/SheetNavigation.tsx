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
  SheetNavigationEntry,
  SheetNavigationProps,
  SheetNavigationValue,
  SheetPageProps,
} from './Sheet.types';

const NavigationContext = createContext<SheetNavigationValue | null>(null);
/** The pages' leave guards by depth - private to useSheetLeaveGuard. */
const GuardContext = createContext<Map<number, () => boolean>>(new Map());

/** Plain words for a title, for the accessible names the trail and its back button need. */
const words = (node: ReactNode): string =>
  typeof node === 'string' || typeof node === 'number' ? String(node) : '';

/**
 * SheetNavigation - pages inside one drawer: press Edit and the drawer's content
 * becomes the edit page, its header shows the path ("User management › Edit
 * details"), and back brings the previous page back. Generic: any page can push
 * any other, as deep as it needs.
 *
 * Put it inside `SheetContent`; it starts over at `root` every time the drawer
 * opens, because the content unmounts when it closes.
 *
 * @example
 * <SheetContent layout="drawer">
 *   <SheetNavigation root={{ id: 'view', title: 'User management' }}>
 *     <SheetHeader><SheetTitle><SheetNavigationTitle /></SheetTitle></SheetHeader>
 *     <SheetPage id="view"><ProfileView /></SheetPage>
 *     <SheetPage id="edit"><EditForm /></SheetPage>
 *   </SheetNavigation>
 * </SheetContent>
 *
 * // anywhere inside: const { push, back } = useSheetNavigation();
 * // push({ id: 'edit', title: 'Edit details' })
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

  // what each page asks before back leaves it, by its place in the stack
  const guards = useRef(new Map<number, () => boolean>());

  const back = useCallback(
    (options?: { force?: boolean }) => {
      const top = stack.length - 1;
      if (top < 1) return;
      if (!options?.force && guards.current.get(top)?.() === false) return;
      change(stack.slice(0, -1));
    },
    [change, stack]
  );

  const reset = useCallback(() => {
    change([root]);
  }, [change, root]);

  const value = useMemo<SheetNavigationValue>(
    () => ({
      stack,
      current: stack[stack.length - 1] ?? root,
      depth: stack.length - 1,
      push,
      back,
      reset,
    }),
    [stack, root, push, back, reset]
  );

  return (
    <NavigationContext.Provider value={value}>
      <GuardContext.Provider value={guards.current}>{children}</GuardContext.Provider>
    </NavigationContext.Provider>
  );
};

/**
 * useSheetNavigation - the drawer's page stack, from anywhere inside a
 * SheetNavigation: `push` a page, go `back`, `reset` to the first, and read
 * where you are (`current`, `depth`, `stack`).
 */
const useSheetNavigation = (): SheetNavigationValue => {
  const value = useContext(NavigationContext);
  if (value === null) throw new Error('useSheetNavigation must be used inside a SheetNavigation.');
  return value;
};

/**
 * useSheetLeaveGuard - lets a page stop back from leaving it: return `false` to
 * stay (open "Discard unsaved changes?", say), then call `back({ force: true })`
 * once the answer is yes. It guards the page it is used in, and only while that
 * page is mounted.
 *
 * @example
 * useSheetLeaveGuard(() => {
 *   if (!dirty) return true;
 *   setAsking(true);
 *   return false;
 * });
 */
const useSheetLeaveGuard = (canLeave: () => boolean) => {
  const { depth } = useSheetNavigation();
  const guards = useContext(GuardContext);
  const latest = useRef(canLeave);
  latest.current = canLeave;
  useEffect(() => {
    guards.set(depth, () => latest.current());
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
 * and on any page after it the trail with a back button (the Breadcrumb's
 * drawer form). Put it inside SheetTitle, so the drawer is named by its place.
 *
 * Focus follows the page: after a push it lands on back, after the last back on
 * the title - the button that was pressed has gone with its page.
 */
const SheetNavigationTitle = () => {
  const { stack, depth, back } = useSheetNavigation();
  const holder = useRef<HTMLSpanElement | null>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const target = holder.current?.querySelector<HTMLElement>('button') ?? holder.current;
    target?.focus();
  }, [depth]);

  const root = stack[0];
  const previous = stack[stack.length - 2];
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
          items={stack.map((entry) => ({ id: entry.id, label: entry.title }))}
          onBack={back}
          {...(words(previous?.title) ? { backLabel: `Back to ${words(previous?.title)}` } : {})}
          {...(place ? { 'aria-label': place } : {})}
        />
      )}
    </span>
  );
};

export { SheetNavigation, SheetPage, SheetNavigationTitle, useSheetNavigation, useSheetLeaveGuard };
