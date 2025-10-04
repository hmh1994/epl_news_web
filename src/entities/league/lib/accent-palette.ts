import { LeagueAccent } from "@/entities/league/model/league-overview";

type AccentStyles = {
  hoverText: string;
  text: string;
  gradient: string;
};

export const ACCENT_PALETTE: Record<LeagueAccent, AccentStyles> = {
  green: {
    hoverText: "group-hover:text-green-400",
    text: "text-green-400",
    gradient: "from-green-400 to-emerald-500",
  },
  teal: {
    hoverText: "group-hover:text-teal-400",
    text: "text-teal-400",
    gradient: "from-[#169976] to-teal-500",
  },
  emerald: {
    hoverText: "group-hover:text-emerald-400",
    text: "text-emerald-400",
    gradient: "from-emerald-400 to-teal-500",
  },
  yellow: {
    hoverText: "group-hover:text-yellow-400",
    text: "text-yellow-400",
    gradient: "from-yellow-400 to-orange-500",
  },
};

export const getAccentStyles = (accent: LeagueAccent): AccentStyles =>
  ACCENT_PALETTE[accent] ?? ACCENT_PALETTE.green;
