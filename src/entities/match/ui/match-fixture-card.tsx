import { MatchFixture } from "@/entities/match/model/match-schedule";

interface MatchFixtureCardProps {
  fixture: MatchFixture;
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
  timeZoneName: "short",
});

const dayFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "2-digit",
  month: "short",
});

const formColor: Record<"W" | "D" | "L", string> = {
  W: "bg-green-500 text-white",
  D: "bg-yellow-500 text-white",
  L: "bg-red-500 text-white",
};

export const MatchFixtureCard = ({ fixture }: MatchFixtureCardProps) => {
  const kickoff = new Date(fixture.kickoff);
  const status = statusStyles[fixture.status];

  return (
    <article className='relative bg-slate-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-3xl shadow-2xl hover:-translate-y-1 transition-transform'>
      <div className='flex items-center justify-between mb-6'>
        <div>
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
        <span
          className={`px-4 py-2 rounded-xl text-xs font-semibold border ${status.classes}`}
        >
          {status.label}
        </span>
      </div>

      {fixture.headline && (
        <div className='mb-6'>
          <p className='text-emerald-300 text-sm font-medium uppercase tracking-[0.3em]'>
            Spotlight
          </p>
          <p className='text-white text-lg font-semibold'>{fixture.headline}</p>
        </div>
      )}

      <div className='grid grid-cols-5 gap-4 items-center mb-6'>
        <ClubColumn club={fixture.home} alignment='right' />

        <div className='col-span-1 flex flex-col items-center space-y-2'>
          <div className='text-sm text-slate-400'>vs</div>
          {fixture.home.score !== undefined && fixture.away.score !== undefined ? (
            <div className='text-3xl font-black text-white'>
              {fixture.home.score} - {fixture.away.score}
            </div>
          ) : (
            <div className='text-base text-slate-400'>
              {fixture.referee ? `Ref ${fixture.referee}` : ""}
            </div>
          )}
        </div>

        <ClubColumn club={fixture.away} alignment='left' />
      </div>

      <div className='flex flex-wrap items-center justify-between gap-4 text-sm text-slate-400'>
        <div>
          <span className='text-slate-300 font-semibold'>{fixture.venue}</span>
          <span className='mx-2'>•</span>
          <span>{fixture.city}</span>
        </div>

        {fixture.broadcast && (
          <div className='flex items-center space-x-2 text-slate-300'>
            <span className='text-xs uppercase tracking-widest text-slate-500'>Broadcast</span>
            <span className='font-semibold'>{fixture.broadcast.channel}</span>
            {fixture.broadcast.platform && (
              <span className='text-slate-400 text-xs'>({fixture.broadcast.platform})</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

const ClubColumn = ({
  club,
  alignment,
}: {
  club: MatchFixture["home"];
  alignment: "left" | "right";
}) => {
  const justify = alignment === "right" ? "items-end text-right" : "items-start text-left";
  const badgeGlow = alignment === "right" ? "to-emerald-500" : "to-teal-500";

  return (
    <div className={`col-span-2 flex flex-col ${justify} space-y-3`}>
      <div className='flex items-center space-x-3'>
        {alignment === "right" && (
          <RecentForm recent={club.recentForm} alignment={alignment} />
        )}
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-[#169976] ${badgeGlow} flex items-center justify-center text-2xl shadow-xl`}
        >
          {club.badge}
        </div>
        {alignment === "left" && (
          <RecentForm recent={club.recentForm} alignment={alignment} />
        )}
      </div>
      <div>
        <p className='text-2xl font-bold text-white'>{club.name}</p>
        <div className='text-sm text-slate-400 flex items-center gap-3'>
          <span>{club.shortName}</span>
          {club.leaguePosition && (
            <span className='flex items-center gap-1 text-emerald-300'>
              <span className='w-2 h-2 rounded-full bg-emerald-400'></span>
              {club.leaguePosition}위
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const RecentForm = ({
  recent,
  alignment,
}: {
  recent?: MatchFixture["home"]["recentForm"];
  alignment: "left" | "right";
}) => {
  if (!recent || recent.length === 0) {
    return null;
  }

  return (
    <div className={`flex items-center space-x-2 ${alignment === "right" ? "flex-row-reverse space-x-reverse" : ""}`}>
      {recent.map((result, index) => (
        <span
          key={`${result}-${index}`}
          className={`w-7 h-7 rounded-xl text-xs font-bold flex items-center justify-center ${formColor[result]}`}
        >
          {result}
        </span>
      ))}
    </div>
  );
};
