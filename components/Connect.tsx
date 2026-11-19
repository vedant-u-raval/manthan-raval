import { ArrowUpRight, Mail, Phone } from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import LinkedInIcon from "./LinkedInIcon";
import SectionHeading from "./SectionHeading";
import { revealDelay } from "@/lib/motion";
import { siteConfig, telHref } from "@/lib/site-config";

type Channel = {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
};

export default function Connect() {
  const { social, contact } = siteConfig;

  // Only channels that are configured (and approved) in site-config appear here.
  const channels: Channel[] = [
    ...(contact.phone
      ? [{ label: "Phone", value: contact.phone, href: telHref(contact.phone), icon: <Phone size={19} strokeWidth={1.5} /> }]
      : []),
    {
      label: "Instagram",
      value: social.instagram.handle,
      href: social.instagram.url,
      icon: <InstagramIcon size={19} />,
      external: true,
    },
    ...(social.linkedin
      ? [{ label: "LinkedIn", value: siteConfig.name, href: social.linkedin, icon: <LinkedInIcon size={19} />, external: true }]
      : []),
    ...(contact.email
      ? [{ label: "Email", value: contact.email, href: `mailto:${contact.email}`, icon: <Mail size={19} strokeWidth={1.5} /> }]
      : []),
  ];

  return (
    <section id="connect" aria-labelledby="connect-heading" className="section-pad">
      <div className="container-site">
        <div className="grid border border-line lg:grid-cols-12" data-reveal>
          {/* Intro + actions */}
          <div className="min-w-0 p-6 sm:p-12 lg:col-span-6 lg:p-16">
            <SectionHeading index="04" label="Connect" title={`Connect with ${siteConfig.givenName}`} id="connect-heading" />
            <p className="mt-6 max-w-md text-[1.0625rem] leading-[1.85] text-muted" data-reveal style={revealDelay(150)}>
              Stay connected through his public professional profile.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:items-start [&>a]:w-full sm:[&>a]:w-auto sm:[&>a]:min-w-[19rem]" data-reveal style={revealDelay(250)}>
              {contact.phone && (
                <a href={telHref(contact.phone)} className="btn-primary">
                  <Phone size={15} strokeWidth={1.5} aria-hidden="true" />
                  Call Now
                </a>
              )}
              <a href={social.instagram.url} target="_blank" rel="noopener noreferrer me" className="btn-secondary">
                <InstagramIcon size={16} />
                Follow on Instagram
                <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" className="btn-icon" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>

          {/* Channels */}
          <ul className="flex min-w-0 flex-col justify-center border-t border-line bg-mist px-6 py-4 sm:px-12 lg:col-span-6 lg:border-l lg:border-t-0 lg:px-14">
            {channels.map((c, i) => (
              <li
                key={c.label}
                className="border-b border-line last:border-b-0"
                data-reveal
                style={revealDelay(200 + i * 120)}
              >
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer me" } : {})}
                  className="group flex items-center gap-5 py-7 sm:gap-7"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-line bg-white text-ink transition-all duration-500 ease-soft group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                    {c.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="eyebrow block">{c.label}</span>
                    <span className="mt-1.5 block truncate font-serif text-[1.6rem] leading-tight text-ink lining-nums sm:text-[1.95rem]">
                      {c.value}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={22}
                    strokeWidth={1.25}
                    aria-hidden="true"
                    className="shrink-0 text-muted transition-all duration-500 ease-soft group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink"
                  />
                  {c.external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
