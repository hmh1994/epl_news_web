import { LucideIcon, Trophy, BarChart3, Target, Award } from "lucide-react";

type HeroStat = {
  value: string;
  label: string;
  valueClass: string;
};

type AnalyticsCard = {
  icon: LucideIcon;
  iconClass: string;
  value: string;
  valueClass: string;
  delta: string;
  deltaClass: string;
  title: string;
  description: string;
  progressGradient: string;
  progressWidth: string;
  hoverShadowClass: string;
};

export const HERO_STATS: HeroStat[] = [
  { value: "1,213", label: "총 득점", valueClass: "text-green-400" },
  { value: "3.19", label: "경기당 평균골", valueClass: "text-teal-400" },
  { value: "82.4%", label: "평균 패스성공률", valueClass: "text-emerald-400" },
  { value: "216", label: "총 클린시트", valueClass: "text-yellow-400" },
];

export const ANALYTICS_CARDS: AnalyticsCard[] = [
  {
    icon: Trophy,
    iconClass: "text-green-400",
    value: "1,213",
    valueClass: "group-hover:text-green-400",
    delta: "+8.2%",
    deltaClass: "text-green-400",
    title: "Total Goals",
    description: "시즌 총 득점수",
    progressGradient: "from-green-400 to-emerald-500",
    progressWidth: "w-4/5",
    hoverShadowClass: "hover:shadow-green-400/20",
  },
  {
    icon: BarChart3,
    iconClass: "text-teal-400",
    value: "3.19",
    valueClass: "group-hover:text-teal-400",
    delta: "+5.1%",
    deltaClass: "text-teal-400",
    title: "Goals per Match",
    description: "경기당 평균 골",
    progressGradient: "from-emerald-400 to-teal-500",
    progressWidth: "w-3/4",
    hoverShadowClass: "hover:shadow-emerald-400/20",
  },
  {
    icon: Target,
    iconClass: "text-emerald-400",
    value: "82.4%",
    valueClass: "group-hover:text-emerald-400",
    delta: "+2.8%",
    deltaClass: "text-emerald-400",
    title: "Pass Accuracy",
    description: "평균 패스 성공률",
    progressGradient: "from-emerald-400 to-teal-500",
    progressWidth: "w-5/6",
    hoverShadowClass: "hover:shadow-emerald-400/20",
  },
  {
    icon: Award,
    iconClass: "text-yellow-400",
    value: "216",
    valueClass: "group-hover:text-yellow-400",
    delta: "+12.3%",
    deltaClass: "text-yellow-400",
    title: "Clean Sheets",
    description: "시즌 총 클린시트",
    progressGradient: "from-yellow-400 to-orange-500",
    progressWidth: "w-2/3",
    hoverShadowClass: "hover:shadow-yellow-400/20",
  },
];
