export type StatAccent = "green" | "slate" | "gray" | "yellow";

type StatStyles = {
  bg: string;
  border: string;
  text: string;
};

const STAT_PALETTE: Record<StatAccent, StatStyles> = {
  green: {
    bg: "bg-green-400/10",
    border: "border-green-400/30",
    text: "text-green-400",
  },
  slate: {
    bg: "bg-slate-400/10",
    border: "border-slate-400/30",
    text: "text-slate-400",
  },
  gray: {
    bg: "bg-slate-400/10",
    border: "border-slate-400/30",
    text: "text-slate-400",
  },
  yellow: {
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/30",
    text: "text-yellow-400",
  },
};

export const getStatStyles = (accent: StatAccent): StatStyles =>
  STAT_PALETTE[accent] ?? STAT_PALETTE.slate;
