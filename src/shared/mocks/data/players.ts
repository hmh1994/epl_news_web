import { PlayerPosition } from "@/entities/player/model/player-profile";

export interface MockPlayer {
  id: number;
  name: string;
  nationality: string;
  age: number;
  height: number;
  weight: number;
  position: PlayerPosition;
  teamId: string;
  photo: string;
  goals: number;
  assists: number;
  stats: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
  };
  career: Array<{
    year: string;
    teamId: string;
    matches: number;
    goals: number;
  }>;
}

export const MOCK_PLAYERS: MockPlayer[] = [
  {
    id: 1,
    name: "Erling Haaland",
    nationality: "Norway",
    age: 23,
    height: 195,
    weight: 88,
    position: "ST",
    teamId: "mci",
    photo: "🇳🇴",
    goals: 36,
    assists: 8,
    stats: {
      pace: 89,
      shooting: 94,
      passing: 65,
      dribbling: 80,
      defending: 45,
      physical: 88,
    },
    career: [
      { year: "2022-", teamId: "mci", matches: 53, goals: 52 },
      { year: "2020-22", teamId: "bvb", matches: 89, goals: 86 },
    ],
  },
  {
    id: 2,
    name: "Kevin De Bruyne",
    nationality: "Belgium",
    age: 32,
    height: 181,
    weight: 70,
    position: "CAM",
    teamId: "mci",
    photo: "🇧🇪",
    goals: 7,
    assists: 16,
    stats: {
      pace: 76,
      shooting: 86,
      passing: 93,
      dribbling: 87,
      defending: 64,
      physical: 78,
    },
    career: [
      { year: "2015-", teamId: "mci", matches: 382, goals: 102 },
      { year: "2012-14", teamId: "wolfsburg", matches: 73, goals: 13 },
    ],
  },
  {
    id: 3,
    name: "Bukayo Saka",
    nationality: "England",
    age: 22,
    height: 178,
    weight: 72,
    position: "RW",
    teamId: "ars",
    photo: "🏴",
    goals: 14,
    assists: 11,
    stats: {
      pace: 85,
      shooting: 79,
      passing: 81,
      dribbling: 86,
      defending: 52,
      physical: 73,
    },
    career: [{ year: "2018-", teamId: "ars", matches: 212, goals: 48 }],
  },
  {
    id: 4,
    name: "Mohamed Salah",
    nationality: "Egypt",
    age: 31,
    height: 175,
    weight: 71,
    position: "RW",
    teamId: "liv",
    photo: "🇪🇬",
    goals: 18,
    assists: 10,
    stats: {
      pace: 90,
      shooting: 87,
      passing: 81,
      dribbling: 90,
      defending: 45,
      physical: 75,
    },
    career: [
      { year: "2017-", teamId: "liv", matches: 323, goals: 211 },
      { year: "2014-16", teamId: "roma", matches: 83, goals: 34 },
    ],
  },
];

export const PLAYER_POSITIONS = ["all", "GK", "DF", "MF", "FW"] as const;

export const PLAYER_TEAMS = ["all", "mci", "ars", "liv", "che"] as const;
