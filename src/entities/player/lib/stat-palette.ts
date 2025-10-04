export type StatAccent = "green" | "teal" | "emerald" | "yellow";

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
  teal: {
    bg: "bg-teal-400/10",
    border: "border-teal-400/30",
    text: "text-teal-400",
  },
  emerald: {
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
    text: "text-emerald-400",
  },
  yellow: {
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/30",
    text: "text-yellow-400",
  },
};

export const getStatStyles = (accent: StatAccent): StatStyles =>
  STAT_PALETTE[accent] ?? STAT_PALETTE.teal;
