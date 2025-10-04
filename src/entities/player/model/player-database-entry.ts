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
  team: string;
  matches: number;
  goals: number;
}

export interface PlayerDatabaseEntry {
  id: number;
  name: string;
  photo: string;
  team: string;
  teamLogo: string;
  position: PlayerPosition;
  age: number;
  nationality: string;
  height: number;
  weight: number;
  goals: number;
  assists: number;
  rating: number;
  marketValue: string;
  stats: PlayerSkillSet;
  career: PlayerCareerPeriod[];
}
