import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "epl-main": "#38003c",
        "k_league-main": "#1c1c1c",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(epl|k_league)-main/,
    },
  ],
};
export default config;
