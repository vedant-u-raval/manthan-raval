import { getAllPhotos, getProfilePhoto } from "./photos";
import { absoluteUrl, seo, SITE_URL } from "./seo";
import { sameAsLinks, siteConfig } from "./site-config";

/**
 * Schema.org JSON-LD for the homepage.
 *
 * Only verified, visible facts are included. Optional fields from
 * site-config (email, phone, alumniOf, knowsAbout) are added only when set.
 */
export function buildStructuredData() {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const pageId = `${SITE_URL}/#profilepage`;

  const profile = getProfilePhoto();
  const photos = getAllPhotos();

  const imageObjects = photos.map((p, i) => ({
    "@type": "ImageObject",
    ...(i === 0 && profile ? { "@id": `${SITE_URL}/#primaryimage` } : {}),
    url: absoluteUrl(p.src),
    contentUrl: absoluteUrl(p.src),
    width: p.width,
    height: p.height,
    caption: p.caption ?? p.alt,
    creditText: siteConfig.name,
    copyrightNotice: `© ${siteConfig.name}`,
  }));

  const { contact, alumniOf, knowsAbout } = siteConfig;

  const person = {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    givenName: siteConfig.givenName,
    familyName: siteConfig.familyName,
    jobTitle: siteConfig.profession,
    description: `${siteConfig.profession}, ${siteConfig.court}`,
    url: SITE_URL,
    ...(imageObjects.length ? { image: imageObjects.length === 1 ? imageObjects[0] : imageObjects } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.countryCode,
    },
    sameAs: sameAsLinks(),
    mainEntityOfPage: { "@id": pageId },
    ...(contact.email ? { email: `mailto:${contact.email}` } : {}),
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(alumniOf.length
      ? { alumniOf: alumniOf.map((name) => ({ "@type": "EducationalOrganization", name })) }
      : {}),
    ...(knowsAbout.length ? { knowsAbout: [...knowsAbout] } : {}),
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: SITE_URL,
    name: siteConfig.name,
    description: seo.description,
    inLanguage: seo.language,
    publisher: { "@id": personId },
  };

  const profilePage = {
    "@type": "ProfilePage",
    "@id": pageId,
    url: SITE_URL,
    name: seo.title,
    description: seo.description,
    inLanguage: seo.language,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    mainEntity: { "@id": personId },
    ...(profile ? { primaryImageOfPage: { "@id": `${SITE_URL}/#primaryimage` } } : {}),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, profilePage, website],
  };
}
