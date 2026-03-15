import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PlayerAward } from "@/entities/player/model/player-award";
import type { PlayerScore } from "@/entities/player/model/player-score";
import { PlayerDetailPage } from "@/processes/player-detail-page";
import { fetchPlayerDetail } from "@/shared/api/epl/lib/player-detail";
import { fetchPlayerAwards } from "@/shared/api/epl/lib/player-awards";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";
import { MOCK_PLAYER_AWARDS } from "@/shared/mocks/player-awards-mock";
import { MOCK_PLAYER_SCORE } from "@/shared/mocks/player-score-mock";

interface PageProps {
  params: Promise<{
    locale: string;
    playerId: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { playerId, locale } = await params;

  try {
    const response = await fetchPlayerDetail(DEFAULT_LEAGUE_ID, playerId, {
      locale,
    });
    const player = response.data.player;

    if (!player) {
      return {
        title: "Player Not Found",
      };
    }

    const { name, position, nationality } = player.summary;
    const description = `${name} - ${position} from ${nationality}. View detailed stats, attributes, and career history.`;

    return {
      title: `${name} - Infootball`,
      description,
      openGraph: {
        title: `${name} - Player Profile`,
        description,
        type: "profile",
      },
    };
  } catch {
    return {
      title: "Player - Infootball",
    };
  }
}

export default async function PlayerDetailRoute({ params }: PageProps) {
  const { playerId, locale } = await params;
  const [response, awardsResult] = await Promise.all([
    fetchPlayerDetail(DEFAULT_LEAGUE_ID, playerId, { locale }),
    fetchPlayerAwards(DEFAULT_LEAGUE_ID, playerId, { locale }).catch(() => null),
  ]);
  const player = response.data.player;

  if (!player) {
    notFound();
  }

  const awards: PlayerAward[] = awardsResult?.data ?? MOCK_PLAYER_AWARDS;
  const score: PlayerScore | null = MOCK_PLAYER_SCORE; // TODO: API 준비 시 response.data.player.scores로 교체

  const { name, position, nationality } = player.summary;
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: position,
    nationality: nationality
      ? { "@type": "Country", name: nationality }
      : undefined,
    url: `https://infootball.kr/${locale}/players/${playerId}`,
    memberOf: {
      "@type": "SportsOrganization",
      name: "Premier League",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <PlayerDetailPage
        player={player}
        locale={locale}
        awards={awards}
        score={score}
      />
    </>
  );
}
