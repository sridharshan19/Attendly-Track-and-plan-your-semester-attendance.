import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          blue: "#38bdf8",
          sky: "#0ea5e9",
          slate: "#94a3b8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px -5px rgba(56, 189, 248, 0.25)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
