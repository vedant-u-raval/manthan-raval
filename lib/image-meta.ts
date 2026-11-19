/**
 * Build-time image metadata (server only — uses the filesystem).
 *
 * Reads the pixel dimensions of photographs in /public directly from the file
 * header (JPEG, PNG, WebP), so photos can be added without typing their sizes
 * and Next.js can reserve the exact space for them (no layout shift).
 * Missing files return `null`, so the site never renders a broken image.
 */
import fs from "node:fs";
import path from "node:path";

export type ImageMeta = { width: number; height: number };

const cache = new Map<string, ImageMeta | null>();
const warned = new Set<string>();

export function getImageMeta(publicSrc: string): ImageMeta | null {
  if (cache.has(publicSrc)) return cache.get(publicSrc)!;

  const filePath = path.join(process.cwd(), "public", publicSrc.replace(/^\/+/, ""));
  let meta: ImageMeta | null = null;

  try {
    const fd = fs.openSync(filePath, "r");
    try {
      // 256 KB comfortably covers EXIF blocks and headers of camera photos.
      const buf = Buffer.alloc(256 * 1024);
      const bytes = fs.readSync(fd, buf, 0, buf.length, 0);
      meta = parse(buf.subarray(0, bytes));
    } finally {
      fs.closeSync(fd);
    }
    if (!meta) console.warn(`[images] Unsupported or unreadable image format: public${publicSrc}`);
  } catch {
    if (!warned.has(publicSrc)) {
      warned.add(publicSrc);
      console.warn(`[images] Not found, skipping: public${publicSrc}`);
    }
  }

  cache.set(publicSrc, meta);
  return meta;
}

function parse(b: Buffer): ImageMeta | null {
  // PNG
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) {
    return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  }
  // WebP
  if (b.length > 30 && b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    const chunk = b.toString("ascii", 12, 16);
    if (chunk === "VP8 ") return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const bits = b.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (chunk === "VP8X") return { width: b.readUIntLE(24, 3) + 1, height: b.readUIntLE(27, 3) + 1 };
    return null;
  }
  // JPEG
  if (b.length > 4 && b[0] === 0xff && b[1] === 0xd8) return parseJpeg(b);
  return null;
}

function parseJpeg(b: Buffer): ImageMeta | null {
  let offset = 2;
  let orientation = 1;

  while (offset + 9 < b.length) {
    if (b[offset] !== 0xff) {
      offset++;
      continue;
    }
    const marker = b[offset + 1];
    if (marker === 0xff) {
      offset++;
      continue;
    }
    const length = b.readUInt16BE(offset + 2);

    // APP1 / EXIF — capture orientation so rotated phone photos get correct dimensions.
    if (marker === 0xe1 && b.toString("ascii", offset + 4, offset + 8) === "Exif") {
      orientation = readExifOrientation(b, offset + 10) ?? orientation;
    }

    // SOFn markers (excluding DHT 0xC4, JPG 0xC8, DAC 0xCC) carry the frame size.
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      const height = b.readUInt16BE(offset + 5);
      const width = b.readUInt16BE(offset + 7);
      // Orientations 5–8 are rotated 90°, so displayed width/height swap.
      return orientation >= 5 ? { width: height, height: width } : { width, height };
    }
    offset += 2 + length;
  }
  return null;
}

function readExifOrientation(b: Buffer, tiff: number): number | null {
  if (tiff + 8 > b.length) return null;
  const little = b.toString("ascii", tiff, tiff + 2) === "II";
  const u16 = (o: number) => (little ? b.readUInt16LE(o) : b.readUInt16BE(o));
  const u32 = (o: number) => (little ? b.readUInt32LE(o) : b.readUInt32BE(o));

  const ifd = tiff + u32(tiff + 4);
  if (ifd + 2 > b.length) return null;
  const entries = u16(ifd);
  for (let i = 0; i < entries; i++) {
    const entry = ifd + 2 + i * 12;
    if (entry + 12 > b.length) return null;
    if (u16(entry) === 0x0112) return u16(entry + 8);
  }
  return null;
}
