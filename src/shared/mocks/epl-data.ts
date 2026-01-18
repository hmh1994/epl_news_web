import { MOCK_TEAMS, TEAMS_BY_ID } from "@/shared/mocks/data/teams";
import {
  EPL_CHAMPIONS,
  EPL_STATS,
  EPL_TOP_CLUBS,
  LEAGUE_SUMMARIES,
} from "@/shared/mocks/league-overview";
import { PREMIER_LEAGUE_TABLE } from "@/shared/mocks/premium-epl-table";
import { TEAM_PLAYERS, TEAM_PROFILES } from "@/shared/mocks/team-info";
import { EPL_MATCH_SCHEDULE, MATCHWEEK_OPTIONS } from "@/shared/mocks/match-schedule";
import { MATCH_DETAILS } from "@/shared/mocks/match-detail";
import { EPL_NEWS_ARTICLES } from "@/shared/mocks/news/articles";
import {
  PLAYER_DATABASE,
  PLAYER_POSITIONS,
  PLAYER_TEAMS,
} from "@/shared/mocks/player-database";

export const EPL_MOCK_DATA = {
  teams: {
    list: MOCK_TEAMS,
    profiles: TEAM_PROFILES,
    squadPlayers: TEAM_PLAYERS,
    byId: TEAMS_BY_ID,
  },
  league: {
    summaries: LEAGUE_SUMMARIES,
    champions: EPL_CHAMPIONS,
    stats: EPL_STATS,
    topClubs: EPL_TOP_CLUBS,
    premiumTable: PREMIER_LEAGUE_TABLE,
  },
  matches: {
    schedule: EPL_MATCH_SCHEDULE,
    matchweeks: MATCHWEEK_OPTIONS,
    details: MATCH_DETAILS,
  },
  news: {
    articles: EPL_NEWS_ARTICLES,
  },
  players: {
    database: PLAYER_DATABASE,
    positions: PLAYER_POSITIONS,
    teamOptions: PLAYER_TEAMS,
  },
};
