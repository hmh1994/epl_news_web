import {
  LeagueChampion,
  LeagueKey,
  LeagueStat,
  LeagueSummary,
  LeagueTableRow,
  SuccessfulClub,
} from "@/entities/league/model/league-overview";

export const LEAGUE_SUMMARIES: Record<LeagueKey, LeagueSummary> = {
  EPL: {
    name: "Premier League",
    country: "🏴",
    teams: 20,
    totalGoals: 1213,
    avgAttendance: 38181,
    marketValue: "€8.46B",
    color: "from-[#169976] to-teal-500",
    logo: "⚽",
  },
};

export const EPL_BRIEF_TABLE: LeagueTableRow[] = [
  {
    pos: 1,
    teamId: "mci",
    played: 38,
    won: 28,
    drawn: 5,
    lost: 5,
    gd: 62,
    pts: 89,
  },
  {
    pos: 2,
    teamId: "ars",
    played: 38,
    won: 28,
    drawn: 5,
    lost: 5,
    gd: 62,
    pts: 89,
  },
  {
    pos: 3,
    teamId: "liv",
    played: 38,
    won: 24,
    drawn: 10,
    lost: 4,
    gd: 45,
    pts: 82,
  },
  {
    pos: 4,
    teamId: "avl",
    played: 38,
    won: 20,
    drawn: 8,
    lost: 10,
    gd: 15,
    pts: 68,
  },
  {
    pos: 5,
    teamId: "tot",
    played: 38,
    won: 20,
    drawn: 6,
    lost: 12,
    gd: 13,
    pts: 66,
  },
  {
    pos: 18,
    teamId: "lut",
    played: 38,
    won: 6,
    drawn: 8,
    lost: 24,
    gd: -33,
    pts: 26,
  },
  {
    pos: 19,
    teamId: "bur",
    played: 38,
    won: 5,
    drawn: 9,
    lost: 24,
    gd: -37,
    pts: 24,
  },
  {
    pos: 20,
    teamId: "shu",
    played: 38,
    won: 3,
    drawn: 7,
    lost: 28,
    gd: -69,
    pts: 16,
  },
];

export const EPL_CHAMPIONS: LeagueChampion[] = [
  {
    year: "2023-24",
    teamId: "mci",
    titles: 10,
    points: 89,
  },
  {
    year: "2022-23",
    teamId: "mci",
    titles: 9,
    points: 89,
  },
  {
    year: "2021-22",
    teamId: "mci",
    titles: 8,
    points: 93,
  },
  {
    year: "2020-21",
    teamId: "mci",
    titles: 7,
    points: 86,
  },
  {
    year: "2019-20",
    teamId: "liv",
    titles: 1,
    points: 99,
  },
  {
    year: "2018-19",
    teamId: "mci",
    titles: 6,
    points: 98,
  },
];

export const EPL_STATS: LeagueStat[] = [
  {
    id: "total-goals",
    icon: "target",
    value: "1,213",
    label: "Total Goals",
    change: "+8.2%",
    color: "green",
  },
  {
    id: "goals-per-match",
    icon: "activity",
    value: "3.19",
    label: "Goals/Match",
    change: "+5.1%",
    color: "teal",
  },
  {
    id: "attendance",
    icon: "users",
    value: "38,181",
    label: "Avg Attendance",
    change: "+12%",
    color: "emerald",
  },
  {
    id: "clean-sheets",
    icon: "shield",
    value: "216",
    label: "Clean Sheets",
    change: "+15%",
    color: "yellow",
  },
];

export const EPL_TOP_CLUBS: SuccessfulClub[] = [
  {
    teamId: "mci",
    titles: 10,
    color: "from-[#169976] to-teal-500",
  },
  {
    teamId: "mun",
    titles: 13,
    color: "from-red-400 to-pink-500",
  },
  {
    teamId: "che",
    titles: 5,
    color: "from-blue-500 to-purple-500",
  },
];
