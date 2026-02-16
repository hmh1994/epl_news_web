import { LiveUpdate } from "../model/live-update";

interface LiveUpdateCardProps {
  update: LiveUpdate;
}

export const LiveUpdateCard = ({ update }: LiveUpdateCardProps) => {
  const priorityClass =
    update.priority === "high"
      ? "border-red-400 bg-red-400/5 hover:bg-red-400/10"
      : update.priority === "medium"
      ? "border-[#64748b] bg-[#64748b]/5 hover:bg-[#64748b]/10"
      : "border-slate-400 bg-slate-400/5 hover:bg-slate-400/10";

  const indicatorClass =
    update.priority === "high"
      ? "bg-red-400"
      : update.priority === "medium"
      ? "bg-[#64748b]"
      : "bg-slate-400";

  return (
    <div
      className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 border-l-4 ${priorityClass}`}
    >
      <div className='flex items-start space-x-3'>
        <div className='text-2xl'>{update.icon}</div>
        <div className='flex-1 min-w-0'>
          <h5 className='text-white font-semibold text-sm mb-1 group-hover:text-[#64748b] transition-colors'>
            {update.title}
          </h5>
          <p className='text-slate-400 text-xs mb-2 leading-relaxed'>
            {update.description}
          </p>
          <div className='flex items-center justify-between'>
            <span className='text-slate-500 text-xs'>{update.time}</span>
            <div className={`w-2 h-2 rounded-full ${indicatorClass}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
