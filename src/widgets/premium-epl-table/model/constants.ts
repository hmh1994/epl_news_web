import { LucideIcon, Trophy, BarChart3, Target, Award } from "lucide-react";

type HeroStat = {
  value: string;
  label: string;
  valueClass: string;
};

export const HERO_STATS: HeroStat[] = [
  { value: "1,213", label: "총 득점", valueClass: "text-green-400" },
  { value: "3.19", label: "경기당 평균골", valueClass: "text-teal-400" },
  { value: "82.4%", label: "평균 패스성공률", valueClass: "text-emerald-400" },
  { value: "216", label: "총 클린시트", valueClass: "text-yellow-400" },
];
export type AnalyticsCardStyle = {
  icon: LucideIcon;
  iconClass: string;
  valueClass: string;
  deltaClass: string;
  progressGradient: string;
  hoverShadowClass: string;
};

export const ANALYTICS_CARD_STYLES: AnalyticsCardStyle[] = [
  {
    icon: Trophy,
    iconClass: "text-green-400",
    valueClass: "group-hover:text-green-400",
    deltaClass: "text-green-400",
    progressGradient: "from-green-400 to-emerald-500",
    hoverShadowClass: "hover:shadow-green-400/20",
  },
  {
    icon: BarChart3,
    iconClass: "text-teal-400",
    valueClass: "group-hover:text-teal-400",
    deltaClass: "text-teal-400",
    progressGradient: "from-emerald-400 to-teal-500",
    hoverShadowClass: "hover:shadow-emerald-400/20",
  },
  {
    icon: Target,
    iconClass: "text-emerald-400",
    valueClass: "group-hover:text-emerald-400",
    deltaClass: "text-emerald-400",
    progressGradient: "from-emerald-400 to-teal-500",
    hoverShadowClass: "hover:shadow-emerald-400/20",
  },
  {
    icon: Award,
    iconClass: "text-yellow-400",
    valueClass: "group-hover:text-yellow-400",
    deltaClass: "text-yellow-400",
    progressGradient: "from-yellow-400 to-orange-500",
    hoverShadowClass: "hover:shadow-yellow-400/20",
  },
];
