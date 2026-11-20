import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

const DEFAULTS = { category: "all", distance: "10", date: "any", q: "", view: "list" };

// Filters live in the URL so they survive refreshes and can be shared.
export function useMissionFilters() {
  const [params, setParams] = useSearchParams();

  const filters = useMemo(
    () => Object.fromEntries(Object.keys(DEFAULTS).map((key) => [key, params.get(key) ?? DEFAULTS[key]])),
    [params]
  );

  const setFilter = useCallback(
    (key, value) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value === DEFAULTS[key] || value == null) next.delete(key);
          else next.set(key, value);
          return next;
        },
        { replace: true }
      );
    },
    [setParams]
  );

  const resetFilters = useCallback(() => setParams({}, { replace: true }), [setParams]);

  const activeCount =
    (filters.category !== DEFAULTS.category) + (filters.distance !== DEFAULTS.distance) + (filters.date !== DEFAULTS.date) + Boolean(filters.q);

  return { filters, setFilter, resetFilters, activeCount };
}
