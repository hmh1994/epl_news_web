import type { MetadataRoute } from "next";
import { fetchMatchSchedule } from "@/shared/api/epl/lib/match-schedule";
import { fetchPlayerList } from "@/shared/api/epl/lib/player-list";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";

const BASE_URL = "https://infootball.kr";
const LOCALES = ["ko", "en"] as const;

const localeUrl = (locale: string, path: string) =>
  `${BASE_URL}/${locale}${path}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
  const scheduleResponse = await fetchMatchSchedule(DEFAULT_LEAGUE_ID);
  const matchIds = scheduleResponse.data.schedule.flatMap((day) =>
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

  // 선수 상세 페이지
  const playerListResponse = await fetchPlayerList(DEFAULT_LEAGUE_ID);
  const playerEntries: MetadataRoute.Sitemap = playerListResponse.data
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

  return [...staticEntries, ...matchEntries, ...playerEntries];
}
