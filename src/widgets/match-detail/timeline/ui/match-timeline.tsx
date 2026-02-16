import { MatchTimelineEvent } from "@/entities/match/model/match-detail";
import { MatchFixture } from "@/entities/match/model/match-schedule";

interface MatchTimelineProps {
  fixture: MatchFixture;
  events: MatchTimelineEvent[];
}

const eventIcons: Record<MatchTimelineEvent["type"], string> = {
  goal: "⚽",
  card: "🟨",
  substitution: "🔁",
  var: "🔎",
  whistle: "⏱️",
  info: "📌",
};

const eventAccent: Record<MatchTimelineEvent["team"], string> = {
  home: "bg-slate-500/60",
  away: "bg-indigo-500/60",
  neutral: "bg-slate-500/60",
};

export const MatchTimeline = ({ fixture, events }: MatchTimelineProps) => {
  const heading = fixture.status === "finished" ? "경기 하이라이트" : "프리매치 체크포인트";
  const subHeading = fixture.status === "finished" ? "득점과 주요 상황을 실시간으로 정리했습니다." : "킥오프 전 확인해야 할 핵심 포인트";

  return (
    <section className='bg-slate-900/60 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl overflow-hidden'>
      <header className='px-4 py-4 sm:px-8 sm:py-6 border-b border-white/10'>
        <p className='text-xs uppercase tracking-[0.3em] text-slate-300'>Timeline</p>
        <h2 className='text-xl sm:text-2xl font-bold text-white'>{heading}</h2>
        <p className='text-sm text-slate-400 mt-2'>{subHeading}</p>
      </header>

      <div className='relative px-4 py-4 sm:px-8 sm:py-8'>
        <div className='absolute top-4 bottom-4 left-4 sm:top-8 sm:bottom-8 sm:left-8 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent'></div>
        <div className='space-y-6 sm:space-y-8'>
          {events.map((event) => (
            <TimelineEventItem key={`${event.minute}-${event.title}`} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineEventItem = ({ event }: { event: MatchTimelineEvent }) => {
  return (
    <article className='relative pl-10 sm:pl-12'>
      <div className='absolute left-0 top-1.5 sm:left-2 w-3 h-3 rounded-full bg-slate-400 shadow-[0_0_12px_rgba(100,116,139,0.6)]'></div>
      <div className='absolute left-4 top-0 sm:left-6 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-base sm:text-lg'>
        {eventIcons[event.type]}
      </div>
      <div className='bg-slate-900/50 border border-white/10 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 flex flex-col gap-2'>
        <div className='flex items-center gap-4 text-sm text-slate-300'>
          <span className='text-slate-200 font-semibold'>{event.minute}</span>
          <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-[0.25em] text-white/90 ${eventAccent[event.team]}`}>
            {event.team === "home" && "Home"}
            {event.team === "away" && "Away"}
            {event.team === "neutral" && "Info"}
          </span>
        </div>
        <h3 className='text-lg font-semibold text-white'>{event.title}</h3>
        {event.description && <p className='text-sm text-slate-400 leading-relaxed'>{event.description}</p>}
        {(event.player || event.assist) && (
          <div className='text-xs text-slate-400 uppercase tracking-[0.2em]'>
            {event.player && <span className='text-white mr-2'>{event.player}</span>}
            {event.assist && <span>Assist {event.assist}</span>}
          </div>
        )}
      </div>
    </article>
  );
};
