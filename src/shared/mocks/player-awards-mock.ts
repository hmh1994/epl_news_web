import type { PlayerAward } from "@/entities/player/model/player-award";

export const MOCK_PLAYER_AWARDS: PlayerAward[] = [
  { type: "POTM", name: "이달의 선수", date: "2025-12-15", season: "2024/25" },
  { type: "POTM", name: "이달의 선수", date: "2025-10-12", season: "2024/25" },
  { type: "GOTM", name: "이달의 골", date: "2025-11-20", season: "2024/25" },
  { type: "MOTM", name: "경기의 선수", date: "2026-01-05", season: "2024/25" },
  { type: "MOTM", name: "경기의 선수", date: "2025-09-28", season: "2024/25" },
  { type: "MOTM", name: "경기의 선수", date: "2025-08-30", season: "2024/25" },
  { type: "YPOTS", name: "올해의 영플레이어", date: "2024-05-20", season: "2023/24" },
  { type: "POTS", name: "시즌의 선수", date: "2024-05-20", season: "2023/24" },
  { type: "GB", name: "골든부트", date: "2024-05-20", season: "2023/24" },
  { type: "POTM", name: "이달의 선수", date: "2024-03-10", season: "2023/24" },
  { type: "GOTM", name: "이달의 골", date: "2024-02-15", season: "2023/24" },
];
