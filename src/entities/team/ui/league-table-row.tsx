import { LeagueTableTeam } from "@/entities/team/model/league-table-team";
import { TrendingDown, TrendingUp, Trophy } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
interface LeagueTableRowProps {
  team: LeagueTableTeam;
  isHovered: boolean;
  onHover: (position: number) => void;
  onHoverEnd: () => void;
  teamName: string;
  teamShortName: string;
  teamLogo: string;
}

const getPositionStyle = (position: number) => {
  if (position <= 4) {
    return {
      container: "bg-slate-400/10 border-slate-400/30",
      text: "text-slate-200",
    };
  }

  if (position <= 6) {
    return {
      container: "bg-slate-400/10 border-slate-400/30",
      text: "text-slate-300",
    };
  }

  if (position >= 18) {
    return {
      container: "bg-red-400/10 border-red-400/30",
      text: "text-red-300",
    };
  }

  return {
    container: "bg-slate-400/10 border-white/20",
    text: "text-slate-300",
  };
};

const TrendIndicator = ({ trend }: { trend: number }) => {
  if (trend > 0) {
    return (
      <div className='flex items-center space-x-1'>
        <TrendingUp className='w-4 h-4 text-slate-300' />
        <span className='text-xs font-medium text-slate-200'>
          +{trend.toFixed(2)}
        </span>
      </div>
    );
  }

  if (trend < 0) {
    return (
      <div className='flex items-center space-x-1'>
        <TrendingDown className='w-4 h-4 text-red-300' />
        <span className='text-xs font-medium text-red-300'>
          {trend.toFixed(2)}
        </span>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='w-4 h-0.5 bg-slate-600 rounded-full'></div>
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
  teamLogo,
}: LeagueTableRowProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [, locale] = pathname?.split("/") ?? [];
  const basePath = locale ? `/${locale}` : "";
  const positionStyle = getPositionStyle(team.position);

  return (
    <tr
      className='cursor-pointer border-b border-white/10 transition-colors duration-200 hover:bg-white/5'
      onMouseEnter={() => onHover(team.position)}
      onMouseLeave={onHoverEnd}
      onClick={() =>
        router.push(
          `${basePath}/teams/detail?teamId=${encodeURIComponent(team.teamId)}`
        )
      }
    >
      <td className='py-3 px-2 sm:py-4 sm:px-5'>
        <div className={`flex items-center space-x-2 sm:space-x-3`}>
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-semibold text-sm sm:text-base border transition-all duration-200 ${
              positionStyle.container
            } ${positionStyle.text} ${isHovered ? "scale-105" : ""}`}
          >
            {team.position}
          </div>
          {team.position === 1 && (
            <div className='w-5 h-5 rounded-full border border-amber-300/30 bg-amber-400/15 flex items-center justify-center'>
              <Trophy className='w-2.5 h-2.5 text-amber-100' />
            </div>
          )}
        </div>
      </td>
      <td className='py-3 px-2 sm:py-4 sm:px-5'>
        <div className='flex items-center space-x-2 sm:space-x-3'>
          <div
            className={`w-8 h-8 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-xl bg-slate-900/70 border border-white/10 overflow-hidden shrink-0 ${
              isHovered ? "scale-105" : ""
            } transition-all duration-200`}
          >
            <Image
              src={teamLogo}
              alt={teamName}
              width={40}
              height={40}
              className='w-6 h-6 sm:w-10 sm:h-10 object-contain'
            />
          </div>
          <div className='min-w-0'>
            <div
              className={`text-sm sm:text-lg font-semibold transition-colors duration-200 truncate ${
                isHovered ? "text-slate-200" : "text-white"
              }`}
            >
              {teamName}
            </div>
            <div className='text-slate-400 text-xs font-medium hidden sm:block'>
              {teamShortName}
            </div>
          </div>
        </div>
      </td>
      <td className='py-4 px-3 text-center'>
        <div className='bg-slate-900/50 border border-white/10 rounded-lg px-2.5 py-1 inline-block'>
          <span className='text-slate-300 font-semibold text-sm'>
            {team.played}
          </span>
        </div>
      </td>
      <td className='py-4 px-3 text-center text-emerald-200 font-semibold text-sm'>
        {team.won}
      </td>
      <td className='py-4 px-3 text-center text-amber-200 font-semibold text-sm'>
        {team.drawn}
      </td>
      <td className='py-4 px-3 text-center text-red-300 font-semibold text-sm'>
        {team.lost}
      </td>
      <td className='py-4 px-3 text-center'>
        <div
          className={`font-semibold text-base px-2.5 py-1.5 rounded-lg inline-block ${
            team.goalDifference > 0
              ? "text-emerald-200 bg-emerald-400/10"
              : team.goalDifference < 0
              ? "text-red-300 bg-red-400/10"
              : "text-slate-300 bg-slate-400/10"
          }`}
        >
          {team.goalDifference > 0 ? "+" : ""}
          {team.goalDifference}
        </div>
      </td>
      <td className='py-4 px-3 text-center'>
        <div
          className={`w-10 h-8 sm:w-14 sm:h-10 bg-slate-900/60 border border-white/10 rounded-xl flex items-center justify-center transition-transform duration-200 ${
            isHovered ? "scale-105" : ""
          }`}
        >
          <span className='text-slate-100 font-semibold text-base'>
            {team.points}
          </span>
        </div>
      </td>
      <td className='py-4 px-3 text-center'>
        <div className='text-white font-semibold text-sm'>{Number(team.xG).toFixed(2)}</div>
      </td>
      <td className='py-4 px-3 text-center'>
        <div className='space-y-1.5'>
          <div className='text-white font-semibold text-sm'>
            {Number(team.passAccuracy).toFixed(1)}%
          </div>
          <div className='w-full bg-slate-800 rounded-full h-1.5'>
            <div
              className='bg-gradient-to-r from-slate-500/80 to-slate-400/80 h-1.5 rounded-full transition-all duration-1000'
              style={{ width: `${team.passAccuracy}%` }}
            />
          </div>
        </div>
      </td>
      <td className='py-4 px-4'>
        <div className='flex justify-center space-x-1.5'>
          {team.form !== null &&
            team.form.map((result, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-semibold transition-all duration-200 ${
                  result === "W"
                    ? "bg-emerald-500/20 text-emerald-100 border border-emerald-400/30"
                    : result === "D"
                    ? "bg-amber-400/20 text-amber-100 border border-amber-300/30"
                    : "bg-red-500/20 text-red-100 border border-red-400/30"
                }`}
              >
                {result}
              </div>
            ))}
        </div>
      </td>
      <td className='py-4 px-3 text-center'>
        <TrendIndicator trend={team.trend} />
      </td>
    </tr>
  );
};
