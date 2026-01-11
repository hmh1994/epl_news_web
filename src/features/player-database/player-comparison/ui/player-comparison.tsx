"use client";

import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import { BarChart3, ArrowRight } from "lucide-react";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";
import { PlayerComparisonMatrix } from "./player-comparison-matrix";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface PlayerComparisonProps {
  players: PlayerDatabaseEntry[];
  showComparison: boolean;
  onToggle: () => void;
  onClear: () => void;
}

export const PlayerComparison = ({
  players,
  showComparison,
  onToggle,
  onClear,
}: PlayerComparisonProps) => {
  const t = useTranslations("player.comparison.panel");
  const [matchCounts, setMatchCounts] = useState<Record<string, number | null>>(
    {}
  );

  useEffect(() => {
    if (!showComparison) {
      return;
    }

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [showComparison]);

  useEffect(() => {
    let isActive = true;
    const ids = players.map((player) => String(player.id));
    const missing = ids.filter((id) => matchCounts[id] === undefined);

    if (missing.length === 0) {
      return () => {
        isActive = false;
      };
    }

    Promise.all(
      missing.map(async (playerId) => {
        try {
          const response = await fetch(`/api/players/${playerId}`, {
            cache: "no-store",
          });
          if (!response.ok) {
            throw new Error("failed");
          }
          const data = (await response.json()) as { matches?: number | null };
          return { playerId, matches: data.matches ?? null };
        } catch {
          return { playerId, matches: null };
        }
      })
    ).then((results) => {
      if (!isActive) {
        return;
      }
      setMatchCounts((prev) => {
        const next = { ...prev };
        results.forEach(({ playerId, matches }) => {
          next[playerId] = matches;
        });
        return next;
      });
    });

    return () => {
      isActive = false;
    };
  }, [players, matchCounts]);

  const formatPosition = (position: string) => {
    const normalized = position.toUpperCase();
    if (normalized === "GOALKEEPER") return "GK";
    if (normalized === "DEFENDER") return "DF";
    if (normalized === "MIDFIELDER") return "MF";
    if (normalized === "FORWARD") return "FW";
    return position;
  };

  if (players.length < 2) return null;
  const selectedLabel = t("selectedCount", { count: players.length, limit: 3 });
  const toggleLabel = showComparison ? t("hideButton") : t("showButton");

  return (
    <div className='fixed inset-0 z-40'>
      {showComparison && (
        <button
          type='button'
          aria-label='Close comparison'
          className='absolute inset-0 bg-black/50 backdrop-blur-[1px]'
          onClick={onToggle}
        />
      )}
      <div className='absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-3xl border-t border-white/10 shadow-2xl'>
        <div className='max-w-7xl mx-auto px-6 py-6'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <BarChart3 className='w-6 h-6 text-emerald-400' />
            <div>
              <h3 className='text-xl font-bold text-white'>{t("title")}</h3>
              <span className='text-slate-400 text-sm'>{selectedLabel}</span>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <button
              type='button'
              onClick={onToggle}
              className='px-6 py-3 bg-[#169976] hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors flex items-center gap-2'
            >
              <span>{toggleLabel}</span>
              <ArrowRight className='w-4 h-4' />
            </button>
            <button
              type='button'
              onClick={onClear}
              className='px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors'
            >
              {t("clearButton")}
            </button>
          </div>
        </div>

        <div className='flex items-center gap-3 mt-4 overflow-x-auto pb-2'>
          {players.map((player) => {
            const team = TEAMS_BY_ID[player.teamId];
            const teamName = player.teamName ?? team?.name ?? player.teamId;
            const formattedPosition = formatPosition(player.position);
            const isPhotoUrl = player.photo.startsWith("http");
            return (
              <div
                key={`chip-${player.id}`}
                className='flex items-center gap-3 bg-slate-800/60 border border-white/10 rounded-2xl px-4 py-3 min-w-[200px]'
              >
                <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-[#169976] to-teal-500 flex items-center justify-center text-lg overflow-hidden'>
                  {isPhotoUrl ? (
                    <img
                      src={player.photo}
                      alt={player.name}
                      className='h-full w-full object-cover'
                    />
                  ) : (
                    player.photo
                  )}
                </div>
                <div>
                  <div className='text-white font-semibold text-sm'>{player.name}</div>
                  <div className='text-xs text-slate-400'>
                    {teamName} • {formattedPosition}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

          {showComparison && (
            <div className='mt-6'>
              <PlayerComparisonMatrix
                players={players.map((player) => ({
                  ...player,
                  matches: matchCounts[String(player.id)] ?? player.matches,
                }))}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
