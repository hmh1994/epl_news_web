import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";

export const getClubDisplay = (teamId: string) => {
  const team = TEAMS_BY_ID[teamId];
  const fallback = teamId.toUpperCase();

  return {
    name: team?.name ?? fallback,
    shortName: team?.shortName ?? fallback,
    crest: team?.crest ?? "⚽",
  };
};

const kickoffSummaryFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "short",
  day: "2-digit",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export const formatKickoffSummary = (kickoff: string | number | Date) =>
  kickoffSummaryFormatter.format(new Date(kickoff));
