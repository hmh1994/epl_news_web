export type LeagueKey = "EPL" | "LaLiga" | "Bundesliga" | "SerieA";

export interface LeagueSummary {
  name: string;
  country: string;
  teams: number;
  totalGoals: number;
  avgAttendance: number;
  marketValue: string;
  color: string;
  logo: string;
}

export interface LeagueTableRow {
  pos: number;
  team: string;
  logo: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd: number;
  pts: number;
}

export interface LeagueChampion {
  year: string;
  team: string;
  logo: string;
  titles: number;
  points: number;
}

export type LeagueAccent = "green" | "teal" | "emerald" | "yellow";

export interface LeagueStat {
  id: string;
  icon: "target" | "activity" | "users" | "shield";
  value: string;
  label: string;
  change: string;
  color: LeagueAccent;
}

export interface SuccessfulClub {
  team: string;
  logo: string;
  titles: number;
  color: string;
}
