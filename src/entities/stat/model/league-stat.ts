import { ReactNode } from "react";

export interface LeagueStat {
  icon: ReactNode;
  number: string;
  label: string;
  change: string;
  color: string;
}
