import { ReactNode } from "react";
import { Bookmark } from "lucide-react";
import { MatchFixture } from "@/entities/match/model/match-schedule";

interface MatchFixtureCardProps {
  fixture: MatchFixture;
  homeTeam?: ClubDisplay;
  awayTeam?: ClubDisplay;
  onToggleFavorite?: (matchId: string) => void;
  isFavorite?: boolean;
}

interface ClubDisplay {
  name: string;
  shortName: string;
  crest?: ReactNode;
}

const statusStyles: Record<MatchFixture["status"], { label: string; classes: string }> = {
  upcoming: {
    label: "Upcoming",
    classes: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
  },
  live: {
    label: "Live",
    classes: "bg-red-500/20 text-red-300 border-red-400/30 animate-pulse",
  },
  finished: {
    label: "Full Time",
    classes: "bg-slate-500/20 text-slate-200 border-slate-400/30",
  },
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
}: MatchFixtureCardProps) => {
  const kickoff = new Date(fixture.kickoff);
  const status = statusStyles[fixture.status];

  return (
    <article className='relative h-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-3xl shadow-2xl transition-transform hover:-translate-y-1'>
      <div className='flex h-full flex-col gap-6'>
        <div className='flex items-start justify-between'>
          <div className='flex flex-col gap-1'>
            <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>
              Matchweek {fixture.matchweek}
            </p>
            <div className='flex items-center space-x-3 mt-2'>
            <span className='text-xl font-bold text-white'>
              {kickoffFormatter.format(kickoff)}
            </span>
            <span className='text-slate-400 text-sm'>
              {dayFormatter.format(kickoff)}
              </span>
            </div>
          </div>
          <div className='flex flex-col items-end gap-2'>
            {onToggleFavorite && (
            <button
              type='button'
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onToggleFavorite(fixture.id);
              }}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                isFavorite
                  ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-300 shadow-inner shadow-emerald-400/20 hover:bg-emerald-500/20"
                  : "border-white/10 bg-white/5 text-slate-200 hover:border-emerald-400/40 hover:text-emerald-200"
              }`}
              aria-pressed={isFavorite}
            >
              <Bookmark
                className='h-4 w-4'
                strokeWidth={isFavorite ? 2.5 : 2}
                fill={isFavorite ? "currentColor" : "none"}
              />
              {isFavorite ? "관심 경기" : "즐겨찾기"}
            </button>
            )}
            <span
              className={`px-4 py-2 rounded-xl text-xs font-semibold border ${status.classes}`}
            >
              {status.label}
            </span>
          </div>
        </div>

        <div className='flex flex-col gap-4 rounded-2xl bg-slate-900/40 p-4'>
          <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-6'>
            <ClubColumn club={fixture.home} display={homeTeam} alignment='right' />

            <div className='flex flex-col items-center gap-1 text-center'>
              <div className='text-xs uppercase tracking-[0.3em] text-slate-500'>
                VS
              </div>
              {fixture.home.score !== undefined && fixture.away.score !== undefined ? (
                <div className='text-3xl font-black text-white'>
                  {fixture.home.score} - {fixture.away.score}
                </div>
              ) : (
                <div className='text-base text-slate-400'>
                  {kickoffFormatter.format(kickoff)}
                </div>
              )}
            </div>

            <ClubColumn club={fixture.away} display={awayTeam} alignment='left' />
          </div>

          <div className='flex flex-wrap items-center justify-between gap-4 text-sm text-slate-400'>
            <div className='flex items-center gap-2'>
              <span className='text-xs uppercase tracking-[0.3em] text-slate-500'>
                Venue
              </span>
              <span className='text-slate-300 font-semibold'>{fixture.venue}</span>
              <span>•</span>
              <span>{fixture.city}</span>
            </div>

            {fixture.broadcast && (
              <div className='flex items-center gap-2 text-slate-300'>
                <span className='text-xs uppercase tracking-[0.3em] text-slate-500'>
                  Broadcast
                </span>
                <span className='font-semibold'>{fixture.broadcast.channel}</span>
                {fixture.broadcast.platform && (
                  <span className='text-slate-400 text-xs'>
                    ({fixture.broadcast.platform})
                  </span>
                )}
              </div>
            )}
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
  const shortName = display?.shortName ?? club.teamId.toUpperCase();
  const fullName = display?.name ?? club.teamId.toUpperCase();
  const isHome = alignment === "right";
  const justifyText = isHome ? "items-end text-right" : "items-start text-left";

  return (
    <div className='flex flex-col gap-3'>
      <div className={`flex min-w-0 flex-col gap-2 ${justifyText}`}>
        <span className='text-3xl font-black tracking-[0.1em] text-white'>
          {shortName}
        </span>
        <p
          className='max-w-full text-sm text-slate-300 leading-tight break-words'
          title={fullName}
        >
          {fullName}
        </p>
        {club.leaguePosition && (
          <span className='text-xs font-semibold text-emerald-300'>
            {club.leaguePosition}위
          </span>
        )}
      </div>
    </div>
  );
};
