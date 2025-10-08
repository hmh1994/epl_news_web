import { TeamStanding } from "../model/team-standing";

interface TeamStandingRowProps {
  standing: TeamStanding;
  teamName: string;
  crest: string;
}

const trendClassName = (trend: number) => {
  if (trend > 0) {
    return "bg-green-500/20 text-green-400";
  }
  if (trend < 0) {
    return "bg-red-500/20 text-red-400";
  }
  return "bg-slate-500/20 text-slate-400";
};

const trendLabel = (trend: number) => {
  if (trend === 0) {
    return "━";
  }
  return trend > 0 ? `+${trend}` : `${trend}`;
};

export const TeamStandingRow = ({ standing, teamName, crest }: TeamStandingRowProps) => {
  return (
    <tr className='border-b border-white/5 hover:bg-white/5 cursor-pointer transition-all duration-300 group'>
      <td className='py-5 px-3'>
        <div className='flex items-center space-x-3'>
          <span className='font-bold text-[#169976] text-lg'>{standing.position}</span>
          <div className={`text-xs px-2 py-1 rounded-full ${trendClassName(standing.trend)}`}>
            {trendLabel(standing.trend)}
          </div>
        </div>
      </td>
      <td className='py-5 px-3'>
        <div className='flex items-center space-x-4'>
          <div className='relative'>
            <div className='w-10 h-10 bg-gradient-to-br from-[#169976] to-teal-600 rounded-xl flex items-center justify-center text-xl shadow-lg'>
              {crest}
            </div>
          </div>
          <span className='text-white font-semibold group-hover:text-[#169976] transition-colors'>
            {teamName}
          </span>
        </div>
      </td>
      <td className='py-5 px-3 text-slate-300 font-medium'>{standing.matches}</td>
      <td className='py-5 px-3'>
        <span className='text-white font-bold text-lg'>{standing.points}</span>
      </td>
      <td className='py-5 px-3'>
        <span
          className={`font-semibold ${
            standing.goalDifference >= 0 ? "text-green-400" : "text-slate-300"
          }`}
        >
          {standing.goalDifference > 0 ? `+${standing.goalDifference}` : standing.goalDifference}
        </span>
      </td>
      <td className='py-5 px-3'>
        <div className='flex space-x-1'>
          {standing.form.map((result, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                result === "W"
                  ? "bg-green-500 text-white"
                  : result === "D"
                  ? "bg-yellow-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {result}
            </div>
          ))}
        </div>
      </td>
    </tr>
  );
};
