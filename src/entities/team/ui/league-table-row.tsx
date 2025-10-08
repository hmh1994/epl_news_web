import { LeagueTableTeam } from "@/entities/team/model/league-table-team";
import {
  TrendingDown,
  TrendingUp,
  Trophy,
} from "lucide-react";

interface LeagueTableRowProps {
  team: LeagueTableTeam;
  isHovered: boolean;
  onHover: (position: number) => void;
  onHoverEnd: () => void;
  teamName: string;
  teamShortName: string;
  teamCrest: string;
}

const getPositionStyle = (position: number) => {
  if (position <= 4) {
    return {
      container:
        "bg-green-400/20 border-green-400/40 shadow-green-400/20",
      text: "text-green-400",
    };
  }

  if (position <= 6) {
    return {
      container:
        "bg-[#169976]/20 border-emerald-400/40 shadow-emerald-400/20",
      text: "text-teal-400",
    };
  }

  if (position >= 18) {
    return {
      container: "bg-red-400/20 border-red-400/40 shadow-red-400/20",
      text: "text-red-400",
    };
  }

  return {
    container: "bg-slate-400/20 border-slate-400/40 shadow-slate-400/10",
    text: "text-slate-400",
  };
};

const TrendIndicator = ({ trend }: { trend: number }) => {
  if (trend > 0) {
    return (
      <div className='flex items-center space-x-1'>
        <TrendingUp className='w-4 h-4 text-green-400' />
        <span className='text-xs font-medium text-green-400'>+{trend}</span>
      </div>
    );
  }

  if (trend < 0) {
    return (
      <div className='flex items-center space-x-1'>
        <TrendingDown className='w-4 h-4 text-red-400' />
        <span className='text-xs font-medium text-red-400'>{trend}</span>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='w-4 h-0.5 bg-slate-500 rounded-full'></div>
    </div>
  );
};

export const LeagueTableRow = ({
  team,
  isHovered,
  onHover,
  onHoverEnd,
  teamName,
  teamShortName,
  teamCrest,
}: LeagueTableRowProps) => {
  const positionStyle = getPositionStyle(team.position);

  return (
    <tr
      className='border-b border-white/10 transition-all duration-300 hover:bg-white/5'
      onMouseEnter={() => onHover(team.position)}
      onMouseLeave={onHoverEnd}
    >
      <td className='py-8 px-8'>
        <div
          className={`flex items-center space-x-3`}
        >
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg border-2 shadow-lg transition-all duration-300 ${
              positionStyle.container
            } ${positionStyle.text} ${isHovered ? "scale-110 shadow-xl" : ""}`}
          >
            {team.position}
          </div>
          {team.position === 1 && (
            <div className='w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center'>
              <Trophy className='w-3 h-3 text-white' />
            </div>
          )}
        </div>
      </td>
      <td className='py-8 px-8'>
        <div className='flex items-center space-x-5'>
          <div
            className={`w-16 h-16 bg-gradient-to-br from-[#169976] to-teal-500 rounded-3xl flex items-center justify-center text-2xl shadow-xl transition-all duration-300 ${
              isHovered ? "scale-110 rotate-3" : ""
            }`}
          >
            {teamCrest}
          </div>
          <div>
            <div
              className={`text-xl font-bold transition-colors duration-300 ${
                isHovered ? "text-emerald-300" : "text-white"
              }`}
            >
              {teamName}
            </div>
            <div className='text-slate-400 text-sm font-medium'>{teamShortName}</div>
            <div className='text-slate-500 text-xs'>{team.value}</div>
          </div>
        </div>
      </td>
      <td className='py-8 px-4 text-center'>
        <div className='bg-slate-700/30 rounded-xl px-3 py-2 inline-block'>
          <span className='text-slate-300 font-semibold'>{team.played}</span>
        </div>
      </td>
      <td className='py-8 px-4 text-center text-green-400 font-bold'>
        {team.won}
      </td>
      <td className='py-8 px-4 text-center text-yellow-400 font-bold'>
        {team.drawn}
      </td>
      <td className='py-8 px-4 text-center text-red-400 font-bold'>
        {team.lost}
      </td>
      <td className='py-8 px-4 text-center'>
        <div
          className={`font-black text-xl px-3 py-2 rounded-xl inline-block ${
            team.goalDifference > 0
              ? "text-green-400 bg-green-400/10"
              : team.goalDifference < 0
              ? "text-red-400 bg-red-400/10"
              : "text-slate-400 bg-slate-400/10"
          }`}
        >
          {team.goalDifference > 0 ? "+" : ""}
          {team.goalDifference}
        </div>
      </td>
      <td className='py-8 px-4 text-center'>
        <div
          className={`w-20 h-14 bg-gradient-to-r from-[#169976]/20 to-teal-500/20 border-2 border-emerald-400/40 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
            isHovered ? "scale-110 shadow-emerald-400/50" : ""
          }`}
        >
          <span className='text-white font-black text-xl'>{team.points}</span>
        </div>
      </td>
      <td className='py-8 px-6'>
        <div className='flex justify-center space-x-2'>
          {team.form.map((result, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg transition-all duration-300 hover:scale-110 ${
                result === "W"
                  ? "bg-green-500 text-white shadow-green-500/50"
                  : result === "D"
                  ? "bg-yellow-500 text-white shadow-yellow-500/50"
                  : "bg-red-500 text-white shadow-red-500/50"
              }`}
            >
              {result}
            </div>
          ))}
        </div>
      </td>
      <td className='py-8 px-4 text-center'>
        <div className='space-y-1'>
          <div className='text-white font-bold'>{team.xG}</div>
          <div className='text-slate-400 text-xs'>Expected Goals</div>
        </div>
      </td>
      <td className='py-8 px-4 text-center'>
        <div className='space-y-2'>
          <div className='text-white font-bold'>{team.passAccuracy}%</div>
          <div className='w-full bg-slate-600 rounded-full h-1.5'>
            <div
              className='bg-gradient-to-r from-emerald-400 to-teal-400 h-1.5 rounded-full transition-all duration-1000'
              style={{ width: `${team.passAccuracy}%` }}
            />
          </div>
        </div>
      </td>
      <td className='py-8 px-4 text-center'>
        <TrendIndicator trend={team.trend} />
      </td>
    </tr>
  );
};
