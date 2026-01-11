import { NextResponse } from "next/server";
import { fetchPlayerDetail } from "@/shared/api/epl/lib/player-detail";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: {
    playerId: string;
  };
}

export async function GET(request: Request, context: RouteContext) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") ?? undefined;
  const playerId = context.params.playerId;

  const response = await fetchPlayerDetail(DEFAULT_LEAGUE_ID, playerId, {
    locale,
  });

  return NextResponse.json({
    matches: response.data.player.performance.matches ?? null,
  });
}
