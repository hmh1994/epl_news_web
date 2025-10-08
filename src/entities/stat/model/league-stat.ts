export interface LeagueStat {
  id: string;
  icon: string;
  value: string;
  label: string;
  change: string;
  gradient: {
    from: string;
    to: string;
  };
}
