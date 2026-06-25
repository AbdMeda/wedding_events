import { SiteFrame } from "@/components/site-frame";
import { SectionHeader } from "@/components/ui";
import { VendorExplorer } from "@/components/interactive/explorers";

export default function VendorsPage() {
  return (
    <SiteFrame>
      <section className="section-shell champagne-gradient">
        <SectionHeader
          eyebrow="Vendor Atelier"
          title="Creative partners with taste, temperament, and beautiful follow-through."
          copy="Browse a vetted circle of photographers, florists, caterers, musicians, beauty teams, lighting designers, cake artists, and planners."
        />
      </section>
      <VendorExplorer />
    </SiteFrame>
  );
}
