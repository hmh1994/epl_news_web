import { MatchDetail } from "@/entities/match/model/match-detail";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";

const statusMeta: Record<MatchDetail["fixture"]["status"], { label: string; classes: string }> = {
  upcoming: {
    label: "Kickoff 대기",
    classes: "bg-emerald-500/20 text-emerald-200 border border-emerald-400/30",
  },
  live: {
    label: "LIVE",
    classes: "bg-red-500/30 text-red-200 border border-red-400/40 animate-pulse",
  },
  finished: {
    label: "Full Time",
    classes: "bg-slate-500/30 text-slate-200 border border-slate-400/40",
  },
};

const kickoffTimeFormatter = new Intl.DateTimeFormat("ko-KR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  hourCycle: "h23",
  timeZone: "Asia/Seoul",
});

const kickoffTimeFormatterGmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  hourCycle: "h23",
  timeZone: "UTC",
});

const kickoffDateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
  weekday: "long",
  timeZone: "Asia/Seoul",
});

const teamColorTokens = {
  home: {
    badge: "from-[#169976] via-emerald-500 to-teal-400",
    label: "text-emerald-200",
  },
  away: {
    badge: "from-indigo-500 via-purple-500 to-fuchsia-400",
    label: "text-indigo-200",
  },
} as const;

interface MatchDetailHeroProps {
  detail: MatchDetail;
}

export const MatchDetailHero = ({ detail }: MatchDetailHeroProps) => {
  const { fixture } = detail;
  const kickoff = new Date(fixture.kickoff);
  const status = statusMeta[fixture.status];
  const attendanceDisplay = detail.attendance
    ? detail.attendance.toLocaleString("ko-KR")
    : undefined;
  const homeTeam = TEAMS_BY_ID[fixture.home.teamId];
  const awayTeam = TEAMS_BY_ID[fixture.away.teamId];

  return (
    <section className='relative pt-28 pb-36 overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/40 to-slate-950'></div>
      <div className='absolute inset-0 opacity-30 mix-blend-screen'>
        <div className='absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-[#169976] blur-3xl'></div>
        <div className='absolute top-1/2 -right-16 w-[28rem] h-[28rem] rounded-full bg-emerald-500/70 blur-3xl'></div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-6'>
        <p className='text-sm uppercase tracking-[0.35em] text-emerald-200/80 mb-4'>
          Premier League 2024/25
        </p>
        <h1 className='text-5xl md:text-6xl font-black leading-tight text-white mb-6'>
          Match Centre
        </h1>
        <p className='text-lg text-slate-300 max-w-3xl mb-10'>{detail.heroTagline}</p>

        <div className='relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 md:p-10 shadow-2xl shadow-emerald-900/20'>
          <div className='absolute -top-5 left-8'>
            <span className={`px-4 py-2 rounded-full text-xs font-semibold ${status.classes}`}>
              {status.label}
            </span>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-5 gap-8 items-start'>
            <TeamColumn
              teamName={homeTeam?.name ?? fixture.home.teamId.toUpperCase()}
              short={homeTeam?.shortName ?? fixture.home.teamId.toUpperCase()}
              crest={homeTeam?.crest ?? "⚽"}
              score={fixture.home.score}
              alignment='right'
            />

            <ScoreboardCore
              fixture={fixture}
              kickoff={kickoff}
            />

            <TeamColumn
              teamName={awayTeam?.name ?? fixture.away.teamId.toUpperCase()}
              short={awayTeam?.shortName ?? fixture.away.teamId.toUpperCase()}
              crest={awayTeam?.crest ?? "⚽"}
              score={fixture.away.score}
              alignment='left'
            />
          </div>

          <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-200'>
            <InfoTile
              title='경기 일정'
              lines={[
                `${kickoffDateFormatter.format(kickoff)} • ${kickoffTimeFormatter.format(kickoff)} KST`,
                `${fixture.venue}, ${fixture.city}`,
              ]}
            />
            {detail.weather && (
              <InfoTile
                title='기상 정보'
                lines={[
                  `${detail.weather.condition} • ${detail.weather.temperature}`,
                  `풍속 ${detail.weather.wind} • 강수확률 ${detail.weather.precipitationChance}`,
                ]}
              />
            )}
            {attendanceDisplay && fixture.status !== "upcoming" && (
              <InfoTile
                title='공식 집계'
                lines={[`관중 ${attendanceDisplay}명`]}
              />
            )}
            {fixture.broadcast && (
              <InfoTile
                title='중계 정보'
                lines={[
                  fixture.broadcast.channel,
                  fixture.broadcast.platform ? `플랫폼 ${fixture.broadcast.platform}` : "",
                ].filter(Boolean)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

interface TeamColumnProps {
  teamName: string;
  short: string;
  crest: string;
  score?: number;
  alignment: "left" | "right";
}

const TeamColumn = ({ teamName, short, crest, score, alignment }: TeamColumnProps) => {
  const wrapperAlign = alignment === "right"
    ? "items-center text-center md:items-end md:text-right"
    : "items-center text-center md:items-start md:text-left";
  const tokens = alignment === "right" ? teamColorTokens.home : teamColorTokens.away;

  return (
    <div className={`flex flex-col ${wrapperAlign} space-y-4`}>
      <div className='flex items-center gap-4 md:gap-3'>
        {alignment === "right" && (
          <span className={`hidden md:inline text-sm uppercase tracking-[0.35em] ${tokens.label}`}>
            홈
          </span>
        )}
        <div
          className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${tokens.badge} flex items-center justify-center text-3xl shadow-xl`}
        >
          {crest}
        </div>
        {alignment === "left" && (
          <span className={`hidden md:inline text-sm uppercase tracking-[0.35em] ${tokens.label}`}>
            원정
          </span>
        )}
      </div>
      <div className='flex flex-col items-center md:items-start gap-2 w-full min-h-[4.25rem]'>
        <span className={`md:hidden text-xs uppercase tracking-[0.35em] ${tokens.label}`}>
          {alignment === "right" ? "홈" : "원정"}
        </span>
        <p className='text-2xl md:text-3xl font-bold text-white leading-tight'>{teamName}</p>
        <div
          className={`text-sm text-slate-400 flex items-center gap-3 justify-center ${
            alignment === "right" ? "md:justify-end" : "md:justify-start"
          }`}
        >
          <span>{short}</span>
          {score !== undefined && (
            <span className='flex items-center gap-1 text-emerald-300 md:hidden'>
              <span className='w-2 h-2 rounded-full bg-emerald-400'></span>
              {score}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

interface ScoreboardCoreProps {
  fixture: MatchDetail["fixture"];
  kickoff: Date;
}

const ScoreboardCore = ({ fixture, kickoff }: ScoreboardCoreProps) => {
  if (fixture.home.score !== undefined && fixture.away.score !== undefined) {
    return (
      <div className='flex flex-col items-center space-y-3'>
        <div className='text-sm uppercase tracking-[0.3em] text-slate-400'>최종 스코어</div>
        <div className='text-6xl md:text-7xl font-black text-white'>
          {fixture.home.score}
          <span className='text-emerald-400 mx-3'>:</span>
          {fixture.away.score}
        </div>
        {fixture.referee && (
          <div className='text-xs text-slate-400'>주심 {fixture.referee}</div>
        )}
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center space-y-3'>
      <div className='text-sm uppercase tracking-[0.3em] text-slate-400'>Kickoff</div>
      <div className='text-5xl font-black text-white'>
        {kickoffTimeFormatter.format(kickoff)}
      </div>
      <div className='text-xs text-slate-400'>현지 {kickoffTimeFormatterGmt.format(kickoff)} GMT</div>
    </div>
  );
};

interface InfoTileProps {
  title: string;
  lines: string[];
}

const InfoTile = ({ title, lines }: InfoTileProps) => {
  if (lines.length === 0) {
    return null;
  }

  return (
    <div className='bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 flex flex-col gap-1'>
      <span className='text-xs uppercase tracking-[0.3em] text-emerald-300'>{title}</span>
      {lines.map((line) => (
        <span key={line} className='text-slate-200 text-sm'>
          {line}
        </span>
      ))}
    </div>
  );
};
