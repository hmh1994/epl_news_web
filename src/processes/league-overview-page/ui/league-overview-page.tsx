"use client";

import { LeagueOverviewWidget } from "@/widgets/league-overview/ui/league-overview-widget";
import { LeagueEntry } from "@/widgets/league-overview/model/types";
import { LeagueStat, LeagueChampion, SuccessfulClub } from "@/entities/league/model/league-overview";

interface LeagueOverviewPageProps {
  entries: LeagueEntry[];
  stats: LeagueStat[];
  champions: LeagueChampion[];
  clubs: SuccessfulClub[];
}

export const LeagueOverviewPage = ({
  entries,
  stats,
  champions,
  clubs,
}: LeagueOverviewPageProps) => {
  return (
    <LeagueOverviewWidget
      leagueEntries={entries}
      leagueStats={stats}
      champions={champions}
      clubs={clubs}
    />
  );
};
