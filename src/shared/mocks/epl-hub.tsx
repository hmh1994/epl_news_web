import { TeamStanding } from "@/entities/team/model/team-standing";
import { PlayerRanking } from "@/entities/player/model/player-ranking";
import { LiveUpdate } from "@/entities/update/model/live-update";
import { LeagueStat } from "@/entities/stat/model/league-stat";

export const EPL_STANDINGS: TeamStanding[] = [
  {
    position: 1,
    teamId: "mci",
    matches: 38,
    points: 89,
    goalDifference: 73,
    trend: 2,
    form: ["W", "W", "W", "D", "W"],
  },
  {
    position: 2,
    teamId: "ars",
    matches: 38,
    points: 84,
    goalDifference: 62,
    trend: -1,
    form: ["W", "L", "W", "W", "D"],
  },
  {
    position: 3,
    teamId: "mun",
    matches: 38,
    points: 75,
    goalDifference: 15,
    trend: 1,
    form: ["D", "W", "L", "W", "W"],
  },
  {
    position: 4,
    teamId: "new",
    matches: 38,
    points: 71,
    goalDifference: 35,
    trend: 0,
    form: ["W", "D", "W", "L", "W"],
  },
  {
    position: 5,
    teamId: "liv",
    matches: 38,
    points: 67,
    goalDifference: 28,
    trend: -2,
    form: ["L", "D", "W", "D", "L"],
  },
];

export const EPL_PLAYER_RANKINGS: PlayerRanking[] = [
  {
    name: "얼링 홀란드",
    teamId: "mci",
    goals: 36,
    assists: 8,
    avatar: "🇳🇴",
    rating: 9.2,
    value: "€180M",
  },
  {
    name: "해리 케인",
    teamId: "tot",
    goals: 30,
    assists: 3,
    avatar: "🇬🇧",
    rating: 8.8,
    value: "€100M",
  },
  {
    name: "이반 토니",
    teamId: "bre",
    goals: 20,
    assists: 5,
    avatar: "🇬🇧",
    rating: 8.1,
    value: "€40M",
  },
];

export const EPL_LIVE_UPDATES: LiveUpdate[] = [
  {
    icon: "⚡",
    title: "실시간 경기 결과",
    description: "맨시티 vs 아스날 3-1 종료",
    time: "방금 전",
    priority: "high",
  },
  {
    icon: "🔄",
    title: "이적 소식",
    description: "음바페, 레알 마드리드 이적 확정",
    time: "1시간 전",
    priority: "medium",
  },
  {
    icon: "📊",
    title: "주간 MVP",
    description: "홀란드, 이번 주 최고 선수 선정",
    time: "2시간 전",
    priority: "medium",
  },
  {
    icon: "🏆",
    title: "시즌 기록",
    description: "새로운 득점 기록 달성",
    time: "5시간 전",
    priority: "low",
  },
];

export const EPL_SEASON_STATS: LeagueStat[] = [
  {
    id: "season-goals",
    icon: "trophy",
    value: "1,026",
    label: "시즌 총 골",
    change: "+12%",
    gradient: {
      from: "#FACC15",
      to: "#F97316",
    },
  },
  {
    id: "total-matches",
    icon: "users",
    value: "380",
    label: "총 경기 수",
    change: "+5%",
    gradient: {
      from: "#169976",
      to: "#059669",
    },
  },
  {
    id: "participating-teams",
    icon: "globe",
    value: "20",
    label: "참가 팀",
    change: "0%",
    gradient: {
      from: "#22C55E",
      to: "#10B981",
    },
  },
  {
    id: "avg-goals",
    icon: "target",
    value: "2.7",
    label: "경기당 평균 골",
    change: "+8%",
    gradient: {
      from: "#169976",
      to: "#0D9488",
    },
  },
];
