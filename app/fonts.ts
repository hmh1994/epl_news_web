import localFont from "next/font/local";

export const nanumSquare = localFont({
  src: [
    {
      path: "../fonts/NanumSquareL.ttf",
      weight: "100",
    },
    {
      path: "../fonts/NanumSquareL.ttf",
      weight: "200",
    },
    {
      path: "../fonts/NanumSquareR.ttf",
      weight: "300",
    },
    {
      path: "../fonts/NanumSquareR.ttf",
      weight: "400",
    },
    {
      path: "../fonts/NanumSquareB.ttf",
      weight: "500",
    },
    {
      path: "../fonts/NanumSquareB.ttf",
      weight: "600",
    },
    {
      path: "../fonts/NanumSquareEB.ttf",
      weight: "700",
    },
    {
      path: "../fonts/NanumSquareEB.ttf",
      weight: "800",
    },
    {
      path: "../fonts/NanumSquareEB.ttf",
      weight: "900",
    },
  ],
  variable: "--font-nanum-square",
});
