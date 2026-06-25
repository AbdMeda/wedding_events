import { ContactExperience } from "@/components/interactive/contact-form";
import { PageHero } from "@/components/layout/page-hero";
import { SiteFrame } from "@/components/site-frame";
import { heroImages } from "@/lib/data";

export default function ContactPage() {
  return (
    <SiteFrame>
      <PageHero
        image={heroImages.contact}
        imageAlt="Champagne and florals at a refined wedding table"
        eyebrow="Private Consultation"
        title="Tell us what you want the room to feel like."
        copy="Share the first details. We will help shape the venue, team, rhythm, and next decisions."
      />
      <ContactExperience />
    </SiteFrame>
  );
}
