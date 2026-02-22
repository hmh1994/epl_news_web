import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const forwardedHost = headersList.get("x-forwarded-host") ?? "";
  const host = forwardedHost || (headersList.get("host") ?? "");

  // vercel.app 직접 접근 시 크롤링 전면 차단
  if (host.endsWith(".vercel.app")) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://infootball.kr/sitemap.xml",
    host: "https://infootball.kr",
  };
}
