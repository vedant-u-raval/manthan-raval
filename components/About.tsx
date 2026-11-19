import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { revealDelay } from "@/lib/motion";
import { getPhoto } from "@/lib/photos";
import { shortLocation, siteConfig } from "@/lib/site-config";

export default function About() {
  const photo = getPhoto(siteConfig.aboutImage);

  return (
    <section id="about" aria-labelledby="about-heading" className="section-pad border-b border-line">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Photograph */}
        {photo && (
          <figure className="order-2 lg:order-1 lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden bg-stone lg:max-w-none" data-reveal="image">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1200px) 440px, (min-width: 1024px) 38vw, (min-width: 640px) 448px, 100vw"
                className="reveal-zoom object-cover object-[50%_35%]"
              />
            </div>
            <figcaption
              className="mx-auto mt-5 flex max-w-md items-center gap-4 text-[0.68rem] uppercase tracking-label text-muted lg:max-w-none"
              data-reveal="fade"
              style={revealDelay(300)}
            >
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              {shortLocation}
            </figcaption>
          </figure>
        )}

        {/* Text */}
        <div className={`order-1 lg:order-2 ${photo ? "lg:col-span-7" : "lg:col-span-12"}`}>
          <SectionHeading index="01" label="About" title={`About ${siteConfig.name}`} id="about-heading" />

          <div className="mt-10 border-l border-accent/50 pl-6 sm:pl-8">
            {siteConfig.biography.map((paragraph, i) => (
              <p
                key={i}
                data-reveal
                style={revealDelay(150 + i * 100)}
                className={
                  i === 0
                    ? "font-serif text-[1.55rem] leading-[1.5] text-ink sm:text-[1.8rem]"
                    : "mt-6 text-[1.0625rem] leading-[1.85] text-muted"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Signature block */}
          <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between" data-reveal style={revealDelay(250)}>
            <div>
              <p className="font-serif text-3xl italic text-ink">{siteConfig.name}</p>
              <p className="mt-1.5 text-[0.7rem] uppercase tracking-label text-muted">
                {siteConfig.profession} · {shortLocation}
              </p>
              <p className="mt-1 text-[0.7rem] uppercase tracking-label text-ink/80">{siteConfig.court}</p>
            </div>
            <a
              href="#gallery"
              className="group inline-flex items-center gap-3 text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ink"
            >
              <span className="link-underline">View photographs</span>
              <span className="flex h-9 w-9 items-center justify-center border border-line transition-all duration-500 ease-soft group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                <ArrowRight size={15} strokeWidth={1.5} aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
