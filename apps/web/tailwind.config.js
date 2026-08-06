/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        foreground: "#FAFAFA",
        card: {
          DEFAULT: "#0F0F12",
          foreground: "#FAFAFA",
          hover: "#141418",
          active: "#1A1A20"
        },
        popover: {
          DEFAULT: "#0F0F12",
          foreground: "#FAFAFA"
        },
        primary: {
          DEFAULT: "#FAFAFA",
          foreground: "#09090B"
        },
        secondary: {
          DEFAULT: "#18181B",
          foreground: "#FAFAFA"
        },
        muted: {
          DEFAULT: "#18181B",
          foreground: "#A1A1AA"
        },
        accent: {
          DEFAULT: "#27272A",
          foreground: "#FAFAFA"
        },
        border: "#1F1F24",
        input: "#1F1F24",
        ring: "#D4D4D8",
        status: {
          safe: {
            DEFAULT: "#22C55E",
            bg: "rgba(34, 197, 94, 0.1)",
            border: "rgba(34, 197, 94, 0.25)"
          },
          review: {
            DEFAULT: "#EAB308",
            bg: "rgba(234, 179, 8, 0.1)",
            border: "rgba(234, 179, 8, 0.25)"
          },
          critical: {
            DEFAULT: "#EF4444",
            bg: "rgba(239, 68, 68, 0.1)",
            border: "rgba(239, 68, 68, 0.25)"
          },
          info: {
            DEFAULT: "#3B82F6",
            bg: "rgba(59, 130, 246, 0.1)",
            border: "rgba(59, 130, 246, 0.25)"
          }
        }
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "-apple-system", "BlinkMacSystemFont", "Inter", "Segoe UI", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "SFMono-Regular", "Menlo", "monospace"]
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.5)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.6)",
        glow: "0 0 20px -5px rgba(255, 255, 255, 0.05)"
      }
    },
  },
  plugins: [],
};
