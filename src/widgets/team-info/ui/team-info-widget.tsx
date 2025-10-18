"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { TeamProfile } from "@/entities/team/model/team-profile";
import { PlayerProfile } from "@/entities/player/model/player-profile";
import { TEAM_PROFILES, TEAM_PLAYERS } from "@/shared/mocks/team-info";
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
  const [teamSearchTerm, setTeamSearchTerm] = useState("");

  const teamProfiles: TeamProfile[] = TEAM_PROFILES;
  const teamPlayers: PlayerProfile[] = TEAM_PLAYERS;

  const filteredTeams = useMemo(() => {
    const query = teamSearchTerm.trim().toLowerCase();
    if (!query) {
      return teamProfiles;
    }
    return teamProfiles.filter((team) =>
      [team.name, team.shortName, team.city, team.stadium]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [teamProfiles, teamSearchTerm]);

  useEffect(() => {
    if (filteredTeams.length === 0) {
      setSelectedTeam(null);
      return;
    }

    if (!selectedTeam || !filteredTeams.some((team) => team.id === selectedTeam.id)) {
      setSelectedTeam(filteredTeams[0]);
    }
  }, [filteredTeams, selectedTeam]);

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
      <TeamInfoHero />

      <main className='max-w-7xl mx-auto px-6 pb-20'>
        <div className='flex flex-col gap-12 lg:grid lg:grid-cols-[240px,1fr] lg:items-start lg:gap-8'>
          <aside className='space-y-5 lg:sticky lg:top-28'>
            <div className='rounded-2xl border border-white/10 bg-slate-900/50 p-5 shadow-2xl backdrop-blur-2xl'>
              <div className='flex items-center justify-between gap-3'>
                <div>
                  <h2 className='text-xl font-bold text-white'>클럽 선택</h2>
                  <p className='text-xs text-slate-400'>
                    원하는 팀을 선택해 상세 정보를 확인하세요.
                  </p>
                </div>
                <div className='text-[11px] text-slate-400 bg-slate-800/40 px-2.5 py-1 rounded-lg border border-white/10'>
                  {filteredTeams.length}/{teamProfiles.length}
                </div>
              </div>

              <div className='mt-4'>
                <label htmlFor='team-search' className='sr-only'>
                  팀 검색
                </label>
                <div className='relative'>
                  <Search className='absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
                  <input
                    id='team-search'
                    type='search'
                    value={teamSearchTerm}
                    onChange={(event) => setTeamSearchTerm(event.target.value)}
                    placeholder='팀 이름 또는 약어 검색'
                    className='w-full rounded-2xl border border-white/10 bg-slate-900/60 py-2.5 pl-11 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400'
                  />
                </div>
              </div>

              <div className='mt-5'>
                <TeamSelectionGrid
                  teams={filteredTeams}
                  selectedTeam={selectedTeam}
                  onSelect={setSelectedTeam}
                  showHeader={false}
                  variant='compact'
                  searchTerm={teamSearchTerm}
                />
              </div>
            </div>
          </aside>

          <section className='space-y-12'>
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
          </section>
        </div>
      </main>

      <TeamInfoFooter />
    </div>
  );
};
