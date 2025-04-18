import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LeagueProvider } from "./context/LeagueContext";
import Header from "./components/header";
import MainContainer from "./components/main-container";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "EPL News",
  // description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LeagueProvider>
          <Header />
          <div className='2xl:px-24 xl:px-12 bg-neutral-700 mt-[120px] pt-[10px]'>
            <MainContainer>{children}</MainContainer>
          </div>
        </LeagueProvider>
      </body>
    </html>
  );
}
