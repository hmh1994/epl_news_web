export type TeamFormResult = "W" | "D" | "L";

export interface TeamStanding {
  position: number;
  teamId: string;
  matches: number;
  points: number;
  goalDifference: number;
  trend: number;
  form: TeamFormResult[];
}
