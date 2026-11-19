/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PHOTO GALLERY
 * ─────────────────────────────────────────────────────────────────────────────
 *  To add a photograph:
 *    1. Copy the file into /public/images/ using a descriptive name,
 *       e.g. manthan-raval-patan-court.jpg
 *    2. Add one entry below. Width and height are detected automatically.
 *  To remove a photograph: delete its entry (and optionally the file).
 *  To reorder: change the order of entries.
 *
 *  Write a unique, honest `alt` for every photo describing what is actually in
 *  it — this is what Google Images and screen readers use. Avoid repeating
 *  the same sentence or stuffing keywords.
 *
 *  Entries whose file does not exist yet are skipped automatically.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type GalleryItem = {
  /** Path inside /public, e.g. "/images/manthan-raval-01.jpg" */
  src: string;
  /** Descriptive alternative text (required). */
  alt: string;
  /** Optional short caption shown in the lightbox. */
  caption?: string;
};

export const galleryItems: GalleryItem[] = [
  {
    src: "/images/manthan-raval-advocate-profile.jpg",
    alt: "Advocate Manthan Raval in black advocate robes, standing outside the High Court of Gujarat",
    caption: "Outside the High Court of Gujarat",
  },
  {
    src: "/images/manthan-raval-advocate-robes.jpg",
    alt: "Manthan Raval wearing an advocate gown over a dark blazer, in front of a building flying the Indian flag",
  },
  {
    src: "/images/manthan-raval-advocate-candid.jpg",
    alt: "Advocate Manthan Raval in robes on a phone call, with trees and gardens behind him",
  },
  {
    src: "/images/manthan-raval-patan-event.jpg",
    alt: "Manthan Raval in a white kurta and saffron stole at a community cricket event",
  },
  {
    src: "/images/manthan-raval-advocate-portrait.jpg",
    alt: "Full-length portrait of Manthan Raval in advocate robes beside a garden hedge",
  },
  {
    src: "/images/manthan-raval-patan-cricket-league.jpg",
    alt: "Manthan Raval (left) being welcomed with a bouquet at the Bhudev Box Cricket League, Patan district",
    caption: "Bhudev Box Cricket League, Patan district",
  },
];
