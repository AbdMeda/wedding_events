import Link from "next/link";
import { Check, Crown, Sparkles } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { SectionHeader, Reveal } from "@/components/ui";
import { PackageComparison } from "@/components/interactive/package-comparison";
import { packages } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function PackagesPage() {
  return (
    <SiteFrame>
      <section className="section-shell hero-gradient text-ivory-50">
        <SectionHeader
          tone="dark"
          eyebrow="Our Packages"
          title="Planning support scaled to the ambition of your celebration."
          copy="From intimate vows to estate transformations, each engagement is guided by taste, operational control, and generous hospitality."
        />
      </section>
      <section className="section-shell bg-ivory-100">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {packages.map((tier) => (
            <Reveal key={tier.id}>
              <article className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 shadow-warm ${tier.featured ? "border-champagne-400 bg-soft-black text-ivory-50 shadow-gold-lg xl:-translate-y-4" : "border-ivory-300 bg-pearl-white"}`}>
                {tier.featured ? (
                  <>
                    <div className="absolute inset-x-0 top-0 h-1 gold-gradient" />
                    <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-champagne-400/25" />
                  </>
                ) : null}
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-champagne-400/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-champagne-600">
                    {tier.badge}
                  </span>
                  {tier.featured ? <Crown className="text-champagne-400" /> : <Sparkles className="text-champagne-500" />}
                </div>
                <h2 className="mt-7 font-display text-5xl font-semibold">{tier.name}</h2>
                <p className={`mt-3 font-accent text-xl italic ${tier.featured ? "text-ivory-300" : "text-warm-gray"}`}>{tier.tagline}</p>
                <p className="mt-8 text-4xl font-bold text-champagne-600">From {formatCurrency(tier.price)}</p>
                <p className={`mt-5 text-sm leading-7 ${tier.featured ? "text-ivory-300" : "text-warm-gray"}`}>{tier.bestFor}</p>
                <div className="my-8 h-px gold-gradient" />
                <ul className="grid gap-3 text-sm">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check className="mt-0.5 shrink-0 text-champagne-500" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-champagne-400/20 pt-6">
                  <p className={`text-xs uppercase tracking-[0.18em] ${tier.featured ? "text-ivory-300" : "text-muted-stone"}`}>Not included</p>
                  <p className={`mt-2 text-sm ${tier.featured ? "text-ivory-300" : "text-warm-gray"}`}>{tier.excludes.join(", ")}</p>
                </div>
                <Link href="/contact" className="luxury-button mt-auto">
                  Enquire About This Package
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <PackageComparison />
    </SiteFrame>
  );
}
