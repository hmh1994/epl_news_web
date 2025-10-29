import localFont from "next/font/local";

export const nanumSquare = localFont({
  variable: "--font-nanum-square",
  display: "swap",
  preload: true,
  fallback: ["-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
  src: [
    {
      path: "../fonts/NanumSquareL.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/NanumSquareR.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/NanumSquareB.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/NanumSquareEB.ttf",
      weight: "800",
      style: "normal",
    },
  ],
});
