import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Gem, Globe2, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { Reveal, SectionHeader, VenueCard, VendorCard } from "@/components/ui";
import { heroImages, packages, testimonials, venues, vendors } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const stats = [
  ["847", "celebrations curated"],
  ["62", "private venues"],
  ["4.87", "average rating"],
  ["31", "destinations"],
];

const philosophy = [
  {
    icon: Gem,
    title: "Curated, not crowded",
    copy: "Every venue and creative partner is selected for service, atmosphere, and the rare ability to make complexity feel effortless.",
  },
  {
    icon: HeartHandshake,
    title: "Hospitality first",
    copy: "Your guests are guided with warmth from the first save-the-date to the final farewell brunch.",
  },
  {
    icon: ShieldCheck,
    title: "Calm operations",
    copy: "Budgets, timelines, approvals, and production details live in one elegant planning rhythm.",
  },
];

const signatureMoments = [
  {
    label: "01",
    title: "The first room reveal",
    copy: "Candles are lit, the musicians are in place, and your guests step into a room that feels like it has been waiting for them.",
  },
  {
    label: "02",
    title: "The guest journey",
    copy: "Welcome notes, transfers, ceremony flow, dinner pacing, and late-night comforts are handled as one continuous act of hospitality.",
  },
  {
    label: "03",
    title: "The final hour",
    copy: "The last song, the farewell car, the packed keepsakes, and the quiet relief that nothing important was left to chance.",
  },
];

export default function Home() {
  return (
    <SiteFrame>
      <section className="home-hero-stage relative  overflow-hidden hero-gradient">
        <Image
          src={heroImages.home}
          alt="A candlelit luxury wedding reception with white florals"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="home-hero-image object-cover opacity-50"
        />
        <div className="home-opening-veil pointer-events-none absolute inset-0 z-40 flex items-center justify-center bg-soft-black text-ivory-50">
          <div className="home-opening-mark text-center">
            <p className="font-display text-6xl font-semibold tracking-[0.16em] text-champagne-400 sm:text-8xl">
              M.E
            </p>
            <span className="mx-auto mt-5 block h-px w-32 gold-gradient" />
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.28em] text-ivory-300">
              Maison Eternel
            </p>
          </div>
        </div>
        <div className="home-hero-sparkles pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
          <span className="home-spark left-[14%] top-[31%]" />
          <span className="home-spark home-spark-delay left-[66%] top-[22%]" />
          <span className="home-spark home-spark-late left-[82%] top-[58%]" />
        </div>

        <div className="hero-image-phrase pointer-events-none absolute left-4 right-4 top-[25%] z-20 mx-auto max-w-5xl -translate-y-1/2 text-center text-ivory-50">
          <p className="font-script text-6xl leading-none text-champagne-400 drop-shadow-[0_6px_24px_rgba(26,23,20,0.55)] sm:text-8xl lg:text-9xl">
            A celebration written in light
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold uppercase tracking-[0.2em] text-ivory-100 drop-shadow-[0_4px_18px_rgba(26,23,20,0.7)] sm:text-base lg:text-lg">
            Bespoke weddings, curated venues, and guest moments that feel unforgettable from the first glance.
          </p>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(212,180,131,0.22),transparent_26rem),linear-gradient(90deg,rgba(26,23,20,0.92),rgba(26,23,20,0.58)_54%,rgba(26,23,20,0.18))]" />
        <div className="luxury-orbit absolute right-8 top-24 hidden h-72 w-72 rounded-full border border-champagne-400/35 lg:block" />
        <div className="luxury-orbit luxury-orbit-delay absolute right-20 top-36 hidden h-40 w-40 rounded-full border border-champagne-400/25 lg:block" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-soft-black to-transparent" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 pt-[22vh] pb-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="hero-copy-in max-w-4xl text-ivory-50">
            <span className="hero-gold-line mb-6 block h-px w-24 bg-gradient-to-r from-champagne-400 to-transparent" />
            <p className="mb-6 inline-flex items-center gap-3 rounded-full border border-champagne-400/30 bg-soft-black/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-champagne-400 backdrop-blur">
              <Sparkles size={16} /> Luxury Wedding Concierge
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.02] text-balance md:text-6xl lg:text-7xl">
              Every detail, perfectly placed.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ivory-200 md:text-lg">
              Discover extraordinary venues, assemble a world-class creative team, and plan a celebration that feels intimate even at grand scale.
            </p>
            <div className="hero-intro-note mt-4 max-w-2xl rounded-2xl border border-champagne-400/25 bg-soft-black/45 p-4 shadow-warm backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-champagne-400">
                Your celebration starts here
              </p>
              <p className="mt-1.5 text-sm leading-6 text-ivory-100 md:text-base md:leading-7">
                Share the feeling you want, the guest experience you imagine, and the kind of room you hope to walk into. Maison Eternel shapes the venue, creative team, timeline, and details around that vision.
              </p>
            </div>
            <div className="mt-5 grid max-w-2xl gap-2 text-sm leading-6 text-ivory-200 sm:grid-cols-3">
              {["Venue curation", "Vendor atelier", "Guest concierge"].map((item) => (
                <span key={item} className="hero-mini-pill rounded-full border border-champagne-400/20 bg-ivory-50/10 px-4 py-3 text-center font-semibold backdrop-blur">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/venues" className="luxury-button">
                Discover Your Venue <ArrowRight size={18} />
              </Link>
              <Link href="/planning" className="outline-button border-ivory-50/60 text-ivory-50 hover:bg-ivory-50/10">
                Begin Planning
              </Link>
            </div>
          </div>

          <Reveal delay={0.12} className="hero-luxe-card hidden lg:block">
            <div className="glass-dark relative overflow-hidden rounded-3xl p-7 text-ivory-50 shadow-warm-lg">
              <span className="absolute inset-x-0 top-0 h-px gold-gradient" />
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-champagne-400">Private Planning House</p>
              <h2 className="mt-4 font-display text-5xl font-semibold leading-none">
                Designed for the part of luxury people actually feel.
              </h2>
              <p className="mt-5 text-sm leading-7 text-ivory-300">
                The calm call before a decision. The vendor who understands restraint. The guest who knows exactly where to be. The room that opens at the right second.
              </p>
              <div className="mt-8 grid gap-3">
                {["Venue shortlists with production notes", "Vendor edits by style, budget, and temperament", "Budget, guest, RSVP, and timeline tools"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-champagne-400/15 bg-ivory-50/5 p-3 text-sm text-ivory-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-champagne-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 text-center text-xs font-bold uppercase tracking-[0.22em] text-ivory-300 md:block">
          <span className="hero-scroll-cue mx-auto mb-3 block h-10 w-px bg-gradient-to-b from-champagne-400 to-transparent" />
          Scroll to enter the maison
        </div>
      </section>
      <section className="overflow-hidden border-y border-champagne-400/20 bg-soft-black py-4 text-ivory-50">
        <div className="luxury-marquee flex min-w-max gap-10 text-xs font-bold uppercase tracking-[0.22em] text-champagne-400">
          {["Private venue scouting", "Guest concierge", "Creative direction", "Production clarity", "Weekend orchestration", "Vendor curation"].map((item) => (
            <span key={item} className="flex items-center gap-10">
              {item}
              <span className="h-1 w-1 rounded-full bg-champagne-400" />
            </span>
          ))}
          {["Private venue scouting", "Guest concierge", "Creative direction", "Production clarity", "Weekend orchestration", "Vendor curation"].map((item) => (
            <span key={`${item}-repeat`} className="flex items-center gap-10">
              {item}
              <span className="h-1 w-1 rounded-full bg-champagne-400" />
            </span>
          ))}
        </div>
      </section>

      <section className="section-shell bg-ivory-50">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <Reveal>
            <span className="gold-line mb-6" />
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-champagne-700">What We Actually Do</p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-tight text-balance md:text-7xl">
              We turn a beautiful idea into a celebration people can move through.
            </h2>
          </Reveal>
          <div className="grid gap-5">
            {signatureMoments.map((moment) => (
              <Reveal key={moment.title}>
                <article className="editorial-card group grid gap-5 overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:shadow-warm-lg md:grid-cols-[96px_1fr]">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-champagne-400/40 font-mono text-sm text-champagne-700">
                    <span className="absolute inset-2 rounded-full border border-champagne-400/20 transition duration-500 group-hover:scale-125 group-hover:opacity-0" />
                    {moment.label}
                  </div>
                  <div>
                    <h3 className="font-display text-4xl font-semibold">{moment.title}</h3>
                    <p className="mt-3 text-base leading-8 text-warm-gray">{moment.copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-champagne-400/20 bg-soft-black px-4 py-8 text-ivory-50">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="font-display text-5xl font-semibold text-champagne-400">{value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ivory-300">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell champagne-gradient">
        <SectionHeader
          eyebrow="The Maison Method"
          title="Luxury feels calm when every hand knows the choreography."
          copy="From first vision to final toast, the platform gives couples and planners the same rare thing: clarity without sacrificing romance."
        />
        <div className="mx-auto mt-14 grid max-w-7xl gap-6 md:grid-cols-3">
          {philosophy.map((item) => (
            <Reveal key={item.title}>
              <article className="editorial-card h-full p-8">
                <item.icon className="text-champagne-600" size={30} />
                <h3 className="mt-8 font-display text-3xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-warm-gray">{item.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell bg-ivory-50">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeader
              align="left"
              eyebrow="Venue Collection"
              title="Rooms with history. Gardens with hush. Views that do the speaking."
              copy="A private edit of destination venues chosen for service standards, production readiness, and emotional presence."
            />
            <Link href="/venues" className="outline-button shrink-0">
              View all venues <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {venues.slice(0, 3).map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell hero-gradient text-ivory-50">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <span className="gold-line mb-6" />
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-champagne-400">Creative Partners</p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-tight text-balance md:text-7xl">
              A vetted circle of artists, producers, and hosts.
            </h2>
            <p className="mt-6 text-base leading-8 text-ivory-300">
              Photographers, florists, caterers, musicians, beauty teams, lighting designers, and planners are reviewed for taste and temperament.
            </p>
            <Link href="/vendors" className="luxury-button mt-8">
              Explore Vendors
            </Link>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {vendors.slice(0, 4).map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-ivory-100">
        <SectionHeader
          eyebrow="Planning Packages"
          title="Choose the level of orchestration your celebration deserves."
          copy="Each package can be tailored, but the starting point helps you understand scale, service, and production depth."
        />
        <div className="mx-auto mt-14 grid max-w-7xl gap-6 lg:grid-cols-3">
          {packages.slice(1, 4).map((tier) => (
            <Reveal key={tier.id}>
              <article className={`relative h-full overflow-hidden rounded-2xl border p-8 shadow-warm ${tier.featured ? "border-champagne-400 bg-soft-black text-ivory-50" : "border-ivory-300 bg-pearl-white"}`}>
                {tier.featured ? <div className="absolute inset-x-0 top-0 h-1 gold-gradient" /> : null}
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-champagne-600">{tier.badge}</p>
                <h3 className="mt-4 font-display text-4xl font-semibold">{tier.name}</h3>
                <p className={`mt-3 font-accent italic ${tier.featured ? "text-ivory-300" : "text-warm-gray"}`}>{tier.tagline}</p>
                <p className="mt-8 text-4xl font-bold text-champagne-600">From {formatCurrency(tier.price)}</p>
                <p className={`mt-4 text-sm leading-7 ${tier.featured ? "text-ivory-300" : "text-warm-gray"}`}>{tier.bestFor}</p>
                <ul className="mt-8 space-y-3 text-sm">
                  {tier.includes.slice(0, 6).map((item) => (
                    <li key={item} className="flex gap-3">
                      <CalendarCheck className="mt-0.5 shrink-0 text-champagne-500" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell bg-ivory-50">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <p className="font-script text-6xl text-champagne-600">Concierge</p>
            <h2 className="mt-3 font-display text-5xl font-semibold leading-tight text-balance md:text-7xl">
              Planning tools that feel like a private atelier.
            </h2>
            <p className="mt-6 text-base leading-8 text-warm-gray">
              Budget allocation, guest list tracking, timeline planning, RSVP summaries, countdowns, and checklists live together in one quiet workspace.
            </p>
            <Link href="/planning" className="luxury-button mt-8">
              Open Planning Tools <ArrowRight size={16} />
            </Link>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="dot-field rounded-3xl border border-champagne-400/20 bg-pearl-white p-6 shadow-warm-lg">
              <div className="rounded-2xl bg-soft-black p-6 text-ivory-50">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-champagne-400">Wedding Command</span>
                  <Globe2 size={20} className="text-champagne-400" />
                </div>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {["Budget", "Guests", "Timeline"].map((label, index) => (
                    <div key={label} className="rounded-xl border border-champagne-400/15 bg-ivory-50/5 p-5">
                      <p className="text-3xl font-bold text-champagne-400">{[82, 117, 14][index]}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-ivory-300">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 h-3 overflow-hidden rounded-full bg-ivory-50/10">
                  <div className="h-full w-[68%] rounded-full gold-gradient" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell bg-soft-black text-ivory-50">
        <SectionHeader
          eyebrow="Client Notes"
          title="The feeling clients remember is ease."
          copy="A celebration can be ambitious and still feel tender. These notes are why we build for both."
          tone="dark"
        />
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-4">
          {testimonials.map((item) => (
            <Reveal key={item.name}>
              <blockquote className="glass-dark h-full rounded-2xl p-7">
                <p className="font-accent text-xl italic leading-8 text-ivory-100">“{item.quote}”</p>
                <footer className="mt-8">
                  <p className="font-semibold text-champagne-400">{item.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-ivory-400">{item.detail}</p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}
