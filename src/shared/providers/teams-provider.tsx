"use client";

import { createContext, useContext } from "react";
import type { TeamEntry } from "@/shared/api/epl/model/types";

type TeamsById = Record<string, TeamEntry>;

const TeamsContext = createContext<TeamsById>({});

interface TeamsProviderProps {
  teams: TeamsById;
  children: React.ReactNode;
}

export const TeamsProvider = ({ teams, children }: TeamsProviderProps) => (
  <TeamsContext.Provider value={teams}>{children}</TeamsContext.Provider>
);

export const useTeams = (): TeamsById => useContext(TeamsContext);

export const useTeam = (teamId: string): TeamEntry | undefined =>
  useTeams()[teamId];
