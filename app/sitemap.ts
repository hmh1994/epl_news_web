import type { MetadataRoute } from "next";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";

const BASE_URL = "https://infootball.kr";
const LOCALES = ["ko", "en"] as const;

const localeUrl = (locale: string, path: string) =>
  `${BASE_URL}/${locale}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 정적 페이지
  const staticPages = [
    { path: "/home", changeFrequency: "daily" as const, priority: 1.0 },
    { path: "/matches", changeFrequency: "hourly" as const, priority: 0.9 },
    { path: "/news", changeFrequency: "hourly" as const, priority: 0.9 },
    { path: "/players", changeFrequency: "daily" as const, priority: 0.8 },
    { path: "/teams", changeFrequency: "weekly" as const, priority: 0.7 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    LOCALES.map((locale) => ({
      url: localeUrl(locale, page.path),
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l === "ko" ? "ko-KR" : "en-US", localeUrl(l, page.path)])
        ),
      },
    }))
  );

  // 경기 상세 페이지
  const matchIds = EPL_MOCK_DATA.matches.schedule.flatMap((day) =>
    day.fixtures.map((fixture) => fixture.id)
  );

  const matchEntries: MetadataRoute.Sitemap = matchIds.flatMap((matchId) =>
    LOCALES.map((locale) => ({
      url: localeUrl(locale, `/matches/${matchId}`),
      lastModified: now,
      changeFrequency: "hourly" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [
            l === "ko" ? "ko-KR" : "en-US",
            localeUrl(l, `/matches/${matchId}`),
          ])
        ),
      },
    }))
  );

  // 뉴스 기사 페이지
  const newsEntries: MetadataRoute.Sitemap = EPL_MOCK_DATA.news.articles
    .slice(0, 50)
    .flatMap((article) =>
      LOCALES.map((locale) => ({
        url: localeUrl(locale, `/news/${article.slug}`),
        lastModified: new Date(article.publishedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [
              l === "ko" ? "ko-KR" : "en-US",
              localeUrl(l, `/news/${article.slug}`),
            ])
          ),
        },
      }))
    );

  // 선수 상세 페이지
  const playerEntries: MetadataRoute.Sitemap = EPL_MOCK_DATA.players.database
    .slice(0, 100)
    .flatMap((player) =>
      LOCALES.map((locale) => ({
        url: localeUrl(locale, `/players/${String(player.id)}`),
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [
              l === "ko" ? "ko-KR" : "en-US",
              localeUrl(l, `/players/${String(player.id)}`),
            ])
          ),
        },
      }))
    );

  return [...staticEntries, ...matchEntries, ...newsEntries, ...playerEntries];
}
