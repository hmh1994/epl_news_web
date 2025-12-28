import { NextResponse } from "next/server";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const position = searchParams.get("position");
  const team = searchParams.get("team");

  const players = EPL_MOCK_DATA.players.database.filter((player) => {
    const matchesSearch = search
      ? player.name.toLowerCase().includes(search)
      : true;
    const matchesPosition =
      position && position !== "all"
        ? player.position.includes(position)
        : true;
    const matchesTeam =
      team && team !== "all" ? player.teamId === team : true;

    return matchesSearch && matchesPosition && matchesTeam;
  });

  return NextResponse.json({ players });
}
