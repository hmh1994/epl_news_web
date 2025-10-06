import { ReactNode } from "react";

export type MatchStatus = "upcoming" | "live" | "finished";

export interface MatchClub {
  name: string;
  shortName: string;
  badge: ReactNode;
  score?: number;
  recentForm?: Array<"W" | "D" | "L">;
  leaguePosition?: number;
}

export interface MatchBroadcast {
  channel: string;
  platform?: string;
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
  broadcast?: MatchBroadcast;
  referee?: string;
  headline?: string;
}

export interface MatchDaySchedule {
  date: string; // ISO date string
  fixtures: MatchFixture[];
}
