import { LeagueKey, LeagueSummary } from "@/entities/league/model/league-overview";

export type LeagueTab = "table" | "stats" | "champions";
export type LeagueEntry = [LeagueKey, LeagueSummary];
