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
  | "RW"
  | "GOALKEEPER"
  | "DEFENDER"
  | "MIDFIELDER"
  | "FORWARD";

export interface PlayerProfile {
  id: number;
  number: number;
  name: string;
  position: PlayerPosition;
  age: number;
  nationality: string;
  teamId: number;
  rating: number;
  goals: number;
  assists: number;
  appearances: number;
}
