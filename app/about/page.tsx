import Image from "next/image";
import { ArrowRight, Gem, Handshake, Sparkles } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { Reveal, SectionHeader } from "@/components/ui";
import { heroImages, team } from "@/lib/data";

const numbers = [
  ["31", "destinations"],
  ["420k", "average guest steps coordinated"],
  ["96%", "vendor rebooking rate"],
  ["24h", "concierge response window"],
];

export default function AboutPage() {
  return (
    <SiteFrame>
      <section className="relative min-h-[72vh] overflow-hidden bg-soft-black">
        <Image src={heroImages.about} alt="A refined wedding couple entering a reception" fill unoptimized priority sizes="100vw" className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-soft-black/85 via-soft-black/35 to-soft-black/15" />
        <div className="relative mx-auto flex min-h-[72vh] max-w-7xl items-end px-4 pb-20 pt-28 text-ivory-50 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-script text-7xl text-champagne-400">Our Story</p>
            <h1 className="mt-2 max-w-4xl font-display text-6xl font-semibold leading-none text-balance md:text-8xl">
              We build celebrations that feel inevitable.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="section-shell bg-ivory-50">
        <blockquote className="mx-auto max-w-5xl text-center font-accent text-3xl italic leading-relaxed text-charcoal md:text-5xl">
          “Luxury is not more. It is the quiet confidence that every choice has been made with care.”
        </blockquote>
      </section>

      <section className="section-shell champagne-gradient">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeader
              align="left"
              eyebrow="The Philosophy"
              title="Romance needs room. Operations give it that room."
              copy="Maison Eternel began as a response to a familiar tension: ambitious weddings often become noisy to plan. We built a platform and planning practice that protects taste, time, and emotion."
            />
          </Reveal>
          <Reveal delay={0.12}>
            <div className="space-y-6 text-base leading-8 text-warm-gray">
              <p>
                Our work sits between hospitality, editorial design, and production management. We look for the first impression, the small gesture, the way light meets fabric, and the minute-by-minute reality that makes the day feel effortless.
              </p>
              <p>
                Couples use Maison Eternel to discover extraordinary venues, assemble creative partners, and plan with clarity. Planners use it to see the whole celebration at once, from budget allocation to guest movement.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-soft-black px-4 py-10 text-ivory-50 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {numbers.map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="font-display text-5xl font-semibold text-champagne-400">{value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ivory-300">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell bg-ivory-50">
        <SectionHeader eyebrow="How We Work" title="A three-part rhythm for a celebration with depth." />
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            ["Curation", "We listen for the atmosphere first, then build a venue and vendor edit around it.", Gem],
            ["Planning", "Budgets, timelines, approvals, and guests move through one calm operating system.", Handshake],
            ["Celebration", "On the day, the work disappears. What remains is presence, beauty, and ease.", Sparkles],
          ].map(([title, copy, Icon]) => (
            <Reveal key={String(title)}>
              <article className="editorial-card h-full p-8">
                {typeof Icon !== "string" ? <Icon className="text-champagne-600" size={30} /> : null}
                <h3 className="mt-8 font-display text-4xl font-semibold">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-warm-gray">{copy}</p>
                <ArrowRight className="mt-8 text-champagne-600" />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell bg-ivory-100">
        <SectionHeader eyebrow="The Team" title="Tasteful, technical, and quietly relentless." />
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {team.map(([name, role, bio, image]) => (
            <Reveal key={name}>
              <article className="editorial-card overflow-hidden">
                <div className="relative h-80">
                  <Image src={image} alt={name} fill unoptimized sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="font-display text-3xl font-semibold">{name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-champagne-700">{role}</p>
                  <p className="mt-4 text-sm leading-7 text-warm-gray">{bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell hero-gradient text-ivory-50">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader align="left" tone="dark" eyebrow="Recognition" title="Trusted by private clients and hospitality partners." />
          <div className="grid gap-5 md:grid-cols-2">
            {["The Aisle Review", "Modern Hospitality", "Destination Vows", "Grand Table"].map((name) => (
              <div key={name} className="glass-dark rounded-2xl p-6">
                <p className="font-display text-3xl">{name}</p>
                <p className="mt-4 text-sm leading-7 text-ivory-300">“An unusually polished bridge between romance and operations.”</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
