import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

/**
 * Social-share card (WhatsApp, Facebook, LinkedIn, X…), generated at build time.
 * Includes the real profile photograph when it exists in /public.
 */
export const alt = `${siteConfig.name} — ${siteConfig.profession}, ${siteConfig.court}, ${siteConfig.location.city}, ${siteConfig.location.region}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadPortrait(): Promise<string | null> {
  const src = siteConfig.profileImage.src;
  const ext = path.extname(src).toLowerCase();
  const mime = ext === ".png" ? "image/png" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : null;
  if (!mime) return null; // the card renderer supports JPEG/PNG only
  try {
    const data = await fs.readFile(path.join(process.cwd(), "public", src.replace(/^\/+/, "")));
    return `data:${mime};base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}

async function loadSerifFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&text=${encodeURIComponent(text)}`,
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null; // fall back to the built-in font if offline
  }
}

export default async function OpenGraphImage() {
  const portrait = await loadPortrait();
  const initials = `${siteConfig.givenName[0]}${siteConfig.familyName[0]}`;
  const { city, region, country } = siteConfig.location;
  // Subset must cover every character drawn on the card.
  const serif = await loadSerifFont(`${siteConfig.name}${siteConfig.profession}${initials}${city}${region}${country}${siteConfig.court}, ·`.toUpperCase() + `${siteConfig.name}${siteConfig.profession}${city}${region}${country}, ·`);
  const serifFamily = serif ? "Cormorant" : "serif";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FFFFFF", color: "#171717" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
            borderRight: "1px solid #EAEAEA",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 18, letterSpacing: 5, color: "#737373" }}>
            <div style={{ width: 40, height: 1, background: "#8B7355" }} />
            {`${siteConfig.profession.toUpperCase()} · ${city.toUpperCase()}, ${region.toUpperCase()}`}
          </div>
          <div style={{ marginTop: 34, fontSize: 104, lineHeight: 1, fontFamily: serifFamily }}>{siteConfig.name}</div>
          <div style={{ marginTop: 22, fontSize: 40, color: "#737373", fontFamily: serifFamily }}>
            {siteConfig.profession}
          </div>
          <div style={{ marginTop: 10, fontSize: 22, letterSpacing: 4, color: "#171717" }}>{siteConfig.court.toUpperCase()}</div>
          <div style={{ marginTop: 40, fontSize: 20, color: "#737373" }}>{`${city}, ${region}, ${country}`}</div>
        </div>

        <div style={{ width: 430, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#F3F2F0" }}>
          {portrait ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={portrait} alt="" width={430} height={630} style={{ width: 430, height: 630, objectFit: "cover", objectPosition: "50% 25%" }} />
          ) : (
            <div style={{ fontSize: 120, color: "rgba(23,23,23,0.25)", fontFamily: serifFamily, letterSpacing: 8 }}>{initials}</div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: serif ? [{ name: "Cormorant", data: serif, weight: 500, style: "normal" }] : undefined,
    },
  );
}
