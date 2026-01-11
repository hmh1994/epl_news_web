import { NextResponse } from "next/server";
import { fetchPlayerList } from "@/shared/api/epl/lib/player-list";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? undefined;
  const rawPosition = searchParams.get("position");
  const rawTeamId = searchParams.get("teamId");
  const position = rawPosition && rawPosition !== "all" ? rawPosition : undefined;
  const teamId = rawTeamId && rawTeamId !== "all" ? rawTeamId : undefined;

  const response = await fetchPlayerList(DEFAULT_LEAGUE_ID, {
    search,
    position,
    teamId,
  });

  return NextResponse.json({ players: response.data });
}
