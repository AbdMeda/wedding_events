import { GalleryBoard } from "@/components/interactive/gallery-board";
import { PageHero } from "@/components/layout/page-hero";
import { SiteFrame } from "@/components/site-frame";
import { heroImages } from "@/lib/data";

export default function GalleryPage() {
  return (
    <SiteFrame>
      <PageHero
        image={heroImages.gallery}
        imageAlt="Wedding details and flowers"
        eyebrow="Inspiration Gallery"
        title="Find your aesthetic before you name it."
        copy="Browse ceremonies, receptions, florals, tables, gowns, venues, cakes, and small details by category or palette."
      />
      <GalleryBoard />
    </SiteFrame>
  );
}
