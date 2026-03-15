export interface LineupPlayer {
  playerId: string;
  playerName: string;
  photoUrl?: string;
  position: "goalkeeper" | "defender" | "midfielder" | "forward";
  shirtNumber: number;
  isHome: boolean;
  row: number;
  column: number;
}

export interface SubstitutePlayer {
  playerId: string;
  playerName: string;
  photoUrl?: string;
  position: string;
  shirtNumber: number;
  isHome: boolean;
}

export interface SubstitutionEvent {
  inPlayerId: string;
  outPlayerId: string;
  isHome: boolean;
  clock: number;
}

export interface TeamColors {
  homePrimary: string;
  homeSecondary: string;
  awayPrimary: string;
  awaySecondary: string;
}

export interface MatchLineup {
  homeFormation: number[];
  awayFormation: number[];
  homeCaptainId: string;
  awayCaptainId: string;
  lineup: LineupPlayer[];
  substitutes: SubstitutePlayer[];
  substitutions: SubstitutionEvent[];
  teamColors: TeamColors;
}
