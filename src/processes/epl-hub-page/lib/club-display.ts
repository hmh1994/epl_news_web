import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";

/** Strip common suffixes like "F.C.", "A.F.C." from team name */
const cleanTeamName = (name: string) =>
  name
    .replace(/\s*A\.F\.C\.?\s*$/i, "")
    .replace(/\s*F\.C\.?\s*$/i, "")
    .trim();

/** Derive a 3-letter short code from a full team name */
const deriveShortName = (name: string): string => {
  const cleaned = cleanTeamName(name);
  const words = cleaned.split(/\s+/);
  if (words.length === 1) return cleaned.slice(0, 3).toUpperCase();
  return words
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
};

export const getClubDisplay = (teamId: string, teamName?: string) => {
  const team = TEAMS_BY_ID[teamId];
  if (team) {
    return {
      name: team.name,
      shortName: team.shortName,
      crest: team.crest,
    };
  }
  if (teamName) {
    return {
      name: cleanTeamName(teamName),
      shortName: deriveShortName(teamName),
      crest: "⚽",
    };
  }
  const fallback = teamId.toUpperCase();
  return {
    name: fallback,
    shortName: fallback,
    crest: "⚽",
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
