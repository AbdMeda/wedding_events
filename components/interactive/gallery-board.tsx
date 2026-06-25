"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, Heart, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { filterGalleryItems, galleryCategories, type WithAll } from "@/lib/catalog";
import { galleryItems, palettes, type GalleryItem } from "@/lib/data";
import { cn } from "@/lib/utils";

export function GalleryBoard() {
  const [category, setCategory] = useState<WithAll<GalleryItem["category"]>>("All");
  const [palette, setPalette] = useState("All");
  const [active, setActive] = useState<GalleryItem | null>(null);
  const [saved, setSaved] = useState<string[]>([]);

  const filtered = useMemo(
    () => filterGalleryItems(galleryItems, { category, palette }),
    [category, palette],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!active || filtered.length === 0) return;
      const index = filtered.findIndex((item) => item.id === active.id);
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive(filtered[(index + 1) % filtered.length]);
      if (event.key === "ArrowLeft") setActive(filtered[(index - 1 + filtered.length) % filtered.length]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, filtered]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-wrap justify-center gap-2">
        {galleryCategories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em]",
              category === item ? "bg-soft-black text-ivory-50" : "border border-ivory-400 bg-pearl-white text-warm-gray",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-5">
        <button
          type="button"
          onClick={() => setPalette("All")}
          className={cn("editorial-card p-4 text-left", palette === "All" && "border-champagne-500 bg-champagne-500/10")}
        >
          <p className="font-display text-2xl">All Palettes</p>
          <p className="text-sm text-warm-gray">The full inspiration edit</p>
        </button>
        {palettes.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setPalette(item.name)}
            className={cn("editorial-card p-4 text-left", palette === item.name && "border-champagne-500 bg-champagne-500/10")}
          >
            <div className="flex overflow-hidden rounded-full">
              {item.swatches.map((swatch) => (
                <span key={swatch} className="h-4 flex-1" style={{ background: swatch }} />
              ))}
            </div>
            <p className="mt-3 font-semibold">{item.name}</p>
          </button>
        ))}
      </div>

      <motion.div layout className="mt-12 columns-1 gap-6 md:columns-2 xl:columns-3">
        <AnimatePresence>
          {filtered.map((item) => (
            <motion.article
              layout
              key={item.id}
              className="group relative mb-6 break-inside-avoid overflow-hidden rounded-2xl shadow-warm"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              data-image
            >
              <div className={cn("relative", item.height === "short" ? "h-64" : item.height === "medium" ? "h-96" : "h-[32rem]")}>
                <Image src={item.image} alt={item.title} fill unoptimized sizes="(min-width: 1280px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-soft-black/75 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="glass-dark rounded-xl p-4 text-ivory-50">
                    <p className="text-xs uppercase tracking-[0.18em] text-champagne-400">{item.category}</p>
                    <h3 className="mt-1 font-display text-3xl">{item.title}</h3>
                    <div className="mt-4 flex gap-2">
                      <button type="button" aria-label={`Save ${item.title}`} onClick={() => setSaved((current) => (current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id]))} className="rounded-full bg-ivory-50/15 p-3">
                        <Heart size={17} fill={saved.includes(item.id) ? "currentColor" : "none"} />
                      </button>
                      <button type="button" aria-label={`Open ${item.title}`} onClick={() => setActive(item)} className="rounded-full bg-ivory-50/15 p-3">
                        <Expand size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {active ? (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-soft-black/90 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" aria-label="Close lightbox" onClick={() => setActive(null)} className="absolute right-5 top-5 rounded-full bg-ivory-50 p-3 text-soft-black">
              <X size={20} />
            </button>
            <button type="button" aria-label="Previous image" onClick={() => move(-1)} className="absolute left-5 top-1/2 hidden rounded-full bg-ivory-50 p-3 text-soft-black md:block">
              <ChevronLeft />
            </button>
            <button type="button" aria-label="Next image" onClick={() => move(1)} className="absolute right-5 top-1/2 hidden rounded-full bg-ivory-50 p-3 text-soft-black md:block">
              <ChevronRight />
            </button>
            <motion.div className="grid max-h-[88vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-ivory-50 shadow-warm-lg lg:grid-cols-[1.4fr_0.6fr]" initial={{ scale: 0.96 }} animate={{ scale: 1 }} exit={{ scale: 0.96 }}>
              <div className="relative min-h-[55vh]">
                <Image src={active.image} alt={active.title} fill unoptimized sizes="80vw" className="object-cover" />
              </div>
              <div className="p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-champagne-700">{active.category} · {active.palette}</p>
                <h2 className="mt-4 font-display text-5xl font-semibold">{active.title}</h2>
                <p className="mt-5 text-sm leading-7 text-warm-gray">{active.description}</p>
                <button type="button" className="luxury-button mt-8">Get This Look</button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );

  function move(direction: 1 | -1) {
    if (!active || filtered.length === 0) return;
    const index = filtered.findIndex((item) => item.id === active.id);
    setActive(filtered[(index + direction + filtered.length) % filtered.length]);
  }
}
