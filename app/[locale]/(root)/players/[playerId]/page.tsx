import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlayerDetailPage } from "@/processes/player-detail-page";
import { fetchPlayerDetail } from "@/shared/api/epl/lib/player-detail";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";

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
  const response = await fetchPlayerDetail(DEFAULT_LEAGUE_ID, playerId, {
    locale,
  });
  const player = response.data.player;

  if (!player) {
    notFound();
  }

  return <PlayerDetailPage player={player} locale={locale} />;
}
