import { MatchFixture } from "@/entities/match/model/match-schedule";

export type MatchTimelineEventType =
  | "goal"
  | "card"
  | "substitution"
  | "var"
  | "whistle"
  | "info";

export interface MatchTimelineEvent {
  minute: string;
  type: MatchTimelineEventType;
  team: "home" | "away" | "neutral";
  title: string;
  description?: string;
  player?: string;
  assist?: string;
}

export interface MatchStatComparison {
  label: string;
  home: number;
  away: number;
  higherIsBetter?: boolean;
}

export interface MatchFormEntry {
  opponent: string;
  result: "W" | "D" | "L";
  score: string;
  competition: string;
  date: string;
}

export interface MatchKeyPlayer {
  name: string;
  role: string;
  stat: string;
  highlight: string;
  form: Array<"W" | "D" | "L">;
}

export interface HeadToHeadRecord {
  date: string;
  competition: string;
  score: string;
  note: string;
}

export interface MatchDetailInsight {
  label: string;
  value: string;
  trend?: "up" | "down" | "steady";
  helperText?: string;
}

export interface MatchDetail {
  fixture: MatchFixture;
  heroTagline: string;
  attendance?: number;
  insights: MatchDetailInsight[];
  timeline: MatchTimelineEvent[];
  stats: MatchStatComparison[];
  keyPlayers: {
    home: MatchKeyPlayer;
    away: MatchKeyPlayer;
  };
  formGuide: {
    home: MatchFormEntry[];
    away: MatchFormEntry[];
  };
  headToHead: HeadToHeadRecord[];
  previewNotes: string[];
  broadcastNotes?: string[];
}
