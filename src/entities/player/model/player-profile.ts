export type PlayerPosition =
  | "GK"
  | "CB"
  | "LB"
  | "RB"
  | "LWB"
  | "RWB"
  | "CDM"
  | "CM"
  | "CAM"
  | "LM"
  | "RM"
  | "ST"
  | "CF"
  | "LW"
  | "RW";

export interface PlayerProfile {
  id: number;
  number: number;
  name: string;
  position: PlayerPosition;
  age: number;
  nationality: string;
  nationalityName: string;
  teamId: number;
  value: string;
  rating: number;
  goals: number;
  assists: number;
  appearances: number;
  marketValue: number;
}
