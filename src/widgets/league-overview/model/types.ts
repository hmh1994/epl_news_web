import { LeagueKey, LeagueSummary } from "@/entities/league/model/league-overview";

export type LeagueTab = "insights" | "stats" | "champions";
export type LeagueEntry = [LeagueKey, LeagueSummary];
