import { TeamStanding } from "@/entities/team/model/team-standing";
import { PlayerRanking } from "@/entities/player/model/player-ranking";
import { LiveUpdate } from "@/entities/update/model/live-update";
import { LeagueStat } from "@/entities/stat/model/league-stat";
import { Globe, Target, Trophy, Users } from "lucide-react";

export const EPL_STANDINGS: TeamStanding[] = [
  {
    position: 1,
    team: "맨체스터 시티",
    matches: 38,
    points: 89,
    goalDiff: "+73",
    logo: "🏆",
    trend: "+2",
    form: ["W", "W", "W", "D", "W"],
  },
  {
    position: 2,
    team: "아스날",
    matches: 38,
    points: 84,
    goalDiff: "+62",
    logo: "🔴",
    trend: "-1",
    form: ["W", "L", "W", "W", "D"],
  },
  {
    position: 3,
    team: "맨체스터 유나이티드",
    matches: 38,
    points: 75,
    goalDiff: "+15",
    logo: "👹",
    trend: "+1",
    form: ["D", "W", "L", "W", "W"],
  },
  {
    position: 4,
    team: "뉴캐슬 유나이티드",
    matches: 38,
    points: 71,
    goalDiff: "+35",
    logo: "⚫",
    trend: "0",
    form: ["W", "D", "W", "L", "W"],
  },
  {
    position: 5,
    team: "리버풀",
    matches: 38,
    points: 67,
    goalDiff: "+28",
    logo: "🔴",
    trend: "-2",
    form: ["L", "D", "W", "D", "L"],
  },
];

export const EPL_PLAYER_RANKINGS: PlayerRanking[] = [
  {
    name: "얼링 홀란드",
    team: "맨체스터 시티",
    goals: 36,
    assists: 8,
    avatar: "🇳🇴",
    rating: 9.2,
    value: "€180M",
  },
  {
    name: "해리 케인",
    team: "토트넘 홋스퍼",
    goals: 30,
    assists: 3,
    avatar: "🇬🇧",
    rating: 8.8,
    value: "€100M",
  },
  {
    name: "이반 토니",
    team: "브렌트포드",
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
    icon: <Trophy className='w-8 h-8' />,
    number: "1,026",
    label: "시즌 총 골",
    change: "+12%",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: <Users className='w-8 h-8' />,
    number: "380",
    label: "총 경기 수",
    change: "+5%",
    color: "from-[#169976] to-emerald-600",
  },
  {
    icon: <Globe className='w-8 h-8' />,
    number: "20",
    label: "참가 팀",
    change: "0%",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: <Target className='w-8 h-8' />,
    number: "2.7",
    label: "경기당 평균 골",
    change: "+8%",
    color: "from-[#169976] to-teal-600",
  },
];
