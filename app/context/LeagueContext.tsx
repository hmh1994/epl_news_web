// app/context/LeagueContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export enum SOCCER_LEAGUE {
  EPL = "epl",
  K_LEAGUE = "k_league",
}

type LeagueContextType = {
  league: SOCCER_LEAGUE;
  setLeague: (league: SOCCER_LEAGUE) => void;
};

const LeagueContext = createContext<LeagueContextType | undefined>(undefined);

export const LeagueProvider = ({ children }: { children: ReactNode }) => {
  const [league, setLeague] = useState<SOCCER_LEAGUE>(SOCCER_LEAGUE.EPL);

  return (
    <LeagueContext.Provider value={{ league, setLeague }}>
      {children}
    </LeagueContext.Provider>
  );
};

export const useLeague = () => {
  const context = useContext(LeagueContext);
  if (!context) {
    throw new Error("useLeague must be used within a LeagueProvider");
  }
  return context;
};
