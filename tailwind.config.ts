import type { Config } from "tailwindcss";

const easeOut = "cubic-bezier(0.22, 1, 0.36, 1)";
const easeInOut = "cubic-bezier(0.76, 0, 0.24, 1)";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",
        mist: "#FAFAFA",
        ink: "#171717",
        muted: "#737373",
        line: "#EAEAEA",
        accent: "#8B7355",
        // Neutral fill behind images while they load / placeholder.
        stone: "#F3F2F0",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      maxWidth: {
        site: "75rem", // 1200px
      },
      letterSpacing: {
        label: "0.22em",
      },
      transitionTimingFunction: {
        soft: easeOut,
        curtain: easeInOut,
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translate3d(0, 22px, 0)" },
          "100%": { opacity: "1", transform: "none" },
        },
        fade: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        curtain: { "0%": { transform: "scaleY(1)" }, "100%": { transform: "scaleY(0)" } },
        settle: { "0%": { transform: "scale(1.08)" }, "100%": { transform: "scale(1)" } },
        line: { "0%": { transform: "scaleX(0)" }, "100%": { transform: "scaleX(1)" } },
        scrollcue: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "zoom-in": {
          "0%": { opacity: "0", transform: "scale(0.985)" },
          "100%": { opacity: "1", transform: "none" },
        },
      },
      animation: {
        rise: `rise 1s ${easeOut} both`,
        fade: "fade 0.8s ease both",
        curtain: `curtain 1.3s ${easeInOut} 0.15s both`,
        settle: `settle 1.9s ${easeOut} both`,
        line: `line 1.2s ${easeOut} both`,
        scrollcue: `scrollcue 2.2s ${easeInOut} infinite`,
        "zoom-in": `zoom-in 0.5s ${easeOut} both`,
      },
    },
  },
  plugins: [],
};

export default config;
