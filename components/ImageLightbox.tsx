"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Photo } from "@/lib/photos";

type Props = {
  photos: Photo[];
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Full-screen photo viewer built on the native <dialog> element, which gives
 * focus trapping, Escape-to-close and focus restoration for free.
 * Keyboard: ← / → to navigate, Esc to close. Touch: swipe left / right.
 */
export default function ImageLightbox({ photos, index, onChange, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const isOpen = index !== null;
  const count = photos.length;

  // Open / close the native dialog and lock page scroll while open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
    if (!isOpen) document.documentElement.style.overflow = "";
  }, [isOpen]);

  useEffect(() => () => void (document.documentElement.style.overflow = ""), []);

  // Keep the active thumbnail in view.
  useEffect(() => {
    if (index === null) return;
    thumbsRef.current
      ?.querySelector<HTMLElement>(`[data-thumb="${index}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  const go = (delta: number) => {
    if (index === null || count < 2) return;
    onChange((index + delta + count) % count);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  const photo = index !== null ? photos[index] : null;
  const next = index !== null && count > 1 ? photos[(index + 1) % count] : null;

  return (
    <dialog
      ref={dialogRef}
      aria-label="Photo viewer"
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        // Clicking empty space (not the photo or controls) closes the viewer.
        if (e.target === e.currentTarget || (e.target as HTMLElement).dataset.backdrop === "true") onClose();
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-white p-0 text-ink backdrop:bg-white/70 backdrop:backdrop-blur-sm open:flex open:animate-zoom-in open:flex-col"
    >
      {photo && index !== null && (
        <>
          {/* Top bar */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5 sm:h-20 sm:px-8">
            <p className="flex items-center gap-4 font-serif text-lg tabular-nums text-muted" aria-live="polite">
              <span>
                <span className="text-ink">{pad(index + 1)}</span>
                <span className="mx-2 text-line">/</span>
                {pad(count)}
              </span>
              {/* Progress through the set */}
              <span aria-hidden="true" className="hidden h-px w-24 bg-line sm:block">
                <span
                  className="block h-full origin-left bg-accent transition-transform duration-500 ease-soft"
                  style={{ transform: `scaleX(${(index + 1) / count})` }}
                />
              </span>
            </p>
            <button
              type="button"
              autoFocus
              onClick={onClose}
              aria-label="Close photo viewer"
              className="group -mr-2 inline-flex h-11 w-11 items-center justify-center text-ink"
            >
              <X size={24} strokeWidth={1.25} className="transition-transform duration-500 ease-soft group-hover:rotate-90" />
            </button>
          </div>

          {/* Photo */}
          <div data-backdrop="true" className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-4 sm:px-24 sm:py-6">
            <div data-backdrop="true" className="relative h-full w-full">
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                fill
                quality={85}
                sizes="100vw"
                className="animate-zoom-in object-contain"
              />
            </div>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous photo"
                  className="group absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-line bg-white text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white sm:inline-flex lg:left-8"
                >
                  <ChevronLeft size={22} strokeWidth={1.25} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next photo"
                  className="group absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-line bg-white text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white sm:inline-flex lg:right-8"
                >
                  <ChevronRight size={22} strokeWidth={1.25} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </>
            )}
          </div>

          {/* Caption + controls */}
          <div className="shrink-0 border-t border-line px-5 py-4 sm:px-8">
            <div className="flex items-center justify-between gap-4 sm:justify-center">
              {count > 1 && (
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous photo"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-line sm:hidden"
                >
                  <ChevronLeft size={20} strokeWidth={1.25} />
                </button>
              )}
              <p key={photo.src} className="animate-fade text-center text-sm leading-relaxed text-muted">
                {photo.caption ?? photo.alt}
              </p>
              {count > 1 && (
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next photo"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-line sm:hidden"
                >
                  <ChevronRight size={20} strokeWidth={1.25} />
                </button>
              )}
            </div>

            {/* Thumbnail strip (tablet and up) */}
            {count > 1 && (
              <div ref={thumbsRef} className="mt-4 hidden justify-center gap-2 overflow-x-auto pb-1 sm:flex">
                {photos.map((p, i) => (
                  <button
                    key={p.src}
                    type="button"
                    data-thumb={i}
                    onClick={() => onChange(i)}
                    aria-label={`Show photo ${i + 1} of ${count}`}
                    aria-current={i === index ? "true" : undefined}
                    className={`relative h-14 w-12 shrink-0 overflow-hidden bg-stone transition-all duration-300 ${
                      i === index ? "opacity-100 ring-1 ring-ink ring-offset-2" : "opacity-45 hover:opacity-100"
                    }`}
                  >
                    <Image src={p.src} alt="" fill sizes="48px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Warm the next image so navigation feels instant. */}
          {next && (
            <div className="hidden" aria-hidden="true">
              <Image src={next.src} alt="" width={next.width} height={next.height} sizes="100vw" quality={85} loading="eager" />
            </div>
          )}
        </>
      )}
    </dialog>
  );
}
