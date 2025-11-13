"use client";

import { LeagueTableRow } from "@/entities/league/model/league-overview";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

interface LeagueBriefRowProps {
  row: LeagueTableRow;
  isHovered: boolean;
  onHover: (pos: number) => void;
  onHoverEnd: () => void;
  teamName: string;
  teamCrest: string;
  onFavorite?: (teamId: string) => void;
  isFavorite?: boolean;
}

const getPositionStyle = (pos: number) => {
  if (pos <= 4) {
    return {
      badge: "bg-green-400/20 border-green-400/40 text-green-400",
    };
  }
  if (pos <= 6) {
    return {
      badge: "bg-[#169976]/20 border-emerald-400/40 text-teal-400",
    };
  }
  if (pos >= 18) {
    return {
      badge: "bg-red-400/20 border-red-400/40 text-red-400",
    };
  }
  return {
    badge: "bg-slate-400/20 border-slate-400/40 text-slate-400",
  };
};

export const LeagueBriefRow = ({
  row,
  isHovered,
  onHover,
  onHoverEnd,
  teamName,
  teamCrest,
  onFavorite,
  isFavorite,
}: LeagueBriefRowProps) => {
  const positionStyle = getPositionStyle(row.pos);
  const t = useTranslations("league.row");

  return (
    <tr
      className='border-b border-white/10 transition-all duration-300 hover:bg-white/5'
      onMouseEnter={() => onHover(row.pos)}
      onMouseLeave={onHoverEnd}
    >
      <td className='py-6 px-8'>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold border-2 transition-all duration-300 ${
            positionStyle.badge
          } ${isHovered ? "scale-110" : ""}`}
        >
          {row.pos}
        </div>
      </td>
      <td className='py-6 px-8'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center space-x-4'>
            <div
              className={`w-12 h-12 bg-gradient-to-br from-[#169976] to-teal-500 rounded-2xl flex items-center justify-center text-xl shadow-lg ${
                isHovered ? "scale-110 rotate-3" : ""
              } transition-all`}
            >
              {teamCrest}
            </div>
            <span
              className={`text-lg font-bold transition-colors ${
                isHovered ? "text-emerald-300" : "text-white"
              }`}
            >
              {teamName}
            </span>
          </div>
          {onFavorite && (
            <button
              type='button'
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onFavorite(row.teamId);
              }}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                isFavorite
                  ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-300 shadow-inner shadow-emerald-400/20 hover:bg-emerald-500/20"
                  : "border-white/10 bg-white/5 text-slate-200 hover:border-emerald-400/40 hover:text-emerald-200"
              }`}
              aria-pressed={isFavorite}
            >
              <Star
                className='h-4 w-4'
                strokeWidth={isFavorite ? 2.5 : 2}
                fill={isFavorite ? "currentColor" : "none"}
              />
              {t("favorite")}
            </button>
          )}
        </div>
      </td>
      <td className='py-6 px-4 text-center text-slate-300 font-medium'>
        {row.played}
      </td>
      <td className='py-6 px-4 text-center text-green-400 font-bold'>{row.won}</td>
      <td className='py-6 px-4 text-center text-yellow-400 font-bold'>
        {row.drawn}
      </td>
      <td className='py-6 px-4 text-center text-red-400 font-bold'>{row.lost}</td>
      <td className='py-6 px-4 text-center'>
        <span
          className={`font-bold ${
            row.gd > 0
              ? "text-green-400"
              : row.gd < 0
              ? "text-red-400"
              : "text-slate-400"
          }`}
        >
          {row.gd > 0 ? "+" : ""}
          {row.gd}
        </span>
      </td>
      <td className='py-6 px-4 text-center'>
        <div className='w-16 h-10 bg-gradient-to-r from-[#169976]/20 to-teal-500/20 border-2 border-emerald-400/40 rounded-xl flex items-center justify-center'>
          <span className='text-white font-black text-lg'>{row.pts}</span>
        </div>
      </td>
    </tr>
  );
};
