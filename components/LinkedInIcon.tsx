type Props = { size?: number; className?: string };

/** LinkedIn glyph (outline), matching the 1.5px stroke style of the other icons. */
export default function LinkedInIcon({ size = 18, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="3" />
      <path d="M7.75 10.5v6" />
      <circle cx="7.75" cy="7.4" r="0.6" fill="currentColor" stroke="none" />
      <path d="M11.5 16.5v-6" />
      <path d="M11.5 13.25c0-1.6 1.1-2.75 2.5-2.75s2.25 1 2.25 2.6v3.4" />
    </svg>
  );
}
