import { TeamStanding } from "../model/team-standing";

interface TeamStandingRowProps {
  team: TeamStanding;
}

export const TeamStandingRow = ({ team }: TeamStandingRowProps) => {
  return (
    <tr className='border-b border-white/5 hover:bg-white/5 cursor-pointer transition-all duration-300 group'>
      <td className='py-5 px-3'>
        <div className='flex items-center space-x-3'>
          <span className='font-bold text-[#169976] text-lg'>{team.position}</span>
          <div
            className={`text-xs px-2 py-1 rounded-full ${
              team.trend.startsWith("+")
                ? "bg-green-500/20 text-green-400"
                : team.trend.startsWith("-")
                ? "bg-red-500/20 text-red-400"
                : "bg-slate-500/20 text-slate-400"
            }`}
          >
            {team.trend === "0" ? "━" : team.trend}
          </div>
        </div>
      </td>
      <td className='py-5 px-3'>
        <div className='flex items-center space-x-4'>
          <div className='relative'>
            <div className='w-10 h-10 bg-gradient-to-br from-[#169976] to-teal-600 rounded-xl flex items-center justify-center text-xl shadow-lg'>
              {team.logo}
            </div>
          </div>
          <span className='text-white font-semibold group-hover:text-[#169976] transition-colors'>
            {team.team}
          </span>
        </div>
      </td>
      <td className='py-5 px-3 text-slate-300 font-medium'>{team.matches}</td>
      <td className='py-5 px-3'>
        <span className='text-white font-bold text-lg'>{team.points}</span>
      </td>
      <td className='py-5 px-3'>
        <span
          className={`font-semibold ${
            team.goalDiff.startsWith("+") ? "text-green-400" : "text-slate-300"
          }`}
        >
          {team.goalDiff}
        </span>
      </td>
      <td className='py-5 px-3'>
        <div className='flex space-x-1'>
          {team.form.map((result, index) => (
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
