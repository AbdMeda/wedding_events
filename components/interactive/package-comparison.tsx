"use client";

import { Check, X } from "lucide-react";
import { useMemo, useState } from "react";
import { packages } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";

const comparisonRows = [
  "Venue scouting",
  "Vendor negotiation",
  "Creative direction",
  "Guest concierge",
  "Travel logistics",
  "Production design",
  "Custom stationery",
  "Weekend timeline",
  "Temporary structures",
  "Security",
];

export function PackageComparison() {
  const [differencesOnly, setDifferencesOnly] = useState(false);
  const rows = useMemo(() => {
    if (!differencesOnly) return comparisonRows;
    return comparisonRows.filter((row) => packages.some((tier) => tier.includes.includes(row)) && packages.some((tier) => !tier.includes.includes(row)));
  }, [differencesOnly]);

  return (
    <section className="section-shell bg-ivory-50">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="gold-line mb-5" />
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-champagne-700">Compare Service Depth</p>
            <h2 className="mt-3 font-display text-5xl font-semibold">The difference is in the orchestration.</h2>
          </div>
          <label className="editorial-card flex w-fit cursor-pointer items-center gap-4 px-5 py-4">
            <input
              checked={differencesOnly}
              type="checkbox"
              onChange={(event) => setDifferencesOnly(event.target.checked)}
              className="h-5 w-5 accent-champagne-600"
            />
            <span className="text-sm font-semibold">Show differences only</span>
          </label>
        </div>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-ivory-300 bg-pearl-white shadow-warm">
          <table className="min-w-[980px] w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-ivory-300">
                <th className="sticky left-0 z-10 bg-pearl-white p-5 text-xs uppercase tracking-[0.18em] text-muted-stone">Feature</th>
                {packages.map((tier) => (
                  <th key={tier.id} className={cn("p-5 text-center", tier.featured && "bg-champagne-500/10")}>
                    <p className="font-display text-2xl font-semibold">{tier.name}</p>
                    <p className="mt-1 text-sm text-champagne-800">From {formatCurrency(tier.price)}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row} className="border-b border-ivory-300 last:border-0">
                  <th className="sticky left-0 z-10 bg-pearl-white p-5 text-sm font-semibold text-charcoal">{row}</th>
                  {packages.map((tier) => {
                    const included = tier.includes.includes(row);
                    return (
                      <td key={`${tier.id}-${row}`} className={cn("p-5 text-center", tier.featured && "bg-champagne-500/10")}>
                        <span
                          className={cn(
                            "mx-auto flex h-9 w-9 items-center justify-center rounded-full",
                            included ? "bg-sage-100 text-success" : "bg-blush-100 text-error",
                          )}
                        >
                          {included ? <Check size={18} /> : <X size={18} />}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
