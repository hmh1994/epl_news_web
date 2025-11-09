import type { LeagueTableRow } from "@/entities/league/model/league-overview";
import type { TeamStanding } from "@/entities/team/model/team-standing";
import type { LeagueTableTeam } from "@/entities/team/model/league-table-team";
import type { LeagueStandingsRow } from "@/shared/api/epl/model/types";

export const toTeamStanding = (
  row: LeagueStandingsRow
): TeamStanding => ({
  position: row.position,
  teamId: row.team.id,
  matches: row.record.played,
  points: row.record.points,
  goalDifference: row.record.goalDifference,
  trend: row.trend ?? 0,
  form: row.form,
});

export const toLeagueTableRow = (
  row: LeagueStandingsRow
): LeagueTableRow => ({
  pos: row.position,
  teamId: row.team.id,
  played: row.record.played,
  won: row.record.won,
  drawn: row.record.drawn,
  lost: row.record.lost,
  gd: row.record.goalDifference,
  pts: row.record.points,
});

export const toLeagueTableTeam = (
  row: LeagueStandingsRow
): LeagueTableTeam => ({
  position: row.position,
  teamId: row.team.id,
  played: row.record.played,
  won: row.record.won,
  drawn: row.record.drawn,
  lost: row.record.lost,
  goalsFor: row.record.goalsFor,
  goalsAgainst: row.record.goalsAgainst,
  goalDifference: row.record.goalDifference,
  points: row.record.points,
  form: row.form,
  trend: row.trend ?? 0,
  xG: row.advancedMetrics?.xG ?? 0,
  xGA: row.advancedMetrics?.xGA ?? 0,
  possession: row.advancedMetrics?.possession ?? 0,
  passAccuracy: row.advancedMetrics?.passAccuracy ?? 0,
  cleanSheets: row.advancedMetrics?.cleanSheets ?? 0,
  bigChances: row.advancedMetrics?.bigChances ?? 0,
  value: row.advancedMetrics?.marketValue ?? "—",
});
