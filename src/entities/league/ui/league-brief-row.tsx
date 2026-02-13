"use client";

import { LeagueTableRow } from "@/entities/league/model/league-overview";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface LeagueBriefRowProps {
  row: LeagueTableRow;
  isHovered: boolean;
  onHover: (pos: number) => void;
  onHoverEnd: () => void;
  teamName: string;
  teamLogo: string;
  onFavorite?: (teamId: string) => void;
  isFavorite?: boolean;
  onSelect?: (teamId: string) => void;
}

const getPositionStyle = (pos: number) => {
  if (pos <= 4) {
    return {
      badge: "bg-emerald-400/10 border-emerald-400/30 text-emerald-300",
    };
  }
  if (pos <= 6) {
    return {
      badge: "bg-teal-400/10 border-teal-400/30 text-teal-300",
    };
  }
  if (pos >= 18) {
    return {
      badge: "bg-red-400/10 border-red-400/30 text-red-300",
    };
  }
  return {
    badge: "bg-slate-400/10 border-white/20 text-slate-300",
  };
};

export const LeagueBriefRow = ({
  row,
  isHovered,
  onHover,
  onHoverEnd,
  teamName,
  teamLogo,
  onFavorite,
  isFavorite,
  onSelect,
}: LeagueBriefRowProps) => {
  const positionStyle = getPositionStyle(row.pos);
  const t = useTranslations("league.row");
  const isClickable = Boolean(onSelect);
  const handleSelect = () => onSelect?.(row.teamId);

  return (
    <tr
      className={`border-b border-white/10 transition-colors duration-300 hover:bg-white/5 ${
        isClickable ? "cursor-pointer" : ""
      }`}
      onMouseEnter={() => onHover(row.pos)}
      onMouseLeave={onHoverEnd}
      onClick={isClickable ? handleSelect : undefined}
      onKeyDown={
        isClickable
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleSelect();
              }
            }
          : undefined
      }
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      <td className='py-6 px-8'>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold border transition-all duration-300 ${
            positionStyle.badge
          } ${isHovered ? "scale-105" : ""}`}
        >
          {row.pos}
        </div>
      </td>
      <td className='py-6 px-8'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center space-x-4'>
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl bg-slate-900/60 border border-white/10 shadow-md overflow-hidden ${
                isHovered ? "scale-105" : ""
              } transition-all`}
            >
              <Image
                src={teamLogo}
                alt={teamName}
                width={40}
                height={40}
                className='w-10 h-10 object-contain'
              />
            </div>
            <span
              className={`text-lg font-semibold transition-colors ${
                isHovered ? "text-emerald-200" : "text-white"
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
                  ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/15"
                  : "border-white/10 bg-slate-900/50 text-slate-200 hover:border-emerald-400/30 hover:text-emerald-200"
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
      <td className='py-6 px-4 text-center text-green-400 font-bold'>
        {row.won}
      </td>
      <td className='py-6 px-4 text-center text-yellow-400 font-bold'>
        {row.drawn}
      </td>
      <td className='py-6 px-4 text-center text-red-400 font-bold'>
        {row.lost}
      </td>
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
        <div className='w-16 h-10 bg-slate-900/60 border border-white/10 rounded-xl flex items-center justify-center'>
          <span className='text-emerald-100 font-semibold text-lg'>
            {row.pts}
          </span>
        </div>
      </td>
    </tr>
  );
};
