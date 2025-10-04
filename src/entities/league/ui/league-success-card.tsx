import { SuccessfulClub } from "@/entities/league/model/league-overview";

interface LeagueSuccessCardProps {
  club: SuccessfulClub;
}

export const LeagueSuccessCard = ({ club }: LeagueSuccessCardProps) => {
  return (
    <div className='p-6 bg-slate-800/30 rounded-2xl border border-white/10 text-center'>
      <div
        className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${club.color} flex items-center justify-center text-2xl shadow-xl`}
      >
        {club.logo}
      </div>
      <h4 className='text-white font-bold text-lg mb-2'>{club.team}</h4>
      <div className='text-3xl font-black text-yellow-400 mb-1'>{club.titles}</div>
      <div className='text-slate-400 text-sm'>Premier League Titles</div>
    </div>
  );
};
