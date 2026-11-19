/**
 * Resolves configured photographs against the files that actually exist in
 * /public, attaching their real dimensions. Server only.
 */
import { galleryItems } from "./gallery-data";
import { getImageMeta } from "./image-meta";
import { siteConfig } from "./site-config";

export type Photo = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

/** Resolve any single configured image ({ src, alt }) against /public. */
export function getPhoto(image: { src: string; alt: string }): Photo | null {
  const meta = getImageMeta(image.src);
  return meta ? { src: image.src, alt: image.alt, ...meta } : null;
}

export function getProfilePhoto(): Photo | null {
  return getPhoto(siteConfig.profileImage);
}

export function getGalleryPhotos(): Photo[] {
  return galleryItems.flatMap((item) => {
    const meta = getImageMeta(item.src);
    return meta ? [{ ...item, ...meta }] : [];
  });
}

/** Every real photograph on the site (profile first), de-duplicated. */
export function getAllPhotos(): Photo[] {
  const profile = getProfilePhoto();
  const all = profile ? [profile, ...getGalleryPhotos()] : getGalleryPhotos();
  return all.filter((p, i) => all.findIndex((q) => q.src === p.src) === i);
}
