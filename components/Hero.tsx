import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import PhotoPlaceholder from "./PhotoPlaceholder";
import { animDelay } from "@/lib/motion";
import { getProfilePhoto } from "@/lib/photos";
import { siteConfig } from "@/lib/site-config";

/**
 * Hero entrance uses pure CSS animations (no JavaScript), staggered with
 * small delays. The portrait is revealed by a white "curtain" lifting away,
 * so the photo itself paints immediately (good for LCP).
 */
export default function Hero() {
  const photo = getProfilePhoto();
  const { location } = siteConfig;

  return (
    <section id="home" aria-labelledby="hero-heading" className="relative overflow-hidden border-b border-line">
      <div className="container-site grid items-center gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-16 lg:pb-28 lg:pt-24">
        {/* Text */}
        <div className="lg:col-span-7">
          <p className="eyebrow flex animate-rise items-center gap-4" style={animDelay(100)}>
            <span aria-hidden="true" className="h-px w-10 origin-left animate-line bg-accent" style={animDelay(300)} />
            {siteConfig.profession} · {location.city}, {location.region}
          </p>

          <h1
            id="hero-heading"
            className="mt-8 font-serif text-[3.5rem] font-medium leading-[0.92] tracking-[-0.015em] text-ink sm:text-7xl lg:text-[5.75rem]"
          >
            <span className="block overflow-hidden pb-1">
              <span className="block animate-rise" style={animDelay(200)}>
                {siteConfig.givenName}
              </span>
            </span>{" "}
            <span className="block overflow-hidden pb-2">
              <span className="block animate-rise" style={animDelay(320)}>
                {siteConfig.familyName}
              </span>
            </span>
          </h1>

          <div className="mt-6 animate-rise" style={animDelay(460)}>
            <div className="flex items-center gap-5">
              <p className="font-serif text-2xl italic text-muted sm:text-[1.75rem]">{siteConfig.profession}</p>
              <span aria-hidden="true" className="h-px flex-1 bg-line sm:max-w-[8rem]" />
            </div>
            <p className="mt-2 text-[0.78rem] font-medium uppercase tracking-[0.2em] text-ink/80">{siteConfig.court}</p>
          </div>

          <p className="mt-8 max-w-xl animate-rise text-[1.0625rem] leading-[1.85] text-muted" style={animDelay(560)}>
            {siteConfig.heroDescription}
          </p>

          <div className="mt-11 flex animate-rise flex-col gap-3 sm:flex-row sm:gap-4" style={animDelay(680)}>
            <a href="#about" className="btn-primary">
              Explore Profile
              <ArrowDown size={15} strokeWidth={1.5} aria-hidden="true" className="btn-icon" />
            </a>
            <a href={siteConfig.social.instagram.url} target="_blank" rel="noopener noreferrer me" className="btn-secondary">
              <InstagramIcon size={16} />
              Connect on Instagram
              <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" className="btn-icon" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          {/* Scroll cue */}
          <a
            href="#about"
            aria-hidden="true"
            tabIndex={-1}
            className="mt-16 hidden animate-fade items-center gap-4 text-[0.68rem] uppercase tracking-label text-muted transition-colors hover:text-ink lg:inline-flex"
            style={animDelay(1100)}
          >
            <span className="relative h-10 w-px overflow-hidden bg-line">
              <span className="absolute inset-0 animate-scrollcue bg-ink" />
            </span>
            Scroll to explore
          </a>
        </div>

        {/* Portrait */}
        <div className="lg:col-span-5">
          <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative">
              {/* Thin offset frame — a quiet editorial detail. */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-4 hidden h-full w-full animate-fade border border-line sm:block"
                style={animDelay(900)}
              />
              <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                {photo ? (
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    preload
                    fetchPriority="high"
                    quality={85}
                    sizes="(min-width: 1200px) 440px, (min-width: 1024px) 38vw, (min-width: 640px) 448px, 100vw"
                    className="animate-settle object-cover object-[50%_25%]"
                  />
                ) : (
                  <PhotoPlaceholder className="h-full w-full" />
                )}
                {/* Curtain */}
                <div aria-hidden="true" className="absolute inset-0 origin-top animate-curtain bg-white" />
              </div>

              {/* Vertical location label */}
              <p
                aria-hidden="true"
                className="absolute -left-10 bottom-0 hidden origin-bottom-left -rotate-90 animate-fade whitespace-nowrap text-[0.65rem] uppercase tracking-label text-muted xl:block"
                style={animDelay(1100)}
              >
                {location.city} · {location.region} · {location.country}
              </p>
            </div>

            <figcaption
              className="mt-8 flex animate-fade items-center justify-between text-[0.68rem] uppercase tracking-label text-muted"
              style={animDelay(1000)}
            >
              <span>{siteConfig.name}</span>
              <span className="h-px flex-1 mx-5 bg-line" aria-hidden="true" />
              <span>
                {location.city}, {location.region}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
