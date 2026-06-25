import { SiteFrame } from "@/components/site-frame";
import { PlanningTools } from "@/components/interactive/planning-tools";
import { SectionHeader } from "@/components/ui";

export default function PlanningPage() {
  return (
    <SiteFrame>
      <section className="section-shell champagne-gradient">
        <SectionHeader
          eyebrow="Planning Tools"
          title="Your wedding command center, softened by good taste."
          copy="Practical tools for budget clarity, guest stewardship, event timing, checklist progress, countdowns, and RSVP insight."
        />
      </section>
      <PlanningTools />
    </SiteFrame>
  );
}
