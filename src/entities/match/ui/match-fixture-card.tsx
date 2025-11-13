"use client";

import { ReactNode } from "react";
import { Bookmark } from "lucide-react";
import { MatchFixture } from "@/entities/match/model/match-schedule";
import { useTranslations } from "next-intl";

interface MatchFixtureCardProps {
  fixture: MatchFixture;
  homeTeam?: ClubDisplay;
  awayTeam?: ClubDisplay;
  onToggleFavorite?: (matchId: string) => void;
  isFavorite?: boolean;
  onSelect?: (matchId: string) => void;
  isSelected?: boolean;
}

interface ClubDisplay {
  name: string;
  shortName: string;
  crest?: ReactNode;
}

const statusClasses: Record<MatchFixture["status"], string> = {
  upcoming: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
  live: "bg-red-500/20 text-red-300 border-red-400/30 animate-pulse",
  finished: "bg-slate-500/20 text-slate-200 border-slate-400/30",
};

const kickoffFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  hourCycle: "h23",
  timeZoneName: "short",
});

const dayFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "2-digit",
  month: "short",
});

export const MatchFixtureCard = ({
  fixture,
  homeTeam,
  awayTeam,
  onToggleFavorite,
  isFavorite,
  onSelect,
  isSelected = false,
}: MatchFixtureCardProps) => {
  const t = useTranslations("match.fixtureCard");
  const kickoff = new Date(fixture.kickoff);
  const statusLabel = t(`status.${fixture.status}`);
  const statusClassName = statusClasses[fixture.status];
  const matchweekLabel = t("matchweek", { week: fixture.matchweek });
  const centerLabel =
    fixture.home.score !== undefined && fixture.away.score !== undefined
      ? t("center.final")
      : t("center.kickoff");
  const favoriteLabel = isFavorite ? t("favorite.saved") : t("favorite.save");

  return (
    <article
      className={`relative overflow-hidden rounded-xl border cursor-pointer ${
        isSelected ? "border-emerald-400/60 shadow-emerald-400/30" : "border-white/10"
      } bg-slate-900/70 p-4 backdrop-blur-xl shadow-lg transition-transform hover:-translate-y-1`}
      onClick={() => onSelect?.(fixture.id)}
    >
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between text-xs text-slate-400'>
          <div className='flex items-center gap-3'>
            <span className='uppercase tracking-[0.25em] text-slate-500'>{matchweekLabel}</span>
            <span className='text-white font-semibold text-sm'>{kickoffFormatter.format(kickoff)}</span>
            <span>{dayFormatter.format(kickoff)}</span>
          </div>
          <div className='flex items-center gap-2'>
            {onToggleFavorite && (
              <button
                type='button'
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onToggleFavorite(fixture.id);
                }}
                className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all ${
                  isFavorite
                    ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-300 shadow-inner shadow-emerald-400/20"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-emerald-400/30"
                }`}
                aria-pressed={isFavorite}
              >
                <Bookmark
                  className='h-3.5 w-3.5'
                  strokeWidth={isFavorite ? 2.5 : 2}
                  fill={isFavorite ? "currentColor" : "none"}
                />
                {favoriteLabel}
              </button>
            )}
            <span className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${statusClassName}`}>
              {statusLabel}
            </span>
          </div>
        </div>

        <div className='flex items-center gap-4 rounded-lg bg-slate-900/50 px-3 py-3'>
          <ClubColumn club={fixture.home} display={homeTeam} alignment='right' />
          <div className='flex flex-col items-center gap-1 text-center text-xs text-slate-400'>
            {fixture.home.score !== undefined && fixture.away.score !== undefined ? (
              <>
                <span className='uppercase tracking-[0.3em]'>{centerLabel}</span>
                <span className='text-xl font-black text-white'>
                  {fixture.home.score} - {fixture.away.score}
                </span>
              </>
            ) : (
              <>
                <span className='uppercase tracking-[0.3em]'>{centerLabel}</span>
                <span className='text-sm text-slate-200'>{kickoffFormatter.format(kickoff)}</span>
              </>
            )}
          </div>
          <ClubColumn club={fixture.away} display={awayTeam} alignment='left' />
        </div>

        <div className='flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400'>
          <div className='flex items-center gap-2'>
            <span className='uppercase tracking-[0.25em] text-slate-500'>{t("details.venue")}</span>
            <span className='text-slate-200 font-semibold'>{fixture.venue}</span>
            <span>•</span>
            <span>{fixture.city}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

const ClubColumn = ({
  club,
  display,
  alignment,
}: {
  club: MatchFixture["home"];
  display?: ClubDisplay;
  alignment: "left" | "right";
}) => {
  const t = useTranslations("match.fixtureCard");
  const shortName = display?.shortName ?? club.teamId.toUpperCase();
  const fullName = display?.name ?? club.teamId.toUpperCase();
  const isHome = alignment === "right";
  const justifyText = isHome ? "items-end text-right" : "items-start text-left";

  return (
    <div className='flex flex-col gap-1'>
      <div className={`flex min-w-0 flex-col gap-0.5 ${justifyText}`}>
        <span className='text-xl font-black tracking-[0.08em] text-white'>
          {shortName}
        </span>
        <p
          className='max-w-full text-[11px] text-slate-300 leading-tight break-words'
          title={fullName}
        >
          {fullName}
        </p>
        {club.leaguePosition && (
          <span className='text-[10px] font-semibold text-emerald-300'>
            {t("details.position", { position: club.leaguePosition })}
          </span>
        )}
      </div>
    </div>
  );
};
