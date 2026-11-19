# Manthan Raval — Official Website

Personal website of Advocate Manthan Raval (Patan, Gujarat). Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS. Every page is statically generated.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # TypeScript check
```

## Where to edit things

| What | File |
| --- | --- |
| Name, profession, location, biography, Instagram, optional contact/credentials | `lib/site-config.ts` |
| Gallery photos (order, alt text, captions) | `lib/gallery-data.ts` |
| Page title, description, site URL logic | `lib/seo.ts` |
| Colours, fonts, spacing | `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx` |

Fields left empty in `site-config.ts` (email, phone, LinkedIn, education, practice areas) are hidden everywhere, including the structured data. Only fill them in with verified, approved information.

## Adding photographs

1. Export real photos as **JPEG**, about **2000–2400 px on the long side**, quality ~80–85 (keep each file under ~1 MB).
2. Copy them into `public/images/` (current photos: `manthan-raval-advocate-*.jpg`, `manthan-raval-patan-*.jpg`):
   - `manthan-raval-advocate-profile.jpg`: the main portrait used in the hero, social-share card and Google structured data (portrait orientation, 4:5 works best)
   - descriptive names for the gallery, e.g. `manthan-raval-patan-event.jpg` (lowercase, hyphens)
3. Open `lib/gallery-data.ts` and make sure there is one entry per gallery photo. **Rewrite each `alt` so it truthfully describes that photo** (e.g. "Manthan Raval outside the District Court, Patan"). Give every photo a different description.
4. Run `npm run build`. Width and height are read from the files automatically. Missing files are skipped, with a `[images] Not found` warning in the build log.

Until a photo exists, the site shows a neutral monogram placeholder in its place.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL, e.g. `https://manthan-raval.vercel.app`. If unset on Vercel, the production `*.vercel.app` URL is detected automatically. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | Google Search Console "HTML tag" verification code. |

Vercel preview deployments are automatically marked `noindex` so they never compete with the real site in Google.

## SEO features

- Metadata API: title, description, canonical, Open Graph (`profile`), X/Twitter card, robots with `max-image-preview:large`
- JSON-LD `@graph`: `Person` + `ProfilePage` + `WebSite`, including every real photo as an `ImageObject`
- `/sitemap.xml` with image entries, `/robots.txt`, `/manifest.webmanifest`
- Generated social-share image (`/opengraph-image`) that includes the real portrait
- Gallery thumbnails link to the original files (`/images/manthan-raval-01.jpg`), so Google Images can crawl them under descriptive filenames
