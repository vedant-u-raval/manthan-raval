import GalleryGrid from "./GalleryGrid";
import PhotoPlaceholder from "./PhotoPlaceholder";
import SectionHeading from "./SectionHeading";
import { revealDelay } from "@/lib/motion";
import { getGalleryPhotos } from "@/lib/photos";
import { siteConfig } from "@/lib/site-config";

// Varied ratios so the placeholder grid previews the final editorial layout.
const PLACEHOLDER_RATIOS = ["aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]", "aspect-[4/3]"];

export default function Gallery() {
  const photos = getGalleryPhotos();

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="section-pad border-b border-line">
      <div className="container-site">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading index="03" label="Gallery" title="Selected Photographs" id="gallery-heading" />
          <div className="sm:text-right" data-reveal style={revealDelay(200)}>
            {photos.length > 0 && (
              <p className="font-serif text-5xl leading-none text-ink">
                {String(photos.length).padStart(2, "0")}
                <span className="ml-2 align-top font-sans text-[0.65rem] uppercase tracking-label text-muted">Photos</span>
              </p>
            )}
            <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-muted sm:ml-auto">
              Photographs of {siteConfig.name}, {siteConfig.profession.toLowerCase()} in {siteConfig.location.city},{" "}
              {siteConfig.location.region}.
            </p>
          </div>
        </div>

        <div aria-hidden="true" className="mt-12 h-px bg-line" data-reveal="line" />

        <div className="mt-12 sm:mt-14">
          {photos.length > 0 ? (
            <GalleryGrid photos={photos} />
          ) : (
            <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3" aria-hidden="true">
              {PLACEHOLDER_RATIOS.map((ratio, i) => (
                <li key={i} className="mb-5 break-inside-avoid">
                  <PhotoPlaceholder size="sm" className={`w-full ${ratio}`} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
