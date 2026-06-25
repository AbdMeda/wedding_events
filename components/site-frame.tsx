"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { gsap } from "gsap";
import {
  CalendarDays,
  ChevronRight,
  Diamond,
  Heart,
  LayoutDashboard,
  Mail,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { brand, getActiveNavLabel, getNavbarTone, navItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    damping: 28,
    mass: 0.2,
    stiffness: 190,
  });

  useEffect(() => {
    if (reducedMotion) return;
    gsap.fromTo(
      ".route-accent",
      { scaleX: 0, transformOrigin: "left center" },
      { duration: 0.75, ease: "power3.out", scaleX: 1 },
    );
    gsap.fromTo(
      ".hero-gold-line",
      { scaleX: 0, transformOrigin: "left center" },
      { delay: 0.2, duration: 0.9, ease: "power3.out", scaleX: 1, stagger: 0.08 },
    );
    gsap.fromTo(
      ".hero-luxe-card",
      { autoAlpha: 0, y: 18 },
      { delay: 0.28, autoAlpha: 1, duration: 0.8, ease: "power3.out", y: 0, stagger: 0.08 },
    );
  }, [pathname, reducedMotion]);

  const activeLabel = getActiveNavLabel(pathname);
  const navbarTone = getNavbarTone(pathname);

  return (
    <div className="min-h-screen overflow-hidden text-soft-black">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-soft-black focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-ivory-50"
      >
        Skip to main content
      </a>
      <CustomCursor />
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[90] h-1 w-full origin-left bg-gradient-to-r from-champagne-400 via-champagne-600 to-champagne-400"
        style={{ scaleX: progressScale }}
      />
      <header className="glass-navbar fixed inset-x-0 top-0 z-50" data-nav-tone={navbarTone}>
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3" aria-label="Maison Eternel home">
            <span className="navbar-monogram flex h-10 w-10 items-center justify-center rounded-full border font-display text-xl">
              {brand.monogram}
            </span>
            <span className="navbar-brand hidden font-display text-2xl font-semibold tracking-[0.12em] sm:block">
              {brand.name.toUpperCase()}
            </span>
          </Link>
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "navbar-link rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition",
                  pathname === item.href && "navbar-link-active",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/admin" className="outline-button px-4 py-3">
              <LayoutDashboard size={16} />
              Admin
            </Link>
            <Link href="/contact" className="luxury-button px-5 py-3">
              Begin
            </Link>
          </div>
          <button
            type="button"
            aria-label="Open navigation"
            className="navbar-menu-button rounded-full border p-3 lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu size={20} />
          </button>
        </nav>
        <span className="route-accent navbar-route-accent block h-px w-full" />
      </header>

      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] bg-soft-black/70 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="ml-auto flex h-full w-[min(88vw,420px)] flex-col bg-ivory-50 p-6 shadow-warm-lg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl">{brand.monogram}</span>
                <button
                  type="button"
                  aria-label="Close navigation"
                  className="rounded-full border border-ivory-400 p-3"
                  onClick={() => setOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-warm-gray">{activeLabel}</p>
              <div className="mt-10 grid gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-ivory-300 py-4 font-display text-3xl text-soft-black"
                  >
                    {item.label}
                    <ChevronRight size={18} />
                  </Link>
                ))}
              </div>
              <Link href="/admin" onClick={() => setOpen(false)} className="luxury-button mt-auto">
                Open Admin
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        id="main"
        key={pathname}
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="pt-20"
      >
        {children}
      </motion.main>

      <Footer />
    </div>
  );
}

function CustomCursor() {
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion || typeof window === "undefined" || "ontouchstart" in window) return undefined;
    const cursor = document.querySelector<HTMLElement>("[data-cursor]");
    if (!cursor) return undefined;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    const onMove = (event: MouseEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      const target = event.target as HTMLElement;
      const interactive = target.closest("a,button,[data-image]");
      cursor.dataset.mode = interactive ? "active" : "idle";
    };
    let frame = 0;
    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <div
      data-cursor
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne-500 mix-blend-difference transition-[height,width,opacity] duration-200 data-[mode=active]:h-8 data-[mode=active]:w-8 data-[mode=active]:opacity-60 lg:block"
    />
  );
}

function Footer() {
  return (
    <footer className="hero-gradient relative overflow-hidden px-4 py-16 text-ivory-50 sm:px-6 lg:px-8">
      <div className="absolute -right-20 top-10 h-64 w-64 rounded-full border border-champagne-400/20" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="gold-line mb-6" />
          <p className="font-display text-5xl font-semibold">Maison Eternel</p>
          <p className="mt-4 max-w-xl text-base leading-8 text-ivory-300">
            Luxury wedding and event curation for couples who want their celebration to feel considered, atmospheric, and unmistakably their own.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-champagne-400">
            <span className="flex items-center gap-2"><Diamond size={14} /> Est. 2024</span>
            <span className="flex items-center gap-2"><Heart size={14} /> Private Concierge</span>
            <span className="flex items-center gap-2"><Sparkles size={14} /> Global Curation</span>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="glass-dark rounded-2xl p-6">
            <CalendarDays className="text-champagne-400" size={24} />
            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-ivory-300">Consultations</p>
            <p className="mt-2 font-display text-3xl">By appointment</p>
          </div>
          <div className="glass-dark rounded-2xl p-6">
            <Mail className="text-champagne-400" size={24} />
            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-ivory-300">Concierge</p>
            <p className="mt-2 break-words font-display text-3xl">hello@maison-eternel.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
