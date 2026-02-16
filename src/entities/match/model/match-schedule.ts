export type MatchStatus = "upcoming" | "live" | "finished";

export interface MatchClub {
  teamId: string;
  teamName?: string;
  score?: number;
  recentForm?: Array<"W" | "D" | "L">;
  leaguePosition?: number;
}

export interface MatchReferee {
  main: string;
  assist1?: string;
  assist2?: string;
  fourth?: string;
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
  referee?: string | MatchReferee;
  headline?: string;
}

export interface MatchDaySchedule {
  date: string; // ISO date string
  fixtures: MatchFixture[];
}
