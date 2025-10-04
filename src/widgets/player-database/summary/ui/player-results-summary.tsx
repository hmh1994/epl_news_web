"use client";

import React from "react";

type PlayerResultsSummaryProps = {
  totalPlayers: number;
  selectedCount: number;
};

export const PlayerResultsSummary = ({
  totalPlayers,
  selectedCount,
}: PlayerResultsSummaryProps) => (
  <div className='flex items-center justify-between mb-8'>
    <h2 className='text-2xl font-bold text-white'>
      {totalPlayers} Players Found
    </h2>
    {selectedCount > 0 && (
      <div className='text-emerald-400 font-semibold'>
        {selectedCount} selected for comparison
      </div>
    )}
  </div>
);
