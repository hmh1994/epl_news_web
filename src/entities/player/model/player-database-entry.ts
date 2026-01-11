import { PlayerPosition } from "./player-profile";

export interface PlayerSkillSet {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
}

export interface PlayerCareerPeriod {
  year: string;
  teamId: string;
  matches: number;
  goals: number;
}

export interface PlayerDatabaseEntry {
  id: string | number;
  name: string;
  photo: string;
  teamId: string;
  teamName?: string;
  position: PlayerPosition;
  age: number;
  nationality: string;
  height: number;
  weight: number;
  goals: number;
  assists: number;
  matches?: number | null;
  stats: PlayerSkillSet;
  career: PlayerCareerPeriod[];
}
