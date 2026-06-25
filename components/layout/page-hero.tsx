import Image from "next/image";
import { SectionHeader } from "@/components/ui";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  className?: string;
  contentClassName?: string;
  copy?: string;
  eyebrow: string;
  image?: string;
  imageAlt?: string;
  imageOpacityClassName?: string;
  overlayClassName?: string;
  priority?: boolean;
  title: string;
};

export function PageHero({
  className,
  contentClassName,
  copy,
  eyebrow,
  image,
  imageAlt = "",
  imageOpacityClassName = "opacity-40",
  overlayClassName = "bg-gradient-to-r from-soft-black via-soft-black/70 to-soft-black/20",
  priority = true,
  title,
}: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden bg-soft-black px-4 py-28 text-ivory-50 sm:px-6 lg:px-8", className)}>
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            unoptimized
            priority={priority}
            sizes="100vw"
            className={cn("object-cover", imageOpacityClassName)}
          />
          <div className={cn("absolute inset-0", overlayClassName)} />
        </>
      ) : null}
      <div className={cn("relative mx-auto max-w-7xl", contentClassName)}>
        <SectionHeader align="left" tone="dark" eyebrow={eyebrow} title={title} copy={copy} />
      </div>
    </section>
  );
}
