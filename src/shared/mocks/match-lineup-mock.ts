import type { MatchLineup } from "@/entities/match/model/match-lineup";

export const MOCK_MATCH_LINEUP: MatchLineup = {
  homeFormation: [4, 3, 3],
  awayFormation: [4, 2, 3, 1],
  homeCaptainId: "h-5",
  awayCaptainId: "a-4",
  lineup: [
    // ── Home (4-3-3) ──
    { playerId: "h-1", playerName: "온아나", position: "goalkeeper", shirtNumber: 24, isHome: true, row: 0, column: 0 },
    { playerId: "h-2", playerName: "달로트", position: "defender", shirtNumber: 20, isHome: true, row: 1, column: 0 },
    { playerId: "h-3", playerName: "데 리흐트", position: "defender", shirtNumber: 4, isHome: true, row: 1, column: 1 },
    { playerId: "h-4", playerName: "마르티네스", position: "defender", shirtNumber: 6, isHome: true, row: 1, column: 2 },
    { playerId: "h-5", playerName: "마즈라위", position: "defender", shirtNumber: 3, isHome: true, row: 1, column: 3 },
    { playerId: "h-6", playerName: "우가르테", position: "midfielder", shirtNumber: 25, isHome: true, row: 2, column: 0 },
    { playerId: "h-7", playerName: "브루노", position: "midfielder", shirtNumber: 8, isHome: true, row: 2, column: 1 },
    { playerId: "h-8", playerName: "마이누", position: "midfielder", shirtNumber: 14, isHome: true, row: 2, column: 2 },
    { playerId: "h-9", playerName: "가르나초", position: "forward", shirtNumber: 17, isHome: true, row: 3, column: 0 },
    { playerId: "h-10", playerName: "호일룬", position: "forward", shirtNumber: 9, isHome: true, row: 3, column: 1 },
    { playerId: "h-11", playerName: "아마드", position: "forward", shirtNumber: 7, isHome: true, row: 3, column: 2 },

    // ── Away (4-2-3-1) ──
    { playerId: "a-1", playerName: "알리송", position: "goalkeeper", shirtNumber: 1, isHome: false, row: 0, column: 0 },
    { playerId: "a-2", playerName: "알렉산더-아널드", position: "defender", shirtNumber: 66, isHome: false, row: 1, column: 0 },
    { playerId: "a-3", playerName: "코나테", position: "defender", shirtNumber: 5, isHome: false, row: 1, column: 1 },
    { playerId: "a-4", playerName: "반 다이크", position: "defender", shirtNumber: 4, isHome: false, row: 1, column: 2 },
    { playerId: "a-5", playerName: "로버트슨", position: "defender", shirtNumber: 26, isHome: false, row: 1, column: 3 },
    { playerId: "a-6", playerName: "그라벤베르흐", position: "midfielder", shirtNumber: 38, isHome: false, row: 2, column: 0 },
    { playerId: "a-7", playerName: "맥알리스터", position: "midfielder", shirtNumber: 10, isHome: false, row: 2, column: 1 },
    { playerId: "a-8", playerName: "살라", position: "forward", shirtNumber: 11, isHome: false, row: 3, column: 0 },
    { playerId: "a-9", playerName: "소보슬라이", position: "forward", shirtNumber: 8, isHome: false, row: 3, column: 1 },
    { playerId: "a-10", playerName: "디아스", position: "forward", shirtNumber: 7, isHome: false, row: 3, column: 2 },
    { playerId: "a-11", playerName: "누녜스", position: "forward", shirtNumber: 9, isHome: false, row: 3, column: 3 },
  ],
  substitutes: [
    // Home subs
    { playerId: "h-s1", playerName: "베이일리", position: "defender", shirtNumber: 15, isHome: true },
    { playerId: "h-s2", playerName: "에릭센", position: "midfielder", shirtNumber: 16, isHome: true },
    { playerId: "h-s3", playerName: "안토니", position: "forward", shirtNumber: 21, isHome: true },
    { playerId: "h-s4", playerName: "카세미루", position: "midfielder", shirtNumber: 18, isHome: true },
    { playerId: "h-s5", playerName: "헨더슨", position: "goalkeeper", shirtNumber: 22, isHome: true },
    // Away subs
    { playerId: "a-s1", playerName: "켈러허", position: "goalkeeper", shirtNumber: 62, isHome: false },
    { playerId: "a-s2", playerName: "엔도", position: "midfielder", shirtNumber: 3, isHome: false },
    { playerId: "a-s3", playerName: "가쿠포", position: "forward", shirtNumber: 18, isHome: false },
    { playerId: "a-s4", playerName: "치미카스", position: "defender", shirtNumber: 21, isHome: false },
    { playerId: "a-s5", playerName: "존스", position: "midfielder", shirtNumber: 17, isHome: false },
  ],
  substitutions: [
    { inPlayerId: "h-s2", outPlayerId: "h-8", isHome: true, clock: 62 },
    { inPlayerId: "h-s3", outPlayerId: "h-9", isHome: true, clock: 75 },
    { inPlayerId: "a-s2", outPlayerId: "a-7", isHome: false, clock: 58 },
    { inPlayerId: "a-s3", outPlayerId: "a-10", isHome: false, clock: 70 },
    { inPlayerId: "a-s4", outPlayerId: "a-5", isHome: false, clock: 80 },
  ],
  teamColors: {
    homePrimary: "#DA291C",
    homeSecondary: "#FBE122",
    awayPrimary: "#C8102E",
    awaySecondary: "#00B2A9",
  },
};
