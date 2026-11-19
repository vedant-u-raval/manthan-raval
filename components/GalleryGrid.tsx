"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { useCallback, useState } from "react";
import ImageLightbox from "./ImageLightbox";
import { revealDelay } from "@/lib/motion";
import type { Photo } from "@/lib/photos";

const pad = (n: number) => String(n).padStart(2, "0");

export default function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3 lg:gap-6">
        {photos.map((photo, i) => (
          <li key={photo.src} className="mb-5 break-inside-avoid lg:mb-6" data-reveal style={revealDelay((i % 3) * 120)}>
            {/* A real link to the original file: crawlable by Google Images and usable without JavaScript. */}
            <a
              href={photo.src}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                e.preventDefault();
                setActive(i);
              }}
              className="group relative block overflow-hidden bg-stone"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1200px) 370px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                className="h-auto w-full transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
              />

              {/* Hairline frame that darkens on hover. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.04] transition-all duration-500 group-hover:ring-black/10"
              />

              {/* Expand icon */}
              <span
                aria-hidden="true"
                className="absolute right-4 top-4 flex h-10 w-10 -translate-y-2 items-center justify-center bg-white text-ink opacity-0 transition-all duration-500 ease-soft group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
              >
                <Maximize2 size={15} strokeWidth={1.5} />
              </span>

              {/* Caption bar slides up on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between gap-4 bg-white/95 px-5 py-4 backdrop-blur-sm transition-transform duration-500 ease-soft group-hover:translate-y-0 group-focus-visible:translate-y-0"
              >
                <span className="truncate text-[0.7rem] uppercase tracking-[0.16em] text-ink">View photograph</span>
                <span className="font-serif text-base text-accent">{pad(i + 1)}</span>
              </span>
              <span className="sr-only">Open larger view</span>
            </a>
          </li>
        ))}
      </ul>

      <ImageLightbox photos={photos} index={active} onChange={setActive} onClose={close} />
    </>
  );
}
