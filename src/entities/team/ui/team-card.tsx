import { TeamProfile } from "@/entities/team/model/team-profile";

interface TeamCardProps {
  team: TeamProfile;
  isSelected: boolean;
  onSelect: (team: TeamProfile) => void;
}

export const TeamCard = ({ team, isSelected, onSelect }: TeamCardProps) => {
  return (
    <button
      type='button'
      onClick={() => onSelect(team)}
      className={`group relative bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 border cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 text-left w-full ${
        isSelected
          ? "border-emerald-400 bg-gradient-to-br from-[#169976]/20 to-teal-500/10 shadow-2xl shadow-emerald-500/25"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      <div className='flex items-start justify-between mb-6'>
        <div className='flex items-center space-x-4'>
          <div
            className='w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xl'
            style={{
              background: `linear-gradient(135deg, ${team.colors.primary}, ${team.colors.secondary})`,
            }}
          >
            {team.logo}
          </div>
          <div>
            <h3 className='text-2xl font-black text-white group-hover:text-[#169976] transition-colors'>
              {team.name}
            </h3>
            <p className='text-slate-400 text-sm'>
              {team.founded}년 창단 · {team.stadium}
            </p>
          </div>
        </div>
        <div className='text-right'>
          <div className='text-xl font-black text-white'>#{team.rank}</div>
          <div className='text-sm text-slate-400'>승점 {team.points}</div>
        </div>
      </div>

      <p className='text-slate-300 text-sm leading-relaxed mb-6'>{team.description}</p>

      <div className='grid grid-cols-2 gap-4 text-sm'>
        <div className='bg-white/5 rounded-2xl px-4 py-3 flex items-center justify-between text-slate-300'>
          <span>감독</span>
          <span className='font-semibold text-white'>{team.manager}</span>
        </div>
        <div className='bg-white/5 rounded-2xl px-4 py-3 flex items-center justify-between text-slate-300'>
          <span>가치</span>
          <span className='font-semibold text-white'>{team.value}</span>
        </div>
        <div className='bg-white/5 rounded-2xl px-4 py-3 flex items-center justify-between text-slate-300'>
          <span>평균 연령</span>
          <span className='font-semibold text-white'>{team.avgAge}</span>
        </div>
        <div className='bg-white/5 rounded-2xl px-4 py-3 flex items-center justify-between text-slate-300'>
          <span>우승</span>
          <span className='font-semibold text-white'>{team.trophies}회</span>
        </div>
      </div>
    </button>
  );
};
