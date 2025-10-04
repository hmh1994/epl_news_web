export type ViewMode = "grid" | "list";

export type PlayerFilterType = "position" | "team";

export interface PlayerFilter {
  type: PlayerFilterType;
  value: string;
}
