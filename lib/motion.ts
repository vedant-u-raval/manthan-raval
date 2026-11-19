import type { CSSProperties } from "react";

/** Inline style for a staggered scroll-reveal delay. */
export const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/** Inline style for a CSS entrance-animation delay. */
export const animDelay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });
