import { LiveUpdate } from "@/entities/update/model/live-update";
import { LiveUpdateCard } from "@/entities/update/ui/live-update-card";

interface EplHubLiveUpdatesProps {
  updates: LiveUpdate[];
}

export const EplHubLiveUpdates = ({ updates }: EplHubLiveUpdatesProps) => {
  return (
    <div className='bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h3 className='text-2xl font-bold text-white mb-1'>실시간 업데이트</h3>
          <p className='text-slate-400 text-sm'>최신 소식과 알림</p>
        </div>
        <div className='w-3 h-3 bg-[#169976] rounded-full animate-pulse'></div>
      </div>

      <div className='space-y-3'>
        {updates.map((update) => (
          <LiveUpdateCard key={update.title} update={update} />
        ))}
      </div>
    </div>
  );
};
