export interface LeagueTableRow {
  pos: number;
  teamId: string;
  team: string;
  logo: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd: number;
  pts: number;
  form?: string[];
}
