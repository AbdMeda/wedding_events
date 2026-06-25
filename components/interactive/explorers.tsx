"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { VendorCard, VenueCard } from "@/components/ui";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import {
  filterVendors,
  filterVenues,
  vendorCategories,
  venueRegions,
  venueStyles,
  type WithAll,
} from "@/lib/catalog";
import { venues, vendors, type Vendor, type Venue } from "@/lib/data";
import { cn } from "@/lib/utils";

export function VenueExplorer() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<WithAll<Venue["region"]>>("All");
  const [style, setStyle] = useState<WithAll<Venue["style"]>>("All");
  const [capacity, setCapacity] = useState(0);
  const debounced = useDebouncedValue(query);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setQuery("");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(
    () => filterVenues(venues, { capacity, query: debounced, region, style }),
    [capacity, debounced, region, style],
  );

  return (
    <ExplorerShell
      query={query}
      onQuery={setQuery}
      count={filtered.length}
      label="venues"
      onClear={() => {
        setQuery("");
        setRegion("All");
        setStyle("All");
        setCapacity(0);
      }}
      active={[region !== "All" ? region : null, style !== "All" ? style : null, capacity > 0 ? `${capacity}+ guests` : null]}
      filters={
        <>
          <FilterRail title="Region" items={venueRegions} value={region} onChange={setRegion} />
          <FilterRail title="Style" items={venueStyles} value={style} onChange={setStyle} />
          <div className="editorial-card p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-stone">Minimum Capacity</p>
            <input
              aria-label="Minimum capacity"
              className="mt-4 w-full accent-champagne-600"
              max={650}
              min={0}
              step={50}
              type="range"
              value={capacity}
              onChange={(event) => setCapacity(Number(event.target.value))}
            />
            <p className="mt-2 text-sm font-semibold text-champagne-800">
              {capacity === 0 ? "Any guest count" : `${capacity}+ guests`}
            </p>
          </div>
        </>
      }
    >
      <ResultGrid empty="No venues match this edit. Clear a filter to widen the collection.">
        {filtered.map((venue) => (
          <motion.div layout key={venue.id}>
            <VenueCard venue={venue} compact />
          </motion.div>
        ))}
      </ResultGrid>
    </ExplorerShell>
  );
}

export function VendorExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<WithAll<Vendor["category"]>>("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const debounced = useDebouncedValue(query);

  const filtered = useMemo(
    () => filterVendors(vendors, { category, query: debounced, verifiedOnly }),
    [category, debounced, verifiedOnly],
  );

  return (
    <ExplorerShell
      query={query}
      onQuery={setQuery}
      count={filtered.length}
      label="vendors"
      onClear={() => {
        setQuery("");
        setCategory("All");
        setVerifiedOnly(false);
      }}
      active={[category !== "All" ? category : null, verifiedOnly ? "Verified only" : null]}
      filters={
        <>
          <FilterRail title="Category" items={vendorCategories} value={category} onChange={setCategory} columns />
          <label className="editorial-card flex cursor-pointer items-center justify-between gap-4 p-5">
            <span>
              <span className="block text-xs font-bold uppercase tracking-[0.18em] text-muted-stone">Trust Signal</span>
              <span className="mt-1 block font-semibold text-soft-black">Verified partners only</span>
            </span>
            <input
              checked={verifiedOnly}
              type="checkbox"
              onChange={(event) => setVerifiedOnly(event.target.checked)}
              className="h-5 w-5 accent-champagne-600"
            />
          </label>
        </>
      }
    >
      <ResultGrid empty="No vendors match this search. Try another category or clear verification.">
        {filtered.map((vendor) => (
          <motion.div layout key={vendor.id}>
            <VendorCard vendor={vendor} />
          </motion.div>
        ))}
      </ResultGrid>
    </ExplorerShell>
  );
}

function ExplorerShell({
  children,
  query,
  onQuery,
  count,
  label,
  active,
  filters,
  onClear,
}: {
  children: React.ReactNode;
  query: string;
  onQuery: (value: string) => void;
  count: number;
  label: string;
  active: Array<string | null>;
  filters: React.ReactNode;
  onClear: () => void;
}) {
  const activeFilters = active.filter(Boolean) as string[];
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="editorial-card p-4 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-stone" size={20} />
            <input
              value={query}
              onChange={(event) => onQuery(event.target.value)}
              placeholder={`Search ${label}, locations, or atmosphere`}
              className="w-full rounded-xl border border-ivory-400 bg-ivory-50 py-4 pl-12 pr-4 text-base text-soft-black placeholder:text-muted-stone focus:border-champagne-500 focus:ring-2 focus:ring-champagne-400/20"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-soft-black px-4 py-2 text-sm font-semibold text-ivory-50">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={count}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                >
                  {count}
                </motion.span>
              </AnimatePresence>{" "}
              {label}
            </span>
            <button type="button" className="outline-button px-4 py-3" onClick={onClear}>
              <X size={16} /> Clear
            </button>
          </div>
        </div>
        {activeFilters.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <span key={filter} className="rounded-full bg-champagne-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-champagne-800">
                {filter}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-warm-gray">
            <SlidersHorizontal size={18} /> Filters
          </div>
          {filters}
        </aside>
        {children}
      </div>
    </div>
  );
}

function FilterRail<T extends string>({
  title,
  items,
  value,
  onChange,
  columns = false,
}: {
  title: string;
  items: T[];
  value: T;
  onChange: (value: T) => void;
  columns?: boolean;
}) {
  return (
    <div className="editorial-card p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-stone">{title}</p>
      <div className={cn("mt-4 grid gap-2", columns && "grid-cols-2")}>
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={cn(
              "rounded-lg px-3 py-2 text-left text-sm font-semibold transition",
              value === item ? "bg-champagne-500 text-ivory-50 shadow-gold" : "bg-ivory-50 text-warm-gray hover:bg-ivory-200",
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultGrid({ children, empty }: { children: React.ReactNode; empty: string }) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {items.length > 0 ? (
          items
        ) : (
          <motion.div
            className="editorial-card col-span-full p-10 text-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
          >
            <p className="font-display text-3xl font-semibold">A narrower edit.</p>
            <p className="mt-3 text-warm-gray">{empty}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
