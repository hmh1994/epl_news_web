export type MatchStatus = "upcoming" | "live" | "finished";

export interface MatchClub {
  teamId: string;
  score?: number;
  recentForm?: Array<"W" | "D" | "L">;
  leaguePosition?: number;
}

export interface MatchFixture {
  id: string;
  matchweek: number;
  kickoff: string; // ISO string in UTC
  venue: string;
  city: string;
  status: MatchStatus;
  home: MatchClub;
  away: MatchClub;
  referee?: string;
  headline?: string;
}

export interface MatchDaySchedule {
  date: string; // ISO date string
  fixtures: MatchFixture[];
}
