import { ArrowUp, Phone } from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import { revealDelay } from "@/lib/motion";
import { fullLocation, navLinks, siteConfig, telHref } from "@/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();
  const { contact, social } = siteConfig;

  return (
    <footer className="border-t border-line bg-mist">
      <div className="container-site grid gap-12 pb-14 pt-20 lg:grid-cols-12 lg:gap-16">
        {/* Identity */}
        <div className="lg:col-span-6" data-reveal>
          <p className="font-serif text-5xl font-medium leading-none tracking-[-0.01em] text-ink sm:text-6xl">{siteConfig.name}</p>
          <p className="mt-5 flex items-center gap-4 text-[0.7rem] uppercase tracking-label text-muted">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {siteConfig.profession} · {fullLocation}
          </p>
          <p className="mt-2 pl-12 text-[0.7rem] uppercase tracking-label text-ink/80">{siteConfig.court}</p>
        </div>

        {/* Navigation */}
        <nav aria-label="Footer" className="lg:col-span-3" data-reveal style={revealDelay(100)}>
          <p className="eyebrow">Explore</p>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link-underline text-[0.95rem] text-ink/80 hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="lg:col-span-3" data-reveal style={revealDelay(200)}>
          <p className="eyebrow">Connect</p>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            {contact.phone && (
              <li>
                <a href={telHref(contact.phone)} className="link-underline inline-flex items-center gap-2.5 text-ink/80 tabular-nums hover:text-ink">
                  <Phone size={15} strokeWidth={1.5} aria-hidden="true" />
                  {contact.phone}
                </a>
              </li>
            )}
            <li>
              <a
                href={social.instagram.url}
                target="_blank"
                rel="noopener noreferrer me"
                className="link-underline inline-flex items-center gap-2.5 text-ink/80 hover:text-ink"
              >
                <InstagramIcon size={15} />
                {social.instagram.handle}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="tracking-wide">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <a href="#home" className="group inline-flex items-center gap-2 uppercase tracking-[0.16em] transition-colors hover:text-ink">
            Back to top
            <ArrowUp size={14} strokeWidth={1.5} aria-hidden="true" className="transition-transform duration-500 ease-soft group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
