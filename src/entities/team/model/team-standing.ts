export type TeamFormResult = "W" | "D" | "L";

export interface TeamStanding {
  position: number;
  team: string;
  matches: number;
  points: number;
  goalDiff: string;
  logo: string;
  trend: string;
  form: TeamFormResult[];
}
