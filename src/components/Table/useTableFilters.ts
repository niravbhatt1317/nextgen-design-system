import { useCallback, useMemo, useState } from 'react';

/**
 * One filter: an attribute, and the values chosen for it.
 *
 * Values are a list because "status is Open **or** In Process" is the common
 * case, and a single-value shape would force a product to choose between
 * modelling it as several filters on the same attribute or not at all.
 */
export interface TableFilter<K extends string = string> {
  attribute: K;
  values: string[];
}

export interface UseTableFiltersOptions<K extends string = string> {
  /** Where the table starts out. Captured once. */
  initial?: TableFilter<K>[];
}

export interface UseTableFilters<K extends string = string> {
  /** Every active filter, in the order they were added. */
  filters: TableFilter<K>[];

  /** The values chosen for one attribute, or an empty list. */
  valuesFor: (attribute: K) => string[];

  /** Whether an attribute is filtered at all. */
  isFiltered: (attribute: K) => boolean;

  /**
   * Adds or removes one value.
   *
   * Removing the last value drops the filter rather than leaving it empty: an
   * attribute filtered to nothing matches everything, so keeping it would show
   * a chip that does not do anything.
   */
  toggleValue: (attribute: K, value: string) => void;

  /** Replaces every value for one attribute. */
  setValues: (attribute: K, values: string[]) => void;

  /** Drops one attribute's filter entirely. */
  remove: (attribute: K) => void;

  /** Drops everything. */
  clear: () => void;

  /** How many attributes are filtered. Not how many values. */
  count: number;

  /** Whether anything is filtered. */
  isActive: boolean;
}

/**
 * Holds which filters are applied.
 *
 * As with the rest of Table it **holds state and never touches your rows**. It
 * reports "status is Open or In Process, assignee is Ada"; turning that into a
 * predicate or a query string is the product's business, and a table backed by
 * a server could not work any other way.
 *
 * It deliberately stops at attribute-and-values. Operators - is, is not,
 * contains, before, between - are a query builder, which is a feature in its
 * own right rather than a table control, and building half of one here would
 * settle its shape by accident.
 *
 * @example
 * ```tsx
 * const filters = useTableFilters<ColumnKey>();
 * filters.toggleValue('status', 'Open');
 * // filters.filters -> [{ attribute: 'status', values: ['Open'] }]
 * ```
 */
export function useTableFilters<K extends string>({
  initial = [],
}: UseTableFiltersOptions<K> = {}): UseTableFilters<K> {
  const [start] = useState<TableFilter<K>[]>(initial);
  const [filters, setFilters] = useState<TableFilter<K>[]>(start);

  const valuesFor = useCallback(
    (attribute: K) => filters.find((filter) => filter.attribute === attribute)?.values ?? [],
    [filters]
  );

  const isFiltered = useCallback(
    (attribute: K) => filters.some((filter) => filter.attribute === attribute),
    [filters]
  );

  const setValues = useCallback((attribute: K, values: string[]) => {
    setFilters((prev) => {
      const rest = prev.filter((filter) => filter.attribute !== attribute);
      // An attribute filtered to nothing matches everything, so it is not a
      // filter - it is a chip that does not do anything.
      if (values.length === 0) return rest;
      const existing = prev.find((filter) => filter.attribute === attribute);
      // Kept in place when it already exists: a filter jumping to the end of
      // the row because you changed one of its values is a small nonsense.
      if (!existing) return [...prev, { attribute, values }];
      return prev.map((filter) =>
        filter.attribute === attribute ? { attribute, values } : filter
      );
    });
  }, []);

  const toggleValue = useCallback((attribute: K, value: string) => {
    setFilters((prev) => {
      const existing = prev.find((filter) => filter.attribute === attribute);
      const next =
        existing === undefined
          ? [value]
          : existing.values.includes(value)
            ? existing.values.filter((v) => v !== value)
            : [...existing.values, value];

      const rest = prev.filter((filter) => filter.attribute !== attribute);
      if (next.length === 0) return rest;
      if (existing === undefined) return [...prev, { attribute, values: next }];
      return prev.map((filter) =>
        filter.attribute === attribute ? { attribute, values: next } : filter
      );
    });
  }, []);

  const remove = useCallback((attribute: K) => {
    setFilters((prev) => prev.filter((filter) => filter.attribute !== attribute));
  }, []);

  const clear = useCallback(() => {
    setFilters([]);
  }, []);

  return {
    filters,
    valuesFor,
    isFiltered,
    toggleValue,
    setValues,
    remove,
    clear,
    count: filters.length,
    isActive: useMemo(() => filters.length > 0, [filters]),
  };
}
