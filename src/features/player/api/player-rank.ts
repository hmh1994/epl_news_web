import { API_VERSION } from "@/src/shared/constants";

export interface GetPlayerRankType {
  id: string;
  birth_country: string;
  birth_date: string;
  birth_place: string;
  display_name_en: string;
  display_name_kr: string;
  full_name: string;
  height: number;
  national_team: string;
  photo_url: string;
  position: string;
  position_info_en: string;
  position_info_kr: string;
  weight: number;
}

export interface GetPlayerRankResultType {
  playerRank: Array<GetPlayerRankResultType>;
}

export const getPlayerRank = () => `/api/${API_VERSION}/main/player_rank`;
