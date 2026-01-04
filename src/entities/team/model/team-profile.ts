export interface TeamColors {
  primary: string;
  secondary: string;
}

export interface TeamKeyStats {
  possession: number;
  passAccuracy: number;
  shotsPerGame: number;
  cleanSheets: number;
}

export interface TeamProfile {
  id: number;
  teamId?: string;
  name: string;
  shortName: string;
  logo: string;
  founded: number;
  stadium: string;
  capacity: number;
  manager: string;
  nationality: string;
  colors: TeamColors;
  rank: number;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  form: string[];
  avgAge: number;
  trophies: number;
  description: string;
  keyStats: TeamKeyStats;
}
