"use client";

import React from "react";
import { LeagueKey } from "@/entities/league/model/league-overview";
import { LeagueSelector } from "@/features/league-overview/selector/ui/league-selector";
import { LeagueEntry } from "@/widgets/league-overview/model/types";

type LeagueSelectorPanelProps = {
  leagues: LeagueEntry[];
  activeLeague: LeagueKey;
  onSelect: (league: LeagueKey) => void;
};

export const LeagueSelectorPanel = ({
  leagues,
  activeLeague,
  onSelect,
}: LeagueSelectorPanelProps) => (
  <div className='mb-16'>
    <div className='bg-slate-900/40 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
      <h2 className='text-2xl font-bold text-white mb-8 text-center'>
        Select League
      </h2>
      <LeagueSelector leagues={leagues} activeLeague={activeLeague} onSelect={onSelect} />
    </div>
  </div>
);
