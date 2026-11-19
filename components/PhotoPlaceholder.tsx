import { siteConfig } from "@/lib/site-config";

type Props = { className?: string; size?: "lg" | "sm" };

/**
 * Neutral stand-in shown only while a real photograph has not been added yet.
 * Deliberately text-free apart from a quiet monogram, so nothing reads as
 * placeholder copy on the live site.
 */
export default function PhotoPlaceholder({ className = "", size = "lg" }: Props) {
  const initials = `${siteConfig.givenName[0]}${siteConfig.familyName[0]}`;
  return (
    <div
      role="presentation"
      className={`flex items-center justify-center bg-stone ${className}`}
    >
      <div className="flex flex-col items-center gap-4">
        <span
          className={`font-serif font-medium tracking-[0.08em] text-ink/25 ${
            size === "lg" ? "text-7xl sm:text-8xl" : "text-4xl"
          }`}
        >
          {initials}
        </span>
        <span className="h-px w-10 bg-accent/40" />
      </div>
    </div>
  );
}
