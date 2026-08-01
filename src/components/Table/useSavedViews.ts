import { useCallback, useMemo, useRef, useState } from 'react';

/**
 * One saved view: a name, and whatever state the table decided a view is.
 *
 * The state is opaque here on purpose. This hook holds a list and works out
 * whether the live table still matches the one you picked - it has no opinion
 * about what a view contains, so a product can save a page size, a grouping or
 * a chart mode alongside the columns without this file knowing.
 */
export interface TableView<State> {
  /** Stable across renames, because a rename must not orphan the active view. */
  id: string;

  /** What the switcher shows. Not unique - see `saveAs`. */
  name: string;

  /** The state to put the table back into. */
  state: State;
}

export interface UseSavedViewsOptions<State> {
  /**
   * The views to start with. Captured once, like every other Table hook.
   *
   * Load these from wherever they live - `localStorage`, an API, a URL - and
   * pass them in. Nothing here reads or writes storage: a hook that owned
   * `localStorage` would be unusable for the product whose views are shared
   * between colleagues, which is most of the reason to have saved views.
   */
  initial?: TableView<State>[];

  /** Which view to start on. */
  initialActiveId?: string | null;

  /**
   * The table's live state, for working out whether it still matches.
   *
   * Pass a memoised object. It is compared, not stored, so a fresh object every
   * render costs a comparison rather than a re-render.
   */
  current: State;

  /**
   * How to tell two states apart. Defaults to a JSON comparison.
   *
   * The default is honest about its limits: it is key-order sensitive, so it
   * works because both sides are built by the same code. A state holding a
   * `Map`, a `Set` or a `Date` needs its own comparison - hence this escape
   * hatch rather than a cleverer default that fails silently.
   */
  isSame?: (left: State, right: State) => boolean;

  /**
   * Called whenever the list changes - saved, renamed, deleted.
   *
   * Where persistence happens. It reports the whole list rather than the
   * change, because every backing store this has to serve wants to write the
   * whole list anyway.
   */
  onChange?: (views: TableView<State>[]) => void;
}

export interface UseSavedViews<State> {
  /** Every saved view, in the order they were created. */
  views: TableView<State>[];

  /** The view being looked at, or `null` for none. */
  active: TableView<State> | null;
  activeId: string | null;

  /**
   * Whether the table has been changed since the active view was applied.
   *
   * Computed by comparing, not by a flag set on every change. A flag says
   * "unsaved" after you sort by a column and sort back again, which teaches
   * people to ignore the marker.
   *
   * Always `false` with no active view: with nothing to differ from, every
   * table would open dirty.
   */
  dirty: boolean;

  /**
   * Makes a view active and hands back the state to put the table into.
   *
   * It returns the state rather than applying it because the live state lives
   * in three other hooks - columns, sort, filters - and this one cannot reach
   * them. `null` for an id that is not there.
   */
  apply: (id: string) => State | null;

  /** Overwrites the active view with the live state. Does nothing without one. */
  save: () => void;

  /**
   * Saves the live state as a new view and makes it active.
   *
   * Names are not forced to be unique. Two views called "Mine" is a mess, but
   * it is the product's mess to prevent or allow - a hook that silently
   * renamed the second one to "Mine (2)" would be making a copy decision on
   * behalf of four products in three languages.
   */
  saveAs: (name: string) => TableView<State>;

  /** Renames one view. An empty name is ignored rather than saved. */
  rename: (id: string, name: string) => void;

  /**
   * Deletes one view.
   *
   * Deleting the active one leaves nothing active rather than moving to a
   * neighbour: the table you are looking at is unchanged by the delete, and
   * jumping it to another view would rearrange the screen as a side effect of
   * tidying a list.
   */
  remove: (id: string) => void;

  /** The active view's state again, for discarding changes. `null` if none. */
  reset: () => State | null;

  /** Leaves the current view without changing the table. */
  clearActive: () => void;
}

const sameByJson = <State>(left: State, right: State): boolean =>
  JSON.stringify(left) === JSON.stringify(right);

/**
 * Holds a table's saved views.
 *
 * A view is a name for a table you have set up - the columns you kept, the sort
 * you chose, the filters you applied - so you can get back to it tomorrow
 * without doing it again. It is the payoff for everything in 5a to 5f: each of
 * those controls already reports its state, and this is what makes that state
 * worth something.
 *
 * Like the rest of Table, **it holds state and never touches your rows**, and
 * it does not persist anything either. Pass `initial` in and write `onChange`
 * out; where they go is the product's decision, and the interesting ones -
 * views shared with a team, views in a URL - are impossible for a hook that
 * assumed `localStorage`.
 *
 * @example
 * ```tsx
 * const current = useMemo(() => ({ columns: cols.state, sort: sort.rules }), [cols.state, sort.rules]);
 * const views = useSavedViews({ current, initial: stored });
 *
 * // Applying one:
 * const next = views.apply(id);
 * if (next) {
 *   cols.restore(next.columns);
 *   sort.restore(next.sort);
 * }
 * ```
 */
export function useSavedViews<State>({
  initial = [],
  initialActiveId = null,
  current,
  isSame = sameByJson,
  onChange,
}: UseSavedViewsOptions<State>): UseSavedViews<State> {
  const [start] = useState<TableView<State>[]>(initial);
  const [views, setViews] = useState<TableView<State>[]>(start);
  const [activeId, setActiveId] = useState<string | null>(initialActiveId);

  // A counter rather than a random id: this runs on a server as happily as in a
  // browser, the ids read the same in a test as in production, and nothing here
  // needs an id to be unguessable.
  const nextId = useRef(start.length + 1);
  const mintId = useCallback(() => {
    const id = `view-${String(nextId.current)}`;
    nextId.current += 1;
    return id;
  }, []);

  // Every write goes through here, so `onChange` cannot be forgotten on one of
  // them - which is how a product ends up with renames that persist and deletes
  // that come back on reload.
  const write = useCallback(
    (next: TableView<State>[]) => {
      setViews(next);
      onChange?.(next);
    },
    [onChange]
  );

  const active = useMemo(
    () => views.find((view) => view.id === activeId) ?? null,
    [views, activeId]
  );

  const dirty = useMemo(
    () => (active === null ? false : !isSame(active.state, current)),
    [active, current, isSame]
  );

  const apply = useCallback(
    (id: string) => {
      const view = views.find((item) => item.id === id);
      if (view === undefined) return null;
      setActiveId(id);
      return view.state;
    },
    [views]
  );

  const save = useCallback(() => {
    if (activeId === null) return;
    write(views.map((view) => (view.id === activeId ? { ...view, state: current } : view)));
  }, [activeId, views, current, write]);

  const saveAs = useCallback(
    (name: string) => {
      const view: TableView<State> = { id: mintId(), name, state: current };
      write([...views, view]);
      setActiveId(view.id);
      return view;
    },
    [mintId, current, views, write]
  );

  const rename = useCallback(
    (id: string, name: string) => {
      // An empty name leaves a row nobody can click on by mistake and nobody
      // can identify either.
      if (name.trim() === '') return;
      write(views.map((view) => (view.id === id ? { ...view, name } : view)));
    },
    [views, write]
  );

  const remove = useCallback(
    (id: string) => {
      write(views.filter((view) => view.id !== id));
      setActiveId((prev) => (prev === id ? null : prev));
    },
    [views, write]
  );

  const reset = useCallback(() => active?.state ?? null, [active]);

  const clearActive = useCallback(() => {
    setActiveId(null);
  }, []);

  return {
    views,
    active,
    activeId,
    dirty,
    apply,
    save,
    saveAs,
    rename,
    remove,
    reset,
    clearActive,
  };
}
