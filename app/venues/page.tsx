import { PageHero } from "@/components/layout/page-hero";
import { SiteFrame } from "@/components/site-frame";
import { VenueExplorer } from "@/components/interactive/explorers";
import { heroImages } from "@/lib/data";

export default function VenuesPage() {
  return (
    <SiteFrame>
      <PageHero
        image={heroImages.venues}
        imageAlt="A luxury estate prepared for a wedding"
        imageOpacityClassName="opacity-35"
        eyebrow="The Venue Collection"
        title="Find the place that already knows how your celebration should feel."
        copy="Filter by destination, style, guest count, and atmosphere. Each venue is selected for emotional presence and operational readiness."
      />
      <VenueExplorer />
    </SiteFrame>
  );
}
