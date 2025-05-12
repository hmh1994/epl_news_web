import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "media",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    screens: {
      // 전체 너비가 480px 이하
      xs: { max: "480px" },
      // 481px 이상 767px 이하
      sm: { min: "481px", max: "767px" },
      // 768px 이상 1023px 이하
      md: { min: "768px", max: "1023px" },
      // 1024px 이상
      lg: { min: "1024px", max: "1279px" },
      xl: { min: "1280px", max: "1535px" },
      "2xl": { min: "1536px" },
    },
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
    },
    extend: {},
  },
  plugins: [],
};
export default config;
