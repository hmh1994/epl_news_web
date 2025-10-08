export interface LeagueTableTeam {
  position: number;
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
  trend: number;
  xG: number;
  xGA: number;
  possession: number;
  passAccuracy: number;
  cleanSheets: number;
  bigChances: number;
  value: string;
}
