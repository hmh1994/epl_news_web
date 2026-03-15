export type AwardType =
  | "POTM"
  | "GOTM"
  | "SOTM"
  | "POTS"
  | "YPOTS"
  | "PM"
  | "GOTS"
  | "MPGOTS"
  | "SOTS"
  | "GB"
  | "GG"
  | "MICOTS"
  | "GCOTS"
  | "MOTM"
  | "MOTS";

export interface PlayerAward {
  type: AwardType;
  name: string;
  description?: string;
  iconUrl?: string;
  date: string;
  season?: string;
}
