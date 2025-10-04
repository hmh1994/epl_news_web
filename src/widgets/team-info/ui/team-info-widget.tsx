"use client";

import React, { useMemo, useState } from "react";
import { TeamProfile } from "@/entities/team/model/team-profile";
import { PlayerProfile } from "@/entities/player/model/player-profile";
import { TEAM_PROFILES, TEAM_PLAYERS } from "@/shared/mocks/team-info";
import { TeamInfoHeader } from "@/widgets/team-info/header/ui/team-info-header";
import { TeamInfoHero } from "@/widgets/team-info/hero/ui/team-info-hero";
import { TeamSelectionGrid } from "@/widgets/team-info/team-grid/ui/team-selection-grid";
import { TeamDetailSection } from "@/widgets/team-info/detail/ui/team-detail-section";
import { TeamInfoFooter } from "@/widgets/team-info/footer/ui/team-info-footer";
import {
  PositionFilter,
  SquadSortKey,
  TeamTab,
} from "@/widgets/team-info/model/types";
import {
  calculatePositionDistribution,
  calculateTeamStats,
  filterPlayers,
} from "@/widgets/team-info/model/helpers";

export const TeamInfoWidget = () => {
  const [selectedTeam, setSelectedTeam] = useState<TeamProfile | null>(
    TEAM_PROFILES[0] ?? null
  );
  const [sortBy, setSortBy] = useState<SquadSortKey>("number");
  const [filterPosition, setFilterPosition] = useState<PositionFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<TeamTab>("overview");

  const teamProfiles: TeamProfile[] = TEAM_PROFILES;
  const teamPlayers: PlayerProfile[] = TEAM_PLAYERS;

  const filteredPlayers = useMemo(
    () =>
      filterPlayers({
        players: teamPlayers,
        team: selectedTeam,
        filterPosition,
        searchTerm,
        sortBy,
      }),
    [teamPlayers, selectedTeam, filterPosition, searchTerm, sortBy]
  );

  const teamStats = useMemo(
    () => calculateTeamStats(selectedTeam, teamPlayers),
    [selectedTeam, teamPlayers]
  );

  const positionDistribution = useMemo(
    () => calculatePositionDistribution(selectedTeam, teamPlayers),
    [selectedTeam, teamPlayers]
  );

  return (
    <div className='min-h-screen bg-slate-950 text-white overflow-x-hidden'>
      <TeamInfoHeader />
      <TeamInfoHero />

      <main className='max-w-7xl mx-auto px-6 pb-20'>
        <TeamSelectionGrid
          teams={teamProfiles}
          selectedTeam={selectedTeam}
          onSelect={setSelectedTeam}
        />

        <TeamDetailSection
          team={selectedTeam}
          stats={teamStats}
          positionDistribution={positionDistribution}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          filteredPlayers={filteredPlayers}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          filterPosition={filterPosition}
          onFilterPositionChange={setFilterPosition}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </main>

      <TeamInfoFooter />
    </div>
  );
};
