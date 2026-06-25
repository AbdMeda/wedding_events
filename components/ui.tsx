"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, BadgeCheck, MapPin, Star, Users } from "lucide-react";
import type { Venue, Vendor } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  copy,
  align = "center",
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <Reveal className={cn("mx-auto max-w-3xl", align === "center" ? "text-center" : "mx-0 text-left")}>
      <span className={cn("gold-line mb-5", align === "center" && "mx-auto")} />
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-champagne-700">{eyebrow}</p>
      <h2
        className={cn(
          "mt-3 font-display text-4xl font-semibold leading-tight text-balance md:text-6xl",
          tone === "dark" ? "text-ivory-50" : "text-soft-black",
        )}
      >
        {title}
      </h2>
      {copy ? (
        <p
          className={cn(
            "mx-auto mt-5 max-w-2xl text-base leading-8 md:text-lg",
            tone === "dark" ? "text-ivory-300" : "text-warm-gray",
          )}
        >
          {copy}
        </p>
      ) : null}
    </Reveal>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-80px", once: true });
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.985, y: 28 }}
      animate={reducedMotion || inView ? { opacity: 1, scale: 1, y: 0 } : undefined}
      transition={{ delay, duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Rating({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-1 text-sm font-semibold text-champagne-800">
      <Star size={15} fill="currentColor" />
      {value.toFixed(2)}
    </span>
  );
}

export function VenueCard({ venue, compact = false }: { venue: Venue; compact?: boolean }) {
  return (
    <Reveal>
      <article className="group editorial-card overflow-hidden" data-image>
        <div className={cn("relative overflow-hidden", compact ? "h-64" : "h-80")}>
          <Image
            src={venue.image}
            alt={`${venue.name} in ${venue.location}`}
            fill
            unoptimized
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-soft-black/75 via-soft-black/5 to-transparent" />
          <div className="absolute left-5 top-5 rounded-full bg-ivory-50/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-champagne-800">
            {venue.style}
          </div>
          <div className="absolute bottom-5 left-5 right-5 text-ivory-50">
            <p className="text-sm uppercase tracking-[0.16em] text-champagne-400">{venue.location}</p>
            <h3 className="mt-2 font-display text-4xl font-semibold leading-none">{venue.name}</h3>
          </div>
        </div>
        <div className="space-y-5 p-6">
          <div className="flex items-center justify-between">
            <Rating value={venue.rating} />
            <span className="text-sm font-semibold text-champagne-800">From {formatCurrency(venue.priceFrom)}</span>
          </div>
          <p className="text-sm leading-7 text-warm-gray">{venue.description}</p>
          <div className="flex flex-wrap gap-2">
            {venue.features.slice(0, 3).map((feature) => (
              <span key={feature} className="rounded-full border border-ivory-400 px-3 py-1 text-xs text-charcoal">
                {feature}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-ivory-300 pt-5">
            <span className="flex items-center gap-2 text-sm text-warm-gray">
              <Users size={16} /> Up to {venue.capacity}
            </span>
            <Link href="/contact" className="flex items-center gap-2 text-sm font-bold text-champagne-800">
              Enquire <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <Reveal>
      <article className="editorial-card p-5">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border border-champagne-400/40">
            <Image src={vendor.avatar} alt={vendor.name} fill unoptimized sizes="64px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-display text-2xl font-semibold">{vendor.name}</h3>
              {vendor.verified ? <BadgeCheck className="shrink-0 text-champagne-600" size={18} /> : null}
            </div>
            <p className="mt-1 flex items-center gap-1 text-sm text-warm-gray">
              <MapPin size={14} /> {vendor.location}
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {vendor.portfolio.map((image, index) => (
            <div key={`${vendor.id}-${index}`} className="relative h-20 overflow-hidden rounded-lg" data-image>
              <Image src={image} alt="" fill unoptimized sizes="120px" className="object-cover" />
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-7 text-warm-gray">{vendor.description}</p>
        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-stone">{vendor.category}</p>
            <p className="font-semibold text-champagne-800">From {formatCurrency(vendor.priceFrom)}</p>
          </div>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-bold",
              vendor.accepting ? "bg-sage-100 text-success" : "bg-blush-100 text-error",
            )}
          >
            {vendor.accepting ? "Accepting" : "Limited"}
          </span>
        </div>
      </article>
    </Reveal>
  );
}
