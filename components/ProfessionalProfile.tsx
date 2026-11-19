import { Fragment } from "react";
import SectionHeading from "./SectionHeading";
import { revealDelay } from "@/lib/motion";
import { fullLocation, siteConfig, type ProfileField } from "@/lib/site-config";

export default function ProfessionalProfile() {
  const fields: ProfileField[] = [
    { label: "Full Name", value: siteConfig.name },
    { label: "Profession", value: siteConfig.profession, note: siteConfig.court },
    ...(siteConfig.education.length
      ? [
          {
            label: "Education",
            value: siteConfig.education.map((d) => d.short).join(", "),
            note: siteConfig.education.map((d) => d.full).join(" · "),
          },
        ]
      : []),
    { label: "Location", value: fullLocation },
    ...siteConfig.additionalProfileFields,
  ];

  return (
    <section id="profile" aria-labelledby="profile-heading" className="section-pad border-b border-line bg-mist">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <SectionHeading index="02" label="Profile" title="Professional Profile" id="profile-heading" />
          <p className="mt-6 max-w-sm text-[1.0625rem] leading-[1.85] text-muted" data-reveal style={revealDelay(200)}>
            Key details at a glance.
          </p>
        </div>

        <dl className="lg:col-span-7">
          <div aria-hidden="true" className="h-px bg-ink" data-reveal="line" />
          {fields.map((field, i) => (
            <div
              key={field.label}
              data-reveal
              style={revealDelay(120 + i * 110)}
              className="group relative grid gap-2 border-b border-line py-8 sm:grid-cols-[3rem_10rem_1fr] sm:items-baseline sm:gap-6"
            >
              <span aria-hidden="true" className="hidden font-serif text-base text-accent sm:block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <dt className="eyebrow">{field.label}</dt>
              <dd className="font-serif text-[1.65rem] leading-snug text-ink transition-transform duration-500 ease-soft group-hover:translate-x-1.5 sm:text-[1.9rem]">
                {field.value}
                {field.note && (
                  <span className="mt-1.5 block font-sans text-[0.78rem] font-medium uppercase tracking-[0.18em] text-muted">
                    {/* Keep each " · "-separated item on one line so names never split mid-phrase. */}
                    {field.note.split(" · ").map((part, j, all) => (
                      <Fragment key={j}>
                        <span className="whitespace-nowrap">
                          {part}
                          {j < all.length - 1 && " ·"}
                        </span>{" "}
                      </Fragment>
                    ))}
                  </span>
                )}
              </dd>
              {/* Accent underline drawn on hover. */}
              <span
                aria-hidden="true"
                className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-soft group-hover:scale-x-100"
              />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
