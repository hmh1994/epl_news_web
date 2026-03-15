"use client";

import { useState, useMemo } from "react";
import type { MatchLineup } from "@/entities/match/model/match-lineup";
import { FormationPitch } from "./formation-pitch";
import { SubstituteBench } from "./substitute-bench";
import { SubstitutionTimeline } from "./substitution-timeline";

interface MatchFormationProps {
  lineup: MatchLineup;
  homeLabel: string;
  awayLabel: string;
}

export const MatchFormation = ({
  lineup,
  homeLabel,
  awayLabel,
}: MatchFormationProps) => {
  const [activeTab, setActiveTab] = useState<"home" | "away">("home");

  const homePlayers = useMemo(
    () => lineup.lineup.filter((p) => p.isHome),
    [lineup.lineup]
  );
  const awayPlayers = useMemo(
    () => lineup.lineup.filter((p) => !p.isHome),
    [lineup.lineup]
  );
  const homeSubs = useMemo(
    () => lineup.substitutes.filter((s) => s.isHome),
    [lineup.substitutes]
  );
  const awaySubs = useMemo(
    () => lineup.substitutes.filter((s) => !s.isHome),
    [lineup.substitutes]
  );
  const homeSubstitutions = useMemo(
    () => lineup.substitutions.filter((s) => s.isHome),
    [lineup.substitutions]
  );
  const awaySubstitutions = useMemo(
    () => lineup.substitutions.filter((s) => !s.isHome),
    [lineup.substitutions]
  );

  const isHome = activeTab === "home";
  const players = isHome ? homePlayers : awayPlayers;
  const subs = isHome ? homeSubs : awaySubs;
  const sEvents = isHome ? homeSubstitutions : awaySubstitutions;
  const formation = isHome ? lineup.homeFormation : lineup.awayFormation;
  const captainId = isHome ? lineup.homeCaptainId : lineup.awayCaptainId;
  const primaryColor = isHome
    ? lineup.teamColors.homePrimary
    : lineup.teamColors.awayPrimary;
  const secondaryColor = isHome
    ? lineup.teamColors.homeSecondary
    : lineup.teamColors.awaySecondary;

  return (
    <section className="bg-slate-900/60 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl overflow-hidden">
      <header className="px-4 py-4 sm:px-8 sm:py-6 border-b border-white/10">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
          Formation
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          포메이션 & 라인업
        </h2>

        {/* Tab switch */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === "home"
                ? "bg-white/15 text-white"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {homeLabel}
          </button>
          <button
            onClick={() => setActiveTab("away")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === "away"
                ? "bg-white/15 text-white"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {awayLabel}
          </button>
        </div>
      </header>

      <div className="px-4 py-6 sm:px-8 sm:py-8 space-y-8">
        <FormationPitch
          formation={formation}
          players={players}
          captainId={captainId}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          substitutions={sEvents}
        />

        <SubstituteBench
          substitutes={subs}
          substitutions={sEvents}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />

        <SubstitutionTimeline
          substitutions={sEvents}
          lineup={lineup.lineup}
          substitutes={lineup.substitutes}
        />
      </div>
    </section>
  );
};
